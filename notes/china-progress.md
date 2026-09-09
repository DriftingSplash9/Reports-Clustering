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
| `[x]` | 江苏 Jiangsu | province | `cn-js-statistical-yearbook` | tj.jiangsu.gov.cn | 200 | **4 edges, A. Chapter notes MINED (round 30) — done.** 编者说明 item 五 → GB/T 4754; ch3 → wage system, ch10 → agriculture system, ch12 → construction system. Also names, with no node to take them: SITC (ch8), 《中国统计摘要2025》 (ch21), 《批发和零售业统计报表制度》+《住宿和餐饮业统计报表制度》 (ch14), 《统计上大中小微型企业划分办法（2017）》 and 《农业产值与增加值核算统计报表制度》 (ch11/ch10 — the latter is NOT NBS's 农业产值和价格综合…, different title, do not conflate). Browse at `/2025/njNN.htm`, chapter notes at `/2025/njNN/njNN00.htm`. |
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

**Score: 2 wired · 8 node-but-unwired · 22 no node yet.** (Provinces — unchanged by round 31, which
worked cities only. Jiangsu is *fully* mined rather than just opened; Guangdong's chapter notes are mined too.)

**City score after round 31: 3 wired (Nanjing, Wuhan, Xi'an) · 1 read-and-empty (Suzhou) · 1 IP-blocked
(Shenzhen) · 5 still open (Guangzhou, Hangzhou, Chengdu, Chongqing, Beijing).**

---

## City-level yearbooks already in the corpus

All 10 are orphans. Every one is a prefecture-level city under a province, except the two
municipalities.

| ✔ | City | Parent | Node |
|---|---|---|---|
| `[~]` | 广州 Guangzhou | 广东 Guangdong | `cn-gz-city-statistical-yearbook` — **reachable in Chrome (round 31), 000 to both curl machines.** Yearbook index `tjj.gz.gov.cn/stats_newtjyw/tjsj/tjnj/index.html` redirects to `tjj.gz.gov.cn/datav/admin/home/www_nj/`, a **zTree JS viewer**: 43 year nodes, all `isParent:false`, `href` empty, navigation entirely in a click handler that a synthetic `.click()` and a direct `onClick` call both failed to fire. The document is there; it needs a real click or the API the tree calls. Concrete next step, not a dead end. |
| `[!]` | 深圳 Shenzhen | 广东 Guangdong | `cn-sz-city-statistical-yearbook` — **IP-blocked, confirmed round 31.** Knownsec CloudWAF serves *"Your IP is not allowed to visit this website!"* to Chrome on Thomas's own machine, and 403 to curl. Not a UA problem and not a bad moment — the block is on the address. Nothing to retry from here. |
| `[x]` | 南京 Nanjing | 江苏 Jiangsu | `cn-nj-city-statistical-yearbook` — **1 edge, A** (round 30). 编者说明 item 三 → GB/T 4754. **First city edge; proves the route.** Yearbook at `tjj.nanjing.gov.cn/material/njnj_<year>/`, 编者说明 at `shouye/bzsm.html`. |
| `[!]` | 苏州 Suzhou | 江苏 Jiangsu | `cn-suz-city-statistical-yearbook` — **READ AND EMPTY (round 31), not blocked.** 编者说明 (`html/note.jpg`, an image) names only the collecting bodies; and Suzhou publishes NO chapter 简要说明 at all — its 20 `html/smNN.pdf` are 主要统计指标 tables, image-only ABBYY scans with no text layer. Yearbook at `tjj.suzhou.gov.cn/sztjj/tjnj/2025/2025/zk/indexch.htm`. Re-check only against a future edition. |
| `[ ]` | 杭州 Hangzhou | 浙江 Zhejiang | `cn-hz-city-statistical-yearbook` |
| `[x]` | 武汉 Wuhan | 湖北 Hubei | `cn-wh-city-statistical-yearbook` — **4 edges, all A (round 31).** Whole yearbook is ONE first-party PDF: `tjj.wuhan.gov.cn/tjfw/tjnj/202601/P020260113374292635526.pdf` (landing `.../t20260113_2710333.shtml`). Chapter 简要说明 → 农林牧渔业统计报表制度 (p99), 住户收支与生活状况调查方案 + 工业生产者价格统计调查制度 (p297, both nodes minted this round); table 2-7's note → 劳动工资统计报表制度 (p61). Its 编辑说明 carries NO classification item. Parent Hubei still has no node. |
| `[ ]` | 成都 Chengdu | 四川 Sichuan | `cn-cd-city-statistical-yearbook` |
| `[x]` | 西安 Xi'an | 陕西 Shaanxi | `cn-xa-city-statistical-yearbook` — **2 edges, both A (round 31).** Frameset yearbook, `tjj.xa.gov.cn/tjnj/2025/zk/indexch.htm`; TOC `left.htm` (single-quoted hrefs — a double-quote regex finds nothing), chapter notes are TEXT PDFs at `html/smNN.pdf`. sm14 → 建筑业统计报表制度, sm05 → 固定资产投资统计报表制度 (minted this round). 编者说明 is `html/note.jpg` and is generic. |
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

**CORRECTED 2026-09-09 (round 31): the 编者说明 route is NOT the city route — it is 1 for 4.**
Round 30 read Nanjing's 编者说明 item 三 (naming 《国民经济行业分类》, giving
**city → `cn-gbt-4754-2017`** at A with no province involved) and wrote here that the route was
"proven" and should be run first for every remaining city. Round 31 ran it on the next three:
**Wuhan's 编辑说明, Xi'an's 编者说明 and Suzhou's 编者说明 all stop one level short** — 国家统计制度,
国家新的统计制度, 当时国家统计制度, 资料主要来自苏州市统计局…, i.e. the collecting agency or a
generic reference to "the national statistical system", with no artefact titled. That is the
ordinary §7a refusal and it is the NORMAL case; Nanjing is the exception. All three refusals are
recorded in `cn-cities-2026-09-09.json`'s `_dropped`. Nanjing's edge stands and its quote advice
still holds: watch the punctuation — Nanjing writes （GB/T4754—2017） with U+2014, Jiangsu writes
(GB/T4754 -2017) with an ASCII hyphen and a stray space, so **cut the quote before the number**,
the title alone names the artefact.

**What DOES generalise is the per-chapter 简要说明 — the same thing that works for provinces.**
Round 31's six edges all came from chapter notes, none from an 编者说明. Still check the 编者说明
first, because it is one fetch and it sometimes pays; just do not stop when it is generic, and do
not treat it as the route. Two chapters are worth opening before the others: **建筑业 and 农业**
name an NBS 统计报表制度 by title in every yearbook checked so far (national, Jiangsu, Guangdong,
Wuhan, Xi'an), and 固定资产投资 and the price/household chapters pay almost as often.

**A city yearbook comes in at least four shapes, and the shape decides the whole approach:**
one PDF of the entire book (Wuhan); a frameset with TEXT chapter-note PDFs (Xi'an); a frameset
whose "chapter notes" are image-only scans of indicator tables, with nothing to read (Suzhou); and
a JS viewer with no static URLs at all (Guangzhou). **Identify the shape before planning the
round** — Suzhou cost a full fetch-and-extract pass before it was clear there was no text anywhere
in it, and that would have been visible from `pdfinfo` (Creator: ABBYY FineReader) in one command.

**An image-only 编者说明 is still readable** — fetch the JPG, put it somewhere the container can
reach, and read it as an image. Xi'an's and Suzhou's refusals were both established that way
rather than left as "couldn't check".

**`cn-nbs-city-development-monitoring-system`** (城市高质量发展统计监测报表制度) was minted round 30
and is wired from the CSY — it is the instrument NBS's 城市社会经济调查司 collects the city tables
under, so it is the second hub a city node can reach. **Untested and worth trying**: does a city
yearbook name it? Still unminted, both needing a non-NBS publisher page:
《城市（县城）和村镇建设统计调查制度》 (MOHURD) and 《城市（县城）客运统计报表制度》 (MOT).
`cn-city-statistical-yearbook` (中国城市统计年鉴) already exists and is already wired to the CSY.

---

## Portals and tricks — read before starting a province

- **THE NBS 统计制度 LISTING IS TRUNCATED — probe the article-id range instead** (found round 30).
  `https://www.stats.gov.cn/sj/tjzd/` shows 15 instruments; the ids are consecutive and probing
  `t20260402_<id>.html` past the end of the listing found at least 8 more, including
  城市高质量发展统计监测报表制度 (1962948, the city hub, now minted), 流通和消费价格统计报表制度 (1962945),
  工业生产者价格统计调查制度 (1962946), 房地产价格统计调查制度 (1962947), 住户收支与生活状况调查方案 (1962944),
  乡村振兴统计监测一套表制度 (1962949), 农民工监测调查方案 (1962950), 脱贫县农村住户监测调查方案 (1962952).
  **Never conclude an NBS instrument has no page from the listing alone.** Known range so far:
  1962929-1962952, gaps at 1962951/1962953+. 批发和零售业 and 住宿和餐饮业 are still NOT among them.
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
