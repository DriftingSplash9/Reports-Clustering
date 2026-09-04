# Techniques — 2026-09-04

**The recipes.** Read the section for the job you are doing; you do not need
the rest. These are the parts of the old `PLAYBOOK.md` §6 that are still true
and still worth following — dated because they were written from the rounds up
to 2026-09-04, not because they are expected to rot (that is
`notes/routing-snapshot-2026-09-04.md`).

The verbatim pre-split §6, with every war story, is at
`archive/playbook/PLAYBOOK-2026-09-04-1938-pre-split.md`.

---

## 1. Running the toolchain

**Run it natively in the bridge VM.** The repo's `node_modules` is Windows, so
`npx tsx` / `vite` fail through `device_bash`; `tsc --noEmit` alone is fine.

    copy the repo (minus node_modules/ .git/ archive/ evidence-cache/
      tmp_work/ _to_delete/ "Claude outputs"/) to $HOME/rc-scratch  — OUTSIDE mnt/
    npm install there                                              — ~4 minutes
    symlink src/data/research/ and evidence-cache/ from the scratch copy
      back into the mounted repo, so --write lands in the corpus

**Copy `scripts/`, never symlink it** — it resolves ROOT through `realpath`,
so a symlinked script puts `.evidence-fulltext/` inside the mounted repo where
rule 6 then forbids deleting it.

**Nothing can be backgrounded.** `nohup setsid … &` survives about two minutes
and is then killed with the call's sandbox; the log just stops. Anything over
~170 s must be made RESUMABLE and run as repeated foreground calls — free for
the grader, because `.evidence-fulltext/` makes an already-fetched URL instant.

**`public/corpus-data.json` is generated** — `npm run gen`, never hand-edited,
and copy it back to the mounted repo afterwards (`public/` is not symlinked).

## 2. Fetching, when curl is enough

- **Try the bridge VM's own curl first, always**, with a browser UA and a ~20 s
  timeout. A sweep of every open URL reclassified a dozen hosts in one call.
