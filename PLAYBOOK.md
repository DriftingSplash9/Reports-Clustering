# PLAYBOOK.md — standing rules, traps, architecture

**This file is reference material, not state.** It's how the repo works and
what bites people — it should stay roughly the same size turn over turn.
Edit it only when you discover a genuinely NEW rule or trap. Current corpus
numbers and the live todo list belong in `HANDOFF.md`, not here.

---

## 1. Read these, routed by task

| Always | `REPORTS.md` from "🛑 Agent: read this" onward, then `HANDOFF.md`, then this file. |
|---|---|
| Orientation | `START-HERE.md` — rendered verbatim in-app as Help ▸ What this is. Editing it edits the product. |
| Visual/layout work | §3/§4 below, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` |
| Camera/fit/layout | `notes/camera-fit-measurement-2026-08-19.md` |
| Flicker | `notes/flicker-tests-2026-08-19.md` |
| "Why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| Cross-border research thread | `notes/crossborder-verification-2026-08-22.md` |
| Any Grok prompt | `notes/grok-diary.md` FIRST (§5 below) |
| Regions/blocs/publishers | `src/lib/regions.ts` file comment |
| Compare/path | `Compare.tsx` file comment |
| Schema | `src/lib/types.ts` |

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts`, `hierarchy.ts` and
`InfluenceGraph.tsx` carry dated comments explaining every constant. Read the
comment before changing the number. Several say "do not raise this" and mean it.

---

## 2. Standing rules

Full text also in `REPORTS.md`.

1. **Never run git here from an agent session** — not even read-only (stale
   lock). **Never STATE git status in any doc either.** Ask Thomas or read a
   GitHub Desktop screenshot; delete any git-status claim you find.
2. **No document, no edge.** If nothing published says the dependency exists,
   it does not go in the graph.
3. **A pointer is not a source.** WebFetch can fabricate content for a dead
   URL; raw-verify before trusting any quote. Applies to Grok output too —
   including node DESCRIPTIONS, not just dependency claims: a summary
   description naming a standard is a lead to go verify, not a citable basis.
4. **`npm run validate` before and after any data change** (120+ checks). It
   cannot run through the device bridge. Recipe: stage `src/ scripts/
   package.json tsconfig.json index.html vite.config.ts START-HERE.md` (the
   full `src/data/research/` corpus included) into a Linux sandbox,
   `npm install`, `npm run gen`, then tsc/validate/build. Fastest way to get
   270+ research JSONs across the bridge: zip `src/data/research/` on-device,
   drop the zip in `_to_delete/`, stage that one file, unzip in the sandbox.
   A live sandbox with `node_modules` already installed can be reused across
   rounds in the same session instead of restaging from scratch.
5. **`public/corpus-data.json` is generated** (`npm run gen` /
   `scripts/gen-slices.ts`). Never hand-edit it. Fresh sandbox → run
   `npm run gen` first.
6. Agents cannot delete device files — `mv` into `_to_delete/`, log it in
   `_to_delete/README.md`. Emptying `_to_delete/` is Thomas's own job.
7. **Headless verification is expected**: build + `vite preview` + Playwright
   on the preinstalled Chromium with `--use-angle=swiftshader
   --enable-unsafe-swiftshader`. Geometry/colour/pixel counts exact;
   **bloom/glow untrustworthy** in software rendering; CSS transitions can
   wedge under load.
8. **Measure before believing.** If a statement has a number in it and
   nobody ran anything, it is a guess.
9. **Any prompt relayed to a third party (Grok, etc.) needs its
   attachment/action list told to Thomas separately, in plain chat text, not
   just inside the pasteable block** — he skims or skips the prompt itself.
10. **A `_dropped` entry describing an edge that DOES exist live in the
    corpus must use `reason: "caveat"` (or `"resolved"`), never any other
    reason.** Applies to every `DroppedReason`, not just `"note"` — a
    `no-document`, `wrong-direction`, etc. entry is equally an error if its
    (source, target) exact-matches a live edge. Before finalizing ANY
    `_dropped` entry, check its exact (source, target) against the WHOLE
    corpus's live edges (not just this round's own proposals) — "this
    round's evidence didn't hold up" and "this edge doesn't exist" are
    different claims.
11. **Build the id-collision check from the WHOLE corpus, not just
    `src/data/research/*.json`.** Some ids live only in the hand-written seed
    files (`src/data/reports.ts`, `src/data/dependencies.ts`) and won't show
    up in a naive grep of the research JSONs. Same for edges — cross-check
    against `dependencies.ts` too, not just the research JSONs.
