# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the top
level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/`. Never leave two handoffs at the top level.

Last written: **2026-08-19**, end of the Lane B implementation session —
Phases 0, 0b and 1 of the visual revamp are **built and on disk**.

**This file was edited, not replaced.** A Lane A session (the first edge round on
the `candidates-only` tier) wrote this handoff while a Lane B session was working
in parallel, and the Lane B session found it mid-flight. Its §6 and its Lane A
numbers are that session's and are carried through untouched; §4's Lane B
paragraph, §5, §7 and §8 are rewritten. **Two agents were genuinely in this repo
at once on 2026-08-19** — the case REPORTS.md's protocol section warns about, now
observed rather than hypothetical. If §6 and §5 ever look like they were written
by different people, that is because they were.

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
| Renderer, colours, camera, anything visual | **§5 below first** — Phases 0/0b/1 of the review are built, so the review is now partly history. Then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) for Phases 2–3, which are still design |
| Importing / minting the Grok archive | `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md`, then `consolidated/_STATUS.md` for the per-country board |
| Researching edges for the archive | §6 below, then `consolidated/_EDGES-jp-kr-tw-2026-08-19.json` as the worked example of the required shape |
| Continuing BRICS research | `BRICS/G.3.md` |
| Anything touching the schema | `src/lib/types.ts` — most of it is documented reasoning, not types |

**The code is the design doc**, and after 2026-08-19 that is truer than it was.
`src/lib/palette.ts`, `src/components/nodeVisuals.ts`, `src/lib/view.ts` and
`src/components/InfluenceGraph.tsx` explain why each constant is what it is, and
now also carry the measurements that set them — the corpus statistics, the
luminance figures, the two places the review's own recommendation was measured and
overturned. Read the comment before changing the number. Several say "do not raise
this" and mean it.

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

**Renderer:** materially different from every previous handoff. Twelve files
changed — `palette.ts`, `view.ts`, `graph.ts`, `hierarchy.ts`, `types.ts`,
`App.tsx`, `InfluenceGraph.tsx`, `nodeVisuals.ts`, `linkVisuals.ts`,
`Environment.tsx`, `test-logic.ts`, `eu-schema-smoke.ts`. Details in §5.

**Git:** `.git` showed commit and fetch activity during the 2026-08-18 session, so
some of the backlog may now be pushed — but this cannot be checked without
breaking rule 1. **Ask Thomas what is actually on origin** before assuming either
way. Uncommitted as far as any session knows: the consolidated archive, the
`types.ts`/`palette.ts` edits, the visual-revamp notes, the Lane A edge file, and
**all of Lane B's renderer work**.

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

### Lane B — the visual revamp. **Phases 0, 0b and 1 are built.**

Written, type-checked, validated and rendered. Phases 2 and 3 — the lens modes —
are untouched and are the next Lane B work. Detail and findings in §5.

**Lane B owns `src/lib/palette.ts` and `src/components/`.** Lane A's `IL`/`SG`
placeholder entries survived the palette rebuild (both are `ASIA`, which now has
a real ink rather than a reserved one). Nothing in `src/data/` was touched.

---

## 5. Lane B — what shipped, and what it cost

Phases 0, 0b and 1 of `notes/visual-revamp-2026-08-18/visual-revamp-review.md`,
implemented against the review rather than from it: where the review offered
options, the choice was measured on the real corpus first, and **one of its
recommendations was measured and rejected** (below).

### Verified how

- `npx tsc --noEmit` clean, **run on Thomas's machine**, not only in a sandbox.
- `npm run validate` — **all 44 logic checks pass**, 1 250 reports / 1 079
  dependencies, unchanged. One check had to be *edited*, correctly:
  `radiusFor: the documented 2.2–8 range` is now `3.4–8`. It caught the change,
  which is what it is for.
- `scripts/eu-schema-smoke.ts` green (it was red before this session on an
  unrelated stale assertion — `label(PT, unlisted)` expected `PT`, but Thomas has
  since named Portugal; it now asserts the fallback with a code that is genuinely
  unlisted).
- **Rendered headlessly and looked at.** The session booted the dev server in its
  own sandbox and drove Chromium through Playwright — opening tier, Everything
  tier, a country filter, a traced selection, blueprint. Every number below was
  chosen against a picture, not against arithmetic.

### Verified how NOT — read this before trusting the tuning

The renders were **software-rasterised (SwiftShader)**. Geometry, layout, colour
and opacity are exact; the **postprocessing stack is not necessarily**. Bloom in
particular is a mipmap-blur pass whose falloff can differ from a real GPU's.

**So `BLOOM_THRESHOLD_MIN`/`MAX` are the least-trustworthy numbers in this
session's work.** They were lowered 0.26/0.44 → 0.17/0.32 by arithmetic that is
sound (see below) and confirmed only by a software render. Look at glow on real
hardware first; if the top nodes do not bleed, lower `BLOOM_THRESHOLD_MIN`
further before touching anything else.

### Phase 0 — scale

| | was | now |
|---|---|---|
| `TARGET_LARGEST_FRACTION` | 0.0165 | **0.026** |
| `radiusFor` floor | 2.2 | **3.4** |
| `nodeScaleFor` cap | 6 | **20** |
| `linkWidth` | unscaled | **× `nodeScale` × 1.2** |
| pulse width | fixed 7.7 | **2.4 × the link's own width** |
| collide radius | `r + 3 + 3m` | **`r × 1.5 + 4 + 4m`** |

Measured on the full corpus at the Everything tier, 958 framed nodes: the fit
wanted a node scale of **9.75** and the cap handed back **6**, so 38% of node size
was being lost to a guard rail. The cap was the whole bug.

**`runFit` now fits the 95th-percentile radius**, and the two changes to it are
independent: raising the cap is what makes nodes bigger, and the percentile is
what stops a dozen two-node islands wasting five sixths of the frame. Note the
arithmetic — apparent node size is `TARGET_LARGEST_FRACTION × canvasHeight ×
cos(FOV/2) / 1.18` and **the cloud radius cancels out entirely**, so changing what
"the cloud" means cannot change how big a node looks. It only changes what is in
frame.

**The review's other option — fit the largest connected component — was measured
and is wrong for this corpus.** Among the 958 connected nodes there are 123
components and the largest is **426, i.e. 44.5%**; fitting it would crop more than
half the graph including the entire 153-node second cluster. P95 is defensible for
a different reason: the radius spanned by the two big components alone is 3 077
and the 95th percentile of all 958 is 3 072. **Five units apart.** The percentile
finds the same boundary the topology does without needing the topology.

`runFit` is split into `measureFit()` and `runFit()`, and `requestRefit()` now
asks `framedUsably()` before moving the camera — in frame, and subtending between
30% and 140% of the vertical FOV. **The black-screen fix is preserved**: a filter
that leaves the survivors off to one side still fails the test and still refits.

**One trap the review got backwards, and it matters.** It says to scale collision
off `nodeScale` rather than cloud radius, "and the loop is broken". It is not:
`nodeScale` *is* a function of cloud radius, so that only hides the loop. The
layout is scale-invariant — multiply every force's length by k and the picture is
pixel-identical — so the only real lever is this radius **relative to the link
rest length**, and both have to stay constants for that ratio to stay one.
Collision is therefore still in fixed world units, opened from ~20% of a link's
rest length to ~33%.

### Phase 0b

Screen-space selection halo (one `Sprite`, additive, constant **76 px** at any
zoom, normal-blended graphite in blueprint); horizon `#28486e` → `#12233a` with
`uFogColour` wired to it; `SphereGeometry` cached by rounded radius.

