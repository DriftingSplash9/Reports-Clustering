# The corpus-wide `_dropped` sweep — scoping, 2026-08-08

Written to open OPEN-THREADS 2.1 / MISSION-TODO-2 item 4a / block B of
Thomas's stated priority ("its worth a dedicated sweep next before going
further," 2026-08-08). **This is scoping only — nothing below has been
read in full or adjudicated.** No node was minted, no edge was added, no
`_dropped` entry was resolved. This document is the read order and the
starting material for the actual sweep, which is separate, larger work.

## What this is for

`Research.1.md` §4 and `MISSION-TODO-2.md` item 4a both say the same thing:
scope the sweep from the validator, go file-by-file over the files with the
most `_dropped` entries, and read each array in full — no keyword pass,
because `G.55.md` proved a keyword pass is blind to entries that were
wrongly dropped on too narrow a search in the first place (the ESS QPI
case: "no second edition found" after checking one webpage and a foreword).

This document does the file-ranking and pulls a preview of the
highest-value entries in each of the top files, so the next reading
session can start reading immediately instead of re-deriving this list.

## Verified against the live corpus, 2026-08-08

Extracted directly from every `_dropped` array in `src/data/research/*.json`
(58 of 67 files have at least one dropped entry) and cross-checked against
`validator-2026-08-08.txt`'s DROPPED section — **exact match**: 391 total
entries, and the reason breakdown matches digit-for-digit:

| reason | count |
|---|---|
| `note` | 112 |
| `no-node-yet` | 87 |
| `no-document` | 72 |
| `deferred` | 35 |
| `unpublishable-source` | 29 |
| `denied` | 24 |
| `wrong-target` | 16 |
| `caveat` | 10 |
| `wrong-direction` | 4 |
| `unreadable-source` | 2 |
| **total** | **391** |

## A clarification the prior hand-offs didn't make precise: what "122" actually is

`Research.1.md` §4 and `MISSION-TODO-2.md` 4a both cite "122 are research
leads" and then say "start with `no-node-yet` and `no-document`" in the same
breath, as if those were the same 122. **They are not the same set.**

Checked `scripts/validate-data.ts` against `src/lib/types.ts`:

```ts
export const DROPPED_LEAD_REASONS: readonly DroppedReason[] = ['no-node-yet', 'deferred']
```

The validator's printed "122" is `no-node-yet` (87) + `deferred` (35) = 122,
computed by code, and that's the exact number that shows up in
`validator-2026-08-08.txt`. `no-document` (72) is **not** counted in that
122 anywhere in the code.

The prose recommendation to *also* start with `no-document` is a different
and equally valid instruction, for a different reason: `no-node-yet` and
`deferred` entries are already self-identified by whoever dropped them as
real, live leads — the work left is forward research (find the cadence,
mint the node, add the edge). `no-document` entries claim the opposite —
"searched, nothing states it," a confirmed negative — but `Research.1.md`
§4's third-category lesson is that a negative is only as good as the search
behind it, and several `no-document` entries below are marked "NOT
FOUND" after a search that turns out, on inspection, to have been narrower
than it reads (a single webpage, a foreword, one document out of several
plausible ones). Reviewing `no-document` entries is a different task —
checking whether the negative holds up — not more forward research.

**So the real work-list, precisely stated, is three separate piles:**

1. **122 confirmed leads** (`no-node-yet` 87 + `deferred` 35) — go do the
   research, most of the *evidence* is already quoted in the entry itself.
2. **72 `no-document` entries** — re-examine whether the search was actually
   exhaustive before accepting the negative.
3. **112 `note` + 29 `unpublishable-source` + 24 `denied` + 16 `wrong-target`
   + 10 `caveat` + 4 `wrong-direction` + 2 `unreadable-source` = 197
   entries** — lower priority, mostly settled or observational, but not
   exempt from the file-by-file read since the third-category risk applies
   to any reason code, not just `no-document`. This is why the method is
   "read the whole array," not "filter by reason."

## Read order — the files with the most `_dropped` entries

Ranked by **total** `_dropped` count (not just the priority reasons), per
the literal instruction. All files at 8 or more entries — 19 files, close
to the "~15" estimate. Below each, the priority-reason entries
(`no-node-yet` / `no-document` / `deferred`) are previewed in full enough
to triage without reopening the file; the `why` field is truncated at
~220 characters, and every truncated entry's full text is in the file
named. Entries the original researcher's own text already calls out as
the best lead in a slice are marked **★**.

Files are grouped in three tiers by how concentrated the priority-reason
material is, since raw count alone is misleading (see
`grok-h1-international-reports.json` below).

