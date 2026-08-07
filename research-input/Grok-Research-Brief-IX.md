# Research Brief IX — extraction, four proven targets

**Back to extraction. Quote verbatim.** Scout Brief VIII was reconnaissance and
did its job: it told me where the material is, which jurisdictions are
retrievable, and which are not worth a week. This brief spends that knowledge.

Five targets, all confirmed rich and confirmed fetchable. No matrix, no
twenty-five-way sweep. **Depth is the deliverable this time, and depth means
copy-paste.**

---

## What the scout established, and one thing it got wrong

Your fetchability calls held up under testing. `rmioag.com`,
`palauopa.org`, `cft.cw`, `oversightboard.pr.gov`, `government.fo`, `stat.gl`
and `mof.gov.mh` all serve documents to an ordinary request, exactly as logged.
`ina.gl` failed once on DNS and worked on retry — a transient, not a wall.
**One miss: `data.adb.org` returns 403 from here**, where you logged it `ok`
with a downloadable spreadsheet. Worth knowing the field is not perfect, but it
was right on eight of nine and it saved me days.

The substance was better still. Marshall Islands and Palau both verified: US
GAAP, GASB named as standard-setter, Ernst & Young, and *Government Auditing
Standards issued by the Comptroller General of the United States*. Palau's
opinion is qualified specifically over GASB 87 *Leases*. **So all three Compact
states import the metropole's accounting method, and New Zealand's Realm
imports its auditor and nobody's method.** Two free-association arrangements,
opposite answers. That comparison is the most valuable thing this series has
produced and this brief is about nailing it down.

### The sourcing rule, because this is twice now

Brief VII's Greenland entry cited `lex.dk`, a signed encyclopaedia article.
Scout Brief VIII's cited `da.wikisource.org`, a wiki. Both were honestly
labelled and neither could be used, because **an encyclopaedia, a wiki, a
law-firm note or a news article is never the source.** It is a pointer to the
source. The rule from here:

> **If the primary document cannot be reached, the entry is
> `"status": "not-found"` or `"blocked"` with what you tried. Never a
> secondary text dressed as a quote.**

To make that easier, here is something I found while checking your work, and it
is a gift for this brief and everything after it:

> **`retsinformation.dk`'s JavaScript wall only covers the HTML view. Append
> `/pdf` to the ELI path and it serves the official PDF.**
> `https://www.retsinformation.dk/eli/lta/2009/473/pdf` → 200, five pages,
> §§ 5 and 8 present and text-extractable.

That unblocks Danish legislation entirely. Use it.

---

## Format

Unchanged from Brief VII, and all of it still required: newline-delimited JSON,
**one provision per object**, `access` on every entry, the `dates` object,
`agency_only` where the quote names an institution and no publication,
`location` with a section or note number, `NOT FOUND` with the searched
strings, `CONFLICT` across documents as well as within one, and write as you go.

Two carried forward with emphasis:

- **`PARAPHRASE` flag.** If you are reconstructing rather than copying, say so.
  A flagged paraphrase is useful. An unflagged one is a landmine.
- **Quote ugly.** These are extracted PDFs and they break words across lines —
  the Greenland act renders "må-ned" and "Naalakker-suisut", Niue's statements
  render "Income" as "lncome". Reproduce it. Broken text is evidence the
  extraction is real.

And one retired: **no `existing_ids`.** It has been misused three times now
(SNA 1968 tagged `sna-2008`, ANZSIC tagged `naics`, and the tagging in the
scout round). Name what the document names; the matching is mine.

---

## Item 18 — Marshall Islands

Document located: *Financial Statements... Republic of the Marshall Islands,
Year ended September 30, 2022*, `rmioag.com`, text-layer PDF, 125 pages.

- **18a.** The **statement of compliance / basis of accounting note** — the
  note that says what framework the statements follow. Quote it in full with
  its note number. FSM's equivalent reads *"The accompanying financial
  statements... have been prepared in accordance with accounting principles
  generally accepted in the United States of America (GAAP). The Governmental
  Accounting Standards Board (GASB) is the recognized standard-setting body..."*
  I want the Marshallese wording, not an assumption that it matches.
