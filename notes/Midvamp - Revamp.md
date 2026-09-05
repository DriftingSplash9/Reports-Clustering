# Midvamp — Revamp

**Plan of record, v2 — 2026-09-02/03.** v1 was written after the
independent technical audit (`Claude outputs/AUDIT-2026-09-02-independent-
technical-audit.md`); v2 folds in Thomas's answers to the 22-question
round (`Midvamp - Revamp - questions 2026-09-02.docx`, answered copy
returned the same night). `HANDOFF.md` carries current state and the live
todo; this file carries the *why* and the design, and changes only when
the design changes.

---

## 1. The problem this fixes

A random raw-fetch sample of 56 live, validation-passing edges graded only
50% as fully supported (quote found in the cited document, document names
the input artefact, direction stated). 25% were weak, 14% unsupported, 11%
unverifiable. Hand-researched EU/US branches held (11/13); Grok-derived
slices did not. Root cause: an edge has one bit of quality — live or
`_dropped` — while the evidence has a gradient. The schema cannot say
"this is a lead", so leads get minted as facts.

Thomas's ruling: **do not archive or delete anything. Grade everything.**
Removing 50% is riskier than promoting 50% back after verification, and
the scraps in `_dropped` are worth keeping. Nothing moves; fields are
added; the graph renders and ranks on what has been verified.

## 2. Definitions

### 2.1 Nodes — one new field: `kind` (Q5: ok)

A node is still a document that another document names as an input to
itself. Three kinds, cast not parsed, validator-enforced:

- **`publication`** — a recurring release. Must have `releases_per_year`.
- **`standard`** — SNA, COICOP, ISIC, BPM6, GFSM… Versioned; cadence is
  "when revised" (the existing evergreen convention); a versioned standard
  needs a `supersedes` relation to its predecessor when both exist.
- **`instrument`** — Act, regulation, treaty, decree. One-off, amended not
  republished. Must **not** have `releases_per_year`; drawn hollow (as
  today). Lives in the graph only while something recurring names it as a
  basis (the existing rule — Q1: "I like your recommendation"). The
  treaties retired 2026-08-29 are not re-imported by hand; one comes back
  only when an A-grade edge names it.

**Editions (Q6: ok).** An edition of a publication is never its own node —
it is the series node, the edition named in the edge's basis. A *version*
of a standard is its own node with `supersedes`. Fold the five BRICS JSP
nodes (`brics-jsp`, `-2024`, `-snapshot`, `-snapshot-2025`,
`in-brics-jsp-india`) and the per-year auditor-general reports (BW, LS,
MU) accordingly.

### 2.2 Edges — two new fields: `evidence_grade`, `legal_basis` type

Direction semantics unchanged (`source_report_id` = the consumer,
`target_report_id` = the input; authority accrues at target). Field
rename deferred; a bidirectional-pair validator error replaces it.

**`evidence_grade?: 'A' | 'B' | 'C'` — absent means C.**

- **A** — raw-fetched (never WebFetch), the quote is found in the body of
  the cited `evidence_url`, the document names the input *artefact* (not
  just the agency), and states the direction claimed. `evidence_quote`
  required. **Authoritative third-party metadata the publisher itself
  supplies counts as A** (Q7: ok) — IMF DSBB, Eurostat ESMS, SDMX
  metadata; the grader recognises these by host.
- **B** — resolves and supports the relationship loosely: names the
  agency not the release, "consistent with"/"complementary" language, a
  paraphrase inside quotation marks, the quote from a document other than
  `evidence_url`, or a genuinely secondary source (World Bank project
  document, news, summit declaration).
- **C** — a lead. Unverified, unreachable, index-page, or nothing.
  **Every existing edge is C until graded.** Every `_dropped` entry with a
  lead-type reason is, conceptually, C.

The three existing evidence warnings (no URL / bare homepage / index page)
stay warnings for B and C and become **errors for A**.

**Fifth relationship type: `legal_basis`** (Q1–Q4). "This figure is
calculated under Regulation X, made under Act Y" is a chain the project is
for. Rules:
- An edge from a publication (or standard) to the instrument it names as
  its legal/methodological basis is `legal_basis`, not
  `methodology_depends_on`.
- Instrument→instrument `legal_basis` edges (regulation → enabling Act)
  are allowed **only when both instruments are already in the graph for
  another reason** — never mint an Act because a regulation cites it
  (Q2: agree).
- Drawn like a data edge with **no teardrops** (nothing flows along a legal
  basis at a cadence) and a slightly different hue; instruments are
  already hollow, so the eye can tell (Q3: yes).
