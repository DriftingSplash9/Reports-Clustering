# G.36.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-checked §4, §5a, §6 for this
session's minting decisions (including the decision not to mint two
candidates); not reopened cover to cover. Research.2.md and Research.EU.md
were **not** re-opened; last first-hand read remains G.24, thirteen sessions
back.
Predecessor: G.35.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — the standing brief. Evidence standard,
   Part A record format, slice schema, the two traps, and **the only copy of the
   §9 node-id list**.
2. **This file**, in full.
3. **The ten imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`,
   `eurostat-farm-structure-survey.json`, `eurostat-hicp.json`,
   `lu-statec-cpi.json`, `eurostat-remuneration-update-report.json`, **and, new
   this session, `eurostat-remuneration-satellite-series.json`**. Corpus is now
   **145 reports, 219 dependencies, 162 dropped notes**.
4. **`EU/EurostatRemunerationReport_PartA_2026-08-05.md`** — read this file's
   **addendum section (ERR-05 through ERR-09)** for this session; the body
   above it is `G.35.md`'s territory.
5. **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** and
   **`EU/AnnexXI_PartA_2026-08-05.md`** (especially **C736-04**, the
   Extra-EU interim report's title source) and **`EU/STATEC-CPI_PartA_2026-08-05.md`**
   — background this session's findings build on.
6. **`EU/slices/README.md`** — the branch's central asymmetry finding.
   **Still standing.** This session's one new edge (`eurostat-remuneration-update-report
   → eurostat-remuneration-rent-survey`) is *within* the EU layer, not a
   cross-layer instance — the fifth cross-layer edge overall
   (`de-destatis-national-accounts → esa-2010`, `lu-statec-ipch →
   eurostat-hicp`, `eurostat-remuneration-update-report → eurostat-hicp`,
   `→ esa-2010`) is still last session's, not this one's.
7. The other Part A records in `EU/`, unchanged from `G.35.md`'s list.

**Where things are, as of 2026-08-05 (end of day, nineteenth working session
in this file's numbering, and the second in a same-day continuation started
by Thomas's own follow-up request):**

- **The graph grew for the fifth session running.** 142 → **145 reports**
  (three at once), 218 → **219 dependencies**, 161 → **162 dropped notes**.
  `eurostat-remuneration-satellite-series` is imported, registered in
  `src/data/index.ts`, and validated (`npm run validate` and `npm run check`
  both exit 0).
- **Two of three newly-investigated candidates minted; the fourth thing
  investigated (A64/A65 detail) turned out not to be a candidate at all.**
  Thomas's own request named three categories — intermediate reports, A64/A65
  detail, rent surveys. Intermediate reports split into two genuinely
  separate series (Intra-EU, Extra-EU) and were both minted; the rent survey
  was minted with an edge; the A64/A65 "detailed reports" turned out, on
  inspection of their own file names, to be appendices of the already-minted
  annual report — a finding, recorded as a `_dropped` `note`, not a gap.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**Same-day continuation of the session that produced `G.35.md`, at Thomas's
own direct follow-up request**: "mint the other Eurostat civil-servants-remuneration
series (intermediate reports, A64/A65 detail, rent surveys)." No browser
gap between sessions — the Publications and Methodology pages were already
open from the prior session's work and were re-expanded (both carry
lazy-loaded accordions) rather than re-navigated cold.

What was read first-hand: Eurostat's Publications page (all six categories,
full accordion expansion, link `href`s extracted via the page's own DOM —
same technique `G.35.md` used for the annual reports) and the Methodology
page (Correction coefficients, Joint Belgium-Luxembourg index, and Estate
agency rent surveys sub-sections, also expanded).

What was **not** done, and is the natural next work:

- **The mission-expenses report** — the sixth category on the same
  Publications page — was not researched. Thomas's request named three
  categories; this was not one of them, so it was left alone rather than
  assumed in scope.
- **No data-input edge was found for the two interim report series
  themselves** (as opposed to the rent survey, which got one). The
  Methodology page describes HICP sub-indices and ECP PPP data feeding
  correction-coefficient calculation *in general*, not tied specifically to
  either interim series by name — a stretch was avoided rather than a lead
  missed; see `_open_questions` in the new slice.
- **The Luxembourg CPI identification question remains open**, though a
  corroborating (not conclusive) quote was found this session and folded
  into the existing `_dropped` entry rather than treated as a resolution.
- **The ten-vs-eleven Member States discrepancy is unchanged** from
  `G.35.md`.
- **EBS Regulation 2019/2152 was not read.**
- **No PDF binary was hash-verified via the browser.**
- **`Research.2.md` and `Research.EU.md` were not re-opened.**
- **The blob was not sliced. No further SEC03 Titles were extracted.**

## Headline result

**Three requested series, three different outcomes, and all three are worth
recording as such.** The Estate Agency Rent Surveys cleared node conditions
and produced a documented edge into the report already in the graph — the
strongest outcome available. The Intra-EU and Extra-EU intermediate reports
cleared node conditions but produced no edge — a clean, honest isolated
mint, the same shape most EU nodes have shipped in. **The A64/A65 "detailed
reports" cleared nothing, because on inspection they are not a separate
publication at all** — their own file names identify them as appendices of
the report already modelled. Reporting that as a finding, rather than
quietly minting two more nodes to satisfy the letter of the request, is the
choice this session made and is worth stating plainly in case it is not
what Thomas wanted.

## Findings

### 1. Estate Agency Rent Surveys (EARS): named, annual, and a documented input to the already-minted annual report

Record ERR-07, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What
this rests on**: Eurostat's own Methodology page, first-hand this session.
"Rent parities are based on market rents obtained from special surveys of
estate agencies" is a direct input statement — not a Research.1 §5a trap —
so `eurostat-remuneration-update-report → eurostat-remuneration-rent-survey`
(`uses_data_from`) is minted.

### 2. Two genuinely distinct intermediate-report series, isolated on import

Records ERR-05 (Intra-EU) and ERR-06 (Extra-EU),
`EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What this rests on**:
Eurostat's Publications page cadence statements, first-hand this session,
plus — for the Extra-EU series — C736-04's title, read first-hand in an
earlier session *(C736-04 per predecessor session)*. Different reference
dates and release months from each other and from the annual report confirm
these are separate series, not restatements.

