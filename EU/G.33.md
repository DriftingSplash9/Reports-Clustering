# G.33.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read in full this session. Research.2.md
and Research.EU.md were **not** re-opened; last first-hand read remains G.24,
now ten sessions back.
Predecessor: G.32.md (2026-08-05).

**This hand-off closes a long run of same-day sessions** (G.26 through G.33,
all 2026-08-05) because the conversation producing them is being handed to a
fresh agent for context-budget reasons, not because the work reached a
natural stopping point. Read this file as if the branch could be picked up
by someone with zero memory of today — because it will be.

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
3. **The six imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`,
   `eurostat-farm-structure-survey.json`, **and, new this session,
   `eurostat-hicp.json`**. Corpus is now **139 reports, 215 dependencies,
   158 dropped notes**.
4. **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** and
   **`EU/HICP_PartA_2026-08-05.md`** — the primary-source read that produced
   this session's headline: Annex XI names HICP and Luxembourg's CPI
   directly, correcting `G.22.md`'s `AGENCY ONLY` reading.
5. **`EU/AnnexB_assessment_2026-08-05.md`** and **`EU/slices/README.md`** —
   the branch's central asymmetry finding. Still standing for administrative
   budget material and the ESA 2010/Annex B chain; this session's HICP find
   sits alongside it as a documented exception within Annex XI specifically,
   not an overturn.
6. **`EU/FSDN_FSS_PartA_2026-08-05.md`** — the Farm Structure Survey lead,
   minted last session as `eurostat-farm-structure-survey`.
7. The other Part A records in `EU/`: `SEC03_Title08_PartA_2026-08-05.md`,
   `SEC03_Title01_PartA_2026-08-05.md`, `SEC01-SEC02_PartA_2026-08-05.md`,
   `SEC08-SEC09-SEC10_PartA_2026-08-05.md`, `SEC05_PartA_2026-08-04.md` (the
   format exemplar), `SEC06-SEC07_PartA_2026-08-05.md`,
   `SEC250_PartA_2026-08-05.md`, `AnnexXI_PartA_2026-08-05.md` (the
   COM(2025) 736 read, now understood as one remove from the primary
   source).

**Where things are, as of 2026-08-05 (end of day, thirteenth working session
in this file's numbering):**

- **The graph grew for the second session running.** 138 → **139 reports**,
  215 dependencies unchanged, 157 → **158 dropped notes**.
  `eurostat-hicp` is imported, registered in `src/data/index.ts`, and
  validated (`npm run validate` and `npm run check` both exit 0). It is
  currently **isolated**, same documented pattern as
  `eurostat-farm-structure-survey` and `esa-2010` before their own edges (if
  any) landed.
- **`eur-lex.europa.eu` and Eurostat's own metadata pages (`ec.europa.eu`)
  are both confirmed browser-reachable** across four separate fetches this
  session and last (three EUR-Lex CELEX documents, two Eurostat metadata
  pages). This is now well-established, not a one-off.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**One short browser-research session, following directly on `G.32.md`'s
top priority.** Fetched and read Eurostat's own HICP metadata page
(`https://ec.europa.eu/eurostat/cache/metadata/en/prc_hicp_esms.htm`),
confirmed HICP clears `Research.1.md` §4's node conditions, drafted and
validated a sixth EU slice. **This session was deliberately time-boxed** —
the conversation producing it is being handed to a fresh agent for
context-budget reasons, so work stopped at a clean, fully-documented point
rather than continuing to chase every open thread.

What was read first-hand: `Research.1.md` in full (re-read); Eurostat's
HICP metadata page, in full.

What was **not** done, and is the natural next work:

- **Luxembourg's own national CPI (STATEC) was not reached.** Time-boxed in
  favour of writing up HICP and handing off cleanly. This is now the single
  cheapest remaining piece of the HICP/CPI lead — one browser fetch to
  STATEC's own site.
- **The HICP→salary-mechanism edge was not minted**, because the dependent
  end (the annual Commission report/decision applying Annex XI) is not
  itself modelled as a node in this corpus. Recorded as `no-node-yet` in
  `eurostat-hicp.json`'s own `_dropped` block, not invented.
- **The ten-vs-eleven Member States discrepancy from `G.32.md` was not
  investigated further.**
- **EBS Regulation 2019/2152 was not read.**
- **No PDF binary was hash-verified via the browser** — still only HTML
  pages have been fetched this way.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, ten sessions back.
