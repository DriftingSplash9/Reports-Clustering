# China — progress tracker

**A live worklist, not a rule file.** Opened 2026-09-08 on Thomas's instruction: *"create a
file for china and store the list of provinces, cross them off but keep on the list so we can
track where and what is left."* Rows are **never deleted** — a finished row keeps its result so
a later round can see what was done and why. The method and its traps are
`notes/techniques-cn-yearbooks-2026-09-08.md`; the rules are `PLAYBOOK-CORPUS.md` §6/§7. This
file is only **where we are**.

Status: `[x]` wired · `[~]` node exists, not wired · `[ ]` no node yet · `[!]` blocked, reason on the row

Probe column = one curl from the CLOUD CONTAINER on **2026-09-08**, and it is a claim about one
machine on one day. `403`/`503` are usually a WAF refusing curl's UA, not a dead site — Chrome
often walks straight through. **Re-probe, never believe this column.**

---

## Provincial-level divisions (31 + XPCC)

| ✔ | Division | Type | Node | Bureau host | Probe | Notes / result |
|---|---|---|---|---|---|---|
| `[x]` | 江苏 Jiangsu | province | `cn-js-statistical-yearbook` | tj.jiangsu.gov.cn | 200 (http; https resets) | **12 edges after round 42 — chapter notes (round 30), ch11 (round 38), and the SECOND LAYER round 42: 18 of 22 chapter pages end with a 主要统计指标解释 link (`njNN/njNNMM.htm`, the last link on each chapter page) and every table page was read (359 pages). Done, all layers.** Round 42 took: nj0322 → 关于工资总额组成的规定 (with the 1990 一号令), nj1106 → 市场主体统计分类, nj1412 → 全国文化文物和旅游统计调查制度 (spelled 文物文化 — alias, see the node), nj0801 → 市场监管统计调查制度 AND 外商投资统计调查制度(2022) (both minted round 42), nj2100 → 中国统计摘要 (minted round 42). Still nodeless from the sweep: 《生态环境统计调查制度》 (nj0913), ~~《国家危险废物名录》 (nj0914)~~ (node exists since round 43 as the 2016 edition; nj0914's citation is BARE and refused on the edition ground — four editions exist), 《外商投资法》, 《公路工程技术标准JTJ01-88》 (nj1316). Chapter 8's 按HS统计 is a two-letter acronym — refused. Earlier: 编者说明 item 五 → GB/T 4754; ch3 → wage system, ch10 → agriculture system, ch12 → construction system. Also names, with no node to take them: SITC (ch8), 《中国统计摘要2025》 (ch21), 《批发和零售业统计报表制度》+《住宿和餐饮业统计报表制度》 (ch14), 《统计上大中小微型企业划分办法（2017）》 (ch11 — **node minted round 37, wired round 38**) and 《农业产值与增加值核算统计报表制度》 (ch11/ch10 — the latter is NOT NBS's 农业产值和价格综合…, different title, do not conflate). Browse at `/2025/njNN.htm`, chapter notes at `/2025/njNN/njNN00.htm`. |
| `[x]` | 广东 Guangdong | province | `cn-gd-statistical-yearbook` | stats.gd.gov.cn | 200 | **12 edges, all A** — 4 off the CD-edition zip's `brief-description.html` (rounds ≤38, §7b ruling), **8 more in round 41** (incl. table 2-2's DATED 三次产业划分规定 citation → `cn-nbs-three-sector-division-2012`, node minted round 41 on Thomas's one-node ruling). **ROUND 41: THE ZIP HAS A SECOND LAYER NOBODY OPENED.** Every `directory/NN/` holds an `indicators.html` (主要统计指标解释) beside the `brief-description.html` earlier rounds read, plus per-table `html/NN-MM.htm` with table NOTES. Wired from them: 关于工资总额组成的规定 (ch04 indicators, names the 1990 令 number), 市场主体统计分类 (table 1-3 note + ch01 indicators, 国统字〔2023〕14号, named in 32 files), 中国统计年鉴2025 (table 1-5 note: 全国数据来自 — first provincial→national yearbook edge), 大中小微型企业划分办法 2017 (ch12 brief-description, second half of the GB/T 4754 sentence), both trade hubs (ch16, ch17 — both say 国家统计局), **《全国农业普查条例》 (ch11 — node MINTED round 41)**. **FETCH TRAP: the zip is 21,520,465 bytes and plain curl truncates it at ~15.2 MB silently** — unzip then says 'End-of-central-directory signature not found'; `curl -C -` resumes it. Browse host `tjnj.gdstats.gov.cn:8080` unreachable from every network tried — use the zip. Refused with reasons in `cn-round41`: 划分城乡 ×2 (1999/2006 titles, NBS page is the 2008 one), ISIC (settled), energy table names (agency-only). **Round 42: ch12 indicators → 小企业会计准则 and ch24 简要说明 → 中国统计摘要 (both minted) — 14 edges.** Nodeless leads (small-enterprise standard and the Abstract now minted; ~~企业会计准则~~ **minted round 43, Thomas ruled, wired**): 机动车注册登记工作规范, 广东省财政总决算报表, 全国报纸出版统计调查制度(2019), 2014年社会服务业统计制度. |
| `[~]` | 北京 Beijing | municipality | `cn-bj-statistical-yearbook` | tjj.beijing.gov.cn | 000 (bureau **200 in Chrome**, round 39) | Node is `provincial` level, correctly. **THE YEARBOOK IS ON A SEPARATE HOSTNAME — that is the round-39 finding.** `/tjsj_31433/tjnj_31441/bjtjnj_31442/` redirects to **`https://nj.tjj.beijing.gov.cn/nj/main/2025-tjnj/zk/indexch.htm`**, the standard frameset shape. Chrome loaded the bureau site and resolved the redirect, then `nj.tjj.beijing.gov.cn` itself timed out twice (ERR_CONNECTION_TIMED_OUT); the container gets 503 over http and 000 over https. **The path is now known and is not the problem** — retry the `nj.` host on another day and the frameset should read like Shandong's. |
| `[x]` | 上海 Shanghai | municipality | `cn-sh-statistical-yearbook` | tjj.sh.gov.cn | 200 | **5 edges, all A. All 216 chapter notes swept (round 39) — done, and it is the richest provincial yearbook found so far.** Node is `provincial` level, correctly. Section `/tjnj/index.html`, editions to 2004; the 2025 landing page is a shell whose **iframe** points at `/tjnj/tjnj2025.htm`, the real TOC. 编者说明 at `2025tjnj/BZSM.html`; chapter notes at **`2025tjnj/ZBHTML/CNNNN.htm` — UPPERCASE, and the publisher's own TOC writes it lowercase**, which 404s (with HTTP 200). Wired: GB/T 4754 (C0003), 劳动工资 (C0002), 大中小微型企业划分办法 (C0012), 建筑业 (C0013), 市场主体统计分类 (编者说明). ~~Refused because the sentence names 上海市统计局制定的~~ — **ROUND 40 OVERTURNED THAT AND BOTH ARE NOW WIRED TO THE NBS NODES**: 固定资产投资 (C0010) and 房地产开发 (C0018). The instruments' own covers, in Shanghai's 年定报制度目录, read 国家统计局制定 / 上海市统计局补充、印制 — as do 建筑业's and 劳动工资's, which round 39 wired. Thomas ruled 2026-09-09. **AND THE CATALOGUE IS THE REAL FIND: `https://tjj.sh.gov.cn/ndbzdml/index.html`** — 20 instruments, one landing page and one first-party PDF each. It is where 《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》 were finally found (entries 5 and 7), **both minted round 40**. Entries whose title carries 上海市 say 上海市统计局制定/印制 with no NBS line — that is how a genuinely provincial instrument reads. Shanghai also names both trade hubs at C0016, **wired round 40**, so Shanghai is now **9 edges**. **Round 42: C1505 → 运输货物分类和代码 (minted) — graded C `empty:tiny-body`: the page is a genuine 174-character one-definition page under the fetcher's 200-character wall gate; 10 edges.** |
| `[~]` | 重庆 Chongqing | municipality | `cn-cq-city-statistical-yearbook` | tjj.cq.gov.cn | 200 | **Chrome fails too (round 39).** **Mis-levelled**: node is `municipal` and id says `-city-`, but Chongqing is a province-level municipality like Beijing/Shanghai, which are `provincial`. Fix the level; leave the id (ids are cited). |
| `[~]` | 浙江 Zhejiang | province | `cn-zj-statistical-yearbook` | tjj.zj.gov.cn | 000 | Also failed in Chrome, **re-confirmed round 39** — three rounds, both routes, no answer. |
| `[x]` | 山东 Shandong | province | `cn-sd-statistical-yearbook` | tjj.shandong.gov.cn | 200 (**http ONLY** — https is connection-refused) | **2 edges, A. sm layer swept round 35; zb SECOND LAYER swept round 40 — done, both layers.** Yearbook 2025 at `/tjnj/nj2025/zk/indexch.htm`, frameset, TOC `left.htm`; **chapter notes are single-page TEXT PDFs at `html/smNN.pdf`** while all 387 tables are `.jpg` scans and 编辑说明 is `html/note.jpg` (image → refused, Suzhou precedent). Only 4 of 25 chapters name a 《…》 at all: sm04 → 《劳动工资统计报表制度》 (**wired**), sm18 → 《批发和零售业统计报表制度》+《住宿和餐饮业统计报表制度》 (no nodes — third yearbook to name them), sm23 → 《中国统计摘要 2025》 (**wired round 42, graded B — the title breaks across a line in every rendering**), sm24 → 《国际统计年鉴 2024》 (no node). **建筑业 (sm15) and 农业 (sm13) are BOTH agency-level here** — see the method note below. **ROUND 40: left.htm ALSO lists 21 `html/zbNN.pdf` (主要统计指标解释) plus three `html/w25NN.pdf`, and round 35 fetched none of them.** zb01 carries the GB/T 4754 adoption sentence with the number (**wired round 40**); zb17 names 《机动车注册登记工作规范》 (no node, third citation); zb02's 《三次产业划分规定》 is bare and refused again; zb01's ISIC sentence is about GB/T 4754, not the yearbook, and that edge is already live first-party. w2501-w2503 are 山东统计事业发展综述, an administrative work summary — its 《统计法》 mention is legal-publicity activity, not a dependency. |
| `[!]` | 河南 Henan | province | `cn-ha-statistical-yearbook` | tjj.henan.gov.cn | **403 — IP-BLOCKED** | 99M people. **Round 35: blocked on all three routes** — 403 to the cloud container, 403 over BOTH http and https from the device VM, and a 'Sorry, you have been blocked' interstitial **naming the requesting IP** in Thomas's own Chrome. Block is on the ADDRESS, not the user-agent (the Shenzhen shape). Sub-paths blocked identically (`/tjnj/`, `/tjfw/tjnj/`), so it is not a root-only rule. NBS's 地方统计网站 portal lists no alternate bureau host — only `hazd.stats.gov.cn`, the separate NBS survey office in Henan, which returned 503. Re-probe before believing this. |
| `[~]` | 四川 Sichuan | province | `cn-sc-statistical-yearbook` | tjj.sc.gov.cn | 503 (000 + **Chrome fails**, round 39) | 84M people. |
| `[~]` | 贵州 Guizhou | province | `cn-gz-statistical-yearbook` | stjj.guizhou.gov.cn | 503 (000 + **Chrome fails**, round 39) | Note host is `stjj.`, not `tjj.`. |
| `[ ]` | 河北 Hebei | province | — | tjj.hebei.gov.cn | 503 | 74M. Node needed. |
| `[x]` | 湖南 Hunan | province | `cn-hn-statistical-yearbook` | **222.240.193.190** (NOT tjj.hunan.gov.cn) | 200 | **Minted + 1 edge, A (round 36).** `-> cn-gbt-4754-2017` off zb01, which names 《国民经济行业分类》（GB/T4754-2017） with the number. **THE YEARBOOK IS ON A BARE IP**: nothing under the bureau host serves it; its landing page `/hntj/tjfx/hntjnj/hntjnjwlb/202601/t20260119_33896874.html` CLIENT-SIDE navigates a browser to `http://222.240.193.190/2025tjnj/zk/indexch.htm` (reproduced twice in Chrome; no meta/JS refresh in the HTML curl sees). Frameset shape; **chapter notes are `html/zbNN.pdf` (主要统计指标解释), not `smNN.pdf`** — glob, don't assume. Series listing with 17 editions: `/hntj/tjfx/hntjnj/hntjnjwlb/index.html`. **ROUND 41: all 19 zbNN.pdf now read (round 36 read zb01 only) — no new edge.** zb02 names GB/T 4754 with number (same target as zb01, already live) plus a BARE 《三次产业划分规定》 (refused, fourth occurrence); zb14 names 《经济普查年度GDP核算方案》 and 《非经济普查年度GDP核算方案》 (NBS, nodeless, first citations); zb15 names 机动车注册登记工作规范 (still nodeless) and 运输货物分类和代码 (**wired round 42**, node minted off MOT's standards platform). `te.pdf`/`gb.pdf` are 特载/概况, nothing named. Layer settled. |
| `[ ]` | 安徽 Anhui | province | — | tjj.ah.gov.cn | 403 | 61M. Node needed. |
| `[x]` | 湖北 Hubei | province | `cn-hb-statistical-yearbook` | tjj.hubei.gov.cn | 200 (http only) | **5 edges after round 42: the xls/xlsx TABLE layer (369 workbooks) read cell by cell — 0106 → 中国统计年鉴2025, 0302 → 市场主体统计分类, 1306 → 大中小微型企业划分办法(2017), 附录101 → 中国统计摘要 (minted round 42); plus ch5's docx → 对外承包工程管理条例 (minted round 42, legal_basis). Done, both layers.** The table notes are readable to the grader only since round 42's spreadsheet pass (the zip has no PDF). Earlier: Minted + 1 edge, A (round 37). `-> cn-gbt-4754-2017` off the 综合 chapter's 指标解释. **Round 36's 71-byte shell was a JS REDIRECT, not an empty page** — its body is `window.location = "./qstjnj/"` and that directory lists 15 editions. Yearbook is a first-party **zip** (2025: `/tjsj/sjkscx/tjnj/qstjnj/202601/P020260114553839802144.zip`, 6.4MB) of per-chapter `.xls` tables plus one `第N章指标解释.docx` per chapter (21). **No 编者说明 at all.** Ch1 carries the standard GB/T 4754 sentence; ch5/16/19/20/21 name only licences and other ministries' standards. Ch9 is a legacy binary `.doc` — convert with `soffice --convert-to docx`, not to txt (txt loses the CJK). |
| `[ ]` | 广西 Guangxi | autonomous region | — | tjj.gxzf.gov.cn | 000 | 50M. Node needed. |
| `[x]` | 云南 Yunnan | province | `cn-yn-statistical-yearbook` | stats.yn.gov.cn | 200 | **4 edges after round 42: the xlsx table layer (18 workbooks) read cell by cell — 1-4-1/12-1 → 全国文化文物和旅游统计调查制度 and 1-6 → 中国统计摘要 (both minted round 42) are all it adds. Done, both layers.** Its 1999 《关于统计上划分城乡的规定（试行）》 citation (15-1) stays refused (2008-title ground). Earlier: Minted + 2 edges, A (round 37). `-> cn-nbs-sme-classification-2017` (ch8 指标解释) and `-> cn-nbs-market-entity-classification` (note under table 1-12). **The yearbook is under the 政府信息公开 tree, not the homepage**: `/zwgk/zfxxgk/fdzdgknr/tjsj/tjnj/`, editions back to 2010; 2025 landing `202605/t20260507_3052633.html` → zip `P020260723540390408353.zip` (10.7MB). Inside: the whole 512-page book as one PDF, a 目录 PDF, per-chapter `.xlsx`, and per-chapter 主要指标解释 `.docx` in **Chinese AND English** (18 chapters). **Names no GB/T 4754 edition** — its agriculture note says only 执行新的国民经济行业分类标准, refused §7a. Table notes are bilingual and productive; sweep them as well as the chapter notes. |
| `[ ]` | 江西 Jiangxi | province | — | tjj.jiangxi.gov.cn | 503 | 45M. Node needed. |
| `[ ]` | 辽宁 Liaoning | province | — | tjj.ln.gov.cn | 000 | 42M. Node needed. |
| `[~]` | 福建 Fujian | province | `cn-fj-statistical-yearbook` | tjj.fujian.gov.cn | 200 | **NODE MINTED round 37, still no edges — the text is unextractable and that is settled.** 福建统计年鉴2025 at `/tongjinianjian/dz2025/zk/indexch.htm`, Shandong's frameset shape, 21 notes at `html/smNN.pdf`. All 21 yield zero characters: Type1 fonts, no `/ToUnicode` anywhere. OCR only (caps B). Do not re-probe with another parser; the node exists so the publication is on the graph. **ROUND 40 checked the OTHER layer too — left.htm lists 19 `html/zbNN.pdf` beside the 21 sm — and it is unextractable in the same way:** 1-page iText 7.1.2 wrappers with an EMPTY font table and an empty image list, zero characters from all five tested. Both layers are now settled; nothing left here. |
| `[ ]` | 陕西 Shaanxi | province | — | tjj.shaanxi.gov.cn | 503 | 39M. Node needed. |
| `[ ]` | 黑龙江 Heilongjiang | province | — | tjj.hlj.gov.cn | 000 | 31M. Node needed. |
| `[ ]` | 山西 Shanxi | province | — | tjj.shanxi.gov.cn | 503 | 34M. Node needed. Don't confuse with 陕西 Shaanxi. |
| `[ ]` | 贵…／甘肃 Gansu | province | — | tjj.gansu.gov.cn | 000 | 25M. Node needed. |
| `[ ]` | 内蒙古 Inner Mongolia | autonomous region | — | tj.nmg.gov.cn | 403 | 24M. Node needed. Host is `tj.`, not `tjj.`. |
| `[~]` | 新疆 Xinjiang | autonomous region | `cn-xj-statistical-yearbook` | tjj.xinjiang.gov.cn | 200 | **NODE MINTED round 37, no edges available.** Found behind a **JS redirect shell**: `/tjj/tjsj/jump.shtml` is 954 bytes carrying `<p id="url">/tjj/zhhvgh/list_nj1.shtml</p>` in a `display:none` div. That is the 综合 chapter of the yearbook; 22 chapter sections in all, each an HTML listing of individual tables. **No 简要说明 or 指标解释 page under any chapter — tables only**, so nothing names an instrument. Newest edition online is **2021** (pages dated 2022-03); 统计书刊 section `/tjj/tjsk/ist.shtml` lists nothing. |
| `[x]` | 吉林 Jilin | province | `cn-jl-statistical-yearbook` | tjj.jl.gov.cn | 200 (https; http 302s) | **SETTLED round 42, three layers, 2 edges: `njmlc.htm` lists 224 `../html/N-N.html` table pages, 20 `fpN.html` and 19 `zbjsN.html`. All 224 table pages read — 41 carry a 注, none names a 《》 title. The 20 `fp` pages are 扉页: each is one `<img src="../image/N.jpg">` of the chapter divider (number, title, 资料整理人员), read as images — no prose. Nothing left here.** Earlier: Minted + 1 edge, A (round 37). `-> cn-gbt-4754-2017` off `ml/zbjs1.html`. Yearbook section `/tjsj/tjnj/`, one directory per edition 2011-2025, **not linked from the homepage**. Shape: `2025/enter.htm` → `2025/ml/indexc.htm`, a frameset (left `njmlc.htm` TOC, right `sm.htm` = 编者说明). **Chapter notes are `ml/zbjsN.html` — a THIRD filename convention** after Shandong's `smNN.pdf` and Hunan's `zbNN.pdf`; 19 of them, ch20 (市州和县市概况) has none. Word-exported HTML: every Latin run is its own `<span>`, so cut quotes before any number. 编者说明 names nothing. Also names 《三次产业划分规定》 (zbjs2, no year — two NBS pages, do not pick one) and 《关于工资总额组成的规定》 (zbjs4, no node). |
| `[ ]` | 天津 Tianjin | municipality | — | stats.tj.gov.cn | 403 | 14M. Node needed. Host is `stats.tj.`, not `tjj.tj.`. |
| `[ ]` | 海南 Hainan | province | — | stats.hainan.gov.cn | 200 | 10M. **Round 37: bureau site has no statistical yearbook** — only 经济普查年鉴2023 at `/tjj/2023hnnj/indexce.htm` (a different publication), `/tjj/tjsu/ndsj/` empty, `/tjj/tjnj/` 302s to 404, six sibling-path guesses all 404. **THE LEAD IS THE PROVINCIAL GOVERNMENT PORTAL:** `https://www.hainan.gov.cn/hainan/tjnj/list3.shtml` carries a 统计年鉴 listing. Not read this round — 503 to the cloud container across four retries over both schemes, device VM egress does not reach `.gov.cn`, and Chrome would not hold the navigation. Start there. |
| `[ ]` | 宁夏 Ningxia | autonomous region | — | tj.nx.gov.cn | 200 | 7M. Node needed. Host is `tj.`. Corpus already has `cn-ningxia-equalization-transfer-measures` — a Ningxia node exists in another domain. |
| `[ ]` | 青海 Qinghai | province | — | tjj.qinghai.gov.cn | 412 | 6M. Node needed. 412 = precondition failed, a WAF shape. |
| `[!]` | 西藏 Tibet | autonomous region | — | tjj.xizang.gov.cn | 200 | 4M. **NO YEARBOOK SECTION EXISTS — answered round 37, not a time-out.** The homepage's 统计年鉴 is an **HTML COMMENT**: `<a href="./xxgk/tjxx/tjsj/">统计数据</a><!--<a href="javascript:;">统计年鉴</a>-->`, a leftover placeholder from the site template, which is why round 36 read it as a `javascript:;` stub. The four real sections are 最新发布 / 统计信息 / 统计数据 / 统计公报; `/xxgk/tjxx/` returns no links. Nothing to mint against on the issuing bureau's site. |
| `[ ]` | 兵团 XPCC | corps (province-level) | — | tjj.xjbt.gov.cn | 200 | Xinjiang Production & Construction Corps. Reports to NBS separately and appears in NBS tables as its own row. **Scope question before a research one** — ask before minting. |

**Not in scope as "provinces":** Hong Kong, Macau and Taiwan. The China Statistical Yearbook
carries them as appendix chapters and says outright that each runs its own statistical system
(`香港特别行政区保留其单独运作的统计系统`). Taiwan already has its own large node family
(`tw-*`). Do not fold any of the three into the CN provincial programme.

**Score after round 42 — provinces: 8 wired · 7 node-but-unwired · 15 no node yet · 2 blocked** (unchanged by rounds 40-42, which deepened yearbooks rather than adding one; round 42: Jiangsu 8 → 12, Hubei 1 → 5, Yunnan 2 → 4, Guangdong 12 → 14, Shandong 2 → 3, Hunan 1 → 2, Shanghai 9 → 10).
Wired: Jiangsu, Guangdong, Shandong, Hunan, Hubei, Yunnan, Jilin, **Shanghai**. Node but no edge:
Beijing, Chongqing, Zhejiang, Sichuan, Guizhou, **Fujian** (unextractable), **Xinjiang** (tables only).
Blocked: Henan (IP), Xizang (publishes no yearbook at all). Counted from the table above, 2026-09-09.
**Round 39 re-probed the other five node-but-unwired divisions in Thomas's own Chrome and got nothing
from any of them** — Zhejiang, Sichuan, Guizhou and Chongqing all fail in Chrome as well as to curl,
and Beijing's bureau loads but its separate yearbook host times out. So the seam that looked like
"six provinces whose notes have never been swept" is really **one that was reachable and five that
are not**, and Shanghai was the one.
**The three provinces added this round were all in round 36's 'answers a probe but nothing found' list**,
and none of them needed anything cleverer than reading a redirect body or walking one level into
政府信息公开.

**City score after round 45: 5 wired (Guangzhou 7, Nanjing 8, Xi'an 5, Suzhou 4, Wuhan 4 edges) · 1 IP-blocked (Shenzhen) · 4 still open
(Hangzhou, Chengdu, Chongqing, Beijing).** *(Guangzhou moved on 2026-09-10 — see the round-45 entry: the download page, not the zTree viewer.)* *(Read "3 wired · 1 read-and-empty (Suzhou)" from round 31 until round 41 opened Suzhou's zb layer.)*

**Round 43 (2026-09-10) — the listing grep and the leftover layers:** NBS's 512-title 部门统计调查制度 listing was matched WITHOUT 《》 against 211 re-fetched documents (national sm+zb ALL 56 — zb10/zb27 now read, nothing in them; Shandong sm+zb; Hunan zb; Suzhou zb; Xi'an zb+sm16/17; Guangdong's 47 CD pages). ONE hit in the whole set, unrecorded since round 29: national sm04 → 《人力资源和社会保障统计调查制度》 (MOHRSS, **minted**, 1 edge). The five 'known unwired' listing titles are named by no swept yearbook. **Guangdong's indicators.html unbracketed sweep: settled negative.** The extracted text of all 211 documents is kept in `Claude outputs/cn-round43-2026-09-10/yearbook-text-2026-09-10.zip` so the next grep needs no refetch (Jiangsu/Nanjing/Jilin/Shanghai/Hubei/Yunnan/Wuhan are NOT in it). Chrome extension was down; Jiangsu was read in the built-in browser pane; the container was Knownsec-blocked on tj.jiangsu.gov.cn.

**Round 45 (2026-09-10) — GUANGZHOU WIRED, and the chapter-note publications.** **The zTree viewer was never the
only route.** `tjj.gz.gov.cn` answers Chrome AND the container (the container was never tried before — four rounds
recorded "Chrome-only" from one Chrome session). Its 统计年鉴 nav goes to `/datav/admin/home/www_nj/`, a real dead
end: 43 year links, none with an href, and clicking one navigates nowhere. **But that page's own grey subtitle says
历史统计年鉴下载请访问【官网首页 > 统计业务 > 资源下载 > 统计年鉴电子资源】**, and
`/stats_newtjyw/zyxz/tjnjdzzz/` publishes one page per edition — 2025 is `content/post_10602897.html` with the
whole yearbook as a 6.6 MB zip of 367 per-table `.xls` (GBK filenames) AND as a single 34.7 MB PDF. **7 edges, all
but one A**, off both: GB/T 4754 and 市场主体统计分类 (ch11 简要说明 + 指标解释), 建筑业统计报表制度 (ch12, 国家统计局
和广东省统计局制定 — the Shanghai pattern), 住户收支与生活状况调查 (ch8, honest B — Guangzhou drops the trailing
方案), 小企业会计准则 (指标解释 【营业利润】), and from the Excel edition 统计上大中小微型企业划分办法(2017) (table
16-03 note) and 中国统计摘要 (table 19-05-1 note). **FETCH TRAP: the `/attachment/` path 503s without a Referer
header; the browse page does not.** Refused: bare 《三次产业划分规定》 (fifth yearbook on that ground) and bare
《国家危险废物名录》 (four editions). Nodeless lead: 《城市（县城）建设统计报表制度》, NOT the 和村镇建设 one.

**And the national yearbook's chapter notes name the MINISTRY PUBLICATION behind each chapter** — under
二、本篇的资料来源, in the form 详细资料（分别）见《X》（编者）. sm21 two, sm22 four, sm23 three, sm24 three, sm25
two. Twelve first-party citations, never read as a class. Wired as **`cites`, not `uses_data_from`** — the yearbook
says the detail is there, not that its figures came from there. Minted: 中国劳动统计年鉴, 中国教育经费统计年鉴,
中国医疗保障统计年鉴, plus 中国卫生健康统计年鉴 which had been a node with no edge at all since August. **Eight are
blocked only on the publisher's host** (moe/mca/cdpf/nppa/mct 000, acftu 412, nrta's stats portal a Vue shell) and
their quotes are stored — HANDOFF §3 item 1. **NBS's 统计出版物 listing is SIXTEEN pages** (`index`, `index_1` …
`index_15`, 271 entries), not the one round 42 read or the four round 44 assumed; that is where 中国第三产业统计年鉴
(three citations) and 中国基本单位统计年鉴 came from, and four publication nodes had their bare-homepage URL upgraded
to a real page. Also minted off it: 部分服务行业规模以上企业统计报表制度 (round 44 left it nodeless waiting on exactly
this publication) and, from the 国家统计标准 listing, 统计单位划分及具体处理办法 (国统字〔2011〕96号, cited by the
一套表 instrument). MOHURD's 城市（县城）和村镇建设统计调查制度 came off the 部门统计调查制度 listing, 2 edges.

**Beijing failed a FIFTH time, in Chrome. Hangzhou, Chengdu, Hebei, Chongqing, Hainan, Guangxi and Jiangxi all
failed again in both routes the same day; Anhui 403.** That set is not to be re-probed as a batch without a new route.

**Round 44 (2026-09-10) — the provincial catalogues, and the NBS attachments behind them.** HANDOFF 084 §3
item 4 asked whether Shandong, Jiangsu or Guangdong publishes a 年定报制度目录 like Shanghai's. **All three do.**
JIANGSU: `tj.jiangsu.gov.cn/col/col85333/` — 26 instruments for the 2025年报/2026定报 cycle, one landing page each
(`/art/2026/3/5/art_85333_117374xx.html`) with the WHOLE instrument attached as .doc through
`/module/download/downfile.jsp?classid=0&filename=<hash>.doc`, plus the 2024/2025 cycle beneath it. Six more than
Shanghai's 20, and the same cover grammar: 农业产值与增加值核算 and 劳动工资 read 国家统计局制定 / 江苏省统计局补充、印制;
农林牧渔业 and 一套表 read 国家统计局制定 alone; 江苏省部门综合统计报表制度 reads 江苏省统计局制定 with no NBS line and
carries 江苏省 in its title. GUANGDONG: 统计制度 splits in two — `stats.gd.gov.cn/pc/` (国家统计调查项目, one page per
year cycle, the entire 一套表统计调查制度 attached as a 1.3MB .docx) and `stats.gd.gov.cn/zxdc555/` (地方统计调查项目,
one page per provincial or municipal instrument: 广东省海洋经济统计调查制度, 广东省海洋生产总值核算制度, and a long tail
of municipal 妇女儿童发展状况 systems). Note both `/tjzd/` and `/tjfg/` are ~450-byte JS redirect shells — the small-body
rule again. SHANDONG: `tjj.shandong.gov.cn/col/col6112/` — 14 entries, but they are NBS's own 主要内容 summaries, not
the instruments. **`tj.jiangsu.gov.cn` answered plain curl from the cloud container over both schemes; round 43's
Knownsec block has decayed.**

**And the catalogues were not where the round's yield was.** Chasing 一套表统计调查制度 to its publisher led back to
NBS's `https://www.stats.gov.cn/sj/tjzd/`, where **every one of the 24 instrument pages has a body of five
characters — 具体内容见附件 — and the instrument hanging off it as an attachment no round had opened**, because the
attachments are legacy binary Compound-File `.doc` served as `application/msword` and the fetcher read only PDF,
xlsx, docx and general zips. The id range is closed and complete: 1962929-1962952, 1962953+ returns 404. Round 44
minted 12 nodes and 39 edges off them (27 A / 12 B). The 12 B are all one class and honest: the instrument IS the
document and its publication sentence calls itself 本制度, so no contiguous span can both state the dependency and
name the target (`artefact-named-elsewhere-in-document`); three more are `quote-found-target-not-named` because
NBS's WPS export splits its own titles across Word run boundaries (农林牧渔业 统计报表制度, 固定资产投资 统计 报表 制度,
工业生产者价格 统计调查制度) and `stripHtml` puts a space at every boundary — the round-42 whitespace class on the
publisher's own cover. **Twelve NBS instrument nodes minted in rounds 29-38 had zero out-edges before this round.**
Also wired: the national yearbook's sm16 (the single 一套表 hit in the 211 documents round 43 saved) and Xi'an's
sm15, which resolves round 31's mint-lead note in part.

