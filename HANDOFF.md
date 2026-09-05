# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 ~21:40 UTC (flips, aliases, six price indexes, Condensed INT, faint-edge fix — all landed; layout force round superseded)

---

## 1. Read next

`PLAYBOOK.md` §2, §6, §7 at minimum. Then, **routed by what you are doing** —
this is the only routing table; PLAYBOOK §1 points here:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` §2 rules, §6 traps, §7 standing decisions |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` |
| "can I reach host X?" | `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index chains | memory `esms_hicp_pass_2026-09-05`, `condensed_int_and_rulings_2026-09-05` (price indexes), `eu_national_chains_2026-08-28` |
| visual / layout work · INT fold | `PLAYBOOK.md` §3–§4, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md`; memory `condensed_int_and_rulings_2026-09-05` |
| renderer draw path / instancers | memory `node_instancing_2026-09-05`, `link_batching_2026-09-05`, then `renderer_perf_measured_2026-09-04` |
| settle time / physics cost / force tuning | memory `settle_time_tick_burst_2026-09-05`; `scripts/measure-forces.ts`; `scripts/renderer/settle.mjs` |
| camera / fit · flicker | `notes/camera-fit-measurement-2026-08-19.md` · `notes/flicker-tests-2026-08-19.md` |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then project memory, newest first. Git status: never state it (rule 1).

---

## 2. Current state

Corpus **3,352 reports / 2,832 dependencies**. **853 A · 1,366 B · 613 C**,
A-share 30.1%. `npm run validate` exits 0, 123/123 logic tests, grader selftest
**68/68**, `tsc --noEmit` clean, `vite build` ok, `public/corpus-data.json`
regenerated. **Grade counts come from `validate` only.** `kind`: 2,449
publication · 33 standard · 870 instrument.

**Direction (Thomas, 2026-09-05): "tip-top shape with what we have before
looking for more data."** No A-share or size target. Grok retired. START-HERE
"obvious next thing" ¶ reworded and approved 2026-09-05.

**Grader:** CJK span floor (`minSpanFor()` 10), `acronymFitsHead()` ("(ESA
2010)" no longer names a national release), **national releases may carry
`title_aliases`** (Thomas 2026-09-05 — types.ts doc comment is the rule).
**`--write` has NO improvements-only guard** — dry-run old vs new code on the
same store first. 26 ESMS edges and the 6 new price-index chains all A.

**DSBB 750 `no-source-node` leads — PARKED.** Remaining `_dropped` leads are
no-URL / dead-host — research, not re-grade. Price indexes now exist for FR,
IT, NL, DK, CZ, NO (`eu-price-indices-2026-09-05.json`, + `nl-cbs-national-
accounts`); their HBS nodes are leads in that slice's `_dropped`; CH/AL still
have no price index; LU has no NA/HBS node.

**Renderer — three instancers live**, node instancing **seen and accepted by
Thomas** ("looks great"); settle "seems faster" (tick burst + geoAffinity
cache). **Condensed INT (2026-09-05):** View panel → "International layer:
Condensed / Open" (`'INT'` in `openedCountries` IS the state), double-click
an INT node folds, auto-unfold leaves `corb:INT` shut; at Everything the
INT orb sits at the cloud's centre — **this replaced the INT-core/country-
shell force round.** **Faint-edges bug fixed** (`pendingLinkRescale` in
`runFit`: a rate-limited link rescale was refused and never retried);
timing-dependent, unverified live. Otherwise as before: grade-driven
opacity, A-only ranking, `rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`,
`CORE_PERCENTILE` 0.8, `view.minGrade` `C`, `TICK_BURST_MAX` 4 / 8 ms.
Headless: `scripts/renderer/` (`census`, `shot`, `settle`). Shelved ISOLATED:
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`,
`brics-johannesburg-ii-declaration-2023`,
`tz-dar-es-salaam-city-council-budget-2026`.

**Research debt**: 0 no-URL, 0 dead-URL, 5 bare-homepage edges. Browser pass
CLOSED. 2026-08-31 audit: all findings closed.

**Uncommitted since Thomas's second 2026-09-05 commit** (all on disk, shas
compared): `src/App.tsx`, `ViewControls.tsx`, `InfluenceGraph.tsx`,
`hierarchy.ts`, `autoUnfold.ts`, `types.ts`; `scripts/grade-evidence.ts`;
slices `eu-price-indices-2026-09-05.json` (new), `eu-national-chains`,
`eurostat-esms-hicp`, `grok-r6`/`r7`, `jp-japan-grok`, `kr-south-korea-grok`,
`tw-taiwan-grok`; two `edit_scripts/*-2026-09-05.py`; `evidence-cache/`
records; `corpus-data.json`; START-HERE; `notes/Midvamp - Revamp.md`
(pointer); `archive/revamp-questions/` (the two docx, moved);
`Claude outputs/condensed-int-2026-09-05/`, `esms-hicp-2026-09-05/`,
`cjk-span-floor-2026-09-05/`. `package-lock.json` still needs one
`npm install` (explained to Thomas).

**Known node defects**: 9 fractional-cadence `standard` nodes need a ruling
(GNI/QNA inventories 0.2–0.25, `eu-manual-mgdd`, `eu-manual-rd-esa2010`,
`naics`, `icd-10-ca`, `icls-work-statistics-resolution`, `rw-nisr-nsdp`).
Egypt IPI compiler (MoP vs CAPMAS) unverified.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **Condensed-INT follow-ups if Thomas asks**: the INT orb is drawn at
   ordinary orb size (not a "monster"); a size-by-members orb is a
   `nodeVisuals` change. Consider whether tier 1 should honour the toggle.
2. **HBS nodes for FR/IT/DK/CZ/NO** and **NA/HBS for LU**, **price index for
   CH/AL** — leads with quotes already in `eu-price-indices-2026-09-05.json`
   and `eurostat-esms-hicp-2026-09-05.json` `_dropped`; each needs the NSI's
   own release page as `url`.
3. Cluster-repulsion measured sub-round only if Thomas still sees clusters
   overlapping with INT condensed.
4. Parked design questions: mutual-pair rank leakage; layout re-run on data
   add; cadence in layout; collide `iterations` 2→1 and charge `theta`
   0.9→1.5 (each measured, each moves the layout — memory
   `settle_time_tick_burst_2026-09-05`).
5. Small corpus items when convenient: the 9 `kind` rulings once Thomas
   gives them.

### [Thomas] — only you can

1. **Watch for faint edges** at Everything after a settle — if it recurs the
   `pendingLinkRescale` fix missed a path; say what you did just before.
2. **Try Condensed / Open** and the INT double-clicks; say whether the INT
   orb should be bigger.
3. **Rule on the 9 fractional-cadence `standard` nodes** (§2 known defects).
4. **Commit** the §2 list; `npm install` once for `package-lock.json`.

Settled 2026-09-05: CO reversals confirmed; photon+link and node instancing
accepted; 9 CJK flips done; national aliases allowed; START-HERE approved.

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
