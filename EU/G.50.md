# G.50.md — EU galaxy hand-off

Date: 2026-08-07
Governing briefs: `Research.1.md` v3.3 — read this session for §2 (the one rule,
plus the 2026-08-07 caveat-note and git-policy boxes), §4, §5a, §5b and §6.
**Not amended by this session**; §9's id list is still stale and is now staler
by five (see Cheap checks 1).
Predecessor: G.49.md (2026-08-05). Two days and three sessions elapsed on other
branches — AU G.2/G.3 and NZ G.5 — between that file and this one.

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.**
The project draws a 3D graph in which every node is a recurrently published
official report and every edge is a *documented* statement that one report
uses another as an input. The whole thing rests on one rule: **if no document
says it, the edge does not exist.**

Read, in this order:

1. **`planning/MISSION-TODO-2.md`** — new since G.49, and now the mission's
   entry point. It indexes all three branches; this file governs the EU one.
   Its P1 item 5 is the item this session worked.
2. **`Research.1.md`** — v3.3.
3. **`G.49.md`**, in full — the immediate predecessor (the UK depth pass).
4. **This file**, in full.
5. **`EU/ESSQualityFramework_PartA_2026-08-07.md`** — this session's extraction
   record. Every quote behind the new slice, with the two NOT FOUND entries.
6. **`EU/slices/eu-level/ess-quality-framework.json`** and its imported twin
   `src/data/research/ess-quality-framework.json`.
7. **`EU/slices/README.md`** — the branch's disclosure-runs-upward finding, now
   with a countercurrent recorded (see Headline).
8. **Everything else unchanged from `G.49.md`'s list.**

**Where things are, as of 2026-08-07:**

- **The corpus is 363 reports / 429 dependencies / 3 relations.** `npm run
  check` and `npm run validate` both exit 0. This session added 5 reports and
  6 dependencies; the other 120 reports added since G.49 are AU and NZ work.
- **The blob's judgment half has been opened.** Twenty-two of the 73 staged
  batches — 16–26, 30–37, 44, 45 and 66 — were about one subject, the ESS
  quality-and-metadata standards stack, and no session had ever built any of
  it. They are now built. **51 batches remain.**
- **The staging records were used to locate documents, not as evidence.**
  Every quote in the new slice was re-fetched and re-read this session. This is
  the discipline `MISSION-TODO-2.md`'s method notes require and it paid twice
  (see Findings 2 and 4).

## Session conditions — read this first

**Extraction-and-build session**, one branch only, on a working copy in a cloud
container synced from the device's git HEAD (`1c5905a`) before starting and
committed back after. Thomas picked the item from a menu at the top of the
session and confirmed Chrome was available; he approved the slice before it was
written to disk, per `_staging/PROMPT-for-splitting-agent.md`'s "wait for my
go-ahead" rule, and made the one judgement call the slice needed (mint
`sdmx-glossary` on observed-version cadence rather than shelve it).

**What was read in full this session**: the European Statistics Code of Practice
2017 PDF (11 pages, `pypdf`); the ESS Quality Assurance Framework V2.0 PDF (58
pages, `pypdf`); the ESS Handbook for Quality and Metadata Reports 2021
re-edition PDF (316 pages, `pypdf`); the SIMS 2.0 revised-standards PDF
(9 pages, `pypdf`); the SDMX Content-Oriented Guidelines Introduction, February
2016 (18 pages, `pypdf`); the 2021 ESGAB Annual Report PDF (44 pages, `pypdf`);
and, HTML-tag-stripped from `curl` output, five Eurostat pages (reference
metadata reporting standards, quality reporting, quality assurance framework,
European Statistics Code of Practice, third-round peer reviews) plus
`sdmx.org/guidelines/`.

**What was not read**: SWD(2024) 136, the peer-review final report itself — the
peer-review edge rests on Eurostat's page instead and says so. No UK, Dutch or
German work was touched, and none of `G.49.md`'s cheap checks were raided — this
session stayed inside its one item. The prose section
(`_staging/20-prose-sections.txt`, 399k chars) was not opened — it is its own
session by Thomas's 2026-08-07 decision and must not be folded into batch work.

**What broke**: EUR-Lex, in a way the branch has not recorded before. See
Findings 4.

## Headline result

