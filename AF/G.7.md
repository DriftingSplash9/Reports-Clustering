# G.7.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §§1-5 read directly and in full this session (§2 "the one rule", §3 extract-don't-adjudicate, §4 what counts as a node, §5 the two traps) -- the first time this session's own context read the brief directly rather than through a prior hand-off's summary. `AF/G.6.md` read directly (staged and read in full, including its own JSON sidecar, to confirm G.6's work had actually completed before this session's own work began -- see Session conditions). `AF/G.1.md` through `AF/G.5.md` were **not** re-read directly this session; this session relied on G.6.md's own Orientation section (which itself carries their content forward) and project memory. If that chain ever breaks, a future session should read them directly rather than assume.
Predecessor: G.6.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. **The branch has expanded beyond `country afrikans.docx`.** All seven of the docx's own countries (ZA, EG, KE, ET, GH, NG, TZ) were closed out as of G.6. G.6 left one open branch-scope question -- continue past the docx, or pause -- and this session opened with Thomas's answer: **continue.** Asked which region first (North Africa / Southern Africa / East Africa remainder / Thomas's own pick), Thomas chose **Southern Africa**. This session researched and imported the first two: **Botswana** and **Namibia**, the two the docx's own regional-typology prose singles out as "well-regarded" (`country afrikans.docx` paragraph ~698: "Botswana and Namibia have well-regarded universal or near-universal old-age pensions with periodic reviews"). Neither country has any raw docx entry -- both are primary research built from scratch this session (WebSearch + WebFetch, no Grok round), the same shape Tanzania's G.6 session first established for a thin-docx country, now extended to a **zero**-docx country.
4. There is no Grok tool available in-session. The Claude/Grok parallel-split pattern remains proven (Ethiopia G.3, Ghana G.4, Nigeria G.5) but has now gone three sessions unused (Tanzania G.6, Botswana and Namibia this session) -- direct WebFetch has been sufficient every time it's been tried since G.5. Worth noting as a trend, not yet worth declaring the split pattern obsolete.
5. Import discipline held again: both new slices were researched, validated (`npm run validate`/`check`/`build`, tar+cloud-sandbox procedure, run twice -- once after Botswana, once after adding Namibia) and imported (index.ts + palette.ts updated, all files written back to the device) in the same sitting. **Nothing is currently sitting un-imported in `src/data/research/` for this branch.**
6. `AFR` is now staffed with `ZA`, `EG`, `KE`, `ET`, `GH`, `NG`, `TZ`, `BW`, `NA` -- nine countries, all imported and live (**562 reports / 659 dependencies** as of this session's validator run, up from 555/656 at G.6). Every new country needs a `COUNTRY_FAMILY` entry in the same pass as its first imported node -- done for both; see `src/lib/palette.ts`.
7. **Southern Africa is not finished.** The docx's own regional prose (paragraph 696) lists the region as "South Africa, Botswana, Namibia, Lesotho, Eswatini, Zambia, Malawi, Zimbabwe" -- five of those eight are still unresearched (Lesotho, Eswatini, Zambia, Malawi, Zimbabwe), all described only as "most others remain largely discretionary," with no country-specific detail anywhere in the docx. North Africa (Algeria, Morocco, Tunisia -- Libya is likely too thin/unstable to source, per the AskUserQuestion framing this session) and the East Africa remainder (Uganda, Rwanda) are still open as the other two region choices Thomas was offered and did not pick this time.

## Session conditions — read this first

This was a genuinely new session (not a continuation-in-context of G.6's own session), opening by verifying G.6's hand-off and JSON sidecar were actually complete and consistent on disk before doing anything else -- they were (`handoff-to-json.py --check` reported both files up to date, project memory matched, no stray draft files in `src/data/research/`). Thomas then said "i wish to explore africa a lot more."

Given the scale a full continent expansion implies, this session first read `country afrikans.docx`'s own "How the rest of Africa generally works" section (paragraphs 686-717 by python-docx paragraph indexing -- not the "~858-913" estimate G.6 carried forward, which was wrong; see Corrections) to build a real candidate list, then used `AskUserQuestion` to let Thomas pick a starting region rather than guessing. He picked Southern Africa. This session then researched Botswana and Namibia in full, one after the other, rather than attempting the whole region at once -- each country's own research (multiple WebSearch/WebFetch rounds, cross-checking an older ISSA/SSA vintage against current primary sources, quote-level precision) took roughly the same effort as a single docx country did in earlier sessions, so five more countries in one sitting was judged unrealistic without cutting corners on the verification discipline Research.1.md §3 exists to enforce.

**A new failure mode for this branch's tooling, logged once, worked around successfully:** the tar+cloud-sandbox validate procedure (`npm-validate-procedure` memory) failed the first time it was tried this session with `tar: .: file changed as we read it`, because the output tarball was being written into the same directory tree being archived. Writing the output into an already-`--exclude`d subdirectory (`archive/`) instead of the repo root fixed it. That first attempt also revealed the procedure's own past runs leave stray multi-hundred-megabyte tarballs behind (`device_bash` cannot delete files, only move them) -- `_to_delete/` already held six such orphaned tarballs from earlier sessions, none logged in its own README despite the branch's standing "log why" convention (`feedback_sweep-junk` memory). This session's own two tarballs were moved and logged; the six pre-existing ones were not investigated or logged (out of scope for this session, flagged here as a minor standing mess rather than fixed).

`gov.bw`'s Old Age Pension allowance page and `dailynews.gov.bw`'s coverage of the P830-to-P1400 increase were both fetched cleanly via WebFetch, as was every Namibia source (`nsa.org.na`, `namiblii.org`, `civic264.org.na`, `issa.int`). The only fetch failure this session was `nsa.org.na`'s general CPI landing post returning a 404 -- worked around by finding NSA's actual monthly bulletin PDFs via search instead, which turned out to carry less methodology detail than Botswana's or Tanzania's equivalent documents (no COICOP name, no stated formula -- see Findings 3 and _open_questions).

## Headline result

Botswana and Namibia both confirm the branch's dominant discretionary pattern, but in two genuinely different shapes, extending the branch's running documentation of *how* African benefit systems are discretionary rather than simply noting that they are. Botswana's own 2020 National Social Protection Recovery Plan (Ministry of Local Government and Rural Development, with UNDP) *recommends* introducing automatic indexation for the Old Age Pension "so that the transfer value would be automatically adjusted each year" -- a recommendation that is itself the evidence no such mechanism currently exists -- while the actual P830-to-P1400 increase this year was announced in budget-reprioritisation language, not CPI language. Namibia goes a level further: the National Pensions Act, 1992 does not merely lack a CPI-adjustment clause -- it explicitly assigns old-age pension amount-setting to ministerial regulation by statute (s.16(1)(b)), making it the branch's first **statutory**, not merely policy-level, confirmation of discretionary benefit-setting for a universal old-age pension. Namibia's own ISSA/SSA profile (2024-07 vintage) independently corroborates this with "the benefit amount is reviewed and adjusted on an ad hoc basis" -- a case where the secondary source agrees with the primary documents rather than conflicting with them, a genuine contrast with Tanzania's and (probably) Botswana's older-vintage ISSA claims of CPI-linkage that the primary sources do not support.

## Findings

### 1. Botswana's CPI methodology and its current release are two separate documents, unlike Tanzania's single-document structure

`bw-statsbots-cpi-technical-report-2018`, VERIFIED DIRECTLY via Statistics Botswana's CPI Technical Report (December 2018 rebasing): base period "December 2018" (p.7); weights "derived from the 2015/16 BMTHS results...based on a national sample of 7199 households" (p.13); classification "adopted the Classification of Individual Consumption by Purpose (COICOP)," 12 groups, 400 items (pp.10, 12); formula "the geometric mean (Jevon's)...less influenced by extreme prices" for elementary aggregates (p.26). The current monthly release, `bw-statsbots-cpi` (VERIFIED DIRECTLY via the June 2026 edition), still holds "December 2018 = 100.0" eight years on but states no methodology of its own ("the primary CPI calculation methodology is not detailed in this publication") -- so the two were minted as separate nodes with a `methodology_depends_on` edge between them, the same genre-split Tanzania's slice used between its monthly release and its separate Data Quality Assessment, applied here for the first time to a methodology-vs-release split specifically. Statistics Botswana's own website separately describes the release as using "the Modified Laspeyres method" for higher-level aggregation -- quoted from the website, not the release document itself, and not in tension with the Technical Report's elementary-aggregate formula (standard two-level index construction), but sourced and cited as a distinct claim rather than folded into the PDF's own text.

### 2. Botswana's Old Age Pension: a government recommendation that is itself proof of absence

`bw-national-social-protection-recovery-plan-2020` (Ministry of Local Government and Rural Development + UNDP, UNICEF, ILO, FAO, UNFPA; 30 June 2020), VERIFIED DIRECTLY. Executive Summary S.5.1 (p.xi): "The value of the combined Older Persons Grant should be re-evaluated and benchmarked against the poverty line or consumption needs, so that the transfer value would be automatically adjusted each year to retain or increase its purchasing power over time." Framed as a recommendation, not a description of current practice -- the same inferential shape as Tanzania's National Social Protection Policy 2023, but reached by a document proposing a fix rather than one naming an absence outright. The government's own current Old Age Pension page (`gov.bw`) states only the amount (BWP830, now stale) and administering department (Department of Social Development), with no adjustment mechanism named anywhere. The actual increase to P1,400, announced in the Vice President/Finance Minister's "maiden national budget speech" (`dailynews.gov.bw`), was funded "through reprioritisation and budget cuts within the existing allocations" -- discretionary budget language, no CPI or cost-of-living reference at all.

### 3. Namibia's CPI bulletin carries less stated methodology than any other AF country's CPI document so far

`na-nsa-cpi`, VERIFIED DIRECTLY via the Namibia Statistics Agency's August 2025 NCPI Bulletin: base "Dec 2012=100," "last rebased in 2013, using household expenditure data collected in the 2009/10 Household Income and Expenditure Survey," "12 categories and 55 sub-categories," "over 350 items," prices "collected monthly from more than 900 retail outlets," published "approximately 15 days after the end of the reference month." Neither COICOP nor any named index formula appears anywhere in this bulletin, and `nsa.org.na`'s own inflation landing page and general CPI post (404) carried no link to a dedicated technical/methodology report of the kind Botswana and Tanzania both have. This reads as a genuine documentation gap on NSA's public-facing side rather than a search failure -- worth one more targeted look by a future session (see _open_questions) but not chased further this session once the bulletin's own stated ceiling was reached.

### 4. Namibia's National Pensions Act, 1992 -- the branch's first statutory confirmation of discretionary benefit-setting

`na-national-pensions-act-1992`, VERIFIED DIRECTLY, read via NamibLII. Purpose, per the Social Protection Policy 2021-2030's own citation (p.15, S.5.3): "provides for national pensions to be paid to aged, visually impaired and persons with disability." On amount-setting, s.16(1)(b): "the payment of national pensions including the maximum amount to be paid, the determination of the amount to be paid in any particular case" is set by the Minister "in consultation with the Minister of Finance"; s.16(3) permits "different pensions to be paid to different categories of aged persons according to their income and other assets"; s.16(2) requires parliamentary approval only for reductions to aggregate pension entitlements. No section anywhere ties any amount to the CPI or any price index. This differs in kind from every other "denied" edge in the branch so far (Tanzania's PSSSF Act, Nigeria's various instruments): those documented an *absence* of a CPI clause in an otherwise-silent statute; this one documents an *explicit, affirmative delegation* to ministerial discretion, written into the founding law of the benefit itself rather than a supporting administrative fund.

### 5. Namibia's Social Protection Policy 2021-2030 treats the Child Grant and the Old Age Pension differently, in the same document

`na-social-protection-policy-2021-2030` (Ministry of Gender Equality, Poverty Eradication and Social Welfare; Cabinet Decision No. 4th/23.03.21/009, March 2021), VERIFIED DIRECTLY. The implementation plan sets old-age pension values as fixed nominal targets -- "N$1 300 (2020)" rising to "N$1 350" by 2025/26 -- with no formula. The Policy commits only the Child Grant to inflation language: "adjustments will be made to the existing amount of the Child Grants to account for inflationary losses over time." The equivalent language is simply absent for the old-age pension anywhere in the document, despite the Policy noting elsewhere that "the old-age pension has the best adequacy, covering 65% of the extremely poor consumption expenditure." Cites the National Pensions Act, 1992 by name as one of ten governing acts (S.5.3, p.15) -- minted as the branch's first `cites`-type edge in this pairing (`na-social-protection-policy-2021-2030 -> na-national-pensions-act-1992`), context rather than a computational input, per the `RelationshipType` definition.

### 6. The older-ISSA-vintage CPI-claim pattern holds for Botswana, breaks (in a good way) for Namibia

The SSA/ISSA 2018-2019 country profile makes the same shape of claim for Botswana that it made for Tanzania: "Benefits are adjusted periodically based on changes in the cost of living" (old-age pension, then 530 pula/month, and the War Veteran's Allowance). No document fetched this session for the *current* Botswana system corroborates that -- same unresolved-conflict treatment as Tanzania, not adjudicated, and neither ISSA vintage minted as a node (matching precedent). Namibia's equivalent secondary source, however, is the 2024-07 vintage ISSA profile (a full country-specific update, not the older Africa-wide 2018-2019 SSA edition used for the other eight AF countries so far) and it is *consistent* with the primary sources rather than contradicting them: "Not legally mandated. The benefit amount is reviewed and adjusted on an ad hoc basis." This is the first AF country where the secondary compilation and the primary documents agree rather than conflict -- worth noting as a genuine methodological point in the corpus's favour (the older-vintage-claims-more-than-current-reality pattern is not universal), even though, per precedent, this ISSA profile is still not minted as a node.

## Secondary observations (logged, low priority)

* The World Bank's Botswana Social Protection Programs and Systems Review states the Ipelegeng public-works wage rate at "81 to 93 percent of the minimum wage in 2019" -- a relative-to-minimum-wage benchmark, not CPI -- and criticises it as "high in comparison with international benchmarks," without proposing an indexation formula. Isolated node (`bw-worldbank-social-protection-review`), same "kept and shelved" shape as Tanzania's and Nigeria's World Bank factsheets.
* Namibia's Government Institutions Pension Fund (GIPF, established 1989) -- the likely Namibian analogue to Tanzania's PSSSF Act, i.e. the civil-service occupational fund as distinct from the universal National Pensions Act scheme -- was named in search (`gipf.com.na`) but not researched at all this session.
* Six pre-existing orphaned validate-tarballs in `_to_delete/` (from sessions before this one) were noticed but not logged or investigated, only this session's own two. A future cleanup pass could close the gap between the standing "log why" convention and what's actually in that folder.

## Corrections to prior sessions

1. **`AF/G.6.md`'s "What to pass at the start of next thread" item 3 cited the rest-of-Africa prose as being at "paragraphs ~858-913."** This session located it by direct python-docx paragraph indexing at **paragraphs 686-717**. The docx has only 721 paragraphs total, so "858-913" was never reachable -- likely a stale estimate carried from a different counting method (e.g. counting runs or a different document revision) rather than a checked value. Not a finding-level error (G.6 never quoted the prose's content, only estimated its location), but worth fixing now that a session actually needed to find it.

## Thomas's stated priority for the remaining work

1. **Southern Africa is not finished.** Five countries remain from the docx's own regional list: Lesotho, Eswatini, Zambia, Malawi, Zimbabwe -- all described only as "most others remain largely discretionary," no country-specific docx detail for any of them, meaning each is a from-scratch primary-research country like Botswana and Namibia were. Natural next batch, pending Thomas's confirmation to keep going in this region specifically.
2. **North Africa (Algeria, Morocco, Tunisia) and the East Africa remainder (Uganda, Rwanda) are still open alternatives** -- both were offered alongside Southern Africa this session and Thomas picked Southern Africa; neither has been touched.
3. Carried forward unchanged from G.6: whether to model the docx's regional-typology prose (WAEMU HCPI, AFRISTAT, the ECOWAS HCPI guide) as corpus nodes -- still not raised with Thomas directly.
4. Once Southern Africa (or whichever region Thomas picks next) is further along, the same branch-scope question recurs one level down: does AF eventually cover the whole continent, or does it stop at some deliberately chosen set? Not yet asked.

## Cheap checks still outstanding

1. `na-cpi-formula-unconfirmed` -- Namibia's NCPI bulletin names neither COICOP nor an index formula; a dedicated NSA technical/concepts-and-methods report, if one exists, was not located this session.
2. `na-2025-26-nhies-rebasing-pending` -- NSA has announced conducting the 2025/2026 Household Income & Expenditure Survey; whether a CPI rebasing off the back of it has occurred (the August 2025 bulletin is still on a 2012 base) was not checked.
3. `bw-sdds-status-unconfirmed` -- Bank of Botswana's own GDDS/SDDS page is not recently dated and IMF DSBB's country pages are JS-rendered (same recurring failure logged for South Africa, Egypt and Kenya); Botswana's current IMF data-standard tier is unconfirmed.
4. `bw-cpi-rebasing-cadence` -- the 2018 Technical Report's own Appendix C implies a prior September 2016 base; whether a rebasing has occurred since December 2018 was not checked.
5. `na-child-grant-vs-oap-mechanism` -- whether a Namibian policy revision since 2021 has extended a formal inflation-adjustment commitment to the old-age pension (currently only the Child Grant has one) was not checked.
6. `na-gipf-not-checked` / `bw-budget-speech-not-located` / `bw-recovery-plan-part2-not-read` -- three smaller loose ends, one lookup each, detailed in the respective slice files' own `_open_questions`.
7. Everything carried forward unchanged from G.6 (`tz-eac-guidelines-vs-regulations-naming`, `tz-zanzibar-scope-unconfirmed`, `tz-pssn-benefit-amounts-not-located`, the ECOWAS HCPI guide, and the older South Africa/Ethiopia items) -- not rechecked this session, listed in G.6.md so as not to be silently lost.

## What to pass at the start of next thread

1. This file, plus `AF/G.6.md` for the seven-country docx-closing context. `G.1.md`-`G.5.md` are one level further back; read directly only if this Orientation section stops being trustworthy.
2. `Research.1.md` itself -- read directly this session for the first time in this session's own context; worth doing again directly rather than trusting a summary, per this session's own experience finding it genuinely informs node-shape decisions (e.g. the one-off-vs-recurring split behind Finding 1's two-node structure).
3. Thomas's answer on which region to continue with -- the rest of Southern Africa (Lesotho, Eswatini, Zambia, Malawi, Zimbabwe), or a switch to North Africa / East Africa remainder.
4. `npm-validate-procedure` memory, plus this session's own fix (write the scratch tarball into an already-excluded subdirectory like `archive/`, not the repo root, or `tar` throws "file changed as we read it").
5. Nothing sitting un-imported in `src/data/research/` for this branch.

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
