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

Last updated: 2026-09-07 ~01:50 UTC (round 4 — ONS registers, the IMF seam, six rulings executed, the dsbb write-offs re-opened)

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
| `HANDOFF.md` | 14.2k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 33.6k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **57.5k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **36.9k** | HANDOFF + CLAUDE + core + RENDER |

§1-§3 is 10.1k, at its own cap. **This file is the fast layer and is supposed to
turn over** — watch whether §2 still describes the lane being worked, not its
size. `PLAYBOOK-CORPUS.md` grew 1.1k on 2026-09-06 and a round still reads only
one third of its §7.

---

## 2. Current state

Corpus **3,428 reports / 2,991 dependencies**. **980 A · 1,398 B · 613 C**,
A-share 32.8%. **Domains: 46 approved, 0 proposed.** Zero bare-homepage edges,
0 no-URL / 0 dead-URL. `validate` exits 0, 123/123 logic tests, grader selftest
**68/68**, `tsc --noEmit` clean, `vite build` ok. **Grade counts come from
`validate` only.** `kind`: 2,509 publication · 39 standard · 880 instrument.
`public/corpus-data.json` regenerated, current as of 2026-09-06.

**Direction (Thomas, 2026-09-06): gathering data.** The target is THIN
COVERAGE — regions and nations oddly short on reports or dependencies, with the
well-covered nations as the template. No A-share or size target.

**Thin splits two ways.** (a) Big economies reached through one narrow template
— **GB and AU are done**; DE (13 nodes) and FR/IT/ES/SE/BE/AT/PL/FI (7–9 each,
all just price-index → NA → HBS) remain. (b) 978 of 3,345 nodes with zero edges,
in EG · IR · TW · SG · ID · IN · CN · RU · INT. Census and method: memory
`gb_national_core_2026-09-06`.

**The IMF is now readable end to end, and this is the live seam.** Three hosts,
three problems, all solved and both recipes written down: `www.imf.org` 403s every
path from every network, `/-/media/` included — so a live A-grade edge cites a URL
that no longer answers; `elibrary.imf.org` serves books AND the flagships, which
are shelved as books (`notes/imf-elibrary-2026-09-06.md`, plus the periodical
addendum in the file below); `dsbb.imf.org` is an AngularJS shell whose prose comes
from one REST call (`notes/imf-dsbb-2026-09-06.md`). **Do not re-derive either —
read the notes.** `imf-sdds`, `imf-sdds-plus`, `imf-dqaf`, `imf-weo` and
`imf-fiscal-monitor` were all pure sinks before round 4 and now have outgoing
edges; `imf-e-gdds` is still a sink, and the round establishes why — e-GDDS has no
methodology table to wire from.

**Renderer — no work this round.** Everything shipped is described, with its
reason, in `PLAYBOOK-RENDER.md` §3–§4 and in dated code comments; the headless
harness is `scripts/renderer/`; the round narrative is in memory
(`fit_percentile_and_tier1_2026-09-06`, `condensed_int_and_rulings_2026-09-05`).
**The one open item**: node instancing (target 25.00 → 16.67 ms/frame) and the
tick burst are still unmeasured on Thomas's hardware.

**Ranking:** `mutual: true` edges stay live and on screen but out of
`rankedEdges` — a mutual pair is a 2-cycle that pumps its own rank. **Five
pairs** since 2026-09-06, curated not computed. `measure-mutual-rank.ts` printing
identical shipped and both-halves columns IS the fix, not a broken script.

---

## 3. Todo (live items only)

### [Thomas]

**Nothing waiting on you.** The six rulings of 2026-09-06 are all executed: the
four weak live edges, the caption fix (§7a now says A, and the 14 table-cell edges
moved with it), and the StatCan table-number ruling, which is written into §7a with
its three conditions and applied to three edges.

**Two Canadian edges NOT upgraded under the table-number ruling, both for a
reason rather than an oversight.** `fiscal-equalization-program ->
statcan-vehicle-registrations` cites "CANSIM table 405-0004" and the current
`23-10-0308-01` page shows no former-number mapping, so condition 3 of the ruling
refuses it. `yt-statistical-review -> statcan-population-estimates` has the best
quote of the set — a Sources line naming six 17-10-* tables — but yukon.ca sits
behind a Cloudflare interstitial from the cloud sandbox, and a grade is not moved
on a document that was not read. Both want one Chrome read.

**Three nodes that do not exist are each blocking edges already found and
quoted.** Minting them is a small round: the **2004 CPI Manual** (*Theory and
Practice* — the corpus has only the 2020 *Concepts and Methods*), **MFSM 2000**
plus the 2008 Compilation Guide (the corpus has only the 2016 document that
merged them), and **IRIP 2009** (the corpus has IRIP 2010, and the SDDS table
cites the 2009 draft). Also queued behind a node: the **Eurostat COFOG
compilation manual 2019** and an **IMTS Revision 2**.

### [Agent]

**Round 5 unscoped.** Cheapest first.

*Sweep the whole corpus against the dsbb tier lists.* The eight write-offs are
settled (three minted, three refused with a documented reason, two confirmed
already right). What is NOT done is the corpus-wide pass:
`api/country/getcountrybytype` and `api/country/getsubscriptiondateInfos` give the
definitive membership and NSDP date of all three tiers for every country, so the
~50 existing `-> imf-e-gdds` and ~30 `-> imf-sdds` edges could be checked in one
pass — including for edges that are wrong in the other direction. Nothing else on
this page is that cheap per edge.

*Three B's that a browser turns into A's.* The three e-GDDS edges minted this
round cite an API endpoint whose payload does not spell out the standard's name.
A Chrome read of `dsbb.imf.org/e-gdds/important-dates-history`, where the heading
and the country row render on one page, clears the A bar under the 2026-09-04
direct-read ruling.

*The IMF flagships, half-worked*: the Global Financial Stability Report was not
read at all (April 2025 is ISBN `9798229003261`, whole-issue PDF downloads to a
plain curl). `imf-weo -> imf-bpm6` is deferred on a real finding — the only
statement is in the WEO's Table G, which `pdftotext` renders as column soup with
no quotable span, and wants a Chrome read.

*Same shape as rounds 1–3*: DE has 13 nodes and FR/IT/ES/SE/BE/AT/PL/FI have 7–9
each, all the same narrow price-index → NA → HBS template. The CA/US/GB/AU
pattern transfers directly and Eurostat's national metadata
(`PLAYBOOK-CORPUS.md` rule 16) does half the work.

*Small and evidenced*: `ar-comercio-exterior -> hs` sits at B only because INDEC
writes "Sistema Armonizado" — `title_aliases` territory on `hs`, and it would
likely lift several Latin American edges at once.

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
