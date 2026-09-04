#!/usr/bin/env python3
"""
Browser-pass round 3 (2026-09-04): accept two quoted spans read this round.

1. `ndb-russia-erc-host-agreement-2019 -> brics-ndb-agreement-2014`. The MID
   page is JS/anti-bot walled to curl (0 chars of text from both the bridge VM
   and the cloud sandbox) but reads in a real browser: 43,237 characters, the
   full Russian text of the 2019 host agreement. Its second recital is the
   basis, verbatim. Ceiling is B, not A: the target node is titled in English
   ("Agreement on the New Development Bank (Fortaleza, 15 July 2014)...") and
   the document names it in Russian, so `namesTarget` cannot fire — the same
   class as `ru-minfin-gfs-kosgu-mapping-table -> imf-gfsm`, on which a ruling
   is still owed.

2. `ph-philhealth -> ph-pop-projections`. PhilHealth's Stats and Charts 2025
   reads directly once the host resolves (2,431,019 bytes of PDF, 60,504
   characters); the edge carried no quoted span at all, so it graded on naming
   alone. The footnote below the membership table is the citation the basis
   describes.

Idempotent: refuses to overwrite an existing `evidence_quote`.
"""
import glob, io, json, os, sys

ROOT = os.getcwd()
EDITS = [
    ('ndb-russia-erc-host-agreement-2019', 'brics-ndb-agreement-2014',
     'принимая во внимание Соглашение о Новом банке развития, вместе со Статьями '
     'соглашения Нового банка развития, которые содержатся в Приложении к Соглашению '
     'о Новом банке развития, заключенное между правительствами Федеративной '
     'Республики Бразилии, Российской Федерации, Республики Индии, Китайской Народной '
     'Республики и Южно-Африканской Республики, подписанное 15 июля 2014 г. в '
     'г. Форталеза'),
    ('ph-philhealth', 'ph-pop-projections',
     '*** 2025 Estimated Projected Population is 113,863,084 (Philippine Statistics '
     'Authority’s Scenario 2)'),
]

for src, tgt, quote in EDITS:
    hit = None
    for f in sorted(glob.glob(os.path.join(ROOT, 'src/data/research/*.json'))):
        doc = json.load(io.open(f, encoding='utf-8'))
        for e in doc.get('dependencies', []):
            if e.get('source_report_id') == src and e.get('target_report_id') == tgt:
                assert hit is None, f'{src} -> {tgt} appears more than once'
                hit = (f, doc, e)
    assert hit, f'{src} -> {tgt} not found'
    f, doc, e = hit
    if e.get('evidence_quote'):
        print(f'skip (already quoted): {src} -> {tgt}')
        continue
    e['evidence_quote'] = quote
    io.open(f, 'w', encoding='utf-8', newline='\n').write(
        json.dumps(doc, ensure_ascii=False, indent=2) + '\n')
    print(f'wrote evidence_quote ({len(quote)} chars): {src} -> {tgt}  [{os.path.basename(f)}]')
