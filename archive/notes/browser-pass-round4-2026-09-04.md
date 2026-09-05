# Browser pass, round 4 — 2026-09-04

Picks up HANDOFF agent item 1 (the last 28 browser-pass edges). Ten edges
worked, nine moved, two of them to A. Corpus **548 A · 1,362 B · 714 C**,
A-share **20.9%** (from 546/1,355/723, 20.8%). `npm run validate` exits 0,
`tsc --noEmit` clean, 123/123 logic tests, grader selftest 39/39,
`public/corpus-data.json` regenerated. Nothing in `src/` or `scripts/`
was touched.

## What moved

| edge | was | now | how |
|---|---|---|---|
| `ro-ins-ipc -> ro-ins-hbs` | C | **A** | Chrome in-page fetch + pdf.js; quote verbatim, ABF named |
| `cn-ningxia-equalization-transfer-measures -> cn-budget-law` | C | **A** | sandbox read + quote written by hand (see below) |
| `vancouver-annual-financial-report -> vancouver-budget` | C | B | Chrome capture, coverage 1.0 |
| `lu-statec-ipch -> eurostat-hicp` | C | B | Chrome capture, coverage 1.0 |
| `mpp-pension-compensation-act-2025 -> pspp-cola-methodology` | C | B | Chrome capture, coverage 1.0 |
| `py-cuentas-nacionales -> sna-2008` | C | B | Chrome capture, coverage 0.89 |
| `et-amhara-…-unicef-2023 -> et-ess-cpi` | C | B | Chrome capture, coverage 0.93 |
| `kr-financial-stability -> bis-basel-framework` | C | B | **cloud sandbox**, coverage 0.87 |
| `cn-health-statistical-yearbook -> who-icd-10` | C | B | **cloud sandbox**, coverage 0.75 |
| `tz-dar-es-salaam-city-council-budget-2026 -> tz-lgfa-cap290-service-levy` | C | C | read; the Act is genuinely not named — see below |

Before/after pair: `Claude outputs/grade-round4-{before,written}-2026-09-04.json`.
Selection file: `Claude outputs/browser-pass-round4-edges-2026-09-04.json`.

`cn-ningxia` is the one hand-written quote: the captured document carries
「…根据《中华人民共和国预算法》及《中央对地方均衡性转移支付办法》，特制定自治区对市县均衡性转移支付办法。」
verbatim in 第一条. The basis already quoted it, but inside CJK corner
brackets 「」, which are NOT span delimiters in `extractQuotedSpans`, so the
edge graded `no-quoted-span` with a quote sitting in plain sight. Copying the
sentence into `evidence_quote` took it to A at coverage 1.0.

## Routing, re-measured 2026-09-04 — the round-3 table has decayed

Re-probed all 25 open hosts from BOTH networks the same hour. Three
corrections to the round-3 note:

- **`bok.or.kr` is NOT walled from the cloud sandbox** — the signed
  `fileDown.do` URL returns 200 / 281,837 bytes to plain curl. Closed an edge
  with no browser at all.
- **`nhc.gov.cn` is reachable from the sandbox but SLOW** — 18,269,329 bytes,
  more than 45 s. It reads as a dead host if the timeout is short. Use
  `curl -C -` in a retry loop; one resume finished it.
- **`czt.nx.gov.cn` resolves from the sandbox and not from the VM** (unchanged
  from round 3) and it **flaps** — first attempt reset, second returned
  64,122 bytes. Retry before believing a failure.
- `insse.ro` fails on the bridge VM with an SSL-chain error and on `-k` with a
  503; it is a **browser job**, not a cert problem. Chrome reads it fine.

## Method — three additions to PLAYBOOK §6

1. **The Chrome PDF capture recipe, end to end and repeatable.** Navigate to
   ANY page on the host (a 404 on that host is fine — it only supplies the
   origin, cookies and TLS fingerprint), `fetch()` the PDF same-origin, inject
   pdf.js 3.11.174 from cdnjs, walk `getTextContent()` per page into
   `window.__txt`. Beat Cloudflare on `vancouver.ca`, `unicef.org`,
   `bcp.gov.py` and `insse.ro` without a single challenge solve.
2. **`get_page_text` truncates at 50,000 characters and SAYS SO** — the tail
   reads `[output truncated at 50000 of 158244 characters]`. That number is
   the whole-document length, so it is also the check that the stitch is
   complete. Emit the text in 45,000-character slices, each prefixed with a
   marker (`<<A>>`, `<<B>>`, …), several slices in ONE `browser_batch`; the
   batch result is persisted to a file the cloud sandbox reads, and the
   markers make reassembly exact instead of overlap-guessed.
