import json, collections

EDITS = {
    "src/data/research/us-subnational.json": [
        {
            "id": "bea-state-personal-income",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2026-09-30", "to": "2026-09-30", "precision": "day", "covers": "Q2 2026 state personal income"},
                    {"from": "2026-12-23", "to": "2026-12-23", "precision": "day", "covers": "Q3 2026 state personal income"},
                ],
                "source_url": "https://www.bea.gov/news/schedule",
                "note": "Not independently scheduled — released bundled with the GDP third estimate.",
            },
        },
        {
            "id": "ca-dof-governors-budget",
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "Governor's Budget submitted by January 10 each year (CA Constitution Art. IV §12); May Revision by May 14 (Gov. Code §13308).",
                "entries": [
                    {"from": "2027-01-10", "to": "2027-01-10", "precision": "day", "evidence": "implied", "covers": "FY2027-28 Governor's Budget"},
                    {"from": "2027-05-14", "to": "2027-05-14", "precision": "day", "evidence": "implied", "covers": "FY2027-28 May Revision"},
                ],
                "source_url": "https://dof.ca.gov",
                "note": "2026's January 10 and May 14 deadlines have already passed as of this audit — entries project the next full cycle.",
            },
        },
        {
            "id": "ca-dir-ccpi",
            "releases_per_year": 6,
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "Published on even-numbered months only (six times a year), roughly seven weeks after the reference month, per the California DIR's own published schedule.",
                "entries": [
                    {"from": "2026-10-01", "to": "2026-10-31", "precision": "month", "evidence": "implied", "covers": "August 2026 CCPI (even-month release)"},
                    {"from": "2026-12-01", "to": "2026-12-31", "precision": "month", "evidence": "implied", "covers": "October 2026 CCPI (even-month release)"},
                ],
                "source_url": "https://www.dir.ca.gov/oprl/capriceindex.htm",
                "note": "Corrects releases_per_year, previously recorded as 12 — DIR's own site (landing page, a 2019 methodology notice, and a Dec 2025 notice) states publication on even-numbered months only. Also depends specifically on BLS *regional* CPI releases (LA, SF, San Diego, Riverside metro indexes), not the national bls-cpi headline release — DIR skipped October 2025 entirely when the federal shutdown delayed BLS regional data. Candidate edge, not yet added: ca-dir-ccpi depends on BLS regional CPI, needs a proper basis before minting.",
            },
        },
    ],
    "src/data/research/us-federal-policy.json": [
        {
            "id": "uscensus-population-estimates",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2026-12-01", "to": "2026-12-31", "precision": "month", "covers": "Vintage 2026 national/state estimates"},
                    {"from": "2027-03-01", "to": "2027-03-31", "precision": "month", "covers": "Vintage 2026 county/metro estimates"},
                    {"from": "2027-04-01", "to": "2027-04-30", "precision": "month", "covers": "Vintage 2026 national by age/sex"},
                    {"from": "2027-05-01", "to": "2027-05-31", "precision": "month", "covers": "Vintage 2026 city/town + housing units"},
                    {"from": "2027-06-01", "to": "2027-06-30", "precision": "month", "covers": "Vintage 2026 age/sex/race/Hispanic-origin detail"},
                ],
                "source_url": "https://www.census.gov/programs-surveys/popest/about/schedule.html",
                "note": "Stated target is 'December' for the first release, but the Vintage 2025 national release actually slipped to Jan 27, 2026 — treat month-level dates as plan, not guarantee.",
            },
        },
    ],
    "src/data/research/associated-states-government-finance.json": [
        {
            "id": "uscensus-acs",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2026-01-29", "to": "2026-01-29", "precision": "day", "covers": "2020-2024 5-year estimates"},
                    {"from": "2026-03-05", "to": "2026-03-05", "precision": "day", "covers": "2020-2024 5-year PUMS"},
                ],
                "source_url": "https://www.census.gov/programs-surveys/acs/news/data-releases.html",
                "note": "2025 1-year estimate date undetermined as of this audit (2026-08-11) — Census is assessing a new disclosure-avoidance policy that already delayed the 5-year products ~7 weeks past their historical December pattern. Entries above are the last confirmed release, not a forward projection; worth re-checking before the next window.",
            },
        },
        {
            "id": "gasb-standards",
            "release_schedule": {
                "kind": "irregular",
                "entries": [],
                "source_url": "https://www.gasb.org/",
                "note": "Rolling technical agenda, no fixed calendar. Effective-date lag after issuance of a standard ranges from about 8 months to over 4 years depending on the standard.",
            },
        },
    ],
    "src/data/research/international-frameworks.json": [
        {
            "id": "naics",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2027-01-01", "to": "2027-01-01", "precision": "day", "covers": "NAICS 2027"},
                ],
                "source_url": "https://www.census.gov/naics/",
                "note": "Still formally 'proposed' pending close of public comment as of the check date (Federal Register notice 2026-14086, published 2026-07-13 — exact document URL not resolved, worth a follow-up fetch). Standing rule is a 5-year review cycle.",
            },
        },
        {
            "id": "ipsas",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2025-12-01", "to": "2025-12-31", "precision": "month", "covers": "IPSAS SRS 1 Climate Disclosures Phase 1 — approved"},
                    {"from": "2025-09-01", "to": "2025-09-30", "precision": "month", "covers": "Definition of Material amendments"},
                    {"from": "2026-03-01", "to": "2026-03-31", "precision": "month", "covers": "Making Materiality Judgements"},
                    {"from": "2026-07-01", "to": "2026-12-31", "precision": "half", "covers": "Climate Disclosures Phase 2 — target"},
                    {"from": "2026-09-01", "to": "2026-09-30", "precision": "month", "covers": "Measurement — Application Phase"},
                    {"from": "2028-12-01", "to": "2028-12-31", "precision": "month", "covers": "Presentation of Financial Statements — final"},
                ],
                "source_url": "https://www.ipsasb.org/consultations-projects/work-plan",
                "note": "10-entry dated project milestone list found; trimmed to 6 here for space (2 already past as of this audit, kept for context). Targets shift at each quarterly Board meeting — worth re-checking before relying on the later dates.",
            },
        },
    ],
    "src/data/research/edp-inventory-regulation-479-2009.json": [
        {
            "id": "eu-reg-479-2009",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2026-04-22", "to": "2026-04-22", "precision": "day", "covers": "2026 1st EDP notification (spring)"},
                    {"from": "2026-10-21", "to": "2026-10-21", "precision": "day", "covers": "2026 2nd EDP notification (autumn)"},
                ],
                "source_url": "https://ec.europa.eu/eurostat/cache/metadata/en/gov_10dd_esms.htm",
                "note": "April notification is provisional, October carries the revised annual figures. The underlying legal deadline (Reg. 479/2009 Art. 3(1)) is fixed at before 1 April and 1 October each year, so future cycles can be projected from that even without the exact transmission date.",
            },
        },
    ],
    "src/data/research/esa-2010.json": [
        {
            "id": "esa-2010",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2030-01-01", "to": "2030-12-31", "precision": "year", "covers": "ESA 2030 (successor revision)"},
                ],
                "source_url": "https://ec.europa.eu/eurostat/web/esa-2010/towards-esa-2030",
                "note": "2030 is Eurostat's stated aim, not a locked legal date — the ESA 2030 proposal is still in consultation.",
            },
        },
    ],
    "src/data/research/international-standards.json": [
        {
            "id": "sna-2008",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2025-03-04", "to": "2025-03-07", "precision": "week", "covers": "2025 SNA adoption, UNSC 56th Session"},
                    {"from": "2029-01-01", "to": "2030-12-31", "precision": "year", "covers": "Target country implementation window"},
                ],
                "source_url": "https://unstats.un.org/unsd/nationalaccount/sna2025.asp",
                "note": "FLAG: the UN Statistical Commission adopted the 2025 SNA at its 56th Session (March 2025) as SNA 2008's successor — SNA 2008 is now the superseded standard, independently re-confirmed against unstats.un.org. Country-level rollout targets 2029-2030 per the UN's own implementation strategy, so nothing downstream is factually wrong yet, but this node's framing (and whether a separate sna-2025 node should exist) needs Thomas's decision — not changed here beyond adding this schedule.",
            },
        },
    ],
    "src/data/research/grande-prairie.json": [
        {
            "id": "psab-psas",
            "release_schedule": {
                "kind": "published-calendar",
                "entries": [
                    {"from": "2026-04-01", "to": "2026-04-01", "precision": "day", "covers": "PS 3160/PSG-8 effective date"},
                    {"from": "2029-04-01", "to": "2029-04-01", "precision": "day", "covers": "PS 3251 Employee Benefits effective date"},
                ],
                "source_url": "https://www.frascanada.ca/en/public-sector/effective-dates",
                "note": "Rolling agenda, but once a standard is finalized PSAB publishes a real mandatory effective date. The 2026-04-01 entry has already passed as of this audit; kept for context alongside the 2029 date.",
            },
        },
    ],
    "src/data/research/us-texas-houston.json": [
        {
            "id": "hcad-appraisal-roll",
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "The chief appraiser shall prepare and certify to the assessor for each taxing unit ... that part of the appraisal roll for the district that lists the property taxable by the unit, by July 25 (Tex. Tax Code §26.01(a)).",
                "entries": [
                    {"from": "2027-07-25", "to": "2027-07-25", "precision": "day", "evidence": "implied", "covers": "2027 certified roll"},
                ],
                "source_url": "https://statutes.capitol.texas.gov/Docs/TX/htm/TX.26.htm",
                "note": "2026-07-25 has already passed as of this audit (2026-08-11). Harris Central actually certified on 16 August in 2024, so the statutory date is a floor rather than a guarantee — see the reference_period note on the outbound dependency edges.",
            },
        },
    ],
    "src/data/research/us-county-tier.json": [
        {
            "id": "harris-county-jurisdiction-tax-rates",
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "Rate adopted by the later of September 30 or 60 days after the taxing unit receives the certified appraisal roll (Tex. Tax Code §26.05(a)).",
                "entries": [
                    {"from": "2026-09-30", "to": "2026-09-30", "precision": "day", "evidence": "implied", "covers": "2026 tax rate adoption"},
                ],
                "source_url": "https://statutes.capitol.texas.gov/Docs/TX/htm/TX.26.htm",
                "note": "Candidate edge, not yet added: this report depends on hcad-appraisal-roll's certification date by statute (§26.05(a) ties the rate-adoption deadline to when the certified roll is received) — needs a proper basis before becoming a real edge.",
            },
        },
    ],
    "src/data/research/nz-government-finance.json": [
        {
            "id": "nz-la-annual-reports",
            "url_fix": "https://www.legislation.govt.nz/act/public/2002/0084/latest/DLM172354.html",
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "Annual report adopted within 4 months of the end of the financial year (Local Government Act 2002 s.98(3)); financial year ends 30 June.",
                "entries": [
                    {"from": "2026-10-31", "to": "2026-10-31", "precision": "day", "evidence": "implied", "covers": "FY2025-26 annual report"},
                ],
                "source_url": "https://www.legislation.govt.nz/act/public/2002/0084/latest/DLM172354.html",
                "note": "This report's own url field pointed to DLM172329 (a section about combining consultations), not the deadline provision — corrected to DLM172354 (s.98) as part of this audit.",
            },
        },
    ],
    "src/data/research/us-statistical-inputs.json": [
        {
            "id": "uscensus-decennial",
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "Apportionment counts transmitted to the President within 9 months of the census date (13 U.S.C. §141(b)); the census date is April 1 of each decennial year.",
                "entries": [
                    {"from": "2030-12-31", "to": "2030-12-31", "precision": "day", "evidence": "implied", "covers": "2030 census apportionment counts"},
                ],
                "source_url": "https://www.law.cornell.edu/uscode/text/13/141",
                "note": "The 2020 count actually slipped to April 2021 due to COVID-19 — treat the Dec 31 statutory deadline as a target, not a guarantee.",
            },
        },
    ],
    "src/data/research/provincial-social-programs.json": [
        {
            "id": "ab-tbf-alberta-escalator",
            "release_schedule": {
                "kind": "stated-rule",
                "rule": "If no percentage is prescribed by regulation by January 1, a CPI-derived formula (capped at 2%) applies automatically.",
                "entries": [
                    {"from": "2027-01-01", "to": "2027-01-01", "precision": "day", "evidence": "implied", "covers": "2027 escalator determination"},
                ],
                "source_url": "https://kings-printer.alberta.ca",
                "note": "A 2026 amendment to this section exists but is not yet in force as of this audit — worth rechecking before relying on this rule going forward.",
            },
        },
    ],
    "src/data/research/alberta-municipal.json": [
        {
            "id": "ab-education-property-tax-requisition",
            "release_schedule": {
                "kind": "observed-pattern",
                "entries": [
                    {"from": "2022-02-24", "to": "2022-02-24", "precision": "day", "evidence": "implied", "covers": "2022 edition"},
                    {"from": "2023-02-28", "to": "2023-02-28", "precision": "day", "evidence": "implied", "covers": "2023 edition"},
                    {"from": "2024-02-29", "to": "2024-02-29", "precision": "day", "evidence": "implied", "covers": "2024 edition"},
                    {"from": "2025-02-27", "to": "2025-02-27", "precision": "day", "evidence": "implied", "covers": "2025 edition"},
                    {"from": "2026-02-26", "to": "2026-02-26", "precision": "day", "evidence": "implied", "covers": "2026 edition"},
                ],
                "source_url": "https://open.alberta.ca/publications/education-property-tax-requisition-comparison-report",
                "note": "Late-February window, 5 years running. Candidate edge, not yet added: this report methodologically depends on Alberta's 'equalized assessment' dataset, a separate Municipal Affairs publication — needs a proper basis before becoming a real edge.",
            },
        },
    ],
    "src/data/research/ess-quality-framework.json": [
        {
            "id": "eu-statistics-code-of-practice",
            "release_schedule": {
                "kind": "irregular",
                "entries": [],
                "note": "No fixed periodicity found. Eurostat's director publicly flagged (Nov 2025) that a revision is 'urgently' being prepared, but no date has been set.",
            },
        },
    ],
    "src/data/research/za-fiscal-federalism.json": [
        {
            "id": "un-coicop-2018",
            "release_schedule": {
                "kind": "irregular",
                "entries": [],
                "note": "Next revision is contingent on the outcome of the separate COFOG revision process (targeted 2028) rather than its own independent schedule.",
            },
        },
        {
            "id": "imf-sdds",
            "url_fix": "https://dsbb.imf.org/sdds/overview",
            "release_schedule": {
                "kind": "irregular",
                "entries": [],
                "source_url": "https://dsbb.imf.org/sdds/overview",
                "note": "Framework reviewed 'at intervals determined by the Executive Board' — no fixed periodicity. Last review concluded 2022-03-16 per the IMF's own site. This report's own url field previously pointed to a Statistics South Africa PDF with no connection to the IMF — corrected here to the DSBB SDDS overview page. (Note: the za-statssa-cpi -> imf-sdds edge's evidence_url, the same statssa PDF, is left as-is — that citation is correct evidence for that specific edge's claim.)",
            },
        },
    ],
    "src/data/research/ke-social-protection.json": [
        {
            "id": "imf-e-gdds",
            "url_fix": "https://dsbb.imf.org/e-gdds/overview",
            "release_schedule": {
                "kind": "irregular",
                "entries": [],
                "source_url": "https://dsbb.imf.org/e-gdds/overview",
                "note": "Standing reporting framework, not a periodic release — no schedule to state. This report's own url field previously pointed to a Kenya-specific DQAF sub-page — corrected here to the e-GDDS framework overview page. (Note: the ke-knbs-cpi -> imf-e-gdds edge's evidence_url, the same Kenya-specific page, is left as-is — that citation is correct evidence for that specific edge's claim.)",
            },
        },
    ],
}

