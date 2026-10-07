// Canvas 2D layer composited over the WebGL frame: opening line, sparkles,
// end-card brand mark, wordmark, tagline, vignette and a whisper of grain.
import { T, WIDTH as W, HEIGHT as H, PALETTE } from '../timeline.js';
import { clamp, lerp, remap, smooth, easeOutCubic, easeOutBack, easeInOutCubic, rng } from './util.js';

const SERIF = 'Fraunces';
const SANS = '"DM Sans"';

export function createOverlay() {
  // pre-baked grain tiles (seeded => deterministic)
  const tiles = [];
  for (let n = 0; n < 4; n++) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    const img = g.createImageData(256, 256);
    const r = rng(900 + n);
    for (let i = 0; i < 256 * 256; i++) {
      const v = 128 + (r() + r() + r() - 1.5) * 70;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    tiles.push(c);
  }

  function grain(ctx, frame, amount) {
    const tile = tiles[frame % 4];
    const r = rng(frame * 7 + 3);
    const ox = Math.floor(r() * 256), oy = Math.floor(r() * 256);
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = amount;
    for (let y = -oy; y < H; y += 256) for (let x = -ox; x < W; x += 256) ctx.drawImage(tile, x, y);
    ctx.restore();
  }

  function vignette(ctx, strength) {
    const g = ctx.createRadialGradient(W / 2, H * 0.52, H * 0.28, W / 2, H * 0.52, H * 0.78);
    g.addColorStop(0, 'rgba(40,24,14,0)');
    g.addColorStop(1, `rgba(40,24,14,${strength})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function sparkle(ctx, x, y, size, k, rot = 0) {
    // k: 0..1 life. Four-point star with a soft glow.
    if (k <= 0 || k >= 1) return;
    const s = size * Math.sin(Math.PI * k) * (0.85 + 0.15 * Math.sin(k * 20));
    const a = Math.sin(Math.PI * k);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot + k * 0.6);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.6);
    glow.addColorStop(0, `rgba(255,236,190,${0.55 * a})`);
    glow.addColorStop(1, 'rgba(255,236,190,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(0, 0, s * 1.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(255,250,236,${a})`;
    ctx.beginPath();
    const w = s * 0.16;
    ctx.moveTo(0, -s); ctx.quadraticCurveTo(w, -w, s, 0); ctx.quadraticCurveTo(w, w, 0, s);
    ctx.quadraticCurveTo(-w, w, -s, 0); ctx.quadraticCurveTo(-w, -w, 0, -s);
    ctx.fill();
    ctx.restore();
  }

  // Brand mark: a sunrise whose lower edge is a smile, on a horizon line.
  function brandMark(ctx, cx, cy, t0, t) {
    const kLine = easeInOutCubic(remap(t, t0, t0 + 0.45));
    const kSun = easeOutCubic(remap(t, t0 + 0.12, t0 + 0.62));
    if (kLine <= 0) return;
    const R = 46;
    ctx.save();
    // sun (clipped above the horizon line), rising
    ctx.save();
    ctx.beginPath(); ctx.rect(cx - 120, cy - 140, 240, 140); ctx.clip();
    const sunY = cy + R * (1 - kSun) + 2;
    ctx.fillStyle = PALETTE.gold;
    ctx.beginPath(); ctx.arc(cx, sunY, R, Math.PI, 0); ctx.closePath(); ctx.fill();
    // the smile: two eyes and a grin cut into the sun
    if (kSun > 0.6) {
      const ka = smooth(remap(kSun, 0.6, 1));
      ctx.globalAlpha = ka;
      ctx.fillStyle = PALETTE.forestInk;
      ctx.beginPath(); ctx.ellipse(cx - 14, sunY - 24, 4.2, 5.4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 14, sunY - 24, 4.2, 5.4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = PALETTE.forestInk; ctx.lineWidth = 4.6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(cx, sunY - 20, 15, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    // rays
    for (let i = 0; i < 5; i++) {
      const kr = easeOutBack(clamp(remap(t, t0 + 0.42 + i * 0.05, t0 + 0.72 + i * 0.05)));
      if (kr <= 0) continue;
      const a = Math.PI + (Math.PI * (i + 1)) / 6;
      const r0 = R + 12, r1 = R + 12 + 16 * kr;
      ctx.strokeStyle = PALETTE.gold; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.stroke();
    }
    // horizon line drawing outward
    ctx.strokeStyle = PALETTE.forest; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
    const half = 92 * kLine;
    ctx.beginPath(); ctx.moveTo(cx - half, cy + 2); ctx.lineTo(cx + half, cy + 2); ctx.stroke();
    ctx.restore();
  }

  function staggeredText(ctx, text, cx, baseline, font, color, tStart, t, step, rise) {
    ctx.font = font;
    const total = ctx.measureText(text).width;
    const x0 = cx - total / 2;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === ' ') continue;
      const k = easeOutCubic(remap(t, tStart + i * step, tStart + i * step + 0.55));
      if (k <= 0) continue;
      const x = x0 + ctx.measureText(text.slice(0, i)).width;
      ctx.globalAlpha = k;
      ctx.fillStyle = color;
      ctx.fillText(ch, x, baseline + rise * (1 - k));
    }
    ctx.globalAlpha = 1;
  }

  function draw(ctx, t, frame, extras) {
    // --------------------------------------------------------------- sparkles
    for (const s of extras.sparkles) sparkle(ctx, s.x, s.y, s.size, s.k, s.rot);

    // ------------------------------------------- stable caption (clean sans)
    // (wordmark + tagline are letterpressed into the table in 3D; see typeWorld.js)
    const kk = easeOutCubic(remap(t, T.logo + 0.9, T.logo + 1.6));
    if (kk > 0) {
      ctx.save();
      ctx.globalAlpha = kk * 0.9;
      ctx.font = `600 34px ${SANS}`;
      ctx.fillStyle = PALETTE.coffee;
      ctx.textAlign = 'center';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '7px';
      ctx.fillText('COFFEE FOR GOOD MORNINGS', W / 2 + 3.5, 1846);
      ctx.restore();
    }

    vignette(ctx, extras.vignette);
    grain(ctx, frame, 0.05);

    // open from warm darkness (first ~0.4 s)
    const fadeIn = 1 - smooth(remap(t, 0, 0.42));
    if (fadeIn > 0) { ctx.fillStyle = `rgba(18,10,6,${fadeIn})`; ctx.fillRect(0, 0, W, H); }
  }

  return { draw };
}