12. **A dependency edge between a node and its `part_of` container is a
    validator ERROR** ("containment is not a dependency" — see the comment on
    `part_of` in `types.ts`). Before minting, cross-check every new edge's
    (source, target) against the corpus-wide `part_of` map in both
    directions; drop matches as a `note`.
13. **A fresh, well-verified finding that contradicts an already-live edge is
    not automatically right just because it's freshly verified.** Caveat the
    existing edge, defer the new claim, don't silently override — same
    principle as rules 2/3 applied to edges that already exist.

**Process rule (Thomas, 2026-08-20, revised 2026-08-25 as part of the
handoff simplification).** `HANDOFF.md` is now short — edit its Current
State and Todo sections directly (overwrite, don't append) each work turn.
Only copy it to `archive/Previous Handoffs/` when you're about to make a
structural rewrite, not on routine updates. If you discover a new standing
rule or trap, add it here, not to `HANDOFF.md`. Hand off rather than push on
when: you re-derive something already settled, contradict an earlier answer,
retry a tool past its documented once-only policy, or the session has been
through a compaction. Project memory: write entries as you go; if it
refuses, park a note in `notes/` and flag it in `HANDOFF.md`.

---

## 3. What the app is now

Assume all of this exists and works; each has a dated comment at the site.

- **Lenses** (`modes.ts`): STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW —
  recolour via ref + mutation effect, never a `forceGraph` memo dep.
  GROUPS/WORLD are disabled at tier 1 (mostly no-ops there).
- **Constellation look**: near-black bg, flat panels. **The whole bottom edge
  is one dock** (`bottomDock`, App.tsx): tier bar left, Compare + GroupsPanel
  + Legend centre, Unlinked pill right, empty fourth track reserving the View
  panel's column. No bottom panel carries fixed coordinates. Top row (search
  bar left-of-centre, calendar tab right of it) is still hand-anchored.
- **Reports/View panels** stop their scroll above the tier bar
  (`REPORTS_PANEL_BOTTOM_CLEARANCE` / `VIEW_PANEL_BOTTOM_CLEARANCE`).
- **Hover** = identity chip; **click** = Detail card from the right (with
  host link); **edge click** = evidence card from the left (endpoints, type,
  period, verbatim basis, evidence_url). Camera refits unconditionally on
  every filter change (deliberate — third rewrite).
- **Edges/pulses have SET SIZES** (`baseLinkWidth()` = 1); weight lives in
  rest length + opacity. Never reintroduce additive/white pulse cores.
  **Continuous-database edges** (`Report.continuous`, 35 nodes) draw as an
  animated flow in the edge shader, zero teardrop particles.
- **Menu bar**: Panels ▾ (fresh sessions default all 8 ON-and-minimized),
  Views ▾ (saved views, ★ open-on-load, deep links via `?rig=`), Help ▾
  (renders START-HERE.md raw). Tier bar + status line deliberately NOT in
  the menu — primary navigation.
- **Disclosure folds TWICE** (`hierarchy.ts`): tier ladder folds into family
  orbs (`orb:`), then per-country orbs (`corb:`) until a country is
  double-clicked open (`openedCountries`). Orb `country` is the MODAL member
  — display-grade, NEVER membership; membership checks read `.members`.
  No UI to re-fold one country short of Reset (known gap).
- **Galaxy clustering** (`galaxyForce.ts`, `view.galaxy` slider): pulls nodes
  toward their OWN family/country centroid. Read its file comment and
  `geoAffinity.ts`'s before touching either — similar-looking, different
  questions. Provinces are NOT a third level (most `region` values are free
  prose — needs a data pass first).
- **Isolate** (`view.isolateFocus`) hides everything off the traced chain,
  built on the UNFILTERED index so cross-border edges survive. **Groups
  panel** ("Regions & Countries", bottom-centre) isolates continents/blocs/
  publishers/single countries the same way via multi-seed
  `computeGroupFocus`. Neighbourhood slider bounds the walk by hops. Search
  runs over the FULL corpus and tags results "outside filter"/"outside
  isolate"; choosing an outside result is an informed exit.
- **Unlinked shelf** = a one-line summary pill → searchable list inside the
  Reports panel (`unlinkedOpen`).
- **Escape** clears one level, topmost first (edge card → selection → group
  isolate); panels consume their own Escape. "/" ignored while any input has
  focus.
- **PNG export**: 2× DPR, no HUD, re-entry-guarded, 8192px capture clamp.
  **Zoom baseline freezes** while the user owns the camera (`frozenBase`).
- **Loading curtain**: opaque until settled+fitted, 25s safety timeout is
  load-bearing; corpus-fetch failure pins it with an error instead of an
  empty scene.
