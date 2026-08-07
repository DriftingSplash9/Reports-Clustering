# G.44.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0. Read §§2, 3, 6 before writing this
file; not reopened cover to cover otherwise.
Predecessor: G.43.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.0, unchanged this session.
2. **This file**, in full.
3. **`src/data/research/eurosystem-ecb.json`** — its `_dropped` entry for the
   MFI-statistics soft link is now resolved (refuted), not just flagged.
4. **Everything else unchanged from `G.43.md`'s list.**

**Where things are, as of 2026-08-05 (end of day, twenty-eighth working
session in this file's numbering, tenth in today's continuation):**

- **The corpus is unchanged in count** — still 154 reports, 222 dependencies.
  This session resolved an open question rather than adding to the graph.
- **A four-hand-off-old hedge is closed, and it closes as a refutation, not a
  confirmation.** `G.39.md`'s ECB-04 entry flagged a plausible edge
  (`ecb-mfi-balance-sheet-items -> ecb-eurosystem-weekly-financial-statement`
  or `-> ecb-eurosystem-annual-balance-sheet`) as blocked only on an
  unverified Annex citation. Verified this session: the citation does not
  point at either node. The edge does not exist.
- **A new, uninvestigated lead surfaced in passing**: Annex I row 4 of the
  same Guideline, "Disaggregated monthly financial statement of the
  Eurosystem," status Published, not yet chased.

## Session conditions — read this first

**Tenth part of today's continuation**, on Thomas's direct instruction to
"wire the `ecb-mfi-balance-sheet-items` edge" — the single cheap check
`G.43.md` had flagged as highest value-per-effort. Read Guideline (EU)
2024/2941 (ECB/2024/31) in full, live, via EUR-Lex
(`CELEX:32024O2941`) — all 33 articles and the opening of Annex I and Annex
II, located via in-page text search once `get_page_text`'s truncation made
scrolling to the specific footnote impractical. This is a narrow,
single-question session: one citation, checked precisely, nothing else
opened.

## Headline result

**The edge does not exist, and this is a good result, not a failed
errand.** Precise verification is exactly what `G.39.md`'s hedge was
withholding judgement for, and precision reveals the hypothesis was wrong,
not merely unconfirmed. `Research.1.md` §3 is explicit that a refuted
hypothesis is a good outcome; this is that, four hand-offs later than the
question was first raised, because nobody had opened the primary source to
the specific footnote until this session.

## Findings

### 1. The ECB-04 citation points at a third, distinct Annex I item, not at either of the corpus's two Eurosystem-accounting nodes

**What this rests on**: `eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024O2941`,
read in full live this session. Annex I ("Financial statements for the
Eurosystem") is a six-row table (Type of report / Internal-published /
Source of legal requirement / Purpose):

1. Daily financial statement — Internal
2. Disaggregated weekly financial statement — Internal
3. **Consolidated weekly financial statement of the Eurosystem** — Published,
   Article 15.2 of the Statute of the ESCB — **this is
   `ecb-eurosystem-weekly-financial-statement`**
4. Disaggregated monthly financial statement of the Eurosystem — Published,
   no cited legal-requirement instrument — **not investigated, see below**
5. **Monthly and quarterly financial information of the Eurosystem** —
   "Published and internal", legal basis "Statistical regulations, according
   to which MFIs have to deliver data" — **this is where footnote (1) is
   attached**
6. **Consolidated annual balance sheet of the Eurosystem** — Published,
   Article 26.3 — **this is `ecb-eurosystem-annual-balance-sheet`**

Footnote (1), attached to row 5 only: *"The monthly data feed into the
published aggregated statistical data required from monetary financial
institutions (MFIs) in the Union. Moreover, as MFIs, the central banks also
have to provide, on a quarterly basis, more detailed information than is
provided in the monthly data."* Row 5's own "source of legal requirement" —
the BSI statistical regulations — is the same instrument already cited as
`ecb-mfi-balance-sheet-items`'s own legal basis (`eurostat-edp-gfs-ecb-statistics.json`,
this branch, `G.43.md`). The footnote describes the Eurosystem central
banks' own dual role as MFI statistical reporters (row 5) feeding the
published BSI aggregate — a relationship internal to how BSI is itself
compiled, not a dependency of BSI on either of `eurosystem-ecb.json`'s two
published nodes (rows 3 and 6).

### 2. No fifth node is proposed for row 5

