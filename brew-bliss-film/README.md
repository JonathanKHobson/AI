# Brew Bliss — "Morning Smile"

A 15-second portrait (1080×1920) brand film for **Brew Bliss**, a fictional, welcoming coffee brand.
Every frame is generated in a real browser (Chromium; Three.js on WebGL plus Canvas 2D) at
`t = frame / 60`. The score and sound effects are synthesised in JavaScript at 48 kHz stereo.
There is no stock footage, no image or sample files, and no AI-generated media.

**Tagline:** *Sip, Savor, Smile.*

---

## Creative direction — "Morning light, tactile type"

A sunrise-lit still life. Every word lives in the same physical space and light as the cup.

| | |
|---|---|
| **Story** | Dawn → a pour that *draws* a smile → two drops become eyes → the face winks → the camera rises and the brand is pressed into the table. |
| **Visual through-line** | The **arc**: the sunrise arc → the cream smile → the gold sun-smile mark and the swash under "Smile." |
| **Palette** | Forest-green stoneware, warm-cream limewash table, coffee brown, sunrise-gold key light against a sky-blue fill and a sky-blue creamer. |
| **Materials** | Hand-thrown speckled stoneware (out-of-round wobble, throwing rings, glaze that breaks lighter on ridges and pools darker at joints, an unglazed foot), satin cream, limewash plaster, gold foil. |
| **Type system** | **Fraunces** (soft editorial serif) used as a physical material. **DM Sans** appears only as a small, stable caption. |
| **Type in the scene** | "Good morning." rises letter by letter from behind the horizon like the sun. The tabletop occludes it, the cup passes in front of it, and it reads as a dark, backlit silhouette with a warm light-wrap. "Brew Bliss" and "Sip, Savor, Smile." are letterpressed into the table: each element drops in with a soft shadow and presses down on the beat, and every press sends a ripple through the coffee. The mark and swash are gold foil with a travelling glint. |
| **Camera** | One continuous reveal per idea. A low push-in at rim height (the horizon, where the words rise) is followed by a hard cut on the downbeat to a high three-quarter view. One crane then rises to overhead (the coffee, where the face is drawn) and pulls back (the table, where the brand is pressed). |
| **Motion character** | Fluid and tactile: pours, ripples, drops, presses with a small overshoot. There are no template fades or slide transitions. |
| **Delight** | Cream forms a clear smiley face: a smile stroke drawn left to right by the pour, two drop-formed eyes, then a wink. It is designed to read at phone size: high-contrast cream on dark crema, and the face spans about half the cup. |

### Timeline (60 fps, 100 BPM; one beat = 0.6 s = 36 frames)

| Time | Frame | Picture | Sound |
|---|---|---|---|
| 0.00–2.40 | 0–143 | Dawn: low push-in on the cup; the sun clears the hills; "Good morning." rises from behind the horizon; backlit steam | Pad swell, dawn birdsong, kalimba pickup, reverse air swell into the cut |
| 2.40 | 144 | **Hard cut on the downbeat** to a high three-quarter view; the sky-blue creamer swings in | Groove enters (kick, brush, shaker, bass, e-piano) |
| 2.55–4.62 | 153–277 | The stream lands and traces the smile left to right; ripples | Pour: bubble model + stream hiss, panned with the landing point; music ducks 3 dB |
| 5.40 / 6.00 | 324 / 360 | A drop falls, then another; each eye blooms with a ripple | Two tuned "plips" (A5, then C♯6) on beats 9 and 10 |
| 6.60 | 396 | Face complete; sparkles | Celesta glissando |
| 7.50–7.84 | 450–470 | **Wink** | Bright "tink" |
| 8.10–10.40 | 486–624 | The crane reaches overhead and pulls back | Soft air whoosh; one-beat break and riser |
| 9.60 | 576 | "Brew Bliss" presses into the table; the gold mark lands with a glint | Letterpress thunks, foil chime |
| 10.80 / 11.40 / 12.00 | 648 / 684 / 720 | "Sip," "Savor," "Smile." press in on the beat; the gold swash draws under "Smile." | A V–I cadence lands on "Smile." |
| 12.00–15.00 | 720–899 | **End card held for 3 s**, with a gentle breathing push-in | Dmaj9 rings out; birds return; fade to silence |

---

## Deliverables (`dist/`)

