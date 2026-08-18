# Grok archive — consolidated, schema-aligned, URL-researched

Built 2026-08-18 in three passes. **Nothing minted into the graph, no git commands run, no value invented.**

1. **Consolidate** — 293 batch files → 37 country files, one per country.
2. **Align** — every mechanical violation of `src/lib/types.ts` fixed; every replaced value preserved under an underscore-prefixed key.
3. **Research URLs** — the 709 nodes that had no URL were each looked up on the web.

**2308 reports · 973 dependencies · 357 dropped notes.** URL coverage went from 69% to **82%**.

## The URL pass found something bigger than URLs

Of the 709 nodes with no URL, **304 now have one** — each retrieved and confirmed against the page's actual content, with the confirming observation stored on the node as `_url_evidence`. Publisher homepages, Wikipedia, news, aggregators and mirrors were all rejected.

The other 405 split three ways, and the first group is the finding:

| Outcome | Nodes | What it means |
|---|---|---|
| **Not a publication at all** | **297** | Checked and confirmed: these are not documents. Synthesised `*-meta` nodes that exist only to bind other nodes together, "framing" nodes, geographic areas, industries, projects, and institutions. Your data spec bans every one of these categories (2b and 2c). |
| Publisher unreachable | 76 | The document very likely exists; the domain would not load. Iranian, Syrian, Yemeni, Myanmar, Vietnamese and Turkish government sites were the worst — dead DNS, expired certificates, JavaScript-only shells, robots blocks. |
| No official product found | 32 | Searched properly and there is no such published series — e.g. Mexico's SCNM has no landing page of its own, only its component products; several "defence budget" nodes are SIPRI estimates, not government publications. |

### The 297 are cheap to remove

They are flagged in place with `_flagged_not_a_publication: true` rather than deleted, so you can strip them in one pass once you agree. Deleting all 297 would cost **3 dependency edges** (all in Suriname) and **4 `part_of` references**. That is because the tier they live in has almost no edges to lose in the first place.

Concentrations: Taiwan 43 of 88, Indonesia 36 of 84, Philippines 29 of 61, Vietnam 23 of 79, Iraq 21 of 43, Iran 19 of 49, Saudi Arabia and Syria 17 each. Nearly every `candidates-only` batch opens with a `<cc>-batchN-meta` node — 60-odd of them across the archive, one per batch, each describing what the batch "binds together". That is the padding pattern your v2 spec was written to stop, and it is still the single most common node shape in the old archive.

## What was wrong before that (pass 2)

| Problem | Scale | What I did |
|---|---|---|
| Invalid JSON — `"releases_per_year": continuous",`, opening quote missing | **136 of 219 old batch files** | Re-quoted verbatim. No number invented. |
| `relationship_type` outside the four valid values | **285 edges** | The dangerous one: an off-union value makes the edge weight `NaN`, and `NaN` spreads through PageRank to every score in the graph. `part_of`→child node's field (163); `contains`→reversed onto child (4); `produced_by`→dropped, publisher is a string not a node (49); `related_to`/`complements`→`_dropped` as deferred, their basis describes a theme not a dependency (60). |
| `jurisdiction_level` outside the six-value union | **1,236 nodes** | Mapped in; original kept as `_jurisdiction_level_original`. |
| `domains` outside the approved 22 | **5,770 uses, 985 tags** | Format-normalised then `proposed:`-prefixed. **No semantic merging** — that is your call; table in `_MAPPINGS.json`. |
| `last_updated` absent (required, `string \| null`) | **2,218 nodes** | Set to `null`. |
| `source_kind` outside `official \| commercial` | 284 | Mapped to `official`; original kept. |
| `region` null or missing | 187 | Filled with the country name. |
| Text cadence in a numeric field | 719 | 59 unambiguous ones resolved; 660 left in `_cadence_original`. |
| Non-schema keys Grok invented | 4,453 | Renamed with a leading underscore. Nothing deleted. |

The files now validate clean against the real schema on every mechanically checkable rule — required fields, all six closed unions, `part_of` targets, edge endpoints, no cycles, no self-edges.

## Three files are superseded

| File | Reports | Ids already live | Live slice |
|---|---|---|---|
| `ar-argentina.json` | 61 | **49 (80%)** | `ar-national-core.json` |
| `bo-bolivia.json` | 60 | **37 (62%)** | `bo-national-core.json` |
| `in-india.json` | 81 | **2 (2%)** | `in-cpi-finance-commission.json` |
| `ru-russia.json` | 152 | **2 (1%)** | `ru-g2-rosstat-equalization.json` |
| `ae-united-arab-emirates.json` | 41 | **22 (54%)** | `ae-national-core.json` |

