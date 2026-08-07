# Expansion backlog — everything the graph is missing

Working document. Written 2026-07-29 against a graph of 121 reports and 195
dependencies. **Prioritised 2026-07-29** — see *The order*, below. The clusters
and their evidence ratings are unchanged from the first draft; what has been
added is a ranking, the criterion it was ranked by, and a check for each tier.

---

> ## ⚠ Read this first — updated 2026-07-30, after V0.12
>
> **The graph is 133 reports / 213 dependencies.** Every count below written
> against 121/195 or 124/205 is stale; `npm run validate` prints the live one.
>
> **The direction has changed and this document has not caught up.** V0.12 took
> three decisions that reshape what is worth doing:
>
> - **Scope is bounded by documented derivation, not by subject.** Health,
>   environment, justice and education are all in scope now. Clusters below are
>   still written as though the corpus were economic-only.
> - **Isolated nodes are kept**, so "it would be an orphan" is no longer a reason
>   to defer anything.
> - **Termini exist** (`terminal_reason`), so an unpublishable input is a node
>   rather than a `_dropped` note. That converts a large slice of the notes below
>   from dead ends into buildable work.
>
> **The target is 500 nodes.** At the historical research rate that is roughly
> thirty sessions, so throughput — not appetite — is the constraint. See
> *Tier −1*.
>
> **Nothing in Tiers 1–6 should start before Tier −1 is done.** That is a
> deliberate instruction, not a suggestion: the debt listed there is all of the
> kind that gets 3–5× more expensive once the corpus triples, and two items on it
> have already cost incidents.

The ranking is grounded in measurements taken against the loaded graph rather
than read off the cluster descriptions, and **three of those measurements
contradict what this document and V0.7 say about what is outstanding.** Those
corrections are recorded in place rather than quietly fixed, because two of them
had already caused work to be recommended that was in fact already done.

**How to read the ratings.** The constraint on this project is never "is this
real", it is "does a document say so". So each cluster carries an evidence
outlook, and that matters more than how interesting the subject is:

| | |
|---|---|
| **★★★** | A regulation or statute states the formula and names its inputs. These are the edges the graph is built for. |
| **★★** | A methodology annex or funding manual names sources, but you will read a lot to find each one. |
| **★** | The relationship is real and described only in prose. Expect to drop most of it, or record it as `implied`. |
| **✗** | Known dead end. Listed so nobody spends a session rediscovering it. |

A cluster's size estimate is *nodes / edges*, and is a guess.

---

## The strategic picture first

Three observations that should shape the order more than any individual item.

**1. The graph is currently a deep, narrow spike.** It goes four levels down —
international standard → national statistic → provincial formula → municipal
bylaw — in one province, in one policy area, through two municipalities. It is
excellent at proving the premise and useless for comparison. Almost every
interesting question a viewer will ask next is comparative: *is Alberta unusual?
does BC do this differently? what does Ontario's escalator look like?* Right now
the graph cannot answer any of them.

**2. Alberta resource policy is the single richest documented seam available,
and it is half-mined.** Royalty regulations, the bitumen valuation methodology
and the timber dues formula all write their arithmetic into law and name the
price series they use. Nowhere else in this corpus is the evidence this good.

**3. Breadth beats depth for the next few sessions.** A third municipality adds
six nodes to a template already proven twice. A second province adds a whole
axis. Depth is a grind that can be resumed any time; breadth changes what the
graph is *for*.

**4. Added on prioritising: the graph does not currently satisfy its own
evidence standard, and no amount of breadth will fix that.** 27 of 187
documented edges carry no `evidence_url`. All 27 are seed edges; all 160
research-slice edges have one. The standard is enforced perfectly in research and
not at all in the seed set, which means the gap cannot close by accident — every
future batch will be compliant and the hole will stay exactly the same size.

This outranks everything else in this document, because it is not a gap in
coverage but a defect in the part of the graph everything else hangs from. See
*Tier 0*.

---

## What this was ranked by

Stated so the order can be argued with rather than guessed at. Tiers are ranked
by **how much a session changes what the graph can truthfully answer**, subject
to one precondition: *truthfully* comes first. A comparative axis built on top of
edges that fail the evidence standard does not add an axis, it adds reach to a
defect — and makes it harder to find, because the defect is now load-bearing for
more of the picture.

After that precondition, three tie-breakers, in order:

1. **Structural gain over volume.** REPORTS.md already says connectivity beats
   volume. Made numeric here: **40 of 194 documented links are bridges** (removing
   one disconnects the graph) and **31 of 124 nodes are articulation points.** The
   single connected component is real but thin — the periphery is close to a tree.
   Work that lowers those fractions beats work that adds nodes hanging off one
   edge.

   *Re-measured twice in V0.11, three sessions after the V0.8 figures this list
   was built on (40 of 187 and 32 of 121). It moved in both directions in one
   session, which is the most useful thing it has done:*

   | | links | bridges | articulation |
   |---|---|---|---|
   | V0.8 | 187 | 40 (21%) | 32 of 121 (26%) |
   | V0.11, after the IPPI node | 192 | 38 (20%) | 30 of 122 (25%) |
   | V0.11, after Ontario | 194 | **40 (21%)** | 31 of 124 (25%) |

   *The IPPI added three links and **zero** bridges — it thickened the graph. The
   two Ontario edges are **both bridges**, so the fraction went straight back up.
   That is this criterion firing on the first thing added after it was
   re-measured, and the rule below is not rhetorical: **do not add more Ontario
   until Ontario is bridged.** Ontario currently hangs off the corpus by a single
   edge, and that edge rests on one clause in an appendix definition.*

   *One thing about the denominator, stated once: it counts **undirected links**,
   so the graph's two mutual pairs collapse to one link each and 196 documented
   edges make 194 links. Comparing against V0.8's 187 is legitimate because there
   were no cycles then; comparing a future directed count against it would not be.*
2. **Evidence outlook**, exactly as the ★ ratings already record it.
3. **Whether it opens a question the graph currently cannot be asked.**

Interest is deliberately not a criterion. It is what deferred rollup 1 twice.

---

## The order

