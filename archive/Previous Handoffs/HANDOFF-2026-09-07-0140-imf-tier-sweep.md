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

Last updated: 2026-09-07 ~01:40 UTC (round 7 — the IMF tier sweep, and Thomas's
null-ComplianceDate ruling executed the same session; §3 [Thomas] is empty)

---

## 1. Read next

**The project's only read order — `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block
point here.** This file first, then `PLAYBOOK.md` in full — it is short and
routes you to one lane playbook. Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` — short, binds every task, and its §1 hands you the one lane playbook (CORPUS or RENDER) |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md`; for "can I reach host X?" `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05`, `round5_little_things_paused_2026-09-06` (product-number path) and `third_pdf_rendering_2026-09-06` (three renderings) · `round6_rulings_2026-09-06` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md` (dsbb REST API), `notes/imf-elibrary-2026-09-06.md` (books, flagships, and both 2026-09-06 addenda — the second corrects the first) |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first — it routes the lane. Then the round memory for your bit: `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera fit), `condensed_int_and_rulings_2026-09-05` (INT fold). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/`. |
| "what is still broken that nobody is fixing?" | `notes/standing-issues.md` — items that outlived five handoffs; not on the mandatory read path |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then `REPORTS.md` from *The one-line version* for scope, and project memory,
newest first. Project instructions and memory are summaries written outside the
repo: where either disagrees with a file, the file wins.

**Read cost, refreshed every handoff** (§4 step 6) — this is the bloat gauge:

| file | k | who reads it |
|---|---|---|
| `HANDOFF.md` | 14.8k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 41.7k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **66.2k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **37.6k** | HANDOFF + CLAUDE + core + RENDER |

**§1-§3 is at the cap and was trimmed to get there.** Rule 19 went to
`PLAYBOOK-CORPUS.md` (+2.7k) and the round's host findings to
`notes/imf-dsbb-2026-09-06.md` addendum 3. What is left here is state and
pointers; the narrative is in memory.

---

## 2. Current state

Corpus **3,435 reports / 3,000 dependencies**. **1,005 A · 1,386 B · 609 C**,
A-share 33.5%. **Domains: 46 approved, 0 proposed.** Zero bare-homepage edges,
0 no-URL / 0 dead-URL. `validate` exits 0, 123/123 logic tests, `tsc --noEmit`
clean; the grader was not touched, so its selftest stands at round 6's 74/74 and
was not re-run. `vite build` NOT run. `public/corpus-data.json` regenerated and
copied back, current as of 2026-09-07 01:36 UTC.

**Direction (Thomas, 2026-09-06): gathering data**, target THIN COVERAGE — see
memory `gb_national_core_2026-09-06` for the census and method. GB and AU are
done; DE and FR/IT/ES/SE/BE/AT/PL/FI remain; **979 of the research slices'
3,416 nodes have zero edges** (up 5 this round — see the ruling below).

**The IMF tier sweep is done and the seam it opens is a NODE problem, not an
evidence one.** All 104 live edges into the three tier nodes were checked against
the IMF's own lists both ways. Two defects fixed (`af-bop -> imf-e-gdds` dropped
`wrong-target`; a false tier claim removed from the `tz-nbs-cpi-dqa` basis), four
minted at A (`ar-sen`, `ge-geostat`, `tr-turkstat` → `imf-sdds`, `bd-bbs` →
`imf-e-gdds`). Everything else flagged was checked and confirmed correct —
narrative in memory `round7_imf_tier_sweep_2026-09-07`, records in
`src/data/research/int-imf-tier-sweep-2026-09-07.json`.

**Thomas ruled the null-ComplianceDate class and it is executed.** Six live
e-GDDS edges stood on a null NSDP date — the fact round 4b used to refuse Libya,
Lebanon and Haiti — so the corpus said one thing six times and the opposite three.
**The refusal won**: `af-nsia`, `ye-cso`, `sy-cbs`, `ir-sci`, `iq-cso`, `sd-cbs`
dropped `no-document`, records in `crossborder-standards-2026-08-22.json`.
`dz-ons-ipc-monthly` deliberately kept. The reasoning, and the `imf-gdds` edition
node that was considered and rejected, are in memory
`round7_imf_tier_sweep_2026-09-07`. **Know before re-wiring anything: five NSO
nodes are now isolated** — `sd-cbs`, `ye-cso`, `sy-cbs`, `iq-cso`, `ir-sci`. That
is the correct outcome; read the refusal before re-proposing the edge.

**Rule 19 is new** (`PLAYBOOK-CORPUS.md` §2): stamp every `basis` with who is
speaking — `SELF-DECLARED:` / `REGISTER:` / `THIRD-PARTY:`. The state that belongs
here is the coverage: **only the 101 tier edges are stamped** (61 REGISTER, 40
SELF-DECLARED, 0 THIRD-PARTY). Everywhere else an unstamped basis means NOT YET
CLASSIFIED, never "unknown tier". Stamp what you touch; no corpus-wide pass.

**The other direction of the sweep is the biggest thing now on the board: 85
countries are confirmed participants the corpus cannot wire for want of an
institutional node** — 29 of 32 SDDS Plus, 21 of 49 SDDS, 34 of the 76 real-NSDP
e-GDDS. Lists with dates are the three `no-node-yet` entries in
`int-imf-tier-sweep-2026-09-07.json`. **The anchor has a first-party URL**:
`NSDPUrl` is populated for all 49 SDDS and all 32 SDDS Plus rows and no e-GDDS
row — 81 National Summary Data Pages named by the IMF itself, the node
`international-frameworks.json` said Canada needed. Under rule 19 an NSDP is the
country's OWN page, so those edges land `SELF-DECLARED`, not `REGISTER`.

**Three DSBB tier pages are in `.evidence-fulltext/`**, read in Chrome
2026-09-07 — `/e-gdds/important-dates-history`, `/sdds/subscription-date`,
`/sdds-plus/subscription-date`. Each is headed with the standard's full name, so
any country row grades A. The two SDDS endpoints were found this round and take
**no** `ContainerID`: `notes/imf-dsbb-2026-09-06.md` addendum 3.

**Renderer:** no work this round. **Ranking:** five curated `mutual: true`
pairs, unchanged.

---

## 3. Todo (live items only)

### [Thomas]

**Nothing outstanding.** The null-ComplianceDate question was raised and ruled in
the same session, and rule 19 came out of it. The one thing waiting on you is not
a question but a scope call, and it is in [Agent] below because it can be scoped
without you: the 81 NSDP nodes.

### [Agent]

**The NSDP node decision, and it is now the largest block of A-gradeable
SELF-DECLARED edges left.** 81 first-party URLs from `NSDPUrl`, one per SDDS and
SDDS Plus country. Needs Thomas's go before minting ~81 nodes — a corpus
expansion, not a wiring round — but the spec can be written first. The e-GDDS
third has no such field and needs an NSO node found per country.

**Thin coverage:** DE next, then FR/IT/ES/SE/BE/AT/PL/FI. Method in memory
`gb_national_core_2026-09-06`. The five newly isolated NSO nodes (Sudan, Yemen,
Syria, Iraq, Iran) are legitimate leads for the same programme, from the other
direction — their own releases are unresearched.

**The rest of the IMF pool**, now that the tier sweep is off it: the per-country
metadata seam, and the GFSR (`notes/imf-elibrary-2026-09-06.md` has the ISBN
recipe; the GFSR's methodology chapter is the one never looked at).

**A non-ASCII-hyphen sweep, opened by round 6 and STILL NOT DONE.** Any pass
looking for product numbers, section numbers or dates in an extracted document
must search the hyphen CLASS (`-`, U+2010, U+2011, en dash), never ASCII `-`:
`normalizeForMatch` folds them, so the grader was never the problem — every human
and script grep was, and it hid six StatCan table citations for four rounds
(memory `round6_rulings_2026-09-06`). Cover diacritics too — the IMF spells
Türkiye with U+00FC and an ASCII search finds nothing.

**The UEMOA NCOA retarget pass, opened round 6 and deliberately not done.**
Thirteen UEMOA/CEMAC CPI edges point at `afristat-ihpc-guide-2014` or
`uemoa-ihpc-note-2023` because `afristat-ncoa-ihpc` did not exist; some belong on
the nomenclature, and each retarget needs the national bulletin read. **Read the
vintage split first** — SN, NE and CI are on NCOA 2018 for the base-2023 series
and correctly wired to `un-coicop-2018`. Lead in the slice's `_dropped`.

**Settled, do not re-raise:** the null-ComplianceDate class in full — six edges
dropped, Libya/Lebanon/Haiti still refused, the `imf-gdds` edition node
considered and rejected; the tier sweep's confirmations (Taiwan's four SDDS
edges, Mauritius on both tiers); round 5's little things 1-3 including the IMTS
Revision 2 refusal. Records are the slices' own `_dropped` and memory
`round7_imf_tier_sweep_2026-09-07` / `round5_little_things_2_3_2026-09-06`. Older
calls: `PLAYBOOK-CORPUS.md` §7 / `PLAYBOOK-RENDER.md` §7.

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
