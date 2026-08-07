# Research Brief X — South America, and four corrections

Two jobs in one brief, deliberately kept apart. **Part A is a scouting round on
a continent this project has never touched. Part B is four corrections to Brief
IX.** Do not mix their formats: Part A is reconnaissance with no quotes, Part B
is extraction with verbatim quotes only.

**Return everything as ONE consolidated JSON document at the end.** This is a
change from the last four briefs and it is deliberate — see "Output" below.

---

## What Brief IX produced, honestly

Good: the Greenland extraction was the best work in this series. The
*Landskassens Regnskab* accounting-practice note and the independent auditor's
opinion both came back verbatim, in Danish, long, and exact — including the
PDF's own broken word-spacing. That is what an extraction entry should look
like. It established a genuinely new result: Greenland names neither IPSAS nor
Danish state rules nor nothing at all, but its own legislature's statute. Fifth
distinct answer across seven jurisdictions. The Marshall Islands and Palau Note
1 extractions and the Marshall Islands constitutional audit mandate were all
verified exact too.

**Not good, and I need to be plain about it: one entry quoted a sentence that
does not exist.** Entry 18c attributed this to the Marshall Islands compliance
report:

> "The Government of the Republic of the Marshall Islands (RepMar) is required
> under the Compact Treaty to submit an annual Single Audit to the U.S.
> Government after each financial year."

Full-text search of both documents it was attributed to — the 83-page
compliance report and the 125-page financial statements — returns **zero hits**
for "required under the Compact" and **zero** for "submit an annual". The entry
was marked `access: "opened"` with no `PARAPHRASE` flag.

The claim is true. The sentence is invented. And the document contains better
evidence for the same point, which the invention displaced:

> "For purposes of complying with the Single Audit Act of 1984, as amended in
> 1996, RepMar's reporting entity is defined in Note 1..."

> "The U.S. Department of the Interior has been designated as RepMar's
> cognizant agency for the Single Audit."

A statute named by title and amendment year, and a named cognizant agency.
That is what 18c asked for and it was sitting in the file.

Separately, four entries put placeholders **inside the `quote` field** —
`"NOT FULLY EXTRACTED IN THIS PASS"`, `"[standard EY signature block...]"`,
`"PRIMARY TEXT NOT RE-QUOTED HERE"` followed by a from-memory summary of
PROMESA § 201. Those were honestly labelled and I am not complaining about the
honesty. I am asking for the mechanical rule instead:

> **The `quote` field contains a verbatim passage or it contains an empty
> string. Never anything else.** Explanations go in `notes`. A placeholder in a
> quote field is one careless edit away from becoming a fabricated quote, which
> is exactly what happened in 18c.

One more thing worth knowing, because it cost you the highest-priority item.
Entry 21a deferred the Puerto Rico fiscal plan as "requires complete
page-level extraction". I retrieved it in one command: the Oversight Board
distributes through Google Drive legitimately, and `uc?export=download&id=<ID>`
returns the file where `/view` does not. 164 pages, full text layer, and it
names BLS, BEA, the Census American Community Survey and the Puerto Rico
Planning Board by title and vintage. All now minted. Note also that the Drive
ID given was the **2024** plan, not the June 2026 revision the entry claimed.

---

## Output — consolidated JSON, one document

Previous briefs asked you to stream results as you went. **Reverse that for
this brief.** I want a single JSON document with this top-level shape:

```json
{
  "brief": "X",
  "date": "2026-08-..",
  "part_a_scout": [ { ...scout objects... } ],
  "part_b_extraction": [ { ...extraction objects... } ],
  "ledger": {
    "part_a": { "covered": [], "partial": [], "not_attempted": [] },
    "part_b": { "complete": [], "partial": [], "not_attempted": [] }
  }
}
```

One valid JSON document, parseable in a single pass. If you must break it up
because of length, break it at the top-level key boundary and say which key
each fragment belongs to — never mid-array.

---

# PART A — South America, reconnaissance

**No quotes. Not one.** This half is about finding out what exists.