- **18b.** The **auditor's signature block and the appointment basis.** You
  flagged a constitutional mandate at Article VIII § 15. Quote the
  constitutional provision itself, from the Constitution, with its section
  number — and quote the signature block from the audit report. **These are two
  separate objects.**
- **18c.** Does the audit report name **the Single Audit Act**, **OMB Uniform
  Guidance / 2 CFR Part 200**, or the **Compact** by title as the reason the
  audit is required? Quote the naming passage. This is the mechanism by which
  US method reaches a sovereign state and I want it in the document's own words.
- **18d.** The **Fiscal Procedures Agreement** under the Compact. Does it
  require the Marshall Islands to produce or publish any **named** report on a
  stated cadence? Quote the obligation with its section number.
- **18e.** Anything in the financial statements or budget that names a
  **statistical release by title** — population, CPI, GDP. Expect
  `agency_only: true` or `NOT FOUND`; both are results I count.

## Item 19 — Palau

Document located: *Financial Statements... Republic of Palau, Year ended
September 30, 2022*, `palauopa.org`, text-layer PDF, 130 pages.

- **19a.** Statement of compliance / basis note, full, with note number.
- **19b.** Auditor signature block, **plus** the statutory mandate you pointed
  at (40 PNCA § 231) quoted from the code itself. Two objects.
- **19c.** **The qualified opinion over GASB 87.** Quote the *Matter Giving Rise
  to Qualified Opinion* paragraph in full. A jurisdiction failing a specific
  numbered standard of a foreign standard-setter is the sharpest possible
  evidence that the standard genuinely binds, and I want it verbatim.
- **19d.** Single Audit / Uniform Guidance / Compact naming, as 18c.
- **19e.** Palau's Compact review agreement (2023, in force 2024) — any
  publication or reporting obligation, quoted with its provision number.

## Item 20 — Greenland

Two documents, both confirmed reachable: *Landskassens Regnskab* on `ina.gl`,
and the Self-Government Act via the `/pdf` route above.

- **20a.** *Landskassens Regnskab* — the **"Anvendt regnskabspraksis"**
  (accounting policies) section. Quote it in Danish, verbatim, with an English
  gloss in `notes`. **The question is the same one the Realm answered three
  different ways: does Greenland name IPSAS, name Danish state accounting
  rules, name its own, or name nothing?**
- **20b.** The **revisionspåtegning** — who signs, and under what appointment.
  Quote the signature block and, separately, whatever names the appointing
  authority. Is it Rigsrevisionen, a private firm, or a Greenlandic office?
  This is a census entry either way — see Item 22.
- **20c.** **The index question, and it is the most interesting thing in this
  brief.** § 5 stk. 2 of the Self-Government Act indexes the block grant to
  *"det generelle pris- og lønindeks på finansloven"*. I have that text.
  What I do not have is whether that index is **a published thing with a title
  and a publisher**, or an internal budget parameter that exists only inside
  the Danish Finance Act. Find out. Quote whatever the Finansministeriet or the
  Finanslov says about how the general price-and-wage index is set or published.
  **If it is published, it is a node and § 5 is an edge. If it is internal to
  the budget, that is a formula naming an index that no one publishes, which is
  a shape this corpus has never recorded.**
- **20d.** *Finanslov* for Greenland — the economic assumptions section. Does it
  name **Grønlands Statistik** releases by title, or only the agency?
- **20e.** `stat.gl` — for national accounts and CPI, quote any methodology or
  "kilder" passage. Does Greenland cite **SNA 2008**, **ESA 2010** (it is
  outside the EU, so this would be notable either way), or the **CPI Manual**?

## Item 21 — Puerto Rico

Your scout called this the richest single target in the set and I agree.
`oversightboard.pr.gov` serves everything.

