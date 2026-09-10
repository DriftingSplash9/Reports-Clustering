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
| `[x]` | 江苏 Jiangsu | province | `cn-js-statistical-yearbook` | tj.jiangsu.gov.cn | 200 | **5 edges, A. Chapter notes MINED (round 30); ch11 re-swept round 38 — done.** 编者说明 item 五 → GB/T 4754; ch3 → wage system, ch10 → agriculture system, ch12 → construction system. Also names, with no node to take them: SITC (ch8), 《中国统计摘要2025》 (ch21), 《批发和零售业统计报表制度》+《住宿和餐饮业统计报表制度》 (ch14), 《统计上大中小微型企业划分办法（2017）》 (ch11 — **node minted round 37, wired round 38**) and 《农业产值与增加值核算统计报表制度》 (ch11/ch10 — the latter is NOT NBS's 农业产值和价格综合…, different title, do not conflate). Browse at `/2025/njNN.htm`, chapter notes at `/2025/njNN/njNN00.htm`. |
| `[x]` | 广东 Guangdong | province | `cn-gd-statistical-yearbook` | stats.gd.gov.cn | 200 | **11 edges, all A** — 4 off the CD-edition zip's `brief-description.html` (rounds ≤38, §7b ruling), **7 more in round 41**. **ROUND 41: THE ZIP HAS A SECOND LAYER NOBODY OPENED.** Every `directory/NN/` holds an `indicators.html` (主要统计指标解释) beside the `brief-description.html` earlier rounds read, plus per-table `html/NN-MM.htm` with table NOTES. Wired from them: 关于工资总额组成的规定 (ch04 indicators, names the 1990 令 number), 市场主体统计分类 (table 1-3 note + ch01 indicators, 国统字〔2023〕14号, named in 32 files), 中国统计年鉴2025 (table 1-5 note: 全国数据来自 — first provincial→national yearbook edge), 大中小微型企业划分办法 2017 (ch12 brief-description, second half of the GB/T 4754 sentence), both trade hubs (ch16, ch17 — both say 国家统计局), **《全国农业普查条例》 (ch11 — node MINTED round 41)**. **FETCH TRAP: the zip is 21,520,465 bytes and plain curl truncates it at ~15.2 MB silently** — unzip then says 'End-of-central-directory signature not found'; `curl -C -` resumes it. Browse host `tjnj.gdstats.gov.cn:8080` unreachable from every network tried — use the zip. Refused/parked with reasons in `cn-round41`: 三次产业划分规定 (DATED 2018 — awaiting Thomas's node-shape ruling), 划分城乡 ×2 (1999/2006 titles, NBS page is the 2008 one), ISIC (settled), energy table names (agency-only). Nodeless leads: 小企业会计准则/企业会计准则, 机动车注册登记工作规范, 中国统计摘要, 广东省财政总决算报表, 全国报纸出版统计调查制度(2019), 2014年社会服务业统计制度. |
| `[~]` | 北京 Beijing | municipality | `cn-bj-statistical-yearbook` | tjj.beijing.gov.cn | 000 (bureau **200 in Chrome**, round 39) | Node is `provincial` level, correctly. **THE YEARBOOK IS ON A SEPARATE HOSTNAME — that is the round-39 finding.** `/tjsj_31433/tjnj_31441/bjtjnj_31442/` redirects to **`https://nj.tjj.beijing.gov.cn/nj/main/2025-tjnj/zk/indexch.htm`**, the standard frameset shape. Chrome loaded the bureau site and resolved the redirect, then `nj.tjj.beijing.gov.cn` itself timed out twice (ERR_CONNECTION_TIMED_OUT); the container gets 503 over http and 000 over https. **The path is now known and is not the problem** — retry the `nj.` host on another day and the frameset should read like Shandong's. |
| `[x]` | 上海 Shanghai | municipality | `cn-sh-statistical-yearbook` | tjj.sh.gov.cn | 200 | **5 edges, all A. All 216 chapter notes swept (round 39) — done, and it is the richest provincial yearbook found so far.** Node is `provincial` level, correctly. Section `/tjnj/index.html`, editions to 2004; the 2025 landing page is a shell whose **iframe** points at `/tjnj/tjnj2025.htm`, the real TOC. 编者说明 at `2025tjnj/BZSM.html`; chapter notes at **`2025tjnj/ZBHTML/CNNNN.htm` — UPPERCASE, and the publisher's own TOC writes it lowercase**, which 404s (with HTTP 200). Wired: GB/T 4754 (C0003), 劳动工资 (C0002), 大中小微型企业划分办法 (C0012), 建筑业 (C0013), 市场主体统计分类 (编者说明). ~~Refused because the sentence names 上海市统计局制定的~~ — **ROUND 40 OVERTURNED THAT AND BOTH ARE NOW WIRED TO THE NBS NODES**: 固定资产投资 (C0010) and 房地产开发 (C0018). The instruments' own covers, in Shanghai's 年定报制度目录, read 国家统计局制定 / 上海市统计局补充、印制 — as do 建筑业's and 劳动工资's, which round 39 wired. Thomas ruled 2026-09-09. **AND THE CATALOGUE IS THE REAL FIND: `https://tjj.sh.gov.cn/ndbzdml/index.html`** — 20 instruments, one landing page and one first-party PDF each. It is where 《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》 were finally found (entries 5 and 7), **both minted round 40**. Entries whose title carries 上海市 say 上海市统计局制定/印制 with no NBS line — that is how a genuinely provincial instrument reads. Shanghai also names both trade hubs at C0016, **wired round 40**, so Shanghai is now **9 edges**. |
| `[~]` | 重庆 Chongqing | municipality | `cn-cq-city-statistical-yearbook` | tjj.cq.gov.cn | 200 | **Chrome fails too (round 39).** **Mis-levelled**: node is `municipal` and id says `-city-`, but Chongqing is a province-level municipality like Beijing/Shanghai, which are `provincial`. Fix the level; leave the id (ids are cited). |
| `[~]` | 浙江 Zhejiang | province | `cn-zj-statistical-yearbook` | tjj.zj.gov.cn | 000 | Also failed in Chrome, **re-confirmed round 39** — three rounds, both routes, no answer. |
| `[x]` | 山东 Shandong | province | `cn-sd-statistical-yearbook` | tjj.shandong.gov.cn | 200 (**http ONLY** — https is connection-refused) | **2 edges, A. sm layer swept round 35; zb SECOND LAYER swept round 40 — done, both layers.** Yearbook 2025 at `/tjnj/nj2025/zk/indexch.htm`, frameset, TOC `left.htm`; **chapter notes are single-page TEXT PDFs at `html/smNN.pdf`** while all 387 tables are `.jpg` scans and 编辑说明 is `html/note.jpg` (image → refused, Suzhou precedent). Only 4 of 25 chapters name a 《…》 at all: sm04 → 《劳动工资统计报表制度》 (**wired**), sm18 → 《批发和零售业统计报表制度》+《住宿和餐饮业统计报表制度》 (no nodes — third yearbook to name them), sm23 → 《中国统计摘要 2025》 (no node, but now with an edition year AND publisher 中国统计出版社), sm24 → 《国际统计年鉴 2024》 (no node). **建筑业 (sm15) and 农业 (sm13) are BOTH agency-level here** — see the method note below. **ROUND 40: left.htm ALSO lists 21 `html/zbNN.pdf` (主要统计指标解释) plus three `html/w25NN.pdf`, and round 35 fetched none of them.** zb01 carries the GB/T 4754 adoption sentence with the number (**wired round 40**); zb17 names 《机动车注册登记工作规范》 (no node, third citation); zb02's 《三次产业划分规定》 is bare and refused again; zb01's ISIC sentence is about GB/T 4754, not the yearbook, and that edge is already live first-party. w2501-w2503 are 山东统计事业发展综述, an administrative work summary — its 《统计法》 mention is legal-publicity activity, not a dependency. |
| `[!]` | 河南 Henan | province | `cn-ha-statistical-yearbook` | tjj.henan.gov.cn | **403 — IP-BLOCKED** | 99M people. **Round 35: blocked on all three routes** — 403 to the cloud container, 403 over BOTH http and https from the device VM, and a 'Sorry, you have been blocked' interstitial **naming the requesting IP** in Thomas's own Chrome. Block is on the ADDRESS, not the user-agent (the Shenzhen shape). Sub-paths blocked identically (`/tjnj/`, `/tjfw/tjnj/`), so it is not a root-only rule. NBS's 地方统计网站 portal lists no alternate bureau host — only `hazd.stats.gov.cn`, the separate NBS survey office in Henan, which returned 503. Re-probe before believing this. |
| `[~]` | 四川 Sichuan | province | `cn-sc-statistical-yearbook` | tjj.sc.gov.cn | 503 (000 + **Chrome fails**, round 39) | 84M people. |
| `[~]` | 贵州 Guizhou | province | `cn-gz-statistical-yearbook` | stjj.guizhou.gov.cn | 503 (000 + **Chrome fails**, round 39) | Note host is `stjj.`, not `tjj.`. |
| `[ ]` | 河北 Hebei | province | — | tjj.hebei.gov.cn | 503 | 74M. Node needed. |
| `[x]` | 湖南 Hunan | province | `cn-hn-statistical-yearbook` | **222.240.193.190** (NOT tjj.hunan.gov.cn) | 200 | **Minted + 1 edge, A (round 36).** `-> cn-gbt-4754-2017` off zb01, which names 《国民经济行业分类》（GB/T4754-2017） with the number. **THE YEARBOOK IS ON A BARE IP**: nothing under the bureau host serves it; its landing page `/hntj/tjfx/hntjnj/hntjnjwlb/202601/t20260119_33896874.html` CLIENT-SIDE navigates a browser to `http://222.240.193.190/2025tjnj/zk/indexch.htm` (reproduced twice in Chrome; no meta/JS refresh in the HTML curl sees). Frameset shape; **chapter notes are `html/zbNN.pdf` (主要统计指标解释), not `smNN.pdf`** — glob, don't assume. Series listing with 17 editions: `/hntj/tjfx/hntjnj/hntjnjwlb/index.html`. **ROUND 41: all 19 zbNN.pdf now read (round 36 read zb01 only) — no new edge.** zb02 names GB/T 4754 with number (same target as zb01, already live) plus a BARE 《三次产业划分规定》 (refused, fourth occurrence); zb14 names 《经济普查年度GDP核算方案》 and 《非经济普查年度GDP核算方案》 (NBS, nodeless, first citations); zb15 names 机动车注册登记工作规范 and 运输货物分类和代码 (nodeless, counts rise). `te.pdf`/`gb.pdf` are 特载/概况, nothing named. Layer settled. |
| `[ ]` | 安徽 Anhui | province | — | tjj.ah.gov.cn | 403 | 61M. Node needed. |
| `[x]` | 湖北 Hubei | province | `cn-hb-statistical-yearbook` | tjj.hubei.gov.cn | 200 (http only) | **Minted + 1 edge, A (round 37).** `-> cn-gbt-4754-2017` off the 综合 chapter's 指标解释. **Round 36's 71-byte shell was a JS REDIRECT, not an empty page** — its body is `window.location = "./qstjnj/"` and that directory lists 15 editions. Yearbook is a first-party **zip** (2025: `/tjsj/sjkscx/tjnj/qstjnj/202601/P020260114553839802144.zip`, 6.4MB) of per-chapter `.xls` tables plus one `第N章指标解释.docx` per chapter (21). **No 编者说明 at all.** Ch1 carries the standard GB/T 4754 sentence; ch5/16/19/20/21 name only licences and other ministries' standards. Ch9 is a legacy binary `.doc` — convert with `soffice --convert-to docx`, not to txt (txt loses the CJK). |
| `[ ]` | 广西 Guangxi | autonomous region | — | tjj.gxzf.gov.cn | 000 | 50M. Node needed. |
| `[x]` | 云南 Yunnan | province | `cn-yn-statistical-yearbook` | stats.yn.gov.cn | 200 | **Minted + 2 edges, A (round 37).** `-> cn-nbs-sme-classification-2017` (ch8 指标解释) and `-> cn-nbs-market-entity-classification` (note under table 1-12). **The yearbook is under the 政府信息公开 tree, not the homepage**: `/zwgk/zfxxgk/fdzdgknr/tjsj/tjnj/`, editions back to 2010; 2025 landing `202605/t20260507_3052633.html` → zip `P020260723540390408353.zip` (10.7MB). Inside: the whole 512-page book as one PDF, a 目录 PDF, per-chapter `.xlsx`, and per-chapter 主要指标解释 `.docx` in **Chinese AND English** (18 chapters). **Names no GB/T 4754 edition** — its agriculture note says only 执行新的国民经济行业分类标准, refused §7a. Table notes are bilingual and productive; sweep them as well as the chapter notes. |
| `[ ]` | 江西 Jiangxi | province | — | tjj.jiangxi.gov.cn | 503 | 45M. Node needed. |
| `[ ]` | 辽宁 Liaoning | province | — | tjj.ln.gov.cn | 000 | 42M. Node needed. |
| `[~]` | 福建 Fujian | province | `cn-fj-statistical-yearbook` | tjj.fujian.gov.cn | 200 | **NODE MINTED round 37, still no edges — the text is unextractable and that is settled.** 福建统计年鉴2025 at `/tongjinianjian/dz2025/zk/indexch.htm`, Shandong's frameset shape, 21 notes at `html/smNN.pdf`. All 21 yield zero characters: Type1 fonts, no `/ToUnicode` anywhere. OCR only (caps B). Do not re-probe with another parser; the node exists so the publication is on the graph. **ROUND 40 checked the OTHER layer too — left.htm lists 19 `html/zbNN.pdf` beside the 21 sm — and it is unextractable in the same way:** 1-page iText 7.1.2 wrappers with an EMPTY font table and an empty image list, zero characters from all five tested. Both layers are now settled; nothing left here. |
| `[ ]` | 陕西 Shaanxi | province | — | tjj.shaanxi.gov.cn | 503 | 39M. Node needed. |
| `[ ]` | 黑龙江 Heilongjiang | province | — | tjj.hlj.gov.cn | 000 | 31M. Node needed. |
| `[ ]` | 山西 Shanxi | province | — | tjj.shanxi.gov.cn | 503 | 34M. Node needed. Don't confuse with 陕西 Shaanxi. |
| `[ ]` | 贵…／甘肃 Gansu | province | — | tjj.gansu.gov.cn | 000 | 25M. Node needed. |
| `[ ]` | 内蒙古 Inner Mongolia | autonomous region | — | tj.nmg.gov.cn | 403 | 24M. Node needed. Host is `tj.`, not `tjj.`. |
| `[~]` | 新疆 Xinjiang | autonomous region | `cn-xj-statistical-yearbook` | tjj.xinjiang.gov.cn | 200 | **NODE MINTED round 37, no edges available.** Found behind a **JS redirect shell**: `/tjj/tjsj/jump.shtml` is 954 bytes carrying `<p id="url">/tjj/zhhvgh/list_nj1.shtml</p>` in a `display:none` div. That is the 综合 chapter of the yearbook; 22 chapter sections in all, each an HTML listing of individual tables. **No 简要说明 or 指标解释 page under any chapter — tables only**, so nothing names an instrument. Newest edition online is **2021** (pages dated 2022-03); 统计书刊 section `/tjj/tjsk/ist.shtml` lists nothing. |
| `[x]` | 吉林 Jilin | province | `cn-jl-statistical-yearbook` | tjj.jl.gov.cn | 200 (https; http 302s) | **Minted + 1 edge, A (round 37).** `-> cn-gbt-4754-2017` off `ml/zbjs1.html`. Yearbook section `/tjsj/tjnj/`, one directory per edition 2011-2025, **not linked from the homepage**. Shape: `2025/enter.htm` → `2025/ml/indexc.htm`, a frameset (left `njmlc.htm` TOC, right `sm.htm` = 编者说明). **Chapter notes are `ml/zbjsN.html` — a THIRD filename convention** after Shandong's `smNN.pdf` and Hunan's `zbNN.pdf`; 19 of them, ch20 (市州和县市概况) has none. Word-exported HTML: every Latin run is its own `<span>`, so cut quotes before any number. 编者说明 names nothing. Also names 《三次产业划分规定》 (zbjs2, no year — two NBS pages, do not pick one) and 《关于工资总额组成的规定》 (zbjs4, no node). |
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