3. **Force the persist deliberately.** A result under ~50 KB comes back
   INLINE, which spends context on text you are about to write to a file
   anyway. Padding the batch with one extra slice pushes it over the line and
   the whole thing lands in a file instead. Free.

Also worth recording: `npx tsx` cannot run in the mounted repo (Windows
`node_modules`, esbuild platform mismatch) — the PLAYBOOK §6 scratch-copy
recipe is not optional, it is the only way the grader runs from the bridge.
It took about four minutes end to end: rsync minus `node_modules/.git/archive`,
`npm install` (7 s, 162 packages), symlink `src/data/research` and
`evidence-cache` back.

## Findings that need Thomas

1. **The foreign-language target-naming class is now SIX edges, not two.**
   Every one of these matched its quote and was capped at B only because
   `namesTarget` compares the body against the target's ENGLISH title:
   - `lu-statec-ipch -> eurostat-hicp` — cov 1.0; the Règlement names the
     HICP in French ("indices des prix à la consommation harmonisés")
   - `kr-financial-stability -> bis-basel-framework` — cov 0.87; BOK names it
     as 바젤Ⅲ
   - `cn-health-statistical-yearbook -> who-icd-10` — cov 0.75; the yearbook
     names 国际疾病分类 / ICD-10
   - `py-cuentas-nacionales -> sna-2008` — cov 0.89; BCP names the
     "Sistema de Cuentas Nacionales del 2008 (SCN 2008)"
   plus the two already on the list (`ru-minfin -> imf-gfsm`,
   `ndb-russia-erc -> brics-ndb-agreement-2014`). This is one ruling, not six,
   and it is worth roughly six grades.

2. **The whitespace defect has a THIRD instance, and it is not French.**
   `cn-health-statistical-yearbook -> who-icd-10` scores 0.75 instead of 1.0
   because the PDF breaks a line inside a Chinese word — the source reads
   `…国际疾病分类统计\n标准。` and `normalizeForMatch` folds that newline to a
   SPACE, so `统计标准` never matches `统计 标准`. Chinese has no word spaces, so
   every line break in a CJK PDF is a false space. This is the same defect as
   the `ponde`+U+0301+SPACE+`rations` case in HANDOFF §3 item 5, and it is
   very likely the same defect as the "CJK matcher gap" in agent item 3 —
   which would mean the n-gram path in Round B is solving the wrong problem.
   The whitespace-insensitive second pass in `locateQuote` covers all three.
   Still owed: the corpus-wide measurement before adoption.

3. **The six India `.gov.in` edges are a re-cite job, not a capture job.**
   All six cite a DEPARTMENT LANDING PAGE, not the Economic Survey itself
   (`pc.odisha.gov.in/en/publication/economic-survey-report`,
   `des.assam.gov.in/documents-detail/economic-survey`,
   `descg.gov.in/en/Economic-Survey.aspx`, `himachalservices.nic.in/economics/`,
   `indianrailways.gov.in/…/view_section.jsp`, `mod.gov.in/en/annual-report-archive`),
   with a one-sentence Grok basis and no quote. `himachalservices.nic.in` reads
   fine in Chrome — and its landing page is an index that will never name the
   GSDP series. Capturing these cannot move them. They need the actual survey
   PDF and a quote from its GSDP chapter, which is research, not plumbing.
   Same shape: `tz-dar-es-salaam-city-council-budget-2026 -> tz-lgfa-cap290`
   (page read, DOCX attachment read too — 745 characters of revenue table,
   the Act is named nowhere).

## Still open from the 28

Not yet attempted this round: `documentcloud.org`, `rssobarmm.psa.gov.ph`,
`dnd.gov.ph`, `ipdp.cdmx.gob.mx` (2 edges), `transparencia.municipiodeoaxaca.gob.mx`,
`resource.capetown.gov.za`, `mid.ru`, `www.anstat.ci` (blocked on the
combining-accent ruling), `minfin.gov.ru` (the OCR job, agent item 2 — the
PDF is in hand, 864,760 bytes, and BOTH machines' tesseract has only
`eng`+`osd`, so `rus.traineddata` has to be fetched before it can run).
Plus the six India re-cites and the Tanzania one.
