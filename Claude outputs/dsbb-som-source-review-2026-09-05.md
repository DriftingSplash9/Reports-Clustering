# DSBB SoM import — source-node review (agent first pass, 2026-09-05)

136 edges in `src/data/research/dsbb-som-import-2026-09-05.json`. Each edge's source node was
auto-matched by country + title pattern; each target found by pattern in the SoM text. Reviewed
all 136 rows (country · DSBB category · matched node title · publisher · target · quote).

## A. Source-node match doubtful (the thing the import asked a reviewer to check)

| edge | why doubtful | suggested |
|---|---|---|
| `ir-national-accounts -> sna-1968` | Node publisher is Statistical Centre of Iran; the SoM quote says "The Central Bank of Iran (CBI) compiles and publishes Iran's national accounts". DSBB Iran NAG00 is CBI's series. | Retarget source to a CBI national-accounts node if one exists, else mint it; otherwise drop `wrong-target`. |
| `fr-insee-national-accounts -> sna-2008` | Node is *Annual* national accounts (2020 base); quote is about "French **Quarterly** National Accounts". Same compiler (INSEE), different release. | Retarget source to the INSEE quarterly-accounts node if one exists; else keep with a caveat. |
| `ph-fiscal-ops -> imf-gfsm` | Node is "National Government fiscal operations" (DBM); category is GGO00 (*general* government) and the quote describes the general-government framework. | Check whether a general-government GFS node exists (BTr/DOF); else keep with caveat. |
| `eg-industrial-production-index -> isic` | Node publisher is Ministry of Planning; Egypt's DSBB IND00 compiler should be checked (CAPMAS vs MoP). Uncertain, not wrong. | Verify compiler on the SoM page header. |
| `mx-scnm-pib-trimestral -> sna-2008` | Quarterly GDP node chosen for NAG00; fine if Mexico's DSBB NAG00 is the quarterly series (it is). Listed only for completeness. | Keep. |

All other 131 source matches read correctly (national-accounts node for NAG00, BOP node for
BOP00, etc.; renamed agencies — Maldives NBS→MBS, Nepal CBS→NSO — are the same body).

## B. Evidential problems the grader's `quote-found-artefact-named` cannot see (A grades that are wrong)

| edge | grade | what the quote actually says | suggested |
|---|---|---|---|
| `mm-national-accounts -> isic` | A | "Classifications used by the PD are **not in conformity** with … ISIC" | `denied` — this is a statement that the dependency does not hold. |
| `mm-national-accounts -> sna-2008` | A | "broadly follows … SNA **1968**. Consequently, changes introduced by the 1993 SNA/2008 SNA … are being implemented." | Retarget to `sna-1968` (A on that quote); 2008 at most a `deferred` lead. |
| `uy-deuda-publica -> imf-gfsm` | A | "and sectorizations **may differ** from those suggested by the GFSM 2014." | Divergence statement, not a basis. B at best; check the full SoM for a positive sentence. |
| `ru-minfin-federal-budget-execution -> imf-gfsm` | A | "follows a **national** functional classification not very different from COFOG … adopted in the GFSM 2014" | Names a national classification as the basis. B/C. |
| `eg-cbe-bop -> imf-bpm6` | A | "final steps to migrate to the BPM6." | Transition in progress. B. |
| `bo-cuentas-nacionales -> sna-1993` | A | "There are **plans** to publish … using COFOG suggested in the 1993 SNA" | Future intent. B; look for the framework sentence elsewhere in the SoM. |
| `il-international-investment-position -> imf-bpm6` | A | "changes due to the adoption of the BPM6 standards are **gradually being implemented**" | Adoption named; borderline. Keep A or B — Thomas's call. |
| `tt-national-accounts -> isic` | A | "working with … partners to ensure compliance with SNA 2008 and the adoption of ISIC Rev 4" | Future intent. B/C. |
| `lk-national-accounts -> sna-1993` | A | "SNA 1993 is **partly** implemented by the DCS." | Partial. B. |
| `py-comercio-exterior -> imf-bpm6` | A | Primary standard named is UN IMTS 2010; BPM6 named as the residency guideline within it. | Keep, but the stronger edge is `-> un-imts-2010` if that node exists. |

Pattern: 9 of the 10 are the grader awarding A on the *presence* of the standard's name with no
notion of negation, futurity or partial adoption. Worth a `NEGATED_QUOTE_PATTERNS` guard
(`not in conformity`, `may differ`, `plans to`, `being implemented`, `partly implemented`,
`migrate to`) that caps at B and prints the phrase — same shape as `WEAK_BASIS_PATTERNS` but on
the quote.

## C. Not flagged
The 6 edges with a non-standard basis (bs, by, cn, tl, ye×2) were hand-cited in the same slice, not
auto-matched; their sources are right.
