# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the
top level.** When it is superseded, the new session moves this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes
a fresh `HANDOFF.md` in its place. Never leave two handoffs at the top level.

Last written: **2026-08-22 (item 5r — Grok ROUND 2 received and BOTH rounds
raw-verified against live sources: 59/62 evidence entries pass, most with
the quote found verbatim, zero contradictions — but three MERGE BLOCKERS
found before any mint. Full detail in the 5r section immediately below and
in `notes/crossborder-verification-2026-08-22.md`. NOTHING MINTED YET.)**
Previous entry: **2026-08-22 (item 5q — read-only round: Grok's cross-
border-dependency research reviewed, id-collision check + Fable-model
quality read done, round-2 Grok prompt written, several standing decisions
recorded — geo-exploration dropped, right-drag panning confirmed solid,
recycle-bin cleanup is Thomas's own job, camera bug explicitly deferred)**.
Before that: **2026-08-21 (item 5p — GroupsPanel/graph-click isolate-reset
bug FIXED and verified live; the render-consistency/camera-fit bug
reproduced live and partially fixed (cooldownTime raised) but NOT fully
resolved — a second suspect is flagged, not yet fixed; bloom-flicker item
REOPENED)**.

**This update (5r), 2026-08-22.** Verify-only round, Thomas's explicit
choice ("Verify only, report first") after uploading Grok's round-2
results into chat. No source file touched; deliverable is
**`notes/crossborder-verification-2026-08-22.md`** — read it before doing
ANY minting from either Grok file. The short version:
- **Round 2 is what the round-2 prompt asked for**: SD/MU/SL processed (the
  three whose files were never attached in round 1), the four thin
  countries (IR/AF/YE/SY) given honest dated e-GDDS rows framed as
  "recorded obligation, not a living program," and all four 5q sourcing
  problems genuinely fixed (Iraq's ODIN edge replaced with two primary IMF
  sources; the recycled generic ASEAN quote replaced with country-named
  ACSS quotes for ID/PH/SG/TH/MM; Japan's two mis-aimed quotes redone;
  Singapore's 1996-vs-2001 contradiction resolved via the DSBB
  subscription table — Grok's reading confirmed correct against the live
  table: Jan 2001 is the met-specifications date).
- **Raw verification, per §2 rule 3, both rounds, all 62 evidence
  entries**: 59 verified (WebFetch sandbox for PDFs/pages — the SDDS
  observance PDFs all parse fine headless; Thomas's Chrome, with his
  approval, for the five JS-walled dsbb.imf.org tables, five JS-rendered
  IMF press releases, and two eLibrary pages that 403 headless fetchers).
  Zero contradictions, zero dead links, zero fabricated documents. The 3
  non-passes are all secondary: MU's UN-PDF SNA quote (document real,
  section at ~p.826, beyond retrieval), AF's cr06251 supporting quote
  (document confirmed real via eLibrary, quote itself paywalled), and the
  redundant archive.org copy of a singstat page whose live version
  verified.
- **Merge blocker 1, the big one: `RelationshipType` is a closed 4-value
  union** (`calculated_from`/`uses_data_from`/`methodology_depends_on`/
  `cites`, `types.ts`) and Grok used ten types, nine of them off-union
  (`disseminated_under`, `participates_in`, `subscribes_to`, `adheres_to`,
  `member_of`, `feeds_into`, `subject_of`, `aligned_with`, `implements`).
  Off-union = NaN edge weight = NaN PageRank corpus-wide (the §7 trap,
  verbatim). `Relation` (`audits`/`supersedes`) doesn't cover these
  either. Thomas must pick: re-type into the existing union
  (standards→`methodology_depends_on`, membership→`cites` or drop),
  extend the union (a real schema round with RELATIONSHIP_WEIGHT/validator
  /test changes), or split the difference. NOT an agent call.
- **Merge blocker 2: all 15 of round 2's source_report_ids are invented**
  (SD-CBS, MU-Statistics-Mauritius, JP-ESRI, …) — zero exist in the
  corpus; round 1 used real ids throughout. Mapping table in the note.
  Six countries (SD/MU/SL/AF/YE/SY) have NO stats-office institutional
  node at all — attach to flagship reports (their `*-cpi` /
  `*-national-accounts`) or mint institutional nodes; corpus precedent
  exists BOTH ways (id-bps/th-nso/ir-sci/af-dab exist; the 08-20 mint
  excluded ~53 institution-as-node candidates). Thomas's call.
- **Merge blocker 3 (5q's finding, now load-bearing): don't re-mint
  `imf-sdds`/`imf-e-gdds`/`sna-2008`** (already live); the five genuinely
  new nodes are `imf-sdds-plus`, `asean-acss`, `apec-stats`, and the two
  observance-report nodes. Two edges (MU SDDS-Plus, round-2 JP-MIC) target
  `imf-sdds` for SDDS **Plus** claims and should retarget `imf-sdds-plus`.
- **Hold-outs recommended**: MU's SNA-2008 edge (unverified quote AND no
  source node — Grok round 3 or a direct Statistics Mauritius source), and
  AF's cr06251 supporting entry (keep AF's edge on its verified DSBB row).
  Where both rounds cover the same claim, round 2's version wins.
- **Not done, deliberately**: no minting, no schema change, no id
  backfill — Thomas asked for the report first. The mint round starts from
  the report's "Recommended merge plan" once blockers 1 and 2 are decided.
§6 (the full-review punch list) closed with item 5n — see that entry below
for the full nine-item history.
Yesterday (2026-08-20) was a full day
of work ending in item 5h, a HUD layout pass — full detail archived at
`archive/Previous Handoffs/HANDOFF-2026-08-20-5h-hud-layout-pass.md` (itself
superseding the chain of earlier archived handoffs listed at its own top).
This file no longer carries that day's narrative inline; read the archived
copy for the galaxy-pull fix, the `ChipBar` deletion, Legend/Isolate/Regions
panel work, and the full 5h HUD repositioning writeup.

**This update (5i)** fixes a real bug 5h's own layout pass introduced without
either of us noticing at the time. Thomas, 2026-08-21, after scrolling the
Reports panel all the way down: *"I scrolled all the way down and it is
hiding content behind the panel I think needs moved to the top."* This was
the second round of the same report — the first time, both of us concluded
"nothing's actually hidden, that's just the panel's own scroll" and shipped
no fix. That first conclusion was wrong, and the second report is why: it
does not just look scrolled, content that exists is not reachable.

- **Root cause, confirmed by measuring the live DOM, not guessed.** The
  Reports `PanelShell` (`left: 20`, starting at `top: HUD_TOP`) and the tier
  bar (`tierBarWrap`, `bottom: 20, left: 20`, `App.tsx`) both live in the same
  bottom-left corner — a collision the second §7 trap bullet already warns
  about, but that bullet only covers free-floating panels colliding with each
  other, not a `PanelShell` growing tall enough to reach one. The Reports
  panel's own scrollable content (`panel` style, `Hud` component) had
  `maxHeight: 'calc(100vh - 40px)'`, a number that assumed the panel starts
  20px from the top of the viewport. It doesn't — `PanelShell` starts it at
  `HUD_TOP` (44px, below the menu bar), so the old formula let the panel's
  bottom edge run to 100vh + 4px, well past the tier bar's own `bottom: 20`
  position. Because `tierBarWrap` sits at `zIndex: 6` and `PanelShell`'s
  sliding wrapper sits at `zIndex: 5`, the tier bar paints ON TOP of that
  overlap — so a long enough report list scrolls its last entries into the
  tier bar's own row and they render underneath it, invisible and
  unreachable by scrolling further (there is nothing past them; they're
  just covered, not below the fold). Confirmed live via
  `getBoundingClientRect()`/`getComputedStyle()` in Thomas's own running
  Chrome tab before writing any fix: tier bar measured `top: 720, bottom:
  792, zIndex: 6`; the Reports `PanelShell` wrapper measured `top: 44,
  bottom: 816, zIndex: 5` on an 812px-tall viewport — its bottom edge sat 4px
  past the viewport already, and 96px into the tier bar's own row.
- **Fix, `App.tsx`.** New `REPORTS_PANEL_BOTTOM_CLEARANCE = 120` constant;
  the `panel` style's `maxHeight` is now
  `` `calc(100vh - ${HUD_TOP}px - ${REPORTS_PANEL_BOTTOM_CLEARANCE}px)` ``
  — measured from where the panel actually starts (`HUD_TOP`, imported from
  `uiTheme.ts`) down to a line clear of the tier bar's full row (measured
  ~72px tall) plus a real gap, rather than a flat guess. This makes the
  panel's own scrollbar the thing that stops the content, not the tier bar
  silently painting over it.
- **Not touched:** `tierBarWrap` itself, `PanelShell`, any other panel.
  This is the one spot where a `PanelShell`-hosted panel's own height
  formula didn't account for a free-floating neighbour sharing its corner —
  nothing else currently reaches far enough down to have the same problem
  (see the updated §7 trap bullet).
- Verified: `npx tsc --noEmit` clean, `npx vite build` clean, `scripts/
  test-logic.ts` still 90/90 (no data/logic touched) — same sandbox recipe as
  5h, full `src/data/research/*.json` corpus staged so `slices.generated.ts`
  resolves. Then confirmed live, not just built: re-measured the same
  `getBoundingClientRect()` call in Thomas's actual Chrome tab after shipping
  the fix and reloading (Vite HMR) — Reports `PanelShell` wrapper now bottoms
  out at `692`, a clean 28px above the tier bar's `top: 720`, and a screenshot
  scrolled to the end of the report list shows the full "Commercial
  (unranked)" line and the trailing instructions paragraph sitting above the
  tier bar with daylight between them, not under it.

**This update (5j), 2026-08-21.** Thomas asked for a full review — "snoop, try it out,
try and break it... review all the code and files... a detailed report on your opinions
on the ui especially" — before adding more datasets. Done as a READ-ONLY session: no
source file was changed; the deliverable is **`notes/full-review-2026-08-21.md`**, and
the next build round should start from its §6 priority list. Highlights, so nobody has
to re-derive them:
- Validate/tsc/build all clean in a fresh sandbox (90/90, warnings only), matching §3.
- **New HIGH bug, verified live in a headless-Chromium run of the built app**: picking a
  country from `GroupsPanel`'s directory at a folded tier renders a completely BLACK
  scene — `matchesRegionGroup` (`regions.ts`) checks only a node's single `country` for
  the continent/bloc/country kinds, so a family orb's modal country decides membership
  and a folded country seeds an empty isolate. Only `publisher` checks `.members`.
- Also verified live: the Compare pill is UNCLICKABLE at ≤~1400px windows (tier bar's
  opaque wrap paints over it, both z6, TierBar later in DOM); expanded Legend covers the
  Unlinked shelf below ~1800px; one Escape closes a panel AND destroys an active
  isolate; "/" steals focus from the Views name input mid-word; choosing a search
  result silently drops a group isolate; the View panel clips 21px at 720-tall windows
  (same class as 5i, fix never applied to the sibling panel).
- The colour complaint diagnosed as design, not defect: at tier 1, 125 of 204 real
  nodes (61%) are hollow one-off instruments at fill opacity 0.1, most of the rest are
  achromatic INT, and the v4 damp holds ASIA/SA (41% of corpus) at 55–65% chroma — the
  palette tables themselves have ZERO gaps (checked all 3,091 against every table).
  Lenses visibly do nothing at tier 1 (orbs exempt + INT white) — verified by A/B
  screenshots.
- Perf: the 8.6MB bundle is ~95% corpus (move data out of the JS bundle before the
  mint); 2,665 console warnings at startup; `geoAffinity` is O(countries²) per tick
  with per-pair string allocs (~19k pairs at 139 countries — precompute the matrix).
- Data-layer: `calendarEvents` misses every read spilling forward from the previous
  year's anchor (loop needs `startYear − 1`); `strength` is unvalidated (NaN door,
  dormant); `COUNTRY_LABEL` has no validator rule and its absence now hides countries
  from the directory entirely.
- Project memory: was still down during 5j — see the 5k bullet below; it came BACK the same day.

**This update (5k), 2026-08-21.** Thomas: *"lets work through the issues with this
project"* — the first build round off the review's §6 list, items 1–3 as one round
(his pick from four offered scopes). All three shipped, all three re-verified against
the review's own live repro recipes in a fresh headless-Chromium harness (10/10
checks), plus `npm run validate` (**95 logic checks now, up from 90**), `tsc
--noEmit` and `vite build` all clean on the full corpus.

- **§6 item 1 — the black-scene isolate bug, FIXED.** `matchesRegionGroup`
  (`src/lib/regions.ts`): all four group kinds now reach into an orb's `.members`
  the way `publisher` always did, via a new `countriesOf()` helper — an orb's own
  `country` is only the MODAL member, and reading it as membership was the whole
  bug (Japan folded inside `orb:ASIA` seeded an empty isolate → black scene;
  `orb:ASIA` counted into/out of BRICS by whichever country dominated it).
  `GroupMatchable.members` widened to carry `country`. Five pinned tests added to
  `test-logic.ts` (the exact orb-with-JP-inside-RU-mode repro, the bloc mode-vs-
  member case, continent through every member, real-report unaffected). Verified
  live: Regions & Countries → Japan at the Global tier now reads **"16 shown"**
  (was "0 shown", black). Semantics note: at a folded tier the isolate seeds the
  orb standing in for the country — coarse but honest at that disclosure level;
  auto-opening the picked country instead was considered and left for Thomas to
  call. Also fixed the STALE COMMENT that caused this (`hierarchy.ts`'s "only
  affects the flag and the rim shade" note — now a dated scar warning that orb
  `country` is display-grade, not membership).
- **§6 item 2 — the bottom dock, BUILT.** One fixed full-width grid
  (`bottomDock` in `App.tsx`, `1fr / minmax(0,auto) / 1fr / 182px`) now owns the
  whole bottom edge: tier bar left, Compare + GroupsPanel + Legend dead-centre
  (flex-wrap under squeeze), Unlinked shelf right, empty fourth track reserving
  the View panel's column (shelf's right edge stays exactly 214 from the viewport
  edge). All five bottom panels lost their `position: fixed` coordinates and
  became dock children (`Compare.tsx`/`Legend.tsx`/`GroupsPanel.tsx` wraps +
  `tierBarWrap`/`isolatedShelfWrap`); the dock is `pointerEvents: 'none'` with
  per-panel re-enable so the strip between panels stays drag-through. Verified
  live at 1280×720: the Compare pill CLICKS (was unclickable under the tier
  bar), expanded Legend [532..800] vs shelf [822..1054] — no touch (was fully
  covered). One measured lesson mid-build: the first cut reserved the View
  column with `marginRight: 194` on the shelf's cell and the shelf overflowed
  its own track back under the Legend — margins size the ITEM, not the track;
  the empty fixed track is what makes the guarantee real. Rode along: the View
  panel `maxHeight` fix (`ViewControls.tsx`, anchored `HUD_TOP` +
  `VIEW_PANEL_BOTTOM_CLEARANCE` — same class as 5i's Reports fix, panel now
  bottoms at 692 on a 720 viewport with its own scrollbar), and a DEV-only
  fixed-panel overlap tripwire (`App.tsx`, warns on intersecting fixed panels
  every 4s in dev, skips the dock/dialogs/full-screen overlays — §7's trap as
  code instead of prose).
