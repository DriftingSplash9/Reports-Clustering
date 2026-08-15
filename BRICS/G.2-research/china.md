# BRICS G.2 — CHINA — Round 2 findings

Researcher note on method: every URL below was raw-verified with
`curl -sS -o /dev/null -w '%{http_code} %{size_download}' -L -A '<Chrome UA>' '<url>'`
before any content was trusted. No WebFetch summarisation was used for any quoted text —
all Chinese quotes below were extracted from bytes downloaded by curl and decoded locally
(html tag-strip, or `zipfile`+`word/document.xml` for .docx, or `pdftotext -enc UTF-8` for PDF).

---

## 0. ACCESS DIAGNOSIS — round 1's walls, re-tested (READ THIS FIRST)

Round 1 recorded reproducible blocks that turn out to be **partly misdiagnosed**. Corrections:

### 0.1 `yss.mof.gov.cn` "502" is NOT a blanket block — it is a per-path CDN failure, and the root page serves real content WITH a 502 status
```
curl -sS -o /dev/null -w '%{http_code} %{size_download}' -L 'https://yss.mof.gov.cn/'
-> 502 1923      (status 502)
```
but fetching the **body** of that same request returns the genuine MOF Budget Department page:
```
<meta name="SiteName" content="中华人民共和国财政部">
<title>预算司</title>          ← "Budget Department"
```
i.e. **HTTP 502 with a real 19,642-byte document body.** Any tool that checks only the
status code will wrongly report this host as dead. Round 1's "reproducible 502" was this.

However, *deep* paths on that host are genuinely broken (real Squid error page, 2 KB):
```
https://yss.mof.gov.cn/zhengceguizhang/index.htm                    -> 502  1973 (real error body)
https://yss.mof.gov.cn/zhengceguizhang/202311/t20231110_3915905.htm -> 502  2011 (real error body)
http://yss.mof.gov.cn/zhuantilanmu/cztzgg/zcgz/200806/t20080627_54328.htm -> 502 2022 (real error body)
http://yss.mof.gov.cn/ybxzyzf/jhxzyzf/202204/t20220428_3807232.htm  -> 502  2009 (real error body)
```
The error body identifies the failing CDN edge, which is why this is path/geo dependent:
```
502 Bad Gateway / Node information: PS-KHH-01OPu171 / Request-Id: ...PS-SIN-046Vq64...
The following error was encountered: Connection Failed
```
(KHH = Kaohsiung, SIN = Singapore edge nodes.) **`gks.mof.gov.cn` is 502 for the same reason.**

**WORKAROUND THAT WORKS, and unblocks MOF entirely:** the *main* MOF host serves the
same documents on two path prefixes, both TIER A HTTP 200 with real bodies:
- `https://www.mof.gov.cn/zhengwuxinxi/caizhengxinwen/...`  (news / reports) — 200
- `https://www.mof.gov.cn/gp/xxgkml/yss/...` (disclosure mirror of the Budget Dept) — 200
  e.g. `https://www.mof.gov.cn/gp/xxgkml/yss/201211/t20121125_2498058.htm -> 200 48557`
- and `https://www.gov.cn/zhengce/zhengceku/...` (State Council policy library) republishes
  MOF 财预 documents **with the attachment**, which is where the real prize was.

Note `https://www.mof.gov.cn/` root returns 200 but only 2,534 bytes — it is a JS
browser-redirect stub, not a challenge page. Do not read that as a block either.

### 0.2 `npc.gov.cn` — TLS fails, plain HTTP works
```
https://www.npc.gov.cn/  -> curl (35) OpenSSL error:0A000410:SSL routines::sslv3 alert handshake failure
   --tlsv1.2 --tls-max 1.2                 -> same handshake failure
   --ciphers 'DEFAULT@SECLEVEL=1'          -> same handshake failure
http://www.npc.gov.cn/   -> 200 87288  (redirects to http://www.npc.gov.cn/npc/index.html)
```
Diagnosis: this is **not** a trust-store gap (unlike the Rosstat case the Russia agent found).
`openssl s_client` shows the sandbox egress gateway presenting a valid re-signed chain
(`CN = *.npc.gov.cn` issued by `Anthropic Egress Gateway SDS Issuing CA`), so the CA is fine;
the failure is a ClientHello negotiation rejection between the egress gateway and the origin.
**Use `http://` for npc.gov.cn.** All NPC documents below were retrieved that way, TIER A.

### 0.3 `r.jina.ai` (the project's TIER B fallback) is currently unusable
```
https://r.jina.ai/http://yss.mof.gov.cn/...  -> HTTP 403, 5874 bytes,
   body = <title>Just a moment...</title> + challenges.cloudflare.com CSP  (bot challenge)
```
So no TIER B was available this round. Everything below is TIER A except where stated.

### 0.4 The official gov search API works but is relevance-useless
```
https://sousuo.www.gov.cn/search-gov/data?t=zhengcelibrary_gw&q=均衡性转移支付&p=1&n=10 -> 200, totalCount 224
```
It returns 200 and a populated `searchVO.listVO`, but the ranking ignores the query — the
same recent State Council documents come back for `均衡性转移支付`, `预算法` and
`分税制财政管理体制的决定` alike. The `searchWord=`/`dataTypeId=` parameter form suggested
in the brief returns `totalCount: 0` with only facet counts. **Not a usable discovery tool**;
targeted search + direct curl verification on the gov host was the working method.

---

## 1. 中央对地方均衡性转移支付办法 — **VERIFIED** (round 1's main blocker: SOLVED)

Verification tier: **A**

URL (notice, State Council policy library):
`https://www.gov.cn/zhengce/zhengceku/2022-05/07/content_5689025.htm`
URL (the 办法 itself — .docx attachment, this is where the formula lives):
`https://www.gov.cn/zhengce/zhengceku/2022-05/07/5689025/files/5020a7f5e0d147108fbedfae0213e133.docx`

HTTP check:
```
https://www.gov.cn/zhengce/zhengceku/2022-05/07/content_5689025.htm                  -> 200 26791
https://www.gov.cn/zhengce/zhengceku/2022-05/07/5689025/files/5020a...e133.docx      -> 200 26806
  file: "Microsoft Word 2007+"; extracted via python zipfile -> word/document.xml -> 6,993 chars
FAILED alternates (recorded for completeness):
http://yss.mof.gov.cn/ybxzyzf/jhxzyzf/202204/t20220428_3807232.htm                   -> 502 2009 (real error page)
https://yss.mof.gov.cn/zhengceguizhang/201207/t20120725_669218.htm                   -> 502 (deep-path CDN failure)
```
**Round 1 failed because the notice page's HTML body contains only the covering letter.
The 办法 with the formulas is an unlinked-from-text `.docx` attachment. That is the trick.**

