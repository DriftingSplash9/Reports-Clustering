# Research Brief XI — Brazil, and the unfinished map

**Extraction. Verbatim quotes only, except where an item says otherwise.**

This brief closes out a working session and hands its research half to you.
Everything in it is something the corpus knows exists and has not read. There
is no exploratory item: Brief X's scouting located the material, and this is
the collection round.

**Return one consolidated JSON document**, same top-level shape as Brief X:
`{ "brief": "XI", "date": "...", "extraction": [ ... ], "scout": [ ... ],
"ledger": { ... } }`. Break only at a top-level key boundary if you must,
never mid-array.

---

## Brief X, scored

Part B was a clean recovery. **Seven of seven verified exact**, including
B1d — a `NOT FOUND` with an empty `quote` string and the searched terms listed.
That is precisely what the rule exists for, and it is worth more to me than a
plausible sentence would have been.

Three of those corrections have already become graph edges: the Marshall
Islands Single Audit mechanism, PROMESA § 201, and — after three rounds and two
false starts — the Greenland block grant. **Økonomistyrelsen does publish the
general price-and-wage index**, so § 5 of the Self-Government Act is now a
documented indexation edge alongside the US Social Security COLA and Canadian
OAS indexation. That question is closed. Thank you for closing it.

Two small things to carry:

- **B3 answered a narrower question than the one asked.** 40 PNCA § 231 was
  quoted correctly, but § 231 is only the Public Auditor's annual-report duty;
  the audit mandate proper is a few sections away and hooks to Article XII § 2
  of Palau's Constitution. It was in the same PDF. First hit, not right hit.
- **B4's quote inserted a markdown link** — `[www.oem.dk](https://www.oem.dk)`
  where the page reads plain `www.oem.dk` — and gave the update date as 24 June
  where the page says 23 June. "Quote ugly" cuts both ways: do not tidy, and do
  not decorate.

Part A's scouting stands up and is the basis for Items 24 and 25 below.

---

## Item 24 — Brazil, and this is the whole point of the brief

Your scout flagged the FPM/IBGE chain as the highest-value edge candidate in
South America. I agree, and I want it built properly. **This corpus's most
valuable edges all have one shape: a funding formula that names, by exact
published title, the dataset it divides money by.** Brazil may be the largest
instance of that shape anywhere in the world — a constitutional transfer to
more than five thousand municipalities, calculated from official population
figures.

- **24a.** The **Decisão Normativa-TCU** fixing the FPM coefficients for the
  most recent year. Quote the operative article that states what the
  coefficients are calculated from. **The question is whether it names an IBGE
  publication by title — a Portaria, an "Estimativas da População" release —
  or only names IBGE as an agency.** Both answers are results. Quote whichever
  it is, with the article number.
- **24b.** The **statutory chain behind it**: Lei Complementar 62/1989 and/or
  LC 91/1997 on FPM/FPE distribution, and Lei 8.443/1992 art. 102 on the TCU's
  role. Quote the provision that obliges IBGE to supply population figures, if
  one exists, with its article number.
- **24c.** The **IBGE Portaria** publishing the population estimates the TCU
  uses. Exact title, number, date, and the passage stating its legal purpose.
  If the Portaria itself says it is issued for FPM purposes, that closes the
  chain from both ends and is the best possible outcome.
- **24d.** **IBGE's population estimates methodology note** — does it name its
  own inputs (the Censo Demográfico, civil registration, the *Estimativas*
  methodology document) by title?
- **24e.** **MCASP / NBC TSP.** Does either state a relationship to **IPSAS**?
  Quote the passage. Brazil would be the largest IPSAS-convergent jurisdiction
  in this corpus and the comparison against the Cook Islands, Greenland and the
  Compact states is directly relevant.
- **24f.** The **RREO** (Relatório Resumido da Execução Orçamentária) — its
  methodological notes. Does it name IBGE series, the MCASP, or the Lei de
  Responsabilidade Fiscal by article?

**If you can only do one item in this brief, do 24a.**

## Item 25 — Colombia, Chile, Peru: close the three partials

