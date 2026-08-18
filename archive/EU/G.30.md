# G.30.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read in full this session. Research.2.md
and Research.EU.md were **not** re-opened; last first-hand read remains G.24,
now seven sessions back.
Predecessor: G.29.md (2026-08-05).

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
2. **This file**, in full, and **especially the headline result** — this
   session found the branch's best lead yet for a real statistics-funded node.
3. **The four imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`.
   **Unchanged this session.**
4. **`EU/AnnexB_assessment_2026-08-05.md`** — the branch's central negative
   result, which this session's finding qualifies rather than overturns (see
   Headline result).
5. **`EU/slices/README.md`** — folder layout. **Unchanged this session.**
6. **This session's new Part A record**:
   `EU/SEC03_Title08_PartA_2026-08-05.md` — Title 08 (Agriculture and Maritime
   Policy) in full, all seven chapters, EUR 54.98bn CA, the largest Title in
   the whole Draft Budget. **Read record S03-12 first** — it is the reason
   this file exists.
7. **`EU/SEC03_Title01_PartA_2026-08-05.md`** — Title 01, from the predecessor
   session.
8. **`EU/EU Meta jsons.docx`** — the rediscovered chat-era archive (see
   `G.29.md` finding 2). Not touched further this session; still worth a
   search before re-extracting any new SEC03 Title from the raw PDF.
9. The other Part A records in `EU/`: `SEC01-SEC02_PartA_2026-08-05.md`,
   `SEC08-SEC09-SEC10_PartA_2026-08-05.md`, `SEC05_PartA_2026-08-04.md` (the
   format exemplar), `SEC06-SEC07_PartA_2026-08-05.md`,
   `AnnexXI_PartA_2026-08-05.md`, `SEC250_PartA_2026-08-05.md`.

**Where things are, as of 2026-08-05 (end of day, tenth working session in
this file's numbering):**

- **The graph is unchanged.** Still 137 reports, 215 dependencies, 154 dropped
  notes. This session extracted; it did not slice or import.
- **SEC03 now has two Titles fully extracted**: Title 01 (Research and
  Innovation, EUR 13.8bn) and Title 08 (Agriculture and Maritime Policy,
  EUR 54.98bn — the largest Title in the document). **~950 of SEC03's
  1,114 pages remain untouched** — Titles 02–07, 09–16, 20, 21, 30, all
  revenue Titles, and the Annexes.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Retrieval, unchanged from G.26–G.29:**

- **`eur-lex.europa.eu` is anti-bot gated** to every client here. A human
  browser gets through.
- **`destatis.de` is fully reachable**, and so is `commission.europa.eu`
  (rate-limited).

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files — see `G.29.md`'s note on the two
separate Python installs on this machine.

## Session conditions — read this first

**One extraction session, filesystem access, no browser used.** Located
Title 08's page range in `SEC03.pdf` by scanning for chapter headings
(`pypdf`, printed pp. 299–331), read the whole Title in full — seven
chapters, all at item level except where a chapter's own internal repetition
made a consolidated record more honest than 40 near-identical entries (per
`Research.1.md` §6's "never bundle" balanced against S05-15/S05-16's own
precedent for when the count is the finding). Checked `EU Meta jsons.docx`
first for any existing Title 05/08 chapter-level material — none found, so
this Title's extraction is first-hand throughout, not ported.

What was read first-hand: `Research.1.md` in full (re-read); `SEC03.pdf`
printed pp. 299–331 (all of Title 08); `EU Meta jsons.docx`, searched (not
re-read end to end) to confirm no existing Title 08/05 material.

What was **not** done:

- **The Farm Sustainability Data Network / integrated farm statistics lead
  (finding 1, record S03-12) was not followed to a source.** Its founding
  regulations were not fetched; no publication title, cadence, or URL was
  established for what the FSDN or Eurofarm actually release. This is now
  the branch's top-priority cheap check.
- **No new PDF was fetched from the network.** The hash-verification queue
  is unchanged.
- **No slice was written to `EU/slices/`.** Same reasoning as every SEC03
  session so far — nothing here yet clears all three of §4's node
  conditions with a citable location.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, seven sessions back.
- **The blob was not sliced.** Still 960 staged records, unworked.
- **The D-item merge was not performed**, tenth session running, including
  the still-open reconciliation of `EU Meta jsons.docx`'s SEC09/SEC10
  batches against this branch's fresh extraction (`G.29.md` priority D).
- **Titles 02–07, 09–16, 20, 21, 30 of SEC03, and all revenue Titles, remain
  entirely unextracted.**

## Headline result

**The corpus-wide statistical absence — no `Eurostat`, no `HICP`, no named
price index, in ten sections/Titles tested since G.21 — breaks for the first
time, and it breaks in exactly the kind of location `Research.1.md` §7
predicted a strong hit would come from: a document naming its own inputs in
a "Data sources" or technical-assistance provision.**

Item 08 02 06 03 of the European Agricultural Guarantee Fund (EAGF) states
that its operational technical assistance covers *"a one-off financial
support to Member States to upgrade to the Farm Sustainability Data
Network, for the collection, processing, analysis, publication and
dissemination of farm accountancy and sustainability data,"* and *"contributions
to financing statistical surveys needed to monitor structures in the Union,
including the Eurofarm database."* The Legal basis block cites the Farm
Sustainability Data Network's founding regulation (Council Regulation (EC)
No 1217/2009, as converted from the Farm Accountancy Data Network by
Regulation (EU) 2023/2674) and the integrated-farm-statistics regulation
(Regulation (EU) 2018/1091) in full, with OJ and ELI references.

**This does not overturn `G.26.md`/`G.27.md`/`G.28.md`'s central finding —
it refines it.** The asymmetry those sessions found (EU instruments naming
no member-state publication) was measured against *administrative* budget
material — staff salaries, buildings, indexation mechanisms. This is the
first EU *programme* budget line examined that funds a data collection and
publication system directly, names it, and cites its statute. It is not yet
a minted node: no title, cadence or URL for the FSDN's or Eurofarm's actual
output was established this session. But it is the closest this branch has
come, in ten sections/Titles, to the shape of edge the whole EU sub-branch
was created to find.

## Findings

### 1. The Farm Sustainability Data Network / integrated farm statistics lead

Discussed in full above and at record S03-12. **What this rests on**:
first-hand reading of item 08 02 06 03's Remarks and Legal basis, printed
pp. 314–315 of `SEC03.pdf`. Not yet followed to Regulation (EC) No 1217/2009,
Regulation (EU) 2023/2674 or Regulation (EU) 2018/1091 themselves — all
three are named, OJ/ELI-cited, and (being EUR-Lex instruments rather than
member-state publications) may be reachable the way `COM(2025) 736` was, via
a route other than the gated `eur-lex.europa.eu` domain directly.

### 2. Title 08's market-intervention provisions name no price index, despite the subject matter

Sectoral interventions for fruit and vegetables, wine, hops, olive oil and
"other sectors" (Chapter 08 02, Article 08 02 02, EUR 2.27bn CA) and
market-related expenditure including public/private storage measures
(Article 08 02 03) are exactly the kind of provision where an EU regulation
might be expected to name a reference or intervention price index — the
mechanism by which such interventions are typically triggered in EU
agricultural law. **None of the extracted text does.** `reference price`,
`market price` and standalone `index` all return zero hits across the whole
of Title 08. This sharpens rather than weakens finding 1: the branch's one
real statistics hit is a data-collection-and-dissemination provision, not a
price-index citation, and the two should not be conflated. **What this
rests on**: string search over the full extracted text of Title 08,
first-hand this session.

### 3. Two non-standard MFF tags recur in a third code-position family

`DAG` (decentralised agencies) and `PPPA` (pilot projects/preparatory
actions), both catalogued by `G.21.md` in the `7.2.<section>9<TAG>`
position and already found in a `1.0.1<TAG>` position at Title 01
(`G.29.md`), recur here as `3.2.1DAG` and `3.2.1PPPA` — Title 08's own MFF
family. **What this rests on**: direct reading of Chapters 08 10 and 08 20's
MFF columns, first-hand this session, compared against `G.21.md` and
`G.29.md`'s own records.

## Secondary observations (logged, low priority)

- **A clean, checkable arithmetic reconciliation**: the European Fisheries
  Control Agency's budget line states "Total Union contribution 32,334,037 /
  of which amount coming from the recovery of surplus (revenue Article
  6 6 2) 51,390 / Amount entered in the budget 32,282,647" — verified exact
  (32,334,037 − 51,390 = 32,282,647). The clearest `calculated_from`-shaped
  internal relationship found in SEC03 to date.
- **A structured table of 17 bilateral fisheries agreements**, each with its
  own Council Decision, OJ reference and duration, several marked "Expired"
  in the table's own Duration column while their financing sits in the
  Draft Budget's largest single reserve line (EUR 126,350,000 CA) pending
  renegotiation. A record shape not seen elsewhere in this branch.
- **The CAP's legal basis is being actively amended mid-financial-year**:
  two amending regulations dated within months of the Draft Budget itself
  (Regulation (EU) 2025/2649, 19 December 2025; Regulation (EU) 2026/471,
  24 February 2026) sit in Chapter 08 02's own citation list — a
  higher-frequency amendment pattern than seen in any institutional
  section's legal basis.
- **Inter-fund transfer mechanisms** (EAFRD/EMFAF/EAGF articles allowing
  Member States to reallocate a fixed percentage of national allocations to
  InvestEU, the Border Management and Visa Instrument, the Recovery and
  Resilience Facility, or the Asylum, Migration and Integration Fund) are a
  documented financial-flow structure distinct from anything in the
  institutional sections — not a statistics dependency, but worth
  remembering if a funding-flow layer is ever built alongside the
  report-dependency graph.

## Corrections to prior sessions

**None.** No finding from G.15–G.29 was checked against new evidence and
found wrong this session. Finding 1 refines the central asymmetry finding
(`G.26.md`, `G.27.md`, `G.28.md`) rather than correcting it — those findings
were about administrative budget material and remain accurate for the
material they examined; this session examined a different kind of budget
line and found a different, qualifying result.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog. Underway.** Two Titles complete (01, 08). Per
`G.15.md` items 8–12, edited to reflect progress:

1. **NEW, top priority, ahead of any further SEC03 Title: follow the Farm
   Sustainability Data Network / integrated farm statistics lead to a
   source.** Retrieve Regulation (EC) No 1217/2009 (as converted by
   Regulation (EU) 2023/2674) and Regulation (EU) 2018/1091, and establish
   what the FSDN and/or Eurofarm actually publish — title, cadence, URL.
   This is the closest this branch has come to a real statistics node with
   documented EU funding; discharging it may produce the branch's first
   genuinely new node type since the German cross-layer edge.
2. **Titles 02–07, 09–16, expenditure.** Still open. Title 05 (Regional
   Development and Cohesion, EUR 44.0bn CA, second-largest) is now the
   highest-value remaining Title by size, Title 08 having closed this
   session.
3. **Titles 20, 21, 30.** Still open — Commission's own administrative
   expenditure and European Schools/Pensions, likely to follow the
   institutional-section shape rather than Title 01/08's programmatic shape.
4. **Annex "Staff" to Section III.** Still open, named at five locations in
   the chat-era batch.
5. **Annexed Offices.** Still open.
6. **Revenue Titles 3, 4, 6.** Still open.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, tenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.29: none new** — this was an extraction session that
produced a new, higher-priority lead rather than discharging a queued item.

Remaining, by value per unit effort — **item 1 below now outranks
everything else on this list**:

1. **NEW, highest value: retrieve Regulation (EC) No 1217/2009 / Regulation
   (EU) 2023/2674 / Regulation (EU) 2018/1091 and establish the FSDN's/
   Eurofarm's actual publication.** See priority B item 1 above.
2. Fetch and hash any of SEC01/02/03/06/07/08/09/10 against local copies.
3. Split `list-main-stats-2025-na` into nine records.
4. Re-measure E4 keying on quote, not id, and reconcile.
5. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed.
6. Retrieve Annex XI Article 1(4).
7. Retrieve the Eurostat Report of 31 October and establish its URL.
8. Read EBS Regulation 2019/2152 as a third test of the asymmetry.
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

1. **This file (`G.30.md`)** — paste as text, do not attach. **Read the
   Headline result before anything else.**
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/SEC03_Title08_PartA_2026-08-05.md`** — this session's extraction,
   record S03-12 especially.
4. **`EU/SEC03_Title01_PartA_2026-08-05.md`** — the predecessor SEC03 work.
5. **`src/data/research/de-destatis-national-accounts.json`** — the pattern
   that works for import, unchanged this session.
6. **The next target: a browser, to chase the FSDN/Eurofarm lead** (cheap
   check 1) — this now outranks further SEC03 Title extraction. If a
   browser is unavailable, **SEC03 Title 05** (Regional Development and
   Cohesion, EUR 44.0bn, second-largest remaining) is the next-best
   extraction target.
7. **A browser**, for cheap checks 1 (now highest priority), 2, 6, 7, 10.

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