South America is **empty in this corpus. Zero nodes.** The palette has had a
family reserved for it since a redesign months ago and nothing has ever gone
in it. Thirteen countries and a regional body, none researched.

### Scout object format

```json
{
  "item": "BR-3",
  "jurisdiction": "BR",
  "publisher": "Secretaria do Tesouro Nacional",
  "exact_title": "Relatório Resumido da Execução Orçamentária",
  "title_english": "Summary Report of Budget Execution",
  "url": "https://...",
  "doc_type": "budget-execution",
  "cadence": "bimonthly",
  "most_recent": "6º bimestre 2025, published January 2026",
  "language": "pt",
  "fetch": { "status": "ok", "format": "pdf", "notes": "text-layer PDF" },
  "names_sources": "unknown",
  "location_pointer": "Anexo, 'Notas metodológicas'",
  "characterisation": "Statutory bimonthly report required of every federative entity.",
  "access": "opened",
  "flags": []
}
```

- **`exact_title` in the original language**, original accents and
  capitalisation. `title_english` is a separate field for the gloss. Translated
  titles turn out not to match anything searchable.
- **`doc_type`**: one of `financial-statements`, `budget`, `budget-execution`,
  `statistics-release`, `methodology`, `statute`, `transfer-formula`,
  `audit-report`, `valuation`, `accounting-standard`, `other`. **Use the enum.**
- **`fetch`** is the field I value most and the one nobody volunteers.
  `status`: `ok` / `403` / `js-rendered` / `login-required` / `pdf-only` /
  `not-found` / `unknown`. `format`: `pdf` / `html` / `scanned-pdf` (images, no
  text layer — real and common in this region) / `xlsx` / `unknown`. Your
  fetch calls in Brief VIII were right on eight of nine and saved me days; the
  one miss was `data.adb.org`, which 403s from here.
- **`names_sources`**: `yes-titled` / `yes-agency-only` / `no` / `unknown`.
  Does the document name its own data inputs, and by publication title or only
  by agency? **`unknown` is a fine answer** — do not read a document to fill it.
- **`location_pointer`**: an address, never a quote.

### The five things to look for, per country

1. The national statistics office and its recurring outputs — national
   accounts, CPI, government finance statistics.
2. Central government budget and budget-execution reporting.
3. Audited government financial statements, and who audits them.
4. **A fiscal transfer formula** — any statute or regulation dividing money
   among subnational governments.
5. A property valuation or cadastral system feeding local taxation.

**Number 4 is why this brief exists.** This corpus's most valuable edges all
have one shape: a funding formula that names, by exact published title, the
dataset it divides money by. The Dutch municipal fund's technical guide does
it; Ontario's partnership fund appendix does it; the UK's social care formula
names census tables by code. Several South American countries appear to run
constitutional revenue-sharing formulas at national scale — potentially the
largest and most explicit instances of this shape anywhere — and not one is in
the graph.

Number 5 matters because the corpus holds three property-valuation chains
already (New South Wales, the Netherlands, New Zealand) and a fourth from a
different legal tradition would be genuinely informative.

### Countries and leads

**Everything below is an unverified premise. Confirm or refute. A lead that
turns out not to exist is a useful entry.**

**Brazil (`BR`) — first priority, likely richest.** IBGE for statistics.
Secretaria do Tesouro Nacional for fiscal reporting under the *Lei de
Responsabilidade Fiscal* (LC 101/2000). The *Fundo de Participação dos
Municípios* and *Fundo de Participação dos Estados* are constitutional
transfers that I believe are calculated partly from IBGE population figures —
**if a normative act names an IBGE release by title, that is the single most
valuable thing in this brief.** Also FUNDEB for education funding; the MCASP
accounting manual and the NBC TSP standards and whether they state a
relationship to IPSAS; the Tribunal de Contas da União as auditor.

**Colombia (`CO`).** DANE for statistics. The *Sistema General de
Participaciones* is a constitutional transfer system I believe uses DANE
population data. IGAC for cadastral valuation. Contraloría General.

**Chile (`CL`).** INE, DIPRES. The *Fondo Común Municipal* is a municipal
equalisation fund. The Servicio de Impuestos Internos runs the *avalúo fiscal*
property valuation — the closest South American analog to the valuation chains
already held. Contraloría General.

