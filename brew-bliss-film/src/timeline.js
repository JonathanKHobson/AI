// Brew Bliss — "Morning Smile"
// Single source of truth for timing. Imported by the browser scene AND the
// Node audio renderer so that picture and sound are locked to the same clock.
// Every visual value is a pure function of t = frame / FPS.

export const FPS = 60;
export const DURATION = 15.0;               // seconds
export const FRAMES = Math.round(FPS * DURATION); // 900
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const BPM = 100;
export const BEAT = 60 / BPM;               // 0.6 s = 36 frames exactly
export const BAR = BEAT * 4;                // 2.4 s
export const beat = (n) => n * BEAT;

// Story beats (seconds). Musical events sit on the beat grid.
export const T = {
  sunStart: 0.0,
  cut: beat(4),            // 2.40  hard cut on the downbeat: dawn wide -> pour
  pitcherIn: beat(4),      // 2.40  pitcher already entering frame on the cut
  pourStart: 2.55,         // stream leaves the spout
  pourLand: 2.70,          // stream reaches the coffee
  smileStart: 2.75,        // stream starts tracing the smile (left -> right)
  smileEnd: 4.50,
  pourStop: 4.62,          // stream breaks off
  pourTailGone: 4.82,
  eyeL: beat(9),           // 5.40  left eye drop lands ("plip")
  eyeR: beat(10),          // 6.00  right eye drop lands ("plip")
  alive: beat(11),         // 6.60  face complete, sparkle
  winkStart: 7.50,
  winkEnd: 7.84,
  pullStart: 8.10,
  pullEnd: 10.40,
  logo: beat(16),          // 9.60  wordmark reveal
  wordSip: beat(18),       // 10.80
  wordSavor: beat(19),     // 11.40
  wordSmile: beat(20),     // 12.00 final chord, swash
  end: 15.0,
};

export const DROP_FALL = 0.22; // seconds a drop takes from spout to surface

export const PALETTE = {
  forest: '#2E5B45',
  forestDeep: '#1D3D2F',
  forestInk: '#173528',
  cream: '#F5EBDC',
  creamWarm: '#EFDFC8',
  coffee: '#4A2C1C',
  coffeeDeep: '#2A170E',
  crema: '#A8703F',
  gold: '#F0B23E',
  goldDeep: '#B9761A',
  sky: '#8FC6E9',
  skyDeep: '#4F8FC4',
};
