# G.47.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0 → **v3.1 this session** — §9 amended
only (EU/Europe id list backfilled 33 → 85 ids). Not reopened cover to cover.
Predecessor: G.46.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.**
The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a *documented* statement that one report
uses another as an input. The whole thing rests on one rule: **if no document
says it, the edge does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.1. §9 now lists 85 EU/Europe/INT
   ids, up from 33. Read the note directly above the id block — it explains
   why the list stopped growing one-country-at-a-time and what that means for
   what to search next.
2. **This file**, in full.
3. **`EU/GROK-PROMPT-8_accession-belt_2026-08-05.md`** (and, if you want the
   full chain, `GROK-PROMPT-3` through `-7` alongside it) — the actual
   research instrument this session's corpus growth came from. Read at least
   one of these before writing a new one; the traps section is not
   decorative, and every round that skipped it produced a refuted edge.
4. **The five `grok-r*.json` slices in `src/data/research/`** — read
   `grok-r6-mixed-categories.json` first, it's the shortest and shows every
   pattern (binding member, EEA/bilateral, candidate, former member) in one
   file.
5. **`src/lib/palette.ts`** — recoloured twice today. If you are about to add
   a country that isn't European, read the `ColourFamily` docstring before
   picking a family; four continents are reserved and unstaffed.

**Corrections to how this file has been read, all still live.** Everything
`G.1.md` through `G.46.md` established about the branch's own findings — the
asymmetry (EU instruments oblige without naming; members name without being
asked), the German EVAS sub-graph, the ECB/Eurosystem threads — is unchanged
and untouched this session. **This session ran a different kind of work in
parallel: breadth across countries, not depth within one.** Nothing here
contradicts `G.46.md`'s own priorities; it adds a new one.

**This session was primarily consolidation, not extraction — say so plainly,
because it changes what "read in full" means here.** The actual research —
quoting, categorising, tense-checking — was done by Grok, across eight rounds
of prompts written and reviewed in a separate conversation thread, not
inside this repository's own session chain. What happened in *this* repo was:
converting Grok's structured JSON output into schema-valid slices, catching
and fixing one real gap (Netherlands and Poland were reviewed but never
actually imported — see Corrections), and a full palette redesign. **If a
future session needs to judge the quality of the underlying research, read
the Grok prompt files and the slices directly — this hand-off did not
re-verify every quote against its primary source a second time.**

**Where things are, as of 2026-08-05 (end of day):**

- **The corpus grew substantially**: 165 → **218 reports** (53 new), 231 →
  **283 dependencies** (52 new), 181 → **191 dropped notes**. `npm run
  validate` and `npm run check` both exit 0.
- **Every EU member state (27/27) now has at least one documented edge** to
  `esa-2010` — this branch's first completed sweep of the whole bloc.
- **Fourteen non-EU European countries are now in the corpus for the first
  time**: the full EEA/EFTA set (Norway, Iceland, Liechtenstein,
  Switzerland), the UK as a former member, and nine EU candidates/potential
  candidates (Serbia, Montenegro, North Macedonia, Albania, Bosnia and
  Herzegovina, Turkey, Ukraine, Moldova, Kosovo).
- **`src/lib/palette.ts` was rewritten twice today.** `ColourFamily` grew
  from four values to nine: `CA | US | INT | EU | XEU | AFR | ASIA | SAO |
  SA`. Four of the new five are reserved and currently unstaffed — see
  Finding 3.

## Session conditions — read this first

**Two unrelated pieces of work, both requested directly by Thomas, both
substantial.** Not a research session in the sense the rest of this file's
chain means it — no PDF was opened, no primary source was read first-hand.

1. **Consolidation.** Eight rounds of Grok output (prompts written and
   reviewed across several turns of a separate conversation) were converted
   into five schema-valid slices and imported. Every quote in those slices
   traces to Grok's own transcription, not a fresh read of the primary
   source by this session. One gap was caught and closed: Netherlands and
   Poland were reviewed carefully in an earlier turn of that same
   conversation but never actually converted into a slice — the omission
   surfaced only when adding country labels found them missing. That
   sixth slice (`grok-r3-netherlands-poland.json`) is reconstructed from
   this session's own prior transcription, not a second read of the
   original — flagged in its own `_note` field for a spot-check.
2. **Palette redesign.** `src/lib/palette.ts`'s `ColourFamily` was extended
   once (a fifth family, `XEU`, for non-EU Europe) and then substantially
   rewritten a second time the same day, when Thomas asked for the whole
   scheme reassessed as one slice of the spectrum per continent. See
   Finding 3.

## Headline result