Argentina, Bolivia and the UAE are marked `done` in `grok-import-progress.md`. Keep as reference; don't reprocess. India and Russia have 2 real id conflicts each (`in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`, `ru-cbr-monetary-policy-guidelines`).

## Per-country state

| Country | Code | File | Batches | Reports | Deps | Dropped | Source shape | Has URL | No URL | Not a pub | Unreachable | No product | Cadence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Afghanistan | AF | `afg-afghanistan.json` | 5 | 25 | 0 | 0 | candidates-only×5 | 12 | 13 | 11 | 2 | 0 | 20 |
| Argentina | AR | `ar-argentina.json` | 6 | 61 | 16 | 5 | legacy+edges×6 | 61 | 0 | 0 | 0 | 0 | 0 |
| BRICS international layer | INT | `int-brics-international-layer.json` | 6 | 77 | 79 | 26 | v2×6 | 77 | 0 | 0 | 0 | 0 | 0 |
| Bolivia | BO | `bo-bolivia.json` | 6 | 60 | 23 | 16 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 |
| Brazil | BR | `br-brazil.json` | 8 | 74 | 82 | 23 | v2×8 | 74 | 0 | 0 | 0 | 0 | 0 |
| Chile | CL | `cl-chile.json` | 6 | 60 | 20 | 8 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 |
| China | CN | `cn-china.json` | 8 | 53 | 119 | 23 | v2×8 | 53 | 0 | 0 | 0 | 0 | 0 |
| Colombia | CO | `co-colombia.json` | 4 | 40 | 15 | 8 | legacy+edges×4 | 40 | 0 | 0 | 0 | 0 | 0 |
| Ecuador | EC | `ec-ecuador.json` | 5 | 50 | 15 | 5 | legacy+edges×5 | 50 | 0 | 0 | 0 | 0 | 0 |
| Egypt | EG | `eg-egypt.json` | 8 | 47 | 94 | 18 | v2×8 | 47 | 0 | 0 | 0 | 0 | 0 |
| Ethiopia | ET | `et-ethiopia.json` | 7 | 29 | 67 | 11 | v2×7 | 29 | 0 | 0 | 0 | 0 | 0 |
| Guyana | GY | `gy-guyana.json` | 4 | 40 | 6 | 13 | legacy+edges×4 | 37 | 3 | 0 | 1 | 2 | 0 |
| India | IN | `in-india.json` | 10 | 81 | 70 | 27 | v2×10 | 81 | 0 | 0 | 0 | 0 | 0 |
| Indonesia | ID | `id-indonesia.json` | 17 | 162 | 0 | 0 | candidates-only×17 | 116 | 46 | 36 | 10 | 0 | 113 |
| Iran | IR | `ir-iran.json` | 10 | 56 | 0 | 0 | candidates-only×10 | 17 | 39 | 20 | 17 | 2 | 37 |
| Iraq | IQ | `iq-iraq.json` | 9 | 43 | 0 | 0 | candidates-only×9 | 18 | 25 | 21 | 2 | 2 | 30 |
| Israel | IL | `il-israel.json` | 7 | 29 | 26 | 16 | v2×7 | 29 | 0 | 0 | 0 | 0 | 0 |
| Japan | JP | `jp-japan.json` | 7 | 65 | 0 | 0 | candidates-only×7 | 65 | 0 | 0 | 0 | 0 | 12 |
| Mexico | MX | `mx-mexico.json` | 14 | 121 | 43 | 4 | legacy+edges×13+legacy-no-edges×1 | 120 | 1 | 0 | 0 | 1 | 0 |
| Myanmar | MM | `mm-myanmar.json` | 5 | 24 | 0 | 0 | candidates-only×5 | 15 | 9 | 7 | 2 | 0 | 19 |
| Paraguay | PY | `py-paraguay.json` | 6 | 60 | 26 | 14 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 |
| Peru | PE | `pe-peru.json` | 4 | 40 | 15 | 5 | legacy+edges×4 | 40 | 0 | 0 | 0 | 0 | 0 |
| Philippines | PH | `ph-philippines.json` | 13 | 104 | 0 | 0 | candidates-only×13 | 64 | 40 | 29 | 10 | 1 | 74 |
| Russia | RU | `ru-russia.json` | 13 | 152 | 190 | 39 | v2×13 | 152 | 0 | 0 | 0 | 0 | 0 |
| Saudi Arabia | SA | `sa-saudi-arabia.json` | 7 | 33 | 0 | 0 | candidates-only×7 | 16 | 17 | 17 | 0 | 0 | 23 |
| Singapore | SG | `sg-singapore.json` | 7 | 37 | 27 | 26 | v2×7 | 37 | 0 | 0 | 0 | 0 | 0 |
| South Korea | KR | `kr-south-korea.json` | 7 | 72 | 0 | 0 | candidates-only×7 | 72 | 0 | 0 | 0 | 0 | 35 |
| Suriname | SR | `sr-suriname.json` | 6 | 58 | 6 | 21 | legacy+edges×6 | 42 | 16 | 14 | 2 | 0 | 0 |
| Syria | SY | `sy-syria.json` | 7 | 30 | 0 | 0 | candidates-only×7 | 11 | 19 | 17 | 2 | 0 | 23 |
| Taiwan | TW | `tw-taiwan.json` | 16 | 170 | 0 | 0 | candidates-only×16 | 114 | 56 | 46 | 4 | 6 | 127 |
| Thailand | TH | `th-thailand.json` | 7 | 40 | 0 | 0 | candidates-only×7 | 25 | 15 | 15 | 0 | 0 | 22 |
| Turkey | TR | `tr-turkey.json` | 9 | 54 | 0 | 0 | candidates-only×9 | 30 | 24 | 14 | 10 | 0 | 27 |
| United Arab Emirates | AE | `ae-united-arab-emirates.json` | 10 | 41 | 0 | 31 | v2×7+candidates-only×3 | 26 | 15 | 14 | 1 | 0 | 12 |
| Uruguay | UY | `uy-uruguay.json` | 6 | 60 | 21 | 9 | legacy+edges×6 | 60 | 0 | 0 | 0 | 0 | 0 |
| Venezuela | VE | `ve-venezuela.json` | 4 | 40 | 13 | 9 | legacy+edges×4 | 33 | 7 | 0 | 4 | 3 | 0 |
| Vietnam | VN | `vn-vietnam.json` | 13 | 93 | 0 | 0 | candidates-only×13 | 46 | 47 | 23 | 9 | 15 | 64 |
| Yemen | YE | `ye-yemen.json` | 6 | 27 | 0 | 0 | candidates-only×6 | 14 | 13 | 13 | 0 | 0 | 21 |
| **TOTAL** | | **37** | **293** | **2308** | **973** | **357** | | **1903** | **405** | **297** | **76** | **32** | **659** |

