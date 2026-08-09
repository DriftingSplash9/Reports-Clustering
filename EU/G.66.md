# G.66.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` not reopened this session in full -- relevant sections (§2 git-no-touch, §3 extract-don't-adjudicate, §4 node rule and cadence-from-observed-interval, §5a comparability trap, §8 one-item-at-a-time) read via targeted `sed`/`grep` extracts through the device bridge, same working method `G.65.md` used. `G.65.md` read in full; it is the whole input to this session, which picked up the single item Thomas asked for directly: the CY/CZ/EL CIRCABC version-history check `G.65.md` flagged as "the single cheapest lever on the CIRCABC item."
Predecessor: `G.65.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. Do not run any git command against this repo. Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask Thomas if you need git state. This session worked entirely over the device bridge and never touched `.git`.
2. `G.65.md` closed all seven of `G.64.md`'s remaining cheap checks and made a first pass at item 11 (the CIRCABC 26-country sweep), minting three countries (Belgium, Croatia, Bulgaria) via CIRCABC's own library-folder listing, which happened to carry two dated PDF editions for each. It left one specific, bounded lever unresolved: "Cyprus (v1.1), Czechia (v1.3) and Greece (v2.0) carry version numbers above 1.0 ... meaning CIRCABC's internal file history may hold a distinctly-dated prior version for each -- not checked this session." This session closed exactly that lever, at Thomas's direct request ("pick up the CY/CZ/EL version-history check").
3. The check succeeded for all three: CIRCABC's per-document Details page carries a "File history" panel (reached by clicking a file's row, then its "Details" action, on the same library-folder listing `G.65.md` documented) listing every version with its own creation date. Cyprus showed two versions (1.0, 1.1), Greece showed two (1.0, 2.0 -- a straight jump, no intermediate x.1), and Czechia showed four (1.0, 1.1, 1.2, 1.3) -- unexpectedly rich for a country `G.65.md` had filed as a single unchecked version-number anomaly. All three are now minted: `cy-edp-inventory`, `cz-edp-inventory`, `el-edp-inventory`, each with `methodology_depends_on` edges to `eu-reg-479-2009` and `esa-2010`, in `src/data/research/edp-inventory-regulation-479-2009.json`.
4. **New, load-bearing technical finding this session, worth more than the three nodes it produced:** CIRCABC's in-page PDF.js Preview viewer cannot open non-current file-history versions. Every attempt to preview an older version (`.../details/1.0`, `.../details/1.1`, etc., reached by clicking a version row in the File history panel) returned `Error: InvalidPDFException: Invalid PDF structure` -- six for six across three countries (Cyprus v1.0 x2 separate attempts, Czechia v1.0/v1.1/v1.2, Greece v1.0). Every CURRENT version opened and rendered normally in the same session, on the same viewer, with no other change. This reads as a platform limitation on how CIRCABC serves historical blobs to PDF.js, not per-file corruption -- it hit every older version tried, with no exceptions, across three unrelated countries' unrelated files. **Practical consequence for anyone continuing item 11 or checking any other country's version history: expect to be able to confirm the CURRENT edition's own text, but not any superseded edition's -- budget for filename-based dating of the older endpoint, not a verbatim read, and say so explicitly per node** (this session's three new nodes each carry that caveat in their own description field rather than leaving it implicit).
5. Because the older edition's text was unreadable, this session's three cadence estimates rest on CIRCABC's own file-history *filename* for the earlier version (e.g. `CY - EDP INVENTORY (2022.01).PDF` → January 2022) rather than a quoted title page, as the BE/HR/BG/DE nodes could manage. This filename convention has independently matched the verbatim title-page date in every single-edition country checked so far in this corpus, so it is not a guess out of nothing -- but it is one evidentiary step further removed from the primary source than the BE/HR/BG treatment, and each node's `cadence_note` says so rather than presenting the interval as directly observed.
6. Secondary finding, logged in `el-edp-inventory`'s description rather than adjudicated: Greece's own CIRCABC "Description" metadata field for the current (December 2025, version 2.0) file still reads "...compiled according to ESA95," while the PDF's own title page and closing paragraph both say ESA 2010 (matching the exact "This version introduces references to the ESA 2010..." sentence found in every other EDP inventory in this file). Stale metadata against live document text -- reported per Research.1.md §3, not resolved either way.
7. CIRCABC's own library-folder listing URL (documented in `G.65.md` Orientation §4, unchanged): `https://s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/07b0c02c-1b08-4ebb-8908-dd068b0dfcf2?p=1&n=100&sort=modified_DESC`. From there, click a file's row to reveal a "Details" action; the Details page carries a "File history" panel whose version rows are clickable links to `.../details/<version>` -- that per-version detail page is what has the (unreliable) Preview action for that specific historical blob.
8. Mechanical facts, carried forward and re-confirmed: `device_stage_files` / `device_commit_files` cap at 50 files per call; edit JSON by stage → copy to a scratch path → edit with Python's `json` module → validate with `json.load` → `SendUserFile` → `device_commit_files`, never in place under `/mnt/user-data/uploads/` (read-only). `device_bash` gives read/write shell access to the mounted folder directly, but this session followed the established stage-edit-validate-deliver-commit pipeline for the JSON edit rather than writing in place, matching every prior sweep session's convention. CIRCABC's "IMPORTANT" transition-notice modal reopens on every fresh page load (including internal navigations that reload the SPA shell) and must be closed before the next click registers -- confirmed again this session, now a five-plus-session pattern.
9. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A single-item session, at Thomas's direct request, rather than a punch-list or general sweep session. Input: `G.65.md` alone, plus direct browser access to CIRCABC. Method: the one item asked for (CY/CZ/EL CIRCABC version-history check), worked start to finish -- version history located, both endpoints of each country's interval read or dated, nodes and edges minted, `_dropped` entry annotated, file committed to disk -- then this hand-off written. No other item from `G.65.md`'s punch list (Brazil, the 20 remaining single-edition CIRCABC countries) was touched.
`npm run validate` was NOT run this session -- the same Windows-only esbuild/win32-linux mismatch through the device bridge noted in every recent hand-off back to `G.50.md`. A direct file-count across every `src/data/research/*.json` after this session's edit gives 399 reports / 483 dependencies / 378 `_dropped` entries, against `G.65.md`'s 396/477/378. That is +3 reports and +6 dependencies, and it reconciles exactly against this session's own edit: +3 reports (cy-, cz-, el-edp-inventory) and +6 dependencies (two `methodology_depends_on` edges per new node). `_dropped` is unchanged at 378 because the touched entry (`edp-inventory-regulation-479-2009.json`'s standing 26-country deferral, index 8) was annotated and not deleted, same convention as every prior sweep session. Same caveat as always: a file-count is not a validator run. Last confirmed-green validator run remains 2026-08-08 at 372/436.
No decision was referred to Thomas this session -- the item closed cleanly on direct browser evidence, with the one caveat (filename-dated rather than text-confirmed older editions) documented rather than escalated, since Research.1.md's own precedent (estimate cadence from an observed interval when the document doesn't state one) already covers this shape of finding.

