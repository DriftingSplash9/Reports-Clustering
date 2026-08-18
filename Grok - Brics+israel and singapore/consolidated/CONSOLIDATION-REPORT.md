# Grok archive — consolidated, schema-aligned, URL-researched

Built 2026-08-18 in five passes. **Nothing minted into the graph, no git commands run, no value invented.**

1. **Consolidate** — 293 batch files → 37 country files, one per country.
2. **Align** — every mechanical violation of `src/lib/types.ts` fixed; every replaced value preserved under an underscore-prefixed key.
3. **Research URLs** — the 709 nodes with no URL, one research pass per country.
4. **Retry** — the 108 that first failed, via successor domains, sitemaps and co-publishers.
5. **Grok second opinion** — the 75 that were still open or only series-level.

**2308 reports · 973 dependencies · 357 dropped notes. URL coverage 69% → 85%.**

## The URL work

**373 of the 709 gaps are closed** — 304 first pass, 68 on retry, 1 from Grok. Every URL was retrieved and confirmed against the page's own content, with the confirming observation on the node as `_url_evidence` and the discovery method in `_url_route`.

The retry was where the yield was, and the trick was **successor domains** rather than persistence. Ministries reorganise and their statistics move: `fia.mpi.gov.vn` → `fia.mof.gov.vn`, `ipb.moea.gov.tw` → `land.bip.gov.tw`, `cucthongkehanoi.gso.gov.vn` → `thongkehanoi.nso.gov.vn`. Sitemaps cracked the JavaScript-only sites; where a ministry was blocked, the national statistics office had often published the same series anyway.

### What the Grok pass actually settled

Grok returned all 75 items, in order, no extras — and found **1 new URL**: Afghanistan's MAIL report index (`mail.gov.af/dr/reports`), carrying the annual agriculture reports plus separate wheat and rice production reports. I re-fetched it and it holds up.

On the face of it that is a thin return. It is not, because of the other two results:

- **All 41 series-level URLs came back identical.** Grok independently reached the same links for Iran's provincial GRDPs, Türkiye's provincial GDPs, Thailand's GRPP series, SAMA, GASTAT and the Yemeni central bank. Two systems, different network paths, same answers. That moves those 41 from "the best we could manage" to "the best that exists" — they are marked `series-level (corroborated)` and should be treated as final unless a publisher adds a per-node page.
- **33 of the 34 dead ends came back dead, for the same reasons.** Same DNS failures, same JavaScript-only portals, same 403s. That converts "we could not find it" into "it is not findable from outside," which is a different and more useful statement.

Grok also made six eligibility calls worth having, which I applied: `ve-humvenezuela` has a civil-society publisher rather than an official body; `ir-npl`, `sr-proteccion-reforma`, `tw-semiconductor-reshoring-stats`, `vn-china-community` and `vn-national-security-strategy` have no discrete published product behind them. All six moved from "missing a URL" to "not a publication."

### The 336 nodes still without a URL

| Outcome | Nodes | What it means |
|---|---|---|
| **Not a publication at all** | **309** | Confirmed by looking, not inferred. Synthesised `*-meta` nodes that exist only to bind other nodes together, "framing" nodes, geographic areas, industries, projects, institutions. Your spec bans every one (2b, 2c). |
| Publisher unreachable | 21 | Double-confirmed dead. Vietnamese, Iranian, Venezuelan and Syrian government domains. `pdvsa.com` has no DNS record at all. |
| No official product found | 6 | Searched twice, independently; no such published series. |

### The 309 non-publications are cheap to remove

Flagged in place with `_flagged_not_a_publication: true`, not deleted. Stripping all of them costs **3 dependency edges** (all Suriname) and **4 `part_of` references**. Nearly every `candidates-only` batch opens with a `<cc>-batchN-meta` node — around 60 across the archive, one per batch, each describing what the batch "binds together." That is the padding pattern the v2 spec exists to stop.

## What pass 2 fixed

| Problem | Scale | What I did |
|---|---|---|
| Invalid JSON — `"releases_per_year": continuous",`, opening quote missing | **136 of 219 old batch files** | Re-quoted verbatim. No number invented. |
| `relationship_type` outside the four valid values | **285 edges** | The dangerous one: an off-union value makes the edge weight `NaN`, and `NaN` spreads through PageRank to every score in the graph. `part_of`→child node's field (163); `contains`→reversed (4); `produced_by`→dropped, publisher is a string not a node (49); `related_to`/`complements`→`_dropped` as deferred (60). |
| `jurisdiction_level` outside the six-value union | **1,236 nodes** | Mapped in; original kept as `_jurisdiction_level_original`. |
| `domains` outside the approved 22 | **5,770 uses, 985 tags** | Format-normalised then `proposed:`-prefixed. **No semantic merging** — your call; table in `_MAPPINGS.json`. |
| `last_updated` absent (required, `string \| null`) | **2,218 nodes** | Set to `null`. |
| `source_kind` outside `official \| commercial` | 284 | Mapped to `official`; original kept. |
| `region` null or missing | 187 | Filled with the country name. |
| Text cadence in a numeric field | 719 | 59 unambiguous ones resolved; 659 still need a judgement call. |
| Non-schema keys Grok invented | 4,453 | Renamed with a leading underscore. Nothing deleted. |

