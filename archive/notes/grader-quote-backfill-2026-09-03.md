# Quote-backfill review + the `evidence_quote` blind spot — 2026-09-03 (round 4)

Plan §9 round 4, [Agent] item 1 of the previous handoff: Thomas ruled that an
agent reviews the backfilled quotes by slice. This is that review, and the
grader bug it uncovered.

---

## 1. The review — 213 decisions, 106 accepted

Every one of the 213 candidate rows in
`Claude outputs/quote-backfill-batch2-2026-09-03.json` was read: source title,
target title, relationship type, `basis`, and each proposed sentence. The test
applied was the one the grader refuses to fake — **does this sentence, in this
document, say that the source depends on the target?**

**Accepted 106, rejected 107.** Per-edge decisions with a reason on every
rejection: `Claude outputs/quote-backfill-review-2026-09-03.json`.

Accepted quotes were written into `evidence_quote` on their edges (102 writes;
4 accepted edges already carried a quote).

**Why the rejections, by class** — these are the useful half:

| class | n | what it looks like |
|---|---|---|
| candidate does not state the dependency | 61 | the document mentions the target, in a sentence about something else — the ten ESS peer-review rows are the cleanest example |
| target artefact not named, or a different one named | 16 | "Fuente: INEI - Encuesta Nacional de Hogares" offered for an edge whose target is the *poverty release*, not the survey |
| direction is wrong on the edge itself | 15 | §4 |
| PDF text layer scrambled | 9 | two-column PDFs interleaved mid-sentence; the substance is right, the text is unquotable |
| the right sentence exists but was never proposed | 4 | named explicitly; **42 more sit inside the 61 above** — their `basis` quotes the sentence in single quotes (§5) |
| watchlist language | 2 | "in a manner consistent with", "is compared with" |

Two standing rulings did real work: chart-caption source lines are legitimate
evidence (Thomas, 2026-08-30), so "Source: FCSC" under a GDP chart was accepted;
and "consistent with" is not evidence (audit, 2026-08-31), so the SEPH/NAICS
candidate resting on it was refused.

The ten `ess-peer-review-country-reports` rows are the cleanest single class:
every one was rejected, and every one's `basis` already carries the sentence
that would have earned it an A — see §5.

## 2. The grader could not read its own field

The first re-grade of the 106 accepted edges came back **A 0 · B 103 · C 3**,
with 94 of them `no-quoted-span`.

Cause: `gradeEdge` built its spans with
`extractQuotedSpans(input.evidenceQuote, input.basis)`, which pulls out text
**wrapped in double quotes**. That is right for a free-text `basis`. It is
wrong for `evidence_quote`, which *is* the span (`types.ts`: "the quoted span
from the cited document that the grade rests on"), and which `writeGrades`
fills with a bare matched span carrying no quotation marks. So:

- every quote accepted in this review was invisible to the grader, and
- **the grader could not read back its own output** — a re-grade of any edge
  whose quote it had written itself scored `no-quoted-span` unless the `basis`
  independently carried a quoted span.

Fix: `spansForEdge(evidenceQuote, basis)` takes the field whole (outer quote
marks stripped, still subject to the 24-character floor) and *also* keeps any
quoted spans inside it, for the older edges whose quote field quotes inline.
Adding a span can only raise coverage — the caller keeps the best hit — so the
change cannot downgrade an edge that was already matching on its `basis`.
`--selftest` 28 → 31.

## 3. What the fix found on its own: 104 edges, not 106

Re-run over **every live edge carrying an `evidence_quote` (439)**, not just
this round's:

| | |
|---|---|
| B → A | 87 |
| C → B | 17 |
| unchanged | 302 |
| regressed (**not written**) | 33 |

So ~19 of the upgrades are edges that have carried a perfectly good quote for
weeks and were being graded as though they had none.

**Corpus now: 320 A · 1,262 B · 1,154 C** (was 233 · 1,332 · 1,163).
A-share **8.5% → 11.7%**. `npm run validate` exits 0 with all 320 A grades in,
`tsc --noEmit` clean, 123/123 logic tests, grader `--selftest` 31/31.

**The 33 regressions were deliberately not written**
(`Claude outputs/grade-quotebackfill-regressions-2026-09-03.json`). PLAYBOOK's
rule holds: a host that is merely down today must not rewrite a grade earned on
a good day. They split three ways —
- 11 network/DNS/WAF failures today (dgbf.ci, statsfiji.gov.fj, nrb.org.np,
  lokaleregelgeving.overheid.nl, ec.europa.eu timeouts, file.lacounty.gov);
- 8 A → B snapshot caps, where round 3d read the host directly and today only
  an archived copy answered;
- 14 `quote-not-in-document`, of which 13 are Japanese or Korean text. Treat
  those as a **matcher limitation, not a bad quote**: `locateQuote` scores
  4-word shingles, and Japanese has no word spaces, so the whole quote collapses
  to one token and only an exact substring match can succeed. A CJK-aware
  matcher (character n-grams below a space-density threshold) is the fix; until
  it exists, a CJK quote can only ever be verified by exact match.

## 4. Direction: 17 edges whose `basis` says the opposite of the edge

Flagged, not fixed — this is a modelling call, and PLAYBOOK's standing rule is
that a direction conflict goes to a human with both readings side by side.
Full list with basis text:
`Claude outputs/direction-suspect-jp-kr-2026-09-03.json`.

`source_report_id` is the consumer; `target_report_id` is the input
(`types.ts`). But **13 edges point INTO `jp-national-accounts` from the very
surveys the JSNA compilation manual names as JSNA's own inputs** — "the JSNA
manual states benchmark revisions use the Population Census" is evidence for
`jp-national-accounts -> jp-population-census`, and the corpus has it the other
way. Two more (`jp-census-manufactures`, `jp-trade-statistics-detail` into
`jp-cgpi`) rest on the BOJ FAQ saying CGPI *weights derive from* those sources,
so CGPI is the consumer there too. Two Korean edges into
`kr-national-accounts-bok` have the same shape.

All 17 are in `*-grok-2026-08` slices, which is the audit's "Grok slices didn't
hold" finding showing up in a new place: the schema round already moved 5
reversed JP/KR edges to `_dropped`; this is the rest of that family, found by
reading the basis rather than by sampling. Nothing was changed.

## 5. Also worth a round

The harvester's `DEPENDENCY_PHRASES` list is what decides whether a sentence is
even proposed, and it missed the ESS peer-review family's own words
("demonstrates a high level of compliance with"), the MGDD-style "an
indispensable complement to", and the World Bank project shape ("supports the
continuation, expansion and strengthening of"). **42 of the 107 rejections are edges
whose `basis` already quotes the right sentence in single quotes** —
**single quotes are deliberately not a delimiter** in `extractQuotedSpans`
(apostrophes are ambiguous), which is exactly why those edges have no quoted
span and landed in the backfill list at all.

Measured corpus-wide: **539 live edges carry no `evidence_quote`, no
double-quoted span in `basis`, and a single-quoted span of 24+ characters.**
That is the next round and it is bigger than this one: propose each single-
quoted span as its edge's `evidence_quote`, review the list, write the accepted
ones. It needs no fetching to build — only the grader's own verification pass
afterwards, which is the honest check that the span is really in the document.