**Breadth across "Europe" (EU membership, EEA/EFTA, former membership,
candidacy) is now complete at the shallowest useful depth — one edge per
country, all to the same target, `esa-2010`. Depth is now the frontier, not
breadth.** Every one of the 41 European countries in this corpus (27 EU + 14
non-EU) has exactly the same shape of edge: `<country> national accounts →
esa-2010`, `methodology_depends_on` for members and EEA/bilateral states,
`cites` for candidates. That uniformity is itself informative — three
distinct categories of relationship language were found and held apart
(binding member, binding-but-not-member via EEA or bilateral treaty,
aspirational candidate) — but it means the *next* useful unit of work is
never "the 42nd country's first edge." It is either a second document for a
country that already has one, or a domain this sweep never touched at all.

Germany is the one exception, and it is the template: `G.44.md`–`G.46.md`'s
EVAS sub-graph work found a **69-row source table** inside Germany's own GNI
inventory — surveys, registers, and central-bank links, each named and
numbered. Every other country in this corpus has, at most, the equivalent of
Germany's *first* document (the ESMS-metadata-page level); none has had its
own Chapter 10 found and opened. That gap, repeated ~40 times, is priority G
below.

## Findings

### 1. Every EU member state now has a documented ESA 2010 edge — a completed sweep, not a partial one

**What this rests on**: Grok round 7 (`GROK-PROMPT-7_finish-eu`) closed the
final fourteen member states in one batch, following rounds that had already
covered thirteen. **Zero surprises across all 27** — every member state uses
binding obligation language (*"shall,"* *"must,"* *"in compliance with,"*
*"applies as law"*), with no exceptions found. That absence of exceptions is
itself the result: EU membership predicts binding-language framing with
perfect consistency across the full set, which could not have been claimed
confidently at 13/27 or even 20/27.

### 2. The asymmetry generalises past statistics, and past the EU itself

**What this rests on**: two results, both from Grok rounds reviewed and
converted this session.

- **NATO** (round 1/2, `nato-defence-expenditure`) shows the identical
  obligation-without-naming shape found repeatedly for EU instruments, in a
  completely different policy domain: *"Each Ally's Ministry of Defence
  reports current and estimated future defence expenditure according to an
  agreed definition"* — an institution, not a titled publication. This is
  the first confirmation that the pattern isn't statistics-specific.
- **Candidate-country language is a real third category, and duration
  doesn't convert it.** Serbia (round 6) used *"harmonised with"* rather
  than binding language; round 8 tested this across eight more
  candidates/potential candidates and confirmed it generalises — Turkey,
  a candidate since 1999, still uses voluntary alignment language after
  twenty-five years. Recorded as `cites` rather than
  `methodology_depends_on` throughout, consistently, per a correction made
  during this session's consolidation (see Corrections).

### 3. The palette is now continent-based, and four families are reserved with zero nodes behind them

**What this rests on**: direct instruction from Thomas, implemented and
verified via `colorsys` hue/saturation/lightness computation, not eyeballed.
Full reasoning is in `src/lib/palette.ts`'s `ColourFamily` docstring and
`REPORTS.md`'s Decisions section — not repeated here in full, but the
consequence for this branch's own work is real: **`ASIA`, `SAO` (South Asia
+ Oceania), `AFR` and `SA` (South America) now exist as colour families with
no country mapped to any of them.** If a future EU-branch session ever
touches a country outside Europe — Mexico was named explicitly by Thomas as
coming — the family already exists; only `COUNTRY_FAMILY` needs a new line,
not a colour decision made in a hurry.

One collision was caught and fixed during this pass, worth knowing if you
ever add a grey-toned family again: a first draft of `SA`'s hue sat at 210°
and rendered visually identical to `COMMERCIAL_COLOUR` (`#8b93a4`, 221°).
Moved to 90°, the genuine free gap between Asia's warm end and Europe's
green start.

## Secondary observations (logged, low priority)

- **`grok-r1-nordic-nato-fr-oecd.json` mints two isolated nodes on purpose**
  (`nordic-statistics-database`, `nato-defence-expenditure`) — both show
  under `validate`'s ISOLATED list. Consistent with this project's own
  V0.12 decision (documented in `src/data/index.ts`) to keep isolated nodes
  rather than drop them: an isolated node *is* the finding, in both cases
  ("this body exists and names its own inputs only by institution").
