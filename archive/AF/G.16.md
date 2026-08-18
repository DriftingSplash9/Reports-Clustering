# AF/G.16 — Ten-round test, part two: Grok synthesis + the provincial/municipal tier

## Orientation

This session continues directly from AF/G.15 (the eight-round continental/regional hub-building test). Thomas asked for "10 rounds this time," told this session to double-check recency on anything Grok-sourced, and asked four genuine questions about Africa's internal structure: whether African countries are isolated from each other or reference each other's laws, whether they have states/provinces, whether they have municipalities, and how municipalities mesh with provinces and the nation. Read `AF/G.15.md` first if picking this up cold. The one rule that governs everything below is unchanged: if no document says it, the edge does not exist.

## Session conditions

Ten rounds, as requested. Round 1 processed Grok's own follow-up research on the 11 leads G.15 left open (Thomas ran the prompt himself and pasted the results back). Rounds 2-9 pivoted to new ground: the provincial/state and municipal administrative tier, chosen specifically because it is the direct, evidence-based answer to Thomas's four questions rather than an abstract one. Round 10 was verification and hand-off — the id-collision/dependency-resolution check, palette.ts gap check, file delivery, and this document. Every draft file in both halves is DRAFT/NOT IMPORTED, same convention as G.15.

## Headline result

**Africa's provinces/regions/states are real, legally constituted, and connect to the national government through documented mechanisms — but the mechanism is different in almost every country, and the pattern does not reduce to a single model.** Eight countries were worked this round, deliberately chosen for structural variety rather than depth in any one: Ethiopia (regional states drawn along ethnic-linguistic lines, the one case in this branch where administrative tier and ethnic-nation genuinely overlap, funded by a formula-based federal subsidy), Nigeria (states funded by a share of a national oil-revenue pool, FAAC, distributed by a fixed statutory formula), Kenya (47 counties funded by a population-weighted revenue-sharing formula from the Commission on Revenue Allocation, PLUS a separate constitutional Equalisation Fund that routes extra money specifically to historically marginalised counties), DR Congo (a flat constitutional 40%-of-revenue rule, retained at the province of origin rather than routed through the capital), Morocco (12 regions funded by a VAT and corporate-tax share under a 2015 "advanced regionalization" law), Ghana (MMDAs funded by a fixed 5%-of-revenue District Assemblies Common Fund), Tanzania (not really a federation of provinces at all — a 1964 Union of two formerly separate countries, one of which, Zanzibar, keeps its own government, its own statistics office, and its own separate CPI, because statistics itself is constitutionally a "non-union matter"), and Rwanda (provinces deliberately weakened to a coordinating role in a 2006 reform, with real accountability instead running through 27 districts individually graded every year, by name, against national targets — a fundamentally different mechanism, evaluation rather than money). Nine of the eleven Grok-sourced leads from G.15 were resolved and independently spot-checked; one (SADC ratification) failed re-verification and was correctly not minted — see Corrections.

## Findings

### 1. Grok's follow-up synthesis — `af-grok-synthesis.json`

Verified and minted 9 of Grok's 11 answered items: AFRISTAT's founding treaty (21 Sept 1993, Abidjan, 14 founders, 22 members today — re-verified directly against AFRISTAT's own history page), Guinea-Bissau's and Equatorial Guinea's actual titled CPI bulletins (closing two G.15 leads), CEMAC's companion underlying-inflation regulation (named but its primary text still not independently opened — flagged honestly), Burundi/South Sudan/Somalia CPI releases wired into the EAC hub, and the African Charter on Statistics (2009) — finally mintable because Tanzania's own Statistics Act cites it by name, independently re-verified. Grok's bonus claim that SADC's Committee congratulated Botswana and Zambia for ratifying the Protocol on Statistics did NOT survive re-verification (see Corrections) and was dropped rather than minted.

### 2. Ethiopia's regional-state federalism — `et-regional-state-federalism.json`

Found Proclamation No. 1250/2021, the federal law dividing subsidy and joint revenue among regional states ("equalize the fiscal capacities of the Regional States so as to provide comparable level of public services") — the actual federal-to-region fiscal mesh, though its link to the already-minted constitution node couldn't be independently confirmed this round. Minted two regional-state fiscal-analysis documents (Amhara, Oromia — both third-party EEA/UNICEF analyses, since both regions' own bureau websites are robots-blocked), and wired Amhara's to the already-existing federal CPI node via an explicit deflator citation. Flagged that the existing corpus's own constitution node (citing the original 1995 "nine regional states") is now stale — Ethiopia has 12 as of recent restructuring — without editing that predecessor node.

### 3. Nigeria's second state — `ng-kano-state-fiscal.json`

