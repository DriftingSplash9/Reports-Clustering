# Research Brief VI — the Realm of New Zealand

Same rules as Briefs IV and V. **You are reading documents and quoting them.
You are not deciding anything.** There is no verdict field in this brief. Do
not write DOCUMENTED, CONFIRMED, NOT-FOUND-therefore-no, or tell me whether
something "counts". You extract, I adjudicate.

What changes is the subject. Briefs I–IV went deep into fiscal instruments;
Brief V went wide through classification standards. **This one goes somewhere
nobody has looked at all.**

The project draws a graph in which every node is a recurrently published
official report and every edge is a *documented* statement that one report uses
another as an input. The one rule: **if no document says it, the edge does not
exist.**

New Zealand was mapped on 2026-08-06 — nineteen nodes, nineteen edges, all of
them internal. The Realm of New Zealand is not just New Zealand. It is New
Zealand, the **Cook Islands**, **Niue**, **Tokelau**, and the **Ross
Dependency**. The first three run their own budgets, publish their own
statistics, and use the New Zealand dollar. Not one of them is in this corpus.
Nobody has read a single one of their documents.

**Why this is a better problem than it looks.** The Cook Islands and Niue are
self-governing in free association with New Zealand. They have treaty-making
capacity and are members of some international bodies but not others — they are
not UN member states, and their membership of the IMF and World Bank is not the
ordinary case. Tokelau is a non-self-governing territory whose public finances
run substantially on New Zealand appropriations. So the Realm is a natural
experiment in something this project has been circling for months:

> **When a jurisdiction is inside another country's fiscal and monetary
> perimeter but outside its statutory one, what do its documents actually
> cite?**

The European branch found an asymmetry — EU instruments oblige member states
without naming them, while member states name the instruments without being
asked. The Realm is the sharpest available test of whether that shape is about
the EU or about dependency in general. I do not know the answer. **Do not
guess it for me. Bring quotes.**

---

## Output format

