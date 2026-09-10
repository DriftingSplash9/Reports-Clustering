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

**The header below still names handoff 082 because that is the last rewrite that WAS one.** §2 and §3 have
since been rewritten mid-round more than once — most recently by round 40 — which is an ordinary edit and not
a handoff (§4 has the test); §1's read-cost table is refreshed with each and says why.

Last updated: 2026-09-09 (handoff 082 — the superseded state is
`archive/Previous Handoffs/handoff082.md`, copied and sha256-verified before that rewrite. **82 is
divisible by neither 5 nor 20, so no review ran**; both fired on 080 (`notes/doc-audit-2026-09-09.md`).
Next 5 is 085; **next 20 is 100, which is also the first archive crossing of a hundred** and the only
condition that triggers step 5b's past-sweeps recap question.

**§2 and §3 were edited mid-round on 2026-09-09/10 by ROUND 41** — an ordinary §2/§3 edit and not a handoff
(§4 has the test). Round 41: the two-layer sweep paid on Guangdong (an `indicators.html` layer inside the zip)
and Suzhou (19 `zb` PDFs beside the image-only `sm` ones — the "read and empty" verdict was one layer's); the
trade hubs wired to Jiangsu and Guangdong; 《全国农业普查条例》 minted off Guangdong ch11. 11 edges, all A; 1
node; two rulings parked for Thomas in §3. §1's read-cost table refreshed. The device shell was down, so the
edit went through stage → sandbox → commit. Round 40's note follows.

**§2, §3 and §1's read-cost table were rewritten mid-round on 2026-09-09 by ROUND 40** — an ordinary
§2/§3 edit and not a handoff (§4 has the test). Round 40: the zb second layer swept in Shandong, Xi'an and
Fujian; 《关于工资总额组成的规定》 minted and wired to three yearbooks; the two long-nodeless trade hubs
minted off Shanghai's printing of them; and round 39's authorship ruling overturned against the
instruments' own covers, Thomas ruling. 13 edges, all A; 3 nodes. `PLAYBOOK-CORPUS.md` §6 and §7a were
corrected in place, and §7a shows its old wording.)

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
| **anything China** (the live programme) | `notes/china-progress.md` (27.8k) — the worklist, rows kept crossed off. **Split 2026-09-09**: the method moved to `notes/china-method-2026-09-09.md` (26.4k) — portals, the redirect lesson, the yearbook shapes, the extraction traps — and you open it when you are about to fetch, not to see where a round got to. Recipes underneath both: `notes/techniques-cn-yearbooks-2026-09-08.md` |
| fetching / capturing / extracting anything else | `notes/techniques-2026-09-04.md` — recipes and host workarounds. **Every host reading in it is a claim about one machine on one day.** |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first; then the round memory for your bit — `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme's design | `notes/Midvamp - Revamp.md` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md`, `notes/imf-elibrary-2026-09-06.md` (its second addendum corrects the first) |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| a `meta.note` from the August 2026 import | `notes/mint-2026-08-20.md` |
| "what is broken that nobody is fixing?" | `notes/standing-issues.md` — outlived five handoffs; not on the mandatory path |
| editing any doc in the slow layer | `notes/doc-audit-2026-09-09.md` (handoff-080 sweep, and the cadence answer) — format and worked example in `notes/doc-audit-2026-09-07.md` |
| **editing §2/§3 mid-round** | nothing — that is not a handoff and needs no archive; §4 below has the one-line test |
| **writing a handoff** | `notes/handoff-procedure.md` — the full §4 procedure, moved there 2026-09-09 |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Project instructions and memory are summaries written outside the repo: **where either disagrees
with a file, the file wins.**

### Read cost — the bloat gauge, refreshed every handoff

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 7.9% of its context before he types a prompt, a
renderer round 6.3%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 24.3k + CORPUS index 25.5k + PLAYBOOK 11.5k + CLAUDE 1.5k | 62.8k | 15.7k | **7.9%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 50.0k | 12.5k | **6.3%** |
| *was, after round 40* | *61.8k / 49.0k* | *15.5k / 12.3k* | *7.7% / 6.1%* |
| *was, after round 39* | *58.4k / 49.1k* | *14.6k / 12.3k* | *7.3% / 6.1%* |
| *was, after round 38* | *57.3k / 49.2k* | *14.3k / 12.3k* | *7.2% / 6.2%* |
| *was, after round 37* | *50.9k / 46.2k* | *12.7k / 11.6k* | *6.4% / 5.8%* |

**Round 41: HANDOFF 23.3k → 24.3k (+0.2pp) after adding its own §2 block and two §3 rulings and CUTTING round
40's five-point narrative to a pointer paragraph (3.9k → 0.9k); without the cut it would have been 27.6k.**
The earlier paragraph stands: **Up 0.4pp, most of it in `PLAYBOOK-CORPUS.md` (22.9k → 25.5k) while `HANDOFF.md` held flat at 22.5k —
which is round 39's warning coming true one round later.** That file is now 2.4k larger than
`HANDOFF.md`, it has never been swept, and nothing sweeps a playbook (`PLAYBOOK.md` §1). Round 40 added
three §6/§7 entries and **removed none**, which is honest but is exactly the ratchet §1 warns about; two
of the three were forced (a rule that had to be corrected in place, showing its old wording, costs more
bytes than the rule did). **The next round that touches this file should cut before it adds, and §2 —
still the only part of the 2026-09-09 restructure that stayed prose instead of becoming an index — is
where the cut goes.** Keep this section to the table and one paragraph.

**`notes/china-progress.md` IS SPLIT (round 38)** — 37.6k → a **23.0k worklist** (tables, scores,
probe columns, parked leads) plus **19.0k `notes/china-method-2026-09-09.md`** (portals, the redirect
lesson, the yearbook shapes, the extraction traps). Nothing reworded. One rule left China entirely,
per `PLAYBOOK.md` §1's check for rules binding a different task: *a small body is a redirect — read
it* is now a `PLAYBOOK-CORPUS.md` §6 line.

**Watch whether the five `playbook/` files stay closed unless their question arrives.** Measured
three times now: round 31 opened two of five and missed nothing; rounds 32-34 opened `corpus-nodes.md`
only; rounds 35-37 opened one of five — round 37 opened `corpus-nodes.md` only, to mint against §7c, and
ran on the tracker and the techniques note otherwise. On-demand sizes, 2026-09-09: naming 15.3k,
evidence 10.9k, nodes 9.2k, route 7.1k, hosts 5.7k, handoff procedure 9.5k, standing-issues 7.9k,
**China worklist 37.6k**.

**A programme's files are routed by task and were never on the mandatory path**, so retiring one
frees almost nothing from the headline number — China costs ~2.4k of §2/§3 prose plus ~0.3k of
index lines, about 0.3pp, and *that* is what a retirement sweep collects. Retire for tidiness, do
not book a saving that is not there.

## 2. Current state

Corpus **3,620 reports / 3,235 dependencies**. **1,222 A · 1,402 B · 611 C**, A-share 37.8%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **41**,
2026-09-10 (data dated 2026-09-09). **973 nodes have zero edges** — CN is 28 of them; Suzhou left the
orphan list, the one new node was wired. *(Sandbox note: there is no `package-lock.json` on disk, so
`npm ci` is not available; `npm install --legacy-peer-deps` is what installs — the fiber/react peer range
refuses a plain install.)*

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4.

**ROUND 41 TOOK 11 EDGES, ALL A, AND MINTED 1 NODE — and the two-layer seam is now proven on four
publication SHAPES, not one.** Guangdong's first-party ZIP holds an `indicators.html` (主要统计指标解释) in
every chapter directory beside the `brief-description.html` that four rounds read — nobody had opened one;
it and the per-table notes gave Guangdong 7 more edges (4 → 11). Suzhou's frameset `left.htm` lists 19
`zbNN.pdf` beside the 20 image-only `smNN.pdf` round 31 read; the zb layer is clean text and carries
Suzhou's first two edges, so **"read and empty" was a verdict on one layer**. A `report_id`/`candidate_target`
NO-EDGE note for exactly the Suzhou → GB/T 4754 pair sat in `cn-cities-2026-09-09.json`, invisible to
`validate` (the third-shape blind spot, §6) — found by the rule-14 hand check, rewritten RESOLVED. Hunan's
remaining 18 zb files were read: nothing new to wire, layer settled. Two fetch facts worth keeping: the
Guangdong zip is 21.5 MB and a plain `curl` truncates it at ~15 MB with no error (`-C -` resumes); and the
device shell was down for the whole write-up, so the round went through stage → sandbox → commit.

**Round 40 (13 edges, 3 nodes; narrative in memory `round40_second_layer_and_trade_hubs_2026-09-09`) —
the pointers that are still live:** the national/Shandong/Xi'an `left.htm` list a `zbNN.pdf` layer beside
`smNN.pdf` (Fujian's is unextractable in both layers, settled); 《关于工资总额组成的规定》 is 国家统计局令第1号,
minted off NBS's own page — **check the issuing form before deciding whose site to search**; the THIRD NBS
listing is `https://www.stats.gov.cn/zs/flfg/tjlydnfghflfg/` (法规), beside 统计制度 and 统计标准, and its
重大国情国力普查条例 sub-section holds the three census 条例; Shanghai's 年定报制度目录
`https://tjj.sh.gov.cn/ndbzdml/index.html` is where provincial printings of NBS instruments live, covers
settle authorship, and it is where both trade hubs were found — **their node URLs are Shanghai's and move if
an NBS page turns up**; round 39's cite-the-sentence authorship rule is overturned (§7a corrected in place).

**A BLIND SPOT THE ROUND'S OWN VERIFICATION PASS FOUND, AND `validate` NEVER WILL.** Round 40's data
was re-read by an agent that had not written it, checking rule 14 against every `_dropped` entry in all
three key shapes. It found one: `cn-cities-2026-09-09.json` carried a round-31 note reading **"NO EDGE.
cn-xa-city-statistical-yearbook → cn-gbt-4754-2017"** — a pair round 40 had just minted. **`validate`
exits 0 on that and always would**, because `normalizeDroppedNote` reads `source`/`source_report_id`
only, so a `report_id`/`candidate_target` note gets null endpoints and the contradiction check skips it.
**Rule 14 must be checked BY HAND against that shape.** The note is rewritten with a `RESOLVED` preamble
(it stays `reason: "note"`, per the schema comment) and its original text kept — it was never wrong about
the document it examined, only about the source: round 31 read the 编者说明 and the sm layer and never
fetched the zb layer beside them. **A refusal is a statement about the documents you READ.** Now folded
into the existing `PLAYBOOK-CORPUS.md` §6 three-shapes line rather than added as a fourth bullet.

**Other threads, one line each; narrative is in project memory:**

- **DSBB option E — a live worklist, ~15 pairs left**, in `notes/standing-issues.md` with the
  corrected size (~20 strong pairs of 684). Worklist
  `Claude outputs/dsbb-pilot-2026-09-09/e-slice-tier1.json`, all 684 SoM texts cached beside it.
- **FR — live, four rounds in, 21 nodes from 9.** GNI-inventory method exhausted for this edition;
  the live method is a third document naming a target by title. The Note de conjoncture's
  employment, enterprise, prices and international articles are unread against it.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains, a scope question.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — PARKED, ruled 2026-09-09.** Not duplicates, not to be
  retired, not to be re-hunted; rule in `playbook/corpus-nodes.md`. `iq-cso`'s separate
  possible-duplicate question stays open.

## 3. Todo (live items only)

### [Thomas]

**Two rulings from round 41, both written up with the evidence in `cn-round41-2026-09-09.json` `_dropped`:**

1. **《三次产业划分规定》 — node shape.** The "two NBS candidate pages" behind three refusals are now
   identified and they are not two editions: `gjtjbz/202302/t20230213_1902749.html` IS 《三次产业划分规定
   （2012）》 (built on GB/T 4754—2011), and `t20230213_1902764.html` is 国统设管函〔2018〕74号 revising it onto
   GB/T 4754—2017. Guangdong's table 2-2 cites it DATED: 执行国家统计局2018年修订的《三次产业划分规定》. Bare
   citations (national zb03, Jilin zbjs2, Xi'an zb03, Hunan zb02) stay refused. Question: one node titled
   《三次产业划分规定（2012）》 carrying the 2018 revision, or the 2018 通知 as its own node? Edition-per-node
   habit says the former; §7a's publisher's-own-title rule can be read either way. Nothing minted.
2. **Suzhou zb14 → `cn-statistics-law`.** 依照《中华人民共和国统计法》规定，开展住户收支与生活状况调查的住户为调查户 —
   full title, the yearbook's own indicator definition, a stated basis. Would grade A. Parked because round 40
   refused Shandong's 《统计法》 mention as legal-publicity; that one sat in an administrative work summary, this
   one is definitional for a published series. If it goes live, the same sentence shape should be swept for.

### [Agent]

**Start here: the two-layer sweep is unfinished, and it is the cheapest seam in the programme.**

1. **Nanjing, Jilin, Jiangsu, Hubei, Yunnan — re-read each one's index for a layer nobody fetched.**
   Round 41 finished Guangdong (paid, 7 edges), Suzhou (paid, 2) and Hunan (read, empty). Per-yearbook
   status and what each index actually lists is in `notes/china-progress.md` under "Two-layer sweep status".
   The question is still *which files were never downloaded*, not *what did the notes say*.
2. ~~Guangdong and Jiangsu name both new trade hubs~~ **DONE round 41** — 4 edges, all A.
3. **Does any other provincial bureau publish a 年定报制度目录?** Shanghai's sits beside 统计制度 in its
   nav. If Shandong, Jiangsu or Guangdong expose one, provincial instruments stop being a hunt.
4. **《全国经济普查条例》 and 《全国人口普查条例》 now have NBS pages** on the 法规 listing's
   重大国情国力普查条例 sub-section (`/zs/flfg/zdgqglpctl/`). Both are standing nodeless leads; they need a
   citing document, not a page. **《全国农业普查条例》 from the same sub-section was minted round 41 off
   Guangdong ch11** — the precedent is set; the CSY's census chapters are the place to look for the other two.
5. **Guangdong's `indicators.html` layer was swept for 《》 titles only.** Its 24 chapters of indicator
   definitions may name instruments without brackets (e.g. 按…制度). Cheap to grep now the zip is known.

**Still open from round 39, unchanged.**

- **Beijing, on the `nj.` host** — `https://nj.tjj.beijing.gov.cn/nj/main/2025-tjnj/zk/indexch.htm`,
  frameset shape. **Re-probed 2026-09-09 in round 40: still 503 over http and 000 over https from the
  container, and the device VM has no `.gov.cn` egress at all.** Four failures across two rounds. The path
  is not in question; try Chrome on another day.
- **Zhejiang, Sichuan, Guizhou, Chongqing — three routes each, nothing.** Do not re-probe as a batch
  without a new route.
- **Hainan** — `https://www.hainan.gov.cn/hainan/tjnj/list3.shtml`. Re-probed round 40: 000 from the
  container. One more retry, then drop it.
- **The 15 nodeless provinces**, yield curve flattened. Hebei (74M), Anhui (61M), Guangxi (50M) and
  Jiangxi (45M) are the only ones worth a targeted look.
- **Shanghai's table notes.** 558 table pages, and C0101's note names a municipal provider in the first
  one read. Chapter notes are swept; table notes are not.
- **`zb10.pdf` and `zb27.pdf` of the national yearbook are unread** — a corrupt xref and a 404.

**Nodeless instruments, with their citation counts — the bar is the publisher's own page.**
《广播电视人口覆盖率统计技术标准和方法》 (NRTA) has **three** citations and 《机动车注册登记工作规范》 (MPS)
**five** (Guangdong ch15 and Hunan zb15 added round 41); 《运输货物分类和代码》 (MOT), 《国家危险废物名录》 and 《危险废物贮存污染控制标准》 (MEE),
《对外承包工程管理条例》, 《旅游饭店星级的划分与评定》 (MCT) have two. **《小企业会计准则》** (财政部), named in Xi'an's zb12/zb18 (round 40), Guangdong ch12 indicators and Suzhou
zb04 (round 41) — three yearbooks now. **NEW round 41:** 《经济普查年度GDP核算方案》 / 《非经济普查年度GDP核算方案》
(NBS, Hunan zb14, first citations); 《关于统计上划分城乡的规定(试行)》 1999 and 《…暂行规定》 2006 (Guangdong
table 3-8 — NBS's page is the differently-titled 2008 规定, so neither matches).
《中国统计摘要》 has an edition year, a publisher and four naming yearbooks, still no NBS page.
**Shaanxi and Shanghai provincial instruments** — the ruling is made, the research is not.

**Five CN cities still open** — Guangzhou (Chrome-only, zTree JS viewer), Hangzhou, Chengdu,
Chongqing, Beijing. **Suzhou is WIRED as of round 41 (its zb layer). Shenzhen and Henan are IP-blocked** at
the WAF by address, not user-agent; nothing to retry on either.

**When China pauses: option E, then FR.** E's remaining pairs each need their publisher's own page
found — Bahamas' three trade products, Guatemala's *Boletín Estadístico*, Sri Lanka's *CBSL Annual
Report*, Zimbabwe's three RBZ/ZIMSTAT products, Barbados' *Report of the Accountant General*,
Tajikistan's national-accounts annual.

**Settled, do not re-raise:** the `_dropped` third shape — **the validator reads both spellings as
of 2026-09-09 and the 17 files are NOT to be rewritten** (Thomas ruled the guard should learn it);
write new notes in `source`/`target` all the same. The CN/TW/JP/KR re-grade sweep (Thomas
2026-09-08: *"that's a lot of time for B/C's. forget that."*); a first-party zip is a direct read,
not a capped route; a table NOTE naming an instrument by title IS a citation and grades A, but a
table ROW alone is not; a target title broken across a two-column line break in all three pdftotext
readings still grades A; bulk-diffing stored quotes against cached windows (~60% false positives).
**Refused three times now and there will not be a fourth: a bare 《三次产业划分规定》 with no year**
— NBS publishes two candidate pages, and Jilin's, the national zb03's and now Xi'an's zb03 have all
been declined on it. Yunnan names no industrial-classification EDITION — the ordinary §7a refusal,
recorded `no-document`. Xizang publishes no yearbook at all and its 统计年鉴 link is a commented-out
template placeholder. **Shanghai's bare 《国际收支手册》 does not reach `imf-bpm6`** — named by title
and publisher with no edition, the generic-COICOP refusal again. **An ISIC sentence inside a
yearbook's GB/T 4754 explanation is NOT a yearbook→ISIC edge** — its subject is the standard, the
edge already exists first-party off GB/T 4754's own 前言, and it has now been refused for Hubei,
Shanghai and Shandong. Also refused with reasons in the data or the `playbook/` files: the COICOP
edges for Morocco/Tunisia/Iraq, the e-GDDS wiring todo (all 34 countries), India's NSDP, the GFSR,
the ICLS class, the non-ASCII-hyphen sweep, DGDDI's monthly bulletin, the stale-cache B sweep,
Korea's and Estonia's NSDP, the null-ComplianceDate class, the DE round-2 EVS / Bundesbank / BaFin
refusals. A country carrying both a REGISTER and a SELF-DECLARED tier edge keeps both.

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
