# AF/G.14 — Second municipal-level batch: Accra, Dakar, Addis Ababa, Kampala, Kigali, Casablanca (via Grok)

## Orientation

This is the AF branch's second municipal-level batch, and the first researched externally: Thomas ran a prepared prompt through Grok himself rather than this session spawning subagents, then brought the raw Part A/Part B output back for synthesis. Read `Research.1.md` first if this is your first AF session. The one rule that governs everything below: if no document says it, the edge does not exist.

## Session conditions

Thomas confirmed the direction after G.13 ("take the path to the municipalities") and asked for a prompt to hand to Grok. I wrote a self-contained research brief (governing rule, per-city priorities, schema, reusable node ids, explicit warnings against two mistakes made in G.13 — the invalid `"national"` jurisdiction value and unexamined assumptions about which government tier is actually "municipal") covering six cities in countries the AF branch had already researched federally: Accra (Ghana), Dakar (Senegal), Addis Ababa (Ethiopia), Kampala (Uganda), Kigali (Rwanda), Casablanca (Morocco). Thomas ran it and returned the output for this session to synthesize, validate, and import — the research itself was not done in-session this round.

## Headline result

The pattern from G.13 holds, and this batch makes it look less like a fluke: across all six cities, and across both the subagent-researched G.13 batch and this externally-researched G.14 batch, no primary document has yet tied a specific city's own property rates, tariffs, or budget to its country's national CPI series. Casablanca states its own alternative explicitly — the city's own page for its Taxe d'Habitation gives a fixed statutory revision, "révisée tous les cinq ans par une augmentation de 2%" (revised every five years by a 2% increase), not a CPI or inflation-indexed one. Kampala's KCCA is a genuinely distinct, centrally-constituted authority (not an ordinary elected council) with its own Act, its own audited financial statements, and its own listed revenue heads — real institutional documentation, but no inflation clause anywhere in it either. Only Johannesburg (G.13) has broken this pattern so far.

## Findings

### 1. Accra, Ghana — `gh-ama-composite-budget-2026`, `gh-local-governance-act-936`

Accra Metropolitan Assembly's own 2026 composite budget names Property Rate as a major internally-generated-fund line with specific figures, and Ghana's Local Governance Act, 2016 (Act 936) sets the rating framework ("a rate payable by the owner of premises... at a specified rate per Ghana Cedi on the rateable value") and the District Assemblies Common Fund, distributed "on the basis of a formula approved by Parliament." No document connects the two directly — AMA's own budget text doesn't cite Act 936 by name — so no dependency edge was drawn between them despite both being real, solid, independently-sourced primary documents.

### 2. Kampala, Uganda — `ug-kcca-act`, `ug-kcca-financial-statements-2024`, `ug-kcca-revenue-sources`