- **21a.** The **Certified Fiscal Plan for the Commonwealth of Puerto Rico**,
  most recent vintage. Find its **macroeconomic assumptions** and **data
  sources** sections and quote every passage naming an external dataset by
  title. Candidates worth searching for explicitly: **Bureau of Labor
  Statistics** releases, **Bureau of Economic Analysis**, **US Census Bureau**
  population estimates, the **Puerto Rico Planning Board** and its GNP series,
  **Puerto Rico Institute of Statistics**. One object per named release.
- **21b.** Does the Fiscal Plan state what **accounting or reporting standard**
  the certified budgets are prepared on? You noted modified accrual; quote the
  passage that says so.
- **21c.** **PROMESA** itself (Pub. L. 114-187), Title II. Quote the provision
  requiring the fiscal plan, and quote anything specifying what the plan must
  be **based on** — projections, data, methodologies. Federal statutes are
  usually explicit about this and it would be a statute naming a data
  requirement, which is rare in this corpus.
- **21d.** Puerto Rico's own **audited financial statements** (ACFR /
  Comprehensive Annual Financial Report) — do they exist, how far behind are
  they, and what framework do they name? Puerto Rico has had a well-documented
  reporting backlog and any passage acknowledging it is worth quoting, the way
  Niue's own delay note was.

## Item 22 — The census, still open

Carried from Brief VIII and now with real data behind it.

- **22a — `AUDITS`.** Every case where one jurisdiction's audit institution is
  named as auditor of another jurisdiction's accounts, quoted with the
  appointing provision. Confirmed so far: New Zealand → Niue (Article 60 of
  Niue's own Constitution), New Zealand → Tokelau (Tokelau Finance Rules 1998).
  **The Compact states appear NOT to be cases of this** — a private firm audits
  under foreign standards, which is an export of method, not of institution.
  Keep them distinct and log both kinds. Greenland (20b) is an open case.
- **22b — `SUPERSEDES`.** Every case where a document states one programme,
  fund or instrument replaces or succeeds another. Confirmed: one. The 2023
  Compact agreements replacing the 2003 amended Compacts are an obvious
  candidate — if either agreement says so in terms, quote it.

I need counts before I widen the graph's schema, and no amount of reasoning
substitutes for them.

## Item 23 — Only if you have capacity left

Scout, do not extract, the nineteen jurisdictions Brief VIII did not reach:
Jersey, Guernsey, Isle of Man, Gibraltar, Bermuda, Cayman, Montserrat,
Falklands, St Helena, New Caledonia, French Polynesia, Wallis and Futuna,
Mayotte, Réunion, Åland, Azores, Madeira, Basque Country, Navarre.

Scout schema from Brief VIII, no quotes, `fetch` field required. **This item is
explicitly last.** Do not start it until 18 through 22 are done or blocked.

---

## Volume and order

Realistic shape for this brief: **40 to 70 objects.** Fewer than the scout,
because each one costs more.

Order: **21 (Puerto Rico) first** — it is the richest and the one most likely to
produce the formula-names-a-titled-dataset shape this whole corpus is built
around. Then 20 (Greenland), then 18 and 19 (Marshall Islands and Palau, which
are near-identical and can be done together), then 22, then 23.

If you can only do one item, do **21a**.

**Ledger required as your last message**, same as the scout round: which items
came back complete, partial, or not attempted.

---

## The failure modes

1. **A confident quote from a document never opened.** `access` exists so you
   never have to choose. Eighteen for eighteen in Brief VI round one is the
   standard; round two's five paraphrases are the thing to avoid.
2. **Hunting for a better quote instead of reporting the weak one.** The ratio
   of titled citations to `agency_only` ones is a measurement I am making.
3. **Smoothing.** A paraphrase of Niue's valuation note deleted a named private
   valuer that had underpinned a country's land values for twenty-seven years.
   It survived only because I re-read the source. Quote them ugly.
4. **Secondary sources dressed as primary.** Twice now. The rule is at the top
   of this brief and the `/pdf` trick is there to make it cheap to obey.
