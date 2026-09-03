# -*- coding: utf-8 -*-
"""
Schema + validator round migration (2026-09-03).
Applied once, on the live corpus, by a script rather than by hand.
See HANDOFF.md Todo item 1 / notes/Midvamp - Revamp.md section 9 item 1.
"""
import json, glob, re, io, sys

ROOT = 'src/data/research'
files = {}

def load_all():
    for fn in sorted(glob.glob(f'{ROOT}/*.json')):
        files[fn] = json.load(open(fn, encoding='utf-8'))

def save_all():
    for fn, d in files.items():
        with io.open(fn, 'w', encoding='utf-8', newline='\n') as f:
            f.write(json.dumps(d, indent=2, ensure_ascii=False) + '\n')

log = []

def find_report(rid):
    for fn, d in files.items():
        for r in d.get('reports', []):
            if r['id'] == rid:
                return fn, r
    return None, None

def find_dep(source, target):
    for fn, d in files.items():
        for dep in d.get('dependencies', []):
            if dep['source_report_id'] == source and dep['target_report_id'] == target:
                return fn, dep
    return None, None

def remove_dep(source, target):
    fn, dep = find_dep(source, target)
    if dep is None:
        return None
    files[fn]['dependencies'].remove(dep)
    return dep

def append_dropped(fn, edge_str, source, target, reason, why):
    files[fn].setdefault('_dropped', []).append({
        'edge': edge_str, 'source': source, 'target': target, 'reason': reason, 'why': why,
    })

def dep_summary(dep):
    return (f"relationship_type={dep['relationship_type']}, "
            f"evidence_url={dep.get('evidence_url')!r}, "
            f"evidence_quote={dep.get('evidence_quote')!r}")

load_all()

# ============================================================
# STEP 1 — kind backfill
# ============================================================
STANDARD_RE = re.compile(
    r'\b(SNA|ESA|COICOP|ISIC|BPM\d|GFSM|SDDS|GDDS|ICLS|MFSM|IPSAS|IFRS|IAS|NACE|NAICS|'
    r'Harmonized System|ICD-\d+|Oslo Manual|System of National Accounts|COFOG|ISCO|SITC|'
    r'Balance of Payments(?: and International Investment Position)? Manual|'
    r'Government Finance Statistics Manual|International Standard Industrial Classification|'
    r'Classification of Individual Consumption|International Statistical Classification)\b',
    re.I)
INSTRUMENT_WORD_RE = re.compile(
    r'\b(Regulation|Act|Decree|Treaty|Statute|Directive|Ordinance|Constitution|Convention|'
    r'Agreement|Decision No|Order|Proclamation|Law No)\b', re.I)
EXCLUDE_STANDARD_RE = re.compile(r'Inventory of the methods', re.I)

kind_counts = {'publication': 0, 'standard': 0, 'instrument': 0}
for fn, d in files.items():
    for r in d.get('reports', []):
        title = r['title']
        if STANDARD_RE.search(title) and not INSTRUMENT_WORD_RE.search(title) and not EXCLUDE_STANDARD_RE.search(title):
            k = 'standard'
        elif r.get('releases_per_year') is not None:
            k = 'publication'
        else:
            k = 'instrument'
        r['kind'] = k
        kind_counts[k] += 1
log.append(f"STEP 1 kind backfill: {kind_counts} (total {sum(kind_counts.values())})")

print("\n".join(log))

