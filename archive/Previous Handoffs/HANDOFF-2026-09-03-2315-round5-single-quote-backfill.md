# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 5 — single-quote backfill)

---

## 1. Read next

`PLAYBOOK.md` (§6 has a new trap on quotes from companion documents, §7 the
revert refinement) → `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/grader-single-quote-backfill-2026-09-03.md` (this round) →
`notes/grader-quote-backfill-2026-09-03.md` →
`notes/grader-host-strategies-2026-09-03.md` →
`notes/grader-batch2-2026-09-03.md` → `notes/grader-batch1-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
project memory `grader_single_quote_backfill_2026-09-03`, then
`grader_quote_backfill_2026-09-03`, `grader_host_strategies_2026-09-03`,
`grader_batch2_2026-09-03`, `grader_batch1_2026-09-03`,
`grader_dry_run_2026-09-03`, `renderer_grade_round2_2026-09-03`,
`schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-2 and the self-citation fix are committed. Rounds 3a-3d, 4 and 5
are built and verified, not committed.** Corpus **3,341 reports / 2,736
dependencies**, unchanged.

**Grades: 431 A · 1,189 B · 1,116 C.** A-share **15.8%**, up from 11.7%.
`npm run validate` exits 0 with all 431 A grades in (an A turns the three
evidence warnings into errors, so that is a real check). `tsc --noEmit` clean,
123/123 logic tests, grader `--selftest` 31/31. **No script changed in round 5.**

**Round 5 read every single-quoted span the grader cannot see and decided each
one: 476 candidates, 370 accepted, 106 refused with a reason**
(`Claude outputs/quote-backfill-sq-review-2026-09-03.json`). The 539 in the
previous handoff counted 95 apostrophe pairs as quotes. Accepted quotes were
written into `evidence_quote`, then re-graded on the bridge VM: **B→A 111,
C→B 38**, 191 unchanged (43 of them dead 404 URLs), **30 B→C not written**.

**29 of those 30 were `quote-not-in-document` on a document read in full today** —
the sentence was real but from a companion document, not `evidence_url`, or a
`|`-separated table row, or a PDF whose text layer breaks mid-sentence. Their
quotes were **reverted** and the grade left alone
(`Claude outputs/grade-sq-regressions-2026-09-03.json`, one line per edge with
host, coverage and action). New PLAYBOOK §6 trap: the quote and the citation
must be the same document.

**Everything else unchanged**: round 4's `spansForEdge` fix and the
improvements-only rule; round 3d's fetch strategies, the snapshot→B cap,
`--edges`/`--refetch`/`--no-snapshot`; round 2's grade-driven opacity / A-only
ranking cut / `view.minGrade` (still default `C`) / `rankByLegalBasis` /
self-citation scoped to `cites`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE`
0.8; drift watchdog + `__meshes`. **The direction criterion is still never
checked** — an A is a proposal a reviewer can spot-check.

**Research debt, corpus-wide** (per-edge JSON in `Claude outputs/`): **131 dead
URLs** (`s-circabc.europa.eu` is 58 of them); **232 unreadable**
(`grade-browser-pass-2026-09-03.json`: 145 wall / 62 JavaScript shell / 25
network); **162 no-URL edges**, every one in a `*-wiring-grok-2026-08` slice;
**28 `ess-peer-review-final-report → country report` edges and 12 EDP-inventory
title fragments** refused this round because the naming sentence was never
quoted — a reread of SWD(2024)136 and the CIRCABC inventories, not a regex, is
what they need.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Ruling: 17 edges point the wrong way.** `source_report_id` is the consumer,
   but 13 edges point INTO `jp-national-accounts` from the very surveys the JSNA
   manual names as JSNA's inputs, 2 more into `jp-cgpi`, and 2 into
   `kr-national-accounts-bok`. All in `*-grok-2026-08` slices, same family as the
   5 the schema round already dropped. List with basis text:
   `Claude outputs/direction-suspect-jp-kr-2026-09-03.json`. Flip, drop, or leave.
2. Commit rounds 3a-3d, 4 and 5. Round 5 touches: 85 `src/data/research/*.json`,
   `evidence-cache/`, `PLAYBOOK.md`, `notes/Midvamp - Revamp.md`,
   `notes/grader-single-quote-backfill-2026-09-03.md`, `HANDOFF.md` (+ its
   archive copy), and five `Claude outputs/*sq*-2026-09-03.json`
   (`quote-backfill-sq-review`, `quote-backfill-sq-accepted`, `grade-sq`,
   `grade-sq-written`, `grade-sq-regressions`). No script changed.
3. Ruling **7**: **131 dead-URL edges**, 58 of them one dead host. Fix, drop, or
   leave graded C.
4. **Browser pass: 232 edges, 59 of them two hosts.** `bps.go.id` 35 and
   `psa.gov.ph` 24 are worth more than the other 69 hosts combined — BPS
   especially, which has no archived copies at all. One Claude-in-Chrome session
   each.
5. Still open from the audit: **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder), **Q19** (paste the two 08-30/31
   audit reports into `archive/audits/`).
6. Empty `_to_delete/` and `tmp_work/` when convenient.
7. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Re-research the 162 no-URL edges** — ten Grok wiring slices, quotes already
   in `basis`, only the citation missing. Bounded. Now the biggest lever left:
   the double- and single-quoted spans are both harvested, so what has no span at
   all is almost entirely this family.
2. **CJK matcher** — character n-grams below a space-density threshold in
   `locateQuote`, so a Japanese or Chinese quote can be verified as anything but
   an exact substring. 13 edges are stuck on this today.
3. **Companion-document reread, bounded**: the 28 `ess-peer-review-final-report`
   edges (SWD(2024)136 names each member state's report — quote the sentence)
   and the 30 reverted quotes of round 5, whose `basis` cites one document and
   whose `evidence_url` points at another — either retarget `evidence_url` to the
   document actually quoted, or quote the cited one.
4. `_dropped` lead re-evaluation (plan §4 step 5) — still not built.
5. Flip `view.minGrade` default to A — **after** 1, not before (15.8% A).
6. DSBB/ESMS scripted import.
7. Link batching (merged geometry → instanced photons).
8. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
   `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION` by spread, couple
   galaxy pull. Kept separate per Thomas's Q17 ruling.
9. Housekeeping when convenient: doc fixes under hygiene (README:130,
   REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37); write
   `notes/mint-2026-08-20.md` then Grok folder per Q18; retire `check-urls.ts`
   into the grader — the cache header now records status, final URL, fetch time
   and the fetch route for every evidence URL.

---

## 4. How to hand off

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   HHMM-<topic>.md` (UTC date and time in the title, topic = what the
   superseded state was about). Verify the copy (`sha256sum` both).
   **Archive first, then rewrite** — there is no git safety net (PLAYBOOK
   rule 1); an un-archived overwrite destroys the previous state.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   Keep this §4 verbatim so the next agent knows the procedure.
4. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to `PLAYBOOK.md`. A design change goes to
   `notes/Midvamp - Revamp.md` (or `REPORTS.md` if it changes direction).
5. If this file is over ~10k characters, trim it before adding to it.
6. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
