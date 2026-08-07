# Research brief for Grok — inter-nation and national-level nodes, EU galaxy

**Paste this whole file as the first message.** Then paste `Research.1.md`
(project root) immediately after it. Those two together are the complete
instruction set; nothing else is required, though §9 of this brief lists optional
extras.

---

## 1. Your role, and its boundary

**You are doing research and consolidation only.** You read documents, quote
them, and hand back structured records. You do **not** decide whether an edge
exists, and you do **not** write to the project.

This division is not politeness — it was measured, and it is set out in
`Research.1.md` §3. An earlier round asked for verdicts: seven came back, four
held, **one was refuted by the very quote offered as its proof**, and one had a
direction error the reader noticed, wrote down, and then overrode. The extraction
in all of them was good. The judgement was not, and it failed in one consistent
direction: **toward yes.**

A later batch of 24 proposed edges written as finished conclusions with
paraphrased justifications: **two survived**, and both were the two that happened
to include a quoted string.

So:

- **No verdict fields.** Never write DOCUMENTED, CONFIRMED, VALID, or "this
  counts as an edge."
- **Never paraphrase a passage you could quote.** A verbatim quote is checkable
  in minutes. A paraphrase is not checkable at all.
- **Do not resolve conflicts — report them.** If two passages disagree, quote
  both and say plainly that they disagree. *"These point opposite ways"* is an
  ideal answer, not a failure.
- **`NOT FOUND` and `AGENCY ONLY` are results.** Report them, count them, and do
  not go hunting for something better instead.

---

## 2. What the project is

A 3D graph. Every **node** is a document that gets published on a schedule. Every
**edge** is a documented statement that one report uses another as an input. Node
size is a PageRank-style authority score.

It answers one question: **what would break if this changed?**

**The one rule everything else serves:**

> **If no document says it, the edge does not exist.**

Not "it's obviously true." Not "everyone knows." A named document has to state,
in its own words, that report A uses report B. Every edge carries a URL pointing
at the document that says so.

This has a visible cost and the cost is the point: real programmes with
unpublished inputs get dropped. That is the standard working, not a bug.

**The corpus today:** 141 reports, 216 dependencies, 160 recorded
non-edges. Mostly Canadian federal and Alberta material, a US federal cluster, a
layer of international standards, and — new — a small EU cluster.

---

## 3. What counts as a node

**A recurrently published document that another document names as an input to
itself.** Three binding conditions, and all three must hold:

1. **A document names it.** (§2 above.)
2. **It is published on a cadence.** Daily, monthly, once every five years —
   fractional is fine, "about once a generation" is a real answer. **Something
   published once is not a node.**
3. **It has a title.** *"Statistics Canada"* is not a node. *Survey of
   Employment, Payrolls and Hours* is.

Condition 3 is the one that comes up constantly. When a quote names an
institution and no publication — *"data provided by the Federal Statistical
Office"* — write **`AGENCY ONLY`** in place of NAMES. **Expect this often.** Its
frequency is itself a measurement: one provincial funding formula attributed six
of twelve inputs this way, which turned out to be the most interesting thing
about it.

### Termini — named, load-bearing, and impossible to point at

Some inputs are real and are not publications. These are **wanted**, not
discarded:

| Kind | Meaning |
|---|---|
| `unpublishable` | A form, an administrative record. Tax files, reporting forms. |
| `unidentified` | The document names a *slot* and something outside it fills it. |
| `redistributed` | Reached via an intermediary that publishes nothing of its own. |
| `confidential` | Collected and deliberately never released. |

When you hit one, quote it and say which kind it looks like.

---

## 4. The two traps — read these twice

Both are things a perfectly accurate quotation can still get wrong. **Both have
already cost this project real work, and trap 4a has bitten the EU branch twice
in the last week.**

### 4a. "Comparable with" is not a dependency

These phrases turn up in methodology prose in exactly the position a dependency
claim would occupy, and they are **not** dependency claims:

> comparable with · equivalent to · **consistent with** · analogous to ·
> harmonised with · aligned with · in line with · benchmarked against
> *(sometimes — read it)*

**A worked EU example, because this is the trap you are most likely to fall
into.** ESA 2010 (Regulation (EU) No 549/2013), Annex A, ch. 1, ¶1.05 says:

> "The ESA 2010 **is consistent with** the worldwide guidelines on national
> accounting set out in the System of National Accounts 2008 (2008 SNA)."

That looks like the obvious ESA→SNA dependency. **It is not one.** It is
agreement between two frameworks, not derivation of one from the other. It was
proposed as "near-certain" and refuted the next day.

**Contrast with language that *does* carry a dependency**, from the same branch:

> "…the methods and sources used for the compilation of the gross domestic
> product and the gross national income of the Federal Republic of Germany **in
> compliance with** the European System of National Accounts (ESA) 2010."

> "…**based on** the European System of Accounts (ESA) 2010."

> "Legal bases: Regulation (EC) No 549/2013, European System of National and
> Regional Accounts (ESA) 2010."

**Compliance, legal basis, based on, calculated from, shall use** → dependency.
**Consistent with, in line with, harmonised with, comparable to** → not.

**Quote the non-dependencies anyway.** A documented non-dependency is worth as
much as an edge — it stops the same plausible-looking link being re-proposed
every few months.

### 4b. Tense — a dead arrangement reads exactly like a live one

A methodology page may say *"Up to and including 2003, X was benchmarked to Y"* —
verbatim, correctly located, and describing an arrangement that ended twenty
years ago. Nothing in the format catches it. **If a relationship is stated in the
past tense, say so explicitly in your entry.**

---

## 5. Output format — this is the deliverable

For **every** item: **one entry per provision, per footnote, per table row. Never
bundle.** A previous round returned fourteen good quotes under one heading marked
"illustrative cluster"; none carried its own section number, so none could be
cited, so **all fourteen were discarded.** Good research, unusable packaging.

Each entry has exactly these fields:

```
ID:        short-kebab-case, unique within your output
URL:       the document you actually opened. If redirected, the final URL.
LOCATION:  section, subsection and paragraph — "Art. 6(1)(a)", not "Art. 6".
           Or footnote number, table number, or heading.
           If there is no citable location, write NO CITABLE LOCATION and
           give the nearest heading.
QUOTE:     verbatim, copy-pasted, in quotation marks. No tidying, no ellipsis
           inside the operative clause. If the sentence is long, quote all of it.
           If the source is not in English, QUOTE IT IN THE ORIGINAL LANGUAGE
           and put your translation underneath, marked as a translation.
NAMES:     the actual publications, series or survey titles the quote names,
           one per line. Or AGENCY ONLY. Or NOT FOUND.
TENSE:     PRESENT or PAST. Only when the quote describes a relationship.
NOTES:     anything odd. Conflicts, hedges, the §4a phrases, whether an input
           looks like a terminus and which kind.
```

**Non-English sources are expected and welcome** — INSEE, ISTAT, CBS, GUS,
STATEC, Destatis all publish authoritative material in their own languages, and
the national-language version is often more specific than the English summary.
Quote the original.

**At the end**, give me two consolidated lists:

1. **Candidate nodes** — title, publisher, country, cadence, URL, and the record
   ID that supports each. Flag any where you could not establish cadence.
2. **Candidate edges** — source, target, the relationship word the document
   actually used, and the record ID carrying the quote. **Direction matters:**
   read it as *source **depends on** target*. The dependent is the source.
   Authority accrues at the target. If the German accounts are compiled under
   ESA 2010, then source = German accounts, target = ESA 2010.

---

## 6. What is already in the graph — do not duplicate these

The project has been bitten twice by duplicate node ids (`statcan-cpi` vs
`statcan-consumer-price-index`). **If a document names something on this list,
use the exact string.** If it names something new, propose an id in the same
style.

**EU cluster already present:**

```
esa-2010                        European System of Accounts 2010 (Reg. 549/2013)
eu-draft-budget                 Draft general budget of the European Union
ec-statement-of-estimates       Statement of Estimates of the European Commission
eurostat-hicp                   Harmonised Index of Consumer Prices (HICP)
eurostat-farm-structure-survey  Farm Structure Survey (FSS)
de-destatis-national-accounts   National Accounts — Domestic Product (Fachserie 18)
lu-statec-ipch                  Indice des prix à la consommation harmonisé
lu-statec-ipcn                  Indice des prix à la consommation national
```

