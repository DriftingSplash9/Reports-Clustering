# China — method and traps

**Split out of `notes/china-progress.md` on 2026-09-09 (round 38).** That file had grown to 37.6k
carrying two different things — a worklist and a body of method — and `HANDOFF.md` §1 and §3 had
both asked for the split since 2026-09-09. **The worklist stayed put**: `notes/china-progress.md`
still holds the province and city tables, the scores, the host-probe columns and the parked leads,
and it is still the file you cross a row off in. **This file is everything that tells you HOW**, and
nothing here is a live count or a status — where this file and the tracker disagree about where a
round got to, the tracker wins.

**Nothing was reworded or cut in the split.** Sections are byte-identical to what stood in the
tracker; only their file changed. One rule was ALSO restated outside China, per `PLAYBOOK.md` §1's
rule that a file leaving a read path must leave behind anything binding a different task: **"a small
body is a redirect — read it"** binds every fetch in the corpus, not just a Chinese one, so it now
has a line in `PLAYBOOK-CORPUS.md` §6 as well as its full account below.

**Read this with the tracker, not instead of it**, and read
`notes/techniques-cn-yearbooks-2026-09-08.md` for the recipes underneath both.

---

## How cities connect — the route, the shapes, and what was corrected

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
- **THE SECOND NBS LISTING, found round 37: `https://www.stats.gov.cn/sj/tjbz/gjtjbz/`** — 国家统计标准,
  the 统计标准 counterpart of the 统计制度 listing below, and it was missing from this section. Three
  pages (`index_1.html`, `index_2.html`), one landing page per standard, and it is where both hubs
  minted in round 37 came from. On it: 统计上大中小微型企业划分办法(2017) (**minted**, t20230213_1902763),
  关于市场主体统计分类的划分规定 (**minted**, t20230213_1902786), 三次产业划分规定 (1902749) and its 2012
  revision notice (1902764), 统计上划分城乡的规定 (1902742), 统计单位划分及具体处理办法 (1902747),
  公有和非公有控股经济的分类办法 (1902744), 关于统计上划分经济成分的规定 (1902745),
  统计用区划代码和城乡划分代码编制规则 (1902741), 文化及相关产业分类, 高技术产业（制造业/服务业）分类,
  战略性新兴产业分类, 数字经济及其核心产业统计分类, 节能环保清洁产业统计分类, 农业及相关产业统计分类,
  现代服务业统计分类, 生产性/生活性服务业统计分类, and more. **Reach it by reading the redirect:**
  `/sj/tjbz/` is a 625-byte JS shell pointing at `./gjtjbz/`. Sibling sections
  `/sj/tjbz/gmjjhyfl/` (国民经济行业分类) and `/sj/tjbz/tjypflml/` (统计用产品分类目录) hang off the same
  parent; the latter is a target Yunnan names and nobody has minted.
- **A THIRD NBS LISTING, found round 40: `https://www.stats.gov.cn/zs/flfg/tjlydnfghflfg/`** — the 法规
  listing, and the counterpart of the 统计制度 and 统计标准 listings above. Fifteen instruments, one landing
  page each, full text inline. On it: **关于工资总额组成的规定** (t20250117_1958348, 国家统计局令第1号 of
  1990-01-01, **minted round 40** and wired to three yearbooks), 全国人口普查条例 (t20241211_1957724),
  **全国经济普查条例** (t20241211_1957721) — both standing nodeless leads that now have a page and need only a
  citing document — 中华人民共和国统计法 and 中华人民共和国统计法实施条例 (both already nodes), 统计执法监督检查办法,
  统计调查证管理办法, 统计执法证管理办法, 部门统计调查项目管理办法, 涉外调查管理办法, 统计违法违纪行为处分规定,
  统计严重失信企业信用管理办法, 国家统计局行政处罚信息公示办法, 关于更加有效发挥统计监督职能作用的意见.
  **The lesson is not the URL, it is why nobody had it:** round 38 filed 关于工资总额组成的规定 among instruments
  "needing a NON-NBS publisher's own page found", so no round ever searched stats.gov.cn for it. **Check who
  actually issued an instrument before deciding which site to search** — a 规定 issued as a 国家统计局令 is NBS's,
  whatever section of the corpus's notes it landed in.
