# G.48.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.1 → **v3.2 this session** — §9 amended
only (EU/Europe id list backfilled 85 → 95 ids, ten new `nl-*` entries; the
"almost every one is the same shape" note updated to flag the exception).
Not reopened cover to cover.
Predecessor: G.47.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.**
The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a *documented* statement that one report
uses another as an input. The whole thing rests on one rule: **if no document
says it, the edge does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.2. §9 now lists 95 EU/Europe/INT
   ids. The note above the id block explains the breadth-to-depth shift and
   now flags that the ten new `nl-*` ids are not the uniform national-accounts
   shape the other 85 are.
2. **This file**, in full.
3. **`src/data/research/nl-municipal-finance.json`** — this session's work: a
   Dutch municipal/regional government-finance depth pass, modelled directly
   on the Canada branch's own multi-level fiscal chain (`grande-prairie.json`,
   `alberta-municipal.json`, `ontario-ompf-mpac.json`). Its own `_note` field
   documents the verification method in detail — read it before trusting any
   individual quote's provenance.
4. **`src/data/research/grok-r3-netherlands-poland.json`** — corrected this
   session (see Corrections). Its own `_note`/`_status` fields now document
   exactly what was fixed and why.
5. **Everything else unchanged from `G.47.md`'s list** (the Grok prompt files,
   the `grok-r*.json` slices, `src/lib/palette.ts`).

**Where things are, as of 2026-08-05 (end of session):**

- **Two priority verification checks from `G.47.md`'s cheap-checks list are
  closed**: Montenegro's ESA 2010 regulation citation, and the
  `grok-r3-netherlands-poland.json` spot-check. Both results below.
- **The corpus grew**: 218 → **228 reports** (10 new, all Dutch
  municipal/regional finance), 283 → **291 dependencies** (8 new). `npm run
  validate` and `npm run check` both exit 0. One new node
  (`nl-waarderingskamer-waarderingsinstructie`) is deliberately isolated —
  its one documented relationship (to Kadaster) points at a target that
  isn't a node yet, see Findings.
- **The wide-Europe depth pass (`G.47.md` priority G) has its first concrete
  result.** Three EU countries were considered (Netherlands, Germany, Italy);
  Netherlands was picked and dug into.

## Session conditions — read this first

Two unrelated pieces of work, both requested directly by Thomas.

