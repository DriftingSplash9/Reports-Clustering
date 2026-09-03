# Per-host fetch strategies in the grader — 2026-09-03 (round 3d)

Follows `grader-batch2-2026-09-03.md`, which measured **422 edges across 116
hosts that grade C only because the sandbox could not read the page**. The brief
for this round was to wire PLAYBOOK §6's three documented workarounds for the
four biggest of those hosts into `getDoc` and re-grade — and to be honest about
which of them are actually scriptable.

**Headline: the browser-pass list is 422 → 232 edges, tested, not promised.
187 of the 422 documents were read; 114 of them only because of the new fetch
strategy. Corpus grades move 226 A / 1,202 B / 1,300 C → 233 A / 1,332 B /
1,163 C.** None of the three documented workarounds turned out to be scriptable;
what worked was something else, and finding that out is most of this note.

**Thomas ruled the same day: a document read from an archived snapshot caps at
B** (§3.1). That is why the A count moves by 7 rather than 22 — the other 15
cleared every evidence test an A clears and are held at B on provenance alone.
The ruling is applied in the corpus and in the code, and every number in this
note is post-ruling.

---

## 1. The three documented workarounds, tested — all three fail

Each was tried with plain curl from both environments (cloud sandbox and the
bridge VM on Thomas's machine), and judged by `file` on the body, never the
status code.

| §6 workaround | Verdict |
|---|---|
| `bps.go.id` → `web-api.bps.go.id` | **Not scriptable.** The sibling host is real and unwalled — `web-api.bps.go.id/download.php` answers with a PHP decryption error rather than a challenge, so it is reachable. But it serves files only against a signed `download.php?f=<token>`, and the token is read out of the publication page's DOM. The publication page is the Cloudflare-challenged thing. The workaround was written for a human with a browser and it still needs one. |
| `ibge.gov.br` → `ftp.` / `biblioteca.` / `concla.` | **Not applicable, and half-stale.** `ftp.ibge.gov.br` is wide open (200, real directory index) and `servicodados.ibge.gov.br` serves JSON, but both carry *documents* — every ibge.gov.br URL the corpus cites is an `/estatisticas/...` landing page with no file behind it. `biblioteca.ibge.gov.br` and `concla.ibge.gov.br` are themselves Cloudflare-challenged now; §6 has gone stale on those two. |
| `imf.org` → the Google-viewer route | **Not scriptable.** `docs.google.com/viewer?url=…&embedded=true` returns a 4.6 KB JavaScript shell to curl. The viewer is a browser instrument. |

**And §6's imf.org premise is backwards today.** It says "imf.org PDF
*documents* (not press releases) 403 everything". Measured: the `/-/media/…`
PDFs are the readable half (all 11 cited ones read cleanly with plain curl from
an ordinary network) and it is the `/en/News/Articles/…` press releases that
Akamai denies, from every route tried. Corrected in PLAYBOOK §6.

## 2. What actually moved the number: where the fetch runs, and an archived copy

Two findings, and the second is the one that ships.

**(a) A third of the "wall" was the sandbox's own egress proxy, not the site.**
The cloud sandbox routes every request through an MITM proxy at
`127.0.0.1:45017` with its own CA. That proxy's IP and TLS fingerprint are what
these hosts see. Re-probing all 300 distinct URLs from the bridge VM instead
(Thomas's own network, plain curl) read 18 URLs / 20 edges the sandbox could
not — imf.org's PDFs are 12 of them — and, decisively, **`web.archive.org` is
blocked outright from the sandbox** ("Blocked by egress policy" on http,
connection reset on https) while `archive.org` is allowed. Two dead ends were
also measured and are worth not retrying: `curl_cffi` with Chrome TLS
impersonation is reset by the proxy on every host, and headless Chromium cannot
connect through it at all, with or without `--proxy-server` and
`--ignore-certificate-errors`. **There is no browser in the cloud sandbox.**

**(b) An archived snapshot of the SAME url reads 114 edges nothing else could.**
Of the 266 URLs unreadable from the bridge VM directly, 130 have a Wayback
snapshot and 94 of those extract to a real document. That is the strategy that
went into `getDoc`.

## 3. What was built

**`fetchOne` is now one direct attempt plus a strategy table** (`fetchRaw` is
the old body). One strategy is live: an archived snapshot, fetched with the
`id_` raw-bytes suffix so the archive's own toolbar never becomes text the
grader matches quotes against. Three rules keep it honest:

1. **A strategy is a second route to the document the edge already cites, never
   a different document.** Swapping in a better source is research; this script
   does not do research.
2. **`dead` (4xx) is deliberately NOT rescuable** (`snapshotRescuable`). A 404
   means the citation has rotted, which is exactly what the 131-edge dead-URL
   list measures; letting an archived copy quietly grade it A would hide the rot
   behind a good grade. Only `wall`, `network` and `empty` may be rescued —
   those say nothing about the citation, only that this machine could not read it.
3. **A snapshot that is itself walled, empty or gone leaves the ORIGINAL failure
   standing**, so the browser-pass list keeps naming the real host and the real
   reason rather than "web.archive.org 404".

The substitution is recorded, not hidden: `Fetched.via` carries
`wayback <timestamp>`, it is written into the committed `evidence-cache/` header
beside `final-url`, and `summarise` prints a **READ VIA AN ARCHIVED SNAPSHOT**
block by host. Nothing about the grading bar was loosened at any point.

### 3.1 Thomas's ruling: a snapshot read caps at B (2026-09-03)

The first pass produced 22 A grades, **15 of them read from an archived copy
rather than the live page**. An archived read says "this quote was in this
document on `<timestamp>`" — a weaker claim than "this quote is in this
document" — and once the grade is written the difference is invisible on screen.
Thomas's call: **cap it at B.** One A must not mean two things.

Applied as a guard placed **after** the A bar, not inside it: the bar is
untouched, and an edge landing there has cleared every evidence test an A
clears; the only thing against it is where the bytes came from. It keeps its own
reason string, `quote-found-artefact-named-via-snapshot`, so the class stays
greppable if the live host ever becomes readable again. **15 edges capped.**

Two consequences worth stating:

- **`writeGrades` only writes `evidence_quote` on an A**, and a snapshot read is
  now never an A — so a machine-written `evidence_quote` in this corpus always
  means "found in the live document", never "found in an archived copy". The 15
  quotes the pre-ruling pass had written were removed again (generated edit,
  14 files); the 7 belonging to direct-read A grades stay.
- **The 7 surviving A grades were all read directly.** Nothing in the corpus is
  graded A off an archive.

**Three smaller changes.**

- **`--edges <path[#key]>`** — the re-grade selector, and the answer to the
  brief's question. `--skip-graded` is the selector for a *forward* pass and
  selects nothing on a re-grade, where every edge you want is graded by
  construction. Selecting by slice file instead would have pulled in every other
  edge in 101 files and let a flaky fetch rewrite good A grades — PLAYBOOK's own
  "select on the work, not on the container". The file may be a bare array of
  `{source, target}` or an object with the array under a key, so last round's
  debt JSON feeds straight in.
- **`--refetch`** — ignore the `.evidence-fulltext/` scratch store. Required
  after any change to how a document is fetched: a FAILED fetch is cached like
  any other, so the obvious way to re-grade after teaching the fetcher a new
  route is a cache hit on the old failure and a silent no-op.
- **`--no-snapshot`** — the measurement flag for "what can this machine read on
  its own".
- **The BROWSER PASS block was missing the `empty` class.** A 200 that extracts
  to nothing is a JavaScript shell — a fetch problem in exactly the sense the
  browser fixes. Its absence made the printed list 62 edges shorter than the
  debt list built from the same run. Fixed; the two agree now.

`--selftest` is 18 → **26 checks**, all passing. `tsc --noEmit` clean,
`npm run validate` exit 0 with the new A grades in.

## 4. The result, by host

Offline (stricter) pass, which is what the corpus carries.

| host | edges | read | via snapshot | A | B | C |
|---|---:|---:|---:|---:|---:|---:|
| `bps.go.id` | 41 | 6 | 6 | 0 | 4 | 37 |
| `imf.org` | 33 | 27 | 15 | 1 | 23 | 9 |
| `ibge.gov.br` | 32 | 20 | 20 | 0 | 19 | 13 |
| `psa.gov.ph` | 31 | 7 | 7 | 0 | 7 | 24 |
| `canada.ca` | 14 | 14 | 0 | 1 | 8 | 5 |
| `inegi.org.mx` | 13 | 0 | 0 | 0 | 0 | 13 |
| `bsp.gov.ph` | 11 | 2 | 2 | 0 | 1 | 10 |
| `bls.gov` | 10 | 10 | 0 | 0 | 8 | 2 |
| `localgovernment.vic.gov.au` | 9 | 0 | 0 | 0 | 0 | 9 |
| `mospi.gov.in` | 9 | 1 | 1 | 0 | 1 | 8 |
| `legislation.govt.nz` | 9 | 4 | 4 | 0 | 2 | 7 |
| `yukon.ca` | 9 | 0 | 0 | 0 | 0 | 9 |
| `boi.org.il` | 8 | 8 | 8 | 0 | 4 | 4 |
| `codes.findlaw.com` | 8 | 2 | 2 | 0 | 2 | 6 |
| `gso.gov.vn` | 6 | 6 | 6 | 0 | 6 | 0 |
| `anuario.ine.gob.bo` | 6 | 0 | 0 | 0 | 0 | 6 |
| **all 116 hosts** | **422** | **187** | **114** | **7** | **131** | **284** |

The `A` column is post-cap: **15 further edges cleared the A bar and are held at
B because their document was read from an archived copy.** `imf.org` loses 5
that way, `ibge.gov.br` 1, `bps.go.id` 1, `psa.gov.ph` 1, and the rest are
singletons.

`canada.ca` and `bls.gov` read direct with no strategy at all — they were an
HTTP/2 stall and a transient refusal on the day of batch 2, not a wall.
`portal.tcu.gov.br`, `sco.ca.gov`, `rosstat.gov.ru` and `stats.gov.cn` are the
same story.

**All 7 surviving A grades were read directly from the live host.**
**Corpus: 226 A / 1,202 B / 1,300 C → 233 A / 1,332 B / 1,163 C.** A-share
8.3% → **8.5%**. Nowhere near a `minGrade` → A flip; the backfill is still the
lever that matters.

## 5. What remains genuinely browser-only — 232 edges, 71 hosts

Re-measured, per edge, in `Claude outputs/grade-browser-pass-2026-09-03.json`
(same shape as last round's, so it feeds straight back into `--edges`).
By block: **145 wall, 62 JavaScript shell (`empty`), 25 network, 3 gone.**

| n | host | why it is browser-only, in one line |
|---:|---|---|
| 35 | `bps.go.id` | Cloudflare challenge on every host and path, from both networks; **no Wayback snapshots at all** (BPS is not archived), and the sibling-host route needs a DOM-read signed token. The single hardest host in the corpus. |
| 24 | `psa.gov.ph` | Cloudflare JS challenge everywhere; only 7 of its 22 URLs have a usable snapshot. §6's "a real browser or a non-PSA host carrying the same document" still stands. |
| 13 | `inegi.org.mx` (+4 `en.www.`) | Akamai; no snapshot extracted to a document. |
| 12 | `ibge.gov.br` | the residue after the 20 the snapshot rescued — landing pages with no archived copy. |
| 9 | `localgovernment.vic.gov.au` · 9 `yukon.ca` · 9 `bsp.gov.ph` · 8 `mospi.gov.in` | Cloudflare / JS-rendered portals with no usable snapshot. |
| 6 | `imf.org` | the press releases only — `/en/News/Articles/…`, Akamai-denied from every route, and the six with no snapshot. |
| 6 | `codes.findlaw.com` · 6 `anuario.ine.gob.bo` · 5 `legislation.govt.nz` | JS shells (`empty:tiny-body`). |
| ≤4 | 60 further hosts | 1–4 edges each; the tail is still the tail. |

**The honest read on browser time:** the four hosts that were 137 edges are now
78, and 59 of those are two hosts (BPS and PSA). One Claude-in-Chrome session
per host on `bps.go.id` and `psa.gov.ph` is worth more than the other 69 hosts
combined.

## 6. Appendix — the run

- `Claude outputs/grade-hoststrategy-2026-09-03.json` — all 422 per edge, with
  `via` and the grade each carried before.
- `Claude outputs/grade-hoststrategy-2026-09-03.txt` — the run's stdout.
- `Claude outputs/grade-browser-pass-2026-09-03.json` — the 232 that remain.

Fetch pass then `--offline --write`, as every batch does. **One** edge
disagreed between them (`uy-asignaciones -> uy-ipc`, B online, C offline) — the
documented offline-is-stricter behaviour, and the corpus carries the C. The
snapshot cap was applied in a third `--offline --write` pass over the same 422
once Thomas ruled; `--selftest` 26 → **28** with two checks for the cap itself
(an otherwise-A snapshot read grades B; a direct read still grades A).

Run on the bridge VM, concurrency 6 (not 10: a large share of these requests go
to archive.org). 300 URLs, three of the four biggest hosts among them. Corpus
unchanged at 3,341 reports / 2,736 dependencies; `evidence-cache/` still 1,670
documents, 300 of them rewritten with today's header.
