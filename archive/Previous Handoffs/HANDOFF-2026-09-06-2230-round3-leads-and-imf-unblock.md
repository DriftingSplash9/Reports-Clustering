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

Last updated: 2026-09-06 ~22:30 UTC (round 3 — IMTS, COFOG, UK census legislation, ONS registers; both rulings executed)

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
| `HANDOFF.md` | 14.3k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 6.5k | everyone |
| `PLAYBOOK-CORPUS.md` | 30.5k | corpus lane |
| `PLAYBOOK-RENDER.md` | 11.9k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **52.8k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **34.2k** | HANDOFF + CLAUDE + core + RENDER |

§1–§3 is 11.1k against this file's own ~10k cap (2026-09-06, after three rounds
in one day). What is left is live state; the next handoff should cut a paragraph
of it rather than add. `PLAYBOOK-CORPUS.md` grew 28.4k → 30.5k for the two
rulings, which is the pruning decision below getting more expensive, not less.

---

## 2. Current state

Corpus **3,417 reports / 2,951 dependencies**. **941 A · 1,394 B · 616 C**,
A-share 31.9%. `validate` exits 0, 123/123 logic tests, grader selftest
**68/68**, `tsc --noEmit` clean, `vite build` ok. **Grade counts come from
`validate` only.** `kind`: 2,507 publication · 30 standard · 880 instrument.
`public/corpus-data.json` regenerated, current as of 2026-09-06.

**Direction (Thomas, 2026-09-06): gathering data.** The target is THIN
COVERAGE — regions and nations oddly short on reports or dependencies, with the
well-covered nations as the template. No A-share or size target. `REPORTS.md`'s
roadmap row 7 still says polish is in progress; `START-HERE.md` is updated.

**Thin splits two ways.** (a) Big economies reached through one narrow template
— **GB and AU are done**; DE (13 nodes) and FR/IT/ES/SE/BE/AT/PL/FI (7–9 each,
all just price-index → NA → HBS) remain. (b) 978 of 3,345 nodes with zero edges,
in EG · IR · TW · SG · ID · IN · CN · RU · INT. Census and method: memory
`gb_national_core_2026-09-06`.

**Rounds 1–3 are done, 2026-09-06.** Round 1 GB national core (9 reports · 10
deps); round 2 AU · IE · devolved UK · GB fill (32 · 60); round 3, chasing every
lead round 2 left (13 · 34) — `un-imts-2010`, `un-cofog-1999`, the UK census
statutory chain in all three jurisdictions (5 instruments, 9 edges, all A) and
the ONS registers (`gb-ons-idbr`, `gb-hmlr-ppd`, `gb-ons-ukhpi`, `gb-ons-pipr`,
`gb-ons-ashe`, `gb-ons-bres`). Narrative: memory `thin_coverage_round2_2026-09-06`
and `round3_leads_and_imf_2026-09-06`.

**Both 2026-09-06 rulings are executed into `PLAYBOOK-CORPUS.md` §7.** (1) A
methodology table cell naming a source is caption-equivalent, grade B — it
reopened exactly ONE edge corpus-wide (`sct-gers -> gb-ons-lcf`) and does NOT
reopen agency-only table entries. (2) The ICLS class is closed on purpose: four
rounds refused the same edge for the same reason, so do not re-test it per
country.

**`elibrary.imf.org` is open and `www.imf.org` is not** (Thomas found it,
2026-09-06). `?bot=bot` plus `/downloadpdf/display/book/<isbn>/<isbn>.pdf` serves
whole manuals to a plain curl; www.imf.org 403s every path on both networks. Two
traps — one ISBN PER LANGUAGE (GFSM 2014 English is the fifth search hit), and
the manuals are two-column so plain `pdftotext` is what quotes, not `-layout`.
Recipe and the ISBN table for nine documents:
`notes/imf-elibrary-2026-09-06.md`. It bought `imf-gfsm -> un-cofog-1999` and
`imf-gfsm -> sna-2008` the same hour.

**The OBR block is closed by going around it.** `obr.uk` still 403s every curl
variant from both networks, but HM Treasury publishes the Economic and fiscal
outlook first-party on `assets.publishing.service.gov.uk`, so `gb-obr-efo` is
minted and graded normally. Host readings from both rounds are appended to
`notes/routing-snapshot-2026-09-04.md`, including **gov.scot rate-limiting to
HTTP 202 and recovering** — a trap that reads as "every quote is missing".

