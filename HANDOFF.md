# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the top
level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/`. Never leave two handoffs at the top level.

Last written: **2026-08-19**, end of the first edge-research round on the
`candidates-only` tier. Supersedes
`Previous Handoffs/HANDOFF-2026-08-18-visual-revamp-and-rails.md`, whose §6
"what is left" list is now one item shorter.

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why | Skip if |
|---|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules. The two that break most: never run git, and every edge needs a document. | Never skip. |
| 2 | **This file** | What is in flight and who owns what. Two lanes are live. | Never skip. |
| 3 | `START-HERE.md` | Plain-language orientation. | You already know the project. |

Then read **one** of these depending on the task:

| Task | Read |
|---|---|
| Renderer, colours, camera, anything visual | `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) |
| Importing / minting the Grok archive | `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md`, then `consolidated/_STATUS.md` for the per-country board |
| Researching edges for the archive | §6 below, then `consolidated/_EDGES-jp-kr-tw-2026-08-19.json` as the worked example of the required shape |
| Continuing BRICS research | `BRICS/G.3.md` |
| Anything touching the schema | `src/lib/types.ts` — most of it is documented reasoning, not types |

**The code is the design doc.** `src/lib/palette.ts`, `src/components/nodeVisuals.ts`,
`src/lib/view.ts` and `src/components/InfluenceGraph.tsx` explain why each constant
is what it is. Read the comment before changing the number. Several say "do not
raise this" and mean it.

---

## 2. Standing rules

In `REPORTS.md` in full. The short version, because these are the ones that break:

1. **Never run git in this repo from an agent session** — not even read-only.
   Ask Thomas, or check GitHub Desktop.
2. **If no document says a dependency exists, it does not go in the graph.**
3. **A pointer is not a source.** `WebFetch` can return plausible text for a dead
   URL. See §6 for the standing caveat on how far the archive's URLs are verified.
4. **`npm run validate` before and after** any data change (44 checks).
5. **`src/data/slices.generated.ts` is generated.** Never hand-edit it.
6. Agent sessions cannot delete on the device — `mv` into `_to_delete/` and say so.

---

## 3. Where the project is

**Live corpus:** unchanged. 1 250 reports, 1 079 dependencies. **Nothing has been
minted** — `src/data/research/` has not been touched by either lane.

**Staged corpus:** `Grok - Brics+israel and singapore/consolidated/` — 37 country
files, **1 999 reports, ~970 dependencies + 63 added this session**, 357 dropped
notes. Importing would roughly **2.6×** the corpus.

**Git:** `.git` showed commit and fetch activity during the 2026-08-18 session, so
some of the backlog may now be pushed — but this cannot be checked without
breaking rule 1. **Ask Thomas what is actually on origin** before assuming either
way. Uncommitted as far as any session knows: the consolidated archive, the
`types.ts`/`palette.ts` edits, the visual-revamp notes, this session's edge file.

**Project memory:** was working for Lane A (`grok_archive_state.md` is current);
failed for Lane B and did not recover across a restart. Any memory note dated
2026-08-18 about a visual or palette review is **superseded** by
`notes/visual-revamp-2026-08-18/`. Where memory and a file disagree, the file wins.

---

## 4. Work in flight

### Lane A — the Grok archive. Staging complete; edges now started.

All six of Thomas's decisions are **executed** (§6). The archive is schema-clean,
URL-researched, cadence-researched and de-padded. Two things remain: Thomas's
mint-or-don't call, and the edge research — which this session began.

### Lane B — the visual revamp. Designed, measured, **zero code written.**

Unchanged. Carried forward in §5. No renderer file has been touched by either
lane. **Lane B owns `src/lib/palette.ts` and `src/components/`** — Lane A's two
map entries there are placeholders; check for conflict before editing.

---

## 5. Lane B — the visual revamp (carried forward, unchanged)

Three decisions from Thomas, each with a measurement behind it: **no rims**
(`rimPower = min(5, max(1.3, radius × 0.6))` makes a radius-2.2 node a near-linear
tint, not a border); **USA pure red, BRICS yellow, China off yellow** (pure red
needs a moat at hues 335°–25°, forcing CA, AU, NZ, CN, IN to move; Canada to cyan
at the US antipode); **everything is too small in pixels** — correct, and two of
three are bugs.

**Phase 0 — scale. Do this first.** Every palette judgement is a function of mark
size; judging colour first already produced one wrong answer (§7).

- Stray two-node components set the bounding radius `runFit` fits to, pinning
  `nodeScaleFor` at its cap of 6 when it wants 10.4. Largest node renders at
  **7 px** instead of 12.2. Make the fit robust — percentile radius, or largest
  component.
- `linkWidth` and `teardropGeometry` are **never multiplied by `nodeScale`**.
  Nodes grew 6× as the corpus went 120 → 1 250; edges grew 0×. An ordinary edge is
  **0.08 px**. Ratio 87:1.
