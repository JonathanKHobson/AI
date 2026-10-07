// "Morning Smile" — original score. D major, 100 BPM (one beat = 0.6 s = 36 video frames).
// Story beats from timeline.js land on the grid: the cut on a downbeat, the eye drops
// on beats 9 and 10, a V-I cadence on the word "Smile."
import { BEAT, T, DURATION } from '../timeline.js';
import { Stereo } from './dsp.js';
import { pad, epiano, kalimba, bell, bass, kick, brushSnare, shaker } from './instruments.js';

const b = (n) => n * BEAT; // beat -> seconds

// Chords per two-beat slot (rootless voicings for keys; pad voicing a little lower).
const CHORDS = [
  // [startBeat, lengthBeats, padNotes, epNotes]
  [0, 4, ['D3', 'A3', 'E4', 'F#4', 'C#5'], null],                 // Dmaj9 (dawn)
  [4, 4, ['G2', 'D3', 'B3', 'F#4', 'A4'], ['B3', 'D4', 'F#4', 'A4']], // Gmaj9 (pour)
  [8, 2, ['F#2', 'C#3', 'A3', 'E4'], ['A3', 'C#4', 'E4', 'B4']],      // F#m11 (eye 1)
  [10, 2, ['B2', 'F#3', 'D4', 'A4'], ['A3', 'C#4', 'D4', 'F#4']],     // Bm9 (eye 2, alive)
  [12, 2, ['E3', 'B3', 'D4', 'F#4'], ['G3', 'B3', 'D4', 'F#4']],      // Em9 (wink)
  [14, 2, ['A2', 'E3', 'G3', 'D4'], ['G3', 'A3', 'D4', 'E4']],        // A7sus4 (pull back)
  [16, 2, ['G2', 'D3', 'B3', 'F#4'], ['B3', 'D4', 'F#4', 'A4']],      // Gmaj9 (logo)
  [18, 2, ['A2', 'E3', 'G3', 'C#4'], ['G3', 'C#4', 'E4', 'A4']],      // A7 (Sip, Savor)
  [20, 5, ['D2', 'A2', 'F#3', 'E4', 'C#5'], ['C#4', 'E4', 'F#4', 'A4']], // Dmaj9 (Smile.)
];

const BASS = [
  // [beat, note, lengthBeats, vel]
  [4, 'G2', 1.4, 0.9], [5.5, 'G2', 0.4, 0.6], [6, 'D3', 0.8, 0.7], [7, 'B2', 0.8, 0.7],
  [8, 'F#2', 0.9, 0.85], [9, 'A2', 0.45, 0.6], [9.5, 'C#3', 0.4, 0.6],
  [10, 'B1', 0.9, 0.85], [11, 'F#2', 0.45, 0.6], [11.5, 'A2', 0.4, 0.6],
  [12, 'E2', 0.9, 0.85], [13, 'G2', 0.45, 0.6], [13.5, 'B2', 0.4, 0.6],
  [14, 'A1', 1.9, 0.8],
  [16, 'G2', 0.9, 0.85], [17, 'D3', 0.45, 0.65], [17.5, 'B2', 0.4, 0.6],
  [18, 'A2', 0.45, 0.8], [18.5, 'A2', 0.3, 0.55], [19, 'A2', 0.45, 0.75], [19.5, 'C#3', 0.4, 0.6],
  [20, 'D2', 4.2, 0.95],
];

const MELODY = [
  // [beat, note, vel, pan] — kalimba lead
  [2, 'A4', 0.45, -0.2], [3, 'D5', 0.55, 0.1], [3.5, 'E5', 0.5, 0.2],
  [4, 'F#5', 0.7, 0.0], [5.5, 'A5', 0.45, 0.25], [6, 'E5', 0.45, -0.2], [7.5, 'D5', 0.35, 0.1],
  [8, 'C#5', 0.55, -0.15], [8.5, 'E5', 0.45, 0.1], [9.5, 'E5', 0.4, -0.3], [10.5, 'F#5', 0.45, 0.3],
  [12, 'B4', 0.5, -0.1], [13, 'D5', 0.5, 0.1], [13.5, 'E5', 0.45, -0.1], [14, 'C#5', 0.5, 0.15], [14.5, 'E5', 0.45, -0.15],
  [16, 'D5', 0.6, -0.25], [16.25, 'F#5', 0.55, 0.0], [16.5, 'A5', 0.6, 0.25], [17.5, 'B5', 0.45, 0.1],
  [18, 'A4', 0.7, -0.1], [19, 'C#5', 0.72, 0.05], [20, 'D5', 0.85, 0.0],
  [21, 'F#5', 0.4, 0.3], [21.5, 'E5', 0.35, -0.3], [22.5, 'D5', 0.32, 0.2], [23, 'A5', 0.3, -0.1],
];

