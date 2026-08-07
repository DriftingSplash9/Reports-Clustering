# EXPANSION-V1 — the plan for going wide

Written 2026-07-30, after V0.11, against a graph of **124 reports / 205
dependencies**. Not a session log and not a decision. It is a proposal, and the
project's own standard applies to it: *a stated cost is a hypothesis about a
number.* So every number below was measured against the loaded data in this
session rather than read out of a document, and where a claim could not be
measured it says so.

The ask was **two axes at once — scope beyond economic reports, and corpus at
volume** — with the plan reviewed before anything is built.

---

## 1. Baseline, re-measured independently

Not read from `npm run validate` (which will not run in this sandbox — the
`node_modules` tree is a Windows build and esbuild refuses). Parsed straight
from `reports.ts`, `dependencies.ts` and the 25 research slices, with the
loader's own rules reimplemented: first-wins for reports, later-wins for edges,
dangling edges dropped.

| | |
|---|---|
| Reports loaded / after dropping orphans | 126 / **124** |
| Dependencies | **205** — 196 documented, 9 implied |
| Documented edges with no `evidence_url` | **8** |
| Dropped every build as orphans | `fed-h15`, `ab-municipalaffairs-lgff-operating` |
| Undirected documented links | **194** |
| Bridges | **40 of 194 (21%)** |
| Articulation points | **31 of 124 (25%)** |
| Components | 1 |
| Research slices | 25 files, 108 nodes, 190 edges |
| `_dropped` notes | **121** |

**Those middle four reproduce V0.11 exactly**, from an independently written
Tarjan and an independently written loader. That is the first time this
project's structural numbers have been confirmed by a second implementation, and
V0.11 listed "the bridge list was not audited" under *Not verified*. It can come
off that list.

Three things fell out of the re-measurement that no document currently says.

**1a. The eight unevidenced seed edges are structurally load-bearing.** Measured
both ways:

| Edge set | links | bridges | articulation |
|---|---|---|---|
| documented | 194 | 40 (21%) | 31 of 124 (25%) |
| documented **+ `evidence_url`** | 186 | **43 (23%)** | 32 of 124 (26%) |

Removing eight edges *creates three bridges*. So Tier 0's three permitted
resolutions are not equivalent: "delete the edge" makes the graph thinner as
well as smaller, and the thinning is concentrated exactly where BACKLOG.md says
to care. This does not change the standard — an edge nothing documents should
not be in the graph — but it does mean the honest headline is **23%, not 21%**,
and the strict figure is the one to track from here.

**1b. The research backlog is nearly four times what the documents say.**
`_dropped` now holds **121** notes, of which **42 are research leads** — 34
`no-node-yet` and 8 `deferred`. BACKLOG.md and V2.10 both still say 12, which
was true at V0.8. Nobody re-counted. **Forty-two leads is a substantial fraction
of the corpus already sitting written down, evidence-bearing, and unbuilt** —
and every one of them was found by someone reading a document properly, which is
the expensive part.

**1c. The duplicate hole cannot be closed with URLs, and it is about to matter a
great deal.** The loader has now failed to see the same programme under two ids
twice, both times a Statistics Canada record: `statcan-hfce` against
`statcan-national-accounts` (IMDB 1901, caught in V0.10) and
`statcan-supply-use-tables` against `statcan-sut` (IMDB 1401, caught in V0.11).
Both were caught by a human noticing.

A URL-equality check does not fix it. Six groups of nodes currently share a URL
and **all six are legitimate** — `fed-fomc-statement` and `fed-sep` both live on
the FOMC calendar page; three Bank of Canada rates share one rates page; four
pairs of municipal budget-and-statements documents share a landing page. A naive
check produces six false positives and still misses the two real cases, because
in both of those the two nodes had *different* URLs for the same record.

Only **4 of 124 nodes carry an IMDB URL at all.** `statcan-national-accounts` is
record 1901 and does not say so anywhere a machine can read. The record number
lives in prose, in `basis` fields and in session logs.

---

## 2. The scope question, and why the current rule is not the one doing the work

REPORTS.md says: *"This is a visualisation and knowledge tool for
economic/statistical reports, not a general knowledge graph of everything."*

The second half of that sentence is load-bearing and the first half is not. What
has actually kept this corpus from sprawling across eleven sessions is three
other rules, none of which mentions economics:

1. **The evidence standard.** A document must name the input.
2. **A node is a thing published on a cadence.** `releases_per_year` is required
   and fractional-but-real; that is what excluded Haver Analytics and the
   Minister's unnamed commodity brokers.
