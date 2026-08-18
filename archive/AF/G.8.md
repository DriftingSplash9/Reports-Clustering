# G.8.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §§1-5, same as G.7 (this session is a direct continuation of G.7's own session — no new context reload). `AF/G.7.md` is this file's own immediate predecessor and was written earlier in the same session, not re-read separately.
Predecessor: G.7.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. **The docx's own Southern Africa list is now fully researched.** `country afrikans.docx` paragraph 696 names the region as "South Africa, Botswana, Namibia, Lesotho, Eswatini, Zambia, Malawi, Zimbabwe" — all eight are now imported: South Africa from the original seven, Botswana and Namibia at G.7, and Lesotho, Eswatini, Zambia, Malawi and Zimbabwe this session (G.8). None of the five researched this session had any docx entry at all — every document is primary research from scratch, the same shape G.7 established for Botswana and Namibia.
4. `AFR` is now staffed with fourteen countries: `ZA`, `EG`, `KE`, `ET`, `GH`, `NG`, `TZ`, `BW`, `NA`, `LS`, `SZ`, `ZM`, `MW`, `ZW` — **571 reports / 661 dependencies** as of this session's validator run, up from 562/659 at G.7.
5. Import discipline held for a third consecutive session: all five new slices were researched, validated (`npm run validate`/`check`/`build`, tar+cloud-sandbox procedure, run once for the whole batch after all five were minted rather than once per country — see Session conditions) and imported (index.ts + palette.ts updated, all files written back to the device) in the same sitting. **Nothing is currently sitting un-imported in `src/data/research/` for this branch.**
6. **North Africa (Algeria, Morocco, Tunisia) and the East Africa remainder (Uganda, Rwanda) are still open**, offered to Thomas alongside Southern Africa at G.7 and not yet picked. Beyond those, the docx's own regional prose (paragraphs 686-717 — see G.7's Correction on this location) also names Libya (North Africa, likely too thin/unstable to source, per G.7's own framing), and describes Francophone West Africa (WAEMU) and "Central Africa & Sahel" only in bloc-level generalities with no country names at all — genuinely a different, harder research problem than picking individual countries off a named list.

## Session conditions — read this first

Direct continuation of the G.7 session (same session, not a fresh one) — Thomas asked "where shall we go next pardner?" immediately after G.7 was delivered, was offered the same three-way region choice again (North Africa / finish East Africa / finish Southern Africa), and picked **finish Southern Africa**: Lesotho, Eswatini, Zambia, Malawi, Zimbabwe, five countries in one batch.

Given the batch size, this session changed the import cadence from G.7's country-by-country validate cycle to a single consolidated pass: all five countries were researched and minted as DRAFT JSON files first, then imported and validated together in one `index.ts`/`palette.ts` edit and one tar+cloud-sandbox `validate`/`check`/`build` run. This roughly halved the number of expensive validate cycles for the same number of countries and is recommended as the default approach for any future multi-country batch this branch takes on, reserving the per-country cycle for cases where Thomas wants to review each country before the next one starts.

Research quality varied more within this batch than within G.7's two countries — worth stating plainly rather than smoothing over. Lesotho and Eswatini both have complete, richly documented CPI methodologies (comparable to Botswana's and Tanzania's) and Eswatini and Malawi each produced an explicit, self-critical primary-source denial of CPI-indexation — the strongest kind of finding this branch's evidentiary standard rewards. Zambia's and Malawi's CPI methodology, by contrast, could only be partially confirmed (base period and cadence, not weights/COICOP/formula), and Zimbabwe's CPI methodology could barely be confirmed at all: `zimstat.co.zw`'s own PDF releases failed twice with proxy/gateway errors (not a content refusal — a transport-layer failure, logged as a new, distinct failure mode from the branch's prior WebFetch-binary-PDF and DSBB-JS-render failures), a UNECE conference paper on the same topic 403'd, and an IMF technical report mentioned the CPI only in passing. No `dependencies` edges were minted for Zambia, Malawi or Zimbabwe's CPI nodes as a result — the branch's rule ("if no document says it, the edge does not exist") extends to the COICOP methodology edge itself, not only to social-protection findings. This is the first AF session where a country's CPI node shipped with a genuinely thin methodology despite real effort, rather than as a shortcut.

## Headline result

Southern Africa closes out with the branch's two most explicit, most self-critical documented denials of CPI-indexation so far. The World Bank's own 2021 account of Eswatini's Old Age Grant states plainly: "While the grants are not indexed to price inflation, benefit amounts have been raised at irregular intervals since the program's inception in 2005." The Government of Malawi's own Social Cash Transfer Programme Strategic Plan goes further, quantifying its own failure: "there is no systematic arrangement for adjusting the level of transfers for inflation," and "between 2006 and 2020 transfer levels were adjusted only three times" — fourteen years, three adjustments — before committing to build a real mechanism. Both are government or World Bank documents naming the absence outright, not this session's inference from silence or a recommendation's implied gap (the shape G.7's Botswana and Tanzania's G.6 findings took). Zambia's and Lesotho's findings are quieter but consistent — fixed nominal transfer amounts with no adjustment language found anywhere. Zimbabwe stands apart structurally rather than substantively: its CPI's most notable documented fact this session is that ZIMSTAT publishes three parallel indices (ZiG, USD, Blended) following the 2024 currency reform, a genuinely distinctive methodological shape not seen elsewhere in the corpus, while its social-protection evidence rests on press coverage of NSSA's 2026 discretionary pension increases rather than a primary NSSA document reached directly.

## Findings

### 1. Lesotho's CPI methodology is fully documented; its Old Age Pensions Act is only abstract-verified

`ls-bos-cpi`, VERIFIED DIRECTLY via the Bureau of Statistics' Report No. 3:2026 (January 2026): base period "rebased using the price reference period as the yearly average, so that 2022 = 100"; weights reflect "expenditure and shopping patterns from the 2017/2018 Household Budget Survey"; classification "COICOP... organized into 12 divisions". `ls-old-age-pensions-act-2005` (Act No. 3 of 2005) was checked only via NATLEX's official abstract, not the Act's own gazetted text (lesotholii.org 404'd this session) — the abstract names a tax-funded, non-contributory scheme for citizens 70+ paid "from the Consolidated Fund" but states no adjustment mechanism, silence rather than denial. Corroborating, not minted as a node: a Lesotho News Agency report of the pension rising M950-to-M1,000, announced by the Minister of Finance "in the 2026/27 budget," framed around "economic pressures from global trade shocks, rising tariffs on exports, and falling diamond and textile prices" — budget language, not CPI language, the same shape as Botswana's increase at G.7.

### 2. Eswatini: the branch's most complete CPI methodology in this batch, paired with its most explicit denial

`sz-cso-cpi`, VERIFIED DIRECTLY via the February 2026 CPI Report: base "June 2020 = 100"; weights "based on data from the 2016/17 Household Income and Expenditure Survey (HIES)"; classification per "COICOP"; formula stated in full two-stage form — "the lower level or elementary index... is calculated as a geometric mean of price changes" and "the upper-level index is a geometric Lowe index — the weighted geometric average of elementary indices." `sz-worldbank-social-assistance-2021` (World Bank Discussion Paper No. 2106, June 2021), VERIFIED DIRECTLY: "None of the government's existing social assistance programs is covered by legal provisions," and on the Old Age Grant specifically, "While the grants are not indexed to price inflation, benefit amounts have been raised at irregular intervals since the program's inception in 2005" — an explicit denial, the cleanest of the batch. A genuine unresolved discrepancy logged rather than adjudicated: the World Bank paper's own nominal history shows the grant reaching E500/month by 2020, while the government's current Social Welfare Department webpage (gov.sz, fetched this session) states E240/month — lower than the 2020 figure, reading as a stale page rather than an actual cut, the same shape already seen in Botswana's gov.bw page at G.7, but not confirmed either way.

### 3. Zambia: fixed nominal transfers, no adjustment language anywhere, and a thinner CPI methodology than Lesotho's or Eswatini's

`zm-zamstats-cpi`, VERIFIED DIRECTLY via ZamStats' "The Monthly" (Volume 278, May 2026): base "2009 = 100," released "on the last Thursday of each month." Expenditure-group names read as COICOP-shaped but the bulletin never names COICOP explicitly, so no methodology-dependency edge was minted (see Session conditions on this rule extension). `zm-social-cash-transfer-factsheet` (Ministry of Community Development and Social Services), VERIFIED DIRECTLY: fixed transfers of "200 Kwacha per month," doubled "for a household with a member with severe disability," with no adjustment mechanism of any kind named. A January 2024 Lusaka Times report shows beneficiaries in Mambwe district publicly requesting increases because current amounts are "no longer adequate" — corroborating, not minted as a node.

### 4. Malawi: the branch's most self-critical government document yet, and its thinnest-documented CPI

`mw-sctp-strategic-plan-2022-2027` (Government of Malawi, Ministry of Gender, Community Development and Social Welfare), VERIFIED DIRECTLY: "Despite a recent ad hoc increase, there is no systematic arrangement for adjusting the level of transfers for inflation," and, with a specificity no other AF document has offered, "between 2006 and 2020 transfer levels were adjusted only three times." The Plan commits to a fix — "A mechanism for regular adjustment of transfers will be instituted to account for inflation" — the same recommendation-reveals-absence shape as Botswana's 2020 Recovery Plan (G.7) and Tanzania's National Social Protection Policy 2023 (G.6), stated more bluntly than either. `mw-nso-cpi` by contrast could only be confirmed as to base period ("Dec 2021=100," from an NSO news release) and monthly cadence — weights, COICOP and formula were not located despite several attempts, the thinnest CPI methodology in this batch until Zimbabwe's (Finding 5).

### 5. Zimbabwe's CPI: a genuinely distinctive multi-currency structure, confirmed; the full methodology, not

`zw-zimstat-cpi`, VERIFIED DIRECTLY only as to structure: following the April 2024 introduction of the Zimbabwe Gold (ZiG) currency, ZIMSTAT publishes "three price indices... the ZiG index, US dollars Index and the Blended Index," with the ZiG series' own index reference period stated as "April 2024." No other AF country publishes more than one CPI series. Weights, COICOP and index formula were not confirmed: ZIMSTAT's own PDF releases failed with proxy/gateway (504) errors on two separate URLs and reference dates, a UNECE conference paper on Zimbabwe's cost-of-living indices (Geneva, April 2021) returned a 403, and an IMF technical assistance report on national accounts mentioned the CPI only in passing. No primary NSSA document was reached this session for the social-protection side; the evidence is two news reports (Financial Gazette, Pension Policy International, both May 2026) describing 2026 pension increases as explicitly interim and discretionary — "we increased by 100 percent in April, with further increases expected in July and October" toward a stated "US$60 equivalent" target, while NSSA "is assessing its capacity to implement a long-term pension adjustment." Neither article is minted as a node (press coverage of an announcement, not a document another document names as an input), but the "assessing capacity... long-term" language reads as the same shape found explicitly in this batch's primary documents, now only corroborated rather than confirmed directly.

## Secondary observations (logged, low priority)

* `zimstat.co.zw`'s PDF-hosting failures (two separate 504s, different URLs and dates) are logged as a new, distinct WebFetch failure mode for this branch — a transport/proxy failure, not the binary-PDF-unreadable class the `webfetch-binary-pdf-fallback` project memory covers, and not the JS-render class already logged for IMF DSBB pages. Worth a retry from a session whose tooling reaches it differently, rather than assuming the content itself is unreachable.
* The consolidated-batch import cadence (mint all five, then one validate/check/build pass) is worth keeping as the default for future multi-country batches on this branch — see Session conditions.

## Corrections to prior sessions

None. G.7's findings and its one correction (the docx paragraph-location fix) both held up this session.

## Thomas's stated priority for the remaining work

1. **The docx's own country-specific material is now fully exhausted** — all seven original countries (G.1-G.6) plus all eight of the docx's named Southern Africa countries (G.7-G.8) are researched and imported. Every remaining country in the corpus's future is from-scratch primary research; none has any docx entry to build on.
2. **North Africa (Algeria, Morocco, Tunisia) and the East Africa remainder (Uganda, Rwanda) remain the two concretely-scoped options**, both offered to Thomas at G.7 and G.8 alongside Southern Africa; neither picked yet.
3. Carried forward unchanged from G.6/G.7: whether to model the docx's regional-typology prose (WAEMU HCPI, AFRISTAT, the ECOWAS HCPI guide) as corpus nodes — still not raised with Thomas directly.
4. The broader branch-scope question — does AF eventually cover the whole continent, or stop at a deliberately chosen set — is now closer at hand than it was at G.6: with the docx's entire named-country list exhausted, the *next* region choice is the first one made with no docx list to anchor it at all (WAEMU/Central Africa/Sahel have no country names in the source material). Worth Thomas's explicit input before that happens, rather than assuming the pattern of "pick a region, research every country in it" continues indefinitely.

## Cheap checks still outstanding

1. `zw-cpi-methodology-not-located` / `zw-nssa-act-not-fetched` / `zw-currency-context-unresolved` — Zimbabwe's three open threads, detailed in its slice file. The CPI methodology retry is highest-value given how thin the current node is.
2. `sz-oag-amount-discrepancy` — E240 (gov.sz, current) vs. E500 (World Bank, already reached by 2020) for Eswatini's Old Age Grant; a 2025/26-dated primary source would settle it.
3. `mw-sctp-implementation-since-2022-not-checked` — whether Malawi's committed inflation-adjustment mechanism (promised in the 2022 Strategic Plan) has actually been built in the four years since.
4. `ls-old-age-pensions-act-full-text-not-read` — only NATLEX's abstract was read; the Act's own gazetted text might carry a provision the abstract omits.
5. `zm-cpi-coicop-formula-unconfirmed` / `zm-sct-legal-instrument-not-found` / `sz-oag-legal-instrument-unnamed` / `mw-cpi-methodology-largely-unconfirmed` — smaller loose ends, one lookup each, detailed in the respective slice files.
6. Everything carried forward unchanged from G.6 and G.7 (Tanzania's EAC-naming and Zanzibar-scope questions, the ECOWAS HCPI guide, Botswana's and Namibia's own open questions) — not rechecked this session, listed in those files so as not to be silently lost.

## What to pass at the start of next thread

1. This file, plus `AF/G.7.md` for the Botswana/Namibia context and the consolidated-batch import method this session refined.
2. `Research.1.md` itself — not re-read directly this session (a direct continuation of G.7's own session, which had already read it), but a fresh session should read it directly per G.7's own recommendation.
3. Thomas's answer on which region to pick next — North Africa, the East Africa remainder, or a genuinely new kind of choice now that the docx's own country list is exhausted (see Thomas's stated priority, item 4).
4. `npm-validate-procedure` memory (now including G.7's tar-into-`archive/`-not-root fix) and this session's consolidated-batch refinement (mint several slices, then one validate pass).
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
