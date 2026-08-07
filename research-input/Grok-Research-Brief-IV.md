# Research Brief IV — extraction only

You are reading documents and quoting them. **You are not deciding anything.**

Brief III's round-two format worked and this brief keeps it: there is **no verdict
field anywhere in this brief**. Do not write DOCUMENTED, NOT-FOUND, CONFIRMED, or
any equivalent, and do not tell me whether something "counts". That judgement is
made at my end, from your quotes. Round one of Brief III returned seven verdicts;
four survived checking, one was refuted by the very quote offered as its proof,
and one had a direction error you noticed, wrote down, and then overrode. The
extraction in all of those was good. So: you extract, I adjudicate.

---

## What to return, for every item

For each item, return exactly these fields:

1. **URL** — the document you actually opened. If you were redirected, give the
   final URL.
2. **LOCATION** — the section, provision, footnote or table number the quote sits
   in. If the passage carries no such number, write `NO CITABLE LOCATION` and say
   what the nearest heading is.
3. **QUOTE** — verbatim, copy-pasted, between quotation marks. No paraphrase, no
   tidying, no ellipses in the middle of the operative clause. If the sentence is
   long, quote all of it.
4. **RELEASES NAMED IN THE QUOTE** — list the actual publications, series or
   survey titles the quote names, one per line. A release is a thing with a title
   that gets published on a cadence: *Provincial and Territorial Economic
   Accounts*, *Survey of Employment, Payrolls and Hours*, *Daily Treasury Par
   Yield Curve Rates*.
5. **`AGENCY ONLY`** — write this, in place of a release list, whenever the quote
   names only an institution and no publication. "Sources: Statistics Canada",
   "as determined by the Chief Statistician", "US Bureau of Economic Analysis"
   with no release title — all `AGENCY ONLY`. This is not a failure state and I
   need to know about it, so do not go looking for a better quote instead of
   reporting it. Use it four or five times if it is true four or five times.
6. **NOT FOUND** — if you searched the document and the thing is not in it, say
   so, and say what strings you searched for. **Say it even if the whole item
   comes back empty.** A confirmed absence is a result I record and use; the
   corpus already contains several, and one of them is load-bearing.

### One provision per entry

This is the rule Brief III's Equalization round broke, and it is why nothing from
that round could be used despite the substance being right. Fourteen quotes came
back bundled under a single heading marked "illustrative cluster". Not one of them
carried its own section number, so not one of them could be cited, so all fourteen
were discarded. The citations that *were* given were also wrong — the definitions
were filed under "s. 1(1) and s. 8"; they are in s. 3.1, and s. 8 is the Nova
Scotia revenue base in a different Division entirely.

So: **one entry per provision.** Fifteen separate entries with fifteen section
numbers is the right shape. One entry containing fifteen quotes is unusable, no
matter how good the quotes are.

### Do not resolve conflicts, report them

If two passages disagree, or a passage points the opposite way to what the item
asks about, quote both and say plainly that they disagree. Do not pick. In Brief
III you correctly noticed that a quote described the *monthly* estimates being
reconciled to the *quarterly*, which is the reverse of the relationship the item
proposed — and then filed it as supporting the item anyway. Reporting "these
point opposite ways" would have been the ideal answer.

(For the record, that one is now closed and you were right to flag it: both
programmes turn out to be benchmarked to the annual Supply and Use Tables and
neither reads the other, so the edge was deleted.)

---

## Item 1 — Survey of Employment, Payrolls and Hours in the Equalization Regulations

**Highest priority in this brief.**

Document: **Federal-Provincial Fiscal Arrangements Regulations, 2007**,
SOR/2007-303, at <https://laws-lois.justice.gc.ca/eng/regulations/SOR-2007-303/>

Brief III reported that the Regulations name the *Survey of Employment, Payrolls
and Hours* as the basis of a payroll-related revenue base. I could not find that
phrase in the sections I retrieved — but my retrieval was truncated before the
Revenue Base sections where it would sit, so this is **unverified, not
disproven**, and it matters more than anything else here: SEPH is already in my
graph and now sits fourth by authority, so a provision running from the
Equalization formula into it would be a high-value link.

What I need:

- Search the full consolidated Regulations for these strings and report which
  occur and where: `Survey of Employment, Payrolls and Hours`, `payrolls`,
  `Employment, Payrolls`, `wages and salaries`, `payroll`.
- For each hit, one entry: URL, section number, verbatim quote, releases named.
- If the phrase does not occur anywhere in the Regulations, say so explicitly and
  list the strings you searched. That closes the question and is worth as much to
  me as finding it.

