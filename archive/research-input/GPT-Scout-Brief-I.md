# Scout Brief I — South America

You are the first researcher in a new series. Nothing has been asked of you
before, so this brief starts from the beginning. Read the whole thing; the
conventions in it are not decoration, they are the reason the results are
usable.

---

## What the project is

I maintain a graph of official economic reports. **Every node is a recurrently
published official report, release or dataset. Every edge is a documented
statement that one report uses another as an input.**

The whole thing rests on one rule:

> **If no document says it, the edge does not exist.**

Not "it obviously must", not "the agency clearly uses it", not "any competent
statistician would". If Brazil's Tesouro Nacional publishes a transfer
calculation and does not say in writing where the population figure came from,
then there is no edge, and the fact that there is no edge is itself a finding I
record. Inference is worthless here. Plausibility is worthless here. Only
documents count.

The graph currently holds 278 reports and 331 dependencies across Canada, the
United States, the European Union and its member states, the non-EU European
states, Australia, New Zealand, and the Realm of New Zealand.

**South America is empty. Not thin — empty. Zero nodes.** The colour palette
has had a family reserved for it since a redesign months ago and nothing has
ever been put in it.

---

## What this brief is, and what it is not

**This is reconnaissance. Do not quote anything.**

There is a second kind of brief in this project that asks for verbatim
passages, copy-pasted, with section numbers, which then get re-verified
against the primary source before anything is recorded. That is the extraction
round, and it is slow and exacting.

This is the round before it. **I want to know what exists, who publishes it,
what it is called, how often it appears, and whether I can retrieve it.** What
the documents actually say is the next round's problem, and what you return
here decides where that round gets sent.

A note on why this matters, from experience: scouting that quietly turns into
extraction produces confident-sounding passages that have not been checked, and
those are worse than nothing, because someone has to disprove them later. A
scouting entry that says "there is a methodology section around page 12 and I
did not read it" is honest, cheap, and exactly what I need.

---

## Output format

