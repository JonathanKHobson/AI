// Tiny offline DSP toolkit (pure JavaScript, no dependencies).
// Everything renders into Float32Array stereo buffers at 48 kHz.

export const SR = 48000;
export const TAU = Math.PI * 2;
export const dbToGain = (db) => Math.pow(10, db / 20);
export const midiToHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

const NOTE = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
export function noteToMidi(name) {
  const m = /^([A-G][#b]?)(-?\d)$/.exec(name);
  if (!m) throw new Error('bad note ' + name);
  return 12 * (Number(m[2]) + 1) + NOTE[m[1]];
}
export const hz = (name) => midiToHz(noteToMidi(name));

export class Stereo {
  constructor(seconds) {
    this.n = Math.ceil(seconds * SR);
    this.L = new Float32Array(this.n);
    this.R = new Float32Array(this.n);
  }
  add(i, l, r) { if (i >= 0 && i < this.n) { this.L[i] += l; this.R[i] += r; } }
  mix(other, gain = 1) {
    for (let i = 0; i < this.n; i++) { this.L[i] += other.L[i] * gain; this.R[i] += other.R[i] * gain; }
    return this;
  }
  scale(g) { for (let i = 0; i < this.n; i++) { this.L[i] *= g; this.R[i] *= g; } return this; }
  clone() { const s = new Stereo(0); s.n = this.n; s.L = this.L.slice(); s.R = this.R.slice(); return s; }
}

// equal-power pan, p in [-1, 1]
export function panGains(p) {
  const a = (Math.max(-1, Math.min(1, p)) + 1) * Math.PI / 4;
  return [Math.cos(a), Math.sin(a)];
}

// Seeded PRNG
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// RBJ biquad
export class Biquad {
  constructor(type, freq, q = 0.707, gainDb = 0) { this.set(type, freq, q, gainDb); this.x1 = this.x2 = this.y1 = this.y2 = 0; }
  set(type, freq, q = 0.707, gainDb = 0) {
    const w = TAU * Math.min(freq, SR * 0.49) / SR, cs = Math.cos(w), sn = Math.sin(w);
    const alpha = sn / (2 * q), A = Math.pow(10, gainDb / 40);
    let b0, b1, b2, a0, a1, a2;
    switch (type) {
      case 'lowpass': b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = b0; a0 = 1 + alpha; a1 = -2 * cs; a2 = 1 - alpha; break;
      case 'highpass': b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = b0; a0 = 1 + alpha; a1 = -2 * cs; a2 = 1 - alpha; break;
      case 'bandpass': b0 = alpha; b1 = 0; b2 = -alpha; a0 = 1 + alpha; a1 = -2 * cs; a2 = 1 - alpha; break;
      case 'peak': b0 = 1 + alpha * A; b1 = -2 * cs; b2 = 1 - alpha * A; a0 = 1 + alpha / A; a1 = -2 * cs; a2 = 1 - alpha / A; break;
      case 'lowshelf': {
        const s = 2 * Math.sqrt(A) * alpha;
        b0 = A * ((A + 1) - (A - 1) * cs + s); b1 = 2 * A * ((A - 1) - (A + 1) * cs); b2 = A * ((A + 1) - (A - 1) * cs - s);
        a0 = (A + 1) + (A - 1) * cs + s; a1 = -2 * ((A - 1) + (A + 1) * cs); a2 = (A + 1) + (A - 1) * cs - s; break;
      }
      case 'highshelf': {
        const s = 2 * Math.sqrt(A) * alpha;
        b0 = A * ((A + 1) + (A - 1) * cs + s); b1 = -2 * A * ((A - 1) + (A + 1) * cs); b2 = A * ((A + 1) + (A - 1) * cs - s);
        a0 = (A + 1) - (A - 1) * cs + s; a1 = 2 * ((A - 1) - (A + 1) * cs); a2 = (A + 1) - (A - 1) * cs - s; break;
      }
      default: throw new Error(type);
    }
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = a1 / a0; this.a2 = a2 / a0;
    return this;
  }
  tick(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y;
    return y;
  }
}

export function filterStereo(buf, type, freq, q, gainDb) {
  const fl = new Biquad(type, freq, q, gainDb), fr = new Biquad(type, freq, q, gainDb);
  for (let i = 0; i < buf.n; i++) { buf.L[i] = fl.tick(buf.L[i]); buf.R[i] = fr.tick(buf.R[i]); }
  return buf;
}

// Freeverb-style stereo reverb (Jezar's tunings), wet-only output.
export function reverb(buf, { room = 0.82, damp = 0.35, width = 1.0, predelay = 0.012, lowcut = 180, highcut = 9000 } = {}) {
  const combT = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617];
  const apT = [556, 441, 341, 225];
  const scale = SR / 44100, spread = 23;
  const mk = (len) => ({ b: new Float32Array(Math.round(len * scale)), i: 0, f: 0 });
  const combsL = combT.map((t) => mk(t)), combsR = combT.map((t) => mk(t + spread));
  const apsL = apT.map((t) => mk(t)), apsR = apT.map((t) => mk(t + spread));
  const fb = room * 0.28 + 0.7, d1 = damp * 0.4, d2 = 1 - d1;
  const pd = Math.round(predelay * SR);
  const out = new Stereo(0); out.n = buf.n; out.L = new Float32Array(buf.n); out.R = new Float32Array(buf.n);
  const hpL = new Biquad('highpass', lowcut, 0.7), hpR = new Biquad('highpass', lowcut, 0.7);
  const lpL = new Biquad('lowpass', highcut, 0.7), lpR = new Biquad('lowpass', highcut, 0.7);
  const comb = (c, x) => {
    const y = c.b[c.i];
    c.f = y * d2 + c.f * d1;
    c.b[c.i] = x + c.f * fb;
    if (++c.i >= c.b.length) c.i = 0;
    return y;
  };
  const ap = (a, x) => {
    const bo = a.b[a.i];
    const y = -x + bo;
    a.b[a.i] = x + bo * 0.5;
    if (++a.i >= a.b.length) a.i = 0;
    return y;
  };
  const wet1 = width / 2 + 0.5, wet2 = (1 - width) / 2;
  for (let i = 0; i < buf.n; i++) {
    const j = i - pd;
    const x = j >= 0 ? (buf.L[j] + buf.R[j]) * 0.015 : 0;
    const xin = lpL.tick(hpL.tick(x));
    let l = 0, r = 0;
    for (let k = 0; k < 8; k++) { l += comb(combsL[k], xin); r += comb(combsR[k], xin); }
    for (let k = 0; k < 4; k++) { l = ap(apsL[k], l); r = ap(apsR[k], r); }
    out.L[i] = l * wet1 + r * wet2;
    out.R[i] = r * wet1 + l * wet2;
  }
  return out;
}

// Stereo ping-pong delay (wet only)
export function pingPong(buf, { time = 0.3, feedback = 0.35, lp = 4500 } = {}) {
  const d = Math.round(time * SR);
  const out = new Stereo(0); out.n = buf.n; out.L = new Float32Array(buf.n); out.R = new Float32Array(buf.n);
  const lpf = new Biquad('lowpass', lp, 0.7);
  const bl = new Float32Array(d), br = new Float32Array(d);
  let idx = 0;
  for (let i = 0; i < buf.n; i++) {
    const dl = bl[idx], dr = br[idx];
    const inp = (buf.L[i] + buf.R[i]) * 0.5;
    bl[idx] = lpf.tick(inp + dr * feedback);
    br[idx] = dl * feedback;
    out.L[i] = dl; out.R[i] = dr;
    if (++idx >= d) idx = 0;
  }
  return out;
}

// Feed-forward compressor with soft knee (operates on a stereo-linked envelope).
export function compress(buf, { threshold = -18, ratio = 3, attack = 0.01, release = 0.15, knee = 6, makeup = 0, sidechain = null } = {}) {
  const aA = Math.exp(-1 / (attack * SR)), aR = Math.exp(-1 / (release * SR));
  let env = 0;
  const sc = sidechain || buf;
  for (let i = 0; i < buf.n; i++) {
    const x = Math.max(Math.abs(sc.L[i]), Math.abs(sc.R[i]));
    env = x > env ? aA * env + (1 - aA) * x : aR * env + (1 - aR) * x;
    const lvl = 20 * Math.log10(env + 1e-9);
    let over = lvl - threshold, gr = 0;
    if (over > knee / 2) gr = over * (1 - 1 / ratio);
    else if (over > -knee / 2) gr = ((over + knee / 2) ** 2) / (2 * knee) * (1 - 1 / ratio);
    const g = dbToGain(makeup - gr);
    buf.L[i] *= g; buf.R[i] *= g;
  }
  return buf;
}

// Look-ahead brickwall limiter with 4x-oversampled peak estimate (true-peak-ish).
export function limit(buf, { ceilingDb = -1.2, lookahead = 0.005, release = 0.12 } = {}) {
  const ceil = dbToGain(ceilingDb);
  const la = Math.round(lookahead * SR);
  const n = buf.n;
  const peak = new Float32Array(n);
  const tp = (a, b, c, d) => { // cubic interpolation between b and c at 1/4,1/2,3/4
    let m = Math.max(Math.abs(b), Math.abs(c));
    for (const t of [0.25, 0.5, 0.75]) {
      const v = b + 0.5 * t * (c - a + t * (2 * a - 5 * b + 4 * c - d + t * (3 * (b - c) + d - a)));
      m = Math.max(m, Math.abs(v));
    }
    return m;
  };
  for (let i = 0; i < n; i++) {
    const g = (arr) => tp(arr[Math.max(0, i - 1)], arr[i], arr[Math.min(n - 1, i + 1)], arr[Math.min(n - 1, i + 2)]);
    peak[i] = Math.max(g(buf.L), g(buf.R));
  }
  // required gain, then a min over the look-ahead window, then smooth release
  const req = new Float32Array(n);
  for (let i = 0; i < n; i++) req[i] = peak[i] > ceil ? ceil / peak[i] : 1;
  const winMin = new Float32Array(n);
  const dq = []; // monotonic deque for sliding-window minimum over [i, i+la]
  for (let i = n - 1; i >= 0; i--) {
    while (dq.length && req[dq[dq.length - 1]] >= req[i]) dq.pop();
    dq.push(i);
    while (dq[0] > i + la) dq.shift();
    winMin[i] = req[dq[0]];
  }
  const aR = Math.exp(-1 / (release * SR));
  const aA = Math.exp(-1 / (la * 0.5 + 1));
  let g = 1;
  for (let i = 0; i < n; i++) {
    const target = winMin[i];
    g = target < g ? aA * g + (1 - aA) * target : aR * g + (1 - aR) * target;
    if (g > target && target < 1) g = Math.min(g, target * 1.0);
    buf.L[i] *= g; buf.R[i] *= g;
  }
  return buf;
}

export function softClip(x, drive = 1) { return Math.tanh(x * drive) / Math.tanh(drive); }

// PolyBLEP band-limited sawtooth
export function polyblep(t, dt) {
  if (t < dt) { t /= dt; return t + t - t * t - 1; }
  if (t > 1 - dt) { t = (t - 1) / dt; return t * t + t + t + 1; }
  return 0;
}

export function writeWav(path, buf, fs) {
  const n = buf.n, ch = 2, bytes = 3; // 24-bit PCM
  const data = Buffer.alloc(n * ch * bytes);
  let o = 0;
  for (let i = 0; i < n; i++) {
    for (const arr of [buf.L, buf.R]) {
      let v = Math.max(-1, Math.min(1, arr[i]));
      let s = Math.round(v * 8388607);
      data.writeIntLE(s, o, 3); o += 3;
    }
  }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(ch, 22);
  h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * ch * bytes, 28); h.writeUInt16LE(ch * bytes, 32); h.writeUInt16LE(bytes * 8, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  fs.writeFileSync(path, Buffer.concat([h, data]));
}
