# G.5.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §2/§3/§4, same as G.1-G.4. `AF/G.1.md` through `AF/G.4.md` all read this session (continuous with the G.4 session — see Session conditions).
Predecessor: G.4.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. Source material is `country afrikans.docx` (repo root) — 48 raw Grok-research entries across seven countries plus continent-wide prose. Six countries are now done: South Africa (G.1, extended G.2), Egypt (G.2), Kenya (G.2), Ethiopia (G.3), Ghana (G.4), Nigeria (this session, G.5). **Only Tanzania remains entirely unresearched** (4 raw entries — NBS CPI, National Social Protection Policy 2023).
4. There is no Grok tool available in-session. `country afrikans.docx` itself is external Grok research Thomas ran outside this tool. The Claude/Grok parallel-split pattern works conversationally: Claude writes the Grok prompt in its reply, Thomas runs it externally and pastes the answer back as his next message, within one sitting. Proven three times now (Ethiopia G.3, Ghana G.4, Nigeria this session). The AF branch does NOT use EU's `research-input/Grok-Research-Brief-*.md` saved-file convention.
5. **Import is no longer a separate, deferred step — it happened the same session as research, twice, this session.** Every prior AF hand-off (G.1 through G.4) left newly-researched slices as DRAFT files in `src/data/research/` for Thomas to review and import later, and by G.4 there were seven of them stacked up, none actually exercised against the validator. This session imported all seven in one pass (see `af-backlog-import-2026-08-10` in Claude's project memory for the full record, including a real code bug the import surfaced — `graph.ts`'s supranational-country guard was hardcoded to `EU` only and broke on Kenya's EAC node the first time it was actually validated), then researched and imported Nigeria in the same sitting rather than leaving it as an eighth DRAFT file. **Recommendation carried forward strongly: don't let DRAFT slices stack up across sessions again.** A slice that introduces a genuinely new shape (new country, new supranational body, new relationship pattern) should get run through `npm run validate` before too many more pile on top of it — the earlier a structural assumption breaks, the cheaper it is to find. See [[npm-validate-procedure]] for the fast tar-based staging method (one `device_bash` tar + one `device_stage_files` call, not a 50-file-per-call enumeration).
6. `AFR` is now staffed with `ZA`, `EG`, `KE`, `ET`, `GH`, `NG` — six countries, all imported and live in the graph (549 reports / 648 dependencies as of this session). Every new country still needs a `COUNTRY_FAMILY` entry in the same pass as its first imported node — done for all six.

## Session conditions — read this first

Continuous with the G.4 session (same sitting): G.4.md closed out Ghana, Thomas then asked to "import the backlog" (all seven pending DRAFT slices), which surfaced and fixed the `graph.ts` bug described in Orientation item 5, then asked for a Grok prompt for Nigeria with the enthusiasm to keep going, so Nigeria was researched, merged, and imported in the same session rather than deferred. This hand-off covers both the import and Nigeria in one file since they were one continuous unit of work — the import has its own detailed record in project memory ([[af-backlog-import-2026-08-10]]) rather than repeated here at length.

## Headline result

Nigeria is the first country in this branch where the core CPI-methodology claim (the Dutot-to-Jevons elementary-formula switch) was confirmed not just as a fact but with the source's own stated reasoning, quoted directly: NBS's own "Highlights of CPI Rebasing" document says "The Jevon elementary Index is preferred to Dutot, because it passes all four economic criteria which are Transitivity, Reversibility, Commensurability and Proportionality" — a level of primary-source precision neither the docx nor Grok's round had actually surfaced (both asserted the switch without this specific line). Nigeria also adds a new shape to the branch's running catalogue of how CPI-benefit links do or don't bind: the World Bank's NASSP-SU/ESR-CT programme is explicitly framed as a response to "rising food prices and inflation" but has no stated CPI formula at all — motivated by inflation without being mechanically linked to it, distinct from Ghana's real formula, Ethiopia's two real formulas (one suspended), and Kenya's unclear/possibly-unusable legal basis. Five nodes, four dependency edges, three documented non-dependencies, imported and validated live in the same session (`ng-cpi-pension-safety-net.json`).

## Findings

### 1. Nigeria's CPI rebasing (Feb 2025) — the branch's most primary-source-verified mechanism yet, with one unresolved gap

`ng-nbs-cpi-rebasing`, VERIFIED DIRECTLY via NBS's own "Highlights of CPI Rebasing" PDF (WebFetch could not render this PDF's binary content — worth noting as a tooling gap distinct from the JS-render/paywall problems logged for other countries; downloading with `curl` and extracting text with `pypdf` in the cloud sandbox worked cleanly and should be the fallback whenever WebFetch reports binary/unreadable content for a PDF URL). Confirms COICOP 2018 (13 Divisions, 45 Groups, 100 Classes, 164 Subclasses, 242 item-level observations tracking 934 product varieties), weight reference period 2023 (2023 Nigeria Living Standards Survey plus a 2024 Survey of Rare Items and administrative data from the Central Bank of Nigeria, NAICOM and NBS's own National Accounts division), price reference period 2024, monetary-only expenditure, and Modified Laspeyres/Young-index higher-level aggregation. The one detail from the docx that this document does NOT contain: the 12-month index-reference-period-maximisation citing IMF CPI Manual §9.125 and the ECOWAS HCPI framework — likely a later refinement (the docx itself frames it as "around the December 2025 figures"), not part of the original February 2025 announcement. Worth a direct look at NBS's December 2025 communications specifically if this needs closing.

### 2. PenCom's pension-review chain: real statutory review obligations, explicitly no CPI formula, confirmed in the clearest terms yet

`ng-pencom-federal-pension-review-circular`, VERIFIED DIRECTLY via direct fetch of PenCom's own 8 December 2025 circular. Quotes both its statutory anchors in full — Constitution s.173(3) ("reviewed every five years or together with any Federal Civil Service salary reviews, whichever is earlier") and Pension Reform Act 2014 s.15(4) — and then, critically, grounds the actual increase amounts in six prior National Salaries, Incomes and Wages Commission circulars carrying specific negotiated rates (15%, 33%, 20%, 28%, a flat N32,000) with no CPI calculation anywhere in the document. This is the cleanest documented instance in the branch so far of the general pattern first seen in Kenya (G.2) and confirmed again in Ghana's SSNIT node (G.4): a real, binding statutory obligation to review periodically, with the quantum left to negotiation or administrative discretion rather than a formula.

### 3. NSITF legacy pensions: a large, real enforcement action, but resting entirely on secondary reporting

`ng-nsitf-legacy-pension-enforcement` — PenCom directed a large increase (reportedly first since 2005) for legacy NSITF-scheme retirees around January 2026, invoking Pension Reform Act 2014 s.53. This session and Grok's round both tried and failed to locate the actual circular as a downloadable primary document — the node rests on PenCom's own statements as carried by contemporaneous Nigerian press coverage (aggregate monthly payments rising from roughly N12.56 million to N159.95 million across 2,116 retirees, N8.70 billion in arrears). Flagged explicitly in `_open_questions` rather than silently treated as equivalent in strength to the directly-fetched federal pension circular sitting right next to it in the same file.

### 4. World Bank NASSP-SU: confirmed financing, and the branch's first "inflation-motivated but not CPI-linked" safety net

`ng-nassp-su-worldbank`, VERIFIED DIRECTLY via the project's own text (P176935): development objective "Expand coverage of shock responsive safety net support among the poor and vulnerable and strengthen the national safety net delivery system," US$800 million total cost with 100% IDA financing per this session's own fetch of a procurement-strategy document (no Nigerian government counterpart identified there, unlike Ghana's GPSNP2 where GoG funds the majority share, or Ethiopia's PSNP5 where GoG contributes roughly a third). Deliberately left as an isolated node — the programme is explicitly framed as a response to food-price and inflation shocks but has no stated formula tying transfer amounts to CPI, recorded as a documented non-dependency in `_dropped` rather than a plausible-looking edge.

### 5. The ECOWAS HCPI Methodological Guide has now failed three independent verification attempts — recommend retiring it as a cheap check

Carried forward from G.4's open question. Grok's Nigeria round tried multiple search angles and explicitly reported it could not find a primary document. This session's own searches (a fresh angle, not a repeat of G.4's) also came up empty. The claim keeps recurring in secondary form — Nigerian press coverage says the IMF called the rebasing consistent with "the ECOWAS harmonised framework," and the original docx's own Nigeria material asserts the same June 2025 date — but every trace of it leads back to either vague unlinked prose or the docx's own Grok-authored origin, not a second independent source. Recorded in this session's `_note` as a recommendation: stop treating this as a cheap check to retry every country; it either needs someone reading raw ECOWAS Commission or AFRISTAT bulletins directly (not search-engine-mediated) or it stays permanently unconfirmed.