- **Counts toward node size and ranking** (Q4: yes — Thomas's call,
  against the recommendation). Consequence accepted: statistics acts will
  become large hollow spheres in every country. A view toggle "rank by
  legal basis" (default on) lets the data-only picture be seen.

## 3. What the graph shows

**Three edge intensities from grade** — A as today; B ~0.35 opacity with
pulses; C **hidden by default**, drawn at ~0.08 opacity with no pulses
when `view.minGrade` is set to C (Q8: ok). Node size and the authority
ranking are computed from **A edges only**; `view.minGrade` (default C
until the first grading batch lands, then A) widens to B or C. A node
whose best edge is below the toggle is on the Unlinked shelf (Q10: ok).
The node card always shows the per-grade edge counts ("A 3 · B 1 · C 7").

**Self-citation discount** (Q9: yes): an edge whose consumer is published
by the input's own publisher or founding body does not accrue rank.
`graph.ts` pagerank, ~20 lines. Removes `brics-ndb-agreement-2014` from
the top 10.

## 4. The grading pass

`scripts/grade-evidence.ts` — the audit's method, productionised:

1. For each edge (live, then lead-type `_dropped`), curl the
   `evidence_url` with a browser UA, follow redirects, record real status,
   final URL, content-type, size. Detect WAF/JS shells by body, not code.
2. Extract text (`pdftotext -layout` for PDF, tag-strip for HTML,
   `word/document.xml` for docx). **Cache the extracted text**, committed
   to git (Q11: ok): `evidence-cache/<sha256-of-url>.txt.gz` with a header
   (url, fetched-at, status, final-url), capped at 250 KB per document
   (hash + first 250 KB beyond that). This is the link-rot fix and the
   permanent evidence record.
3. Locate the quoted span(s) from `basis`/`evidence_quote` in the body.
   Grade per §2.2. Write `evidence_grade`, `evidence_quote`,
   `_graded: {date, method, status}` back into the slice JSON via a
   generator — never by hand.
4. Unreachable from the sandbox (WAF, egress) → leave C, emit the list.
   **Browser pass** (Q12: yes): Thomas present, Claude in Chrome reads
   the pages in batches of ~60–100, one host family per session (imf.org,
   legislation.govt.nz, canada.ca, boi.org.il, `.gov.in`, `.gov.br`,
   s-circabc — ~500 edges, ~5 sessions); text goes into the same cache and
   is graded the same way.
5. `_dropped` re-evaluation: only reasons `no-document`, `deferred`,
   `no-node-yet`, `unreadable-source`, and `note` entries the validator
   already counts as research leads. `denied`, `wrong-direction`,
   `wrong-target`, `unpublishable-source` are settled negatives — not
   re-read. A lead that grades A is minted live (its `_dropped` entry
   becomes `resolved`); B stays a lead with the finding in `why`.

Throughput: ~56 edges per ~10-minute agent run → the 2,748 live edges are
roughly a day of agent time, batched by slice so validate runs between
batches. Order: slices behind the top-10 authority nodes first (`sna-2008`
has 40/100 in-edges with no URL), then Grok-derived slices, then the
hand-researched branches (they mostly pass). The grader must reproduce
the audit's 56-edge grades before it touches the corpus.

**Two order changes, measured 2026-09-03 after the corpus-wide run (round 3c).**

- **Step 4's browser pass is partly avoidable and should be re-sequenced.**
  Three of the four hosts holding the most unreadable edges already have a
  documented workaround in PLAYBOOK §6 — `bps.go.id` → `web-api.bps.go.id`
  (41 edges), `ibge.gov.br` → `ftp./biblioteca./concla.` (32),
  `imf.org` → the Google-viewer route (33). Wiring those into the grader as
  per-host fetch strategies moves ~106 of the 422 unreadable edges with no
  browser session at all. Do that build round BEFORE booking browser time;
  what survives it is the real browser list.

  **Done 2026-09-03 (round 3d), and the ~106 estimate was right by accident.**
  All three documented workarounds turned out NOT to be scriptable — each was
  written for a human with a browser (BPS's signed link is read out of the
  challenged page's DOM, IBGE's ftp mirror carries documents while the corpus
  cites landing pages, the imf.org route drives the Google viewer). What worked
  instead was a **generic archived-snapshot strategy on the cited URL**, plus
  running the fetch on the bridge VM rather than through the cloud sandbox's
  egress proxy. **422 → 232 unreadable; 187 documents read, 114 of them only
  via a snapshot.** Full record: `archive/notes/grader-host-strategies-2026-09-03.md`.