### Tier 1 — high total, high priority-reason concentration (read first)

**1. `nz-government-finance.json`** — 19 total (`denied`=6, `no-node-yet`=5,
`no-document`=4, `note`=3, `unpublishable-source`=1). 9 priority entries:

- ★ `[no-node-yet]` nz-lgfa-annual-report → council long-term plans and annual plans — "the same LGFA sentence that carries the minted annual-reports edge also names 'annual plans and long-term plans' — the LGA 2002 s.95 and s.93 documents. Neither is a node yet. The long-term plan in particular is the rich..."
- ★ `[no-node-yet]` Office of the Auditor-General LTP observations → councils' long-term plans — "A subagent found the OAG's 'Observations from our audits of councils' 2024-34 long-term plans' (20 February 2025), a genuinely recurring publication — one per three-year LTP cycle, with 2022 and 2019 predecessors — which..." (this is cheap check 3.3/OPEN-THREADS 3.3 territory too)
- `[no-node-yet]` council long-term plan / development contributions policy → Producers Price Index Outputs for Construction — verified directly, LGA 2002 s.106(2C), full 469-page PCO reprint read.
- `[no-document]` nz-nzta-far-policy → any titled data source — verified directly via Wayback replay after a 403.
- `[no-document]` Rating Valuations Rules 2008 → a titled land-registry sales dataset — full 79-page LINZS30300 grepped; NZ has no NSW-style land-registry chain.
- `[no-document]` Local Government (Financial Reporting and Prudence) Regulations 2014 → Stats NZ subnational population — **not independently re-verified**, subagent-only.
- `[no-document]` Local Government Act 2002 Schedule 10 → any named statistical/accounting publication — **not independently re-verified as exhaustive**; this is cheap check 5.1/3.9's Schedule 10 re-extraction, already flagged as verification debt.
- `[no-node-yet]` nz-lgaca-2009 → Local Government Act 2002 — verified directly, 128 occurrences grepped.
- `[no-node-yet]` nz-lgaca-2009 → Watercare Services Limited's own annual report — verified directly.

**2. `au-government-finance.json`** — 13 total (`no-document`=5, `no-node-yet`=3,
`caveat`=2, `denied`=1, `note`=1, `deferred`=1). 9 priority entries:

- ★ `[no-node-yet]` au-vlggc-annual-allocation-report → Tourism Research Australia visitor surveys — Appendix 4L names it directly; this is cheap check 3.6.
- ★ `[no-node-yet]` au-vlggc-annual-allocation-report → ARIA+ (Accessibility/Remoteness Index) — Appendix 4L names it directly; this is cheap check 3.7.
- `[deferred]` au-vlggc-annual-allocation-report → Vicmap (road-purpose hierarchy) — documented FUTURE dependency, tense trap; this is cheap check 3.12, dated September 2026.
- `[no-document]` Local Government (Financial Assistance) Act 1995 (Cth) s.4A → a specific titled ABS product — verified directly, legislation.gov.au.
- `[no-document]` au-cgc-gst-relativities (Population chapter) → a NISEIFA node — resolved 2026-08-07 (AU/G.3): not mintable.
- `[no-document]` NSW Local Government Grants Commission's own methodology manual — searched directly, multiple variants, not found; this is cheap check 3.8, needs a proper `NOT FOUND` with search strings.
- `[no-node-yet]` an Australian council's rates document → NSW Land Registry Services — the Georges River chain exists at state level, no council-level document found yet.
- `[no-document]` au-vlggc-annual-allocation-report → a titled Valuer-General source — acknowledged by name, no titled release found.
- `[no-document]` au-vlggc-annual-allocation-report → au-cgc-gst-relativities — Commission appears only in Acknowledgements.

**3. `equalization-named-products.json`** — 12 total (`no-node-yet`=9,
`note`=2, `unpublishable-source`=1). **9 of 12 entries are `no-node-yet`,
the highest concentration of any file in the corpus.** All nine hang off
`fiscal-equalization-program` (SOR/2007-303) and are individually-cited,
titled StatCan products or tables named in the Division 1 definitions —
Provincial and Territorial Economic Accounts, Provincial Supply and Use
Tables, System of Macroeconomic Accounts, Government Finance Statistics,
Oil and Gas Extraction survey, R.L. Polk & Co. Canadian and International
Registration Manual (commercial source, already-decided shape), CANSIM
405-0004, CANSIM 002-0020, table 23-10-0066-01. ★ Every one of these reads
as mechanically mintable — cited by section number, quoted verbatim — this
looks like the single cheapest concentration of real nodes in the whole
sweep.

