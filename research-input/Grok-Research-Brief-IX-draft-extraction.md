# Research Brief VIII — every other realm

Same rules as Briefs IV through VII. **You are reading documents and quoting
them. You are not deciding anything.** No verdicts. You extract, I adjudicate.

This is the biggest brief in the series and it is deliberately open-ended.
Previous briefs named the documents; this one names a **question** and roughly
twenty-five jurisdictions to ask it of. Where a brief has said "find document
X" before, this one says: go and see what exists.

---

## What briefs VI and VII established, and why it generalises

Three jurisdictions of the Realm of New Zealand gave three different answers to
one question — what accounting framework do your public accounts name?

- **Cook Islands** — IPSAS, by name and by standard number.
- **Niue** — nothing. *"prepared in accordance with the accounting policies of
  the Government of Niue."* Verified across nine reporting years.
- **Tokelau** — *"generally accepted accounting practice"*, with no definer.

And New Zealand supplies the **auditor** to two of the three, under two
different legal instruments, while supplying the accounting standards to none.
The Realm imports assurance and not method.

**That is one data point about a class of jurisdiction that has perhaps forty
members worldwide, and nobody has looked at the rest.** Every metropolitan
state with dependencies, associated states or autonomous regions runs its own
version of this arrangement: a jurisdiction inside the metropole's fiscal and
often monetary perimeter, outside its statutory one, publishing its own
accounts under rules it either imports, invents, or leaves undefined.

**The question this brief exists to answer: is New Zealand's pattern the
normal one, or is New Zealand unusual?** I cannot answer that from one realm.

There is a second reason this matters to me. My graph's edges are all of the
form *this document uses that document as an input*. The auditor relationship
does not fit, and I have now hit that wall twice — once on "supersedes" in the
UK, once on "audits" in the Realm. Before I widen the schema I need to know how
many cases exist. **This brief is also a census.**

---

## The one process fix, and it is not optional

Round one of Brief VI returned eighteen `"opened"` quotes and **all eighteen
verified verbatim.** Round two returned near-verbatim text with five
paraphrases, including the single most important sentence in the Realm — Niue's
Note 2.2, which round one had quoted exactly and round two rewrote.

One paraphrase cost real evidence. Niue's note on property valuation reads:

> "The valuation was performed by Darroch Limited, Registered Valuers, on 30
> March 1998."

It came back as *"Land and Buildings were initially measured at cost as deemed
appropriate as at 1 July 1997."* A named private valuer, still underpinning the
deemed cost of a country's land twenty-seven years later, vanished into a
paraphrase. I only recovered it because I re-read every source.

So, added to the format and required:

- **`quote` must be copy-paste.** If the text layer is broken, quote it broken.
  Niue's PDFs render "Income" as "lncome" and "58(1)" as "58('l)" — I want that,
  because it tells me the extraction is real.
- **New flag `"PARAPHRASE"`.** If you are reconstructing a passage from memory
  or summarising rather than copying, set the flag and say so in `notes`. A
  flagged paraphrase is useful. An unflagged one is a landmine.
- **When in doubt, empty the quote.** An entry with `quote: ""`, a good `url`
  and a `notes` field describing what is there is worth more to me than a
  smooth sentence I have to disprove.

Everything else is unchanged from Brief VII: newline-delimited JSON, one
provision per entry, `access` on every entry, the `dates` object, `agency_only`
where the quote names an institution and no publication, `NOT FOUND` with the
searched strings, `CONFLICT` across documents as well as within them, and
**write as you go**.

---

## The five questions

For **each** jurisdiction in the list below, I want the same five answers. Give
each its own entry, with `item` set to the jurisdiction code and the question
letter — `"MP-A"`, `"GL-C"`, and so on.

**A — The accounting framework.** Find the government's most recent audited
financial statements or public accounts. Quote the **statement of compliance**
or equivalent basis-of-preparation note. Does it name **IPSAS**, the
metropolitan state's own standards (UK/CIPFA, US GASB or FASAB, Dutch BBV,
Danish or French public accounting rules, Australian AASB, NZ PBE), a local
standard, or **nothing at all**? The Niue answer — a document that defines
compliance by reference to its own policies — is a real possible answer and I
want it recognised when it appears.

**B — The auditor.** Who signs the audit report? Under what instrument — the
jurisdiction's own constitution or statute, the metropolitan state's law, or a
contract? Quote the appointing provision **with its section number**, and quote
the signature block. This is the census question.

**C — The transfer.** Is there a named, recurring fiscal transfer from the
metropolitan state? Quote whatever document establishes it, and answer the
question this project always asks: **does the instrument name a formula, an
index or a published dataset, or does it name only an agency and an amount?**
`agency_only: true` is a perfectly good answer and I need the count.