## Headline result

The CY/CZ/EL CIRCABC version-history check `G.65.md` flagged as its cheapest remaining lever is fully closed: all three countries carried a distinctly-dated prior version, and all three are now minted (`cy-edp-inventory`, `cz-edp-inventory`, `el-edp-inventory`), each with the same two `methodology_depends_on` edges the DE/BE/HR/BG precedent established. Item 11 (the CIRCABC 26-country sweep) now stands at 6 of 26 minted (BE, HR, BG, CY, CZ, EL), up from 3 of 26 at the start of this session. The more durable result is the reproducible preview failure on every non-current CIRCABC file-history version (six for six this session) -- worth more to whoever continues item 11 than the three nodes themselves, since it sets expectations for what future countries' version-history checks can and cannot confirm directly.

## Findings

### 1. Cyprus -- two file-history versions, current edition read directly, prior edition filename-dated

`edp-inventory-regulation-479-2009.json`, closing the Cyprus third of `G.65.md`'s flagged lever. CIRCABC's Details page for the current file ("EDP INVENTORY CYPRUS 2024 22.06.2026.pdf") carries a File history panel: version 1.1 (2026 Jun 26) and version 1.0 (2024 Jul 10). The current version (1.1) opened cleanly in Preview -- 259 pages, title page reading "Inventory of the methods, procedures and sources used for the compilation of deficit and debt data and the underlying government sector accounts according to ESA 2010 / Cyprus / 2024 / December 2025 / Statistical Service of Cyprus," with the same Article 9 background-section boilerplate already confirmed for DE/BE/HR/BG. Version 1.0's Preview failed twice, in two separate browser tabs, both times with `Error: InvalidPDFException: Invalid PDF structure`; its filename, visible on its own Details page, is "CY - EDP INVENTORY (2022.01).PDF" -- January 2022 by the naming convention already confirmed to match title-page dates elsewhere in this corpus. Minted `cy-edp-inventory` with `releases_per_year: 0.26` (1 / 3.92 years, January 2022 to December 2025), plus `methodology_depends_on` edges to `eu-reg-479-2009` and `esa-2010`, both basis strings quoting the December 2025 edition directly. Reports 7→8, dependencies 11→13 in this file (counting from `G.65.md`'s post-session state).

