# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (browser pass, round 2 — the rest of the list)

---

## 1. Read next

`PLAYBOOK.md` (§6: whole-page `get_page_text`, the tab-panel rule, in-browser
DOCX/PDF/OCR, the extension's permission list, and what the matcher already
handles; §7: a Chrome read is a direct read) →
`notes/browser-pass-round2-2026-09-04.md` (this round) →
`notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` (Rounds B and C are still the queue) →
`notes/browser-pass-bps-psa-2026-09-04.md` →
`notes/direction-flip-and-dead-url-drop-2026-09-04.md` →
`notes/roundA-nourl-reresearch-2026-09-03.md` →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
project memory, newest first: `browser_pass_round2_2026-09-04`,
`browser_pass_bps_psa_2026-09-04`, `direction_flips_dead_url_drops_2026-09-04`,
then the five `grader_*` 2026-09-03 entries.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0–5 and A are committed (Thomas, 2026-09-04). The 2026-09-04
flip/drop round, the bps/psa browser round and this round are built and
verified, not committed.** Corpus **3,341 reports / 2,633 dependencies**.

**Grades: 538 A · 1,342 B · 743 C** (+10 seed edges never graded). A-share
**20.4%**, up from 18.8%. `npm run validate` exits 0, `tsc --noEmit` clean,
123/123 logic tests, grader selftest **33/33**. `public/corpus-data.json`
regenerated. The validator's "cites no evidence_url" warning class is still 0.
**No script changed in round 2** (`grade-evidence.ts` was touched in the br-ibge-cnae/OCR-cap sub-round below).

**Browser pass, round 2 — 134 of the remaining 173 edges decided: 85 accepted,
47 refused with a reason each, 2 blocked by the browser extension. 39 not
reached.** Grades written **C→A 41, C→B 38, B→A 2, no regressions**. Per-edge:
`Claude outputs/browser-pass-round2-2026-09-04.json`; flags for you:
`…-flags-2026-09-04.json`; grade runs: `grade-browserpass-round2/3/4-2026-09-04.json`.

**The refusals are a corpus problem, not a fetch problem.** 39 of 47 are edges
whose cited document does not say what the basis claims — overwhelmingly
Grok-family. The dominant shape is the **chained two-hop**: six IBGE surveys →
`isic` all cite the CNAE page, which carries the CNAE↔ISIC synchronisation
sentence but never names the survey.

**A claim I made and then disproved, recorded so nobody repeats it**: `...`
splices and straight-vs-curly apostrophes are ALREADY handled
(`normalizeForMatch` folds quote characters and strips accents; `locateQuote`
splits on the ellipsis and scores each fragment). Three "broken" originals
re-graded **A at coverage 1.0** and were restored. The real defect is the
researcher's citation text appended inside the quote — two more exist corpus-wide
(`pk-`/`bt-national-accounts → imf-e-gdds`, both B).

