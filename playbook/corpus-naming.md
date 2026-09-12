# Corpus — §7a, what counts as naming the artefact

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** you are deciding whether a document NAMES the target — a judgement about the document,
not about the grader. **If your question is why the grader disagreed with you, that is `corpus-evidence.md`.**

**THE BOUNDARY, so nothing lands in the wrong file again** (stated 2026-09-11, after three entries had):
**`corpus-naming.md` is POLICY — what counts as a citation at all, and it would be true if the grader did not
exist.** **`corpus-evidence.md` is MECHANICS — how the grader and the matchers actually behave.**
**`corpus-route.md` is what the ROUTE the bytes came by does to the grade.** **`corpus-hosts.md` is what a
failed fetch does and does not prove.** **`corpus-nodes.md` is what is and is not a node.** If an entry would
still be true with no tooling at all, it is policy; if it explains why a tool did something, it is mechanics.

**You do not read this by default.** `PLAYBOOK-CORPUS.md` carries a one-line index of everything
below; it tells you a ruling exists and what it decides, and you come here for the reasoning only
when it binds the question in front of you. This is the single most-cited section in the corpus lane and the one that decides most refusals.

---

## 7. Standing decisions — do not re-raise


**Bar for adding to this section: a rule that will change how a FUTURE
round decides something, not a record of one specific edge's fate — the
data's own `_dropped`/live entry is that record.** A one-off single-
node/single-edge call belongs there, not here as its own paragraph.

**Reorganised 2026-09-06** into the three questions the rulings actually
answer, so a round reads the third of this section that binds its question
instead of all of it. Nothing was reworded; four passages were cut where this
section's own bar puts the record in the data, and they are named where they
were removed.

### 7a. What counts as naming the artefact

