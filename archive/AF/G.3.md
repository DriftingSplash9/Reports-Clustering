# G.3.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §2/§3/§4, same as G.1/G.2. `AF/G.1.md` and `AF/G.2.md` both read in full this session.
Predecessor: G.2.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A–G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. Source material is `country afrikans.docx` (repo root) — 48 raw Grok-research entries across seven countries plus continent-wide prose. Four countries are now done: South Africa (G.1, extended G.2), Egypt (G.2), Kenya (G.2), Ethiopia (this session, closing out work G.2 had left mid-flight). Three remain entirely unresearched as corpus nodes: Nigeria, Tanzania, Ghana. **Ghana is next, per Thomas's explicit instruction at the end of this session** — 2 raw docx entries, small, but flagged by the docx's own regional overview as the one clear case of explicit automatic indexation (LEAP linked to GSS CPI). Worth testing that claim directly rather than assuming the docx has it right.
4. **The Claude/Grok parallel-research pattern, established this session and this session's, is now the standard way to work a country, not a one-off experiment.** Thomas's words closing this session: "I think this is working well so far, we need to make sure to wire this in as clean and simply as we can. Grok can be sent to explore more at a time." Two changes for the next agent to make immediately, not just note:
   - **Trust Grok's answers directly.** Recorded as a standing rule in Claude's own project memory (`feedback_grok-as-verification`): once Grok is given full context, the specific tooling limitation being worked around, and the same evidence standard this corpus already uses (verbatim quotes, exact URLs, explicit primary/secondary/could-not-find confidence tags), its answers get minted directly. No separate independent-refetch pass. Push back and reprompt only if a specific claim reads as implausible or suspiciously over-specific.
   - **Split by area, not sequentially.** The working pattern from Ethiopia: Claude and Grok research the SAME country at the SAME time, each taking a different slice of it (e.g. Claude took the core benefit-CPI mechanism and the constitutional/administrative structure; Grok took the funding/donor side, other benefit programmes, and the country's international-statistics standing). Both halves get written up, then merged into one file, with an explicit pass looking for places the two halves connect — even when no formal graph edge can be drawn (see Finding 1 below for why that distinction matters). This produces genuinely more than either path alone would have: Ethiopia's merge found a second CPI-linked benefit programme entirely from Grok's half that the docx's own 6 entries never mentioned.
   - **"Grok can be sent to explore more at a time"** means: now that the trust threshold is established, don't over-narrow Grok's prompts to five tightly-scoped numbered questions the way earlier rounds did out of caution. Give it the country, the areas to focus on, and let it range — the Ethiopia funding-side prompt already did this loosely (open-ended "anything else citation-worthy" framing) and it worked well. Lean further into that for Ghana: fewer rigid numbered items, more "here's the territory, go find what's citable in it."
5. `AFR` remains the only staffed African palette family, with `ZA`, `EG`, `KE`, `ET` now all represented in draft data (none imported yet — see Session conditions). Every new country still needs a `COUNTRY_FAMILY` entry in the same pass as its first *imported* node.

## Session conditions — read this first

Short session, closing out work in progress rather than opening new ground. G.2.md was written mid-session, before the Ethiopia parallel split (Claude's half + a Grok round) had actually finished; this session's only substantive work was merging that split into one file and writing this hand-off. No new country was started. Still true, and worth restating: **nothing described in G.1, G.2, or this file is live in the corpus.** Six DRAFT files sit un-imported in `src/data/research/`: `za-fiscal-federalism.json`, `za-national-accounts-labour.json`, `za-followup-gaps.json`, `eg-cpi-social-insurance.json`, `ke-social-protection.json`, `et-psnp-cpi-federalism.json`. All marked `DRAFT, NOT IMPORTED` in their own `_status` fields, all pending Thomas's review.

## Headline result

The Claude/Grok parallel-split pattern is validated, not just tried once. Ethiopia's merge produced a genuine cross-connection between two independently-researched halves (the constitutional finding and the funding-flow finding describe the same administrative reality, found by two different research paths) and surfaced a programme — UPSNJP's suspended CPI-indexation covenant — that neither the docx nor a single research pass would likely have found on its own. This is now the operating model for the rest of the branch, not an experiment to keep re-justifying each time.

## Findings

### 1. Ethiopia closed: two CPI-linked programmes, one currently suspended, and a federal structure genuinely unlike South Africa's

`et-psnp-cpi-federalism.json`, 5 nodes / 5 deps, fully merged. PSNP5's own Design Document ties its annual wage-rate adjustment to CPI directly ("Adequacy of transfers will be addressed through annual adjustments to the wage rate in line with consumer price index (CPI) to protect its real value") — independently corroborated from the donor side via a World Bank results-framework indicator naming the same link. A second programme, the Urban Productive Safety Net and Jobs Project (UPSNJP, found entirely via Grok's half), has a formal financing covenant requiring CPI indexation of its benefits that is explicitly, currently waived "pending material improvements to the government's fiscal position" — a real formula, temporarily switched off. That's now a third distinct shape for how a CPI-benefit mechanism fails to bind, alongside South Africa's built-in discretion and Kenya's post-repeal legal uncertainty.

Ethiopia's Constitution does not establish woredas (district-level government) at all — Article 50(4) leaves "State and other administrative levels" entirely to each regional state's own discretion, unlike South Africa's constitutionally-entitled local government. Grok's funding-side research independently found that World Bank/donor money actually flows federal → regional → woreda via the government's own "Channel 1" mechanism — describing the same practical reality the constitutional finding leaves open at the legal level, but from a different document. **No graph edge connects these two nodes**, deliberately: neither document cites the other, and the corpus's own rule (no edge without a document saying so) applies exactly as much to two independently-true findings that merely happen to agree as it does to anything else. Recorded as an observed consistency in the file's own `_note`, not as a dependency. This is worth internalising as the general lesson from the parallel-split pattern: cross-connection often means "these two things are obviously part of the same story," not "one document names the other" — only the second kind goes in the graph.

Also confirmed: Ethiopia is on the IMF's e-GDDS tier (second country on that node, after Kenya) and is explicitly NOT bound by the EAC's binding Harmonised CPI regulations that govern Kenya — a clean negative contrast, useful precisely because it shows the EAC finding from G.2 wasn't a fluke of how Kenya specifically was researched.

## Secondary observations (logged, low priority)

* Ethiopia's COICOP classification was found (an old, 2013 CSA methodological note saying "COICOP... with few exceptions") but deliberately not minted as an edge — too dated and vague to sit confidently next to South Africa's, Kenya's, and Egypt's much more precise current-series confirmations. A current ESS methodology document, if one exists, would resolve this cheaply.
* The docx's specific PSNP5 wheat-equivalency figures (15kg/16.95kg per month) remain unconfirmed after two research passes (this session's own fetch, and Grok's round). Worth one more targeted look at the Programme Implementation Manual specifically, but not urgent — the CPI-linkage principle itself is independently confirmed twice over without those numbers.

## Corrections to prior sessions

None. G.1 and G.2's findings all held up; nothing from either was found wrong this session.

## Thomas's stated priority for the remaining work

1. **Ghana** — 2 raw docx entries. Small, but flagged by the docx's own regional overview as the one clear case of explicit automatic indexation on the continent (LEAP linked to GSS CPI, "Ghana is the standout with an explicit LEAP indexation formula linked to GSS CPI" per the docx's own prose). Explicitly next per Thomas's instruction closing this session. Good candidate for the parallel-split pattern: Claude could take the LEAP formula and GSS CPI methodology directly; Grok could take LEAP's funding/donor architecture (also World Bank-linked, per general knowledge, unverified) and any other Ghanaian benefit programmes and international-standards questions, mirroring the Ethiopia split.
2. Tanzania — 4 raw entries (NBS CPI, National Social Protection Policy 2023). Not started.
3. Nigeria — 9 raw entries (CPI rebasing, PenCom pension reviews, National Social Safety Net Programme). Not started. Nigeria's own CPI rebasing already appears indirectly in this session's and prior sessions' Findings (COICOP 2018 precedent, cited twice for South Africa and Kenya) — worth checking for existing Nigeria-adjacent nodes before starting fresh, though none are expected.
4. Whether to model the docx's regional-typology prose (WAEMU Harmonised CPI, AFRISTAT) as corpus nodes — raised in G.1, still not raised with Thomas, still open. Now more clearly warranted: the EAC's binding HCPI regulation (G.2) is a real precedent, and WAEMU may be West Africa's equivalent — worth raising once Ghana (a WAEMU-adjacent but not WAEMU-member country, unconfirmed) is done, since Ghana's own regional CPI-harmonisation status is an obvious first check.
5. Import review: six DRAFT JSON files sit un-imported in `src/data/research/`. Not on Thomas to review immediately, but worth surfacing every hand-off until it happens rather than letting it go silent.

