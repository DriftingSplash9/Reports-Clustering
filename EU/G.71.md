# G.71.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in full this session (1276 lines), specifically to re-apply §2 (verbatim-quote-or-nothing), §4 (node eligibility, recurring-shape vs. one-off-instrument), §5a (comparable-with is not a dependency), §6 (Part A/Part B format, `AGENCY ONLY`/`NOT FOUND` as valid results), and §7 (classification-hub rule — read the programme, not the classification) against material this stack repeatedly tested. `EU/G.70.md` read in full — it is the whole input to this session's starting state and named the ESA-2010-methodology stack as the clear next cluster. `planning/MISSION-TODO-2.md` item 5 read in full, then appended to (never edited) with this session's closing update. `EU/slices/_staging/01-manifest.json` and `10-batch-with-records.ndjson` read for all 14 target batches (0, 1, 2, 5–15) plus batch 38. `src/lib/types.ts` read to confirm `Report`/`Dependency` schema compliance before writing JSON. `EU/R1.68.md` not reopened this session — nothing in this session's work touches block B or the rollup itself, and `G.70.md` did not flag it as needed for item 5's own continuation.
Predecessor: `G.70.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. Do not run any git command against this repo. Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. This session worked entirely over the device bridge and never touched `.git`.
2. `G.70.md`'s corpus-grep pass cut item 5's backlog from "46/47 remain" to 16 batches, and named the fourteen-batch ESA-2010-methodology stack (0, 1, 2, 5–15) as the clear next cluster, confirmed by grep to have zero prior corpus coverage. Thomas's direct instruction opening this session, verbatim: **"lets grind through the last 16 batches."** This session worked 15 of those 16 — the 14-batch ESA-2010-methodology stack in full, plus batch 38's small post-2027 remainder — and deliberately left batch 46 (29 uncitable country peer-review records) untouched, per the standing "do it last" instruction both `G.50.md` and `G.70.md` carried forward. **Batch 46 is the one item left open from the 16-batch instruction.**
3. New file this session: `src/data/research/esa2010-methodology-stack.json` (7 reports, 9 dependencies, 24 dropped), registered in `src/data/index.ts` (one import line, one array entry, appended after `noGovernmentFinance`). This is the branch's first entirely new node/dependency file since `G.69.md`'s `ess-peer-review-country-reports.json`.
4. Per `G.70.md`'s own closing instruction (cheap check 5 in its list, and its "worth putting to Thomas" paragraph): before deep-reading, this session re-ran the grep-first check against the stack's own document codes (KS-GQ-23-002, KS-RA-07-013, Regulation 451/2008, "quarterly financial accounts for general government," etc.) and found nothing already covered under an untracked name — the zero-coverage finding held. Worth repeating the same discipline before batch 46, even though batch 46's records are country peer-review reports rather than methodology documents and a hidden-duplicate finding is less likely there.
5. Mechanical facts, carried forward and re-confirmed: `device_stage_files`/`device_commit_files` cap at 50 files per call. `device_bash` gives read/write shell access to the mounted folder directly (`/sessions/<session>/mnt/Reports Clustering/` — quote the space; each call is a fresh `bash -c`, no cwd carryover). This session's JSON build went through `/tmp` in the cloud workspace (not the device), validated with `python3 -c "json.load(...)"` after every addition, then delivered via `SendUserFile` + `mcp__remote-devices__device_commit_files` in two checkpoints plus a final re-commit once batch 38's two `_dropped` entries were added after the second checkpoint — the intermediate on-device copy was briefly stale between checkpoint 2 and the final commit; this is now resolved, the on-device file matches the final 7/9/24 counts.
6. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A single-focus session executing Thomas's "grind through the last 16 batches" instruction. Worked by subject cluster per item 5(a), not by raw batch index: batches 8+9 (CPA/NACE), batches 6+7 (Annex A sector-classification and market/non-market rules), batches 5+11+12+13+14+15 (ESA 2010's own Articles and Annex A accrual-basis/time-of-recording rules), batches 1+2+10 (Eurostat's own methodology manuals), batch 0 (Statistical Requirements Compendium, Transmission Programme, Destatis source material, List of main statistics, HERP and consistency-guidelines handbooks), and batch 38's post-2027 remainder. Several live searches were used, consistent with item 5(e)'s "one extra search per batch" budget: WebFetch against EUR-Lex for the CPA regulation (succeeded) and NACE's founding regulation (failed — metadata only, both URL forms), WebFetch for the standalone ESA 2010 Transmission Programme companion PDF (succeeded), and three separate WebSearches checking for second editions of candidate manual nodes (SUT/IOT Manual, HERP guidelines, Consistency guidelines — all three came back negative). `npm run validate` was not run this session (no shell access to the actual npm project from the device bridge in a way that was exercised); every JSON addition was instead validated with `python3 -c "json.load(...)"` after each edit, which confirms well-formedness but not `validate`'s full schema/dangling-edge checks. **Recommend running `npm run validate` from the device or a connected environment before the next session, to confirm this file's edges resolve cleanly against the full corpus** — this is the one verification step this session could not perform itself.

## Headline result

**All 14 batches of the ESA-2010-methodology stack (0, 1, 2, 5–15) plus batch 38's post-2027 remainder are now worked, closing 15 of the 16 batches `G.70.md` identified as genuinely remaining.** Seven new nodes minted: `eurostat-src` (Statistical Requirements Compendium), `eurostat-manual-qna` (Handbook on Quarterly National Accounts), `eurostat-quarterly-nonfinancial-accounts-ggov`, `eu-manual-qnfagg` (Manual on Quarterly Non-Financial Accounts for General Government), `eu-manual-qfagg` (Manual on Quarterly Financial Accounts for General Government), `eu-manual-mgdd` (Manual on Government Deficit and Debt), and `cpa` (Regulation (EC) No 451/2008, the Statistical Classification of Products by Activity). Nine dependencies minted, the most consequential being `esa-2010 -> cpa` (`methodology_depends_on`) — the corpus's biggest documented classification gap (`esa2010-quality-reporting.json`'s previously-declined bundled "esa-2010 -> NACE, CPA, COICOP, COFOG, NUTS" entry) now has its first resolved member, reached the way §7 prescribes: not by reading CPA's own documentation, but by reading ESA 2010's own Annex A prose (paragraph 1.22) stating it uses CPA for products. NACE itself stays unminted — confirmed real and titled at EUR-Lex, but no verbatim Article text was retrievable live this session, and per §6 a confirmed title is not a substitute for a quote. Twenty-four `_dropped` entries logged, none silently discarded. **Batch 46 (29 uncitable country peer-review records) remains the one deliberately unworked item from the 16-batch instruction** — consistent with the standing "do it last" flag every prior session carrying this item has recorded.

## Findings

### 1. CPA is a real node, reached via §7's classification-hub rule; NACE is real but not yet mintable

Batches 8 and 9 staged both classifications together. CPA's founding regulation, (EC) No 451/2008, rendered cleanly via WebFetch at its EUR-Lex consolidated-form page, giving a verbatim title and adoption date sufficient for a one-off-instrument node per §4 (no cadence needed — this is a regulation, not a Eurostat guidance manual). ESA 2010's own Annex A, Chapter 1, paragraph 1.22 (staged three times independently, in batches 6, 7, and 8, all three agreeing verbatim on the operative sentence) states in flowing prose that ESA 2010 uses CPA for products — the programme-level statement §7's NAICS precedent requires, not a bulleted list naming five classifications at once (that shape was already correctly declined in `esa2010-quality-reporting.json`). NACE's founding regulation, (EC) No 1893/2006, is confirmed real and titled the same way, but two separate WebFetch attempts (the `eli` and `legal-content` URL forms) returned only metadata and navigation chrome, never body text — unlike CPA's page, which is in a newer consolidated form that rendered cleanly. Per §6, a confirmed title and regulation number are not a substitute for a verbatim quote, so NACE was logged `_dropped`/`no-node-yet` rather than minted on title alone. The same Annex A paragraph that supports the CPA edge also names NACE for industries in the same sentence — once NACE's own Article text is retrievable (or a downstream programme's methodology page names it directly, satisfying §7 independently of the founding regulation), this edge is one step away, not a fresh search.

### 2. Five Eurostat/EU methodology manuals form a coherent `methodology_depends_on` cluster, all citing ESA 2010 directly

Batches 1, 2, and 10 staged the Handbook on Quarterly National Accounts, the Quarterly Non-Financial Accounts for General Government (report itself, distinct from its manual), the Manual on Quarterly Non-Financial Accounts for General Government, the Manual on Quarterly Financial Accounts for General Government, and the Manual on Government Deficit and Debt (MGDD). Each carries its own verbatim statement of ESA 2010 dependency, minted as `methodology_depends_on` per the relationship-type ranking (methodology_depends_on outranks cites, and each manual's own text frames itself as implementing ESA 2010's rules rather than merely referencing them). Two secondary edges: the QNA Handbook cites the Manual on Quarterly Non-Financial Accounts for General Government directly (a cross-manual citation, not methodology dependence — the weaker relationship type was the correct call per the ranking), and MGDD cites Regulation 479/2009 (the EDP inventory regulation, already a node from an earlier session) directly in its own text.

### 3. Batch 0 closes the branch's long-standing "read the Transmission Programme's own tables" test

Item 5(e)'s standing note flagged the ESA 2010 Transmission Programme as "the better test of the branch's central asymmetry finding" — that where the EU binds by Regulation it names nobody, where it coordinates by agreement it names its sources freely. This session located and read the standalone Transmission Programme companion PDF directly (one extra search, within the item 5(e) budget) and confirmed its table overview lists only table numbers, deadlines, and reporting periods — never publication titles. This is the same disclosure asymmetry already established elsewhere in the corpus, now corroborated by an independent second primary source rather than resting on a single prior reading. One node was minted from batch 0's other material: `eurostat-src`, the Statistical Requirements Compendium, citing both ESA 2010 and Regulation (EU) 2016/2304 directly.

### 4. One confirmed cross-file redundancy, one genuine new lead, distinguished by direct string comparison rather than title similarity

Batch 0 also staged Destatis GNI-inventory source material. A direct Python string-membership check against the existing `de-destatis-source-surveys.json` (comparing specific EVAS survey codes, not just document titles) confirmed exact duplication — dropped `no-document` rather than re-minted. A sibling document in the same batch, Destatis's own QNA-specific EVAS source list, did not match anything in the existing file under the same check and is logged `deferred` as a genuine unworked lead — the distinction rests on code-level comparison, not an assumption from the documents' similar names.

### 5. Three candidate manual nodes declined for want of a second edition, each after one extra search

SUT/IOT Manual (KS-RA-07-013), HERP guidelines (KS-GQ-18-012), and the Consistency guidelines handbook (KS-GQ-20-004) were each staged with confirmed titles and single publication dates. Per §4's "a single edition with no second one anywhere in sight is still not a node" rule, each got one WebSearch checking for a later edition. All three came back negative. All three logged `_dropped`/`no-node-yet` rather than minted on the strength of a single confirmed edition.

### 6. Batch 38's post-2027 remainder stays unmintable — no target node exists yet

The two genuinely new records `G.70.md` flagged in batch 38 (`ess-common-position-esp-link`, `esac-post2027-priorities`, both about the next European Statistical Programme under the post-2027 MFF) were re-examined this session. Neither names, nor is named by, any existing node in the corpus — the documents describe a forward-looking policy process, not yet a published, cited instrument with a target to point at. Logged `_dropped`/`deferred`, consistent with §3's report-don't-resolve stance: this is not a failure to find an edge, it is a genuine absence of a target until a future session researches the post-2027 Programme itself.

## Secondary observations (logged, low priority)

* The `_open_questions` array in `esa2010-methodology-stack.json` carries two items worth a future session's attention rather than silent resolution: (1) the `esa-2010 -> cpa` edge's basis paragraph (Annex A ¶1.22) was not independently re-verified live this session — a WebFetch attempt against the full consolidated ESA 2010 PDF could not locate the paragraph within the tool's read window (the document is long enough that this is inconclusive, not a failed check), though three independent staged extractions agreeing verbatim is real corroboration; (2) the judgment call distinguishing this edge from the previously-declined bundled-list entry is flagged explicitly rather than treated as settled — if a future session judges the distinction wrong, the edge should move to `_dropped` alongside its four declined siblings (NACE, COICOP, COFOG, NUTS).
* CPA's own EUR-Lex summary states it is "connected to" the UN's Central Product Classification (CPC) "via a correspondence table" — logged `_dropped`/`note`, same §5a shape as comparable-with/harmonised-with language, not a dependency, and CPC is not itself a node in this corpus.
* The 2025 List of main statistics batch's original "nine-record split" cheap check (flagged in an earlier session, referenced again this session while reading batch 0) remains unclosed — noted here only because it resurfaced, not because this session made progress on it.

## Corrections to prior sessions

None. This session's work is additive — new nodes and edges in a subject area `G.70.md` confirmed had zero prior coverage — and did not find any predecessor claim to be wrong, overstated, or in need of revision.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.70.md`, with item 5 substantially advanced this session.

