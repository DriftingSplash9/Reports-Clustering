# AF/G.12 — Burkina Faso, Togo, Gabon, Chad

## Orientation

This is the second WAEMU/CEMAC batch of the AF (Africa) research branch, run the same day as G.11. G.11 covered Senegal, Côte d'Ivoire, Mali (WAEMU) and Cameroon (CEMAC); this session covers Burkina Faso, Togo (WAEMU) and Gabon, Chad (CEMAC). CEMAC's corpus representation is now three of six member states (Cameroon, Gabon, Chad); WAEMU's is five of eight (Senegal, Côte d'Ivoire, Mali, Burkina Faso, Togo).

Read `Research.1.md` first if this is your first AF session. The one rule that governs everything below: if no document says it, the edge does not exist. Everything here is extraction against a verbatim quote, not inference.

## Session conditions

This batch continues under the same authorization as G.11 — Thomas's "yes, keep digging ;)" confirmed the branch-scope reading established there (country-level research into WAEMU/CEMAC/Sahel countries the source docx had only described in undifferentiated bloc-level prose). No new scope decision was made this session; this is straightforward continuation of the G.11 plan (the second half of the WAEMU/CEMAC push, having done four countries in G.11 and four more here).

## Headline result

**The standing base-2023 UEMOA regulation question is resolved.** G.11 left this open across three countries (Senegal, Côte d'Ivoire, Mali all named or gestured at a base-2023 WAEMU CPI regulation without any of them citing it by number or quoting it directly). This session's Togo research resolved it: UEMOA's own official gazette, *Bulletin Officiel de l'Union N°123* (4e trimestre 2024), obtained and OCR'd directly from the scanned original, contains the full text of **Règlement N°05/2024/CM/UEMOA du 20 décembre 2024**, adopted at Bamako, effective 1 January 2025, formally adopting the base-2023 IHPC methodological guide and abrogating both the base-2014 regulation (Règlement n°03/2017/CM/UEMOA) and the underlying inflation-calculation regulation (Règlement n°08/2006/CM/UEMOA). Independently corroborated by BCEAO's own 20 December 2024 communiqué and by a UEMOA Commission official quoted in Niger's press. Minted as `uemoa-reg-2024-base2023`.

Notably, Togo's own INSEED does not itself cite this regulation by number, even in its most recent (June 2026) bulletin — the resolving document had to come from UEMOA's own gazette, not from the member state. This exact pattern (national statistics office silent on the instrument's number; the regional body's own publication is what actually names it) now holds for Burkina Faso, Côte d'Ivoire, Togo, Gabon and Chad. Only Cameroon (G.11) and Mali (G.11, via the older base-2014 guide) have self-cited a bloc regulation by number from their own documents.

## Findings

### 1. Burkina Faso — `bf-insd-ihpc`

INSD's own harmonised CPI, base 2023-successor methodology, checked across three editions of INSD's own bulletins — none names the base-2023 UEMOA regulation by number. `afristat-ihpc-guide-2014` was reopened this session (the same AFRISTAT PDF URL Mali's G.11 slice flagged with uncertain dating) and its PDF creation-date metadata (2014-04-16) plus internal text identify it as the base-2014 rebase guide — see Corrections below. AFRISTAT is named in Burkina Faso's own IMF metadata, but that metadata is stale (dated 2018). A World Bank safety-net project (P124015) was checked directly for CPI-indexation language; none found.

### 2. Togo — `tg-inseed-ihpc`, `uemoa-reg-2024-base2023`

The headline finding (see above). Togo's IHPC methodology note states the common WAEMU methodology was "adoptée en 1996... puis rénovée successivement en 2008 et 2023" — consistent with, but not itself citing, the regulation found via UEMOA's gazette. Two dependencies: `tg-inseed-ihpc → uemoa-reg-2024-base2023` (methodology_depends_on, established by the regulation's own binding text naming Togo as a member state, not by a Togo self-citation) and `tg-inseed-ihpc → imf-e-gdds` (methodology_depends_on, confirmed via Togo's live open-data portal). CNSS's (private-sector pension) and CRT's (civil-service pension) own governing texts were checked for CPI-indexation language; CNSS's is a clean, well-evidenced denial (full regulatory-texts index checked, nothing found), CRT's founding texts could not be retrieved in readable form this session (title-only citation).

### 3. Gabon — `ga-instat-ihpc`, `ga-imf-article-iv-2024`

Gabon's own IHPC bulletin describes its methodology as "identique dans les pays membres de la CEMAC et de l'UEMOA" without naming any specific instrument — a clean contrast with Cameroon (G.11), whose own CPI note names both AFRISTAT and a specific numbered CEMAC regulation directly. CEMAC's own 2024 inflation note (`cemac-inflation-note`, already in the corpus via Cameroon's G.11 slice) independently corroborates Gabon by naming its national institute as a data contributor, with matching survey statistics (750 varieties, 2,670 points de vente). Two dependencies: `cemac-inflation-note → ga-instat-ihpc` (uses_data_from) and `ga-instat-ihpc → imf-e-gdds` (methodology_depends_on). Strongest finding: the IMF's own 2024 Article IV report states directly that Gabon's public pension fund (CPPF) is "indexed pension in line with the wage scale" — explicit wage-scale indexation, not CPI. A March 2025 CNSS (private-sector fund) reform proposal to index pensions to inflation was checked against subsequent December 2025 reform decrees, which describe only a hedged "possible revalorisation" with no CPI reference — the inflation-indexation proposal does not appear to have been the version enacted.

**Open, not resolved: a base-year table conflict.** Gabon's own October 2024 bulletin states "IHPC base 2018 en remplacement de l'IHPC base 2004" with no mention of a 2022 base. CEMAC's own 2024 inflation note has a table footnote stating "le Cameroun et le Tchad sont passés à la base 2022" — naming Cameroon and Chad but not Gabon, implying by omission that Gabon has not rebased to 2022. Reported as a conflict between two primary documents, not adjudicated.

### 4. Chad — `td-inseed-cpi`

INSEED's harmonised CPI. CNPS's (Caisse Nationale de Prévoyance Sociale) own site lists an exhaustive 12-text legal compendium governing its pension scheme — checked in full, zero CPI-indexation provisions found. This is a clean, well-evidenced denial, not an absence of research. Two dependencies: `cemac-inflation-note → td-inseed-cpi` (uses_data_from) and `td-inseed-cpi → imf-e-gdds` (methodology_depends_on). Two World Bank safety-net projects (P156479, P502142) and an IMF 2024 Article IV report were also checked; no CPI-linkage found in any.

## Secondary observations

- The branch-wide rule for un-minted regional instruments held again this session: Gabon and Chad both name CEMAC's shared methodology in prose without citing the underlying regulation by number, matching Cameroon's own pattern in G.11. The CEMAC regulation (Règlement N° 03/21-CEMAC-UEAC-CM-36) itself stays un-minted branch-wide — no session has yet independently opened and quoted it directly, only cited it secondhand or via the CEMAC Commission's separate inflation note.
- All four countries this session continue the branch's now-consistent non-CPI pension pattern. No country researched in G.10, G.11 or G.12 has produced a live CPI-indexed pension or safety-net programme — the pattern is uniform enough across 12+ countries now that it is itself a finding, not a gap.
- A placeholder relation entry (`"PLACEHOLDER-uemoa-reg-03-2017-cm-uemoa"`) surfaced in the Togo research agent's Part B, referencing the predecessor base-2014 UEMOA regulation as a `supersedes` relation target. The `Relation`/`RelationType` concept itself is real (confirmed by reading `types.ts` directly: `relation_type: 'audits' | 'supersedes'`, `basis` and `evidence_url` both required), but the predecessor regulation was never independently opened or minted as its own node, so including this relation would have created a dangling reference. Excluded from the synthesized slice. If a future session opens the base-2014 regulation directly, this `supersedes` relation is worth reconstructing.

## Corrections to prior sessions

1. **G.11 (Mali slice) — AFRISTAT guide dating refined, not contradicted.** Mali's G.11 session described an AFRISTAT-authored guide (afristat.org URL) as "~2008 vintage, likely superseded" — a hedge, not a confident dating. This session's Burkina Faso research independently reopened the identical URL and found PDF creation-date metadata (2014-04-16) plus internal text identifying it as the base-2014 rebase guide, now minted as `afristat-ihpc-guide-2014`. This refines Mali's hedge rather than contradicting it (2014 is still "superseded" relative to the base-2023 regulation found this session) — logged here per the branch's "never edit a predecessor" convention rather than editing G.11's files.

2. **G.11 (Senegal, Côte d'Ivoire, Mali slices) — the base-2023 UEMOA regulation open question is now resolved.** All three G.11 countries gestured at or named a base-2023 regulation without a session locating its own text. This session's Togo research found and OCR'd it directly: `uemoa-reg-2024-base2023` (Règlement N°05/2024/CM/UEMOA du 20 décembre 2024). This does not change any G.11 finding — it completes an open thread three G.11 slices left dangling. Future sessions revisiting Senegal, Côte d'Ivoire or Mali's `_open_questions` about this regulation should treat it as answered and point at the Togo slice's node.

## Thomas's stated priority for the remaining work

No new priority statement was given this session — this batch operated under the standing "keep digging" / "yes, keep digging ;)" authorization from before G.11 and G.12. The two-batch WAEMU/CEMAC push (G.11 + G.12) has now covered 5 of 8 WAEMU states and 3 of 6 CEMAC states. Remaining WAEMU: Bénin, Guinée-Bissau, Niger. Remaining CEMAC: Central African Republic, Congo (Rép.), Equatorial Guinea. Absent a redirect, the natural next batch is these six.

## Cheap checks still outstanding

1. Niger — press quote used this session (a UEMOA Commission official crediting AFRISTAT as "maître d'œuvre technique") suggests Niger's own documents may be worth a direct look, independent of a full country research pass.
2. `tg-1991-guide-not-located` — Togo's own 2018 IMF metadata names "Harmonized Consumer Price Index for WAEMU Member Countries – Theory and Practice" (WAEMU Commission). Senegal (G.11) and Burkina Faso (G.12) have now both separately cited a near-identical title. Still not located as a retrievable file by any of the three countries that have named it — worth one dedicated attempt across all three citations at once rather than three separate misses.
3. `tg-2018-dsbb-metadata-stale` — Togo's IMF DSBB CPI-specific metadata page is dated July 2018 and describes base year 2008/Lomé-only coverage, two rebasings and one coverage expansion out of date. Not urgent (live confirmation exists via Togo's own open-data portal) but worth flagging if DSBB metadata staleness becomes a pattern worth its own note.
4. `tg-crt-founding-texts-unreadable` — CRT's (Togo civil-service pension) founding Loi N°91-11 and Décret N°91-208 are named but not retrieved in readable form.
5. `ga-cnamgs-legal-texts-not-retrieved` — Gabon's legal-text index (legigabon.com) lists several health-insurance and family-benefits statutes plus a 2014 "Filets de protection économique et revenus solidaires" decree; none retrieved in readable form this session.
6. `ga-cnss-primary-code-not-retrieved` — Gabon CNSS's pension formula is documented via CLEISS (a secondary French source) resting on a Code de Sécurité Sociale not retrieved directly.
7. `ga-base-year-table-conflict` — Gabon's own bulletin (base 2018, no 2022 mention) vs. CEMAC's inflation note (footnote implying Cameroon and Chad, not Gabon, moved to base 2022). Not resolved; worth revisiting if either institution publishes an update.

## What to pass at the start of next thread

Point the next session at this file (`AF/G.12.md`) and `AF/G.11.md`. The natural next batch is the remaining WAEMU three (Bénin, Guinée-Bissau, Niger) and CEMAC three (Central African Republic, Congo, Equatorial Guinea) — six countries, which would complete both blocs' representation in the corpus. If Thomas wants a scope change instead (e.g. back to institution-first research, or a different continent), that supersedes this default.

---

## How to write the next hand-off

(Copied verbatim per branch convention.)

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
