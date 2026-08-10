# G.9.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §§1-7, same as every prior AF session. `AF/G.8.md` is this file's immediate predecessor, read in full this session (delivered as this session's opening context, not re-fetched).
Predecessor: G.8.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. **The East Africa remainder is now closed.** Uganda and Rwanda — the two countries G.7 and G.8 both offered alongside Southern Africa and North Africa, and the last of the docx-era regional groupings with anything left in it — are researched, validated and imported this session. This is the first AF session where neither new country had any `country afrikans.docx` entry at all to anchor the research; both are entirely from-scratch primary-source work, the same shape Lesotho/Eswatini/Zambia/Malawi/Zimbabwe took at G.8, but without even a regional name in the source document to start from.
4. `AFR` is now staffed with sixteen countries: `ZA`, `EG`, `KE`, `ET`, `GH`, `NG`, `TZ`, `BW`, `NA`, `LS`, `SZ`, `ZM`, `MW`, `ZW`, `UG`, `RW` — 585 reports / 669 dependencies as of this session's validator run, up from 571/661 at G.8.
5. Import discipline held for a fourth consecutive session: both new slices were researched, validated (`npm run validate`/`check`/`build`, tar+cloud-sandbox procedure, one consolidated pass for both countries rather than one per country — G.8's own recommended cadence for a small batch) and imported (`index.ts` + `palette.ts` updated, all files written back to the device) in the same sitting. Nothing is currently sitting un-imported in `src/data/research/` for this branch.
6. **What is actually left, now that the docx is fully exhausted and both East Africa and Southern Africa are closed**: North Africa (Algeria, Morocco, Tunisia, and Libya per G.7's "likely too thin/unstable to source" framing) is the only remaining concretely-scoped country list from G.7/G.8's own offers. Beyond that, every option is a genuinely new kind of choice — see Thomas's stated priority, item 1.

## Session conditions — read this first

Opened directly from Thomas's "explore east afrika more dude" / "now explore east afrika more" instruction, picking up the East Africa remainder G.7 and G.8 had both offered and left unpicked. Uganda and Rwanda were researched in parallel by two subagents (one per country), each briefed with the branch's full Research.1.md discipline — the one rule, the two traps, the Part A/Part B output format, and the exact set of reusable node ids already in the corpus (`eac-hcpi-regulations`, `un-coicop-2018`, `cpi-manual`, `sna-2008`, `imf-sdds`, `imf-e-gdds`, `imf-dqaf`) — then their Part A quote records were independently reviewed and minted into DRAFT JSON by this session before import, the same verification discipline the branch has used since Grok-assisted rounds began (`[[feedback_grok-as-verification]]`).

One deliberate departure from strict branch precedent, flagged rather than smoothed over: both countries' household-expenditure surveys behind their CPI weights (Uganda's UNHS VI, Rwanda's EICV4/EICV7) are minted as their own report nodes this session (`ug-unhs-vi`, `rw-eicv4-survey`, `rw-eicv7-methodological-note`), where prior AF sessions (Lesotho's HBS, Eswatini's HIES, Tanzania's HBS) folded the same kind of survey into the CPI node's own description text without a separate node. This is not a correction of those sessions — folding a weight-source survey into prose remains a legitimate choice under Research.1.md §4 — but Uganda's and Rwanda's surveys are each independently named, numbered and dated by their own CPI documents (UNHS VI, EICV4, EICV7), which is exactly the "recurring, titled publication" shape §9's `statcan-census-population` and `gb-census-2021` already treat as node-worthy elsewhere in the corpus. Rwanda's case additionally forced the question, because EICV7's own methodological note states a genuine dependency running the *opposite* direction — using the CPI's price data for its own deflation — which cannot be expressed at all without EICV7 having a node of its own. A future session normalizing this branch's survey-node convention one way or the other would be reasonable; not attempted here.

## Headline result

**Uganda's own CPI documents are silent on every external framework this branch has come to expect a citation to, and Rwanda's CPI is running four years behind its own rebasing schedule.** Uganda's March 2026 and July 2021 CPI releases were both searched in full for "East African Community"/"EAC", "IMF" and "SNA" — none appear anywhere, a genuine silence rather than a hedge, and a contrast with Tanzania's and Kenya's own CPI documents, which both name the EAC HCPI regulations directly. Rwanda's case is sharper: a World Bank Eastern Africa Regional Statistics Program-for-Results supervision mission (September 2024) states plainly that Rwanda's CPI "rebasing and switch to the 2018 Classification of Individual Consumption According to Purpose (COICOP) are required to achieve compliance... expected to be completed in 2025" — but the most recent CPI bulletin actually reachable this session (June 2026) still runs on the same "Feb 2014=100" base and the same 2013-14 EICV4 weights as the March 2024 and July 2025 editions. The 2025 target was missed, by the donor's own account structure, and Rwanda's own separate COICOP manual confirms it is still the "COICOP Rwanda 2014" edition, built on the 1993 SNA rather than the 2008 SNA carried elsewhere in this corpus. Both countries are confirmed on the IMF's weaker e-GDDS dissemination tier, not SDDS.

## Findings

### 1. Uganda's CPI methodology is fully documented; its social-protection silence is the more interesting result

`ug-ubos-cpi`, VERIFIED DIRECTLY via the March 2026 UBOS release, cross-checked against July 2021 for stability: base "rebased from 2009/2010 to 2016/2017, using weights derived from the Uganda National Household Survey (UNHS VI) that was conducted from July 2016 to June 2017"; classification "COICOP 2018... a shift from the COICOP 1999 that was used in the earlier series"; formula "the Jevons (Geometric Mean) method" at elementary level, "the modified Laspeyres index formula" for higher-level aggregates. Confirmed on IMF e-GDDS (IMF Country Report 24/290: "Uganda participates in the Enhanced General Data Dissemination System (e-GDDS)... since November 2016"), the same weaker tier as Kenya, Nigeria, Ethiopia, Ghana and (see Finding 2) Rwanda. `ug-worldbank-economic-update-14` (World Bank, February 2020), VERIFIED DIRECTLY: "The nominal transfer value of the SCG has not been adjusted since the scheme started in 2010... the benefit's real value has declined by about 40 percent since 2010." A subsequent nominal increase (UGX 25,000 to UGX 35,000, reported only by a news outlet, effective FY2026/27) carries no stated formula. What makes Uganda distinct from every prior country in this branch: its own government social-protection documents — the 2016 National Social Protection Policy and the February 2025 National Social Protection Strategy, both searched in full — never mention inflation, CPI, cost of living, indexation or erosion at all. Tanzania's, Malawi's and Eswatini's own policy documents all contain an explicit admission of the same gap; Uganda's do not even raise the question. The only explicit statement of erosion anywhere in Uganda's documented record is the World Bank's, not the Government of Uganda's own.

### 2. Rwanda's CPI is the branch's clearest case yet of a rebasing schedule missed against a donor's own tracking

`rw-nisr-cpi`, VERIFIED DIRECTLY via the June 2026 CPI report (published July 2026), cross-checked against March 2024 and July 2025 for identical wording: base "Index reference period (Feb 2014=100)"; weights "from the Household Living Conditions Survey (EICV4) results conducted in 2013-2014"; formula "a Modified Laspeyres formula." The word "COICOP" appears nowhere in any of the three editions read. `rw-worldbank-pforr-aide-memoire` (World Bank, September 2024), VERIFIED DIRECTLY: "Consumer Price Index: rebasing and switch to the 2018 Classification of Individual Consumption According to Purpose (COICOP) are required to achieve compliance. These changes are expected to be completed in 2025." No later edition than June 2026 was reachable this session, so whether the switch has since happened is unconfirmed — the target had visibly slipped as of the most recent data available. `rw-coicop-rwanda-2014`, VERIFIED DIRECTLY: NISR's own customized classification manual states "COICOP is an integral part of the 1993 SNA," confirming the currently-operative classification is an older vintage than COICOP 2018. Confirmed on e-GDDS (NISR's own page: "This is the transition towards subscribing to Special Data Dissemination Standards (SDDS) in the near future" — i.e., not yet subscribed), corroborated by a 2017 IMF press release and a 2024 IMF Country Report technical annex.

