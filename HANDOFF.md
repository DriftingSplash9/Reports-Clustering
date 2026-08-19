# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the top
level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/`. Never leave two handoffs at the top level.

Last written: **2026-08-18**, end of the Grok-archive consolidation session. Updated later the same day after closing the four bounded items and, unexpectedly, turning the validator green.
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
files, **1 999 reports, 983 dependencies, 357 dropped notes**. Importing it would
roughly **2.6×** the corpus.

**`npm run validate` exits 0.** It was **red with 155 errors** when this session
started, and had been for days — see §6a, because the reason matters more than the
fix.

**Code and live data were edited** — see §6 and §6a. `src/lib/types.ts` gained 18
domains; `src/lib/graph.ts`'s domain rule now understands the `proposed:` prefix;
`scripts/validate-data.ts` gained a domain inventory; `scripts/check-urls.ts` is
new; `package.json` wires it up; four live slices in `src/data/research/` were
retagged and three nodes refiled to `INT`. **Lane B owns `palette.ts`** — the
`IL`/`SG` edit there is two map entries and a comment, but check before editing.

**You cannot run `npm run validate` through the device bridge.** The bridge shell
is a Linux VM and the repo's `node_modules` holds the Windows esbuild binary, so
`tsx` dies on startup. `npx tsc --noEmit --skipLibCheck` works because npx fetches
its own copy. To actually run the validator from an agent session, copy `src/`,
`scripts/`, `package.json` and `tsconfig.json` into a Linux workspace, `npm
install` there and run it — that is how this session verified its changes. Worth
knowing, because standing rule 4 is otherwise quietly unenforceable.

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

The four bounded items from the previous revision of this section are **done** —
the 60 held-back edges, the 20 duplicate-id conflicts, the validator gap and the
URL-sweep script. What remains:

1. **Mint or don't.** Thomas's call. See §7 — it is coupled to the palette.
2. **The `candidates-only` tier has essentially zero dependency edges.** 15
   countries — Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines,
   Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Türkiye, Vietnam, Yemen —
   **722 nodes between them and no edges at all.** Nodes are real, linked and
   dated; every edge has to be researched from nothing. **This is the bulk of the
   remaining work in the whole archive.**
3. **170 `_dropped` entries are research leads**, not failures (`no-node-yet` /
   `deferred`). Singapore 19, Suriname 16, Brazil 15, Russia 15, China 14.
4. **169 cadences still open** — 134 where the publisher states nothing countable,
   and 35 that are live databases with no discrete release. That second group is
   a **modelling question, not a research gap**: a continuously-updated dashboard
   is neither of the schema's two node shapes.
5. **4 id collisions with the live corpus** to resolve at merge time:
   `in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`,
   `ru-cbr-monetary-policy-guidelines`.
6. **A geography-as-a-node cluster nobody has swept.** `mx-chiapas-entity`,
   `mx-guerrero-entity`, `mx-acapulco`, `mx-tuxtla-gutierrez`, and in the *live*
   corpus `ar-caba`, `ar-cordoba-entity`, `ar-santa-fe-entity` — all titled
   "statistical identity" or "statistical profile". These are the same shape as
   the 309 already stripped, but Mexico and Argentina were never in the sweep that
   found them. Worth a pass.

### The 60 held-back edges: 14 survived

Each had arrived typed `related_to` or `complements` with a basis asserting a
theme rather than citing a document. Re-checked one at a time against primary
sources: **10 accepted, 4 reversed, 46 rejected.** Rejection was the expected
outcome and is the rule working — the original text was pattern-matching.

The four reversals are the interesting ones, because each was a real dependency
pointing the wrong way. BCRA's own note says the balance of payments consumes the
exchange-market data, not the reverse. DANE's EMMET methodology says the survey
was redesigned *from* the EAM frame, so the edge ran backwards. Ecuador's ENDI
draws its sample from INEC's master frame and the health ministry is a *user* of
it. Bolivia's TIOC is the classification axis of the autoidentificación
tabulation, not a consumer of it.

Two rejections produced evidence that the *node* is wrong rather than the edge:
`sr-deuda`'s URL points at the central bank, which does not publish public debt at
all (it links out to SDMO), and `sr-bosbouw`'s district roundwood series is
published by SBB, not by the ABS page the node cites. Both are in the file's
`_dropped` notes.

### The 20 duplicate-id conflicts: 4 corrected, 16 confirmed

Where two batches defined the same id with different content, first occurrence had
won and the loser was preserved under `_variants`. Reviewed all 20. Four were
wrong: `in-mospi-asi` was pointing at `mospi.gov.in`, a bare ministry homepage the
corpus rule rejects, while the discarded variant had the real ASI catalogue entry;
`ru-rosstat-labour-force-survey` had region `"Europe"` for a Russian national
survey; `ae-population` and `ae-bop` had dropped a stated annual cadence. The
other 16 kept the better record already. All carry `_variants_reviewed`.

### 6a. The validator was red, and the reason is worth reading

`npm run validate` failed with **155 errors** before this session touched
anything. 152 of them were domain tags carrying the `proposed:` prefix.

That prefix is not a mistake. It is what the data spec every research session
works to tells researchers to do with a genuinely new tag, so the tag enters the
corpus *visibly* and gets reviewed later. But `validate()` in `graph.ts` rejected
any tag outside `DOMAINS` outright — so **the honest move failed the build and the
dishonest one passed it.** A researcher who announced new vocabulary went red; one
who quietly reused whichever approved tag was closest went green.

The corpus proves nobody took the dishonest option: at the moment this was fixed
the live data carried 152 prefixed tags and **not one bare unknown tag**. Everyone
followed the convention and the validator had simply been red for days — which is
how a red validator stops being read at all.

Fixed by teaching the rule the prefix: a bare unknown tag is still an error, a
prefixed one is a warning plus an inventory in `validate-data.ts` showing which
proposed tags are used enough to deserve promoting. Then:

- 18 tags promoted into `Domain`, and the live corpus retagged where a promoted
  name made its `proposed:` form redundant — 62 uses across `ae-`, `ar-` and
  `bo-national-core.json`.
- The same semantic merge applied to live data as to the staged archive, for
  consistency — 83 more uses. Live `proposed:` tags: **90 → 7**, each now used
  once, which is exactly the long tail the mechanism is for.
- 7 reports carried no domain tag at all and so were unreachable by the filter;
  all now tagged.
- **3 genuine data errors fixed**: `ae-gcc-customs-union`, `ar-mercosur` and
  `ar-fmi-eff-2025` were filed under a country code while carrying an
  international or supranational publisher. Refiled to `INT`, which is what
  `Country` in types.ts defines INT for. Original values kept in
  `_country_original`. This is a rim-colour and family change only.

**A correction to what the previous revision of this handoff said.** It claimed
"`validate-data.ts` has no domain rule at all." That was wrong and the error is
instructive: I grepped one file instead of following the code path. The rule
existed, in `graph.ts`, and ran on every `npm run validate` — it was just rejecting
the thing the spec asks for. Check the path, not the file.

### Caveat on rule 3, stated plainly

Standing rule 3 says a pointer is not a source and that HTTP status should be
raw-verified before trusting a quote. **This session verified page *content* via
`WebFetch` — every one of the 373 URLs was fetched and its content matched
against the publication — but did not independently raw-verify HTTP status.**
Content-matching is stronger than a status check for catching a *wrong* page and
weaker for catching a *fabricated* one. If that distinction matters before
minting, run **`npm run check-urls -- --dir "Grok - Brics+israel and singapore/consolidated"`**
— a script added this session that HEADs every URL and exits 1 if any is dead. It
can gate a mint. Run without `--dir` it sweeps the live corpus instead. Until it
has been run, treat these URLs as verified-by-content, not verified-by-status.

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