## Secondary observations (logged, low priority)

* Nigeria's minimum wage (National Minimum Wage Act 2019, Tripartite Committee) considers inflation without an automatic formula, per Grok's round — same treatment as Ghana's minimum wage (G.4): no node minted at all, recorded in `_dropped`.
* The WebFetch-can't-render-binary-PDF problem (Finding 1) is worth remembering as a distinct failure mode from the JS-rendering and paywall problems already logged for other countries (IMF DSBB, judy.legal) — the fix (curl + pypdf in the cloud sandbox) is cheap and should be tried before concluding a PDF is unreachable.

## Corrections to prior sessions

None. G.1 through G.4's findings all held up this session; nothing was found wrong.

## Thomas's stated priority for the remaining work

1. **Tanzania — the last unresearched country in the branch.** 4 raw docx entries (NBS CPI, National Social Protection Policy 2023). With Tanzania done, every country in `country afrikans.docx` will have been worked at least once. Good candidate for the same parallel-split pattern, though with only 4 raw entries it may not split as naturally as Nigeria's 9 — worth reading the entries first before committing to a specific two-lane split, same as every prior country.
2. Whether to model the docx's regional-typology prose (WAEMU HCPI, AFRISTAT, and now the still-unconfirmed ECOWAS HCPI guide) as corpus nodes — raised since G.1, still not raised with Thomas directly. Lower urgency than before: Ghana confirmed non-membership in WAEMU, and the ECOWAS HCPI guide itself has now failed three verification attempts, so there may not be a clean node to mint even if Thomas says yes.
3. Import review is, for the moment, **not a backlog** — everything researched through this session is already imported and validated live. Worth stating plainly since every prior hand-off through G.4 carried this as a standing, growing to-do; it is not one right now. It will become one again the moment Tanzania (or anything else) is researched and not immediately imported, so don't assume this stays true without checking.
4. The `ng-ecowas-hcpi-guide-still-unconfirmed` and `ng-nsitf-circular-not-located` open questions (in the JSON) are both low-value cheap checks, not priorities — see Cheap checks below.

