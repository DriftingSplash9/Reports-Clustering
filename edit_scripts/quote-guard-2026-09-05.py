#!/usr/bin/env python3
"""DSBB source-node review + quote guard, 2026-09-05 (Thomas: "1 drop, 2 apply
your grades, 3 go"). Idempotent; run from the repo root on both machines.

A. Three DSBB edges whose auto-matched SOURCE node is the wrong report → `_dropped`
   `wrong-target` (Iran: SCI node, SoM says CBI compiles; France: annual node, SoM
   is quarterly; Philippines: national-government node, SoM is general government).
B. `mm-national-accounts -> isic` → `_dropped` `denied` (quote: "not in conformity").
C. `mm-national-accounts -> sna-2008` retargeted in place to `sna-1968` (the quote
   names SNA 1968 as what the accounts follow), grade B (hedged: "broadly follows").
D. Every other edge the new quote guard (`grade-evidence.ts --scan-quotes`) caught
   at A → grade B, with the guard's label and phrase written into the basis so the
   grade and the grader agree and the reason is on the record. 19 edges.

Evidence-cache records still carry the old grade/reason until the grader next
touches these URLs; the slice is the source of truth.
"""
import json, sys, os, hashlib

ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'
R = os.path.join(ROOT, 'src/data/research')
DATE = '2026-09-05'
DSBB = 'dsbb-som-import-2026-09-05.json'


def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def save(p, d):
    with open(p, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(d, indent=2, ensure_ascii=False) + '\n')


def sha(p):
    return hashlib.sha256(open(p, 'rb').read()).hexdigest()[:16]


def orig(e):
    return json.dumps({k: v for k, v in e.items() if k not in ('source_report_id', 'target_report_id')}, ensure_ascii=False)


changed = {}


def touch(fname):
    changed[fname] = True


# ---------- A + B: drops ----------
DROPS = {
    ('ir-national-accounts', 'sna-1968'): ('wrong-target',
        "DROPPED {d} (DSBB source-node review, Thomas: drop): the SoM quote itself says 'The Central Bank of Iran "
        "(CBI) compiles and publishes Iran's national accounts statistics' — the auto-matched source node is the "
        "Statistical Centre of Iran's series, a different compiler's release. The dependency (CBI national accounts "
        "-> SNA 1968/1993, ISIC Rev. 2/3) is real and A-grade on this document once a CBI national-accounts node "
        "exists. To re-mint: mint the CBI series (cbi.ir national accounts) and re-point this edge at it."),
    ('fr-insee-national-accounts', 'sna-2008'): ('wrong-target',
        "DROPPED {d} (DSBB source-node review, Thomas: drop): the SoM sentence is about 'French Quarterly National "
        "Accounts'; the auto-matched source node is INSEE's ANNUAL accounts (2020 base). Same compiler, different "
        "release. To re-mint: point at INSEE's quarterly national accounts node if one exists (or mint it)."),
    ('ph-fiscal-ops', 'imf-gfsm'): ('wrong-target',
        "DROPPED {d} (DSBB source-node review, Thomas: drop): DSBB category GGO00 is GENERAL government operations "
        "and the quote describes 'the analytical framework for the general government'; the auto-matched source node "
        "is DBM's NATIONAL government fiscal operations. To re-mint: a general-government GFS release (BTr/DOF) as source."),
    ('mm-national-accounts', 'isic'): ('denied',
        "DROPPED {d} (quote guard, Thomas: apply): the quoted sentence DENIES the dependency — 'Classifications used "
        "by the PD are not in conformity with the internationally recommended systems, such as International Standard "
        "Industrial Classification of All Economic Activities (ISIC).' Graded A by the name-match bar, which cannot "
        "read negation; the new NEGATED_QUOTE_PATTERNS guard in grade-evidence.ts now caps this shape."),
}