### 2. Czechia -- four file-history versions, the richest version history found in this file so far

Closing the Czechia third of `G.65.md`'s flagged lever. CIRCABC's File history panel for "CZ_EDP Inventory 2025_03 2026.pdf" lists four versions: 1.3 (2026 Apr 22), 1.2 (2025 Apr 22), 1.1 (2024 Oct 22), 1.0 (2024 Jul 10). The current version (1.3) opened cleanly -- 196 pages, title page reading "...according to ESA2010 / The Czech Republic / 2025 / April 2026," same background boilerplate confirmed verbatim. All three earlier versions' Preview attempts failed identically with `InvalidPDFException`. Their own filenames, read from each version's Details page: v1.0 "CZ - EDP INVENTORY (2023.03).PDF" (March 2023), v1.1 "CZ_EDP INVENTORY 2023_09 2024.PDF" (September 2023), v1.2 "CZ_EDP INVENTORY 2024_03 2025.PDF" (March 2024). Minted `cz-edp-inventory` with `releases_per_year: 0.32` (1 / 3.08 years, March 2023 to April 2026, using the earliest and current editions only), plus the same two edges. The two intermediate filename-implied dates are recorded in the node's description and cadence_note as an observation -- they suggest a faster (roughly semi-annual) revision rhythm in 2023-2024 that slowed later -- but were not folded into the single cadence figure, since only the two endpoint dates carry any independent corroboration (the current edition's own text; the earliest edition's filename, consistent with the same convention confirmed elsewhere). Reports 8→9, dependencies 13→15.

### 3. Greece -- a version jump with no intermediate releases, and a stale metadata field caught in passing