- **A FOURTH NBS LISTING, found round 42: `https://www.stats.gov.cn/fw/bmdcxmsp/bmzd/`** — 部门统计调查制度, the
  departmental survey systems NBS APPROVES for other ministries under the Statistics Law, one landing page per
  instrument with purpose, objects, scope, content, method and organisation inline. 36 pages (`index.html`,
  `index_1.html` … `index_35.html`), 512 entries, many instruments in two or three editions (the date in the
  path is the edition). It is where 《全国文化文物和旅游统计调查制度》 (文化和旅游部), 《市场监管统计调查制度》
  (市场监管总局) and 《外商投资统计调查制度》 (商务部) were found and minted in one round after being filed for
  four rounds as "needing a NON-NBS publisher's page" — the same mistake as 关于工资总额组成的规定, from the other
  side: **an instrument another ministry ISSUES can still have its authoritative page on stats.gov.cn, because NBS
  is the approving body.** Node caveat on each: issuer's page not found, URL on the approving host (rule 19). Also on
  it, unwired: 教育事业综合统计调查制度, 民政事业统计调查制度, 海关统计调查制度, 全国卫生健康监督统计调查制度,
  金融业综合统计制度, 交通运输综合统计调查制度, 对外承包工程业务统计调查制度 (NOT the 管理条例), 技术市场统计调查制度,
  全国假日旅游统计调查制度. NOT on it under the cited title: 生态环境统计调查制度, 广播电视人口覆盖率统计技术标准和方法.
  Grep the listing before concluding a departmental 统计调查制度 has no page.
- **NBS's 统计出版物 listing `https://www.stats.gov.cn/zs/tjwh/tjkw/tjzl/` is where 中国统计摘要 lives** (round 42):
  one page per published volume (编者, 出版社, ISBN, 出版时间, 内容简介), newest Abstract entry 2022. Three rounds
  recorded "no NBS page" for it because nobody looked under 知识 → 统计出版物.
- **THE VIEWER A BUREAU BUILDS IS NOT THE ONLY WAY IT PUBLISHES, AND THE VIEWER MAY SAY SO** (round 45, and it
  cost Guangzhou four rounds). `tjj.gz.gov.cn`'s 统计年鉴 nav goes to a zTree app at
  `/datav/admin/home/www_nj/` whose 43 year links carry no `href`, respond to no click and expose no API — a real
  dead end, correctly recorded. **What nobody read was the viewer's own grey subtitle:** 历史统计年鉴下载请访问
  【官网首页 > 统计业务 > 资源下载 > 统计年鉴电子资源】. That page (`/stats_newtjyw/zyxz/tjnjdzzz/`) publishes one
  page per edition carrying the WHOLE yearbook twice — a zip of per-table `.xls` and a single complete PDF. Seven
  edges. **Before recording a JS viewer as the obstacle, read the viewer's prose and walk the site's own
  资源下载 / 电子资源 / 数据下载 branch.** Two further specifics: the host answers the CLOUD CONTAINER perfectly
  (the "Chrome-only" verdict came from one Chrome session and was never re-probed), and **the `/attachment/` path
  503s without a `Referer` header while the browse page does not** — a WAF shape worth trying anywhere an
  attachment 503s under a page that loads.
- **NBS's 统计出版物 LISTING IS SIXTEEN PAGES, NOT ONE** (round 45). `https://www.stats.gov.cn/zs/tjwh/tjkw/tjzl/`
  paginates `index.html`, `index_1.html` … `index_15.html` — **271 entries**, one page per volume with compiling
  department, ISBN, edition and a 内容简介. Round 42 read page one and found 中国统计摘要; round 44 assumed four
  pages and left five publications "not on the listing". Three of them were. **Enumerate to the 404 before
  concluding a publication has no NBS page** — the same discipline round 30 applied to the 统计制度 article-id
  range. It is also where to upgrade a publication node whose URL is the bare host.
- **THE NATIONAL YEARBOOK'S CHAPTER NOTES NAME THE MINISTRY PUBLICATION BEHIND EACH CHAPTER** (round 45), under
  二、本篇的资料来源 and in a fixed form: 详细资料（分别）见《X》（编者）. Twelve of them across sm21-sm25 —
  education ×2, health and social services ×4, culture and media ×3, labour and social security ×3, construction
  and regions ×2 — each naming the publication AND its compiling body. **Wire these as `cites`, not
  `uses_data_from`:** the sentence says the detail is to be found there, not that the yearbook's own figures were
  taken from it, and both publications draw on the same ministry's returns. The same notes ALSO carry
  由X部根据其《Y制度》汇总整理提供 sentences, and those ARE `uses_data_from` — the difference is whether the
  sentence describes a transfer of data or a cross-reference.
