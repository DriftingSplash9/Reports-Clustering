# Full project review — 2026-08-21

**What this is.** A complete code, UI and performance review of Reports Clustering, done at
Thomas's request ("snoop, try it out, try and break it") before the next dataset lands. The
project was staged whole into a Linux sandbox; `npm run validate` (90/90 logic checks, warnings
only), `tsc --noEmit` and `npm run build` all exit 0 on the live corpus — same results as the
handoff records. The built app was then run under headless Chromium
(`--use-angle=swiftshader --enable-unsafe-swiftshader`, the §2.7 recipe) and driven through
tiers, lenses, isolates, search, Escape, tier flips and window sizes. Everything below marked
**[verified live]** was reproduced against the running app, not inferred from reading.
Per the standing rules: no git commands were run, and nothing here asserts git state.

**The one-paragraph verdict.** The renderer and the data discipline are in better shape than
most professional codebases — the measured-before-believed culture shows everywhere, and the
edge-direction/focus/fold plumbing survived every attempt to trip it. The weak layer is the
**HUD chrome**: hand-placed `position: fixed` coordinates have now produced four real
overlap/clipping bugs (two already fixed, two newly confirmed below), one panel is flatly
unclickable at common window sizes, and three global interaction handlers (Escape, "/",
search-choose) silently destroy state the user just set up. One new **high** bug: isolating a
country from the Regions & Countries directory at a folded tier renders a completely black
scene. None of this is structural — but the layout system and the group-isolate matcher should
be fixed *before* the staged mint, because 2,000 more reports and 722 more unlinked dots make
every one of these worse.

---

## 1. The colour problem you reported

I went looking for a rendering bug and found something more interesting: **the palette tables
are complete and every node renders exactly the colour the code assigns it.** I checked every
report in the corpus against `COUNTRY_FAMILY`, `SCOPE_COLOUR`, `COUNTRY_LABEL` and
`continentOf` — zero gaps, zero fallback-grey leaks. What you are seeing is three *deliberate*
design decisions compounding, plus bloom:

1. **61% of the opening view is drawn as ghosts on purpose.** At the Global tier, 204 real
   connected reports are on screen — and 125 of them (61%) have no `releases_per_year`, so
   `isStandingInstrument` draws them hollow: fill opacity **0.1**, a thin fresnel ring, no
   body. Corpus-wide it's 460 of 1,806 connected reports (25%). These are your "nodes not
   rendering their colours" — treaties and standards deliberately drawn as near-invisible
   husks, at the exact tier where they dominate.
2. **The international layer is achromatic by design.** 110 of the 151 international-level
   connected reports are *also* hollow, and every `*:international` scope is `#ecf0f7`
   near-white. So the centre of the opening view is white-on-white ghost rings.
