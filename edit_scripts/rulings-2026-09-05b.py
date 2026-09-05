#!/usr/bin/env python3
"""Thomas's two rulings, 2026-09-05 (regroup after Round C). Idempotent.

1. DROP the 28 `ess-peer-review-final-report -> xx-ess-peer-review-report`
   edges (`ess-peer-review-country-reports.json`) as `no-document`: SWD(2024)136
   names no member state — the citation is at class level ("the peer-review
   reports for each ESS member"), which is the PLAYBOOK §7 naming-the-agency
   shape. Original basis/url/quote/grade preserved verbatim in `why`.
2. FLIP `ru-krasnoyarskstat-city-and-municipal -> ru-rosstat-municipal-indicators-database`
   in place (`ru-russia-grok-2026-08.json`): the only document found says the
   territorial organ LOADS its indicators INTO БД ПМО. The `caveat` on the old
   edge becomes `wrong-direction` (the old edge no longer exists live, so a
   caveat would fail validation); the `deferred` reverse becomes `resolved`.

Run from the repo root on BOTH machines; compare sha256 afterwards.
"""
import json, sys, os, hashlib

ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'
DATE = '2026-09-05'


def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def save(p, d):
    with open(p, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(d, indent=2, ensure_ascii=False) + '\n')


def sha(p):
    return hashlib.sha256(open(p, 'rb').read()).hexdigest()[:16]


# ---------- 1. SWD(2024)136 class-level edges ----------
p1 = os.path.join(ROOT, 'src/data/research/ess-peer-review-country-reports.json')
d1 = load(p1)
SRC = 'ess-peer-review-final-report'
keep, dropped = [], []
for e in d1['dependencies']:
    if e['source_report_id'] == SRC and e['target_report_id'].endswith('-ess-peer-review-report'):
        dropped.append(e)
    else:
        keep.append(e)
already = {x.get('edge') for x in d1['_dropped']}
n1 = 0
for e in dropped:
    edge = f"{e['source_report_id']} -> {e['target_report_id']}"
    if edge in already:
        continue
    orig = {k: v for k, v in e.items() if k not in ('source_report_id', 'target_report_id')}
    why = (
        f"DROPPED {DATE} (Thomas's ruling, regroup after Round C — class-level naming): "
        "SWD(2024) 136 final, read in full in Round C, names NO member state anywhere in its "
        "17 pages; it refers only to 'the peer-review reports for each ESS member'. Naming the "
        "class is the PLAYBOOK §7 shape — naming the agency/organisation is not naming the "
        "artefact — so no document states that the final report draws on THIS member report by "
        "name. The country enumeration exists only on Eurostat's peer-review listing page, which "
        "is an index page (§7) and not citable. The dependency is almost certainly real (the "
        "final report is the aggregate over the 32 member reviews); it can be re-minted from any "
        "document that names the member state's report — e.g. the Commission report's annex if one "
        "is published, or a Eurostat methodological note listing the reports reviewed. "
        f"Original entry follows (verbatim): {json.dumps(orig, ensure_ascii=False)}"
    )
    d1['_dropped'].append({
        'edge': edge,
        'source': e['source_report_id'],
        'target': e['target_report_id'],
        'reason': 'no-document',
        'why': why,
    })
    n1 += 1
d1['dependencies'] = keep
if n1:
    save(p1, d1)
print(f"1. ess-peer-review-country-reports: {len(dropped)} edges removed, {n1} _dropped entries added; sha {sha(p1)}")

# ---------- 2. Krasnoyarskstat flip ----------
p2 = os.path.join(ROOT, 'src/data/research/ru-russia-grok-2026-08.json')
d2 = load(p2)
A = 'ru-krasnoyarskstat-city-and-municipal'
B = 'ru-rosstat-municipal-indicators-database'
n2 = 0
for e in d2['dependencies']:
    if e['source_report_id'] == A and e['target_report_id'] == B:
        e['source_report_id'], e['target_report_id'] = B, A
        e['basis'] = (
            f"FLIPPED {DATE} (Thomas's direction ruling): was {A} -> {B}. " +
            e['basis'].replace(
                " CAVEAT: the document describes the regional indicators being loaded INTO the "
                "database, i.e. the database drawing on Krasnoyarskstat, which is the opposite of "
                "this edge's direction (kept as minted per the standing rule on direction "
                "conflicts; see _dropped caveat + deferred).",
                " The document describes the regional indicators being loaded INTO the database, "
                "i.e. the database drawing on Krasnoyarskstat — which is this edge's direction "
                "after the flip.")
        )
        n2 += 1
for x in d2['_dropped']:
    if x.get('source') == A and x.get('target') == B and x.get('reason') == 'caveat':
        x['reason'] = 'wrong-direction'
        x['why'] = (f"FLIPPED {DATE}: Thomas ruled flip; the live edge is now {B} -> {A} "
                    "(uses_data_from, same document, same quote, grade B). This entry records the "
                    "original arrow as wrong-direction. Original caveat follows: " + x['why'])
        n2 += 1
    elif x.get('source') == B and x.get('target') == A and x.get('reason') == 'deferred':
        x['reason'] = 'resolved'
        x['why'] = (f"RESOLVED {DATE}: Thomas ruled flip; minted by reversing the live edge in "
                    "place (uses_data_from, grade B on the same Krasnoyarskstat 2026 indicator "
                    "list). Original entry follows: " + x['why'])
        n2 += 1
if n2:
    save(p2, d2)
print(f"2. ru-russia-grok-2026-08: {n2} changes (expect 3 on first run, 0 after); sha {sha(p2)}")