**Two-layer sweep status, after round 42: FINISHED.** DONE — Shandong, Xi'an, Fujian (r40), Guangdong, Suzhou, Hunan (r41), **Nanjing, Jilin, Jiangsu, Hubei, Yunnan (r42)**; Wuhan is one PDF, exempt. Every layer an index lists on a reachable yearbook has now been read or recorded as unreadable. *(What round 41 left, for the record:)* STILL TO CHECK — Nanjing (`material/njnj_2025/` is a flat HTML index: 17 index.html + 9 N.html + bzsm/bianji/huji; no PDF layer seen, but the per-chapter pages were not opened), Jilin (`ml/` dir — round 37 read zbjsN.html; `njmlc.htm` 302s http→https, re-fetch over https and list what else is there), Jiangsu (`/2025/njNN/` — chapter notes read; per-table pages not), Yunnan and Hubei (zips — the docx layer was read; the xlsx table notes were not), Wuhan (one PDF, exempt).

---

## City-level yearbooks already in the corpus

All 10 are orphans. Every one is a prefecture-level city under a province, except the two
municipalities.

| ✔ | City | Parent | Node |
|---|---|---|---|
| `[~]` | 广州 Guangzhou | 广东 Guangdong | `cn-gz-city-statistical-yearbook` — **reachable in Chrome (round 31), 000 to both curl machines.** Yearbook index `tjj.gz.gov.cn/stats_newtjyw/tjsj/tjnj/index.html` redirects to `tjj.gz.gov.cn/datav/admin/home/www_nj/`, a **zTree JS viewer**: 43 year nodes, all `isParent:false`, `href` empty, navigation entirely in a click handler that a synthetic `.click()` and a direct `onClick` call both failed to fire. The document is there; it needs a real click or the API the tree calls. Concrete next step, not a dead end. |
| `[!]` | 深圳 Shenzhen | 广东 Guangdong | `cn-sz-city-statistical-yearbook` — **IP-blocked, confirmed round 31.** Knownsec CloudWAF serves *"Your IP is not allowed to visit this website!"* to Chrome on Thomas's own machine, and 403 to curl. Not a UA problem and not a bad moment — the block is on the address. Nothing to retry from here. |
| `[x]` | 南京 Nanjing | 江苏 Jiangsu | `cn-nj-city-statistical-yearbook` — **8 edges after round 42 (1 from round 30). THE SECOND LAYER: every chapter index page ends with a 主要统计指标解释 link (16 chapters, e.g. `hesuan/2-4.html`, `zonghe/1-16.html`) that rounds 30-31 never opened; all 16 and the 199 table pages read. Done, all layers.** Round 42 took: 2-4 → 三次产业划分规定 (DATED 2018年国家统计局修订的 — graded B: the export leaves a space inside the title), 3-4 → 市场主体统计分类, 1-16 → 大中小微型企业划分办法(2017) (reprinted in full with 国统字﹝2017﹞213号), 8-12 → 运输货物分类和代码, 11-6 → 全国文化文物和旅游统计调查制度 (spelled 文物文化), 11-11 → 对外承包工程管理条例 (legal_basis), 1-15 → 中国统计摘要. Still nodeless: 关于统计上划分城乡的规定（试行）1999 (3-7), 机动车注册登记工作规范 (8-12, seventh citation), and the registration laws 7-18 defines types under (企业法人登记管理条例, 公司登记管理条例, 公司法). `shouye/1.html`, `2.html` 404. Earlier: **1 edge, A** (round 30). 编者说明 item 三 → GB/T 4754. **First city edge; proves the route.** Yearbook at `tjj.nanjing.gov.cn/material/njnj_<year>/`, 编者说明 at `shouye/bzsm.html`. |
| `[x]` | 苏州 Suzhou | 江苏 Jiangsu | `cn-suz-city-statistical-yearbook` — **3 edges, all A (round 41). ROUND 31'S 'READ AND EMPTY' WAS THE sm LAYER ONLY.** **+1 round 42: zb04 → 小企业会计准则 (minted).** Its `zk/left.htm` lists **19 `html/zbNN.pdf` (主要统计指标解释) beside the 20 image-only `smNN.pdf`**, and the zb layer is clean extractable text. zb01 → GB/T 4754-2017 (with number); zb03 → 《统计用产品分类目录》 (2010年执行…做了相应调整). The round-31 `report_id`/`candidate_target` NO-EDGE note in `cn-cities-2026-09-09.json` is rewritten RESOLVED. zb14 → `cn-statistics-law` (依照《中华人民共和国统计法》规定…调查户 — Thomas ruled 2026-09-10: definitional use is `legal_basis`, unlike Shandong's publicity mention; the sentence is Suzhou's own wording — national zb06, Shandong zb10, Xi'an zb08 define 调查户 without it). Nodeless: ~~zb16 旅游饭店星级的划分与评定 (3rd citation)~~ **node minted round 43 (`cn-gbt-14308-2010`) but Suzhou's citation is BARE — no number, no year — and was refused on the edition ground (three editions exist; the 2023 one was in force for the data year); the 'third citation' was also wrong, Xi'an names it nowhere (all 22 zb + sm16/sm17 grepped round 43)**, ~~zb04 企业会计准则~~ (**minted + wired round 43**)/小企业会计准则 (wired round 42). Yearbook at `tjj.suzhou.gov.cn/sztjj/tjnj/2025/2025/zk/indexch.htm`. |
| `[ ]` | 杭州 Hangzhou | 浙江 Zhejiang | `cn-hz-city-statistical-yearbook` |
| `[x]` | 武汉 Wuhan | 湖北 Hubei | `cn-wh-city-statistical-yearbook` — **4 edges, all A (round 31).** Whole yearbook is ONE first-party PDF: `tjj.wuhan.gov.cn/tjfw/tjnj/202601/P020260113374292635526.pdf` (landing `.../t20260113_2710333.shtml`). Chapter 简要说明 → 农林牧渔业统计报表制度 (p99), 住户收支与生活状况调查方案 + 工业生产者价格统计调查制度 (p297, both nodes minted this round); table 2-7's note → 劳动工资统计报表制度 (p61). Its 编辑说明 carries NO classification item. Parent Hubei still has no node. |
| `[ ]` | 成都 Chengdu | 四川 Sichuan | `cn-cd-city-statistical-yearbook` |
| `[x]` | 西安 Xi'an | 陕西 Shaanxi | `cn-xa-city-statistical-yearbook` — **2 edges, both A (round 31).** Frameset yearbook, `tjj.xa.gov.cn/tjnj/2025/zk/indexch.htm` **+1 round 42: zb12 → 小企业会计准则 (minted).**; TOC `left.htm` (single-quoted hrefs — a double-quote regex finds nothing), chapter notes are TEXT PDFs at `html/smNN.pdf`. sm14 → 建筑业统计报表制度, sm05 → 固定资产投资统计报表制度 (minted round 31). 编者说明 is `html/note.jpg` and is generic. **ROUND 40: the same left.htm lists 22 `html/zbNN.pdf` (主要统计指标解释) that round 31 never fetched — 4 edges now.** zb02 → GB/T 4754 with the number; zb04 → 《关于工资总额组成的规定》 (**node minted round 40**). Still nodeless: 《广播电视人口覆盖率统计技术标准和方法》 (zb21, third citation) and 《小企业会计准则》 (zb12/zb18, 财政部, NEW lead). zb06 would not fetch. |
| `[ ]` | 重庆 Chongqing | — (municipality) | `cn-cq-city-statistical-yearbook` — see mis-levelling note above |
| `[ ]` | 北京 Beijing | — (municipality) | `cn-bj-statistical-yearbook` |

