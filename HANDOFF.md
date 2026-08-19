# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the top
level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/handoffs/`. Never leave two handoffs at the top level.

Last written: **2026-08-19**, end of the full-project audit session. Supersedes
`Previous Handoffs/HANDOFF-2026-08-18c-grok-consolidation-final.md` — whose Lane
A sections remain accurate and hold the full Grok-archive detail; read that file
before any mint or archive work rather than expecting it re-copied here. Its
Lane B section ("zero code written") was overtaken the same evening it was
written and is corrected below.

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why | Skip if |
|---|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules, including the two that get violated most: never run git, and every edge needs a document. | Never skip. |
| 2 | **This file** | What is in flight, the prioritized todo list, who owns what. | Never skip. |
| 3 | `START-HERE.md` | Plain-language orientation. | You already know the project. |

Then read **one** of these depending on the task:

| Task | Read |
|---|---|
| Renderer, colours, camera, anything visual | `handoff-summary.md` (what phases 0/0b/1 actually did, 2026-08-19), then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` for the measurements |
| Phase 4 UI work (menus, cards, hover, saved views) | `notes/phase-4-brief-2026-08-19.md` |
| Importing research / minting nodes | `Previous Handoffs/HANDOFF-2026-08-18c-grok-consolidation-final.md` §6–§8, then `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md` and `consolidated/_STATUS.md` |
| Continuing BRICS research | `BRICS/G.3.md` |
| Anything touching the schema | `src/lib/types.ts` — most of it is documented reasoning, not types |

**A habit specific to this repo: the code is the design doc.** `src/lib/palette.ts`,
`src/components/nodeVisuals.ts`, `src/lib/view.ts` and
`src/components/InfluenceGraph.tsx` carry long comments explaining why each
constant is the value it is. Read the comment before changing the number.

---

## 2. Standing rules

In `REPORTS.md` in full. The short version, because these are the ones that break:

1. **Never run git in this repo from an agent session** — not even read-only. It
   leaves a stale lock. Ask Thomas, or check GitHub Desktop.
2. **If no document says a dependency exists, it does not go in the graph.**
3. **A pointer is not a source.** `WebFetch` can return fabricated content for a
   dead URL; raw-verify before trusting a quote.
4. **`npm run validate` before and after** any data change (44 checks). It cannot
   run through the device bridge (Windows esbuild in `node_modules`); copy
   `src/`, `scripts/`, `package.json`, `tsconfig.json` into a Linux workspace and
   `npm install` there. The 2026-08-19 audit did exactly this and it works.
5. **`src/data/slices.generated.ts` is generated.** Never hand-edit it.
6. Agents cannot delete files on the device — `mv` into `_to_delete/`, log the
   reason in `_to_delete/README.md`, and tell Thomas.

---

## 3. Where the project is (verified 2026-08-19)

**Live corpus:** 1 250 reports, 1 079 dependencies.

**Health — independently re-verified by the audit session in a clean Linux
sandbox on this day's snapshot:** `npm run validate` exits 0 (all 44 checks,
warnings only: the 7 single-use `proposed:` tags and the known isolated-report
list), and `npx tsc --noEmit --skipLibCheck` is clean.

**Lane B is implemented through Phase 2.** Phases 0 (scale), 0b (halo, horizon,
geometry cache) and 1 (flat-luminance palette v3, rims deleted, authority glow
un-inverted) are on disk and type-checking; `handoff-summary.md` is the
authoritative account of those. **Phase 2 (lens modes) landed 2026-08-19,
same-day**: BRICS into `GeoBloc`/`COUNTRY_BLOCS` (single home of membership —
the layout force and the lens read the same table), `groupOf()` and the mode
system in new `src/lib/modes.ts`, GROUP_COMPARISON (US red / BRICS yellow / EU
green / INT white / grey) and WORLD_OVERVIEW (seven-way continental roll-up)
as recolour passes, a Lens row in the View panel, and the review's "10-line
fix" hoisting `uRimColour` so hollow nodes' rings follow the lens. The lens
lives in a ref + mutation effect and is NOT a `forceGraph` memo dep — verified
by driving the built app headless: camera pixel-identical across lens
switches, meshes rebuilt mid-lens born wearing the lens colour, no console
errors. Known v1 limits, deliberate (ship-and-look): edges, pulses and orbs
keep family ink; the legend panels don't re-caption under a lens; blueprint
sits lenses out. **The one unchecked thing remains bloom** — all sandbox
renders are software-rasterised, so the glow pass needs eyes on real hardware
(BRICS yellow and INT white intentionally bloom hardest under the group lens).

