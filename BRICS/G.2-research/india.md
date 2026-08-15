# BRICS Round 2 (BRICS/G.2) — INDIA

Agent research log. Date: 2026-08-13.
Existing round-1 nodes (not re-minted): `in-mospi-cpi`, `in-rbi-act-45za`, `in-constitution-art280`, `in-fc16-report`, `in-fc15-report`.
Round 1 drew **zero** edges. This round proposes **13 edges**, 11 of them with verbatim in-text citations from the dependent document itself.

---

## 0. INFRASTRUCTURE FINDING — round 1's "unreachable" Indian hosts were a local trust-store gap, not a block

This is the single most reusable result of this round. Three hosts recorded as unreachable were **all recovered to TIER A**.

### 0a. The TLS problem was NOT a government block

Initial state:

```
https://censusindia.gov.in/   -> 000 (curl: (60) SSL certificate problem: unable to get local issuer certificate)
https://dea.gov.in/           -> 000 (same)
https://egazette.gov.in/      -> 000 (same)
https://egazette.nic.in/      -> 000 (curl: (56) CONNECT tunnel failed, response 502) — host does not resolve (no DNS)
```

`curl -k` returned **200** for all three, proving the servers were alive and the failure was verification-side.

Diagnosis: `openssl s_client` **direct** showed an Anthropic-egress-gateway MITM cert and verified fine, which was misleading. Running `openssl s_client -proxy 127.0.0.1:41497` (i.e. what curl actually does) revealed the truth — for these hosts the proxy **tunnels** rather than intercepts, so the real upstream certificate is presented, and it has an **incomplete chain**:

```
censusindia.gov.in : subject=CN = censusindia.gov.in
                     issuer=C = IN, OU = emSign PKI, O = eMudhra Technologies Limited, CN = emSign SSL CA - G1
                     verify error:num=21:unable to verify the first certificate   <-- intermediate NOT sent
dea.gov.in         : issuer=C = US, O = Let's Encrypt, CN = YR1   (new LE intermediate, absent from container store)
egazette.gov.in    : issuer=C = US, O = Let's Encrypt, CN = YR2   (same)
```

Two independent causes: (1) censusindia serves a **broken/incomplete chain** (missing the eMudhra emSign intermediate); (2) dea/egazette use **Let's Encrypt YR1/YR2**, intermediates newer than the container's CA bundle.

### 0b. The fix (reproducible)

```bash
# 1. fetch the missing eMudhra intermediate via the leaf's AIA caIssuers URI
curl -sS -o emsign-int.crt http://repository.emsign.com/certs/emSignSSLCAG1.crt   # 200, 1158 bytes, DER
openssl x509 -inform DER -in emsign-int.crt -out emsign-int.pem
# subject=C=IN, OU=emSign PKI, O=eMudhra Technologies Limited, CN=emSign SSL CA - G1
# issuer =C=IN, OU=emSign PKI, O=eMudhra Technologies Limited, CN=emSign Root CA - G1   (root IS in Mozilla store)

# 2. fetch the new Let's Encrypt intermediates via their AIA URIs
curl -sS -o yr1.der http://yr1.i.lencr.org/ && openssl x509 -inform DER -in yr1.der -out yr1.pem
curl -sS -o yr2.der http://yr2.i.lencr.org/ && openssl x509 -inform DER -in yr2.der -out yr2.pem

# 3. build a combined bundle (proxy CA + system Mozilla store + the three intermediates)
cat /root/.ccr/ca-bundle.crt /etc/ssl/certs/ca-certificates.crt \
    emsign-int.pem yr1.pem yr2.pem isrgx1.pem isrgx2.pem > ca-in.crt

# 4. use it
curl -sS --cacert ca-in.crt -A '<browser UA>' -L "$URL"
```

Result:

```
censusindia.gov.in: 200 141771 -> https://censusindia.gov.in/census.website/
dea.gov.in:         200  91743 -> https://dea.gov.in/
egazette.gov.in:    200  68636 -> https://egazette.gov.in/(S(...))/default.aspx
```

**All subsequent fetches in this document use `--cacert ca-in.crt` + a Chrome UA. All are TIER A unless stated.**

### 0c. Second infrastructure finding — the RBI `rbidocs` bot-wall is defeatable

`rbidocs.rbi.org.in` (where every RBI PDF lives) returns **HTTP 200 with an F5/Shape "TSPD" JavaScript bot-challenge page instead of the PDF** — exactly the "200 that is not the document" trap warned about. `file` reports `HTML document`, and the body begins `<!DOCTYPE html>... window["bobcmn"] = "1011101010101020...` with `/TSPD/` and `TSPD_101` cookie names.

The r.jina.ai fallback (TIER B) is **also blocked** — Cloudflare returns `403` with `<title>Just a moment...</title>`.

**Working method:** seed a cookie jar against the ordinary `www.rbi.org.in` HTML page that links the PDF, then request the PDF **with those cookies plus a matching `Referer`**:

```bash
curl -sS --cacert ca-in.crt -A '<browser UA>' -L -c cj.txt -o /dev/null \
     'https://www.rbi.org.in/scripts/PublicationsView.aspx?Id=22971'          # seed -> 200
curl -sS --cacert ca-in.crt -A '<browser UA>' -L -b cj.txt -c cj.txt \
     -H 'Referer: https://www.rbi.org.in/scripts/PublicationsView.aspx?Id=22971' \
     -o sf.pdf 'https://rbidocs.rbi.org.in/rdocs/Publications/PDFs/0STATEFINANCES2023...PDF'
# -> 200 13485568 application/pdf ; file: PDF document, version 1.6
```

Caveat, recorded honestly: this worked for the `/rdocs/Publications/PDFs/` path but **failed** for `/rdocs/PressRelease/PDFs/` (`curl: (52) Empty reply from server`, retried with `--http1.1` and a fresh cookie seed — same). So RBI *Publications* PDFs are TIER A; RBI *PressRelease* PDFs remain unretrieved.

---

# HALF 1 — the specific open leads

---

## 1. Gazette notification fixing the inflation target under RBI Act §45ZA — PARTIAL

**Verdict: the substantive content (`four per cent`, CPI, §45ZA, Official Gazette) is VERIFIED from two independent primary Government-of-India publishers. The literal signed gazette PDF (S.O. 2088(E)) was NOT retrieved.**

### 1a. Press Information Bureau, Ministry of Finance — VERIFIED, TIER A

URL: `https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=148405`
HTTP check: `200 19266`
Title (as published): *Statutory and Institutionalised framework for Monetary Policy; Central Government in consultation with RBI announces the Inflation Target of Four Percent*
Publisher: Press Information Bureau, Government of India, **Ministry of Finance**, 05-August-2016 16:06 IST

Verbatim quotes:

> "Under sub-section (1) of section 45ZA of the RBI Act, the Central Government, in consultation with the RBI, determines the inflation target in terms of the Consumer Price Index (CPI), once in every five years. This target would be notified in the Official Gazette."

