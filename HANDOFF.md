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

Last updated: 2026-09-09 (handoff 079 — the superseded state is
`archive/Previous Handoffs/handoff079.md`, copied and sha256-verified before this rewrite. Covers
**round 31**: the Wuhan and Xi'an city yearbooks wired, three NBS instrument nodes minted, Suzhou
read-and-empty and Shenzhen IP-blocked, and round 30's "编者说明 route" corrected to 1-for-4. 079 is
divisible by neither 5 nor 20, so **no five-handoff review and no slow-layer sweep ran** this time;
the next 5 is 080 and the next 20 is 080 — **both fall on the very next handoff.** §2/§3 were swept:
the router-report and doc-split narrative left for memory, and the three-machines paragraph left
because `notes/china-progress.md` already carries it.)

---

## 1. Read next

**This is the project's only read order.** `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block point
here. **Restructured 2026-09-09** (Thomas: *"just have one handoff that says where to go if doing
such and such a thing… this way the whole lot doesn't need taken in"*): what follows is a router,
not a reading list. Read the ALWAYS set, then open exactly the rows your task lights up.

### Always — this file, then these two

| file | k | why |
|---|---|---|
| `PLAYBOOK.md` | 9.5k | the rules that bind every task whatever it is; its §1 routes you to one lane |
| `CLAUDE.md` | 1.5k | read automatically by a local Claude Code session |

Then ONE lane index: **`PLAYBOOK-CORPUS.md` (16.6k)** for research/minting/wiring/grading, or
**`PLAYBOOK-RENDER.md` (13.6k)** for the renderer. Each is now an index plus the rules that bind
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
| **editing §2/§3 mid-round** | nothing — that is not a handoff and needs no archive; §4 below has the one-line test |
| **writing a handoff** | `notes/handoff-procedure.md` — the full §4 procedure, moved there 2026-09-09 |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Project instructions and memory are summaries written outside the repo: **where either disagrees
with a file, the file wins.**

### Read cost — the bloat gauge, refreshed every handoff

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-09, handoff 079): a corpus round is required to
read 6.0% of its context before he types a prompt, a renderer round 5.6%.** Chars ÷ 4 over a
200k-token window.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 20.6k + CORPUS index 16.6k + PLAYBOOK 9.5k + CLAUDE 1.5k | 48.2k | 12.0k | **6.0%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 45.1k | 11.3k | **5.6%** |
| *was, handoff 078* | *44.3k / 41.3k* | *11.1k / 10.3k* | *5.5% / 5.2%* |
| *was, handoff 077* | *86.1k* | *21.5k* | *10.8%* |

**Up 0.5pp on handoff 078, and all of it is this file** (17.0k → 20.6k; `PLAYBOOK.md` and the corpus
index moved 0.9k between them for reasons unrelated to this round). **That is one research round's
worth of arrival, and the honest read is that it is the expected cost, not a regression** — round 31
added a corrected method summary, a new scope question and two router fixes, none of which is a rule,
so none belongs in a playbook. The step-4 sweep took back ~1.3k by moving the router report and the three-machines paragraph out,
and §1's two stale paragraphs were corrected in place rather than trimmed, which cost ~0.8k back —
that trade is deliberate: a corrected paragraph that shows its old wording is worth more than a
shorter one nobody trusts. **Watch whether 080 comes in under 20.6k**: if a docs-only
handoff cannot claw back what one research round adds, the fast layer is growing faster than it
sweeps, and §2's per-programme paragraphs are where to cut first.

**Both review triggers fire on the next handoff (080) — that is unusual and worth planning for.**
Step 5 (review the last five) and step 5b (sweep the slow layer against what `validate` and the code
actually say) land together. 5b is the expensive one and it has its own two questions to answer in
writing, plus — since the archive crosses 80, not 100 — no recap question this time. Expect 080 to be
a docs session, not a research round with a handoff bolted on.

**Watch this instead of the total.** No file dominates any more, so the number drifts up slightly
whenever a rule joins an index. **The real check is whether the five `playbook/` files stay closed
unless their question arrives — and as of handoff 079 that has been measured once, not assumed:
round 31 opened two of the five and missed nothing** (§3 [Thomas] 1). *(This paragraph ended "§3
asks the next agent to report exactly that" until 2026-09-09; the report came back, so the ask is
replaced by its answer.)* On-demand sizes, **refreshed 2026-09-09**: naming 15.3k, evidence 10.9k,
nodes 7.4k, route 7.1k, hosts 5.7k, handoff procedure 9.5k, **China worklist 20.6k** *(was 12.7k at
handoff 078 — round 31 added the corrected method, the four-shapes note and the re-probe evidence.
It is the fastest-growing file in the repo and the only on-demand file that has outgrown every
`playbook/` file; if it keeps this rate it wants splitting into worklist and method, the same way
`PLAYBOOK-CORPUS.md` was.)*

