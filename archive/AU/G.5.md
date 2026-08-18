# G.5.md — Australia/SAO galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` §4 (recurring-vs-one-off node shape,
cadence-preferred-not-required) read in relevant part this session, carried
over from EU-branch work done earlier the same day. `AU/G.4.md` read in
full as this branch's current template and priority list. This session
also did EU-branch work first (see `EU/G.76.md`) before Thomas directed
"start au" — the validator/import mechanics used here are identical to
that session's, not re-derived.
Predecessor: `G.4.md` (2026-08-08).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. Ask Thomas if you need git state.
2. **This branch's priority list is plain-numbered**, not the EU's lettered
   A–G convention.
3. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Standing rule, unchanged.
4. **Priority item 2 (a second Australian council) is still blocked** —
   this session re-confirmed, did not newly discover, that all four NSW
   council Revenue Policy PDFs named in `G.2.md`/`G.4.md` remain
   inaccessible, each for a distinct and now precisely-identified reason
   (Finding 1). Do not retry these four with `curl` or the DOCX-swap trick
   again without a new angle — both are exhausted against all four.
5. **Priority item 3 (the Victorian valuation chain) is done this
   session** — see Finding 2. Two nodes minted: `au-vic-vola1960` and
   `au-vic-vbpsg`.
6. Validator procedure unchanged from the EU branch's established method:
   on the device, `tar czf validate-bundle.tar.gz src scripts package.json
   package-lock.json tsconfig.json`, `device_stage_files` it, extract in
   the cloud sandbox, `npm install --no-audit --no-fund`, then `npx tsc
   --noEmit`, then `npx tsx scripts/validate-data.ts`. The device's own
   `node_modules` is a Windows build and cannot run `tsx` through the
   device bridge.

## Session conditions — read this first

**A research-and-mint session, one AU priority item.** Two things were
attempted: retrying the four blocked NSW council PDFs (not re-solved, see
Finding 1 — this is a documented dead end, not new progress), and
researching + minting the Victorian valuation chain (priority item 3,
succeeded — Finding 2). One file touched: `au-government-finance.json` —
two new report nodes, one new dependency, no `_dropped` entries changed.