- **`curl -w` output must be split off the body on a real newline.** Written as
  `'\\n%{http_code}'` in a TS string literal the separator becomes `\` + `n`,
  `lastIndexOf` returns -1, the status parses as `NaN`, and every lookup is
  then treated as conclusive while every body fails to parse — a rescue pass
  that rescues nothing, reporting nothing. Split it in an exported pure helper
  with a selftest (`splitCurlWrite`).
- **Percent-encode before calling curl, but not with `encodeURI`.** curl
  refuses a URL carrying raw spaces or non-ASCII and the fetcher records the
  refusal as if the host answered (`network:curl-3`). `encodeURI` escapes `%`
  too, so an already-encoded URL double-encodes (`a%20b` → `a%2520b`) and every
  fetch 404s. Escape only the space and bytes outside printable ASCII.
- **A failed fetch is cached exactly like a successful one.** Any change to how
  `getDoc` reads a document must be paired with `--refetch` or an emptied
  `.evidence-fulltext/`, or you are re-grading the old failure.
- **A WAF block looks like content at a glance** — HTTP 200 with a JS-challenge
  shell. Confirm with `file` on the downloaded body, not the status code.
- **Archived snapshots**: fetch with the `id_` suffix (`web/<ts>id_/<url>`) or
  the archive's own toolbar becomes text you are matching quotes against.
  Gate every availability lookup through one global ~1.2 s throttle, retry a
  429 with backoff, cache the ANSWER including negatives, and **never cache an
  inconclusive result** — a run that ran out of budget must not bake "no
  snapshot" into the store for every URL it never asked about. The snapshot
  DOWNLOAD is a separate service and tolerates 4 concurrent readers.
  Wayback also proxies some blocked `.gov` domains: `archive.org/wayback/
  available?url=…`, or CDX search `web.archive.org/cdx/search/cdx?url=<domain>*
  &filter=urlkey:.*\.pdf`.

## 3. Getting text out of a document

**Choose the extractor before blaming the quote.**

- **PDF, default: pdf.js reading order, run on the VM.**
  `npm i pdfjs-dist@3.11.174` outside the repo, then
  `scripts/capture/extract-pdfjs.cjs`. It is the same extraction Chrome does
  in-page and produces a **byte-identical** result (89,289 chars, sha256
  `6b2db200…`, both sides), so a PDF never has to cross the bridge for its text.
- **`pdftotext -layout` — what the grader itself uses — is wrong for a
  bilingual two-column PDF.** It interleaves the two languages word by word, so
  the foreign text lands *inside* the quoted span where no whitespace-insensitive
  matcher can reach. Measured over five BPS publications, 17 probe spans:
  `-layout` found 6, plain `pdftotext` 6, **pdf.js 17**.
- **A signed download token is minted by a browser and then fetched by anyone.**
  Read the Download link's `href` out of the DOM in Chrome, then curl it from
  wherever the toolchain runs. Cross-origin is also beatable inside the browser
  by navigating to the FILE host first (a 404 page is fine — it only supplies
  the origin) and fetching same-origin from there. **Always cite the stable
  landing page, never the signed link** (`via: token-pdf <date>`, caps at B).
- **A scanned PDF is not unreadable.** `pdftotext -layout` returning 9–13 bytes
  on a multi-megabyte file means no text layer. `pdftoppm -r 180 -f <a> -l <b>
  -png` then `tesseract` per page. Only `eng`+`osd` are installed on either
  machine. **Page a range** — a 99-page audit at 200 dpi will not finish inside
  the ~170 s call. Record `via: ocr tesseract <date>` (caps at B).
- **.xlsx**: unzip `xl/sharedStrings.xml` + `xl/worksheets/sheet1.xml`
  (shared-string cells are `t="s"` with the index in `<v>`). The lesson that
  generalises: **a broad content-type test placed upstream of a specific one
  silently swallows the specific format, and the symptom is a clean 200 with no
  text** — an xlsx content-type contains `officedocument`, so the DOCX branch
  claimed every spreadsheet for six weeks. Check branch ORDER.
- **.docx in a browser, no library**: same-origin `fetch` for the bytes, walk
  the zip central directory by hand (EOCD at the tail → entry offsets), inflate
  `word/document.xml` with `DecompressionStream('deflate-raw')`, strip tags,
  `\n` per `</w:p>`.
- **Check the byte count of any extraction before building a record on it.** A
  0-byte pdf.js output was landed as a document without complaint on
  2026-09-04, from a file that had read fine one call earlier.
  `scripts/capture/land_text.py` now refuses anything under 200 chars.

## 4. Claude-in-Chrome capture

Only when the host refuses the VM outright. It is a **capture** job, not a
fetch job.

1. `navigate` to the cited URL, wait out the challenge. **Reload if it sticks**
   — `bps.go.id` cleared on the second navigation after sitting on "Just a
   moment…" past 40 s on the first.
2. HTML: one `get_page_text` call. It returns the WHOLE page — **the ~1,000-char
   truncation is a `javascript_tool` limit, not a browser limit** — and it
   truncates at 50,000 chars **and prints the total**, which is also your check
   that a stitch is complete.
3. PDF: from a same-origin page, `fetch()` the PDF (it inherits cookies and TLS
   fingerprint), inject pdf.js from cdnjs, extract per page. **Cross-origin is
   CORS-blocked** — navigate to the file's own host first.
4. **When the host's CSP blocks cdnjs, write the extractor inline.**
   `script-src 'self'` blocks the `<script src>` and `connect-src 'self'`
   blocks fetching the library to `eval`, even from the extension's isolated
   world. A ~40-line inline extractor covers text-layer PDFs: scan for
   `stream\r?\n` not preceded by `end`, take the dict back to the previous
   ` obj`, keep `/FlateDecode` streams that are not
   `ObjStm|Image|DCTDecode|FontFile|Metadata|XML`, inflate, concatenate the
   `(...)` operands. Four traps, each of which silently yields garbage:
   **(a)** trim trailing EOL bytes before inflating, and read the stream
   incrementally (`getReader()` in try/catch) so trailing garbage still returns
   the prefix that inflated; **(b)** flush pending strings only on
   `Tj`/`TJ`/`'`/`"` and clear on any other operator, or `/Lang (en-GB) … BDC`
   puts `en-GB` between every phrase; **(c)** a backslash before a newline
   inside a string is a line continuation, handled BEFORE octal and the escape
   map, or quotes read `Go\ vernment`; **(d)** concatenate `TJ` array pieces
   with **no** separator — the kerning splits are mid-word
   (`(Expenditur)10.1(e incr)`). It does not handle subset fonts with no
   ToUnicode CMap — that is `unreadable-source`, not a fetch failure.