3. **Every node connects.** The seed rule — *every node either depends on
   another node here or is depended upon by one* — is enforced by the loader
   dropping orphans, which is why `fed-h15` is absent from every build.

Those three are the reason the graph is 124 nodes of real material rather than
2,000 nodes of plausible ones. "Economic" has never had to do any work, because
documented derivation chains are rare everywhere and the ones that exist
happened to be in fiscal and statistical material.

**So the proposed restatement of the scope rule is:**

> A node is a recurrently published document that another document names as an
> input to itself. Subject matter is not the boundary; documented derivation is.
> The graph goes wherever the chains are actually written down, and stops where
> they are not.

That is a widening, but it is not "a general knowledge graph of everything" —
the three rules above bind exactly as hard as before, and they are the ones that
bite. It also retroactively describes what the project already did: municipal
tax bylaws and provincial assessment guidelines are not economic reports in any
ordinary sense, and they are among the best material in the corpus.

**What it admits that the old rule excluded, in order of evidence quality:**

| Territory | Why it qualifies | Outlook |
|---|---|---|
| **Health statistics and funding** | CIHI's NHEX already in at 9 nodes; ICD-10-CA is a classification standard of exactly the SNA/NAICS shape | ★★ |
| **Environment and emissions** | The National Inventory Report cites the IPCC Guidelines by name — the same edge shape as `sna-2008` | ★★★ |
| **Justice and crime statistics** | The Uniform Crime Reporting Survey feeds sentencing and policing formulas; StatCan IMDB discloses inputs | ★★ |
| **Education and skills** | PCAP, PISA, the Postsecondary Student Information System; NOC as the occupational classification hub | ★★ |
| **Occupational and immigration systems** | Express Entry and provincial nominee streams key off NOC codes by regulation | ★★★ |
| **Trade classification** | The Harmonized System, CPC, and the customs tariff — statutory, and they name their inputs | ★★★ |

**What it still excludes**, and the exclusions are the point: news, commentary,
academic literature, anything whose "dependency" is influence rather than
derivation, and anything published once.

**This is a change to REPORTS.md and I have not made it.** It needs your yes,
because it is a direction change and the protocol says direction changes go
through you and into `START-HERE.md` as well.

---

## 3. The entry rule: go in through the classifications, not the topics

This is the one recommendation here that is not obvious, and it follows from
BACKLOG.md's own criterion rather than from taste.

Ontario is the worked example and it is one session old. Two edges were added;
**both were bridges**; the fraction went 20% → 21% immediately; and BACKLOG's
stated stop signal fired on the first thing added after the criterion was
re-measured. Ontario now hangs off the corpus by a single clause in an appendix
definition. That is what entering a new territory *through its topic* looks like.

The alternative is to enter through the thing the new territory and the existing
corpus **already share**. Classification standards are that thing, and this
corpus already demonstrates it: `naics` has six incoming edges, `sna-2008` and
the IMF frameworks are the reason the Canadian and US clusters are one component
at all, and V2.10 records that *the two national systems connect mainly through
shared standards.* A standard is a hub by construction — many documents name it,
it names few things itself, and it spans domains because that is what a
classification is for.

**Concretely: NOC before any labour-market or immigration material. ICD-10-CA
before any health material. NAPCS and HS before any trade material. IPCC
Guidelines before any emissions material.** Each is one node that arrives with
several incoming edges from documents already in the graph, and each then makes
the new cluster attach at a hub instead of dangling.

The prediction this makes is falsifiable and should be checked after each one:
**a classification node should add links without adding bridges.** The IPPI did
exactly that in V0.11 — three links, zero bridges — and it is the closest thing
to a precedent.

---

## 4. Three gates before any of it

All three are small, all three are the kind of thing that gets 5× harder after
the corpus triples, and one of them has already cost two incidents.

**Gate 1 — a `programme_id` field, and a validator rule on it.** An optional
identifier of the form `statcan-imdb:1901`, `cihi:nhex`, `bls:cpi`. It closes
the duplicate hole that URLs cannot (§1c), it makes `part_of` machine-checkable
instead of asserted, and it is what stops a high-volume StatCan sweep re-adding
`statcan-cpi` as `statcan-consumer-price-index`. Backfill is small now — 4 nodes
carry an IMDB URL, maybe 20 have a discoverable record number. At 400 nodes it
is a session.

**Gate 2 — re-count `_dropped` and promote the 42 leads into BACKLOG.md.**
Currently three documents say 12. The leads are the cheapest material available
by a wide margin: the document has been read, the quote exists, and what is
missing is a node. **This is Tier 1 and it is four times bigger than Tier 1 is
recorded as being.** Nothing should be researched fresh before this is counted,
because some fraction of a fresh sweep will rediscover what is already sitting
in these notes.