- **EVERY PAGE ON NBS's 统计制度 LISTING HAS THE INSTRUMENT ATTACHED, AND THE PAGE ITSELF SAYS NOTHING**
  (round 44). `https://www.stats.gov.cn/sj/tjzd/` — the listing round 30 learned to probe past — serves 24
  instruments at ids **1962929-1962952** (1962953+ is 404, so the range is closed), and each page's whole body is
  five characters: 具体内容见附件. The attachment is the instrument's 主要内容 and carries, in a fixed house form,
  the three sentences this corpus wires on: **依照/根据《中华人民共和国统计法》，制定本制度** (legal basis),
  **本制度执行国民经济行业分类（GB/T 4754—2017）等统一的国家统计分类和编码标准** (note the EM DASH in NBS's own
  spelling), and **六、统计资料的报送和公布**, which names the publications the results appear in — that last one
  gives a `uses_data_from` edge from the yearbook to the instrument, first-party at both ends. Fourteen rounds
  passed with twelve of these instruments in the corpus and not one out-edge between them, and the reason was not
  research: **the attachments are legacy binary `.doc` and the grader could not read one.** Fixed round 44 (see
  the fetcher branches in `HANDOFF.md` §2). Grep the attachment, never the landing page.
- **A CJK PUBLICATION NODE NEEDS ITS CHINESE TITLE IN `title_aliases`, OR A CHINESE DOCUMENT CANNOT NAME IT**
  (round 44). `namesTarget` strips ASCII parentheses before matching, so a node titled `China Rural Statistical
  Yearbook (中国农村统计年鉴)` is invisible to a document that names it in full in Chinese — the §6 line about
  parentheses, met head-on. It had never bitten because the provincial yearbooks are BILINGUAL and matched on the
  English title; NBS's instruments are Chinese-only. Five nodes gained an alias this round (中国统计年鉴,
  中国农村统计年鉴, 中国县域统计年鉴, 中国城市统计年鉴, 中国能源统计年鉴), following cn-statistical-abstract's
  中国统计摘要 from round 42. **Check the alias before writing a Chinese quote against an English-titled node.**
- **TWO NBS INSTRUMENTS HAVE NO NBS PAGE AND THE PROVINCES PRINT THEM** (round 44) —
  《一套表统计调查制度》, the integrated form set behind every above-threshold return, and
  《农业产值与增加值核算统计报表制度》. Neither is on the 统计制度 listing and the site search is JS-driven and
  returns nothing. Guangdong attaches the whole 一套表 instrument to `stats.gd.gov.cn/pc/content/post_4874105.html`
  as a .docx and Jiangsu attaches the identical document at `art_85333_11737396`; Jiangsu attaches the agricultural
  one at `art_85333_11737411`. Both covers read 国家统计局制定, so both are NBS nodes with the issuer-page caveat —
  the round-40 precedent Thomas ruled, on a second and third province.
- **CONCURRENT `soffice` CONVERSIONS EAT EACH OTHER** (round 44, measured). LibreOffice takes an exclusive lock on
  `~/.config/libreoffice`, so with the grader at its default concurrency the first conversion wins and the rest exit
  silently — the edge records `empty:no-extractor` against a document that reads perfectly, and WHICH edges fail
  changes run to run (2 failures, then 5, over the same 39 edges). `-env:UserInstallation=file://<tmpdir>` per
  conversion fixes it. If you ever convert in parallel outside the grader, do the same.
