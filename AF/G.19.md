# AF/G.19 — Municipal-tier population-priority push, rounds 11-20 of 20 (push complete)

## Orientation

Continuation of AF/G.18, which completed rounds 1-10 and stopped at the required midpoint to ask Thomas where Grok's follow-up results were saved. Thomas replied directly in-chat with Grok's full 16-item response ("Carry on mate, sorry it wasn't in the file, I was away from my pc while you were grinding"), which was processed in full before this session's rounds began (14 of 16 items confirmed-consistent with existing corpus content, including 2 that additionally confirmed genuine DNS-level access failures rather than just this branch's own tooling issues; 2 were genuinely actionable and independently re-verified via direct Bash curl/pdfplumber extraction — never trusting Grok's quotes at face value — then minted as new nodes/edges in `af-ethiopia-chartered-cities.json`). Thomas then explicitly authorized continuing straight through to round 20 without a further pause. This hand-off covers Wave C (rounds 11-15, Côte d'Ivoire/Cameroon/Niger/Mali/Burkina Faso — the remainder of the original top-20-by-population list) and Wave D (rounds 16-20, Malawi/Zambia/Chad/Senegal/Zimbabwe — the first five countries beyond rank 20, selected by re-verified current population figures, skipping Somalia/South Sudan/Burundi which had already received provincial/national-tier deepening in AF/G.17).

## Session conditions

Same evidence-strict standing rule as every prior session: verbatim quote + exact URL from a primary, government/agency-authored document for every claim; NOT FOUND is a legitimate, valuable outcome, recorded honestly in `_dropped` rather than left unmentioned. All 10 countries this round were researched via parallel Agent-tool dispatch (5 agents per wave, 2 waves), each agent given a self-contained brief following the reusable `AF-municipal-tier-protocol.md` written at the end of AF/G.18. Synthesis for each country was done by reading the agent's full raw findings report (not a summary) and checking the existing corpus for node-ID conflicts before minting.

## Headline result

All 20 rounds of the population-priority municipal-tier push are now complete. 10 new corpus files this session (5 Wave C, 5 Wave D) plus one small description-update to an existing node, covering 10 more countries; combined with AF/G.18's 9 files, the full push covers 20 African countries with genuine municipal/commune/devolution-tier research. All files validated clean (`npm run validate`/`npm run build`, 174 slices, 0 unwired, only the 2 known pre-existing Rwanda/Uganda notes remain — unrelated, out of scope) and pushed to the device. The single most consequential cross-cutting finding this round: the "higher tier of government reporting on named lower-tier units" document type (first identified in AF/G.18 for Nigeria) turned out to be a repeatable, near-universal pattern — a national Auditor-General, Cour des Comptes, or Chambre des Comptes report naming individual cities/communes/councils with real figures was found in 7 of this round's 10 countries (Côte d'Ivoire's Trésor Public, Chad's Chambre des Comptes, Malawi's National Audit Office, Zambia's parliamentary audit committee, Senegal's Cour des Comptes ×4 communes, Zimbabwe's Auditor-General), regardless of each country's population rank or region — this is now the single most reliable municipal-tier document type in this branch, more reliable than searching from the lower tier's own web presence.

## Findings

### 11. Côte d'Ivoire (round 11, `af-cote-divoire-commune-finance.json`)

Trésor Public's own annual accounting report gives real per-commune revenue/investment figures for named Abidjan communes (Cocody, Plateau, Marcory, Treichville, Abobo, Yopougon) — the state reporting ON communes, since none of those communes' own sites publish a downloadable budget document. The genuinely non-obvious finding: DGBF's own annual budget-law Annexe 8 states that Abidjan's 10 main communes are explicitly EXCLUDED from the state's Dotation Globale de Fonctionnement precisely because their tax-retrocession quotes-parts already exceed it — the wealthiest communes get less direct state dotation, not more. The exact term "Fonds de Péréquation" does not appear anywhere in Ivorian primary law found; the functional equivalent is DGF/DGD terminology plus an annual interministerial "péréquation" arrêté.

### 12. Cameroon (round 12, `af-cameroon-communes-feicom.json`)

The 2019 general decentralization code (CGCTD), read in full (501 articles, verified by grep), mandates a legally-required INTRA-CITY transfer from a Communauté Urbaine down to its constituent communes d'arrondissement, indexed on the CU's own receipts (Art. 395-396) — a third documented instance of a two-tier urban transfer mechanism inside a single city, after Antananarivo and DRC's ETD cascade. Confirmed FEICOM (the national intercommunal fund) is entirely absent from the CGCTD's text — it predates it by 45 years and operates under its own separate 1974/2018 décret lineage; FEICOM's own site instead cites the DGD mechanism the CGCTD creates as what it disburses.

### 13. Niger (round 13, `af-niger-national-deepen.json`)

The first round this push where the fallback-to-national-tier rule was genuinely FORCED rather than optional: Niamey's own municipal portal confirms it is currently run by a CNSP-appointed Administrateur Délégué (not an elected mayor) post-coup, and publishes zero fiscal documents. Deepened the national tier instead: the CGCT ordonnance's commune fiscal articles, a WAEMU financial-regime directive Niger's own MOF republishes, and — in Niger's Ministry of Finance's own voice — the 28 January 2024 CEDEAO/ECOWAS withdrawal decision and the 6 July 2024 Niamey AES Confederation Treaty summit.

### 14. Mali (round 14, `af-mali-communes-national.json`)

A new pattern for this branch: Mali's CURRENT collectivités code (Loi n°2023-004, 2023) is textually LESS specific on fiscal transfers than the code it replaced. The abrogated 2017 code named FNACT by acronym and set a hard 30%-minimum transfer floor (Art. 28-29); the 2023 code drops both, leaving transfer amounts to unquantified "dotations et subventions spéciales." A regression in statutory specificity — the mirror image of "enabling law without operative practice" (AF/G.18's Angola/Mozambique pattern): here the practice/institution (ANICT/FNACT) still operates, per ANICT's own site, but the CURRENT law no longer names or quantifies it.

