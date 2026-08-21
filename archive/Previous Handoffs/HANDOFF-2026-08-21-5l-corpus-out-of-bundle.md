# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the
top level.** When it is superseded, the new session moves this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes
a fresh `HANDOFF.md` in its place. Never leave two handoffs at the top level.

Last written: **2026-08-21 (item 5k — review follow-up round 1: black-scene
isolate fix, the bottom dock, Escape/"/"/search state)**. Yesterday (2026-08-20) was a full day
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

19. **Review follow-ups, logged 2026-08-21 (item 5j) — items 1–3 DONE in item
    5k, same day.** The full list with reasoning is
    `notes/full-review-2026-08-21.md` §6; the order there is deliberate:
    ~~(1) orb-aware `matchesRegionGroup` + a folded-tier pinned test~~ **DONE
    5k**; ~~(2) a bottom-dock container replacing the hand-placed bottom-edge
    coordinates + `maxHeight` on the View panel~~ **DONE 5k**; ~~(3) Escape
    priority stack, "/" input guard, search-choose preserving isolates~~
    **DONE 5k** — see this update's writeup at the top for all three. Still
    open, in order: (4) corpus out of the JS bundle + batched startup
    warnings; (5) unlinked shelf → summary + list (before the 722 edgeless
    candidates land); (6) the tier-1 colour pass (hollow opacity ~0.3, damp
    floor ~70%, lens greyed or orbs recoloured); (7) validator rules for
    `COUNTRY_LABEL`, `strength`, and the `orb:`/`corb:`/`->` namespaces;
    (8) search accent-folding/full-corpus pass + the calendar year-boundary
    fix; (9) PNG re-entry guard + zoom-baseline freeze when pulses are next
    touched.

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
- Data: `src/data/research/*.json` slices auto-load; `slices.generated.ts` is
  generated; `graph.ts` builds + validates (44 checks in
  `scripts/validate-data.ts` + `test-logic.ts`, 90 as of item 5g).

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