**Part 1 — the two priority checks `G.47.md` itself flagged as most urgent.**
Neither Grok's original conversation thread nor the original round-3 JSON
response was available to this session, so both checks were done by pulling
the actual primary-source documents directly (MONSTAT's PDF; the CBS GNI
Inventory PDF; Eurostat's Poland ESMS page) rather than by comparing two
transcriptions of each other — a stronger check than the one originally
specified, though a different one. **Full PDF/HTML text extraction was done
directly by this session** (`curl` + `pypdf`/HTML-tag-stripping, the same
method `G.46.md` used for the German GNI inventory), not WebFetch's
AI-summarised fetch — because this same session's own first attempt using
WebFetch's summariser on the Netherlands material is what surfaced the
problem being checked for in the first place (see Corrections).

**Part 2 — the Netherlands municipal-finance depth pass.** Three
general-purpose subagents were run in parallel, each briefed with this
project's own extraction rules (verbatim quotes, URL, location, `AGENCY
ONLY`/`NOT FOUND` conventions, no verdicts) and a specific research question
(Gemeentefonds/verdeelmodel; WOZ/OZB property-tax chain; Provinciefonds/BBV/
Iv3). Their combined output covered wetten.overheid.nl statutory text,
rijksoverheid.nl circulaires and technical guides, CBS StatLine tables,
Waarderingskamer's own valuation-instruction manual, a municipal tax
ordinance (Nijmegen), and a data.overheid.nl dataset description. **Every
quote that ended up in a minted edge was then independently re-verified by
this session directly against the primary source** — downloading the actual
PDF/HTML and grepping the extracted text — rather than trusted from the
subagents' reports as-is. This was a deliberate reaction to Part 1's own
finding: subagent/WebFetch-summarised quotes are not reliably verbatim, so
nothing from this pass was minted into an edge without a second, direct
read. Two secondary facts (both flagged in the slice's own JSON) rest on
subagent extraction only and were kept as corroboration, never as sole
evidence for an edge.

**What this session did not do**: no other EU-branch priority (SEC03, the
German EVAS backlog, ECB/Eurosystem threads, G1/G2/G3's other tracks) was
touched. Germany and Italy, the two other municipal-finance-depth candidates
considered, were not researched — the choice of the Netherlands over them is
recorded in Findings 3 but is a judgement call, not something this session
tested empirically against the alternatives.

## Headline result

**Two of `G.47.md`'s own top-ranked cheap checks are closed, and one of them
uncovered a live, unfixed reliability problem in an existing corpus file
that has now been corrected in place — with the fix itself flagged as
scoped, not exhaustive.** Separately, the Netherlands now has the EU
branch's first genuine multi-level government-finance chain outside
Germany's EVAS sub-graph: a national equalization-transfer mechanism with a
document that names its own inputs (the Dutch equivalent of Ontario's OMPF
Appendix F), a property-valuation-to-municipal-tax chain with a verified
keystone document, and an accounting-standard-to-financial-return pipeline
structurally identical to Alberta's FIR system. This is evidence, not yet
proof, that the "Chapter 10 generalises past Germany" question `G.47.md`'s
G1 track posed can be answered with a *different* kind of document (a
transfer-formula technical guide, not a GNI inventory) if the search widens
beyond national-accounts documents to fiscal-transfer ones.

## Findings

### 1. Montenegro's ESA 2010 citation is confirmed as MONSTAT's own error — and the same document is internally inconsistent about it

**What this rests on**: downloaded MONSTAT's "Quality report 2021 AGDP.pdf"
directly (`curl`, 10 pages, `pypdf`-extracted in full) rather than relying on
Grok's transcription. §1.2 (p.2) reads, verbatim: *"National accounts are
compiled in accordance with the European System of Accounts (ESA 2010),
which is published in the Official Journal of the European Commission as
Annex A to Regulation (EU) No 1306/2010."* — matching `grok-r8-accession-
belt.json`'s quoted text exactly. This settles `G.47.md`'s cheap check 1:
the error is MONSTAT's own, not introduced in transcription. **New this
session**: the same PDF, §6.1 (p.8), separately states *"By applying
Regulation (EC) No 549/2013 which prescribes the application of ESA 2010
methodology..."* — the correct regulation number (though with the wrong
"EC"/"EU" prefix). One MONSTAT document cites its own governing regulation
two different, inconsistent ways. Not yet recorded as a correction in the
corpus JSON itself — this finding is new information, not a correction to
what's already there; flagged as a cheap-check candidate for whoever picks
this up (add a `_dropped` note to `grok-r8-accession-belt.json` recording
the internal inconsistency).

### 2. The `grok-r3-netherlands-poland.json` spot-check found Poland clean and Netherlands materially unreliable — now corrected

**What this rests on**: Thomas's original Grok conversation thread was not
accessible this session, so the check was done against primary sources
instead of the original transcript. Poland: independently verified against
Eurostat's ESMS metadata page directly — the quoted regulation citation
(549/2013) and compilation-basis language are both genuinely present.
Netherlands: downloaded CBS's GNI Inventory PDF (420 pages, `pypdf`-extracted
in full) and checked all four quoted dependency claims. One
(`nl-dnb-bop`) was exact. **Three of four were not verbatim**: two were
reworded paraphrases of real sentences, and one — the first sentence
supporting the `esa-2010` edge, claiming "all member states of the European
Union must comply with the requirements of the European System of Accounts
2010" — does not appear anywhere in the 420-page document under any close
variant searched. All three have been corrected in place in
`grok-r3-netherlands-poland.json`, with exact PDF page numbers (both the
document's own internal pagination and the PDF's own page count) and a
`CORRECTED 2026-08-05` marker on each affected `basis` field, per this
project's own convention of recording corrections rather than silently
overwriting. `npm run validate`/`check` both exit 0 after the edit.

### 3. Netherlands, Germany and Italy were weighed for the municipal-finance depth pass; Netherlands was picked, not tested against the alternatives

**What this rests on**: a judgement call, stated plainly as one. Three
factors favoured the Netherlands: (a) it already had a toehold in the corpus
(`nl-cbs-gni-inventory-2010` and three related nodes), lowering the setup
cost; (b) its Gemeentefonds is structurally the closest available analog to
Ontario's OMPF, the corpus's strongest existing municipal-finance model,
which made it plausible a similar "Appendix F"-style document existed to
find — and one did (Finding 4); (c) English-language secondary commentary on
Dutch government finance is unusually good, though the primary sources
pulled here are almost entirely Dutch-language (wetten.overheid.nl,
rijksoverheid.nl, individual gemeente ordinances). Germany was set aside
specifically because `G.47.md` already flagged it as the branch's existing
template — a fourth Destatis-shaped result would have been less informative
than a genuinely different EU country's system. Italy was set aside only for
scope (a five-layer government structure — state/region/province/metro
city/comune — was judged more complex to document well in one session than
the Netherlands' national/provincial/municipal three-layer structure).
Neither alternative was actually researched this session, so this is not a
finding about which would have worked better — only about why one was tried.

### 4. The Netherlands has a genuine "Appendix F" equivalent — the Toelichting document — independently confirmed by two different primary sources

**What this rests on**: this session's own direct download and full-text
extraction (`pypdf`) of the "Toelichting op de berekening van de uitkering
uit het gemeentefonds 2024" PDF (77 pages), which contains roughly 50
standardised per-maatstaf (distribution-criterion) data cards, each with
fields for Wet- en regelgeving / Definitie / Bron / Methode / Publicatie /
Peildatum. Confirmed directly: the OZB-woningen-eigenaren maatstaf card
reads *"Bron De benodigde gegevens worden door het CBS onttrokken aan de
Landelijke Voorziening WOZ"* — naming a specific national register by name,
not just an agency. **Independently confirmed a second way**: this session
also fetched a completely different document — CBS's own StatLine table
"Maatstaven Financiële-verhoudingswet (Fvw), regio" — and found its own
"Tabeltoelichting" cross-references the Toelichting document by its exact
full title as where the calculation units are documented, and separately
states in its own words that the table "bevat gegevens die mede als
grondslag dienen bij het bepalen van de hoogte van de Algemene Uitkeringen
aan gemeenten en provincies" (feeds both the municipal and provincial
funds). Two independently-fetched documents naming the same relationship, in
their own words, is stronger evidence than either alone.

### 5. The WOZ property-valuation-to-municipal-tax chain is a clean, fully-verified structural parallel to Grande Prairie's tax rate bylaw

**What this rests on**: Wet WOZ (the national property-valuation law) was
downloaded and parsed directly from wetten.overheid.nl. Art. 22 lid 1: *"De
in artikel 1, tweede lid, bedoelde ambtenaar van de gemeente waarin de
onroerende zaak is gelegen, stelt de waarde van de onroerende zaak vast bij
een voor bezwaar vatbare beschikking"* — the municipal official must
formally determine the value. Nijmegen's own OZB tax ordinance (fetched
directly from lokaleregelgeving.overheid.nl) states its tax base
("heffingsmaatstaf") *"is de op de voet van hoofdstuk IV van de Wet
waardering onroerende zaken voor de onroerende zaak vastgestelde waarde"* —
naming the law by chapter, the same way Grande Prairie's tax rate bylaw
names the Municipal Government Act. The Bfv 2001 decree (also fetched and
parsed directly) confirms the Gemeentefonds formula itself draws on the same
WOZ-determined values for its own OZB-capacity maatstaven.

### 6. The BBV/Iv3 pipeline is a structural match for Alberta's FIR system

**What this rests on**: direct fetch of data.overheid.nl's own dataset
description page for "Gemeenten 2025 onbewerkte Iv3-data," which states in
its own words that CBS receives the data "in het kader van de rapportages
Informatie voor Derden (Iv3)," that the table's own coding scheme derives
from the BBV ("Besluit begroting en verantwoording provincies en
gemeenten"), and that "Het BBV bevat onder meer de regelgeving voor de
leveringen van Iv3-data aan het CBS" (the BBV itself contains the rules
requiring Iv3 delivery to CBS). This is the same three-tier shape as
Alberta's `ab-municipalaffairs-fir` → `ab-municipalaffairs-financial-
statistical-data`, with the BBV playing PSAB's role as the governing
accounting standard.

## Secondary observations (logged, low priority)

- **The Toelichting document is internally inconsistent about how
  specifically it names its own CBS sources** — some maatstaf cards name a
  titled StatLine table (e.g. "Bevolking 15 tot 75 jaar; opleidingsniveau,
  wijken en buurten, 2020"), others say only "Bron CBS." with nothing
  further. Same `AGENCY ONLY`-vs-titled-product split this corpus has
  already found repeatedly elsewhere (SEC03, Ontario's OMPF Appendix F) —
  worth noting as a pattern that generalises past both Canada and the EU's
  own institutions, not just this one document.
- **Kadaster (the Dutch land registry) is named explicitly and repeatedly**
  as the source of all property sales-transaction data feeding WOZ valuation
  (Waarderingskamer's own 316-page "Waarderingsinstructie," p.34 and p.94–95)
  but is not yet a node — same open category question as Ontario's SDI/
  Ontario Parcel (geographic/cadastral reference infrastructure vs. a
  periodical release). Recorded in `_dropped`, not built.

## Corrections to prior sessions

1. **`grok-r3-netherlands-poland.json`'s three Netherlands `basis` quotes
   were not verbatim — REFUTED and corrected.** See Finding 2 above for the
   full account. This is exactly the failure mode `Research.1.md` §3 exists
   to catch — quoted text presented as verbatim that on inspection was
   paraphrased, or in one case, absent from the source entirely. The
   underlying edges (the relationships themselves) all still hold; only the
   quoted evidence supporting them was wrong and has been replaced with
   verbatim text at confirmed page locations.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`. Unchanged.

**B — SEC03 meta backlog.** Unchanged from `G.47.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.47.md`.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`. Unchanged.

**E — Everything the blob split created.** Unchanged from `G.47.md`.

**F — The German sub-graph. Opened, not closed.** Unchanged from `G.47.md` —
this session did not touch it.

**G — The wide-Europe depth pass.** `G.47.md`'s G1/G2/G3 tracks (repeat
Germany's Chapter 10; central-bank threads; untouched domains) are
**unchanged** — this session did not work any of the three as specified.
**What this session adds is a fourth, related track**: a government-finance
depth pass that starts from the fiscal-transfer/municipal-accounting layer
rather than from national accounts. The Netherlands result suggests this
angle can surface an "Appendix F"-class document (Finding 4) even in
countries where a Germany-style GNI Inventory Chapter 10 may not exist —
worth trying on a second country before concluding whether it generalises.
Natural next candidates, per Finding 3's own reasoning: Germany (which
almost certainly has an equivalent Gemeindefinanzierungsgesetz-per-Land
system, likely richer but also more fragmented across 16 Länder) or Italy
(IMU/comuni, but the five-layer structure needs a plan for scope before
starting).

## Cheap checks still outstanding

**New this session:**

1. **Add a `_dropped` note to `grok-r8-accession-belt.json`** recording
   Montenegro's own internal inconsistency (Finding 1) — the citation error
   is now fully confirmed but the corpus file doesn't yet record the second
   half of the finding (the correct-number citation existing elsewhere in
   the same PDF).
2. **Mint a Kadaster/Basisregistratie Kadaster node** and complete the
   `nl-waarderingskamer-waarderingsinstructie → Kadaster` edge — closes the
   one isolated node this session created. Sources already gathered, see
   `nl-municipal-finance.json`'s own `_dropped` array.
3. **Verify and mint a specific province's own budget** (Noord-Brabant was
   surfaced by a subagent but not independently re-verified) citing its
   Provinciefonds allocation and the BBV — completes the parallel to
   Alberta's `ab-tbf-fiscal-plan`/`gp-financial-statements`.
4. **Verify and mint a specific municipality's own jaarrekening** (Waalwijk
   was surfaced by a subagent but not independently re-verified) citing the
   BBV — same completeness goal as #3, one level down.
5. **Mint the CBS population StatLine table** named in the Toelichting's
   "Maatstaf Inwoners sociaal" card (verified directly this session, see
   `nl-municipal-finance.json`'s `_dropped` array) — the Dutch counterpart to
   `statcan-census-population`, currently missing from the EU branch
   entirely.
6. **Open Waarderingskamer's "Staat van de WOZ 2025"** — surfaced but not
   read this session; likely an annual report with its own data-source
   disclosures.

**Carried forward from `G.47.md`, unchanged, still open:** all 21 items —
see `G.47.md`'s own list. None were touched this session.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.48.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.2, §9 now 95 ids.
3. **`src/data/research/nl-municipal-finance.json`** — its own `_dropped`
   array is the direct continuation point for cheap checks 2, 3, 4 and 5
   above.
4. **A browser**, for the outstanding cheap checks.
5. **wetten.overheid.nl, rijksoverheid.nl, cbs.nl, data.overheid.nl,
   lokaleregelgeving.overheid.nl** — all directly reachable via `curl`, no
   gating found. wetten.overheid.nl in particular parses cleanly with a
   simple HTML-tag-strip; no need for a browser or WebFetch's summariser for
   Dutch statutory text.
6. **A caution, not a target**: this session's own experience is that
   WebFetch's AI-summarised fetch is not reliable for verbatim quote
   extraction — Finding 2 exists because of it. Prefer `curl` + direct text
   extraction (`pypdf` for PDFs, tag-stripping for HTML) for anything that
   will become a quoted `basis` field, and treat subagent-reported quotes as
   leads to re-verify, not citations to trust.

---

# How to write the next hand-off

**Added 2026-08-04. Copy this whole section verbatim into every successor**, so
the chain never depends on one file surviving. It is the spec, not an example —
the file you are reading is the worked example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no
  G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are
  `.docx`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `EU/`. Earlier files are `.docx`; that
  was the chat workflow's doing, not a preference.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `EU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py EU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). It exists so branch state can be read
  without parsing prose, and so a future session can diff two hand-offs.
  `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

Date: YYYY-MM-DD
Governing briefs: <which, and whether you actually saw them>
Predecessor: G.<n-1>.md (date)

## Orientation — if you are a new agent, start here
## Session conditions — read this first
## Headline result
## Findings
## Secondary observations (logged, low priority)
## Corrections to prior sessions
## Thomas's stated priority for the remaining work
## Cheap checks still outstanding
## What to pass at the start of next thread

# How to write the next hand-off        ← this spec, copied verbatim
```

Drop a section only if it would be empty, and say so in one line rather than
leaving a heading with nothing under it. *Corrections* and *Thomas's stated
priority* are **never** dropped: an empty Corrections section is itself a claim
(nothing earlier was found wrong) and should say that explicitly.

## What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. This is where "the sandbox failed" and "the
governing briefs still did not arrive" belong. **State plainly which sources you
read in full**, because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Mark any claim that depends on
a predecessor's reading rather than your own — the house convention is
*(SEC04 per G.17)*. Quote verbatim; `Research.1.md` §2 applies here exactly as
it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. This section is the reason the chain is trustworthy. A session that
finds a predecessor wrong and does not record it here has actively damaged the
corpus.

**Thomas's stated priority for the remaining work** — lettered blocks (A, B, C,
D) carried forward from the predecessor, edited to reflect what moved. Mark items
**no longer needed** explicitly and say why, rather than deleting them silently.
This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** G.17 predicted a code pattern;
  G.18 recorded that it "landed". Make falsifiable calls and settle them.
- **Distinguish inference from documented fact,** and say which narrow respect is
  still inference. G.18's headline rule is very well evidenced and still not
  printed in any document — it says so.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
- **Do not pad.** These files are dense because every line earns its place.
