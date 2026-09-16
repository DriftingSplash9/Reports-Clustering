# `notes/` — what is in here

**An index, nothing else.** One line per file: what it is, and when to open it.
No rules live here; if a line needs a second sentence, that sentence belongs in
the file it points at.

**`HANDOFF.md` §1 is still the read order.** This file is the fallback for when
§1's router does not name a row for what you are doing — it is how you find a
note nobody pointed you at. Nothing in `notes/` is on the mandatory read path.

**Adding a note? Add its line here in the same edit.** A note that is not
indexed here and not named by `HANDOFF.md` §1 will not be found by the next
agent.

## Method and recipes — read the one for the job

| file | k | open it when |
|---|---|---|
| `techniques-2026-09-04.md` | 18.0 | fetching, capturing or extracting anything. The general recipe set |
| `node-url-audit-2026-09-15.md` | 6.5 | scoping ANY orphan/coverage round: 32% of node urls are not documents, the workbook's ranking inverts by readable stock, and the two probe traps that nearly cost a round |
| `bps-url-repair-probe-2026-09-15.md` | 8.7 | doing or planning a per-host url repair: the Chrome-only route into bps.go.id, the search-form method, and why only 27 of 61 nodes could be repaired — the second pass reclassified 13 downward, and 114 non-bare urls are already shared by 335 nodes |
| `eu-classification-statute-2026-09-14.md` | 7.2 | anything EU classification or statute: the CELLAR route for legal acts, the current ESMS hi3/hi4 split, and the 140-pair grader selection rule 11 needs |
| `eu-statutes-2026-09-15.md` | 6.7 | anything EU statute or national HICP: the four acts' resolved CELLAR URLs, why three of them are already nodes and no statute node was minted, what Germany / Türkiye / Czechia / Albania / Romania each need, and the insse.ro container-vs-Chrome split |
| `ecoicop-target-audit-2026-09-15.md` | 6.5 | before touching any national HICP edge, or re-asking whether the 09-14 ECOICOP wiring landed on the right nodes: the 31-country table, the one mismatch (RO), and the five nodes whose own url is a Eurostat metadata page — a shape the NODE URLS check cannot see |
| `india-nss-frames-2026-09-16.md` | 6.3 | anything India, or any `.gov.in` host returning 000: the `curl -k` certificate finding and which 13 hosts are still dead, why the coverage chart oversells India's 37 orphans, the microdata.gov.in NADA study-description seam with its catalog ids, and the August import's instrument-direction error |
| `uzbekistan-2026-09-16.md` | 4.7 | anything Uzbekistan or Central Asia: stat.uz's ~198 ESMS-shaped metadata sheets and how to use them, the `¬–` pdftotext artefact that costs coverage, why lex.uz is unusable without a browser, and the four edges that are one fetch away |
| `techniques-cn-yearbooks-2026-09-08.md` | 7.8 | working any Chinese statistical yearbook |
| `china-method-2026-09-09.md` | 36.6 | anything China — the portals, the shapes, the traps |
| `imf-elibrary-2026-09-06.md` | 7.7 | anything IMF. Its second addendum corrects the first |
| `imf-dsbb-2026-09-06.md` | 10.9 | `dsbb.imf.org` specifically — different mechanism to the e-library |
| `research-batches.md` | 2.3 | a round that fans out to parallel agents. Binding when it does |
| `handoff-procedure.md` | 11.2 | writing a handoff. The full §4 procedure |
| `routing-snapshot-2026-09-04.md` | 9.5 | never trust it — a dated host-reachability reading. Re-probe instead |

## Live state — the files a round crosses a row off in

| file | k | open it when |
|---|---|---|
| `china-progress.md` | 44.5 | China only. Province and city tables, scores, parked leads. Rows are never deleted |
| `standing-issues.md` | 9.9 | asking "what is broken that nobody is fixing?" Items demoted out of `HANDOFF.md` after five handoffs |
| `sweep-log.md` | 14.7 | moving anything to `_to_delete/`. The durable record; the folder itself is not |

## Design and scoping

| file | k | open it when |
|---|---|---|
| `Midvamp - Revamp.md` | 20.8 | you need the design of the current programme |
| `dsbb-som-750-scoping-2026-09-09.md` | 12.3 | the 750-row DSBB expansion call comes back. Shape of the decision, not the decision |
| `cross-border-gaps-2026-08-20.md` | 2.5 | wondering why 19 countries have no cross-border edge |
| `mint-2026-08-20.md` | 4.8 | a `meta.note` from the August 2026 import points at it |

## Doc audits — the slow-layer sweeps, newest last

| file | k | open it when |
|---|---|---|
| `doc-audit-2026-09-07.md` | 45.8 | you need the FORMAT. The worked example every later sweep follows |
| `doc-audit-2026-09-09.md` | 7.2 | handoff-080 sweep, and the cadence answer |
| `doc-audit-2026-09-10.md` | 8.2 | handoff-085 sweep, under the new every-fifth cadence |
| `doc-audit-2026-09-11.md` | 4.8 | the `PLAYBOOK-CORPUS.md` restructure and the rule that stops it regrowing |
| `grader-rulings-round-2026-09-05.md` | 15.5 | a grader behaviour surprises you and `playbook/corpus-evidence.md` does not explain it |

## Renderer measurements

| file | k | open it when |
|---|---|---|
| `camera-fit-measurement-2026-08-19.md` | 4.5 | camera fit vs corpus growth. Measured, not argued |
| `flicker-tests-2026-08-19.md` | 6.5 | the node flicker. Three suspects cleared, one left |

## Data — records, not reading

Open only to reverse something or to check what a past change did.

| file | k | what |
|---|---|---|
| `retired-nodes-2026-08-29.json` | 124 | nodes retired as duplicates. Full records, so the merge is reversible |
| `retired-nodes-2026-08-31.json` | 187 | the 32 agreement nodes retired under ruling 2-A |
| `schema-validator-round-2026-09-03-fold-editions.json` | 33 | nodes folded into editions by the schema round |
| `schema-validator-round-2026-09-03-migration.py` | 18 | the migration script that round ran. Applied once |
| `publisher-cleanup-2026-08-31.json` | 32 | publisher strings rewritten, before and after |
| `proposed-tags-retired-2026-09-06.json` | 147 | every domain-tag change of 2026-09-06, node by node |
| `_all-corpus-ids-2026-08-25b.txt` | 70 | a flat id list, dated 2026-08-25. Stale — query the live data instead |

`visual-revamp-2026-08-18` is a 0-byte leftover with no extension and no content.
`desktop.ini` is Windows, not ours.
