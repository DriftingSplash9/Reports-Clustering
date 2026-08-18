# G.32.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read in full this session. Research.2.md
and Research.EU.md were **not** re-opened; last first-hand read remains G.24,
now nine sessions back.
Predecessor: G.31.md (2026-08-05).

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
2. **This file**, in full. **The headline result corrects a standing branch
   finding — read it before assuming anything about the Annex XI chain.**
3. **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** — Annex XI's own
   primary text, read first-hand for the first time this session. **Names
   HICP (Belgium) and the national CPI (Luxembourg) directly** — the
   branch's best cross-layer edge lead, stronger than the FSDN/FSS lead.
4. **The five imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`,
   **and, new this session, `eurostat-farm-structure-survey.json`**. Corpus
   is now **138 reports, 215 dependencies, 157 dropped notes**.
5. **`EU/AnnexB_assessment_2026-08-05.md`** and **`EU/slices/README.md`** —
   the branch's central asymmetry finding. **This session's Annex XI finding
   qualifies it directly** — see Headline result and Corrections.
6. **`EU/FSDN_FSS_PartA_2026-08-05.md`** — the predecessor session's lead,
   now minted (see Findings).
7. **`EU/AnnexXI_PartA_2026-08-05.md`** — the existing record from
   COM(2025) 736, read *at one remove* from Annex XI itself. Its own header
   said Annex XI Article 1(4) was unread; that gap is now closed.
8. The other Part A records in `EU/`: `SEC03_Title08_PartA_2026-08-05.md`,
   `SEC03_Title01_PartA_2026-08-05.md`, `SEC01-SEC02_PartA_2026-08-05.md`,
   `SEC08-SEC09-SEC10_PartA_2026-08-05.md`, `SEC05_PartA_2026-08-04.md` (the
   format exemplar), `SEC06-SEC07_PartA_2026-08-05.md`,
   `SEC250_PartA_2026-08-05.md`.

**Where things are, as of 2026-08-05 (end of day, twelfth working session in
this file's numbering):**

- **The graph grew for the first time in three sessions.** 137 → **138
  reports**, 215 dependencies unchanged, 154 → **157 dropped notes**.
  `eurostat-farm-structure-survey` is imported, registered in
  `src/data/index.ts`, and validated (`npm run validate` and `npm run check`
  both pass, exit 0). It is currently **isolated** — no edges — the same
  documented, deliberate state `esa-2010` sat in before the German
  cross-layer edge connected it.
- **`eur-lex.europa.eu` is confirmed browser-reachable for a second kind of
  document.** `G.31.md` established this for individual Regulations; this
  session confirmed it for a 561,936-character **consolidated** text (the
  full Staff Regulations, CELEX `01962R0031-20240101`) — no gating, full
  text returned.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**One session split between minting a slice and browser research.** First
half: drafted, staged, validated and registered the `eurostat-farm-structure-survey`
slice per `G.31.md`'s priority item 0 — staged at
`EU/slices/eu-level/eurostat-farm-structure-survey.json`, moved to
`src/data/research/`, registered in `src/data/index.ts`, `npm run validate`
and `npm run check` both exit 0. Second half: fetched and read the
consolidated Staff Regulations (Annex XI) via the `Claude_Browser` tool,
following up on `G.31.md`'s newly-cheap EUR-Lex checks.

What was read first-hand: `Research.1.md` in full (re-read); the full
consolidated Staff Regulations text at CELEX `01962R0031-20240101` (561,936
characters, searched and read in full at every section quoted, not
skimmed); `EU/FSDN_FSS_PartA_2026-08-05.md` and `EU/AnnexXI_PartA_2026-08-05.md`,
re-read to confirm what each already established before adding to it.

What was **not** done:

- **The ten-vs-eleven Member States discrepancy (finding 2) was not
  resolved.** COM(2025) 736 says ten; the consolidated Staff Regulations
  text (dated 01.01.2024) lists eleven, including the United Kingdom.
  Flagged, not adjudicated.
- **HICP and the Luxembourg CPI were not minted as nodes.** Named directly
  by Annex XI's own text (AXI-02), but whether "Belgium's HICP" is the
  right grain for a node, and what its own cadence/URL would be, was not
  established this session.
- **EBS Regulation 2019/2152 was not read** — queued as a cheap check since
  before this session and still outstanding.
- **No PDF binary was hash-verified via the browser** — this session's
  EUR-Lex fetches were all HTML text, not the `SEC*.pdf` files.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, nine sessions back.
- **The blob was not sliced.** Still 960 staged records, unworked.
- **No further SEC03 Titles were extracted.**

## Headline result

**Annex XI's own text — read first-hand for the first time in this branch —
names two national statistical releases directly, which corrects
`G.22.md`'s reading of the same chain and produces the strongest
cross-layer edge lead the branch has found.**

`G.22.md`, working only from COM(2025) 736 (a report that applies Annex XI
without quoting its text in full), reported the salary-update chain as
`AGENCY ONLY` at the national boundary: *"Eurostat calculates this index on
the basis of price information provided by the Belgian and Luxembourgish
authorities."* **Annex XI's own Article 1(2) says more**: *"That index
(hereinafter the 'Joint Index') shall be calculated by weighting national
inflation (as measured by the Harmonised Indices of Consumer Prices (HICP)
in the case of Belgium and the Consumer Prices Index (CPI) in the case of
Luxembourg)..."* HICP and the Luxembourg CPI are named, titled, recurring
national statistical releases — not "price information."

This is the first time in the EU branch that the supranational-to-national
chain, followed to its primary source, has produced a **named** release
rather than stopping at `AGENCY ONLY`. It does not overturn the central
asymmetry finding wholesale (`G.26.md`–`G.28.md`'s administrative-budget
material and the ESA 2010/Annex B chain both still hold as measured), but
it is a real counter-example within the very instrument (Annex XI) that
produced one of the two central negative results, and it was found by
reading the primary source instead of a secondary report about it — exactly
the distinction `Research.1.md` §2 insists on.

**Secondarily**: the `eurostat-farm-structure-survey` lead from `G.30.md`/
`G.31.md` is now minted — the corpus's first new node in three sessions, and
the fifth EU-branch slice.

## Findings

### 1. Annex XI names HICP and the Luxembourg CPI directly — a correction, not an overturn

Discussed in full above and at record AXI-02 in
`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`. **What this rests on**:
first-hand reading of the consolidated Staff Regulations, Annex XI, Article
1(2), at CELEX `01962R0031-20240101`. **Scope of the correction**: this
qualifies `G.22.md`'s specific characterisation of this one provision. It
does not touch `G.26.md`/`G.27.md`/`G.28.md`'s findings about
institutional-budget material, nor the Annex B/ESA 2010 transmission-programme
finding, which remain as measured.

### 2. A discrepancy between "ten" and "eleven" Member States in the salary-update sample

COM(2025) 736 refers to "the ten Member States referred to in Article
1(4)". The consolidated Staff Regulations text (01.01.2024) lists eleven:
"Belgium, Germany, Spain, France, Italy, Luxembourg, Netherlands, Austria,
Poland, Sweden and United Kingdom" — the United Kingdom, which left the EU
in 2020, is still present in this codified sample. **What this rests on**:
direct comparison between the consolidated text (read first-hand this
session) and G.22's own quotation of COM(2025) 736 (not re-read this
session). Not resolved — flagged per `Research.1.md` §3.

### 3. The Eurostat annual report is a statutory deliverable, not a standing publication with its own title

Record AXI-01. Article 1(1) of Annex XI creates the report — "Eurostat
shall draw up every year before the end of October a report on changes in
the cost of living..." — rather than pointing to an existing titled
publication. **This discharges the "Eurostat Report of 31 October" cheap
check by resolving what it actually is**, not by locating a separate
document. **What this rests on**: direct reading of Article 1(1), first-hand
this session.

### 4. The browser-fetch technique confirmed for a second document type

`G.31.md` established that individual EUR-Lex Regulations load through the
browser tool without the anti-bot gate non-browser clients hit. This
session confirmed the same for a **561,936-character consolidated legal
text** spanning the entire Staff Regulations and all thirteen of its
annexes — the largest single document successfully fetched this way so far.
**What this rests on**: direct observation this session.

## Secondary observations (logged, low priority)

- **`eurostat-farm-structure-survey` is imported and isolated**, matching
  the documented pattern the loader supports on purpose ("Isolated reports
  are kept, as of V0.12"). It will surface under `validate`'s ISOLATED
  section alongside `fed-h15`, `ab-municipalaffairs-lgff-operating` and
  `napcs` until the FADN edge (or another) connects it.
- **Annex XI's Article 3(2) confirms the Joint-Index-times-specific-indicator
  arithmetic at the primary source**, strengthening the existing
  `calculated_from` classification recorded at one remove in
  `EU/AnnexXI_PartA_2026-08-05.md` via COM(2025) 736.
- **A second, independent citation of `esa-2010`** turned up in Annex XI
  Article 1(4) — GDP weighting for the specific indicator and "real per
  capita emoluments" both cite "the national accounts definitions in the
  European System of Accounts currently in force." Not a new node, but a
  new citation of an existing one, from a different provision than the one
  already recorded in `esa-2010.json`.

## Corrections to prior sessions

1. **`G.22.md`'s characterisation of the Annex XI salary chain as
   `AGENCY ONLY` — overstated for Article 1(2) specifically.** `G.22.md`
   worked entirely from COM(2025) 736's paraphrase and explicitly could not
   read Annex XI itself (its source was gated). Annex XI's own text names
   HICP (Belgium) and the Luxembourg CPI directly. `G.22.md`'s broader
   finding — no member-state publication named for the salary-update
   *sample composition* or the *national statistical institutes'* role —
   is **confirmed**, not overturned; only the cost-of-living index
   component (Article 1(2)) had more disclosure than the secondary report
   showed. Finding 1.

2. **No other finding in G.15–G.31 was checked against new evidence and
   found wrong this session.**

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.30.md`/`G.31.md`. Title 05
(Regional Development, EUR 44.0bn) is the largest remaining Title.

