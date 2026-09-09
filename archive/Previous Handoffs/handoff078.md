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

**This is the project's only read order.** `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block point
here. **Restructured 2026-09-09** (Thomas: *"just have one handoff that says where to go if doing
such and such a thing… this way the whole lot doesn't need taken in"*): what follows is a router,
not a reading list. Read the ALWAYS set, then open exactly the rows your task lights up.

### Always — this file, then these two

| file | k | why |
|---|---|---|
| `PLAYBOOK.md` | 8.8k | the rules that bind every task whatever it is; its §1 routes you to one lane |
| `CLAUDE.md` | 1.5k | read automatically by a local Claude Code session |

Then ONE lane index: **`PLAYBOOK-CORPUS.md` (16.4k)** for research/minting/wiring/grading, or
**`PLAYBOOK-RENDER.md` (13.5k)** for the renderer. Each is now an index plus the rules that bind
every change in that lane.

### Then, routed by what you are actually doing

| doing | read |
|---|---|
| **wiring an ordinary edge off a clean fetch** | **nothing more.** `PLAYBOOK-CORPUS.md` §2 and its schema traps are the whole binding set |
| deciding whether a document NAMES the target | `playbook/corpus-naming.md` (§7a) — the most-cited section in the lane |
| writing a quote, grading, or a grade surprised you | `playbook/corpus-evidence.md` (§6) |
| MINTING a node, or re-opening a settled question | `playbook/corpus-nodes.md` (§7c, §7d) |
| the bytes came by an unusual route (browser, archive, token, zip) | `playbook/corpus-route.md` (§7b) |
| a fetch failed, or a host looks blocked | `playbook/corpus-hosts.md` (§6) — and re-probe, never believe a stored verdict |
| **anything China** (the live programme) | `notes/china-progress.md` — the worklist, rows kept crossed off — then `notes/techniques-cn-yearbooks-2026-09-08.md` |
| fetching / capturing / extracting anything else | `notes/techniques-2026-09-04.md` — recipes and host workarounds. **Every host reading in it is a claim about one machine on one day.** |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first; then the round memory for your bit — `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme's design | `notes/Midvamp - Revamp.md` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md`, `notes/imf-elibrary-2026-09-06.md` (its second addendum corrects the first) |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| a `meta.note` from the August 2026 import | `notes/mint-2026-08-20.md` |
| "what is broken that nobody is fixing?" | `notes/standing-issues.md` — outlived five handoffs; not on the mandatory path |
| editing any doc in the slow layer | `notes/doc-audit-2026-09-07.md` — the worked example of the format |
| **writing a handoff** | `notes/handoff-procedure.md` — the full §4 procedure, moved there 2026-09-09 |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Project instructions and memory are summaries written outside the repo: **where either disagrees
with a file, the file wins.**

### Read cost — the bloat gauge, refreshed every handoff

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-09): a corpus round is required to read 5.4% of
its context before he types a prompt, a renderer round 5.1%.** Chars ÷ 4 over a 200k window.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 16.7k + PLAYBOOK 8.8k + CLAUDE 1.5k + CORPUS index 16.4k | 43.4k | 10.9k | **5.4%** |
| always: HANDOFF + PLAYBOOK + CLAUDE + RENDER 13.5k | 40.5k | 10.1k | **5.1%** |
| *was, handoff 077* | *86.1k* | *21.5k* | *10.8%* |

**Halved by MOVING, not deleting** — `PLAYBOOK-CORPUS.md` 50.6k → 16.4k and `HANDOFF.md`
25.1k → 16.7k, into `playbook/` and `notes/handoff-procedure.md`. Every ruling keeps a one-line
index entry, so nothing became invisible. Full record: memory `doc_split_2026-09-09`.

**What to watch now is no longer the total.** No single file dominates any more, so the number
will drift up a little whenever a rule is added to an index. **The real check is whether the five
`playbook/` files are still opened only when their question arrives** — a round that opens four of
them means the split is in the wrong place, and the 5b pass should say so. On-demand sizes:
naming 15.2k, evidence 10.8k, nodes 7.4k, route 7.1k, hosts 5.6k, handoff procedure 9.4k.

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

**The procedure lives in `notes/handoff-procedure.md`.** It is 8.4k, it binds exactly one task,
and every research round was reading it to do something else — so it moved there on 2026-09-09
and this section is a pointer. *(It sat here, verbatim, from the file's creation until then; the
text is unchanged and that file says so.)*

**Read it when Thomas asks for a handoff.** In outline, so you know whether you need it: read
this file first, **archive it before rewriting** (`archive/Previous Handoffs/handoffNNN.md`,
zero-padded, one higher than the highest there — verify with `sha256sum`), rewrite §2/§3 as
state and pointers, sweep out what is finished, run the five-handoff review if NNN is divisible
by 5 and the slow-layer sweep if divisible by 20, refresh §1's read-cost table, and write the
round's story to project memory.

**Never run git, never state git status, never tell Thomas to commit** — that is `PLAYBOOK.md`
rule 1 and it binds every task, not just this one.
