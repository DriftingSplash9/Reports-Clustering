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

Last updated: 2026-09-07 ~02:10 UTC (round 4 closed — ONS registers, the IMF seam opened, six rulings executed, the dsbb write-offs swept)

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
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first — it routes the lane. Then the round memory for your bit: `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera fit), `condensed_int_and_rulings_2026-09-05` (INT fold). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/`. *(Four rows collapsed to one on 2026-09-07 — they restated PLAYBOOK-RENDER's own routing, which is how the two drift apart.)* |
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
| `HANDOFF.md` | 14.0k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 36.2k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **59.9k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **36.7k** | HANDOFF + CLAUDE + core + RENDER |

**§1-§3 is 10.6k, over this file's own 10k cap.** Trimmed four times writing this
handoff (renderer read-order rows 4→1, the IMF endpoint table moved to
`notes/imf-dsbb-2026-09-06.md`, two §3 lists compressed into their memory entry);
what is left is load-bearing. **Next handoff should cut, not add** — and watch
whether §2 still describes the lane being worked, not its size.

---

## 2. Current state

Corpus **3,428 reports / 2,991 dependencies**. **980 A · 1,398 B · 613 C**,
A-share 32.8%. **Domains: 46 approved, 0 proposed.** Zero bare-homepage edges,
0 no-URL / 0 dead-URL. `validate` exits 0, 123/123 logic tests, grader selftest
**68/68**, `tsc --noEmit` clean, `vite build` ok. **Grade counts come from
`validate` only.** `kind`: 2,509 publication · 39 standard · 880 instrument.
`public/corpus-data.json` regenerated, current as of 2026-09-07.

**Direction (Thomas, 2026-09-06): gathering data.** The target is THIN
COVERAGE — regions and nations oddly short on reports or dependencies, with the
well-covered nations as the template. No A-share or size target.

**Thin splits two ways**, and the split is what scopes a round: (a) big economies
reached through one narrow template — **GB and AU are done**, DE and
FR/IT/ES/SE/BE/AT/PL/FI remain; (b) 978 of 3,345 nodes with zero edges, in
EG · IR · TW · SG · ID · IN · CN · RU · INT. The coverage census and the method
are in memory `gb_national_core_2026-09-06`; §3 carries what to do next.

**THE IMF IS THE ACTIVE SEAM AND IT IS WIDE OPEN.** Three hosts, three problems,
all solved; both recipes are written down and **must not be re-derived**:
`www.imf.org` 403s every path from every network, `/-/media/` included — so at
least one live A-grade edge cites a URL that no longer answers;
`elibrary.imf.org` serves the manuals AND the flagships, which are shelved as
books (`notes/imf-elibrary-2026-09-06.md` and its periodical addendum);
`dsbb.imf.org` is an AngularJS shell read through its own REST API
(`notes/imf-dsbb-2026-09-06.md`, which now carries all four endpoints that
matter). The two found on 2026-09-06 evening are the ones round 5 turns on:
`api/country/getcountrybytype` gives the definitive tier lists (**110 e-GDDS ·
49 SDDS · 32 SDDS Plus**) and `api/country/getsubscriptiondateInfos` gives the
per-country e-GDDS dates, where **`ComplianceDate` is the NSDP first-posted date
and null means never implemented** — so list membership alone is not evidence.

`imf-sdds`, `imf-sdds-plus`, `imf-dqaf`, `imf-weo` and `imf-fiscal-monitor` were
all pure sinks before round 4 and now have outgoing edges. `imf-e-gdds` is still
a sink, and the round established why: e-GDDS has no methodology table to wire
from.

**Renderer — no work this round.** Every shipped constant and its reason is in
`PLAYBOOK-RENDER.md` §3–§4 and in dated code comments; harness in
`scripts/renderer/`; narrative in memory. **One open item**: node instancing
(target 25.00 → 16.67 ms/frame) and the tick burst are still unmeasured on
Thomas's hardware.

**Ranking:** `mutual: true` edges stay live and on screen but out of
`rankedEdges` — a mutual pair is a 2-cycle that pumps its own rank. **Five
pairs**, curated not computed. `measure-mutual-rank.ts` printing identical
shipped and both-halves columns IS the fix, not a broken script.

---

## 3. Todo (live items only)

### [Thomas]

**Nothing is waiting on you.** All six rulings of 2026-09-06 are executed: the
four weak live edges, the caption fix (§7a says A, and the 14 table-cell edges
moved with it), and the table-number ruling (§7a, three conditions, three edges
upgraded and two refused on the conditions).

### [Agent]

**Round 5, in the order Thomas set: the little things, then the IMF pool.**

**The little things.** All evidenced already; none needs new research.

1. *Two Chrome reads, four grades.* `dsbb.imf.org/e-gdds/important-dates-history`
   renders the heading and the country row on one page, taking this round's three
   e-GDDS edges from B to A. And **yukon.ca serves a Cloudflare interstitial to
   the cloud sandbox** — the only thing holding `yt-statistical-review ->
   statcan-population-estimates` at B, on a Sources line naming six 17-10-* tables.
2. *Three nodes, each blocking edges already found and quoted*: the **2004 CPI
   Manual** (*Theory and Practice*; the corpus has only the 2020 *Concepts and
   Methods*), **MFSM 2000** plus the 2008 Compilation Guide (the corpus has only
   the 2016 merger), and **IRIP 2009**. Older-edition siblings are established
   corpus practice — `sna-1968`, `sna-1993`, `sna-2008` and `sna-2025` all exist.
3. *Three more nodes, one alias, one bad edge* — detail in memory
   `round4b_rulings_and_dsbb_reopen_2026-09-06`: the **Eurostat COFOG manual
   2019**, an **IMTS Revision 2**, AFRISTAT's **NCOA-IHPC** (2008, the likely real
   target for West African CPI edges now defaulting to `afristat-ihpc-guide-2014`);
   `title_aliases` "Sistema Armonizado" on `hs`, which lifts several Latin American
   edges; and `cmhc-residential-mortgage-industry-report ->
   statcan-national-accounts`, which has no `evidence_quote` at all and names a
   balance-sheet table, not the quarterly accounts — a probable wrong target.

**The IMF pool.** Biggest first.

1. *Sweep the whole corpus against the tier endpoints.* The ~50 existing
   `-> imf-e-gdds` and ~30 `-> imf-sdds` edges have never been checked against
   `getcountrybytype` and `getsubscriptiondateInfos`. One pass verifies all of
   them — **and catches any that are wrong in the direction nobody looks**, i.e.
   a country wired to a tier it is not in, or wired to e-GDDS on a null NSDP.
   Nothing else on this page is that cheap per edge.
2. *The per-country metadata seam.* `getBaseSummaryofMethodologies` and the
   DQAF-base country pages cover 191 countries across ~20 data categories each.
   A 2026-09-05 round took 136 edges out of it before the recipe was understood;
   it is the largest untapped source of A-grade national methodology edges.
3. *Finish the flagships.* The **GFSR** was never read — April 2025 is ISBN
   `9798229003261`, whole-issue PDF to a plain curl. `imf-weo -> imf-bpm6` is
   deferred on a real finding: the only statement is in the WEO's Table G, which
   `pdftotext` renders as column soup with no quotable span. Chrome read.

**Then back to thin coverage**: DE, then FR/IT/ES/SE/BE/AT/PL/FI. The CA/US/GB/AU
pattern transfers directly and Eurostat's national metadata
(`PLAYBOOK-CORPUS.md` rule 16) does half the work.

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
