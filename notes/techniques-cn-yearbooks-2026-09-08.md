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

---

## Added 2026-09-09 (round 37) — the zip-of-Office-documents shape

Two provinces publish the whole yearbook as one first-party zip whose readable parts are **Office
documents, not HTML**: Hubei (21 `第N章指标解释.docx`, no 编者说明 at all) and Yunnan (18
`主要指标解释.docx` in Chinese and English, plus the entire 512-page book as one PDF). Neither
publishes those files at any other URL, so the zip is the only citable route — which §7b already
allows.

**Three mechanical traps, all fixed in `scripts/grade-evidence.ts` this round but worth knowing
before you plan a fetch:**

- **`unzip` can exit non-zero and still be fine.** Hubei's archive disagrees between its local and
  central filename records on all 392 entries; Info-ZIP warns, exits 1, and — before this round —
  that rejection aborted the grader's whole zip branch, which then recorded `empty:no-extractor`.
  **An archive that extracts to nothing is not an empty archive.** Cross-check with Python's
  `zipfile` (it trusts the central directory) or `unzip -Z1` before believing it.
- **`unzip -qq -o -UU` is the rescue** when the ordinary extraction writes zero files: it takes the
  local names and ignores the Unicode reconciliation. Do not make it the default — it renames
  archives that already extract fine, and those names end up in committed `[zip: <path>]` markers.
- **A legacy binary `.doc` needs `soffice --headless --convert-to docx`, never `--convert-to txt`.**
  The txt path drops every CJK character to `?`. Convert to docx and read `word/document.xml`.

**Reading a .docx the way the grader does**, so a quote you store actually matches: `unzip -p f
word/document.xml`, then the equivalent of `stripHtml` — which puts a SPACE where each tag was.
Word splits a sentence across `<w:r>` runs at every formatting change, so the "quote must sit in one
text node" rule applies to .docx exactly as it does to HTML. Hubei's chapter 1 happens to be one
clean run and takes a quote carrying both the title and the number; Jilin's Word-exported HTML puts
every Latin run in its own `<span>`, so its quote has to stop before `（GB/T4754-2017）`.

## Added 2026-09-09 — where the citation actually sits

Not only in the chapter notes. **Yunnan's strongest citation is the note under table 1-12**
(`注：本表登记注册统计类别按《关于市场主体统计分类的划分规定》（国统字〔2023〕14号）执行`), and its
《中国统计摘要》 lead is a table note too. Table notes are cheap to sweep once you have the whole book
as text — grep the extracted PDF for `注：` as well as for 《 — and §7a already settles that a table
NOTE naming an instrument grades A while a table ROW alone does not.

**And `pdftotext` mangles the CJK bracket pair 〔 〕 into `{ }`.** Cut the stored span before any
document number written with them.