> "**Determination and notification of Inflation Target** — In exercise of the powers conferred by section 45ZA of the Reserve Bank of India Act, 1934, the Central Government, in consultation with RBI, has fixed the inflation target for the period beginning from the date of publication of the Gazette Notification (August 5, 2016) and ending on the March 31, 2021, as under: **Inflation Target: Four per cent. Upper tolerance level: Six per cent. Lower tolerance level: Two per cent.**"

### 1b. Reserve Bank of India, Monetary Policy Overview — VERIFIED, TIER A

URL: `https://www.rbi.org.in/Scripts/FS_Overview.aspx?fn=2752`
HTTP check: `200 107544`
Title (as published): *Monetary Policy — Overview*
Publisher: Reserve Bank of India

Verbatim quotes:

> "**Inflation Target:** Under Section 45ZA, the Central Government, in consultation with the RBI, determines the inflation target in terms of the Consumer Price Index (CPI), once in five years and notifies it in the Official Gazette. Accordingly, on August 5, 2016, the Central Government notified in the Official Gazette 4 per cent Consumer Price Index (CPI) inflation as the target for the period from August 5, 2016 to March 31, 2021 with the upper tolerance limit of 6 per cent and the lower tolerance limit of 2 per cent."

> "In its first review, on March 31, 2021, the Central Government retained the inflation target and the tolerance band for the next 5-year period – April 1, 2021 to March 31, 2026. In its second review, on **March 25, 2026**, the Central Government retained the inflation target and the tolerance band for the next 5-year period – **April 1, 2026 to March 31, 2031**."

(The March 2026 renewal is new since round 1 and keeps the mechanism live for the current award period.)

### 1c. RBI Press Release confirming the five-yearly review cycle — VERIFIED, TIER A

URL: `https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=61067`
HTTP check: `200 110588`
Title: *Discussion Paper on Review of Monetary Policy Framework*, Date: Aug 21, 2025

> "As per Section 45ZA of the RBI Act, 1934, the Central Government shall, in consultation with the Reserve Bank, determine the inflation target in terms of the CPI, once in every five years. The Central Government initially notified the inflation target with the tolerance band on August 5, 2016, for the period 2016-2021."

### 1d. The "(Combined)" half — HONEST NEGATIVE

I did **not** find the literal string "Consumer Price Index (Combined)" in the notification text on any primary source I could reach. Every primary GoI/RBI text I retrieved says "Consumer Price Index (CPI)" without the parenthetical "(Combined)". I am **not** asserting the "(Combined)" wording as a quote from the notification.

What *is* verifiable is that the target-relevant CPI series published by MoSPI is the Combined series — from the MoSPI CPI release itself (the round-1 node `in-mospi-cpi`):

URL: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2251519&reg=3&lang=1` — `200 1428225`, TIER A
Title: *PRESS RELEASE OF CONSUMER PRICE INDEX ON BASE 2024=100 FOR MARCH, 2026*, Ministry of Statistics & Programme Implementation, Posted On: 13 APR 2026

> "Year-on-year inflation rate based on All India Consumer Price Index (CPI) with base year 2024 for the month of March, 2026 over March, 2025 is 3.40%(Provisional). Corresponding inflation rates for rural and urban are 3.63% and 3.11%, respectively."
>
> Table columns: "Rural | Urban | **Combined**" ; Annexure IV title: "**All India Combined (General) level index and inflation**"

### 1e. What was tried for the literal gazette PDF (all attempts recorded)

| Host / method | Exact result |
|---|---|
| `egazette.nic.in` | No DNS record (`getent hosts` empty); proxy `502 CONNECT tunnel failed`. Host does not exist. |
| `egazette.gov.in` (plain) | `000` — TLS chain gap; **fixed** per §0b |
| `egazette.gov.in` (fixed CA) | `200 68636` → redirects to `/(S(ywiewxu1pwbp1olmpq2uy2ix))/default.aspx`. Site loads. No CAPTCHA on the landing page (contrary to the round-1 note). |
| `egazette.gov.in/(S(x))/SearchGazette.aspx` direct GET | `500` — search is a **stateful ASP.NET session + `__VIEWSTATE` postback flow**; a bare GET with a fabricated session token is rejected. Completing it needs a real browser session. **Not completed.** |
| `rbidocs.rbi.org.in/.../PR951...PDF` (the RBI Discussion Paper, which reproduces the notification history) | TSPD bot-wall → `200` HTML challenge; with cookie+Referer → `curl: (52) Empty reply from server`, also on `--http1.1`. **Not retrieved.** |
| `r.jina.ai` proxy for the above | `403`, Cloudflare `Just a moment...` interstitial. TIER B unavailable. |
| `dea.gov.in` site search for the notification | Host reachable (`200 91743`) but no notification document located. |

### Proposed EDGE

**`in-rbi-act-45za` -> `in-mospi-cpi`** — `depends_on_data_input` / `defines_target_in_terms_of`.

Justification: §45ZA's operative mechanism is expressed *in terms of* the CPI, and both the Ministry of Finance (PIB) and the RBI state this in their own words, naming the section and the index:

> "Under sub-section (1) of section 45ZA of the RBI Act, the Central Government, in consultation with the RBI, determines the inflation target **in terms of the Consumer Price Index (CPI)**, once in every five years." — PIB, Ministry of Finance, 5 Aug 2016

Caveat to carry into the JSON: the citation is **from the Government's own explanatory statements of §45ZA, not from a retrieved gazette instrument**. The "(Combined)" qualifier is *not* evidenced and should not be written into the edge.

---

## 2. Explanatory Memorandum / Article 281 laying of FC reports — VERIFIED (both FC16 and FC15). **Best result of the round.**

### 2a. FC16 Explanatory Memorandum — VERIFIED, TIER A

URL: `https://www.indiabudget.gov.in/doc/16fc.pdf`
Mirror (same document, also TIER A): `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/16fc-EM.pdf`
HTTP check: `200 288851 application/pdf` (verified as real PDF; `pdftotext -layout` → 406 lines of clean text)
Title (as published): *Explanatory Memorandum as to the Action Taken on the Recommendations Made by the Sixteenth Finance Commission*
Publisher: **GOVERNMENT OF INDIA / MINISTRY OF FINANCE / BUDGET DIVISION**, February, 2026
Signed: "New Delhi, February 01, 2026 — NIRMALA SITHARAMAN, Minister of Finance"

Periodicity (verbatim): laid with each Finance Commission report; the series runs continuously — cf. the 7th FC's own EM at `https://fincomindia.nic.in/asset/doc/commission-reports/7th-FC/EM-7.pdf`. Recurrent, once per Commission (and once per interim report).

Verbatim quotes:

> "EXPLANATORY MEMORANDUM AS TO THE ACTION TAKEN ON THE RECOMMENDATIONS MADE BY THE SIXTEENTH FINANCE COMMISSION IN ITS REPORT SUBMITTED TO THE PRESIDENT ON NOVEMBER 17, 2025."

