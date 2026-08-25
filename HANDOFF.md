# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives at the top
level.** When superseded, the new session copies this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and
writes the replacement here. Never two handoffs at the top level.

Last written: **2026-08-25 (third pass, same day) — Grok research queue
FULLY LANDED, prompt 18 + the whole new-countries tier.** Earlier today the
Canada tier and the domestic wiring tier landed — full account archived at
`archive/Previous Handoffs/HANDOFF-2026-08-25-wiring-round.md`, condensed
below. This third pass closed out the queue: **prompt 18** (Uruguay/
Paraguay/Guyana/Suriname domestic wiring — 4 deps minted, 1 dropped
edition-ambiguous) and **the new-countries tier (30–37, 62 countries with
zero prior corpus presence)** — 8 parallel verification agents, one per
region, each raw-verifying against live primary sources. Combined: 130 new
reports, 109 new dependencies across 51 countries (11 returned honest
nulls — North Korea and several low-priority OECS microstates), 74 honest
drops, zero id/edge collisions either against the live corpus or between
the 8 groups' own concurrent proposals. Also required 51 new
`COUNTRY_FAMILY`/`CONTINENT_OF`/`COUNTRY_LABEL` entries (`palette.ts`,
`regions.ts`) that none of the per-region agents were scoped to add —
`npm run validate` catches missing ones as hard errors. **The Grok research
queue from `notes/grok-research-queue-2026-08-22/` is now fully worked.**
One new Thomas-only judgment call opened: §5 item 5b (gy-caricom scoping).

**Canada round, condensed:** 144 new reports, 161 new dependencies minted
across 6 regional slices; sandbox-clean. Four structural lessons from that
round are now standing rules 10–11 below. Two Thomas-call items remain open
(§5 items 5–6) plus a deferred Quebec regulation question (§5 item 7). Full
narrative in the archived handoff.

**Wiring round — inventory and verification.** This tier is dependency-heavy
and report-light by design (its job is to connect nodes that mostly already
exist): across all 10 groups, Grok proposed only 2 new report nodes total,
and both turned out to be duplicates of existing corpus nodes under a new
id (`seea-cf-2012` → already `un-seea`; `ar-mercosur-comex-manual` → didn't
hold up on content-check). **Net mint: 0 new reports, 165 new dependencies,
122 `_dropped` entries.** Ten parallel agents raw-verified 289 raw dependency
claims (one per group; the Andean group first had to dedupe three
overlapping Grok runs — see below) against live sources, same standard as
every round: a Grok claim is a lead, a WebFetch render is not evidence until
corroborated (HTTP status, curl, a downloaded PDF, or a WebSearch
cross-check), and an Angular-SPA shell (`dsbb.imf.org` again) is not "no
content on the page."

**The Andean duplicate-prompt problem, resolved.** Ecuador/Peru/Venezuela/
Bolivia/Colombia had been run through Grok three separate times
(`andean-domestic-wiring-*` ×4, `ec-pe-ve-bo-co-domestic-wiring-*` ×2,
`ve-venezuela-domestic-wiring-batch1` ×1), producing 117 raw dependency
proposals that collapsed to 92 after exact-duplicate removal, with 7 genuine
conflicts inside that reduced set:
- **3 were relationship-type disagreements only** (e.g. Peru's poverty-line
  test proposed as both `uses_data_from` and `calculated_from` by different
  Grok runs, each independently verified against a real primary source).
  Resolved as `calculated_from` — a poverty classification is a mechanical
  threshold test, the more precise fit — merging both citations into one
  richer `basis`.
- **4 were direction reversals, all traced to one file**
  (`andean-domestic-wiring-batch2.json` consistently had source/target
  backwards relative to its own stated basis text; the sibling
  `ec-pe-ve-bo-co-*` files had the correct, self-consistent orientation for
  the same real relationships). For 1 of the 4 (`ec-cuentas-nacionales` ↔
  `ec-comercio-exterior`) the correct orientation was genuinely new and got
  minted. For the other 3 (`co-comercio-exterior`↔`co-bop`,
  `co-emmet`↔`co-ipi`, `ec-comercio-exterior`↔`ec-bop`) **the "wrong"
  direction turned out to already be live in the corpus** from an earlier
  round — so this round's freshly-verified "correct" direction was NOT
  minted (it would have created a second edge running opposite an
  established one). Each is `caveat`'d on the existing edge and the reverse
  claim `deferred`, for a human to read both citations before ruling either
  way. **Lesson: a fresh, well-verified finding contradicting an established
  edge is grounds for a caveat + deferral, never a silent override — same
  principle as the Canada round's `qc-perequation` case, now proven to
  recur.**

