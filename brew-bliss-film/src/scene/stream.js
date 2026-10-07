// Cream stream (a swept tube rebuilt every frame along a falling-liquid curve),
// the two eye drops, and backlit steam wisps for the opening shot.
import * as THREE from 'three';

const SEG = 72, RAD = 20;

export function buildStream() {
  const count = (SEG + 1) * (RAD + 1);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  const idx = [];
  for (let i = 0; i < SEG; i++) for (let k = 0; k < RAD; k++) {
    const a = i * (RAD + 1) + k, b = a + RAD + 1;
    idx.push(a, a + 1, b, b, a + 1, b + 1);
  }
  geo.setIndex(idx);
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#F7EEDD'), roughness: 0.28, sheen: 0.4, sheenColor: new THREE.Color('#FFF6E4'),
    clearcoat: 0.5, clearcoatRoughness: 0.2, dithering: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.frustumCulled = false;

  const P = new THREE.Vector3(), T = new THREE.Vector3(), N = new THREE.Vector3(), B = new THREE.Vector3();
  const up = new THREE.Vector3(0, 0, 1);
  const tmp = new THREE.Vector3();

  // S = spout tip, C = control (spout direction), L = landing point. uTop/uBot = visible span.
  function update({ S, C, L, uTop, uBot, time, visible }) {
    mesh.visible = visible && uBot > uTop + 1e-3;
    if (!mesh.visible) return;
    const pos = geo.attributes.position.array, nor = geo.attributes.normal.array;
    const bez = (u, out) => {
      const a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u;
      return out.set(a * S.x + b * C.x + c * L.x, a * S.y + b * C.y + c * L.y, a * S.z + b * C.z + c * L.z);
    };
    const tan = (u, out) => {
      const a = -2 * (1 - u), b = 2 - 4 * u, c = 2 * u;
      return out.set(a * S.x + b * C.x + c * L.x, a * S.y + b * C.y + c * L.y, a * S.z + b * C.z + c * L.z).normalize();
    };
    const len = S.distanceTo(L);
    for (let i = 0; i <= SEG; i++) {
      const s = i / SEG;
      const u = uTop + (uBot - uTop) * s;
      bez(u, P); tan(u, T);
      // radius: wide at the lip, thinning as it accelerates, with travelling flow ripples
      let r = 0.25 - 0.10 * Math.sqrt(u);
      r *= 1 + 0.05 * Math.sin(u * 34 - time * 46) + 0.025 * Math.sin(u * 71 - time * 83);
      // rounded ends where the stream is still arriving or has broken off
      const dTop = (u - uTop) * len, dBot = (uBot - u) * len;
      if (uTop > 0) r *= Math.sqrt(Math.min(1, dTop / 0.35));
      if (uBot < 1) r *= Math.sqrt(Math.min(1, dBot / 0.30));
      // flare a little where it meets the coffee
      if (uBot >= 1) r *= 1 + 0.35 * Math.exp(-dBot / 0.25);
      N.crossVectors(T, up);
      if (N.lengthSq() < 1e-6) N.set(1, 0, 0);
      N.normalize();
      B.crossVectors(T, N).normalize();
      for (let k = 0; k <= RAD; k++) {
        const th = (k / RAD) * Math.PI * 2;
        tmp.copy(N).multiplyScalar(Math.cos(th)).addScaledVector(B, Math.sin(th));
        const o = (i * (RAD + 1) + k) * 3;
        pos[o] = P.x + tmp.x * r; pos[o + 1] = P.y + tmp.y * r; pos[o + 2] = P.z + tmp.z * r;
        nor[o] = tmp.x; nor[o + 1] = tmp.y; nor[o + 2] = tmp.z;
      }
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.normal.needsUpdate = true;
  }
  return { mesh, update };
}

export function buildDrop() {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#F7EEDD'), roughness: 0.25, clearcoat: 0.6, clearcoatRoughness: 0.15, dithering: true,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 20), mat);
  mesh.castShadow = true;
  mesh.visible = false;
  return mesh;
}

export function buildSteam() {
  const uniforms = { uTime: { value: 0 }, uAlpha: { value: 0 }, uSeed: { value: 0 } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uAlpha; uniform float uSeed;
      varying vec2 vUv;
      float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h21(i), h21(i+vec2(1,0)), u.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.1 + 5.3; a *= 0.5; } return s; }
      void main() {
        vec2 p = vUv;
        float t = uTime * 0.32 + uSeed;
        vec2 q = vec2((p.x - 0.5) * 2.0, p.y);
        float sway = (vnoise(vec2(q.y * 1.6 - t * 0.7, uSeed)) - 0.5) * 1.4 * q.y;
        q.x -= sway;
        // domain-warped ridged noise -> thin curling filaments, not columns
        vec2 w = vec2(fbm(q * vec2(2.2, 2.6) + vec2(uSeed, -t)), fbm(q * vec2(2.2, 2.6) + vec2(5.2 + uSeed, -t * 1.2)));
        float n = fbm(vec2(q.x * 2.2, q.y * 2.6 - t * 0.9) + 2.6 * w);
        float ridge = pow(1.0 - abs(2.0 * n - 1.0), 6.0) * smoothstep(0.2, 0.6, fbm(q * 3.0 + vec2(0.0, -t)));
        float width = mix(0.22, 0.6, q.y);
        float column = exp(-q.x * q.x / (width * width));
        float vert = smoothstep(0.02, 0.2, p.y) * (1.0 - smoothstep(0.4, 0.9, p.y));
        float a = ridge * column * vert * uAlpha;
        gl_FragColor = vec4(vec3(1.0, 0.95, 0.88), a * 0.5);
        #include <colorspace_fragment>
      }`,
  });
  const group = new THREE.Group();
  const planes = [];
  for (let i = 0; i < 3; i++) {
    const m = mat.clone();
    m.uniforms = { uTime: uniforms.uTime, uAlpha: uniforms.uAlpha, uSeed: { value: i * 3.7 + 1.0 } };
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 12), m);
    plane.position.set((i - 1) * 1.6, 7.6 + 6, (i - 1) * -0.8);
    plane.renderOrder = 5;
    group.add(plane);
    planes.push(plane);
  }
  return { group, uniforms, planes };
}
