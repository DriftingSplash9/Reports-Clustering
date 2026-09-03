# Single-quote backfill — 2026-09-03 (round 5)

Plan §9 round 5, [Agent] item 1 of the previous handoff: propose every
single-quoted span in a `basis` as its edge's `evidence_quote`, review by slice
the way round 4 did, write the accepted ones, re-grade (improvements only).
No fetching was needed to build the list; the grader's verification pass
afterwards is the honest check.

---

## 1. The list — 476, not 539

The 539 in the previous handoff was measured with a bare `'…'` regex, and 95 of
those "spans" are the text between two apostrophes ("FCSC**'s** … the Fund**'s**").
A boundary-aware pattern (opening quote after start/space/bracket, closing quote
before end/space/punctuation, apostrophes allowed *inside* the span when followed
by a letter) finds **476 live edges** with no `evidence_quote`, no double-quoted
span ≥24 chars in `basis`, and a single-quoted span ≥24 chars. Same shape as the
harvester's own 24-char floor. Rule and rows:
`Claude outputs/quote-backfill-sq-review-2026-09-03.json`.

Where they sit: `ess-peer-review-country-reports` 57,
`edp-inventory-regulation-479-2009` 53, `crossborder-standards-2026-08-22` 43,
`provincial-social-programs` 19, then a long tail across 85 slice files —
overwhelmingly the hand-researched EU/CA/AF slices, i.e. the researchers who
quoted carefully but with the wrong quote mark.

## 2. The review — 476 read, 370 accepted, 106 refused

Same test as round 4: **does this sentence, in this document, say the source
depends on the target?** Where an edge carried several single-quoted spans the
one that names the target artefact and states the use was chosen; a bare title,
a fund name or a table data row was not.

| refusal class | n | example |
|---|---|---|
| aggregate statement, target not named | 28 | every `ess-peer-review-final-report → xx-ess-peer-review-report` edge quotes "summarises the results of the peer reviews in all members of the ESS" — true, but it names no country report |
| truncated title fragment | 12 | `Inventory... according to ESA 2010` on the EDP inventories whose title line was never recaptured — two fragments, one of them a single word, would match anything |
| table row / data row / label / title / fragment only | 32 | `Korea \| 20-Sep-1996 \| …`, `Metropolitana 20,0 17,4 …`, a codelist name, a law's title, "such amount as may be prescribed" |
| target artefact not named in the span | 29 | "inflation outlook" for a CPI edge; "requisitions for education" for the Requisition Comparison report |
| no dependency statement / wrong document / wrong reading | 3 | the span is the *target's* text, not the source citing it; "a NOC revision reaches the LFS" is not "the LFS uses the NOC" |
| watchlist language | 1 | "in a manner consistent with" (NAICS / Business Register), refused on the audit's rule |
| basis says the opposite | 1 | ec-salud-publica → ec-endi: the basis itself argues ENDI does not use MSP data |

Two standing rulings did work again: chart-caption / "Fuente:" / "Source:" lines
were accepted as citations (Thomas 2026-08-30); "consistent with" was not
(audit 2026-08-31). The whole `xx-ess-peer-review-report → eu-statistics-code-of-practice`
family (33 edges) was accepted on its executive-summary sentence — the family
round 4 identified as owed an A by its own words.

## 3. Grading — 149 up, 30 down (not written), 191 unchanged

370 accepted quotes written into `evidence_quote`, then the grader run over
exactly those edges (`--edges …#…`, bridge VM, 8-wide, ~5 min in two calls):

| | |
|---|---|
| B → A | **111** |
| C → B | **38** |
| unchanged | 191 (129 B, 62 C — 43 of the C's are dead 404 URLs) |
| B → C, **not written** | 30 |

**Corpus: 431 A · 1,189 B · 1,116 C. A-share 11.7% → 15.8%.** `npm run
validate` exits 0 with all 431 A grades in, `tsc --noEmit` clean, 123/123
logic, grader `--selftest` 31/31. No script was changed this round.

The unchanged B's split 48 `agency-not-artefact`, 47 `partial-quote`, 21
`artefact-named-elsewhere-in-document`, 10 snapshot caps — i.e. the quote was
found but the naming rule or the second-route cap held, which is the grader
doing its job.

## 4. The 30 regressions, and what was done about them

All 30 are `B → C quote-not-in-document`; 29 of them on a document the grader
**read successfully today** (HTTP 200, full text), one (`aseanstats.org`) a
403. Per PLAYBOOK §7 none of the grades were written. But a quote the reader
accepted and the grader then cannot find in the cited document is not a
network accident — it is a quote that is **not in the cited document**, so on
those 29 the `evidence_quote` written this round was **reverted** and the edge
left exactly as it was before. List with host, coverage and action:
`Claude outputs/grade-sq-regressions-2026-09-03.json`.

Why they missed, from reading the list: the single-quoted sentence was lifted
from a *different* document than `evidence_url` (the Destatis GNI inventory
quoted against a Destatis landing page; a Tanzania DQA sentence against the
EAC regulation; Constitution s.224 against the SARB page); DSBB table rows
written with `|` separators; Alberta and Ontario PDFs whose text layer breaks
mid-sentence; and a few coverage-0.4–0.5 near-misses on short quotes with an
en-dash or ellipsis. The first class is the one worth a rule: **a `basis` that
quotes document X while `evidence_url` points at document Y produces a quote
the grader can never confirm** — the researcher's citation and the researcher's
quote have to be the same document.

## 5. What is left in this vein

- 43 of the accepted-and-still-C edges cite a URL that is 404 (ruling 7's list,
  unchanged by this round).
- The 28 `ess-peer-review-final-report → country report` edges and the 12
  EDP-inventory title fragments would need the actual document reread, not a
  better regex — SWD(2024)136 does name each member state's report, but the
  sentence that does so was never quoted.
- The double-quoted and single-quoted spans are now both harvested (by the
  grader and by this round's review respectively); what remains with no span at
  all is the Grok `*-wiring-grok-2026-08` family and the 162 no-URL edges —
  [Agent] item 2.