### 15. Burkina Faso (round 15, `af-burkina-faso-national-deepen.json`)

A second consecutive Sahel country with a forced national-tier fallback: Ouagadougou's own municipal site was entirely unreachable (TLS resets), and Bobo-Dioulasso's own "Publication de budget" page is a genuine page-shell — live, dated, and dedicated to budget publication, but containing zero actual figures. A brand-new collectivités code was confirmed adopted by the transitional legislature on 30 December 2025, replacing the 2004 code. Also made a small, targeted UPDATE to the existing `bf-insd-ihpc` node, reconfirming its own current (base-2023) methodology text still doesn't name COICOP/AFRISTAT/IMF-ILO Manual in prose.

### 16. Malawi (round 16, `af-malawi-municipal.json`)

The first of five countries beyond the original top-20 list, and a genuinely rich one: the National Audit Office publishes a continuous named-council audit series running from FY2009-2010 through FY2024-2025, and Lilongwe City Council's own site publishes real financial reports with a clean central-transfer-vs-own-revenue breakdown (MWK7.378bn vs MWK9.387bn). The National Local Government Finance Committee's own consolidated budget document states city councils contribute 75% of the national local-revenue budget — but that document is only reachable via an unstable staging-mirror domain, not NLGFC's own canonical site (which 404s on the identical path).

### 17. Zambia (round 17, `af-zambia-municipal.json`)

A correction to a common assumption entering the round: Zambia's Local Government Equalisation Fund is NOT fixed at 5% of national revenue by the Constitution — it is discretionary annual parliamentary appropriation (Art. 163), with only its capital-expenditure USE (20%) fixed by statute. A national parliamentary committee report produced the richest single quantitative finding of the round: named, itemized figures for Kitwe, Ndola, and Lusaka City Councils, including Lusaka's uncollected property rates (K150,684,093 from 63,049 properties with a combined ratable value of K75.39 billion). A systemic TLS-misconfiguration pattern was found across at least 6 Zambian district/municipal government domains (expired or missing-intermediate-certificate), blocking access to real, specifically-titled financial-statement documents that plainly exist per search indexing.

### 18. Chad (round 18, `af-chad-commune-finance.json`)

Researched directly despite significant political instability rather than assuming either a functioning or collapsed system. A brand-new commune-fiscal organic law (30/31 July 2024) was independently verified across two hostings. The Chambre des Comptes' own exercice-2022 execution report names N'Djaména's Mairie and each of its 10 arrondissements individually with real Treasury account figures. The clearest single "collapse of structure" data point this round: a named government official's own seminar presentation confirms Chad has NO FEICOM/ANICT-equivalent equalization fund yet — one is explicitly framed as a future proposal, not an existing institution, even though the enabling law for commune fiscal autonomy is brand new. Chad's own Ministry of Finance website is confirmed suspended at the hosting level (OVHcloud), a notable finding about state web infrastructure in its own right.

