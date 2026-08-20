# Pending project-memory entry — 2026-08-20

**Project memory (`project_memory_write`) was unavailable for all of
2026-08-20, re-confirmed unavailable later the same day.** This file is the
entry that should have been written. A session with working memory should
write it as `phase4-complete-and-render-bugs.md`, add the index line at the
bottom to `MEMORY.md`, and then delete this file.

## Addendum — flicker check result, later 2026-08-20

Thomas ran the one-minute bloom-flicker test from
`notes/flicker-tests-2026-08-19.md` (drag the glow slider to 0 while the
flicker is happening). His words: *"i think the flicker is gone."* Treat this
as a soft, unrepeated confirmation — not the same confidence level as the
measured numbers elsewhere in this project. Fold into HANDOFF.md §5 item 1:
bloom is now the leading/working diagnosis, next step is the bloom-pass fix
(raise the threshold / drop `mipmapBlur` / pin the bloom buffer to a fixed
resolution), and **if that fix doesn't actually stop the flicker, re-open
this diagnosis rather than assume it's settled** — do not let it calcify into
an unverified fact the way the git-status claim did (see `git-no-touch.md`).

Also: Thomas tried right-drag panning and the low end of the zoom slider
(HANDOFF item 2) with no complaint reported, but didn't give an explicit
yes/no either — worth one direct check before anything (e.g. item 9,
fly-through navigation) gets built on top of it.

## Addendum — layout path-dependence FIXED, later 2026-08-20

HANDOFF §5 item 6 (the top open agent-owed bug) is done. Write this as its
own memory entry, e.g. `layout-path-dependence-fixed-2026-08-20.md`, `type:
project`:

**What it was**: cold-starting at spread 10000% settled to a core radius of
240,508; ramping the same slider up to 10000% from a live session settled at
17,217 — factor of fourteen, identical final settings. Almost certainly
Thomas's "sometimes the cluster is a ball, sometimes it is oblong".

**Root cause**: `InfluenceGraph.tsx`'s `forceGraph` memo (deps `[graph,
spreadApplied]`) seeded every node from `lastPositions` on ANY rebuild. That
seeding exists for drilldown continuity (a tier toggle should keep nodes
where they were) but fired identically on a pure spread change, where `graph`
itself hadn't changed — so a spread change only ever nudged an
already-relaxed cloud under the new force parameters, never re-relaxed one
from scratch the way a cold load does.

**Fix**: a new `prevGraphForLayout` ref remembers the `graph` reference the
memo last ran with. When only `spreadApplied` changed (`graph` reference
identical), every seed path is skipped and the node falls through unseeded —
same as first load. Drilldown/tier/filter changes are untouched.

**Verified, not just built** — this is the part worth remembering as a
method, not just a result: built a temporary headless Playwright harness
(same recipe as `notes/camera-fit-measurement-2026-08-19.md` — `vite
preview` + Chromium with `--use-angle=swiftshader
--enable-unsafe-swiftshader`, sandbox copy only, deleted before shipping the
fix), pre-seeded `localStorage['rig.views.v1']` with a saved view at tier 4
(Everything) and the target spread so a cold load and a scripted slider drag
could both be driven headlessly, and added a temporary
`console.log('__FITDEBUG__', ...)` in `measureFit` to read the settled core
radius back out. **Ran the harness against the UNFIXED code FIRST** to
confirm it actually reproduces the bug before trusting it (cold 113,651 vs
ramped 20,034, ratio 5.67 — same qualitative bug as the original 14×
measurement, different exact numbers because of settle-window differences),
**then** against the fixed code (cold 113,650 vs ramped 113,307, ratio
1.003 — no meaningful path-dependence left). `npm run validate` (44/44
checks, 1250 reports/1079 dependencies) and `npm run build` (tsc + vite)
both clean before and after the change, on the real corpus, not a synthetic
one.

**Not done**: re-deriving `nodeScaleFor`'s cap (currently 2000) now that
cold and ramped agree — it was already comfortably above both numbers so
nothing broke, but it was tuned to clear the worst of a bug that no longer
exists in that form.

**Also still owed to memory, and still not written:** entries for the project
audit, visual Phases 2 / 3.5 / 4 in their own right, and the staged-corpus
cadence fix.

**Also needs CORRECTING in memory:** the existing entry
`camera-fit-density-risk-2026-08-19` is wrong on two counts — it says the camera
sits at ~2.8 × p95 (it is **5.675 ×**) and predicts a diffuse halo of edgeless
nodes after the mint (impossible; the shelf excludes edgeless nodes from the fit
before it is taken). Overwrite it from
`notes/camera-fit-measurement-2026-08-19.md`.

---

```
---
name: phase4-complete-and-render-bugs
description: Phase 4 finished (menu bar, Help/How-to, URL link, saved views, loading curtain); the node-scale cap bug and its re-derivation rule; the layout's path-dependence. Read before any renderer or slider work.
type: project
---

