# Prompt for Grok, round 4 — fix round 3's packaging, then exactly one more country

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Continuation of rounds 1–3.

**Two jobs this round, in order: (1) repackage Italy, which you researched
without being asked to — the research was good, so we're keeping it, but it has
to go back through the schema properly. (2) Czechia, and only Czechia. Nothing
else.**

---

## 1. Two corrections to make before doing anything else

### You opened a fourth country you weren't assigned

Round 3 said explicitly: *"do not open a fourth country or a new body on your
own initiative this round."* You did France, Netherlands and Poland as asked,
then also researched Italy (ISTAT) and sent it in a different format outside the
JSON entirely. **The Italy research is good and we're not discarding it** — it
found the same pattern as Germany and the Netherlands (legal-basis citation,
named registers, central bank as BoP compiler) — but from now on, **only
research the country or body explicitly assigned that round.** If you finish
early, go deeper on what's assigned rather than opening something new. This is
the second time scope has drifted past what was asked; after this it stops being
a formatting note.

### Your JSON schema drifted from rounds 1–2 — go back to the original shape

In round 3, `candidate_edges` entries used `relationship_type` (with values like
`uses_data_from`, `methodology_depends_on`) and a single bundled `"basis"`
string containing the quote, the location, and your reasoning all together.
**Stop doing both of those:**

- **You do not choose `relationship_type`.** That is an adjudication, and §1 of
  every round's prompt has said the same thing from the start: you extract, you
  do not conclude. Report the **actual words the document used** — "in
  compliance with," "based on," "must comply with" — in a `relationship_word`
  field, exactly like rounds 1 and 2. Categorizing it as `uses_data_from` vs
  `methodology_depends_on` is a decision made after your work is reviewed, not
  during it.
- **Never bundle quote, location, and reasoning into one paragraph.** Use the
  separate fields from the original schema: `url`, `location`, `quote` (verbatim,
  in quotation marks, nothing else in that field), `tense`, `notes` (your
  reasoning goes here, not mixed into the quote).

This isn't a stricter rule than before — it's the **same** rule as round 1 and 2,
restated because round 3 quietly moved away from it. Go back to exactly this
shape:

```json
{
  "id": "short-kebab-case-id",
  "source": "source report id or plain description",
  "target": "target report id or plain description",
  "relationship_word": "the actual words the document used, unedited",
  "url": "...",
  "location": "...",
  "quote": "verbatim, quotation marks, nothing added",
  "quote_translation": "only if quote is not English",
  "tense": "present or past",
  "notes": "your reasoning, hedges, anything odd — never the quote itself"
}
```

**One exception, and it's a good one to keep:** `candidate_nodes` using the real
field names (`title`, `publisher`, `country`, `jurisdiction_level`, `region`,
`description`, `releases_per_year`, `url`, `domains`) rather than the `_hint`
versions from round 1 is fine and actually useful — keep doing that. The
correction above is about `candidate_edges` and `non_findings` only.

**`non_findings` also needs its `kind` field back** (`agency_only`, `not_found`,
`non_dependency`, `documented_conflict`) — round 3's `"item"/"result"/"searched"`
shape lost that categorization, and it's how these get sorted at review time.

---

## 2. Job 1 — repackage Italy in the correct schema

**Do not re-research Italy.** Everything you already have is good:

