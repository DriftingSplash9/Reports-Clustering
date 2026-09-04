# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (xlsx extractor; renderer draw-call census)

---

## 1. Read next

**`PLAYBOOK.md` first** — §6 for the traps (fetch routing, network asymmetry,
the 250 KB cap, `renderer.info`, browser capture, what the matcher already
handles), §7 for the standing decisions. Then `notes/Midvamp - Revamp.md`
(the plan of record) → `notes/next-agent-prompt-2026-09-03.md` (Rounds B and C
are still the queue) → `notes/grader-dry-run-2026-09-03.md` (how the grader
decides) → `notes/browser-pass-round2-2026-09-04.md` and the other
2026-09-03/04 notes → project memory, newest first.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-5 and A are committed (Thomas, 2026-09-04). Four 2026-09-04 rounds
are built and verified, NOT committed**: the flip/drop round, the bps/psa
browser round, browser-pass round 2 (+ the br-ibge-cnae mint, the OCR-read cap
and the six flag rulings), and the xlsx extractor. Narrative for each is in
project memory, newest first; only state lives here.

Corpus **3,342 reports / 2,634 dependencies**. **Grades 544 A · 1,347 B ·
743 C** (+10 seed edges never graded), A-share **20.7%**. `npm run validate`
exits 0, `tsc --noEmit` clean, 123/123 logic tests, grader selftest **37/37**,
`public/corpus-data.json` regenerated. The validator's "cites no evidence_url"
warning class is still 0.

**Scripts:** `grade-evidence.ts` now caps `via: ocr ...` at B (like `wayback`)
and reads OOXML spreadsheets — `extractXlsx`/`xlsxText`, routed AHEAD of the
docx branch, which is what the `empty:no-extractor` class actually was
(PLAYBOOK §6). That class is closed: all 8 edges read at 200 with
`extractor: xlsx`, 7 of 8 match at coverage 1.0, one grade moved
(`ru-minfin-gfs-kosgu-mapping-table -> imf-gfsm` C -> B). The other seven are
two rulings, §3 items 3 and 4. Nothing in `src/` changed for the renderer
round — the draw-call census was measurement only.

**Renderer unchanged**: round 2's grade-driven opacity / A-only ranking cut /
`view.minGrade` (still default `C`) / `rankByLegalBasis`;
`INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE` 0.8; drift watchdog + `__meshes`.
Two reports remain ISOLATED (shelved): `sc-oag-annual-reports-2022-2024`,
`so-fgs-financial-governance-reports`.

**Research debt, corpus-wide**: 0 confirmed-dead URLs; 0 no-URL edges;
0 `empty:no-extractor`; **browser pass 173 -> 39 edges** (list in
`Claude outputs/browser-pass-round2-2026-09-04.json` -> `never_attempted`), of
which roughly a dozen are recorded as blocked by the extension's permission
list — a claim PLAYBOOK §6 says to re-test, not believe; **17 BPS edges blocked
on citation, not access** (§3 item 1); 28 `ess-peer-review-final-report` edges
and 12 EDP-inventory fragments still owed a reread (Round C); ~15 CJK edges
nominally on the matcher (Round B — but see §3). Round 2's 47 refusals are a
corpus problem, not a fetch problem: 39 are edges whose cited document does not
say what the basis claims.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Ruling owed: BPS landing page vs its own PDF — DEFERRED by Thomas
   2026-09-04.** 17 edges whose evidence is inside a PDF BPS serves only
   through a signed token with no stable URL. Listed in
   `Claude outputs/browser-pass-bps-psa-2026-09-04.json` → `refused`. Nothing
   moves on them until you rule.
2. Commit the uncommitted 2026-09-04 rounds. On top of what the earlier rounds
   touched: `scripts/grade-evidence.ts`,
   `src/data/research/{br-brazil-grok-2026-08, id-unlinked-wiring-round2-2026-08-29,
   int-brics-international-layer-grok-2026-08, mx-mexico-grok-2026-08,
   territories-canada-grok-2026-08, ru-g3-international-standards}.json`,
   `public/corpus-data.json`, `PLAYBOOK.md`, `HANDOFF.md`,
   `edit_scripts/{flags-round2-rulings,xlsx-extractor}-2026-09-04.py`,
   three `Claude outputs/*flagrulings*.json`, three
   `Claude outputs/*xlsx*-2026-09-04.json`, and three new `evidence-cache/`
   records (anuario.ine.gob.bo, minfin.gov.ru, kanostate.gov.ng).
