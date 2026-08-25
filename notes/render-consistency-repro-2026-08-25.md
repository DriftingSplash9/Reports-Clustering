# Render-consistency repro — 2026-08-25 (Cowork browser session)

Thomas asked how to chase down the render-consistency bug (HANDOFF §5 item 3:
"needs live instrumentation before touching it"). Rather than a PowerPoint of
manually-gathered screenshots, this session drove the live app directly via
Claude in Chrome (localhost:5173, Thomas's own dev server) and reproduced the
inconsistency cleanly. Findings below — no source code was changed.

## Repro: three fresh page loads, identical settings, three different results

Every reload below started from a hard navigate to `http://localhost:5173`
(not a soft nav), landed on the **1. GLOBAL** tier by default, and the View
panel read the *same* values every time: Cluster spread 200%, Geo-affinity
150%, Galaxy pull 100%, Distance haze 35%, Glow 55%, Zoom **"fit"**. Same
473-of-3,385 report count each time. Nothing else was touched before the
screenshot.

- **Reload A** — the cloud filled almost the entire frame; nodes were touching
  and overlapping each other edge-to-edge, exactly Thomas's "so big they are
  inside each other."
- **Reload B** — landed with the camera apparently *inside* the cluster: a few
  huge foreground nodes, edges radiating off all four sides of the frame, most
  of the corpus off-screen. Opening the View panel (no other interaction)
  caused it to snap to a small, sparse, properly-fit view a moment later.
- **Reload C** — same "camera inside the cluster" landing as B. This time
  opening the View panel did **not** trigger a correction. Clicking
  2. NATIONS then back to 1. GLOBAL didn't fix it either — the view stayed
  unfit through both tier switches.

**The Zoom slider read "fit" in all three cases, including the two that were
visibly not fit.** That label is not a reliable signal that `runFit` actually
reached its target — screenshots saved locally, ask if you want them moved
into `notes/`.

## What this rules in / out

- **Not a settings-persistence issue.** All three reloads had identical
  slider values from a cold load — Reset didn't change anything either. The
  variation is coming from the layout settle / camera-fit path itself, not
  from stale localStorage or a saved view.
- **Matches the existing suspect** — HANDOFF §5 item 3 already names
  `runFit`'s tracking pass and `cameraMovedOffFit` under `userOwnsCamera` as
  the open suspect. Nothing here contradicts that; if anything it strengthens
  it — the fact that opening the View panel "fixed" reload B but not reload C
  smells like a race between whatever re-triggers a fit (a resize/rerender
  from opening the panel) and `userOwnsCamera`/`cameraMovedOffFit` deciding
  the camera is already "owned" and skipping the fit.
- **No live instrumentation exists yet** to actually see the numbers —
  `runFit`/`measureFit`/`nodeScaleFor` don't log anything today, so this
  session can document the *symptom* precisely but not the *mechanism*.
  Confirms the HANDOFF item's own framing: someone needs to temporarily add
  `console.log` of the measured core radius, the resulting `nodeScale`, and
  the camera distance at each `runFit(...)` call (InfluenceGraph.tsx
  ~L1737–2070), then reload several times and diff the logs against which
  visual outcome came out. That's a 10-minute change + a few reloads, not a
  redesign — happy to do it if you want me to, since I already have the app
  open and instrumented reload loop going.

## Secondary bug caught for free

The console fired the DEV-only §7 tripwire during this session:

```
[layout] two fixed panels overlap — the §7 trap, live:
div [1755,44 190×707] div [1797,64 340×30]
```

That's the View panel overlapping something else at those coordinates, live,
in the current build — worth a look separately from the fit bug.

## Suggested next step

Two options, Thomas's call:
1. I add temporary `console.log`s to `runFit`/`measureFit`/`nodeScaleFor`,
   drive another 5-10 reloads, and report back the actual numbers — turns
   "camera-fit bug, needs live instrumentation" into an actual diagnosis.
2. Leave it here as a clean repro + hypothesis for you to instrument
   yourself when you're ready to sit with it.

Either way, no PowerPoint needed — the browser tools can drive the same
comparison faster and more precisely than manual screenshot-gathering.

## Addendum — instrumented, 2026-08-25 (same session, second pass)

Thomas: "add the console.log and have at it." Added temporary `console.log`
+ `window.__fitdebug` instrumentation to `nodeScaleFor`, `runFit`, the tick
loop's tracking-check branch, and the mount-fit branch in
`InfluenceGraph.tsx`, reloaded repeatedly, read the numbers back live via
Claude in Chrome's JS execution, then **reverted all of it** — the file is
back to the clean baseline (diffed against a pre-edit backup to confirm).
No permanent code change was made.

### Finding 1 — `onEngineStop`'s fit call has no warmup gate (hard evidence)

Captured directly from a live reload:

```json
[
  {"t":"runFit","moveCamera":true,"nodeRadius":67,"distance":378,"tick":0,"userOwnsCamera":false},
  {"t":"nodeScaleFor","cloudRadius":67,"wanted":0.22}
]
```

That's the *only* `runFit` call this particular load ever logged, and it
came from `forceGraph.onEngineStop(...)` (~line 1618-1630), **not** the tick
loop's own mount-fit path (~line 2606-2620). The tick-loop's mount fit is
deliberately gated behind `MIN_TICKS_BEFORE_FIRST_PAINT` (30 ticks) for
exactly the reason the file's own comment gives: "three-forcegraph starts
every node near the origin, so fitting at tick 0 would frame a
near-zero-radius point and put the camera inside it." `nodeRadius: 67` here
*is* that near-zero-radius point — real settled clouds run to thousands of
units (see `camera-fit-density-risk-2026-08-19.md`: p95 ≈ 3,072-3,134 at
Everything tier). `onEngineStop` calls `runFit(!userOwnsCamera.current)`
directly, with no equivalent gate, and it fires whenever three-forcegraph's
own internal digest decides the sim has converged — which per this file's
own comment (~line 1594-1602) happens **asynchronously, on the library's own
schedule**, independent of our tick counter. If that fires before the cloud
has actually expanded, the camera gets snapped in close (`distance: 378` for
a radius-67 cloud) and `settledOnce.current` gets permanently set `true`.

That matters beyond the one bad fit: the tracking-window condition
(`settleClock <= REFIT_WINDOW_SECONDS || !settledOnce`) only keeps
re-fitting past the flat 12-second `REFIT_WINDOW_SECONDS` while `settledOnce`
is still false. A premature `onEngineStop` removes that safety extension
immediately — so if the real layout takes longer than 12s to expand to its
true rest size (very plausible for a 473+-node cloud with repulsion), the
periodic re-fit can stop *before* the camera and `nodeScale` ever catch up
to the cloud's true size, freezing the view on a too-close, too-small
mid-expansion snapshot. That reads exactly like "camera inside the cluster"
and "nodes are so big they're inside each other" — the camera is frozen too
close for a cloud that kept growing underneath it.

### Finding 2 — background-tab throttling stops the whole tracking system

On a later reload, instrumentation at the very top of the `useFrame`
callback (before try/catch) never fired at all — not once in 30+ seconds —
while `document.visibilityState` read `"hidden"` and `document.hasFocus()`
read `false`. Chrome suspends `requestAnimationFrame` entirely for a
backgrounded tab, and this file's entire tick-loop-driven fit/tracking
system (mount fit, the 12s window, `cameraMovedOffFit`) is built on
`useFrame`, i.e. on rAF. **While the tab is hidden, none of it runs at
all** — only `onEngineStop`'s async, non-rAF-gated fit can still land.

Caveat: this particular observation may partly be an artifact of my own
browser-automation session losing tab focus mid-test, not something proven
to happen in Thomas's own hands-on-keyboard usage. But it's a completely
ordinary thing to do while a page is visibly "Settling 3,385 reports into
place" for anywhere from ~10 to ~30+ seconds (settle time itself varied
that much across reloads this session) — tab away to check something else,
come back. If that happens, and `onEngineStop` fired prematurely while
backgrounded (finding 1), the camera comes back exactly where that one bad
fit left it, with no further correction, because the corrective tick loop
never got to run.

