// Procedural textures painted with Canvas 2D from seeded noise. No image files.
import * as THREE from 'three';
import { rng, makeNoise2D } from './util.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

// Shared ring phase so glaze "breaks" lighter exactly on the bump-mapped ridges.
const RING_NOISE_SEED = 77;
function ringPhase(n, u, v) {
  const wob = (n.noiseTile(u * 6, v * 40, 6) - 0.5) * 1.6 + (n.noiseTile(u * 2, v * 9 + 4.0, 2) - 0.5) * 1.2;
  const amp = 0.25 + 0.75 * n.noiseTile(u * 3 + 7.0, v * 14, 3); // fingers press unevenly
  return { a: amp * Math.sin(2 * Math.PI * (v * 38 + wob)), b: amp * Math.sin(2 * Math.PI * (v * 91 + wob * 1.7 + 0.3)), wob };
}

// Glaze map (multiplies vertex colour): uneven glaze thickness, lighter glaze breaking on
// throwing ridges, faint vertical runs, and clustered iron speckles with soft bleed.
export function glazeTexture(renderer) {
  const W = 2048, H = 1024;
  const c = canvas(W, H);
  const g = c.getContext('2d');
  const img = g.createImageData(W, H);
  const n = makeNoise2D(RING_NOISE_SEED);
  const m = makeNoise2D(5150);
  for (let y = 0; y < H; y++) {
    const v = y / H;
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const mott = m.fbmTile(u * 7, v * 5, 7, 4);               // glaze thickness
      const runs = m.noiseTile(u * 48, v * 3.0 + 9.1, 48);       // vertical runs
      const { a, b } = ringPhase(n, u, v);
      let k = 0.86 + 0.20 * (mott - 0.5) + 0.035 * a + 0.015 * b + 0.07 * (runs - 0.5);
      // slight hue drift: thicker glaze leans blue-green, thinner leans olive
      const i = (y * W + x) * 4;
      const hue = (mott - 0.5) * 0.06;
      img.data[i] = Math.max(0, Math.min(255, (k - hue) * 255));
      img.data[i + 1] = Math.max(0, Math.min(255, k * 255));
      img.data[i + 2] = Math.max(0, Math.min(255, (k + hue) * 255));
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  // speckles: clustered by noise, soft-edged, with a faint pale bleed ring
  const r = rng(1207);
  const blot = (x, y, rad, rgb, a) => {
    for (const ox of [-W, 0, W]) {
      const X = x + ox;
      if (X < -12 || X > W + 12) continue;
      const gr = g.createRadialGradient(X, y, 0, X, y, rad * 2.2);
      gr.addColorStop(0, `rgba(${rgb},${a})`);
      gr.addColorStop(0.45, `rgba(${rgb},${a * 0.8})`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr;
      g.beginPath(); g.arc(X, y, rad * 2.2, 0, Math.PI * 2); g.fill();
    }
  };
  let placed = 0, tries = 0;
  while (placed < 3800 && tries < 60000) {
    tries++;
    const x = r() * W, y = r() * H;
    const dens = m.fbmTile((x / W) * 9 + 3.3, (y / H) * 6 + 1.7, 9, 3);
    if (r() > Math.pow(dens, 2.2) * 2.4) continue;
    const rad = 0.6 + Math.pow(r(), 4) * 3.2;
    blot(x, y, rad * 1.6, '250,240,215', 0.10);
    blot(x, y, rad, `${48 + r() * 30 | 0},${30 + r() * 12 | 0},${18 + r() * 8 | 0}`, 0.35 + r() * 0.45);
    placed++;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

// Throwing rings: faint horizontal ridges left by the potter's fingers.
export function throwingRingsTexture() {
  const W = 128, H = 2048;
  const c = canvas(W, H);
  const g = c.getContext('2d');
  const img = g.createImageData(W, H);
  const n = makeNoise2D(RING_NOISE_SEED);
  for (let y = 0; y < H; y++) {
    const v = y / H;
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const { a, b } = ringPhase(n, u, v);
      let h = 0.5 + 0.22 * a + 0.10 * b + 0.06 * (n.noiseTile(u * 24, v * 300, 24) - 0.5);
      const val = Math.max(0, Math.min(255, h * 255)) | 0;
      const i = (y * W + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = val;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

// Warm limewash table: low-frequency mottling in cream tones (tileable).
export function tableTextures(renderer) {
  const S = 1024;
  const c = canvas(S, S);
  const g = c.getContext('2d');
  const img = g.createImageData(S, S);
  const bump = canvas(S, S);
  const gb = bump.getContext('2d');
  const imgB = gb.createImageData(S, S);
  const n = makeNoise2D(4242);
  const r = rng(99);
  const A = [234, 220, 199]; // deeper cream
  const B = [247, 238, 224]; // pale cream
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const u = x / S, v = y / S;
      const m = n.fbmTile(u * 4, v * 4, 4, 5);
      const cloud = n.fbmTile(u * 9 + 3.3, v * 9 + 1.1, 9, 3);
      let k = Math.min(1, Math.max(0, (m - 0.32) * 2.2));
      k = k * 0.8 + cloud * 0.2;
      const grain = (r() - 0.5) * 5;
      const i = (y * S + x) * 4;
      for (let ch = 0; ch < 3; ch++) img.data[i + ch] = Math.max(0, Math.min(255, A[ch] + (B[ch] - A[ch]) * k + grain));
      img.data[i + 3] = 255;
      const hb = 128 + (n.noiseTile(u * 160, v * 160, 160) - 0.5) * 90 + (m - 0.5) * 60;
      imgB.data[i] = imgB.data[i + 1] = imgB.data[i + 2] = Math.max(0, Math.min(255, hb));
      imgB.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  gb.putImageData(imgB, 0, 0);
  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const bumpMap = new THREE.CanvasTexture(bump);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.colorSpace = THREE.NoColorSpace;
  bumpMap.anisotropy = map.anisotropy;
  return { map, bumpMap };
}

// Per-profile map: R = clearcoat, G = roughness. v follows the lathe profile, u goes around;
// a little noise breaks up the specular so highlights don't look machine-perfect.
export function profileStripTexture(values) {
  const N = values.length, U = 128;
  const n = makeNoise2D(313);
  const data = new Uint8Array(N * U * 4);
  for (let j = 0; j < N; j++) {
    const [clearcoat, rough] = values[j];
    for (let i = 0; i < U; i++) {
      const k = n.fbmTile((i / U) * 8, (j / N) * 24, 8, 3) - 0.5;
      const o = (j * U + i) * 4;
      data[o] = Math.round(Math.max(0, Math.min(1, clearcoat * (0.88 + 0.3 * k))) * 255);
      data[o + 1] = Math.round(Math.max(0, Math.min(1, rough + 0.14 * k)) * 255);
      data[o + 2] = 0;
      data[o + 3] = 255;
    }
  }
  const t = new THREE.DataTexture(data, U, N, THREE.RGBAFormat);
  t.wrapS = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

// Soft contact shadow blob (alpha falls off toward the edge).
export function contactShadowTexture(inner, outer, strength) {
  const S = 512;
  const c = canvas(S, S);
  const g = c.getContext('2d');
  const img = g.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const r = Math.hypot(x - S / 2 + 0.5, y - S / 2 + 0.5) / (S / 2);
    const k = Math.max(0, Math.min(1, (r - inner) / (outer - inner)));
    const a = strength * (1 - k * k * (3 - 2 * k)) * (r <= 1 ? 1 : 0);
    const i = (y * S + x) * 4;
    img.data[i] = 34; img.data[i + 1] = 22; img.data[i + 2] = 14; img.data[i + 3] = a * 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
