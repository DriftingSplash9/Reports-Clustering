# G.3.md — New Zealand/SAO galaxy hand-off

Date: 2026-08-06
Governing briefs: `Research.1.md` — §9 amended once this session (an "ANZSIC /
industry classification" block of 4 ids, plus a note on the Cook Islands
quarterly/annual split). §§1-3 and §9 read; the file was **not** reopened cover
to cover. The version discrepancy first recorded in `G.1.md` Corrections 1 is
still unresolved and this session did not resolve it either — see Corrections 1.
`research-input/Grok-Research-Brief-XI.md` read in full for items 25-28.
Predecessor: `G.2.md` (2026-08-06, same day, immediately prior thread).

## Orientation — if you are a new agent, start here

You are picking up a branch that outgrew its own name twice. `G.1.md` mapped New
Zealand. `G.2.md` mapped the three jurisdictions of its Realm, five more
associated states and dependencies on three other metropolitan states, and then
Brazil, turning the branch into a comparative question about what a metropolitan
state exports to the jurisdictions inside its perimeter. **This session did not
extend that frontier.** It worked `G.2.md`'s own priority list: it closed the New
Zealand slice's international edges, built the Australia–New Zealand
classification bridge, split a Cook Islands node, and wrote up the schema
question as a decision document. It is a consolidation session, and the useful
thing it produced besides edges is two corrections to its predecessor's
recommendations.

The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a documented statement that one report uses
another as an input. One rule: if no document says it, the edge does not exist.

Read, in this order:

1. `Research.1.md` (project root) — §§1-11 are general. §9 now carries five
   blocks from this branch.
2. `G.1.md` and `G.2.md`, in full — the New Zealand slice, the method, the Realm
   and associated-states comparison, and Brazil.
3. This file, in full.
4. `notes/SCHEMA-DECISION-relationship-types.md` — new this session, and **no
   longer an open question**. Thomas chose option C mid-session and it was built.
   Read the section at the bottom, *What implementing it actually found*, before
   the rest of the file: the decision was right and its stated premise was wrong,
   and the correction is the more useful half.
5. The slices, in this order: `src/data/research/nz-government-finance.json`,
   `realm-government-finance.json`,
   `associated-states-government-finance.json`, `br-fpm-population.json`, then
   the new `anzsic-industry-classification.json`. Read the `_dropped` arrays —
   the ANZSIC slice's five entries include two corrections and one incidental
   finding that is worth more than one of its edges.
6. `research-input/Grok-Research-Brief-VI.md` through `XI.md` — the research
   protocol and the record of what it cost to develop. Items 25, 27 and 28 of
   `XI` are still open; item 26 was closed by this session directly.

Where things are, as of end of session 2026-08-06 (second thread):

* The corpus grew from 295 to **300 reports** and 347 to **357 dependencies**.
  `npm run check` exits 0. `npm run validate` exits 0 and prints one `✗` that is
  not this branch's — the same pre-existing Montenegro entry `G.2.md` recorded.
  No new isolated nodes.
* Five new nodes: `anzsic`, `isic`, `au-abs-australian-industry`,
  `nz-statsnz-aes`, `ck-national-accounts-quarterly`. One new country in the
  sense that matters: none — `AU`, `NZ`, `CK` and `INT` all already existed. This
  session added no jurisdictions and that was deliberate.
* One new slice file, `anzsic-industry-classification.json`, registered in
  `src/data/index.ts`.
* **A schema change**, the first this branch has made. `RelationType` and
  `Relation` in `src/lib/types.ts`, `relations` assembled and exported from
  `src/data/index.ts`, a `RELATIONS` section in the validator. `buildGraph` is
  untouched and authority is byte-identical across all 300 nodes before and
  after. The corpus holds **one relation**; see Findings 4 for why that number is
  the finding rather than a disappointment.
* `node_modules/` is still a Windows build and `npm run validate` still fails
  instantly in a Linux sandbox with an esbuild platform error. Same workaround as
  `G.2.md`: copy the tree excluding `node_modules` to a scratch directory and
  `npm install` there. Every count above is from that scratch copy; data files
  were edited in place. This has now cost three sessions the same five minutes —
  see Cheap checks.

