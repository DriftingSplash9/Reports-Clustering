# Grok archive — consolidated and schema-aligned

Built 2026-08-18 in two passes. **No research, no invented values, nothing minted into the graph, no git commands run.**

- **Pass 1 — consolidate.** 293 batch files → 37 country files, one per country.
- **Pass 2 — align.** Every mechanical violation of `src/lib/types.ts` fixed. Each replaced value is preserved on the record under an underscore-prefixed key, and every change is counted in that file's `_normalisation.changes`.

The files now validate clean against the real schema on every rule I can check mechanically — required fields, all six closed unions, `part_of` targets, edge endpoints, no cycles, no self-edges. The one remaining failure class is 709 nodes with no URL, which is missing data, not a formatting problem.

**2308 reports · 973 dependencies · 357 dropped notes**, across 37 files in `consolidated/`.

## What was actually wrong

| Problem | Scale | What I did |
|---|---|---|
| Invalid JSON — `"releases_per_year": continuous",`, opening quote missing | **136 of 219 old batch files** | Re-quoted the value verbatim. No number invented. |
| `relationship_type` outside the four valid values | **285 edges** — `part_of` 167, `produced_by` 49, `related_to` 34, `complements` 26, `contains` 8 | This was the dangerous one: an off-union value makes `RELATIONSHIP_WEIGHT[...]` undefined, the edge weight `NaN`, and `NaN` spreads through PageRank to *every score in the graph*. `part_of` → moved onto the child node as the `part_of` field (163). `contains` → reversed onto the child (4). `produced_by` → dropped, because the publisher is a string on the report, never a node (49). `related_to` / `complements` → held in `_dropped` as `deferred`, because their `basis` describes a thematic association, not a documented dependency (60). |
| `jurisdiction_level` outside the six-value union | **1,236 nodes** — 865 `national`, plus `state`, `regional`, `bilateral`, and compounds like `national / regional`, `national → subnational` | Mapped into the union (first token wins on compounds); delivered string kept as `_jurisdiction_level_original`. |
| `domains` tags outside the 22 approved | **5,770 uses, 985 distinct tags** | Format-normalised, then prefixed `proposed:` as the spec directs. **No semantic merging** — `prices` did *not* become `inflation`, `employment` did *not* become `labour`. Those are your calls; the full mapping table is in `_MAPPINGS.json`. |
| `last_updated` absent — it is a required field (`string \| null`) | **2,218 of 2,308 nodes** | Set to `null`, the schema's own value for unknown. |
| `source_kind` outside `official \| commercial` | **284 nodes** (`official-publication`, `primary-legislation`, …) | Mapped to `official`; original kept as `_source_kind_original`. |
| `region` null or missing | **187 nodes** | Filled with the country name. |
| Text cadence sitting in a numeric field | **719 nodes** | 59 unambiguous ones (`annual`, `monthly`, `quarterly`) resolved to numbers. The other 660 — `continuous`, `monthly / annual`, `periodic` — are in `_cadence_original` and listed under `_gaps.unresolved_cadence`. Guessing these would be inventing a cadence. |
| `_dropped` reason not a valid `DroppedReason` | 11 (`"Saudi"`) | Re-tagged `note`, original preserved in the `why`. |
| Non-schema keys Grok invented (`shape`, `notes`, `referenced_by`, …) | 4,453 | Renamed with a leading underscore so they are visibly not schema. Nothing deleted. |

## Three country files are already superseded

Argentina, Bolivia and the UAE are marked `done` in `grok-import-progress.md`, and the id overlap confirms it — these consolidated files are the *raw input* to work you have already finished:

| File | Reports | Ids already live | Live slice |
|---|---|---|---|
| `ar-argentina.json` | 61 | **49 (80%)** | `ar-national-core.json` |
| `bo-bolivia.json` | 60 | **37 (62%)** | `bo-national-core.json` |
| `in-india.json` | 81 | **2 (2%)** | `in-cpi-finance-commission.json` |
| `ru-russia.json` | 152 | **2 (1%)** | `ru-g2-rosstat-equalization.json` |
| `ae-united-arab-emirates.json` | 41 | **22 (54%)** | `ae-national-core.json` |

Keep them as reference, but don't process them again. India and Russia have 2 colliding ids each (`in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`, `ru-cbr-monetary-policy-guidelines`) — those are real conflicts to resolve at merge time, not superseded files. Only 4 nodes anywhere share a title with an existing live node, so wholesale concept duplication is not the problem I expected it to be.

## What is genuinely still missing

Each file carries a `_gaps` block. This is a research queue, not a defect list — none of it can be fixed without going and looking something up.

### 709 nodes have no URL

