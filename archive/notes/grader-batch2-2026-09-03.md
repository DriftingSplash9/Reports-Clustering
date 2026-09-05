# Grader batch 2 — the rest of the corpus — 2026-09-03 (round 3c)

Follows `grader-batch1-2026-09-03.md`. How the grader decides is still
`grader-dry-run-2026-09-03.md` — unchanged this round. This note is the
corpus-wide result and the three debt lists it measures.

**Every live edge in the corpus now carries an `evidence_grade`.**

---

## 1. What ran

Six batches, Midvamp §4's order: Grok-derived slices first, hand-researched
EU/US/CA/NZ/AU last. Each batch was fetched once (no `--write`), the summary
read, then re-run `--offline --write`; `npm run validate` between every batch,
exit 0 every time.

| batch | what | edges | A | B | C | A% |
|---|---|---:|---:|---:|---:|---:|
| batch 1 | the four standards (round 3b) | 304 | 42 | 115 | 147 | 14% |
| **G1** | Grok BRICS/Asia — ru, int-brics, br, in, cn, jp, kr, il, tw, sg | 477 | **0** | 125 | 352 | 0% |
| **G2** | Grok Americas/Canada — on, mx, bc, qc, territories, andean, prairies | 314 | 32 | 145 | 137 | 10% |
| **G3** | Grok remainder — Gulf, Africa, Pacific, classification hubs | 88 | 11 | 29 | 48 | 13% |
| **N1** | hand-researched non-Western — Asia, Africa, LatAm, ME, cross-cutting | 833 | 48 | 399 | 386 | 6% |
| **N2** | hand-researched EU/EEA + ESS/Eurostat/EDP, NL/DE/NO/UK/BG/LU | 294 | 42 | 154 | 98 | 14% |
| **N3** | hand-researched US/CA/NZ/AU | 418 | 52 | 239 | 127 | 12% |

**Corpus-wide, as written: 226 A · 1,202 B · 1,300 C** across 2,728 research-slice
edges (the 8 edges that live only in the hand-written seed files are not
machine-written and stay ungraded — `writeGrades` skips them by design).

**A-share is 8.3%, not the sample's 18%.** The audit's 56-edge sample was not
representative: it over-sampled the four standards and the hand-researched
branches. This is the number that matters for the `minGrade` flip (§5 below).

### The G1 result is the round's real finding

**477 Grok-derived BRICS/Asia edges produced zero A grades.** 258 of them carry
no quoted span in `basis` at all, and 143 of those also name the target nowhere
in the cited document. This is the audit's "Grok-derived slices did not hold"
finding, now measured rather than sampled: it is not that these edges fail on a
technicality, it is that most of them were minted from a paraphrase with no
sentence behind it. Compare N2 (hand-researched EU) at 14% A on the same bar.

The Grok slices in the Americas (G2, 10%) and the remainder (G3, 13%) do better
than G1 — the difference is that those rounds went through a verification pass
that quoted its sources.

---

## 2. Research debt — the three lists Thomas asked for

All three are in `Claude outputs/grade-batch2-debt-2026-09-03.json`, per edge with
source, target, slice file and URL. **These are citation problems the grader
measures. None of them is a grader bug.**

### (a) Dead URLs — 131 edges corpus-wide (audit ruling 7)

Batch 1 found 30; the corpus total is **131**. One host is more than a third of it:

| n | host | |
|---:|---|---|
| **58** | `s-circabc.europa.eu` | **the host itself is gone** — `https://s-circabc.europa.eu/` 404s at the root, and the same `/ui/group/<id>/library/<id>/details` paths 404 on `circabc.europa.eu` too. All 58 are EU/ESS edges pointing at one CIRCABC library. One fix, 58 edges — but it needs someone to find where that library moved, not a URL rewrite. |
| 16 | `singstat.gov.sg` | 404 with and without `www.` — Singapore reorganised its site |
| 9 | `dane.gov.co` | |
| 4 | `gccstat.org` | |
| 3 | `niccdies.climate.gov.ph`, 3 `cgc.gov.au` | |
| 1–2 | 31 further hosts | |

### (b) Browser pass — 422 edges unreadable from the sandbox, 116 hosts

Anything walled (`wall:*`), network-failed (`network:*`) or extracting to nothing
(`empty:*`). Batch 1's list was 44 edges dominated by imf.org; corpus-wide the
concentration is different:

| n | host | note |
|---:|---|---|
| 41 | `bps.go.id` | Cloudflare — PLAYBOOK §6 has the `web-api.bps.go.id` sibling-host workaround |
| 33 | `imf.org` | Akamai deny — §6's Google-viewer route |
| 32 | `ibge.gov.br` | Cloudflare — §6 names `ftp.`/`biblioteca.`/`concla.ibge.gov.br` |
| 31 | `psa.gov.ph` | Cloudflare-JS on every host and path; §6 says a real browser or a non-PSA host |
| 14 | `canada.ca` | HTTP/2 stall |
| 13 | `inegi.org.mx` | |
| 11 | `bsp.gov.ph` · 10 `bls.gov` · 9 `mospi.gov.in` · 9 `yukon.ca` · 9 `localgovernment.vic.gov.au` · 9 `legislation.govt.nz` · 8 `boi.org.il` · 8 `codes.findlaw.com` | |
| ≤6 | 102 further hosts | the long tail is genuinely long — 102 hosts hold 1–6 edges each |

**The top four hosts are 137 of the 422.** Four browser sessions move a third of
the list; PLAYBOOK §6 already carries a documented workaround for three of them,
so those may not need a browser at all — they need the workaround wired into the
grader as a per-host fetch strategy. That is a build round, not a Thomas round.