Title (Chinese, as published): 关于印发《中央对地方均衡性转移支付办法》的通知；
attachment: 中央对地方均衡性转移支付办法
English gloss: "Notice on issuing the *Measures for Equalization Transfer Payments from the
Central Government to Local Governments*"
Publisher (发文机关, verbatim from the page's metadata block): 财政部 (Ministry of Finance)
发文字号: 财预〔2022〕58号 · 成文日期: 2022年04月13日 · 公文种类: 通知

Periodicity — this is a **standing instrument, periodically revised**, and it drives an
**annual** allocation cycle. Verbatim, 第十四条:
> 「本办法自发布之日起施行。《中央对地方均衡性转移支付办法》（财预〔2019〕108号）同时废止。」
> "These Measures take effect from the date of issue. The *Measures for Equalization Transfer
> Payments from the Central Government to Local Governments* (Cai Yu [2019] No. 108) are
> simultaneously repealed."
Annual operating cycle, verbatim 第十一条:
> 「财政部于每年10月31日前，提前向省级财政部门下达下一年度均衡性转移支付预计数。」
> "Before 31 October each year, the Ministry of Finance shall issue in advance to provincial
> finance departments the estimated equalization transfer payment figures for the following year."
I checked for a version superseding 财预〔2022〕58号 (MOF topic page
`https://www.mof.gov.cn/zhuantihuigu/cczqzyzfglbf/ybxzyzf_7774/jhxzyzf/` -> 200 21243, plus
targeted search): **none found. 财预〔2022〕58号 is the current instrument.**

### The 标准财政收入 / 标准财政支出 formula — VERBATIM (this is what round 1 wanted)

第三条:
> 「中央财政按照测算办法，对标准财政支出大于标准财政收入的省、自治区、直辖市、计划单列市、
> 新疆生产建设兵团（以下统称省）安排均衡性转移支付。」
> "The central finance authority shall, in accordance with the calculation method, arrange
> equalization transfer payments for provinces … whose **standard fiscal expenditure exceeds
> their standard fiscal revenue**."

第四条 (the master formula and the definitions of both terms):
> 「均衡性转移支付资金分配选取影响财政收支的客观因素，按照各地标准财政收入和标准财政支出
> 差额及转移支付系数计算确定。其中，标准财政收入反映地方收入能力，根据工业增加值等因素
> 及全国平均有效税率计算确定；标准财政支出旨在衡量地方支出需求，考虑人口规模、人口密度、
> 海拔、温度、少数民族等成本差异计算确定。
> 各地享受均衡性转移支付用公式表示为：
> 某地区均衡性转移支付=(该地区标准财政支出-该地区标准财政收入)×该地区转移支付系数
> +增幅控制调整+省对下均等化努力程度奖励资金」
> "Allocation selects objective factors affecting fiscal revenue and expenditure, and is
> determined from the gap between each locality's **standard fiscal revenue** and **standard
> fiscal expenditure** and the transfer payment coefficient. **Standard fiscal revenue**
> reflects local revenue capacity and is determined from factors such as industrial value
> added together with the national average effective tax rate; **standard fiscal expenditure**
> is intended to measure local expenditure need, and is determined taking into account cost
> differences such as population size, population density, altitude, temperature and ethnic
> minorities.
> Formula: *Equalization transfer payment for a region = (that region's standard fiscal
> expenditure − that region's standard fiscal revenue) × that region's transfer payment
> coefficient + growth-rate-control adjustment + reward funds for the province's effort at
> equalization toward lower levels.*"

第七条 (the coefficient):
> 「某省均衡性转移支付系数=（均衡性转移支付总额÷标准财政收支缺口总额）×权重
> +某省困难程度系数×权重
> 其中，标准财政收支缺口=标准财政支出-标准财政收入
> 困难程度系数=标准化处理后（基本公共服务必保支出÷地方标准财政收入）×55%
> +标准化处理后（标准财政收支缺口÷标准财政支出）×45%
> 标准化处理=（某指标-该指标均值）÷该指标标准差」

第六条 (standard fiscal expenditure cost-difference coefficient, illustrative):
> 「一般公共服务标准财政支出=∑i（∑j各级次总人口×该级次人均支出标准×支出成本差异系数）
> …支出成本差异系数=（人口规模系数×0.85+面积系数×0.15）×{艰苦边远系数×人员经费占该项支出比重
> +冬季温度系数×取暖费占该项支出比重+夏季温度系数×防暑费占该项支出比重
> +海拔系数×运距系数×燃油费占该项支出比重+路况系数×车辆维修费占该项支出比重+…}
> ×供养率差异系数×民族系数×直辖差异系数×脱贫地区系数」

**Proposed node? YES.** `cn-mof-equalization-transfer-measures` — a standing MOF instrument
defining a method, periodically revised (2019 → 2022), driving an annual allocation.

### EDGES OUT OF THIS DOCUMENT (all from the document's own text)

**EDGE 1 — `cn-mof-equalization-transfer-measures` -> `cn-budget-law` — legal_basis / derives_from**
第一条, verbatim:
> 「为加快建立现代财政制度，建立权责清晰、财力协调、区域均衡的中央和地方财政关系，推进基本
> 公共服务均等化，**根据《中华人民共和国预算法》及其实施条例**，制定《中央对地方均衡性转移支付办法》。」
> "…**in accordance with the Budget Law of the People's Republic of China and its Implementing
> Regulations**, these Measures … are formulated."
Tense: present/constitutive ("根据 … 制定" = "formulated in accordance with"). Unambiguous.
Corroborated a second time in 第十三条:
> 「依照《中华人民共和国预算法》及其实施条例、《财政违法行为处罚处分条例》等国家有关规定追究相应责任。」

**EDGE 2 — `cn-mof-equalization-transfer-measures` -> NBS (国家统计局) — data_input**
第五条（一）3., verbatim:
> 「3.个人所得税标准财政收入（地方分享部分）。按照税目分别计算。其中，工资薪金所得税税基
> **采用国家统计局提供的**各地在岗职工平均工资、各地区就业人数、各地城镇居民人均可支配收入等，
> 税率按照全国平均有效税率分类计算确定；」
> "3. Standard fiscal revenue from individual income tax (locally-shared portion). … the tax base
> for wage-and-salary income tax **uses, as provided by the National Bureau of Statistics**, each
> locality's average wage of employed staff, each region's number of employed persons, and each
> locality's per-capita disposable income of urban residents…"
**AMBIGUITY FLAG (important):** this names the **agency** (国家统计局), not a specific NBS
publication. The three named series (在岗职工平均工资, 就业人数, 城镇居民人均可支配收入) are all
published in the NBS 统计年鉴 and the annual 统计公报 (see §5), so the natural target is
`cn-nbs-statistical-communique` / a China Statistical Yearbook node — but the source text does
**not** name either by title. Record as agency-level unless the corpus permits a yearbook node.

**EDGE 3 — `cn-mof-equalization-transfer-measures` -> 统计年鉴 (China Statistical Yearbook, NBS) — data_input**
第十条, verbatim — this one *does* name a publication class:
> 「均衡性转移支付测算所需资料原则上**来源于统计年鉴等公开资料**和相关部门提供的数据。」
> "The materials required for calculating equalization transfer payments shall in principle
> **come from statistical yearbooks and other publicly available materials**, and from data
> provided by the relevant departments."
Tense: present, operative. Slight generality ("统计年鉴等" = "statistical yearbooks etc."),
flag as a class-level rather than a single-title citation.

---

## 2. 国发〔1993〕85号 — 国务院关于实行分税制财政管理体制的决定 — **VERIFIED (text, not scan)**

Verification tier: **A**, but note the host is a *republishing* government body, not the issuer.

URL: `https://wsjkw.jl.gov.cn/zdzt/shylwstzgg/201404/t20140414_7868456.html`
(Health Commission of Jilin Province, a `.gov.cn` host; full text republication)

HTTP check:
```
https://wsjkw.jl.gov.cn/zdzt/shylwstzgg/201404/t20140414_7868456.html -> 200 33438
   <title>国务院关于实行分税制财政管理体制的决定</title>  ; extracted text 4,770 chars — FULL text
FAILED / rejected alternates:
http://yss.mof.gov.cn/zhuantilanmu/cztzgg/zcgz/200806/t20080627_54328.htm -> 502 2022 (real Squid error page)
https://r.jina.ai/http://yss.mof.gov.cn/.../t20080627_54328.htm           -> 403 5874 (Cloudflare "Just a moment...")
http://www.scio.gov.cn/zhzc/6/2/document/1066129/1066129.htm              -> 521 709
https://sjj.nc.gov.cn/nvsjj/zcfg/200812/753e8...b7b.shtml                  -> curl (56) CONNECT tunnel failed, response 502
sousuo.www.gov.cn search API for 分税制财政管理体制的决定                    -> 200, but returns unrelated 2023-2026 documents (see §0.4)
```
**No OCR was needed** — a clean text version exists. Round 1's scanned-PDF-only conclusion
is superseded. Caveat to record: I did **not** find the decision on a State Council–operated
host (`www.gov.cn/gongbao/`, `www.gov.cn/zhengce/content/`); the best available text host is a
provincial `.gov.cn` republication. Treat the text as reliable but the *host* as secondary.

Title (Chinese, as published): 国务院关于实行分税制财政管理体制的决定
English gloss: "Decision of the State Council on Implementing the Tax-Sharing Fiscal
Management System"
Publisher: 国务院 (State Council). 文号 verbatim on page: 「国发[1993]85号」
Periodicity: **not recurrent — a one-off standing foundational instrument.** Effective date,
verbatim: 「国务院决定，从1994年1月1日起改革现行地方财政包干体制，对各省、自治区、直辖市
以及计划单列市实行分税制财政管理体制。」

### Verbatim: the central/local revenue split (三、（二）中央与地方收入的划分)
> 「中央固定收入包括：关税，海关代征消费税和增值税，消费税，中央企业所得税，地方银行和外资银行
> 及非银行金融企业所得税，铁道部门、各银行总行、各保险总公司等集中交纳的收入（包括营业税、
> 所得税、利润和城市维护建设税），中央企业上交利润等。…
> 地方固定收入包括：营业税（不含铁道部门、各银行总行、各保险总公司集中交纳的营业税），
> 地方企业所得税…个人所得税，城镇土地使用税…房产税，车船使用税，印花税，屠宰税，农牧业税…
> 耕地占用税，契税，遗产和赠予税，土地增值税，国有土地有偿使用收入等。
> **中央与地方共享收入包括：增值税、资源税、证券交易税。增值税中央分享75%，地方分享25%。**
> 资源税按不同的资源品种划分，大部分资源税作为地方收入，海洋石油资源税作为中央收入。
> 证券交易税，中央与地方各分享50%。」
> Gloss: fixed central revenues = customs duties, consumption tax, central enterprise income
> tax, etc.; fixed local revenues = business tax, local enterprise income tax, individual
> income tax, property tax, stamp duty, deed tax, land VAT, etc.; **shared revenues = VAT
> (75% central / 25% local), resource tax, securities transaction tax (50/50).**

### Verbatim: the 税收返还 (tax rebate) mechanism (三、（三）)
> 「（三）中央财政对地方税收返还数额的确定
> 为了保持现有地方既得利益格局，逐步达到改革的目标，中央财政对地方税收返还数额以1993年为
> 基期年核定。按照1993年地方实际收入以及税制改革和中央与地方收入划分情况，核定1993年中央从
> 地方净上划的收入数额（即消费税+75%的增值税～中央下划收入）。1993年中央净上划收入，全额返还
> 地方，保证现有地方既得财力，并以此作为以后中央对地方税收返还基数。**1994年以后，税收返还额
> 在1993年基数上逐年递增，递增率按全国增值税和消费税的平均增长率的1：0．3系数确定，即上述
> 两税全国平均每增长1%，中央财政对地方的税收返还增长0．3%。** 如若1994年以后中央净上划收入
> 达不到1993年基数，则相应扣减税收返还数额。」
> Gloss: tax rebates to localities are fixed on a **1993 base year**; the 1993 net upward-remitted
> revenue is returned in full and becomes the rebate base; **from 1994 the rebate grows on that
> base at a 1:0.3 coefficient against the national average growth of VAT + consumption tax —
> i.e. every 1% growth in those two taxes raises the rebate by 0.3%.**

Also relevant (the 转移支付 concept's origin), 一、:
> 「科学核定地方收支数额，逐步实行比较规范的中央财政对地方的**税收返还和转移支付制度**；
> 建立和健全分级预算制度，硬化各级预算约束。」

**Proposed node? YES, with a caveat.** It is a *standing statutory instrument defining a method*
(the tax-sharing split and the rebate formula) — qualifies under the corpus rule even though it
is not recurrently published. It is still operative: the 税收返还 line item it created still
appears by name inside the 2022 均衡性转移支付办法 (第五条（二）: 「…**税收返还及固定补助**、
体制结算补助等。」).

**Proposed EDGES: NONE ORIGINATING HERE**, and — importantly — **no edge INTO it was found.**
See §3: neither the Budget Report nor the 办法 names 国发〔1993〕85号. The 办法 references the
*mechanism* (税收返还) but never the *document*. **Do not draw an edge on mechanism-name overlap.**

---

## 3. Does the Budget Report cite anything by name? — **VERIFIED: YES, it cites 预算法**
(round 1's "cites nothing" conclusion is **partly wrong**)

Verification tier: **A**
URL: `https://www.mof.gov.cn/zhengwuxinxi/caizhengxinwen/202603/t20260316_3985331.htm`
HTTP check:
```
https://www.mof.gov.cn/zhengwuxinxi/caizhengxinwen/202603/t20260316_3985331.htm -> 200 85577
  <title>关于2025年中央和地方预算执行情况与2026年中央和地方预算草案的报告</title>
  extracted text 23,055 chars (full report; 来源：新华网, 发布日期 2026年03月16日)
also verified: https://www.gov.cn/yaowen/liebiao/202603/content_7061020.htm -> 200 45393 (摘要 version)
```

Exhaustive citation scan of the full text (counts are literal regex hits over the extracted text):
```
预算法          4 hits   <-- REAL, OPERATIVE CITATION
《…》            4 hits   (see below)
条例            3 hits   (all = 《党政机关厉行节约反对浪费条例》 + 增值税法实施条例)
国家统计局      0 hits
统计            0 hits
国发            0 hits
财预            0 hits
办法            0 hits
均衡性转移支付  1 hit    (a number, not a citation)
```

**EDGE 4 — `cn-npc-budget-report` -> `cn-budget-law` — legal_basis / procedural_authority**
Verbatim, the decisive line (an operative, not decorative, citation — it is the legal authority
for spending before the budget is approved):
> 「**根据预算法规定**，预算年度开始后，在全国人民代表大会批准本预算草案前，可安排下列支出：
> 上一年度结转的支出；参照上一年同期的预算支出数额安排必须支付的本年度部门基本支出、项目支出，
> 以及对下级政府的转移性支出；法律规定必须履行支付义务的支出，以及用于自然灾害等突发事件处理
> 的支出。**根据上述规定**，结合中央部门和地方实际支出需要，中央财政安排了部分本级支出及对地方
> 转移支付。」
> "**In accordance with the provisions of the Budget Law**, after the budget year begins and
> before the National People's Congress approves this draft budget, the following expenditures
> may be arranged: … **In accordance with the above provisions**, and taking account of the
> actual expenditure needs of central departments and localities, the central finance authority
> has arranged part of its own-level expenditure and transfer payments to localities."
Corroborating, weaker (compliance language, not derivation):
> 「2025年，财政部门深入贯彻党中央和国务院决策部署，**认真落实预算法和人大预算审查监督有关要求**，
> 严格执行全国人大批准的预算…」
> 「推进依法行政、依法理财，坚持预算法定，硬化预算约束，**进一步全面深入实施好预算法**。」
Tense: present/operative. **This edge is solid.**

**EDGE 5 (candidate) — `cn-npc-budget-report` -> 《中华人民共和国2025年全国预算执行情况2026年全国预算（草案）》 — detail_annex**
Cited **twice**, by exact bracketed title, as the place the underlying detail lives:
> 「以上预算执行的具体情况及相关说明见《中华人民共和国2025年全国预算执行情况2026年全国预算（草案）》。」
> "For the specific situation of the above budget execution and related explanations, see the
> *National Budget Execution for 2025 and Draft National Budget for 2026 of the PRC*."
> 「预算具体安排及相关说明见《中华人民共和国2025年全国预算执行情况2026年全国预算（草案）》。」
This is an annually-published companion volume → **qualifies as a recurrent node**. I did not
locate a free-standing URL for the volume itself this round (it is tabled at the NPC session);
propose the node only if the corpus tolerates a node evidenced solely by the citing document.

**NOT FOUND, explicitly (record these as negatives):**
- The Budget Report **does not** name 国发〔1993〕85号 — 0 hits for `国发`.
- The Budget Report **does not** name 《中央对地方均衡性转移支付办法》 — 0 hits for `办法`.
  It gives only the number: 「均衡性转移支付安排28340亿元、增长3.7%」 (RMB 2.834tn, +3.7%).
  **Round 1's finding here is confirmed correct.** No edge budget-report -> 办法.
- The Budget Report **does not** mention 国家统计局 or 统计 at all — 0 hits. No CPI reference
  either (0 hits for 居民消费价格). **No edge budget-report -> cn-nbs-cpi.**

### Re-check of 政府工作报告 for 国家统计局 — **NOT FOUND (confirmed negative)**
Verification tier: **A**
URL: `https://www.gov.cn/gongbao/2026/issue_12646/202603/content_7064134.html`
(State Council Gazette 2026 No. 9 — the authoritative text)
HTTP check: `-> 200 90112`; extracted text 20,624 chars.
```
国家统计局  0 hits
统计局      0 hits
统计        3 hits — all generic ("完善统计、财税、考核等制度"; "碳排放统计核算";
                    "加强财会监督和统计监督"), none naming NBS or any statistical publication
```
The CPI target is stated with no attribution at all:
> 「今年发展主要预期目标是：经济增长4.5%—5%…**居民消费价格涨幅2%左右**；居民收入增长和经济增长同步…」
> 「**居民消费价格涨幅2%左右**，考虑了预期引导和现实可能，我们将通过改善总供求关系，推动价格
> 总水平由负转正、消费价格合理温和回升，促进经济良性循环。」
**Conclusion: NO edge `cn-npc-government-work-report` -> `cn-nbs-cpi` is supportable.** The
report sets a CPI target but never names NBS or the CPI release. Do not force this edge.
(The GWR *does* cite 《中共中央关于制定国民经济和社会发展第十五个五年规划的建议》 and
《中华人民共和国国民经济和社会发展第十五个五年规划纲要（草案）》 by name — a Party/plan
lineage, out of scope for this corpus but noted.)

---

## 4. 中华人民共和国预算法 (Budget Law) — **VERIFIED**

Verification tier: **A** (over plain HTTP — see §0.2)
URL: `http://www.npc.gov.cn/c2/c30834/201905/t20190521_296660.html`
HTTP check:
```
https://www.npc.gov.cn/...  -> curl (35) sslv3 alert handshake failure
http://www.npc.gov.cn/c2/c30834/201905/t20190521_296660.html -> 200 55301
  <title>中华人民共和国预算法_中国人大网</title> ; extracted 14,936 chars
  completeness verified: contains 第一条 … 第一百零一条 (all 101 articles, 11 chapters)
```
Title: 中华人民共和国预算法 · English gloss: "Budget Law of the People's Republic of China"
Publisher: 全国人民代表大会 / 全国人民代表大会常务委员会 (NPC / NPC Standing Committee);
hosted by 中国人大网 (npc.gov.cn), the NPC's own portal.

Periodicity: **not recurrent — a standing statute** (qualifies as a standing statutory
instrument). Enactment/amendment history, verbatim from the page header:
> 「（1994年3月22日第八届全国人民代表大会第二次会议通过　根据2014年8月31日第十二届全国人民
> 代表大会常务委员会第十次会议《关于修改〈中华人民共和国预算法〉的决定》第一次修正　根据
> 2018年12月29日第十三届全国人民代表大会常务委员会第七次会议《关于修改〈中华人民共和国产品
> 质量法〉等五部法律的决定》第二次修正）」
Commencement, 第一百零一条:
> 「本法自1995年1月1日起施行。1991年10月21日国务院发布的《国家预算管理条例》同时废止。」

**第十六条 — the transfer-payment article the brief asked about — CONFIRMED, verbatim in full:**
> 「第十六条　国家实行财政转移支付制度。财政转移支付应当规范、公平、公开，以推进地区间基本
> 公共服务均等化为主要目标。
> 财政转移支付包括中央对地方的转移支付和地方上级政府对下级政府的转移支付，以为均衡地区间基本
> 财力、由下级政府统筹安排使用的一般性转移支付为主体。
> 按照法律、行政法规和国务院的规定可以设立专项转移支付，用于办理特定事项。建立健全专项转移支付
> 定期评估和退出机制。市场竞争机制能够有效调节的事项不得设立专项转移支付。
> 上级政府在安排专项转移支付时，不得要求下级政府承担配套资金。但是，按照国务院的规定应当由
> 上下级政府共同承担的事项除外。」
> "Article 16. The State implements a fiscal transfer payment system. Fiscal transfer payments
> shall be standardised, fair and open, with **equalisation of basic public services across
> regions as the principal objective**. Fiscal transfer payments comprise central-to-local
> transfers and transfers from higher- to lower-level local governments, **with general transfer
> payments — used to equalise basic fiscal capacity across regions and arranged at the discretion
> of the lower-level government — as the main body**. Special transfer payments may be established
> in accordance with laws, administrative regulations and State Council provisions… Higher-level
> governments shall not require matching funds from lower-level governments when arranging
> special transfer payments…"

Also load-bearing for the 中央/地方 architecture, 第六条:
> 「中央一般公共预算包括中央各部门（含直属单位，下同）的预算和**中央对地方的税收返还、转移支付预算**。
> 中央一般公共预算收入包括中央本级收入和地方向中央的上解收入。中央一般公共预算支出包括中央本级支出、
> **中央对地方的税收返还和转移支付**。」

**Proposed node? YES** — `cn-budget-law`. It is the hub that both §1 and §3 point at.
Decision on the round-1 deferral: **promote it to a node.** It is cited by name, operatively,
by three separate documents in this corpus (the 办法, the Budget Report, the final accounts
report) and by the provincial instrument in §9.

**Incoming edges established this round: EDGE 1 (办法 -> 预算法), EDGE 4 (budget report -> 预算法),
EDGE 6 (final accounts report -> 预算法), EDGE 9 (Ningxia 办法 -> 预算法).**

---

## 5. 中华人民共和国国民经济和社会发展统计公报 — **VERIFIED** (a multi-edge hub)

Verification tier: **A**
URL: `https://www.stats.gov.cn/sj/zxfbhjd/202602/t20260228_1962662.html`
HTTP check: `-> 200 1118852` ; extracted text 56,213 chars (full communiqué incl. 90 endnotes)

Title (Chinese, as published): 中华人民共和国2025年国民经济和社会发展统计公报
English gloss: "Statistical Communiqué of the People's Republic of China on the 2025 National
Economic and Social Development"
Publisher, verbatim from the masthead: 「中华人民共和国2025年国民经济和社会发展统计公报[1]
国家统计局　2026年2月28日」 (National Bureau of Statistics, 28 February 2026)
Periodicity: **annual.** Evidenced by the NBS's standing annual series index
`https://www.stats.gov.cn/sj/tjgb/ndtjgb/qgndtjgb/index.html` (全国年度统计公报) and by the
year-in-title convention. Data status, verbatim endnote [1]:
> 「[1]本公报中数据均为初步统计数。各项统计数据均未包括香港特别行政区、澳门特别行政区和台湾省。
> 部分数据因四舍五入的原因，存在总计与分项合计不等的情况。」
> "[1] The data in this Communiqué are all preliminary statistics. All statistics exclude the Hong
> Kong SAR, the Macao SAR and Taiwan Province…"

**This document carries an explicit, itemised `资料来源：` (Sources) block naming ~40 supplying
bodies — it is the single richest edge source found for China.** Verbatim (extract; the full
block runs ~1,100 characters and every clause has the form "X数据来自Y"):
> 「**资料来源：**本公报中城镇新增就业、养老保险、失业保险、工伤保险、中等职业教育中的技工学校
> 数据来自人力资源和社会保障部；外汇储备、汇率数据来自国家外汇管理局；…民用汽车保有量、道路
> 交通事故数据来自公安部；…货物进出口数据来自海关总署；服务进出口、外商投资…数据来自商务部；
> **财政数据来自财政部**；减税降费及退税数据来自国家税务总局；**货币金融、公司信用类债券数据
> 来自中国人民银行**；境内交易场所筹资数据来自中国证券监督管理委员会；保险业数据来自国家金融
> 监督管理总局；…教育数据来自教育部；…平均气温、台风登陆数据来自中国气象局；…**其他数据均
> 来自国家统计局。**」
> "**Sources:** In this Communiqué, data on newly added urban employment, pension insurance,
> unemployment insurance, work-injury insurance and technical schools … **are from the Ministry of
> Human Resources and Social Security**; foreign exchange reserves and exchange rates **from the
> State Administration of Foreign Exchange**; … goods imports and exports **from the General
> Administration of Customs**; **fiscal data are from the Ministry of Finance**; tax-cut and
> rebate data **from the State Taxation Administration**; **monetary and financial data and
> corporate credit bonds are from the People's Bank of China**; … **all other data are from the
> National Bureau of Statistics.**"

Corroborating internal note tying its fiscal figures to MOF *final accounts*:
> 「注：图中2021年至2024年数据为**全国一般公共预算收入决算数**，2025年为执行数。」
> "Note: figures for 2021–2024 in the chart are **final-account figures for national general public
> budget revenue**; 2025 is the execution figure."

**Proposed node? YES** — `cn-nbs-statistical-communique` (annual, NBS).

**EDGE 6 — `cn-nbs-statistical-communique` -> MOF (财政部) — data_input**
Verbatim: 「财政数据来自财政部」 ("fiscal data are from the Ministry of Finance"). Agency-level;
the 注 above additionally specifies the *决算* (final accounts) as the vintage for 2021–2024,
which lets this be pointed at the §6 final-accounts node rather than at MOF generically.
Tense: present, declarative. Unambiguous.

**EDGE 7 — `cn-nbs-statistical-communique` -> PBoC (中国人民银行) — data_input**
Verbatim: 「货币金融、公司信用类债券数据来自中国人民银行」.

Further edges available from the same block if the corpus has the targets (all same verbatim
pattern, all agency-level): 海关总署 (customs/trade), 国家税务总局, 人力资源和社会保障部,
国家外汇管理局, 商务部, 教育部, 中国气象局, 应急管理部, 国家医疗保障局, 民政部,
国家金融监督管理总局, 中国证券监督管理委员会, 自然资源部, 生态环境部, 农业农村部,
交通运输部, 工业和信息化部, 住房和城乡建设部, 国家知识产权局, 国家统计局 (residual).
**Caveat: every one of these names an AGENCY, not a titled document.** Flag accordingly.

---

## 6. 全国财政决算 / 中央决算报告 (MOF annual final accounts) — **VERIFIED**

Verification tier: **A**
URL: `https://www.mof.gov.cn/zhengwuxinxi/caizhengxinwen/202606/t20260629_3992419.htm`
HTTP check: `-> 200 52090` ; `<title>国务院关于2025年中央决算的报告</title>` ; text 12,018 chars
(also reachable: `http://m.mof.gov.cn/czxw/202606/t20260629_3992419.htm`)

Title: 国务院关于2025年中央决算的报告
English gloss: "Report of the State Council on the 2025 Central Final Accounts"
Publisher: 国务院 / 财政部 — verbatim byline:
> 「——2026年6月23日在第十四届全国人民代表大会常务委员会第二十三次会议上
> **财政部部长　蓝佛安**
> 全国人民代表大会常务委员会：
> 我受国务院委托，向全国人大常委会提出2025年中央决算报告和中央决算草案，请审查。」
Periodicity: **annual**, delivered to the NPC Standing Committee each June — evidenced by the
title's year and the dated address line above. This is the executed counterpart to
`cn-npc-budget-report` (which is presented each March).

Citation scan:
```
预算法      3 hits   <-- REAL CITATION
决算草案    4 hits
国家统计局  0 hits
《…》       1 hit   (《党政机关厉行节约反对浪费条例》 only)
```

**EDGE 8 — `cn-mof-central-final-accounts` -> `cn-budget-law` — legal_basis**
Verbatim (operative — it is the authority for the accrual treatment):
> 「**按照预算法和国务院有关规定**，对2025年中央财政部分收支事项实行权责发生制核算，有关具体
> 情况向全国人大常委会专门报告。」
> "**In accordance with the Budget Law and relevant State Council provisions**, certain central
> fiscal revenue and expenditure items for 2025 are accounted for on an accrual basis…"
Corroborating:
> 「（六）坚持依法理财，自觉接受人大监督。**深入贯彻预算法及其实施条例**，严格落实全国人大批准的预算。」
> 「一是狠抓预算执行和政策落地。**严格落实预算法等财经法律法规**，加强财政支出管理。」

Also names the audit institution as a processing input:
> 「2025年中央一般公共预算、政府性基金预算、国有资本经营预算、社会保险基金预算的预算数、决算数
> 及其对比分析，详见中央决算草案。**草案已经审计署审计。**」
> "…see the draft central final accounts. **The draft has been audited by the National Audit Office.**"
→ candidate EDGE `cn-mof-central-final-accounts` -> 审计署 (National Audit Office), verification
relationship, agency-level.

**Does it cite the budget report? NOT FOUND.** 0 hits for 预算草案的报告 as a titled citation.
It refers to executing 「十四届全国人大三次会议审查批准的预算」 (the budget approved by the NPC
session) — that is the *budget instrument*, not the *report document*. **I judge this too weak
to draw `final-accounts -> budget-report`; do not draw it.**

**Proposed node? YES** — `cn-mof-central-final-accounts` (annual).

---

## 7. Statistics Law / NBS CPI statutory basis — **MIXED: statute VERIFIED, the CPI→statute edge NOT FOUND**

### 7a. 中华人民共和国统计法 — **VERIFIED**
Verification tier: **A**
URL: `https://www.stats.gov.cn/gk/tjfg/tjfl/202410/t20241010_1956870.html`
HTTP check: `-> 200 159367` ; `<title>中华人民共和国统计法 - 国家统计局</title>` ; text 17,262 chars
Title: 中华人民共和国统计法 · gloss "Statistics Law of the People's Republic of China"
Publisher: NPC Standing Committee; hosted by NBS. Standing statute (2024 revision).
第一条 verbatim:
> 「为了科学、有效地组织统计工作，保障统计资料的真实性、准确性、完整性和及时性，加强统计监督，
> 发挥统计在了解国情国力、服务经济社会高质量发展中的重要作用，推动全面建设社会主义现代化国家，
> 制定本法。」
第十九条 (statistical standards — the methodological hook):
> 「国家制定统一的统计标准，保障统计调查采用的指标涵义、计算方法、分类目录、调查表式和统计编码
> 等的标准化。**国家统计标准由国家统计局制定**，或者由国家统计局和国务院标准化主管部门共同制定。」
第二十条 (national accounts — the hook for §9's SNA node):
> 「**国家实施统一的国民经济核算制度。国家统计局统一组织和实施地区生产总值核算工作。**」
> "The State implements a unified system of national economic accounting. The NBS uniformly
> organises and implements the accounting of gross regional product."
**Proposed node? YES** — `cn-statistics-law` (standing statute defining method-setting authority).

### 7b. Does the CPI monthly release cite a statutory basis? — **NOT FOUND**
Verification tier: **A**
URL: `https://www.stats.gov.cn/sj/zxfb/202608/t20260809_1965008.html`
HTTP check: `-> 200 233412` ; `<title>2026年7月份居民消费价格同比上涨0.5% - 国家统计局</title>`
The release's own 附注 (explanatory notes) is complete and methodological but names **no statute
and no titled instrument**. Verbatim, the whole of the relevant notes:
> 「**附注**　1.指标解释　居民消费价格指数（Consumer Price Index，简称CPI）是度量居民生活消费品
> 和服务价格水平随着时间变动的相对数…
> 2.统计范围　居民消费价格统计调查涵盖全国城乡居民生活消费的食品烟酒及在外餐饮、衣着、居住、
> 生活用品及服务、交通通信、教育文化娱乐、医疗保健、其他用品及服务等**8大类、268个基本分类**的
> 商品与服务价格。
> 3.调查方法　采用抽样调查方法抽选确定调查网点，按照"定人、定点、定时"的原则，直接派人到调查
> 网点或从互联网采集原始价格。数据来源于**全国31个省（区、市）约500个市县、近12万家价格调查点**…
> 5.基期轮换　**按照统计制度安排**，2026年1月起，我国CPI开始编制和发布以2025年为基期的价格指数…」
The only quasi-citation is 「**按照统计制度安排**」 ("in accordance with the arrangements of the
statistical system") — a bare, untitled reference. **This does NOT support an edge
`cn-nbs-cpi` -> `cn-statistics-law`. Do not draw it.**

### 7c. But the NBS CPI *methodology* page DOES cite named instruments — **VERIFIED**
Verification tier: **A**
URL: `https://www.stats.gov.cn/zs/tjws/zytjzbqs/jmxxggzs/202411/t20241127_1957589.html`
HTTP check: `-> 200 137658` ; `<title>CPI 的编制方法 - 国家统计局</title>` ; text 14,896 chars
Page-stated provenance: 「来源: 《领导干部应知应会主要统计指标诠释》」 (an NBS publication).
**This is very likely the page round 1 folded into `cn-nbs-cpi` as its "full basket/sampling
methodology".** If so, these are edges out of `cn-nbs-cpi`; if the corpus treats it separately,
mint `cn-nbs-cpi-methodology`. **Flagging the ambiguity rather than resolving it unilaterally.**

**EDGE 9 — `cn-nbs-cpi` (methodology) -> COICOP (UN Statistical Commission) — classification_standard**
Verbatim:
> 「具体来说，**国家统计局参照联合国统计委员会《按目的划分的个人消费支出分类标准（COICOP）》
> 及我国《居民消费支出分类》**，结合全国城乡居民家庭消费支出的抽样调查资料，统一确定了"篮子"中
> 所包含的商品和服务类别，分别是食品烟酒、衣着、居住、生活用品及服务、交通通信、教育文化娱乐、
> 医疗保健、其他用品及服务共8个大类，268个基本分类。」
> "Specifically, **the NBS, referring to the UN Statistical Commission's *Classification of
> Individual Consumption According to Purpose (COICOP)* and China's own *Classification of
> Resident Consumption Expenditure***, and combining sample survey data on household consumption
> expenditure nationwide, has uniformly determined the categories of goods and services in the
> 'basket': 8 major categories and 268 basic classes."
Tense: present/constitutive ("参照 … 统一确定了"). **A clean international edge.**

**EDGE 10 — `cn-nbs-cpi` (methodology) -> 全国住户收支与生活状况调查 (NBS household survey) — data_input (weights)**
Verbatim:
> 「在编制全国CPI时，**权数资料主要根据国家统计局开展的全国住户收支与生活状况调查中城乡居民
> 家庭消费支出资料计算**，同时用其他部门的行政资料、部分典型调查和专项调查资料予以补充，并辅以
> 专家评估进行完善。」
> "**The weight data are calculated primarily from urban and rural household consumption
> expenditure data in the National Household Income, Expenditure and Living Conditions Survey
> conducted by the NBS**, supplemented by administrative data from other departments, some
> typical and special surveys, and expert assessment."

**EDGE 11 (candidate) — `cn-nbs-cpi` (methodology) -> 《居民消费价格调查方案》 — governing_instrument**
Verbatim:
> 「中国CPI编制工作由国家统计局组织实施。国家统计局负责全国CPI的编制及相关工作，**制定《居民消费
> 价格调查方案》**，对CPI的统计范围、计算方法、统计口径和填报目录等作出统一规定…」
> "…the NBS **formulates the *Consumer Price Survey Scheme***, which makes unified provisions on
> the CPI's statistical scope, calculation method, statistical caliber and reporting catalogue…"
Basket rotation, verbatim: 「根据调查方案规定，**每五年更换一次"篮子"**，本轮CPI的"篮子"固定在2020年。」
(Note: superseded in practice — the July 2026 release states the base period rotated to 2025 from
January 2026. Flagged as a dating inconsistency between the two NBS pages.)
**Caveat: I could NOT retrieve 《居民消费价格调查方案》 itself.** The related
`流通消费价格调查制度` page returned `http://www.stats.gov.cn/tjsj/tjzd/gjtjzd/201701/t20170109_1451375.html
-> 404 555`. Propose the node only if a primary URL can be found; otherwise record the citation
without minting the target.

---

## 8. PBoC 货币政策执行报告 — **NOT FOUND** (the hoped-for edge into cn-nbs-cpi does not exist in the text)

Verification tier: **A**
URL: `https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026051118520164705/2026051118500062162.pdf`
(landing page: `https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026051118520164705/index.html`)
HTTP check:
```
-> 200 1265472 ; file: "PDF document, version 1.7, 55 page(s)"
   pdftotext -enc UTF-8 -> 99,241 chars of real text (not a scan; no OCR needed)
```
Title: 中国货币政策执行报告 2026年第一季度
English gloss: "China Monetary Policy Report, 2026 Q1"
Publisher, verbatim from cover: 「中国人民银行货币政策分析小组　2026年5月11日」
("Monetary Policy Analysis Group of the People's Bank of China")
Periodicity: **quarterly** (title carries 第一季度; the PBoC 货币政策执行报告 series index at
`https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/` lists one per quarter).

**Exhaustive scan result — the decisive negative:**
```
whitespace-stripped full-text search over all 55 pages (both `pdftotext` and `pdftotext -layout`):
  国家统计局   0 hits
  统计局       0 hits
  海关总署     0 hits
  数据来源     17 hits — EVERY ONE resolves to 中国人民银行 or 中国货币网, none to NBS
  居民消费价格  3 hits (used as data, unattributed)
  CPI          9 hits (used as data, unattributed)
```
The report uses CPI extensively but **never attributes it**:
> 「（三）**居民消费价格涨幅扩大**，生产价格连续回升
> 居民消费价格涨幅继续扩大。一季度，**居民消费价格（CPI）同比涨幅为0.8%**，比上季度提高0.2个
> 百分点，月度涨幅分别为0.2%、1.3%和1.0%。…扣除食品和能源的核心CPI同比上涨1.2%…」
> 「主要价格指标继续呈现温和回升态势。一季度，CPI同比上涨0.9%…一季度PPI同比下降0.6%…」
Every 数据来源 caption in the document reads 「数据来源：中国人民银行。」 or 「数据来源：中国货币网。」

**CONCLUSION: NO edge `cn-pboc-monetary-policy-report` -> `cn-nbs-cpi`.** The dependency plainly
exists in substance (the PBoC cannot have computed CPI itself), but the **document's own text does
not name NBS or the CPI release as an input**, and the project's evidence standard requires that.
**Honest NOT FOUND. Do not draw this edge.** The report is still a legitimate *node* (quarterly,
PBoC-authored, TIER A) if the corpus wants it — just with no outgoing CPI edge.

---

## 9. Extras

### 9a. 中国国民经济核算体系（2016）-> SNA 2008 — **VERIFIED** (edge into an existing corpus node)
Verification tier: **A**
URL: `https://www.stats.gov.cn/xw/tjxw/tzgg/202302/t20230202_1893895.html`
HTTP check: `-> 200 79718` ; `<title>关于印发《中国国民经济核算体系（2016）》的通知 - 国家统计局</title>`
Title: 国家统计局关于印发《中国国民经济核算体系（2016）》的通知
文号 verbatim: 「国统字〔2017〕115号」 · Publisher: 「国家统计局　2017年7月13日」
Periodicity: standing methodological instrument, revised generationally (2002 → 2016).

**EDGE 12 — `cn-nbs-national-accounts-system-2016` -> `sna-2008` — methodological_standard**
Verbatim:
> 「**2009年，联合国等五大国际组织颁布了国民经济核算新的国际标准——《国民账户体系2008》
> （以下简称2008年SNA）。目前，绝大部分发达国家和部分发展中国家已经开始执行2008年SNA。我国国民
> 经济核算体系也需要做出相应的修订，使之与新的国际标准相衔接，提高国际可比性。**」
> "**In 2009, the United Nations and four other major international organisations promulgated the
> new international standard for national economic accounting — the *System of National Accounts
> 2008* (hereinafter '2008 SNA'). At present most developed countries and some developing
> countries have begun to implement the 2008 SNA. China's national economic accounting system
> also needs to be revised accordingly, so as to align with the new international standard and
> improve international comparability.**"
And in the operative opening clause:
> 「为加强和改进宏观经济调控…**实现与国民经济核算新的国际标准相衔接**，按照党的十八届三中全会
> 关于加快建立国家统一的经济核算制度的要求，我国对中国国民经济核算体系进行了全面系统的修订。」
Also cites its own State Council authorisation by document number:
> 「**根据《国务院关于中国国民经济核算体系（2016）的批复》（国函〔2017〕91号）精神**，现将
> 《中国国民经济核算体系（2016）》…印发给你们，请认真贯彻落实。」
→ secondary candidate edge to 国函〔2017〕91号 (State Council reply). I did not fetch that reply.
Tense: past-descriptive for the SNA promulgation, but **present-constitutive for the alignment**
("使之与新的国际标准相衔接"). I judge this a sound edge. **This is the China->SNA-2008 link the
brief hoped for.**

### 9b. Provincial instrument citing the central 办法 by name — **VERIFIED** (excellent edge)
Verification tier: **A**
URL: `https://czt.nx.gov.cn/xwzx/tzgg/202311/t20231107_4342463.html`
HTTP check: `-> 200 64122` ;
`<title>自治区财政厅关于印发《自治区对市县均衡性转移支付办法》的通知_宁夏财政厅</title>` ; text 6,088 chars
Title: 自治区财政厅关于印发《自治区对市县均衡性转移支付办法》的通知
English gloss: "Notice of the Autonomous Region Finance Department on issuing the *Measures for
Equalization Transfer Payments from the Autonomous Region to Cities and Counties*"
Publisher, verbatim: 「宁夏回族自治区财政厅　2023年11月4日」 (Ningxia Hui Autonomous Region
Department of Finance) · 来源：预算处
Periodicity: standing instrument, periodically revised — verbatim 第九条:
> 「本办法自印发之日起实行，《自治区对市县均衡性转移支付办法》(宁财预发〔2022〕544号)不再执行。」

**EDGE 13 — `cn-ningxia-equalization-transfer-measures` -> `cn-mof-equalization-transfer-measures` — derives_from**
**EDGE 14 — `cn-ningxia-equalization-transfer-measures` -> `cn-budget-law` — legal_basis**
Both from one verbatim sentence, 第一条 — this is exactly the "provincial document citing the
central formula by name" the brief asked for:
> 「第一条　为加快建立现代财政制度，建立权责清晰、财力协调、区域均衡的政府间财政关系，推进基本
> 公共服务均等化，**根据《中华人民共和国预算法》及《中央对地方均衡性转移支付办法》**，特制定
> 自治区对市县均衡性转移支付办法。」
> "Article 1. In order to accelerate the establishment of a modern fiscal system … and to advance
> the equalisation of basic public services, **in accordance with the *Budget Law of the People's
> Republic of China* and the *Measures for Equalization Transfer Payments from the Central
> Government to Local Governments***, these Measures for Equalization Transfer Payments from the
> Autonomous Region to Cities and Counties are formulated."
Confirmed a second time in the covering notice:
> 「为进一步规范自治区对市县均衡性转移支付制度，推进基本公共服务均等化，**根据《中央对地方均衡性
> 转移支付办法》等有关规定**，经报请自治区人民政府研究同意，自治区财政厅修订了…」
And it replicates the central method, verbatim:
> 「某县标准收支缺口财力补助=（市县标准收入-市县标准支出）×补助系数」
Tense: present/constitutive. **Both edges unambiguous.**
(Note: I searched for a 广东省 / 四川省 equivalent as the brief suggested; Ningxia was the one
that surfaced with a fetchable full text on a government host. Guangdong's
`http://www.gd.gov.cn/zwgk/gongbao/2015/32/content/post_3364777.html` was found but not fetched.)

---

## SUMMARY — proposed nodes and edges

### New nodes proposed (all TIER A, all with verbatim title + publisher + periodicity above)
| id | title | publisher | periodicity |
|---|---|---|---|
| `cn-budget-law` | 中华人民共和国预算法 | NPC Standing Committee | standing statute (1994, am. 2014, 2018) |
| `cn-mof-equalization-transfer-measures` | 中央对地方均衡性转移支付办法 (财预〔2022〕58号) | 财政部 | standing instrument, revised; annual cycle |
| `cn-statecouncil-tax-sharing-decision-1993` | 国务院关于实行分税制财政管理体制的决定 (国发〔1993〕85号) | 国务院 | standing, one-off (eff. 1994-01-01) |
| `cn-nbs-statistical-communique` | 中华人民共和国2025年国民经济和社会发展统计公报 | 国家统计局 | annual |
| `cn-mof-central-final-accounts` | 国务院关于2025年中央决算的报告 | 国务院/财政部 | annual (June) |
| `cn-statistics-law` | 中华人民共和国统计法 | NPC Standing Committee | standing statute (2024 rev.) |
| `cn-nbs-national-accounts-system-2016` | 中国国民经济核算体系（2016）(国统字〔2017〕115号) | 国家统计局 | standing methodological instrument |
| `cn-pboc-monetary-policy-report` | 中国货币政策执行报告 2026年第一季度 | 中国人民银行货币政策分析小组 | quarterly |
| `cn-ningxia-equalization-transfer-measures` | 自治区对市县均衡性转移支付办法 | 宁夏回族自治区财政厅 | standing, revised |

### Edges — well-evidenced (source document's own text names the target)
| # | source -> target | type | verbatim hook |
|---|---|---|---|
| 1 | `cn-mof-equalization-transfer-measures` -> `cn-budget-law` | legal_basis | 根据《中华人民共和国预算法》及其实施条例，制定… |
| 4 | `cn-npc-budget-report` -> `cn-budget-law` | legal_basis | 根据预算法规定，预算年度开始后… |
| 8 | `cn-mof-central-final-accounts` -> `cn-budget-law` | legal_basis | 按照预算法和国务院有关规定… |
| 13 | `cn-ningxia-equalization-transfer-measures` -> `cn-mof-equalization-transfer-measures` | derives_from | 根据《…预算法》及《中央对地方均衡性转移支付办法》 |
| 14 | `cn-ningxia-equalization-transfer-measures` -> `cn-budget-law` | legal_basis | (same sentence) |
| 12 | `cn-nbs-national-accounts-system-2016` -> `sna-2008` | methodological_standard | …《国民账户体系2008》…使之与新的国际标准相衔接 |
| 9 | `cn-nbs-cpi` -> `coicop` | classification_standard | 国家统计局参照联合国统计委员会《…（COICOP）》 |
| 10 | `cn-nbs-cpi` -> NBS household survey | data_input (weights) | 权数资料主要根据…全国住户收支与生活状况调查… |

### Edges — sound but agency-level (target is an agency, not a titled document) — FLAG
| # | source -> target | type | verbatim hook |
|---|---|---|---|
| 2 | `cn-mof-equalization-transfer-measures` -> 国家统计局 | data_input | 税基采用国家统计局提供的各地在岗职工平均工资… |
| 3 | `cn-mof-equalization-transfer-measures` -> 统计年鉴 (class) | data_input | 所需资料原则上来源于统计年鉴等公开资料… |
| 6 | `cn-nbs-statistical-communique` -> 财政部 | data_input | 财政数据来自财政部 |
| 7 | `cn-nbs-statistical-communique` -> 中国人民银行 | data_input | 货币金融、公司信用类债券数据来自中国人民银行 |
| — | `cn-mof-central-final-accounts` -> 审计署 | verification | 草案已经审计署审计 |
| — | `cn-nbs-statistical-communique` -> ~18 further ministries | data_input | full 资料来源 block quoted in §5 |

### Explicit NEGATIVES — do NOT draw these (each checked exhaustively against full text)
| claimed edge | verdict | evidence |
|---|---|---|
| `cn-npc-budget-report` -> `cn-mof-equalization-transfer-measures` | **NOT FOUND** | 0 hits for 办法 / 财预 in the full report; only the number 28340亿元 |
| `cn-npc-budget-report` -> `cn-statecouncil-tax-sharing-decision-1993` | **NOT FOUND** | 0 hits for 国发 in the full report (round 1 confirmed correct) |
| `cn-npc-budget-report` -> `cn-nbs-cpi` | **NOT FOUND** | 0 hits for 统计 / 国家统计局 / 居民消费价格 |
| `cn-npc-government-work-report` -> `cn-nbs-cpi` / NBS | **NOT FOUND** | 0 hits for 国家统计局 / 统计局 in the Gazette text; CPI target stated unattributed |
| `cn-pboc-monetary-policy-report` -> `cn-nbs-cpi` | **NOT FOUND** | 0 hits for 统计局 across all 55 pages; all 17 数据来源 captions = PBoC / 中国货币网 |
| `cn-nbs-cpi` -> `cn-statistics-law` | **NOT FOUND** | release's 附注 says only 按照统计制度安排 — no titled instrument, no statute |
| `cn-mof-central-final-accounts` -> `cn-npc-budget-report` | **NOT FOUND (too weak)** | refers to 人大批准的预算 (the budget), never the report document |
| anything -> `cn-statecouncil-tax-sharing-decision-1993` | **NOT FOUND** | the 2022 办法 references the *mechanism* 税收返还 but never the document number |

### Unresolved / for a future round
- 《居民消费价格调查方案》 — cited by name in the NBS CPI methodology page but **no primary URL
  found**; the related 流通消费价格调查制度 URL is a hard 404. Would convert EDGE 11 into a real edge.
- 《中华人民共和国2025年全国预算执行情况2026年全国预算（草案）》 — cited twice by exact title in
  the Budget Report; no standalone URL located (tabled at the NPC session).
- 国发〔1993〕85号 on a State-Council-operated host — only a provincial `.gov.cn` republication was
  reachable; `www.gov.cn/gongbao/` was not successfully searched for it (the gov search API is
  relevance-broken, §0.4).
- 国函〔2017〕91号 (State Council reply approving the 2016 accounting system) — cited by number in
  §9a, not fetched.
