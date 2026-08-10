# G.10.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §§1-7, same as every prior AF session. `AF/G.9.md` is this file's immediate predecessor, delivered as this session's opening context (pasted back by Thomas), not independently re-fetched.
Predecessor: G.9.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered, not EU's lettered A-G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. **North Africa is now closed, and it is one country larger than every prior session expected.** Algeria, Morocco and Tunisia were the three countries G.7/G.8/G.9 had consistently offered by name; Libya was consistently carried forward as "likely too thin/unstable to source" without ever actually being attempted. This session retested that assumption rather than repeating it, and it did not hold — Libya has a functioning, IMF-corroborated monthly CPI relaunched on a new 2024 base. All four countries are researched, validated and imported this session.
4. `AFR` is now staffed with twenty countries: `ZA`, `EG`, `KE`, `ET`, `GH`, `NG`, `TZ`, `BW`, `NA`, `LS`, `SZ`, `ZM`, `MW`, `ZW`, `UG`, `RW`, `DZ`, `MA`, `TN`, `LY` — 604 reports / 679 dependencies as of this session's validator run, up from 585/669 at G.9.
5. Import discipline held for a fifth consecutive session: all four new slices were researched in parallel (one subagent per country, plus a fifth subagent specifically retesting Libya's viability), validated (`npm run validate`/`check`/`build`, tar+cloud-sandbox procedure, one consolidated pass for all four countries) and imported (`index.ts` + `palette.ts` updated, all files written back to the device) in the same sitting. Nothing is currently sitting un-imported in `src/data/research/` for this branch.
6. **What is actually left**: every regional grouping any prior AF session named by country is now researched. The only concretely-scoped material remaining is the docx's own bloc-level prose with no country names attached — WAEMU (Francophone West Africa's monetary/statistical union), AFRISTAT, the ECOWAS HCPI guide, and the docx's undifferentiated "Central Africa & Sahel" language. This is a genuinely different research shape: institutions and blocs rather than a country's own CPI/social-protection pair. See Thomas's stated priority, item 1.

## Session conditions — read this first

Opened directly from Thomas's "lets check out north afrikan nations" instruction, following the fork the G.9 hand-off had flagged (North Africa vs. a genuinely new kind of choice). Four subagents ran in parallel — one per country (Algeria, Morocco, Tunisia, Libya) — each briefed with the branch's full Research.1.md discipline and the exact set of reusable node ids already in the corpus. Algeria's, Morocco's and Tunisia's official statistics and legal documents are substantially in French; agents were instructed to read and quote French-language primary sources directly (with English translations alongside), not to rely on English-only secondary summaries, and did so throughout.

The Libya agent's brief was deliberately different in kind from the other three: rather than assuming G.7's "too thin/unstable" framing and asking it to find what it could, it was asked to test that assumption directly and report either genuine primary material or a clear, specific account of what it searched for and could not find. This matters because the branch's own project memory already carries a lesson about exactly this failure mode (`dropped-sweep-third-category`, cited in `Research.1.md` §4 as "wrongly dropped in the first place, on too narrow a search") — a stated reason for exclusion can read as sound until someone actually reopens the search. Libya is now that lesson's clearest instance in this branch: the "too thin" characterization was carried forward unchanged across G.7, G.8 and G.9 without ever being tested, and a direct search this session found a functioning CPI programme that the IMF itself rates "broadly adequate."

All four countries' Part A quote records were independently reviewed and minted into DRAFT JSON by this session before import, the same verification discipline used since G.9 and since Grok-assisted rounds began (`[[feedback_grok-as-verification]]`). One access-limitation pattern repeated across three of the four countries and is worth flagging as a class rather than four separate footnotes: Algeria's CNR/pension-ministry sites, Morocco's ANSS Arabic-only scanned PDF, and an AfDB Tunisia evaluation all blocked or frustrated direct primary access this session (connection resets, no OCR available, Cloudflare bot-checks) — each documented as a genuine gap in the relevant slice's `_open_questions` rather than silently worked around with a weaker secondary source standing in as if it were primary.

## Headline result

