# REPORTS.md — Economic Report Influence Graph

> The overarching idea. This document changes when the *direction* changes,
> not when the code does.

---

## 🛑 Agent: read this before doing any work

1. **`HANDOFF.md`** at the top level — live state and the todo. Exactly one,
   always at the top level; superseded ones are in `archive/Previous Handoffs/`.
   Its §1 is the reading list, routed by task — follow it and stop.
2. **`PLAYBOOK.md`** §2 (standing rules), §6 (traps), §7 (do-not-re-raise).
   The rules that bind everything — never run git from an agent session; no
   document, no edge; a pointer is not a source; nothing is deleted, it goes to
   `_to_delete/` — live there, not here.
3. **This file from "The one-line version"** — what the system is trying to be
   and what is out of scope. It changes when the *direction* changes.
4. **Project memory**, newest first, as a hint: where memory and `HANDOFF.md`
   disagree, the file wins.

There is no `CLAUDE.md` and no other standing-rules file. The per-branch
hand-off chains (`AF/`, `EU/`, `NZ/`, `AU/`, `CA/`, and the BRICS `G.*` files)
are finished and live under `archive/`; the corpus now moves as a whole,
through `HANDOFF.md`. The old `sessions/` log is archived unedited at
`archive/sessions/` and is not being resumed.

`START-HERE.md` is not for you. It is the plain-language description Thomas
sends to other people and renders in-app as Help ▸ What this is — keep protocol
and jargon out of it, but update it if a *direction* changes.

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

| # | Milestone | Status |
|---|-----------|--------|
| 0 | Data model + seed data | done |
| 1 | 3D force graph | done |
| 2 | Directed influence | done |
| 3 | Update simulation on real cadence | cadence model built; the pulse still runs on the wrong quantity |
| 4 | Readable detail panel | done, on hover |
| 5 | Curated real-world seed set | done — the corpus is now ~3,300 reports |
| 6 | Search, filters & domains | done for name, scope, source kind and evidence grade; domain filter removed 2026-08-05; cadence filter not built |
| 7 | Polish & export | in progress — the Midvamp Revamp (`notes/Midvamp - Revamp.md`) is the plan of record; live state in `HANDOFF.md` |

---

## Decisions — index

The prose of every decision below (43.8 KB of design archaeology from the
33-to-121-node era) lives verbatim in
`archive/decisions/REPORTS-decisions-2026-09-05.md`. The live do-not-re-raise
ledger for corpus work is `PLAYBOOK.md` §7; nothing here needs reading before
a research round. One line each, oldest first as written:

- Palette is continent-based, not bloc-based; `ColourFamily` is `CA | US | INT | EU | XEU | AFR | ASIA | SAO | SA` (2026-08-05).
- The domain filter is removed; `domains` stays as data (2026-08-05).
- Influence pull is visual (edge pulses), not positional.
- The program watches documented derivation, not subject matter.
- Geographic scope: any jurisdiction with a documented chain; `country` is an open ISO code, not a closed union.
- 3D library: Three.js via react-three-fiber + three-forcegraph.
- Authority score: retention proportional to outgoing weight, not a fixed constant; peaked at exactly one disclosed input; the sink-leak mirror-image bug and what it cost.
- Later definition wins when an edge is defined twice.
- The evidence standard: no document, no edge.
- No labels on nodes; nothing about position may assert a hierarchy.
- Arrows point the way influence travels, not the way dependency is recorded.
- Filtering is a view, never a recalculation.
- Cadence is three quantities, and the third lives on the edge.
- Published commercial sources are in, confidential ones are not; non-official nodes get a view toggle; disclosure is a property of the source, not a gap in the research.
- Rejected: confidence as glow; rejected: a confidence weight threshold.
- A node may be a named series, a framework, or a mutual definitional partner; mutual pairs are safe under proportional retention but not neutral.
- Containment is a `part_of` field on the Report and carries no weight (measured: 15.2% double-count avoided); `component_of` refused.
- Isolated nodes are kept and held in a margin — a chain that stops is a finding.
- Termini: `terminal_reason` on the Report for inputs that cannot be publications; `redistributed` not reached for yet.
- Research lands incrementally, one slice per file.

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