Row 5's legal-requirement column names the same regulations already
governing `ecb-mfi-balance-sheet-items`. Minting it separately would risk
exactly the "same programme under two ids" duplication `Research.1.md` §9
warns against, not add a distinct publication. Not minted.

## Secondary observations (logged, low priority)

- **Annex I row 4, "Disaggregated monthly financial statement of the
  Eurosystem," is Published, monthly, and has a stated purpose distinct from
  both existing Eurosystem nodes** ("Strengthening the Eurosystem's
  accountability and transparency by allowing for easy access to information
  on the assets and liabilities of individual Eurosystem central banks").
  No legal-requirement instrument is cited for it ("None" in the table), and
  it was not investigated further this session — noticed only because it sits
  one row above the footnote being checked. A real, cheap next lead.

## Corrections to prior sessions

1. **`eurosystem-ecb.json`'s ECB-04 `_dropped` entry (`G.39.md`) is
   corrected from `no-node-yet` to `wrong-target`.** Not refuted in content —
   the quote is real and correctly transcribed — but the entry's framing
   ("blocked only on the target node not existing yet") is superseded: the
   target node now exists (`G.43.md`) and the citation, once precisely
   located, does not point at it or at either of `eurosystem-ecb.json`'s two
   nodes. Updated in place in the JSON slice itself (data, not a hand-off
   file — editable per normal practice, unlike a `G.*.md` predecessor).

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.43.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged in overall status —
still advanced, not closed. This session closes one specific open question
from within it (the BSI soft-link) and opens one new one (Annex I row 4).

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`.

**E — Everything the blob split created.** Unchanged from `G.43.md`.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since `G.43.md`: the `ecb-mfi-balance-sheet-items` edge question is
resolved** (refuted, Findings 1–2; no edge added). New item from this
session, ranked first as the most direct continuation:

1. **Investigate Annex I row 4, "Disaggregated monthly financial statement of
   the Eurosystem"** (Guideline (EU) 2024/2941) — Published, monthly, no
   cited legal instrument, purpose stated as central-bank-level transparency.
   A candidate sixth EU-branch node in the same family as the two already
   minted from this Guideline, needing only a live ECB landing-page check
   for its own URL and cadence confirmation, the same pattern used for
   `ecb-eurosystem-annual-balance-sheet` and `ecb-eurosystem-weekly-financial-statement`.

**Unchanged from `G.43.md`, by value per unit effort:**

2. Fetch Guideline ECB/2021/14's own frequency article to resolve the
   Consolidated Banking Data cadence conflict (`G.43.md` Findings 2).
3. Check cadence for Supervisory Banking Statistics, Investment Funds
   statistics, and Insurance Corporations statistics.
4. Open the Alert Mechanism Report's own governing instrument to confirm the
   MIP scoreboard's annual cadence from the primary source.
5. Verify and mint Eurobarometer (S03-23).
6. The second joint ECB-Eurostat report (ECB-07, "BOP-NA ROW consistency
   report").
7. Read EBS Regulation 2019/2152.
8. Regulation (EU) 2021/1058 / 2021/1060 — Title 05's GDP/GNI
   classification lead.
9. Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091 — the
   Farm Sustainability Data Network's founding instruments (S03-12).
10. Any staging batches not among 47, 51–56, 61–62, 69–72 (`G.43.md` did not
    sweep the full `_staging/` directory).
11. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
12. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
    metadata.
13. Split `list-main-stats-2025-na` into nine records.
14. Re-measure E4 keying on quote, not id, and reconcile.
15. Delete `scripts/eu-schema-smoke.ts`.
16. Pull the `[NA-Pen] / Table 29` thread.
17. Check whether SEC09's total-level sign flip has a stated explanation
    elsewhere (`G.28.md` finding 1).
18. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
19. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches.
20. Read Art. 11 of the loi modifiée du 22 juin 1963.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.44.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.0, unchanged.
3. **`src/data/research/eurosystem-ecb.json`** — its `_dropped`/`_open_questions`
   entries now carry the resolved finding.
4. **A browser** (the `Claude_Browser` tool) — for cheap check 1 especially,
   a direct continuation of this session (same Guideline, next row of the
   same table).
5. **The next target**: cheap check 1 (Annex I row 4) is the most direct
   continuation and likely cheap — same source document, same verification
   pattern already used twice on this Guideline. Otherwise resume the CBD
   cadence conflict (check 2) or the three no-cadence ECB dataset leads
   (check 3).

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
