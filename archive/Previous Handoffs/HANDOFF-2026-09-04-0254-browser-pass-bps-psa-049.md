# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (browser pass, first slice: bps.go.id + psa.gov.ph)

---

## 1. Read next

`PLAYBOOK.md` (§6: the Claude-in-Chrome capture method and the BPS
landing-page/PDF citation wall; §7: a Chrome read is a direct read) →
`notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` (Rounds B and C are still the queue)
→ `notes/browser-pass-bps-psa-2026-09-04.md` (this round) →
`notes/direction-flip-and-dead-url-drop-2026-09-04.md` →
`notes/roundA-nourl-reresearch-2026-09-03.md` →
`notes/grader-single-quote-backfill-2026-09-03.md` →
`notes/grader-quote-backfill-2026-09-03.md` →
`notes/grader-host-strategies-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
project memory, newest first: `browser_pass_bps_psa_2026-09-04`,
`direction_flips_dead_url_drops_2026-09-04`, then the five `grader_*`
2026-09-03 entries, `renderer_grade_round2_2026-09-03` and
`schema_validator_round_2026-09-03`.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0–5 and A are committed (Thomas, 2026-09-04). The 2026-09-04
flip/drop round and this browser-pass round are built and verified, not
committed.** Corpus **3,341 reports / 2,633 dependencies**.

**Grades: 495 A · 1,302 B · 836 C.** A-share **18.8%**, up from 17.9%.
`npm run validate` exits 0, `tsc --noEmit` clean, 123/123 logic tests, grader
selftest **33/33** (was 31). `public/corpus-data.json` regenerated. The
validator's "cites no evidence_url" warning class is still 0.

**Browser pass, first slice: bps.go.id + psa.gov.ph closed** — 59 edges over
34 URLs, read in Thomas's Chrome. **37 quotes accepted, 22 refused with a
reason each; 41 grades written (25 A, 16 B), 18 stayed C, no regressions.**
Per-edge: `Claude outputs/browser-pass-bps-psa-2026-09-04.json`; grades:
`Claude outputs/grade-browserpass-2026-09-04.json`.
**No host defeated Chrome** — psa.gov.ph never challenges a real browser,
bps.go.id clears its interstitial in 6–10 s. The refusals are a **citation**
problem, not a readability one (see Todo [Thomas] 1).

**Script change** (the first since round 5): `routeCapsGrade(via)` in
`scripts/grade-evidence.ts` — only a `wayback` route caps a grade at B; a
Chrome read of the cited URL grades as the direct read it is (Thomas's
ruling, PLAYBOOK §7). The run report now buckets by route. Two selftests
added. Captured extracts live in `.evidence-fulltext/` with `via: chrome
2026-09-04` and `truncated: true`, and the committed `evidence-cache/`
records carry the route.

**Direction list and the dead-URL class are unchanged** from the flip/drop
round: 18 rows flipped in place, 93 of 131 dead URLs `_dropped`, 38 kept live
(`Claude outputs/dead-url-drops-2026-09-04.json` → `kept_live`). Two reports
remain ISOLATED (shelved): `sc-oag-annual-reports-2022-2024`,
`so-fgs-financial-governance-reports`. The direction criterion is still never
machine-checked.

**Everything else unchanged**: round 5's revert refinement; round 4's
`spansForEdge` fix and improvements-only rule; round 3d's fetch strategies and
`--edges`/`--refetch`/`--no-snapshot`; round 2's grade-driven opacity / A-only
ranking cut / `view.minGrade` (still default `C`) / `rankByLegalBasis` /
self-citation scoped to `cites`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE`
0.8; drift watchdog + `__meshes`.

**Research debt, corpus-wide**: **0 confirmed-dead URLs**; **0 no-URL edges**;
**browser pass 232 → 173 edges over ~69 hosts** (`grade-browser-pass-2026-09-03.json`
minus this round's two hosts) plus round A's six walled hosts plus the 32
non-404 rows of the old dead list; **17 BPS edges blocked on citation, not
access** (this round's refusals — they need a ruling, not a fetch); 28
`ess-peer-review-final-report` edges and 12 EDP-inventory fragments still owed
a reread (Round C); 13+2 CJK quotes stuck on the matcher (Round B).

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Ruling owed: BPS landing page vs its own PDF.** 17 edges (GHG inventory 6,
   energy balances 5, provincial CPI 2, oil/gas 2, electricity 2) have their
   evidence inside the publication PDF, which BPS serves only through a signed
   `web-api.bps.go.id/download.php?f=<token>` link with no stable URL, while
   `evidence_url` is the landing page (abstract only). Either allow a
   landing-page citation with a quote from its own downloadable PDF, marked as
   such, or those 17 stay C permanently. Listed in
   `Claude outputs/browser-pass-bps-psa-2026-09-04.json` → `refused`.
2. **Two overclaimed bases**: `ph-grdp-ncr → sna-2008` and
   `ph-grdp-calabarzon → sna-2008` cite a PDF that (read in full) never says
   "SNA 2008" and has no para 7.10. Retarget, reword, or drop.
   Also flagged there: `ph-nickel → ph-trade-partners` (shared IMTS/BOC
   provenance, not a dependency), `ph-rice`/`ph-fisheries → ph-agriculture`,
   and `id-electricity-mix`/`id-geothermal → id-pln-statistics` (the cited
   abstract sources those tables to BPS's own electricity survey).
3. Commit the 2026-09-04 flip/drop round **and** this browser-pass round.
   Browser pass touches: 5 `src/data/research/*.json` (id-unlinked-wiring
   2026-08-28 / round2 / round3, ph-unlinked-wiring 2026-08-28 / round2, plus
   grade-only writes in 2 more), `scripts/grade-evidence.ts`,
   `public/corpus-data.json`, `evidence-cache/` (28 new/updated records),
   `notes/browser-pass-bps-psa-2026-09-04.md`, two
   `Claude outputs/*-2026-09-04.json`, `PLAYBOOK.md`, `HANDOFF.md`
   (+ archive copy).
4. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Browser pass, rest of the list: 173 edges + round A's 15 walled + the 32
   kept-live non-404 rows.** Next biggest: `inegi.org.mx` (13),
   `ibge.gov.br` (12), `localgovernment.vic.gov.au` (9), `bsp.gov.ph` (9),
   `yukon.ca` (9), `mospi.gov.in` (8). Method is in PLAYBOOK §6 — it is a
   capture job: read the cited URL in Chrome, write the extract into
   `.evidence-fulltext/` with `via: chrome <date>`, re-grade with `--edges`
   (never `--refetch`). Also re-grade the 2 `podaci.dzs.hr` edges (host is
   back) and re-fetch the 4 rosstat/sis.gov.eg edges from a network that
   reaches them.
2. **Housekeeping Thomas delegated**: audit items **13** (empty `_to_delete/`,
   move the two `archive/*.tar.gz`), **Q18** (Grok folder), **Q19** (paste the
   two 08-30/31 audit reports into `archive/audits/`); empty `_to_delete/` and
   `tmp_work/` — agents can only `mv` into `_to_delete/` (rule 6), so "empty"
   means: list what's there for Thomas.
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
   dead-URL drops are all tagged as leads; a re-cite pass on
   `s-circabc.europa.eu` (58, one host) would recover most in one go.
7. Flip `view.minGrade` default to A — the no-URL and dead-URL classes are
   closed (18.8% A); your call whether Round B/C go first.
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