**Naming the agency is not naming the artefact** (Thomas, 2026-08-31,
ruling on the second audit's F-05). A document that says the figure comes
from "the Department of Commerce", "ISQ", "FCSC" or "the central bank" —
without naming the release — does not clear the evidence bar for an edge to
that agency's *specific* publication. It is a lead: the release still has
to be found by title. Six such edges went to `_dropped` `no-document` that
day and are listed there — this section's own bar says the data is that
record. And REPORTS.md's own
"disclosure stops one level short of a title" note is the reason this is
the normal case, not the rare one. Nothing in the validator can catch it —
the guard is this paragraph and the reviewer.

**Naming an organisation does not name the instrument that created it** (Thomas,
2026-09-05, ruling on the promotion refused in the grader round). The ≥4-character
acronym rule cannot tell the two apart: `gq-inege-anuario-2024` graded A against
`afristat-founding-treaty-1993` on a budget-table row reading "Contribuciones del
Gobierno a AFRISTAT ─ ─ ─ 380", which names the ORGANISATION that the 1993 founding
TREATY brought into being — a membership subscription, not a citation of the treaty
text. The promotion was refused and the edge stays at B. This is the acronym-rule
sibling of "naming the agency is not naming the artefact" and it decides the same
way: a body and the document constituting it are two artefacts, and a document that
names the body has not named the instrument. Nothing in the matcher can catch it —
the acronym is genuinely in the target's own title — so the guard is this paragraph
and the reviewer.

**"Consistent with" is a claim about numbers, not a citation** (Thomas,
2026-08-31, ruling on the second audit's F-03). A basis that says two series
are consistent, aligned or comparable — and quotes no passage — describes
agreement between figures, not a document naming one as the other's input.
38 such edges (28 of them in the Russian regional slices) were moved to
`_dropped` `deferred` as leads, originals preserved in `why`. The shape to
watch for in any bulk import: "X data in national compilations are consistent
with the Y yearbook" — that is the tell.

**An index page is a bare homepage with a path** (Thomas, 2026-08-31,
ruling on the second audit's F-01/F-02). `brics.ibge.gov.br/publicacao.html`
stood behind 23 edges and names no data source; `inegi.org.mx/temas/...`,
Rosstat `folder/<n>` listings are the same class. All 23 went to `_dropped`
`no-document`; `isIndexPage()` in graph.ts now warns on the class (45 more
edges on the day it landed, listed in the validator's EVIDENCE block beside
the bare-homepage count, plus an informational "URLs behind 10+ edges" list —
one URL rubber-stamping dozens of edges is the tell). Same promotion gate as
the other two evidence warnings.

**Assertion-only edges are `_dropped`, never live** (Thomas, 2026-08-31,
ruling 1-A after the audit's D1). An edge whose evidence is a publisher
homepage or nothing, and whose basis quotes no document, is a belief —
463 of them went to `_dropped` `no-document` that day with their
original basis preserved, and the validator's EVIDENCE block counts any
new one. "Probably true" is the reason they were dangerous, not a
defence: on screen they were indistinguishable from verified edges. Three nodes look treaty-shaped but deliberately survived:
`ve-ofac-sanciones` (a `part_of` container — removing it orphans two
other nodes), `tr-eu-trade` (named like a treaty, actually merchandise
trade statistics), `sdmx-standard`/`sna-2025` (statistical standards, not
agreements).

**Chart/figure-caption sourcing clears the evidence bar** (Thomas,
2026-08-30) — a figure-source line under a chart is a citation, same
standing as body-text prose. General ruling for every future round, not
just the edge that prompted it. **Confirmed and made explicit 2026-09-06:
this means grade A, not B.** A round found this paragraph and the
table-cell one below saying different things, graded two edges B on the
later wording, and asked; Thomas: *"i think the caption sourcing is ok and
both can be A's. we need to fix that line for consistency."* His caveat is
the operative half — *"a chart doesn't always mean anything official. i can
make whatever chart I want but it should be sourced to be credible"* — so
what carries the citation is the **source line**, not the chart, and an
unsourced or self-made chart carries nothing. Read the attribution before
grading on it.

**A methodology table cell that names a source is caption-equivalent** (Thomas,
2026-09-06, extending the chart-caption ruling above). A table whose purpose is to
disclose sources discloses them: a cell reading "Scottish share is estimated using the
Living Costs and Food Survey (LCF)" is a citation, and grades **A**, the same as a
figure caption. *(This clause read "grades **B**" until 2026-09-06 evening, which
contradicted the chart-caption ruling it says it extends. Thomas resolved it that day
in favour of A — see that paragraph. "Caption-equivalent" means equivalent, so the two
now move together; if a caption is ever regraded, this moves with it. The correction
lifted 14 live edges from B to A: the 13 SDDS/SDDS Plus methodology-table edges in
`int-imf-dsbb-2026-09-06.json` and `sct-gers -> gb-ons-lcf`.)* This reopened exactly one edge on the day it was ruled
(`sct-gers -> gb-ons-lcf`, where all six LCF mentions in the GERS revenue methodology
are in table cells and none in prose), and a corpus-wide sweep of `_dropped` entries
refused on that shape found only one other candidate, blocked for an unrelated reason.
**It does not reopen agency-only table entries.** The cell has to name the ARTEFACT:
`on-ompf`'s Appendix F attributes five measures to "Statistics Canada" with no
publication named, in a table whose entire purpose is to disclose sources, and that
stays refused. The two rules compose; the weaker one does not dissolve the stronger.

**A statistical agency's own product NUMBER names the artefact** (Thomas,
2026-09-06). A Statistics Canada table number — `36-10-0222-01`, or the legacy
CANSIM form `405-0004` — is not the target's title, so `namesTarget` cannot see
it and the A bar refuses it; but it is a precise, checkable identifier of one
specific release, which is strictly MORE specific than the title and is the exact
thing the agency-not-artefact rule was asking for. Ruled to name the artefact.
Three conditions, and they are what keep this from becoming "any number counts":

1. **The number must be verified against the agency's own product page**, in the
   round that uses it, and the page's title must be the target node's artefact.
   `36-10-0222-01` was checked at `www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3610022201`
   and returns "Gross domestic product, expenditure-based, provincial and
   territorial, annual". A number nobody resolved is a guess.
2. **The mechanism is `title_aliases`**, so the grader can see what the reader
   can. A table number is neither an acronym nor an agency name, so it clears
   that field's rule 3; it is the name the citing documents actually use, so it
   clears rule 2.
3. **A legacy number that the modern table page does not itself acknowledge does
   NOT qualify.** SOR/2007-303 cites "CANSIM table 405-0004, Road motor vehicles,
   registrations"; the current `23-10-0308-01` page shows no former-number
   mapping, so `fiscal-equalization-program -> statcan-vehicle-registrations`
   stays at B. Equating the two would be the researcher's own knowledge, not the
   document's.

Generalises beyond Canada to any agency that numbers its releases and is cited by
number — but each agency's numbering wants its own check against condition 1.

**A nomenclature the document says is BASED ON the target standard names the target**
(Thomas, 2026-09-06, ruling on the `Sistema Armonizado` alias). A methodology that says
its classification rests on a national or bloc nomenclature — Argentina's NCM, Colombia's
NANDINA, Chile's tariff codes — and says in the same breath that the nomenclature is based
on the standard, is citing the standard. The intermediate nomenclature does not break the
chain, and a source line in a glossary or a footnote is a citation like any other source
line (§7a's caption ruling, which this one leans on). Four Spanish-language edges moved on
it: `co-comercio-exterior -> hs`, `co-comercio-exterior -> un-imts-2010`,
`ar-comercio-exterior -> hs` (B to A) and `cl-comercio-exterior -> hs` (C to A, read in
Thomas's Chrome because bcentral.cl is a JS shell to both machines).

**The guard, and it is the whole rule: the DOCUMENT has to state the derivation.** "The
statistics use the NCM" plus the researcher's own knowledge that the NCM derives from the
HS is an inference, and it is refused — that is the agency-not-artefact bar arriving from
a different direction. What moved these four is that each methodology says *basada en el
Sistema Armonizado* / *está basado en el Sistema Armonizado* / *del Sistema Armonizado
vigente* in its own words. Nothing else changes: the standard still has to be NAMED, by
title or by a sourced `title_aliases` entry, and a bare tariff-code reference still names
no artefact.

**A document that names the target artefact IN ANOTHER LANGUAGE names it**
(Thomas, 2026-09-04). `namesTarget()` matches a run of the target's own title
words and every title in this corpus is English, so a French Règlement that
prescribes the HICP by its French name, a Bank of Korea appendix on 바젤Ⅲ, an
NHC yearbook on 国际疾病分类 and Banco Central del Paraguay on the "Sistema de
Cuentas Nacionales del 2008" were all capped at B for the corpus's own
monolingualism. The mechanism is `Report.title_aliases` — read that field's
doc comment before adding one; the three rules there (same artefact not a
related one, sourced from a document actually read, never an acronym or an
agency name) are what stop it becoming a synonym bag. The field earns its
place on the dozen international standards the whole corpus cites in a dozen
languages, not on national releases only ever cited at home.

**A parenthetical acronym from the target's own title names the artefact when
it is four characters or more AND glosses the WHOLE title** (Thomas,
2026-09-04, narrowing the blanket exclusion the dry run wrote). The blanket
exclusion existed for a real reason — `(EDP)` and `(NSW)` matched documents
that named neither artefact — and both of those are THREE characters and both
gloss a component rather than the title, which is what the two conditions are
for. The rule was measured before adoption and it caught its own false
positive on the first run: `pspp-cola-methodology` is "Public Service Pension
Plan (PSPP) Cost-of-Living Adjustment (COLA) Methodology", and an Ontario
release naming the PSPP names the PLAN, not the COLA methodology — the
whole-title condition is what puts that edge back at B where it belongs.

**A node carries the publisher's own title for the artefact, not ours**
(Thomas, 2026-09-04). Six Bolivian department edges sat at B on
`agency-not-artefact` while citing INE's own anuario table, because the node
was titled "Pobreza monetaria por departamento" and INE heads the table
"BOLIVIA: INCIDENCIA DE POBREZA, SEGÚN DEPARTAMENTO". The document WAS the
artefact and the grader could not see it. Retitled to
"Incidencia de pobreza, según departamento (INE)"; all six went to A. When an
edge grades `agency-not-artefact` against a document that is plainly the
target itself, check the node's title against the publisher's before
concluding anything about the evidence.

**The ICLS class is closed: stop re-deriving it** (Thomas, 2026-09-06). Four rounds
have independently found and refused the same edge — a national labour force survey to
`icls-work-statistics-resolution` — because the survey's own documentation says some
version of "in accordance with International Labour Organisation concepts and
definitions" and never names the resolution by title. The UK (2026-09-06), Ireland,
Australia and Northern Ireland (all 2026-09-06) each cost a research pass to reach the
same answer; Australia's is the closest and still generic ("aligns closely with the
standards and guidelines set out in Resolutions of International Conferences of Labour
Statisticians" — plural, no resolution named). **Do not open this again per country.**
If the class is ever to be wired, it is by finding ONE document that names the
resolution and applying the finding as a pattern, not by re-testing the next NSO's LFS
page. The refusals already in the data are the record; adding a fifth is waste. This is
a scope decision, not a new evidence rule: the agency-not-artefact bar is unchanged and
is what refuses them.

**DGDDI's monthly bulletin is closed: ruled dead, do not attempt a fifth round**
(Thomas, 2026-09-08). Four rounds (1, 2, 15's adjacent search, 16) checked six
candidate document classes for something naming DGDDI's monthly "Résultats du
commerce extérieur" bulletin BY TITLE alongside a usage statement — Trésor's own
same-titled annual commentary, Banque de France's annual balance-of-payments report,
two INSEE Note/Point de conjoncture editions, INSEE's Comptes de la Nation chapter and
TEF page, and INSEE's own Note de conjoncture bibliography (which named a DIFFERENT
DGDDI product instead — see round 15's `fr-dgddi-chiffre-commerce-exterieur`, wired
fine). Every one of the six cites the agency ("Douanes / DSECE"), never the titled
monthly release. Same shape as the ICLS ruling above: the refusals already in the data
are the record, and a fifth round is waste. Detail: memory
`round16_fr_dgddi_monthly_still_refused_2026-09-07`.

---

## Moved here 2026-09-11 from `PLAYBOOK-CORPUS.md`'s index

**Rounds 38-45 wrote full reasoning straight into the §6/§7 index lines**, which the 2026-09-09 split had
just emptied — seventeen entries across the two sections had grown back into essays and carried 37% of that
file. They are below, **byte-for-byte as they stood**, and the index now carries one line each pointing here.
*(Thomas, 2026-09-11, on being shown the measurement: "do it". Full account: `notes/doc-audit-2026-09-11.md`.)*

### The instrument, not the citing sentence, proves who issued it

- **CORRECTED 2026-09-09 (round 40): the ISSUER named in the CITING SENTENCE does NOT decide the
  target — the instrument's own cover does.** *(This line read: "The ISSUER named in the sentence
  decides the target, not the title. A provincial yearbook saying 上海市统计局制定的《固定资产投资统计
  报表制度》 names the PROVINCE's instrument, which is a mint lead, not the identically-titled NBS
  node. Two of Shanghai's four exact title matches were its own (round 39). Read the words before
  the 《." It stood for one day.)* Round 40 opened both instruments in Shanghai's own 年定报制度目录
  and both covers read 国家统计局制定 / 上海市统计局补充、印制 — as do 建筑业's and 劳动工资's, which
  round 39 wired to NBS nodes off 国家统计局制定的. Thomas ruled 2026-09-09: wire all four to NBS.
  **The rule now: a citing sentence proves a TITLE was used; only the instrument proves who ISSUED
  it. Fetch the instrument before recording a look-alike or minting a provincial twin.** A provincial
  bureau's 年定报制度目录 is where to fetch it, and its covers are unambiguous — one that really is the
  province's says 上海市统计局制定 with no NBS line, and its title carries 上海市 too. Unaffected and
  still true: the 农业产值 look-alike class, three yearbooks giving three titles for one apparent
  instrument — compare character by character, never by eye.

### Defining a series under a law vs reporting legal-publicity work

- **A document that DEFINES a series' unit or scope under a law names the law as its basis; a bureau REPORTING
  its legal-publicity work about the same law does not** (Thomas, 2026-09-10). Suzhou's 依照《中华人民共和国统计法》
  规定，开展住户收支与生活状况调查的住户为调查户 is a `legal_basis` edge; Shandong's 统计事业发展综述 mentioning 《统计法》
  is not (round 40's refusal stands). The test is the sentence's SUBJECT: the statistic, or the bureau's activities.

