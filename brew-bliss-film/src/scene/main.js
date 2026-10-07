// Brew Bliss — "Morning Smile". Scene assembly + deterministic frame renderer.
// window.renderFrame(n) draws frame n at t = n / FPS into #out (1080x1920).
import * as THREE from 'three';
import { FPS, WIDTH, HEIGHT, T } from '../timeline.js';
import { glazeTexture, throwingRingsTexture, tableTextures, contactShadowTexture } from './textures.js';
import { buildCup, buildSaucer, buildPitcher, buildTable, cupInnerRadiusAt, CUP_FILL_Y, SAUCER_WELL_Y } from './props.js';
import { buildCoffeeSurface, FACE } from './coffee.js';
import { buildSky } from './sky.js';
import { buildStream, buildDrop, buildSteam } from './stream.js';
import {
  cameraState, lightState, pitcherState, streamState, dropState, coffeeState, steamAlpha, sunDirection, surfToWorld, SURFACE_Y, SUN_AZ,
} from './choreo.js';
import { createOverlay } from './overlay.js';
import { buildHorizonType, buildTableType } from './typeWorld.js';
import { remap, smooth } from './util.js';

const glCanvas = document.getElementById('gl');
const out = document.getElementById('out');
glCanvas.width = out.width = WIDTH;
glCanvas.height = out.height = HEIGHT;
const ctx = out.getContext('2d');

const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, alpha: false });
renderer.setPixelRatio(1);
renderer.setSize(WIDTH, HEIGHT, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
const HAZE = new THREE.Color('#F3D3A6');
scene.fog = new THREE.Fog(HAZE, 95, 300);
scene.background = HAZE.clone();

// --------------------------------------------------------- environment (IBL)
function buildEnvironment() {
  const env = new THREE.Scene();
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(50, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `varying vec3 vP; void main(){
        float y = normalize(vP).y;
        vec3 sky = vec3(0.30, 0.47, 0.70);
        vec3 hor = vec3(0.95, 0.78, 0.58);
        vec3 gnd = vec3(0.55, 0.43, 0.32);
        vec3 c = y > 0.0 ? mix(hor, sky, pow(y, 0.6)) : mix(hor * 0.8, gnd, pow(-y, 0.5));
        gl_FragColor = vec4(c * 0.9, 1.0); }`,
    }));
  env.add(dome);
  // big warm window in the sun direction, cooler sky panel opposite, soft overhead
  const panel = (w, h, color, intensity, dir, dist) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }));
    m.position.copy(dir.clone().multiplyScalar(dist));
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  panel(16, 22, '#FFE2B8', 3.6, sunDirection(THREE.MathUtils.degToRad(22)), 30);
  panel(30, 14, '#CFE6F7', 1.4, new THREE.Vector3(0.6, 0.5, 0.6).normalize(), 32);
  // tall softbox front-left: a long vertical highlight that describes the cup's form
  panel(7, 26, '#FFF3E4', 3.0, new THREE.Vector3(-0.62, 0.22, 0.75).normalize(), 28);
  panel(24, 24, '#FFF6EA', 1.1, new THREE.Vector3(0, 1, 0.1).normalize(), 30);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.025);
  pm.dispose();
  return rt.texture;
}
scene.environment = buildEnvironment();
scene.environmentIntensity = 0.85;

// ------------------------------------------------------------------ lights
const key = new THREE.DirectionalLight(0xffffff, 3);
key.castShadow = true;
key.shadow.mapSize.set(4096, 4096);
const sc = key.shadow.camera;
sc.left = -17; sc.right = 17; sc.top = 17; sc.bottom = -17; sc.near = 5; sc.far = 140;
key.shadow.bias = -0.00025;
key.shadow.normalBias = 0.025;
key.shadow.radius = 5;
key.shadow.blurSamples = 12;
scene.add(key, key.target);
const hemi = new THREE.HemisphereLight(new THREE.Color('#BFDDF2'), new THREE.Color('#E6CFAA'), 0.6);
scene.add(hemi);
const fill = new THREE.DirectionalLight(new THREE.Color('#FFF1E2'), 0.3);
fill.position.set(30, 25, 50);
scene.add(fill);

