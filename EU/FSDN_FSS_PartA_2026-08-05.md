# FSDN / Farm Structure Survey — Part A extraction record

**Follow-up to `G.30.md` finding 1** (record S03-12 in
`EU/SEC03_Title08_PartA_2026-08-05.md`): SEC03's EAGF operational technical
assistance item (08 02 06 03) names two statistics-funding mechanisms — the
Farm Sustainability Data Network (FSDN, formerly Farm Accountancy Data
Network) and "integrated farm statistics" — as the branch's best lead yet
for a real, named, EU-level statistical release with documented funding.
This session chased that lead with a browser.

**Source.** Four documents, all fetched and read directly in a browser this
session — `eur-lex.europa.eu` (anti-bot gated to every non-browser client in
this environment per `G.20.md` onward) loaded normally through the browser
tool, confirming the gate is specific to programmatic HTTP clients, not to
browsers generally:

1. Regulation (EU) 2018/1091 of the European Parliament and of the Council
   of 18 July 2018 on integrated farm statistics and repealing Regulations
   (EC) No 1166/2008 and (EU) No 1337/2011. `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32018R1091`
2. Council Regulation (EC) No 1217/2009 of 30 November 2009 setting up a
   network for the collection of accountancy data on the incomes and
   business operation of agricultural holdings (codified version, as
   originally adopted, before the 2023 conversion). `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009R1217`
3. Regulation (EU) 2023/2674 of the European Parliament and of the Council
   of 22 November 2023 amending Council Regulation (EC) No 1217/2009 as
   regards conversion of the Farm Accountancy Data Network into a Farm
   Sustainability Data Network. `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32023R2674`
4. Eurostat's own metadata page, "Farm structure (ef)" —
   `https://ec.europa.eu/eurostat/cache/metadata/en/ef_sims.htm`, last
   updated 27 February 2024. Reached via
   `ec.europa.eu/eurostat/web/agriculture/methodology` → "Farm structure"
   link, same evidence class as the Destatis quality reports used for the
   branch's German cross-layer edge — an official statistical agency's own
   metadata page, not a third-party summary.

No verdicts below. Where this record makes a comparative or historical
observation it is flagged as such, per `Research.1.md` §3.

---

## Part A records

### FSS-01 — the Farm Structure Survey: named, cadenced, and Eurostat's own to describe

```
URL:       https://ec.europa.eu/eurostat/cache/metadata/en/ef_sims.htm
LOCATION:  "Data description" and "Frequency of dissemination" sections
QUOTE:     "The data describe the structure of agricultural holdings
           providing the general characteristics of farms and farmers and
           information on their land, livestock and labour force. [...] The
           aggregated results are disseminated through statistical tables."
           "Frequency of dissemination — Results are disseminated 2 years
           after the reference year."
           "FSS data are available for the following years: 1989/1990, 1993,
           1995, 1997, 1999/2000, 2003, 2005, 2007, 2009/2010, 2013 and
           2016. The agricultural censuses are in line with the FAO
           recommendations and are carried out every 10 years. The
           intermediate surveys are organised 3 (until 2007) or 2 times
           (since 2010) between the censuses. [...] For 2020, 2023 and 2026,
           the reference periods are provided in Article 10 of Regulation
           (EU) 1091/2018."
NAMES:     Farm structure survey (FSS)
           Regulation (EU) 2018/1091
TENSE:     PRESENT
NOTES:     **This clears all three of `Research.1.md` §4's node conditions
           from one page.** (1) Named: "Farm structure survey", abbreviated
           "FSS" throughout Eurostat's own usage, and the metadata page's
           own title is "Farm structure (ef)". (2) Published on a cadence:
           explicit — roughly every 2–3 years between census years, on a
           10-year census cycle, itself the strongest, most explicit
           cadence statement found anywhere in the EU branch to date (most
           institutional-budget material carries none at all). (3) Has a
           title, per the above. **This is the strongest node candidate the
           EU branch has produced.** Publisher: European Commission
           (Eurostat), per the page's own URL and branding. Proposed id:
           `eurostat-farm-structure-survey`.
```

### FSS-02 — the documented dependency: FSS provides the extrapolation basis for FADN

```
URL:       https://ec.europa.eu/eurostat/cache/metadata/en/ef_sims.htm
LOCATION:  "Statistical concepts and definitions" section
QUOTE:     "Both the censuses and the sample surveys are aimed at producing
           a variety of information on specific CAP targets, as well as
           providing a basis for extrapolating Farm Accountancy Data
           Network (FADN) data."
NAMES:     Farm structure survey (FSS)
           Farm Accountancy Data Network (FADN)
TENSE:     PRESENT
NOTES:     **This is a genuine, documented methodological dependency between
           two named EU-level statistical products**, stated by the
           publishing agency itself (Eurostat), not inferred. FADN's sample
           of ~105,000 returning holdings (Council Regulation (EC) No
           1217/2009, Article 5(3), quoted at FSDN-01 below) needs a
           population framework to extrapolate its sample results to the
           whole farming sector — FSS supplies that framework. Direction, if
           minted: FADN would be the source (it depends on FSS for
           extrapolation), FSS the target, `relationship_type`
           `methodology_depends_on` — FSS is not itself FADN's raw data, it
           is the structural/weighting framework FADN's sample is
           extrapolated against. **Not minted this session** — FADN itself
           does not yet have an independently-verified title/cadence/URL of
           its own from a source as authoritative as Eurostat's FSS page
           (see FSDN-01/-02 below, sourced from the legal instruments
           rather than FADN's own metadata site, which this session could
           not reach — several DG AGRI domains, `agridata.ec.europa.eu` and
           `agriculture.ec.europa.eu`, were unreachable from this
           environment this session, cause not established: could be a
           domain-allowlist restriction on the browser tool used, not
           necessarily the same anti-bot gate that blocks `eur-lex.europa.eu`
           for non-browser clients).
```

