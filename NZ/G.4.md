# G.4.md — New Zealand/SAO galaxy hand-off

Date: 2026-08-06
Governing briefs: `Research.1.md` — §§1-3 and §9 read, not reopened cover to cover, and NOT amended this session. The version discrepancy first recorded in `G.1.md` Corrections 1 is still unresolved and this session did not resolve it either; it is now carried by five sessions. See Corrections 1.
Predecessor: `G.3.md` (2026-08-06, same day, immediately prior thread).

## Orientation — if you are a new agent, start here

You are picking up a branch that outgrew its own name twice and has since been
consolidating. `G.1.md` mapped New Zealand. `G.2.md` mapped the three
jurisdictions of its Realm, five more associated states, dependencies on three
other metropolitan states, and Brazil, turning the branch into a comparative
question about what a metropolitan state exports to the jurisdictions inside its
perimeter. `G.3.md` closed the New Zealand slice's international edges, built the
Australia–New Zealand classification bridge, split a Cook Islands node, and put
the `audits` / `supersedes` schema question to Thomas, who chose a parallel
unweighted `relations` list; it was built the same session.

This session did one thing and did it properly: it got a browser, and spent it on
the two items every predecessor had been blocked on. It is the shortest session
in the branch by output and the least hedged.

The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a documented statement that one report uses
another as an input. One rule: if no document says it, the edge does not exist.

Read, in this order:

1. `Research.1.md` (project root) — §§1-11 are general. §9 carries five blocks
   from this branch.
2. `G.1.md`, `G.2.md` and `G.3.md`, in full — the New Zealand slice, the method,
   the Realm and associated-states comparison, Brazil, and the schema decision.
3. This file, in full.
4. `notes/SCHEMA-DECISION-relationship-types.md` — decided and built. Read the
   section at the bottom, *What implementing it actually found*, before the rest.
5. The slices: `src/data/research/nz-government-finance.json` (changed this
   session — read the `_note` ADDENDUM first), `realm-government-finance.json`
   (changed), `associated-states-government-finance.json`,
   `br-fpm-population.json`, `anzsic-industry-classification.json`. Read the
   `_dropped` arrays.
6. `research-input/Grok-Research-Brief-VI.md` through `XI.md`. Items 25, 27 and
   28 of `XI` are still `not_attempted`.

Where things are, as of end of session 2026-08-06 (third thread):

* The corpus grew from 300 to 302 reports and 357 to 358 dependencies, and from
  1 relation to 2. `npm run check` exits 0. `npm run validate` exits 0 and prints
  one `✗` that is not this branch's — the same pre-existing Montenegro entry
  `G.2.md` and `G.3.md` both recorded (`me-monstat-national-accounts -> esa-2010`
  as a note describing an edge that is in the graph). No new isolated nodes.
* Two new nodes, both `NZ`: `nz-oag-annual-report` and
  `nz-public-audit-act-2001`. No new countries, no new slice files.
* One new dependency: `nz-oag-annual-report -[methodology_depends_on]->
  nz-public-audit-act-2001`.
* One new relation: `nz-oag-annual-report -[audits]-> tk-financial-statements`.
  This is the one the branch has been trying to mint since 2026-08-06 morning.
* `README.md` gained a *Running the checks from a Linux sandbox* subsection.
  Cheap check 1 of `G.3.md` is closed.
* No schema change. `src/lib/types.ts` untouched.

## Session conditions — read this first

**A browser was connected mid-session, and it changed everything the predecessor
said was impossible.** `G.3.md`'s packing list called a browser "non-negotiable
for the next round" and named seven domains that were unreachable without one.
Thomas installed the Claude in Chrome extension when this session pointed out it
was missing. Three of `G.3.md`'s five priority items and two of its cheap checks
were blocked on that single fact.

A correction to the predecessor's framing of its own conditions, made before any
work started: `G.3.md` presented the loss of the Wayback `id_` endpoint and the
absence of a browser as two separate handicaps, and the packing list implies
earlier sessions had a browser. They did not. `G.1.md` and `G.2.md` had no
browser either — what they had was Wayback, and Wayback was the substitute for a
browser, not a complement to it. The capability that was lost between `G.2.md`
and `G.3.md` is exactly one thing.

What was learned about the tooling, recorded because it will otherwise be
rediscovered:

