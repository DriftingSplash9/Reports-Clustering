# G.62.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in full earlier this overall working
session; §2 (git prohibition), §3 (extract-don't-adjudicate), §4 (node rule
and sweep scoping), §6 (output format) all applied this session.
`planning/OPEN-THREADS_2026-08-08.md` and
`planning/dropped-sweep-scoping_2026-08-08.md` both read in full earlier
this session. `G.61.md` is the hand-off template followed here.
Predecessor: `G.61.md` (2026-08-09).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask
   Thomas if you need git state.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, thread 2.1 for the
   sweep narrative, and `planning/dropped-sweep-scoping_2026-08-08.md` for
   scope. Tier-1, Tier-2 and Tier-3 are **all now closed** except the long
   tail (~39 files with fewer than 5 priority entries each, not yet
   touched). `G.61.md`'s claim that Tier-1/2 were "entirely closed" was
   correct — see Session conditions below for how this file briefly and
   wrongly doubted that, and why.
3. **This file made one new mint with four edges**, via a technique worth
   knowing about: **CIRCABC (the EU's document-sharing platform) 404s to
   every non-interactive HTTP client — curl, WebFetch — but resolves
   cleanly in a real Claude-in-Chrome browser session.** This gate has been
   on record since `G.50.md`-era work as a blocker; this session is the
   first to actually drive a browser through it rather than just noting it.
   If a future session hits a CIRCABC (or similarly gated) link recorded as
   "does not serve to a non-browser client," **try the browser tool before
   accepting the negative.**
4. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1.** Continues directly
from the same overall working session as `G.59.md`–`G.61.md`. Two files
touched this stretch: `ess-quality-framework.json` (Tier-3, no mint —
closed out the Catalogue-of-ESS-standards entry on `G.56`'s scoping work
plus one more round of checking, found nothing further) and
`edp-inventory-regulation-479-2009.json` (Tier-1, one mint, four edges).

**A FALSE ALARM THIS SESSION BRIEFLY RAISED AND THEN RETRACTED, kept here
so nobody re-raises it.** Checking whether `G.61.md`'s "Tier-1 and Tier-2
are entirely closed" claim actually held, this session first grepped every
Tier-1/Tier-2 file's `_status` field for a `2026-08-09` marker with `grep -o`
capped at ~80 characters — a method that only catches a sweep note if it
sits near the *start* of the field. On that basis six files looked
untouched. **That check was wrong, not the files.** Re-checked properly
(full-field reads and `_dropped`-array greps, not truncated `_status`
snippets): every one of the six — `nz-government-finance.json` (see
`NZ/G.6.md`), `au-government-finance.json` (see `AU/G.4.md`),
`eu-draft-budget.json` (see `G.58.md`, Tier-1 #6), `ontario-ompf-mpac.json`
(Tier-1 #7), `realm-government-finance.json` (Tier-1 #8) and
`eurostat-edp-gfs-ecb-statistics.json` (Tier-2 #9) — carries genuine,
substantive `2026-08-08`/`2026-08-09` sweep work: mints, wired edges,
re-verified `no-document` negatives, all recorded inline in each file's own
`_dropped` entries or in a sweep note appended *later* in a long `_status`
string rather than at its start. `G.61.md` was right. The only Tier-1 item
that was genuinely still open going into this session was item #5,
`edp-inventory-regulation-479-2009.json` — correctly identified below, and
closed by this session's own work. **Lesson for whoever runs this kind of
audit next: grep the whole field, or better, grep the `_dropped` array's
`why` text directly — a truncated `_status` snippet will produce false
negatives on files where the sweep note was appended rather than
prepended.**

**Read in full this session**: `ess-quality-framework.json` (before/after),
`edp-inventory-regulation-479-2009.json` (before/after), `esa-2010.json`
(read, not edited — cross-referenced for the German-inventory naming
convention), `equalization-named-products.json` and
`equalization-payroll-base.json` (read, not edited — already resolved),
`EU/CatalogueOfESSStandards_scoping_2026-08-08.md`,
`EU/EDPInventory_PartA_2026-08-07.md` (for the exact C9 quote wording).
**Read partially, to check for sweep markers only, not researched**:
`nz-government-finance.json`, `au-government-finance.json`,
`eu-draft-budget.json`, `ontario-ompf-mpac.json`,
`realm-government-finance.json`, `eurostat-edp-gfs-ecb-statistics.json` —
all confirmed already swept (see the false-alarm note above), none needed
this session's own research.

## Headline result

**The CIRCABC browser gate that `edp-inventory-regulation-479-2009.json`
flagged as "the cheapest check that would fix" its main cadence blocker
actually works, and it closes that file's stated headline cost.** A
Claude-in-Chrome session clicked through Eurostat's EDP-inventories page
(EU countries → Germany → Inventory) to a CIRCABC library item — 404 to
curl and WebFetch, loads cleanly in a real browser — titled "DE EDP
Inventory 2025," title page "Germany" / "October 2025," uploaded
2026-01-08. Against Destatis's own copy, still dated December 2015, that
is a second observed edition, 9.83 years apart. Minted as `de-edp-inventory`
(releases_per_year 0.1, estimated from that interval, the same treatment
Thomas's Q2 ruling already applied to the ESA 2010 German GNI/QNA
inventories) with four edges: `-> eu-reg-479-2009` and `-> esa-2010`
(both re-verified in the October 2025 PDF text, not just carried over from
the 2015-edition Part A record), and `-> de-destatis-debt-annual` /
`-> de-destatis-debt-quarterly` (the two nodes minted 2026-08-08 that sat
unwired specifically because the inventory that names them wasn't a node
yet — both ADS/QDS source sentences re-read fresh in the current edition,
pp.34 and 36, not reused from the corrected-staging-error 2015 quote).

## Findings

### 1. `ess-quality-framework.json` — the Catalogue of ESS standards entry closed, nothing minted

*What this rests on*: `EU/CatalogueOfESSStandards_scoping_2026-08-08.md`
(G.56's scoping work, read in full), a corpus-wide grep, and two fresh
WebFetch/WebSearch attempts this session.

G.56 scoped but did not adjudicate the Catalogue of ESS standards (a
12-entry SKOS dataset on ShowVoc). This session closed the entry: 2 of 12
catalogue members are already nodes, 1 (EDAMIS) is correctly a technical
system rather than a publication, 1 (ISCED 2011) is a classification hub
subject to §7's rule against researching a hub by reading it, and the
strongest of the remaining 8 candidates (ESS guidelines on seasonal
adjustment, two confirmed editions 2015/2024) is a genuine isolated mint —
a corpus-wide grep for "seasonal adjustment" found it named nowhere else
in `src/data/`, no proposed edge anywhere. Declined to mint on the same
reasoning that keeps `international-frameworks.json`'s StatCan
13-608-X candidate out. The one soft connection G.56 flagged
(`ess-sims -eli:based_on-> eu-reg-223-2009`, from the catalogue's own
metadata rather than SIMS's own words) was chased further: no present-tense
statement found on Eurostat's reference-metadata-reporting-standards page
or in the SIMS 2.0 PDF beyond the already-recorded future-tense sentence.
Not minted. 6 reports, 7 dependencies, 12 dropped — unchanged counts, one
entry's text updated.

### 2. `edp-inventory-regulation-479-2009.json` — the German EDP inventory, minted via a browser session

*What this rests on*: a live Claude-in-Chrome session on
`ec.europa.eu/eurostat/web/government-finance-statistics/excessive-deficit-procedure/edp-inventories`
and the resulting CIRCABC PDF, both read directly this session — not
inherited from any prior session's staging.

Full detail in the JSON's own updated entries; the mechanism is the
headline result above. One detail worth flagging for anyone auditing this:
the two new `uses_data_from` edges (`de-edp-inventory` → the annual and
quarterly German debt statistics) reuse the *substance* of a quote already
verified in `G.50`-era work (Part A record ID C9) but were **re-read fresh
in the current October 2025 edition** rather than just cited from the old
record — search hits for "annual debt statistics," "main underlying
statistical sources," and "SFK4" all landed on live text in the new PDF,
confirmed on pp.34 and 36 respectively. This matters because the same file
carries a standing correction (`_note`) that five of six staged records
from this document's original ingestion were misquoted — re-reading at
source rather than trusting an old citation is the discipline that
correction established, and it was followed here even though reusing the
old quote would have been faster. 4 reports (was 3), 5 dependencies (was
1), 12 dropped (unchanged count, four entries' text updated with
resolutions).

## Secondary observations (logged, low priority)

- `equalization-named-products.json` and `equalization-payroll-base.json`
  — the scoping document's own recommended *first* block to work, on the
  theory they were "cheap and mechanical" — turned out to already be fully
  resolved, by a 2026-08-08 ruling (Thomas, Q1, `Open-Questions-2026-08-08-sweep.docx`)
  that predates the dropped-sweep thread entirely. Worth knowing so nobody
  re-does this work expecting it to be open.
- The CIRCABC screenshot tool intermittently timed out mid-session
  ("renderer may be frozen or unresponsive") on the PDF-heavy pages;
  waiting a few seconds and retrying the screenshot call resolved it every
  time. Not a blocker, just slow — worth budgeting for if reading another
  large CIRCABC-hosted PDF.
- The CIRCABC "Information" modal on first load of any document details
  page ("S-CIRCABC is progressively transitioning to EU institutional
  use... From June 2026, external users will no longer be able to create
  new Interest Groups") is cosmetic and does not block reading; close it
  and proceed.

## Corrections to prior sessions

1. **`G.61.md`'s orientation section, "Tier-1 and Tier-2 are entirely
   closed as of this overall session."** CONFIRMED, not overstated. This
   session briefly doubted it on a flawed check (see the false-alarm note
   in Session conditions above) and then re-confirmed the original claim
   was correct. Recorded here only so the doubt doesn't get rediscovered —
   `G.61.md` itself needed no correction.
2. **`edp-inventory-regulation-479-2009.json`'s own `_open_questions`,
   "THE CHEAPEST CHECK THAT WOULD FIX THAT IS BLOCKED ON A BROWSER."**
   REFUTED, in the useful sense: not blocked on a browser, blocked on
   *having tried* a browser. curl and WebFetch still 404; Claude-in-Chrome
   does not. Recorded in the file's own updated entry rather than just
   here, so it survives independently of this hand-off.

## Thomas's stated priority for the remaining work

Unchanged from `G.61.md`'s lettered blocks; this session's work is entirely
inside **B — the corpus-wide `_dropped` sweep**. Within B, this session
moved backward into Tier-1 (per the scoping document's own suggested
order, step 2: "`edp-inventory-regulation-479-2009.json` + `esa-2010.json`
together") rather than continuing Tier-3's long tail, because that block
was explicitly flagged as possibly cheap ("may already be unblocked by the
2026-08-08 cadence rule change") and it was — via a different mechanism
(a browser session) than the one the scoping doc anticipated (the cadence
rule change).

**Blocks A, C, D, E, F, G untouched this session** — see `G.56.md`–`G.61.md`
for their current state.

## Cheap checks still outstanding

Carried from `G.61.md`, plus:

1–10. All items from `G.61.md`'s list, unchanged — not attempted this
   session (out of this file's scope).
11. **New, this session**: the other 26 national EDP inventories on
    Eurostat's EDP-inventories page are all CIRCABC links, same gate,
    same fix now proven for Germany. A future session could click through
    each (EU countries → country → Inventory) checking for a second dated
    edition the way this session did for Germany — if even a handful clear
    the cadence bar, `eu-reg-479-2009`'s "26 further national EDP
    inventories" deferred entry stops being 26 speculative leads and
    starts being a mechanical wiring job, the same shape as the
    equalization files.
12. **New, this session**: the German EDP inventory's own body text
    (Table 1, institutional-responsibilities matrix) explicitly assigns
    compilation duties to NSI/MOF/NCB by row and column, but this session
    did not resolve those abbreviations to named institutions for every
    row — only enough to write `de-edp-inventory`'s publisher field
    generically. A future session with more time could read Table 1 in
    full and possibly split or refine the publisher attribution.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1.
   Like this overall session's other 2026-08-09 hand-offs, this file's
   session has not yet been folded into OPEN-THREADS.
2. **This file**, then `G.61.md`, `G.60.md`, `G.59.md`, `G.58.md`, `G.57.md`,
   `G.56.md` for everything else in the branch.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node
   rule and sweep scoping).
4. **`src/data/research/edp-inventory-regulation-479-2009.json`** — the
   mint and four edges this session added; every touched entry carries its
   resolution inline, original text preserved below it.
5. **`src/data/research/ess-quality-framework.json`** — the Catalogue of
   ESS standards entry's closure, same convention.
6. **`planning/dropped-sweep-scoping_2026-08-08.md`** — current status:
   Tier-1, Tier-2 and Tier-3 all closed. Only the long tail remains —
   roughly 39 files with fewer than 5 priority entries each, ranked but
   not individually previewed by the scoping document, not yet touched by
   any session.

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
