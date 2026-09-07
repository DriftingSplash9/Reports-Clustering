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

Last updated: 2026-09-06 ~23:35 UTC (round 6 — the third PDF rendering, and all
three of Thomas's rulings executed; §3 [Thomas] is empty)

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
| `HANDOFF.md` | 13.1k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 39.0k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **61.8k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **35.8k** | HANDOFF + CLAUDE + core + RENDER |

**§1-§3 is 9.0k, under the cap** — round 6 emptied the [Thomas] queue, which paid
for everything added. Two entries went to `PLAYBOOK-CORPUS.md`: one §6 line naming
the third rendering's guard, one §7a ruling on nomenclature citations.

---

## 2. Current state

Corpus **3,435 reports / 3,003 dependencies**. **1,002 A · 1,391 B · 610 C**,
A-share 33.4%. **Domains: 46 approved, 0 proposed.** Zero bare-homepage edges,
0 no-URL / 0 dead-URL. `validate` exits 0, 123/123 logic tests, grader selftest
**74/74**, `tsc --noEmit` clean; `vite build` NOT run this round.
`public/corpus-data.json` regenerated and copied back, current as of
2026-09-06 23:30 UTC.

**Direction (Thomas, 2026-09-06): gathering data**, target THIN COVERAGE — see
memory `gb_national_core_2026-09-06` for the census and method. GB and AU are
done; DE and FR/IT/ES/SE/BE/AT/PL/FI remain; **976 of the research slices'
3,416 nodes still have zero edges** (counted this round from `corpus-data.json`).

**The grader now reads a PDF THREE ways** (Thomas ruled 2026-09-06; landed the
same day). Plain `pdftotext` reading order joins `-layout` and pdf.js; every
rendering is graded and the BEST wins, so it can only ever ADD matches. Measured
before adoption rather than inherited from the note proposing it (rule 8): the
Compilation Guide's ¶1.1 goes **0.79 / 0.71 / 1.00**. Two things a round must
know — a PDF's committed `evidence-cache/` header now carries `alt2-extractor` /
`alt2-text-chars` (HTML records and everything written earlier stay
byte-identical), and **a CACHED record has no third rendering, so an offline
re-grade of the existing store sees no change at all.** Fresh fetch only; that is
what `--refetch` is for. No data changed. Detail: memory
`third_pdf_rendering_2026-09-06`.

**Round 6 executed Thomas's three rulings** and the corpus moved five edges to A.
`statcan-provincial-gdp-by-industry` minted (StatCan IMDB 1303, table 36-10-0402-01
resolved against the agency's product page) and the Yukon GDP edge retargeted onto it
at A; the old edge is preserved on a `wrong-target` `_dropped` in
`territories-canada-grok-2026-08.json`. All four `Sistema Armonizado` edges moved —
three by live read, `cl-comercio-exterior -> hs` C→A off a Chrome read because
bcentral.cl is a JS shell to both machines, and `cl-cuentas-nacionales ->
cl-comercio-exterior` came C→B on the same page. The ruling behind them is now
`PLAYBOOK-CORPUS.md` §7a. Narrative: memory `round6_rulings_2026-09-06`.

**The IMF seam is still the active seam and still wide open** — both recipes in
`notes/imf-*.md`, do not re-derive. Round-5 Chrome captures are parked in
`tmp_work/evidence-fulltext-round5-2026-09-06/` (keyed by sha256(url)) for an
offline dsbb re-grade; they carry no third rendering.

**Renderer:** no work this round. **Ranking:** five curated `mutual: true`
pairs, unchanged.

---

## 3. Todo (live items only)

### [Thomas]

**Nothing outstanding.** The three questions from the last handoff are ruled and
executed (§2, and `PLAYBOOK-CORPUS.md` §7a for the nomenclature ruling). The
product-number grader path stands as written.

### [Agent]

**The IMF pool, unchanged and still the biggest thing on the board:** the
corpus-wide sweep of the ~50 `-> imf-e-gdds` and ~30 `-> imf-sdds` edges against
the two `api/country/` endpoints (memory `round4b_rulings_and_dsbb_reopen_2026-09-06`
has both and the `ComplianceDate` discriminator) — one pass checks every one of
them in both directions, and it is the cheapest lead there is. Then the
per-country metadata seam and the GFSR.

**Thin coverage:** DE next, then FR/IT/ES/SE/BE/AT/PL/FI. Method in memory
`gb_national_core_2026-09-06`.

**A non-ASCII-hyphen sweep, newly opened by round 6 and NOT done.** The Yukon
Statistical Review cited six Statistics Canada tables by number for four rounds without
anyone seeing them, because it sets them with U+2011 rather than `-`; `normalizeForMatch`
folds U+2011, so the grader was never the problem — every human and script grep was.
Any pass looking for product numbers, section numbers or dates in an extracted document
must search the hyphen CLASS (`-`, U+2010, U+2011, en dash), not the ASCII character.
Worth one sweep of the corpus's own quotes and bases for the same shape.

**The UEMOA NCOA retarget pass, newly opened and deliberately not done.**
`afristat-ncoa-ihpc` now exists; thirteen UEMOA/CEMAC CPI edges point at
`afristat-ihpc-guide-2014` or `uemoa-ihpc-note-2023` because it did not, and some
belong on the nomenclature. Each retarget needs the national bulletin read — a
research pass. **Read the vintage split first**: SN, NE and CI are on NCOA 2018
for the base-2023 series and correctly wired to `un-coicop-2018`; the new node is
the older base only. Lead in the slice's `_dropped`.

**Settled, do not re-raise:** round 5's little things 1-3 in full, the IMTS
Revision 2 refusal included — record in memory `round5_little_things_2_3_2026-09-06`
and the slices' own `_dropped`. Older calls: `PLAYBOOK-CORPUS.md` §7 /
`PLAYBOOK-RENDER.md` §7.

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
