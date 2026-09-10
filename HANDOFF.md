# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep §1–§3 to state and pointers; §4 is fixed and verbatim.** No changelog, no
round narrative. Finished items LEAVE (§4 step 4); the round's memory entry is their
record. The gauge is the read-cost percentage in §1, not a character count.

Last updated: 2026-09-10 (handoff 083 — the superseded state is
`archive/Previous Handoffs/handoff083.md`, copied and sha256-verified before this rewrite. **83 is
divisible by neither 5 nor 20, so no review ran.** Next 5 is 085; **next 20 is 100, which is also the first
archive crossing of a hundred** and the only condition that triggers step 5b's past-sweeps recap question.
Written after round 41, the device shell being down for the whole session — every file went stage →
container sandbox → `device_commit_files`, so mtimes on disk are the commit's, not the edit's.)

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
| **anything China** (the live programme) | `notes/china-progress.md` (31.1k) — the worklist, rows kept crossed off. **Split 2026-09-09**: the method moved to `notes/china-method-2026-09-09.md` (26.4k) — portals, the redirect lesson, the yearbook shapes, the extraction traps — and you open it when you are about to fetch, not to see where a round got to. Recipes underneath both: `notes/techniques-cn-yearbooks-2026-09-08.md` |
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

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 7.2% of its context before he types a prompt, a
renderer round 5.7%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 19.3k + CORPUS index 25.5k + PLAYBOOK 11.5k + CLAUDE 1.5k | 57.8k | 14.4k | **7.2%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 45.8k | 11.5k | **5.7%** |
| *was, after round 40 (handoff 082 + one mid-round edit)* | *62.8k / 50.0k* | *15.7k / 12.5k* | *7.9% / 6.3%* |
| *was, after round 39* | *58.4k / 49.1k* | *14.6k / 12.3k* | *7.3% / 6.1%* |
| *was, after round 37* | *50.9k / 46.2k* | *12.7k / 11.6k* | *6.4% / 5.8%* |

**Handoff 083: down 0.7pp / 0.6pp, all of it in this file (24.3k → 19.3k) — the round-40 five-point narrative
and round 41's own mid-round block both left §2 for memory, and §3's [Thomas] emptied.** `PLAYBOOK-CORPUS.md`
is flat at 25.5k: round 41 added two §7 lines and cut the four "what this would remove" ledger paragraphs
that had accumulated in its §2, and now carries one ledger paragraph instead. It is still the largest
always-read file and nothing sweeps a playbook (`PLAYBOOK.md` §1); its §2 remains the only prose section
of the 2026-09-09 restructure and is where the next cut goes. Keep this section to the table and one paragraph.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k, hosts
5.7k; handoff procedure 9.5k; standing-issues 7.9k; **China worklist 31.1k** (grew 4k in round 41 — its
Guangdong and Suzhou rows now carry a layer inventory each — and `china-method-2026-09-09.md` 26.4k).
Rounds 31–41 opened at most one `playbook/` file each and missed nothing; the routing holds.

## 2. Current state

Corpus **3,621 reports / 3,237 dependencies**. **1,224 A · 1,402 B · 611 C**, A-share 37.8%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **41**,
2026-09-10 (data dated 2026-09-09). **972 nodes have zero edges** — CN is 27 of them; Suzhou and
`cn-statistics-law` both left the orphan list this round.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox note: there is no `package-lock.json` on disk, so `npm ci` cannot run;
`npm install --legacy-peer-deps` is what installs — the fiber/react peer range refuses a plain install.)*

**THE LIVE PROGRAMME IS CHINA, AND ITS SEAM IS DEPTH: a layer nobody fetched.** Three rounds running
(38, 40, 41) every edge came from a file listed in an index that an earlier round had opened and not
downloaded. Round 41 proved it is not a frameset quirk: Guangdong's first-party ZIP holds an
`indicators.html` (主要统计指标解释) in every chapter directory beside the `brief-description.html` four
rounds had read, plus per-table notes (Guangdong 4 → 12 edges); Suzhou's `left.htm` lists 19 `zbNN.pdf`
beside the 20 image-only `smNN.pdf` round 31 read, and "read and empty" was a verdict on one layer
(Suzhou 0 → 3). **The check is mechanical: list the index, diff against what was fetched.** Where each
yearbook stands is `notes/china-progress.md` → "Two-layer sweep status".