### 19. Senegal (round 19, `af-senegal-commune-finance.json`)

Acte 3 de la décentralisation's own two named transfer funds, both with exact statutory percentages: the FDD (Fonds de Dotation de la Décentralisation, 3.5% of VAT, Art. 324) and the FECL (Fonds d'Équipement des Collectivités locales, 2% of VAT, Art. 328). ADM's own operational manual for the fund candidly documents its own weakness: "le FECL alloué annuellement représente 1% des recettes fiscales de l'Etat...seul 1/3 du FECL est mis à la disposition directe des CL." Senegal's Cour des Comptes publishes the same named-commune audit-report pattern found this round in Malawi/Zambia/Zimbabwe — confirmed for at least 4 separate communes (Médina, Saly Portudal, Gorée, Sédhiou), 2 with full multi-year revenue tables independently extracted.

### 20. Zimbabwe (round 20, `af-zimbabwe-devolution-municipal.json` — final country of the push)

The constitutional devolution mandate (Section 301(3), "not less than five per cent of the national revenues") is directly and currently operationalized: the FY2026 Budget Statement sets aside ZiG14.4 billion for devolution, explicitly citing "sections 264 and 301 of the Constitution." The Auditor-General's own local-authority report series produced the round's sharpest finding: Mutoko Rural District Council spent ZWL$1.25 million in devolution funds on prohibited recurrent expenditure (salaries), a named-council figure directly tied to a specific circular violation. Bulawayo City Council's audited financial statements were confirmed prepared "with reference to the Urban Councils Act" — closing the loop between the organic law and actual practice.

## Secondary observations

