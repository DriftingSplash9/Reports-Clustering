"""English title_aliases on national releases (Thomas's ruling 2026-09-05,
ESMS pass): each alias is the name Eurostat's HICP national reference
metadata page for that country uses for the release (rule 2 — read and
quoted, see Claude outputs/esms-hicp-2026-09-05/). Run on both machines.
"""
import json, glob
A = {
 'pl-gus-hbs': 'Household Budget Survey', 'be-statbel-hbs': 'Household Budget Survey',
 'at-statistik-austria-national-accounts': 'National Accounts', 'pt-ine-national-accounts': 'National Accounts',
 'gr-elstat-hbs': 'Household Budget Survey', 'es-ine-national-accounts': 'Spanish National Accounts',
 'es-ine-epf': 'Household Budget Survey', 'fi-statfin-hbs': 'Household Budget Survey',
 'hu-ksh-hbs': 'Household Budget and Living Conditions Survey', 'sk-susr-hbs': 'Household Budget Survey',
 'si-surs-hbs': 'Household Budget Survey', 'bg-nsi-hbs': 'Household Budget Survey',
 'ee-stat-hbs': 'Household Budget Survey', 'lv-csp-national-accounts': 'National Accounts',
 'lv-csp-hbs': 'Household Budget Survey', 'is-hagstofa-hbs': 'Household Expenditure Survey',
 'be-nbb-national-accounts': 'National Accounts', 'hr-dzs-hbs': 'Household Budget Survey',
 'lt-vda-hbs': 'Household Budget Survey',
}
done = set()
for f in sorted(glob.glob('src/data/research/*.json')):
    d = json.load(open(f, encoding='utf-8')); touched = False
    for r in d['reports']:
        if r['id'] in A:
            al = r.get('title_aliases') or []
            if A[r['id']] not in al:
                r['title_aliases'] = al + [A[r['id']]]; touched = True
            done.add(r['id'])
    if touched: open(f, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=2) + '\n'); print('wrote', f)
print('missing', set(A) - done)
