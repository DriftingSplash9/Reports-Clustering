# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the top
level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/`. Never leave two handoffs at the top level.

Last written: **2026-08-18**, end of the Grok-archive consolidation session.
Supersedes `Previous Handoffs/HANDOFF-2026-08-18-visual-revamp.md`, whose Lane A
section is now out of date in every particular.

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why | Skip if |
|---|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules, including the two that get violated most: never run git, and every edge needs a document. | Never skip. |
| 2 | **This file** | What is in flight and who is touching what. Two lanes are live. | Never skip. |
| 3 | `START-HERE.md` | Plain-language orientation. | You already know the project. |

Then read **one** of these depending on the task:

| Task | Read |
|---|---|
| Renderer, colours, camera, anything visual | `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) — the current design, with the measurements behind it |
| Importing research / minting nodes | `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md` — **1 999 staged reports**, and `consolidated/_STATUS.md` for the per-country board |
| Continuing BRICS research | `BRICS/G.3.md` — newest file in the branch is the branch's state |
| Anything touching the schema | `src/lib/types.ts` — most of it is documented reasoning, not types |

**A habit specific to this repo: the code is the design doc.** `src/lib/palette.ts`,
`src/components/nodeVisuals.ts`, `src/lib/view.ts` and `src/components/InfluenceGraph.tsx`
carry long comments explaining why each constant is the value it is. Read the
comment before changing the number. Several say outright "do not raise this" and
mean it.

---

## 2. Standing rules

In `REPORTS.md` in full. The short version, because these are the ones that break:

1. **Never run git in this repo from an agent session** — not even read-only. It
   leaves a stale lock. Ask Thomas, or check GitHub Desktop.
2. **If no document says a dependency exists, it does not go in the graph.**
3. **A pointer is not a source.** `WebFetch` can return fabricated content for a
   dead URL. See §6's caveat — this session leaned on WebFetch heavily and the
   rule was only half-honoured.
4. **`npm run validate` before and after** any data change (44 checks).
5. **`src/data/slices.generated.ts` is generated.** Never hand-edit it.
6. Deleting files on the device is not possible from an agent session — `mv` into
   `_to_delete/` and tell Thomas.

---

## 3. Where the project is

**Live corpus:** unchanged. 1 250 reports, 1 079 dependencies. **Nothing was
minted this session** — `src/data/research/` was not touched.

**Staged corpus:** `Grok - Brics+israel and singapore/consolidated/` — 37 country
files, **1 999 reports, 969 dependencies, 357 dropped notes**. Importing it would
roughly **2.6×** the corpus.

**Schema files were edited** — see §6. `src/lib/types.ts` gained 18 domains;
`src/lib/palette.ts` gained `IL` and `SG`. **Lane B owns `palette.ts`** — that
edit is two map entries and a comment, but check for a conflict before editing.

**Git:** unknown from here, and not checkable without breaking rule 1. Last
recorded state (2026-08-17) was six bodies of work uncommitted. This session adds
two more: the consolidated archive, and the `types.ts`/`palette.ts` edits.

**Project memory:** working this session. `grok_archive_state.md` is current and
accurate as of this handoff. **The prior handoff's warning still stands for Lane
B**: any memory note dated 2026-08-18 about a visual or palette review is
superseded by `notes/visual-revamp-2026-08-18/`, and a future session should
rewrite that entry from the file. This session did not touch it.

---

## 4. Work in flight

### Lane A — the Grok archive (this session). Staging complete.