### Combined picture (still a hypothesis, not fully proven)

1. `onEngineStop` can fire before the cloud has expanded, snapping the
   camera in close and marking `settledOnce = true` early.
2. If the tab is backgrounded (or the tick loop is otherwise starved) during
   the real expansion, the periodic re-fit that would normally correct this
   doesn't get to run.
3. The result: camera and `nodeScale` frozen on a near-origin snapshot while
   the actual node positions (driven by three-forcegraph's own async digest,
   independent of `useFrame`) keep evolving underneath — producing the
   "camera inside the cluster" / "everything huge and overlapping" view.
4. Some reloads never hit step 1 badly, or the tab stays foregrounded
   through the full settle, and the view comes out fine — matching the
   inconsistency Thomas is seeing rather than a bug that fires every time.

### Two candidate fixes, not applied — Thomas's call

- **Gate `onEngineStop`'s fit the same way the tick loop's mount fit is
  gated** — don't let it move the camera or set `settledOnce = true` until
  `tickCount.current >= MIN_TICKS_BEFORE_FIRST_PAINT` (or some real-time
  minimum). Keeps the "authoritative fit on real convergence" behaviour the
  comment describes, without letting it fire on a not-yet-expanded cloud.
- **Make the tracking window resilient to a backgrounded tab** — pause
  `settleClock`/`sinceRefit` accumulation while `document.visibilityState`
  is `"hidden"`, and/or call `requestRefit()` on the `visibilitychange`
  event when the tab becomes visible again, so coming back to the tab always
  gets a fresh, correct fit rather than whatever the tick loop last managed
  before being suspended.