## Cheap checks still outstanding

1. NBS's December 2025 communications specifically, for the 12-month index-reference-period-maximisation detail (IMF CPI Manual §9.125 alignment) that the February 2025 Highlights document doesn't contain.
2. The PenCom circular behind the NSITF legacy-pension enhancement (~January 2026) — not located as a primary PDF by either research half.
3. The ECOWAS HCPI Methodological Guide — three failed attempts now; per this session's own recommendation (Finding 5), stop treating this as a cheap check unless someone is willing to read raw ECOWAS Commission/AFRISTAT material directly rather than search-engine-mediated.
4. Constitution s.28 (South Africa, children's rights) — cited secondhand via the Western Cape DSD document (G.2), never independently fetched. Carried forward unchanged since G.2.
5. `za-sassa-annual-report` → `za-social-assistance-act-2004` direct edge — open since G.1, still unresolved. Carried forward unchanged.
6. IMF DSBB DQAF pages remain JS-rendered and unreachable for South Africa, Egypt, Kenya. Do not re-attempt per-country; batch-recheck if a JS-capable tool arrives.
7. Ethiopia's PSNP5 wheat-equivalency figures and current COICOP vintage — carried forward unchanged from G.3, still low urgency.

## What to pass at the start of next thread

1. This file, plus `AF/G.1.md` through `AF/G.4.md` for full context — Orientation across all five still applies and has been kept current rather than rewritten from scratch.
2. `country afrikans.docx` — Tanzania's 4 entries specifically, the last unresearched country.
3. `feedback_grok-as-verification` (Claude's project memory) plus this file's Orientation item 4 — the mechanism is synchronous and conversational for this branch.
4. `af-backlog-import-2026-08-10` and `npm-validate-procedure` (Claude's project memory) — the import mechanics and the fast tar-based validate procedure, worth using again after Tanzania rather than letting a DRAFT file sit.
5. Nothing is currently sitting un-imported in `src/data/research/` for this branch — worth confirming that's still true, since it's a first for this hand-off chain.

# How to write the next hand-off

Adopted wholesale for this branch 2026-08-10 (G.1), following `AU`'s and `NZ`'s precedent of adopting the EU spec verbatim — copy this whole section into every successor, so the chain never depends on one file surviving. It is the spec, not an example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format. Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `AF/`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `AF/`.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `AF/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py AF/G.<n>.md
```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar across all branches (`BRANCHES` in the script now includes `"AF"`); `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.

* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.
* This branch's priority lists are plain-numbered, not the EU's lettered A-G convention — following `AU`'s and `NZ`'s precedent. The sidecar script's priority parser falls back to numbered/bullet lists automatically when no lettered blocks are found.

Required structure, in this order

```
# G.<n>.md — Africa galaxy hand-off

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

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly. What each section is for Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. Session conditions — what constrained the work: session type, what tooling was available, what did not arrive, what was left untouched by instruction. State plainly which sources you read in full, because everything downstream inherits that limit. Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result. Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Quote verbatim; `Research.1.md` §2/§3 apply here exactly as they do to research output. Secondary observations — real but low-priority. Keep them short. Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus. Thomas's stated priority for the remaining work — the numbered list carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. What to pass at the start of next thread — the packing list. If the next agent has filesystem access, say so and keep the list anyway; it doubles as an index of what matters. Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement.
* Distinguish inference from documented fact, and say which narrow respect is still inference.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
