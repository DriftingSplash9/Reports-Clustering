# dsbb-som-import — scripted edges from the IMF DSBB Summaries of Methodology

Built 2026-09-05 for the plan's "DSBB/ESMS scripted import" item. Python, run on the bridge VM
(the DSBB API answers the VM; `pycountry` is the only dependency). Three steps, all resumable:

1. `dsbb-harvest.py` — `api/country/getcountrybytype?countryType=SDDS|SDDSPLUS|EGDDS` (read BOTH
   `CountryGroup1` and `CountryGroup2` per letter — the first pass read only group 1 and saw 112 of 191),
   then `api/report/getCategoriesByCountryCode?countryCode=&countryType=`, then
   `api/report/getBaseSummaryofMethodologies?countryCode=&categoryCode=` for every category and
   sub-category. Cache in `~/dsbb-cache/`; ~900 pages per 165 s call; 6,254 pages total, 1,956 empty.
2. `dsbb-extract.py` — strips the `DMDetails` HTML, finds named standards (regex table `STD`, edition-
   pinned where the corpus node is: GFSM 2014, CPI Manual 2020, COICOP 2018), keeps only standards that
   fit the category family (`FIT`), takes the LATEST SNA edition when a SoM names several, and maps
   (country, category) to ONE existing corpus node by ISO2 country + title pattern (`CAT`) with exclusions
   (`EXCL`: regional/provincial, EDP notifications, external-debt-for-government-debt, …). Emits
   `~/dsbb-cands.json` (one candidate node) and `~/dsbb-review.json` (no node / ambiguous / already live).
   Never touches the corpus.
3. `dsbb-requote.py` — after a first grader run, re-derives every `evidence_quote` from the grader's own
   `.evidence-fulltext/` extraction, because the JSON body carries literal `\n` escapes that split a
   sentence and cost coverage (first pass: 88 A / 48 partial-quote; after: 127 A / 3 partial). Also
   drops duplicate (source, target) pairs (one source cited by several categories).

Then `grade-evidence.ts --slice <file> --offline --write`, `npm run validate`, and resolve any rule-7
collisions (`_dropped` entries the new evidence answers → `resolved`; entries a newer national source
already overrode → do not mint, DSBB metadata can be stale — Jamaica and Kazakhstan 1993 SNA).

Not done: Eurostat ESMS (no machine-readable equivalent found in this round) and the 750
`no-source-node` rows, which are mint leads (the SoM names a standard for a country+category the
corpus has no node for), listed in `Claude outputs/dsbb-som-import-2026-09-05-review.json`.