**Three of North Africa's four CPI programmes explicitly reject or ignore COICOP 2018, and the fourth — Libya — was wrongly written off for three consecutive sessions before anyone actually checked.** Algeria's own CPI bulletins, read across three editions spanning 2013 to 2026, all classify goods and services "conformément à la classification conseillée par les Nations Unies dans le système de comptabilité nationale de 1970" — a 1970-vintage UN classification, not COICOP 2018 and not even the 2008 SNA, even though the IMF confirms Algeria's *national accounts* (a separate ONS product) were rebased to the 2008 SNA in December 2023. Tunisia's own methodology brief names "COICOP" but with a 12-division structure matching the pre-2018 vintage, no version stated. Morocco is the partial exception — it names COICOP (again without a version) but is the only country in the batch whose own CPI document names an IMF manual directly ("conformément au manuel du FMI," for missing-price imputation) and states its release calendar follows the SDDS explicitly. And Libya, the country three prior sessions agreed was not worth attempting, turns out to have relaunched its CPI on a new 2024 base with direct IMF technical-assistance support, rated "broadly adequate" by the IMF's own Data Adequacy Assessment even as Libya's national accounts, government finance, external-sector and inter-sectoral-consistency data are all rated inadequate.

## Findings

### 1. Algeria's CPI is methodologically stranded — its national accounts modernized, its CPI did not

`dz-ons-ipc-monthly`, VERIFIED DIRECTLY across the May 2026, 2016 and 2012 editions of ONS's own bulletin, all carrying identical classification language: "conformément à la classification conseillée par les Nations Unies dans le système de comptabilité nationale de 1970." Weights trace to a single household survey from year 2000, unchanged for a quarter-century — confirmed independently by the IMF's own 2025 Article IV report: "CPI weights are based on a 2000 household survey and severely outdated, which could lead to errors in the measurement of inflation." The same IMF report draws a sharp contrast that a session reading only the CPI documents would miss: "national accounts have been rebased in December 2023 with 2001 as a base year, and now follow the 2008 SNA recommendations" — it is Algeria's national accounts, not its CPI, that modernized. On social protection: CNR pension revaluations (most recently confirmed for 2026, via the CNR Director-General's own public statement) are explicitly framed as "instructions du président de la République... conformément aux dispositions de l'article 43 de la loi 83-12 relative à l'actualisation des salaires" — a wage-base-updating mechanism activated by presidential/ministerial decision, not a price-indexation formula. A named CASNOS official, quoted on the record by a Chatham House research paper, states a comparable benefit (health-insurance reimbursement tariffs) "has not been updated for almost 40 years" and explicitly names "the rate of inflation experienced by the country during this long period" as the cause of erosion — the clearest denial in this batch, and structurally identical to Malawi's and Eswatini's own admissions earlier in the branch.

### 2. Morocco is the batch's one country whose own CPI document names an international standard directly

`ma-hcp-ipc`, VERIFIED DIRECTLY via HCP's own methodological note: "la méthode d'imputation est appliquée conformément au manuel du FMI" for missing-price handling, and "conformément au calendrier établi selon les normes spéciales de diffusion des données (NSDD)" for its release schedule — the French name for the SDDS, independently corroborated by the IMF's own 2022 Morocco SDDS Annual Observance Report, which lists "Price index: Consumer prices" as an SDDS-monitored monthly category. COICOP is named as the classification system but with no version stated. On social protection, two real, statutory, non-CPI mechanisms were found and are worth reading together: the CMR's civil-service pension statute (Loi 011-71, Art. 44 bis) automatically ties pension increases to the civil-service base-salary scale ("sont majorées" — mandatory language), while the CNSS's founding statute (Dahir 1-72-184, Art. 68) ties discretionary revaluation to a wage-level gap ("peuvent être revalorisées" — permissive language). The 2021 social-protection framework law (Loi-cadre 09-21), read in full across all 19 articles, uses the phrase "soutenir le pouvoir d'achat des familles" twice but specifies no formula, trigger, or review cycle anywhere.

### 3. Tunisia confirms the same non-CPI pension pattern twice over, and its cash-transfer programme shows no formula of any kind

