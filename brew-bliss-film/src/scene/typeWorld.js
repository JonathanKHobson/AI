// Typography that lives inside the scene, lit by the same sun.
//  1. "Good morning." — giant letters rising from behind the horizon like the sun
//     (the tabletop occludes them, the cup passes in front of them, parallax with the push-in).
//  2. The end card — "Brew Bliss" / "Sip, Savor, Smile." letterpressed into the cream table,
//     each element dropping in and pressing down on the beat; the sun-smile mark and the
//     swash are gold foil that catches a travelling glint.
import * as THREE from 'three';
import { T, PALETTE } from '../timeline.js';
import { clamp, lerp, remap, smooth, easeOutCubic, easeInCubic, easeInOutCubic, easeOutBack } from './util.js';

const SERIF = 'Fraunces';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

// ------------------------------------------------------------ horizon type
export function buildHorizonType(renderer) {
  const CW = 2048, CH = 1024;
  const WORLD_W = 120, WORLD_H = 60;            // cm; plane spans y = -20 .. +40
  const BASE_Y = 31;                              // world height of the final baseline
  const canvas = makeCanvas(CW, CH);
  const g = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, fog: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_W, WORLD_H), mat);
  mesh.position.set(-47, 40 - WORLD_H / 2, -150);
  mesh.rotation.y = THREE.MathUtils.degToRad(17);
  mesh.renderOrder = -5;

  const text = 'Good morning.';
  const font = `italic 400 132px ${SERIF}`;
  const baseCy = ((40 - BASE_Y) / WORLD_H) * CH;
  const rise = (20 + BASE_Y + 9) / WORLD_H * CH;  // start well below the table edge
  let last = -1;

  function update(t) {
    mesh.visible = t < T.cut;
    if (!mesh.visible) return;
    const key = Math.round(t * 600);
    if (key === last) return;
    last = key;
    g.clearRect(0, 0, CW, CH);
    g.font = font;
    g.textBaseline = 'alphabetic';
    const total = g.measureText(text).width;
    const x0 = CW / 2 - total / 2;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === ' ') continue;
      const a = 0.22 + i * 0.065;
      const k = easeOutCubic(remap(t, a, a + 1.05));
      if (k <= 0) continue;
      const x = x0 + g.measureText(text.slice(0, i)).width;
      const y = baseCy + rise * (1 - k);
      g.save();
      // backlit by the sunrise: a dark silhouette with a warm light-wrap halo
      g.shadowColor = 'rgba(255,200,130,0.9)';
      g.shadowBlur = 18;
      g.fillStyle = 'rgba(36,54,44,0.93)';
      g.fillText(ch, x, y);
      g.shadowBlur = 0;
      g.fillStyle = 'rgba(30,46,38,0.6)';
      g.fillText(ch, x, y);
      g.restore();
    }
    tex.needsUpdate = true;
  }
  return { mesh, update };
}

// --------------------------------------------------------------- table type
// Plane lies on the table under the final overhead framing; canvas px <-> table cm.
export const TABLE_TYPE = {
  center: new THREE.Vector3(0, 0.03, -14.0),
  w: 20, h: 11.25, CW: 2048, CH: 1152,
};

