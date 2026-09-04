#!/usr/bin/env python3
"""2026-09-04 — Thomas's rulings on HANDOFF items 1 and 4.

Item 1: flip the 18 direction-suspect edges in place (source<->target); record
        each original as a `wrong-direction` _dropped note (precedent:
        jp-japan-grok-2026-08.json's jp-family-income-expenditure -> jp-cpi).
Item 4: move the confirmed-404 dead-URL edges to _dropped `no-document`,
        original preserved verbatim. Only URLs that 404'd on BOTH 2026-09-03
        (grader, sandbox) and 2026-09-04 (bridge VM re-check) are dropped.

Usage: python3 flip-and-drop-2026-09-04.py [--write]
"""
import json, glob, os, sys, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(ROOT, 'src/data/research')
OUT = os.path.join(ROOT, 'Claude outputs')
WRITE = '--write' in sys.argv
TODAY = '2026-09-04'

def load(f): return json.load(open(f, encoding='utf-8'))
def dump(f, d):
    with open(f, 'w', encoding='utf-8', newline='\n') as fh:
        json.dump(d, fh, indent=2, ensure_ascii=False); fh.write('\n')

files = {os.path.basename(f): load(f) for f in sorted(glob.glob(R + '/*.json'))}
live = collections.defaultdict(list)      # (s,t) -> [file]
notes = collections.defaultdict(list)     # (s,t) -> [(file, reason)]
for fn, d in files.items():
    for dep in d.get('dependencies', []):
        live[(dep['source_report_id'], dep['target_report_id'])].append(fn)
    for n in d.get('_dropped', []):
        if n.get('source') and n.get('target'):
            notes[(n['source'], n['target'])].append((fn, n['reason']))
seed = open(os.path.join(ROOT, 'src/data/dependencies.ts'), encoding='utf-8').read()

errors = []
retarget = []
# ---------- item 1: flips ----------
rows = load(os.path.join(OUT, 'direction-suspect-jp-kr-2026-09-03.json'))['rows']
flip_log = []
for r in rows:
    s, t, fn = r['source'], r['target'], r['file']
    if live.get((s, t)) != [fn]: errors.append(f'flip: {s}->{t} not exactly once live in {fn}: {live.get((s,t))}')
    if live.get((t, s)): errors.append(f'flip: reverse {t}->{s} already live in {live[(t,s)]}')
    for nf, reason in notes.get((t, s), []):
        if reason not in ('caveat', 'resolved'): errors.append(f'flip: reverse {t}->{s} has a {reason} note in {nf} (rule 14)')
    for nf, reason in notes.get((s, t), []):
        if reason in ('caveat', 'resolved'): retarget.append((nf, s, t))   # re-point the note at the flipped edge
    if f"'{t}'" in seed and f"'{s}'" in seed: errors.append(f'flip: check seed dependencies.ts for {s}/{t}')

# ---------- item 4: dead URLs ----------
dead = load(os.path.join(OUT, 'grade-batch2-debt-2026-09-03.json'))['dead_urls']
recheck = {}
for line in open(os.path.expanduser('~/dead404-recheck.txt'), encoding='utf-8'):
    code, url = line.strip().split(' ', 1); recheck[url] = code
drop, keep = [], []
for e in dead:
    k = (e['source'], e['target'])
    if e['reason'] != 'dead:http-404':
        keep.append((e, 'wall-or-transient:' + e['reason'])); continue
    code = recheck.get(e['evidence_url'])
    if code != '404':
        keep.append((e, f'recheck-{code}')); continue
    if live.get(k) != [e['file']]: errors.append(f'drop: {k} live in {live.get(k)}, expected [{e["file"]}]')
    for nf, reason in notes.get(k, []):
        if reason in ('caveat', 'resolved'): errors.append(f'drop: {k} has a {reason} note in {nf} that will dangle')
    drop.append(e)

print(f'flips: {len(rows)}   drops: {len(drop)}   kept live: {len(keep)}')
for e, why in keep: print('  keep', e['source'], '->', e['target'], why)
if errors:
    print('\n'.join('ERROR ' + x for x in errors)); sys.exit(1)
if not WRITE: print('dry run — pass --write'); sys.exit(0)

