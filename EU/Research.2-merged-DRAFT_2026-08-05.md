# Research.2 — standing brief (DRAFT MERGE, 2026-08-05, for review)

**This is not yet a governing brief.** `Research.1.md` explicitly reserves the
decision to issue a replacement to "the other end of the process" — not to a
research session — so this file is produced as a **draft merge for Thomas's
review**, not silently adopted. Every session since `G.24.md`'s predecessor has
flagged the `Research.2.md`/`Research.EU.md` merge as the branch's longest-
standing open housekeeping item; this draft closes the editorial work.
**Until Thomas says otherwise, `Research.1.md` remains the document actually
in force**, and every hand-off should keep citing it as the governing brief.

**Source documents merged, both located and read in full 2026-08-05** (`G.39.md`):
`EU/Research.2.md.docx` (v2.1, 2026-08-02) and `EU/Research.eu.docx` (v0.1,
2026-08-02). Both had been mis-cited as root-level `.md` files by every hand-off
since `G.19.md` — a location error, not a content one; see `G.39.md` Corrections.

---

## What changed from Research.1.md, and why

`Research.2.md.docx` turned out to be **near-identical to `Research.1.md` in
§§1–7 and §10** — same corpus framing, same one rule, same extraction
discipline, same two traps, same output format, same "how to find good
documents" section. Three real differences, and this draft resolves all three
(the five inputs prior hand-offs flagged, condensed to three decisions):

1. **§8 ("What to work on") is missing entirely from Research.2.** Not
   truncated — absent. This draft does **not** restore Research.1's Canada/US
   §8 verbatim, because the branch's actual work since 2026-08-02 has been
   overwhelmingly EU-focused, and a priorities section that ignores the
   EU galaxy entirely would be actively misleading. **Resolution**: §8 below
   folds Research.1's original Canada/US priority queue and Research.EU's own
   §10 EU priority queue into one list, reconciling what prior hand-offs
   called "the E5 priority-queue reconciliation" — there was never a
   numbered "E5" item; the phrase meant exactly this fold-in, referenced
   under the branch's "E — Everything the blob split created" backlog
   letter without ever being written out.
2. **§9's node-id codeblock is present in Research.2 only as an intro
   paragraph — the actual list is missing.** **Resolution**: §9 below points
   explicitly at `Research.1.md` §9 as the list's only authoritative copy,
   per the first of prior hand-offs' known inputs, rather than duplicating
   100+ ids into a second file that will drift.
3. **Research.2 adds a genuinely new standing rule Research.1 does not have**:
   the Part B Output Rule (2026-08-02), requiring a savable Part B soft-
   connections list at the close of every batch or hand-off. **Resolution**:
   carried forward verbatim as §11 below — it is already being followed
   (`EU/PartB_soft_connections_2026-08-04.md`/`.json` exist), so dropping it
   from a merged brief would formalise less than current practice already
   does.

`Research.eu.docx` is not a competing standing brief — it is explicitly
scoped as an EU-specific supplement ("§§3–8 identical to Research.2"), so this
draft folds its EU-specific sections (topology, priority queue, legal spine)
into the base document rather than keeping two files a future session has to
read in sequence and reconcile by hand, which is exactly the failure mode
that made this merge overdue in the first place.

**One substantive rule question, flagged rather than silently decided**:
Research.eu.docx §2 states "Every edge carries a URL (**or Official Journal
reference**) pointing at the document that says so" — a relaxation of
Research.1/2's stricter "Every edge carries a URL." **This draft narrows
rather than adopts the relaxation**: in practice, every OJ reference used
across 40+ EU sessions has been paired with an ELI/EUR-Lex URL (the corpus's
own `evidence_url` field has never been populated with a bare OJ citation and
no URL). §2 below states the rule as "a URL, or an Official Journal
reference paired with its ELI URL" — codifying actual practice rather than
either the stricter or the looser reading. **This is exactly the kind of
call `Research.1.md`'s own framing says belongs to Thomas, not a session** —
flagged explicitly for his sign-off, not smuggled in as settled.

---

## 1. What this is

There is a project that draws a 3D graph of official reports and statistical
releases. Each **node** is a document that gets published on a schedule. Each
**edge** is a documented statement that one report uses another as an input. Node
size is a PageRank-style authority score: a report that many others depend on is
large.

