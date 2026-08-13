# Research Brief VII — the Realm of New Zealand, round two

Same rules as Briefs IV, V and VI. **You are reading documents and quoting
them. You are not deciding anything.** No verdicts, no "this counts", no
DOCUMENTED / CONFIRMED. You extract, I adjudicate.

---

## What round one did

Twenty entries, eighteen marked `"opened"`. **I re-fetched every one of those
eighteen against its primary source and all eighteen hold up verbatim.** That
is the first external batch on this project with a perfect verification rate.
The `access` field did exactly what it was built to do, and the two entries you
marked `NOT FOUND` were worth as much to me as the positive ones.

Three results are now minted or minting:

- **Cook Islands** reports on **IPSAS**, by name and by standard number, audited
  by its own Audit Office under the PERCA Act.
- **Niue** names **no external standard at all** — *"prepared in accordance with
  the accounting policies of the Government of Niue"* — and its auditor then
  opines against those same self-defined policies.
- **Tokelau's** Finance Rules 1998 put the **Auditor-General of New Zealand** in
  as auditor. Your Niue documents also showed John Ryan signing Niue's accounts
  under **Article 60 of the Constitution of Niue**, which I had not expected.

Taken together those say something I want this round to test properly:
**New Zealand exports assurance to the Realm, but not method.** It supplies the
auditor and not the accounting standards. That is the opposite way round from
the European pattern, where the instrument supplies the method and never names
the obliged party.

### Four things to change in how you return entries

1. **One provision per entry — entry 1b bundled two.** The Statement of
   Responsibility and Note 1 *Statement of compliance* are separate passages in
   separate parts of the document. Both were accurate; they needed to be two
   objects with two `location` values.
2. **Do not put an id in `existing_ids` unless it is the same document.** Entry
   1d quoted *System of National Accounts 1968* and listed `sna-2008`. SNA68 and
   SNA 2008 are different documents thirty years apart, not a drifted title.
   Deciding they are the same is adjudication, which is mine. When a quote names
   something close to but not identical with a corpus id, leave `existing_ids`
   empty and say so in `notes`.
3. **`CONFLICT` applies across documents, not just within one.** You could not
   see that the Statistics Office page describes a GDP series ending in 2001
   while the 2026/27 Budget forecasts off quarterly GDP to June 2025. If two
   documents you open in this brief cannot both be current, flag both.
4. **Reproduce extraction artefacts rather than tidying them.** One quote came
   back with "Asian" where the PDF's own text layer reads "A sian". You were
   right about the word, and the cleanup cost me twenty minutes proving the
   quote existed. If the text layer is broken, quote it broken and note it.

### One new field, and it is now required

Add a `dates` object to every entry drawn from a dated document:

```json
"dates": {
  "covers": "FY ended 30 June 2018",
  "published": "unknown",
  "signed": "30 November 2020",
  "audited": "30 November 2020"
}
```

Use `"unknown"` freely — an absent date is information. **The reason this
matters:** the Cook Islands' most recent full financial statements cover FY2018
and were signed and audited on 30 November 2020, a twenty-nine-month lag, and
Niue's latest Report to the Assembly covers 2022, 2023 and 2024 in one
document. My graph records how often a document appears per year. Calling any
of these "annual" would be a lie, and I cannot correct it without the dates.

Everything else about the output format is unchanged from Brief VI: newline-
delimited JSON objects, `access` field on every entry, `agency_only` when the
quote names an institution and no publication, `NOT FOUND` with the searched
strings, write as you go.

---

## Item 8 — The arrears question

New, and it goes first because it changes how I model everything else.

For **each** of the Cook Islands, Niue and Tokelau, establish the **actual
publication record** of the annual financial statements and the annual budget:

- **8a.** The **most recent** set of government financial statements that
  exists in public, its coverage year, and its signature and audit dates. Quote
  the dates from the document.
- **8b.** The **list** of years for which statements have been published, as far
  back as you can see them on the publisher's site. A bare list of years with
  URLs is fine here and does not need quotes.
- **8c.** Any passage in an audit report, an Audit Office report, a PEFA
  assessment or a legislature paper that **describes the backlog itself** —
  states that accounts are in arrears, overdue, or not yet submitted. Quote it.
  The Cook Islands Audit Office and the New Zealand Auditor-General are both
  likely to have said this in writing.
- **8d.** Same three questions for the **budget** documents, which I expect to
  be far more punctual than the statements. I want the contrast measured.

## Item 9 — What Niue's accounting policies actually are

Niue is the most interesting node in the Realm precisely because it cites
nothing, and I want to know whether that is a gap or a choice.

- **9a.** **Note 2 of the Government of Niue consolidated financial statements,
  quoted in full**, or as many separate entries as it has subsections. It is
  headed *Summary of Significant Accounting Policies* and it is the document
  that the auditor's opinion is measured against. I have read only 2.2. I want
  all of it.
