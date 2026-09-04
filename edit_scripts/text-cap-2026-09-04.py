#!/usr/bin/env python3
"""
Agent item 6 (HANDOFF 2026-09-04): raise the extraction cap so a quote late in
a long document is matchable.

`TEXT_CAP_BYTES` was 250 KB. The grader matches quotes against the CAPPED text,
so any quote past that byte offset scores 0 and the edge grades
`quote-not-in-document` — which reads in a report exactly like a citation that
does not say what it claims. Three edges are known to be in that state:
`sd-cbos-statistical-review-q4-2024 -> sd-cbs-cpi` (measured this round: the
document is 278,363 bytes of `pdftotext -layout` output and the quoted line,
"'Source: Central Bureau of Statistics.", starts at byte 278,228 — the LAST
line of the PDF, 22 KB past the cap) and the two INEI edges the handoff records.

Raising it is close to free. The cap governs only `.evidence-fulltext/`, which
is disposable, gitignored local scratch (see the FULLTEXT_DIR comment); the
COMMITTED record in `evidence-cache/` stores matched windows, not full text, so
Thomas's 2026-09-03 repo-size ruling is untouched by this. The stored text is
gzipped, and the largest document seen so far (minfin's KOSGU workbook,
3,817,390 characters) compresses to well under a megabyte.

4 MB is chosen to clear that known worst case with room to spare while still
being a cap: the point of having one at all is that a runaway extraction must
not be able to fill the disk. `truncated` and the whole-text sha256 keep
working exactly as before for anything past it.

Idempotent: refuses to run twice.
"""
import io, os, sys

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
PATH = os.path.join(ROOT, 'scripts', 'grade-evidence.ts')
if not os.path.exists(PATH):
    PATH = os.path.join(os.getcwd(), 'scripts', 'grade-evidence.ts')

s = io.open(PATH, encoding='utf-8').read()

old = """/**
 * Extraction cap for the LOCAL full-text scratch store. Beyond this the first
 * 250 KB is kept plus a hash of the whole extracted text, so a re-check can
 * still tell whether the document changed.
 */
const TEXT_CAP_BYTES = 250 * 1024"""

new = """/**
 * Extraction cap for the LOCAL full-text scratch store. Beyond this the first
 * 4 MB is kept plus a hash of the whole extracted text, so a re-check can
 * still tell whether the document changed.
 *
 * **Raised from 250 KB on 2026-09-04, because the grader matches quotes against
 * the CAPPED text and a quote past the cap is unmatchable.** An edge in that
 * state grades `quote-not-in-document`, which is indistinguishable in a report
 * from a citation that does not say what it claims — the failure mode this cap
 * quietly caused for `sd-cbos-statistical-review-q4-2024 -> sd-cbs-cpi`, whose
 * quoted line ("'Source: Central Bureau of Statistics.") is the LAST line of a
 * 278,363-byte extract, 22 KB past the old cap.
 *
 * Raising it costs almost nothing: this cap governs ONLY `.evidence-fulltext/`,
 * which is disposable gitignored scratch (see FULLTEXT_DIR). The committed
 * `evidence-cache/` record stores matched WINDOWS, not full text, so Thomas's
 * 2026-09-03 repo-size ruling is untouched. Stored text is gzipped; the largest
 * document met so far (minfin's KOSGU workbook, 3,817,390 characters) fits
 * inside 4 MB. The cap still exists so a runaway extraction cannot fill the
 * disk, and `truncated` plus the whole-text sha256 behave exactly as before for
 * anything past it.
 */
const TEXT_CAP_BYTES = 4 * 1024 * 1024"""

if 'Raised from 250 KB on 2026-09-04' in s:
    print('already applied — nothing to do')
    sys.exit(0)
assert s.count(old) == 1, 'TEXT_CAP_BYTES anchor'
s = s.replace(old, new)
io.open(PATH, 'w', encoding='utf-8', newline='\n').write(s)
print('applied: TEXT_CAP_BYTES 250 KB -> 4 MB')
