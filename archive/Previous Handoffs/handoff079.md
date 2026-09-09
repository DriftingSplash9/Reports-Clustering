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

Last updated: 2026-09-09 (round 31 — a RESEARCH round, so §2/§3 were EDITED in place, not
rewritten, and nothing was archived: `notes/handoff-procedure.md`'s own first line says editing
§2/§3 during a round is not a handoff. The archive still ends at `handoff078.md`; the next agent
Thomas asks for a handoff from stamps `handoff079.md`. Round 31 wired the Wuhan and Xi'an city
yearbooks, minted three NBS instrument nodes, and answered §3's router question — see [Thomas] 1.)

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

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-09 after round 31): a corpus round is required to
read 6.0% of its context before he types a prompt, a renderer round 5.6%.** Chars ÷ 4 over a
200k-token window.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 20.5k + CORPUS index 16.6k + PLAYBOOK 9.5k + CLAUDE 1.5k | 48.1k | 12.0k | **6.0%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 45.1k | 11.3k | **5.6%** |
| *was, handoff 078* | *44.3k / 41.3k* | *11.1k / 10.3k* | *5.5% / 5.2%* |
| *was, handoff 077* | *86.1k* | *21.5k* | *10.8%* |

**Up 0.5pp since handoff 078, and this file is where all of it went** (17.0k → 20.5k; the corpus
index and `PLAYBOOK.md` moved 0.2k and 0.7k between them). Round 31 was a research round that
edited §2/§3 in place, and it added a method correction to §2, a scope question to §3 and the
router report to §3 — none of which is a rule, so none of it belongs in a playbook. **This is the
fast layer doing its job, and the next handoff's step 4 sweep is what collects it:** the router
report is answered and can go the moment Thomas has read it, and the three-machines paragraph in
[Agent] is a candidate for `notes/china-progress.md`, where the rest of the host advice already
lives, rather than for a fourth restatement here.

**Halved by MOVING, not deleting.** `PLAYBOOK-CORPUS.md` 50.6k → 16.4k and `HANDOFF.md`
25.1k → 17.0k, into `playbook/` and `notes/handoff-procedure.md`. Every ruling keeps a one-line
index entry. Record: memory `doc_split_2026-09-09`.

**Watch this instead of the total.** No file dominates any more, so the number drifts up slightly
whenever a rule joins an index — this handoff already added 0.1pp writing itself. **The real
check is whether the five `playbook/` files stay closed unless their question arrives**; §3 asks
the next agent to report exactly that. On-demand sizes: naming 15.2k, evidence 10.8k, nodes 7.4k,
route 7.1k, hosts 5.6k, handoff procedure 9.4k, China worklist 12.7k.

**A warning for the 5b pass that retires a programme, measured 2026-09-09.** It is tempting to
think a finished programme frees a big block of mandatory reading. **It does not, and China is
the worked example.** Its two files — `notes/china-progress.md` (12.7k) and
`notes/techniques-cn-yearbooks-2026-09-08.md` (4.1k) — are **routed by task and were never on the
mandatory path**; archiving them when China closes will drop the corpus percentage by roughly
nothing. What China actually costs every round is **~2.7k of §2/§3 prose in this file plus ~0.3k
of index lines in `PLAYBOOK-CORPUS.md`** — about 0.4pp, and *that* is what a retirement sweep
should collect. So retire a programme's files for tidiness and read-cost-of-a-CN-round, but do
not book the saving against the headline number, and do not go looking for a bigger block that
is not there.

---

## 2. Current state

