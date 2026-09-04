# Browser pass — bps.go.id + psa.gov.ph (2026-09-04)

[Agent] item 1 of the queue, first slice. 59 edges over 34 URLs — the two
hosts the batch-2 debt list said were worth more than the other 69 combined.
Read in Thomas's own Chrome through Claude-in-Chrome; the toolchain ran in the
bridge VM (`$HOME/rc`, `src/data/research/` and `evidence-cache/` symlinked
back into the repo).

## Result

**37 quotes accepted, 22 refused with a reason each. 41 grades written
(25 A, 16 B), 18 stayed C — no regressions, every edge in this slice was C.**
Corpus **495 A · 1,302 B · 836 C** over 2,633 dependencies; A-share
**17.9% → 18.8%**. `npm run validate` exits 0, `tsc --noEmit` clean, 123/123
logic, grader selftest **31 → 33**.

Per-edge decisions: `Claude outputs/browser-pass-bps-psa-2026-09-04.json`
(`accepted` carries the quote, `refused` carries the reason). Grade run:
`Claude outputs/grade-browserpass-2026-09-04.json`.

## What the browser actually changed

**No host defeated Chrome.** All 34 cited documents were read. `psa.gov.ph`
loads with no challenge at all in Thomas's browser — its "Cloudflare-JS-walled
on every host and path" reputation (PLAYBOOK §6) is a statement about curl and
the cloud proxy, not the site. `bps.go.id` shows the interstitial and clears
it in about 6–10 s unattended.

So the browser pass did not fail on readability. It failed, where it failed,
on **citation**: 17 of the 22 refusals are BPS edges whose basis quotes a
sentence inside the publication PDF (§1.4 data sources, the p.11 "Sumber Data"
section, a chart footnote, a bibliography entry) while `evidence_url` points at
the publication landing page, which carries only an abstract. BPS serves that
PDF **only** through a signed `web-api.bps.go.id/download.php?f=<token>` link
with no stable URL, and a cross-origin `fetch()` of it from the landing page is
CORS-blocked. Quote and citation cannot be the same document, so the quote was
not written. **This is a ruling Thomas owes** (see below).

Two of those 17 are worse than uncitable: `id-electricity-mix` and
`id-geothermal` cite Statistik Listrik 2020-2024, whose own abstract sources
its tables to BPS's Survei Tahunan Perusahaan Listrik — not to Statistics PLN.

## Flagged, not fixed

- **`ph-grdp-ncr → sna-2008` and `ph-grdp-calabarzon → sna-2008`.** The cited
  GRDP Technical Notes PDF was read in full (13 pages, pdf.js) and contains no
  `SNA 2008` / `2008 SNA` string and no para 7.10 citation — it names the SNA
  generically and the Philippine SNA. The basis overclaims. Left C/B.
- **`ph-nickel → ph-trade-partners`.** The document describes the shared
  IMTS/Bureau-of-Customs compilation behind every PSA trade release. Shared
  provenance, not a dependency.
- **`ph-rice → ph-agriculture`, `ph-fisheries → ph-agriculture`.** The fact
  sheets source volumes to the underlying commodity and fisheries surveys, not
  to the production accounts.

## Method (repeatable)

1. `navigate` to the cited URL, wait out the challenge, take
   `document.body.innerText`. `javascript_tool` truncates its return at about
   1,000 characters, so capture in windows around a needle rather than asking
   for the page.
2. PDFs: from a same-origin page, `fetch()` the PDF (it inherits the browser's
   cookies and TLS fingerprint), inject pdf.js from cdnjs, extract per page.
   Cross-origin PDF hosts are CORS-blocked — that is what kills the BPS route.
3. Write the captured extract into `.evidence-fulltext/<sha256(url)>.txt.gz`
   with a real header: `status: 200`, `truncated: true`, `via: chrome
   2026-09-04`. The grader reads the cache first, so re-grading is offline and
   the committed `evidence-cache/` record carries the route.
4. Write `evidence_quote` with the python writer, re-grade with `--edges`,
   `--write` (improvements only).

Every accepted quote was machine-checked against its captured text under the
grader's own normalisation before anything was written.

## Grader change

`routeCapsGrade(via)` — Thomas ruled (2026-09-04) that a document read in his
own Chrome is the cited URL fetched live over his own network, so it grades as
the direct read it is; only `wayback` caps at B. The run report now buckets by
route instead of labelling every `via` an archived snapshot. Two selftests
added (33/33).