5. **A PDF served `Content-Disposition: attachment` does not navigate** — the
   tab stays where it was and `navigate` still reports success, so JS "on that
   page" runs on the previous one. Check `location.href` inside the page.
6. Landing pages on IBGE / INEGI / NSO-Malta **serve every tab panel in one
   HTML response** — the tab is a client-side selector. A quote from any panel
   is a quote from the bare URL; cite the bare URL, not the `?t=` variant.
7. Two tool quirks: a returned string that looks like query-string or cookie
   data comes back as `[BLOCKED: Cookie/query string data]` (re-slice it), and
   a long `await new Promise(setTimeout)` in a `browser_batch` item that spans
   the preceding `navigate` fails with "Inspected target navigated or closed" —
   put the sleep in its own call.

Write the capture into `.evidence-fulltext/<sha256(url)>.txt.gz` with a real
header (`status: 200`, `via: chrome <date>`) and re-grade: `getDoc` reads the
cache before the network, so the re-grade is offline and never `--refetch`.
A Chrome read grades as the direct read it is; only `wayback`, `ocr` and
`token-pdf` cap at B.

**Moving a capture to disk**: gzip + base64 + sha256 in the page, slices into
`document.body` as one `<main>`, `get_page_text`, then
`scripts/capture/land.py`, which refuses to write on a sha mismatch. Full
recipe in `scripts/capture/README.md`. **Emit in ~10,000-char chunks** — a
36,840-char heredoc was silently truncated mid-write and only the checksum
caught it.

## 5. Grading and quotes

- **`--write` can REGRESS a grade and the improvements-only rule does not stop
  it** — that rule protects the *quote*, not `evidence_grade`. A re-run over an
  edge whose host walls today's machine writes the wall's C over an existing B.
  **After any `--write`, diff the selected edges' grades against what they were
  and restore every downgrade whose reason is a route failure** (`wall:*`,
  `empty:*`, `no-document`) rather than an evidence finding.
- **Select on the work, not on the container.** `--slice <f>` takes every edge
  in the file including ones an earlier batch already graded — hence
  `--skip-graded` for a forward pass and `--edges` for a re-grade.
- **An `--offline` re-run is stricter than the online pass, by design.** A URL
  whose fetch failed leaves no document, so offline grades it on the recorded
  failure. The corpus carries the offline grades; the per-edge JSON carries the
  online ones. Don't diff them and call it a bug.
- **Check `truncated` / `text-chars` before believing a
  `quote-not-in-document`** on a long document. The cap is 4 MB now (was 250 KB,
  which was manufacturing them) and governs only the disposable scratch store.
- **A basis that quotes document X while `evidence_url` points at document Y**
  gives a quote the grader can never confirm — 29 of round 5's accepted quotes
  were real sentences from a *companion* document. Quote and citation must be
  the same document.