- **A PROVINCIAL BUREAU PUBLISHES A 年定报制度目录, AND IT IS THE PORTAL FOR PROVINCIAL INSTRUMENTS** (round 40).
  Shanghai's is `https://tjj.sh.gov.cn/ndbzdml/index.html`: 20 numbered reporting systems for the 2025 年报/2026
  定报 cycle, each a landing page carrying the instrument itself as a first-party PDF. **Read the COVER of the
  PDF, because it settles authorship in one line** and the catalogue splits cleanly along the title:
  entries with a plain national title (固定资产投资, 房地产开发, 建筑业, 劳动工资, 批发和零售业, 住宿和餐饮业)
  read **国家统计局制定 / 上海市统计局补充、印制**; entries whose title carries 上海市 (上海市核算综合统计报表制度,
  上海市建设领域基本信息综合统计报表制度) read **上海市统计局制定** or **上海市统计局印制** with no NBS line.
  This is where round 40 found pages for the two trade hubs after eleven rounds, and where it overturned round
  39's authorship ruling. **Look for the equivalent section on every other bureau site** — it is a sibling of
  统计制度/统计服务 in Shanghai's nav and nobody has checked whether other provinces expose one.
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
- **THE NATIONAL YEARBOOK HAS TWO CHAPTER-NOTE LAYERS AND ROUNDS 29-37 READ ONLY ONE** (found
  round 38). `left.htm` lists `html/smNN.htm` (简要说明, 29 of them) **and `html/zbNN.pdf`
  (主要统计指标解释, 27 of them)** side by side, and every line written here before round 38 named
  only the sm layer. The zb layer names eleven 《》-titled instruments the sm layer does not; two of
  them (文化及相关产业分类（2018）, 统计用产品分类目录) had NBS landing pages and were minted and
  wired in round 38. **Read `left.htm`'s whole href list, not the pattern you expected** — round 37
  already found the mirror image of this, provinces publishing 指标解释 and no 简要说明 at all.
  Two gaps in the source itself, not in the sweep: `zb10.pdf` has a corrupt xref poppler cannot
  reconstruct, and `zb27.pdf` 404s. Tables are `.jpg` — only the sm and zb pages carry text.
- **The zb PDFs are TWO-COLUMN, and `pdftotext` without `-layout` splices the columns mid-title.**
  《文化及相关产业分类管理（经部门审批并领取营业性演出许可证），有观众席、(2018)》 is two columns
  interleaved, not a mangled title. Run both renderings before reading a title as garbled — and the
  grader reads three, so a title broken across the column break still grades A.
- **WHITESPACE INSIDE A CJK TITLE DEFEATS namesTarget** (round 42). `normalizeForMatch` collapses runs of
  whitespace to one space and never removes it, so a title the publisher's export split with a stray space
  (Nanjing's 《三次产业 划分规定》, hesuan/2-4.html) or a PDF broke across a line in every rendering (Shandong's
  《中国统计 / 摘要 2025》, sm23.pdf) matches nothing, and the edge grades **B `quote-found-target-not-named`**
  with the title plainly on the page. Two edges carry it this round; do not add a spaced alias to game it — it
  is a normaliser question for the renderer/tooling lane, and the B is honest until it is answered.
- **A GENUINE ONE-DEFINITION PAGE UNDER 200 CHARACTERS GRADES C `empty:tiny-body`** (round 42). The fetcher's
  wall gate treats any 200 with under 200 characters of extracted text as a shell; Shanghai's C1505 (港口货物吞吐量,
  174 characters) is the publisher's real page and names 《运输货物分类和代码》 in full. Shanghai's per-indicator
  ZBHTML pages will hit this again. Same answer: record the C with the reason, do not pad the page.
- **Inside a ZIP, the grader reads html/txt/csv/md, then docx/pdf, then (since round 42) xlsx and legacy xls** —
  the third pass converts .xls with one batched `soffice --headless --convert-to xlsx` per directory. Hubei's
  table notes (xls only, no PDF in the zip) were unreadable to it before; Yunnan's graded in round 37 only
  because its zip also ships the whole book as a PDF. A `[zip: …]` marker in a record now names the workbook.
- **A FLAKY ARCHIVE HOST IS RESUMED, NOT CALLED DEAD** (round 42). stats.gd.gov.cn reset the 21.5 MB CD edition at
  19,410,770 bytes on three consecutive grader runs and served the rest in seconds on a fresh connection; the
  fetcher now retries an archive up to three times with `curl -C -` before recording `network:`, and the
  archive ceiling is 600 s (was 300). Fourteen live Guangdong A edges would otherwise have re-graded C.
- **The grader's CJK span floor is 10 characters, and a short Chinese title is under it** (round 38).
  `文化及相关产业分类` is 9 and graded **B `no-quoted-span`** with the document read perfectly and the
  title present; the same edge graded A the moment the stored span was widened to `指《文化及相关产业分类`.
  When a CJK quote fails on a document you can see the title in, count the characters before
  re-reading anything.
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

## A UNIFORM small body across a whole batch — round 39, and it is the round-37 lesson at scale