**D — The statistics.** Does the jurisdiction publish its own national
accounts, CPI or government finance statistics? Does the methodology text cite
**SNA 2008**, **SNA 1993**, the **IMF GFSM** by edition, **BPM6**, or the
**CPI Manual** by title? The Cook Islands cited SNA 2008 in its national
accounts and cited nothing in its CPI — that within-office split is exactly the
kind of thing I am looking for.

**E — The currency, and who admits it.** Which currency circulates? Does any
central bank, monetary authority or currency board publication acknowledge the
jurisdiction — and if the jurisdiction uses someone else's currency, does any
document anywhere describe what follows from that? For New Zealand the answer
was a clean `NOT FOUND` across all RBNZ publications, and that was worth
knowing.

---

## The jurisdictions

Roughly twenty-five. **You will not finish them all.** Depth on eight is worth
more than a thin pass over all of them — see the priority order at the end.

**Compact of Free Association with the United States.** The closest structural
parallel to New Zealand's Realm anywhere in the world, and my first priority
for that reason:
`FM` Federated States of Micronesia · `MH` Marshall Islands · `PW` Palau
*Unverified premises to confirm or refute: all three use the US dollar; all
three receive Compact funding with reporting conditions attached; US federal
single-audit requirements may reach them. If a Compact funding agreement names
a published index or an audit standard, quote the provision.*

**Kingdom of the Netherlands.** Four countries in one Kingdom, plus three
special municipalities:
`AW` Aruba · `CW` Curaçao · `SX` Sint Maarten · Caribbean Netherlands
(Bonaire, Saba, Sint Eustatius)
*Unverified premise: a Kingdom-level board of financial supervision —* College
financieel toezicht *(Cft) — publishes recurring supervisory reports on these
budgets. If it exists, it is a supervisory publication naming the documents it
supervises, which is rare and valuable. Also: do these use the Dutch BBV, which
this corpus already holds as a node, or something else? And do the Caribbean
Netherlands use the US dollar while being part of an EU member state?*

**Danish Realm.** Both outside the EU while Denmark is in it:
`GL` Greenland · `FO` Faroe Islands
*Unverified premise: Greenland's Self-Government Act 2009 fixes a block grant
(*bloktilskud*) and may specify an indexation or adjustment mechanism. If it
names an index, that is a documented indexation clause of exactly the kind this
project collects. Statistics Greenland and Hagstova Føroya both publish.*

**United Kingdom.** Crown Dependencies first, then the territories that receive
budgetary aid:
`JE` Jersey · `GG` Guernsey · `IM` Isle of Man · `GI` Gibraltar ·
`BM` Bermuda · `KY` Cayman Islands · `MS` Montserrat · `FK` Falkland Islands
*The UK is already in this corpus (`gb-*`, ten nodes) including the CIPFA Code.
The question is whether the Crown Dependencies use it, use IFRS, or use their
own. Montserrat and St Helena are the budgetary-aid cases where a transfer
instrument should exist.*

**France.** The only group here that may run a genuinely separate currency:
`NC` New Caledonia · `PF` French Polynesia · `WF` Wallis and Futuna ·
`YT` Mayotte · `RE` Réunion
*Unverified premises: the CFP franc circulates in the Pacific three and is
pegged to the euro; an* Institut d'émission d'outre-mer *publishes on it; New
Caledonia has its own statistical institute (ISEE). The DOM are inside the EU
and the Pacific collectivities are not, which makes the ESA 2010 question —
already the spine of this corpus's EU work — directly testable across one
metropolitan state.*

**Others, if there is time:**
`AX` Åland (Finland — an annual settlement, *avräkning*, may be formula-based) ·
`PT` Azores and Madeira (Portugal — *Lei das Finanças Regionais*) ·
`ES` Basque Country and Navarre (Spain — the *concierto económico* and
*convenio*, a real fiscal formula with a documented quota calculation) ·
`PR` Puerto Rico (US — the PROMESA Oversight Board publishes certified fiscal
plans, which are formula-heavy and unusually explicit about their data inputs)

---

## Item 16 — ANZSIC and ANZSCO, and why this one is separate

Not a realm question. A single high-value target that I want whether or not the
matrix gets finished.

`naics` — the North American Industry Classification System, jointly owned by
the US, Canada and Mexico — is the most-cited node in my entire corpus, with
eight inbound edges. **ANZSIC** (Australian and New Zealand Standard Industrial
Classification) and **ANZSCO** (occupations) appear to be its exact structural
twin: single classifications co-published by the Australian Bureau of
Statistics and Stats NZ.

