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

Last updated: 2026-09-07 ~00:20 UTC (round 7 — the IMF tier sweep: 104 edges
checked in both directions, 4 minted, 2 defects fixed, and one question for
Thomas in §3)

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
| `HANDOFF.md` | 14.6k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.2k | everyone |
| `PLAYBOOK-CORPUS.md` | 39.0k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.0k | renderer lane |
| `REPORTS.md` | 24.0k | scope/direction questions |
| `START-HERE.md` | 13.0k | humans, not agents |
| **a corpus round reads** | **63.4k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **37.4k** | HANDOFF + CLAUDE + core + RENDER |

**§1-§3 is 9.7k, under the cap** — round 7 closed the IMF-pool item that was the
longest thing in §3 and replaced it with a shorter one. Nothing moved to a playbook
this round; the round's two recipe findings went to `notes/imf-dsbb-2026-09-06.md`
as addendum 3, which is where a host recipe belongs.

---

## 2. Current state

Corpus **3,435 reports / 3,006 dependencies**. **1,006 A · 1,391 B · 609 C**,
A-share 33.5%. **Domains: 46 approved, 0 proposed.** Zero bare-homepage edges,
0 no-URL / 0 dead-URL. `validate` exits 0, 123/123 logic tests, `tsc --noEmit`
clean; the grader was not touched this round, so its selftest stands at round 6's
74/74 and was not re-run. `vite build` NOT run.
`public/corpus-data.json` regenerated and copied back, current as of
2026-09-07 00:12 UTC.

**Direction (Thomas, 2026-09-06): gathering data**, target THIN COVERAGE — see
memory `gb_national_core_2026-09-06` for the census and method. GB and AU are
done; DE and FR/IT/ES/SE/BE/AT/PL/FI remain; **976 of the research slices'
3,416 nodes still have zero edges** (counted round 6 from `corpus-data.json`).

**The IMF tier sweep is done and the seam it opens is a NODE problem, not an
evidence one.** All 104 live edges into `imf-e-gdds` / `imf-sdds` /
`imf-sdds-plus` were checked against the IMF's own lists in both directions.
Sixteen flagged, fifteen survived scrutiny — the four Taiwan edges are correct by
design, Mauritius is right on both tiers, and the five null-NSDP countries all
say so in their own bases. Two were real and are fixed: `af-bop -> imf-e-gdds`
`_dropped` `wrong-target` (its evidence names BPM6, and `af-bop -> imf-bpm6` is
live), and a false tier claim removed from the `tz-nbs-cpi-dqa` basis. Four minted
at A off the rendered pages: `ar-sen`, `ge-geostat`, `tr-turkstat` → `imf-sdds`,
`bd-bbs` → `imf-e-gdds`. **The other direction is the finding: 85 countries are
confirmed participants the corpus cannot wire, because it has no institutional
node for their statistical office** — 29 of 32 SDDS Plus adherents, 21 of 49 SDDS
subscribers, 34 of the 76 e-GDDS participants with a real NSDP. Full lists, with
dates, in the three `no-node-yet` entries of
`src/data/research/int-imf-tier-sweep-2026-09-07.json`. **And the anchor now has a
first-party URL**: the list endpoint's `NSDPUrl` is populated for all 49 SDDS and
all 32 SDDS Plus rows (and no e-GDDS row), so every one of those 81 National
Summary Data Pages is named by the IMF itself — which is the node
`international-frameworks.json` said Canada needed and could not source.

**Three DSBB tier pages are in `.evidence-fulltext/`**, read in Chrome 2026-09-07
and landed by the checksummed transport: `/e-gdds/important-dates-history`,
`/sdds/subscription-date`, `/sdds-plus/subscription-date`. Each is headed with the
standard's full name, so any country row on them grades A. The two SDDS endpoints
were found this round and take **no** `ContainerID`; recipe and the corrected
controller-path rule are `notes/imf-dsbb-2026-09-06.md` addendum 3.

**Renderer:** no work this round. **Ranking:** five curated `mutual: true`
pairs, unchanged.

---

## 3. Todo (live items only)

### [Thomas]

**One question, and it is nine edges wide.** Six live e-GDDS edges — `af-nsia`,
`ye-cso`, `sy-cbs`, `ir-sci`, `iq-cso`, `sd-cbs` — belong to countries whose
Important Dates row shows metadata posted and **no NSDP ever posted** (null
`ComplianceDate`). Round 4b used exactly that null to REFUSE Libya, Lebanon and
Haiti. So the corpus says a null-NSDP row supports an edge in six cases and none
in three. Does that row support an edge at all, and at what grade? All six could
be recited to the rendered page now in the evidence store and become A; `sd-cbs`
is meanwhile an A on a quote naming the *GDDS*, the predecessor, where the
identical `iq-cso` quote was capped at B by the Round C ruling. Nothing applied
either way — the finding is the `caveat` on `sd-cbs` in
`int-imf-tier-sweep-2026-09-07.json`. Rule it once, for all nine.

**And a scope call whenever you want it, not blocking:** the 85 unwired
participants in §2. Wiring the SDDS and SDDS Plus halves means minting ~81 NSDP
nodes from the `NSDPUrl` field — a real corpus expansion, and the largest single
block of A-gradeable edges left on the board. The e-GDDS half has no such field
and needs an NSO node found per country.

### [Agent]

**Thin coverage:** DE next, then FR/IT/ES/SE/BE/AT/PL/FI. Method in memory
`gb_national_core_2026-09-06`.

**The rest of the IMF pool**, now that the tier sweep is off it: the per-country
metadata seam, and the GFSR (`notes/imf-elibrary-2026-09-06.md` has the ISBN
recipe; the GFSR's methodology chapter is the one never looked at).

**A non-ASCII-hyphen sweep, opened by round 6 and STILL NOT DONE.** The Yukon
Statistical Review cited six Statistics Canada tables by number for four rounds
without anyone seeing them, because it sets them with U+2011 rather than `-`;
`normalizeForMatch` folds U+2011, so the grader was never the problem — every
human and script grep was. Any pass looking for product numbers, section numbers
or dates in an extracted document must search the hyphen CLASS (`-`, U+2010,
U+2011, en dash), not the ASCII character. Round 7 hit the same shape in a
different alphabet — the IMF spells Türkiye with U+00FC and an ASCII search finds
nothing — so the sweep should cover diacritics in country names too. Worth one
pass over the corpus's own quotes and bases.

**The UEMOA NCOA retarget pass, opened round 6 and deliberately not done.**
`afristat-ncoa-ihpc` now exists; thirteen UEMOA/CEMAC CPI edges point at
`afristat-ihpc-guide-2014` or `uemoa-ihpc-note-2023` because it did not, and some
belong on the nomenclature. Each retarget needs the national bulletin read.
**Read the vintage split first**: SN, NE and CI are on NCOA 2018 for the
base-2023 series and correctly wired to `un-coicop-2018`; the new node is the
older base only. Lead in the slice's `_dropped`.

**Settled, do not re-raise:** round 5's little things 1-3 in full, the IMTS
Revision 2 refusal included — record in memory `round5_little_things_2_3_2026-09-06`
and the slices' own `_dropped`. The tier sweep's own confirmations — Taiwan's four
SDDS edges, Mauritius on both tiers, the five self-caveated null-NSDP edges — are
recorded as `caveat`/`note` in `int-imf-tier-sweep-2026-09-07.json`; do not
re-check them against the lists. Older calls: `PLAYBOOK-CORPUS.md` §7 /
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
