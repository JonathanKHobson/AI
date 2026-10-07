#!/usr/bin/env node
// Renders the original score + sound design to 48 kHz / 24-bit stereo WAV stems and a mastered mix.
//   node scripts/render-audio.mjs   -> build/audio/{mix.wav, stems/*.wav, cues.json}
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DURATION, T, BEAT } from '../src/timeline.js';
import { SR, Stereo, reverb, pingPong, compress, limit, filterStereo, writeWav, dbToGain } from '../src/audio/dsp.js';
import { renderScore } from '../src/audio/score.js';
import { renderSfx } from '../src/audio/sfx.js';
import { landingSurf } from '../src/scene/choreo.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'build', 'audio');
fs.mkdirSync(path.join(OUT, 'stems'), { recursive: true });

const t0 = Date.now();
const log = (m) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);

// ------------------------------------------------------------------ render
const music = renderScore();
log('score rendered');
const { sfx, amb } = renderSfx({ landingX: (t) => landingSurf(t).x });
log('sfx rendered');

// ------------------------------------------------------- per-stem processing
function withSpace(dry, { send = 0.2, room = 0.82, damp = 0.4, delay = 0, delayTime = BEAT * 0.75, hp = 0 } = {}) {
  const out = dry.clone();
  if (hp) filterStereo(out, 'highpass', hp, 0.7);
  if (delay > 0) out.mix(pingPong(out, { time: delayTime, feedback: 0.32, lp: 4200 }), delay);
  if (send > 0) out.mix(reverb(out, { room, damp, width: 1, predelay: 0.018 }), send);
  return out;
}

const stems = {
  '01_keys_pad': withSpace(music.keys, { send: 0.32, hp: 150 }),
  '02_bass': (() => { const b = music.bass.clone(); filterStereo(b, 'highpass', 42, 0.7); filterStereo(b, 'peak', 700, 1.0, 3); return compress(b, { threshold: -20, ratio: 3, attack: 0.008, release: 0.12, makeup: 2 }); })(),
  '03_drums': (() => { const d = withSpace(music.drums, { send: 0.12, room: 0.6, damp: 0.5 }); return compress(d, { threshold: -18, ratio: 2.5, attack: 0.004, release: 0.09, makeup: 1.5 }); })(),
  '04_melody_bells': withSpace(music.melody, { send: 0.38, delay: 0.22 }),
  '05_sfx': withSpace(sfx, { send: 0.18, room: 0.7, damp: 0.45 }),
  '06_ambience_birds': withSpace(amb, { send: 0.5, room: 0.9, damp: 0.3, hp: 1500 }),
};
log('stems processed');

// --------------------------------------------------------------- mix + master
const GAINS = { '01_keys_pad': 1.0, '02_bass': -5.5, '03_drums': -2.5, '04_melody_bells': 2.0, '05_sfx': 4.0, '06_ambience_birds': 0.0 };
// duck the music a little under the pour and the two plips so the action reads
const DUCK = [[T.pourLand - 0.1, T.pourStop + 0.15, -3.0], [T.eyeL - 0.06, T.eyeL + 0.35, -2.5], [T.eyeR - 0.06, T.eyeR + 0.35, -2.5]];
function duckGain(t) {
  let db = 0;
  for (const [a, b, d] of DUCK) {
    const k = Math.min(1, Math.max(0, (t - a) / 0.08)) * Math.min(1, Math.max(0, (b - t) / 0.15));
    db = Math.min(db, d * k);
  }
  return dbToGain(db);
}
for (const name of ['01_keys_pad', '04_melody_bells', '03_drums']) {
  const buf = stems[name];
  for (let i = 0; i < buf.n; i++) { const g = duckGain(i / SR); buf.L[i] *= g; buf.R[i] *= g; }
}
for (const [name, buf] of Object.entries(stems)) buf.scale(dbToGain(GAINS[name])); // post-fader stems
const mix = new Stereo(DURATION);
for (const buf of Object.values(stems)) mix.mix(buf);

// gentle tonal shaping + glue compression
filterStereo(mix, 'highpass', 35, 0.7);
filterStereo(mix, 'lowshelf', 140, 0.7, -2.0);
filterStereo(mix, 'peak', 3200, 0.9, 0.8);
filterStereo(mix, 'highshelf', 9000, 0.7, 1.2);
compress(mix, { threshold: -16, ratio: 1.8, attack: 0.02, release: 0.25, knee: 8 });

// final fade (tail must be silent at 15.0 s)
const fadeStart = 14.25, fadeEnd = DURATION - 0.03;
for (let i = 0; i < mix.n; i++) {
  const t = i / SR;
  let g = 1;
  if (t > fadeStart) g = Math.max(0, 1 - (t - fadeStart) / (fadeEnd - fadeStart));
  g = g * g;
  mix.L[i] *= g; mix.R[i] *= g;
}

// loudness: approximate BS.1770 integrated (K-weighting + gating) to hit the target before limiting
function lufs(buf) {
  const pre = buf.clone();
  filterStereo(pre, 'highshelf', 1681.97, 0.7071, 4.0);
  filterStereo(pre, 'highpass', 38.13, 0.5003);
  const block = Math.round(0.4 * SR), hop = Math.round(0.1 * SR);
  const zs = [];
  for (let s = 0; s + block <= pre.n; s += hop) {
    let sum = 0;
    for (let i = s; i < s + block; i++) sum += pre.L[i] * pre.L[i] + pre.R[i] * pre.R[i];
    zs.push(sum / block);
  }
  const l = (z) => -0.691 + 10 * Math.log10(z + 1e-12);
  let gated = zs.filter((z) => l(z) > -70);
  const rel = l(gated.reduce((a, b) => a + b, 0) / gated.length) - 10;
  gated = gated.filter((z) => l(z) > rel);
  return l(gated.reduce((a, b) => a + b, 0) / gated.length);
}

const TARGET = -15.0;
let measured = lufs(mix);
const masterGain = dbToGain(TARGET - measured + 0.6); // limiter will shave a little
mix.scale(masterGain);
for (const buf of Object.values(stems)) buf.scale(masterGain);
limit(mix, { ceilingDb: -1.3, lookahead: 0.004, release: 0.1 });
measured = lufs(mix);
log(`mix ≈ ${measured.toFixed(2)} LUFS (internal estimate)`);

// ------------------------------------------------------------------- write
writeWav(path.join(OUT, 'mix.wav'), mix, fs);
for (const [name, buf] of Object.entries(stems)) {
  // stems: post-fader, post-ducking, scaled by the master gain; they sum to the mix before bus EQ/comp/limiter
  writeWav(path.join(OUT, 'stems', `${name}.wav`), buf, fs);
}
const cues = {
  sampleRate: SR, channels: 2, bitDepth: 24, durationSeconds: DURATION, bpm: 60 / BEAT,
  events: {
    downbeatCut: T.cut, pourLand: T.pourLand, pourStop: T.pourStop, eyeLeftPlip: T.eyeL, eyeRightPlip: T.eyeR,
    faceAliveSparkle: T.alive, winkTink: T.winkStart, pullBackWhoosh: T.pullStart, logoStamp: T.logo,
    sip: T.wordSip, savor: T.wordSavor, smileCadence: T.wordSmile, fadeOut: [fadeStart, DURATION],
  },
};
fs.writeFileSync(path.join(OUT, 'cues.json'), JSON.stringify(cues, null, 2));
log('wrote build/audio/mix.wav, stems/, cues.json');