**The EU layer's quality framework is a four-deep chain in which every link is
stated by the dependent document about itself, and its bottom link leaves the
EU entirely — SIMS's concepts are "derived from" the SDMX cross-domain concepts
published in the SDMX Glossary, an international standard nobody legislated.**
That is a new shape for this branch. `EU/slices/README.md`'s central finding is
that disclosure runs *upward* — national documents name EU instruments, EU
instruments name nobody. This chain runs *downward and outward*: an EU standard
naming an international one as the source of its own concepts, in Eurostat's own
words, with no Regulation anywhere in it. The asymmetry finding is about the
*legislative* layer; the self-regulatory layer behaves the opposite way, and
that is worth more than the six edges.

## Findings

### 1. Twenty-two staged batches were one subject, and it was the ESS quality stack

**What this rests on**: reading `01-manifest.json`'s scope lines for all 73
batches and cross-checking the 109 `names`-bearing records in them against the
340 ids already in the corpus. Batches 16–26, 30–37, 44, 45 and 66 all describe
the same five documents from different angles — Code of Practice, Quality
Assurance Framework, ESS Handbook for Quality and Metadata Reports, SIMS, and
the SDMX material SIMS derives from — and **not one of the five was a node.**
The seven batches a prior session did mine (`eu-meta-docx-batches.json`, G-file
sessions never having read them) were a different, disjoint set. **Practical
consequence for whoever takes the next batch:** the manifest's `scope` strings
are a usable index, the batch numbering is not — the material is grouped by
subject across scattered batch numbers, and taking batches in numeric order
would have produced five thin slices instead of one coherent one.

### 2. Two of the six edges would have been built from the wrong sentence, and the wrong sentence was the more prominent one

**What this rests on**: direct reads of both documents. The QAF's own
introduction says it *"follows and aligns with the 2017 revision of the European
Statistics Code of Practice"* — front matter, first paragraph, exactly where an
edge-bearing statement sits, and squarely in `Research.1.md` §5a's banned list.
The sentence that carries the edge is on Eurostat's QAF page instead: *"The QAF
serves as complementary guidance for how to implement the CoP"* and *"The aim of
the QAF is to accompany the CoP."* The same pattern, in the same slice, from
Eurostat's metadata-standards page: *"The concepts defined in the SIMS standard
are compatible with the common terminology established by the SDMX standard"* is
§5a language, and the very next sentence — *"The 19 high-level concepts are
derived from the statistical data and metadata exchange (SDMX) cross-domain
concepts published in the SDMX glossary"* — is the edge. **Both traps sit
immediately adjacent to their own antidote.** Recorded as a `caveat` on the QAF
edge and inside the SIMS edge's own `basis`, so neither can be re-proposed from
the weaker sentence later.

### 3. The tense trap ran forwards, and the live release resolved it — the route `EU/slices/README.md` predicted

