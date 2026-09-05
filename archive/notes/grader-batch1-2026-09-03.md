# Grader batch 1 + cache rework + quote backfill — 2026-09-03 (round 3b)

Follows `grader-dry-run-2026-09-03.md`, which is still the description of how
the grader decides. This note is what changed after Thomas's three rulings and
what the first real batch produced.

---

## 1. Cache: matched window + hash (ruling 1)

The dry run projected ~24 MB of committed cache. Thomas chose "store only the
matched window + a hash". There are now **two stores**:

- **`evidence-cache/<sha256(url)>.txt.gz` — committed.** Header (url, fetched-at,
  status, final URL, content-type, extractor, block, full-text length and
  sha256) plus, for each edge that cited this URL, the **verbatim passage the
  quote was found in, with a sentence either side**, labelled with that edge's
  grade and reason. Windows are quoted from the original text, not from the
  folded matching form — sentences are kept both ways for exactly this reason.
- **`.evidence-fulltext/<sha256(url)>.txt.gz` — local scratch, gitignored.** The
  whole extracted text (250 KB cap), so re-grading is instant and nobody's
  server gets hit twice. Disposable.

**Measured: 299 documents = 131 KB, projecting ~0.73 MB at ~1,700 URLs** —
about 3% of the original projection. Grades are unchanged by the rework (the
sample still scores 35/56 with 1 looser).

The cost, stated plainly: the committed record can no longer answer a question
nobody asked at grading time. Re-grading an edge against a *different* quote
needs the page again, and a URL whose every edge graded C keeps only its
header. That is the trade.

## 2. Batch 1 — the four standards (304 edges, 253 documents)

Every live edge whose target is `sna-2008`, `esa-2010`, `imf-e-gdds` or
`imf-sdds`. Grades **written to the corpus**; `npm run validate` exits 0 with
them in place (42 A grades, and an A turns the three evidence warnings into
errors, so this is a real check, not a formality).

| | n |
|---|---|
| **A** | 42 (14%) |
| **B** | 115 (38%) |
| **C** | 147 (48%) |

Corpus-wide the ledger now reads **42 A · 115 B · 2,579 C**.

Why the C's, in order: 60 no quoted span · **40 cite no URL at all** · 30 cite
a URL that is genuinely 404 · 19 quote not in the document · 44 unreadable from
here (WAF/network) · the rest index-page and naming failures.

**Two of those are research debt this batch has now measured precisely, not
grader problems:**

- **40 edges into these four nodes cite no URL.** The audit said SNA 2008 had
  40 of its 100 in-edges in that state; that is confirmed and it is now visible
  as a grade rather than a warning count.
- **30 edges cite a dead URL** (404/500/504). This is the material for audit
  ruling 7 — the list is in `Claude outputs/grade-batch1-2026-09-03.json`.

**Browser-pass list for these four nodes — 44 edges, dominated by one host:**
`imf.org` 21 (Akamai deny; PLAYBOOK §6 has the Google-viewer workaround),
`psa.gov.ph` 5, `ibge.gov.br` 3, `nso.gov.mt` 2, then thirteen hosts with one
edge each. One imf.org session would move 21 of the 44.

## 3. Quote backfill (ruling 2, "get the quotes")

New mode: `--find-quotes`. For every selected edge whose `basis` carries no
quoted span, it reads the document the edge **already cites** and proposes the
sentences that could serve as its `evidence_quote`. A candidate must name the
target artefact (the grader's own `namesTarget` test) — or, for a standard, the
designator from its title ("ESA 2010", "the 2008 SNA") — **and** carry a
dependency phrase, in one of eight languages the corpus actually uses.

On batch 1's 123 no-quoted-span edges: **25 have at least one candidate, 46 are
readable with nothing qualifying, 52 are unreadable.** Proposals are in
`Claude outputs/quote-backfill-2026-09-03.json`.

**It writes nothing to the corpus, and that is deliberate.** If the grader both
picks the quote and then grades the edge on finding that quote, an A means only
"this script found a sentence it liked, twice". The gate has to be a reader
accepting the sentence as what the edge actually rests on. Once accepted into
`evidence_quote`, the next grading run picks it up like any other quote and the
edge can reach A honestly.

**So the decision Thomas owes is not whether to harvest — it is who accepts.**
Three options, in the order I'd rank them:

1. **An agent reviews by slice.** Reading one sentence and judging whether it
   supports the claimed direction is exactly the judgement the grader refuses
   to fake, and it is cheap per edge. ~25 candidates per 300 edges means the
   whole corpus is a few hundred decisions, not thousands.
2. **Thomas reviews the standards only.** The four nodes in batch 1 are the
   graph's largest spheres; their in-edges are worth a human eye and nothing
   else is.
3. **Accept the top candidate automatically**, marked with a provenance field
   so an A resting on a machine-found quote is distinguishable. This needs a
   schema touch (`evidence_quote_source`) and I would not do it without one —
   an unmarked machine quote is indistinguishable from a researched one
   forever after.

The 46 "readable, nothing qualified" edges are their own finding: the document
resolves, and no sentence in it names the target and states a dependency. Some
of those citations may simply not support their edge.

## 4. Also

`isIndexPage`, `isBareHost` and `isSelfCitation` are untouched. The batch-1
write only ever adds `evidence_grade`, plus `evidence_quote` on an A grade
where the edge had none (the schema requires the quote for an A). 84 slice
files changed; no formatting churn — the writer mutates the parsed object and
re-serialises at the same indent.
