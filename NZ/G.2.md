# G.2.md — New Zealand/SAO galaxy hand-off

Date: 2026-08-06
Governing briefs: `Research.1.md` — §9 amended **four times** across this
working session (a "New Zealand / SAO galaxy" block of 19 ids, which belongs to
`G.1.md`'s half of the session; then a "Realm of New Zealand" block of 10; then
an "Associated states and dependencies" block of 12; then a "Brazil / SA
galaxy" block of 5). Not reopened cover to cover. **The version discrepancy recorded in `G.1.md` Corrections 1
is still unresolved** — the file's header says "v3.0" while three hand-offs
now describe it as v3.3/v3.4.
Predecessor: `G.1.md` (2026-08-06, same day, same working session).

## Orientation — if you are a new agent, start here

**You are picking up a branch that outgrew its own name.** `G.1.md` mapped New
Zealand. This session mapped the three jurisdictions of its Realm, then five
more associated states and dependencies on three other metropolitan states,
and turned the whole thing into a comparative question — then followed the
question out of the region entirely, into Brazil. The branch is now about
**what a metropolitan state exports to the jurisdictions inside its perimeter**,
and New Zealand is one case in it rather than the subject.

The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a *documented* statement that one report uses
another as an input. One rule: **if no document says it, the edge does not
exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — §§1-11 are general. §9 now carries
   four blocks from this branch.
2. **`G.1.md`**, in full — the New Zealand slice and the method.
3. **This file**, in full.
4. **The four slices**, in this order, because each answers the one before:
   `src/data/research/nz-government-finance.json`,
   `realm-government-finance.json`,
   `associated-states-government-finance.json`, then `br-fpm-population.json`.
   Their `_dropped` arrays carry as much of the result as their edges do: 46
   nodes and 44 edges across the four slices, against 34 `_dropped` entries of
   which **21 are answers**
   (`denied`, `no-document`, `note`, `unpublishable-source`) rather than leads.
   The Realm slice alone is 6 answers out of 11.
5. **`research-input/Grok-Research-Brief-VI.md` through `XI.md`** — the
   research protocol this branch runs on, and the record of what it cost to
   develop. `XI`'s Brazil item returned before this hand-off closed and is
   built; its other four items came back `not_attempted` and are still open.

**Where things are, as of end of session 2026-08-06:**

- **The corpus grew from 249 to 295 reports and 303 to 347 dependencies.**
  `npm run check` exits 0. `npm run validate` exits 0 and prints one `✗` that
  is **not this branch's** — see Corrections 2.
- **Ten new countries**: `NZ`, then `CK` `NU` `TK` (Realm of New Zealand),
  then `FM` `MH` `PW` (Compact of Free Association), `GL`, `PR`, and finally
  `BR` — which staffs the `SA` colour family for the first time. Plus new
  nodes under `DK` and `US`, both of which already existed as countries.
- **One isolated node was minted deliberately**, on the
  `au-brisbane-financial-statements` convention where the absence is the
  finding: `nz-nzta-far-policy`, a national funding formula naming none of its
  four inputs to a titled source.
- **`node_modules/` is a Windows build.** `npm run validate` fails instantly in
  a Linux sandbox with an esbuild platform error before running any project
  code. Workaround used all session: copy the tree excluding `node_modules` to
  a scratch directory and `npm install` there. Every count above is from that
  scratch copy; data files were edited in place.

## Session conditions — read this first

Direct continuation of `G.1.md`, same day. Two research modes ran in parallel:
this session's own direct fetching and verification, and an external researcher
(Grok) working to written briefs in `research-input/`.

**The verification discipline is the load-bearing part of this branch and must
not be relaxed.** Every quote in all four slices was re-fetched from its
primary source and re-read by the session that minted it. That is not
ceremonial. Across six external rounds it caught: two secondary sources dressed
as primary (`lex.dk`, `da.wikisource.org`), five paraphrases in a single round
including the sentence carrying the headline finding, one paraphrase that
deleted a named private valuer from Niue's accounts, three misapplied corpus
ids (SNA 1968 tagged as `sna-2008`, ANZSIC as `naics`), and **one outright
fabricated quote** — a sentence attributed to a Marshall Islands document that
appears in neither of the two documents named, confirmed by full-text grep of
both.

**Fetch routes discovered, and worth more than any single quote:**

- `legislation.govt.nz` returns HTTP 202 with zero bytes to non-browser
  clients. The PCO's own PDFs are readable through the Wayback `id_` endpoint.
- **`retsinformation.dk`'s JavaScript wall covers only the HTML view. Append
  `/pdf` to an ELI path and it serves the official PDF.** This unblocks all
  Danish legislation.
- **The Puerto Rico Oversight Board distributes certified fiscal plans through
  Google Drive.** `uc?export=download&id=<ID>` retrieves them; `/view` does not.
- `paclii.org`, `oag.parliament.nz`, `nzta.govt.nz`, `mbie.govt.nz`,
  `aucklandcouncil.govt.nz`, `ccc.govt.nz` and `data.adb.org` all refuse
  ordinary requests. `stats.govt.nz` release pages are JavaScript;
  `datainfoplus.stats.govt.nz` is server-rendered and is where the methodology
  text actually lives.

**Not done, by choice or by clock**: `Grok-Research-Brief-XI.md` items 25-28 —
the Colombian, Chilean and Peruvian transfer formulas, the Chilean property
valuation chain, ANZSIC's citing releases, the Faroes, the Compact budgets, and
nineteen unscouted dependent jurisdictions. Item 24 (Brazil) came back complete
and is built; see Findings 5. The corpus-side backlog is in *Cheap checks*.

## Headline result

**Seven jurisdictions inside three metropolitan perimeters — New Zealand, the
United States and Denmark — give five different answers to one question: what
accounting framework do your public accounts name?** IPSAS, by name and standard number (Cook Islands). Nothing at all, for
at least nine reporting years (Niue). An undefined "generally accepted
accounting practice" with no definer (Tokelau). US GAAP with GASB as
standard-setter, in near-identical wording across three sovereign states (FSM,
Marshall Islands, Palau). And its own legislature's statute, naming no external
framework whatever (Greenland).

**So the United States exports its accounting method wholesale to three
sovereign nations, and New Zealand exports none to three jurisdictions of its
own Realm.** Palau proves the American import is real rather than decorative:
its FY2022 opinion is qualified specifically for failing to implement GASB
Statement No. 87. A jurisdiction cannot fail a numbered pronouncement of a
foreign standard-setter unless that standard-setter genuinely governs it.

New Zealand exports something else instead: **the auditor**. The Controller and
Auditor-General of New Zealand personally signs Niue's accounts under Article 60
of *Niue's own* Constitution, and is installed as Tokelau's auditor by the
Tokelau Finance Rules 1998. The Compact states keep their own audit offices and
contract the fieldwork to private firms working under US standards.

That distinction — **export of institution versus export of method** — is the
session's most valuable finding and **none of it is representable in this
graph.** See Findings 3.

## Findings

### 1. Five answers, and the pattern is not about wealth or size

**What this rests on**: every quote re-fetched and re-read by this session.
Cook Islands FY2018 statements and 2023/24 HYEFU from `mfem.gov.ck`; Niue
FY2023, FY2024 and the five-year FY2017-21 statements from `mof.gov.nu`;
Tokelau Finance Rules via Wayback replay of `paclii.org`; FSM, Marshall Islands
and Palau statements from their own audit offices; Greenland's *Landskassens
Regnskab* from `ina.gl`.

Niue's is the strangest and the most robust. Its Statement of Compliance reads
*"prepared in accordance with the accounting policies of the Government of
Niue"*, and the auditor then opines against those same self-defined policies —
a closed loop. Confirmed by grep across two document sets covering nine years:
zero occurrences of IPSAS, "International Public Sector", XRB, "New Zealand
GAAP" or "generally accepted accounting" in any of them. **That makes it a
settled practice, not an omission.**

Greenland's is the newest: *"Regnskabet er udarbejdet i henhold til
Inatsisartutlov nr. 26 af 28. november 2016 ... samt Selvstyrets bekendtgørelse
nr. 6 af 20. januar 2022"*. Its auditor works to international auditing
standards; its accounts answer to nobody's framework but its own.

### 2. Arrears look like a property of the class

**What this rests on**: signature and audit dates read off each document.
Cook Islands FY2018 signed and audited 30 November 2020 — twenty-nine months.
Marshall Islands FY2022 issued June 2025 — thirty-two. Palau FY2022 issued
October 2025 — thirty-six. Puerto Rico has completed nothing since FY2022, a
fact its own Oversight Board states in writing. **Niue changed the law**: the
Public Revenues (Financial Reporting and Audit Special Provisions) Amendment
Act 2022 was passed specifically to permit five years to be reported as one
document, and FY2023 and FY2024 were then authorised three days apart.

Greenland alone is punctual — 2025 accounts signed 30 April 2026.

Six jurisdictions, five badly behind, one on time. Not yet a law, but it is a
pattern worth testing against the nineteen unscouted jurisdictions.

### 3. The ontology gap now has six instances and two shapes

**What this rests on**: appointing provisions quoted from each instrument.
*Export of institution*, twice: Tokelau Finance Rules 1998, *"The
Auditor-General of New Zealand shall be the auditor of accounts which contain
public money"*; and Niue, where John Ryan signs as Controller and
Auditor-General of New Zealand *"in exercising functions and powers under
Article 60 of the Constitution of Niue"*. *Export of method only*, three times:
Ernst & Young entities in Kolonia, Majuro and Koror auditing under US GAAS and
Government Auditing Standards while each state keeps its own audit office — the
Marshall Islands' constitutionally independent under Article VIII § 15.
*Neither*, once: Greenland.

**None of the three fits any of this corpus's four `relationship_type` values**,
all of which describe one document being a computational or methodological
input to another. Assurance is not an input.

This is the **second** ontology gap on the record. `EU/G.49.md` Finding 3
identified the first — no `supersedes` type for the UK Shared Prosperity Fund
succeeding EU structural funds — and left it open. That case has sat unresolved
for two sessions with one instance behind it. This one arrives with six.
**Two independent gaps, both found by the evidence standard doing its job, is
now a schema argument rather than an anecdote.** It is a data-modelling
decision and belongs to Thomas or whoever owns the schema, not to a research
session.

### 4. Greenland's block grant closed after three rounds and two false starts

**What this rests on**: both ends verified directly this session. § 5 of the
Self-Government Act indexes the block grant to *"det generelle pris- og
lønindeks på finansloven"*; § 8 indexes its own mineral-revenue threshold the
same way. Read from the Parliamentary PDF via the `/pdf` route.

The open question was whether that index is published or internal to the
Danish Finance Act. Round one sourced it to an encyclopaedia. Round two to a
wiki. Round three asserted Økonomistyrelsen publishes it and quoted nothing.
**It is published** — a titled annual table on `oes.dk` carrying *Generelt
pris- og lønindeks* alongside five sibling indices — so the edge is minted,
`calculated_from`, on the same footing as `ssa-cola -> bls-cpi`.

Worth recording that **the negative would have been the better finding**: a
national funding formula indexed to a number nobody publishes is a shape this
corpus has never held. Kept as a note in the slice rather than deleted.

### 5. Brazil names the statistician and not the statistic, and so do two other continents

**What this rests on**: Decisão Normativa-TCU 219/2025 read in full (206
pages) through the Wayback `id_` endpoint, because `portal.tcu.gov.br` serves a
JavaScript bot challenge in place of its own PDF; Lei 8.443/1992 from
`planalto.gov.br`; IBGE's Estimativas methodology note from
`biblioteca.ibge.gov.br` (which serves documents even though
`www.ibge.gov.br` returns 403).

The Fundo de Participação dos Municípios divides constitutional revenue among
roughly 5,500 municipalities on one population figure. **The decision that
fixes every coefficient names no publication.** Twenty-eight annex column
headers read "População (fonte: IBGE, ref. 01/07/2025)" — agency, plus a
reference date — and the operative articles cite the Constitution and four
Leis Complementares, statutes throughout.

What supplies the titled link is elsewhere. Lei 8.443/1992 art. 102 compels
publication of the population list "para os fins previstos no inciso VI do
art. 1º desta Lei", art. 1º VI being the TCU's coefficient function. IBGE's
methodology note closes it from the producer's end — "em cumprimento ao Art.
102 da Lei nº 8.443" — and names its own inputs by exact title and revision:
*Projeções da População do Brasil e Unidades da Federação, Revisão 2024* and
the *Censos Demográficos 2010 e 2022*.

**So the edge is documented and no single document states it.** Minted on the
distributed chain, in the manner of the New Zealand rating chain, with the
hops quoted in the basis so a reader can judge. And the pattern it exemplifies
— a funding formula naming the statistician rather than the statistic — now
has instances on three continents, alongside Australia's Local Government
(Financial Assistance) Act 1995 (Cth) s.4A and New Zealand's Local Government
(Financial Reporting and Prudence) Regulations 2014 reg 3.

## Secondary observations (logged, low priority)

- **`gasb-standards` had to be minted and its absence was a real hole.** The
  corpus held `ipsas` and Canada's `psab-psas` and nothing for the United
  States, which made the largest exporter of public-sector accounting method in
  the dataset invisible. Three Compact states now point at it.
- **The Cook Islands Statistics Office contradicts itself in public.** Its
  methodology page says the national accounts are "largely based on" SNA 1968
  with a series ending in 2001; its current release names SNA 2008 and carries
  data to 2024. Both live. The release is treated as current, the conflict
  recorded rather than adjudicated.
- **Niue's land and buildings still rest on a 1998 valuation by Darroch
  Limited, Registered Valuers** — a named private firm, recorded as an
  `unpublishable-source` drop alongside J.D. Power and ICE Brent. It survived
  only because a paraphrase that deleted it was caught in re-reading.
- **Puerto Rico's fiscal plan is the richest single document in either slice**
  and there is more in it: it names BLS, BEA, the Census ACS and the Census
  Annual Survey of State and Local Government Finance, and only three of those
  became edges.

## Corrections to prior sessions

1. **`G.1.md` Corrections 1 is confirmed and still open.** `Research.1.md`'s
   header reads "v3.0" while `EU/G.49.md`, `AU/G.1.md` and `G.1.md` describe it
   as v3.3 or v3.4. This session amended §9 three times and again did not bump
   the header, for the same reason: the numbering convention is undocumented
   and guessing would make the drift worse. Someone who owns the brief should
   settle it in one edit.
2. **The single `✗` from `npm run validate` is not this branch's** —
   `me-monstat-national-accounts -> esa-2010 (note)`, a Montenegro entry in the
   EU branch. Confirmed pre-existing by re-running the validator against the
   corpus with all three of this branch's slices unregistered: same `✗`, at 249
   reports and 303 dependencies. Not fixed here; it is another branch's data.

3. **This file's own first draft contained five counting errors, all caught on
   a re-read before it was handed on, all fixed in place.** It said §9 was
   "amended twice" and then listed three blocks; "eight new countries" and then
   listed nine; "two isolated nodes" and then named one; "four metropolitan
   perimeters" where the seven jurisdictions sit inside three (New Zealand, the
   United States, Denmark); and "five of the Realm slice's ten `_dropped`
   entries are answers" where the slice holds eleven, six of them answers.
   None changed a finding — every one was a tally in prose that the underlying
   data contradicts, and the data is right. Recorded anyway, on the same
   convention `EU/G.49.md` Corrections 1 used for an error it caught in its own
   live edit: a session that finds itself wrong and does not write it down has
   damaged the chain, and the fact that these were arithmetic rather than
   evidentiary is exactly why they would otherwise have survived. **Anyone
   quoting a count out of a hand-off should check it against the slice.**