Return **JSON**, as a stream of objects — one object per provision, per
footnote, per table row. Do not bundle. Do not wrap the whole thing in a single
outer array if that means waiting until the end to send anything (see "Write as
you go" below); newline-delimited objects, or several small arrays, are both
fine.

```json
{
  "item": "2b",
  "jurisdiction": "NU",
  "subject": "Government of Niue Budget 2025/26",
  "url": "https://...",
  "final_url": "https://...",
  "access": "opened",
  "location": "Note 2, p.14",
  "quote": "...verbatim, copy-pasted...",
  "releases_named": ["Consumers Price Index (Stats NZ)"],
  "agency_only": false,
  "existing_ids": ["nz-statsnz-cpi"],
  "flags": [],
  "notes": ""
}
```

Field rules, all of which matter:

- **`url` / `final_url`** — the document you actually opened, and the final URL
  after any redirect.
- **`access`** — one of `"opened"` (you retrieved the document and read its
  text), `"search-snippet-only"` (you saw an excerpt in results and did not
  open the source), `"blocked"` (you tried and were refused — say what you
  tried in `notes`), `"memory"` (you are recalling this, not reading it).
  **This field is the most important one in the object.** Every quote I mint
  gets re-verified against the primary source; a quote marked `"opened"` that
  turns out to be `"memory"` costs me an hour and poisons the batch. A quote
  honestly marked `"memory"` costs me nothing and I will still use it as a
  lead. There is no penalty for the honest label.
- **`location`** — section, clause, note, footnote, table or heading number. If
  the passage carries none, write `"NO CITABLE LOCATION"` and give the nearest
  heading.
- **`quote`** — verbatim, copy-pasted, no paraphrase, no tidying, no ellipsis
  inside the operative clause. Preserve the document's own spelling and
  capitalisation even where it is wrong; I record misspellings deliberately.
- **`releases_named`** — the actual publications, series or survey titles named
  *in that quote*. A release is a thing with a title, published on a cadence.
- **`agency_only`** — `true` when the quote names an institution and no
  publication ("data supplied by Statistics New Zealand", "as determined by the
  Secretary"). **This is not a failure state. I need the count.** Do not go
  hunting for a better quote instead of reporting it.
- **`existing_ids`** — if the quote names something already in my corpus, give
  the id from the list at the bottom. Otherwise omit.
- **`flags`** — any of `"CONFLICT"` (this passage disagrees with another you
  found — quote both, do not pick), `"CONTINGENCY CLAUSE"` (see below),
  `"NOT FOUND"` (with the searched strings in `notes`), `"TITLE DRIFT"` (the
  document names a publication by a title that publication does not actually
  use).

### One provision per entry

Brief III lost fourteen good quotes to a single bundled entry. Fifteen entries
with fifteen locations is right. One entry with fifteen quotes is unusable.

### Do not resolve conflicts, report them

If two passages disagree, quote both and flag `CONFLICT`. Do not pick.

### Confirmed absence is a result

If you searched and it is not there, return an object with `flags:
["NOT FOUND"]` and the exact strings you searched in `notes`. Say it even if a
whole item comes back empty. **A jurisdiction that cites nothing is a finding I
will publish.** It is not a wasted item.

### Write as you go

Return each item as you finish it. Do not assemble everything and send at the
end. A previous batch on this project lost roughly 900,000 tokens of finished
work to a session limit that hit before the single write step.

---

## Item 1 — Cook Islands (CK)

The largest and best-resourced of the three. Ministry of Finance and Economic
Management (MFEM) is the anchor institution; Cook Islands Statistics Office
sits inside or alongside it.

- **1a.** The **exact published title and frequency** of each of these, each
  quoted from the document's own cover or masthead: the annual **Budget
  Estimates / Appropriation**, any **Half Year Economic and Fiscal Update** or
  equivalent, the **Government of the Cook Islands annual audited financial
  statements**, and the Statistics Office's recurring outputs (**CPI**,
  **national accounts / GDP**, **overseas merchandise trade**, **census**,
  **balance of payments** if it exists).
- **1b.** The **accounting basis** stated in the audited financial statements.
  Quote the statement-of-compliance note in full. I want to know whether it
  names **IPSAS**, **PBE Standards**, **New Zealand GAAP**, the **XRB**, or
  something local, **by name**. This is the single highest-value quote in the
  brief.
- **1c.** The **auditor**. Who signs the audit report, under what statutory
  authority, and does the report name an auditing standard by title?
- **1d.** Any **"data sources" or "methodology" passage** in a Statistics
  Office release. Does the Cook Islands CPI name a basket source, a weighting
  survey, or an external methodology manual? Does GDP name **SNA 2008**?
- **1e.** Anything in an MFEM budget document that names a **New Zealand**
  publication, a **Pacific Community (SPC)** publication, an **Asian
  Development Bank** publication, or an **IMF/World Bank** publication by
  title.

## Item 2 — Niue (NU)

Smaller, and a much larger share of the budget is external. Treasury /
Department of Finance and Planning is the anchor.

- **2a.** Exact title and frequency of the **Government of Niue Budget** and
  the **annual audited public accounts**.
- **2b.** The **statement of compliance / accounting basis** note. Same
  question as 1b: what standard, named how?
- **2c.** **The New Zealand budget-support relationship.** There is a
  bilateral arrangement between New Zealand and Niue governing development
  funding — variously described as a Joint Commitment for Development, a
  Statement of Partnership, or a country programme. **Unverified premise:
  confirm or refute it, and if a document exists, quote what it obliges either
  side to publish or report.** I want to know whether the funding instrument
  names a document, or only an agency.
- **2d.** Niue Statistics — any recurring release, its cadence, and any "data
  sources" passage. Niue's census in particular: does its report name SPC,
  UNFPA, Stats NZ or anyone else as the methodological or funding source?

## Item 3 — Tokelau (TK)

The hardest and the most structurally interesting, because Tokelau is not
self-governing and its public finance runs through New Zealand's own
appropriations.

- **3a.** Does Tokelau publish a **budget** or **national accounts** under its
  own name? What is the exact title, and who publishes it — the General Fono,
  the Council for the Ongoing Government, the Tokelau National Statistics
  Office, or a New Zealand agency on its behalf?
- **3b.** **Who audits Tokelau's public accounts?** *Unverified premise: I
  believe this may be the New Zealand Controller and Auditor-General. Confirm
  or refute with a quote from a document, not from an encyclopaedia.* If the
  NZ Auditor-General does audit Tokelau, find the audit report or the statutory
  provision that says so and quote it with its section number.
- **3c.** **Tokelau inside New Zealand's own Estimates.** The New Zealand
  Treasury publishes *The Estimates of Appropriations for the Government of New
  Zealand* annually, by Vote. Find the appropriation line covering Tokelau —
  most likely within Vote Foreign Affairs and Trade, possibly its own Vote.
  Quote the appropriation's own scope statement verbatim, with its Vote and
  page. This would be a New Zealand document naming a Tokelau function, which
  is the opposite direction to everything else in this brief and therefore
  especially valuable.
- **3d.** Tokelau census / population statistics — published by whom, how
  often, and naming what source.

## Item 4 — The New Zealand side of the Realm

New Zealand's own documents describing what it does for the Realm. All of these
are NZ-government-published and should be far more accessible than Items 1–3.

- **4a.** **Ministry of Foreign Affairs and Trade** International Development
  Cooperation reporting. Exact title, frequency, and any passage naming a
  partner-country document, a **OECD DAC** reporting standard, or the **DAC
  Creditor Reporting System** by name.
- **4b.** **Vote Foreign Affairs and Trade** in the Estimates of
  Appropriations: quote every appropriation scope statement that names the Cook
  Islands, Niue or Tokelau.
- **4c.** Does **Stats NZ** publish anything covering the Realm — population,
  trade, or migration series that include Cook Islands, Niue or Tokelau as
  reporting units? Quote the coverage statement.
- **4d.** The **Reserve Bank of New Zealand**: does any RBNZ publication
  acknowledge that the New Zealand dollar circulates as legal tender in the
  Cook Islands, Niue or Tokelau, and does it say anything about what follows
  from that? I expect nothing. Confirming nothing is a result.

## Item 5 — The regional statistical machinery

This is where I expect the cross-border citations actually live, because small
statistical offices lean on regional bodies and say so in their methodology
notes.

- **5a.** **Pacific Community (SPC)**, Statistics for Development Division, and
  the **Pacific Data Hub**. What does SPC publish recurrently, under what exact
  titles? Quote any passage where an SPC release names a national statistical
  office's own publication as its source.
- **5b.** The reverse direction: quote any passage in a Cook Islands, Niue or
  Tokelau release that names an SPC product by title.
- **5c.** **Asian Development Bank** *Key Indicators for Asia and the Pacific*
  and *Pacific Economic Monitor* — do they name Realm-country releases by
  title in their source notes? ADB source notes are usually per-table and
  unusually precise, so quote the table number.
- **5d.** Any **Pacific Islands Forum** or **PACER Plus** reporting obligation
  that requires a member to publish a named document.

## Item 6 — The indexation question

The corpus's favourite edge shape is an indexation clause: a statute or
regulation that says a payment moves with a named published index. All three
Realm jurisdictions use the New Zealand dollar, which makes them candidates for
importing a New Zealand index directly.

Search the Cook Islands, Niue and Tokelau statute books, pension acts, minimum
wage instruments and public service pay determinations for any provision tying
a rate to a **named published index** — the New Zealand CPI, a local CPI, or
anything else. Quote it with its section number.

If you find a provision that names an index without naming its publisher, or
names a publisher without naming an index, quote it anyway and set
`agency_only` accordingly. I want the count either way.

## Item 7 — The membership asymmetry

The intellectual core, and the item I most want done properly.

The Cook Islands and Niue participate in the international system on unusual
terms. **Do not tell me about their status — I can read that anywhere. Tell me
what their documents cite.**

- **7a.** Do Cook Islands or Niue statistical releases cite **SNA 2008**, the
  **IMF Government Finance Statistics Manual**, **BPM6**, or the **CPI Manual**
  by title, in the same way EU member states cite ESA 2010? Quote it.
- **7b.** Do they cite those frameworks *without* being obliged to by
  membership — i.e. is there a citation with no corresponding treaty
  obligation? Quote the citation. Do not attempt to establish the absence of
  the obligation; that part is mine.
- **7c.** Is there any document in which New Zealand, SPC, ADB or the UN system
  **obliges** a Realm jurisdiction to compile or publish something, and names
  what? Quote the obliging provision with its number.

Items 7a–7c are the same three questions the European branch asked of the
accession belt. I am looking for whether the answer has the same shape.

---

## One thing that would be new and is worth flagging if you see it

Carried forward from Brief V, because it is still open. Several instruments I
have read contain a clause telling you what to do **when the input stops
existing** — a splice clause, a provision for the day a central bank stops
publishing a rate, a power to prescribe a different valuation date. If you come
across one anywhere in this brief, return it as its own object with
`flags: ["CONTINGENCY CLAUSE"]`. I am collecting them and I do not yet have a
way to represent them.

Small-jurisdiction statutes are a promising place for these, because they
import indices they do not control and someone has to have thought about it.

---

## Order, if you run short

Item 1 (1b first), then Item 3 (3b and 3c first), then Item 2, then Item 5,
then Item 7, then Items 4 and 6.

**1b, 2b, 3b and 3c are the four entries I would keep if I could keep only
four.** 1b and 2b tell me whether the Realm imports New Zealand's accounting
framework or builds its own. 3b and 3c tell me whether Tokelau's public finance
is documented as New Zealand's or as its own. Everything else is enrichment.

---

## Ids already in the corpus that you may be able to match against

If a quote names one of these, put the id in `existing_ids`. If it names
something not on this list — which is likely, since almost nothing Pacific is
here yet — that is wanted; just give the title exactly as the document words
it and propose nothing.

New Zealand, minted 2026-08-06:

```
nz-district-valuation-roll, nz-la-annual-reports, nz-lgfa-annual-report,
nz-mbie-accommodation-data, nz-mbie-tect, nz-mbie-tif, nz-nzta-far-policy,
nz-pbe-ipsas-1, nz-rva1998, nz-rvr2008, nz-statsnz-gfs, nz-statsnz-lac,
nz-statsnz-national-accounts-income, nz-statsnz-qlas, nz-treasury-befu,
nz-treasury-fsgnz, nz-wellington-annual-report, nz-wellington-rates,
nz-xrb-a1
```

International anchors already present, any of which a Realm document might
cite:

```
bis-basel-framework, cpi-manual, icls-work-statistics-resolution, imf-bpm6,
imf-gfsm, ipsas, naics, oecd-frascati-manual, sna-2008, un-census-principles
```

Australia, minted the same day, for the trans-Tasman case:

```
au-aasb1049, au-abs-erp, au-abs-gfs, au-abs-seifa,
au-brisbane-financial-statements, au-cgc-gst-relativities,
au-georges-river-rates, au-la-annual-statements, au-nsw-lrs,
au-tas-sgc-methodology, au-vola1916
```

---

## Two failure modes I have paid for before, stated plainly

1. **A confident quote from a document that was never opened.** Every quote in
   this corpus gets re-fetched and re-read before it is minted. A fabricated or
   half-remembered quote does not merely fail to help — it costs me the time to
   discover it, and it puts every other quote in the same batch under
   suspicion. The `access` field exists so you never have to choose between
   being useful and being accurate. Mark it `"memory"` and I will still thank
   you for the lead.

2. **Hunting for a better quote instead of reporting the weak one.** If the
   Cook Islands budget says "sources: Statistics Office" and nothing more, that
   sentence is the finding. Return it with `agency_only: true` and move on. The
   ratio of titled citations to agency-only citations is a measurement I am
   making, and silently discarding the agency-only ones destroys it.