`tn-ins-cpi`, VERIFIED DIRECTLY: base 2015=100, a two-stage Jevons/Laspeyres formula, COICOP named without a version and structured on the pre-2018 layout. Confirmed on the IMF's SDDS tier directly from the IMF's own 2024 Annual Observance Report — "Tunisia subscribed to the SDDS on June 20, 2001" — with a documented, quoted timeliness lapse in practice during 2024, attributed to a December 2024 SDMX platform migration. On pensions: CNRPS (public) automatically re-adjusts to the retiree's civil-service pay grade (Loi 85-12, Art. 37, "péréquation"); CNSS (private) automatically revalues at every SMIG increase (Décret 74-499, Art. 53) — both corroborated independently by the ISSA and SSA country profiles' identical wording, "Not legally mandated. Indexed based on changes in the legal minimum wage." PNAFN, Tunisia's flagship cash-transfer programme, shows a third and starker shape: no formula of any kind, CPI-based or otherwise, was found anywhere — an Economic Research Forum working paper documents a bare series of discrete ad hoc increases (TND 7.7 in 1987 to TND 180 in 2020) compared only to the minimum wage, never to inflation.

### 4. Libya was wrongly written off, and the correction is worth stating plainly

`ly-bsc-cpi`, VERIFIED DIRECTLY via the Bureau of Statistics and Census's own online archive, showing an unbroken monthly CPI run from December 2024 to June 2026 on a new "Base Year 2024." `ly-imf-art4-2025` (IMF Country Report 25/148), VERIFIED DIRECTLY: "The Bureau of Statistics and Census (BSC) has recently introduced a new CPI — based on the new household spending survey — that covers the entire country," with the IMF's own Data Adequacy Assessment rating Libya's "Prices" domain "B" ("broadly adequate for surveillance") while National Accounts, Government Finance Statistics, External Sector Statistics and Inter-sectoral Consistency are all rated "D." The relaunch traces to direct IMF METAC technical assistance — a January 2022 roadmap mission through a January 2025 "Consumer Price Index Development" mission. One genuine trap avoided here: BSC's own homepage widget still displays a stale December 2023 figure on the superseded 2008 base, which is exactly the outdated, Tripoli-only series the IMF report criticizes — the live series sits in the site's archive, not the front page, and a session that stopped at the homepage would have reproduced G.7's "too thin" conclusion by accident. On social protection: Libya's Basic Pension Benefit is a flat, minimum-wage-pegged transfer (450 LYD, per a 2022 World Bank policy brief), with the ISSA country profile stating plainly "Not legally mandated. Indexed based on changes in civil servant salaries" — a real mechanism, and explicitly not CPI-linked, the same shape as every other pension system in this batch.

## Secondary observations (logged, low priority)

* Three of the four countries hit a genuine access-limitation pattern this session, worth naming as a class: Algeria's CNR (dz.cnr.dz) and pension-ministry (dgfp.gov.dz) sites refused/reset connections; Morocco's ASD statute (Loi 58-23) exists on its own implementing agency's site only as a non-OCR'd Arabic scan; an AfDB evaluation of Tunisia's social-assistance system returned a Cloudflare bot-check page on two attempts. None was smoothed over with a weaker secondary source standing in as primary — each is logged as an explicit gap in the relevant slice's `_open_questions`.
* Libya's DSBB (dsbb.imf.org) status could not be confirmed by any method tried this session (the site is a JavaScript-rendered SPA that returns only navigation shell to non-browser fetchers, and Wayback Machine snapshots could not be reached either) — Libya is the one country in this batch, and one of very few in the whole branch, with no confirmed SDDS/e-GDDS tier.
* A citation discrepancy is flagged rather than silently resolved in Morocco's slice: a trade-association news article attributes a 2020 CNSS pension decree to "l'article 9" of Dahir 1-72-184, but Article 9 as read this session governs the fund's conseil d'administration, not pensions — the substantively relevant provision is Article 68.

## Corrections to prior sessions

