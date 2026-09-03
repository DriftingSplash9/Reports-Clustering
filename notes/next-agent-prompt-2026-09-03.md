# Prompt for the next agent(s) — Reports Clustering, after round 5 (2026-09-03)

Paste the block for the round you want run. Each is self-contained; the
"Standing" header is the same for all three.

---

## Standing (paste at the top of every round)

You are working in the Reports Clustering repo (Economic Report Influence
Graph). Before touching anything, read in this order: `HANDOFF.md` → `PLAYBOOK.md`
§2 (rules), §6 (traps), §7 (standing decisions) → `notes/Midvamp - Revamp.md` →
`notes/grader-single-quote-backfill-2026-09-03.md` → project memory
`grader_single_quote_backfill_2026-09-03` and `grader_quote_backfill_2026-09-03`.

Rules that get broken: never run git (not even `git status`); never delete a
file (mv to `_to_delete/`); never hand-edit `src/data/slices.generated.ts`;
`npm run validate` before and after any data change; a pointer is not a source —
raw-verify HTTP status before trusting a quote; no document saying so, no edge.

How to run the toolchain: rsync the repo (minus `node_modules/`, `.git/`,
`archive/`, `evidence-cache/`, `tmp_work/`, `_to_delete/`, `Claude outputs/`)
to `$HOME/rc` on the bridge VM, `npm install` there, then symlink
`src/data/research/` and `evidence-cache/` from `$HOME/rc` back into the
mounted repo. Copy `scripts/` — never symlink it. Nothing can be backgrounded;
runs over ~170 s are re-run as repeated foreground calls (the grader resumes
from its fulltext cache). The grader is `npx tsx scripts/grade-evidence.ts`;
`--edges <json[#key]>` selects `{source,target}` rows, `--json <out>` writes
results, `--selftest` must stay 31/31.

Grading discipline: a re-grade writes improvements only; regressions go to a
dated JSON in `Claude outputs/` with host and reason. A `quote-not-in-document`
on a document read in full (HTTP 200) means the quote is wrong, not the
network — revert the quote, leave the grade. A document read via an archived
snapshot caps at B. A backfilled `evidence_quote` needs a reader's acceptance
with a reason for every refusal; the test is one question: *does this sentence,
in this document, say the source depends on the target?* "Consistent with" is
not evidence; a chart caption "Source: X" is. The direction of an edge is never
checked by the grader — flag direction conflicts for Thomas, don't flip them.

When done: verify (`npm run validate` exit 0, `tsc --noEmit`, 123/123 logic,
selftest 31/31), write the round's narrative to `notes/<round>-2026-09-0X.md`
and project memory, add any new trap/rule to PLAYBOOK §6/§7, then hand off per
HANDOFF §4: archive the old HANDOFF first (sha-verified copy under
`archive/Previous Handoffs/`), rewrite `HANDOFF.md` in place, state only, under
10k characters, no git status. Report bad news plainly; don't pad.

Current numbers to check yourself before believing them: 3,341 reports / 2,736
dependencies; 431 A · 1,189 B · 1,116 C (A-share 15.8%).

---

## Round A — the 162 no-URL edges ([Agent] item 1; do this first)

162 live edges carry no `evidence_url` at all, every one in a
`*-wiring-grok-2026-08` slice (list: `Claude outputs/grade-batch2-debt-2026-09-03.json`,
re-measure it first). Their `basis` usually already names the document and
often quotes it; what is missing is the citation.

1. Build the list from the slice files, not from the debt JSON alone; group by
   slice and by the publisher named in `basis`.
2. For each edge, find the actual document the `basis` describes and get its
   URL. Raw-verify the status. If the quote in `basis` is in that document,
   set `evidence_url`; if the basis quotes one document but the only reachable
   one is a companion, cite the one you can quote (PLAYBOOK §6: quote and
   citation must be the same document). Where the document cannot be found or
   does not say what the basis says, do not invent — record it under the
   slice's `_dropped` with reason `no-document` (cross-check the (source,
   target) against ALL live edges first; rule 7 in PLAYBOOK §2).