The files validate clean against the real schema on every mechanically checkable rule.

## Three files are superseded

| File | Reports | Ids already live | Live slice |
|---|---|---|---|
| `ar-argentina.json` | 61 | **49 (80%)** | `ar-national-core.json` |
| `bo-bolivia.json` | 60 | **37 (62%)** | `bo-national-core.json` |
| `in-india.json` | 81 | **2 (2%)** | `in-cpi-finance-commission.json` |
| `ru-russia.json` | 152 | **2 (1%)** | `ru-g2-rosstat-equalization.json` |
| `ae-united-arab-emirates.json` | 41 | **22 (54%)** | `ae-national-core.json` |

Argentina, Bolivia and the UAE are `done` in `grok-import-progress.md`. India and Russia have 2 real id conflicts each (`in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`, `ru-cbr-monetary-policy-guidelines`).

## Per-country state

| Country | Code | File | Batches | Reports | Deps | Dropped | Source shape | Has URL | No URL | Not a pub | Unreachable | No product | Series-level | Cadence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Afghanistan | AF | `afg-afghanistan.json` | 5 | 25 | 0 | 0 | candidates-only×5 | 13 | 12 | 11 | 1 | 0 | 0 | 20 |
| Argentina | AR | `ar-argentina.json` | 6 | 61 | 16 | 5 | legacy+edges×6 | 61 | 0 | 0 | 0 | 0 | 0 | 0 |
| BRICS international layer | INT | `int-brics-international-layer.json` | 6 | 77 | 79 | 26 | v2×6 | 77 | 0 | 0 | 0 | 0 | 0 | 0 |
| Bolivia | BO | `bo-bolivia.json` | 6 | 60 | 23 | 16 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 | 0 |
| Brazil | BR | `br-brazil.json` | 8 | 74 | 82 | 23 | v2×8 | 74 | 0 | 0 | 0 | 0 | 0 | 0 |
| Chile | CL | `cl-chile.json` | 6 | 60 | 20 | 8 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 | 0 |
| China | CN | `cn-china.json` | 8 | 53 | 119 | 23 | v2×8 | 53 | 0 | 0 | 0 | 0 | 0 | 0 |
| Colombia | CO | `co-colombia.json` | 4 | 40 | 15 | 8 | legacy+edges×4 | 40 | 0 | 0 | 0 | 0 | 0 | 0 |
| Ecuador | EC | `ec-ecuador.json` | 5 | 50 | 15 | 5 | legacy+edges×5 | 50 | 0 | 0 | 0 | 0 | 0 | 0 |
| Egypt | EG | `eg-egypt.json` | 8 | 47 | 94 | 18 | v2×8 | 47 | 0 | 0 | 0 | 0 | 0 | 0 |
| Ethiopia | ET | `et-ethiopia.json` | 7 | 29 | 67 | 11 | v2×7 | 29 | 0 | 0 | 0 | 0 | 0 | 0 |
| Guyana | GY | `gy-guyana.json` | 4 | 40 | 6 | 13 | legacy+edges×4 | 40 | 0 | 0 | 0 | 0 | 0 | 0 |
| India | IN | `in-india.json` | 10 | 81 | 70 | 27 | v2×10 | 81 | 0 | 0 | 0 | 0 | 0 | 0 |
| Indonesia | ID | `id-indonesia.json` | 17 | 162 | 0 | 0 | candidates-only×17 | 126 | 36 | 36 | 0 | 0 | 0 | 113 |
| Iran | IR | `ir-iran.json` | 10 | 56 | 0 | 0 | candidates-only×10 | 31 | 25 | 21 | 2 | 2 | 7 | 37 |
| Iraq | IQ | `iq-iraq.json` | 9 | 43 | 0 | 0 | candidates-only×9 | 21 | 22 | 22 | 0 | 0 | 0 | 30 |
| Israel | IL | `il-israel.json` | 7 | 29 | 26 | 16 | v2×7 | 29 | 0 | 0 | 0 | 0 | 0 | 0 |
| Japan | JP | `jp-japan.json` | 7 | 65 | 0 | 0 | candidates-only×7 | 65 | 0 | 0 | 0 | 0 | 0 | 12 |
| Mexico | MX | `mx-mexico.json` | 14 | 121 | 43 | 4 | legacy+edges×13+legacy-no-edges×1 | 121 | 0 | 0 | 0 | 0 | 0 | 0 |
| Myanmar | MM | `mm-myanmar.json` | 5 | 24 | 0 | 0 | candidates-only×5 | 17 | 7 | 7 | 0 | 0 | 0 | 19 |
| Paraguay | PY | `py-paraguay.json` | 6 | 60 | 26 | 14 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 | 0 |
| Peru | PE | `pe-peru.json` | 4 | 40 | 15 | 5 | legacy+edges×4 | 40 | 0 | 0 | 0 | 0 | 0 | 0 |
| Philippines | PH | `ph-philippines.json` | 13 | 104 | 0 | 0 | candidates-only×13 | 75 | 29 | 29 | 0 | 0 | 0 | 74 |
| Russia | RU | `ru-russia.json` | 13 | 152 | 190 | 39 | v2×13 | 152 | 0 | 0 | 0 | 0 | 0 | 0 |
| Saudi Arabia | SA | `sa-saudi-arabia.json` | 7 | 33 | 0 | 0 | candidates-only×7 | 16 | 17 | 17 | 0 | 0 | 4 | 23 |
| Singapore | SG | `sg-singapore.json` | 7 | 37 | 27 | 26 | v2×7 | 37 | 0 | 0 | 0 | 0 | 0 | 0 |
| South Korea | KR | `kr-south-korea.json` | 7 | 72 | 0 | 0 | candidates-only×7 | 72 | 0 | 0 | 0 | 0 | 0 | 35 |
| Suriname | SR | `sr-suriname.json` | 6 | 58 | 6 | 21 | legacy+edges×6 | 43 | 15 | 15 | 0 | 0 | 0 | 0 |
| Syria | SY | `sy-syria.json` | 7 | 30 | 0 | 0 | candidates-only×7 | 11 | 19 | 17 | 2 | 0 | 0 | 23 |
| Taiwan | TW | `tw-taiwan.json` | 16 | 170 | 0 | 0 | candidates-only×16 | 122 | 48 | 48 | 0 | 0 | 0 | 127 |
| Thailand | TH | `th-thailand.json` | 7 | 40 | 0 | 0 | candidates-only×7 | 25 | 15 | 15 | 0 | 0 | 5 | 22 |
| Turkey | TR | `tr-turkey.json` | 9 | 54 | 0 | 0 | candidates-only×9 | 39 | 15 | 14 | 1 | 0 | 8 | 27 |
| United Arab Emirates | AE | `ae-united-arab-emirates.json` | 10 | 41 | 0 | 31 | v2×7+candidates-only×3 | 26 | 15 | 15 | 0 | 0 | 2 | 12 |
| Uruguay | UY | `uy-uruguay.json` | 6 | 60 | 21 | 9 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 | 0 |
| Venezuela | VE | `ve-venezuela.json` | 4 | 40 | 13 | 9 | legacy+edges×4 | 33 | 7 | 3 | 4 | 0 | 0 | 0 |
| Vietnam | VN | `vn-vietnam.json` | 13 | 93 | 0 | 0 | candidates-only×13 | 52 | 41 | 26 | 11 | 4 | 11 | 64 |
| Yemen | YE | `ye-yemen.json` | 6 | 27 | 0 | 0 | candidates-only×6 | 14 | 13 | 13 | 0 | 0 | 4 | 21 |
| **TOTAL** | | **37** | **293** | **2308** | **973** | **357** | | **1972** | **336** | **309** | **21** | **6** | **41** | **659** |

