# C1 — Grok consolidated/*.json vs public/corpus-data.json (2026-09-02)

Method: for each consolidated country file, every `reports[].id` looked up in corpus ids; else title (whitespace-normalised, lowercased) looked up; else id looked up in notes/retired-nodes-2026-08-29.json, retired-nodes-2026-08-31.json, publisher-cleanup-2026-08-31.json; remainder = stripped at mint (institution/geography scaffolding, per each slice's `meta.note`). Edges keyed on (source_report_id,target_report_id): present in corpus / quarantined in some research slice's `_dropped` / carried as `part_of` on a node / unexplained.

| file | reports | id in corpus | title-only | retired 08-29/31 | stripped at mint | deps | edge live | edge in _dropped | edge as part_of | unexplained |
|---|---|---|---|---|---|---|---|---|---|---|
| ae-united-arab-emirates.json | 26 | 20 | 1 | 3 | 2 | 0 | 0 | 0 | 0 | 0 |
| af-afghanistan.json | 14 | 9 | 1 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |
| ar-argentina.json | 61 | 58 | 0 | 1 | 2 | 19 | 1 | 18 | 0 | 0 |
| bo-bolivia.json | 60 | 56 | 1 | 1 | 2 | 26 | 3 | 23 | 0 | 0 |
| br-brazil.json | 74 | 74 | 0 | 0 | 0 | 82 | 40 | 27 | 15 | 0 |
| cl-chile.json | 60 | 53 | 0 | 5 | 2 | 21 | 1 | 20 | 0 | 0 |
| cn-china.json | 53 | 52 | 0 | 0 | 1 | 119 | 34 | 84 | 1 | 0 |
| co-colombia.json | 40 | 35 | 0 | 3 | 2 | 16 | 1 | 15 | 0 | 0 |
| ec-ecuador.json | 50 | 45 | 0 | 3 | 2 | 16 | 1 | 14 | 0 | 1 |
| eg-egypt.json | 47 | 47 | 0 | 0 | 0 | 94 | 1 | 93 | 0 | 0 |
| et-ethiopia.json | 29 | 29 | 0 | 0 | 0 | 67 | 11 | 54 | 2 | 0 |
| gy-guyana.json | 40 | 36 | 0 | 2 | 2 | 7 | 1 | 6 | 0 | 0 |
| id-indonesia.json | 126 | 113 | 0 | 12 | 1 | 0 | 0 | 0 | 0 | 0 |
| il-israel.json | 29 | 29 | 0 | 0 | 0 | 26 | 26 | 0 | 0 | 0 |
| in-india.json | 81 | 81 | 0 | 0 | 0 | 70 | 34 | 36 | 0 | 0 |
| int-brics-international-layer.json | 77 | 77 | 0 | 0 | 0 | 79 | 76 | 1 | 2 | 0 |
| iq-iraq.json | 21 | 12 | 6 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| ir-iran.json | 35 | 29 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 |
| jp-japan.json | 65 | 61 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |
| kr-south-korea.json | 72 | 51 | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 |
| mm-myanmar.json | 17 | 7 | 1 | 9 | 0 | 0 | 0 | 0 | 0 | 0 |
| mx-mexico.json | 121 | 99 | 0 | 3 | 19 | 44 | 34 | 8 | 0 | 2 |
| pe-peru.json | 40 | 35 | 0 | 3 | 2 | 15 | 1 | 14 | 0 | 0 |
| ph-philippines.json | 75 | 68 | 0 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |
| py-paraguay.json | 60 | 47 | 2 | 8 | 3 | 27 | 1 | 26 | 0 | 0 |
| ru-russia.json | 152 | 151 | 1 | 0 | 0 | 190 | 136 | 52 | 0 | 2 |
| sa-saudi-arabia.json | 16 | 14 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| sg-singapore.json | 37 | 37 | 0 | 0 | 0 | 27 | 18 | 9 | 0 | 0 |
| sr-suriname.json | 43 | 40 | 0 | 0 | 3 | 5 | 2 | 2 | 0 | 1 |
| sy-syria.json | 13 | 5 | 1 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |
| th-thailand.json | 25 | 24 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| tr-turkey.json | 40 | 33 | 0 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |
| tw-taiwan.json | 122 | 112 | 0 | 10 | 0 | 0 | 0 | 0 | 0 | 0 |
| uy-uruguay.json | 60 | 49 | 1 | 8 | 2 | 21 | 8 | 13 | 0 | 0 |
| ve-venezuela.json | 37 | 33 | 0 | 2 | 2 | 12 | 0 | 12 | 0 | 0 |
| vn-vietnam.json | 67 | 52 | 0 | 15 | 0 | 0 | 0 | 0 | 0 | 0 |
| ye-yemen.json | 14 | 5 | 2 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |
| **TOTAL** | 1999 | 1778 | 18 | 156 | 47 | 983 | 430 | 527 | 20 | 6 |
