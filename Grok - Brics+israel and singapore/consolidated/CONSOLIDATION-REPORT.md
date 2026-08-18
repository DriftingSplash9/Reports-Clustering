# Grok archive — consolidated, aligned, researched

Built 2026-08-18. **Nothing minted into the graph, no git commands run, no value invented.**

**1999 reports · 969 dependencies · 357 dropped notes** across 37 country files. **99% have a verified URL. 1508 carry a researched, evidence-backed release cadence.**

Started as 293 batch files of wildly mixed quality. Six passes: consolidate → align to the schema → research URLs → retry the failures → Grok second opinion → strip the junk, merge the domain tags, and research the cadences.

## What changed in this pass

### 309 non-publications stripped

Removed from the country files and archived in full under `_archive/<cc>-<country>-not-publications.json` — nothing is lost, they are just no longer pretending to be reports. Cost: **4 dependency edges** and 4 `part_of` references, exactly as forecast. They were synthesised `*-meta` nodes binding a batch together, framing nodes, geographic areas, industries, projects and institutions.

### The domain tags: merged, promoted, and 17 added to the schema

Non-approved tag uses went from **5,770 to 1,444**. Three moves:

- **Merged into the existing 22** where it was the same concept in different words: `prices`→`inflation`, `employment`→`labour`, `demography`/`census`→`population`, `monetary`/`central-bank`→`monetary-policy`, `gdp`/`grdp`/`regional-accounts`/`macroeconomic-statistics`→`national-accounts`, and so on.
- **Promoted 17 tags into `Domain` in `types.ts`**, each with a dated comment in the house style: `trade` (349 nodes), `living-standards` (209), `public-finance` (200), `industry` (162), `energy` (149), `external-sector` (143), `poverty` (110), `development-finance` (64), `investment` (59), `environment` (51), `governance` (39), `housing` (34), `services` (33), `statistical-system` (31), `tourism` (30), `infrastructure` (29), `mining` (28).
- **Dropped 542 pseudo-tags outright.** `regional`, `provincial`, `urban`, `metropolitan`, `municipal` are not domains — that information is already carried by `region` and `jurisdiction_level`, and duplicating it as a filter tag just makes the filter lie. `comprehensive`, `multi-domain`, `meta` and `indicators` describe the batch, not the report.

Full substitution table in `_MAPPINGS-domains-pass2.json`. The 1,444 still on `proposed:` are the long tail — 427 tags used once, 126 used twice. They are doing no harm and none has earned a slot yet.

### Cadences: 292 researched, 22 reclassified as one-off instruments

Every node that had a vague text cadence and a working URL had that URL fetched, and the release frequency read off the publisher's own page — a stated periodicity, an advance release calendar, or a count of dated editions. The number carries its evidence in `_cadence_evidence`; Grok's original text is preserved in `_cadence_original`.

Two things fell out that matter more than the numbers:

- **22 nodes are one-off instruments, not recurring series.** Indonesia's RPJMN is Perpres 12/2025, a presidential regulation. The Philippines' "defence budget" node is Republic Act 12314. Vietnam's digital strategy is Decision 749/QĐ-TTg, signed once in June 2020. Taiwan's plains-indigenous item is a statute. These were all filed as recurring publications with an invented cadence; they now correctly have none.
- **A dozen series are dormant**, and the cadence recorded is the one they had while running. Myanmar's monthly CPI stops at December 2020, its FX series at 2022. Afghanistan's DAB inflation reports stop at July 2021. Syria's CPI runs monthly to August 2020 and then nothing. That is worth knowing before anything downstream treats them as live.

### `IL` and `SG` added to the palette; Afghanistan refiled

Both filed to `ASIA`, the reserved catch-all family, for the same reason `RU` and `AE` are — there is still no Middle East family for Israel nor an East/Southeast Asia one for Singapore. Placeholders that render, not classifications to defend, since you are revamping the palette next.

Afghanistan is now `af-afghanistan.json`, matching its node ids. The `afg-` warning in `grok-import-progress.md` was a false alarm: **no live node id starts with `af-`** — the Africa branch uses `af-` only in *filenames*, and its nodes are properly prefixed by ISO country code (`ao-`, `dz-`, `ng-`). There was never a collision to avoid.

## What is still open

- **27 nodes have no URL** — 21 whose publisher domain is dead or unreachable (listed below), 6 where no such published series exists. Both double-confirmed by Grok.
- **169 nodes still have no cadence number** — 134 where the page states none and no editions could be counted, and 35 that are live databases with no discrete release at all. That last group is a real modelling question rather than a research failure: a continuously-updated dashboard is neither of the schema's two node shapes.
- **969 dependencies for 1,999 nodes**, and almost all of them sit in the `v2` and `legacy+edges` tiers. The `candidates-only` countries still have essentially no edges.

### The 21 unreachable publishers

