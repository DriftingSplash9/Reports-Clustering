# Prompt for Grok — new country research: Central Asia, the Caucasus, and Mongolia

No attachments needed — every one of these countries has **zero nodes** in our corpus today. This is from-scratch research.

Paste everything below the line.

---

Nine countries with zero corpus presence, spanning two very different regional-integration contexts: the EAEU (Eurasian Economic Union — Kazakhstan, Kyrgyzstan, Armenia are members) and the EU-oriented reformers (Georgia has a DCFTA/Association Agreement with real statistical harmonisation commitments worth checking).

For each country, we're looking for: the national statistics office itself (as its own institutional node), its flagship national-accounts and CPI releases, and — most valuable of all — which international standard or framework it names as governing its methodology (an SNA edition, a COICOP version, BPM6 for balance of payments) and which IMF data-dissemination tier it participates in (e-GDDS / SDDS / SDDS Plus). A country's own DSBB metadata page on the IMF site is usually the single best source for the standards question.

- **Kazakhstan** (`KZ`) — Bureau of National Statistics (under the Agency for Strategic Planning and Reforms) — verify current agency name, it has been restructured before. Check EAEU statistical harmonisation commitments as a possible `cites` edge.
- **Uzbekistan** (`UZ`) — State Statistics Committee (stat.uz) — has been actively moving toward IMF SDDS in recent years; check current tier.
- **Kyrgyzstan** (`KG`) — National Statistical Committee — EAEU member, check harmonisation commitments.
- **Tajikistan** (`TJ`) — Agency on Statistics under the President of Tajikistan.
- **Turkmenistan** (`TM`) — State Statistics Committee — expect this one to come back thin or empty; Turkmenistan publishes very little verifiable official statistics. A null result here is expected, not a failure.
- **Mongolia** (`MN`) — National Statistics Office of Mongolia (NSO) — has been an SDDS subscriber; verify current status and which SNA/COICOP edition it names.
- **Georgia** (`GE`) — National Statistics Office of Georgia (Geostat) — check its EU Association Agreement/DCFTA statistical-harmonisation obligations specifically, this is likely the strongest, most citable edge in this whole batch.
- **Armenia** (`AM`) — Statistical Committee of the Republic of Armenia (ArmStat) — EAEU member, check harmonisation commitments alongside any EU-partnership statistics cooperation.
- **Azerbaijan** (`AZ`) — State Statistical Committee (stat.gov.az).


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