**Everything else unchanged**: round 5's revert refinement; round 4's
`spansForEdge` fix and improvements-only rule; round 3d's fetch strategies;
round 2's grade-driven opacity / A-only ranking cut / `view.minGrade` (still
default `C`) / `rankByLegalBasis`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE`
0.8; drift watchdog + `__meshes`. Two reports remain ISOLATED (shelved):
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

**Research debt, corpus-wide**: 0 confirmed-dead URLs; 0 no-URL edges;
**browser pass 173 → 39 edges** (list in this round's JSON → `never_attempted`),
of which roughly a dozen are blocked only by the extension's permission list;
**17 BPS edges blocked on citation, not access**; 28 `ess-peer-review-final-report`
edges and 12 EDP-inventory fragments still owed a reread (Round C); ~15 CJK
edges nominally on the matcher (Round B — but see §3).

---

**Also this round (uncommitted): `br-ibge-cnae` minted, OCR reads now cap at
B.** Item 3: new `br-ibge-cnae` node, A-grade edge to `isic` (CNAE<->ISIC
Rev.4 sentence, verified live in Chrome), six of the nine refused
`br-ibge-* -> isic` edges re-pointed at it with their own page's
CNAE-adoption sentence (pim-pf, pia-empresa, pia-produto, pas, pac, pmc; paic
and the already-B pimes/pintec untouched). Item 4: `routeCapsGrade()` now
caps `via: ocr ...` at B like `wayback`; the three A-grade OCR edges from
round 2 (Angola/Benin/Gambia) recapped to B. `gen`/`tsc`/`validate` clean in
a fresh sandbox. Grades hand-set per the Chrome-read rule, not yet re-run
through the corpus-wide grader — a `--edges` confirmation pass is worth doing
before or after commit.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Widen the Chrome extension's site permissions.** **Five hosts / six edges
   are CONFIRMED refused by the extension, not by the site** — `wam.ae`,
   `gov.il`, `pc.odisha.gov.in`, `descg.gov.in`, `slovak.statistics.sk`
   ("Navigation to this domain is not allowed" / "Permission denied for
   JavaScript execution on this domain"). The other 33 unreached edges were not
   individually tested, so an unknown share of them is the same thing rather
   than a real wall. One setting; each unblocked host is then one call.
   **Likely the biggest lever left on the browser queue.**
2. **Ruling owed: BPS landing page vs its own PDF.** Unchanged — 17 edges whose
   evidence is inside a PDF BPS serves only through a signed token with no
   stable URL. Listed in `Claude outputs/browser-pass-bps-psa-2026-09-04.json`
   → `refused`.
3. **Four smaller calls**, all in `…-flags-2026-09-04.json`: `mx-cscm → mx-scnm`
   (its page evidences `sna-2008` instead); three directions flagged not flipped
   (`br-lei-5534-1968 → br-ibge-censo-demografico`, `mt-edp-inventory →
   mt-nso-government-finance`, `id-democracy-index → id-rpjmn`);
   `ndb-mou-brics-icm-2022 → brics-icm-cooperation-framework-2011` — the basis
   names a **2016** predecessor, not 2011; and
   `yt-budget-main-estimates → territorial-formula-financing`, evidenced in a
   different publication.
4. Commit the four uncommitted 2026-09-04 rounds. This round touches
   ~30 `src/data/research/*.json`, `public/corpus-data.json`,
   `evidence-cache/`, `PLAYBOOK.md`, `HANDOFF.md` (+ archive copy),
   `notes/browser-pass-round2-2026-09-04.md`, four `Claude outputs/*.json`,
   plus (br-ibge-cnae/OCR-cap round) `scripts/grade-evidence.ts` and five more
   `src/data/research/*.json` (br-brazil-grok-2026-08, brics-g4-2026-08-22,
   af-angola-autarquias, af-benin-commune-finance, gm-g23-municipal).
5. Real-GPU number for the unfolded Everything tier (still owed): a REAL
   browser, not the sandbox's swiftshader-software Playwright (PLAYBOOK rule
   7 — bloom/pixel numbers from that are untrustworthy). Everything tier,
   fully unfolded, camera auto-rotating and settled; read FPS off DevTools'
   own meter (or a one-line `requestAnimationFrame` counter to console). No
   actual measurement exists yet on real hardware at current corpus size.

### [Agent] — next build rounds, in this order (plan §9)

1. **Add an xlsx extractor to `getDoc`** (~30 lines: unzip
   `xl/sharedStrings.xml` + `xl/worksheets/sheet1.xml`, `t="s"` cells index
   into the shared strings). Eight browser-pass edges carry
   `empty:no-extractor` for readable spreadsheets — `anuario.ine.gob.bo`
   returns HTTP 200 to plain curl and was unzipped by hand this round.
2. **Browser pass, the last 39** — after Thomas widens the extension list.
   Method is PLAYBOOK §6. Also still owed from before: re-grade the 2
   `podaci.dzs.hr` edges (host is back) and re-fetch the 4 rosstat/sis.gov.eg
   edges from a network that reaches them.
3. **Housekeeping Thomas delegated**: audit items **13** (empty `_to_delete/`,
   move the two `archive/*.tar.gz`), **Q18** (Grok folder), **Q19** (paste the
   two 08-30/31 audit reports into `archive/audits/`); empty `_to_delete/` and
   `tmp_work/` — agents can only `mv` into `_to_delete/` (rule 6), so "empty"
   means: list what's there for Thomas.
4. **CJK matcher (Round B) — re-measure the premise first.** Four Japanese
   statutes and two Chinese NBS quotes were written this round and **all six
   matched**: exact substring carries a CJK quote copied verbatim off the page.
   The gap bites drifted quotes only. Recount before building the n-gram path.
5. **Companion-document reread, bounded** (Round C): the surviving
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   surviving EDP-inventory fragments — recount first, 58 circabc edges left.
6. **Long-document quotes**: the grader matches against the capped 250 KB text
   (PLAYBOOK §6). Raise the cap for matching only, or make the revert rule
   check `truncated` first — 2 INEI edges are C for this.
7. `_dropped` lead re-evaluation (plan §4 step 5) — still not built. A re-cite
   pass on `s-circabc.europa.eu` (58, one host) would recover most in one go.
8. Flip `view.minGrade` default to A — no-URL and dead-URL classes are closed
   and A-share is 20.4%; your call whether Round B/C go first.
9. DSBB/ESMS scripted import (`getBaseSummaryofMethodologies` is readable and
   already carries 50 corpus citations; category codes differ by country).
10. Link batching (merged geometry → instanced photons).
11. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
    `onscreen`). Kept separate per Thomas's Q17 ruling.
12. Doc fixes under hygiene (README:130, REPORTS:9–32, PLAYBOOK:18–20,
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
