# ESS Quality Framework — QPI / Quality Glossary / DESAP: Part A record

Date: 2026-08-08
Slice: `src/data/research/ess-quality-framework.json` (mirrored in
`EU/slices/eu-level/`)
Governing brief: `Research.1.md`
Predecessor record: `EU/ESSQualityFramework_PartA_2026-08-07.md` (entry **G2**
is the one this record reopens)

## Scope

`ess-quality-framework.json` carried a single `_dropped` entry, `no-node-yet`,
bundling three candidates: the ESS Quality and Performance Indicators (2014),
the ESS Quality Glossary, and the Checklist for Survey Managers (DESAP).
`Research.1.md` §4 named it as a reopened candidate under the 2026-08-08
one-off-foundational-instrument ruling; `G.53.md` flagged that its own sweep
never actually checked it. This record is that check.

**The three separate.** One is minted, on the ordinary recurring shape rather
than the one-off-instrument route the brief's forward pointer implied. Two
stay dropped, both on reasons other than the cadence reason originally
recorded.

What the original entry searched, in its own words: *"Strings searched on the
quality-reporting page and in the EHQMR foreword: 'Quality and Performance
Indicators', 'QPI', 'revised', 'edition', '2014'. NOT FOUND."* That search was
confined to one webpage and one **foreword**. The QPI document itself was not
opened and the EHQMR **body** was not searched. Both change the result.

---

## A. ESS Quality and Performance Indicators

**A1 — the document exists as a titled, versioned publication.**

```
URL:       https://ec.europa.eu/eurostat/documents/64157/4373903/02-ESS-Quality-and-performance-Indicators-2014.pdf
LOCATION:  Title page (p.1)
QUOTE:     "ESS GUIDELINES FOR THE IMPLEMENTATION OF THE ESS QUALITY AND
           PERFORMANCE INDICATORS (QPI)"
           "Version 1.4"
NAMES:     ESS Guidelines for the Implementation of the ESS Quality and
           Performance Indicators
TENSE:     PRESENT
NOTES:     §4 point 2 satisfied — it has a title, and the title is not the
           indicator set's name. The distinction matters and is the whole of
           section A4 below.
```

**A2 — its own revision history, which is the cadence evidence.**

```
URL:       (as A1)
LOCATION:  p.1
QUOTE:     "These indicators were reviewed by the Eurostat Expert Group on
           Quality Indicators in 2010 and then slightly updated by the Task
           Force on Quality Reporting in 2012-2013"
NAMES:     Eurostat Expert Group on Quality Indicators
           Task Force on Quality Reporting
TENSE:     PAST
NOTES:     Two revision events, both dated, producing Version 1.4. Eurostat's
           "Tools and standards" list dates the current version as "ESS
           Quality and Performance Indicators (2014)".
           TWO READINGS, NOT ADJUDICATED (§3): narrowly, two revisions across
           2010–2014 is roughly one every two years; across the observed
           lifetime it is two revisions and then nothing for the twelve years
           to 2026. The JSON takes the second, conservative reading
           (releases_per_year 0.13, the same treatment
           ess-quality-assurance-framework already carries) and records the
           first in cadence_note rather than discarding it. NO STATED REVIEW
           INTERVAL: strings searched in the document and on the
           quality-reporting page — "review", "revision", "updated",
           "version", "every". NOT FOUND.
```

**A3 — the naming evidence the original entry could not find. This is the
edge.**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  s. 3.2.2 (p.25)
QUOTE:     "The definitions and compilation methods for the QPIs are specified
           in the ESS Guidelines for the Implementation of the ESS Quality and
           Performance Indicators."
NAMES:     ESS Guidelines for the Implementation of the ESS Quality and
           Performance Indicators
TENSE:     PRESENT
NOTES:     Names the document by its exact title as the source of the
           definitions AND the compilation methods for indicators the Handbook
           itself requires. That is methodology_depends_on, not cites — the
           Handbook takes a method from it, it does not merely reference it as
           context. This sentence is in the body, which is why the 2026-08-07
           foreword-only search missed it.
```

**A4 — the trap, quoted so it is not re-proposed as an edge.**

```
URL:       (as A3)
LOCATION:  s. 3.2.2 (p.25) and s. 3.2.3 (p.26)
QUOTE:     "SIMS incorporates the 16 standard ESS Quality and Performance
           Indicators (QPIs) within the sub-concepts (for user reports) and as
           sub-concepts of their own (for producer reports)."
           "The ESQRS includes all 16 standard QPIs as separate sub-concepts,
           as indicated in Table 3.2."
NAMES:     Single Integrated Metadata Structure (SIMS)
           ESS Standard for Quality Reports Structure (ESQRS)
TENSE:     PRESENT
NOTES:     NOT AN EDGE. Both sentences describe the indicator SET living
           inside SIMS — the part_of shape that already keeps ESMS and ESQRS
           out of this slice (see the slice's own _dropped entry on them, and
           the Report.part_of finding in src/lib/types.ts). Minting "the QPIs"
           as a node would double-count against ess-sims.
           The set is part of SIMS; the document that DEFINES the set is not.
           That is why the minted node is ess-qpi-guidelines and not ess-qpi,
           and why no ess-sims -> QPI edge is drawn. Filed in the JSON as a
           `caveat` on the minted edge.
