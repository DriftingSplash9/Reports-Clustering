# Technique — reading a Chinese statistical yearbook for dependencies

Written 2026-09-08 (round 29). A recipe, not a rule: `PLAYBOOK-CORPUS.md` §6/§7 carry the
rules this round produced. Read this when working any CN provincial or national yearbook.
**Every host reading here is one machine on one day — re-probe, never believe it.**

## Where the dependencies actually are

Not in the front matter. The 编者说明 (Editor's Notes) says only that the data come from
`各级地方统计局、国家统计局调查总队` — agency-level, refused by §7a, and that is the normal
case.

**The dependencies are in the per-chapter 简要说明 (Brief Introduction).** Every yearbook
puts one at the head of each chapter and its stated purpose is to disclose that chapter's
`主要内容、资料来源、统计范围、统计方法`, and it names the instrument BY TITLE. Yield from
one national yearbook (2025 edition):

| chapter | names | target |
|---|---|---|
| 国民经济核算 | 《中国国民经济核算体系（2016）》 | `cn-nbs-national-accounts-system-2016` |
| 国民经济核算 | 国际收支平衡表 …《国际收支统计手册》第六版 | `cn-bop`, `imf-bpm6` |
| 就业和工资 | 《劳动工资统计报表制度》《劳动力调查制度》 | the two NBS instruments |
| 对外经济贸易 | 《国际贸易标准分类》(SITC)、《商品名称和编码协调制度》(HS) | `hs`; SITC has no node yet |
| 农业 | 《农林牧渔业统计报表制度》《农业产值和价格综合统计报表制度》 | the two NBS instruments |
| 工业 | 《国民经济行业分类》(GB/T 4754-2017)、《统计上大中小微型企业划分办法》 | `cn-gbt-4754-2017` |
| 建筑业 / 批发零售 / 住宿餐饮 / 房地产 | the matching 《…统计报表制度》 | the NBS instruments |
| 附录 | 《中国统计摘要》《国际统计年鉴》 | no nodes yet |

A **provincial** yearbook carries the same chapter notes AND a numbered item in its 编者说明
naming the industry-classification standard (Jiangsu item 五). That item alone is a
one-edge-per-province fan-out.

## Getting the text

- **National (CSY):** `https://www.stats.gov.cn/sj/ndsj/<year>/left.htm` is the TOC frame and
  lists every chapter's 简要说明 as `html/smNN.htm`. Tables are `.jpg` — only the sm pages
  and `html/note.htm` carry text. Pages are **gb2312**; the fetcher now handles that
  (`decodeDeclared`), a browser does not need telling.
- **Provincial, HTML:** Jiangsu is the clean shape — `tj.jiangsu.gov.cn/col/colNNNNN/index.html`
  per year, server-rendered, curl-readable. The year LISTING page is JS-driven and reads empty
  to curl; the year's own page is not. Don't conclude "JS shell" from the listing.
- **Provincial, zip:** Guangdong publishes only the CD edition as a zip linked from
  `stats.gd.gov.cn/gdtjnj/content/post_NNNNNNN.html`. Inside: `page/explain.html` (编者说明)
  and `directory/NN/brief-description.html` per chapter. Citing the zip is a direct read
  (§7b); name the inner path in the basis.
- **Filenames inside a CD zip are GBK-encoded**, so `unzip -p <name>` round-tripping breaks.
  Extract to a directory and walk it.

## Traps specific to this material

- A node titled `X (中文名)` has NO reachable Chinese token — `namesTarget` strips ASCII
  parens before every door including the CJK one. Add a `title_aliases` entry. §6.
- **The same standard is spelled differently by different publishers.** NBS writes
  《商品名称**和**编码协调制度》, Guangdong writes 《商品名称**及**编码协调制度》. Both are
  aliases on `hs` now; expect more of this and check before deciding a document is silent.
- Quotes must sit inside ONE text node. These pages break sentences across `<span>`s at every
  Latin run — `（GB/T 4754-2017）`, `(HS)`, `(SITC)` are each their own element, so a quote
  spanning one will not match. Cut the span before the parenthetical; the body still names
  the artefact, and `namesTarget` reads the whole body, not the quote.
- 劳动力调查 is a substring of 劳动力调查制度. The survey and the instrument governing it are
  two artefacts and the CJK door cannot tell them apart by substring. Wire the instrument.

## Not yet minted, all named by title and all real

《批发和零售业统计报表制度》《住宿和餐饮业统计报表制度》 (NBS's current 统计制度 listing has
no page for either — that is why they are not nodes), 《中国统计摘要》, 第五次全国经济普查,
《全国农业普查条例》,《统计上大中小微型企业划分办法（2017）》,《关于市场主体统计分类的划分规定》
（国统字〔2023〕14号）, SITC, and the sector yearbooks the CSY points at
(《中国教育统计年鉴》《中国劳动统计年鉴》 etc. — but check whether the note says the data CAME
from them or merely says 详细资料见, which is a cross-reference and not a dependency).
