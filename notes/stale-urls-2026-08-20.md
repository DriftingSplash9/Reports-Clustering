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


## RESOLVED 2026-08-29 — remainder, 19 reports across Japan, Mexico, and 6 one-offs

Worked the full remainder in one pass. First re-checked all 19 original URLs
via curl (raw status, not a fetch-tool guess): 3 had already gone live again
on their own with no action needed — `mx-tmec`, `in-dpiit-wpi`,
`kr-statistics-act` — left untouched. The other 16 needed real replacements.

**Japan, 8 reports (`jp-japan-grok-2026-08.json`).** All 8 replaced.
`jp-prefectural-accounts` → ESRI's current (Japanese-only — no English page
exists any more) top page for 県民経済計算, found via ESRI's own sitemap;
flagging the English-language loss here rather than silently downgrading.
`jp-services-producer-price-index` → BOJ's current 2020-base SPPI page (old
one was the discontinued prior-base series). `jp-master-plan-official-
statistics` → Soumu's page for the 4th Term Master Plan (April 2023), same
site, moved path. `jp-vital-statistics` and `jp-vital-statistics-detailed` →
both now point at e-Stat's own "Vital Statistics" portal page
(e-stat.go.jp/en/statistics/00450011) rather than MHLW — chosen because
mhlw.go.jp is comprehensively bot-walled from this environment (even its own
homepage 403s to curl; confirmed real content only via WebFetch, never raw
curl), while e-Stat is cleanly curl-verifiable and is a legitimate primary
portal for the same series. **These two reports still share one URL, exactly
as before — the possible-duplicate-node question this file originally
flagged is still open and wasn't resolved here; that's a modelling call, not
a source-URL fix.** `jp-japan-eu-epa` → MOFA's current EPA hub page; MOFA
returns an explicit Akamai "Access Denied" edge-block to curl (confirmed:
this is a bot-wall, not a dead link — WebFetch reads the real, actively-
updated treaty page behind it). `jp-long-term-care-insurance` and
`jp-comprehensive-survey-living-conditions` → both moved off MHLW entirely
to dedicated e-Stat pages (00450351 and 00450061), curl-clean, exact title
match ("Status report on Long-term Care Insurance", "Comprehensive Survey of
Living Conditions").

**Mexico, 4 reports (`mx-mexico-grok-2026-08.json`).** `mx-tmec` needed
nothing (see above). `mx-pobreza-multidimensional` → CONEVAL's methodology-
explainer page (the old `Medicion.aspx` hub page is gone; the more specific
"¿Qué es la medición de la pobreza?" page is the direct successor). The three
pension reports previously all pointed at the same generic `gob.mx/bienestar`
landing page — now each has its own specific programme page, content-
confirmed (objective/eligibility/Pago de Marcha sections, not just a title
match): `mx-pension-bienestar-adultos` (note the URL needs the `-296817`
numeric suffix — the bare slug 403s), `mx-pension-bienestar-mujeres`,
`mx-pension-discapacidad`.

**One-offs, 4 reports.** `eg-capmas-establishment-decree` → Wikipedia's
CAPMAS article, which states the decree number and year verbatim ("CAPMAS
was established by a Presidential Decree 2915 in 1964"). Note for the
record: the actual primary-source decree text (a full English translation)
does exist, archived at the Wayback Machine snapshot of the original dead
UN Statistics Division page —
`web.archive.org/web/20230321011958/https://unstats.un.org/unsd/dnss/docViewer.aspx?docID=2175&catID=7`
— confirmed genuine (opened the PDF, matches word-for-word) but archive.org's
playback for this snapshot was flaky under repeat testing (~50% 503/timeout
across 8 tries), so it wasn't used as the citation URL. Worth switching to it
if archive.org's reliability for this snapshot improves, or if Thomas wants
the primary text over the secondary summary.
`brics-cra-inter-central-bank-agreement` → South African Reserve Bank's own
press release confirming the ICBA by name ("SARB signs Inter-Central Bank
Agreement with BRICS counterparts") — a better match than the dead PBOC page
since it names the ICBA specifically rather than the CRA Treaty generally.
`ir-gas` → GECF's restructured Iran country-profile page (same content, new
URL pattern under `/About-Us/Membership/GECF-Country-Details/...`).
`ph-ghg` → NICCDIES' restructured GHG inventory page (site split the old
`/ghg-inventory` path into `/ghg-inventory/ghg-national`,
`/ghg-inventory/ghg-local`, `/ghg-inventory/private-sector` — used the
national one to match the report's scope).

All 16 replacement URLs were curl-verified (raw HTTP status) except the two
explicitly noted above as bot-walled-not-dead (`jp-japan-eu-epa`,
`mhlw.go.jp` pages were avoided in favour of e-Stat entirely rather than
accepted on a bot-wall basis) — content-matched by title/body text, not
guessed from the URL shape alone. Applied directly to each report's `url`
field in its `src/data/research/*.json` file (no schema change, same as the
Singapore round). `npm run validate` re-confirmed clean (exit 0) afterward.

**All 37 originally-flagged stale URLs are now closed** — 18 Singapore
(2026-08-25) + 19 here (2026-08-29, including the 3 that fixed themselves).