## Item 2 — Equalization revenue bases, one provision per entry

Same document, SOR/2007-303.

The substance here is already confirmed and I have read s. 3.1 directly. What I
need is the **rest**, packaged so it can be cited. The definitions in s. 3.1 pin
revenue-base measurement to named Statistics Canada products, verbatim, for
example:

> "household final consumption expenditures as determined by Statistics Canada
> for the purpose of its **Provincial and Territorial Economic Accounts**"

Go through the Revenue Base Divisions and return **one entry per provision** that
names a Statistics Canada publication. For each: section number (including
subsection and paragraph — "s. 6(1)(a)", not "s. 6"), verbatim quote, and the
release titles named in it.

Watch for these titles in particular, and report each occurrence separately with
its own section number rather than aggregating: *System of Macroeconomic
Accounts*, *Provincial and Territorial Economic Accounts*, *Provincial Supply and
Use Tables*, *Census of Population*, *Consumer Price Index*, *Survey of
Employment, Payrolls and Hours*.

Where a provision says only "as determined by Statistics Canada" with no
publication title, that entry is `AGENCY ONLY`. I expect several and I want them
counted.

## Item 3 — the US Treasury daily yield curve as a publication

Two documents.

**3a.** The Federal Reserve's **H.15 Selected Interest Rates** release,
<https://www.federalreserve.gov/releases/h15/>

I need the footnotes quoted verbatim, each as its own entry with its footnote
number. In particular the footnotes covering the Treasury constant maturity
series, which I believe read "Source: U.S. Treasury" and describe the yields as
"interpolated by the U.S. Treasury from the daily yield curve" — quote them
exactly as they appear and give the footnote numbers. Also quote, as a separate
entry, footnote 1, covering the federal funds (effective) rate.

Report `AGENCY ONLY` where a footnote names Treasury but no Treasury publication.

**3b.** The Treasury release itself — the daily yield curve / par yield curve
rates page at
<https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics>

For this one I need publication facts rather than a dependency, so the fields are
different. Return, each with the URL and quote it came from:

- The **exact published title** of the series, as Treasury words it.
- **How often it is published**, quoted.
- Any statement of **how the rates are derived** — quote it, and name the inputs
  it names.
- Whether Treasury names the Federal Reserve, the Federal Reserve Bank of New
  York, or a market data vendor as a source. Quote it. `AGENCY ONLY` if an
  institution is named without a publication.

Why: H.15 currently has no surviving edge in my graph and has dropped out of it
entirely, which is the first time a federal release has. If Treasury's yield curve
is a citable publication with a cadence, H.15's own footnotes put it back.

## Item 4 — StatCan Supply, Use and Input-Output Tables as a publication

Document: IMDB record 1401,
<https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=1401>

Publication facts again, same shape as 3b:

- The **exact published title** of the programme.
- **Frequency**, and **how long after the reference year** the tables appear —
  quote both.
- The **"Data sources"** section: quote it in full, and list every release it
  names. `AGENCY ONLY` for anything attributed to Statistics Canada generally.
- Any passage stating that other programmes are **benchmarked or anchored** to
  these tables. Quote each separately.

Why: two other programmes in my graph both state they are benchmarked to these
tables, and there is nothing for them to point at.

## Item 5 — the deflators behind the Canadian accounts

Document: Statistics Canada Catalogue **15F0077G**, *A guide to deflating the
input-output accounts: sources and methods*. It is cited by IMDB record 1301 as
the description of the double-deflation method; find the live URL and give it.

What I need: any passage that names a **specific price index publication** used to
deflate a specific expenditure or output category. Quote each separately with its
section or table number. I am particularly interested in whether the *Consumer
Price Index* is named as a deflator source, and if so, exactly how the sentence is
worded.

If the document names only "price indexes" generically without naming a
publication, that is `AGENCY ONLY` — or rather its equivalent, and say so.

If the catalogue number no longer resolves, say so and stop; do not substitute a
different document without telling me which one and why.

## Item 6 — one confirming document for the Labour Force Survey

