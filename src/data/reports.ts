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
    release_schedule: {
      kind: 'published-calendar',
      source_url:
        'https://www150.statcan.gc.ca/n1/dai-quo/cal1-eng.htm',
      note:
        'Dates are release days, not reference months: the July 2026 index appears on 17 August 2026. Statistics Canada publishes the major economic releases about fourteen months ahead and the calendar currently runs to March 2027, which is where these entries stop rather than where the CPI stops.',
      entries: [
        { from: '2026-08-17', to: '2026-08-17', precision: 'day', covers: 'July 2026' },
        { from: '2026-09-14', to: '2026-09-14', precision: 'day', covers: 'August 2026' },
        { from: '2026-10-19', to: '2026-10-19', precision: 'day', covers: 'September 2026' },
        { from: '2026-11-16', to: '2026-11-16', precision: 'day', covers: 'October 2026' },
        { from: '2026-12-14', to: '2026-12-14', precision: 'day', covers: 'November 2026' },
        { from: '2027-01-18', to: '2027-01-18', precision: 'day', covers: 'December 2026' },
        { from: '2027-02-16', to: '2027-02-16', precision: 'day', covers: 'January 2027' },
        { from: '2027-03-15', to: '2027-03-15', precision: 'day', covers: 'February 2027' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url:
        'https://www150.statcan.gc.ca/n1/dai-quo/cal1-eng.htm',
      entries: [
        { from: '2026-09-04', to: '2026-09-04', precision: 'day', covers: 'August 2026' },
        { from: '2026-10-09', to: '2026-10-09', precision: 'day', covers: 'September 2026' },
        { from: '2026-11-06', to: '2026-11-06', precision: 'day', covers: 'October 2026' },
        { from: '2026-12-04', to: '2026-12-04', precision: 'day', covers: 'November 2026' },
        { from: '2027-01-08', to: '2027-01-08', precision: 'day', covers: 'December 2026' },
        { from: '2027-02-05', to: '2027-02-05', precision: 'day', covers: 'January 2027' },
        { from: '2027-03-12', to: '2027-03-12', precision: 'day', covers: 'February 2027' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url:
        'https://www150.statcan.gc.ca/n1/dai-quo/cal1-eng.htm',
      note:
        'Listed on the calendar as \'Payroll employment, earnings and hours, and job vacancies\'. Note the two-month lag — the release on 27 August 2026 carries the June reference month, not July.',
      entries: [
        { from: '2026-08-27', to: '2026-08-27', precision: 'day', covers: 'June 2026' },
        { from: '2026-09-24', to: '2026-09-24', precision: 'day', covers: 'July 2026' },
        { from: '2026-10-29', to: '2026-10-29', precision: 'day', covers: 'August 2026' },
        { from: '2026-11-26', to: '2026-11-26', precision: 'day', covers: 'September 2026' },
        { from: '2026-12-23', to: '2026-12-23', precision: 'day', covers: 'October 2026' },
        { from: '2027-01-28', to: '2027-01-28', precision: 'day', covers: 'November 2026' },
        { from: '2027-02-25', to: '2027-02-25', precision: 'day', covers: 'December 2026' },
        { from: '2027-03-31', to: '2027-03-31', precision: 'day', covers: 'January 2027' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url:
        'https://www150.statcan.gc.ca/n1/dai-quo/cal1-eng.htm',
      entries: [
        { from: '2026-08-28', to: '2026-08-28', precision: 'day', covers: 'June 2026' },
        { from: '2026-09-29', to: '2026-09-29', precision: 'day', covers: 'July 2026' },
        { from: '2026-10-30', to: '2026-10-30', precision: 'day', covers: 'August 2026' },
        { from: '2026-11-30', to: '2026-11-30', precision: 'day', covers: 'September 2026' },
        { from: '2026-12-23', to: '2026-12-23', precision: 'day', covers: 'October 2026' },
        { from: '2027-01-29', to: '2027-01-29', precision: 'day', covers: 'November 2026' },
        { from: '2027-03-01', to: '2027-03-01', precision: 'day', covers: 'December 2026' },
        { from: '2027-03-31', to: '2027-03-31', precision: 'day', covers: 'January 2027' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url:
        'https://www150.statcan.gc.ca/n1/dai-quo/cal1-eng.htm',
      note:
        'Listed as \'Gross domestic product, income and expenditure\'. Shares a release day with the monthly by-industry estimate in the months where both fall due.',
      entries: [
        { from: '2026-08-28', to: '2026-08-28', precision: 'day', covers: 'Second quarter 2026' },
        { from: '2026-11-30', to: '2026-11-30', precision: 'day', covers: 'Third quarter 2026' },
        { from: '2027-03-01', to: '2027-03-01', precision: 'day', covers: 'Fourth quarter 2026' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url:
        'https://www.bankofcanada.ca/2026/07/bank-canada-publishes-2027-schedule-policy-interest-rate-announcements-other-major-publications/',
      note:
        'Fixed announcement dates, published more than a year ahead — the Bank set the 2027 schedule in July 2026 and reconfirmed the rest of 2026 at the same time. Announcements are at 09:45 ET.',
      entries: [
        { from: '2026-09-02', to: '2026-09-02', precision: 'day' },
        { from: '2026-10-28', to: '2026-10-28', precision: 'day' },
        { from: '2026-12-09', to: '2026-12-09', precision: 'day' },
        { from: '2027-01-27', to: '2027-01-27', precision: 'day', covers: 'with Monetary Policy Report' },
        { from: '2027-03-03', to: '2027-03-03', precision: 'day' },
        { from: '2027-04-28', to: '2027-04-28', precision: 'day', covers: 'with Monetary Policy Report' },
        { from: '2027-06-02', to: '2027-06-02', precision: 'day' },
        { from: '2027-07-21', to: '2027-07-21', precision: 'day', covers: 'with Monetary Policy Report' },
        { from: '2027-09-08', to: '2027-09-08', precision: 'day' },
        { from: '2027-10-27', to: '2027-10-27', precision: 'day', covers: 'with Monetary Policy Report' },
        { from: '2027-12-08', to: '2027-12-08', precision: 'day' },
      ],
    },
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
