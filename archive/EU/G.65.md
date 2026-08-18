# G.65.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` not reopened this session — applied throughout as carried forward from `G.64.md` (§2 git-no-touch, §3 extract-don't-adjudicate, §4 node rule and cadence-from-observed-interval, §5a comparability trap, §8 one-item-at-a-time). `G.64.md` read in full; it is the whole input to this session, which worked its remaining Cheap-checks list (items 1–7) to zero and then advanced item 11 (the CIRCABC sweep) from 0/26 to 3/26. `planning/OPEN-THREADS_2026-08-08.md`, `planning/MISSION-TODO-2.md` and `planning/dropped-sweep-scoping_2026-08-08.md` **not read this session** — same limit `G.64.md` carried from `G.63.md`, now three sessions running.
Predecessor: `G.64.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask Thomas if you need git state. This session worked entirely over the device bridge and never touched `.git`.
2. `G.64.md` closed nine of eleven punch-list items and left two scoped pieces of work: item 10 (a dedicated Brazilian-fiscal-reporting session) and item 11 (the CIRCABC browser-only gate on the 26 remaining national EDP inventories, plus an optional German publisher-field refinement). **This session closed the German refinement (now item 7 below), plus six other small items G.64.md had reclassified as "cheap checks" rather than scoped sessions, and then spent the rest of its budget on item 11.** Item 10 (Brazil) was **not attempted** — G.64.md's own framing that it needs a dedicated session was taken at face value rather than tested.
3. **Item 11 is now partially closed, not fully closed.** Three of the 26 remaining national EDP inventories are minted (Belgium, Croatia, Bulgaria) because CIRCABC's own library-folder listing happens to carry two dated PDF editions for each of those three. The other 20 remaining single-country inventories (`NL, FI, RO, IT, ES, IE, LT, HU, UK, SK, SI, SE, PT, PL, MT, LV, LU, FR, EE, DK, AT`) each show only **one** dated edition in that listing — minting any of them needs either an external second source (the pattern that worked for Germany, which was not CIRCABC-internal) or a deliberate decision to mint with no cadence estimate. Three more (`CY, CZ, EL`) carry version numbers above 1.0 (v1.1, v1.3, v2.0) that may indicate CIRCABC-internal file history holds a second dated version — **not checked this session**, and likely the single cheapest next move on this list (see Cheap checks below).
4. **New reusable technique, worth more than any single edge this session minted: CIRCABC's own library-folder listing.** Navigate to `https://s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/07b0c02c-1b08-4ebb-8908-dd068b0dfcf2?p=1&n=100&sort=modified_DESC` (reached from any country's document detail page via the "EDP inventories" breadcrumb) and it lists **every** country's EDP inventory files — name, title, last-modification date, version, size — on one page, with `?n=100` returning the whole ~55–60-file folder in a single `get_page_text` call. This replaces Eurostat's per-country accordion UI, which `G.64.md`'s predecessor found unreliable (accordions collapsed unpredictably under batch-clicking). Use this listing first for any future CIRCABC work in this corpus.
5. **CIRCABC's in-page "Preview" action renders PDFs through PDF.js embedded directly in the `https://s-circabc.europa.eu` page**, unlike a locally-hosted PDF opened by direct URL (which Chrome's native `chrome-extension://` viewer renders, and which is unreachable by any `mcp__claude-in-chrome__*` tool — use the `docs.google.com/viewer?url=...&embedded=true` workaround for that case instead, per `G.64.md`'s predecessor). CIRCABC's Preview viewer works directly with `computer` scroll + `get_page_text` calls — no workaround needed — but has one reliability trap: **clicking a second file's Preview link while a PDF.js viewer overlay is still open from a prior file does not navigate** (the page silently keeps showing the old document). Close the open viewer first (the × control near the top-right of the overlay, roughly `(1524, 16)` at this session's viewport size), *then* click the next Preview link. This cost several wasted `get_page_text` calls before being diagnosed this session.
6. Mechanical facts, carried forward and re-confirmed: `device_stage_files` / `device_commit_files` cap at 50 files per call; edit JSON by stage → copy to a scratch path → edit with Python's `json` module → validate with `json.load` → `SendUserFile` → `device_commit_files`, never in place under `/mnt/user-data/uploads/` (read-only). `device_bash` gives read-only `grep`/`python3` over the whole repo at `/sessions/<session>/mnt/Reports Clustering/` — not git, does not touch `.git`, and is the fastest way to answer "does this id already exist?" or to get a corpus-wide report/dependency/dropped count without a validator run.
7. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A punch-list-completion session followed by a scoped-research session, not a sweep session. Input: `G.64.md` alone, plus direct browser access to CIRCABC, Alberta's King's Printer, the Bank of Canada, govinfo, and the ECB. Method: one item at a time per `Research.1.md` §8 — seven remaining cheap checks closed first (Alberta CPI, Bank of Canada lending-rate node, FSDN corroboration, Basel/Regulation-Q quote cleanup, NZSIOC/AES independent re-verification, MIP↔BOP-NA citation edge, German Table 1), each researched, written, validated and committed to disk before the next item started, then the CIRCABC sweep (item 11) worked as a single extended research push covering three countries.

