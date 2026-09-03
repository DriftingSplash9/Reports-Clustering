# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 1, schema + validator, built + verified)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
`REPORTS.md` (design doc) → project memory
`schema_validator_round_2026-09-03` (this round's story, incl. the
legal_basis validator catching two kind mis-backfills) → project memory
`midvamp-round-0-view-renderer` (previous round). Git status: never
state it (PLAYBOOK rule 1).

---

## 2. Current state

**Round 1 (schema + validator) is built and verified, not yet committed
by Thomas.** Corpus: **3,341 reports / 2,736 dependencies** (was
3,351/2,748). `tsc --noEmit` clean, `npm run validate` 0 errors,
`npm run build` clean, `tsx scripts/test-logic.ts` 123/123. Verified
twice: once in a sandbox copy, then again from a fresh zip of the actual
device files (not just the sandbox) after every fix was mirrored back —
sha256 confirmed identical on every touched file. Full story in project
memory `schema_validator_round_2026-09-03`.

**Schema additions** (`src/lib/types.ts`): `Report.kind: 'publication' |
'standard' | 'instrument'` (required, with cadence rules in `validate()`
— publication needs `releases_per_year`, instrument forbids it, standard
is unconstrained). `Dependency.evidence_grade?: 'A'|'B'|'C'` (absent =
C) + `evidence_quote?` (required for A) + `mutual?: boolean`. New
`RelationshipType` `'legal_basis'` (weight 0.5) with two validator
rules: instrument→instrument requires the target to carry a second edge
(never mint an Act because a regulation cites it), and a live
bidirectional (A→B)+(B→A) pair is an error unless both sides are
`mutual: true`. The three evidence warnings (no URL / bare homepage /
index page) are now errors for grade-A edges — currently inert, all
2,736 live edges are grade C (0 A, 0 B); the grader is round 3.
`isIndexPage()` widened (per-host list). `isSelfCitation()` added to
`graph.ts` (computed, informational only this round — 566/2,736 edges
share a publisher; round 2 uses it for the PageRank discount).

**Corpus migration** (`notes/schema-validator-round-2026-09-03-
migration.py`, run once against all 347 research files): `kind`
backfilled everywhere, 5 reversed JP/KR edges → `_dropped`
(`wrong-direction`), 2 BR edges → `_dropped` (`deferred`), `mutual`
flags on genuine bidirectional pairs, `et-cpi` merged into
`et-ess-cpi`, BRICS JSP family + BW/LS/MU auditor-general report
editions folded onto series nodes (13 retired — full record in
`notes/schema-validator-round-2026-09-03-fold-editions.json`),
`methodology_depends_on` retyped to `legal_basis` wherever the target's
`kind` is `instrument`.

**What the new validator rule then caught, post-migration:** the first
full validate surfaced 16 errors, all the new instrument-mint rule. Two
were genuine `kind` mis-backfills the rule exposed as a side effect —
`vn-population` (a real census/estimates publication, wrongly defaulted
to `instrument` for lacking a confirmed `releases_per_year` — fixed to
`publication` with a nominal `releases_per_year: 1`, read off its own
title) and `imf-psds-guide` (a methodological manual, not a legal
instrument — fixed to `kind: 'standard'`). The other 14 were genuine,
correctly-classified leaf-instrument citations (laws/decrees a single
document cites and nothing else in the corpus touches) — retyped
`legal_basis` → `cites` per the rule's own stated intent, since minting
a second edge to satisfy the check would be research, out of scope here.
Full list of all 16 and the reasoning in project memory. **Backfill
lesson for later rounds**: "no releases_per_year ⇒ instrument" is a
decent default but false-positives on real publications with an
unconfirmed cadence — `_cadence_resolution: "unknown"` is the tell.

**Everything else from the pre-round-0 audit is unchanged and still
open** (grader, evidence cache, browser pass, coverage bias, dead/WAF
URLs, repo hygiene, Grok folder) — see project memory
`audit-2026-09-02-independent-technical` and Todo below.
`INT_LINK_STIFFNESS = 0`, INT anchor folding, `CORE_PERCENTILE` 0.8,
drift watchdog + `__meshes`, round 0's view/renderer changes are all
otherwise unchanged.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Commit round 0 AND round 1 (never git-stated by an agent — PLAYBOOK
   rule 1). Round 1 touches: `src/lib/types.ts`, `src/lib/graph.ts`,
   `src/lib/hierarchy.ts`, `scripts/validate-data.ts`,
   `scripts/test-logic.ts`, `src/data/reports.ts`, all 347 files under
   `src/data/research/` (migration touched all of them; 15 of those
   touched again for the post-validation legal_basis/kind fixes above),
   `public/corpus-data.json`, `notes/schema-validator-round-2026-09-03-*`
   (new).
2. Still open from the audit: ruling **7** (37 dead-URL edges now or in
   the grader), **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder: delete+commit if tracked,
   else archive) and **Q19** (paste the two 08-30/31 audit reports into
   `archive/audits/` — different Cowork project memory than this one).
3. Empty `_to_delete/` when convenient — it's accumulated several
   sessions' zip artifacts (listed in `_to_delete/README.md`), none of
   them needed once this round is confirmed committed.
4. Browser pass on the WAF/egress evidence list (imf.org,
   legislation.govt.nz, canada.ca, boi.org.il, `.gov.in`, `.gov.br`,
   s-circabc) — wait for round 3's grader to produce the list.
5. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Renderer grade pass (NEXT).** Intensities (A as today, B ~0.35 +
   pulses, C hidden / ~0.08 no pulses when shown), A-only ranking +
   `isSelfCitation()` discount, `view.minGrade` (default C) with reheat
   + refit (PLAYBOOK rule 18), legal-basis hue + "rank by legal basis"
   toggle (`view.rankByLegalBasis`, default on — Thomas's Q4 call), the
   per-grade counts on the node card. Every edge is currently grade C,
   so this round is UI/renderer plumbing, not yet visually different
   from today until round 3 assigns real grades.
2. **Grader.** `scripts/grade-evidence.ts` + committed `evidence-cache/`
   (gz, 250 KB cap). Dry-run on `Claude outputs/audit-2026-09-02-
   evidence-sample-56.json` — must reproduce the audit's grades. Batch 1:
   slices feeding `sna-2008`, `esa-2010`, `imf-e-gdds`, `imf-sdds`. Emit
   the browser-pass list.
3. Flip `view.minGrade` default to A. Browser pass with Thomas.
4. `_dropped` lead re-evaluation by slice; DSBB/ESMS scripted import.
5. Link batching (merged geometry → instanced photons).
6. Cluster-repulsion force sub-round (measured, `measure-forces.ts`,
   2+ seeds, `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION`
   by spread, couple galaxy pull. Kept separate per Thomas's Q17 ruling.
7. Housekeeping when convenient: doc fixes under hygiene (README:130,
   REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37); write
   `notes/mint-2026-08-20.md` then Grok folder per Q18; `check-urls.ts`
   → `evidence_url` with a timestamp.

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
