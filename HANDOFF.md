# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round A — the 162 no-URL edges)

---

## 1. Read next

`PLAYBOOK.md` (§6 has four new traps from round A: the 250 KB text cap, DSBB
category codes, tuik/dgbas transport quirks, subagents and the search budget)
→ `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` (Rounds B and C are still the queue)
→ `notes/roundA-nourl-reresearch-2026-09-03.md` (this round) →
`notes/grader-single-quote-backfill-2026-09-03.md` →
`notes/grader-quote-backfill-2026-09-03.md` →
`notes/grader-host-strategies-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
project memory `grader_roundA_nourl_2026-09-03`, then
`grader_single_quote_backfill_2026-09-03`, `grader_quote_backfill_2026-09-03`,
`grader_host_strategies_2026-09-03`, `grader_batch2_2026-09-03`,
`grader_batch1_2026-09-03`, `grader_dry_run_2026-09-03`,
`renderer_grade_round2_2026-09-03`, `schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-2 and the self-citation fix are committed. Rounds 3a-3d, 4, 5 and A
are built and verified, not committed.** Corpus **3,341 reports / 2,724
dependencies** (12 edges moved to `_dropped` this round).

**Grades: 470 A · 1,285 B · 969 C.** A-share **17.3%**, up from 15.8%.
`npm run validate` exits 0 with all 470 A grades in, `tsc --noEmit` clean,
123/123 logic tests, grader `--selftest` 31/31. **No script changed in round A.**
The validator's "cites no evidence_url" warning class is **0** — it was 162.

**Round A re-researched every live edge with no `evidence_url`** (162, all in
the ten `*-wiring-grok-2026-08` slices): **150 cited, 149 of them with a quote
seen in the cited document from the bridge VM; 12 moved to `_dropped`
`no-document`** (each cross-checked against every live edge and every other
slice's `_dropped`). Re-grade of the 150: **C→A 39, C→B 96**, 15 still C (11
walls/tiny bodies, 2 CJK, 2 past the text cap). Decisions per edge:
`Claude outputs/roundA-nourl-decisions-2026-09-03.json`; grades:
`grade-roundA-2026-09-03.json` (+ `-raw`); 99 new `evidence-cache/` records.
28 of the citations are `dsbb.imf.org` API pages; 20 quote an equivalent
sentence from a companion document because the basis's original was in a
document that no longer exists or cannot be read (quote and citation kept to
the same document, PLAYBOOK §6).

**Everything else unchanged**: round 5's revert refinement; round 4's
`spansForEdge` fix and improvements-only rule; round 3d's fetch strategies,
the snapshot→B cap, `--edges`/`--refetch`/`--no-snapshot`; round 2's
grade-driven opacity / A-only ranking cut / `view.minGrade` (still default `C`)
/ `rankByLegalBasis` / self-citation scoped to `cites`; `INT_LINK_STIFFNESS =
0`; `CORE_PERCENTILE` 0.8; drift watchdog + `__meshes`. **The direction
criterion is still never checked** — an A is a proposal a reviewer can
spot-check.

**Research debt, corpus-wide** (per-edge JSON in `Claude outputs/`): **131 dead
URLs** (`s-circabc.europa.eu` is 58 of them); **232 unreadable**
(`grade-browser-pass-2026-09-03.json`) plus round A's six walled hosts
(`bcentral.cl` 6, `bps.go.id` 4, `unece.org` 2, `banrep.gov.co`, `mef.gob.pe`,
`cbi.ir`); **0 no-URL edges**; 28 `ess-peer-review-final-report → country
report` edges and 12 EDP-inventory fragments still owed a reread (Round C); 13+2
CJK quotes stuck on the matcher (Round B).

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Ruling: 18 edges point the wrong way.** 17 JP/KR from round 4 plus
   `ec-enemdu → ec-cuentas-nacionales` from round A (the INEC sentence says
   ENEMDU *feeds* the national accounts). List with basis text:
   `Claude outputs/direction-suspect-jp-kr-2026-09-03.json`. Flip, drop, or leave.
2. **Two round-A citations need your call**: `tr-cpi → un-coicop-2018` cites
   TurkStat's data-portal download link (token in the URL, may be signed, no
   stable page exists for the 2026 CPI methodology document); `ir-national-accounts
   → sna-2008` has its CBI page as `evidence_url` and **no quote** (cbi.ir is
   F5-walled everywhere, Wayback included) — kept live because a `caveat` in
   `candidates-tier-wiring-2026-08-28.json` names the edge.
3. Commit rounds 3a-3d, 4, 5 and A. Round A touches: the ten
   `src/data/research/*-wiring-grok-2026-08.json`, `evidence-cache/` (99 new),
   `PLAYBOOK.md` (§6), `notes/roundA-nourl-reresearch-2026-09-03.md`,
   `HANDOFF.md` (+ archive copy), `Claude outputs/direction-suspect-jp-kr-2026-09-03.json`
   (row 18) and four `Claude outputs/*roundA*-2026-09-03.json`. No script changed.
4. Ruling **7**: **131 dead-URL edges**, 58 of them one dead host. Fix, drop, or
   leave graded C.
5. **Browser pass: 232 + round A's 15 walled edges.** `bps.go.id` (39 now) and
   `psa.gov.ph` 24 are worth more than the other hosts combined; `bcentral.cl`
   (Incapsula, 6 round-A edges) is new to the list. One Claude-in-Chrome
   session each.
6. Still open from the audit: **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder), **Q19** (paste the two 08-30/31
   audit reports into `archive/audits/`).
7. Empty `_to_delete/` and `tmp_work/` (round A left `tmp_work/roundA/`,
   scratch) when convenient.
8. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **CJK matcher** (Round B in `notes/next-agent-prompt-2026-09-03.md`) —
   character n-grams below a space-density threshold in `locateQuote`. 15
   edges are stuck on this today (13 from round 4, 2 from round A).
2. **Companion-document reread, bounded** (Round C): the 28
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   12 EDP-inventory fragments.
3. **Long-document quotes**: the grader matches against the capped 250 KB text
   (PLAYBOOK §6, round A). Either raise the cap for matching only, or make the
   revert rule check `truncated` before reverting — 2 INEI edges are C for this
   reason today.
4. `_dropped` lead re-evaluation (plan §4 step 5) — still not built.
5. Flip `view.minGrade` default to A — the no-URL class is closed (17.3% A);
   your call whether that is enough or whether Round B/C go first.
6. DSBB/ESMS scripted import (the `getBaseSummaryofMethodologies` API is
   readable and already carries 50 corpus citations; category codes differ by
   country — PLAYBOOK §6).
7. Link batching (merged geometry → instanced photons).
8. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
   `onscreen`). Kept separate per Thomas's Q17 ruling.
9. Housekeeping when convenient: doc fixes under hygiene (README:130,
   REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37); write
   `notes/mint-2026-08-20.md` then Grok folder per Q18; retire `check-urls.ts`
   into the grader.

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
