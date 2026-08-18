# G.35.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-checked §4, §5a, §6 for this
session's minting decision; not reopened cover to cover. Research.2.md and
Research.EU.md were **not** re-opened; last first-hand read remains G.24,
twelve sessions back.
Predecessor: G.34.md (2026-08-05).

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
3. **The eight imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`,
   `eurostat-farm-structure-survey.json`, `eurostat-hicp.json`,
   `lu-statec-cpi.json`, **and, new this session,
   `eurostat-remuneration-update-report.json`**. Corpus is now **142 reports,
   218 dependencies, 161 dropped notes**.
4. **`EU/EurostatRemunerationReport_PartA_2026-08-05.md`** — this session's
   primary-source read: Eurostat's own "Civil servants remuneration" web
   section, which supplied the missing piece (a retrievable URL) for a node a
   predecessor session had already all-but-proposed.
5. **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** (records AXI-01
   through AXI-05) and **`EU/AnnexXI_PartA_2026-08-05.md`** (records C736-01
   through C736-12, especially **C736-03**) — the two records this session's
   node rests on. **C736-03 already proposed the id used here** — read its
   NOTES to see exactly what was missing before this session.
6. **`EU/STATEC-CPI_PartA_2026-08-05.md`** and `lu-statec-cpi.json` —
   last session's Luxembourg finding, which this session's `_dropped` entries
   reference but do not resolve.
7. **`EU/slices/README.md`** — the branch's central asymmetry finding.
   **Still standing overall**, but this session's edges are a third and
   fourth instance of the *exception* shape (member-state/EU-body → EU
   standard, `methodology_depends_on` or `uses_data_from`, disclosure running
   upward), alongside `de-destatis-national-accounts → esa-2010` and
   `lu-statec-ipch → eurostat-hicp`.
8. The other Part A records in `EU/`: `HICP_PartA_2026-08-05.md`,
   `AnnexB_assessment_2026-08-05.md`, `FSDN_FSS_PartA_2026-08-05.md`,
   `SEC03_Title08_PartA_2026-08-05.md`, `SEC03_Title01_PartA_2026-08-05.md`,
   `SEC01-SEC02_PartA_2026-08-05.md`, `SEC08-SEC09-SEC10_PartA_2026-08-05.md`,
   `SEC05_PartA_2026-08-04.md` (the format exemplar),
   `SEC06-SEC07_PartA_2026-08-05.md`, `SEC250_PartA_2026-08-05.md`.

**Where things are, as of 2026-08-05 (end of day, eighteenth working session
in this file's numbering):**

- **The graph grew for the fourth session running.** 141 → **142 reports**,
  216 → **218 dependencies**, 160 → **161 dropped notes**.
  `eurostat-remuneration-update-report` is imported, registered in
  `src/data/index.ts`, and validated (`npm run validate` and `npm run check`
  both exit 0).
- **`eurostat-hicp` is no longer isolated.** It carried zero edges from the
  session it was minted (`G.33.md`) through last session (`G.34.md`); this
  session gives it its first incoming edge, `eurostat-remuneration-update-report
  → eurostat-hicp`. Its file's own `_dropped` block, which had carried the
  `no-node-yet` lead since it was minted, is now empty — the lead is
  resolved, not abandoned.
- **`eurostat-remuneration-update-report` carries two outgoing edges from the
  moment it is minted** — `→ eurostat-hicp` and `→ esa-2010` — an unusually
  well-connected debut for an EU node; every prior EU node (`esa-2010`,
  `eurostat-farm-structure-survey`, `eurostat-hicp`) shipped isolated and
  waited one or more sessions for its first edge.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**One short browser-research session, following directly on `G.34.md`'s
priority item 0.2** — which that file's own author framed as "a real design
decision... flag it to Thomas if the next session isn't confident making the
call alone." **This session found the framing was not quite right**: a
predecessor session (the one that produced `EU/AnnexXI_PartA_2026-08-05.md`,
before `G.33.md`) had already effectively made the modelling call — it named
the report, proposed the id `eurostat-remuneration-update-report`, and
confirmed all three `Research.1.md` §4 node conditions from a single
footnote (C736-03) — and stopped only because the report's own URL had not
been retrieved. That is a lookup, not a judgment call, so this session
proceeded without checking back with Thomas first, on the view that
executing a predecessor's already-evidenced proposal is squarely within
scope for a single-topic browser pass. **If this judgment call itself turns
out to be wrong** — i.e. if Thomas would rather have been asked — that is
worth surfacing explicitly to him rather than silently correcting in a
future session's Part A record.

What was read first-hand: Eurostat's "Civil servants remuneration" web
section — Overview, Publications and Quality sub-pages — in full, via
browser, including expanding the Publications page's collapsed accordion to
retrieve the linked report list.

What was **not** done, and is the natural next work:

- **The Intermediate reports, Detailed A64/A65 reports, estate agency rent
  survey and mission-expenses series** on the same Eurostat Publications page
  were seen (linked, dated, titled) but not separately modelled. Each looks
  like its own mintable node under the same evidence standard just applied.
- **The Luxembourg-side identification remains open** — whether Annex XI's
  "CPI... in the case of Luxembourg" is `lu-statec-ipcn` or `lu-statec-ipch`.
  Recorded as `no-document` this session rather than guessed.
- **The ten-vs-eleven Member States discrepancy is not resolved**, only
  bears on favourably (ERR-04, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`).
