# Catalogue of ESS standards — scoping record

Date: 2026-08-08 (`G.56`)
Status: **SCOPED, NOTHING MINTED.** No corpus file was changed by this work.
Trigger: `ess-quality-framework.json` `_dropped`, reason `no-node-yet`:
"Catalogue of ESS standards as a node class ... Named, not scoped".

## How it was read

The catalogue is not published as a document or a webpage list. CROS
(`https://cros.ec.europa.eu/book-page/catalogue-ess-standards`) states only
that "The Catalogue of ESS Standards is currently hosted on ShowVoc" and
links out. ShowVoc is a JavaScript application over a SKOS dataset; its
Semantic Turkey API rejects GET on every data service (`evaluateQuery`
returns `HttpRequestMethodNotSupportedException: Request method 'GET' is not
supported`), so no plain HTTP client can read it. Read instead by running
SPARQL POSTs from inside a real browser session on
`showvoc.op.europa.eu`, project `ESTAT_Catalogue_of_ESS_Standards`.

**This is a retrieval finding worth keeping**, in the same family as
`Research.1.md` §7's EUR-Lex and "Expand all" notes: *a named EU collection
may exist only as a SKOS dataset behind a POST-only API.* Everything below
is quoted from that dataset, not from prose about it.

## The catalogue itself

`skos:ConceptScheme`, `prefLabel` "Catalogue of ESS Standards",
`notation` "ESS Standards", `identifier`
`http://data.europa.eu/9jo/statmanuals/ess_standards`, `creator` Eurostat,
`versionInfo` **2022**, `modified` **2026-01-19T14:51:11**.

`dct:description`, verbatim and in full:

> "The Catalogue of ESS Standards is a collection of normative documents
> (referred to as “standards”), established by consensus among ESS members
> and approved by the ESSC according to the procedure of ESS
> standardisation. The Standards listed in the catalogue are not legally
> binding but merely intended to provide rules, guidelines, or
> characteristics for the development, production, and dissemination of
> European Statistics for common and repeated use by several actors in the
> ESS. It is thus aimed at achieving the optimal degree of order in the
> context of the implementation of the mission of the ESS."

**The catalogue is 12 entries, and has been 12 for at least four years.**
EFGS 2022 (`EFGS-2022_Presentation_ESS-Standardisation.pdf`): "Catalogue of
ESS standards is available online. It currently contains 12 standards." The
live dataset returns exactly 12 `skos:Concept`s in August 2026. It is a
small, near-static register, not a growing series.

