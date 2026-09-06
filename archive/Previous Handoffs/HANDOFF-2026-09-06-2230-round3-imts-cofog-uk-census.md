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
| "what is still broken that nobody is fixing?" | `notes/standing-issues.md` — items that outlived five handoffs; not on the mandatory read path |
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
| `HANDOFF.md` | 15.8k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 32.5k | corpus lane — §7 now splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **58.0k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **38.5k** | HANDOFF + CLAUDE + core + RENDER |

§1-§3 is 11.1k. **This file is the fast layer and is supposed to turn over** —
watch whether §2 still describes the lane being worked, not its size. Both
playbooks were reviewed 2026-09-06 against `PLAYBOOK.md` §1's two tests. Neither
got much smaller and that is the honest result: what both passes actually found
was rules filed where their audience never reads them, and facts that had gone
stale. **The §7 reorganisation is the read-cost win that does not show up here** —
a round now reads one of 7a/7b/7c, roughly 5-6k, instead of 17k of interleaved
rulings.

---

## 2. Current state

Corpus **3,417 reports / 2,951 dependencies**. **943 A · 1,394 B · 614 C**,
A-share 31.9%. **Domains: 46 approved, 0 proposed** (was 40/624 — see §3).
**Zero bare-homepage edges**, and 0 no-URL / 0 dead-URL: the URL debt is closed. `validate` exits 0, 123/123 logic tests, grader selftest
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

**Rounds 1–3 (2026-09-06) added 54 reports and 104 dependencies** — GB, AU, IE,
the devolved UK, the UK census statutory chain, IMTS, COFOG and the ONS
registers. What each round found, and every lead it left, is in memory
`gb_national_core_2026-09-06`, `thin_coverage_round2_2026-09-06` and
`round3_leads_and_imf_2026-09-06`. (§4 step 3: no changelog here — this line is
scope, not history, and goes at the next review.)

**`elibrary.imf.org` is open and `www.imf.org` is not** (Thomas found it,
2026-09-06). `?bot=bot` plus `/downloadpdf/display/book/<isbn>/<isbn>.pdf` serves
whole manuals to a plain curl; www.imf.org 403s every path on both networks. Two
traps — one ISBN PER LANGUAGE (GFSM 2014 English is the fifth search hit), and
the manuals are two-column so plain `pdftotext` is what quotes, not `-layout`.
Recipe and the ISBN table for nine documents:
`notes/imf-elibrary-2026-09-06.md`. It bought `imf-gfsm -> un-cofog-1999` and
`imf-gfsm -> sna-2008` the same hour.

**Renderer:** three instancers (the only draw path), tick burst, geoAffinity
cache, Condensed INT, member-scaled orbs, faint-edges fix. Shipped levers: collide
`iterations` 1 + charge **`theta` 1.5** (123.9 → 65.9 ms/tick; a layout change the
fit renormalises, `THETA=0.9` is the old layout), every lens live at every tier,
and a fit percentile that falls with `spread`. Tier 1 folds INT, so the DEFAULT
opening frame is condensed. Every constant, and why, is in `PLAYBOOK-RENDER.md`
sections 3-4 with dated code comments; the round narrative is in memory
(`fit_percentile_and_tier1_2026-09-06`, `condensed_int_and_rulings_2026-09-05`).
Headless: `scripts/renderer/`. **Unmeasured on Thomas's hardware**: node
instancing (target 25.00 → 16.67 ms/frame) and the tick burst.

**Ranking:** `mutual: true` edges are out of `rankedEdges` — live and on screen,
but not feeding PageRank, because a mutual pair is a 2-cycle that pumps its own
rank. Four pairs, curated not computed. `measure-mutual-rank.ts` printing
identical shipped and both-halves columns IS the fix, not a broken script.

---

## 3. Todo (live items only)

### [Thomas]

