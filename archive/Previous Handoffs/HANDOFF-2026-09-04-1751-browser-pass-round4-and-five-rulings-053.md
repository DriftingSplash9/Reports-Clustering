# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (browser-pass round 4; five rulings applied)

---

## 1. Read next

**`PLAYBOOK.md` first** — §6 for the traps (fetch routing, network asymmetry,
the text cap, URL encoding, browser capture, `renderer.info`), §7 for the
standing decisions, **including four added 2026-09-04**: foreign-language
artefact naming, the parenthetical-acronym rule and its two conditions, the
`via: token-pdf` route, and "a node carries the publisher's own title". Then
`notes/rulings-round5-2026-09-04.md` → `notes/browser-pass-round4-2026-09-04.md`
→ `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` → `notes/grader-dry-run-2026-09-03.md`
→ project memory, newest first.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

Corpus **3,342 reports / 2,634 dependencies**. **Grades 578 A · 1,343 B ·
703 C**, A-share **22.0%**. `npm run validate` exits 0, `tsc --noEmit` clean,
123/123 logic tests, grader selftest **47/47**, `public/corpus-data.json`
regenerated.

**Two rounds are built and verified, NOT committed** (everything up to and
including the five 2026-09-04 rounds was committed by Thomas earlier today):
browser-pass round 4, and the five-rulings round. Between them they touched
`scripts/grade-evidence.ts`, `src/lib/types.ts`, `PLAYBOOK.md`, `HANDOFF.md`,
~40 files under `src/data/research/`, `public/corpus-data.json`,
`archive/audits/audit-2026-08-31-second-independent.md`, two new `notes/*.md`
and the `Claude outputs/*2026-09-04*.json` files those rounds wrote.

**Scripts — three changes, all measured before adoption:** `locateQuote()`
gained a whitespace-insensitive second pass (34 grades up, 0 down over 1,664
edges; false positives 1 in 3,000 deliberately mismatched pairs).
`namesTarget()` reads `Report.title_aliases` and accepts a parenthetical
acronym from the target's own title at **≥4 characters AND glossing the whole
title**. `routeCapsGrade()` caps a new `via: token-pdf` route at B.
Selftest 39 → 47.

**Schema — one field:** `Report.title_aliases?: string[]`, the artefact's name
in other languages. Read its doc comment before adding one; four exist
(`eurostat-hicp`, `sna-2008`, `imf-gfsm`, `brics-ndb-agreement-2014`).

**Renderer unchanged** — nothing in `src/` except `types.ts`. Grade-driven
opacity / A-only ranking cut / `view.minGrade` (still default `C`) /
`rankByLegalBasis`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE` 0.8; drift
watchdog + `__meshes`. Two reports remain ISOLATED (shelved):
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

**Research debt, corpus-wide**: 0 no-URL edges (the 162 are closed — recount
confirms 0); 5 bare-homepage edges, which is the last class before the
promotion gate; 0 confirmed-dead URLs; 0 `empty:no-extractor`; 0
`network:curl-3`. **Browser pass 173 → 39 → 28 → 15 edges**: round 4 closed 9,
the rulings round closed the ANSTAT COICOP question in code. Still owed: **17
BPS edges** (route ruled, captures owed — §3), the 6 India + 1 Tanzania
**re-cites**, 3 documents blocked on transport (§3 item 1), and the OCR job.

**The 2026-08-31 audit is on disk** at `archive/audits/` and was re-checked
against this corpus: F-01, F-02 and F-13 closed, F-03 bounded (117 → 88
rosstat edges, 71 of them C), F-04 closed on its no-URL half. F-06 and F-14
open. The 2026-08-30 audit is gone and, per Thomas, superseded by the 08-31.

---

## 3. Todo (live items only)

### [Agent] — next build rounds, in this order

1. **Build the checksummed transport, before anything else.** This is the
   binding constraint now, not access: three document sets read fine in Chrome
   and could not be written to disk — `www.anstat.ci` (2 edges; the document
   confirms BOTH claims, "NOUVELLE NOMENCLATURE COICOP 2018" and the EHCVM
   pondérations sentence), `mid.ru` (1), and the five BPS PDFs (17). Round 3's
   "a `get_page_text` result over ~50 KB is persisted to a file the sandbox can
   read" **fires unpredictably** — padding past 50 KB did not force it. Do not
   hunt for a bigger pipe: have the page compute a SHA-256 of the extracted
   text, move it by any channel including a heredoc, and verify after writing.
   A copy that checksums is not a lossy copy, and §6's "retyping is lossy"
   warning stops applying the moment it is verified. 20 edges queue behind it.
2. **The 17 BPS edges.** Ruled 2026-09-04 (option 1): cite the landing page,
   quote the PDF, record `via: token-pdf <date>`, grade caps at B. The route is
   already in `routeCapsGrade()`. Seventeen edges over **five** publications,
   listed in `Claude outputs/browser-pass-bps-psa-2026-09-04.json` → `refused`.
   Needs item 1.
3. **The last 15 browser-pass edges.** Worklist and per-host routing measured
   from BOTH networks: `notes/browser-pass-round3-2026-09-04.md`,
   `notes/browser-pass-round4-2026-09-04.md` and
   `Claude outputs/browser-pass-round3-worklist-2026-09-04.json`. Read the
   routing table before touching a host — and re-probe it, it decayed inside a
   day twice running.
4. **OCR the one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure ->
   imf-sdds`, 200 / 864,760 bytes / 15 characters of text. **Blocked on
   language data**: tesseract on BOTH the bridge VM and the cloud sandbox has
   only `eng`+`osd`, so `rus.traineddata` has to be fetched first. Route caps
   at B (`via: ocr tesseract <date>`).
