# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the top
level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/`. Never leave two handoffs at the top level.

Last written: **2026-08-18**, end of the visual-revamp session.

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why | Skip if |
|---|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules, including the two that get violated most: never run git, and every edge needs a document. | Never skip. |
| 2 | **This file** | What is in flight and who is touching what. There are two agents working right now. | Never skip. |
| 3 | `START-HERE.md` | Plain-language orientation — what the project is and why. | You already know the project. |

Then read **one** of these depending on what you have been asked to do:

| Task | Read |
|---|---|
| Renderer, colours, camera, anything visual | `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) — the current design, with the measurements behind it |
| Importing research / minting nodes | `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md` — 2 308 staged reports and their open questions |
| Continuing BRICS research | `BRICS/G.3.md` — newest file in the branch is the branch's state |
| Anything touching the schema | `src/lib/types.ts` — 50 KB, and most of it is documented reasoning, not types |

**A habit specific to this repo: the code is the design doc.** `src/lib/palette.ts`,
`src/components/nodeVisuals.ts`, `src/lib/view.ts` and `src/components/InfluenceGraph.tsx`
carry long comments explaining why each constant is the value it is, usually with
the screenshot or the bug that set it. Read the comment before changing the
number. Several of them say outright "do not raise this" and mean it.

---

## 2. Standing rules

These are in `REPORTS.md` in full. The short version, because they are the ones
that get broken:

1. **Never run git in this repo from an agent session** — not even read-only. It
   leaves a stale lock. Ask Thomas, or check state via GitHub Desktop.
2. **If no document says a dependency exists, it does not go in the graph.** Not
   "obviously related." A document, saying so, in words.
3. **A pointer is not a source.** `WebFetch` can return fabricated content for a
   dead URL. Raw-verify the HTTP status before trusting any quote.
4. **`npm run validate` before and after** any data change. It runs the
   generator, the logic tests and the data validator (44 checks).
5. **`src/data/slices.generated.ts` is generated.** Never hand-edit it.
6. Deleting files on the device is not possible from an agent session — `mv` into
   `_to_delete/` and tell Thomas.

---

## 3. Where the project is

**Live corpus:** 1 250 reports, 1 079 dependencies (the app header is
authoritative; `src/data/research/*.json` alone is 1 232 / 1 069 across 230
files, the balance being the hand-written seed set in `src/data/reports.ts`).

**Git:** unknown from here, and not checkable without breaking rule 1. The last
recorded state (2026-08-17) was **six bodies of work uncommitted and unpushed**.
Ask Thomas before assuming anything is safe on origin.

**Project memory:** the memory service failed partway through the 2026-08-18
session and did not recover across a restart. **Any saved memory note dated
2026-08-18 is superseded** — it recommends keeping the USA blue, and says nothing
about removing rims or about the sizing bugs. Where memory and
`notes/visual-revamp-2026-08-18/` disagree, the file wins. A future session with
working memory should rewrite that entry from the file.

---

## 4. Work in flight — read before you touch anything

**Two agents are working this codebase concurrently.** Establish which lane you
are in before making changes.

### Lane A — the other agent (active as of 2026-08-18)

- **Import batches.** A large consolidation is staged at
  `Grok - Brics+israel and singapore/consolidated/` — 37 country files,
  **2 308 reports, 973 dependencies, 357 dropped notes**. Nothing is minted.
  Importing it would roughly **triple the corpus**.
- **UI fixes.** Scope unknown to this session. No changes had landed in `src/`
  as of 2026-08-18 22:00.

**If you are not that agent: do not import those batches and do not edit `src/`
components without checking with Thomas first.** The consolidation report has six
open decisions that are Thomas's to make, listed in §6 below.

### Lane B — the visual revamp (designed, not implemented)

Design complete and measured; **zero code written**. Full record in
`notes/visual-revamp-2026-08-18/`. Summary in §5.

---

## 5. Lane B — the visual revamp

Three decisions from Thomas drove it, each with a measurement behind it:

1. **No rims.** They read as a wash, not a border: `rimPower = min(5, max(1.3,
   radius × 0.6))`, so on a radius-2.2 node the exponent is 1.32 and on a `bold`
   family 1.05 — a near-linear tint across the whole disc.
2. **USA pure red, BRICS yellow, China off yellow.** Pure red needs a moat
   (hues 335°–25°), which forces CA, AU, NZ, CN and IN to move. Canada goes to
   cyan at the US antipode.
3. **Everything is too small in pixels.** Correct, and two of three are bugs.

### Do these in order