// ------------------------------------------------------------------- props
const tex = { glaze: glazeTexture(renderer), rings: throwingRingsTexture() };
const table = buildTable(tableTextures(renderer));
scene.add(table);

const saucer = buildSaucer(tex);
const cup = buildCup(tex);
cup.position.y = SAUCER_WELL_Y;
const dish = new THREE.Group();
dish.add(saucer, cup);
dish.rotation.y = -0.32; // handle toward four o'clock
scene.add(dish);

const surfRadius = cupInnerRadiusAt(CUP_FILL_Y) + 0.12; // edge hides inside the (wobbly) wall
const coffee = buildCoffeeSurface(surfRadius);
coffee.mesh.position.y = SURFACE_Y; // not parented to the rotated dish: the face stays upright
scene.add(coffee.mesh);

// soft contact shadow so the saucer sits on the table rather than floating over it
const contact = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ map: contactShadowTexture(0.74, 1.0, 0.5), transparent: true, depthWrite: false, toneMapped: false }));
contact.position.y = 0.02;
contact.renderOrder = 1;
scene.add(contact);

const pitcher = buildPitcher(tex);
scene.add(pitcher.group);

const stream = buildStream();
scene.add(stream.mesh);
const dropL = buildDrop(), dropR = buildDrop();
scene.add(dropL, dropR);

const steam = buildSteam();
scene.add(steam.group);

const sky = buildSky();
sky.uniforms.uHaze.value.copy(HAZE);
scene.add(sky.mesh);

const horizonType = buildHorizonType(renderer);
scene.add(horizonType.mesh);
const tableType = buildTableType(renderer);
scene.add(tableType.group);

const camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 1, 1500);

const overlay = createOverlay();

// Lens glow for the sunrise shot: blurred, soft-thresholded copy screened back on.
const bloom = document.createElement('canvas');
bloom.width = WIDTH / 4; bloom.height = HEIGHT / 4;
const bctx = bloom.getContext('2d');
function addBloom(amount) {
  if (amount <= 0) return;
  bctx.filter = 'brightness(0.7) contrast(2.6) blur(9px)';
  bctx.clearRect(0, 0, bloom.width, bloom.height);
  bctx.drawImage(glCanvas, 0, 0, bloom.width, bloom.height);
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = amount;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bloom, 0, 0, WIDTH, HEIGHT);
  ctx.restore();
}

// ----------------------------------------------------------------- per frame
function project(v) {
  const p = v.clone().project(camera);
  return { x: (p.x * 0.5 + 0.5) * WIDTH, y: (-p.y * 0.5 + 0.5) * HEIGHT };
}

function sparkleList(t) {
  const list = [];
  const pxPerCm = (() => {
    const a = project(surfToWorld({ x: 0, y: 0 })), b = project(surfToWorld({ x: 1, y: 0 }));
    return Math.hypot(b.x - a.x, b.y - a.y);
  })();
  const add = (surf, at, size, rot = 0) => {
    const k = remap(t, at, at + 0.6);
    if (k <= 0 || k >= 1) return;
    const p = project(surfToWorld(surf, SURFACE_Y + 0.1));
    list.push({ x: p.x, y: p.y, size: size * pxPerCm, k, rot });
  };
  add({ x: -3.0, y: 2.7 }, T.alive, 0.9, 0.2);
  add({ x: 3.5, y: 1.0 }, T.alive + 0.12, 0.7, 0.5);
  add({ x: 2.3, y: -3.2 }, T.alive + 0.24, 0.6, 0.1);
  add({ x: FACE.eyeR.x + 0.95, y: FACE.eyeR.y + 0.75 }, T.winkStart + 0.06, 0.75, 0.3);
  // glint where the gold swash finishes
  if (typeState.swashEnd) {
    const k = remap(t, T.wordSmile + 0.5, T.wordSmile + 1.1);
    if (k > 0 && k < 1) {
      const p = project(typeState.swashEnd.world);
      list.push({ x: p.x + 10, y: p.y, size: 0.75 * pxPerCm, k, rot: 0.4 });
    }
  }
  return list;
}

