# Prompt for Grok — new country research: South Asia

No attachments needed — every one of these countries has **zero nodes** in our corpus today. This is from-scratch research.

Paste everything below the line.

---

Six countries, ranging from Pakistan and Bangladesh (both large, both with real, checkable statistical systems and IMF program history) down to the small Himalayan/island states where the yield may be thin.

For each country, we're looking for: the national statistics office itself (as its own institutional node), its flagship national-accounts and CPI releases, and — most valuable of all — which international standard or framework it names as governing its methodology (an SNA edition, a COICOP version, BPM6 for balance of payments) and which IMF data-dissemination tier it participates in (e-GDDS / SDDS / SDDS Plus). A country's own DSBB metadata page on the IMF site is usually the single best source for the standards question.

- **Pakistan** (`PK`) — Pakistan Bureau of Statistics (PBS) — has been an SDDS subscriber; verify current tier and which SNA/COICOP edition its national accounts and CPI name. Recent IMF program (EFF) Article IV statistical annexes are a strong likely source.
- **Bangladesh** (`BD`) — Bangladesh Bureau of Statistics (BBS) — check e-GDDS/SDDS status and SNA edition.
- **Sri Lanka** (`LK`) — Department of Census and Statistics (DCS) — Sri Lanka has had recent IMF program engagement (2023 EFF) with statistical-capacity components worth checking in the Article IV annex.
- **Nepal** (`NP`) — National Statistics Office (recently renamed from Central Bureau of Statistics — verify current name) — check e-GDDS participation.
- **Bhutan** (`BT`) — National Statistics Bureau — likely thin; a genuine "little found" answer is fine here.
- **Maldives** (`MV`) — National Bureau of Statistics — likely thin.


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