### 3. A genuine bidirectional survey/CPI relationship, new to this branch

`rw-eicv7-methodological-note` (NISR, 2025), VERIFIED DIRECTLY, states as one of its own explicit objectives to "serve as a key input for updating the consumer price index (CPI)" — the reverse of the ordinary direction, where a survey supplies the CPI's weights. Separately, in the same document: "the NISR has, since October 2023, collected data on prices of hundreds of items in markets and shops in all thirty districts. These 'CPI prices' were collected with careful attention to consistency in units and quality over time and space... we use CPI prices" for household-consumption deflation. So EICV4 feeds the CPI's weights (the ordinary direction, `rw-nisr-cpi -> rw-eicv4-survey`, `uses_data_from`) while EICV7 in turn uses the CPI's own price-collection data (`rw-eicv7-methodological-note -> rw-nisr-cpi`, `uses_data_from`) — the same pair of recurring publications feeding each other in both directions. No prior country in this corpus has produced a documented two-way dependency between the same two nodes.

### 4. Uganda's NSSF and Rwanda's RSSB both have real, documented benefit-adjustment mechanisms — neither is CPI-linked

`ug-nssf-act`, VERIFIED DIRECTLY (s.35): "the Minister shall after consultation with the board declare the rate of interest for that financial year" — a discretionary, investment-return-based crediting rate, corroborated by the SSA/ISSA country profile ("based on the rate of return on National Social Security Fund investments"). `rw-pension-law-2015` (Law N° 05/2015), VERIFIED DIRECTLY, Article 16: "The public entity in charge of pension scheme shall carry out an actuarial study for pension scheme at least once every five (5) years... Basing on the findings of the actuarial study... pension benefits may also be increased. A Presidential Order shall determine related implementation modalities" — an actuarial trigger with discretionary implementation, corroborated by the SSA/ISSA country profile's "adjusted periodically by presidential decree based on an actuarial evaluation." Two different mechanisms — investment return versus periodic actuarial study — both real, both operating, and both a documented non-dependency on CPI rather than an absence of any mechanism at all. A third shape, distinct from South Africa's deliberate discretion, Kenya's unclear basis, Ethiopia's suspended covenant, and Tanzania/Malawi/Eswatini's plain admissions of no mechanism.

