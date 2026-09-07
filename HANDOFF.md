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

Last updated: 2026-09-07 ~02:40 UTC (round 8 — the NSDP block: 70 nodes, 71 edges,
and two matcher findings waiting on Thomas in §3)

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
| `HANDOFF.md` | 14.1k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 41.7k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **65.5k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **36.8k** | HANDOFF + CLAUDE + core + RENDER |

**§1-§3 is at the cap and is trimmed every round to stay there.** State and
pointers only; the narrative is in project memory.

---

## 2. Current state

Corpus **3,505 reports / 3,071 dependencies**. **1,050 A · 1,409 B · 612 C**, A-share
34.2%. **Domains: 46 approved, 0 proposed.** `validate` exits 0, 123/123 logic tests,
`tsc --noEmit` clean; the grader was untouched, so its selftest stands at round 6's
74/74, not re-run. `vite build` NOT run. `public/corpus-data.json`
regenerated and copied back, current as of 2026-09-07 02:32 UTC. Two bare-homepage
edges now exist, both this round's — `is-nsdp` and `mn-nsdp`, whose own NSDP address IS
a host root; both C, which keeps that warning an error no longer.

**The NSDP block is done: 70 nodes and 71 edges.** All 81 first-party NSDP URLs from
the IMF's list endpoints were fetched — 66 from the sandbox, 10 in Thomas's own Chrome,
9 still unread. Records in `src/data/research/int-imf-nsdp-2026-09-07.json`, narrative
in memory `round8_nsdp_block_2026-09-07`. **HK, PS and SV** entered the corpus for the
first time and carry new `COUNTRY_FAMILY` / `CONTINENT_OF` / `COUNTRY_LABEL` entries.

**Every grade in the block is the grader's, not a hand grade.** Nineteen edges
moved down when `grade-evidence.ts --slice` was run over them and the reader took
its verdict each time. Six edges whose host refuses the grader's own fetcher
(Colombia, Malta, Brazil, the Netherlands, Tunisia, China) are kept on a §7b
reader's ruling recorded in each basis.

**THE MATCHER FINDING, AND IT NEEDS THOMAS: `namesTarget` can never see
`(SDDS Plus)`.** The acronym branch requires the parenthetical to be all upper case
(`/^[\p{Lu}\p{N}][\p{Lu}\p{N}.\- ]*$/`), so `(SDDS)` fires and the lower-case "lus"
disqualifies `(SDDS Plus)`. Twelve SDDS Plus pages saying "SDDS Plus" in their own
heading therefore grade `agency-not-artefact` and sit at B: AT, BE, CZ, DK, FI, FR, HU,
LT, MK, SE, SK, US. Untouched — matcher change, his call.

**Second finding, applied not ruled: the grader's html extractor does not decode HTML
entities**, so a quote copied from a rendered page (`Fund’s`) cannot match the stored
text (`Fund&rsquo;s`) and returns `partial-quote`; three edges (GE, HU, MA) were re-cut
around it. Six of the block's URLs already backed older edges and were re-graded with
every live edge selected — psa.gov.ph walls the sandbox, so its record holds a wall
verdict until refetched.

**Nine of the 81 are still unwired, and four are one click away: dea.gov.in,
kostat.go.kr + mods.go.kr, insse.ro, bportugal.pt** render in Chrome and are refused
by the extension ("permission denied for reading pages on this domain"). The other
five — Bulgaria, Seychelles, Paraguay, Estonia, the Euro Area — are refused on
evidence rather than access, each with its reason in the slice's `_dropped`.

**Direction (Thomas, 2026-09-06): gathering data**, target THIN COVERAGE — memory
`gb_national_core_2026-09-06` has the census and method. GB and AU are done; DE and
FR/IT/ES/SE/BE/AT/PL/FI remain. **979 nodes still have zero edges**, unchanged: the block
added 70 and wired all 70.

**Renderer and ranking:** no work this round.

---

## 3. Todo (live items only)

### [Thomas]

**1. The `(SDDS Plus)` acronym case above.** Twelve B edges turn on it. The
upper-case test was measured before adoption and should be measured again if loosened —
it is the guard that keeps `(2016)` and `(ESA 2010)` out.

**2. Should a country carry two tier edges?** Twenty-six of the block's countries
already had one from an institutional node (REGISTER, about the country) and now
also have one from their NSDP (SELF-DECLARED, about the page). Both are true and
separately evidenced, and rule 13 says the new one does not silently override the
old. If you want one per country, the older REGISTER edge is the one to drop and it
is a single pass — list in the block's own `_dropped` note.

**3. Four extension permissions**, named in §2 — one more edge each.

### [Agent]

**Thin coverage:** DE next, then FR/IT/ES/SE/BE/AT/PL/FI. Method in memory
`gb_national_core_2026-09-06`. Round 7's five orphaned NSO nodes (Sudan, Yemen,
Syria, Iraq, Iran) are leads for the same programme from the other direction.

**The e-GDDS third of the tier finding, untouched and structurally harder:** 34
confirmed participants with a real NSDP and no node, and no `NSDPUrl` for any e-GDDS
row, so each anchor has to be found on the country's own site. List with dates in
`int-imf-tier-sweep-2026-09-07.json`. Botswana and Tanzania are the two most
valuable — both carry a live `-> imf-sdds` edge while the IMF lists them as e-GDDS.

**A non-ASCII-hyphen sweep, opened round 6 and STILL NOT DONE.** Any pass looking for
product numbers, section numbers or dates in an extracted document must search the hyphen
CLASS (`-`, U+2010, U+2011, en dash), never ASCII `-`; cover diacritics and HTML entities
too — this round's second finding is the same failure.

**The UEMOA NCOA retarget pass, opened round 6 and deliberately not done.** Thirteen
UEMOA/CEMAC CPI edges point at `afristat-ihpc-guide-2014` or `uemoa-ihpc-note-2023`
because `afristat-ncoa-ihpc` did not exist. **Read the vintage split first** (SN, NE, CI
on NCOA 2018, correctly wired to `un-coicop-2018`); lead in the slice's `_dropped`.

**The rest of the IMF pool:** the per-country metadata seam, and the GFSR
(`notes/imf-elibrary-2026-09-06.md` has the ISBN recipe).

**Settled, do not re-raise:** the null-ComplianceDate class; round 7's tier
confirmations (Taiwan, Mauritius); round 5's little things 1-3. New this round: the Euro
Area row (not a country, placeholder dates, refused twice); wiring a tier edge onto a
single ordinary publication (the NSDP is the exception, reason in the block's note); and
Estonia's NSDP, read in full and refused because "SDDS" appears only in its URL path.
Older calls: `PLAYBOOK-CORPUS.md` §7 / `PLAYBOOK-RENDER.md` §7.

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