- **§6 item 3 — Escape stack, "/" guard, search-choose state, FIXED.**
  (a) Escape: every panel's own window-level handler now marks a close consumed
  (`e.preventDefault()` — GroupsPanel, Legend, MenuBar, HelpCard, Onboarding;
  the search box stops propagation outright, both branches), and App's handler
  defers to end-of-dispatch (`setTimeout 0` — listener order on window depends
  on mount order, so the flag is only trustworthy after everyone ran) and then
  clears ONE level, topmost first: edge card → node selection → group isolate.
  Verified live: UAE isolated + Legend open, Escape closes the Legend and the
  isolate SURVIVES; a second Escape clears it. (b) "/" now ignores the press
  whenever focus is in ANY input/textarea/select/contentEditable
  (`SearchPanel.tsx`) — typing "US/EU" into Views ▸ "Name this view" keeps all
  five characters and focus, verified live. (c) Search-choose no longer clears
  a group isolate unconditionally (`handleChoose`, App.tsx): a result INSIDE
  the isolate keeps it (selection+isolate now deliberately coexist on this one
  path; `visible` unaffected since `groupFocus` still wins); a result the
  isolate hides carries an **"outside isolate" tag** in the results list
  (`searchOutsideIsolate` prop) and choosing it is an informed exit — it still
  clears the isolate, because keeping it would trip the off-screen-selection
  guard and read as "search is broken". Verified live both ways (tagged rows
  present; inside-choose keeps "16 shown"). CalendarPanel shares `handleChoose`
  and inherits the inside-case behaviour.
- **Not done from §6, deliberately:** items 4–9 (corpus out of the bundle,
  warnings batch, shelf redesign, colour pass, validator rules, search pass,
  calendar year fix, PNG guard, zoom freeze) — next rounds, in the review's
  order. The dock also does NOT change `PanelShell` (left/right edges) or the
  top row (search bar/calendar tab still hand-anchored).
- Verification recipe used (rerunnable): build + `vite preview` + Playwright on
  the preinstalled Chromium with the §2.7 SwiftShader flags; the harness waits
  for the loading curtain to DETACH before clicking (its opacity blocks
  actionability — first harness run failed on exactly this), seeds
  `rig.panels.v1`/onboarding-dismissed via `addInitScript`, and asserts via the
  tier-bar readout text plus `getBoundingClientRect` sweeps.