**4. `equalization-payroll-base.json`** — 8 total, **7 of 8 are
`no-node-yet`**, same shape as #3 above and explicitly its sibling
(SOR/2007-303 s.19, Territorial Formula Financing instead of the ten
provinces): statcan-seph, statcan-national-accounts, Census of Agriculture,
Gasoline and Other Petroleum Fuels Sold, Report on Energy Supply and Demand
in Canada, StatCan table 10-10-0011-01, Government Finance Statistics. ★
Same read: cheap, cited, quoted, looks mechanically mintable. **Do #3 and
#4 together** — same regulation, same method, sequential sections.

**5. `edp-inventory-regulation-479-2009.json`** — 11 total (`no-node-yet`=6,
`deferred`=2, `wrong-direction`=1, `unpublishable-source`=1,
`no-document`=1). 9 priority entries — dense and already well-annotated by
whoever wrote them (entries are labelled in the source, preserved here):

- ★★ `[no-node-yet]` German EDP inventory (Destatis) → eu-reg-479-2009 — flagged in its own text as **"THE EDGE THIS SLICE WAS BUILT TO FIND, AND IT IS BLOCKED ON CADENCE ALONE."** Given the 2026-08-08 cadence-rule change (Research.1.md §4, one-off foundational instruments no longer need a cadence), this may already be unblocked — check first.
- `[no-node-yet]` German EDP inventory (Destatis) → esa-2010 — same blocker, different wording; same cadence-rule check applies.
- `[no-node-yet]` Five named German statistics → nodes — flagged **"THE MATERIAL THAT CORRECTS THE ANNEX B ASSESSMENT"** — blocked because the `Report` interface requires a URL and the inventory names these statistics without linking them.
- `[no-node-yet]` SFK4-report → terminus — flagged as a **TERMINUS CANDIDATE**, kind `unpublishable`.
- `[no-node-yet]` Article 9(2) guidelines → terminus — flagged as a **TERMINUS CANDIDATE**, kind `unidentified`.
- `[no-node-yet]` eurostat-edp-gfs-quality-report → the national EDP inventories — documented from the Regulation itself (Article 8(1)), not from the report.
- `[deferred]` 26 further national EDP inventories → eu-reg-479-2009 — recorded to show the scale Article 9 creates; every EU member state has its own.
- `[no-document]` Working Party on Tax Revenue Estimates / ZDL reports — `AGENCY ONLY` at scale.
- ★ `[deferred]` Commission Implementing Regulation (EU) 2016/2304 and the 27 national ESA 2010 quality reports — flagged **"HELD BACK DELIBERATELY, and it is the stronger of the two candidates."** Note: 2016/2304 is already minted (`eu-reg-2016-2304`, `G.53.md`) — this entry may already be partly stale; check before treating it as fully open.

**6. `eu-draft-budget.json`** — 11 total (`no-document`=3, `deferred`=3,
`unpublishable-source`=3, `no-node-yet`=1, `note`=1). 7 priority entries:

- `[no-document]` Eurostat annual update report / Joint Index → a named member-state statistical release — flagged **"THE BRANCH'S CENTRAL NEGATIVE RESULT, first of two."**
- `[no-document]` ESA 2010 Annex B transmission programme → a named member-state statistical release — flagged **"THE BRANCH'S CENTRAL NEGATIVE RESULT, second of two."** (These two are the asymmetry finding in `EU/slices/README.md` — disclosure runs upward, not downward. Confirmatory, not really open.)
- ★ `[deferred]` eu-draft-budget → Eurostat Report of 31 October on annual update of remuneration and pensions — flagged **"A lead, and the best one in the branch."** Three documents long: staff chapters → salary adjustment → Annex XI → this report.
- `[deferred]` eu-draft-budget → ISSAI 300 / ISSAI 400 (INTOSAI) — SEC05 footnote 4 names both with title, publisher, page numbers.
- `[deferred]` ECA annual work programme → ECA 2026-2030 Strategy — documented in SEC05, neither endpoint has a retrieved URL.
- `[no-node-yet]` EESC IT appropriations → Regulation (EU, Euratom) 2023/2841 (Cybersecurity Regulation) — flagged **"the best-evidenced instrument-to-budget-line relationship found in any institutional section."**
- `[no-document]` EESC members' allowance budget lines → a price index — a documented absence of a formula.

**7. `ontario-ompf-mpac.json`** — 13 total (`no-node-yet`=4, `note`=4,
`wrong-target`=2, `deferred`=2, `no-document`=1). 7 priority entries:

