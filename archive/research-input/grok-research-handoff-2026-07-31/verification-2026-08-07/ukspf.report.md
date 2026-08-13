# ukspf.slice.json — verification report (2026-08-07)

The UKSPF supersession case (EU/G.49.md Finding 3; `_dropped` `no-node-yet`
entry in `src/data/research/uk-local-government-finance.json`), decided by the
project owner today. All verification this session was WebFetch against live
documents; every quote below was fetched this session, not carried over.

## Per-claim verdicts

| # | Claim | Verdict | Evidence |
|---|-------|---------|----------|
| 1 | The UKSPF prospectus is a recurring official release, qualifying as a node | **VERIFIED** | gov.uk landing page (https://www.gov.uk/government/publications/uk-shared-prosperity-fund-prospectus) fetched: first published 13 Apr 2022, nine dated updates through 17 Dec 2025, including "13 December 2024: Added 2025-26 Technical Note and allocations documents" and "4 March 2025: Added 2025-26 additional information and indicators" — an annual technical-note/allocations rhythm, not a one-off. Minted as `gb-ukspf-prospectus`. |
| 2 | Prospectus succession language ("succeeding EU structural funds" wording) | **VERIFIED, verbatim** | Prospectus HTML fetched: ministerial foreword — *"This is our vision and ambition for the new £2.6 billion UK Shared Prosperity Fund (UKSPF), which succeeds the old EU structural funds."* Matches the prior session's quote character-for-character. Bonus finds this session: the prospectus body says allocations allow *"significant continuity with EU structural funds"* and names the *"European Social Fund"* directly (contra G.49's note that ESF appears nowhere — it does, in the body: *"remaining European Social Fund investments"* and the *"2007-13 England European Social Fund programme"* evaluation reference). |
| 3 | The FAQ conflict ("not a direct replacement") is still live | **VERIFIED, verbatim** | FAQ fetched (updated 17 Dec 2025): *"The UKSPF is not a direct replacement for EU structural funds."* Recorded inside the relation's `basis`, not adjudicated — "succeeds" (temporal) and "not a direct replacement" (design equivalence) are compatible, and the relation asserts only the former. |
| 4 | An EU-structural-funds end exists in the corpus already | **NO** | Grepped `merge-work/live-ids.txt` (284 ids) and `src/data/research/*.json` for erdf/esf/structural: no candidate node. The only hits are the UK slice's own `_dropped` prose. New node required. |
| 5 | Regulation (EU) No 1303/2013 (Common Provisions Regulation) qualifies as the EU end | **VERIFIED** | legislation.gov.uk retained-EU-law copy fetched three ways: `/introduction` (full title verbatim, naming ERDF and ESF twice), `/article/1/adopted` (Article 1 as adopted: *"the ERDF, the ESF (together referred to as the 'Structural Funds')"* — the exact term the foreword uses, defined), `/contents` (landing URL resolves; last modified 29 Jul 2025). A recurrently re-made framework instrument (1083/2006 → 1303/2013 → 2021/1060, one per MFF cycle), not an organization. Minted as `eu-esif-common-provisions-regulation`. 1303/2013 chosen over 2021/1060 because the UK exited under the 2014-2020 cycle — those are the programmes UKSPF succeeded. |
| 6 | EUR-Lex as the canonical URL/evidence | **FETCH FAILED — recorded honestly** | eur-lex.europa.eu returned persistent HTTP 429 through the fetch proxy on 4 attempts plus one read timeout, while gov.uk/legislation.gov.uk fetched cleanly in between (EUR-Lex-specific block). Node anchored on legislation.gov.uk instead; `_dropped` note in the slice suggests repointing `url` to the EUR-Lex ELI if a future session confirms it resolves. |
| 7 | Orkney Islands Council citation (subagent-only per G.49, cheap check 3) | **VERIFIED FIRST-HAND** | PDF found by search and fetched: Policy and Resources Committee, "Replacement of Previous EU Structural Funding", 20 Sep 2022 — *"The UK Shared Prosperity Fund, alongside the Levelling up Fund (LUF), is intended to replace EU funding provided through the European structural and investment funds, namely European Regional Development Fund (ERDF), and European Social Fund (ESF)."* Supports the **relation** (identifies ERDF/ESF as the succeeded programmes, justifying the 1303/2013 target); not a dependency, and the committee paper is a one-off, not a node. Folded verbatim into the relation's `basis` with its URL. |
| 8 | North East Lincolnshire Council citation (same status) | **VERIFIED FIRST-HAND** | https://www.nelincs.gov.uk/council-to-submit-investment-plan-to-government/ (21 Jul 2022): *"The UKSPF is allocated to local authorities to replace the 'European Structural Funds' programmes, ERDF and ESIF which this area has previously benefited from."* Same treatment as Orkney — corroboration inside the relation's `basis`. (Note the council's own wording "ERDF and ESIF" is loose — ESIF is the umbrella term that includes ERDF — which is itself a reason it corroborates rather than anchors.) |
| 9 | The relation `gb-ukspf-prospectus -[supersedes]-> eu-esif-common-provisions-regulation` | **MINTED** | First use of `supersedes` in the corpus. `basis` carries: the foreword quote (operative), the FAQ conflict (recorded), the continuity and ESF body quotes, and both council corroborations with URLs. `evidence_url` = the prospectus HTML page actually fetched. Direction per the type's own doc comment: source replaces target in time. |

## For the integrating session

- **Retire (or annotate) the src `_dropped` entry.** The `no-node-yet` UKSPF
  entry in `uk-local-government-finance.json` is fully resolved by this slice;
  this session did not touch `src/` per instructions. A `_dropped` note in the
  slice records the resolution so nothing is lost either way.
- **EU/G.49.md cheap checks 3 and 4 are now closed** (council verifications;
  supersedes decision + minting). MISSION-TODO P2 item 9 likewise.
- **Duplicate-relation guard:** `src/data/index.ts` dedups relations on
  `source-[type]->target`; this pair appears once, no conflict with the two
  existing `audits` relations.
- **EUR-Lex repoint** is the only cosmetic follow-up (see verdict 6).
- Small correction to the record: G.49 Finding 3 said a targeted ERDF/ESF
  acronym search in the prospectus returned NOT FOUND; "European Social Fund"
  does appear in the prospectus body (twice, spelled out). Nothing minted
  depended on the old claim, but the hand-off chain should not repeat it.
