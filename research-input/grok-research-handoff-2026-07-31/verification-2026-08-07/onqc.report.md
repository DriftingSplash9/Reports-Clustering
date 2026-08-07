# onqc slice — merge report (2026-08-07)

Slice source: `research-input/grok-research-handoff-2026-07-31/grok-research/municipal-ontario-quebec-slice.json`
(6 reports, 6 dependencies, `_dropped` empty — nothing to carry forward from it).
Output: `merge-work/onqc.slice.json`.

Critical context found before verification: the live corpus already contains
`src/data/research/ontario-ompf-mpac.json`, an adjudicated slice owning the
`on-ompf` and `mpac-assessment` nodes and *both* Ontario OMPF edges this handoff
proposes. Two of the handoff's six edges are therefore duplicates of live edges,
not new claims.

## Per-edge verdicts

| # | Original claim (handoff) | Verdict | Detail |
|---|---|---|---|
| 1 | `on-ompf -> mpac-assessment` (uses_data_from, Appendix F rows) | DUPLICATE — not re-proposed | Live edge exists in `ontario-ompf-mpac.json` with fuller quotation and a reference_period block. Recorded in `_dropped` (reason `note`). |
| 2 | `on-ompf -> statcan-census-population` (uses_data_from, six StatCan Appendix F rows) | DUPLICATE, basis already narrowed — not re-proposed | Live edge exists but rests deliberately on the one row naming a release ('based on Statistics Canada data from the 2021 Census'); the other five rows are agency-only and already in the live file's `_dropped`. Re-adding the handoff's broad basis would re-broaden an edge the corpus narrowed on purpose. `_dropped` (reason `note`). |
| 3 | `qc-perequation -> null` (uses_data_from, assessment roll + decree population) | DROPPED (`no-document`) | Verified against legisquebec: F-2.1, r. 11 ss. 8–9 confirmed (population = highest of current or prior 3 fiscal years; standardized property wealth per chapter XVIII.1 of the Act from municipal rolls/summaries). The regulation names **no** statistical agency. Null target by the handoff's own admission; no edge possible. |
| 4 | `qc-perequation -> isq-vitalite-economique` (uses_data_from, M-22.1 r. 1.2 s. 3(2°)) | VERIFIED but REMAPPED source → new node `qc-partage-croissance-tvq` | The citing regulation is the QST-growth apportionment regulation ('Règlement sur la répartition entre les municipalités du montant représentant la croissance d'une partie de la taxe de vente du Québec'), **not** the péréquation regulation; the handoff's own `_notes` conceded this. Quote verified verbatim: the index is 'celui établi dans la dernière liste publiée par l'Institut de la statistique du Québec'. Edge issued as `qc-partage-croissance-tvq -> isq-vitalite-economique`; wrong-source version recorded in `_dropped` (reason `note`) so it is not re-proposed. |
| 5 | `on-hpp -> statcan-census-population` (uses_data_from, AG follow-up) | VERIFIED | Auditor General 2023 follow-up (1-07FU) quotes verified: model uses 'Ontario Works and Ontario Disability Support Program caseload data … and updated Statistics Canada data'; 'four socioeconomic indicators (deep core housing need, low-income measure, Indigenous population, youth population) … All four indicators were updated using 2021 census data.' The last sentence names the release, clearing the agency-only test. |
| 6 | `on-legal-aid-ontario -> statcan-census-population` (methodology_depends_on, LIM alignment) | DROPPED (`wrong-target`) | LAO 2023-24 Annual Report quote verified verbatim ('aligned with the 2011 Low Income Measure') — but the LIM is an income-statistics product, not a Census release; pointing it at `statcan-census-population` is the substitution pattern the corpus has rejected before (statcan-hfce case). Alignment is also to a frozen 2011 vintage the thresholds no longer track. Node dropped with the edge. |

## Report (node) dispositions

- `on-ompf`, `mpac-assessment` — already live; NOT included in this slice.
- `qc-perequation` — NEW, kept as a deliberate **isolated** node (consolidated
  regulation F-2.1, r. 11; the Quebec half of the slice's point; URL verified).
- `qc-partage-croissance-tvq` — NEW (minted this pass), anchors the ISQ edge.
  House-pattern id; consolidated regulation M-22.1, r. 1.2; URL verified.
- `isq-vitalite-economique` — NEW, anchors the ISQ edge. **Cadence corrected:**
  handoff said annual; ISQ's page says biennial (next update March 2027; last
  edition Feb 2025 for 2022 data) → `releases_per_year: 0.5`. Landing URL is the
  EN document page (`statistique.quebec.ca/en/document/economic-vitality-index`);
  the FR slug I tried first 404s.
- `on-hpp` — NEW, anchors the AG edge. Node status is the judgement call of this
  slice: HPP is a funding program whose allocations/investment-plan cycle is
  annual, admitted on the same footing as `on-ompf` (allocations + published
  model documentation). The published landing page is
  `ontario.ca/page/addressing-homelessness` (the guessed
  `/page/homelessness-prevention-program` 404s). If the integrator wants a
  stricter reading, the edge could be re-anchored on a published HPP Program
  Guidelines document if one is located.
- `on-legal-aid-ontario` — DROPPED (no surviving edge; doubtful node — thresholds
  live inside the Legal Aid Services Rules; handoff's `municipal-finance` domain
  tag did not fit).

## For the next session

- If a Statistics Canada LIM / Canadian Income Survey node is ever built, the
  LAO claim could return as a *historical* `methodology_depends_on` — the 2023-24
  Annual Report quote is real and already extracted above.
- `ontario-ompf-mpac.json`'s `_dropped` already holds the best Ontario leads
  (Municipal FIR, OPTA, Ontario Parcel, SDI); this handoff's `_notes` flagged FIR
  and OPTA too — nothing new added there.
- Domains chosen for `isq-vitalite-economique` are `population`, `labour`
  (what the index measures), not `municipal-finance` (what it is used for);
  flip if house style prefers use-side tagging.
