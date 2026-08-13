# Merge report — classification-hubs slice (Grok handoff 2026-07-31)

Verified 2026-08-07 against primary sources. Outputs: `merge-work/classification.slice.json`.

## Id remapping (handoff id → disposition)

| Handoff id | Disposition |
|---|---|
| `statcan-business-register` | NEW node (id kept) |
| `statcan-assi` | NARROWED → new node `statcan-assi-amusement-recreation` (umbrella "family of surveys" is off-model; its evidence record IMDB 2425 is specifically the Amusement and Recreation survey) |
| `statcan-qsfs` | NEW node (id kept; title simplified to "Quarterly Survey of Financial Statements") |
| `statcan-cimt` | NEW node (id kept) |
| `cihi-dad` | NEW node (id kept) |
| `statcan-lfs` | REMAP → existing live id `statcan-lfs` (defined in `src/data/reports.ts`; note it is NOT in `merge-work/live-ids.txt`, which only covers the research JSON files) |
| `naics` | REMAP → existing live id `naics` (`src/data/research/international-frameworks.json`) |
| `noc` | REMAP → existing live id `noc` (`src/data/research/manufacturing-and-classifications.json`) |
| `hs-harmonized-system` | NEW node, id minted as `hs` to match the bare-acronym house pattern for classifications (`naics`, `napcs`, `isic`, `anzsic`, `noc`). Handoff's "international / federal" jurisdiction fixed to `international`, country `INT`, publisher WCO. |
| `icd-10-ca` | NEW node (id kept; title covers both ICD-10-CA and CCI, which CIHI versions and publishes together) |

## Per-edge verdicts

| # | Claim (handoff) | Verdict |
|---|---|---|
| 1 | statcan-business-register → naics | **VERIFIED** (as `methodology_depends_on`). IMDB 1105: "Establishments are coded based on the concept of major business activity in a manner consistent with the approach outlined by the North American Industry Classification System (NAICS)." |
| 2 | statcan-assi → naics | **VERIFIED, NARROWED** to `statcan-assi-amusement-recreation → naics`. IMDB 2425: "The target population consists of establishments classified to the subsector 713 - Amusement, gambling and recreation industries, according to the North American Industry Classification System (NAICS) 2022." Umbrella node dropped (`wrong-target` note in `_dropped`). |
| 3 | statcan-qsfs → naics | **VERIFIED** (as `methodology_depends_on`). IMDB 2501: "Under the North American Industry Classification System (NAICS), such an enterprise is classified to the individual NAICS code that relates to the activity that provides the most value-added." |
| 4 | statcan-cimt → hs-harmonized-system | **VERIFIED** as `statcan-cimt → hs`. The IMDB 2201 page itself only yields a thin quote ("For each Harmonized System (HS) code, unit values are evaluated…"), so evidence_url points to the stronger Reference Guide to Canadian International Merchandise Trade Statistics (13-605-X): "Canadian import HS … codes have an additional two digits for tariffs … and two more digits for statistical purposes …, resulting in a ten-digit code. For exports, two digits are added for statistical purposes, resulting in an eight-digit code." |
| 5 | cihi-dad → icd-10-ca | **VERIFIED** (as `methodology_depends_on`). CIHI DAD metadata: "Since 2004–2005, all DAD records have been reported in ICD-10-CA and CCI." |
| 6 | statcan-lfs → noc | **DROPPED (duplicate)** — edge already live in `src/data/research/manufacturing-and-classifications.json` with the same direction and type. |
| 7 | statcan-lfs → naics | **DROPPED (duplicate)** — edge already live in `src/data/research/international-frameworks.json`. |
| + | statcan-assi-amusement-recreation → statcan-business-register | **BONUS VERIFIED** (`uses_data_from`). IMDB 2425: observed population is establishments "found on the Statistics Canada Business Register as of the last day of the reference year." This documents the handoff's `_note` that the Business Register is the common upstream frame — the slice's actual new value. |

## Relationship-type correction

The handoff typed every classification-coding edge `uses_data_from`. The live corpus consistently types survey→classification edges as `methodology_depends_on` (statcan-msm→naics, statcan-lfs→naics, statcan-ippi→naics, anzsic→isic, bls-qcew→naics). All five classification edges here follow that precedent; the one genuine data-flow edge (survey drawn from the Business Register frame) is `uses_data_from`.

## Notes for integration

- **`hs` is a new international hub** with only one in-edge so far (statcan-cimt). Obvious future wiring: US Census trade statistics, CBSA tariff, statcan trade by exporter/importer — none attempted here (out of slice scope).
- **`icd-10-ca` → WHO ICD-10** is a real upstream dependency (ICD-10-CA is a Canadian enhancement of the WHO classification) but there is no WHO ICD node in the corpus; not minted here. Consider for a future health slice; would also connect existing `cihi-nhex` neighbourhood.
- **`statcan-business-register` domains**: mapped to `national-accounts` (closed domain list has no business-frame/classification domain; the handoff's `business-frame`, `classification`, `services`, `finance`, `trade` domains all had to be mapped — I used `national-accounts` for the economic-survey nodes and `health` for the CIHI pair).
- **live-ids.txt is incomplete**: it omits the ~18 core ids defined in `src/data/reports.ts` (statcan-lfs, statcan-cpi, boc-policy-rate, …). Worth regenerating before the next slice so a future session doesn't mint a duplicate `statcan-lfs`.
- ASSI is a family: if broader service-industry coverage is wanted later, each sub-survey has its own IMDB record and would verify the same two edges pattern (→ naics, → statcan-business-register).