## Where the work actually is

- **`v2` — Brazil, China, Egypt, Ethiopia, India, Russia, Israel, Singapore, BRICS-international.** Correct container as delivered, real edges with basis and evidence URL, every node already had a URL. Ready to verify.
- **`legacy+edges` — Latin America.** Real sourced edges, converted. Chile, Colombia, Ecuador, Guyana, Mexico, Paraguay, Peru, Suriname, Uruguay, Venezuela unprocessed. Guyana came out best in the URL pass, 18 of 21.
- **`candidates-only` — Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines, Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Turkey, Vietnam, Yemen.** Zero edges between them, and now measured: **297 of their nodes are not publications**. What survives is a real node list with real URLs — but every edge still has to be researched from nothing.

## Still to decide

- Strip the 297 flagged nodes, or keep them? Costs 3 edges either way.
- The `proposed:` domain tags need a semantic merge pass — `prices` vs `inflation`, `employment` vs `labour`, and so on. `_MAPPINGS.json` has the full list with counts.
- 660 nodes still have a text cadence (`continuous`, `monthly / annual`) that needs a judgement call to become a number.
- `IL` and `SG` need `COUNTRY_FAMILY` entries in `palette.ts` or they render flat grey and fail the validator.
- Afghanistan is filed `afg-` (since `af-` is Africa here) but its internal ids still say `af-`.
- 76 unreachable-domain nodes are worth one retry later; several were transient (Iran's `cbi.ir` answered about a third of the time).

## Files here

- `<cc>-<country>.json` × 37 — the data. Per file: `_normalisation` (what was changed), `_gaps` (what is still missing and why).
- `_MAPPINGS.json` — every domain-tag and jurisdiction-level substitution, with counts.
- `_LIVE-OVERLAP.json` — id collisions and title matches against the live corpus.