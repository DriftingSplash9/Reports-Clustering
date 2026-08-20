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

## Addendum — the per-country fold, still 2026-08-20 (later, after the mint)

Intended as its own future memory entry, `country-fold-2026-08-20.md`,
`type: project`.

Thomas ran the just-shipped mint on his own machine and sent nine screenshots:
every tier but "1. Global" was, in his words, *"a literal cluster fuck... we
need a cap at a certain number of nodes... when we had 1250 nodes it was
already too dense... in hindsight I should have known this would happen at
3000."* He floated splitting the graph into per-continent "galaxy" scenes
(the Milky Way/Andromeda image) as one option among others, then said he was
half asleep and just wanted ideas.

**Diagnosed before proposing anything**, by actually counting the merged
corpus rather than guessing: tier 1 (Global) is 396 reports — fine, matches
his screenshot. Tier 2 (Nations, cumulative) jumps to **2,467 — 84% of the
whole 3,073-report corpus** — because 2,071 of those are `federal`-level and
spread across **139 distinct countries**. Tier 3 (States): 2,873. Tier 4
(Everything): 3,073. So every tier past Global was, in practice, "show almost
the whole corpus," regardless of which button was pressed — not a bug in the
mint, but the 2026-08-12 tier design (built and tuned against a ~728-report,
few-dozen-country corpus) meeting a country count it was never built to
handle.

**Presented four options before writing any code** (Thomas explicitly asked
for ideas, said he was "half asleep," so this was a discussion turn, not an
implementation turn): (1) a per-country fold — reuse the existing family-orb
mechanism, add country as a second grouping key; (2) a blunt authority-based
node cap/LOD, independent of tiers; (3) full per-continent/economic-region
"galaxy" scenes — literally Thomas's own image, biggest lift, replaces the
one-scene-one-drilldown architecture rather than extending it; (4) a lighter
middle path — keep one scene, lean harder on `geoAffinity` and country-orb
seed positions so regions read as galaxies without a rewrite. Recommended
(1) first regardless of long-term direction, since it's small, reuses tested
code, and would show whether the itch is even still there afterward. Thomas
picked (1): *"I think 1 is a good idea, assuming i understand correctly."*

