#!/usr/bin/env node
// Renders frames of the film in headless Chromium (Three.js on WebGL/SwiftShader + Canvas 2D).
//   node scripts/render-video.mjs                 -> all 900 frames -> build/frames, then video-only MP4
//   node scripts/render-video.mjs --stills 0,300  -> selected frames -> build/stills
//   node scripts/render-video.mjs --range 0:900 --step 6 --workers 3
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { startServer } from './lib/server.mjs';
import { launch } from './lib/browser.mjs';
import { FRAMES, FPS, WIDTH, HEIGHT } from '../src/timeline.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const has = (name) => args.includes(name);

const stills = opt('--stills', null);
const [r0, r1] = (opt('--range', `0:${FRAMES}`)).split(':').map(Number);
const step = Number(opt('--step', 1));
const workers = Number(opt('--workers', 3));
const outDir = path.join(ROOT, stills ? opt('--out', 'build/stills') : 'build/frames');
fs.mkdirSync(outDir, { recursive: true });

let frames = stills ? stills.split(',').map(Number) : [];
if (!stills) for (let f = r0; f < r1; f += step) frames.push(f);
if (has('--missing')) frames = frames.filter((f) => !fs.existsSync(path.join(outDir, `f_${String(f).padStart(4, '0')}.png`)));

const encodeOnly = has('--encode-only');
if (encodeOnly) frames = [];
const { server, port } = await startServer(ROOT);
const url = `http://127.0.0.1:${port}/src/scene/index.html`;
console.log(`rendering ${frames.length} frames with ${workers} workers -> ${path.relative(ROOT, outDir)}`);

const t0 = Date.now();
let done = 0;
async function worker(id, list) {
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 700 } });
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`[w${id}] ${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => console.log(`[w${id}] pageerror: ${e.message}`));
  await page.goto(url);
  const status = await page.evaluate(() => window.ready);
  if (status !== 'ok') throw new Error(`worker ${id}: ${status}`);
  for (const f of list) {
    await page.evaluate((n) => window.renderFrame(n), f);
    const b64 = await page.evaluate(() => window.frameAsPNG());
    fs.writeFileSync(path.join(outDir, `f_${String(f).padStart(4, '0')}.png`), Buffer.from(b64, 'base64'));
    done++;
    if (done % 25 === 0 || done === frames.length) {
      const el = (Date.now() - t0) / 1000;
      console.log(`  ${done}/${frames.length}  ${(el / done).toFixed(2)} s/frame  eta ${((frames.length - done) * el / done / 60).toFixed(1)} min`);
    }
  }
  await browser.close();
}

const lists = Array.from({ length: workers }, () => []);
frames.forEach((f, i) => lists[i % workers].push(f));
if (frames.length) await Promise.all(lists.filter((l) => l.length).map((l, i) => worker(i, l)));
server.close();
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)} s`);

if (encodeOnly || (!stills && step === 1 && r0 === 0 && r1 === FRAMES && !has('--no-encode'))) {
  const missing = [];
  for (let f = 0; f < FRAMES; f++) if (!fs.existsSync(path.join(outDir, `f_${String(f).padStart(4, '0')}.png`))) missing.push(f);
  if (missing.length) { console.error(`cannot encode: ${missing.length} frames missing (first: ${missing[0]})`); process.exit(1); }
  fs.mkdirSync(path.join(ROOT, 'build'), { recursive: true });
  const video = path.join(ROOT, 'build', 'video-only.mp4');
  const res = spawnSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-framerate', String(FPS), '-i', path.join(outDir, 'f_%04d.png'),
    '-vf', `scale=${WIDTH}:${HEIGHT}:in_range=full:out_range=tv:out_color_matrix=bt709:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-profile:v', 'high', '-level', '4.2',
    '-x264-params', 'keyint=60:min-keyint=60:aq-mode=3',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
    '-r', String(FPS), '-fps_mode', 'cfr', video,
  ], { stdio: 'inherit' });
  if (res.status !== 0) process.exit(res.status);
  console.log(`encoded ${path.relative(ROOT, video)}`);
}