**The four flicker tests in §9 of the review were NOT run** — a static screenshot
cannot see a flicker, and pulses animate constantly so frame-diffing is noise.
They still need a human at a live scene. The leading suspect is unchanged:
transparent-queue sort instability.

### Phase 1 — palette v3

`FAMILY_INK` replaces `COUNTRY_RIM`, and `inkFor()` replaces `rimColourFor()`;
edges, pulses, legend chips and the two surviving rims all read from it. That
extraction had to land first, exactly as the review said — the edges were reading
their colour out of the rim table.

`SCOPE_COLOUR` rebuilt from `palette-proposal.json`: US pure red with a 335°–25°
moat, CA cyan at the antipode, INT achromatic, chroma damped by family share.
**Measured on the values as written: the eleven hued families' national steps span
Y 0.211–0.215, a 1.02× range, against v2's 13.1×.** `COMMERCIAL_COLOUR` and
`UNCLASSIFIED_COLOUR` pushed below the band so the three neutrals separate by
lightness.

Rims are gone from the dark scene (`drawRim`, defaulting to `false`), surviving
only where the interior is empty: hollow one-off instruments and blueprint.

**The inverted authority glow is fixed, and the fix is `glowInk()`** — the
emissive channel is normalised to a constant luminance so emitted light is
proportional to authority alone. **The reference is 0.213 because that is pure
red's ceiling** and the US is pure red; a higher reference would leave every US
node emitting short at equal authority, which is the same inversion in miniature.