## Session conditions — read this first

Direct continuation of `G.2.md`, same day. **Extraction and verification only —
no external researcher, no subagents.** Every quote minted this session was
fetched and read by this session, with two flagged exceptions named below. That
is a change from the previous two sessions and it is why this one produced fewer
edges.

**The fetch tooling was materially weaker than the predecessors', and this
constrains what can be trusted from it.** Two routes that `G.1.md` and `G.2.md`
relied on were unavailable:

* **The Wayback `id_` endpoint is blocklisted** for this session's fetch tool. It
  returns HTTP 403 "URL is on blocklist" before reaching the network. That single
  fact removes the workaround this branch used for `legislation.govt.nz`,
  `nzta.govt.nz`, `paclii.org`, `oag.parliament.nz`, `mbie.govt.nz` and
  `portal.tcu.gov.br`. Every one of those domains is now unreachable to a session
  with this toolset.
* **No browser.** The Chrome extension reported zero connected browsers, so the
  escalation path for JavaScript-rendered pages did not exist either.

What still worked, and is worth recording as positive routes:

* `abs.gov.au` serves its classification volumes and methodology pages as
  ordinary server-rendered HTML, chapter by chapter. The whole ANZSIC front
  matter and Introduction read cleanly.
* `unstats.un.org` serves the ISIC landing page directly.
* `stats.gov.ck` is WordPress and serves both the quarterly and annual GDP
  release pages in full, methodology block included.
* `datainfoplus.stats.govt.nz` serves item pages — **but the path is
  case-sensitive on this route**: `/Item/nz.govt.stats/<guid>` returns the page,
  `/item/nz.govt.stats/<guid>` returns zero bytes, as do every `/<revision>` and
  `/ddi` suffix. `G.2.md` recorded the domain as working without recording the
  case; a successor should not lose an hour to this twice.
* `xrb.govt.nz` and `standards.xrb.govt.nz` serve PDFs, but this session's fetch
  tool truncates large PDF extractions — PBE IPSAS 1 truncated at paragraph 137
  of 155 and never reached the appendix that carries the quote.

**Two edges rest on a predecessor's extraction rather than this session's, and
both say so in their `basis` field.** The sandbox from the 2026-08-06 morning
session persisted, so `/tmp/gfsdi.txt` and `/tmp/pbeipsas1.txt` — the minting
session's own byte-level extractions of the DataInfo+ item and the XRB standard —
were still on disk and the quotes were confirmed against them character for
character. That is stronger than trusting a hand-off's transcription and weaker
than a fresh read, and it is labelled as such in both edges. Anyone who can reach
Wayback or a browser should redo both.

Not done, by clock: `Grok-Research-Brief-XI.md` items 25 (Colombia, Chile, Peru),
27 (nineteen unscouted jurisdictions) and 28 (Faroes, Compact budgets), all still
`not_attempted`. Item 26c (ANZSCO) was scoped and deliberately left — see
Findings 2.

## Headline result

**One of the three "free" New Zealand edges `G.2.md` recommended was not free,
and should not be minted.** `G.2.md` item 1 listed `nz-statsnz-gfs -> sna-2008`
alongside two others as verified and ready to build. The sentence it rests on is:

> "In 2018, we implemented the Government Finance Statistics Manual 2014
> (GFSM2014), which follows the GFSM 2001 and is consistent with the System of
> National Accounts 2008 (SNA08)."

The subject of "is consistent with the System of National Accounts 2008" is
GFSM2014, not Stats NZ's release. The sentence documents a relation between two
international manuals and Stats NZ's adoption of one of them. It does not say the
New Zealand release takes SNA 2008 as an input, and "is consistent with" is in
any case weaker than any of the four `relationship_type` values, every one of
which describes an input. Compare the four edges the corpus already holds into
`sna-2008` — `ck-national-accounts`, `statcan-national-accounts`, `bea-gdp`,
`fed-z1` — each of which is a first-person statement by a producer about its own
product.

The other two were free and are built. The count for the session is therefore
**two edges minted from three recommended, and the third recorded as a `note`
drop with the reasoning**, in `nz-government-finance.json`.