In StatCan's table *National monthly gross domestic product by industry, summary
of Methods and data sources* (<https://www.statcan.gc.ca/en/statistical-programs/document/1301_D1_V4>)
there is a single row reading, in part:

> "Average weekly earnings, Labour Force Survey, Record no. 3401, and Survey of
> Employment, Payrolls and Hours, Record no. 2612"

Record 3401 is the **Field Crop Reporting Series**, not the Labour Force Survey —
so that citation is wrong in the source document, and one mis-numbered mention is
not enough for me to act on.

What I need: any **other** StatCan document stating that the monthly GDP by
industry programme uses Labour Force Survey data. Quote it with its location. If
you cannot find one, say so and list what you searched — that answer closes the
item.

---

## Node ids

Use these exact strings when you refer to something already in my graph. Do not
invent variants, and do not worry if a document names something that is not on
this list — that is useful and I want to know, just say the name as the document
gives it.

```
ab-aadl-cost-share, ab-adult-health-benefit-income-levels, ab-aish-benefit-rates,
ab-bvm-components, ab-child-family-benefit, ab-continuing-care-accommodation-charges,
ab-dip-requisition, ab-education-funding-manual, ab-education-property-tax-requisition,
ab-education-student-enrolment, ab-gas-reference-price, ab-income-support-rates,
ab-mrf-guidelines, ab-municipalaffairs-equalized-assessment,
ab-municipalaffairs-financial-statistical-data, ab-municipalaffairs-fir,
ab-municipalaffairs-lgff-capital, ab-municipalaffairs-population-list, ab-oil-par-prices,
ab-oilsands-royalty-rates, ab-regulated-property-guidelines, ab-seniors-benefit-rates,
ab-tbf-alberta-escalator, ab-tbf-economic-outlook, ab-tbf-fiscal-plan, ab-tbf-fiscal-update,
ab-tbf-population-estimates, aer-general-well-data, ahs-business-plan, ahs-financial-statements,
argus-mexico-maya-spot, bea-gdp, bea-pce, bis-basel-framework, bls-c-cpi-u, bls-cex, bls-cpi,
bls-employment-situation, bls-qcew, boc-bank-rate, boc-corra, boc-daily-exchange-rates,
boc-mortgage-qualifying-rate, boc-mpr, boc-policy-rate, boc-posted-chartered-bank-rates,
boc-prime-rate, canada-child-benefit, canada-health-transfer, canada-social-transfer,
cdic-differential-premiums-manual, cgp-assessment-roll, cgp-budget, cgp-financial-statements,
cgp-municipal-census, cgp-tax-rate-bylaw, cihi-nhex, cmhc-mortgage-loan-insurance,
cmhc-residential-mortgage-industry-report, cpi-manual, cpp-disability-amount, cpp-pension-index,
cpp-ympe, cps-current-population-survey, cra-indexation-adjustment,
dof-insured-mortgage-qualifying-rules, ei-actuarial-report-premium-rate,
ei-maximum-insurable-earnings, ei-premium-rate, ei-regional-unemployment-rates,
ei-regular-benefit-rate, esdc-oas-indexation, fed-fomc-statement, fed-h8, fed-sep, fed-z1,
ffiec-call-report, fiscal-equalization-program, gp-assessment-roll, gp-budget,
gp-financial-statements, gp-municipal-census, gp-tax-rate-bylaw, gppsd-budget,
gppsd-financial-statements, grande-spirit-requisition, hhs-poverty-guidelines,
ice-brent-futures-settlement, icls-work-statistics-resolution, imf-bpm6, imf-gfsm, ipsas,
irs-annual-inflation-adjustments, jd-power-valuation-services, naics,
nymex-wti-settlement-prices, osfi-b20, osfi-car-guideline, osfi-mqr-uninsured, psab-psas,
sna-2008, ssa-cola, ssa-contribution-benefit-base, ssa-national-average-wage-index,
ssa-pia-formula, statcan-census-population, statcan-cpi, statcan-cpi-basket-update,
statcan-gdp-monthly, statcan-hfce, statcan-lfs, statcan-national-accounts,
statcan-population-estimates, statcan-seph, statcan-shs, term-corra, un-census-principles,
uscensus-decennial, uscensus-population-estimates, uscensus-poverty-thresholds
```

Note that `fed-h15` and one Alberta grant programme are **absent** from that list
on purpose: they exist as research but have no documented edge, so they are
dropped from the graph on every build. Item 3 is about putting one of them back.

---

## Order, if you run short

Item 1, then 3a, then 2, then 4, then 5, then 6. Item 1 is a single string search
in a single document and closes either way, so do it first even if it returns
nothing.

**Write as you go.** Return each item as you finish it rather than assembling
everything and returning it at the end. A previous batch of research on this
project lost roughly 900,000 tokens of finished work to a session limit that hit
before the single write step at the end.
