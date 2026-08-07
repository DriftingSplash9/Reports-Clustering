# REPORTS.md — Economic Report Influence Graph

> The overarching idea. This document changes when the *direction* changes,
> not when the code does.

---

## 🛑 Agent: read these files before doing any work

1. **This file** — what the system is trying to be and what is out of scope.
2. **The highest-numbered `V0.*.md`** in `sessions/` — currently `V0.12.md`, the
   last session's state and backlog.
3. **The highest-numbered `V*.*.md` rollup** in `sessions/` — currently
   `V1.5.md`, covering V0.1 through V0.5. This is where the history lives; it
   replaces those five logs as *reading*, at about a quarter of their length.

*(Session logs and rollups moved from project root into `sessions/` on
2026-08-04. Prose citations elsewhere in this file — "decided in V0.8" and the
like — are references to the log, not to a path, and were left alone.)*

That is the whole list for *direction and state*. There is no `CLAUDE.md` and no
other standing-rules file; if one is ever added it goes first, and this line gets
updated.

`START-HERE.md` is not for you. It is the plain-language description the human
sends to other people, and it is deliberately free of protocol, file maps and
jargon. Keep it that way — but if a *direction* changes, it needs updating too,
because it is the only document a non-technical reader will ever open.

`README.md` is reference rather than reading — how to
run and validate, where things live, and the steps to add a research slice
(drop the JSON in `src/data/research/`, import it in `src/data/index.ts`, add it
to the `slices` array, validate). Open it when you need the mechanics, not to
get oriented.

`BACKLOG.md` is also reference, and deliberately not on the reading list above —
it is 6,000 words and would double the cost of getting oriented. Open it when the
question is *what should I work on next*, because it is prioritised into tiers with
a stated criterion and a measurement baseline. It is not needed to understand what
the project is.

**Always exactly two files from the logs: the latest session log and the latest
rollup.** Not the whole thread. That is the entire point of the rollup thread —
reading cost stays flat no matter how long the project runs.

Then state what you understand the next job to be and confirm before building.

**You may decide a session is worth logging. You may not decide to write the
log.** Notice, offer in one line, wait for a yes. See the protocol below.

---

## The two log threads

There are two parallel threads of documents, and they do different jobs.

### Thread 1 — session logs: `V0.1.md`, `V0.2.md`, `V0.3.md`, …

One per meaningful session, written by whoever did the work. Each supersedes the
last and says so, carrying forward what is still true and correcting what is not.
Detailed, specific, and honest about what was not verified.

These are never deleted. They are the raw record, and the human audits them
directly and irregularly.

**Offer, then write. Never write first.**

Either side can start it. The human says "write V0.7" or "wrap this up for the
next agent". Or the agent notices a session has reached a sensible stopping
point and says so, in one line:

> Now's probably a good time to wrap up V0.7 — want me to?

And if that log is a fifth one, say so in the same breath, because it is twice
the work:

> Now's probably a good time to wrap up V0.10 — that's a rollup one, so
> `V2.10.md` comes with it. Want me to?

Then wait. A yes is the trigger; noticing is not.

This used to read "at the end of a meaningful session, write the next-numbered
log", which an agent reasonably took as standing authority — and two logs were
written that nobody had asked for. The judgement was fine; both were sensible
stopping points. Acting on it without asking was the error. **Finishing a piece
of work is not a request to document it.**

### Thread 2 — rollups: `V1.5.md`, `V2.10.md`, `V3.15.md`, …

Written at **every fifth session log**, consolidating the five before it —
**in the same pass as that log, without being asked separately.**

That last part is the whole enforcement mechanism, and it replaces an earlier
attempt at a schedule. A rollup that is its own scheduled task competes with
whatever the human actually wants next and loses every time: rollup 1 was due at
V0.5 and was written after V0.6, having been deferred twice in favour of more
interesting work. Attaching it to the log removes the choice. If you are asked to
write V0.10, you are being asked for `V2.10.md` as well, and you do not need to
check.

`npm run logs` prints which log is next and whether a rollup rides with it.

Filename is `V<rollup number>.<last session covered>.md`:

| File | Rollup | Covers |
|---|---|---|
| `V1.5.md` | 1st | V0.1 → V0.5 |
| `V2.10.md` | 2nd | V0.5 → V0.10 |
| `V3.15.md` | 3rd | V0.10 → V0.15 |

**The windows overlap at the seam on purpose.** V0.5 is the last file in rollup 1
and the first in rollup 2. Without the overlap a decision made in V0.5 and
revised in V0.6 could fall into the crack between two windows and be described by
neither. Sharing the boundary file means every rollup begins from a state its
predecessor already established, and nothing is only ever seen from one side.

Because a rollup file could be misread as a version number, **every rollup states
its window in its own header**: "Rollup 2. Covers V0.5 through V0.10."

### What a rollup is for

It is not a summary. It is an **audit and a prune**.

Writing one means going back through five sessions and asking of every claim: is
this still true, does it still matter, and would a new agent be worse off without
it? Most of what a session log contains is scaffolding — a bug that was fixed, a
number that has since changed, a next step already taken. That is exactly right
for a session log and exactly wrong to carry forever.

So a rollup keeps:

- **Decisions that still bind**, and the reasoning behind them. Especially the
  ones that look arbitrary without their history.
- **Mistakes worth not repeating.** The lost research agents, the unmounted room,
  the sink leak in the authority metric. A rollup that drops these invites the
  same mistake again.
- **Live problems**, restated in current terms rather than as a chain of
  corrections.
- **Facts about the corpus** — which publishers document their inputs, which do
  not, where the evidence standard bites hardest.

And it drops: superseded numbers, fixed bugs with no lesson attached, completed
next steps, and anything that reads as "here is what I did today".

If a rollup cannot honestly say a thing still matters, it goes. The session log
still has it, and the human still audits the thread.

### Why it is split this way

The agent audits five sessions at a time, on a schedule, with fresh eyes and the
authority to prune. The human audits the whole thread, irregularly, with the
context an agent cannot have. Neither substitutes for the other, and both are
cheaper than one enormous document nobody reads to the end.

---

## The one-line version

**A living 3D graph of official reports and economic indicators, where influence flows through references, and node size reflects how many other reports depend on it.**

---

## The core idea

Every important number in finance, government, and policy — inflation, interest
rates, disability benefit amounts, employment figures — ultimately rests on a web
of official reports and statistical releases. This graph is that web, drawn.

A user should be able to look at it and immediately see which reports are
foundational and which are derivative, and follow an update outward from one to
the other. Its failure modes are clutter, arbitrary layout, and treating every
report as equal.

**Therefore: data model and influence semantics come before visual polish.** When
the two conflict, the encoding wins.

The specific rules that follow from this are below; they are not restated here.

---

## What this incidentally reveals — documented supranational influence

*(Added 2026-08-05, on Thomas's instruction, so it is not forgotten and every
future agent inherits it.)*

**A secondary objective, sharpened by the EU branch: this graph is also a map of
which unelected, non-national bodies actually set inputs that national
governments are documented as obliged to use.** Not "who is secretly in charge" —
that framing has no node in this project's terms, because the evidence standard
is documentary and a body with no titled publication on a cadence fails §3/§4
before any other question applies. The answerable version is narrower and more
useful: **which international and supranational institutions issue a standard,
regulation, or index that a national statistic is documented as legally or
methodologically dependent on** — and the graph already contains a real, growing
answer.

**What the EU branch found, stated plainly:** two binding EU instruments were
followed to the member-state boundary and both named their national inputs only
by institution, never by publication (`AGENCY ONLY` — see `EU/extraction/AnnexXI_PartA_*.md`
and `EU/extraction/AnnexB_assessment_*.md`). But run the query the other way and the answer
is sharp and citable: **Germany and Luxembourg both name EU regulations as the
legal basis of their own national statistics**, in structured metadata, with a
title, a URL, and a stated periodicity. That is a documented instance of a
supranational body setting a binding input to a national government's own
published numbers — not asserted, not inferred, quoted.

**Bodies already confirmed in the corpus with at least one documented
national-dependency edge**, as of 2026-08-05 (15 international/supranational
nodes total; see `Research.1.md` §9 for the full id list):

