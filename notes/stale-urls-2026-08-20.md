# Stale URLs found during the 2026-08-20 mint — research queue, not a defect list

`npm run check-urls` (run by Thomas, his machine, 2026-08-20) checked 1 972 URLs
in the staged Grok archive and flagged 832 as "dead." Investigation found most
of that was the checker's plain HTTP client tripping bot-walls (403s) or
hitting TLS-trust issues (Russian government sites use a domestic CA), not
actual link rot — spot-checked several of the highest-flagged domains (BPS
Indonesia, IBGE Brazil, INE Uruguay/Chile) through a real browser-fetch and all
loaded fine. That bucket was **not** treated as a mint blocker.

Only 37 came back genuine 404s. Decision (Thomas): keep the report, do not drop
it, flag the URL as needing a fresh look. This file is that flag — there is no
schema field for "stale URL" on a `Report` (would need a `types.ts` change to
add one; not done this session), so this is where the list lives until either
a schema field gets added or someone re-researches each URL and updates the
report directly.

Reading note: these are mixed into the merged `*-grok-2026-08.json` files
under `src/data/research/`, under the same ids listed below.

## RESOLVED 2026-08-25 — Singapore, 18 reports (`sg-singapore-grok-2026-08.json`)
All 18 were one problem: singstat.gov.sg restructured its URL scheme wholesale
(old `find-data/search-by-theme/...` and `publications/...` paths all 404;
most moved to `find-data/explore-data-themes/...`, the two standards pages to
`standard-classifications/...`). An agent found singstat's sitemap.xml, mapped
each old path to its replacement, and WebFetched every candidate to confirm
the specific topic is actually discussed there before writing it back — not
just a title-match guess. Applied directly to each report's `url` field in
`sg-singapore-grok-2026-08.json` (no schema change; this is a source-URL
correction, not a new claim, so rule 2 doesn't apply).

Two genuine consolidations, not sloppy mapping — confirmed by content, not
assumed: SingStat merged Balance of Payments + International Investment
Position + External Debt into one "International Accounts" theme page, and
merged Domestic Supply/Manufactured Products price indices + Services
Producer Price Indices into one "Producer and International Trade Price
Indices" theme page. `sg-fdi-in-singapore` (inward) and
`sg-direct-investment-abroad` (outward) — previously both pointed at the same
generic landing page — now each have their own distinct, confirmed page.

One weaker link, flagged rather than silently treated as equal-confidence:
`sg-wholesale-trade-business-receipts` → the `industry/services` theme page
mentions the wholesale-trade-index and business-receipts-index series are
still live but the agent couldn't fully confirm that page is the singular
current landing page for those two specific indices versus just referencing
them. Worth a second look if it 404s again.

## Japan — 7 reports, several different ministries (`jp-japan.json`)
- `jp-prefectural-accounts` — https://www.esri.cao.go.jp/en/sna/data/data_list/kenmin/files/contents/main_en.html
- `jp-services-producer-price-index` — https://www.boj.or.jp/en/statistics/pi/sppi_release
- `jp-master-plan-official-statistics` — https://www.soumu.go.jp/english/dgpp_ss/seido/index.htm
- `jp-vital-statistics` — https://www.mhlw.go.jp/english/database/db-hw/vs01.html
- `jp-vital-statistics-detailed` — https://www.mhlw.go.jp/english/database/db-hw/vs01.html (same URL as above — check if these should even be two reports)
- `jp-japan-eu-epa` — https://www.mofa.go.jp/ecm/ie/page4e000969.html
- `jp-long-term-care-insurance` — https://www.mhlw.go.jp/english/database/db-hh/
- `jp-comprehensive-survey-living-conditions` — https://www.mhlw.go.jp/english/database/db-hss/cslc.html

## Mexico — 5 reports (`mx-mexico.json`)
- `mx-tmec` — https://www.gob.mx/t-mec
- `mx-pobreza-multidimensional` — https://www.coneval.org.mx/Medicion/Paginas/Medicion.aspx
- `mx-pension-bienestar-adultos` — https://www.gob.mx/bienestar
- `mx-pension-discapacidad` — https://www.gob.mx/bienestar (same URL as above)
- `mx-pension-bienestar-mujeres` — https://www.gob.mx/bienestar (same URL as above — three reports, one generic landing page; worth finding the specific programme pages)

## One-offs
- `eg-capmas-establishment-decree` (`eg-egypt.json`) — https://unstats.un.org/unsd/dnss/docViewer.aspx?docID=2175&catID=7
- `in-dpiit-wpi` (`in-india.json`) — https://eaindustry.nic.in/
- `brics-cra-inter-central-bank-agreement` (`int-brics-international-layer.json`) — http://www.pbc.gov.cn/en/3688110/3688172/3713124/index.html
- `ir-gas` (`ir-iran.json`) — https://www.gecf.org/countries/iran
- `kr-statistics-act` (`kr-south-korea.json`) — https://elaw.klri.re.kr/eng_service/lawView.do?hseq=66269&lang=ENG
- `ph-ghg` (`ph-philippines.json`) — https://niccdies.climate.gov.ph/ghg-inventory
