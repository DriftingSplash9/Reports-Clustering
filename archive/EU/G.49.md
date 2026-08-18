# G.49.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.2 → **v3.3 this session** — §9 amended
only (id list backfilled 95 → 105, ten new `gb-*` entries; the depth-pass
note updated to cover both the Netherlands and UK results and the ordering
bug from this session's own first edit — see Corrections). Not reopened
cover to cover.
Predecessor: G.48.md (2026-08-05, same day).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.**
The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a *documented* statement that one report
uses another as an input. The whole thing rests on one rule: **if no document
says it, the edge does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.3. §9 now lists 105 EU/Europe/INT
   ids. The note above the id block covers both the Netherlands and UK
   depth-pass results.
2. **`G.48.md`**, in full — the immediate predecessor, same day, covers the
   two priority verification checks and the Netherlands depth pass.
3. **This file**, in full.
4. **`src/data/research/uk-local-government-finance.json`** — this session's
   work. Its own `_dropped` array records a real finding (UKSPF succeeding
   EU structural funds) that does not fit this corpus's `relationship_type`
   ontology — read it before assuming that finding is missing by oversight.
5. **Everything else unchanged from `G.48.md`'s list.**

**Where things are, as of 2026-08-05 (end of session — third piece of work
today, after the priority checks and the Netherlands pass):**

- **The corpus grew again**: 228 → **238 reports** (10 new, all UK
  local-government finance), 291 → **297 dependencies** (6 new). `npm run
  validate` and `npm run check` both exit 0. No new isolated nodes — all ten
  `gb-*` ids from this session have at least one live edge.
- **The wide-Europe depth pass now has a second country and a genuine
  non-EU-member data point.** Thomas asked directly for three more non-EU
  European candidates; Switzerland, Norway and the UK were scouted (light
  pass, not full verification) and the UK was picked for deep-dive treatment.
- **A real id-ordering mistake was made and caught within the same session**
  — see Corrections. Worth reading if you're about to hand-edit
  `Research.1.md`'s id block yourself: it is alphabetically ordered and easy
  to break by inserting at the wrong point.

## Session conditions — read this first

**Direct continuation of the same working session as `G.48.md`**, not a new
thread — Thomas asked, after the Netherlands pass, to pick three more
non-EU European countries and begin analyzing them the same way. Two-stage
approach, chosen by Thomas from an explicit menu of options (light-scout-
then-deep-dive-one / deep-dive-all-three / just-log-the-picks): first a fast
reconnaissance pass (one subagent per country, Switzerland/Norway/UK,
explicitly told NOT to extract verbatim quotes yet, just characterize what
exists), then a full deep-dive on the winner using the same three-subagent
research pattern as the Netherlands pass, followed by direct primary-source
re-verification of every quote before minting.

**What was read in full this session**: every legislation.gov.uk statute
section cited below (downloaded via `curl`, HTML tag-stripped with a Python
regex — the same clean, gate-free method that worked for wetten.overheid.nl
on the Netherlands pass); the Adult Social Care Relative Needs Formula
technical annex PDF (24 pages, `pypdf`-extracted in full); the City of
Wolverhampton Statement of Accounts 2024-25 (311 pages, `pypdf`-extracted in
full); the Stevenage Borough Council NNDR1 tax-base report (22 pages,
`pypdf`-extracted in full); the RO-returns technical notes page and the
UKSPF prospectus/FAQ pages (gov.uk, HTML tag-stripped directly).

**What was not independently re-verified**: the Switzerland and Norway
scouting reports (deliberately — scouting is not meant to be
verification-grade, see below); the Children and Young People's Services
Relative Needs Formula annex (only the Adult Social Care annex was fully
verified); City of York Council's own CIPFA-Code citation (a second,
uncorroborated example — Wolverhampton alone carries the minted edge); the
Orkney Islands Council and North East Lincolnshire Council documents naming
ERDF/ESF/ESIF explicitly (subagent-read only, and in any case not usable as
edge evidence — see Findings 3).

## Headline result

**The UK depth pass replicates the Netherlands pass's core finding — a
national funding-formula document that names its own inputs by exact
titled release, not just by agency — in a completely different country,
language environment and government structure, which is modest evidence
this pattern generalises rather than being a Dutch/Anglo-Netherlands-
specific accident.** The Adult Social Care Relative Needs Formula technical
annex names ONS releases, Census 2021 Nomis table codes, and an NHS England
Digital report by exact table number, the same shape as the Dutch Toelichting
and Ontario's OMPF Appendix F. Separately, the UK's unique status in this
corpus (the only former EU member) produced a real, well-evidenced finding —
the UK Shared Prosperity Fund succeeding EU structural funds — that could
NOT be built into a graph edge, because this corpus's `relationship_type`
schema (`calculated_from` / `uses_data_from` / `methodology_depends_on` /
`cites`) has no type for "supersedes." That is itself a finding worth having,
not a failure: the corpus's own ontology has a documented gap.

## Findings

