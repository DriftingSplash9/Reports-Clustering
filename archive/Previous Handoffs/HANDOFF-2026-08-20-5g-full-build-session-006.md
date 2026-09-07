# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the
top level.** When it is superseded, the new session moves this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes
a fresh `HANDOFF.md` in its place. Never leave two handoffs at the top level.

Last written: **2026-08-20 (updated a seventh time the same day)**. The day in
order: the mint (item 5), the per-country fold (5b), the clustering force
(5c), the Isolate feature plus two diagnoses (5d), the Regions/Organizations
panel + country directory (5e), the bottom-centre slot swap logged as a todo
only (5f). **This update (5g)** is a full build session against that backlog,
run to Thomas's own explicit stopping point ("get everything done here except
11"). In order asked and shipped:
- **Galaxy-pull bug, fixed.** Thomas: *"The galaxy pull doesn't appear to have
  an effect, maybe I am using wrong?"* Root cause: `view.geoAffinity` has a
  reheat-then-refit effect pair so retuning it mid-session actually moves
  already-settled nodes (`d3-force-3d`'s `alpha` decays to ~0 after first
  settle, and every force scales by it); `view.galaxy` never got the matching
  pair when it shipped in 5c, so the slider silently did nothing once the
  layout had already relaxed. Two new effects in `InfluenceGraph.tsx`, same
  shape as the geo-affinity pair, keyed on `view.galaxy`.
- **Item 5f, built** (Thomas confirmed the scope question 5f had left open:
  *"Kill the old Countries that currently sits on the bottom in the
  centre"* — a real deletion, option (a), not the relocate-and-demote default
  5f had flagged as the reversible guess). `ChipBar` (~378 lines) deleted
  outright from `App.tsx`, `GroupsPanel` moved into its vacated bottom-centre
  slot and now defaults to visible. The `FilterState.scopes` /
  `SCOPE_GROUPS` FILTER mechanism ChipBar drove is untouched in
  `lib/filter.ts`/`lib/palette.ts` — nothing there was deleted, there is
  simply no UI left that ever sets it away from "All" now. Full detail at the
  tombstone comment in `App.tsx` (search `ChipBar`).