- **9b.** **The time-series test.** Find Niue financial statements from earlier
  years — 2015, 2010, 2005, as far back as they go. Did Niue **ever** name IPSAS,
  New Zealand GAAP, or any external standard in its statement of compliance?
  Quote the earliest and latest versions of that statement you can find. **If it
  once cited a standard and stopped, that is the finding of this brief.** If it
  never did, that is also the finding.
- **9c.** Any Niue statute — the Constitution, a Public Finance Act, a Treasury
  instruction — that specifies what basis the public accounts are to be prepared
  on. Quote it with its section number. Article 58 and Article 59 of the
  Constitution appear in the statements already; find whether anything goes
  further.
- **9d.** Any passage in a New Zealand Auditor-General publication, a PEFA
  report, or an IMF/ADB technical assistance report that **comments on** Niue's
  accounting basis. Someone external has almost certainly written about this.

Flag anything in 9a–9d with `"SELF_REFERENTIAL"` if the document defines its
compliance by reference to itself or to its own policies.

## Item 10 — Resolve the Cook Islands national accounts conflict

The Statistics Office methodology page says the national accounts are *"largely
based on the United Nations Systems of National Accounts 1968 (SNA68)"* and
describes a series published *"from the year 1982-2001"*. The 2026/27 Budget
forecasts off *"Real and nominal GDP – quarterly data to June 2025"*. Both
cannot describe the current programme.

- **10a.** Find the **current** Cook Islands national accounts release — exact
  title, cadence, most recent reference period. Quote the masthead.
- **10b.** Find whatever the **current** release says about its own methodology.
  Does it name **SNA 2008**, **SNA 1993**, **SNA68**, or nothing? Quote it.
- **10c.** Quote the Statistics Office page passage again with its `dates` —
  when was that page last updated? If it carries no date, say `NO CITABLE
  LOCATION` and describe where you looked.
- **10d.** Does the Cook Islands publish **Government Finance Statistics**? The
  Statistics Office site lists it as a category. If it exists, does it name the
  **IMF GFSM** by edition, the way the Budget does?

## Item 11 — The regional machinery (Brief VI Item 5, not reached)

This is where I expect cross-border citations to live, because small statistical
offices lean on regional bodies and say so in their methodology notes.

- **11a.** **Pacific Community (SPC)**, Statistics for Development Division, and
  the **Pacific Data Hub**. What does SPC publish recurrently, under what exact
  titles and cadence? Quote any passage where an SPC release names a national
  statistical office's own publication as its source.
- **11b.** The reverse direction — any passage in a Cook Islands, Niue or
  Tokelau release that names an SPC product by title.
- **11c.** **ADB** *Key Indicators for Asia and the Pacific* and *Pacific
  Economic Monitor*. Their source notes are per-table and unusually precise.
  Quote the source note and give the table number. Do they name Realm-country
  releases by title?
- **11d.** The Cook Islands Budget says its forecasting model *"has been
  developed using technical assistance from the A sian Development Bank"*. Is
  there a **published** ADB technical assistance report behind that model? If so,
  exact title and whether it names its data inputs.
- **11e.** **PFTAC** (Pacific Financial Technical Assistance Centre) appears in
  the Cook Islands Budget's own acronym list. Does PFTAC publish anything
  recurrent, and does any Realm document name a PFTAC output by title?

## Item 12 — The bilateral instruments

Round one found the relationships described but never the instruments named.
Both of these are now specific leads rather than guesses.

- **12a.** **Tokelau.** The Administrator's report to the New Zealand Parliament
  refers to *"the signing of a formal 'Joint Declaration on Principles of
  Partnership'"*. Find that document. Exact title, date, signatories, and quote
  any provision that obliges either side to **produce or publish** something.
- **12b.** **Niue.** The Auditor-General's Report to the Assembly describes
  *"annual budget support, annual sector support, annual funding for
  administrative and technical assistance"* from New Zealand. Find the titled
  instrument behind those payments — a Joint Commitment for Development, a
  Statement of Partnership, a country programme document, an arrangement or
  exchange of letters. Quote any reporting or publication obligation in it.
- **12c.** **Cook Islands.** Same question. The Budget's acronym list includes
  `ACPP Australia Cook Islands Partnership Program` and `PCA Project Cooperation
  Agreement` — so titled instruments exist. Find the New Zealand equivalent.
- **12d.** For any instrument found in 12a–12c: does it name a **document** the
  recipient must publish, or only an agency and an amount? `agency_only: true`
  is the expected answer and I need the count.

## Item 13 — Tokelau inside New Zealand's own Estimates (Brief VI Item 3c, reopened)

You marked this `NOT FOUND` with `access: "search-snippet-only"`, which was the
right call. It is worth one more targeted attempt, because a New Zealand
document naming a Tokelau function runs the opposite direction to everything
else in this brief.

The document is *The Estimates of Appropriations for the Government of New
Zealand*, published annually by the New Zealand Treasury, organised by Vote,
each Vote a separate PDF at `treasury.govt.nz`. Treasury serves PDFs to
ordinary clients without challenge — I have pulled several this week.

