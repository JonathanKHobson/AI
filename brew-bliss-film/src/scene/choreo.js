// Choreography: every animated quantity as a pure function of time t (seconds).
// Camera, light, pitcher, stream, drops, coffee-art uniforms, steam.
import * as THREE from 'three';
import { T, DROP_FALL } from '../timeline.js';
import {
  clamp, lerp, remap, smooth, smoother, easeInOutSine, easeInOutCubic, easeOutCubic, easeInCubic, deg, keyframes,
} from './util.js';
import { FACE, smilePoint } from './coffee.js';

export const SURFACE_Y = 0.45 + 6.45; // saucer well + cup fill height (world)
export const surfToWorld = (p, y = SURFACE_Y) => new THREE.Vector3(p.x, y, -p.y);

export const SUN_AZ = deg(-23);     // visible sun on the dome (sits low-left, under the horizon type)
export const KEY_AZ = deg(-23);     // key light direction (same for every shot)

export function sunDirection(el, az = KEY_AZ) {
  return new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), -Math.cos(el) * Math.cos(az)).normalize();
}

// ------------------------------------------------------------------ camera
export function cameraState(t) {
  if (t < T.cut) {
    // Shot 1 — dawn: low, near rim height, slow push in as the sun clears the hills.
    const k = easeOutCubic(remap(t, 0, T.cut));
    const th = deg(lerp(19, 16.5, k));
    const d = lerp(70, 61, k);
    const camY = lerp(6.0, 6.9, k);
    const pos = new THREE.Vector3(d * Math.sin(th), camY, d * Math.cos(th));
    const look = new THREE.Vector3(lerp(0.4, 0.2, k), lerp(9.6, 9.2, k), 0);
    return { shot: 1, pos, look, fov: 30 };
  }
  // Shot 2 — one continuous crane from a high three-quarter to straight overhead,
  // then a pull back that makes room for the wordmark.
  const kc = easeInOutSine(remap(t, T.cut, 8.7));
  const phi = deg(lerp(43, 90, kc));
  const th = deg(lerp(15, 0, easeInOutSine(remap(t, T.cut, 8.9))));
  const kp = easeInOutCubic(remap(t, T.pullStart, T.pullEnd));
  let d = lerp(lerp(40, 35.5, smooth(remap(t, T.cut, T.pullStart))), 59, kp);
  d -= 2.4 * smooth(remap(t, T.pullEnd, T.end)); // gentle breathing push during the hold
  const target = new THREE.Vector3(0, lerp(SURFACE_Y + 0.6, SURFACE_Y, kc), lerp(0, -5.5, kp));
  const pos = new THREE.Vector3(
    target.x + d * Math.sin(th) * Math.cos(phi),
    target.y + d * Math.sin(phi),
    target.z + d * Math.cos(th) * Math.cos(phi));
  const euler = new THREE.Euler(-phi, th, 0, 'YXZ');
  return { shot: 2, pos, euler, fov: 30, phi, d, target };
}

// ------------------------------------------------------------------- light
export function lightState(t) {
  const rise = smooth(remap(t, 0.1, T.cut));
  if (t < T.cut) {
    return {
      sunEl: deg(lerp(-1.4, 3.4, rise)),       // visible sun on the dome
      keyEl: deg(lerp(9, 15, rise)),            // light that reaches the cup
      keyIntensity: lerp(1.2, 3.2, rise),
      keyColor: new THREE.Color().lerpColors(new THREE.Color('#FF9F5A'), new THREE.Color('#FFC985'), rise),
      hemi: lerp(0.35, 0.6, rise),
      hemiSky: new THREE.Color('#F4CFA4'),
      hemiGround: new THREE.Color('#B98F6C'),
      env: lerp(0.35, 0.6, rise),
      fill: lerp(0.35, 0.7, rise),
      fillColor: new THREE.Color('#FFD8B0'),
      exposure: lerp(0.92, 1.02, rise),
      rise: lerp(0.0, 0.75, rise),
      fogDensity: 1,
    };
  }
  const k = smooth(remap(t, T.cut, T.end));
  return {
    sunEl: deg(8),
    keyEl: deg(39),
    keyIntensity: lerp(4.4, 4.6, k),
    keyColor: new THREE.Color().lerpColors(new THREE.Color('#FFDCAA'), new THREE.Color('#FFD59C'), k),
    hemi: 0.42,
    hemiSky: new THREE.Color('#CFE3F2'),
    hemiGround: new THREE.Color('#E6CDA8'),
    env: 0.55,
    fill: 0.22,
    fillColor: new THREE.Color('#FFF1E2'),
    exposure: 1.0,
    rise: 1,
    fogDensity: 0,
  };
}

// ----------------------------------------------------------------- pitcher
// Returns spout-tip world position and tilt (radians; + lowers the -x spout).
const POUR_OFF = new THREE.Vector3(0.62, 4.6, 0.0);
const DRIP_H = 5.6;

function smileParam(t) {
  return easeInOutSine(remap(t, T.smileStart, T.smileEnd));
}

export function landingSurf(t) {
  return smilePoint(smileParam(t));
}