### Numbers a human should move by eye

Every one of these was picked off a render, and a render is not Thomas:

- **`DIM_NODE_OPACITY = 0.13`** — chosen off a three-way render at 0.10 / 0.13 /
  0.16 of the same trace. A tenth either way is taste, not a bug. **Retune it
  against `DIM_LINK_OPACITY`, never alone**: most of what made 0.16 look wrong was
  the *edges*, which are twenty times wider than they were, and the node number
  took the blame.
- **`LINK_OPACITY` 0.17 → 0.13, `DIM_LINK_OPACITY` 0.07 → 0.03**. Both were tuned
  against a line drawn 0.08 px wide.
- **`SELECTION_HALO_PIXELS = 76`** — sized against a 19 px largest node.
- **The bloom pair.** See the SwiftShader caveat above.

### Two findings worth carrying

**INT blooms on lit luminance, not on authority.** Its fill is near-white by
design, so it is bright before any emission is added and `glowInk` cannot govern
it. This is a known, deliberate exception in the same family as BRICS yellow — not
a tuning failure, and not fixable from `BLOOM_THRESHOLD_MIN`. If Thomas dislikes
it, the lever is INT's own ramp, not the threshold.

**Institutional steps converge.** "Chroma = level" means every family's
institutional colour is nearly the same grey. That is the design working, and it
costs family identity at that level — but it affects **42 of 1 250 reports
(3.4%)**, while **800 (64%) are federal** and sit at full chroma. Counted before
worrying.

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

## 7. The one cross-lane dependency — now a debt, not a warning

**The palette has been built against 1 250 nodes. It will need re-damping after
the import, and Thomas chose that with his eyes open.**

Previous handoffs said "do not finalise the palette until the import decision is
made". Thomas's call on 2026-08-19 was the opposite: build Lane B first, accept a
re-tune. So this section is no longer a thing to avoid — it is a thing to
remember.

`SCOPE_COLOUR`'s chroma is damped by each family's share of the corpus: AFR
32.2%, EU 15.7%, US 11.4%, CA 10.2%, SA 9.3%, INT 6.1%, rest under 5%. The staged
import is 1 999 nodes, heavily Latin America and Asia. It roughly doubles `SA`
and `ASIA` and materially moves `AFR`'s share.

**When the import lands: re-count the shares and re-damp.** It is a multiplier on
each family's chroma, not a redesign — the hue assignments and the flat-luminance
constraint are distribution-independent and stay. The counting method is in the
docstring above `SCOPE_COLOUR`.

Also settled, and no longer a live question: the review's "twelve flat families
don't work, use a seven-way roll-up" conclusion was measured at 6 px and is dead.
At the sizes Phase 0 delivers, twelve families read cleanly — confirmed in the
render, not just in the review's own retraction.