**Staged corpus:** `Grok - Brics+israel and singapore/consolidated/` — 37
country files, 1 999 reports, ~970 dependencies, 357 dropped notes. Minting
would ~2.6× the corpus. Mint is decided **yes** but deferred to a dedicated
session, last on Thomas's priority list.

**Git: the biggest single risk in the project.** Nothing has been committed
since 2026-08-13 (last confirmed push). Uncommitted on disk now: AF/G.23,
AF/G.24, the singleton-fit fix, BRICS G.1–G.3, the Grok consolidation
(types/graph/scripts edits + retagged live slices), visual phases 0/0b/1, and
the 2026-08-19 reorganization. One disk failure loses several weeks.

**Folder reorganization done 2026-08-19 by the audit session:**

- `Previous Handoffs/` swept into `archive/handoffs/`.
- `GROK-PIPELINE.md` (superseded pipeline design) → `archive/planning/`;
  the reference in `grok-import-progress.md` was updated.
- `brics-and-grok.md` → `notes/brics-and-grok-2026-08-18.md`.
- Transfer tarballs (`archive/*.tar.gz`) → `_to_delete/` (see its README).
- `diary.csv` at the top level is Thomas's personal cross-project Claude diary;
  its own first row says it lives in `C:\Users\thoma\Documents\Claude-Diary\`.
  Left in place — not an agent's to move. Thomas: relocate or confirm the copy.

**Known documentation drift, now corrected here:** the 2026-08-18c handoff said
Lane B had zero code written; two agents were in the repo at once that evening
and the later Lane A rewrite of `HANDOFF.md` clobbered the visual session's
update. If two accounts of Lane B conflict anywhere else, `handoff-summary.md`
wins. **Project memory stopped working partway through the audit session**
(reads worked at session start, then "not available"), so its index entry
"visual revamp REVIEWED, not implemented" is STALE and could not be rewritten —
a future session with working memory should rewrite it from this file and
`handoff-summary.md`, and add an entry for this audit.

---

## 4. Work in flight

**Lane B — visual revamp: phases 0/0b/1, 2 AND 3.5 built.** Phase 3.5 is
Thomas's 2026-08-19 live-critique list, pulled ahead of Phases 3 and 4 on his
instruction ("plan the work I gave here around phase 4 and phase 3.5") — see
§5a for what it changed. Order from here: finish Phase 3.5's stragglers, then
Phase 4 (the notes/phase-4-brief backlog), then Phase 3 (geo mode, typed
edges), which drops behind Phase 4 by the same instruction.

**Lane A — Grok archive: staging complete, mint decided-yes-deferred. Pre-mint
gates listed in §5. Nothing here blocks Lane B.**

---

## 5a. Phase 3.5 — Thomas's live critique, built 2026-08-19 (second session)

Everything here came from him using the app with the lenses on. Built and
verified headless the same day; the ONE unpushed piece is noted.

- **Dim to near-invisible.** `DIM_NODE_OPACITY` 0.13 → 0.045, emissive
  0.03 → 0.012, `DIM_LINK_OPACITY` 0.045 → 0.02. His words: "more of a
  constellation with pulses of light between the stars." This deliberately
  overrides the old "legible as structure" doctrine — the traced chain
  carries orientation now.
- **Pulses read as light, not paint.** Family ink lerped 2/3 toward white,
  additive blending, opacity 0.85 (`PULSE_CORE_MIX` in linkVisuals). He
  floated inverting the edge colour instead — rejected in the comment there:
  eleven complementary hues would read as a twelfth family. Blueprint keeps
  solid ink drops (additive over paper is invisible).
- **Background near-black** (`#05070d` → `#010204`), and the dark panels got
  the blue keyline + doubled blue field glow he asked for (uiTheme).
