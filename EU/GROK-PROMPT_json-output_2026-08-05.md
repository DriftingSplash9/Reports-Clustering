# Prompt for Grok — single JSON deliverable

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Those two are the complete instruction
set. This supersedes the output format in `GROK-BRIEF_between-nations_2026-08-05.md`
if you were given that file too — the targets and traps below are the same
research, but **everything you find goes into one JSON object**, not markdown
lists, so Thomas can paste it directly into the project's master data.

---

## 1. Your job in one sentence

**Find documents where one country, or an international body, states in its own
words that it depends on another country's or body's published statistic —
then hand back every quote you found as entries in a single JSON object,
following the schema in §5 exactly.**

You are doing research and compiling, nothing else. **You do not decide whether
something counts as a real edge.** You quote, you cite, you categorize what kind
of finding it is, and you stop there. A person reviews every entry before
anything is added to the graph.

**Why this matters enough to say twice:** an earlier round of this research was
asked for verdicts instead of quotes. Seven verdicts came back; four held, one
was refuted by the very quote offered as its own proof, and the extraction was
good throughout — only the judgment failed, and it failed in one direction:
toward yes. So: **quote, categorize, do not conclude.**

---

## 2. What the project is, briefly

A 3D graph where every **node** is a document published on a recurring schedule,
and every **edge** is a documented statement that one report uses another as an
input. The rule underneath everything:

> **If no document says it, the edge does not exist.**

A named document has to state, in its own words, that report A depends on report
B. Every finding needs a URL pointing at the document that says so.

**Why you're being asked to look at this specifically.** The project's founding
finding, from its Canada/US half, is that national statistical systems have
**zero documented direct cross-border edges** — Canada and the US touch only
through shared international standards, never each other directly. The EU branch
exists to test whether that is a fact about Canada and the US, or a fact about
national statistics generally. So far it has found the EU's own regulations
oblige member states but do not *name* them (`AGENCY ONLY`), while member states
*do* name the EU regulations they comply with. **Your job is to extend that test**
— between EU member states directly, to non-EU bodies (NATO, OECD, WTO...), and
deeper into one or two national systems.

---

## 3. What counts as a node — the three-part test

1. **A document names it.**
2. **It is published on a recurring cadence** — daily to once-a-generation is
   fine. Something published once is not a node.
3. **It has a title.** *"the Federal Statistical Office"* is not a node. A
   specific named survey or report is.

When a quote names an institution but no titled publication, that is
**`AGENCY ONLY`** — record it as a `non_finding`, not a discarded thought. Its
frequency is itself informative.

**Termini** — real, named inputs that are not publications — go in their own
category. Four kinds: `unpublishable` (a form, an administrative record),
`unidentified` (a named slot something else fills), `redistributed` (reached only
via an intermediary that publishes nothing itself), `confidential` (collected and
deliberately never released).

---

## 4. The two traps

### 4a. Agreement language is not dependency language

These words look like a dependency claim and are not one: *comparable with,
equivalent to, **consistent with**, harmonised with, aligned with, in line with*.

**Worked example, because this exact phrase already fooled a researcher on this
project this week:**

> "The ESA 2010 **is consistent with** the worldwide guidelines on national
> accounting set out in the System of National Accounts 2008 (2008 SNA)."

Looks like ESA 2010 depends on the UN's SNA 2008. It doesn't — it's agreement
between two frameworks. It was logged, proposed as "near-certain," and refuted
the next day.

**Contrast, from the same research, which DOES carry a dependency:**

> "…the methods and sources used for the compilation of the gross domestic
> product and the gross national income of the Federal Republic of Germany
> **in compliance with** the European System of National Accounts (ESA) 2010."

> "Legal bases: Regulation (EC) No 549/2013, European System of National and
> Regional Accounts (ESA) 2010."

**Compliance with, legal basis, based on, calculated from, shall use** → real
dependency. **Consistent with, in line with, harmonised with** → not, usually.

**Record the non-dependencies too**, as `non_finding` with `kind: "non_dependency"`
— they stop the same plausible link being proposed again next month.

### 4b. Tense

*"Up to and including 2003, X was benchmarked to Y"* describes a dead
arrangement, not a live one, and reads exactly like a live one if you don't
check the verb tense. Record `"tense": "past"` whenever a relationship is stated
in the past tense, and say so in `notes`.

---

## 5. Output — the JSON schema, exactly

