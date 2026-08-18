# G.1.md — Australia/SAO galaxy hand-off

Date: 2026-08-06
Governing briefs: `Research.1.md` v3.3 → **v3.4 this session** — §9 amended
only (a new "Australia / SAO galaxy" id block added, 11 ids). Not reopened
cover to cover; this is the first Australia-focused session and there is no
prior Australia-specific governing text to have read.
Predecessor: **none — first hand-off in this series.** This file adopts the
`EU/G.*.md` hand-off spec (copied verbatim at the bottom of this file,
per that spec's own instruction to copy it into every successor) as the
template for a new, parallel series rather than inventing a new format.

## Orientation — if you are a new agent, start here

**You are picking up the newest branch of the Economic Report Influence
Graph: Australia, and more broadly the `SAO` ("South Asia + Oceania")
colour family this branch's palette has reserved since `EU/G.47.md`'s
continent redesign but never staffed until this session.** The project
draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses
another as an input. The whole thing rests on one rule: **if no document
says it, the edge does not exist.**

This branch is new enough that there is no dedicated standing brief the way
`Research.1.md` is for Canada/US and `EU/G.*.md` is for Europe — this file
and `Research.1.md`'s own rules (§§1-11, which are general, not
Europe-specific) are what exists. Read, in this order:

1. **`Research.1.md`** (project root) — the general rules apply to this
   branch exactly as they do to Canada/US and EU. §9's new "Australia / SAO
   galaxy" block is this branch's own id list, 11 ids as of this session.
2. **This file**, in full.
3. **`src/data/research/au-government-finance.json`** — this session's only
   research output. Its own `_dropped` array records both genuine negative
   findings (AASB 1049 does not bind local government, unlike the
   Netherlands' BBV or the UK's CIPFA Code) and open leads.
4. **`src/lib/palette.ts`** — `COUNTRY_FAMILY` now has one entry, `AU:
   'SAO'`, added this session with a short comment. The `SAO` hue range
   itself (275°→305°, red-violet) was already fully specified in the
   continent redesign — this session did not need to touch any colour
   value, only map a country to the already-reserved family.

**Where things are, as of 2026-08-06 (start of session):**

- **The corpus grew**: 238 → **249 reports** (11 new, all Australian
  government-finance), 297 → **303 dependencies** (6 new). `npm run
  validate` and `npm run check` both exit 0. One new node
  (`au-brisbane-financial-statements`) is deliberately isolated — see
  Findings 2.
- **This branch exists at all because of a direct instruction from Thomas**:
  "let's look at a former british colony and add australia to the fold... I
  think it will be similar to canada and uk" — said immediately after this
  session's own Netherlands and UK depth passes (see `EU/G.48.md`,
  `EU/G.49.md`, same working session, same day/next day). The premise was
  correct: Australia's federal→state→local structure and its Commonwealth
  Grants Commission's horizontal fiscal equalisation are close structural
  analogs to both Canada's own federal equalization program and the UK's
  Local Government Finance Settlement.

## Session conditions — read this first

Direct continuation of the same working session that produced `EU/G.48.md`
and `EU/G.49.md` — not a new thread. No light-scout phase this time (unlike
the Switzerland/Norway/UK scouting that preceded the UK deep-dive in
`EU/G.49.md`): Thomas named Australia directly with a stated rationale, so
this session went straight to the same three-parallel-subagent research
pattern used for the Netherlands and UK, followed by direct primary-source
re-verification of every quote before minting.

**What was read in full this session**: the Local Government (Financial
Assistance) Act 1995 (Cth) s.6, s.3, s.4A (legislation.gov.au, fetched
directly via `curl` — this domain is not gated); the Valuation of Land Act
1916 (NSW) ss.8, 14A and the Local Government Act 1993 (NSW) ss.497-498
(legislation.nsw.gov.au — Cloudflare-gated against `curl`, so fetched via a
real browser and its rendered DOM text read directly, the same workaround
`EU/G.49.md` used nowhere but worth recording as now-precedented); AASB
1049's full compiled standard (standards.aasb.gov.au, fetched directly); the
ABS Government Finance Statistics methodology page (abs.gov.au, fetched
directly); Brisbane City Council's 63-page Consolidated Financial Statements
2023-24 (downloaded, `pypdf`-extracted in full); Georges River Council's and
two NSW government pages' own published rates/valuation text (fetched
directly).