| Tier | What | Why here |
|---|---|---|
| **−1** | **The debt audit** | Everything that gets 3–5× more expensive after the corpus triples. Added V0.12. Gates everything, including Tier 0. |
| **0** | Evidence-standard repair | The graph fails its own most important rule. 0a and 0c done; 8 seed edges left. |
| **1** | Cheap structural wins already in the corpus | Evidence already found and written down; only the node or the edge is missing. |
| **2** | **B** — interprovincial, Equalization first | The axis change. Biggest single gain in what can be asked. |
| **3** | **D** + **K** — the cross-border layer | Measured: zero standard-compliant direct official CA↔US edges exist. |
| **4** | **E**, **F**, and the carbon half of **C** | ★★★ arithmetic landing on nodes already present. |
| **5** | **A** (charter cities only), **G**, **I**, **L** | Replication, or thin evidence, or both. |
| **6** | **J** | ★. Mostly process, which is not what an edge is. |

Legibility is checked *after each tier*, not saved for a polish session — see
*Cross-cutting*.

### Tier −1 — the debt audit. Do this first, in full, before any expansion.

**Added 2026-07-30 at Thomas's instruction, and it outranks Tier 0.** The whole
of this tier is work that is cheap now and expensive later, and the reason it is
a tier rather than a list is that "we will get to it" has now failed on six
separate items across four sessions each.

The test for membership is one question: **does this get harder as the corpus
grows?** If yes it is here. If it merely stays the same size, it is not.

**−1a. `programme_id`, and a validator rule on it.** *Highest priority in this
tier; it has already cost two incidents.* The loader cannot see the same
programme under two ids. It has happened twice, both Statistics Canada records —
`statcan-hfce` against `statcan-national-accounts` (IMDB 1901, caught V0.10) and
`statcan-supply-use-tables` against `statcan-sut` (IMDB 1401, caught V0.11) — and
**both were caught by a human noticing, not by anything in the code.**

URL equality does not fix it and must not be attempted: **six groups of nodes
currently share a URL and all six are legitimate** (the FOMC statement and the
SEP share a calendar page; three Bank of Canada rates share one rates page; four
municipal budget-and-statements pairs share a landing page), while both real
duplicates had *different* URLs for the same record. So the check has to be on a
programme identifier — `statcan-imdb:1901`, `cihi:nhex`, `bls:cpi`.

Backfill is small now: **4 of 133 nodes carry an IMDB URL at all**, and perhaps
twenty have a discoverable record number. After an IMDB sweep it is a session.
It also makes `part_of` machine-checkable, which it currently is not.

**−1b. Re-audit `_dropped` and rebuild the lead list.** It is **134 notes, of
which 46 are research leads.** Three documents — this one, REPORTS.md and V2.10 —
say 12, which was true at V0.8 and has not been re-counted since. That is a
fourfold understatement of the cheapest work in the project, and it has been
quietly steering priorities for four sessions.

The audit is not just a re-count. Three things need doing:

- **Re-read the leads against the V0.12 rules.** Some `no-document` and every
  `unpublishable-source` note is now a *terminus node*, not a dead end — 20
  `unpublishable-source` and 23 `no-document` entries need re-reading with
  `terminal_reason` in hand. Three were converted in V0.12; the rest were not.
- **Resolve the classifications V0.9 flagged and V0.10 deliberately left**: two
  `_dropped` classifications are probably wrong and four of ten `denied` entries
  were judged borderline on a spot-check. Reclassifying moves nodes in and out of
  the disclosure-ratio denominator, so it must happen before that ships.
- **Promote what survives into this document**, so the lead list stops living in
  a JSON field nothing reads for planning.

**−1c. Build the two features that have been decided and not built.** Both are
four logs old, neither is blocked, and both get worse with scale rather than
better.

- **`determination` (`formulaic` | `discretionary`)** plus a backfill across 133
  nodes. The claim that most nodes are obvious to classify is **still an
  expectation, because it has not been attempted on a single node.** Do it before
  the interprovincial material lands, which is largely statutory formulas.
- **The disclosure ratio in the hover card**, with "not asked" visibly distinct
  from "asked and clean". **This one has a deadline rather than a preference:** a
  high-volume sweep adds nodes faster than it adds `_dropped` notes about them,
  so shipping the ratio after the sweep means shipping it into a graph where it
  is mostly null and reads as broken.

**−1d. Glob-import the research slices.** `src/data/index.ts` hand-lists 26
imports twice each. Vite supports glob import; this is minutes now and is a
guaranteed merge-conflict surface once slices arrive in batches.

**−1e. Fix the stale numbers in this document.** The cluster sizes and the
measurement baseline at the foot were written against 121/195. Several tier
checks read against numbers that have since moved in both directions. A criterion
measured against a stale baseline is not a criterion.

**−1f. Take one pass at the renderer's small observed defects**, all of which are
recorded and none of which is hard: no reset-camera button, drop lines falling to
a floor that is no longer drawn, focus dimming weaker than the code believes
(`DIM_NODE_OPACITY` 0.34 under bloom), and four Canadian shades never judged on a
real display. The reset button goes first because it is the one that most affects
being able to *do* a legibility check.

**Explicitly NOT in this tier, and the reasoning matters:**

- **The 8 unevidenced seed edges.** They stay in Tier 0. They do not get harder
  with scale — they are the same eight edges at 500 nodes as at 133 — and V0.12
  measured that they are *structurally load-bearing*: removing them takes bridges
  from 40 of 194 to 43 of 186. They need a research budget, not a gate.
- **`via` for redistributors.** One known instance. Add the field when there is a
  second.
- **`last_updated` and milestone 3.** Genuinely independent of scale, and on its
  own track. It has been open since V0.1 and one more session will not change
  that.

**Check when done:** `programme_id` on every node that has one and a validator
rule that fires on a doctored duplicate; a `_dropped` lead count this document
agrees with; `determination` on every node; the disclosure ratio drawn; and a
screenshot taken after.

### Tier 0 — make the graph true to its own standard

**Status 2026-07-30: 0a and 0c are done. 0b is the only live item and it is down
to 8 edges from 27.** The text below is kept because the reasoning still applies
to the eight.