* `legislation.govt.nz` renders normally in a browser. **But its article-text
  extractor returns nothing** — an empty result, not an error. The working route
  is DOM extraction against `div.prov`, one `div` per section, with `innerText`.
  A session that tries only a text extractor will wrongly conclude the domain is
  still dead. This is the third distinct failure mode this one domain has shown
  the branch.
* `oag.parliament.nz` **no longer exists as a live host**. It redirects to
  `ao.parliament.nz`, and the office now brands itself "The Audit Office". Every
  prior session recorded this domain as blocking ordinary requests; at least part
  of what they were seeing was a redirect they never followed. The site is
  ordinary server-rendered HTML and serves fine. Its search endpoint is
  `/search?SearchableText=<term>`.
* `ao.parliament.nz` PDFs extract cleanly through a plain fetch, **but only
  partially** — the 108-page annual report yielded roughly the first 60 pages
  before the extraction stopped. Everything quoted from it below is inside that
  range. The accounting-policy notes, which are in the back half, could not be
  read, and one edge was not minted as a result. See Findings 2.
* Query strings block in-page script execution on some routes; the page-text
  route works where the script route does not. Use both.

Extraction and verification only. No external researcher, no subagents. **Every
quote in this file was fetched and read by this session, first-hand, with no
inherited extractions and no exceptions.** That is a stronger claim than any
predecessor in this branch has been able to make, and it is the reason the output
is small.

Not done, by scope: `Grok-Research-Brief-XI.md` items 25, 27 and 28, all still
`not_attempted`. `G.3.md` priority items 3 (Stats NZ national-accounts pass) and
4 (second exemplar council) were offered to Thomas and not chosen; item 4 is now
unblocked and item 3 always was.

## Headline result

**The New Zealand slice's headline result no longer rests on a proxy read of any
kind, and the statutory chain is confirmed exactly as `G.1.md` stated it.**

This was `G.3.md` cheap check 5, carried unresolved by three sessions and
described there as "the only load-bearing citation in that slice resting on a
proxy read". Every link read first-hand from the current consolidation:

* **LGA 2002 s 111(1)** — "All information that is required by any provision of
  this Part or of Schedule 10 to be included in any plan, report, or other
  document must be prepared in accordance with generally accepted accounting
  practice if that information is of a form or nature for which generally
  accepted accounting practice has developed standards."
* **LGA 2002 s 5(1)** — "generally accepted accounting practice has the same
  meaning as in section 8 of the Financial Reporting Act 2013"
* **FRA 2013 s 8** — "In this Act, financial statements, group financial
  statements, a report, or other information complies with generally accepted
  accounting practice only if the report, statements, or information comply
  with— (a) applicable financial reporting standards; and (b) in relation to
  matters for which no provision is made in applicable financial reporting
  standards, an authoritative notice."
* **FRA 2013 s 5(1)** — "financial reporting standard means a financial reporting
  standard issued by the Board under section 12", and "Board means the External
  Reporting Board continued under section 11".

The chain terminates in the XRB by statutory definition. A version point that
matters and that no predecessor could check: the earlier LGA 2002 read was of a
FAOLEX mirror of a reprint **as at 26 March 2020**; this read is of the current
consolidation, and s 111(2) — "Subsection (1) does not apply to the preparation
of a funding impact statement", added 27 November 2010 — is present and
unchanged. Six years of amendments did not disturb the chain.

Recorded as an ADDENDUM to `nz-government-finance.json`'s `_note`, where the
original description of the `legislation.govt.nz` blocker is left standing above
it rather than edited away.

## Findings

### 1. The Auditor-General node exists, and the Tokelau relation is minted

*What this rests on: everything in this finding was read first-hand by this
session, from `ao.parliament.nz` and `legislation.govt.nz`.*

`G.3.md` priority item 1, and its own description of it was accurate: "the only
thing standing between the corpus and the Tokelau half of the export-of-
institution finding... One node, one dependent finding, no further research."

`nz-oag-annual-report` — *Annual Report of the Controller and Auditor-General*.
Qualifies under `Research.1.md` §4.2 on the strongest possible footing, because
the recurrence is statutory. Public Audit Act 2001 s 37(1): "As soon as
practicable after the end of each financial year, the Auditor-General must
prepare and present an annual report to the House of Representatives in
accordance with section 43 of the Public Finance Act 1989." s 37(2) prescribes
the contents, including "a list of entities audited by the Auditor-General under
an arrangement in accordance with section 19".

