# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 3c — batch 2, the whole corpus graded)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/grader-batch2-2026-09-03.md` (this round) →
`notes/grader-batch1-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still
current) → project memory `grader_batch2_2026-09-03`, then
`grader_batch1_2026-09-03`, `grader_dry_run_2026-09-03`,
`renderer_grade_round2_2026-09-03`, `schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-2 and the self-citation fix are committed. Rounds 3a, 3b and 3c
are built and verified, not committed.** Corpus **3,341 reports / 2,736
dependencies**.

**Every live edge in the corpus now carries an `evidence_grade`:
226 A · 1,202 B · 1,300 C** across the 2,728 research-slice edges. (The 8
edges that exist only in the hand-written seed files are deliberately not
machine-written and stay ungraded.) `npm run validate` exits 0 with all 226
A grades in place — an A turns the three evidence warnings into errors, so
that is a real check. `tsc --noEmit` clean, 123/123 logic tests, grader
`--selftest` 18/18.

**Batch 2 = six batches in Midvamp §4's order** (Grok slices first,
hand-researched EU/US/CA/NZ/AU last), each fetched once, reviewed, then
re-run `--offline --write`, with `npm run validate` between every batch:
G1 Grok BRICS/Asia 477 (**0 A**) · G2 Grok Americas/Canada 314 (32 A) ·
G3 Grok remainder 88 (11 A) · N1 hand non-Western 833 (48 A) ·
N2 hand EU/EEA 294 (42 A) · N3 hand US/CA/NZ/AU 418 (52 A).

**The round's finding: 477 Grok-derived BRICS/Asia edges produced zero A
grades.** 258 carry no quoted span at all; 143 of those also name the target
nowhere in the cited document. Hand-researched EU scores 14% on the same
bar. That is the audit's "Grok slices did not hold" measured, not sampled.

**Corpus A-share is 8.3%, not the dry run's 18%** — the audit's 56 were not
representative. This is what governs the `minGrade` flip.

**Research debt, corpus-wide, measured (all per-edge in `Claude
outputs/grade-batch2-debt-2026-09-03.json`):**
- **131 dead URLs.** `s-circabc.europa.eu` is **58 of them** — the host
  itself 404s at its own root, and the same paths 404 on `circabc.europa.eu`
  too. One EU/ESS library moved or died. Then `singstat.gov.sg` 16,
  `dane.gov.co` 9, `gccstat.org` 4, 31 further hosts at 1-3.
- **422 edges unreadable from the sandbox, 116 hosts.** Top four are 137 of
  them: `bps.go.id` 41, `imf.org` 33, `ibge.gov.br` 32, `psa.gov.ph` 31.
  Then `canada.ca` 14, `inegi.org.mx` 13, `bsp.gov.ph` 11, `bls.gov` 10,
  and a 102-host tail of 1-6 each.
- **162 edges cite no URL at all — every one in a `*-wiring-grok-2026-08`
  slice**, ten files (mexico 30, andean 25, ae-sa 20, ar-cl 20, ir-iq-tr-sy
  17, jp-kr 16, taiwan 13, indonesia 10, ph-vn-th-mm 8, af-ye-sd-so 3).
  Their basis text still carries the quote; only the citation was lost.

**Quote backfill re-run corpus-wide, still proposals-only.** 1,491 edges
carry no quoted span; **213 have a candidate sentence**, 852 are readable
with nothing qualifying, 426 unreadable. In `Claude
outputs/quote-backfill-batch2-2026-09-03.json`. Nothing written, no policy
invented — see §3 item 1.

**One grader change: `--skip-graded`** (selection only — the grade table,
matching and naming helpers untouched). Batching by slice file re-selects
edges an earlier batch already graded, and a host that is merely down today
would rewrite an A as a C.

**`evidence-cache/` is 1,670 documents / 773 KB actual bytes** — the ruling-1
projection was right. `du -sh` says 6.8 MB and is wrong (block rounding).

**The direction criterion is still never checked.** An A is a proposal a
reviewer can spot-check.

**Everything else unchanged**: round 2's grade-driven opacity / A-only
ranking cut / `view.minGrade` (still default `C`) / `rankByLegalBasis` /
self-citation scoped to `cites`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE`
0.8; drift watchdog + `__meshes`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Rule on who accepts a backfilled quote** (unchanged from last round,
   now with 213 candidates instead of 25). Ranked: (a) an agent reviews by
   slice; (b) you review the four standards only; (c) auto-accept the top
   candidate behind a new `evidence_quote_source` schema field so a
   machine-found quote stays distinguishable — I would not do it unmarked.
2. Commit rounds 3a, 3b and 3c. 3c touches: `scripts/grade-evidence.ts`
   (`--skip-graded`), all 347 `src/data/research/*.json`, `evidence-cache/`
   (1,670 files), `notes/grader-batch2-2026-09-03.md`,
   `notes/Midvamp - Revamp.md` (§4 order changes), `PLAYBOOK.md` (three new
   §6 traps), `Claude outputs/grade-batch2-*.{json,txt}` +
   `quote-backfill-batch2-2026-09-03.json`.
3. Ruling **7** now has the full list: **131 dead-URL edges**, 58 of them one
   dead host. Fix, drop, or leave graded C.
4. Browser pass — but read §4 of the plan first: three of the four biggest
   hosts already have a PLAYBOOK §6 workaround, so ~106 edges may need a
   build round rather than your time.
5. Still open from the audit: **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder), **Q19** (paste the two
   08-30/31 audit reports into `archive/audits/`).
6. Empty `_to_delete/` and `tmp_work/` when convenient (tmp_work now holds
   six stale staging zips).
7. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Per-host fetch strategies in the grader** — wire PLAYBOOK §6's known
   workarounds for `bps.go.id`, `ibge.gov.br` and `imf.org` into `getDoc`,
   re-grade those ~106 edges. Cheapest remaining move; shrinks the browser
   list before anyone books browser time.
2. Quote-backfill review, once Thomas rules on item 1 above.
3. **Re-research the 162 no-URL edges** — ten Grok wiring slices, quotes
   already in `basis`, only the citation missing. Bounded.
4. `_dropped` lead re-evaluation (plan §4 step 5) — still not built.
5. Flip `view.minGrade` default to A — **after** 1-3, not before (8.3% A).
6. DSBB/ESMS scripted import.
7. Link batching (merged geometry → instanced photons).
8. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+
   seeds, `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION` by
   spread, couple galaxy pull. Kept separate per Thomas's Q17 ruling.
9. Housekeeping when convenient: doc fixes under hygiene (README:130,
   REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37); write
   `notes/mint-2026-08-20.md` then Grok folder per Q18; retire
   `check-urls.ts` into the grader — the cache header now records status,
   final URL and fetch time for every evidence URL.

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
