# Cross-border dependency research — raw verification, 2026-08-22

**Scope.** Every `evidence_url` + `evidence_quote` in Grok's two research files was
checked against the live source: round 1 (`crossborderdepsconsolidated20260821.json`,
38 edges across 12 countries + 8 proposed international nodes) and round 2 (the
follow-up pasted into chat 2026-08-22: SD/MU/SL, the four thin countries, and
replacement evidence for the four sourcing problems the 5q review flagged).
Method: WebFetch from the cloud sandbox for ordinary pages and PDFs; Thomas's own
Chrome (his approval, this session) for the JS-walled `dsbb.imf.org` tables and the
JS-rendered IMF press releases. **Verify only — nothing has been minted.**

**Headline: the sourcing is real.** Of 62 evidence entries checked, **59 verified**,
almost all with the quote found word-for-word at the URL. Zero contradictions, zero
fabricated documents, zero dead links. The three that didn't fully verify are all
secondary/supporting entries (details below), and the one deliberately-superseded
entry (Iraq's round-1 ODIN edge) is replaced by round 2's primary IMF sources, which
both verified. Grok's round 2 also genuinely fixed all four problems the 5q review
raised.

**But the file cannot be minted as-is.** Three merge-blocking problems, none of them
about sourcing:

## Blocker 1 — every relationship_type but one is off-union

`src/lib/types.ts` defines `RelationshipType` as a **closed union of exactly four
values**: `calculated_from`, `uses_data_from`, `methodology_depends_on`, `cites`.
The types file's own warning: an off-union value makes
`RELATIONSHIP_WEIGHT[...]` return `undefined`, the edge weight goes `NaN`, and NaN
propagates through the entire PageRank — "silent and total" (the validator should
catch it first, but either way the mint fails).

Grok used ten types. Only `methodology_depends_on` (the two SNA-2008 edges) is
legal. Off-union: `disseminated_under`, `participates_in`, `subscribes_to`,
`adheres_to`, `member_of`, `feeds_into`, `subject_of`, `aligned_with`,
`implements`. The `Relation` mechanism doesn't cover these either — `RelationType`
is only `audits`/`supersedes`.

**Your call, three options:**
- **(a) Re-type into the existing union** (no schema change): standards edges
  (SDDS/SDDS Plus/e-GDDS/SNA) → `methodology_depends_on` — defensible, the standard
  literally defines the coverage/periodicity/timeliness methodology the report
  complies with. Membership/participation edges (agency → ACSS, DGBAS → APEC) and
  the two `subject_of` observance-report edges → `cites`, or drop them.
- **(b) Extend the union** with one or two new types (e.g. `disseminated_under`,
  `member_of`) plus their `RELATIONSHIP_WEIGHT` entries and validator/test updates —
  a real schema round, and the weight you choose changes PageRank for every one of
  these ~60 edges.
- **(c) Split**: (a) for standards edges now, defer membership edges until a schema
  round decides what institutional membership even means in a report-dependency graph.

## Blocker 2 — round 2's source ids are all invented

None of round 2's 15 `source_report_id`s exist in the corpus (round 1 used real ids
throughout; round 2 didn't). Checked against all 267 research files. The mapping:

| Grok id | Real corpus id | Note |
|---|---|---|
| ID-BPS | `id-bps` | exists |
| PH-PSA | `ph-psa` | exists |
| TH-NSO | `th-nso` | exists |
| MM-CSO | `mm-cso` | exists |
| IR-SCI | `ir-sci` | exists |
| IQ-CSO-CBI | `iq-national-accounts` (suggest) | no institutional IQ node; round 1 used this id |
| JP-ESRI | `jp-national-accounts` (suggest) | ESRI compiles the JSNA; the edge is the SNA-2008 one |
| JP-MIC | `jp-cpi` (suggest) | MIC's report in corpus is the CPI |
| SG-DOS | `sg-statistics-act-1973` / `sg-yearbook-of-statistics` (suggest) | no `sg-dos` node; round 1 used these |
| SD-CBS | **no institutional node** — nearest: `sd-cbs-cpi` | see below |
| MU-Statistics-Mauritius | **none** — nearest: `mu-statsmauritius-cpi` | MU corpus is municipal-finance only; no national-accounts report exists for the SNA-2008 edge |
| SL-Statistics-Sierra-Leone | **none** — nearest: `sl-statssl-cpi` | |
| AF-NSIA | **none** — nearest: `af-national-accounts` or `af-cpi` | `af-dab` exists but is the central bank |
| YE-CSO | **none** — nearest: `ye-national-accounts` or `ye-cpi` | |
| SY-CBS | **none** — nearest: `sy-national-accounts` or `sy-cpi` | |

For the six countries with no stats-office node: either attach the e-GDDS edge to
the office's flagship report (CPI/national accounts — semantically "this report's
dissemination sits under e-GDDS", which the DSBB evidence actually supports), or
mint institutional nodes (`sd-cbs`, `mu-statsmauritius`, `sl-statssl`, …). Note the
corpus has precedent BOTH ways: `id-bps`/`th-nso`/`ir-sci`/`af-dab` exist as
institutional nodes, but the 2026-08-20 mint deliberately excluded ~53
institution-as-node candidates as "fake nodes". Your call which precedent wins.

## Blocker 3 — node collisions and target inconsistencies (known since 5q, now confirmed)

- Do **not** re-mint `imf-sdds`, `imf-e-gdds`, `sna-2008` — all three already exist
  (in `za-fiscal-federalism.json`, `ke-social-protection.json`,
  `international-standards.json`). Point edges at the existing nodes.
- Genuinely new, safe to mint: `imf-sdds-plus`, `asean-acss`, `apec-stats`,
  `imf-sdds-indonesia-observance-2023`, `imf-sdds-plus-japan-observance-2024`.
- **Target fix needed twice:** Mauritius's SDDS Plus edge and round-2's JP-MIC edge
  both target `imf-sdds` for an SDDS **Plus** claim ("target reused is imf-sdds").
  Since `imf-sdds-plus` is being minted anyway for round 1's Japan/Israel edges,
  both should target it.

---

# Per-edge results

Verdicts: **V** = quote found verbatim at the URL (minor punctuation aside) ·
**S** = substance clearly supported, wording differs · **U** = could not be
verified (reason given) · superseded = replaced by a round-2 entry.

## Round 1 (all 38 edges)

**Indonesia (6/6 V).** All four IDN_SDDS_AR2023.pdf quotes verbatim (subscription
24 Sep 1996, met requirements 2 Jun 2000; coverage; NSDP components; punctuality;
four-dimensions passage). Generic ACSS-establishment quote verbatim on asean.org
(checked in Chrome — page is a JS stub to headless fetchers). ASEANstats
"technical arm" quote verbatim.

**Taiwan (4/4 V).** DSBB/DGBAS welcome text verbatim on eng.stat.gov.tw/sdds; SNA
2008 compilation sentence verbatim on the DGBAS news page; StatsAPEC glossary lists
Chinese Taipei (1991) and cites DGBAS's nstatdb as a source; CBC's SDDS
advance-release sentence verbatim.

**Philippines (4/4 V).** Subscription row `5-Aug-1996 | 19-Sep-1996 | 17-Jan-2001`
confirmed in the live DSBB table (Chrome). 2025 Article IV SDDS sentence found in
IMF eLibrary (Chrome; WebFetch gets 403). EXD00 summary-methodology text (gross
debts / BPM6 / 2014 Guide) verbatim (Chrome). Generic ACSS quote verbatim.

**Japan (4/4 V on quotes; 2 edges superseded).** JPN_SDDS_AR2024 quotes verbatim
(adhered 18 Apr 2016; four dimensions). e-Stat NSDP page: DSBB sentence + CPI/MIC
row confirmed. The 5q complaint stands confirmed: the round-1 SNA-2008 edge's ESRI
quote and the Statistics-Act edge's observance quote are real text that **doesn't
say what the edges claim** — round 2's replacements (below) fix both. Mint round-2's
versions, not these two.

**South Korea (2/2 V).** KOR_SDDS_AR2022 quotes verbatim; subscription row
`20-Sep-1996 | 30-Mar-1998 | 1-Nov-1999` confirmed live.

**Vietnam (3/3 V).** pr19269 full body verified in Chrome (NSDP hosted by GSO,
SDMX, DSBB — all verbatim). VNM summary-of-dissemination National Accounts row
`Q | Q | 1Q | 1Q` confirmed live. GSO development-history page (2016 ACSS
membership; AHSOM 11 in 2010) verbatim.

**Singapore (3/3 V).** Live singstat page carries both sentences exactly — the
1996-vs-2001 tension is in the source itself, and round 2's DSBB row resolves it
(below). SGP_SDDS_AR2024 quotes verbatim. Generic ACSS quote verbatim.

**Thailand (4/4 V).** THA_SDDS_AR2024 quotes verbatim; THA summary-of-observance
row `National accounts Yes | Q/1Q | Q | 1Q | 8W` confirmed live; Bank of Thailand
SDDS-since-1996 passage verbatim; generic ACSS quote verbatim.

**Saudi Arabia (2/2 V).** SAU_SDDS_AR2024 (subscribed 18 Sep 2019, met at
subscription) verbatim; mof.gov.sa NSDP boilerplate verbatim.

**Israel (2/2 V).** ISR_SDDS_AR2024 (adhered 22 Dec 2020; four dimensions; NSDP
components) all verbatim.

**Myanmar (3/3 V).** pr19106 full body verified in Chrome (NSDP hosted by CSO,
SDMX); csostat.gov.mm NSDP boilerplate verbatim; generic ACSS quote verbatim.

**Iraq (superseded).** The ODIN third-party edge should be dropped as 5q said;
round 2's two primary replacements both verified (below).

## Round 2 (all 24 entries)

**Sudan (2/2 V).** eLibrary 2003 Article IV quote verbatim (GDDS from 19 Aug 2003;
the file's quote adds a leading "Also," not in the source — trivial). DSBB
important-dates row confirmed live: `Sudan | August 19, 2003 | [NSDP blank]`.

**Mauritius (2 V, 1 U).** pr1262 full body verified in Chrome — 70th subscriber,
11th GDDS graduate, GDDS since 21 Sep 2000, all verbatim; the DSBB
important-dates page's own footnote independently corroborates every date
("Mauritius was initially a participant… metadata first posted September 21,
2000… On February 28, 2012… became the 70th subscriber"). pr26077 (SDDS Plus,
16 Mar 2026, first in Africa, 32nd globally) verbatim. **U:** the UN
desapublications SNA-2008 PDF — the document is real but the Mauritius section
sits at ~p.826 of a huge PDF beyond what any tool here could retrieve; quote
unverified in place. Also note MU has no national-accounts report in the corpus to
hang an SNA edge on (Blocker 2).

**Sierra Leone (2/2 V).** PR1716 full body verified in Chrome (NSDP on Statistics
Sierra Leone / Bank of Sierra Leone / MoFED sites, verbatim); DSBB row
`May 29, 2003 | December 8, 2016` confirmed live.

**Iraq (2/2 V).** pr09460 full body verified in Chrome — participation sentence
AND the Al-Shabibi quote both verbatim, 15 Dec 2009. 2025 Article IV sentence
("first posted its metadata in December 2009 but is yet to disseminate…") found in
eLibrary (Chrome). The ODIN replacement is complete and better-sourced than what
it replaces.

**Iran (1/1 V).** DSBB row `Iran | August 6, 2012 | [NSDP blank]` confirmed live.
The file's own framing — "recorded obligation, not a living dissemination
program" — is honest and matches the page.

**Afghanistan (1 V, 1 U).** DSBB row `June 22, 2006 | [blank]` confirmed live.
**U:** the cr06251.pdf supporting quote — the document is confirmed real (Seventh
Review under the SMP, 11 Jul 2006, includes the Executive Director's statement
where this language would live), but imf.org 403s headless fetchers, Chrome's PDF
viewer is opaque to the extension, and eLibrary's free view of that ED statement
shows only the abstract. Quote plausible, not verified in place. The edge stands
on the DSBB row alone.

**Yemen (1/1 V).** DSBB row `April 26, 2001 | [blank]` confirmed live.

**Syria (1/1 V).** DSBB row `December 12, 2007 | [blank]` confirmed live.

**Indonesia ACSS (V).** ACSS13 joint media statement PDF — hosted by BPS, chaired
by BPS's Acting Chief Statistician, 22–24 Nov 2023, verbatim.

**Philippines ACSS (V).** ACSS15 statement PDF — PSA co-chair and "We welcomed
the ACSS Chairship of the Philippines in 2026", both verbatim.

**Singapore (3: 2 V, 1 U-redundant).** DSBB subscription row
`1-Aug-1996 | 19-Sep-1996 | 30-Jan-2001` confirmed live — Grok's reading is right:
singstat's "January 2001" is the met-specifications date, not a second
subscription. ACSS8 news page (hosted/chaired by DOS, Oct 2018) verbatim. The
web.archive.org copy of the singstat page 403'd, but the **live** page already
verified with both sentences, so the archived copy is redundant.

**Thailand (2/2 V).** about-acss-committee lists `ACSS 9: Bangkok, Thailand, 9-11
October 2019`; subscription row confirmed (same row as above).

**Myanmar (2/2 V).** ACSS Code of Practice PDF — the ten-office preamble naming
the Union of Myanmar and the commitment sentence, verbatim. ASEAN accession-dates
PDF (Myanmar 23 Jul 1997) verbatim.

**Japan (2/2 V).** stat.go.jp Statistical Handbook passage (JSNA on 1993 SNA since
2000, 2008 SNA introduced 2016) verbatim — this properly replaces round 1's
mis-aimed ESRI quote. JPN_SDDS_AR2024 (SDDS Plus, 18 Apr 2016) verbatim — but
retarget to `imf-sdds-plus` (Blocker 3) and map JP-MIC to a real id (Blocker 2).

---

# Recommended merge plan (when you say go)

1. Decide Blocker 1 (relationship types) — everything else waits on it.
2. Decide Blocker 2's six no-institutional-node countries (flagship report vs new
   institutional nodes).
3. Mint the five genuinely-new international nodes; point all other edges at the
   three existing ones; retarget the two SDDS-Plus-as-imf-sdds edges.
4. Take round 2's versions wherever both rounds cover the same claim (Iraq, Japan
   ×2, and the five country-named ACSS quotes in place of the generic one —
   the generic asean.org quote did verify, but the named quotes are strictly
   stronger evidence for per-country membership).
5. Hold out only: the MU SNA-2008 edge (unverified quote + no source node — a
   candidate for Grok round 3 or a direct Statistics Mauritius source) and the AF
   cr06251 supporting quote (keep the edge on the DSBB row; drop or re-source that
   second entry).
6. Then the standing recipe: backfill into research JSONs, `npm run gen`,
   `tsc --noEmit`, `npm run validate` (120 checks), `npm run build`, headless spot
   check that the 19 countries now light up in Isolate.

Two page-maintenance oddities noticed, no action needed: the DSBB subscription
page's SDDS-Plus footnote says "32 of them" but names only 31 countries and omits
Mauritius (its own press release calls Mauritius the 32nd); and Indonesia's
metadata-posted date reads 21-May-1997 there (no claim in either file depends on
it).
