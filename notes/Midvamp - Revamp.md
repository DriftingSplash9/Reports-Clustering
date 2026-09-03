# Midvamp — Revamp

**Decided 2026-09-02 (Thomas, after the independent technical audit —
`Claude outputs/AUDIT-2026-09-02-independent-technical-audit.md`).**
This is the plan of record for the evidence-grade revamp. `HANDOFF.md`
carries current state and the live todo; this file carries the *why* and
the design, and changes only when the design changes.

---

## 1. The problem this fixes

A random raw-fetch sample of 56 live, validation-passing edges graded only
50% as fully supported (quote found in the cited document, document names
the input artefact, direction stated). 25% were weak, 14% unsupported, 11%
unverifiable. Hand-researched EU/US branches held (11/13); Grok-derived
slices did not. Root cause: an edge has one bit of quality — live or
`_dropped` — while the evidence has a gradient. A verbatim sentence in the
consumer's own methodology naming the input by title, a third-party IMF
metadata page saying a country "follows SNA 2008", and "the yearbook has a
national accounts chapter" all draw identically and count identically. The
schema cannot say "this is a lead", so leads get minted as facts.

Thomas's ruling: **do not archive or delete anything. Grade everything.**
Removing 50% is riskier than promoting 50% back after verification, and
the scraps in `_dropped` are worth keeping. Nothing moves; a field is
added; the graph renders and ranks on what has been verified.

## 2. Definitions (unchanged) and the one schema change

**Node** — unchanged: a recurrently published document that another
document names as an input to itself. Every drift swept so far
(institutions, geographies, treaties, editions, derivation notes) was a
violation of this definition, not a flaw in it. Nodes carry no grade.

**Edge** — unchanged direction semantics (`source_report_id` = the
consumer, the report doing the referencing; `target_report_id` = the
input, where authority accrues). One new optional field:

```
evidence_grade?: 'A' | 'B' | 'C'      // absent means C
```

- **A** — raw-fetched (never WebFetch), the quote is found in the body of
  the cited `evidence_url`, the document names the input *artefact* (not
  just the agency), and states the direction claimed. `evidence_quote`
  populated with the exact sentence(s).
- **B** — resolves and supports the relationship loosely: names the
  agency not the release, "consistent with"/"complementary" language, a
  paraphrase inside quotation marks, or the quote comes from a document
  other than `evidence_url`. Real, but not yet citation-grade.
- **C** — a lead. Unverified, unreachable, index-page, or nothing.
  **Every existing edge is C until graded.** Every `_dropped` entry with
  a lead-type reason is also, conceptually, C.

`evidence_quote` becomes required for A. The three existing evidence
warnings (no URL / bare homepage / index page) stay as warnings; the
promotion gate is replaced by the grade: an A edge with any of those three
conditions is a validator **error**.

Direction: the five reversed JP/KR edges and two BR "complementary" edges
found by the audit are handled by a new validator error — any (A,B) with
(B,A) also live is an error unless both carry `mutual: true` and a basis
naming the other. Renaming the fields to `consumer_id`/`input_id` was
considered and deferred: 347 slice files plus the seed files plus every
script — the validator check buys most of the safety for none of the
churn.

## 3. What the graph shows

Three edge intensities from grade: **A near-solid, B faint, C near-
invisible** (present enough to see the lead exists, not enough to read as
a fact). Node size and the authority ranking are computed from **A edges
only**; a view toggle (`view.minGrade`, default A once the first grading
batch lands, C until then) widens to B or C. Isolate/trace follow the same
toggle. The Unlinked shelf is unchanged — a node with no A edge at the
default setting appears in the scene only if it has a B/C edge and the
toggle shows those; otherwise it is on the shelf like today.

Self-citation discount in the ranking (`graph.ts` pagerank): an edge whose
consumer is published by the input's own publisher or founding body does
not accrue rank. This is what stops `brics-ndb-agreement-2014` sitting at
#3 on the strength of the NDB's own documents.

## 4. The grading pass

`scripts/grade-evidence.ts` — the audit's method, productionised:

1. For each edge (live, then lead-type `_dropped`), curl the
   `evidence_url` with a browser UA, follow redirects, record real status,
   final URL, content-type, size. Detect WAF/JS shells by body, not code.
2. Extract text (`pdftotext -layout` for PDF, tag-strip for HTML,
   `word/document.xml` for docx). **Cache the extracted text** under
   `evidence-cache/<sha256-of-url>.txt` with a header (url, fetched-at,
   status, final-url). This is the link-rot fix: re-verification becomes a
   diff, and a WAF-blocked host only has to be read once (in a browser).
