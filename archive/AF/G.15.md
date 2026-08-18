# AF/G.15 — Eight-round test: the continental/regional coordination layer

## Orientation

This is the AF branch's first session to work top-down rather than country-by-country. G.1 through G.14 built federal- and municipal-level nodes, country by country; nothing above the country level existed anywhere in the branch except two isolated hub nodes (`eac-hcpi-regulations`, `cemac-inflation-note`) sitting with partial wiring. This session ran 8 rounds as a test Thomas requested — fetch, brief, reassess, decide whether to go deeper or move on — targeting exactly that missing layer, per `africa-coordination.md`'s finding that the corpus's countries "sampled Africa in exactly the way that guarantees the nodes share no methodological parent." Read `Research.1.md` first if picking this up cold. The one rule that governs everything below: if no document says it, the edge does not exist.

## Session conditions

Thomas asked to test 5-10 autonomous research rounds, each ending in a short brief (not an essay), with a running offer to route hard leads through Grok. All 8 rounds were done by direct WebSearch/WebFetch from this session — no Grok round was actually needed this time, though several leads below are flagged for one. Every round produced a DRAFT JSON slice, sent to Thomas and written to `src/data/research/` un-wired (not yet in `src/data/index.ts`), per this branch's own DRAFT convention. **None of these eight files have been imported, validated, or wired into the app yet** — that is deliberately the next session's first job, not this one's.

## Headline result

