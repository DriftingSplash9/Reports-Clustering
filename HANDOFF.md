# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under 10k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative. Finished items LEAVE
(§4 step 4); the round's memory entry is their record.

Last updated: 2026-09-06 ~09:15 UTC (doc consolidation + three-way playbook split)

---

## 1. Read next

**The project's only read order — `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block
point here.** This file first, then `PLAYBOOK.md` in full — it is short and
routes you to one lane playbook. Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` — short, binds every task, and its §1 hands you the one lane playbook (CORPUS or RENDER) |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md`; for "can I reach host X?" `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| visual / layout work · INT fold | `PLAYBOOK-RENDER.md` §3–§4, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md`; memory `condensed_int_and_rulings_2026-09-05` |
| renderer draw path / instancers | memory `node_instancing_2026-09-05`, `link_batching_2026-09-05`, then `renderer_perf_measured_2026-09-04` |
| settle time / physics cost / force tuning | memory `layout_levers_and_hbs_2026-09-05`, then `settle_time_tick_burst_2026-09-05`; `scripts/measure-forces.ts` (`ITER`/`THETA`); `scripts/renderer/settle.mjs`, `shot-all.mjs` |
| camera fit · the spread slider · INT fold | memory `fit_percentile_and_tier1_2026-09-06`; `scripts/renderer/fit-probe.mjs`; `notes/camera-fit-measurement-2026-08-19.md` · `notes/flicker-tests-2026-08-19.md` |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then `REPORTS.md` from *The one-line version* for scope, and project memory,
newest first. Project instructions and memory are summaries written outside the
repo: where either disagrees with a file, the file wins. Git status: never
state it (rule 1).

**Read cost, refreshed every handoff** (§4 step 5) — this is the bloat gauge:

| file | k | who reads it |
|---|---|---|
| `HANDOFF.md` | 12.2k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 6.5k | everyone |
| `PLAYBOOK-CORPUS.md` | 28.1k | corpus lane |
| `PLAYBOOK-RENDER.md` | 11.8k | renderer lane |
| `REPORTS.md` | 23.9k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **48.3k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **32.0k** | HANDOFF + CLAUDE + core + RENDER |

---

## 2. Current state

Corpus **3,372 reports / 2,857 dependencies**. **876 A · 1,368 B · 613 C**,
A-share 30.7%. `validate` exits 0, 123/123 logic tests, grader selftest
**68/68**, `tsc --noEmit` clean, `vite build` ok. **Grade counts come from
`validate` only.** `kind`: 2,473 publication · 28 standard · 871 instrument.
No data changed on 2026-09-06 — that day was documentation only.

**Direction (Thomas, 2026-09-06): back to gathering data.** The polish pass is
done; the target is THIN COVERAGE — regions and nations oddly short on reports
or dependencies, with the well-covered nations as the template for what to go
looking for. No A-share or size target. `REPORTS.md`'s roadmap row 7 still
says polish is in progress; `START-HERE.md` has been updated to this direction.

**Thin splits two ways, wanting different rounds**: (a) big economies reached
through one narrow template — AU 23 nodes, DE 13, FR/IT/ES/SE/BE/AT/PL/FI/IE
all 7–9 and all just the price-index → NA → HBS chain; (b) 978 of 3,345 nodes
with zero edges, in EG · IR · TW · SG · ID · IN · CN · RU · INT. Census and
method: memory `gb_national_core_2026-09-06`. **Round 1, GB national core, is
done** — 9 reports · 10 dependencies · 9 A + 1 B, all wired
(`gb-national-core-2026-09-06.json`). AU is the same shape GB was.

**Docs, 2026-09-06:** the playbook is three files — `PLAYBOOK.md` (core, binds
every task), `PLAYBOOK-CORPUS.md`, `PLAYBOOK-RENDER.md`. **Rule numbers are
global and permanent**, so each file's list has gaps; new rules start at 19.
Each of these has exactly ONE copy and is pointed at, never restated: read
order (§1 here), handoff procedure (§4 here), live counts (§2 here). Project
memory `project_protocol.md` is retired — it had drifted into contradicting
the files. Pre-edit copies: `archive/docs-2026-09-06-pre-consolidation/`,
`archive/playbook/PLAYBOOK-2026-09-06-pre-3way-split.md`. Full account: memory
`doc_consolidation_2026-09-06`.

**Grader:** CJK span floor, `acronymFitsHead()`, national `title_aliases`
allowed (types.ts doc comment is the rule). **`--write` has NO
improvements-only guard** — dry-run old vs new code on the same store first.
A re-grade touching a URL must select **every** live edge on it
(`PLAYBOOK-CORPUS.md` §6).

**EU price-index / HBS chains: closed** — FR IT NL DK CZ NO LU CH AL all have
CPI → national accounts → HBS. No `eurostat-hicp` edge for FR/CZ/AL: no
transmission sentence on their ESMS pages, a finding, not a gap. **DSBB 750
`no-source-node` leads — PARKED.** Remaining `_dropped` leads are no-URL /
dead-host — research, not re-grade.

