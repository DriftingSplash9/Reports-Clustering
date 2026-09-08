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

Last updated: 2026-09-08 ~15:14 UTC (handoff 076 — archived rounds 9–24 as
`archive/Previous Handoffs/HANDOFF-2026-09-08-1514-egdds-closed-fr-blocked-iraq-coicop-076.md`.
§2/§3 rewritten to state-and-pointers per Thomas's call that the file had drifted into
round narrative it explicitly forbids itself — see that archived copy for the full
per-round prose; every fact in it also has its own project-memory entry, cited below.)

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
| `HANDOFF.md` | 22.9k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.9k | everyone |
| `PLAYBOOK-CORPUS.md` | 46.0k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.6k | renderer lane |
| `REPORTS.md` | 24.3k | scope/direction questions |
| `START-HERE.md` | 13.2k | humans, not agents |
| **a corpus round reads** | **79.2k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **46.9k** | HANDOFF + CLAUDE + core + RENDER |

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-08, handoff 076): before he types a
prompt, a corpus round is required to read 9.9% of its context, a
renderer round 5.9%.** That is the mandatory read above as tokens
(chars ÷ 4) over a 200k-token window — 19.8k and 11.7k tokens respectively, down
from 20.5k and 12.8k. (`PLAYBOOK-CORPUS.md` grew slightly this same window from the
DGDDI ruling and the §7d correction — §1's corpus percentage moved from 9.6% to 9.9%
between the two edits earlier in this handoff; a live rule going into a playbook costs
real space even the same day it saves a redundant round.) **Both dropped this handoff** — the trigger was
Thomas calling out that §2/§3 had quietly become a 24-round changelog in violation of
this file's own no-round-narrative rule; rounds 13–24's per-round prose (methods, host
quirks, exact quotes) moved to project memory, where every one of those rounds already
had its own entry — HANDOFF now cites the pointer instead of repeating the narrative.
**Refresh both percentages every handoff along with the table**, and state the
denominator, because the point of the number is the trend and not the value.

**This measures attention, not budget.** A single `get_page_text` on one large page
cost more than this whole table in round 8. What the read buys or wastes is the
reader's attention before any work starts, and a paragraph nobody has acted on in
five rounds costs that whether or not the file is large.

**The 10k cap on §1-§3 is retired; the percentage above replaces it** (Thomas,
2026-09-07). A character cap could not see the rest of the read path and a round
would trim §2 while `PLAYBOOK-CORPUS.md` grew unwatched. Keep §1-§3 to state and
pointers — the narrative is in project memory — and let the two percentages be the
thing that gets defended. **Handoff 076 is the first time that rule was actually
enforced against §2 itself** — see the "Last updated" note above.

---

## 2. Current state

Corpus **3,588 reports / 3,153 dependencies**. **1,141 A · 1,400 B · 612 C**, A-share
36.2%. **Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`tsc --noEmit` clean, `vite build` ok, `public/corpus-data.json` regenerated and copied
back, current as of 2026-09-08 ~05:20 UTC (round 24, last data-changing round).
**979 nodes still have zero edges.**

**Open threads (full per-round narrative for all of these lives in project memory —
one pointer per item below, not restated here; the superseded §2/§3 prose is also
preserved verbatim in `archive/Previous Handoffs/HANDOFF-2026-09-08-1514-...-076.md`
if the reasoning behind a call needs re-reading):**