3. Write `evidence_url` (and `evidence_quote` where the basis's quoted sentence
   is verbatim in the document) with a generated python writer —
   `json.dumps(obj, ensure_ascii=False, indent=2) + "\n"`, which is
   byte-identical to the grader's output — never by hand.
4. Re-grade exactly those edges with `--edges`, write improvements only, park
   regressions with reasons.
5. Expect Grok-family problems: invented ids, duplicate edges of hand-researched
   ones, `part_of` containment proposed as dependency, reversed direction
   (17 JP/KR edges are already flagged for Thomas in
   `Claude outputs/direction-suspect-jp-kr-2026-09-03.json` — add to that list,
   don't flip).

Deliverables: per-edge decision JSON in `Claude outputs/`, the re-grade JSONs,
notes file, memory entry, HANDOFF. Report: how many got a URL, how many an A,
how many went to `_dropped`, and the hosts that could not be read from the
bridge VM (name the network you were on).

---

## Round B — CJK matcher ([Agent] item 2)

`locateQuote` in `scripts/grade-evidence.ts` scores 4-word shingles split on
spaces; Japanese/Chinese/Korean-without-spaces collapse to one token, so a CJK
quote can only pass by exact substring. 13 edges regressed on this in round 4
(`Claude outputs/grade-quotebackfill-regressions-2026-09-03.json`, the
`quote-not-in-document` rows on JP/KR hosts).

1. Add a space-density check in `normalizeForMatch`/`locateQuote`: below a
   threshold, shingle on character n-grams (try n=6–8) instead of words. Keep
   the exact-substring fast path.
2. Add selftests (31 → more): a Japanese quote with a line-break inserted mid-
   sentence, one with an ellipsis, one that should still FAIL (quote from a
   different document). Selftest must pass before any corpus run.
3. Re-grade only the 13 (plus any other edge whose `evidence_quote` is
   majority-CJK — measure) with `--edges`, improvements only.
4. Do not touch the naming rules or the A bar. Document the threshold and n in
   the function comment with the measurement that set it.

---

## Round C — companion-document reread ([Agent] item 3, bounded)

Two lists, both from round 5's review:

- 28 `ess-peer-review-final-report → xx-ess-peer-review-report` edges refused
  because the quoted sentence names no country. SWD(2024)136 (the final report)
  does name each member state's report — find the sentence or table row that
  does, quote it, verify it is in the cited PDF, write, re-grade.
- 29 edges whose quote was reverted in round 5
  (`Claude outputs/grade-sq-regressions-2026-09-03.json`): the `basis` quotes
  one document, `evidence_url` points at another. For each, either retarget
  `evidence_url` to the document actually quoted (raw-verify it), or find the
  equivalent sentence in the cited document. DSBB table rows: quote the
  surrounding prose, not the `|` row. Two-column PDFs with a broken text layer:
  record as `unreadable-source` only after `pdftotext -layout` has also failed.

Also the 12 EDP-inventory edges refused on the `Inventory... according to ESA
2010` fragment — the CIRCABC PDFs need a browser or a snapshot; if neither
reads, leave them, they are in ruling 7's dead-host set anyway.

---

## Not for an agent (Thomas's list, for context only)

Ruling on the 17 reversed JP/KR edges; ruling 7 on the 131 dead URLs (58 on
`s-circabc.europa.eu`); committing rounds 3a–5; the Claude-in-Chrome browser
pass for `bps.go.id` (35 edges) and `psa.gov.ph` (24); emptying `_to_delete/`
and `tmp_work/`; audit items 13/Q18/Q19; the real-GPU number for the unfolded
Everything tier. The `view.minGrade` → A flip waits until after Round A.
