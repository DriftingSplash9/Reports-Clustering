# Handoff — drilldown camera fix (§3a resolved, §3b/§3c closed by Thomas)

Written 2026-08-12, following on from `HANDOFF-2026-08-12.md`. Read that one first
for the drilldown feature's design and the state it was left in. This file covers
only what changed after it.

Do not run git in this folder (standing rule).

**Status: §3a fixed and verified. §3b and §3c need no code — Thomas answered both.
One file changed (`src/components/InfluenceGraph.tsx`), already written to disk.**

---

## 1. Thomas's answers — §3b and §3c are closed, and neither needs code

Asked directly, per the previous handoff's recommendation. Both answers reduce
scope rather than expand it.

**§3c — flat vs tree: flat stays.** He picked "Flat is fine". One orb per family,
opening a rung reveals everything at that rung across the whole family, no
per-branch state. The re-architecture of `hierarchy.ts` described in the previous
handoff's §3c option 2 is **not wanted** and should not be built. `Drilldown`
stays `Partial<Record<ColourFamily, number>>`.

**§3b — two rungs per click: withdrawn.** His words: *"i think we missunderstood or
i was mistaken. What i want is a double click goes down one level and opens
everything at that level, no skipping."*

That is exactly what `toggleDrilldown` already does —
`Math.min(depth + 1, ladder.length)` at `hierarchy.ts:230`. Verified by reading it,
not assumed. **No change was made to `hierarchy.ts` and none is needed.** If a
future session sees the previous handoff's suggested `depth + 2` edit, ignore it;
it was written before Thomas clarified, and applying it would break what he asked
for.

So his original message quoted in §3 of the previous handoff was, as that handoff
guessed at reading 1, describing current behaviour as context — not reporting a
second and third defect. Only the camera complaint was a real bug.

---

## 2. §3a — the camera bug: confirmed, and worse than "snaps back"

The previous handoff's diagnosis was correct in mechanism and understated in
severity. `runFit()` unconditionally does `camera.position.set(...)` and
`orbit.target.copy(...)`; the tracking re-fit calls it every
`REFIT_INTERVAL_SECONDS` (0.2s) for `REFIT_WINDOW_SECONDS` (12s) after every
rebuild. It has no idea the user exists.

Measured against `npm run dev`, refit window open:

| | before | after |
|---|---|---|
| drag-orbit, angle reached off the fit axis | **0.8°** | **69.3°** |
| ...and 5s later | 0.2° | 70.7° |
| scroll-zoom, camera distance | **1135 → 1135 → 1135** | 1135 → **834 → 834** |
| periodic re-fits still firing while idle | 9 per 4s | 9 per 4s |

So it was not merely snapping back after the fact — with the window open the user
could not move the camera **at all**. Every input was erased within a fifth of a
second of being made. "Terribly buggy" was a fair description.

### 2a. The sandbox could not reproduce this on its own — read this before testing

This matters more than the fix itself for anyone testing here later.

Under SwiftShader the scene runs at ~2-3 ticks/second. `MIN_TICKS_BEFORE_FIRST_PAINT`
is 30 ticks, so the `!fitted.current` branch alone consumes **~11 of the 12-second
window**, and by the time `fitted` flips true `settleClock` has already passed
`REFIT_WINDOW_SECONDS`. The periodic re-fit branch therefore **never executes once**
in this sandbox — instrumented and confirmed, `refitCount` stayed at 0 through a
full natural reproduction attempt.

On Thomas's GPU, 30 ticks is about half a second, so the branch runs ~60 times per
toggle. **The sandbox is not merely slower here; it takes a different code path.**
A clean pass in this environment says nothing about that branch.

The way round it: expose the refs on a temporary `window.__debugIG` hook and have
the test set `fitted.current = true; settleClock.current = 0` to force the window
open, holding it open with a `setInterval` so it cannot expire mid-measurement.
Both probes are in `/tmp/pw/` in the session that wrote this (`refit.mjs`,
`scenario.mjs`) and are worth rewriting rather than recovering.

Second technique worth reusing: **measure the angle off the +Z axis from the orbit
target, not raw camera position delta.** `runFit` always parks the camera at
`centre + (0,0,distance)`, so that angle is zero after any fit and non-zero after
any orbit-drag. Position delta is useless here because OrbitControls damping keeps
the camera drifting for a second after input ends, which reads identically to being
dragged back.

## 3. The fix