- **`iq-cso` looks like an unrecognised duplicate node**, not a research gap: it and
  `iq-cpi`/`iq-national-accounts`/`iq-population` are all publisher-attributed to the
  same real agency (Iraq's COSIT) with no `part_of` link between them, so no document
  will ever land on `iq-cso` specifically. Flagged for Thomas (§3), not merged
  unilaterally — may also explain the three other still-orphaned NSO nodes (`sd-cbs`,
  `ye-cso`, `sy-cbs`, `ir-sci`), all untouched. Memory: `round_orphaned_nso_iq_coicop_2026-09-08`.
- **Bare-COICOP-no-stated-revision wiring** (Morocco, Tunisia, Iraq all wired to
  `un-coicop-2018` with a vintage caveat and a capped grade) is now a practice three
  separate rounds converged on without Thomas ever ruling on it. §3 [Thomas] has the ask.
- **FR: 20 nodes from a 9-node start**, three rounds in. DGDDI's monthly bulletin
  ("Résultats du commerce extérieur") is refused across 4 rounds / 6 candidate document
  classes — every one cites the agency, never the titled release by name. One angle
  untried (press coverage quoting it by name). Chapters 3.4/5.8/5.11 confirmed empty,
  closed for good barring a newer inventory edition. Memory: `round13_fr_national_core_2026-09-07`,
  `round14_fr_national_core_round2_2026-09-07`, `round15_fr_note_de_conjoncture_2026-09-07`,
  `round16_fr_dgddi_monthly_still_refused_2026-09-07`.
- **DE is finished as a programme** — 13 → 46 nodes over 5 rounds. Only Chapter 10.3
  (7 non-government sources, mostly private bodies) is untouched, and it's a scope
  question before an evidence one.

**Closed this window** (folded into the "Settled, do not re-raise" list in §3 —
see there for the one-liners): the e-GDDS wiring todo (all 34 target countries, closed
round 23), the stale-cache B sweep (round 17), India's NSDP (round 18), and DGDDI's
monthly bulletin lead — ruled dead 2026-09-08, now a permanent `agency-not-artefact`
refusal in `PLAYBOOK-CORPUS.md` §7a. **The every-20 sweep cadence is confirmed as-is**
(Thomas, 2026-09-08) — too soon to properly judge with fewer than 20 rounds run under
it; next real check stays at handoff 100 per §4 step 5b, unchanged.

---

## 3. Todo (live items only)

### [Thomas]

**1. Is `iq-cso` a duplicate of `iq-cpi`/`iq-national-accounts`/`iq-population`, and
if so, which id survives?** Same real agency (COSIT), no `part_of` link. Retiring or
merging a node is a ruling, not a research call. **If this shape is real it may also
explain the other three orphaned NSO nodes** (`sd-cbs`, `ye-cso`, `sy-cbs`, `ir-sci`) —
worth checking each against its country's other existing nodes before spending a round
researching it as a clean slate. Detail: memory `round_orphaned_nso_iq_coicop_2026-09-08`.
Explained in full 2026-09-08 (chat); ruling still open.

*(The other three items from handoff 076 are ruled, 2026-09-08 — see §2's "Closed this
window" and the [Agent] section below for where each landed: sweep cadence stays as-is,
DGDDI's monthly bulletin is dead, and the COICOP precedent is NOT generalised —
Morocco/Tunisia/Iraq get revisited together instead, which also surfaced that
`PLAYBOOK-CORPUS.md` §7d had already called this exact question closed on 2026-09-06
and round 24 quietly reopened it.)*

### [Agent]

**Continue FR.** 20 nodes from 9, three rounds in — method that's worked seven times
now (DE ×5, FR ×2): find the country's own GNI/national-accounts inventory, read its
source chapter's body for sentences naming a source by title with a usage statement,
verify each title against the publisher's own page, grade the whole evidence URL at
once. Method detail: memory `round11_de_chapter10_2026-09-07`,
`round13_fr_national_core_2026-09-07`, `round15_fr_note_de_conjoncture_2026-09-07`.
**DGDDI's monthly bulletin is closed — do not re-run** (Thomas, 2026-09-08; now a
permanent refusal in `PLAYBOOK-CORPUS.md` §7a). Chapters 3.4/5.8/5.11 confirmed empty,
do not re-read barring a newer inventory edition. The `iq-cso` duplicate question (§3
[Thomas] #1) still blocks further work on the remaining orphaned NSO nodes (Sudan,
Yemen, Syria, Iran — untouched) until Thomas rules on it. DE is finished as a
programme; the only German thing left is Chapter 10.3 (scope question, §2).

