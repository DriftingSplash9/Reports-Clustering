# Node granularity — China, 2026-10-05 (WRITTEN 2026-10-06)

**STATUS: WRITTEN 2026-10-06 on Thomas's answers** (*"1 fix, 2 c"*). (1) The nine edition-page url repairs in the table
below, in `cn-china-2026-08.json`. (2) Option (c): `cn-labour-force-survey` (in `publisher-cluster-cn-2026-09-05.json`)
now carries NO url — the key removed as on `uz-oked`/`uz-coicop`, the old one kept in `_url_original` and the reason in
`_no_url_reason`. No node merged, no edge moved, so no re-grade was owed (the grader reads an edge's evidence_url and
its target's title, neither changed). Both slices backed up to `_to_delete/*.pre-url-2026-10-06.json`; change log
`Claude outputs/granularity-cn-2026-10-05/cn-url-changes-2026-10-06.json`. `validate` after: exit 0, 128/128,
3,674 / 3,456, grades unchanged; NODE URLS index-page 125 → 116, **no url at all 22 → 23 (deliberate)**; China url
collisions 11 → 0, corpus-wide 105 groups / 276 nodes. The dry-run account follows, unchanged.

Fifth country under ruling (a), one node per document (Thomas, 2026-10-05). China is CLOSED AND PAUSED (§1); this
pass was opened on Thomas's explicit request ("run the China dry run") and touches only the 11 url-sharing nodes.
Method and instruments: `notes/granularity-pilot-br-2026-10-05.md`. Artefacts: `Claude outputs/granularity-cn-2026-10-05/`.
**No data file was changed.**

## Headline: no merge needed — nine url repairs, and one pair to rule on

`measure-url-collisions.ts`, corpus-wide filtered to `cn-`: **2 url groups, 11 nodes**, across three slices
(`cn-china-2026-08.json`, `publisher-cluster-cn-2026-09-05.json`, `cn-nbs-reporting-systems-2026-09-08.json`).

### Group 1 — `https://www.stats.gov.cn/english/pressrelease`, 9 nodes: a DEAD index page

**The shared url answers 404** (curl, 2026-10-05, 555 bytes). The live index is the capitalised
`https://www.stats.gov.cn/english/PressRelease/` (200). Nine distinct NBS releases share the dead one; **none is a
merge**. Under the edition-page rule (Thomas, 2026-10-05) each gets its latest English release page. All nine answered
curl 200 from this machine with the product in `<title>`; collision guard: 0 hits.

| node | latest edition (base `https://www.stats.gov.cn/english/PressRelease/`) | NBS's title |
|---|---|---|
| `cn-cpi` | `202609/t20260910_1965275.html` | Consumer Price Index in August 2026 |
| `cn-ppi` | `202609/t20260910_1965274.html` | Industrial Producer Price Indexes in August 2026 |
| `cn-industrial-value-added` | `202609/t20260917_1965348.html` | Industrial Production Operation in August 2026 |
| `cn-fai` | `202609/t20260916_1965343.html` | Investment in Fixed Assets from January to August 2026 |
| `cn-real-estate-investment` | `202609/t20260916_1965342.html` | Investment in Real Estate Development from January to August 2026 |
| `cn-retail-sales` | `202609/t20260916_1965341.html` | Total Retail Sales of Consumer Goods from January to August 2026 |
| `cn-energy-production-monthly` | `202609/t20260916_1965338.html` | Energy Production in August 2026 |
| `cn-grain-production` | `202512/t20251215_1962079.html` | Bulletin on the National Grain Production in 2025 |
| `cn-rd-expenditure` | `202510/t20251010_1961462.html` | Communiqué on National Expenditures on Science and Technology in 2024 |

Two edition choices worth naming: `cn-grain-production` gets the ANNUAL bulletin (its title's exact wording), not the
later *"Bulletin on the National Summer Grain Output in 2026"*, a seasonal one; `cn-rd-expenditure` gets the 2024
communiqué because the 2025 one was not on the index on 2026-10-05.

### Group 2 — the NBS 劳动力调查制度 page, 2 nodes: survey vs its governing instrument

- `cn-nbs-lfs-reporting-system` (`instrument`, 劳动力调查制度) — the annually reissued document that governs the survey. The
  url IS this document; correct as it stands. One live in-edge: `cn-statistical-yearbook ->` it, A, quoting
  《劳动力调查制度》 by name.
- `cn-labour-force-survey` (`publication`, 劳动力调查) — the survey itself. Its own `cadence_note` (2026-09-05 round): *"results
  are published through the surveyed unemployment rate rather than as a standalone release. The survey system document
  (劳动力调查制度) is reissued annually."* So it has **no document of its own**; the instrument's url is the nearest thing
  it has. The 2026-09-08 round wrote into the instrument's description that it is *"Distinct from the survey itself"*.
  One live in-edge: `cn-urban-surveyed-unemployment ->` it, `uses_data_from` A, quoting
  *"调查失业率的基础数据来源于劳动力调查。劳动力调查是国务院批准建立的一项重要统计调查制度…"*.

**Why this is not Korea's survey-and-index pair.** There both nodes were statistical products. Here one is the
instrument and the other an activity with no publication, and the A edge's quote names the ACTIVITY (劳动力调查), not
the document (劳动力调查制度). A merge would re-point a `uses_data_from` onto an `instrument` and likely cost the A, since
the grader matches against the target's title.

**Variant simulated** (`cn-plan-variant.json`, survey → instrument): 1 edge re-points, none dropped, no `_dropped`
note names either id; `cn-nbs-lfs-reporting-system` rank 2,608 → 2,454 (+27% authority); **1 of 3,673 nodes changes
authority by more than 1%**.

## Questions for Thomas

1. **Write the nine edition-page url repairs?**
2. **The labour-force pair:** (a) leave as two (the instrument is a document, the survey an activity whose data the
   unemployment release cites — closest to how the 09-08 round set it up); (b) merge the survey into the instrument
   and accept a likely A → B on the unemployment edge; or (c) give `cn-labour-force-survey` no url (like Uzbekistan's
   classifiers) since it has no document of its own. **Recommended: (c)** — it ends the url collision without
   overriding the 09-08 distinction or moving an A.