**City host probes, 2026-09-08:** 南京 200 · 武汉 200 · 西安 200 · 苏州 503 · 成都 412 · 广州/深圳/杭州 000.
Same caveat as the province column — 503/412/000 is usually a WAF or a bad moment, not a dead site.

**Re-probed 2026-09-09 (round 31), and the column moved in both directions — proof the caveat is real.**
Three machines now, not one: the CLOUD CONTAINER, Thomas's LOCAL VM (`device_bash`), and his CHROME.
Nanjing and Suzhou answered 200 to the container on 2026-09-08 and **000 on 2026-09-09** — the container's
route to most `.gov.cn` hosts collapsed for the whole round while `stats.gov.cn` and Wuhan kept working.
Xi'an went the other way: 503/403 to curl on both machines, **200 in the local VM's curl on a retry** and
fine in Chrome. DNS on the local VM also failed intermittently mid-batch (`Could not resolve host`) and
succeeded on a 3-second retry, so **a single failed fetch is not a verdict — retry before recording one.**
Working order that actually paid this round: cloud container → local VM curl → Chrome.

### How cities connect — Thomas's assumption, checked

**His assumption is right**: a prefecture-level city is administratively under its province, and
its bureau is a 市统计局 answering to the 省统计局. Two qualifications that matter for the graph:

