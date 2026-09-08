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
| `[x]` | 江苏 Jiangsu | province | `cn-js-statistical-yearbook` | tj.jiangsu.gov.cn | 200 | **1 edge, A.** 编者说明 item 五 names GB/T 4754. Year pages at `/col/colNNNNN/`, server-rendered. Chapter 简要说明 not yet mined — more edges here. |
| `[x]` | 广东 Guangdong | province | `cn-gd-statistical-yearbook` | stats.gd.gov.cn | 200 | **4 edges, A**, off the CD-edition zip (§7b ruling). Browse host `tjnj.gdstats.gov.cn:8080` unreachable from every network tried — use the zip. |
| `[~]` | 北京 Beijing | municipality | `cn-bj-statistical-yearbook` | tjj.beijing.gov.cn | 000 | Node is `provincial` level, correctly. |
| `[~]` | 上海 Shanghai | municipality | `cn-sh-statistical-yearbook` | tjj.sh.gov.cn | 200 | Node is `provincial` level, correctly. |
| `[~]` | 重庆 Chongqing | municipality | `cn-cq-city-statistical-yearbook` | tjj.cq.gov.cn | 200 | **Mis-levelled**: node is `municipal` and id says `-city-`, but Chongqing is a province-level municipality like Beijing/Shanghai, which are `provincial`. Fix the level; leave the id (ids are cited). |
| `[~]` | 浙江 Zhejiang | province | `cn-zj-statistical-yearbook` | tjj.zj.gov.cn | 000 | Also failed in Chrome. Try again later / another route. |
| `[~]` | 山东 Shandong | province | `cn-sd-statistical-yearbook` | tjj.shandong.gov.cn | 200 | http only. 101M people, 3rd economy — high value. |
| `[~]` | 河南 Henan | province | `cn-ha-statistical-yearbook` | tjj.henan.gov.cn | 403 | 99M people. 403 is likely WAF — try Chrome. |
| `[~]` | 四川 Sichuan | province | `cn-sc-statistical-yearbook` | tjj.sc.gov.cn | 503 | 84M people. |
| `[~]` | 贵州 Guizhou | province | `cn-gz-statistical-yearbook` | stjj.guizhou.gov.cn | 503 | Note host is `stjj.`, not `tjj.`. |
| `[ ]` | 河北 Hebei | province | — | tjj.hebei.gov.cn | 503 | 74M. Node needed. |
| `[ ]` | 湖南 Hunan | province | — | tjj.hunan.gov.cn | 200 | 66M. Node needed. Host answers. |
| `[ ]` | 安徽 Anhui | province | — | tjj.ah.gov.cn | 403 | 61M. Node needed. |
| `[ ]` | 湖北 Hubei | province | — | tjj.hubei.gov.cn | 200 | 58M. Node needed. Host answers. |
| `[ ]` | 广西 Guangxi | autonomous region | — | tjj.gxzf.gov.cn | 000 | 50M. Node needed. |
| `[ ]` | 云南 Yunnan | province | — | stats.yn.gov.cn | 200 | 47M. Node needed. Host is `stats.`, not `tjj.`. Answers. |
| `[ ]` | 江西 Jiangxi | province | — | tjj.jiangxi.gov.cn | 503 | 45M. Node needed. |
| `[ ]` | 辽宁 Liaoning | province | — | tjj.ln.gov.cn | 000 | 42M. Node needed. |
| `[ ]` | 福建 Fujian | province | — | tjj.fujian.gov.cn | 200 | 42M. Node needed. Host answers. |
| `[ ]` | 陕西 Shaanxi | province | — | tjj.shaanxi.gov.cn | 503 | 39M. Node needed. |
| `[ ]` | 黑龙江 Heilongjiang | province | — | tjj.hlj.gov.cn | 000 | 31M. Node needed. |
| `[ ]` | 山西 Shanxi | province | — | tjj.shanxi.gov.cn | 503 | 34M. Node needed. Don't confuse with 陕西 Shaanxi. |
| `[ ]` | 贵…／甘肃 Gansu | province | — | tjj.gansu.gov.cn | 000 | 25M. Node needed. |
| `[ ]` | 内蒙古 Inner Mongolia | autonomous region | — | tj.nmg.gov.cn | 403 | 24M. Node needed. Host is `tj.`, not `tjj.`. |
| `[ ]` | 新疆 Xinjiang | autonomous region | — | tjj.xinjiang.gov.cn | 200 | 26M. Node needed. Host answers. |
| `[ ]` | 吉林 Jilin | province | — | tjj.jl.gov.cn | 200 | 24M. Node needed. Host answers. |
| `[ ]` | 天津 Tianjin | municipality | — | stats.tj.gov.cn | 403 | 14M. Node needed. Host is `stats.tj.`, not `tjj.tj.`. |
| `[ ]` | 海南 Hainan | province | — | stats.hainan.gov.cn | 200 | 10M. Node needed. Host answers. |
| `[ ]` | 宁夏 Ningxia | autonomous region | — | tj.nx.gov.cn | 200 | 7M. Node needed. Host is `tj.`. Corpus already has `cn-ningxia-equalization-transfer-measures` — a Ningxia node exists in another domain. |
| `[ ]` | 青海 Qinghai | province | — | tjj.qinghai.gov.cn | 412 | 6M. Node needed. 412 = precondition failed, a WAF shape. |
| `[ ]` | 西藏 Tibet | autonomous region | — | tjj.xizang.gov.cn | 200 | 4M. Node needed. Host answers. |
| `[ ]` | 兵团 XPCC | corps (province-level) | — | tjj.xjbt.gov.cn | 200 | Xinjiang Production & Construction Corps. Reports to NBS separately and appears in NBS tables as its own row. **Scope question before a research one** — ask before minting. |