- **A fetch strategy is a design decision about evidence, not plumbing, and it
  has one standing rule** (round 3d): a strategy may change where the bytes come
  from, never which document the edge is graded against. A snapshot may rescue a
  wall, a transport failure or a JavaScript shell; it may **never** rescue a
  404, because that is link rot the dead-URL list exists to measure. Every
  substitution is recorded as `via:` in the committed evidence record.
  **Ruled the same day (Thomas): a document read by a second route caps at B.**
  "The quote was in this document on 2026-03-10" is a weaker claim than "the
  quote is in this document", and one A must not mean two things. 15 edges
  capped; the guard sits after the A bar so the bar itself is untouched. This
  binds every future fetch strategy, not just the archived-snapshot one —
  full record in PLAYBOOK §7.
- **Round 4 (2026-09-03) ran the backfill review and moved the A-share to
  11.7% (320 A).** 213 candidates read, 106 accepted, 107 refused with reasons.
  The lever turned out to be a grader bug rather than the review: `evidence_quote`
  was being run through `extractQuotedSpans`, so the grader could not read its
  own field — fixing that alone upgraded 104 edges, 19 of them quotes the corpus
  had carried for weeks. **539 more edges quote their evidence in SINGLE quotes,
  which the span extractor deliberately ignores; that is the next backfill and it
  needs no fetching.** Also flagged for a ruling: 17 JP/KR edges whose `basis`
  says the target is the consumer. Full record:
  `archive/notes/grader-quote-backfill-2026-09-03.md`.
- **Round 5 (2026-09-03) ran the single-quote backfill and moved the A-share
  to 15.8% (431 A).** The 539 was really 476 once apostrophe pairs were
  excluded; 476 read, 370 accepted, 106 refused with reasons; re-grade B→A 111,
  C→B 38, 30 regressions not written and their quotes reverted (the quote was
  real but from a companion document, not the cited one). No script changed.
  Full record: `archive/notes/grader-single-quote-backfill-2026-09-03.md`.
- **Round A (2026-09-03) closed the no-URL class and moved the A-share to
  17.3% (470 A).** The 162 edges with no `evidence_url` were re-researched to
  their documents from the bridge VM: 150 cited (149 quoted), 12 to `_dropped`
  `no-document`; re-grade C→A 39, C→B 96. No script changed. Two things the
  round measured that belong in this plan: the grader matches quotes against the
  **capped** 250 KB text, so a long document's later sentence reads as absent
  (a matching-only cap raise, or a `truncated` check in the revert rule, is a
  small build item), and the DSBB `getBaseSummaryofMethodologies` API now
  carries ~50 corpus citations — the scripted import in §9 item 6 has a proven
  readable source. Full record: `archive/notes/roundA-nourl-reresearch-2026-09-03.md`.
- **The `minGrade` → A flip (§9 item 4) cannot be the default until the
  backfill and the browser pass have run.** The dry run's 18% A-share was a
  sampling artefact of the audit's 56: corpus-wide it is **8.3%** (226 A of
  2,728). Flipping the default now shows a graph of 226 edges. The
  destination is unchanged; the ordering is not optional. **Round 3d moved it
  to 9.1% (248 A of 2,728)** — the direction is right and the magnitude says
  the flip still waits on the backfill. **The snapshot cap takes it back to
  8.5% (233 A)** — deliberately, and it does not change the ordering: the
  backfill is the lever either way.

**Grading is not research.** The grader reads what the edge already
cites. Finding a better document for a B edge is a research round.

## 5. Data sources going forward

Grok is retired (Thomas, 2026-09-05) — no new leads from it. Machine-readable
metadata is for citations: the IMF DSBB JSON endpoint
(`dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=&categoryCode=`),
Eurostat ESMS pages, SDMX metadata "source" fields. A scripted pass over
those should yield hundreds of grade-A standards edges with no
hallucination risk. Every new import round runs the grader on its own
output before merge; a slice merges only with its A-share reported.

## 6. View changes (decided 2026-09-02, "round 0")

- **Focus panel removed** — Built from / Feeds into / Isolate all go.
  Click-to-trace stays (both directions, dim the rest). The Groups panel's
  isolate is a separate mechanism and stays. Search's "outside isolate"
  tag goes. Saved views / deep links carrying the old fields: ignored
  silently, fields optional in the type for one release, then removed
  (Q15: ok).
