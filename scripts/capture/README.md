# capture/ — getting a document the grader cannot fetch onto disk

Three small tools, built in the 2026-09-04 round-1 (transport) session. They
exist because `.evidence-fulltext/` records sometimes have to be written by
hand, and a hand-written record has to be provably the document.

## The decision, in order

1. **Can the bridge VM `curl` it?** Try first, always. It reached
   `web-api.bps.go.id`'s signed token PDFs on 2026-09-04 — the five BPS
   publications that had been logged as untransportable for two rounds.
2. **Is it a PDF?** Use `extract-pdfjs.cjs` (needs `pdfjs-dist@3.11.174`,
   `npm i` it outside the repo). It is the SAME extraction Chrome does in-page
   and produces a byte-identical result — verified: BPS Energy Balances came
   out at 89,289 chars with sha256 `6b2db200…` from both. So a PDF never has
   to cross the bridge for its text.
   `pdftotext -layout` (what the grader itself uses) is WRONG for a bilingual
   two-column PDF: it interleaves the two languages word by word and a
   correctly-copied sentence then exists in no extraction. pdf.js reading
   order keeps each column whole.
3. **Only if the host refuses the VM** (`anstat.ci` 403s it) does the capture
   have to come out of Chrome. Then use the checksummed transport.

## The checksummed transport

In the page: gzip the extracted text, base64 it, and compute sha256 of the
TEXT. Emit slices of ≤44,000 chars into `document.body` as a single `<main>`
and read them with `get_page_text` (which truncates at 50,000 and says so).
Move them to disk by any channel — a heredoc is fine — and hand the file to
`land.py` with the sha the page reported. It refuses to write anything whose
sha does not match, so §6's "retyping is lossy" stops applying.

Compression is the point: 38,084 chars of text became 17,512 chars of base64,
so most single documents are one slice. **Emit in chunks of ~10,000 chars
per shell call**; a 36,840-char heredoc was truncated mid-write in this
session, which is exactly the failure the checksum is there to catch.

    land.py      <b64file> <sha256-of-text> <url> <via> <extractor> <ctype> <bytes>
    land_text.py <textfile>                 <url> <via> <extractor> <ctype> <bytes>

`land_text.py` is for a document the VM fetched itself; it refuses a file
under 200 chars, because an extraction that silently produced nothing looks
exactly like a document with nothing in it (it happened once here).

Both write `.evidence-fulltext/<sha256(url)>.txt.gz` with a real header, so
`getDoc` reads the cache and the re-grade is offline — never `--refetch`.
Record the route honestly in `via`: `chrome <date>` grades as a direct read,
`token-pdf <date>` caps at B.