export function buildTableType(renderer) {
  const { CW, CH, w, h, center } = TABLE_TYPE;
  const PX = CW / w; // canvas px per cm
  const cyOf = (z) => (z - (center.z - h / 2)) * PX;

  const ink = makeCanvas(CW, CH), gi = ink.getContext('2d');
  const bump = makeCanvas(CW, CH), gb = bump.getContext('2d');
  const foil = makeCanvas(CW, CH), gf = foil.getContext('2d');
  const sheen = makeCanvas(CW, CH), gs = sheen.getContext('2d');
  const tex = (c, srgb) => {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  };
  const inkTex = tex(ink, true), bumpTex = tex(bump, false), foilTex = tex(foil, true), sheenTex = tex(sheen, true);

  const geo = new THREE.PlaneGeometry(w, h).rotateX(-Math.PI / 2);
  const inkMat = new THREE.MeshStandardMaterial({
    map: inkTex, bumpMap: bumpTex, bumpScale: 1.6, transparent: true, depthWrite: false,
    roughness: 0.78, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2, dithering: true,
  });
  const foilMat = new THREE.MeshPhysicalMaterial({
    map: foilTex, transparent: true, depthWrite: false, metalness: 0.55, roughness: 0.32,
    color: new THREE.Color(1.15, 1.05, 0.95), emissive: new THREE.Color('#FFE2A6'), emissiveMap: sheenTex, emissiveIntensity: 1.0,
    polygonOffset: true, polygonOffsetFactor: -3, dithering: true,
  });
  const inkMesh = new THREE.Mesh(geo, inkMat);
  const foilMesh = new THREE.Mesh(geo, foilMat);
  inkMesh.position.copy(center); foilMesh.position.copy(center);
  foilMesh.position.y += 0.004;
  inkMesh.receiveShadow = true; foilMesh.receiveShadow = true;
  inkMesh.renderOrder = 2; foilMesh.renderOrder = 3;
  const group = new THREE.Group();
  group.add(inkMesh, foilMesh);

  // layout (table cm -> canvas px). Matches the overhead end-card framing.
  const L = {
    markCx: CW / 2, markCy: cyOf(-16.95), markR: 84,
    wordBase: cyOf(-13.05), wordFont: `600 300px ${SERIF}`,
    tagBase: cyOf(-10.85), tagFont: `italic 400 138px ${SERIF}`,
  };
  const SH_DIR = [0.5, 0.86]; // key light comes from the back-left -> shadows fall right/down

  // press animation: k in [0,1] as the element descends; landed afterwards
  function press(t, at) {
    const kd = remap(t, at - 0.14, at);
    if (kd <= 0) return null;
    const fall = easeInCubic(kd);
    const settle = t > at ? 1 - Math.exp(-(t - at) * 18) * Math.cos((t - at) * 30) : 0; // tiny bounce
    const height = (1 - fall);                       // 1 above the table -> 0 landed
    const scale = 1 + 0.10 * height + (t > at ? -0.018 * (1 - settle) : 0);
    return { alpha: Math.min(1, kd * 2.2), height, scale, landed: t >= at, depth: t >= at ? smooth(remap(t, at, at + 0.12)) : 0 };
  }

  function drawGlyphs(ctxs, glyphs, p, color) {
    // glyphs: [{txt, x, y}] in canvas px, drawn with shared transform around (cx, cy)
    const { gi, gb } = ctxs;
    if (!p) return;
    for (const gl of glyphs) {
      const { txt, x, y, cx, cy, font } = gl;
      for (const pass of ['shadow', 'ink', 'bump']) {
        const g = pass === 'bump' ? gb : gi;
        if (pass === 'bump' && p.depth <= 0) continue;
        if (pass === 'shadow' && p.height <= 0.001) continue;
        g.save();
        g.font = font;
        g.textBaseline = 'alphabetic';
        const off = pass === 'shadow' ? 34 * p.height : 0;
        g.translate(cx + off * SH_DIR[0], cy + off * SH_DIR[1]);
        g.scale(p.scale, p.scale);
        g.translate(-cx, -cy);
        if (pass === 'shadow') {
          g.filter = `blur(${(6 + 18 * p.height).toFixed(1)}px)`;
          g.fillStyle = `rgba(60,36,20,${(0.42 * p.alpha * (0.4 + 0.6 * (1 - p.height))).toFixed(3)})`;
        } else if (pass === 'ink') {
          g.globalAlpha = p.alpha;
          g.fillStyle = color;
        } else {
          g.filter = 'blur(2.5px)';
          g.fillStyle = `rgba(0,0,0,${(0.85 * p.depth).toFixed(3)})`;
        }
        g.fillText(txt, x, y);
        g.restore();
      }
    }
  }

  function markShapes(g, cx, cy, R, mode) {
    // mode 'foil': sun + rays + horizon line; mode 'ink': face details
    if (mode === 'foil') {
      g.beginPath(); g.arc(cx, cy, R, Math.PI, 0); g.closePath(); g.fill();
      g.lineCap = 'round'; g.lineWidth = 10;
      for (let i = 0; i < 5; i++) {
        const a = Math.PI + (Math.PI * (i + 1)) / 6;
        g.beginPath();
        g.moveTo(cx + Math.cos(a) * (R + 22), cy + Math.sin(a) * (R + 22));
        g.lineTo(cx + Math.cos(a) * (R + 52), cy + Math.sin(a) * (R + 52));
        g.stroke();
      }
    } else {
      g.beginPath(); g.ellipse(cx - R * 0.3, cy - R * 0.52, R * 0.09, R * 0.115, 0, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.ellipse(cx + R * 0.3, cy - R * 0.52, R * 0.09, R * 0.115, 0, 0, Math.PI * 2); g.fill();
      g.lineCap = 'round'; g.lineWidth = R * 0.1;
      g.beginPath(); g.arc(cx, cy - R * 0.43, R * 0.33, Math.PI * 0.2, Math.PI * 0.8); g.stroke();
      // horizon line (ink)
      g.lineWidth = 9;
      g.beginPath(); g.moveTo(cx - R * 2.05, cy + 5); g.lineTo(cx + R * 2.05, cy + 5); g.stroke();
    }
  }

  let lastKey = -1;
  const START = T.logo - 0.3;

  function update(t) {
    group.visible = t >= START;
    if (!group.visible) return { swashEnd: null };
    const key = Math.round(t * 600);
    if (key === lastKey) return { swashEnd: cachedSwashEnd };
    lastKey = key;
    for (const [g, c] of [[gi, ink], [gf, foil], [gs, sheen]]) g.clearRect(0, 0, c.width, c.height);
    gb.fillStyle = '#ffffff'; gb.fillRect(0, 0, CW, CH);
    const ctxs = { gi, gb };

    // ---- wordmark: letters land in a quick ripple on the downbeat
    gi.font = L.wordFont;
    const word = 'Brew Bliss';
    const wW = gi.measureText(word).width;
    const wx0 = CW / 2 - wW / 2;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === ' ') continue;
      const x = wx0 + gi.measureText(word.slice(0, i)).width;
      const cw = gi.measureText(word[i]).width;
      const p = press(t, T.logo + i * 0.028);
      drawGlyphs(ctxs, [{ txt: word[i], x, y: L.wordBase, cx: x + cw / 2, cy: L.wordBase - 100, font: L.wordFont }], p, PALETTE.forestInk);
    }

    // ---- gold-foil sun-smile mark
    const pm = press(t, T.logo + 0.42);
    if (pm) {
      const { markCx: cx, markCy: cy, markR: R } = L;
      gf.save();
      gf.translate(cx, cy); gf.scale(pm.scale, pm.scale); gf.translate(-cx, -cy);
      gf.globalAlpha = pm.alpha;
      gf.fillStyle = gf.strokeStyle = '#E9AE3C';
      markShapes(gf, cx, cy, R, 'foil');
      gf.restore();
      gi.save();
      gi.translate(cx, cy); gi.scale(pm.scale, pm.scale); gi.translate(-cx, -cy);
      gi.globalAlpha = pm.alpha;
      gi.fillStyle = gi.strokeStyle = PALETTE.forestInk;
      markShapes(gi, cx, cy, R, 'ink');
      gi.restore();
      if (pm.height > 0.001) {
        gi.save();
        gi.filter = `blur(${(6 + 16 * pm.height).toFixed(1)}px)`;
        gi.fillStyle = gi.strokeStyle = `rgba(60,36,20,${(0.35 * pm.alpha).toFixed(3)})`;
        const o = 30 * pm.height;
        gi.translate(o * SH_DIR[0], o * SH_DIR[1]);
        markShapes(gi, cx, cy, R, 'foil');
        gi.restore();
      }
    }

    // ---- tagline words, pressed on the beat
    gi.font = L.tagFont;
    const line = 'Sip, Savor, Smile.';
    const tW = gi.measureText(line).width;
    const tx0 = CW / 2 - tW / 2;
    const words = [
      { txt: 'Sip,', at: T.wordSip, start: 0, color: PALETTE.coffee },
      { txt: 'Savor,', at: T.wordSavor, start: 5, color: PALETTE.coffee },
      { txt: 'Smile.', at: T.wordSmile, start: 12, color: PALETTE.forest },
    ];
    let smileX = 0, smileW = 0;
    for (const wd of words) {
      gi.font = L.tagFont;
      const x = tx0 + gi.measureText(line.slice(0, wd.start)).width;
      const ww = gi.measureText(wd.txt).width;
      if (wd.txt === 'Smile.') { smileX = x; smileW = ww; }
      drawGlyphs(ctxs, [{ txt: wd.txt, x, y: L.tagBase, cx: x + ww / 2, cy: L.tagBase - 45, font: L.tagFont }], press(t, wd.at), wd.color);
    }

    // ---- gold-foil smile swash under "Smile." (drawn like the cream smile, left to right)
    const ks = easeInOutCubic(remap(t, T.wordSmile + 0.08, T.wordSmile + 0.62));
    let swashEnd = null;
    if (ks > 0) {
      const sx0 = smileX + 10, sx1 = smileX + smileW - 46;
      const yAt = (u) => L.tagBase + 46 + 30 * Math.sin(Math.PI * u) - 8 * u;
      gf.save();
      gf.strokeStyle = '#E9AE3C'; gf.lineWidth = 13; gf.lineCap = 'round';
      gf.beginPath();
      const N = 60;
      for (let i = 0; i <= Math.ceil(N * ks); i++) {
        const u = Math.min(i / N, ks);
        const px = lerp(sx0, sx1, u);
        if (i === 0) gf.moveTo(px, yAt(u)); else gf.lineTo(px, yAt(u));
      }
      gf.stroke();
      gf.restore();
      swashEnd = { x: lerp(sx0, sx1, ks), y: yAt(ks), k: ks };
    }

    // ---- travelling glint across the foil (light catching it as it lands)
    const glints = [[T.logo + 0.5, 0.75], [T.wordSmile + 0.35, 0.9]];
    for (const [g0, dur] of glints) {
      const kg = remap(t, g0, g0 + dur);
      if (kg <= 0 || kg >= 1) continue;
      const gx = lerp(-400, CW + 400, easeInOutCubic(kg));
      const grd = gs.createLinearGradient(gx - 260, 0, gx + 260, 0);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(0.5, `rgba(255,236,190,${(0.9 * Math.sin(Math.PI * kg)).toFixed(3)})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      gs.save();
      gs.fillStyle = grd;
      gs.fillRect(0, 0, CW, CH);
      gs.globalCompositeOperation = 'destination-in';
      gs.drawImage(foil, 0, 0);
      gs.restore();
    }

    inkTex.needsUpdate = bumpTex.needsUpdate = foilTex.needsUpdate = sheenTex.needsUpdate = true;
    cachedSwashEnd = swashEnd && {
      // canvas px -> table world
      world: new THREE.Vector3(center.x - w / 2 + swashEnd.x / PX, 0.05, center.z - h / 2 + swashEnd.y / PX), k: swashEnd.k,
    };
    return { swashEnd: cachedSwashEnd };
  }
  let cachedSwashEnd = null;
  return { group, update };
}
