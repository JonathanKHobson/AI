// Sunrise sky dome seen through the window in the opening shot. Direction-based,
// so the sun on the dome and the key light always agree. Rendered soft, as if the
// lens is focused on the cup.
import * as THREE from 'three';

export function buildSky() {
  const uniforms = {
    uSunDir: { value: new THREE.Vector3(0, 0.05, -1) },
    uRise: { value: 0 },            // 0 = pre-dawn, 1 = golden morning
    uHaze: { value: new THREE.Color() },
    uTime: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uSunDir;
      uniform float uRise;
      uniform vec3 uHaze;
      uniform float uTime;
      varying vec3 vWorld;
      float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float vnoise(vec2 p) {
        vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
      }
      float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.07 + 13.3; a *= 0.5; } return s; }
      vec3 toLin(vec3 c) { return pow(c, vec3(2.2)); }
      void main() {
        vec3 d = normalize(vWorld - cameraPosition);
        float el = asin(clamp(d.y, -1.0, 1.0));            // elevation (rad)
        float az = atan(d.x, -d.z);                         // azimuth (rad), 0 = -z
        float sunAz = atan(uSunDir.x, -uSunDir.z);
        float sunEl = asin(uSunDir.y);
        float r = uRise;
        // gradient: zenith -> mid -> horizon
        vec3 zen  = mix(toLin(vec3(0.20, 0.33, 0.56)), toLin(vec3(0.42, 0.66, 0.87)), r);
        vec3 mid  = mix(toLin(vec3(0.55, 0.52, 0.62)), toLin(vec3(0.66, 0.80, 0.90)), r);
        vec3 hor  = mix(toLin(vec3(0.98, 0.62, 0.36)), toLin(vec3(1.00, 0.84, 0.58)), r);
        float e = clamp(el / 0.55, 0.0, 1.0);
        vec3 col = mix(hor, mid, smoothstep(0.0, 0.35, e));
        col = mix(col, zen, smoothstep(0.3, 1.0, e));
        // warm glow around the sun, wider near the horizon
        float dAz = az - sunAz;
        float ang = length(vec2(dAz * cos(el), el - sunEl));
        col += toLin(vec3(1.0, 0.72, 0.38)) * (0.55 * exp(-ang * 3.2) + 0.35 * exp(-ang * 9.0)) * (0.6 + 0.6 * r);
        col += toLin(vec3(1.0, 0.80, 0.55)) * 0.25 * exp(-abs(el - 0.02) * 9.0) * exp(-abs(dAz) * 1.5);
        // soft sunrise cloud streaks, lit from below
        float cl = fbm(vec2(az * 3.0 + 1.7, el * 16.0) + vec2(uTime * 0.01, 0.0));
        float band = smoothstep(0.08, 0.16, el) * (1.0 - smoothstep(0.30, 0.42, el));
        float cloud = smoothstep(0.52, 0.78, cl) * band;
        vec3 cloudCol = mix(toLin(vec3(0.95, 0.62, 0.55)), toLin(vec3(1.0, 0.88, 0.72)), r);
        cloudCol *= 0.8 + 0.6 * exp(-ang * 2.0);
        col = mix(col, cloudCol, cloud * 0.55);
        // sun disc (defocused: soft edge)
        float disc = 1.0 - smoothstep(0.022, 0.034, ang);
        col = mix(col, toLin(vec3(1.0, 0.95, 0.80)) * 3.2, disc);
        // distant hills, two hazy layers (sun is behind them as it rises)
        float h1 = 0.030 + 0.020 * sin(az * 4.0 + 1.3) + 0.012 * sin(az * 9.0 + 0.4) + 0.006 * fbm(vec2(az * 14.0, 0.0));
        float h2 = 0.012 + 0.012 * sin(az * 6.5 + 2.8) + 0.006 * sin(az * 15.0) ;
        vec3 far  = mix(toLin(vec3(0.55, 0.50, 0.62)), toLin(vec3(0.66, 0.74, 0.80)), r);
        vec3 near = mix(toLin(vec3(0.36, 0.38, 0.46)), toLin(vec3(0.50, 0.60, 0.62)), r);
        far = mix(far, hor, 0.35);
        float m1 = 1.0 - smoothstep(h1 - 0.006, h1 + 0.006, el);
        float m2 = 1.0 - smoothstep(h2 - 0.005, h2 + 0.005, el);
        col = mix(col, far, m1 * 0.85);
        col = mix(col, near, m2 * 0.9);
        // below the hills: haze that matches the table fog
        col = mix(col, uHaze, smoothstep(0.004, -0.02, el));
        // gentle defocused bokeh motes drifting in the light
        for (int i = 0; i < 6; i++) {
          float fi = float(i);
          vec2 c = vec2(sunAz + (h21(vec2(fi, 3.0)) - 0.5) * 0.5, 0.05 + h21(vec2(fi, 7.0)) * 0.3 + uTime * 0.004 * (0.5 + h21(vec2(fi, 1.0))));
          float bd = length(vec2((az - c.x) * cos(el), el - c.y));
          col += toLin(vec3(1.0, 0.85, 0.6)) * 0.05 * (1.0 - smoothstep(0.016, 0.022, bd)) * r;
        }
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        // dither (in display space) against gradient banding
        gl_FragColor.rgb += (h21(gl_FragCoord.xy + fract(uTime * 7.31)) - 0.5) * (1.5 / 255.0);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(320, 64, 32), mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return { mesh, uniforms };
}