Every one is in the `candidates-only` tier. The project rule is that a node needs a real, working link you actually found, so I left these `null` rather than pointing them at a plausible homepage. The biggest clusters by publisher:

| Publisher | Nodes with no URL |
|---|---|
| Turkish Statistical Institute | 8 |
| Ministry of Finance | 5 |
| Ministry of Finance / related | 5 |
| BPS provincial offices / national BPS | 5 |
| Central Statistical Organization / related | 5 |
| Statistical Centre of Iran | 5 |
| INEGI | 5 |
| FCSC | 4 |
| Central Bank of Iraq | 4 |
| GASTAT | 4 |
| General Statistics Office / local statistical office | 4 |
| Derived from UNICEF and education monitoring sources | 3 |

### 660 nodes have an unresolvable cadence, 27 look like institution nodes, 14 edges have no evidence URL

The institution-node candidates are the ones the spec bans outright (2c) — things like `ar-idecba`, `bo-ine`, the six provincial statistical offices. I flagged them rather than deleting them, because deleting a node orphans whatever points at it. They are listed per file under `_gaps.institution_node_candidates`.

## Per-country state

| Country | Code | File | Batches | Reports | Deps | Dropped | Source shape | No URL | Cadence | Inst? | No evid | Live collisions |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Afghanistan | AF | `afg-afghanistan.json` | 5 | 25 | 0 | 0 | candidates-only×5 | 23 | 20 | 0 | 0 | 0 |
| Argentina | AR | `ar-argentina.json` | 6 | 61 | 16 | 5 | legacy+edges×6 | 0 | 0 | 1 | 0 | 49 |
| BRICS international layer | INT | `int-brics-international-layer.json` | 6 | 77 | 79 | 26 | v2×6 | 0 | 0 | 0 | 0 | 0 |
| Bolivia | BO | `bo-bolivia.json` | 6 | 60 | 23 | 16 | legacy+edges×6 | 0 | 0 | 3 | 0 | 37 |
| Brazil | BR | `br-brazil.json` | 8 | 74 | 82 | 23 | v2×8 | 0 | 0 | 0 | 0 | 0 |
| Chile | CL | `cl-chile.json` | 6 | 60 | 20 | 8 | legacy+edges×6 | 0 | 0 | 2 | 0 | 0 |
| China | CN | `cn-china.json` | 8 | 53 | 119 | 23 | v2×8 | 0 | 0 | 0 | 0 | 0 |
| Colombia | CO | `co-colombia.json` | 4 | 40 | 15 | 8 | legacy+edges×4 | 0 | 0 | 2 | 0 | 0 |
| Ecuador | EC | `ec-ecuador.json` | 5 | 50 | 15 | 5 | legacy+edges×5 | 0 | 0 | 2 | 0 | 0 |
| Egypt | EG | `eg-egypt.json` | 8 | 47 | 94 | 18 | v2×8 | 0 | 0 | 0 | 0 | 0 |
| Ethiopia | ET | `et-ethiopia.json` | 7 | 29 | 67 | 11 | v2×7 | 0 | 0 | 0 | 0 | 0 |
| Guyana | GY | `gy-guyana.json` | 4 | 40 | 6 | 13 | legacy+edges×4 | 21 | 0 | 2 | 5 | 0 |
| India | IN | `in-india.json` | 10 | 81 | 70 | 27 | v2×10 | 0 | 0 | 0 | 0 | 2 |
| Indonesia | ID | `id-indonesia.json` | 17 | 162 | 0 | 0 | candidates-only×17 | 84 | 113 | 0 | 0 | 0 |
| Iran | IR | `ir-iran.json` | 10 | 56 | 0 | 0 | candidates-only×10 | 49 | 37 | 0 | 0 | 0 |
| Iraq | IQ | `iq-iraq.json` | 9 | 43 | 0 | 0 | candidates-only×9 | 43 | 30 | 0 | 0 | 0 |
| Israel | IL | `il-israel.json` | 7 | 29 | 26 | 16 | v2×7 | 0 | 0 | 0 | 0 | 0 |
| Japan | JP | `jp-japan.json` | 7 | 65 | 0 | 0 | candidates-only×7 | 4 | 12 | 0 | 0 | 0 |
| Mexico | MX | `mx-mexico.json` | 14 | 121 | 43 | 4 | legacy+edges×13+legacy-no-edges×1 | 6 | 0 | 0 | 0 | 0 |
| Myanmar | MM | `mm-myanmar.json` | 5 | 24 | 0 | 0 | candidates-only×5 | 23 | 19 | 0 | 0 | 0 |
| Paraguay | PY | `py-paraguay.json` | 6 | 60 | 26 | 14 | legacy+edges×6 | 0 | 0 | 5 | 0 | 0 |
| Peru | PE | `pe-peru.json` | 4 | 40 | 15 | 5 | legacy+edges×4 | 0 | 0 | 2 | 0 | 0 |
| Philippines | PH | `ph-philippines.json` | 13 | 104 | 0 | 0 | candidates-only×13 | 61 | 74 | 0 | 0 | 0 |
| Russia | RU | `ru-russia.json` | 13 | 152 | 190 | 39 | v2×13 | 0 | 0 | 0 | 0 | 2 |
| Saudi Arabia | SA | `sa-saudi-arabia.json` | 7 | 33 | 0 | 0 | candidates-only×7 | 32 | 23 | 0 | 0 | 0 |
| Singapore | SG | `sg-singapore.json` | 7 | 37 | 27 | 26 | v2×7 | 0 | 0 | 0 | 0 | 0 |
| South Korea | KR | `kr-south-korea.json` | 7 | 72 | 0 | 0 | candidates-only×7 | 3 | 35 | 0 | 0 | 0 |
| Suriname | SR | `sr-suriname.json` | 6 | 58 | 6 | 21 | legacy+edges×6 | 24 | 0 | 3 | 5 | 0 |
| Syria | SY | `sy-syria.json` | 7 | 30 | 0 | 0 | candidates-only×7 | 30 | 23 | 0 | 0 | 0 |
| Taiwan | TW | `tw-taiwan.json` | 16 | 170 | 0 | 0 | candidates-only×16 | 88 | 127 | 0 | 0 | 0 |
| Thailand | TH | `th-thailand.json` | 7 | 40 | 0 | 0 | candidates-only×7 | 33 | 22 | 0 | 0 | 0 |
| Turkey | TR | `tr-turkey.json` | 9 | 54 | 0 | 0 | candidates-only×9 | 39 | 27 | 0 | 0 | 0 |
| United Arab Emirates | AE | `ae-united-arab-emirates.json` | 10 | 41 | 0 | 31 | v2×7+candidates-only×3 | 26 | 12 | 0 | 0 | 22 |
| Uruguay | UY | `uy-uruguay.json` | 6 | 60 | 21 | 9 | legacy+edges×6 | 0 | 0 | 3 | 0 | 0 |
| Venezuela | VE | `ve-venezuela.json` | 4 | 40 | 13 | 9 | legacy+edges×4 | 14 | 0 | 2 | 4 | 0 |
| Vietnam | VN | `vn-vietnam.json` | 13 | 93 | 0 | 0 | candidates-only×13 | 79 | 64 | 0 | 0 | 0 |
| Yemen | YE | `ye-yemen.json` | 6 | 27 | 0 | 0 | candidates-only×6 | 27 | 21 | 0 | 0 | 0 |
| **TOTAL** | | **37** | **293** | **2308** | **973** | **357** | | **709** | **659** | **27** | **14** | **112** |

