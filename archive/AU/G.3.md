# G.3.md — Australia/SAO galaxy hand-off

Date: 2026-08-07
Governing briefs: `Research.1.md` (root) — read in full this session, including
the 2026-08-07 caveat-notes and branch-numbering decisions. `AU/G.1.md` and
`AU/G.2.md` — both read in full.
Predecessor: G.2.md (2026-08-07, earlier the same day).

## Orientation — if you are a new agent, start here

Unchanged in structure from `AU/G.1.md` — read its Orientation first if you
have not. This session executed the branch's standing priority 2 (**a second
Australian state: Victoria**) and closed it. The corpus grew 346 → **354
reports**, 405 → **415 dependencies** (8 new nodes, 10 new edges, all in
`src/data/research/au-government-finance.json`). `npm run check` and `npm run
validate` both exit 0.

The branch now has: federal (CGC, now with two directly-verified edges),
two states by two different documentary routes (Tasmania's methodology manual,
middle confidence; **Victoria's Annual Allocation Report, fully
directly-verified, both parts**), the NSW valuation chain, and two exemplar
councils' documents. The AU id list in `Research.1.md` §9 is now stale (11
ids; 19 exist) — whoever backfills should re-run the extraction per that
section's own instruction rather than append by hand.

## Session conditions — read this first