Nothing new is researched until this is done. Three items, all small, all
measured:

**0a. Take the duplicate-edge decision, in favour of the later definition.**
REPORTS.md has this recorded as open with the observation that the seed edges are
"uniformly worse evidenced". That is now confirmed at full strength: **all six
duplicates resolve to the seed copy, and in all six the losing research copy has
an `evidence_url` while the winning seed copy does not.** One pair also disagrees
on `relationship_type` — `bea-pce -> bls-cpi` is `uses_data_from` in the seed and
`calculated_from` in research — so this is affecting authority, not just
metadata.

Measured impact of switching: **the ranking barely moves.** Top four unchanged, 3
of 117 nodes change rank position, US CPI +0.005, PCE −0.027. Given that four
sessions of ranking stability is something V0.7 explicitly values, the fact that
this fix does not disturb it is the argument for doing it immediately rather than
carefully.

**0b. Resolve the remaining 21 seed edges — backfill `evidence_url`, or remove
them.** They are concentrated in the monetary-policy core — `boc-policy-rate`,
`boc-mpr`, `fed-fomc-statement`, `fed-sep`, `bea-gdp`,
`statcan-national-accounts` — and most of the documents are not obscure: the
inflation-control target agreement, the MPR itself, the FOMC statement, H.15's own
page.

**"Backfill" is not the only permitted outcome, and pretending otherwise would
invert the standard.** Some of these will turn out to have no document behind
them, and the rule is that the edge then does not exist. REPORTS.md already lists
"delete the seed edges research has superseded" as a live option. The obvious
candidate is `fed-fomc-statement -> bls-cpi`, whose basis reads "CPI inflation is
referenced as context even though the target is PCE-based" — which concedes the
FOMC statement may not cite CPI at all. An edge whose own basis field hedges is
not one to go looking for a URL to justify.

Expect some to become `implied` rather than documented or deleted. That is the
kind exists for exactly this.

Do them in order of structural effect, which is very uneven:

- `boc-policy-rate -> statcan-cpi` — **one URL reconnects a five-node island**
  (policy rate, Bank Rate, prime, CORRA, term CORRA).
- `boc-mpr`'s four edges and `fed-h15 -> fed-fomc-statement` — **rescues two
  nodes that otherwise do not exist** under the standard.
- The rest are ordinary compliance.

**0c. Garbage-collect `_dropped`.** Entries are not removed when the edge is
later built, and this has already misled two documents. There are 61 entries, not
the ~55 estimated below. Two are stale, one of them a live contradiction:
`bea-gdp -> bea-pce` **exists as a documented edge with no `evidence_url`**,
while a `_dropped` note in the same corpus rejects it on the grounds that "no BEA
document read this pass states the dependency as a source-data relationship in
the way the evidence standard wants." One of those two is wrong and the corpus
should not assert both. The eight edges V0.7 promoted to `implied` also left their
`_dropped` notes in place.

That same note raises a question the data model has not answered and should:
**is a definitional identity inside one accounting system the same kind of edge as
one release consuming another?** PCE is a *component of* GDP, not an input GDP went
and fetched. The graph currently has one relationship vocabulary for both. Worth
deciding before the national-accounts and input–output material in **H** arrives,
because that cluster is mostly this shape and will multiply whichever answer is
in force. A candidate answer, not yet argued: within-system structure is
`calculated_from` and genuinely needs no external URL, because the defining
document *is* the release's own methodology — in which case the standard needs to
say so explicitly rather than leaving 27 edges looking like violations.

**Check when done:** under documented-plus-`evidence_url` only, the graph is
**one component with no orphans**. It is currently **three components (106 / 5 /
4) with six nodes dropping out entirely** — including the FOMC Statement, the
Monetary Policy Report, the Summary of Economic Projections, H.15, PCE and the
CPP YMPE. Step 0a alone takes that to two components and two lost nodes, which is
how the effort splits.

### Tier 1 — the wins already sitting in the corpus

Evidence already found, written down, and then not acted on. Cheapest work
available and it lowers the bridge fraction rather than raising it.

**Corrections first, because two of these are already done:**

- ⚠️ **The Survey of Household Spending edge exists.** This document calls it
  "the most obvious missing edge in the entire graph" under **H**, and V0.7's
  recommended next steps list it as a cheap win. Both are stale. `statcan-shs` is
  a node and carries three edges. It was also built *better* than proposed here:
  the primary is `statcan-cpi -> statcan-hfce` (`calculated_from`) with SHS as a
  `uses_data_from` supplement, which is what the basket-update paper actually
  says, rather than the mirror-of-the-CE-survey framing suggested below.
- ⚠️ **Alberta timber dues remains valid** and is still the best value-per-effort
  single item, as **C** claims.

**Then the `_dropped` leads where the evidence is described as strong and only a
node is missing.** These are not rejections and should stop being filed next to
them:

- `bea-pce -> uscensus-retail-and-services-surveys` — the NIPA Handbook names
  four Census surveys; the note says "better documented than most edges in this
  file", dropped only for slice balance.
- `us-basel-implementation -> bis-basel-framework` — dropped as "not read this
  session", not as absent. The Fed maintains its own Basel framework page.
- `gp-budget -> canada-community-building-fund` — named in the budget at
  $5,160,000, no node behind it.
- `gp-tax-rate-bylaw -> grande-spirit-foundation-requisition` — $1,030,421,
  documented in the bylaw.
- `cihi-nhex -> provincial public accounts` — explicitly documented, no node.
- `ei-actuarial-report-premium-rate -> Finance Canada projections` — s. 4.2.2 is
  explicit.
- `bls-employment-situation -> uscensus-population-estimates` — CPS controlled to
  independent population estimates.
- `irs-annual-inflation-adjustments -> hhs-poverty-guidelines` — the s. 36B
  premium tax credit.

**And the Equalization node, which is the best-value item in this tier.**
`fiscal-equalization-program` **already exists and hangs by a single edge**
(`-> statcan-population-estimates`), making it an articulation-point leaf. The
FPFAA and its Regulations name the four Representative Tax System bases with
defined StatCan sources, so this is several documented edges onto a node already
present. It also converts the hub that all of Tier 2 attaches to from a leaf into
a hub — which is why it belongs here and not in B.