Also from the Andean batch: `bo-bop → imf-bpm6` is contradicted by its own
cited source (`bcb.gob.bo`'s own methodology PDF says Bolivia's BOP still
follows BPM5) — dropped `wrong-target`, no `imf-bpm5` node exists to
redirect to. `bo-reservas → bo-bop` cited an id that doesn't exist anywhere
in the corpus and was never proposed as new — dropped `no-node-yet`.

**Two new structural lessons, now standing rules 12–13 below** (found via
the sandbox validator, same iterate-until-clean discipline as every round):
1. **A dependency edge between a node and its `part_of` container is a
   validator ERROR**, not a warning — 4 edges this round (3 Andean
   oil/BOP/remittances containments, 1 Mexico `mx-enoe-informalidad →
   mx-enoe`) restated a containment relationship Grok had independently
   rediscovered as a dependency. Not minted; logged as `note` observations
   instead (the fact is real, it's just already modeled via `part_of`
   metadata, not an edge).
2. **The `note`-vs-`caveat` validator check (rule 10, discovered in the
   Canada round) is not actually about the `note` reason specifically — it
   rejects ANY `DroppedReason` other than `caveat`/`resolved` whose exact
   (source, target) matches a live edge.** This round, 19 of this round's
   own `no-document`/`wrong-direction` drops (all across `jp_kr` and
   `andean`) turned out to exact-match edges **already live in the corpus
   from earlier rounds** — the verification agents were correctly assessing
   THIS round's specific proposed evidence for that pair, found it lacking,
   and had no way to know the pair was already minted on different,
   presumably-better evidence from before. Fixed by reclassifying all 19 to
   `caveat` with reworded `why` text. **A full id/edge cross-check against
   the whole corpus — not just this round's own proposals — has to run
   before ANY `_dropped` entry is finalized, not only before minting,**
   because "this round's evidence didn't hold up" and "this edge doesn't
   exist" are different claims and only `caveat` can say the first without
   contradicting a live edge.

**Sandbox-verified:** `npm run validate` clean exit 0 (**3,254 reports,
2,476 dependencies** — reports unchanged from the Canada-round total since
this was a pure wiring pass; dependencies up from 2,311), `tsc --noEmit`
clean, `npm run build` clean at 1,504 kB. Ten new slices in
`src/data/research/`, one per group, `*-wiring-grok-2026-08.json`.

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
`notes/grok-diary.md` FIRST (§8)**; the Canada + wiring rounds just landed →
`notes/grok-research-queue-2026-08-22/00-README.md` for the remaining
tiers' priority order and attachment manifest (new countries, 30–37, plus
prompt 18, are what's left); regions/blocs/publishers → `src/lib/regions.ts`
file comment; compare/path → `Compare.tsx` file comment; schema →
`src/lib/types.ts`.

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
   the sandbox. One file over the bridge instead of 270. (A live sandbox
   copy with `node_modules` already installed can also just be reused
   across rounds in the same session — add new files, rerun validate — far
   cheaper than restaging from scratch each time.)
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
    the live graph must use `reason: "caveat"`, never `"note"`.** Learned
    2026-08-25 (Canada round): `"note"` means "not a dropped edge at all",
    and the validator errors if its source/target names a real edge.
    `"caveat"` is the reason built for exactly this: an annotation ON a
    minted edge. **Generalized 2026-08-25 (wiring round): this validator
    check applies to EVERY `DroppedReason` except `caveat`/`resolved`, not
    just `"note"`** — a `no-document`, `wrong-direction`, etc. entry is
    equally an error if its (source, target) exact-matches a live edge.
    Concretely this means: before finalizing ANY `_dropped` entry, check its
    exact (source, target) against the WHOLE corpus's live edges (not just
    this round's own proposals) — if it matches, the entry must be `caveat`
    regardless of what this round's own verification concluded, because
    "this round's evidence for this pair didn't hold up" and "this edge does
    not exist" are different claims.