### 5. Rwanda's Social Protection Sector Strategic Plan comes closer than most of this branch to naming a CPI mechanism directly — while still describing one that does not yet exist

`rw-sp-ssp-2024-2029`, VERIFIED DIRECTLY, Outcome 6: "An assessment of the adequacy of current benefits will be conducted, with adjustments to ensure that benefits meet the needs of beneficiaries. This includes a mechanism to regularly adjust benefits based on inflation and market changes." This is the most explicit forward-looking language on inflation-adjustment found anywhere in this branch — closer to naming the actual intended mechanism than Botswana's, Tanzania's or Malawi's equivalent passages — but it is still framed as a planned 2024-2029 intervention, never names NISR's CPI publication as its intended input, and the same document elsewhere admits "challenges persist in achieving coverage and adequacy targets, particularly exacerbated by shocks experienced during the NST1 period, including COVID-19, inflation." The recommendation-reveals-absence shape holds a fourth time.

## Secondary observations (logged, low priority)

* Uganda's Public Service Pension Fund Act, 2025 (reported via URBRA and Makerere University's own retirement-benefits-scheme trustees to introduce a new 5%/10% contributory public-service pension scheme) could not be read in primary form this session — too recent to be indexed on ULII or similar legal databases. Genuinely unconfirmed rather than a documented denial; see cheap checks.
* Rwanda's Ubudehe household-classification system has been formally superseded by the Imibereho Social Registry Information System (SRIS), using Proxy Means Testing — confirmed via the same SP-SSP document (Finding 5). Neither the old nor the new targeting mechanism carries any CPI/inflation linkage in the text read; both are eligibility-targeting tools, not benefit-level-setting ones, the same distinction already drawn for South Africa's and other countries' targeting systems earlier in the branch.
* One weak-evidence edge is flagged explicitly rather than silently minted at full confidence: `rw-eicv7-methodological-note -> rw-coicop-rwanda-2014` rests on a bare table column header ("COICOP") rather than a prose citation — kept in the corpus per the branch's general practice of minting flagged low-confidence edges (the AU branch's `au-cgc-gst-relativities` precedent) rather than dropping real-but-thin evidence.

## Corrections to prior sessions

None. G.7's and G.8's findings, and G.8's own Corrections section (which itself reported none), both hold up this session.

## Thomas's stated priority for the remaining work

