# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep §1–§3 to state and pointers; §4 is fixed and verbatim.** No changelog, no
round narrative. Finished items LEAVE (§4 step 4); the round's memory entry is their
record. *(This paragraph read "Keep the mutable part (§1–§3) under 10k characters"
until 2026-09-07. That cap was retired by Thomas in §1 on the same day this line was
written, and the two sat contradicting each other for three rounds. The gauge is the
read-cost percentage in §1, not a character count.)*

Last updated: 2026-09-07 ~17:05 UTC (still handoff 075 — §2/§3 edited in place for
rounds 9 through 12; not a new handoff under §4, no archive)

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
| `HANDOFF.md` | 24.6k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.9k | everyone |
| `PLAYBOOK-CORPUS.md` | 44.4k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.6k | renderer lane |
| `REPORTS.md` | 24.3k | scope/direction questions |
| `START-HERE.md` | 13.2k | humans, not agents |
| **a corpus round reads** | **79.4k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **48.5k** | HANDOFF + CLAUDE + core + RENDER |

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-07, round 12): before he types a
prompt, a corpus round is required to read 9.9% of its context, a renderer round 6.1%.**
That is the mandatory read above as tokens (chars ÷ 4) over a 200k-token window — 19.9k
and 12.1k tokens respectively. **Both moved up this session** — 9.2% → 9.9% and 5.4% → 6.1%
— and `HANDOFF.md` is where all of it went: 19.4k → 24.6k. Rounds 11 and 12 added a general
finding about stale cached stores, a must-do-this-way constraint on one URL and the state of a
finished programme, and removed two settled items and one ruling Thomas answered.
`PLAYBOOK-CORPUS.md` also measures 44.4k against the 43.7k this table carried before round 11;
nothing has edited it, so the earlier figure was simply read wrong. **Refresh both percentages
every handoff along with the table**, and state the denominator, because the point of the number
is the trend and not the value.

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

Corpus **3,540 reports / 3,106 dependencies**. **1,095 A · 1,399 B · 612 C**, A-share
35.3%. **Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`tsc --noEmit` clean, grader **selftest 76/76**, `vite build` ok,
`public/corpus-data.json` regenerated and copied back, current as of 2026-09-07
16:57 UTC. **979 nodes still have zero edges**, unchanged — rounds 11 and 12 wired every
node they minted.

**THE GERMAN GNI INVENTORY IS SPENT, and that is the state to carry forward.** Chapters
10.1 and 10.2 are both closed. Round 11 wired 21 of Chapter 10.1's 37 open rows; Thomas
ruled the remaining 16 are not worth pursuing and they are closed, not open. Round 12 read
Chapter 10.2's full 16-row table and closed it: **5 wired, 3 already settled, 8 refused
with reasons** in `de-national-core-round5-2026-09-07.json`'s `_dropped`. Every one of the
26 edges the two rounds minted graded **A `quote-found-artefact-named` at coverage 1.00**.
DE now has **46 nodes**, from 13 at the start of the session. **Only Chapter 10.3 (7
non-government sources) is untouched**, and it is a scope question before an evidence one
— several members are private bodies.

**The Chapter 10.2 finding, which is a process lesson and not a German one:**
`de-destatis-source-surveys.json`'s 10.2 note has been the worklist since 2026-08-05. It
named nine of the sixteen rows and called the rest "mostly named by institution rather
than by a titled recurring publication" — fair, and it hid the two best rows in the
chapter. Row 15 (the annual report of the gambling supervisory authorities of the federal
states) and row 16 (the Federal Ministry of Finance's **AfA depreciation tables**, named
four separate times in the body) are the cleanest artefact citations in Chapter 10.2 and
neither appeared in the note. Rounds 10 and 11 both treated that note as the worklist
without opening the table. **Read the source table, not the note about it** — round 10
reached the same conclusion by a different route.

**The refusals are the other half of round 12's output and they are recorded in full.**
The BaFin rows are the strongest refusal available: ¶3.369 says what the accounts use is
the regulatory forms insurers file under BerVersV/BerPensV, "made available to the Federal
Statistical Office by the Federal Financial Supervisory Authority (BaFin) as so-called
internal accounting documents" — not a publication, so rule 2 refuses it however good the
usage evidence is. KBA, Bundesnetzagentur and the Pfandkreditgewerbe go on
agency-not-artefact; Bundesbank rows 8/10/11 are table-only and closed under Thomas's
ruling. **KBA is the one worth reopening some day**, and the note says how: mint KBA's own
Neuzulassungen and Besitzumschreibungen from KBA's pages FIRST, then wire the inventory to
them — not by inventing an English title to satisfy the run rule.