# ============================================================
# STEP 2 — JP/KR reversed edges -> _dropped (wrong-direction)
# ============================================================
JP_KR_REVERSED = [
    ('jp-family-income-expenditure', 'jp-cpi'),
    ('jp-retail-price-survey', 'jp-cpi'),
    ('jp-population-census', 'jp-labour-force-survey'),
    ('kr-household-income-expenditure', 'kr-cpi'),
    ('kr-population-census', 'kr-eaps'),
]
n2 = 0
for source, target in JP_KR_REVERSED:
    fn, dep = find_dep(source, target)
    assert dep is not None, f"missing {source}->{target}"
    twin_fn, twin = find_dep(target, source)
    assert twin is not None, f"missing twin {target}->{source}"
    dep = remove_dep(source, target)
    why = (
        f"WRONG-DIRECTION (2026-09-03 schema+validator round, independent audit "
        f"2026-09-02 finding A5): this edge's own basis states the opposite direction "
        f"of what source_report_id/target_report_id assert -- \"{dep['basis']}\" -- and "
        f"its correct twin, {target} -> {source} ({twin['relationship_type']}), is live "
        f"({twin_fn}). Original entry preserved verbatim: {dep_summary(dep)}."
    )
    append_dropped(fn, f"{source} -> {target}", source, target, 'wrong-direction', why)
    n2 += 1
log.append(f"STEP 2 JP/KR reversed edges moved to _dropped: {n2}")

# ============================================================
# STEP 3 — BR mutual "complementary" pair -> _dropped (deferred)
# ============================================================
BR_PAIR = [
    ('br-bcb-nota-fiscal-abaixo-linha', 'br-stn-resultado-tesouro-nacional'),
    ('br-stn-resultado-tesouro-nacional', 'br-bcb-nota-fiscal-abaixo-linha'),
]
n3 = 0
for source, target in BR_PAIR:
    fn, dep = find_dep(source, target)
    assert dep is not None, f"missing {source}->{target}"
    dep = remove_dep(source, target)
    why = (
        f"DEFERRED (2026-09-03 schema+validator round, independent audit 2026-09-02 "
        f"finding A5): 'analytically complementary ... reference each other' is the "
        f"'consistent with' shape the 2026-08-31 audit ruled out (PLAYBOOK) -- basis "
        f"describes two measures used alongside one another, not a computational or "
        f"methodological dependency of one on the other. Original entry preserved "
        f"verbatim: {dep_summary(dep)}."
    )
    append_dropped(fn, f"{source} -> {target}", source, target, 'deferred', why)
    n3 += 1
log.append(f"STEP 3 BR complementary pair moved to _dropped: {n3}")

# ============================================================
# STEP 4 — mutual: true on the 3 genuine bidirectional pairs
# ============================================================
MUTUAL_PAIRS = [
    ('nz-public-audit-act-2001', 'nz-public-finance-act-1989'),
    ('nz-public-finance-act-1989', 'nz-public-audit-act-2001'),
    ('statcan-sut', 'statcan-ippi'),
    ('statcan-ippi', 'statcan-sut'),
    ('statcan-national-accounts', 'statcan-sut'),
    ('statcan-sut', 'statcan-national-accounts'),
]
n4 = 0
for source, target in MUTUAL_PAIRS:
    fn, dep = find_dep(source, target)
    assert dep is not None, f"missing {source}->{target}"
    dep['mutual'] = True
    n4 += 1
log.append(f"STEP 4 mutual:true flagged: {n4} edges (3 pairs)")

print("\n".join(log))

# ============================================================
# STEP 5 — merge et-cpi into et-ess-cpi (ruling 4-A)
# ============================================================
fold_log = {'_note': (
    "Nodes retired 2026-09-03 by the schema+validator round's duplicate/edition "
    "folds (ruling 4-A: 'merge et-cpi into et-ess-cpi and fold the BRICS JSP family "
    "under brics-jsp with part_of/supersedes' + Midvamp Sec 2.1 'fold the per-year "
    "auditor-general reports (BW, LS, MU) accordingly'). Full records preserved "
    "verbatim; edges they carried were repointed to the surviving canonical id, or "
    "dropped where repointing would have produced a duplicate or self-loop edge."
), 'retired_nodes': [], 'edges_repointed': [], 'edges_dropped_as_structural': []}

def retire_node(rid, canonical_id, reason_note):
    fn, r = find_report(rid)
    assert r is not None, f"report {rid} not found"
    files[fn]['reports'].remove(r)
    fold_log['retired_nodes'].append({'id': rid, 'folded_into': canonical_id, 'note': reason_note, 'record': r})
    return fn, r

