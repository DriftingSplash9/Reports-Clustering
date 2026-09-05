"""ESMS HICP scripted pass, 2026-09-05 — apply proposals.py to the slices.

Existing edge graded A: untouched. Existing edge B/C: the ESMS page becomes
evidence_url, the verified sentence becomes evidence_quote, basis gets a dated
prefix (the old citation is kept in the prefix so nothing is lost). New edge:
minted into eurostat-esms-hicp-2026-09-05.json. Run once, on both machines,
then compare shas.
"""
import json, glob, sys, re
sys.path.insert(0, 'Claude outputs/esms-hicp-2026-09-05'); from proposals import P, U
DATE = '2026-09-05'
files = sorted(glob.glob('src/data/research/*.json'))
data = {f: json.load(open(f, encoding='utf-8')) for f in files}
live = {}
dropped = []
partof = {}
for f, d in data.items():
    for e in d['dependencies']: live[(e['source_report_id'], e['target_report_id'])] = (f, e)
    for x in d.get('_dropped', []):
        if 'source_report_id' in x: dropped.append((x['source_report_id'], x['target_report_id'], x.get('reason'), f))
    for r in d['reports']:
        if r.get('part_of'): partof[r['id']] = r['part_of']
seed = open('src/data/dependencies.ts', encoding='utf-8').read()
touched = set(); new = []; skipped = []; recited = []; quoted = []
for cc, v, s, t, k, q in P:
    url = U(v, cc)
    assert partof.get(s) != t and partof.get(t) != s, (s, t, 'part_of')
    for ds, dt, reason, f in dropped:
        if (ds, dt) == (s, t) and reason not in ('caveat', 'resolved'): print('WARNING dropped note exists', s, t, reason, f)
    assert f"'{s}'" not in seed or f"'{t}'" not in seed, 'seed collision check'
    if (s, t) in live:
        f, e = live[(s, t)]
        if e.get('evidence_grade') == 'A':
            skipped.append((s, t, 'already A')); continue
        old_url = e['evidence_url']
        if old_url.lower() == url.lower():
            # same document, just the verified quote
            if not e.get('evidence_quote'):
                e['evidence_quote'] = q
                e['basis'] = f"ESMS PASS {DATE}: evidence_quote added from the cited Eurostat page (section 18.1.1, weights). " + e['basis']
                quoted.append((s, t)); touched.add(f)
            else:
                skipped.append((s, t, 'already quoted')); continue
        else:
            e['basis'] = f"RE-CITED {DATE} (ESMS pass) to Eurostat's national reference metadata for the {cc.upper()} HICP, section 18.1.1 weights; previously cited {old_url}. " + e['basis']
            e['evidence_url'] = url
            e['evidence_quote'] = q
            recited.append((s, t)); touched.add(f)
    else:
        what = 'national accounts household final consumption expenditure' if k == 'NA' else 'the household budget survey'
        new.append({
            'source_report_id': s, 'target_report_id': t, 'relationship_type': 'uses_data_from',
            'basis': f"RESEARCHED {DATE} (ESMS scripted pass). Eurostat's national reference metadata for the {cc.upper()} HICP (prc_hicp_esms{v}_{cc}.htm, section 18.1.1 weights) states the HICP weights are derived from {what}. Read live (200), quote verbatim from the page.",
            'evidence_url': url, 'evidence_quote': q, 'evidence_grade': 'C',
        })
for f in touched:
    open(f, 'w', encoding='utf-8').write(json.dumps(data[f], ensure_ascii=False, indent=2) + '\n')
if new:
    out = {
        '_slice': 'eurostat-esms-hicp-2026-09-05', '_researched': DATE,
        '_note': "ESMS scripted pass (HANDOFF item 5, 2026-09-05): Eurostat's HICP national reference metadata (prc_hicp_esms{hi3,hi4}_<cc>.htm, section 18.1.1 'Weights') read for all 32 countries that publish one; sentences stating the weight source quoted verbatim. This slice holds only the edges that did not already exist; existing B/C edges were re-cited or quoted in place in their own slices (eu-national-chains-2026-08-28.json mostly). Sweden's page says the HBS 'is therefore not used as a source for the HICP weights' — no SE HBS edge, deliberately. Countries with an ESMS page but no HICP node in the corpus (CZ DE-HICP DK FR IT NL NO RO-HICP CH AL TR) are leads, recorded in _dropped.",
        'reports': [], 'dependencies': new,
        '_dropped': [
            {'report_id': f'{cc}-hicp', 'reason': 'note', 'note': f"LEAD 2026-09-05 (ESMS pass): Eurostat publishes HICP national reference metadata for {cc.upper()} (prc_hicp_esms{v}_{cc}.htm) but the corpus has no {cc.upper()} HICP node; the page names the weight sources and would wire it to the national accounts on minting. Not minted — node needs the NSI's own release page as url (rule: primary source)."}
            for cc, v in [('cz','hi3'),('dk','hi3'),('fr','hi4'),('it','hi3'),('nl','hi4'),('no','hi3'),('ch','hi3'),('al','hi3')]
        ] + [
            {'report_id': 'lu-statec-ipch', 'reason': 'note', 'note': "LEAD 2026-09-05 (ESMS pass): prc_hicp_esmshi4_lu.htm says 'The weights are estimated by the National Accounts' and 'the t-2 annual household budget survey (HBS), conducted by STATEC, is the main source' — but the corpus has no Luxembourg national-accounts or HBS node to point at. Two mint leads."},
            {'report_id': 'se-scb-hbs', 'reason': 'note', 'note': "NEGATIVE 2026-09-05 (ESMS pass): prc_hicp_esmshi4_se.htm: the 2022 HBS 'is still considered as \"statistics under development\" and the results are unreliable. It is therefore not used as a source for the HICP weights (HICPN) in 2025'. Do not mint se-scb-hikp -> se-scb-hbs."},
        ],
    }
    open('src/data/research/eurostat-esms-hicp-2026-09-05.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
print('new', len(new), [ (e['source_report_id'], e['target_report_id']) for e in new])
print('recited', len(recited), recited)
print('quoted', len(quoted), quoted)
print('skipped', skipped)
print('touched files', sorted(touched))