**Every major regional economic bloc already touching this corpus's countries turned out to have a real, binding, documented harmonized-CPI instrument — and none of them had been researched before this session.** WAEMU (règlement 16 Dec 1997, plus the already-partially-known 2017/2024 successors), CEMAC (règlement N°03/21-CEMAC-UEAC-CM-36, 27 Jan 2021), the East African Community (already in the corpus as `eac-hcpi-regulations` but only half-wired), SADC (a regional HCPI newsletter naming all eight of Thomas's Southern Africa countries by name), and the Arab Maghreb Union (a Secretariat-General bulletin naming all four of the corpus's North Africa countries plus a fifth, Mauritania, entirely new to the branch) all had a real instrument, findable and quotable within one or two searches once the right site was found. This confirms `africa-coordination.md`'s hypothesis directly: the "islands" appearance was a sampling artefact of researching countries one at a time, not a fact about Africa's statistical systems. One bloc, ECOWAS, was checked and genuinely does not connect this way — its convergence report cites "member central banks," not the national statistics offices already in the graph, and that non-finding was kept rather than papered over.

## Findings

### 1. WAEMU (West Africa's monetary union) — `af-continental-hub.json`, `af-waemu-remainder.json`

Found the founding 16 December 1997 règlement (verbatim, AFRISTAT's own reference guide, page 9 preface) establishing the IHPC as of 1 January 1998 — a layer earlier than the 2017/2024 regulations already in the corpus. Wired Côte d'Ivoire and Senegal, whose own CPI nodes existed but weren't linked to the existing `uemoa-ihpc-note-2023` hub. Researched and minted Bénin and Niger from scratch (both clean monthly bulletins, both wired). Niger's own bulletin also names the IMF's CPI Manual 2020 directly. Guinea-Bissau, the one remaining WAEMU member, could not be resolved — its statistics office site is robots-blocked to non-browser fetch.

### 2. CEMAC (Central Africa's monetary union) — `af-cemac.json`

Three existing corpus files (Cameroon, Gabon, Chad) had already identified "CEMAC Règlement N°03/21-CEMAC-UEAC-CM-36" by name as an unresolved lead. Found and quoted it (CEMAC Commission's own 2024 inflation note, page 5), closing all three leads. Minted Central African Republic and Congo-Brazzaville from scratch — both real, monthly, fetched directly. Equatorial Guinea got a statistical yearbook, not a dedicated CPI bulletin, so the CEMAC link was deliberately deferred rather than guessed — held for a future session or Grok to find the narrower monthly report.

### 3. EAC (East Africa) — `af-eac-wiring.json`

Kenya and Tanzania were already wired to `eac-hcpi-regulations`; Uganda and Rwanda, both already in the corpus, were not. Confirmed both countries' EAC accession dates directly off the EAC's own site and closed the gap. Burundi (EAC member, statistics office confirmed to exist, no bulletin located) and South Sudan/DR Congo/Somalia (EAC members, zero AF-branch presence at all) are the remainder.

### 4. SADC (Southern Africa) — `af-sadc-hub.json`

The SADC Secretariat's own Harmonised CPI newsletter names all eight of Thomas's already-researched Southern Africa countries by name in one document. Wired all eight. The binding SADC Protocol on Statistics (2021), Article 14, is real and directly on point, but both copies of the primary PDF found are scanned images with no extractable text — confirmed only via a secondary parliamentary summary, which this branch's own standards (and its own prior experience with a fabricated proxy citation, `AU/G.3.md`) say is too weak to mint on its own. Held as a lead, not a node.

### 5. UMA / Arab Maghreb Union (North Africa) — `af-uma-hub.json`, `af-mauritania.json`

The UMA Secretariat's own monthly regional bulletin names five states: Algeria, Libya, Mauritania, Morocco, Tunisia. Wired the four already in the corpus. Mauritania — genuinely new, no prior AF-branch work at any level — was researched from scratch: its ONS confirmed direct AFRISTAT technical assistance for its own CPI, which supplied a second, independent edge into the already-minted `afristat-ihpc-guide-2014` node. Only 2017-dated editions of the UMA bulletin were found; whether the series continues is unconfirmed, stated honestly rather than assumed either way.

### 6. ECOWAS (West Africa's political bloc) — `af-ecowas.json`

Checked specifically because Nigeria and Ghana, both well-researched in this corpus, sit on no regional hub (neither uses the CFA franc). WAMA's real annual Macroeconomic Convergence Report does name both countries, but its own acknowledgements cite "member central banks" as the data source, not the national statistics offices whose CPI releases are already minted here. Minted the report, held back the edges — an honest non-finding, not a stretch.

## Secondary observations

- **A direction bug was introduced and caught mid-session.** The first CEMAC edges (round 3) had the aggregator-note and country-CPI backwards relative to the schema's own "source depends on target" convention and relative to the existing `cemac-inflation-note -> cm-ins-cpi` pattern already in the corpus. Caught while building the SADC hub (round 5) by checking the existing edge's actual `relationship_type` before assuming; fixed in place before commit. Worth double-checking direction against an existing analogous edge before trusting a first-draft basis paragraph, even one's own.
- **Six new countries need `COUNTRY_FAMILY` palette entries before any of this imports**: BJ, NE, MR, CF, CG, GQ all currently return zero matches in `src/lib/palette.ts`. This is the same pre-import step G.2/G.3/G.4's backlog needed (`af-backlog-import-2026-08-10.md`) and should be done as one consolidated palette.ts edit alongside the `index.ts` wiring, not per-file.
- **Verification run before this hand-off**: a script check across all 8 new files found 12 new report nodes, 28 new dependency edges, zero id collisions against the existing 727-report corpus or against each other, and every dependency endpoint (source and target) resolves to a real id. Full validate/check/build was not run — that needs the tar-to-sandbox procedure (`npm-validate-procedure.md`) and the palette.ts fix above first.
- **No Grok round was used this session** — all 8 rounds ran on this session's own WebSearch/WebFetch. Several leads below genuinely need a real browser or better PDF extraction, which is exactly where Grok's own tooling has outperformed this session's in the past (per `feedback_grok-as-verification.md`).

## Corrections to prior sessions

The round-3 direction bug described above was caught and fixed before ever reaching a prior session's file — no correction needed to G.1–G.14 themselves. No other corrections.

## Thomas's stated priority for the remaining work

This was an explicitly-scoped test ("5-10 rounds... let's see what you can do for Africa"), not a request against the branch's existing queue. No standing priority was stated beyond it. The natural next decision is whether to import these 8 draft files (palette.ts fix, index.ts wiring, validate/check/build) before continuing, or keep researching and batch the import later — G.7/G.8's precedent favours one consolidated import pass over eight small ones.

## Cheap checks still outstanding

1. `afristat-founding-treaty-not-verified` — AFRISTAT's own site (afristat.org) is robots-disallowed to non-browser fetch; its founding treaty name, exact date and full member roster (18 states, per a UNECA secondary source) were never independently confirmed from AFRISTAT's own primary text.
2. `uemoa-1997-reglement-number-missing` — the founding règlement (16 Dec 1997) is quoted and dated but its instrument number was not found in the AFRISTAT guide that names it.
3. `gw-cpi-not-located` — Guinea-Bissau's INE site is robots-blocked; the specific CPI bulletin title behind its confirmed 2024 IMF e-GDDS implementation was not found.
4. `gq-monthly-ipc-bulletin-not-located` — INEGE (Equatorial Guinea) likely publishes a dedicated monthly IPC bulletin (referenced repeatedly in local press) distinct from the annual yearbook minted this session; not located as a primary URL.
5. `cemac-reg-04-21-underlying-inflation-not-opened` — the companion CEMAC regulation on underlying/core inflation (N°04/21-UEAC-115-CM-36), named alongside the harmonized-CPI regulation, was not independently opened.
6. `sadc-protocol-2021-unreadable` — two independent copies of the primary SADC Protocol on Statistics PDF are scanned images with no extractable text; only a secondary parliamentary brief's paraphrase of Article 14 was obtained.
7. `bi-cpi-not-located` — Burundi's ISTEEBU is confirmed to exist and publish inflation data; no primary bulletin URL was found.
8. `eac-south-sudan-drc-somalia-unresearched` — three EAC members have zero AF-branch presence at any level.
9. `african-charter-citation-check-not-run` — whether any AF-branch country's own Statistics Act cites the African Charter on Statistics (2009) by name was never checked at the country level, only confirmed the Charter itself is real and binding in general terms.
10. `mr-cnss-pension-primary-not-opened` — Mauritania's own CNSS statute was checked only via a CLEISS secondary summary; no indexation clause found, but the primary text was not opened.
11. `ecowas-wama-methodology-annex-not-checked` — whether WAMA's own convergence-report methodology annex names Nigeria's NBS or Ghana's GSS specifically (rather than "member central banks") as an underlying CPI source was not checked.

## What to pass at the start of next thread

Point the next session at this file (`AF/G.15.md`). The 8 draft files sit in `src/data/research/` unimported: `af-continental-hub.json`, `af-waemu-remainder.json`, `af-cemac.json`, `af-eac-wiring.json`, `af-sadc-hub.json`, `af-uma-hub.json`, `af-ecowas.json`, `af-mauritania.json`. First job: palette.ts entries for BJ/NE/MR/CF/CG/GQ, then wire all 8 into `index.ts`, then the full tar-to-sandbox validate/check/build pass. Ask Thomas whether to import now or keep researching first — not decided by this session.

---

## How to write the next hand-off

(Copied verbatim per branch convention.)

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
