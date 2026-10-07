// The coffee surface. A lit MeshStandardMaterial whose albedo, roughness and
// normal are replaced by a procedural crema + cream-art field. The smile and the
// two eyes are signed-distance shapes driven by uniforms that the timeline sets
// each frame, so the face is drawn by the pour rather than faded in.
import * as THREE from 'three';

// Face layout in surface centimetres (x right, y toward the far rim = screen-up overhead).
export const FACE = (() => {
  const FS = 1.2;
  const deg = Math.PI / 180;
  return {
    FS,
    eyeL: new THREE.Vector2(-1.33 * FS, 1.2 * FS),
    eyeR: new THREE.Vector2(1.33 * FS, 1.2 * FS),
    eyeRad: new THREE.Vector2(0.5 * FS, 0.63 * FS),
    smileC: new THREE.Vector2(0, 0.95 * FS),
    smileR: 2.3 * FS,
    a0: 208 * deg,
    a1: 332 * deg,
  };
})();

export function smilePoint(s) {
  const a = FACE.a0 + (FACE.a1 - FACE.a0) * s;
  return new THREE.Vector2(FACE.smileC.x + FACE.smileR * Math.cos(a), FACE.smileC.y + FACE.smileR * Math.sin(a));
}

const GLSL_COMMON = /* glsl */ `
varying vec2 vSurf;
uniform float uRadius;
uniform float uSmileP;
uniform float uPourOn;
uniform vec2  uPourPt;
uniform float uEyeLAge;
uniform float uEyeRAge;
uniform float uWink;
uniform float uTime;
uniform float uPourAge;
uniform vec4 uStampAge; // seconds since each letterpress stamp (<0 = not yet)

const float FS = ${FACE.FS.toFixed(4)};
const vec2 EYE_L = vec2(${FACE.eyeL.x.toFixed(4)}, ${FACE.eyeL.y.toFixed(4)});
const vec2 EYE_R = vec2(${FACE.eyeR.x.toFixed(4)}, ${FACE.eyeR.y.toFixed(4)});
const vec2 EYE_RAD = vec2(${FACE.eyeRad.x.toFixed(4)}, ${FACE.eyeRad.y.toFixed(4)});
const vec2 SMILE_C = vec2(${FACE.smileC.x.toFixed(4)}, ${FACE.smileC.y.toFixed(4)});
const float SMILE_R = ${FACE.smileR.toFixed(4)};
const float A0 = ${FACE.a0.toFixed(5)};
const float A1 = ${FACE.a1.toFixed(5)};

float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return s;
}

// Smile stroke: an arc whose head advances with uSmileP. Returns signed distance (cm).
float smileSD(vec2 p) {
  if (uSmileP <= 0.0) return 1e3;
  float a1h = A0 + (A1 - A0) * uSmileP;
  vec2 q = p - SMILE_C;
  float ang = atan(q.y, q.x);
  float am = A0 + mod(ang - A0, 6.2831853);
  float d, s;
  if (am <= a1h) { d = abs(length(q) - SMILE_R); s = (am - A0) / (A1 - A0); }
  else {
    vec2 e0 = SMILE_C + SMILE_R * vec2(cos(A0), sin(A0));
    vec2 e1 = SMILE_C + SMILE_R * vec2(cos(a1h), sin(a1h));
    float d0 = length(p - e0), d1 = length(p - e1);
    if (d0 < d1) { d = d0; s = 0.0; } else { d = d1; s = uSmileP; }
  }
  float age = max(uSmileP - s, 0.0);
  float bloom = 0.80 + 0.20 * (1.0 - exp(-age * 7.0));
  // a touch fuller in the middle, rounded "dimples" at both ends
  float w = FS * (0.255 + 0.055 * sin(3.14159 * s) + 0.045 * exp(-s * 14.0) + 0.045 * exp(-(1.0 - s) * 14.0) * step(0.98, uSmileP));
  w *= bloom;
  return d - w;
}

float eyeSD(vec2 p, vec2 c, float age, float wink) {
  if (age < 0.0) return 1e3;
  float g = 1.0 - exp(-age * 11.0) * cos(age * 17.0);   // spreads with a soft overshoot
  g = clamp(g, 0.0, 1.12);
  vec2 r = EYE_RAD * max(g, 0.02);
  r.y *= mix(1.0, 0.24, wink);
  r.x *= mix(1.0, 1.16, wink);
  vec2 q = p - c;
  q.y -= wink * 0.24 * FS * (1.0 - clamp((q.x * q.x) / (r.x * r.x), 0.0, 1.0)); // closes into a happy arc
  float k = length(q / r);
  return (k - 1.0) * min(r.x, r.y);
}

// Cream coverage field (0..1) and signed distance to its edge.
float creamSD(vec2 p) {
  vec2 w = p + 0.06 * vec2(vnoise(p * 1.4 + 3.1) - 0.5, vnoise(p * 1.4 + 9.7) - 0.5);
  float d = smileSD(w);
  // pooling head where the stream is landing
  if (uPourOn > 0.001) d = min(d, length(w - uPourPt) - FS * 0.33 * uPourOn * (0.6 + 0.4 * smoothstep(0.0, 0.25, uPourAge)));
  d = min(d, eyeSD(w, EYE_L, uEyeLAge, 0.0));
  d = min(d, eyeSD(w, EYE_R, uEyeRAge, uWink));
  d += 0.022 * (vnoise(p * 7.0) - 0.5);
  return d;
}

float ripple(vec2 p, vec2 c, float age, float amp, float speed) {
  if (age < 0.0) return 0.0;
  float d = length(p - c);
  float R = 0.15 + age * speed;
  float x = d - R;
  return amp * exp(-x * x / 0.30) * exp(-age * 2.4) * sin(x * 10.0);
}

float heightField(vec2 p) {
  float sd = creamSD(p);
  float h = 0.045 * (1.0 - smoothstep(-0.12, 0.05, sd));
  h += ripple(p, EYE_L, uEyeLAge, 0.028, 5.5);
  h += ripple(p, EYE_R, uEyeRAge, 0.028, 5.5);
  // each letterpress stamp nudges the table: rings run in from the cup wall
  vec4 amps = vec4(0.020, 0.011, 0.011, 0.015);
  float rr0 = uRadius - length(p);
  for (int i = 0; i < 4; i++) {
    float a = uStampAge[i];
    if (a > 0.0 && a < 2.5) {
      float x = rr0 - a * 7.0;
      h += amps[i] * exp(-a * 2.2) * exp(-x * x / 0.8) * sin(x * 7.5);
    }
  }
  // continuous small rings around the stream impact
  if (uPourOn > 0.0) {
    float d = length(p - uPourPt);
    h += uPourOn * 0.012 * exp(-d * 1.1) * sin(d * 12.0 - uTime * 22.0);
  }
  return h;
}
`;