Newline-delimited JSON. One object per **document**, not per country — a
country with six documents gets six objects. Send them as you go rather than
assembling everything and transmitting at the end.

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
  "fetch": {
    "status": "ok",
    "format": "pdf",
    "notes": "served to a plain request; text-layer PDF, not scanned"
  },
  "names_sources": "unknown",
  "location_pointer": "Anexo, 'Notas metodológicas'",
  "characterisation": "Statutory bimonthly budget execution report required of every federative entity under the fiscal responsibility law.",
  "access": "opened",
  "flags": []
}
```

### Field rules

**`exact_title`** — as the publisher writes it, **in the original language**,
with original accents and capitalisation. `title_english` is a separate field
for your gloss. Do not translate in `exact_title`; I have been burned by
translated titles that turn out not to match anything searchable.

**`doc_type`** — one of `financial-statements`, `budget`, `budget-execution`,
`statistics-release`, `methodology`, `statute`, `transfer-formula`,
`audit-report`, `valuation`, `accounting-standard`, `other`.

**`cadence`** — `annual`, `quarterly`, `monthly`, `bimonthly`, `irregular`,
`one-off`, `unknown`. **One-off documents cannot be nodes in this graph** — a
node has to recur — so flagging a one-off saves the next round a wasted look.

**`fetch`** — the field I value most, and the one no researcher volunteers.
Retrievability has been the binding constraint on this project every single
week. New Zealand's legislation site returns an empty response to anything that
is not a browser. The Pacific legal database returns 403. Denmark's legal
register is a JavaScript application that serves nothing. Two of three New
Zealand city councils block ordinary requests. Every one of those cost hours to
discover the hard way.

So: `status` is `"ok"`, `"403"`, `"js-rendered"`, `"login-required"`,
`"pdf-only"`, `"not-found"` or `"unknown"`. `format` is `"pdf"`, `"html"`,
`"scanned-pdf"` (images, no text layer — a real and common problem in this
region), `"xlsx"`, `"unknown"`. In `notes`, say what you actually tried.

**`names_sources`** — `"yes-titled"`, `"yes-agency-only"`, `"no"`, or
`"unknown"`. Does the document appear to name its own data inputs, and by
publication title or only by agency? This predicts whether extraction will pay
off. **`"unknown"` is a perfectly good answer.** Do not read a document to fill
this in; if a table of contents or a visible methodology heading tells you, use
it, otherwise say unknown.

**`location_pointer`** — where the next round should look. "Nota metodológica",
"Anexo III", "Independent Auditor's Report", "§5". An address, never a quote.

**`access`** — `"opened"` if you actually retrieved the document,
`"search-snippet-only"` if you saw it in results and did not open it,
`"memory"` if you are recalling it rather than looking, `"blocked"` if you
tried and were refused. **There is no penalty for `"memory"` or
`"search-snippet-only"`.** There is a large penalty for labelling either of
them `"opened"`, because everything marked `"opened"` gets checked.

---

## The five things to look for, per country

1. **The national statistics office** and its recurring outputs — national
   accounts, CPI, government finance statistics.
2. **Central government budget and budget execution** reporting.
3. **Audited government financial statements**, and who audits them.
4. **A fiscal transfer formula** — any statute or regulation that divides money
   among subnational governments.
5. **A property valuation or cadastral system** feeding local taxation.

Number 4 is the one I care most about, and here is why. This corpus's most
valuable edges have all had the same shape: a funding formula that names, by
exact published title, the dataset it divides money by. The Dutch municipal
fund's technical guide does it. Ontario's partnership fund appendix does it.
The UK's social care formula names census tables by code. **Several South
American countries appear to have constitutional revenue-sharing formulas
operating at national scale — potentially the largest and most explicit
instances of this shape anywhere in the world — and none of them are in the
graph.**

Number 5 matters because the corpus already holds three property-valuation
chains — New South Wales' Valuer-General, the Netherlands' WOZ system, New
Zealand's rating valuation rolls — and a fourth from a different legal tradition
would be genuinely informative.

---

## The countries, and the leads I have

Everything below is an **unverified premise**. I have not opened any of these.
Confirm or refute; do not assume I am right. If a lead turns out not to exist,
that is a useful entry.

**Brazil (`BR`) — highest priority, likely the richest.**
IBGE for statistics. Secretaria do Tesouro Nacional for fiscal reporting,
including the bimonthly and quarterly reports required under the fiscal
responsibility law (*Lei de Responsabilidade Fiscal*, LC 101/2000). The
*Fundo de Participação dos Municípios* and *Fundo de Participação dos Estados*
are constitutional transfers that I believe are calculated partly from IBGE
population figures — **if a normative act names an IBGE release by title, that
is the single most valuable thing in this brief.** Also FUNDEB for education
funding, the MCASP accounting manual, the NBC TSP standards and whether they
state a relationship to IPSAS, and the Tribunal de Contas da União as auditor.

**Colombia (`CO`).**
DANE for statistics. The *Sistema General de Participaciones* is a
constitutional transfer system that I believe uses DANE population data. IGAC
for cadastral valuation. Contraloría General as auditor.

**Chile (`CL`).**
INE for statistics, DIPRES for budget. The *Fondo Común Municipal* is a
municipal equalisation fund. The Servicio de Impuestos Internos runs the
*avalúo fiscal* property valuation, which is the closest South American analog
I know of to the valuation chains already in the corpus. Contraloría General.

**Argentina (`AR`).**
INDEC for statistics. *Coparticipación Federal de Impuestos* (Ley 23.548) is
the federal revenue-sharing regime. Auditoría General de la Nación.

**Peru (`PE`).** INEI, FONCOMUN, Ministerio de Economía y Finanzas, Contraloría.

**Then, more briefly:** Uruguay (`UY`), Bolivia (`BO`), Ecuador (`EC`),
Paraguay (`PY`), Venezuela (`VE`), Guyana (`GY`), Suriname (`SR`).

**Regional bodies.** CEPAL/ECLAC publishes recurrently and at scale, and is the
obvious regional anchor. Also worth a look: Mercosur, the Comunidad Andina
(which I believe issues binding statistical *Decisiones*), and the
Inter-American Development Bank.

**French Guiana** is deliberately excluded — it belongs to a parallel brief.

---

## Volume

Thirteen countries plus regional bodies, five document classes each. **A
complete return is on the order of 100 objects.** Go wide before you go deep.
An entry with a correct title, a working URL and `"unknown"` in every
analytical field is useful; a country you never reached is not.

**Required, as your final message: a coverage ledger.** One object with
`item: "LEDGER"`, listing every country above under `covered`, `partial`, or
`not_attempted`. I would rather be told Suriname was skipped than have to infer
it from silence.

## Priority, if you run short

Brazil, then Colombia, then Chile, then Argentina, then CEPAL, then Peru, then
the rest. Brazil and Colombia are where the transfer formulas are, and the
transfer formulas are why this brief exists.

---

## Four ways this goes wrong

1. **Quoting.** You are not quoting. If you want to, leave a
   `location_pointer` instead.
2. **Inferring a document into existence.** If a country plainly ought to
   publish audited accounts and you cannot find them, the answer is
   `"status": "not-found"` with the searches you ran — **not a plausible-looking
   URL**. A guessed URL is worse than a blank, because I have to prove it wrong.
3. **Reporting only what looks impressive.** A statistics office that publishes
   nothing but scanned images with no text layer is a finding. A transfer
   formula that names only an agency and never a publication is a finding, and
   I count those deliberately. Log the disappointing ones.
4. **Deciding things.** You characterise; I adjudicate. Do not tell me a
   document "would make a good node" or that two things are "the same
   standard". Two researchers on this project have now tagged a 1968 statistical
   framework as its 2008 successor and one classification as a different
   country's classification. Related is not identical, and that call is mine.