Session of 2026-08-19/20. Phase 4 of the visual revamp is **complete**. Live
corpus unchanged at 1,250 reports / 1,079 dependencies, 44 checks, tsc + build
clean throughout.

## Built
- **Menu bar** (`MenuBar.tsx`): six HUD panels hidden by default behind
  `Panels ▾`; tier bar and its status line deliberately NOT in the menu
  (primary navigation, and the only filter alarm).
- **Help** renders `START-HERE.md` imported raw (`?raw`) so the two can never
  drift; **How-to** re-opens the existing onboarding card via an `openRequest`
  counter prop.
- **Report `url`** on the selection card, shown as host.
- **Saved views** (`savedViews.ts`): tier + view + filter + selection + panels,
  versioned `schema: 1`, merged into defaults on restore. The **★
  `openOnLoad`** is the actual feature — read at MODULE scope so the starred
  state is the graph's first state and the 400-tick warmup runs once.
- **Loading curtain** (`LoadingCurtain.tsx`): opaque until
  `settledOnce && fitted`, with a 25s safety timeout. The timeout is the
  load-bearing part — a curtain that never lifts is worse than none.

## THE BUG TO REMEMBER: a silently binding cap
`nodeScaleFor`'s cap was 20, set as "twice what the corpus asks for" when
spread topped out at 375%. The ceilings moved the same evening and the cap bound
immediately: at spread 1000% with geo off the fit asks for **92.8** and got 20.
Nodes rendered at a fifth of intended size, and because `baseLinkWidth` is a
MULTIPLE of node scale, edges went four-fifths too thin at the same moment —
reported by Thomas as "the nodes and edges are nearly invisible". Bright pixels
4,284 → 21,248 after the fix.

**Standing rule now in the code: whenever a slider ceiling moves, recompute the
cap** — `cloudRadius × TARGET_LARGEST_FRACTION / MAX_BASE_RADIUS` at the new
extreme, then double it. That rule was written and then earned its keep within
the hour, when the spread ceiling went to 10000% and the cap had to go
200 → 2000.

Second half of the same bug: changing geo-affinity reheated the simulation but
**never re-fitted**, leaving node scale and camera tuned to the pre-change
cloud. Now debounced 300ms then `requestRefit()`.

## Measured facts worth not re-deriving
- **The camera can never end up inside the cluster by raising spread.** The fit
  frames p95 and sits at exactly `5.675 × p95` (= `1.18 / sin(FOV/2)`, FOV 24°).
  Failure needs `max/p95 > 5.675`; observed 1.5–2.1 everywhere including a
  simulated post-mint corpus.
- **Spread saturates**: 1000% → 10000% gives 2.7× core radius and 25% more
  nearest-neighbour air, not 10×.
- **The layout is PATH-DEPENDENT.** Cold-starting at spread 10000% settles at a
  core radius of 240,508; ramping the slider up to 10000% in a live session
  settles at 17,217 — factor of fourteen, identical settings. This is almost
  certainly Thomas's "sometimes the cluster is a ball, sometimes it is oblong".
  Unfixed; it is the top open bug.
- **Three of the four flicker suspects are cleared** by measurement (mesh
  recreation, orb breath, transparent-queue sort). Only bloom shimmer survives,
  and it needs Thomas's GPU. Side-finding: the in-code claim that flipping
  `material.transparent` forces a shader recompile is **FALSE** (688 materials
  flipped, programs 9 → 9, identical cache keys).

## Method notes that saved or cost real time
- Synthetic mouse drags do NOT reach OrbitControls — drive camera motion with
  the app's own `autoRotate`. A null result with `cameraMoved: 0` nearly
  shipped as "the sort is stable".
- `meshes.current` is untrustworthy for positions (documented trap, and it bit
  again) — read `graphData().nodes`.
- The menus close on `pointerdown`, not `click`, so `document.body.click()`
  does not dismiss them. Cost one false "apply is broken".
- Settle time is not optional in the harness: 16s of cooling understates the
  tail versus 45s.
```

---

## MEMORY.md index line to add

```
- [Phase 4 complete + two render bugs, 2026-08-20 — READ BEFORE RENDERER OR SLIDER WORK](phase4-complete-and-render-bugs.md) — menu bar, Help from START-HERE.md verbatim, saved views with an open-on-load star, loading curtain. **The bug to remember: `nodeScaleFor`'s cap silently binding cost node size AND edge width together — recompute it whenever a slider ceiling moves.** Also: the camera can never end up inside the cluster by raising spread (fit sits at exactly 5.675 × p95); spread saturates; and the layout is PATH-DEPENDENT — cold start vs ramped gives a 14× different cloud for identical settings, which is the "ball vs oblong" glitch.
```
