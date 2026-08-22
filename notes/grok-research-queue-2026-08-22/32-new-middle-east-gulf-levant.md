# Prompt for Grok — new country research: Gulf and Levant states

No attachments needed — every one of these countries has **zero nodes** in our corpus today. This is from-scratch research.

Paste everything below the line.

---

Six countries. The GCC states (Kuwait, Qatar, Oman, Bahrain) have real, well-resourced statistics authorities and GCC-Stat regional harmonisation is a genuine, checkable institutional relationship (already referenced for Yemen in our cross-border research — reuse that context rather than re-deriving it). Jordan and Lebanon are non-GCC and each has its own IMF program history worth checking.

For each country, we're looking for: the national statistics office itself (as its own institutional node), its flagship national-accounts and CPI releases, and — most valuable of all — which international standard or framework it names as governing its methodology (an SNA edition, a COICOP version, BPM6 for balance of payments) and which IMF data-dissemination tier it participates in (e-GDDS / SDDS / SDDS Plus). A country's own DSBB metadata page on the IMF site is usually the single best source for the standards question.

- **Jordan** (`JO`) — Department of Statistics (DOS) — has ongoing IMF EFF program engagement; check its Article IV statistical annex for SNA/COICOP/e-GDDS-SDDS status.
- **Lebanon** (`LB`) — Central Administration of Statistics (CAS) — Lebanon's statistical system has been under real strain since the 2019-20 crisis; check whether CAS still publishes current national accounts and what edition it names, or whether this comes back mostly null.
- **Kuwait** (`KW`) — Central Statistical Bureau (part of the Public Authority for Civil Information, or verify current structure) — check GCC-Stat membership as a `cites` edge and SNA/COICOP status.
- **Qatar** (`QA`) — Planning and Statistics Authority (PSA) — well-resourced, likely SDDS or SDDS Plus; check current tier.
- **Oman** (`OM`) — National Centre for Statistics and Information (NCSI).
- **Bahrain** (`BH`) — Information & eGovernment Authority (iGA) statistics sector, or its successor — verify current institutional name.

**GCC-Stat** (the GCC Statistical Centre) is the regional body relevant to Kuwait, Qatar, Oman, and Bahrain — propose it as one new international node if it isn't already findable in our corpus, then reuse it as the target for all four countries' membership edges, rather than describing GCC-Stat four separate times.

**Existing international/standard ids already in our corpus — reuse these as targets rather than proposing duplicates:** `sna-2008`, `sna-1993`, `sna-1968`, `imf-bpm6`, `imf-e-gdds`, `imf-sdds`, `imf-sdds-plus`, `un-coicop-2018`, `imf-dqaf`, `imf-weo`, `ipsas`, `sdmx-standard`, `cpi-manual`, `asean-acss` (ASEAN), `apec-stats` (APEC), `comesa-stats` (COMESA) — plus whatever regional body is named per-country below. Propose a new international node only for a body genuinely not on this list.

**Relationship types — closed set of exactly four values, nothing else is legal:**

- `methodology_depends_on` — an international standard/classification/framework governs how the report is compiled (SNA edition, COICOP, BPM6, an IMF data-standard tier).
- `uses_data_from` — the target's figures are a direct input to the source.
- `calculated_from` — the source is mechanically derived from the target.
- `cites` — referenced as context, including institutional/treaty membership.

Do not invent any other value.

**Honesty permission, as always: an explicit "nothing solid found" for a country or a specific claim is a correct and useful answer** — we'd much rather have three well-sourced countries than nine shaky ones. Primary documents only: the national statistics office's own site/publications, an IMF Article IV or DSBB/e-GDDS metadata page, a regional body's own treaty or membership record. No third-party scorecards (ODIN, etc.) as citations.

## How to reply

One JSON object: `proposed_reports` — one entry per report/institution you find, `{ proposed_id, kind (domestic/international), title, publisher, country (ISO-3166 alpha-2), region, url, description, publication_cadence }`; `dependencies` — any edge you can support with a primary source and a quote naming the country/agency, `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` (use the `proposed_id` values you just defined, or the existing international ids above). Start by confirming which countries you found real, current, citable material for and which came back thin or nothing. We raw-verify every quote before anything is minted, same as always.