let typeState = { swashEnd: null };
function update(t) {
  // camera
  const cs = cameraState(t);
  camera.fov = cs.fov;
  camera.position.copy(cs.pos);
  if (cs.shot === 1) { camera.up.set(0, 1, 0); camera.lookAt(cs.look); }
  else camera.quaternion.setFromEuler(cs.euler);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();

  // light + sky
  const ls = lightState(t);
  const keyDir = sunDirection(ls.keyEl);
  key.position.copy(keyDir).multiplyScalar(70);
  key.target.position.set(0, 0, 0);
  key.color.copy(ls.keyColor);
  key.intensity = ls.keyIntensity;
  hemi.intensity = ls.hemi;
  hemi.color.copy(ls.hemiSky);
  hemi.groundColor.copy(ls.hemiGround);
  scene.environmentIntensity = ls.env;
  fill.intensity = ls.fill;
  fill.color.copy(ls.fillColor);
  renderer.toneMappingExposure = ls.exposure;
  sky.mesh.visible = cs.shot === 1;
  sky.uniforms.uSunDir.value.copy(sunDirection(ls.sunEl, SUN_AZ));
  sky.uniforms.uRise.value = ls.rise;
  sky.uniforms.uTime.value = t;
  scene.fog.near = ls.fogDensity > 0 ? 95 : 5000;
  scene.fog.far = ls.fogDensity > 0 ? 300 : 6000;

  // pitcher, stream, drops
  const ps = pitcherState(t);
  pitcher.group.visible = ps.visible;
  pitcher.group.position.copy(ps.pos);
  pitcher.group.rotation.set(0, ps.yaw, ps.tilt, 'YZX');
  const ss = streamState(t, ps);
  stream.update({ ...ss, time: t });
  for (const [mesh, landT, eye] of [[dropL, T.eyeL, FACE.eyeL], [dropR, T.eyeR, FACE.eyeR]]) {
    const d = dropState(t, ps, landT, eye);
    mesh.visible = d.visible;
    if (d.visible) { mesh.position.copy(d.pos); mesh.scale.copy(d.scale); }
  }

  // coffee art
  const c = coffeeState(t);
  const u = coffee.uniforms;
  u.uSmileP.value = c.smileP;
  u.uPourOn.value = c.pourOn;
  u.uPourPt.value.set(c.pourPt.x, c.pourPt.y);
  u.uPourAge.value = c.pourAge;
  u.uEyeLAge.value = c.eyeLAge;
  u.uEyeRAge.value = c.eyeRAge;
  u.uWink.value = c.wink;
  u.uTime.value = t;
  u.uStampAge.value.set(t - T.logo, t - T.wordSip, t - T.wordSavor, t - T.wordSmile);

  // typography in the world
  horizonType.update(t);
  typeState = tableType.update(t);

  // steam
  steam.uniforms.uTime.value = t;
  steam.uniforms.uAlpha.value = steamAlpha(t);
  steam.group.visible = steamAlpha(t) > 0.001;
  for (const p of steam.planes) p.quaternion.copy(camera.quaternion);

  return cs;
}

function renderFrame(frame) {
  const t = frame / FPS;
  const cs = update(t);
  renderer.render(scene, camera);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(glCanvas, 0, 0);
  addBloom(cs.shot === 1 ? 0.35 : 0);
  const vignette = cs.shot === 1 ? 0.22 : 0.16 - 0.06 * smooth(remap(t, T.pullStart, T.pullEnd));
  overlay.draw(ctx, t, frame, { sparkles: sparkleList(t), vignette });
  return t;
}

async function init() {
  await Promise.all([
    document.fonts.load(`600 162px Fraunces`),
    document.fonts.load(`italic 400 76px Fraunces`),
    document.fonts.load(`italic 300 96px Fraunces`),
    document.fonts.load(`600 30px "DM Sans"`),
  ]);
  // warm up: compile all programs once (pitcher/stream/drops visible)
  renderFrame(Math.round(3.5 * FPS));
  renderFrame(0);
  return true;
}

window.renderFrame = renderFrame;
window.frameAsPNG = async () => {
  const blob = await new Promise((res) => out.toBlob(res, 'image/png'));
  const buf = new Uint8Array(await blob.arrayBuffer());
  let s = '';
  for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
  return btoa(s);
};
window.ready = init().then(() => 'ok', (e) => 'error: ' + (e && e.stack || e));