- **The "higher tier reporting on named lower-tier units" pattern, first identified for one country (Nigeria) in AF/G.18, is now confirmed as this branch's single most reliable municipal-tier document type overall** — found in 7 of this round's 10 countries, spanning West Africa (Côte d'Ivoire, Senegal), Central Africa (Chad), and Southern Africa (Malawi, Zambia, Zimbabwe), via entirely different institution names (Trésor Public, Chambre des Comptes, National Audit Office, Cour des Comptes, Auditor-General) — this is now a standing first-angle search priority for any future municipal-tier round, not a secondary fallback.
- **A new, distinct pattern from AF/G.18's "enabling law without operative practice": statutory REGRESSION.** Mali's current 2023 collectivités code is textually less specific on fiscal transfers (no named fund, no percentage floor) than the 2017 code it explicitly repealed — a country can legislate BACKWARD on transparency/specificity even while the underlying institution (ANICT) keeps operating under older sub-statutory instruments. Worth watching for elsewhere.
- **A systemic, hosting-infrastructure-level access-failure pattern was found concentrated at the sub-national tier specifically, distinct from national-government sites**: Zambian district/municipal domains (TLS chain failures across at least 6 sites, while national-level domains worked fine), Chad's Ministry of Finance (entirely suspended at the hosting provider level), and multiple individual city-council sites across several countries. This is itself a data point about sub-national digital-governance capacity, not just a research inconvenience — worth stating plainly rather than only logging as individual dropped notes.
- **The "collapse of structure" pattern held for the Sahel specifically but not for the push as a whole.** Niger and Burkina Faso (both post-coup, both forced into the national-tier fallback) genuinely support Thomas's original framing. But Malawi, Zambia, Senegal, and Zimbabwe — all ranked BELOW the original top-20 cutoff — produced some of the richest municipal-tier documentation of the entire 20-round push, confirming AF/G.18's own correction (institutional design predicts richness better than population rank) held all the way to round 20.

## Corrections to prior sessions

No corrections to G.1-G.18's own findings were identified this round. One correction was made within this session's own work before it reached the corpus: the original research brief for Zambia assumed the Local Government Equalisation Fund was fixed at 5% of national revenue by the Constitution; direct verification of Article 163's actual text found this is false (it is discretionary annual appropriation) — caught and corrected before minting, not after, and stated plainly in `af-zambia-municipal.json`'s own `_meta` field.

## Thomas's stated priority for the remaining work

Thomas's original instruction was to run 20 search rounds, working down by population with a fallback to provincial/national deepening for thin countries, prompt Grok at the midpoint, then pause for a question before continuing. That full cycle is now complete: 20 rounds run, Grok's midpoint results processed, and Thomas's explicit "Carry on mate" authorization to finish through round 20 has been fulfilled. No further instruction is currently on file for what comes after round 20 — this is the natural checkpoint to ask Thomas whether to continue further down the population list (round 21+), start a second Grok follow-up pass on THIS round's open items, or shift focus elsewhere.

## Cheap checks still outstanding

1. `ci-loi-2020-885-not-retrieved` — Côte d'Ivoire's current governing fiscal-regime law (cited by title/date in a primary DGBF document) has never had its own full text independently retrieved, across two failed hosting attempts.
2. `ci-arrete-0772-2022-not-retrieved` — the interministerial arrêté governing Abidjan's tax-retrocession quotes-parts is named but not itself opened.
3. `cm-feicom-arrete-modalites-not-found` — the ministerial arrêté implementing the CGCTD's Art. 396 CU→CA transfer indexation was not located.
4. `ne-2026-budget-ordonnance-gated` — Niger's FY2026 budget ordonnance and its DPBEP 2024-2026 are both confirmed to exist and be current but sit behind a Joomla/Phocadownload license-agreement wall that blocked all automated retrieval attempts.
5. `ml-koulouba-cedeao-exit-unreachable` — the single most promising Mali document specifically discussing the ECOWAS/CEDEAO exit itself (as opposed to only the AES Confederation ratification) failed to load twice; worth a retry with different tooling.
6. `bf-loi-055-2004-not-retrieved` — the immediate predecessor to Burkina Faso's brand-new December 2025 code has never had its own full text independently retrieved, only cited by title elsewhere.
7. `bf-2026-budget-law-unocr-d` — Burkina Faso's FY2026 Journal Officiel budget law is a 15.9MB scanned, non-OCR'd document; substantive collectivité/commune/FPDCT content is unconfirmed either way.
8. `mw-nlgfc-canonical-domain-unstable` — Malawi's NLGFC consolidated budget document is only reachable via a staging-mirror domain; the canonical www.nlgfc.gov.mw path 404s on the identical content.
9. `zm-council-sites-tls-broken` — at least 6 Zambian district/municipal government domains share a TLS-chain misconfiguration blocking access to real, specifically-titled financial documents.
10. `td-villedendjamena-unreachable` — N'Djamena's own city-government site failed via every access method attempted (timeout, connection reset, 502, 503).
11. `td-finances-gouv-suspended` — Chad's Ministry of Finance site is suspended at the hosting-provider level (OVHcloud), not merely blocked to this session.
12. `sn-touba-pacasen-figure-encoding-blocked` — a promising ADM article naming Touba's cumulative PACASEN investment figure failed only due to Unicode characters in its URL triggering a proxy rejection; likely recoverable with URL re-encoding.
13. `sn-cgcl-gore-sedhiou-tables-not-extracted` — two further Cour des Comptes named-commune reports (Gorée, Sédhiou) are confirmed to exist with the same institutional pattern but their revenue tables were not pulled this round.
14. `zw-devolution-per-council-breakdown-gated` — Zimbabwe's Treasury Estimates of Expenditure document sits behind a Cloudflare JS challenge; a possible per-province/per-council devolution breakdown annex beyond the aggregate figure was not confirmed either way.
15. `zw-harare-budget-ai-summarized-only` — City of Harare's own 2023 consolidated budget and 2026 tariff notice were both retrieved only via AI-summarization, not independently re-verified against raw PDF text.

## What to pass at next thread

The 20-round population-priority municipal-tier push (AF/G.18 + AF/G.19) is complete. Point the next session at this file. 15 new corpus files across the two hand-offs (9 in G.18, 10 in G.19 counting the small bf-insd-ihpc update as part of round 15), all validated clean and pushed to the device. No further municipal-tier rounds are currently authorized — the natural next step is to ask Thomas whether to (a) continue down the population list past round 20, (b) run a second Grok follow-up prompt covering this round's 15 open items above, or (c) redirect research effort elsewhere. `AF-municipal-tier-protocol.md` (written at the end of G.18) remains the reusable per-country dispatch template for any future municipal-tier work.

---

## How to write the next hand-off

(Copied verbatim per branch convention.)

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
