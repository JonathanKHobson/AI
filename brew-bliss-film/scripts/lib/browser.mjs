// Launches the pre-installed Chromium with software WebGL (SwiftShader via ANGLE).
import { chromium } from 'playwright';
import fs from 'node:fs';

export const CHROMIUM_ARGS = [
  '--use-angle=swiftshader',
  '--use-gl=angle',
  '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist',
  '--enable-webgl',
  '--disable-gpu-vsync',
  '--disable-frame-rate-limit',
  '--force-color-profile=srgb',
  '--font-render-hinting=none',
];

function findChromium() {
  const candidates = [
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium/chrome-linux/chrome',
  ];
  return candidates.find((p) => fs.existsSync(p));
}

export async function launch() {
  const executablePath = findChromium();
  return chromium.launch({ headless: true, executablePath, args: CHROMIUM_ARGS });
}
