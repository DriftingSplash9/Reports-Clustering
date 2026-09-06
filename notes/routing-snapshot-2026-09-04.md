# Routing snapshot — 2026-09-04

**This file is expected to be wrong.** It is a dated reading of which hosts
answered which machine, kept out of `PLAYBOOK.md` because host reachability
decays faster than anything else in this repo — three times in one day during
the 2026-09-04 rounds. **Re-probe before you act on any row.** One `curl`
sweep with a browser UA and a ~20 s timeout reclassified a dozen hosts in a
single call; that is cheaper than reading this file and believing it.

The durable rules that used to be buried in these entries now live in
`PLAYBOOK-CORPUS.md` §6 (a "walled" verdict is a claim about one network; robots is a
claim about the fetch tool; say which machine you were on) and the recipes in
`notes/techniques-2026-09-04.md`.

## Three networks, none a superset of the others

| | what it is | notes |
|---|---|---|
| **cloud sandbox** | agent container, MITM egress proxy on its own CA | **no browser at all**; `web.archive.org` blocked outright (plain `archive.org` allowed); `curl_cffi` TLS impersonation reset on every host; headless Chromium cannot connect through the proxy |
| **bridge VM** | Linux VM on Thomas's machine, `device_bash` | home connection, no proxy; the default place to run the toolchain |
| **Thomas's Chrome** | Claude-in-Chrome | real browser, real cookies; beats Cloudflare on hosts that 403 both the others |

Measured the same hour, 2026-09-03/04: the bridge VM read 18 URLs / 20 edges
the sandbox could not (imf.org PDFs among them); `minfin.gov.ru` does not
resolve from the VM and returns 200 from the sandbox.

## Host readings (2026-09-04 unless dated otherwise)

| host | reading |
|---|---|
| `web-api.bps.go.id` | **200 to plain curl from the VM**, all five signed-token PDFs, 3.9–22.3 MB. The token must be minted in a browser; anyone can then fetch it |
| `www.bps.go.id` | Cloudflare interstitial, clears in 6–10 s in Chrome — but **only reliably after a reload**; first navigation can sit on "Just a moment…" past 40 s |
| `psa.gov.ph` | **never challenges a real browser.** Its "Cloudflare-walled on every host and path" reputation is about curl and the cloud proxy |
| `anstat.ci` | 403 (genuine `cf-browser-verification`) from VM **and** sandbox; fine in Chrome. First in-page `fetch` may also get the challenge — wait for `document.title` to stop reading "Just a moment...", then refetch |
| `slovak.statistics.sk`, `regjeringen.no` | same shape as `anstat.ci` |
| `imf.org` | `/-/media/files/...` **PDFs read cleanly with plain curl**; `/en/News/Articles/...` **press releases are Akamai-denied from every route**. The Google-viewer workaround is not scriptable (4.6 KB JS shell to curl) |
| `dsbb.imf.org` | tables JS-walled at page level; the SPA's JSON API answers directly — see techniques |
| `ibge.gov.br` | Cloudflare JS challenge to curl; **loads fine in Thomas's Chrome**. `ftp.ibge.gov.br` and `servicodados.ibge.gov.br` (JSON API) wide open, but only help for FILES — every ibge URL the corpus cites is a landing page with no file behind it. `biblioteca.` and `concla.` are themselves challenged now |
| `.gov.in`, `.gov.br` | **NOT blocked in Thomas's Chrome** (`mospi.gov.in`, `ibge.gov.br` both load). They 403 or fail DNS from the bridge VM, which is what was actually measured when they were written off |
| `bok.or.kr` | signed `fileDown.do` returns 200 / 281,837 to plain curl **from the sandbox**; its `file-cdn.bok.or.kr` redirect **did not resolve from the bridge VM** |
| `nhc.gov.cn` | reachable from the sandbox but 18.3 MB / >45 s — reads as a dead host on a short timeout. `curl -C -` in a retry loop |
| `czt.nx.gov.cn` | resolves from the sandbox, not the VM, and **flaps** — first attempt reset, second returned 64,122 bytes |
| `insse.ro` | SSL-chain error on the VM, 503 with `-k`; **a browser job, not a cert problem** |
| `minfin.gov.ru` | `curl: (6)` from the VM, **200 from the sandbox** |
| `rosstat.gov.ru`, `sis.gov.eg` | dead from both |
| `podaci.dzs.hr`, `capmas.gov.eg` | 200 from the sandbox |
| `stats.gov.cn`, `bps.gub.uy` | 200 once a `www.` prefix was added / a transient DNS failure passed — both had been logged "could not resolve host" |
| `anuario.ine.gob.bo` | never walled at all |
| `mnr.gov.cn` | unreachable from the sandbox (DNS/proxy). Mirrors: creva.org.cn, fdi.mofcom.gov.cn, gov.cn announcements |
| `mhlw.go.jp`, `mofa.go.jp` | comprehensively bot-walled (MOFA serves an explicit Akamai "Access Denied"). Prefer `e-stat.go.jp`, which is curl-clean |
| `gob.mx` | Akamai-challenges HTML, serves `/cms/uploads/attachment/file/...` PDFs to plain curl |
| `gso.gov.vn` / `nso.gov.vn` | die at the TLS handshake from every route; **provincial subdomains work** (`thongkecaobang.gso.gov.vn`) and republish head-office content |
| `mnd.gov.tw` | wide open to curl including every `File/<id>` PDF — was written off as robots-blocked for a whole round |
| `tuik.gov.tr` | closes a large transfer early (curl 18 → a truncated PDF the grader reads as `empty:tiny-body` at 200). Reads whole on the next try; `--refetch` |
| `ws.dgbas.gov.tw` | incomplete TLS chain (curl 60); the grader's `-k` retry handles it, a plain script needs `-k` |
| `cbi.ir` | F5-walled everywhere tried |
| `bcentral.cl`, `unece.org`, `banrep.gov.co`, `mef.gob.pe` | walled from the VM (2026-09-03) |
| `s-circabc.europa.eu` | one dead host carrying 58 of the corpus's dead-URL edges |
| `web.archive.org` | blocked from the cloud sandbox; fine from the VM. Availability API 429s within a minute of a corpus-scale pass |
| Chrome extension site list | **not a durable blocker.** All five hosts recorded as "refused by the extension" on 2026-09-04 navigated first try later the same day. Re-test before reporting one |
| `transparencia.municipiodeoaxaca.gob.mx` | Cloudflare "Just a moment" to both machines; clears in Chrome on the first navigation, and the 4.98 MB PDF then `fetch()`es same-origin (2026-09-04, round 5) |
| `rssobarmm.psa.gov.ph`, `www.dnd.gov.ph` | same — Cloudflare challenge to both machines, first-navigation clear in Chrome (2026-09-04, round 5) |
| `documentcloud.org` | Cloudflare HARD block from both machines ("Sorry, you have been blocked"), not a challenge. The BRICS declaration it mirrors is on `dirco.gov.za` and curls clean (2026-09-04, round 5) |
| `ipdp.cdmx.gob.mx` | **dead on all three networks** — TCP reset from VM and sandbox, `ERR_CONNECTION_TIMED_OUT` in Chrome, and no Wayback snapshot (2026-09-04, round 5) |
| `resource.capetown.gov.za`, `mfma.treasury.gov.za` | dead the same way from all three. `www.capetown.gov.za` and `www.treasury.gov.za` both answer 200 — only these hosts refuse (2026-09-04, round 5) |
| Chrome extension, pending grant | a domain awaiting approval leaves the tab WHERE IT WAS while `navigate` reports success — indistinguishable from a permanent block until the grant lands. After it, the host behaves normally (`chrome-error://` if dead). **Ask, then re-probe, then record** (2026-09-04, round 5) |