All in `src/components/InfluenceGraph.tsx`. Roughly 40 lines of logic, the rest
comments.

**The fit yields the camera but keeps measuring.** `runFit` takes a new
`moveCamera` parameter. When false it computes everything as before — node scale,
the fog cloud, `onBounds`, and `fitState` — and simply skips the `camera.position`
/ `orbit.target` writes.

That split is the part worth defending. Skipping `runFit` outright would have been
the obvious fix and would have introduced a nastier bug than the one it cured:
`fitState` is where **Reset** flies back to, so it would have been left describing
the cloud as it was *before* the level opened. A user who drags during the settle,
loses the graph off-frame, and hits Reset — the one escape hatch — would have been
sent to the wrong place. Verified explicitly: after opening the EU orb (193
members) and dragging, Reset frames the expanded cloud at distance 4454, not the
pre-open 1133.

**Detecting that the user took the camera** uses two mechanisms, because neither
covers everything:

1. **OrbitControls gesture events.** `start` / `end` bracket every gesture; `change`
   between them means the camera actually moved. Covers drag, wheel, pan, touch.
   Two guards make it precise: `applyingFit` brackets our own camera writes so the
   `change` that `orbit.update()` emits is not counted (without it, *holding the
   mouse down on a node to select it* would stop tracking), and requiring an actual
   `change` means a click that does not move the camera is not treated as input.
   Immune to auto-orbit, which raises no gesture.
2. **`cameraMovedOffFit()`, a pose diff.** The zoom slider (`CameraZoom.tsx`) and
   the search fly-to both write the camera directly and raise no gesture. This
   compares *distance from target* and *target position* against what `runFit` last
   set, at 0.5% tolerance. Deliberately not raw position: auto-orbit changes
   position every frame while holding both of these exactly constant, so this stays
   quiet for it. Pure orbit-dragging also holds both constant — which is what
   mechanism 1 is for. Each covers the other's blind spot.

**Scope of the yield.** Once `userOwnsCamera` is set, the camera is left alone
until the next rebuild, and a rebuild is always something the user just did. The
periodic fit, `onEngineStop`'s fit, and every rebuild's first fit all respect it.

**One exception, on purpose:** the very first fit of the *session* always moves the
camera (`everFitted`, which unlike `fitted` is never reset on rebuild). That is the
fit that puts the graph in front of the viewer at load; there is no earlier view
worth preserving, and letting a stray gesture suppress it would open to a camera
pointed at nothing. Every later rebuild's first fit yields normally — that branch,
not the periodic one, is what runs in the half-second right after a toggle, and
leaving it unguarded left a real hole: before this guard was added the camera was
still being yanked from 1133 to 4390 during exactly the drag Thomas complained
about.

## 4. §2's tick-race try/catch — investigated, not masking anything

The previous handoff flagged the `try/catch` around `tickFrame()` as possibly
hiding a repeating fault. Instrumented with a counter across a full session (mount,
four drilldown toggles, a Reset, sustained dragging): **it fired 4 times total,
once per `forceGraph` rebuild.** That is the one-frame Kapsule digest race it was
written for, behaving exactly as documented. No evidence of a repeat or a masked
second fault. Leaving it as is.

## 5. Verification

- `tsc --noEmit` clean, `npm run build` clean, `npm run validate` exit 0.
- Instrumentation fully stripped — `grep -rn "__debugIG" src/` returns nothing.
  Check this again before calling any future pass done.
- Headless Chromium against **`npm run dev`** (Strict Mode on), both the forced-
  window probe and an end-to-end scenario: open the EU orb, drag immediately,
  confirm the camera holds, Reset, three more toggles. Zero console or page errors.
- Node counts moved as expected (8 orbs → 46 nodes on opening EU), so the
  drilldown itself is unaffected.

**Not verified:** real-hardware feel. Everything above establishes the mechanism is
correct; it cannot establish that 12 seconds of tracking at 60fps looks right to
Thomas. If he reports the camera now feels *unhelpfully* static after a toggle —
the opposite complaint — the dial is `REFIT_WINDOW_SECONDS`, not the guard.

## 6. Open, in rough priority order

1. **Thomas's live read of the fix.** Everything else waits on this.
2. **The isolated-nodes shelf and the rest of the drilldown UI** — untouched this
   session, still as described in the previous handoff.
3. **The five documented-but-unranked priorities** in
   `HANDOFF-2026-08-11-release-schedules-complete.md`. Unchanged.