- **Sliders**: cluster spread 200%–10000% (opens 200%), geo-affinity 0–500%
  (opens 150%), zoom 0.25–2.6 of fit.

---

## 4. Architecture crib — where things live

- **`src/App.tsx`** — state owner (filter, drilldown, selection + group
  selection, view, lens, panels, saved views, curtain latch), the HUD, both
  cards, lighting, Canvas + bloom, the bottom dock. `STARTUP_VIEW`/`DEEP_LINK`
  read at module scope — cannot be hooks.
- **`src/components/InfluenceGraph.tsx`** — imperative renderer. One
  `forceGraph` memo, deps `[graph, spreadApplied]` ONLY. Everything else
  flows through refs + mutation effects. `runFit`/`measureFit` own camera +
  node scale; `applyFocus` owns dim/raycast; `useFrame` runs pulses, orb
  breath, flow animation, fog, flight, `onReady`.
- **`src/lib/`** — `palette.ts` (colour, `COUNTRY_FAMILY`/`COUNTRY_LABEL`),
  `modes.ts` (lenses), `view.ts` (tuned constants), `savedViews.ts`,
  `deepLink.ts`, `uiTheme.ts` (`HUD_TOP` etc.), `hierarchy.ts` (orbs/folds),
  `regions.ts` (continents/blocs/publishers/directory), `selection.ts`
  (`computeFocus`/`computeGroupFocus`/`computeNeighbourhoodFocus`,
  `shortestPath`), `graph.ts` (build + validate), `galaxyForce.ts`,
  `geoAffinity.ts`, `schedule.ts` (calendar), `search.ts`, `types.ts`.
- **`src/components/`** — `linkVisuals.ts` (edge shader/beam),
  `nodeVisuals.ts` (materials/rims), `MenuBar`, `HelpCard`, `LoadingCurtain`,
  `PanelShell`, `GroupsPanel`, `Legend`, `Compare`, `PngExport`,
  `SearchPanel`, `CalendarPanel`, `ViewControls`, `CameraZoom`.
- **Data**: `src/data/research/*.json` → `scripts/gen-slices.ts` →
  `public/corpus-data.json` (generated). Browser loads it via
  `browserCorpus.ts`; Node scripts via `src/data/index.ts` (never import
  from browser code); both share `assembleCorpus.ts`. Validation:
  `scripts/validate-data.ts` + `scripts/test-logic.ts` (120+ checks).
  id-collision and edge-collision checks must include `src/data/reports.ts`
  and `src/data/dependencies.ts`, and edges must also be checked against the
  `part_of` containment map (rules 10-12 above).

---

## 5. Grok pipeline — diary and prompt queue

**Before writing ANY prompt for Grok, read `notes/grok-diary.md`** — the
standing playbook of what works and Grok's dated failure modes. Append a
dated lesson to the diary after processing every Grok reply.

Prompts live beside the diary as `notes/grok-prompt-*.md`; the diary's
"Round log" section is the queue state. Larger batches get their own dated
folder under `notes/` with a `00-README.md` index (e.g.
`notes/grok-research-queue-2026-08-22/`).

---

## 6. Known traps

Bugs and gotchas not already covered as a numbered rule above.

- **`RelationshipType` is a closed 4-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `cites`). An off-union value
  → NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation`
  is only `audits`/`supersedes`. Grok output routinely invents types — map
  them, never pass them through. Same for `Domain` and every closed union:
  cast, not parsed — check `types.ts` before inventing a value.
- **`PanelShell` supports one panel per edge; the bottom edge belongs to the
  dock.** A new bottom panel is a one-line dock-cell addition, not a
  coordinate hunt. Reserve dock space with an empty grid TRACK, never an
  item margin. A DEV-only tripwire in `App.tsx` warns on intersecting fixed
  panels.
- **Never put a mode, tab, hover, or view setting in the `forceGraph` memo
  deps** — every change there resets the camera and re-warms physics.
- **A force reading alpha-scaled strength needs its own reheat-then-refit
  pair** or its slider silently does nothing after settle (search
  `view.galaxy` in InfluenceGraph.tsx for the template).
- **A cap that silently binds costs twice** (node size AND edge width) —
  whenever a slider ceiling moves, recompute `nodeScaleFor`'s cap.
- **Camera can't end up inside the cluster by raising spread** (fit = 5.675 ×
  p95; measured ratios ≤ ~2). Spread saturates past ~1000%.
- **`meshes.current` cannot be trusted for POSITIONS** — read
  `positionedById` or `graphData().nodes`.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`. Rim-colour uniform exists only after first shader
  compile. `onPointerMissed` can fire twice per click — the edge-pick path
  always OPENS, never toggles.
