# Case Study: "Morning Smile" — a 15-second brand film made entirely in code

**For learners improving motion-design and production skills.**
This is an honest audit of one production: what was planned, what broke, what feedback changed the work, and a playbook for doing it again faster.

---

## 1. The brief, in one paragraph

Make a polished 10–18 s portrait (1080×1920) film for a fictional coffee brand, "Brew Bliss". Colours: forest-green stoneware, cream, coffee brown, sunrise gold, sky blue. Tagline: *Sip, Savor, Smile.* Required delight: cream forms a smiley face in the cup that reads on a phone. Every frame must be rendered in a real browser at native 60 fps, with original JavaScript-synthesised 48 kHz stereo music and sound effects in sync.

## 2. The result

| | |
|---|---|
| Runtime | 15.0 s, 900 unique frames, 60 fps constant |
| Picture | 1080×1920, H.264 High, BT.709, 26.8 MB |
| Sound | AAC 320 kb/s, 48 kHz stereo; mix measured at **−14.4 LUFS**, **−1.3 dBTP** true peak |
| Tools | Three.js (WebGL) + Canvas 2D in headless Chromium, ffmpeg, plain JavaScript DSP |
| Story | Dawn silhouette → a cream pour draws a smile → two drops become eyes → the face winks → the camera rises and the brand is pressed into the table |

## 3. Timeline of the production (what actually happened)

| Phase | What happened | Lesson |
|---|---|---|
| 1. Setup | Checked the machine: 4 CPU cores, no GPU, software WebGL works. | **Measure your render environment before designing.** It sets your budget for everything. |
| 2. Direction and code | Wrote a shared timeline (one clock for picture and sound), then the props, coffee shader, sky, stream and camera choreography. | A single source of truth for timing made audio sync free later. |
| 3. First frames | The face read clearly on the first try, but there were six visible defects (see §4). | First renders always reveal bugs. Render stills early and often. |
| 4. Client feedback #1 | "The cup seems a little too computer-generated and the handle looks off." | Realism comes from **imperfection**, not polish (see §5). |
| 5. Client feedback #2 | A detailed art-direction note: the typography was generic text placed over imagery, not part of the scene. | The biggest creative jump of the project came from this note. |
| 6. Client feedback #3 | "Won't the white text on that background cause contrast issues?" | Yes. Check text against the *actual* pixels behind it, not the palette. |
| 7. Audio | Score and effects rendered in 5 s. Measurements showed the effects were 20 dB too quiet and the low end too heavy. | Measure loudness **in the event windows**, not just overall. |
| 8. Final render | About 1.5 hours of CPU rendering. My time estimate was wrong by roughly 3× for the end-card frames. | Time your **most expensive** frame, not an average one. |
| 9. Delivery | The client said: "I just need the video." | **Ship the video first.** Extras come second. |

## 4. Corrections log (bugs and fixes)

| Problem seen | Root cause | Fix | Prevention habit |
|---|---|---|---|
| The creamer was missing from every shot | The spout-tip search started from the wrong sign (+1e9 vs −1e9), so the pitcher was placed about 10 km away | Corrected the initial value | Draw a debug marker at computed pivot points |
| Handle and stream looked like chrome | Triangle winding was reversed, so the surfaces were inside-out | Flipped the index order | Render each new mesh once with a plain grey material |
| Steam looked like rain streaks | The noise produced vertical columns | Switched to domain-warped "ridged" noise for curling filaments | Compare against a real reference photo |
| Coffee looked milky on one side | An environment reflection washed it out | Cut the coffee's reflection strength | Check legibility of the hero element under the final lighting |
| Greens looked pale sage, the image muddy | Too much ambient light and reflection | Less fill, a stronger key light | Check the darkest and lightest areas of every frame |
| The creamer read as a white blob | Its cream-coloured interior faced the camera | Made the interior light blue | Think about which surfaces the camera actually sees |
| Coffee beans cluttered the end card | Props were placed without checking the final framing | Removed them | Compose the **last frame first** |
| Changing the sun's position would break already-rendered frames | Light direction affected every shot | Split "visible sun" from "key light" | Know which frames depend on each setting before changing it |
| Pour sounds were inaudible | The effects sat 20 dB under the music | Raised the effects and ducked the music 2–3 dB under them | Measure loudness per event, then listen |

