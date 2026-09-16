# India — the NSS sampling-frame layer, 2026-09-16

Companion to `src/data/research/in-nss-frames-2026-09-16.json`. Two things here that a later
round needs: the route (which rots) and the scoping measurement (which is the reason the round
looked where it did).

## 1. THE ROUTE FINDING — worth more than this round

**`curl -k` is the difference between "dead host" and "readable" on Indian government sites.**
Three hosts return *nothing at all* to a plain fetch and 200 with certificate verification
skipped:

| host | plain | `-k` | what a prior note said |
|---|---|---|---|
| `microdata.gov.in` | 000 | **200** | — |
| `censusindia.gov.in` | 000 | **200** | a 2026-08 note already diagnosed this one: a missing eMudhra intermediate |
| `mahades.maharashtra.gov.in` | 000 | **200**, 313 kB | *"fails DNS resolution from the device-bridge network"* (2026-08-30) |

**These are certificate-chain gaps, not walls.** The eMudhra diagnosis was made once, for one host,
and never generalised — so every later round read `000` as a dead host. Maharashtra is the clearest
casualty: five orphan nodes written off as a DNS failure, behind a host that answers.

**`des.assam.gov.in` answers a PLAIN fetch now.** Its note says *"confirmed unreachable from a real
Chrome browser on the user's own machine, not just this session's sandbox — a genuine network-level
block"*. That verdict has decayed. **Re-probe, never carry a stored verdict** — and on a `.gov.in`
host, try `-k` before writing anything down.

**Still dead on both routes, 2026-09-16:** `des.karnataka.gov.in`, `descg.gov.in`,
`dse.bihar.gov.in`, `des.odisha.gov.in`, `updes.up.nic.in`, `mprna.mp.gov.in`,
`ecostat.telangana.gov.in`, `des.ap.gov.in`, `ecostat.kerala.gov.in`, `pbeso.punjab.gov.in`,
`des.tn.gov.in`, `gujecostat.gujarat.gov.in`, `udiseplus.gov.in`. Thirteen hosts, and the state
DES layer is most of them.

**`www.mospi.gov.in` IS A JAVASCRIPT SPA** and this is the round's main blocker. Every path —
`/publications-reports/innerpage/414`, `/publication/annual-report`, the root — returns the same
**2,657-byte** shell with `<script src="/assets/index-*.js">`. Its API 403s a bare guess. MoSPI is
the national statistical office and its methodology documents are unreachable by curl. **Use the
browser, or find the product on `microdata.gov.in` instead**, which is what this round did.

## 2. WHY THE COVERAGE CHART OVERSELLS INDIA

The 2026-09-15 workbook shows India with 37 zero-edge nodes, third-largest backlog in the corpus.
Measured before the round started:

- **28 of the 37 carry their publisher's BARE HOMEPAGE** as their own url. Not research waiting to
  happen — the August 2026 import's url-and-granularity defect.
- **8 carry a real document url**, and two of those eight are indiacode Acts whose edges were
  already dropped for link rot.
- The 61 WIRED nodes are fine by comparison: 52 cite real documents.
- **19 of the 37 sit on a host that answered on 2026-09-16** — better than the August round
  implied, entirely because of `-k`.

The 28 bare-url orphans are overwhelmingly **state Directorates of Economics and Statistics**, one
node per state pointed at the department's front page. That layer was already ground down on
2026-08-30 and thirteen of its hosts are still dead. **Do not re-open it as a research job; it is a
url-and-granularity job, and most of its hosts do not answer.**

## 3. WHERE THE VALUE WAS — the NADA study-description seam

**Every National Sample Survey has a full study description on `microdata.gov.in`, and each one
states its sampling frame in one sentence.** The four read this round — PLFS (catalog 284), HCES
(237), ASUSE (293), NSS health (290) — all say the same thing in near-identical template wording:

> the list of Urban Frame Survey (UFS) blocks … for the rural sector, it is the list of villages as
> per Census 2011

The corpus already held the rural half (`in-census-2011`) and had never held the urban half. Minting
`in-ufs` turned one node into four in-edges immediately, and the same four pages paid Census 2011
four more. **Eight edges off four fetches.** Two more came free: the IIP page (299) builds its
manufacturing weights on ASI results, and the ASI page (143) names the statute it runs under.

**The wording is common; the fact is each survey's own.** All four pages were fetched and read
separately rather than inferred from the template — the same discipline the EU ESMS round used, and
for the same reason.

**Catalog ids are stable and worth keeping:** 299 IIP · 293 ASUSE 2025 · 292/291 PLFS unit-level ·
290 NSS health · 284 PLFS 2025 · 256 ASI 2023-24 · 255 education modular · 238 ASUSE 2023-24 ·
237 HCES 2023-24 · 236 Time Use Survey · 230 Urban Frame Survey · 143 ASI (older).
**Unworked and matching no existing node: 236 Time Use Survey, 255 education, 239 telecom, 300
participation in education.** Each is one fetch and the same frame sentence is likely in all of them.

## 4. TWO GRADER RESULTS WORTH KNOWING

- **`Census 2011` does not name `in-census-2011`.** All four Census edges grade **B
  `quote-found-target-not-named`** at coverage 1.0, because the node carries the publisher's fuller
  title *Census of India 2011 — Primary Census Abstract* and every NSS page writes the short form.
  Adding `Census 2011` as a `title_alias` would take four edges to A in one edit and was NOT done —
  that is editing to move a grade. **If a future round wants those four at A it is a ruling, not a
  fix.**
- **`ASI` is three characters** and cannot name `in-mospi-asi` through any door (the acronym floor
  is four). The IIP page never writes *Annual Survey of Industries* in full, so `in-mospi-iip ->
  in-mospi-asi` is **B `agency-not-artefact`** and no quote on that page can do better.

## 5. THE DIRECTION ERROR IN THE AUGUST IMPORT

`in-india-2026-08.json` recorded `in-collection-of-statistics-act-2008 -> in-mospi-asi` — the Act
depending on the survey. **Backwards.** The survey is conducted under the Act, so the survey is the
dependent, as `eu-ecoicop -> eu-reg-2016-792` has it. The note is now `resolved` against the
corrected edge with its original text kept. **Worth a grep of the August import for other
instrument-as-dependent pairs** — this one was found by accident.