# ---------- D: guard caps (label, phrase) — from `--scan-quotes` on the same day ----------
CAPS = {
    ('bo-cuentas-nacionales', 'sna-1993'): ('quote-future-or-partial', 'plans to publish'),
    ('bt-national-accounts', 'sna-1968'): ('quote-hedged', 'broadly follows'),
    ('cl-presupuesto-nacional', 'imf-gfsm'): ('quote-divergence', 'deviations'),
    ('eg-cbe-bop', 'imf-bpm6'): ('quote-future-or-partial', 'migrate to'),
    ('et-gdp-national-accounts', 'sna-1993'): ('quote-divergence', 'except in'),
    ('il-international-investment-position', 'imf-bpm6'): ('quote-future-or-partial', 'gradually'),
    ('it-bdi-bop', 'imf-bpm6'): ('quote-divergence', 'deviations'),
    ('la-national-accounts', 'isic'): ('quote-future-or-partial', 'transitioning to'),
    ('lk-national-accounts', 'sna-1993'): ('quote-future-or-partial', 'partly'),
    ('ru-minfin-federal-budget-execution', 'imf-gfsm'): ('quote-hedged', 'not very different from'),
    ('sg-cpi', 'un-coicop-2018'): ('quote-hedged', 'broadly aligned'),
    ('sr-bop', 'imf-bpm6'): ('quote-hedged', 'broadly consistent'),
    ('sr-pib', 'sna-1993'): ('quote-hedged', 'broadly consistent'),
    ('sy-national-accounts', 'sna-1993'): ('quote-future-or-partial', 'underway'),
    ('tt-national-accounts', 'isic'): ('quote-future-or-partial', 'working with its key administrative data partners to ensure'),
    ('uy-deuda-publica', 'imf-gfsm'): ('quote-divergence', 'may differ'),
    ('ye-national-accounts', 'sna-1993'): ('quote-hedged', 'mainly follow'),
    ('id-bop', 'imf-bpm6'): ('quote-hedged', 'generally follow'),
    ('vn-monetary-indicators', 'imf-mfsmcg-2016'): ('quote-negated', 'not fully in line with'),
}
EXTRA_NOTE = {
    ('sr-bop', 'imf-bpm6'): " NOTE: the quote names BPM5 as the compilation basis and BPM6 only 'for some components' — "
                            "the better target is a BPM5 node, which the corpus does not have.",
    ('la-national-accounts', 'isic'): " NOTE: the transition phrase is about the SNA, not ISIC; the ISIC Rev. 4 naming "
                                      "itself is positive. Reviewer may restore A.",
}
GUARD_TAG = f'QUOTE GUARD {DATE}'

done_drops, done_caps, done_retarget = 0, 0, 0
for fname in sorted(os.listdir(R)):
    if not fname.endswith('.json') or fname.startswith('_'):
        continue
    p = os.path.join(R, fname)
    d = load(p)
    deps = d.get('dependencies') or []
    dropped = d.setdefault('_dropped', [])
    already = {x.get('edge') for x in dropped}
    keep = []
    dirty = False
    for e in deps:
        key = (e['source_report_id'], e['target_report_id'])
        if key in DROPS:
            reason, why = DROPS[key]
            edge = f'{key[0]} -> {key[1]}'
            if edge not in already:
                dropped.append({'edge': edge, 'source': key[0], 'target': key[1], 'reason': reason,
                                'why': why.format(d=DATE) + ' Original entry follows (verbatim): ' + orig(e)})
            done_drops += 1
            dirty = True
            continue
        # C: retarget
        if key == ('mm-national-accounts', 'sna-2008') and fname == DSBB:
            e['target_report_id'] = 'sna-1968'
            e['evidence_grade'] = 'B'
            e['basis'] = (f"RETARGETED {DATE} (quote guard, Thomas: apply): was -> sna-2008. The quote says the accounts "
                          "'broadly follow the concepts and definitions of the System of National Accounts 1968' and that "
                          "1993/2008 changes 'are being implemented' — SNA 1968 is what is named as the basis; 2008 is a "
                          "lead (see candidates-tier-wiring-2026-08-28.json _dropped, deferred). "
                          f"{GUARD_TAG} (quote-hedged: 'broadly follows'): capped at B. " + e['basis'])
            done_retarget += 1
            dirty = True
        elif key in CAPS and e.get('evidence_grade') == 'A' and GUARD_TAG not in e.get('basis', ''):
            label, phrase = CAPS[key]
            e['evidence_grade'] = 'B'
            e['basis'] = (f"{GUARD_TAG} ({label}: '{phrase}'): capped at B — the quote names the standard but "
                          "denies, qualifies or defers the dependency in the same sentence; the name-match A bar cannot "
                          "see that. Grader now applies NEGATED_QUOTE_PATTERNS, so a --write run agrees."
                          + EXTRA_NOTE.get(key, '') + ' ' + e['basis'])
            done_caps += 1
            dirty = True
        keep.append(e)
    if dirty:
        d['dependencies'] = keep
        save(p, d)
        touch(fname)

print(f'drops {done_drops} (expect 4 first run) · retarget {done_retarget} (expect 1) · caps {done_caps} (expect 19)')
for f in sorted(changed):
    print(f'  changed {f}  sha {sha(os.path.join(R, f))}')