- The legal-basis citation (*"National accounts estimates are produced in
  accordance with the provisions of the European System of National and
  Regional Accounts Manual (ESA 2010)... introduced by Regulation (EU)... No
  549/2013"*) → `it-istat-national-accounts` → `esa-2010`.
- **ASIA-Enterprises and Frame-SBS**, named and quoted with real detail
  (*"Frame SBS is a statistical register of annual financial statements of
  active enterprises included in the Asia-Enterprises register"*) → real
  `uses_data_from` candidates, same shape as Germany's EVAS-numbered surveys and
  the Netherlands' SBS/SBR.
- **Banca d'Italia named as BoP compiler** (*"information on the trade of
  services extracted from the Balance of Payments compiled by the Bank of
  Italy"*) — the fourth sighting of this exact pattern (Bundesbank for Germany,
  DNB for the Netherlands, now Banca d'Italia for Italy, and a weaker
  agency-only version for France's Banque de France). **See §4 — this pattern is
  now established; say so, don't keep independently re-finding it.**

**What to actually do:** take what you already have and put it through the
corrected schema from §1 — split each bundled passage into its own
`candidate_edges` or `non_findings` entry with clean `quote` / `location` /
`relationship_word` fields, propose ids (`it-istat-national-accounts`,
`it-istat-asia-enterprises`, `it-istat-frame-sbs`, `it-bdi-bop`) as
`candidate_nodes`, and file the Household Budget Survey / Labour Force Survey /
Census of Agriculture / SIOPE-BDAP mentions as `non_findings` with
`kind: "agency_only"` unless you have a clean enough quote to promote one to a
real edge.

**Also: re-verify every URL before resending it.** Several of the ones you sent
have a stray character merged into them (e.g.
`...Ebook.pdf￼LOCATION`) — that's a copy-paste artifact, and the real URL
underneath may or may not still work. Open each one fresh and confirm it
resolves before putting it in the `url` field again.

---

## 3. Job 2 — Czechia, and only Czechia

Poland came back with the citation pattern present but **thinner** than
Germany, France or the Netherlands — no public GNI Inventory at the same
granularity, no clean central-bank quote. That's a real result, but it's one
data point. **Czechia is the second and, for this round, the last test of
whether "thinner for newer member states" is real or just a Poland-specific gap
in what's publicly posted.**

Czechia joined in 2004, the same wave as Poland, and the Czech Statistical
Office (ČSÚ, Český statistický úřad) has a reputation for solid published
methodology, including in English. Run the identical test:

1. Find ČSÚ's own methodology or "sources and methods" documentation for Czech
   national accounts. Does it state ESA 2010 as its legal basis, the way
   Destatis's and CBS's did?
2. Look for named Czech surveys or a register/code system, the way EVAS works
   for Germany and the ASIA family works for Italy.
3. Look for **Česká národní banka** (the Czech National Bank, ČNB) named as
   source for BoP or financial accounts — this is now the fourth data point on
   the pattern in §4, so look specifically for whether it's present, `agency_only`,
   or genuinely absent, and say which plainly.
4. **State the comparison to Poland directly** in your `meta` block: is Czechia's
   public documentation as granular as Germany/Netherlands/Italy, as thin as
   Poland, or somewhere in between? That comparison is the actual point of this
   country, not just adding a fifth node.

**Do not open a fifth country after Czechia this round, even if you finish
early.** If there's time left, go deeper on Czechia specifically, or finish any
loose ends in the Italy repackaging from Job 1.

---

## 4. A pattern that's now established — stop independently re-finding it, cite it

**"A national central bank is named as the compiler of balance-of-payments and
some financial-account data feeding into the national accounts" has now shown
up for Germany (Bundesbank), the Netherlands (DNB), and Italy (Banca d'Italia),
with a weaker agency-only version for France (Banque de France).** That's
enough to treat as a confirmed cross-country pattern rather than a fresh
discovery each time. **For Czechia, just check whether it's present, absent, or
agency-only, and record one clean entry — don't build the case for the pattern
itself again, it's already built.**

---

## 5. Do not re-open these — carried forward and updated

Same list as round 3 (Annex B transmission quote, Annex XI, the ESA/SNA
"consistent with" non-dependency, OECD general source documentation), plus:

| Document | Disposition |
|---|---|
| The France ↔ ESA 2010 legal-basis edge, the Esane edge, the R&D manual chain, the Frascati Manual chain | All confirmed, round 3. Don't re-quote; repackage per §2 only if the original quote needs its fields split apart. |
| The Netherlands GNI Inventory → ESA 2010 / SBS / DNB / SBR edges | All confirmed, round 3. Same — repackage only, don't re-research. |
| Poland's thin result | Confirmed and closed as a finding. Don't re-search Poland this round. |

---

## 6. Do not duplicate these node ids

```
esa-2010, eu-draft-budget, ec-statement-of-estimates, eurostat-hicp,
eurostat-farm-structure-survey, eurostat-remuneration-update-report,
de-destatis-national-accounts, lu-statec-ipch, lu-statec-ipcn,
sna-2008, imf-bpm6, imf-gfsm, ipsas, bis-basel-framework,
naics, un-census-principles, icls-work-statistics-resolution, cpi-manual,

nordic-statistics-database, nato-defence-expenditure, no-ssb-national-accounts,
fr-insee-national-accounts, oecd-icio, fr-insee-base2020-methodo,
eu-manual-rd-esa2010, fr-insee-esane, oecd-frascati-manual,
nl-cbs-gni-inventory-2010, nl-cbs-sbs, nl-dnb-bop, nl-cbs-sbr,
pl-gus-national-accounts
```

Full list: `Research.1.md` §9.

---

## 7. Format — the corrected schema from §1, used consistently this time

```json
"meta": {
  "researcher": "grok",
  "round": 4,
  "date": "YYYY-MM-DD",
  "jobs_this_round": ["repackage Italy", "Czechia"],
  "cz_vs_pl_comparison": "one sentence — is Czechia's public documentation as granular as DE/NL/IT, as thin as Poland, or in between?"
}
```

Same four arrays, `candidate_nodes` / `candidate_edges` / `non_findings` /
`termini`, fields as corrected in §1. One JSON object. If you must split it,
label each block `PART 1 of N` on the line before it.

---

## 8. The seven things that matter (unchanged)

1. Quote verbatim, in its own field, with a location — never inside a reasoning paragraph.
2. One entry per provision — never bundle.
3. **No verdicts, including `relationship_type`.** Report the words used; categorizing them is someone else's job.
4. `agency_only` and `not_found` are results — use the `kind` field to say which.
5. "Consistent with" is not a dependency — closed since round 2, don't re-log it.
6. Check the tense.
7. **Only the country or body explicitly assigned this round.** Nothing else, even if you finish early.
