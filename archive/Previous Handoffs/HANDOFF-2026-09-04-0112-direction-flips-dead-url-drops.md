# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (Thomas's rulings on items 1, 2 and 4: direction
flips, the two round-A citations, dead-URL drops)

---

## 1. Read next

`PLAYBOOK.md` (§6's round-A traps: the 250 KB text cap, DSBB category codes,
tuik/dgbas transport quirks, subagents and the search budget) →
`notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` (Rounds B and C are still the queue)
→ `notes/direction-flip-and-dead-url-drop-2026-09-04.md` (this round) →
`notes/roundA-nourl-reresearch-2026-09-03.md` →
`notes/grader-single-quote-backfill-2026-09-03.md` →
`notes/grader-quote-backfill-2026-09-03.md` →
`notes/grader-host-strategies-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
project memory `direction_flips_dead_url_drops_2026-09-04`, then
`grader_roundA_nourl_2026-09-03`, `grader_single_quote_backfill_2026-09-03`,
`grader_quote_backfill_2026-09-03`, `grader_host_strategies_2026-09-03`,
`grader_batch2_2026-09-03`, `grader_batch1_2026-09-03`,
`grader_dry_run_2026-09-03`, `renderer_grade_round2_2026-09-03`,
`schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0–5 and A are committed (Thomas, 2026-09-04). The 2026-09-04
flip/drop round is built and verified, not committed.** Corpus **3,341 reports
/ 2,633 dependencies** (validator count; 93 edges moved to `_dropped` this
round).

**Grades: 470 A · 1,286 B · 867 C.** A-share **17.9%**, up from 17.3% (the
drops were C except three B; Iran's SNA edge C→B by hand). `npm run validate` exits 0, `tsc --noEmit`
clean, 123/123 logic tests. **No script changed.** `public/corpus-data.json`
regenerated. The validator's "cites no evidence_url" warning class is still 0.

**Direction list closed.** All 18 rows of
`Claude outputs/direction-suspect-jp-kr-2026-09-03.json` are flipped in place
(grade/citation carried over, basis annotated, originals in `wrong-direction`
`_dropped` notes; one `caveat` in `jp-kr-wiring-grok-2026-08.json` re-pointed).
Log: `Claude outputs/direction-flips-2026-09-04.json`. **The direction
criterion is still never machine-checked** — an A is a proposal a reviewer
can spot-check.

**Dead-URL class: 93 dropped, 38 kept live** (`Claude outputs/dead-url-drops-
2026-09-04.json`, `kept_live` has the reason per row). The 131 in the batch-2
debt list were 99 HTTP-404 + 32 walls/transients; only 404s reconfirmed from
the bridge VM on 2026-09-04 were dropped (`no-document`, original verbatim,
marked as a lead). Kept: the 32 non-404 rows (browser-pass work, not rot);
2 `podaci.dzs.hr` edges (host is back, still C, re-grade owed); 4
`rosstat.gov.ru`/`sis.gov.eg` edges that time out from the VM. Two reports are
now ISOLATED (shelved): `sc-oag-annual-reports-2022-2024`,
`so-fgs-financial-governance-reports`.

**Everything else unchanged**: round 5's revert refinement; round 4's
`spansForEdge` fix and improvements-only rule; round 3d's fetch strategies,
the snapshot→B cap, `--edges`/`--refetch`/`--no-snapshot`; round 2's
grade-driven opacity / A-only ranking cut / `view.minGrade` (still default `C`)
/ `rankByLegalBasis` / self-citation scoped to `cites`; `INT_LINK_STIFFNESS =
0`; `CORE_PERCENTILE` 0.8; drift watchdog + `__meshes`.

**Research debt, corpus-wide** (per-edge JSON in `Claude outputs/`): **0
confirmed-dead URLs**; **232 unreadable** (`grade-browser-pass-2026-09-03.json`)
plus round A's six walled hosts (`bcentral.cl` 6, `bps.go.id` 4, `unece.org` 2,
`banrep.gov.co`, `mef.gob.pe`, `cbi.ir`) plus the 32 non-404 rows of the old
dead list (`dead-url-drops-2026-09-04.json` → `kept_live`); **0 no-URL
edges**; 28 `ess-peer-review-final-report → country report` edges and 12
EDP-inventory fragments still owed a reread (Round C) — note 58 EDP/ESS edges
citing `s-circabc.europa.eu` are now in `_dropped`, so Round C's list shrinks;
13+2 CJK quotes stuck on the matcher (Round B).

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Item 2 is closed**: `tr-cpi → un-coicop-2018` keeps its TurkStat token
   link (re-fetched from the VM, byte-identical to the PDF Thomas downloaded;
   caveat note records the sha256); `ir-national-accounts → sna-2008` now
   carries a verbatim `evidence_quote` read in Thomas's Chrome, C→B by hand
   (caveat note in `ir-iq-tr-sy-wiring-grok-2026-08.json`). Nothing owed.