**Check when done:** bridge-edge fraction falls below the current 40/194 (21%).
If a tier adds nodes and the bridge fraction *rises*, the tier added territory
rather than structure, and that is the signal to stop and bridge instead.

### Tier 2 — B, and why Equalization goes first inside it

Order within B matters more than the order of B itself. **Equalization before the
individual provinces.** It is the one document that connects every province to
the same handful of national statistics, so building it first means each province
lands on existing structure; building it last means assembling a row of parallel
islands and then bridging them. This is REPORTS.md's "put the full list of
existing node ids in every prompt" rule applied at cluster scale — the failure
mode is identical, just larger.

Then **minimum wage indexation** (★★★, several provinces index to CPI by
regulation with a stated reference period, landing on a node already present),
then the provincial parallels in the table below, then **Quebec last** — most
informative, most work, and the only one whose chains do not simply parallel the
others.

**Check when done:** the component count stays at 1 *without* relying on implied
edges, and the Alberta escalator has enough sibling nodes that "is Alberta
unusual" is answerable from the graph rather than from prose.

### Tier 3 — D and K, the cross-border layer

Promoted above E and F on a measurement. V0.7 observed that the two national
systems "connect mainly through shared standards rather than directly." Stronger
than that: **there are five direct CA↔US edges, three of which point at the NYMEX
commercial node, and the other two — `boc-mpr -> fed-fomc-statement` and
`boc-mpr -> bea-gdp` — are both in the unevidenced seed set.** So under the
project's own standard the count of direct official cross-border edges is
**zero**, and the only standard-compliant link between the two national systems
is a futures price.

