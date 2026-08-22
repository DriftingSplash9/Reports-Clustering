# Prompt for Grok — new country research: Caribbean

No attachments needed — every one of these countries has **zero nodes** in our corpus today. This is from-scratch research.

Paste everything below the line.

---

Seven larger/mid-size Caribbean states plus the six OECS microstates, bundled together since the microstates individually will likely yield very little. CARICOM (already referenced via Guyana's `gy-caricom` node) is the obvious regional target for most of these — reuse it rather than re-proposing it.

For each country, we're looking for: the national statistics office itself (as its own institutional node), its flagship national-accounts and CPI releases, and — most valuable of all — which international standard or framework it names as governing its methodology (an SNA edition, a COICOP version, BPM6 for balance of payments) and which IMF data-dissemination tier it participates in (e-GDDS / SDDS / SDDS Plus). A country's own DSBB metadata page on the IMF site is usually the single best source for the standards question.

- **Cuba** (`CU`) — Oficina Nacional de Estadística e Información (ONEI) — Cuba's relationship with the IMF is unusual (not a full participant in Fund statistical programs in the normal way); check what actually exists rather than assuming e-GDDS/SDDS participation.
- **Dominican Republic** (`DO`) — Oficina Nacional de Estadística (ONE).
- **Haiti** (`HT`) — Institut Haïtien de Statistique et d'Informatique (IHSI) — Haiti's statistical system has been under real strain; a thin or partly-null result is expected and fine.
- **Jamaica** (`JM`) — Statistical Institute of Jamaica (STATIN) — has ongoing IMF program engagement worth checking.
- **Trinidad and Tobago** (`TT`) — Central Statistical Office (CSO).
- **Bahamas** (`BS`) — Department of Statistics.
- **Barbados** (`BB`) — Barbados Statistical Service — Barbados has had recent IMF EFF/RSF program engagement worth checking.

**OECS microstates** — Grenada, Saint Lucia, Saint Kitts and Nevis, Saint Vincent and the Grenadines, Dominica, Antigua and Barbuda — are lower priority; if time allows, a single combined note on whether any of them has a real, citable national-accounts/CPI methodology statement is enough. Don't spend equal effort here as on the seven larger states above. Reuse `gy-caricom` as the model for what a CARICOM membership edge should look like, and CARICOM itself as the target, for every country in this prompt that's a member.

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
