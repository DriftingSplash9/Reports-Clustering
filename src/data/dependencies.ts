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
  // Six seed edges that lived here as `implied` retired to
  // `research/retired-implied-edges.json` on 2026-08-12 with the whole
  // implied layer (Thomas, round-3 Q12) — including
  // `statcan-national-accounts -> statcan-cpi`, this file's original
  // documented-to-implied demotion, and the five Bank-of-Canada/Fed edges
  // demoted that same morning. The validator now errors on any dependency
  // carrying `evidence: 'implied'`.
  //
  // `statcan-national-accounts -> statcan-gdp-monthly` used to sit here, on the
  // basis that "the quarterly expenditure-based accounts are reconciled against
  // the monthly by-industry GDP estimates". Deleted in V0.10 after reading both
  // programs' own IMDB methodology records: neither states it and the quarterly
  // record enumerates its sub-annual sources without listing the monthly
  // by-industry estimates. See the `_dropped` block in
  // `research/statcan-macro-accounts.json` — the real anchor is the annual
  // Supply and Use Tables, which is not yet a node.

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
      'The Governor\'s press-conference opening statement for the July 2026 MPR ties the two directly, in both directions: "Based on the MPR projection published today, Governing Council judges the current policy rate remains appropriate to sustain the economic recovery and bring inflation back to the 2% target." And, on the occasion itself: "I\'m pleased to be here with Senior Deputy Governor Carolyn Rogers to discuss our quarterly Monetary Policy Report and today\'s decision." Sourced 2026-08-12 (Grok source-hunt, URL and quotes verified against the page), closing a seed edge that had carried no evidence_url since V0.1.',
    evidence_url:
      'https://www.bankofcanada.ca/2026/07/opening-statement-2026-07-15/',
  },

  // ── Canada: statistics feeding benefit calculations ───────────────────────
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
    source_report_id: 'fed-sep',
    target_report_id: 'bls-employment-situation',
    relationship_type: 'uses_data_from',
    basis:
      'The Fed\'s own Guide to the Summary of Economic Projections defines the variable on the release: "Unemployment Rate—the average civilian unemployment rate in the fourth quarter of each year." The civilian unemployment rate is the headline series of the BLS Employment Situation, so the projection is denominated in that release\'s number. Sourced 2026-08-12 (Grok source-hunt, URL and quote verified), closing a seed edge with no prior evidence_url.',
    evidence_url:
      'https://www.federalreserve.gov/monetarypolicy/guide-to-the-summary-of-economic-projections.htm',
  },
  {
    source_report_id: 'fed-sep',
    target_report_id: 'bea-gdp',
    relationship_type: 'uses_data_from',
    basis:
      'The Fed\'s own Guide to the Summary of Economic Projections defines the growth variable on the release: "Change in Real Gross Domestic Product (GDP)—as measured from the fourth quarter of the previous year to the fourth quarter of the year indicated." Real GDP is BEA\'s NIPA series, so the projection is denominated in it. Same sourcing pass and verification as the unemployment edge.',
    evidence_url:
      'https://www.federalreserve.gov/monetarypolicy/guide-to-the-summary-of-economic-projections.htm',
  },

  // ── United States: statistics feeding benefit calculations ────────────────

  // ── Cross-border ──────────────────────────────────────────────────────────
  // Deliberately thin. Canadian and US statistical systems rarely consume each
  // other's outputs as computational inputs; the genuine link runs through the
  // Bank of Canada's treatment of the US outlook as a forecast condition.
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