| Country | Node | What it is |
|---|---|---|
| Afghanistan | `af-national-accounts` | National Accounts of Afghanistan (GDP) |
| Iran | `ir-wheat` | Wheat production statistics |
| Iran | `ir-non-oil-exports` | Non-oil export statistics |
| Syria | `sy-power` | Electricity generation and capacity statistics |
| Syria | `sy-turkey-trade` | Syria–Turkey merchandise trade statistics |
| Turkey | `tr-tourism` | Tourism arrivals and tourism revenue statistics |
| Venezuela | `ve-bonos` | Bonos y transferencias monetarias del Estado |
| Venezuela | `ve-faja-orinoco` | Faja Petrolífera del Orinoco — resource base |
| Venezuela | `ve-seniat` | SENIAT — tax administration |
| Venezuela | `ve-pdvsa` | Petróleos de Venezuela (PDVSA) |
| Vietnam | `vn-ethnic-poverty` | Ethnic minority poverty and living-standards statistics |
| Vietnam | `vn-grdp-hcmc` | Ho Chi Minh City Gross Regional Domestic Product |
| Vietnam | `vn-korea-trade-fdi` | Vietnam–Korea trade and FDI statistics |
| Vietnam | `vn-budget-deficit` | State budget deficit statistics |
| Vietnam | `vn-port-hcmc-caimep` | Ho Chi Minh City / Cai Mep port complex operational statisti |
| Vietnam | `vn-port-haiphong` | Hai Phong port operational statistics |
| Vietnam | `vn-ethnic-minorities` | Ethnic minority population and composition statistics |
| Vietnam | `vn-land-border` | Vietnam–China land border treaty and border management frame |
| Vietnam | `vn-policy-banks` | Policy and development banking institutions (VBSP and relate |
| Vietnam | `vn-public-debt` | Public debt and government debt statistics |
| Vietnam | `vn-defence-policy` | National defence policy framing |

Vietnam is 11 of the 21 — `mof.gov.vn`, `customs.gov.vn`, `vinamarine.gov.vn` and `mod.gov.vn` all resolve but serve JavaScript shells that render nothing. Venezuela is 4: `pdvsa.com` has no DNS record at all.

## Per-country state

| Country | Code | File | Reports | Deps | Dropped | Source shape | Has URL | No URL | Cadence known | Cadence open | Archived | Live collisions |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Afghanistan | AF | `af-afghanistan.json` | 14 | 0 | 0 | candidates-only×5 | 13 | 1 | 10 | 3 | 11 | 0 |
| Argentina | AR | `ar-argentina.json` | 61 | 16 | 5 | legacy+edges×6 | 61 | 0 | 54 | 0 | 0 | 49 |
| BRICS international layer | INT | `int-brics-international-layer.json` | 77 | 79 | 26 | v2×6 | 77 | 0 | 9 | 0 | 0 | 0 |
| Bolivia | BO | `bo-bolivia.json` | 60 | 23 | 16 | legacy+edges×6 | 60 | 0 | 53 | 0 | 0 | 37 |
| Brazil | BR | `br-brazil.json` | 74 | 82 | 23 | v2×8 | 74 | 0 | 71 | 0 | 0 | 0 |
| Chile | CL | `cl-chile.json` | 60 | 20 | 8 | legacy+edges×6 | 60 | 0 | 51 | 0 | 0 | 0 |
| China | CN | `cn-china.json` | 53 | 119 | 23 | v2×8 | 53 | 0 | 51 | 0 | 0 | 0 |
| Colombia | CO | `co-colombia.json` | 40 | 15 | 8 | legacy+edges×4 | 40 | 0 | 35 | 0 | 0 | 0 |
| Ecuador | EC | `ec-ecuador.json` | 50 | 15 | 5 | legacy+edges×5 | 50 | 0 | 45 | 0 | 0 | 0 |
| Egypt | EG | `eg-egypt.json` | 47 | 94 | 18 | v2×8 | 47 | 0 | 39 | 0 | 0 | 0 |
| Ethiopia | ET | `et-ethiopia.json` | 29 | 67 | 11 | v2×7 | 29 | 0 | 25 | 0 | 0 | 0 |
| Guyana | GY | `gy-guyana.json` | 40 | 6 | 13 | legacy+edges×4 | 40 | 0 | 35 | 0 | 0 | 0 |
| India | IN | `in-india.json` | 81 | 70 | 27 | v2×10 | 81 | 0 | 79 | 0 | 0 | 2 |
| Indonesia | ID | `id-indonesia.json` | 126 | 0 | 0 | candidates-only×17 | 126 | 0 | 104 | 12 | 36 | 0 |
| Iran | IR | `ir-iran.json` | 35 | 0 | 0 | candidates-only×10 | 31 | 4 | 15 | 15 | 21 | 0 |
| Iraq | IQ | `iq-iraq.json` | 21 | 0 | 0 | candidates-only×9 | 21 | 0 | 18 | 3 | 22 | 0 |
| Israel | IL | `il-israel.json` | 29 | 26 | 16 | v2×7 | 29 | 0 | 28 | 0 | 0 | 0 |
| Japan | JP | `jp-japan.json` | 65 | 0 | 0 | candidates-only×7 | 65 | 0 | 45 | 6 | 0 | 0 |
| Mexico | MX | `mx-mexico.json` | 121 | 43 | 4 | legacy+edges×13+legacy-no-edges×1 | 121 | 0 | 118 | 0 | 0 | 0 |
| Myanmar | MM | `mm-myanmar.json` | 17 | 0 | 0 | candidates-only×5 | 17 | 0 | 12 | 5 | 7 | 0 |
| Paraguay | PY | `py-paraguay.json` | 60 | 26 | 14 | legacy+edges×6 | 60 | 0 | 45 | 0 | 0 | 0 |
| Peru | PE | `pe-peru.json` | 40 | 15 | 5 | legacy+edges×4 | 40 | 0 | 35 | 0 | 0 | 0 |
| Philippines | PH | `ph-philippines.json` | 75 | 0 | 0 | candidates-only×13 | 75 | 0 | 58 | 8 | 29 | 0 |
| Russia | RU | `ru-russia.json` | 152 | 190 | 39 | v2×13 | 152 | 0 | 124 | 0 | 0 | 2 |
| Saudi Arabia | SA | `sa-saudi-arabia.json` | 16 | 0 | 0 | candidates-only×7 | 16 | 0 | 14 | 2 | 17 | 0 |
| Singapore | SG | `sg-singapore.json` | 37 | 27 | 26 | v2×7 | 37 | 0 | 34 | 0 | 0 | 0 |
| South Korea | KR | `kr-south-korea.json` | 72 | 0 | 0 | candidates-only×7 | 72 | 0 | 15 | 33 | 0 | 0 |
| Suriname | SR | `sr-suriname.json` | 43 | 3 | 21 | legacy+edges×6 | 43 | 0 | 38 | 0 | 15 | 0 |
| Syria | SY | `sy-syria.json` | 13 | 0 | 0 | candidates-only×7 | 11 | 2 | 4 | 7 | 17 | 0 |
| Taiwan | TW | `tw-taiwan.json` | 122 | 0 | 0 | candidates-only×16 | 122 | 0 | 77 | 28 | 48 | 0 |
| Thailand | TH | `th-thailand.json` | 25 | 0 | 0 | candidates-only×7 | 25 | 0 | 19 | 6 | 15 | 0 |
| Turkey | TR | `tr-turkey.json` | 40 | 0 | 0 | candidates-only×9 | 39 | 1 | 21 | 11 | 14 | 0 |
| United Arab Emirates | AE | `ae-united-arab-emirates.json` | 26 | 0 | 31 | v2×7+candidates-only×3 | 26 | 0 | 23 | 3 | 15 | 22 |
| Uruguay | UY | `uy-uruguay.json` | 60 | 21 | 9 | legacy+edges×6 | 60 | 0 | 48 | 0 | 0 | 0 |
| Venezuela | VE | `ve-venezuela.json` | 37 | 12 | 9 | legacy+edges×4 | 33 | 4 | 26 | 0 | 3 | 0 |
| Vietnam | VN | `vn-vietnam.json` | 67 | 0 | 0 | candidates-only×13 | 52 | 15 | 21 | 22 | 26 | 0 |
| Yemen | YE | `ye-yemen.json` | 14 | 0 | 0 | candidates-only×6 | 14 | 0 | 9 | 5 | 13 | 0 |
| **TOTAL** | | **37** | **1999** | **969** | **357** | | **1972** | **27** | **1508** | **169** | **309** | **112** |

## Three files are superseded

Argentina (49 of 61 ids already live), Bolivia (37 of 60) and the UAE (22 of 41) are `done` in `grok-import-progress.md` — these are the raw input to work already finished. India and Russia have 2 real id conflicts each: `in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`, `ru-cbr-monetary-policy-guidelines`.

## Where the work is now

- **`v2` — Brazil, China, Egypt, Ethiopia, India, Russia, Israel, Singapore, BRICS-international.** Real edges with basis and evidence URL. Ready to verify against sources.
- **`legacy+edges` — Latin America.** Real sourced edges, converted. Chile, Colombia, Ecuador, Guyana, Mexico, Paraguay, Peru, Suriname, Uruguay, Venezuela unprocessed.
- **`candidates-only` — Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines, Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Türkiye, Vietnam, Yemen.** The nodes are now real, linked and dated. The edges do not exist and have to be researched from nothing. That is the whole remaining job for this tier.

## Files here

- `<cc>-<country>.json` × 37 — the data. Each carries `_normalisation` (what was changed) and `_gaps` (what is missing and why).
- `_archive/` — the 309 stripped non-publications, in full.
- `_MAPPINGS.json`, `_MAPPINGS-domains-pass2.json` — every tag and level substitution, with counts.
- `_LIVE-OVERLAP.json` — id collisions against the live corpus.
- `grok-url-handoff.json`, `GROK-PROMPT.md` — the Grok hand-off, kept for the record.