## Cheap checks still outstanding

1. Constitution s.28 (South Africa, children's rights) — cited secondhand via the Western Cape DSD document (G.2), never independently fetched.
2. `za-sassa-annual-report` → `za-social-assistance-act-2004` direct edge — open since G.1, still unresolved.
3. IMF DSBB DQAF pages are JS-rendered and have failed for South Africa, Egypt, and Kenya across every tool tried, Grok included (G.2). Do not re-attempt per-country; if a JS-capable browser tool becomes available, batch-recheck all countries at once.
4. Ethiopia's PSNP5 wheat-equivalency figures (15kg/16.95kg) — two passes, still unconfirmed, low urgency (see Secondary observations).
5. Ethiopia's current COICOP vintage — only an old (2013), vague source found; needs a current ESS methodology document.
6. Whether `EG`, `KE`, `ET` have `COUNTRY_FAMILY` palette entries — moot until any of their JSON files are actually imported.

## What to pass at the start of next thread

1. This file, plus `AF/G.1.md` and `AF/G.2.md` for full context — Orientation across all three still applies and has been kept current rather than rewritten from scratch each time.
2. `country afrikans.docx` — Ghana's 2 entries specifically, plus the continent-wide regional-typology prose (relevant to Priority item 4 above).
3. The six DRAFT JSON files in `src/data/research/`, all still awaiting Thomas's review/import: `za-fiscal-federalism.json`, `za-national-accounts-labour.json`, `za-followup-gaps.json`, `eg-cpi-social-insurance.json`, `ke-social-protection.json`, `et-psnp-cpi-federalism.json`.
4. `feedback_grok-as-verification` (Claude's project memory) — the standing rule that makes the parallel-split pattern possible. Read it before starting Ghana; it is now the default way to work, not an option to rediscover.
5. **A concrete instruction for how to run the Ghana split, so the next agent doesn't have to reinvent the pattern from scratch**: read Ghana's 2 docx entries first, identify the core LEAP-formula/GSS-CPI mechanism as one lane, then write a Grok prompt for the other lane (funding, other Ghanaian programmes, international standards) *before* doing deep independent research on the core lane — running both lanes concurrently is the point, not researching first and then discovering what to ask Grok afterward. Merge when both are back, and explicitly look for (but don't force) a cross-connection the way Ethiopia's fund-flow/constitution pair worked.

# How to write the next hand-off

Adopted wholesale for this branch 2026-08-10 (G.1), following `AU`'s and `NZ`'s precedent of adopting the EU spec verbatim — copy this whole section into every successor, so the chain never depends on one file surviving. It is the spec, not an example.
When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.
Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `AF/`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `AF/`.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `AF/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py AF/G.<n>.md

```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar across all branches (`BRANCHES` in the script now includes `"AF"`); `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.
* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.
* This branch's priority lists are plain-numbered, not the EU's lettered A–G convention — following `AU`'s and `NZ`'s precedent. The sidecar script's priority parser falls back to numbered/bullet lists automatically when no lettered blocks are found.

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

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly.
What each section is for
Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next.
Session conditions — what constrained the work: session type, what tooling was available, what did not arrive, what was left untouched by instruction. State plainly which sources you read in full, because everything downstream inherits that limit.
Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.
Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Quote verbatim; `Research.1.md` §2/§3 apply here exactly as they do to research output.
Secondary observations — real but low-priority. Keep them short.
Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.
Thomas's stated priority for the remaining work — the numbered list carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently.
Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup.
What to pass at the start of next thread — the packing list. If the next agent has filesystem access, say so and keep the list anyway; it doubles as an index of what matters.
Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement.
* Distinguish inference from documented fact, and say which narrow respect is still inference.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