def insert_after(d, after_key, new_key, new_val):
    """Rebuild dict with new_key inserted right after after_key (or at end if not found)."""
    out = collections.OrderedDict()
    inserted = False
    for k, v in d.items():
        out[k] = v
        if k == after_key:
            out[new_key] = new_val
            inserted = True
    if not inserted:
        out[new_key] = new_val
    return out

report_summary = []

for relpath, edits in EDITS.items():
    with open(relpath, "r", encoding="utf-8") as f:
        raw = f.read()
    ends_nl = raw.endswith("\n")
    data = json.loads(raw)
    reports = data.get("reports", [])
    for edit in edits:
        wanted_id = edit["id"]
        found = False
        for i, r in enumerate(reports):
            if r.get("id") == wanted_id:
                found = True
                anchor = "cadence_note" if "cadence_note" in r else "releases_per_year"
                if "releases_per_year" in edit:
                    r["releases_per_year"] = edit["releases_per_year"]
                if "url_fix" in r or "url_fix" in edit:
                    pass
                if "url_fix" in edit:
                    r["url"] = edit["url_fix"]
                r2 = insert_after(r, anchor, "release_schedule", edit["release_schedule"])
                reports[i] = r2
                report_summary.append((relpath, wanted_id, "OK"))
        if not found:
            report_summary.append((relpath, wanted_id, "NOT FOUND"))
    data["reports"] = reports
    with open(relpath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        if ends_nl:
            f.write("\n")

for row in report_summary:
    print(row)
