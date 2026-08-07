# G.39.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-checked §3, §4, §5, §6 and §8 for
this session's promotion-of-staged-material and one-item-at-a-time
decisions; not reopened cover to cover. Research.2.md and Research.EU.md —
**located and read in full this session** (as `EU/Research.2.md.docx` and
`EU/Research.eu.docx`; see priority D below). Last first-hand read before
this session: G.24, sixteen sessions back.
Predecessor: G.38.md (2026-08-05).

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
3. **The thirteen imported EU slices**, in `src/data/research/` — the
   eleven from `G.38.md`'s list, **plus, new this session,
   `eurosystem-ecb.json` and `ecfin-business-consumer-surveys.json`**.
   Corpus is now **150 reports, 220 dependencies, 165 dropped notes**.
4. **`EU/SEC03_Title06-07_PartA_2026-08-05.md`** — SEC03 sampling continues:
   Title 07 (third-largest, EUR 20.6bn) plus a bonus find in Title 06's
   closing item.
5. **`EU/Eurosystem-ECB_PartA_2026-08-05.md`** — priority item C opens after
   nineteen hand-offs unchanged. Read this file's own header carefully: it
   explains which quotes were freshly verified this session and which were
   promoted from a previously-staged, never-checked batch
   (`EU/slices/_staging/10-batch-with-records.ndjson`, index 68).
6. **`EU/Research.2.md.docx`** and **`EU/Research.eu.docx`** — **found this
   session**. Prior hand-offs (as far back as `G.19.md`) referred to these
   as `.md` files at the project root; **they do not exist there**. They are
   `.docx` files inside `EU/`, much smaller than assumed (19,119 and 4,171
   characters respectively — Research.2.md.docx is smaller than a fifth of
   `Research.1.md`). Read in full this session via `python-docx`. **The
   merge itself (priority D) is still to do** — this session only located,
   read, and scoped it; see priority section below for what the merge now
   needs.
7. **`EU/slices/README.md`** — the branch's central asymmetry finding.
   Unchanged this session — no cross-layer edges were minted.
8. Everything else unchanged from `G.38.md`'s list.

**Where things are, as of 2026-08-05 (end of day, twenty-third working
session in this file's numbering, and the fifth in the same-day
continuation started by Thomas's own follow-up requests):**

- **The graph grew for the first time since `G.36.md`.** 146 → **150
  reports** (four at once), 220 dependencies unchanged (all four new nodes
  ship isolated), 163 → **165 dropped notes**. Both new slices imported,
  registered in `src/data/index.ts`, validated (`npm run validate` and
  `npm run check` both exit 0).
- **Priority item C (ECB/Eurosystem) is open for the first time since it
  was ranked in `G.20.md`.** Not closed — three nodes minted, a fourth
  thread found and deliberately not chased (Eurobarometer), several
  staging batches surveyed but not opened.
- **A long-standing file-location error is corrected**: every hand-off
  since at least `G.19.md` referred to `Research.2.md` and `Research.EU.md`
  as root-level `.md` files. They are `.docx` files in `EU/`. This session
  is the first to actually locate and open them under their real names.
- `TODO LISTS/rolling-todo.md` — updated this session with one Merged entry
  covering all of SEC03 Title 06/07 and the ECB/Eurosystem work together.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**Fifth same-day continuation session, on Thomas's own three-part
direction**: "sample sec03 more, then redirect to the eurosystem/ecb, then
we can work on the merge." Followed in that order. The third part (the
merge) turned out to require a preliminary step none of the last sixteen
sessions had done — actually finding the two documents under their real
filenames — so this session's contribution to D is locating and reading
them, not yet writing the merged brief itself. **This is a scope
correction worth flagging plainly**: the merge was never four sessions
away from being unblocked, as `G.19.md`-era notes claimed; it was blocked
on a wrong file path the whole time, silently carried forward through
sixteen hand-offs.