- **Do not "fix" a quote for ellipses or curly quotes** — `normalizeForMatch`
  folds the quote families and strips accents; `locateQuote` splits on the
  ellipsis and scores fragments separately. 105 corpus quotes contain an
  ellipsis (59 grade A). The defect that IS real is the researcher's own
  citation text appended inside the quote (`(Press Release No. 17/218, …)`),
  which costs coverage in proportion to its length.
- **A C grade on an edge whose host is in the browser-pass list tells you
  nothing about its quote** — the document was never read, so the quote was
  never scored. Capture first, then judge.
- **DSBB**: `dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=
  <ISO3>&categoryCode=<CAT>`. Category codes are **not uniform across
  countries** and a wrong code returns `[]`, which is not "no metadata" —
  Korea's production index is `IND00` not `PRI00`, Indonesia's merchandise
  trade `MET00` not `MER00`.

## 6. Renderer measurement

- **`renderer.info.render` reads `calls 1, triangles 1` and the renderer is
  fine.** `info.autoReset` clears the counters at the start of every `render()`
  and with `@react-three/postprocessing` the last render of each frame is the
  composer's fullscreen pass. Any sample from outside the render loop reports
  1/1. Real count: `gl.info.autoReset = false`, `gl.info.reset()`, wait **ONE**
  rAF, read, restore.
- **Two rAFs accumulate two frames** — the current frame's render has already
  happened when the first callback runs. That is what produced the bogus
  13,890-draw-call reading; the true per-frame figure is 6,942. Better than
  counting: wrap `gl.render` itself and attribute each invocation to a tick,
  which also answers how many times the scene is drawn per frame (once).
- **An undocked, maximised DevTools window fully occludes the page**, and the
  signature is unmistakable: median frame time pinned at exactly **33.40 ms**
  (Chrome throttles a covered window's rAF to 30 Hz and stalls it in gaps), so
  fps readings scatter — 8.6 / 28.0 / 3.6 — with an identical median. Any
  in-page measurement needs a lead-in delay so the window can be raised, and
  should log `document.visibilityState` misses.
- **Measure before believing.** For layout forces the instrument is committed:
  `npx tsx scripts/measure-forces.ts` (`SPREAD=`, `SEEDS=`, `CRS=`), ~1.5 min a
  run. Read `onscreen`, run more than one seed, never let simulation state leak
  between runs. Every earlier calibration used a throwaway script that was
  deleted, and one of them did not reproduce.
- Headless verification: build + `vite preview` + Playwright on the
  preinstalled Chromium with `--use-angle=swiftshader
  --enable-unsafe-swiftshader`. Geometry/colour/pixel counts are exact;
  bloom/glow is untrustworthy; CSS transitions wedge under load.

## 7. Device-bridge mechanics

- **`zip` writing directly into a mounted folder can fail** (temp-file-then-
  rename doesn't survive the mount). Zip to `$HOME` and `cp` it in, or stream
  it: `zip -qr - <paths> > tmp_work/<name>.zip`. The mount also cannot
  overwrite a same-named file — fresh name each run, stale one to `_to_delete/`.
- **`unzip -o` into the repo fails the moment it must replace an existing
  file.** Unzip to `$HOME` and `cp` over, which truncates in place and is
  allowed.
- **A staging zip carries no dotfiles** — `.gitignore` is not in the recipe, so
  a sandbox `>>` to one writes a NEW file that overwrites the real one on the
  way back.
- **`device_stage_files` can fail `session_stale_relogin`** mid-session with no
  warning; Thomas must re-sign-in. When it strikes right after an edit you need
  to verify, `sha256sum` both copies — valid proof only when the agent wrote
  both, not a substitute for staging genuinely fresh device-side content.
- **`du -sh` overstates a directory of small gzips by ~9×** (6.8 MB reported
  for 773 KB across 1,670 files, all 4 KB block rounding). Measure with
  `find … -printf "%s\n" | awk '{s+=$1}END{print s}'`.
- **Subagents spend the session's own WebSearch budget** (200). Eight parallel
  URL-hunting agents exhausted it half way through a round.