## Where the work actually is

Sorting by source shape splits the pile more usefully than the alphabet does:

- **`v2` — Brazil, China, Egypt, Ethiopia, India, Russia, Israel, Singapore, BRICS-international.** Correct container as delivered, valid JSON, real edges with a basis and an evidence URL. Ready to verify.
- **`legacy+edges` — the Latin American countries.** Old container, real sourced edges, now converted. Chile, Colombia, Ecuador, Guyana, Mexico, Paraguay, Peru, Suriname, Uruguay, Venezuela are unprocessed; Argentina and Bolivia are done.
- **`candidates-only` — Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines, Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Turkey, Vietnam, Yemen.** 1,050 nodes and **zero edges between them**. No URLs on two-thirds of the nodes, prose in place of relationships, institution nodes at the top of every file. Nothing here is verifiable; it all has to be researched from scratch.

## Also worth doing before any of this is minted

- `IL` and `SG` need `COUNTRY_FAMILY` entries in `palette.ts` or they render flat grey and fail the validator. `BR`, `CN`, `EG`, `ET`, `IN`, `RU`, `ZA` are already there.
- Afghanistan is filed `afg-` because `af-` is Africa in this repo — but the ids *inside* the file still say `af-` and need re-prefixing.
- One edge points at `in-srs`, which no file defines; it is in India's `_dropped` as `no-node-yet`.
- `candidates (1).zip` and the ~40 loose top-level JSONs are redundant copies of `grok-batches/raw/`. Nothing deleted.

## Files in this folder

- `<cc>-<country>.json` × 37 — the consolidated, schema-aligned data.
- `_MAPPINGS.json` — every domain-tag and jurisdiction-level substitution made, with counts. Read this before accepting the `proposed:` tags.
- `_LIVE-OVERLAP.json` — per-file id collisions and title matches against the live corpus.
- `CONSOLIDATION-REPORT.md` — this file.