# G.2.md — Australia/SAO galaxy hand-off

Date: 2026-08-07
Governing briefs: `Research.1.md` (root, general rules §§1–11) — read in full.
`AU/G.1.md` — read in full, this session's direct predecessor.
Predecessor: `AU/G.1.md` (2026-08-06).

## Orientation — if you are a new agent, start here

Unchanged from `AU/G.1.md` — read that file's own Orientation section first if
you have not. This session did not restructure anything; it re-verified two
of G.1's own gated leads and corrected one of G.1's own extraction errors.

**Where things are, as of 2026-08-07 (end of session):** the corpus is at
346 reports / 405 dependencies / 3 relations (unchanged by this session —
no new node or edge was minted, only confidence upgrades on two existing
items and two new `_dropped` leads). `npm run check` and `npm run validate`
both exit 0.

## Session conditions — read this first

Picked up directly from Thomas naming this branch's P1 item: "AU — get past
the CGC wall, then a second state." This session addressed the first half
only. **The second state (Victoria or NSW) was not started** — see
Thomas's stated priority, below.

**What was read in full this session, and how**: the CGC's "Population"
methodology chapter and the VLGGC's 2025-26 Annual Allocation Report
(Part 1), both downloaded as `.docx` via a real browser and extracted
byte-for-byte with `python-docx` (paragraphs *and* table cells — the VLGGC
report's entire body sits inside Word tables, which a naive
paragraphs-only extraction misses almost completely; this cost one dead
end before it was caught). Also read directly: the CGC's publications page
(`cgc.gov.au/publications/commissions-assessment-methodology`) and the
Victorian Commission's landing and publications pages
(`localgovernment.vic.gov.au`), both plain HTML, no gating encountered.

**What was tried and did not work, worth recording so a future session
does not repeat it**: `cgc.gov.au`'s PDFs render inside Chrome's own
built-in PDF viewer (a `chrome-extension://` page) rather than downloading
— a genuinely different failure from G.1's forced-download dialog, and one
no browser-automation content-reading tool can script into, because Chrome
does not let one extension read another's DOM. Google's document viewer
(`docs.google.com/viewer?url=...`) was tried against the same PDF and
returned "No preview available" — a dead end, not attempted further. An
AI-summarising fetch tool *did* get through to the PDF's content and its
answers were substantively correct, but it also **introduced an error**
(see Corrections, below) — consistent with this project's own standing
warning against AI-summarising reads for anything that becomes a quoted
`basis`. The fix that actually worked: the CGC publishes every methodology
chapter in both PDF and DOCX side by side, and the DOCX triggers a genuine
file download rather than an in-browser viewer. The same trick resolved
the VLGGC document, which also ships PDF and DOCX in parallel.

## Headline result

**Both of G.1's gated leads are now directly readable, via the same fix:
when a government PDF is unscriptable in-browser, check whether the same
publisher also ships a `.docx` of the same document.** Neither `cgc.gov.au`
nor `localgovernment.vic.gov.au` actually blocks automated access the way
G.1's session conditions suggested (TLS resets, 403s) — this session hit
neither. What blocks it is Chrome's own PDF handling, a client-side wall
that a same-publisher format swap gets around entirely. Worth trying
first, before more exotic fetch methods, anywhere else in this corpus a
PDF has resisted reading.

## Findings

### 1. The CGC's core Estimated Resident Population quote is confirmed verbatim, with exact location, and no attached footnote

