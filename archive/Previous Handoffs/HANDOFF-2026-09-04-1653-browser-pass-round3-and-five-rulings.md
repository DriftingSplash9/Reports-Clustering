# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-04 (browser-pass round 3; two grader fixes)

---

## 1. Read next

**`PLAYBOOK.md` first** — §6 for the traps (fetch routing, network asymmetry,
the text cap, URL encoding, browser capture and its free transport, the
combining-accent matcher gap, `renderer.info`), §7 for the standing decisions.
Then `notes/Midvamp - Revamp.md` (the plan of record) →
`notes/next-agent-prompt-2026-09-03.md` (Rounds B and C are still the queue) →
`notes/grader-dry-run-2026-09-03.md` (how the grader decides) →
`notes/browser-pass-round2-2026-09-04.md` and the other 2026-09-03/04 notes →
project memory, newest first.
Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Rounds 0-5 and A are committed (Thomas, 2026-09-04). Five 2026-09-04 rounds
are built and verified, NOT committed**: the flip/drop round, the bps/psa
browser round, browser-pass round 2 (+ the br-ibge-cnae mint, the OCR-read cap
and the six flag rulings), the xlsx extractor, and browser-pass round 3 (this
one). Narrative for each is in project memory, newest first; only state lives
here.

Corpus **3,342 reports / 2,634 dependencies**. **Grades 546 A · 1,355 B ·
723 C** across `src/data/research/` (+10 seed edges never graded), A-share
**20.8%**. `npm run validate` exits 0, `tsc --noEmit` clean, 123/123 logic
tests, grader selftest **39/39**, `public/corpus-data.json` regenerated.

**Scripts — two fixes this round, both in `grade-evidence.ts`:**
`encodeForCurl` percent-encodes the request URL (spaces and non-ASCII only —
`encodeURI` cannot be used, it double-encodes `%`), which closed
`network:curl-3` as a class; and `TEXT_CAP_BYTES` went 250 KB → 4 MB, because
the grader matches against the CAPPED text and a quote past the cap grades
`quote-not-in-document`. Both are documented in PLAYBOOK §6 and in
`edit_scripts/{url-encode-fetch,text-cap}-2026-09-04.py`.

**Renderer unchanged** — nothing in `src/` was touched this round. Round 2's
grade-driven opacity / A-only ranking cut / `view.minGrade` (still default `C`)
/ `rankByLegalBasis`; `INT_LINK_STIFFNESS = 0`; `CORE_PERCENTILE` 0.8; drift
watchdog + `__meshes`. Two reports remain ISOLATED (shelved):
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

**Research debt, corpus-wide**: 0 confirmed-dead URLs; 0 no-URL edges;
0 `empty:no-extractor`; 0 `network:curl-3`. **Browser pass 173 → 39 → 28
edges**: this round closed 11 (list and per-edge reasons in
`Claude outputs/grade-round3-written-2026-09-04.json`). Still owed: **17 BPS
edges blocked on citation, not access** (§3 item 1); 28
`ess-peer-review-final-report` edges and 12 EDP-inventory fragments awaiting a
reread (Round C); ~15 CJK edges nominally on the matcher (Round B — but see
§3).

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Ruling owed: BPS landing page vs its own PDF — DEFERRED by Thomas
   2026-09-04.** 17 edges whose evidence is inside a PDF BPS serves only
   through a signed token with no stable URL. Listed in
   `Claude outputs/browser-pass-bps-psa-2026-09-04.json` → `refused`. Nothing
   moves on them until you rule.
2. Commit the uncommitted 2026-09-04 rounds. On top of what the earlier rounds
   touched, THIS round added: `scripts/grade-evidence.ts`,
   `src/data/research/{af-nigeria-lga-municipal, af-sudan,
   ci-cpi-social-protection, eu-government-finance-2026-08-28,
   eu-national-chains-2026-08-28, int-brics-international-layer-grok-2026-08,
   ph-unlinked-wiring-round2-2026-08-29}.json`, `public/corpus-data.json`,
   `PLAYBOOK.md`, `HANDOFF.md`, `_to_delete/README.md`, four
   `edit_scripts/*-2026-09-04.py` (ng-kano-quote, url-encode-fetch, text-cap,
   browser-pass-round3-quotes), the `Claude outputs/*2026-09-04*.json` files
   this round wrote, ~20 `evidence-cache/` records, and two
   `archive/*.tar.gz` moved into `archive/sandbox-tar/`.
3. **Ruling still owed: the target artefact named in a language other than the
   node's title.** `ru-minfin-gfs-kosgu-mapping-table -> imf-gfsm` matches at
   coverage 1.0 on a row that DOES name GFSM 2014, in Russian; `namesTarget`
   compares against the English title and caps at B. **This round added a
   second case in the same class**: `ndb-russia-erc-host-agreement-2019 ->
   brics-ndb-agreement-2014`, whose new quote is the Russian recital naming the
   2014 Fortaleza Agreement. A is available on your word for both; I took
   neither.