Closing the Greece third of `G.65.md`'s flagged lever. CIRCABC's File history panel for "EL - EDP Inventory (2025.12).pdf" lists exactly two versions: 2.0 (2025 Dec 9) and 1.0 (2024 Jul 10, the same bulk-migration timestamp shared by dozens of other countries' v1.0 entries in this listing, per `G.65.md` Orientation §4's caveat that these "created" dates are largely a 2024 CIRCABC migration artifact rather than a real edition date). The current version (2.0) opened cleanly -- 147 pages, title page reading "...according to ESA 2010 / Greece / 2025" (no month on the title page itself; December is taken from the filename and CIRCABC's own last-modification timestamp), same background boilerplate confirmed. Version 1.0's Preview failed with the same `InvalidPDFException`; its filename is "EL - EDP INVENTORY (2018.02).PDF" (February 2018), and -- independently -- that version's own CIRCABC "Title" metadata field (a system field, distinct from the filename) reads "...compiled according to ESA95," corroborating a pre-ESA-2010 edition without needing the PDF's own text. Minted `el-edp-inventory` with `releases_per_year: 0.13` (1 / 7.83 years, February 2018 to December 2025) -- the longest interval among CY/CZ/EL/BE/HR/BG and second only to Germany's 9.83 years in this file. In passing, the CURRENT (2.0) file's own CIRCABC "Description" metadata field still reads "...compiled according to ESA95," directly contradicting the PDF's own title page and closing paragraph (both say ESA 2010). Quoted and logged in the node's description per Research.1.md §3 (report, don't adjudicate) rather than resolved. Reports 9→10, dependencies 15→17.

### 4. The preview-failure pattern itself, as a finding in its own right

Six attempts to open a non-current CIRCABC file-history version this session; six identical `InvalidPDFException: Invalid PDF structure` errors (Cyprus v1.0 twice, in separate tabs; Czechia v1.0, v1.1, v1.2; Greece v1.0). Zero attempts to open a CURRENT version failed. The consistency across three unrelated countries and files with no shared cause other than "not the current version" points at a CIRCABC-side limitation in how historical blobs are served to the PDF.js viewer, not at three coincidentally corrupted files. Not independently confirmed by inspecting network requests or file bytes this session -- flagged as a strong pattern from behavior, not a diagnosed root cause.

## Secondary observations (logged, low priority)

* CIRCABC's per-document Details page reuses the same URL pattern for every file-history version (`.../details/<version>`), and each version's own Details page carries its own independent "Preview" action pointed at that specific blob -- this is what made the systematic check across six versions possible without needing to hunt for a different UI path per version.
* The "IMPORTANT" transition-notice modal reopened on essentially every navigation this session (initial load, back-navigation, and reload after closing it once), consistent with `G.65.md`'s note that it "reappears on every fresh page load within the SPA" -- confirmed here to include internal client-side route changes, not just full page loads.
* Screenshot capture (`computer` tool, `screenshot` action) timed out repeatedly on this CIRCABC tab mid-session, apparently correlated with heavy PDF.js canvas rendering; `get_page_text` continued to work reliably as a fallback for reading both the UI chrome and the rendered PDF's extracted text layer, and was the primary tool used to confirm each title page this session.
* Czechia's four-version file history, once found, made clear that CIRCABC's version count is not a reliable proxy for "how many editions has this document had" across countries -- Greece jumped straight from 1.0 to 2.0 with no intermediate x.1 releases recorded, while Czechia recorded four. Worth remembering before assuming a country with a low version number has a short or simple history.

## Corrections to prior sessions

None. `G.65.md`'s framing of the CY/CZ/EL check as unexplored and its filename-convention precedent (used here for the unreadable older editions) both held up under this session's direct testing.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.61.md`–`G.65.md`. This session's work is entirely inside B.

* B — the corpus-wide `_dropped` sweep. Read-complete since `G.63.md`. The punch list itself has been fully closed since `G.65.md`. What remains is the same two scoped pieces `G.64.md` named, one of them advanced again this session:
   * Item 10, Brazilian fiscal reporting — still untouched across four sessions (`G.63.md`, `G.64.md`, `G.65.md`, this one). `G.64.md`'s framing that it needs a dedicated session has not been tested by any session since; it has simply not been picked up.
   * Item 11, the CIRCABC 26-country sweep — now 6/26 (Belgium, Croatia, Bulgaria, Cyprus, Czechia, Greece minted). Remaining: the same 20 single-edition countries `G.65.md` listed (`NL, FI, RO, IT, ES, IE, LT, HU, UK, SK, SI, SE, PT, PL, MT, LV, LU, FR, EE, DK, AT`), each needing an external second source (the Germany pattern) or a no-cadence-estimate minting decision -- neither attempted this session. The CY/CZ/EL version-number-anomaly lever `G.65.md` flagged as the cheapest next move is now fully spent; there is no equivalently cheap sub-item left inside 11 that this session is aware of.
* A, C, D, E, F, G — untouched this session. See `G.56.md`–`G.62.md` for their current state.

Worth putting to Thomas when he next picks this up: item 11's easy wins (both the two-edition-in-the-top-listing pattern from `G.65.md` and the version-history-anomaly pattern from this session) are now exhausted. What is left of item 11 is uniformly the harder case -- 20 countries needing either real research (finding each country's own statistics-office site, the way Germany's second edition came from Destatis rather than CIRCABC) or a deliberate no-cadence-estimate call. That is a different shape of work than the last two sessions' clicking-through-CIRCABC, and may be worth scoping as its own session the same way Brazil has been scoped, rather than continuing to treat it as a punch-list item.

## Cheap checks still outstanding

None identified this session. The one specific cheap check `G.65.md` named (CY/CZ/EL version history) is now closed, and this session did not generate a new one -- the preview-failure finding (§4 above) is a constraint on future work, not a lookup that's now cheap to close.

## What to pass at the start of next thread

1. This file's Headline result and Orientation §3-6, especially the preview-failure pattern (six for six, non-current versions only) and the filename-dating caveat it forces on any node minted from it going forward.
2. `G.65.md`, then `G.64.md`, `G.63.md`, `G.62.md`, `G.61.md` for the sweep's history.
3. `Research.1.md` §2 (git), §3 (extract, don't adjudicate), §4 (node rule — cadence-from-observed-interval is now load-bearing for nine nodes in this one file: `de-`, `be-`, `hr-`, `bg-`, `cy-`, `cz-`, `el-edp-inventory` plus the two German ESA 2010 GNI/QNA inventories elsewhere).
4. The one file changed this session — `src/data/research/edp-inventory-regulation-479-2009.json` — carrying three new nodes (`cy-edp-inventory`, `cz-edp-inventory`, `el-edp-inventory`), six new edges, and an annotated (not deleted) `_dropped[8]` entry.
5. The three nodes minted this session — `cy-edp-inventory`, `cz-edp-inventory`, `el-edp-inventory` — and that each carries an explicit "older edition filename-dated, not text-confirmed" caveat distinguishing it from the BE/HR/BG/DE treatment.
6. Brazil (item 10) has not been started across four sessions (`G.63.md` through this one). If picked up, treat it as its own dedicated session per `G.64.md`'s framing, not a punch-list item. Item 11's remaining 20 countries are now uniformly the "needs real research or a judgment call" case, not a quick click-through — see this file's "Thomas's stated priority" section.

## How to write the next hand-off

Added 2026-08-04. Copy this whole section verbatim into every successor, so the chain never depends on one file surviving. It is the spec, not an example — the file you are reading is the worked example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.
Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are `.docx`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `EU/`. Earlier files are `.docx`; that was the chat workflow's doing, not a preference.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `EU/G.<n>.json`. Do not hand-write it — run:


```
python3 scripts/handoff-to-json.py EU/G.<n>.md

```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). It exists so branch state can be read without parsing prose, and so a future session can diff two hand-offs. `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar; `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.

* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.

Required structure, in this order

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
What each section is for
Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. If the folder layout or the tooling changed, that goes here.
Session conditions — what constrained the work. Session type (extraction vs verification vs planning), what tooling was available, what did not arrive, what was left untouched by instruction. This is where "the sandbox failed" and "the governing briefs still did not arrive" belong. State plainly which sources you read in full, because everything downstream inherits that limit.
Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.
Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Mark any claim that depends on a predecessor's reading rather than your own — the house convention is (SEC04 per G.17). Quote verbatim; `Research.1.md` §2 applies here exactly as it does to research output.
Secondary observations — real but low-priority. Section fingerprints, oddities worth not rediscovering. Keep them short.
Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. This section is the reason the chain is trustworthy. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.
Thomas's stated priority for the remaining work — lettered blocks (A, B, C, D) carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. This section is what a new agent reads to answer "what is next".
Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. This is the list that gets raided when a session has capacity left.
What to pass at the start of next thread — the packing list, for the case where the next agent has no filesystem access. If it does have access, say so and keep the list anyway; it doubles as an index of what matters.
Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement. That is what makes the positive claims usable.
* Predictions are logged and then scored. G.17 predicted a code pattern; G.18 recorded that it "landed". Make falsifiable calls and settle them.
* Distinguish inference from documented fact, and say which narrow respect is still inference. G.18's headline rule is very well evidenced and still not printed in any document — it says so.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