## 5. Feedback that changed the work

### "Too computer-generated"
What made it look CG was **perfection**. These fixes made it look real:
- A slightly out-of-round body and an uneven rim, so highlights wobble as they do on hand-thrown pottery.
- Throwing rings that vary in depth, and glaze that is lighter on ridges and darker where it pools.
- A pulled, flattened strap handle with flared joints instead of a round tube.
- A tall soft reflection that shows the cup's form.
- Contact shadows where objects touch, plus softer shadow edges.

### "Typography is generic"
The type went from captions on top of the picture to **objects inside the scene**:
- "Good morning." rises letter by letter from behind the horizon like the sun. The cup passes in front of it.
- The brand name and tagline are letterpressed into the table. Each word drops in with a shadow, lands on the beat with a "thunk", and sends a ripple through the coffee.
- A gold-foil mark and a swash catch the light.

**The principle:** words should obey the same light, space and physics as everything else in the shot.

### "White text contrast"
Pale text on a pale sunrise sky failed. The fix was also the more logical choice: a backlit object becomes a dark silhouette, just like the cup. Good fixes often make the idea more coherent, not just more legible.

## 6. Key insights

1. **Decide the visual direction in one sentence before building.** This project's was "Morning light, tactile type". Every later decision got easier.
2. **One clock for picture and sound.** Store all timings in one file, and sync comes for free.
3. **Deterministic rendering lets you fix only what changed.** Each frame is a pure function of its number, so I re-rendered only the opening and the end card instead of the whole film.
4. **Realism lives in imperfection.** Add wobble, variation, contact shadows and softness.
5. **Design the last frame first.** The end card is what people remember and screenshot.
6. **Measure what you cannot perceive.** I couldn't listen to the audio, so loudness meters, spectrograms and event-window checks did that job. A human listen is still required.
7. **Estimates must use the slowest frame.** Some frames cost three times more than others.
8. **Deliver the core output before the extras.** The client's real need was the MP4.

## 7. Struggles (honest)

- **Time estimates were wrong.** I quoted ~25 minutes based on average frames. The end card was about 3× slower, because it redrew large text textures every frame, so the client waited about 40 minutes.
- **Too much parallel work.** Rendering test stills while the main render ran slowed everything down.
- **Communication.** Long technical updates went to a client who mostly wanted to know: "Is it done, and when?"
- **I couldn't listen to or watch the film in real time.** Audio was verified by measurement and motion by frame sequences. That's a real limitation, and it should be stated plainly.

## 8. Repeatable playbook (faster next time)

| Step | Output | Time target |
|---|---|---|
| 1. Brief → one-sentence direction, palette, type, camera, motion character | Direction note | 15 min |
| 2. **Style frames:** render 3 key stills (opening, transformation, end card) | 3 approved frames | 1–2 h |
| 3. **Motion test:** low-res preview, every 4th frame | Preview MP4 for feedback | 30 min |
| 4. Audio in parallel, from the same timeline | Mix + stems | 1 h |
| 5. Time the slowest frame × frame count ÷ workers, plus a 30% buffer | An honest ETA | 5 min |
| 6. Full render, with no other heavy work on the machine | Frames | Machine time |
| 7. QA on the *encoded* file: resolution, fps, frame count, loudness, true peak, sample frames | QA check | 15 min |
| 8. **Deliver the video first**, then the extras | MP4 to the client | 5 min |

### Pre-render checklist
- [ ] The final frame is composed and approved
- [ ] All text passes a contrast check against its real background
- [ ] The hero element (here, the face) reads at phone size
- [ ] The slowest frame has been timed
- [ ] Audio levels have been checked in each event window
- [ ] No heavy jobs are running in parallel

## 9. Exercises for learners

1. **Imperfection pass:** take any clean 3D render and add three imperfections (shape wobble, surface variation, contact shadow). Compare before and after.
2. **Type in space:** take a title that sits on top of a video and redesign it so it obeys the scene's light or physics.
3. **Contrast audit:** screenshot five frames with text and measure the contrast of the text against the pixels behind it.
4. **Sync from one clock:** build a 5-second animation where every sound and visual event reads from one timing file.
5. **Estimate honestly:** time your slowest frame, predict the full render time, then compare with reality.
