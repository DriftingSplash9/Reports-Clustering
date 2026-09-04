#!/usr/bin/env python3
"""
Agent item 1 (HANDOFF 2026-09-04): backfill the quoted span on
`ng-kano-lgas-budgets-2025 -> ng-allocation-of-revenue-act`.

The edge graded C on `no-quoted-span`: its basis describes the Kano Municipal
Council 2025 budget's "Federal Allocation" revenue line but quotes it in SINGLE
quotes, which `extractQuotedSpans` deliberately ignores (PLAYBOOK §6), so the
grader saw no span at all. The document itself now reads (329,963 chars,
`extractor: xlsx`, stored truncated at the 250 KB cap — the span below sits at
character ~700, well inside it).

`--find-quotes` proposed nothing, and correctly: the heuristic wants a SENTENCE
naming the target artefact plus a dependency phrase, and this document is a
budget spreadsheet with no prose at all. The span accepted here is the
STATUTORY REVENUE block header and the Federal Allocation row beneath it,
verbatim from the extracted text (tabs normalise to single spaces in
`normalizeForMatch`, so the span matches as one contiguous substring).

Ceiling is B, not A: the spreadsheet names the transfer ("Federal Allocation"),
never the statute that governs it, so `namesTarget` cannot fire against
"Allocation of Revenue (Federation Account, etc.) Act". That is the same
`quote-found-target-not-named` class as the Bolivian INE edges, and it is the
honest grade for a budget line that cites a revenue stream rather than a law.

Idempotent: refuses to run twice.
"""
import io, json, os, sys

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
PATH = os.path.join(ROOT, 'src', 'data', 'research', 'af-nigeria-lga-municipal.json')

SOURCE = 'ng-kano-lgas-budgets-2025'
TARGET = 'ng-allocation-of-revenue-act'

# Verbatim from the extracted xlsx text (lines 24-25), tabs preserved.
QUOTE = (
    'STATUTORY REVENUE:\n'
    '11010101\t01101\t31912100\tFederal Allocation\t2345667898\t5752000898\t'
    '1298435135.1818252\t4586665421'
)

raw = io.open(PATH, encoding='utf-8').read()
doc = json.loads(raw)

hits = [d for d in doc.get('dependencies', [])
        if d.get('source_report_id') == SOURCE and d.get('target_report_id') == TARGET]
assert len(hits) == 1, f'expected exactly one {SOURCE} -> {TARGET} edge, found {len(hits)}'
edge = hits[0]

if edge.get('evidence_quote'):
    print('already applied — evidence_quote present, nothing to do')
    sys.exit(0)

edge['evidence_quote'] = QUOTE

io.open(PATH, 'w', encoding='utf-8', newline='\n').write(
    json.dumps(doc, ensure_ascii=False, indent=2) + '\n')
print(f'wrote evidence_quote ({len(QUOTE)} chars) on {SOURCE} -> {TARGET}')