`npm run validate` was **NOT run this session** — the same Windows-only esbuild/win32-linux mismatch through the device bridge noted in every recent hand-off back to `G.50.md`. A direct file-count across every `src/data/research/*.json` after all edits gives **396 reports / 477 dependencies / 378 `_dropped` entries**, against `G.64.md`'s 392/468/378. That is +4 reports and +9 dependencies, and it reconciles exactly against this session's own edits: +1 report / +1 dependency (Bank of Canada lending-rate node), +1 dependency (Alberta CPI edge), +1 dependency (MIP→BOP-NA edge), +3 reports / +6 dependencies (Belgium/Croatia/Bulgaria EDP inventories, two edges each). `_dropped` is unchanged at 378 because every touched entry was annotated and reclassified rather than deleted, same convention as every prior sweep session. Same caveat as always: a file-count is not a validator run. Last confirmed-green validator run remains 2026-08-08 at 372/436.

No decision was referred to Thomas this session — everything below either closed on direct evidence or was left explicitly open and documented.

## Headline result

**All seven of `G.64.md`'s remaining cheap checks are closed, and item 11 (the CIRCABC sweep) moved from an untouched scoped-session item to a 3-of-26 partial result with a clear, bounded remainder.** Six of the seven cheap checks were genuinely small — a quote extension, a citation upgrade, a single new node off an already-identified source — and closed in the time `G.64.md` estimated. The CIRCABC item, correctly flagged by `G.64.md` as *not* a cheap check, absorbed most of this session's remaining budget and produced three new minted national EDP inventories (Belgium, Croatia, Bulgaria) using the same cadence-from-observed-interval treatment as Germany, plus — more valuably for whoever picks this up next — a single-page listing of every remaining country's file inventory (names, dates, versions) that turns "click through 26 countries" into "read one listing and work down a known list." **Item 10 (Brazil) is untouched.** Block B is now closer to done than at any point in this chain, but is not done: 23 of 26 CIRCABC countries remain (20 needing an external second source, 3 needing a version-history check), and Brazil has not been started.

## Findings

### 1. Alberta Continuing Care s.11 — closed on the fourth-plus attempt, browser access was the whole blocker

`provincial-social-programs.json` `_dropped` entry 0, `G.64.md` cheap check 1 (its own item 6, renumbered). Four fetch-tool routes had failed across two sessions (robots-disallowed, HTTP 520, robots-disallowed, no mirror found). A Chrome browser session reached Alta Reg 44/2024 directly. Section 11(1)–(2) defines "Alberta CPI" and a lesser-of formula capping the annual accommodation-charge increase at 3.8%, over a 12-month window ending 28 February. Minted `ab-continuing-care-accommodation-charges -> statcan-cpi` (`calculated_from`), quoting the regulation in full. `_dropped` entry 0 annotated `no-document` → `note`. Dependencies 22→23 in this file.