**NEW, item 0, ahead of further SEC03 work: chase the HICP/Luxembourg-CPI
lead (finding 1) to a mintable edge.** Establish whether "Harmonised Index
of Consumer Prices" and "Luxembourg's national CPI" clear `Research.1.md`
§4's node conditions from their own authoritative sources (Eurostat for
HICP methodology, STATEC for Luxembourg's CPI), and if so draft the edge
`[EU salary-update mechanism / Annex XI] -> hicp` and/or `-> lu-cpi`. This
is now the single best-evidenced cross-layer lead in the branch, ahead of
the FADN/FSS lead from the predecessor session (which still needs FADN's
own site, unreachable so far).

**C — Independent ECB/Eurosystem threads, after B.** Unchanged.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, twelfth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.31: two of the oldest items on the list.** Annex XI Article
1(4) (finding 2, though the ten/eleven discrepancy it surfaced is now its
own open item) and the Eurostat Report of 31 October (finding 3, resolved
by explaining what it is rather than locating a separate document).

Remaining, by value per unit effort:

1. **NEW, highest value: chase HICP / Luxembourg CPI to a mintable edge.**
   See priority item 0 above.
2. **NEW: resolve the ten-vs-eleven Member States discrepancy** (finding
   2) — check whether a more recent consolidated date exists on EUR-Lex, or
   whether COM(2025) 736's "ten" reflects an unwritten administrative
   practice.
3. Read EBS Regulation 2019/2152 as a third test of the asymmetry — now
   cheap, same browser technique.
4. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies — confirm
   the browser technique extends to PDF downloads, not just EUR-Lex HTML.
5. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata (the predecessor session's lead, still open).
6. Split `list-main-stats-2025-na` into nine records.
7. Re-measure E4 keying on quote, not id, and reconcile.
8. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed
   (four EU nodes now import including a fifth from this session).
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

1. **This file (`G.32.md`)** — paste as text, do not attach. **Read the
   Headline result first — it corrects a standing finding.**
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** — this session's
   primary-source read, the reason to prioritise the HICP/CPI edge lead.
4. **`src/data/research/eurostat-farm-structure-survey.json`** and
   **`EU/FSDN_FSS_PartA_2026-08-05.md`** — the fifth slice, now imported.
5. **A browser** (the `Claude_Browser` tool) — for the HICP/CPI lead, the
   ten-vs-eleven discrepancy, EBS Regulation 2019/2152, and the PDF-hash
   question.
6. **The next target if a browser session**: chase the HICP/Luxembourg CPI
   lead first (priority item 0). **If no browser**: SEC03 Title 05
   (Regional Development, the largest remaining Title) is the fallback.

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
