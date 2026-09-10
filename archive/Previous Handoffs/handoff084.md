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

Last updated: 2026-09-10 (handoff 083, §2/§3 edited mid-round after round 42 — not a handoff, no archive; the superseded state is
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

Corpus **3,628 reports / 3,266 dependencies**. **1,250 A · 1,404 B · 612 C**, A-share 38.3%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **42**,
2026-09-10. **ORPHANS: recount** — `validate` prints the ISOLATED block; CN is 27 of them, unchanged
(round 42 added no nodeless report).

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox note: there is no `package-lock.json` on disk, so `npm ci` cannot run;
`npm install --legacy-peer-deps` is what installs — the fiber/react peer range refuses a plain install.)*

**THE LIVE PROGRAMME IS CHINA. THE TWO-LAYER SWEEP IS FINISHED (round 42) AND THE SEAM HAS MOVED TO
PUBLISHER PAGES.** Round 42 closed the sweep on its last five yearbooks (Nanjing, Jilin, Jiangsu, Hubei,
Yunnan): 8 edges, all to NBS instruments already in the corpus, from Nanjing's and Jiangsu's per-chapter
主要统计指标解释 pages and Hubei's spreadsheet table notes; Jilin (224 table pages, 20 divider images) and
Yunnan (table layer) settled empty. Every reachable yearbook now has every index-listed layer read or
recorded unreadable — `notes/china-progress.md` → "Two-layer sweep status". **What paid better was the
publisher hunt Thomas asked for instead of one-node grinding: 7 nodes, 21 edges in one round**, because
**NBS hosts the full text of every departmental survey system it approves** at
`https://www.stats.gov.cn/fw/bmdcxmsp/bmzd/` (512 entries, 36 pages — a FOURTH NBS listing, in
`notes/china-method-2026-09-09.md`) and its 统计出版物 listing carries 中国统计摘要. Minted: 小企业会计准则
(MOF), 运输货物分类和代码 (MOT, JT/T 19-2001), 全国文化文物和旅游统计调查制度 (MCT), 市场监管统计调查制度 (SAMR),
外商投资统计调查制度 (MOFCOM), 对外承包工程管理条例 (State Council, legal_basis ×3), 中国统计摘要 (NBS, ×6).
Slice `cn-round42-2026-09-10.json`; its four `_dropped` notes carry the sweep record, the listing, the
still-nodeless list and the grader change.

**Three things for Thomas to glance at, none blocking (round 42):** (1) Jiangsu and Nanjing write
《全国文物文化和旅游统计调查制度》 for the publisher's 《全国文化文物和旅游统计调查制度》 — the transposed form is a
title alias on the node on the `hs` 和/及 precedent and two A edges rest on it; strike the alias and they go.
(2) Two grader changes in `scripts/grade-evidence.ts`: a third zip pass reads xlsx/xls (Hubei's zip is xls-only)
and an archive is resumed with `curl -C -` up to three times, ceiling 600 s (Guangdong's host cut the zip at
19,410,770 bytes three runs running — 14 live A edges would have re-graded C). tsc clean, selftest 76/76.
(3) Three new edges are B/C on mechanics, reasons in their bases: a space inside a CJK title and a
line-broken title defeat `namesTarget` (2 × B), and a real 174-character page trips the 200-character wall
gate (1 × C). A normaliser/gate question for the tooling lane, not a corpus one.

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

**Start here: the publisher hunt pays 3-6 edges per node found; the sweep is done.**

1. **《旅游饭店星级的划分与评定》 (GB/T 14308-2010) — page found, not wired.** SAMR's 全国标准信息公共服务平台
   entry `https://std.samr.gov.cn/gb/search/gbDetailed?id=8CC164ED81FAC57EE05397BE0A0A9BED`. Three citing
   documents already known: national zb17.pdf, Suzhou zb16.pdf, Xi'an (check which zb). One pass.
2. **Grep NBS's 部门统计调查制度 listing against every 《…统计调查制度》 a yearbook has named** — the 512-row
   title list is saved as `Claude outputs/cn-round42-2026-09-10/bmzd_all.tsv`. Known unwired hits with a
   citing yearbook still to find: 教育事业综合统计调查制度, 民政事业统计调查制度, 海关统计调查制度,
   全国卫生健康监督统计调查制度, 交通运输综合统计调查制度. Also 《生态环境统计调查制度》 (Jiangsu nj0913) is NOT on
   it — MEE's own site.
3. **《国家危险废物名录》 (MEE)** — national zb08 and Jiangsu nj0914; MEE publishes the 2021 edition. One node,
   two edges.
4. **Guangdong's `indicators.html` layer was swept for 《》 titles only.** 24 chapters of definitions may
   name instruments without brackets (按…制度, 依据…办法). The zip is known and 21.5 MB — fetch with `curl -C -`.
5. **《全国经济普查条例》 and 《全国人口普查条例》 have NBS pages** (`/zs/flfg/zdgqglpctl/`) and the
   precedent is set (农业 minted round 41 off Guangdong ch11's 根据《全国农业普查条例》…做了调整). They need a
   citing document: the CSY's and Guangdong's population/economic-census chapters are where to look.
6. **Does any other provincial bureau publish a 年定报制度目录?** Shanghai's sits beside 统计制度 in its
   nav. If Shandong, Jiangsu or Guangdong expose one, provincial instruments stop being a hunt.
7. **《企业会计准则》 (MOF) — scope question first.** Suzhou, Guangdong and Xi'an name it beside 小企业会计准则;
   the MOF instrument is 企业会计准则——基本准则 (令第33号, amended 令第76号) plus 42 specific standards, and a
   bare 《企业会计准则》 names the system. Thomas to say whether the basic standard is the node.

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
《机动车注册登记工作规范》 (MPS) **seven** — and REFUSED for now: mps.gov.cn carries only the retitled 2020
successor 《机动车登记工作规范》 (注册 dropped), the 2008 text the yearbooks name is reprinted on provincial and
municipal government sites only. 《广播电视人口覆盖率统计技术标准和方法》 (NRTA) three — not the departmental
listing's 广播电视和网络视听统计调查制度. 《国家危险废物名录》 (MEE) two, 《危险废物贮存污染控制标准》 (MEE) one.
《关于统计上划分城乡的规定(试行)》 1999 **three** (Guangdong, Yunnan, Nanjing) and 《…暂行规定》 2006 one — NBS's
page is the differently-titled 2008 规定, so neither matches; compare characters, not eyes. One citation each:
《经济普查年度GDP核算方案》 and 《非经济普查年度GDP核算方案》 (NBS, Hunan zb14); 《生态环境统计调查制度》 (MEE, Jiangsu);
《公路工程技术标准》 (MOT, two vintages). *(Minted round 42 and gone from this list: 小企业会计准则, 运输货物分类和代码,
对外承包工程管理条例, 中国统计摘要, and the three departmental systems.)* **Shaanxi and Shanghai provincial
instruments** — the ruling is made, the research is not.

**Five CN cities still open** — Guangzhou (Chrome-only, zTree JS viewer), Hangzhou, Chengdu,
Chongqing, Beijing. **Suzhou is wired (4 edges), Nanjing 8, Xi'an 5, Wuhan 4. Shenzhen and Henan are IP-blocked** at
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
