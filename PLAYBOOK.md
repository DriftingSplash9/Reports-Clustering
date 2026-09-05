# PLAYBOOK.md — standing rules, traps, architecture

**Reference material, not state.** How the repo works and what bites
people. Current corpus numbers and the live todo list belong in `HANDOFF.md`.

**This file is read in full by every agent, so its length is a tax on every
round.** It was split on 2026-09-04, at 80,301 characters, of which §6 alone
was 50,193 — 65 of its 84 bullets were fetch plumbing and 24 carried host
readings the file itself said to re-probe. Three destinations now, and the
test is which one a new paragraph belongs in:

- **here** — only if an agent who never reads it makes a WRONG DECISION, on a
  task it was not expecting;
- **`notes/techniques-<date>.md`** — a recipe for one kind of job, read when
  doing that job;
- **`notes/routing-snapshot-<date>.md`** — anything about which host answered
  which machine, which is stale on arrival.

An unapplied finding awaiting a ruling lives in `HANDOFF.md`, not here, and
arrives here as a rule only once Thomas has ruled. A trap now guarded in code
gets one line naming the guard, not the story. **When you add to §6, say what
you would remove** — the previous three months added and never removed.

---

## 1. Read these, routed by task

**Routing lives in `HANDOFF.md` §1 — one table, not two.** Read `HANDOFF.md`
first, then §2, §6 and §7 of this file; go to the rest of this file and to
`notes/` only where that table sends you.

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts`, `hierarchy.ts`,
`InfluenceGraph.tsx` carry dated comments explaining every constant. Read
the comment before changing the number — several say "do not raise this"
and mean it.

---

## 2. Standing rules

1. **Never run git from an agent session — not even read-only.** Never
   state git status in any doc; ask Thomas or read a screenshot, and
   delete any git-status claim you find.
2. **No document, no edge.** If nothing published says the dependency
   exists, it doesn't go in the graph.
3. **A pointer is not a source.** WebFetch can fabricate content for a
   dead URL — raw-verify before trusting any quote. Applies to the Grok-derived
   slices too, including node descriptions: a description naming a standard is a
   lead to verify, not a citable basis.
4. **`npm run validate` before and after any data change** (120+ checks);
   it can't run through the device bridge. Recipe: stage `src/ scripts/
   package.json tsconfig.json index.html vite.config.ts START-HERE.md`
   (full `src/data/research/` corpus included) into a Linux sandbox,
   `npm install`, `npm run gen`, then tsc/validate/build. Fastest way to
   move 270+ research JSONs across the bridge: zip `src/data/research/`
   on-device into `_to_delete/`, stage that one file, unzip in the
   sandbox. Reuse a live sandbox with `node_modules` already installed
   across rounds in the same session. Any `tsx`/`vite`-driven script fails
   via `device_bash` (Windows `node_modules` vs. the bridge's Linux shell
   needing `@esbuild/linux-x64`) — same recipe fixes it. Plain
   `tsc --noEmit` is unaffected and runs fine directly via `device_bash`.
5. **`public/corpus-data.json` is generated** (`npm run gen` /
   `scripts/gen-slices.ts`) — never hand-edit it. Fresh sandbox → run
   `npm run gen` first.
6. **Agents cannot delete device files** — `mv` into `_to_delete/`, log it
   in `_to_delete/README.md`. Emptying it is Thomas's job.
7. **Headless verification is expected**: build + `vite preview` +
   Playwright on the preinstalled Chromium with `--use-angle=swiftshader
   --enable-unsafe-swiftshader`. Geometry/colour/pixel counts are exact;
   bloom/glow is untrustworthy in software rendering; CSS transitions can
   wedge under load.
8. **Measure before believing.** A number nobody ran anything to get is a
   guess. For the layout forces the instrument is committed:
   `npx tsx scripts/measure-forces.ts` (sandbox, ~1.5 min per run; `SPREAD=`,
   `SEEDS=`, `CRS=` env vars). Every earlier force calibration used a
   throwaway script that was deleted, and one of them (the 2026-08-28
   cluster-repulsion sweep) turned out not to reproduce — read `onscreen`,
   run more than one seed, never let simulation state leak between runs.
9. *(Retired 2026-09-05 — it governed prompts relayed to Grok, and Grok is
   no longer used in this project. Number kept so cross-references hold.)*
10. **A `_dropped` entry describing an edge that DOES exist live must use
    `reason: "caveat"` (or `"resolved"`), never any other reason** —
    applies to every `DroppedReason`. Before finalizing any `_dropped`
    entry, check its exact (source, target) against the WHOLE corpus's
    live edges, not just this round's proposals.
11. **Build the id-collision and edge-collision checks from the whole
    corpus, not just `src/data/research/*.json`** — some ids/edges live
    only in the hand-written seed files (`src/data/reports.ts`,
    `src/data/dependencies.ts`).
12. **A dependency edge between a node and its `part_of` container is a
    validator ERROR.** Before minting, cross-check every new edge's
    (source, target) against the corpus-wide `part_of` map in both
    directions; drop matches as a `note`.
13. **A fresh, well-verified finding that contradicts an already-live edge
    isn't automatically right.** Caveat the existing edge, defer the new
    claim — don't silently override.
14. **Rule 10's mirror image is the one that bites: also check this
    round's new EDGES against every OTHER slice's existing `_dropped`
    notes.** Minting an edge some earlier round recorded as `no-document`
    makes that note a lie, and validate fails on it. Read the older note
    before assuming your new edge wins — it may have the better evidence.
15. **A page title is not evidence.** Read the body, not just the
    title/heading.
16. **Eurostat's national reference metadata is the highest-yield source
    for "which standard / which source" questions on an EU/EEA country.**
    Filename is versioned per country: `prc_hicp_esmshi4_<cc>.htm` for
    PL/EL/ES/HU/HR/BG/LT, `prc_hicp_esmshi3_<cc>.htm` for
    SK/SI/EE/LV/MT/CY/IS, 404 for FI (try hi4, fall back to hi3; Greece is
    `_el` not `_gr`). `employ_simslfs_<cc>.htm` answers "is LFS the
    national-accounts employment source" as an explicit Y/N field (no such
    page for Iceland). No government-finance equivalent exists
    (`gov_10dd_*_esms_<cc>.htm` 404s everywhere tried) — for deficit/debt
    go to the NSI's own EDP release page instead.
17. **ASEANstats (`cdn.aseanstats.org/public/...`) is the reliable
    workaround for an unreachable ASEAN NSO** — supplied Myanmar's BPM6
    basis and Thailand's SNA 2008 basis when their own domains were dead.
    **ilo.org itself** hosts labour-force-survey reports stating ICLS
    compliance when an NSO's own pages are blocked (supplied Iraq's and
    Vietnam's ICLS edges). The old ILO microdata catalogue
    (`webapps.ilo.org/surveyLib`) is retired.
18. **A new slider-driven force needs TWO effects or it's inert the
    moment the graph settles** — every d3 force here is alpha-scaled, and
    alpha has decayed to ~0 by the time anyone touches a slider post-fit.
    Wire both (copy `view.geoAffinity` in `InfluenceGraph.tsx`): a reheat
    effect (`d3ReheatSimulation()` on the value changing) and a
    300ms-debounced `requestRefit()` on the same dependency, because
    reheat moves the cloud and nothing else re-fits. **Shipped broken
    three times this way already** (geoAffinity, galaxy,
    clusterRepulsion) — each time the force itself was correct and
    measured, and each time the slider did nothing until this pattern was
    applied. Add both effects in the same commit as the force; verify by
    dragging the slider, not by measuring the force in a script.

**Process rule.** `HANDOFF.md` stays short — edit its Current State/Todo
directly (overwrite, don't append) each turn; copy to
`archive/Previous Handoffs/` only before a structural rewrite. **A wholesale
rewrite of the file counts as structural even when the section headings are
unchanged** — the test is whether the prose you are replacing would be
unrecoverable afterwards, not whether §1-§4 still exist. There is no git
safety net here (rule 1), so an un-archived overwrite destroys the previous
state permanently. Missed on 2026-08-29/30: HANDOFF.md was overwritten three
times in one session and archived only retrospectively, from a copy that
happened to still be in the session's context. Archive first, then rewrite. A new
standing rule or trap goes here, not `HANDOFF.md`. Hand off rather than
push on when you re-derive something already settled, contradict an
earlier answer, retry a tool past its documented once-only policy, or the
session has been through a compaction. Project memory: write entries as
you go; if it refuses, park a note in `notes/` and flag it in
`HANDOFF.md`.

---

## 3. What the app is now

Assume all of this exists and works; each has a dated comment at the site.

- **Lenses** (`modes.ts`): STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW —
  recolour via ref + mutation effect, never a `forceGraph` memo dep.
  GROUPS/WORLD are disabled at tier 1.
- **Constellation look**: near-black bg, flat panels. The whole bottom edge
  is one dock (`bottomDock`, App.tsx): tier bar left, Compare + GroupsPanel
  + Legend centre, Unlinked pill right, empty fourth track reserving the
  View panel's column. No bottom panel carries fixed coordinates. Top row
  (search bar, calendar tab) is still hand-anchored.
- **Reports/View panels** stop their scroll above the tier bar
  (`REPORTS_PANEL_BOTTOM_CLEARANCE` / `VIEW_PANEL_BOTTOM_CLEARANCE`).
- **Hover** = identity chip; **click** = Detail card from the right (host
  link); **edge click** = evidence card from the left (endpoints, type,
  period, verbatim basis, evidence_url). Camera refits unconditionally on
  every filter change (deliberate).
- **Edges/pulses have SET SIZES** (`baseLinkWidth()` = 1); weight lives in
  rest length + opacity. Never reintroduce additive/white pulse cores or
  faceted node geometry (fresnel rims). **Continuous-database nodes/edges**
  (`Report.continuous`, 35 nodes) draw with a soft boundary-fading sphere
  (alpha only, no colour) and an animated beam flow instead of teardrop
  particles.
- **No distance fog/haze** — removed outright (too hard on the eyes): no
  `ViewSettings.fog`, no slider, no `scene.fog`. `showHorizon` (sky
  gradient) is untouched.
- **No glow/bloom** — removed (was masking, not fixing, dark-node issues).
  Don't reintroduce it to "fix" a dark node — that loop produced the
  inverted authority encoding in the first place.
- **No force-centre** — `forceCenter` strength is 0; it's a runaway
  translation, not inter-cluster separation. Use `charge`'s
  strength/distanceMax, or `clusterRepulsion`, instead.
- **Rims are off in the dark scene** — a rim is a silhouette tool, valid
  only where the interior is empty; hollow one-off instruments keep
  theirs, nothing else does. Blueprint mode (the other empty-interior
  case) was deleted.
- **Link springs are damped on cross-cluster hubs** (`LinkDatum.stiffness`)
  — d3's default `1/min(deg)` makes a leaf-to-hub spring maximally stiff,
  nailing every country touching `sna-2008`/`esa-2010` to the middle.
  Damping is gated on how many DIFFERENT countries the busier end touches,
  so a country's own internal spine is left alone. Don't re-gate this on
  degree.
- **Menu bar**: Panels ▾ (fresh sessions default all 8 ON-and-minimized),
  Views ▾ (saved views, ★ open-on-load, deep links via `?rig=`), Help ▾
  (renders START-HERE.md raw). Tier bar + status line are deliberately NOT
  in the menu.
- **Disclosure folds TWICE** (`hierarchy.ts`): tier ladder → family orbs
  (`orb:`) → per-country orbs (`corb:`) until a country is double-clicked
  open. Orb `country` is the MODAL member (display-grade) — membership
  checks always read `.members`. No UI to re-fold one country short of
  Reset (known gap).
- **Galaxy clustering** (`galaxyForce.ts`, `view.galaxy`) pulls nodes
  toward their own family/country centroid — read its file comment and
  `geoAffinity.ts`'s before touching either, similar-looking but different
  questions. Provinces aren't a third level (most `region` values are free
  prose).
- **Isolate** (`view.isolateFocus`) hides everything off the traced chain,
  built on the unfiltered index so cross-border edges survive. **Groups
  panel** isolates continents/blocs/publishers/countries the same way via
  multi-seed `computeGroupFocus`; neighbourhood slider bounds the walk by
  hops. Search runs over the full corpus and tags results "outside
  filter"/"outside isolate."
- **Unlinked shelf** = a one-line summary pill → searchable list inside
  the Reports panel.
- **Escape** clears one level, topmost first (edge card → selection →
  group isolate); panels consume their own Escape. "/" ignored while any
  input has focus.
- **PNG export**: 2× DPR, no HUD, re-entry-guarded, 8192px capture clamp.
  Zoom baseline freezes while the user owns the camera (`frozenBase`).
- **Loading curtain**: opaque until settled+fitted; 25s safety timeout is
  load-bearing; a corpus-fetch failure pins it with an error instead of an
  empty scene.
- **Sliders**: cluster spread 200%–10000% (opens 200%), geo-affinity
  0–500% (opens 150%), zoom 0.25–2.6 of fit.

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

## 5. Grok — retired

**Grok is no longer used in this project** (Thomas, 2026-09-05: no prompts,
no queue, no Grok todo items). The `*-grok-2026-08.json` slices stay as data
and are verified and graded like any other; the old prompt files and diary
references are gone. Section number kept so `§6`/`§7` references hold.

---

## 6. Known traps

**This section is for traps that change a decision on ANY task.** Recipes for
a particular job live in `notes/techniques-2026-09-04.md`; which hosts answered
which machine on a given day lives in `notes/routing-snapshot-2026-09-04.md`,
and is expected to be wrong. The verbatim pre-split §6 — every war story, every
dated host reading — is at
`archive/playbook/PLAYBOOK-2026-09-04-1938-pre-split.md`.

**Admission bar, and it is now enforced: a bullet belongs here only if an
agent who never reads it will make a WRONG DECISION, on a task it was not
expecting.** A recipe goes to techniques. A host reading goes to the routing
snapshot. A trap now guarded in code gets one line naming the guard. An
unapplied finding lives in `HANDOFF.md` until Thomas rules on it, and moves
here only as a rule, once.

### Schema and closed unions

- **`RelationshipType` is a closed 4-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `cites`). An off-union value →
  NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation` is
  only `audits`/`supersedes`. Same for `Domain` and every closed union: check
  `types.ts` before inventing a value, cast rather than parse.
- **`jurisdiction_level` has no "national" value.** The union is
  `international, supranational, federal, provincial, municipal,
  institutional` — a unitary country's national publisher is `"federal"`.
  Passes JSON parsing, fails only at `npm run validate`. Hit 4/4 times on the
  first pass of one round.
- **`reference_period` is a structured `{readings_per_year, window_months,
  ends}` object**, not free text. 11 edges failed validation for this in one
  round.
- **A `report_id`/`candidate_target`-shaped `_dropped` entry has no
  `source`/`target` fields at all** — rule 10 applies to `edge`-shaped entries
  only. Tagging one `"resolved"` makes the validator read `undefined ->
  undefined` and fail. They stay `reason: "note"` permanently; prepend
  "RESOLVED …" to the `note` instead.

### Evidence, quotes and grading

- **`public/corpus-data.json` STRIPS `evidence_quote`**, so an edge read out of
  the generated corpus always looks unquoted. Twelve edges were worked as
  unquoted in one round and already had a quote. Read the slice JSON in
  `src/data/research/` before concluding an edge has none — or before writing
  over one.
- **Take grade counts from `npm run validate`, never from
  `public/corpus-data.json`** — the generated file holds the 347 research
  slices and misses the ~10 edges in the hand-written seed files (rule 11), so
  mixing the two produces a grade line that does not sum to the corpus.
- **`evidence_quote` IS the span — never run it through `extractQuotedSpans`.**
  That helper pulls out DOUBLE-quoted text, which is right for free-text
  `basis` and wrong for a field whose whole content is the quote; for six weeks
  the grader could not read back its own output. Anything checking an edge
  against its document goes through `spansForEdge`.
- **Single quotes are not a span delimiter and most of this corpus quotes with
  them** — deliberately, because apostrophes are ambiguous. An edge whose
  `basis` quotes in single quotes reads as "no quoted span" and caps at B. 476
  live edges were in that state. Look at the `basis` yourself before concluding
  an edge has no checkable evidence.
- **A node's TITLE is a matcher input, not just a label.** `namesTarget` needs a
  contiguous run of ≥60% of the title's words, and the title-lead fallback needs
  ≥3 words before the first dash/comma/colon. A long descriptive title fails
  silently and looks like missing evidence — BIS's six-word page title would
  score 2/6, which is why the node is titled `Basel III`. This does not license
  inventing titles (§7 still holds); it means **check the run arithmetic when a
  publisher offers both a short name and a long one.**
- **`normalizeForMatch` runs NFKD, so Unicode numeral and ligature forms fold to
  ASCII** — `Ⅲ` (U+2162) becomes `III`. Useful, and a trap: `바젤Ⅲ` normalizes to
  the single token `바젤iii`, and since Hangul and Latin are both `\p{L}` there
  is no split for the ≥2-word run rule to use.
- **A document read by a second route caps at B** (§7). Any new fetch strategy
  inherits it: if the bytes did not come from the cited URL on the live host,
  the edge cannot be an A however cleanly it clears every other bar. Record
  WHICH route in the committed evidence record (`via:`).
- **An archived snapshot may rescue a WALL; it must never rescue a 404.** A
  wall says only that this machine could not read it. A 404 says the citation
  has rotted, which is exactly what the dead-URL debt list measures — grading it
  off an archived copy hides link rot behind a good grade.
- **Never edit a `basis` or a quote to move a grade.** If an evidence record is
  graded down by a matcher defect, fix or report the matcher. Trimming the
  record is grade-motivated editing and it hides the defect from everyone after
  you.

### Claims about the world that are really claims about your tools

- **"The sandbox can't read it" and "the site is walled" are different claims,
  and this repo has been conflating them for months.** There are three networks
  and none is a superset of the others (see the routing snapshot). Before
  recording a host as walled, **say which machine you were on** — and re-test
  from the other one, which is a 20-second check.
- **A 404 from a single-page-app route is not link rot.** 58 EDP-inventory edges
  were dropped as DEAD-URL because CIRCABC's `/ui/.../details` pages 404 to curl —
  while Eurostat's own listing still linked every one of them and
  `https://s-circabc.europa.eu/rest/download/<id>` served each PDF (Round C,
  2026-09-05). Before recording a 404 as rot, check whether the host is an SPA
  (an Angular/React shell with the same byte count for every path) and whether a
  first-party page still links the URL; a REST/download endpoint usually exists.
  The Commission documents-register (`api/files/<ref>_0/<id>`) and DCC Tanzania
  (`/api/pages/slug/<slug>`) are the same shape.
- **A "ROBOTS_DISALLOWED" verdict is a statement about the FETCH TOOL, not the
  site.** WebFetch obeys robots.txt; curl with a browser UA does not, and
  neither does a browser. An entire Taiwanese cluster was written off this way
  while being wide open to curl the whole time. Treat every historical "robots"
  note in the corpus as untested.
- **A blocked verdict decays — re-probe before believing your own notes.**
  Routing changed three separate times inside 24 hours during the 2026-09-04
  rounds, in both directions. This is why host readings are in a dated file
  rather than here.
- **WebFetch cannot produce evidence-grade verbatim** — it caps quotes at ~125
  characters and refuses full reproduction. It can establish a negative or
  locate text; a mintable quote needs a real browser or another host carrying
  the same document.
- **A page title is not evidence, and neither is a node description.** Read the
  body. Grok's imported descriptions naming a standard are leads to verify, not
  citable bases.
- **The Grok-derived slices carry Grok's habits** (Grok itself is retired,
  §5): ids and enum values that were inventions, one jurisdiction's exact
  quote and URL reused as evidence for another — the tell is a quote naming a
  specific *other* place — and the same region minted under different batch
  names. Grep against the FULL corpus (research files AND seed files) before
  trusting any of it.

### Renderer invariants

- **Never put a mode, tab, hover or view setting in the `forceGraph` memo
  deps** — every change there resets the camera and re-warms physics.
- **`meshes.current` cannot be trusted for POSITIONS** — read `positionedById`
  or `graphData().nodes`.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`. `onPointerMissed` can fire twice per click; the
  edge-pick path always OPENS, never toggles.
- **A cap that silently binds costs twice** (node size AND edge width) —
  whenever a slider ceiling moves, recompute `nodeScaleFor`'s cap.
- **Camera cannot end up inside the cluster by raising spread** (fit = 5.675 ×
  p95; measured ratios ≤ ~2). Spread saturates past ~1000%.
- **`PanelShell` supports one panel per edge; the bottom edge belongs to the
  dock.** A new bottom panel is a one-line dock-cell addition. Reserve dock
  space with an empty grid TRACK, never an item margin.
- **Menus close on `pointerdown`, not `click`**; synthetic drags do NOT reach
  OrbitControls (use `autoRotate` in harnesses); CSS transitions wedge under
  software rendering.
- **Any frame or draw-call number is wrong until measured the documented way** —
  see techniques §6. The two that have burned rounds: `renderer.info.render`
  reads `calls 1, triangles 1` from outside the render loop, and waiting two
  rAFs counts two frames.
- **The grader's A bar reads presence, not meaning** (found 2026-09-05): it
  awarded A on "Classifications … are *not in conformity* with … ISIC".
  `NEGATED_QUOTE_PATTERNS` (denies / diverges / defers / hedges) now caps such
  quotes at B and `--scan-quotes` lists them without network; but a new
  phrasing the guard has not seen still grades A. Read the quote, not the grade.
- **Your own basis prose can cap your edge.** `WEAK_BASIS_PATTERNS` matches
  anywhere in the basis — "the EH is the *complementary* annual source" turned
  an A into a B twice on 2026-09-05. Never write consistent / complementary /
  comparable / aligned / presumably in a basis, even descriptively.
- **`zip` on the device mount cannot rename its temp file** onto the target:
  you get a 0-byte zip plus a random-named complete one. `cp` the temp file.
- **`onBeforeCompile` never fires for a mesh that is hidden before its first
  render** (2026-09-05, node instancing). Every sphere is now `visible = false`
  from frame one, so anything a material used to create inside
  `onBeforeCompile` (the rim uniforms) does not exist — resolve it at
  construction and put it in `userData`, which is where the instancers read
  from. The three mirror instancers (`photon`/`link`/`nodeInstancing.ts`)
  are the only draw path; the library's meshes are state + picking only.


## 7. Standing decisions — do not re-raise

**Bar for adding to this section: a rule that will change how a FUTURE
round decides something, not a record of one specific edge's fate — the
data's own `_dropped`/live entry is that record.** A one-off single-
node/single-edge call belongs there, not here as its own paragraph.

**A backfilled `evidence_quote` needs a reader's acceptance, and the reader
records a reason for every refusal** (Thomas ruled "an agent reviews by slice",
2026-09-03; executed the same day). The grader proposes; it never accepts its
own proposal, because an A that rests on "this script found a sentence it liked,
twice" is not evidence. The accept test is one question — *does this sentence,
in this document, say the source depends on the target?* — and a rejection is
written down with its reason, because the rejections are where the research debt
is measured. Round 4: 213 read, 106 accepted, 107 refused with reasons
(`Claude outputs/quote-backfill-review-2026-09-03.json`). Round 5: 476 read,
370 accepted, 106 refused (`quote-backfill-sq-review-2026-09-03.json`).

**A document read in Thomas's own Chrome grades as the direct read it is; only
an archived snapshot caps at B** (Thomas, 2026-09-04, ruling on the browser
pass). A snapshot says "this quote was in this document on <timestamp>" — a
copy, on a past date. A Chrome read is the cited URL, fetched live over
Thomas's own network, and the only reason the grader could not take it itself
is a JavaScript challenge curl cannot answer: a fact about the fetcher, not
about the document. The rule lives in `routeCapsGrade()` in
`scripts/grade-evidence.ts`, `via` is recorded either way, and the committed
`evidence-cache/` header carries the route, so a reader can always see where
the bytes came from.

**A re-grade never writes a grade DOWN on a bad network day.** Selecting an
already-graded edge and writing whatever comes back lets one DNS failure or one
Akamai mood destroy a grade earned from a good read. A re-grade pass writes only
improvements; regressions go to a dated JSON for a human, with the host and the
reason (round 4: 33 of them, none written). One refinement from round 5: when
the regression is `quote-not-in-document` on a document the grader **read in
full today**, the network is not the excuse — the quote written that round is
reverted (the field must mean "this span is in the cited document") and the
grade is left as it was. 29 reverted in round 5, listed with the reason.

Geo-exploration: dropped entirely. Right-drag panning + low-end zoom:
confirmed solid. Arrow-key fly navigation: offered, declined. Parked: 134
uncountable cadences; 7 single-use `proposed:` tags; `diary.csv` is Thomas's
personal file — leave it alone.

**Treaty and agreement nodes: retired, do not re-import** (Thomas,
2026-08-29). 72 nodes removed — bilateral/plurilateral trade agreements,
investment-treaty and bloc-membership framings, multilateral conventions.
Full record and examples: `notes/retired-nodes-2026-08-29.json`. **The
reason is structural, not evidential**: a treaty isn't a publication with
a methodology dependency, no research round could ever wire one — they
were 7% of the corpus and 11% of its isolated nodes, all orphans, no edge
broken. **Closed 2026-08-31 (Thomas, ruling 2-A after the audit's D4):
that sweep removed orphans only, so 31 FTA-family nodes that had edges
survived it — retired the same day with `ar-mercosur`, records in
`notes/retired-nodes-2026-08-31.json`.** The class is now retired in
practice as well as principle. Still nothing in the validator stops a
new one — a title regex is too contaminated to trust (see the meta-node
paragraph below); the guard is this paragraph and the reviewer.

**A node's `publisher` is a body, not a derivation note** (Thomas,
2026-08-31, ruling 3-A after the audit's D7). "Derived from UNICEF and
education monitoring sources", "WHO / national sources", "Derived from
international compilations" name a topic with a figure attached, not a
recurring official release, and no document can ever name a topic as an
input — 62 such nodes retired (`notes/retired-nodes-2026-08-31.json`).
A lazy "X / related" or "X / Y related" string on a real release is a
field to fix, not a node to drop — 166 rewritten to the first-named body
(`notes/publisher-cleanup-2026-08-31.json`). The validator's PUBLISHERS
block prints any new one. Don't mint a node whose publisher you can't
name.

**Assertion-only edges are `_dropped`, never live** (Thomas, 2026-08-31,
ruling 1-A after the audit's D1). An edge whose evidence is a publisher
homepage or nothing, and whose basis quotes no document, is a belief —
463 of them went to `_dropped` `no-document` that day with their
original basis preserved, and the validator's EVIDENCE block counts any
new one. "Probably true" is the reason they were dangerous, not a
defence: on screen they were indistinguishable from verified edges. Three nodes look treaty-shaped but deliberately survived:
`ve-ofac-sanciones` (a `part_of` container — removing it orphans two
other nodes), `tr-eu-trade` (named like a treaty, actually merchandise
trade statistics), `sdmx-standard`/`sna-2025` (statistical standards, not
agreements).

**Naming the agency is not naming the artefact** (Thomas, 2026-08-31,
ruling on the second audit's F-05). A document that says the figure comes
from "the Department of Commerce", "ISQ", "FCSC" or "the central bank" —
without naming the release — does not clear the evidence bar for an edge to
that agency's *specific* publication. It is a lead: the release still has
to be found by title. Six such edges went to `_dropped` `no-document` that
day (`hhs-fmap-notice -> bea-state-personal-income`, `qc-decret-population
-> isq-bilan-demographique`, `gcc-stat -> ae-labour`, `dk-edp-inventory ->
dk-govfin`, `br-ibge-pim-pf -> br-ibge-sistema-contas-nacionais`,
`ndb-evaluation-policy -> brics-ndb-agreement-2014`), and REPORTS.md's own
"disclosure stops one level short of a title" note is the reason this is
the normal case, not the rare one. Nothing in the validator can catch it —
the guard is this paragraph and the reviewer.

**"Consistent with" is a claim about numbers, not a citation** (Thomas,
2026-08-31, ruling on the second audit's F-03). A basis that says two series
are consistent, aligned or comparable — and quotes no passage — describes
agreement between figures, not a document naming one as the other's input.
38 such edges (28 of them in the Russian regional slices) were moved to
`_dropped` `deferred` as leads, originals preserved in `why`. The shape to
watch for in Grok output: "X data in national compilations are consistent
with the Y yearbook" — that is the tell.

**An index page is a bare homepage with a path** (Thomas, 2026-08-31,
ruling on the second audit's F-01/F-02). `brics.ibge.gov.br/publicacao.html`
stood behind 23 edges and names no data source; `inegi.org.mx/temas/...`,
Rosstat `folder/<n>` listings are the same class. All 23 went to `_dropped`
`no-document`; `isIndexPage()` in graph.ts now warns on the class (45 more
edges on the day it landed, listed in the validator's EVIDENCE block beside
the bare-homepage count, plus an informational "URLs behind 10+ edges" list —
one URL rubber-stamping dozens of edges is the tell). Same promotion gate as
the other two evidence warnings.

**A legal instrument stays a legitimate node when a statistical release
names it as its own legal/methodological basis** — Japan's Statistics
Act, Brazil's Lei 8.213, the EAEU statistical protocol, national social-
protection acts, the EDP inventories: whole rounds are built on that
family, untouched by the sweep above. The cut is "instrument nobody's
statistics depend on," not "instrument."

**Analytical meta-nodes: 5 retired, sweep deliberately stopped there**
(Thomas, 2026-08-29) — comparison-device/policy-frame nodes with no
publication behind them. **Do not extend this by keyword search: both
obvious signals are contaminated.** "framing" is a Grok verbal tic that
also appears in real statistics-node titles ("Statistics and framing of
remittance inflows"). The corpus's own "meta-node" `_notes` phrasing
describes a node's ROLE IN THE GRAPH, not its nature — it lands on the
Okinawa Statistical Yearbook and Taiwan's Energy Statistics Handbook,
both genuine. A title-regex sweep caught 36 candidates, only 5 were real.

**Above all, never sweep the "— high/low-poverty contrast" nodes.** They
read like analytical framings and aren't — they're real subnational
jurisdictions (Ecuadorian/Peruvian/Uruguayan/Paraguayan/Bolivian/Chilean)
that Grok titled as a poverty-contrast set. They're the bulk of the
unresearched South America seam; deleting them destroys the next round
before it starts.

**A document read from an archived copy caps at B** (Thomas, 2026-09-03,
ruling on round 3d's fetch strategies). An archived read supports "this quote
was in this document on `<timestamp>`", which is a weaker claim than "this quote
is in this document" — and once a grade is written the difference is invisible
on screen. One `A` must not mean two things. **General rule for every future
fetch strategy, not just the Wayback one**: bytes that did not come from the
cited URL on the live host cannot produce an A, however cleanly the edge clears
every other bar. 15 edges were capped the day it was ruled; the guard sits
after the A bar in `gradeEdge` with its own reason string
(`quote-found-artefact-named-via-snapshot`) so the class stays greppable if the
host ever becomes readable again. Consequence worth knowing: `writeGrades` only
writes `evidence_quote` on an A, so **a machine-written `evidence_quote` in this
corpus always means "found in the live document"**.

**A document that names the target artefact IN ANOTHER LANGUAGE names it**
(Thomas, 2026-09-04). `namesTarget()` matches a run of the target's own title
words and every title in this corpus is English, so a French Règlement that
prescribes the HICP by its French name, a Bank of Korea appendix on 바젤Ⅲ, an
NHC yearbook on 国际疾病分类 and Banco Central del Paraguay on the "Sistema de
Cuentas Nacionales del 2008" were all capped at B for the corpus's own
monolingualism. The mechanism is `Report.title_aliases` — read that field's
doc comment before adding one; the three rules there (same artefact not a
related one, sourced from a document actually read, never an acronym or an
agency name) are what stop it becoming a synonym bag. The field earns its
place on the dozen international standards the whole corpus cites in a dozen
languages, not on national releases only ever cited at home.

**A parenthetical acronym from the target's own title names the artefact when
it is four characters or more AND glosses the WHOLE title** (Thomas,
2026-09-04, narrowing the blanket exclusion the dry run wrote). The blanket
exclusion existed for a real reason — `(EDP)` and `(NSW)` matched documents
that named neither artefact — and both of those are THREE characters and both
gloss a component rather than the title, which is what the two conditions are
for. The rule was measured before adoption and it caught its own false
positive on the first run: `pspp-cola-methodology` is "Public Service Pension
Plan (PSPP) Cost-of-Living Adjustment (COLA) Methodology", and an Ontario
release naming the PSPP names the PLAN, not the COLA methodology — the
whole-title condition is what puts that edge back at B where it belongs.

**A quote lifted from a PDF that a landing page serves only through a signed,
expiring token is cited to the LANDING PAGE and recorded as
`via: token-pdf <date>`, which caps the grade at B** (Thomas, 2026-09-04,
ruling on the 17 deferred BPS edges). Citing the token cites a URL that is
dead tomorrow; citing the landing page and quoting the PDF puts citation and
quote one step apart. Naming the route is what makes the pair honest, and the
B cap is the same treatment `wayback` gets for the same reason. General rule
for every agency that publishes this way, not just BPS.

**A node carries the publisher's own title for the artefact, not ours**
(Thomas, 2026-09-04). Six Bolivian department edges sat at B on
`agency-not-artefact` while citing INE's own anuario table, because the node
was titled "Pobreza monetaria por departamento" and INE heads the table
"BOLIVIA: INCIDENCIA DE POBREZA, SEGÚN DEPARTAMENTO". The document WAS the
artefact and the grader could not see it. Retitled to
"Incidencia de pobreza, según departamento (INE)"; all six went to A. When an
edge grades `agency-not-artefact` against a document that is plainly the
target itself, check the node's title against the publisher's before
concluding anything about the evidence.

**Naming an organisation does not name the instrument that created it** (Thomas,
2026-09-05, ruling on the promotion refused in the grader round). The ≥4-character
acronym rule cannot tell the two apart: `gq-inege-anuario-2024` graded A against
`afristat-founding-treaty-1993` on a budget-table row reading "Contribuciones del
Gobierno a AFRISTAT ─ ─ ─ 380", which names the ORGANISATION that the 1993 founding
TREATY brought into being — a membership subscription, not a citation of the treaty
text. The promotion was refused and the edge stays at B. This is the acronym-rule
sibling of "naming the agency is not naming the artefact" and it decides the same
way: a body and the document constituting it are two artefacts, and a document that
names the body has not named the instrument. Nothing in the matcher can catch it —
the acronym is genuinely in the target's own title — so the guard is this paragraph
and the reviewer.

**Chart/figure-caption sourcing clears the evidence bar** (Thomas,
2026-08-30) — a figure-source line under a chart is a citation, same
standing as body-text prose. General ruling for every future round, not
just the edge that prompted it.

**One-off scope calls, already decided — don't re-raise. Reasoning for
each lives in its own `_dropped`/live edge entry, not repeated here:**
- Iran's SNA vintage (`ir-national-accounts` chain) — disregarded, live
  as is (2026-08-29).
- Generic COICOP citations (Iran, Iraq) — no revision-neutral parent
  node minted (2026-08-29).
- Generic MFSM citation (Vietnam) — reversed the next day from a
  COICOP-style decline to wired, since Grok's target was a specific
  versioned node, not a proposed generic one (2026-08-29 → 2026-08-30).
- PH EBEIS node-scope — an information system isn't the statistics it
  produces, declined (2026-08-30).
- TW SIPRI arms-transfers direction — scope mismatch (exports source
  cited for an imports-scoped report), declined (2026-08-30).
- NACE Rev.2 (Türkiye) — same generic-citation shape as COICOP, no
  `nace-rev2` node minted (2026-08-29).
