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

Last updated: 2026-09-08 ~20:45 UTC (handoff 077 — the superseded state is
`archive/Previous Handoffs/handoff077.md`, **the first archive under the new name**: Thomas ruled
2026-09-08 that handoffs are numbered `handoffNNN.md` from here, NEW ONES ONLY, so the 76 files
carrying the old `HANDOFF-YYYY-MM-DD-HHMM-<topic>-NNN.md` name keep it and every existing
cross-reference in `notes/` still resolves. §4 step 2 has the rule and the count command, which
spans both shapes. This handoff covers rounds 29–30, which opened China; §2/§3 were swept hard —
14.1k left this file for project memory, `notes/china-progress.md` and
`notes/techniques-cn-yearbooks-2026-09-08.md`.)

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
| **anything China** | `notes/china-progress.md` — the live worklist, every division kept whether done or not — then `notes/techniques-cn-yearbooks-2026-09-08.md` for how to read a yearbook |
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
| `HANDOFF.md` | 25.2k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.9k | everyone |
| `PLAYBOOK-CORPUS.md` | 50.9k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.6k | renderer lane |
| `REPORTS.md` | 24.3k | scope/direction questions |
| `START-HERE.md` | 13.2k | humans, not agents |
| **a corpus round reads** | **86.6k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **49.2k** | HANDOFF + CLAUDE + core + RENDER |

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-08, handoff 077): before he types a prompt, a
corpus round is required to read 10.8% of its context, a renderer round 6.2%.** That is the
mandatory read above as tokens (chars ÷ 4) over a 200k-token window — 21.6k and 12.3k tokens.
Against handoff 076's 10.4% / 6.4%.

**The corpus number went UP while `HANDOFF.md` went DOWN by 14.1k, and that is the finding.**
§1–§3 was swept from 30.4k to 16.4k — three rounds of narrative left for project memory, the
China worklist and the techniques note. But `PLAYBOOK-CORPUS.md` grew 46.0k → 50.9k in the same
session absorbing what those rounds learned (three §6 traps, the §7b zip ruling), and it is four
times HANDOFF's weight, so it swamped the saving. **This is the file's own second test working
as designed** — a rule that will still be true in a month belongs in the slow layer even though
the slow layer is what nothing sweeps — but it means the corpus percentage is now governed
almost entirely by `PLAYBOOK-CORPUS.md`, not by this file. **The next 5b pass should look there
first**, and the honest question for it is whether §6 and §7 have earned 51k.

**A China round reads more than the mandatory path**: plus `notes/china-progress.md` (14.0k) and
`notes/techniques-cn-yearbooks-2026-09-08.md` (5.0k) = **105.6k, or 13.2%**. That is the real
cost of the live programme and it is deliberate — both files exist to keep narrative OUT of
§1–§3, and the tracker is written to be scanned to one row, not read whole.

**Refresh both percentages every handoff along with the table**, and state the denominator,
because the point of the number is the trend and not the value.

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

Corpus **3,597 reports / 3,182 dependencies**. **1,169 A · 1,402 B · 611 C**, A-share 36.7%.
**Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Current as of 2026-09-08 ~20:45 UTC;
last data-changing round is **30** (Jiangsu in depth + the first city edge).
**976 nodes still have zero edges** — CN is 31 of them, down from 34.

**The live programme is CHINA.** Thomas ruled 2026-09-08 *"i'd rather scale the china work"*,
and both blockers that were holding it are settled (see §3). **Its state lives in
`notes/china-progress.md`, not here** — 31 provincial-level divisions plus XPCC and 10 cities,
every row kept whether done or not, each with its real bureau host and a dated probe. Score
there: **2 provinces wired and fully mined (Jiangsu, Guangdong), 8 with a node but no edges, 22
with no node yet, 1 of 10 cities wired.** Two rounds in, 21 edges, every one A.

**Other threads, one line each; the narrative is in project memory:**

- **FR — live, four rounds in, 21 nodes from 9.** The GNI-inventory-chapter method is exhausted
  for the current edition; the live method is a third document naming a target by title.
  Unchecked: the Note de conjoncture's public-finance and international articles. Memory
  `round13`–`round17_fr_ndc_camme_2026-09-08`.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains (7 non-government
  sources), and that is a scope question before an evidence one.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — parked, awaiting Thomas (§3).** Not duplicates; a
  research pass found no document, and the `af-nsia` precedent was a lucky find rather than a
  common shape. Memory `round_orphaned_nso_iq_coicop_2026-09-08`.

