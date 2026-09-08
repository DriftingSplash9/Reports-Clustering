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
| `HANDOFF.md` | 26.9k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.9k | everyone |
| `PLAYBOOK-CORPUS.md` | 46.0k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.6k | renderer lane |
| `REPORTS.md` | 24.3k | scope/direction questions |
| `START-HERE.md` | 13.2k | humans, not agents |
| **a corpus round reads** | **83.2k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **50.8k** | HANDOFF + CLAUDE + core + RENDER |

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-08, handoff 076): before he types a
prompt, a corpus round is required to read 10.4% of its context, a
renderer round 6.4%.** That is the mandatory read above as tokens
(chars ÷ 4) over a 200k-token window — 20.8k and 12.7k tokens respectively — this handoff (076) has been edited live
throughout the same session (the §3 [Thomas] #1 correction, then the research-pass
write-up) and each pass added real content; net still roughly flat against the
pre-076 20.5k/12.8k baseline, not the clean drop the midpoint numbers implied. A live
doc that keeps growing across one session is itself worth watching at the next sweep. (`PLAYBOOK-CORPUS.md` grew slightly this same window from the
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

Corpus **3,596 reports / 3,173 dependencies**. **1,160 A · 1,402 B · 611 C**, A-share
36.6%. **Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`grade-evidence --selftest` 76/76, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back, current as of 2026-09-08 ~19:00 UTC
(round 29 -- CN statistical-reporting-system hubs, this session -- last data-changing round).
**978 nodes still have zero edges.**

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
- **Bare-COICOP-no-stated-revision wiring — CLOSED 2026-09-08.** Thomas ruled: drop
  all three (`iq-cpi`, `tn-ins-cpi`, `ma-hcp-ipc` -> `un-coicop-2018`) as `no-document`,
  matching the IMTS-Revision-2 precedent — none names an edition, and Iraq/Tunisia's own
  cited text points to the pre-2018 vintage instead. All three now in their source
  files' own `_dropped`; `PLAYBOOK-CORPUS.md` §7d updated to match. Memory:
  `round_coicop_ruling_2026-09-08`.
- **FR: 21 nodes from a 9-node start**, four rounds in. Round 4 (2026-09-08) reused
  round 3's "cited by title in a third document" method against the Note de conjoncture's
  other sections (labour, prices, public finance), minting one clean self-sourced edge
  (`fr-insee-camme`, the household confidence survey) and refusing two agency-level
  near-misses (DSECE's quarterly trade bilan, SDES energy/emissions) that repeat the same
  agency-not-artefact shape as the dead DGDDI monthly-bulletin lead. The GNI-inventory-
  chapter method is exhausted for the current inventory edition (Ch.10 fully mined,
  3.4.1/5.8.2/5.11.2 confirmed empty). DGDDI's monthly bulletin ("Résultats du commerce
  extérieur") **stays ruled dead** (`PLAYBOOK-CORPUS.md` §7a) — do not attempt a fifth
  round. Memory: `round13_fr_national_core_2026-09-07`,
  `round14_fr_national_core_round2_2026-09-07`, `round15_fr_note_de_conjoncture_2026-09-07`,
  `round16_fr_dgddi_monthly_still_refused_2026-09-07`, `round17_fr_ndc_camme_2026-09-08`.
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

**1. `iq-cso`, `ye-cso`, `sy-cbs`, `sd-cbs` are NOT duplicates — the working
recommendation is to wire them, not merge or retire them** (checked against the raw
data 2026-09-08, superseding the "duplicate?" framing this item carried in handoff
076). All four were minted 2026-08-22 in `crossborder-standards-2026-08-22.json` as
generic institutional-core stubs, came up `no-document` in that same batch's own
`_dropped`, and have sat at zero edges since. **`af-nsia`, minted in the identical
batch, is the working counter-example**: it carries two live `uses_data_from` edges
(`af-cpi -> af-nsia` A, `af-dab -> af-nsia` B), both off documents where a
DIFFERENT Afghan report (Da Afghanistan Bank's own bulletin) states its data comes
from NSIA — not off NSIA's own pages. The institutional node and a country's
specific-publication nodes are DESIGNED to coexist this way (Afghanistan already has
both `af-nsia` and `af-cpi`/`af-population`/`af-national-accounts`, same shape as
Iraq's `iq-cso` vs `iq-cpi`/`iq-national-accounts`/`iq-population`) — the institutional
node is the target when some OTHER report cites drawing on the NSO's data. **So this
is a research gap, not a ruling call**: check each country's own non-NSO reports
already in the corpus for a sentence naming the stats office as their data source, the
way DAB's bulletin named NSIA — candidates already in the corpus: Iraq (`iq-bop`,
`iq-federal-budget`, `iq-wage-bill`, `iq-banking-system`), Yemen (`ye-bop`), Syria
(`sy-bop`), Sudan (`sd-cbos-statistical-review-q4-2024`, `sd-mofep-budget-2026`).
**`ir-sci` does NOT belong in this group** — it was minted in Iran's own original
import (`ir-iran-2026-08.json`) alongside `ir-cpi`/`ir-population`, not in the
crossborder-standards batch, and its orphan status traces to a separate, already-ruled
matter: the null-ComplianceDate e-GDDS class (`ir-sci -> imf-e-gdds` dropped
2026-09-07 on Thomas's ruling — already in this file's "Settled, do not re-raise"
list). It was bundled into "five orphaned NSO nodes" by round 7 on the wrong axis.
Detail: memory `round_orphaned_nso_iq_coicop_2026-09-08`.

**The wiring research pass ran 2026-09-08 — negative result, but not a dead end.**
Checked: Iraq (`iq-bop`'s and `iq-wage-bill`'s own cited CBI PDFs, `iq-federal-budget`'s
and `iq-banking-system`'s landing pages, IMF's 2025 Article IV Staff Report), Yemen
(CBY's BOP page and full 2024 Annual Report PDF), Sudan (full re-read of the
`sd-cbos-statistical-review-q4-2024` PDF already cited for the `sd-cbs-cpi` edge, plus
IMF's 2020 country report). **No genuine "this document uses data supplied by the
institution generally" statement turned up anywhere.** The two CSO mentions found in
Iraq's CBI PDFs are boilerplate CPI/Core-Inflation methodology text ("prepared by the
CSO") repeated verbatim across unrelated bulletins — narrowly about CPI, which already
has its own wired node (`iq-cpi`), not a general sourcing statement. Sudan's CBOS
review names CBS only in the CPI table caption, same shape. Yemen's 2024 Annual Report
cites IMF and a different domestic body ("the technical secretariat for food security -
Aden") for its price data, not CSO at all — plausibly because Yemen's fractured
governance means CSO may not function as CBY's effective data source. Syria wasn't
fully checked (its BOP page is a bare nav menu with no linked PDF found quickly, and
its last full IMF Article IV is from 2009 — too old to be a useful candidate). **The
`af-nsia` precedent is real but was evidently a lucky find, not a common document
shape** — it doesn't mean one exists for every country. Recommend: park
`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` as legitimate-but-currently-unwireable, don't
retire them (the design is still sound, af-nsia proves that) and don't keep spending
round time hunting without a new candidate class. `ir-sci` stays out of this group
entirely — see above.

*(The other three items from handoff 076 are ruled, 2026-09-08 — see §2's "Closed this
window" and the [Agent] section below for where each landed: sweep cadence stays as-is,
DGDDI's monthly bulletin is dead, and the COICOP precedent is NOT generalised —
Morocco/Tunisia/Iraq get revisited together instead, which also surfaced that
`PLAYBOOK-CORPUS.md` §7d had already called this exact question closed on 2026-09-06
and round 24 quietly reopened it.)*

**3. The grader could not read a legacy-encoded page at all, and I shipped the fix --
please rule on it.** `grade-evidence.ts`'s fetcher decoded every HTML body as UTF-8
whatever the document declared. NBS's yearbook pages declare `charset=gb2312`, so on
`.../ndsj/2025/html/sm14.htm` **537 characters became U+FFFD** and the quote could never
match. Measured, both ways, same 12 edges, nothing else changed: **1 A / 1 B / 10 C
`quote-not-in-document` before, 12 A `quote-found-artefact-named` after.** This is the
dangerous shape -- a broken reader is indistinguishable on screen from a bad quote, and
every one of those C's looked like thin evidence. I judged this a decoding bug rather
than an evidence-policy question and shipped it, **additive by construction** like the
third PDF rendering: the re-decoded reading is kept only when it yields strictly fewer
replacement characters, an unknown charset label falls back to UTF-8, so it can only
improve a reading. Selftest 76/76 unchanged. **Two things for you.** (a) Do you want it
kept? It is one block in `gradeEvidence`'s fetch path with the old wording in its comment;
reverting is a delete. (b) **The follow-up sweep is NOT run and should not be run without
your say-so**: 220 live edges cite CN/TW/JP/KR hosts and **166 of them are B or C**. Not
all are encoding victims -- many are PDFs, index pages or genuinely thin -- but a
`--refetch` re-grade of that set is now the obvious next measurement, and it is exactly
the kind of pass that needs the old-vs-new `--offline` diff first (PLAYBOOK-CORPUS §6:
`--write` has no improvements-only guard).

**4. The China seam is open and it is the biggest one left -- how far do you want it
taken?** See the [Agent] note below for what the template is and what it cost. The
arithmetic: ~30 provincial-level yearbooks, each declaring the same national instruments,
at roughly 1-6 edges apiece. Two things bound it and both are your call, not mine. First,
**scale**: this is the same "how thin a node is acceptable" question as the 750 DSBB rows
and the NSDP nodes, except here the answer is better -- the nodes already exist and every
edge is a real quote from a real document, so it is wiring, not thin minting. Second,
**route**: several provinces serve their yearbook only as a zip of the CD edition
(Guangdong) or on a port nothing can reach (Guangdong again, `:8080`). I did NOT invent a
rule for those -- see the [Agent] note.

**2. 750 DSBB SoM rows are mint leads with no source node — corpus-expansion call,
not taken.** The 2026-09-05 DSBB import review file (`Claude outputs/dsbb-som-import-
2026-09-05-review.json`) has 750 rows where the IMF's own methodology summary names a
standard (mostly `imf-bpm6` 253, `isic` 128, `hs` 111, `imf-gfsm` 91, `imf-mfsmcg-2016`
41, `esa-2010` 34) for a country+category the corpus has no node for at all. Same shape
as the 29-of-32-SDDS-Plus-adherents-with-no-node question round 7 flagged and did not
act on (memory `round7_imf_tier_sweep_2026-09-07`) — minting a node from a DSBB category
label alone (rather than researching the country's actual named release, its publisher
and its cadence) is a different, thinner kind of research than the rest of this corpus
does, at a scale (hundreds of nodes) that changes what the corpus is. Not started. If
you want this pursued, say how thin a node is acceptable (DSBB category label + no
independently-verified title/cadence, vs. requiring the same research depth as every
other node) and roughly what scale — 750 potential nodes is a different-sized project
than the 81-NSDP-node question was.

### [Agent]

**CN is now the live seam, and the template is proven.** Round 29 (2026-09-08) opened it.
**The method, which is what matters and repeats:** the China Statistical Yearbook and every
provincial yearbook put a **简要说明 (Brief Introduction)** at the head of each chapter whose
stated purpose is to disclose that chapter's sources, scope and method -- and it names the
NBS instrument **by title**, e.g. `本篇建筑业企业统计数据根据《建筑业统计报表制度》中年度报表有关资料整理汇总。`
That is a source disclosure naming an artefact, so it clears §7a outright; it is the
single richest repeating document shape found in this corpus so far. Minted the 7 hub
documents those notes name (6 NBS 统计报表制度 + `cn-gbt-4754-2017`), all sourced to
first-party `stats.gov.cn` pages, and wired 12 edges, **all A**: 10 from
`cn-statistical-yearbook`, plus `cn-gbt-4754-2017 -> isic` (GB/T 4754's own 前言 says it was
drafted with reference to ISIC Rev.4 and carries an ISIC concordance as 附录 G -- caveat
recorded in the basis: its declared correspondence grade is 非等效/NEQ) and the provincial
pilot `cn-js-statistical-yearbook -> cn-gbt-4754-2017`, off item 五 of Jiangsu's own 编者说明.
**Next: fan out to the other provinces.** ~30 provincial-level yearbooks; Jiangsu proves the
编者说明 carries a numbered item naming GB/T 4754, and the per-chapter 简要说明 carry the
统计报表制度 edges on top. Scale is Thomas's call (§3 [Thomas] #4).

**Three traps found doing it, all of which will bite the next CN round:**
1. **`namesTarget` strips ASCII parentheses BEFORE matching**, so a node titled
   `Balance of Payments (国际收支平衡表)` has NO reachable Chinese token -- the CJK
   single-token door never sees it, because the door iterates the same parens-stripped
   string. Many CN/JP/KR nodes are titled exactly this way. The fix per node is a
   `title_aliases` entry; done this round for `cn-bop` (国际收支平衡表) and `hs`
   (商品名称和编码协调制度 + the 及 variant, which NBS and Guangdong spell differently).
   **This is a whole class and it has not been swept.**
2. **`isIndexPage`'s `stats.gov.cn` `/sj/ndsj/` entry was a PREFIX**, so it swallowed every
   page *inside* the yearbook, and all 10 sm-page edges failed validation as "index/listing
   page" the first time any round cited one. Narrowed to `exact: true` -- the identical fix
   the `/english/pressrelease/` entry two lines above it already carries, for the identical
   reason. Old wording is in the comment.
3. **The charset defect -- see §3 [Thomas] #3.** It is the important one.

**Guangdong is researched but NOT wired, deliberately.** Its 2025 yearbook was read in full
(the official 21.5MB CD zip from `stats.gd.gov.cn`, HTTP 200) and its chapter 简要说明 name
the same instruments plus `《商品名称及编码协调制度》(HS)`, `《国民经济行业分类标准》` and
`《关于市场主体统计分类的划分规定》（国统字〔2023〕14号）`. **The blocker is route, not
evidence**: the province serves the browsable yearbook only on `tjnj.gdstats.gov.cn:8080`,
which times out from the container, is refused from the device VM, and does not load in
Thomas's Chrome -- so the only readable copy is inside a zip, and a zip is not a URL the
grader can re-fetch. The nearest precedent is §7b's token-PDF ruling (quote the document,
cite the landing page, name the route, cap at B). **I did not apply it -- a new route class
needs a ruling** (§3 [Thomas] #4). `批发和零售业统计报表制度` and `住宿和餐饮业统计报表制度`
are named by both the national and the Guangdong yearbook but were NOT minted: NBS's current
统计制度 listing does not carry a page for either, and a node whose publisher page cannot be
found is not a node.

**Continue FR.** 21 nodes from 9, four rounds in. **The GNI-inventory-chapter method
(DE ×5, FR ×2) is exhausted for the current inventory edition** — Ch.10 fully mined,
3.4/5.8/5.11 confirmed empty, do not re-read barring a newer inventory edition. **Round
4 (2026-09-08) used the other method instead**: a third document (here, INSEE's own
Note de conjoncture) naming a target by title while citing it — the same method round 15
opened. Applied against the NDC's other sections (labour, prices, public finance) this
time, not just trade: minted `fr-insee-camme` (the household confidence survey, an
11-times-repeated self-sourced chart caption) and refused two agency-level near-misses
(DSECE's quarterly trade bilan, SDES energy/emissions — both name the agency in-body but
never co-locate the bibliography's own title with a usage statement, the same
agency-not-artefact shape as the dead DGDDI monthly bulletin). Method detail: memory
`round11_de_chapter10_2026-09-07`, `round13_fr_national_core_2026-09-07`,
`round15_fr_note_de_conjoncture_2026-09-07`, `round17_fr_ndc_camme_2026-09-08`.
**DGDDI's monthly bulletin is closed — do not re-run** (Thomas, 2026-09-08; permanent
refusal in `PLAYBOOK-CORPUS.md` §7a). Next: the NDC's other articles (public finance,
international) haven't been checked yet against this method; the EU harmonised
business/consumer survey node (`ecfin-business-consumer-surveys.json`) shares
`fr-insee-camme`'s domain-fit problem ("monetary-policy" as least-wrong) and both are
worth a single scope decision together rather than two. The `iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` wiring research pass ran 2026-09-08
and came up empty — see §3 [Thomas] #1 for what was checked and why. **Parked, not
retired; don't re-run without a genuinely new candidate document class** (the
non-NSO-report angle is spent for these four). `ir-sci` is unrelated (see §3
[Thomas] #1) and stays parked under the null-ComplianceDate ruling. DE is finished as
a programme; the only German thing left is Chapter 10.3 (scope question, §2).

**Revisit Morocco/Tunisia/Iraq's COICOP edges together — CLOSED 2026-09-08.**
Re-read all three against the actual documents and the corpus's own IMTS-Revision-2
precedent: none names a COICOP edition, and for Iraq and Tunisia the cited document's
own divisional structure points to the pre-2018 vintage rather than the `un-coicop-2018`
target it was wired to. The "wire with a vintage caveat" practice three separate rounds
converged on independently did not actually satisfy the corpus's own edition-inference
standard. Thomas ruled: drop all three as `no-document`. Executed — `iq-cpi`,
`tn-ins-cpi` and `ma-hcp-ipc`'s edges to `un-coicop-2018` are now in their own source
files' `_dropped`, `candidates-tier-wiring-2026-08-28.json`'s stale `resolved` note
updated to match (reason changed to `no-document` since the edge it named no longer
exists), and `PLAYBOOK-CORPUS.md` §7d rewritten to record the final ruling in place of
the "reopened, pending a ruling" language. Sandbox validate/tsc/build all green;
`public/corpus-data.json` regenerated and copied back. Memory:
`round_coicop_ruling_2026-09-08`.

**The non-ASCII-hyphen sweep, opened round 6, is CLOSED 2026-09-08 — negative, do not
re-run the same way.** `normalizeForMatch` already folds the whole hyphen class
(U+2010-U+2015 plus U+2212) to ASCII `-`, so the grader was never the risk, matching
round 6's own framing. A sweep of both evidence caches (2115 files) for a digit-adjacent
non-ASCII hyphen found no new lead beyond the already-known, already-blocked Yukon
table-number case. A bulk diff of stored quotes against cached windows, tried as a
second check for the ASCII-substitution defect class, produced ~60% false positives
from `evidence-cache/`'s own one-record-per-URL-last-run-wins structure — **do not
re-attempt that approach**; the three known defects were found by targeted reading, not
bulk diffing. What would actually extend this is a corpus-wide `--refetch` re-grade, not
attempted (out of scope for "one sweep"). Detail: memory
`round_hyphen_sweep_and_dsbb_followup_2026-09-08`.

**The UEMOA NCOA retarget pass, opened round 6, is CLOSED 2026-09-08 — resolved
differently than framed.** The four remaining countries (Burkina Faso, Benin, Mali,
Guinea-Bissau) all still label their table "NCOA-IHPC" but none states an edition year,
so retargeting to `afristat-ncoa-ihpc` (explicitly the PRE-2018 vintage) would be an
edition inference — deferred, not minted, same shape as the IMTS-Revision-2 refusal.
What their current bulletins DO self-declare is the base-2023 transition itself: four
new B-grade edges to `uemoa-reg-2024-base2023` (previously wired only from Togo).
Detail: memory `round_uemoa_base2023_retarget_2026-09-08`.

**The IMF pool's DSBB-review half is done 2026-09-08**: the 9 bounded
`ambiguous-source`/`already-live-one-of-several` rows from the 2026-09-05 review file
are resolved (6 new A edges minted — 2 Latin American ISIC edges, 2 Indonesian GFSM
edges, 2 bonus Indonesian COFOG edges; 3 rows were already stale, resolved by later
rounds). **GFSR read in full and closed as a negative finding** — no Statistical/
Methodological Appendix exists in the April 2025 issue at all, unlike WEO/Fiscal
Monitor; don't re-read without a new candidate. Detail: memory
`round_hyphen_sweep_and_dsbb_followup_2026-09-08`. **Left, and NOT started**: the
750 `no-source-node` rows in the same review file are mint leads needing new report
nodes per country+category — a corpus-expansion call, same shape as the NSDP-node
question — flagged to Thomas below, not taken unilaterally.

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