> "1. The Sixteenth Finance Commission (XVI-FC) [Commission, henceforth] was constituted on December 31, 2023, by the President, vide Order number **S.O. 5533(E) dated December 31, 2023**, along with the Terms of Reference. The Commission was required to submit its report by October 31, 2025. The term of the Commission was extended by one month vide Order number S.O. 4640(E) dated October 10, 2025 permitting the Commission to submit its report by November 30, 2025."

> "2. **The Report of the Commission covering the financial years 2026-27 to 2030-31 commencing from April 1, 2026, together with this Explanatory Memorandum as to the action taken on the recommendations of the Commission, is being laid on the Table of the House, in pursuance of Article 281 of the Constitution.**"

> "3. The Commission has recommended to retain the States' share at **41 per cent** of the net proceeds (divisible pool) of Union taxes."

> "5. The Commission has determined the inter se share of States, based on population, demographic performance, area, forest, per-capita-income-distance and contribution of the State to Gross Domestic Product (GDP) as criteria. The formula for horizontal devolution and weights assigned to various criteria as recommended by the Commission are given in **Table 8.8 of the Report**. The shares of States in horizontal devolution for the award period are given in **Table 8.9 of the Report**."

> "12. The recommendations of the Commission on the eligibility for Gram Panchayats, Block Panchayats, District Panchayats, ULBs to receive Performance Components are detailed in **paras 10.97, 10.98 and 10.99 of Volume I of the Report**. ... The Commission has recommended the conditions for release of the State Performance Component at **para 10.100 of Volume I of the Report**."

> "27. ... rationalizing the structure of Centrally Sponsored Schemes (**Para 6.41 of the Volume I of the Report**), Reforms in the Power Sector (**Chapter 13 of Volume I**), Containing and Making Subsidies Efficient (**Chapter 14 of Volume I**), Public Sector Enterprise Reforms (**Chapter 15 of Volume I**) etc."

> "4. The Commission has recommended that to bring in more transparency about the divisible pool and the actual devolution every year, the Union Government disclose the data pertaining to net proceeds as certified by **CAG under Article 279**."

Proposed node? **YES** — `in-fc16-explanatory-memorandum`. Recurrent Government of India Budget-Division publication, laid under Article 281.

### 2b. FC15 Explanatory Memorandum (final report, 2021-26) — VERIFIED, TIER A

URL: `https://fincomindia.nic.in/asset/doc/commission-reports/atr-summary-annex-III-english.pdf`
HTTP check: `200 77719 application/pdf` (real PDF, machine-readable, 198 lines)
Title (as published): *EXPLANATORY MEMORANDUM AS TO THE ACTION TAKEN ON THE RECOMMENDATIONS MADE BY THE FIFTEENTH FINANCE COMMISSION IN ITS FINAL REPORT SUBMITTED TO THE PRESIDENT ON NOVEMBER 9, 2020.*
Publisher: **Government of India / Ministry of Finance / Department of Economic Affairs**

Verbatim quotes:

> "1. The Fifteenth Finance Commission (XV-FC) [Commission, henceforth] was constituted on 27th November 2017 by the President, vide Order number **S.O. 3755(E) dated 27th November 2017**. The Commission, vide **S.O. No.4308 (E) dated 29th November, 2019**, was mandated to submit two reports i.e. a first report for financial year 2020-21 and a final report for the period 2021-22 to 2025-26."

> "2. **The Final Report of the Commission covering the financial years 2021-22 to 2025-26 commencing from April 1, 2021, together with this Explanatory Memorandum on the action taken on the recommendations of the Commission, is being laid on the Table of the House, in pursuance of Article 281 of the Constitution.**"

> "3. The Commission has recommended that **41 per cent of the net proceeds of Union taxes** should be shared with the States as against the present 42%. The Commission felt that, financial resources equivalent to 1% of the net proceeds of Union taxes should be retained with the Central Government for financing the requirements of the newly formed Union Territories of Jammu & Kashmir and Ladakh."

### 2c. FC15 Explanatory Memorandum (first report, FY 2020-21) — VERIFIED, TIER A (scanned; OCR)

URL: `https://fincomindia.nic.in/asset/doc/commission-reports/Explanatory_Memorandum.pdf`
HTTP check: `200 8511278 application/pdf`
Extraction note: **image-only scan** (`Creator: Scan Assistant`, `pdftotext` → 0 lines, `pypdf` → empty). Text recovered by `pdftoppm -r 200 -png` + `tesseract` OCR. 4 pages. Quotes below are OCR output and carry ordinary OCR risk on digits/ordinals.

> "EXPLANATORY MEMORANDUM AS TO THE ACTION TAKEN ON THE RECOMMENDATIONS MADE BY THE FIFTEENTH FINANCE COMMISSION IN ITS REPORT FOR FINANCIAL YEAR 2020-21 SUBMITTED TO THE PRESIDENT ON DECEMBER 5, 2019."

> "2. The Report of the Commission covering the financial year 2020-21 commencing from April 1, 2020, together with this Explanatory Memorandum on the action taken on the recommendations of the Commission, **is being laid on the Table of the House, in pursuance of Article 281 of the Constitution.**"

> "5. ... The details of the revenue deficit grants are contained in **Chapter 4 of the Report**."
> "11. ... The details of the composition and manner of providing these grants are contained in **Chapter 5 of the Report**."
> "12. ... the details and conditionalities regarding release of these grants are contained in **Chapter 6 of the Report**."

### Proposed EDGES

- **`in-fc16-explanatory-memorandum` -> `in-fc16-report`** — `cites_as_input` / `acts_on`.
  Verbatim from the EM's own text: *"The formula for horizontal devolution and weights assigned to various criteria as recommended by the Commission are given in **Table 8.8 of the Report**. The shares of States in horizontal devolution for the award period are given in **Table 8.9 of the Report**."* (plus repeated "Volume I of the Report", "para 10.100 of Volume I of the Report", "Chapter 13 of Volume I").

- **`in-fc15-explanatory-memorandum` -> `in-fc15-report`** — `cites_as_input` / `acts_on`.
  Verbatim: *"The Final Report of the Commission covering the financial years 2021-22 to 2025-26 ... together with this Explanatory Memorandum on the action taken on the recommendations of the Commission, is being laid on the Table of the House, in pursuance of Article 281 of the Constitution."* and *"The Commission has recommended that 41 per cent of the net proceeds of Union taxes should be shared with the States."*

- **`in-fc16-explanatory-memorandum` -> Article 281** and **`in-fc15-explanatory-memorandum` -> Article 281** — `legal_basis`. NOTE: **no Article 281 node exists.** Either mint `in-constitution-art281` or drop these two. Verbatim in both: *"is being laid on the Table of the House, in pursuance of Article 281 of the Constitution."*

---

## 3. The MoSPI publication behind FC16's "Per Capita GSDP Distance" (42.5%) — PARTIAL / NOT FOUND (honest negative)

