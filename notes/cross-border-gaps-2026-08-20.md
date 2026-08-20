# Zero cross-border dependency edges — 19 countries, 2026-08-20

Found while verifying the new Isolate feature: selecting Israel's country orb
with Isolate on shows Israel alone — 0 other nodes. This is not a bug in
Isolate, in the focus/trace walk, or in the disclosure/folding logic. It is a
real property of the corpus, confirmed by direct query against the live data
(not the UI):

- All 29 of Israel's reports are `jurisdiction_level: federal`.
- All 26 dependency edges touching any Israel report have **both** endpoints
  inside Israel. Zero touch a non-Israel report.

The same check run across every country with 5+ reports found 18 more in the
same state — 19 total, each with zero recorded dependency edges to or from
anything outside itself:

| country | reports |
|---|---|
| Indonesia (ID) | 118 |
| Taiwan (TW) | 108 |
| Philippines (PH) | 68 |
| Japan (JP) | 63 |
| South Korea (KR) | 52 |
| Vietnam (VN) | 48 |
| Singapore (SG) | 37 |
| Iran (IR) | 34 |
| Israel (IL) | 29 |
| Thailand (TH) | 25 |
| Iraq (IQ) | 21 |
| Myanmar (MM) | 16 |
| Saudi Arabia (SA) | 16 |
| Afghanistan (AF) | 14 |
| Yemen (YE) | 14 |
| Syria (SY) | 12 |
| Sudan (SD) | 8 |
| Mauritius (MU) | 7 |
| Sierra Leone (SL) | 5 |

Most of these are from the recent Grok-archive mint (139-country expansion) —
that pass recorded each country's own domestic dependency structure but not
its international ties, even where those obviously exist (Israel's MERCOSUR
trade agreement, IMF/World Bank programme ties for the others, ASEAN links
for the Southeast Asian group, and so on).

## What this is not

Per the standing rule — no document backing an edge, no edge — nothing here
gets a fabricated dependency to "fix" the isolate view. An empty isolate
result for these countries is the correct, honest output of the current data.

## What this is

A research queue item. Each of these 19 countries almost certainly has real,
citable international dependencies (trade agreements, treaty ratifications,
IMF/World Bank reporting obligations, regional-bloc statistical standards)
that a future sourcing pass should add as proper `Dependency` records with
real `evidence_url`s — the same way the rest of the corpus was built, not
as a batch of asserted-but-unsourced edges.

Until that pass happens, Isolate will correctly show "just this one country"
for any of these 19, and cross-border geoAffinity/galaxy clustering forces
will have nothing to pull them toward anyone else.
