# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 3 first half — grader built and dry-run)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/grader-dry-run-2026-09-03.md` (this round's report, incl. the five
findings below) → project memory `grader_dry_run_2026-09-03`, then
`renderer_grade_round2_2026-09-03` and `schema_validator_round_2026-09-03`
for the two rounds before it. Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0, 1, 2 and now the first half of round 3 are built and verified,
none committed by Thomas.** Corpus **3,341 reports / 2,736 dependencies**,
every edge still reads `C` — **no grades have been written to the corpus**
(Thomas's call: build + dry-run, then stop). `npm run validate` now **exits
0** — the JP dangling-caveat bug is fixed, see below. `tsc --noEmit` clean,
123/123 logic tests, grader `--selftest` 14/14.

**What round 3 shipped so far**: `scripts/grade-evidence.ts` — raw `curl`
(browser UA, redirect-following, `-k` retry), body-based WAF/JS-shell
detection, `pdftotext -layout` / tag-strip / `word/document.xml` extraction,
gz `evidence-cache/` with a header and a 250 KB text cap, quoted-span
extraction from free-text `basis`, accent/quote/ellipsis-tolerant matching,
artefact-vs-agency naming (title run, title lead, CJK token, legal
designator, target URL), the A/B/C table, `--write` (tested on a scratch
slice, adds only `evidence_grade`/`evidence_quote`, leaves formatting
alone), `--offline`, `--selftest`, and the browser-pass list. 54 documents
are cached.

**Dry run against the audit's own 56 (the plan's gate)**: 35/56 exact
agreement, 20 stricter, **1 looser by one grade**, and **every `A` the
script gave was also an audit PASS**. Deterministic on a cache re-run. Full
matrix, the decision table as implemented, and the reasoning are in
`notes/grader-dry-run-2026-09-03.md`; per-edge JSON in `Claude outputs/`.

**The direction criterion is never checked** — "the document states the
direction claimed" is a reading, so the script grades on the three
mechanical bars and reports `direction: unchecked` on every row. An `A` is a
proposal a reviewer can spot-check, not a verdict.

**JP dangling caveats fixed** (previous handoff's finding (b)): the three
stale `caveat` notes in `jp-kr-wiring-grok-2026-08.json` are retyped to
`wrong-direction` — what each note's own text says — with a dated header and
the original text kept verbatim beneath. Kept rather than deleted: their
evidence is independent of the migrated entries in
`jp-japan-grok-2026-08.json`. `caveat` 45→42, `wrong-direction` 26→29.

**Everything else unchanged**: round 2's grade-driven opacity / A-only
ranking cut / `view.minGrade` (still default `C`) / `rankByLegalBasis`;
`INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE` 0.8; drift watchdog + `__meshes`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Commit rounds 0, 1, 2 and 3a (never git-stated by an agent — PLAYBOOK
   rule 1). Round 3a touches: `scripts/grade-evidence.ts` (new),
   `evidence-cache/` (new, 54 files, 888 KB), `notes/grader-dry-run-2026-09-03.md`
   (new), `Claude outputs/grade-dry-run-2026-09-03.{txt,json}` (new),
   `src/data/research/jp-kr-wiring-grok-2026-08.json` (3 `_dropped` reasons).
   Earlier rounds' file lists are in the archived handoffs.
2. **New**: rule on the committed cache size. 54 docs = 888 KB gz; at ~1,700
   distinct evidence URLs that projects to **~24 MB in git**. Keep the 250 KB
   cap (`TEXT_CAP_BYTES`), lower it, or store only the matched window + a
   hash. This decides how batch 1 runs, so it comes first.
3. **New**: `no quoted span in basis` caps an edge at B forever — 13 of the
   56 sampled edges are in that class, and corpus-wide it will be the
   biggest one. Promoting them needs a quote-backfill research round, not a
   looser grader. Say whether that round exists.
4. **New**: A-share on the sample is 10/56 (18%). If that holds, flipping
   `view.minGrade` to A (plan §9 item 4) empties most of the graph until the
   browser pass and the quote backfill have run.
5. Still open: finding (a) from round 2 — the self-citation discount's real
   magnitude (`eu-reg-223-2009` #9→#1905, `cpa` #10→#2399, ~a dozen more)
   before it ships live.
6. Still open from the audit: ruling **7** (37 dead-URL edges now or in the
   grader), **13** (empty `_to_delete/`, move the two `archive/*.tar.gz`);
   **Q18** (Grok folder), **Q19** (paste the two 08-30/31 audit reports into
   `archive/audits/`).
7. Empty `_to_delete/` and `tmp_work/` when convenient — both hold this and
   earlier sessions' zip artefacts, none needed once these rounds are
   committed.
8. Browser pass on the WAF/egress evidence list — the corpus-wide list comes
   out of batch 1; the 56-edge sample already names `archive.stats.govt.nz`,
   `localgovernment.vic.gov.au`, `boi.org.il`, `canada.ca`, `imf.org`.
9. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Batch 1 of the grader (NEXT).** Slices feeding `sna-2008`, `esa-2010`,
   `imf-e-gdds`, `imf-sdds`, with `--write`, validating between slices;
   emit the corpus-wide browser-pass list. Blocked on Thomas's cache-size
   ruling (item 2 above) — the answer changes what gets committed.
2. `_dropped` lead re-evaluation (plan §4 step 5) — not built yet; the
   script grades live edges and the sample only.
3. Flip `view.minGrade` default to A. Browser pass with Thomas — and show
   him the round-2 self-citation ranking numbers alongside it.
4. DSBB/ESMS scripted import.
5. Link batching (merged geometry → instanced photons).
6. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+
   seeds, `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION` by
   spread, couple galaxy pull. Kept separate per Thomas's Q17 ruling.
7. Housekeeping when convenient: doc fixes under hygiene (README:130,
   REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37); write
   `notes/mint-2026-08-20.md` then Grok folder per Q18; `check-urls.ts` →
   `evidence_url` with a timestamp (the grader now records status, final
   URL and fetch time in the cache header — fold the two rather than
   keeping both).

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