## Added 2026-09-06 (thin-coverage rounds 1 and 2)

The file's date stays 2026-09-04 because `HANDOFF.md` §1 and `PLAYBOOK.md` §1 both point at
that name; these are additions, not a new snapshot, and they are as stale-on-arrival as
everything above.

| host | reading |
|---|---|
| `ons.gov.uk`, `legislation.gov.uk`, `gov.uk`, `assets.publishing.service.gov.uk` | 200 to a browser-UA curl from the cloud sandbox, clean text. `legislation.gov.uk` wants `/section/N/data.xht?view=snippet&wrap=true` — the plain section page renders thin |
| `obr.uk` | **403 to every curl variant** — plain, browser UA, and a full Chrome header set over HTTP/1.1, homepage and document paths, from BOTH networks. Not a wall: **HM Treasury publishes the Economic and fiscal outlook first-party on `assets.publishing.service.gov.uk`**, which is where the corpus's `gb-obr-efo` evidence comes from. Go there first; do not re-run the 403 ladder |
| `bankofengland.co.uk`, `rba.gov.au` | JavaScript shells to a text fetcher (the RBA says so out loud: "It appears JavaScript is currently blocked"). PDF paths are the way in — BoE `/-/media/boe/files/monetary-policy-report/<year>/<month>/monetary-policy-report-<month>-<year>.pdf`, RBA `/publications/smp/<year>/<mon>/pdf/statement-on-monetary-policy-<year>-<mm>.pdf` |
| `abs.gov.au` | 200 for `/statistics/...` and `/methodologies/...`, which convert cleanly. **`/census/*` is a JavaScript shell** (1–4 KB of nav, no body) — for census facts use `/about/legislation-and-policy/legislative-framework`, which fetches. Methodology slugs are versioned per issue and guessing the period 404s constantly |
| `gov.scot` | **rate-limits under repeated rapid fetches: HTTP 202 with a ~2 KB challenge body, then 200 again after a pause.** Neither a wall nor link rot. Space requests ~20 s and retry; a verification pass that hammers it will report every quote missing (2026-09-06) |
| `cso.ie`, `irishstatutebook.ie`, `centralbank.ie` | 200, no trouble. CSO "Background Notes" pages, one per release edition, are the highest-yield Irish methodology source |
| `nrscotland.gov.uk`, `nisra.gov.uk`, `datavis.nisra.gov.uk`, `gov.wales`, `scotlandscensus.gov.uk`, `fiscalcommission.scot` | all 200. `nrscotland.gov.uk/publications/mid-<year>-population-estimates/` 302s to an `-outdated` slug once superseded; NISRA's census hub is `/statistics/census/census-2021` |
| `legislation.gov.au` | 200; `/C1905A00015/latest/text` gives the whole Census and Statistics Act 1905 as clean text |