- **Edge lengths ×2** — the Phase-4 "double the edge lengths" pulled forward.
  Rest length ONLY, not charge/collision, or scale-invariance hands back the
  same picture. This is also the answer to "node sizes stay constant whatever
  I do": the fit pins the largest node at a fixed frame fraction by design,
  so spacing changes appear as room between stars, never bigger stars.
- **Camera refit on filter change is UNCONDITIONAL again** — third rewrite of
  that rule; the `framedUsably` heuristic read as a glitch ("some[times] the
  camera stays put, others it goes to reset distance"). History preserved in
  `requestRefit`'s comment. If constant reframing grates, make it a flight,
  don't bring the heuristic back.
- **HUD rework:** country chip row is now a collapsed-by-default drop-up
  selector (bottom-centre pill → panel with All / None / any combo, inline
  level rows, scrolls as countries grow); tier bar moved to the bottom-left
  corner; unlinked shelf tucked bottom-right; masthead 21 → 26px with the
  gradient's angle rotating once per 28s (`@property` in uiTheme).
- **The "blue nodes under the Groups lens" in his screenshots was stale HMR
  state, not a code bug** — hunted first: every repaint path (build, recolour
  effect, halo) resolves through the lens; a hard refresh clears it. Verified
  with a traced selection under GROUPS on the built app.
- **STILL OPEN from this list:** `releases_per_year` for the 35 continuous
  databases in the staged corpus — the device bridge dropped mid-session
  before the consolidated files could be read. It is the next mechanical
  task; everything else in this section is on disk.

## 5. The prioritized todo list (2026-08-19 audit)

Owner key: **[Thomas]** only he can do it · **[Agent]** a session does it ·
**[Both]** decision + execution split.

1. **[Thomas] Commit the backlog.** GitHub Desktop, in logical chunks (data
   rounds / consolidation / visual phases / reorg). Everything else on this list
   matters less than not losing three weeks of work.
2. **[Thomas] Eyeball phases 0/0b/1 on real hardware.** Especially bloom/glow —
   the two glow numbers were tuned against software renders. Note what looks
   wrong; do not retune constants ad hoc (each carries a dated comment).
3. **[Thomas] Empty the recycle bins.** `_to_delete/` at the root and
   `Grok - Brics+israel and singapore/_to_delete/`. Keep `grok-batches/` and the
   three BRICS/Israel/Singapore zips — only raw provenance copies.
4. **[Thomas] Eyeball Phase 2 + Phase 3.5 together on your hardware** (hard
   refresh first — F5 — to clear any hot-reload ghosts). Lenses, the
   constellation dim, the new pulses, the moved HUD, the always-refit camera.
   Note reactions; constants carry dated comments. Sidebar note:
   `notes/node-surface-encoding-2026-08-19.md` — soft-edge = continuous
   database ties into item 5.
5. **[Agent] Finish Phase 3.5:** give the 35 continuous databases in the
   staged corpus real `releases_per_year` numbers (250 business-daily, 365
   continuous — matching live daily FX), which fixes the hollow-node/
   annual-pulse contradiction and keeps `undefined` meaning one-off
   instrument. Blocked 2026-08-19 only by the bridge dropping. **[Thomas]**
   separately: does the beam rendering (scrolling gradient for direction)
   join Phase 4, or wait for the mint?
6. **[Both] Phase 4 backlog next** — `notes/phase-4-brief-2026-08-19.md`,
   minus what Phase 3.5 already took (edge lengths ×2 is done). [Thomas]
   ranks; [Agent] builds. Candidates: delete Blueprint (ten minutes of
   diagnosis first), fix the key light sitting inside the graph, hover/click
   affordances, the edge evidence card (the project's best material is still
   thrown away before drawing), menu bar, help wiring, saved views.
7. **[Agent] Phase 3 after Phase 4** (reordered by Thomas 2026-08-19):
   geography-takes-the-fill mode; typed edges (remember:
   `methodology_depends_on` is the MOST common type at 407, and a trunk
   aggregates up to 57 mixed edges — answer what a trunk's "type" means
   first).
8. **[Both] Pre-mint gates, then the mint.** In order: [Thomas or Agent] run
   `npm run check-urls -- --dir "Grok - Brics+israel and singapore/consolidated"`
   (Thomas's machine is more reliable — sandbox egress blocks some hosts);
   [Agent] sweep the Mexico/Argentina geography-as-a-node cluster; [Agent] apply
   the live-wins policy to the 4 duplicate ids and graft the staged RBI
   `external-sector` tag. Then a **dedicated mint session** — never a side task.
   Immediately after: [Agent] re-count palette chroma damping (§7).
9. **[Agent] Research backlog — the bulk of remaining work, after the above.**
   (a) 722 candidate-only nodes across 15 countries with zero edges — several
   sessions; (b) 170 `_dropped` research leads (cheaper than cold research);
   (c) BRICS G.4 — Brazil (3/24) and China (1/12) were never dispatched at G.3,
   and the round should open by grepping every node description for
   international-node names.
10. **Parked, deliberately:** 169 open cadences (134 publishers state nothing
    countable — item 5 resolves the other 35); the 7 single-use `proposed:` tags
    (the mechanism's long tail — promote when one earns it); tabs/saved-views
    beyond what Phase 4 covers.

---

## 6. Lane A pointers (detail lives in the 2026-08-18c handoff)

Do not reprocess: `grok-batches/raw/` (consolidated already), the three
superseded country files (Argentina, Bolivia, UAE), the 21 double-confirmed
unreachable publishers, the 60 held-back edges (reviewed: 10 accepted, 4
reversed, 46 rejected), the 20 duplicate-id conflicts (reviewed). URLs are
verified-by-content, not verified-by-status, until `check-urls` has run.

---

## 7. The one cross-lane dependency

**Do not finalise the palette until the mint lands.** `palette-proposal.json`
damps each family's chroma by its corpus share, measured at 1 250 nodes. The
staged import moves `SA` to a major family and adds `IL`/`SG` outright. Palette
v3 was tuned accepting this debt — after minting, re-count the shares and
re-damp. Everything else in phases 0–1 is distribution-independent.

---

## 8. Known traps

Carried forward; the longer list is in the 2026-08-18c handoff §8.

- **The mesh-position map can lie.** With ESA 2010 selected, the mesh lookup
  reported (0,0,0) for a node plainly drawn on-screen — the library rebuilds
  node objects and the map can hold one it never adopted. The halo now reads
  layout data instead. **Anything else reading positions from that map will hit
  the same bug.**
- **`runFit` now measures first and only moves the camera if the surviving set
  isn't usably framed** — this preserves the black-screen fix. Do not restore an
  unconditional refit, and do not remove the conditional one.
- **Closed unions are cast, not parsed.** An off-union `relationship_type`
  makes edge weight `NaN` and PageRank spreads it to every score. Gate any
  external import on this first (285 such edges arrived in the raw Grok batch).
- **Grok's JSON is not reliably JSON** — parse-check before reading.
- **`releases_per_year: undefined` is overloaded** (hollow one-off vs annual
  pulse) — resolved by todo item 5; until then don't mint the 35.
- **Transparency does not affect raycasting** — `mesh.raycast = () => {}`.
- **Never reintroduce faceted node geometry while fresnel rims exist** (rims
  survive on hollow nodes and blueprint).
- **`dsbb.imf.org` is useless to a non-JS fetcher**; national NSDP mirrors work.

---

## 9. How to hand off

1. `mv HANDOFF.md "Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
2. Write a new `HANDOFF.md` at the top level — **§1 "Read these first" always
   comes first.**
3. Carry forward anything still live. Delete what is finished; a handoff that
   accumulates is a handoff nobody reads.
4. Write the project-memory index entry. If memory is broken, say so here.

Only one `HANDOFF.md` at the top level, ever.
