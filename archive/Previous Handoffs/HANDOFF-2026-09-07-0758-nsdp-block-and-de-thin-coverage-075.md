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

Last updated: 2026-09-07 ~08:05 UTC (DE national core round 3: +3 nodes, +3 edges,
3 A via grade-evidence.ts, on top of round 2 above and round 8's NSDP block below)

---

## 1. Read next

**The project's only read order — `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block
point here.** This file first, then `PLAYBOOK.md` in full — it is short and
routes you to one lane playbook. Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` — short, binds every task, and its §1 hands you the one lane playbook (CORPUS or RENDER) |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` — recipes, the Eurostat metadata filenames, host workarounds, and the dated routing snapshot it now carries. **Every host reading in it is a claim about one machine on one day: re-probe, never believe it.** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05`, `round5_little_things_paused_2026-09-06` (product-number path) and `third_pdf_rendering_2026-09-06` (three renderings) · `round6_rulings_2026-09-06` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a research slice's `meta.note` from the August 2026 import | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md` (dsbb REST API), `notes/imf-elibrary-2026-09-06.md` (books, flagships, and both 2026-09-06 addenda — the second corrects the first) |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first — it routes the lane. Then the round memory for your bit: `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera fit), `condensed_int_and_rulings_2026-09-05` (INT fold). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/`. |
| "what is still broken that nobody is fixing?" | `notes/standing-issues.md` — items that outlived five handoffs; not on the mandatory read path |
| **editing any doc in the slow layer** | `notes/doc-audit-2026-09-07.md` — the first slow-layer audit: every root `.md` section by section, EDIT/DROP/KEEP/MOVE with the exact text. Read it before rewriting a playbook paragraph |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then `REPORTS.md` from *The one-line version* for scope, and project memory,
newest first. Project instructions and memory are summaries written outside the
repo: where either disagrees with a file, the file wins.

**Read cost, refreshed every handoff** (§4 step 6) — this is the bloat gauge:

| file | k | who reads it |
|---|---|---|
| `HANDOFF.md` | 21.1k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.9k | everyone |
| `PLAYBOOK-CORPUS.md` | 43.7k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 24.3k | renderer lane |
| `REPORTS.md` | 13.6k | scope/direction questions |
| `START-HERE.md` | 13.2k | humans, not agents |
| **a corpus round reads** | **75.2k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **45.1k** | HANDOFF + CLAUDE + core + RENDER |

**THE NUMBER THOMAS ASKED FOR (2026-09-07): before he types a prompt, a corpus
round is required to read 9.4% of its context, a renderer round 5.6%.** That is
the mandatory read above as tokens (chars ÷ 4) over a 200k-token window — 18.8k and
11.3k tokens respectively. It was 8% on 2026-09-07 before the length restriction came
off. **Refresh both percentages every handoff along with the table**, and state the
denominator, because the point of the number is the trend and not the value.

**This measures attention, not budget.** A single `get_page_text` on one large page
cost more than this whole table in round 8. What the read buys or wastes is the
reader's attention before any work starts, and a paragraph nobody has acted on in
five rounds costs that whether or not the file is large.


**The 10k cap on §1-§3 is retired; the percentage above replaces it** (Thomas,
2026-09-07). A character cap could not see the rest of the read path and a round
would trim §2 while `PLAYBOOK-CORPUS.md` grew unwatched. Keep §1-§3 to state and
pointers — the narrative is in project memory — and let the two percentages be the
thing that gets defended.

---

## 2. Current state

Corpus **3,512 reports / 3,078 dependencies**. **1,054 A · 1,412 B · 612 C**, A-share
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

**The first slow-layer sweep is done and executed, not just recommended.** All 25
of the audit's items landed: 7 corrective edits, 4 moves, 3 drops, 4 additions.
`PLAYBOOK-CORPUS.md` lost §5 and rule 17 (rule 17's number stays retired) and gained
two §6 traps and a §7b rule; §7d's dead domain-tag paragraph is replaced; rule 19's
coverage count is current at 172. Rules 16 and 17 and the routing snapshot are folded
into `notes/techniques-2026-09-04.md`; `REPORTS.md`'s batch-research section is now
`notes/research-batches.md` with the measured rot of its id list at the top (446
nodes missing, 213 dead). `README.md`'s duplicate sandbox recipe is a pointer to rule
4. The audit itself is `notes/doc-audit-2026-09-07.md` and is the worked example §4
step 5b now points at.

**Handoffs are numbered.** The 74 archived files were stamped `-001` to `-074` on
2026-09-07, at the END of the name so older references still resolve; **this one
archives as 075.** The number is what steps 5 and 5b divide.

**Every mention of the retired research source is gone from the doc set** (Thomas,
2026-09-07: "it should be as if it never existed and not needed to warned against").
`PLAYBOOK-CORPUS.md` reads zero. **And the second half of it is done too, on Thomas's go the same round:** the 77
slice FILENAMES are renamed (the import token dropped from each, no collisions,
no node or edge id ever contained the word and no `_batch` value did either) and 629
occurrences of the word were rewritten out of the prose of 163 slice files, plus 69
files under `Claude outputs/` and `notes/`, plus code comments in four more. The
loader reads the directory rather than an import list, so nothing broke: `validate`
exits 0 on 370 slices with the corpus unmoved at 3,505 / 3,071 / 1,050·1,409·612, and
`tsc` is clean. **No `evidence_quote` was touched** — checked first, none contained
it. The rename map is `~/renamemap.json` on the device VM for this session only; the
substantive record is here.

**Direction (Thomas, 2026-09-06): gathering data**, target THIN COVERAGE — memory
`gb_national_core_2026-09-06` has the census and method. GB and AU are done; DE and
FR/IT/ES/SE/BE/AT/PL/FI remain. **979 nodes still have zero edges**, unchanged: the block
added 70 and wired all 70.

**Renderer and ranking:** no work this round.

**DE national core round 2 (this session):** GB was round 1 (2026-09-06, memory `gb_national_core_2026-09-06`); this continues the same thin-coverage programme on Germany. Re-read the German GNI inventory (`esa-2010-methods.pdf`, already in the corpus as an evidence source) in full and minted 4 of its remaining Chapter-10 source-statistics rows: `de-bundesbank-balance-of-payments` (Bundesbank BoP statistics), `de-destatis-microcensus` (EVAS 12211), `de-destatis-turnover-tax-statistics` (EVAS 73311, the document's single most-cited source), and `de-bstatg` (the Federal Statistics Act, giving `de-destatis-national-accounts` a `legal_basis` edge alongside its existing `esa-2010` methodology edge). All 4 wired to `de-destatis-national-accounts`. **Run through `grade-evidence.ts --slice`, not hand-graded**: came back 1 A / 3 B against an initial hand-grade of 4 A (reasons: `artefact-named-elsewhere-in-document`, `agency-not-artefact`, `quote-found-target-not-named`) — each basis records the grader's reason per PLAYBOOK-CORPUS.md §7b. EVS (Income and Consumption Sample Survey, EVAS 63221) was investigated and explicitly refused, not left unminted: the GNI inventory's own words are that it is used 'for the purposes of comparison, and not as a basis for calculation' — exactly §7a's 'consistent with is not a citation' shape. `npm run validate` exit 0 (123/123 logic), `tsc --noEmit` clean, `vite build` ok — full sandbox pipeline run this session, not just `npm run gen`. New file: `src/data/research/de-national-core-2026-09-07.json`. DE is not exhausted: `de-destatis-source-surveys.json`'s own `_dropped` block still lists ~41 more Chapter 10.1 EVAS rows and Chapter 10.2's 16 other official sources (Bundesbank Monthly/Annual Report, KBA vehicle statistics, BaFin insurance stats, etc.) as open leads.

**DE national core round 3 (same session):** continued resolving the same GNI inventory's Chapter 10.1 list. Minted 3 more direct-quote source statistics: `de-destatis-building-housing-census` (EVAS 31211, building/housing census -- housing-services benchmark), `de-destatis-microcensus-housing-supplement` (EVAS 12212, resolves round 2's own flagged microcensus lead), and `de-destatis-tax-revenue-statistics` (EVAS 71211 -- the same document glosses it three different ways in three places, 'Tax revenue statistics' / 'public finance statistics' / 'fiscal statistics', recorded as `title_aliases` per the multilingual-alias rule). All 3 wired to `de-destatis-national-accounts`. **Run through `grade-evidence.ts --slice`**: came back 3 A / 0 B/C, matching the hand grade this time (reason `quote-found-artefact-named` on all three -- artefact named right in the matched window). EVS-style trap-check applied again; none found. `npm run validate` exit 0 (3,512/3,078), `tsc --noEmit` clean, `vite build` ok. New file: `src/data/research/de-national-core-round3-2026-09-07.json`. Open item flagged, not fixed: `de-destatis-source-surveys.json`'s own `_dropped` block hasn't been edited to remove the 5 EVAS rows now resolved across rounds 2+3 (12211, 73311, 31211, 12212, 71211) -- the same stale-cross-file pattern that file's own history already logged four times. DE still not exhausted: Chapter 10.2's other official sources (Bundesbank Monthly/Annual Report -- investigated, real and live but no source-statistic-naming sentence found; KBA vehicle statistics; BaFin insurance stats) and the remaining ~36 Chapter 10.1 rows are open leads.

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

**4. The scrub is complete and there are exactly two survivors, both outside my
reach.** `archive/` was left alone by design — it is history and renaming it would
dangle the references the numbering scheme was built to preserve. And one
project-memory FILE is still named `grok_archive_state`; project memory has no delete
or rename, so a new file would leave the old one sitting beside it. Say the word and
I will supersede it with a renamed copy and point the index at the new one.

**5. Was every-20 right for the slow sweep?** The first pass found seven defects and
the oldest had been wrong for about three weeks. That is the only data point there
is; step 5b asks the question again at handoff 100 and the answer should get better
with a second reading.

### [Agent]

**Thin coverage:** DE has 3 rounds now (13 nodes -> 20 across this session); still has open leads before moving on (see §2's DE round-3 paragraph) -- either finish those (Chapter 10.2's other sources, ~36 more Chapter 10.1 rows) or move to FR next. Also open: `de-destatis-source-surveys.json`'s stale `_dropped` note (5 rows now resolved, not yet reflected there). Method in memory `gb_national_core_2026-09-06`. Round 7's five orphaned NSO nodes (Sudan, Yemen, Syria, Iraq, Iran) are leads for the same programme from the other direction.

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
   HHMM-<topic>-NNN.md` — UTC date and time, topic = what the superseded
   state was about, and **`NNN` is the handoff's number, zero-padded to
   three, one higher than the highest already in the folder**. Verify the
   copy (`sha256sum` both). The numbering was added 2026-09-07 (Thomas) so
   the review triggers in steps 5 and 5b are arithmetic anyone can check:
   `ls -1 "archive/Previous Handoffs"/HANDOFF-*-[0-9][0-9][0-9].md | wc -l`
   is the number you just stamped. The number goes at the END of the name so
   that every older reference by date-and-topic still resolves.
   **Archive first, then rewrite** — there is no git safety net (rule 1);
   an un-archived overwrite destroys the previous state. That was missed on
   2026-08-29/30: `HANDOFF.md` was overwritten three times in one session and
   archived only retrospectively, from a copy that happened to still be in
   the session's context.
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
   arithmetic, not memory: if the number you stamped in step 2 is
   divisible by 5, run the review. Read this file's §2/§3 and the four archived
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

5b. **Every twentieth handoff, sweep the SLOW layer.** Same arithmetic, a
   different divisor: if the number you stamped in step 2 is divisible by
   20, check `PLAYBOOK.md`, both lane playbooks, `REPORTS.md`, `README.md`,
   `START-HERE.md` and `notes/standing-issues.md` **against what
   `npm run validate` and the code actually say** — every count, every
   closed union, every cross-reference, every "as of", every pointer into
   `notes/` or `archive/`. Step 5 sweeps the fast layer against itself;
   nothing swept these at all until 2026-09-07, and the first hand-run pass
   found **seven live false statements** in files nobody had touched in
   weeks — a settled question still described as open, two pointers to
   things that no longer existed, three stale counts and a duplicated
   procedure that had drifted from its own original. **Correct in place and
   show the old wording**, the way `PLAYBOOK-RENDER.md`'s 2026-09-06 review
   did: a doc that quietly changes its mind is harder to trust than one that
   says what it got wrong. Record the pass in `notes/` as
   `doc-audit-<date>.md`; the first is `notes/doc-audit-2026-09-07.md` and
   it is the worked example of the format — section by section, every one
   given EDIT / DROP / KEEP / MOVE with the exact replacement text.

   **Two questions to answer explicitly in every 5b pass, in the write-up:**

   - **Should this sweep happen more or less often than every 20?** Say what
     the evidence was. Count the defects found and how old the oldest one
     was: if the oldest defect predates the previous sweep by a long way, 20
     is too slack; if the pass finds one or two trivia, it is too tight.
   - **Does Thomas want a recap of the past sweeps across the last 100
     handoffs?** Ask him, in §3, on any 5b where the archive has crossed a
     new hundred. Five sweeps' worth of findings is enough to show whether
     the same section keeps rotting, and that pattern is worth more than any
     single sweep.

   Introduced by Thomas, 2026-09-07: *"the slow layer needs swept every 20
   handoffs. do it on the 20's."*
6. **Refresh the read-cost table in §1** and repeat those numbers to
   Thomas in the handoff message — it is how he sees bloat arriving:
   `wc -c HANDOFF.md CLAUDE.md PLAYBOOK.md PLAYBOOK-CORPUS.md
   PLAYBOOK-RENDER.md REPORTS.md START-HERE.md`. If §1–§3 is over 10k, trim before adding.
7. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to whichever playbook binds it (`PLAYBOOK.md`
   §1 has the test). A design change goes to `notes/Midvamp - Revamp.md`
   (or `REPORTS.md` if it changes direction).
8. Never state git status here. Never delete anything on your own judgement.
   An agent may ASK for delete permission on a named folder — the user
   approves it once and it holds for the session — but the decision to
   delete is never the agent's, and without that approval the move is into
   `_to_delete/` with a line in its README.

Only one `HANDOFF.md` at the top level, ever.
