// Motivated sound effects, all synthesised and placed from timeline.js so they sit on the picture.
import { T, DROP_FALL, DURATION } from '../timeline.js';
import { SR, TAU, Stereo, panGains, rng, Biquad, hz } from './dsp.js';
import { bell } from './instruments.js';

// Minnaert-style bubble: a decaying sine whose pitch rises as the bubble shrinks.
function bubble(buf, t0, f0, amp, pan, tau = 0.012, rise = 0.12) {
  const n0 = Math.floor(t0 * SR), len = Math.floor(tau * 6 * SR);
  const [gl, gr] = panGains(pan);
  let p = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const fr = f0 * (1 + (rise / tau) * t);
    p += fr / SR;
    const v = Math.sin(TAU * p) * Math.exp(-t / tau) * Math.min(1, t / 0.0008) * amp;
    buf.add(n0 + i, v * gl, v * gr);
  }
}

function noiseSweep(buf, { t0, dur, f0, f1, q = 1.2, amp = 0.1, pan0 = 0, pan1 = 0, attack = 0.3, seed = 9, shape = 'bell' }) {
  const n0 = Math.floor(t0 * SR), len = Math.floor(dur * SR);
  const r = rng(seed);
  const bp = new Biquad('bandpass', f0, q);
  for (let i = 0; i < len; i++) {
    const k = i / len;
    if (i % 32 === 0) bp.set('bandpass', f0 * Math.pow(f1 / f0, k), q);
    let env;
    if (shape === 'swell') env = Math.pow(k, 2.2) * (k > 0.97 ? (1 - k) / 0.03 : 1);
    else env = Math.min(1, k / attack) * Math.pow(1 - k, 1.5);
    const [gl, gr] = panGains(pan0 + (pan1 - pan0) * k);
    const v = bp.tick(r() * 2 - 1) * env * amp;
    buf.add(n0 + i, v * gl, v * gr);
  }
}

// Bird: a few quick FM chirps.
function chirp(buf, t0, fBase, amp, pan, seed) {
  const r = rng(seed);
  const count = 2 + Math.floor(r() * 3);
  let t = t0;
  for (let c = 0; c < count; c++) {
    const dur = 0.05 + r() * 0.07, f0 = fBase * (0.9 + r() * 0.25), f1 = f0 * (1.2 + r() * 0.5);
    const n0 = Math.floor(t * SR), len = Math.floor(dur * SR);
    const [gl, gr] = panGains(pan);
    let p = 0;
    for (let i = 0; i < len; i++) {
      const k = i / len;
      const fr = f0 + (f1 - f0) * Math.sin(Math.PI * k * 0.8) + 180 * Math.sin(TAU * 38 * k * dur);
      p += fr / SR;
      const v = Math.sin(TAU * p) * Math.sin(Math.PI * k) ** 1.5 * amp;
      buf.add(n0 + i, v * gl, v * gr);
    }
    t += dur + 0.03 + r() * 0.06;
  }
}

// Soft letterpress "thunk": felt-damped thump + paper press.
function thunk(buf, t0, amp, pan, seed, pitch = 1) {
  const n0 = Math.floor(t0 * SR), len = Math.floor(0.25 * SR);
  const r = rng(seed);
  const bp = new Biquad('bandpass', 1400 * pitch, 1.1);
  const [gl, gr] = panGains(pan);
  let p = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    p += (95 * pitch + 60 * Math.exp(-t / 0.01)) / SR;
    const body = Math.sin(TAU * p) * Math.exp(-t / 0.055);
    const paper = bp.tick(r() * 2 - 1) * Math.exp(-t / 0.018) * 0.7;
    const v = (body + paper) * Math.min(1, t / 0.0015) * amp;
    buf.add(n0 + i, v * gl, v * gr);
  }
}

// Map the cream landing x (cm, -3..3) to a stereo position.
const panOfX = (x) => Math.max(-0.7, Math.min(0.7, x / 4));

