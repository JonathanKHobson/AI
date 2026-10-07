#!/usr/bin/env node
// Muxes the encoded picture with the mastered soundtrack into the deliverable MP4.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
fs.mkdirSync(DIST, { recursive: true });
const video = path.join(ROOT, 'build', 'video-only.mp4');
const audio = path.join(ROOT, 'build', 'audio', 'mix.wav');
const out = path.join(DIST, 'BrewBliss_MorningSmile_1080x1920_60fps.mp4');
for (const f of [video, audio]) if (!fs.existsSync(f)) { console.error(`missing ${f}`); process.exit(1); }

const res = spawnSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-i', video, '-i', audio,
  '-map', '0:v:0', '-map', '1:a:0',
  '-c:v', 'copy',
  '-c:a', 'aac', '-b:a', '320k', '-ar', '48000', '-ac', '2',
  '-metadata', 'title=Brew Bliss — Morning Smile',
  '-metadata', 'comment=Fictional brand film. Picture rendered in-browser (Three.js/WebGL + Canvas 2D) at t=frame/60; score and SFX synthesised in JavaScript at 48 kHz.',
  '-movflags', '+faststart',
  '-shortest', out,
], { stdio: 'inherit' });
if (res.status !== 0) process.exit(res.status);
console.log(`wrote ${path.relative(ROOT, out)}`);
