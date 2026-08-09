# G.73.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: **`Research.1.md` was NOT read this session** — stated plainly because it is a real limit on everything below. This session did no research: it touched no source document, minted no node, and wrote no new claim about the world, so §2's verbatim-quote rule and §6's citability test had nothing to bite on. Every change here is schema conformance and data-integrity repair against `src/lib/types.ts`, which WAS read in full (twice — before and after editing it). `EU/G.72.md` and its sidecar `EU/G.72.json` read in full; `EU/R2.72.md` read in full — the three arrived as chat uploads rather than being read off the device, which is worth stating because it means the device copies were assumed identical and not diffed. `EU/R1.68.md` not reopened. `planning/MISSION-TODO-2.md` not read and not appended to: item 5 is closed and nothing here belongs to it.
Predecessor: `G.72.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. Do not run any git command against this repo. Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. This session worked entirely over the device bridge and never touched `.git`.
2. `G.72.md` closed item 5 (the EU staging-blob batch backlog). `R2.72.md` closed the rollup cadence. Neither left a scoped next item, so **Thomas chose this session's work directly from `G.72.md`'s own cheap-check list: items 9 and 10.** Both are now closed, along with three further defects the same pass turned up. There is again no standing next item — see Thomas's stated priority.
3. **`npm run validate` now exits 0.** Not "passes except for the known ones" — exit code 0, no `✗` lines, `tsc --noEmit` clean alongside it. As far as this chain records, that has never been true before: `G.72.md` got the validator *running* for the first time and it ran red. This is the first green.
4. **The cloud-sandbox validate procedure works and is worth reusing verbatim.** `G.72.md`'s Orientation §4 describes it; this session followed it without deviation and it worked first time, which is the more useful fact than the original discovery. Recap: stage `src/**` (all `.ts`/`.tsx`, all `src/data/research/*.json`) plus `scripts/validate-data.ts`, `package.json`, `tsconfig.json`; `npm install` fresh in a cloud scratch dir (~35s; the device's own `node_modules` is a Windows build and `@esbuild/win32-x64` fails inside the device's Linux bridge); `npx tsx scripts/validate-data.ts`. `device_stage_files` caps at 50 files/call and `src/data/research/` alone is 70 files, so budget three staging calls. Fix in the sandbox, then `SendUserFile` + `device_commit_files` back — the sandbox copy is not the corpus.
5. **A `_dropped` note may now carry `reason: "resolved"`.** New this session, and the one schema addition here that a future session must know about rather than merely benefit from: it means "this lead was worked and closed; the edge it names is deliberately in the graph". Like `caveat`, and unlike every other reason, its `source`/`target` MUST name a live edge — the validator checks both directions. See `DroppedReason` in `src/lib/types.ts` for the full reasoning.
6. Mechanical facts, carried forward: `device_stage_files`/`device_commit_files` cap at 50 files per call. `device_bash` gives read/write shell access to the mounted folder (`/sessions/<session>/mnt/Reports Clustering/` — quote the space; each call is a fresh `bash -c`, no cwd carryover), has `python3` and `node`/`npm`, and has **no network access**. `device_commit_files` honours an `expectedMtimeMs` guard — pass the `mtimeMs` that `device_stage_files` returned, and a file the user edited underneath you is refused rather than clobbered. This session committed 17 files in one call with the guard set on every one; none were rejected.
7. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A single-focus repair session with no research component, opened by Thomas choosing cheap checks 9 and 10 from `G.72.md`'s own list over the two alternatives offered (a survey of the untouched blocks A/C–G, or the Portugal / Liechtenstein / Switzerland coverage gaps). No web fetch was made and no primary source was read; every claim below rests on the corpus's own files and on `npm run validate`'s output, both read directly in the cloud sandbox.

The working method was `G.72.md`'s procedure applied unchanged, then a deliberate widening: rather than fix only the three defects `G.72.md` named, this session read the validator's *entire* output — including the blocks `G.72.md` printed but did not comment on — and treated every `✗` and every silent-data-loss block as in scope. That widening is where three of this session's five findings came from, and it cost almost nothing: the expensive part is the staging and the `npm install`, not the reading.

What was NOT done, stated so downstream work inherits the limit: no source document was reopened to confirm that any *research* claim in the edited files is still correct. Where a description or basis field was edited, the edit appends a dated correction and leaves the original text intact; no existing sentence about the world was rewritten or deleted.

## Headline result

**`npm run validate` exits 0 for the first time in this branch's recorded history, and `tsc --noEmit` is clean alongside it.** Getting there closed both cheap checks Thomas named and three further defects the same pass surfaced, across 17 files: 29 reports carrying a `jurisdiction_level` outside the type's own union (28 `"national"`, 1 `"territorial"`), two country codes (`EL`/`UK`) the palette has never had entries for, 20 `_dropped` notes whose diagnosis turned out to be neither of the two the validator offered, one duplicate report id silently collapsing two records into one, one dependency defined three times across two slices with two of its three statutory citations silently discarded, and one `_dropped` reason (`"duplicate"`) that is not a member of `DroppedReason` at all and was being tallied and printed as though it were a category.

**The corpus's own totals did not move: 473 reports, 605 dependencies, before and after.** That is the point rather than a disappointment — every one of these was a defect in how the corpus described itself, not in what it contains, and a repair pass that moved the counts would have meant something was being lost or invented. Three schema-level guards were added so that each class is caught next time rather than re-discovered.

## Findings

### 1. 29 reports carried a `jurisdiction_level` that is not a `JurisdictionLevel` — `G.72.md` found one of them

`G.72.md`'s cheap check 9 named `sk-ess-peer-review-report`'s `jurisdiction_level: "national"` as "the same category of pre-existing, cheap, validate-catchable defect" as the `EL`/`UK` palette errors. It was right about the category and wrong about the scale by a factor of 29: a corpus-wide scan found 28 reports on `"national"` (27 EDP inventories in `edp-inventory-regulation-479-2009.json`, plus that one ESS peer-review report) and one on `"territorial"` (`pr-planning-board-informe-economico`). Neither string is a member of the union.

**It was not validate-catchable.** That is the finding. `G.72.md` reasonably assumed the validator would flag it once someone looked; it would not have, because `validate()` had no rule for the field. The union is closed, so this looks like the compiler's job — but the slices are *cast*, not parsed, so the compiler never sees the hand-typed string, and the only runtime consumer is `SCOPE_COLOUR`'s own lookup, where a miss falls back silently to unclassified grey rather than complaining. All 29 nodes have therefore been rendering in the flat grey reserved for "belongs to no system I know about" — the exact failure mode `palette.ts`'s own `isKnownCountry` comment describes for countries ("nine international bodies were Canadian for five sessions"), one field over and undetected for longer.

Fixed by taking the corpus's own answer rather than inventing one. `de-edp-inventory` sits in the same file as the 27 and already uses `"federal"`; `G.72.md`'s Secondary observations already recorded `"federal"` as the corpus-wide convention for a central-government publisher in a unitary state, naming `de-ess-peer-review-report`, `no-ssb-kostra` and `lu-statec-ipch`. All 28 `"national"` records → `"federal"`. For Puerto Rico, the sibling node `pr-fomb-fiscal-plan` in the same file uses `"provincial"`, and `palette.ts` files `PR` under the `US` family where the comment states `provincial` still means "state"; `"territorial"` → `"provincial"`.

Guarded: `JURISDICTION_LEVELS` added to `types.ts`, checked in `validate()`.

### 2. `EL` and `UK` are Eurostat's codes, not this corpus's — the records were wrong, not the palette

`G.72.md`'s cheap check 9 offered the fork honestly ("either add the two palette entries, or confirm `GR`/`GB` is the corpus's actual intended code"). The corpus answers it unambiguously and without a fetch: `COUNTRY_FAMILY` carries `GR: 'EU'` among the 27 member states and `GB: 'XEU'` with a comment naming it "the former member", both hand-written and both deliberate. Corpus-wide the codes run 12 × `GB` against 1 × `UK`, and 2 × `GR` against 1 × `EL`. The two odd ones out are both in `edp-inventory-regulation-479-2009.json` and both trace to the same source: CIRCABC's own filenames, which the records quote verbatim (`'EL - EDP Inventory (2025.12).pdf'`, `'UK - EDP Inventory (2015.12).pdf'`). `EL` and `UK` are Eurostat's own country codes; the corpus uses ISO. Records fixed, palette untouched.

**The node ids `el-edp-inventory` and `uk-edp-inventory` were deliberately NOT renamed.** They are opaque keys, they are referenced by four dependency objects and by `_dropped` basis prose within the same file, and — the deciding reason — they are named as such in `G.72.md`, `R2.72.md` and this file, so renaming them would silently break the hand-off chain's own references for a cosmetic gain. Recorded here rather than left as an unexplained inconsistency: the id prefix no longer matches the country field for exactly these two nodes.

### 3. All 20 note/graph mismatches diagnose the same way, and it is neither diagnosis the validator offered

Cheap check 10 asked for a triage of the 20 `_dropped` notes whose `source`/`target` pair the live graph contains, and framed it as the validator does: "either the drop note is stale (the edge was added later and the note never removed) or the edge is a duplicate that should not exist."

Neither. All 20 are the same thing, and it is deliberate. Every one carries a preamble of the form `RESOLVED 2026-08-09 (sweep session, Tier-N item #M). Minted <node> and wired <edge>. Original entry follows.` followed by the untouched original text. They are the Block B `_dropped` sweep's own resolution records — and one of them states the convention explicitly, in its own words: *"recorded as resolved rather than deleted so this file's own history is complete."* The edges are real, singular and correctly wired; every claim each note makes about having wired an edge checks out against the graph.

So the sweep that closed at `G.68.md` produced output its own validator rejects, and both remedies the validator names would have damaged the corpus — deleting the notes discards the original blocker text (the most useful thing in a resolved lead, since it records what a future session would otherwise re-derive), and "resolving" them means nothing when they are already resolved.

Put to Thomas as a four-way choice; he took the schema addition. **`resolved` is now a `DroppedReason`**, carrying `caveat`'s edge-must-exist obligation in both directions, and all 20 notes re-reasoned to it (from `no-node-yet` ×13, `note` ×4, `deferred` ×2, `no-document` ×1). The alternative of overloading `caveat` was available and cheaper and was rejected on the grounds that it would have worked mechanically and lied semantically: `caveat` is documented as an *unresolved* discrepancy on a minted edge, and these are its exact opposite.

The wider point, and the reason this is a finding rather than a chore: **`caveat` was added on 2026-08-07 for precisely this shape of problem — a note class the schema could not express, faking a different reason to pass validation — and the same thing happened again nine days later in a different corner.** Two instances is a pattern worth naming: when the validator rejects deliberate, well-reasoned data, suspect the vocabulary before the data.

### 4. `statcan-qsfs` was minted twice, and the second minting is a tenth instance of the cross-file blind spot

`npm run validate` prints a `DUPLICATE IDS` block and increments its failure count on it, so this was failing the run before this session and was not mentioned in `G.72.md`'s account of that run. `statcan-qsfs` is defined in both `grok-h1-classification-hubs.json` and `statcan-macro-accounts.json`; loading keeps the first and silently drops the second.

The provenance is legible from the records themselves. The `statcan-macro-accounts.json` copy's own description says it was `Minted 2026-08-09 (sweep session, Tier-2 item #15)`, closing a `no-node-yet` lead — and the `grok-h1-classification-hubs.json` copy, from the earlier `grok-h1` research generation, was already there. **This is the same failure `[[cheap-check-grep-first]]` names and `G.70.md` proved at batch-cluster scale: the sweep never grepped the corpus for the id before minting it.** By the running count that memory keeps, this makes ten.

Merged into one record rather than one deleted. The `statcan-macro-accounts.json` copy carries the fuller citation trail (three independent namings across IMDB records 1901 and 1301) and was kept; the classification-hubs copy's only unique sentence — the NAICS single-classification rule, which is exactly the kind of fact a classification-hubs slice exists to record — was folded into it, along with a dated correction recording the duplication. The classification-hubs copy was deleted.

### 5. One dependency was defined three times and two of its three statutory citations were being discarded

`fiscal-equalization-program -> statcan-system-macroeconomic-accounts` (`calculated_from`) is defined twice in `equalization-named-products.json` and once in `equalization-payroll-base.json`. The loader's rule is last-wins, so two of the three objects were dropped on every build — and they were not redundant copies. Each cited a *different* provision of SOR/2007-303: s. 3.1's three capital-formation aggregates, s. 5(b)(i)'s all-provinces corporate-profits revenue base, and s. 8(1)(y)'s wages-and-salaries and military-pay terms. Two of those three verbatim statutory quotations were being silently thrown away.

The validator did print this — `SUPERSEDED — edges defined twice (last wins; the earlier copy was dropped)` — but unlike `DUPLICATE IDS` it does not increment the failure count, so it has been scrolling past as informational output. It is worse than the duplicate-id case, not better: a duplicate id loses a record you could recover from the other copy, while a superseded edge loses *evidence for a claim that stays in the graph looking fully cited*.

Merged to one object, kept in `equalization-payroll-base.json` because it is the only one of the three carrying a `reference_period`. All three bases and all three `evidence_url`s are preserved in the surviving `basis` field, labelled (a)/(b)/(c) under a dated merge note; the two duplicates were deleted from `equalization-named-products.json`.

Not changed, and flagged instead: the `SUPERSEDED` block still does not fail the run. Whether it should is a judgement call about how often a deliberate override is a legitimate pattern in this corpus, and this session had no basis for making it. See Cheap checks.

## Secondary observations (logged, low priority)

* One `_dropped` note in `ess-peer-review-country-reports.json` carried `reason: "duplicate"` — a value `DroppedReason` has never had. The validator tallies reasons by string without checking membership, so it printed `1  duplicate` in the reason breakdown as though it were a category, which is how it survived. Its `source`/`target` are both null and it is an observation about batch clustering, so it is a `note`; re-reasoned, with the original text preserved under a dated correction. `DROPPED_REASONS` added to `types.ts` and checked, so the next one fails the run.
* Three of this session's five findings, and the secondary observation above, share one shape: **a closed TypeScript union that the compiler cannot enforce, because the data is cast rather than parsed.** `Country` was opened deliberately on 2026-08-04 and `isKnownCountry` was written for exactly this reason, with a comment saying so. Nobody applied the same reasoning to the three unions sitting next to it. All three now have runtime lists and validator rules; `RelationshipType`, `SourceKind`, `TerminalReason` and `EvidenceKind` do not, and are the obvious next place to look.
* The validator's output is ~1,100 lines and its `✗` markers are scattered through it rather than collected. `G.72.md` reported three problems from a run that contained five. Reading it end to end costs one `grep` and is worth doing rather than reading the ERRORS block alone.

## Corrections to prior sessions

1. **`G.72.md`'s cheap check 9 understated its own finding by a factor of 29.** It named `sk-ess-peer-review-report`'s `jurisdiction_level` as a single "same category" defect alongside the two palette errors. There were 29 such records corpus-wide (Finding 1). **Confirmed and extended, not refuted** — the diagnosis was exactly right and the scope was not checked. The specific mechanism worth carrying: `G.72.md` filed it as "validate-catchable", and it was not, because no rule existed for the field. An assumption that the validator would have caught something is itself a claim, and this corpus's own discipline says to check claims against the artefact rather than the expectation.
2. **`G.72.md`'s account of its own validator run was incomplete.** It reported two errors and a 20-item mismatch list. The same run also printed a `DUPLICATE IDS` block (which increments the failure count, so it was one of the reasons that run was red) and a `SUPERSEDED` block naming a triple-defined edge. **Not refuted — under-reported.** Both are Findings 4 and 5 here. No blame attaches: that session's assignment was batch 46 and the validator run was incidental to it, which is precisely when a long output gets skimmed.
3. **`R2.72.md`'s "Live problems" section inherits both understatements**, since it summarised `G.72.md` faithfully. Its three-item list ("two validator errors… a 20-item mismatch list… `sk-ess-peer-review-report`'s `jurisdiction_level`") should be read as six items, of which all six are now closed. The rollup itself is not wrong about anything it saw; noted so a future reader of `R2.72.md` alone is not surprised by this file.
4. **The Block B `_dropped` sweep (closed `G.68.md`) left the corpus in a state its own validator rejected, and this was invisible until `G.72.md`.** Not a research error and not a judgement error — the convention of preserving resolved leads is right and has been kept. It is a schema gap, and `R2.72.md`'s own observation stands confirmed with a second instance: every "arithmetic, not a validator run" caveat this chain carried was an unconfirmed *schema*, not just an unconfirmed number.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.72.md`. Nothing here reopens a closed item.

* **Cheap checks 9 and 10 — CLOSED this session**, along with three further defects found in the same pass (Findings 4, 5, and the Secondary observation). `npm run validate` exits 0.
* B — the corpus-wide `_dropped` sweep. Fully closed since `G.68.md`. Its output was repaired this session (Finding 3) without reopening the sweep itself.
* Item 5 (EU staging-blob batch backlog) — closed at `G.72.md`. Unchanged.
* Item 2 (archive) and Item 3 (rollup) — closed at `G.69.md`; the cadence gap `G.72.md` flagged as four sessions overdue was closed by `R2.72.md`. Per the five-per-`G.*.md` precedent the next rollup is due around `G.77`/`G.78`.
* A, C, D, E, F, G — untouched, now across five consecutive sessions (`G.69`–`G.73`). See `G.56.md`–`G.62.md` for their current state.

**There is again no standing next item.** `G.72.md` said "a future session should look to Thomas for the next item"; this session was that instruction being given, and it is now spent. The same three candidates offered at the start of this session remain the obvious menu: a survey of blocks A and C–G to find out what is actually left in them, the Portugal / Liechtenstein / Switzerland peer-review coverage gaps, or a new assignment. Cheap checks 1–8 and 11–13 below are the raidable list, not a plan.

## Cheap checks still outstanding

Carried forward from `G.72.md` (items 1–8 unchanged; its items 9 and 10 are closed and removed), with three added this session.

1. Reread page 2 (Article 9 background section) directly for 20 of the 21 evergreen CIRCABC countries whose `eu-reg-479-2009` edge currently rests on the boilerplate's confirmed presence in eight other countries' copies. Low value, cheap.
2. Two filename-vs-title-page date mismatches (UK, NL) in `edp-inventory-regulation-479-2009.json` remain unadjudicated, per `Research.1.md` §3.
3. Greece's own CIRCABC metadata still reads ESA95 against the document body's ESA 2010, unresolved.
4. `ess-peer-review-final-report -> de/sk-ess-peer-review-report`'s `relationship_type` (`uses_data_from`, `G.69.md`'s judgment call) could be revisited against `cites` if a future session reads SWD(2024)136's own body text on how it aggregates member reports. Applies equally to `G.72.md`'s 26 new `uses_data_from` edges from the same source node.
5. Find the edge (if any) for the MIP scoreboard / Alert Mechanism Report. `EU/ECB-Staging-Batches_PartA_2026-08-05.md` is the cheapest place to look first.
6. NACE's own Article text (per `G.71.md` cheap check 6) — unchanged this session, not attempted.
7. The Destatis QNA-specific EVAS source list (per `G.71.md` cheap check 7) — unchanged this session, not attempted.
8. Portugal's third-round peer-review report PDF (per `G.72.md` cheap check 8) — try the `ine.pt` page again (the failure was a connect timeout, possibly transient), or search Statistics Portugal's own document library rather than its landing page. Unchanged this session, not attempted.
9. **NEW.** `RelationshipType`, `SourceKind`, `TerminalReason` and `EvidenceKind` are closed unions with no runtime list and no validator rule, exactly as `JurisdictionLevel` and `DroppedReason` were before this session. Both of those turned out to have live violations. Cheap: one scan per union against the corpus, and if clean, add the guard anyway — the guard is four lines and the scan is the expensive half.
10. **NEW.** Should `SUPERSEDED` (an edge defined twice, last wins) fail the run the way `DUPLICATE IDS` does? Finding 5 shows it can silently discard verbatim statutory evidence for a claim that stays in the graph looking fully cited. The counter-argument is that a deliberate override may be a legitimate pattern somewhere in this corpus — but there are now zero superseded edges, so the rule could be tightened at no cost and would be a live check rather than a scroll-past line. Thomas's call.
11. **NEW.** The two `edp-inventory` node ids whose prefix no longer matches their country field (`el-edp-inventory`/`GR`, `uk-edp-inventory`/`GB`, Finding 2). Deliberately left; if a future session decides to rename them, it must also update four dependency objects, the `_dropped` prose in the same file, and accept that `G.72.md`/`R2.72.md`/`G.73.md` will name ids that no longer exist.
12. Carried from the general list: the `statcan-hfce` / `statcan-national-accounts` duplication question recorded in `statcan-macro-accounts.json` remains open on its own terms — Finding 5's merge explicitly sidesteps rather than resolves it.
13. **NEW.** 24 reports are isolated (no edge in either direction) and 80 `_dropped` entries are research leads. Neither is a defect and neither is new, but the isolated list is now printed on a green run where it used to be buried in a red one, and several entries on it (`ecb-*`, `oecd-icio`, `nato-defence-expenditure`) look like one afternoon's work each.

## What to pass at the start of next thread

1. This file, plus `EU/R2.72.md` per the standing convention — the rollup is current as of `G.72` and this file is the only thing after it. `EU/R1.68.md` is superseded for the `G.64`–`G.68` window but still the only record of it.
2. **`npm run validate` exits 0 as of this session.** If it does not for you, something changed after 2026-08-09 and the diff is worth finding before doing anything else. The procedure is Orientation §4 and it now has two independent successful runs behind it.
3. Files touched this session, all committed to the device: `src/lib/types.ts` (added `JURISDICTION_LEVELS`, `DROPPED_REASONS`, and the `resolved` member of `DroppedReason`), `src/lib/graph.ts` (jurisdiction-level rule in `validate()`), `scripts/validate-data.ts` (unknown-reason rule; `resolved` folded into the caveat rules), and 14 slices under `src/data/research/`. `tsc --noEmit` is clean.
4. **`reason: "resolved"` exists now** (Orientation §5). A future sweep that closes a lead should use it rather than leaving a `no-node-yet` note pointing at a live edge — which is what produced Finding 3.
5. Cheap check 9 is the direct sequel to this session's work and the cheapest thing on the list: four more closed unions that nothing checks, in a corpus where the two that were checked this session both turned out to have violations.
6. `planning/MISSION-TODO-2.md` was not touched this session and needs no update — item 5 is closed and nothing here belongs to it.

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
