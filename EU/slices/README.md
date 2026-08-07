# EU slices — layout and naming

Set up 2026-08-04. This folder is where verified EU research lands as graph
data. It mirrors `src/data/research/` in format (same `reports` /
`dependencies` / `_dropped` slice schema) and stages here before import.

The schema question that originally blocked import was **resolved the same day**
— see below. Staging remains, but it is now a verification step rather than a
holding pen: a slice sits here until its edges are checked against Part A quotes,
then moves.

Nothing in `_staging/` is verified. Nothing anywhere here is wired into
`src/data/index.ts` yet.

## Current contents (2026-08-07)

**2026-08-07 — `ess-quality-framework.json` graduated (`EU/G.50.md`).** 5 reports,
6 dependencies, 9 `_dropped`; built from staging batches 16–26, 30–37, 44, 45 and
66, which turned out to be one subject rather than twenty-two. Corpus 363/429,
`validate` and `check` green. The slice file is kept here as well as in
`src/data/research/` — it is the first `eu-level/` slice not deleted after import,
because its Part A record (`EU/ESSQualityFramework_PartA_2026-08-07.md`) is
referenced from it. **It also puts the folder's central asymmetry finding under
pressure from a new direction** — see the note appended to that section below.

| File | State |
|---|---|
| `eu-level/` | **`ess-quality-framework.json` (2026-08-07) is here; eight earlier slices have graduated.** `eu-draft-budget.json` (2 reports, 1 dependency, 11 `_dropped`), `esa-2010.json` (1 report, **0** dependencies, 4 `_dropped`), `eurostat-farm-structure-survey.json` (1 report, **0** dependencies, 3 `_dropped`), `eurostat-hicp.json` (1 report, now **0** dependencies of its own — see below — `_dropped` cleared, imported 2026-08-05, found via `EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`), `eurostat-remuneration-update-report.json` (1 report, **2 dependencies**, 2 `_dropped`, imported 2026-08-05, found via `EU/EurostatRemunerationReport_PartA_2026-08-05.md`), `eurostat-remuneration-satellite-series.json` (3 reports — Intra-EU interim, Extra-EU interim, Estate Agency Rent Surveys — **1 dependency**, 1 `_dropped`, imported 2026-08-05) and, **new this session**, `eurostat-remuneration-mission-expenses-report.json` (1 report, **1 dependency**, 1 `_dropped`, imported 2026-08-05) — all staged here, checked, and imported to `src/data/research/` and registered in `src/data/index.ts`. **The mission-expenses node is the branch's first EU cadence derived by counting an irregular observed publication record** (five reports across 2015–2026) rather than from a document stating a rate — flagged honestly in its own `cadence_note` rather than smoothed over. It carries a documented edge, `eurostat-remuneration-mission-expenses-report → eurostat-hicp` (`uses_data_from`), on the Methodology page's "uses information already established, including... the harmonised index of consumer prices." The satellite slice's own record stands: the Publications page's "A64 Annex 3" and "A65 Annex 2" detailed reports turned out to be appendices of `eurostat-remuneration-update-report` itself, not a separate series — investigated and deliberately not minted, per the `Report.part_of` double-counting finding already in `src/lib/types.ts`. |
| `member-states/` | **Empty — two slices graduated.** `de-destatis-national-accounts.json` (1 report, **1 dependency**, 4 `_dropped`) — the branch's **first cross-layer edge** and first member-state node, imported 2026-08-05. `lu-statec-cpi.json` (2 reports, **1 dependency**, 2 `_dropped`, imported 2026-08-05, found via `EU/STATEC-CPI_PartA_2026-08-05.md`, following the AXI-02 lead) — Luxembourg's first node, and the branch's second `methodology_depends_on` member-state→EU edge (`lu-statec-ipch → eurostat-hicp`), same shape as the German one. The corpus is now **150 reports, 220 dependencies, 165 dropped notes**. **New this session**: `eurosystem-ecb.json` (3 reports — the Eurosystem's annual consolidated balance sheet, its weekly financial statement, and the joint ESS-ESCB MIP quality report — 0 dependencies, 2 `_dropped`, opening priority item C after nineteen hand-offs unchanged) and `ecfin-business-consumer-surveys.json` (1 report, 0 dependencies, 0 `_dropped`, found sampling SEC03 Title 07 — a 1961-vintage monthly DG ECFIN survey programme, confirmed live). |
| `cross-layer/` | Empty **for a documented reason, and the reason has now changed** — see below. |