What was read first-hand: `EU/SEC03.pdf` printed pp. 244–297 (Title 06's
closing item plus Title 07, sampled); the EUR-Lex text of Guideline (EU)
2024/2941 (ECB/2024/31), Articles 26 and 28 (spot-checked against staged
quotes, both matched verbatim); the ECB's own annual-balance-sheet and
weekly-financial-statement landing pages, via browser; a saved PDF of the
ESS-ESCB MIP quality report (all 38 pages available, four read closely);
DG ECFIN's Business and Consumer Surveys landing page and its "latest
surveys" subpage, via browser; and `EU/Research.2.md.docx` and
`EU/Research.eu.docx` in full, via `python-docx`.

What was **not** done, and is the natural next work:

- **The Research.2/Research.EU merge itself was not written.** This
  session's contribution is locating, reading, and (in the priority section
  below) re-scoping the task — the actual consolidated brief is still to
  produce.
- **Eurobarometer (S03-23) was not verified live or minted.**
- **Commission Decision C(97) 2241 and Communication C(2016) 6634**
  (the Business and Consumer Surveys programme's own governing instruments)
  were not opened.
- **The second joint ECB-Eurostat report (ECB-07, "BOP-NA ROW consistency
  report") was not chased.**
- **Staging batches 47, 51–56, 61–62, 69–72** (dense Eurosystem accounting
  and monetary-operations content) were surveyed by density count only, not
  opened and verified.
- **`_staging/20-prose-sections.txt`** (~399k chars, unstructured prose)
  remains untouched, flagged since `G.20.md`.
- **Titles 02–04, 09–16, 20, 21, 30 of SEC03 remain unextracted.**
- **The ten-vs-eleven / EBS Regulation 2019/2152 / PDF-hash items from
  earlier hand-offs are unchanged** (the first is resolved, per `G.38.md`;
  the latter two are still open).

## Headline result

**Three separate threads advanced, and the most consequential finding is
about the branch's own bookkeeping, not the EU corpus.** SEC03 sampling
continues to restore the statistics-absence pattern while occasionally
surfacing a real node (the Business and Consumer Surveys programme, 1961
vintage, still running monthly). ECB/Eurosystem — the longest-unranked
priority item in the branch's history — finally opens, with three verified
nodes and the branch's fastest cadence yet (weekly). **But the most
important thing this session establishes is that priority D (the
Research.2/Research.EU merge) was never actually blocked on the reasons
sixteen consecutive hand-offs gave for it** — it was blocked on a file path
that stopped being true at some point before `G.19.md` and was never
re-checked. This is worth treating as a lesson about hand-off chains
generally: a claim repeated unchanged across many sessions is not
independently re-verified by that repetition.

## Findings

### 1. SEC03 Title 07 restores the statistics-absence pattern a third time; ESF+ repeats Title 05's exact eligibility formula

Records S03-23 and S03-24, `EU/SEC03_Title06-07_PartA_2026-08-05.md`. **What
this rests on**: sampled first-hand reading of `EU/SEC03.pdf` printed pp.
244–297, this session. The three-tier GDP-per-capita regional classification
is word-for-word identical to Title 05's ERDF formula (S03-18), now
confirmed in ESF+ — a genuine cohesion-policy-wide pattern, not a
Title-specific one. `Eurostat`, `HICP`, `NUTS` and `ESA 2010` remain absent
from the budget document's own text, third Title running.

### 2. The Joint Harmonised EU Programme of Business and Consumer Surveys is a 1961-vintage, still-monthly, node-clearing publication

Record S03-22, `EU/SEC03_Title06-07_PartA_2026-08-05.md`. **What this rests
on**: `EU/SEC03.pdf`'s own remarks (Item 06 20 04 01), plus live
verification this session via DG ECFIN's own landing page and "latest
surveys" subpage, both read first-hand via browser. Confirmed named,
titled, and cadenced (monthly, with a faster flash-estimate sub-release)
directly from the publisher's own dated release schedule — the same
evidentiary shape used for `eurostat-hicp` and the ECB's own balance-sheet
pages.

### 3. The Eurosystem's own balance-sheet publications are verified and promoted from a previously-staged, never-checked batch

Records ECB-01 through ECB-04, `EU/Eurosystem-ECB_PartA_2026-08-05.md`.
**What this rests on**: a staged batch in `EU/slices/_staging/10-batch-with-records.ndjson`
(index 68), produced by an earlier session and sitting unverified since —
this session cross-checked its EUR-Lex quotes (Articles 26 and 28 of
Guideline (EU) 2024/2941) against a live re-fetch, word-for-word match, and
independently confirmed both publication series' cadences directly on the
ECB's own site (27 years unbroken for the annual balance sheet; explicit
weekly-on-Tuesday statement for the financial statement). ECB-04 (the MFI
statistics soft link) was **not** independently re-verified and is flagged
as such, not silently promoted.

### 4. A third ECB-adjacent node, read fresh rather than promoted from staging, and a correction to the staged material's own title

Records ECB-05 through ECB-07, `EU/Eurosystem-ECB_PartA_2026-08-05.md`.
**What this rests on**: a freshly-fetched PDF (WebFetch's text summariser
could not parse it; the saved binary was read directly via `pypdf`, all 38
pages available). "This 12th joint annual quality report" is a direct,
stated edition count — the first EU node in this corpus evidenced this way
rather than by a counted publication list or a metadata cadence statement.
**Corrects the staged batch's own title ordering**: the document's cover
reads "ESS-ESCB," the staging file had "ESCB-ESCB" — recorded, not
silently harmonised.

### 5. The Research.2/Research.EU merge was blocked on a stale file-location claim, not on the reasons given for sixteen sessions

**What this rests on**: locating `EU/Research.2.md.docx` and
`EU/Research.eu.docx` this session and reading both in full, first-hand,
via `python-docx`. Every prior hand-off's Orientation section pointed at
root-level `.md` files that do not exist. See priority D below for what
this changes about the merge task's actual scope.

## Secondary observations (logged, low priority)

- **`u4unity.eu` and the ECB's own `ecb.europa.eu` PDF hosts both trigger
  browser file-download responses rather than page loads** when navigated
  to directly — the same pattern first logged for `u4unity.eu` in
  `G.38.md`. WebFetch's saved-binary-plus-`pypdf`-read technique now has
  two independent confirmations as the working fallback.
- **Domain-gap treatment continues to be the norm, not the exception, for
  every EU-branch node minted this session** — `monetary-policy` for the
  three ECB/DG ECFIN nodes is reasonably clean; `national-accounts` for
  the MIP quality report is a genuine reach, flagged in the slice's own
  `_open_questions`.
- **This session found the Eurosystem's balance-sheet publications are
  governed by the same instrument (Guideline (EU) 2024/2941) but under
  different Annexes** (V/VI for weekly, VII for annual) — worth remembering
  as a pattern if a future session finds more ECB publications: check the
  Annex list before assuming one Guideline means one publication.

## Corrections to prior sessions

1. **`Research.2.md` and `Research.EU.md` do not exist at the project
   root, as every hand-off since at least `G.19.md` has stated.** They are
   `EU/Research.2.md.docx` and `EU/Research.eu.docx` — much smaller than
   the file-size assumptions those hand-offs carried (`Research.2.md.docx`
   is 19,119 characters; `Research.1.md` alone is 27,538). **Overstated,
   not refuted** — the documents themselves are real and were genuinely
   read by an early session (per `G.15.md`-era notes), but the location
   given for finding them again was wrong, and no session between then and
   now re-verified the path before repeating the claim.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Title 07 now sampled alongside 08 and 05 (the
three largest Titles). Remaining: Titles 02–04, 09–16, 20, 21, 30 — same
open question from `G.38.md` about whether further blanket sampling is
worth it, now with an additional data point (Title 07 restored the
absence pattern a third time, with one real find outside the Title proper
entirely).

**C — Independent ECB/Eurosystem threads. Opened this session, not
closed.** Three nodes minted; Eurobarometer, the second joint ECB-Eurostat
report, and several dense staging batches remain. Worth another session's
attention before moving fully to D.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`.** **Located
and read this session, for the first time in sixteen sessions.** The merge
itself is not written. **Re-scoped, now that both are actually in hand**:
Research.2.md.docx (19,119 chars, 398 paragraphs) is close in shape to
Research.1.md and is very likely superseded by it in most respects — the
next session's first job is a side-by-side comparison to identify what, if
anything, Research.2 states that Research.1 does not, rather than assuming
a symmetric merge of two live documents. Research.eu.docx (4,171 chars, 45
paragraphs) is much shorter and is the more likely source of EU-specific
material worth folding in. **This is now the single most tractable open
item in the branch** — both documents are short, already read, and the
remaining work is comparison and drafting, not further research.

**E — Everything the blob split created.** Unchanged. Staging batches
47, 51–56, 61–62, 69–72 (surfaced this session) belong here too.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.38: SEC03 Title 07 sampled; ECB/Eurosystem opened (three
nodes); Research.2/Research.EU located** (findings 1–5).

Remaining, by value per unit effort:

1. **Write the Research.2/Research.EU merge** — now the cheapest
   high-value item in the branch; both source documents are short and
   already read. See priority D above for the re-scoped approach.
2. **Verify and mint Eurobarometer** (S03-23) — named, funded, cadence
   claimed ("regularly"), not yet checked live.
3. **The second joint ECB-Eurostat report** (ECB-07, "BOP-NA ROW
   consistency report") — named and dated, not yet chased.
4. **Read EBS Regulation 2019/2152** as a third test of the asymmetry.
5. **Regulation (EU) 2021/1058 / 2021/1060** — Title 05's GDP/GNI
   classification lead.
6. **Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091** — the
   Farm Sustainability Data Network's founding instruments, still the
   branch's strongest unfollowed statistical-release lead (S03-12).
7. Staging batches 47, 51–56, 61–62 (dense ECB/Eurosystem content, no
   meta provenance — worth a closer read before trusting) and 69–72
   (collateral/valuation/margin operational rules).
8. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
9. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
10. Split `list-main-stats-2025-na` into nine records.
11. Re-measure E4 keying on quote, not id, and reconcile.
12. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
    (thirteen EU nodes now import).
13. Pull the `[NA-Pen] / Table 29` thread.
14. Check whether SEC09's total-level sign flip has a stated explanation
    elsewhere (`G.28.md` finding 1).
15. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
16. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches against
    `SEC08-SEC09-SEC10_PartA_2026-08-05.md`.
17. Read Art. 11 of the loi modifiée du 22 juin 1963 (Luxembourg's civil
    servant salary regime) — still open from `G.34.md`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.39.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/Research.2.md.docx` and `EU/Research.eu.docx`** — now located and
   read; the merge (priority D) is the branch's most tractable open item.
4. **`EU/Eurosystem-ECB_PartA_2026-08-05.md`** and
   **`EU/SEC03_Title06-07_PartA_2026-08-05.md`** — this session's findings.
5. **`src/data/research/eurosystem-ecb.json`** and
   **`ecfin-business-consumer-surveys.json`** — the two newest slices.
6. **A browser** (the `Claude_Browser` tool) — for Eurobarometer, the
   BOP-NA ROW report, EBS Regulation 2019/2152, and the FSDN/ERDF
   regulation follow-ups.
7. **`python-docx`** — for reading `.docx` files (both Research briefs, and
   any other `EU/*.docx` predecessor files).
8. **The next target**: **priority D (the merge)** is now cheap and
   high-value — do it first. After that, Eurobarometer (cheap check 2) or
   continuing priority C (staging batches 47/51–56/69–72) are both
   reasonable next steps.

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
