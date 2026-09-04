# Browser pass, round 2 — the rest of the list (2026-09-04)

[Agent] item 1, second slice. The 173 edges left in the browser-pass debt list
after `bps.go.id` + `psa.gov.ph` closed earlier the same day. Read in Thomas's
own Chrome; toolchain in the bridge VM (`$HOME/rc`, `src/data/research/` and
`evidence-cache/` symlinked back into the repo).

## Result

**134 of 173 edges decided: 85 accepted, 47 refused with a reason each, 2
blocked by the browser extension. 39 never reached.**

Grades written: **C→A 41, C→B 38, B→A 2, no regressions.** Corpus
**538 A · 1,342 B · 743 C** over 2,633 dependencies (+10 never graded);
A-share **18.8% → 20.4%**. `npm run validate` exits 0, `tsc --noEmit` clean,
123/123 logic, grader selftest 33/33, `public/corpus-data.json` regenerated.
No script changed this round.

Per-edge decisions: `Claude outputs/browser-pass-round2-2026-09-04.json`
(`accepted` carries the quote, `refused` the reason, `never_attempted` the 39).
Flags for Thomas: `Claude outputs/browser-pass-round2-flags-2026-09-04.json`.
Grade runs: `grade-browserpass-round2/3/4-2026-09-04.json`.

Hosts closed: ibge.gov.br, inegi.org.mx, bsp.gov.ph, localgovernment.vic.gov.au,
yukon.ca, mospi.gov.in, imf.org, anuario.ine.gob.bo, codes.findlaw.com,
legislation.govt.nz, laws.e-gov.go.jp, osp.stat.gov.lt, nso.gov.mt, bps.gub.uy,
statbel.fgov.be, bpstat.bportugal.pt, stats.gov.cn, bcb.gov.br, law.justia.com,
budgetbenin.bj, mpla.ao, nao.gm, ndb.int, togo.opendataforafrica.org, and four
regional `*.bps.go.id`.

## What actually blocked these edges

Not readability. **Of 47 refusals, 39 are edges whose cited document does not
say what the basis claims** — overwhelmingly Grok-family bases asserting a
dependency the page never states. The recurring shapes:

- **Chained two-hop** (9): six IBGE surveys → `isic` all cite the CNAE page,
  which carries the CNAE 2.0 ↔ ISIC Rev.4 synchronisation sentence but never
  names PIM-PF, PIA, PAS, PAC, PAIC or PMC. Same shape: `tx-spdpid` → two Texas
  district reports via a statute that defines only the class; `ae-construction`
  → `isic` via an SDMX codelist.
- **Place-node edges with no place in the document** (5): the INEGI CNGMD/CCPV/
  CE/ENIGH programme pages never name Zapopan, Iztapalapa or Monterrey.
- **Nav-only matches** (2): "Sistema de Cuentas Nacionales" on INEGI's Censos
  Económicos pages is a left-hand programme-category link (PLAYBOOK rule 15).
- **Dead or moved** (2): `mospi.gov.in/iip` 302s to the ministry home page;
  `bcb.gov.br/estatisticas/setor-externo` serves BCB's own 404.
- **Landing page is a download shell** (1): `yukon.ca/en/2026-27-main-estimates-
  finance` is a file card; the PDF behind it is the Finance-department section
  and carries none of the revenue table.

## Method — what is new since the first slice

- **`get_page_text` returns the whole page.** The 1,000-character truncation in
  PLAYBOOK §6 is a `javascript_tool` limit, not a browser-pass limit. Capture
  is one call, not a needle hunt.
- **An IBGE/INEGI/NSO-Malta landing page serves every tab panel in one HTML
  response.** The tab is a client-side view selector (`?t=conceitos-e-metodos`),
  so a quote from any panel is a quote from the cited URL. Verified by fetching
  the bare URL in-page and finding the string in the raw HTML. This is the
  opposite of the BPS case, where the PDF is a separate resource.
- **DOCX reads in-browser with no library** — same-origin `fetch`, walk the zip
  central directory by hand, inflate `word/document.xml` with the native
  `DecompressionStream('deflate-raw')`. 177k chars out of VLGGC Part 2, which
  403s to curl.
- **A ~40-line inline PDF text extractor** covers hosts whose CSP blocks cdnjs
  (so pdf.js cannot be injected). Details and traps in PLAYBOOK §6.
- **Scanned PDFs OCR on the bridge VM** — `pdftoppm -r 200 -png` + tesseract
  (installed, `eng` only, adequate for Latin-script French and Portuguese).
  Read Benin's FADeC arrêté, Angola's Lei 13/20 and the Gambia NAO's 99-page
  Kanifing audit, all of which return 9–13 bytes to `pdftotext`.
- **Re-probe before believing the debt list.** One `curl` sweep of all 72
  remaining URLs from the bridge VM reclassified a dozen: `stats.gov.cn` (200,
  124 KB) and `bps.gub.uy` (200, 5.9 MB) were logged "could not resolve host";
  `anuario.ine.gob.bo` was never walled at all.

## The one real quote defect — and two claims that were wrong

Twelve accepted edges turned out to already carry an `evidence_quote`.
`public/corpus-data.json` strips the field, so an edge can look unquoted when
it is not — **always read the slice JSON, not the generated corpus, before
concluding an edge has no quote.**

