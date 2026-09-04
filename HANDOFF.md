# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (round-2 flags ruled and applied)

---

## 1. Read next

`PLAYBOOK.md` (§6: whole-page `get_page_text`, the tab-panel rule, in-browser
DOCX/PDF/OCR, the extension's permission list, and what the matcher already
handles; §7: a Chrome read is a direct read) →
`notes/browser-pass-round2-2026-09-04.md` (this round) →
`notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` (Rounds B and C are still the queue) →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides — still current) →
the other 2026-09-03/04 notes in `notes/` → project memory, newest first.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0–5 and A are committed (Thomas, 2026-09-04). The 2026-09-04
flip/drop round, the bps/psa browser round and this round are built and
verified, not committed.** Corpus **3,341 reports / 2,633 dependencies**.

**Grades: 544 A · 1,346 B · 744 C** (+10 seed edges never graded). A-share
**20.6%**, up from 18.8% at the start of the day. `npm run validate` exits 0, `tsc --noEmit` clean,
123/123 logic tests, grader selftest **33/33**. `public/corpus-data.json`
regenerated. The validator's "cites no evidence_url" warning class is still 0.
**No script changed in round 2** (`grade-evidence.ts` was touched in the br-ibge-cnae/OCR-cap sub-round below).

**Browser pass, round 2 — 134 of the remaining 173 edges decided: 85 accepted,
47 refused with a reason each, 2 blocked by the browser extension. 39 not
reached.** Grades written **C→A 41, C→B 38, B→A 2, no regressions**. Per-edge:
`Claude outputs/browser-pass-round2-2026-09-04.json`; flags for you:
`…-flags-2026-09-04.json`; grade runs: `grade-browserpass-round2/3/4-2026-09-04.json`.

**The refusals are a corpus problem, not a fetch problem** — 39 of 47 are edges
whose cited document does not say what the basis claims, the chained two-hop
above all. Detail and the disproved ellipsis/apostrophe claim: this round's
note and PLAYBOOK §6.

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

**And the six round-2 flags, ruled and applied (uncommitted).** Two direction
flips — `br-ibge-censo-demografico -> br-lei-5534-1968` (quote from the flags
file) and its **unflagged** sibling `br-ibge-pnad-continua -> br-lei-5534-1968`,
both retyped `methodology_depends_on -> legal_basis`; and
`id-rpjmn -> id-democracy-index`. `mx-cscm -> mx-scnm` re-evidenced in the
CSCM's own methodology PDF (C -> A); the flag's "re-point it at `sna-2008`"
was NOT done — `mexico-wiring-grok-2026-08.json` already carries that edge.
`ndb-mou-brics-icm-2022` basis corrected in place with the 2016-not-2011
finding, edge kept, stays C. `yt-budget-main-estimates ->
territorial-formula-financing` evidence re-pointed at the companion 2026-27
Fiscal Outlook PDF and then **read in Chrome the same night — C -> A**: Table 4
carries a `2026-27 Main Estimates` column for the Grant from Canada, and the
prose names the instrument. `mt-edp-inventory -> mt-nso-government-finance`
retyped `uses_data_from -> cites` (Thomas's ruling: an inventory documents a
release; the union has no `documents` member and this is settled, not a flag). Edit script:
`edit_scripts/flags-round2-rulings-2026-09-04.py`; grade run:
`Claude outputs/grade-flagrulings-2026-09-04.json`. Two new PLAYBOOK §6 traps
came out of it (grader `--write` regressions; re-test extension blocks).

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Ruling owed: BPS landing page vs its own PDF — DEFERRED by Thomas
   2026-09-04.** 17 edges whose evidence is inside a PDF BPS serves only
   through a signed token with no stable URL. Listed in
   `Claude outputs/browser-pass-bps-psa-2026-09-04.json` → `refused`. Nothing
   moves on them until you rule.
2. Commit the four uncommitted 2026-09-04 rounds. On top of what the earlier
   rounds touched: `src/data/research/{br-brazil-grok-2026-08,
   id-unlinked-wiring-round2-2026-08-29, int-brics-international-layer-grok-2026-08,
   mx-mexico-grok-2026-08, territories-canada-grok-2026-08}.json`,
   `public/corpus-data.json`, `PLAYBOOK.md`, `HANDOFF.md`,
   `edit_scripts/flags-round2-rulings-2026-09-04.py`, three
   `Claude outputs/*flagrulings*.json`.
3. Real-GPU number for the unfolded Everything tier — **first reading taken
   2026-09-04 and it is not usable yet**: 120.0 fps, GPU raster on, 9.0 MB of
   536.9 MB GPU memory, Everything tier, 3,342 of 3,342 shown. Three things
   spoil it: Paint flashing / Layout shift regions / Layer borders / Highlight
   ads were all ticked (each is extra compositing work and the whole canvas
   renders green), the docked DevTools panel halves the canvas so the GPU is
   drawing ~1,000 px not 1,920, and the Frame Rate bars read **yellow, i.e.
   partially dropped frames**, so 120.0 is the headline over a lumpy stream.
   Retake with only **Frame Rendering Stats** ticked, DevTools undocked into
   its own window, fully unfolded and auto-rotating; the `requestAnimationFrame`
   counter (median and p95 frame time) is the number worth recording.

### [Agent] — next build rounds, in this order (plan §9)

1. **Add an xlsx extractor to `getDoc`** (~30 lines: unzip
   `xl/sharedStrings.xml` + `xl/worksheets/sheet1.xml`, `t="s"` cells index
   into the shared strings). Eight browser-pass edges carry
   `empty:no-extractor` for readable spreadsheets — `anuario.ine.gob.bo`
   returns HTTP 200 to plain curl and was unzipped by hand this round.
2. **Browser pass, the last 39 — and the extension block is probably not
   real.** All five hosts recorded as refused by the extension's site list
   (`wam.ae`, `gov.il`, `pc.odisha.gov.in`, `descg.gov.in`,
   `slovak.statistics.sk`) navigated on the first try, no prompt, on
   2026-09-04 (PLAYBOOK §6). Re-test, don't wait on Thomas.
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