**What was not independently re-verified, and is flagged explicitly in the
JSON**: the Commonwealth Grants Commission's own GST Relativities
methodology material — `cgc.gov.au` blocked every access method tried this
session (`curl` got a TLS connection reset; a real browser was offered a
forced file-download dialog rather than a rendered page) — so its quotes
rest on a subagent's own proxy-summarised extraction. The Tasmanian State
Grants Commission's methodology manual was read natively by a subagent (not
proxy-summarised) but not independently re-read by this session's own
tooling — a middle confidence tier, distinct from both the fully-verified
material and the CGC material. The Victorian Local Government Grants
Commission's Annual Allocation Report was found (`localgovernment.vic.gov.au`
returned HTTP 403) but not built into any edge at all — recorded only as a
`_dropped` lead.

## Headline result

**Thomas's prediction held: Australia's system is structurally close enough
to both Canada's and the UK's that the same research method — three parallel
subagents, then direct primary-source re-verification — produced a
comparable-depth result in one session, with one genuine structural
difference worth having found.** The Netherlands' BBV and the UK's CIPFA
Code both explicitly bind local government by name; Australia's equivalent
standard, AASB 1049, explicitly does **not** — its own Appendix A defines
"government" as the Commonwealth, state and territory governments only, and
a real Australian council's own financial statements confirm this by citing
general "Australian Accounting Standards" rather than AASB 1049 by name.
That is a documented negative result, not a research failure, and it is the
kind of finding this project's own philosophy (`Research.1.md` §3, §4) says
is exactly as valuable as a positive edge.

## Findings

### 1. The Commonwealth Grants Commission names ABS releases by exact title — where it could be verified

**What this rests on**: a subagent's own extraction, via a proxy-reader
after direct access failed twice (`curl` TLS reset, browser forced-download).
Reported, from the CGC's "Commission's Assessment Methodology — Population"
chapter: *"The population data used in the estimation of GST relativities is
Estimated Resident Population, produced by the ABS"*, plus a footnote citing
*"ABS (2021), Census of Population and Housing, Socio Economic Indexes for
Areas, Australia, released 27 April 2023"* by exact title and release date.
**Not independently re-verified this session** — recorded in the JSON with
an explicit lower-confidence flag on both the node (`au-cgc-gst-relativities`)
and the one edge that depends on it, rather than silently trusted or
silently omitted.

### 2. AASB 1049 does not bind local government, and a real council's own accounts confirm the gap from the other side

**What this rests on**: two independently-fetched primary sources, both
VERIFIED DIRECTLY this session. AASB 1049's own Appendix A, entry A[4]:
*"government"* is defined as *"The Australian Government, the Government of
the Australian Capital Territory, New South Wales, the Northern Territory,
Queensland, South Australia, Tasmania, Victoria or Western Australia."* — nine
jurisdictions, no local government. Brisbane City Council's own Consolidated
Financial Statements 2023-24, Note 1(c): *"These financial statements have
been prepared in accordance with all Australian Accounting Standards and
Interpretations issued by the Australian Accounting Standards Board (AASB),
as applicable to not-for-profit entities"* — general AAS/AASB compliance,
never "AASB 1049" by name, and separately grounded in the *City of Brisbane
Act 2010* and its Regulation, not a national accounting standard the way
Dutch/UK councils cite their BBV/CIPFA Code by name and edition. No edge
connects `au-brisbane-financial-statements` to `au-aasb1049` — deliberately,
recorded as a `denied`-reason `_dropped` entry rather than as an omission.
This is why `au-brisbane-financial-statements` shows as an isolated node in
`npm run validate`'s output — the isolation itself is the finding, the same
convention `EU/G.47.md` already established for `nordic-statistics-database`
and `nato-defence-expenditure`.

