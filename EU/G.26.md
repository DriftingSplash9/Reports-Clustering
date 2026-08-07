# G.26.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0, Research.2.md v2.1, Research.EU.md v0.1 —
all read first-hand (G.24 finding 3). Nothing here rests on a second-hand
account of any of them.
Predecessor: G.25.md (2026-08-05).

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
3. **The four imported EU slices**, in `src/data/research/` — these are no longer
   proposals, they are in the graph: `eu-draft-budget.json`, `esa-2010.json`,
   `de-destatis-national-accounts.json`. Read the last one first; it is the
   pattern that works.
4. **`EU/AnnexB_assessment_2026-08-05.md`** — the branch's central negative
   result, and half of finding 1.
5. **`EU/slices/README.md`** — folder layout, **revised this session**, plus the
   route that got past the cadence blocker.
6. The Part A records in `EU/`: `SEC05_PartA_2026-08-04.md` (19, the format
   exemplar) · `SEC06-SEC07_PartA_2026-08-05.md` (9) ·
   `AnnexXI_PartA_2026-08-05.md` (12) · `SEC250_PartA_2026-08-05.md` (3).

**Where things are, as of 2026-08-05 (end of day):**

- **The graph holds EU data.** 133 → **137 reports**, 213 → **215 dependencies**,
  134 → **154 dropped notes**. Four EU-branch nodes, two edges, one of them
  cross-layer.
- `EU/slices/eu-level/`, `member-states/`, `cross-layer/` — **all three empty.**
  Everything staged has graduated. That is the workflow working, not neglect.
- `EU/` — `SEC00.pdf`–`SEC10.pdf`, the `G.*` logs and sidecars, the governing
  briefs (`Research.2.md.docx`, `Research.eu.docx`), `Soft Connections.docx`,
  `EU Meta jsons.docx`, `PartB_soft_connections_2026-08-04.md`, five research
  records.
- `TODO LISTS/rolling-todo.md` — the working queue, and currently more current
  than any `G.*` file for day-to-day state.

**Retrieval, and this now shapes what is doable unattended:**

- **`eur-lex.europa.eu` is anti-bot gated** to every client here — HTTP 202 with
  a zero-byte body, which is **not** a 404 and proves nothing about content. A
  human browser gets through.
- **`destatis.de` is fully reachable**, and so is `commission.europa.eu`
  (which rate-limits — 429 on a second request within seconds; use distinct
  output filenames or you overwrite a good download with an error page).
- National parliament document registers are official mirrors and work.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output or
Windows cp1252 raises `UnicodeEncodeError`.

## Session conditions — read this first

**This file covers six working sessions, not one.** G.21–G.25 were written one
per session on the same day, which was over-servicing the chain — five hand-offs
against a branch that had imported nothing. That was flagged in a review and this
file is the correction: one hand-off per batch of real work.

Session types covered: two extraction, one assessment, two plumbing, one code
change.

What was read first-hand: the **Destatis Quality Report for National Accounts**
(19 pp), the **German GNI inventory** (372 pp) and the **QNA inventory** (54 pp),
all fetched from `destatis.de`; twelve staged Part A records on ESA 2010 Annex B;
`Research.2.md` and `Research.EU.md`; the relevant parts of `src/`.

What was **not** done:

- **No new `SEC*.pdf` was extracted.** SEC01, SEC02, SEC08, SEC09, SEC10 remain
  untouched beyond searching.
- **Annex B was never read as enacted**, and **Annex XI was never retrieved at
  all** (EUR-Lex). Finding 1's negative half rests on staged records plus a
  presentation document, and on an operative report rather than the annex.
- **Ten of the eleven `SEC*.pdf` URLs are inferred, not verified.** See finding 5.
- **The blob was not sliced.** 960 staged records still unworked.
- **The D-item merge was not performed**, sixth session running.

## Headline result

**The EU does not name its national inputs. Its member states name the EU.**

That asymmetry is now the branch's central finding and it has three independent
supports. Two EU instruments were followed to the national boundary and both stop
at `AGENCY ONLY`: Annex XI's salary method names "the Belgian and Luxembourgish
authorities" and "the ten Member States referred to in Article 1(4)", and ESA
2010's Annex B — the better test, a Regulation with a binding transmission
programme — turns out to be "a programme setting out the **time limits** by which
Member States shall transmit", whose table overview has four columns and no
column for a publication.

