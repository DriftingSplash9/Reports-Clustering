# G.38.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-checked §4, §5, §6 and §8 for
this session's absence-registry methodology and one-item-at-a-time
discipline; not reopened cover to cover. Research.2.md and Research.EU.md
were **not** re-opened; last first-hand read remains G.24, fifteen sessions
back.
Predecessor: G.37.md (2026-08-05).

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
3. **The eleven imported EU slices**, in `src/data/research/` — unchanged
   from `G.37.md`'s list. **This session added no JSON.** Corpus is still
   **146 reports, 220 dependencies, 163 dropped notes**.
4. **`EU/AnnexXI-TenElevenDiscrepancy_PartA_2026-08-05.md`** — closes a
   cheap check open since `G.32.md`, with a definitive primary-source
   resolution (see Findings 1).
5. **`EU/SEC03_Title05_PartA_2026-08-05.md`** — the branch's B-priority
   backlog item, now closed out alongside Title 08 (`G.29.md` era). SEC03's
   two largest Titles are both extracted; the meta-backlog (item B) shifts
   from "which Title next" to "is more SEC03 coverage worth it at all
   versus other priorities."
6. **`EU/slices/README.md`** — the branch's central asymmetry finding.
   **Unchanged this session** — no new edges were minted.
7. Everything else unchanged from `G.37.md`'s list.

**Where things are, as of 2026-08-05 (end of day, twenty-second working
session in this file's numbering, and the fourth in the same-day
continuation started by Thomas's own follow-up requests):**

- **The graph did not grow this session — the first session since `G.32.md`
  not to add a node or edge.** Both pieces of work were research-only: a
  resolved discrepancy and a fully-searched budget Title that returned no
  mintable lead of its own. **This is not a null result** — see Headline
  result below.
- **SEC03's two largest Titles (08 and 05, together EUR 98.99bn of the
  Draft Budget's roughly EUR 194.4bn Section III total) are now both fully
  extracted.** Title 08 was the exception to the corpus-wide statistics-
  absence pattern; Title 05 restores it.
- `TODO LISTS/rolling-todo.md` — updated this session with two Merged
  entries (the discrepancy resolution and the Title 05 extraction).

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**Fourth same-day continuation session, on Thomas's own direction**: "carry
on then work on the backlog" — read as two sequential instructions, both
followed in order. First, the cheap-checks list's top item (the
ten-vs-eleven discrepancy) was closed. Second, the B-priority backlog item
(SEC03 Title 05) was extracted in full, matching the depth and format of
the existing Title 08 record.

What was read first-hand: COM(2022) 180 final (fetched via WebFetch after a
direct browser navigation triggered a file-download response rather than a
page load — the PDF was retrieved and read from the saved binary instead),
a fresh direct EUR-Lex fetch of Annex XI Article 1(4)(a) itself (via
browser, confirming the reachable-via-browser technique still holds), and
`EU/SEC03.pdf` printed pp. 202–222 (Title 05 in full), read from disk with
`pypdf`.

What was **not** done, and is the natural next work:

- **Regulation (EU) 2021/1058 and Regulation (EU) 2021/1060 were not
  opened** — the natural next step if Title 05's GDP/GNI classification
  lead is worth following, but flagged as lower-value than Title 08's
  still-open FSDN lead (S03-12).
- **Titles 02–04, 06–07, 09–16, 20, 21, 30 of SEC03 remain unextracted** —
  roughly 890 of SEC03's 1,114 pages.
- **COM(2022) 180's own secondary lead was not chased** — it is itself a
  statutory periodic report (Article 15(2) of Annex XI) with a named
  predecessor (COM(2018) 830), a possible third recurring Eurostat/
  Commission series. Flagged, not researched.
- **EBS Regulation 2019/2152 was not read.**
- **No PDF binary was hash-verified via the browser** — this session's PDF
  read (COM(2022) 180) came via WebFetch's saved binary, not a
  browser-mediated hash check.
- **`Research.2.md` and `Research.EU.md` were not re-opened.**
- **The blob was not sliced. No further blob-derived records were mined.**

## Headline result

**Two results, neither of which added to the graph, both of which
strengthen the corpus's evidentiary discipline.** The ten-vs-eleven
discrepancy is not merely closed — it turns out to have been correctly
predicted by neither the "stale text" nor the "undocumented practice"
reading, and the actual mechanism (a self-executing exclusion plus an
unused escape-valve threshold) is more interesting than either guess.
**Title 05's exhaustive search returned nothing to mint, and that absence
is itself the result**: it restores the corpus-wide pattern (EU budget
documents state eligibility formulas as bare percentages, naming no
statistical source) that Title 08's Farm Sustainability Data Network find
was the single exception to. A session that only refutes is still a
result, and this file records two.

## Findings

### 1. The ten-vs-eleven Member States discrepancy is resolved by the source's own drafting, not by staleness or shortcut

