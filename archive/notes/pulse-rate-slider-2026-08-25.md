# Pulse rate slider — 2026-08-25

Thomas: *"is there a way to add a slider to adjust the 'time' so that pulse
rate is easily toggleable?"* — asked right after the render-consistency fix
session, same day.

## What "pulse" meant before this

Four separate things animate on their own clock, previously all fixed-rate:

1. **Orb breath** — the "click me" scale/emissive pulse on orb (folded-
   cluster) nodes, period `ORB_PULSE_PERIOD_SECONDS` (2.6s), driven by a
   free-running `pulseClock` ref accumulated every frame in `useFrame`.
2. **Cross-border blink** — `tickPulseBlink(pulseClock.current)` in
   `linkVisuals.ts`, same clock.
3. **Beam flow** — the shader-driven flow highlight on continuous edges,
   `tickLinkFlow(pulseClock.current)`, same clock again.
4. **Travelling teardrop particles** — three-forcegraph's own built-in
   `linkDirectionalParticleSpeed`, a *per-edge* cadence already
   (`pulseSpeed(releasesPerYear)` in InfluenceGraph.tsx — annual releases
   crawl, daily ones stream) but with no *global* speed control on top of it.

All four were driven by real wall-clock time with no user-facing control.

## The fix

One new `ViewSettings.pulseRate` field (`lib/view.ts`), default `1` (100% —
the rate everything above was tuned at), range 0–4 shown as a percentage
slider in the View panel, same row style and pattern as Cluster
spread/Geo-affinity/Galaxy pull (`ViewControls.tsx`'s `SLIDERS` array).

Wired as a multiplier, read live off a ref (`pulseRateRef`) exactly the way
`geoAffinity`/`galaxy` already read their own live-tunable strength refs —
assigned during render (`pulseRateRef.current = view.pulseRate`), read
inside `useFrame` and inside a `forceGraph`-memo closure. Two call sites:

- `pulseClock.current += delta * pulseRateRef.current` — scales the orb
  breath, cross-border blink and beam flow together, since all three read
  the same clock.
- `.linkDirectionalParticleSpeed((l) => pulseSpeed(l.upstreamCadence) *
  pulseRateRef.current)` — scales the particle travel speed on top of its
  existing per-edge cadence. Confirmed via `three-forcegraph`'s own source
  (`updatePhotons()` in `node_modules/three-forcegraph/dist/three-forcegraph.js`)
  that this accessor is called *fresh every frame*, not baked in once — so a
  ref is sufficient here, no re-digest/reassignment effect needed the way
  `showPulses` toggling the particle *count* accessor needs one.

At `0` the multiplier makes `pulseClock` stop advancing and the particle
speed accessor return `0` — `three-forcegraph`'s own `progressRatio +=
particleSpeed` is safe with `particleSpeed === 0` (checked the source: no
divide, no special-case needed). Everything freezes exactly where it was,
still drawn — a different thing from the existing **Pulses** toggle, which
controls whether any of this draws at all.

No schema bump needed. `savedViews.ts`/`deepLink.ts` both merge a loaded
view over `DEFAULT_VIEW` (`{ ...DEFAULT_VIEW, ...(raw.view ?? {}) }`), which
is the file's own documented contract for exactly this case — an old save
or deep link simply picks up `pulseRate: 1` it never had an opinion on.

## Verification

- `tsc --noEmit` clean, run directly on the device VM.
- Full sandbox round (tar → cloud sandbox → fresh `npm install`): `npm run
  validate` clean, `npm run build` clean (953 modules, same ~1,493 kB
  bundle baseline).
- Live via Claude in Chrome: the **Pulse rate** slider renders in the View
  panel between Galaxy pull and the Lens row, reads "100%" by default and
  "off" at the floor, matching every other percentage slider's own
  convention. Functional check: set to 0%, zoomed on the same 200×100px
  screen region twice, 5 seconds apart — pixel-identical, confirming the
  freeze actually holds (a wiring mistake — e.g. forgetting the multiply,
  or reading a stale prop instead of the ref — would very likely NOT have
  produced an exact freeze). Set to 400% and back to 100% (default) before
  finishing, so Thomas's live dev tab wasn't left mid-test.

No open questions. Left at 100% default; Thomas can retune the 0–4 range in
`ViewControls.tsx`'s `SLIDERS` array if 4x turns out to be the wrong
ceiling once he's watched it awhile.