**One JSON object, one code block, at the very end of your response** (research
narrative before it is fine, but the JSON block must be complete and stand
alone — Thomas needs to copy just that block).

```json
{
  "meta": {
    "researcher": "grok",
    "date": "YYYY-MM-DD",
    "targets_covered": ["list the §8 target areas you actually worked"],
    "targets_not_reached": ["and the ones you did not get to"]
  },
  "candidate_nodes": [
    {
      "id": "proposed-kebab-case-id",
      "title": "exact title as the document gives it",
      "publisher": "exact publisher name",
      "country_or_body": "ISO code if a country, or the body's name if international/supranational",
      "jurisdiction_level_hint": "one of: international, supranational, federal, provincial, municipal, institutional — your best guess, not final",
      "cadence_hint": "what the document says about frequency, verbatim if possible",
      "url": "the document you actually opened",
      "supporting_record_id": "the id of the candidate_edges or non_finding entry that establishes this, so it can be traced back"
    }
  ],
  "candidate_edges": [
    {
      "id": "short-kebab-case-id-unique-in-this-file",
      "source": "the dependent report — use a candidate_nodes id, or a plain description if not yet a node",
      "target": "the report depended upon — same rule",
      "relationship_word": "the actual word or phrase the document used — 'in compliance with', 'based on', 'shall use', etc. Do not translate this into calculated_from/uses_data_from/etc yourself — just report the words.",
      "url": "the document you actually opened, final URL if redirected",
      "location": "section, article, paragraph, footnote, or table row — as precise as the document allows",
      "quote": "verbatim, in quotation marks, in the ORIGINAL LANGUAGE if not English",
      "quote_translation": "your English translation, only if quote is not in English, otherwise omit this field",
      "tense": "present or past",
      "notes": "anything odd — a conflict with another quote, a hedge, whether this is really a 4a agreement-language case you're flagging for review anyway"
    }
  ],
  "non_findings": [
    {
      "id": "short-kebab-case-id",
      "subject": "what was searched",
      "kind": "one of: agency_only, not_found, non_dependency, documented_conflict",
      "url": "the document searched",
      "location": "section/article/paragraph",
      "quote": "verbatim quote showing the AGENCY ONLY naming, the non-dependency language, or one side of a conflict",
      "notes": "for documented_conflict, quote BOTH sides and say plainly that they disagree — do not pick one"
    }
  ],
  "termini": [
    {
      "id": "short-kebab-case-id",
      "named_input": "what is named",
      "kind": "one of: unpublishable, unidentified, redistributed, confidential",
      "url": "the document naming it",
      "location": "section/article/paragraph",
      "quote": "verbatim quote"
    }
  ]
}
```

**Rules for filling this in:**

- **Never bundle.** One `candidate_edges` or `non_findings` entry per provision,
  footnote, or table row. A prior round returned fourteen quotes under one
  heading with no way to cite any of them individually — all fourteen were
  unusable.
- **`quote` is never a paraphrase.** Copy-paste it. If it's long, quote all of it
  rather than trimming the operative clause.
- **If you cannot find a citable location**, write `"NO CITABLE LOCATION"` in
  `location` and give the nearest heading instead of leaving it blank.
- **Every object needs a unique `id` within its own array** — short, kebab-case,
  memorable enough that Thomas can find it again in your narrative if he needs
  more context.
- **If you run low on room mid-task, stop and output the JSON you have rather
  than continuing and losing everything.** A previous session lost roughly
  900,000 tokens of finished research because it kept researching past a limit
  instead of stopping to output what it already had.

---

## 6. Do not duplicate these — use these exact id strings if you match them

```
esa-2010, eu-draft-budget, ec-statement-of-estimates, eurostat-hicp,
eurostat-farm-structure-survey, eurostat-remuneration-update-report,
de-destatis-national-accounts, lu-statec-ipch, lu-statec-ipcn,
sna-2008, imf-bpm6, imf-gfsm, ipsas, bis-basel-framework,
naics, un-census-principles, icls-work-statistics-resolution, cpi-manual
```

Full list: `Research.1.md` §9.

---

## 7. What's already established — you're extending it, not starting cold

> **The EU's own instruments oblige member states but do not name them.
> Member states name the EU instruments they comply with.**

