# G.4.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §2/§3/§4, same as G.1-G.3. `AF/G.1.md`, `AF/G.2.md` and `AF/G.3.md` all read this session (G.3 was passed in directly as the session's starting context, per its own "what to pass" instruction).
Predecessor: G.3.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. Source material is `country afrikans.docx` (repo root) — 48 raw Grok-research entries across seven countries plus continent-wide prose. Five countries are now done: South Africa (G.1, extended G.2), Egypt (G.2), Kenya (G.2), Ethiopia (G.3), Ghana (this session). Two remain entirely unresearched as corpus nodes: Nigeria (9 raw entries) and Tanzania (4 raw entries).
4. **How Grok actually gets invoked, spelled out for the first time in this branch's hand-offs**: there is no Grok tool available inside this session. `country afrikans.docx` itself is external, Grok-produced research Thomas ran outside this tool and brought in (see G.1 Orientation item, still true). The working pattern for a parallel split is: Claude writes a prompt in its reply to Thomas (not a saved file — the AF branch does not use EU's `research-input/Grok-Research-Brief-*.md` convention, unlike what G.3 might have implied), Thomas runs it against Grok himself outside this session, and pastes Grok's answer back as his next message in the same conversation. It happens synchronously within one sitting, not across sessions. Ghana's split worked exactly this way this session.
5. The Claude/Grok parallel-research pattern is now proven on two countries (Ethiopia in G.3, Ghana this session) and remains the standard way to work a country. Refinements from this session, worth carrying forward:
   * **Trust Grok's answers, but verify the load-bearing ones when the tools are cheap and available.** This session diverged slightly from a pure trust-and-mint approach: several of Grok's Ghana claims (Act 1148's assent date, the GPSNP2 World Bank project, the SSNIT indexation quote, the CPI rebase) were independently re-fetched by Claude anyway, not because the standing policy required it, but because this session had working WebFetch/WebSearch and the claims were central enough to be worth the cheap extra confirmation. All of them independently confirmed. One claim did NOT survive this treatment — see Corrections/Findings below on the ECOWAS HCPI regulation.
   * **The standing policy's own carve-out matters and got used for real this session, not just referenced.** Grok reported a June 2025 ECOWAS Council of Ministers Regulation on a regional Harmonised CPI methodology guide — specific, dated, plausible-sounding, and *not corroborated by any search this session ran*. Per `feedback_grok-as-verification`'s own terms ("push back and reprompt... if the claim itself reads as implausible, internally inconsistent, or oddly specific in a way that smells fabricated"), this was NOT minted, and is flagged as an open question for a Grok reprompt rather than silently dropped or silently trusted. First real test of the carve-out in this branch since the policy was recorded.
6. `AFR` remains the only staffed African palette family, with `ZA`, `EG`, `KE`, `ET`, `GH` now all represented in draft data (none imported yet — see Session conditions). Every new country still needs a `COUNTRY_FAMILY` entry in the same pass as its first imported node.

## Session conditions — read this first

This session opened with `AF/G.3.md` passed in directly as the starting message — its own "What to pass at the start of next thread" instruction, working as designed. No `AF/G.1.md`/`G.2.md` text was passed in directly, but both were staged and read in full this session (see Orientation item 3 in each). `country afrikans.docx` was staged and its two Ghana entries plus the closing regional-typology prose were read directly. `REPORTS.md`'s data-model and evidence-standard sections, `README.md`, and `START-HERE.md` were also read this session — worth noting because no prior AF hand-off records having read `REPORTS.md` directly (only referencing it), and it changed how strictly the Act 1148 / MOFEP-paper connection was ultimately handled (see Corrections). Ghana was worked as a genuine parallel split: Claude's own WebFetch/WebSearch tools were available and used extensively (roughly a dozen fetches) alongside, not instead of, Grok's round.

## Headline result

Ghana closes with the same "real formula, already live in practice, statute still catching up" shape found for Ethiopia's UPSNJP, not Kenya's "permissive-only" shape: the LEAP indexation formula (`LB_t+1 = LB_t(1+inf_t)`, GSS-CPI-based, capped at 50%) is quoted directly from a 2023 Ministry of Finance strategy paper and independently reported by Ghanaian press as having actually taken effect from late 2023/2024 — ahead of, not because of, the Social Protection Act, 2025 (Act 1148) that later covered LEAP by name. Six nodes, five dependency edges, two documented non-dependencies, written to `gh-leap-cpi-indexation.json` and delivered to Thomas along with this hand-off.

## Findings

### 1. The LEAP indexation formula is real, specific, and already implemented — independent of the statute meant to back it

`gh-mofep-leap-indexation-strategy`, VERIFIED DIRECTLY via the Ministry of Finance's own September 2023 strategy paper: `LB_t+1 = LB_t(1 + inf_t)`, where `inf_t` is "the 12-month annual average inflation from October of previous year to September of current year estimated from Ghana Statistical Service (GSS) Consumer Price Index release", with adjustments "capped at 50%". The paper itself states the mechanism "will be backed by legislation... through the proposed Social Protection Bill" — a forward reference to an as-yet-unnamed bill, not a citation of any Act by number, since Act 1148 did not exist in September 2023. Ghana's Graphic Online (independently found, not Grok-sourced) reports the mechanism actually took effect following a 100% benefit increase in 2023 and a further GH₵720 million committed in the 2024 budget — i.e. implemented as cabinet-level policy well before any statute addressed it directly.

### 2. Social Protection Act, 2025 (Act 1148) — confirmed by both halves independently, but its operative text is paywalled

`gh-social-protection-act-2025`: passed by Parliament 31 July 2025, assented and commenced 14 August 2025 — the exact date confirmed twice, independently, by Claude's own direct fetch of judy.legal's hosted text and by Grok's round citing the same source. Sections 1-2 (Application, Object) are freely readable and contain no indexation language; secondary reporting (MoGCSP, news) states the Act covers LEAP by name and establishes a Social Protection Fund, but neither this session's own tools nor Grok's round could get past judy.legal's paywall to the operative sections. The Legislative Instrument needed to translate the Act into practice was, per MoGCSP, submitted to Parliament and expected in force by June 2026 — meaning even if the Act itself doesn't contain a CPI formula, the LI might. Per `REPORTS.md`'s own rule (no edge without a document naming the relationship), **no edge connects the 2023 strategy paper to Act 1148** — treated exactly as G.3 treated Ethiopia's constitution/World-Bank-funding pair: an observed, plausible consistency, recorded in `_note`, not a graph edge.

### 3. Ghana's CPI: confirmed COICOP 2018 and Jevons elementary aggregation, but the corpus is holding a stale base year until someone finds the rebase's own methodology note

`gh-gss-cpi`: GSS's own CPI Technical Methodology Manual (v5, October 2020) directly confirms COICOP 2018 ("GSS uses the United Nations Classification of Individual Consumption According to Purpose (COICOP) 2018 manual") and Jevons-index elementary aggregation, on a 2018=100 base with GLSS7 (2016/17) weights. That manual is now out of date on the base year specifically: GSS's own September 2025 press release (published 1 October 2025) confirms the series has since been rebased to 2021=100 (weight reference period still 2017). No dedicated methodology document for the 2021=100 rebase — the kind of document that would let this be cited with the same precision as the COICOP/Jevons findings — was located by either half of the split. Ghana is now the fourth country in the corpus confirmed on COICOP 2018 (after South Africa, Nigeria, Kenya), and a third country on the IMF's weaker e-GDDS tier (after Kenya, Ethiopia), independently dated to November 2018 via Ghana's own Ministry of Finance press release — which happens to match the month Grok's round separately cited from a 2026 IMF Article IV report, a small but genuine cross-confirmation.

### 4. World Bank financing for LEAP: Ghana's own government is now the majority funder, a different shape from Ethiopia's donor-led PSNP5

`gh-gpsnp2-worldbank` (Grok-sourced project identification, independently verified this session via direct fetch of the project's own text): Ghana Productive Safety Net Project 2 (P175588, effective January 2022), Component 3 explicitly "supports the continuation, expansion, and strengthening of the Livelihood Empowerment Against Poverty (LEAP) program". Financing: US$100.0 million IDA credit against US$157.0 million Government of Ghana counterpart — Component 3 specifically is US$20 million IDA against US$157 million GoG, meaning Ghana's own government funds the large majority of its LEAP transfers, a different balance from Ethiopia's PSNP5/SEASN (roughly US$900 million IDA against US$590 million GoG, i.e. donor-majority). Two African flagship safety-net programmes, both World Bank-financed, opposite funding majorities.

### 5. SSNIT pensions: CPI is one of four named statutory review factors, not a formula — a genuine third shape, distinct from LEAP's own pure formula

`gh-ssnit-pensions`, VERIFIED DIRECTLY via SSNIT's own 2025 Pension Indexation Rate press release, which quotes its own governing provision: "The Trust shall annually review the pension payment which shall be indexed to wage inflation rates of active contributors or another rate determined by the Trust in consultation with the Board of the Authority" (Section 80, National Pensions Act, 2008 (Act 766) — the Act's own text was not independently fetchable, government registry blocks automated access, so this rests on SSNIT's own quotation of it). The same press release lists CPI as one of four factors actually used: "Average salary of active contributors from the previous year", "Annual average Consumer Price Index (CPI) from the previous year", affordability, and long-term sustainability. A genuinely different shape from LEAP's single-variable formula — CPI is a real, quoted, named input but explicitly one of several, with the statute's own default anchor being wage inflation rather than CPI.

## Secondary observations (logged, low priority)

* Ghana's minimum wage (National Tripartite Committee, Labour Act 2003 s.113) considers inflation among several factors per Grok's round, but is explicitly negotiated rather than automatic — not minted as a node at all (not just not-edged), since this session did not independently verify the statutory text and even a confirmed quote would likely describe discretion rather than a formula. Recorded in `_dropped`.
* The WAEMU/UEMOA Harmonised CPI system (Grok's round, extensive detail) directly confirms Ghana's own exclusion from it — Ghana is outside the CFA franc zone and not a WAEMU member, so the WAEMU HCPI regulations (Regulation 05/97, renovated by Regulation 03/2017/UEMOA) do not bind it. Not minted as a Ghana-relevant edge for that reason, but useful groundwork if a WAEMU member country is ever worked in this branch — the WAEMU system's own COICOP-2018/Jevons-style elementary aggregation is structurally close to Ghana's, despite the two having no legal connection.

## Corrections to prior sessions

None to G.1, G.2, or G.3's own findings — all held up. One correction to how this session initially treated one of G.3's own carried-forward instructions: G.3's "What to pass at the start of next thread" mentioned `research-input/`-style Grok prompt files as if that were an AF-branch convention; checking `research-input/` directly this session found no Ethiopia- or Kenya-related files there at all — those briefs (`Grok-Research-Brief-*.md`) are exclusively EU-branch artifacts. The AF branch's actual Grok-handoff mechanism is synchronous and conversational (see Orientation item 4). Not a correction of a factual claim, but worth recording so the next agent doesn't go looking for a saved prompt file that was never part of this branch's workflow.

## Thomas's stated priority for the remaining work

1. Nigeria — 9 raw docx entries (CPI rebasing February 2025, NISER cost-of-living brief, PenCom pension review circular tied to a constitutional 5-year review cycle). Largest remaining country by entry count. Good parallel-split candidate: the PenCom/constitutional review angle and the CPI rebasing/COICOP angle look like natural Claude/Grok lanes, similar to how Ghana split into LEAP-formula-mechanism vs funding/other-programmes.
2. Tanzania — 4 raw entries (NBS CPI, National Social Protection Policy 2023). Not started.
3. Whether to model the docx's regional-typology prose (WAEMU HCPI, AFRISTAT) as corpus nodes — raised in G.1, still not raised with Thomas. Ghana's own confirmed non-membership in WAEMU (Finding/Secondary observation above) answers the specific question G.3 flagged about Ghana's regional status, but the broader question of whether to model WAEMU itself (for whichever WAEMU-member country gets worked eventually) is still open.
4. Import review: seven DRAFT JSON files now sit un-imported in `src/data/research/` (six carried from G.3, plus `gh-leap-cpi-indexation.json` from this session). Not on Thomas to review immediately, but worth surfacing every hand-off until it happens.
5. The `gh-ecowas-hcpi-guide-unconfirmed` open question (below) is worth a direct Grok reprompt specifically asking for the regulation's exact title, number, and a working URL, before either minting or permanently dropping it.

## Cheap checks still outstanding

1. Ghana's CPI 2021=100 rebase — GSS's own dedicated methodology note (as opposed to a press-release mention of the new base year) was not located. Would let the corpus cite the rebase with the same precision as the COICOP/Jevons findings, rather than resting on a press-release aside.
2. Act 1148's operative text, specifically any indexation clause — paywalled at judy.legal; a free official gazette or parliament.gh copy was searched for and not found. Worth a targeted retry if a JS-capable browsing tool becomes available (same caveat already logged for the IMF DSBB pages in G.2).
3. The ECOWAS HCPI Methodological Guide Grok reported (June 2025) — needs a direct reprompt for title/number/URL before it's trusted at all; see _open_questions in the JSON and Orientation item 5.
4. Constitution s.28 (South Africa, children's rights) — cited secondhand via the Western Cape DSD document (G.2), never independently fetched. Carried forward unchanged from G.2/G.3.
5. `za-sassa-annual-report` → `za-social-assistance-act-2004` direct edge — open since G.1, still unresolved. Carried forward unchanged.
6. IMF DSBB DQAF pages remain JS-rendered and unreachable for South Africa, Egypt, Kenya (Ghana was not attempted against this specific page this session, since the MOFEP press release gave a cleaner primary source). Do not re-attempt per-country; batch-recheck if a JS-capable tool arrives.
7. Ethiopia's PSNP5 wheat-equivalency figures and current COICOP vintage — carried forward unchanged from G.3, still unconfirmed, still low urgency.

## What to pass at the start of next thread

1. This file, plus `AF/G.1.md`, `AF/G.2.md`, and `AF/G.3.md` for full context — Orientation across all four still applies and has been kept current rather than rewritten from scratch.
2. `country afrikans.docx` — Nigeria's 9 entries specifically, next up per Thomas's priority above.
3. The seven DRAFT JSON files in `src/data/research/`, all still awaiting Thomas's review/import: `za-fiscal-federalism.json`, `za-national-accounts-labour.json`, `za-followup-gaps.json`, `eg-cpi-social-insurance.json`, `ke-social-protection.json`, `et-psnp-cpi-federalism.json`, `gh-leap-cpi-indexation.json`.
4. `feedback_grok-as-verification` (Claude's project memory) plus this file's Orientation item 4 — the mechanism is synchronous and conversational for this branch, not file-based; don't go looking for a `research-input/` prompt file.
5. A concrete instruction for how to run the Nigeria split: read Nigeria's 9 docx entries first (this is the largest single-country entry count in the branch so far — expect more than one candidate mechanism, not just one formula to find), identify the CPI-rebasing/COICOP angle and the PenCom constitutional-review angle as two plausible lanes, and write the Grok prompt for whichever lane isn't Claude's own before doing deep independent research on Claude's lane — running both concurrently is the point, established now on two countries running.

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