* B — the corpus-wide `_dropped` sweep. Fully closed since `G.68.md`. No change this session.
* Item 5 (EU staging-blob batch backlog) — **15 of the 16 batches `G.70.md` identified now worked.** The fourteen-batch ESA-2010-methodology stack (0, 1, 2, 5–15) and batch 38's post-2027 remainder are done, producing `esa2010-methodology-stack.json` (7 reports, 9 dependencies, 24 dropped), registered in `src/data/index.ts`. **One batch remains: batch 46**, 29 uncitable country peer-review records (no `url`, no `location`, no `names` in any staged record), needing per-country source re-fetching from scratch. This is the natural next single-session task for whoever picks up item 5 next, and it is the last item of the original 16-batch instruction.
* Item 2 (archive) and Item 3 (rollup) — closed at `G.69.md`. A second rollup is coming due per the five-per-`G.*.md` cadence noted there (`G.69` was one session out; this is now `G.71`, three out — worth flagging for whoever writes `G.72` or `G.73`, not yet urgent).
* A, C, D, E, F, G — untouched this session. See `G.56.md`–`G.62.md` for their current state.

## Cheap checks still outstanding

Carried forward from `G.70.md`, with two added this session:

1. Reread page 2 (Article 9 background section) directly for 20 of the 21 evergreen CIRCABC countries whose `eu-reg-479-2009` edge currently rests on the boilerplate's confirmed presence in eight other countries' copies. Low value, cheap.
2. Two filename-vs-title-page date mismatches (UK, NL) in `edp-inventory-regulation-479-2009.json` remain unadjudicated, per `Research.1.md` §3.
3. Greece's own CIRCABC metadata still reads ESA95 against the document body's ESA 2010, unresolved.
4. `ess-peer-review-final-report -> de/sk-ess-peer-review-report`'s `relationship_type` (`uses_data_from`, `G.69.md`'s judgment call) could be revisited against `cites` if a future session reads SWD(2024)136's own body text on how it aggregates member reports.
5. Find the edge (if any) for the MIP scoreboard / Alert Mechanism Report. Cadence is already well-evidenced; the only missing piece is what the AMR is an input to or output of. `EU/ECB-Staging-Batches_PartA_2026-08-05.md` is the cheapest place to look first.
6. **NEW.** Retrieve NACE's own Article text — either by finding a WebFetch/URL form of CELEX 32006R1893 that renders body text (the two forms tried this session did not), or by finding a downstream programme's own methodology page stating it classifies by NACE (satisfying §7 independently of the founding regulation, the way the CPA edge was reached). ESA 2010 Annex A ¶1.22 already names NACE in the same sentence that supports the `cpa` edge — once the text is in hand, minting is one step, not a fresh search.
7. **NEW.** The Destatis QNA-specific EVAS source list flagged `deferred` this session (batch 0, distinct from the already-catalogued GNI-inventory codes in `de-destatis-source-surveys.json`) is a genuine unworked lead — confirm what it is a source for and whether it belongs on an existing QNA-related node.

## What to pass at the start of next thread

1. This file, plus `EU/R1.68.md` per the standing convention (not reopened this session, since nothing here touches block B or the rollup — but the convention still calls for it at the start of the *next* session).
2. `planning/MISSION-TODO-2.md` item 5, freshly re-read — this session added an `**UPDATE 2026-08-09 (EU/G.71.md)**` block after `G.70.md`'s own correction block; both sit after the original 2026-08-07 prose, left unedited per the never-edit-a-predecessor convention.
3. `src/data/research/esa2010-methodology-stack.json` is new this session (7 reports, 9 dependencies, 24 dropped), registered in `src/data/index.ts`. Recommend running `npm run validate` before trusting it fully — this session validated JSON well-formedness only, not the project's own schema/dangling-edge checks, since no path to run `npm run validate` itself was exercised from the device bridge this session.
4. Item 5 now has exactly **one batch remaining: batch 46** (29 uncitable country peer-review records). This is the natural next task, and it closes the 16-batch instruction Thomas gave to open this session and the one before it.
5. Before starting batch 46, note it is a different shape of work from this session's — no methodology-document reading, but per-country primary-source re-fetching for records that currently carry no URL, no location, and no names at all. Budget accordingly; it will not go as fast as the manual-reading clusters did.

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