- Pulses cannot be resized by transform — `three-forcegraph` reads `.geometry` off
  the custom particle object and builds its own mesh. Rebuild the geometry and
  re-assign the accessor.
- Targets: `TARGET_LARGEST_FRACTION` 0.0165 → **0.026**, `radiusFor` min 2.2 →
  **3.4**, cap 6 → **20**, `linkWidth × nodeScale × 1.2`, pulse = **2.4 × the
  link's own width**. Gives 19 px / 8 px nodes, 1.6 px edges, 3.8 px pulses.
- **Trap:** scale collision off `nodeScale`, **not** cloud radius, or collision →
  cloud → scale → collision chases its own tail.
- Split `runFit` into `measure()` (always) / `applyCamera()` (conditional) — it
  sets `nodeScale.current` too, so a naive early return freezes node sizes.

**Phase 0b:** screen-space selection halo (bloom cannot fix glow — it is
energy-proportional); darken horizon `#28486e` and wire `uFogColour` to it; four
flicker tests; cache `SphereGeometry` by radius.

**Phase 1 — palette.** Extract `FAMILY_INK` and repoint edge colours **before**
deleting rims, or edges lose their colour source. Then rebuild `SCOPE_COLOUR` from
`palette-proposal.json`, delete rims (keep only where the interior is empty:
hollow nodes and blueprint), retune `DIM_NODE_OPACITY`, re-check bloom. Current
palette spans a **13× luminance range**, and **authority glow is inverted** —
`emissive` is fill colour × authority, so a worthless institutional node emits ~3×
a top-authority national one.

**Phase 2:** BRICS into `GeoBloc`/`COUNTRY_BLOCS`, GROUP_COMPARISON as a recolour
pass. **Phase 3:** `REGION_OF` + GEO_EXPLORATION, `dominant` edge type, two line
styles.

---

## 6. Lane A — the edge problem, which is now the whole job

### Thomas's six decisions are closed

| # | Decision | Outcome |
|---|---|---|
| 1 | Strip the 309 flagged non-publications | **Stripped.** Archived to `consolidated/_archive/`. Cost 4 edges. |
| 2 | Semantic merge of `proposed:` tags | **Done.** Non-approved uses 5 770 → 1 444; `Domain` gained 18 tags in `types.ts`. |
| 3 | 659 text cadences | **Researched.** 292 resolved from the publisher's page; 169 remain, of which 35 are a modelling question not a research gap. |
| 4 | `IL`/`SG` palette entries | **Added**, both to `ASIA`, the reserved catch-all — the same precedent `RU` and `AE` use. |
| 5 | Afghanistan `afg-` vs `af-` | **`af-`.** No live node id starts with `af-`; Africa uses it only in filenames. |
| 6 | The 21 unreachable publishers | **Left**, double-confirmed dead. Settled, not pending. |

### This session: the first edge round

`consolidated/_EDGES-jp-kr-tw-2026-08-19.json` — **63 documented edges** across the
three largest zero-edge countries. Written as a separate additive file, not merged
into the country JSONs, because Lane A was rewriting those in place at the time.
Merge the arrays or import directly.

Every edge carries `basis`, `evidence_url` and a verbatim `evidence_quote` in the
source language. All 63 were checked mechanically before writing: ids exist in the
named file, `relationship_type` is in the four-value union, no self-loops, no
duplicate pairs. 0 rejected.

| | nodes | edges | now connected | still orphan |
|---|---|---|---|---|
| Japan | 65 | 33 | 32 | 33 |
| South Korea | 72 | 13 | 18 | 54 |
| Taiwan | 122 | 17 | 19 | 103 |
| **Total** | **259** | **63** | **69** | **190** |

**The yield difference is the reusable finding.** Japan returned 2.5× Korea's edge
count because ESRI publishes one consolidated sources-and-methods manual that names
every input statistic by name — the whole national accounts cluster fell out of a
single PDF. Korea's and Taiwan's equivalents sit behind broken TLS chains,
Cloudflare 403s and JS-only portals, so both rounds had to reconstruct the same
facts from scattered FAQ pages. **Before dispatching a country, look for its
national compilation manual.** If one exists and is fetchable, expect a good round;
if not, expect a third of the yield. Taiwan's best single source turned out to be a
statute, not a methodology page — the Basic Wage Deliberation Measures list seven
statistics the committee must consult, giving seven clean edges from one document.

### Why edges are not optional polish

A node with no edges in either direction is **excluded from the 3D scene entirely**
and rendered on the unlinked shelf instead. That shelf currently reads 292.

- 13 countries still have **zero edges**: Afghanistan, Indonesia, Iran, Iraq,
  Myanmar, Philippines, Saudi Arabia, Syria, Thailand, Türkiye, UAE, Vietnam,
  Yemen — **489 nodes**.
- Plus the 190 still orphaned in Japan, Korea and Taiwan.