3. **Ruling owed: the target artefact named in a language other than the node's
   title.** `ru-minfin-gfs-kosgu-mapping-table -> imf-gfsm` matched at coverage
   1.0 and the matched window is the sheet's own title row — which DOES name
   the target: "...установленным Руководством по статистике государственных
   финансов (СГФ - 2014)", i.e. GFSM 2014. `namesTarget` compares against the
   English title, sees no match, and caps at B (`quote-found-target-not-named`).
   Same class as the CJK matcher limitation. A is available on your word; I did
   not take it.
4. **Ruling owed: the six Bolivian INE edges, stuck at B on
   `agency-not-artefact`.** Quotes match at coverage 1.0. The passage names
   "Instituto Nacional de Estadística" (agency, not artefact); the workbook's
   own heading is "BOLIVIA: INCIDENCIA DE POBREZA(1), SEGÚN DEPARTAMENTO,
   2016-2023" while the node is titled "Pobreza monetaria por departamento
   (INE)". Either the node title is wrong for the artefact or the rule is
   working as designed — your call, and I left them alone (rule 13).
5. **Renderer perf: both open questions are CLOSED — nothing owed by you.**
   Real hardware, Everything tier, 3,342 shown: **28.1 fps / median 33.40 ms /
   p95 41.70 at 1,920 px**, and **27.4 / 33.40 / 41.70 at 1,027 px** — halving
   the pixels changed nothing, so it is **draw-call / main-thread bound, not
   fill bound** (keep that hypothesis dead). 33.40 ms is 4 refresh intervals on
   a 120 Hz display, so a fix has to buy a whole interval to move fps at all —
   judge changes on median/p95. And the "is it rendering twice?" follow-up is
   answered **no**: **6,942 drawables = 6,942 draw calls, one scene render per
   frame**; 13,890 was two frames of a miscounted reading. Numbers, census and
   the corrected recipe: project memory `renderer_perf_measured_2026-09-04` and
   PLAYBOOK §6. Still unmeasured: auto-rotating.

### [Agent] — next build rounds, in this order (plan §9)

1. **Backfill a quote for `ng-kano-lgas-budgets-2025 -> ng-allocation-of-revenue-act`.**
   Its document now reads (329,963 chars of budget lines, `Federal Allocation`
   among them) but the edge's basis carries no quoted span at all, so it grades
   C on `no-quoted-span`. `--find-quotes` against the read document is the
   cheap next move. (The xlsx extractor itself is done — see Current state.)
2. **Browser pass, the last 39 — and the extension block is probably not
   real.** All five hosts recorded as refused by the extension's site list
   (`wam.ae`, `gov.il`, `pc.odisha.gov.in`, `descg.gov.in`,
   `slovak.statistics.sk`) navigated on the first try, no prompt, on
   2026-09-04 (PLAYBOOK §6). Re-test, don't wait on Thomas.
   Method is PLAYBOOK §6. Also still owed from before: re-grade the 2
   `podaci.dzs.hr` edges — **host confirmed 200 from the cloud sandbox
   2026-09-04**, so just run them. `rosstat.gov.ru` and `sis.gov.eg` are
   dead from BOTH the bridge VM and the cloud sandbox (measured, same day);
   `capmas.gov.eg` answers 200 if an Egyptian substitute is wanted.
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
10. **Link batching — now scoped by measurement.** Order: **photons first**
    (1,967 objects sharing only **15** materials → ~15 `InstancedMesh` draws,
    almost no material work), then **link cylinders** (2,634 objects, 2,634
    materials) and **node spheres** (2,324 / 2,324). Geometry is already shared
    and cached (`sphereCache`, `teardropCache`); the blocker is one material per
    object, so instancing means moving colour/opacity/grade/hover-trace state
    out of `GradientLinkMaterial` uniforms into per-instance attributes.
    Triangles (2.0 M/frame, 83% of them the 24x16 node spheres) are irrelevant
    while draw-call bound — a segment cut is the knob to remember, not to pull.
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
