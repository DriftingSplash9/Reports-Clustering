# Prompt for Grok — new country research: Central America

No attachments needed — every one of these countries has **zero nodes** in our corpus today. This is from-scratch research.

Paste everything below the line.

---

Six countries, none currently in our corpus. The Central American Integration System (SICA) runs a real regional statistical harmonisation effort (SECOSAAA/SIECA-linked economic integration) worth checking as a cites-type target common to several of these.

For each country, we're looking for: the national statistics office itself (as its own institutional node), its flagship national-accounts and CPI releases, and — most valuable of all — which international standard or framework it names as governing its methodology (an SNA edition, a COICOP version, BPM6 for balance of payments) and which IMF data-dissemination tier it participates in (e-GDDS / SDDS / SDDS Plus). A country's own DSBB metadata page on the IMF site is usually the single best source for the standards question.

- **Guatemala** (`GT`) — Instituto Nacional de Estadística (INE).
- **Honduras** (`HN`) — Instituto Nacional de Estadística (INE).
- **Nicaragua** (`NI`) — Instituto Nacional de Información de Desarrollo (INIDE) — Nicaragua's IMF relationship and data disclosure has been limited in recent years; check current e-GDDS/SDDS status rather than assuming continuity.
- **Costa Rica** (`CR`) — Instituto Nacional de Estadística y Censos (INEC) — Costa Rica is an OECD member (acceded 2021), which may mean OECD statistical-standard commitments worth checking alongside SNA/COICOP.
- **Panama** (`PA`) — Instituto Nacional de Estadística y Censo (INEC), under the Contraloría General de la República.
- **Belize** (`BZ`) — Statistical Institute of Belize (SIB).

Propose SICA as one new international node (if not already in our corpus) if you find a real, citable statistical-harmonisation commitment for at least two of these countries, rather than treating it as a given.

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