1. **The docx's own material and every regional grouping G.7/G.8 offered are now fully exhausted.** All seven original docx countries (G.1-G.6), all eight Southern Africa countries (G.7-G.8), and both East Africa remainder countries (this session) are researched and imported. North Africa (Algeria, Morocco, Tunisia — Libya flagged by G.7 as likely too thin to source) is the only remaining concretely-scoped country list from any prior session's own offer.
2. **The broader branch-scope question, carried forward from G.6-G.8 and now genuinely at hand rather than approaching**: with every docx-anchored option exhausted, the next region choice — North Africa, or the docx's own bloc-level material with no country names attached (WAEMU, AFRISTAT, the ECOWAS HCPI guide, "Central Africa & Sahel") — is the first with nothing left to anchor it. Worth Thomas's explicit input before assuming the pattern of "pick a region, research every country in it" continues indefinitely, per G.8's own framing of this question.
3. Carried forward unchanged from G.6-G.8: whether to model the docx's regional-typology prose (WAEMU HCPI, AFRISTAT, the ECOWAS HCPI guide) as corpus nodes in their own right — still not raised with Thomas directly.

## Cheap checks still outstanding

1. `ug-public-service-pension-fund-act-2025-not-located` — the Act's primary text was not reachable this session (too recent for ULII); whether it contains a CPI-linked provision is unconfirmed. Highest-value single lookup from this session, the same way Zimbabwe's CPI methodology was flagged as highest-value at G.8.
2. `rw-coicop2018-completion-unconfirmed-post-june2026` — whether a CPI edition later than June 2026 shows the COICOP 2018/rebasing switch finally completed. Requires a session running after this one.
3. `ug-sage-increase-formula-unconfirmed` — the UGX 25,000-to-35,000 SAGE/SCG increase (FY2026/27) is sourced only to a news outlet; no primary MGLSD/MoFPED budget document confirming the figure or any rationale was located.
4. `ug-nssf-act-2022-text-blocked` — the 2022-consolidated NSSF Act text was blocked by a bot-verification wall; s.35 was confirmed only against the 2000-consolidated text.
5. `rw-eicv7-coicop-table-header-weak-evidence` / `rw-ssa-ptw-quote-tool-extracted-not-hand-verified` / `rw-pension-law-interim-adjustment-unchecked` — smaller loose ends, one lookup each, detailed in `rw-cpi-social-protection.json`'s own `_open_questions`.
6. Everything carried forward unchanged from G.6-G.8 (Tanzania's EAC-naming and Zanzibar-scope questions, Botswana's and Namibia's own open questions, Eswatini's Old Age Grant amount discrepancy, Malawi's SCTP implementation check, Lesotho's Act full-text read, Zambia's and Zimbabwe's own loose ends) — not rechecked this session, listed in those files so as not to be silently lost.

## What to pass at the start of next thread

1. This file, plus `AF/G.8.md` for the Southern Africa context and `AF/G.7.md` for the original three-way region offer this session finally closed out two branches of.
2. `Research.1.md` itself — read directly this session's own subagents (fresh, no prior context), not re-read by the coordinating session, which inherited G.8's full text directly from the user's own message. A fresh session should still read it directly per standing recommendation.
3. Thomas's answer on which region to pick next — North Africa, or the genuinely new kind of choice raised in Thomas's stated priority, item 2.
4. `npm-validate-procedure` memory, including the tar-into-`archive/`-not-root fix and the consolidated-batch refinement (mint several slices, then one validate pass) — used again this session for a two-country batch, worked cleanly.
5. Nothing sitting un-imported in `src/data/research/` for this branch.

## How to write the next hand-off

Adopted wholesale for this branch 2026-08-10 (G.1), following `AU`'s and `NZ`'s precedent of adopting the EU spec verbatim — copy this whole section into every successor, so the chain never depends on one file surviving. It is the spec, not an example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.

Mechanics

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

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly.

What each section is for

Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. Session conditions — what constrained the work: session type, what tooling was available, what did not arrive, what was left untouched by instruction. State plainly which sources you read in full, because everything downstream inherits that limit. Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result. Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Quote verbatim; `Research.1.md` §2/§3 apply here exactly as they do to research output. Secondary observations — real but low-priority. Keep them short. Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus. Thomas's stated priority for the remaining work — the numbered list carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. What to pass at the start of next thread — the packing list. If the next agent has filesystem access, say so and keep the list anyway; it doubles as an index of what matters.

Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement.
* Distinguish inference from documented fact, and say which narrow respect is still inference.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