### FSDN-01 — the original 2009 network, its sample, and its stated output

```
URL:       https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009R1217
LOCATION:  Article 1(2)–(3); Article 5(3) [as originally codified 2009,
           before the 2023 conversion]
QUOTE:     "The purpose of the data network shall be to collect the
           accountancy data needed for, in particular: (a) an annual
           determination of incomes on agricultural holdings coming within
           the field of the survey defined in Article 5; and (b) a business
           analysis of agricultural holdings.
           The data obtained pursuant to this Regulation shall, in
           particular, serve as the basis for the drawing up of reports by
           the Commission on the situation of agriculture and of
           agricultural markets as well as on farm incomes in the
           Community. The reports shall be submitted annually to the
           European Parliament and the Council, in particular for the
           annual fixing of prices of agricultural produce."
           "The maximum number of returning holdings shall be 105 000 for
           the Community."
NAMES:     AGENCY ONLY (the reports are unnamed by title — "reports by the
           Commission on the situation of agriculture" is a description of
           a report class, not a citable title)
TENSE:     PRESENT
NOTES:     **As codified in 2009, this was the single cleanest annual-report
           obligation found anywhere in the EU branch** — an explicit,
           binding requirement that the Commission submit reports to the
           European Parliament and Council annually, tied to a specific
           purpose (fixing agricultural prices). But it is `AGENCY ONLY` in
           the strict §6 sense: no title is given for these reports, only a
           description of their content and destination. **This exact
           clause was replaced in 2023** — see FSDN-02.
```

### FSDN-02 — the 2023 conversion: an annual-report duty replaced by an undated public-data duty

```
URL:       https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32023R2674
LOCATION:  Article 1, point (3) — replacing Article 1 of Regulation (EC) No
           1217/2009 in full
QUOTE:     "Article 1 is replaced by the following:
           '1. To meet the needs of the common agricultural policy (CAP),
           including the evaluation of its impact on the agricultural
           sector, a farm sustainability data network (FSDN) is set up for
           the collection and analysis of farm-level sustainability data
           covering the economic, environmental and social dimensions
           (FSDN data). [...]
           3. FSDN data and data from other datasets set out in Article 4a
           shall be used to carry out analyses on the state of
           sustainability of Union agriculture, including in a format
           allowing benchmarking. The Commission shall make the results of
           those analyses publicly available in the form of aggregated and
           anonymised FSDN data. Those data may be used to provide
           benchmarking information or advice to farmers with the aim of
           facilitating the management of holdings and improving their
           sustainability. The publication of results and the use of data
           for benchmarking or advice purposes shall comply with Article
           16.'"
NAMES:     Farm Sustainability Data Network (FSDN)
           Regulation (EU) 2018/1091 [cross-referenced at Article 1(4), not
           quoted in full here]
           Regulation (EU) 2022/2379 [cross-referenced, not quoted in full]
TENSE:     PRESENT
NOTES:     **A documented change in publication obligation, not an
           extension of it — flagged as a correction to what a document
           search might assume, per §3's instruction to report conflicts
           rather than resolve them.** The 2009 text's specific,
           title-free-but-binding "annual reports to the European
           Parliament and the Council" duty (FSDN-01) does not appear
           anywhere in the 2023 replacement text of Article 1. In its place:
           a duty to "make the results of those analyses publicly available
           in the form of aggregated and anonymised FSDN data" — broader in
           audience (public, not just the two legislative institutions) but
           **with no stated cadence** anywhere in the replaced Article 1.
           Whether the annual-report duty survives elsewhere in the
           consolidated instrument (e.g. in a provision this amending
           regulation did not touch) was not checked — this record reports
           the amending regulation's own text, not a reconstructed
           consolidated version. **`NOT FOUND`**: the string "annual" does
           not appear in the replaced Article 1 text quoted above (checked
           by direct string search on the fetched page). Article 1(4) of
           the new text explicitly cross-references Regulation (EU)
           2018/1091 by article and point — confirming at the legal-text
           level, not just by inference, that the FSDN and the Farm
           Structure Survey are formally linked instruments, matching what
           the SEC03 budget item's own grouping of both under one
           technical-assistance line implied.
```

---

## What this record does not do

- **It does not mint `eurostat-farm-structure-survey` (or any node) into a
  slice.** FSS-01/FSS-02 clear all three of §4's conditions and are, on the
  evidence gathered, ready for a future session to draft as a Part B slice
  entry — but minting was left to a dedicated pass so the schema/validation
  work (country/jurisdiction_level, id collision check against all corpus
  ids, domain assignment) gets its own attention rather than being rushed
  at the end of a research session.
- **It does not establish FADN's own title, cadence or URL from FADN's own
  authoritative site.** `agridata.ec.europa.eu` and `agriculture.ec.europa.eu`
  were both unreachable this session from this environment; cause not
  established (may be a browser-tool domain allowlist rather than the same
  eur-lex gate). This is the natural next step if FADN itself is to be
  minted as a node alongside FSS.
- **It does not check whether the 2009 annual-report duty (FSDN-01) survives
  anywhere else in the current consolidated text of Regulation (EC) No
  1217/2009** — only the amending regulation's own replacement text was
  read, not a reconstructed full consolidated version.
- **It does not resolve which relationship_type best fits FSS→FADN**
  (FSS-02) — `methodology_depends_on` is proposed, not decided, per §6's
  instruction to flag rather than pick when uncertain.