### (c) No URL at all — 162 edges

Batch 1 found 40 (all into the four standards). Corpus-wide it is **162**, and it
is almost perfectly concentrated: **every one of them is in a `*-wiring-grok-2026-08`
slice.**

| n | slice |
|---:|---|
| 30 | `mexico-wiring-grok-2026-08.json` |
| 25 | `andean-wiring-grok-2026-08.json` |
| 20 | `ae-sa-wiring-grok-2026-08.json` |
| 20 | `ar-cl-wiring-grok-2026-08.json` |
| 17 | `ir-iq-tr-sy-wiring-grok-2026-08.json` |
| 16 | `jp-kr-wiring-grok-2026-08.json` |
| 13 | `taiwan-wiring-grok-2026-08.json` |
| 10 | `indonesia-wiring-grok-2026-08.json` |
| 8 | `ph-vn-th-mm-wiring-grok-2026-08.json` |
| 3 | `af-ye-sd-so-wiring-grok-2026-08.json` |

The validator's own line reads "162 cite no evidence_url at all (162 of them carry
a quote in basis — citation lost, recoverable)". Ten files, one production run,
one shape of mistake. That is a re-research target with a known boundary, not a
scatter.

---

## 3. One grader change: `--skip-graded`

Batching by slice file re-selects **every** edge in the file, including ones an
earlier batch already graded and wrote. That is not free and not safe: a host that
is merely down today would rewrite yesterday's A as a C, and nothing in the output
would distinguish a real regression from a flaky fetch. `--skip-graded` drops any
edge that already carries an `evidence_grade`.

**Selection only.** The grade table, the matching helpers and the naming helpers
are untouched; `--selftest` still passes 18/18 and `tsc --noEmit` is clean.

---

## 4. Two things learned about running the grader

**(a) An `--offline` re-run is not always identical to the online run — it is
stricter at the network boundary, and that is the correct direction.** Five edges
across the whole round graded differently between the fetch pass and the
`--offline --write` pass. The cause: a URL whose fetch *failed* leaves no document
in the scratch store, so the offline pass grades it on the recorded failure
instead of on the body the online pass happened to get. All five sat on the B/C
line and all five are hosts that fail intermittently (`czt.nx.gov.cn`,
`decentralisation.gouv.dj`, `mods.go.kr`, `web.sipa.gov.tw` ×2, `uemoa.int`).
**The corpus carries the offline grades, because writing the stricter of two
readings is the whole design.** But it means the per-edge JSON in `Claude outputs/`
(the online pass) and the corpus disagree on those five rows. Worth knowing before
anyone diffs them.

**(b) `du -sh evidence-cache` lies by a factor of nine.** It reports 6.8 MB;
the files are **773 KB** of actual bytes across 1,670 documents — 463 bytes mean.
The gap is 4 KB filesystem block rounding on a directory of very small gzip files.
Thomas's ruling-1 projection of ~0.73 MB at ~1,700 URLs was exactly right. Measure
this directory with `find -printf %s`, never `du`.

---

## 5. Findings for Thomas

1. **The `minGrade` → A flip (plan §9 item 4) hides 92% of the graph.** 226 A out
   of 2,728. The dry run's 18% was a sampling artefact. The flip is still the right
   destination, but it lands after the backfill and the browser pass, not before —
   and "A-only" as a *default* would show a graph of 226 edges.
2. **`s-circabc.europa.eu` is one dead host behind 58 edges.** Highest-value
   single item in the whole debt list.
3. **The 162 no-URL edges are ten Grok wiring slices and nothing else.** Their
   basis text still carries the quote; only the citation was lost. Re-finding 162
   URLs for quotes you already have is a bounded research round.
4. **Three of the four biggest browser-pass hosts already have a documented
   workaround in PLAYBOOK §6** (`bps.go.id` → `web-api.bps.go.id`, `ibge.gov.br` →
   `ftp./biblioteca./concla.`, `imf.org` → Google viewer). Wiring those into the
   grader as per-host fetch strategies would move ~106 edges with no browser
   session at all. Recommend that before booking browser time.
5. **Quote backfill is now corpus-wide and still proposals-only.** 1,491 edges
   carry no quoted span; **213 have at least one candidate sentence**, 852 are
   readable with nothing qualifying, 426 are unreadable. Proposals in
   `Claude outputs/quote-backfill-batch2-2026-09-03.json`. **Your ruling on who
   accepts them is still open** (HANDOFF §3 item 1) — nothing was written, and no
   policy was invented in its absence.
   The 852 "readable, nothing qualified" is itself a finding: the document resolves
   and no sentence in it both names the target and states a dependency.

---

## 6. Appendix — the run

- `Claude outputs/grade-batch2-2026-09-03.json` — per-edge, by batch (online pass;
  `basis`/`targetReport` stripped, both live in the corpus)
- `Claude outputs/grade-batch2-2026-09-03.txt` — the six runs' stdout
- `Claude outputs/grade-batch2-debt-2026-09-03.json` — the three lists above, per edge
- `Claude outputs/quote-backfill-batch2-2026-09-03.json` — 213 candidate quotes, corpus-wide

`evidence-cache/` is now 1,670 documents / 773 KB. Batch 2 fetched about 2,000
distinct URLs in roughly 20 minutes of wall time at `--concurrency 10`.
`--selftest` 18/18, `tsc --noEmit` clean, `npm run validate` exit 0,
3,341 reports / 2,736 dependencies unchanged.