def repoint_edge(old_source, old_target, new_source, new_target):
    """Repoint one edge's endpoints. Errors if it would create a self-loop or duplicate; caller handles those."""
    fn, dep = find_dep(old_source, old_target)
    assert dep is not None, f"missing {old_source}->{old_target}"
    if new_source == new_target:
        files[fn]['dependencies'].remove(dep)
        fold_log['edges_dropped_as_structural'].append({
            'was': f"{old_source} -> {old_target}", 'reason': 'became a self-loop after folding editions into one series node',
            'record': dep,
        })
        return None
    dup_fn, dup = find_dep(new_source, new_target)
    if dup is not None and dup is not dep:
        files[fn]['dependencies'].remove(dep)
        fold_log['edges_dropped_as_structural'].append({
            'was': f"{old_source} -> {old_target}", 'reason': f"duplicate of the already-live {new_source} -> {new_target} after folding",
            'record': dep,
        })
        return None
    dep['source_report_id'] = new_source
    dep['target_report_id'] = new_target
    fold_log['edges_repointed'].append({'was': f"{old_source} -> {old_target}", 'now': f"{new_source} -> {new_target}"})
    return dep

# et-cpi's one live edge: et-cpi -> et-statistics-proclamation
repoint_edge('et-cpi', 'et-statistics-proclamation', 'et-ess-cpi', 'et-statistics-proclamation')
retire_node('et-cpi', 'et-ess-cpi',
    "Duplicate CPI node for Ethiopia (identical title/publisher/country as et-ess-cpi, "
    "differing only by a one-letter publisher spelling) -- audit A4.")
log.append("STEP 5 et-cpi merged into et-ess-cpi: 1 node retired, 1 edge repointed")

print("\n".join(log))

# ============================================================
# STEP 6 — fold the BRICS JSP family under brics-jsp (ruling 4-A)
# ============================================================
n6 = 0
# cn-statistical-yearbook -> brics-jsp-2024 : repoint to brics-jsp (dup of existing edge -> dropped as structural, basis is preserved in fold_log)
repoint_edge('cn-statistical-yearbook', 'brics-jsp-2024', 'cn-statistical-yearbook', 'brics-jsp'); n6 += 1
# in-mea-annual-report -> in-brics-jsp-india : repoint to brics-jsp (no existing dup)
repoint_edge('in-mea-annual-report', 'in-brics-jsp-india', 'in-mea-annual-report', 'brics-jsp'); n6 += 1
# brics-jsp-snapshot -> brics-jsp : becomes a self-loop once brics-jsp-snapshot folds into brics-jsp
repoint_edge('brics-jsp-snapshot', 'brics-jsp', 'brics-jsp', 'brics-jsp'); n6 += 1

for rid in ['brics-jsp-2024', 'brics-jsp-snapshot', 'brics-jsp-snapshot-2025', 'in-brics-jsp-india']:
    retire_node(rid, 'brics-jsp',
        "Edition of the BRICS Joint Statistical Publication series -- editions are never "
        "their own node (Midvamp Sec 2.1); the edition is named in the citing edge's basis instead.")
log.append(f"STEP 6 BRICS JSP family folded under brics-jsp: 4 nodes retired, {n6} edges repointed")

# ============================================================
# STEP 7 — fold per-year auditor-general reports (BW, LS, MU) (Midvamp Sec 2.1)
# ============================================================
n7 = 0