export function buildCoffeeSurface(radius) {
  const geo = new THREE.CircleGeometry(radius, 160);
  geo.rotateX(-Math.PI / 2); // local +y (far rim) -> world -z
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, metalness: 0, envMapIntensity: 0.2, dithering: true });
  const uniforms = {
    uRadius: { value: radius },
    uSmileP: { value: 0 },
    uPourOn: { value: 0 },
    uPourPt: { value: new THREE.Vector2(0, 0) },
    uPourAge: { value: 0 },
    uEyeLAge: { value: -1 },
    uEyeRAge: { value: -1 },
    uWink: { value: 0 },
    uTime: { value: 0 },
    uStampAge: { value: new THREE.Vector4(-1, -1, -1, -1) },
  };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vSurf;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n vSurf = vec2(position.x, -position.z);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\n' + GLSL_COMMON)
      .replace('#include <map_fragment>', /* glsl */ `
        vec2 sp = vSurf;
        float rr = length(sp) / uRadius;
        // crema: warm tiger-mottle over deep coffee, lighter where it rides up the wall
        float m = fbm(sp * 0.55 + vec2(4.2, 1.3));
        float m2 = fbm(vec2(sp.x * 1.6 + m * 1.5, sp.y * 1.6) + vec2(2.0, 7.0));
        vec3 deep  = vec3(0.070, 0.031, 0.014);
        vec3 brown = vec3(0.135, 0.062, 0.027);
        vec3 crema = vec3(0.300, 0.150, 0.060);
        // smooth cafe-creme crema: darker heart, warmer toward the wall, faint tiger flecks
        vec3 coffee = mix(deep, brown, smoothstep(0.15, 0.85, 0.55 * m + 0.45 * rr));
        coffee = mix(coffee, crema, 0.16 * smoothstep(0.5, 0.85, m2));
        coffee = mix(coffee, crema * 1.05, smoothstep(0.78, 0.99, rr) * 0.7);
        float cs = creamSD(sp);
        float aa = fwidth(cs) * 0.9 + 0.012;
        float cream = 1.0 - smoothstep(-aa, aa, cs);
        // golden-brown halo where cream pushed the crema aside
        float halo = exp(-max(cs, 0.0) / 0.22) * (1.0 - cream);
        coffee = mix(coffee, vec3(0.42, 0.22, 0.09), halo * 0.55);
        vec3 creamCol = vec3(0.93, 0.86, 0.74) * (0.95 + 0.05 * vnoise(sp * 30.0));
        creamCol = mix(creamCol, vec3(0.80, 0.66, 0.48), smoothstep(-0.10, 0.0, cs) * 0.35); // thin warm rim
        // stream impact froth
        if (uPourOn > 0.0) {
          float dI = length(sp - uPourPt);
          creamCol = mix(creamCol, vec3(0.98, 0.95, 0.88), uPourOn * exp(-dI * 3.0) * 0.5);
        }
        vec3 surf = mix(coffee, creamCol, cream);
        // meniscus darkening right at the wall
        surf *= 0.78 + 0.22 * (1.0 - smoothstep(0.93, 1.0, rr));
        diffuseColor.rgb = surf;
        float creamMaskBB = cream;
      `)
      .replace('#include <roughnessmap_fragment>', /* glsl */ `
        float roughnessFactor = mix(0.11, 0.42, creamMaskBB);
      `)
      .replace('#include <normal_fragment_maps>', /* glsl */ `
        {
          float e = 0.035;
          float h0 = heightField(sp);
          float hx = heightField(sp + vec2(e, 0.0));
          float hy = heightField(sp + vec2(0.0, e));
          vec2 g = vec2(hx - h0, hy - h0) / e;
          vec3 nW = normalize(vec3(-g.x, 1.0, g.y));
          normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
        }
      `);
  };
  mat.customProgramCacheKey = () => 'coffee-surface-v1';
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  return { mesh, uniforms };
}
