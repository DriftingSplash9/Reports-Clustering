import type { Dependency } from '../lib/types'

/**
 * Directed dependency edges. Read every entry as:
 *
 *     source_report_id  ——depends on——>  target_report_id
 *
 * Authority accrues at the TARGET. Every edge carries a `basis` field stating
 * why it is believed to exist, so the seed set stays auditable rather than
 * becoming a pile of plausible-looking links.
 */
export const dependencies: Dependency[] = [
  // ── Canada: statistics feeding statistics ─────────────────────────────────
  //
  // `statcan-national-accounts -> statcan-gdp-monthly` used to sit here, on the
  // basis that "the quarterly expenditure-based accounts are reconciled against
  // the monthly by-industry GDP estimates". Deleted in V0.10 after reading both
  // programs' own IMDB methodology records: neither states it and the quarterly
  // record enumerates its sub-annual sources without listing the monthly
  // by-industry estimates. See the `_dropped` block in
  // `research/statcan-macro-accounts.json` — the real anchor is the annual
  // Supply and Use Tables, which is not yet a node.
  {
    source_report_id: 'statcan-national-accounts',
    target_report_id: 'statcan-cpi',
    relationship_type: 'methodology_depends_on',
    evidence: 'implied',
    basis:
      'Demoted from documented to implied in V0.10, having carried no evidence_url since the seed set. The accounts\' own official guide — User Guide: Canadian System of Macroeconomic Accounts, ch. 5 §5.5 "Final expenditure accounts at constant prices" — describes the mechanism and names the index, but only as an illustration of what a price index is: "For most expenditure product classes it is possible to construct a price index time series indicating the average change through time in the prices of products within that class. For example, the Consumer Price Index does precisely that for various classes of consumer products. The estimates at current prices for a particular expenditure time series … can then be divided by the corresponding price index time series—a process known as deflation." It never says which indexes "the corresponding price index" is, and record 1901\'s own Estimation section says only that "certain series (mainly expenditure series) are deflated (presented in real terms)". So: strong grounds, no document stating it — which is exactly what `implied` is for. Contrast statcan-gdp-monthly -> statcan-cpi, where the monthly program\'s source table cites the CPI by name and record number for each industry it deflates. The asymmetry is disclosure, not method.',
  },

  // ── Canada: statistics feeding monetary policy ────────────────────────────
  {
    source_report_id: 'boc-policy-rate',
    target_report_id: 'statcan-cpi',
    relationship_type: 'uses_data_from',
    basis:
      'The Joint Statement of the Government of Canada and the Bank of Canada renewing the monetary policy framework states that "the target will continue to be defined in terms of the 12-month rate of change in the total CPI." The target is not merely informed by the CPI; it is denominated in it, by an agreement between the Bank and the Minister of Finance. The Bank\'s own inflation page puts the same thing as "the inflation target is expressed as the year-over-year increase in the total consumer price index (CPI)."',
    reference_period: {
      readings_per_year: 8,
      window_months: 12,
      ends: null,
      stated_as: 'the 12-month rate of change in the total CPI',
    },
    evidence_url:
      'https://www.bankofcanada.ca/2021/12/joint-statement-of-the-government-of-canada-and-the-bank-of-canada-on-the-renewal-of-the-monetary-policy-framework/',
  },
  {
    source_report_id: 'boc-policy-rate',
    target_report_id: 'statcan-lfs',
    relationship_type: 'uses_data_from',
    basis:
      'Labour market slack from the LFS is a standing input to the rate decision.',
  },
  {
    source_report_id: 'boc-policy-rate',
    target_report_id: 'statcan-national-accounts',
    relationship_type: 'uses_data_from',
    basis: 'Output gap assessment rests on the quarterly national accounts.',
  },
  {
    source_report_id: 'boc-mpr',
    target_report_id: 'statcan-cpi',
    relationship_type: 'uses_data_from',
    basis:
      'The July 2026 Report names the index by name and reports its level: "Consumer price index inflation in Canada was close to the 2% target for more than a year and a half until the war in the Middle East began… Inflation rose to 3.2% in May." It also names the Bank\'s preferred core measures, CPI-trim and CPI-median, which are CPI derivatives published by Statistics Canada. Distinguish this from the national-accounts case in the same document: here the release is named in the text, not merely attributed to the agency in a chart source line.',
    evidence_url:
      'https://www.bankofcanada.ca/wp-content/uploads/2026/06/mpr-2026-07-15.pdf',
  },
  {
    source_report_id: 'boc-mpr',
    target_report_id: 'statcan-lfs',
    relationship_type: 'uses_data_from',
    basis:
      'Footnote 4 of the July 2026 Report defines a Bank-constructed wage measure directly on the survey: "LFS-Micro is a measure of underlying wage growth derived from the Labour Force Survey (LFS) microdata. It removes the composition effects from the average hourly earnings in the LFS, yielding a wage measure with reduced volatility and a better relationship with labour market fundamentals." That is the Report naming the release and stating what it does with it — stronger than the chart source lines, which name only the agency.',
    evidence_url:
      'https://www.bankofcanada.ca/wp-content/uploads/2026/06/mpr-2026-07-15.pdf',
  },
  {
    source_report_id: 'boc-mpr',
    target_report_id: 'boc-policy-rate',
    relationship_type: 'cites',
    basis:
      'The MPR is published alongside and explains the accompanying rate decision.',
  },

  // ── Canada: statistics feeding benefit calculations ───────────────────────
  {
    source_report_id: 'esdc-oas-indexation',
    target_report_id: 'statcan-cpi',
    relationship_type: 'calculated_from',
    basis:
      'OAS amounts are adjusted quarterly by a statutory formula applied to the CPI.',
    reference_period: {
      readings_per_year: 4,
      window_months: 3,
      ends: null,
      stated_as:
        "'reviewed each year in January, April, July and October', on 'the difference between the average CPI for two periods of three months each'.",
    },
  },
  {
    source_report_id: 'cpp-ympe',
    target_report_id: 'statcan-seph',
    relationship_type: 'calculated_from',
    basis:
      'The YMPE is set from the industrial aggregate average weekly earnings series produced by SEPH.',
    reference_period: {
      readings_per_year: 1,
      window_months: 12,
      ends: '06-30',
      stated_as:
        "'the average Wage Measure for the twelve months ending 30 June of the preceding year' — Canada Pension Plan s.18(1)(c).",
    },
  },
  {
    source_report_id: 'cpp-disability-amount',
    target_report_id: 'cpp-ympe',
    relationship_type: 'calculated_from',
    basis:
      'CPP Regulations s.68.1(1) states the maximum annual disability pension as the formula (A × B) + C, "where A is .25 × the Maximum Pensionable Earnings Average; B is .75; and C is the flat rate benefit, calculated as provided in subsection 56(2) of the Act, × 12." One hop of imprecision is worth naming: the regulation takes the Maximum Pensionable Earnings *Average*, a five-year average of the YMPE, not a single year\'s figure. The dependency on the YMPE is stated in regulation; the arithmetic runs through an average of five of them.',
    evidence_url:
      'https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._385/page-8.html',
  },
  {
    source_report_id: 'cpp-disability-amount',
    target_report_id: 'statcan-cpi',
    relationship_type: 'calculated_from',
    basis:
      'CPP Regulations s.75(1): "For the purposes of subsection 43(2) of the Act, the Pension Index for each year shall be calculated as the quotient obtained by dividing the aggregate of the Consumer Price Index for each month in the 12-month period ending October 31 in the preceding year by 12." The Pension Index escalates the flat-rate benefit, so the indexation is arithmetic on the CPI and stated as such in regulation rather than described in prose.',
    reference_period: {
      readings_per_year: 1,
      window_months: 12,
      ends: '10-31',
      stated_as:
        'the aggregate of the Consumer Price Index for each month in the 12-month period ending October 31 in the preceding year, divided by 12',
    },
    evidence_url:
      'https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._385/page-8.html',
  },

  // ── United States: statistics feeding statistics ──────────────────────────
  {
    source_report_id: 'bea-pce',
    target_report_id: 'bls-cpi',
    relationship_type: 'uses_data_from',
    basis:
      'The PCE price index is built largely from CPI detailed price series as source data.',
  },
  {
    source_report_id: 'bea-gdp',
    target_report_id: 'bea-pce',
    relationship_type: 'calculated_from',
    basis:
      'PCE is a component of GDP in the NIPA framework, not an input GDP fetches from elsewhere, and the defining document is the release\'s own methodology: NIPA Handbook Chapter 5, "Personal Consumption Expenditures". This is the standing example of within-system structure — see the open question in REPORTS.md about whether it needs its own relationship kind. Recorded as documented on the ground that a release\'s own handbook is the strongest possible statement of its own composition, not the weakest.',
    evidence_url:
      'https://www.bea.gov/resources/methodologies/nipa-handbook/pdf/chapter-05.pdf',
  },

  // ── United States: statistics feeding monetary policy ─────────────────────
  {
    source_report_id: 'fed-fomc-statement',
    target_report_id: 'bea-pce',
    relationship_type: 'uses_data_from',
    basis:
      "The Federal Reserve's 2% inflation objective is defined on the PCE price index.",
  },
  {
    source_report_id: 'fed-fomc-statement',
    target_report_id: 'bls-employment-situation',
    relationship_type: 'uses_data_from',
    basis: 'The employment half of the dual mandate is assessed from this release.',
  },
  {
    source_report_id: 'fed-fomc-statement',
    target_report_id: 'bea-gdp',
    relationship_type: 'uses_data_from',
    basis: 'Assessment of economic activity rests on the NIPA GDP estimates.',
  },
  {
    source_report_id: 'fed-sep',
    target_report_id: 'bea-pce',
    relationship_type: 'uses_data_from',
    basis: 'SEP inflation projections are stated in PCE terms.',
  },
  {
    source_report_id: 'fed-sep',
    target_report_id: 'bls-employment-situation',
    relationship_type: 'uses_data_from',
    basis: 'SEP unemployment rate projections are stated on the household survey basis.',
  },
  {
    source_report_id: 'fed-sep',
    target_report_id: 'bea-gdp',
    relationship_type: 'uses_data_from',
    basis: 'SEP growth projections are stated as real GDP change.',
  },

  // ── United States: statistics feeding benefit calculations ────────────────
  {
    source_report_id: 'ssa-cola',
    target_report_id: 'bls-cpi',
    relationship_type: 'calculated_from',
    basis:
      'The COLA is set by statute from the third-quarter average of CPI-W. No discretion is involved.',
    reference_period: {
      readings_per_year: 1,
      window_months: 3,
      ends: '09-30',
      stated_as:
        "'the percentage increase (if any) in the CPI-W from the average for the third quarter of the current year to the average for the third quarter of the last year in which a COLA became effective'.",
    },
  },

  // ── Cross-border ──────────────────────────────────────────────────────────
  // Deliberately thin. Canadian and US statistical systems rarely consume each
  // other's outputs as computational inputs; the genuine link runs through the
  // Bank of Canada's treatment of the US outlook as a forecast condition.
  {
    source_report_id: 'boc-mpr',
    target_report_id: 'fed-fomc-statement',
    relationship_type: 'cites',
    basis:
      'The MPR conditions its projection on the expected path of US monetary policy.',
  },
  {
    source_report_id: 'boc-mpr',
    target_report_id: 'bea-gdp',
    relationship_type: 'cites',
    basis:
      'The July 2026 Report attributes its US activity charts to "Sources: US Bureau of Economic Analysis via Haver Analytics and Bank of Canada calculations, estimates and projections". The publishing agency is named, and BEA publishes one GDP release. This is believed to be the **first standard-compliant direct official CA↔US edge in the graph** — before it, the only compliant cross-border link was a commodity futures price. Worth recording that the Bank reaches BEA through Haver Analytics, a commercial redistributor: the underlying source is official and named, so the edge stands, but the path runs through a paywalled intermediary that is itself not a node. See the _dropped note on Haver.',
    evidence_url:
      'https://www.bankofcanada.ca/wp-content/uploads/2026/06/mpr-2026-07-15.pdf',
  },
]
