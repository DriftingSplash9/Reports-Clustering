# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 3b — cache rework, batch 1 graded and
written, quote backfill built)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/grader-batch1-2026-09-03.md` (this round) →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still
current) → project memory `grader_dry_run_2026-09-03`, then
`renderer_grade_round2_2026-09-03` and `schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-2 and the self-citation fix are committed. Round 3a and 3b are
built and verified, not committed.** Corpus **3,341 reports / 2,736
dependencies**, now **42 A · 115 B · 2,579 C**. `npm run validate` exits 0
with the A grades in place — an A turns the three evidence warnings into
errors, so that is a real check. `tsc --noEmit` clean, 123/123 logic tests,
grader `--selftest` 18/18.

**Cache reworked to Thomas's ruling** — two stores. `evidence-cache/` is the
COMMITTED record: header (url, fetched-at, status, final URL, content-type,
extractor, block, full-text length + sha256) plus the verbatim passage each
edge's quote was found in, a sentence either side, labelled with that edge's
grade. `.evidence-fulltext/` is gitignored local scratch holding whole
documents so re-grades don't refetch. **299 documents = 131 KB, projecting
~0.73 MB at ~1,700 URLs** (was ~24 MB). Grades unchanged by the rework —
the audit sample still scores 35/56 with 1 looser. The cost: the committed
record can't answer a question nobody asked at grading time; re-grading
against a *different* quote needs the page again.

**Batch 1 written**: every live edge into `sna-2008`, `esa-2010`,
`imf-e-gdds`, `imf-sdds` — 304 edges, 253 documents, 84 slice files.
**A 42 (14%) · B 115 (38%) · C 147 (48%).** The C's are dominated by
research debt this batch has now measured exactly: **40 edges cite no URL at
all**, **30 cite a URL that is genuinely 404/500/504** (the material for
audit ruling 7 — list in `Claude outputs/grade-batch1-2026-09-03.json`), 60
carry no quoted span, 44 are unreadable from here.

**Browser-pass list for these four nodes — 44 edges, one host dominates**:
`imf.org` 21 (Akamai deny; PLAYBOOK §6 has the Google-viewer workaround),
`psa.gov.ph` 5, `ibge.gov.br` 3, `nso.gov.mt` 2, then 13 hosts with one
edge each. One imf.org session moves 21 of the 44.

**Quote backfill built** (`--find-quotes`): for an edge whose `basis` has no
quoted span, it reads the document the edge already cites and proposes
sentences that could serve as `evidence_quote` — must name the target
artefact (or, for a standard, its designator: "ESA 2010", "the 2008 SNA")
AND carry a dependency phrase, in eight languages. On batch 1's 123
no-quoted-span edges: **25 have a candidate, 46 are readable with nothing
qualifying, 52 unreadable.** Proposals in
`Claude outputs/quote-backfill-2026-09-03.json`. **It writes nothing** — if
the grader picks the quote and then grades on finding it, an A means only
"the script liked a sentence twice". A reader has to accept it; see §3
item 1.

**The direction criterion is still never checked** — the script grades the
three mechanical bars and reports `direction: unchecked`. An A is a proposal
a reviewer can spot-check.

**Everything else unchanged**: round 2's grade-driven opacity / A-only
ranking cut / `view.minGrade` (still default `C`) / `rankByLegalBasis` /
self-citation scoped to `cites`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE`
0.8; drift watchdog + `__meshes`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Rule on who accepts a backfilled quote.** Ranked: (a) an agent reviews
   by slice — reading one sentence and judging direction is exactly the
   judgement the grader refuses to fake, and ~25 candidates per 300 edges
   means a few hundred decisions corpus-wide; (b) you review the four
   standards only, nothing else; (c) auto-accept the top candidate, which
   needs a schema field (`evidence_quote_source`) so an A resting on a
   machine-found quote stays distinguishable — I would not do it unmarked.
2. Commit rounds 3a and 3b. 3b touches: `scripts/grade-evidence.ts`,
   `.gitignore` (+`.evidence-fulltext/`), `evidence-cache/` (299 files, now
   the window format — the 54 from 3a are rewritten in place),
   `src/data/research/*.json` (84 files, `evidence_grade` + `evidence_quote`
   on A edges only), `notes/grader-batch1-2026-09-03.md`, `Claude
   outputs/grade-batch1-2026-09-03.{txt,json}` + `quote-backfill-2026-09-03.json`,
   `PLAYBOOK.md` (one new zip/dotfile trap).
3. Ruling **7** is now actionable with a real list: 30 dead-URL edges into
   the four standards, named in the batch-1 JSON. Fix, drop, or leave graded C.
4. Browser pass — start with imf.org (21 edges in one session).
5. Still open from the audit: **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder), **Q19** (paste the two
   08-30/31 audit reports into `archive/audits/`).
6. Empty `_to_delete/` and `tmp_work/` when convenient.
7. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Batch 2 — the rest of the corpus, by slice family**, `--write`,
   validating between batches. 2,432 edges still ungraded; batch 1's 304
   took ~2 minutes of fetching at concurrency 10, so this is hours, not
   days. Order per plan §4: Grok-derived slices next, hand-researched
   branches last.
2. Quote-backfill review, once Thomas rules on item 1 above.
3. `_dropped` lead re-evaluation (plan §4 step 5) — still not built.
4. Flip `view.minGrade` default to A. Browser pass with Thomas.
5. DSBB/ESMS scripted import.
6. Link batching (merged geometry → instanced photons).
7. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+
   seeds, `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION` by
   spread, couple galaxy pull. Kept separate per Thomas's Q17 ruling.
8. Housekeeping when convenient: doc fixes under hygiene (README:130,
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