**Two rulings made 2026-09-10, both applied:** (1) 《三次产业划分规定》 is ONE node,
`cn-nbs-three-sector-division-2012` — the 2012 instrument in its 2018-revised state (国统设管函〔2018〕74号
is a revising notice, not an edition; NBS never retitled it). A DATED citation reaches it (Guangdong's
2018年修订的); a bare 《三次产业划分规定》 still does not (national zb03, Jilin zbjs2, Xi'an zb03, Hunan zb02
stay refused). (2) A yearbook DEFINING a series' unit under 《中华人民共和国统计法》 is a `legal_basis`
edge (Suzhou zb14 → `cn-statistics-law`); a bureau REPORTING legal-publicity work about the law is not
(round 40's Shandong refusal stands). Both are now `PLAYBOOK-CORPUS.md` §7 lines. The 统计法 sentence was
swept the same day: national zb06, Shandong zb10, Xi'an zb08 define 调查户 without citing the law — the
wording is Suzhou's own, one edge so far.

**The third `_dropped` shape has now bitten twice in two rounds** (Xi'an → GB/T 4754 in round 40, Suzhou
→ GB/T 4754 in round 41): a `report_id`/`candidate_target` "NO EDGE" note for a pair just minted, invisible
to `validate`, caught only by the rule-14 hand check. Both rewritten RESOLVED in place. Any round that mints
against a former "read and empty" verdict must grep that shape by hand.

**Pointers still live from rounds 38–40** (narrative in memory): the national/Shandong/Xi'an `left.htm`
`zb` layers are swept, Fujian's is unextractable in both layers (settled); 《关于工资总额组成的规定》 is
国家统计局令第1号 — **check the issuing form before deciding whose site to search**; the THIRD NBS listing
is `https://www.stats.gov.cn/zs/flfg/tjlydnfghflfg/` (法规), and its `zdgqglpctl/` sub-section holds all
three census 条例 (农业 minted round 41, 经济/人口 still need a citing document); the 国家统计标准 listing
`/sj/tjbz/gjtjbz/` is paginated `index_1.html`, `index_2.html` — page one is not the listing; Shanghai's
年定报制度目录 `https://tjj.sh.gov.cn/ndbzdml/index.html` is where provincial printings of NBS
instruments live, covers settle authorship, and **the two trade hubs' node URLs are Shanghai's and move if
an NBS page turns up**.

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

**Empty.**

### [Agent]

**Start here: finish the two-layer sweep — it has paid on six of six yearbooks re-read.**

1. **Nanjing, Jilin, Jiangsu, Hubei, Yunnan — list each one's index and fetch what was never
   fetched.** What each index lists, as far as it is known, is in `notes/china-progress.md` → "Two-layer
   sweep status" (Nanjing: flat HTML index, per-chapter pages unopened; Jilin: `ml/` dir, re-fetch
   `njmlc.htm` over https; Jiangsu: per-table pages under `/2025/njNN/`; Hubei and Yunnan: the xlsx table
   notes inside the zips). Wuhan is one PDF, exempt.
2. **Guangdong's `indicators.html` layer was swept for 《》 titles only.** 24 chapters of definitions may
   name instruments without brackets (按…制度, 依据…办法). The zip is known and 21.5 MB — fetch with `curl -C -`.
