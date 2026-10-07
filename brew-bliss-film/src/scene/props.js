// Hero props: stoneware cup + saucer, sky-blue creamer, coffee beans, table.
// All geometry is built procedurally from lathe profiles and swept tubes.
import * as THREE from 'three';
import { profileStripTexture } from './textures.js';
import { rng } from './util.js';

const C = (hex) => new THREE.Color(hex); // sRGB hex -> linear working colour

// ---------------------------------------------------------------- profiles
// (radius, height) in centimetres. Order: bottom centre -> outer wall -> rim -> inner wall -> centre.
export const CUP_PROFILE = [
  [0.0, 0.42], [1.6, 0.42], [2.25, 0.36], [2.42, 0.18], [2.52, 0.03], [2.70, 0.0], [2.86, 0.06],
  [2.92, 0.22], [2.90, 0.42], [3.02, 0.62], [3.45, 1.02], [4.05, 1.75], [4.55, 2.75], [4.86, 3.9],
  [5.03, 5.1], [5.12, 6.2], [5.15, 6.8], [5.12, 7.0],
  [5.06, 7.1], [4.96, 7.145], [4.86, 7.115], [4.80, 7.02],
  [4.76, 6.85], [4.72, 6.2], [4.62, 5.1], [4.43, 3.95], [4.08, 2.9], [3.5, 1.95], [2.7, 1.25],
  [1.6, 0.95], [0.6, 0.88], [0.0, 0.87],
];
export const CUP_FILL_Y = 6.45;      // coffee level inside the cup (local)
export const SAUCER_WELL_Y = 0.45;   // cup sits here

const SAUCER_PROFILE = [
  [0, 0.30], [2.6, 0.30], [3.0, 0.24], [3.12, 0.08], [3.22, 0.0], [3.45, 0.0], [3.58, 0.08],
  [3.66, 0.22], [4.4, 0.36], [5.6, 0.55], [6.8, 0.8], [7.6, 1.0], [7.95, 1.1],
  [8.08, 1.2], [8.06, 1.32], [7.94, 1.38], [7.78, 1.34],
  [7.2, 1.14], [6.2, 0.9], [5.0, 0.72], [3.9, 0.6], [3.35, 0.53], [3.15, 0.47], [2.9, 0.45],
  [1.5, 0.45], [0, 0.45],
];

const PITCHER_PROFILE = [
  [0, 0.3], [1.3, 0.3], [1.55, 0.22], [1.62, 0.05], [1.75, 0.0], [1.95, 0.06], [2.05, 0.3],
  [2.25, 0.9], [2.38, 1.7], [2.36, 2.6], [2.2, 3.5], [2.0, 4.3], [1.95, 4.9], [2.02, 5.4],
  [2.15, 5.8], [2.22, 6.0], [2.18, 6.1], [2.08, 6.08], [2.02, 5.98],
  [1.95, 5.75], [1.82, 5.3], [1.78, 4.8], [1.84, 4.2], [2.03, 3.4], [2.18, 2.5], [2.18, 1.7],
  [2.02, 0.95], [1.6, 0.6], [0.8, 0.52], [0, 0.5],
];

function resample(profile, n) {
  const curve = new THREE.CatmullRomCurve3(
    profile.map(([r, y]) => new THREE.Vector3(r, y, 0)), false, 'centripetal');
  const pts = curve.getSpacedPoints(n - 1).map((p) => new THREE.Vector2(Math.max(0, p.x), p.y));
  pts[0].x = 0; pts[pts.length - 1].x = 0;
  // apex (rim top) splits outer from inner
  let apex = 0;
  pts.forEach((p, i) => { if (p.y > pts[apex].y) apex = i; });
  return { pts, apex };
}

// Radius of the inner wall at height y (local cup space).
export function cupInnerRadiusAt(y) {
  const { pts, apex } = resample(CUP_PROFILE, 400);
  for (let i = apex; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    if ((a.y - y) * (b.y - y) <= 0) {
      const k = (y - a.y) / (b.y - a.y);
      return a.x + (b.x - a.x) * k;
    }
  }
  return 4.7;
}