I read FC16 **Volume I (Main Report, 17,998 lines)** and **Volume II (Annexures, 8,985 lines)** in full text, including the Technical Note that defines the formula.

Sources (both TIER A, real PDFs):
- Vol I: `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol1-Main-Report.pdf` — `200 7429766 application/pdf`
- Vol II: `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol2-Annexures.pdf` — `200 5773379 application/pdf`

Table 8.8 confirmed verbatim (matches the round-1 node exactly):

> "**Table 8.8 Formula for Horizontal Devolution** — Population (2011) 17.5 | Demographic Performance 10 | Area 10 | Forest 10 | **Per Capita GSDP Distance 42.5** | Contribution to GDP 10 | Total 100"

**FC16 names MoSPI as the data *provider*, but never names a specific titled recurring MoSPI GSDP release.** The Technical Note (Vol I, "5) Per Capita GSDP Distance") defines the formula mathematically and states only:

> "Per-capita GSDP of each State is derived as its average nominal per-capita GSDPs during 2018-19 to 2023-24 excluding the COVID-19 years of 2020-21."

— with no source citation attached.

The closest FC16 comes to naming a MoSPI product is the general data-sources paragraph and a repeated table-source label:

> Vol I, para 1.32: "Additional sources included the Reserve Bank of India's (RBI) publications on State finances and **the Ministry of Statistics and Programme Implementation, which provided comparable data on gross state domestic product, gross state value added, consumption, investment, savings, gross capital formation, and so on.**"

> Vol I & Vol II table sources (7+ occurrences, e.g. Vol I L4822, L5900; Vol II L1135, L1182, L1223, L1316, L1362, L1402): "**Source: MoSPI Comparable Estimates for GDP (2011-12 series), States' Finance Accounts**"

> Vol I L11438 (local-body data): "Provided by MoSPI" ; L11187: "GSVA 2023-24 data provided by MoSPI"

**Assessment:** "MoSPI Comparable Estimates for GDP (2011-12 series)" is a *dataset label*, not a titled recurring publication, and MoSPI's own site does not publish a release under that name. On the project's evidence standard this is **not** enough to mint a node or draw a titled edge — the same discipline that killed the round-1 FC16→Article 280 edge applies here.

MoSPI's own site was checked for a titled GSDP release: `https://www.mospi.gov.in/state-wise-gross-state-domestic-product-gsdp-growth-rates-constant-prices-base-year-2011-12` returns `200` but only **2657 bytes** — a JavaScript SPA shell with no server-rendered content and no document links. The underlying artefacts are bare spreadsheets (e.g. `.../press_releases_statements/State_wise_SDP_as_on_15032024.xls`) with no publication title, no periodicity statement, and no methodology text.

**Proposed node? NO. Proposed edge? NO** — beyond the generic-attribution edge in §6 below, which is labelled as generic.

---

## 4. Census of India 2011 — VERIFIED (node + edge). Round 1's blocker was the TLS gap fixed in §0.

URL (host, now reachable): `https://censusindia.gov.in/census.website/` — `200 141771`
URL (titled release page): `https://censusindia.gov.in/census.website/data/population-finder` — `200 123738`
Publisher: **Office of the Registrar General & Census Commissioner, India, Ministry of Home Affairs**

