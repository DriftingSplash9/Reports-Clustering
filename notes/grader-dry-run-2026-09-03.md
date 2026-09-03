# Grader dry run — 2026-09-03

Round 3 of Midvamp (plan §9 item 3), first half only: `scripts/grade-evidence.ts`
is built and has been dry-run against the 2026-09-02 audit's own 56-edge
sample, which is the gate the plan sets before the grader is allowed near the
corpus ("The grader must reproduce the audit's 56-edge grades before it touches
the corpus"). **No grades were written to the corpus.** Thomas's call:
build + dry-run, then stop for review.

---

## 1. The headline

| | script A | script B | script C | n |
|---|---|---|---|---|
| audit **PASS** → A | **10** | 17 | 1 | 28 |
| audit **WEAK** → B | 0 | **12** | 2 | 14 |
| audit **FAIL** → C | 0 | 1 | **13** | 14 |

- **35/56 exact agreement (63%).**
- **20 stricter** — the script graded below the human.
- **1 looser**, by one grade. Detail in §4.
- **Every A the script gave, the audit also passed.** Nothing was promoted
  above a human's verdict. That is the property the round was aiming for; the
  agreement percentage is secondary to it.

The run is deterministic: a second pass reading only the cache produced
identical grades on all 56.

## 2. What it actually checks

The audit's grade rests on four things. Three are mechanical and the script
does them; the fourth is a reading, and the script refuses to fake it.

| Audit criterion | Script |
|---|---|
| URL resolves to a real document | raw `curl` (browser UA, redirect-following, `-k` retry), body-based WAF/JS-shell detection, `pdftotext -layout` / tag-strip / `word/document.xml` extraction |
| The quote is in the body | quoted spans lifted out of the free-text `basis` (and `evidence_quote` where it exists), matched after accent/quote/hyphen folding, ellipsis-split, exact-then-4-gram coverage |
| The document names the input **artefact**, not just the agency | contiguous title-run ≥60%, title lead phrase, CJK title token, legal designator ("sections 264 and 301 of the Constitution", "Lei n.º 1/2008"), or the target's own URL. Publisher-only naming is explicitly *not* artefact naming |
| The document states the **direction** claimed | **never checked.** Reported as `direction: unchecked` on every row |

Because the direction is never checked, an `A` from this script means "this
citation clears the three checkable bars", not "this edge is right". It is a
proposal a reviewer can spot-check, and it is why the file's own header says
the script can only move an edge down from what a human would give it.

### The A/B/C decision, as implemented

- **C** — no URL · bare homepage · `isIndexPage()` · unreachable, WAF-walled or
  empty · quote present in `basis` but **not** in the document · no quoted span
  *and* the target is named nowhere.
- **B** — everything that resolves and half-supports: partial quote · agency
  named but not the artefact · artefact named somewhere in the document but not
  in the passage the quote came from · a weak-language `basis`
  ("consistent with", "presumably", "paraphrase") · no quoted span in the basis
  at all but the document does name the artefact.
- **A** — the quote is in the body (≥95% coverage), the artefact is named
  **within the same passage** (±400 chars of the matched span), the `basis`
  carries no weak-language flag, and a real quoted span existed. IMF DSBB /
  Eurostat ESMS / SDMX metadata hosts waive the artefact-naming half only.

## 3. The 20 stricter rows, by cause — these are the real limits

- **13 × `no-quoted-span`** — the edge's `basis` contains no quoted sentence at
  all, so there is nothing to check the document against. The audit graded
  several of these PASS on a reading ("paraphrase only, but the claim is
  directly supported"). The script caps them at B. **The audit found
  `evidence_quote` empty on all 56 sampled edges, so this will be the single
  biggest class in the corpus-wide run**, and it is a research/backfill
  problem, not a grader bug.
- **4 × `artefact-named-elsewhere-in-document`** — quote found, artefact named,
  but not within 400 characters of the quote. This proximity rule is what
  killed three of the four false A grades in the first pass (see §4), so it is
  load-bearing; it costs three audit-PASS rows.
- **3 × naming shortfall** (`agency-not-artefact`, `quote-found-target-not-named`).
- The rest are single cases: one Brazilian `lei` whose quoted span genuinely
  is not in the cited page at 0.26 coverage, one condensed paraphrase.

Five FAIL rows were graded C by the **index-page rule alone**, before any fetch
— the plan's own rule (an index page is C regardless of what it contains). All
five agree with the audit, but note the rule is doing the work, not the
content check.

## 4. The one looser — and the three that were fixed

`el-edp-inventory → gr-elstat-government-finance`: script **B**, audit
FAIL-CONTENT. The quoted ELSTAT sentence is verbatim in the press release and
ELSTAT is named, so mechanically it resolves and half-supports. The audit's
reason for failing it — "the doc only announces EDP fiscal data; never mentions
the EDP inventory *or any use relationship*" — is exactly the direction reading
the script does not do. Fixing this in code would mean guessing at direction,
which is the thing this programme exists to stop.

The first pass had **three** false A grades, all the same shape: a verbatim
quote about one artefact inside a document that mentions the target's name
somewhere else (or not at all — `AASB 1049` quoting the "ABS GFS Manual"
against the target release *Government Finance Statistics, Australia*; a
council page naming "the NSW Valuer General" against the *Valuation of Land Act
1916*). Two rules removed them: the artefact must be named **in the passage the
quote came from**, and a parenthetical acronym in a title ("(EDP)", "(NSW)") no
longer counts as artefact naming at all — only as agency naming.

## 5. Findings for Thomas

**(a) The committed cache will be ~25 MB.** 54 documents cached during the dry
run come to 794 KB gzipped (median 5.9 KB, p90 49 KB, cap 250 KB). At ~1,700
distinct evidence URLs corpus-wide that projects to **~24 MB in git**. It is
the link-rot fix and the permanent evidence record, so it earns its space —
but it is a decision, and the cap (`TEXT_CAP_BYTES`) is one constant if you
want it smaller. A cheaper variant exists: store only the matched window plus a
hash instead of the whole document.

**(b) No quoted span = no A, ever.** 13 of 56 sampled edges have no quoted
sentence in `basis`. Corpus-wide that class is likely to be large, and every
one of them is capped at B no matter how good the citation is. If you want
those promotable, the fix is a backfill round that lifts quotes into
`evidence_quote` — not a looser grader.

**(c) The A-share on this sample is 10/56 (18%).** If that holds corpus-wide,
flipping `view.minGrade` to A (plan §9 item 4) empties most of the graph until
the browser pass and the quote backfill have run. Worth knowing before that
flip is scheduled.

**(d) Browser-pass list, from 56 edges:** `archive.stats.govt.nz` (DNS),
`localgovernment.vic.gov.au` (Cloudflare), `boi.org.il` (Incapsula),
`canada.ca` (HTTP/2 stall), `imf.org` (Akamai deny). Five hosts out of 56
edges — the same families the handoff already names. The full list for the
corpus comes out of the batch-1 run.

**(e) The `_dropped` re-evaluation pass (plan §4 step 5) is not built yet.**
The script grades live edges and the sample; reading lead-type `_dropped`
entries back in is the next piece.

## 6. Also in this round

The JP dangling-caveat bug (previous handoff, finding (b)) is fixed:
`jp-kr-wiring-grok-2026-08.json`'s three stale `caveat` notes are retyped to
`wrong-direction` — which is what each note's own text says — with a dated
header explaining the retype and the original text kept verbatim beneath it.
They are kept rather than deleted because their evidence is independent of the
migrated entries in `jp-japan-grok-2026-08.json` (different documents, same
finding). `npm run validate` now exits 0. Corpus unchanged at 3,341 / 2,736;
123/123 logic tests; every edge still reads C.

## 7. Appendix — the run

`npx tsx scripts/grade-evidence.ts --sample "Claude outputs/audit-2026-09-02-evidence-sample-56.json"`
— full stdout is in `Claude outputs/grade-dry-run-2026-09-03.txt`, per-edge JSON
in `Claude outputs/grade-dry-run-2026-09-03.json`. `--selftest` runs 14 unit
checks on the pure helpers (quote extraction, coverage, naming, the grade
table) with no network.