3. **The v4 chroma damp made the two biggest families the palest.** ASIA (`#7d7aca`, 779
   fills) at 55% chroma and SA (`#628845`, 497 fills) at 65% are now ~41% of the corpus,
   rendered as washed grey-indigo and grey-olive. The damp logic ("a colour seen hundreds of
   times must be calmer") is defensible, but its visible result is that the majority of the
   graph reads as "colour missing", and your glow at 55% whitens the cores on top of it.

**Opinion:** this isn't a bug to fix but a decision to revisit, and it's cheap to test. Three
levers, try in order: (a) raise `HOLLOW_FILL_OPACITY` from 0.1 to ~0.28–0.35 so hollow nodes
keep a legible tint of their family; (b) widen/brighten the hollow rim slightly at the Global
tier where they dominate; (c) soften the damp floor so no family drops below ~70% chroma —
the "calm the dominant family" idea survives, but 55% is below the point where the hue still
reads as a hue at 8px. The one thing I'd *not* do is revert the damp entirely; undamped
magenta at 779 nodes was the correct thing to prevent.

A related discovery — **the Lens control does almost nothing at the opening tier**
[verified live]. Orbs are exempt from lens recolour by design, and the visible real nodes at
tier 1 are mostly INT (white in every lens) — so switching COUNTRY → GROUPS → WORLD changes a
handful of dots and nothing else. Screenshots of all three lenses at tier 1 are near-identical.
Anyone trying the lens at the default view will conclude it's broken. Either recolour orbs too
(an orb *has* a dominant group — the mode country is already computed) or grey the lens buttons
out below the tier where they can bite.

---

## 2. Confirmed bugs, ranked

### HIGH — Isolating a country from the directory at a folded tier renders a black scene
**[verified live]** At the Global tier, Regions & Countries → Countries → "Japan" leaves the
scene completely empty — no nodes, no orb, no message; tier bar reads
`0 shown · 396 in this tier · filter hiding 396`. Cause: `matchesRegionGroup`
(`src/lib/regions.ts` ~268–287) tests only a node's single `country` field for the
`continent`/`bloc`/`country` kinds. At tier 1, JP is folded inside `orb:ASIA`, whose `country`
is the *modal* member — not JP — so the seed set is empty and `computeGroupFocus` isolates
nothing. Only the `publisher` kind got the members-aware check. The same flaw silently corrupts
bloc/continent isolates at folded tiers: whichever country happens to be an orb's mode claims
or excludes the whole orb (e.g. `orb:ASIA` counted into BRICS if its mode is RU, out of it if
IL). At the Everything tier the country case *works* only because `corb:JP` carries the right
country — and even then Japan shows one giant orb with "0 shown" beside it, which reads as
broken twice over (see §3.4). **Fix:** make all four kinds check `(node as OrbNode).members`
the way `publisher` already does — or have `handleChooseGroup` auto-open the country/drilldown
before isolating.

### HIGH — The Compare panel is unclickable at ≤ ~1400px window widths
**[verified live at 1280×720]** The collapsed Compare pill sits at [421,673 79×27]; the tier
bar's opaque wrap spans [20,634 458×66]. Both are `zIndex: 6`, TierBar renders later in the
DOM, and `tierBarWrap` deliberately does not set `pointerEvents: 'none'` — so the tier bar's
panel paints over the pill and eats its clicks. Playwright could not click it; a person can't
either. This is the §7 trap biting a *third* time, now between two panels that were both moved
in the 5h layout pass. Expanded, the panel body (`calc(50% − 446px)` left edge) collides with
the tier bar at every width below ~1870px.

### HIGH — Expanded Legend covers the Unlinked shelf
**[verified live at 1280×720]** Legend expanded: [780,273 268×427 z6]. Shelf:
[834,552 232×148 z5]. The Legend fully covers the shelf and blocks its dots at any width below
~1800px; even its collapsed pill overlaps below ~1350px. Same class as the Compare collision.

### HIGH — One Escape keypress destroys isolation/selection while closing a panel
**[verified live]** With UAE isolated (15 shown) and the Legend expanded, Escape closed the
Legend *and* silently cleared the isolation (back to 396). App's window-level Escape handler
(`App.tsx` ~545) clears `selectedId` + `selectedGroupId` + `selectedEdgeKey` on every press,
in parallel with whichever panel's own Escape listener also fires. Escape needs a priority
stack: close the topmost open thing, and only clear selection when nothing else consumed it.

### HIGH — "/" steals focus from every other text input
**[verified live]** Typing `US/EU` into Views ▸ "Name this view" leaves the field holding
`US` and teleports focus into the Find bar. `SearchPanel`'s global "/" handler only excludes
its own input; it must also ignore the event when `document.activeElement` is any
input/textarea. Same fix guards the GroupsPanel country box and Compare pickers.

### MEDIUM — Choosing a search result silently discards an active group isolate
**[verified live]** With UAE isolated, searching "consumer price index" and pressing Enter
cleared the isolation entirely (396 shown again) with no acknowledgement. `handleChoose` calls
`setSelectedGroupId(null)` by design, but combined with search listing nodes the isolate hides,
the effect is "I built a view, touched search, and the app threw the view away". Also
inconsistent in the other direction: search respects the domain *filter* (`within={predicate}`)
but not isolates — while Compare's pickers deliberately search the whole corpus. Three
different answers to "what does search see". Pick one, and label results that are currently
hidden rather than dropping state.

### MEDIUM — View panel clips at 720-tall windows with no scrollbar
**[verified live]** The View `PanelShell` content measures 697px tall (top 44 → bottom 741):
fits at 768-height, but at 1280×720 the bottom 21px — the Neighbourhood slider's tail and
notes — are off-viewport with no scroll. This is the exact bug class item 5i just fixed for
the Reports panel; the fix (a `maxHeight` anchored to `HUD_TOP` + clearance) was never applied
to the sibling panel. `ViewControls` needs the same treatment.

### MEDIUM — PNG export: two rapid clicks permanently double the render resolution
Verified by reading `PngExport.tsx`: the effect snapshots `restore.current` from the *current*
pixel ratio. `toBlob` is async, so a second export before the first callback lands snapshots
the already-doubled ratio, and after both finishes the app renders at 2× DPR forever —
silently halving framerate. Cheap fix: ignore a request while `restore.current` is non-null.
Also worth a clamp: doubling DPR 2 on a large window can exceed common 8192px GPU buffer
limits and produce a black capture.

### MEDIUM — Zoom slider drifts on its own during settle
`runFit` republishes `fitSync.distance` on every tracking measure (no stamp bump), so while
the cloud is still expanding under a user-owned camera, `CameraZoom`'s inferred
`distance/base` drifts and the slider visibly creeps. Harmless until the inferred zoom crosses
`ZOOM_MIN`/`ZOOM_MAX` — then App's clamp feeds back a *different* value and the camera
physically moves with nobody touching it. This is the most plausible residue of the old "zooms
out forever" report. Consider freezing the slider's baseline while `userOwnsCamera` is true.

### MEDIUM — The Hud's counts mix three units
**[verified live]** With UAE isolated the masthead read "16 of 3091 reports · 17 dependencies"
while the tier bar read "15 shown". The Hud's `visibleNodeCount` includes orb stand-ins and its
edge count is drawn-line keys vs raw dependency records. `tierCounts` already solved this for
the tier bar; the Hud never got the fix. Also: the tier bar calls an isolate a "filter"
("filter hiding 381"), which sends users hunting through Subject chips for a filter that
doesn't exist.

### Data-layer bugs (found by review, not yet user-visible)
- **Calendar drops most reads of faster-than-annual anchored edges.** `calendarEvents`
  (`schedule.ts` ~265) walks anchors only for years inside the window, stepping *forward* —
  reads belonging to the previous year's anchor series (e.g. a monthly read anchored `10-31`;
  Jan–Sep belongs to last year's anchor) are never generated. The loop needs `startYear − 1`.
  Two smaller siblings: rates < 1/year emit a read *every* year (a biennial read shown
  annually — an invented date, the module's own forbidden case), and rates > 12/year collapse
  to a single read with no comment.
- **`Dependency.strength` is the one edge-weight input with zero validation.** Unused in live
  data today, but a hand-typed `strength: 0` on a node's only out-edge yields `0/0 = NaN` in
  PageRank and NaN spreads to every score — the exact door the `relationship_type` guard
  brags about closing. One validator rule closes it.
- **`COUNTRY_LABEL` has no validator rule, and this omission has shipped three times** (the
  file's own comments record two backfills; item 5e found 52 more). Since `COUNTRY_GROUPS` is
  *derived from* `COUNTRY_LABEL`, a country with a family but no label is now invisible in
  the Countries directory — worse than a bare-code label. Mirror the `COUNTRY_FAMILY` check.
- **The `orb:`/`corb:` id prefixes and the `->` edgeKey separator are unreserved** — no rule
  stops a future research file minting a report id that collides with the renderer's
  namespaces. Two one-line validator rules.
- `describeRate` calls ≥45/yr "weekly" while `cadenceBand` files 45–51 under "month" — a
  48/yr report reads "weekly" on its card and never appears in the calendar's week band.
- `rolledUpAuthority` recurses `part_of` with no cycle guard at render time (validate detects
  the cycle but the app renders anyway after `console.error`) — a hand-edited cycle
  stack-overflows the Detail card.

---

## 3. UI review — opinions, as asked

### 3.1 The aesthetic is earned; keep it
The constellation look works. Near-black ground, flat panels, the serif masthead, restrained
glow, family-ink edges — at the Everything tier with a few countries open it is genuinely
beautiful, and the screenshots I took headless look like a product, not a demo. The decisions
recorded in the visual-revamp notes (set-size edges, no white pulse cores, spheres only,
authority = size held sacred) have all aged well. Nothing in this section wants a style change.

### 3.2 The layout system is the real defect — stop patching coordinates
Every panel is `position: fixed` with hand-picked numbers, and §7's own trap bullet now has
four confirmed casualties (Compare/tier-bar pre-ship, Reports/tier-bar 5i, and today's
Compare-pill and Legend/shelf overlaps). The pattern is structural: there is no registry, so
every addition re-derives everyone else's coordinates by eye, and every screen narrower than
the author's misses the check. Two concrete recommendations:

1. **Build a bottom dock.** One fixed, full-width flex container owning the bottom edge:
   tier bar left, Compare/Groups/Legend centre, shelf right, with `gap` and `flex-wrap`. All
   five current collision pairs become impossible at once, at every width, forever — and the
   next panel costs zero coordinate archaeology. This is a ~1-evening change and I'd do it
   before any other UI work.
2. **Declare a minimum supported window** (1280×720 is the natural floor) and add a dev-only
   overlap check: walk `position:fixed` elements, `getBoundingClientRect`, warn on
   intersection. Ten lines, and it turns the §7 trap from prose into a tripwire.

### 3.3 The tier bar now lies about what tiers do
**[verified live]** After the per-country fold, Global / Nations / States / Everything all
show **"396 of 3091 reports shown"** — pressing 2, 3, 4 changes almost nothing visible
(recolour of orb captions aside). The fold was the right call at 3k reports, but it demoted
the app's primary navigation into four buttons that appear broken. Nobody discovering the app
will guess that the *real* expansion gesture is now double-clicking country orbs — the tier
bar's readout even says so many countries exist nowhere ("no 'N countries opened' readout
exists anywhere" — still true). Suggestions, cheapest first: (a) make the status line say what
a tier *offers*: "396 shown · 139 countries folded — double-click a country to open it";
(b) add the "N countries opened" counter with a one-click re-fold-all; (c) longer-term,
consider whether tier buttons should pre-open the top-N countries by authority so each tier
visibly delivers something.

Related asymmetry worth fixing with it: once opened, a country cannot be individually
re-folded short of a full Reset (deliberate, but with 139 countries it now bites — three
countries opened for a comparison can't be put back one at a time).

### 3.4 Isolates need a "why so few" voice
**[verified live]** Isolate Japan at the Everything tier: one giant lavender orb, tier bar
"0 shown". The singleton camera fit works exactly as the 08-13 fix intended (the sphere sits
at ~a fifth of frame height, not 85%) — but "0 shown" beside a huge sphere, with the 19
zero-cross-border countries documented in `notes/cross-border-gaps-2026-08-20.md`, makes the
correct answer indistinguishable from a crash. The §7 trap already flags this; I'll double it:
before anyone but you uses this, an empty/near-empty isolate needs one sentence on screen —
"Japan's 71 reports have no recorded cross-border dependencies yet — research queue item" —
ideally with the real count of folded members instead of "0 shown".

### 3.5 Search is the weakest feature relative to its importance
It's the navigation backbone of a 3,091-node graph, and it currently: (a) can't find
"Côte d'Ivoire" by "cote", "Türkiye" by "turkiye", or anything Cyrillic — `normalise` maps
every non-`[a-z0-9]` character to a space, so accented and non-Latin titles in a 139-country
corpus are unsearchable (fold with NFD + strip combining marks); (b) searches only the
filtered set and then asserts "Nothing matches" for reports that exist; (c) disagrees with
Compare's full-corpus pickers about what exists; (d) re-normalises five fields × 3k nodes ×
every keystroke — precompute the normalised fields once; (e) owns the "/" shortcut so
aggressively it eats other inputs (§2). One focused pass fixes all five.

### 3.6 The unlinked shelf has been outgrown
1,285 six-pixel dots with hover-only identity, in a grid that now scrolls — and the staged
corpus adds 722 more. Six-pixel targets are below every hit-size guideline, there's no touch
story, and no way to browse or filter what's there. Opinion: the dots stop earning their place
above ~200 items. Replace with a compact summary ("Unlinked — 1,285 · AFR 412 · ASIA 371 …")
that opens a searchable list in the Reports panel. That's also the honest UI for what the
shelf really is now: a research queue, not an annotation.

### 3.7 Accessibility batch (one afternoon, big payoff)
- **Contrast:** `--ink-dim` (#5e6f8a ≈ 3.8:1), `--ink-faint` (≈3.2:1) and `--ink-faintest`
  (≈2.1:1) all fail WCAG AA at the 9.5–11px sizes they're used at — and they label most
  collapsed pills and controls. Lifting the three variables ~15–20% keeps the mood and passes.
- **Keyboard:** nearly every actionable row is a `<div onClick>` — group rows, legend rows,
  calendar entries, shelf dots, search results. No focus, no Enter/Space, no roles. Buttons
  with the same styling fix it mechanically.
- **Focus visibility:** every text input sets `outline: 'none'` with no replacement — the
  focused field is pixel-identical to an unfocused one.
- Menus carry `role="menu"` without the keyboard contract (no arrow keys, no focus move) —
  either implement roving focus or drop to `role="group"`.
- HelpCard has no `role="dialog"`/focus trap (Onboarding does it right — copy it).
- Deleting a saved view is one unconfirmed click on a 16px "×" beside the apply button.

### 3.8 Small stale-state papercuts [verified live]
After double-clicking a country orb open, the hover chip keeps showing "Canada — 71 folded
reports" for an orb that no longer exists until the pointer moves. Cheap fix: clear
`hoveredIdRef`/`onHover(null)` in `handleToggleNode`.

---

## 4. Performance review

**Sandbox caveat:** all timings below are from software-rendered headless Chromium; absolute
FPS there (~1) says nothing about your GPU. The structural numbers are what matter.

### 4.1 The bundle is 8.3 MB and ~95% of it is the corpus
`dist/assets/index-*.js` is 8,612 kB (2.3 MB gzip); `src/data/research/` is 8.2 MB. The
entire corpus is compiled into the JS bundle as module code, parsed on the main thread at
every load, and re-bundled by every `vite build`. Before the mint doubles it: move the corpus
to a static JSON fetched at startup (or a lazy-loaded chunk). Wins: main-thread parse drops
to JSON.parse off the critical path, `vite build` stops re-processing 8 MB per code change,
and the "sandbox regenerated slices.generated.ts down to empty" trap (§3 of the handoff)
disappears because data stops being code. This is the single highest-leverage performance
change available.

### 4.2 Startup does 2,665 console warnings
`validate()` runs inside App's first render and `console.warn`s per issue — 2,665 messages on
the live corpus (mostly `proposed:` domain tags), each one synchronous console I/O, before
first paint. With DevTools open this is seconds. Batch to one grouped summary
(`console.warn('[graph] 2,641 proposed-domain tags on 214 reports', {sample})`) — and the 722
edgeless candidates will otherwise add 722 orphan lines on top.

### 4.3 Per-frame and per-tick costs that will grow
- **`geoAffinity` is O(countries²) per tick with string allocation per pair.** Its own
  comment prices "~90 countries, a few thousand ops"; at 139 countries it's ~19,300 pairs per
  tick, each building `[a,b].sort().join('|')` — roughly a million short-lived strings per
  second during settle, exactly when frames are most precious, and quadratic in the country
  count the mint grows. `affinityScore` depends only on the two codes: precompute the matrix
  in `initialize` and the whole term vanishes.
- **Pulse draw calls scale with links × photons.** three-forcegraph builds one mesh per
  photon (correctly documented in the code): 2,070 links × up to 4 photons ≈ up to ~6k meshes
  when everything is open. This is the real render-scaling lever at 5k+ edges — the planned
  beam treatment for fast edges is also the performance fix; when you do item 4, count draw
  calls before/after.
- `walk()`/`shortestPath` dequeue with `Array.shift()` — O(n²) at large cones; an index
  pointer is a three-line fix. Same class: `measureFit` allocates a `Vector3` per node per
  distance pass, twice per fit, every 200ms during the 12s tracking window. Fine at 3k,
  worth a scratch-vector at 10k.
- Search re-normalises everything per keystroke (§3.5).
- Heap across three full tier-flip cycles went 53 → 121 → 186 → 110 MB — churny but
  recovering, no evidence of an unbounded leak. `blinkingPulseMaterials` grows per
  colour-key only (bounded); caches are shared correctly.

### 4.4 Scale forecast for the staged mint (+1,999 reports, 844 connected)
Layout physics (~2.6k connected nodes) will hold; camera fit already measured 1.38× vs the
5.675× failure line post-mint, with the density-risk note superseding the stale memory entry.
The things that actually degrade at 5k: bundle parse (§4.1), pulse draw calls (§4.3),
startup warnings (§4.2), the unlinked shelf (§3.6), and the O(countries²) force term. All
five have cheap fixes listed above; I'd land them first.

---

## 5. Code health

**What's genuinely excellent, said once:** the comment culture (every constant carries its
reasoning and date — the codebase is its own design history and it made this review possible);
the edge-direction discipline (data direction one way, render reversal confined to one loud
spot, keys always in data direction); the validator re-running the whole build to prove
commercial/terminus exclusion changes nothing; the mutate-don't-rebuild renderer contract and
the ref-not-memo-dep lens system; `savedViews`' tolerant merge; `deepLink`'s UTF-8-safe
encoding; the isolate walk seeding all group members up front so intra-group edges come free.
The 90-check `test-logic.ts` suite pins exactly the regressions that already happened once.

**Risks:**
- **Two monoliths.** `App.tsx` (~2,700 lines) and `InfluenceGraph.tsx` (~2,800) each carry a
  dozen separable components/systems. Extracting `Hud`, `Detail`, `EdgeEvidence`, `TierBar`,
  `IsolatedShelf` and the style constants into their own files is mechanical, behaviour-free,
  and would halve the blast radius of every future edit. Do it in a quiet moment, not mixed
  into feature work.
- **Test gaps that map exactly onto today's findings:** no pure PageRank unit tests
  (behavioural checks only run against the live corpus); no `calendarEvents` year-boundary
  case (the §2 bug sits precisely there); no savedViews/deepLink round-trip or corrupt-input
  tests; group matching at *folded* tiers untested (the black-scene bug sits precisely there).
  Each new test should be written alongside its fix, in the house style of pinning the case.
- **Stale comments found** (worth fixing because this codebase's comments are trusted):
  `hierarchy.ts`'s mode-country note claims the field "only affects the flag and the rim
  shade" — three later features (both layout forces and `matchesRegionGroup`) now read it,
  which is how the black-scene bug happened; `geoAffinity.ts`'s cost note is ~2 orders stale.
- **Restored numeric view state is never clamped** — a deep link or pre-08-19 saved view can
  carry `spread: 1` (below today's floor), out-of-range `galaxy`/`geoAffinity`, etc. One
  clamp pass at restore.

---

## 6. What I'd do before the mint, in order

1. **Fix `matchesRegionGroup` for orbs** (black-scene bug) + add the folded-tier test.
2. **Bottom dock layout container** — kills the Compare and Legend collisions structurally;
   add the View panel `maxHeight` while in there.
3. **Escape stack + "/" input guard + search-choose preserving isolates.**
4. **Move the corpus out of the JS bundle** (§4.1) and batch the startup warnings (§4.2).
5. **Unlinked shelf → summary + list** (before it becomes 2,007 dots).
6. **Colour pass:** hollow opacity ≈ 0.3, damp floor ≈ 70%, lens greyed-out (or orbs
   recoloured) at tier 1.
7. **Validator rules:** `COUNTRY_LABEL` coverage, `strength` range, reserved `orb:`/`corb:`/
   `->` namespaces.
8. **Search pass** (§3.5) and the calendar year-boundary fix.
9. When touching pulses next (item 4's beam round): the PngExport re-entry guard and the
   zoom-baseline freeze ride along cheaply.

Items 1–3 are hours each, not days, and every one of them was reproduced live in this
session's harness — the recipes are in the verification appendix below if you want them
re-run after fixing.

---

## Appendix — what was actually run

- `npm run validate`: exit 0, "logic: all 90 checks pass", warnings only (proposed-domain
  tags, unlinked list). `npx tsc --noEmit` and `npm run build` clean; bundle 8,612 kB.
- Palette coverage script over all 3,091 reports: zero missing entries in `COUNTRY_FAMILY`,
  `SCOPE_COLOUR`, `COUNTRY_LABEL`, `continentOf`; fill distribution counted (top:
  `#7d7aca` ×779, `#628845` ×497, `#d61de2` ×390, `#ecf0f7` ×262).
- Hollow-instrument census: 460/1,806 connected reports hollow; 125/204 at tier 1.
- Headless Chromium (SwiftShader) drives: tier flips ×3 cycles with heap sampling; Japan
  isolate at Global (black scene) and Everything (orb + "0 shown"); UAE isolate (15 shown,
  correct chain) then Escape-during-Legend (isolation lost); "/" typed into the view-name
  input (focus stolen at the third character); search-choose while isolated (isolation
  cleared); Canada orb opened by search-fly + double-click (396 → 467 shown, fold works);
  lens A/B/C screenshots at tier 1 (near-identical); fixed-panel `getBoundingClientRect`
  sweep at 1280×720 (Compare pill [421,673] under tier bar [20,634 458×66]; Legend
  [780,273 268×427] over shelf [834,552 232×148]; View panel bottom 741 on a 720 viewport).
- 2,665 console warnings counted at startup against the production build.

Not verified here, flagged for a live-hardware look: real FPS, bloom flicker behaviour
(software bloom is untrustworthy per §2.7), and the WORLD/GROUPS lens appearance at deep
tiers with countries open.