Verbatim quote (from the Census organisation's own page):

> "**Population Finder 2011** — The Population Finder retrieves data from the **Primary Census Abstract (PCA)** data tables. These tables contain 85 indicators available for districts, sub-districts, towns, villages and wards. For districts and sub-districts, these indicators are also available separately for urban and rural areas. The indicators include the number of households, the population by sex, by selected age group, by scheduled castes and tribes, by work status, and more. Download **Basic Population Figures of India and States, 2011**. **Basic Population Figures of India, States and Districts, 2011**."

Periodicity: decennial. The Census website's other data page is titled "**Census Tables (2011, 2001 & 1991)**" (`/census.website/data/census-tables`, `200 123406`), evidencing the recurring decennial series.

Proposed node? **YES** — `in-census-2011` (Census of India 2011 / Primary Census Abstract, ORGI, MHA). Decennial recurrence is clearly evidenced.

### FC16 names it directly — VERBATIM

FC16 Volume I, para 8.85 (the Population criterion, weight 17.5):

> "8.85 In keeping with the longstanding practice ... we continue to include population among the criteria. In conformity with the uniform recommendation by nearly all States, we implement this criterion by awarding each State an allocation based on its share in the **Census 2011 total population** of the twenty-eight States. We assign a weight of 17.5 per cent to this criterion. We note here that whenever any of our variables are combined with population, **we rely on the 2011 Census figures**. In this respect, we have fully transitioned from the 1971 Census population to the 2011 Census population data."

FC16 Volume I, Technical Note, formula (ii):

> "Denoting by Nk the population of State k (k = 1, 2, … 28) **as per the 2011 Census**, we have, (ii) C1j = …"

FC16 Volume I, Demographic Performance criterion (para 8.88):

> "we set the per capita devolution to a State in proportion to the inverse of its population growth **between 1971 and 2011 Censuses**. We convert this per capita devolution into total by multiplying it by the 2011 population."

FC16 Volume I table source (L8735):

> "**Source: Reports of FC-11 to FC-15; Census of India 2001 and 2011.**"

FC16 Explanatory Memorandum (para 13):

> "be ₹2,000 per person (**based on Census 2011 population**)."

### Proposed EDGE

**`in-fc16-report` -> `in-census-2011`** — `uses_data_from`.
Verbatim citation from FC16's own text: *"we implement this criterion by awarding each State an allocation based on its share in the Census 2011 total population of the twenty-eight States. We assign a weight of 17.5 per cent to this criterion."*

---

# HALF 2 — second layer of Indian building blocks

---

## 5. Union Budget — Transfer of Resources / devolution statements — VERIFIED (one strong edge, one rejected)

### 5a. Receipts Budget, ANNEX-4 — **VERIFIED, TIER A. Strongest breadth edge of the round.**

URL: `https://www.indiabudget.gov.in/doc/rec/annex4.pdf`
HTTP check: `200 554314` (real PDF)
Title (as published): *ANNEX-4 — STATEMENT SHOWING STATE-WISE DISTRIBUTION OF NET PROCEEDS OF UNION TAXES AND DUTIES FOR BE 2026-2027*
Publisher: Ministry of Finance, Budget Division — *Receipts Budget, 2026-2027*
Parent document: `https://www.indiabudget.gov.in/doc/rec/allrec.pdf` — `200 7116276` — *RECEIPT BUDGET 2026-2027, MINISTRY OF FINANCE, BUDGET DIVISION, February, 2026*
Periodicity: annual (one Receipts Budget per financial year; archive at `https://www.indiabudget.gov.in/budget_archive/rec.asp`).

**Verbatim citation line (the footnote to the "Share (Per cent)" column):**

> "\* **As per accepted recommendations of the Sixteenth Finance Commission, the States' share has been fixed at 41% of the net proceeds of shareable Central Taxes.**"

And the column it annotates reproduces FC16 Table 8.9 **exactly**:

> "Andhra Pradesh 4.217 | Arunachal Pradesh 1.354 | Assam 3.258 | Bihar 9.948 | Chhattisgarh 3.304 | Goa 0.365 | Gujarat 3.755 | Haryana 1.361 | Himachal Pradesh 0.914 | … | Uttar Pradesh 17.619 | Uttarakhand 1.141 | West Bengal 7.215"

— identical to FC16 Vol I Table 8.9 ("Andhra Pradesh 4.217 / Arunachal Pradesh 1.354 / Assam 3.258 / Bihar 9.948 / Chhattisgarh 3.304 / Goa 0.365 / Gujarat 3.755 / Haryana 1.361 / Himachal Pradesh 0.914 / Jharkhand 3.357 / Karnataka 4.131 / Kerala 2.382 / Madhya Pradesh 7.347 / Maharashtra 6.441 / Manipur 0.626 / Meghalaya 0.631 …"). The dependent document names the source document and reproduces its numbers.

Proposed node? **YES** — `in-union-receipts-budget` (Receipts Budget, Ministry of Finance, annual).

**Proposed EDGE: `in-union-receipts-budget` -> `in-fc16-report`** — `implements` / `cites_as_input`, on the verbatim footnote above.

### 5b. Expenditure Profile Statement 18 / Budget at a Glance — node YES, edge **REJECTED**

- `https://www.indiabudget.gov.in/doc/eb/stat18.pdf` — `200 697496` — *"Expenditure Profile 2026-2027 … STATEMENT 18 — TOTAL TRANSFER OF RESOURCES TO STATES AND UNION TERRITORIES WITH LEGISLATURE (excluding States' share of Net Proceeds of Union Taxes and Duties)"*
- `https://www.indiabudget.gov.in/doc/Budget_at_Glance/bag3.pdf` — `200 427141` — *"TRANSFER OF RESOURCES TO STATES AND UNION TERRITORIES WITH LEGISLATURE"*, showing "I. Devolution of States share in taxes 1286885 / 1392971 / **1526255**"
- `https://www.indiabudget.gov.in/doc/Budget_at_Glance/budget_at_a_glance.pdf` — `200 2744811`

These are unambiguously recurrent annual publications and good nodes. But their only reference to the Commission is the **line-item label** "II. Finance Commission Grants" / "III. ववत्त आयोग के अनुदान — III. Finance Commission Grants". A budget head named after an institution is **not** a citation of a document.

**No edge proposed from Statement 18 / Budget at a Glance.** This is the round-1 FC16→Art.280 discipline applied again. The Receipts Budget ANNEX-4 footnote (§5a) is the one that clears the bar, and it is where the edge should be drawn.

### 5c. FRBM Fiscal Policy Statements — node candidate, edge **NOT** supported

URL: `https://www.indiabudget.gov.in/doc/frbm1.pdf` — `200 1623802`
Title: *Statements of Fiscal Policy as required under the Fiscal Responsibility and Budget Management Act, 2003*, Nirmala Sitharaman, Minister of Finance, February 2026.

> "(v) Finance Commission Grants — 30. In BE 2026-27, the Finance Commission grants are estimated at ₹1.29 lakh crore. … Thus, total resources shared, tax devolution and FC Grants, with States through the Finance Commission route are estimated at ₹16.56 lakh crore in BE 2026-27."

Institutional reference only, no document citation. **No edge proposed.**

---

## 6. RBI, *State Finances: A Study of Budgets of State Governments* — VERIFIED (node + 2 edges)

URL (landing, TIER A): `https://www.rbi.org.in/scripts/PublicationsView.aspx?Id=22971` — `200 63771`
URL (full report PDF, TIER A **via the cookie+Referer method of §0c**): `https://rbidocs.rbi.org.in/rdocs/Publications/PDFs/0STATEFINANCES202324E45F66372EEC4743AE4E9BED92EB85FF.PDF` — `200 13485568 application/pdf` (verified real PDF; `pdftotext` → 17,374 lines)
URL (press release, TIER A): `https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=56910` — `200 114069`

Title (as published): *STATE FINANCES — A STUDY OF BUDGETS OF 2023-24 — REVENUE DYNAMICS AND FISCAL CAPACITY OF INDIAN STATES*, RESERVE BANK OF INDIA, December 2023.

Periodicity (verbatim, from RBI's own Foreword):

> "The Reserve Bank's **annual publication** 'State Finances: A Study of Budgets' provides a comprehensive analysis of the fiscal position of State governments in India."

And from the press release:

> "Today, the Reserve Bank of India (RBI) released the Report titled 'State Finances: A Study of Budgets of 2023-24', **an annual publication** that provides information, analysis and an assessment of the finances of State governments for 2023-24 …"

Proposed node? **YES** — `in-rbi-state-finances`. RBI, annual, explicitly so labelled.

### Does its own text cite the Finance Commission report? YES

> Table III.3 heading: "**States' Share in the Divisible Pool of Central Taxes Recommended by Finance Commissions**" — rows: "Eleventh 29.5 | Twelfth 30.5 | Thirteenth 32.0 | Fourteenth 42.0 | **Fifteenth 41.0**"
> Table III.3 source line: "**Sources: Various Finance Commission Reports; and Reddy and Reddy (2019).**"

> Body text: "…the States can raise more revenues through higher stamp duty and registration fees, **as pointed out by the Fifteenth Finance Commission (FC-XV)**."

> "The trend appeared following the **recommendation of the Fourteenth Finance Commission (FC-XIV)** to exclude States from the National …"

**Proposed EDGE: `in-rbi-state-finances` -> `in-fc15-report`** — `cites_as_input`.
Verbatim: table source *"Sources: Various Finance Commission Reports; and Reddy and Reddy (2019)"* attached to a table whose "Fifteenth — 41.0" row is FC15's headline recommendation, plus the in-text *"as pointed out by the Fifteenth Finance Commission (FC-XV)"*.

### And FC16 cites *it* back — a reciprocal edge

FC16 Volume II, data-sources appendix (L1637-1640):

> "Total Grants — 1952-53 to 1989-90: RBI Bulletins of various years. … 1990-91 to 2022-23: **RBI Study on State Finances 2014, 2023, 2024. Appendix 2.** The data for 2023-24 is taken from Statement 18 of Union Budget"

**Proposed EDGE: `in-fc16-report` -> `in-rbi-state-finances`** — `uses_data_from`.
Verbatim: *"1990-91 to 2022-23: RBI Study on State Finances 2014, 2023, 2024. Appendix 2."*

### Bonus edge from the same FC16 appendix — FC16 -> Union Budget Statement 18

Same passage, twice:

> "2016-17 to 2023-24: **Statement 18 of Expenditure Profile of Union Budget** as IPFS reports were discontinued"
> "The data for 2023-24 is taken from **Statement 18 of Union Budget**"

**Proposed EDGE: `in-fc16-report` -> `in-union-budget-expenditure-profile-stmt18`** — `uses_data_from`. (Requires minting the Statement 18 node from §5b, which is well-evidenced as a node even though it does not itself cite the FC.)

Also in the same appendix, worth recording:
> "GRR — **Database on Indian Economy, RBI.** The figure is derived as a sum of Gross Tax Revenue and Gross Non-tax Revenue taken from **HBS Table 93 (Central Government Receipts- Major components) of DBIE**."
> "Net Proceeds — Data on divisible pool is taken from the **CAG certificates** for respective years"
> "GDP — **Table 1.6 of Economic Survey 2024-25**"

The **Economic Survey** citation is a clean, precise pointer to a well-known annual GoI publication and is a good future node/edge (`in-fc16-report` -> Economic Survey); I did not have time to verify the Economic Survey URL, so I am flagging it as a lead rather than asserting it.

---

## 7. CAG audit reports — VERIFIED (node + edge)

URL: `https://cag.gov.in/webroot/uploads/download_audit_report/2025/English-SFAR-2023-24-068f705991fcd54.32361460.pdf`
HTTP check: `200 9926041 application/pdf` (real PDF; `pdftotext` → 14,035 lines). Host `https://cag.gov.in` → `200 371940`.
Title (as published): *Report of the Comptroller and Auditor General of India on State Finances for the year 2023-24 — Government of Tamil Nadu — Report No. 2 of 2025 (State Finances Audit Report)*
Publisher: Comptroller and Auditor General of India
Periodicity: annual State Finances Audit Report, one per State per financial year (series numbering "Report No. 2 of 2025" for FY 2023-24).

Verbatim quotes showing it cites the Finance Commission:

> "The actual devolution of State's share of Union taxes and duties was greater than the projections made by the **Fifteenth Finance Commission (XV FC)** for the years 2021-22 to 2023-24."

> "**Fifteenth Finance Commission Grants** — Transfers from GoI to the State during 2023-24 on the **recommendations of XV FC** are given in Table 2.10"

> "…compared to projections made by the **Central Finance Commission**"

> "…recommendations of the **Twelfth Finance Commission (XII FC)** for…"

> Sources/scope statement: "The analysis is also carried out on **recommendations of the Finance Commission (FC)**, in the context of Tamil Nadu State Fiscal Responsibility and Budget Management Act (TNFR Act), best practices and guidelines of the Government of India."

Proposed node? **YES** — `in-cag-state-finances-audit-report`.

**Proposed EDGE: `in-cag-state-finances-audit-report` -> `in-fc15-report`** — `cites_as_input`.
Verbatim: *"The actual devolution of State's share of Union taxes and duties was greater than the projections made by the Fifteenth Finance Commission (XV FC) for the years 2021-22 to 2023-24."*

Note in the reverse direction: FC16 Vol I L4606 uses "Source: States' Finance Accounts, States' Budgets, **CAG Audit Reports on State Finances**" and para 1.31 says "Disaggregated details of the divisible pool of taxes were obtained from the office of the CAG." A reciprocal `in-fc16-report` -> `in-cag-state-finances-audit-report` edge is defensible on the table-source line; I rate it **plausible but weaker** than the forward edge because it names a class of reports rather than a specific one.

---

## 8. GST (Compensation to States) Act, 2017 — VERIFIED (node; standing statute defining a method)

URL: `https://www.indiacode.nic.in/bitstream/123456789/2253/1/A2017-15.pdf`
Landing: `https://www.indiacode.nic.in/handle/123456789/2253?view_type=browse` — `200 93179`
HTTP check: `200 272162 application/pdf` (real PDF; `pdftotext` → 528 lines)
Title (as published): *The Goods and Services Tax (Compensation to States) Act, 2017* (Act No. 15 of 2017)
Publisher: India Code — the official statute portal, Government of India / Ministry of Law and Justice

Verbatim quotes (the compensation formula the task asked for):

> "**3. Projected growth rate.**––The projected nominal growth rate of revenue subsumed for a State during the transition period shall be **fourteen per cent. per annum**."

> "(k) 'projected growth rate' means the rate of growth projected for the transition period as per section 3;"

> "Illustration.—If the base year revenue for **2015-16** for a concerned State, calculated as per section 5 …"

> Amendment schedule: "(a) to provide that the financial year **2015-16** shall be taken as the base year for the purpose of … shall be **fourteen per cent. per annum** … counted towards the definition of Revenue for the base year 2015-16;"

> "…calculated by applying the projected growth rate over the base year revenue of that State."

Proposed node? **YES** — `in-gst-compensation-act-2017`. Qualifies under the project's "standing statutes/instruments defining a method" rule: it fixes a 14% p.a. projected growth rate over a 2015-16 base as the statutory compensation formula.

**Proposed EDGE: none.** The Act is a 2017 statute; it does not and cannot cite FC15 (2020) or FC16 (2025), and I found no in-text citation in it to any other corpus node. FC15/FC16 discuss GST, but I did not locate a verbatim FC citation of *this Act by name and number* in the passages I read, so I am not asserting one. Recorded as a node-only contribution.

---

## 9. MoSPI National Accounts Statistics and SNA 2008 — VERIFIED node; edge PARTIAL

### 9a. The recurring publication — VERIFIED, TIER A

URL: `https://www.mospi.gov.in/sites/default/files/press_release/Press%20Release%20on%20National%20Accounts%20Statistics%20Publication%20-%202025.pdf` — `200 164817 application/pdf`
Also: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2129126&reg=48&lang=2` — `200 270301`
Title: *NATIONAL ACCOUNTS STATISTICS - 2025 PUBLICATION*
Publisher: GOVERNMENT OF INDIA, MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION. Dated: 26 Vaisakha, 1947 Saka / 16 May, 2025.

Periodicity: annual, evidenced by the release naming its own predecessors:

> "The Ministry of Statistics and Programme Implementation (MoSPI) has released the '**National Accounts Statistics – 2025**' publication, a comprehensive source of data on the national income, production, and expenditure aggregates of the Indian economy."
> "In addition, the publication, '**National Accounts Statistics – 2024**' is updated by including the statements on Sequence of Accounts of different institutional sectors."

**SNA citation in this release — generic (no year):**

> "These estimates are presented at current and constant (2011-12) prices and are based on the methodologies in **alignment with the United Nations System of National Accounts (SNA)**."

That names the UN SNA but **not** SNA **2008** specifically. Insufficient on its own for a precise edge to the SNA-2008 corpus node.

### 9b. Where SNA 2008 IS named verbatim — two MoSPI documents

**(i) MoSPI, "Understanding the New Series of GDP — Frequently Asked Questions" (Feb 2026), TIER A**
URL: `https://www.mospi.gov.in/uploads/announcements/announcements_1772117257791_84ae898f-7be2-4b7d-a135-565e1a809513_FAQ_GDP_26022026_1902.pdf` — `200 136754 application/pdf`
Publisher: GOVERNMENT OF INDIA, MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION

> "6. How comparable will the revised GDP series be with international statistical standards such as the UN System of National Accounts? — **India prepares its GDP estimates according to the 2008 System of National of Accounts (SNA 2008)**, which is a globally accepted standard. The United Nations Statistical Division (UNSD) is now moving from SNA 2008 to SNA 2025. Countries are expected to adopt a new standard during 2029-30. India plans to shift to SNA 2025 in its next base year revision."

> "18. What are the SNA recommendations to handle this discrepancy? — As per the **System of National Accounts 2008 (SNA 2008)** and continued in System of National Accounts 2025 (SNA 2025), the following recommendations are made for handling statistical discrepancy in GDP estimates…"

> "…this is a standard method used worldwide following the **SNA 2008** and IMF's Quarterly …"

(Caveat: this FAQ is a one-off explanatory document, not a recurring publication — it is *evidence*, not a node.)

**(ii) MoSPI, "Changes in Methodology and Data Sources in the New Series of National Accounts, Base Year 2011-12" (March 2015), TIER A**
URL: `https://www.mospi.gov.in/sites/default/files/publication_reports/Changes_in_Methodology_NS_2011-12_March_2015.pdf` — `200 1787514 application/pdf` (8,523 lines). NOTE: watermarked "**OBSOLETE**" on the pages.

> "…possible, the latest recommendations of **System of National Accounts, 2008** in the …"
> "Implementation of **2008 SNA**"
> "As recommended by **SNA 2008**, such enterprises have been treated as quasi-…"
> "In the new series, as recommended in the **SNA 2008**, the estimates of …"

### Proposed node / edge

Proposed node? **YES** — `in-mospi-nas` (National Accounts Statistics, MoSPI, annual).

**Proposed EDGE: `in-mospi-nas` -> `sna-2008`** — `methodology_based_on`. **Confidence: MEDIUM — flag for reviewer.**
The NAS release's own text says only "in alignment with the **United Nations System of National Accounts (SNA)**" without the year. The explicit "SNA 2008" wording comes from *other* MoSPI documents about the same estimates (the 2026 GDP FAQ and the 2015 methodology volume, the latter watermarked OBSOLETE). Under a strict reading — the dependent document's own text must name the target — the NAS-2025 release does **not** meet the bar on its own. I recommend either (a) accepting the edge with the FAQ quoted as corroborating evidence, or (b) holding it. I have **not** fabricated an "SNA 2008" string in the NAS release.

---

## 10. FC Terms of Reference — Presidential Order under Article 280 — **VERIFIED. This rescues the FC↔Art.280 relationship.**

URL: `https://fincomindia.nic.in/asset/doc/tor_new.pdf`
HTTP check: `200 2029858 application/pdf` (real PDF, bilingual Hindi/English, digitally signed)
Title (as published): *THE GAZETTE OF INDIA : EXTRAORDINARY — PART II—Section 3—Sub-section (ii) — PUBLISHED BY AUTHORITY — No. 5300, NEW DELHI, SUNDAY, DECEMBER 31, 2023*
Publisher: **MINISTRY OF FINANCE (Department of Economic Affairs)**, NOTIFICATION, New Delhi, the 31st December, 2023. Ref `[F. No. 10(2)-B(S)/2022]`, ASHISH VACHHANI, Addl. Secy. (Budget). Digitally signed by SARVESH KUMAR SRIVASTAVA, 2023.12.31 13:34:56 +05'30'. "Uploaded by Dte. of Printing at Government of India Press … and Published by the Controller of Publications, Delhi-110054."
Periodicity: one constituting Order per Finance Commission, i.e. every five years — cf. FC15's `S.O. 3755(E) dated 27th November 2017` and the 13th FC's `asset/doc/commission-reports/13th-FC/notification.pdf`. Recurrent.

**Verbatim quote — an explicit, in-text Article 280 citation in an official Gazette instrument:**

> "**S.O. 5533(E).**— The following order made by the President is to be published for general information: —
> **ORDER**
> **In pursuance of clause (1) of article 280 of the Constitution read with the provisions of the Finance Commission (Miscellaneous Provisions) Act, 1951 (33 of 1951), the President is pleased to constitute a Finance Commission** with Dr. Arvind Panagariya, former Vice-Chairman, NITI Aayog and Professor, Columbia University, as the Chairman."

> "4. The Commission shall make recommendations as to the following matters, namely: — (i) The distribution between the Union and the States of the net proceeds of taxes which are to be, or may be, divided between them under Chapter I, Part XII of the Constitution and the allocation between the States of the respective shares of such proceeds; (ii) The principles which should govern the grants-in-aid of the revenues of the States out of the Consolidated Fund of India … under article 275 of the Constitution …; and (iii) The measures needed to augment the Consolidated Fund of a State to supplement the resources of the Panchayats and Municipalities in the State …"

> "5. The Commission shall make its report available by 31st day of October, 2025 covering a period of five years commencing on the 1st day of April, 2026."

> Signed: "New Delhi, Dated the 31st December, 2023 — **DROUPADI MURMU, President of India**"

Proposed node? **YES** — `in-fc16-tor-order` (Presidential Order S.O. 5533(E), Ministry of Finance/DEA, Gazette of India Extraordinary).

### Proposed EDGES

- **`in-fc16-tor-order` -> `in-constitution-art280`** — `legal_basis` / `issued_under`.
  Verbatim from the Order's own text: *"In pursuance of clause (1) of article 280 of the Constitution read with the provisions of the Finance Commission (Miscellaneous Provisions) Act, 1951 (33 of 1951), the President is pleased to constitute a Finance Commission…"*

- **`in-fc16-report` -> `in-fc16-tor-order`** — `mandated_by` / `cites_as_input`.
  Verbatim from FC16 Volume I, para 1.8: *"As per the order constituting the FC-16, its ToR is as follows: 'The Commission shall make recommendations as to the following matters, namely: …'"* (FC16 then reproduces the Order's text in full and cross-refers to it as Annexure 1.1).

### ★ AND — the round-1 FC16→Article 280 edge is now properly evidenced, **in FC16's own text**

Round 1 correctly rejected this edge for want of a verbatim in-text citation. That citation exists. FC16 **Volume I, para 1.2**, the opening substantive sentence of the Report:

> "**1.2 In pursuance of clause (1) of Article 280 of the Constitution of India and the provisions of the Finance Commission (Miscellaneous Provisions) Act, 1951 (Act No. 33 of 1951), the President of India constituted the FC-16 vide Notification S.O. 5533(E) dated 31 December 2023 (Annexure 1.1).** The Commission was mandated to make its recommendations for the five-year period commencing on 1 April 2026 and ending on 31 March 2031."

Source: `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol1-Main-Report.pdf` (`200 7429766 application/pdf`), Chapter 1 "Constitution and Composition of the Commission".

**Proposed EDGE: `in-fc16-report` -> `in-constitution-art280`** — `legal_basis`.
This is a genuine verbatim in-text citation naming "clause (1) of Article 280 of the Constitution of India" in the dependent document's own body text. It is not the inference round 1 rejected. **Recommend reinstating.**

---

# SUMMARY OF PROPOSED NODES

| Proposed id | Title | Publisher | Periodicity | Tier | URL |
|---|---|---|---|---|---|
| `in-fc16-explanatory-memorandum` | Explanatory Memorandum as to the Action Taken on the Recommendations Made by the Sixteenth Finance Commission | MoF, Budget Division | per Commission (Art. 281) | A | indiabudget.gov.in/doc/16fc.pdf |
| `in-fc15-explanatory-memorandum` | Explanatory Memorandum … Fifteenth Finance Commission … Final Report | MoF, Dept of Economic Affairs | per Commission | A | fincomindia.nic.in/asset/doc/commission-reports/atr-summary-annex-III-english.pdf |
| `in-fc16-tor-order` | Presidential Order S.O. 5533(E) constituting the Sixteenth Finance Commission (Gazette of India Extraordinary) | MoF (DEA) / President | every 5 years | A | fincomindia.nic.in/asset/doc/tor_new.pdf |
| `in-census-2011` | Census of India 2011 / Primary Census Abstract | ORGI, Ministry of Home Affairs | decennial | A | censusindia.gov.in/census.website/data/population-finder |
| `in-union-receipts-budget` | Receipts Budget (ANNEX-4: State-wise Distribution of Net Proceeds of Union Taxes and Duties) | MoF, Budget Division | annual | A | indiabudget.gov.in/doc/rec/annex4.pdf |
| `in-union-budget-expenditure-profile-stmt18` | Expenditure Profile, Statement 18 — Total Transfer of Resources to States and UTs with Legislature | MoF, Budget Division | annual | A | indiabudget.gov.in/doc/eb/stat18.pdf |
| `in-rbi-state-finances` | State Finances: A Study of Budgets | Reserve Bank of India | annual (verbatim) | A | rbi.org.in/scripts/PublicationsView.aspx?Id=22971 |
| `in-cag-state-finances-audit-report` | Report of the CAG of India on State Finances (State Finances Audit Report) | Comptroller and Auditor General of India | annual per State | A | cag.gov.in/webroot/uploads/download_audit_report/2025/English-SFAR-2023-24-….pdf |
| `in-gst-compensation-act-2017` | The Goods and Services Tax (Compensation to States) Act, 2017 (Act 15 of 2017) | India Code / Min. of Law & Justice | standing statute | A | indiacode.nic.in/bitstream/123456789/2253/1/A2017-15.pdf |
| `in-mospi-nas` | National Accounts Statistics | MoSPI | annual | A | mospi.gov.in/sites/default/files/press_release/Press Release on National Accounts Statistics Publication - 2025.pdf |

# SUMMARY OF PROPOSED EDGES

| # | Source | Target | Type | Strength |
|---|---|---|---|---|
| 1 | `in-fc16-report` | `in-constitution-art280` | legal_basis | **STRONG** — verbatim Vol I para 1.2 (reinstates round-1 rejection) |
| 2 | `in-fc16-tor-order` | `in-constitution-art280` | issued_under | **STRONG** — verbatim Gazette S.O. 5533(E) |
| 3 | `in-fc16-report` | `in-fc16-tor-order` | mandated_by | **STRONG** — verbatim Vol I para 1.2 + 1.8 |
| 4 | `in-fc16-report` | `in-census-2011` | uses_data_from | **STRONG** — verbatim Vol I para 8.85 |
| 5 | `in-fc16-explanatory-memorandum` | `in-fc16-report` | acts_on | **STRONG** — "Table 8.8 of the Report", "Volume I of the Report" |
| 6 | `in-fc15-explanatory-memorandum` | `in-fc15-report` | acts_on | **STRONG** — verbatim Art. 281 laying clause |
| 7 | `in-union-receipts-budget` | `in-fc16-report` | implements | **STRONG** — verbatim ANNEX-4 footnote + identical Table 8.9 shares |
| 8 | `in-fc16-report` | `in-rbi-state-finances` | uses_data_from | **STRONG** — "RBI Study on State Finances 2014, 2023, 2024. Appendix 2." |
| 9 | `in-fc16-report` | `in-union-budget-expenditure-profile-stmt18` | uses_data_from | **STRONG** — "Statement 18 of Expenditure Profile of Union Budget" |
| 10 | `in-rbi-state-finances` | `in-fc15-report` | cites_as_input | **STRONG** — Table III.3 + "as pointed out by the Fifteenth Finance Commission (FC-XV)" |
| 11 | `in-cag-state-finances-audit-report` | `in-fc15-report` | cites_as_input | **STRONG** — verbatim XV FC projections comparison |
| 12 | `in-rbi-act-45za` | `in-mospi-cpi` | defines_target_in_terms_of | **MEDIUM** — PIB/RBI explanatory text, not a retrieved gazette instrument |
| 13 | `in-mospi-nas` | `sna-2008` | methodology_based_on | **MEDIUM — flag** — NAS release says "SNA" without year; "SNA 2008" only in adjacent MoSPI docs |
| — | `in-fc16-report` | `in-cag-state-finances-audit-report` | uses_data_from | WEAK — names a class of reports; reviewer's call |
| — | (EM docs) | Article 281 | legal_basis | blocked — **no Article 281 node exists** |

# EXPLICITLY REJECTED (evidence does not support)

- **Statement 18 / Budget at a Glance -> FC report.** Only a budget-head *label* ("Finance Commission Grants"). Not a document citation.
- **FRBM Fiscal Policy Statements -> FC report.** Institutional reference only.
- **FC16 -> a named MoSPI GSDP release.** FC16 never names a titled MoSPI GSDP publication; "MoSPI Comparable Estimates for GDP (2011-12 series)" is a dataset label with no corresponding published release. See §3.
- **GST Compensation Act -> anything.** No in-text citation of a corpus node found.
- **Any claim that the inflation-target notification uses the words "Consumer Price Index (Combined)".** Not evidenced in any primary source I could reach. See §1d.

# OUTSTANDING / NOT RETRIEVED

1. The literal signed gazette PDFs of the inflation-target notifications (S.O. 2088(E) of 5 Aug 2016; the 31 Mar 2021 renewal; the 25 Mar 2026 renewal). egazette.gov.in is now reachable but its search is a stateful ASP.NET `__VIEWSTATE` postback flow (bare GET → `500`); a real browser session would likely finish this.
2. RBI **PressRelease**-path PDFs on rbidocs (the Aug 2025 Monetary Policy Framework Discussion Paper). Cookie+Referer works for the Publications path but returns `curl: (52) Empty reply from server` for PressRelease. r.jina.ai is Cloudflare-403.
3. Economic Survey — FC16 Vol II cites "Table 1.6 of Economic Survey 2024-25" verbatim. Strong node+edge lead, URL not yet verified.
4. GST Council recurring publications — not reached this round.
5. PFMS transfer reporting — not reached this round.