Records TEN-01 through TEN-03,
`EU/AnnexXI-TenElevenDiscrepancy_PartA_2026-08-05.md`. **What this rests
on**: COM(2022) 180 final, read first-hand this session, cross-checked
against a fresh direct EUR-Lex fetch of Article 1(4)(a). Article 1(4)(a)
names eleven Member States as a base list while separately granting the
European Parliament and Council power to adopt a replacement sample
representing "at least 75% of the Union gross domestic product." Brexit
excluded the UK automatically (it simply stopped being "a Member State"),
and the remaining ten still clear that 75% threshold on their own — so no
replacement sample was ever legislated, and the base list was never
textually amended, because nothing required it to be. `G.32.md` finding 2
is resolved, not merely borne out.

### 2. Title 05's own text restores the corpus-wide statistics-absence pattern

Records S03-17 through S03-21, `EU/SEC03_Title05_PartA_2026-08-05.md`.
**What this rests on**: full first-hand extraction of `EU/SEC03.pdf`
printed pp. 202–222, this session. ERDF's three-tier GDP-per-capita
regional classification (S03-18) and the Cohesion Fund's GNI-per-capita
threshold (S03-19) are both `AGENCY ONLY` — no Eurostat, no NUTS, no ESA
2010, searched and absent across the whole Title, despite the entire Title
being organised around regional statistical categories. Title 08's FSDN
find (`G.29.md` era) remains the single exception in eleven sections/Titles
tested this way.

## Secondary observations (logged, low priority)

- **The same inter-fund transfer mechanism S03-14 found in Title 08
  (EAFRD/EMFAF → InvestEU, BMVI, RRF, AMIF) recurs in Title 05, running the
  other direction** (ERDF → InvestEU, BMVI, EMFAF), this time with real
  figures rather than placeholder `p.m.` rows. Two independent Titles now
  carry this pattern — worth its own note in a future cross-Title synthesis
  rather than treating each sighting as a fresh find.
- **Title 05 carries no `30 02 02` reserve**, unlike Title 08's EUR
  126.35m fisheries-agreement reserve (S03-15). A documented contrast, not
  a gap — worth knowing before assuming every large Title carries one.
- **`u4unity.eu` triggers a file-download response rather than a page load**
  when navigated to directly with the browser tool, but is fetchable via
  WebFetch, which returns the binary for local reading. A second retrieval
  path worth remembering alongside the browser-reachability findings
  already logged for `legilux.public.lu` and the Eurostat civil-servants-
  remuneration pages.

## Corrections to prior sessions

**None.** Finding 1 resolves `G.32.md` finding 2's open question without
contradicting anything `G.32.md` itself claimed — that session correctly
identified the discrepancy and correctly declined to adjudicate it.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** **Both of the two largest Titles (08 and 05)
are now extracted.** Remaining: Titles 02–04, 06–07, 09–16, 20, 21, 30 —
none individually as large as either of the two just done, and the
statistics-absence pattern is now well-enough established (ten of eleven
sections/Titles tested return nothing) that further blanket Title-by-Title
extraction has a lower expected yield than it did before this session.
**Worth a explicit decision from Thomas**: continue exhaustively through
remaining Titles, or treat SEC03's own text as thoroughly enough sampled
and redirect effort to C or D below, keeping SEC03 available for a
targeted read if a specific lead (e.g. Regulation 2021/1058/1060) is
followed later.

**C — Independent ECB/Eurosystem threads, after B.** Candidate next major
direction if B is judged sufficiently sampled.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, eighteenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`. The longest-standing
open item in the branch — worth flagging as a candidate for the next
session regardless of the B/C decision above.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.37: ten-vs-eleven discrepancy resolved; SEC03 Title 05
extracted** (findings 1–2).

Remaining, by value per unit effort:

1. **Read EBS Regulation 2019/2152** as a third test of the asymmetry —
   now the cheapest open browser-research item.
2. **Regulation (EU) 2021/1058 / 2021/1060** — the natural next step on
   Title 05's GDP/GNI classification lead, if pursued; lower priority than
   item 3.
3. **Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091** — the
   Farm Sustainability Data Network's founding instruments (S03-12,
   `SEC03_Title08_PartA_2026-08-05.md`), still the branch's strongest
   unfollowed statistical-release lead.
4. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies — confirm
   the browser technique extends to PDF downloads, not just HTML.
5. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
6. Split `list-main-stats-2025-na` into nine records.
7. Re-measure E4 keying on quote, not id, and reconcile.
8. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
   (eleven EU nodes now import).
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
15. If ambitious: COM(2022) 180's own Article 15(2) reporting requirement —
    check whether it produces a recurring series alongside COM(2018) 830
    (secondary observation, this session).

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.38.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/AnnexXI-TenElevenDiscrepancy_PartA_2026-08-05.md`** and
   **`EU/SEC03_Title05_PartA_2026-08-05.md`** — this session's two records.
4. **No new JSON slice this session** — the eleven already-imported slices
   are unchanged.
5. **A browser** (the `Claude_Browser` tool) — for EBS Regulation
   2019/2152 (now cheapest), the Regulation 2021/1058/1060 or FSDN
   follow-ups if pursued, and the PDF-hash question.
6. **The next target**: **Thomas's own call on the B-priority question**
   above (continue SEC03 Title-by-Title, or redirect to C/D) is the single
   highest-value thing to settle before the next research session. Absent
   that, EBS Regulation 2019/2152 is the cheapest unblocked browser item,
   and `Research.2.md`/`Research.EU.md` merge (D) is the longest-standing
   open item.

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
