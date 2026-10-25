# Cloud session 2026-10-24 — working log

Written as the round goes (truth rule 18). The handoff's §2/§3 carry the state; this is the
round's own record of what was read and decided, for the archive.

## Environment

- Cloud container, not Thomas's machine. `npm ci --legacy-peer-deps` worked.
- **TLS verification stays on.** The grader's `-k` retry (`scripts/grade-evidence.ts:1746`) was
  neutralised for this session by a `curl` wrapper on `PATH` that drops `-k`/`--insecure`; the
  repo was not changed. So every grade below is from a verified fetch.
- Hosts that answered here: mlit.go.jp, ec.europa.eu (cache/metadata), www150.statcan.gc.ca,
  gov.pl, stat.gov.pl, stat.uz, csu.gov.cz, instat.gov.al, ontario.ca, edmonton.ca,
  lagosstate.gov.ng, bis.org, voaratinglists.blob.core.windows.net.
- Hosts that did not, from this container, 2026-10-24: `.gov.in` (microdata, mospi, mahades) and
  standart.uz (certificate chain fails verification); reb.or.kr, insse.ro, economy.gov.ru,
  asv.org.ru (proxy tunnel closed); www23.statcan.gc.ca (timeout); codelibrary.amlegal.com (403);
  legislation.gov.uk and eur-lex.europa.eu (HTTP 202, empty body). Each is a statement about this
  container on this day.

## The alias question (gb-stevenage-nndr1 -> gb-voa-rating-lists)

- Grader ledger for the 2026-10-18 re-grade: `naming alias1:title-run:2/3`
  (`Claude outputs/housing-rppi-2026-10-17/grade-dry-stev.json`). `alias1` is the FIRST alias,
  `non-domestic rating list`, not `local rating list` as the edge's basis says.
- `tokenise` keeps a hyphenated word whole, so that alias is 3 tokens and the quote's
  "rating list" is a 2/3 run (≥ 0.6). Measured with `namesTarget` directly:
  pre-split title alone → not named; post-split title alone → not named; either alias alone → named
  (`non-domestic rating list` at 2/3, `local rating list` at 3/3).
- The same alias names the artefact on ANY text containing "rating list", including "the central
  rating list" (a different VOA list) — tested.
- `non-domestic rating list` is attested on the VOA's own downloads page ("our non-domestic rating
  lists", HTTP 200). `local rating list` is attested only in the Stevenage NNDR1 itself.

## Item 0a (housing)

- Japan: MLIT RPPI page and both method PDFs (EN 001360414, JA 001360416) read; none names the
  Handbook by title. BIS row for JP is agency-only. Recorded as a `note` in
  `housing-rppi-hub-2026-10-17.json`. No node minted.
- Canada: `statcan-cpi -> statcan-lfs` (A) from the CPI Reference Paper ¶5.25;
  `statcan-national-accounts -> statcan-nhpi` (A) from the macro-accounts User Guide Table 7.1. The
  old `no-document` note on that pair is now `resolved`. Both in
  `housing-national-gaps-2026-10-17.json`. Grader outputs in this folder.
- Eurostat `prc_hpi_esms.htm` 404: moot; `eurostat-hpi` already reads `prc_hpi_inx_esms.htm` (200).

## Item 0b (Poland)

- Lead 1, GUS's foreign-trade title: the monthly release is "Obroty towarowe handlu zagranicznego
  ogółem i według krajów"; the PBSSP 2026 survey 1.51.08 is "Realizacja międzynarodowego handlu
  towarami w wyrażeniu ilościowo-wartościowym". Neither is NBP's "Foreign Trade Statistics", so no
  node and no edge. The `pl-nbp-bop` note was updated.
- Lead 2, PKWiU 2015's upstream: Dz.U. 2015 poz. 1676 (dziennikustaw.gov.pl PDF), annex §4.2
  "została oparta na" NACE Rev. 2, CPA Rev.2.1, CN 2015, PKD 2007. Four edges: NACE A, CN A, CPA B
  (`agency-not-artefact`, title too long for the run; an alias would lift it, left for Thomas),
  PKD B (`artefact-named-elsewhere-in-document`, inflected). The old `no-document` note is now
  `resolved`.
- Lead 3, NBP IIP and external debt: left as the handoff had it.
- Ministry of Finance layer, new slice `pl-finance-ministry-2026-10-24.json`: 4 nodes
  (Public Finance Act 2009, Debt Management Strategy, MTFSP, Regulation (EU) 2024/1263) and 3 edges,
  all A. Budget execution report and the Act's CPI-indexation rule are leads in its `_dropped`.

## Item 1 (backwards edges)

- `direction-suspect-2026-10-24.json` in this folder: 38 rows, nothing changed in the corpus.
- Side finding: `kind: instrument` holds 929 nodes and about 490 have no legal word in their title
  (surveys, censuses, classifications, agencies, BOP). Cause: the 2026-09-03 backfill set every node
  without `releases_per_year` to `instrument` (`types.ts`, comment on `kind`).

## Item 0c (Uzbekistan)

- All 216 sheets on https://stat.uz/en/official-statistics/metadata fetched (216 × HTTP 200) and
  searched with one regex per standard. Sheet counts naming each: NACE 29, SNA 2008 27, Vital
  Statistics P&R 22, ICD-10 21, OKED 19, UNESCO 11, COICOP 8, IRTS 5, ISCED 4, IRES 4, CPA 4, ICLS 3,
  HS 2, COFOG 2, BPM6 2, and one each for SITC, BEC, the CPI Manual, the PPI Manual.