Round 39 fetched all 216 of Shanghai's chapter-note pages and every single one came back **1085
bytes**. That is not a coincidence and it is not a redirect: it is the site's **404 page, served with
HTTP 200**. The publisher's own table of contents links `d1=2025tjnj/zbhtml/C0001.htm`; the server
serves only `2025tjnj/ZBHTML/C0001.htm`. **The path is case-sensitive and the publisher gets its own
case wrong.**

**So the rule generalises: a batch whose responses are all the same size is one response, and you
have not read it yet.** Round 37's version was one small body; this is 216 identical ones, which is
a louder signal and was nearly walked past anyway because 216 files arriving looks like success.
`ls -la | sort -k5` before extracting, and `cat` the first file.

Try case variants before concluding a path is wrong: lowercase, uppercase, `.htm`/`.html`. Shanghai
cost one round-trip to settle once the question was asked.

## AUTHORSHIP — round 39's rule, CORRECTED BY ROUND 40: READ THE INSTRUMENT, NOT THE CITATION

**Round 40 overturned the conclusion below and Thomas ruled on it 2026-09-09. Both edges are live.**
Round 39 had only the yearbook's sentence. Round 40 opened the instruments themselves, in Shanghai's own
年定报制度目录, and **both covers read 国家统计局制定 / 上海市统计局补充、印制** — NBS formulated them; Shanghai
supplemented and printed them. So do the covers of 建筑业统计报表制度 and 劳动工资统计报表制度, which round 39
wired to NBS nodes off 国家统计局制定的. The corpus was treating four identically-authored instruments two
different ways, and the yearbook's 上海市统计局制定的 is simply loose about which bureau produced the local
edition it used.

**What survives, and it is the useful half.** A provincial instrument with a national title IS a real
category — Shanghai's catalogue proves it, because its 上海市-titled entries say 上海市统计局制定 with no NBS
line at all. And the look-alike trap is real: 农业产值 remains three yearbooks, three spellings, one apparent
instrument. **What does not survive is INFERRING the issuer from the citing sentence when the instrument is
one fetch away.** The citing document is evidence that a title was used; the instrument is the authority on
who issued it. Fetch it before recording a look-alike, and before minting a provincial twin that may not exist.

The original section follows unchanged, because its reasoning is what round 40 had to test.

## AUTHORSHIP INSIDE THE SENTENCE DECIDES THE TARGET — round 39 (SUPERSEDED, see above)

Shanghai's yearbook names four instruments whose titles match live NBS nodes exactly. Two of the
four are not NBS's:

- 本篇建筑业企业统计数据是根据**国家统计局制定的**《建筑业统计报表制度》整理汇总的 → NBS's. Wired.
- 城市基础设施建设…投资统计资料依据**上海市统计局制定的**《固定资产投资统计报表制度》收集整理提供 →
  **Shanghai's own instrument, wearing NBS's title.** Not wired.

**Read the words before the 《.** This is the 农业产值 look-alike trap in its hardest form: there the
titles differed and character-by-character comparison caught it, here the titles are *identical* and
only the issuer differs, so nothing about the title can catch it. A provincial instrument with the
same name as a national one is a **mint lead** — provincial-bureau instruments ARE nodes (Thomas,
2026-09-09), and the bar is a page on the issuing bureau's own site — not an edge to the NBS node.

## A MIS-DECLARED CHARSET THAT THE GUARD SURVIVES BY ACCIDENT — round 39

Every page of Shanghai's yearbook declares `charset=gb2312` in its meta and is served UTF-8 with an
HTTP header that says `charset=utf-8`. `decodeDeclared()` in the grader **reads the meta and ignores
the header**, so it decodes as gb18030 — and gets the right answer anyway, because its tie-break is
`decoded.split('\uFFFD').length < asUtf8.split('\uFFFD').length` and gb18030 accepts almost any byte
sequence: the mojibake carries ZERO replacement characters, loses a strict `<` comparison, and UTF-8
is returned. Verified by running the real function over the real bytes rather than reasoning about
it, and all five Shanghai edges graded A.

**Nothing was changed. It is recorded because the guard passes for a reason nobody designed**, and
the next page that declares one legacy encoding while being served as another may not be so lucky —
a page that really is gb18030-decodable into *plausible* text would win the comparison.

## A SMALL BODY IS A REDIRECT — READ IT (round 37, and it is the cheapest lesson in this file)