2. Commit the 2026-09-04 flip/drop round. Touches: 19
   `src/data/research/*.json` (jp-japan, kr-south-korea, andean-wiring,
   jp-kr-wiring, edp-inventory-regulation-479-2009, crossborder-standards and
   the other slices listed in `dead-url-drops-2026-09-04.json`),
   `ir-iq-tr-sy-wiring-grok-2026-08.json` (two caveats + the Iran quote),
   `public/corpus-data.json`, `edit_scripts/flip-and-drop-2026-09-04.py`,
   `notes/direction-flip-and-dead-url-drop-2026-09-04.md`, two
   `Claude outputs/*-2026-09-04.json`, `HANDOFF.md` (+ archive copy).
3. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Browser pass: 232 + round A's 15 walled + the 32 kept-live non-404 rows.**
   `bps.go.id` (39) and `psa.gov.ph` 24 are worth more than the other hosts
   combined; `bcentral.cl` (Incapsula) and `dane.gov.co` (9, all 403) are on
   the list. One Claude-in-Chrome session each. Also re-grade the 2
   `podaci.dzs.hr` edges (host is back) and re-fetch the 4 rosstat/sis.gov.eg
   edges from a network that reaches them (`--refetch`).
2. **Housekeeping Thomas delegated**: audit items **13** (empty `_to_delete/`,
   move the two `archive/*.tar.gz`), **Q18** (Grok folder), **Q19** (paste the
   two 08-30/31 audit reports into `archive/audits/`); empty `_to_delete/` and
   `tmp_work/` (`tmp_work/roundA/` is scratch) — agents can only `mv` into
   `_to_delete/` (rule 6), so "empty" means: list what's there for Thomas.
3. **CJK matcher** (Round B in `notes/next-agent-prompt-2026-09-03.md`) —
   character n-grams below a space-density threshold in `locateQuote`. 15
   edges are stuck on this today.
4. **Companion-document reread, bounded** (Round C): the surviving
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   surviving EDP-inventory fragments — recount first, 58 circabc edges left.
5. **Long-document quotes**: the grader matches against the capped 250 KB text
   (PLAYBOOK §6). Either raise the cap for matching only, or make the revert
   rule check `truncated` before reverting — 2 INEI edges are C for this.
6. `_dropped` lead re-evaluation (plan §4 step 5) — still not built. The 93
   dead-URL drops are all tagged as leads in their `why`; a re-cite pass on
   `s-circabc.europa.eu` (58, one host — Eurostat's EDP inventory pages may
   have moved, not vanished) would recover most of them in one go.
7. Flip `view.minGrade` default to A — the no-URL and dead-URL classes are
   closed (17.9% A); your call whether Round B/C go first.
8. DSBB/ESMS scripted import (the `getBaseSummaryofMethodologies` API is
   readable and already carries 50 corpus citations; category codes differ by
   country — PLAYBOOK §6).
9. Link batching (merged geometry → instanced photons).
10. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
    `onscreen`). Kept separate per Thomas's Q17 ruling.
11. Doc fixes under hygiene (README:130, REPORTS:9–32, PLAYBOOK:18–20,
    START-HERE:31/37); write `notes/mint-2026-08-20.md` then Grok folder per
    Q18; retire `check-urls.ts` into the grader.

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
