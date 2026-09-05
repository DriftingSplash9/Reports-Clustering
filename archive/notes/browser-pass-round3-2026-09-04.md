# Browser pass, round 3 — 2026-09-04

Picks up HANDOFF agent items 1 (ng-kano quote), 2 (the last 39 browser-pass
edges, the two `podaci.dzs.hr` edges) and 3 (housekeeping), plus item 6, which
turned out to be the cause of one of the round's own refusals.

## What moved

Eleven edges, no regressions (`Claude outputs/grade-round3-before-` and
`-written-2026-09-04.json` are the before/after pair the `--write` rule asks
for):

| edge | was | now | how |
|---|---|---|---|
| `ng-kano-lgas-budgets-2025 -> ng-allocation-of-revenue-act` | C | B | quote accepted by hand |
| `hr-edp-inventory -> hr-dzs-government-finance` | C | B | host re-probed, direct read |
| `eurostat-edp-notification-tables -> hr-dzs-government-finance` | C | **A** | same |
| `sd-cbos-statistical-review-q4-2024 -> sd-cbs-cpi` | C | B | URL encoding + text cap |
| `sk-edp-inventory -> sk-susr-government-finance` | C | B | Chrome capture |
| `sk-susr-government-finance -> esa-2010` | C | **A** | Chrome capture |
| `eurostat-edp-notification-tables -> sk-susr-government-finance` | C | B | Chrome capture |
| `ci-anstat-ihpc -> un-coicop-2018` | C | B | Chrome capture |
| `ndb-russia-erc-host-agreement-2019 -> brics-ndb-agreement-2014` | C | B | Chrome capture + quote |
| `ph-philhealth -> ph-pop-projections` | C | B | host resolved + quote |

`ci-anstat-ihpc -> ci-anstat-ehcvm` is the eleventh: document now confirmed
readable, quote confirmed correct, still C — see the combining-accent gap in
PLAYBOOK §6 and the ruling owed in HANDOFF §3.

## Two grader fixes

- `encodeForCurl` — percent-encode spaces and non-ASCII before handing the URL
  to curl. Closes `network:curl-3` as a class. `encodeURI` is the wrong tool
  and fails silently; the selftest that catches it is in the file.
- `TEXT_CAP_BYTES` 250 KB → 4 MB (HANDOFF item 6). The cap governs only the
  disposable `.evidence-fulltext/` scratch store, not the committed record.

Selftest 37 → 39.

## Routing for the remaining 28, measured the same hour from BOTH networks

Worklist: `Claude outputs/browser-pass-round3-worklist-2026-09-04.json`.

- **Dead from the bridge VM AND the cloud sandbox** — `dse.bihar.gov.in`,
  `archive.stats.govt.nz` (2 edges), `gujecostat.gujarat.gov.in`.
- **Genuine Cloudflare from both, so browser-only** — `vancouver.ca`,
  `unicef.org`, `documentcloud.org`, `regjeringen.no`,
  `transparencia.municipiodeoaxaca.gob.mx`, `rssobarmm.psa.gov.ph`,
  `dnd.gov.ph`, `bcp.gov.py`.
- **Reset or timeout from both, browser next** — the `.gov.in` family
  (`pc.odisha.gov.in`, `des.assam.gov.in`, `indianrailways.gov.in`,
  `mod.gov.in`, `descg.gov.in`), `insse.ro`, `nhc.gov.cn`, `bok.or.kr`,
  `ipdp.cdmx.gob.mx` (2 edges), `resource.capetown.gov.za`.
- **Sandbox-only — run these from the cloud container, not the VM** —
  `czt.nx.gov.cn` (VM cannot resolve it, sandbox served 64 KB) and
  `minfin.gov.ru`. Both flap; retry rather than believing one failure.
- **200 with a JS shell of 0-39 characters, so browser jobs, not dead hosts** —
  `dcc.go.tz` (8 chars), `himachalservices.nic.in` (39), `legilux.public.lu`
  (7), `news.ontario.ca` (16), and `mid.ru` (0 to curl, 43,237 in Chrome).
- **Scanned, needs OCR** — `minfin.gov.ru/.../Poryadok_128n.pdf`: 200,
  864,760 bytes, 15 characters of text. `tesseract` is on both machines;
  the route caps the grade at B.

## Method notes

The capture recipe in PLAYBOOK §6 works unchanged, with three additions
recorded there this round: a `Content-Disposition: attachment` PDF does not
navigate (the tab silently stays put — check `location.href` in-page, then
fetch the PDF from the host's landing page); Cloudflare may still answer the
FIRST in-page fetch with the challenge, so wait for `document.title` to change
and fetch again; and a `get_page_text` result over ~50 KB is persisted to a
file the sandbox can read, which is free transport — call it two or three times
in one batch to push a smaller capture over the line rather than retyping it,
because retyping is lossy (19,251 characters came back as 19,093).
