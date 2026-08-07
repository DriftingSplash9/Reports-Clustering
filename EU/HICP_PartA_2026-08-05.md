# Harmonised Index of Consumer Prices (HICP) — Part A extraction record

**Follow-up to `G.32.md` finding 1** (Annex XI to the Staff Regulations names
HICP directly as the Belgian component of the "Joint Index" behind EU staff
salary updates — `EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`, record
AXI-02). This record establishes HICP's own node conditions from Eurostat's
own authoritative source.

**Source.** `https://ec.europa.eu/eurostat/cache/metadata/en/prc_hicp_esms.htm`
— Eurostat's own metadata page for the HICP, fetched and read via the
browser this session. Same evidence class as the "Farm structure (ef)" page
used for `eurostat-farm-structure-survey.json`.

---

## Part A record

### HICP-01 — named, monthly, and legally founded

```
URL:       https://ec.europa.eu/eurostat/cache/metadata/en/prc_hicp_esms.htm
LOCATION:  "Data description" and "Frequency of dissemination" sections
QUOTE:     "The Harmonised Index of Consumer Prices (HICP) gives comparable
           measures of inflation for the countries and country groups for
           which it is produced. It is a macroeconomic indicator that
           measures the change over time of the prices of consumer goods
           and services acquired by households. [...] it is a set of
           consumer price indices (CPIs) calculated according to a
           harmonised approach and definitions as laid down in Regulations
           and Recommendations. In addition, the HICP provides the official
           measure of consumer price inflation in the euro area [for]
           monetary policy purpose[s]."
           "The data are disseminated monthly, around the middle of the
           month that follows the reference month. The flash estimate for
           the euro area and selected components are usually disseminated
           on the last working day of the reference month or shortly
           thereafter."
           "Definitions and classifications have been harmonised in a
           series of legal acts. [...] according to Article 4 of
           Regulation 2016/792 of the European Parliament and the
           Council."
NAMES:     Harmonised Index of Consumer Prices (HICP)
           Regulation (EU) 2016/792
TENSE:     PRESENT
NOTES:     Clears all three of `Research.1.md` §4's node conditions cleanly
           — named, monthly cadence stated explicitly, titled — and is
           published on a materially faster cadence than every other EU
           node in the corpus (`eurostat-farm-structure-survey` at ~0.33/yr,
           `esa-2010` at 0.05/yr). Proposed id: `eurostat-hicp`. **Not
           country-specific in this record** — Annex XI's own text cites
           "the Harmonised Indices of Consumer Prices (HICP) in the case of
           Belgium," i.e. Belgium's national component of the EU-wide
           harmonised measure, which this page describes as a single
           methodology producing per-country and aggregate series. Modelled
           here as the one Eurostat-published series (matching how
           `bls-cpi`/`statcan-cpi` are each modelled as one national
           release rather than split by region), with the Belgium-specific
           reading noted for whoever drafts the edge.
```

## What this does not do

- **It does not mint the edge itself.** Annex XI's Joint Index mechanism —
  the actual dependent — is not currently modelled as a node (Annex XI is a
  legal instrument, not a recurring publication in the corpus's sense; the
  annual Commission report that applies it, e.g. `COM(2025) 736`, carries a
  document number that changes every year and has not been modelled as a
  series node the way `eu-draft-budget` was). The dependency is recorded in
  `eurostat-hicp.json`'s own `_dropped` block as `no-node-yet` rather than
  invented.
- **It does not establish Luxembourg's own national CPI as a node** —
  STATEC (Luxembourg's statistical institute) was not reached this session;
  time-boxed in favour of writing up what was already confirmed and handing
  off cleanly.