# --- BW: bw-auditor-general-report-2018-2019 / -2019-2020 / -2020-2021 -> bw-auditor-general-report
BW_EDITIONS = ['bw-auditor-general-report-2018-2019', 'bw-auditor-general-report-2019-2020', 'bw-auditor-general-report-2020-2021']
bw_fn, bw_latest = find_report('bw-auditor-general-report-2020-2021')
bw_canonical = dict(bw_latest)
bw_canonical['id'] = 'bw-auditor-general-report'
bw_canonical['title'] = 'Report of the Auditor-General on the Accounts of the Botswana Government'
bw_canonical['description'] = (
    "Series node folding three editions (FY2018-19, FY2019-20, FY2020-21) as one "
    "annual Auditor-General reporting series -- editions are never their own node "
    "(Midvamp Sec 2.1); each edition's specific findings stay in the citing edges' own "
    "basis text. " + bw_latest['description']
)
bw_canonical['cadence_note'] = "Annual statutory audit report; three consecutive editions (FY2018-19 through FY2020-21) confirm the annual cadence."
bw_canonical['releases_per_year'] = 1
bw_canonical['kind'] = 'publication'
files[bw_fn]['reports'].append(bw_canonical)
repoint_edge('bw-auditor-general-report-2018-2019', 'bw-local-government-act-2012', 'bw-auditor-general-report', 'bw-local-government-act-2012'); n7 += 1
repoint_edge('bw-auditor-general-report-2019-2020', 'bw-local-government-act-2012', 'bw-auditor-general-report', 'bw-local-government-act-2012'); n7 += 1
repoint_edge('bw-auditor-general-report-2020-2021', 'bw-auditor-general-report-2019-2020', 'bw-auditor-general-report', 'bw-auditor-general-report'); n7 += 1
for rid in BW_EDITIONS:
    retire_node(rid, 'bw-auditor-general-report', "Per-year edition of Botswana's Auditor-General report series -- folded per Midvamp Sec 2.1.")

log.append(f"STEP 7a BW auditor-general editions folded: 3 nodes retired, edges repointed so far {n7}")
print("\n".join(log))

# --- LS: ls-auditor-general-report-2020/2021/2022 -> ls-auditor-general-report (cfs-2024 stays separate)
LS_EDITIONS = ['ls-auditor-general-report-2020', 'ls-auditor-general-report-2021', 'ls-auditor-general-report-2022']
ls_fn, ls_latest = find_report('ls-auditor-general-report-2022')
ls_canonical = dict(ls_latest)
ls_canonical['id'] = 'ls-auditor-general-report'
ls_canonical['title'] = 'Report of the Auditor-General, Kingdom of Lesotho'
ls_canonical['description'] = (
    "Series node folding three editions (FY2020, FY2021, FY2022) as one annual "
    "Auditor-General reporting series -- editions are never their own node (Midvamp "
    "Sec 2.1); each edition's specific findings stay in the citing edges' own basis "
    "text. Distinct from ls-auditor-general-cfs-2024 (a differently-scoped "
    "Consolidated Financial Statements audit, not folded here -- see audit A4). " + ls_latest['description']
)
ls_canonical['cadence_note'] = "Annual statutory audit report; three consecutive editions (FY2020 through FY2022) confirm the annual cadence."
ls_canonical['releases_per_year'] = 1
ls_canonical['kind'] = 'publication'
files[ls_fn]['reports'].append(ls_canonical)

# repoint the one live edge (2022 -> Act) and its attached caveat note
repoint_edge('ls-auditor-general-report-2022', 'ls-local-government-service-act-2008', 'ls-auditor-general-report', 'ls-local-government-service-act-2008')
for note in files[ls_fn].get('_dropped', []):
    if note.get('source') == 'ls-auditor-general-report-2022' and note.get('target') == 'ls-local-government-service-act-2008':
        note['source'] = 'ls-auditor-general-report'
        note['why'] = "(source id updated 2026-09-03 -- folded into ls-auditor-general-report, Midvamp Sec 2.1) " + note['why']
n_ls_caveat = 1
for rid in LS_EDITIONS:
    retire_node(rid, 'ls-auditor-general-report', "Per-year edition of Lesotho's Auditor-General report series -- folded per Midvamp Sec 2.1.")
log.append(f"STEP 7b LS auditor-general editions folded: 3 nodes retired, 1 edge + 1 caveat note repointed")