Running the other way, the disclosure is explicit and citable. Germany's
statistical office states ESA 2010 as the **legal basis of its own national
accounts**, in structured metadata, with a periodicity beside it. That is now an
edge in the graph.

`EU/slices/README.md` framed this branch as the test of whether the Canada/US
result — zero standard-compliant direct official cross-border edges — is a fact
about those two countries or about national statistical systems generally. **The
answer forming is: neither, quite.** The obligation is real and binding; what is
missing is *naming*, and it is missing in one direction only.

Secondarily and concretely: **the branch imported its first data.** 133 → 137
reports, including the first cross-layer edge.

## Findings

### 1. The asymmetry — and a prediction of mine refuted along the way

**The negative half.** Cheap check 1, carried since G.20, is discharged in
`EU/AnnexB_assessment_2026-08-05.md`. Regulation (EU) No 549/2013 describes its
own annex:

> "The ESA 2010 provides for: […] (b) a programme (Annex B) setting out the time
> limits by which Member States shall transmit to the Commission (Eurostat) the
> accounts and tables to be compiled in accordance with the methodology referred
> to in point (a)." — Article 1(2)

The programme's table overview has four columns — number, subject, deadline,
period. No publication, no publisher. The cleanest test is the national end and
it fails hardest: **Destatis, describing its own transmission of government
accounts, names ten ESA table numbers and not one German publication.**

That scores G.19 finding 6 as **refuted**, in exactly the manner G.20 finding 5
predicted it would fail if it failed.

**The positive half**, and it is new. Destatis's own quality report:

> "Scope of the statistics: national accounts of the Federation (EVAS No 81) …
> **Legal bases: Regulation (EC) No 549/2013, European System of National and
> Regional Accounts (ESA) 2010**, and supplementary and amending regulations …
> **Periodicity: quarterly, annual**"

Title, cadence and legal basis in one structured block. Corroborated
independently by both German inventories — *"in compliance with the European
System of National Accounts (ESA) 2010"* and *"based on the European System of
Accounts (ESA) 2010"* — which are obligation and derivation language, **not** the
§5a agreement language that rules a link out.

**A prediction of mine was refuted in between, on that exact trap.** I proposed
`esa-2010 → sna-2008` as the near-certain first bridge. ESA 2010's own text:

> "The ESA 2010 **is consistent with** the worldwide guidelines on national
> accounting set out in the System of National Accounts 2008 (2008 SNA)."
> — Annex A, ch. 1, ¶1.05

"Consistent with" is verbatim on §5a's watchlist. Two further records say it the
same way and the original extractor had already flagged all three. §5a says to
record these *because the link keeps being re-proposed*; it was re-proposed by me.
Recorded as `_dropped` in `esa-2010.json` so the next person does not.

**What this rests on.** The negative half is assessed from **staged records**, not
sources: Annex B was never read as enacted, and 31 of the 43 matched records were
not read. Annex XI was never retrieved at all. The positive half is first-hand.

### 2. First cross-layer edge, and the route that got past the blocker

`src/data/research/de-destatis-national-accounts.json` — 1 report, 1 dependency,
4 `_dropped`. First member-state node; filename matches `EU/slices/README.md`'s
own worked example.

> `de-destatis-national-accounts` **methodology_depends_on** `esa-2010`

`methodology_depends_on` rather than `uses_data_from` because ESA 2010 supplies
no figures — it supplies "the common standards, definitions, classifications and
accounting rules that shall be used for compiling accounts and tables"
(Art. 1(2)(a)).