`esa-2010` imported with **no edges at all**, which the loader supports
deliberately: *"Isolated reports are kept, as of V0.12"*, after dropping them
turned out to lose well-researched nodes. It shows under `validate`'s
*ISOLATED — reports with no surviving edge, kept and shelved*. That is the
correct home for it until the cadence question below is answered.

## The asymmetry — disclosure runs upward, not downward

This is the branch's most useful result so far and it was not what the folder
layout anticipated.

**The EU instruments do not name national publications.** Two have now been
followed to the boundary and both stop at `AGENCY ONLY` — Annex XI (the salary
method) and ESA 2010's Annex B (the transmission programme). Recorded as
`_dropped` in `eu-draft-budget.json` and `esa-2010.json`.

**But national documents do name the EU instrument.** Two German inventories each
state, in their own words, that they compile GDP/GNI *"in compliance with"*
ESA 2010 — obligation language, not the "consistent with" agreement language that
§5a rules out. Those are real `methodology_depends_on` edges running
**member state → EU**, and they are currently `no-node-yet` leads only because
neither document states its publication cadence.

**The first cross-layer edge landed in `member-states/`, not `cross-layer/`** —
`de-destatis-national-accounts → esa-2010`, `methodology_depends_on`, on
Destatis's own quality-report metadata:

> "Legal bases: Regulation (EC) No 549/2013, European System of National and
> Regional Accounts (ESA) 2010, and supplementary and amending regulations …
> Periodicity: quarterly, annual"

**This revises the folder rule at the top of this file.** `cross-layer/` was
defined for edges "where an EU instrument obliges or feeds a member state, or a
member state feeds an EU aggregate", named for the instrument creating the
obligation. The edge found is neither shape: it is a member-state publication
naming an EU instrument as **its own legal basis**. That is a property of the
German statistic, so it belongs in Germany's file.

**`cross-layer/` is still the right home if an obligation-shaped edge ever turns
up — but two searches for one have now failed** (Annex XI, Annex B), and the
`wrong-direction` entry in the German slice records the specific edge the branch
expected and did not find.

**A route worth knowing.** The methodology documents are a dead end for this
purpose: the German GNI inventory says *"Periodicity: non-recurring"* in its own
colophon while naming its own 2021 predecessor — a documented conflict that
cannot be adjudicated here. **The published release sidesteps it**, because its
periodicity is stated plainly. When a member-state dependency looks blocked on
cadence, check whether the *release* states what the *methodology document* does
not.

**This folder's workflow is now proven end to end**, which is the useful part:
write here → validate structurally → check against Part A quotes → move to
`src/data/research/` → register in `src/data/index.ts` → `npm run validate`.

The three questions that gated that first import were resolved as follows, and
the answers are reusable:

- **Domain gap** — `Research.1.md` §6's `Domain` union has no `public-finance`
  value and EU institutional budgets are administrative expenditure, not
  transfers. **Stopped blocking** when the domain *filter* turned out to be
  unfinished scaffolding and was removed (`REPORTS.md` → *Decisions*).
  `domains` is now inert metadata; `fiscal-transfers` stands as least-wrong.
- **URL granularity** — the node URL points at Section V, the document actually
  opened, per §6. Every other node in the corpus points at a specific document.
- **Series vs edition** — modelled as the recurring series with the edition named
  in the description. This matches the corpus: **72 of 74 annual reports carry no
  year in the title**, while versioned standards (SNA 2008, GFSM 2014, BPM6) do.