11. **Build the id-collision check from the WHOLE corpus, not just
    `src/data/research/*.json`.** 18 ids (`statcan-cpi`, `statcan-lfs`,
    `boc-mpr`, etc.) live only in the hand-written seed files
    (`src/data/reports.ts`, `src/data/dependencies.ts`) and won't show up in
    a naive `grep -r '"id"' src/data/research/` sweep — exactly the gap that
    let a Grok batch re-propose `statcan-cpi` as a "new" node in the Canada
    round. The same principle applies to edges: build the existing-edge
    cross-check (rule 10 above) from `dependencies.ts` **and** every research
    JSON, not just the research JSONs.
12. **A dependency edge between a node and its `part_of` container is a
    validator ERROR** ("containment is not a dependency" — see the long
    comment on `part_of` in `types.ts`). Grok routinely rediscovers a
    containment relationship (a sub-survey published inside its parent
    survey, a commodity sub-account inside a larger account) and proposes it
    as an ordinary dependency edge. Before minting, cross-check every new
    edge's (source, target) against the corpus-wide `part_of` map in both
    directions; drop matches as a `note` (the fact is real, already modeled
    structurally, not as an edge).
13. **A fresh, well-verified finding that contradicts an already-live edge
    is not automatically right just because it's freshly verified.**
    Established 2026-08-25 (wiring round, the Andean direction conflicts):
    three "corrected" directions had genuine primary-source support, but the
    "wrong" direction was what the corpus already had, from an earlier
    independently-researched round. Caveat the existing edge, defer the new
    claim, do not silently swap the direction — same principle as rule 2/3
    applied to edges that already exist rather than edges being proposed for
    the first time.

**Process rules (Thomas, 2026-08-20).** Update this file every work turn, not
just at milestones: copy the current file to `archive/Previous Handoffs/`
first, then append a dated section — additive, not a rewrite (a full rewrite
is reserved for when the file goes unwieldy; that's what happened 2026-08-22,
and twice more on 2026-08-25 — once to fold in the finished BRICS G.4
narrative, once again same day to fold in the Canada round once the wiring
round landed on top of it). Hand off rather than push on when: you re-derive
something already settled, contradict an earlier answer, retry a tool past
the documented once-only policy, or the session has been through a
compaction. Say "this is a good point to hand off," write this file, stop.
Project memory: write entries as you go; if it refuses, park in
`notes/memory-pending-<date>.md` and say so here. **Currently parked:
`notes/memory-pending-2026-08-25.md`** — the int-caricom addendum, tool
was unreachable this turn.

---

## 3. Where the project is (2026-08-25, prompt 18 + new-countries round)

**Live corpus: 3,385 reports · 2,596 dependencies.** `npm run validate`
clean exit 0 (120/120 logic checks), `tsc --noEmit` clean, `npm run build`
clean at 1,493 kB. Reports up 131 and dependencies up 120 from the wiring
round's 3,254/2,476 — 130 reports/109 deps from the new-countries mint
(prompt 18 minted 0 new report nodes, 4 new deps, by design), plus 1 new
node (`int-caricom`) and 7 retargeted deps from closing item 5b same day
(Thomas: "add the dedicated node").

**BRICS (G.1–G.4)** — full narrative in
`archive/Previous Handoffs/HANDOFF-2026-08-22-brics-g4-full.md` and project
memory `grok_archive_state.md`. Two duplicate-node flags still open for
Thomas's call (§5 items 5–6 below).

**Grok research-queue, Canada tier — LANDED 2026-08-25.** Condensed
account in `archive/Previous Handoffs/HANDOFF-2026-08-25-wiring-round.md`.

**Grok research-queue, wiring tier — LANDED 2026-08-25.** Ten slices,
condensed account in `archive/Previous Handoffs/HANDOFF-2026-08-25-wiring-round.md`.