**Score after round 41 — provinces: 8 wired · 7 node-but-unwired · 15 no node yet · 2 blocked** (unchanged by rounds 40 and 41, which deepened yearbooks rather than adding one; Guangdong went 4 → 11 edges).
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

**City score after round 41: 4 wired (Nanjing, Wuhan, Xi'an, Suzhou) · 1 IP-blocked (Shenzhen) · 5 still open
(Guangzhou, Hangzhou, Chengdu, Chongqing, Beijing).** *(Read "3 wired · 1 read-and-empty (Suzhou)" from round 31 until round 41 opened Suzhou's zb layer.)*

**Two-layer sweep status (HANDOFF §3 item 1), after round 41:** DONE — Shandong, Xi'an, Fujian (r40), Guangdong, Suzhou, Hunan (r41). STILL TO CHECK — Nanjing (`material/njnj_2025/` is a flat HTML index: 17 index.html + 9 N.html + bzsm/bianji/huji; no PDF layer seen, but the per-chapter pages were not opened), Jilin (`ml/` dir — round 37 read zbjsN.html; `njmlc.htm` 302s http→https, re-fetch over https and list what else is there), Jiangsu (`/2025/njNN/` — chapter notes read; per-table pages not), Yunnan and Hubei (zips — the docx layer was read; the xlsx table notes were not), Wuhan (one PDF, exempt).

---

## City-level yearbooks already in the corpus

All 10 are orphans. Every one is a prefecture-level city under a province, except the two
municipalities.

| ✔ | City | Parent | Node |
|---|---|---|---|
| `[~]` | 广州 Guangzhou | 广东 Guangdong | `cn-gz-city-statistical-yearbook` — **reachable in Chrome (round 31), 000 to both curl machines.** Yearbook index `tjj.gz.gov.cn/stats_newtjyw/tjsj/tjnj/index.html` redirects to `tjj.gz.gov.cn/datav/admin/home/www_nj/`, a **zTree JS viewer**: 43 year nodes, all `isParent:false`, `href` empty, navigation entirely in a click handler that a synthetic `.click()` and a direct `onClick` call both failed to fire. The document is there; it needs a real click or the API the tree calls. Concrete next step, not a dead end. |
| `[!]` | 深圳 Shenzhen | 广东 Guangdong | `cn-sz-city-statistical-yearbook` — **IP-blocked, confirmed round 31.** Knownsec CloudWAF serves *"Your IP is not allowed to visit this website!"* to Chrome on Thomas's own machine, and 403 to curl. Not a UA problem and not a bad moment — the block is on the address. Nothing to retry from here. |
| `[x]` | 南京 Nanjing | 江苏 Jiangsu | `cn-nj-city-statistical-yearbook` — **1 edge, A** (round 30). 编者说明 item 三 → GB/T 4754. **First city edge; proves the route.** Yearbook at `tjj.nanjing.gov.cn/material/njnj_<year>/`, 编者说明 at `shouye/bzsm.html`. |
| `[x]` | 苏州 Suzhou | 江苏 Jiangsu | `cn-suz-city-statistical-yearbook` — **2 edges, both A (round 41). ROUND 31'S 'READ AND EMPTY' WAS THE sm LAYER ONLY.** Its `zk/left.htm` lists **19 `html/zbNN.pdf` (主要统计指标解释) beside the 20 image-only `smNN.pdf`**, and the zb layer is clean extractable text. zb01 → GB/T 4754-2017 (with number); zb03 → 《统计用产品分类目录》 (2010年执行…做了相应调整). The round-31 `report_id`/`candidate_target` NO-EDGE note in `cn-cities-2026-09-09.json` is rewritten RESOLVED. **Parked for a ruling:** zb14 names 《中华人民共和国统计法》 as the basis for the household-survey unit (would grade A; the Shandong 统计法-publicity refusal is close enough to need Thomas). Nodeless: zb16 旅游饭店星级的划分与评定 (3rd citation), zb04 企业会计准则/小企业会计准则. Yearbook at `tjj.suzhou.gov.cn/sztjj/tjnj/2025/2025/zk/indexch.htm`. |
| `[ ]` | 杭州 Hangzhou | 浙江 Zhejiang | `cn-hz-city-statistical-yearbook` |
| `[x]` | 武汉 Wuhan | 湖北 Hubei | `cn-wh-city-statistical-yearbook` — **4 edges, all A (round 31).** Whole yearbook is ONE first-party PDF: `tjj.wuhan.gov.cn/tjfw/tjnj/202601/P020260113374292635526.pdf` (landing `.../t20260113_2710333.shtml`). Chapter 简要说明 → 农林牧渔业统计报表制度 (p99), 住户收支与生活状况调查方案 + 工业生产者价格统计调查制度 (p297, both nodes minted this round); table 2-7's note → 劳动工资统计报表制度 (p61). Its 编辑说明 carries NO classification item. Parent Hubei still has no node. |
| `[ ]` | 成都 Chengdu | 四川 Sichuan | `cn-cd-city-statistical-yearbook` |
| `[x]` | 西安 Xi'an | 陕西 Shaanxi | `cn-xa-city-statistical-yearbook` — **2 edges, both A (round 31).** Frameset yearbook, `tjj.xa.gov.cn/tjnj/2025/zk/indexch.htm`; TOC `left.htm` (single-quoted hrefs — a double-quote regex finds nothing), chapter notes are TEXT PDFs at `html/smNN.pdf`. sm14 → 建筑业统计报表制度, sm05 → 固定资产投资统计报表制度 (minted round 31). 编者说明 is `html/note.jpg` and is generic. **ROUND 40: the same left.htm lists 22 `html/zbNN.pdf` (主要统计指标解释) that round 31 never fetched — 4 edges now.** zb02 → GB/T 4754 with the number; zb04 → 《关于工资总额组成的规定》 (**node minted round 40**). Still nodeless: 《广播电视人口覆盖率统计技术标准和方法》 (zb21, third citation) and 《小企业会计准则》 (zb12/zb18, 财政部, NEW lead). zb06 would not fetch. |
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
- Also named by title, no node yet: 《中国统计摘要》, 第五次全国经济普查, 《全国农业普查条例》,
  and the 地区生产总值统一核算 reform that governs how provincial GDP is now produced.
  *(Struck from this list 2026-09-09: 《统计上大中小微型企业划分办法（2017）》 and
  《关于市场主体统计分类的划分规定》（国统字〔2023〕14号） — both minted round 37 and wired round 38;
  SITC — `sitc` is a live node and the national yearbook is wired to it off sm11.)*
- **Round 38 additions, all named in the national yearbook's zb layer and all still nodeless**, each
  needing its own publisher's page found: ~~《关于工资总额组成的规定》~~ (**MINTED ROUND 40** — it is
  国家统计局令第1号 of 1990, an NBS instrument that round 38 misfiled as needing a non-NBS publisher, which is why
  nobody looked on stats.gov.cn; wired to the national, Jilin AND Xi'an yearbooks, 3 edges, all A), 《国家危险废物名录》 and
  《危险废物贮存污染控制标准》 (zb08, MEE), 《对外承包工程管理条例》 (zb11, also Hubei),
  《运输货物分类和代码》 and 《机动车注册登记工作规范》 (zb16, MOT and MPS),
  《旅游饭店星级的划分与评定》 (zb17, MCT), 《广播电视人口覆盖率统计技术标准和方法》 (zb23, NRTA,
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