**Not read this turn**: `REPORTS.md`, `BACKLOG.md`, any AU file besides
`au-government-finance.json` and `G.4.md`. The rest of
`au-government-finance.json`'s pre-existing 20 reports and 17 dependencies
were grepped for structure (to match the existing NSW valuation chain
"hop-for-hop," per Thomas's own phrasing) but not re-verified.

Primary sources for Finding 2 were fetched directly this session: the
Valuation of Land Act 1960 (Vic) full consolidated text (via a third-party
mirror, since the two direct sources were both blocked — see below) and
the Valuer-General Victoria's 2025 Valuation Best Practice Specifications
Guidelines PDF (fetched directly from `land.vic.gov.au`, no blocking
encountered).

## Headline result

**The Victorian valuation chain (AU priority item 3) is minted, matching
NSW's chain shape but with one deliberate structural difference the
sources justify rather than force**: NSW's chain names a specific external
data-source registry (NSW Land Registry Services) as its second hop
because a council's own page names it explicitly; Victoria's equivalent
source material does not name any specific registry (the Valuer-General's
own valuation-process page lists data categories — sales, inspections,
permits, zoning, title records — without naming a specific database), so
the second hop here is instead the Valuation Best Practice Specifications
Guidelines (VBPSG), the methodology document the Act itself directly and
explicitly requires (s.5AA). This is not a downgrade in rigor — it is what
"verify, don't force a parallel structure" actually produces when the two
states' public records differ in what they name.

Priority item 2 (a second AU council) is **not** advanced — the four
blocked NSW councils remain blocked, now for individually confirmed
reasons rather than a single generic "403."

## Findings

### 1. The four blocked NSW council PDFs are exhausted against every method tried; each fails for a distinct, now-confirmed reason

*What this rests on*: direct `curl` fetches (with a real User-Agent) of
all four councils' Revenue Policy documents in both PDF and, where
applicable, DOCX form this session; a Claude-in-Chrome browser navigation
attempt against Wollongong's PDF.

- **Tamworth** (Elcom CMS): both `.pdf.aspx` and `.docx.aspx` return an
  identical hard 403, "Elcom | Something went wrong. Error 403" —
  confirmed this is a request-pattern block, not a content-type block, so
  the DOCX-swap trick (which worked against `cgc.gov.au` and
  `localgovernment.vic.gov.au` per `G.2.md`) does not apply here.
- **Yass Valley** and **Federation Council**: both return an
  Akamai-style "Access Denied" page. Federation Council's `ipart.nsw.gov.au`
  mirror was also tried and failed at the connection level (HTTP 000, no
  response) rather than with a 403.
- **Wollongong**: blocked from `curl` by a Cloudflare "Just a moment..."
  JS challenge, but a **real browser session (Claude in Chrome) passes the
  challenge** — confirmed by the resulting tab's title matching the actual
  PDF filename. This is a genuine partial win with a hard limit behind it:
  Chrome's built-in PDF viewer renders the fetched document at a
  `chrome-extension://` URL, and every extraction tool available this
  session (`get_page_text`, `read_page`, `computer` screenshot/click/type)
  explicitly refuses to interact with browser-internal URLs. A
  `docs.google.com/viewer?url=...` proxy was tried as a workaround and
  returned "No preview available" — Google's own fetcher could not or
  would not retrieve it either.

**Net effect: no new access method exists this session that didn't exist
in `G.4.md`.** The Wollongong browser-challenge-pass is worth recording
precisely because it is *almost* a solution — the remaining gap is a tool
limitation (no extraction path for an in-browser PDF viewer), not a
network block, and would be worth revisiting if a different PDF-extraction
route becomes available in a future session.

### 2. The Victorian valuation chain is minted: `au-vic-vola1960` and `au-vic-vbpsg`

*What this rests on*: the Valuation of Land Act 1960 (Vic)'s own
consolidated text, fetched and read directly this session; the Valuer-
General Victoria's 2025 VBPSG PDF, fetched and read directly this session;
the Victorian government's own "valuation process" page, fetched and read
this session for corroborating context (not used as a citation source for
any specific claim in the minted nodes).

**Access note, since it is itself informative**: the official source,
`legislation.vic.gov.au`, returned its landing page (200 OK) but is a
JS-rendered single-page app whose raw HTML does not yield section text to
regex extraction. The AustLII mirror (`austlii.edu.au`) is Cloudflare-
blocked in this environment, the same block class documented for Wollongong
above. The full consolidated Act text was instead retrieved from a
third-party legal mirror, the FAO Legal Office's own legislation database
(`faolex.fao.org/docs/pdf/vic45844.pdf`), converted with `pdftotext
-layout`. This is a genuine substitution of source, not the primary
legislative repository, and is flagged as such in the minted node's own
`description` field.

- **`au-vic-vola1960`** — Valuation of Land Act 1960 (Vic). Direct quote,
  s.11 (as substituted by No. 69/2011 s.53): a valuation authority must
  "cause a general valuation of rateable land within an area to be made as
  at 1 January in each calendar year" and, "before 30 April that year,"
  cause it to be returned and provided to the relevant council. This is a
  genuinely annual statutory cycle — a real point of difference from NSW,
  where the 1916 Act requires annual ascertainment in principle but
  current council practice runs a three-year operational cycle
  (`au-vola1916`'s own `cadence_note`, unchanged this session). Victoria's
  own valuation-process page states the Valuer-General has been the sole
  valuation authority for all 79 Victorian councils since 2023 — quoted in
  the node's `cadence_note` as corroborating context, not as the basis for
  the cadence figure itself (the cadence figure rests on s.11 directly).
  `releases_per_year: 1`.
- **`au-vic-vbpsg`** — Valuation Best Practice Specifications Guidelines.
  Direct quote, s.5AA(1): "The valuer-general must prepare the Valuation
  Best Practice Specifications Guidelines at the commencement of every
  revaluation." The 2025 edition (published 27 September 2024) states it
  is the seventh edition, building on a "Valuation Best Practice"
  tradition dating to 1998 — read from the PDF's own foreword, not
  asserted from the title alone. `releases_per_year: 1`, following
  directly from s.5AA plus s.11's annual revaluation cycle — the two
  sections together fix the cadence without needing a separate edition-
  interval estimate the way some other files in this corpus have had to
  use for irregular publications.
- **One dependency**: `au-vic-vbpsg` → `methodology_depends_on` →
  `au-vic-vola1960`, evidenced by the s.5AA quote above, read from the
  Act's own text independently of the VBPSG document's own foreword
  language about its statutory basis.

**Deliberately not minted**: a Victoria-specific analog to NSW's Land
Registry Services second hop. The Victorian valuation-process page lists
several data categories (transaction data, inspection records, permit and
zoning information, title records) feeding the annual valuation but does
not name a specific registry the way NSW's council page names NSW LRS.
Minting a `au-vic-land-registry`-style node here would mean asserting a
structural parallel the sources do not actually support — noted here so a
future session does not treat this gap as an oversight.

## Secondary observations (logged, low priority)

- Corpus count after this session's mint, confirmed by an actual validator
  run (not agent arithmetic): **502 reports / 609 dependencies / 3
  relations** — up from 500/608/3 recorded the same day in `EU/G.76.md`
  (after `no-kommune-arsregnskap` was minted for OPEN-THREADS 2.9), itself
  up from 473/605/3 recorded earlier the same day in `EU/G.74.md`.
- The Wollongong browser-challenge-pass / `chrome-extension://`
  extraction-tool gap (Finding 1) is a genuine, reproducible environment
  limitation worth flagging to Thomas directly rather than just noting
  here — if a future session has a different browser-automation toolset
  (one that can read a rendered PDF viewer's content, or one that can
  force Chrome to download rather than render inline), Wollongong becomes
  solvable without any new network-level workaround.

## Corrections to prior sessions

**None.** Nothing in `G.4.md` or earlier was found wrong this session.
`G.4.md`'s framing of both priority items 2 and 3 held up exactly as
stated — item 2 was accurately described as blocked and remains blocked
for reasons now individually confirmed rather than assumed; item 3 was
accurately scoped as "Valuation of Land Act 1960 (Vic) + Valuer-General
Victoria's annual general valuation" and both halves of that scope are
now minted.

## Thomas's stated priority for the remaining work

Carried from `G.4.md`, updated for this session:

1. ~~A second Australian state~~ — done, `G.3.md` (Victoria).
2. A second Australian council — **still unchanged, still blocked**. All
   four NSW Revenue Policy PDFs (Tamworth, Yass Valley, Federation,
   Wollongong) confirmed exhausted against `curl`, the DOCX-swap trick,
   and real-browser navigation this session (Finding 1). The one narrow
   remaining angle (Wollongong's PDF, fetchable via browser but
   unextractable by any tool available this session) is noted above as a
   tooling gap, not a research gap.
3. ~~The Victorian valuation chain~~ — **done this session** (Finding 2):
   `au-vic-vola1960` and `au-vic-vbpsg`, one dependency between them.
4. Whether to mint an `au-federal-budget` node — Thomas's call, unchanged
   from `G.3.md`/`G.4.md`. Not raised with Thomas this session; still
   open.
5. Carried from `G.1.md`/`G.2.md`: the NSW Grants Commission methodology
   manual search (not confirmed exhaustive), and the `au-abs-gfs`
   node-split question. Not attempted this session.

## Cheap checks still outstanding

Carried from `G.4.md`, unchanged (none of this session's work touched
these items):

1. Re-anchor `au-abs-seifa -> au-abs-census` to ABS's own SEIFA methodology
   page. Not attempted.
2. **Domestic Tourism Statistics (DoTS)** — mint if a clean citable
   landing page exists (per `G.4.md` Finding 1: NVS is retired, DoTS is
   its replacement). Not attempted this session.
3. **ARIA+** — still open per `G.4.md` Finding 2. Not attempted this
   session.
4. The 2026-27 VLGGC edition (expected September 2026) — check whether the
   Vicmap road-data transition happened. Not yet due.
5. A Tasmania methodology → `au-lgfa-act-1995` edge — one targeted quote.
   Not attempted.
6. `au-abs-gfs` split — carried, not attempted.

## What to pass at the start of next thread

1. **This file**, then `G.4.md`, `G.3.md`, `G.2.md`, `G.1.md` in reverse
   order.
2. **`src/data/research/au-government-finance.json`** — now 22 reports, 18
   dependencies. The two new nodes (`au-vic-vola1960`, `au-vic-vbpsg`) sit
   at the end of the `reports` array; the new dependency at the end of
   `dependencies`.
3. **Thomas's next-in-order instruction** ("start au and then we will look
   at the africa file, then beyond europe") — this file closes out the AU
   leg for now (priority item 2 stays legitimately blocked, item 3 is
   done). The next agent should move to "the africa file"
   (`country afrikans.docx`, identified in `EU/G.69.md` — raw, unprocessed
   CPI-indexation/social-benefit research for seven African countries plus
   a continent-wide overview, deliberately left untouched by a prior
   session, now to be revisited with Thomas's explicit go-ahead), then
   OPEN-THREADS 2.8 (beyond-Europe: Chile's SII avalúo fiscal, then
   Colombia/Peru, then item 27's nineteen jurisdictions starting with the
   Crown Dependencies).
4. **The standing caution from `G.3.md`, still live**: prefer direct
   extraction over AI-summarising readers.
5. **The Wollongong tooling gap** (Finding 1) — worth surfacing to Thomas
   directly if a future session gets a different browser-automation
   toolset, since the network-level block is already solved and only
   extraction is missing.

---

# How to write the next hand-off

**Added 2026-08-04 in `EU/`; adopted wholesale for this branch 2026-08-07
(Thomas, via the decisions doc) — copy this whole section verbatim into
every successor**, so the chain never depends on one file surviving. It is
the spec, not an example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `AU/`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `AU/`.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `AU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py AU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). `python3 scripts/handoff-to-json.py`
  with no arguments rebuilds every sidecar across all three branches;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.
- **This branch's priority lists are plain-numbered**, not the EU's lettered
  A–G convention — that lettering is EU's own history and does not carry
  (`Research.1.md`, decided 2026-08-07). The sidecar script's priority parser
  falls back to numbered/bullet lists automatically when no lettered blocks
  are found.

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
