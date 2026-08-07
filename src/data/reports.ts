import type { Report } from '../lib/types'

/**
 * Curated North American seed set.
 *
 * Selection rule: every node is a real, named, recurring official release, and
 * every node either depends on another node here or is depended upon by one.
 * No node is included just to fill space.
 *
 * `last_updated` is null throughout — see types.ts.
 * URLs are landing pages for the release programme, not individual editions.
 */
export const reports: Report[] = [
  // ── Canada ────────────────────────────────────────────────────────────────
  {
    id: 'statcan-cpi',
    title: 'Consumer Price Index',
    publisher: 'Statistics Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Monthly measure of price change for a fixed basket of consumer goods and services. The reference inflation measure for Canadian policy and statutory indexation.',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.statcan.gc.ca/en/subjects-start/prices_and_price_indexes/consumer_price_indexes',
    domains: ['inflation'],
  },
  {
    id: 'statcan-lfs',
    title: 'Labour Force Survey',
    publisher: 'Statistics Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Monthly household survey producing the unemployment rate, participation rate, and employment by industry.',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.statcan.gc.ca/en/survey/household/3701',
    domains: ['labour'],
  },
  {
    id: 'statcan-seph',
    title: 'Survey of Employment, Payrolls and Hours',
    publisher: 'Statistics Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Monthly payroll-based survey producing average weekly earnings, including the industrial aggregate series used in pension calculations.',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.statcan.gc.ca/en/survey/business/2612',
    domains: ['labour'],
  },
  {
    id: 'statcan-gdp-monthly',
    title: 'Gross Domestic Product by Industry (Monthly)',
    publisher: 'Statistics Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Monthly estimate of real GDP by industry, produced on the output side of the accounts.',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.statcan.gc.ca/en/survey/business/1301',
    domains: ['national-accounts'],
  },
  {
    id: 'statcan-national-accounts',
    title: 'National Economic Accounts (Quarterly)',
    publisher: 'Statistics Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Quarterly expenditure-based GDP, income and saving, reconciled against the monthly by-industry estimates.',
    releases_per_year: 4,
    last_updated: null,
    url: 'https://www.statcan.gc.ca/en/survey/business/1901',
    domains: ['national-accounts'],
  },
  {
    id: 'boc-policy-rate',
    title: 'Policy Interest Rate Announcement',
    publisher: 'Bank of Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Scheduled decision on the target for the overnight rate, the anchor for short-term Canadian interest rates.',
    releases_per_year: 8,
    cadence_note:
      'Eight fixed announcement dates per year — roughly every six weeks. Does not fit the coarse enum; use releases_per_year.',
    last_updated: null,
    url: 'https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/',
    domains: ['monetary-policy', 'interest-rates'],
  },
  {
    id: 'boc-mpr',
    title: 'Monetary Policy Report',
    publisher: 'Bank of Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Quarterly assessment of the economy and inflation outlook, published alongside a rate decision. Synthesises domestic statistics and the external outlook.',
    releases_per_year: 4,
    last_updated: null,
    url: 'https://www.bankofcanada.ca/publications/mpr/',
    domains: ['monetary-policy', 'inflation'],
  },
  {
    id: 'esdc-oas-indexation',
    title: 'Old Age Security Payment Indexation',
    publisher: 'Employment and Social Development Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Quarterly adjustment of OAS benefit amounts, set by a statutory formula applied to the Consumer Price Index.',
    releases_per_year: 4,
    last_updated: null,
    url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security/payments.html',
    domains: ['benefits', 'inflation'],
  },
  {
    id: 'cpp-ympe',
    title: "Year's Maximum Pensionable Earnings (YMPE)",
    publisher: 'Canada Revenue Agency',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Annual earnings ceiling for Canada Pension Plan contributions, calculated from the industrial aggregate average weekly earnings series.',
    releases_per_year: 1,
    last_updated: null,
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp.html',
    domains: ['benefits', 'labour'],
  },
  {
    id: 'cpp-disability-amount',
    title: 'CPP Disability Benefit Amount',
    publisher: 'Employment and Social Development Canada',
    country: 'CA',
    jurisdiction_level: 'federal',
    region: 'Canada',
    description:
      'Annual determination of CPP disability benefit amounts — a flat-rate portion indexed to the CPI plus an earnings-related portion bounded by the YMPE.',
    releases_per_year: 1,
    last_updated: null,
    url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-disability-benefit.html',
    domains: ['benefits'],
  },

  // ── United States ─────────────────────────────────────────────────────────
  {
    id: 'bls-cpi',
    title: 'Consumer Price Index (CPI-U / CPI-W)',
    publisher: 'Bureau of Labor Statistics',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Monthly measure of consumer price change. Supplies detailed price data used well beyond inflation reporting, and CPI-W drives statutory benefit indexation.',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.bls.gov/cpi/',
    domains: ['inflation'],
  },
  {
    id: 'bls-employment-situation',
    title: 'The Employment Situation',
    publisher: 'Bureau of Labor Statistics',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Monthly release combining the establishment survey (payroll employment) and the household survey (unemployment rate).',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.bls.gov/news.release/empsit.toc.htm',
    domains: ['labour'],
  },
  {
    id: 'bea-pce',
    title: 'Personal Income and Outlays (incl. PCE Price Index)',
    publisher: 'Bureau of Economic Analysis',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Monthly personal income, spending, and the PCE price index — the inflation measure the Federal Reserve targets.',
    releases_per_year: 12,
    last_updated: null,
    url: 'https://www.bea.gov/data/income-saving/personal-income',
    domains: ['inflation', 'national-accounts'],
  },
  {
    id: 'bea-gdp',
    title: 'Gross Domestic Product (NIPA)',
    publisher: 'Bureau of Economic Analysis',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Quarterly national income and product accounts estimate of GDP, released in successive vintages.',
    releases_per_year: 4,
    cadence_note:
      'Each quarter is released three times (advance, second, third estimate); modelled here as the quarterly programme.',
    last_updated: null,
    url: 'https://www.bea.gov/data/gdp/gross-domestic-product',
    domains: ['national-accounts'],
  },
  {
    id: 'fed-fomc-statement',
    title: 'FOMC Statement and Federal Funds Target',
    publisher: 'Federal Reserve',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Scheduled decision on the target range for the federal funds rate, with an accompanying statement on economic conditions.',
    releases_per_year: 8,
    cadence_note:
      'Eight scheduled meetings per year. Does not fit the coarse enum; use releases_per_year.',
    last_updated: null,
    url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
    domains: ['monetary-policy', 'interest-rates'],
  },
  {
    id: 'fed-sep',
    title: 'Summary of Economic Projections',
    publisher: 'Federal Reserve',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      "Quarterly compilation of FOMC participants' projections for growth, unemployment, inflation, and the policy rate path.",
    releases_per_year: 4,
    last_updated: null,
    url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
    domains: ['monetary-policy'],
  },
  {
    id: 'fed-h15',
    title: 'H.15 Selected Interest Rates',
    publisher: 'Federal Reserve',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Daily statistical release of selected US interest rates, including the effective federal funds rate and the current target range.',
    releases_per_year: 250,
    cadence_note: 'Every business day.',
    last_updated: null,
    url: 'https://www.federalreserve.gov/releases/h15/',
    domains: ['interest-rates'],
  },
  {
    id: 'ssa-cola',
    title: 'Social Security Cost-of-Living Adjustment',
    publisher: 'Social Security Administration',
    country: 'US',
    jurisdiction_level: 'federal',
    region: 'United States',
    description:
      'Annual benefit adjustment set by a statutory formula applied to third-quarter CPI-W. A pure derived node with no discretion.',
    releases_per_year: 1,
    last_updated: null,
    url: 'https://www.ssa.gov/oact/cola/',
    domains: ['benefits', 'inflation'],
  },
]