Corpus **3,600 reports / 3,188 dependencies**. **1,175 A · 1,402 B · 611 C**, A-share 36.9%.
**Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **31**
(Wuhan and Xi'an city yearbooks + 3 NBS instrument nodes), 2026-09-09.
**974 nodes still have zero edges** — CN is 29 of them, down from 31.

**The doc set was split 2026-09-09 and round 31 was its first real use — it works, 3 of 5
`playbook/` files stayed shut.** Mandatory reading went 10.8% → ~5.5% by MOVING text that binds one
question into a file opened when that question arrives; nothing was deleted or reworded and every
ruling keeps a one-line §6/§7 index entry, so old `§7a` / `PLAYBOOK §6` references still resolve in
two hops. Record: memory `doc_split_2026-09-09`. **The verdict and the two snags are §3 [Thomas]
item 1**; this paragraph goes at the next sweep once he has read it.

**The live programme is CHINA.** Thomas ruled 2026-09-08 *"i'd rather scale the china work"*, and
both blockers are settled. **Its state lives in `notes/china-progress.md`, not here.** Score
there: **2 provinces wired and fully mined (Jiangsu, Guangdong), 8 with a node but no edges, 22
with no node yet; 3 of 10 cities wired.** Three rounds in, 27 edges, every one A.

**Round 31 corrected the programme's own method note, and that correction is the round's most
reusable output.** Round 30 wrote in `notes/china-progress.md` that a city's 编者说明 carries the
industry-classification item and that the route was "proven, expected to just work". It is **1 for
4**: Wuhan's, Xi'an's and Suzhou's all stop at the collecting agency or a generic "national
statistical system" and name no artefact. **The per-chapter 简要说明 is the route** — all six of
round 31's edges came from chapter notes, none from an 编者说明. The tracker now says so, names the
four physical SHAPES a city yearbook comes in (one whole-book PDF / text chapter PDFs / image-only
scans with no text layer / a JS viewer with no static URLs), and says to identify the shape before
planning the round.

**Other threads, one line each; the narrative is in project memory:**

- **FR — live, four rounds in, 21 nodes from 9.** The GNI-inventory-chapter method is exhausted
  for the current edition; the live method is a third document naming a target by title, and the
  Note de conjoncture's public-finance and international articles are unchecked. Memory
  `round15_fr_note_de_conjoncture_2026-09-07`, `round17_fr_ndc_camme_2026-09-08`.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains (7 non-government
  sources), a scope question before an evidence one.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — parked, awaiting Thomas (§3).**

---

## 3. Todo (live items only)

### [Thomas]

**1. The split works. Round 31 used it and reports: 3 of 5 `playbook/` files stayed shut.**
You asked for a fresh agent to gauge it and for the file-by-file answer. It opened, in order:
`HANDOFF.md`, `PLAYBOOK.md`, `CLAUDE.md`, `PLAYBOOK-CORPUS.md`, `notes/china-progress.md`,
`notes/techniques-cn-yearbooks-2026-09-08.md`, then **two** `playbook/` files when their questions
actually arrived — `corpus-naming.md` (was a table note naming an instrument a citation? was a title
without 《》 named?) and `corpus-nodes.md` (before minting three nodes) — and
`notes/handoff-procedure.md` before touching §2/§3. **`corpus-evidence.md`, `corpus-route.md` and
`corpus-hosts.md` were never opened**, and nothing was missed by not opening them: §6's one-line
index answered every question they would have. Two opens on a round that both minted nodes and hit
a genuine naming edge case is the "split is right" outcome you described, not the "redraw it" one.

**Two honest snags, neither an argument against the split.** (a) The §6 index line *"A PDF is read
THREE ways and the best reading wins"* was not enough on its own when a target's title turned out to
be broken across a two-column line break in **all three** readings — the index says the rule exists
but not what it does at the edge, and the round resolved it by running the grader rather than by
opening `corpus-evidence.md` (grader said `quote-found-artefact-named`, A). That is arguably the
system working. (b) `PLAYBOOK.md` §2 rule 4's staging recipe and `notes/handoff-procedure.md` were
both needed and both correctly routed, but the §1 router table lists the handoff procedure under
"writing a handoff" only — the procedure's own first line ("editing a line of §2/§3 during a round
is not a handoff and needs no archive") is exactly what a *research* round needs to know, and it is
one file deeper than that round's routing suggests. Consider a router row for "editing §2/§3
mid-round".

**2. Park the four orphaned NSO nodes, or keep hunting?** `iq-cso`, `ye-cso`, `sy-cbs`, `sd-cbs`
are **not** duplicates and should not be retired — the institutional node and a country's
publication nodes are designed to coexist, and `af-nsia` proves the shape works when some OTHER
report names the stats office as its source. But the 2026-09-08 pass checked Iraq's, Yemen's and
Sudan's own non-NSO reports and **found no general sourcing statement anywhere**, only narrow
CPI-methodology boilerplate `iq-cpi` already carries. Recommendation: **park them as
legitimate-but-currently-unwireable**. Say park and it stops being re-read. (`ir-sci` is
unrelated — already-ruled null-ComplianceDate class.) Memory
`round_orphaned_nso_iq_coicop_2026-09-08`.

**3. 750 DSBB SoM rows are mint leads with no source node — corpus-expansion call, not taken.**
`Claude outputs/dsbb-som-import-2026-09-05-review.json`, 750 rows where the IMF's own methodology
summary names a standard for a country+category with no node at all. Minting from a DSBB category
label alone — no independently verified title, publisher or cadence — is a thinner kind of
research than the rest of this corpus does, at a scale that changes what the corpus is. **Not
started.** If you want it, say how thin a node may be and roughly what scale.

**5. Do PROVINCIAL-bureau methodology instruments become nodes, the way NBS's do?** New this
round, and it blocks two edges. Xi'an's yearbook names two SHAANXI instruments by title — 《陕西省
统计局关于非公有制经济增加值测算的暂行办法（修订版）》 (how non-public-sector value added is
measured, part 3) and a Shaanxi scheme for revising regular annual data off the third agricultural
census (part 11). Both are real, both are named exactly the way the NBS instruments this corpus
already mints are named, and both are published by a PROVINCIAL statistical bureau rather than NBS.
The corpus has no provincial-bureau instrument node yet and Shaanxi has no node of any kind. Saying
yes opens a class — every province writes these — so it is a scope call, not a research one.
Round 31 parked it rather than minting. Detail: `notes/china-progress.md`, leads section.

**4. A new international hub node: generic `sitc`?** The China Statistical Yearbook and Jiangsu
both name 《国际贸易标准分类》(SITC) and **neither names an edition**; UNSD's page is Rev.3, marked
*Superseded*. An edition-bound node would be the exact inference the COICOP ruling overturned, so
it was deferred. A **generic** `sitc` hub in the style of `hs` and `isic` avoids that and unlocks
2 waiting edges, more as provinces are mined. New international node, so it is your call.

### [Agent]

**Round 31 (2026-09-09) did the city sweep and the router report. Both are below in §3's
[Thomas] items 1 and 5; the round narrative is project memory `round31_cn_cities_2026-09-09`.**

**Your round: Shandong and Henan.** Both have nodes and no edges, so this is pure wiring, no
minting. Shandong answers over http; Henan's 403 smells like a WAF — round 31 found that a single
failed fetch is not a verdict (see below), so retry and change machine before recording either as
blocked. Method: `notes/china-progress.md` first (it is the worklist and now carries the corrected
method), then `notes/techniques-cn-yearbooks-2026-09-08.md`. **Go to the per-chapter 简要说明, not
the 编者说明** — and open 建筑业 and 农业 first, which have named an NBS 统计报表制度 by title in
every yearbook checked so far. After that, the minting run: Hunan, Hubei, Fujian, Yunnan, Xinjiang,
Jilin, Hainan, Tibet all answered and have no node, so those rounds mint and wire in one pass.

**Three cities are left with a concrete next step each, all in the tracker:** Guangzhou (reachable
in Chrome only; the yearbook is behind a zTree JS viewer at
`tjj.gz.gov.cn/datav/admin/home/www_nj/` that a synthetic click did not fire — it needs a real
click or the API the tree calls), Hangzhou and Chengdu (000 to all three machines, unprobed since).
Suzhou is **read and empty**, not unread — do not re-fetch it against this edition. Shenzhen is
**IP-blocked at the WAF by address**, not by user-agent; nothing to retry from here.

**Three machines now, and they are not a superset of each other in either direction.** Round 31
used the cloud container, Thomas's local VM (`device_bash`) and his Chrome, and needed all three:
the container's route to most `.gov.cn` hosts collapsed mid-round while `stats.gov.cn` and Wuhan
kept working; Xi'an refused curl on both machines but answered a retry in the local VM; the local
VM's DNS failed intermittently and succeeded 3 seconds later. **Retry, and change machine, before
recording a host as blocked** — and say which machine in the note.

**Continue FR when China pauses.** The GNI-inventory-chapter method (DE ×5, FR ×2) is **exhausted
for the current inventory edition** — do not re-read barring a newer one. The EU harmonised
business/consumer survey node shares `fr-insee-camme`'s domain-fit problem ("monetary-policy" as
least-wrong) and the two want **one** scope decision, not two.

