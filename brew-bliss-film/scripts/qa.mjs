#!/usr/bin/env node
// Measures the delivered MP4 and writes dist/QA.json + dist/qa/*. Everything here is measured, not assumed.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { T, FPS, FRAMES } from '../src/timeline.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const MP4 = path.join(DIST, 'BrewBliss_MorningSmile_1080x1920_60fps.mp4');
const QA = path.join(DIST, 'qa');
const FR = path.join(DIST, 'frames');
fs.mkdirSync(QA, { recursive: true });
fs.mkdirSync(FR, { recursive: true });

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 28 });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')}\n${r.stderr}`);
  return r.stdout + r.stderr;
};

// ---- container / stream facts
const probe = JSON.parse(run('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', MP4]));
const v = probe.streams.find((s) => s.codec_type === 'video');
const a = probe.streams.find((s) => s.codec_type === 'audio');

// ---- loudness of the delivered (AAC) soundtrack
const ebu = run('ffmpeg', ['-hide_banner', '-nostats', '-i', MP4, '-map', '0:a', '-af', 'ebur128=peak=true', '-f', 'null', '-']);
const summary = ebu.slice(ebu.lastIndexOf('Summary:'));
const num = (re) => { const m = re.exec(summary); return m ? Number(m[1]) : null; };
const loud = {
  integratedLUFS: num(/I:\s+(-?[\d.]+) LUFS/),
  loudnessRangeLU: num(/LRA:\s+(-?[\d.]+) LU/),
  truePeakDBTP: num(/Peak:\s+(-?[\d.]+) dBFS/),
};
const astats = run('ffmpeg', ['-hide_banner', '-nostats', '-i', MP4, '-map', '0:a', '-af', 'astats=measure_overall=Peak_level+RMS_level+DC_offset:measure_perchannel=none', '-f', 'null', '-']);
const pick = (re) => { const m = re.exec(astats); return m ? Number(m[1]) : null; };
loud.samplePeakDBFS = pick(/Peak level dB:\s+(-?[\d.]+)/);
loud.rmsDBFS = pick(/RMS level dB:\s+(-?[\d.]+)/);
loud.dcOffset = pick(/DC offset:\s+(-?[\d.e-]+)/);

// ---- uniqueness: every frame should be a distinct render (no duplicated/held frames from a lower rate)
const md5 = run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', MP4, '-map', '0:v', '-f', 'framemd5', '-']);
const hashes = md5.split('\n').filter((l) => l && !l.startsWith('#')).map((l) => l.split(',').pop().trim());
let dupes = 0;
for (let i = 1; i < hashes.length; i++) if (hashes[i] === hashes[i - 1]) dupes++;

// ---- frames decoded from the delivered file (what a viewer actually sees)
const picks = {
  '01_dawn_good_morning': 1.95, '02_pour_begins': 2.95, '03_smile_drawn': 4.4, '04_eyes_complete': 6.75,
  '05_wink': 7.62, '06_brand_stamp': 10.2, '07_final_card': 14.5,
};
for (const [name, t] of Object.entries(picks)) {
  const f = Math.round(t * FPS);
  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', MP4, '-vf', `select=eq(n\\,${f})`, '-vsync', '0', '-frames:v', '1', path.join(FR, `${name}_f${String(f).padStart(3, '0')}.png`)]);
}
// contact sheet: 2 frames per second of runtime
run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', MP4, '-vf', 'fps=2,scale=216:384,tile=10x3:padding=4:color=0x1a120c', '-frames:v', '1', path.join(QA, 'contact_sheet_2fps.png')]);
// audio pictures
run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', MP4, '-lavfi', 'showspectrumpic=s=1600x500:legend=1:scale=log:fscale=log', path.join(QA, 'spectrogram.png')]);
run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', MP4, '-lavfi', 'showwavespic=s=1600x300:split_channels=1:colors=0x2E5B45|0xB9761A', path.join(QA, 'waveform.png')]);

const [rn, rd] = v.r_frame_rate.split('/').map(Number);
const report = {
  file: path.relative(ROOT, MP4),
  bytes: Number(probe.format.size),
  durationSeconds: Number(probe.format.duration),
  video: {
    codec: `${v.codec_name} (${v.profile})`, width: v.width, height: v.height, pixFmt: v.pix_fmt,
    frameRate: rn / rd, avgFrameRate: v.avg_frame_rate, frames: Number(v.nb_read_frames), expectedFrames: FRAMES,
    colour: { primaries: v.color_primaries, transfer: v.color_transfer, matrix: v.color_space, range: v.color_range },
    bitrateKbps: Math.round(Number(v.bit_rate) / 1000), consecutiveDuplicateFrames: dupes,
  },
  audio: { codec: a.codec_name, sampleRate: Number(a.sample_rate), channels: a.channels, bitrateKbps: Math.round(Number(a.bit_rate) / 1000), ...loud },
  syncEvents: Object.fromEntries(Object.entries(T).map(([k, t]) => [k, { seconds: t, frame: Math.round(t * FPS) }])),
};
fs.writeFileSync(path.join(DIST, 'QA.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