- **Neighbourhood hops** ceiling 5 → 8, default stays 5 (Q14: ok).
- **Cluster spread** 50%–1200%, default 100% (Q13: ok). The
  `nodeScaleFor` cap is re-derived at 1200% before shipping — the rule
  in `ViewControls.tsx` ("never move this ceiling without re-deriving
  that cap") binds.
- **International edges in a busy country isolate** (Q16: "b first"):
  **per-galaxy camera fit** — in a country isolate, fit the camera to that
  country's cluster and let INT nodes sit at the edge or off-screen. If
  standards still fly after that, restore a weak INT spring
  (`INT_LINK_STIFFNESS` 0 → 0.15). Never fake their position.
- **Cluster repulsion is a force problem** (Q17: Thomas, against the
  recommendation) — he wants clusters *actually* further apart, not just
  framed better. The 2026-08-31 measurement says raw separation doubles
  across the slider while on-screen moves 2–15%: the fit renormalises,
  *and* intra-cluster spacing grows with the same charge. The lever is
  the ratio inter-cluster distance ÷ cluster radius, so the work is: (a)
  scale `FAMILY_REPULSION`/`COUNTRY_REPULSION` by spread (HANDOFF names
  this as the unscaled term); (b) couple galaxy pull to repulsion so
  clusters compact as they separate; (c) measure with
  `scripts/measure-forces.ts` (2+ seeds, read `onscreen`) before and
  after — PLAYBOOK rule 8. Ceiling stays 15 until the measurement says
  otherwise.

## 7. Renderer bugs in the same round 0

1. `nearestLinkAt` (`InfluenceGraph.tsx` ~3388) is dead code — d3
   replaces `link.source` with the node object. Key on
   `typeof l.source === 'string' ? l.source : l.source.id`.
2. Superseded `ThreeForceGraph` instances never disposed — GPU leak per
   rebuild. Dispose the previous instance's geometries/materials when the
   memo rebuilds.
3. `runFit` re-assigns `fg.linkWidth` on >1% drift and three-forcegraph
   recreates every link mesh (up to 5×/s during settle). Move width to a
   uniform or widen the guard.

Then the batching job (merged link geometry, then instanced photons)
before any round that grows the unfolded tier.

## 8. Later, once grades exist

Cite-the-sentence in the edge card (cached text, quote highlighted);
continuous verification (`grade-evidence --recheck` on a schedule,
demoting to C when the quote is gone, surfaced in-app); a coverage map
(nodes / A-edges / A-share per country); blast-radius mode; a time
slider over `supersedes`.

## 9. Order of work (Q21: "Do round 0 first")

0. **Round 0 — view changes + renderer bugs.** §6 and §7 in one round:
   focus removal, hops 8, spread 50–1200 (+ cap re-derivation),
   per-galaxy fit, the three bugs. Cluster-repulsion force work (§6 last
   bullet) is its own measured sub-round, not bundled. Validate before and
   after; headless verify; Thomas looks.
1. **Schema + validator.** `kind` on Report; `evidence_grade`,
   `evidence_quote` (required for A), `legal_basis` type, `mutual` flag;
   the three warnings → errors for A; bidirectional-pair error; kind
   cadence rules; self-citation flag. Move the 5 reversed JP/KR edges to
   `_dropped` `wrong-direction` and the 2 BR "complementary" edges to
   `deferred`. Merge `et-cpi` → `et-ess-cpi`; fold the JSP family and
   per-year AG reports. Widen `isIndexPage()` with the per-host list from
   the audit. Retype existing methodology→instrument edges as
   `legal_basis` where the target's `kind` is `instrument` (generator,
   not by hand). Validate: count drops by 7; every edge reads C.
2. **Renderer grade pass.** Intensities, hidden-C, A-only ranking,
   `view.minGrade` (default C), self-citation discount, legal-basis
   styling + "rank by legal basis" toggle, per-grade counts on the card.
3. **Grader.** `scripts/grade-evidence.ts` + `evidence-cache/`; dry-run
   on the audit's 56; batch 1 = slices feeding `sna-2008`, `esa-2010`,
   `imf-e-gdds`, `imf-sdds`; emit the browser-pass list.
4. Flip `view.minGrade` default to A. Browser pass, one host family per
   session.
5. `_dropped` lead re-evaluation by slice; DSBB/ESMS scripted import.
6. Link batching (merged geometry, instanced photons).

## 10. Open from the question round

- **Q18 (Grok folder) — blank.** Standing recommendation: delete locally +
  commit if git tracks it (GitHub Desktop will show ~295 deletions);
  otherwise move to `archive/`. Windows ownership fix is in the chat of
  2026-09-02. Either way write `notes/mint-2026-08-20.md` first (37
  slices point at it).
- **Q19 — "I'm using Cowork."** Then the 08-30/31 memory entries HANDOFF
  cites were written to a *different* project memory — Cowork keys memory
  by the folder that was connected, so those sessions were most likely
  opened on a different folder path (the parent `My Files`, or a copy).
  Until found, the two earlier audit reports exist only in chat; pasting
  them into `archive/audits/` closes this.
- **Q20 — handoff committed 2026-09-02.** `InfluenceGraph.tsx` status
  still unconfirmed; round 0 touches it, so it gets committed then.
- **Q22 — blank.**