### 3. The NSW property-valuation chain is a clean three-hop parallel to the Netherlands' WOZ chain, fully self-verified

**What this rests on**: legislation.nsw.gov.au fetched via a real browser
(Cloudflare-gated against `curl`) and read directly; nsw.gov.au and Georges
River Council's own pages fetched directly. The chain: the Valuation of
Land Act 1916 establishes the Valuer-General's role (s.8(4): *"The general
role of the Valuer-General is— (a) to exercise functions with respect to
the valuation of land in the State..."*) and requires annual valuation
(s.14A(1)). The Local Government Act 1993 s.498's own note states rates are
levied on land value *"determined specially for rating purposes by the
Valuer-General under the Valuation of Land Act 1916"* — an explicit
cross-Act citation, the same shape as the Netherlands' OZB ordinance citing
Wet WOZ. Georges River Council's own page confirms the mechanism in
practice: *"Land values are set by the NSW Valuer General every three
years."* And the Valuer-General's own sales-data pipeline is named directly:
*"NSW property sales information comes from Notices of Sale lodged with
Land Registry Services"* — the exact structural parallel to the
Netherlands' Kadaster naming in the Waarderingsinstructie.

## Secondary observations (logged, low priority)

- **The ABS Government Finance Statistics methodology page describes its own
  local-government data source two different ways in two different
  sections of the same page** — the current "Data sources" section says
  "annual statements of accounts completed by local authorities," while an
  older "Institutional environment" section on the same page says "annual
  local government consolidated data collections conducted on behalf of a
  range of stakeholders by departments of local government in each of the
  jurisdictions, as well as published financial statements." Both quoted
  verbatim in `au-la-annual-statements`'s own description rather than
  silently reconciled — the same treatment `EU/G.48.md` gave Montenegro's
  own internally-inconsistent ESA 2010 regulation citation.
- **AASB 1049's own definition of "ABS GFS Manual"** (Appendix A) points at
  a 2005-edition methodology publication, "Australian System of Government
  Finance Statistics: Concepts, Sources and Methods," which is a distinct
  document from the annual "Government Finance Statistics, Australia"
  release this session minted as `au-abs-gfs`. The two were treated as one
  node for scope reasons this session — flagged explicitly in the edge's
  own `basis` text rather than silently merged, and worth splitting into two
  nodes if a future session wants the methodology manual itself as its own
  citable document.

## Corrections to prior sessions

**None.** This is the first session in this branch; there is no prior
Australia-specific claim to confirm, refute or correct. (This section is
never dropped per the hand-off spec, even when empty — an empty Corrections
section is itself a claim, here trivially true because nothing preceded it.)

## Thomas's stated priority for the remaining work

**No lettered-priority list exists yet for this branch** — `EU/G.*.md`'s
A-through-G lettering is specific to the EU/Europe galaxy's own history and
does not automatically carry over. What follows is this session's own sense
of the natural next steps, not something Thomas has ranked:

1. **Re-verify the Commonwealth Grants Commission material directly** —
   the single highest-value unresolved item, since the CGC's GST Revenue
   Sharing Relativities is Australia's single most important fiscal
   document and this session could not get past its access gating. Try a
   different fetch method (a downloaded-then-locally-read PDF via a
   different browser profile, or contacting the corpus maintainer for a
   manually-saved copy) before trusting `au-cgc-gst-relativities` and
   `au-abs-erp` at the same confidence as the rest of this slice.
2. **A second Australian state**, on the Netherlands/UK precedent of
   building at least two members-state examples before generalising —
   Victoria (VLGGC report already found, just not independently verified)
   or NSW's own Grants Commission (searched for this session, not found —
   may not publish an equivalent public methodology manual, a genuinely
   open question) are the natural candidates.
3. **A second Australian council**, ideally one whose Revenue Policy/rates
   document explicitly names NSW Land Registry Services or a state's
   land-titles registry directly, completing the `_dropped` lead this
   session left open.