**Gate 3 — look at the thing.** V0.11 shipped `part_of` rendering that has never
been on a screen, and the project's own record puts the cost of an unlooked-at
change at about a session. The `dev` server is running on localhost:5173 in your
browser already. This is minutes, and it also gets the default-framing and
occlusion questions in front of a human before the node count triples and makes
both worse.

**Gate 0, arguably: the eight seed edges.** I am *not* proposing these as a gate,
against BACKLOG.md, and the reason is §1a — they are load-bearing, so deleting
them costs structure, and "find the document" for eight edges with no research at
all is a research session in its own right. They should ride along with the Grok
track (they are four Bank of Canada and four Federal Reserve edges, and the Fed
material is being opened anyway), not block the plan.

---

## 5. The throughput problem, and the two-track method

**The arithmetic is unforgiving.** 108 researched nodes and 190 researched edges
across 25 slices, over roughly eleven sessions. That is about **10 nodes and 17
edges per session.** Getting to 400 nodes at that rate is 28 more sessions.
"Expand big time" is therefore not a scheduling question, it is a throughput
question, and working harder inside the current loop does not answer it.

What actually consumes the time is not judgement — it is **reading long documents
to find the sentence that names a release**. Grep a 500 KB consolidated
regulation, open an IMDB record, find the *Data sources* section, read the
Appendix F table. That work is high-volume, low-judgement, and verifiable after
the fact by anyone holding the quote.

V2.10 already established the split and measured it: an external reader given
the evidence standard and a mandatory verbatim-quote requirement produced **33
provisions across three rounds with zero adjudication errors**, once the verdict
field was removed. *Extraction is reliable; adjudication is not, and it fails
toward yes.*

**So the loop, as you described it:**

| | Grok | Me |
|---|---|---|
| Does | Opens documents, greps, quotes verbatim, lists releases named, writes `AGENCY ONLY` and `NOT FOUND` | Adjudicates the quotes, writes the slice JSON, decides `relationship_type`, measures the effect, changes the model |
| Never does | Decides whether something counts. No verdict field exists in the brief | Accepts a paraphrase. V0.11 measured that: 24 submitted edges, 2 survived, and both were the ones that quoted |
| Output | A brief's worth of entries, one provision per entry, with URL + location + quote | A research slice, a measurement, and the next brief |

The handoff artifact is `Grok-Research-Brief-N.md`, which is the format that
already works and which I have not changed. **Brief V is written and sits beside
this file.**

**Two rules on the loop, both bought expensively and both in V2.10:** write as
you go, never at the end (900,000 tokens were lost to this once); and one
provision per entry with its own section number (fourteen good quotes were
discarded once for arriving bundled).

**One rule I am adding**, from V0.11's Ontario episode: **a returned brief is
adjudicated and then measured before the next brief is written.** If the bridge
fraction goes up, the next brief bridges rather than extends. The criterion
already exists; what has been missing is putting it *between* the rounds instead
of after them.

---

## 6. What breaks between here and 400 nodes

Stated as predictions so they can be wrong.

**The renderer breaks first, and it is already broken.** The default view is
recorded as wrong at 122 nodes and the dense centre is occluded at read-in zoom.
Neither is a performance problem — `three-forcegraph` will run 400 nodes fine —
they are both *legibility* problems and they get monotonically worse. The
existing mitigation is the filter layer, which V0.5 found by accident to be the
best density fix available. At 400 nodes filtering stops being a nice-to-have
and becomes the primary interaction, which argues for the domain filter
(deferred with no tier, and the filter layer already supports it) moving up.

**Search stops being a convenience.** At 124 nodes you can find things by
orbiting. At 400 you cannot, and `part_of` grouping plus a domain facet is what
makes the search panel usable rather than a name-prefix box.

**The disclosure ratio's denominator gets worse, not better.** V2.10 records the
trap: null-when-nothing-dropped gives a node nobody has examined a perfect
score. A high-volume sweep adds nodes faster than it adds `_dropped` notes about
them, so the fraction of the graph that reads as "transparent" when it means
"unexamined" grows with the corpus. The rule (null unless something was searched
for and not found) already handles it — but it means the ratio must ship
*before* the sweep, or it ships into a graph where it is mostly null and looks
broken.

**Authority is fine.** PageRank at 400 nodes is nothing, proportional retention
holds regardless of size, and the commercial/implied subtraction invariants are
checked every run. The one thing to watch is **mutual pairs**, where the corpus
now has two measurements with opposite signs (+7.2% and −2.4% median) and V0.11
correctly refused to generalise. More pairs will arrive with volume. Three or
four is where the honest answer becomes available.