### 2. Bank of Canada new/existing lending rates — new node, closes a cross-file pointer

`credit-and-mortgages.json`, `G.64.md` cheap check 2 (its own item 2, renumbered — the mortgage-rates half of `rate-transmission.json`'s entry 2). Minted `boc-new-existing-lending-rates` ("Interest Rates Charged for New and Existing Lending by Chartered Banks," `releases_per_year: 12`, "typically published within the third week of the month") and edge `boc-new-existing-lending-rates -> boc-prime-rate` (`uses_data_from`), quoting the Bank's own *What's behind your mortgage rate* (2020-05-27) explainer: "These include the prime rate, which is used by the banks as a basis for pricing variable-rate mortgages." Reports 10→11, dependencies 13→14 in `credit-and-mortgages.json`. `rate-transmission.json`'s mirrored `_dropped` entry updated to point at this file rather than duplicate the research (`deferred` → `note`).

**Self-caught error, corrected within this session before hand-off:** the first delivered `_status` string wrongly said "Reports 9→10" (an unverified guess at the prior count). Caught by directly counting the original file's reports/dependencies (10/13, not 9/12), corrected in a follow-up patch, redelivered and recommitted. Recorded here rather than in Corrections because it is this session correcting itself, not a predecessor — but it is exactly the kind of count error these files are designed to make embarrassing, so it is worth a line.

### 3. Eurostat Farm Structure Survey — the FSDN edge upgraded from one-sided to two-sided

`eurostat-farm-structure-survey.json`, `G.64.md` cheap check 3 (its own item 3's leftover — the receiving side's own statement, which `G.64.md` itself flagged as still missing). Commission Implementing Regulation (EU) 2024/2746, Annex III, states "all relevant types and sizes of farming represented in the integrated farm statistics (IFS) census or survey are to be covered", and its recital 5 cross-references Regulation (EU) 2018/1091 Annex III directly. This is the FSDN side naming its own dependency on the Farm Structure Survey, closing the one-sidedness `G.64.md` logged as a caveat. No new reports or dependencies — the existing `eu-fsdn -> eurostat-farm-structure-survey` edge's `basis` extended, and the file's `_open_questions` item closed with a FURTHER RESOLVED note.

### 4. FRB Regulation Q → Basel — quote replaced with a clean verbatim read

`banking-supervision.json`, `G.64.md` cheap check 4 (its own item 2's flagged follow-up — the 125-character-truncated Federal Register quotation). Refetched FR-2013-10-11 (78 FR 62018) via govinfo's HTML rendition and replaced the truncated quote with the complete sentence: "The proposed rules, in part, reflected agreements reached by the Basel Committee on Banking Supervision (BCBS) in ``Basel III: A Global Regulatory Framework for More Resilient Banks and Banking Systems'' (Basel III)." Also corrected the section attribution from SUMMARY to the Introduction/footnote 2, where the sentence actually sits. No new reports or dependencies.

### 5. NZ AES → NZSIOC — independently re-verified, not just re-confirmed

`nz-statsnz-national-accounts.json`, `G.64.md` cheap check 5 (its own item — the one edge in the file resting on a predecessor's DataInfo+ reading rather than this session's own). `datainfoplus.stats.govt.nz` remains robots-disallowed to the fetch tool but was reachable via Chrome this session. Both of the predecessor's 2026-08-06 quotes were reproduced character for character on a fresh fetch, and one further corroborating sentence was found in the same item's "Survey design" section: "The population and sample are designed, quality assured and primarily output at the New Zealand Standard Output Classification (NZSIOC) level 4 which is derived from the Australian and New Zealand Standard Industrial Classification 2006 (ANZSIC06)." The edge's `basis` now reads VERIFIED DIRECTLY BY THIS SESSION rather than per-predecessor. No new reports or dependencies.

### 6. ESCB-ESS MIP quality report → BOP-NA consistency report — a citation already in the file, never turned into an edge

`eurosystem-ecb.json`, `G.64.md` cheap check 6 (its own item, carried unchanged since `G.63.md`). The June 2026 MIP quality report (fetched directly this session) states in its own Executive Summary: "The most recent joint ECB-Eurostat 'BOP-NA ROW consistency report' was presented to the CMFB plenary in January 2026 and published on the CMFB website in February 2026." This sentence was **already quoted inside this file's own `_dropped` entry** as "ECB-05's own text" — the citation had been extracted but never minted as an edge. Minted `ess-escb-mip-quality-report -> ecb-eurostat-bop-na-consistency-report` (`cites`). Checked the reverse direction per `Research.1.md` §3: the BOP-NA report's own CMFB page names the MIP framework only in passing and does not cite the MIP report — the relationship is one-directional. This file was previously edgeless; dependencies 0→1.

### 7. German EDP inventory Table 1 — publisher field named directly

`edp-inventory-regulation-479-2009.json`, `G.64.md` cheap check 7 (its own item, explicitly flagged as "the least valuable thing on any of these lists" — closed anyway since it was quick). Page 17 of the October 2025 CIRCABC edition, read via the in-page PDF.js Preview viewer: "The official names of the German institutions involved are: NSI: Statistisches Bundesamt (Destatis)..., MOF: Bundesministerium der Finanzen (BMF)..., NCB: Deutsche Bundesbank...". Table 1 itself splits compilation labour rather than naming one compiler — Destatis compiles nonfinancial accounts and EDP actual deficit/surplus, Bundesbank compiles financial accounts and Maastricht debt, MOF supplies the planned-data column. `de-edp-inventory`'s `publisher` field updated from a generic institutional-category description to name the three institutions directly, with the division of labour quoted in the node's `description`. No new reports or dependencies.

### 8. CIRCABC 26-country sweep — three of 26 minted, technique established for the rest

`edp-inventory-regulation-479-2009.json`, `G.64.md` item 11 — explicitly *not* a cheap check, and worked as its own extended research push rather than squeezed into the punch-list method. CIRCABC's full EDP-inventories library listing (see Orientation §4) was captured in one page, giving filenames, versions and modification dates for every remaining country. Three countries — Belgium, Croatia, Bulgaria — show two dated PDF editions each in that listing, avoiding the need for an external second source (the pattern Germany required, going to Destatis's own site). All three were read directly at source via CIRCABC's in-page PDF.js Preview viewer, both editions each, confirming identical title text across editions (same document class, revised not replaced) before minting:

- **`be-edp-inventory`** — "Belgium" / "January 2019" (113 pages) and "Belgium" / "March 2025" (109 pages, v1.1). Interval 6 years 2 months (~6.17 years) → `releases_per_year: 0.16`.
- **`hr-edp-inventory`** — "Croatia" / "December 2020" (85 pages) and "Croatia" / "June 2025" (102 pages). Interval 4 years 6 months (4.5 years) → `releases_per_year: 0.22`.
- **`bg-edp-inventory`** — "Bulgaria" / "December 2022" (91 pages) and "Bulgaria" / "February 2026" (98 pages). Interval 3 years 2 months (~3.17 years) → `releases_per_year: 0.32`, the shortest observed interval of the four EDP inventories now in this file (DE 9.83y, BE 6.17y, HR 4.5y, BG 3.17y) — worth noting as a fact, not a trend, since each is a single interval sample.

Each new node gets `methodology_depends_on` edges to `eu-reg-479-2009` and `esa-2010`, mirroring `de-edp-inventory`'s pattern exactly: the `eu-reg-479-2009` edge rests on each country's own Article 9 background-section quote (word-for-word identical boilerplate across Belgium, Croatia, Bulgaria and Germany, confirmed rather than assumed for each); the `esa-2010` edge rests on each inventory's own title, "...according to ESA 2010" being derivation language. **Publisher fields for all three are left generic** ("[Country], per Council Regulation (EC) No 479/2009 Article 9 — compiling institution(s) not yet read...") rather than guessed — Germany's Table 1 naming exercise (Finding 7 above) was not repeated for Belgium, Croatia or Bulgaria this session, per `Research.1.md`'s no-guessing rule. Reports 4→7, dependencies 5→11 in this file. The standing `_dropped` entry recording the 26-country deferral was annotated with a FURTHER RESOLVED note naming which three are closed and which 23 remain, rather than closed outright — 23 of 26 is not "resolved."

## Secondary observations (logged, low priority)

- **CIRCABC's "IMPORTANT" transition-notice modal reappears on every fresh page load within the SPA** and must be closed before other clicks register — this cost several early attempts this session before being routinely handled.
- **CIRCABC's library listing appears virtualized**: `read_page` with `filter=interactive` even at high `max_chars` returns only the first few file rows' interactive elements, while `get_page_text` reliably captures the full ~55–60-row plain-text listing in the same page state. Use `get_page_text` for bulk listing extraction and `find()` (which appears to trigger on-demand rendering of the matched row) for individual row's clickable refs.
- **A PDF.js Preview viewer sometimes takes several seconds to finish rendering** after the click registers — a screenshot immediately after clicking Preview can show "0 of 0" pages or a blank "NaN%" zoom canvas that resolves to the real page count on a subsequent screenshot/wait. Don't diagnose a stuck viewer from a single premature screenshot.
- **WebFetch's robots.txt blocking continues to be the load-bearing reason browser access matters for this corpus** — recurring this session on Alberta's King's Printer, and (again) on NZ's DataInfo+, exactly as `G.64.md`'s predecessor found for CIRCABC and FADN/FSDN. This is now a five-plus-instance pattern across sessions, not a one-off.

## Corrections to prior sessions

No prior session's claim was found wrong this session. This session took `G.64.md`'s Headline result, Findings and item-11 framing as given rather than re-testing them — its own work was execution of `G.64.md`'s punch list plus a first pass at the scoped item `G.64.md` explicitly deferred, not re-verification of `G.64.md`'s own claims.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.61.md`–`G.64.md`. This session's work is entirely inside **B**.

- **B — the corpus-wide `_dropped` sweep.** Read-complete since `G.63.md`. All seven remaining cheap checks from `G.64.md` are now closed. **What is left of B is the same two scoped pieces `G.64.md` named, one of them now partially worked:**
  - **Item 10, Brazilian fiscal reporting — still untouched, needs a dedicated session.** Nothing done on this in `G.64.md` or this session. Not attempted here either; `G.64.md`'s framing (that it needs focused, dedicated research rather than being folded into a punch-list or sweep session) was taken at face value and not tested.
  - **Item 11, the CIRCABC 26-country sweep — now 3/26 (Belgium, Croatia, Bulgaria minted).** Remaining: 20 single-edition countries (`NL, FI, RO, IT, ES, IE, LT, HU, UK, SK, SI, SE, PT, PL, MT, LV, LU, FR, EE, DK, AT`) each needing an external second source or a no-cadence-estimate minting decision, plus 3 countries with CIRCABC version numbers above 1.0 (`CY` v1.1, `CZ` v1.3, `EL` v2.0) whose internal file-history has not been checked for a second dated version. **This is now the single cheapest lever on the CIRCABC item** — see Cheap checks below.
- **A, C, D, E, F, G — untouched this session.** See `G.56.md`–`G.62.md` for their current state.

Worth putting to Thomas when he next picks this up: with B's punch-list fully closed and one of its two remaining scoped pieces now partially worked, **B is closer to done than at any point in this chain, but "close to done" has been true since `G.63.md` and Brazil has not moved at all across three sessions.** If Brazil genuinely needs a dedicated session, it may be worth scheduling one explicitly rather than continuing to let it roll forward unattempted.

## Cheap checks still outstanding

1. **CIRCABC version history for Cyprus (v1.1), Czechia (v1.3) and Greece (v2.0)** — check whether CIRCABC's own file-version UI exposes a distinctly-dated prior version for any of the three, which would supply a second data point for cadence estimation without needing an external source. Not explored this session; likely one click-through per country once the history UI is located.
2. **The 20 single-edition CIRCABC countries** — not truly "cheap" (each needs either an external second-source hunt, the Germany pattern, or a judgment call on minting with no cadence estimate), but each is now a *known, bounded* lookup rather than an open question, per the full listing captured this session (see Orientation §4 for the URL).

## What to pass at the start of next thread

1. **This file's Headline result and Orientation**, especially the CIRCABC library-listing URL and the Preview-viewer-must-be-closed-before-reopening trap — both save real time on any CIRCABC follow-up.
2. **`G.64.md`, then `G.63.md`, `G.62.md`, `G.61.md`, `G.60.md`** for the sweep's history.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node rule — cadence-from-observed-interval is now load-bearing for six nodes: `de-edp-inventory`, `be-edp-inventory`, `hr-edp-inventory`, `bg-edp-inventory` plus the two German ESA 2010 GNI/QNA inventories), §5a (comparability trap), §8 (one item at a time).
4. **The eight files changed this session** — `src/data/research/` `provincial-social-programs.json`, `credit-and-mortgages.json`, `rate-transmission.json`, `eurostat-farm-structure-survey.json`, `banking-supervision.json`, `nz-statsnz-national-accounts.json`, `eurosystem-ecb.json`, `edp-inventory-regulation-479-2009.json` (the last touched twice — cheap check 7, then the CIRCABC sweep). Each carries its resolution inline with the original text preserved below it, same convention as every prior sweep session.
5. **The four nodes minted this session** — `boc-new-existing-lending-rates`, `be-edp-inventory`, `hr-edp-inventory`, `bg-edp-inventory`.
6. **Brazil (item 10) has not been started across three sessions (`G.63.md`, `G.64.md`, this one).** If picked up, treat it as its own dedicated session per `G.64.md`'s framing, not a punch-list item.

# How to write the next hand-off

Added 2026-08-04. Copy this whole section verbatim into every successor, so the chain never depends on one file surviving. It is the spec, not an example — the file you are reading is the worked example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.

**Mechanics**

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are `.docx`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `EU/`. Earlier files are `.docx`; that was the chat workflow's doing, not a preference.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `EU/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py EU/G.<n>.md
```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). It exists so branch state can be read without parsing prose, and so a future session can diff two hand-offs. `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar; `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.

* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.

**Required structure, in this order**

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

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly.

**What each section is for**

Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. If the folder layout or the tooling changed, that goes here.

Session conditions — what constrained the work. Session type (extraction vs verification vs planning), what tooling was available, what did not arrive, what was left untouched by instruction. This is where "the sandbox failed" and "the governing briefs still did not arrive" belong. State plainly which sources you read in full, because everything downstream inherits that limit.

Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.

Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Mark any claim that depends on a predecessor's reading rather than your own — the house convention is (SEC04 per G.17). Quote verbatim; `Research.1.md` §2 applies here exactly as it does to research output.

Secondary observations — real but low-priority. Section fingerprints, oddities worth not rediscovering. Keep them short.

Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. This section is the reason the chain is trustworthy. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.

Thomas's stated priority for the remaining work — lettered blocks (A, B, C, D) carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. This section is what a new agent reads to answer "what is next".

Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. This is the list that gets raided when a session has capacity left.

What to pass at the start of next thread — the packing list, for the case where the next agent has no filesystem access. If it does have access, say so and keep the list anyway; it doubles as an index of what matters.

**Conventions that make these files worth reading**

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement. That is what makes the positive claims usable.
* Predictions are logged and then scored. G.17 predicted a code pattern; G.18 recorded that it "landed". Make falsifiable calls and settle them.
* Distinguish inference from documented fact, and say which narrow respect is still inference. G.18's headline rule is very well evidenced and still not printed in any document — it says so.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