**Three live edges came back weaker than their citation, and dropping a live
edge is your call.** All three were re-pointed at real documents on 2026-09-06
and none had its grade written down (§7b), but the quote names an agency or a
class rather than the target artefact — the 2026-08-31 F-05 shape that dropped
six edges then. `nt-bureau-statistics -> statcan-population-estimates` (C): the
NWT release's only attribution is "Source: Statistics Canada, Demography
Division" — no publication, no table number. `nt-bureau-statistics ->
statcan-national-accounts` (B, so currently overstated): the GDP page's one
mention of Statistics Canada names the agency and nothing else.
`gn-cns-snds-2016-2020 -> afristat-ihpc-guide-2014` (C): the Guinea SNDS names
AFRISTAT the organisation and its member-state nomenclatures — "IHPC" appears
only in its acronym list — which is the 2026-09-05 organisation-vs-instrument
ruling exactly, so the TARGET is probably wrong rather than the edge. Drop all
three, or retarget the Guinea one to an AFRISTAT nomenclatures artefact. A
fourth, `mz-sadc-hcpi-bulletin -> mz-ine-ipc` (C), names "the National HCPIs of
the Member States" as a class with Mozambique only a row label; same question,
weaker case for dropping since the bulletin does carry Mozambique's values.

**Four tags cleared your 8-use threshold and I stripped them anyway — say if
that was wrong.** `legal` (12 uses), `ageing` (10), `payments` (9) and
`resources` (9) all passed the bar, but every node carrying them already carried
an approved domain that covers them (`statistical-system`, `population`,
`banking`/`monetary-policy`, `energy`/`mining`/`environment`), so promoting them
would have imported the duplication instead of removing it. Six were promoted
instead of fifteen. Reversing any of the four is a line in `types.ts` plus a
lookup in `notes/proposed-tags-retired-2026-09-06.json`, which holds every
node's before and after.

**Decided 2026-09-06, recorded so it is not re-opened:** the `PLAYBOOK-CORPUS.md`
worked-examples move is **leave it for now** — §7's reorganisation already took
the read cost down where it mattered. §6 stays unpruned by the same decision.

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

**Settled, do not re-raise:** everything in §2 is executed, and everything older
is in project memory and in `PLAYBOOK-CORPUS.md` §7 / `PLAYBOOK-RENDER.md` §7.

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
   **This file is the fast layer and is meant to turn over** — §2's
   weight follows whatever lane is actually being worked, so if the work
   moves to the renderer, the corpus paragraphs shrink to a pointer and
   the renderer ones expand, not the reverse (`PLAYBOOK.md` §1, second
   test). Keep this §4 verbatim so the next agent knows the procedure.
4. **Sweep what is finished out.** A todo that is done, a lever that is
   settled and already described in §2, a "Settled:" entry from an
   earlier round — all leave. The round's project-memory entry is their
   record, and this file is state, not history. Nothing accumulates here
   by default; if you would not act on it next session, it goes.
5. **Every fifth handoff, review the last five.** The trigger is
   arithmetic, not memory: after your copy in step 2, if
   `ls -1 "archive/Previous Handoffs"/HANDOFF-*.md | wc -l` is divisible
   by 5, run the review. Read this file's §2/§3 and the four archived
   handoffs before it, and find the paragraphs that appear in all five
   unchanged. Each one is then exactly one of three things. **Finished**
   — delete it, memory is its record (step 4 already says so, and this
   is the pass that catches what step 4 missed). **A restatement of a
   playbook or a note** — delete it and let §1 route there instead; a
   second copy of a rule is how the two drift apart. **A real open item
   nobody has acted on in five handoffs** — it goes to
   `notes/standing-issues.md`, which carries the bar in both directions.
   That is a demotion, not a deletion: it was costing every agent a read
   and buying nothing. **Introduced by Thomas, 2026-09-06**, from a
   practice that worked on another project; the first review ran the same
   day, off-cycle at 67, because §1-§3 was already over its own cap, and
   what it removed is recorded in the §1 note. If a review finds nothing
   to cut, say so and move on — "nothing" is a real answer, and forcing a
   cut to justify the pass is how good state gets destroyed.
6. **Refresh the read-cost table in §1** and repeat those numbers to
   Thomas in the handoff message — it is how he sees bloat arriving:
   `wc -c HANDOFF.md CLAUDE.md PLAYBOOK.md PLAYBOOK-CORPUS.md
   PLAYBOOK-RENDER.md REPORTS.md START-HERE.md`. If §1–§3 is over 10k, trim before adding.
7. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to whichever playbook binds it (`PLAYBOOK.md`
   §1 has the test). A design change goes to `notes/Midvamp - Revamp.md`
   (or `REPORTS.md` if it changes direction).
8. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