The mandate statement, from two independent recurring publications of the same
office, which is why it is treated as a standing fact rather than one year's
wording:

* Annual report 2024/25, Part 1 *About us*: "The Auditor-General is also the
  Auditor-General of the governments of Niue and Tokelau, and the
  Secretary-General of the Pacific Association of Supreme Audit Institutions
  (PASAI), which works to strengthen supreme audit institutions throughout the
  Pacific."
* *The Auditor-General's strategic intentions to 2031*, Part 1: "The
  Auditor-General of New Zealand also serves as Auditor-General for the
  governments of Niue and Tokelau, and as Secretary-General of the Pacific
  Association of Supreme Audit Institutions (PASAI)."

And an operational statement rather than a mandate statement, which is the better
evidence of the two because it describes work actually done in the reporting
year: "We are also working with the Government of Tokelau to clear its audit
backlog and expect to achieve this in 2026."

So: `nz-oag-annual-report -[audits]-> tk-financial-statements`, in
`realm-government-finance.json`'s `relations`, alongside the Niue relation
`G.3.md` minted. The `_dropped` note it replaces is retained rather than deleted,
now carrying its own closure and correction, on the convention `G.3.md`
established for the schema note.

**The correction this turned up is worth more than the relation.** See Findings 3.

Deliberately not minted: `nz-oag-annual-report -[audits]->
nu-government-financial-statements`. The Annual Report names Niue in the same
sentence as Tokelau and would support it, but Niue already carries the
better-targeted relation from `nu-ag-report-assembly`, which is the actual audit
report rather than the auditor's accountability document. Minting both would
reproduce the duplicate-disclosure problem `G.3.md` Findings 3 identified for the
Cook Islands, where one boilerplate block across two releases looks like two
independent disclosures. Recorded here rather than in the data because there is
no `_dropped` reason for "correct but redundant".

### 2. The Public Audit Act 2001 was already load-bearing without a node

*What this rests on: the Act read first-hand this session; the two secondary
observations quoted from other slices are flagged as inherited and were NOT
minted on that basis.*

`nz-oag-annual-report` would have been an isolated node. Looking for its
dependency surfaced something better: the Public Audit Act 2001 was already doing
work in three places in this corpus without existing in it.

* `nz-xrb-a1`'s own description says XRB A1 "defines 'public sector PBE' by
  cross-reference to the Public Audit Act 2001".
* `nz-wellington-annual-report`'s dependency basis quotes the council: "As a
  defined public entity under the Public Audit Act 2001, the Council is audited by
  the Office of the Auditor General and is classed as a Public Sector Public
  Benefit Entity (PBE) for financial reporting purposes."
* The Tokelau audit mandate turns on it — Findings 3.

Minted `nz-public-audit-act-2001`, on the precedent of `nz-rva1998`,
`tk-finance-rules` and `nu-public-revenues-act-1959`, which are all consolidated
statutes held as nodes. One dependency,
`nz-oag-annual-report -[methodology_depends_on]-> nz-public-audit-act-2001`, on
the report's own front matter: "It has been prepared in keeping with the
requirements of the Public Audit Act 2001 and the Public Finance Act 1989, as
well as recent guidance provided by the Treasury." `methodology_depends_on`
rather than `cites` because s 37(2) dictates the report's contents, not merely
its existence.

**Three edges left unminted on purpose, all recorded as a `deferred` lead.** The
XRB A1 and Wellington edges are both probably real and one of them is already
quoted verbatim in this corpus — but by a predecessor, not by this session, and
this session held itself to first-hand reads throughout. Re-fetch and mint; each
is one lookup. The third is the Public Finance Act 1989, named in the same
sentence and routed through by s 37(1); it is deliberately deferred because it
would sit under a great many New Zealand fiscal releases at once and deserves its
own decision rather than being minted as a side effect of this one.

### 3. Tokelau *is* installed by New Zealand law, and the slice said it was not

*What this rests on: a full-text read of the current consolidation of the Public
Audit Act 2001, this session, first-hand.*

The `_dropped` note this session closed contained a claim that has been repeated
across two hand-offs and the schema decision document. In its own words: Tokelau's
auditor is installed "by an instrument of the Tokelau Administration, Niue's by
Niue's own Constitution, **and neither by New Zealand law**".