**Argentina (`AR`).** INDEC. *Coparticipación Federal de Impuestos* (Ley
23.548). Auditoría General de la Nación.

**Peru (`PE`).** INEI, FONCOMUN, MEF, Contraloría.

**Then more briefly:** Uruguay (`UY`), Bolivia (`BO`), Ecuador (`EC`),
Paraguay (`PY`), Venezuela (`VE`), Guyana (`GY`), Suriname (`SR`).

**Regional.** CEPAL/ECLAC is the obvious anchor and publishes at scale. Also
Mercosur, the Comunidad Andina (which I believe issues binding statistical
*Decisiones*), and the Inter-American Development Bank.

**French Guiana is excluded** — it belongs with the French collectivities.

### Part A volume and order

Thirteen countries plus regional bodies, five classes each: **a complete
return is on the order of 100 objects.** Go wide before deep. Order: Brazil,
Colombia, Chile, Argentina, CEPAL, Peru, then the rest.

---

# PART B — four corrections

**Verbatim quotes only. Empty string if you cannot copy-paste.**

**B1 — Marshall Islands, Single Audit mechanism (replaces 18c).** Quote the two
passages named above from the compliance report, each as its own object with
its own location: the *Single Audit Act of 1984, as amended in 1996* sentence,
and the *cognizant agency* sentence. Then search both documents for any further
passage naming **OMB Uniform Guidance**, **2 CFR Part 200**, or the **Compact**
as the reason the audit is required, and quote what you find. If nothing else
exists, say so with the strings you searched.

**B2 — PROMESA § 201 (replaces 21c).** Quote the actual statutory text
requiring the Oversight Board to certify a fiscal plan, and specifically any
provision stating what the plan must be **based on** — projections, data,
methodologies. From the statute at `congress.gov` or `uscode.house.gov`, not
from memory. This matters because a federal statute specifying a data
requirement is rare in this corpus.

**B3 — Palau's audit mandate (19b, not attempted).** 40 PNCA § 231, quoted from
the Palau National Code itself with its section number. The Marshall Islands
equivalent came back clean from `rmiparliament.org`; find the Palau analogue.

**B4 — the Greenland index, and this is the one I most want.** The
Self-Government Act § 5 stk. 2 indexes the block grant to *"det generelle pris-
og lønindeks på finansloven"*. Brief IX asserted that Denmark's Økonomistyrelsen
publishes this index annually and **quoted nothing for it**, so the claim is
sitting in my data unevidenced.

Settle it. Find whatever Finansministeriet or Økonomistyrelsen publishes about
how the general price-and-wage index is set, and quote it with a URL. The
question is narrow: **is this index a published thing with a title and a
publisher, or a parameter that exists only inside the Danish Finance Act?**

If published, § 5 becomes an edge. If internal, then a national funding formula
is indexed to a number nobody publishes — a shape this corpus has never
recorded, and frankly the more interesting outcome. Either answer is a result;
an unevidenced assertion is not.

---

## The rules, restated because Part B is extraction

- **`quote` holds a verbatim passage or an empty string.** Nothing else, ever.
- **`PARAPHRASE` flag** if you are reconstructing rather than copying.
- **Quote ugly.** Extracted PDFs break words — Greenland's renders "Inatsisartut"
  as "Inat si sar tut" and "må-ned" across a line. Reproduce it. Broken text is
  evidence the extraction is real; smooth text is not.
- **`access`** on every object, Part A and Part B alike. `"memory"` and
  `"search-snippet-only"` cost nothing. Mislabelling them `"opened"` costs a
  lot, because everything marked `"opened"` gets re-fetched and checked here.
- **Primary sources only.** An encyclopaedia, a wiki, a law-firm note or a news
  article is a pointer to the source, never the source. This has come up three
  times: `lex.dk`, `da.wikisource.org`, and a news site standing in for an
  appropriation act.
- **No `existing_ids`.** Retired. Name what the document names; matching is mine.
- **Do not decide things.** You characterise and quote; I adjudicate.