- **The blob was not sliced. No further SEC03 Titles were extracted.**

## Headline result

**`eurostat-hicp` is minted, cleanly, and is the fastest-cadence node in the
EU branch** — Eurostat's own metadata page states "the data are
disseminated monthly, around the middle of the month that follows the
reference month," with a flash estimate even faster. It clears all three of
`Research.1.md` §4's conditions from a single authoritative source, the
same evidence class as `eurostat-farm-structure-survey`.

**The dependency that motivated finding it — Annex XI's Joint Index
depending on HICP — is recorded but not yet mintable**, because the EU side
of that edge (the annual Commission decision applying Annex XI) has no
node to attach to. This is the honest state of the branch's best
cross-layer lead: one end is now solid, the other end needs its own
modelling decision.

## Findings

### 1. HICP clears all three node conditions from Eurostat's own metadata

Record HICP-01 in `EU/HICP_PartA_2026-08-05.md`. **What this rests on**:
direct reading of Eurostat's own metadata page, first-hand this session.

### 2. The HICP→Annex XI edge is blocked on a modelling decision, not on evidence

The evidence is as strong as anything in the corpus (Annex XI's own text,
quoted verbatim at AXI-02 in the predecessor session's record). What is
missing is a node for the dependent side. **This is a scoping question for
whoever picks this up next**, not a research gap: does the branch model
"the annual EU staff salary/pension update" as a recurring series (the way
`eu-draft-budget` models the whole Draft Budget as one series with the
edition in the description), or does it model Annex XI's mechanism itself
as a node? Either choice is defensible; neither has been made. **What this
rests on**: direct comparison against the existing `eu-draft-budget.json`
precedent, read this session.

## Secondary observations (logged, low priority)

- **`eurostat-hicp` is modelled at EU-wide grain, not split by member
  state**, even though Annex XI's own citation is specifically to "the case
  of Belgium." Flagged in the slice's own `_open_questions` as a possible
  future split, matching the precedent `Report.part_of` already
  establishes in `src/lib/types.ts` for exactly this kind of
  series-vs-component question.

## Corrections to prior sessions

**None new this session.** `G.32.md`'s correction to `G.22.md` (Annex XI's
`AGENCY ONLY` characterisation overstated for Article 1(2) specifically)
stands as recorded there; this session only extended it by confirming
HICP's own node conditions, without revising the correction itself.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged. Title 05 (Regional Development, EUR
44.0bn) is the largest remaining Title.

**Item 0, ahead of further SEC03 work, now split into two cheap sub-tasks:**

1. **Fetch Luxembourg's own CPI metadata from STATEC** (Luxembourg's
   national statistical institute) to establish its own node conditions,
   the same way this session did for HICP. One browser fetch, likely
   fifteen minutes of work.
2. **Decide how to model the EU staff salary/pension update mechanism as a
   node** (or decide not to, and record why) so the HICP/CPI→[mechanism]
   edges can actually be minted. This is a real design decision, not a
   lookup — flag it to Thomas if the next session isn't confident making
   the call alone.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, thirteenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.32: HICP's own node conditions** (finding 1).

Remaining, by value per unit effort:

1. **Fetch Luxembourg's national CPI from STATEC.** See priority item 0.1.
2. **Resolve the ten-vs-eleven Member States discrepancy** (`G.32.md`
   finding 2).
3. Read EBS Regulation 2019/2152 as a third test of the asymmetry.
4. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies — confirm
   the browser technique extends to PDF downloads, not just HTML.
5. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
6. Split `list-main-stats-2025-na` into nine records.
7. Re-measure E4 keying on quote, not id, and reconcile.
8. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
   (six EU nodes now import).
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

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.33.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/HICP_PartA_2026-08-05.md`** and
   **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** — this session's
   and the predecessor's finding, and the modelling decision they leave
   open.
4. **`src/data/research/eurostat-hicp.json`** and
   **`eurostat-farm-structure-survey.json`** — the two newest slices.
5. **A browser** (the `Claude_Browser` tool) — for STATEC, the ten-vs-eleven
   discrepancy, EBS Regulation 2019/2152, and the PDF-hash question.
6. **The next target if a browser session**: STATEC for Luxembourg's CPI,
   then the modelling decision in priority item 0.2. **If no browser**:
   SEC03 Title 05 (Regional Development) is the fallback.

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