The last clause is wrong for Tokelau. **"Tokelau Administration" is listed by name
in Schedule 2 of the Public Audit Act 2001**, headed "Specific public entities not
falling within any class" and referenced to s 5(1)(d). Tokelau is a New Zealand
*public entity* by New Zealand statute, and is audited on that footing as well as
under its own Finance Rules 1998. A full-text search of the current consolidation
returns **one** occurrence of "Tokelau" and **zero** of "Niue".

The finding survives and gets sharper, but it runs the other way from how it was
stated:

* **Niue is the pure export-of-institution case.** New Zealand law is silent.
  Niue's own Constitution reaches out and appoints a New Zealand statutory
  officer, and the Auditor-General signs "in exercising functions and powers
  under Article 60 of the Constitution of Niue".
* **Tokelau is doubly installed, and one of the two instruments is New Zealand's
  own.** Its own Finance Rules appoint the New Zealand Auditor-General, *and* New
  Zealand statute lists the Tokelau Administration among its domestic public
  entities.

That is a real constitutional difference between two jurisdictions of the same
Realm, and the original note had flattened it into a similarity. It is recorded
in full in the new relation's `basis`, where anyone reading the data rather than
this file will find it.

## Secondary observations (logged, low priority)

* The corpus's authority scores moved by less than 1e-9 across all 300
  pre-existing nodes, which is floating-point noise from renormalising PageRank
  over 302 nodes instead of 300. No node's `in_degree` or `out_degree` changed
  except the two new ones. The invariant `G.3.md` established for relations — that
  they never reach `buildGraph` — still holds and the validator still asserts it.
* `nz-public-audit-act-2001` scores exactly the same authority as
  `tk-finance-rules`, to twelve decimal places. Not a bug: both receive a single
  inbound edge from a floor-authority node with out-degree 1. Worth knowing before
  someone reports it as one.
* A schema trap caught in this session's own work, worth recording because the
  type system did not catch it and the validator would not have: `strength` on a
  `Dependency` is `number | undefined` — an override of the weight implied by
  `relationship_type` — and **not** a qualitative label. Writing `"strength":
  "strong"` and `"evidence": "documented"` into a slice, as this session first
  did, is wrong twice over: the first is a type error that only surfaces at
  `tsc`, and the second is redundant because absent `evidence` already means
  documented. `evidence` appears in this corpus only as `"implied"`, eight times.
* The `✗` in `npm run validate` is still the Montenegro note and still nothing to
  do with this branch. Three sessions have now reported it. Someone with fifteen
  minutes and access to the EU slice should either fix it or convert it to a
  caveat-note with null endpoints, because a permanently-red validator trains
  everyone to ignore the red.

## Corrections to prior sessions

1. **`G.1.md` Corrections 1 / `G.2.md` Corrections 1 / `G.3.md` Corrections 1 —
   confirmed, still open, now carried by five sessions.** `Research.1.md`'s header
   still reads "v3.0 (adopted 2026-08-05)" while four branch files describe it as
   v3.3 or v3.4. This session did not amend §9 at all and so had no occasion to
   bump it, but the drift is not getting smaller. Five sessions is past enough.
   Someone who owns the brief should settle it in one edit or delete the version
   string.
2. **`G.3.md` Session conditions — overstated by implication.** It presented the
   Wayback blocklisting and the absence of a browser as two independent losses,
   and its packing list ("A browser. Non-negotiable for the next round") reads as
   though earlier sessions had one. They did not: `G.1.md` and `G.2.md` had no
   browser and used Wayback `id_` as the substitute for one. One capability was
   lost, not two. The practical consequence is small but the framing mattered,
   because it made the situation look like degradation from a richer baseline
   rather than the loss of a single workaround.
3. **`G.3.md` Session conditions and every predecessor on `oag.parliament.nz` —
   refuted.** The domain does not block; it no longer exists as a live host and
   redirects to `ao.parliament.nz`. The office rebranded to "The Audit Office".
   The site is ordinary server-rendered HTML. It is possible the earlier sessions
   were seeing the redirect rather than a block, in which case this was reachable
   the whole time and cost the branch three sessions.
4. **`realm-government-finance.json`'s `_dropped` note on the Tokelau audit, and
   the framing repeated in `G.2.md` and
   `notes/SCHEMA-DECISION-relationship-types.md` — overstated, corrected in
   place.** "Neither by New Zealand law" is false for Tokelau: the Tokelau
   Administration is named in Schedule 2 of the Public Audit Act 2001. Findings 3.
   The correction is written into the new relation's `basis` and into the retained
   note, so a later session reading only the JSON will find it.