**A warning for the 5b pass that retires a programme, measured 2026-09-09 and re-measured at
handoff 079.** It is tempting to think a finished programme frees a big block of mandatory reading.
**It does not, and China is the worked example.** Its two files — `notes/china-progress.md` (20.6k)
and `notes/techniques-cn-yearbooks-2026-09-08.md` (5.0k) — are **routed by task and were never on
the mandatory path**; archiving them when China closes will drop the corpus percentage by roughly
nothing, even now that they have nearly doubled. What China actually costs every round is **~2.4k of
§2/§3 prose in this file plus ~0.3k of index lines in `PLAYBOOK-CORPUS.md`** — about 0.3pp, and
*that* is what a retirement sweep should collect. So retire a programme's files for tidiness and
read-cost-of-a-CN-round, but do not book the saving against the headline number, and do not go
looking for a bigger block that is not there. *(The 2026-09-09 version of this paragraph said 12.7k
/ 4.1k / ~2.7k / 0.4pp; the conclusion is unchanged and the growth is the point — the files it
names grew 60% in one round and the headline number still barely moved.)*

---

## 2. Current state

Corpus **3,603 reports / 3,192 dependencies**. **1,179 A · 1,402 B · 611 C**, A-share 36.9%.
**Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **33**
(the first DSBB option-E mints, Eastern Caribbean), 2026-09-09; round 32 was the generic `sitc`
hub, round 31 Wuhan and Xi'an plus 3 NBS instrument nodes.
**974 nodes still have zero edges** — CN is 29 of them, down from 31.

**Round 32, 2026-09-09: `sitc` minted and wired.** Generic, edition-less, in the shape of `hs` and
`isic`, on Thomas's ruling. Two A edges off chapter notes that name 《国际贸易标准分类》 with no
revision — `cn-statistical-yearbook` (CSY ch.11) and `cn-js-statistical-yearbook` (Jiangsu ch.8),
both read in Chrome and transcribed against the pages' own code points (the CSY prints ASCII
parens around SITC, Jiangsu fullwidth). Slice `src/data/research/int-sitc-2026-09-09.json`.
Validated in a cloud sandbox: `validate` exit 0, 128/128 logic, grader selftest 76/76, and
`--scan-quotes` clean on both new quotes. **www.stats.gov.cn resolves from neither the cloud
container nor the device VM — Chrome is the working route for it**, which is a machine claim, not
a host verdict.