Cloud session with the repository mirrored into a container for editing and
validation; Thomas's browser reachable through the Claude-in-Chrome bridge.
That mattered, because this session's tooling situation was *worse* than
G.2's in one respect and the workaround is worth its own paragraph: the
container's own HTTP client is Cloudflare-challenged by
`localgovernment.vic.gov.au` (G.1's 403 era, back in a different costume),
and the browser bridge **blocks base64-encoded tool output**, so a fetched
DOCX cannot be relayed out as bytes at all. What worked: **do the extraction
inside the browser page itself** — `fetch()` the DOCX same-origin in page
context, parse the ZIP central directory in JavaScript, inflate
`word/document.xml` (and `footnotes.xml`) with `DecompressionStream`, walk
the XML in document order (paragraphs AND tables — G.2's `python-docx`
warning applies identically here), inject the resulting plain text into the
page DOM, and read it out with the page-text tool in ~50k-character chunks.
Byte-for-byte extraction of the actual file, no AI-summarising reader
anywhere in the path. Confirmed working on both `localgovernment.vic.gov.au`
and `cgc.gov.au`.

**Read in full this session, directly**: the VLGGC Annual Allocation Report
2025-26, Part 1 (all six sections — 76k characters of extracted text) and
Part 2's entire structural content — the appendix table of contents, **the
whole of Appendix 4L "Data Sources"**, and **the whole of Appendix 5F "Data
Sources"**. Also the CGC's "Socio-economic status" methodology chapter,
complete, including all eight footnotes. **Not read**: Part 2's per-council
numeric tables (appendices 1–3, the 4A–4K raw-data/index tables, 5A–5E road
tables) — searched and sampled, not transcribed; they are allocation
outputs, not sources. The Victorian Local Government Grants Commission Act
1976 itself was NOT read — every claim about it here is the report's own
characterisation, and the node's description says so.

Verified live on their own pages: ABS "Regional population" (confirms
"previously used catalogue number 3218.0"), ABS "Building Approvals,
Australia" (cat 8731.0 in page metadata), the DSS demographics dataset on
data.gov.au (quarterly, now titled "DSS Benefit and Payment Recipient
Demographics"), and the Federal Register of Legislation entry for the Local
Government (Financial Assistance) Act 1995 (series C2004A04936).

## Headline result

**The VLGGC's "AGENCY ONLY" verdict was an artifact of reading only half the
document.** Part 1 names agencies (G.1 and G.2 were right about that half);
Part 2's Appendix 4L is a per-adjustor data-sources table naming titled
releases with catalogue numbers, table numbers and release dates — ABS
"Regional Population Growth, Australia (cat no. 3218.0)", SEIFA "2033.0 ...
released 27 April 2023", "Buildings Approvals, Australia ... (cat no.
8731.0)" [sic], "DSS Payment Demographic Data" with its data.gov.au URL, six
distinct Census 2021 TableBuilder extracts, and the Commission's own
"Accounting & General Information Questionnaire". That is the
strongest evidence class this project recognises (`Research.1.md` §7: "a
document that names its own inputs in a table"), and it converts the
branch's longest-deferred lead into eight nodes and ten edges in one pass.
The method lesson is now recorded as a caveat on the headline edge: **when a
report ships as methodology-prose + data-appendix, read the appendix before
recording AGENCY ONLY.** Victoria thereby becomes the corpus's
best-evidenced Australian state — a stronger Appendix-F-style source table
than anything found for Tasmania or NSW so far.

## Findings

### 1. Appendix 4L resolves every major general-purpose-grant adjustor to a named source

**What this rests on**: direct byte-for-byte extraction of Part 2 (see
Session conditions). The full source table, in the JSON's ten new
edge/dropped records, with each 4L row quoted verbatim. Titled and minted:
ABS Regional population (`au-abs-regional-population` — cited by its former
title with cat no. 3218.0), the Census via six TableBuilder extracts
(`au-abs-census`), SEIFA (existing `au-abs-seifa`), DSS payment demographics
(`au-dss-payment-demographics`), ABS Building Approvals
(`au-abs-building-approvals`), and the Commission's own annual council
questionnaire (`au-vlggc-agi-questionnaire`, a terminus, reason
`unpublishable` — the Victorian analog of the CRA PD7). Named but not
mintable, all recorded in `_dropped`: Tourism Research Australia's visitor
surveys ("(unpublished data)" LGA cut), ARIA+ 2016 (Hugo Centre,
"(unpublished data)"), DELWP fire/flood property extracts (December 2017,
no title), Standards Australia's climate zones and sub-grade categories
(institution named, no standard cited), and Google Maps ("calculation of
distance").

### 2. The statutory spine is stated in the report's own words, and both Acts are now nodes

**What this rests on**: Part 1 read directly. Section 1 "Legislation" names
both Acts with their exact functions; the transmittal letter fixes the
reporting obligation to "Section 17 of the Victorian Local Government Grants
Commission Act 1976"; section 4 quotes all six national principles under
"The Commonwealth Local Government (Financial Assistance) Act 1995 requires
that the allocation of general purpose grants to local government bodies
(councils) conforms with the relevant national distribution principles".
`au-lgfa-act-1995` (which G.1 had read at s.3/s.4A/s.6 but never minted) and
`au-vlggc-act-1976` are now nodes, each carrying a
`methodology_depends_on` edge from the report. One trap logged: the
Victorian Act was renamed — legislation.vic.gov.au titles it "Victorian
Local Government Grants Commission Act 1976" while the URL slug preserves
the original "victoria-grants-commission-act-1976".

### 3. The CGC now has a directly-verified SEIFA edge, from a chapter read end-to-end

**What this rests on**: the CGC "Socio-economic status" chapter DOCX,
downloaded from cgc.gov.au by G.2's publisher-DOCX route and byte-for-byte
extracted, footnotes included. Table 2 ("Data used in the socioeconomic
status assessment") lists source "Australian Bureau of Statistics (ABS)
Census of Population and Housing", data "SocioEconomic Indexes for Areas"
and "Custom TableBuilder extracts", updated "5-yearly following release of
census data"; footnote 3 pins the specific index (IRSD); footnote 5 cites
the SEIFA methodology publication. New edge `au-cgc-gst-relativities` →
`au-abs-seifa` (uses_data_from), plus a documented-third-party
`au-abs-seifa` → `au-abs-census` (calculated_from) edge flagged for
re-anchoring to ABS's own methodology page by a future session.

### 4. NISEIFA is resolved: not mintable — and the CGC contradicts itself about who makes it

**What this rests on**: the same chapter, plus external search (strings:
NISEIFA; "Non-Indigenous Socio-Economic Index"; with ABS/CGC qualifiers —
only CGC methodology material and a 2008 ABS Methodological News mention
surface). The chapter states "Non-Indigenous SEIFA data is produced by the
Commission. It follows the published methodology for SEIFA, but only
includes non-Indigenous people in the censusbased component indicators", and
its Table 1 notes tag NISEIFA "(CGC)". No title, no cadence, no standalone
publication — fails §4 twice over; the `_dropped` entry is rewritten from
`no-node-yet` to `no-document` accordingly. The bonus finding, recorded not
reconciled: the Population chapter says NISEIFA "was developed for the
Commission by the ABS"; this chapter says the Commission produces it. Two
chapters of the same publication, both read directly, disagreeing about the
producer — the same internally-inconsistent-source shape as the ABS GFS
methodology page in G.1's Secondary observations.

## Secondary observations (logged, low priority)

- **The in-browser relay budget is ~50k characters per page-text call**, and
  base64 in any tool output is blocked outright by the bridge. For a 76k-char
  document that means two overlapping reads; for a 226k-char one, targeted
  index-then-slice beats sequential chunking. The `window.__show(key,start,end)`
  inject-and-read pattern in this session's history is directly reusable.
- **Appendix 4L cites the same ABS release under two vintages** — ERP "at 30
  June 2024, released 27 March 2025" for the major cost driver, but the Age
  by Sex customised report "at 30 June 2023 (p)" for Aged Pensioners and
  Population <6 — and cites SEIFA under a slightly wrong title
  ("Socio-Economic Indexes of Australia"). Quoted verbatim in the JSON, not
  tidied.
- **`Building Approvals` has no fitting `Domain`** — filed under
  `assessment` with a flag in the node description. If a construction/housing
  domain is ever added to the union, this node is its first customer.
- **The 2025 Federal Budget is named as the pool's origin** ("contained an
  initial estimate of the total allocations to Victorian councils") and no
  Commonwealth Budget node exists anywhere in the corpus — recorded as a
  `no-node-yet` lead; an `au-federal-budget` node would give this branch its
  federal fiscal anchor and immediately collect this edge.
- `scripts/handoff-to-json.py`'s plain-numbered-priorities gap (G.2 Secondary
  observations) is still unfixed; this file will produce an empty
  `priorities` array in its sidecar too. Cosmetic; the Markdown is the
  document of record.

## Corrections to prior sessions

1. **`AU/G.1.md` Finding (VLGGC characterisation) and `AU/G.2.md` Finding 3 —
   confirmed for Part 1, completed and materially changed by Part 2.** "AGENCY
   ONLY throughout: no titled ABS or Valuer-General release is named anywhere
   in Part 1" remains true and directly confirmed. But the report's
   disclosure lives in Part 2's Appendix 4L, which neither prior session
   read. The corpus-level characterisation of the VLGGC as AGENCY ONLY is
   withdrawn — see the caveat entry on
   `au-vlggc-annual-allocation-report -> au-abs-regional-population`.
2. **`AU/G.2.md` Correction 1, second half — overstated.** G.2 was right that
   the "ABS (2021), Census of Population and Housing, Socio Economic Indexes
   for Areas, Australia, released 27 April 2023" footnote does not exist in
   the Population chapter. But its explanation — that the citation "concerns
   SEIFA... covered in the CGC's separate Socio-economic status chapter" —
   does not survive reading that chapter: no such citation appears there
   either. The SES chapter's actual SEIFA citation (footnote 5) reads
   "Australian Bureau of Statistics, Socio-Economic Indexes for Areas
   (SEIFA), Australia methodology, ABS, 2021, accessed 13 August 2024" —
   different wording, no release date. The proxy-reader's citation was a
   plausible *fabrication* assembled from true parts (SEIFA 2021 really was
   released 27 April 2023 — the VLGGC's own 4L row confirms that date
   independently), not a quote misplaced from another chapter. That is a
   worse failure mode than misattribution, and strengthens the standing
   direct-read rule.
3. **`AU/G.1.md` priority 2's premise — landed.** G.1 predicted Victoria
   would be the natural second state; G.2 predicted it was the
   lower-effort choice. Both correct: one session sufficed, and the result
   out-evidences the Tasmania pass that preceded it.

## Thomas's stated priority for the remaining work

Carried from G.2, renumbered around what closed:

1. ~~A second Australian state~~ — **DONE this session (Victoria).** See
   Findings 1–2.
2. **A second Australian council** — unchanged, still the four 403'd NSW
   Revenue Policy PDFs (Tamworth, Yass Valley, Federation, Wollongong);
   retry with the DOCX-swap trick, or the in-browser extraction route if
   Cloudflare is the blocker.
3. **The Victorian valuation chain** — new, this session's own gap: the
   report computes standardised rate revenue from a capital-improved-value
   base and thanks the Office of the Valuer-General, but names no titled
   valuation release (see the new `_dropped` entry). Valuation of Land Act
   1960 (Vic) + Valuer-General Victoria's annual general valuation would be
   the NSW-parallel pass, and would let Victoria match NSW hop-for-hop.
4. **Whether to mint an `au-federal-budget` node** — Thomas's call; see
   Secondary observations. Cheap to do, immediately collects one documented
   edge, and every other AU fiscal document will eventually want it.
5. Carried unchanged from G.1/G.2: the NSW Grants Commission methodology
   manual search (still not confirmed exhaustive), and the `au-abs-gfs`
   node-split question.

## Cheap checks still outstanding

1. **Re-anchor `au-abs-seifa -> au-abs-census`** to ABS's own SEIFA
   methodology page (one fetch; the edge currently rests on the CGC's and
   VLGGC's third-party statements, flagged in its own basis).
2. **Tourism Research Australia** — mint the National/International Visitor
   Survey if it has a clean publication cadence; the 4L citation and flag
   are already written (see `_dropped`).
3. **ARIA+** — one search: does the remoteness structure have a citable
   published home (ABS republishes remoteness areas built on it)?
4. **The 2026-27 VLGGC edition, when it appears (September 2026)** — check
   whether the Vicmap road-data transition has happened (the `deferred`
   entry documents the announced future dependency and what changes if it
   lands).
5. **A Tasmania methodology → `au-lgfa-act-1995` edge** — the Tas manual
   almost certainly names the Act; one targeted quote would connect the
   branch's two state nodes to its new statutory spine and upgrade the Tas
   slice's confidence tier while there.
6. Carried from G.2: read VLGGC Part 2's numeric appendices properly if ever
   needed (not needed for edges); NSW council Revenue Policies (now priority
   2); `au-abs-gfs` split.

## What to pass at the start of next thread

If the next agent can read the folder, pass nothing — point it at this file.

1. This file (`AU/G.3.md`), plus `G.2.md` and `G.1.md`, in reverse order.
2. `Research.1.md` — unchanged this session; note its §9 AU id list is now
   stale (11 of 19 ids).
3. `src/data/research/au-government-finance.json` — the `_dropped` array now
   carries every open Victoria lead with its quote already extracted.
4. A browser, plus BOTH document tricks this branch has accumulated: (a)
   G.2's publisher-DOCX swap for unscriptable PDFs; (b) this session's
   in-browser ZIP-extraction relay for when the container itself is
   Cloudflare-blocked and base64 relay is unavailable (see Session
   conditions for the full recipe).
5. The standing caution, now with a sharper edge: prefer direct extraction
   over AI-summarising readers — this branch has caught one of them
   *fabricating a plausible citation from true parts* (Corrections 2), which
   no spot-check of components would have caught, only a full direct read.

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