**The slice loader is fine to about 100 files** and then the hand-written import
list in `index.ts` becomes the annoyance. Vite supports glob imports; this is a
ten-minute change whenever it starts to hurt.

**`last_updated` is still null on every node in every log since V0.1**, and
milestone 3 is behind it. Volume does not touch this and it does not touch
volume. It stays on its own track exactly as BACKLOG.md says.

---

## 7. Proposed order

| | What | Why here |
|---|---|---|
| **1** | Gates 1–3: `programme_id` + validator rule, re-count `_dropped`, look at the build | Small, and each gets harder with scale. Gate 1 has already failed twice |
| **2** | Build out the 42 leads already in `_dropped` | Cheapest material in the project. Evidence found, node missing |
| **3** | The classification hubs: NOC, ICD-10-CA, NAPCS, HS, IPCC Guidelines | The bridges that make everything after this attach at a hub |
| **4** | Scope decision goes into REPORTS.md and `START-HERE.md`, if you say yes | Direction change; must be written before it is relied on |
| **5** | First new-territory sweep, entered through the hub built in 3 | Health or emissions — emissions has the better evidence outlook |
| **6** | BACKLOG Tier 2 — interprovincial, Equalization first | Unchanged. It is still the biggest single gain in what can be asked |

Grok runs continuously alongside all six. Brief V (attached) covers the StatCan
IMDB sweep and the classification hubs, which is items 2 and 3 — so the parallel
track is already pointed at the right thing and I can spend my own time on the
gates and the model, which is the half Grok cannot do.

**Legibility check after every item, not saved up.** That is BACKLOG's rule and
V0.5's lesson and it is the one that keeps getting skipped.

---

## 8. What I am not proposing

- **Other countries.** UK, Eurostat, ABS. They add territory, not structure —
  V0.8 measured standard-compliant direct official CA↔US edges at zero and V0.9
  took it to one. A third national system would hang off the standards layer the
  same way, and the graph does not need a third of anything yet.
- **Statutes as nodes.** V0.11 found three statutes that write in what to do when
  their own input stops behaving, and noted the graph cannot show it. It is a
  real gap. It is also a parallel legal layer that could double the node count
  without answering the question the graph exists to answer, and **the honest
  move is the one V0.11 made about containment: measure it on one case before
  deciding.** Recorded, not scheduled.
- **Relaxing anything to hit a number.** The evidence standard is what makes
  volume worth having. A 400-node graph built on paraphrase is worth less than
  this 124-node one.

---

## 9. Open, and needing you

1. **The scope restatement in §2** — yes, no, or a different boundary. Nothing
   in §5 or §7 past item 3 proceeds without it.
2. **Whether a target size is wanted.** The roadmap has no number in it and
   BACKLOG's tiers imply 350–450 for tiers 1–3. Saying a number out loud makes
   the throughput problem in §5 arguable instead of vague.
3. **Statutes as nodes** — worth measuring on one case, or leave it recorded?

---

## Verification performed

- Baseline parsed independently of `npm run validate`, with the loader's
  first-wins / later-wins / drop-dangling rules reimplemented; reconciles to
  124/205 including identifying the two dropped orphans by name.
- Bridges and articulation points computed in a freshly written iterative
  Tarjan; **reproduces V0.11's 194 / 40 / 31-of-124 exactly**, which is the
  independent confirmation V0.11 listed as missing.
- The strict-standard structure numbers (186 / 43 / 32) are new and were
  computed the same way in the same run.
- `_dropped` counted by reason across all 25 slices.
- The URL-collision claim checked **both** with and without query-string
  normalisation, because the first pass produced a false finding — four StatCan
  nodes appeared to share a URL only because I had stripped `?SDDS=`. The six
  reported collisions are exact-string and all six were inspected individually.

## Not verified

- **Nothing was rendered.** Same debt V0.11 opened, now one session older. It is
  Gate 3 for that reason.
- **The evidence ratings in the §2 table are outlooks, not findings.** ★★★ for
  emissions rests on the National Inventory Report citing the IPCC Guidelines,
  which I believe from the programme's structure and have not opened. Treat the
  whole column as a hypothesis about documents.
- **The throughput arithmetic in §5** divides total researched output by a
  session count taken from the log numbering. Sessions are not uniform and some
  were entirely renderer work, so 10 nodes/session is a floor on the research
  rate rather than a measurement of it.
- **The 400-node predictions in §6** are predictions. Nothing in this project has
  been run past 126.