```

**A5 — supporting context, no edge on its own.**

```
URL:       (as A3)
LOCATION:  s. 2.5.3 (p.23)
QUOTE:     "The ESS Quality and Performance Indicators 2014 are a standard set
           of indicators covering significant aspects of quality and
           performance in a standardised way."
TENSE:     PRESENT
NOTES:     Confirms the 2014 dating from the dependent document's own side.
           A description of what the indicators are, not an input claim —
           A3 is the operative sentence.
```

**Minted**: `ess-qpi-guidelines`, `releases_per_year: 0.13`, plus
`ess-handbook-quality-metadata-reports -> ess-qpi-guidelines`,
`methodology_depends_on`, on A3.

---

## B. ESS Quality Glossary — still dropped, different reason

**B1 — cadence was never the problem.**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  s. 2.5.2 (p.22)
QUOTE:     "The ESS Quality Glossary, first published in 2003, was transferred
           to the Concepts and Definitions Database (CODED), where it is now
           available as a theme."
NAMES:     ESS Quality Glossary
           Concepts and Definitions Database (CODED)
TENSE:     PRESENT (with a past clause)
NOTES:     A 2003 first publication, and the Publications Office's EU
           Vocabularies register carries an "ESS Quality Glossary" dataset
           whose latest version is 2023, maintained by Eurostat with the
           Working Group on Quality in Statistics. Dated points twenty years
           apart — so the original "one dated publication" objection is
           factually wrong. The operative objection is what this quote says
           happened to it: it stopped being a document and became a theme
           inside a database.
```

**B2 — and the version the Handbook uses is part of the Handbook.**

```
URL:       (as B1)
LOCATION:  s. 2.5.2 (p.22–23), and Supplementary Document A (p.199)
QUOTE:     "As previously noted, for the purposes of this Handbook, the
           Glossary has been revised and expanded to become the ESS Quality
           and Metadata Glossary."
NAMES:     ESS Quality and Metadata Glossary
TENSE:     PRESENT
NOTES:     Supplied as Supplementary Document A of the EHQMR itself. So both
           available routes are part_of something else — a database theme, or
           a supplement to a node already minted. Same call as ESMS/ESQRS.
           Nothing read names it as an input to a report; the EHQMR mentions
           it descriptively. Revisit if Eurostat republishes it as a titled
           standalone document.
```

---

## C. Checklist for Survey Managers (DESAP) — still dropped, cleanly

**C1 — dating and absence of any revision record.**

```
URL:       https://ec.europa.eu/eurostat/web/products-eurostat-news/-/G0-LEG-20031010
LOCATION:  Publication details
QUOTE:     "The European Self Assessment Checklist for Survey Managers"
           — publication date 29 March 2004, Eurostat; recorded as Annex VII
           of the final project report "Development of a Self-Assessment
           Programme for Surveys".
NAMES:     The European Self Assessment Checklist for Survey Managers (DESAP)
TENSE:     PRESENT
NOTES:     The checklist PDF itself carries no version, no date and no
           revision statement. Strings searched in it: "version", "edition",
           "revised", "update". NOT FOUND. So the original cadence objection
           holds — but it is not the operative one.
```

**C2 — the operative objection: nothing names it as an input.**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  s. 2.5.4 (p.23)
QUOTE:     "The European Self-Assessment Checklist for Survey Managers (DESAP)
           enables the conduct of quick but systematic and comprehensive
           quality assessments of a statistical process (survey, census or
           administrative data process) and its outputs and identification of
           potential improvements."
NAMES:     DESAP
TENSE:     PRESENT
NOTES:     Describes what a tool does. It does not say the Handbook takes
           anything from it — §4 point 1 fails. Strings searched in the
           EHQMR: "DESAP", "self assessment", "self-assessment", "checklist".
           The only other hits are the electronic and condensed variants
           listed in the same section ("The documents are also available in
           electronic form: Electronic DESAP-E checklist and Electronic DESAP
           user guide and an abbreviated version is available as DESAP
           condensed") and a peer-review self-assessment questionnaire at
           s. 2.4.2, which is a different instrument.
           Shape note: DESAP is a blank checklist a survey manager fills in.
           It publishes nothing of its own. Recorded `no-document`.
```

---

## D. What this says about the brief

`Research.1.md` §4 lists this candidate among the exclusions **reopened by the
one-off-foundational-instrument ruling**. That framing is wrong and worth
correcting rather than inheriting: the QPI Guidelines qualify on the ordinary
recurring shape (a versioned document with a stated revision history), and the
other two fail on grounds the cadence rule never touched. `G.53.md` already
drew the useful distinction — *"reopened by the rule change"* and *"worth
re-checking now that it's cheaper to qualify"* are different categories, and
this candidate turns out to be a third: **wrongly dropped in the first place,
on a search that was too narrow.** Worth carrying into the remaining sweep,
because a keyword pass over `_dropped` text cannot detect that class at all —
the entry's stated reason reads perfectly sound until you re-open the source.

## E. Part B — soft connections

None new. The one edge this record supports is minted in Part A terms and is
in the slice; nothing provisional was left over. The three candidate
categories still open elsewhere in this file are unchanged: the CoP →
peer-review reverse leg, the `cites` / `methodology_depends_on` judgement on
the EHQMR → CoP edge, and the "Catalogue of ESS standards" as an unscoped node
class.
