# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (transport round — agent items 1 and 2)

---

## 1. Read next

**`PLAYBOOK.md` first** — §6 traps (fetch routing, network asymmetry, the text
cap, browser capture, and **six added 2026-09-04: signed download tokens,
pdf.js on the VM, `pdftotext -layout` on bilingual PDFs, the checksummed
transport, empty extractions, and the `namesTarget` whitespace gap**), §7
standing decisions. Then `notes/transport-round1-2026-09-04.md` →
`notes/basel-iii-round-2026-09-04.md` → `notes/rulings-round5-2026-09-04.md` →
`notes/browser-pass-round4-2026-09-04.md` → `notes/Midvamp - Revamp.md` (plan
of record) → `notes/next-agent-prompt-2026-09-04.md` (rounds 2-4 still stand;
round 1 is done) → project memory, newest first. Git status: never state it
(PLAYBOOK rule 1).

---

## 2. Current state

Corpus **3,343 reports / 2,634 dependencies**. **Grades 579 A · 1,360 B ·
695 C**, A-share **22.0%**. `npm run validate` exits 0, `tsc --noEmit` clean,
123/123 logic tests, grader selftest **47/47**, `public/corpus-data.json`
regenerated. **Take grade counts from `validate` only** — `corpus-data.json`
holds the 347 research slices and misses the ~10 seed-file edges, which is how
the previous handoff printed a C that did not sum.

**Uncommitted: the Basel III round and this transport round.** Three
`src/data/research/` slices carry 17 new `evidence_quote` fields and 19 new
grades; `evidence-cache/` has 7 new records; plus `public/corpus-data.json`,
`PLAYBOOK.md`, this file, the round note, and the new folder
`scripts/capture/`. **No existing file in `scripts/` and nothing in `src/`
outside the corpus was modified.**

**Transport (agent item 1) is closed, and it was never the constraint.** The
bridge VM curls BPS's signed token PDFs directly — only the browser can MINT
the token, anyone can fetch it. And **pdf.js runs on the VM and reproduces a
Chrome in-page capture byte for byte** (89,289 chars, sha `6b2db200…`, both
sides), so **a PDF never has to cross the bridge for its text.** The
checksummed transport was still built and proven on the one host that refuses
the VM (`anstat.ci`, 403): `scripts/capture/` + its README.

**The 17 BPS edges (agent item 2) are done** — all C→B, `via: token-pdf
2026-09-04`, every quote machine-checked against the landed extraction before
it was written. `mid.ru` B→A, `anstat.ci` C→B.

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`** (Thomas,
2026-09-04). Two reports remain ISOLATED (shelved):
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 5 bare-homepage edges. **Browser pass 173 → 39 → 28 → 15.**
Owed: the 6 India + 1 Tanzania re-cites, the OCR job, and the 5 PSA edges
flagged in the first browser pass as overclaiming.

**The 2026-08-31 audit** is at `archive/audits/`: F-01, F-02, F-13 closed,
F-03 bounded, F-04 closed on its no-URL half. F-06 and F-14 open.

---

## 3. Todo (live items only)

### [Agent] — next build rounds, in this order

1. **The last 15 browser-pass edges.** Worklist and per-host routing in
   `notes/browser-pass-round3-2026-09-04.md`,
   `notes/browser-pass-round4-2026-09-04.md` and
   `Claude outputs/browser-pass-round3-worklist-2026-09-04.json`. **Re-probe
   before touching a host** — routing has decayed inside a day three times.
   And re-read the transport round's finding first: try the VM's own curl and
   the local pdf.js extractor before opening a browser at all.
2. **Re-cite, don't re-capture: 6 India + 1 Tanzania.** They cite a department
   LANDING PAGE, not the survey (`pc.odisha.gov.in`, `des.assam.gov.in`,
   `descg.gov.in`, `himachalservices.nic.in`, `indianrailways.gov.in`,
   `mod.gov.in`; plus `dcc.go.tz`). Research, not plumbing.
3. **OCR the one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure ->
   imf-sdds`, 200 / 864,760 bytes / 15 characters of text. Blocked on
   `rus.traineddata`; the bridge VM has working outbound network, so fetch it
   there. Caps at B (`via: ocr tesseract <date>`).
