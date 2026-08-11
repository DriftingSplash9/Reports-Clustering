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
    release_schedule: {
      kind: 'published-calendar',
      source_url: 'https://www.bankofcanada.ca/2025/08/bank-canada-publishes-2026-schedule-policy-interest-rate-announcements-other-major-publications/',
      note: 'Bank of Canada publishes the MPR quarterly, concurrently with 4 of its 8 annual interest rate announcements (January, April, July, October). Most recent release was July 15, 2026.',
      entries: [
        { from: '2026-10-28', to: '2026-10-28', precision: 'day', covers: 'October 2026 Monetary Policy Report', evidence: 'documented' },
      ],
    },
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
    release_schedule: {
      kind: 'stated-rule',
      rule: 'Old Age Security payment amounts are reviewed each year in January, April, July and October to ensure they reflect cost of living increases, as measured by the Consumer Price Index (CPI). Payments increase when the cost of living rises but do not decrease if the cost of living falls.',
      source_url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/payments.html',
      note: "The current quarter's rate (July-September 2026) already reflects a 1.2% increase confirmed on canada.ca. The most recent past review (July 2026) is not listed; entries start with the next future review (October 2026).",
      entries: [
        { from: '2026-10-01', to: '2026-10-01', precision: 'month', covers: 'October-December 2026 OAS quarterly indexation review', evidence: 'implied' },
        { from: '2027-01-01', to: '2027-01-01', precision: 'month', covers: 'January-March 2027 OAS quarterly indexation review', evidence: 'implied' },
        { from: '2027-04-01', to: '2027-04-01', precision: 'month', covers: 'April-June 2027 OAS quarterly indexation review', evidence: 'implied' },
        { from: '2027-07-01', to: '2027-07-01', precision: 'month', covers: 'July-September 2027 OAS quarterly indexation review', evidence: 'implied' },
      ],
    },
    last_updated: null,
    url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/payments.html',
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
    release_schedule: {
      kind: 'observed-pattern',
      source_url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html',
      note: "CRA does not publish a formal release calendar for YMPE. Instead, it issues an annual newsroom 'tax tip' announcing the following year's maximum pensionable earnings and CPP contribution limits, consistently around November 1 each year (observed: Nov 1 2022, Nov 1 2023, Nov 1 2024, Oct 31 2025). No specific calendar date is legislated for the announcement, only the observed early-November pattern.",
      entries: [
        { from: '2022-11-01', to: '2022-11-01', precision: 'day', covers: '2023 YMPE announcement', evidence: 'implied' },
        { from: '2023-11-01', to: '2023-11-01', precision: 'day', covers: '2024 YMPE announcement', evidence: 'implied' },
        { from: '2024-11-01', to: '2024-11-01', precision: 'day', covers: '2025 YMPE announcement', evidence: 'implied' },
        { from: '2025-10-31', to: '2025-10-31', precision: 'day', covers: '2026 YMPE announcement', evidence: 'implied' },
        { from: '2026-10-31', to: '2026-11-02', precision: 'week', covers: '2027 YMPE announcement (projected)', evidence: 'implied' },
      ],
    },
    last_updated: null,
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html',
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
    release_schedule: {
      kind: 'stated-rule',
      rule:
        'CPP benefit amounts, including the disability benefit, are adjusted once a year in January, based on the increase in the Consumer Price Index (average CPI for the 12-month period ending October of the current year compared to the same period the prior year). If there is a decrease in the cost of living, benefit amounts do not decrease.',
      source_url:
        'https://www.canada.ca/en/services/benefits/publicpensions/cpp/receive-benefits/consumer-price-index.html',
      note:
        'The January 2026 adjustment (2.0%, based on Nov 2024-Oct 2025 CPI vs Nov 2023-Oct 2024 CPI) has already occurred as of this entry — next adjustment expected January 2027. Canada.ca states the annual-in-January rule rather than publishing a dated calendar.',
      entries: [
        { from: '2027-01-01', to: '2027-01-01', precision: 'month', evidence: 'implied', covers: 'Annual CPI-based adjustment to CPP disability benefit amount' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url: 'https://www.bls.gov/schedule/news_release/cpi.htm',
      entries: [
        { from: '2026-08-12', to: '2026-08-12', precision: 'day', covers: 'July 2026 CPI' },
        { from: '2026-09-11', to: '2026-09-11', precision: 'day', covers: 'August 2026 CPI' },
        { from: '2026-10-14', to: '2026-10-14', precision: 'day', covers: 'September 2026 CPI' },
        { from: '2026-11-10', to: '2026-11-10', precision: 'day', covers: 'October 2026 CPI' },
        { from: '2026-12-10', to: '2026-12-10', precision: 'day', covers: 'November 2026 CPI' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url: 'https://www.bls.gov/schedule/news_release/empsit.htm',
      note: "BLS publishes The Employment Situation monthly at 8:30 AM Eastern, typically on the first Friday of the month (with occasional shifts around holidays); most recent release prior to 2026-08-11 was Aug. 7, 2026 covering July 2026 data.",
      entries: [
        { from: '2026-09-04', to: '2026-09-04', precision: 'day', covers: 'August 2026' },
        { from: '2026-10-02', to: '2026-10-02', precision: 'day', covers: 'September 2026' },
        { from: '2026-11-06', to: '2026-11-06', precision: 'day', covers: 'October 2026' },
        { from: '2026-12-04', to: '2026-12-04', precision: 'day', covers: 'November 2026' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url: 'https://www.bea.gov/news/schedule',
      note: "All releases at 8:30 AM ET per BEA's published economic release schedule. Confirms the 12-releases-per-year monthly cadence on file.",
      entries: [
        { from: '2026-08-26', to: '2026-08-26', precision: 'day', covers: 'July 2026 Personal Income and Outlays (incl. PCE Price Index)' },
        { from: '2026-09-30', to: '2026-09-30', precision: 'day', covers: 'August 2026 Personal Income and Outlays (incl. PCE Price Index)' },
        { from: '2026-10-29', to: '2026-10-29', precision: 'day', covers: 'September 2026 Personal Income and Outlays (incl. PCE Price Index)' },
        { from: '2026-11-25', to: '2026-11-25', precision: 'day', covers: 'October 2026 Personal Income and Outlays (incl. PCE Price Index)' },
        { from: '2026-12-23', to: '2026-12-23', precision: 'day', covers: 'November 2026 Personal Income and Outlays (incl. PCE Price Index)' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url: 'https://www.bea.gov/news/schedule',
      note:
        'Three-stage cycle (advance/second/third), each roughly four weeks apart; the second and third estimates are bundled with Corporate Profits, State GDP, and State Personal Income.',
      entries: [
        { from: '2026-08-26', to: '2026-08-26', precision: 'day', covers: 'Q2 2026 second estimate' },
        { from: '2026-09-30', to: '2026-09-30', precision: 'day', covers: 'Q2 2026 third estimate' },
        { from: '2026-10-29', to: '2026-10-29', precision: 'day', covers: 'Q3 2026 advance estimate' },
        { from: '2026-11-25', to: '2026-11-25', precision: 'day', covers: 'Q3 2026 second estimate' },
        { from: '2026-12-23', to: '2026-12-23', precision: 'day', covers: 'Q3 2026 third estimate' },
      ],
    },
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
    release_schedule: {
      kind: 'published-calendar',
      source_url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
      note: 'The FOMC statement is released at the conclusion of each two-day meeting (on the second day, typically 2:00 p.m. ET). The Fed lists 8 regularly scheduled meetings per year; may also hold additional unscheduled meetings as needed.',
      entries: [
        { from: '2026-09-16', to: '2026-09-16', precision: 'day', covers: 'September 15-16, 2026 FOMC meeting statement' },
        { from: '2026-10-28', to: '2026-10-28', precision: 'day', covers: 'October 27-28, 2026 FOMC meeting statement' },
        { from: '2026-12-09', to: '2026-12-09', precision: 'day', covers: 'December 8-9, 2026 FOMC meeting statement' },
      ],
    },
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
    release_schedule: {
      kind: 'observed-pattern',
      source_url: 'https://www.ssa.gov/oact/cola/',
      note:
        'By statute (Social Security Act §215(i)), the COLA is calculated from average CPI-W for July-Aug-Sept versus the prior year, so it cannot be announced until BLS publishes the September CPI-W figure. No fixed calendar date — recent announcements were Oct 12 2023, Oct 10 2024, and Oct 24 2025, each following that year\'s September CPI-W release. BLS has scheduled the September 2026 CPI report for Oct 14, 2026; SSA is expected to announce the COLA that day or within about two weeks after.',
      entries: [
        { from: '2026-10-14', to: '2026-10-24', precision: 'week', evidence: 'implied', covers: '2027 Social Security COLA announcement' },
      ],
    },
    last_updated: null,
    url: 'https://www.ssa.gov/oact/cola/',
    domains: ['benefits', 'inflation'],
  },
]