**Recommendation on the catalogue as a node: no.** It is a SKOS dataset in
a vocabulary register with a `versionInfo` and a `modified` timestamp — the
same publication shape that kept the ESS Quality Glossary out
(`ess-quality-framework.json`, 2026-08-08: "it stopped being a standalone
document and became a theme inside a database"). It is a *finding aid* for
nodes, not a node.

## The 12 members, and what the corpus already has

Ordered by how promising each looks. `ESSC=` is the dataset's own
`essapproval` field (date the ESS Committee approved it as a standard);
`WG=` is `wgapproval`.

**Already nodes (2 of 12):**

1. **ESS Handbook for quality and metadata reports (2021 re-edition)** —
   `ess-handbook-quality-metadata-reports`. ESSC=June 2023, WG=December
   2016. Source: `ks-gq-21-021`. (The dataset spells the edition "2021
   re-edition", which sides with the cover against the foreword in the
   edition contradiction already recorded in that slice's
   `_open_questions`.)
2. **Single Integrated Metadata Structure V 2.0 (SIMS 2.0)** — `ess-sims`.
   `altLabel` "SIMS". No ESSC/WG date recorded; `dateAccepted` 11/2015,
   `issued` 21/10/2015.

**Candidates, not yet looked at (8 of 12):**

3. **European business statistics methodological manual for business
   registers (2021 Edition)** — ESSC=June 2023, `ks-gq-20-006`. Strongest
   candidate: a Eurostat manual with an edition line, sitting directly on
   the EBS Regulation (2019/2152) thread `Research.1.md` §12 flags as
   unread.
4. **ESS guidelines on seasonal adjustment (2015 Edition)** — ESSC=November
   2014, `KS-GQ-15-001`. **The catalogue is out of date here**: Eurostat
   published *ESS Guidelines on seasonal adjustment – 2024 edition*
   (`ks-gq-24-012`, 13 June 2024, described on its own page as "revised
   guidelines"). Two dated editions confirmed at source, 2015 and 2024 —
   latest observed interval 9 years, `releases_per_year` ≈0.11 on
   `Research.1.md` §4's irregular-cadence rule. An ordinary recurring node;
   the one-off route is not needed. (A 2009 first edition is plausible from
   the "2015 Edition" wording but was **not** verified — do not assert it.)
5. **ESS guidelines on temporal disaggregation, benchmarking and
   reconciliation (2018 Edition)** — ESSC=February 2019, WG=May 2018,
   `ks-06-18-355`.
6. **Handbook on precision requirements and variance estimation for ESS
   household surveys** — ESSC=February 2017, issued 23/07/2013,
   `KS-RA-13-029`, doi:10.2785/13579. Note the six-year gap between issue
   and ESSC approval; only one edition found so far, so cadence is the open
   question.
7. **Methodology for data validation 2.0** — ESSC=February 2019, issued
   05/2018. Version-numbered (2.0), so a 1.0 exists; hosted on CIRCABC
   rather than the Eurostat publications catalogue.
8. **Generic Statistical Business Process Model (GSBPM) 5.1** —
   ESSC=June 2023, issued 01/2019. **UNECE, not Eurostat**
   (`statswiki.unece.org`). Version lineage 4.0→5.0→5.1 is a recurring
   class. `country: "INT"` if minted.
9. **International Standard Classification of Education (ISCED) 2011** —
   ESSC=May 2009, issued 2012, UNESCO UIS. `country: "INT"`. A
   classification hub, and therefore subject to §7's counter-intuitive
   rule: **do not research it by reading it.** Its edges come from the
   programmes coded to it. Same shape as `naics`/`isic`, and the corpus
   already has `isic`.
10. **Statistical Data and Metadata Exchange 2.0 (SDMX 2.0)** —
    `dateAccepted` 02/2007, issued 2005, `sdmx.org`.
11. **Statistical Data and Metadata Exchange 2.1 (SDMX 2.1)** —
    `dateAccepted` 02/2007, issued 2012, `sdmx.org`. **The catalogue lists
    the two SDMX versions as two separate standards.** SDMX 3.0 (2021) is
    not in the catalogue. Whether SDMX is one node with versions or several
    is a modelling question, not a research one; the corpus's existing
    `sdmx-glossary` is a *different document* and does not pre-empt it.

**Probably not a node (1 of 12):**

12. **Electronic Data file Administration and Management Information System
    (EDAMIS)** — ESSC=May 2006, source `webgate.ec.europa.eu/edamis4/
    dashboard`. A transmission system, not a publication. Same call as the
    ESS Metadata Handler already in `ess-quality-framework.json`'s
    `_dropped`: "A technical environment, not a publication". Closest
    terminal shape is `unpublishable`, if anything ever names it as an
    input.

## Two corrections to what the branch believed

**1. "Four already minted from that slice" overstates the overlap.**
`ess-quality-framework.json` holds six nodes; only **two** of them
(`ess-handbook-quality-metadata-reports`, `ess-sims`) are catalogue
members. The **European Statistics Code of Practice**, the **ESS Quality
Assurance Framework**, the **ESS QPI Guidelines** and the **SDMX Glossary**
are *not* in the Catalogue of ESS standards. So the EHQMR's line about
being "included in the Catalogue of ESS standards" identifies a set the
branch has barely touched — 10 of 12 unexamined, not 8 or 9.

**2. The catalogue asserts one relationship the corpus could use, and it is
not the document's own words.** `SIMS 2.0` carries
`eli:based_on http://data.europa.eu/eli/reg/2009/223/oj` — Regulation (EC)
No 223/2009, which **is already a node** (`eu-reg-223-2009`). This is the
right shape for `ess-sims -> eu-reg-223-2009`, but the statement is made by
the *catalogue's metadata*, not by SIMS about itself, and the slice already
records SIMS's own Article 12 claim as future-tense and unusable. Not
proposed. Whoever picks it up should look for a present-tense statement in
SIMS 2.0 itself or on Eurostat's live quality-reporting page, which is the
route that already worked once for this exact pair of documents.

The only other relation in the dataset is `coos:informs`, which points at
**GSBPM phases** (Design, Build, Collect, Process, Analyse, Disseminate,
Quality Management), not at documents. No edges there.

## Part B — soft connections (provisional, non-authoritative)

| id | from | to | nature | strength | evidence pointer | notes |
|---|---|---|---|---|---|---|
| B-56-1 | `ess-sims` | `eu-reg-223-2009` | possible `methodology_depends_on` | weak-to-medium | ShowVoc `ESTAT_Catalogue_of_ESS_Standards`, SIMS concept, `eli:based_on` = `http://data.europa.eu/eli/reg/2009/223/oj` | Asserted by the catalogue about SIMS, not by SIMS about itself. Do not mint on this alone. |
| B-56-2 | 8 catalogue members | — | candidate nodes | n/a | this file, items 3–11 | None researched at source yet; ESSC approval dates above come from catalogue metadata, not from the documents. |

Nothing here is an edge. Nothing here was written into `src/data/`.