- **EBS Regulation 2019/2152 was not read.**
- **No PDF binary was hash-verified via the browser** — this session's
  fetches were HTML pages only, though the Publications page's own report
  links are to PDFs, none of which were opened.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, twelve sessions back.
- **The blob was not sliced. No further SEC03 Titles were extracted.**

## Headline result

**The branch's oldest open cross-layer lead is closed.** `eurostat-hicp` was
minted in `G.33.md` with a documented but unbuildable edge — Annex XI names
it as an input to the EU staff salary mechanism, but that mechanism had no
node. This session supplies the node (`eurostat-remuneration-update-report`,
sourced from `Research.1.md` §4-clearing evidence a predecessor session had
already assembled) and the edge lands: `eurostat-remuneration-update-report
→ eurostat-hicp` (`uses_data_from`). **A second edge came with it for free**
— `→ esa-2010` (`methodology_depends_on`), on a GDP-weighting citation
(AXI-04) that had been sitting in a Part A record since before `G.33.md` with
nowhere to attach.

**The framing this session inherited — "a real design decision" — turned out
to overstate the difficulty.** The decision had already been made by
implication; what was missing was one browser fetch. Worth noting plainly,
since the alternative reading (treat every flagged "design decision" as
requiring Thomas's sign-off before proceeding) would have left this lead
closed for another session for no real reason.

## Findings

### 1. `eurostat-remuneration-update-report` clears all three node conditions, corroborated by two independent documents

Records ERR-01 and ERR-02, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`.
**What this rests on**: direct reading of Eurostat's own Publications page,
first-hand this session, cross-checked against C736-03's footnote quote
(read first-hand in an earlier session, per that record's own header).
Cadence is doubly evidenced — a stated frequency ("late October") and 22
consecutive years of linked publications.

### 2. `eurostat-remuneration-update-report → eurostat-hicp` and `→ esa-2010` are both documented, `Research.1.md` §5a-clean edges

**What this rests on**: AXI-02 and AXI-04 (`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`),
both read first-hand in a predecessor session, not re-verified against
EUR-Lex this session — flagged per house convention as *(AXI-02, AXI-04 per
predecessor session)*. Neither is a "comparable with" trap: AXI-02 states
the Joint Index "shall be calculated by weighting national inflation (as
measured by the [HICP]...)" — an input statement — and AXI-04 states GDP
weighting is "measured... in accordance with the national accounts
definitions in the European System of Accounts" — the same "in accordance
with" obligation language that carried `de-destatis-national-accounts →
esa-2010` and `lu-statec-ipch → eurostat-hicp`.

### 3. Eurostat's own current terminology ("the sample of 10") bears on, but does not close, `G.32.md`'s ten-vs-eleven discrepancy

Record ERR-04, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`. **What
this rests on**: direct reading of Eurostat's Quality page, first-hand this
session. Listing the United Kingdom separately from "the sample of 10" is
consistent with the consolidated Annex XI text's eleven-country list
(AXI-04) being stale rather than the reverse, but this quote describes
assessment coverage, not the Article 1(4) sample definition — not
adjudicated.

## Secondary observations (logged, low priority)

- **Eurostat's Publications page uses a lazy-loaded accordion** — link URLs
  for each year's report are not in the initial DOM and require the page's
  own "Expand all" control (or equivalent JS interaction) before they can be
  extracted. Same shape as last session's Legilux finding
  (`G.34.md`) — worth generalising as a pattern: EU-adjacent government sites
  in this branch tend to collapse detail behind a click.
- **The Publications page's file-metadata titles** ("Eurostat Remuneration
  Report [year]") **and the operative Commission report's footnote title**
  ("Eurostat Report of [date]... on the annual update of remuneration and
  pensions of EU officials...") **are two different renderings of the same
  series**, not a discrepancy — recorded in ERR-02 so a future session does
  not mistake one for a distinct publication.

## Corrections to prior sessions

**None.** This session executes a proposal `EU/AnnexXI_PartA_2026-08-05.md`
(predating `G.33.md`) already made, and closes a lead `G.33.md`/`G.34.md`
both left open. Neither predecessor's claims are revised — `G.34.md`'s
framing of item 0.2 as requiring Thomas's judgment is noted as an
overstatement in *Session conditions* above, not logged here as a
correction, since it was a forward-looking flag rather than a factual claim.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged. Title 05 (Regional Development, EUR
44.0bn) is the largest remaining Title.

**Item 0 — closed.** Both sub-tasks (STATEC's own CPI, and the EU staff
salary-mechanism modelling decision) are done as of this session. No further
item 0 work queued; the next candidate priority is the newly-visible
Eurostat report series named in *Cheap checks* below.

**C — Independent ECB/Eurosystem threads.** Now unblocked — item B/0 chain
that sat ahead of it is clear. Still lower priority than SEC03 Title 05 by
Thomas's own ordering, unless he says otherwise.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, fifteenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.34: the EU staff salary-mechanism node, plus two edges**
(findings 1–2).

Remaining, by value per unit effort:

1. **Mint the other Eurostat civil-servants-remuneration series** — the
   Intermediate reports (twice-yearly, Extra-EU), Detailed A64/A65 reports,
   estate agency rent survey, and mission-expenses report are all titled,
   dated and linked from the same Publications page this session already
   opened. Cheapest next find in the branch — the page is already read.
2. **Resolve the ten-vs-eleven Member States discrepancy** (`G.32.md`
   finding 2, bears on favourably per ERR-04 but not closed).
3. Read EBS Regulation 2019/2152 as a third test of the asymmetry.
4. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies — confirm
   the browser technique extends to PDF downloads, not just HTML.
5. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
6. Split `list-main-stats-2025-na` into nine records.
7. Re-measure E4 keying on quote, not id, and reconcile.
8. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
   (eight EU nodes now import).
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
    servant salary regime) — cheap, one Legilux fetch, unrelated to but
    still open from `G.34.md`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.35.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/EurostatRemunerationReport_PartA_2026-08-05.md`** — this session's
   finding, and the pointer back to C736-03/AXI-02/AXI-04.
4. **`src/data/research/eurostat-remuneration-update-report.json`** — the
   newest slice, with two outgoing edges and two open `_dropped` leads
   (Luxembourg identification, national civil-service data).
5. **A browser** (the `Claude_Browser` tool) — for the other Eurostat
   civil-servants-remuneration series (cheap check 1), the ten-vs-eleven
   discrepancy, EBS Regulation 2019/2152, and the PDF-hash question.
6. **The next target if a browser session**: cheap check 1 (the other
   Eurostat series on the same already-open page) is the highest
   value-per-effort item in the branch right now. **If no browser**: SEC03
   Title 05 (Regional Development) is the fallback.

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