- **13a.** Open the most recent **Vote Foreign Affairs and Trade** Estimates PDF.
  Quote every appropriation scope statement naming Tokelau, Niue or the Cook
  Islands, with the appropriation title and page.
- **13b.** If Tokelau has its own Vote or its own appropriation line, quote its
  scope statement in full.
- **13c.** The same search in the **Estimates of Appropriations** summary volume
  and in **Vote Pacific Peoples** if it exists.
- **13d.** New Zealand's **Official Development Assistance** reporting: does
  MFAT publish a recurring titled release, and does it name the **OECD DAC
  Creditor Reporting System** or a DAC reporting standard by title?

## Item 14 — The indexation question (Brief VI Item 6, not reached)

The corpus's favourite edge shape is an indexation clause: a statute or
regulation saying a payment moves with a **named published index**. All three
Realm jurisdictions use the New Zealand dollar, which makes them candidates for
importing a New Zealand index outright.

Search the Cook Islands, Niue and Tokelau statute books, pension and
superannuation legislation, minimum wage instruments and public service pay
determinations for any provision tying a rate to a named index — the New Zealand
CPI, a local CPI, or anything else. Quote it with its section number.

PacLII (`paclii.org`) carries consolidated legislation for all three and is
where you found the Tokelau Finance Rules. Start there.

If a provision names an index without a publisher, or a publisher without an
index, quote it and set `agency_only` accordingly. I want the count either way.

## Item 15 — The asymmetry, restated

Round one answered this sideways and I want it answered directly.

**Do not tell me about the constitutional status of these jurisdictions. Tell me
what their documents cite.**

- **15a.** Do Cook Islands or Niue statistical or fiscal releases cite **SNA
  2008**, the **IMF GFSM**, **BPM6**, or the **CPI Manual** by title? The Cook
  Islands Budget already cites GFSM 2014; I want to know whether that is
  isolated or a pattern, and whether Niue does anything equivalent.
- **15b.** Is there any document in which **New Zealand, SPC, ADB, the IMF or the
  UN system obliges** a Realm jurisdiction to compile or publish something, and
  names what? Quote the obliging provision with its number. This is the half I
  am missing: I have found plenty of citation upward and no obligation downward.
- **15c.** **Ross Dependency.** Close the no. Is there any recurrently published
  official statistical or financial document for the Ross Dependency, from any
  publisher? I expect nothing. A confirmed nothing is a result I will record.

---

## Contingency clauses, still open

Carried forward from Briefs V and VI. If you find a clause telling you what to
do **when the input stops existing** — a splice provision, what happens if a
central bank stops publishing a rate, a power to substitute a different index —
return it as its own object with `flags: ["CONTINGENCY CLAUSE"]`.

Small-jurisdiction statutes remain the best place to look, because they import
indices they do not control and someone must have thought about it. Item 14 is
the natural place to trip over one.

---

## Order, if you run short

Item 9 (9a and 9b first), then Item 8, then Item 13, then Item 10, then Item 12,
then Item 11, then Items 14 and 15.

**9b is the single entry I would keep if I could keep only one.** Whether Niue
once cited an external accounting standard and stopped is the difference between
a gap and a decision, and no amount of reasoning gets me there — only the older
documents do.

---

## Corpus ids you may be able to match against

Cook Islands, Niue and Tokelau have no ids yet; this round and the last are what
create them, so propose nothing and just quote titles exactly as the documents
word them.

International anchors already present:

```
bis-basel-framework, cpi-manual, icls-work-statistics-resolution, imf-bpm6,
imf-gfsm, ipsas, naics, oecd-frascati-manual, sna-2008, un-census-principles
```

New Zealand:

```
nz-district-valuation-roll, nz-la-annual-reports, nz-lgfa-annual-report,
nz-mbie-accommodation-data, nz-mbie-tect, nz-mbie-tif, nz-nzta-far-policy,
nz-pbe-ipsas-1, nz-rva1998, nz-rvr2008, nz-statsnz-gfs, nz-statsnz-lac,
nz-statsnz-national-accounts-income, nz-statsnz-qlas, nz-treasury-befu,
nz-treasury-fsgnz, nz-wellington-annual-report, nz-wellington-rates,
nz-xrb-a1
```

---

## The two failure modes, restated because round one avoided both

1. **A confident quote from a document that was never opened.** Round one had
   none. The `access` field is why. Keep marking `"memory"` and
   `"search-snippet-only"` honestly — a lead labelled as a lead costs me
   nothing, and I will still use it.

2. **Hunting for a better quote instead of reporting the weak one.** Entry 1e
   returning `agency_only: true` for the ADB model note was correct and useful.
   The ratio of titled citations to agency-only citations is a measurement I am
   making, and discarding the weak ones destroys it.

A third, new to this round: **do not smooth over an absence.** If Niue's Note 2
turns out to define its accounting policies without reference to anything
external at all, quote the whole thing and let it be strange. That strangeness
is the most interesting thing round one found and I would rather have it
plainly than have it explained.
