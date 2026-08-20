# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the
top level.** When it is superseded, the new session moves this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes
a fresh `HANDOFF.md` in its place. Never leave two handoffs at the top level.

Last written: **2026-08-20**, at the end of a session that corrected a
long-running false claim about git, measured three things the project had only
argued about, finished Phase 4 of the visual revamp, and fixed two rendering
bugs. Written for a FRESH agent with no memory of any of it. Supersedes
`archive/Previous Handoffs/HANDOFF-2026-08-19-visual-revamp-phase4-complete.md`,
kept for its per-item detail.

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
4. **`npm run validate` before and after any data change** (44 checks). It
   cannot run through the device bridge (`node_modules` carries the Windows
   esbuild). Working recipe: tar `src/ scripts/ package.json tsconfig.json
   index.html vite.config.ts START-HERE.md` on-device into `_to_delete/`,
   stage the tarball, extract + `npm install` in a Linux workspace, run there.
   **`START-HERE.md` is now required for the build** — Help imports it.
5. **`src/data/slices.generated.ts` is generated. Never hand-edit it.**
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

**Live corpus:** 1,250 reports · 1,079 dependencies. `npm run validate` exits 0
(all 44 checks; warnings only — the 7 single-use `proposed:` tags and the known
isolated-report list). `npx tsc --noEmit --skipLibCheck` clean. `npm run build`
clean. All re-verified on the actual device tree after the last commit of the
day.

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

**Project memory is DOWN again** — `project_memory_write` accepted writes early
on 2026-08-19 and refused them for the rest of that day and all of 2026-08-20
("not available in this session"). **Re-confirmed still down twice more,
later on 2026-08-20**: `project_memory_read` on a specific file returned
"Project memory is not available in this session" both times, once right
before the path-dependence fix and once right after (the index shown at
session start is a cached snapshot, not a live read — don't mistake it for
memory being back). Two consequences:
- The memory entry this session owes is parked at
  **`notes/memory-pending-2026-08-20.md`**, which now also carries a second
  and third addendum (the flicker-check result, and the path-dependence fix
  + its verified measurements) — a session with working memory should paste
  all of it in and delete the file.
- ⚠️ The existing memory entry `camera-fit-density-risk-2026-08-19` is **WRONG**
  and could not be corrected: it says the camera sits at ~2.8 × p95 (it is
  **5.675 ×**) and predicts a halo of edgeless nodes after the mint
  (impossible — the shelf excludes them from the fit).
  `notes/camera-fit-measurement-2026-08-19.md` supersedes it.

---

## 4. What the app is now

Assume all of this exists and works. Each carries a dated comment at the site.

- **Lenses.** `src/lib/modes.ts`: STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW.
  A recolour pass via ref + mutation effect; **never a `forceGraph` memo dep**.
- **The constellation look.** Near-black background (`#010204`), flat crisp
  panels, rotating masthead gradient, tier bar bottom-left, unlinked shelf
  bottom-right, country drop-up bottom-centre.
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
- **Saved views** (`src/lib/savedViews.ts`). Tier + view settings + filters +
  selection + panels, `schema: 1` at `rig.views.v1`, restored by MERGING into
  today's defaults. The **★ (`openOnLoad`)** is the point of the feature and is
  read at MODULE scope so the starred state is the graph's first state.
- **Loading curtain** (`LoadingCurtain.tsx`). Opaque until the renderer reports
  `settledOnce && fitted`, first load only. **The 25s safety timeout is the
  load-bearing part** — a curtain that never lifts is worse than none.
- **Sliders, current ranges:** Cluster spread **200%–10000%, opens at 200%**;
  Geo-affinity **0–500%, opens at 150%**; zoom 0.25–2.6 of fit distance.

---

## 5. THE TODO LIST

Sorted by owner, ordered by priority within each.

### [Thomas] — only you can

1. **DONE (tentatively) 2026-08-20 — the bloom flicker check.** Thomas dragged
   the glow slider to 0 while the flicker was happening: *"i think the flicker
   is gone."* Read as a soft confirmation, not a hard one — he did not say
   "definitely" and the test was not repeated. Treat bloom as the leading
   cause and try the bloom-pass fix (raise the threshold, drop `mipmapBlur`,
   or pin the bloom buffer to a fixed resolution) next; **if the fix doesn't
   actually kill the flicker, re-open this** rather than assume the diagnosis
   was solid — this project has a standing scar from carrying forward
   claims nobody re-checked (§3).