- **A real citation error survived into the corpus, deliberately not
  silently fixed.** Montenegro's own quoted source cites ESA 2010 as
  *"Regulation (EU) No 1306/2010"* — the real number is 549/2013. Recorded
  verbatim per §2, flagged as a `note`-type `_dropped` entry in
  `grok-r8-accession-belt.json` rather than corrected, because it is not
  established whether the error is MONSTAT's own or was introduced in
  transcription. **Needs a direct source check before the edge is treated
  as fully confirmed** — cheap check 1, below.
- **The OECD-INEGI (Mexico) edge was deliberately left out of the
  consolidation**, even though it was reviewed and is real — Grok's own
  non-finding on the same material called it "limited to a construction
  detail, not the general obligation language," and Mexico is outside this
  branch's European scope. Worth a look once Mexico's own North American
  slice of the graph opens, not before.

## Corrections to prior sessions

1. **Netherlands and Poland were reviewed but never imported — corrected
   this session.** `nl-cbs-gni-inventory-2010`, `nl-cbs-sbs`, `nl-dnb-bop`,
   `nl-cbs-sbr` and `pl-gus-national-accounts` were all researched via Grok
   round 3 and reviewed carefully at the time (their `de-*`-parallel
   findings — Netherlands' DNB-as-BoP-compiler link is the same shape as
   Germany's Bundesbank link) but the resulting slice was never actually
   written or wired into `src/data/index.ts`. Caught only when country
   labels were being filled in and these two countries turned up missing
   from the corpus entirely. Fixed in `grok-r3-netherlands-poland.json`.
   **This is exactly the failure mode `Research.1.md`'s Part B Output Rule
   and this file's own "write as you go" instruction exist to prevent** —
   a finding that was genuinely established and then quietly lost between
   review and import. No prior `G.*.md` claimed this was done, so nothing
   here contradicts an earlier hand-off; it contradicts an earlier *turn*
   of this session's own parent conversation.

2. **`XEU`'s colour, decided earlier the same day, is superseded.** Not a
   research correction, but worth recording in this chain since it touches
   files this branch's work depends on: `XEU` was tan-brown for
   approximately one turn before the continent redesign moved it to green.
   `REPORTS.md`'s Decisions section carries both steps, in order, rather
   than silently overwriting the first.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`. Unchanged.

**B — SEC03 meta backlog.** Unchanged from `G.46.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.46.md`.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`. Unchanged.

**E — Everything the blob split created.** Unchanged from `G.46.md`.

**F — The German sub-graph. Opened, not closed.** Unchanged from `G.46.md` —
this session did not touch it. 43 of 46 Destatis-survey rows, all 16
other-official-source rows, and all 7 non-government rows from
`de-destatis-source-surveys.json`'s `_dropped` array remain staged, not
chased.

**G — NEW. The wide-Europe depth pass.** This is what "search out as many
nodes" means concretely, now that breadth is done. Two independent tracks,
either one startable without the other:

**G1 — Repeat Germany's Chapter 10 for the countries most likely to have
one.** Not all 40 countries will have a published GNI Inventory at
Germany's depth, but several are known or strongly suspected to:
- **Netherlands** — `nl-cbs-gni-inventory-2010` is already a node; it names
  `nl-cbs-sbs`, `nl-dnb-bop` and `nl-cbs-sbr`, but Grok's review of it was a
  first pass, not exhaustive. Worth checking whether the same document has
  a Destatis-Chapter-10-style enumerated source list still unmined.
- **Czechia** — `G.46.md`'s own findings note ČSÚ's documentation is "as
  granular as Germany/Netherlands/Italy." A GNI Inventory almost certainly
  exists; not yet opened.
- **Croatia** — same finding, same reasoning (most recent member, came back
  unexpectedly granular). Untested for a Chapter-10 equivalent.
- **Italy** — `it-istat-asia-enterprises`, `it-istat-frame-sbs`, `it-bdi-bop`
  are minted, but from ESMS metadata, not from Istat's own equivalent of a
  full GNI Inventory, if one exists publicly.
- Every other country (25 more) has only the single ESMS-page-level edge.
  Start with the above four; expand only once the method is re-confirmed to
  generalise past Germany.

**G2 — Central bank threads, one per remaining country.** The pattern —
national central bank compiles the balance of payments, named as a source
feeding national accounts — is now confirmed five times
(Bundesbank/Germany, DNB/Netherlands, Banca d'Italia/Italy, ČNB/Czechia,
weak for Banque de France). **Every other country in the corpus has an
unopened central-bank thread**: Oesterreichische Nationalbank (Austria),
Sveriges Riksbank (Sweden), Danmarks Nationalbank (Denmark), Národná banka
Slovenska (Slovakia), Národní banka Slovenska — and so on for all 27+14.
This is now a well-precedented, cheap, repeatable check, not exploratory
research — the next session doing this should expect to confirm the
pattern in most cases and treat an absence as informative rather than a
search failure, per `Research.1.md` §4's `AGENCY ONLY`/`NOT FOUND`
convention.

**G3 — Domains this sweep never touched, at the EU level first.** Every
edge minted this session answers one question: national accounts, ESA
2010. The EU regulates far more than national accounts, each with its own
transmission-programme-shaped instrument and, presumably, the same
national-office-names-the-EU-instrument pattern:
- Labour force statistics (the EU Labour Force Survey Regulation)
- Government finance statistics / Excessive Deficit Procedure — partially
  touched (`eurostat-edp-gfs-quality-report`, `eurostat-edp-notification-tables`
  already exist) but not tested per-country the way national accounts was.
- Structural business statistics (touched for Germany/Italy/Netherlands as
  a *source*, not tested as its own EU-regulated domain with its own
  national-office-to-EU edges).
- Trade statistics (Intrastat/Extrastat, named in passing for Italy —
  `S05`-era EU sections already reference this; not swept per-country).
- Farm Structure Survey — `eurostat-farm-structure-survey` exists at the
  EU level; never tested for a per-country national-office edge the way
  national accounts was.

**Recommended order: G2 before G1 before G3.** G2 is the cheapest
(well-precedented, one lookup per country) and most likely to produce
clean new edges fast. G1 is higher-value per hit but needs a real document
search per country, not just a name lookup. G3 is the largest but least
certain payoff — it may turn out that non-national-accounts domains show a
different, less uniform pattern, which would itself be worth knowing, but
it should not be started before G1/G2 give this thread more data to compare
it against.

## Cheap checks still outstanding

**New this session, ranked first:**

1. **Verify Montenegro's regulation-number citation** (`Regulation (EU) No
   1306/2010`, should almost certainly be 549/2013) against MONSTAT's own
   source PDF directly. One document, one lookup.
2. **Spot-check `grok-r3-netherlands-poland.json`** against the original
   Grok round-3 response (still recoverable from the parent conversation's
   history) — this slice was reconstructed from this session's own prior
   transcription, not re-verified against the primary JSON a second time.
3. **Pick one of G1's four candidate countries (Netherlands, Czechia,
   Croatia, Italy) and actually try the Chapter-10 search** — the fastest
   way to learn whether the method generalises or whether Germany's
   document happens to be unusually good.

**Carried forward from `G.46.md`, unchanged, still open:**

4. Continue sc-75 from `de-destatis-source-surveys.json`'s `_dropped` array.
5. Resolve `oecd-icio`'s cadence.
6. Check cadence for WIOD, EXIOBASE, EORA, GTAP-MRIO, OECD TiVA.
7. Investigate Annex I row 4 of Guideline (EU) 2024/2941.
8. Fetch Guideline ECB/2021/14's own frequency article.
9. Check cadence for Supervisory Banking Statistics, Investment Funds
   statistics, Insurance Corporations statistics.
10. Open the Alert Mechanism Report's own governing instrument.
11. Verify and mint Eurobarometer (S03-23).
12. The second joint ECB-Eurostat report (ECB-07).
13. Read EBS Regulation 2019/2152.
14. Regulation (EU) 2021/1058 / 2021/1060 (Title 05 GDP/GNI lead).
15. FSDN founding instruments (S03-12).
16. Sweep the full `_staging/` directory beyond indices already processed.
17. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
18. Split `list-main-stats-2025-na` into nine records (sc-71, since G.24).
19. Pull the `[NA-Pen] / Table 29` thread (sc-73, since G.24).
20. Check ISSAI 300/400 cadence from INTOSAI (sc-53, since G.21).
21. Read Art. 11 of the loi modifiée du 22 juin 1963.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.47.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.1, §9 now 85 ids, note above the id block
   explains the shift from breadth to depth.
3. **`src/data/research/grok-r6-mixed-categories.json`** — the clearest
   single example of all three relationship-language categories in one
   file.
4. **One of `GROK-PROMPT-6` through `-8`** — if the next session is going
   to write a new Grok prompt for the G1/G2/G3 work above, these are the
   template: scope tightly, name the exact do-not-duplicate id list, name
   the exact do-not-reopen list, require the corrected schema (separate
   `quote`/`location`/`tense` fields, never a bundled `relationship_type`
   Grok assigns itself).
5. **A browser**, for cheap checks 1–2 and most of the carried-forward list.
6. **`destatis.de`, and by extension every national statistics office's own
   site** — all directly reachable from a standard browser; only
   `eur-lex.europa.eu` has been found gated in this branch's history.

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