**Not in scope as "provinces":** Hong Kong, Macau and Taiwan. The China Statistical Yearbook
carries them as appendix chapters and says outright that each runs its own statistical system
(`香港特别行政区保留其单独运作的统计系统`). Taiwan already has its own large node family
(`tw-*`). Do not fold any of the three into the CN provincial programme.

**Score: 2 wired · 8 node-but-unwired · 22 no node yet.**

---

## City-level yearbooks already in the corpus

All 10 are orphans. Every one is a prefecture-level city under a province, except the two
municipalities.

| ✔ | City | Parent | Node |
|---|---|---|---|
| `[ ]` | 广州 Guangzhou | 广东 Guangdong | `cn-gz-city-statistical-yearbook` |
| `[ ]` | 深圳 Shenzhen | 广东 Guangdong | `cn-sz-city-statistical-yearbook` |
| `[ ]` | 南京 Nanjing | 江苏 Jiangsu | `cn-nj-city-statistical-yearbook` |
| `[ ]` | 苏州 Suzhou | 江苏 Jiangsu | `cn-suz-city-statistical-yearbook` |
| `[ ]` | 杭州 Hangzhou | 浙江 Zhejiang | `cn-hz-city-statistical-yearbook` |
| `[ ]` | 武汉 Wuhan | 湖北 Hubei | `cn-wh-city-statistical-yearbook` — parent has NO node yet |
| `[ ]` | 成都 Chengdu | 四川 Sichuan | `cn-cd-city-statistical-yearbook` |
| `[ ]` | 西安 Xi'an | 陕西 Shaanxi | `cn-xa-city-statistical-yearbook` — parent has NO node yet |
| `[ ]` | 重庆 Chongqing | — (municipality) | `cn-cq-city-statistical-yearbook` — see mis-levelling note above |
| `[ ]` | 北京 Beijing | — (municipality) | `cn-bj-statistical-yearbook` |

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

**The route that should work for every city, and is untested:** a city yearbook's own 编者说明 /
chapter 简要说明 will name the same NBS instruments the provinces name — above all
《国民经济行业分类》. That is a **city → `cn-gbt-4754-2017`** edge, no province involved, and it is
the same one-line disclosure Jiangsu gave. Try that before hunting city→province.

Two national hubs specific to cities, both named by the CSY and **neither minted yet**:
《城市高质量发展统计监测报表制度》 (NBS 城市社会经济调查司, supplies the CSY's city tables) and
《城市（县城）和村镇建设统计调查制度》 (MOHURD). Either would be a hub every city node could reach.
`cn-city-statistical-yearbook` (中国城市统计年鉴) already exists and is already wired to the CSY.

---

## Portals and tricks — read before starting a province

- **THE portal: `https://www.stats.gov.cn/xglj/tjj/`** — NBS's own 地方统计网站 directory. One
  fetch returns every provincial bureau URL, first-party and authoritative. The table above came
  from it. `https://www.stats.gov.cn/xglj/` is the parent index (ministries, provincial
  governments, international bodies) if a non-statistical body is ever needed.
- **NEVER guess a bureau hostname.** The pattern is genuinely inconsistent — `tjj.` (most),
  `tj.` (Jiangsu, Inner Mongolia, Ningxia), `stats.` (Guangdong, Yunnan, Hainan, Tianjin),
  `stjj.` (Guizhou). Four of the eight I guessed before finding the portal were wrong.
- **The NBS instrument hubs are at `https://www.stats.gov.cn/sj/tjzd/`** (统计报表制度, one landing
  page per instrument, reissued annually) and `https://www.stats.gov.cn/sj/tjbz/gmjjhyfl/`
  (国民经济行业分类, with the GB/T 4754 PDF). These are the targets provinces point at.
- **The national yearbook's chapter notes are `https://www.stats.gov.cn/sj/ndsj/<year>/html/smNN.htm`**,
  and `left.htm` is the frame that lists them. Tables are `.jpg` — only the sm pages carry text.
- **A 403/503/412 from curl is usually a WAF refusing the UA, not a dead site.** Try Chrome before
  recording a province as blocked; the two networks are not a superset of each other in either
  direction, in EITHER direction (Chrome failed on Zhejiang where curl also failed, but Chrome
  reached stats.gov.cn pages that curl reset on).
- **Concurrent fetches of one big file collide.** Four grader threads pulling the same 21.5MB zip
  reset three of them; the cached second run served all four. Re-run before believing a network
  verdict.
- **A year LISTING page may be JS-driven while the year's own page is static.** Jiangsu's
  `/col/col85821/` reads empty to curl; `/col/col93166/` (the 2025 page) is fully server-rendered.
  Don't conclude "JS shell" from the listing.
- The techniques note has the rest: where the 简要说明 lives, the per-chapter yield table, the
  quote-splitting trap, GBK filenames inside CD zips.

## Leads parked here rather than in HANDOFF

- 《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》 are named by the national AND the
  Guangdong yearbook but have **no NBS landing page** on the current 统计制度 listing, so no node.
  If a page turns up (an older year's listing, or a provincial reprint), two more hubs open.
- Also named by title, no node yet: 《中国统计摘要》, 第五次全国经济普查, 《全国农业普查条例》,
  《统计上大中小微型企业划分办法（2017）》, 《关于市场主体统计分类的划分规定》（国统字〔2023〕14号）,
  SITC, and the 地区生产总值统一核算 reform that governs how provincial GDP is now produced.