4. **Whether this branch should adopt the EU branch's own hand-off
   conventions wholesale** (lettered priorities, cheap-checks list
   carried forward verbatim) or develop its own — this file adopted the EU
   spec directly rather than deciding that question; worth Thomas's input
   once there's a second session's worth of practice to judge against.

## Cheap checks still outstanding

1. **Re-fetch the CGC GST Revenue Sharing Relativities PDF and its
   Population Assessment chapter** by a method that gets past the current
   block — highest priority, see priority item 1 above.
2. **Search directly for a NSW Local Government Grants Commission
   methodology manual** — this session's search came back empty but is not
   confirmed exhaustive.
3. **Find an accessible copy of one of the four NSW council Revenue Policy
   PDFs that 403'd this session** (Tamworth, Yass Valley, Federation,
   Wollongong) — would let a council's own document, rather than a general
   nsw.gov.au explainer page, carry the NSW LRS edge.
4. **Split `au-abs-gfs` into two nodes** if a future session wants the "ABS
   GFS Manual" methodology publication (2005/2015 editions) represented
   separately from the annual "Government Finance Statistics, Australia"
   release — see Secondary Observations.
5. **Independently verify the Victorian Local Government Grants Commission's
   Annual Allocation Report** — `localgovernment.vic.gov.au` returned
   HTTP 403 this session; real content was surfaced via a subagent but
   never built into an edge, see the JSON's own `_dropped` array.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`AU/G.1.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.4, §9's new "Australia / SAO galaxy" block.
3. **`src/data/research/au-government-finance.json`** — its own `_dropped`
   array is the direct continuation point for cheap checks 2, 3 and 5 above.
4. **A browser**, specifically for cheap check 1 — a `curl`-only session
   will hit the same CGC wall this one did.
5. **The same caution `EU/G.48.md` and `EU/G.49.md` already carry**: prefer
   direct fetch + text extraction over an AI-summarising fetch tool for
   anything that will become a quoted `basis` field. This session confirmed
   the method works cleanly on legislation.gov.au, abs.gov.au and
   standards.aasb.gov.au (not gated), and that legislation.nsw.gov.au's
   Cloudflare gate is passable via a real browser's rendered text (also not
   an AI summary) — but that `cgc.gov.au` and
   `localgovernment.vic.gov.au` resisted every method tried this session.

---

# How to write the next hand-off

**Adopted 2026-08-06 from the `EU/G.*.md` series (originally added there
2026-08-04). Copy this whole section verbatim into every successor**, so the
chain never depends on one file surviving. It is the spec, not an example —
`EU/G.47.md` through `G.49.md` are the worked examples this series is
adapting from.

When Thomas says *"write the next handoff"*, *"write the next G file"*,
*"wrap this thread up"* or anything close, this is what he is asking for. Do
not ask which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the
  highest-numbered `G.*` file in `AU/`. This file is `G.1.md` — the first.
- **Write it as `.md`**, plain text, in `AU/`.
- **Then write the JSON sidecar.** Run:

  ```
  python3 scripts/handoff-to-json.py AU/G.<n>.md
  ```

  The script's default "convert every file with no argument" mode only scans
  `EU/` (hardcoded) — always pass the `AU/G.<n>.md` path explicitly when
  working in this branch; the underlying parser and JSON structure are not
  EU-specific despite the script's own docstring describing only the EU
  case. The Markdown stays the document of record; the JSON is a structured
  index of it.
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The
  one exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — Australia/SAO galaxy hand-off

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
- **Predictions are logged and then scored.** This file's own headline
  result scores Thomas's "similar to Canada and UK" prediction — say
  explicitly whether a prediction landed, in later files too.
- **Distinguish inference from documented fact**, and say which narrow
  respect is still inference.
- **A refuted hypothesis is a good outcome.** Report both sides of a
  conflict and pick neither; `Research.1.md` §3 is explicit that
  adjudication is not the research role.
- **Do not pad.** These files are dense because every line earns its place.