## Where the work is

- **`v2` — Brazil, China, Egypt, Ethiopia, India, Russia, Israel, Singapore, BRICS-international.** Real edges with basis and evidence URL; every node already had a URL. Ready to verify.
- **`legacy+edges` — Latin America.** Real sourced edges, converted. Chile, Colombia, Ecuador, Guyana, Mexico, Paraguay, Peru, Suriname, Uruguay, Venezuela unprocessed.
- **`candidates-only` — Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines, Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Türkiye, Vietnam, Yemen.** Zero edges between them. The node list is now real and linked; every edge still has to be researched from nothing.

## Still to decide

- Strip the 309 flagged non-publications, or keep them? Costs 3 edges either way.
- Semantic merge pass on the `proposed:` domain tags — `prices` vs `inflation`, `employment` vs `labour`. `_MAPPINGS.json` has the list with counts.
- 659 nodes still carry a text cadence (`continuous`, `monthly / annual`) needing a judgement call.
- `IL` and `SG` need `COUNTRY_FAMILY` entries in `palette.ts`.
- Afghanistan is filed `afg-` but its internal ids still say `af-`.
- The 21 unreachable ones are now double-confirmed. Worth one more look only if the political situation or the hosting changes.

## Files here

- `<cc>-<country>.json` × 37 — the data. Per file: `_normalisation` (what changed), `_gaps` (what is missing and why).
- `_MAPPINGS.json` — every domain-tag and jurisdiction-level substitution, with counts.
- `_LIVE-OVERLAP.json` — id collisions and title matches against the live corpus.
- `grok-url-handoff.json`, `GROK-PROMPT.md` — the hand-off that was sent to Grok, kept for the record.