I replaced six of those quotes on the theory that an `...` splice and a
straight-vs-curly apostrophe can never match. **Both are wrong**, and the
grader says so in its own source:

- `normalizeForMatch()` folds `’ ‘ ‚ ‛ ′` to `'`, folds the double-quote family,
  and strips accents (NFKD → drop combining marks → NFKC).
- `locateQuote()` splits a quote on its ellipsis and scores each fragment
  separately, with a comment saying exactly that.

Re-graded with the ORIGINALS restored against the captured documents,
`mm-cso → imf-e-gdds` (ellipsis), `mu-statsmauritius → imf-sdds-plus` and
`eurostat → lt-govfin` (apostrophes) all score **A, coverage 1.0**. Those three
replacements were churn; **the originals have been restored.** Corpus-wide the
two classes are 105 and 84 quotes, of which 59 and 48 are already A.

What IS real is **researcher's citation text appended inside the quote**, which
costs coverage in proportion to its length:

- `np-national-accounts → imf-e-gdds` — original **B, coverage 0.61**
  (`partial-quote`), dragged down by a trailing `(Press Release No. 17/218, …)`.
- `mv-national-accounts → imf-e-gdds` — original **C, coverage 0.5**: the
  headline plus `(IMF Press Release No. 19/229, June 20, 2019)`.
- `lt-govfin → esa-2010` — original **C, coverage 0**: "Statistics are produced
  following ESA 2010." is a paraphrase; the page says "The indicators are
  compiled following ESA 2010".

Those three keep the new quote. A corpus scan for a trailing `(Press Release …)`
finds exactly **two more**, both at B: `pk-national-accounts → imf-e-gdds` and
`bt-national-accounts → imf-e-gdds`.

## CJK

Four Japanese statutes (`laws.e-gov.go.jp`) and two Chinese NBS quotes
(`stats.gov.cn`) were written and **all six matched**. Round B's matcher gap
bites a quote that has drifted from the document, not a verbatim one: exact
substring still carries a CJK quote copied character-for-character out of the
page.

## Not reached — 39 edges, and why

`Claude outputs/browser-pass-round2-2026-09-04.json` → `never_attempted`.

- **The Chrome extension refuses the domain** ("Navigation to this domain is not
  allowed" / "Permission denied for JavaScript execution on this domain").
  **Confirmed on five hosts / six edges**: `wam.ae`, `gov.il`, `descg.gov.in`,
  `pc.odisha.gov.in`, `slovak.statistics.sk`. The remaining 33 were not
  individually tested against the extension — each costs its own call because
  `browser_batch` stops at the first error — so an unknown share of them is the
  same thing rather than a real wall. This is a permission list in the
  extension, **not a site wall**, and is likely the biggest lever left here.
- **Custom-encoding PDFs**: `council.vancouver.ca/20260505/documents/r2.pdf`
  fetches and inflates fine (34 streams, 28k chars) but every glyph maps through
  a subset font, so the text is noise. Needs a ToUnicode-CMap-aware extractor,
  or a route that reaches the file from a shell (the host 403s the bridge VM).
- **Genuinely unreachable from both networks**: `insse.ro`, `nhc.gov.cn`,
  `czt.nx.gov.cn`, `minfin.gov.ru`, `bcp.gov.py`, `dse.bihar.gov.in`,
  `indianrailways.gov.in`, `mod.gov.in`, `dcc.go.tz`, `cbos.gov.sd`,
  `archive.stats.govt.nz` (the host itself is retired).

## Flagged for Thomas, not fixed

`Claude outputs/browser-pass-round2-flags-2026-09-04.json`.

1. **Mint `br-ibge-cnae`.** The corpus already models this correctly for
   Australia (`anzsic → isic`). A CNAE node would turn nine refused IBGE edges
   into one A-grade `br-ibge-cnae → isic` plus six clean survey → CNAE edges.
2. **`mx-cscm → mx-scnm`** — the CSCM page is A-grade evidence for
   `mx-cscm → sna-2008`, and says nothing about the Mexican SCNM it points at.
3. **Direction, not flipped** (standing rule): `br-lei-5534-1968 →
   br-ibge-censo-demografico` (the census rests on the law, not the reverse —
   quote is ready if flipped); `mt-edp-inventory → mt-nso-government-finance`
   and `id-democracy-index → id-rpjmn` (both accepted with the quote, both read
   backwards).
4. **`ndb-mou-brics-icm-2022 → brics-icm-cooperation-framework-2011` — the basis
   looks factually wrong.** All 16 pages OCR'd; the MoU names exactly one
   predecessor and it is dated **2016**, not 2011.
5. **Should an OCR read cap at B?** Three edges graded A off tesseract output
   with visible OCR damage. `routeCapsGrade()` caps only `wayback`.
6. **The grader has no xlsx extractor** — eight edges in the debt list carry
   `empty:no-extractor` for readable spreadsheets. `anuario.ine.gob.bo` returns
   HTTP 200 to plain curl; this round unzipped it by hand. ~30 lines in
   `getDoc` closes that class without a browser.
7. **`yt-budget-main-estimates → territorial-formula-financing`** — the claim is
   A-grade evidenced in the Fiscal Outlook PDF, a different publication.
   Retarget or drop.