---

## 3. Todo (live items only)

### [Thomas]

**1. Park the four orphaned NSO nodes, or keep hunting?** `iq-cso`, `ye-cso`, `sy-cbs`,
`sd-cbs` are **not** duplicates and should not be retired — the institutional node and a
country's publication nodes are designed to coexist, and `af-nsia` proves the shape works when
some OTHER report names the stats office as its source. But the 2026-09-08 research pass
checked Iraq, Yemen and Sudan's own non-NSO reports (CBI PDFs, CBY's 2024 Annual Report, CBOS's
quarterly review, two IMF country reports) and **found no general sourcing statement anywhere** —
only narrow CPI-methodology boilerplate that `iq-cpi` already carries. My recommendation is
**park them as legitimate-but-currently-unwireable** and stop spending round time without a new
candidate document class. Say park and I'll stop re-reading it. (`ir-sci` is unrelated and stays
out — it falls under the already-ruled null-ComplianceDate class.) Detail: memory
`round_orphaned_nso_iq_coicop_2026-09-08`.

**2. 750 DSBB SoM rows are mint leads with no source node — corpus-expansion call, not taken.**
`Claude outputs/dsbb-som-import-2026-09-05-review.json` has 750 rows where the IMF's own
methodology summary names a standard (`imf-bpm6` 253, `isic` 128, `hs` 111, `imf-gfsm` 91,
`imf-mfsmcg-2016` 41, `esa-2010` 34) for a country+category with no node at all. Minting from a
DSBB category label alone — no independently verified title, publisher or cadence — is a thinner
kind of research than the rest of this corpus does, at a scale that changes what the corpus is.
**Not started.** If you want it, say how thin a node may be and roughly what scale.

**3. A new international hub node: generic `sitc`?** Both the China Statistical Yearbook and
Jiangsu name 《国际贸易标准分类》(SITC) and **neither names an edition**. UNSD's page for it is
Rev.3, marked *Superseded*. Minting an edition-bound node and wiring to it would be the exact
edition-inference shape you overturned in the COICOP ruling, so I deferred it. A **generic**
`sitc` hub in the style of `hs` and `isic` — both of which are edition-free and describe their
revisions in the description — would avoid that cleanly and unlock 2 waiting edges, more as
provinces are mined. It is a new international node, so it is your call, not mine.

### [Agent]

**CHINA is the work. Read `notes/china-progress.md` first — it is the worklist and it is kept
crossed off.** Then `notes/techniques-cn-yearbooks-2026-09-08.md` for how to read a yearbook.
Neither is restated here.

**The method in one line:** a Chinese yearbook's per-chapter **简要说明** exists to disclose that
chapter's sources and names the NBS instrument **by title**, which clears §7a outright; a
provincial or municipal **编者说明** additionally carries a numbered item naming 《国民经济行业分类》.
Both are self-declared, both grade A.

**Next three moves, in order:**

1. **Sweep the reachable cities.** Nanjing proved a city reaches `cn-gbt-4754-2017` directly off
   its own 编者说明, with **no city→province hop** — which matters, because Nanjing's and
   Suzhou's edges to the Jiangsu yearbook were minted once and quarantined as assertion-only
   (`cn-china-2026-08.json` `_dropped`; rule 14 — read that note before re-minting either).
   Wuhan and Xi'an answered the probe and **their parent provinces have no node at all**, so a
   city edge is the only thing available there. One fetch, one A, each.
2. **Shandong, then Henan.** Both already have nodes, so it is pure wiring. Shandong answers over
   http and is the third economy; Henan's 403 has WAF written on it — try Chrome.
3. **Then the minting run** — Hunan, Hubei, Fujian, Yunnan, Xinjiang, Jilin, Hainan, Tibet all
   answered and have no node yet, so those rounds mint the yearbook node and wire it in one pass.

**Two live traps for the next CN round:**

- **`namesTarget` strips ASCII parentheses BEFORE matching, so a node titled
  `X (中文名)` has NO reachable Chinese token** — the CJK single-token door iterates the same
  stripped string. Fixed per node for `cn-bop` and `hs`; **the class is unswept** and most of the
  CN/JP/KR import is titled this way. Now `PLAYBOOK-CORPUS.md` §6.