**Grader:** CJK span floor, `acronymFitsHead()`, national `title_aliases`
allowed (the types.ts doc comment is the rule). Before any `--write` on graded
edges, read `PLAYBOOK-CORPUS.md` §6 — there is no improvements-only guard, and a
re-grade touching a URL must select every live edge on it.

**EU price-index / HBS chains: closed** (no `eurostat-hicp` edge for FR/CZ/AL —
a finding, not a gap). **DSBB 750 `no-source-node` leads: PARKED.** Remaining
`_dropped` leads are no-URL / dead-host — research, not re-grade.

**Renderer:** three instancers (the only draw path), tick burst, geoAffinity
cache, Condensed INT, member-scaled orbs, faint-edges fix (`pendingLinkRescale`,
holding). Shipped levers: collide `iterations` 1 + charge **`theta` 1.5**
(123.9 → 65.9 ms/tick; a layout change the fit renormalises, `THETA=0.9` is the
old layout), every lens live at every tier, and a fit percentile that falls with
`spread` (`fitPercentileFor`: flat 0.8 to spread 1, then −0.11 per doubling,
floor 0.4). Tier 1 honours the INT toggle, so the DEFAULT opening frame is
condensed; **orb size is settled** (Thomas, 2026-09-06). Every other constant is
as `PLAYBOOK-RENDER.md` §3–§4 describes it. Headless: `scripts/renderer/`.
Detail and the four shelved ISOLATED ids: memory
`fit_percentile_and_tier1_2026-09-06`.

**Ranking:** `mutual: true` edges are out of `rankedEdges` (Thomas, 2026-09-06)
— live and on screen, but no longer feeding PageRank, because a mutual pair is a
2-cycle that pumps its own rank. Four pairs, curated not computed.
`measure-mutual-rank.ts` printing identical shipped and both-halves columns IS
the fix, not a broken script.

**Research debt**: 0 no-URL, 0 dead-URL, 5 bare-homepage edges; no open node
defects. `naics` and `icd-10-ca` deliberately stay `standard` (classification
instruments) — flip if Thomas says so. Egypt IPI compiler unverified.

---

---

## 3. Todo (live items only)

### [Thomas]

Nothing outstanding but the pruning decision below — both 2026-09-06 rulings are
executed and described in §2.

**Pruning `PLAYBOOK-CORPUS.md` §6/§7 — a decision, not a task.** Mechanical
pruning is worth nothing: the only two true duplicates are already merged. §6 is
9.6k of 24 traps, §7 is 14.7k of 21 rulings, and every one still decides
something; the 3–4k that could come out is the *evidence* inside each ruling,
which is what makes it believed. Options: move the worked examples to
`notes/rulings-evidence.md`, leaving rule and date in §7 (~4k off the mandatory
read, one agent-hour); move "One-off scope calls" (881 chars, 8 calls) into the
data's own `_dropped` entries, where §7's own bar says they belong; or
line-by-line yourself. Nothing here expires.

### [Agent]

**Round 4 unscoped.** Three shapes, cheapest first.

*Two nodes, two A-grade edges, already quoted*: `gb-ons-ashe -> Average Weekly
Earnings` and `gb-ons-bres -> Workforce Jobs` are both evidenced and both waiting
on a node that does not exist. The quotes and URLs are in
`gb-ons-registers-2026-09-06.json`'s `_dropped`.

*The IMF seam, now that it is readable*: the corpus carries nine IMF nodes and
none had a readable primary source before 2026-09-06. `dsbb.imf.org` was never
probed and is where `imf-dqaf`, `imf-sdds`, `imf-sdds-plus` and `imf-e-gdds`
live; `imf-weo`, `imf-fiscal-monitor` and `imf-gfsr` are elibrary periodicals
with a different URL shape from the book downloads. Also open: an
improvements-only re-grade selection of six edges this round re-derived from
first-party documents while they sit on Grok-derived evidence
(`int-imts-cofog-2026-09-06.json`'s `_dropped` names all six with their quotes).

*Same shape as rounds 1–3*: DE has 13 nodes and FR/IT/ES/SE/BE/AT/PL/FI have 7–9
each, all the same narrow price-index → NA → HBS template. The CA/US/GB/AU
pattern transfers directly and Eurostat's national metadata
(`PLAYBOOK-CORPUS.md` rule 16) does half the work.

**Smaller leads, all with evidence recorded in this round's `_dropped` entries**:
the four sets of UK Census Regulations (evidenceable exactly as the Orders were);
the Eurostat COFOG compilation manual 2019, a distinct artefact in the same family
as `eu-manual-mgdd`; and an IMTS Revision 2 node, which is what several older
Latin American methodologies actually cite.

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