const EP_RHYTHM = [[0, 0.9, 0.62], [1.5, 0.45, 0.48], [3, 0.8, 0.52]]; // within each bar, [offsetBeats, lenBeats, vel]

export function renderScore() {
  const stems = {
    keys: new Stereo(DURATION), bass: new Stereo(DURATION), drums: new Stereo(DURATION), melody: new Stereo(DURATION),
  };
  // ---- pad
  for (const [sb, lb, padNotes] of CHORDS) {
    const t0 = b(sb), dur = b(lb);
    const isFirst = sb === 0, isLast = sb === 20;
    pad(stems.keys, {
      notes: padNotes, t0: isFirst ? 0.05 : t0 - 0.04, dur: isLast ? 2.1 : dur + 0.05,
      gain: isFirst ? 0.05 : 0.042, attack: isFirst ? 1.8 : 0.25, release: isLast ? 1.1 : 0.5,
      cutoff: isFirst ? 600 : 1400, cutoffEnd: isFirst ? 1900 : (sb === 14 ? 2600 : null),
    });
  }
  // ---- electric piano comping (from the cut until the final chord)
  for (const [sb, lb, , ep] of CHORDS) {
    if (!ep) continue;
    if (sb === 20) {
      ep.forEach((n, k) => epiano(stems.keys, { note: n, t0: b(20) + k * 0.018, dur: 2.2, vel: 0.62, gain: 0.07, pan: -0.3 + k * 0.2 }));
      continue;
    }
    for (let beat = sb; beat < sb + lb; beat += 4) {
      for (const [off, len, vel] of EP_RHYTHM) {
        if (off >= lb && lb < 4) continue;
        const at = beat + off;
        if (at >= sb + lb) continue;
        if (at >= 15 && at < 16) continue; // one-beat break before the logo
        ep.forEach((n, k) => epiano(stems.keys, { note: n, t0: b(at) + k * 0.012, dur: b(len), vel, gain: 0.06, pan: -0.3 + k * 0.2 }));
      }
    }
  }
  // ---- bass
  for (const [beat, note, len, vel] of BASS) bass(stems.bass, { note, t0: b(beat), dur: b(len), vel, gain: 0.26 });
  // ---- drums: soft lo-fi pocket from the cut; break on beat 15; stop on the final chord
  for (let beat = 4; beat < 20; beat++) {
    const inBar = beat % 4;
    if (beat === 15) continue;
    if (inBar === 0) kick(stems.drums, { t0: b(beat), vel: 0.85, gain: 0.42 });
    if (inBar === 2) kick(stems.drums, { t0: b(beat + 0.5), vel: 0.55, gain: 0.42 });
    if (inBar === 1 || inBar === 3) brushSnare(stems.drums, { t0: b(beat), vel: 0.75, seed: beat * 13 });
  }
  for (let s16 = 16; s16 < 80; s16++) { // 16th shaker with swing
    const beat = s16 / 4;
    if (beat >= 15 && beat < 15.5) continue;
    const swing = s16 % 2 === 1 ? 0.035 : 0;
    const accent = s16 % 4 === 0 ? 1 : s16 % 2 === 0 ? 0.7 : 0.45;
    shaker(stems.drums, { t0: b(beat) + swing, vel: accent * (beat >= 15.5 && beat < 16 ? 1.3 : 1), seed: s16 * 7 + 1 });
  }
  kick(stems.drums, { t0: b(20), vel: 0.9, gain: 0.45 }); // final downbeat
  // ---- melody
  MELODY.forEach(([beat, note, vel, pan], i) => kalimba(stems.melody, { note, t0: b(beat), vel, pan, seed: 100 + i, decay: beat >= 20 ? 1.4 : 0.9 }));
  // octave bell doubling on the three tagline words and the final note
  [[18, 'A5'], [19, 'C#6'], [20, 'D6']].forEach(([beat, note]) => bell(stems.melody, { note, t0: b(beat), vel: 0.5, gain: 0.07, decay: 1.4 }));
  return stems;
}
