#!/usr/bin/env python3
"""kind fix, 2026-09-05. Idempotent.

HANDOFF §2 listed two nodes (`pl-gus-national-accounts`, `ch-bfs-national-accounts`)
carrying `kind: standard` although they are recurring publications. The cause is
the 2026-09-03 migration's STANDARD_RE, which matched the *title* — "National
accounts (ESA 2010)" names the standard it follows, so every such node became a
`standard`. The class is ~45 nodes, not two.

Rule applied: `kind == 'standard'` AND `releases_per_year >= 1` → `publication`.
A standard's cadence is "when revised" (Revamp §2.1) — a node released one or
more times a year is a series, not a standard. One exception kept by hand:
`ipsas` (the IPSAS Handbook is issued annually but IS the standard).

Left alone (fractional cadence, judgement needed — listed for Thomas):
GNI/QNA inventories (0.2–0.25), MGDD (0.33), R&D manual, NAICS (0.2), ICD-10-CA (0.3),
ICLS resolution (0.2), rw-nisr-nsdp (0.05).

Run from the repo root; `npm run validate` afterwards.
"""
import json, sys, os, glob

ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'
KEEP = {'ipsas'}

def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)

def save(p, d):
    with open(p, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(d, indent=2, ensure_ascii=False) + '\n')

changed = []
for p in sorted(glob.glob(os.path.join(ROOT, 'src/data/research/*.json'))):
    d = load(p)
    touched = False
    for r in d.get('reports', []):
        rpy = r.get('releases_per_year')
        if r.get('kind') == 'standard' and rpy is not None and rpy >= 1 and r['id'] not in KEEP:
            r['kind'] = 'publication'
            changed.append((os.path.basename(p), r['id'], rpy))
            touched = True
    if touched:
        save(p, d)

for fn, i, rpy in changed:
    print(f'{fn:45s} {i:45s} rpy={rpy}')
print(f'\n{len(changed)} node(s) standard -> publication')
