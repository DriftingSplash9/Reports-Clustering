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

## Addendum — the mint is DONE, later still 2026-08-20

HANDOFF §5 item 5 (mint the staged archive) is done, and it's the biggest
single addendum in this file. Write it as its own memory entry, e.g.
`grok-archive-minted-2026-08-20.md`, `type: project`:

**Result**: 1,250 → **3,091 reports**, 1,079 → **2,070 dependencies**.
`npm run validate` and `npm run build` both exit 0 on the merged corpus.

**check-urls, run by Thomas on his own machine** (sandbox egress blocks some
hosts, this can't run here): 1,972 checked, 832 flagged dead, but investigation
found most of that is the checker's plain HTTP client tripping bot-walls
(403s) or hitting TLS-trust issues (Russian govt sites use a domestic CA) —
NOT real link rot. Spot-checked BPS Indonesia, IBGE Brazil, INE Uruguay/Chile
through a real browser-fetch; all load fine. Only **37 were genuine 404s**
(18 of those are one problem: singstat.gov.sg restructured its URL scheme).
Thomas's call: keep the report, flag the URL as stale, don't drop anything.
No schema field exists for "stale URL" — tracked instead in
`notes/stale-urls-2026-08-20.md` until either a field gets added or each one
gets re-researched.

**Geography-as-a-node turned out to be two problems.** MX/AR had ~25 places
(a state, a city) modeled as fake report nodes ("Chiapas — core statistical
identity", url = a generic institutional homepage). 12 OTHER country files
had the same trick played with institutions instead of places (central banks,
stats offices) — mostly self-flagged in each staged file's own
`_gaps.institution_node_candidates`, which is how they were caught rather than
guessed at. All ~53 excluded from the mint. One (`bo-ypfb`) was independently
flagged already in the LIVE corpus's own dropped-notes for `bo-national-core`,
which is also how a second thing got caught: a new edge
(`bo-alfabetismo → bo-educacion`) repeated a claim already rejected once for
weak evidence — dropped rather than let it quietly reappear via the new
import. **Method worth repeating**: cross-check every candidate new edge
against the live corpus's existing `_dropped` notes before merging, not just
against duplicate ids — a `_dropped` note is a considered decision and a
silent re-add defeats the point of writing it down.

**Live-wins applied uniformly**, not just to the 4 named duplicate ids
(`in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`,
`ru-cbr-monetary-policy-guidelines`) — every id already in the live corpus
was skipped in favour of the existing copy, everywhere, which is what made
AE/AR/BO's ~112 collisions resolve themselves for free. RBI `external-sector`
tag grafted onto the live `in-rbi-balance-of-payments` per the HANDOFF note.

**Unanticipated fixes found along the way, all mechanical once found**: 132
reports had `jurisdiction_level: international` but kept a specific country
code instead of `INT` — an existing validator rule (`graph.ts`), not a new
one, just never tripped by data this size before. 21 dependency edges were
containment relationships mis-modeled as dependencies (a national aggregate
"depending on" its own sub-item) — dropped, since `part_of` already expresses
it and the validator rejects the same relationship expressed twice. 40 edges
carried a free-text `reference_period` ("continuous", "quarterly / ongoing")
where the schema wants a structured object — stripped the field rather than
invent `readings_per_year`/`window_months`/`ends` from prose.

**Palette re-damped, same session** (Thomas: "do it now"). Corpus shares
inverted exactly as `palette.ts`'s v3 note warned they would: ASIA 4.0% →
28.5% (now the largest family), SA 9.3% → 21.9%, AFR 32.2% → 15.3% (was
largest, now third), EU/US/CA all fell to 4–6%. New tiers: ASIA/SA (≥20%) 55%
chroma, AFR (15.3%) 75%, EU/US/CA/IN (3–7%) 90%, everything under 3% stays
full (unchanged). Applied as a straight per-family chroma multiplier in OKLCH
space — hue and L held fixed, only C scaled, computed from each family's
existing hex via a from-scratch OKLab/OKLCH conversion (no colour library
was available in the sandbox). See `palette.ts`'s v4 docstring for the full
numbers and reasoning.

**Camera-fit re-measured**, same recipe as the path-dependence harness
(`vite preview` + headless Chromium, temporary `__FITDEBUG2__` console log in
`measureFit`, stripped before shipping): 1,806 framed nodes now (up from 958),
furthest/p95 ratio **1.38×** — comfortably inside the 5.675× failure line,
and actually a *better* margin than pre-mint despite nearly double the framed
nodes. The palette's colour-balance shift does not touch this ratio; they are
independent axes (colour vs geometry) that both happened to move the same
session.

**Not done**: the stale-url list is written but not wired into anything the
app reads (no schema field); re-deriving `nodeScaleFor`'s cap again wasn't
needed (comfortably above the new numbers too, per the pre-mint fix's own
margin).

---

## MEMORY.md index line to add

```
- [Phase 4 complete + two render bugs, 2026-08-20 — READ BEFORE RENDERER OR SLIDER WORK](phase4-complete-and-render-bugs.md) — menu bar, Help from START-HERE.md verbatim, saved views with an open-on-load star, loading curtain. **The bug to remember: `nodeScaleFor`'s cap silently binding cost node size AND edge width together — recompute it whenever a slider ceiling moves.** Also: the camera can never end up inside the cluster by raising spread (fit sits at exactly 5.675 × p95); spread saturates; and the layout is PATH-DEPENDENT — cold start vs ramped gives a 14× different cloud for identical settings, which is the "ball vs oblong" glitch.
```