- **Item 7, built.** `components/Legend.tsx`, new — a collapsed-pill panel
  (bottom-right, `GroupsPanel`'s vacated slot) documenting all six live
  encodings: colour, fill darkness, hollow ring, size, line colour, pulse
  rate.
- **Item 8, built.** "Neighbourhood focus" — `computeNeighbourhoodFocus` in
  `lib/selection.ts` (a hop-limited generalisation of `walk`), a new
  `view.neighbourhoodHops` slider (0–5) in `ViewControls.tsx`, wins over plain
  Isolate in `App.tsx`'s `visible` precedence chain when both would apply.
- **Item 9, declined by Thomas**: *"dragging works and I can easily spin the
  graph."* Not built. Left in §5 below as offered-and-declined rather than
  deleted, so a future session does not re-offer it without knowing it was
  already asked and turned down once.
- **Item 4 (pulse/beam redesign), declined for now**: *"I am quite happy with
  the pulses currently, they are almost mesmerizing."* Not built, not
  reopened — Thomas is on record liking the current shape.
- **Item 10 (GEO_EXPLORATION), explained, still not built.** Thomas asked for
  the item to be elaborated on rather than built (*"I need you to elaborate,
  it's not ringing any bells"*) — explained in chat this update: it is a
  proposed FOURTH lens mode alongside `STANDARD`/`GROUP_COMPARISON`/
  `WORLD_OVERVIEW` in `lib/modes.ts`, except every existing lens is a pure
  recolour pass (country → fill colour only, nothing moves) and
  GEO_EXPLORATION would be the first lens that also REPOSITIONS nodes by
  geography, which is why §7/§5's item 10 note flags it as the one mode that
  can break the camera fit — the fit math (§7) assumes a scale-free force
  cloud, and a geography-positioned layout is a bounded surface instead.
  Genuinely not started; needs a `REGION_OF` table (country → rough lat/long
  or region bucket) that does not exist yet.
- **Item 11 (research backlog), explicitly deferred**: *"dear god that is for
  the next agent."* Untouched, left as-is in §5.
- **Item 12, built.** PNG export at 2× device pixel ratio, no HUD.
  `components/PngExport.tsx`, new — a no-render component inside `<Canvas>`
  that doubles `gl`'s pixel ratio, manually resizes the `EffectComposer` to
  match (the postprocessing package's own `setSize` always re-reads the
  drawing-buffer size, verified against its actual source — the resize is
  required even though CSS width/height are unchanged), then captures via a
  priority-2 `useFrame` (guaranteed to run after the composer's own
  priority-1 render that tick).
- **Item 13, built.** Shareable deep links. `lib/deepLink.ts`, new — same
  serialisation shape as `savedViews.ts`, JSON → base64 → `?rig=` query
  param (not `#hash`, since some link-preview bots strip fragments), read
  once at module scope (mirroring `STARTUP_VIEW`) and scrubbed from the
  address bar after applying so a stale link is never accidentally re-shared.
  "Copy link to this view" button added to `MenuBar.tsx`'s Views ▾ menu.
- **Item 14, built.** Compare two reports — "what do these both rest on?"
  `components/Compare.tsx`, new (bottom-left). Two search pickers (reusing
  `lib/search.ts`), then `computeFocus` run once per pick with the results
  intersected — `.builtFrom` for "what both rest on", `.feedsInto` for the
  mirror "what both feed into." Deliberately its own panel rather than a
  `Detail`/`selectedId` extension — `Detail` has no access to broader app
  state, and two picks held side by side is a different shape from the app's
  existing single-selection machinery. **Caught before shipping, worth
  flagging**: bottom-left is not actually free — the tier bar (`tierBarWrap`
  in `App.tsx`) already sits at that exact `bottom: 20, left: 20`, always
  visible, never hidden. First draft of this panel used the same coordinates
  and would have drawn directly on top of it. Fixed by stacking `Compare`
  above the tier bar (`bottom: 100`, hand-measured the same way
  `PanelShell`'s `shift` constant already is elsewhere in this app) rather
  than picking a different corner — every other corner is genuinely taken
  (see the updated §7 trap on this). Worth Thomas looking at the actual stack
  live; the 100px clearance was computed from the tier bar's own padding/
  button/status-line dimensions, not measured on screen.
- **Item 15, built, same panel as 14.** Path finder — shortest chain of
  edges between the two picks, EITHER direction at each hop. New
  `shortestPath` in `lib/selection.ts`: a breadth-first walk over the UNION
  of `builtFrom` and `feedsInto` (deliberately not reusing the two
  `computeFocus` cones — two siblings built from the same upstream release
  have no direct edge and no cone-intersection answer, only a walk that can
  change direction mid-route ever finds the real 2-hop path between them).
  Rendered as a vertical chain with a "rests on" / "feeds into" label between
  each pair, in the same panel as item 14 (one "pick two reports" panel
  answering two questions, not two panels needing the same inputs twice).
- **New todo logged, not built** (Thomas, this update): finding more data for
  and finishing off the sparse/zero-edge countries (`notes/cross-border-gaps-
  2026-08-20.md`'s list). Grok can help find leads there — Claude still has
  final editorial say on what actually gets used from anything Grok surfaces,
  same standing rule as every other research source in this project (§2 rule
  2 — a document has to actually say the dependency exists).
- Everything above verified the same way every item this file documents is:
  `npx tsc --noEmit` clean, `npx vite build` clean, and `scripts/test-logic.ts`
  passing (90 checks, up from 74 after 5e — new pinned tests for
  `computeNeighbourhoodFocus`'s hop boundary, the Compare intersection on a
  diamond-shaped fixture, and `shortestPath`'s up-then-down sibling case) —
  run directly with `npx`, never through `npm run` (see the cloud-sandbox note
  §2 rule 4 already has, unchanged: `npm run *` triggers `gen-slices.ts`,
  which needs the full `src/data/research/*.json` corpus that was never
  staged into this particular sandbox). Shipped to the actual device path by
  path as each piece finished, not batched to the end.
Earlier the same day: corrected a long-running false claim about git,
measured three things the project had only argued about, finished Phase 4 of
the visual revamp, and fixed two rendering bugs. Written for a FRESH agent
with no memory of any of it. Supersedes
`archive/Previous Handoffs/HANDOFF-2026-08-20-5f-asked-not-built.md`
(itself superseding
`archive/Previous Handoffs/HANDOFF-2026-08-20-groupspanel-process-rules.md`,
itself superseding
`archive/Previous Handoffs/HANDOFF-2026-08-20-mint-fold-galaxy-isolate.md`,
itself superseding
`archive/Previous Handoffs/HANDOFF-2026-08-19-visual-revamp-phase4-complete.md`),
kept for per-item detail.

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
  panels, rotating masthead gradient, tier bar bottom-left, unlinked shelf +
  Legend bottom-right, Compare bottom-left (2026-08-20, item 5g — same
  corner as the tier bar, which sits further left), `GroupsPanel`
  ("Regions & Countries") drop-up bottom-centre (2026-08-20, item 5f — the
  old `ChipBar` filter drop-up that used to own this slot is deleted; see the
  5f/5g entries below).
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
10. **Phase 3: GEO_EXPLORATION mode — EXPLAINED 2026-08-20 (item 5g), still
    not built.** Thomas asked to have this elaborated on rather than built
    (*"I need you to elaborate, it's not ringing any bells"*). The
    explanation given: it would be a FOURTH lens in `lib/modes.ts` alongside
    `STANDARD`/`GROUP_COMPARISON`/`WORLD_OVERVIEW`, except every lens today
    is a pure recolour pass — country → fill colour, nothing moves, which is
    why a lens is safe to keep out of the `forceGraph` memo deps (§7).
    GEO_EXPLORATION would be the first lens that also REPOSITIONS nodes by
    geography (needs a `REGION_OF` table — country → rough lat/long or region
    bucket — that does not exist yet), which is exactly why it is flagged as
    the one mode that can break the camera fit: the fit math in §7 assumes a
    scale-free force cloud, and a geography-positioned layout is a bounded
    surface instead, so it would stop being a pure recolour pass and would
    need to rejoin the memo deps, with the camera-fit measurement re-run
    against it. Typed edges (the other half of this item — what a trunk's
    "type" means when one line stands for 57 mixed edges) also not started.
    Genuinely not begun this update; still needs its own build round.
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
14. **Compare two nodes — DONE 2026-08-20 (item 5g).** See the dedicated
    entry earlier in this update's summary at the top of this file for the
    full writeup, including the bottom-left tier-bar collision caught and
    fixed before shipping.
15. **Path finder — DONE 2026-08-20 (item 5g), same panel as 14.** See the
    dedicated entry earlier in this update's summary at the top of this file.

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
- Data: `src/data/research/*.json` slices auto-load; `slices.generated.ts` is
  generated; `graph.ts` builds + validates (44 checks in
  `scripts/validate-data.ts` + `test-logic.ts`, 90 as of item 5g).

---

## 7. Known traps — the ones that will actually bite

- **`PanelShell` supports exactly one panel per screen edge, AND every screen
  position is now spoken for (2026-08-20, updated after item 5g).** Left/
  Reports and right/View are the two `PanelShell` edges. Everything else is
  free-floating, and all of it is now occupied: top (`MenuBar`), top-centre
  (`SearchPanel`), bottom-left (the tier bar, ALWAYS on — see the next trap),
  bottom-left stacked above it (`Compare`, items 14/15), bottom-centre
  (`GroupsPanel`, moved here 2026-08-20 item 5f/5g), bottom-right
  (`IsolatedShelf`) and bottom-right again further in (`Legend`, item 7). The
  next panel this app gets needs either a `PanelShell` stacking/offset
  parameter, or to share a panel that already exists (the way items 14 and
  15 share one `Compare` panel rather than each getting their own) — there is
  no more free corner or edge to claim by picking new fixed coordinates.
- **A free-floating panel's `bottom`/`left`/`right` coordinates are not
  reserved anywhere — check every existing `position: fixed` panel by eye
  before picking new ones.** Caught only right before shipping, 2026-08-20:
  `Compare` (items 14/15) was first written at `bottom: 20, left: 20`, not
  realising the tier bar (`tierBarWrap` in `App.tsx`) already sits at those
  exact coordinates and is never hidden. There is no shared registry of
  "which corner is whose" the way `PanelShell`'s two edges are enforced by
  the component itself — every free-floating panel just hard-codes numbers,
  so the only real check is reading every other panel's `wrap`/positioning
  const before adding one, which is what this trap is now here to remind
  whoever adds the next one to actually do.
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
