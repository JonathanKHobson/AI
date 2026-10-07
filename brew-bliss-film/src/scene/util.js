// Small deterministic helpers shared by the scene modules.
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const remap = (t, a, b) => clamp((t - a) / (b - a));
export const smooth = (k) => k * k * (3 - 2 * k);
export const smoother = (k) => k * k * k * (k * (k * 6 - 15) + 10);
export const easeInOutCubic = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
export const easeOutCubic = (k) => 1 - Math.pow(1 - k, 3);
export const easeInCubic = (k) => k * k * k;
export const easeOutQuint = (k) => 1 - Math.pow(1 - k, 5);
export const easeInOutSine = (k) => -(Math.cos(Math.PI * k) - 1) / 2;
export const easeOutBack = (k, s = 1.7) => 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2);
export const deg = (d) => (d * Math.PI) / 180;

// Keyframe interpolation: keys = [[t, value], ...], value may be number or array.
export function keyframes(t, keys, ease = smoother) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i];
    const [t1, v1] = keys[i + 1];
    if (t <= t1) {
      const k = ease((t - t0) / (t1 - t0));
      if (Array.isArray(v0)) return v0.map((x, j) => lerp(x, v1[j], k));
      return lerp(v0, v1, k);
    }
  }
  return keys[keys.length - 1][1];
}

// Seeded PRNG (mulberry32) — all "randomness" in the film is reproducible.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 2D value noise + fbm for procedural canvas textures.
export function makeNoise2D(seed) {
  const r = rng(seed);
  const N = 256;
  const perm = new Uint16Array(N * 2);
  const vals = new Float32Array(N);
  for (let i = 0; i < N; i++) { perm[i] = i; vals[i] = r(); }
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < N; i++) perm[i + N] = perm[i];
  const h = (x, y) => vals[perm[(perm[x & 255] + y) & 511] & 255];
  const noise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
  };
  // Tileable variant: wraps lattice at period p.
  const hp = (x, y, p) => h(((x % p) + p) % p, ((y % p) + p) % p);
  const noiseTile = (x, y, p) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hp(xi, yi, p), b = hp(xi + 1, yi, p), c = hp(xi, yi + 1, p), d = hp(xi + 1, yi + 1, p);
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
  };
  const fbmTile = (x, y, p, oct = 5) => {
    let s = 0, amp = 0.5, f = 1, norm = 0;
    for (let o = 0; o < oct; o++) { s += amp * noiseTile(x * f, y * f, p * f); norm += amp; amp *= 0.5; f *= 2; }
    return s / norm;
  };
  return { noise, noiseTile, fbmTile };
}

export function hexToLinear(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return c;
}