- **16a.** Exact published title, edition, and publisher(s) of ANZSIC and
  ANZSCO. Quote the title page. **Is the ABS or Stats NZ named first, and are
  both named as publishers?** Joint badging is the whole point.
- **16b.** Quote any passage in an **ABS** release that names ANZSIC as the
  classification used.
- **16c.** Quote any passage in a **Stats NZ** release that names ANZSIC as the
  classification used. Stats NZ's DataInfo+ metadata repository
  (`datainfoplus.stats.govt.nz`) is server-rendered, fetches cleanly and is
  where the methodology text lives — the release pages themselves are
  JavaScript and will give you nothing.
- **16d.** Does either classification's own front matter name a **parent**
  international standard — **ISIC** for ANZSIC, **ISCO** for ANZSCO? Quote it.
- **16e.** Any other jointly-badged Australia–New Zealand document: the
  **Australia New Zealand Food Standards Code**, Trans-Tasman Mutual
  Recognition, joint accounting-standards convergence between the AASB and the
  XRB. Titles and publishers, and whether either names the other's releases.

## Item 17 — The census, stated plainly

While doing everything above, keep a running count of two things. Return them
as entries with `item: "17a"` and `item: "17b"` whenever you hit one.

- **17a — `AUDITS`.** Every case where one jurisdiction's audit institution is
  named as the auditor of another jurisdiction's accounts. Quote the appointing
  provision. I have two confirmed (New Zealand → Niue, New Zealand → Tokelau)
  and I need to know whether the real number is five or fifty.
- **17b — `SUPERSEDES`.** Every case where a document states that one programme,
  fund or instrument **replaces or succeeds** another. I have one confirmed
  (the UK Shared Prosperity Fund succeeding EU structural funds). Dependent
  territories are a promising hunting ground, because EU accession, Brexit and
  decolonisation all created successor funding instruments.

Both of these are schema questions I cannot settle by reasoning. They need a
count.

## Contingency clauses, still open

Third brief running. A clause telling you what to do **when the input stops
existing** — a splice provision, what happens if a central bank stops
publishing a rate, a power to substitute a different index. Flag
`"CONTINGENCY CLAUSE"`.

Small jurisdictions that import an index they do not control are the best place
to look, and this brief is nothing but small jurisdictions that import indices
they do not control. If there is a good one anywhere, it is in here.

---

## Priority order

1. **Compact of Free Association — FM, MH, PW.** The direct structural parallel
   to the Realm. If the answer here is the same three-way split, that is a
   finding on its own.
2. **Greenland and the Faroes.** Non-EU jurisdictions of an EU member state,
   with a block grant that may carry an indexation clause.
3. **Item 16, ANZSIC/ANZSCO.** Cheap, and it connects two countries I already
   hold.
4. **Kingdom of the Netherlands.** The Cft supervisory reports, if they exist,
   are a document type this corpus has no example of.
5. **Crown Dependencies — Jersey, Guernsey, Isle of Man.**
6. **France — New Caledonia and French Polynesia.** The separate-currency case.
7. Everything else.

**Question B is the one I would keep if I could keep only one**, across every
jurisdiction you reach. The accounting-framework answer is interesting; the
auditor answer is the one that decides whether I widen the schema, and it is
the one nobody has ever counted.

---

## Corpus ids you may be able to match against

Nothing in the jurisdictions above has an id yet — this brief is what creates
them. Propose nothing; quote titles exactly as the documents word them.

International anchors already present, and the ones most likely to be named:

```
bis-basel-framework, cpi-manual, esa-2010, icls-work-statistics-resolution,
imf-bpm6, imf-gfsm, ipsas, naics, oecd-frascati-manual, sna-2008,
un-census-principles
```

Metropolitan-state nodes already present, for the cases where a dependency
cites its metropole's own framework:

```
gb-cipfa-code (UK local authority accounting code), nl-bbv (Dutch municipal
accounting decree), nz-pbe-ipsas-1, nz-xrb-a1, au-aasb1049, psab-psas (Canada)
```

If a dependency's accounts cite one of those by name, that is a metropolitan
export of method and it is the finding this whole brief is hunting for. The
Realm of New Zealand produced not one.

---

## The failure modes, restated

1. **A confident quote from a document never opened.** The `access` field
   exists so you never have to choose between useful and accurate.
2. **Hunting for a better quote instead of reporting the weak one.** The ratio
   of titled citations to `agency_only` ones is a measurement. Discarding the
   weak ones destroys it.
3. **New, and the reason for the `PARAPHRASE` flag: smoothing.** Round two of
   the last brief tidied a country's accounting policy note into cleaner
   English and lost a named valuer doing it. These documents are often badly
   written, badly scanned and internally inconsistent. **That is data.** Quote
   them ugly.