**The blocker and the way round it, which generalises.** The obvious sources were
the two German *methodology* documents, and both are unmintable: the GNI
inventory's colophon says **"Periodicity: non-recurring"** — §4.2's exact
disqualifier — while the same document names its own predecessor ("major
revisions since the 2021 inventory") and its landing page carries an "Older
editions" heading. Documented conflict, reported per §3 and not adjudicated. The
QNA inventory is weaker still: no periodicity statement at all.

**The published release states plainly what the methodology documents do not.**
Routing the edge through the release sidesteps the conflict entirely. **When a
member-state dependency looks blocked on cadence, check whether the release
states what the methodology document does not.** Recorded in the README.

### 3. Three slices imported — and the `_dropped` list is where the value is

| Slice | Reports | Deps | `_dropped` |
|---|---|---|---|
| `eu-draft-budget` | 2 | 1 | 11 |
| `esa-2010` | 1 | **0** | 5 |
| `de-destatis-national-accounts` | 1 | 1 | 4 |

**Twenty dropped notes against two edges.** That ratio is the honest output of
applying §4 to this material, and both central negatives now live in the graph's
own dropped-edge record rather than only in prose — `validate` reports them and
flags the `deferred` / `no-node-yet` ones as leads.

`esa-2010` imported with **zero edges** and sat under `validate`'s *ISOLATED —
reports with no surviving edge, kept and shelved* until the German slice gave it
an in-edge. The loader keeps isolated reports deliberately (*"as of V0.12"*),
after dropping them was measured to lose well-researched nodes.

Each slice was structurally validated before import — schema, `supranational ⇒
EU`, palette membership, all three enum unions, dangling refs, and **id
collisions against every corpus id**. Note the seed set lives in
`src/data/reports.ts`, not JSON: globbing `src/data/**/*.json` finds only 115 of
the ids and would miss a clash.

### 4. The staging counts have been wrong since G.20, by about 3×

Every hand-off since G.20 says the staging area holds *"814 distinct Part A
records"* and *"49 duplicate and 77 id-less records"*. Measured directly:

| | Recorded | Actual |
|---|---|---|
| Part A records staged | 814 | **960** |
| Records with no `id` | 77 | 77 ✓ |
| Duplicate extra copies | 49 | **69 by id — but 150 by identical quote** |

**814 is the distinct-*id* count**, not the record count, and it has been read as
the latter for six sessions. Worse: deduping by id misses records staged twice
under **different** ids — `esa-reg-article1` and `esa2010-art1-2` carry
byte-identical quotes at the same location, as do `esa-reg-article3` and
`esa2010-art3-1`. The cause is legible: **two id-naming schemes for the same
instrument**.

So **E4 is ~150 extra copies, not 49 — 16% of the staging area** — and any dedupe
must key on quote, not id.

Other inherited numbers check out: 8 record-less batch headers, 301 loose
records, ~394k chars of prose.

### 5. Provenance — one URL verified, ten inferred

G.24 closed priority A8: `https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC05.pdf`
is **byte-identical** to `EU/SEC05.pdf` (`sha256 585c28fc…`, 894 024 bytes).
URLs were then backfilled across **28 Part A records**; zero local paths remain.

**Only SEC05 is hash-verified.** SEC04, SEC06 and SEC07 — which carry live
records — are constructed by pattern. The inference is strong and was
strengthened without fetching: **PDF creation metadata shows ten of the eleven
produced on 2026-07-08 inside a 50-minute window, in section order, all at
UTC+02:00** — one publisher's production run; SEC00 five days later, consistent
with it being the general introduction. All eleven were pulled locally in one
3-minute batch. Recorded in `eu-draft-budget.json`'s `_provenance` field as
inference, explicitly not verification.

**One fetch closes it: `SEC06.pdf`.** Not ten. It is 800 kB and carries live
records.

### 6. The domain filter was dead code, and is gone

Investigating why the first EU slice had no honest domain to declare turned up
that `FilterState.domains` was declared, defaulted to `null`, counted in
`isFiltering` and compiled into a node predicate — and **nothing anywhere ever
set it.** No UI control populated the field, so the predicate short-circuited
every time and had never hidden a node. `DOMAIN_LABEL` was exported and imported
nowhere. The file's docstring shows why: scaffolding written ahead of a UI
("domain and jurisdiction filters are the next"), of which only the jurisdiction
half was ever built.

Removed from `src/lib/filter.ts` and `src/lib/palette.ts`. **Kept:** the `Domain`
type and `Report.domains`, which are research metadata required by §6 and
populated on all 137 reports — `Domain` now has exactly one consumer, that field.
Recorded in `REPORTS.md` under *Decisions*, with milestone 6's row corrected.

**One guardrail went knowingly.** `DOMAIN_LABEL` was `Record<Domain, string>`, so
adding a `Domain` value used to fail `npm run check` until a label was supplied.
Nothing enforces that now. If a domain view is ever built, **restore the label map
before adding values** or the union and the labels drift apart silently.
`COUNTRY_FAMILY` still works this way for `Country` and is the pattern to copy.

## Secondary observations (logged, low priority)

- **The folder rule in `EU/slices/README.md` was revised, not annotated.**
  `cross-layer/` was defined for edges where "an EU instrument obliges or feeds a
  member state", named for the instrument. The edge found is neither shape — a
  member-state publication naming an EU instrument as *its own* legal basis — so
  it lives in that country's file. `cross-layer/` remains right for an
  obligation-shaped edge; two searches for one have failed, and the German slice
  carries a `wrong-direction` entry recording exactly what was looked for.
- **`ec-` and `de-` are new id prefixes.** `eurostat-`, `ecb-`, `eca-`,
  `bundesbank-` are all coming. Cheap moment to set a convention.
- **`list-main-stats-2025-na` bundles nine Eurostat products under one heading** —
  §6's exact "illustrative cluster" failure. It is the most node-shaped material
  in staging and currently discardable. Split it into nine before building on it.
- **`[MUFA] … collected and re-transmitted by the ECB`** is a textbook
  `redistributed` terminus, the first clean instance in the branch.
- **`scripts/eu-schema-smoke.ts` can now be deleted.** Its stated condition was
  "no EU node exists to exercise the new schema paths". Four do, including a
  `supranational` node and a `DE` member-state node, and `validate` passes. This
  is the first hand-off where that is true — seventh session of carrying it.

## Corrections to prior sessions

1. **G.19 finding 6 — refuted.** Annex B supplies no supranational-to-national
   edge; it names tables and deadlines. G.20 finding 5 called this failure mode
   exactly. Finding 1.

2. **G.25 finding 1 — overstated, and the reasoning was wrong.** It called the
   domain gap "the one that matters — every future EU institutional node hits
   it", written believing `domains` drove a live filter. It did not and never
   had. The gap is **data hygiene only** and never blocked import. Finding 6.

3. **Every hand-off since G.20 — the staging counts are wrong by ~3×.** "814
   records / 49 duplicates" should be **960 records / ~150 duplicate copies /
   77 id-less**, and dedupe must key on quote rather than id. Finding 4.

4. **G.20 finding 3's table — one item understated.** It renders
   `Research.EU.md` §10 item 1 as "Statistical Requirements Compendium (latest)";
   the brief says "…**and the list of main statistics**". The omitted half is the
   most node-shaped material in staging. G.20's wider claim is confirmed.

5. **`EU/slices/README.md`'s framing of `cross-layer/` — revised.** Secondary
   observations, above.

6. **My own prediction in the G.25 wrap — refuted.** `esa-2010 → sna-2008` was
   called "near-certain"; it is §5a agreement language. Finding 1.

7. **No finding in G.15–G.18 was checked**, and none should be treated as
   revisited.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10).**