1. **`AF/G.7.md`'s framing of Libya as "likely too thin/unstable to source" is refuted, not confirmed.** G.7 named this as a reason to expect difficulty without testing it; G.8 and G.9 both carried the framing forward unchanged in their own "what's left" sections. This session tested it directly and found a functioning, IMF-corroborated monthly CPI relaunched in December 2024. The framing was reasonable to *raise* given Libya's divided government and general statistical weakness — but it should have been tested before being repeated three times. No prior session's actual research is wrong (none had attempted Libya), but the assumption that stood in for research across three hand-offs did not hold.

## Thomas's stated priority for the remaining work

1. **Every country-named regional grouping any prior AF session has offered is now researched.** All seven original docx countries (G.1-G.6), all eight Southern Africa countries (G.7-G.8), both East Africa remainder countries (G.9), and all four North Africa countries including Libya (this session) are researched and imported. What remains is qualitatively different: the docx's own bloc-level prose — WAEMU, AFRISTAT, the ECOWAS HCPI guide, and the undifferentiated "Central Africa & Sahel" language — names no individual countries at all, so the next step is not "pick a country" but "decide whether and how to research a regional institution directly." Carried forward from G.6-G.9, now the only concretely-scoped option left.
2. **The broader branch-scope question, carried forward from G.6-G.9**: does AF eventually cover the whole continent (implying the WAEMU/AFRISTAT/Central-Africa-Sahel material needs its own research approach, since it has no country list to anchor it), or was the docx's own country list always meant to be the branch's actual scope, now complete? This is no longer an approaching question — every other concretely-scoped option is exhausted, and it's the only decision point left before the branch either opens a genuinely new kind of research (institutions rather than countries) or is treated as substantially done.

## Cheap checks still outstanding

1. `ly-sdds-egdds-status-unconfirmed` — Libya's IMF dissemination tier could not be confirmed by any method tried this session; the DSBB's JavaScript rendering blocked every fetch attempt. Highest-value single lookup from this session, the same shape as prior sessions' "highest-value" flags.
2. `ma-asd-primary-text-inaccessible` — Loi n° 58-23 (Morocco's Aide Sociale Directe) exists only as a non-OCR'd Arabic scan; a session with OCR tooling or a French-language secondary legal database could resolve this.
3. `tn-afdb-social-assistance-evaluation-inaccessible` — an AfDB evaluation specifically about Tunisia's social-assistance system performance, blocked by Cloudflare both attempts; its title suggests direct relevance to PNAFN benefit adequacy.
4. `dz-snmg-cpi-claim-unresolved` — a secondary source's claim that Algeria's minimum wage (SNMG) is set partly by reference to the CPI could not be corroborated against the primary decree text; worth checking Loi 90-11 Article 87 and the 2015 finance law directly.
5. `ly-civil-service-salary-schedule-not-located` / `ly-cpi-weight-survey-not-named-by-cpi-itself` / `ly-april-2026-article-iv-not-read` — smaller Libya loose ends, one lookup each, detailed in `ly-cpi-social-protection.json`'s own `_open_questions`.
6. Everything carried forward unchanged from G.6-G.9 (Tanzania's EAC-naming and Zanzibar-scope questions, Eswatini's Old Age Grant amount discrepancy, Malawi's SCTP implementation check, Uganda's Public Service Pension Fund Act text, Rwanda's post-June-2026 COICOP completion check, and the smaller loose ends listed in each country's own `_open_questions`) — not rechecked this session, listed in those files so as not to be silently lost.

## What to pass at the start of next thread

1. This file, plus `AF/G.9.md` for the East Africa context and `AF/G.7.md` for the original Libya framing this session corrected.
2. `Research.1.md` itself — read directly by this session's own four subagents (fresh, no prior context each), not re-read by the coordinating session, which inherited G.9's full text directly from Thomas's own message. A fresh session should still read it directly per standing recommendation.
3. Thomas's answer on the branch-scope question (Thomas's stated priority, item 2) — this is now the single decision point blocking further concretely-scoped work.
4. `npm-validate-procedure` memory, including the tar-into-`archive/`-not-root fix — used again this session for a four-country batch (including `index.html` in the tar this time, since a prior session's omission caused a `vite build` failure that `npm run validate`/`check` alone didn't catch).
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
