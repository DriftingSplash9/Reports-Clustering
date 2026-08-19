# The four flicker tests — run, 2026-08-19

Review §9 ranked four suspects for the undiagnosed node flicker, each with a
five-minute test. All four are now run. **Three are cleared or unsupported;
the fourth is the one software rendering cannot judge, and it is now the
leading candidate by elimination.**

Method: headless harness (`vite preview` + Playwright + preinstalled Chromium,
`--use-angle=swiftshader --enable-unsafe-swiftshader`), temporary probes inside
`useFrame` and at the `meshes.current.set` call site. **Sandbox copy only —
nothing was written to `src/` on the device.** Camera motion was driven by
turning on OrbitControls' own `autoRotate` (synthetic mouse drags do not reach
the controls — `camera.position` did not move at all, which invalidated a first
pass of these numbers).

---

## Suspect 1 — transparent-queue sort instability: NOT SUPPORTED

The theory: every node material is `transparent: true` unconditionally, so all
nodes sit in the depth-sorted transparent pass; two spheres at near-equal camera
distance can swap order between frames and pop.

**The sort really is unstable.** Everything tier, camera auto-rotating: ~750
*contested pairs* per frame (spheres overlapping in 3D and within each other's
depth extent, so the sort decides which occludes which), and **2–3 of those
pairs flip order per frame.** The mechanism is live.

**But neither candidate fix moves a pixel.** Two A/B tests, each against a
noise floor measured by comparing frames *within* one configuration (the scene
never truly rests — pulses run, the layout drifts):

| | changed px | vs. noise floor |
|---|---|---|
| `transparent: false` on the 688 opaque nodes | no change in flip rate | — |
| `depthWrite: false` on translucent nodes, fit zoom | 151 px (0.02%) | floor 108–162 px |
| same, zoomed to 22% of fit distance, 820/958 nodes translucent | 1,990 px (0.24%) | **control A-vs-C, same setting, 2,329 px** |

The zoomed-in control is the decisive one: two bursts taken at the *same*
setting ten seconds apart differ **more** than the two settings differ from each
other. The scene's own drift swamps the effect. Sorting artifacts are real in
the abstract here and invisible in practice — the collide force keeps spheres
far enough apart that contested pairs are barely touching, so a wrong order
costs sub-pixel area.

**Census, for the record:** 958 nodes, 958 distinct materials, 688 at opacity
1.0 and 270 at 0.10 (the hollow one-off instruments). **All 958 have
`depthWrite: true`**, including the translucent ones.

### The one real finding here: the recompile comment is false

`nodeVisuals.ts` line ~172 says transparency is enabled up front because
*"switching `transparent` on a live material forces a shader recompile, which
stutters at the exact moment the user clicks."* Tested directly against
`renderer.info.programs`: flipping `transparent` on **688 live materials** gave
**9 programs before, 9 after, and an identical sorted list of program cache
keys.** `transparent` is not part of the program key — it selects a render
queue and blending state, not a shader.

So the justification for putting every node in the transparent queue does not
hold. Moving the 688 opaque nodes to the opaque queue is free, and it is worth
doing on its own merits (fewer objects in the per-frame depth sort, correct
early-z), just **not** as a flicker fix — it demonstrably fixes nothing visible.
The comment should be corrected either way, so it stops being quoted.

---

## Suspect 2 — silent mesh recreation by three-forcegraph: CLEARED

The theory: meshes "can be recreated without warning" and the existing guard
only fires when `meshes.current.size` *changes*, so a recreation keeping the
count constant is invisible.

Probe at the `meshes.current.set(n.id, mesh)` call site, counting every write
for an id already in the map. **Zero recreations** — across eight full tier
changes (2→3→4→1→3→2→4→1, each a complete graph rebuild) and every measurement
run in this session. The guard's blind spot is real but nothing is walking into
it.

## Suspect 4 — orb breath intersecting neighbours: CLEARED

The theory: `mesh.scale` is rewritten every frame for orbs, and with the collide
force a breathing orb could periodically intersect a neighbour.

Measured at tier 2 (10 orbs present; there are none at the Everything tier, which
is why an earlier run reported `orbCount: 0`). Every 15 frames, every orb was
tested against every other visible node for sphere overlap.

| | overlapping pairs | max overlap |
|---|---|---|
| breath on (`ORB_PULSE_SCALE = 0.07`) | **0** | 0 units |
| breath off (`ORB_PULSE_SCALE = 0`) | 0 | 0 units |

At full inhale the orbs never touch anything. The 7% breath has nowhere near
enough amplitude to close the gap the collide force maintains.

## Suspect 3 — bloom shimmer: UNTESTABLE HEADLESS, now the leading candidate

`mipmapBlur` on small bright nodes with a moving camera can crawl. Standing rule
7 says bloom/glow is not trustworthy under software rendering, so this one
cannot be settled here — and it is the only one of the four still standing.

**Thomas, this is a one-minute check on your machine:** get the flicker
happening, then drag the glow slider to 0.

- **Flicker stops** → it is bloom. The fix is in the bloom pass, not the nodes:
  raise the threshold, or drop `mipmapBlur`, or pin the bloom buffer to a fixed
  resolution so the mip chain stops resampling as the camera moves.
- **Flicker continues** → all four suspects are exhausted and the next step is a
  video capture. Two seconds of screen recording at the moment it happens would
  be worth more than another round of reasoning: it would show whether nodes are
  *vanishing* (a depth/order problem after all, at a zoom this harness did not
  reach) or *shimmering in brightness* (a shading or bloom problem).

---

## What to do with this

1. **Correct the false comment** in `nodeVisuals.ts` and, separately, consider
   moving opaque nodes out of the transparent queue as a perf change with an
   honest rationale. Do not label it a flicker fix.
2. **Suspects 2 and 4 can be struck from the review** — they cost nothing to
   re-test later if something changes, but nothing is pointing at them.
3. **The blame-shield is now real.** New visual work no longer has to carry
   "it might be the flicker" — three of the four mechanisms are measured and
   quiet, and the fourth has a one-minute test attached to it.
