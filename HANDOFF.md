# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 3d — per-host fetch strategies in the grader)

---

## 1. Read next

`PLAYBOOK.md` (§6 has six new traps and two corrected entries) →
`notes/Midvamp - Revamp.md` (the plan of record) →
`notes/grader-host-strategies-2026-09-03.md` (this round) →
`notes/grader-batch2-2026-09-03.md` → `notes/grader-batch1-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
project memory `grader_host_strategies_2026-09-03`, then
`grader_batch2_2026-09-03`, `grader_batch1_2026-09-03`,
`grader_dry_run_2026-09-03`, `renderer_grade_round2_2026-09-03`,
`schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-2 and the self-citation fix are committed. Rounds 3a, 3b, 3c and 3d
are built and verified, not committed.** Corpus **3,341 reports / 2,736
dependencies**, unchanged.

**Every live edge carries an `evidence_grade`: 248 A · 1,317 B · 1,163 C**
across the 2,728 research-slice edges (the 8 seed-file edges are deliberately
never machine-written). A-share **9.1%**, up from 8.3%. `npm run validate`
exits 0 with all 248 A grades in — an A turns the three evidence warnings into
errors, so that is a real check. `tsc --noEmit` clean, 123/123 logic tests,
grader `--selftest` **26/26**.

**Round 3d re-graded the 422 unreadable edges after teaching `getDoc` fetch
strategies. 187 documents read, 114 of them only via an archived snapshot;
the browser-pass list is 422 → 232 edges across 71 hosts.** Grades on those
422: 22 A · 116 B · 284 C (was 1 B · 421 C).

**None of PLAYBOOK §6's three documented workarounds was scriptable** —
BPS's `web-api` link is signed from the challenged page's DOM, IBGE's ftp
mirror carries documents while the corpus cites landing pages, imf.org's
Google-viewer route needs a browser. §6's imf.org entry was also **backwards**
(the `/-/media/` PDFs read fine with curl; the press releases are what Akamai
denies) and its `biblioteca./concla.` half is dead. Both corrected.

**Two things did work, and both are now standing knowledge (PLAYBOOK §6):**
- **The cloud sandbox's egress proxy is part of the wall.** The bridge VM read
  20 edges the sandbox could not, and `web.archive.org` is blocked from the
  sandbox outright. `curl_cffi` and headless Chromium both fail through that
  proxy — **there is no browser in the cloud sandbox.**
- **The whole toolchain runs natively in the bridge VM** (copy the repo to
  `$HOME` scratch, `npm install`, symlink `src/data/research/` and
  `evidence-cache/` back into the repo). No staging zip, no §6 zip traps, and a
  home network instead of the proxy. This is now the preferred way to run
  `validate`/`tsx`/the grader.

**Grader changes** (`--selftest` and `tsc` clean): `fetchOne` = one direct
attempt + a strategy table, with an archived-snapshot strategy that may rescue
`wall`/`network`/`empty` but **never a 404**; `Fetched.via` records the
substitution in the committed evidence-cache header; `--edges <path[#key]>` (the
re-grade selector — `--skip-graded` is the forward-pass one and selects nothing
here); `--refetch`; `--no-snapshot`; the BROWSER PASS block now counts the
`empty` class it was silently dropping (62 edges).

**Everything else unchanged**: round 2's grade-driven opacity / A-only ranking
cut / `view.minGrade` (still default `C`) / `rankByLegalBasis` / self-citation
scoped to `cites`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE` 0.8; drift
watchdog + `__meshes`. **The direction criterion is still never checked** — an A
is a proposal a reviewer can spot-check.

**Research debt, corpus-wide** (per-edge JSON in `Claude outputs/`): **131 dead
URLs** (`s-circabc.europa.eu` is 58 of them, one dead host);
**232 unreadable** — `grade-browser-pass-2026-09-03.json`, re-measured, 145
wall / 62 JavaScript shell / 25 network; **162 no-URL edges**, every one in a
`*-wiring-grok-2026-08` slice. **213 candidate backfill quotes** still
proposals-only in `quote-backfill-batch2-2026-09-03.json`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Backfilled quotes — you ruled "an agent reviews by slice" (2026-09-03).**
   213 decisions, not yet started; it is [Agent] item 1 below now.
2. **New ruling needed: is an A read from an archived snapshot an A?** 15 of
   round 3d's 22 new A grades were read from a Wayback copy of the cited URL,
   not the live page. Nothing was loosened to get them and every one is recorded
   with `via: wayback <timestamp>` in `evidence-cache/`, but "the quote was in
   this document on 2026-03-10" is a slightly different claim from "the quote is
   in this document", and today they grade the same. Options: leave as is;
   cap a snapshot-read edge at B; or add a schema field so the two stay
   distinguishable the way `evidence_quote_source` would for backfilled quotes.
3. Commit rounds 3a-3d. 3d touches: `scripts/grade-evidence.ts`, 101
   `src/data/research/*.json`, `evidence-cache/` (300 records rewritten),
   `PLAYBOOK.md`, `notes/Midvamp - Revamp.md`,
   `notes/grader-host-strategies-2026-09-03.md`, `HANDOFF.md` (+ its archive
   copy), `Claude outputs/grade-hoststrategy-2026-09-03.{json,txt}` and
   `grade-browser-pass-2026-09-03.json`.
4. Ruling **7**: **131 dead-URL edges**, 58 of them one dead host. Fix, drop, or
   leave graded C.
5. **Browser pass, re-scoped: 232 edges, and 59 of them are two hosts.**
   `bps.go.id` 35 and `psa.gov.ph` 24 are worth more than the other 69 hosts
   combined — BPS especially, which has no archived copies at all. One
   Claude-in-Chrome session each.
6. Still open from the audit: **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder), **Q19** (paste the two
   08-30/31 audit reports into `archive/audits/`).
7. Empty `_to_delete/` (now also holds a stale `.evidence-fulltext` store) and
   `tmp_work/` when convenient.
8. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Quote-backfill review by slice** — Thomas's ruling (a). 213 candidates in
   `Claude outputs/quote-backfill-batch2-2026-09-03.json`; read the sentence,
   judge whether it supports the claimed direction, accept or reject per edge.
   This is the judgement the grader deliberately refuses to fake, and it is the
   single biggest lever on the A-share.
2. **Re-research the 162 no-URL edges** — ten Grok wiring slices, quotes already
   in `basis`, only the citation missing. Bounded.
3. `_dropped` lead re-evaluation (plan §4 step 5) — still not built.
4. Flip `view.minGrade` default to A — **after** 1-2, not before (9.1% A).
5. DSBB/ESMS scripted import.
6. Link batching (merged geometry → instanced photons).
7. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
   `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION` by spread, couple
   galaxy pull. Kept separate per Thomas's Q17 ruling.
8. Housekeeping when convenient: doc fixes under hygiene (README:130,
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