5. **`G.3.md` cheap check 5 — resolved.** The claim `G.1.md` made about the
   statutory chain was correct in every link and is now verified against the
   current consolidation rather than a 2020 reprint. Headline result. This is the
   third consecutive session in which the branch's verification discipline was
   turned on its own predecessors; on this occasion the predecessor was right.
6. No other prior substantive claim was found wrong. Nothing in `G.3.md`'s
   Findings 1-4 was contradicted by anything read this session.

## Thomas's stated priority for the remaining work

Still no lettered list for this branch, and `AU/G.1.md`'s open question — whether
the `EU/G.*.md` A-through-G lettering should carry over — now applies to three
branches and has been carried unanswered by five sessions.

Thomas chose priority item 1 explicitly this session, from a four-way choice, and
chose "write as I go" over "propose first" for data edits. Both are done. What
follows is this session's ordering.

1. **A Stats NZ national-accounts pass, starting from `nz-statsnz-aes`.** Was
   `G.3.md` item 3, unattempted and now the top of the list because everything
   above it is done. The AES DataInfo+ metadata names five downstream products by
   title — national accounts, the Tourism Satellite Account, the Non-profit
   Institutions Satellite Account, Business Price Indexes, Regional GDP — and the
   corpus holds none of them. Densest un-mined disclosure in the branch, on a
   reliably fetchable domain, and it would give
   `nz-statsnz-national-accounts-income` something to stand on.
2. **A second exemplar council for New Zealand.** Was `G.3.md` item 4. **Now
   unblocked** — Auckland and Christchurch both block ordinary requests but a
   browser reaches them. Wellington still carries the PBE IPSAS 1 edge alone, the
   same single-exemplar exposure `EU/G.49.md` flagged for Wolverhampton. This is
   the cheapest of the three now that the tooling exists.
3. **`Grok-Research-Brief-XI.md` item 25c — Chile's SII avalúo fiscal.**
   Unchanged from `G.3.md` item 2: a fourth property-valuation chain from a legal
   tradition unlike the three the corpus holds, and the comparison is the point.
   Items 25a/b/d (Colombia, Chile FCM, Peru FONCOMUN) behind it.
4. **Item 27 — the nineteen unscouted jurisdictions, Crown Dependencies first.**
   Unchanged. Whether Jersey, Guernsey and the Isle of Man use the CIPFA Code,
   IFRS or their own is the same question the Realm and the Compact states have
   now answered five different ways.
5. **Decide the Public Finance Act 1989.** New, and smaller than it looks. It is
   named in the Auditor-General's annual report, s 37(1) of the Public Audit Act
   routes through it, and it plausibly sits under a large fraction of the New
   Zealand fiscal nodes already in the corpus. The question is not whether to mint
   it but how many edges it should collect on arrival, and that is a decision
   rather than a lookup.

Done and removed: `G.3.md` items 1 (OAG node minted, Tokelau relation minted) and
its cheap checks 1 and 5.

Deferred deliberately, not forgotten: **rendering relations.** Still not built.
There are now two relations rather than one, which is still not enough to look at,
and this session had no way to see the render either. Option C's fuller form puts
them in the hover card, in search, and in the scene as a distinct unweighted line
style following the `implied` precedent. Revisit when there are five.

## Cheap checks still outstanding

New this session:

1. **Mint the XRB A1 and Wellington edges to `nz-public-audit-act-2001`.** Both
   are described as documented and one is already quoted verbatim in this corpus.
   Two fetches, two edges, and they connect a node that currently has one inbound
   edge to the two most-cited nodes in the New Zealand slice. Highest value per
   unit effort on this list by a distance.
2. **Re-read the back half of the Auditor-General's annual report** — pages ~60
   to 108, which this session's PDF extraction did not reach. The accounting
   policies are there, and with them whether `nz-oag-annual-report` should carry
   an edge to `nz-pbe-ipsas-1` or `nz-xrb-a1` like Wellington does. If it does,
   that is a nice closed loop: the auditor's own accounts prepared under the
   standards it audits everyone else against.
3. **Fix or reclassify the Montenegro note** so `npm run validate` prints no `✗`.
   Three sessions have reported it as somebody else's problem.