1. **计划单列市 (separately-listed cities)** — Shenzhen, Dalian, Qingdao, Ningbo, Xiamen — stay
   under their province administratively but hold provincial-level status in state planning and
   report separately to NBS. **Shenzhen is the one in this corpus**, so a Shenzhen→Guangdong
   edge may simply not exist in the documents; check Shenzhen→NBS instruments first.
2. **The city→province edge is NOT free.** `cn-gz-city-statistical-yearbook -> cn-gd-statistical-yearbook`
   and `cn-sz-city-statistical-yearbook -> cn-gd-statistical-yearbook` were already minted once
   and **quarantined 2026-08-31 as assertion-only** (`cn-china-2026-08.json` `_dropped`,
   `no-document`). Re-minting either needs a real document, and rule 14 says read that note first.


**The city→province question and the four city-yearbook shapes moved to the method file**
(`notes/china-method-2026-09-09.md`) on 2026-09-09 — the two numbered points above are
administrative facts about how China is organised and stay here; the 编者说明-route correction,
the shape taxonomy and the image-note recipe are method and are read when you open a city.

---

## Leads parked here rather than in HANDOFF

**`cn-nbs-city-development-monitoring-system`** (城市高质量发展统计监测报表制度) was minted round 30
and is wired from the CSY — it is the instrument NBS's 城市社会经济调查司 collects the city tables
under, so it is the second hub a city node can reach. **Untested and worth trying**: does a city
yearbook name it? Still unminted, both needing a non-NBS publisher page:
《城市（县城）和村镇建设统计调查制度》 (MOHURD) and 《城市（县城）客运统计报表制度》 (MOT).
`cn-city-statistical-yearbook` (中国城市统计年鉴) already exists and is already wired to the CSY.
- ~~《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》~~ — **BOTH MINTED ROUND 40, and the
  route was exactly the one this line guessed: "a provincial reprint."** Shanghai's 年定报制度目录
  (`https://tjj.sh.gov.cn/ndbzdml/index.html`, entries 5 and 7) carries both, each with a first-party
  PDF whose cover reads 国家统计局制定 / 上海市统计局补充、印制. Thomas ruled 2026-09-09: mint off that
  edition, authorship decides the publisher and not the host (rule 19). Wired to the national,
  Shandong and Shanghai yearbooks — 6 edges, all A. **Still no NBS-HOSTED page for either**; both nodes
  carry that caveat and their URLs move if one turns up. **Guangdong (CD zip) and Jiangsu ch14 name
  them too and are two more edges each, not taken.**