Lagos was G.15's only Nigerian state at this tier. Kano's 2026-2028 Medium Term Expenditure Framework explicitly cites the same NBS CPI-rebasing exercise already minted for Lagos, and reports its own FAAC statutory allocation — wired both edges using the exact relationship_type pattern already established for Lagos. Rivers State's ₦1.85 trillion 2026 budget was found in the news but no primary sourced document was located; held as a lead.

### 4. Kenya's second county, plus the Equalisation Fund — `ke-turkana-equalisation.json`

Nairobi was G.15's only Kenyan county. Turkana's own Fiscal Strategy Paper cites the same PFMA 2012 s.117 basis already established for Nairobi. Separately, and more structurally interesting: the Equalisation Fund Appropriation Bill (2025) — a constitutional mechanism (Article 204) that routes KShs 16.8 billion specifically to 34 named "marginalised" counties, including Turkana by name — is the clearest documented example in this branch of a national government correcting for regional inequality rather than just splitting revenue proportionally. No document ties the two together directly, so they're minted as separate real facts, not one dependency.

### 5. DR Congo, entirely new to the branch — `cd-provinces-fiscal.json`

Closed G.15's own "DR Congo CPI — no document" gap, though only via a secondary press citation of INS's weekly "Note de Conjoncture" (INS's own site portal is confirmed live but explicitly under construction). More substantively: DRC's constitution fixes provincial revenue retention at a flat 40%, "retained at the source" — found and quoted directly (Article 175), alongside Article 2's full list of the 25 provinces plus Kinshasa. Kinshasa's own 2026 provincial budget (~US$1.111 billion) and the national Ministry of Budget's own medium-term framework were both found, but neither one's own text cites the 40% rule or the other document — an honest partial result, flagged for Grok.

### 6. Ghana — wiring two previously isolated nodes, plus the DACF — `gh-mmda-wiring.json`

A prior, separate round (`af-grok-municipal-batch2.json`) had already minted Accra's composite budget and Ghana's Local Governance Act with zero edges between them. Accra's own 2026-2029 budget cites the Act by section number directly (Section 12(3)) — closed that gap. Also minted the District Assemblies Common Fund's 2026 allocation (GHC8.77 billion, 5% of projected national revenue) and wired Accra's budget to it as a funding source.

### 7. Morocco's regional tier — `ma-regions-wiring.json`

Morocco had municipal and federal nodes but nothing regional. Found the 2015 organic law establishing all 12 of Morocco's regions and the Casablanca-Settat region's own development plan, which cites the law's Article 83 directly as the reason the plan exists at all — one of the cleanest statutory-basis citations found this session. The regions' VAT/corporate-tax revenue share is real per a secondary source but its specific article number wasn't independently confirmed.

### 8. Tanzania's Union structure — `tz-zanzibar-union.json`

The most structurally distinctive finding this round: Tanzania is not a province-based federation but a 1964 Union of two formerly separate states. Zanzibar keeps its own statistics office (OCGS) and publishes its own, entirely separate Zanzibar Consumer Price Index — confirmed directly from OCGS's own site, distinct from the mainland CPI already in the corpus. The Union's own founding instrument (Articles of Union) explains why: statistics is constitutionally a "non-union matter," reserved to Zanzibar's own government.

### 9. Rwanda's district-accountability system — `rw-imihigo-districts.json`

Rwanda's existing corpus presence was entirely federal. Found NISR's own annual "Imihigo" evaluation report, which individually scores and ranks all 27 districts by name against national targets set in the National Strategy for Transformation — a genuinely different federal-to-local mechanism from every fiscal-transfer case above: evaluation and accountability, not money movement. Framed (not minted, since not independently primary-sourced) against the general finding that Rwanda deliberately weakened its provinces in a 2006 reform specifically to avoid ethnic-regional association — the structural opposite of Ethiopia's approach in the same round.

## Secondary observations

- **Answering Thomas's own question, in one line per country worked**: Ethiopia links region-to-nation by ethnic-linguistic federalism and a subsidy formula; Nigeria and Kenya by statutory revenue-sharing formulas (plus Kenya's Equalisation Fund for disadvantaged counties specifically); DR Congo and Morocco by fixed percentage-of-revenue rules; Ghana by a fixed-percentage common fund; Tanzania by treating one region (Zanzibar) as constitutionally near-sovereign rather than subordinate; Rwanda by direct performance evaluation rather than fiscal transfer at all. Eight countries, six genuinely different mechanisms — the opposite of "one African nation is like all the others."
- **Eleven country codes now need `palette.ts` `COUNTRY_FAMILY` entries before any import**: the six from G.15 (BJ, NE, MR, CF, CG, GQ), the four added by the Grok-synthesis round (BI, SS, SO, GW), and now CD (DR Congo) from this round — confirmed via direct grep, all eleven return zero matches. This is a larger consolidated palette.ts edit than G.15 anticipated and should still be done as one pass before any import, not per-file.
- **Robots-blocked government sites remain the single biggest recurring obstacle** — Oromia's and Amhara's bureau sites, Mombasa's assembly site, Zanzibar's OCGS release PDF, DRC's INS portal all hit the same wall this round. The branch's fallback (third-party citation of the same primary data, e.g. UNICEF/EEA analyses citing a government bureau by name) worked every time it was tried, but always at a cost of one indirection.
- **No new Africa material appeared in `research-input`** this round — everything there predates this session (other branches' work, per filenames and timestamps checked directly).

## Corrections to prior sessions

None to G.1-G.15's own findings. Within this session: Grok's claim (in the pasted follow-up Thomas relayed) that SADC's Committee "congratulated the Republic of Botswana and the Republic of Zambia for having ratified" the Protocol on Statistics did not survive independent re-verification — two separate re-fetches (the English SADC.int article and a French wire-service syndication of the same event) both lack "Botswana" or "Zambia" anywhere near the ratification claim. Not minted; recorded honestly in `af-grok-synthesis.json`'s `_dropped` with the discrepancy explained. This is exactly the kind of check Thomas explicitly asked for this round ("things change fast so double check you have the recent data") and it caught a real problem.

## Thomas's stated priority for the remaining work

Thomas asked for 10 rounds and got them (1 Grok-synthesis round + 8 new-research rounds + this verification/hand-off round). No further standing priority was stated beyond the original ask. As with G.15, the natural next decision is whether to do a consolidated import pass now (palette.ts fix for all 11 codes, `index.ts` wiring for all 8 new files from this round plus G.15's 8, full validate/check/build) or keep researching — not decided by this session.

## Cheap checks still outstanding

1. `et-subsidy-proc-constitution-link-unconfirmed` — Proclamation 1250/2021 almost certainly implements a specific constitutional article (likely Article 62(7), the House of Federation's revenue-division mandate) but no verbatim citation was found this round.
2. `et-oromia-cpi-agency-unnamed` — Oromia's own expenditure-analysis document uses CPI as a deflator but does not name the publishing agency, unlike the matching Amhara document.
3. `ng-rivers-state-2026-budget-not-sourced` — ₦1.85 trillion budget, presented 10 July 2026, confirmed only via news coverage, no primary MTEF/citizens'-budget document located.
4. `ng-kano-appropriation-primary-not-located` — the signed 2026 Appropriation Bill's own text, with a FAAC/IGR revenue breakdown, was not found as a standalone document.
5. `ke-mombasa-cfsp-unreachable` — every URL tried (mombasaassembly.go.ke, KIPPRA repository) either robots-blocked or SSL-failed.
6. `ke-constitution-article204-not-quoted` — the Equalisation Fund's constitutional basis is confirmed cited but Article 204's own text was not independently fetched (KLRC's page redirected to a CAPTCHA wall).
7. `cd-article175-cbmt-link-unconfirmed` — DRC's national medium-term budget framework aggregates province-level spending but does not itself cite the 40% constitutional rule; the connection is assumed, not documented.
8. `cd-kinshasa-primary-budget-not-located` — Kinshasa's 2026 édit budgétaire is known only through press coverage, not its own primary text.
9. `cd-ins-primary-cpi-not-located` — DRC's INS statistics portal (insrdc.cd) is confirmed live but explicitly under construction; no primary CPI PDF was reachable.
10. `gh-constitution-article252-not-quoted` — the DACF's constitutional basis (commonly cited as Article 252) was referenced by a secondary source but not independently quoted from Ghana's constitution.
11. `ma-organic-law-vat-article-unconfirmed` — Morocco's regions receive a VAT and corporate-tax share per a secondary source, but the organic law's own specific article number for this was not found.
12. `ma-organic-law-date-discrepancy` — one source dates the organic law "fin janvier 2015," another "7 juillet 2015"; not resolved this round.
13. `tz-zanzibar-cpi-methodology-not-opened` — Zanzibar's own dated CPI release (OCGS) is robots-blocked; whether it cites the mainland Statistics Act, or is methodologically fully independent, is unconfirmed (the constitutional structure suggests independence but this is inference, not a documented finding).
14. `rw-2006-reform-not-primary-sourced` — Rwanda's province-weakening reform is described only via secondary sources (Wikipedia); no primary Rwandan legal text was fetched this round.

## What to pass at next thread

Point the next session at this file (`AF/G.16.md`). Sixteen draft files now sit in `src/data/research/` unimported across G.15 and G.16 combined. First job before any import: the consolidated `palette.ts` edit for all eleven country codes (BJ, NE, MR, CF, CG, GQ, BI, SS, SO, GW, CD), then wiring all 16 files into `index.ts`, then the full tar-to-sandbox validate/check/build pass. A companion Grok follow-up prompt for this round's 14 open leads has been prepared separately (`grok-followup-africa-provincial-tier.md`).

---

## How to write the next hand-off

(Copied verbatim per branch convention.)

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