- **Menus close on `pointerdown`, not `click`**; synthetic drags do NOT reach
  OrbitControls (use `autoRotate` in harnesses); CSS transitions wedge under
  software rendering (curtain unmounts on a timer for this reason).
- **Orb `country` is modal, not membership** — anything deciding membership
  must read `.members`.
- **Grok's JSON is not reliably JSON** — parse-check first. Its ids and enum
  values are inventions until grepped against the FULL corpus (research
  files AND seed files). Never hand-edit JSON insertions — generate them.
  Its `files_received` confirmations are not reliable either. **Its imported
  node DESCRIPTIONS are also not a citable basis by themselves** — a
  description naming a standard is a lead, not a quote; always raw-verify
  against a live primary source before minting off it. **A single region's
  own verification pass can't see cross-region problems** — endpoints that
  failed verification elsewhere, or duplicate/contradictory edges from a
  different slice, only show up on a corpus-wide second pass. **Grok can run
  the same region under multiple prompt names across sessions, producing
  overlapping or conflicting proposals** — dedupe and diff for conflicts
  BEFORE verifying, not after.
- **Never reintroduce faceted node geometry** (fresnel rims) or
  additive/white pulse cores.
- **The IMF DSBB tables are JS-walled at the page level** (use a real
  browser, not WebFetch; its PDF observance reports parse fine headless).
  **Workaround**: DSBB's Angular SPA calls a plain JSON API at
  `dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=X&categoryCode=Y`
  — hitting that directly (curl/WebFetch) returns the real DQAF narrative
  text without a rendered browser session.
- **imf.org PDF *documents* (not press releases) 403 everything** —
  WebFetch, curl (even with a browser UA), Wayback Machine proxying, all
  403. **Fix**: navigate Chrome to `https://docs.google.com/viewer?url=<url-
  encoded-pdf-url>&embedded=true` — renders as a normal page. Use `find`
  (natural-language search), not `get_page_text`, to check whether a phrase
  exists in a long lazy-loaded document — `get_page_text` truncates at a
  byte cap.
- **Some government portal landing pages are JS-rendered and return nothing
  useful to WebFetch** (seen on `.ca`, `.gov.mx`, `.gov.ph`, `inegi.org.mx`
  index pages) — search for the underlying document/sub-page instead of the
  portal shell. **`.docx` evidence URLs aren't renderable by WebFetch at
  all** — download and extract `word/document.xml` directly.
- **A soft-404 can return HTTP 200 with a JS alert body saying the file
  doesn't exist** (`mods.go.kr`) — read the actual body, not just the status.
- **A WAF/Incapsula/Cloudflare block can look identical to real content at a
  glance** (`bcentral.cl`, `dane.gov.co` returned HTTP 200 with a
  JS-challenge shell) — confirm via `file` on the downloaded body, not just
  the status code, and cross-check with an independent source before
  trusting a quote.
- **ibge.gov.br's main site sits behind a Cloudflare JS challenge that
  silently 403s WebFetch** (caught fabricating plausible content for a
  403'd URL once) — use a real browser session, or fetch documents directly
  from `ftp.ibge.gov.br` / `biblioteca.ibge.gov.br` / `concla.ibge.gov.br`.
- **`mnr.gov.cn` was entirely unreachable from the sandbox** (DNS/proxy
  failure, both WebFetch and curl) — worked around via mirrors
  (creva.org.cn, MOFCOM's fdi.mofcom.gov.cn) and gov.cn's own announcements.
- **A GROKREADME.md claim that a standard id "already exists in the corpus"
  is not itself verified** — `sna-1993` was cited this way but doesn't exist
  (only `sna-2008`/`sna-2025` do). Worth a scope call if enough countries
  cite SNA 1993 specifically to be worth minting as its own node.
- **Grok will reuse one jurisdiction's exact quote/URL as "evidence" for a
  different jurisdiction's claim** when the document shapes are similar. The
  tell for illegitimate reuse is the quote naming a specific *other* place.

---

- **`zip` writing directly into a mounted device folder can fail** ("zip I/O
  error: Operation not permitted... was replacing the original zip file"),
  even though plain writes (`echo >`, `cp`) to the same folder work fine —
  looks like zip's temp-file-then-atomic-rename step doesn't survive the
  mount. Fix: `zip` to a path under `$HOME` (outside `mnt/`), then `cp` the
  finished zip into the mounted folder. 2026-08-25.

## 7. Standing decisions — do not re-raise

Geo-exploration: dropped entirely. Right-drag panning + low-end zoom:
confirmed solid. Arrow-key fly navigation: offered, declined. Parked: 134
uncountable cadences; 7 single-use `proposed:` tags; `diary.csv` is Thomas's
personal file — leave it alone.