**A B that was never the document's fault:
`de-destatis-national-accounts -> de-bundesbank-balance-of-payments` moved B → A** in
round 11, under `PLAYBOOK-CORPUS.md` §7b's improvements-only rule, with nothing changed in
the matcher. Round 2 graded it B `artefact-named-elsewhere-in-document` earlier the same
day; re-graded from a FRESH fetch it returns A at coverage 1.00, because the occurrence the
fresh run anchored on sits beside a bulleted source list printing "Balance of payments
statistics" UNHYPHENATED. Round 2's store carried no `pdftotext-flow` third rendering
(`PLAYBOOK-CORPUS.md` §6), so it never had that span. **Nothing distinguishes it from any
other B graded off a pre-2026-09-06 store** — see §3, [Agent].

**The GNI inventory PDF now stands behind 35 edges**, and validate's "URLs behind 10+
edges" list names it first. It names all thirty-five and is not an index — but rule 11's
evidence-URL clause bites hard: **any grader run touching that URL must select all
thirty-five at once**, or it destroys the other edges' committed windows. The selection is
kept, current, at `Claude outputs/grade-de-gni-2026-09-07.json#gni_inventory_all`. Round 11
found the Bundesbank re-grade above only because selecting the whole URL surfaces other
rounds' mistakes for free.

**The NSDP block is done: 72 nodes, 73 edges** —
`src/data/research/int-imf-nsdp-2026-09-07.json`, narrative in memory
`round8_nsdp_block_2026-09-07` and `round9_todo_cleared_2026-09-07`. **India is still dark
and it was never a permissions problem**: dea.gov.in timed out from Thomas's own Chrome, a
fourth network and a fourth failure mode, so the lead is finding India's NSDP off
mospi.gov.in or rbi.org.in rather than retrying that URL. Seven of the 81 remain unwired,
all refused on evidence or host, with reasons in the block's own `_dropped`.

**The first slow-layer sweep is done and executed** — all 25 items from
`notes/doc-audit-2026-09-07.md` landed (7 edits, 4 moves, 3 drops, 4 additions).
Handoffs are numbered from that same round (74 archived files stamped `-001` to `-074`);
this file archives as **075** when it is next replaced wholesale, and §2/§3 have now been
edited in place for rounds 9 through 12 without an archive, which §4 permits.

---

## 3. Todo (live items only)

### [Thomas]

**1. Was every-20 right for the slow sweep?** The first pass found seven defects and
the oldest had been wrong for about three weeks. That is the only data point there
is; step 5b asks the question again at handoff 100 and the answer should get better
with a second reading.

### [Agent]

**Move to FR.** DE is finished as a programme: 5 rounds this session, 13 → 46 nodes, both
worked chapters of the GNI inventory closed, and the only German thing left is Chapter
10.3's seven non-government sources — private bodies for the most part (Deutsche Automobil
Treuhand, Deutsche Börse), so a scope question first. **FR has had no round at all.**
Method in memory `gb_national_core_2026-09-06` and, for the shape that worked five times
running, `round11_de_chapter10_2026-09-07`: find the country's own GNI or national-accounts
inventory, read its source chapter's BODY for sentences that name a source by title and say
what the accounts do with it, simulate `namesTarget` before choosing node titles, then
grade the whole evidence URL at once. Round 7's five orphaned NSO nodes (Sudan, Yemen,
Syria, Iraq, Iran) are leads for the same programme from the other direction.

**Sweep for B grades that a stale cached store caused.** Round 11 found one by accident
(§2, the Bundesbank balance-of-payments edge) and the cause is general: the third PDF
rendering landed 2026-09-06, a cached `.evidence-fulltext/` record has none, and an
offline re-grade of an old store cannot see it. Every B graded off a cache before that
date is suspect and `--refetch` is what settles it. **Do not run this as a blanket
`--write`** — §6's no-improvements-only-guard trap and rule 11's evidence-URL clause both
apply, so it is: pick the B edges whose grade reason is `artefact-named-elsewhere-in-
document` or `partial-quote`, group them BY URL, select every live edge on each URL, run
`--refetch` offline-diffed against the stored grades, and write only what went up.