**Phase 0 — scale. Do this first.** Every palette judgement is a function of mark
size; judging colour before fixing size gets the wrong answer (it already did
once — see §5's note on the roll-up).

- A handful of stray two-node components are setting the bounding radius that
  `runFit` fits to, which pins `nodeScaleFor` at its cap of 6 when it wants 10.4.
  Result: largest node renders at **7 px** instead of the 12.2 the design
  guarantees. Make the fit robust (percentile radius, or largest component).
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
- Also split `runFit` into `measure()` (always) and `applyCamera()` (conditional)
  — it sets `nodeScale.current` as well as moving the camera, so a naive early
  return freezes node sizes.

**Phase 0b:** screen-space selection halo (bloom cannot fix glow — it is
energy-proportional, a 6 px node has no halo to give); darken the horizon
`#28486e` and wire `uFogColour` to it; run the four flicker tests; cache
`SphereGeometry` by rounded radius.

**Phase 1 — palette.** Extract `FAMILY_INK` and repoint the edge colours
**before** deleting rims, or edges lose their colour source. Then rebuild
`SCOPE_COLOUR` from `palette-proposal.json`, delete rims (keep only for hollow
nodes and blueprint — a rim is valid only where the interior is empty), retune
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

## 6. Lane A — the staged import, and the decisions it needs

`Grok - Brics+israel and singapore/consolidated/` — 37 countries in three states:

- **`v2` (ready to verify):** Brazil, China, Egypt, Ethiopia, India, Russia,
  Israel, Singapore, BRICS-international. Real edges with basis and evidence URL.
- **`legacy+edges`:** Latin America — Chile, Colombia, Ecuador, Guyana, Mexico,
  Paraguay, Peru, Suriname, Uruguay, Venezuela. Real sourced edges, converted.
- **`candidates-only` (zero edges):** Afghanistan, Indonesia, Iran, Iraq, Japan,
  Myanmar, Philippines, Saudi Arabia, South Korea, Syria, Taiwan, Thailand,
  Türkiye, Vietnam, Yemen. Node lists are real; every edge still to be researched.

**Six decisions are Thomas's, not an agent's:**

1. Strip the 309 nodes flagged `_flagged_not_a_publication`, or keep them? Costs
   3 edges either way.
2. Semantic merge of the `proposed:` domain tags (`prices` vs `inflation`,
   `employment` vs `labour`) — list in `_MAPPINGS.json`.
3. 659 nodes still carry a text cadence needing a judgement call.
4. `IL` and `SG` need `COUNTRY_FAMILY` entries in `palette.ts`.
5. Afghanistan is filed `afg-` but its internal ids say `af-`.
6. The 21 double-confirmed unreachable publishers — leave, or retry later.

---

## 7. The one cross-lane dependency

**Do not finalise the palette until the import decision is made.**

The palette in `palette-proposal.json` damps each family's chroma by its share of
the corpus, measured at 1 250 nodes: AFR 32.2 %, EU 15.7 %, US 11.4 %, CA 10.2 %,
SA 9.3 %, INT 6.1 %, everything else under 5 %. The staged import is heavily
Latin America and Asia — it would move `SA` from 9 % to a major family and add
`IL`/`SG` outright. **Those shares are an input to the palette, so importing
after tuning means re-tuning.**

The Phase 0 sizing work is distribution-independent and safe to do now.

Related: the "twelve flat families don't work, use a seven-way roll-up"
conclusion in §3.4 of the review was measured at 6 px nodes and **is already
superseded** — at 12 px they read fine (`node-size-vs-palette.png`). Same
mistake in miniature: judging colour before fixing size.

---

## 8. Known traps

- **`runFit`'s camera refit on filter change is deliberate**, not a bug — it
  fixes Thomas's reported black screen (329 of 728 shown, survivors knotted in a
  corner). Replace with an "is the surviving set usably framed?" test, do not
  simply disable.
- **Transparency does not affect raycasting.** A 90 %-transparent node still eats
  clicks. `mesh.raycast = () => {}`.
- **`methodology_depends_on` is the most common relationship type** (407), not
  the rarest — any edge-styling scheme that assumes otherwise is backwards.
  `LinkDatum` carries no `relationship_type`; trunks aggregate up to 57 mixed
  edges.
- **Never reintroduce faceted node geometry while fresnel rims exist** — the
  tier-shape system died in one day on this.
- **`nodeGeometry()` allocates a new `SphereGeometry` per node**, no caching.
- Closed unions in the data are **cast, not parsed** — an off-union
  `relationship_type` makes the edge weight `NaN`, and `NaN` spreads through
  PageRank to every score in the graph.

---

## 9. How to hand off

When your work is done and the next session needs different context:

1. `mv HANDOFF.md "Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
2. Write a new `HANDOFF.md` at the top level, following this shape — **§1 "Read
   these first" always comes first.**
3. Carry forward anything in §4–§7 that is still live. Delete what is finished;
   a handoff that accumulates is a handoff nobody reads.
4. If project memory is working, write the index entry too. If it is not, say so
   in the handoff.

Only one `HANDOFF.md` at the top level, ever.
