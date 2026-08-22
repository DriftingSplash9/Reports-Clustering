# Prompt for Grok — cross-border dependencies, round 3

Paste everything below the line. Attach these files (all under
`src/data/research/`): `crossborder-standards-2026-08-22.json` (what we
minted from your rounds 1–2, so you can see what already exists),
`af-sudan.json`, `af-mauritius.json`, `af-sierra-leone.json`,
`af-afghanistan-grok-2026-08.json`, `ye-yemen-grok-2026-08.json`,
`sy-syria-grok-2026-08.json`, `iq-iraq-grok-2026-08.json`,
`ir-iran-grok-2026-08.json`.

---

Round 2 was excellent — we raw-verified every citation you gave across both
rounds and 59 of 62 checked out, most word-for-word, with zero fabricated
documents. All four round-1 problems you were asked to fix, you fixed. That
work is now minted into the live graph.

Two mechanical problems did surface at merge time, so this round has two
hard format rules before the actual asks:

**Rule A — use only these source ids.** Round 2's source ids were all
invented (`SD-CBS`, `MU-Statistics-Mauritius`, …) and none existed in our
corpus. Every `source_report_id` this round must come from the lists below
(these are the real ids, including the institutional nodes we minted from
your research). If a dependency genuinely belongs to a report we don't have,
do NOT invent an id — instead describe it as a proposed new domestic node
(title, publisher, exact URL, description, publication cadence) and we'll
mint it properly.

- Sudan: `sd-cbs`, `sd-cbs-cpi`, `sd-cbos-statistical-review-q4-2024`, `sd-mofep-budget-2026`
- Sierra Leone: `sl-statssl`, `sl-statssl-cpi`
- Iraq: `iq-cso`, `iq-national-accounts`, `iq-cpi`, `iq-bop`
- Iran: `ir-sci`, `ir-cbi`, `ir-national-accounts`, `ir-cpi`, `ir-bop`
- Afghanistan: `af-nsia`, `af-dab`, `af-national-accounts`, `af-cpi`, `af-bop`
- Yemen: `ye-cso`, `ye-national-accounts`, `ye-cpi`, `ye-bop`
- Syria: `sy-cbs`, `sy-national-accounts`, `sy-cpi`, `sy-bop`
- Mauritius: `mu-statsmauritius`, `mu-statsmauritius-cpi`

**Rule B — relationship_type is a closed set of exactly four values.** Our
schema rejects anything else (round 2's `participates_in`,
`disseminated_under`, `member_of` etc. all had to be remapped by hand). Use
only:

- `methodology_depends_on` — an international standard or framework governs
  how the report is compiled or disseminated (SNA edition, COICOP, BPM6,
  SDDS/e-GDDS requirements). This will be most of them.
- `uses_data_from` — the target's figures are a direct input to the source.
- `calculated_from` — the source is mechanically derived from the target.
- `cites` — referenced as context, including institutional membership in a
  regional statistical body.

For targets, reuse these existing international ids where they fit —
`imf-sdds`, `imf-sdds-plus`, `imf-e-gdds`, `sna-2008`, `asean-acss`,
`apec-stats` — and propose a new international node (full details, as in
Rule A) only for a body we don't have.

## The asks

### 1. Mauritius — the SNA 2008 edge, done properly

Your round-2 source for "Mauritius compiles national accounts per 2008 SNA
since June 2016" was a UN compendium PDF with the relevant passage around
page 826 — real document, but effectively unverifiable (nothing retrieves
that deep into an 800-page file). Two things:

- Find a **primary, directly checkable source** for the same claim —
  ideally Statistics Mauritius's own national-accounts methodology page,
  release, or annual publication stating the SNA edition it follows (with
  the 2016 changeover if it says so). A specific page of a normal-sized PDF
  is fine if you give the page number.
- Separately: does Statistics Mauritius publish a **distinct national
  accounts release** (annual/quarterly GDP publication)? We have no
  Mauritius national-accounts report in the corpus, which is why this edge
  had nowhere to attach. If one exists, give us its exact title, URL, and
  publication frequency as a proposed new domestic node.

### 2. Afghanistan — corroborating the 2006 GDDS context (nice-to-have)

Your round-2 quote from IMF Country Report 06/251 ("…STA has indicated…
Afghanistan will imminently become a participant in the General Data
Dissemination Standards…") is plausible but we could not retrieve the
Executive Director's statement text to confirm it. Either point us at a
retrievable copy with a page number, or find any other primary 2006-era IMF
or Afghan-government document that describes Afghanistan's GDDS entry
(metadata posted 22 June 2006). Not urgent — the edge already stands on the
DSBB table row — but a confirmed second source would be welcome.

### 3. The main event — substantive edges for seven thin countries

Sudan, Sierra Leone, Iraq, Iran, Afghanistan, Yemen, and Syria each now
have exactly one cross-border edge: their dated e-GDDS row. That's honest
but thin. For each, look for real, citable international dependencies of
the kinds below — anything you can support with a primary document and a
quote that names the country or its agency:

- **Methodology standards actually named by the agency**: which SNA edition
  the national accounts follow; which COICOP version the CPI basket uses;
  whether the BOP follows BPM6/BPM5 — from the agency's own methodology
  notes, yearbook prefaces, or IMF Article IV statistical annexes (the
  statistical-issues annex of a recent Article IV is often the richest
  single source and is primary for this purpose).
- **Regional statistical bodies with real membership documents**: AITRS
  (the Arab Institute for Training and Research in Statistics) for the
  Arab countries; GCC-Stat where relevant to Yemen; the Arab Monetary
  Fund's ArabStat initiative; COMESA statistics for Sudan; ECOWAS/SSDS
  statistical frameworks for Sierra Leone; the African Union's SHaSA / STC
  statistics structures. Only with a document that names the country —
  a member roster, an accession/adoption record, a signed code of practice.
- **International data programmes the agency demonstrably feeds**: ICP
  (International Comparison Program) participation rounds, UNSD
  questionnaires the country answers (as with your good Mauritius UN
  national-accounts find), World Bank/IMF technical-assistance reports
  with named statistical outputs.

Rules, same as ever, plus what we learned verifying you: primary documents
only (no ODIN or other third-party scorecards); one quote per edge, naming
the country or agency, actually stating the specific claim the edge makes —
we open every URL and check every quote before anything is minted; a dated,
now-lapsed obligation is fine if you say it's lapsed; and an explicit
"nothing solid found for X" is a correct and useful answer — several of
yours have been.

## How to reply

One JSON object, same shape as round 2: `dependencies_by_country` keyed by
ISO code, each edge with `source_report_id` (Rule A ids only),
`target_report_id` (existing international ids above, or a proposed node),
`relationship_type` (Rule B values only), `basis`, `evidence_url`,
`evidence_quote`. Proposed new nodes (domestic or international) go in a
separate `proposed_reports` array with full details. Start the reply by
confirming, per country, which attached files you actually received.
