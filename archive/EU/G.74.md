# G.74.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` was NOT read this session — stated plainly because it is a real limit on everything below, and it is the second consecutive session for which that is true. As in `G.73.md`, this session did no research: it touched no source document, fetched no page, minted no node and wrote no new claim about the world, so §2's verbatim-quote rule and §6's citability test had nothing to bite on. Every change here is schema conformance and data-integrity repair against `src/lib/types.ts`, which WAS read in full before editing. `G.73.md` read in full — as chat context rather than off the device, which is worth stating because it means the device copy was assumed identical and not diffed. `EU/G.73.json`, `EU/R2.72.md` and `EU/R1.68.md` not reopened. `planning/MISSION-TODO-2.md` not read and not appended to: item 5 is closed and nothing here belongs to it.
Predecessor: `G.73.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. Do not run any git command against this repo. Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. This session worked entirely over the device bridge and the cloud sandbox, and never touched `.git`.
2. `npm run validate` exits 0, and `tsc --noEmit` is clean alongside it. `G.73.md` recorded the first green run in this branch's history; this is the second, and it is now green with **seven more invariants** than it was. If it is red for you, something changed after 2026-08-09 and the diff is worth finding before doing anything else.
3. The cloud-sandbox validate procedure is now three-for-three and should be followed verbatim rather than reinvented. `G.72.md` Orientation §4 describes it, `G.73.md` confirmed it, this session ran it twice more without deviation. Recap: stage `src/**` (all `.ts`/`.tsx`, all `src/data/research/*.json`) plus `scripts/`, `package.json`, `tsconfig.json`, `vite.config.ts`; copy out of `/mnt/user-data/uploads/` (it is read-only) into a scratch dir; `npm install` fresh there (~35s; the device's own `node_modules` is a Windows build and `@esbuild/win32-x64` fails inside the device's Linux bridge); `npx tsx scripts/validate-data.ts` and `npx tsc --noEmit`. `device_stage_files` caps at 50 files per call and there are ~100 files, so budget three calls — and expect an `HTTP 429` on the tail of a 50-file call, which is transient and fixed by re-staging just the rejected paths.
4. **Six closed unions now have runtime lists and validator rules; there are no unguarded ones left.** `JURISDICTION_LEVELS` and `DROPPED_REASONS` (added `G.73.md`) are joined by `SOURCE_KINDS`, `TERMINAL_REASONS`, `DOMAINS`, `RELATIONSHIP_TYPES`, `EVIDENCE_KINDS` and `RELATION_TYPES`. The shared reasoning is written once, in a long comment above `SOURCE_KINDS` in `types.ts`, and the other five point at it rather than restating it. Read that comment before adding a field to any of these unions — it explains why the compiler does not check them and never will while the slices are cast.
5. **`SUPERSEDED` now fails the run.** It used to print and exit 0. An edge defined twice is a data error, not a pattern; the fix is to merge the copies, preserving every distinct `basis` and `evidence_url` under a dated merge note, exactly as `G.73.md`'s Finding 5 did. The argument, including the counter-argument being overruled, is in the comment at the rule site in `scripts/validate-data.ts`.
6. Mechanical facts, carried forward unchanged: `device_stage_files`/`device_commit_files` cap at 50 files per call. `device_bash` gives read/write shell access to the mounted folder (`/sessions/<session>/mnt/Reports Clustering/` — quote the space; each call is a fresh `bash -c`, no cwd carryover), has `python3` and `node`/`npm`, and has **no network access**, which is the whole reason validation happens in the cloud sandbox. `device_commit_files` honours an `expectedMtimeMs` guard — pass the `mtimeMs` that `device_stage_files` returned. This session committed 4 files with the guard set on every one; none were rejected.
7. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A single-focus repair session with no research component, opened by Thomas choosing cheap check 9 from `G.73.md`'s list over the two alternatives offered (a survey of the untouched blocks A/C–G, or the Portugal / Liechtenstein / Switzerland coverage gaps). Thomas also gave two standing instructions for the session: **decide schema questions and document them** rather than putting each fork back to him, and write this hand-off at the end. Both are exercised below — the schema decision made under that authority is the `SUPERSEDED` tightening (Finding 4), which `G.73.md` had explicitly left as "Thomas's call".

No web fetch was made and no primary source was read. Every claim below rests on the corpus's own files, on `npm run validate`'s output, and on `tsc --noEmit`, all read directly in the cloud sandbox.

The working method deviated from `G.73.md`'s in one respect worth recording, because it is the reason this session is short. `G.73.md` staged, fixed, and validated in one pass. This session ran the **scan on the device first**, over `device_bash`, before staging anything: a 30-line Python walk over all 70 research slices plus a handful of `grep`s over the two hand-written TS slices, enumerating every distinct value of every union-typed field. That cost one tool call and answered the whole of cheap check 9's expensive half — which unions are actually violated — before the ~35-second `npm install` had been started. The staging and sandbox work was then only needed for the *fix*, not for the *finding*. This generalises: the device shell has `python3` and the corpus is JSON, so any question of the form "what values does field X actually hold" is one call away and does not need the sandbox at all.

What was NOT done, stated so downstream work inherits the limit: no source document was reopened to confirm that any research claim in the edited file is still correct. The one data edit appends a dated correction and leaves the original text intact; no existing sentence about the world was rewritten or deleted.

## Headline result

Cheap check 9 is closed, and its prediction was half right in a way worth recording precisely. It said four unions were unguarded and that both previously-checked unions had turned out to have violations, so these probably would too. **All four named unions scanned clean.** But the scan found two unions cheap check 9 did not name — `Domain` and `RelationType` — and one of those, `Domain`, held the session's only violation: `"manufacturing"`, on `de-destatis-quarterly-production-survey`, a value the union has never had.

So the corpus is in better shape than `G.73.md` expected on the fields it was watching, and had a hole in a field nobody was watching at all. `Domain` is the least-guarded union in the schema for a structural reason: it is imported by nothing outside `types.ts` — no filter, no legend, no colour — so an invented tag has no consumer to fail at, not even the flat grey an unmapped country falls back to. It is written on 473 reports and read by none of them.

All six unions are now guarded, at seven new validator rules, and every one of the seven was fired against doctored data before being trusted. `npm run validate` exits 0 and `tsc --noEmit` is clean. The corpus's own totals did not move: **473 reports, 605 dependencies, before and after** — the single data edit changed a tag that nothing reads, so the ranking output is byte-identical to the pre-session run except for one added `✓` line.

## Findings

### 1. Cheap check 9's four unions are clean, and that is a real result rather than a null one

`RelationshipType`, `SourceKind`, `TerminalReason` and `EvidenceKind` were enumerated across all 70 slices in `src/data/research/` and both hand-written TS slices (`src/data/reports.ts`, `src/data/dependencies.ts`). Every value found is a member of its union:

- `relationship_type` — 245 `methodology_depends_on`, 199 `uses_data_from`, 118 `calculated_from`, 29 `cites` in JSON; 9 / 3 / 1 / 3 respectively in TS.
- `source_kind` — 5 `commercial`, everything else absent (which means official).
- `terminal_reason` — 6 `unpublishable`, 1 `confidential`. `unidentified` and `redistributed` have **zero** live instances; `redistributed`'s own comment already says it "exists to be counted rather than to be reached for", so that is the field behaving as documented.
- `evidence` — 8 `implied`, everything else absent (which means documented).

This refutes cheap check 9's stated expectation, which was that these would look like `JurisdictionLevel` and `DroppedReason` did. They do not, and the difference is legible: the two that were broken are both fields a *human types while writing prose about a country* — a jurisdiction level and a reason for dropping a lead, where `"national"` and `"duplicate"` are the words a person would reach for unprompted. The four that are clean are all fields with a small, mechanical, frequently-copied set of values where the writer is pattern-matching an existing record rather than describing something. That is a hypothesis, not a finding, and it makes a falsifiable prediction: the next union violation to appear in this corpus will be in a prose-adjacent field, not in `relationship_type`. Logged so a future session can score it.

All four are guarded anyway. The reasoning is in the `SOURCE_KINDS` comment and is worth restating here because "the scan was clean, skip the guard" is the tempting move: the scan is the expensive half, and it only describes the corpus as it stood on one afternoon. The guard is four lines and describes it forever.

### 2. `Domain` had the session's only violation, and is the least-defended union in the schema

`de-destatis-quarterly-production-survey`, in `de-destatis-source-surveys.json`, carried `"domains": ["manufacturing"]`. `Domain` has nineteen members and has never had that one.

The mechanism is the interesting part, because it is worse than the `jurisdiction_level` case `G.73.md` found. That field at least had a consumer — `SCOPE_COLOUR`'s lookup — which failed silently to grey; 29 nodes had been rendering wrong, so the defect was in principle *visible* to anyone who looked at the graph and wondered why some nodes were grey. `Domain` has no consumer at all. `grep` for it across `src/` returns two hits, both in `types.ts`: the type declaration and the `domains: Domain[]` field on `Report`. Nothing imports it. There is no filter that filters by domain, no legend that lists domains, no colour derived from one. The field's own doc comment says "Used for filters and the legend", and that sentence describes an intention rather than the code — it has been false for as long as the comment has existed.

So `"manufacturing"` was not merely unchecked; it was unobservable. This is the third independent instance of the sentence this corpus keeps re-earning — *a field nothing renders is a field nobody checks* — after `country` (nine international bodies recorded as Canadian for five sessions) and `jurisdiction_level` (29 records, undetected for longer). The first two were fields with a weak consumer. This is the case with none.

Fixed by taking the corpus's own convention rather than minting a new union member. Every other production, manufacturing or industry survey in the corpus is tagged `national-accounts` — `statcan-msm`, `statcan-asml`, `nl-cbs-sbs`, `au-abs-australian-industry`, `anzsic`, `isic`, `nz-nzsioc` — and this record's own description says it is a GNI-inventory "production- and expenditure-approach source", which is a national-accounts input by that document's own framing. Retagged `["national-accounts"]`, with a dated correction appended to the description recording what the tag was, why it was wrong, and why no new member was minted (one node is not evidence that the union is missing a category, and `manufacturing` here names the survey's subject matter rather than an economic domain in this field's sense). The original description text is untouched.

The doc comment on `Domain` was not rewritten either — the false sentence is left in place with a dated correction beneath it, because the intention it describes is presumably still live and the 473 tagged reports are the work already done towards it. Deleting the sentence would hide a real open thread. See cheap check 3 below.

### 3. `RelationType` is a sixth closed union, and cheap check 9 did not know about it

Cheap check 9 named four. There are six unguarded closed unions in `types.ts`, not four: `Domain` (Finding 2) and `RelationType` were both missed. `RelationType` (`audits` | `supersedes`) governs the `Relation` interface added 2026-08-06, which is a whole parallel entity class — and being parallel is exactly why it was missed. It postdates the mental list cheap check 9 was drawn from, and it does not appear in `validate()` because relations deliberately never reach `buildGraph`.

It scanned clean: 2 `audits`, 1 `supersedes`, all three of which the validator already prints by name.

Guarded in `scripts/validate-data.ts` rather than in `validate()`, and the placement is a deliberate refusal rather than a convenience. `validate()`'s signature is `(reports, dependencies)`, and the `Relation` comment argues at length that this structural isolation — "here there is no call site to forget" — is what makes relations safe. Adding a third parameter so the check could live alongside the others would have been tidier and would have weakened the one property the type was designed around. The check goes where the relations already are.

### 4. `SUPERSEDED` now fails the run — cheap check 10, decided under Thomas's standing instruction

`G.73.md` left this as "Thomas's call". Thomas's instruction this session was to decide schema questions and document them, so it is decided: `loadIssues.duplicateEdges` now increments `invariantFailures`.

The case for is `G.73.md`'s Finding 5, which is a worked demonstration rather than a hypothetical. `fiscal-equalization-program -> statcan-system-macroeconomic-accounts` was defined three times, each copy citing a different provision of SOR/2007-303, and the loader's last-wins rule discarded two of the three verbatim statutory quotations on every build — while the edge continued to render as a normal, fully-cited edge. That is strictly worse than the `DUPLICATE IDS` case which already fails the run: a duplicate id loses a record you can recover from the surviving copy, whereas a superseded edge loses *evidence* for a claim that stays in the graph looking sound.

The case against is real and is being overruled rather than ignored, which is why it is written at the rule site as well as here: a deliberate override — a slice intentionally restating an edge to supersede an earlier one — is a legitimate pattern in principle, and this rule forbids it outright. It is overruled on three grounds. There are currently **zero** superseded edges, so the tightening costs nothing today and converts a scroll-past informational line into a live check. The pattern has never actually been used that way in this corpus: all three known instances were accidents that lost data. And if a future session finds a genuine need to override, the honest fix is an explicit field saying so, not silence — which is the same argument that produced `caveat` and then `resolved`.

Verified by firing: a duplicated edge appended to `equalization-payroll-base.json` produced `✗ fiscal-equalization-program->statcan-seph` and exit 1; removing it returned the run to byte-identical output and exit 0.

### 5. Every one of the seven new rules was fired against doctored data before being trusted

This is house convention (`graph.ts`'s own terminus-rule comment: "a rule nobody has watched fire is a rule nobody knows works, and a rule that fires on correct data is worse than no rule at all"), and it is recorded as a finding because it is the only evidence that the guards do anything.

Five off-union values were injected into one report and one edge in `de-destatis-source-surveys.json`, one into a relation in `gb-ukspf-succession.json`, and a duplicate edge into `equalization-payroll-base.json`. All seven rules fired, each with the offending value and the valid set named in the message; the run exited 1. Restoring the files returned the validator to output byte-identical to the pre-doctoring run and exit 0, which is the half of the test that matters more — a rule that fires on correct data is the failure mode being guarded against.

One incidental cross-check fell out of it: injecting `source_kind: "semi-official"` and `terminal_reason: "mislaid"` on the same node also tripped the pre-existing "is both commercial and a terminus" rule, because `isOfficial` treats anything that is not `"official"` as commercial. That is the silent-misreading mechanism described in the new `SOURCE_KINDS` comment, observed live: a typo in `source_kind` does not read as "invalid", it reads as "commercial", and would have pulled the node out of the authority calculation without a word.

## Secondary observations (logged, low priority)

- `RELATIONSHIP_TYPES` is deliberately a hand-written second list rather than `Object.keys(RELATIONSHIP_WEIGHT)`, which would have been shorter. The map is typed `Record<RelationshipType, number>`, so deriving the valid set from it would make the guard agree with whatever the map happens to contain instead of with the union — a guard that is its own authority checks nothing. Two lists that `tsc` cross-checks beats one list that cannot be wrong by construction. Noted because the shortcut looks obviously correct and is not.
- `unidentified` and `redistributed` have zero instances in the corpus. `redistributed`'s doc comment predicted this and asked that it not be reached for; `unidentified`'s did not, and its standing example (Alberta's Bitumen Valuation Methodology Regulation and the Minister's list of commodity brokers) is described in the type comment as though it were live. Either the node was never minted or it carries a different reason. Cheap to check; not checked this session.
- The validator output is 1,070 lines and its `✗` markers remain scattered rather than collected. `G.73.md` made this point and it is repeated only to add the mechanical form: `grep -n "✗"` over the captured output is the whole check, and capturing to a file rather than reading the stream is what makes a before/after `diff` possible — which is how this session established that the data edit changed nothing in the ranking.
- `device_stage_files` returned `HTTP 429` on the last 3 of a 50-file call. Re-staging just those 3 succeeded immediately. Not a size limit and not worth reducing batch size for; just re-stage the rejected paths.

## Corrections to prior sessions

1. **`G.73.md`'s cheap check 9 was incomplete in its inventory and wrong in its expectation.** It named four unguarded closed unions; there were six (`Domain` and `RelationType` were missed — Findings 2 and 3). And it predicted that these unions would have live violations, on the strength of both previously-checked unions having had them; the four it named were all clean (Finding 1). Both halves are worth recording rather than one: the expectation was reasonable and wrong, and the inventory was incomplete in a way that mattered, since the single violation the session found was in one of the two it did not name. Not a research error — a scoping error in a cheap-check note, which is exactly the kind of thing cheap-check notes are for and exactly why they get re-derived rather than trusted.
2. **`G.73.md`'s Secondary observations named the same four unions** ("`RelationshipType`, `SourceKind`, `TerminalReason` and `EvidenceKind` do not, and are the obvious next place to look"). Same correction as above, same non-blame: that session's own finding was about `JurisdictionLevel` and `DroppedReason`, and the list was written from the neighbourhood of those two rather than from an enumeration of the file.
3. **The `Domain` doc comment has been wrong since it was written.** "Used for filters and the legend, not for node colour" describes an intention; nothing outside `types.ts` has ever imported `Domain`. Corrected in place with a dated note rather than by rewriting the sentence, because the intention may still be live. No predecessor hand-off is being corrected here — this one predates the hand-off chain's coverage.
4. Nothing else in `G.73.md` was found wrong. Its Findings 1–5, its Corrections 1–4, and its account of the corpus totals all check out against this session's own run: 473 reports, 605 dependencies, 404 dropped notes with 20 `resolved` and 10 `caveat`, 3 relations, 24 isolated reports, 80 research leads. The `resolved` reason it added is in use and its edge-must-exist rule passes in both directions.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.73.md`. Nothing here reopens a closed item.

- **Cheap checks 9 and 10 — CLOSED this session.** 9 by scan-plus-guard (Findings 1–3, 5), 10 by decision under Thomas's standing instruction (Finding 4). There are now no unguarded closed unions in the schema.
- **B** — the corpus-wide `_dropped` sweep. Fully closed since `G.68.md`; its output was repaired at `G.73.md`. Not touched this session and needs nothing.
- **Item 5** (EU staging-blob batch backlog) — closed at `G.72.md`. Unchanged.
- **Item 2** (archive) and **Item 3** (rollup) — closed at `G.69.md`; the cadence gap was closed by `R2.72.md`. Per the five-per-`G.*.md` precedent the next rollup is due around `G.77`/`G.78`. This is now two sessions closer and worth watching rather than acting on.
- **A, C, D, E, F, G** — untouched, now across six consecutive sessions (`G.69`–`G.74`). See `G.56.md`–`G.62.md` for their current state. Six sessions is long enough that "what is actually left in them" is itself an open question, which is what makes the survey below the strongest candidate.

There is again no standing next item, and the schema-integrity thread that has run through `G.72`–`G.74` is now genuinely finished rather than paused — the validator has no known gap left in it. The three candidates offered at the start of this session and the last remain the menu, and their relative merit has shifted: **a survey of blocks A and C–G** is now the strongest of them, because six sessions of drift means nobody currently knows what is in those blocks, and every other candidate is a specific task that could be chosen more sensibly once that is known. The **Portugal / Liechtenstein / Switzerland peer-review coverage gaps** remain the strongest research-shaped option and are the only candidate that would put the branch back on primary sources, which it has not touched for two sessions. Cheap checks below are the raidable list, not a plan.

## Cheap checks still outstanding

Carried forward from `G.73.md` (its items 9 and 10 are closed and removed; the rest are renumbered), with three added this session.

1. Reread page 2 (Article 9 background section) directly for 20 of the 21 evergreen CIRCABC countries whose `eu-reg-479-2009` edge currently rests on the boilerplate's confirmed presence in eight other countries' copies. Low value, cheap.
2. Two filename-vs-title-page date mismatches (UK, NL) in `edp-inventory-regulation-479-2009.json` remain unadjudicated, per `Research.1.md` §3.
3. Greece's own CIRCABC metadata still reads ESA95 against the document body's ESA 2010, unresolved.
4. `ess-peer-review-final-report -> de/sk-ess-peer-review-report`'s `relationship_type` (`uses_data_from`, `G.69.md`'s judgment call) could be revisited against `cites` if a future session reads SWD(2024)136's own body text on how it aggregates member reports. Applies equally to `G.72.md`'s 26 new `uses_data_from` edges from the same source node.
5. Find the edge (if any) for the MIP scoreboard / Alert Mechanism Report. `EU/ECB-Staging-Batches_PartA_2026-08-05.md` is the cheapest place to look first.
6. NACE's own Article text (per `G.71.md` cheap check 6) — unchanged, not attempted.
7. The Destatis QNA-specific EVAS source list (per `G.71.md` cheap check 7) — unchanged, not attempted.
8. Portugal's third-round peer-review report PDF (per `G.72.md` cheap check 8) — try the `ine.pt` page again (the failure was a connect timeout, possibly transient), or search Statistics Portugal's own document library rather than its landing page. Unchanged, not attempted.
9. The two `edp-inventory` node ids whose prefix no longer matches their country field (`el-edp-inventory`/`GR`, `uk-edp-inventory`/`GB`, `G.73.md` Finding 2). Deliberately left; renaming means updating four dependency objects, the `_dropped` prose in the same file, and accepting that `G.72.md`–`G.74.md` name ids that no longer exist.
10. The `statcan-hfce` / `statcan-national-accounts` duplication question recorded in `statcan-macro-accounts.json` remains open on its own terms — `G.73.md`'s Finding 5 merge explicitly sidestepped rather than resolved it.
11. 24 reports are isolated (no edge in either direction) and 80 `_dropped` entries are research leads. Neither is a defect and neither is new, but several isolated entries (`ecb-*`, `oecd-icio`, `nato-defence-expenditure`, `ab-municipalaffairs-lgff-operating`, `eu-reg-2023-2841`) look like one afternoon's work each.
12. **NEW.** `Domain` is written on 473 reports and read by nothing (Finding 2). Two honest resolutions and they point opposite ways: wire it into `filter.ts` and the legend as its comment always claimed, or accept it as pure metadata and say so in the comment. Doing neither is what let `"manufacturing"` sit there. The first is a real feature and not cheap; the second is one comment edit. Worth putting to Thomas rather than deciding silently, because it is a product question, not a schema one.
13. **NEW.** `TerminalReason.unidentified` has zero instances, but its doc comment describes the Alberta Bitumen Valuation Methodology Regulation case as though it were live (Secondary observations). One `grep` for the regulation settles whether the node exists under a different reason or was never minted.
14. **NEW.** The prediction logged in Finding 1 — that the next union violation in this corpus will be in a prose-adjacent field rather than a mechanical one — is falsifiable and unsettled. A future session that finds one should score it here rather than let it lapse.

## What to pass at the start of next thread

1. This file, plus `EU/R2.72.md` per the standing convention. `R2.72.md` is the rollup current as of `G.72`; `G.73.md` and this file are everything after it, and `G.73.md` is worth passing too since three of this file's findings correct or extend it directly. `EU/R1.68.md` is superseded for the `G.64`–`G.68` window but remains the only record of it.
2. `npm run validate` exits 0 and `tsc --noEmit` is clean as of this session, with seven more invariants than at `G.73.md`. The procedure is Orientation §3 and now has three independent successful runs behind it.
3. Files touched this session, all committed to the device with `expectedMtimeMs` guards, none rejected: `src/lib/types.ts` (six new runtime lists, one long shared comment, one dated correction on `Domain`), `src/lib/graph.ts` (five new rules in `validate()` — `source_kind`, `terminal_reason`, `domains`, `relationship_type`, `evidence`), `scripts/validate-data.ts` (the `RelationType` rule, and `SUPERSEDED` made a failure), and one slice, `src/data/research/de-destatis-source-surveys.json` (one `domains` tag plus its dated correction).
4. **There are no unguarded closed unions left.** If you add a member to one, add it to both the union and its runtime list in the same edit — the lists are typed `readonly T[]`, so `tsc` will catch a value in the list that is not in the union, but nothing catches a value in the union that is missing from the list. That asymmetry is the one hole in this session's work and it is a small one: the failure mode is a valid value being rejected loudly, not an invalid one passing silently.
5. Do the scan on the device before staging anything (Session conditions). `device_bash` has `python3` and the corpus is JSON; any "what values does field X actually hold" question is one call and needs no sandbox.
6. `planning/MISSION-TODO-2.md` was not touched and needs no update — item 5 is closed and nothing here belongs to it.

# How to write the next hand-off

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
