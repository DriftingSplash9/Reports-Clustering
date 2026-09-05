"""Flip 9 backwards edges found by the CJK span-floor round (Thomas: "flip",
2026-09-05). Krasnoyarskstat-style: the live edge is reversed in place (same
document, same quote), basis gets a FLIPPED prefix, and a `wrong-direction`
_dropped entry records the original arrow. Run on both machines; compare shas.
"""
import json
DATE = '2026-09-05'
FLIPS = [
  # file, old source, old target, one-line why
  ('jp-japan-grok-2026-08.json', 'jp-input-output-tables', 'jp-services-producer-price-index',
   "BOJ's CGPI FAQ: CGPI and SPPI weights rest on different statistics — '前者が経済産業省『工業統計表』および財務省『日本貿易月表』、後者が総務省『産業連関表』' — the latter (SPPI) on MIC's Input-Output Tables. SPPI depends on the I-O tables."),
  ('kr-south-korea-grok-2026-08.json', 'kr-eaps', 'kr-gender-statistics',
   "e-나라지표's women's economic-activity indicator lists '자료 출처 : 경제활동인구조사' — the gender statistics draw on the EAPS."),
  ('tw-taiwan-grok-2026-08.json', 'tw-statistics-act', 'tw-population-census',
   "The Statistics Act mandates the census ('中央主計機關應每十年至少辦理一次人口及住宅普查') — the census rests on the Act as its legal basis."),
  ('tw-taiwan-grok-2026-08.json', 'tw-cpi', 'tw-minimum-wage',
   "The Basic Wage Deliberation Measures require the committee to collect the CPI ('三、消費者物價指數。') — the wage deliberation uses the CPI."),
  ('tw-taiwan-grok-2026-08.json', 'tw-ppi-wpi', 'tw-minimum-wage',
   "Same Measures: '二、國產與進口品物價指數。' — the wage deliberation uses the producer/import price indices."),
  ('tw-taiwan-grok-2026-08.json', 'tw-national-accounts', 'tw-minimum-wage',
   "Same Measures: '四、國民所得與平均每人所得。' — the wage deliberation uses national income data."),
  ('tw-taiwan-grok-2026-08.json', 'tw-labour-productivity', 'tw-minimum-wage',
   "Same Measures: '五、各業勞動生產力及就業狀況。' — the wage deliberation uses labour-productivity data."),
  ('tw-taiwan-grok-2026-08.json', 'tw-labour-force', 'tw-minimum-wage',
   "Same Measures: '五、各業勞動生產力及就業狀況。' — the wage deliberation uses employment-status data."),
  ('tw-taiwan-grok-2026-08.json', 'tw-household-income-expenditure', 'tw-minimum-wage',
   "Same Measures: '七、家庭收支調查統計。' — the wage deliberation uses the Family Income and Expenditure Survey."),
]
for f, s, t, why in FLIPS:
    p = f'src/data/research/{f}'
    d = json.load(open(p, encoding='utf-8'))
    hits = [e for e in d['dependencies'] if e['source_report_id'] == s and e['target_report_id'] == t]
    assert len(hits) == 1, (f, s, t, len(hits))
    e = hits[0]
    assert not any(x['source_report_id'] == t and x['target_report_id'] == s for x in d['dependencies']), 'reverse exists'
    old_basis = e['basis']
    e['source_report_id'], e['target_report_id'] = t, s
    e['basis'] = f"FLIPPED {DATE} (Thomas's direction ruling, CJK span-floor round): was {s} -> {t}. {why} Original basis: {old_basis}"
    d.setdefault('_dropped', []).append({
        'edge': f'{s} -> {t}', 'source': s, 'target': t, 'reason': 'wrong-direction',
        'why': f"FLIPPED {DATE}: Thomas ruled flip; the live edge is now {t} -> {s} ({e['relationship_type']}, same document, same quote). This entry records the original arrow as wrong-direction. {why}",
    })
    open(p, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=2) + '\n')
    print('flipped', s, '->', t)
