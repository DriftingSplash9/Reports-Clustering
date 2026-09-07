# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives at the top
level.** When superseded, the new session copies this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and
writes the replacement here. Never two handoffs at the top level.

Last written: **2026-08-25 — Grok research-queue Canada round LANDED.**
Thomas handed over `notes/grok-research-queue-2026-08-22/` (27 numbered
regional prompts + their Grok replies, run over 2026-08-22 through -24 while
Claude was rate-limited — see item 5v in the prior handoff). This session
worked the queue's own stated top tier only: **Canada (prompts 01–06)** — BC,
Ontario-deepen, Quebec-deepen, Prairies, Atlantic, Territories. Domestic
wiring (10–20) and the 8 new-country batches (30–37) are untouched and still
queued; see §5 item 2 below for their state and two data-quality problems
found in that unprocessed material.

**Inventory pass first.** All ~80 reply files parse as clean JSON (the
prose-wrapping problem from earlier rounds didn't recur). Found and corrected
before any verification work: `ontario-deepen-research (9).json` is a
strict superset of 9 near-duplicate snapshots of the same file (confirmed by
id-diff — only `(9)` was used); the 4 cross-border reply files in that folder
turned out to already be landed in the live corpus (`crossborder-round3-*`,
`crossborder-standards-*`) from before this handoff was written — excluded;
a bundling zip duplicated 4 standalone files byte-for-byte — excluded.

**Verification.** Six parallel research agents, one per Canada region, each
independently raw-verified every `proposed_reports` URL and every
`dependencies` `evidence_url`/quote against a live source (WebFetch + curl
where JS-walled, WebSearch as a cross-check) — same standard as every prior
round (a Grok claim is a lead, never a citable source). Combined: 164
proposed reports, 265 dependencies checked. 145 reports verified outright: BC
26/26, Ontario 49/61, Quebec 20/25, Prairies 22/23, Atlantic 14/14,
Territories 14/15. 195 dependencies verified at the per-region pass; a
second, corpus-wide cross-check (endpoints against the full 3,110-id corpus,
not just each region's own attachments) then caught what a single region
can't see on its own — **27 more dependencies dropped** because their source
or target node had itself failed verification elsewhere, plus four
structural problems only visible with the whole graph in view:

- **`statcan-cpi` collision** — the Ontario batch re-proposed Statistics
  Canada's national CPI as a "new" Ontario node under the exact id the seed
  set (`src/data/reports.ts`) already uses. Root cause: the per-region
  verification agents were checking ids against a `_all-corpus-ids` dump
  built only from `src/data/research/*.json`, missing 18 ids that live in
  the hand-written seed files (`reports.ts`/`dependencies.ts`). Fixed for
  this round (merged list); **worth fixing at the source** if another
  session builds a fresh id-dump the same way.
- **Three `on-ompf` edges and one `qc-partage-croissance-tvq` edge**
  independently re-discovered facts already minted in dedicated prior
  slices (`ontario-ompf-mpac.json`, `grok-h1-municipal-ontario-quebec.json`).
  Not re-minted (would have silently superseded the existing, equally-good
  basis under the "later edge wins" merge rule) — recorded as `caveat`
  entries instead, which is the correct `DroppedReason` for an annotation on
  an edge that already exists (a plain `note` on an existing edge is itself
  a validator error — learned this round).
- **`on-opta -> mpac-assessment`** — `on-opta` is an established terminus
  (`terminal_reason: "unpublishable"`, minted 2026-08-09). Grok's fresh
  research independently rediscovered OPTA and proposed an outgoing edge for
  it; a terminus cannot have one by construction. Dropped.
- **`qc-perequation -> isq-vitalite-economique`** — contradicts an
  already-adjudicated finding (`grok-h1-municipal-ontario-quebec.json`,
  2026-08-07) that the péréquation regulation F-2.1 r.11 "nowhere names
  ISQ" and remapped this exact fact to `qc-partage-croissance-tvq` instead.
  This round's citation names a *different* provision of the same
  regulation (s.5.1's "troisième volet" eligibility test) that the earlier
  round may not have checked — genuinely ambiguous, not obviously the same
  mistake recurring. **Deferred, not minted either way** — filed in
  `_dropped` (reason `deferred`) for a human or a future round to read s.5.1
  directly before ruling either way.

**Net mint: 144 new reports, 161 new dependencies, 124 `_dropped` entries**,
across six new slices (one per region, `*-grok-2026-08.json` in
`src/data/research/`). 120 of the 144 new reports have at least one edge; 24
are isolated (kept per the standing "an isolated node is a fact, not
clutter" rule — mostly one-off instruments and thin-coverage territorial
nodes). Sandbox-verified: `npm run validate` clean exit 0 (**3,254 reports,
2,311 dependencies** — up from 3,110/2,150), `tsc --noEmit` clean, `npm run
build` clean at 1,504 kB. Every one of the 124 `_dropped` entries carries the
same detail level as prior rounds — which source, which verdict, why.

**What did NOT get done, and why it matters:** two clear duplicate-prompt
situations turned up while inventorying prompts 10–20 and 30–37 that a future
session should resolve *before* verifying that material, not after — running
the pipeline twice on the same countries risks minting the same fact under
two different ids. Ecuador/Peru/Venezuela/Bolivia/Colombia was run under both
`andean-domestic-wiring-*` (4 files) and `ec-pe-ve-bo-co-domestic-wiring-*`
(2 files), plus Venezuela again solo in `ve-venezuela-domestic-wiring-batch1`.
Jordan/Lebanon/Kuwait/Qatar/Oman/Bahrain was run under both
`gulf-levant-research-*` and `me-gulf-levant-research-*`. **Prompt 18**
(Uruguay/Paraguay/Guyana/Suriname domestic wiring) has no reply file in the
folder at all — never run, or the reply never made it in.

---

## 1. Read these first, in this order

| # | Document | Why |
|---|---|---|
| 1 | **`REPORTS.md`** — start at "🛑 Agent: read this before doing any work" | The standing rules. Most violated: never run git; every edge needs a document. |
| 2 | **This file, all of it** | Current state, todos, traps. |
| 3 | `START-HERE.md` | Orientation. Rendered verbatim in-app as Help ▸ What this is — editing it edits the product. |

Then by task: anything visual → §5/§6 here, then
`notes/visual-revamp-2026-08-18/visual-revamp-review.md`; camera/fit/layout →
`notes/camera-fit-measurement-2026-08-19.md`; the flicker →
`notes/flicker-tests-2026-08-19.md`; isolate / "why is country X empty" →
`notes/cross-border-gaps-2026-08-20.md`; the cross-border research thread
→ `notes/crossborder-verification-2026-08-22.md`; **any Grok prompt →
`notes/grok-diary.md` FIRST (§8) — including its new §0 on relaying
attachment lists to Thomas separately**; the Canada round just landed →
`notes/grok-research-queue-2026-08-22/00-README.md` for the remaining tiers'
priority order and attachment manifest; regions/blocs/publishers →
`src/lib/regions.ts` file comment; compare/path → `Compare.tsx` file comment;
schema → `src/lib/types.ts`.

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts`, `hierarchy.ts` and
`InfluenceGraph.tsx` carry dated comments explaining every constant. Read the
comment before changing the number. Several say "do not raise this" and mean it.

---

## 2. Standing rules (the ones that actually break)

Full text in `REPORTS.md`.

1. **Never run git here from an agent session** — not even read-only (stale
   lock). **Never STATE git status in any doc either** — a false "uncommitted
   backlog" claim survived unverified for weeks once. Ask Thomas or read a
   GitHub Desktop screenshot; delete any git-status claim you find.
2. **No document, no edge.** If nothing published says the dependency exists,
   it does not go in the graph.
3. **A pointer is not a source.** WebFetch can fabricate content for a dead
   URL; raw-verify before trusting any quote. Applies doubly to Grok output —
   and applies to Grok-imported node DESCRIPTIONS too, not just its
   dependency claims: a summary description that names a standard is a lead
   to go verify, not a citable basis on its own.
4. **`npm run validate` before and after any data change** (120+ checks).
   It cannot run through the device bridge. Recipe: stage
   `src/ scripts/ package.json tsconfig.json index.html vite.config.ts
   START-HERE.md` (the full `src/data/research/` corpus included) into a
   Linux sandbox, `npm install`, `npm run gen`, then tsc/validate/build.
   **Fastest way to get 270+ research JSONs across the device bridge**: zip
   `src/data/research/` on-device (`device_bash`), drop the zip in
   `_to_delete/` (so it lands somewhere `device_stage_files` can reach and is
   already flagged for later cleanup), stage that one file, `unzip` it in
   the sandbox. One file over the bridge instead of 270.
5. **`public/corpus-data.json` is generated** (`npm run gen` /
   `scripts/gen-slices.ts`). Never hand-edit it; it must exist before
   tsc/validate/the app resolve data. Fresh sandbox → run `npm run gen` first.
6. Agents cannot delete device files — `mv` into `_to_delete/`, log it in
   `_to_delete/README.md`. Emptying `_to_delete/` is Thomas's own job.
7. **Headless verification is expected**: build + `vite preview` + Playwright
   on the preinstalled Chromium with
   `--use-angle=swiftshader --enable-unsafe-swiftshader`. Geometry/colour/
   pixel counts exact; **bloom/glow untrustworthy** in software rendering;
   CSS transitions can wedge under load.
8. **Measure before believing.** If a statement has a number in it and nobody
   ran anything, it is a guess.
9. **Any prompt a Thomas-in-the-loop human relays to a third party (Grok,
   etc.) needs its attachment/action list told to him separately, in plain
   chat text, not just inside the pasteable block** — he skims or skips the
   prompt itself. See `notes/grok-diary.md` §0 for the case that established
   this (round 3, 2026-08-22).
10. **A dropped-edge `_dropped` note describing an edge that DOES exist in
    the live graph must use `reason: "caveat"`, never `"note"`.** `"note"`
    means "not a dropped edge at all", and the validator errors if its
    source/target names a real edge — learned the hard way 2026-08-25 when
    three legitimately-already-minted rediscoveries got flagged `note` and
    failed validate. `"caveat"` is the reason built for exactly this: an
    annotation ON a minted edge.
11. **Build the id-collision check from the WHOLE corpus, not just
    `src/data/research/*.json`.** 18 ids (`statcan-cpi`, `statcan-lfs`,
    `boc-mpr`, etc.) live only in the hand-written seed files
    (`src/data/reports.ts`, `src/data/dependencies.ts`) and won't show up in
    a naive `grep -r '"id"' src/data/research/` sweep — exactly the gap that
    let a Grok batch re-propose `statcan-cpi` as a "new" node this round.

**Process rules (Thomas, 2026-08-20).** Update this file every work turn, not
just at milestones: copy the current file to `archive/Previous Handoffs/`
first, then append a dated section — additive, not a rewrite (a full rewrite
is reserved for when the file goes unwieldy; that's what happened 2026-08-22,
and again 2026-08-25 to fold in the finished BRICS G.4 narrative once it was
no longer live work). Hand off rather than push on when: you re-derive
something already settled, contradict an earlier answer, retry a tool past
the documented once-only policy, or the session has been through a
compaction. Say "this is a good point to hand off," write this file, stop.
Project memory: write entries as you go; if it refuses, park in
`notes/memory-pending-<date>.md` and say so here.

---

## 3. Where the project is (2026-08-25)

**Live corpus: 3,254 reports · 2,311 dependencies.** `npm run validate`
clean exit 0, `tsc --noEmit` clean, `npm run build` clean at 1,504 kB. This
is the Canada-round total (144 new reports / 161 new dependencies over the
2026-08-22 BRICS G.4 baseline of 3,110/2,150) — full account in the "Last
written" block above. **Worth re-running `npm run validate` on Thomas's
machine once** — every mint including this one was built and verified from
a sandbox copy, never on-device.

**BRICS (G.1–G.4) — the active branch before this round, now caught up on
its own backlog** (full narrative in `archive/Previous Handoffs/HANDOFF-2026-08-22-brics-g4-full.md`
and project memory `grok_archive_state.md`). Brazil 33/99 nodes wired to an
international standard, 73/99 in the main component; China 22/66 wired,
55/66 in the main component. Two duplicate-node flags still open for
Thomas's call (§5 items 3b/3c below) — nothing wired to either candidate
pending his read.

**Grok research-queue Canada round — LANDED 2026-08-25.** See the "Last
written" block above for the full account. Six new slices in
`src/data/research/`: `bc-british-columbia-grok-2026-08.json`,
`on-ontario-deepen-grok-2026-08.json`, `qc-quebec-grok-2026-08.json`,
`prairies-canada-grok-2026-08.json`, `atlantic-canada-grok-2026-08.json`,
`territories-canada-grok-2026-08.json`.

**Git:** unknown to agents by design — see rule 1.

---

## 4. What the app is now

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
  built on the UNFILTERED index so cross-border edges survive (pinned
  Israel/MERCOSUR test). **Groups panel** ("Regions & Countries",
  bottom-centre) isolates continents/blocs/publishers/single countries the
  same way via multi-seed `computeGroupFocus`. Neighbourhood slider bounds
  the walk by hops. Search runs over the FULL corpus (report AND group
  results) and tags results "outside filter"/"outside isolate"; choosing an
  outside result is an informed exit.
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

## 5. THE TODO LIST (live items only)

### In flight
1. **Canada tier of the Grok research queue — DONE, this session.** Nothing
   further needed for prompts 01–06.
2. **Grok research queue, remaining tiers — domestic wiring (10–20, ~19
   proposed reports / ~194 dependencies once de-duplicated) and new
   countries (30–37, ~90 reports / ~140 dependencies) are still queued,
   unverified.** `notes/grok-research-queue-2026-08-22/00-README.md` is the
   index — priority order (wiring first, it's the fastest way to shrink the
   unlinked-node count since those nodes already exist; new countries after)
   and the attachment manifest. **Two things a future session should resolve
   BEFORE verifying, not after:**
   - Ecuador/Peru/Venezuela/Bolivia/Colombia was run twice under different
     prompt names with overlapping country sets — `andean-domestic-wiring-*`
     (4 files) and `ec-pe-ve-bo-co-domestic-wiring-*` (2 files) — plus
     Venezuela again solo (`ve-venezuela-domestic-wiring-batch1.json`).
     Jordan/Lebanon/Kuwait/Qatar/Oman/Bahrain likewise, under
     `gulf-levant-research-*` and `me-gulf-levant-research-*`. Diff the pairs
     for overlapping/conflicting edges before verifying either — otherwise
     the same fact risks getting minted twice, possibly under two different
     ids if the reruns picked different `proposed_id`s for the same document.
   - **Prompt 18** (Uruguay/Paraguay/Guyana/Suriname domestic wiring) has no
     reply file in the folder — never run, or lost. Needs re-running before
     it can be verified.
   - Same pipeline as this round: parallel per-region/per-country
     verification agents (raw-verify every URL/quote against a live source,
     check ids against the FULL corpus including `reports.ts`/
     `dependencies.ts`, not just `src/data/research/`), then a cross-region
     pass to catch endpoints that failed elsewhere, then mint, then sandbox
     validate.

### [Thomas] — only you can
3. **Render-consistency / camera-fit bug — DEFERRED by your own call** (deal
   with it after the research round). One cause fixed (`cooldownTime`
   15s→45s); the open suspect is `runFit`'s tracking pass false-tripping
   `userOwnsCamera` via `cameraMovedOffFit` under OrbitControls damping —
   needs live instrumentation BEFORE touching it. Details: 5p section of
   `archive/Previous Handoffs/HANDOFF-2026-08-22-5r-full-pre-slim.md`.
4. **Glow-slider check, one minute, only if** you ever see brightness-only
   flicker at a STABLE camera distance (`notes/flicker-tests-2026-08-19.md`,
   Suspect 3, still untested).
5. **`br-ibge-sistema-contas-nacionais` vs `br-scn` — duplicate-node call
   needed.** Both titled "Sistema de Contas Nacionais" / "...Brasil (SCN)",
   same publisher IBGE, different ids from different research rounds
   (`br-scn` already wired; `br-ibge-sistema-contas-nacionais` unwired).
   Either merge/retire the Grok one, or confirm they're genuinely distinct
   before an agent wires anything to it. Full note in `_dropped` block of
   `brics-g4-partial-2026-08-22.json`.
6. **`cn-stats-law` / `cn-stats-law-impl-regs` vs `cn-statistics-law` —
   duplicate-node call needed.** Same shape as item 5 above. Either the base
   Statistics Law and its 2017 implementing regulations are genuinely two
   documents, or `cn-stats-law` duplicates `cn-statistics-law` outright.
   Full note in `_dropped` block of `brics-g4-2026-08-22.json`. Nothing
   wired to any of the three pending his call.
7. **`qc-perequation -> isq-vitalite-economique` — needs a human read of
   Quebec regulation F-2.1 r.11 s.5.1 directly** (this round, 2026-08-25).
   See the "Last written" block above — a genuinely ambiguous case between
   two different citations of the same regulation, deliberately not minted
   either way. Filed in `_dropped` (reason `deferred`) in
   `qc-quebec-grok-2026-08.json`.

### [Agent] — next build rounds
8. **"Why so few?" affordance** on group isolates — "Middle East → 6 shown"
   is correct (cross-border gaps) but reads as a bug with no explanation on
   screen. More useful as the gap list shrinks.
9. **Re-fold / "N countries opened" affordance** — currently only a full
   Reset re-folds an opened country; no readout of how many are open.
10. **Typed edges** — what a trunk's "type" means when one line stands for
    many mixed relationships. Not started; needs a design conversation first.
11. **Soft-edge node idea** — `notes/node-surface-encoding-2026-08-19.md`.
12. **Research backlog — BRICS slice closed for now; wider corpus-wide
    candidates-only/`_dropped` backlog outside BRICS still open** (this and
    the prior rounds only ever looked at BR/CN for the international-
    standards angle). Separately, the Grok research-queue backlog (item 2
    above) is now the more concrete, better-scoped next chunk of this same
    "shrink the unlinked/candidates-only count" goal.
13. **Housekeeping** (needs shell): actually delete the tombstoned
    `src/data/slices.generated.ts` and the orphaned `.rig-sweep` CSS rule in
    `uiTheme.ts` (both → `_to_delete/`). `notes/stale-urls-2026-08-20.md`
    exists for the 37 real 404s from the mint's URL check. `_to_delete/` has
    accumulated several sandbox tarballs/zips across sessions, all logged
    safe-to-delete in `_to_delete/README.md` — periodic sweep is Thomas's own
    job per rule 6.

### Standing decisions — do not re-raise
Geo-exploration: dropped entirely. Right-drag panning + low-end zoom:
confirmed solid. Arrow-key fly navigation: offered, declined. Parked: 134
uncountable cadences; 7 single-use `proposed:` tags; `diary.csv` is Thomas's
personal file — leave it alone.

---

## 6. Architecture crib — where things live

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
  `scripts/validate-data.ts` + `scripts/test-logic.ts` (120+ checks). Note
  from this round: **id-collision checks must include `src/data/reports.ts`
  and `src/data/dependencies.ts`**, not just the research JSON files — see
  rule 11 in §2.

---

## 7. Known traps — the ones that actually bite

- **`RelationshipType` is a closed 4-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `cites`). An off-union value
  → NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation`
  is only `audits`/`supersedes`. Grok output routinely invents types — map
  them, never pass them through. Same for `Domain` and every closed union:
  cast, not parsed — check `types.ts` before inventing a value.
- **`DroppedReason` — a `"note"` describing an edge that DOES exist in the
  graph is a validator error; use `"caveat"` instead** (rule 10, §2 — bit
  this round, 2026-08-25).
- **A fresh id-collision check must scan `src/data/reports.ts` and
  `src/data/dependencies.ts` too, not just `src/data/research/*.json`**
  (rule 11, §2 — bit this round: `statcan-cpi` re-proposed as "new").
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
- **Grok's JSON is not reliably JSON** — parse-check first (though the
  2026-08-25 Canada batches came back clean). Its ids and enum values are
  inventions until grepped against the FULL corpus (research files AND seed
  files). Never hand-edit JSON insertions — generate them. Its stated
  `files_received` confirmations are not reliable either. **Its imported
  node DESCRIPTIONS are also not a citable basis by themselves** — a
  Grok-batch description naming a standard is a lead, not a quote; always
  raw-verify against a live primary source before minting off it. **A
  single region/country's own verification pass can't see cross-region
  problems** — dependencies whose endpoint failed verification elsewhere,
  or that duplicate/contradict an already-minted edge from a different
  slice, only show up on a corpus-wide second pass (2026-08-25 finding).
- **Never reintroduce faceted node geometry** (fresnel rims) or
  additive/white pulse cores.
- **The IMF DSBB tables are JS-walled** (use a real browser, not WebFetch);
  its PDF observance reports parse fine headless. imf.org press releases and
  elibrary.imf.org 403 headless fetchers but load in a browser.
- **imf.org PDF *documents* (not press releases) 403 everything** —
  WebFetch, curl (even with a browser UA), Wayback Machine proxying, all
  403. **Fix: navigate Chrome to
  `https://docs.google.com/viewer?url=<url-encoded-pdf-url>&embedded=true`
  instead** — renders as a normal page. Use `find` (natural-language
  search), not `get_page_text`, to check whether a phrase exists anywhere
  in a long lazy-loaded document — `get_page_text` truncates at a byte cap.
- **Some government portal landing pages are JS-rendered and return
  nothing useful to WebFetch** (Canada examples this round: `hamilton.ca`,
  `brampton.ca`, `montreal.ca`, `ontario.ca/laws` all served generic
  landing/listing pages to WebFetch where the actual document lived at a
  specific sub-path) — search for the underlying document/sub-page instead
  of fetching the portal shell; curl+pdftotext or a real browser session
  when WebFetch alone comes back empty on a page you can see resolves fine.
- **ibge.gov.br's main site sits behind a Cloudflare JS challenge that
  silently 403s WebFetch** — WebFetch was caught fabricating plausible
  content for a 403'd IBGE URL once. Use a real browser session for
  ibge.gov.br pages, or fetch documents directly from `ftp.ibge.gov.br` /
  `biblioteca.ibge.gov.br` / `concla.ibge.gov.br`.
- **`mnr.gov.cn` (China's Ministry of Natural Resources) was entirely
  unreachable from this sandbox** (DNS/proxy failure on every attempt, both
  WebFetch and direct curl — different failure shape from the DSBB JS-wall).
  Worked around via mirrors (creva.org.cn, MOFCOM's fdi.mofcom.gov.cn) and
  gov.cn's own announcements.
- **dsbb.imf.org confirmed JS-walled** — every path tried served an
  identical byte-for-byte shell. A real-browser fetch is the only known fix.
- **Grok will reuse one jurisdiction's exact quote/URL as "evidence" for a
  different jurisdiction's claim** when the underlying document shapes are
  similar (2026-08-25 finding, Ontario municipal batch: Hamilton's tax page
  cited as evidence for Brampton's and London's claims; Guelph's financial
  statements cited for Kingston/Caledon/Cobourg). Some reuse is legitimate
  (a genuinely shared provincial page, a shared program mechanism) — the
  tell for the illegitimate kind is the quote naming a specific *other*
  place by name.

---

## 8. Grok pipeline — diary and prompt queue

**Before writing ANY prompt for Grok, read `notes/grok-diary.md`** — the
standing playbook of what works and Grok's dated failure modes. Append a
dated lesson to the diary after processing every Grok reply. Every handoff
carries this pointer (Thomas's standing instruction, 2026-08-22).

Prompts live beside the diary as `notes/grok-prompt-*.md`; the diary's
"Round log" section is the queue state. The 2026-08-22 research-queue folder
(`notes/grok-research-queue-2026-08-22/`) is a separate, larger batch of 27
regional prompts — its own `00-README.md` is the index for that one. Canada
(01–06) landed this session (§3/§5 item 1 above); domestic wiring (10–20)
and new countries (30–37) are still queued (§5 item 2).

---

## 9. How to hand off

1. `cp HANDOFF.md "archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`.
2. Append a dated section to this file (or rewrite only if it has gone
   unwieldy again). §1 stays first.
3. Carry forward what is live; delete what is finished. A handoff that
   accumulates is a handoff nobody reads.
4. Write the project-memory entry; if memory is down, park it in `notes/`
   and say so here.

Only one `HANDOFF.md` at the top level, ever.