Neither was implemented — this is diagnosis only, per the "have at it on
the logging, don't touch the actual fix without saying so" framing of this
session. Full instrumentation code (for whoever picks this up) is described
above precisely enough to reproduce; nothing was left in the working tree.

## Third pass — fixes shipped, 2026-08-25 (same session, Thomas: "fix them all as you find them please")

Both candidate fixes from the addendum above landed in `InfluenceGraph.tsx`.
Also traced *why* Finding 1 happens, one level deeper than the addendum got:
read `three-forcegraph`'s own source
(`node_modules/three-forcegraph/dist/three-forcegraph.js`, `tickFrame`'s
inner `layoutTick()`). Its stop condition is:

```js
if (++state.cntTicks > state.cooldownTicks
    || new Date() - state.startTickTime > state.cooldownTime
    || (isD3Sim && state.d3AlphaMin > 0 && state.d3ForceLayout.alpha() < state.d3AlphaMin)) {
  state.engineRunning = false
  state.onEngineStop()
}
```

checked **before** ticking, on every call. The wall-clock branch
(`cooldownTime`, 45s here) fires regardless of how many real ticks have run —
so on a slow cold load, or after a long tab-background gap, it can trip
before this session's `useFrame` loop ever called `tickFrame()` a single
time. The library then reports "converged" for a cloud still sitting at its
origin-seeded radius. That is exactly the `tick: 0` / `nodeRadius: 67`
capture above — not alpha decaying fast, the ceiling firing before any real
work happened. (Confirmed via `three-forcegraph`'s Kapsule internals too:
its own `digest()` is `debounce`d by 1ms — "runs asynchronously relative to
construction," per the file's own pre-existing comment on `useFrame` — and
`engineRunning` defaults `false` until that debounced digest actually runs,
which is consistent with everything observed.)

### Fix 1 — `onEngineStop` no longer trusts an early stop