**India's NSDP, from a new direction.** `dea.gov.in` is unreachable from four networks in
four different ways and is not a bot wall — stop retrying it. India met the SDDS
specifications on 2001-12-14, so a first-party NSDP exists somewhere; mospi.gov.in and
rbi.org.in are the candidates. Lead is in the block's own `_dropped`.

**The e-GDDS third of the tier finding, untouched and structurally harder:** 34
confirmed participants with a real NSDP and no node, and no `NSDPUrl` for any e-GDDS
row, so each anchor has to be found on the country's own site. List with dates in
`int-imf-tier-sweep-2026-09-07.json`. Botswana and Tanzania are the two most valuable —
each has a real NSDP and an institutional node is all that is missing. **Their live
`-> imf-sdds` edges are NOT a defect and are not what makes them valuable**: round 7 read
both and kept them deliberately, because each NSO's own document says its CPI follows the
SDDS, and a methodology claim about a CPI is a dependency whether or not the country
subscribes; the reasoning is written into both bases. Re-confirmed against the live IMF
endpoint 2026-09-07 — 49 SDDS countries, neither is one.

**A non-ASCII-hyphen sweep, opened round 6 and STILL NOT DONE.** Any pass looking for
product numbers, section numbers or dates in an extracted document must search the hyphen
CLASS (`-`, U+2010, U+2011, en dash), never ASCII `-`; cover diacritics and HTML entities
too. Round 11 hit it again and handled it by construction rather than by luck: EVAS
71717's own title carries U+2013 in the second "double–entry" and an ASCII hyphen in the
first, so its title and quote were copied out of the extracted text programmatically
rather than retyped. **That is the technique the sweep should generalise** — never retype
a span you can copy.

**The UEMOA NCOA retarget pass, opened round 6 and deliberately not done.** Thirteen
UEMOA/CEMAC CPI edges point at `afristat-ihpc-guide-2014` or `uemoa-ihpc-note-2023`
because `afristat-ncoa-ihpc` did not exist. **Read the vintage split first** (SN, NE, CI
on NCOA 2018, correctly wired to `un-coicop-2018`); lead in the slice's `_dropped`.

**The rest of the IMF pool:** the per-country metadata seam, and the GFSR
(`notes/imf-elibrary-2026-09-06.md` has the ISBN recipe).

**Settled, do not re-raise:** **a Chapter 10 table row on its own is NOT enough to wire an
edge** — Thomas ruled 2026-09-07, closing the 16 remaining Chapter 10.1 rows and Chapter
10.2's rows 8, 10 and 11; the reasons are in the data and the class is closed, not
deferred. The three project-memory files whose FILENAMES carry the retired source's name
(`grok_archive_state`, `grok_canada_round_2026-08-25`, `grok_wiring_round_2026-08-25`) —
Thomas ruled 2026-09-07, **leave them**. A country carrying BOTH a REGISTER and a
SELF-DECLARED tier edge — both stay, ruled 2026-09-07, now in `PLAYBOOK-CORPUS.md` §7, no
dedupe pass; the `(SDDS Plus)` acronym case, fixed and measured, 12 edges moved and
nothing else can; Korea's NSDP, read in full and refused because the page never writes
"SDDS" at all; the null-ComplianceDate class; round 7's tier confirmations (Taiwan,
Mauritius); round 5's little things 1-3; the Euro Area row (not a country, placeholder
dates, refused twice); wiring a tier edge onto a single ordinary publication (the NSDP is
the exception, reason in the block's note); Estonia's NSDP, read in full and refused
because "SDDS" appears only in its URL path; the DE round-2 EVS refusal (Income and
Consumption Sample Survey — "for comparison, not calculation"); the Bundesbank Monthly and
Annual Report, investigated in DE rounds 2 and 3 and refused on the agency-not-artefact
bar; the BaFin insurance and pension rows, refused round 5 because what the accounts use is
regulatory returns held as internal accounting documents, not a publication. Older calls:
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
   PLAYBOOK-RENDER.md REPORTS.md START-HERE.md`. *(This step ended "If §1–§3 is over
   10k, trim before adding" until 2026-09-07; that cap is retired — §1 says so — and the
   two percentages below the table are what gets defended instead. Corrected in place
   rather than left to make a future round trim §2 for no reason.)*
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