Your ledger marked all three as "existence confirmed, formula text not
isolated". Isolate them.

- **25a. Colombia.** The decree or law operationalising **Sistema General de
  Participaciones** distribution. Does it name **DANE** projections by
  publication title? Quote the criteria article.
- **25b. Chile.** The normative act governing **Fondo Común Municipal**
  distribution — quote the distribution-criteria provision and any named
  statistical input.
- **25c. Chile.** The **SII** *avalúo fiscal* methodology — what does the
  valuation rest on, and does any document name a published price or
  construction-cost series? This is the fourth property-valuation chain for a
  corpus that already holds New South Wales, the Netherlands and New Zealand,
  and the comparison is the point.
- **25d. Peru.** **FONCOMUN** distribution criteria, same questions.

## Item 26 — ANZSIC, finally

Scouted in Brief VIII and never extracted. I have already verified two passages
myself from the ABS primary source, so **do not re-quote these** — I need the
rest:

> "The Australian Bureau of Statistics and Statistics New Zealand jointly
> developed this classification..."
> "...ANZSIC 2006 aligns with the ISIC and the North American Industry
> Classification System (NAICS) at the subdivision level as far as practicable."

- **26a.** A passage in an **ABS statistical release** naming ANZSIC as the
  classification used. One release, one quote, with the release's exact title.
- **26b.** The same from a **Stats NZ** release. Use `datainfoplus.stats.govt.nz`
  — it is server-rendered and carries the methodology text; the release pages
  are JavaScript and will give you nothing.
- **26c.** **ANZSCO** — exact title, edition, publishers, and whether its front
  matter names **ISCO** as parent. Same treatment as ANZSIC.

## Item 27 — Scouting only, no quotes: the nineteen

Brief VIII's `not_attempted` list, still untouched. Scout schema, `fetch` field
required, **no quotes**:

Jersey, Guernsey, Isle of Man, Gibraltar, Bermuda, Cayman, Montserrat,
Falklands, St Helena, New Caledonia, French Polynesia, Wallis and Futuna,
Mayotte, Réunion, Åland, Azores, Madeira, Basque Country, Navarre.

The five questions are unchanged: accounting framework, auditor, transfer
instrument, statistics office, currency. **The Crown Dependencies are the most
interesting group** — the UK's CIPFA Code is already a node, and whether Jersey,
Guernsey and the Isle of Man use it, use IFRS, or use their own is the same
question the Realm and the Compact states have now answered five different ways.

## Item 28 — Two small closures

- **28a.** **Faroe Islands** — Brief VIII returned only the transfer
  instrument. The other four classes: accounts, budget, statistics office
  (Hagstova Føroya), auditor.
- **28b.** **Marshall Islands and Palau budgets** — both came back
  `full_text_location_unconfirmed`. Find the actual appropriation documents,
  and the **Fiscal Procedures Agreement** under each Compact: does it oblige
  either state to publish a named report on a stated cadence?

---

## Order

24 → 25 → 26 → 28 → 27. Item 27 is scouting and goes last so it cannot
cannibalise the extraction, which is what happened in Brief VIII.

Realistic shape: **50–90 extraction objects plus 60–100 scout objects.**

**Ledger required**, inside the consolidated JSON, listing every item as
complete, partial, or not attempted.

---

## The rules

- **`quote` holds a verbatim passage or an empty string.** Nothing else, ever.
- **Quote ugly.** Do not tidy, do not decorate, do not fix the source's
  spelling or its broken word-spacing. Portuguese and Spanish PDFs will lose
  accents in extraction — leave them lost and note it.
- **`exact_title` in the original language**, with `title_english` separate.
- **`PARAPHRASE` flag** whenever you are reconstructing rather than copying.
- **`access` on every object.** `"memory"` and `"search-snippet-only"` cost
  nothing; mislabelling them `"opened"` costs a lot, because everything marked
  `"opened"` is re-fetched and checked.
- **Primary sources only.** An encyclopaedia, a wiki, a law-firm note or a news
  article is a pointer, never the source. This has come up three times.
- **No `existing_ids`, no verdicts.** You quote and characterise; adjudication
  is not yours.