D's **softwood lumber duties** (a US regulatory determination upstream of
Canadian forestry revenue) and the **Canada–US merchandise trade data exchange**
(each country using the other's import data for its own exports) are the only
items anywhere in this backlog that would create real ones. K's **FMAP** fixes
the complementary asymmetry: Canada has four jurisdiction levels in the graph and
the US has two, federal and institutional, with no formula layer at all.

**Check when done:** direct official standard-compliant CA↔US edges > 0.

### Tiers 4–6

Unchanged in content from the cluster descriptions below; the ranking reflects
evidence outlook and how much each opens up.

**Tier 4** — **E** and **F** are ★★★ or near it and land on existing nodes; F's
Market Basket Measure is a legislated foundational node the graph lacks
entirely. The **carbon half of C** comes here rather than with the rest of C
because the IPCC Guidelines → National Inventory Report edge is the same shape as
the SNA 2008 edge already in the graph, and the federal/provincial equivalency
test is a rare case of one policy explicitly measured against another.

**Tier 5** — **A** is ★★★ but is mostly replication of a template already proven
twice, and this document's own *What I would not do* warns off the bulk of it.
Take Calgary and Edmonton only, and take them for the charter-city question —
whether charter cities cite *different* inputs — because that is the only part
that is a structural finding rather than a bigger version of the same one.
**G**, **I** and **L** are ★–★★ with known dead ends.

**Tier 6** — **J**, at ★, where permitting is mostly process. The National
Building Code → Alberta Building Code adoption chain is the exception and can be
picked up opportunistically.

---

## A. Alberta municipal — the fan-out

**Size: 60–100 nodes / 150–250 edges. Evidence ★★★. → Tier 5, charter cities
only.** ★★★ but largely replication; the charter-city contrast is the part worth
having.

The template is proven at n=2 and the keystone document is the tax rate bylaw,
which by statute must name the assessment it levies against and every
requisition it collects for someone else.

**Calgary and Edmonton first, and not only because they are big.** Both operate
under *City Charters* (Municipal Government (City Charters) Regulation), which
gives them powers and reporting obligations the MGA does not give Grande
Prairie. If the charter cities' documents cite different inputs, that is a
structural finding, not a bigger version of the same finding. Each brings the
six-document set plus multi-year business plans and, for Calgary, a separate
tax-shift methodology after the downtown office devaluation — which is one of
the most consequential municipal finance stories in the country and is
documented in council reports.

Then, in rough order of what they add rather than population:

- **Wood Buffalo (RM).** Overwhelmingly linear and industrial assessment; the
  clearest case in the province of a municipality whose tax base is set by
  provincial Minister's Guidelines rather than by a market.
- **Strathcona County, Sturgeon County.** Refinery row — industrial assessment
  against provincial energy policy.
- **Lethbridge, Red Deer, Medicine Hat.** Mid-size cities; Medicine Hat is
  unique in owning its own gas and electric utility, which puts a municipal
  budget downstream of commodity prices.
- **Banff and Jasper.** Improvement districts inside national parks — federal
  land, municipal services, a genuinely odd funding path.
- **Regional boards.** Calgary Metropolitan Region Board and Edmonton
  Metropolitan Region Board growth and servicing plans, which municipalities are
  statutorily obliged to align with.
- **Regional services commissions** — water, waste — whose requisitions appear
  by name in member bylaws.

**Watch for:** the disclosure asymmetry already found between the city and
county of Grande Prairie. Expect the same edge to be available in one
municipality and not its neighbour, and expect that to be about wording.

---

## B. Interprovincial — the missing axis

**Size: 80–150 nodes / 200–350 edges. Evidence ★★–★★★. → Tier 2. Equalization
first, Quebec last.** The Equalization node already exists as a single-edge leaf;
building its RTS edges is Tier 1 work and turns it into the hub the rest of this
cluster attaches to.

This is the biggest single change in what the graph can answer, because it turns
every existing Alberta chain into a comparison.

**The federal transfer machinery** (partly present, mostly not):

- **Equalization** — the formula is in the *Federal-Provincial Fiscal
  Arrangements Act* and Regulations, and it names the Representative Tax System
  bases explicitly: personal income, business income, consumption, and property
  tax bases, each with a defined StatCan source. ★★★, and it connects every
  province to the same handful of national statistics.
- **Territorial Formula Financing** — different formula, gross expenditure base.
- **Fiscal Stabilization** — triggered by a revenue decline threshold; Alberta
  has claimed it.
- **Canada Community-Building Fund** — already flagged in `_dropped` as a real
  municipal input with no node behind it. Per-capita allocation, documented.
- **Bilateral agreements**: Early Learning and Child Care, Labour Market
  Development, Canada Housing Benefit, Investing in Canada Infrastructure.
  Each names allocation bases, usually population or LFS-derived.

**Provincial equivalents of what Alberta already has.** Each of these is a
parallel to an existing node and makes it comparable:

| Alberta node in graph | The comparison to build |
|---|---|
| Alberta escalator (2% cap) | Every province's income tax indexation — several are uncapped, some are frozen |
| AISH | ODSP (Ontario), PWD (BC), AISH equivalents in each province |
| Alberta Seniors Benefit | Provincial senior supplements |
| Alberta Child and Family Benefit | Provincial child benefits — most stack on the CCB |
| Fiscal Plan | Every provincial budget and its economic assumptions |
| Education property tax requisition | Provincial education funding formulas |

**Quebec is a special case and worth doing deliberately.** QPP rather than CPP,
its own income tax system, its own statistical agency (Institut de la
statistique du Québec), its own family allowance. It is the one province whose
chains do not simply parallel the others, which makes it the most informative
single addition and the most work.

**Minimum wages** deserve a mention on their own: several provinces index to
CPI by regulation with a stated reference period. That is a clean set of ★★★
edges landing on a node already in the graph.

---

## C. Resource and energy policy

**Size: 60–90 nodes / 120–200 edges. Evidence ★★★ for royalties, ★ for most
policy. → Split: timber dues Tier 1, carbon pricing Tier 4, the rest Tier 5.**
Splitting it because the cluster's evidence range is wider than any other here,
and taking it as one unit means the ★ policy material rides in on the ★★★
royalty material. Note that most of C deepens the Alberta spike, which is the
problem observation 1 names.

The richest seam, and the one where "policy" is actually arithmetic.

**Royalties and tenure** (partly present):

- Conventional oil and gas royalty regulations beyond the Modernized Royalty
  Framework already in the graph — the Natural Gas Royalty Regulation, the
  Petroleum Royalty Regulation, and the C\* drilling-and-completion cost
  allowance formulas.
- **Crown mineral rights auctions** — Public Lands Act tenure sales, published
  results, a real revenue line.
- **Emerging minerals**: Alberta's lithium and brine royalty framework, coal
  royalty, and the metallic and industrial minerals regime. New enough that the
  regulations are clean and recent.
- **Orphan Well Association levy** — the levy formula is set against industry
  liability, and the AER's Licensee Liability Rating and Directive 088
  Licensee Life-cycle Management define the inputs. A genuinely fascinating
  chain: an environmental liability rating driving an industry-wide charge.

**Carbon pricing** — real formulas, and currently absent entirely:

- **TIER** (Technology Innovation and Emissions Reduction) — facility benchmarks,
  high-performance benchmarks, credit prices, the fund price schedule.
- **Federal carbon pricing benchmark and OBPS** — the equivalency test that
  decides whether a provincial system stands in for the federal one is
  documented and is a rare example of one policy explicitly measured against
  another.
- **National Inventory Report** and the Greenhouse Gas Reporting Program, whose
  methodology cites the **IPCC Guidelines for National Greenhouse Gas
  Inventories** — an international-standard edge of exactly the kind the graph
  already has for SNA 2008.
- Clean Fuel Regulations credit market.

**Electricity**, which is a whole sub-graph:

- AESO pool price, the Rate of Last Resort, and the AUC's tariff decisions.
- Transmission and distribution tariffs are cost-of-service filings that name
  their inputs in detail. ★★★ but very long documents.

**Forestry.** Alberta timber dues are calculated from published lumber price
indices by formula in the Timber Management Regulation. A short, clean,
completely documented chain from a commodity price to provincial revenue —
probably the single best value-per-effort item in this whole document.

**Agriculture.** AgriStability and AgriInvest have published formulas; crop
insurance premiums through AFSC rest on yield and price data.

---

## D. Trade and supply management

**Size: 40–70 nodes / 80–150 edges. Evidence ★★★ for dairy, ★★ for trade.
→ Tier 3.** Promoted for the softwood lumber and Canada–US data exchange edges,
which are the only proposed items that would give the graph a documented direct
official cross-border dependency. Dairy is the ★★★ anchor and lands on the CPI.

You named dairy quotas and you were right to — it is the best-documented
supply-managed system in the country.

- **Canadian Dairy Commission support price.** Set annually from a cost-of-
  production survey blended with the CPI, on a published formula and a stated
  reference period. It then flows into provincial pooling arrangements (the P5
  and Western Milk Pool) and into class prices. ★★★ throughout, and it lands on
  the CPI, which is already the second-highest-authority node in the graph.
- **Chicken, egg, turkey and hatching egg agencies** — allocation formulas and
  national allocation agreements.
- **CUSMA / CPTPP / CETA tariff rate quotas** — allocation methods are published
  notices from Global Affairs, and they name the base data.
- **Softwood lumber duties** — US Commerce anti-dumping and countervailing rates,
  recalculated in administrative reviews. A US regulatory determination sitting
  directly upstream of Canadian forestry revenue.
- **Customs Tariff and the Canadian International Trade Tribunal.**
- Trade statistics: Canadian International Merchandise Trade, and the
  Canada–US data exchange, where each country uses the other's import data for
  its own exports. That reciprocal arrangement is documented and is a
  structurally unusual edge — two national statistical systems consuming each
  other.

---

## E. Taxation beyond indexation

**Size: 40–60 nodes / 100–160 edges. Evidence ★★★. → Tier 4.** The
cross-provincial property assessment item (BC Assessment, MPAC) doubles as Tier 2
work and can travel with it.

Tax law is written as arithmetic, which makes this reliable rather than exciting.

- **Alberta fuel tax relief** — the rate is set by a schedule keyed to the WTI
  price. A provincial tax rate that moves with a New York futures contract, and
  it connects to a node already in the graph.
- **Excise duties on alcohol** — indexed to CPI annually on April 1 by the
  Excise Act, 2001. Clean ★★★.
- **Tobacco and vaping duties**, similarly indexed.
- **GST/HST credit**, and the provincial credits that ride on the same return.
- **Canada Carbon Rebate** amounts and their rural supplement.
- **Corporate rates, the small business limit** and its phase-out against taxable
  capital.
- **Property assessment across provinces** — BC Assessment, MPAC in Ontario.
  Both are arm's-length agencies with published methodology, unlike Alberta's
  municipality-by-municipality approach. A real structural contrast.

---

## F. Social policy and the poverty line

**Size: 40–70 nodes / 90–160 edges. Evidence ★★. → Tier 4, but the Market Basket
Measure alone is Tier 1.** The MBM is legislated, foundational, and entirely
absent; it does not belong in a ★★ cluster and should not wait for one.

- **The Market Basket Measure** is Canada's official poverty line, defined in
  legislation by the *Poverty Reduction Act*, and rebased periodically against a
  documented basket. It is a foundational node the graph is currently missing
  entirely, and a great deal hangs off it.
- **Canada Student Grants and Loans** — thresholds indexed, provincial aid
  stacked on top.
- **Old Age Security recovery tax, GIS thresholds** — partly present.
- **Provincial disability and income assistance** — see the interprovincial
  section; this is where the comparison bites hardest.
- **Rent supplements and the Canada Housing Benefit** — usually defined against
  CMHC market rent data, which is a documented statistical input.

---

## G. Health, education, and the institutional layer

**Size: 50–80 nodes / 100–180 edges. Evidence ★–★★. → Tier 5.** Two exceptions
worth taking early: the tuition regulation's CPI cap (★★★ onto an existing node)
and PMPRB's international price comparison basket, which is a documented
cross-border edge and therefore Tier 3 material.

- **Drug pricing**: PMPRB guidelines, the pan-Canadian Pharmaceutical Alliance,
  and provincial drug benefit lists. PMPRB explicitly uses an international
  price comparison basket — a documented cross-border edge.
- **Physician compensation**: the Alberta Medical Association agreement and the
  Schedule of Medical Benefits, which is a published price list for every
  insured service.
- **Post-secondary**: Alberta's tuition regulation caps increases at CPI, which
  is a ★★★ edge onto a node already present. Investment Management Agreements
  set institutional grants against performance metrics.
- **Large school authorities**: Calgary Board of Education and Edmonton Public
  are each larger than many municipalities and publish the same document set as
  GPPSD.
- ✗ **Expect Issuu.** Post-secondary annual reports are frequently published
  only through page-flipping viewers with no extractable text. Budget for a low
  hit rate here; this is a known corpus fact, not bad luck.

---

## H. Statistical foundations still missing

**Size: 30–50 nodes / 80–150 edges. Evidence ★★★. → Tier 1 for what remains.**

These are cheap, high-authority, and make everything else connect better — which
is why they lead the tiers rather than the big expansion clusters.

- ⚠️ **Survey of Household Spending — DONE, and this entry was wrong.** Struck
  rather than deleted, because it was the headline item of this section and was
  repeated as a cheap win in V0.7's recommended next steps; anyone working from
  either document would have gone looking for it. `statcan-shs` is a node with
  three edges. It was also built more accurately than described here: the primary
  edge is `statcan-cpi -> statcan-hfce` (`calculated_from`), with SHS attached as
  a `uses_data_from` supplement providing lower-level and geographic expenditure
  detail. That is what the 2026 basket-update paper says. The "mirrors the US CE
  Survey" framing asserted a parallel that the Canadian methodology does not
  actually have — the US CPI *is* `calculated_from` the CE Survey, but the
  Canadian CPI reweights from HFCE and only supplements from SHS.

  The lesson is the `_dropped` one in Tier 0c: this entry was written off a
  `_dropped` note reading "not researched this slice", the edge was researched in
  a later slice, and nothing removed either the note or this line.
- **New Housing Price Index, Residential Property Price Index.**
- **Industrial Product Price Index, Raw Materials Price Index.**
- **Job Vacancy and Wage Survey, Canadian Income Survey.**
- **Building permits, investment in building construction.**
- **Input–output tables**, which sit under the national accounts and under
  almost every economic impact study anyone cites.
- **Census of Agriculture.**
- **Balance of payments** and its BPM6 dependency, already half-present.

---

## I. Monetary, financial and regulatory

**Size: 30–50 nodes / 60–120 edges. Evidence ★★. → Tier 5.** Note that Tier 0b
lands squarely in this territory: the monetary-policy core is where all 21
remaining unevidenced seed edges live, and the Bank of Canada rate corridor is
currently a five-node island under the strict standard. Repair before expansion
here specifically.

- **Government of Canada Debt Management Strategy and Report** — borrowing
  program against fiscal projections.
- **Provincial borrowing programs and credit ratings.** Rating agency
  methodologies are published, proprietary, and now expressible: they are exactly
  the `commercial` source kind added in V0.5.
- **Payments Canada** settlement systems.
- **PSAB / IFRS standards** — partly present through PSAS; the accounting
  standard under a set of financial statements is a real methodology edge.
- **CMHC market rent and housing starts** — feed both the Housing Benefit and
  the CPI shelter component.

---

## J. Permits, licences and environmental process

**Size: 30–50 nodes / 50–100 edges. Evidence ★. → Tier 6.**

You asked about permits, and this is where I would set expectations lowest.
Permitting is mostly *process* — an application, a decision, a condition — and
the graph's edges are about one publication resting on another. Much of this
will not qualify.

What might:

- **AER Directives** as methodology nodes — 006, 011, 067, 088 — which do define
  inputs other documents use.
- **Water allocation** under the Water Act, where the South Saskatchewan River
  Basin is closed to new licences and the allocation registry is published.
- **The National Building Code → Alberta Building Code** adoption chain, which
  is a clean documented standards edge.
- **Federal Impact Assessment Act** project lists and thresholds.

---

## K. United States, beyond statistics

**Size: 30–50 nodes / 60–120 edges. Evidence ★★★. → Tier 3.** Promoted on a
measured asymmetry: the graph holds 39 Canadian federal, 28 provincial, 10
municipal and 8 institutional nodes against 23 US federal and 2 institutional.
The US side has no formula layer and no sub-national layer at all, and V0.7
already reserved a `US:provincial` colour against this.

The US side is currently statistics-only. The formula layer is missing and is
unusually well documented.

- **FMAP** — the federal Medicaid matching rate, computed from a three-year
  average of state per-capita personal income against the national figure. A
  textbook documented formula onto BEA data.
- **CBO baseline and OMB projections.**
- **Social Security Trustees Report**, which sits over the COLA and wage index
  nodes already present.
- **Federal poverty guidelines → programme eligibility**, partly present.
- **State-level anything.** Not started, and the natural mirror to the Canadian
  provincial work.

---

## L. International standards

**Size: 15–25 nodes / 40–80 edges. Evidence ★★. → Tier 5, except the IPCC edge,
which travels with C's carbon work in Tier 4.** Worth remembering that
international bodies are downstream consumers of national statistics, so this
cluster adds *dependents*, not foundations — it will not move the authority
ranking and is not meant to.

- **IPCC Guidelines for National GHG Inventories** → National Inventory Report.
- **OECD Revenue Statistics** — its classification is used by finance ministries.
- **IMF Article IV and the WEO.**
- **UN SDG indicator framework**, which StatCan reports against explicitly.
- ✗ **IMF SDDS Plus** — attempted and dropped: every document stating the
  obligation is IMF-side, and no national methodology says its content or timing
  is governed by it. Do not re-attempt without a national-side source.

---

## Cross-cutting work that is not new data

It competes for the same sessions, so it is placed against the tiers rather than
left as a list to be picked from. Three categories: what **gates** a tier, what
**rides along** with one, and what runs on its **own track**.

### Gating

- ✅ **The retention artifact — DONE in V0.8.** Retention is now proportional to
  outgoing weight, so every disclosing report keeps a flat 50% and authority no
  longer peaks at one vague input. The ranking changed: CPI 1.000, US CPI 0.730,
  Census 0.679, and the weighted and raw rankings now agree at the top. Decision
  and the three rejected alternatives are in REPORTS.md.
- ✅ **The duplicate-edge rule — DONE in V0.8.** Later definition now wins for
  edges, first still wins for reports. Recovered six `evidence_url`s and one
  corrected `relationship_type`; moved 3 of 117 rank positions.
- ✅ **`_dropped` hygiene — DONE in V0.8.** 61 entries audited and restructured:
  typed, with `source`/`target`/`reason`, read by the loader, and checked by the
  validator. Two superseded entries deleted, two stale island notes corrected.
  **12 of the 59 remaining are research leads**, now countable rather than buried
  in prose, and they feed Tier 1.
- **The 21 remaining unevidenced seed edges** → **now the whole of Tier 0.** Six of
  the original 27 were fixed by the duplicate rule. These have no research copy to
  fall back on, so each needs a document found, or the edge deleted, or a demotion
  to `implied`. Start with `boc-policy-rate -> statcan-cpi`, which reconnects a
  five-node island on one URL. Still gates the expansion tiers.

### Rides along

- **Legibility check after every tier**, not saved for a polish session. This is
  the V0.4 → V0.5 lesson applied in advance: the graph grew four times over while
  three visual decisions silently expired, and the logs put the cost at about a
  session of debt per unlooked-at change. A tier is not done until someone has
  looked at the result.
- **Reset-camera button, drop lines, focus dimming.** Small, all answering
  something observed. Too small to schedule; fold into whichever session next
  touches the renderer. The reset button is the one that most affects being able
  to *do* the legibility check, so it goes first of the three.
- **Labels on the top 5–10 nodes.** Take with the first legibility check, since
  orientation is exactly what the check needs.

### Own track

- **`last_updated` is null across all 121 nodes** → and **milestone 3, the pulse
  calendar**, behind it. Every log since V0.1 has recorded this. It is independent
  of every tier above: it blocks a whole milestone, is blocked by nothing, and
  does not compete for the same kind of attention as research. It can be taken
  whenever a session is wanted that is neither corpus work nor renderer work.
  Worth noting the pulse also still runs on publication rate, which REPORTS.md
  establishes is the wrong quantity — transmission is.
- **Domain filter.** The filter layer supports it; there is no UI, and at 17
  domains it needs a design rather than 17 more checkboxes. Deferred with no tier.
- **`determination` on the node** (`formulaic` | `discretionary`), decided in
  REPORTS.md and not implemented. One field plus a backfill across 121 nodes, which
  is judgement work but fast — most nodes are obvious. Do it *before* Tier 2, since
  the interprovincial material is largely statutory formulas and will be quicker to
  classify while the distinction is fresh than retroactively.
- **The disclosure ratio** in the hover card, decided in REPORTS.md and not
  implemented — but **no longer blocked.** `_dropped` is structured and exported as
  `droppedNotes`, so the denominator is now a lookup by `source` rather than a
  parsing job. What remains is the card layout and deciding what to show for a node
  with no dropped notes at all, which is most of them.

### Scale — now with a target

**The target is 500 nodes, set 2026-07-30.** Stated so the throughput problem is
arguable rather than vague.

Research has run at roughly **10 nodes and 17 edges a session** across twelve
sessions. 500 at that rate is about thirty more sessions, so the answer cannot be
"work through the tiers harder". Four sources of nodes that are **not** new
research, and together they cover a large part of the first 200:

| Source | Roughly | Needs |
|---|---|---|
| `_dropped` leads already written down | 46 notes | Nothing new read. The document was read; the node is missing. |
| Termini, now that `terminal_reason` exists | ~40 notes | Nothing new read. Re-reading of existing notes. |
| StatCan IMDB programmes not yet touched | hundreds | One methodology page each. Mechanical. |
| Everything the scope change admits | unknown | New territory, but the same evidence standard. |

Past that it is IMDB sweeps, which are the most mechanical work in the project
and the best candidate for a parallel extraction track.

**What breaks first is legibility, not the maths.** PageRank and the force layout
are untroubled at 500; proportional retention holds at any size. But the default
framing is already recorded as wrong at 122 nodes and the dense centre is already
occluded at read-in zoom, and both get monotonically worse. The two answers on
the table, both decided in principle on 2026-07-30 and neither built:

- **Sub-clusters by community detection on the edge set** — Louvain or label
  propagation, computed from the edges rather than asserted, which is what keeps
  it inside the position rule. Domain tags become a colour or filter overlay on
  top, so the layout says what the documents do and the tags let you check it
  against what was expected.
- **Collapsible clusters.** A cluster collapsed to one node, expandable on click.
  This is the actual scale answer and it is the only proposal that also fixes the
  centre occlusion open since V0.5. The unresolved part is what "size = authority"
  means for a collapsed group — **not a sum**, for the same reason
  `rolledUpAuthority` is a reading aid and not a score.

Boundaries implied by spacing plus a label on hover; no drawn hulls, which in 3D
read as walls and fight the edges.

Nothing has been tested past 133 nodes, and the 24° lens is unproven above that.

The measurement to watch is not the node count but the **bridge fraction**,
currently **40 of 194 documented links (21%)**, alongside **31 of 124 articulation
points (25%)**. Those say the single connected component is thin — much of the
periphery is a tree hanging off a few hubs. If a tier raises the bridge fraction,
it added territory rather than structure, and the corpus guidance is unambiguous
about what to do then: bridge before expanding.

---

## What I would not do

Recorded so it does not keep coming up.

- **Every Alberta municipality.** ~330 of them, and after Calgary, Edmonton and
  three or four contrasting cases the marginal one teaches nothing. Replication
  is a grind that proves a point already proven.
- **Anything where the dependency is only ever described in prose.** The
  `implied` edge kind exists for the handful worth recording; it is not a
  licence to import everything that sounds true.
- **Real-time market data.** Explicitly out of scope in REPORTS.md and still
  right — the graph is about structure, not levels.

---

## Measurement baseline, 2026-07-30 (V0.12) — use this one

Reproduced independently of `npm run validate`, from a second implementation of
the loader and a freshly written Tarjan. The V0.11 structural figures were
confirmed exactly by that second implementation before these were taken.

| Measure | Value |
|---|---|
| Reports / dependencies | **133 / 213** |
| Documented / implied edges | 204 / 9 |
| Documented edges with no `evidence_url` | **8** — unchanged, still unresearched |
| Isolated nodes, kept and shelved | 3 — `fed-h15`, LGFF Operating, `napcs` |
| Termini | 3, all `unpublishable` |
| Commercial nodes | 4 |
| `_dropped` notes | **134, of which 46 are leads** |
| Reference periods stated | 41 of 213 edges (19%) |

Structure, on the documented edge set at 124 nodes / 194 links (taken before this
session's additions, and **the number to re-measure first**):

| | links | bridges | articulation |
|---|---|---|---|
| documented | 194 | 40 (21%) | 31 of 124 (25%) |
| documented **+ `evidence_url`** | 186 | **43 (23%)** | 32 of 124 (26%) |

**The strict figure is the honest one and 23% is the number to track.** The eight
unevidenced seed edges are structurally load-bearing: removing them *creates*
three bridges. Deleting them — one of the three permitted Tier 0 resolutions —
makes the graph thinner as well as smaller.

---

## Measurement baseline, 2026-07-29 (superseded, kept for comparison)

> **Superseded in part by the V0.8 fixes, which happened after this table was
> written.** Current values after the duplicate-edge and `_dropped` work:
> documented edges with no `evidence_url` **21** (was 27); duplicate edges **6,
> now resolving to the better-evidenced copy**; components under documented +
> `evidence_url` **2, sizes 114 / 5, with 2 orphans** (was 3 / 106-5-4 / 6);
> `_dropped` entries **59, of which 12 are research leads** (was 61 with 2 stale).
> The retention change did not alter any count below — it altered the ranking, not
> the graph. Everything else in the table still holds and the tier checks are still
> read against it.

Every number used above, taken against the loaded graph at 121 reports / 195
dependencies so the tier checks can be re-run and compared rather than argued
about. Reproduced independently of `npm run validate` and agreeing with V0.7's
recorded verification on all overlapping figures (121/195, six duplicate edges,
the LGFF orphan, and the top six authority scores).

| Measure | Value |
|---|---|
| Reports / dependencies | 121 / 195 |
| Documented edges | 187 |
| Implied edges | 8 |
| Commercial nodes | 4 (of 121) |
| Edges entering the authority calculation | 181 |
| **Documented edges with no `evidence_url`** | **27 — all seed, 0 from research slices** |
| Duplicate edges | 6, all resolving to the less-evidenced seed copy |
| Components, all edges | 1 |
| Components, documented only | 1 |
| **Components, documented + `evidence_url` only** | **3 — sizes 106 / 5 / 4, with 6 nodes orphaned** |
| Bridge edges | 40 of 187 (21%) — *V0.11: 40 of 194 links (21%)* |
| Articulation points | 32 of 121 (26%) — *V0.11: 31 of 124 (25%)* |
| Direct CA↔US edges | 5 total; 3 to a commercial node, 2 unevidenced |
| **Direct official CA↔US edges meeting the standard** | **0** |
| `_dropped` entries | 61 (2 stale) |
| Nodes by country × level | CA 39/28/10/8 fed/prov/mun/inst · US 23/2 fed/inst · INT 9/2 |

Two of these deserve restating because they are the ones that changed the order:

**The strict-standard split.** Removing edges that fail the project's own stated
evidence rule breaks the graph into three components and drops six nodes out
entirely — the FOMC Statement, the Monetary Policy Report, the Summary of Economic
Projections, H.15, PCE and the CPP YMPE. The Bank of Canada rate corridor becomes
a five-node island and the Social Security chain a four-node island. Taking the
duplicate-edge decision alone (Tier 0a) improves this to two components and two
orphans, which is why it is first.

**Zero standard-compliant direct official cross-border edges.** The two national
statistical systems are joined only through international standards and a NYMEX
futures price. This sharpens V0.7's observation from "mainly through shared
standards" to "entirely", and it is what promoted D and K to Tier 3.