---

## 7A. A Lane A finding, from Lane B's side

Turned up while rendering, and it contradicts a claim the 2026-08-18 handoff made,
so it is recorded rather than left for someone to trip over.

That handoff said `scripts/validate-data.ts` has no domain rule, and that adding
one "would land green because the corpus is clean right now". **It would not.**
The live corpus has **86 reports (6.9%) carrying 62 distinct off-union domain
tags**, all `proposed:`-prefixed, all reaching the renderer and silently matching
no filter — `graph.ts` logs an error for every one of them at load, which is where
this was found.

They split cleanly in two:

- **62 uses across 13 tags are a pure prefix strip.** `proposed:trade`,
  `proposed:poverty`, `proposed:energy`, `proposed:investment`, `proposed:industry`,
  `proposed:public-finance`, `proposed:external-sector`, `proposed:tourism`,
  `proposed:governance`, `proposed:housing`, `proposed:mining`,
  `proposed:services`, `proposed:statistical-system` — **every one of these is
  already a real `Domain`.** The 2026-08-18 session added the 18 domains to
  `types.ts` and never rewrote the data tags that asked for them. Dropping the
  prefix is the whole fix.
- **90 uses across 49 tags are genuine intake queue**, and several are asking for
  the wrong axis: `proposed:provincial` / `regional` / `municipal` duplicate
  `jurisdiction_level`, and `proposed:caba` / `chaco` / `cordoba` / `santa-fe` /
  `formosa` are Argentine provinces, i.e. `region`.

Do the strip first, then the domain rule in `validate-data.ts` genuinely does land
green on 13 fewer tags. Lane B did not touch `src/data/` — this is Lane A's to do.

---

## 8. Known traps

- **`meshes.current` cannot be trusted for geometry.** It is populated from inside
  `nodeThreeObject`, and three-forcegraph is free to rebuild its node objects —
  when it does, the map can hold a mesh the library never adopted, still sitting
  at its construction position. **Measured 2026-08-19:** with ESA 2010 selected
  and plainly drawn near the left of the frame, the mesh this map returned for it
  reported a world position of exactly `(0, 0, 0)`, and the selection halo drew a
  ring around the middle of the graph. Read positions from the **node datum**
  (`positionedById`) — d3-force mutates `x`/`y`/`z` on those in place, so they
  cannot disagree with what is on screen. The map is still fine for *materials*,
  where a stale copy carries the same colours. **This is a live bug, not a fixed
  one** — the halo works around it; anything else reaching into that map for a
  position will hit it too, and `applyFocus` may be mutating stale materials.
- **The layout is scale-invariant.** Multiply every force's length by k and the
  cloud grows by k, the camera backs off by k, the node scale rises by k, and the
  render is pixel-identical. Nothing is gained. Crowding is governed only by
  collision radius **relative to** link rest length, so both must stay constants —
  do not tie either to `nodeScale` or to the cloud radius.
- **`runFit`'s camera refit on filter change is deliberate** — it fixes the
  reported black screen. Now conditional on `framedUsably()`; **do not make it
  unconditional in either direction.**
- **`methodology_depends_on` is the most common relationship type** (407), not the
  rarest. `LinkDatum` carries no `relationship_type`; trunks aggregate up to 57
  mixed edges.
- **Never reintroduce faceted node geometry while fresnel rims exist** — and rims
  now exist only on hollow nodes and in blueprint, so this is narrower than it
  was, not gone.
- **A rim is valid only where the interior is empty.** Not a style option. See
  `RIM_WEIGHT`.
- **Pulses cannot be resized by transform.** three-forcegraph reads `.geometry`
  off the particle object and builds its own mesh per photon; `particle.scale` is
  ignored. Resizing means rebuilding the geometry and re-assigning the accessor —
  `LINK_SCALE_APPLIERS` does this, and only when the scale actually moved, because
  re-assigning `linkWidth` re-digests every line.
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
