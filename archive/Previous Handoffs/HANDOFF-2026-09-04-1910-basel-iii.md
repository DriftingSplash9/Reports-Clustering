# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (Basel III round)

---

## 1. Read next

**`PLAYBOOK.md` first** — §6 traps (fetch routing, network asymmetry, the text
cap, URL encoding, browser capture, and **three added 2026-09-04 on titles as
matcher input, NFKD/Hangul, and the A-bar span anchor**), §7 standing
decisions. Then `notes/basel-iii-round-2026-09-04.md` →
`notes/rulings-round5-2026-09-04.md` →
`notes/browser-pass-round4-2026-09-04.md` → `notes/Midvamp - Revamp.md` (plan
of record) → `notes/next-agent-prompt-2026-09-04.md` → project memory, newest
first. Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

Corpus **3,343 reports / 2,634 dependencies**. **Grades 578 A · 1,343 B ·
703 C**, A-share **22.0%**. `npm run validate` exits 0, `tsc --noEmit` clean,
123/123 logic tests, grader selftest **47/47**, `public/corpus-data.json`
regenerated.

**Uncommitted: the Basel III round only** (the previous two were committed by
Thomas). One new node and three edges across three `src/data/research/` slices,
plus `public/corpus-data.json`, `.gitignore`, this file and the round note.
**`scripts/` and the renderer are untouched.**

**`basel-iii` minted** (Thomas's ruling) — `kind: standard`, **standalone, no
`part_of`** by his explicit call, titled the short `Basel III` because
`namesTarget` needs a ≥60% contiguous title run and BIS's six-word page title
scores 33% (PLAYBOOK §6). Repointed off `bis-basel-framework`:
`frb-regulation-q`, `id-ojk`, `kr-financial-stability` — all three name Basel
III and never name the Framework, so the corpus had been recording a citation
its sources do not make. `osfi-car-guideline` (names the Framework verbatim, A)
and `sa-banking` (BCBS 403) stay put.

**All three repointed edges moved `naming: 'neither'` → `'title-run:2/2'`, and
none changed grade** — three different blockers, all measured, none of them the
edition question. Detail and the two proposed fixes are in the round note. No
grades written back: this VM's run would have demoted the Korean edge to C on a
DNS failure, a machine fact rather than a corpus one.

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`** (Thomas,
2026-09-04): it is a floor, so C is the permissive setting that draws
everything. Two reports remain ISOLATED (shelved):
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 5 bare-homepage edges (the last class before the promotion
gate). **Browser pass 173 → 39 → 28 → 15.** Owed: 17 BPS edges, the 6 India +
1 Tanzania re-cites, 3 documents blocked on transport, the OCR job.

**The 2026-08-31 audit is on disk** at `archive/audits/` and was re-checked
against this corpus: F-01, F-02 and F-13 closed, F-03 bounded (117 → 88
rosstat edges, 71 of them C), F-04 closed on its no-URL half. F-06 and F-14
open.

---

## 3. Todo (live items only)

### [Agent] — next build rounds, in this order

1. **Build the checksummed transport, before anything else.** Still the binding
   constraint; 20 edges queue behind it. Three document sets read fine in
   Chrome and could not be written to disk — `www.anstat.ci` (2 edges, document
   confirms BOTH claims), `mid.ru` (1), the five BPS PDFs (17). Round 3's
   "a `get_page_text` result over ~50 KB is persisted to a file the sandbox can
   read" **fires unpredictably**; padding past 50 KB did not force it. Do not
   hunt for a bigger pipe: have the page compute a SHA-256 of the extracted
   text, move it by any channel including a heredoc, verify after writing. §6's
   "retyping is lossy" stops applying the moment a copy checksums.
2. **The 17 BPS edges.** Ruled 2026-09-04 (option 1): cite the landing page,
   quote the PDF, record `via: token-pdf <date>`, caps at B. Route already in
   `routeCapsGrade()`. Seventeen edges over **five** publications, listed in
   `Claude outputs/browser-pass-bps-psa-2026-09-04.json` → `refused`. Needs
   item 1.
3. **The last 15 browser-pass edges.** Worklist and per-host routing in
   `notes/browser-pass-round3-2026-09-04.md`,
   `notes/browser-pass-round4-2026-09-04.md` and
   `Claude outputs/browser-pass-round3-worklist-2026-09-04.json`. **Re-probe
   before touching a host** — routing has decayed inside a day twice running,
   and this session added a third instance: `bok.or.kr` redirects to
   `file-cdn.bok.or.kr`, which the bridge VM could not resolve today, though
   round 4 recorded the host as reachable from the cloud sandbox.
4. **OCR the one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure ->
   imf-sdds`, 200 / 864,760 bytes / 15 characters of text. Blocked on language
   data: tesseract on both machines has only `eng`+`osd`, so `rus.traineddata`
   must be fetched first — **the bridge VM has working outbound network**
   (verified this session against bis.org), so try there. Caps at B
   (`via: ocr tesseract <date>`).
5. **Re-cite, don't re-capture: 6 India + 1 Tanzania.** They cite a department
   LANDING PAGE, not the survey (`pc.odisha.gov.in`, `des.assam.gov.in`,
   `descg.gov.in`, `himachalservices.nic.in`, `indianrailways.gov.in`,
   `mod.gov.in`; plus `dcc.go.tz`). Research, not plumbing.
6. **Companion-document reread, bounded** (Round C): the surviving
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   surviving EDP-inventory fragments — recount first, 58 circabc edges left.
   This is also the audit's F-06.
7. `_dropped` lead re-evaluation (plan §4 step 5). A re-cite pass on
   `s-circabc.europa.eu` (58, one host) would recover most in one go.
8. **Basel II is one fetch from a node.** SBV's Financial Soundness Indicators
   table (`sbv.gov.vn/en/web/sbv_portal/w/sbv606221`) cites Circulars 41/2016
   and 22/2019 with explicit "Applying Basel II" language. The old drop was on
   the wrong target (`vn-npl`), not on the naming — aim it at a
   capital-adequacy node. Also worth one fetch: `tw-financial-stability`, the
   Basel III analogue of the Korean edge. No node without an edge.
9. DSBB/ESMS scripted import (`getBaseSummaryofMethodologies` is readable and
   already carries 50 corpus citations; category codes differ by country).
10. **Link batching — scoped by measurement.** Photons first (1,967 objects,
    only **15** materials → ~15 `InstancedMesh` draws), then link cylinders
    (2,634/2,634 materials) and node spheres (2,325/2,325). Blocker is one
    material per object: instancing means moving colour/opacity/grade/
    hover-trace out of `GradientLinkMaterial` uniforms into per-instance
    attributes. Draw-call bound, so triangles are irrelevant. Numbers: project
    memory `renderer_perf_measured_2026-09-04`.
11. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
    `onscreen`). Kept separate per Thomas's Q17 ruling.