**What this rests on**: the CGC Population chapter's DOCX, downloaded
directly and extracted with `python-docx` — a raw byte-for-byte read, not
an AI summary. Population chapter, "Estimated Resident Population"
section, its opening sentence: *"The population data used in the
estimation of GST relativities is Estimated Resident Population, produced
by the ABS."* No footnote is attached to this sentence, or to the words
"Estimated Resident Population" within it — confirmed by reading the
paragraph and its immediate neighbours directly, not inferred. The edge
`au-cgc-gst-relativities` → `au-abs-erp` is updated in the JSON to VERIFIED
DIRECTLY on this basis, evidence_url repointed at the DOCX (the document
actually opened, per `Research.1.md` §6's own instruction).

### 2. A second, genuine citation was found in the same chapter, distinct from the footnote G.1 reported

**What this rests on**: the same DOCX. Figure 1 ("Age structure of state
populations, June 2023") carries its own source note: *"Source: ABS,
National, state and territory population, December 2023."* This is a real,
titled ABS release, and it is the same release `au-abs-erp`'s own `url`
already points at (`abs.gov.au/statistics/people/population/national-state-and-territory-population`).
It is attached to the age-structure figure specifically, not to the general
ERP statement in Finding 1 — recorded in the edge's `basis` as corroboration,
not folded into the main quote.

### 3. The VLGGC's Annual Allocation Report is confirmed, directly, as AGENCY ONLY — G.1's characterisation holds

**What this rests on**: the VLGGC 2025-26 Annual Allocation Report Part 1
DOCX, downloaded directly (`localgovernment.vic.gov.au`'s 403 from G.1 did
not reproduce this session — see Session conditions) and extracted in full,
including table cells. The Acknowledgements section thanks, by name:
*"Commonwealth Grants Commission"*, *"Office of the Valuer-General"*,
*"Australian Bureau of Statistics"*, *"Commonwealth Department of Human
Services (Centrelink)"* and *"Tourism Research Australia."* Section 4
states: *"Major inputs for the 2025-26 allocation include Australian
Bureau of Statistics' population estimates, valuations data and the most
recent information on council expenditure and revenue,"* and separately:
*"the available general purpose grants pool for Victorian councils
represents, on average, $87.69 per head of population (using ABS
population estimates as at 30 June 2024)."* Agency named repeatedly,
specifically, and with a date in the last case — but no titled release
anywhere in Part 1. G.1's proxy-reader report of this same document turns
out to have been accurate in substance; this session upgrades it from
reported to directly confirmed, and the `_dropped` entry now says so.
Part 2 (the per-council data appendix) was not read this session.

### 4. A new, unbuilt lead: NISEIFA, an ABS index built for the CGC that shares SEIFA's indicators

**What this rests on**: the same CGC Population chapter DOCX as Finding 1.
*"The Non-Indigenous Socio-Economic Index for Areas (NISEIFA) was
developed for the Commission by the ABS. This index uses the same
indicators as the Socio-Economic Indexes for Areas (SEIFA) Index of
relative socio-economic disadvantage."* Not built into an edge: NISEIFA has
no node yet, and "uses the same indicators as" sits close enough to the
`Research.1.md` §5a comparability trap that it deserves a second look
before minting rather than a same-session build. Recorded as a
`no-node-yet` lead.

## Secondary observations (logged, low priority)

- **`scripts/handoff-to-json.py`'s priority-block parser only recognises
  the EU's lettered `**A — Label**` convention** (see its regex under
  `sec == "Thomas's stated priority for the remaining work"`) and silently
  produces an empty `priorities: []` for a plain-numbered list — which is
  what both this file and `AU/G.1.md` use, per the 2026-08-07
  branch-lettering decision (`Research.1.md` §2: "Branches number their own
  priority lists plainly... The EU branch's A–G lettering is its own
  history and stays"). Confirmed `AU/G.1.json` has the same empty array,
  so this is a pre-existing gap, not something this session introduced —
  the script was evidently never updated after that decision. `cheap_checks`
  parses correctly either way (it does not branch on lettering). Not fixed
  this session — flagged in `MISSION-TODO.md` instead, since it is a code
  fix outside this branch's own scope.
- **A naive `python-docx` paragraph-only extraction silently misses a
  document's entire body when the document is table-laid-out.** The VLGGC
  report's front matter (title page, letter, table of contents) is in
  ordinary paragraphs and extracted fine on the first pass; every
  substantive section — Acknowledgements, the funding figures in Finding
  3, everything — turned out to live inside Word tables, which
  `Document.paragraphs` does not descend into. Worth remembering for any
  future session extracting a `.docx`: check `len(document.tables)` before
  concluding a document is short on content, and walk the body in document
  order (paragraphs and tables interleaved) rather than trusting the flat
  paragraph list alone.
- **Chrome's built-in PDF viewer and a forced-download dialog are two
  different failure modes that both read as "PDF blocked" from the
  outside**, and the fix differs: a forced-download dialog (G.1's
  experience) still gets you bytes, just not a rendered page; an
  in-viewer PDF (this session's experience with the same `cgc.gov.au`
  document) gets you neither, because the render happens inside another
  extension's unscriptable page. Worth distinguishing explicitly in future
  hand-offs rather than lumping both under "gated."

## Corrections to prior sessions

1. **`AU/G.1.md`, Finding 1 — overstated, now corrected.** G.1 reported
   that the CGC's ERP sentence carried "a footnote citing 'ABS (2021),
   Census of Population and Housing, Socio Economic Indexes for Areas,
   Australia, released 27 April 2023' by exact title and release date."
   Directly reading the same chapter this session (see Finding 1, above)
   finds no such footnote anywhere in it. That citation concerns SEIFA — a
   different index, covered in the CGC's separate Socio-economic status
   chapter — and was evidently conflated with the ERP passage by G.1's
   proxy-reader tool, an AI-summarising fetch this project's own standing
   guidance already warns against for exactly this reason
   (`Research.1.md`, "prefer direct fetch + text extraction over an
   AI-summarising fetch tool for anything that will become a quoted basis
   field," carried in G.1's own "What to pass" section). The edge's `basis`
   is corrected in the JSON; no node or edge is removed, since the
   underlying ERP relationship itself is confirmed independently correct.

## Thomas's stated priority for the remaining work

Carried forward from G.1, with item 1 now resolved:

1. ~~Re-verify the Commonwealth Grants Commission material directly~~ —
   **DONE this session.** See Findings 1–2 and Correction 1. The PDF
   itself is still not directly readable (see Session conditions), but the
   DOCX route reaches the same content and the load-bearing quote is now
   VERIFIED DIRECTLY.
2. **A second Australian state** — still open, still the natural next
   step on the Netherlands/UK precedent (at least two member examples
   before generalising). Victoria now has a real advantage over NSW: this
   session confirmed `localgovernment.vic.gov.au` is readable and the
   VLGGC publishes a clean methodology-and-figures report going back to
   2011-12, with both PDF and DOCX for every year since 2013-14. NSW's own
   Grants Commission was searched for and not found in G.1 (cheap check 2,
   still outstanding). Victoria looks like the lower-effort choice now,
   though NSW's property-valuation chain is already the strongest part of
   this branch and a second NSW pass would deepen rather than widen it.
3. **A second Australian council**, unchanged from G.1 — still open,
   still blocked on the same four 403'd Revenue Policy PDFs (worth
   retrying with the DOCX-swap trick this session found, if any of the
   four also publish one).
4. Whether this branch adopts the EU hand-off conventions wholesale —
   still open, still Thomas's call; two sessions of practice now exist to
   judge against (G.1 and this one), if that helps decide.

## Cheap checks still outstanding

1. **Build out a second Australian state** — see priority 2. Victoria is
   now the lower-effort candidate; the VLGGC Annual Allocation Report
   itself (2025-26, `.docx`, both parts downloaded this session — Part 2
   not yet read) is the obvious starting document, the direct structural
   analog to Tasmania's own methodology manual already in the corpus.
2. **Read the VLGGC Part 2 appendix** — per-council data tables, not read
   this session; may or may not contain anything citable beyond what
   Part 1 already gave (Finding 3).
3. **NISEIFA** — see Finding 4. Worth a search for whether it is published
   on its own citable cadence anywhere, or only exists inside CGC working
   papers with no independent title.
4. Carried unchanged from G.1: search directly for a NSW Local Government
   Grants Commission methodology manual (not confirmed exhaustive); retry
   the four 403'd NSW council Revenue Policy PDFs, now with the DOCX-swap
   trick in hand if any offer one; the `au-abs-gfs` node-split question.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`AU/G.2.md`)** and **`AU/G.1.md`** — both, in order; this
   file corrects one thing in G.1 but does not replace its Orientation.
2. **`Research.1.md`** — unchanged this session.
3. **`src/data/research/au-government-finance.json`** — its `_dropped`
   array is the direct continuation point for cheap checks 1–3 above.
4. **A browser, plus the DOCX-swap trick**: when a government PDF won't
   render or won't script, check the same publisher's page for a `.docx`
   of the same document before trying anything more exotic. Confirmed
   working on both `cgc.gov.au` and `localgovernment.vic.gov.au` this
   session.
5. **If extracting a `.docx` programmatically**: check `len(document.tables)`
   before trusting a paragraphs-only read — see Secondary observations.

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
