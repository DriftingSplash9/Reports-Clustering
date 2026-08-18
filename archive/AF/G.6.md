# G.6.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §2/§3/§4, same as every prior AF session. `AF/G.1.md` through `AF/G.5.md` all read this session (continuous with the G.5 session — see Session conditions).
Predecessor: G.5.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. Source material is `country afrikans.docx` (repo root) — 48 raw Grok-research entries across seven countries plus continent-wide prose. **All seven countries in the docx are now researched.** South Africa (G.1, extended G.2), Egypt (G.2), Kenya (G.2), Ethiopia (G.3), Ghana (G.4), Nigeria (G.5), Tanzania (this session, G.6) — Tanzania was the last one outstanding.
4. There is no Grok tool available in-session. `country afrikans.docx` itself is external Grok research Thomas ran outside this tool. The Claude/Grok parallel-split pattern (Claude writes a Grok prompt, Thomas runs it externally and pastes the answer back) is proven three times (Ethiopia G.3, Ghana G.4, Nigeria G.5) but **was not needed this session** — see Session conditions.
5. Import is not a separate, deferred step. Every prior AF hand-off left newly-researched slices as DRAFT files in `src/data/research/` for Thomas to review and import later, until G.5's session imported a seven-file backlog in one pass. This session continued that discipline: Tanzania was researched, validated with `npm run validate`/`npm run check`/`npm run build`, and imported (index.ts + palette.ts updated, all three files written back to the device) in the same sitting. **Nothing is currently sitting un-imported in `src/data/research/` for this branch.**
6. `AFR` is now staffed with `ZA`, `EG`, `KE`, `ET`, `GH`, `NG`, `TZ` — all seven docx countries, all imported and live in the graph (555 reports / 656 dependencies as of this session, per Orientation item 5's validator run). Every new country still needs a `COUNTRY_FAMILY` entry in the same pass as its first imported node — done for all seven; Tanzania's entry was added to `src/lib/palette.ts` this session.

## Session conditions — read this first

Continuous with the G.5 session (Thomas pasted G.5.md's content back into a new session to resume the branch). No new instruction was given beyond what G.5's own "Thomas's stated priority" section already specified — priority 1 there was Tanzania, so this session proceeded directly to it under the standing auto-mode guidance rather than waiting for an explicit re-ask.

**No Grok round was used this session — a first for this branch.** Tanzania had only 4 raw docx entries (the thinnest of any country worked so far — contrast Nigeria's 9). All four were fetched directly and cleanly via `WebFetch` this session (NBS's CPI Release, NBS's Data Quality Assessment, the National Social Protection Policy 2023, and the ISSA/SSA country profile), and direct fetching kept working well beyond the four — the EAC's own Regulations PDF, the Public Service Social Security Fund Act, and a current World Bank PSSN III factsheet were all also fetched successfully without needing a Grok round to cover gaps. Given how much of the original material was directly verifiable and how thin the raw corpus was, a parallel split was judged unnecessary rather than skipped for lack of opportunity — worth a documented decision, since the branch's default has been the split for three sessions running.

One direct-fetch failure worth recording as a new, distinct failure mode: `eac.int` fails with a **certificate/robots error** (`ROBOTS_DISALLOWED` plus an SSL hostname-mismatch message) on at least one specific document URL on that domain, while a *different* URL on the same domain (the EAC Regulations PDF, a different `file=` parameter) fetched cleanly moments later. Per this session's system instructions, no `curl`/bash workaround was attempted for the failing URL — the earlier `webfetch-binary-pdf-fallback` project-memory precedent (curl+pypdf for WebFetch-reported binary-unreadable PDFs) does not extend to this failure class (SSL/robots) under the tool policy active this session. This is why the "EAC Guidelines" companion document (as distinct from the "EAC Regulations" document actually fetched) remains unconfirmed — see Findings and `tz-eac-guidelines-vs-regulations-naming`.

## Headline result

Tanzania closes out `country afrikans.docx` as a source (all seven countries now researched) and produces the branch's cleanest three-way documented conflict yet on whether a benefit is CPI-adjusted: the National Social Protection Policy 2023 states outright that inflation has eroded benefits **"due to the absence of mechanisms to adjust benefits"**; the Public Service Social Security Fund Act, read section-by-section, confirms no such mechanism exists in the statute itself; and the older (2018-2019) SSA/ISSA country profile — the actual source the docx cited — claims old-age and disability pensions **are** "adjusted periodically based on changes in the consumer price index." This session independently pulled the newer (2024) ISSA profile and found that claim dropped entirely from the current vintage. All three documents are quoted directly; none of the conflict is resolved, per the standing extract-don't-adjudicate rule.

## Findings

### 1. Tanzania's NCPI methodology — clean primary-source confirmation, four sourced values

`tz-nbs-ncpi`, VERIFIED DIRECTLY via NBS's own CPI Release (February 2026), Sections 1.2-1.4: base price reference period "the average from January to December 2020"; index reference period "the year 2020"; weights from "the 2017/18 Household Budget Survey" across "26 mainland regions"; COICOP "2018 version... 13 COICOP divisions"; formula "the geometric mean of price relatives for elementary index aggregates and higher-level aggregates are compiled using Lowe Index formula, a type of Laspeyres index." All four docx-flagged methodology facts (base year, weight survey, COICOP vintage, formula) confirmed with exact section citations the docx itself did not carry.

### 2. Tanzania's CPI Data Quality Assessment — the branch's first working EAC regional-instrument citation, plus a naming discrepancy

`tz-nbs-cpi-dqa`, VERIFIED DIRECTLY via NBS's 2023 Data Quality Assessment. Confirms CPI compliance with the "2008 SNA" (S.2.3.1), the "Consumer Price Index (CPI) Manual – Concept and Methods 2020" (S.3.3.2), the IMF's "Special Data Dissemination Standard (SDDS)" (S.4.1.1) — placing Tanzania on the stronger SDDS tier alongside South Africa and Egypt, not the weaker e-GDDS tier confirmed for Kenya/Nigeria/Ethiopia/Ghana — and the IMF's own Data Quality Assessment Framework as its structural basis ("The IMF Data Quality Assessment Framework (DQAF) identifies quality-related features," Introduction, p.2, minted this session as a new node `imf-dqaf`). Most notably, S.2.1.1 states CPI "adhere[s] to the guidelines outlined in the EAC guidelines for compiling consumer price indices (HCPI)" — and this session independently fetched the EAC's own binding instrument and confirmed Tanzania is named as a Partner State bound by it (Foreword: "the United Republic of Tanzania (URT)"; Article 2002: "These regulations shall apply to all EAC Partner States"). This reuses `eac-hcpi-regulations`, a node Kenya's session (`ke-social-protection.json`) minted first but could only back with a placeholder homepage URL — this session's fetch got specific Article citations (101, 2002, 109.2, 110.1) from the actual document, worth using to upgrade that node's `evidence_url` on review (see Secondary observations). The naming discrepancy itself — DQA says "guidelines," the fetched primary document is titled "REGULATIONS," and a separately-titled "EAC Guidelines" PDF exists but could not be fetched (SSL/robots failure, see Session conditions) — is recorded as `tz-eac-guidelines-vs-regulations-naming`, unresolved.

### 3. The National Social Protection Policy 2023 admits the absence of an adjustment mechanism — a first for the branch

`tz-national-social-protection-policy-2023`, VERIFIED DIRECTLY. Chapter Four (p.34) lists the governing legal instruments (Employment and Labour Relations Act 2004, Social Security Act Cap. 135, Public Service Social Security Fund Act 2018, and others). The load-bearing quote is p.28: **"Inflation has eroded the value of benefits in contributory and non-contributory social protection due to the absence of mechanisms to adjust benefits."** This is not a document merely lacking a stated mechanism (the normal "discretionary" shape already documented across the branch for Nigeria's minimum wage, Ghana's minimum wage, and others) — it is the government's own policy affirmatively naming the absence as a problem. On the PSSN safety net specifically, the Policy flags donor-dependency risk (p.11) rather than a benefit-setting formula, and names NBS only as a future data-generation body (p.39), not a current input.

### 4. The Public Service Social Security Fund Act confirms the Policy's own admission at statute level

`tz-psssf-act` (Cap. 371), VERIFIED DIRECTLY, read section-by-section this session: ss.25-48 (benefits), s.30 (retirement pension rate), s.34 (invalidity pension rate), s.57 (triennial actuarial valuation), s.58 (financial-soundness restoration) — none ties a benefit to CPI or any price index. The one adjustment lever found, s.18(4) (Minister may adjust *contribution* rates "taking into consideration of the actuarial valuation"), is solvency-driven, not price-driven, and applies to contributions rather than paid pensions. A clean statute-level confirmation of Finding 3's policy-level admission.

### 5. A CPI-adjustment claim that appears to have been silently dropped between ISSA profile vintages

The docx's own cited source (SSA/ISSA country profile, 2018-2019 vintage) states for old-age and disability pensions: "Benefits are adjusted periodically based on changes in the consumer price index." This session independently fetched the newer ISSA profile (2024-07 vintage) and found the old-age and disability sections there carry **no** "Benefit adjustments" subsection at all — the CPI-adjustment claim is not repeated. The survivor-pension section, present in both vintages, consistently describes actuarial review rather than CPI in both. Per Research.1.md §3, this is reported as an unresolved conflict rather than adjudicated: it reads as though the older claim was simply wrong (or described a since-discontinued arrangement), consistent with Findings 3 and 4's independent confirmation that no CPI mechanism currently exists, but that is inference. Neither ISSA/SSA profile is minted as a corpus node — same precedent as South Africa's docx entry for the same series, not minted in `za-cpi-social-grants.json` (a periodic secondary compilation is not itself something a primary document names as an input).

## Secondary observations (logged, low priority)

* The World Bank's PSSN III factsheet (March 2026, $250 million IDA credit) states no Government-of-Tanzania counterpart funding figure and no transfer-amount-setting formula — same shape as Nigeria's NASSP-SU (`ng-nassp-su-worldbank`), both isolated nodes in the validator's "kept and shelved" list, both a documented case of a safety-net programme motivated by inflation language without a mechanical CPI link.
* `eac-hcpi-regulations`'s `evidence_url` is currently the bare `https://www.eac.int/` homepage (from Kenya's session, which couldn't reach the actual PDF). This session's `tz-nbs-cpi-dqa -> eac-hcpi-regulations` edge cites the real PDF with specific Article numbers — worth updating the existing node's `evidence_url` to that working link on review, rather than leaving the stronger citation stranded on Tanzania's edge only.
* `imf-dqaf` is a new shared node (first minted this session) — worth checking whether any of the six other AF countries' own DQA-style documents (if any exist) also cite it, now that a node exists to point at.

## Corrections to prior sessions

None. G.1 through G.5's findings all held up this session; nothing was found wrong. (The `eac-hcpi-regulations` weak-evidence-URL point above is a strengthening opportunity, not a correction — Kenya's session correctly identified and minted the node; it just couldn't reach the specific PDF that this session did.)

## Thomas's stated priority for the remaining work

1. ~~Tanzania — the last unresearched country in the branch.~~ **CLOSED this session.** All seven countries in `country afrikans.docx` are now researched and imported.
2. Whether to model the docx's regional-typology prose (WAEMU HCPI, AFRISTAT, the ECOWAS HCPI guide) as corpus nodes — raised since G.1, still not raised with Thomas directly. Carried forward unchanged; East Africa's own regional instrument (`eac-hcpi-regulations`) is already modelled and working well, which may be a useful existence proof if Thomas wants to revisit this for the other regions.
3. Import review is, for the moment, not a backlog — everything researched through this session is already imported and validated live (555 reports / 656 dependencies). This has now held true across two consecutive sessions (G.5, G.6) — worth treating as the new normal rather than restating as a fragile state each time, though still worth checking rather than assuming.
4. With all seven `country afrikans.docx` countries done, the natural next question for Thomas is scope: does the AF branch continue with countries *not* in the original docx (the "how the rest of Africa generally works" prose names Botswana, Namibia, Algeria, Morocco, Tunisia, Uganda, Rwanda, Zambia, Malawi, Zimbabwe, and others as having real but unresearched systems), or does the branch pause here pending a different priority? Not decided this session — flagged as the first open branch-scope question since AF/G.1.md's opening.

## Cheap checks still outstanding

1. `tz-eac-guidelines-vs-regulations-naming` — a document titled "EAC Guidelines for Compiling Harmonised Consumer Price Indices" (distinct from the Regulations document this session fetched) turned up in search but failed on an SSL/robots error specific to that URL. Worth one retry from a session whose tooling can reach it, or confirmation from Thomas that "guidelines" in Tanzania's DQA is just loose language for the Regulations.
2. `tz-zanzibar-scope-unconfirmed` — every Tanzania document in this slice scopes itself to Tanzania Mainland explicitly; whether Zanzibar publishes a separate CPI or social-protection policy was not checked.
3. `tz-pssn-benefit-amounts-not-located` — the World Bank's PSSN III factsheet gives financing and objectives but no household transfer amounts; earlier PSSN phases (I, II) were not checked for whether a benefit-setting method was ever documented and later dropped.
4. The ECOWAS HCPI Methodological Guide (Nigeria/Ghana) — still failed three times as of G.5; per that session's own recommendation, stop treating it as a cheap check. Carried forward unchanged, listed here only so it isn't silently lost.
5. Constitution s.28 (South Africa, children's rights); `za-sassa-annual-report` → `za-social-assistance-act-2004` direct edge; IMF DSBB DQAF pages (South Africa, Egypt, Kenya, JS-rendered); Ethiopia's PSNP5 wheat-equivalency figures — all carried forward unchanged since earlier sessions (G.1-G.3), still low urgency, still not rechecked this session.

## What to pass at the start of next thread

1. This file, plus `AF/G.1.md` through `AF/G.5.md` for full context — Orientation across all six has been kept current rather than rewritten from scratch.
2. If continuing within the original docx's scope: nothing — all seven countries are done, so the next session needs Thomas's answer to priority 4 above before picking a new country.
3. If expanding beyond the docx: the "how the rest of Africa generally works" prose in `country afrikans.docx` (paragraphs ~858-913) as a candidate country list, though every one of those is Grok-sourced prose about *other* countries, not the country-specific entries the seven researched countries had — a new round of primary research would be needed from scratch, not just verification of existing docx quotes.
4. `feedback_grok-as-verification` and `npm-validate-procedure` (Claude's project memory) — the Grok-split mechanism (not used this session, but still the branch default) and the fast tar-based validate procedure, used again this session for Tanzania's import.
5. Nothing is currently sitting un-imported in `src/data/research/` for this branch.

# How to write the next hand-off

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