4. **Basel II is one fetch from a node.** SBV's Financial Soundness Indicators
   table (`sbv.gov.vn/en/web/sbv_portal/w/sbv606221`) cites Circulars 41/2016
   and 22/2019 with explicit "Applying Basel II" language; the old drop was on
   the wrong target (`vn-npl`). Also worth one fetch: `tw-financial-stability`.
   No node without an edge; match `basel-iii`'s standalone shape.
5. **Companion-document reread, bounded** (Round C): the surviving
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   surviving EDP-inventory fragments — recount first, 58 circabc edges left.
   This is also the audit's F-06.
6. `_dropped` lead re-evaluation (plan §4 step 5). A re-cite pass on
   `s-circabc.europa.eu` (58, one host) would recover most in one go.
7. DSBB/ESMS scripted import (`getBaseSummaryofMethodologies` is readable and
   already carries 50 corpus citations; category codes differ by country).
8. **Link batching — scoped by measurement.** Photons first (1,967 objects,
   only **15** materials → ~15 `InstancedMesh` draws), then link cylinders and
   node spheres. Blocker is one material per object: instancing means moving
   colour/opacity/grade/hover-trace out of `GradientLinkMaterial` uniforms into
   per-instance attributes. Draw-call bound. Numbers: project memory
   `renderer_perf_measured_2026-09-04`.
9. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
   `onscreen`). Kept separate per Thomas's Q17 ruling.
10. **F-14**: gate the weighted-vs-raw disagreement list to an authority floor
    (e.g. 0.05) so it reads as a check again. (F-13 is CLOSED.)
11. Doc hygiene: README:130, REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37
    (its ranking sentence is F-07 and is now wrong in a NEW way — `brics-jsp`
    left the top ten); write `notes/mint-2026-08-20.md` then Grok folder per
    Q18; retire `check-urls.ts` into the grader.

### [Thomas] — only you can

1. **Three grader rulings, all measured, none applied.** Each can only ever
   ADD matches, so each owes a corpus-wide before/after, which needs a
   populated `.evidence-fulltext/` — do them in one session, not a fresh VM.
   - **`pdftotext -layout` is the wrong extractor for a bilingual two-column
     PDF.** It interleaves the two languages word by word, putting foreign
     text *inside* the quoted span where no whitespace-insensitive matcher can
     reach. Measured over the five BPS publications, 17 probe spans: `-layout`
     found 6, plain `pdftotext` 6, **pdf.js reading order 17**. The grader's
     PDF branch is `-layout`. Numbers in
     `notes/transport-round1-2026-09-04.md`.
   - **The A bar should test the window around *any* matched span, not only
     `bestSpan`.** `frb-regulation-q -> basel-iii` has coverage 1.00 and
     naming true and still grades B because its basis also quotes the press
     release's own headline, which lands first. Likely a whole class.
   - **`namesTarget` needs `locateQuote`'s whitespace-insensitive pass, plus
     `title_aliases` and Hangul on its single-token path.**
     `ci-anstat-ihpc -> ci-anstat-ehcvm` grades B at coverage 1.00 because the
     PDF renders the survey as `Enquê te Harmonisé e sur lesConditions de Vie
     des Mé nages`; the Korean alias minted in the Basel round is inert for
     the same reason.
2. **A smaller one, no measurement needed**: the run report calls `token-pdf`
   "a direct read of the cited URL" and labels its reasons `…-via-snapshot`.
   Both are false and PLAYBOOK §6 already condemns exactly this. Left alone to
   keep `scripts/` clean this round; say the word and it is a one-line fix.
3. Housekeeping (agents cannot delete — rule 6): `_to_delete/` holds
   `sweep-2026-09-04-basel-session/` (31MB, README inside) plus one stale Word
   lock file.

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