Consolidation, schema alignment, URL research and cadence research are **done**.
All five of the open decisions the previous handoff listed have been answered by
Thomas and executed. What is left is a Thomas decision (mint or don't) plus one
large body of research. Detail in §6.

### Lane B — the visual revamp (designed, not implemented)

Design complete and measured; **zero code written** as of this handoff. Full
record in `notes/visual-revamp-2026-08-18/`. Carried forward unchanged in §5 —
this session did not touch `src/components/` or any renderer file.

---

## 5. Lane B — the visual revamp (carried forward, unchanged)

Three decisions from Thomas drove it, each with a measurement behind it:

1. **No rims.** They read as a wash, not a border: `rimPower = min(5, max(1.3,
   radius × 0.6))`, so on a radius-2.2 node the exponent is 1.32 — a near-linear
   tint across the whole disc.
2. **USA pure red, BRICS yellow, China off yellow.** Pure red needs a moat
   (hues 335°–25°), forcing CA, AU, NZ, CN and IN to move. Canada goes to cyan at
   the US antipode.
3. **Everything is too small in pixels.** Correct, and two of three are bugs.

### Do these in order

**Phase 0 — scale. Do this first.** Every palette judgement is a function of mark
size; judging colour before fixing size gets the wrong answer (it already did
once — see the roll-up note at the end of §7).

- Stray two-node components are setting the bounding radius `runFit` fits to,
  pinning `nodeScaleFor` at its cap of 6 when it wants 10.4. Largest node renders
  at **7 px** instead of 12.2. Make the fit robust (percentile radius, or largest
  component).
- `linkWidth` and `teardropGeometry` are **never multiplied by `nodeScale`** —
  fixed world units. Nodes grew 6× as the corpus went 120 → 1 250; edges grew 0×.
  An ordinary edge is **0.08 px** wide. Node:edge ratio 87:1.
- Pulses cannot be resized by transform — `three-forcegraph` reads `.geometry`
  off the custom particle object and builds its own mesh. Rebuild
  `teardropGeometry` and re-assign the accessor.
- Targets: `TARGET_LARGEST_FRACTION` 0.0165 → **0.026**, `radiusFor` min 2.2 →
  **3.4**, cap 6 → **20**, `linkWidth × nodeScale × 1.2`, pulse = **2.4 × the
  link's own width**. Gives 19 px / 8 px nodes, 1.6 px edges, 3.8 px pulses.
- **Trap:** scale the collision radius off `nodeScale`, **not** cloud radius, or
  collision → cloud → scale → collision chases its own tail.
- Split `runFit` into `measure()` (always) and `applyCamera()` (conditional) — it
  sets `nodeScale.current` as well as moving the camera, so a naive early return
  freezes node sizes.

**Phase 0b:** screen-space selection halo (bloom cannot fix glow — it is
energy-proportional, a 6 px node has no halo to give); darken the horizon
`#28486e` and wire `uFogColour` to it; run the four flicker tests; cache
`SphereGeometry` by rounded radius.

**Phase 1 — palette.** Extract `FAMILY_INK` and repoint the edge colours **before**
deleting rims, or edges lose their colour source. Then rebuild `SCOPE_COLOUR`
from `palette-proposal.json`, delete rims (keep only for hollow nodes and
blueprint — a rim is valid only where the interior is empty), retune
`DIM_NODE_OPACITY`, re-check bloom.

Two findings worth knowing: the current palette spans a **13× luminance range**
(0.054 → 0.703), which is why dark nodes read as holes and why rims were added to
rescue them; and **the authority glow is currently inverted** — `emissive` is the
fill colour × authority, so a worthless institutional node emits ~3× a
top-authority national one.

**Phase 2:** BRICS into `GeoBloc`/`COUNTRY_BLOCS`, `groupOf()`, GROUP_COMPARISON
as a recolour pass. **Phase 3:** `REGION_OF` + GEO_EXPLORATION, `dominant` edge
type + two line styles.

---

## 6. Lane A — what changed, and what is actually left

`Grok - Brics+israel and singapore/consolidated/` is now the **source of truth**
for the Grok archive. `grok-import-progress.md` was rewritten this session: it
used to list 27 countries as `queued` against `grok-batches/raw/`, which would
have made a future session reprocess raw batches and silently discard all of
this. It has no queue any more.

### The previous handoff's six decisions are closed

| # | Decision | Outcome |
|---|---|---|
| 1 | Strip the 309 flagged non-publications? | **Stripped.** Archived in full to `consolidated/_archive/`. Cost 4 edges. |
| 2 | Semantic merge of `proposed:` tags | **Done.** Non-approved uses 5 770 → 1 444. |
| 3 | 659 text cadences | **Researched.** 292 resolved from the publisher's own page; 169 remain (§6.3). |
| 4 | `IL`/`SG` palette entries | **Added**, both to `ASIA`, the reserved catch-all. Placeholders pending Lane B. |
| 5 | Afghanistan `afg-` vs `af-` | **`af-`.** The collision warning was wrong — no live node id starts with `af-`; Africa uses it only in *filenames*, its nodes are ISO-prefixed. |
| 6 | The 21 unreachable publishers | **Left.** Double-confirmed dead by an independent Grok pass; treat as settled, not pending. |

### Schema changes made, and why they were not out of scope

`Domain` gained **18 tags**: trade, living-standards, public-finance, industry,
energy, external-sector, poverty, development-finance, investment, environment,
governance, services, statistical-system, infrastructure, mining, housing,
tourism, general-statistics. Each has a dated comment in the house style.
`npx tsc --noEmit --skipLibCheck` passes.

The reason this was safe: **the 22 was never a cap.** `Domain` is the list of
tags with a filter chip in `filter.ts`, Thomas added five of the original 22
himself in August, and `proposed:` is the intake queue. 542 pseudo-tags were also
*dropped* — `regional`/`provincial`/`urban`/`municipal` duplicate `region` and
`jurisdiction_level`, and `comprehensive`/`meta`/`indicators` describe the batch.

**A real gap this turned up: `scripts/validate-data.ts` has no domain rule at
all.** `Domain` is cast, not parsed, so an off-union tag reaches the renderer and
simply never matches a filter — silent, exactly the failure class the closed
unions in `types.ts` have runtime lists to prevent. Worth adding a check; it is a
five-line rule and the corpus is clean right now, so it would land green.

### What is left, in order of size

1. **Mint or don't.** Thomas's call. See §7 — it is coupled to the palette.
2. **The `candidates-only` tier has essentially zero dependency edges.** 15
   countries — Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines,
   Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Türkiye, Vietnam, Yemen.
   Nodes are real, linked and dated; every edge has to be researched from nothing.
   **This is the bulk of the remaining work in the whole archive.**
3. **170 `_dropped` entries are research leads**, not failures (`no-node-yet` /
   `deferred`). Singapore 19, Suriname 16, Brazil 15, Russia 15, China 14.
4. **60 edges are held as `deferred`** because they arrived typed `related_to` or
   `complements` and their basis describes a thematic association, not a
   documented dependency. Basis and URL preserved — recoverable if re-typed
   against real evidence.
5. **169 cadences still open** — 134 where the publisher states nothing countable,
   and 35 that are live databases with no discrete release. That second group is
   a **modelling question, not a research gap**: a continuously-updated dashboard
   is neither of the schema's two node shapes.
6. **20 nodes had a duplicate id with conflicting content.** First occurrence won;
   losing values preserved under `_variants`. Live ones: `in-mospi-asi`,
   `jp-national-health-nutrition-survey`, `mx-lsnieg`, `id-education-stats`.
7. **4 id collisions with the live corpus** to resolve at merge time:
   `in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`,
   `ru-cbr-monetary-policy-guidelines`.

### Caveat on rule 3, stated plainly

Standing rule 3 says a pointer is not a source and that HTTP status should be
raw-verified before trusting a quote. **This session verified page *content* via
`WebFetch` — every one of the 373 URLs was fetched and its content matched
against the publication — but did not independently raw-verify HTTP status.**
Content-matching is stronger than a status check for catching a *wrong* page and
weaker for catching a *fabricated* one. If that distinction matters before
minting, a status sweep over the 1 972 URLs is the cheap fix. Treat the URLs as
verified-by-content, not verified-by-status.

### Three files are superseded, do not reprocess

Argentina (49 of 61 ids already live), Bolivia (37 of 60), UAE (22 of 41).

---

## 7. The one cross-lane dependency

**Do not finalise the palette until the import decision is made.** Unchanged from
the previous handoff, but the numbers moved:

`palette-proposal.json` damps each family's chroma by its share of the corpus,
measured at 1 250 nodes: AFR 32.2 %, EU 15.7 %, US 11.4 %, CA 10.2 %, SA 9.3 %,
INT 6.1 %, everything else under 5 %. The staged import is **1 999 nodes, not the
2 308 the previous handoff assumed** — 309 were stripped as non-publications. It
is still heavily Latin America and Asia, still moves `SA` from 9 % to a major
family, and still adds `IL`/`SG` outright. **Those shares are an input to the
palette, so importing after tuning means re-tuning.**

The Phase 0 sizing work is distribution-independent and safe to do now.

Related: the "twelve flat families don't work, use a seven-way roll-up"
conclusion in §3.4 of the review was measured at 6 px nodes and **is already
superseded** — at 12 px they read fine (`node-size-vs-palette.png`). Same mistake
in miniature: judging colour before fixing size.

---

## 8. Known traps

Carried forward, plus what this session learned.

- **`runFit`'s camera refit on filter change is deliberate**, not a bug — it fixes
  the reported black screen (329 of 728 shown, survivors knotted in a corner).
  Replace with an "is the surviving set usably framed?" test; do not disable.
- **Transparency does not affect raycasting.** A 90 %-transparent node still eats
  clicks. `mesh.raycast = () => {}`.
- **`methodology_depends_on` is the most common relationship type** (407), not the
  rarest. `LinkDatum` carries no `relationship_type`; trunks aggregate up to 57
  mixed edges.
- **Never reintroduce faceted node geometry while fresnel rims exist.**
- **`nodeGeometry()` allocates a new `SphereGeometry` per node**, no caching.
- **Closed unions in the data are cast, not parsed** — an off-union
  `relationship_type` makes the edge weight `NaN`, and `NaN` spreads through
  PageRank to every score in the graph. **This is not hypothetical: 285 edges in
  the raw Grok archive carried one** (`part_of` 167, `produced_by` 49,
  `related_to` 34, `complements` 26, `contains` 8). Any future import from an
  external agent should be gated on this before anything else.
- **Grok's JSON is not reliably JSON.** 136 of 219 files in `grok-batches/raw/`
  failed to parse, all from one defect: `"releases_per_year": continuous",` with
  the opening quote missing. Parse-check an external batch before reading it.
- **`_flagged_not_a_publication` is a convention this session introduced**, not
  schema. Nodes carrying it were removed to `consolidated/_archive/`; if you
  re-derive anything from the archive files, they are still in there.
- **The IMF DSBB / NSDP aggregator (`dsbb.imf.org`) is useless to a non-JS
  fetcher** — it renders only `{{country.NSDPUrl}}` template placeholders. Three
  agents wasted time on it. National mirrors like `nsdp.nso.gov.vn` do work.

---

## 9. How to hand off

When your work is done and the next session needs different context:

1. `mv HANDOFF.md "Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
2. Write a new `HANDOFF.md` at the top level, following this shape — **§1 "Read
   these first" always comes first.**
3. Carry forward anything in §4–§7 that is still live. Delete what is finished; a
   handoff that accumulates is a handoff nobody reads.
4. If project memory is working, write the index entry too. If it is not, say so
   in the handoff.

Only one `HANDOFF.md` at the top level, ever.
