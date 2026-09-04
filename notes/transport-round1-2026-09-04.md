# Round 1 — the checksummed transport, and the 17 BPS edges (2026-09-04)

HANDOFF agent items 1 and 2. **20 edges worked, 20 moved: 18 C→B, 1 B→A,
1 already-B held at B.** Corpus **579 A · 1,360 B · 695 C** over 2,634
dependencies, A-share **22.0%** (from 578 / 1,343 / 713). `npm run validate`
exits 0, `tsc --noEmit` clean, 123/123 logic, grader selftest **47/47**,
`public/corpus-data.json` regenerated. **Nothing in `src/` or `scripts/` was
modified** — `scripts/capture/` is a new folder, no existing file touched.

Before/after: `Claude outputs/round1-{bps-dry,written}-2026-09-04.json`.
Selection: `round1-edges-2026-09-04.json`. Quote writer, with its checker:
`round1-write-quotes-2026-09-04.py`.

## The headline: the transport was not the binding constraint

The handoff said 20 edges were queued behind a transport problem. They were
queued behind a *routing* assumption. Three findings, in the order they landed:

1. **The bridge VM can `curl` BPS's signed token PDFs.** All five, first try,
   200 / 3.9–22.3 MB. The token is minted by the landing page's JavaScript and
   only a browser can mint it — but once minted it is an ordinary URL that any
   client on any network can fetch. Two rounds recorded these as
   untransportable; nobody had tried the VM with a token in hand.
2. **pdf.js runs on the VM.** `npm i pdfjs-dist@3.11.174` outside the repo,
   ~40 lines, and it produces **the byte-identical extraction Chrome produces
   in-page** — BPS Energy Balances, 89,289 chars, sha256 `6b2db200…`, from
   both, same offsets. So a PDF never needs to cross the bridge for its text
   at all. `scripts/capture/extract-pdfjs.cjs`.
3. **`pdftotext -layout` is the wrong extractor for a bilingual two-column
   PDF, and that is what had actually blocked these edges.** BPS prints
   Indonesian and English side by side; `-layout` interleaves them word by
   word, so a correctly-copied Indonesian sentence exists in NO extraction of
   the document. Measured on all five: of 17 probe spans, `-layout` found 6,
   plain `pdftotext` found 6, **pdf.js reading order found 17**. The grader
   uses `-layout` (`grade-evidence.ts` line ~986). **This is a ruling Thomas
   owes** — see below; nothing in the grader was changed.

## The transport, built and proven anyway

`anstat.ci` 403s the bridge VM and the cloud sandbox alike, so one document
genuinely had to come out of Chrome. The mechanism, now in
`scripts/capture/`:

In the page, gzip the text, base64 it, sha256 the TEXT, emit ≤44,000-char
slices into `document.body` as a single `<main>`, read with `get_page_text`.
Move by any channel; `land.py` writes the `.evidence-fulltext/` record **only**
if the sha matches. Proven end to end on mid.ru: 38,084 chars, 70,013 bytes,
sha `4613f54b…` identical after gzip → base64 → heredoc → disk.

**Compression is what makes it cheap**: 38,084 chars of text is 17,512 chars
of base64, so most documents are a single slice. Round 3's "get a result over
50 KB and it persists to a file for free" is not needed and was not used.

**The one failure is worth more than the success**: a 36,840-char heredoc was
silently truncated mid-write. The checksum caught it. Emit in ~10,000-char
chunks. §6's "retyping is lossy" stops applying the moment a copy checksums —
but only if you actually check.

## The 17 BPS edges

Ruled 2026-09-04 (option 1): cite the landing page, quote the PDF, record
`via: token-pdf <date>`, cap at B. Done, all 17, all C→B. Every quote was
checked against the landed extraction under the grader's own normalisation
plus `locateQuote`'s whitespace-insensitive pass **before** it was written; 4
matched exactly, 13 matched whitespace-insensitively (pdf.js drops the space
at line ends, so "untuk penyusunan" reads `untukpenyusunan`).

One quote was refused by the checker and replaced rather than forced:
`id-cpi-provincial -> id-sbh-2022`'s basis quoted a sentence carrying the
index formula, which the PDF stores as mathematical-bold codepoints
(`𝑃𝑃 (𝑛𝑛−1)𝑖𝑖`). The published sentence that makes the same claim without the
formula was used instead ("Jumlah barang/jasa pada paket komoditas dan
bobotnya … menyesuaikan hasil Survei Biaya Hidup 2022 (SBH 2022) di wilayah
masing-masing", p. xxii).

All five publications confirmed their claims. §1.4 of the GHG accounts names
Neraca Energi, KLHK's inventory, TPP, Bank Indonesia's Neraca Pembayaran,
ESDM's Statistik Energi and the 2006 IPCC guidelines in two sentences; the
bibliography names the IPCC and KLHK artefacts by title, so those two edges
were cited to the bibliography instead of the prose.

## The other two documents

- **`mid.ru` B→A.** `ndb-russia-erc-host-agreement-2019 -> brics-ndb-agreement-2014`.
  Read in Chrome (JS-rendered, 38,084 chars), quote already in the corpus and
  correct, coverage 1.0, `quote-found-artefact-named`.
- **`anstat.ci` C→B and B→B.** Both quotes matched at **coverage 1.00** — the
  round-5 whitespace-insensitive pass paid for itself here, since this is the
  PDF that stores "pondérations" as `ponde` + combining acute + SPACE +
  `rations`. See the finding below for why neither reached A.

## Findings — measured, not applied

1. **`namesTarget` has no whitespace-insensitive pass, and `locateQuote` does.**
   This is a third member of the family from the Basel round.
   `ci-anstat-ihpc -> ci-anstat-ehcvm` grades B `agency-not-artefact` with
   coverage 1.00: the ANStat PDF renders "Enquête Harmonisée sur les
   Conditions de Vie des Ménages" as `Enquê te Harmonisé e sur lesConditions
   de Vie des Mé nages`, so `tokenise` sees `enque`, `te`, `harmonise`, `e`,
   `lesconditions` — the title run can never fire, though the document names
   the survey in full, twice. The quote matches and the naming test cannot.
   **Not changed**: like the other two, it can only ever add matches, so it
   owes a corpus-wide before/after first.
2. **The run report calls `token-pdf` "a direct read of the cited URL", and
   labels its reasons `…-via-snapshot`.** Both are false — `token-pdf` is
   capped at B precisely because the quote is one step from the citation, and
   nothing here came from a snapshot. PLAYBOOK §6 already condemns exactly
   this ("one label for both read as a lie in the round's own output"); this
   is a new instance in the same reporting code. **Not fixed** — it is a
   `scripts/` change and this round kept `scripts/` clean.
3. **The handoff's grade line mixed two sources.** It read "578 A · 1,343 B ·
   703 C" against 2,634 dependencies, which does not add up. A and B were the
   validator's whole-corpus counts; C was `public/corpus-data.json`, which
   holds the 347 research slices only and misses the 10 edges that live in the
   hand-written seed files (PLAYBOOK rule 11). The correct baseline was
   **713 C**. Take grade counts from `npm run validate`, one source.

## Trap worth keeping

An extraction that produced nothing wrote a 0-byte file and was landed as a
document without complaint; the same file had read fine one call earlier.
`land_text.py` now refuses anything under 200 chars. Check the byte count of
an extraction before you build a record on it.
