# Merge report — housing-portable-benefits slice

Slice: `research-input/grok-research-handoff-2026-07-31/grok-research/housing-portable-benefits-slice.json`
(10 reports, 8 proposed deps). Verified 2026-08-07. Output: `merge-work/housing.slice.json`.

## Edge verdicts

| # | Original claim (handoff) | Verdict | Evidence |
|---|---|---|---|
| 1 | on-cohb → cmhc-rental-market-survey (uses_data_from; O. Reg. 367/11 formula 80% AMR − (AFNI×0.30)/12) | **VERIFIED**, source REMAPPED to `on-portable-housing-benefit`, type upgraded to `calculated_from` (statutory formula) | Fetched full text of O. Reg. 367/11 (ontario.ca — WebFetch hit the JS wall, curl got the full 650 KB HTML). Schedule 4.1, s. 4(1) para 1: "the amount is calculated using the following formula: 80% AMR – [(AFNI × 0.30)/12]"; para 5: "'CMHC average market rent data' means the average market rent data by rental market area as determined by the rental market survey conducted annually by the Canada Mortgage and Housing Corporation." |
| 2 | mb-rent-assist → cmhc-rental-market-survey (uses_data_from) | **VERIFIED** as proposed | gov.mb.ca Rent Assist estimator: "Benefits are calculated based on the difference between 80% of Median Market Rent and 30% of net household income"; "The Median Market Rent is established by the Canada Mortgage and Housing Corporation…" |
| 3 | ns-cns-thb → cmhc-rental-market-survey (uses_data_from) | **VERIFIED** as proposed | NS news release 2024-08-23: "…calculated based on the applicant's actual rent, without exceeding the average monthly rent for the area, minus 30 per cent of the total household income"; "The Province is also implementing CMHC's new household income levels and average market rents for determining eligibility and supports." |
| 4 | bc-safer → (null) (calculated_from; SAFER Regulation s. 5) | **DROPPED** (`no-node-yet`) — node dropped too | Formula text confirmed in the archived bclaws consolidation of B.C. Reg. 298/77 (s. 5(1) 90% of rent gap with sliding taper; s. 5(6) base income = max OAS + max GIS for the preceding July), **but the current bclaws record marks the regulation "REPEALED BY 2015-23-50(b), EFFECTIVE APRIL 1, 2015"**. SAFER now runs administratively under BC Housing. Null target in the proposal; the real OAS/GIS-maximums linkage needs an OAS/GIS rates node that doesn't exist. |
| 5 | qc-pslq → (null) (calculated_from; 25% of income; "LMM adjusted jointly by SHQ and SCHL") | **REPLACED** by two verified edges | Québec.ca PSLQ page confirms "Le loyer du ménage… équivaut à 25 % de ses revenus totaux" under CQLR c. S-8, r. 3 → edge `qc-pslq → qc-loyer-modique-regulation` (calculated_from). Fetching the regulation on legisquebec found a **bonus edge into the existing corpus**: s. 6 amounts "indexed annually on 1 March in accordance with the Consumer Price Index for rental dwellings as determined for the preceding month of December by Statistics Canada for Ville de Montréal" → edge `qc-loyer-modique-regulation → statcan-cpi` (calculated_from, reference_period Dec/1-March). The SHQ–SCHL "loyers médians du marché" claim itself is DROPPED (`no-document`): the SHQ LMM page 403s and the PSLQ page never mentions SCHL; LMM belongs to the AccèsLogis regime, so possibly wrong-target too. |
| 6 | ab-rab → (null) (calculated_from; 30% incl. AISH from Oct 2025) | **DROPPED** (`no-document`) — node dropped too | alberta.ca/rent-assistance says only "amount is calculated based on household income and local market rent" — no 30%, no AISH statement, no CMHC named. Nothing to anchor an edge; program page is not a qualifying node document. |
| 7 | nb-rent-supplement → (null) | **DROPPED** (`note`) — node dropped too | Self-contained 30%-of-income residual; no external report named, no target proposed, only a gnb.ca program page (handoff URL contains a typo "suppplement"). |
| 8 | sk-housing-benefit → (null) | **DROPPED** (`no-document`) — node dropped too | Evidence cited as "Saskatchewan Housing Corporation fact sheets (2026 rates)" with no URL; nothing fetchable, no external target. |

Also: **bc-rap** arrived with no proposed edge at all and no evidence document — dropped with a `_dropped` note rather than kept isolated.

## What's in the output slice

- **Reports (6 new):** `cmhc-rental-market-survey`, `on-portable-housing-benefit` (remapped from handoff `on-cohb`), `mb-rent-assist`, `ns-cns-thb`, `qc-loyer-modique-regulation` (newly minted — the statute that actually carries Quebec's formulas), `qc-pslq`. Existing node reused as edge target: `statcan-cpi` (defined in `src/data/reports.ts`, not re-declared here, matching corpus practice).
- **Dependencies (5 verified):** three provincial benefits → CMHC RMS; qc-pslq → qc regulation; qc regulation → statcan-cpi.
- Handoff domains `housing`/`residual-income`/`rental-market`/`seniors` are off the closed list; mapped to `benefits` (+ `inflation` for the two price-bearing nodes) per the guide.

## Notes for the next session

1. **on-cohb remap.** The verified formula lives in O. Reg. 367/11 Schedule 4.1, the *portable housing benefit framework* for service managers. The Canada-Ontario Housing Benefit uses the same 80% AMR − 30% AFNI/12 design per its Program Guidelines, but the guidelines PDF I found (a municipal agenda copy on escribemeetings) 403'd, so I did not assert a separate COHB node. The node is framed on the regulation and mentions COHB in the description. If anyone later wires other edges to `on-cohb`, point them at `on-portable-housing-benefit`.
2. **BC SAFER regulation is repealed** (since 2015-04-01) — do not let a future slice cite B.C. Reg. 298/77 as live law. A current BC Housing SAFER rate table could anchor a node, and an OAS/GIS maximum-rates node would immediately pick up two documented edges (BC SAFER base income; the corpus's existing Alberta Seniors Benefit note also mentions OAS/GIS maximums written into formulas).
3. **CMHC RMS** is now in the corpus and is likely to attract more edges (other provinces, StatCan CPI shelter component uses CMHC data historically — not asserted, not checked).
4. Manitoba's edge evidence is a program estimator page; the Rent Assist Regulation (M.R. 148/2015) would be a stronger statutory basis if someone wants to upgrade it to `calculated_from`.
5. legisquebec 403s to curl but works via WebFetch; ontario.ca e-Laws is the reverse (JS wall for WebFetch, fine via curl).
