# G.34.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read relevant sections (§4, §5a, §6,
§9) this session, not reopened cover to cover. Research.2.md and Research.EU.md
were **not** re-opened; last first-hand read remains G.24, eleven sessions back.
Predecessor: G.33.md (2026-08-05).

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
3. **The seven imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`,
   `eurostat-farm-structure-survey.json`, `eurostat-hicp.json`, **and, new this
   session, `lu-statec-cpi.json`**. Corpus is now **141 reports, 216
   dependencies, 160 dropped notes**.
4. **`EU/STATEC-CPI_PartA_2026-08-05.md`** — the primary-source read that
   produced this session's headline: Luxembourg's own statute establishing both
   its harmonised and national CPIs in one article, and naming the national one
   as the input to Luxembourg's wage-indexation mechanism.
5. **`EU/HICP_PartA_2026-08-05.md`** and
   **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** — last session's HICP
   finding and the AXI-02 quote this session's STATEC read bears on.
6. **`EU/AnnexB_assessment_2026-08-05.md`** and **`EU/slices/README.md`** —
   the branch's central asymmetry finding. Still standing; this session adds a
   *second* member-state → EU `methodology_depends_on` edge of the same shape
   as the first (`de-destatis-national-accounts → esa-2010`).
7. **`EU/FSDN_FSS_PartA_2026-08-05.md`** — the Farm Structure Survey lead.
8. The other Part A records in `EU/`: `SEC03_Title08_PartA_2026-08-05.md`,
   `SEC03_Title01_PartA_2026-08-05.md`, `SEC01-SEC02_PartA_2026-08-05.md`,
   `SEC08-SEC09-SEC10_PartA_2026-08-05.md`, `SEC05_PartA_2026-08-04.md` (the
   format exemplar), `SEC06-SEC07_PartA_2026-08-05.md`,
   `SEC250_PartA_2026-08-05.md`, `AnnexXI_PartA_2026-08-05.md`.

**Where things are, as of 2026-08-05 (end of day, seventeenth working session
in this file's numbering):**

- **The graph grew for the third session running.** 139 → **141 reports**
  (two at once — first double-node session in the EU branch), 215 → **216**
  dependencies, 158 → **160 dropped notes**. `lu-statec-cpi` is imported,
  registered in `src/data/index.ts`, and validated (`npm run validate` and
  `npm run check` both exit 0).
- **`lu-statec-ipch` carries the branch's second member-state → EU
  `methodology_depends_on` edge** (`→ eurostat-hicp`), same evidentiary shape
  as `de-destatis-national-accounts → esa-2010`: a binding EU regulation
  supplying methodology, cited by name in the national statute. **`lu-statec-
  ipcn` is isolated** — same documented-but-unconnected pattern every EU node
  has shipped in before its own edges landed (`esa-2010`,
  `eurostat-farm-structure-survey`, `eurostat-hicp`).
- **`legilux.public.lu` is now confirmed browser-reachable**, including its
  "expand all articles" control, which is required to get full statutory text
  rather than a section-heading skeleton. New site for this branch, alongside
  the already-established `eur-lex.europa.eu` and `ec.europa.eu`.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**One short browser-research session, following directly on `G.33.md`'s named
next target (priority item 0.1).** Searched for STATEC's own CPI methodology,
found the statute establishing it (Règlement grand-ducal du 20 décembre 1999)
via Legilux, read it in full first-hand (had to click "expand all" to get
article text past the table-of-contents skeleton), drafted and validated a
seventh EU slice with two reports. **This session was deliberately scoped to
item 0.1 alone** — item 0.2 (the modelling decision for the EU staff
salary/pension mechanism) was left untouched, per `G.33.md`'s own framing of
it as "a real design decision... flag it to Thomas if the next session isn't
confident making the call alone," which this session judged out of scope for
a single-topic browser pass.

What was read first-hand: Règlement grand-ducal du 20 décembre 1999 (Legilux),
in full, all eight articles.

What was **not** done, and is the natural next work:

- **Item 0.2 was not attempted** — whether to model the EU staff
  salary/pension update mechanism as its own node, so the HICP/CPI→[mechanism]
  edges can be minted, is still an open design decision. Still flagged for
  Thomas or a confident future session, not a lookup.
- **Art. 11 of the loi modifiée du 22 juin 1963** (the Luxembourg civil
  servants' salary-regime law that STATEC-03 names) was not read first-hand —
  only cited via the 1999 regulation's own reference to it.
- **The loi du 27 mai 1975** ("généralisation de l'échelle mobile des
  salaires") was not read first-hand — named only via the 1999 regulation's
  preamble.
- **STATEC's own quality-report / metadata page equivalent to Eurostat's ESMS
  page was not opened** — not needed for this session's node-condition
  question (the statute is a stronger evidence class and already gave cadence
  and title), but would be the next STATEC read if more methodological detail
  is wanted.
- **The ten-vs-eleven Member States discrepancy from `G.32.md` was not
  investigated.**
- **EBS Regulation 2019/2152 was not read.**
- **No PDF binary was hash-verified via the browser.**
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, eleven sessions back.
- **The blob was not sliced. No further SEC03 Titles were extracted.**

## Headline result

**Luxembourg is in the graph, and the branch's asymmetry finding (member-state
documents name EU instruments; EU instruments do not name member-state
documents) held for a second, independent instrument.** STATEC's own
regulation states, in Art. 1er, that it establishes its harmonised index
"conformément aux dispositions du Règlement (CE) n° 2494/95... relatif aux
indices des prix à la consommation harmonisés" — obligation language, the
same shape as Destatis's "in compliance with" ESA 2010, not the "consistent
with" agreement language §5a rules out. `lu-statec-ipch → eurostat-hicp`
(`methodology_depends_on`) is now the branch's second cross-layer edge of this
kind, found completely independently of the first.

**A second, separate finding sits alongside it and is arguably the more
interesting one for the open AXI-02 question**: the same statute distinguishes
an IPCH (harmonised) from an IPCN (national-only) in one article, and it is
the IPCN — not the IPCH — that Art. 4(1) names as the input to Luxembourg's
own wage-indexation mechanism. Annex XI's wording ("HICP... in the case of
Belgium and... CPI... in the case of Luxembourg") uses exactly this HICP/CPI
distinction, which reads as consistent with Annex XI's "CPI" meaning the IPCN
specifically. **This is reported as a plausible reading, not a documented
identification** — no source read so far states the equivalence by name.

## Findings

### 1. `lu-statec-ipch` is a documented `methodology_depends_on` dependent of `eurostat-hicp`

Record STATEC-01, `EU/STATEC-CPI_PartA_2026-08-05.md`. **What this rests on**:
direct reading of Règlement grand-ducal du 20 décembre 1999, Art. 1er, first-
hand this session. Same evidence class and same relationship shape as
`de-destatis-national-accounts → esa-2010` (G.19-era finding): a binding
regulation supplying definitions and methodology, named by the national
statute as the reason its own index exists in the form it does.

### 2. Luxembourg's own statute splits HICP from CPI in exactly the shape Annex XI's text does — but does not itself close the loop

Records STATEC-01 through STATEC-03, `EU/STATEC-CPI_PartA_2026-08-05.md`.
**What this rests on**: the same first-hand reading. The identification of
Annex XI's "Consumer Prices Index (CPI) in the case of Luxembourg" with
`lu-statec-ipcn` by name is **not documented anywhere read this session** —
it is an inference from the two texts' parallel structure, reported as such
per Research.1 §3. Closing it would need either the annual Commission
decision applying Annex XI, or an EU-side methodological note, naming "IPCN"
or citing the 1999 regulation directly.

### 3. `lu-statec-ipcn` is separately named as the input to Luxembourg's own national wage-indexation mechanism — a different mechanism from Annex XI's

Records STATEC-02 and STATEC-03, `EU/STATEC-CPI_PartA_2026-08-05.md`. **What
this rests on**: Art. 4(1)–(2) of the same regulation, first-hand this
session. Not mintable as an edge — the dependent end (Luxembourg's "échelle
mobile des salaires et traitements") is not modelled as a node — recorded
`no-node-yet` in `lu-statec-cpi.json`'s `_dropped` block, same shape as the
Annex XI Joint Index lead in `eurostat-hicp.json`. **This is explicitly a
different mechanism from the EU staff Joint Index** (Luxembourg's own
national wage indexation vs. the EU institutions' staff salary update) —
flagged in both the Part A record and the slice so a future session does not
conflate them when scoping item 0.2.

## Secondary observations (logged, low priority)

- **`legilux.public.lu` renders article text collapsed by default** — a
  "Développer tout les titres et les sous-titres" control must be clicked (or
  the equivalent state reached another way) before `get_page_text` returns
  more than a table of contents. Worth knowing before assuming a Legilux
  fetch failed or a document is thin.
- **Both STATEC series share one URL** (the establishing regulation) rather
  than each having its own dedicated page, unlike the Eurostat HICP metadata
  page pattern. Not a problem — the regulation is a stronger evidence class
  than a metadata page — but it means both `lu-statec-ipch` and
  `lu-statec-ipcn` cite the same `url`, which is correct here (Research.1 §6:
  "the document you actually opened") but is a shape worth flagging so it
  is not later mistaken for an accidental duplicate.

## Corrections to prior sessions

**None.** This session extends `G.32.md`'s AXI-02 finding and `G.33.md`'s
`eurostat-hicp` finding without revising either.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged. Title 05 (Regional Development, EUR
44.0bn) is the largest remaining Title.

**Item 0, priority sub-tasks — one closed this session, one open:**

1. ~~Fetch Luxembourg's own CPI metadata from STATEC~~ **Done this session** —
   see Findings 1–3. Went further than "node conditions": found a second
   cross-layer edge and a lead bearing on AXI-02.
2. **Decide how to model the EU staff salary/pension update mechanism as a
   node** (or decide not to, and record why), so the HICP/CPI→[mechanism]
   edges can actually be minted. **Unchanged, still open, still a real design
   decision** — flag to Thomas if the next session isn't confident making the
   call alone. Two separate `no-node-yet` leads now point at this same gap
   from two different member states (`eurostat-hicp.json`'s AXI-02 lead and
   `lu-statec-cpi.json`'s STATEC-02/03 leads), which is itself a reason to
   prioritise the decision — one node would close both.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, fourteenth session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.33: Luxembourg's own CPI node conditions, plus a second
cross-layer edge** (findings 1–3).

Remaining, by value per unit effort:

1. **Item 0.2 — the EU staff salary-mechanism modelling decision.** See
   priority block above. Now the single highest-value open item: it would
   close two independent leads at once.
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
   (seven EU nodes now import).
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
14. Read Art. 11 of the loi modifiée du 22 juin 1963 (STATEC-03's dependent
    end) — cheap, one Legilux fetch, would let `_dropped` entry 2 in
    `lu-statec-cpi.json` cite the provision directly rather than at one
    remove.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.34.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/STATEC-CPI_PartA_2026-08-05.md`** and
   **`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`** — this session's
   finding and the AXI-02 question it bears on but does not close.
4. **`src/data/research/lu-statec-cpi.json`** and
   **`eurostat-hicp.json`** — the two newest slices, both carrying
   `no-node-yet` leads that point at the same missing node.
5. **A browser** (the `Claude_Browser` tool) — for item 0.2's research (if
   any is needed before the modelling call), STATEC/loi 1963 Art. 11, the
   ten-vs-eleven discrepancy, EBS Regulation 2019/2152, and the PDF-hash
   question.
6. **The next target if a browser session**: item 0.2 (the modelling
   decision) is highest-value but may need Thomas's input rather than more
   research — read the framing in this file's priority block first and judge
   whether to proceed alone. **If no browser, or if 0.2 needs Thomas**: SEC03
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
