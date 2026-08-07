# G.1.md — New Zealand/SAO galaxy hand-off

Date: 2026-08-06
Governing briefs: `Research.1.md` — §9 amended only (a new "New Zealand / SAO
galaxy" id block added, 19 ids). Not reopened cover to cover. **Note the
version discrepancy recorded in Corrections 1**: `AU/G.1.md` describes this
brief as "v3.4 this session" and `EU/G.49.md` as "v3.3", but the file's own
header line still reads "v3.0, adopted 2026-08-05". This session did not
resolve that; it amended §9 and left the header alone.
Predecessor: **none in this series.** Immediate predecessor in working
sequence is `AU/G.1.md` (2026-08-06, same working session, same day). This
file adopts the same hand-off spec (copied verbatim at the bottom, per the
spec's own instruction) as a third parallel series.

## Orientation — if you are a new agent, start here

**You are picking up the New Zealand branch of the Economic Report Influence
Graph — the second country in the `SAO` ("South Asia + Oceania") colour
family, added the same day as the first.** The project draws a 3D graph in
which every node is a recurrently published official report and every edge is
a *documented* statement that one report uses another as an input. The whole
thing rests on one rule: **if no document says it, the edge does not exist.**

There is no New Zealand-specific standing brief. Read, in this order:

1. **`Research.1.md`** (project root) — the general rules (§§1-11) apply here
   exactly as they do to Canada/US, the EU and Australia. §9's new "New
   Zealand / SAO galaxy" block is this branch's id list, 19 ids.
2. **`AU/G.1.md`**, in full — not a predecessor in the numbering sense, but
   the file this session was written against. Australia is the comparison
   that gives most of this session's findings their meaning, and several
   `_dropped` entries here point at Australian ones by name.
3. **This file**, in full.
4. **`src/data/research/nz-government-finance.json`** — this session's only
   research output. Its `_dropped` array is unusually load-bearing: five of
   its ten entries are *answers* (`denied` / `no-document`) rather than
   leads, and two of them are the most interesting things this session found.
5. **`src/lib/palette.ts`** — `COUNTRY_FAMILY` now has `NZ: 'SAO'`, added
   this session with a comment. No colour value was touched; the `SAO` hue
   range (275°→305°, red-violet) was already specified in `EU/G.47.md`'s
   continent redesign. Australia and New Zealand currently render
   identically, which is deliberate and is discussed in the new comment.

**Where things are, as of 2026-08-06 (end of session):**

- **The corpus grew**: 249 → **268 reports** (19 new, all New Zealand),
  303 → **322 dependencies** (19 new). `npm run check` exits 0. `npm run
  validate` exits 0 and reports one `✗`, which is **pre-existing and not
  this session's** — see Corrections 2. One new node
  (`nz-nzta-far-policy`) is deliberately isolated — see Findings 1.
- **Tooling note that will bite the next agent**: `node_modules/` in the
  working folder is a Windows build (`@esbuild/win32-x64`), so `npm run
  validate` fails immediately inside a Linux sandbox with a platform error
  before running any project code. This session worked around it by copying
  the tree (excluding `node_modules`) to a scratch directory and running
  `npm install` there. Both numbers above are from that scratch copy; the
  data files themselves were edited in place.
- **This branch exists because of a direct instruction from Thomas**: "we
  have just done australia, lets do new zealand next. we are looking for
  nodes and edges just like our last agents." No rationale was offered and
  none was needed — `EU/G.47.md`'s continent redesign had already recorded
  `SAO` as reading "India/Pakistan & Australia/NZ", so New Zealand was the
  named-in-advance next country.

## Session conditions — read this first

Direct continuation of the same working session that produced `AU/G.1.md` —
not a new thread. Scope was settled with Thomas up front rather than
assumed: a new `NZ/` branch (not folded into `AU/`), the same
government-finance angle as the Netherlands/UK/Australia passes (not a
broader statistics sweep), and the same rigour setting (three parallel
research subagents, then direct primary-source re-verification of every quote
before minting). All three were his explicit choices.

**What was read in full and re-verified by this session's own tooling**:
XRB A1 (43pp) and PBE IPSAS 1 (54pp), both downloaded from `xrb.govt.nz`
with plain `curl` and `pypdf`-extracted, then grepped in full; the Treasury's
*Financial Statements of the Government of New Zealand 2025* (177pp) and
*Budget Economic and Fiscal Update 2025* (165pp), same method from
`treasury.govt.nz`; Wellington City Council's *Annual Report 2024/25 Volume
2* (162pp), same method; the LGFA *Annual Report 2025* (77pp); the *Local
Government (Rating) Act 2002* (129pp, version as at 27 November 2025), the
*Rating Valuations Act 1998* (43pp, as at 23 December 2023) and the
*Rating Valuations Rules 2008* LINZS30300 (79pp, version date 1 October
2010) — all three from the publisher's own PDF replayed byte-for-byte
through the Wayback `id_` endpoint, because `legislation.govt.nz` sits behind
an AWS WAF that returns HTTP 202 with zero bytes to every non-browser client
tried; the *Local Government Act 2002* (469pp, PCO reprint as at 26 March
2020) from a FAOLEX mirror; Stats NZ's DataInfo+ metadata pages for GFS,
QLAS and the Local Authority Census (raw `curl`, HTML tag-stripped — note
that `stats.govt.nz` *release* pages are JS-rendered and useless to `curl`,
while DataInfo+ is server-rendered and is where the data-source text
actually lives); Wellington City Council's rating-valuations page; LINZ's
audits and property-valuation guidance pages; and the NZTA FAR Policy and
MBIE Tourism Infrastructure Fund pages via Wayback `id_` raw replay after
both returned HTTP 403 to direct `curl`.

**What was not independently re-verified, and is flagged in the JSON**: the
*Financial Reporting Act 2013* ss.5 and 8 (subagent read it through a
text-extraction proxy; `legislation.govt.nz` blocked) — this matters because
those two sections are the hinge of Findings 2; the *Local Government
(Financial Reporting and Prudence) Regulations 2014* reg 3; the claim that
LGA 2002 Schedule 10 in full names no external publication (a subagent
grepped the whole schedule; this session verified only the two clauses it
relied on, s.111 and s.106(2C)); the OAG's long-term-plan observations report
(`oag.parliament.nz` 403'd, and the Wayback replay came back gzip binary that
was not decoded); and NZTA's 2013 FAR review discussion document.

**Not attempted at all**: Auckland Council and Christchurch City Council,
both of which block non-browser clients (HTTP 406 and 403 respectively).
Wellington was chosen as the exemplar council on availability grounds and the
choice is stated as such in the node's own description.

## Headline result

**New Zealand's accounting standards do not name local authorities — and its
councils cite those standards by name anyway. That combination is new to this
corpus, and it splits the difference between the two patterns the branch had
found so far.** Neither XRB A1 nor PBE IPSAS 1 contains the string "local
authority" or "Local Government Act" anywhere (0 hits across 43 and 54 pages,
grepped in full this session), exactly like Australia's AASB 1049 and unlike
the Netherlands' BBV or the UK's CIPFA Code. But where Brisbane City Council's
own accounts pointedly never say "AASB 1049", Wellington City Council's
Statement of Compliance and Note 1 name PBE IPSAS 1 by title, self-classify
into the precise category XRB A1 defines ("classed as a Public Sector Public
Benefit Entity"), and cite the statutes that put them there. So the binding is
real, is achieved entirely by a transitive statutory chain outside the
standards themselves, and is visible only from the council's side. **The
edge Australia could not mint, New Zealand mints — and the standard is just
as silent in both countries.** That is a documented distinction between "the
standard names the councils" and "the councils name the standard", and the
corpus previously had no case that separated them.

## Findings

### 1. New Zealand's national local-transport funding formula names none of its inputs — the first depth-pass country where the formula document comes back empty

**What this rests on**: the official NZTA page, VERIFIED DIRECTLY this
session via Wayback `id_` raw replay (nzta.govt.nz 403s direct `curl`).
Every previous depth-pass country produced a formula document that named
titled data: the Dutch Toelichting, the UK's Adult Social Care RNF technical
annex, Ontario's OMPF Appendix F, Tasmania's Grants Commission methodology.
New Zealand's structural equivalent — the Funding Assistance Rates Policy,
which sets how much of each council's land-transport programme the National
Land Transport Fund co-invests — lists its inputs in full and sources none
of them. Verbatim: *"Inputs for each approved organisation are: centreline
kilometres... capital value, which is used by most local authorities to set
rates... inverse of rating units... index of deprivation, a demographic index
published by the University of Otago and used by the Ministry of Health...
total cost of all activities for a recent period."* And: *"A year before the
start of each NLTP, we recalculate the normal FAR for each approved
organisation by inputting the latest available information."* Two publishers
are named for the deprivation index and no title; the other three inputs are
anonymous — even though "capital value" and "rating units" are precisely the
figures LGA 2002 Schedule 10 clause 30A obliges every council to publish in
its annual report. `nz-nzta-far-policy` is therefore minted and left
isolated, on the `au-brisbane-financial-statements` convention: the absence
is the result, and hiding it by not minting the node would hide the finding.

A subagent separately found that NZTA's **2013** FAR review discussion
document does cite *"NZDep2006 Index of Deprivation, C Salmond, P Crampton
and J Atkinson, August 2007, page 21"* by exact title and authors. NOT
re-verified this session, and unusable regardless — the citing document is a
one-off consultation paper, not a recurring release. Recorded in `_dropped`
because it shows the index has a titled source and the recurring policy
simply stopped naming it.

### 2. The standards are silent; the statutes and the council are not

**What this rests on**: both standards downloaded from `xrb.govt.nz` and
grepped in full, VERIFIED DIRECTLY; Wellington's Annual Report Volume 2
downloaded from `wellington.govt.nz` and `pypdf`-extracted, VERIFIED
DIRECTLY; LGA 2002 ss.5 and 111 VERIFIED DIRECTLY from the FAOLEX mirror of
the PCO reprint; **the Financial Reporting Act 2013 link NOT independently
verified** (see Session conditions). XRB A1 defines "public sector PBE" by
cross-reference to the *Public Audit Act 2001*, never to the Local Government
Act. PBE IPSAS 1's only local-government word is "ratepayers", in para 3's
list of users of general purpose financial reports — not a scope clause. The
chain that binds councils runs LGA 2002 s.111 (*"All information that is
required by any provision of this Part or of Schedule 10... must be prepared
in accordance with generally accepted accounting practice"*) → LGA 2002 s.5
(*"generally accepted accounting practice has the same meaning as in section
8 of the Financial Reporting Act 2013"*) → FRA 2013 s.8 → XRB standards, with
FRA 2013's own definition of "entity" expressly including *"a local authority
(within the meaning of section 5(1) of the Local Government Act 2002)"*.
Wellington closes it from the other end: *"The financial statements have been
prepared to comply with Public Sector Public Benefit Entity Accounting
Standards (PBE Accounting Standards) for a Tier 1 entity"*, *"As a defined
public entity under the Public Audit Act 2001, the Council is audited by the
Office of the Auditor General and is classed as a Public Sector Public
Benefit Entity (PBE) for financial reporting purposes"*, and, naming the
standard itself, *"Disclosure of Fees for Audit Firms' Services (Amendments
to PBE IPSAS 1 – Presentation of financial reports)"*.

**One inference is still inference, and it is worth naming**: the
*transitivity* of that four-hop chain is not asserted by any single document.
Each hop is quoted, but no New Zealand document says "therefore councils must
apply PBE IPSAS 1". The minted edge does not rest on the chain — it rests on
Wellington naming the standard directly. The chain is recorded in `_dropped`
as context, not used as evidence.

### 3. The rating-valuation chain is the cleanest four-hop statutory chain the branch has found, and it dead-ends where NSW's did not

**What this rests on**: both Acts and the Rules read in full this session
from publisher PDFs via Wayback `id_` raw replay, VERIFIED DIRECTLY. Local
Government (Rating) Act 2002 s.13(3) requires rates to be struck on annual,
capital or land value and requires that value to *"be identified in the local
authority's funding impact statement"*; s.5 pins each of those three to
*"the meaning set out in section 2(1) of the Rating Valuations Act 1998"*;
s.27(4)(a) requires the rating information database to include *"all
information that relates to the unit that is included in the district
valuation roll"*; and s.5 again defines that roll as *"a roll prepared for a
district under section 7 of the Rating Valuations Act 1998 and approved under
section 11 of that Act"*. RVA s.9(1) requires revaluation *"at intervals of
not more than 3 years"* and s.11(2) supplies a gate with no NSW equivalent:
*"No rate may be assessed on the basis of the values proposed in the general
revaluation unless the Valuer-General has certified his or her approval."*

**Where it dead-ends**: the Rating Valuations Rules 2008 name no
sales-evidence source. Grepped in full: `Landonline` 0 hits, `notice of sale`
0, `Registrar-General` 0, `tax statement` 0. There is no New Zealand
counterpart to NSW's *"Notices of Sale lodged with Land Registry Services"*
or to the Dutch Waarderingsinstructie naming Kadaster. The Rules require
sale details to be captured and coded and require the Valuer-General to
analyse *"All market sales and market rentals for whole rating units that are
relevant to the effective date of the revaluation"* — a data *category*, never
a register or a titled release. The obvious candidate, LINZ's transfer tax
statement data, is ruled out by LINZ's own page: *"Information on the size or
value of the property being transferred is not included in this report as
this is not collected in the tax statements."* Recorded as a `denied` drop so
nobody spends the same hour on it twice.

### 4. The one central-government grant document that does name titled data is in tourism, not local government

**What this rests on**: the official MBIE page, VERIFIED DIRECTLY via
Wayback `id_` raw replay after a direct 403. The Tourism Infrastructure
Fund's assessment process names three inputs at territorial-authority level:
*"guest night numbers can be obtained from the Accommodation Data
Programme"*; *"MBIE will use the Tourism Electronic Card Transaction (TECT)
for the different TAs"*; and *"Rating unit figures will be sourced from TAs'
annual reports (note this is the number of rateable properties and not the
population figure)"* — which lands exactly on LGA 2002 Schedule 10 clause
30A without citing it. Two exact titles and a document class, in a grant
programme, from a ministry with no local-government mandate. **Caveat stated
plainly in the node**: TIF ran in numbered rounds rather than on a schedule,
and that is the weakest part of its claim to be a recurrent release. If a
future session decides round-based programmes are not nodes, this is the
first casualty and the three edges go with it.

## Secondary observations (logged, low priority)

- **Stats NZ's data-source text lives on DataInfo+, not on the release
  pages.** The `stats.govt.nz` information-release pages are JS-rendered and
  return a bare `<title>` to `curl`; they also contain no "data sources"
  section even when rendered. `datainfoplus.stats.govt.nz` is server-rendered,
  fetches cleanly, and is where every quote in this slice's statistics edges
  came from. Worth knowing before anyone concludes Stats NZ does not document
  its inputs.
- **Wellington City Council writes "Rating Valuation Act 1998"**, dropping the
  "s" from the Act's actual short title *Rating Valuations Act 1998*. Quoted
  verbatim in the edge basis rather than silently corrected, the same
  treatment `AU/G.1.md` gave the ABS methodology page's internal
  inconsistency and `EU/G.49.md` gave the "Valuation Office Agency" naming
  gap.
- **LGFA has no counterpart anywhere else in this corpus.** A jointly
  council-and-Crown-owned agency that borrows on behalf of the whole local
  government sector and monitors councils' statutory planning documents
  against its lending covenants. Its 2025 annual report names *"annual
  reports, annual plans and long-term plans"* — and returns 0 hits for
  "Statistics New Zealand", "Stats NZ" and "census". Its covenants are pure
  accounting aggregates.
- **`nz-statsnz-lac` is a node for something that no longer has a release
  page.** Stats NZ's own metadata says LAFS is *"no longer published in the
  information release format used for 2009-13"* and points at Infoshare. It
  is still the annual benchmark for QLAS and the local-government source for
  GFS, so it is a node, with the cadence oddity recorded in its description.

## Corrections to prior sessions

1. **`Research.1.md`'s stated version and its actual header disagree, and
   have for at least three sessions — *confirmed*, not resolved.**
   `EU/G.49.md` records the brief as "v3.2 → v3.3 this session" and
   `AU/G.1.md` as "v3.3 → v3.4 this session", but the file's own first line
   still reads `# Research.1.md — standing brief (v3.0, adopted 2026-08-05)`.
   Neither session bumped the header when it amended §9. This session
   amended §9 as well and **also** did not bump the header, deliberately —
   the version-numbering convention is not documented anywhere and guessing
   at it would make the drift worse rather than better. Recorded here so it
   is on the record and so whoever owns the brief can settle it in one edit.
2. **`npm run validate` reports one `✗` that is not this session's — *not a
   correction to a claim, but worth not misattributing*.** The message is
   `1 note(s) describe an edge that IS in the graph — resolve or delete:
   me-monstat-national-accounts -> esa-2010 (note)`. This session confirmed
   it is pre-existing by re-running the validator with the New Zealand slice
   unregistered: the same `✗` appears against the pre-New-Zealand corpus of
   249 reports and 303 dependencies. It belongs to the Montenegro material in
   the EU branch. Not fixed here — it is not this branch's to fix, and
   silently editing another branch's slice would break the "never edit a
   predecessor" spirit even though it is data rather than a hand-off.

No prior *claim* about New Zealand exists to confirm or refute; this is the
first session in the branch.

## Thomas's stated priority for the remaining work

**No lettered-priority list exists for this branch**, and `AU/G.1.md`'s
open question — whether the `EU/G.*.md` A-through-G lettering should be
adopted wholesale by the non-European branches — is still open and now
applies to two branches rather than one. What follows is this session's own
sense of the next steps, not something Thomas has ranked.

1. **Build the long-term plan as a node.** It is the single richest unbuilt
   New Zealand document: three-yearly per council, statutorily required to
   contain a financial strategy (LGA 2002 s.101A), an infrastructure strategy
   (s.101B) and a funding impact statement, separately audited, and named as
   an input by both the LGFA and (per a subagent) the Auditor-General's
   own per-cycle observations report. Two `_dropped` leads are blocked on it.
2. **Re-verify the Financial Reporting Act 2013 link directly.** It is the
   hinge of this session's headline result and is the only load-bearing
   citation here that rests on a proxy read. A browser session, or any client
   that gets past `legislation.govt.nz`'s WAF, closes it in one lookup.
3. **A second New Zealand council**, ideally Auckland or Christchurch, both of
   which blocked every method tried this session. Wellington currently
   carries the accounting-standard edge alone, the same single-exemplar
   exposure `EU/G.49.md` flagged for Wolverhampton.
4. **Decide whether round-based grant programmes are nodes.** `nz-mbie-tif`
   and its two data-source edges are the concrete case; the answer is a
   schema/scope decision rather than a research one, like the `supersedes`
   question `EU/G.49.md` left open.
5. **Score the Australia/New Zealand comparison deliberately.** Two
   structurally similar Commonwealth systems have now been done back to back
   with the same method, and the accounting-standard difference (Findings 2)
   was found by accident rather than by looking for it. A short, targeted
   pass asking only "where do AU and NZ diverge" would be cheap and is the
   kind of thing this corpus exists to answer.

## Cheap checks still outstanding

1. **Re-read Financial Reporting Act 2013 ss.5 and 8 from
   `legislation.govt.nz` directly** — highest value per unit effort, see
   priority 2.
2. **Re-extract LGA 2002 Schedule 10 in full and confirm it names no external
   publication.** A subagent reported this; this session verified only the
   two clauses it used. The claim is load-bearing for any future LTP or
   annual-report node.
3. **Re-check LGA 2002 s.106(2C) against the current consolidation.** The
   reprint read this session is as at 26 March 2020, and s.106(2C) is the
   only place in the whole Act that names a Stats NZ release by title
   (*"Producers Price Index Outputs for Construction provided by Statistics
   New Zealand"*). Note the title has drifted from the modern Stats NZ
   product name.
4. **Decode the Wayback replay of the OAG's "Observations from our audits of
   councils' 2024-34 long-term plans"** — it came back gzip-encoded binary
   this session and was not decoded. Blocked on priority 1 anyway.
5. **Fetch an Auckland or Christchurch annual report** by a method that gets
   past HTTP 406 / 403.
6. **Confirm whether the Rating Valuations Rules have been replaced.** LINZ's
   own review page said consultation on a final draft was expected in 2026;
   this session read the 1 October 2010 version. If new rules are out, check
   whether they name a sales-evidence source — that would overturn Findings 3.
7. **Fix `node_modules`, or record the workaround as standard.** The Windows
   esbuild binary makes `npm run validate` unusable from a Linux sandbox
   without a scratch reinstall. This is going to cost every future session
   the same five minutes.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`NZ/G.1.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — §9's new "New Zealand / SAO galaxy" block.
3. **`AU/G.1.md`** — the comparison case. Several findings here are only
   meaningful against it.
4. **`src/data/research/nz-government-finance.json`** — its `_dropped` array
   is the direct continuation point for cheap checks 2-6.
5. **A browser**, specifically for cheap checks 1 and 5 — a `curl`-only
   session will hit the same `legislation.govt.nz` WAF and the same council
   403s this one did.
6. **The same caution `AU/G.1.md`, `EU/G.48.md` and `EU/G.49.md` all carry**:
   prefer direct fetch plus text extraction over an AI-summarising fetch tool
   for anything that will become a quoted `basis` field. This session
   confirmed the method works cleanly on `xrb.govt.nz`, `treasury.govt.nz`,
   `datainfoplus.stats.govt.nz`, `wellington.govt.nz`, `lgfa.co.nz` and
   `linz.govt.nz`; that `legislation.govt.nz`, `nzta.govt.nz`,
   `mbie.govt.nz` and `oag.parliament.nz` all block non-browser clients but
   that the first three are readable through Wayback's `id_` raw-bytes
   endpoint, which returns the publisher's own file unmodified and is **not**
   a summary; and that `aucklandcouncil.govt.nz` and `ccc.govt.nz` resisted
   every method tried.

---

# How to write the next hand-off

**Adopted 2026-08-06 from the `EU/G.*.md` series (originally added there
2026-08-04), via `AU/G.1.md`. Copy this whole section verbatim into every
successor**, so the chain never depends on one file surviving. It is the
spec, not an example — `EU/G.47.md` through `G.49.md` and `AU/G.1.md` are the
worked examples this series is adapting from.

When Thomas says *"write the next handoff"*, *"write the next G file"*,
*"wrap this thread up"* or anything close, this is what he is asking for. Do
not ask which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the
  highest-numbered `G.*` file in `NZ/`. This file is `G.1.md` — the first.
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