# --- MU: mu-nao-rra-audit-2014 / -2019-20 -> mu-nao-rra-audit
MU_EDITIONS = ['mu-nao-rra-audit-2014', 'mu-nao-rra-audit-2019-20']
mu_fn, mu_latest = find_report('mu-nao-rra-audit-2019-20')
mu_canonical = dict(mu_latest)
mu_canonical['id'] = 'mu-nao-rra-audit'
mu_canonical['title'] = 'National Audit Office -- Audit Report on the Accounts of the Rodrigues Regional Assembly'
mu_canonical['description'] = (
    "Series node folding two editions (FY2014, FY2019-20) of NAO's Rodrigues Regional "
    "Assembly audit series -- editions are never their own node (Midvamp Sec 2.1); "
    "each edition's specific findings stay in the citing edges' own basis text. " + mu_latest['description']
)
mu_canonical['cadence_note'] = "Annual audit report; part of NAO's dedicated Rodrigues Regional Assembly report series."
mu_canonical['releases_per_year'] = 1
mu_canonical['kind'] = 'publication'
files[mu_fn]['reports'].append(mu_canonical)
repoint_edge('mu-nao-rra-audit-2014', 'mu-rodrigues-regional-assembly-act-2001', 'mu-nao-rra-audit', 'mu-rodrigues-regional-assembly-act-2001')
repoint_edge('mu-nao-rra-audit-2019-20', 'mu-rodrigues-regional-assembly-act-2001', 'mu-nao-rra-audit', 'mu-rodrigues-regional-assembly-act-2001')
for rid in MU_EDITIONS:
    retire_node(rid, 'mu-nao-rra-audit', "Per-year edition of Mauritius NAO's Rodrigues Regional Assembly audit series -- folded per Midvamp Sec 2.1.")
log.append(f"STEP 7c MU NAO RRA audit editions folded: 2 nodes retired, edges repointed (1 duplicate collapsed)")

print("\n".join(log))
print("edges_dropped_as_structural so far:", len(fold_log['edges_dropped_as_structural']))
print("retired_nodes so far:", len(fold_log['retired_nodes']))

# ============================================================
# STEP 8 — retype methodology_depends_on -> legal_basis where target.kind == 'instrument'
# (generator, not by hand -- Midvamp Sec 9 item 1 / types.ts RelationshipType doc)
# ============================================================
kind_by_id = {}
for fn, d in files.items():
    for r in d.get('reports', []):
        kind_by_id[r['id']] = r['kind']

n8 = 0
retyped_examples = []
for fn, d in files.items():
    for dep in d.get('dependencies', []):
        if dep['relationship_type'] == 'methodology_depends_on' and kind_by_id.get(dep['target_report_id']) == 'instrument':
            dep['relationship_type'] = 'legal_basis'
            n8 += 1
            if len(retyped_examples) < 15:
                retyped_examples.append(f"{dep['source_report_id']} -> {dep['target_report_id']}")
log.append(f"STEP 8 methodology_depends_on -> legal_basis retype: {n8} edges")

# ============================================================
# Final counts + save
# ============================================================
total_reports = sum(len(d.get('reports', [])) for d in files.values())
total_deps = sum(len(d.get('dependencies', [])) for d in files.values())
total_dropped = sum(len(d.get('_dropped', [])) for d in files.values())
log.append(f"FINAL (research/*.json only, excludes 18 seed reports.ts / 8 seed dependencies.ts): "
           f"{total_reports} reports, {total_deps} dependencies, {total_dropped} dropped notes")

print("\n".join(log[-3:]))
print("retype examples:", retyped_examples[:8])

# write fold log + migration log to notes/, and save data files
import datetime
with io.open('notes/schema-validator-round-2026-09-03-fold-editions.json', 'w', encoding='utf-8', newline='\n') as f:
    f.write(json.dumps(fold_log, indent=2, ensure_ascii=False) + '\n')

with io.open('notes/schema-validator-round-2026-09-03-migration-log.md', 'w', encoding='utf-8', newline='\n') as f:
    f.write("# Schema + validator round migration log (2026-09-03)\n\n")
    f.write("Generated by notes/schema-validator-round-2026-09-03-migration.py\n\n")
    for line in log:
        f.write(f"- {line}\n")

save_all()
print("SAVED", len(files), "files")