1. ~~SEC05~~ (G.21) · ~~SEC06, SEC07~~ (G.23) · ~~SEC00 key~~ (G.22) ·
   ~~A8 retrieval URL~~ (G.24) · ~~first import~~ (this file) — closed.
2. **SEC01 (Parliament, 53 pp), SEC02 (Council, 38 pp)** — next extraction
   targets. SEC01 is the outlier: 14 `7.2.19SPEC` lines with no analogue
   elsewhere. Both come with cheap check 6 free.
3. **SEC08 (29 pp), SEC09 (31 pp), SEC10 (38 pp)** — the three smallest, on disk,
   never opened. SEC10 first: only section using the literal `X` numeral and the
   only `PPPA` code.
4. **Part B** — `sc-51`…`sc-73`. `sc-47`…`sc-50` remain **reserved**. Still
   outstanding: recovering those, and SEC04's addendum. **Nothing has been added
   for the three imported slices**, and the Part B Output Rule asks for it.
5. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog, after A.** Unchanged. SEC03 (1 114 pp) is its own
corpus; SEC(2026) 250 (539 pp, retrievable, 533 unread) belongs here.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking. Note
the ECB now has a foothold in the corpus as a `redistributed` terminus (MUFA) and
as the compiler of German financial accounts.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not started,
sixth session running**, but no longer risky — both are read. Six known inputs:
restore §9's id list (or point at `Research.1.md`); carry the Part B Output Rule
somewhere it will be seen; drop `Research.EU.md`'s stale closing line; fold in
the priority-queue reconciliation at E5; decide whether §2's "or Official Journal
reference" relaxation survives; and **the `Domain` union gap** (finding 6), now
data-hygiene rather than blocking.