**Grok research-queue, prompt 18 — LANDED, this pass.**
`sa-atlantic-wiring-grok-2026-08.json`: 4 deps minted (Paraguay national
accounts → SNA 2008, Suriname CPI → CPI Manual, Suriname GDP → e-GDDS,
Uruguay foreign trade → Harmonized System), 1 dropped (Suriname CPI →
COICOP, edition-ambiguous — source names no year and the corpus splits
COICOP into two edition nodes; dropped rather than guessed).

**Grok research-queue, new-countries tier (30–37) — LANDED, this pass. The
whole queue is now fully worked — nothing left in `notes/grok-research-queue-2026-08-22/`.**
8 parallel verification agents (Caucasus/Central Asia/Mongolia, South Asia,
Gulf/Levant, Southeast Asia, Central America, Caribbean/OECS, Belarus/North
Korea, Pacific microstates), each raw-verifying Grok's leads against live
primary sources independently. 130 reports / 109 dependencies minted across
51 countries; 11 countries (North Korea, several low-priority OECS
microstates per their own prompt's instruction) returned honest zero-node
results; 74 honest drops. New slices in `src/data/research/`:
`caucasus-centralasia-mongolia-new-grok-2026-08.json`,
`southasia-new-grok-2026-08.json`, `gulf-levant-new-grok-2026-08.json`,
`seasia-new-grok-2026-08.json`, `centralamerica-new-grok-2026-08.json`,
`caribbean-oecs-new-grok-2026-08.json`,
`belarus-northkorea-new-grok-2026-08.json`,
`pacific-microstates-new-grok-2026-08.json`. Also added 51 country entries
to `COUNTRY_FAMILY`/`COUNTRY_LABEL` (`src/lib/palette.ts`) and
`CONTINENT_OF` (`src/lib/regions.ts`) — `npm run validate` errors hard on a
country with nodes but no palette/continent entry, and none of the 8
region agents were scoped to touch those files. Full lessons and per-group
counts in `notes/Grok Logs/grok-diary.md`'s round log.

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
1. **Canada tier and wiring tier of the Grok research queue — DONE.**
   Nothing further needed for prompts 01–06, 10–17, 19–20.
2. **Prompt 18 and the new-countries tier (30–37) — DONE, 2026-08-25 third
   pass.** The entire `notes/grok-research-queue-2026-08-22/` queue is now
   fully worked. The Gulf/Levant duplicate-prompt overlap
   (`gulf-levant-research-*` vs `me-gulf-levant-research-*`) was diffed and
   resolved as part of this pass — see §3 above and the diary's round log
   for the full account. Nothing further queued here; next research work
   needs a new Grok round scoped from scratch.

### [Thomas] — only you can
3. **Render-consistency / camera-fit bug — DEFERRED by your own call.** One
   cause fixed (`cooldownTime` 15s→45s); the open suspect is `runFit`'s
   tracking pass false-tripping `userOwnsCamera` via `cameraMovedOffFit`
   under OrbitControls damping — needs live instrumentation BEFORE touching
   it. Details: 5p section of
   `archive/Previous Handoffs/HANDOFF-2026-08-22-5r-full-pre-slim.md`.
   **2026-08-25 (Cowork browser session): cleanly reproduced, not yet
   instrumented.** Three fresh reloads of localhost:5173 at identical
   default settings (spread 200/geo 150/galaxy 100, Global tier) gave three
   different results — one grossly oversized/overlapping cloud, and two that
   landed with the camera apparently inside the cluster (edges off-frame),
   one of which self-corrected on opening the View panel and one of which
   didn't, and switching tiers didn't fix it either. The Zoom slider read
   "fit" in every case, including the two that visibly weren't. No source
   was touched. Full writeup + one screenshot:
   `notes/render-consistency-repro-2026-08-25.md`. Also caught the §7
   panel-overlap DEV tripwire firing live, unrelated bug, noted there too.
   Next step either way is a human call: add temporary logging to
   `runFit`/`measureFit`/`nodeScaleFor` and reload-diff the numbers.
   **2026-08-25 (same session, instrumented pass — Thomas: "add the
   console.log and have at it"): two concrete findings, no fix applied.**
   (1) Hard evidence that `forceGraph.onEngineStop(...)`'s `runFit(...)`
   call (~L1618-1630) has NO warmup gate — captured a live call firing at
   `tick: 0` with `nodeRadius: 67` (real settled clouds run to thousands of
   units), producing a camera `distance: 378` snapped in far too close, and
   permanently setting `settledOnce.current = true` — which cuts the
   12-second tracking window's safety extension short before the cloud has
   actually expanded. The tick loop's OWN mount-fit path is protected by
   `MIN_TICKS_BEFORE_FIRST_PAINT`; this callback isn't, and it fires on the
   library's own async digest schedule, independent of our tick counter.
   (2) A backgrounded/hidden tab stops the entire `useFrame`-driven tracking
   system outright (confirmed via `document.visibilityState`/`hasFocus()`
   during one reload where zero tick-loop instrumentation fired in 30+s) —
   plausibly what Thomas experiences if he tabs away while the page is
   settling (which took anywhere from ~10 to ~30+s across reloads this
   session). Two candidate fixes written up, neither applied: gate
   `onEngineStop`'s fit the same way the mount fit is gated; and/or pause
   `settleClock`/`sinceRefit` while hidden and force a `requestRefit()` on
   `visibilitychange`. All temporary instrumentation was reverted — working
   tree is clean, diffed against a pre-edit backup to confirm. Full account:
   `notes/render-consistency-repro-2026-08-25.md` (addendum section).
4. **Glow-slider check, one minute, only if** you ever see brightness-only
   flicker at a STABLE camera distance (`notes/flicker-tests-2026-08-19.md`,
   Suspect 3, still untested).
5. **`br-ibge-sistema-contas-nacionais` vs `br-scn` — duplicate-node call
   needed.** Both titled "Sistema de Contas Nacionais" / "...Brasil (SCN)",
   same publisher IBGE, different ids from different research rounds
   (`br-scn` already wired; `br-ibge-sistema-contas-nacionais` unwired).
   Full note in `_dropped` block of `brics-g4-partial-2026-08-22.json`.
5b. **`int-caricom` added, 2026-08-25 (Thomas: "add the dedicated node") —
   DONE.** New institutional node (`src/data/research/caribbean-oecs-new-grok-2026-08.json`),
   sourced from CARICOM's own site (`caricom.org/who-we-are/`, live-verified:
   established 4 July 1973 by the Treaty of Chaguaramas, 15 members + 8
   associate members). The 7 CARICOM-membership edges held out at item 5b's
   discovery (Jamaica, Trinidad & Tobago, Bahamas, Barbados, Haiti, Antigua &
   Barbuda, Saint Lucia — each `cites`, evidenced via that country's own
   CARICOM profile page) are now minted against `int-caricom` instead of
   `gy-caricom`. `gy-caricom` itself untouched — stays as Guyana's own
   country-specific membership record, still zero live edges of its own,
   not this session's call to rescope. Corpus now 3,385/2,596, validate
   120/120, tsc/build clean.
6. **`cn-stats-law` / `cn-stats-law-impl-regs` vs `cn-statistics-law` —
    duplicate-node call needed.** Same shape as item 5. Full note in
    `_dropped` block of `brics-g4-2026-08-22.json`.
7. **`qc-perequation -> isq-vitalite-economique` — needs a human read of
   Quebec regulation F-2.1 r.11 s.5.1 directly** (Canada round, 2026-08-25).
   Filed `deferred` in `qc-quebec-grok-2026-08.json`.
8. **Three Andean direction conflicts need a human to read both citations
   side by side** (wiring round, 2026-08-25) — `co-comercio-exterior` ↔
   `co-bop`, `co-emmet` ↔ `co-ipi`, `ec-comercio-exterior` ↔ `ec-bop`. The
   corpus has each live in one direction from an earlier round; this
   round's Grok research independently verified evidence for the OPPOSITE
   direction for all three. Neither direction was assumed correct — the
   existing edge is `caveat`'d, the new claim `deferred`, in
   `andean-wiring-grok-2026-08.json`.
9. **`bo-bop -> imf-bpm6` is contradicted by its own cited source** (Bolivia's
   central bank says BPM5, not BPM6) and no `imf-bpm5` node exists to
   redirect to — a real gap, not an error. If BPM5 is worth modeling as its
   own node (other countries on BPM5 may exist too), that's a scope call;
   filed `wrong-target` in `andean-wiring-grok-2026-08.json` either way.

### [Agent] — next build rounds
10. **"Why so few?" affordance** on group isolates — "Middle East → 6 shown"
    is correct (cross-border gaps) but reads as a bug with no explanation on
    screen. More useful as the gap list shrinks.
11. **Re-fold / "N countries opened" affordance** — currently only a full
    Reset re-folds an opened country; no readout of how many are open.
12. **Typed edges** — what a trunk's "type" means when one line stands for
    many mixed relationships. Not started; needs a design conversation first.
13. **Soft-edge node idea** — `notes/node-surface-encoding-2026-08-19.md`.
14. **Research backlog** — the Grok research-queue backlog (item 2 above,
    prompt 18 + new countries) is the concrete next chunk of the
    "shrink the unlinked/candidates-only count" goal.
15. **Housekeeping** (needs shell): actually delete the tombstoned
    `src/data/slices.generated.ts` and the orphaned `.rig-sweep` CSS rule in
    `uiTheme.ts` (both → `_to_delete/`). `notes/stale-urls-2026-08-20.md`
    exists for the 37 real 404s from the Canada mint's URL check.
    `_to_delete/` has accumulated several sandbox tarballs/zips across
    sessions, all logged safe-to-delete in `_to_delete/README.md` — periodic
    sweep is Thomas's own job per rule 6. `notes/_all-corpus-ids-2026-08-25b.txt`
    and `notes/_all-corpus-edges-2026-08-25.txt` are this round's id/edge
    cross-check lists — regenerate fresh before the next mint rather than
    reusing (the corpus has moved since).

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
  from the Canada round: **id-collision checks must include
  `src/data/reports.ts` and `src/data/dependencies.ts`**, not just the
  research JSON files (rule 11, §2). Note from the wiring round: **the same
  applies to edge-collision checks, and edges must ALSO be checked against
  the `part_of` containment map** (rules 10, 12, §2).

---

## 7. Known traps — the ones that actually bite

- **`RelationshipType` is a closed 4-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `cites`). An off-union value
  → NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation`
  is only `audits`/`supersedes`. Grok output routinely invents types — map
  them, never pass them through. Same for `Domain` and every closed union:
  cast, not parsed — check `types.ts` before inventing a value. (The wiring
  round's Grok output stuck to valid values throughout — worth noting since
  it isn't guaranteed.)
- **`DroppedReason` — a non-`caveat`/`resolved` reason whose (source,
  target) matches a live edge is a validator error.** Originally learned as
  a `"note"`-specific trap (rule 10, Canada round); generalized this round
  (rule 10 update, §2) after 19 `no-document`/`wrong-direction` entries hit
  the same check — the rule is about the CHECK, not the specific reason
  string. Always cross-check `_dropped` entries against the whole corpus's
  live edges, not just this round's own proposals.
- **A dependency edge between a node and its `part_of` container is a
  validator ERROR** (rule 12, §2 — bit the wiring round: 4 edges Grok
  proposed were really containment relationships already modeled via
  `part_of`).
- **A fresh, well-verified finding can still be wrong to mint** if it
  contradicts an edge the corpus already has from independent earlier
  research (rule 13, §2 — the wiring round's 3 Andean direction conflicts).
  Caveat + defer, don't silently override.
- **A fresh id-collision check must scan `src/data/reports.ts` and
  `src/data/dependencies.ts` too, not just `src/data/research/*.json`**
  (rule 11, §2 — bit the Canada round: `statcan-cpi` re-proposed as "new").
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
- **Grok's JSON is not reliably JSON** — parse-check first (though both the
  2026-08-25 Canada and wiring batches came back clean). Its ids and enum
  values are inventions until grepped against the FULL corpus (research
  files AND seed files). Never hand-edit JSON insertions — generate them.
  Its stated `files_received` confirmations are not reliable either. **Its
  imported node DESCRIPTIONS are also not a citable basis by themselves** —
  a Grok-batch description naming a standard is a lead, not a quote; always
  raw-verify against a live primary source before minting off it. **A
  single region/country's own verification pass can't see cross-region
  problems** — dependencies whose endpoint failed verification elsewhere,
  or that duplicate/contradict an already-minted edge from a different
  slice, only show up on a corpus-wide second pass. **Grok can run the same
  region under multiple prompt names across sessions, producing overlapping
  or conflicting proposals** (wiring round: Andean bloc run 3 times; new
  countries tier still has the Gulf/Levant duplicate unresolved) — dedupe
  and diff for conflicts BEFORE verifying, not after.
- **Never reintroduce faceted node geometry** (fresnel rims) or
  additive/white pulse cores.
- **The IMF DSBB tables are JS-walled** (use a real browser, not WebFetch);
  its PDF observance reports parse fine headless. imf.org press releases and
  elibrary.imf.org 403 headless fetchers but load in a browser. **Reachable
  workaround found this round:** DSBB's Angular SPA calls a plain JSON API
  at `dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=X&categoryCode=Y`
  — hitting that directly (curl/WebFetch) returns the real DQAF narrative
  text without needing a rendered browser session.
- **imf.org PDF *documents* (not press releases) 403 everything** —
  WebFetch, curl (even with a browser UA), Wayback Machine proxying, all
  403. **Fix: navigate Chrome to
  `https://docs.google.com/viewer?url=<url-encoded-pdf-url>&embedded=true`
  instead** — renders as a normal page. Use `find` (natural-language
  search), not `get_page_text`, to check whether a phrase exists anywhere
  in a long lazy-loaded document — `get_page_text` truncates at a byte cap.
- **Some government portal landing pages are JS-rendered and return
  nothing useful to WebFetch** (Canada examples: `hamilton.ca`,
  `brampton.ca`, `montreal.ca`, `ontario.ca/laws`; wiring-round examples:
  several `.gov.mx`/`.gov.ph`/`inegi.org.mx` index pages served React shells
  with the real content one PDF/sub-path away) — search for the underlying
  document/sub-page instead of fetching the portal shell; curl+pdftotext or
  a real browser session when WebFetch alone comes back empty on a page you
  can see resolves fine. **`.docx` evidence URLs aren't renderable by
  WebFetch at all** — download and extract `word/document.xml` directly.
- **A soft-404 can return HTTP 200 with a JS alert body saying the file
  doesn't exist** (`mods.go.kr`, this round) — a real "dead link" that a
  bare status-code check won't catch; read the actual body.
- **A WAF/Incapsula/Cloudflare block can look identical to real content at
  a glance** — several `bcentral.cl` and `dane.gov.co` pages returned
  HTTP 200 with a JS-challenge shell instead of the real page (confirmed via
  `file` on the downloaded body, not just the status code). Cross-check with
  an independent source or a second non-leading WebFetch prompt before
  trusting a quote from a page you haven't confirmed is real.
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
- **A GROKREADME.md claim that a standard id "already exists in the
  corpus" is not itself verified** — `sna-1993` was cited this way but does
  not exist anywhere in the live 3,254-id corpus (only `sna-2008` and
  `sna-2025` do). Two wiring groups (Myanmar, Afghanistan/Yemen) independently
  hit this; both dropped `no-node-yet` rather than assumed. Worth a scope
  call: if enough countries cite SNA 1993 specifically, it may be worth
  minting as its own node.
- **Grok will reuse one jurisdiction's exact quote/URL as "evidence" for a
  different jurisdiction's claim** when the underlying document shapes are
  similar (Ontario municipal batch, Canada round: Hamilton's tax page cited
  for Brampton's and London's claims). Some reuse is legitimate (a genuinely
  shared page); the tell for the illegitimate kind is the quote naming a
  specific *other* place by name.
- **dsbb.imf.org confirmed JS-walled at the page level** — see the JSON-API
  workaround above; a plain browser fetch of the rendered page also works
  when the API route isn't known yet.

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
(01–06) and domestic wiring (10–17, 19–20) landed 2026-08-25 (§3/§5 item 1
above); prompt 18 and new countries (30–37) are still queued (§5 item 2).

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
