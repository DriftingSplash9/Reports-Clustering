# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 07:10 UTC (DSBB SoM import 136 edges 93% A; Rosstat re-cite; KDI A; Minfin OCR; Maharashtra A)

---

## 1. Read next

`PLAYBOOK.md` §2, §6, §7 at minimum. Then, **routed by what you are doing** —
this is the only routing table; PLAYBOOK §1 points here:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` §2 rules, §6 traps, §7 standing decisions |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` |
| "can I reach host X?" | `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this" |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| visual / layout work | `PLAYBOOK.md` §3–§4, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` |
| camera / fit · flicker | `notes/camera-fit-measurement-2026-08-19.md` · `notes/flicker-tests-2026-08-19.md` |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then project memory, newest first (index ~8 KB). Git status: never state it
(rule 1). Measured 2026-09-05: this table's files plus this one total ~135 KB
(was ~220 KB before the doc cleanup).

---

## 2. Current state

Corpus **3,344 reports / 2,760 dependencies**. **751 A · 1,357 B · 652 C**,
A-share 27.2%. `npm run validate` exits 0, 123/123 logic tests, grader selftest
**52/52**, `tsc --noEmit` clean, `public/corpus-data.json` regenerated.
**Grade counts come from `validate` only.**

**Grok is retired** (Thomas, 2026-09-05). No prompts, no queue, no Grok todo
items; PLAYBOOK §5 and rule 9 are retired stubs (numbers kept for references).
All Grok material is out of `notes/`. The `*-grok-2026-08.json` slices stay as
data and grade like any other; their `meta.note` now resolves
(`notes/mint-2026-08-20.md`, written 2026-09-05 from the 08-20 handoff).

**Grader: Wayback is asked WITHOUT the scheme** (`waybackLookupKey`, 2026-09-05).
The snapshot-rescue re-run over the 40 C edges blocked `network`/`wall` is
done: 8 C→B, 32 stay C — the lead is spent (memory `snapshot_rescue_rerun_2026-09-05`).

**DSBB scripted import landed** (2026-09-05):
`src/data/research/dsbb-som-import-2026-09-05.json`, 136 edges (national
release → international standard), **127 A · 9 B**, graded before merge.
Tooling + README `scripts/dsbb-som-import/`; review file (750 `no-source-node`
mint leads, 5 ambiguous) `Claude outputs/dsbb-som-import-2026-09-05-review.json`.
**Source nodes were auto-matched by country + title pattern** — the match, not
the citation, is what a reviewer checks. Jamaica/Kazakhstan 1993-SNA NOT minted
(DSBB metadata is stale there). ESMS half not done.

**Rosstat regional re-cite**: 9 of 11 index-page edges dropped `no-document`
(both sides read, neither names the other); 2 re-cited, B. One carries a
**direction caveat for Thomas** (§3). KDI edges A via `title_aliases`;
Minfin 128n B via OCR; Maharashtra A. Memory `followup_round_2026-09-05`.
**`check-urls.ts` is gone**: `npm run check-urls` → `grade-evidence.ts --urls
[--dir <path>] [--json <out>]`, judged by `fetchRaw` (only `dead` fails; a
wall is reported, not failed). Tested on 12 urls.

**India:** Haryana and Maharashtra `-> in-state-gsdp-series` are A; Tamil Nadu
is B — `www.tn.gov.in` refuses VM, sandbox AND Chrome (2026-09-05; so does
`des.delhi.gov.in`, `www.mod.gov.in`). Uttarakhand's 2024-25 "At a Glance" is a
scanned bilingual PDF on S3WaaS — OCR would cap at its current B, not pursued. The
four dead Indian hosts (`pc.odisha.gov.in`, `des.assam.gov.in`, `descg.gov.in`,
`www.mod.gov.in`) are DOWN, not walled — Chrome is not a third route.
**The railways edge grades off MoSPI's NAS *Sources and Methods* naming the
Year Book, not off the Year Book.** Cite the LIVE url always — a reset is
`block: 'network'`, which the snapshot strategy rescues.

**Doc cleanup (2026-09-05) is done** — all five approved trims plus item 9;
`notes/doc-bloat-2026-09-05.md` is the record; pre-cleanup `REPORTS.md` /
`PLAYBOOK.md` are sha-verified in `archive/decisions/` and `archive/playbook/`.
`notes/` is 32 entries. Two empty directories the bridge cannot remove remain:
`notes/grok-research-queue-2026-08-22/` (+ `Grok results/`).