**Importing the archive today would take the unlinked shelf from 292 to roughly
970.** That is the argument for finishing the edges before minting, and it is
stronger than "it would be nice to have them."

Expect a real ceiling, though: some of these nodes are treaties, institutions and
framing documents that will never have a documented dependency. Japan at 49 %
connected after one round is probably near the practical maximum for a single pass.

### The rest of the backlog

1. **Mint or don't.** Thomas's call, coupled to the palette — see §7.
2. **170 `_dropped` entries are research leads**, not failures. Singapore 19,
   Suriname 16, Brazil 15, Russia 15, China 14.
3. **60 edges held as `deferred`** — arrived typed `related_to`/`complements`,
   basis describes a thematic association. Recoverable if re-typed against evidence.
4. **169 cadences open** — 134 where the publisher states nothing countable, 35
   live databases with no discrete release (a modelling question).
5. **20 duplicate ids** resolved first-occurrence-wins, losers under `_variants`.
6. **4 id collisions with the live corpus**: `in-mospi-cpi`,
   `in-rbi-balance-of-payments`, `ru-rosstat-cpi`,
   `ru-cbr-monetary-policy-guidelines`.
7. **`scripts/validate-data.ts` has no domain rule.** `Domain` is cast, not parsed,
   so an off-union tag reaches the renderer and silently never matches a filter.
   Five-line fix, and the corpus is clean right now so it would land green.

### Standing caveat on rule 3

The archive's 373 researched URLs were verified **by content** — each page fetched
and matched against the publication — but not by independent HTTP status check.
Content-matching is stronger for catching a *wrong* page and weaker for catching a
*fabricated* one. This session's 63 edges were content-verified the same way, with
verbatim quotes recorded so any reviewer can re-check them cheaply. If the
distinction matters before minting, a status sweep over the ~2 000 URLs is the fix.

---

## 7. The one cross-lane dependency

**Do not finalise the palette until the import decision is made.**

`palette-proposal.json` damps each family's chroma by its share of the corpus,
measured at 1 250 nodes: AFR 32.2 %, EU 15.7 %, US 11.4 %, CA 10.2 %, SA 9.3 %,
INT 6.1 %, rest under 5 %. The staged import is 1 999 nodes, heavily Latin America
and Asia; it moves `SA` from 9 % to a major family and adds `IL`/`SG`. **Those
shares are an input to the palette, so importing after tuning means re-tuning.**

Phase 0 sizing is distribution-independent and safe now.

Related, and the reason this section exists: the review's "twelve flat families
don't work, use a seven-way roll-up" conclusion was measured at 6 px nodes and is
**already superseded** — at 12 px they read fine. Judging colour before fixing size
gave the wrong answer once already.

---

## 8. Known traps

- **`runFit`'s camera refit on filter change is deliberate** — it fixes the
  reported black screen. Replace with an "is the surviving set usably framed?"
  test; do not disable.
- **Transparency does not affect raycasting.** A 90 %-transparent node still eats
  clicks. `mesh.raycast = () => {}`.
- **`methodology_depends_on` is the most common relationship type** (407), not the
  rarest. `LinkDatum` carries no `relationship_type`; trunks aggregate up to 57
  mixed edges.
- **Never reintroduce faceted node geometry while fresnel rims exist.**
- **`nodeGeometry()` allocates a new `SphereGeometry` per node**, no caching.
- **Closed unions in the data are cast, not parsed** — an off-union
  `relationship_type` makes the edge weight `NaN`, and `NaN` spreads through
  PageRank to every score in the graph. Not hypothetical: **285 edges in the raw
  Grok archive carried one.** Gate any external import on this before anything else.
- **Grok's JSON is not reliably JSON.** 136 of 219 raw files failed to parse, all
  from `"releases_per_year": continuous",` with the opening quote missing.
  Parse-check before reading.
- **The IMF DSBB / NSDP aggregator is useless to a non-JS fetcher** — it serves
  `{{country.NSDPUrl}}` placeholders. Three agents have wasted time on it. National
  mirrors like `nsdp.nso.gov.vn` do work.
- **Korean `.go.kr` and Taiwanese `.gov.tw` government hosts fail intermittently**
  — robots.txt connect-timeouts, broken TLS chains (`ws.dgbas.gov.tw`,
  `ecfa.org.tw`), Cloudflare 403s on PDF paths. Workarounds that paid off: UN-hosted
  copies of the same official document (`unstats.un.org`), the national law portals
  (`law.moj.gov.tw`, `laws.e-gov.go.jp`), and metadata registries (`narastat.kr`).

---

## 9. How to hand off

1. `mv HANDOFF.md "Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
2. Write a new `HANDOFF.md` at the top level, following this shape — **§1 "Read
   these first" always comes first.**
3. Carry forward anything in §4–§7 that is still live. Delete what is finished; a
   handoff that accumulates is a handoff nobody reads.
4. If project memory is working, write the index entry too. If not, say so here.

Only one `HANDOFF.md` at the top level, ever.