function wrapAngle(a) {
  while (a > Math.PI) a -= 2 * Math.PI;
  while (a < -Math.PI) a += 2 * Math.PI;
  return a;
}

function latheWithColors(profile, n, segments, colorFn, opts = {}) {
  const { phiStart = 0, wobble = null } = opts;
  const { pts, apex } = resample(profile, n);
  const geo = new THREE.LatheGeometry(pts, segments, phiStart);
  const pos = geo.attributes.position;
  const N = pts.length;
  const colors = new Float32Array(pos.count * 3);
  const col = new THREE.Color();
  for (let i = 0; i <= segments; i++) {
    const phi = phiStart + (i / segments) * Math.PI * 2;
    for (let j = 0; j < N; j++) {
      const idx = i * N + j;
      colorFn(col, { r: pts[j].x, y: pts[j].y, phi, outer: j < apex, j, apex, N });
      colors[idx * 3] = col.r; colors[idx * 3 + 1] = col.g; colors[idx * 3 + 2] = col.b;
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  if (wobble) applyWobble(geo, segments, N, phiStart, wobble);
  return { geo, pts, apex };
}

// Hand-thrown irregularity: nothing on a wheel is perfectly round or level.
function applyWobble(geo, segments, N, phiStart, fn) {
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  const orig = nor.array.slice();
  for (let i = 0; i <= segments; i++) {
    const phi = phiStart + (i / segments) * Math.PI * 2;
    for (let j = 0; j < N; j++) {
      const idx = i * N + j;
      const x = pos.getX(idx), y = pos.getY(idx), z = pos.getZ(idx);
      const r = Math.hypot(x, z);
      if (r < 1e-5) continue;
      const { dr = 0, dy = 0 } = fn(phi, y, r);
      const k = (r + dr) / r;
      pos.setXYZ(idx, x * k, y + dy, z * k);
    }
  }
  geo.computeVertexNormals();
  // stitch the lathe seam and keep the poles pointing straight up/down
  for (let j = 0; j < N; j++) {
    const a = j, b = segments * N + j;
    const nx = nor.getX(a) + nor.getX(b), ny = nor.getY(a) + nor.getY(b), nz = nor.getZ(a) + nor.getZ(b);
    const l = Math.hypot(nx, ny, nz) || 1;
    nor.setXYZ(a, nx / l, ny / l, nz / l); nor.setXYZ(b, nx / l, ny / l, nz / l);
  }
  for (let i = 0; i <= segments; i++) for (const j of [0, N - 1]) {
    const idx = i * N + j;
    nor.setXYZ(idx, orig[idx * 3], orig[idx * 3 + 1], orig[idx * 3 + 2]);
  }
  nor.needsUpdate = true;
}

// Ellipse swept along a curve, with width/thickness profiles (flares where it joins the body).
function sweep(curve, segs, radial, rw, rh, uvScale = [1, 1], uvOffset = [0, 0]) {
  const frames = curve.computeFrenetFrames(segs, false);
  const positions = [], normals = [], uvs = [], indices = [], thetas = [], ss = [];
  const P = new THREE.Vector3(), Nn = new THREE.Vector3();
  for (let i = 0; i <= segs; i++) {
    const s = i / segs;
    curve.getPointAt(s, P);
    const N = frames.normals[i], B = frames.binormals[i];
    const a = rw(s), b = rh(s);
    for (let k = 0; k <= radial; k++) {
      const th = (k / radial) * Math.PI * 2;
      const cx = Math.cos(th), sy = Math.sin(th);
      // squarer-than-elliptical section, like a pulled strap
      const e = 0.75;
      const px = Math.sign(cx) * Math.pow(Math.abs(cx), e), py = Math.sign(sy) * Math.pow(Math.abs(sy), e);
      const v = new THREE.Vector3().copy(P).addScaledVector(N, px * b).addScaledVector(B, py * a);
      positions.push(v.x, v.y, v.z);
      // analytic superellipse normal
      const ac = Math.max(Math.abs(cx), 1e-4), as = Math.max(Math.abs(sy), 1e-4);
      const nN = a * Math.pow(as, e - 1) * cx, nB = b * Math.pow(ac, e - 1) * sy;
      Nn.copy(N).multiplyScalar(nN).addScaledVector(B, nB).normalize();
      normals.push(Nn.x, Nn.y, Nn.z);
      uvs.push(uvOffset[0] + s * uvScale[0], uvOffset[1] + (k / radial) * uvScale[1]);
      thetas.push(th); ss.push(s);
    }
  }
  for (let i = 0; i < segs; i++) {
    for (let k = 0; k < radial; k++) {
      const a = i * (radial + 1) + k, b = a + radial + 1;
      indices.push(a, a + 1, b, b, a + 1, b + 1); // outward-facing winding
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return { geo, thetas, ss };
}

function colorSweep(sw, fn) {
  const n = sw.geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  const col = new THREE.Color();
  for (let i = 0; i < n; i++) {
    fn(col, sw.ss[i], sw.thetas[i]);
    arr[i * 3] = col.r; arr[i * 3 + 1] = col.g; arr[i * 3 + 2] = col.b;
  }
  sw.geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
}

const joint = (s, w) => Math.exp(-Math.pow(s / w, 2));

// ------------------------------------------------------------------ glaze
function glazeMaterial({ glaze, rings, strip, ringScale = 0.35 }) {
  return new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    color: new THREE.Color(1.12, 1.12, 1.12), // compensates the glaze map's mean (~0.87)
    map: glaze,
    bumpMap: rings,
    bumpScale: ringScale,
    roughness: 1.0,
    roughnessMap: strip,
    clearcoat: 1.0,
    clearcoatMap: strip,
    clearcoatRoughness: 0.08,
    metalness: 0,
    ior: 1.5,
    envMapIntensity: 1.0,
    dithering: true,
  });
}

// ------------------------------------------------------------------- cup
// Gaussian occlusion on the body around the handle joints (handle sits at phi = PI/2, i.e. +x).
function handleAO(phi, y) {
  const d = wrapAngle(phi - Math.PI / 2);
  const ang = Math.exp(-Math.pow(d / 0.15, 2));
  const top = Math.exp(-Math.pow((y - 6.12) / 0.38, 2));
  const bot = Math.exp(-Math.pow((y - 3.1) / 0.36, 2));
  const between = (y > 3.1 && y < 6.1 ? 0.35 : 0) * Math.exp(-Math.pow(d / 0.3, 2));
  return 1 - Math.min(0.55, 0.5 * ang * (top + bot) + 0.18 * between);
}

const cupWobble = (phi, y) => ({
  dr: 0.045 * Math.sin(2 * phi + 0.8 + y * 0.22) + 0.025 * Math.sin(3 * phi + 2.1 - y * 0.35) + 0.012 * Math.sin(5 * phi + 0.3 + y),
  dy: y > 6.6 ? (y - 6.6) / 0.55 * (0.035 * Math.sin(2 * phi + 1.9) + 0.015 * Math.sin(5 * phi + 0.4)) : 0,
});

export function buildCup(tex) {
  const forest = C('#2D5A44'), pooled = C('#18382A'), breakC = C('#86A07D'),
    toast = C('#D9C9A8'), inner = C('#F1E6D3'), clay = C('#BE9D7B'), clayDark = C('#9C7C5C');
  const { geo, pts, apex } = latheWithColors(CUP_PROFILE, 220, 192, (col, p) => {
    const { y, phi, outer } = p;
    if (outer) {
      const yb = 0.40 + 0.06 * Math.sin(3 * phi + 0.7) + 0.035 * Math.sin(7 * phi + 2.1) + 0.02 * Math.sin(13 * phi);
      if (y < yb) {
        col.copy(clay).lerp(clayDark, Math.max(0, 0.5 - y) * 0.8);
        return;
      }
      // glaze is thick (dark) where it ran down and stopped, thin (light) on the rim
      const drip = 0.12 * Math.max(0, Math.sin(phi * 11 + 1.3)) * Math.max(0, Math.sin(phi * 3.7));
      const pool = Math.exp(-(y - yb) / (0.3 + drip * 3));
      col.copy(forest).lerp(pooled, pool * 0.85);
      col.lerp(pooled, 0.18 * (1 - Math.min(1, (y - yb) / 2.5)));
      col.lerp(breakC, Math.min(1, Math.max(0, (y - 6.72) / 0.36)) * 0.72);
      if (y > 7.06) col.lerp(toast, Math.min(1, (y - 7.06) / 0.07));
      col.multiplyScalar(handleAO(phi, y));
      col.multiplyScalar(0.72 + 0.28 * Math.min(1, Math.max(0, (y - 0.4) / 1.0))); // saucer occlusion
    } else {
      if (y > 6.98) col.copy(toast).lerp(inner, Math.min(1, (7.14 - y) / 0.16));
      else col.copy(inner);
      col.multiplyScalar(0.9 + 0.1 * Math.min(1, Math.max(0, (y - 6.45) / 0.5))); // shade near the coffee
    }
  }, { wobble: cupWobble });
  const strip = profileStripTexture(pts.map((p, j) => {
    const footOuter = j < apex && p.y < 0.36;
    return footOuter ? [0.0, 0.85] : [1.0, 0.3];
  }));
  const mat = glazeMaterial({ ...tex, strip, ringScale: 0.55 });
  const body = new THREE.Mesh(geo, mat);
  body.castShadow = true; body.receiveShadow = true;

  // Pulled strap handle with a thumb rest; joints flare into the wall and are buried in it.
  const hc = new THREE.CatmullRomCurve3([
    new THREE.Vector3(4.86, 6.13, 0), new THREE.Vector3(5.55, 6.38, 0), new THREE.Vector3(6.45, 6.44, 0),
    new THREE.Vector3(7.24, 6.08, 0), new THREE.Vector3(7.62, 5.22, 0), new THREE.Vector3(7.46, 4.26, 0),
    new THREE.Vector3(6.86, 3.6, 0), new THREE.Vector3(5.92, 3.22, 0), new THREE.Vector3(4.42, 3.08, 0),
  ], false, 'centripetal');
  const hw = (s) => 0.40 + 0.36 * joint(s, 0.11) + 0.22 * joint(1 - s, 0.11) - 0.03 * Math.sin(Math.PI * s);
  const hh = (s) => 0.235 + 0.15 * joint(s, 0.11) + 0.10 * joint(1 - s, 0.11);
  const sw = sweep(hc, 120, 32, hw, hh, [0.18, 0.012], [0.41, 0.46]);
  colorSweep(sw, (col, s, th) => {
    col.copy(forest);
    col.lerp(pooled, 0.6 * (joint(s, 0.14) + joint(1 - s, 0.14)));        // glaze pools at the joints
    col.lerp(breakC, 0.3 * Math.pow(Math.abs(Math.sin(th)), 8));         // breaks on the strap edges
    col.multiplyScalar(0.92 + 0.08 * Math.cos(th));                       // inner face of the loop is darker
  });
  const hmat = glazeMaterial({ ...tex, strip: profileStripTexture([[1.0, 0.3], [1.0, 0.3]]), ringScale: 0.0 });
  const handle = new THREE.Mesh(sw.geo, hmat);
  handle.castShadow = true; handle.receiveShadow = true;

  const group = new THREE.Group();
  group.add(body, handle);
  return group;
}

// ---------------------------------------------------------------- saucer
export function buildSaucer(tex) {
  const forest = C('#2D5A44'), pooled = C('#163326'), breakC = C('#8AA483'),
    toast = C('#DCCDAE'), clay = C('#BE9D7B');
  const { geo, pts, apex } = latheWithColors(SAUCER_PROFILE, 200, 192, (col, p) => {
    const { r, y, outer } = p;
    if (outer && y < 0.12 && r > 2.95 && r < 3.75) { col.copy(clay); return; }
    col.copy(forest);
    if (!outer) {
      const pool = Math.exp(-Math.pow((r - 3.25) / 0.35, 2));
      col.lerp(pooled, pool * 0.8);
      if (r < 3.0) col.lerp(pooled, 0.25);
      // contact occlusion: cup foot sits at r ~ 2.5-2.9, its belly overhangs to r ~ 5
      col.multiplyScalar(1 - 0.55 * Math.exp(-Math.pow((r - 2.95) / 0.3, 2)));
      col.multiplyScalar(1 - 0.22 * Math.max(0, Math.min(1, (5.6 - r) / 2.4)));
    }
    col.lerp(breakC, Math.max(0, Math.min(1, (r - 7.72) / 0.32)) * 0.7);
    if (y > 1.33) col.lerp(toast, Math.min(1, (y - 1.33) / 0.05) * 0.8);
  }, { wobble: (phi, y, r) => ({ dr: 0.03 * Math.sin(2 * phi + 0.4) * (r / 8), dy: 0.03 * Math.sin(2 * phi + 2.0) * Math.pow(r / 8, 2) }) });
  const strip = profileStripTexture(pts.map((p, j) => {
    const foot = j < apex && p.y < 0.12 && p.x > 2.95 && p.x < 3.75;
    return foot ? [0, 0.85] : [1, 0.3];
  }));
  const mesh = new THREE.Mesh(geo, glazeMaterial({ ...tex, strip, ringScale: 0.18 }));
  mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}

// --------------------------------------------------------------- creamer
// Returns { group, tip } where `group`'s origin is the spout tip (pivot for pouring).
export function buildPitcher(tex) {
  const sky = C('#7DB6E0'), pooled = C('#4E86B5'), breakC = C('#CFE3EE'),
    inner = C('#9FCBEA'), clay = C('#C4A684');
  const SPOUT_A = Math.PI; // spout faces -x
  const { geo, pts, apex } = latheWithColors(PITCHER_PROFILE, 180, 160, (col, p) => {
    const { y, phi, outer } = p;
    if (outer) {
      const yb = 0.42 + 0.06 * Math.sin(4 * phi + 1.0) + 0.03 * Math.sin(9 * phi);
      if (y < yb) { col.copy(clay); return; }
      const pool = Math.exp(-(y - yb) / 0.25);
      col.copy(sky).lerp(pooled, pool * 0.8);
      col.lerp(breakC, Math.max(0, Math.min(1, (y - 5.75) / 0.3)) * 0.7);
    } else {
      col.copy(inner).multiplyScalar(0.55 + 0.45 * Math.min(1, Math.max(0, (y - 1.0) / 5.0)));
      if (y > 5.95) col.lerp(breakC, 0.5);
    }
  }, { phiStart: Math.PI / 2, wobble: (phi, y) => ({ dr: 0.03 * Math.sin(2 * phi + 1.1 + y * 0.3) }) });
  // Pull a pouring spout out of the rim.
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  let tip = new THREE.Vector3(1e9, 0, 0);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const r = Math.hypot(v.x, v.z);
    if (r < 1e-4) continue;
    const a = Math.atan2(v.z, v.x);
    const da = wrapAngle(a - SPOUT_A);
    const wa = Math.exp(-Math.pow(da / 0.52, 2));
    const t = Math.max(0, Math.min(1, (v.y - 4.3) / (6.1 - 4.3)));
    const amt = Math.pow(t, 1.7) * 1.05 * wa;
    const nr = r + amt;
    v.x *= nr / r; v.z *= nr / r; v.y += 0.28 * amt;
    pos.setXYZ(i, v.x, v.y, v.z);
    if (-v.x > -tip.x && Math.abs(v.z) < 0.05) tip.copy(v);
  }
  geo.computeVertexNormals();
  const strip = profileStripTexture(pts.map((p, j) => (j < apex && p.y < 0.45 ? [0, 0.85] : [1, 0.3])));
  const body = new THREE.Mesh(geo, glazeMaterial({ ...tex, strip, ringScale: 0.5 }));
  body.castShadow = true; body.receiveShadow = true;

  const hc = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.9, 5.25, 0), new THREE.Vector3(3.05, 5.5, 0), new THREE.Vector3(3.95, 4.65, 0),
    new THREE.Vector3(3.9, 3.2, 0), new THREE.Vector3(3.15, 2.1, 0), new THREE.Vector3(2.22, 1.62, 0),
  ], false, 'centripetal');
  const sw = sweep(hc, 90, 24, (s) => 0.34 + 0.24 * joint(s, 0.12) + 0.16 * joint(1 - s, 0.12),
    (s) => 0.22 + 0.11 * joint(s, 0.12) + 0.08 * joint(1 - s, 0.12), [0.18, 0.012], [0.2, 0.5]);
  colorSweep(sw, (col, s, th) => {
    col.copy(sky).lerp(pooled, 0.5 * (joint(s, 0.14) + joint(1 - s, 0.14)));
    col.lerp(breakC, 0.3 * Math.pow(Math.abs(Math.sin(th)), 8));
  });
  const handle = new THREE.Mesh(sw.geo, glazeMaterial({ ...tex, strip: profileStripTexture([[1, 0.3], [1, 0.3]]), ringScale: 0 }));
  handle.castShadow = true;

  const pivot = new THREE.Group();
  pivot.add(body, handle);
  pivot.position.copy(tip).multiplyScalar(-1);
  const group = new THREE.Group();
  group.add(pivot);
  return { group, tip: tip.clone() };
}

