# Grok round 3 redo — research note (2026-08-22)

`files_received: true` (10/10 attachments). Content used the country JSON id inventories, not just the prompt’s Rule A list.

## What is mintable

### 1. Mauritius SNA-2008 (the held-out edge) — DONE

The previous attempt failed because there was no `mu-national-accounts` node and the easy quote was the 2011 Digest, which still said SNA 2008 was “not yet implemented.”

Current primary:

- Statistics Mauritius, *National Accounts Estimates*, June 2026, ESI Issue No. 1937
- URL: https://statsmauritius.govmu.org/Documents/Statistics/ESI/2026/EI1937/NAE_Jun26_300626.pdf
- Verbatim: “Concepts and definitions used in the computation of estimates in this issue are given at section 6.3 and are according to the United Nations System of National Accounts (SNA) 2008 manual.”
- Same issue: the September 2026 CEA-2023 benchmark “will incorporate some of the recommendations of the System of National Accounts 2025 (SNA 2025)” — so 2008 is the *current* standard.

Propose node `mu-national-accounts` (quarterly ESI; 4 releases/year) and edge:

`mu-national-accounts → sna-2008` (`methodology_depends_on`)

### 2. Mauritius SDDS Plus (new, stronger than e-GDDS)

Not asked for, but it is the cleanest cross-border standards fact in this batch and it is *current* (16 March 2026).

- IMF PR 26/077: first African SDDS Plus adherent, 32nd globally.
- Statistics Mauritius NSDP, last updated 18 August 2026, states adherence in the office’s own words.
- Communiqué on statsmauritius.govmu.org, 18 March 2026.

Edges:

- `mu-national-accounts → imf-sdds-plus`
- `mu-statsmauritius-cpi → imf-sdds-plus`

Both `methodology_depends_on` (standards-edge convention from 5s). If you prefer a single institutional edge from `mu-statsmauritius`, that is a merge choice; the NSDP names both series.

### 3. Afghanistan CR 06/251 corroboration — DONE as a basis addendum

CR 06/251 is the July 2006 PRGF request / seventh SMP review, not a data-observance report. The GDDS language is in the package, not the staff-appraisal headline.

MEFP (Attachment II):

> “we continue to make progress in drafting the metadata necessary to participate in the General Data Dissemination System.”

ED statement in the same PDF:

> “STA has indicated (since the publication of the staff report) that Afghanistan will imminently become a participant in the General Data Dissemination Standards (GDDS).”

DSBB important-dates: Afghanistan metadata first posted **22 June 2006**.

Treat this as additional `basis` + `evidence_url` on the existing `af-national-accounts` / `af-nsia → imf-e-gdds` edge. Do **not** mint CR 06/251 as a node (same reason 5s dropped observance-report nodes).

Do **not** also wire `af-national-accounts → sna-2008`. DSBB NA metadata and the UN questionnaire reply are SNA 1993 (with leftover 1968 practice).

Bonus documented fact, same country: DAB’s own External Sector Statistics page titles the BOP file “Balance of Payments Transactions (BPM6)” (latest Q1 2021, dormant). Landed as `af-bop → imf-e-gdds` rather than inventing `imf-bpm6`.

### 4. Thin-country edges that are more than a dated e-GDDS row

| Country | Proposed | Why it is not just the 5s participation row |
|---|---|---|
| IQ | `iq-bop → imf-e-gdds` | DSBB BOP DQAF: “Transactions are classified largely in accordance with BPM6.” Category metadata, not the important-dates table. |
| IR | `ir-national-accounts → imf-e-gdds` | DSBB NA DQAF (updated 6 Aug 2012): CBI compiles accounts “based on … SNA 1968 and 1993.” Honest SNA vintage; not 2008. |
| AF | CR 06/251 addendum + DAB BPM6 file title | See above. |
| SL | none | COICOP 2018 is real; ECOWAS is still the same near-miss. |
| SD | none | COMESA Article 140 still uncited by CBS/CBOS. Existing `sd-cbos → sd-cbs-cpi` (`uses_data_from`) already in the attached Sudan slice. |
| SY / YE | none | International URLs on the nodes are publisher fallbacks, not documents. No new SNA/BPM quote from CBS/CSO. |

## What was refused

- Inventing `imf-bpm6` this round (worth a later standards-node discussion; Iraq and Afghanistan both name BPM6).
- Force-linking Iran, Iraq, or Afghanistan national accounts to `sna-2008`.
- Relitigating Sudan→COMESA or Sierra Leone→ECOWAS.
- Minting FAO GIEWS / OCHA / IOM / World Bank WEM as international nodes so that YE/SY “derived from” URLs become `uses_data_from` edges. That is an architecture call, not a document find.
- Linking `ir-eaeu` to a trade series without an SCI/CBI/customs citation.
- Any URL to `cbssyr.sy` or `cso-yemen.org`.

## Suggested mint order

1. Add `mu-national-accounts`.
2. Wire the three Mauritius standards edges.
3. Patch the Afghanistan e-GDDS `basis` with the CR 06/251 quotes (same edge, richer evidence).
4. Add `iq-bop → imf-e-gdds` and `ir-national-accounts → imf-e-gdds` only if 5s did not already attach those exact pairs; if it did, merge the new quotes into `basis`.
5. Leave SY/YE/SL/SD thin except where an existing intra-country edge already has a quote (Sudan CBOS Table 24).

Machine-readable slice: `artifacts/crossborder-round3-2026-08-22.json`.