- ~~《中国统计摘要》~~ **MINTED ROUND 42** (`cn-statistical-abstract`, off NBS's own 统计出版物 listing `/zs/tjwh/tjkw/tjzl/` — the 2022 edition entry, the newest it carries; six yearbooks wired). Also named by title, no node yet: 第五次全国经济普查, ~~《全国农业普查条例》~~ (minted round 41),
  and the 地区生产总值统一核算 reform that governs how provincial GDP is now produced.
  *(Struck from this list 2026-09-09: 《统计上大中小微型企业划分办法（2017）》 and
  《关于市场主体统计分类的划分规定》（国统字〔2023〕14号） — both minted round 37 and wired round 38;
  SITC — `sitc` is a live node and the national yearbook is wired to it off sm11.)*
- **Round 38 additions, all named in the national yearbook's zb layer and all still nodeless**, each
  needing its own publisher's page found: ~~《关于工资总额组成的规定》~~ (**MINTED ROUND 40** — it is
  国家统计局令第1号 of 1990, an NBS instrument that round 38 misfiled as needing a non-NBS publisher, which is why
  nobody looked on stats.gov.cn; wired to the national, Jilin AND Xi'an yearbooks, 3 edges, all A), ~~《国家危险废物名录》~~ (**MINTED ROUND 43** as the 2016 EDITION `cn-mee-hazardous-waste-list-2016` — zb08 says 按《国家危险废物名录》（2016）填报; MEE's own 2016 page is a 404, URL is the 国务院公报 printing of 令第39号; Jiangsu nj0914 is bare → refused; 1 edge) and
  《危险废物贮存污染控制标准》 (zb08, MEE), ~~《对外承包工程管理条例》~~ (**MINTED ROUND 42** off gov.cn's 国务院公报, wired national/Hubei/Nanjing as legal_basis),
  ~~《运输货物分类和代码》~~ (**MINTED ROUND 42** off MOT's 交通运输标准化信息平台, JT/T 19-2001; wired national/Shanghai/Hunan/Nanjing) and 《机动车注册登记工作规范》 (zb16, MPS — SEVEN citations after round 42 and still no publisher page: mps.gov.cn carries only the retitled 2020 successor 《机动车登记工作规范》),
  ~~《旅游饭店星级的划分与评定》 (zb17, MCT)~~ (**MINTED ROUND 43** as `cn-gbt-14308-2010` off the standard's own SAMR platform page — the handoff's URL was the 2020 revision-PROJECT page; national zb17 names the number, 1 edge, Suzhou bare → refused), 《广播电视人口覆盖率统计技术标准和方法》 (zb23, NRTA,
  also Hubei). 《三次产业划分规定》 is named by zb03 bare with no year and stays unwired on the same
  two-candidate-pages grounds as Jilin's.
- **Round 31 additions to that list, all named by a CITY yearbook and all still nodeless:**
  《企业一套表统计调查制度》 and 《一套表统计调查制度》 (Xi'an parts 12 and 15 — no NBS landing page
  under either spelling), and 《工业统计报表制度》 (Xi'an part 12). **Do not wire that last one to
  NBS's 工业统计调查制度** (`t20260402_1962932.html`) — different title, same trap as the 农业产值
  titles. Also 《农业产值统计报表制度》 (Wuhan p99), a THIRD title again: not NBS's
  《农业产值和价格综合统计报表制度》 and not Jiangsu's 《农业产值与增加值核算统计报表制度》. Three
  yearbooks, three spellings, one apparent instrument — compare character by character, never by eye.
- **Two SHAANXI provincial instruments, named by title in Xi'an's yearbook (parts 3 and 11):**
  《陕西省统计局关于非公有制经济增加值测算的暂行办法（修订版）》 and a Shaanxi scheme for revising
  regular annual data off the third national agricultural census. Shaanxi has no node of any kind,
  so this is a **scope question for Thomas** — do provincial-bureau methodology instruments become
  nodes the way NBS's do? — before it is a research one.
- **Round 31 minted three NBS instrument nodes** off their own `stats.gov.cn` landing pages:
  `cn-nbs-household-survey-scheme` (1962944), `cn-nbs-ppi-survey-system` (1962946),
  `cn-nbs-fixed-investment-reporting-system` (1962939). Two of the three ids came from the
  article-id probe past the truncated listing, so **that probe is now worth 3 nodes and counting.**