5. **Re-cite, don't re-capture: 6 India + 1 Tanzania.** They cite a department
   LANDING PAGE, not the survey (`pc.odisha.gov.in`, `des.assam.gov.in`,
   `descg.gov.in`, `himachalservices.nic.in`, `indianrailways.gov.in`,
   `mod.gov.in`; plus `dcc.go.tz`). `himachalservices.nic.in` reads fine in
   Chrome and still cannot help — an index page will never name the GSDP
   series. This is research, not plumbing.
6. **Round B is CANCELLED — do not build the CJK n-gram matcher.** The
   whitespace-insensitive pass IS the CJK fix; 19 of its 34 grade moves were
   CJK. Measurement in `notes/rulings-round5-2026-09-04.md`.
7. **Companion-document reread, bounded** (Round C): the surviving
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   surviving EDP-inventory fragments — recount first, 58 circabc edges left.
   This is also the audit's F-06.
8. `_dropped` lead re-evaluation (plan §4 step 5) — still not built. A re-cite
   pass on `s-circabc.europa.eu` (58, one host) would recover most in one go.
9. **Flip `view.minGrade` default to A** — no-URL, dead-URL, `no-extractor` and
   `curl-3` are all closed and A-share is 22.0%; Thomas's call whether the
   remaining research rounds go first.
10. DSBB/ESMS scripted import (`getBaseSummaryofMethodologies` is readable and
    already carries 50 corpus citations; category codes differ by country).
11. **Link batching — scoped by measurement.** Order: **photons first** (1,967
    objects sharing only **15** materials → ~15 `InstancedMesh` draws), then
    link cylinders (2,634 / 2,634 materials) and node spheres (2,324 / 2,324).
    The blocker is one material per object; instancing means moving colour /
    opacity / grade / hover-trace state out of `GradientLinkMaterial` uniforms
    into per-instance attributes. Triangles are irrelevant while draw-call
    bound. Numbers: project memory `renderer_perf_measured_2026-09-04`.
12. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
    `onscreen`). Kept separate per Thomas's Q17 ruling.
13. **F-14**: gate the weighted-vs-raw disagreement list to an authority floor
    (e.g. 0.05) so it reads as a check again. (**F-13 is CLOSED** — the
    validator now reports 0 duplicate-shaped groups.)
14. Doc fixes under hygiene (README:130, REPORTS:9–32, PLAYBOOK:18–20,
    START-HERE:31/37 — its ranking sentence is the audit's F-07 and is now
    wrong in a NEW way, since `brics-jsp` left the top ten); write
    `notes/mint-2026-08-20.md` then Grok folder per Q18; retire `check-urls.ts`
    into the grader.

### [Thomas] — only you can

1. Commit the two uncommitted rounds (§2 lists what they touched).
2. **Ruling owed: is 바젤Ⅲ (Basel III) an alias of `bis-basel-framework`?**
   Held back deliberately from the 2026-09-04 alias round: Basel III is a
   package INSIDE the Basel Framework, so this is an edition/scope question,
   not the language question you ruled on, and the corpus models editions as
   separate nodes. `kr-financial-stability -> bis-basel-framework` sits at B
   (coverage 0.87) until you say.
3. Housekeeping (agents cannot delete — rule 6): `tmp_work/` now holds ~20
   superseded staging zips/tarballs plus `probe.py`, `probe_device.jsonl`,
   `roundA/`, and this session's `capture-round4/`, `ft2.tgz`, `ft3.tgz`,
   `*.json` scratch. `_to_delete/` holds its README plus 8 disposable staging
   artefacts, one stale Word lock file, and
   `evidence-fulltext-stray-2026-09-04/`.

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