**International standards already present** (these are the likeliest bridges from
EU material into the existing graph):

```
sna-2008 · imf-bpm6 · imf-gfsm · ipsas · bis-basel-framework · naics · napcs
noc · un-census-principles · icls-work-statistics-resolution · cpi-manual
```

The full node-id list is `Research.1.md` §9 — read it there.

---

## 7. What has already been established, so you can test it rather than rediscover it

The EU branch has one substantive finding. **Your work is the best available test
of whether it generalises.**

> **The EU does not name its national inputs. Its member states name the EU.**

Two binding EU instruments were followed to the national boundary and **both stop
at `AGENCY ONLY`**:

- **Annex XI to the Staff Regulations** (the EU salary-update method) names "the
  Belgian and Luxembourgish authorities", "the ten Member States referred to in
  Article 1(4)", "the national statistical bodies" — three institutions, zero
  publications.
- **ESA 2010's Annex B** — the transmission programme, and the better test — is
  "a programme setting out the **time limits** by which Member States shall
  transmit". Its table overview has four columns: number, subject, deadline,
  period. **No column for a publication.** Destatis, describing its own
  transmission, names ten ESA table numbers and not one German publication.

Running the other way, disclosure is explicit and citable — Germany and
Luxembourg both name EU instruments as the legal basis of their own releases.

**So: the obligation runs downward and the naming runs upward.** Two independent
confirmations so far, both statistical. **Does it hold outside statistics?** That
is the most valuable thing you could tell us.

---

## 8. Your targets, in priority order

### A. Between-nation agreements inside the EU — the main event

The Canada/US work produced one hard finding: **zero standard-compliant direct
official cross-border edges.** The two national systems touch only through shared
international standards. The EU is supposed to be the opposite case. Test it
between *member states*, not just between a member state and Brussels.

Look for documents where one country's release names **another country's**
release, or where several countries name a shared instrument that is not an EU
regulation:

1. **Nordic co-operation** — Nordic Statistics database, NOSOSCO (social
   statistics), NOMESCO (health). Denmark, Sweden and Finland are EU; Norway and
   Iceland are not. A shared statistical product across that line would be
   exactly the shape the graph lacks.
2. **Benelux Union** — a treaty organisation predating the EU with its own
   secretariat and published output.
3. **Baltic Assembly / Baltic Council of Ministers** — Estonia, Latvia,
   Lithuania.
4. **Visegrád Group** — Czechia, Hungary, Poland, Slovakia.
5. **Cross-border and mirror trade statistics** — where two national trade
   statistics are reconciled against each other, each names the other. This is a
   promising and under-explored shape.
6. **Bilateral tax treaties and their statistical annexes**, where a treaty names
   an index or a published rate.

### B. The EEA/EFTA angle — a different instrument shape, possibly the best target here

**Norway, Iceland and Liechtenstein are not EU members but are bound to EU
statistical law through the EEA Agreement**, and Switzerland through bilateral
agreements. That is an obligation running to a *non-member*, which is a different
instrument shape from anything tested so far. If Statistics Norway names an EU
regulation as its legal basis, that is a strong result and a genuinely novel edge.

### C. National-level chains inside one country — deep rather than wide

This is what produced the best Canadian material: a national statistic naming its
own domestic inputs by title. **Germany is already started and is the model** —
its inventories name sources by title *and* by German register number (EVAS): the
Microcensus, Structural statistics in trade and services (EVAS 47410), the
Building and housing census (EVAS 31211), Employment statistics (EVAS 13111) of
the Federal Employment Agency, VAT statistics.

**Do the same for one other country, chosen for depth not breadth.** In rough
order of expected return:

1. **France — INSEE.** Publishes detailed *sources et méthodes* documentation.
2. **Italy — ISTAT.** Strong methodological notes.
3. **Netherlands — CBS.** Excellent English-language methodology.
4. **Spain — INE**; **Poland — GUS**.