### 1. Switzerland, Norway and the UK all scouted as strong candidates; UK picked on two grounds neither purely evidentiary

**What this rests on**: three parallel scouting subagents, deliberately
light-touch (characterize what exists, don't extract verbatim yet). All
three came back with real candidate documents for all four of the Dutch
pattern's pieces (national equalization transfer + technical guide; property
tax + valuation law; government accounting standard; compiled municipal
financial-return dataset). Switzerland's National Fiscal Equalization (NFA)
technical report and Norway's KOSTRA system (flagged by its own scout as
"your strongest candidate... bilingual") were both credible alternatives.
**The UK was picked for two reasons that are not about which system is
richest**: (1) zero language barrier, directly responsive to this session's
own finding two hand-offs' worth of work earlier that quote fidelity is the
main risk in this kind of research; (2) it is the corpus's only former EU
member, which no other candidate offers and which connects directly to this
branch's own long-running "asymmetry" research thread (`G.47.md` Finding 2 —
EU instruments oblige without naming, members name without being asked).
Switzerland and Norway were not tested against the UK empirically — this is
a judgement call, stated plainly as one, exactly as `G.48.md` Finding 3 did
for Netherlands vs. Germany vs. Italy.

### 2. The Adult Social Care Relative Needs Formula technical annex is a clean, fully-verified "Appendix F"-class document

