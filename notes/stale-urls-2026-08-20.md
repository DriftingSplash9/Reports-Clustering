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
under `src/data/research/`, under the same ids listed below. 18 of the 37 are
one problem (Singapore's stats site restructured its URL scheme wholesale, not
18 independent instances of rot) — worth fixing as a batch, likely by finding
each publication's new `singstat.gov.sg` path rather than researching each one
from scratch.

## Singapore — one URL-scheme migration, 18 reports (`sg-singapore.json`)
All of these 404 on the same old `find-data/search-by-theme/...` and
`publications/...` path shapes. singstat.gov.sg almost certainly restructured
its site; the content likely still exists under new paths.

- `sg-balance-of-payments` — https://www.singstat.gov.sg/find-data/search-by-theme/economy/balance-of-payments
- `sg-merchandise-trade` — https://www.singstat.gov.sg/find-data/search-by-theme/trade-and-investment/merchandise-trade
- `sg-international-investment-position` — https://www.singstat.gov.sg/find-data/search-by-theme/economy/international-investment-position
- `sg-external-debt` — https://www.singstat.gov.sg/find-data/search-by-theme/economy/external-debt
- `sg-direct-investment-abroad` — https://www.singstat.gov.sg/find-data/search-by-theme/trade-and-investment/foreign-direct-investment
- `sg-fdi-in-singapore` — https://www.singstat.gov.sg/find-data/search-by-theme/trade-and-investment/foreign-direct-investment
- `sg-household-sector-balance-sheet` — https://www.singstat.gov.sg/find-data/search-by-theme/economy/household-sector-balance
- `sg-domestic-supply-price-index` — https://www.singstat.gov.sg/publications/economy/producer-price-indices
- `sg-international-visitor-arrivals` — https://www.singstat.gov.sg/find-data/search-by-theme/industry/tourism
- `sg-supply-use-input-output-tables` — https://www.singstat.gov.sg/find-data/search-by-theme/economy/supply-use-and-input-output-tables
- `sg-wholesale-trade-business-receipts` — https://www.singstat.gov.sg/find-data/search-by-theme/industry/services
- `sg-services-producer-price-indices` — https://www.singstat.gov.sg/publications/economy/services-producer-price-indices
- `sg-complete-life-tables` — https://www.singstat.gov.sg/publications/population/complete-life-table
- `sg-ssic-2025` — https://www.singstat.gov.sg/standards/standards-and-classifications/ssic
- `sg-ssoc-2024` — https://www.singstat.gov.sg/standards/standards-and-classifications/ssoc
- `sg-business-expectations` — https://www.singstat.gov.sg/find-data/search-by-theme/industry/business-expectations
- `sg-births-fertility` — https://www.singstat.gov.sg/find-data/search-by-theme/population/births-and-fertility
- `sg-enterprise-landscape` — https://www.singstat.gov.sg/find-data/search-by-theme/industry/enterprises-and-corporate-sector

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