**Uncommitted backlog** (carried forward, never read from git): the Basel III
round, the transport round, the PLAYBOOK split, browser-pass round 5, the
grader rulings round, the rulings + Basel II round, the TN/Haryana round, the
snapshot-rescue re-run, the 2026-09-05 follow-up round (DSBB slice +
`scripts/dsbb-som-import/`, `ru-russia-grok-2026-08.json`, `kr-south-korea-grok-2026-08.json`,
`za-fiscal-federalism.json`, `ru-g3-international-standards.json`,
`in-india-grok-2026-08.json`, 11 `_dropped` entries flipped to `resolved` across slices,
~35 `evidence-cache/` records, `public/corpus-data.json`, two `Claude outputs/` files), the doc cleanup (`REPORTS.md`, `PLAYBOOK.md`,
`README.md`, `START-HERE.md`, `notes/Midvamp - Revamp.md`, two comment paths in
`src/components/`, `archive/` ×9 in, `notes/` −19 +1, `_to_delete/`), and
item 9 (`scripts/grade-evidence.ts`, `package.json`, `scripts/check-urls.ts`
removed, `notes/mint-2026-08-20.md`).

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`** (Thomas,
2026-09-04). Shelved ISOLATED: `sc-oag-annual-reports-2022-2024`,
`so-fgs-financial-governance-reports`, `brics-johannesburg-ii-declaration-2023`,
`tz-dar-es-salaam-city-council-budget-2026`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 4 bare-homepage edges. **The browser pass is CLOSED.**
**The 2026-08-31 audit** (`archive/audits/`): **F-06 and F-14 open**.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **Decide `tz-dar-es-salaam-city-council-budget-2026`**, isolated by the
   2026-09-05 drop. DCC's budget-summary attachment sits behind a JS fetch never
   completed; a DCC document naming Cap. 290 mints the edge properly. One
   browser pass, or shelve it explicitly.
2. **Companion-document reread, bounded** (Round C, = audit F-06): surviving
   `ess-peer-review-final-report` edges, round 5's 29 reverted quotes, the
   EDP-inventory fragments. Recount first; 58 circabc edges left, and a re-cite
   pass on that host clears most of item 7 too.
3. **DSBB follow-ups:** Thomas reviews the 136 auto-matched source nodes (slice
   basis lines say what was matched); the 750 `no-source-node` rows are mint
   leads by country+category; ESMS still unscripted. India remainder is closed
   until `tn.gov.in` / `des.delhi.gov.in` / `mod.gov.in` answer some machine.
4. **Link batching — scoped by measurement.** Photons first (1,967 objects, 15
   materials → ~15 `InstancedMesh` draws), then links and nodes. Blocker: one
   material per object, so instancing means moving colour/opacity/grade/hover
   out of `GradientLinkMaterial` uniforms into per-instance attributes.
   Draw-call bound. Numbers: memory `renderer_perf_measured_2026-09-04`.
5. Cluster-repulsion sub-round (measured, `measure-forces.ts`, 2+ seeds), then
   **F-14** (gate the weighted-vs-raw disagreement list to an authority floor
   ~0.05 so it reads as a check again).
6. Parked design questions from REPORTS' retired tail, for when the renderer
   is next open: mutual-pair rank leakage (two pairs measured, opposite signs —
   watched, not managed); layout re-run on data add; cadence in layout; the
   default view at scale. START-HERE's "obvious next thing: more data" is a
   direction statement now out of step with the programme — Thomas's call.
7. `_dropped` lead re-evaluation (plan §4 step 5) — last (Thomas, 2026-09-05).

### [Thomas] — only you can

1. Housekeeping (agents cannot delete — rule 6): `_to_delete/notes-2026-09-05/`
   (13 notes, 3 Grok folders/files, `check-urls.ts`; logged in
   `_to_delete/README.md`); the two empty `notes/grok-research-queue-…` dirs;
   `tmp_work/sandbox-2026-09-05/` (`repo-src-2026-09-05.tgz`) and
   `tmp_work/HANDOFF-backup-before-2026-09-05-edit.md`;
   `tmp_work/xfer-2026-09-05/` (a PDF ferried sandbox→VM). All safe to remove.
2. **Direction ruling:** `ru-krasnoyarskstat-city-and-municipal -> ru-rosstat-municipal-indicators-database`
   — flip, or keep as a two-way exchange (caveat + deferred reverse in `ru-russia-grok-2026-08.json`).

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