**Revisit Morocco/Tunisia/Iraq's COICOP edges together** (Thomas, 2026-09-08 — do not
generalise the bare-COICOP-no-stated-revision precedent into a rule without this check
first). Re-read `ma-hcp-ipc`, `tn-ins-cpi` and `iq-cpi`'s evidence for whether the
vintage caveat and capped grade actually hold up per edge, not just as a pattern three
separate rounds converged on independently. **Before starting, note
`PLAYBOOK-CORPUS.md` §7d already called this exact question ("generic COICOP
citations, Iran, Iraq") a closed one-off scope call on 2026-09-06** — round 24
(2026-09-08) wired Iraq's edge anyway without flagging that it was reopening a closed
call; §7d now says so in place, not resolved. Part of this revisit is deciding which
was right — the 2026-09-06 closure or round 24's reopening — and updating §7d to match
whatever the outcome is, so the line and the live edge stop disagreeing with each
other.

**A non-ASCII-hyphen sweep, opened round 6 and still not done.** Any pass looking for
product numbers, section numbers or dates in an extracted document must search the
hyphen CLASS (`-`, U+2010, U+2011, en dash), never ASCII `-`; cover diacritics and HTML
entities too. Technique: never retype a span you can copy — round 11's EVAS 71717 fix
(copied the title/quote out of extracted text programmatically) is the model.

**The UEMOA NCOA retarget pass, opened round 6 and deliberately not done.** Thirteen
UEMOA/CEMAC CPI edges point at `afristat-ihpc-guide-2014` or `uemoa-ihpc-note-2023`
because `afristat-ncoa-ihpc` did not exist. **Read the vintage split first** (SN, NE, CI
on NCOA 2018, correctly wired to `un-coicop-2018`); lead in the slice's `_dropped`.

**The rest of the IMF pool:** the per-country metadata seam, and the GFSR
(`notes/imf-elibrary-2026-09-06.md` has the ISBN recipe).

**Settled, do not re-raise:** DGDDI's monthly bulletin — ruled dead 2026-09-08 after
four rounds and six document classes, now a permanent `agency-not-artefact` refusal in
`PLAYBOOK-CORPUS.md` §7a. The e-GDDS wiring todo — all 34 target countries wired
(32 self-declared, 2 register), closed round 23, memory `round19_bw_nsdp_2026-09-07`
through `round23_egdds_remaining9_2026-09-08`. The stale-cache B sweep — only three
live candidates found corpus-wide, all reproduced their grade under `--refetch`, none
were actually stale; memory `round17_stale_cache_b_sweep_2026-09-07`. India's NSDP —
`dea.gov.in` dead from six networks/two failure modes, wired instead off RBI's own
pages; memory `round18_india_nsdp_2026-09-07`. A Chapter 10 table row alone is NOT
enough to wire an edge (Thomas, 2026-09-07). The three project-memory files whose
filenames carry the retired source's name (`grok_archive_state`,
`grok_canada_round_2026-08-25`, `grok_wiring_round_2026-08-25`) — leave them. A
country carrying both a REGISTER and a SELF-DECLARED tier edge — both stay, now in
`PLAYBOOK-CORPUS.md` §7, no dedupe pass. The `(SDDS Plus)` acronym case, fixed and
measured. Korea's NSDP, Estonia's NSDP, the null-ComplianceDate class, round 7's tier
confirmations (Taiwan, Mauritius), round 5's little things 1-3, the Euro Area row, the
DE round-2 EVS refusal, the Bundesbank Monthly/Annual Report refusal, the BaFin
insurance/pension row refusal — all read in full and refused, reasons in
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

   **The junk test, sharpened by Thomas 2026-09-08:** a paragraph earns its
   place only if it helps a current or near-term task — not because writing it
   down once might save a future round from re-solving the same one-off problem
   later. An ever-growing pile of one-off tips and tricks (a host quirk, a
   corner-case fix, a workaround for something that broke once) costs every
   future round a read whether or not it is ever used again; letting a rare
   problem recur and get re-solved when it actually recurs is cheaper than
   carrying the note indefinitely just in case. On the 20's, cut this kind of
   entry unless it has actually recurred — "still technically true" is not
   the bar.

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
