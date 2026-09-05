"""The 9 fractional-cadence `standard` nodes (HANDOFF §2 known defects).
Thomas, 2026-09-05: "they sound like publications to me" — ruled on the
inventories and manuals as described to him. Applied to the six that ARE
inventories/manuals/portal pages; the three classification instruments
(naics, icd-10-ca, icls-work-statistics-resolution) stay `standard`, the
same class as ISIC/COICOP, and are listed for a separate word.
"""
import json, glob
TO_PUBLICATION = {'nl-cbs-gni-inventory-2010', 'de-destatis-gni-inventory', 'de-destatis-qna-inventory',
                  'eu-manual-mgdd', 'eu-manual-rd-esa2010', 'rw-nisr-nsdp'}
done = set()
for f in sorted(glob.glob('src/data/research/*.json')):
    d = json.load(open(f, encoding='utf-8')); touched = False
    for r in d['reports']:
        if r['id'] in TO_PUBLICATION and r.get('kind') == 'standard':
            r['kind'] = 'publication'; touched = True; done.add(r['id'])
    if touched: open(f, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=2) + '\n'); print('wrote', f)
print('missing', TO_PUBLICATION - done)