Also worth one pass each: **national central banks** (Deutsche Bundesbank, Banque
de France, Banca d'Italia) — the German national accounts already name the
Bundesbank as "responsible for compiling" the financial accounts by sector, and
national central bank → national statistics is a documented shape in the Canadian
material too.

### D. NATO — and a factual correction you should have up front

**No, the EU is not all NATO, and the gap is analytically useful.**

- The EU has **27** members; NATO has **32**.
- **Four EU states are not in NATO: Austria, Ireland, Cyprus, Malta.** (Finland
  joined in 2023, Sweden in 2024.) So 23 of 27 EU states are NATO members.
- Nine NATO members are not in the EU: the UK, Norway, Iceland, Turkey, the US,
  Canada, Albania, Montenegro, North Macedonia.

**Why that matters here:** those four EU-but-not-NATO states are a natural control
group. If a defence-statistics obligation exists for the 23 and not the 4, the
difference is measurable in the graph.

**NATO is a strong target on the merits.** *Defence Expenditure of NATO Countries*
is published annually, uses an **agreed NATO definition** of defence expenditure
that member states are asked to report against, and explicitly discusses where
national accounting differs from that definition. That is an obligation-shaped,
multi-national instrument with named national inputs — **the exact shape the EU
branch has now failed twice to find.** It is also the natural bridge between the
EU cluster and the existing Canada/US cluster, since Canada and the US are both
NATO members.

Check specifically: does the NATO report **name** national publications, or does
it say "data provided by member states" (`AGENCY ONLY`)? Either answer is
publishable.

### E. WEF, OECD, and bodies that publish but do not oblige

**The OECD is the higher-value one** and should come before the WEF: many EU
states are members, it publishes on a cadence, and its statistical publications
routinely name national sources. Also worth checking: **BIS, IMF and the Council
of Europe** — note `imf-bpm6`, `imf-gfsm` and `bis-basel-framework` are already
nodes, so an EU document naming any of them is an immediate bridge into the
existing graph.

**The World Economic Forum** is testable but expect a weaker result. It publishes
recurrently (the *Global Competitiveness Report* and successors) and does cite
national statistics, so it can produce edges — but it is a private membership
organisation, not an official body, and it obliges no one. Under §3's
relationship types the honest answer is likely `cites` rather than
`uses_data_from`. The project does hold commercial sources (J.D. Power, NYMEX,
ICE, Argus), so it is in scope — just flag it as non-official.

**On "NWO"** — there is nothing to research, and the reason is mechanical rather
than political. The project's node test is documentary: a body has to *publish a
titled document on a cadence* that another document *names as an input*. "New
World Order" is not an organisation, has no secretariat and issues no
publications, so it fails condition 1 and condition 3 of §3 before any question
of what one thinks about it arises. There is no URL to put in the URL field.

If what is behind the question is **"which unelected bodies actually set inputs
that national governments are obliged to use"** — that is a real, answerable, and
genuinely interesting question, and it is close to what this whole project
measures. The documented answers so far are things like the IMF (BPM6), the BIS
(Basel framework), the UN (SNA 2008), the IPSAS Board, and the European
Commission. Chase that version. It has documents behind it.

---

## 9. Optional extras to paste, if you want deeper context

Not required. Ask Thomas for these only if you need them:

- `EU/G.34.md` — the current hand-off, full branch state.
- `EU/AnnexB_assessment_2026-08-05.md` — the negative result in §7, in full.
- `src/data/research/de-destatis-national-accounts.json` — the worked example of
  a finished member-state slice.

---

## 10. The eight things that matter

1. **Quote verbatim, with a location.** A paraphrase cannot be checked.
2. **One provision per entry.** Bundled quotes get discarded whole.
3. **No verdicts.** You extract; someone else adjudicates.
4. **`AGENCY ONLY` and `NOT FOUND` are results.** Report them and count them.
5. **"Consistent with" is not a dependency** — but quote it anyway.
6. **Check the tense.** A dead arrangement reads exactly like a live one.
7. **Return work as you finish each target**, not assembled at the end. A
   previous batch lost roughly 900,000 tokens of finished work to a session limit
   that hit before a single write step.
8. **Non-English sources: quote the original**, translation underneath.

If you are unsure whether something is worth sending: **send it with a quote.**
The expensive failure in this project has never been too much raw material. It
has always been a confident answer that turned out to rest on nothing.
