# Node granularity — Korea, 2026-10-05 (WRITTEN the same day)

**STATUS: WRITTEN 2026-10-05 on Thomas's answers** (*"1 fix, 2 merge, 3 edition pages, 4 yes"*).
(1) The three stable-page url repairs. (2) `kr-industrial-production-detail` MERGED into `kr-mining-manufacturing-survey`
— its 2 live edges re-pointed (`_repointed_from`); the two `no-document` notes for survey -> `kr-national-business-survey`
in `jp-kr-wiring-2026-08.json`, which refused that pair BECAUSE survey and index were separate, became `resolved`
(the pair is now live, and rule 10 requires it) with the reason written into each; the survey -> index note kept its
endpoints, marked RESOLVED. (3) **Edition pages** — a standing answer, applied here to six BOK nodes, each pointed at
its latest release post on BOK's board (`/eng/bbs/E0000634/view.do?menuNo=400423&nttId=…`, all 200 with the product
in the `<title>`): balance of payments (July 2026), monetary aggregates (July 2026), flow of funds (Q1 2026), national
accounts (*"Gross National Income: Second Quarter of 2026 (Preliminary)"*), PPI (August 2026), input-output (*"2024
Updated Input-Output Tables"*). That also settled the two CHECKs: a methodology BOOK is not the release, the edition
post is. (4) Four nodes retyped to `publication`; the validator then requires `releases_per_year`, which was read from
BOK's own lists rather than assumed — Financial Stability Report 2 (June and December editions), Financial Statement
Analysis 1 (*"for 2017"* … *"for 2024"*), input-output 1 (*"2023 Updated"*, *"2024 Updated"*), national accounts 4
(quarterly releases), each with its evidence in `notes/retired-nodes-2026-10-05-kr.json`. Collision guard: 0 hits.
`validate` after: exit 0, 128/128, **3,674 / 3,456, grades unchanged, 962 zero-edge**; Korea url collisions 12 → 0;
corpus-wide 107 groups / 287 nodes. **Re-grade:** the 2 re-pointed edges, both on IMF DSBB KOR/IND00, read 200 — no
change (B `agency-not-artefact`, A `quote-found-artefact-named`). **Fixed 2026-10-06:** the survivor carried KOSTAT's dead press-release board url
(it redirected to `mods.go.kr/anse/` — KOSTAT's English site now names itself the *"Ministry of Data and Statistics"*); it
now points at the latest edition, *"Monthly Industrial Statistics, August 2026"*
(`https://mods.go.kr/board.es?mid=a20103030000&bid=11721&list_no=447252&act=view`, 200, title confirmed; the attached PDF
reports the industrial-production and manufacturing indices). Backup
`_to_delete/kr-south-korea-2026-08.pre-survey-url-2026-10-06.json`; `validate` exit 0, counts unchanged. The dry-run account follows, unchanged.

Fourth country under ruling (a), one node per document (Thomas, 2026-10-05). Method and instruments:
`notes/granularity-pilot-br-2026-10-05.md`. Artefacts: `Claude outputs/granularity-kr-2026-10-05/`.
**No data file was changed, and nothing was simulated: there is no merge to simulate.**

## Headline: no merges — one homepage group, one pair an earlier round deliberately kept apart

`measure-url-collisions.ts` (`SLICE=kr-south-korea-2026-08`; the other Korean slice, `kr-unlinked-wiring-2026-08-29`,
has none): **2 url groups, 12 nodes.**

### Group 1 — `https://www.bok.or.kr/eng`, 10 nodes: the Uruguay shape

The Bank of Korea's English homepage with a path, so it is counted here rather than among the bare homepages. Every
node is a DIFFERENT BOK product; none is a merge.

| node | class | candidate url (all answered curl 200 on 2026-10-05; `<title>` quoted) |
|---|---|---|
| `kr-bok` | **institution — url correct** | an institution node's url IS its homepage (`notes/bps-url-repair-probe-2026-09-15.md`) |
| `kr-financial-stability` | url repair — series page exists | `https://www.bok.or.kr/eng/singl/newsDataEng/list.do?menuNo=400219` — *"Financial Stability Report(목록) \| Periodicals"* |
| `kr-financial-statement-analysis` | url repair — series page exists | `…/list.do?menuNo=400222` — *"Financial Statement Analysis(목록) \| Periodicals"* |
| `kr-external-debt-reserves` | url repair — topic page exists | `https://www.bok.or.kr/eng/main/contents.do?menuNo=400196` — *"International Reserves and External Debts \| Appendices \| Foreign Exchange System"* |
| `kr-national-accounts-bok` | **CHECK** | `…/list.do?menuNo=400228` is *"Korea System of National Accounts(목록) \| Books"* — the methodology BOOK, while the node is the GDP release series. Different artefacts |
| `kr-ppi` | **CHECK** | `…/list.do?menuNo=400519` is *"Korean Price Statistics Overview(목록) \| Books"* — a methodology book covering PPI among others, not the release |
| `kr-balance-of-payments`, `kr-monetary-aggregates`, `kr-flow-of-funds`, `kr-input-output` | **edition-only** | BOK publishes each as a dated post on its statistical-release board (e.g. *"2024 Updated Input-Output Tables"*, *"Producer Price Index - August 2026(preliminary)"* seen on the homepage); no series page was found. Blocked on the open **edition-or-series** question (§3 [Thomas] item 1b) |

### Group 2 — KOSTAT press-release board, 2 nodes: NOT a merge, by an earlier round's own reading

`kr-mining-manufacturing-survey` (*Monthly Survey of Mining and Manufacturing (광업제조업동향조사) / Industrial
Production Index*) and `kr-industrial-production-detail` (*Index of Industrial Production and related short-term
industrial indicators (detailed)*). On their titles they look like one product, but the 2026-08-29 Japan/Korea wiring
round kept them apart on purpose: three of its `_dropped` notes in `jp-kr-wiring-2026-08.json` refuse edges because
a source was *"about the Production Index (Index of Industrial Production, i.e. corpus node
kr-industrial-production-detail), not about the Monthly Survey of Mining and Manufacturing's own sourcing"*, and one
records the survey → index relation as running the other way. That is a reading of the SURVEY and the INDEX DERIVED
FROM IT as two artefacts. Merging them would override it quietly (rule 13). **Left as a question.** If they stay
two, the survey node's title should lose its *"/ Industrial Production Index"* suffix, which is what makes them look
like one — and a title change needs a re-grade of the survey's one in-edge.

**Host note.** The shared url, `https://kostat.go.kr/portal/eng/pressreleases/2/1/index.board`, now redirects to
`https://mods.go.kr/anse/` (curl, 2026-10-05). It is no longer the press-release board at all. Neither node has a
working url.

## Things noticed in passing, not acted on

- **`kind` looks wrong on several BOK nodes**: `kr-input-output`, `kr-financial-statement-analysis` and
  `kr-financial-stability` are `instrument` (a legal instrument), and `kr-national-accounts-bok` is `standard`. All four
  are publications. `kind` is a closed union read by the ranking (`types.ts`); a retype is a ruling, not a url fix.
- `kr-financial-stability` is titled *"Financial Stability Report and related BOK financial-system statistics"* — a
  document plus a topic in one node; the document is the series url above.

## Questions for Thomas

1. **Write the three url repairs that have a stable page** (`kr-financial-stability`, `kr-financial-statement-analysis`,
   `kr-external-debt-reserves`)?
2. **Survey vs index** (`kr-mining-manufacturing-survey` / `kr-industrial-production-detail`): keep as two (and trim the
   survey's title), or merge?
3. **Edition-or-series** — same question as Uruguay's (§3 1b); four BOK nodes wait on it.
4. **The four `kind` values** — retype to `publication`?