**The live programme is CHINA.** Thomas ruled 2026-09-08 *"i'd rather scale the china work"*, and
both blockers are settled. **Its state lives in `notes/china-progress.md`, not here.** Score
there: **2 provinces wired and fully mined (Jiangsu, Guangdong), 8 with a node but no edges, 22
with no node yet; 3 of 10 cities wired** (Nanjing, Wuhan, Xi'an), 1 read-and-empty, 1 IP-blocked,
5 open. Three rounds in, 27 edges, every one A.

**The one thing to carry forward from round 31: the city method changed, and the tracker holds
it.** Round 30 called the 编者说明 route "proven"; round 31 found it **1 for 4** and established
that the per-chapter 简要说明 is the route — all six of its edges came from chapter notes. The
tracker now carries the corrected method, the four physical SHAPES a city yearbook comes in, and
the re-probe evidence that a host verdict is a claim about one machine on one day. Narrative:
memory `round31_cn_cities_2026-09-09`.

**Round 33, 2026-09-09: DSBB option-E opened, Eastern Caribbean first.** Two nodes minted on a
publication the SoM NAMES and the publisher's own site CONFIRMS — `dm-national-accounts`
(Dominica CSO, *National Accounts Report*) and `vc-digest-of-statistics` (SVG Statistical Office,
*Digest of Statistics*) — each wired to `isic`, both A. **First nodes this corpus has carried for
either country**, so `src/lib/regions.ts` and `src/lib/palette.ts` gained DM and VC in the same
round; without them the two nodes fall back to 'International' and lose their colour family, the
failure the HK/PS/SV note records. Grenada and St Kitts were candidates and are in the slice's
`_dropped`, both for HOST reasons rather than evidence ones — Grenada's *Economic Review* is not on
its CSO site, and statistics.gov.kn refuses TLS to Chrome and errors over http. Validated in the
cloud sandbox: `validate` exit 0, 128/128 logic, selftest 76/76, `tsc` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back; all four changed files sha256-verified
against the validated copies. Slice `src/data/research/dsbb-e-slice-eastern-caribbean-2026-09-09.json`.
**The grader overruled the researcher on one edge** — SVG's quote was hand-graded B for naming ISIC
by acronym inside a 'broad classification' phrase, and `--slice` returned A; the A stands and the
reasoning is in the edge's own basis.

**Other threads, one line each; the narrative is in project memory:**

- **FR — live, four rounds in, 21 nodes from 9.** The GNI-inventory-chapter method is exhausted
  for the current edition; the live method is a third document naming a target by title, and the
  Note de conjoncture's public-finance and international articles are unchecked. Memory
  `round15_fr_note_de_conjoncture_2026-09-07`, `round17_fr_ndc_camme_2026-09-08`.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains (7 non-government
  sources), a scope question before an evidence one.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — parked, awaiting Thomas (§3).**
- **The 2026-09-09 doc split is proven in use** — round 31 opened 2 of the 5 `playbook/` files and
  missed nothing. Verdict and the two snags: §3 [Thomas] 1. Record: memory `doc_split_2026-09-09`.

---

## 3. Todo (live items only)

### [Thomas]

**1. Two small router fixes, off round 31's use of the split. The split itself is settled — it
works.** (a) `notes/handoff-procedure.md` is routed under "writing a handoff" only, but its own
first line — *editing a line of §2/§3 during a round is not a handoff and needs no archive* — is
what a RESEARCH round needs, and is a hop deeper than the router suggests. Worth a §1 row for
"editing §2/§3 mid-round". (b) The §6 index line *"a PDF is read THREE ways and the best reading
wins"* says the rule exists but not what it does at the edge; round 31 hit a target title broken
across a two-column line break in **all three** readings and resolved it by running the grader
(`quote-found-artefact-named`, A) rather than by opening `corpus-evidence.md`. Arguably the system
working — your call whether the index line should say so.

**2. `MEMORY.md` — DEFERRED by Thomas 2026-09-09 to after handoff 080, as its own session.** Do
not attempt the index line or the condense pass before then, and do not re-raise it; the round-31
topic file is written and findable by name in the meantime. The reasoning below stands as the
record of why.

*(original item, kept:)* **`MEMORY.md` was NOT updated for round 31, and it has drifted past its own spec.** The topic
file `round31_cn_cities_2026-09-09.md` is written and findable by name; the index line is missing.
Two reasons, and the second is the one that matters. The tool requires resending the whole file,
and the index is **64KB of dense prose including Chinese** — hand-retyping it to insert one line
risks silently corrupting your round history, which is worse than a missing line. And the file's
own header says it should be one-line hooks under ~150 chars; recent entries run ~1.5k each, so it
has grown roughly the way it did before the 2026-09-05 condense. **A condense pass would fix both
at once** — it is precedented (the header records the last one) but it is your call, not an
agent's, and it wants to be its own session rather than a tail-end of a research round.

**3. Park the four orphaned NSO nodes, or keep hunting?** `iq-cso`, `ye-cso`, `sy-cbs`, `sd-cbs`
are **not** duplicates and should not be retired — the institutional node and a country's
publication nodes are designed to coexist, and `af-nsia` proves the shape works when some OTHER
report names the stats office as its source. But the 2026-09-08 pass checked Iraq's, Yemen's and
Sudan's own non-NSO reports and **found no general sourcing statement anywhere**, only narrow
CPI-methodology boilerplate `iq-cpi` already carries. Recommendation: **park them as
legitimate-but-currently-unwireable**. Say park and it stops being re-read. (`ir-sci` is
unrelated — already-ruled null-ComplianceDate class.) Memory
`round_orphaned_nso_iq_coicop_2026-09-08`.

**4. RULED YES, Thomas 2026-09-09 — provincial-bureau methodology instruments ARE nodes, the way
NBS's are. The class is open; do not re-raise it per province.** The source bar is the existing one:
`Report.url` is required, round 31's three NBS mints came off their own `stats.gov.cn` landing
pages, and the instruments named only inside a yearbook were parked for having none — a provincial
instrument earns a node the same way, off the issuing bureau's own page. **So the two Xi'an edges
are unblocked, not wired**: nobody has looked for the two Shaanxi instruments on the Shaanxi
bureau's site yet, and if those pages do not exist the edges stay parked for want of a source, which
is now an ordinary research outcome. Shaanxi still has no node of any kind. *(Original question:)*
New in round 31, and it blocks two edges. Xi'an's yearbook names two SHAANXI instruments by title —
《陕西省统计局关于非公有制经济增加值测算的暂行办法（修订版）》 (how non-public-sector value added is
measured, part 3) and a Shaanxi scheme for revising regular annual data off the third agricultural
census (part 11). Both are real, both are named exactly the way the NBS instruments this corpus
already mints are named, and both are published by a PROVINCIAL statistical bureau rather than NBS.
The corpus has no provincial-bureau instrument node yet and Shaanxi has no node of any kind. Saying
yes opens a class — every province writes these — so it is a scope call, not a research one.
Detail: `notes/china-progress.md`, leads section.

**5. DONE — generic `sitc` minted and wired, round 32, 2026-09-09.** Thomas ruled yes; the node is
edition-less in the shape of `hs`/`isic`, the two waiting edges are wired A, and the reasoning
(including why an edition-bound node was declined on the documents rather than for want of a
current edition, and why the node cites UNSD's economic-classifications index) is in the slice's
own `meta.note`. Nothing left here — this item leaves at the next handoff.

**6. RULED 2026-09-09: option D — a BOUNDED SLICE, not the whole 750.** Thomas picked the family;
the member was not named, so **the pilot bound taken is the 6 countries with no corpus node at all
— ABW, DMA, GRD, KNA, MAC, VCT — which is 23 of the 684 pairs.** Smallest of the three bounds
offered, fills genuine holes rather than densifying, and preserves the stop option that is the whole
point of D. **Widening is one word from Thomas**: MET00+NAG00 is 225 pairs, countries with 20+
nodes already is 131. Any pass must mark the thin nodes as thin (a `provenance` marker or
equivalent) so they stay separable later. **Thomas switched the bound to option E, 2026-09-09** — take only the pairs whose SoM names the
actual publication by title, so the node is not thin at all. **The full sweep is done and E is far
smaller than the sample predicted: all 684 SoMs fetched and filtered, and the honest yield is
~20 strong pairs plus ~10 marginal, not the 70–135 estimated off a 60-pair sample.** The sample
estimate was 3x too optimistic and is corrected in the scoping note; the raw matcher says 56, which
falls to 39 once the standards' own manual names are excluded and to ~20 once hand-read (the
discards include a font name, SITC section headings, and an ISIC activity). Worklist:
`Claude outputs/dsbb-pilot-2026-09-09/e-slice-tier1.json`, with all 684 SoM texts cached beside it.
**Two side-findings worth more than the count.** Several hits are statistical LAWS rather than
releases (Uzbekistan's "On Official Statistics", Kyrgyzstan's "On the National Bank of the Kyrgyz
Republic") — a legitimate and better-evidenced class this corpus already mints. And Colombia's
ILV00 names a publication with an unsubstituted template placeholder in its title ("Periodo
-----"), the same defect class round 23 found on the e-GDDS pages.

**Pilot state, 2026-09-09: prepared, NOT minted.** All 23 pairs fetched, and **all 24 stored
quotes re-verified verbatim against a fresh read** — cache and worklist in
`Claude outputs/dsbb-pilot-2026-09-09/`. The quote guard would cap only 2 of the 24 (both Aruba's
"transition … foreseen in 2017"). What is left before any mint: a `url` and a cadence per node,
which for the four Eastern Caribbean countries means the CSO and ECCB product pages. **No data
has changed and `validate` has not been re-run, because nothing needed it.** *(Original item:)*
**750 DSBB SoM rows are mint leads with no source node — corpus-expansion call, not taken.**
`Claude outputs/dsbb-som-import-2026-09-05-review.json`, 750 rows where the IMF's own methodology
summary names a standard for a country+category with no node at all. Minting from a DSBB category
label alone — no independently verified title, publisher or cadence — is a thinner kind of
research than the rest of this corpus does, at a scale that changes what the corpus is. **Not
started.** **Scoped and measured 2026-09-09 — the numbers, the four options and the
evidence-quality warning are in `notes/dsbb-som-750-scoping-2026-09-09.md`; read that before
answering, and do not re-derive them.** The four findings that decide it: **750 rows are 684 nodes
and 620 of those carry exactly one edge**; the SoM endpoint returns methodology prose only, so a
thin node's `title` would be an IMF category label and its `url` the IMF API endpoint; **only 6 of
the 180 countries have no corpus node at all**, so this is mostly filling category gaps in
already-researched countries; and wiring all of it takes `imf-bpm6` from 75 inbound to 328, moving
the graph's centre onto the IMF manuals. **The evidence guard this class needs already EXISTS and
was already applied** — `NEGATED_QUOTE_PATTERNS` + `quoteGuardFlags` in `scripts/grade-evidence.ts`
(built 2026-09-05 off the source review, with a `--scan-quotes` corpus mode), and all 10 rows that
review flagged are fixed in the data: 8 capped to B, `mm-national-accounts -> isic` dropped, and
`-> sna-2008` retargeted to `sna-1968`. Verified 2026-09-09. Earlier drafts of this item said the
guard still had to be built; that was wrong.

### [Agent]

**Your round: Shandong and Henan.** Both have nodes and no edges, so this is pure wiring, no
minting. Shandong answers over http; Henan's 403 smells like a WAF. Method:
`notes/china-progress.md` first — it is the worklist, it carries the corrected method and the
re-probe evidence, and **a single failed fetch is not a verdict there: retry, and change machine,
before recording a host as blocked** — then `notes/techniques-cn-yearbooks-2026-09-08.md`.
**Go to the per-chapter 简要说明, not the 编者说明**, and open 建筑业 and 农业 first: those two have
named an NBS 统计报表制度 by title in every yearbook checked so far. After that, the minting run —
Hunan, Hubei, Fujian, Yunnan, Xinjiang, Jilin, Hainan, Tibet all answered and have no node, so
those rounds mint and wire in one pass.

**Five cities are still open and each has a concrete next step on its tracker row** — Guangzhou
(Chrome-only; yearbook behind a zTree JS viewer a synthetic click did not fire), Hangzhou, Chengdu,
Chongqing, Beijing. **Suzhou is read-and-empty, not unread** — do not re-fetch it against this
edition. **Shenzhen is IP-blocked at the WAF by address**, not by user-agent; nothing to retry.

**Continue FR when China pauses.** The GNI-inventory-chapter method (DE ×5, FR ×2) is **exhausted
for the current inventory edition** — do not re-read barring a newer one. The EU harmonised
business/consumer survey node shares `fr-insee-camme`'s domain-fit problem ("monetary-policy" as
least-wrong) and the two want **one** scope decision, not two.

**Settled, do not re-raise:** **The CN/TW/JP/KR re-grade sweep** — 166 B/C edges, Thomas
2026-09-08: *"that's a lot of time for B/C's. forget that."* The charset fix is kept; any re-grade
rides along with work touching those edges for another reason. **A first-party zip is a direct
read**, not a capped route (§7b). **A table NOTE naming an instrument by title IS a citation** and
grades A on §7a caption-equivalence — settled round 31, grader-confirmed; that is NOT the same as
the still-settled refusal below, where a table ROW alone is not enough. **A target title broken
across a two-column line break in all three pdftotext readings still grades A** — do not drop an
edge over it. **Bulk-diffing stored quotes against cached windows** — ~60% false positives from
`evidence-cache/`'s last-run-wins structure. The non-ASCII-hyphen sweep (negative), the UEMOA NCOA
retarget (resolved as base-2023 edges), the COICOP edges for Morocco/Tunisia/Iraq (dropped
`no-document`), DGDDI's monthly bulletin (dead, permanent §7a refusal), the e-GDDS wiring todo (all
34 countries), the stale-cache B sweep, India's NSDP, the GFSR (no methodological appendix exists),
the ICLS class (do not re-open per country). A Chapter 10 table ROW alone is NOT enough to wire an
edge. The three project-memory files carrying the retired source's name — leave them. A country
carrying both a REGISTER and a SELF-DECLARED tier edge — both stay, no dedupe pass. Korea's and
Estonia's NSDP, the null-ComplianceDate class, round 7's tier confirmations, round 5's little
things 1-3, the Euro Area row, the DE round-2 EVS refusal, the Bundesbank Monthly/Annual refusal,
the BaFin insurance/pension refusal — all read in full and refused, reasons in the `playbook/`
files the §7 index names.

---

## 4. How to hand off

**You almost certainly do not need it. Editing a line of §2/§3 during a round is NOT a handoff
and needs no archive** — only replacing the state prose wholesale is, and the test is whether the
prose being replaced would be unrecoverable afterwards. *(That sentence opened §4 for the life of
this file. It moved out with the procedure on 2026-09-09 and round 31 found it a hop deeper than
a research round should have to dig — restored here 2026-09-09, because it binds every round and
the file it moved to binds one task.)*

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
