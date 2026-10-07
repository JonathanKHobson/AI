#!/usr/bin/env node
// Collects deliverables in dist/: soundtrack (WAV mix + lossless FLAC stems), cue sheet, source ZIP.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const A = path.join(ROOT, 'build', 'audio');
const OUTA = path.join(DIST, 'audio');
fs.mkdirSync(path.join(OUTA, 'stems'), { recursive: true });

const run = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (r.status !== 0) process.exit(r.status || 1);
};

fs.copyFileSync(path.join(A, 'mix.wav'), path.join(OUTA, 'BrewBliss_MorningSmile_mix_48k_24bit.wav'));
fs.copyFileSync(path.join(A, 'cues.json'), path.join(OUTA, 'cues.json'));
for (const f of fs.readdirSync(path.join(A, 'stems'))) {
  if (!f.endsWith('.wav')) continue;
  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', path.join(A, 'stems', f), '-c:a', 'flac', '-compression_level', '8',
    path.join(OUTA, 'stems', f.replace('.wav', '.flac'))]);
}

// third-party licences for what ships inside the picture (fonts) and the renderer
const LIC = path.join(DIST, 'licenses');
fs.mkdirSync(LIC, { recursive: true });
for (const [pkg, name] of [['@fontsource/fraunces', 'Fraunces-OFL.txt'], ['@fontsource/dm-sans', 'DMSans-OFL.txt'], ['three', 'three.js-MIT.txt']]) {
  fs.copyFileSync(path.join(ROOT, 'node_modules', pkg, 'LICENSE'), path.join(LIC, name));
}

const zip = path.join(DIST, 'brew-bliss-film-source.zip');
if (fs.existsSync(zip)) fs.unlinkSync(zip);
run('zip', ['-r', '-q', zip, 'src', 'scripts', 'package.json', 'package-lock.json', 'README.md', '.gitignore'], { cwd: ROOT });
console.log('packaged dist/audio and dist/brew-bliss-film-source.zip');