**The EU nodes are currently a disconnected component** — one edge between them,
zero to the other 133 reports. Expected, not a defect. The likeliest first bridge
is **ESA 2010 → `sna-2008`**, since `sna-2008` is already a node and ESA 2010 is
the European implementation of it.

## Why `cross-layer/` is still empty, and what that means

The folder was created for the edge shape the Canada/US pair lacks: a documented
obligation running from the supranational layer to national releases. **Two
independent binding instruments have now been followed to that boundary and both
stop at `AGENCY ONLY`.**

- **Annex XI to the Staff Regulations** (the salary-update method): national
  inputs are "the Belgian and Luxembourgish authorities", "the ten Member States
  referred to in Article 1(4)", "the national statistical bodies". No
  publication named. `EU/AnnexXI_PartA_2026-08-05.md`.
- **ESA 2010 Annex B** (the transmission programme, and the better test): the
  Regulation calls it "a programme … setting out the time limits"; the table
  overview has four columns — number, subject, deadline, period — and no column
  for a publication. Destatis, describing its own transmission, names ten ESA
  table numbers and no German publication.
  `EU/AnnexB_assessment_2026-08-05.md`.

Both are recorded as `_dropped` entries with `reason: "no-document"` in
`eu-draft-budget.json`, which is where a searched-for-and-not-found edge belongs.

**Added 2026-08-07 (`EU/G.50.md`) — the asymmetry is about the legislative layer,
and the self-regulatory layer runs the other way.** The ESS quality stack built
this session is four documents deep and every link is stated by the *dependent*
document about itself, downward and outward: the ESS Handbook names SIMS
(*"fully incorporates SIMS 2.0 … within the overarching SIMS framework"*), and
SIMS's own concepts are, in Eurostat's words, *"derived from the statistical data
and metadata exchange (SDMX) cross-domain concepts published in the SDMX
glossary"* — an international standard nobody legislated. No Regulation appears
anywhere in the chain. The upward-disclosure finding above is not refuted; it is
narrowed. Where the EU binds by Regulation it names nobody; where it coordinates
by agreement it names its sources freely.

**This does not mean the folder was a mistake.** It means the prior stated in
this README — that the EU would be the opposite case — is under real pressure,
and the finding is worth more than the edges would have been. Both assessments
were made at one remove (Annex XI was never retrieved; Annex B was read as staged
records), so a third instrument of a different kind — EBS Regulation 2019/2152 —
is the natural check before anyone treats it as settled.

---

## Folders

| Folder | What goes in it | Example filename |
|---|---|---|
| `eu-level/` | Nodes published by an EU body — Eurostat, ECB, Commission, the institutional budget sections | `eurostat-national-accounts.json` |
| `member-states/` | Nodes published by one member state's own bodies. **One file per country**, prefixed with the ISO code | `de-destatis-national-accounts.json` |
| `cross-layer/` | Edges where an EU instrument obliges or feeds a member state, or a member state feeds an EU aggregate. **This is the interesting layer** — see below | `esa2010-transmission-programme.json` |
| `_staging/` | Mechanical output of the blob split. Read-only working area, never imported | — |

### The cross-layer folder is the point

The Canada/US graph has one strong finding that took twelve sessions to
measure: **zero standard-compliant direct official CA↔US edges**. The two
national systems touch only through shared international standards.

The EU is the natural test of whether that is a fact about Canada and the US or
a fact about national statistical systems generally — and the prior is that the
EU is the opposite case, because ESA 2010 is a *Regulation*, not a standard
countries opt into. A regulation with a transmission programme in its Annex B
is a documented obligation running from the supranational layer to 27 national
ones, which is exactly the edge shape the CA↔US pair lacks.

So: an edge from a member-state release to an EU instrument goes in
`cross-layer/`, not in that country's file. Keep them findable as a set.

Naming: `<instrument>.json`, named for the document that creates the
obligation — `esa2010-transmission-programme.json`,
`bop-regulation-184-2005.json`. Not for the countries involved; one instrument
usually binds many.