Two EU regulations followed to the member-state boundary both landed
`AGENCY ONLY`. Two member states (Germany, Luxembourg) independently name EU
regulations as the *legal basis* of their own national statistics, in structured
metadata with a title and a stated cadence. **Does this hold outside statistics?
Does it hold for non-EU bodies obliging member states from outside (NATO, WTO)?
Does it hold between member states directly, with no EU instrument involved at
all?** Those three questions are your job.

---

## 8. Where to look, in priority order

### A. Direct member-state-to-member-state (the strongest possible finding)

Look for one country's release naming **another country's** release directly, or
several naming a shared non-EU-regulation instrument:

1. **Nordic co-operation** — Nordic Statistics database, NOSOSCO, NOMESCO.
   Crosses the EU/non-EU line (Norway, Iceland are not EU) — a genuinely novel
   edge shape if found.
2. **Benelux Union** — pre-dates the EU, has its own secretariat and output.
3. **Baltic Assembly** (Estonia, Latvia, Lithuania); **Visegrád Group** (Czechia,
   Hungary, Poland, Slovakia).
4. **Mirror/reconciled trade statistics** between two named countries.

### B. EEA/EFTA — obligation to non-members

Norway, Iceland, Liechtenstein are bound to EU statistical law via the EEA
Agreement without being members; Switzerland via bilateral treaties. If
Statistics Norway names an EU regulation as its own legal basis, that's a novel
edge — obligation running to a state with no vote in creating it.

### C. Non-EU international bodies obliging or feeding national statistics

Ranked by expected strength of result:

1. **NATO** — *Defence Expenditure of NATO Countries* uses an agreed NATO
   definition members report against, and discusses where national accounting
   differs from it. Check specifically whether it **names** national
   publications or only says "data provided by member states." Note: EU ≠ NATO —
   Austria, Ireland, Cyprus and Malta are EU but not NATO, a natural control
   group if a defence-reporting obligation binds the other 23 and not these 4.
2. **OECD** — publishes recurrently, wide EU membership overlap, statistical
   output routinely names national sources.
3. **WTO** — trade statistics harmonisation, members reporting under
   WTO-defined categories.
4. **WHO** — the International Classification of Diseases (ICD) as a coding
   standard national health statistics cite directly.
5. **Financial Stability Board, IOSCO, IAIS, FATF** — sector standard-setters
   (systemic risk, securities, insurance, anti-money-laundering) that national
   regulators are documented as implementing — same shape as Basel (already a
   node in this graph), untested for these.
6. **ISO** — technical/statistical standards (e.g. country codes) that national
   offices cite as their classification basis.
7. **IFRS Foundation** — accounting standards national corporate-reporting
   rules are documented as adopting. Private standard-setter with real legal
   traction, same shape as IPSAS (already a node) on the public-sector side.
8. **World Economic Forum** — expect a weaker result. It cites national
   statistics but obliges no one; the honest relationship is `cites`, not a
   dependency. Still worth one or two entries if you find a clean citation —
   flag `"notes": "non-official, cites-only"`.

### D. Deep national-language extraction — one country done thoroughly

Germany is already done and is the model: its inventories name sources by title
**and** by German statistical register number (EVAS). Do the same depth for one
more country:

1. **France — INSEE**, which publishes detailed *sources et méthodes*
   documentation.
2. **Italy — ISTAT**; **Netherlands — CBS**; **Spain — INE**; **Poland — GUS**.

Also worth a pass: **national central banks** (Banque de France, Banca d'Italia)
— the German case already names the Bundesbank as responsible for compiling a
component of the national accounts, and central-bank-feeds-national-statistics
is a documented shape from the Canadian side too.

**Non-English sources are expected and preferred where they're more specific
than the English summary.** Quote the original language, translate underneath.

---

## 9. The seven things that matter

1. **Quote verbatim, with a location.** Unquotable is unusable.
2. **One entry per provision.** Never bundle.
3. **No verdicts, ever.** Categorize and quote; do not conclude.
4. **`agency_only` and `not_found` are results.** Count them, don't chase past them.
5. **"Consistent with" is not a dependency** — but record it as `non_dependency` anyway.
6. **Check the tense.** A dead arrangement reads exactly like a live one.
7. **Output the JSON as you go if you're running long — do not lose finished work
   chasing one more target.**

If you're unsure whether something belongs in the JSON: **include it with its
quote.** The expensive failure on this project has never been too much raw
material — it has always been a confident conclusion resting on nothing
checkable.