**What this rests on**: direct download and full-text extraction (`pypdf`)
of the 24-page annex PDF. Its §5 "Data and technical definitions" names, per
indicator: ONS's "Estimates of the population for England and Wales" (exact
title), Census 2021 by exact Nomis table code (RM066 "Living arrangements by
age", RM121 "Sex by age", RM201 "Tenure by age"), and NHS England Digital's
"Adult Social Care Activity and Finance Report" by exact table number (Table
38). All VERIFIED DIRECTLY against the extracted PDF text, not accepted from
the subagent's report. This is markedly more specific than the sibling
Children and Young People's Services annex, which names datasets
("National Pupil Database", "Children in Need (CiN)", "Children Looked After
(CLA)") by title/acronym only, without table-level codes — recorded as a
`no-node-yet` lead in the JSON's `_dropped` array rather than built, since
the two annexes are evidently not uniform in citation quality and this
session only verified the stronger one.

### 3. UKSPF succeeding EU structural funds is real and well-evidenced, but does not fit this corpus's edge ontology — recorded as a schema-limitation finding, not an edge

**What this rests on**: two UK-government primary sources, both VERIFIED
DIRECTLY (gov.uk fetched and HTML-parsed). The UKSPF prospectus's ministerial
foreword: *"This is our vision and ambition for the new £2.6 billion UK
Shared Prosperity Fund (UKSPF), which succeeds the old EU structural funds."*
The UKSPF's own FAQ page, same status, different framing: *"The UKSPF is not
a direct replacement for EU structural funds."* Both are genuine, current
gov.uk text — reported per `Research.1.md` §3's instruction to report
conflicts rather than adjudicate them. Neither document names the specific
predecessor programmes (ERDF/ESF) — a targeted acronym search came back
NOT FOUND in both. A subagent (not independently re-verified) separately
found an Orkney Islands Council committee report naming ERDF and ESF
explicitly as the programmes replaced, and a North East Lincolnshire Council
webpage naming "ERDF and ESIF." **None of this was minted as a graph edge**,
because the relationship these documents describe — one funding mechanism
succeeding/replacing another — has no home in this corpus's four
`relationship_type` values, all of which describe one document being used as
a computational or methodological *input* to another, not one programme
superseding another in time. Recorded verbatim in the JSON's `_dropped`
array as a `note`-type entry, flagged explicitly for whoever next wants to
propose a `supersedes` relationship type rather than force-fitting `cites`.

### 4. The CIPFA Code citation chain needed two legislative hops, not one — and the two hops are in different Acts

**What this rests on**: direct legislation.gov.uk reads of Local Government
Act 2003 s.21(2) (VERIFIED DIRECTLY: *"reference to proper practices... is
to those accounting practices... which are contained in a code of practice
or other document which is identified for the purposes of this provision by
regulations made by the Secretary of State"* — creates the concept, names no
one) and The Local Authorities (Capital Finance and Accounting) (England)
Regulations 2003, reg. 31 (VERIFIED DIRECTLY: *"...'Code of Practice on Local
Authority Accounting in the United Kingdom' published by CIPFA..."* — the SI
that actually names CIPFA). The Accounts and Audit Regulations 2015, checked
directly (regs. 2-4), uses the phrase "proper practices" but does not itself
name CIPFA in the sections read. Worth knowing before assuming a single
citation will do the job for a UK accounting-standard edge the way one
citation did for the Netherlands' BBV.

## Secondary observations (logged, low priority)

- **Neither the 1992 nor 1988 Local Government Finance Act uses the literal
  string "Valuation Office Agency"** in the sections read — both use "the
  Commissioners of Inland Revenue" / "the valuation officer" / "listing
  officer." "Valuation Office Agency" as a name only surfaced in a
  downstream document (Stevenage's own NNDR1 report). Recorded as a NOTE in
  `gb-voa-rating-lists`'s own description per this project's tense/naming-
  precision convention, rather than silently modernised — the same
  discipline `Research.1.md` §5b applies to tense.
- **Wolverhampton's own Statement of Accounts does not mention VOA or
  rateable values** in the sections searched — the CIPFA-Code half and the
  VOA-valuation half of the UK chain needed two different exemplar councils
  (Wolverhampton, Stevenage), not one. Same lesson as Ontario's slice
  needing MPAC's own Technical Guide rather than a single council document
  to prove everything.

## Corrections to prior sessions

1. **This session's own first edit to `Research.1.md`'s §9 id block was
   wrong and was caught and fixed within the same session, before this
   hand-off was written.** The ten new `gb-*` ids were initially inserted
   immediately after `cz-cnb-bop`, breaking the block's alphabetical
   ordering (the correct position, next to the pre-existing
   `gb-ons-national-accounts`, is between `fr-insee-national-accounts` and
   `gr-elstat-national-accounts`). No `G.*.md` file was written or
   published with the wrong ordering in place — caught during the same
   session's own review before this hand-off — but recorded here anyway per
   this project's own convention that a session finding itself wrong and
   not recording it "has actively damaged the corpus." In this case the
   correction is to the session's own live edit, not to a predecessor's, but
   the same transparency rule applies.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`. Unchanged.

**B — SEC03 meta backlog.** Unchanged.

**C — Independent ECB/Eurosystem threads.** Unchanged.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`. Unchanged.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph. Opened, not closed.** Unchanged — this session
did not touch it.

**G — The wide-Europe depth pass.** Now has **two** finished country
results (Netherlands, UK) plus two scouted-but-not-built candidates
(Switzerland, Norway). `G.47.md`'s original G1/G2/G3 tracks (repeat
Germany's Chapter 10; central-bank threads; untouched national-accounts-
adjacent domains) remain untouched by either of today's two depth passes —
both took the government-finance angle instead, which is now confirmed
promising in two countries. **Natural next steps, not yet decided by
Thomas**: (a) build out Switzerland or Norway from their existing scouting
reports — Norway's KOSTRA in particular was flagged as bilingual and
"as strong as the Dutch Toelichting" by its own scout, which would make it
the fastest of the two to verify; (b) go back and complete either the
Netherlands or UK chain's own `_dropped` leads (both have several); (c) try
a candidate/non-EEA country (Serbia, Turkey, etc.) to see whether the
government-finance-formula pattern holds even where the national-accounts
layer showed weaker (aspirational, `cites`-only) EU-alignment language.

## Cheap checks still outstanding

**New this session:**

1. **Build the CYPS (Children and Young People's Services) RNF annex
   properly** — Census 2021, National Pupil Database, CiN and CLA datasets
   are named but not yet verified with the same table-code precision as the
   ASC annex. See `uk-local-government-finance.json`'s `_dropped` array.
2. **Mint a second council's CIPFA-Code citation** (York was found but not
   independently re-verified) to corroborate Wolverhampton's.
3. **Independently verify the Orkney Islands Council / North East
   Lincolnshire Council ERDF/ESF/ESIF citations** — real leads, subagent-
   read only, and in any case blocked on the `supersedes` relationship-type
   gap (Finding 3) until that's resolved.
4. **Propose (or decide against) a `supersedes` relationship_type** for this
   corpus's schema — the concrete UKSPF/EU-structural-funds case is ready to
   go the moment this is decided; it is a data-modelling decision, not a
   research one, and belongs to Thomas or whoever owns the schema.
5. **Norway's KOSTRA** — the scouting report's own top pick, bilingual,
   flagged as likely the fastest of the un-built candidates to verify.

**Carried forward from `G.48.md` and `G.47.md`, unchanged, still open**: all
items on both files' own lists. None were touched this session.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.49.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.3, §9 now 105 ids.
3. **`src/data/research/uk-local-government-finance.json`** and
   **`src/data/research/nl-municipal-finance.json`** — both slices' own
   `_dropped` arrays are the direct continuation points for cheap checks 1-3
   above and `G.48.md`'s own outstanding items.
4. **A browser**, for the outstanding cheap checks.
5. **The same caution `G.48.md` already carries**: prefer `curl` + direct
   text extraction (`pypdf` for PDFs, HTML-tag-stripping for web pages) over
   WebFetch's AI-summariser for anything that will become a quoted `basis`
   field. This session confirmed the method works cleanly on
   legislation.gov.uk and gov.uk, the same way it worked on
   wetten.overheid.nl and CBS for the Netherlands pass — UK government sites
   are not gated.
6. **Unresolved cross-cutting question for whoever owns the schema**: does
   this corpus want a `supersedes` relationship_type? The UKSPF/EU-
   structural-funds finding (Finding 3) is ready to become an edge the
   moment that's decided.

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
