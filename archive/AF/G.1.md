# G.1.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §4 (recurring-vs-one-off node shape,
cadence-preferred-not-required) and the general evidence standard (§2/§3,
git prohibition and extract-don't-adjudicate) carried over unread-in-full
this session from EU/AU-branch conventions — this is the first Africa-branch
hand-off, so there is no `AF/G.0.md` to read instead. `country afrikans.docx`
read in full this session (48 raw JSON entries plus prose regional
commentary, none independently verified before this session).
Predecessor: none — this is the first hand-off for this branch.

## Orientation — if you are a new agent, start here

1. **This is a new branch, `AF/`, opened this session.** It follows the same
   `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/` —
   `scripts/handoff-to-json.py`'s `BRANCHES` list was updated this session
   to include `"AF"`.
2. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. Ask Thomas if you need git state.
3. **The source material for this whole branch is `country afrikans.docx`**
   (repo root, Thomas's own upload) — 48 raw JSON research entries covering
   seven countries (Nigeria, Egypt, South Africa, Kenya, Ethiopia, Tanzania,
   Ghana) plus continent-wide prose commentary on benefit-indexation
   typology by region. It is Grok-sourced, external research, **not
   independently verified** — every claim in it needs the same
   direct-source-fetch treatment the EU branch gave its own Grok-sourced
   proposal files (`EU/G.52.md` onward) before anything from it is minted.
   A prior session (documented in `EU/G.69.md`) found the file and
   deliberately left it untouched, believing it personal/unrelated; it is
   neither — Thomas confirmed this session it is exactly the kind of raw
   material this corpus exists to formalise.
4. **This branch's priority list is plain-numbered**, following `AU`'s and
   `NZ`'s convention rather than `EU`'s lettered A–G — there is no
   branch-specific reason to differ and no instruction to.
5. **Country-by-country order, not yet fixed by Thomas**: this session did
   South Africa only (richest single-country dataset in the docx, 11 of the
   48 entries, and the one with the clearest formal statutory structure to
   verify against). The other six — Nigeria, Egypt, Kenya, Ethiopia,
   Tanzania, Ghana — are entirely unresearched as corpus nodes; only their
   raw docx entries exist.
6. **A new palette family, `AFR`, was staffed this session** (`src/lib/
   palette.ts`) — reserved since the continent redesign, unstaffed until
   now. `ZA` is its first country. Every subsequent African country needs
   its own `COUNTRY_FAMILY` entry (`AFR` too, unless a future session
   decides an African country needs its own sub-family the way NZ's Realm
   or the Compact states did) — do not skip this the way `country` skipped
   `COUNTRY_FAMILY` originally and stayed silently wrong for five sessions
   (`src/lib/types.ts`'s own history note).

## Session conditions — read this first

**A pilot-country research-and-mint session**, opening a new branch.
`country afrikans.docx` was read and parsed in full (converted from its
docx paragraph-per-line JSON encoding to structured data — the docx stores
a JSON array's worth of research entries as plain text, one line per
paragraph, interspersed with prose regional-overview sections; a small
Python pass reconstructed 7 top-level JSON arrays totalling 48 entries).
Only the South Africa entries (11 of 48) were independently re-verified
and minted this session. **The other 37 entries, across Nigeria, Egypt,
Kenya, Ethiopia, Tanzania and Ghana, were read but not independently
checked against any primary source this session** — they remain exactly as
Grok produced them, unverified.

**Thomas's own stated position going in**: he does not know how these
countries' governments and statistical/benefit systems are structured, and
expects colonial influence to be visible in them. Both were true for South
Africa specifically (see Finding 2) and are worth stating plainly for a
future session picking up the next country, since the shape of the
verification work depends on it.

## Headline result

**South Africa's benefit-adjustment mechanism is discretionary by statute,
not automatically CPI-indexed — confirmed at the primary-source level,
not merely repeated from the docx's own (correct, as it turned out)
framing.** Social Assistance Act 13 of 2004 s.32(3) gives the Minister of
Social Development, with the concurrence of the Minister of Finance, the
power to set grant amounts "by notice in the Gazette" — a discretionary
act, not a formula. The National Treasury's own 2026 Budget Review
confirms grants were "adjusted down over the medium term in line with a
lower inflation outlook" — inflation is a stated factor in the decision,
but no document names a mechanical link between a specific CPI print and a
specific grant increase. This matches the docx's own continent-wide
framing (discretionary is the norm; automatic indexation is the rare
exception) for the one country checked directly this session.

**Five nodes minted, three dependencies wired, all independently
re-verified at source.** See Finding 2 for detail; the branch's schema
placement (a new `AFR` palette family, `ZA` country code) is a
prerequisite the validator would otherwise reject on.

## Findings

### 1. `country afrikans.docx` is 48 unverified Grok-research entries across seven countries, plus a genuinely useful continent-wide typology

*What this rests on*: the docx's own text, read in full this session,
reconstructed from its paragraph-per-line JSON encoding.

The file is not prose about Africa — it is raw JSON (an AI researcher's
structured output, delivered into a Word document one line per paragraph)
covering: Nigeria (9 entries — CPI rebasing, pension reviews, cash
transfers), Egypt (9 — CAPMAS CPI, Social Insurance and Pensions Law
148/2019, Takaful and Karama), South Africa (11 — Stats SA CPI, Social
Assistance Act, SASSA, disability grants, Budget Review), Kenya (7 — KNBS
CPI, Social Protection Act 2025, Persons with Disabilities Act 2025,
Inua Jamii), Ethiopia (6 — PSNP5, ESS CPI), Tanzania (4 — NBS CPI,
National Social Protection Policy), Ghana (2 — LEAP indexation, GSS CPI
methodology). None of the 48 entries had been checked against a primary
source before this session, and 37 of them still have not been.

The docx's closing prose sections are a genuinely useful typology and
regional overview, not a wrapper around the JSON — worth reading for its
own sake by whichever agent picks up the next country, since it names the
specific mechanism-type for each country before any node-level research
begins (e.g. "Ghana is the standout with an explicit LEAP indexation
formula linked to GSS CPI. Nigeria is largely discretionary despite
constitutional review requirements" — a claim this session did not check
for Nigeria, flagged as a lead rather than a fact).

### 2. South Africa: five nodes minted, all independently re-verified, one finding the docx itself had gotten right but not verified

*What this rests on*: direct fetches this session of the Social Assistance
Act 13 of 2004 and the South African Social Security Agency Act 9 of 2004
(both via LawLibrary/Laws.Africa, since SAFLII's own act pages 301-redirect
to WebFetch), the June 2026 Stats SA CPI release (P0141), the 2026
National Treasury Budget Review (Chapter 5), and SASSA's own 2024/25
Annual Report.

- **`za-statssa-cpi`** — Stats SA's monthly CPI (P0141). The June 2026
  release's own key findings ("Annual consumer price inflation was 5,0% in
  June 2026, up from 4,5% in May 2026") matched the docx's citation
  exactly — the one entry in this slice where independent verification
  confirmed rather than corrected the source material.
- **`za-social-assistance-act-2004`** — the statute governing South
  Africa's social grants. Direct quote, s.32(3): "The Minister, with the
  concurrence of the Minister of Finance — (a) must determine amounts
  payable in respect of social assistance; and (b) may determine
  additional payments linked to a social grant, by notice in the Gazette."
  No cadence (a one-off foundational instrument, per `Research.1.md` §4).
- **`za-sassa-act-2004`** — **a separate statute from the one above**,
  same year, easily confused, and the docx's own entries did not
  distinguish them. Establishes SASSA itself: s.2(1), "The South African
  Social Security Agency is hereby established as a juristic person";
  s.3(a), its object is "the efficient and effective management,
  administration and payment of social assistance."
- **`za-sassa-annual-report`** — SASSA's own annual report (2024/25
  edition read directly). Its reporting obligation traces to the Public
  Finance Management Act (a general public-entity requirement), confirmed
  from the report's own PFMA-compliance section rather than assumed.
- **`za-national-treasury-budget-review`** — the annual Budget Review.
  Direct quote, 2026 Chapter 5: "The social grant allocation has been
  adjusted down over the medium term in line with a lower inflation
  outlook and improved grant targeting and verification."

**Three dependencies**, all `cites` or `methodology_depends_on`, never
`uses_data_from` — deliberately, because nothing found this session names
a mechanical formula tying a grant figure to a CPI print. The Budget
Review → CPI edge is `cites` for exactly that reason, recorded in the
slice's own `_note` field so a future session does not silently upgrade it
without new evidence.

**Colonial-structure observation, since Thomas asked directly**: South
Africa's statutory architecture here is recognisably Westminster-derived
(an Act of Parliament, a Minister, a Gazette-notice power, a juristic-
person statutory agency) — the same broad shape as the UK's own
Department for Work and Pensions / benefit-uprating structure this corpus
already has in its `gb-*` files, rather than anything distinctly novel.
Not independently compared against the UK slice this session; a genuine
comparison is a cheap check for later, not asserted here.

## Secondary observations (logged, low priority)

- Corpus count after this session's mint, confirmed by an actual validator
  run: **507 reports / 612 dependencies / 3 relations** — up from
  502/609/3 recorded the same day in `AU/G.5.md`.
- SAFLII, South Africa's main free legal-information site, 301-redirects
  every act page tried by `WebFetch` this session — the same shape of
  block already documented for other jurisdictions' legal databases in
  this corpus, just a different failure mode (redirect rather than 403 or
  Cloudflare challenge). LawLibrary/Laws.Africa (run by the African Legal
  Information Institute and Laws.Africa) is a usable substitute and is
  likely to be the go-to source for other African countries' legislation
  too, worth trying first rather than rediscovering the SAFLII block per
  country.
- The docx's regional-overview prose flags Kenya's 2025 Social Protection
  Bill, Ghana's LEAP formula, and Egypt's "formal [CPI] definition" for
  pensions as the three clearest non-discretionary exceptions on the
  continent — worth prioritising if the branch's next session wants the
  most structurally interesting country rather than the next one in docx
  order.

## Corrections to prior sessions

**None.** This is the first hand-off for this branch; there is no
predecessor to correct. `EU/G.69.md`'s finding that the docx existed and
was deliberately left untouched is not contradicted — it was an accurate
statement of that session's own scope, not a claim that the file was
unworkable.

## Thomas's stated priority for the remaining work

New list for this branch, ordered by what the docx itself already
structures the work into:

1. Nigeria — 9 raw entries (CPI rebasing to 2024 base, PenCom pension
   reviews, National Social Safety Net Programme). Not started.
2. Egypt — 9 raw entries (CAPMAS 10th CPI series, Social Insurance and
   Pensions Law 148/2019, Takaful and Karama). Not started. The docx flags
   Egypt as having "the clearest statutory CPI definition for pension
   increases" on the continent — possibly the next-most-interesting
   country after South Africa precisely because it may NOT be purely
   discretionary; worth prioritising to test that claim.
3. Kenya — 7 raw entries (KNBS CPI rebasing, Social Protection Act 2025,
   Persons with Disabilities Act 2025, Inua Jamii). Not started. The 2025
   Act is very recent and worth checking whether it has actually come into
   force yet.
4. Ethiopia — 6 raw entries (PSNP5, a federal programme with woreda
   [district]-level implementation — genuinely different government
   structure from the other six, never colonised in the conventional
   sense bar a brief 1936–41 Italian occupation, worth flagging to Thomas
   directly since it breaks the "colonial influence" pattern he expected).
   Not started.
5. Tanzania — 4 raw entries (NBS CPI, National Social Protection Policy
   2023). Not started.
6. Ghana — 2 raw entries, but flagged by the docx's own regional overview
   as the one clear case of explicit automatic indexation (LEAP linked to
   GSS CPI) — small entry count, potentially high research value. Not
   started.
7. Whether to model the docx's own regional-typology prose (North/
   Southern/East/West Africa, WAEMU Harmonised CPI, AFRISTAT) as anything
   in the corpus, or leave it as narrative-only context the way similar
   overview material has been treated elsewhere. Not raised with Thomas.

## Cheap checks still outstanding

1. Compare South Africa's Gazette-notice grant-setting structure against
   the UK's own benefit-uprating mechanism already in this corpus's `gb-*`
   files — the "Westminster-derived" observation in Finding 2 is asserted,
   not checked side by side.
2. Confirm whether SAFLII's 301-redirect is a permanent site restructuring
   or a temporary issue — worth a one-off recheck before assuming
   LawLibrary/Laws.Africa is the permanent substitute for every future
   African-legislation fetch.
3. Whether `za-sassa-annual-report` should also carry a direct edge to
   `za-social-assistance-act-2004` — flagged as an open question inside
   the slice's own `_open_questions` field, not resolved this session.

## What to pass at the start of next thread

1. **This file** — the only predecessor.
2. **`country afrikans.docx`** — read section by section per country as
   each is tackled; do not re-parse the whole file into JSON again, the
   reconstruction method is recorded in Finding 1's own description if
   needed, but the entries themselves are just as easily read country by
   country directly from the file.
3. **`src/data/research/za-cpi-social-grants.json`** — the completed South
   Africa slice, 5 reports, 3 dependencies, template for the pattern
   (verify every docx claim at a primary source before minting; distinct
   `cites` vs `methodology_depends_on` vs `uses_data_from` chosen on what
   the source actually states, not on what would be tidier).
4. **`src/lib/palette.ts`** — `AFR` is now staffed with `ZA`. Every new
   African country needs a `COUNTRY_FAMILY` entry in the same commit as
   its first node, or it renders unclassified grey and the validator
   should (but has not yet been tested to) catch it.
5. **The Westminster-structure observation** (Finding 2) — worth a direct
   comparison against the `gb-*` slice if a future session has room for a
   cheap check rather than new-country research.
6. **Thomas's own framing going in** — he does not know these countries'
   government structures and expects colonial influence; both the
   discretionary-Gazette-notice mechanism (South Africa) and the
   never-colonised woreda-federal structure (Ethiopia, flagged as a
   priority item, not yet researched) are worth explaining plainly in
   whatever session tackles them, not just minting silently.

---

# How to write the next hand-off

**Adopted wholesale for this branch 2026-08-10, following `AU`'s and
`NZ`'s precedent of adopting the EU spec verbatim — copy this whole
section into every successor**, so the chain never depends on one file
surviving. It is the spec, not an example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `AF/`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `AF/`.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `AF/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py AF/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). `python3 scripts/handoff-to-json.py`
  with no arguments rebuilds every sidecar across all branches (`BRANCHES` in
  the script now includes `"AF"`); `--check` reports which are stale without
  writing. **If you are ever unsure whether the sidecar is current, just
  re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.
- **This branch's priority lists are plain-numbered**, not the EU's lettered
  A–G convention — following `AU`'s and `NZ`'s precedent. The sidecar
  script's priority parser falls back to numbered/bullet lists automatically
  when no lettered blocks are found.

## Required structure, in this order

```
# G.<n>.md — Africa galaxy hand-off

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
agent must be able to read this section alone and know what to read next.

**Session conditions** — what constrained the work: session type, what tooling
was available, what did not arrive, what was left untouched by instruction.
**State plainly which sources you read in full**, because everything
downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Quote verbatim;
`Research.1.md` §2/§3 apply here exactly as they do to research output.

**Secondary observations** — real but low-priority. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. A session that finds a predecessor wrong and does not record it
here has actively damaged the corpus.

**Thomas's stated priority for the remaining work** — the numbered list carried
forward from the predecessor, edited to reflect what moved. Mark items **no
longer needed** explicitly and say why, rather than deleting them silently.

**Cheap checks still outstanding** — ordered by value per unit effort, each one
a single lookup.

**What to pass at the start of next thread** — the packing list. If the next
agent has filesystem access, say so and keep the list anyway; it doubles as an
index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement.
- **Distinguish inference from documented fact,** and say which narrow respect
  is still inference.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict
  and pick neither; `Research.1.md` §3 is explicit that adjudication is not
  the research role.
- **Do not pad.** These files are dense because every line earns its place.
