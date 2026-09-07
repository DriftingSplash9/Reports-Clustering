# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 07:35 UTC (Round C: items 1, 2, 7 — F-06 closed, 58 EDP edges re-minted, item 7 measured as research)

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

Corpus **3,344 reports / 2,817 dependencies**. **818 A · 1,375 B · 624 C**,
A-share 29.0%. `npm run validate` exits 0, 123/123 logic tests, grader selftest
**53/53**, `tsc --noEmit` clean, `public/corpus-data.json` regenerated.
**Grade counts come from `validate` only.**

**Grok is retired** (Thomas, 2026-09-05). No prompts, no queue, no Grok todo
items; PLAYBOOK §5 and rule 9 are retired stubs. The `*-grok-2026-08.json`
slices stay as data; their `meta.note` resolves to `notes/mint-2026-08-20.md`.

**Round C (2026-09-05) done — agent items 1, 2, 7** (memory
`round_c_companion_reread_2026-09-05`, `round_c_dropped_reeval_2026-09-05`):
- **F-06 CLOSED.** The 58 EDP-inventory edges dropped 09-04 as DEAD-URL were an
  SPA-route 404, not rot; re-minted off `s-circabc.europa.eu/rest/download/<id>`,
  **56 A · 2 B**. PLAYBOOK §6 has the trap.
- 28 `ess-peer-review-final-report -> xx-report` **C→B** on SWD(2024)136 itself,
  which **names no member state** — ruling needed (§3).
- Round 5's 30 regressions closed: 11 A / 17 B / 1 dropped / 1 unreachable; 7 of
  them were the old 250 KB cap. Reader refused `sz-mbabane -> slgp-icr` (project ≠
  report).
- Grader acronym branch whitespace-insensitive (`ESA2010`), selftest 53.
- **Item 7 measured: nothing mints from the leads' own URLs.** 700 of 1,997
  lead-type `_dropped` carry a URL; 305 read, 6 span hits (all settled), 288 dead
  on both networks, 105 JS shells. Probe: `scripts/reeval-dropped/probe.py`,
  table `Claude outputs/reeval-dropped-probe-2026-09-05.json`. It is research
  (§3 agent item 5).
- Item 1: `tz-dar-es-salaam-city-council-budget-2026` **SHELVED** — DCC `/api`
  hangs on all three machines.

**DSBB scripted import** (2026-09-05): `dsbb-som-import-2026-09-05.json`, 136
edges 127 A · 9 B; source nodes auto-matched by country+title — the match is
what a reviewer checks. Review file `Claude outputs/dsbb-som-import-2026-09-05-review.json`
(750 `no-source-node` mint leads). ESMS half not done.

**India:** Haryana, Maharashtra `-> in-state-gsdp-series` A; Tamil Nadu B.
`www.tn.gov.in`, `des.delhi.gov.in`, `www.mod.gov.in` refuse all three machines;
`pc.odisha.gov.in`, `des.assam.gov.in`, `descg.gov.in` DOWN. The railways edge
grades off MoSPI's NAS *Sources and Methods*, not the Year Book.

**Uncommitted backlog** (carried forward, never read from git): everything in
the 07:10 handoff (archived) plus Round C — `scripts/grade-evidence.ts`,
`scripts/reeval-dropped/probe.py`, ~24 slices, ~50 `evidence-cache/` records,
`public/corpus-data.json`, PLAYBOOK §6, 11 `Claude outputs/` files, `tmp_work/`
reeval table and `xfer-2026-09-05b/`.

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`**. Shelved ISOLATED:
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`,
`brics-johannesburg-ii-declaration-2023`, `tz-dar-es-salaam-city-council-budget-2026`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 5 bare-homepage edges. **The browser
pass is CLOSED.** **The 2026-08-31 audit**: **F-14 open** (F-06 closed today).

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **DSBB follow-ups:** the 750 `no-source-node` rows are mint leads by
   country+category; ESMS still unscripted. India remainder closed until
   `tn.gov.in` / `des.delhi.gov.in` / `mod.gov.in` answer some machine.
2. **Link batching — scoped by measurement.** Photons first (1,967 objects, 15
   materials → ~15 `InstancedMesh` draws), then links and nodes. Blocker: one
   material per object, so instancing means moving colour/opacity/grade/hover
   out of `GradientLinkMaterial` uniforms into per-instance attributes.
   Draw-call bound. Numbers: memory `renderer_perf_measured_2026-09-04`.
3. Cluster-repulsion sub-round (measured, `measure-forces.ts`, 2+ seeds), then
   **F-14** (gate the weighted-vs-raw disagreement list to an authority floor
   ~0.05 so it reads as a check again).
4. Parked design questions from REPORTS' retired tail, for when the renderer
   is next open: mutual-pair rank leakage; layout re-run on data add; cadence
   in layout; the default view at scale. START-HERE's "obvious next thing: more
   data" is out of step with the programme — Thomas's call.
5. **Lead research by publisher cluster** (what item 7 turned into, only if
   Thomas wants it): hosts that read fine but whose leads quote nothing —
   ine.gob.bo 21, indec 15, stats.gov.cn 12, ine.gov.py 10, dane 9. Find the
   methodology page, quote it, re-mint. Research round, not a re-grade.

### [Thomas] — only you can

1. Housekeeping (agents cannot delete — rule 6): `_to_delete/notes-2026-09-05/`
   (logged in `_to_delete/README.md`); the two empty `notes/grok-research-queue-…`
   dirs; `tmp_work/sandbox-2026-09-05/`, `tmp_work/HANDOFF-backup-before-2026-09-05-edit.md`,
   `tmp_work/xfer-2026-09-05/`, `tmp_work/xfer-2026-09-05b/`,
   `tmp_work/reeval-leads-2026-09-05.json` (regenerable). All safe to remove.
2. **Direction ruling:** `ru-krasnoyarskstat-city-and-municipal -> ru-rosstat-municipal-indicators-database`
   — flip, or keep as a two-way exchange (caveat + deferred reverse in `ru-russia-grok-2026-08.json`).
3. **Ruling: class-level naming.** SWD(2024)136 says it summarises "the
   peer-review reports for each ESS member" but names no country. The 28
   `ess-peer-review-final-report -> xx-ess-peer-review-report` edges now sit at
   B on that sentence. Keep (documented at class level) or drop (§7
   naming-the-agency shape)?
4. **Review the DSBB 136 auto-matched source nodes** (slice basis lines say
   what was matched).

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