**What shipped**, all in the same per-country-fold change: `src/lib/hierarchy.ts`
gained a second, independent fold axis. The existing tier ladder still folds
a report into its family orb (`orb:${family}`) when its own tier isn't
globally open — unchanged, still global by design (Thomas, 2026-08-12: "depth
is a property of the view, not of a country"). NEW: once a tier IS open (tier
2+), a report additionally folds into a per-country orb (`corb:${country}`,
namespaced apart from `orb:` so `isFamilyOrbId`/`isCountryOrbId` can tell them
apart while the existing broad `isOrbId` — every pre-existing caller's "is
this a folded stand-in" check — still returns true for both with zero
changes at those call sites) until that one country is individually
double-clicked open. `toggleCountryOpen` mirrors `toggleDrilldown`'s
contract exactly: opening is the only thing the gesture can do, there is no
double-click that folds a country back (same reasoning as the 2026-08-12
fix for real nodes — "a control that can only ever add detail cannot
surprise anyone by removing it"). `App.tsx` holds the new state as
`openedCountries: ReadonlySet<Country>`, threaded into `buildDisclosedGraph`/
`resolveId` alongside `drilldown`; reset to empty on a full Reset (same
treatment as `drilldown`); left alone by a tier button press (additive, like
the filter, not a fresh start). `savedViews.ts` gained the field
(`openedCountries: readonly Country[]`, schema un-bumped — `restoreOne`
defaults a pre-existing save to `[]`, which is exactly the right meaning for
"this save predates the feature"). `InfluenceGraph.tsx`'s position-seeding-
on-reveal logic (the thing that makes a newly-revealed node animate out of
its parent orb instead of popping in at the origin) now checks the country
orb's last known position FIRST and the family orb's as a fallback, since
double-clicking a country orb is now the overwhelmingly common way a real
node gets revealed, not a global tier change.

**This deliberately revisits, not overturns, the 2026-08-12 "no per-branch
drilldown" decision** — Thomas explicitly declined per-country/per-branch
opening back then ("I want double clicking the EU to open all national level
nodes... not just Canada's"), and that was correct for a corpus where no
family held more than a handful of countries. ASIA alone now holds 14. Both
calls were right for the corpus size they were made against — worth reading
this as "the requirements changed with the data," not as Thomas contradicting
himself.

**Verified three ways** (method worth repeating: measure the actual thing,
don't trust that clean tests + a clean build means the UX problem is
actually solved). (1) Added targeted unit tests to `scripts/test-logic.ts`
for the new `countryOrbId`/`isCountryOrbId`/`countryFromOrbId` round-trips,
`toggleCountryOpen`'s no-op cases (a real node id, a family orb id), and the
fold/open/reopen sequence on a small synthetic two-family graph — updated
the one pre-existing test (`disclosed@4: everything real again`) that
assumed the OLD "deepest tier always shows every real report" guarantee,
since that guarantee now also requires every country to be opened, which is
the entire point of the change. All 54 checks pass, `npm run validate` and
`npm run build` both exit 0. (2) Built the app (`vite build` + `vite
preview`) and drove it with a headless Chromium harness (same recipe as the
path-dependence and camera-fit measurements this same day) that seeds a
saved view via `localStorage['rig.views.v1']` and reads the app's own "N of
3,091 reports shown" on-screen readout — not a simulated count. Confirmed:
Global/Nations/States/Everything ALL now default to showing 396 real nodes
(down from 396/2,467/2,873/3,073 before the fix), and opening Canada
specifically at the Nations tier bumps that to 467 (adds exactly Canada's
own reports) while every other of the 138 other countries stays folded. (3)
No console or page errors in that same run.

**Not done, flagged explicitly rather than left implicit**: no UI affordance
exists to re-fold one country short of a full Reset (deliberate, matching
the `toggleDrilldown` asymmetry, but genuinely worth Thomas seeing live
before deciding whether it needs one); nothing on screen shows "N countries
currently opened"; options (2), (3) and (4) from the same conversation are
still just discussed, not built, and Thomas said he was still analysing them
when he approved (1) — don't treat this as having closed that conversation
without checking with him.

---

## Addendum — galaxy clustering (Phase 1), still 2026-08-20 (later, after the per-country fold)

Thomas looked at the shipped per-country fold, asked what the "387 hiding"
nodes in his screenshot were (answer: the pre-existing Countries scope/family
filter chip, unrelated to the fold — clears with the filter's own "All", not
a plain Reset), then picked option 3 from that conversation: real "galaxies,"
countries clustering visibly the way continents do, provinces the same way
inside a country if the data supported it (checked: only 130/606, 21%, of
provincial/municipal reports have a `region` that parses cleanly into
"Country — Province" — a data gap, not a code one, so province-level
clustering is parked, not built).

**New file `src/lib/galaxyForce.ts`.** A d3-force-3d custom force, same shape
as `geoAffinity.ts`'s `countryAffinityForce` (ref-read strength, no rebuild on
slider change). Pulls every node toward its own colour-FAMILY centroid
(gentle, `FAMILY_PULL = 0.028`) and its own COUNTRY centroid (stronger,
`COUNTRY_PULL = 0.07`) every tick. **Deliberately not a contradiction of
geoAffinity's "continent is not a relationship" objection** — that objection
was about pulling country A toward unrelated country B because they share a
colour bucket; this force only ever pulls a node toward its OWN group's
centroid, the standard d3 cluster-force pattern. Read the file-level comment
on `galaxyForce.ts` before touching either force.

New `ViewSettings.galaxy` (0–3, default 1, ON not opt-in since Thomas asked
for it directly) in `view.ts`; "Galaxy pull" slider in `ViewControls.tsx`;
wired into `InfluenceGraph.tsx`'s `forceGraph` memo.

**Verified**: `npm run validate` (59 checks, up from 54 — new tests cover
no-NaN-after-200-ticks, two same-family countries drawing closer without
merging, strength-0 as a true no-op, a pinned/shelf node never nudged) and
`npm run build` both exit 0. A real headless-Chromium run against the full
merged corpus measured actual settled positions: at the 100% default,
countries sit 1.92× further apart from each other than their own members sit
from their own centroid; at the 300% ceiling, 3.49× — separation scales with
the slider, zero NaN at either setting. No live on-screen check was done
(harness-measured only) — worth Thomas looking at it before calling it
finished, which is exactly what surfaced the next addendum.

---

## Addendum — Isolate feature + the "felt sparse" tension, still 2026-08-20 (later again)

Thomas came back after seeing the galaxy force live with three things in one
message: (1) it "felt like a lot was missing... expected several clusters;"
(2) no way to show just Israel plus its international connections, the
Countries filter's 12 options too coarse; (3) searching "Israel" in the find
bar returned nothing.

**(2) — built.** New `view.isolateFocus` toggle. With a node or country orb
selected and this ON, everything outside the traced chain is HIDDEN (not
dimmed). Built on the EXISTING focus/trace machinery
(`selection.ts`'s `buildFocusIndex`/`computeFocus`), unchanged — the only new
thing is building that index over the UNFILTERED disclosed graph
(`buildFocusIndex(disclosedGraph, null)`) rather than the currently-visible
one. This distinction is the entire design: `applyFilter` only keeps an edge
when BOTH endpoints are visible, so a naive "scope the family filter to just
Israel" approach would silently drop any edge reaching outside Israel — the
opposite of what "show connections to and from it" means. `view.ts`,
`ViewControls.tsx`, `App.tsx` (new `unfilteredFocusIndex`/`isolateFocus`
memos — the local name `isolateFocus` there is a `Focus | null`, distinct
from the `view.isolateFocus` boolean it's built from), `scripts/test-logic.ts`
(new pinned test: an Israel report citing a Paraguay/MERCOSUR one — a filter
correctly drops that edge, Isolate correctly keeps it). 61/61 checks, `tsc`
and `build` both clean.

**(2) — investigating it live surfaced a real, verified data gap.** Selecting
Israel's country orb with Isolate on shows Israel alone, 0 others. Traced
directly against the corpus, not the UI: all 29 Israel reports are `federal`,
all 26 edges touching any of them are Israel-to-Israel. Broadened the check
to every country with 5+ reports: 18 more in the same state (Indonesia,
Taiwan, Philippines, Japan, South Korea, Vietnam, Singapore, Iran, Thailand,
Iraq, Myanmar, Saudi Arabia, Afghanistan, Yemen, Syria, Sudan, Mauritius,
Sierra Leone — mostly from the item-5 mint, which recorded each country's
domestic dependency structure but not its international ties). Full list and
counts: `notes/cross-border-gaps-2026-08-20.md`. **No edges were invented to
paper over this** — rule 2 (no document, no edge) applies exactly as much to
a gap that's inconvenient to explain as to any other missing edge. This is a
research-queue item, not a defect.

**(3) — diagnosed, not independently reproduced against Thomas's exact live
state.** `SearchPanel` is passed `within={predicate}` — search obeys the same
scope filter as everything else, by design, so it never suggests flying to a
node the filter is currently hiding. Thomas's own screenshot showed the
Countries filter at "1 of 12" at the time he searched. A direct unfiltered
test of the search function for "israel" returned 10 correct results, so the
search algorithm itself is cleared. Told Thomas this is the likely
explanation and to retry after clearing the filter — not stated as certain,
since his exact session state at search time wasn't directly observed.

**(1) — explained, not resolved; a genuine tension between two shipped
features, not a bug in either.** The per-country fold (5b) reduces most
countries to a single-point orb by default; the galaxy force (5c) needs
several visible points per country to read as a cluster rather than a lone
dot. Out of the box, most of what should look like a galaxy is single stars.
Told Thomas to try opening a handful of countries manually before deciding
whether a default should change (which countries pre-open, or
`COUNTRY_FOLD_FROM_TIER` itself) — this has not been decided yet, only
surfaced.

---

## MEMORY.md index line to add

```
- [Phase 4 complete + two render bugs, 2026-08-20 — READ BEFORE RENDERER OR SLIDER WORK](phase4-complete-and-render-bugs.md) — menu bar, Help from START-HERE.md verbatim, saved views with an open-on-load star, loading curtain. **The bug to remember: `nodeScaleFor`'s cap silently binding cost node size AND edge width together — recompute it whenever a slider ceiling moves.** Also: the camera can never end up inside the cluster by raising spread (fit sits at exactly 5.675 × p95); spread saturates; and the layout is PATH-DEPENDENT — cold start vs ramped gives a 14× different cloud for identical settings, which is the "ball vs oblong" glitch.
- [Grok archive minted + per-country fold, 2026-08-20 — READ BEFORE TOUCHING THE DRILLDOWN OR THE CORPUS SIZE](grok-archive-minted-2026-08-20.md) — corpus 1,250→3,091 reports (see the mint addendum above this one in the pending file for the full merge story); then, same day, `hierarchy.ts`'s tier ladder gained a SECOND fold axis (per-country, not just per-family-tier) because 139 countries made the old single-axis model dump 84% of the corpus onto the "Nations" tier at once. See `resolveId`'s comment in hierarchy.ts for the model.
- [Galaxy clustering + Isolate feature, 2026-08-20 — READ BEFORE TOUCHING GEOAFFINITY, GALAXYFORCE, OR THE FOCUS/FILTER SYSTEM](galaxy-and-isolate-2026-08-20.md) — new `galaxyForce.ts` pulls nodes toward their own family/country centroid (NOT the same thing geoAffinity's "continent is not a relationship" rule forbids — that rule is about bilateral pull between unrelated countries, this only pulls a node toward its own group). New Isolate toggle (`view.isolateFocus`) hides everything outside a traced focus chain, built over an UNFILTERED index on purpose so cross-border edges survive — a filtered-index version would have silently dropped them (`applyFilter` requires both edge endpoints visible). **Also: 19 countries (Israel, Indonesia, Taiwan, and 16 others, mostly from the recent mint) have ZERO cross-border dependency edges in the corpus — real, verified, not a bug — see `notes/cross-border-gaps-2026-08-20.md` before assuming Isolate or geoAffinity is broken for any of them.**
```
