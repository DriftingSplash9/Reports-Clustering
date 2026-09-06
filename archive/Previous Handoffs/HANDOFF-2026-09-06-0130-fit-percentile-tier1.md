# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-06 ~01:30 UTC (collide 1 accepted; fit percentile now falls with spread; tier 1 honours the INT toggle; theta 1.5 and mutual pairs still Thomas's)

---

## 1. Read next

`PLAYBOOK.md` §2, §6, §7 at minimum. Then, **routed by what you are doing** —
this is the only routing table; PLAYBOOK §1 points here:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` §2 rules, §6 traps, §7 standing decisions |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md`; for "can I reach host X?" `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| visual / layout work · INT fold | `PLAYBOOK.md` §3–§4, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md`; memory `condensed_int_and_rulings_2026-09-05` |
| renderer draw path / instancers | memory `node_instancing_2026-09-05`, `link_batching_2026-09-05`, then `renderer_perf_measured_2026-09-04` |
| settle time / physics cost / force tuning | memory `layout_levers_and_hbs_2026-09-05`, then `settle_time_tick_burst_2026-09-05`; `scripts/measure-forces.ts` (`ITER`/`THETA`); `scripts/renderer/settle.mjs`, `shot-all.mjs` |
| camera fit · the spread slider · INT fold | memory `fit_percentile_and_tier1_2026-09-06`; `scripts/renderer/fit-probe.mjs`; `notes/camera-fit-measurement-2026-08-19.md` · `notes/flicker-tests-2026-08-19.md` |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then project memory, newest first. Git status: never state it (rule 1).

---

## 2. Current state

Corpus **3,363 reports / 2,847 dependencies**. **867 A · 1,367 B · 613 C**,
A-share 30.5%. `validate` exits 0, 123/123 logic tests, grader selftest
**68/68**, `tsc --noEmit` clean, `vite build` ok. **Grade counts come from
`validate` only.** `kind`: 2,466 publication · 27 standard · 870 instrument.

**Direction (Thomas, 2026-09-05): "tip-top shape with what we have before
looking for more data."** No A-share or size target.

**Grader:** CJK span floor, `acronymFitsHead()`, national `title_aliases`
allowed (types.ts doc comment is the rule). **`--write` has NO
improvements-only guard** — dry-run old vs new code on the same store first.
A re-grade touching a URL must select **every** live edge on it (PLAYBOOK §6).

**EU price-index / HBS chains: closed** — FR IT NL DK CZ NO LU CH AL all have
CPI → national accounts → HBS. No `eurostat-hicp` edge for FR/CZ/AL: no
transmission sentence on their ESMS pages, a finding, not a gap. **DSBB 750
`no-source-node` leads — PARKED.** Remaining `_dropped` leads are no-URL /
dead-host — research, not re-grade.

**Renderer:** three instancers, tick burst, geoAffinity cache, Condensed INT,
member-scaled orbs, the faint-edges fix (`pendingLinkRescale`) and **collide
`iterations` 1** (−17%/tick, layout-identical at 3 seeds) all live and
accepted. **The fit percentile now falls with `spread`** (`fitPercentileFor`,
2026-09-06): flat 0.8 to spread 1, then −0.11 per doubling, floor 0.4. Camera
and `nodeScaleFor` both read the same radius, so apparent node size is
unchanged and only the gaps grow (26% closer camera at spread 1200%). **Tier 1
now honours the INT toggle**, so the DEFAULT opening frame is condensed (it was
53% INT reports). Otherwise as before: grade-driven opacity, A-only ranking,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `view.minGrade` `C`,
`TICK_BURST_MAX` 4 / 8 ms. Headless: `scripts/renderer/` (`census`, `shot`,
`shot-all`, `fit-probe`, `settle`). Four shelved ISOLATED nodes are listed in
memory `fit_percentile_and_tier1_2026-09-06`.

**Research debt**: 0 no-URL, 0 dead-URL, 5 bare-homepage edges. Browser pass
and the 2026-08-31 audit both closed.

**Uncommitted since Thomas's second 2026-09-05 commit** (on disk, shas
compared): everything the archived 23:30 handoff listed, plus — from the two
2026-09-06 rounds — `InfluenceGraph.tsx`, `hierarchy.ts`, `ViewControls.tsx`,
`Onboarding.tsx`; `scripts/measure-forces.ts` and three new scripts
(`measure-mutual-rank.ts`, `renderer/shot-all.mjs`, `renderer/fit-probe.mjs`)
with `renderer/README.md`; the slice `eu-hbs-and-price-index-gaps-2026-09-05
.json`, two `edit_scripts/*-2026-09-05.py`, two `evidence-cache/` records,
`PLAYBOOK.md`, and two `Claude outputs/` folders. `public/corpus-data.json` is
gitignored and rebuilt by the hooks; the copy on disk is one round stale.
`package-lock.json`: run `setup-and-run.bat` once, then commit.

**Known node defects**: none open. `naics`, `icd-10-ca`,
`icls-work-statistics-resolution` deliberately stay `standard` (classification
instruments) — flip if Thomas says so. Egypt IPI compiler unverified.

---

## 3. Todo (live items only)

### [Thomas] — only you can. Two rulings, two looks, and a commit.

1. **Charge `theta` 0.9 → 1.5?** Another −35% per tick on top of collide
   (both together 123.9 → 65.9 ms/tick, min of four interleaved runs). A
   layout change — cloud p95 −14%, intra-cluster spread −10% — but the fit
   renormalises most of it (`onscreen` 0.741→0.718, 0.860→0.860, 0.578→0.549).
   Shots in `Claude outputs/layout-levers-2026-09-05/`. One line beside
   `charge?.distanceMax(420 * m)`.
2. **Mutual-pair rank leakage.** `npx tsx scripts/measure-mutual-rank.ts`.
   Four pairs; the NZ Acts are the finding — `nz-public-audit-act-2001` and
   `nz-public-finance-act-1989` rank **23rd and 24th of 3,363**, and 376th /
   415th with both halves out of the ranking. Options: leave it; exclude
   `mutual` edges from `rankedEdges` only (they stay live on screen); damp
   them. The script says why that drop is an upper bound, not a measurement.
3. **Look at the two shipped-on-your-word changes** in
   `Claude outputs/fit-percentile-and-tier1-2026-09-06/`: the tier-1 fold
   (before/after) and the spread-1200% fit pair. Both are one-line reverts.
4. **Should the lens row go live at tier 1 too?** It is inert there because
   "the real nodes are mostly INT — white in every lens". With INT condensed
   by default that is no longer true; the 184 nodes left are family-coloured.
5. `setup-and-run.bat` once, then **commit** the §2 list.
6. Still watching: faint edges recurring at Everything after a settle; and
   whether the bigger orbs (INT ≈ 3×) are right.

### [Agent]

Nothing queued. The two design questions still parked — layout re-run on data
add, cadence in layout — have no numbers behind them and no round has needed
them.

Settled: CO reversals; photon+link and node instancing; 9 CJK flips; national
aliases; START-HERE; 6 kind rulings; Condensed INT; cluster repulsion as is;
collide iterations 1 (accepted 2026-09-06); tier 1 honours the INT toggle;
fit percentile falls with spread.

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