// ------------------------------------------------------------ coffee beans
export function buildBeans() {
  const base = new THREE.SphereGeometry(1, 40, 28);
  const pos = base.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // flat-ish underside, crease along the long axis on top
    if (v.y < 0) v.y *= 0.55;
    const crease = Math.exp(-Math.pow((v.z - 0.12 * Math.sin(v.x * 2.2)) / 0.13, 2)) * Math.max(0, v.y);
    v.y -= 0.42 * crease;
    pos.setXYZ(i, v.x * 0.62, v.y * 0.36, v.z * 0.44);
  }
  base.computeVertexNormals();
  const mat = new THREE.MeshPhysicalMaterial({
    color: C('#4B2A18'), roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.35, dithering: true,
  });
  const group = new THREE.Group();
  const r = rng(31);
  const spots = [
    [-12.6, 6.2], [-11.2, 7.9], [-13.9, 8.6], [-10.4, 10.1], [-12.9, 10.8], [-9.6, 12.6], [-14.8, 6.4],
    [11.8, -9.5], [13.3, -8.4],
  ];
  for (const [x, z] of spots) {
    const m = new THREE.Mesh(base, mat);
    const s = 0.92 + r() * 0.2;
    m.scale.setScalar(s);
    m.rotation.y = r() * Math.PI * 2;
    m.position.set(x, 0.19 * s, z);
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
  }
  return group;
}

// -------------------------------------------------------------------- table
export function buildTable(tableTex) {
  tableTex.map.repeat.set(7, 7);
  tableTex.bumpMap.repeat.set(7, 7);
  const mat = new THREE.MeshStandardMaterial({
    map: tableTex.map, bumpMap: tableTex.bumpMap, bumpScale: 0.25,
    roughness: 0.82, metalness: 0, dithering: true,
  });
  const geo = new THREE.PlaneGeometry(420, 420);
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  return mesh;
}