- **The same standard gets spelled differently by different publishers** — 和/及 in HS's Chinese
  title, U+2014 vs an ASCII hyphen in the GB/T number. Three instances in two rounds. **Cut the
  quote before the parenthetical**; the title alone names the artefact. If a province ever writes
  the *title* differently, that needs a new alias.

**Named by title, still unminted, all waiting on a publisher page:**
《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》 (named by the national AND Guangdong AND
Jiangsu yearbooks; **not** in the probed NBS id range — see the tracker's listing-truncation
note, which is why this conclusion is now stronger than it was in round 29), 《中国统计摘要》,
第五次全国经济普查, 《全国农业普查条例》, 《统计上大中小微型企业划分办法（2017）》,
《关于市场主体统计分类的划分规定》（国统字〔2023〕14号）, and MOHURD's and MOT's city instruments.

**Continue FR when China pauses.** 21 nodes from 9. The GNI-inventory-chapter method (DE ×5,
FR ×2) is **exhausted for the current inventory edition** — do not re-read barring a newer one.
The live method is a third document naming a target by title (INSEE's Note de conjoncture);
its public-finance and international articles are unchecked. The EU harmonised
business/consumer survey node shares `fr-insee-camme`'s domain-fit problem ("monetary-policy"
as least-wrong) and the two want **one** scope decision, not two. Memory
`round15_fr_note_de_conjoncture_2026-09-07`, `round17_fr_ndc_camme_2026-09-08`.

**Settled, do not re-raise:** **The CN/TW/JP/KR re-grade sweep** — 166 B/C edges, Thomas
2026-09-08: *"that's a lot of time for B/C's. forget that."* The charset fix itself is kept; any
re-grade rides along with work touching those edges for another reason. **A first-party zip is a
direct read**, not a capped route (§7b) — Guangdong is wired on it. **Bulk-diffing stored quotes
against cached windows** — ~60% false positives from `evidence-cache/`'s last-run-wins structure;
the real defects were found by targeted reading. The non-ASCII-hyphen sweep (negative), the
UEMOA NCOA retarget (resolved as base-2023 edges instead), the COICOP edges for
Morocco/Tunisia/Iraq (dropped `no-document`), DGDDI's monthly bulletin (dead after four rounds,
permanent §7a refusal), the e-GDDS wiring todo (all 34 countries, round 23), the stale-cache B
sweep, India's NSDP, the GFSR (no methodological appendix exists), the ICLS class (§7a: do not
re-open per country). A Chapter 10 table row alone is NOT enough to wire an edge. The three
project-memory files carrying the retired source's name — leave them. A country carrying both a
REGISTER and a SELF-DECLARED tier edge — both stay, no dedupe pass. Korea's and Estonia's NSDP,
the null-ComplianceDate class, round 7's tier confirmations, round 5's little things 1-3, the
Euro Area row, the DE round-2 EVS refusal, the Bundesbank Monthly/Annual refusal, the BaFin
insurance/pension refusal — all read in full and refused, reasons in `PLAYBOOK-CORPUS.md` §7 /
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
2. Copy it, unchanged, to `archive/Previous Handoffs/handoffNNN.md` —
   **`NNN` is the handoff's number, zero-padded to three, one higher than the
   highest already in the folder**. Verify the copy (`sha256sum` both).
   *(Naming changed 2026-09-08 on Thomas's instruction — "save them as
   handoff80.md, then the next handoff would be 81". This step read
   `HANDOFF-YYYY-MM-DD-HHMM-<topic>-NNN.md` until then, with the number at the
   END so older references by date-and-topic still resolved. **He ruled NEW ONES
   ONLY**: the 76 files already carrying the long name KEEP it and are not
   retro-renamed, so both shapes live in the folder and every existing
   cross-reference in `notes/` still resolves. The first file under the new name
   is `handoff077.md`. Zero-padding is not decoration — it is what makes the
   folder sort in handoff order.)* The numbering was added 2026-09-07 (Thomas) so
   the review triggers in steps 5 and 5b are arithmetic anyone can check, and the
   count must now span both shapes:
   `ls -1 "archive/Previous Handoffs" | grep -cE '^(HANDOFF-.*-[0-9]{3}|handoff[0-9]{3})\.md$'`
   is the number you just stamped.
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
   divisible by 5, run the review. (The count spans both filename shapes —
   step 2 has the command.) Read this file's §2/§3 and the four archived
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