Carried from `G.3.md`, still outstanding:

4. Open NZSIOC's defining document and mint it between `nz-statsnz-aes` and
   `anzsic`. Stats NZ classification pages are fetchable.
5. Add a `reason` value or a `Research.1.md` §2 line for **caveat-notes** —
   `_dropped` entries that annotate a minted edge rather than record a dropped
   one. They must currently set `source` and `target` to `null` to pass the
   validator, which loses the information about which edge they annotate. This
   session hit it again and worked around it the same way.
6. Re-fetch the two inherited quotes flagged in `G.3.md` Findings 1 — the Stats NZ
   DataInfo+ GFSM block and the PBE IPSAS 1 "Comparison with IPSAS 1" appendix.
   **Now partly easier and partly not**: `datainfoplus.stats.govt.nz` is
   fetchable and case-sensitive (`/Item/` not `/item/`), but the XRB PDF
   truncation problem is a PDF-extraction limit rather than an access one, and a
   browser does not solve it.
7. Mint the Census Annual Survey of State and Local Government Finance, cited by
   title and vintage in Puerto Rico's fiscal plan.
8. Locate the Puerto Rico Planning Board forecasts as a titled recurring release.
9. Find the June 2026 revised Puerto Rico fiscal plan; the Drive ID in the
   research is the 2024 plan.
10. Decode the Wayback replay of the OAG's New Zealand long-term-plan
    observations. **Reframed**: it was recorded as gzip binary and unreachable,
    but the OAG site itself is now known to be reachable at `ao.parliament.nz`,
    so go to the source rather than the archive.

Carried from `G.1.md`, untouched: all seven of its own items, in particular the
full re-extraction of LGA 2002 Schedule 10 — still a subagent's grep, still the
one unverified thing in the New Zealand slice now that the chain is done — and the
current-consolidation check on s 106(2C). This session confirmed s 106(2C) exists
in the current consolidation and concerns development contributions, but read only
its opening words and did not perform the check.

## What to pass at the start of next thread

If the next agent can read the folder, pass nothing — point it at this file.

1. This file (`NZ/G.4.md`) — paste as text, do not attach.
2. `G.3.md`, `G.2.md`, `G.1.md` and `AU/G.1.md` — the frontier, the method, the
   schema decision, and the comparison case.
3. `Research.1.md` — §9's five blocks from this branch.
4. `notes/SCHEMA-DECISION-relationship-types.md`, including its bottom section.
5. The five slices named in Orientation. Read the `_dropped` arrays.
6. `research-input/Grok-Research-Brief-XI.md` — items 25, 27 and 28 are the
   outstanding assignment; item 26 is closed. Briefs VI-X for the protocol.
7. **A browser, again — and check it is actually connected before planning around
   it.** This session found the extension was simply not installed, which no
   predecessor had established; they recorded "zero connected browsers" and
   inferred a limitation. If it reports nothing, ask before assuming.
8. The verification rule, which is the whole thing: prefer direct fetch and text
   extraction over any summarising tool for anything that will become a quoted
   `basis` field, and re-read every externally supplied quote against its source
   before minting. `G.3.md` added: read the sentence as well as fetching it. This
   session adds a third — **check whether a "blocked" domain is actually blocked**,
   because one of them had merely moved, and three sessions planned around it.

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
are never dropped: an empty Corrections section is itself a claim (nothing earlier
was found wrong) and should say that explicitly.

What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If the
folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. State plainly which sources you read in full,
because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and what it rests on. Mark any claim that depends on a
predecessor's reading rather than your own. Quote verbatim; `Research.1.md` §2
applies here exactly as it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints,
oddities worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is confirmed, refuted, overstated or resolved.
This section is the reason the chain is trustworthy. A session that finds a
predecessor wrong and does not record it here has actively damaged the corpus.

**Thomas's stated priority for the remaining work** — lettered blocks carried
forward from the predecessor, edited to reflect what moved. Mark items no longer
needed explicitly and say why, rather than deleting them silently. This section is
what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

Conventions that make these files worth reading

* **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
* **Predictions are logged and then scored.** Say explicitly whether a prediction
  landed, in later files too.
* **Distinguish inference from documented fact**, and say which narrow respect is
  still inference.
* **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
* **Do not pad.** These files are dense because every line earns its place.