export function renderSfx({ landingX }) {
  const sfx = new Stereo(DURATION);
  const amb = new Stereo(DURATION);
  const r = rng(2024);

  // ---------------------------------------------------- dawn: birds + swell
  const birds = [[0.55, 3600, -0.6], [1.15, 4300, 0.55], [1.7, 3900, -0.35], [2.05, 4700, 0.7], [12.7, 4100, -0.5], [13.4, 4600, 0.55]];
  birds.forEach(([t, fb, p], i) => chirp(amb, t, fb, 0.035, p, 50 + i));
  // reverse-swell into the hard cut (air rushing up to the downbeat)
  noiseSweep(sfx, { t0: 0.9, dur: T.cut - 0.9, f0: 500, f1: 5200, q: 0.9, amp: 0.10, shape: 'swell', pan0: -0.2, pan1: 0.2, seed: 11 });

  // ---------------------------------------------------- creamer arrives
  noiseSweep(sfx, { t0: T.cut - 0.05, dur: 0.4, f0: 1400, f1: 600, q: 0.8, amp: 0.035, attack: 0.25, pan0: 0.5, pan1: 0.2, seed: 12 });

  // ---------------------------------------------------- the pour
  const pourA = T.pourLand, pourB = T.pourStop;
  {
    // stream hiss: band-limited noise with flutter, panned with the landing point
    const n0 = Math.floor(T.pourStart * SR), n1 = Math.floor((pourB + 0.12) * SR);
    const bp = new Biquad('bandpass', 1100, 0.7), lp = new Biquad('lowpass', 3800, 0.7);
    const rn = rng(77);
    let flutter = 0;
    for (let i = n0; i < n1; i++) {
      const t = i / SR;
      flutter += (rn() * 2 - 1) * 0.02; flutter *= 0.995;
      const on = Math.min(1, Math.max(0, (t - T.pourStart) / 0.12)) * Math.min(1, Math.max(0, (pourB + 0.1 - t) / 0.12));
      const landed = t > pourA ? 1 : 0.35;
      const v = lp.tick(bp.tick(rn() * 2 - 1)) * on * landed * (0.20 + 0.06 * flutter);
      const [gl, gr] = panGains(panOfX(landingX(t)));
      sfx.add(i, v * gl, v * gr);
    }
    // the landing "plap"
    noiseSweep(sfx, { t0: pourA, dur: 0.18, f0: 900, f1: 400, q: 1.0, amp: 0.3, attack: 0.05, pan0: panOfX(landingX(pourA)), pan1: panOfX(landingX(pourA)), seed: 13 });
    // bubbles: Poisson stream while pouring, a few dribbles after it breaks off
    let t = pourA;
    while (t < pourB + 0.2) {
      const rate = t < pourB ? 55 : 14;
      t += -Math.log(1 - r()) / rate;
      const f0 = 600 + Math.pow(r(), 1.5) * 2200;
      const amp = (t < pourB ? 0.11 : 0.07) * (0.4 + r() * 0.6);
      bubble(sfx, t, f0, amp, panOfX(landingX(Math.min(t, pourB))) + (r() - 0.5) * 0.2, 0.006 + r() * 0.012);
    }
  }

  // ---------------------------------------------------- eye drops: tuned "plips" (A5 then C#6)
  [[T.eyeL, hz('A5'), -0.35], [T.eyeR, hz('C#6'), 0.35]].forEach(([t, f0, p], i) => {
    bubble(sfx, t, f0 * 0.62, 0.42, p, 0.03, 0.9);          // the plip: a rising drop tone
    bubble(sfx, t + 0.004, f0 * 1.9, 0.05, p, 0.008, 0.3);    // sparkle of the splash
    noiseSweep(sfx, { t0: t, dur: 0.07, f0: 3000, f1: 1800, q: 1.4, amp: 0.05, attack: 0.05, pan0: p, pan1: p, seed: 30 + i });
    // tiny drip leaving the spout (pre-roll)
    bubble(sfx, t - DROP_FALL, f0 * 1.4, 0.02, p * 0.6, 0.005, 0.2);
  });

  // ---------------------------------------------------- face comes alive: sparkle glissando
  ['B5', 'C#6', 'D6', 'F#6', 'A6', 'B6'].forEach((n, i) => bell(sfx, { note: n, t0: T.alive + i * 0.045, vel: 0.55 - i * 0.04, gain: 0.06, decay: 1.1, pan: -0.4 + i * 0.16 }));

  // ---------------------------------------------------- wink: a bright "tink" + glint
  bell(sfx, { note: 'E6', t0: T.winkStart + 0.02, vel: 0.8, gain: 0.08, decay: 0.7, ratio: 2.0, pan: 0.35 });
  bell(sfx, { note: 'B6', t0: T.winkStart + 0.09, vel: 0.5, gain: 0.05, decay: 0.9, pan: 0.45 });

  // ---------------------------------------------------- camera pull back: soft air
  noiseSweep(sfx, { t0: T.pullStart, dur: 1.6, f0: 2400, f1: 500, q: 0.7, amp: 0.05, attack: 0.35, pan0: 0.2, pan1: -0.2, seed: 41 });
  // short riser through the one-beat break into the logo
  noiseSweep(sfx, { t0: T.logo - 0.6, dur: 0.6, f0: 700, f1: 6000, q: 1.0, amp: 0.06, shape: 'swell', seed: 42 });

  // ---------------------------------------------------- letterpress stamps
  'Brew Bliss'.split('').forEach((ch, i) => {
    if (ch === ' ') return;
    thunk(sfx, T.logo + i * 0.028, i === 0 ? 0.32 : 0.09, -0.3 + i * 0.07, 60 + i, 1 + i * 0.01);
  });
  thunk(sfx, T.logo + 0.42, 0.14, 0, 71, 1.25);                         // foil mark
  ['A6', 'D7'].forEach((n, i) => bell(sfx, { note: n, t0: T.logo + 0.5 + i * 0.12, vel: 0.35, gain: 0.04, decay: 0.8, pan: -0.2 + i * 0.4 }));
  [[T.wordSip, -0.25, 1.0], [T.wordSavor, 0.0, 0.94], [T.wordSmile, 0.25, 0.88]].forEach(([t, p, pitch], i) => thunk(sfx, t, 0.24, p, 80 + i, pitch));
  // gold swash: a quick pen-like swish, then a glint at its end
  noiseSweep(sfx, { t0: T.wordSmile + 0.08, dur: 0.55, f0: 2500, f1: 7000, q: 1.6, amp: 0.035, attack: 0.4, pan0: 0.05, pan1: 0.45, seed: 90 });
  bell(sfx, { note: 'F#7', t0: T.wordSmile + 0.62, vel: 0.4, gain: 0.04, decay: 1.0, pan: 0.45 });

  return { sfx, amb };
}