4. **Ruling still owed: the six Bolivian INE edges, stuck at B on
   `agency-not-artefact`.** Unchanged from the last handoff. `ci-anstat-ihpc ->
   un-coicop-2018` landed in the same class this round (B, quote verified live
   in Chrome).
5. **New, and it needs your call before an agent touches it: the
   combining-accent matcher gap.** A PDF that stores "pondérations" as
   `ponde` + U+0301 + SPACE + `rations` defeats exact matching, so a correctly
   copied French quote scores 0 (`ci-anstat-ihpc -> ci-anstat-ehcvm`, still C,
   document confirmed readable). The fix is a whitespace-insensitive second
   pass in `locateQuote`, stripping spaces from BOTH sides. It can only ever
   ADD matches, which is exactly why it should be measured corpus-wide before
   adoption rather than shipped on one edge's evidence. PLAYBOOK §6 carries the
   detail. Do not let anyone "fix" the quote — the quote is right.

### [Agent] — next build rounds, in this order (plan §9)

1. **Browser pass, the last 28.** Worklist, per-host routing measured from
   BOTH networks the same hour, and the method notes:
   `notes/browser-pass-round3-2026-09-04.md` and
   `Claude outputs/browser-pass-round3-worklist-2026-09-04.json`. The recipe is
   PLAYBOOK §6 and it now works end to end. Read the routing table before
   touching a host — three are dead from both networks, two are sandbox-only,
   five answer 200 with a JS shell and are browser jobs rather than dead hosts.
2. **OCR the one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure ->
   imf-sdds` fetches 200 / 864,760 bytes from the cloud sandbox and extracts 15
   characters — a scan. Both the bridge VM and the sandbox have `tesseract`.
   Route caps the grade at B (`via: ocr tesseract <date>`).
3. **CJK matcher (Round B) — re-measure the premise first.** Four Japanese
   statutes and two Chinese NBS quotes were written in round 2 and **all six
   matched**: exact substring carries a CJK quote copied verbatim off the page.
   Recount before building the n-gram path — and note that §3 item 5 above may
   be the same defect wearing a different hat.
4. **Companion-document reread, bounded** (Round C): the surviving
   `ess-peer-review-final-report` edges, the 29 reverted quotes of round 5, the
   surviving EDP-inventory fragments — recount first, 58 circabc edges left.
5. `_dropped` lead re-evaluation (plan §4 step 5) — still not built. A re-cite
   pass on `s-circabc.europa.eu` (58, one host) would recover most in one go.
6. Flip `view.minGrade` default to A — no-URL, dead-URL, `no-extractor` and
   `curl-3` classes are all closed and A-share is 20.8%; your call whether
   Round B/C go first.
7. DSBB/ESMS scripted import (`getBaseSummaryofMethodologies` is readable and
   already carries 50 corpus citations; category codes differ by country).
8. **Link batching — scoped by measurement.** Order: **photons first** (1,967
   objects sharing only **15** materials → ~15 `InstancedMesh` draws), then
   **link cylinders** (2,634 objects, 2,634 materials) and **node spheres**
   (2,324 / 2,324). Geometry is already shared and cached; the blocker is one
   material per object, so instancing means moving colour/opacity/grade/
   hover-trace state out of `GradientLinkMaterial` uniforms into per-instance
   attributes. Triangles (2.0 M/frame) are irrelevant while draw-call bound.
   Numbers: project memory `renderer_perf_measured_2026-09-04`.
9. Cluster-repulsion force sub-round (measured, `measure-forces.ts`, 2+ seeds,
   `onscreen`). Kept separate per Thomas's Q17 ruling.
10. Doc fixes under hygiene (README:130, REPORTS:9–32, PLAYBOOK:18–20,
    START-HERE:31/37); write `notes/mint-2026-08-20.md` then Grok folder per
    Q18; retire `check-urls.ts` into the grader.
11. Housekeeping left for Thomas (agents cannot delete — rule 6): `_to_delete/`
    now holds README.md plus 8 disposable staging artefacts and one stale Word
    lock file; `tmp_work/` holds 13 staging zips/tarballs, `probe.py`,
    `probe_device.jsonl` and a `roundA/` directory, all superseded. Audit item
    13's two `archive/*.tar.gz` have been moved into `archive/sandbox-tar/`.
    Q19: `archive/audits/` now exists but is EMPTY — the two 08-30/31 audit
    reports are not anywhere on disk, so they have to come from your chat
    history.

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
