"""
Corrects a section reference in one basis. `ch-bfs-lik -> ch-bfs-national-
accounts` cites prc_hicp_esmshi3_ch.htm "18.1.1.3"; the sentence it states
("the HICP weighting has been based on national accounts data since 2024")
is at 18.1.1 and the quote it carries is at 18.1.1.1. 18.1.1.3 on that page
is "Compilation of sub-index weights", a different paragraph. Read live
2026-09-05. Grade is untouched and unaffected — the quote, the URL and the
evidence record are unchanged; this is the pointer into the document.
Idempotent.
"""
import json, io, sys

P = 'src/data/research/eu-hbs-and-price-index-gaps-2026-09-05.json'
OLD = "(prc_hicp_esmshi3_ch.htm, 18.1.1.3) states the HICP weighting has been based on national accounts data since 2024."
NEW = "(prc_hicp_esmshi3_ch.htm, 18.1.1 and 18.1.1.1) states the HICP weighting has been based on national accounts data since 2024, and names the national accounts as the 4th-digit weight source."

d = json.load(io.open(P, encoding='utf-8'))
n = 0
for e in d['dependencies']:
    if (e['source_report_id'], e['target_report_id']) == ('ch-bfs-lik', 'ch-bfs-national-accounts'):
        if OLD in e['basis']:
            e['basis'] = e['basis'].replace(OLD, NEW)
            n += 1
if not n:
    sys.exit('nothing to fix — already corrected')
io.open(P, 'w', encoding='utf-8').write(json.dumps(d, indent=1, ensure_ascii=False) + "\n")
print(f'corrected {n} basis section reference')