12. **F-14**: gate the weighted-vs-raw disagreement list to an authority floor
    (e.g. 0.05) so it reads as a check again. (F-13 is CLOSED.)
13. Doc hygiene: README:130, REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37
    (its ranking sentence is F-07 and is now wrong in a NEW way — `brics-jsp`
    left the top ten); write `notes/mint-2026-08-20.md` then Grok folder per
    Q18; retire `check-urls.ts` into the grader.

### [Thomas] — only you can

1. **Two grader rulings, both measured-but-unapplied, both from the Basel
   round** (`notes/basel-iii-round-2026-09-04.md` has the numbers):
   - **The A bar should test the window around *any* matched span, not only
     `bestSpan`.** `frb-regulation-q` has coverage 1.00 and naming true and
     still grades B, because its basis quotes the press release's own headline
     (index 26, page chrome) as well as the substantive sentence (index 8470,
     with "Basel III" 49 characters away). The tie between two perfect quotes
     breaks to the first. Likely a whole class — many bases in this corpus open
     by naming the source document.
   - **`namesTarget`'s single-token path should read `title_aliases` and should
     include Hangul.** It currently reads only `target.title`, and its class
     `/[぀-ヿ㐀-鿿]/` excludes Hangul entirely, so `바젤Ⅲ` (one token —
     U+2162 decomposes to `III` under NFKD, giving `바젤iii`) is invisible to
     both it and the ≥2-word run rule. The alias minted this round is inert
     until this changes.
   Both need a corpus-wide before/after measurement, so both need a populated
   `.evidence-fulltext/`.
2. Housekeeping (agents cannot delete — rule 6): `_to_delete/` now holds
   `sweep-2026-09-04-basel-session/` (31MB, README inside) plus one stale Word
   lock file. `tmp_work/` is down to four small current worklists and is now in
   `.gitignore`.

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