2. **Tried 2026-08-20 — right-drag panning and the low end of the zoom
   slider.** Thomas tried it (no complaint reported), so treat as probably
   working, but this wasn't an explicit yes/no confirmation — worth a quick
   "does this feel like navigation" check before building the fly-through
   feature (item 9) on top of it.
3. **Empty the recycle bins.** `_to_delete/` at the root now also holds four
   `_verify*-src.tgz` / `_fitmeasure-*.tgz` transport tarballs from this
   session's headless verification; all are throwaway and logged in
   `_to_delete/README.md`. Also `Grok - Brics+israel and singapore/_to_delete/`.
   Keep `grok-batches/` and the three BRICS/Israel/Singapore zips — sole raw
   provenance.

### [Us] — your eyes, agent's hands

4. **Pulse size/shape redesign + the beam.** Burner by your instruction. The
   set-sizes pass fixed the noise; the beam idea (continuous databases render
   their edge as a lit stream with a direction cue) replaces pulse geometry on
   the fastest edges, so shape and beam are ONE design round. Pairs with the
   soft-edge node idea (`notes/node-surface-encoding-2026-08-19.md`) — the 35
   continuous databases have the data to support all of it.
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
   - **Not done yet**: the stale-url tracking note above, and the pulse/beam
     item (4) which was already next in line.

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
7. **A legend.** Highest-value missing feature by a distance. There are **six**
   live encodings — colour = country family, fill darkness = government tier,
   hollow = one-off instrument, size = authority, line colour = the source's
   family, pulse rate = publication frequency — and the only place any of it is
   written down is an onboarding card most users dismiss once. Cheap, and it
   fixes a real comprehension gap.
8. **Neighbourhood focus.** "Show this node and everything within N hops."
   Filters today are by country and subject only. This attacks the density
   problem directly and is far cheaper than fly-through navigation. Do it
   before the mint, not after.
9. **Arrow-key / on-screen fly navigation.** Thomas's idea. drei's
   `OrbitControls` takes a `keyEvents` prop (default false) and three's
   controls already implement arrow-key panning at `keyPanSpeed = 7`, so the
   keys are nearly free — **but check `SearchPanel`'s own arrow handling
   first**, that is the one collision. On-screen direction arrows and a
   "you-are-here" cue are the real work. Note the measured fact this must be
   built around: **more spread will never put the camera inside the cluster**
   (§7), so navigation is the only way in.
10. **Phase 3**: GEO_EXPLORATION mode (geography takes the fill; needs a
    `REGION_OF` table) and typed edges — answer first what a trunk's "type"
    means when one line stands for 57 mixed edges; `methodology_depends_on` is
    the MOST common type (407). **GEO_EXPLORATION is the one mode that can
    break the camera fit**: a mode that repositions nodes swaps a scale-free
    cloud for a bounded surface and voids every number in §7, and it stops
    being a pure recolour pass so it cannot stay out of the memo deps the way
    lenses do. Re-run the fit measurement if it is built.
11. **Research backlog** (biggest total effort): the candidates-only tier — 722
    nodes with no edges; 170 `_dropped` research leads; BRICS G.4 (Brazil 3/24
    and China 1/12 never dispatched; open by grepping node descriptions for
    international-node names).

### Offered and not chosen — pick up any time

12. **Export a PNG** at 2× without the HUD. Thomas has been screenshotting with
    the Windows tool all session; a visualisation you cannot share is doing
    half its job.
13. **Deep links** — a URL encoding tier + filter + selection. Nearly the same
    serialisation `savedViews.ts` already does, but shareable, where saved
    views are local to one browser.
14. **Compare two nodes** — "what do these both rest on?". The data is there;
    nothing in the UI asks it.
15. **Path finder** — shortest documented path between two reports, highlighted.
    This is the question the corpus exists to answer and the UI never asks it.

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
- **`components/MenuBar.tsx`, `HelpCard.tsx`, `LoadingCurtain.tsx`,
  `PanelShell.tsx`** — the chrome.
- Data: `src/data/research/*.json` slices auto-load; `slices.generated.ts` is
  generated; `graph.ts` builds + validates (44 checks in
  `scripts/validate-data.ts` + `test-logic.ts`).

---

## 7. Known traps — the ones that will actually bite

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