Round 36 recorded Hubei's 统计年鉴 link as *"returns 200 with a 71-BYTE body, an empty shell"* and
moved on. **Those 71 bytes are the answer**:

```
<script language="javascript">
window.location = "./qstjnj/";
</script>
```

`./qstjnj/` is the yearbook listing, fifteen editions of it. The same shape then appeared twice more
in the same round — **Xinjiang's** `/tjj/tjsj/jump.shtml` is 954 bytes wrapping
`<p id="url">/tjj/zhhvgh/list_nj1.shtml</p>` in a `display:none` div that a script reads and follows,
and **NBS's own** `/sj/tjbz/` is 625 bytes redirecting to `./gjtjbz/`, which is the national
statistical-standards listing this file's portal section did not have.

**So: never record a byte count as a verdict. `curl` it and `cat` it.** Round 36's Hunan finding
(open the landing page in Chrome and watch the address bar) is still right when the navigation is
real client-side routing — that is what Hunan does — but three of the four cases here were solved by
reading the body, and Chrome is the expensive tool. Order: read the shell, then Chrome.

## "No 年鉴 link on the homepage" is a fact about a homepage, not a site — round 37

Round 36 grouped Yunnan, Xinjiang, Jilin, Xizang and Hainan as *"answer at the root but expose NO
年鉴 link on the homepage at all"*. Four of the five have one; it is one level down.

- **Yunnan** publishes under the 政府信息公开 tree — `/zwgk/zfxxgk/fdzdgknr/tjsj/tjnj/`, reached by
  following 统计数据 from the homepage into 法定主动公开内容 and reading the SECTION list, not the
  news links. Editions back to 2010.
- **Jilin** is at `/tjsj/tjnj/`, a sibling of the 统计公报 section the homepage does link.
- **Xinjiang** is behind the JS shell above.
- **Xizang** genuinely has none, and the proof is in the markup: its 统计年鉴 label is inside an
  HTML COMMENT — `<a href="./xxgk/tjxx/tjsj/">统计数据</a><!--<a href="javascript:;">统计年鉴</a>-->`
  — a placeholder left in the site template, which is why it looked like a `javascript:;` stub.

**Method, in order, and it is three fetches:** homepage → the 统计数据 / 数据资料 section → that
section's own SECTION list (not its article list). If nothing, read every small response body.

## Yearbooks come as zips of Office documents, and the grader could not read them — round 37

A sixth and seventh physical shape, both zips and both distinct from Guangdong's CD edition:

- **Hubei** — a 6.4MB zip of per-chapter `.xls` tables plus one `第N章指标解释.docx` per chapter (21),
  and **no 编者说明 anywhere**. The methodology sentences are in the .docx files.
- **Yunnan** — a 10.7MB zip holding the whole 512-page book as one InDesign PDF, a 目录 PDF,
  per-chapter `.xlsx`, and per-chapter 主要指标解释 `.docx` **in Chinese and English side by side**.
  Its table notes are as productive as its chapter notes: the 关于市场主体统计分类的划分规定 edge
  came from the note under table 1-12, not from a chapter note at all.

**Two defects in `scripts/grade-evidence.ts` had to be fixed before either could be graded**, and
both would have silently capped any future zip-shipped yearbook:

1. `extractZipDocs` walked `html|txt|csv|md` ONLY. A zip of .docx extracted to nothing. It now takes
   a **second pass over .docx and .pdf entries after the markup pass**, so the byte budget is spent
   in the old order first and Guangdong's committed record is byte-identical.
2. **Info-ZIP exits non-zero on a warning, and that rejection was aborting the whole zip branch.**
   Hubei's archive has a local/central filename mismatch on all 392 entries
   (`mismatching "local" filename (湖北统计年鉴2025-定/)`), so `unzip` warned, exited 1,
   `execFileAsync` rejected, and the grader recorded `empty:no-extractor` — *"the publisher shipped
   an empty zip"*, which is false; Python's `zipfile` reads it perfectly. The unzip call now has its
   own try/catch, and **if nothing landed on disk it retries with `-UU`**, which takes the local
   names and extracted all 392. `-UU` is a rescue and not the default, because it would also rename
   archives that already work and those names go into committed `[zip: <path>]` markers.

