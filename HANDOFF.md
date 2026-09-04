# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-04 (browser-pass round 5 + its two rulings)

---

## 1. Read next

`PLAYBOOK.md` — whole, it is short now (§6 was 50k characters on 2026-09-04
and is 8k). Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` §2 rules, §6 traps, §7 standing decisions |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` |
| "can I reach host X?" | `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this" |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| picking up a queued round | `notes/next-agent-prompt-2026-09-04.md` (rounds 2–4 stand; round 1 is done) |

Then project memory, newest first. Git status: never state it (rule 1).

---

## 2. Current state

Corpus **3,343 reports / 2,632 dependencies**. **580 A · 1,362 B · 690 C**,
A-share **22.0%**. `npm run validate` exits 0, `tsc --noEmit` clean, 123/123
logic tests, grader selftest **47/47**, `public/corpus-data.json` regenerated.
**Grade counts come from `validate` only** — `corpus-data.json` holds the 347
research slices and misses ~10 seed-file edges.

**Uncommitted: the Basel III round, the transport round, the PLAYBOOK split
and browser-pass round 5.** Corpus side: seven `src/data/research/` slices —
20 new `evidence_quote` fields, 22 new grades, **2 edges moved to `_dropped`
`no-document`** (Thomas, 2026-09-04) — 10 new `evidence-cache/` records,
`public/corpus-data.json`. Docs side: `PLAYBOOK.md` (80,301 → ~39k chars),
three new `notes/`, this file, and the new folder `scripts/capture/`. Also
`tmp_work/capture-2026-09-04/` (3 `.evidence-fulltext` records, scratch).
**No existing file in `scripts/` and nothing in `src/` outside the corpus was
modified.** `brics-johannesburg-ii-declaration-2023` is now ISOLATED — the
dropped edge was its only one.

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`** (Thomas,
2026-09-04). Two reports ISOLATED and shelved:
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 5 bare-homepage edges. **Browser pass 173 → 39 → 28 → 15 → 10, and closed** — the last 10 are
items 2-3 (re-cite/OCR) plus 2 honest dead-host C's.

**The 2026-08-31 audit** is at `archive/audits/`: F-01, F-02, F-13 closed,
F-03 bounded, F-04 closed on its no-URL half. F-06 and F-14 open.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **The browser pass is CLOSED.** Of the last 15: 3 graded up, 2 dropped on
   Thomas's ruling, 2 stay C honestly (`ipdp.cdmx.gob.mx` — dead from all
   three networks, no Wayback snapshot), and the remaining 8 are items 2 and 3
   below. Nothing here is a capture problem any more. Detail:
   `notes/browser-pass-round5-2026-09-04.md`. **Start at item 2.**
2. **Re-cite, don't re-capture: 6 India + 1 Tanzania.** They cite a department
   landing page, not the survey (`pc.odisha.gov.in`, `des.assam.gov.in`,
   `descg.gov.in`, `himachalservices.nic.in`, `indianrailways.gov.in`,
   `mod.gov.in`, `dcc.go.tz`). Research, not plumbing.
3. **OCR one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure -> imf-sdds`,
   200 / 864,760 bytes / 15 chars of text. Needs `rus.traineddata`; the VM has
   working network. Caps at B.
4. **Basel II is one fetch from a node.** SBV's Financial Soundness Indicators
   table (`sbv.gov.vn/en/web/sbv_portal/w/sbv606221`) cites Circulars 41/2016
   and 22/2019 with explicit "Applying Basel II"; the old drop was on the wrong
   target (`vn-npl`). Also one fetch: `tw-financial-stability`. No node without
   an edge; match `basel-iii`'s standalone shape.
5. **Companion-document reread, bounded** (Round C, = audit F-06): surviving
   `ess-peer-review-final-report` edges, round 5's 29 reverted quotes, the
   EDP-inventory fragments. Recount first; 58 circabc edges left — a re-cite
   pass on that one host also clears most of item 6.
6. `_dropped` lead re-evaluation (plan §4 step 5).
7. DSBB/ESMS scripted import (readable API, already 50 corpus citations).
8. **Link batching — scoped by measurement.** Photons first (1,967 objects, only
   15 materials → ~15 `InstancedMesh` draws), then links and nodes. Blocker is
   one material per object: instancing means moving colour/opacity/grade/hover
   out of `GradientLinkMaterial` uniforms into per-instance attributes.
   Draw-call bound. Numbers: memory `renderer_perf_measured_2026-09-04`.
9. Cluster-repulsion sub-round (measured, `measure-forces.ts`, 2+ seeds), then
   **F-14** (gate the weighted-vs-raw disagreement list to an authority floor
   ~0.05 so it reads as a check again).
10. Doc hygiene: README:130, REPORTS:9–32, START-HERE:31/37 (its ranking
    sentence is F-07 and is now wrong in a NEW way — `brics-jsp` left the top
    ten); `notes/mint-2026-08-20.md`; retire `check-urls.ts` into the grader.

### [Thomas] — only you can

1. **Four grader rulings, all measured, none applied.** Each can only ADD
   matches, so each owes a corpus-wide before/after — one session with a
   populated `.evidence-fulltext/`, not a fresh VM. Numbers in
   `notes/transport-round1-`, `basel-iii-round-` and
   `browser-pass-round5-2026-09-04.md`.
   - **`pdftotext -layout` is the wrong extractor for a bilingual two-column
     PDF** — it interleaves the languages word by word, putting foreign text
     *inside* the span. 17 probe spans: `-layout` 6, plain 6, **pdf.js 17**.
     The grader's PDF branch is `-layout`.
   - **The A bar should test the window around *any* matched span, not only
     `bestSpan`** — `frb-regulation-q -> basel-iii` has coverage 1.00 and
     naming true and still grades B because the basis also quotes the press
     release's own headline and that lands first. Likely a whole class.
   - **`namesTarget` needs `locateQuote`'s whitespace-insensitive pass, plus
     `title_aliases` and Hangul on its single-token path** —
     `ci-anstat-ihpc -> ci-anstat-ehcvm`; the Basel round's Korean alias is
     inert for the same reason.
   - **The title-run rule has no tolerance for ONE interpolated word** —
     `mx-oaxaca-de-juarez -> mx-censo-poblacion`, coverage 1.0, B, because the
     document says "Censo *Nacional* de Población y Vivienda" (run 4 of the 6
     needed; title-lead is a whole-phrase `includes()`). Same family,
     DIFFERENT fix, and NOT fixable by retitling — INEGI's own name has no
     "Nacional".
2. **One-liner, no measurement needed**: the run report calls `token-pdf` "a
   direct read of the cited URL" and tags its reasons `…-via-snapshot`. Both
   false; §6 already condemns exactly this. Left alone to keep `scripts/`
   clean — say the word.
3. **Did the PLAYBOOK split cut anything you wanted kept?** 84 §6 bullets went
   to 31 here, 7 sections of techniques and 26 routing rows. Verbatim original:
   `archive/playbook/PLAYBOOK-2026-09-04-1938-pre-split.md`.
4. Housekeeping (agents cannot delete — rule 6): `_to_delete/` holds
   `sweep-2026-09-04-basel-session/` (31MB, README inside) and a stale Word
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
5. If §1–§3 are over ~7k characters, trim before adding to them.
6. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