3. **《全国经济普查条例》 and 《全国人口普查条例》 have NBS pages** (`/zs/flfg/zdgqglpctl/`) and the
   precedent is set (农业 minted round 41 off Guangdong ch11's 根据《全国农业普查条例》…做了调整). They need a
   citing document: the CSY's and Guangdong's population/economic-census chapters are where to look.
4. **Does any other provincial bureau publish a 年定报制度目录?** Shanghai's sits beside 统计制度 in its
   nav. If Shandong, Jiangsu or Guangdong expose one, provincial instruments stop being a hunt.

**Still open from round 39, unchanged — hosts, not documents.**

- **Beijing, on the `nj.` host** — `https://nj.tjj.beijing.gov.cn/nj/main/2025-tjnj/zk/indexch.htm`,
  frameset shape. Four failures across two rounds (503/000 from the container, no `.gov.cn` egress from
  the device VM). The path is not in question; try Chrome on another day.
- **Zhejiang, Sichuan, Guizhou, Chongqing — three routes each, nothing.** Do not re-probe as a batch
  without a new route.
- **Hainan** — `https://www.hainan.gov.cn/hainan/tjnj/list3.shtml`. One more retry, then drop it.
- **The 15 nodeless provinces**, yield curve flattened. Hebei (74M), Anhui (61M), Guangxi (50M) and
  Jiangxi (45M) are the only ones worth a targeted look.
- **Shanghai's table notes.** 558 table pages; C0101's note names a municipal provider in the first
  one read. Chapter notes are swept; table notes are not.
- **`zb10.pdf` and `zb27.pdf` of the national yearbook are unread** — a corrupt xref and a 404.

**Nodeless instruments, with citation counts — the bar is the publisher's own page.**
《机动车注册登记工作规范》 (MPS) **five**; 《广播电视人口覆盖率统计技术标准和方法》 (NRTA) three; 《小企业会计准则》
(财政部) three yearbooks (Xi'an, Guangdong, Suzhou); 《旅游饭店星级的划分与评定》 (MCT) three; 《运输货物分类和代码》
(MOT) three; 《国家危险废物名录》 and 《危险废物贮存污染控制标准》 (MEE), 《对外承包工程管理条例》 two each.
**New round 41, one citation each:** 《经济普查年度GDP核算方案》 and 《非经济普查年度GDP核算方案》 (NBS, Hunan
zb14); 《关于统计上划分城乡的规定(试行)》 1999 and 《…暂行规定》 2006 (Guangdong table 3-8 — NBS's page is the
differently-titled 2008 规定, so neither matches; compare characters, not eyes). 《中国统计摘要》 has an edition
year, a publisher and five naming yearbooks, still no NBS page. **Shaanxi and Shanghai provincial
instruments** — the ruling is made, the research is not.

**Five CN cities still open** — Guangzhou (Chrome-only, zTree JS viewer), Hangzhou, Chengdu,
Chongqing, Beijing. **Suzhou is wired (3 edges, its zb layer). Shenzhen and Henan are IP-blocked** at
the WAF by address, not user-agent; nothing to retry on either.

**When China pauses: option E, then FR.** E's remaining pairs each need their publisher's own page
found — Bahamas' three trade products, Guatemala's *Boletín Estadístico*, Sri Lanka's *CBSL Annual
Report*, Zimbabwe's three RBZ/ZIMSTAT products, Barbados' *Report of the Accountant General*,
Tajikistan's national-accounts annual.

**Settled, do not re-raise:** the `_dropped` third shape — **the validator reads both spellings as
of 2026-09-09 and the 17 files are NOT to be rewritten**; write new notes in `source`/`target` all the
same. The CN/TW/JP/KR re-grade sweep (Thomas 2026-09-08: *"that's a lot of time for B/C's. forget that."*);
a first-party zip is a direct read, not a capped route; a table NOTE naming an instrument by title IS a
citation and grades A, but a table ROW alone is not; a target title broken across a two-column line break
in all three pdftotext readings still grades A; bulk-diffing stored quotes against cached windows (~60%
false positives). **A bare 《三次产业划分规定》 with no year stays refused** — the node now exists and a bare
citation still cannot say whether it means the 2012 text or the 2018-revised state; four yearbooks have
been declined on it. Yunnan names no industrial-classification EDITION — the ordinary §7a refusal.
Xizang publishes no yearbook at all. **Shanghai's bare 《国际收支手册》 does not reach `imf-bpm6`.** **An
ISIC sentence inside a yearbook's GB/T 4754 explanation is NOT a yearbook→ISIC edge** — refused for Hubei,
Shanghai, Shandong and Guangdong. Also refused with reasons in the data or the `playbook/` files: the
COICOP edges for Morocco/Tunisia/Iraq, the e-GDDS wiring todo (all 34 countries), India's NSDP, the GFSR,
the ICLS class, the non-ASCII-hyphen sweep, DGDDI's monthly bulletin, the stale-cache B sweep, Korea's and
Estonia's NSDP, the null-ComplianceDate class, the DE round-2 EVS / Bundesbank / BaFin refusals. A country
carrying both a REGISTER and a SELF-DECLARED tier edge keeps both.

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