| File | What it is |
|---|---|
| `BrewBliss_MorningSmile_1080x1920_60fps.mp4` | The film. H.264 High, yuv420p, BT.709, native 60 fps CFR, 900 unique frames, AAC 320 kb/s, 48 kHz stereo |
| `audio/BrewBliss_MorningSmile_mix_48k_24bit.wav` | Mastered soundtrack |
| `audio/stems/*.flac` | Lossless 48 kHz / 24-bit stems: keys and pad, bass, drums, melody and bells, SFX, ambience. Post-fader; they sum to the mix before the bus processing |
| `audio/cues.json` | Sync points for each sound event |
| `frames/*.png` | Selected full-resolution frames, decoded from the delivered MP4 |
| `qa/` | Contact sheet (2 frames per second), spectrogram, waveform |
| `QA.json` | Measured facts about the delivered file |
| `brew-bliss-film-source.zip` | Source package (this folder without `node_modules`, `build` or `dist`) |

## Reproduce

```bash
npm install                 # three@0.170.0, @fontsource/fraunces, @fontsource/dm-sans, playwright@1.56.1
npm run audio               # build/audio/mix.wav + stems + cues.json            (~5 s)
npm run video               # 900 PNG frames in headless Chromium + H.264 encode   (~40 min on 4 CPU cores, software WebGL)
npm run mux                 # dist/BrewBliss_MorningSmile_1080x1920_60fps.mp4
npm run qa                  # dist/QA.json, dist/frames, dist/qa
npm run package             # dist/audio, dist/brew-bliss-film-source.zip
```

Useful while iterating:

```bash
node scripts/render-video.mjs --stills 0,144,330,720,899        # selected frames -> build/stills
node scripts/render-video.mjs --range 540:900 --workers 3       # re-render a span
node scripts/render-video.mjs --encode-only                     # encode existing frames
```

The renderer needs Chromium with WebGL2. Here it ran on SwiftShader (software Vulkan via ANGLE) with
4× MSAA (`scripts/lib/browser.mjs`). Rendering is deterministic: every value is a pure function of
the frame number, and all randomness uses fixed seeds.

## Source map

| Path | Role |
|---|---|
| `src/timeline.js` | Single clock shared by picture and sound: FPS, BPM, story beats, palette |
| `src/scene/main.js` | Renderer, lights, image-based lighting, compositing, `window.renderFrame(n)` |
| `src/scene/choreo.js` | Every animated quantity as a function of `t`: camera, light, creamer, stream, drops, face |
| `src/scene/props.js` | Lathe-built cup, saucer and creamer; swept strap handles; hand-thrown wobble; glaze colour logic |
| `src/scene/coffee.js` | Coffee-surface shader: crema plus signed-distance cream art (smile, eyes, wink), ripples |
| `src/scene/typeWorld.js` | In-world typography: horizon letters, letterpress and foil end card |
| `src/scene/sky.js`, `stream.js`, `textures.js`, `overlay.js` | Sunrise dome; stream, drops and steam; procedural glaze and table textures; sparkles, caption, vignette, grain |
| `src/audio/*.js` | DSP toolkit (biquads, Freeverb, ping-pong delay, compressor, true-peak limiter), instruments, score, SFX |
| `scripts/*.mjs` | Render, mux, QA, package |

## Rights and provenance

- **All picture and sound content was created from code in this repository.** There is no photography, footage, stock, samples, presets or generative-AI media. Brew Bliss is fictional; any resemblance to a real brand is unintended.
- **Fonts:** Fraunces (Undercase Type) and DM Sans (Colophon / Google) are under the **SIL Open Font License 1.1**, installed from npm via Fontsource. The OFL permits embedding them in rendered video.
- **Libraries:** three.js (MIT); Playwright (Apache-2.0) drives the pre-installed Chromium. FFmpeg (LGPL/GPL build from the OS) was used only as an encoding and measurement tool; libx264 (GPL) encoded the H.264 stream.
- **Music:** an original composition written for this film. The chord progression and melody are written out in `src/audio/score.js`.

## Honest limitations

- **I could not listen to the audio.** The mix was judged with measurements: EBU R128 loudness, true peak, loudness in specific event windows, spectrogram and waveform. The cue alignment is exact by construction, because both picture and sound read `src/timeline.js`. Tonal balance and taste still need a pair of human ears.
- **I did not watch real-time playback.** I inspected rendered and decoded frames, contact sheets and frame sequences around each beat. Motion smoothness is inferred from the deterministic 60 fps render and the duplicate-frame check in `QA.json`.
- The creamer moves without a visible hand; the hand is implied off-frame at the top right, a deliberate stylisation. Steam appears only in the dawn shot and never crosses the face.
- Rendering uses software WebGL, so a full render takes about 40 minutes on 4 cores. A GPU would make it much faster, and the output would be identical apart from tiny rasterisation differences.