export function pitcherState(t) {
  const L0 = surfToWorld(smilePoint(0));
  const eL = surfToWorld(FACE.eyeL), eR = surfToWorld(FACE.eyeR);
  const dripL = eL.clone().add(new THREE.Vector3(0.12, DRIP_H, 0));
  const dripR = eR.clone().add(new THREE.Vector3(0.12, DRIP_H, 0));
  const tL = T.eyeL - DROP_FALL, tR = T.eyeR - DROP_FALL; // detach times
  let pos, tilt;
  if (t < T.smileStart) {
    const enter = L0.clone().add(new THREE.Vector3(2.2, 7.4, -1.0));
    const pour = L0.clone().add(POUR_OFF);
    const k = easeOutCubic(remap(t, T.cut - 0.35, T.pourStart + 0.05));
    pos = enter.lerp(pour, k);
    tilt = deg(lerp(30, 59, k));
  } else if (t < T.pourStop) {
    pos = surfToWorld(landingSurf(t)).add(POUR_OFF);
    // the pour leads the landing point slightly as the pitcher sweeps right
    pos.x += 0.25 * Math.sin(Math.PI * smileParam(t));
    tilt = deg(lerp(59, 66, remap(t, T.smileStart, T.pourStop)));
    tilt -= deg(18) * smooth(remap(t, T.pourStop - 0.12, T.pourStop));
  } else if (t < tL) {
    const start = surfToWorld(landingSurf(T.pourStop)).add(POUR_OFF);
    const k = easeInOutCubic(remap(t, T.pourStop, tL - 0.2));
    pos = start.lerp(dripL, k);
    pos.y += 0.6 * Math.sin(Math.PI * k);
    tilt = deg(lerp(48, 52, k));
  } else if (t < tR) {
    const k = easeInOutCubic(remap(t, tL + 0.04, tR - 0.2));
    pos = dripL.clone().lerp(dripR, k);
    pos.y += 0.45 * Math.sin(Math.PI * k);
    // tiny flick at each release
    tilt = deg(52 + 3 * Math.exp(-Math.pow((t - tL) / 0.05, 2)));
  } else {
    const k = easeInCubic(remap(t, tR + 0.06, tR + 0.95));
    pos = dripR.clone().lerp(new THREE.Vector3(12, 24, -7), k);
    tilt = deg(lerp(52, 18, smooth(remap(t, tR + 0.06, tR + 0.7))) + 3 * Math.exp(-Math.pow((t - tR) / 0.05, 2)));
  }
  const visible = t >= T.cut && t < tR + 1.1;
  return { pos, tilt, yaw: deg(-8), visible };
}

// Outflow direction of the spout for a given tilt.
export function spoutDir(tilt, yaw) {
  const v = new THREE.Vector3(-Math.cos(tilt), -Math.sin(tilt), 0);
  return v.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
}

export function streamState(t, pitcher) {
  const visible = t >= T.pourStart && t < T.pourTailGone;
  const uBot = easeInCubic(remap(t, T.pourStart, T.pourLand)) ;
  const uTop = easeInCubic(remap(t, T.pourStop, T.pourTailGone));
  const S = pitcher.pos.clone();
  const L = surfToWorld(landingSurf(t), SURFACE_Y - 0.02);
  const C = S.clone().addScaledVector(spoutDir(pitcher.tilt, pitcher.yaw), 1.0);
  C.y = Math.min(C.y, S.y - 0.3);
  return { visible, uTop, uBot, S, C, L };
}

// Drops: hang on the spout, then fall to the eye position.
export function dropState(t, pitcher, landT, eye) {
  const detach = landT - DROP_FALL;
  const hang0 = detach - 0.2;
  if (t < hang0 || t >= landT) return { visible: false };
  const target = surfToWorld(eye, SURFACE_Y + 0.05);
  if (t < detach) {
    const k = smooth(remap(t, hang0, detach));
    const s = lerp(0.35, 1.0, k);
    const pos = pitcher.pos.clone().add(new THREE.Vector3(0, -0.22 * s - 0.05, 0));
    return { visible: true, pos, scale: new THREE.Vector3(s, s * (1 + 0.25 * k), s) };
  }
  const k = remap(t, detach, landT);
  const start = pitcher.pos.clone().add(new THREE.Vector3(0, -0.27, 0));
  const pos = start.clone().lerp(target, k * k);
  return { visible: true, pos, scale: new THREE.Vector3(0.85, 1.45, 0.85) };
}

// --------------------------------------------------------- coffee uniforms
export function coffeeState(t) {
  const pourOn = clamp(remap(t, T.pourLand - 0.02, T.pourLand + 0.04)) * (1 - remap(t, T.pourStop - 0.04, T.pourStop + 0.08));
  const winkK = (() => {
    if (t < T.winkStart || t > T.winkEnd) return 0;
    const a = smooth(remap(t, T.winkStart, T.winkStart + 0.09));
    const b = smooth(remap(t, T.winkEnd - 0.13, T.winkEnd));
    return a * (1 - b);
  })();
  return {
    smileP: t < T.smileStart ? (t >= T.pourLand ? 0.0001 : 0) : smileParam(t),
    pourOn,
    pourPt: landingSurf(t),
    pourAge: Math.max(0, t - T.pourLand),
    eyeLAge: t - T.eyeL,
    eyeRAge: t - T.eyeR,
    wink: winkK,
  };
}

export function steamAlpha(t) {
  // present (backlit) in the dawn shot only; never drifts over the face
  return t < T.cut ? smooth(remap(t, 0.0, 0.6)) : 0;
}
