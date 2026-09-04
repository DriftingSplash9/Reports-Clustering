# Routing snapshot — 2026-09-04

**This file is expected to be wrong.** It is a dated reading of which hosts
answered which machine, kept out of `PLAYBOOK.md` because host reachability
decays faster than anything else in this repo — three times in one day during
the 2026-09-04 rounds. **Re-probe before you act on any row.** One `curl`
sweep with a browser UA and a ~20 s timeout reclassified a dozen hosts in a
single call; that is cheaper than reading this file and believing it.

The durable rules that used to be buried in these entries now live in
`PLAYBOOK.md` §6 (a "walled" verdict is a claim about one network; robots is a
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