- `[no-document]` on-ompf → Statistics Canada, five unnamed products — `AGENCY ONLY` five times in one disclosure table.
- `[no-node-yet]` on-ompf → Spatial Data Infrastructure, Statistics Canada — names a product, not just the agency.
- `[no-node-yet]` on-ompf → Municipal Financial Information Return — Ontario's mandatory annual municipal financial return, missed by the submitted artefact.
- `[no-node-yet]` on-ompf → Online Property Tax Analysis System — named by title; subscription system, check whether it clears the "recurrently published" bar.
- `[no-node-yet]` on-ompf → Ontario Parcel — mapping dataset, jointly maintained.
- `[deferred]` fiscal-equalization-program → twelve StatCan products, as submitted — flagged **"DECLINED AS SUBMITTED, NOT AS SUBJECT MATTER"** — real, wanted, blocked on this pass's specific submission only. Worth reading alongside #3/#4 above (same cluster).
- `[deferred]` calgary-budget / calgary-tax-bylaw / calgary-assessment — Calgary flagged as "the obvious next Alberta municipality," method already known (start from the tax rate bylaw).

**8. `realm-government-finance.json`** — 12 total (`note`=4,
`no-node-yet`=3, `no-document`=2, `deferred`=2, `unpublishable-source`=1).
7 priority entries — Cook Islands / Niue / Tokelau:

- `[no-document]` nu-government-financial-statements → any external accounting framework — verified directly, zero hits across two full document sets; Niue genuinely cites no framework.
- `[deferred]` ck-national-accounts quarterly release as a separate node — Cook Islands publish both quarterly and annual GDP; only annual is minted.
- `[no-node-yet]` ck-budget-estimates → an ADB technical assistance report — ADB named only as an assistance provider, not a titled document (yet).
- `[no-document]` ck-cpi → cpi-manual — weighting source traced to household survey, not the CPI manual by name.
- `[no-node-yet]` Tokelau appropriations inside the NZ Estimates of Appropriations — asked twice across two Grok briefs, correctly left `NOT FOUND` both times rather than guessed.
- `[no-node-yet]` NZ–Tokelau "Joint Declaration on Principles of Partnership"; a Niue bilateral instrument — both named, neither obtained.
- `[deferred]` Government of Niue Budget as a node — masthead verified (FY2025-26), not minted because no passage was found stating what it depends on or what depends on it.

### Tier 2 — moderate concentration, still worth a full read

**9. `eurostat-edp-gfs-ecb-statistics.json`** — 9 total, 6 priority
(`no-node-yet`=4, `deferred`=1, `no-document`=1). Institutional/regulatory
sourcing questions (EBA ITS framework, Eurosystem collateral framework,
standing cooperation bodies) — most of these look like they'll resolve to
"not a node, it's an institutional source" rather than mint anything, per
the file's own framing.

**10. `esa-2010.json`** — 5 total, 5 priority (`no-document`=2,
`no-node-yet`=2, `deferred`=1). Includes ★ the two German inventory→esa-2010
edges (same underlying documents as #5's Destatis entries — cross-reference
before working both files) and ★ a `deferred` German quarterly
national-accounts release flagged **"NEW LEAD... looks more promising than
either inventory."**

**11. `federal-canada.json`** — 7 total, 5 priority (`no-document`=4,
`no-node-yet`=1). All five are plausible but circumstantial pairings
(HFCE↔SHS, EI premium rate↔MIE, CRA indexation↔CPI basket, OAS↔CRA
indexation) where the two things are clearly related in substance but no
document states one depends on the other — genuinely looks like a
confirmed-negative cluster, good test case for the no-document review.

**12. `manufacturing-and-classifications.json`** — 13 total, 5 priority
(`no-node-yet`=2, `deferred`=2, `no-document`=1). Three explicitly
self-flagged: ★ statcan-sut→statcan-supc ("the best one in this slice"),
★ statcan-lfs↔noc (the edge exists weakly; this is the passage that
would strengthen it), ★ statcan-seph→statcan-bps ("LEAD"). Also a
record-number correction worth knowing about: record 3226 was requested as
Canadian International Merchandise Trade and is actually the Canadian
Community Health Survey.

**13. `nl-municipal-finance.json`** — 5 total, 5 priority (`deferred`=3,
`no-node-yet`=2). Two `no-node-yet` verified directly (Waarderingskamer→
Kadaster/BRK — this is the Dutch Kadaster/BRK lead named in OPEN-THREADS
2.9; and BZK toelichting→a named CBS population statistic). Three
`deferred` are all **subagent-sourced, not independently re-verified this
session** — flag for re-verification before minting, not just extraction.

**14. `statcan-ippi.json`** — 8 total, 5 priority (`no-node-yet`=4,
`no-document`=1). Four cleanly-cited StatCan/NAPCS pairings from IPPI's own
methodology record; looks mechanically mintable, same shape as #3/#4.