- **PROJECT MEMORY IS BACK UP, and the parked backlog is cleared.** Writes and
  reads both worked throughout this session. Everything
  `notes/memory-pending-2026-08-20.md` was holding got written to real memory
  files (phase4-complete-and-render-bugs, layout-path-dependence-fixed,
  grok-archive-minted, galaxy-and-isolate, regions-and-groups-panel, plus this
  round's own entry), the WRONG `camera-fit-density-risk-2026-08-19` entry was
  finally corrected in place (5.675× not 2.8×; no post-mint halo possible),
  and `MEMORY.md` was re-indexed. The pending file itself is processed and
  moved to `_to_delete/` (logged in its README) — §3's "memory is DOWN"
  paragraph is now historical.

**This update (5l), 2026-08-21.** Round 2 of the review's §6 list, picking up
item 4 where 5k's "not done, deliberately" note left off — the review's own
framing was "the single highest-leverage performance change available":
`src/data/research/*.json` (200+ files, ~8.2MB) was being pulled into the
browser JS bundle via `slices.generated.ts`'s 200+ ES `import` statements,
making it ~95% of an 8,612 kB production bundle; and `App.tsx`'s startup
validation was firing ~2,665 individual `console.warn` calls on every load.
Both fixed, both verified live, not just built.

- **§6 item 4a — corpus out of the bundle, DONE.** The corpus is now a
  runtime-fetched static asset, not compiled JS. New split:
  - `src/data/assembleCorpus.ts` — the pure merge logic (seed-wins report
    dedup, last-wins edge dedup, dangling/orphan handling, relations
    handling) pulled out of the old closure-based `assemble()` in
    `src/data/index.ts` into a standalone `assembleCorpus(seedReports,
    seedDependencies, slices)` function, so both loaders below share
    identical rules. All the original reasoning comments (the `fed-h15`
    orphan-kept example, the V0.8 last-wins rationale) carried over verbatim.
  - `src/data/index.ts` — now Node-only, used solely by
    `scripts/validate-data.ts`. Reads `public/corpus-data.json` with
    `node:fs` at module scope and calls `assembleCorpus`. Carries a loud
    top-of-file warning not to import it from browser code.
  - `src/data/browserCorpus.ts` — new. `loadCorpusData()` fetches
    `/corpus-data.json` over HTTP, parses it, and calls the same
    `assembleCorpus`. Caches the in-flight promise at module scope (React
    StrictMode double-invokes effects in dev; without the cache that meant
    two fetches).
  - `scripts/gen-slices.ts` — rewritten. Used to emit a 200+-import TS file
    (`slices.generated.ts`); now reads and JSON-parses each research file
    itself and writes one compact JSON array to `public/corpus-data.json`
    (Vite's `public/` copies verbatim into `dist/`, served by both `vite
    dev` and `vite preview`). Same up-to-date-skip behaviour as before.
  - `src/data/slices.generated.ts` — **tombstoned, not deleted** (no
    `device_bash` this session, so no `mv` to `_to_delete/` was possible).
    Content replaced with a comment explaining it's retired 2026-08-21 and
    safe to delete; ends in `export {}` so it stays valid, unused TS.
    **Flagged for a future session with shell access to `mv` into
    `_to_delete/`.**
  - `.gitignore` — added `public/corpus-data.json` (generated, same
    not-tracked status `slices.generated.ts` had).
  - `App.tsx` — `reports`/`dependencies`/`loadIssues`/`droppedNotes` now come
    from `useState<AssembledCorpus | null>` populated by a `useEffect` calling
    `loadCorpusData()`, with an `EMPTY_CORPUS` sentinel used while the fetch
    is in flight (same shape the app's own Isolate feature already exercises
    for empty graphs — confirmed safe by reading `buildGraph`/`pagerank`/
    `disclosureByReport`, none of which throw on empty arrays). Both
    `useMemo`s that used to depend on `[]` now depend on `[corpus]`.
  - `LoadingCurtain.tsx` — new `error` prop. A fetch failure now pins the
    curtain permanently (never auto-lifts via the safety timeout) and shows
    "Couldn't load the report corpus" + the error + a reload prompt, instead
    of silently revealing a permanently-empty scene with no explanation.
  - **Verified live, full sandbox build:** `npm run gen` → `tsc --noEmit`
    clean → `npm run validate` → **95/95 logic checks, identical 3091
    reports / 2070 dependencies** to the pre-change corpus (same numbers two
    independent ways: the CLI validator and the live browser console) →
    `npm run build`: **bundle dropped from 8,612 kB to 1,491.5 kB, a ~82.7%
    reduction** → `vite preview` + Playwright on the preinstalled Chromium
    (SwiftShader flags): tier bar reads "396 of 3091 reports shown", **0
    page errors**. A separate simulated-fetch-failure run confirmed the new
    error UI renders without crashing.
- **§6 item 4b — startup warnings batched, DONE.** `App.tsx` used to
  `console.warn` once per validation issue (~2,665 calls on a full load,
  mostly two repeating shapes: ~1,378 "proposed:" domain warnings and
  ~1,285 "no edges in either direction" warnings). New `logGroupedIssues()`
  buckets issues by message with report-id-shaped tokens and quoted values
  normalized out (`\b[\p{L}][\p{L}0-9]*(?:-[\p{L}0-9]+)+\b` — Unicode-aware,
  needed for accented ids like `mx-cdmx-evalúa`), then logs one line per
  bucket with a count and up to 3 samples; a bucket with exactly one message
  still logs it plain, nothing is dropped. Iterated twice against live
  counts, not assumed: a first narrower regex only caught the
  prefix-shaped warnings (1287 lines left); the id-anywhere-in-message
  version got it to 3 lines total (2 real grouped buckets + one pre-existing
  unrelated `THREE.Clock` deprecation notice). **Verified live: console
  warnings went from ~2,665 to 2 grouped `[graph]` lines**, counts matching
  the CLI validator's independently-computed totals exactly (1,378 and
  1,285). A favicon 404 seen in one run was confirmed unrelated — a repeat
  run waiting for `networkidle` showed zero 4xx+ responses, i.e. a timing
  artifact, not a regression.
- **Not done from §6, deliberately:** items 5–9 (unlinked shelf redesign,
  the tier-1 colour pass, validator rules for `COUNTRY_LABEL`/`strength`/the
  namespace prefixes, search accent-folding + calendar year-boundary fix,
  PNG re-entry guard + zoom-baseline freeze) — next rounds, in the review's
  order. No new pinned `test-logic.ts` regression test was added specifically
  for `assembleCorpus()`; the identical-corpus-count cross-check (95/95
  checks, 3091/2070 unchanged) was relied on instead — worth a follow-up if
  `assembleCorpus.ts` gets touched again.
- Verification recipe used (rerunnable, same shape as 5k's): stage
  `src/`, `scripts/`, `package.json`, `tsconfig.json`, `index.html`,
  `vite.config.ts`, `START-HERE.md`, plus the full `src/data/research/`
  corpus (267 files, batched across six `device_stage_files` calls — a
  single call can't move all of it), into a Linux sandbox; `npm install`,
  `npm run gen`, `npx tsc --noEmit`, `npm run validate`, `npm run build`,
  then `vite preview` + Playwright with the §2.7 SwiftShader flags.

**This update (5m), 2026-08-21.** Round 3 of the review's §6 list, item 5 —
*"Unlinked shelf → summary + list (before it becomes 2,007 dots)"* (§3.6:
*"1,285 six-pixel dots with hover-only identity... the dots stop earning
their place above ~200 items"*). The staged mint adds 722 more candidates on
top of the current 1,285, which would have made it ~2,007 dots with no
browse, no filter and a hit target below every accessibility guideline.

- **`IsolatedShelf` (bottom dock, right cell) is now a single-line summary
  pill, not a scrolling dot grid.** Reads `Unlinked — 1,285 · ASIA 483 · SA
  271 · AFR 157 …` — count first, then up to the top three continents by
  count (a new local `CONTINENT_ABBR` shorthand, deliberately NOT the same
  vocabulary as `ColourFamily` — see its doc comment), trailing `…` if a
  fourth+ continent is folded in. Computed with `continentOf(r.country)`
  from `lib/regions.ts` (already the corpus's one source of truth for
  continent membership — nothing new to keep in sync). The old `isolatedShelfGrid`
  style, the per-dot 6px hit targets, and the dot-grid's own scrolling
  `maxHeight` are gone; the whole pill is now the click target, sized to its
  own text (`isolatedShelfPill`, replacing `isolatedShelfWrap`).
- **Clicking the pill opens a searchable list inside the Reports panel** —
  the review's own framing (*"That's also the honest UI for what the shelf
  really is now: a research queue, not an annotation"*). New App-level
  `unlinkedOpen` state (sibling to `panels`, since the pill and the Reports
  panel are siblings, not parent/child) plus `openUnlinkedList()`, which
  force-opens Reports if it was closed and switches it to the list. `Hud`
  gained an early-return branch: a filter input (title/publisher substring,
  case-insensitive, deliberately simple — §3.5's real search pass is still
  its own open review item) over the isolated set, sorted alphabetically by
  title, rendered as rows in the same colour-dot + title + publisher shape
  `SearchPanel.tsx` already uses. Selecting a row calls the SAME
  `handleSelectIsolated` the old dots called — the Detail card slide-in and
  the row's own selection ring both confirmed working live (see verification
  below), unchanged from before this update.
- **Two entry points, one state.** The dock pill (visible only when the
  `Unlinked` panel toggle is on) and a `"{N} unlinked — browse →"` line
  inside the Reports panel's normal body (visible whenever any isolated
  reports exist, regardless of the dock pill's own visibility — the review
  put the list IN the Reports panel, not gated behind a second panel) both
  call the same `unlinkedOpen` state. A `"← Back"` button returns to the
  normal Reports body without closing the panel. Toggling ANY panel by hand
  — including Reports itself, and "Hide all" — resets `unlinkedOpen` to
  `false`, so a manual open always lands on the normal body; only the pill
  (or a future deep link) opens straight into the list.
- **Verified live, full sandbox build** (same recipe as 5k/5l): `npm run gen`
  → `tsc --noEmit` clean → `npm run validate` (95/95 checks, unchanged
  3091/2070) → `npm run build` clean (bundle unaffected by this change,
  still ~1,494 kB) → `vite preview` + Playwright (SwiftShader flags,
  `rig.panels.v1` seeded with Reports + Unlinked open): pill reads `Unlinked
  — 1,285 · ASIA 483 · SA 271 · AFR 157 …`; clicking it shows the `← Back`
  button and the list; the filter narrows results live (`"consumer price"` →
  22 rows); clicking a filtered row slides the Detail card in
  (`translateX(620px)` → `translateX(0px)`, confirmed via the element's own
  inline style, not just text) and gives that row the `--accent-soft`
  selection background; `← Back` restores the normal body (`"Most depended
  upon"` section, the browse line, the Subject legend all present) without
  closing the panel; **0 page errors, 1 console error (the same
  favicon-404 timing artifact 5l already found and ruled out — reconfirmed,
  not new), 3 console warnings (the same 2 grouped `[graph]` lines + 1
  `THREE.Clock` notice from 5l — unchanged, confirming this update didn't
  reintroduce any startup-warning spam)**.
- **Not done from §6, deliberately:** items 6–9 (the tier-1 colour pass,
  validator rules, search accent-folding + calendar year-boundary fix, PNG
  guard + zoom-baseline freeze) — next rounds, in the review's order. No new
  `test-logic.ts` regression test was added for the list's filter or the
  `unlinkedOpen` state machine — this is pure UI/interaction, not corpus
  logic, so it wasn't a natural fit for that suite; worth a component-level
  test if this code gets touched again without a live re-check available.
  One loose end carried over, not new: `slices.generated.ts` and the
  `.rig-sweep` CSS rule in `uiTheme.ts` (only used by the dot grid's old
  sheen effect, now orphaned) are both flagged for a future session with
  `device_bash` to actually delete — see 5l's note on the first, and this
  update for the second.

**This update (5n), 2026-08-21.** Round 4 of the review's §6 list, items
6–9 as one round (Thomas's own framing: *"the tier-1 colour pass, validator
rules, the search/calendar pass, and the PNG guard + zoom freeze (items
6–9)"*) — **the last four items on the review's list.** §6 is now closed
in full, items 1–9 shipped across 5k/5l/5m/5n.

- **§6 item 6 — the tier-1 colour pass, SHIPPED.** Two independent
  complaints, one root cause each, per the review's own diagnosis (§6:
  "design, not defect" — 61% of Global-tier real nodes are hollow one-off
  instruments at 0.1 opacity, and the v4 damp held ASIA/SA at 55–65%
  chroma). `HOLLOW_FILL_OPACITY` (`nodeVisuals.ts`) raised `0.1 → 0.3` — the
  low end of the review's suggested 0.28–0.35 band. `palette.ts`'s ASIA and
  SA `SCOPE_COLOUR`/`FAMILY_INK` entries recomputed via a proper OKLCH
  scale (Björn Ottosson's sRGB↔OKLab formulas, chroma-only scaling —
  ASIA ×1.2727 to bring 55%→70%, SA ×1.0819 to bring 64.7%→70%, hue and
  lightness untouched) to match every other family's ~70% floor. Third
  piece — lenses doing nothing at tier 1 was previously silent: `ViewControls`
  now takes a `tier` prop, and GROUPS/WORLD (labelled "Groups"/"World" —
  STANDARD, labelled "Country", is the always-correct baseline and stays
  enabled) are disabled with an explanatory title
  ("mostly a no-op at the Global tier... Open a tier to see this lens do
  something") rather than silently doing nothing when clicked. Verified live
  (headless, see below): both non-STANDARD lens buttons report `disabled`
  at load (tier 1 is `DEFAULT_DRILLDOWN`), STANDARD/Country stays clickable.
- **§6 item 7 — validator rules, SHIPPED.** Three new checks in `validate()`
  (`graph.ts`): (a) reserved-namespace guard — a report `id` starting with
  `orb:`/`corb:`, or containing `->`, is now a hard error (those prefixes
  are the hierarchy module's own synthetic-node namespace; a real report
  landing in it would silently collide); (b) `COUNTRY_LABEL` coverage — any
  `isKnownCountry` country missing a `COUNTRY_LABEL` entry now errors,
  closing the gap the review flagged ("its absence now hides countries from
  the directory entirely"); (c) `strength` range — a defined `strength` that
  isn't a finite positive number (the NaN door the review called dormant)
  now errors by name. **Checked before adding (b), not assumed: a proper
  Python regex extraction of both tables found `COUNTRY_FAMILY` and
  `COUNTRY_LABEL` already had identical 142/142 coverage** — a first,
  naive `awk`-based diff had reported 60 false-positive gaps (it only
  matched keys at the start of a line, missing keys later on the same
  multi-key comma-separated line); raw-verifying that result before trusting
  it is what caught the false positive. So (b) ships as a validator rule
  only, no backfill needed — the review's worry was already unfounded, now
  it's enforced so it stays that way. Six pinned tests added to
  `test-logic.ts` covering all three rules.
- **§6 item 8 — search pass + calendar year-boundary fix, SHIPPED.**
  Two parts, matched to the review's two complaints:
  - **Accent-folding and non-Latin scripts.** `search.ts`'s `normalise()`
    rewritten: NFD-decompose then strip combining marks (`\p{Mn}`) so
    `"Côte d'Ivoire"` matches `cote`, `"Türkiye"` matches `turkiye`; the
    punctuation-fold widened from an ASCII-only class to `\p{L}\p{N}` so
    Cyrillic, CJK and other non-Latin titles survive folding instead of
    being stripped to nothing (Cyrillic query `Росстат` now finds the
    Cyrillic title and correctly does NOT match the Latin spelling
    `rosstat` — folding isn't transliteration). Also added a per-report
    `WeakMap` cache (`normalisedFieldsCache`) so the five searchable fields
    are normalised once per report, not recomputed on every keystroke
    against every report.
  - **Search/filter/isolate semantics reconciled with Compare's full-corpus
    behaviour.** `SearchPanel` no longer takes a `within` predicate — it now
    searches the FULL corpus unconditionally (`ALWAYS_VISIBLE`), matching
    how Compare already worked, and takes a new `outsideFilter` predicate
    used only to TAG results a live filter is currently hiding ("outside
    filter", the same pattern 5k already shipped for "outside isolate").
    Choosing an outside-filter result now clears the filter
    (`App.tsx`'s `handleChoose`) rather than silently selecting an
    invisible node — the same informed-exit design 5k used for isolate.
  - **Calendar year-boundary fix.** `schedule.ts`'s `calendarEvents()` loop
    started from `Number(window.from.slice(0, 4))` — the review's own
    diagnosis: a reference date that lands late in a year with an anchor
    early the following year has its first read start counting from the
    WRONG year, dropping every read that should have spilled forward from
    the previous year's anchor. Now starts from `startYear − 1`, per the
    review's own fix. A pinned monthly-anchor test spanning a year boundary
    (expects exactly 12 reads, Jan–Dec) confirms it.
  - **Two more calendar bugs found and fixed alongside the year-boundary
    one, not separately scoped but the same function and the same root
    cause class (rate-to-spacing arithmetic):** a sub-annual rate
    (`readings_per_year < 1`, e.g. biennial/decennial) was being silently
    mis-scheduled — `ReferencePeriod.ends` is MM-DD only, no year, so the
    model genuinely cannot know WHICH years a sub-annual reading falls on;
    rather than guess, these now route to a new `unplaceable.
    edgesSubAnnualUnphased` bucket (surfaced in `CalendarPanel`'s "Not
    shown" footer), consistent with the module's existing "no anchor →
    nothing is emitted" philosophy. And a rate above 12/year had a special
    case collapsing it to a single read — turned out unnecessary: the same
    fractional-day-stepping formula already used for 1–12/year non-integer
    spacing generalises correctly above 12/year with no changes, so the
    special case was deleted rather than patched. Pinned tests for both
    (sub-annual 0.5/year → 0 reads + 1 unplaceable entry; rate >12/year
    weekly → 40+ reads, all valid dates).
- **§6 item 9 — PNG re-entry guard + zoom-baseline freeze, SHIPPED.**
  - **PNG re-entry guard** (`PngExport.tsx`): a second export click while
    one is still in flight (the capture is async — `canvas.toBlob`) used to
    silently double the pixel ratio a second time and never restore the
    true original, permanently halving the on-screen framerate with no
    visible error. `restore.current` non-null now means an export is
    already pending, and a second request is simply ignored — one export
    still happens, it just can't corrupt the ratio it restores to. Also
    added a `MAX_CAPTURE_DIMENSION = 8192` clamp (a GPU drawing-buffer limit
    that a 2×-DPR capture on a large, high-density window can cross,
    which previously came back silently black instead of erroring).
  - **Zoom-baseline freeze** (`CameraZoom.tsx`): `runFit`'s ongoing
    tracking pass republishes `fitSync.distance` on every pass by design —
    but while the user holds the camera and the cloud is still settling
    under a camera that hasn't moved, that "zoom 1" denominator kept moving
    under a static camera, and the inferred zoom (distance ÷ base) drifted
    on its own — the most plausible explanation for the "zooms out forever"
    report. Fixed with a snapshot-on-first-use pattern (`frozenBase` ref +
    `currentBase()` helper): the BASE freezes the moment `userOwnsCamera`
    goes true and un-freezes the moment tracking or a fresh fit takes the
    camera back. Deliberately does NOT freeze camera reads — wheel-zoom
    also sets `userOwnsCamera` (via OrbitControls' own gesture bracketing)
    and still needs to read the live, moving camera position every frame;
    only the denominator stops moving. `fitSync` gained a `userOwnsCamera`
    field (`InfluenceGraph.tsx`), derived for free from `runFit`'s existing
    `moveCamera` parameter (`fitSync.userOwnsCamera = !moveCamera`) — no
    new mutation sites needed, all four `runFit` call sites already compute
    `moveCamera` from the same ref this needed to read.
- **Verified live, full sandbox build** (same recipe as 5k/5l/5m): staged
  the full 267-file `src/data/research/` corpus fresh → `npm install` →
  `npm run gen` (267 slices, 7.1MB `corpus-data.json`, 0 unwired) →
  `npx tsc --noEmit` clean → `npm run validate` (**117/117 logic checks,
  up from 95** — the six item-7 tests plus the accent-folding/Cyrillic
  block plus the three calendar tests; unchanged 3091 reports/2070
  dependencies; zero validator errors, confirming items 6/7's own new
  rules pass against the live corpus) → `npm run build` clean (1,496.71 kB
  / gzip 428.41 kB, in line with 5m's ~1,494 kB baseline) → `vite preview`
  + Playwright on the preinstalled Chromium with the §2.7 SwiftShader
  flags, **9/9 live checks**: both non-STANDARD lens buttons `disabled` at
  tier 1 load, STANDARD/Country enabled; a tier-1 screenshot for visual
  colour spot-check; accent-folded query `cote` surfaces
  `"Côte d'Ivoire"` results; the Calendar panel renders with the new
  "Not shown" footer text present and zero console errors (confirming the
  new `edgesSubAnnualUnphased` wiring doesn't crash even though this
  corpus has no currently-qualifying sub-annual reads to exercise it); a
  rapid double-click on PNG export still produces exactly one download
  (re-entry guard holding — took ~15–20s under SwiftShader's software
  bloom compositing at 2× resolution, not a regression, matching §2.7's
  own "bloom/glow is untrustworthy in software rendering" caveat about
  speed as well as fidelity); the zoom slider responds correctly to a
  programmatic move. Zero console errors across the whole run.
- **Not done, deliberately:** no new `test-logic.ts` coverage for the PNG
  re-entry guard or the zoom-baseline freeze themselves — both are
  React-effect/ref-level fixes inside `<Canvas>`, not corpus logic, so
  (same precedent as 5m's `unlinkedOpen` state machine) they weren't a
  natural fit for that suite; the live Playwright pass above is the
  regression coverage until a component-level harness exists. §6 has no
  further items — the review's ordered list is fully shipped.

**This update (5o), 2026-08-21.** §6 closed with 5n, immediately above.
This round is §5 item 4 — the pulse/beam redesign — picked by Thomas from
a menu of four remaining todo items, then steered by him on two open
design questions before any code was written.

- **What was asked.** Item 4's own text: "Pulse size/shape redesign + the
  beam. Burner by your instruction. The set-sizes pass fixed the noise;
  the beam idea (continuous databases render their edge as a lit stream
  with a direction cue) replaces pulse geometry on the fastest edges, so
  shape and beam are ONE design round." Scope was explicitly the beam
  treatment for continuous-database edges, not a general pulse redesign —
  the full review (§6) already found ordinary teardrop pulses "aged well"
  with "nothing... wants a style change," and that verdict was left alone
  here. Two questions were put to Thomas before writing code, both
  answered by him: how to identify "the 35 continuous databases"
  (he chose adding a real structured field over inferring one), and what
  the beam should look like (he chose an animated flow baked into the
  edge shader over discrete photon particles).
- **The identification problem, and a trap avoided.** Nothing in the typed
  schema distinguished a continuously-updated database (a nominal
  `releases_per_year` invented so the renderer doesn't read "no cadence"
  as a one-off instrument) from a report that just happens to publish
  often. The obvious source — `_cadence_original === "continuous"` in the
  raw per-report research metadata — turned out to be wrong: 73 reports
  carry it, but cross-checking against `cadence_note` phrasing and actual
  `releases_per_year` values found 38 of those are one-off institutional
  cores or genuinely periodic reports (1/4/12/0.2 per year), not the
  renderer-nominal 250/365 convention. The correct signal, found by the
  same cross-check, is `_cadence_resolution === "continuous-database"` —
  itself underscore-prefixed research metadata, but a curated resolution
  rather than a raw source claim. It matched a from-scratch manual
  cross-check (cadence_note phrase + shared nominal rate, with the 14
  genuinely-daily-edition lookalikes such as `boc-daily-exchange-rates`
  explicitly excluded) exactly: 35 of 35. This was caught before any code
  was written — no wrong identification shipped.
- **What shipped.**
  - `Report.continuous?: boolean` (`src/lib/types.ts`) — a real field, not
    a runtime inference from `cadence_note`. Backfilled onto exactly the
    35 correct reports across 15 `src/data/research/*.json` files (surgical
    per-object insertion, not a rewrite — diffed clean against the
    originals). Absent means ordinary, matching every existing optional
    field's convention.
  - A validator rule (`src/lib/graph.ts`): `continuous: true` with no
    `releases_per_year` is an error, since a continuous source needs a
    nominal rate or it silently falls into `isStandingInstrument`'s
    one-off/hollow case instead — the two claims are opposites and must
    never collide unnoticed. Three pinned tests added in
    `scripts/test-logic.ts` (no-rate rejected, rate-present passes clean,
    an ordinary recurring report is unaffected).
  - The beam itself: no new geometry, no discrete particle objects.
    `linkVisuals.ts`'s `gradientLinkMaterial` gained a `beam` parameter and
    two new shader uniforms (`uFlow`, `uFlowTime`); when `uFlow` is on, the
    fragment shader sweeps several soft brightness bands along the edge
    (a moving wave, not a moving dot — a travelling object reads as an
    event, which is what a pulse already means; a travelling wave reads as
    a medium already in motion, which is what "continuous" means).
    `tickLinkFlow` advances `uFlowTime` from the same per-frame clock that
    already drives pulse blinking; `resetLinkFlow` clears the module-level
    animation registry on every `forceGraph` rebuild (this material is one
    instance per link, never cache-shared, so without an explicit reset
    the registry would leak one entry per continuous edge per rebuild).
  - `InfluenceGraph.tsx`: `LinkDatum` gained `continuousSource: boolean`,
    OR-merged on trunk collapse the same way `cross` already is, derived
    from `upstream?.continuous === true`. Continuous links never get a
    teardrop particle object built for them at all (`particleObjects`
    build loop skips them outright — zero draw calls, not zero-opacity),
    and `linkDirectionalParticles()` returns 0 for them in both the
    accessor and the `showPulses` effect. The beam is gated by the same
    `showPulses` toggle pulses already use, so "hide pulses" hides both
    mechanisms together as one concept from the UI's point of view.
- **An honest finding, not a code gap.** Of the 35 continuous-database
  nodes, only **one** — `tw-dgbas`, cited by `tw-statistics-act` — has any
  documented dependent in the current 3091-report corpus; the other 34 are
  isolated, uncited institutional-core entries from the 2026-08-20 mint
  with no outgoing edges yet. So today the beam mechanism is correct and
  fully wired but touches one real edge — it removes 1 of roughly 2967
  photon meshes (about 0.1%), nowhere near the §4.3 draw-call relief the
  "35 continuous databases" framing might suggest. That relief shows up as
  more research connects these institutional cores to real dependents, not
  from anything left to fix in this code. Measured, not assumed: confirmed
  live via a constructed deep link (`?rig=`) forcing Taiwan's per-report
  nodes into view, since at Global/Everything tier an unopened country's
  reports fold into an orb and orbs never carry `continuous` (same
  convention as `releases_per_year`).
- **A bug hit and fixed during this round.** The first backfill script
  located each report by its `id` line and inserted `"continuous": true,`
  right after `cadence_note`, without checking whether `cadence_note` was
  already the object's last field or handling the trailing-comma rules
  correctly — this corrupted all 15 touched JSON files (verified with
  `python3 -c "import json; json.load(...)"`, all 15 failed to parse).
  Fixed by re-extracting clean copies and rewriting the script to find the
  object's true closing `}` via indentation matching, add a trailing comma
  to whatever the real last field was if missing, and insert `continuous`
  as the new final field with no trailing comma of its own. Re-verified
  all 267 corpus files parse and exactly 35 carry `continuous: true`.
  Also hit: an early draft of the shader comment above used backtick-quoted
  identifiers inside `linkVisuals.ts`'s `FRAGMENT` string, which is itself
  a backtick-delimited JS template literal — any backtick inside it ends
  the string early and broke `tsc`. Fixed by rewriting the comment in
  plain prose with no backticks anywhere.
- **Verified live, full sandbox build** (same recipe as prior rounds):
  staged the full 267-file `src/data/research/` corpus fresh →
  `npm install` → `npm run gen` (267 slices, unwired unchanged) →
  `npx tsc --noEmit` clean → `npm run validate` (**120/120 logic checks,
  up from 117** — the three new `continuous` tests; unchanged 3091
  reports/2070 dependencies; zero validator errors) → `npm run build`
  clean (1,486.90 kB) → `vite preview` + Playwright on the preinstalled
  Chromium with the §2.7 SwiftShader flags: a deep link forcing Taiwan
  open confirmed `tw-statistics-act → tw-dgbas` is the only link with
  `continuousSource: true` in the live graph, its material carries
  `uFlow === 1`, and it draws with zero photon particles while ordinary
  edges are unaffected; zero console errors throughout. A temporary
  `window.__rigDebugLinks` hook used only for this inspection was removed
  before shipping — confirmed absent (`typeof window.__rigDebugLinks ===
  'undefined'`) in the final build.
- **Not done, deliberately:** ordinary (non-continuous) teardrop pulse
  shape and sizing were not touched this round — the full review already
  found that design "aged well" with no style change wanted, and item 4's
  own framing ("shape and beam are ONE design round") was satisfied by
  scoping "shape" to the edges that actually get the beam treatment. No
  new UI surfaces the `continuous` flag directly (no badge, no filter) —
  nothing in this round's brief asked for one, and the effect is meant to
  read from the edge itself.

**This update (5p), 2026-08-21.** Thomas, after living with 5o for a session:
the render is "far from consistent" — screenshots of the SAME Global tier
(396 shown) sometimes pale and sparse, sometimes densely colourful, and a
separate complaint that picking a country/region from `GroupsPanel` then
clicking the graph to dismiss the panel throws the whole isolate away and
lands back on the reset view. Also: the bloom-flicker item (§5 [Thomas] #1,
tentatively closed 2026-08-20 off a soft "I think it's gone") is REOPENED —
still happening. Two real bugs found and one fixed with confidence; the
other partially addressed and explicitly left open rather than guessed at
further. This session drove Thomas's own Chrome directly (Claude-in-Chrome,
his approval) rather than reasoning from code alone — screenshots and a
live console below are real captures, not descriptions.

- **The GroupsPanel/graph-click isolate reset — FOUND, FIXED, verified live.**
  Root cause: `App.tsx`'s `onSelect` (a node click) and `onPointerMissed` (an
  empty-space click) both unconditionally called `setSelectedGroupId(null)`
  — a leftover from before `handleChoose` (search) got the "selection and
  group isolate may coexist" fix in 5k. Since `visible` already restricts
  clickable nodes to the active `groupFocus` while an isolate is on, there
  was never a real "clicked something outside the isolate" case for a direct
  node click to guard against — the unconditional clear was simply wrong.
  `onSelect` now only clears `selectedGroupId` when the clicked id is
  outside `groupFocus` (same shape as `handleChoose`'s existing check);
  `onPointerMissed` no longer touches `selectedGroupId` at all. Exiting an
  isolate now requires an actual explicit action — the panel's own "Clear"
  button, re-picking the same group (existing toggle-off), or Escape's
  priority stack (unchanged, still clears it last). Verified live in
  Thomas's own Chrome tab via Vite HMR: isolated India (12 reports, 11
  shown), clicked a node inside the isolate — panel closed, node selected,
  isolate held ("11 shown · 396 in this tier · filter hiding 385" unchanged,
  "ISOLATED: INDIA" pill still showing); clicked empty space — same result;
  reopened the panel and clicked Clear — correctly dropped back to the full
  396-node view. No console errors at any point.
- **The render-consistency bug — REPRODUCED live, ROOT-CAUSED, PARTIALLY
  fixed.** Five cold reloads of `localhost:5173`, zero camera interaction,
  same Global tier every time: the camera-fit distance the app settles on is
  genuinely non-deterministic. Two of five landed correctly (thin lines,
  full graph in frame); one landed far too close (spheres overlapping,
  filling the screen, colours reading as vivid purely because everything is
  huge); one landed far too far (a handful of pale dots on empty black —
  this is almost certainly what Thomas's "pale image" actually is: the SAME
  data and colours, just zoomed out until they read as nothing). Switching
  to Everything and back to Global, Thomas's own workaround, was tested live
  too and did NOT reliably fix it — one live test produced a THIRD wrong
  distance rather than the right one.
  - Traced to `InfluenceGraph.tsx`'s settle/fit machinery: `fg.d3AlphaMin(0.005)`
    makes the simulation's stop condition tick-based, not wall-clock-based,
    but the ceiling that backstops it (`cooldownTime`, library default 15s)
    IS wall-clock. A cold load — parsing the 7MB corpus, compiling 3,091
    meshes, JIT warmup — is exactly when real frame rate is lowest, so fewer
    physics ticks land inside that 15s window than on a warm/fast run,
    and the layout can still be genuinely mid-expansion (under `galaxyForce`/
    `geoAffinity`, both added well after 15s was ever tuned) when the cap
    forces a stop and `runFit` measures a too-small radius.
  - **Fix shipped:** `fg.cooldownTime(45000)`, right after the existing
    `d3AlphaMin` call — a plain constant raise, same shape as the line
    already there. Does not slow down a run that already converges well
    inside 15s (the vast majority); only changes the runs that were hitting
    the old cap.
  - **Did not fully resolve it** — re-tested live after shipping (multiple
    reloads): still saw a too-close lock-up on one run, cold-load console
    clean throughout. So `cooldownTime` was a real contributing factor but
    not the whole story. Second, more specific suspect identified but NOT
    fixed this round: `runFit`'s periodic tracking pass sets
    `userOwnsCamera.current = true` (line ~2585) whenever
    `cameraMovedOffFit()` sees the live camera position differ from the last
    fit pose by more than a 0.5%-of-distance tolerance — and that check is
    NOT gated behind an actual user gesture (unlike the OrbitControls
    `change`-listener path just above it, which correctly is). If
    OrbitControls' own damping (`enableDamping`, `dampingFactor: 0.08`)
    leaves `camera.position` a hair off the exact snapped pose for a frame
    or two after a programmatic `runFit`, and that happens to land during an
    EARLY tracking pass when the fit distance is still small (so 0.5% of it
    is a tiny absolute tolerance), this could false-trip `userOwnsCamera`
    with nobody touching anything — and once true, no later, more-correct
    `runFit(true)` call is ever allowed to move the camera again for that
    session. Plausible and matches every symptom (camera "stuck," not
    drifting; wrong in both directions; worse under load) but NOT confirmed
    by instrumentation — would need a temporary debug hook logging
    `userOwnsCamera`/`cameraMovedOffFit` transitions live, the same kind of
    measurement 5j's Suspect-1-through-4 flicker tests used, before touching
    that logic. Deliberately not guessed at further this round: this is
    camera-ownership code Thomas explicitly said he loves ("the right drag
    is awesome... I love playing with it"), and a wrong fix here risks
    breaking that feel to chase a bug the `cooldownTime` change already
    partially addressed.
  - **Bloom itself was NOT re-implicated.** The apparent "pale vs colourful"
    difference Thomas is seeing tracks entirely with camera distance in
    every live capture this round — no separate bloom/glow inconsistency was
    observed once distance is accounted for. The 2026-08-19 bloom-slider
    theory (`notes/flicker-tests-2026-08-19.md`, Suspect 3) is still
    untested on its own terms — worth Thomas's one-minute glow-slider check
    if a genuinely bloom-only flicker (nodes shimmering in brightness at a
    STABLE camera distance) is ever seen separately from this.
  - **Sandbox recipe now run — caught and fixed a real bug.** Staged the
    full repo (all 267 research files + app source + config) into the
    verification sandbox and ran `npm install` / `npm run gen` /
    `tsc --noEmit` / `npm run validate` / `npm run build`. `tsc` failed on
    the `onSelect` fix above: `App.tsx`'s handler passed `id` straight to
    `groupFocus.nodes.has(id)`, but `InfluenceGraph`'s `onSelect` signature
    is `(id: string | null) => void` — a node *deselect* (clicking the same
    node again) calls it with `null`, which `.has()` doesn't accept. Fixed
    by adding `id !== null` to the guard, so a deselect now leaves the group
    isolate untouched too (same "only clear on a verified outside-group
    pick" principle as the rest of 5p — a deselect was never a pick).
    Everything else was clean: `tsc --noEmit` 0 errors after the fix, `npm
    run validate` 120/120 logic checks pass (no new isolated-report or
    domain-mapping regressions), `vite build` succeeded (one pre-existing
    "chunk >500kB" size warning, not a new issue). The fixed `App.tsx` was
    written back to Thomas's machine; not yet re-verified live since his
    dev server was down at the time (see below).
- **Files touched:** `src/components/InfluenceGraph.tsx` (`cooldownTime`),
  `src/App.tsx` (`onSelect`, `onPointerMissed`).
- **Not done, deliberately:** the `userOwnsCamera`/`cameraMovedOffFit`
  investigation above — flagged for next round, needs live instrumentation
  first.
- **Also this round, no code:** refreshed Thomas on the soft-edge node idea
  (`notes/node-surface-encoding-2026-08-19.md`) and drafted a Grok research
  prompt + file list for the research backlog (19 zero-cross-border-edge
  countries, `notes/cross-border-gaps-2026-08-20.md`) — both delivered in
  chat, not written to a new file, since the note already holds the country
  list and the prompt is Thomas's to paste into Grok directly, not a repo
  artifact.

**This update (5q), 2026-08-22.** Read-only, no code touched — Thomas sent
back Grok's round-1 research on the 19 zero-cross-border-edge countries
(`crossborderdepsconsolidated20260821.json`, uploaded to chat, not committed
into the repo) and asked for it to be checked over before anything gets
minted. No build/validate run this round — nothing in `src/` changed.

- **Id-collision check against the live corpus, done first.** Grepped all
  267 `src/data/research/*.json` files for every id Grok's file references.
  Every domestic `source_report_id` it points from (id-national-accounts,
  tw-dgbas, ph-psa, jp-national-accounts, and 25 others) is real and already
  in the corpus — Grok didn't invent source reports. But of the 8 brand-new
  international nodes it proposes, **three already exist under those exact
  ids**: `imf-sdds`, `sna-2008`, `imf-e-gdds`. Minting them again would
  create duplicate ids. Only `imf-sdds-plus`, `imf-sdds-indonesia-observance-
  2023`, `imf-sdds-plus-japan-observance-2024`, `asean-acss`, and
  `apec-stats` are genuinely new. This has not yet been acted on — no nodes
  or edges from the file are in the repo yet, this was a pre-flight check.
- **Fable-model review of the file's content**, run as a subagent with the
  id-collision findings above handed to it as ground truth. Full explanation
  relayed to Thomas in chat (not copied into this file — re-run the review
  if a future session needs the text again). Headline findings: coverage is
  12-of-19 countries with real proposed edges, 4 (Iran/Afghanistan/Yemen/
  Syria) honestly declined as too-thin evidence, 3 (Sudan/Mauritius/Sierra
  Leone) never processed because their country files were never attached to
  Grok in the first place. Sourcing is mostly solid (real IMF DSBB PDFs,
  national agencies speaking about themselves) but four concrete problems
  were caught: Iraq's one edge cites a third-party scorecard
  (`odin.opendatawatch.com`), not a primary document; five countries
  (Indonesia, Philippines, Singapore, Thailand, Myanmar) reuse one identical
  generic ASEAN quote that never names any of them; two of Japan's edges
  quote SDDS Plus text to support SNA-2008/Statistics-Act claims the quote
  never actually makes; Singapore's SDDS quote describes a 1996 event and a
  2001 event as if they were the same moment. **Nothing in the file has been
  raw-verified against the live source pages yet** — that step, and any
  actual minting, is still fully open.
- **Prompt for a Grok round 2, written**: `notes/grok-prompt-cross-border-
  round2-2026-08-22.md`, delivered to Thomas as a file to attach. Asks for
  the 3 unprocessed countries (this time with their files actually attached),
  another specific look at the 4 thin ones, and fixes for the four sourcing
  problems above.
- **Standing decisions from Thomas this round, for future sessions:**
  Geo-exploration is fully dropped from the backlog, not just deprioritized
  — do not raise it again. Right-drag panning / low-end zoom slider:
  confirmed solid, no longer an open question (§5 item 2 updated). Emptying
  `_to_delete/` is Thomas's own job, not an agent todo (§5 item 3 updated).
  The render-consistency/camera-distance bug (§5 item 1) is explicitly
  deferred — deal with it after this research round, not urgent. Broadening
  the main search bar to also find/isolate a region, bloc, publisher, or
  country (already on the backlog list, §5 item under "Regions/Organizations
  panel" history) — Thomas re-confirmed he wants this, still not built.

---

---

## 0. Process rules Thomas asked for, 2026-08-20 — read this section too

**When to stop trusting a long session and hand off.** There is no in-app
signal for this; the honest answer is behavioural, not numeric. Treat these as
the tells, roughly in order of how much they should worry you:
- The agent starts re-deriving or re-explaining something already settled
  earlier in the same conversation, or gives an answer that quietly
  contradicts an earlier one in the same session.
- A tool call gets retried more than the documented policy allows (this file
  and `REPORTS.md` both specify: once, and only for specific connection
  errors) — repeated retries past that are a sign of confusion, not
  persistence.
- The conversation has already been through one compaction/summary event
  (visible as a message saying a prior conversation "ran out of context" and
  got summarized) — that already happened once today, mid-session, and is
  itself the clearest possible signal: the working context was full enough
  that detail had to be thrown away and reconstructed from a summary. That is
  the cue to wrap up soon, not a thing to wait out.
- Concretely: when an agent notices any of the above, it should say so
  plainly ("this is a good point to hand off") rather than pushing on, write
  this file up to date, and stop — not keep working through a state where its
  own answers are getting less reliable.

**This file gets updated every time, not just at milestones.** Standing rule
now: whenever Thomas asks for code work, a brainstorm, or an adjustment, the
session logs what happened in this file before finishing that turn — not
batched up for a big rewrite at the end. In practice this means: read the
current `HANDOFF.md`, copy it unchanged to
`archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md` (the archive is a
version history now, not just an end-of-day snapshot — several dated copies
per day is expected and correct), then write the updated file back to the top
level with a new dated section describing what just happened, in the same
style the rest of this file already uses (what was asked, what shipped, how
it was verified, what's explicitly not done yet). This is an ADDITION to a
section, not a from-scratch rewrite each time — a full rewrite every single
turn would be wasteful and would lose detail rather than preserve it; a
full rewrite stays reserved for when a section has genuinely gone stale or
the file has grown unwieldy, same as `REPORTS.md`'s original "carry forward
what is live, delete what is finished" rule already said.

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why |
|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules. The two most violated: never run git, and every edge needs a document. |
| 2 | **This file, all of it** | Current state, the todo list, the traps. |
| 3 | `START-HERE.md` | Plain-language orientation. Also now rendered verbatim inside the app as Help ▸ What this is — so an edit here is an edit to the product. |

Then one of these, depending on the task:

| Task | Read |
|---|---|
| Anything visual | §4 and §7 below; then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) for the measured design |
| Camera, fit or layout | `notes/camera-fit-measurement-2026-08-19.md` — the numbers, and the harness recipe |
| The flicker | `notes/flicker-tests-2026-08-19.md` — three of four suspects cleared, one open |
| Isolate, or "why does country X show empty" | `notes/cross-border-gaps-2026-08-20.md` — 19 countries with zero cross-border edges, by design not bug |
| Regions, blocs, publishers, the country directory | `src/lib/regions.ts`'s file-level comment — the four `RegionGroup` kinds. Written when `ChipBar` (the old family/level filter panel) was still on screen; `ChipBar` was deleted 2026-08-20 (item 5f/5g — see §5) but the FILTER mechanism it drove, `FilterState.scopes`/`SCOPE_GROUPS`, still exists and is what "parallel to, not a replacement for" refers to |
| Comparing two reports, or the shortest path between them | `src/components/Compare.tsx`'s file-level comment — items 14/15, one panel answering both questions |
| Minting / the staged archive | `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md` and `_STATUS.md` |
| BRICS research | `BRICS/G.3.md` |
| Schema | `src/lib/types.ts` — mostly documented reasoning, not types |

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts` and
`InfluenceGraph.tsx` carry long comments explaining why each constant is what
it is, usually with the date and Thomas's words. Read the comment before
changing the number. Several say "do not raise this" and mean it.

---

## 2. Standing rules

Full text in `REPORTS.md`. The short list, because these are the ones that
break:

1. **Never run git in this repo from an agent session** — not even read-only.
   It leaves a stale lock. **And never STATE git status either** — see §3.
2. **If no document says a dependency exists, it does not go in the graph.**
3. **A pointer is not a source.** WebFetch can fabricate content for a dead
   URL; raw-verify before trusting a quote.
4. **`npm run validate` before and after any data change** (95 checks as of
   item 5k). It cannot run through the device bridge (`node_modules` carries
   the Windows esbuild). Working recipe: tar `src/ scripts/ package.json
   tsconfig.json index.html vite.config.ts START-HERE.md` on-device into
   `_to_delete/`, stage the tarball, extract + `npm install` in a Linux
   workspace, run there. **`START-HERE.md` is now required for the build** —
   Help imports it. **As of item 5l, `npm run gen` must also produce
   `public/corpus-data.json` before `tsc`/scripts that import `src/data`
   will resolve** — same requirement `slices.generated.ts` used to carry.
5. **`public/corpus-data.json` is generated (by `scripts/gen-slices.ts`).
   Never hand-edit it.** As of item 5l this replaces
   `src/data/slices.generated.ts` (tombstoned, not deleted — flagged for
   `_to_delete/` — as the browser-bundle mechanism; see the item 5l writeup
   at the top of this file for the full `assembleCorpus.ts` /
   `src/data/index.ts` / `src/data/browserCorpus.ts` split).
6. Agents cannot delete device files — `mv` into `_to_delete/`, log the reason
   in `_to_delete/README.md`, tell Thomas.
7. **Headless verification works and is expected**: build, `vite preview`,
   Playwright + the preinstalled Chromium with
   `--use-angle=swiftshader --enable-unsafe-swiftshader`. Geometry, colour and
   pixel counts are exact; **bloom/glow is NOT trustworthy** in software
   rendering, and CSS transitions can wedge under load (see §7).
8. **Measure before believing.** This session killed four confident, specific,
   wrong claims — three of them written by an agent earlier the same day. If a
   statement has a number in it and nobody ran anything, it is a guess.

---

## 3. Where the project is (verified 2026-08-20)

**Live corpus:** 3,091 reports · 2,070 dependencies, after item 5's mint
(these numbers were 1,250 · 1,079 for the whole first half of 2026-08-20 — if
you're reading an older copy of this file, or a comment elsewhere still says
1,250, that's the pre-mint figure, not a live discrepancy to chase down).
`npm run validate` exits 0 (90 logic checks as of item 5g, up from 74 after
5e, 61 after 5d, 59 after 5c and 54 after 5b, all invariant checks; warnings
only — single-use `proposed:` tags and the known isolated-report list). `npx
tsc --noEmit` clean. `npm run build` clean. **5g's own checks (`tsc`/`vite
build`/`test-logic.ts`) were run directly with `npx`, never `npm run`** — the
sandbox that built 5g never had `src/data/research/*.json` staged, and `npm
run *`'s `predev`/`prebuild`/`validate` hooks call `gen-slices.ts`, which
reads that whole corpus and would have silently regenerated
`slices.generated.ts` down to empty. Re-run the real `npm run validate` on
your machine once to confirm 90/90 against the live corpus, same as every
prior item in this file.

**Git: agents cannot see it, so agents must not assert it.** Thomas confirmed
on 2026-08-19 with a GitHub Desktop screenshot — branch `main`, **0 changed
files**, "Fetch origin, last fetched just now". The repo was fully committed and
pushed, and had been all along. Every handoff from 2026-08-13 to 2026-08-19
opened with a growing "nothing committed, three weeks of work on one disk"
emergency. That claim was never verified by anyone, was copied forward each
session with that session's work appended to the list, and was false. Rule 1
bars agents from running git, which is exactly why the claim was unfalsifiable
and grew. **No session may state git status in any document — not "committed",
not "not committed", not a backlog count.** Ask Thomas, or read a GitHub
Desktop screenshot. Delete any such claim you find rather than carrying it
forward.

**Staged corpus:** `Grok - Brics+israel and singapore/consolidated/` — 37
country files, **1,999 reports, 982 internal edges; 844 connected, 1,155
edgeless (58%)**. Mint is decided YES but deferred. Also in `consolidated/`:
`_EDGES-jp-kr-tw-2026-08-19.json`, an additive edge file from a Japan/Korea/
Taiwan research round. It is DATA, not bookkeeping; merge per its own `_rule`.

**Project memory is UP again as of 2026-08-21 (item 5k), and the backlog is
cleared.** It had been down from mid-2026-08-19 through all of 2026-08-20
("not available in this session"). During the 5k session both read and write
worked throughout; the parked file `notes/memory-pending-2026-08-20.md` was
fully processed into real memory entries, the wrong
`camera-fit-density-risk-2026-08-19` entry was corrected in place, and the
pending file was moved to `_to_delete/`. If memory refuses again, go back to
the parking pattern: write the owed entry into `notes/memory-pending-<date>.md`
and say so here.

---

## 4. What the app is now

Assume all of this exists and works. Each carries a dated comment at the site.

- **Lenses.** `src/lib/modes.ts`: STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW.
  A recolour pass via ref + mutation effect; **never a `forceGraph` memo dep**.
- **The constellation look.** Near-black background (`#010204`), flat crisp
  panels, rotating masthead gradient. **The whole bottom edge is one dock
  now (2026-08-21, item 5k — `bottomDock` in `App.tsx`)**: tier bar in the
  left cell (same bottom-left spot 5h gave it), Compare + `GroupsPanel`
  ("Regions & Countries") + Legend as the centre cell's pills (same order 5h
  arranged, minus the hand-tuned `calc(50% ± 140px)` anchors — the grid
  centres them now), unlinked shelf in the right cell (right edge still
  exactly 214 in from the viewport edge, via the dock's empty fourth track),
  and none of the five carries its own `position: fixed` coordinates any
  more. The old `ChipBar` filter drop-up that owned bottom-centre is still
  deleted (5f). The search bar sits left-of-centre at the top
  (`SEARCH_BAR_LEFT`, item 5h, not dead centre any more), calendar tab to
  its right — the top row is NOT in the dock. The Reports panel's own
  scrollable content stops a full `REPORTS_PANEL_BOTTOM_CLEARANCE` (120px)
  above the tier bar rather than running underneath it (2026-08-21, item
  5i — `App.tsx`'s `panel` style); the View panel got the same treatment in
  5k (`ViewControls.tsx`, `VIEW_PANEL_BOTTOM_CLEARANCE`).
- **Lighting.** Two directional lights + ambient 0.28, emissive floor 0.12,
  bloom 0.14/0.26. **Closed** — Thomas, 2026-08-19: *"the lighting is okay"*.
- **Blueprint is DELETED.** No view setting is a memo dep any more. Rims
  survive only on hollow one-off instruments. Every remaining `blueprint`
  mention in `src/` is a deliberate dated tombstone; the docs are clean.
- **Hover and selection.** Hover = identity chip; click = full `Detail` card
  from the RIGHT, now including the report's `url` as a host link. Camera
  refits UNCONDITIONALLY on every filter change (third rewrite — the
  conditional version read as a glitch).
- **The edge evidence card.** Click a line, arrowhead, pulse, or within 9px of
  a line, and a card slides from the LEFT with every Dependency behind that
  drawn line: real endpoints, relationship type, period, the verbatim `basis`
  quote, and `evidence_url`.
- **Edges and pulses have SET SIZES and split shades.** `baseLinkWidth()`
  returns 1. Weight survives in rest lengths and line opacity. **Never
  reintroduce additive/white pulse cores** — one session, reverted, snowstorm.
- **Menu bar** (`MenuBar.tsx`). `Panels ▾` hides/shows six HUD blocks (hidden
  by default, persisted at `rig.panels.v1`); `Views ▾` is saved views;
  `Help ▾` is How-to and What-this-is. **The tier bar and its status line are
  deliberately NOT in the menu** — primary navigation, and the only signal a
  filter is on. If that ever changes, the status line needs its own strip.
- **Help renders `START-HERE.md` imported raw** (`?raw`), cut at
  `## Running it`. Editing the markdown edits the product. **How-to re-opens
  the real onboarding card** via an `openRequest` counter prop — never a second
  copy.
- **Saved views** (`src/lib/savedViews.ts`). Tier + **opened countries** +
  view settings + filters + selection + panels, `schema: 1` at `rig.views.v1`,
  restored by MERGING into today's defaults (an old save with no
  `openedCountries` field defaults to `[]`, correctly — nothing was
  individually opened before the field existed). The **★ (`openOnLoad`)** is
  the point of the feature and is read at MODULE scope so the starred state
  is the graph's first state.
- **The disclosure hierarchy now folds TWICE, not once (2026-08-20, item
  5b).** `src/lib/hierarchy.ts`. The tier ladder (`resolveId`,
  `buildDisclosedGraph`) still folds a report into its family orb
  (`orb:${family}`) when its own tier isn't globally open yet — unchanged,
  still global, still Thomas's "depth is a property of the view" call from
  2026-08-12. NEW: once a tier IS open (tier 2+), a report additionally folds
  into a per-country orb (`corb:${country}`) until that specific country is
  individually expanded (double-click) — `toggleCountryOpen` in
  hierarchy.ts, mirroring `toggleDrilldown`'s "only ever adds detail, never
  folds back" contract. `App.tsx` holds this as `openedCountries`
  (`ReadonlySet<Country>`), reset to empty on a full Reset, left alone by a
  tier button press (additive, like the filter). Why: at 139 countries, a
  single global "Nations" rung dumped 2,071 real reports on screen at once
  regardless of country; the fold is per-country because Thomas explicitly
  asked for it at this scale, after having explicitly declined the same idea
  at ~10 countries per family on 2026-08-12 — both calls were right for the
  corpus size they were made against. See the long comment on `resolveId` for
  the full reasoning and the measured before/after node counts.
- **Galaxy clustering (2026-08-20, item 5c).** `src/lib/galaxyForce.ts`, new.
  A hierarchical d3-force-3d force pulling every node toward its own colour
  family's centroid (gentle) and its own country's centroid (stronger,
  tighter) — countries visibly clump inside their family's region of space,
  Thomas's own "galaxy" image. New `view.galaxy` slider (`view.ts`,
  `ViewControls.tsx`), 0–3, defaults to 1 (ON). **Read the file-level comment
  before touching this or `geoAffinity.ts`** — the two forces look similar
  but answer different questions (own-group gravity vs bilateral bloc pull)
  and the comment explains why this one does not repeat the "continent is
  not a relationship" mistake geoAffinity was built to avoid. Provinces and
  municipalities are NOT a third level — `Report.region` is free prose for
  79% of the 606 provincial/municipal reports, not a clean field to cluster
  by; that needs its own data pass before this mechanism can extend to it.
- **Isolate (2026-08-20, item 5d).** New `view.isolateFocus` toggle
  (`ViewControls.tsx`, Focus section). With a node or country orb selected
  and this ON, everything outside the traced chain is HIDDEN, not dimmed —
  answers Thomas's "show just Israel and its international connections"
  request. Deliberately built on `buildFocusIndex(disclosedGraph, null)` —
  the UNFILTERED index — rather than extending the Countries/Domains scope
  filter, specifically so a cross-border edge survives even when the other
  endpoint is in a different family. A naive per-country filter entry would
  have failed this: `applyFilter` only keeps an edge when BOTH endpoints are
  visible, so scoping to one family drops any edge reaching outside it. See
  `App.tsx`'s `unfilteredFocusIndex`/`isolateFocus` memos (that local name
  shadows the `view.isolateFocus` boolean — they are different things, a
  `Focus | null` and a toggle) and the pinned regression test in
  `scripts/test-logic.ts` (the Israel/MERCOSUR case) that exists specifically
  so nobody "simplifies" Isolate back onto the filtered index.
- **Regions & Organizations panel + Countries directory (2026-08-20, item
  5e).** `GroupsPanel.tsx`, bottom right. Picking a continent, treaty bloc,
  publisher (IMF, World Bank, UN), or a single country from a search box
  isolates it the SAME way item 5d's single-node Isolate does — same
  unfiltered index, generalised in `selection.ts` to a multi-seed
  `computeGroupFocus` so "isolate this whole region" also keeps the edges
  BETWEEN its own members, not just the ones reaching out of it. See
  `lib/regions.ts` for the four group kinds and why this is a parallel
  mechanism to the `ChipBar`/`SCOPE_GROUPS` filter panel, not a replacement —
  that one still hides by colour family and drops cross-border edges on
  purpose, which is a different, still-useful question.
- **Loading curtain** (`LoadingCurtain.tsx`). Opaque until the renderer reports
  `settledOnce && fitted`, first load only. **The 25s safety timeout is the
  load-bearing part** — a curtain that never lifts is worse than none.
- **Sliders, current ranges:** Cluster spread **200%–10000%, opens at 200%**;
  Geo-affinity **0–500%, opens at 150%**; zoom 0.25–2.6 of fit distance.

---

## 5. THE TODO LIST

Sorted by owner, ordered by priority within each.

### [Thomas] — only you can

1. **REOPENED 2026-08-21 (item 5p) — the bloom flicker / render-consistency
   check.** The 2026-08-20 "tentative DONE" above did not hold — Thomas:
   "the bloom flicker is still happening," this time with a real, live-
   reproduced repro (5p, top of file): the SAME Global tier renders at a
   different, wrong camera distance on a fresh load, not a brightness
   flicker at a stable distance. One contributing cause fixed
   (`cooldownTime` raised, InfluenceGraph.tsx) but NOT fully resolved — see
   5p for the second suspect (`userOwnsCamera`/`cameraMovedOffFit`) that
   still needs live instrumentation before touching it. The original
   bloom-slider theory (`notes/flicker-tests-2026-08-19.md`, Suspect 3) is
   still untested on its own terms and may be a genuinely separate issue —
   worth Thomas's one-minute glow-slider check if a brightness-only flicker
   at a fixed camera distance is ever seen apart from this. **Thomas,
   2026-08-22: deal with this after the current research/backlog round —
   not urgent right now.**
2. **CONFIRMED SOLID, 2026-08-22 — right-drag panning and the low end of the
   zoom slider.** Thomas confirmed explicitly. Safe to build the fly-through
   feature (item 9) on top of it whenever that gets picked up; no further
   check needed.
3. **Not an agent task, confirmed 2026-08-22.** Thomas manages `_to_delete/`
   cleanup himself and doesn't need reminding to empty it — agents should
   keep logging what they sweep there (standing habit), but this stops being
   an open todo item.

### [Us] — your eyes, agent's hands

4. **Pulse size/shape redesign + the beam — DONE 2026-08-21 (5o).** New
   `Report.continuous` field, backfilled onto the real 35 via
   `_cadence_resolution === "continuous-database"` (not the noisier
   `_cadence_original`, which was a trap — see 5o's writeup below).
   Continuous edges draw as an animated flow baked into the edge shader,
   zero teardrop particles built for them. Ordinary pulse shape/sizing
   deliberately untouched — the review already found that design aged
   well. Honest caveat: only 1 of the 35 nodes has a documented dependent
   today, so the draw-call win is real but small until more research
   connects the rest — see 5o for the full measurement. Still open: the
   soft-edge node idea (`notes/node-surface-encoding-2026-08-19.md`) this
   was meant to pair with was not part of this round's brief and remains
   undone.
5. **Mint the staged archive — DONE 2026-08-20.** Corpus went from 1 250 to
   **3 091 reports, 1 079 to 2 070 dependencies**. `npm run validate` and
   `npm run build` both exit 0 on the merged corpus — worth re-running on your
   machine once to confirm the same, since this was built and shipped from a
   sandbox copy, not committed there directly (standing rule: agents never run
   git in this repo).
   - `check-urls` ran on your machine: 1 972 checked, 832 flagged "dead" but
     most were false positives (403/timeout from the checker's plain HTTP
     client tripping bot-walls — spot-checked several through a real
     browser-fetch and they load fine). Only 37 were genuine 404s (18 of
     those one problem — singstat.gov.sg restructured its URLs). Your call:
     keep the report, flag the URL as stale rather than drop anything — not
     yet written back as an explicit flag anywhere (no schema field for it;
     needs its own small tracking note next session, e.g.
     `notes/stale-urls-2026-08-20.md`).
   - Merged `_EDGES-jp-kr-tw-2026-08-19.json` (63 edges, all landed).
   - The geography-as-a-node problem turned out to be **two** problems, not
     one: MX/AR had ~25 places (a state, a city) modeled as fake report nodes
     ("Chiapas — core statistical identity"); 12 OTHER country files had the
     same trick played with institutions instead (central banks, stats
     offices) — mostly already flagged in each file's own
     `_gaps.institution_node_candidates`, which is how they were caught. All
     ~53 excluded from the mint rather than shipped as fake nodes. One of
     them (`bo-ypfb`) was already independently flagged in the LIVE corpus's
     own dropped-notes, which is also how a second thing got caught: one new
     edge (`bo-alfabetismo → bo-educacion`) was a near-repeat of a claim
     already rejected once for weak evidence — dropped rather than let it
     quietly reappear.
   - Live-wins applied uniformly (not just the 4 named duplicate ids — every
     id collision resolved the same way); RBI `external-sector` tag grafted
     onto the live `in-rbi-balance-of-payments` per this note.
   - Also fixed along the way, none of it anticipated going in: 132 reports
     had `jurisdiction_level: international` but kept a specific country code
     instead of `INT` (existing validator rule, not a new one); 21 dependency
     edges were containment mis-modeled as dependency (dropped — the
     containment is already expressed via `part_of`); 40 edges carried a
     free-text `reference_period` ("continuous") where the schema wants a
     structured object (stripped the field rather than invent numbers from
     prose).
   - **Palette re-damped, same session** (Thomas: do it now). Shares
     inverted — ASIA 4.0%→28.5% (now largest), SA 9.3%→21.9%, AFR
     32.2%→15.3% (was largest), EU/US/CA all fell to 4–6%. New chroma tiers:
     ASIA/SA (≥20%) 55%, AFR (15.3%) 75%, EU/US/CA/IN (3–7%) 90%, everything
     under 3% stays full. Applied as a straight per-family chroma multiplier
     in OKLCH space (hue and L untouched) — see `palette.ts`'s v4 note.
   - **Camera-fit re-measured, same recipe as the path-dependence fix**: 1 806
     framed nodes now (up from 958), furthest/p95 ratio **1.38×** — well
     inside the 5.675× failure line, actually a better margin than pre-mint
     despite nearly double the nodes. See the updated comment in
     `InfluenceGraph.tsx`'s `measureFit`.
   - **Not done yet**: the stale-url tracking note above (now written —
     `notes/stale-urls-2026-08-20.md`), and the pulse/beam item (4) which was
     already next in line.

5b. **Per-country fold — DONE 2026-08-20, later the same day.** Thomas ran the
    just-shipped mint himself and reported every tier but Global unusable:
    *"we need a cap at a certain number of nodes... when we had 1250 nodes it
    was already too dense... in hindsight I should have known this would
    happen at 3000."* Measured before fixing, not assumed: opening "Nations"
    put **2,467 of 3,073** reports on screen at once (tier 2 cumulative,
    counted straight from the corpus), because 2,071 of those are
    jurisdiction_level `federal` spread across **139 countries**, and the
    tier ladder (built 2026-08-12 against a ~728-report, few-dozen-country
    corpus) had no fold axis narrower than "the whole family". "States" was
    2,873; "Everything" 3,073 — i.e. every tier past Global showed nearly the
    whole corpus regardless of which button was pressed.
    - Fix: a second, independent fold axis in `src/lib/hierarchy.ts` — a
      report whose tier is open but whose COUNTRY hasn't been individually
      expanded now folds into that one country's orb instead of drawing as
      itself. Full model in §4's new bullet above and in the comment on
      `resolveId`.
    - This deliberately **revisits** (does not overturn) the "no per-branch
      drilldown" call from 2026-08-12 (*"I want double clicking the EU to
      open all national level nodes"*) — that was the right call for a corpus
      where no family held more than a handful of countries; ASIA alone now
      holds 14, and the country-branch axis Thomas declined at that scale is
      the one he asked for at this one.
    - Presented as one of four options (country-fold; a blunt authority-based
      node cap; full per-continent "galaxy" scenes, Thomas's own
      Milky-Way/Andromeda framing; a lighter galaxies-via-layout middle path)
      before building — Thomas picked this one as the first move regardless
      of which direction he ends up taking longer-term.
    - Verified three ways, not just by tsc passing: (1) `npm run validate` —
      54 logic checks including new ones for `countryOrbId`/`toggleCountryOpen`
      round-trips and the fold/unfold cases, all pass, `npm run build` clean;
      (2) a real headless-Chromium measurement (same recipe as the
      camera-fit work) against the actual built app reading the on-screen
      "N of 3,091 reports shown" readout, not a simulated count — confirmed
      Global/Nations/States/Everything ALL now show 396 real nodes by
      default (down from 396/2,467/2,873/3,073), and that opening Canada
      specifically at the Nations tier adds exactly Canada's own reports
      (467) while every other country stays folded; (3) no console/page
      errors in that same run.
    - Shipped: `src/lib/hierarchy.ts`, `src/App.tsx`, `src/lib/savedViews.ts`,
      `src/components/InfluenceGraph.tsx` (the position-seeding-on-reveal
      logic now seeds from a country orb's last position first, family orb
      as fallback), `scripts/test-logic.ts`.
    - **Not done yet, and worth flagging explicitly**: there is no UI
      affordance to re-fold a single country short of a full Reset (same
      asymmetry as `toggleDrilldown` — deliberate, not an oversight, but
      worth Thomas seeing it live before deciding whether it needs one). No
      "N countries opened" readout exists anywhere.

5c. **Galaxy clustering (Phase 1) — DONE 2026-08-20, same evening again.**
    Thomas looked at the shipped per-country fold, asked what the still-hiding
    387 nodes in his "4 of 12" screenshot were (answer: the pre-existing
    `Countries` scope/family FILTER chip at bottom-centre — unrelated to the
    country-open state above, isolated to 1 of 12 colour families; click it
    and hit "All" or shift-click Reset to clear it, plain Reset alone does not
    since the filter is deliberately excluded from that gesture), then decided
    on option 3 from 5b's conversation: real "galaxies" — *"if I look at
    canada the provinces are not random, they would be separate clusters just
    like the continents."* Explicitly chose Phase 1 (the cheap-to-try
    single-scene version) over the full multi-scene rewrite as the first move.
    - **New file `src/lib/galaxyForce.ts`**: a d3-force-3d custom force, same
      shape as `geoAffinity.ts`'s `countryAffinityForce` (ref-read strength so
      the slider never rebuilds the layout, `.initialize`/callable contract).
      Pulls every node toward its own colour-FAMILY's centroid (gentle,
      `FAMILY_PULL = 0.028`) and its own COUNTRY's centroid (stronger,
      `COUNTRY_PULL = 0.07`) every tick — the country pull is the tight,
      visible "cluster" shape; the family pull just keeps a family's
      countries from drifting into another family's territory.
    - **Deliberately not a contradiction of `geoAffinity.ts`'s "continent is
      not a relationship" objection** — read the long note atop
      `galaxyForce.ts` before touching either force. That objection was about
      pulling country A toward UNRELATED country B because they share a
      colour bucket; this force never does that — it only pulls a node
      toward its OWN group's centroid, the standard d3 cluster-force pattern.
      Thomas asked for the shape geoAffinity was built to avoid producing
      *by accident*; here it's deliberate, by name, with a stated mental
      model (Milky Way / Andromeda).
    - **Provinces/municipalities are NOT a third level yet — checked, not
      guessed.** Counted the real corpus before answering Thomas: of 606
      provincial/municipal reports, only 130 (21%) have a `region` field
      that splits cleanly into "Country — Province"; the other 79% are free
      prose ("Yaoundé, Cameroon", "All 77 communes of Bénin...") with no
      reliable delimiter, some describing several sub-units in one blob with
      nothing to extract at all. Clustering by a field wrong 4 times out of
      5 would read as broken. This is a DATA gap, not a rendering one — the
      mechanism is identical once a clean sub-national field exists (country
      already proves the pattern is safe); it needs its own data pass
      first, not a text-parsing hack today.
    - New `ViewSettings.galaxy` (0–3, default 1 — ON, not opt-in, since
      Thomas asked for this directly rather than discovering it) in
      `src/lib/view.ts`; new "Galaxy pull" slider in `ViewControls.tsx`;
      wired into `InfluenceGraph.tsx`'s `forceGraph` memo alongside
      `geoAffinity`.
    - **Verified, not assumed**: `npm run validate` (59 logic checks, up from
      54 — new `galaxyForce` tests cover no-NaN-after-200-ticks, two same-
      family countries drawing closer without merging, strength-0 being a
      true no-op, and a pinned/isolated-shelf node never being nudged) and
      `npm run build` both exit 0. Separately, a real headless-Chromium run
      against the full merged corpus (Everything tier, temporary debug hook,
      stripped before shipping) measured actual settled positions: at the
      100% default, countries sit 1.92× further from each other than their
      own members sit from their own centroid; at the 300% ceiling, 3.49× —
      separation scales with the slider as it should, zero NaN positions at
      either setting.
    - **Not done**: options 2 (blunt node cap) and 4 (galaxies via layout
      only, no new force) from 5b's conversation were superseded by Thomas
      picking 3 directly rather than trying them first — fine, his call, but
      don't assume they were tried and rejected. No visual/camera check has
      been done on an actual screen (only measured via harness) — worth
      Thomas looking at it live before calling this finished. The "actual
      separate scenes, camera flies between galaxies" heavier version of
      option 3 was NOT built — this is the single-scene, one-force version,
      deliberately the cheaper thing to try first.

5d. **Isolate feature + three-issue follow-up — DONE 2026-08-20, same
    evening again.** Thomas's message after 5c raised three things at once:
    (1) the galaxy effect "felt like a lot was missing... expected several
    clusters"; (2) no way to show just Israel plus its international ties,
    with the Countries filter's 12 options too coarse; (3) searching
    "Israel" in the find bar returned nothing.
    - **(2), built**: the Isolate toggle described in §4 above. Reuses the
      existing focus/trace walk (`selection.ts`'s `buildFocusIndex`/
      `computeFocus`), unchanged, just pointed at an unfiltered index instead
      of the visible one. `view.ts` (+`isolateFocus: boolean`),
      `ViewControls.tsx` (+Focus-section checkbox), `App.tsx` (the two new
      memos), `scripts/test-logic.ts` (+ the Israel/MERCOSUR pinning test).
      `npm run validate` 61/61, `tsc --noEmit` clean, `npm run build` clean.
    - **(2), investigated live and found a real data gap, not a bug**:
      selecting Israel's country orb with Isolate on shows Israel alone, 0
      others. Traced directly against the corpus (not the UI): all 29 of
      Israel's reports are `federal`, and all 26 dependency edges touching
      any of them are Israel-to-Israel — zero cross-border edges recorded at
      all. The same check across every country with 5+ reports found 18 more
      in the same state (Indonesia, Taiwan, Philippines, Japan, South Korea,
      Vietnam, Singapore, Iran, Thailand, Iraq, Myanmar, Saudi Arabia,
      Afghanistan, Yemen, Syria, Sudan, Mauritius, Sierra Leone — mostly from
      the item-5 mint). Full list and counts in
      `notes/cross-border-gaps-2026-08-20.md`, framed as a research queue
      item — **no edges were invented to paper over this**, per rule 2.
    - **(3), diagnosed, not yet independently reproduced against Thomas's
      exact live session state**: search obeys the same scope filter as
      everything else (`SearchPanel` is passed `within={predicate}`), by
      design, so it never suggests flying to a currently-hidden node. His
      screenshot showed the Countries filter at "1 of 12" at the time. A
      direct unfiltered test of the search function itself for "israel"
      returned 10 correct results, so the search algorithm is not the
      suspect — clearing the Countries filter and re-searching is the
      likely fix. Flagged to Thomas as "most likely," not confirmed against
      his actual session.
    - **(1), explained, not yet resolved**: a real tension between 5b and 5c.
      The per-country fold (5b) reduces most countries to a single-point orb
      by default; the galaxy force (5c) needs several visible points per
      country to read as a cluster rather than a dot. Out of the box, most
      of the "galaxy" is single stars, not clusters — which is exactly what
      Thomas reported. Flagged to him with the suggestion to open a handful
      of countries manually and look again before deciding whether defaults
      (e.g. `COUNTRY_FOLD_FROM_TIER`, or which countries start pre-opened)
      should change.

5e. **Regions/Organizations panel + Countries directory — DONE 2026-08-20,
    next thing Thomas asked for.** His words: *"if I select countries from
    the panel it brings up 12 mixed nations and organizations/regions...
    we should have a menu with north america, south america, asia, europe,
    middle east, pacific islands, IMF, eu, brics, etc. The other panel can
    simply be a directory of nations... when we open a nation or region we
    should see how it ties to the international level and the connections
    within it."* The "12 mixed" is the existing `ChipBar`/`SCOPE_GROUPS`
    filter — six single countries and six continent-ish buckets sharing one
    list because they share a `ColourFamily`, a palette concept, not a
    geography or membership one. Left untouched, deliberately — it is a real,
    different feature (a FILTER: both-endpoints-visible, drops cross-border
    edges) from what was actually wanted here (an ISOLATE: keeps them, same
    mechanism the single-node Isolate from item 5d already uses).
    - **New file `src/lib/regions.ts`.** `Continent` (8 buckets — North
      America, South America, Europe, Middle East, Africa, Asia, Oceania &
      Pacific, International), deliberately NOT the same partition as
      `ColourFamily`: splits Middle East out by name, folds Russia into Asia
      and Greenland into Europe to match calls `palette.ts` already made for
      `COUNTRY_FAMILY`/`COUNTRY_LABEL` rather than re-litigate either.
      `CONTINENT_OF` maps all 142 country codes live in the corpus —
      verified by a direct script cross-check against every
      `src/data/research/*.json` file: zero missing, zero stray entries.
      `RegionGroup` unifies four kinds behind one `matchesRegionGroup(node,
      group)` predicate: `continent` (reads `CONTINENT_OF`), `bloc` (reads
      `COUNTRY_BLOCS` from `geoAffinity.ts` OUTRIGHT — same source of truth
      the galaxy/geo-affinity layout already uses, so this can never disagree
      with them about who is in NATO or BRICS), `publisher` (a stateless
      body with no country — IMF, World Bank, UN — matched by substring
      against `publisher`, checking a folded orb's `.members` too since an
      orb's own `.publisher` is a synthetic "N folded reports" string), and
      `country` (one nation, for the directory — derived from
      `COUNTRY_LABEL`'s keys rather than hand-duplicated, so a country added
      there in the normal course of research appears here automatically).
    - **`selection.ts` generalised, not duplicated.** `walk()`'s single
      `startId` became `startIds: Iterable<string>`, seeding `seen`/`queue`
      from the whole set up front — an edge directly BETWEEN two seeds is
      still collected (the `edges.add` happens before the "already seen"
      check skips re-queuing), so "isolate this region" gets its own internal
      connections for free, no special case. `computeFocus` (single node) is
      now just this with one seed; new `computeGroupFocus(index, seedIds,
      show)` is the multi-seed form `regions.ts` calls into. Same unfiltered
      index item 5d built (`unfilteredFocusIndex` in `App.tsx`), reused
      outright — a region's international ties survive by the same
      mechanism Israel's did.
    - **`App.tsx`**: new `selectedGroupId` state, mutually exclusive with
      `selectedId` (every place that already sets one now clears the other —
      node click, Escape, empty-space click, Reset, `IsolatedShelf`). New
      `selectedGroup`/`groupFocus` memos; `visible` now checks `groupFocus`
      FIRST, ahead of the existing single-node `isolateFocus` and the scope
      filter — most specific, most recent intent wins. A group selection
      always isolates; unlike a single node there is no useful "selected but
      not isolated" state for a whole region to sit in.
    - **New `src/components/GroupsPanel.tsx`.** One floating panel (bottom
      right, its own collapsed pill, same outside-click/Escape-closes pattern
      `ChipBar` already uses), two sections inside: "Regions & Organizations"
      (continents, then a curated `FEATURED_BLOCS` subset of `GeoBloc` — EU,
      NATO, OECD, G7, BRICS, Commonwealth, USMCA, MERCOSUR, Arab League,
      African Union — then the publisher orgs) and "Countries" (a search box
      over every `COUNTRY_GROUPS` entry). Clicking a row calls
      `handleChooseGroup`, which isolates; clicking the same row again turns
      it off, matching every other isolate-first control in the app. **Scope
      call, worth Thomas seeing before deciding it's final**: this is ONE
      shell with two visual sections, not two independent `PanelShell`s —
      both screen-edge slots (left/Reports, right/View) were already taken,
      and rewriting `PanelShell` to support more than one panel per edge was
      out of scope for this pass.
    - **New `panels.groups` visibility key** (`MenuBar.tsx`) — a plain
      addition alongside `panels.countries` (the old filter), not a
      replacement; `onShowAll` in `App.tsx` updated to match.
    - **Backfilled 52 missing `COUNTRY_LABEL` entries** (`palette.ts`), found
      because the new country directory needs real names, not bare codes:
      the 139-country mint added `COUNTRY_FAMILY` entries for all of them but
      never labels, so China, India, Japan, Mexico, Indonesia and 47 others
      were falling back to a bare ISO code everywhere a label renders (the
      `Flag` component's fallback path too, not just this new panel). Same
      kind of backfill this file already describes happening twice before —
      "add a name when a country gets its first node" quietly stopped being
      followed the same way, at the same scale-up, again.
    - **Verified**: `npm run validate` (74 checks, up from 61 — new tests for
      `computeGroupFocus`'s seed-to-seed edge collection and its "walks OUT
      of the group same as single-node isolate" behaviour, `matchesRegionGroup`
      for all four kinds including an orb-with-one-IMF-report-inside case,
      and a `continentOf`-vs-`COUNTRY_FAMILY` coverage check that the two
      hand-authored tables haven't silently drifted apart), `tsc --noEmit`
      and `npm run build` both clean. A real headless-Chromium run against
      the full merged corpus at the Everything tier: isolating "Middle East"
      shows exactly 6 real reports (consistent with the cross-border-gap
      note — 6 of the region's 7 countries are on that zero-cross-border
      list, only the UAE has real international ties recorded); isolating
      Israel from the new country directory independently reproduces the
      documented 0-shown result through this new code path; isolating "IMF"
      shows 42 real reports; every isolate correctly reverts to 396 of 3,091
      on a second click.
    - **Not done, explicitly deferred rather than silently skipped**:
      broadening the MAIN search bar (`SearchPanel`) to also find a region,
      bloc, publisher or country and isolate it the same way — Thomas asked
      for this in the same message ("let the main search bar also pull up a
      nation, regions, or node or edge or doc") and it did not make it into
      this pass. Also not done: the reported "Israel search yields nothing"
      bug from 5d was diagnosed but never re-tested against Thomas's actual
      live session state.

5f. **Bottom-centre slot swap — DONE 2026-08-20 (item 5g).** Thomas resolved
    5f's own open scope question directly: *"lets put the new Regions/
    Countries front and centre bottom of the graph. Kill the old Countries
    that currently sits on the bottom in the centre."* — option (a), a real
    deletion, not the relocate-and-demote (b) 5f had flagged as the
    reversible guess if this needed to be assumed.
    - **`ChipBar` deleted outright** from `App.tsx` (~378 lines: the
      component, its 8 dedicated style consts, and the now-dead-only helpers
      `toggleFamily`/`toggleScope`/`scopeCounts` and palette imports
      `ALL_SCOPES`/`SCOPE_COLOUR`/`SCOPE_LABEL`/`scopeOf`/`FAMILY_INK`/
      `ColourFamily`/`Scope`). A dated tombstone comment sits where the
      component used to be. **The `FilterState.scopes`/`SCOPE_GROUPS` FILTER
      mechanism itself was deliberately left alone** — nothing in
      `lib/filter.ts`/`lib/palette.ts` was touched, it is simply unreachable
      from the UI now (no control left ever sets `filter.scopes` away from
      null/"All"). Recoverable from git history if a UI for it is ever wanted
      again — this was a UI deletion, not a data-model one.
    - **`GroupsPanel` moved into the vacated bottom-centre slot** (`wrap`
      style in `GroupsPanel.tsx`: `left: 50%, transform: translateX(-50%)`,
      same centring trick `ChipBar` used) **and now defaults to visible**
      (`groups: true` in `MenuBar.tsx`'s `PANELS_HIDDEN` — the one exception
      to "every panel hidden by default," since Thomas asked for this control
      specifically to be on screen without hunting for it in the Panels
      menu).
    - **The §7 `PanelShell`-one-edge trap did not end up applying**:
      bottom-centre was never a `PanelShell` edge (only left/Reports and
      right/View are), so this was the free-floating-panel pattern
      `GroupsPanel` already used, just relocated — no `PanelShell` change
      needed.
    - Verified: `npx tsc --noEmit`, `npx vite build` both clean (run directly,
      not through `npm run` — see §3's note on why). Shipped to the device
      mid-session; not independently confirmed live on Thomas's own screen
      by this agent — worth him taking a look, same as every other item this
      update that only got a headless/sandbox check.

### [Agent] — next build rounds, in order

6. **FIXED 2026-08-20 — the layout's path-dependence.** Was the top open bug:
   cold-starting at spread 10000% settled to a core radius of **240,508**;
   ramping the slider up to 10000% in a live session settled at **17,217** —
   factor of fourteen, identical settings. Thomas's *"sometimes the cluster is
   a ball, sometimes it is oblong"*.
   **Root cause**: the `forceGraph` memo (`InfluenceGraph.tsx`, deps
   `[graph, spreadApplied]`) seeded every node from `lastPositions` on ANY
   rebuild — including a pure spread change, where `graph` itself hadn't
   changed. That seeding is genuinely needed for drilldown continuity (a tier
   toggle should keep nodes where they were), but applying it to a spread-only
   change meant the new force parameters only ever nudged an already-relaxed
   cloud, never re-relaxed one from scratch the way a cold load does.
   **Fix**: a new `prevGraphForLayout` ref tracks the `graph` reference the
   memo last ran with; a pure spread change (`graph` unchanged) now skips
   every seed path and falls through to an unseeded node, exactly like first
   load. Drilldown/tier/filter changes are untouched — they still seed from
   `lastPositions` as before.
   **Verified**, not just built: a temporary headless Playwright harness
   (same recipe as `notes/camera-fit-measurement-2026-08-19.md`, sandbox copy
   only, never merged) reproduced the bug on the unfixed code first —
   cold 113,651 vs ramped 20,034, ratio 5.67 — then re-ran on the fixed code:
   cold 113,650 vs ramped 113,307, **ratio 1.003**. `npm run validate` (44/44,
   1250/1079) and `npm run build` (tsc + vite) both clean before and after.
   Full detail in `nodeScaleFor`'s comment in `InfluenceGraph.tsx` and the
   `forceGraph` memo's seeding block (search `spreadOnlyChanged`).
   **Not re-derived**: whether `nodeScaleFor`'s cap of 2000 can now come down,
   now that the worst-path cold-start number and the ramped number agree —
   worth a look next time that cap is touched, but not done here since it
   wasn't the thing that was broken.
7. **A legend — DONE 2026-08-20 (item 5g).** `components/Legend.tsx`, new — a
   collapsed-pill panel, bottom-right (`GroupsPanel`'s old slot, now vacated
   by 5f). Documents all six live encodings: colour (country family, via
   `FAMILY_INK`/`COUNTRY_FAMILY`), fill darkness (government tier), hollow
   ring (one-off instrument), size (authority), line colour (source's
   family), pulse rate (publication frequency) — small pure-CSS mockups per
   row (`FamilyDots`/`TierRamp`/`HollowPair`/`SizePair`/`PulseDemo`) rather
   than live Three.js material previews. Verified: `npx tsc --noEmit`, `npx
   vite build` clean.
8. **Neighbourhood focus — DONE 2026-08-20 (item 5g).** "Show this node and
   everything within N hops." New `computeNeighbourhoodFocus` in
   `lib/selection.ts` — `walk()` gained an optional `maxHops` param (a node
   at exactly the limit is still included, its own edges are just never
   expanded past it); `computeFocus`/`computeGroupFocus` call it unchanged
   (no `maxHops` = the original unbounded walk). New `view.neighbourhoodHops`
   slider (0–5, `NEIGHBOURHOOD_HOPS_MAX` in `view.ts`) in `ViewControls.tsx`'s
   Focus section. In `App.tsx`'s `visible` precedence chain, wins over plain
   Isolate when both would apply (bounded is the more specific ask), loses to
   group Isolate (still the most specific). Verified: `npx tsc --noEmit`,
   `npx vite build` clean, plus a pinned `test-logic.ts` case (5-report chain
   a→b→c→d→e) checking the exact hop boundary — hops=2 includes b/c, excludes
   d/e, the edge just past the boundary is never collected; hops=0 is "just
   the selection"; a hop limit past the graph's real depth matches the
   unbounded walk exactly.
9. **Arrow-key / on-screen fly navigation — DECLINED 2026-08-20.** Thomas:
   *"dragging works and I can easily spin the graph."* Not built. Left here
   rather than deleted so a future session knows this was asked and turned
   down once, not simply never offered.
10. **Typed edges — not started.** What a trunk's "type" means when one
    rendered line stands for 57 real, mixed edge relationships underneath
    it. Genuinely not begun; still needs its own build round.
11. **Research backlog — explicitly deferred by Thomas, 2026-08-20**: *"dear
    god that is for the next agent."* Untouched this update: the
    candidates-only tier (722 nodes with no edges), 170 `_dropped` research
    leads, BRICS G.4 (Brazil 3/24 and China 1/12 never dispatched; open by
    grepping node descriptions for international-node names).
16. **New, logged 2026-08-20, not built** — finding more data for, and
    finishing off, the sparse/zero-cross-border-edge countries.
    `notes/cross-border-gaps-2026-08-20.md` already has the list (19
    countries with zero recorded cross-border dependency edges, surfaced
    during 5d). Thomas's own framing: *"Don't forget grok can help when we
    get to this one, it is great at finding data you can't and as always you
    have the final say as to what to use that grok uncovers."* Distinct from
    item 11 above — 11 is the candidates-only/dropped-leads/BRICS-G.4
    backlog, this is specifically the cross-border-gap list. Whatever Grok
    turns up is a LEAD, not a source — §2 rule 2 still applies in full
    (nothing goes in the graph unless a document actually says the
    dependency exists) and rule 3 (raw-verify before trusting a quote) applies
    doubly to anything Grok surfaces, the same as it already does to WebFetch.
    **STATUS 2026-08-22 (5r): both Grok rounds are raw-verified — 59/62 pass,
    see `notes/crossborder-verification-2026-08-22.md`. The mint is blocked on
    two Thomas decisions (relationship-type mapping vs schema extension; and
    flagship-report vs institutional-node attachment for the six countries
    with no stats-office node) — the note's "Recommended merge plan" is the
    next round's starting point.**

17. **HUD layout pass — DONE 2026-08-20 (item 5h).** Asked live, off a
    screenshot of the running app rather than a written spec: Compare and
    Legend moved to flank `GroupsPanel` at bottom-centre, the tier bar
    confirmed staying put at bottom-left now that it has that corner to
    itself, the search bar moved off dead-centre to clear the Reports panel,
    the calendar tab flipped to the search bar's right, and the search bar
    made minimizable. Full writeup archived at
    `archive/Previous Handoffs/HANDOFF-2026-08-20-5h-hud-layout-pass.md`.
    `npx tsc --noEmit` clean (against the FULL research corpus,
    staged into the sandbox specifically for this — `slices.generated.ts`
    imports every file by name and `tsc` cannot resolve the program
    otherwise), `npx vite build` clean, `test-logic.ts` unchanged at 90/90
    (no data/logic touched), plus a headless-Chromium screenshot with all
    three bottom-centre panels expanded at once — the actual worst case for
    the corner, not just the collapsed-pill default.

18. **Reports panel scrolling under the tier bar — DONE 2026-08-21 (item
    5i).** A regression from item 5h's own layout pass, not caught until
    Thomas scrolled the Reports panel all the way down and reported real
    content missing, twice — the first report was wrongly closed as "just
    scrolled." Root cause and fix, plus the live DOM measurements that
    confirmed it before and after, are in this update's summary at the top
    of this file. `npx tsc --noEmit` clean, `npx vite build` clean,
    `test-logic.ts` unchanged at 90/90, confirmed live in Thomas's own
    Chrome tab (bounding-rect measurement + a scrolled-to-bottom screenshot),
    not just built.

19. **Review follow-ups, logged 2026-08-21 (item 5j) — items 1–9 DONE across
    5k/5l/5m/5n, same week. §6 is fully closed.** The full list with
    reasoning is `notes/full-review-2026-08-21.md` §6; the order there was
    followed throughout: ~~(1) orb-aware `matchesRegionGroup` + a
    folded-tier pinned test~~ **DONE 5k**; ~~(2) a bottom-dock container
    replacing the hand-placed bottom-edge coordinates + `maxHeight` on the
    View panel~~ **DONE 5k**; ~~(3) Escape priority stack, "/" input guard,
    search-choose preserving isolates~~ **DONE 5k**; ~~(4) corpus out of the
    JS bundle + batched startup warnings~~ **DONE 5l** — see the item 5l
    writeup at the top of this file; ~~(5) unlinked shelf → summary +
    list~~ **DONE 5m** — see the item 5m writeup at the top of this file;
    ~~(6) tier-1 colour pass (hollow opacity 0.1→0.3, damp floor →70% for
    ASIA/SA, lens greyed at tier 1)~~ **DONE 5n**; ~~(7) validator rules for
    `COUNTRY_LABEL`, `strength`, and the `orb:`/`corb:`/`->` namespaces~~
    **DONE 5n**; ~~(8) search accent-folding/full-corpus pass + the
    calendar year-boundary fix~~ **DONE 5n**; ~~(9) PNG re-entry guard +
    zoom-baseline freeze~~ **DONE 5n** — see the item 5n writeup at the top
    of this file for all four.

### Offered — picked up this update (5g)

12. **Export a PNG — DONE 2026-08-20 (item 5g).** 2× device pixel ratio, no
    HUD. `components/PngExport.tsx`, new — a no-render component mounted
    inside `<Canvas>`. "Without the HUD" needed no work (the HUD is ordinary
    DOM painted over the canvas by the browser compositor, never in the
    canvas's own pixels). "2×" needed one real fix: doubling `gl`'s pixel
    ratio alone leaves the `EffectComposer`'s bloom buffers sized for the old
    resolution (their own resize effect depends on CSS size, not ratio), so
    the composite would be wrong — fixed with one manual
    `composer.setSize(width, height)` call right after the ratio bump
    (unchanged CSS numbers, but the `postprocessing` package's own
    `setSize` always re-reads `renderer.getDrawingBufferSize()`, verified
    directly against `node_modules/postprocessing/build/postprocessing.js`,
    not assumed). Capture happens in a priority-2 `useFrame` — `@react-three/
    postprocessing`'s own `EffectComposer` renders via a priority-1
    `useFrame`, so priority-2 is guaranteed to run immediately after that
    frame's composited render. `composerRef` (a real forwarded ref to the
    composer instance, wired in `App.tsx`) is what makes the manual resize
    possible — `useThree()`'s `gl`/`scene`/`camera` alone are not enough.
    Verified: `npx tsc --noEmit`, `npx vite build` clean.
13. **Deep links — DONE 2026-08-20 (item 5g).** `lib/deepLink.ts`, new. Same
    field set and tolerant-merge restore pattern `savedViews.ts` already
    uses, minus `id`/`name`/`savedAt`/`panels` (link-specific: a shared link
    is about the DATA view, not one browser's saved-view bookkeeping or
    which HUD panels someone else has open), plus `selectedGroupId` (newer
    than `SavedView`'s own schema, needed for a link to reproduce a
    GroupsPanel-based isolate). Encoded as JSON → base64 → `?rig=` query
    param — not `#hash`, since some link-preview bots/chat clients strip
    fragments before fetching a preview, which would silently drop the whole
    payload. Read once at module scope (`DEEP_LINK` in `App.tsx`, same
    pattern as `STARTUP_VIEW` — has to happen before the first `useState`
    call, so it cannot be a hook), wins over a starred saved view when both
    are present, then scrubbed from the address bar via `history.replaceState`
    once applied so a stale link is never accidentally re-shared. "Copy link
    to this view" button added to `MenuBar.tsx`'s Views ▾ menu, Clipboard API
    with an `execCommand` fallback. Verified: `npx tsc --noEmit`, `npx vite
    build` clean, plus a standalone manual round-trip check against a sample
    `DeepLinkState` before wiring it into `App.tsx` (encode → URL → decode,
    exact equality).
14. **Compare two nodes — DONE 2026-08-20 (item 5g).** Full writeup, including
    the bottom-left tier-bar collision caught and fixed before shipping,
    archived at `archive/Previous Handoffs/HANDOFF-2026-08-20-5h-hud-layout-
    pass.md`.
15. **Path finder — DONE 2026-08-20 (item 5g), same panel as 14.** Same
    archived writeup as item 14.

Parked deliberately: 134 cadences where the publisher states nothing countable;
the 7 single-use `proposed:` tags; `diary.csv` relocation (Thomas's personal
cross-project diary — not the project's, leave it alone).

---

## 6. Architecture crib — where things live

- **`src/App.tsx`** — state owner: filter, drilldown, selection (`selectedId` +
  `selectedEdgeKey`), view settings, lens, panel visibility, saved views, the
  loading-curtain latch; the HUD; the hover chip; the right-hand `Detail` card;
  the left-hand `EdgeEvidence` card; the lighting rig; Canvas + bloom.
  `describePeriod` and `hostOf` live here. `STARTUP_VIEW` is read at module
  scope — see the comment for why it cannot be a hook.
- **`src/components/InfluenceGraph.tsx`** — the imperative renderer. One
  `forceGraph` memo builds everything (deps: `[graph, spreadApplied]` ONLY —
  keep it that way); every view change flows through refs + mutation effects.
  `runFit`/`measureFit` own camera + node scale; `applyFocus` owns
  dim/opacity/raycast; `useFrame` runs pulses, orb breath, hover ease, halos,
  fog, flight, and fires `onReady` for the curtain.
- **`src/lib/palette.ts`** — colour system. **`modes.ts`** — lenses.
  **`view.ts`** — every tuned scene constant, heavily documented.
  **`savedViews.ts`** — the saved-view store and its versioning rules.
  **`uiTheme.ts`** — CSS custom properties + `MENU_BAR_HEIGHT` / `HUD_TOP`.
  **`components/linkVisuals.ts`** — edge shader, `edgeShade`, `pulseMaterial`.
  **`components/nodeVisuals.ts`** — node material, fresnel rims, halos.
  **`lib/hierarchy.ts`** — tier disclosure, orbs, `DisclosedDependency`.
  **`lib/regions.ts`** — continents, treaty blocs, publisher-orgs, the
  country directory; `lib/selection.ts`'s `computeFocus`/`computeGroupFocus`/
  `computeNeighbourhoodFocus` (item 8) is the walk single-node Isolate, group
  Isolate and Neighbourhood focus all share; `shortestPath` (item 15) is a
  separate breadth-first walk over the SAME `FocusIndex`, for "how do these
  two connect" rather than "what does this rest on."
- **`lib/deepLink.ts`** (item 13) — shareable-URL serialisation, the same
  shape `savedViews.ts` uses, read once at module scope in `App.tsx`
  (`DEEP_LINK`, mirroring `STARTUP_VIEW`).
- **`components/MenuBar.tsx`, `HelpCard.tsx`, `LoadingCurtain.tsx`,
  `PanelShell.tsx`, `GroupsPanel.tsx`, `Legend.tsx`** (item 7), **`Compare.tsx`**
  (items 14/15), **`PngExport.tsx`** (item 12) — the chrome. `ChipBar`, which
  used to be in this list, was deleted 2026-08-20 (item 5f/5g) — see the
  tombstone comment in `App.tsx`.
- Data: `src/data/research/*.json` slices are compiled by
  `scripts/gen-slices.ts` into generated `public/corpus-data.json` (as of
  item 5l, replacing the tombstoned `slices.generated.ts`); browser code
  loads it via `src/data/browserCorpus.ts`'s `loadCorpusData()` (fetch +
  cache), Node scripts via `src/data/index.ts` (`node:fs`, browser-unsafe —
  do not import from browser code); both call the shared
  `src/data/assembleCorpus.ts`. `graph.ts` builds + validates (95 checks in
  `scripts/validate-data.ts` + `test-logic.ts`, up from 90 as of item 5k).

---

## 7. Known traps — the ones that will actually bite

- **`PanelShell` supports exactly one panel per screen edge; the BOTTOM edge
  is now the dock's, not a set of hand-anchored corners (2026-08-21, item
  5k).** Left/Reports and right/View are the two `PanelShell` edges. The
  entire bottom edge — tier bar, Compare, `GroupsPanel`, Legend,
  `IsolatedShelf` — lives inside `bottomDock` (`App.tsx`), a fixed
  full-width grid whose cells cannot overlap; none of those five carries its
  own coordinates any more. **The next bottom panel is a one-line addition
  to a dock cell, not a coordinate hunt.** Still hand-anchored and still
  spoken for: top (`MenuBar`), top left-of-centre (`SearchPanel`,
  `SEARCH_BAR_LEFT`), the calendar tab to its right — a new TOP-row element
  still needs the old check-every-neighbour discipline (next trap), or the
  top row needs its own dock.
- **A free-floating panel's coordinates are not reserved anywhere — check
  every existing `position: fixed` panel by eye before picking new ones.**
  This trap collected FOUR real casualties before the bottom dock retired it
  for the bottom edge (Compare/tier-bar pre-ship 2026-08-20; Reports/tier-bar
  item 5i; the review's Compare-pill-unclickable and Legend-covers-shelf,
  both confirmed live at 1280×720 and both structurally killed by the dock in
  item 5k). It still applies in full to the top row and to anything new that
  chooses fixed coordinates over a dock cell. Two 5k additions that keep it
  honest: a DEV-only overlap tripwire in `App.tsx` now console.warns when two
  fixed panels intersect (prose → runtime check), and one measured lesson for
  whoever extends the dock — reserve space with an empty grid TRACK, not a
  margin on a cell's item; a margin sizes the item, not the track, and the
  first cut of the dock proved it by putting the shelf back under the Legend.
- **The same trap also bites a `PanelShell`-hosted panel that's allowed to
  grow tall, not just two free-floating panels planted at the same spot —
  caught the hard way, 2026-08-21 (item 5i).** The Reports `PanelShell`
  (`left: 20`) and the tier bar (`tierBarWrap`, `bottom: 20, left: 20`) share
  a corner the same way Compare and the tier bar once did, but nobody
  noticed at the time because `PanelShell` itself has no `bottom`/height —
  height comes from the content's own `maxHeight`, one level removed from the
  coordinate that actually collides. The Reports panel's `maxHeight` (`panel`
  style, `App.tsx`) also had the wrong reference point: it assumed a 20px top
  offset when the panel actually starts at `HUD_TOP` (44px), so it ran past
  the true bottom of the viewport even before the tier bar entered into it.
  Combined with `tierBarWrap`'s `zIndex: 6` beating `PanelShell`'s `zIndex:
  5`, the tier bar painted over the panel's own last few list entries instead
  of just sitting beside them — scrolling further did nothing, because there
  was nowhere further to scroll to; the content was already fully scrolled,
  just hidden. Fixed by anchoring the `maxHeight` formula to `HUD_TOP` and a
  named `REPORTS_PANEL_BOTTOM_CLEARANCE` constant instead of a flat guess —
  see this update's writeup at the top of the file. **The lesson for the next
  person who touches either panel's sizing:** a content `maxHeight` is a
  coordinate too, and needs the same "check every other fixed-position panel"
  discipline the bullet above already asks for — it just doesn't look like
  one until you go measure it. (The sibling case this predicted — the View
  panel clipping 21px at 720-tall windows with no scrollbar — was real, was
  caught by the 5j review, and got the same fix in 5k:
  `VIEW_PANEL_BOTTOM_CLEARANCE` in `ViewControls.tsx`.)
- **Isolating a group can show a surprisingly small number with no
  explanation on screen.** "Middle East" isolates to 6 real reports — correct
  (6 of its 7 countries are on the zero-cross-border-edges list in
  `notes/cross-border-gaps-2026-08-20.md`, so almost everything folds into
  orbs with no real report count and no international tie to walk to) but
  looks like a bug to anyone who hasn't read that note. Worth a "why so few?"
  affordance before this ships to anyone but Thomas.
- **A cap that silently binds costs two things at once.** `nodeScaleFor`'s cap
  was 20 while the fit was asking for 92.8: nodes rendered at a fifth of their
  size AND, because `baseLinkWidth` is a multiple of node scale, edges went
  four-fifths too thin. Neither failure names itself. **Whenever a slider
  ceiling moves, recompute the cap** — `cloudRadius ×
  TARGET_LARGEST_FRACTION / MAX_BASE_RADIUS` at the new extreme, then double
  it. That rule earned its keep within an hour of being written.
- **The camera can never end up inside the cluster by raising spread.** The fit
  frames p95 and sits at exactly **5.675 × p95** (`1.18 / sin(FOV/2)`, FOV 24°).
  Failure needs `max/p95 > 5.675`; measured 1.5–2.1 everywhere, including a
  simulated post-mint corpus. **Spread also saturates**: 1000% → 10000% buys
  2.7× radius and 25% more air, not 10×.
- **Never put a mode, tab, hover, or any view setting in the `forceGraph` memo
  deps.** Every change there resets the camera and re-warms physics.
- **A force that reads `alpha`-scaled strength needs its OWN reheat-then-refit
  effect pair, or its slider silently does nothing once the layout has
  settled** (found and fixed 2026-08-20, item 5g — the "galaxy pull has no
  effect" bug). Every `d3-force-3d` force's velocity nudge is scaled by the
  simulation's own `alpha`, which decays to ~0 after first settle;
  `view.geoAffinity` already had a matching `forceGraph.d3ReheatSimulation()`
  + delayed `requestRefit()` pair so retuning it mid-session actually moves
  already-settled nodes, but `view.galaxy` shipped in item 5c without one —
  the slider updated the ref the force reads, the force itself was correct,
  and it still did nothing, because nothing ever re-woke the simulation to
  apply it. Whenever a new force-strength slider is added, check it has this
  pair; `InfluenceGraph.tsx`, search `view.galaxy` for the fix as the
  template.
- **`meshes.current` cannot be trusted for POSITIONS** — read `positionedById`
  or `graphData().nodes`. This trap was documented and still bit this session.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`.
- **The rim-colour uniform exists only after first shader compile**
  (`userData.uRimColour` guard).
- **`onPointerMissed` can fire more than once per click** — the edge-pick path
  always OPENS, never toggles.
- **CSS transitions on cards can wedge under SOFTWARE rendering** at full scene
  load. `LoadingCurtain` unmounts on a timer rather than on `transitionend` for
  exactly this reason.
- **Menus close on `pointerdown`, not `click`** — `document.body.click()` does
  not dismiss them. Cost one false "apply is broken" result.
- **Synthetic mouse drags do NOT reach OrbitControls.** Drive camera motion in
  a harness with the app's own `autoRotate`. A null result with
  `cameraMoved: 0` nearly shipped as a finding.
- **Closed unions are cast, not parsed** — an off-union `relationship_type`
  makes edge weight NaN and PageRank spreads it everywhere.
- **Grok's JSON is not reliably JSON** — parse-check before reading.
- **Never reintroduce faceted node geometry** while fresnel rims exist.
- **The IMF DSBB aggregator is useless to a non-JS fetcher**; national NSDP
  mirrors work.
- **`public/corpus-data.json` must exist before `tsc`, `scripts/validate-
  data.ts`, or the app itself will resolve real data (item 5l).** It's
  generated by `npm run gen` (`scripts/gen-slices.ts`) from
  `src/data/research/*.json` and gitignored — a fresh checkout or a fresh
  sandbox stage needs `npm run gen` run at least once before anything else.
  This is the same trap the old `slices.generated.ts` carried (see the
  now-stale-sounding note on item 17 above); the file changed, the trap
  didn't. `src/data/index.ts` throws a clear "run `npm run gen`" error if
  it's missing — `browserCorpus.ts`'s fetch fails with an HTTP error the
  `LoadingCurtain` now surfaces instead of silently showing an empty scene.

---

## 8. The one cross-lane dependency

**Do not finalise the palette until the mint lands.** `palette-proposal.json`
damps each family's chroma by its corpus share, measured at 1,250 nodes; the
staged import moves SA to a major family and adds IL/SG outright. Palette v3
took this debt knowingly — after minting, re-count and re-damp.

---

## 9. How to hand off

1. `cp HANDOFF.md "archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
   (agents cannot `mv`/delete on the device; Thomas removes the original, or
   the new file simply overwrites it).
2. Write a fresh `HANDOFF.md` here — §1 "Read these first" always first.
3. Carry forward what is live; delete what is finished. A handoff that
   accumulates is a handoff nobody reads.
4. Write the project-memory entry if memory works; if not, park it in `notes/`
   and say so here. It was down for all of 2026-08-20 — see
   `notes/memory-pending-2026-08-20.md`.

Only one `HANDOFF.md` at the top level, ever.