**E — Everything the blob split created.**

1. ~~Schema decision.~~ DONE — G.20.
2. **Verify and slice the staged Eurostat strand — 960 records, not 814.** Start
   with `list-main-stats-2025-na` split into its nine products.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the duplicates — ~150, not 49, and key on quote not id.**
   Upgraded to a prerequisite; mechanism known. Finding 4.
5. **Reconcile the two priority queues.** Fold into the D merge.

**F — NEW: the German sub-graph.** Both leads are documented and named in
`de-destatis-national-accounts.json`'s `_dropped`, and neither needs new
research to find:

1. **Deutsche Bundesbank financial accounts by sector** — named twice,
   "responsible for compiling". Same shape as the Bank of Canada material.
2. **The German source statistics, named by title *and* EVAS register number** —
   Microcensus, EVAS 47410, EVAS 31211, EVAS 13111 (Federal Employment Agency),
   VAT statistics, and more. `Research.1.md` §7's strongest evidence class, and
   `destatis.de` is fully reachable from this environment.

## Cheap checks still outstanding

Done since G.25: **G.25's 1** (Annex B / cheap check 1) and the Destatis cadence
question. Remaining, by value per unit effort:

1. **Fetch `SEC06.pdf`** and hash it against `EU/SEC06.pdf`. Converts 28 records
   from inferred provenance to verified. Needs a browser.
2. **Split `list-main-stats-2025-na` into nine records.** Mechanical; unlocks the
   best remaining staging material.
3. **Re-measure E4 keying on quote, not id**, and reconcile. Finding 4.
4. **Delete `scripts/eu-schema-smoke.ts`** — its stated condition has lapsed.
5. **Retrieve Annex XI Article 1(4)** — closes finding 1's open limb. EUR-Lex is
   gated; a parliament register is how `COM(2025) 736` was obtained.
6. **Check whether SEC01/SEC02 show the request-vs-table gap** (G.23 finding 2).
   Two sections is a pattern; four would be a rule. Free with priority A2.
7. **Retrieve the Eurostat Report of 31 October** and establish its URL.
8. **Read EBS Regulation 2019/2152** as a third test of the asymmetry, from the
   EU side.
9. **Pull the `[NA-Pen] / Table 29` thread** — the only table-to-publication tie
   in the corpus.
10. **Check whether sc-47–sc-50 exist anywhere**; **characterise the 155 non-`S`
    loose records**; **match the 8 record-less batch headers**; **enumerate the
    `9`-series tags** beyond `SPEC`/`DAG`/`PPPA`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**

1. **This file (`G.26.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9 id
   list.
3. **`src/data/research/de-destatis-national-accounts.json`** — the pattern that
   works, and the first cross-layer edge.
4. **`EU/AnnexB_assessment_2026-08-05.md`** — the central negative result.
5. **`EU/SEC05_PartA_2026-08-04.md`** — the Part A format exemplar.
6. **`PartB_soft_connections_2026-08-04.md`** — required by the Part B Output
   Rule's own closing line, not merely conventional.
7. **`EU/slices/README.md`** — the revised folder rule and the
   methodology-vs-release lesson.
8. **The next target PDFs** — `SEC01.pdf`, `SEC02.pdf`. Already in `EU/`.
9. **A browser**, for cheap checks 1, 5 and 7. EUR-Lex is gated here; `destatis.de`
   is not.

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