**Settled, do not re-raise:** **The CN/TW/JP/KR re-grade sweep** — 166 B/C edges, Thomas
2026-09-08: *"that's a lot of time for B/C's. forget that."* The charset fix is kept; any re-grade
rides along with work touching those edges for another reason. **A first-party zip is a direct
read**, not a capped route (§7b). **Bulk-diffing stored quotes against cached windows** — ~60%
false positives from `evidence-cache/`'s last-run-wins structure. The non-ASCII-hyphen sweep
(negative), the UEMOA NCOA retarget (resolved as base-2023 edges), the COICOP edges for
Morocco/Tunisia/Iraq (dropped `no-document`), DGDDI's monthly bulletin (dead, permanent §7a
refusal), the e-GDDS wiring todo (all 34 countries), the stale-cache B sweep, India's NSDP, the
GFSR (no methodological appendix exists), the ICLS class (do not re-open per country). A Chapter
10 table row alone is NOT enough to wire an edge. The three project-memory files carrying the
retired source's name — leave them. A country carrying both a REGISTER and a SELF-DECLARED tier
edge — both stay, no dedupe pass. Korea's and Estonia's NSDP, the null-ComplianceDate class, round
7's tier confirmations, round 5's little things 1-3, the Euro Area row, the DE round-2 EVS
refusal, the Bundesbank Monthly/Annual refusal, the BaFin insurance/pension refusal — all read in
full and refused, reasons in the `playbook/` files the §7 index names.

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