**The diagnostic to keep: an archive that extracts to nothing is not an empty archive.** Check
`unzip -Z1` or Python's `zipfile` before believing a zip is empty. And a legacy binary `.doc`
(Hubei's chapter 9) converts with `soffice --headless --convert-to docx`; converting to `txt` loses
every CJK character to `?`.

## The chapter-note genre does not matter — round 37

Rounds 29-36 tracked 编者说明 vs 简要说明 vs 主要统计指标解释 as if the genre predicted yield. It does
not. **Hubei, Yunnan and Jilin all publish 指标解释 (indicator DEFINITIONS) rather than 简要说明
(chapter scope notes)**, and Hubei and Jilin carry the GB/T 4754 sentence in the 综合 chapter's
指标解释 word for word as Hunan carries it in its zb01:

> 自2017年年报和2018年定期报表开始使用新的《国民经济行业分类》(GB/T 4754-2017)

**What matters is only whether per-chapter prose exists in extractable form.** Sweep whatever prose
the yearbook has, whatever it is called, and grep for 《.

## "The host answers" is a weak signal — round 36

The tracker's 200s mean the bureau's website is up. They say nothing about whether the yearbook is
**locatable** or **readable**, and round 36 found a distinct failure at each step across eight
probed-and-nodeless provinces:

- **Locatable but unreadable** — Fujian. Yearbook found in the standard frameset shape, 21 chapter
  notes fetched, and every one extracts to nothing: Type1 fonts, no `/ToUnicode`, no images. OCR
  territory.
- **Readable but not locatable by path** — Hunan. No hostname path serves it; the landing page
  navigates a browser to a **bare IP**. Three curl path-guesses found nothing because nothing was
  there to find.
- **Neither** — Hubei's own 统计年鉴 link returns a 71-byte shell; Yunnan, Xinjiang, Jilin and Xizang
  expose no 年鉴 link on the homepage at all (Xizang's is a `javascript:;` stub); Hainan exposes only
  its economic-census yearbook.

**So budget a provincial mint at "find it, then prove it reads", not at "wire it".** Two cheap moves
carry most of the value: open an edition landing page in Chrome and watch the address bar (that is
the whole Hunan finding), and run `pdffonts` on ONE chapter note before fetching the rest — CID
TrueType with `uni yes` extracts, Type1 with no ToUnicode never will.

**A diagnosis that is a red herring:** poppler's `Expected the optional content group list` error
appears on Hunan's notes AND Fujian's. Hunan's extract perfectly. The OCG error is noise; the font
table is the diagnosis.

**And a self-inflicted one worth knowing:** `WEAK_BASIS_PATTERNS` matches on the basis prose you
write, with no notion of negation. Round 36's Hunan edge graded **B on `inferred`** because its
basis said "the edition is stated, not inferred". Reworded, nothing else changed, it graded A.
Never use the guard's trigger words in a basis, even to deny them.

## The two-chapter shortcut is NOT reliable — corrected by round 35

Rounds 29-31 established that 建筑业 and 农业 "have named an NBS 统计报表制度 by title in every
yearbook checked so far" (national, Jiangsu, Guangdong, Wuhan, Xi'an), and handoff 081 sent round 35
to open those two first. **In Shandong both are agency-level and name no instrument at all.**
建筑业 gives only 本篇资料来源于建筑业统计年报，由省统计局投资处整理提供 — a generic annual-return
description plus an internal division — and 农业 attributes its data to five provincial departments
and 农村综合统计年报. Both are the ordinary §7a refusal and are recorded in
`cn-shandong-2026-09-09.json`'s `_dropped` so nobody re-opens them.

**What Shandong's own productive chapters were instead: 就业工资 (sm04), 批发零售/住宿餐饮 (sm18),
and the two appendix chapters (sm23/sm24).** So the productive chapter varies by province and the
five-yearbook run was a sample, not a pattern. **Sweep every chapter note and grep for 《, do not
start from the two-chapter shortcut** — the notes are one small fetch each (25 of them here, under
a minute) and the sweep is what found sm18 and sm23, which two targeted fetches would have missed.

**A fifth physical SHAPE, beyond round 31's four.** Shandong is image-only and text-bearing at the
same time: 387 `.jpg` table scans and an image 编辑说明, but 25 chapter notes as separate single-page
PDFs with embedded Identity-H CID fonts that `pdftotext` reads cleanly. **"The yearbook is scanned"
is not a verdict about its chapter notes** — check the notes separately from the tables, and
`pdffonts` on one note answers it in a second.