---

## ✅ Blocker — RESOLVED 2026-08-04

**The schema now expresses an EU node, and slices here can be imported.** Thomas
took the decision on 2026-08-04; it is recorded in `REPORTS.md` under *Decisions*
as "`country` is an open ISO code, not a closed union". What shipped:

- **`country` takes any ISO-3166 alpha-2 code.** `'DE'`, `'FR'`, `'IT'` are all
  valid; `'CA' | 'US' | 'INT' | 'EU'` survives only as an autocomplete hint. A
  member state is its own code — **filing one as `INT` is now a bug**, not a
  shrug, and the graph's rendering will not hide it.
- **`JurisdictionLevel` gained `supranational`**, for the EU layer itself. A
  member-state NSI stays `federal` — it is federal in its own system — and the
  supranational level above it is what carries the obligation.
- **`validate` gained three rules**: a `supranational` publisher must be `EU`; a
  country with no palette entry is an error; the old `international` ⇒ `INT` rule
  is unchanged.

**What this means when you write a slice here:** use the real country code, use
`supranational` only for EU bodies, and if you introduce a country nobody has
used yet, add it to `COUNTRY_FAMILY` in `src/lib/palette.ts` in the same pass —
`npm run validate` will fail the build until you do, and the node draws in
unclassified grey.

Colour note, so it is not a surprise: **all 27 member states share one green hue
family.** Hue says "EU", not "Germany". Which member state is carried by the
label, the flag and the region filter. This was deliberate — 27 hue families
cannot be distinguished at fit zoom — and is revisitable once the member-state
layer is deep enough to need it.

<details>
<summary>The original blocker, kept for the record</summary>

**`src/lib/types.ts` cannot currently express an EU node.**

```ts
export type Country = 'CA' | 'US' | 'INT'
```

Its own comment says:

> `INT` means "neither Canadian nor American" … Lumping them is a real
> simplification, and it is the right one while the graph covers two countries
> … **If the corpus ever grows a real third national system, split this then.**

The EU branch is that moment, and it is worse than a third country, because it
is two new axes at once:

1. **A supranational layer.** The EU is not a country and not `INT` in the
   sense the comment means (a body belonging to nobody, like the IMF). It has
   binding legal authority over its members, which the IMF does not.
2. **27 national systems under it.** `de-`, `fr-`, `it-` … each with its own
   NSI publishing its own releases.

`JurisdictionLevel` (`international | federal | provincial | municipal |
institutional`) has the same problem: a member state's NSI is `federal` in its
own system, but sits *under* the EU layer in a way no Canadian federal body
sits under anything.

**Do not paper over this by tagging everything `INT`.** That is precisely the
bug the comment describes — nine international bodies were recorded as Canadian
for five sessions because the type had no room for them, and nothing noticed
because nothing rendered the field. Filing 27 member states as `INT` would
repeat it at scale, and unlike last time it would also be invisible in the
*colour* channel, since rim colour is driven by `country`.

The decision is Thomas's and belongs in `REPORTS.md` as a direction change. The
three obvious options, not argued here:

- Add `'EU'` to `Country` and a `supranational` level.
- Make `country` an open ISO-code string and derive the rim colour from a
  lookup, retiring the three-value union.
- Keep member states as their ISO country and model the EU as a
  jurisdiction level rather than a country.

Until it is decided, EU slices can be *written and verified* here, but not
imported — `npm run validate` would reject them, and it should.

</details>

---

## Slice format

Same as `src/data/research/*.json` — see `README.md` at project root, and
`Research.1.md` §6 for the field-by-field definition and the schema. Every
dependency needs an `evidence_url`; every claim traces to a verbatim quote in
a Part A record.

The blob's own records already carry `url` / `location` / `quote` / `names` /
`tense` / `notes`, which is Research.1.md's Part A shape — so the conversion to
a slice is mostly regrouping plus the judgment calls the standard requires
(direction, `relationship_type`, whether the quote actually supports the edge).
