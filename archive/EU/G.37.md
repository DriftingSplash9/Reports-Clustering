# G.37.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-checked §4's cadence flexibility
language specifically for this session's honesty-about-irregular-cadence
decision; not reopened cover to cover. Research.2.md and Research.EU.md
were **not** re-opened; last first-hand read remains G.24, fourteen
sessions back.
Predecessor: G.36.md (2026-08-05).

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
3. **The eleven imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`,
   `eurostat-farm-structure-survey.json`, `eurostat-hicp.json`,
   `lu-statec-cpi.json`, `eurostat-remuneration-update-report.json`,
   `eurostat-remuneration-satellite-series.json`, **and, new this session,
   `eurostat-remuneration-mission-expenses-report.json`**. Corpus is now
   **146 reports, 220 dependencies, 163 dropped notes**. **All six categories
   on Eurostat's civil-servants-remuneration Publications page are now
   accounted for** — five minted as nodes, one (A64/A65 detail) documented as
   not a separate series.
4. **`EU/EurostatRemunerationReport_PartA_2026-08-05.md`** — read this
   file's **second addendum (ERR-10, ERR-11)** for this session; the first
   addendum (ERR-05–ERR-09) is `G.36.md`'s, the body above both is `G.35.md`'s.
5. **`EU/slices/README.md`** — the branch's central asymmetry finding.
   **Still standing.** This session's edge
   (`eurostat-remuneration-mission-expenses-report → eurostat-hicp`) is a
   fourth instance of the within-EU-layer "uses information already
   established, including HICP" pattern, not a new cross-layer instance.
6. Everything else unchanged from `G.36.md`'s list.

**Where things are, as of 2026-08-05 (end of day, twentieth working session
in this file's numbering, and the third in the same-day continuation started
by Thomas's own follow-up requests):**

- **The graph grew for the sixth session running.** 145 → **146 reports**,
  219 → **220 dependencies**, 162 → **163 dropped notes**.
  `eurostat-remuneration-mission-expenses-report` is imported, registered in
  `src/data/index.ts`, and validated (`npm run validate` and `npm run check`
  both exit 0).
- **Eurostat's civil-servants-remuneration Publications page is now fully
  worked through.** Six categories were listed on the page when it was first
  opened two sessions ago (`G.35.md`): Annual reports (minted `G.35.md`),
  Intermediate reports Intra-EU and Extra-EU (minted `G.36.md`), Detailed
  A64/A65 reports (investigated and found not to be a separate series,
  `G.36.md`), Estate Agency Rent Surveys (minted `G.36.md`), and Mission
  expenses report (minted this session). Nothing on that page is left
  unaccounted for.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**Third same-day continuation session**, following `G.36.md`'s own
cheap-checks list rather than a fresh request from Thomas — cheap check 1
there named the mission-expenses report as the cheapest remaining item on
the already-open Publications page, with an explicit caution to "check its
cadence carefully before minting." This session did that check and minted
anyway, on the view that an honestly-flagged approximate cadence is more
valuable to the corpus than leaving a titled, evidenced node out entirely —
consistent with `Research.1.md` §10's closing line, "if you are unsure
whether something is worth sending: send it with a quote." **If Thomas would
rather irregular-cadence nodes be flagged and left for his own call instead
of minted automatically, that is worth telling a future session explicitly**,
since this is the first time the branch has faced that specific judgment
call.

What was read first-hand: no new browser navigation this session — the
Methodology page's "Mission expenses" section had already been fetched in
full during the prior session's work (`G.36.md`'s addendum) and is quoted
directly from that same page load.

What was **not** done, and is the natural next work:

- **No document was found stating a fixed review interval** for the
  mission-expenses report — the `releases_per_year` figure is a computed
  approximation, flagged as such, not a documented rate. A future session
  finding SEC(2006) 397 (the 2005 framework methodology document named in
  ERR-10) or minutes of the "Article 64 and 65 expert Working Group" could
  potentially supply an actual stated interval.
- **The ten-vs-eleven Member States discrepancy is unchanged.**
- **EBS Regulation 2019/2152 was not read.**
- **No PDF binary was hash-verified via the browser.**
- **`Research.2.md` and `Research.EU.md` were not re-opened.**
- **The blob was not sliced. No further SEC03 Titles were extracted.**
- **The Methodology page's other unexploited material** — flagged as a
  secondary observation in `G.36.md` (school-fee surveys, household-
  expenditure surveys, the UN ICSC/OECD/NATO/ESA/CoE/ECMWF/EUMETSAT
  collaboration list) — remains unresearched.

## Headline result

**Eurostat's civil-servants-remuneration Publications page, opened three
sessions ago as a single research thread, is now fully worked through.** Six
categories, five nodes minted, one correctly identified as not a separate
series. The mission-expenses report closes it out, and does so while
surfacing the branch's first genuinely irregular EU cadence — a fact worth
keeping visible rather than papering over with a false precision, which is
exactly what this session's `cadence_note` does.

## Findings

### 1. The mission-expenses report clears naming and titling, but its cadence is approximated from an irregular observed record, not stated by any document

Record ERR-10, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What
this rests on**: the Methodology page's "Mission expenses" section, read in
a prior session and re-quoted here rather than re-fetched. Five reports
across 2015–2026 (4, 2, 3, 2 year gaps) gave `releases_per_year: 0.45`, an
approximation stated as such in the node's own `cadence_note` — the first
time this branch has cadenced a node this way rather than from a document's
explicit rate.

### 2. HICP sub-indices are a documented input to the mission-expenses methodology

Record ERR-11, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What
this rests on**: the same Methodology page passage. "Uses information
already established, including... the harmonised index of consumer prices"
is a direct input statement, matching the shape already established for the
rent survey edge (`G.36.md` finding 1). Minted:
`eurostat-remuneration-mission-expenses-report → eurostat-hicp`
(`uses_data_from`).

## Secondary observations (logged, low priority)

- **This is the fourth edge in the branch reading "uses information already
  established, including... the harmonised index of consumer prices" or a
  close paraphrase** — the annual report (via the Joint Index, AXI-02), the
  rent survey (`G.36.md`), and now the mission-expenses report all cite HICP
  as a shared input in near-identical language from the same Methodology
  page. Worth knowing this is one recurring sentence pattern on one Eurostat
  page producing multiple edges, not four independently-discovered facts —
  the evidentiary weight is real in each case, but the *diversity* of
  evidence sources is lower than the edge count alone would suggest.

## Corrections to prior sessions

**None.** This session extends `G.36.md`'s work and does not revise any
predecessor's claims.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged. Title 05 (Regional Development, EUR
44.0bn) is the largest remaining Title, and is now the natural next major
piece of work in the branch — the Eurostat civil-servants-remuneration
thread that has occupied the last three sessions is fully closed out.

**Item 0 — closed** since `G.35.md`. The Eurostat civil-servants-remuneration
follow-on work (this file and `G.35.md`/`G.36.md`) is also closed as of this
session.

**C — Independent ECB/Eurosystem threads.** Unchanged, still unblocked.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, seventeenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.36: the mission-expenses report minted, closing out the
Eurostat civil-servants-remuneration Publications page entirely** (findings
1–2).

Remaining, by value per unit effort:

1. **Resolve the ten-vs-eleven Member States discrepancy** (`G.32.md`
   finding 2) — now the cheapest open browser-research item in the branch,
   with the Eurostat thread fully closed.
2. Read EBS Regulation 2019/2152 as a third test of the asymmetry.
3. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
4. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
5. Split `list-main-stats-2025-na` into nine records.
6. Re-measure E4 keying on quote, not id, and reconcile.
7. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
   (eleven EU nodes now import).
8. Pull the `[NA-Pen] / Table 29` thread.
9. Check whether SEC09's total-level sign flip has a stated explanation
   elsewhere (`G.28.md` finding 1).
10. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
11. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches against
    `SEC08-SEC09-SEC10_PartA_2026-08-05.md`.
12. Check whether sc-47–sc-50 exist anywhere; characterise the 155 non-`S`
    loose records; match the 8 record-less batch headers; enumerate the
    `9`-series tags beyond `SPEC`/`DAG`/`PPPA`/`OTH`.
13. Read Art. 11 of the loi modifiée du 22 juin 1963 (Luxembourg's civil
    servant salary regime) — still open from `G.34.md`.
14. If ambitious: **find SEC(2006) 397** (named in ERR-10 as the 2005
    mission-expenses framework methodology) — could supply a stated review
    interval and upgrade `eurostat-remuneration-mission-expenses-report`'s
    cadence from an approximation to a documented rate.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.37.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/EurostatRemunerationReport_PartA_2026-08-05.md`**, second addendum
   (ERR-10, ERR-11) — this session's findings.
4. **`src/data/research/eurostat-remuneration-mission-expenses-report.json`**
   — the newest slice.
5. **A browser** (the `Claude_Browser` tool) — for the ten-vs-eleven
   discrepancy (now top of the cheap-checks list), EBS Regulation
   2019/2152, and the PDF-hash question. The Eurostat civil-servants-
   remuneration thread itself needs no further browser work.
6. **The next target if a browser session**: the ten-vs-eleven discrepancy
   is now the cheapest open item. **If no browser, or if Thomas wants a
   pivot**: SEC03 Title 05 (Regional Development) is the natural next major
   piece of work — B's backlog, now that the Eurostat thread is fully
   closed.

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