That is what the session *established*. What it *built* is larger and belongs to
Thomas rather than to the research: the `audits` / `supersedes` schema question
was put to him mid-session, he chose the parallel unweighted `relations` list, and
it is implemented. Findings 4 — including the part where building it proved the
schema was never the binding constraint.

This is a small result and it is the honest one. It also says something about the
chain: the error was not in the research, which quoted the sentence correctly in
`G.1.md` and `G.2.md`. It was in the reading of a correctly quoted sentence, one
hand-off later, by a session working from its own summary. The verification
discipline this branch applies to external researchers has now caught its own
predecessors twice in two sessions.

## Findings

### 1. The two genuinely free New Zealand edges are built, and New Zealand is no longer an island

**What this rests on:** both quotes confirmed character for character against the
minting session's own extractions, still present in this sandbox at
`/tmp/gfsdi.txt` and `/tmp/pbeipsas1.txt`; neither independently re-fetched, for
the reasons in Session conditions. Flagged in both `basis` fields.

`nz-statsnz-gfs -> imf-gfsm`, `methodology_depends_on`, on the precedent of
`statcan-national-accounts -> imf-gfsm` and `ck-budget-estimates -> imf-gfsm`.
The DataInfo+ item does not stop at the adoption sentence — it states classifica­
tion decisions in GFSM terms three more times ("This is consistent with the GFSM
2014"; "According to the GFSM 2014, net debt includes all financial assets and
liabilities except shares and other equity and financial derivatives";
"Generally, the layout of the tables is consistent with the GFSM 2014
recommendations"), which is what makes it a methodological dependence rather than
a citation.

`nz-pbe-ipsas-1 -> ipsas`, `methodology_depends_on`, matching
`ck-government-financial-statements -> ipsas` and `psab-psas -> ipsas`. The
appendix "Comparison with IPSAS 1" opens "PBE IPSAS 1 Presentation of Financial
Reports is drawn from IPSAS 1 Presentation of Financial Statements." and then
enumerates the departures, which is what distinguishes adoption-with-amendment
from a reference. This session did independently re-fetch the current compiled
standard and confirm the appendix still exists in its contents list, but the PDF
extraction truncated before the appendix body.

### 2. ANZSIC is built, and `G.2.md` was wrong about what building it would achieve

**What this rests on:** everything in this finding was fetched and read by this
session, directly, from `abs.gov.au`, `unstats.un.org` and
`datainfoplus.stats.govt.nz`. No external input, no predecessor extraction.

`G.2.md` item 2 said minting ANZSIC "would tie `AU` and `NZ` together directly".
Minting the node alone would not have. The joint authorship is real and verified —
the Preface reads "The Australian Bureau of Statistics and Statistics New Zealand
jointly developed this classification to improve the comparability of industry
statistics between the two countries and with the rest of the world", signed
"Dennis Trewin / Brian Pink — Australian Statistician / Government Statistician" —
but that is a `publisher` fact, and this corpus draws no edge from an authorship
fact. A classification does not take its own authors as inputs.

So the bridge required two more nodes, and the slice mints four:

* `anzsic` — the corpus's second jointly-owned classification after `naics`, and
  its structural twin.
* `isic` — the UN's classification and the acknowledged parent of ANZSIC and of
  both its predecessors (the 1969 ASIC "was based at the broader levels on the
  ISIC"; the 1970 NZSIC was "based on ISIC, Rev.2"). Its absence was a hole of
  exactly the shape `gasb-standards` filled for the associated-states pass:
  `naics` sat in the corpus with eight inbound edges while the classification
  NAICS is itself aligned to was not represented at all.
* `au-abs-australian-industry` — "Estimates in this release are classified by:
  Industry, in accordance with the Australian and New Zealand Standard Industrial
  Classification (ANZSIC), 2006 edition." ANZSIC also defines the survey's scope
  and its data-splitting thresholds, stated in ANZSIC Divisions with numbers.
* `nz-statsnz-aes` — "Survey designed and published on an ANZSIC06 basis" (2007),
  with the adoption dated to 1998, "replacing the New Zealand Standard Industrial
  Clasification (NZSIC)" [sic, the source's typo].

Four edges: `anzsic -> isic`, `anzsic -> naics`,
`au-abs-australian-industry -> anzsic`, `nz-statsnz-aes -> anzsic`. The
`-> naics` edge is the weaker of the two upward ones and is labelled as such:
NAICS is a peer consulted for comparability, not a parent, though the alignment
is asserted at a named level of the hierarchy ("at the subdivision level as far
as practicable") and used to justify two named Divisions.

**A hazard recorded rather than resolved.** ANZSIC 2006 is designed against a
document that did not exist when it was published — "aligning the classification,
as far as possible, with the **upcoming** revision of the ISIC (Revision 4)" —
and ships correspondences to a different revision again, Rev. 3.1. ISIC is now at
Rev. 5, endorsed 2023. `isic` is therefore modelled as one node across revisions,
on the `naics` convention, with the detail in a `_dropped` note.

**ANZSCO deliberately not attempted.** Item 26c. This session does not know
whether ANZSCO is still jointly maintained, and if it is not, it is not a bridge
node and should not be minted as one. The governance question comes before the
ISCO-parentage question.

### 3. The Cook Islands split is made, and it surfaced ISIC's second and third inbound edges

**What this rests on:** both `stats.gov.ck` release pages fetched and read
directly by this session. The Budget quote is inherited from the minting session
and was not re-extracted; the `basis` says so.

`G.2.md` cheap check 2 asked for `ck-national-accounts` to be split, because the
Budget forecasts from the quarterly series and not the annual one. Done:
`ck-national-accounts-quarterly` is now a node, and
`ck-budget-estimates -> ck-national-accounts-quarterly` carries the model-inputs
quote ("The key data sets used for the model are: • Real and nominal GDP –
quarterly data to June 2025..."). The pre-existing edge to the annual release is
kept and not retargeted, because it rests on a different quote — the generic
source note beneath the Budget's economic tables — and the two together are the
honest picture: the Budget cites the programme and feeds its model from the
quarterly series.

The unplanned part is better. Both Cook Islands release pages state, under their
own bolded heading, "International Standard Industrial Classifications (ISIC Rev
4) – is used to classify the principal economic activity (industry) of
establishments and enterprises", and then set out the three broad groupings —
primary, secondary, tertiary — that the release's own headline commentary is
written in. So `isic`, minted an hour earlier for Australia and New Zealand,
immediately picked up two more inbound edges from an unrelated jurisdiction and
an unrelated pass. **That is the argument for minting parent frameworks even when
one pass needs them: the second user arrives without being looked for.**

**And a caveat that generalises.** The Cook Islands Statistics Office publishes
one methodology block and attaches it, unaltered, to both the quarterly and the
annual release page — and the block is written for the quarterly series ("The
production approach (GDP (P)) is being used to calculate the Cook Islands GDP on
a quarterly basis"; "the methodology of compiling the Cook Islands quarterly GDP
on request"). The consequence is that the two nodes now carry duplicate edges to
`sna-2008` and `isic` which look like two independent disclosures and are one.
Recorded as a note rather than fixed by deleting the annual edges, because the
annual release does publish the claim under its own title. **Anyone computing
disclosure counts should net one of each pair out**, and should expect this shape
wherever a small statistics office runs one boilerplate block across several
releases.

### 4. The schema question was decided, built, and corrected its own premise

**What this rests on:** the decision is Thomas's, taken mid-session on
`notes/SCHEMA-DECISION-relationship-types.md`. Everything after it is this
session's own code and data, verified by a before/after authority snapshot.

The note went to Thomas with four options costed. He chose **C — a parallel,
unweighted `relations` list with its own type union, never passed to
`buildGraph`** — and it was built the same session, data layer and validator
only, no rendering.

The argument that produced option C is worth carrying forward on its own, because
it is the second time it has decided a schema question here. The comment around
`part_of` in `src/lib/types.ts` says containment was made a field on `Report` and
deliberately *not* a `component_of` relationship type, because "`RelationshipType`
is defined as *how one report depends on another* and every value of it feeds
`RELATIONSHIP_WEIGHT`. Containment is not a dependency, and giving it a weight
would convert a bounded 15.2% understatement into an unbounded overstatement."
`audits` fails that test identically — assurance is not an input, and the arrow
arguably points the wrong way for authority flow, since the audit office gains
standing from signing while the statements gain no content from it. A parallel
list has no weight to invent, and `Record<RelationshipType, number>` makes the
invention unavoidable rather than optional if you widen the union instead.

**Then implementing it found that the ontology gap was never the binding
constraint.** Seven documented instances went into the note. **One** came out as a
relation:

```
nu-ag-report-assembly -[audits]-> nu-government-financial-statements
```

The other six are blocked on the node inventory, not the type union. **There is
no node for the auditor.** Tokelau's Finance Rules install the Auditor-General of
New Zealand and the quote is unambiguous, but no Tokelau opinion and no recurring
publication of the New Zealand Auditor-General is a node. FSM, the Marshall
Islands, Palau and Greenland are audited by private firms whose opinions are bound
into the statements they audit — not recurrently published official reports, so
they fail `Research.1.md` §4.2, the same disqualifier that keeps J.D. Power, ICE
Brent and Darroch Limited out of the corpus. **Those four will never be
mintable.** The UKSPF `supersedes` case has no node at either end.

So: **the constraint on representing assurance in this corpus is that a node must
be a recurrently published official report, and auditors mostly are not.** Where a
public audit office publishes recurrently — the Controller and Auditor-General of
New Zealand does, which is the only reason `nu-ag-report-assembly` exists — the
relation is mintable. Where the auditor is a private firm it never will be, and
the honest representation stays what it already was: the three
`-> us-gao-yellow-book` dependencies, which say the statements depend on the
American auditing standard rather than that a named firm audits them. That is a
structural fact about public-sector assurance and is worth more than the six edges
would have been.

The change earned itself anyway, on three grounds that are not the instance count.
It closes a question two hand-off chains had carried for three sessions and that
had been re-written as the same paragraph six times. It converted a blanket `note`
into precise leads that name the missing node and what unblocks each case. And the
one relation minted is the informative one — Niue's is where the appointment runs
the unexpected way, and it demonstrates that a dependency and a relation over the
same pair are different claims, since `nu-ag-report-assembly` both
`uses_data_from` and `audits` the same statements. The validator prints that
overlap on purpose.

**Verification:** `npm run check` clean; a before/after snapshot of `authority`,
`size_score`, `in_degree` and `out_degree` across all 300 nodes to twelve decimal
places is byte-identical. That is the property option C was chosen for and it is
worth re-running after any future change to this list.

## Secondary observations (logged, low priority)

* Two `_dropped` entries were reclassified this session as a consequence of the
  schema decision, and the reclassification is itself informative: the Compact
  states' audits note moved from `note` to `unpublishable-source` (it will never
  be mintable), and the UKSPF note from `note` to `no-node-yet` (it will, once two
  nodes exist). Anything still filed as `note` because "the ontology can't hold
  it" should now be re-read; that reason no longer exists.
* The `_dropped` note is being used for three different things now — dropped
  edges, research leads, and caveats on edges that *were* minted. The validator
  only tolerates the third if `source` and `target` are both `null`; set either
  one to a real id and it raises `✗ note(s) describe an edge that IS in the
  graph`. Cost this session one round trip. Worth a line in `Research.1.md` §2 or
  a dedicated `reason` value.
* `nz-statsnz-aes`'s DataInfo+ metadata is unusually forthcoming about its own
  downstream consumers — it names the national accounts, the Tourism Satellite
  Account, the Non-profit Institutions Satellite Account, Business Price Indexes
  and Regional GDP. That is a producer-side disclosure of five edges. None was
  minted, because the corpus holds no node matching any of the five by release
  title; see `_dropped`. It is the best single starting point for a Stats NZ
  national-accounts pass that this branch has found.
* The AES is designed and published at NZSIOC level 4, not at ANZSIC level —
  "The AES data is to be used with caution below industry design level (NZSIOC
  level 4)". So there is a real two-step NZSIOC → ANZSIC chain that the slice
  does not represent, because nobody has opened NZSIOC's defining document.
* `au-abs-australian-industry` is the first `AU` node in this corpus outside the
  government-finance pass. The AU slice is otherwise entirely fiscal.

## Corrections to prior sessions

1. **`G.1.md` Corrections 1 / `G.2.md` Corrections 1 — confirmed, still open,
   and now carried by four sessions.** `Research.1.md`'s header still reads "v3.0
   (adopted 2026-08-05)" while `EU/G.49.md`, `AU/G.1.md`, `G.1.md` and `G.2.md`
   describe it as v3.3 or v3.4. This session amended §9 once and again did not
   bump the header, for the same reason each predecessor gave: the numbering
   convention is undocumented and guessing makes the drift worse. Four sessions
   is enough. Someone who owns the brief should settle it in one edit, or delete
   the version string.
2. **`G.2.md` "Thomas's stated priority" item 1 — overstated.** It listed three
   edges as verified and free. Two were; the third,
   `nz-statsnz-gfs -> sna-2008`, is not supported by the quote offered for it and
   has been recorded as a `note` drop rather than minted. See Headline result.
   The predecessor's *quotation* was accurate in both `G.1.md` and `G.2.md`; the
   error was in the reading.
3. **`G.2.md` "Thomas's stated priority" item 2 — overstated in the same
   direction.** Minting ANZSIC "would tie `AU` and `NZ` together directly" is not
   true of the node alone, because joint authorship is a publisher attribute and
   carries no edge. The tie required two additional nodes, which this session
   minted. Recorded in the slice's `_dropped` as well as here, because a later
   session reading only the JSON should find it too.
4. **`G.2.md` Session conditions — incomplete rather than wrong.** It recorded
   `datainfoplus.stats.govt.nz` as server-rendered and working, which is true,
   but not that the item path is case-sensitive on at least some fetch routes.
   `/item/...` returns zero bytes where `/Item/...` returns the page.
5. **This session's own `notes/SCHEMA-DECISION-relationship-types.md` — its
   central premise was wrong, corrected in place before the file was handed on.**
   The note argued the six `audits` instances were blocked by the type union.
   Building the change proved they are blocked by the node inventory: six of the
   seven cases have no node for the auditor, and four of those never will, because
   a private audit firm is not a recurrently published official report. The note
   now carries a `What implementing it actually found` section saying so, and the
   original text above it is left unedited on purpose — a decision document that
   quietly rewrites its own premises is worth nothing. Recorded here on the same
   convention `G.2.md` Corrections 3 used for errors a session caught in its own
   live work.
6. **No prior substantive claim was found wrong.** Every finding in `G.1.md` and
   `G.2.md` that this session touched — the New Zealand rating chain, the
   five-answers result, the Cook Islands Budget's use of quarterly GDP, the two
   ANZSIC passages `Grok-Research-Brief-XI.md` says Thomas verified himself —
   checked out. The two ANZSIC passages in particular were re-verified from the
   ABS primary source and are correct as quoted.

## Thomas's stated priority for the remaining work

Still no lettered list for this branch, and `AU/G.1.md`'s open question — whether
the `EU/G.*.md` A-through-G lettering should carry over — now applies to three
branches and has been carried unanswered by four sessions. What follows is this
session's ordering, with `G.2.md`'s items marked as moved, done or dropped.

1. **Mint one node for the New Zealand Auditor-General's recurring reporting, or
   for a Tokelau audit opinion.** New, and it replaces the schema item, which is
   done. This is now the highest-value single lookup in the branch: it is the only
   thing standing between the corpus and the Tokelau half of the export-of-
   institution finding, the schema to hold it exists, and the evidence is already
   quoted and verified in `realm-government-finance.json`. One node, one dependent
   finding, no further research. `oag.parliament.nz` blocks ordinary requests, so
   this needs the browser that item 4 also needs.
2. **`Grok-Research-Brief-XI.md` item 25c — Chile's SII *avalúo fiscal*.** Was
   `G.2.md` item 4 and unchanged: a fourth property-valuation chain from a legal
   tradition unlike the three the corpus holds, and the comparison is the point.
   Items 25a/b/d (Colombia, Chile FCM, Peru FONCOMUN) behind it.
3. **A Stats NZ national-accounts pass, starting from `nz-statsnz-aes`.** New.
   The AES metadata names five downstream products by name and this corpus holds
   none of them. It is the densest un-mined disclosure this branch has found, it
   is on a domain that is reliably fetchable, and it would give
   `nz-statsnz-national-accounts-income` — currently a bare node with one inbound
   edge from the Treasury — something to stand on.
4. **A second exemplar council for New Zealand.** Was `G.2.md` item 5, unchanged
   and unattempted. Wellington carries the PBE IPSAS 1 edge alone, the same
   single-exemplar exposure `EU/G.49.md` flagged for Wolverhampton. Auckland and
   Christchurch both block ordinary requests, and with Wayback unavailable this
   needs a session with a browser.
5. **Item 27 — the nineteen unscouted jurisdictions**, Crown Dependencies first,
   for the reason Brief XI gives: whether Jersey, Guernsey and the Isle of Man
   use the CIPFA Code, IFRS or their own is the same question the Realm and the
   Compact states have now answered five different ways.

**Done and removed from the list:** `G.2.md` items 1 (two of three edges minted,
the third refuted), 2 (ANZSIC bridge built, four nodes and four edges) and 3 (the
schema question, decided by Thomas as option C and built — see Findings 4).

**Deferred deliberately, not forgotten:** rendering relations. Option C's fuller
form put them in the hover card, in search, and in the scene as a distinct
unweighted line style following the `implied` precedent. None was built, because
with one relation in the corpus there is nothing to look at and this session had
no way to see the render. Revisit once item 1 and the UKSPF nodes exist.

## Cheap checks still outstanding

New this session:

1. **Fix `node_modules` or document the scratch-install workaround in the
   README.** Promoted from the bottom of `G.2.md`'s list to the top of this one.
   It has now cost three consecutive sessions the same five minutes, which is the
   definition of the cheapest available win.
2. **Re-fetch the two inherited quotes** — the Stats NZ DataInfo+ GFSM block and
   the PBE IPSAS 1 "Comparison with IPSAS 1" appendix — from their primary
   sources, by a session with Wayback access or a browser. Both are labelled in
   their `basis` fields. Neither is doubted; both are one grade below this
   branch's standard.
3. **Open NZSIOC's defining document** and mint it between `nz-statsnz-aes` and
   `anzsic`. Stats NZ classification pages, unlike release pages, are likely
   fetchable.
4. **Add a `reason` value or a §2 line for caveat-notes** — `_dropped` entries
   that annotate a minted edge rather than record a dropped one. Currently they
   must set `source` and `target` to `null` to pass the validator, which loses the
   information about which edge they annotate.

Carried from `G.2.md`, untouched or blocked:

5. **Re-read Financial Reporting Act 2013 ss.5 and 8 from `legislation.govt.nz`
   directly. STILL NOT DONE, AND NOW HARDER.** This is the hinge of the New
   Zealand slice's headline result — the statutory chain LGA 2002 s.111 → s.5 →
   FRA 2013 s.8 → XRB standards — and it is still the only load-bearing citation
   in that slice resting on a proxy read. This session tried
   `legislation.govt.nz` directly (zero bytes, as documented), the whole-act view
   (zero bytes), NZLII as an independent mirror (zero bytes) and the Wayback
   route (blocklisted). **It needs a browser.** Until then the claim stands where
   `G.1.md` left it: verified by a subagent through a text-extraction proxy, and
   flagged as such in the slice.
6. Mint the Census Annual Survey of State and Local Government Finance, cited by
   title and vintage in Puerto Rico's fiscal plan.
7. Locate the Puerto Rico Planning Board forecasts as a titled recurring release.
8. Find the June 2026 revised Puerto Rico fiscal plan; the Drive ID in the
   research is the 2024 plan.
9. Decode the Wayback replay of the OAG's New Zealand long-term-plan
   observations — gzip binary, never decoded, and now unreachable by this
   toolset.

Carried from `G.1.md`, untouched: all seven of its own items, in particular the
full re-extraction of LGA 2002 Schedule 10 and the current-consolidation check on
s.106(2C).

## What to pass at the start of next thread

If the next agent can read the folder, pass nothing — point it at this file.

1. This file (`NZ/G.3.md`) — paste as text, do not attach.
2. `G.2.md`, `G.1.md` and `AU/G.1.md` — the frontier, the method, and the
   comparison case.
3. `Research.1.md` — §9's five blocks from this branch.
4. `notes/SCHEMA-DECISION-relationship-types.md` — the decision, and the section
   at the bottom recording what building it corrected.
5. The five slices named in Orientation. Read the `_dropped` arrays.
6. `research-input/Grok-Research-Brief-XI.md` — items 25, 27 and 28 are the
   outstanding assignment; item 26 is closed. Briefs VI-X for the protocol and
   its failure history.
7. **A browser.** Non-negotiable for the next round. Without one,
   `legislation.govt.nz`, `nzta.govt.nz`, `paclii.org`, `oag.parliament.nz`,
   `aucklandcouncil.govt.nz`, `ccc.govt.nz` and `portal.tcu.gov.br` are all
   unreachable, and so is the Wayback `id_` fallback that used to substitute for
   them. Three of the five priority items above are blocked on this.
8. The verification rule, which is the whole thing: prefer direct fetch and text
   extraction over any summarising tool for anything that will become a quoted
   `basis` field, and re-read every externally supplied quote against its source
   before minting. **And, as of this session, read the sentence as well as
   fetching it** — the one bad recommendation this session had to refuse came
   from a correctly quoted sentence whose grammatical subject nobody had checked.

# How to write the next hand-off

Adopted 2026-08-06 from the `EU/G.*.md` series (originally added there
2026-08-04), via `AU/G.1.md`. Copy this whole section verbatim into every
successor, so the chain never depends on one file surviving. It is the spec, not
an example.

When Thomas says "write the next handoff", "write the next G file", "wrap this
thread up" or anything close, this is what he is asking for. Do not ask which
format.

Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*`
  file in `NZ/`. This file is `G.3.md`.
* Write it as `.md`, plain text, in `NZ/`.
* Then write the JSON sidecar. Run:

```
python3 scripts/handoff-to-json.py NZ/G.<n>.md

```

The script's default "convert every file with no argument" mode only scans `EU/`
(hardcoded) — always pass the `NZ/G.<n>.md` path explicitly when working in this
branch; the underlying parser and JSON structure are not EU-specific despite the
script's own docstring describing only the EU case. The Markdown stays the
document of record; the JSON is a structured index of it.
* Never edit a predecessor. Corrections to earlier sessions go in this file's
  Corrections section, where they are dated and attributable. The one exception is
  this spec block, which is copied forward unchanged.

Required structure, in this order

```
# G.<n>.md — New Zealand/SAO galaxy hand-off

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
leaving a heading with nothing under it. Corrections and Thomas's stated priority
are never dropped: an empty Corrections section is itself a claim (nothing
earlier was found wrong) and should say that explicitly.

What each section is for

Orientation — carried forward and updated, not rewritten each time. A new agent
must be able to read this section alone and know what to read next. If the folder
layout or the tooling changed, that goes here.

Session conditions — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. State plainly which sources you read in full,
because everything downstream inherits that limit.

Headline result — the single most important thing established, and how strongly.
If the session established nothing, say that; a session that only refutes is
still a result.

Findings — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and what it rests on. Mark any claim that depends on a
predecessor's reading rather than your own. Quote verbatim; `Research.1.md` §2
applies here exactly as it does to research output.

Secondary observations — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

Corrections to prior sessions — numbered, each naming the file and the claim
being corrected, and whether it is confirmed, refuted, overstated or resolved.
This section is the reason the chain is trustworthy. A session that finds a
predecessor wrong and does not record it here has actively damaged the corpus.

Thomas's stated priority for the remaining work — lettered blocks carried forward
from the predecessor, edited to reflect what moved. Mark items no longer needed
explicitly and say why, rather than deleting them silently. This section is what
a new agent reads to answer "what is next".

Cheap checks still outstanding — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

What to pass at the start of next thread — the packing list, for the case where
the next agent has no filesystem access. If it does have access, say so and keep
the list anyway; it doubles as an index of what matters.

Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read
  / not-verified statement. That is what makes the positive claims usable.
* Predictions are logged and then scored. Say explicitly whether a prediction
  landed, in later files too.
* Distinguish inference from documented fact, and say which narrow respect is
  still inference.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
* Do not pad. These files are dense because every line earns its place.