**15. `statcan-macro-accounts.json`** — 8 total, 5 priority
(`no-node-yet`=3, `no-document`=2). One entry is a **deletion, not an
absence** — the `statcan-national-accounts → statcan-gdp-monthly` seed edge
was checked and found unsupported by either program's IMDB record, so it
was actively removed, not just never added. Worth noting because it's a
different shape from every other entry here: this one closes a question
rather than opening one.

### Tier 3 — smaller piles, same files were already on the radar

**16. `ess-quality-framework.json`** — 12 total, 4 priority. Includes the
Catalogue of ESS standards `no-node-yet` entry, which is now superseded by
this session's scoping (`EU/CatalogueOfESSStandards_scoping_2026-08-08.md`)
— read that instead of re-deriving it here.

**17. `associated-states-government-finance.json`** — 8 total, 4 priority.
Three Puerto Rico `no-node-yet` entries verified directly against the
Oversight Board's Fiscal Plan and certification statement — this is cheap
check 3.5's Puerto Rico work, already partly done.

**18. `esa2010-quality-reporting.json`** — 8 total, 3 priority. Includes
★ "THE STRONGEST STATEMENT YET FOR THE BRANCH'S BIGGEST CLASSIFICATION
GAP" (esa-2010 → NACE/CPA/COICOP/COFOG/NUTS) — not mintable as-is, flagged
as the clearest statement of a known, standing gap.

**19. `credit-and-mortgages.json`** (8 total, 2 priority),
**`international-frameworks.json`** (8 total, 2 priority), and
**`us-federal-policy.json`** (8 total, 4 priority) — smaller priority
counts, listed for completeness of the "≥8 total" cutoff. `us-federal-policy.json`
is worth a look regardless: one entry (`fed-h15 → U.S. Treasury daily yield
curve`) is flagged as live and urgent because a V0.9 deletion left
`fed-h15` with **no surviving edge**, meaning it currently drops from the
graph on every build.

### `grok-h1-international-reports.json` — the outlier, deliberately not Tier 1

68 total entries, the single largest concentration in the corpus by a wide
margin — but only 10 are priority-reason (`no-document`=7, `deferred`=3),
and the other 57 are all `note`. Skimmed, not read in full: the 10 priority
entries are institutional annual-report bookkeeping (BIS, WTO, IMF, WEF —
"genuine recurrent publication, no claimed or verifiable dependency,
existed only as a branch of org-X") that read as correctly dropped rather
than under-searched. **The 57 `note` entries are genuinely unexamined by
this scoping pass** — at nearly half the corpus's entire `note` category
sitting in one file, this deserves its own read even though it didn't
qualify for Tier 1 on priority-reason concentration. Flagging rather than
skipping: don't let its size stand in for either "highest priority" or
"already covered."

## What's NOT covered by this document

- The 391 minus the ~194 priority-reason entries in Tier 1–3 above (roughly
  150 entries) sit in the remaining ~39 files, each with fewer than 5
  priority entries. Not ranked individually here — pick them up after
  Tier 1–2, file-by-file, same method.
- No entry above has been verified, minted, or closed. Every "looks
  mechanically mintable" note is a scoping observation, not a decision —
  `Research.1.md` §3's "extract, don't adjudicate" applies to this document
  too.
- The validator has not been re-run against anything in this document,
  because nothing in `src/data/` has changed yet.

## Suggested execution order

1. **`equalization-named-products.json` + `equalization-payroll-base.json`
   together** (#3+#4) — same regulation, same method, both look cheaply
   mintable, 16 entries between them. Best first session: fast, concrete,
   and it will validate whether "looks mechanically mintable" from this
   scoping pass actually holds up once someone re-opens the regulation.
2. **`edp-inventory-regulation-479-2009.json` + `esa-2010.json`** (#5+#10)
   together — overlapping German-inventory material, and #5's headline
   edge may already be unblocked by the 2026-08-08 cadence rule change.
3. **`nz-government-finance.json` + `au-government-finance.json`** (#1+#2)
   — several entries here are already-scoped cheap checks (3.3, 3.6, 3.7,
   3.8, 3.12) from OPEN-THREADS; doing them here closes two lists at once.
4. Remainder of Tier 1–2 in the order listed.
5. `grok-h1-international-reports.json`'s 57 `note` entries — own session,
   given the volume.
6. Tier 3, then the long tail.

**Re-run the validator after each block, not just at the end** — the
DROPPED count and the 122/leads count moving is the measure of whether a
block actually worked, per `Research.1.md` §4's own instruction.