The point of it is to answer one question — **what would break if this changed?**
If Statistics Canada revised the Consumer Price Index basket, you should be able
to see, at a glance, that the Alberta escalator, AISH benefit rates, the CPP
disability amount and a municipal budget all move. If Eurostat revised the ESA
2010 transmission programme or the EBS Regulation (2019/2152), the downstream
national accounts, structural business statistics, labour-force aggregates and
fiscal-surveillance indicators used by the Commission, the Council and the
member states should be visible the same way.

**As of `G.39.md` (2026-08-05), the corpus holds 150 reports and 220
dependencies** — no longer just Canadian federal and Alberta material plus a
US federal cluster and international standards, but a genuine second galaxy:
the EU branch, Eurostat, the European Central Bank/ESCB, DG ECFIN, one member
state (Germany) with a second (Luxembourg) begun, and Section III of the EU's
own Draft Budget, partially sampled.

**Your job is to read documents and quote them.** Someone else decides what the
quotes mean. That division is not a courtesy — it was measured, and section 3
explains why.

---

## 2. The one rule everything else serves

> **If no document says it, the edge does not exist.**

Not "it's obviously true". Not "everyone knows the Bank of Canada watches
employment". A named document has to state, in its own words, that report A uses
report B. **Every edge carries a URL — or, where no stable direct URL exists,
an Official Journal reference paired with its ELI (European Legislation
Identifier) URL** — pointing at the document that says so. (This is the one
place this draft narrows Research.eu.docx's own wording rather than adopting
it unchanged — see *What changed*, above; flagged for Thomas's decision.)

This has a visible cost and the cost is the point: real programmes with
unpublished inputs get dropped from the graph. That is the standard working, not
a bug.

So the most valuable thing you can send back is **a verbatim quotation with a
location**. The least valuable thing you can send back is a summary of what a
document is about.

---

## 3. Extract; do not adjudicate

This was tested. An earlier round asked for verdicts — "does this edge exist,
yes or no". Seven came back: four held, **one was refuted by the very quote
offered as its proof**, and one had a direction error that the reader noticed,
wrote down, and then overrode.

The extraction in all of them was good. The judgement was not, and it failed in
one consistent direction: **toward yes.**

A later submission of 24 proposed edges was written as finished conclusions with
paraphrased justifications. **Two survived** — and both were the two that
happened to include a quoted string. Where there was no quote there was nothing
to check.

So:

- **There is no verdict field in this brief.** Do not write DOCUMENTED, CONFIRMED,
  VALID, NOT-FOUND-THEREFORE-NO, or "this counts as an edge".
- **Do not paraphrase a passage you could quote.** A verbatim quote is checkable
  in minutes. A paraphrase is not checkable at all.
- **Do not resolve conflicts — report them.** If two passages disagree, or a
  passage points the opposite way to what an item asks about, quote both and say
  plainly that they disagree. Do not pick. "These point opposite ways" is an ideal
  answer.

You are better at reading documents than the process is at checking judgements.
The split plays to that.

---

## 4. What counts as a node

A node is **a recurrently published document that another document names as an
input to itself.**

Subject matter is not the boundary. This started as an economics project and the
economics turned out to be an accident of where documented chains happened to be —
municipal tax bylaws and provincial assessment guidelines are among the best
material in it. Health, environment, justice, education, trade and occupational
material are all in scope now, **provided the chains are written down.**

Three things bind instead:

1. **A document names it.** Section 2.
2. **It is published on a cadence.** Once a day, once a month, once every five
   years — fractional is fine, "about once a generation" is a real answer. But
   something published once is not a node.
3. **It has a title.** "Statistics Canada" is not a node. *Survey of Employment,
   Payrolls and Hours* is.

Point 3 is the one that comes up constantly, and it has its own instruction in
section 6: `AGENCY ONLY`.

### Termini — things that are named but cannot be published

Some inputs are real, named, load-bearing and impossible to point at: the CRA
PD7 remittance form behind the Survey of Employment, Payrolls and Hours; GST
files; T1/T2 tax records; the Federal Reserve's FR 2644 reporting form. Those
are recorded as **termini** — nodes that exist to say *the chain stops here,
and here is why*.

Four kinds:

| Kind | Meaning |
|---|---|
| `unpublishable` | Real, named, not a publication. A form, an administrative record. |
| `unidentified` | The document names a *slot* and something outside it fills the slot. Alberta's bitumen regulation sets an index from "the commodity brokers specified" in a list a Minister sets by order. |
| `redistributed` | Reached via an intermediary that publishes nothing of its own — a data vendor republishing someone else's series. |
| `confidential` | Collected and deliberately never released. |

**What this means for you:** when a document names an input that turns out to be
a form, a tax record, a vendor feed or a ministerial appointment, **that is a
result worth reporting, not a dead end.** Quote it and say what kind it looks
like.

---

## 5. Two traps that have already cost this project

Both are things a perfectly accurate quotation can still get wrong.

### 5a. "Comparable with" is not a dependency

These phrases turn up in methodology prose in exactly the position a dependency
claim would occupy, and they are not dependency claims:

> comparable with · equivalent to · consistent with · analogous to ·
> harmonised with · aligned with · benchmarked against *(sometimes — read it)*

Four real examples, all of which nearly became edges:

- A StatCan record says its monthly GDP estimates are made *"more comparable
  with"* the expenditure-based data. That is agreement between two outputs, not an
  input.
- The Survey of Employment, Payrolls and Hours says *"comparisons with independent
  sources such as the Labour Force Survey are performed."* The word **independent**
  is doing the work.
- The National Occupational Classification is *"comparable to"* the international
  ISCO standard — and the same passage says *"certain conceptual differences...
  limit comparability."*
- NAPCS says outright it is *"not fully compatible with"* the UN's Central Product
  Classification.

**Quote them anyway.** A documented non-dependency is worth as much as an edge —
it stops the same plausible-looking link being proposed every few months. Just do
not present it as a dependency.

**A fifth example, from the EU branch (added in this merge)**: a national
statistical office stating its own release "conforms to the same methodological
principles" as an EU-harmonised counterpart, without itself being subject to
the EU regulation that governs that counterpart, is the same trap in a
supranational key — see `lu-statec-ipcn`'s treatment in
`src/data/research/lu-statec-cpi.json`, where the IPCN's "same principles"
language was deliberately not extended into an edge that the IPCH's
"conformément aux dispositions du Règlement" language did support.

### 5b. Tense — a document can describe a dead arrangement in the present layout

A Statistics Canada methodology page says:

> *"Up to and including 2003, the MSM was benchmarked to the Annual Survey of
> Manufactures and Logging (ASML)."*

Verbatim, correctly located, in the methodology section — and describing an
arrangement that ended twenty-two years ago. Nothing in the format catches it,
because every check is about whether the document says it, not about **when**.

These pages are living documents with historical notes folded in and no visual
separation between the two. **If a relationship is stated in the past tense, say
so explicitly in your entry**, and if you can, find the live statement from the
other document. In the case above, the annual survey's own page says in the
present tense that its data *"are used by"* the monthly survey — which is what
made the edge real.

---

## 6. Output format

Two parts. **Part A is what matters. Part B is a convenience and is never
authoritative.**

### Part A — the extraction record

For **every** item, one entry per provision, per footnote, per table row. Never
bundle. A previous round returned fourteen good quotes under one heading marked
"illustrative cluster"; none carried its own section number, so none could be
cited, so **all fourteen were discarded.** Good research, unusable packaging.

Each entry has exactly these fields:

```
URL:       the document you actually opened. If redirected, the final URL.
LOCATION:  section, subsection and paragraph — "s. 6(1)(a)", not "s. 6".
           Or footnote number, table number, or heading.
           If there is no citable location, write NO CITABLE LOCATION and
           give the nearest heading.
QUOTE:     verbatim, copy-pasted, in quotation marks. No tidying, no
           ellipsis inside the operative clause. If the sentence is long,
           quote all of it.
NAMES:     the actual publications, series or survey titles the quote names,
           one per line. A release is a thing with a title, published on a
           cadence.
TENSE:     PRESENT or PAST. Only when the quote describes a relationship.
NOTES:     anything odd. Conflicts, hedges, the phrases in 5a, whether an
           input looks like a terminus and which kind.
```

Two special values, both of which are **results and not failures**:

- **`AGENCY ONLY`** — write this in place of NAMES whenever a quote names an
  institution and no publication. *"Sources: Statistics Canada"*, *"as determined
  by the Chief Statistician"*, *"data provided by the Bureau of Economic
  Analysis"*. Expect this often. **Do not go looking for a better quote instead of
  reporting it** — the frequency of `AGENCY ONLY` is itself a measurement, and one
  provincial funding formula was found to attribute six of twelve inputs this way,
  which turned out to be the most interesting thing about it. **In the EU branch,
  `AGENCY ONLY` has turned out to be the default rather than the exception** —
  ten of eleven SEC03 budget Titles tested return nothing on the statistics
  watchlist, and the branch's central finding (`EU/slices/README.md`) is that
  disclosure runs upward (national documents name EU instruments) far more
  often than downward (EU instruments naming national releases).
- **`NOT FOUND`** — you searched and it is not there. **Say which strings you
  searched.** Say it even if a whole item comes back empty. A confirmed absence
  gets recorded and used; several are already load-bearing in this corpus.

### Part B — draft JSON (optional, and never trusted on its own)

If you have capacity, follow Part A with a draft JSON slice in the schema below.
It saves transcription time.

**The rule that makes this safe: any claim in Part B that is not backed by a
quote in Part A is deleted without being read.** Part B cannot introduce a node,
an edge, or a fact. It can only re-arrange what Part A already proved. Do not
"fill in" a missing publisher, invent a URL, or guess a cadence to make the JSON
validate — leave the field out and note it in Part A.

```jsonc
{
  "reports": [
    {
      "id": "statcan-lowercase-hyphenated",     // stable, guessable, no spaces
      "title": "Exact Published Title",
      "publisher": "Publishing body",
      "country": "CA",                          // ISO-3166 alpha-2, open string;
                                                  // "CA" | "US" | "INT" | "EU" carry
                                                  // hand-written palette entries
      "jurisdiction_level": "federal",          // international | supranational |
                                                 // federal | provincial | municipal |
                                                 // institutional
      "region": "Canada",                       // or "Alberta", "European Union", ...
      "description": "What it is and why it matters here. Quote the document.",
      "releases_per_year": 12,                  // 12 monthly, 4 quarterly,
                                                 // 1 annual, 0.2 every 5 years
      "changes_per_year": 0.1,                  // optional; NEVER larger than
                                                 // releases_per_year
      "cadence_note": "Quote the frequency statement.",
      "last_updated": null,                     // always null
      "url": "https://...",
      "domains": ["labour"],
      "terminal_reason": "unpublishable"        // ONLY for termini, see §4
    }
  ],
  "dependencies": [
    {
      "source_report_id": "the-one-that-depends",
      "target_report_id": "the-one-depended-on",
      "relationship_type": "uses_data_from",
      "basis": "The verbatim quote, plus which document and where.",
      "evidence_url": "https://..."             // required in practice
    }
  ],
  "_dropped": [
    {
      "edge": "human-readable description",
      "source": "node-id or null",
      "target": "node-id or null",
      "reason": "denied",
      "why": "The quote that refuses it, and where it is."
    }
  ]
}
```

**Edge direction is the single easiest thing to get backwards.** Read it as:
`source_report_id` **depends on** `target_report_id`. The dependent is the
source. Authority accrues at the target. If the CPI is used by the Alberta
escalator, then source = the escalator, target = the CPI.

**`relationship_type`**, strongest to weakest:

| Value | Use when |
|---|---|
| `calculated_from` | The output is mechanically derived. Arithmetic. |
| `uses_data_from` | The target's figures are a direct input. |
| `methodology_depends_on` | The target defines a method, deflator or classification the source relies on. |
| `cites` | Referenced as context, not as a computational input. |

Choosing between them is a judgement about what the document actually says — the
Bank Rate is `calculated_from` the policy rate because it is arithmetic, while the
prime rate is only `uses_data_from` it because the Bank's own word is "affects".
**If you are unsure, say so in Part A rather than picking in Part B.**

**`reason`** for `_dropped`: `denied` (a document says it does not hold),
`no-document` (searched, nothing states it), `wrong-target`, `wrong-direction`,
`unpublishable-source`, `unreadable-source`, `no-node-yet` (documented but one end
isn't a node yet), `deferred`, `note`.

`domains`: `inflation`, `labour`, `monetary-policy`, `national-accounts`,
`benefits`, `interest-rates`, `municipal-finance`, `education`, `post-secondary`,
`health`, `fiscal-transfers`, `population`, `taxation`, `assessment`,
`energy-royalties`, `banking`, `financial-regulation`. If nothing fits, say so in
Part A — the list can be extended, but only at the other end.

---

## 7. How to find the good documents

Bought expensively. Follow these before general searching.

- **Statutes and regulations beat webpages, and are usually available.** The
  strongest material in this corpus is regulations quoting their inputs by name. A
  webpage saying two things are related is usually not enough; a regulation naming
  a series is.
- **Look for a "Data sources" section or a data-sources appendix.** Statistics
  Canada's IMDB records have one. Ontario's municipal grant technical guide has an
  Appendix F listing every data element the formula consumes and where each comes
  from. **A document that names its own inputs in a table is the strongest
  evidence class there is**, and it is rare outside statute. When scoping a funding
  programme, read the technical guide's appendices before the prose.
- **Municipal tax rate bylaws are keystones.** By statute a bylaw must state the
  assessment it levies against and every requisition it collects for another body.
  Six edges out of one PDF, twice.
- **When a document turns out to name one source, sweep it for all of them.** One
  source table named an index in 64 separate rows and nobody had noticed, because
  nobody had searched for that index specifically. Grep the whole document.
- **Expect disclosure to stop one level short of a title.** *Who produced it* is
  usually given; *what it is called* is often not. Budget for that as the normal
  case rather than the disappointing one, and report it as `AGENCY ONLY`.
- **Consolidated statute pages truncate.** Long instruments on laws-lois and
  similar sites cut off well before the end. A whole-page search returning zero
  hits proves nothing about absence if the retrieval was truncated — use
  section-by-section URLs where they exist, and **say so if you could not retrieve
  the whole thing.**
- **Retired numbering systems.** Older regulations cite CANSIM table numbers;
  current ones cite product identifiers. Matching one to the other is a judgement,
  so quote what the document says and flag it rather than translating.
- **Some public documents are unreadable.** Reports published only through
  page-flipping viewers with no extractable text. That is a finding — report it as
  `unreadable-source` and move on.
- **EU-specific: appendices to Commission budget documents are appendices, not
  separate series, even when they carry their own heading.** SEC03's "Detailed
  reports: A64 Annex 3" and "A65 Annex 2" categories looked like distinct
  publications until their own file names identified them as Appendix 2/3 of
  the report already modelled (`eurostat-remuneration-update-report.json`).
  Check a candidate series' own file metadata before minting it.
- **EU-specific: EUR-Lex and several EU-agency sites gate non-browser HTTP
  clients but are reachable via a real browser.** Confirmed repeatedly
  (`G.31.md` finding 3 onward) for `eur-lex.europa.eu`; two further sites
  (`u4unity.eu`, `ecb.europa.eu`'s PDF host) trigger a file-download response
  to direct browser navigation but are fetchable via `WebFetch`, whose saved
  binary can then be read with `pypdf`.
- **EU-specific: many government and agency sites lazy-load detail behind an
  "Expand all" control.** Confirmed for Legilux (`G.34.md`) and Eurostat's
  civil-servants-remuneration Publications/Methodology pages (`G.35.md`,
  `G.36.md`) — a `get_page_text` call before expanding returns a table of
  contents, not the content.

### One thing that is counter-intuitive

**Do not research a classification standard by reading the classification.** This
was tried and it failed. Classification documents describe alignment,
comparability and concordance — not derivation. Reading NAICS's own documentation
produces almost nothing.

**Read the programmes that are coded to it instead.** Every edge into NAICS in
this corpus came from a survey's methodology page saying it classifies its
respondents by NAICS. The standard is a hub because other documents name it, not
because it names things. The EU branch's own version of this: ESA 2010
(`esa-2010`) accrued its first real edges not from reading the Regulation
itself, but from national statistical offices' own methodology pages stating
they compile "in compliance with" it.

---

## 8. What to work on

**In this order, across two galaxies.** Canada/US work and EU work are
independent tracks; either can be picked up without the other blocking. Each
item is self-contained; finish one before starting the next, and return work
as you finish each item rather than assembling everything at the end.

### Canada/US galaxy

**Item 1 — Interprovincial.** The graph goes four levels deep — international
standard → national statistic → provincial formula → municipal bylaw — in one
province. Adding a second and third province changes what the thing is for.
Income tax indexation (all 13 provinces/territories), disability/income
support rates, provincial statistical agencies (Quebec's ISQ especially), and
property assessment across provinces are the sub-items, in that order.

**Item 2 — Business, banking and industry.** StatCan business programmes
(Business Register, ASSI, QFSE, CIMT), Bank of Canada/OSFI (expect `AGENCY
ONLY`/`NOT FOUND` here and treat both as real answers), banking supervision
returns.

**Item 3 — International standards, entered correctly.** Read section 7's
warning first. The emissions chain (National Inventory Report → IPCC
Guidelines), health classifications from the programmes that use them
(ICD-10-CA, CCI), occupational/trade classifications from the programmes
(NOC, Harmonized System).

**Item 4 — United States, beyond statistics.** Lowest priority; the measured
number of documented direct CA↔US edges is one. The Fed's H.15 footnotes and
the US Treasury daily par yield curve are worth doing if you get here.

### EU galaxy

**Item 5 — Eurostat's own structural publications.** The Statistical
Requirements Compendium and its data-requirement tables; the ESA 2010
transmission programme's own tables (the better test of the branch's central
asymmetry finding than Annex XI turned out to be); the 2025 list of main
statistics (already staged, still needing its nine-record split — see cheap
checks).

**Item 6 — Complete the EU staff remuneration thread.** Eurobarometer
(named, funded, not yet verified live — `G.39.md` cheap check 2); the second
joint ECB-Eurostat "BOP-NA ROW consistency report" (`G.39.md` cheap check 3);
the FSDN/Eurofarm lead (still the branch's strongest unfollowed statistical-
release lead, `SEC03_Title08_PartA_2026-08-05.md` S03-12).

**Item 7 — A second and third member state.** France (INSEE) and Italy
(ISTAT) are the natural next NSIs after Germany and Luxembourg, per
Research.EU's own topology — "only after marginal returns on the first three
remain positive." Luxembourg's own wage-indexation mechanism (Art. 11 of the
loi modifiée du 22 juin 1963) is a cheap same-country extension first.

**Item 8 — SEC03, the EU Draft Budget's own text.** Three of its largest
Titles (08, 05, 07) are sampled; ten of eleven sections/Titles tested across
the whole branch return nothing on the statistics watchlist. **Whether
further blanket Title-by-Title sampling is worth the effort relative to
Items 5–7 is a real question for whoever picks this up next** — flagged, not
decided, in `G.38.md`/`G.39.md`.

**Item 9 — The municipal/local layer, once the member-state layer is
established.** Research.EU's own template: a mid-sized commune/Gemeinde/
comune (~70k population, Grande Prairie scale) that publishes an annual
budget, tax-rate bylaw equivalent, assessment roll and audited statements
under national local-government law. Not started; explicitly gated behind
Item 7's "marginal returns" test.

---

## 9. Node IDs already in use

**The full list lives in `Research.1.md` §9 and is not duplicated here** —
`Research.1.md` remains the only authoritative copy, per the first of the
"five known inputs" prior hand-offs flagged for this merge. Use the exact
strings there when a document names something already in the corpus. Do not
invent variants — `statcan-cpi` is the CPI and `statcan-consumer-price-index`
is a duplicate that has to be found and merged by hand. This has happened
twice.

If a document names something **not** on that list, that is useful and
wanted — just give the name exactly as the document words it, and propose an
id in the same style. **EU-branch convention, established across this
branch's own sessions**: `eurostat-*` for Eurostat-published series,
`<country-code>-<agency>-*` for member-state releases (`de-destatis-*`,
`lu-statec-*`), `ecb-*` for European Central Bank/Eurosystem publications,
`ess-escb-*` for jointly-produced ESS/ESCB material, `ecfin-*` for DG ECFIN.

---

## 10. Summary — the eight things that matter

1. **Quote verbatim, with a location.** A paraphrase cannot be checked.
2. **One provision per entry.** Bundled quotes get discarded whole.
3. **No verdicts.** You extract; someone else adjudicates.
4. **`AGENCY ONLY` and `NOT FOUND` are results.** Report them, count them, do not
   go hunting for something better instead.
5. **"Comparable with" is not a dependency** — but quote it anyway.
6. **Check the tense.** A dead arrangement reads exactly like a live one.
7. **Write as you go**, item by item. Never assemble everything for the end.
8. **Part B never introduces anything Part A did not prove.**

If you are unsure whether something is worth sending: send it with a quote. The
expensive failure in this project has never been too much raw material. It has
always been a confident answer that turned out to rest on nothing.

---

## 11. Part B Output Rule (added 2026-08-02, carried forward from Research.2)

Whenever a research batch or session window is closed, or whenever a
`G.*.md` handover note is requested, the agent **must** also produce a
standalone, savable list of all current Part B soft connections and
provisional observations.

Format requirements:
- Use a clear, machine-readable structure (preferably JSON or a clean
  Markdown table/list).
- Include at minimum: id, from, to, nature of connection, strength, evidence
  pointer, and short notes.
- Keep the list strictly provisional and non-authoritative.
- This Part B list is intended to be saved by the user as a separate file
  (e.g. `PartB_soft_connections_YYYY-MM-DD.md` or `.json`) and to complement
  the `G.*.md` handover notes.

The Part B list should be updated incrementally as new soft connections
become visible from Part A records. Thomas should include the Part B file
with the initial files so awareness can be brought to it.

**Already in active use** — `EU/PartB_soft_connections_2026-08-04.md` and
`.json` exist and are current as of that date.

---

## 12. EU galaxy topology (from Research.EU.md §9, carried forward)

**Apex — supranational.**
- Eurostat (Commission DG) — Statistical Requirements Compendium (annual),
  European System of Accounts (ESA 2010 / future ESA), European Business
  Statistics Regulation and manuals, Principal European Economic Indicators,
  quality reports on national accounts, LFS, BoP/IIP, SBS, etc.
- European Central Bank / ESCB — balance-of-payments and IIP statistics,
  monetary aggregates, HICP (joint with Eurostat). **Three nodes now minted**
  in this apex layer beyond `eurostat-hicp` and `esa-2010`:
  `ecb-eurosystem-annual-balance-sheet`, `ecb-eurosystem-weekly-financial-
  statement`, `ess-escb-mip-quality-report` (`G.39.md`).
- Legal spine: Regulation 223/2009 (European statistics), ESA Regulation
  549/2013, EBS Regulation 2019/2152 (**still unread — item 5, cheap
  checks**), Code of Practice.

**Member-state layer (selected high-authority NSIs first).**
- Germany — Destatis + Land statistical offices (federal structure).
  **Started**: `de-destatis-national-accounts` (`G.19.md` era).
- Luxembourg — STATEC. **Started this branch's own initiative, not in the
  original topology**: `lu-statec-ipch`, `lu-statec-ipcn` (`G.34.md`).
- France — INSEE + ministerial statistical services. **Not started.**
- Italy — ISTAT. **Not started.**
- Others only after marginal returns on the first three remain positive.

**Fiscal / transfer layer.**
- EU budget / Multiannual Financial Framework, own-resources decision,
  cohesion-policy regulations, Recovery and Resilience Facility (where
  documented as recurrent inputs). **Substantially started**:
  `eu-draft-budget`, plus SEC03 Titles 08, 05, 07 sampled
  (`G.29.md`–`G.39.md`).

**Municipal / local layer (template pattern). Not started.**
Major cities (examples for first mapping): Berlin, Paris, Rome, Madrid,
Amsterdam. ~70k-population municipal templates (Grande Prairie scale):
select 2–3 mid-sized communes/Gemeinden/comuni that publish annual budgets,
tax-rate bylaws (or equivalent), assessment rolls and audited statements
under national local-government law. The keystone documents are those that,
by statute, must name the assessment base and any inter-governmental
requisitions they collect. Explicitly gated behind the member-state layer's
"marginal returns" test — see §8 Item 9.

Cadence and authority scores will be driven by the frequency of Eurostat
transmission programmes and the national implementing acts that name them.