**What this rests on**: the SIMS 2.0 cover page (December 2015) states *"SIMS
will be the standard for quality reporting according to Article 12 of Regulation
223/2009 on European statistics."* Future tense in a 2015 document — an
announced status, not a stated one, and unusable under §5b. The present-tense
confirmation is on Eurostat's live quality-reporting page: *"The ESS quality
reporting standard is the Single Integrated Metadata Structure (SIMS)."* This is
exactly the route `EU/slices/README.md` recorded from the German GNI inventory
("when a member-state dependency looks blocked on cadence, check whether the
*release* states what the *methodology document* does not") — **its first
confirmation on a different document type, in a different direction, for a
different field.** Prediction logged and settled in the same session.

### 4. EUR-Lex no longer serves consolidated texts to either a container or a real browser

**What this rests on**: six URL forms tried this session, all failing, listed in
full in the Part A record §G1. `curl` returns **HTTP 202 with a zero-byte body**
for every `eur-lex.europa.eu` legal-content and ELI form. In Chrome, all three
legal-content forms **silently redirect to `eur-lex.europa.eu/TodayOJ/index.html`**
— today's Official Journal — preserving the requested CELEX id as an ignored
query parameter. `publications.europa.eu/resource/celex/32009R0223` returns
HTTP 400. **This contradicts the branch's own standing note**, carried in
`MISSION-TODO-2.md`'s method notes, that "EUR-Lex and several EU agency sites
gate non-browser HTTP but work in a real browser." The browser no longer works
either. Consequence for this session: `Regulation (EC) No 223/2009` was not
minted as a node and the `eu-statistics-code-of-practice → Regulation` edge was
not built, though the staging records carry Article 11(1) and 11(2) verbatim and
would support both. Filed `deferred`, not `no-document` — the document exists and
says it; this branch simply could not open it today. **Whoever hits this next
should not conclude the quotes are wrong.** Worth one retry per session before
assuming it is permanent; if it is, a mirror route (a national consolidated
text, or the OJ PDF via a Wayback `id_` endpoint, which worked for
`legislation.govt.nz` on the NZ branch) is the thing to find.

### 5. The direction between the Code of Practice and the peer reviews is documented both ways, and only one way was minted

**What this rests on**: Eurostat's peer-review page says the reviews exist *"to
monitor the implementation of the European Statistics Code of Practice"* — which
is the minted edge, peer-review report → CoP. Eurostat's CoP page says, in its
"History of the CoP" table, *"September 2011 Revision of the CoP based on the
results of the 1st round of ESS peer reviews"* and *"November 2017 Revision of
the CoP based on the results of the 2nd round of ESS peer reviews"* — which is
the opposite edge. **It was not minted**, because the quote names *the results
of a round*, not the titled final report that is the node, and this corpus does
not bridge from an exercise to its publication by inference. Both may well hold;
a graph cycle between a standard and its own assessment programme would be a
true fact about how the ESS works, not an error. Recorded as a `note` in the
slice. Settling it needs SWD(2024) 136 itself — see Cheap checks 2.

## Secondary observations (logged, low priority)

- **The EHQMR contradicts itself about its own edition inside one PDF.** The
  cover reads *"2021 re-edition"*; the foreword reads *"This 2020 edition of the
  ESS Handbook for Quality and Metadata Reports."* Both quoted, neither
  adjudicated, per §3. The node's title carries no year, consistent with the
  corpus's 72-of-74 convention.
- **`sdmx.org` renders the final X of "SDMX" in a styled span**, so plain-text
  extraction of any page there yields "SDMx" throughout. The PDFs on the same
  site use "SDMX". Anyone quoting that site verbatim will produce something that
  looks like a typo and is not.
- **The QAF v2.0 PDF has broken intra-word spacing** from its original
  typesetting ("Ma y 2019", "European S tatistics"). Quotes taken from it were
  whitespace-normalised, which is recorded in the Part A entry — no words
  changed. Worth knowing before someone greps it for an exact phrase and finds
  nothing.
- **"Catalogue of ESS standards"** is named by the EHQMR as *"the collection of
  non-legislative normative documents underpinning the ESS."* That is a named
  register of exactly the document class this branch has been mining one at a
  time. Nobody has looked at it. Logged as a candidate category, not scoped.
- **`ESS Metadata Handler`** is named as the ESS's common technical environment
  for quality reporting. Infrastructure, not a publication; closest to a terminus
  in shape but nothing names it as an input to a report. Logged so it is not
  rediscovered.

## Corrections to prior sessions

1. **`MISSION-TODO-2.md`'s method note on EUR-Lex is now wrong and this file
   supersedes it.** The note reads "EUR-Lex and several EU agency sites gate
   non-browser HTTP but work in a real browser." As of 2026-08-07 the browser
   route fails too — see Findings 4 for the exact failure signature. Status:
   **refuted for EUR-Lex specifically**; the note's claim about "several EU
   agency sites" was not tested this session and is untouched. The predecessor
   file was not edited; the correction lives here, per the spec.

2. No claim in `G.49.md` or any earlier EU hand-off was found wrong this
   session. The prior sessions' staging records were spot-checked against source
   for six documents and every quote re-read matched what the record carried —
   including the two §5a-adjacent sentences the records had already flagged in
   their own `notes` fields. **The staging pipeline's extraction quality is
   good**; what it cannot do is the judgement, which is why the batches were
   staged rather than imported.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`. Unchanged.

**B — SEC03 meta backlog.** Unchanged.

**C — Independent ECB/Eurosystem threads.** Unchanged — not touched this
session. Note that staged batches 68–72 (Eurosystem balance sheet legal
framework, variation margin, valuation haircuts, NCB implementation, fixed-term
deposits) are the blob's own contribution to this priority and are still
unbuilt.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**, per
`G.41.md`. Unchanged.

**E — Everything the blob split created.** **Moved, for the first time in
nineteen hand-offs.** 22 of 73 batches are built; 51 remain, plus the 399k-char
prose section, which by Thomas's 2026-08-07 decision runs as its own
agent-alone session with a review gate and must not be folded into batch work.
The remaining batches group, on their scope lines, roughly as: ESA 2010 and the
national-accounts methodology stack (0–15); the ECB/Eurosystem collateral and
balance-sheet material (68–72); the unlabelled middle block (46–62), whose
manifest entries carry no scope strings at all and which nobody has
characterised. **The unlabelled block is the real unknown and is where the next
batch session should start** — not because it is promising, but because it is
the only part of the backlog whose size nobody can currently estimate.

**F — The German sub-graph. Opened, not closed.** Unchanged.

**G — The wide-Europe depth pass.** Unchanged — two finished countries
(Netherlands, UK), two scouted (Switzerland, Norway; Norway has since been
partly built from the AU/NZ side, `no-government-finance.json`). `G.49.md`'s
three suggested next steps stand.

## Cheap checks still outstanding

**New this session:**

1. **Re-extract `Research.1.md` §9's EU id list.** It was stale before this
   session and is five ids staler now (`eu-statistics-code-of-practice`,
   `ess-quality-assurance-framework`, `ess-handbook-quality-metadata-reports`,
   `ess-sims`, `sdmx-glossary`). §9's own instruction is to re-run the
   extraction across `src/data/research/*.json` rather than append by hand —
   this is `MISSION-TODO-2.md` P3 item 20 and it now covers all three branches.
2. **Open SWD(2024) 136 itself** — the ESS peer-review final report. Two things
   turn on it: upgrading the peer-review → CoP edge from a two-sentence
   same-page chain to the report's own words, and settling the both-ways
   direction question in Findings 5. Register link:
   `ec.europa.eu/transparency/documents-register/detail?ref=SWD(2024)136&lang=en`.
3. **Retry EUR-Lex once.** If it serves consolidated 223/2009 again, the
   Regulation node and the CoP → Regulation edge are ready to mint from quotes
   already staged and re-checkable in minutes.
4. **The Catalogue of ESS standards** — one page, to find out how many documents
   are in it. It may be a large, cheap seam or a short list.
5. **SIMS Guidelines v2.0 (2019)** — named on Eurostat's quality-reporting page
   and not opened this session. Would firm up `ess-sims`'s cadence, which
   currently rests on three dated points and no stated interval.

**Carried forward from `G.49.md`, `G.48.md` and `G.47.md`, unchanged, still
open**: all items on all three files' own lists. None were touched.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at
`planning/MISSION-TODO-2.md`, then this file.**

1. **This file (`G.50.md`)**.
2. **`planning/MISSION-TODO-2.md`** — the cross-branch entry point, new since
   G.49.
3. **`Research.1.md`** — v3.3, §9 stale by at least five EU ids.
4. **`EU/ESSQualityFramework_PartA_2026-08-07.md`** and
   **`EU/slices/eu-level/ess-quality-framework.json`**.
5. **`EU/slices/_staging/01-manifest.json`** — and the warning from Findings 1:
   read it by `scope`, not by batch number.
6. **A browser** — though note it no longer helps with EUR-Lex.
7. **The same caution every predecessor carries**: `curl` plus direct text
   extraction (`pypdf` for PDFs, HTML-tag-stripping for pages) for anything that
   will become a quoted `basis`. Confirmed clean this session on
   `ec.europa.eu/eurostat` and `sdmx.org`.

**Git state:** this session's work is committed locally. **It was not pushed** —
the working environment has no write credentials for `origin`, and `origin/main`
was already two commits behind before this session started (the AU G.3 and NZ
G.5 sessions are also unpushed). Three commits are now waiting. Per the
2026-08-07 git policy, this is recorded rather than silently skipped: **Thomas
needs to `git push` from the device**, or a future session needs credentials.

---

---

# How to write the next hand-off

**Added 2026-08-04. Copy this whole section verbatim into every successor**, so
the chain never depends on one file surviving. It is the spec, not an example —
the file you are reading is the worked example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no
  G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are
  `.docx`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `EU/`. Earlier files are `.docx`; that
  was the chat workflow's doing, not a preference.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `EU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py EU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). It exists so branch state can be read
  without parsing prose, and so a future session can diff two hand-offs.
  `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

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
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. This is where "the sandbox failed" and "the
governing briefs still did not arrive" belong. **State plainly which sources you
read in full**, because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Mark any claim that depends on
a predecessor's reading rather than your own — the house convention is
*(SEC04 per G.17)*. Quote verbatim; `Research.1.md` §2 applies here exactly as
it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. This section is the reason the chain is trustworthy. A session that
finds a predecessor wrong and does not record it here has actively damaged the
corpus.

**Thomas's stated priority for the remaining work** — lettered blocks (A, B, C,
D) carried forward from the predecessor, edited to reflect what moved. Mark items
**no longer needed** explicitly and say why, rather than deleting them silently.
This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** G.17 predicted a code pattern;
  G.18 recorded that it "landed". Make falsifiable calls and settle them.
- **Distinguish inference from documented fact,** and say which narrow respect is
  still inference. G.18's headline rule is very well evidenced and still not
  printed in any document — it says so.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
- **Do not pad.** These files are dense because every line earns its place.