### 3. The A64/A65 "detailed reports" are appendices, not a series — a documented non-node

Record ERR-08, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What
this rests on**: the reports' own linked file names ("...Eurostat
Remuneration Report 2025 Appendix 3...", "...EurostatReport2025_Appendix_2..."),
retrieved first-hand this session. Not minted, on the corpus's own measured
finding about `Report.part_of` (`src/lib/types.ts`): splitting a component
from its parent release understates the parent's authority rather than
adding real information.

### 4. "Domestic concept" vs. "national concept" bears on, but does not close, the Luxembourg CPI identification question

Record ERR-09, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What
this rests on**: Eurostat's own Methodology page, first-hand this session.
Corroborates, without confirming, the reading already flagged in
`EU/STATEC-CPI_PartA_2026-08-05.md` that Annex XI's "CPI... in the case of
Luxembourg" means `lu-statec-ipcn`. Folded into the existing `_dropped`
entry in `eurostat-remuneration-update-report.json` as an update, not a new
entry — per `Research.1.md` §3, reported as a reading, not adjudicated.

## Secondary observations (logged, low priority)

- **Both Eurostat pages used this session (Publications, Methodology) share
  the same lazy-loaded-accordion pattern** already noted for Legilux in
  `G.34.md`. Worth treating as the default assumption for any EU-adjacent
  government or agency site in this branch going forward, rather than
  re-discovering it each time.
- **The Methodology page is a genuinely rich primary source in its own
  right**, beyond what this session used it for — it names the UN ICSC,
  OECD, NATO, ESA (the space agency, not the accounting standard — a naming
  collision worth flagging so a future session does not conflate them), CoE,
  ECMWF and EUMETSAT as collaborators, and describes school-fee and
  household-expenditure surveys not otherwise mentioned anywhere in this
  branch. Not researched further this session — flagged as a rich
  unexploited source, not a specific lead.

## Corrections to prior sessions

**None.** This session extends `G.35.md`'s node and does not revise any
predecessor's claims.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged. Title 05 (Regional Development, EUR
44.0bn) is the largest remaining Title.

**Item 0 — closed** since `G.35.md`. This session's work was a direct
follow-up request from Thomas, not a numbered priority item — recorded here
for continuity, not as a new open item.

**C — Independent ECB/Eurosystem threads.** Unchanged, still unblocked.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, sixteenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.35: EARS, Intra-EU interim, Extra-EU interim minted; A64/A65
detail investigated and correctly not minted** (findings 1–3).

Remaining, by value per unit effort:

1. **Mint the mission-expenses report**, the last unresearched category on
   the same already-open Eurostat Publications page — cadence is not
   annual (2015, 2019, 2021, 2024, 2026 are the linked years), so check
   whether the Methodology page's own "regularly reviewed" language is
   specific enough to clear `Research.1.md` §4's cadence condition before
   minting; may be the branch's first genuinely irregular EU cadence.
2. **Resolve the ten-vs-eleven Member States discrepancy** (`G.32.md`
   finding 2).
3. Read EBS Regulation 2019/2152 as a third test of the asymmetry.
4. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
5. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
6. Split `list-main-stats-2025-na` into nine records.
7. Re-measure E4 keying on quote, not id, and reconcile.
8. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
   (ten EU nodes now import, counting both files from this session).
9. Pull the `[NA-Pen] / Table 29` thread.
10. Check whether SEC09's total-level sign flip has a stated explanation
    elsewhere (`G.28.md` finding 1).
11. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
12. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches against
    `SEC08-SEC09-SEC10_PartA_2026-08-05.md`.
13. Check whether sc-47–sc-50 exist anywhere; characterise the 155 non-`S`
    loose records; match the 8 record-less batch headers; enumerate the
    `9`-series tags beyond `SPEC`/`DAG`/`PPPA`/`OTH`.
14. Read Art. 11 of the loi modifiée du 22 juin 1963 (Luxembourg's civil
    servant salary regime) — still open from `G.34.md`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.36.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/EurostatRemunerationReport_PartA_2026-08-05.md`**, addendum section
   (ERR-05 through ERR-09) — this session's findings.
4. **`src/data/research/eurostat-remuneration-satellite-series.json`** and
   **`eurostat-remuneration-update-report.json`** — the newest slices; the
   latter's `_dropped` block carries the Luxembourg-identification lead and
   the AGENCY ONLY national-data lead, both still open.
5. **A browser** (the `Claude_Browser` tool) — for the mission-expenses
   report (cheap check 1, same already-open Publications page), the
   ten-vs-eleven discrepancy, EBS Regulation 2019/2152, and the PDF-hash
   question.
6. **The next target if a browser session**: the mission-expenses report is
   cheapest (page already open) but check its cadence carefully before
   minting — it may not clear §4 as cleanly as this session's three did.
   **If no browser**: SEC03 Title 05 (Regional Development) is the
   fallback.

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
