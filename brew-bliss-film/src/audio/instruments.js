// Synthesised instruments. Each writes into a Stereo buffer at a start time.
import { SR, TAU, Stereo, panGains, rng, polyblep, softClip, Biquad, hz } from './dsp.js';

const f = (n) => (typeof n === 'number' ? n : hz(n));

// Warm analogue-style pad: three detuned band-limited saws per note, filtered, slow swell.
export function pad(buf, { notes, t0, dur, gain = 0.08, attack = 0.9, release = 1.4, cutoff = 1500, cutoffEnd = null, pan = 0 }) {
  const n0 = Math.floor(t0 * SR), len = Math.floor((dur + release) * SR);
  const lpL = new Biquad('lowpass', cutoff, 0.6), lpR = new Biquad('lowpass', cutoff, 0.6);
  const voices = [];
  notes.forEach((nn, k) => {
    const base = f(nn);
    for (const [det, side] of [[-0.11, -1], [0.0, 0], [0.12, 1]]) {
      voices.push({ inc: base * Math.pow(2, det / 12) / SR, ph: (k * 0.37 + det) % 1, side });
    }
  });
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    if (cutoffEnd && i % 64 === 0) {
      const c = cutoff + (cutoffEnd - cutoff) * Math.min(1, t / dur);
      lpL.set('lowpass', c, 0.6); lpR.set('lowpass', c, 0.6);
    }
    let env = Math.min(1, t / attack);
    env = env * env * (3 - 2 * env);
    if (t > dur) env *= Math.max(0, 1 - (t - dur) / release);
    let l = 0, r = 0;
    for (const v of voices) {
      v.ph += v.inc; if (v.ph >= 1) v.ph -= 1;
      const s = 2 * v.ph - 1 - polyblep(v.ph, v.inc);
      l += s * (v.side <= 0 ? 1 : 0.55); r += s * (v.side >= 0 ? 1 : 0.55);
    }
    const [gl, gr] = panGains(pan);
    buf.add(n0 + i, lpL.tick(l) * env * gain * gl, lpR.tick(r) * env * gain * gr);
  }
}

// FM electric piano (tine + bark), soft and round.
export function epiano(buf, { note, t0, dur = 0.8, vel = 0.7, gain = 0.12, pan = 0 }) {
  const fr = f(note);
  const n0 = Math.floor(t0 * SR), rel = 0.35, len = Math.floor((dur + rel + 1.2) * SR);
  const [gl, gr] = panGains(pan);
  let pc = 0, pm = 0, pt = 0;
  const trem = 4.8;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const idx = (1.1 * vel + 0.25) * Math.exp(-t / 0.35) + 0.18;
    pm += fr / SR; pc += fr / SR; pt += (fr * 13.97) / SR;
    const mod = Math.sin(TAU * pm) * idx;
    let s = Math.sin(TAU * pc + mod);
    s += 0.12 * vel * Math.sin(TAU * pt) * Math.exp(-t / 0.04); // tine strike
    let env = Math.exp(-t / (1.6 - 0.5 * Math.min(1, fr / 1000))) * Math.min(1, t / 0.003);
    if (t > dur) env *= Math.exp(-(t - dur) / 0.12);
    const tr = 1 + 0.12 * Math.sin(TAU * trem * t);
    const v = softClip(s * env * vel, 1.3) * gain;
    buf.add(n0 + i, v * gl * tr, v * gr * (2 - tr));
  }
}

// Kalimba / soft mallet: fundamental + inharmonic tine partial + woody click.
export function kalimba(buf, { note, t0, vel = 0.8, gain = 0.16, pan = 0, decay = 0.9, seed = 1 }) {
  const fr = f(note);
  const n0 = Math.floor(t0 * SR), len = Math.floor((decay * 4) * SR);
  const [gl, gr] = panGains(pan);
  const r = rng(seed);
  let p1 = 0, p2 = 0, p3 = 0;
  const click = new Biquad('bandpass', Math.min(fr * 6, 9000), 2.5);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const bend = 1 + 0.004 * Math.exp(-t / 0.02);
    p1 += (fr * bend) / SR; p2 += (fr * 5.95) / SR; p3 += (fr * 2.01) / SR;
    let s = Math.sin(TAU * p1) * Math.exp(-t / decay);
    s += 0.28 * Math.sin(TAU * p2) * Math.exp(-t / (decay * 0.12));
    s += 0.10 * Math.sin(TAU * p3) * Math.exp(-t / (decay * 0.5));
    s += click.tick((r() * 2 - 1)) * 0.5 * Math.exp(-t / 0.006);
    s *= Math.min(1, t / 0.0015);
    const v = s * vel * gain;
    buf.add(n0 + i, v * gl, v * gr);
  }
}