```js
if (tickCount.current < MIN_TICKS_BEFORE_FIRST_PAINT && reheatAttempts.current < MAX_PREMATURE_REHEATS) {
  reheatAttempts.current += 1
  forceGraph.d3ReheatSimulation()
  return
}
settledOnce.current = true
runFit(!userOwnsCamera.current)
```

`tickCount.current` is *our own* count of real `tickFrame()` calls driven by
`useFrame` — the thing the library's wall-clock ceiling doesn't check. Below
`MIN_TICKS_BEFORE_FIRST_PAINT` (the same 30 the mount fit already waits for),
an "engine stopped" report is almost certainly the ceiling talking, not
convergence — so instead of snapping the camera and permanently marking
`settledOnce`, it calls `d3ReheatSimulation()` (the library's own public
reset: alpha back to 1, countdown restarted) and waits for the next real
stop. Capped at `MAX_PREMATURE_REHEATS` (5) so a graph that genuinely can't
get there in a few reheats doesn't loop forever — it falls through and
accepts whatever `onEngineStop` reports after that.

Reasoned through the case this could regress: a tiny filtered view (a
handful of nodes) that genuinely, physically converges in well under 30
ticks. It doesn't misbehave — `tickCount.current` keeps climbing across
every reheat (it isn't reset by a reheat, only by a full `forceGraph`
rebuild), so a fast-converging graph just crosses the 30-tick line a couple
of reheat cycles sooner than a slow one and gets its fit then. Worst case is
a few hundred milliseconds of extra settle time on an already-tiny view, not
a wrong result.

### Fix 2 — tracking survives a backgrounded tab

Two changes. First, `settleClock`/`sinceRefit` now accumulate a delta
clamped to `MAX_FRAME_DELTA_SECONDS` (0.5s), not the raw `useFrame` delta —
unclamped, the first frame after a background gap hands those clocks the
*entire* hidden duration in one jump, which could end the 12-second tracking
window on the exact frame tracking was needed most. Second, a new
`visibilitychange` listener calls `requestRefit()` when the tab becomes
visible again — but only when `!settledOnce.current && !userOwnsCamera.current`,
so it only kicks in mid-settle and never wrestles the camera away from a
view assembled deliberately, then merely alt-tabbed away from.

### Verification

- `tsc --noEmit` clean, run directly on the device VM (this file has no
  `vite`/`esbuild` dependency, so the win32-binary sandbox mismatch noted
  elsewhere in project memory doesn't apply to a type-check).
- Full sandbox round (tar → cloud sandbox → fresh `npm install`): `npm run
  validate` clean, `npm run build` clean — 3,385 reports / 2,596
  dependencies, 953 modules transformed, ~1,493 kB bundle (matches the known
  baseline).
- Four consecutive cold reloads of Global tier via Claude in Chrome all
  landed correctly and near-identically fit — the exact test from the first
  pass above, which previously produced 3 different results, 2 visibly
  broken (oversized/overlapping, camera-inside-cluster). A Nations → Global
  tier round-trip also came out clean, no console errors from the app
  itself.
- **Could not force-trigger either raw failure mode live**, to directly
  watch the reheat/refit paths fire rather than infer they would. Tried
  backgrounding the tab (opened a second tab, waited 20s, closed it) and
  found `document.visibilityState` reads `"hidden"` for this session's tab
  throughout — even before backgrounding it deliberately — while the app
  kept rendering and settling correctly regardless, meaning this particular
  sandbox's `requestAnimationFrame` does not actually suspend the way a real
  backgrounded Chrome tab does (unlike the second pass above, where the same
  check genuinely caught zero ticks in 30+s — that was a real background
  state, this sandbox's Page Visibility reporting just isn't trustworthy as
  a *trigger* signal here, only as something the code should be robust
  against). The fix is correct against the traced library source and by the
  reload evidence, but a real cold-load / real tab-away test on Thomas's own
  machine is the one check this session couldn't perform for him.

Working tree has the fix, not a revert this time — these two changes are
meant to stay. `HANDOFF.md` §5 item 3 carries the same summary.