# ---------- apply ----------
def find(fn, s, t):
    for i, dep in enumerate(files[fn]['dependencies']):
        if dep['source_report_id'] == s and dep['target_report_id'] == t: return i
    raise KeyError((fn, s, t))

def verbatim(dep):
    return ', '.join(f"{k}={json.dumps(v, ensure_ascii=False)}" for k, v in dep.items())

touched = set()
for r in rows:
    s, t, fn = r['source'], r['target'], r['file']
    i = find(fn, s, t)
    dep = files[fn]['dependencies'][i]
    orig = verbatim(dep)
    dep['source_report_id'], dep['target_report_id'] = t, s
    dep['basis'] = dep['basis'].rstrip() + f" (Direction flipped {TODAY}: the basis names {t} as the consumer of {s}; the edge was minted the other way round — Thomas's ruling on HANDOFF item 1, list in Claude outputs/direction-suspect-jp-kr-2026-09-03.json.)"
    files[fn].setdefault('_dropped', []).append({
        'edge': f'{s} -> {t}', 'source': s, 'target': t, 'reason': 'wrong-direction',
        'why': f"WRONG-DIRECTION ({TODAY}, Thomas's ruling on HANDOFF item 1; flagged by round 4 / round A, Claude outputs/direction-suspect-jp-kr-2026-09-03.json): the edge's own basis states that {t} uses {s}, so {t} is the consumer and must be source_report_id. Flipped in place to {t} -> {s} in this file (grade and citation carried over unchanged — the direction criterion is still not machine-checked). Original entry preserved verbatim: {orig}."
    })
    flip_log.append({'file': fn, 'was': f'{s} -> {t}', 'now': f'{t} -> {s}', 'relationship_type': dep['relationship_type'], 'evidence_grade': dep.get('evidence_grade')})
    touched.add(fn)

for nf, s, t in retarget:
    for n in files[nf]['_dropped']:
        if n.get('source') == s and n.get('target') == t and n['reason'] in ('caveat', 'resolved'):
            n['source'], n['target'] = t, s
            n['edge'] = f'{t} -> {s}'
            n['why'] = f"[{TODAY}: the live edge this caveat annotates was flipped to {t} -> {s} (HANDOFF item 1 ruling) — which is the direction this note itself argued for; source/target re-pointed so the caveat still names the live edge.] " + n['why']
            touched.add(nf)

drop_log = []
for e in drop:
    fn, s, t = e['file'], e['source'], e['target']
    i = find(fn, s, t)
    dep = files[fn]['dependencies'].pop(i)
    files[fn].setdefault('_dropped', []).append({
        'edge': f'{s} -> {t}', 'source': s, 'target': t, 'reason': 'no-document',
        'why': f"DEAD-URL ({TODAY}, Thomas's ruling on HANDOFF item 4, 'drop'): evidence_url {e['evidence_url']} returned HTTP 404 on 2026-09-03 (grader, corpus-wide pass, Claude outputs/grade-batch2-debt-2026-09-03.json) and again on {TODAY} from the bridge VM with a browser UA. Link rot, not a wall — no readable document currently states the dependency, so the edge cannot stay live (PLAYBOOK §7, assertion-only edges). Lead: the dependency may well be real; re-cite from a live document and re-mint. Original entry preserved verbatim: {verbatim(dep)}."
    })
    drop_log.append({'file': fn, 'edge': f'{s} -> {t}', 'evidence_url': e['evidence_url'], 'evidence_grade': dep.get('evidence_grade')})
    touched.add(fn)

for fn in sorted(touched): dump(os.path.join(R, fn), files[fn])
dump(os.path.join(OUT, f'direction-flips-{TODAY}.json'), {'generated': TODAY, 'count': len(flip_log), 'rows': flip_log})
dump(os.path.join(OUT, f'dead-url-drops-{TODAY}.json'), {'generated': TODAY, 'dropped': len(drop_log), 'kept_live': [{'edge': f"{e['source']} -> {e['target']}", 'file': e['file'], 'evidence_url': e['evidence_url'], 'why_kept': w} for e, w in keep], 'rows': drop_log})
print('wrote', len(touched), 'slice files')