// Celesta / glockenspiel bell (FM, inharmonic shimmer).
export function bell(buf, { note, t0, vel = 0.7, gain = 0.1, pan = 0, decay = 1.6, ratio = 3.5 }) {
  const fr = f(note);
  const n0 = Math.floor(t0 * SR), len = Math.floor(decay * 4 * SR);
  const [gl, gr] = panGains(pan);
  let pc = 0, pm = 0, p2 = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    pc += fr / SR; pm += (fr * ratio) / SR; p2 += (fr * 4.0) / SR;
    const idx = 1.6 * Math.exp(-t / 0.18);
    let s = Math.sin(TAU * pc + idx * Math.sin(TAU * pm));
    s += 0.25 * Math.sin(TAU * p2) * Math.exp(-t / 0.25);
    const env = Math.exp(-t / decay) * Math.min(1, t / 0.001);
    const v = s * env * vel * gain;
    buf.add(n0 + i, v * gl, v * gr);
  }
}

// Round plucked bass.
export function bass(buf, { note, t0, dur = 0.5, vel = 0.8, gain = 0.32 }) {
  const fr = f(note);
  const n0 = Math.floor(t0 * SR), len = Math.floor((dur + 0.25) * SR);
  let p = 0;
  const lp = new Biquad('lowpass', 900, 0.8);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const bend = 1 + 0.02 * Math.exp(-t / 0.012);
    p += (fr * bend) / SR;
    let s = Math.sin(TAU * p) + 0.32 * Math.sin(2 * TAU * p) * Math.exp(-t / 0.25) + 0.12 * Math.sin(3 * TAU * p) * Math.exp(-t / 0.08);
    let env = Math.exp(-t / 0.9) * Math.min(1, t / 0.006);
    if (t > dur) env *= Math.exp(-(t - dur) / 0.05);
    const v = lp.tick(softClip(s * env * vel, 1.6)) * gain;
    buf.add(n0 + i, v, v);
  }
}

// ----------------------------------------------------------------- drums
export function kick(buf, { t0, vel = 0.8, gain = 0.5 }) {
  const n0 = Math.floor(t0 * SR), len = Math.floor(0.45 * SR);
  let p = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const fr = 58 + 85 * Math.exp(-t / 0.03);
    p += fr / SR;
    const s = Math.sin(TAU * p) * Math.exp(-t / 0.13) + 0.18 * Math.exp(-t / 0.003);
    const v = softClip(s * vel, 1.4) * gain;
    buf.add(n0 + i, v, v);
  }
}

export function brushSnare(buf, { t0, vel = 0.7, gain = 0.16, seed = 3, pan = 0.08 }) {
  const n0 = Math.floor(t0 * SR), len = Math.floor(0.35 * SR);
  const r = rng(seed);
  const bp = new Biquad('bandpass', 2100, 0.8), hp = new Biquad('highpass', 700, 0.7);
  const [gl, gr] = panGains(pan);
  let p = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const noise = hp.tick(bp.tick(r() * 2 - 1));
    p += 185 / SR;
    const s = noise * Math.exp(-t / 0.11) * Math.min(1, t / 0.004) * 1.8 + 0.3 * Math.sin(TAU * p) * Math.exp(-t / 0.05);
    const v = s * vel * gain;
    buf.add(n0 + i, v * gl, v * gr);
  }
}

export function shaker(buf, { t0, vel = 0.5, gain = 0.06, seed = 5, pan = -0.25 }) {
  const n0 = Math.floor(t0 * SR), len = Math.floor(0.12 * SR);
  const r = rng(seed);
  const hp = new Biquad('highpass', 5200, 0.7), pk = new Biquad('peak', 8500, 1.2, 4);
  const [gl, gr] = panGains(pan);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.012) * Math.exp(-t / 0.035);
    const v = pk.tick(hp.tick(r() * 2 - 1)) * env * vel * gain;
    buf.add(n0 + i, v * gl, v * gr);
  }
}
