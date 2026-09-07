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

Last updated: 2026-09-06 ~21:45 UTC (round 5 PAUSED mid-way at Thomas's request — little thing 1 done and validated; little thing 2 researched, nothing minted yet)

---

## 1. Read next

**The project's only read order — `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block
point here.** This file first, then `PLAYBOOK.md` in full — it is short and
routes you to one lane playbook. Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` — short, binds every task, and its §1 hands you the one lane playbook (CORPUS or RENDER) |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md`; for "can I reach host X?" `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05`, and this round's `round5_little_things_paused_2026-09-06` (the product-number alias path) |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md` (dsbb REST API), `notes/imf-elibrary-2026-09-06.md` (books, flagships, and the 2026-09-06 addendum on which machine it serves) |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first — it routes the lane. Then the round memory for your bit: `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera fit), `condensed_int_and_rulings_2026-09-05` (INT fold). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/`. |
| "what is still broken that nobody is fixing?" | `notes/standing-issues.md` — items that outlived five handoffs; not on the mandatory read path |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then `REPORTS.md` from *The one-line version* for scope, and project memory,
newest first. Project instructions and memory are summaries written outside the
repo: where either disagrees with a file, the file wins. Git status: never
state it (rule 1).

**Read cost, refreshed every handoff** (§4 step 6) — this is the bloat gauge:

| file | k | who reads it |
|---|---|---|
| `HANDOFF.md` | 13.6k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 36.7k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **60.0k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **36.3k** | HANDOFF + CLAUDE + core + RENDER |

**§1-§3 is 7.9k, under the 10k cap** (was 10.6k): the round-5 minting spec went to
`notes/round5-little-thing-2-spec-2026-09-06.md` instead of here, and the IMF read-order
rows collapsed to one. Next handoff: sweep §3's little-thing-2 paragraph the moment the
slice exists.

---

## 2. Current state

Corpus **3,428 reports / 2,991 dependencies**. **984 A · 1,395 B · 612 C**,
A-share 32.9%. **Domains: 46 approved, 0 proposed.** Zero bare-homepage edges,
0 no-URL / 0 dead-URL. `validate` exits 0, 123/123 logic tests, grader selftest
**69/69** (one new assertion), `tsc --noEmit` clean; `vite build` NOT run this
round. **Grade counts come from `validate` only.** `public/corpus-data.json`
regenerated and copied back, current as of 2026-09-06 21:40 UTC.

**Direction (Thomas, 2026-09-06): gathering data**, target THIN COVERAGE — see
memory `gb_national_core_2026-09-06` for the census and method. GB and AU are
done; DE and FR/IT/ES/SE/BE/AT/PL/FI remain; 978 of 3,345 nodes have zero edges.

**This round paused at Thomas's request** ("write up a handoff and pause where
you are at", 2026-09-06 ~21:35 UTC). Little thing 1 is finished and validated;
little thing 2 is researched to the point of minting and nothing has been
written. §3 carries exactly where to pick up.

**The IMF seam is still the active seam and still wide open** — both recipes
in `notes/imf-*.md`, do not re-derive. Two things learned today about it:
`elibrary.imf.org` 403s the **bridge VM** and serves the **cloud sandbox** — and
only with a full Chrome UA string (a bare `Mozilla/5.0` gets 403 too); and
`dsbb.imf.org` renders cleanly in Thomas's Chrome, which is how the four
dsbb pages this round were captured (see the store note in §3).

**The grader gained a path it was missing.** Thomas's 2026-09-06 ruling said a
StatCan table number names the artefact "via `title_aliases`, so the grader can
see what the reader can" — and it could not: `namesTarget` had no route for a
one-token alias (the run rule needs ≥2 words, the lead rule ≥3, the CJK path
wants CJK). The three round-4b table-number A's were therefore hand-written
with no grader record behind them. `scripts/grade-evidence.ts` now has an
aliases-only **product-number** path (≥8 chars, ≥2 hyphen-separated digit
groups, word-bounded, runs only after every other door has failed), pinned by a
selftest assertion; `yt-statistical-review -> statcan-population-estimates`
graded A through it against the live Chrome read. Additive only — nothing
already graded can move down on it.

**Renderer — no work this round**; nothing changed since the last handoff.

**Ranking:** five curated `mutual: true` pairs, unchanged.

---

## 3. Todo (live items only)

### [Thomas]

1. **`yt-statistical-review -> statcan-national-accounts` is the NWT shape.** It
   went C→B honestly this round (the Yukon Statistical Review names the agency),
   but Yukon GDP by industry is the *provincial and territorial* accounts, not
   the national quarterly series — the same wrong target you ruled on for the
   NWT on 2026-09-06. Probable retarget to `statcan-provincial-economic-accounts`.
   Not touched; your call.
2. **Optional veto:** the product-number grader path (§2) implements your ruling
   as written; say so if you want it narrower or gone.

### [Agent]

**Resume little thing 2 exactly here — everything below is researched and verified,
none of it is written.** Then little thing 3, then the IMF pool (unchanged from the
previous handoff: tier-endpoint sweep of the ~50 `-> imf-e-gdds` / ~30 `-> imf-sdds`
edges, the per-country metadata seam, the GFSR).

**Little thing 2 — three edition nodes, ready to mint; nothing written.** The
full spec — ids, titles, verified elibrary ISBNs/PDF paths, every edge with its
verbatim quote and cited URL, three `supersedes` relations, the IRIP 2009
refusal and the collision scan — is `notes/round5-little-thing-2-spec-2026-09-06.md`.
Mint from it into a new slice (suggested `int-imf-editions-2026-09-06.json`),
add `RESOLVED …` lines to the two `_dropped` entries in
`int-imf-dsbb-2026-09-06.json` that the new edges answer (rule 14), grade against
the parked captures, validate, then move the note to `_to_delete/`.

**The evidence store for this round is parked, not lost.** `.evidence-fulltext/`
lives in the VM scratch and dies with the session, so the four Chrome captures
(dsbb `important-dates-history`, `sdds/statistical-methodology`,
`sdds-plus/statistical-methodology`, the Yukon PDF — 203,631 chars, per-font
ToUnicode decode) are copied to `tmp_work/evidence-fulltext-round5-2026-09-06/`,
keyed by sha256(url) exactly as the store wants them. Copy them into the next
sandbox's `.evidence-fulltext/` and the re-grades are offline. The two
methodology pages carry no grader record yet — round 4 hand-graded eleven A's on
them against the SPA URL, and these captures are what would let `--offline`
confirm them.

**Little thing 3, untouched:** Eurostat COFOG manual 2019 · IMTS Revision 2 ·
AFRISTAT NCOA-IHPC 2008 · `title_aliases` "Sistema Armonizado" on `hs` · the
`cmhc-residential-mortgage-industry-report -> statcan-national-accounts` probable
wrong target (no quote, balance-sheet table). Detail in memory
`round4b_rulings_and_dsbb_reopen_2026-09-06`.

**Settled, do not re-raise:** little thing 1 (all four grades and the grader
path — memory `round5_little_things_paused_2026-09-06`); everything older is in
project memory and `PLAYBOOK-CORPUS.md` §7 / `PLAYBOOK-RENDER.md` §7.

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