3. Locate the quoted span(s) from `basis`/`evidence_quote` in the body
   (normalised, longest matching word-run). Grade per §2. Write
   `evidence_grade`, `evidence_quote`, `_graded: {date, method, status}`
   back into the slice JSON via a generator — never by hand.
4. Unreachable from the sandbox (WAF, egress) → leave C, list for the
   browser pass. Thomas's Chrome (Claude in Chrome) reads those in
   batches; the page text is saved to the same cache and graded the same
   way.
5. `_dropped` re-evaluation: only reasons `no-document`, `deferred`,
   `no-node-yet`, `unreadable-source`, and `note` entries the validator
   already counts as research leads. `denied`, `wrong-direction`,
   `wrong-target`, `unpublishable-source` are settled negatives — not
   re-read. A lead that grades A is minted as a live edge (its `_dropped`
   entry becomes `resolved`); B stays a lead with the finding recorded in
   `why`.

Throughput measured in the audit: ~56 edges per agent-run of ~10 minutes,
so the 2,748 live edges are roughly a day of agent time, batched by slice
so validate runs between batches. Order: the slices behind the top-10
authority nodes first (`sna-2008` has 40/100 in-edges with no URL), then
the Grok-derived slices, then the hand-researched branches last (they
mostly pass).

**Grading is not research.** The grader reads what the edge already cites.
Finding a *better* document for a B edge is a research round, done
separately and by slice.

## 5. Data sources going forward

Grok is for leads, not citations. Machine-readable metadata is for
citations: the IMF DSBB JSON endpoint
(`dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=&categoryCode=`)
returns a methodology narrative for every SDDS/e-GDDS country and
category; Eurostat ESMS pages are structured; SDMX metadata carries
"source" fields. One scripted pass over those should yield hundreds of
grade-A standards edges with no hallucination risk. Every new import round
runs the grader on its own output before merge; a slice merges only when
its A-share is reported alongside its count.

## 6. Renderer work in the same programme

Three bugs from the audit, fixed before or alongside the intensity work
(each its own validate-before/after round):

1. `nearestLinkAt` (`InfluenceGraph.tsx` ~3388) is dead code — d3 replaces
   `link.source` with the node object, so `positionedById.get()` always
   misses. Key on `typeof l.source === 'string' ? l.source : l.source.id`.
2. Superseded `ThreeForceGraph` instances are never disposed — GPU leak on
   every tier/filter/spread rebuild. Dispose geometries/materials of the
   previous instance when the memo rebuilds.
3. `runFit` re-assigns `fg.linkWidth` on >1% scale drift and three-
   forcegraph recreates every link mesh — up to 5×/s during settle. Move
   width to a uniform or widen the guard.

Then the batching job HANDOFF already names (merged link geometry, then
instanced photons) before any round that grows the unfolded tier —
today's Everything tier is ~8,200 draw calls; 2× the corpus is ~16k.

## 7. Later, once grades exist

- **Cite the sentence** in the edge card: show the cached sentence in
  context with the quote highlighted. The feature that makes a stranger
  believe the graph.
- **Continuous verification**: a scheduled `grade-evidence --recheck`
  that re-fetches cached URLs, re-greps the quote, and demotes to C when
  it is gone; surfaced in-app as "N edges lost their evidence".
- **Coverage map**: nodes / A-edges / A-share per country as a map or
  treemap, so the Canada-vs-Germany research-order bias is visible and
  doubles as the research queue.
- **Blast radius**: click a node → ranked downstream closure weighted by
  cadence and grade.
- **Time**: a slider that re-wires chains as `supersedes` edges take
  effect (SNA 2025 replacing 2008).

## 8. Order of work (each step = one round, validate before and after)

1. Schema + validator: `evidence_grade`, `evidence_quote` required for A,
   the three warnings → errors for A, bidirectional-pair error, `mutual`
   flag. Fix the 7 direction/complementary edges found by the audit.
2. Renderer: three intensities, A-only ranking, `view.minGrade` toggle
   (default C for now), self-citation discount. Verify headless, then
   Thomas looks.
3. `scripts/grade-evidence.ts` + `evidence-cache/`, dry-run on the audit's
   56-edge sample (it must reproduce the audit's grades), then batch 1:
   the slices feeding `sna-2008`, `esa-2010`, `imf-e-gdds`, `imf-sdds`.
4. Flip `view.minGrade` default to A. Start the browser pass on the
   WAF/egress list.
5. Renderer bugs 1–3 (§6). Can run in parallel with 3–4.
6. `_dropped` lead re-evaluation, by slice.
7. DSBB/ESMS scripted import (§5).