The strongest institutional documentation in this batch. KCCA's own Act vests taxation authority in its Council; its FY2023/24 financial statements were audited by Uganda's Auditor General "in accordance with Section 49 of the Public Finance Management Act" — naming a real dependency target (Uganda's PFMA) that has not yet been opened and minted in the AF branch, recorded as an open lead rather than a completed edge. KCCA's own revenue-sources page lists Property Rates, Ground Rent, Local Service Tax and Licenses with no escalation mechanism stated for any of them.

### 3. Casablanca, Morocco — `ma-casablanca-taxe-habitation`

See Headline result. The cleanest negative finding in the batch: a direct quote stating the fixed, non-CPI revision rate.

### 4. Addis Ababa, Ethiopia — `et-property-tax-proc-1365-2025`

The weakest-sourced node in this batch, kept with an explicit caveat rather than dropped. Ethiopia's Property Tax Proclamation No. 1365/2025 establishes a national urban property-tax framework (25% of market value as taxable base, 0.2–1% rate band), but it was sourced via third-party legal-summary sites rather than the official Federal Negarit Gazette, and its application to Addis Ababa specifically is a characterization rather than a verbatim quote naming the city. No primary Addis Ababa City Administration budget or finance document was found at all this round, despite the city's reported chartered, region-equivalent status — flagged as an open question rather than assumed.

### 5. Dakar, Senegal — no reports minted

A genuine, honestly-reported non-finding. Dakar's budget figures (≈88.5bn FCFA for 2026) exist only in Senegalese press coverage of council votes; no primary Ville de Dakar budget document, and no primary text of the Code Général des Collectivités Territoriales or the FDD/FECT transfer formulas, was opened. Recorded entirely as open questions and dropped edges rather than stretched into a node built on secondary reporting.

### 6. Kigali, Rwanda — no reports minted

The one place this session diverged from Grok's own draft. Grok proposed a `rw-kigali-budget-publications` node, but its own Part A evidence for that node is a list of PDF filenames on the City of Kigali's publications page — confirming the documents exist and are public, with no verbatim content from inside any of them. That clears "the document exists" but not this project's bar for a Report node (a title on an index page is not itself a primary source). Declined to mint it; recorded as an open question instead, since the underlying documents are a real, promising lead for a future session that opens them directly.

## Secondary observations

- One classification correction made to Grok's draft before import: `ug-kcca-act` was reclassified from `"municipal"` to `"federal"`. It is an Act of the Parliament of Uganda; this project's standing convention (applied consistently since G.13) is that `jurisdiction_level` follows the issuing authority, not the subject matter — the same reasoning that makes South Africa's MFMA and Ghana's own Local Governance Act `"federal"` despite governing municipalities.
- Grok's Part B correctly returned an empty `dependencies` array rather than forcing thin connections — this session reviewed Part A for anything Grok might have missed and found one legitimate addressable lead (the KCCA audit's PFMA citation) and one non-addressable one (AMA budget vs. Act 936, no citation exists), both recorded in `_dropped` rather than converted into edges neither source actually supports.
- This batch's overall evidentiary density is lower than G.13's in-session subagent batch — 2 of 6 cities (Dakar, Kigali) produced no mintable report at all, and one node (Addis Ababa's proclamation) carries an explicit secondary-sourcing caveat. This is a reasonable expected difference between a single external Grok pass and multiple dedicated subagents each working one city, not a quality problem with the prompt or the source material — worth knowing going in if more Grok-assisted batches are planned.

## Corrections to prior sessions

None. This batch does not touch or refine any finding from G.1–G.13.

## Thomas's stated priority for the remaining work

Confirmed direction: continue African cities at the municipal level. No further scope was specified beyond that — this session picked six cities in already-federally-covered countries on the same reasoning G.13 used (economic/political-hub cities most likely to have retrievable documents), without asking for confirmation of the specific list. The AF branch now has municipal-level work in 10 countries: Nigeria, Kenya, Egypt, South Africa (G.13, subagent-researched) and Ghana, Senegal, Ethiopia, Uganda, Rwanda, Morocco (G.14, Grok-researched, two of six inconclusive). Remaining federally-covered countries with no municipal-level work yet: Tanzania, Botswana, Namibia, Lesotho, Eswatini, Zambia, Malawi, Zimbabwe, Algeria, Tunisia, Libya, Côte d'Ivoire, Cameroon, Mali, Burkina Faso, Togo, Gabon, Chad — plenty of runway for a third batch, by either method.

## Cheap checks still outstanding

1. `et-proc-1365-addis-applicability-unverified` — reopen Ethiopia's Property Tax Proclamation No. 1365/2025 against the official Federal Negarit Gazette rather than third-party summaries, and separately search for Addis Ababa City Administration's own primary budget/finance documents.
2. `rw-kigali-budget-content-not-opened` — the City of Kigali's publications page names specific budget-resolution PDFs by title; a future session should open them directly.
3. `sn-dakar-cgct-and-fdd-fect-not-opened` — Senegal's Code Général des Collectivités Territoriales and the FDD/FECT transfer-formula texts, plus a primary Ville de Dakar budget document, remain unopened.
4. `ug-kcca-financial-statements-pfma-not-minted` — Uganda's Public Finance Management Act is named directly in KCCA's own audit opinion but has not been opened and minted as a corpus node.

## What to pass at the start of next thread

Point the next session at this file (`AF/G.14.md`) and `AF/G.13.md`. Ask Thomas whether to continue the municipal-level path (and by which method — in-session subagents produced denser, better-sourced results in G.13; externally-run Grok is faster but thinner, per Secondary observations above) or pivot back to the federal-level WAEMU/CEMAC queue left at the end of G.12. Do not default to a specific city list without asking, per the same caution G.13 raised.

---

## How to write the next hand-off

(Copied verbatim per branch convention.)

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