No prior *substantive* claim was found wrong. `G.1.md`'s New Zealand findings
all stand.

## Thomas's stated priority for the remaining work

Still no lettered list for this branch, and `AU/G.1.md`'s open question —
whether the `EU/G.*.md` A-through-G lettering should carry over — now applies
to three branches. What follows is this session's own ordering.

1. **Mint the three free New Zealand international edges.** `G.1.md` identified
   them, this session verified the quotes, and nobody built them:
   `nz-statsnz-gfs -> imf-gfsm` and `-> sna-2008` (*"In 2018, we implemented the
   Government Finance Statistics Manual 2014 (GFSM2014), which follows the GFSM
   2001 and is consistent with the System of National Accounts 2008 (SNA08)"*),
   and `nz-pbe-ipsas-1 -> ipsas` (*"PBE IPSAS 1 Presentation of Financial
   Reports is drawn from IPSAS 1 Presentation of Financial Statements"*). All
   three anchors exist. **This is an hour of work and it stops New Zealand
   being an island in the graph.**
2. **Mint ANZSIC as an Australia–New Zealand bridge node.** Two passages
   already verified from the ABS primary source: joint ABS/Stats NZ authorship,
   and *"ANZSIC 2006 aligns with the ISIC and the North American Industry
   Classification System (NAICS) at the subdivision level as far as
   practicable."* `naics` is the most-cited node in the corpus with eight
   inbound edges; ANZSIC is its structural twin and would tie `AU` and `NZ`
   together directly. Item 26 of Brief XI collects the citing releases.
3. **Settle the schema question.** Six documented `audits` instances and one
   `supersedes`. Either widen `RelationshipType` or record a decision not to,
   with reasons, so the next session stops re-discovering it.
4. **Brief XI's Brazil item came back before this hand-off closed and is
   built — see Findings 5.** The rest of Brief XI is outstanding: items 25
   (Colombia, Chile, Peru transfer formulas), 26 (ANZSIC citing releases), 27
   (nineteen unscouted jurisdictions) and 28 (Faroes, Compact budgets) were all
   returned `not_attempted`. **Item 25c is the one to push**: Chile's SII
   *avalúo fiscal* would be a fourth property-valuation chain from a legal
   tradition unlike the three the corpus holds.
5. **A second exemplar council for New Zealand.** Wellington carries the
   PBE IPSAS 1 edge alone, the same single-exemplar exposure `EU/G.49.md`
   flagged for Wolverhampton. Auckland and Christchurch both block ordinary
   requests.

## Cheap checks still outstanding

**New this session:**

1. **Re-read Financial Reporting Act 2013 ss.5 and 8 from `legislation.govt.nz`
   directly.** Carried from `G.1.md` and still the only load-bearing citation in
   the New Zealand slice resting on a proxy read. It is the hinge of that
   slice's headline result.
2. **Split `ck-national-accounts`** — the Cook Islands publish quarterly GDP as
   well as the annual release, and the Budget forecasts from the quarterly
   series, not the annual one.
3. **Mint the Census Annual Survey of State and Local Government Finance**, cited
   by title and vintage in Puerto Rico's fiscal plan. It is the US counterpart
   of `nz-statsnz-lac` and `au-la-annual-statements` and would need a US
   local-government-finance pass around it to be meaningful.
4. **Locate the Puerto Rico Planning Board forecasts** as a titled recurring
   release — named and explicitly disagreed with in the fiscal plan.
5. **Find the June 2026 revised Puerto Rico fiscal plan.** The Drive ID in the
   research is the 2024 plan; the current vintage was never opened.
6. **Decode the Wayback replay of the OAG's New Zealand long-term-plan
   observations** — gzip binary, never decoded.
7. **Fix `node_modules` or document the scratch-install workaround** in the
   README. It costs every session the same five minutes.

**Carried from `G.1.md`, untouched**: all seven of its own items, in
particular the full re-extraction of LGA 2002 Schedule 10 and the
current-consolidation check on s.106(2C).

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**

1. **This file (`NZ/G.2.md`)** — paste as text, do not attach.
2. **`G.1.md`** and **`AU/G.1.md`** — the method, and the comparison case.
3. **`Research.1.md`** — §9's three new blocks.
4. **The four slices** named in Orientation. Read the `_dropped` arrays.
5. **`research-input/Grok-Research-Brief-XI.md`** — the outstanding research
   assignment, and Briefs VI-X for the protocol and its failure history.
6. **A browser**, for the gated domains listed in Session conditions.
7. **The verification rule, which is the whole thing**: prefer direct fetch and
   text extraction over any summarising tool for anything that will become a
   quoted `basis` field, and re-read every externally supplied quote against
   its source before minting. Six rounds of external research produced work
   that was mostly excellent and occasionally invented, and there is no way to
   tell which is which without looking.

---

# How to write the next hand-off

**Adopted 2026-08-06 from the `EU/G.*.md` series (originally added there
2026-08-04), via `AU/G.1.md`. Copy this whole section verbatim into every
successor**, so the chain never depends on one file surviving. It is the
spec, not an example.

When Thomas says *"write the next handoff"*, *"write the next G file"*,
*"wrap this thread up"* or anything close, this is what he is asking for. Do
not ask which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the
  highest-numbered `G.*` file in `NZ/`. This file is `G.2.md`.
- **Write it as `.md`**, plain text, in `NZ/`.
- **Then write the JSON sidecar.** Run:

  ```
  python3 scripts/handoff-to-json.py NZ/G.<n>.md
  ```

  The script's default "convert every file with no argument" mode only scans
  `EU/` (hardcoded) — always pass the `NZ/G.<n>.md` path explicitly when
  working in this branch; the underlying parser and JSON structure are not
  EU-specific despite the script's own docstring describing only the EU
  case. The Markdown stays the document of record; the JSON is a structured
  index of it.
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The
  one exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

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
leaving a heading with nothing under it. *Corrections* and *Thomas's stated
priority* are **never** dropped: an empty Corrections section is itself a
claim (nothing earlier was found wrong) and should say that explicitly.

## What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction
vs verification vs planning), what tooling was available, what did not
arrive, what was left untouched by instruction. **State plainly which
sources you read in full**, because everything downstream inherits that
limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what
was checked, what was found, and **what it rests on**. Mark any claim that
depends on a predecessor's reading rather than your own. Quote verbatim;
`Research.1.md` §2 applies here exactly as it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints,
oddities worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the
claim being corrected, and whether it is *confirmed*, *refuted*,
*overstated* or *resolved*. This section is the reason the chain is
trustworthy. A session that finds a predecessor wrong and does not record it
here has actively damaged the corpus.

**Thomas's stated priority for the remaining work** — lettered blocks
carried forward from the predecessor, edited to reflect what moved. Mark
items **no longer needed** explicitly and say why, rather than deleting them
silently. This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each
one a single lookup. This is the list that gets raided when a session has
capacity left.

**What to pass at the start of next thread** — the packing list, for the
case where the next agent has no filesystem access. If it does have access,
say so and keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** Say explicitly whether a
  prediction landed, in later files too.
- **Distinguish inference from documented fact**, and say which narrow
  respect is still inference.
- **A refuted hypothesis is a good outcome.** Report both sides of a
  conflict and pick neither; `Research.1.md` §3 is explicit that
  adjudication is not the research role.
- **Do not pad.** These files are dense because every line earns its place.