- **IMF** — Balance of Payments and IIP Manual (BPM6); Government Finance
  Statistics Manual (GFSM 2014)
- **UN** (Statistics Division / jointly with the EU, IMF, OECD, World Bank) —
  System of National Accounts 2008; Principles and Recommendations for
  Population and Housing Censuses
- **BIS** (Basel Committee on Banking Supervision) — the Basel Framework
- **ILO** — the ICLS Resolution on statistics of work
- **IPSAS Board** — International Public Sector Accounting Standards
- **The European Commission / Eurostat** — ESA 2010, the HICP, the Farm
  Structure Survey, the Draft Budget, and (via Annex XI) the annual EU
  remuneration update

**Bodies worth the same test and not yet run** — this is the expansion Thomas
asked for, ranked by how likely a document is to state the dependency plainly:

| Body | Why it is a strong candidate |
|---|---|
| **OECD** | Publishes recurrently, many EU and non-EU members, statistical output routinely cites national sources by name and methodology notes often state a national release "follows OECD guidelines." |
| **NATO** | *Defence Expenditure of NATO Countries* uses an agreed NATO definition members are asked to report against — an obligation-shaped instrument with named national inputs, not yet tested. |
| **WTO** | Trade statistics harmonisation; members are documented as reporting under WTO-defined categories. |
| **WHO** | The International Classification of Diseases (ICD) is used as a coding standard by national health statistics bodies, usually cited explicitly. |
| **Financial Stability Board / IOSCO / IAIS** | Sector-specific standard-setters (systemic risk, securities regulation, insurance) whose standards national regulators are documented as implementing — same shape as Basel, untested. |
| **FATF** | Anti-money-laundering standards that national regulatory reporting cites as its basis. |
| **ISO** | Technical and statistical standards (e.g. ISO 3166 country codes, already used structurally by this project's own `Country` field) that national statistical offices cite as the classification basis for their own releases. |
| **IFRS Foundation** | Accounting standards that national corporate-reporting requirements are documented as adopting — a private standard-setter with real legal traction, analogous to IPSAS on the public-sector side. |
| **Codex Alimentarius (FAO/WHO)** | Food-standard body that national food-safety statistics sometimes cite directly. |
| **G7 / G20** | Weaker candidate — communiqués are political commitments, not publications on a cadence in §3's sense, but worth one check for a named recurring statistical output (e.g. the G20 Data Gaps Initiative). |

**Explicitly not in scope under this project's own rules, and why** — kept here
so the question does not resurface without an answer attached: bodies with no
titled recurring publication and no secretariat issuing one (colloquial
"New World Order" framings) fail §3 condition 1 and condition 3 before any
substantive question applies — there is no URL to put in the `URL:` field. A
private body that publishes but obliges no government (e.g. the World Economic
Forum) can still produce a node, but the honest `relationship_type` is `cites`,
not `uses_data_from` or `methodology_depends_on` — see `Research.1.md` §3's
relationship types. The distinction is not political; it is the same evidence
standard applied consistently.

**This is EU-branch-led work but not EU-scoped as an objective.** The Canada/US
side of the graph already contains the domestic half of this pattern (Bank of
Canada, IMF-linked series) and should be checked against this same list once the
EU branch's method — read the national document's stated legal basis, not the
international body's aspirational text — has been proven out further.

---

## Rules of the design

- **Size = authority.** A report that many others depend on is large. A report
  that cites many others but is rarely cited itself remains small. Authority is
  weighted by the authority of the citing reports, not a raw count — see
  Decisions.
- **Edges are directed and meaningful.** An edge means "this report uses or is derived from that report."
- **Update cadence is first-class data.** It drives both data refresh and visual
  behaviour (pulse / broadcast). The real number of releases per year is the
  authority; the coarse bucket exists for filtering.
- **Readable at a glance.** Size and clustering must communicate importance
  without requiring the user to open every node. *Importance* is read at a
  glance; *identity* is on demand — see the labels decision below.
- **Position encodes only the edges.** Nothing about a node's coordinates may
  assert a hierarchy the dependency data does not contain.
- **Scope is bounded by documented derivation, not by subject.** A node is a
  recurrently published document that another document names as an input to
  itself. See the scope decision below — the boundary is the evidence standard
  and the cadence requirement, not the topic.

---

## Deliberately NOT in scope (for now)

- Full text search or PDF parsing of every report.
- Real-time market data feeds.
- User-generated content or social features.
- Complex multi-user collaboration.
- Photorealistic or highly decorative 3D environments.
- Automatic discovery of every possible economic report in existence (start curated).

---

## Data model

**`src/lib/types.ts` is the definition. Read it — it is short and heavily
commented.** The field list is deliberately not duplicated here, because a
duplicated schema rots: this section had already drifted out of date within one
session of being written.

Two entities only, a Report (node) and a Dependency (edge). What belongs here
rather than in the code is the handful of fields that carry a *design decision*
rather than a value:

- **`jurisdiction_level`** drives colour and node style and **never position**.
  See the hierarchy decision below.
- **Cadence is three numbers in two places.** `releases_per_year` (publication)
  and `changes_per_year` (change) on the Report; `reference_period`
  (transmission) on the Dependency. There is no enum — see the cadence decision.
  Publication rates are fractional below annual on purpose: 0.05 is "about once
  a generation", and that is a fact a bucket cannot hold.
- **`relationship_type`** is ordered strongest to weakest — `calculated_from`,
  `uses_data_from`, `methodology_depends_on`, `cites` — and the order sets edge
  weight in the authority calculation. Choosing the right one is a judgement
  about what a document actually says, not a formality: the Bank Rate is
  `calculated_from` the policy rate because it is arithmetic, while the prime
  rate is only `uses_data_from` it because the Bank's own word is "affects".
- **`basis` and `evidence_url`** are what make the graph auditable rather than
  plausible. Neither is optional in practice. See the evidence standard. Note that
  `evidence_url` is optional in the *type* and required by *convention*, which is
  how 27 seed edges came to lack one — see the disclosure decision. **8 still do,
  as of V0.10**, and all eight are seed edges nobody has researched.
- **`determination`** (`formulaic` | `discretionary`) says whether the publisher
  applies a stated rule or exercises judgement. It exists so that a short input
  list can be read as a fact about the institution rather than as missing research.
  Decided, **not yet implemented.**
- **`strength`** is a per-edge weight override. It is deliberately unused on every
  edge in the corpus and should stay that way — see the disclosure decision. The
  count is deliberately not written here; it moves every session and a stale
  number in this file is the drift V0.8 and V0.9 were both about. `npm run
  validate` prints the live one.

`authority`, `size_score`, `in_degree` and `out_degree` are computed in
`graph.ts`, never authored.

---

## Roadmap (rough order)

| # | Milestone | Done when |
|---|-----------|---------|
| # | Milestone | Done when | Status |
|---|-----------|---------|---|
| 0 | Data model + seed data | Real reports and dependencies load | done |
| 1 | 3D force graph | Nodes appear, sized by authority, basic clustering | done |
| 2 | Directed influence | Edges directional; selecting a node lights its cone and dims the rest | done |
| 3 | Update simulation | Nodes broadcast on their **real** cadence | unblocked in V0.6 — the cadence model is built, the pulse still runs on the wrong quantity |
| 4 | Readable detail panel | Publisher, cadence, authority, what feeds in, what is built from it | done, on hover |
| 5 | Curated real-world seed set | Enough real reports to show structure rather than examples | done — target was 30–80, now past 100 |
| 6 | Search, filters & domains | Find a node by name; filter by frequency, agency, domain | done for name, scope and source kind; **domain filter removed 2026-08-05** (see Decisions); cadence filter not built, but the layer is there |
| 7 | Polish & export | Performance, possible static or shareable export | **next** — the default view is wrong at 122 nodes, see the legibility note below |

---

## Decisions (previously open questions)

**The palette is now continent-based, not political-bloc-based.**
*(2026-08-05, Thomas's call, superseding a decision made earlier the same
day.)* Two edits happened in immediate succession and it's worth recording
both, because the second changes what the first actually shipped.

*First:* the Grok research consolidation (48 new reports) introduced 14
countries that are European but not EU members — EEA/EFTA (Norway, Iceland,
Liechtenstein, Switzerland), the former member (the UK), and the accession
belt (Serbia, Montenegro, North Macedonia, Albania, Bosnia, Turkey, Ukraine,
Moldova, Kosovo). Thomas gave them their own `ColourFamily` (`XEU`) rather
than absorbing them into `INT`, parallel to how `EU` itself was split out of
`INT` on 2026-08-04, and chose tan → brown for the hue. That hue is not a
free gap on the wheel — it sits on Canada's own gold/orange arc — so `XEU`
shared `CA`'s hue territory and separated on saturation instead (40–52% vs
Canada's 100%).

*Then, the same day:* Thomas asked for the whole scheme reassessed — Canada
was "hogging too much spectrum," and the palette should reserve one slice per
continent (North America browns, Europe greens, Asia yellow/orange, South
Asia + Oceania red/purple, Africa blues, South America greys) ahead of the
countries arriving to fill them, Mexico named explicitly. **This is a full
redesign, not an addition**: `CA` and `US` — previously the two widest,
best-separated families on the wheel (338°→43° and 187°→231°) — are pulled
into one narrow North America neighbourhood (0°–45°) and told apart by a
hue split plus saturation, the exact mechanism `XEU` had just introduced for
EU-vs-non-EU, now generalised on purpose. `XEU` itself moved again, from the
tan-brown built an hour earlier into a low-saturation variant of `EU`'s own
green — Europe, member or not, is now one continent slice. `US`'s old blue
territory went to a new `AFR` family. Three more reserved, unstaffed families
(`ASIA`, `SAO`, `SA`) claim their slice of the wheel now, the same reasoning
already used for `US:provincial` existing before state-level US data did.

**`ColourFamily` is `CA | US | INT | EU | XEU | AFR | ASIA | SAO | SA`** — nine
values, not five. `CA`/`US` and (eventually) `SAO`'s two halves stay as
separate `ColourFamily` values rather than merging into one `NA`/`SAO`, because
merging would make `scopeOf` collapse two different countries to the same
string and therefore the same colour — Statistics Canada and the Bureau of
Labor Statistics rendering identically is the exact failure this whole
hue-by-family design exists to prevent. "North America" and "South Asia +
Oceania" are hue *neighbourhoods*, not single family values.

**One collision caught and fixed during this pass**: South America's grey was
first drafted at 210° and came out `#8a99a8` — visually indistinguishable
from `COMMERCIAL_COLOUR` (`#8b93a4`, 221°). Moved to 90°, the genuine free gap
between Asia's warm end and Europe's green start, which reads as a warm
sage-grey rather than the cool slate `COMMERCIAL_COLOUR`/`UNCLASSIFIED_COLOUR`
already own.

**Revisit if a future zoom level or colourblind simulation collapses any
adjacent pair** — the tightest are `US`↔`ASIA` (14°) and `SAO`↔`INT` (15°),
both held apart by a 30+ point saturation gap rather than hue alone. The fix
there is more saturation separation, not abandoning the hue Thomas asked for.
Full reasoning, the complete hue table, and every hex value are in
`src/lib/palette.ts` at `ColourFamily` and `SCOPE_COLOUR`.

**The domain filter is removed. `domains` stays as data.** *(2026-08-05.)*
The filter half was scaffolding that was never finished: `FilterState.domains`
was declared, defaulted to `null`, counted in `isFiltering` and compiled into a
node predicate — and **nothing ever set it.** No UI control populated the field,
so the predicate short-circuited on `null` every time and had never hidden a
node. `DOMAIN_LABEL` in `palette.ts` was exported and imported nowhere.

Removed from `src/lib/filter.ts`: the `domains` field, its `NO_FILTER` default,
its `isFiltering` clause, the compiled `Set` and the predicate, plus the unused
`Domain` import and a docstring line promising the feature. **`DOMAIN_LABEL` was
removed from `palette.ts` in the same pass**, along with that file's now-unused
`Domain` import — it was an exported constant with no importer anywhere.

**Kept: the `Domain` type and `Report.domains`**, which are real research
metadata required by `Research.1.md` §6 and populated on all 133 reports.
`Domain` now has exactly one consumer in the codebase — the `Report.domains`
field itself.

**One guardrail went with it, knowingly.** `DOMAIN_LABEL` was typed
`Record<Domain, string>`, so adding a value to the `Domain` union used to fail
`npm run check` until a display label was supplied. Nothing enforces that now.
That is the correct trade while no view renders a domain — but if one is ever
built, restore the label map *before* adding domain values, not after, or the
union and the labels drift apart silently. (`COUNTRY_FAMILY` in `palette.ts`
still works this way for `Country` and is the pattern to copy.)

**What prompted it.** The EU branch's first slice had no honest domain to
declare: the `Domain` union has 17 subject areas and no `public-finance` or
`budget` value, and the institutional budget sections are administrative
expenditure — MFF heading 7, "European Public Administration". Tagging them
`fiscal-transfers` alongside the Canada Health Transfer and Equalization was the
least-wrong option and still wrong. Removing a filter nothing used is the
cheaper fix than extending a taxonomy to serve it.

**What this does not settle.** `domains` is still a required field on every
report, so EU nodes still have to declare *something*, and `fiscal-transfers`
remains the least-wrong value with no runtime consequence. Whether to extend the
union with `public-administration` is now a **data-hygiene question only** and
belongs with the `Research.2.md` / `Research.EU.md` merge.

**Visual treatment of the influence pull.**
A pulse travelling *along the line* — a ripple running down a spider-web thread from the
updating node to each node that depends on it. Not a whole-node flash, not a particle
burst. The thread itself carries the signal outward, and it should be legible as
directional: you can see which way the influence is moving.

**What the program is actually watching.**
Frequency and structure, not content. The system does not read reports. For each node it
tracks: identity, publication cadence or pattern, and which other reports it
cites in order to produce itself. Those citations are the threads. Everything
visual — size, colour, position, pulse rate — is derived from those three
things.

**Geographic scope.**
North America to start — Statistics Canada, Bank of Canada, US Federal Reserve, BLS, BEA.
Cross-border citations are seeded where they are genuinely documented, so the Canadian and
US clusters connect rather than floating apart. In practice the graph has also
grown *downward*, through Alberta's provincial fiscal documents into municipal
funding formulas, because that is where the dependency chains are documented
precisely enough to trace end to end.

**3D library.**
React + React Three Fiber, with `three-forcegraph` handling layout. Chosen because the
force simulation and directed edges are already solved there, which keeps the
early work on the data model instead of on rendering plumbing. Sizing is our
own — authority, not the library's in-degree.

**Authority score.**
Weighted by the authority of the referencing reports, not raw in-degree. A citation from a
foundational report counts for more than a citation from a peripheral one. Raw in-degree is
still computed and kept alongside it as a debugging check — if the two rankings disagree
wildly on a small seed set, that usually means the edge data is wrong, not that the
weighting is clever.

The in-degree cross-check named above earned its keep in V0.8: the two rankings
disagreed at the very top, the cause was not the edge data, and finding out why
changed the metric. See the next decision.

**Retention is proportional to outgoing weight, not a fixed constant.**
Decided and implemented in V0.8. **This changed the ranking**, so read it before
trusting any earlier log's authority numbers.

A node keeps `retention / (retention + total outgoing weight)` of its own rank.
Retention was a fixed 1.0 while outgoing weight varies, so the fraction kept was
set by how many inputs a report disclosed, and how strongly:

| Outgoing edges | Total weight | Kept |
|---|---|---|
| one `cites` | 0.25 | **80%** |
| one `methodology_depends_on` | 0.50 | **67%** |
| one `uses_data_from` | 0.80 | 56% |
| one `calculated_from` | 1.00 | 50% |
| three, a well-documented node | ~2.30 | **30%** |

The resulting incentive was perverse and non-monotonic. Measured on one node,
disclosing inputs one at a time: `0.165 → 0.303 → 0.236 → 0.214 → 0.203 → 0.195`.
**Authority peaked at exactly one disclosed input**, and describing that input
vaguely paid — as `cites` it scored 0.515, as `calculated_from` 0.277.

It reached the top four. Three of them were single-weak-edge nodes keeping 66.7%,
against the Consumer Price Index keeping 30.3% for honestly documenting three
inputs — which is how the Census outranked the CPI **on five incoming edges
against thirteen.**

**This was the sink-leak bug's mirror image.** Retention fixed the *receiving*
side, where a one-edge node drained everything into its target, and left the
*transmitting* side, where having one edge became the best place to be. Both have
the same cause, already written down under Authority score: out-degree here is a
fact about our research. A fixed retention competing with variable outgoing weight
reintroduces exactly the dependency retention existed to remove.

Scaling retention *with* outgoing weight removes it. Every report that discloses
anything keeps a flat 50%, whatever it discloses and however strongly, so
disclosure changes where authority goes without changing how much is kept.
`npm run validate` asserts the constant fraction on every run, recomputed from the
edge data rather than read back out of the graph — a property nothing checks is a
property that quietly stops being true.

**What it cost, stated plainly.** The top is now CPI 1.000, US CPI 0.730, Census
0.679. The Census dropped from first to third and four sessions of ranking
stability ended. V1.5's flagship claim splits in half: both scoring methods still
independently put consumer price measurement and population counting at the
foundation, and that was never tuned for — but the *ordering* between them was an
artifact, and the two methods now agree at the top where before they disagreed.
Node size barely moved: top-to-median radius 2.07× against 2.14× before.

Three alternatives were rejected: displaying out-degree beside authority and
leaving the maths alone (preserves a known artifact), fixing only the
zero-to-one-edge cliff (leaves the one-edge optimum in place), and demoting the
ranking to a size encoding only (concedes more than the evidence requires).

One discontinuity is accepted rather than papered over: a node with no outgoing
edges gets no retention, because retention is now defined as a multiple of a
weight it does not have. Giving true sinks a self-loop lets them hoard — at
damping 0.85 a pure sink that keeps everything settles above five times its
inflow, which is the original bug made worse.

**Later definition wins when an edge is defined twice.**
Decided and implemented in V0.8, and it is the opposite of the rule for reports.

For reports, "first wins, the seed set is authoritative" is a deliberate choice
about curation. For edges the same rule was an accident with the wrong sign: seed
edges were written first and are uniformly worse evidenced. **All six duplicates
resolved to the seed copy, and in all six the losing research copy carried an
`evidence_url` while the winning seed copy did not.** One pair also disagreed on
`relationship_type`, so the rule was moving authority and not only prose.

Reversing it moved 3 of 117 rank positions and left the top four untouched, which
is what made it safe to take rather than defer again. What it bought is structural:
under documented-plus-`evidence_url` only, the graph went from three components to
two and from six orphaned nodes to two. No reference period was lost — the paired
values were identical wherever both copies had one.

**The evidence standard.**
Documented citations only. Every dependency carries an `evidence_url` pointing at
a document that explicitly names its source. If no document says it, the edge
does not exist — however obvious the relationship looks. This is the most
important rule in the project and it is enforced by convention, not by code.
It has a visible cost: real programmes with unpublished inputs get dropped from
the graph every build. That is the standard working, not a bug.

**No labels on nodes.**
Reverses the original instinct. Always-on labels competed with size for
attention and turned the dense centre into grey mush, defeating the one thing
the graph exists to show. Identity moved to hover — publisher, cadence,
authority, and the actual lists of what feeds in and what is built from it.
Size and clustering carry importance; text carries identity, on demand.

**Nothing about position may assert a hierarchy.**
An earlier renderer pulled nodes to fixed heights by jurisdiction level. It was
wrong on its own terms: international bodies *consume* national statistics, so
they are downstream in influence, yet any stack puts them on top — pointing
opposite to the flow the graph exists to show. Provinces have the mirror
problem, thirteen peers forced into a rank they do not have. Deleted.
If a vertical axis is wanted later, the honest version is depth in the
dependency graph — computed from edges, not asserted, and it inverts correctly
for the international case.

**Arrows point the way influence travels, not the way dependency is recorded.**
The data model stores *source depends on target*. The renderer draws and pulses
from the foundational report outward to its dependents, because that is the
direction the user is being asked to read.

**Filtering is a view, never a recalculation.**
Implemented in V0.5 as `src/lib/filter.ts`.

A filter subtracts nodes from the picture and changes nothing else. Authority is
not recomputed, the layout is not re-run, and every node still on screen is the
size it was and where it was. This is enforced by applying visibility through
the force-graph library's visibility accessors, which filter only what gets
drawn — the simulation still runs over the full node list underneath.

The constraint is the reason filtering is safe to offer. A filter that
reshuffled the graph would make every comparison the user had just made silently
wrong, and they would have no way to notice.

One predicate type, three consumers: the commercial-source toggle, jurisdiction
filtering, and search. **Search shares the predicate and nothing else** — it
locates, filters hide, and typing three letters must never make a hundred nodes
disappear. The one thing they must agree on is that search cannot offer a node
the filter has removed.

Cones are walked over the visible subgraph, so a cone always answers the
question in the view you are actually in.

**Cadence is three quantities, and the third one lives on the edge.**
Decided in V0.4, implemented in V0.6.

"How often does this update" turned out to be three different questions:

- **Publication rate** — how often the document appears. The prime rate is
  published weekly.
- **Change rate** — how often the number moves. The prime rate changes only when
  the Bank of Canada moves, so between zero and eight times a year.
- **Transmission rate** — how often a *dependent* actually reads it. AISH reads
  the CPI once, over the 12 months ending September 30, though the CPI publishes
  monthly.

The pulse represents influence propagating, so **transmission is what it should
be showing**, and transmission is a property of the *edge*, not of either node.
The same CPI release reaches the Monetary Policy Report every month and the
Alberta escalator once a year.

This is affordable because the data is already being collected and discarded.
Documented reference periods found so far, all currently sitting as prose in
`basis` fields: 12 months to **September 30** (Alberta escalator, CRA
indexation), 12 months to **October 31** (CPP), **third quarter** CPI-W (Social
Security COLA), 12 months to **August 31** (C-CPI-U for the US tax code),
rolling **three-month** averages (OAS quarterly), population on **July 1**
(Canada Health Transfer). Six reference periods into a handful of indices.

So: `update_frequency` is gone, `releases_per_year` stays on the node alongside
an optional `changes_per_year`, and an optional reference period sits on the
dependency wherever a document states one. Milestone 3 then stops being a
simulation and becomes a calendar — the graph can be shown on a date and asked
which pulses are in flight. **That last step is not built**; the data is shaped
for it and the pulse still runs on publication rate, which is the wrong quantity.

What deleting the enum revealed: it disagreed with `releases_per_year` on 15 of
104 researched nodes, 77 were filed as `annual`, and 65 nodes carried a
`cadence_note` correcting it in prose. A filter dimension that needs a prose
correction on every second node is not a filter dimension. In all 15
disagreements the number was right and the bucket was wrong, so nothing was lost.

The backfill found 14 distinct period shapes across 34 edges, and one structural
fact worth stating: **September 30 is the busiest date in Canadian statutory
indexation.** The CRA indexation factor, the Canada Child Benefit, the Alberta
escalator, AISH and Income Support all read a 12-month CPI window closing on it.

**Published commercial sources are in; confidential ones are not.**
Decided in V0.4, implemented in V0.5.

The scope rule said "official reports", which was excluding two quite different
things:

- **Published but not official** — J.D. Power, which supplies *all* CPI used-car
  and new-vehicle prices; ICE Brent and Argus Mexico Maya, named verbatim in
  Alberta's bitumen valuation regulation; CAPP's Equalization Steering Committee
  values. These recur, have owners, and are named by the documents that depend on
  them. They are usually paywalled.
- **Never published** — the FR 2644 form behind the Fed's H.8, the CIRO repo feed
  behind CORRA, the W-2 records behind the US average wage index. There is no
  document, no cadence and no url. Nothing to point at.

Note that this was never an *evidence* problem. The BLS Handbook of Methods
states plainly that used-car prices come from J.D. Power — better documented than
many edges already in the graph. What failed was the node rule, so the node rule
is what bends.

The first category becomes nodes, marked as non-official, and **excluded from the
authority calculation** — otherwise a commercial data provider becomes a terminal
sink accruing rank, which is precisely the shape that caused the sink-leak bug.
The second category stays out and is recorded as a note on the dependent report.

The cost of the old line was a wrong answer to the question the graph exists to
answer: "what would break if this changed" was silent on an entire CPI component
coming from one company.

**Non-official nodes get a view toggle**, defaulting to on. Off answers "what
does this rest on among official releases"; on answers "what does this rest on".
The difference between the two views is the point — it makes a scope decision
inspectable instead of invisible.

The toggle is safe precisely because these nodes are outside the authority
calculation: hiding them changes no size and no ranking, so the graph does not
reshuffle when it is flicked. Built as a **filter predicate over nodes**, not
another boolean in the view panel.

Authority excludes them **by subtraction** — commercial nodes and their edges are
removed before ranking, not zeroed during it. That makes the official scores
bit-for-bit identical to a graph where the commercial nodes never existed, which
is a checkable claim rather than a hopeful one, and `npm run validate` checks it
on every run. Without that, one outgoing edge from a commercial node would kill
the property silently.

One thing this decision surfaced that nobody expected: the graph **already
contained** a commercial sink. NYMEX WTI settlement prices had been sitting there
since V0.4 as an ordinary institutional node accruing rank on three edges. The
scope rule was being violated in plain sight, and it was invisible because the
violation looked like every other node.

**Disclosure is a property of the source, not a gap in the research.**
Decided in V0.8. **The data side is built; the two visible parts are not** — see
the status note at the end of this entry.

The evidence standard answers "does a document say so". It does not answer "is
this the kind of body that says so at all", and the graph has been treating those
as one question. Two nodes with four weak edges each — one a statutory formula
whose inputs are fully enumerated, one a central bank that deliberates — are
indistinguishable in the data, and the second reads as under-researched when it is
correctly characterised.

The prompting case was the FOMC Statement, and the useful discovery is that it is
*not* a hard case. It discloses its inputs — the Statement on Longer-Run Goals
names PCE inflation, the dual mandate is statutory — without disclosing an
algorithm. `relationship_type` already carries that distinction, exactly as it does
for the Bank Rate (`calculated_from`, arithmetic) against the prime rate
(`uses_data_from`, because the Bank's own word is "affects"). Nothing new is needed
at the edge level.

What is missing is at the *node* level:

- **`determination`: `formulaic` | `discretionary`.** Whether the body applies a
  stated rule or exercises judgement. AISH, CRA indexation and the Bank Rate are
  formulaic; the FOMC Statement, the policy rate and the MPR are discretionary.
  This makes a short input list *interpretable* rather than suspicious, and it
  keeps a genuine fact about the world from being read as a research gap.
- **A disclosure ratio**, shown next to authority: how many of a node's inputs are
  documented, against how many have been searched for and not found.
  *Documented non-dependencies are worth as much as edges* is already the rule;
  this is what makes them worth something to a reader rather than only to the next
  researcher.

  **The denominator now exists as data.** `_dropped` was 61 prose entries that
  nothing read; it is now typed (`DroppedNote`), carries structured `source`,
  `target` and `reason` fields, and is exported from the loader as
  `droppedNotes`. The reason vocabulary separates answers from leads — `denied`,
  `no-document`, `wrong-target`, `wrong-direction`, `unpublishable-source` and
  `unreadable-source` are answers; `no-node-yet` and `deferred` are **research
  leads**, and there are 12 of them, which is the research backlog made countable
  for the first time.

  Two entries were deleted as superseded, including the one that rejected
  `bea-gdp -> bea-pce` on evidence grounds while that edge sat in the graph marked
  documented. `npm run validate` now fails loudly if any note describes an edge
  that exists, which is the check that would have caught both stale
  recommendations before they reached two documents.

**Rejected: confidence as glow.** The proposal was a relative encoding — glow the
undocumented edges when documented ones predominate, and the reverse when they do
not. The instinct is right that proportion is informative; the mechanism inverts
its own meaning. An edge's appearance would depend on the documented ratio
*elsewhere in the corpus*, so a research batch landing in Alberta could flip what
glow means on an edge in Washington. A reader learns "glow = questionable" and it
silently becomes "glow = solid". That is the same defect that makes *filtering is a
view, never a recalculation* non-negotiable: a picture that reshuffles makes every
comparison the reader has already made wrong, with no way for them to notice. The
salvageable version is the ratio computed **per node**, which is the disclosure
ratio above and never changes meaning retroactively.

Glow is also the worst available channel for it. Bloom threshold sat at 0.5 for
five sessions while the brightest node reached 0.36 — zero of 121 nodes ever
crossed it. Semantics built on bloom are built on the one part of the renderer with
a demonstrated history of silently doing nothing. If a third evidence tier is ever
wanted, extend the dash vocabulary (solid / dashed / dotted): it survives at three
pixels and does not compete with the glow pass.

**Rejected: a confidence weight threshold.** A threshold converts a continuous
judgement into a cliff and hides its own failures — the bloom constant is the
cautionary tale. Note also that `strength`, a per-edge weight override, already
exists in the model and is used on **zero edges**. It should stay unused: a
hand-tuned edge weight is precisely the "ranking depends on what somebody found
plausible" failure that the evidence standard exists to prevent, and it would
collide with `relationship_type`, which is already the confidence gradient.

**Status.** Built: the structured `_dropped` block, its type, the loader export,
and the validator check for notes describing live edges. **Not built:** the
`determination` field and its backfill across 122 nodes, and the disclosure ratio
in the hover card. Neither is blocked — the data they need is now there.

**A node may be a named series, a framework, or a mutual definitional partner —
not only a standalone release.**
Decided in V0.10. This supersedes the open question that used to sit under *Still
genuinely open* as "whether within-system structure needs its own relationship
kind", and it is a wider answer than that question asked for.

The question arrived four separate times in one session, which is what forced it:

- **`statcan-hfce` and `statcan-national-accounts` are the same IMDB record.**
  Household final consumption expenditure is a series *inside* the quarterly
  income and expenditure accounts, record 1901, and both are nodes. The loader's
  duplicate check cannot see it because the ids differ.
- **`bea-gdp -> bea-pce`** is a definitional identity — PCE is a component of GDP,
  not an input GDP fetched.
- **The System of Macroeconomic Accounts** is named by four separate Division 1
  revenue-base components of the Equalization Regulations, and is an accounting
  framework rather than a release with a cadence.
- **`statcan-sut` and `statcan-national-accounts` each state a dependency on the
  other**, because annual benchmarking is an iterative balancing process. Record
  1901 says its benchmarks are generated through the construction of the supply
  and use tables; record 1401 says its GDP components are reconciled to the
  income and expenditure accounts. Neither is wrong.

The alternative was to insist a node is a release, which would have meant merging
`statcan-hfce` into the accounts and losing the CPI's documented basket-weight
dependency, refusing the Equalization provisions that are the best-evidenced Tier 2
material in the corpus, and picking one direction of a mutual pair on the strength
of which section of a methodology page a sentence happened to sit in. All three
costs are paid to protect a definition of "node" that nothing else depends on.

**What makes mutual pairs safe is the V0.8 proportional retention**, and the
argument matters because a cycle in a PageRank variant is exactly the shape of the
sink-leak bug family. Every node with outgoing edges keeps a flat 50% of its own
rank however many edges it has, so two nodes pointing at each other each pass on
half and keep half. The series converges rather than running away, which a
fixed-retention sink could not.

**But mutual pairs are not neutral, and this is the cost.** Measured on the first
one, `statcan-sut` ↔ `statcan-national-accounts`: the accounts gained **31.9%**
and the tables **16.9%**, against a median of **7.2%** across all 121 nodes — the
median being non-zero because a cycle recirculates rank instead of letting it
terminate. The gain propagated correctly downstream, to the standards the accounts
cite (`sna-2008` +12.0%, `imf-bpm6` and `imf-gfsm` +14.2%), so it is not a leak.
It is still a **self-reinforcing pair**, bounded but real, and it creates an
incentive: recording a relationship as mutual pays more than recording it one way.

**The guard on that incentive is the evidence standard, and nothing else.**
Mutuality may be recorded only where *both* documents state it, in their own
words, each with its own `evidence_url`. A mutual pair asserted from one document
that mentions both directions is one edge, not two. Where the two directions are
evidenced with different strength, `relationship_type` must record the asymmetry —
in the first pair, `calculated_from` one way against `methodology_depends_on` the
other, because 1901 discloses an input while 1401 describes a validation check.

**What this did not solve was containment**, which became the open question and
is answered immediately below.

**Containment is a `part_of` field on the Report, and it carries no weight.**
Decided in V0.11, and the decision inverted the question rather than choosing
between the three recorded options, because the question had the sign wrong.

The open question read: *if a series and the release containing it are both
nodes, authority accruing to each double-counts one programme.* `statcan-hfce`
is a series inside IMDB record 1901 and `statcan-national-accounts` is that
record, and the worry was inflation. The System of Macroeconomic Accounts was
held back on the grounds that it "would triple-count rather than double-count."

**It deflates. It was measured before it was decided**, by merging the pair and
re-ranking:

| | authority | rank |
|---|---|---|
| child, `statcan-hfce`, alone | 0.2702 | #18 |
| parent, `statcan-national-accounts`, alone | 0.4604 | #6 |
| arithmetic sum of the two | 0.7305 | — |
| **merged into one node** | **0.8412** | **#2** |

So the containing release reads at **55%** of its rolled-up weight and sits four
positions too low. And splitting does not merely divide — it loses a further
**15.2%** on top of the division, because rank compounds and a sum cannot: a
merged node passes more rank upstream and receives more of it back. The upstreams
confirm it from the other side, `statcan-sut` +34.7% and `sna-2008` +16.5% under
the merge, against a median of −3.3% for everything else.

**Option three — leave it implicit and accept the double-count — was therefore
accepting an error whose direction had never been checked**, and it is the
largest single distortion currently in the ranking. This is the third time a
recorded worry has survived several sessions on plausibility alone; it belongs
with V0.10's finding that a recommendation written from a summary is a hypothesis
about a document. *A stated cost is a hypothesis about a number, and the same
standard applies.*

**Option two — a `component_of` `relationship_type` — is refused on the model's
own terms.** `RelationshipType` is defined as *how one report depends on another*
and every value of it feeds `RELATIONSHIP_WEIGHT`. Containment is not a
dependency. Weighting it would convert a bounded 15.2% understatement into an
unbounded overstatement, which is the sink-leak shape arriving from a third
direction.

**So: option one, a nullable `part_of` on the Report, with three constraints that
answer its original objection** — that it "invites a hierarchy the position rule
forbids rendering":

1. **It never touches the maths.** Not `authority`, not `size_score`, not the
   degree counts, not position. It may group in the hover card and in search and
   nowhere else. The position rule survives intact, because that rule exists
   because jurisdiction strata are a *fiction*; containment between two named
   releases is not a fiction, it is in the documents.
2. **It carries the same evidence burden as an edge.** Both nodes here cite IMDB
   record 1901 and the child is a series published inside the parent. A guess
   about what is part of what is as inadmissible as a guessed edge.
3. **A dependency edge between a node and its container is a validator error.**
   One release cannot be an input to itself. This is the rule that stops
   `component_of` creeping back in wearing a new hat, and it is enforced rather
   than merely written down — all five containment rules were fired deliberately
   against doctored data before being trusted.

**The rolled-up figure is rendered**, in the hover card and in the validator,
because a field nothing draws is a field nobody checks and `country` was wrong on
nine nodes for five sessions for exactly that reason. It is offered as a reading
aid and never as a score: it understates a true merge (0.729 against 0.841) while
overstating a bare reading, and what it honestly answers is *how much sits under
this masthead*.

**This unblocks the System of Macroeconomic Accounts node**, which is now the
best-evidenced piece of work available — six documents name it, and record 2318
added a fourth kind of citation by naming it as a *consumer* rather than as a
definitional authority.

**Subject matter is not the boundary; documented derivation is.**
Decided in V0.12. This replaces *"Scope stays focused: this is a visualisation
and knowledge tool for economic/statistical reports"* — the second half of that
sentence was doing all the work and the first half was doing none.

What has actually kept this corpus from sprawling across twelve sessions is three
rules, none of which mentions economics: the **evidence standard**, the
requirement that a node be **published on a cadence**, and — until V0.12 — that
every node **connect**. Those are the reason the graph is a hundred-odd nodes of
real material rather than two thousand plausible ones. "Economic" never had to
bind, because documented derivation chains are rare everywhere and the ones that
exist happened to be fiscal and statistical.

It also described the project badly. Municipal tax rate bylaws and provincial
assessment guidelines are not economic reports in any ordinary sense, and they
are among the best-evidenced material in the corpus.

So: **a node is a recurrently published document that another document names as
an input to itself.** The graph goes wherever the chains are written down and
stops where they are not. What this admits is health, environment and emissions,
justice, education, and the occupational and trade classifications. What it still
excludes is everything whose "dependency" is influence rather than derivation —
news, commentary, academic literature — and anything published once.

**One thing measured immediately, and it corrected the plan that proposed it.**
The expansion plan said to enter new territory *through its classification hub*,
on the reasoning that a classification is a hub by construction. Half right.
NAICS gained two edges in the first attempt — both from *surveys*. NOC and NAPCS,
read directly, produced one weak edge and four documented non-dependencies,
because **a classification document describes alignment, comparability and
concordance, and none of those is derivation.** NAPCS states outright that it is
*"not fully compatible with the CPC"*; NOC is *"comparable to"* ISCO and the same
passage limits the comparability. A hub is a hub because other documents name it,
not because it names things. **The entry move is to find the programmes coded on
a standard and read their methodology pages**, which is what produced every NAICS
edge in the corpus.

**Isolated nodes are kept. A chain that stops is a finding.**
Decided in V0.12, and it reverses a rule that had been in the loader since V0.1.

Reports with no surviving edge used to be dropped on the reasoning that a
disconnected node carries no information in a dependency graph. The cost was
specific: `fed-h15` is among the most thoroughly researched nodes in the corpus —
every source it names is a reporting form, private transaction data, unnamed
banks, or an agency without a publication — and V2.10 calls it the worked example
the whole disclosure decision was waiting for. **It has never once appeared on
screen**, and three logs described dropping it as "the evidence standard
working." It was not. The evidence standard working is showing it and showing why
it is alone.

An isolated node is not an absence of information. It is the statement *this
programme exists and nothing published names its inputs.*

Two things did not change. **Dangling edges are still dropped** — an edge
pointing at an id that does not exist is a data error, not an island, and
tolerating those is what lets slices arrive in any order. And the isolated count
is still reported by the validator, because it is worth watching: a sweep that
adds fifty islands has added territory in the most literal sense.

**Isolated nodes are held in a margin beside the graph**, pinned, in a column at
a distance measured from the connected cloud so it stays outside as the graph
grows. The alternative was a distinct outline, which was rejected on the ground
that a hollow or dimmed sphere is indistinguishable from what distance haze
already does to the far side of the cloud. **This does not breach the position
rule**: that rule forbids coordinates asserting a hierarchy the dependency data
does not contain, and isolation is read directly off the edge list rather than
asserted — the same escape that makes depth-in-the-graph a legitimate vertical
axis. Having no edges is a fact about the edges.

**Termini: a `terminal_reason` on the Report, for inputs that cannot be
publications.**
Decided in V0.12. The argument is the argument that admitted commercial sources
in V0.4 — **the node rule was excluding real facts about fragility** — and the
symptom was the same shape. The graph exists to answer *what would break if this
changed*, and for a whole class of named, real, load-bearing inputs it was
answering nothing at all, because the input had no representation. Roughly forty
`_dropped` notes recorded exactly this.

Four values, and they are four genuinely different reasons the publication
requirement fails: `unpublishable` (a form or an administrative record — the CRA
PD7 accounts behind SEPH, the GST files behind the Monthly Survey of
Manufacturing, the T1/T2/T3010/T5013 data behind the annual manufacturing survey,
the FR 2644 form behind the Fed's H.8); `unidentified` (the document names a
*slot* and something outside it decides the occupant — Alberta's BVM Regulation
setting the WCS index from "the commodity brokers specified" in a list the
Minister sets by order); `redistributed` (reached via an intermediary that
publishes nothing of its own, i.e. Haver Analytics); and `confidential`
(collected and deliberately never released — the CIRO repo feed behind CORRA, the
W-2 records behind the US average wage index).

**It relaxes the publication requirement and nothing else.** A terminus still
needs a document naming it, in the source's own words, exactly like an edge.

**Excluded from authority by subtraction**, exactly as commercial nodes are and
for the same reason: a terminus is a sink by construction, and a sink accruing
rank is the sink-leak bug. `npm run validate` asserts ranked scores are identical
with and without them. Two validator rules — a terminus may have no outgoing
dependency, and may not also be commercial — were **fired against doctored data
before being trusted**, along with a baseline confirming neither fires on the
real corpus.

**`redistributed` should not be reached for yet.** A redistributor is better
modelled as a property of the edge (`via`) than as a node, and there is exactly
one known instance. The value exists so the case can be counted, not so it can be
used.

**Research lands incrementally, one slice per file.**
Findings go into `src/data/research/*.json`, merged by a loader that tolerates
edges pointing at reports not yet researched. Slices can arrive in any order.
This exists because a batch of research agents was told to gather everything and
write one file at the end; a session limit killed them all before the last step
and roughly 900,000 tokens of real work was lost. Anything long-running writes
as it confirms, never at the end.

**`country` is an open ISO code, not a closed union.** *(Decided 2026-08-04, for
the EU branch.)*

`Country` was `'CA' | 'US' | 'INT'`, and its own comment said to split it if the
corpus ever grew a real third national system. The EU branch grew twenty-eight at
once — a supranational layer plus 27 member states — so the union was retired
rather than extended. `country` now takes any ISO-3166 alpha-2 code, with
`'CA' | 'US' | 'INT' | 'EU'` kept as an autocomplete hint list. Adding Germany is
a data change, not a schema change, which is the property the China galaxy will
need as well.

`JurisdictionLevel` gained **`supranational`**, and it is not a synonym for
`international`. The difference is legal force, and it is the entire reason the
EU branch is worth building: an international body publishes a standard that
national systems adopt by choice (SNA 2008, BPM6, IPSAS), while a supranational
body legislates. ESA 2010 is Regulation (EU) No 549/2013, and its Annex B
transmission programme obliges member states to send named tables by named
deadlines. Filing the EU as `international` would erase exactly the property the
Canada/US pair was measured to lack.

**The option not taken, and why.** Defaulting member states to `INT` was rejected
outright — that is the bug this project already paid for, when nine international
bodies sat recorded as Canadian for five sessions because the type had no room
for them and nothing rendered the field. At 27 member states it would repeat at
scale, and it would also be wrong in the rim-colour channel.

**What it costs.** The compiler no longer checks that a country has a colour.
That check was load-bearing, so it is replaced rather than dropped: `validate`
now errors on any country with no entry in `COUNTRY_FAMILY`, and both the fill
and the rim fall to a flat unclassified grey rather than into a family, so an
unmapped country is visible instead of absorbed. Colour is keyed to a hue
*family* rather than to a country — 27 families cannot be told apart at fit zoom,
so Germany, France and Italy all draw from one green EU family (100°–158°, the
only free arc wide enough), and "which member state" is answered by the label,
the flag and the region filter. **That is a deliberate loss of one
discrimination**, worth revisiting if the member-state layer ever gets deep
enough to need it; as of this decision exactly one member state has extracted
records.

All new guards were fired against doctored data before being trusted, in the same
spirit as the terminus rules above — see `scripts/eu-schema-smoke.ts`, which
exists because the real corpus contains no EU node yet and therefore exercises
none of these paths.

---

---

## Working with the corpus

Adding and editing nodes is the permanent work of this project, so what has been
learned about the source material lives here rather than in a rollup that a
later rollup would consolidate away. None of it expires.

### What the documents are like

- **Municipal tax rate bylaws are the keystone.** By statute a bylaw must state
  the assessment it levies against and every requisition it collects for another
  body, so it names its own inputs in a way most municipal documents do not. Six
  edges out of one PDF, and it replicated exactly across a city and a county.
  When entering a new municipality, start there.
- **Statutes are better evidence than webpages,** and are usually available. The
  strongest edges in the graph come from regulations quoting their inputs by
  name. A webpage saying two things are related is usually not enough; a
  regulation naming a series is.
- **Where the graph looks uneven, suspect disclosure before reality.** A city
  states outright that property tax revenues are based on assessment values; the
  neighbouring county carries no equivalent sentence, so the same edge is not
  available on the same terms. The dependency is identical. The wording is not.
- **Rural municipalities add rather than depart.** Regulated property —
  machinery, equipment, linear — is valued by provincial Minister's Guidelines
  rather than at market, and is nearly 40% of a rural tax base.
- **Municipal reporting is markedly more machine-readable than post-secondary
  reporting.** Some institutions publish annual reports only through Issuu, a
  page-flipping viewer, with no text-extractable copy anywhere. Public and
  unreadable at once. Budget for this across post-secondaries.
- **The evidence standard bites hardest at the commercial boundary** — which is
  what forced the commercial-source decision above.
- **A verbatim quote is checkable in minutes; a paraphrase is not checkable at
  all.** This is why the V0.9 extraction format requires quotations, and V0.11
  tested it from the other side. A submitted artifact of 24 edges arrived with
  every `basis` written as paraphrase. Two survived — and both were the ones that
  happened to quote. Where there was no quoted string there was nothing to check
  except the section number, and the section numbers were the ones already known
  to be wrong. The rule is not about trust; it is that a paraphrase destroys the
  only cheap verification move available.
- **Documents with a data-sources table are worth more than their subject
  suggests.** Ontario's OMPF Technical Guide carries an Appendix F listing every
  data element the allocation consumes and where each comes from. That is the same
  evidence class as a regulation quoting its inputs, and it is why a municipal
  grant programme was worth entering before larger things. When scoping a funding
  programme, look for the technical guide's appendices before reading the prose.
- **A methodology page can describe a dead arrangement in the same register as a
  live one, and tense is the only signal.** IMDB record 2101 says *"Up to and
  including 2003, the MSM was benchmarked to the Annual Survey of Manufactures and
  Logging (ASML). Benchmarking was the regular review of the MSM estimates in the
  context of the annual data provided by the ASML."* That is a verbatim quote,
  correctly located, in the methodology section, describing an arrangement that
  ended twenty-two years ago. **Nothing in the extraction format catches it** —
  the quote passes every check the project has, because every check is about
  whether the document says it and not about when. The edge in question does exist,
  on record 2103's present-tense *"the data are used by"*, which is the other half
  of the lesson: **when a relationship is described in the past tense, look for
  the live statement from the other end before either taking it or dropping it.**
  Expect this across hundreds of IMDB pages; these are living documents with
  historical notes folded in and no visual separation between the two.
- **Disclosure often stops one level short of a title, and that level is the whole
  question.** Appendix F attributes six indicators to "Statistics Canada" and names
  a release for exactly one of them. H.15 names its sources thoroughly and every
  one falls outside the node rule. Expect the last step — from *who produced it* to
  *what it is called* — to be the step that is missing, and budget for it as the
  normal case rather than the disappointing one.

### Documented non-dependencies are worth as much as edges

BLS states the CPI item structure "does not correspond to" NAICS. Alberta's
credit union supervisory chain contains no reference to Basel, OSFI or the
Superintendent across 220KB of standards. Both were checked deliberately and
both are findings — record them in the slice's `_dropped` block rather than
leaving the next pass to re-run the same search.

`_dropped` is not a scrap heap. It is where the reasoning lives for edges that
look obvious and are not, and it is what stops the same plausible-but-unsourced
edge being proposed every few sessions.

### When the ranking looks wrong, first ask whether the graph is wrong

This has been the right diagnosis four times running — SEPH over-ranking, the
Alberta Economic Outlook doing the same, and twice more after the authority fix
exposed a curation imbalance. In each case a node sat at the head of a short
chain of strong edges with nothing else draining the weight, and in each case
the maths was right and the graph was thin there. Each resolved as data grew.

Reach for this before reaching for the damping factor. Raw in-degree is computed
and displayed alongside weighted authority for exactly this purpose: the two
disagreeing sharply is the signal that edge data is wrong.

**A caveat on the doctrine's own track record, worth keeping.** For four sessions
this was the right diagnosis, but it had a rival nobody had tested: under the old
fixed retention, a node with exactly one weak outgoing edge kept two-thirds of its
own rank while a node documenting three kept a third. Two of the four cases the
doctrine was applied to — SEPH and the Alberta ministerial guidelines — were nodes
of exactly that shape. "The graph is thin here" and "this node discloses one input
weakly" predicted the same symptom, and the second was never checked.

Proportional retention removed that rival in V0.8, so the doctrine is sound again
as written. The transferable lesson is the one the episode teaches rather than the
constant it turned on: **before concluding the graph is thin, check that no
property of the metric produces the same symptom.** A metric artifact and a
curation gap look identical from the ranking alone, and the metric is the cheaper
of the two to rule out.

### Running research in batches

Findings go to `src/data/research/*.json`, one file per slice. The rules below
were bought with roughly 900,000 tokens of lost work and are not optional:

1. **State the incremental-write rule first, with its reason.** Anything
   long-running writes as it confirms, never at the end. Five agents were once
   told to research everything and write one file at the finish; a session limit
   killed all five before any had written anything, and two were within a step
   of done.
2. **One file per agent, named in the prompt.** No coordination, no conflicts,
   no agent waiting on another.
3. **Put the full list of existing node ids in every prompt.** This is what
   stops a batch producing disconnected islands — agents attach to
   `statcan-cpi` instead of inventing their own version of it.
4. **State what an agent does *not* own, not just what it does.** Two agents
   once independently defined the same node. The loader caught it, but
   converging definitions are the signature of overlapping slice boundaries.
5. **Give agents explicit permission to report negatives.** Some of the most
   valuable results have been confirmations that a relationship does not exist
   in any public document.

### Connectivity is worth more than volume

A disconnected cluster is worth much less than its node count suggests. One
research agent spent entirely on finding documented bridges between isolated
clusters was the highest-value call of an eight-agent session. Check the
component count after every batch; if it is above one, fixing that beats adding
territory.

---

## Legibility at scale — what 121 nodes actually looks like

Looked at properly for the first time in V0.5, having gone unverified through
the growth in V0.4. Three of these are decisions that were right when they were
made and have since expired, which is worth stating plainly: **the graph got
four times bigger and several visual choices were tuned at 33 nodes.**

Two of the five are now resolved and marked ✅. They are kept rather than deleted
because in both cases the *class* of error is the transferable part, and because a
list of what looking has caught is the argument for doing it more often. Three
remain open.

- ✅ **The camera fits the room, not the nodes.** Fixed in V0.7 as a side effect of
  deleting the platform: the auto-fit had been measuring the slab's diagonal
  rather than the node cloud. Kept here because the *class* of error recurs —
  fitting to scenery rather than to data.
- **Zoomed in far enough to read a node, the centre is opaque.** This is
  occlusion, not a weak size encoding — top-to-median radius is 2.14×, which is
  4.6× in area, and only 13 of 121 nodes sit near the minimum. Size reads fine
  in isolation and not at all through three other spheres.
- ✅ **Distance haze and glow: answered, with usable ranges.** The question was
  reframed in V0.5 as "how much fog, not fog or not", both became sliders in V0.7,
  and V0.8 finally looked at the ends of them. **Haze ~35% and glow ~55% is the
  legible setting. Both at 100% is materially worse, not merely different.**

  The failure mode is specific and worth knowing, because it is not "too bright".
  At full haze with the horizon on, the scene flattens into a blue-grey field and
  **the country hue families stop separating** — the cyan US cluster and the warm
  Canadian mass converge toward the same muted grey-brown. That destroys the single
  biggest legibility win the project has, the V0.7 scope recolouring, and it takes
  the size encoding with it: spheres get harder to compare, not easier, because the
  fog is doing to hue and value what it is supposed to be doing only to depth.

  So both sliders have a usable band well below maximum, and the reason to care is
  that **haze trades depth cue against colour discriminability.** Turn it up to
  recover depth and you spend country separation to get it.

  At the good setting the V0.7 claim about scope colour holds up at fit zoom for
  the first time: the US cluster reads as a distinct cyan region hanging off the
  Canadian mass with the violet international bodies between them. That was
  arguable from the edge data before and is now simply the picture.
- **Out-of-focus node dimming is too weak to be doing the job it claims.**
  Selecting a node visibly changes the *edges* — they dim and their pulses stop —
  while the spheres barely move at `DIM_NODE_OPACITY` 0.34 under bloom. The cone
  is legible, but not for the reason the code believes.
- **Filtering turned out to be the best density fix available.** Hiding one
  jurisdiction level makes the graph immediately readable. The filter layer was
  built to answer scope questions and answers the legibility question too, which
  was not the plan.

---

---

## Still genuinely open

### Everything else still open

- **The 8 remaining seed edges with no `evidence_url`**, down from 27 and then 21.
  They have no research copy to fall back on. By this project's own standard they
  should not exist, and the resolution is per-edge: find the document, delete the
  edge, or demote it to `implied`. **"Find the document" is not the default** —
  three of the 21 were resolved by deletion or demotion rather than by a URL.

  What is left is two clusters and one stray: `boc-policy-rate -> statcan-lfs`,
  `boc-policy-rate -> statcan-national-accounts`, `boc-mpr -> boc-policy-rate`,
  `boc-mpr -> fed-fomc-statement`; `fed-fomc-statement` and `fed-sep` each to
  `bls-employment-situation` and `bea-gdp`. **They have had no research at all** —
  they are not "searched and not found", and a later pass must not read them as
  the former. The structural argument for doing them is gone: the graph is one
  component with no orphans under the strict standard, so these eight now buy
  completeness rather than connectivity.

- **What a mutual pair does to everyone else depends on where the pair points,
  and V0.10 generalised from one instance.** That log recorded a cycle as
  recirculating rank rather than letting it terminate, with a median gain of
  **+7.2%** across the corpus. The graph's second mutual pair,
  `statcan-sut` ↔ `statcan-ippi`, measures a median of **−2.4%** — the opposite
  sign. The pair itself gains as expected (the tables +40.0%, the index +10.7%),
  but the recirculated rank stays inside the pair instead of propagating, because
  the IPPI's only other outgoing edge is to `naics`. The first pair propagated
  because both members pointed at the international standards.

  So the +7.2% was an instance and not a law, and the incentive V0.10 identified
  is sharper than it looked: **recording a relationship as mutual pays the pair
  and can charge everyone else.** The guard is unchanged and is still the
  evidence standard. What is open is whether anything further is needed once
  there are enough pairs to see a pattern — two is not enough, and the honest
  position is that this is being watched rather than managed.

- How aggressively the layout should re-run when nodes or edges are added — full
  re-simulation is disorienting, no re-simulation leaves new nodes badly placed. Likely a
  short local settling animation, but this needs to be seen before deciding.
  *(Filtering sidesteps this entirely by never re-running the layout. Adding
  data does not.)*
- Whether cadence should also influence layout (clustering by update rhythm) or only
  drive the pulse timing.
- What the default view should be at several hundred nodes. The current defaults
  were chosen by looking, at 33 nodes, and looking again at 121 says they are
  wrong — but the honest fix is not obvious, because the fixes for framing,
  occlusion and depth interact.
*(The cadence model and the treatment of non-official sources were open here
until V0.4. Both are now settled — see Decisions. The non-official one is
implemented; the cadence one is not.)*