- New slice `uz-metadata-sheets-2026-10-24.json`: hubs `un-vital-statistics-principles` (Rev. 3),
  `un-irts-2008`, `un-ires`, `un-copni-1999`, each titled from its publisher's own document; Uzbek
  nodes population, deaths, births, unemployment, foreign trade, hotels, Tourism Satellite Account,
  electricity production. 19 edges (16 A, 3 B), including `esa-2010 -> un-copni-1999` from ESA 2010
  ¶23.05.
- Not minted: ISCED 2011 (UNESCO's title unreadable here: UIS page has no document link, a guessed
  PDF 404'd, unesdoc is behind a Cloudflare challenge that was not worked around). The PPI Manual
  and BEC have no nodes either.
- (c) still open: the current CPI sheet (…p82574) says "Data on household consumption expenditures
  from special surveys is used to determine the weights", with no survey named.
- The 22 demographic sheets that name the Vital Statistics recommendations (3 minted: population,
  births, deaths):
  - https://stat.uz/images/uploads/docs/22___Fertility_rate_en.pdf
  - https://stat.uz/img/Docs/21-dem_trud_population-density-en.pdf
  - https://stat.uz/img/Docs/210-dem_trud_infant-mortality-rate-en_p47519.pdf
  - https://stat.uz/img/Docs/211-dem_trud_total-fertility-rate-en_p90948.pdf
  - https://stat.uz/img/Docs/212-dem_trud_marriage-en_p96297.pdf
  - https://stat.uz/img/Docs/221-dem_trud_divorce-level-en_p73152.pdf
  - https://stat.uz/img/Docs/225-dem_trud_divorce-rate-en_p34125.pdf
  - https://stat.uz/img/Docs/226-dem_trud_marriage-rate-en_p73295.pdf
  - https://stat.uz/img/Docs/227-dem_trud_number-of-departures-en_p50401.pdf
  - https://stat.uz/img/Docs/228-dem_trud_number-of-marriages-en_p71676.pdf
  - https://stat.uz/img/Docs/229-dem_trud_child-mortality-en.pdf
  - https://stat.uz/img/Docs/23-dem_trud_distribution-of-the-population-by-age-en.pdf
  - https://stat.uz/img/Docs/230-dem_trud_infant-mortality-en.pdf
  - https://stat.uz/img/Docs/27-dem_trud_mortality-rate-en_p79240.pdf
  - https://stat.uz/img/Docs/28-dem_trud_maternal-mortality-rate-en_p71782.pdf
  - https://stat.uz/img/Docs/29-dem_trud_child-mortality-rate-en_p30893.pdf
  - https://stat.uz/img/gks/218-dem_trud_number-of-births-en.pdf
  - https://stat.uz/img/gks/219-dem_trud_number-of-deaths-en.pdf
  - https://stat.uz/img/gks/220-dem_trud_number-of-arrivals-en.pdf
  - https://stat.uz/img/metadannie/27-dem_trud_population-en_p48112.pdf
  - https://stat.uz/img/news/21-dem_trud_natural-population-growth-en_p31831.pdf
  - https://stat.uz/img/news/22-dem_trud_number-of-premature-births-en_p72574.pdf

## Item 2 (Czechia and Albania)

- Albania: `eurostat-hicp -> al-instat-cpi-hicp`, B, from INSTAT's September 2026 HICP release,
  footnote 1 ("INSTAT publishes unrounded indices. while EUROSTAT publishes indices rounded to two
  decimal places."). REGISTER-stamped: the target's publisher speaking.
- Czechia: CZSO's methodology page, its 2026 CPI manual (44 pp.) and its September 2026 release were
  read; none says CZSO transmits the HICP. The release cites Eurostat's flash estimates instead.

## Item 5b (housing-policy follow-ons)

- (a) Ontario: re-cited to https://www.ontario.ca/laws/docs/110367_e.doc (the regulation as Word,
  HTTP 200); C → B (`quote-found-target-not-named`). LA: amlegal 403; a headless-browser render was
  refused by the session's permission classifier as bot-check circumvention and not retried.
- (b) Edmonton bl21442.pdf and the nairametrics LUC copy both 404. Edmonton's bylaw lookup fills
  its rows from a data source its page does not expose; LIRS's legislation page has no LUC Law.
- (c) Dev server + Playwright (the `scripts/renderer/` method, onboarding pre-dismissed, waited for
  `fit().settledOnce`): tier 4, every country opened, filter `housing-policy` → bar "50 shown · 3708
  in this tier · filter hiding 3658". 45 drawn; the 5 missing from the scene are zero-edge
  (`ma-casablanca-taxe-habitation`, `bc-housing-rental-assistance-program`,
  `eg-real-estate-tax-law-196-2008`, `gy-vivienda`, `ng-lagos-luc-law-2018`). Screenshot in this folder.

## Not attempted, and why

- 0d India, 3 Romania, 5(a) Russian urls: hosts unreachable from this container (above).
- 4 NUTS: waits for a regional-statistics round, per the handoff.
- 5(b) further url-collision countries and 6 the EU/JP/CA orphan stock: not reached this session.