**Renderer:** three instancers (the only draw path), tick burst, geoAffinity
cache, Condensed INT, member-scaled orbs, and the faint-edges fix
(`pendingLinkRescale`, holding). Shipped levers: collide `iterations` 1, charge **`theta` 1.5**
(together 123.9 → 65.9 ms/tick; a layout change the fit renormalises,
`THETA=0.9` is the old layout), every lens live at every tier, and a fit
percentile that falls with `spread` (`fitPercentileFor`: flat 0.8 to spread 1,
then −0.11 per doubling, floor 0.4 — apparent node size unchanged, only the
gaps grow). Tier 1 honours the INT toggle, so the DEFAULT opening frame is
condensed. **Orb size is settled** (Thomas, 2026-09-06: the INT ≈ 3× orbs are
right). Otherwise as before: grade-driven opacity, A-only ranking,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `view.minGrade` `C`,
`TICK_BURST_MAX` 4 / 8 ms. Headless: `scripts/renderer/` (`census`, `shot`,
`shot-all`, `fit-probe`, `settle`). Four shelved ISOLATED nodes: memory
`fit_percentile_and_tier1_2026-09-06`.

**Ranking:** `mutual: true` edges are excluded from `rankedEdges` (Thomas,
2026-09-06) — they stay live and on screen but no longer feed PageRank, because
a mutual pair is a 2-cycle that pumps its own rank (the NZ Acts ranked 23rd and
24th of 3,363 on each other's support; now 376th and 415th). Four pairs;
`mutual` is curated, not computed. `measure-mutual-rank.ts` printing identical
shipped and both-halves columns IS the fix, not a broken script.

**Research debt**: 0 no-URL, 0 dead-URL, 5 bare-homepage edges. Browser pass
and the 2026-08-31 audit both closed. **Known node defects**: none open.
`naics`, `icd-10-ca`, `icls-work-statistics-resolution` deliberately stay
`standard` (classification instruments) — flip if Thomas says so. Egypt IPI
compiler unverified.

---

## 3. Todo (live items only)

### [Thomas]

**Pruning `PLAYBOOK-CORPUS.md` §6/§7 — a decision, not a task.** Mechanical
pruning is worth nothing: only two true duplicates existed and both are merged.
§6 is 9.6k of 24 traps, §7 is 14.7k of 21 rulings, and every one still decides
something. The 3–4k that could come out is the *evidence* inside each ruling,
which is what makes it believed. Options: **move the worked examples** to
`notes/rulings-evidence.md`, leaving rule and date in §7 (~4k off the
mandatory read, loses nothing, one agent-hour); **move "One-off scope calls"**
(881 chars, 8 calls) into the data's own `_dropped` entries, where §7's own bar
says they belong; or **line-by-line yourself** — nothing here expires.

### [Agent]

**Round 2 unscoped.** AU is the same shape GB was. Two leads left in the GB
slice's `_dropped`: `obr.uk` 403s to a browser-UA curl from BOTH networks, so
the OBR *Economic and fiscal outlook* is `no-node-yet` — read it in Thomas's
Chrome (CORPUS §7: direct read) or find a first-party PDF; and
`gb-ons-lfs -> icls-work-statistics-resolution` is `no-document` — the LFS QMI
names the ILO, not the resolution.

The two design questions still parked — layout re-run on data add, cadence in
layout — have no numbers behind them and no round has needed them.

**Settled, do not re-raise:** the 2026-09-06 rulings (charge theta 1.5, mutual
pairs out of the ranking, lens at every tier, orb size, fit percentile, tier-1
INT fold) are executed and described in §2, each a one-line revert if a lever
turns out wrong on your hardware. Everything older is in project memory and in
`PLAYBOOK-CORPUS.md` §7 / `PLAYBOOK-RENDER.md` §7.

---

## 4. How to hand off

**This is the only copy of this procedure — `PLAYBOOK.md` points here rather
than restating it.** Editing a line of §2/§3 during a round is not a handoff
and needs no archive. Writing a new handoff — replacing the state prose
wholesale — always does, and the test is whether the prose being replaced
would be unrecoverable afterwards, not whether §1–§4 still exist.

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   HHMM-<topic>.md` (UTC date and time in the title, topic = what the
   superseded state was about). Verify the copy (`sha256sum` both).
   **Archive first, then rewrite** — there is no git safety net (rule 1);
   an un-archived overwrite destroys the previous state.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   Keep this §4 verbatim so the next agent knows the procedure.
4. **Sweep what is finished out.** A todo that is done, a lever that is
   settled and already described in §2, a "Settled:" entry from an
   earlier round — all leave. The round's project-memory entry is their
   record, and this file is state, not history. Nothing accumulates here
   by default; if you would not act on it next session, it goes.
5. **Refresh the read-cost table in §1** and repeat those numbers to
   Thomas in the handoff message — it is how he sees bloat arriving:
   `wc -c HANDOFF.md CLAUDE.md PLAYBOOK.md PLAYBOOK-CORPUS.md
   PLAYBOOK-RENDER.md REPORTS.md START-HERE.md`. If §1–§3 is over 10k, trim before adding.
6. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to whichever playbook binds it (`PLAYBOOK.md`
   §1 has the test). A design change goes to `notes/Midvamp - Revamp.md`
   (or `REPORTS.md` if it changes direction).
7. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
