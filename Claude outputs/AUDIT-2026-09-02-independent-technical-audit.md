# Independent Technical Audit — Economic Report Influence Graph

**Date:** 2026-09-02 (evening, UTC) · **Auditor:** outside engineer/data-quality review, no prior involvement · **Scope:** corpus, renderer/codebase, repo hygiene, per `Claude outputs/AUDIT_PROMPT_for_fable5.1.md`

**Rules kept:** no `git` command run (I read four plain files under `.git/` — `logs/HEAD`, `refs/`, `FETCH_HEAD` mtimes — as files; that is not a git command and cannot create a lock, but it is inference, and it is flagged as such wherever used). Nothing deleted. Nothing in the repo edited. One file created on your machine: `_to_delete/audit-staging-2026-09-02.tar.gz` (7.7 MB, the sandbox staging tarball) — delete it.

**Supporting ledgers delivered alongside this report** (in `Claude outputs/`): `audit-2026-09-02-evidence-sample-56.json` (per-edge verdicts), `audit-2026-09-02-url-check-1677.json` (every non-OK evidence URL with the edges behind it), `audit-2026-09-02-code-tables.md` (file measurements, state matrix, per-frame cost, test-coverage map), `audit-2026-09-02-grok-merge-table.md`.

---

## 0. Verdict in one paragraph

The corpus's stated numbers reproduce exactly, the build is clean, and the last two audits' rulings were actually applied — that part of the process works. What does not work is the part that generates the data: on a seeded random sample of 56 live, validation-passing edges, only **50% fully support the specific dependency claimed** from the cited document, 25% are weak (agency-not-artefact, paraphrase presented as quote, wrong document for the quote), 14% are not supported by the cited page at all, and 11% cite URLs that cannot be machine-verified. Five live edges are direction-reversed twins of correct edges. The #2 node in the whole graph (SNA 2008) draws 40 of its 100 in-edges from the no-URL debt, and the #3 node is the NDB's founding agreement, held up almost entirely by the NDB's own documents. On the renderer side, the screen-space edge picker has been dead code since d3 first ran (a `Map<string,…>` looked up with a node object), superseded graph instances are never disposed (a GPU-resource leak on every rebuild), and the camera-fit loop rebuilds every link mesh up to 5×/s during settle. None of this is fatal; all of it is the same root cause the last three audits found: the verification standard at import time is lower than the validator can express, so "validate passed" keeps meaning "the enumerated checks passed". Continuing to build on the *code* as-is is reasonable if the three renderer bugs are fixed first; continuing to build on the *corpus* as-is is not reasonable until the evidence warnings become errors and every Grok-derived edge gets the same raw-fetch spot-check I ran here — otherwise the next 1,000 nodes will arrive at the same 50% hit rate and node size will keep encoding research effort rather than influence.

---

## 1. Known facts, verified or corrected

| Claim in the brief | Result |
|---|---|
| 3,351 reports / 2,748 dependencies / 979 isolated | **Confirmed exactly** — fresh `npm run gen` + `validate` in a clean Linux sandbox (Node 24, own `npm install`). `public/corpus-data.json` carries 3,333/2,740; the other 18 nodes and 8 edges are the hand-written seed files (`reports.ts`/`dependencies.ts`). No hidden delta. |
| `InfluenceGraph.tsx` modified 2026-09-02 after HANDOFF (2026-08-31) | **Half right.** Both `HANDOFF.md` and `InfluenceGraph.tsx` carry mtime 2026-09-02 22:32 UTC (same minute). HANDOFF's *body* already describes every dated change in the file (drift watchdog, `__meshes`, `CORE_PERCENTILE` 0.8, `__rig.fit()`); only its header line "Last updated: 2026-08-31" is wrong. There is no `2026-09-02` marker anywhere in `src/`. |
| "Six uncommitted bodies of work" | **Not supported** (inferred, not git-verified — see §C1). At most two files are newer than the last commit. Project memory `git-no-touch.md` already records that this exact claim was carried forward false for weeks in August. |
| No lint, no CI, three manual gates | Confirmed. `tsc --noEmit` clean; `test-logic` 123/123; `vite build` clean apart from one warning (§B5). |
| Validator hides a failing `_dropped` state behind a one-line count | Confirmed in structure: `validate-data.ts` exits non-zero on `errors.length || invariantFailures`; on this run it printed 7,373 lines, 2,392 `!` warnings, no ERRORS block, exit 0. |
| Evidence debt 162 / 5 / 45 | Confirmed as the validator's count — and undercounted, see §A3. |
| One real-GPU reading | Confirmed; no second one obtained (§B3). |
| Visual revamp: zero code written | **False.** Phases 0, 0b, 1, 2 of `visual-revamp-review.md` are in the code with dated comments (2026-08-19..21: `palette.ts:608`, `modes.ts:12`, `nodeVisuals.ts`, `InfluenceGraph.tsx:2308+`). Phase 3 (GEO_EXPLORATION, dominant-relationship line style) was never built. START-HERE's "This is mid-revamp" is what's stale. |
| `_to_delete/` ~23 MB | Confirmed: 23.4 MB top-level + 0.97 MB nested. §C2. |
| Grok directory ambiguous | **Resolved: fully superseded.** §C3. |
| Prior audits' records in project memory | **Not where HANDOFF says.** HANDOFF cites `audit_2026-08-31_second_independent`, `audit_rulings_applied_2026-08-31`, `layout_blob_diagnosis_2026-08-31`, `new_countries_tier_audit_2026-08-30`, `br_in_ca_wiring_round2_2026-08-30` and others. None exist in the project memory this session can read (85 files, newest 2026-08-27). The audit reports themselves were "delivered in chat, not the repo". The most consequential week of the project has no record an agent can open. §C6. |

---

## Part A — Corpus / data quality

### A1. Numbers reproduce. Done (one line): 3,351 / 2,748 / 979, `gen` 347 slices, 0 unwired, `validate` exit 0.

### A2. Evidence spot-check — 56 edges, seeded, stratified, raw `curl` only (no WebFetch)

Method: seed 20260902, stratified by slice-file prefix (AF 7, EU 7, US 6, CA 6, NZ 4, AU 4, BRICS+ 8, everything else 14). Each URL fetched with a browser UA; PDFs via `pdftotext`; HTML tag-stripped; WAF/JS shells detected by body inspection, not status code. Grades: PASS = resolves, quote found, document states that *source* uses *target* in the direction claimed; WEAK = supports it loosely (agency not artefact, "consistent with", paraphrase-as-quote, wrong page for the quote); FAIL-CONTENT = page doesn't support the claim; FAIL-URL = dead or unverifiable.

| | n | PASS | WEAK | FAIL-CONTENT | FAIL-URL |
|---|---|---|---|---|---|
| **All** | 56 | **28 (50%)** | 14 (25%) | 8 (14%) | 6 (11%) |
| EU | 7 | 6 | 0 | 1 | 0 |
| US | 6 | 5 | 0 | 1 | 0 |
| AF | 7 | 4 | 3 | 0 | 0 |
| CA | 6 | 1 | 5 | 0 | 0 |
| NZ | 4 | 2 | 0 | 0 | 2 |
| AU | 4 | 1 | 2 | 0 | 1 |
| BRICS+ | 8 | 2 | 2 | 4 | 0 |
| Other (Asia/LatAm/ME Grok imports) | 14 | 7 | 2 | 2 | 3 |

**Severity: CORRECTNESS.** Hand-researched EU/US hold up (11/13 PASS). Everything that came through a `*-grok-*` file is the problem: `cn-china-grok-2026-08.json` went 0/3 — all three cite `stats.gov.cn/sj/ndsj/`, the China Statistical Yearbook *year list*, which contains no sentence at all; the BC Grok file went 0/3 PASS (all WEAK). The eight content failures, each verified by me from the raw body:

- `el-edp-inventory → gr-elstat-government-finance` — ELSTAT press release, quote verbatim, never mentions the inventory; the link is the basis's own inference.
- `comptroller-esf-transfer → comptroller-state-revenue-watch` — the quoted §49-g(d) text is from the Texas Constitution; the cited Revenue Watch page has no ESF content. **Quote is not in the cited document.**
- `cn-gdp-national-accounts → cn-household-income-expenditure`, `cn-statistical-yearbook → cn-gdp-national-accounts`, `cn-statistical-yearbook → cn-eco-environment-stats` — yearbook index page, no text.
- `ru-cbr-loans-statistics → ru-cbr-banking-sector-statistics` — CBR statistics listing; target series not named.
- `fr-insee-national-accounts → fr-insee-base2020-methodo` — the page *is* INSEE's "Annual national accounts (2020 Base)" presentation, but the quoted French sentence does not appear on it (I re-fetched and searched: 0 hits for "base 2020" in body text). Quote misattributed at best.
- `pr-fomb-fiscal-plan → bea-gdp` — cites the fiscal-plans *listing*; the BEA quote lives in a PDF the edge doesn't point to.

The WEAK class (14) is dominated by exactly the shapes PLAYBOOK §7 already rules against: naming the Valuer-General, not the Valuation of Land Act; "based on the audited financial statements" with Kingston never named; a condensed paraphrase inside quotation marks (`bc-budget-fiscal-plan → canada-health-transfer`). Two more patterns worth a standing rule: **a `basis` that stitches quotes from two documents while `evidence_url` points at one** (5 of 56), and **`evidence_quote` is empty on all 56** — every check depends on quotes embedded in free-text `basis`, which is why nothing automated can test it.

### A3. The "warning, not error" evidence debt — re-litigated

The validator's count (162 no-URL / 5 homepage / 45 index) is honest for the heuristic it has, and the heuristic is too narrow. `isIndexPage()` (`graph.ts:135`) recognises `folder/<n>` and a fixed word list. It does not recognise: `stats.gov.cn/sj/ndsj/` (**14 edges**, ruled an index in the sample above), `stats.gov.cn/english/StatisticalCommuniqu…` (8), `ndb.int/governance/transparency-reporting/` (6), `gub.uy/instituto-nacional-estadistica/` (6 — that is INE Uruguay's *homepage*), `ess.gov.et/agriculture/` (5) and `/households/` (3), `eac.int/overview-of-eac` (3), `oversightboard.pr.gov/fiscal-plans/` (3), `inegi.org.mx/programas/inpc/` (3). That is ~50 more edges in the same class as the 45, from the top of one list. 383 live edges cite a URL with ≤2 path segments and no document extension; not all are indexes, but that is the pool to triage.

Where the debt lands: **SNA 2008 (#2 by authority, in-degree 100) has 40 in-edges with no URL and 9 on shallow pages** — half its size rests on the debt. `imf-e-gdds` (#4): 15/49 shallow. `un-coicop-2018`: 9/36 no URL. So this is not cosmetic: the two largest spheres after ESA 2010 are partly drawn from unverifiable claims.

Is it a queue nobody works? HANDOFF names it "the obvious next agent job" and D2; the count was 162/5/45 on 2026-08-31 and is 162/5/45 today. No movement in 2 days is not damning, but nothing schedules it either. **Recommendation:** flip `no evidence_url` to a hard error *now* for any edge added after a cut-off date (a `_batch`/slice mtime gate, or simply a validator flag `--strict-new`), keep the 162 legacy edges as warnings with a dated allowlist file, and make the 45+50 index-page edges errors once the heuristic is widened to a per-host list you control. The promotion gate "when EVIDENCE reads 0/0/0" is the wrong shape — it lets every new round add to the pile as long as the pile isn't yet empty.

### A4. Duplicates and scope boundaries

- **`part_of` container modelled as a dependency edge: 0 cases** across all 2,740 edges (PLAYBOOK rule 12 is enforced and working). One line, done.
- **One live duplicate node pair the validator cannot see:** `et-ess-cpi` ("Consumer Price Index (Ethiopian Statistics Services)", publisher "Ethiopian Statistics Services (ESS)", url `ess.gov.et/price/`) and `et-cpi` ("Consumer Price Index (CPI) – Ethiopia", publisher "Ethiopian Statistical Service (ESS)", url `ess.gov.et/`). DUPLICATE-SHAPED matches exact title+publisher+country; a one-letter publisher difference defeats it. Severity: CORRECTNESS (splits Ethiopia's CPI in-degree across two spheres).
- **Edition-splitting is limited, not systemic:** 7 families / 20 nodes where titles are identical after stripping years (`bw-auditor-general-report-2018-2019` vs `-2019-2020`; three Lesotho AG reports; two Mauritius NAO audits; `ndb-general-strategy-2017-2021` vs `2022-2026`; `brics-jsp-snapshot` vs `-2025`). SNA 1968/1993/2008/2025 are legitimately distinct. The BRICS JSP family (`brics-jsp`, `brics-jsp-2024`, `brics-jsp-snapshot`, `brics-jsp-snapshot-2025`, `in-brics-jsp-india`) is five nodes for one publication line, and `in-brics-jsp-india`'s `url` is the `brics.ibge.gov.br/publicacao.html` index the second audit ruled out. Severity: BITES (small in-degree leakage), fix by `part_of`/`supersedes`.
- 95 same-country title-containment pairs exist but on inspection they are mostly real sub-series (SDDS vs SDDS-Plus, an act and its amendment). Not a finding.

### A5. Directionality — 5 reversed edges live, each contradicting a correct twin

Schema (`types.ts:826`): `source_report_id` = "the report doing the referencing"; authority accrues to `target`. Nine (A→B, B→A) mutual pairs exist. Two are the deliberate StatCan mutual-definition pairs (documented as such) and one is the NZ Public Audit/Public Finance Acts (genuinely cross-referencing). **Five are wrong**, all in `jp-japan-grok-2026-08.json` and `kr-south-korea-grok-2026-08.json`:

| Reversed live edge | Its own basis says | Correct twin (also live) |
|---|---|---|
| `jp-family-income-expenditure → jp-cpi` [calculated_from] | "FIES is used to select CPI items and construct each item's weight" | `jp-cpi → jp-family-income-expenditure` |
| `jp-retail-price-survey → jp-cpi` [calculated_from] | "Retail Price Survey supplies the monthly price observations used to compute the CPI" | `jp-cpi → jp-retail-price-survey` |
| `jp-population-census → jp-labour-force-survey` [methodology_depends_on] | "LFS first-stage sampling units are Census enumeration districts" | `jp-labour-force-survey → jp-population-census` |
| `kr-household-income-expenditure → kr-cpi` [methodology_depends_on] | "CPI item weights are derived from HIES" | `kr-cpi → kr-household-income-expenditure` |
| `kr-population-census → kr-eaps` [methodology_depends_on] | "EAPS sampling frame is built from Census enumeration districts" | `kr-eaps → kr-population-census` |

Each reversed edge says the *survey* depends on the *index*, with a basis that says the opposite. Net effect: `jp-cpi`, `jp-labour-force-survey`, `kr-cpi`, `kr-eaps` each carry spurious in-degree, and the graph draws a cycle where there is a chain. Severity: CORRECTNESS. Two more mutual edges (`br-bcb-nota-fiscal-abaixo-linha ⇄ br-stn-resultado-tesouro-nacional`, both `cites`, basis "analytically complementary … reference each other") are the "consistent with" shape ruled out on 2026-08-31 and survived because they say "complementary" instead. Same fate: `_dropped` `deferred`.

The validator has no bidirectional-pair check. Add one: any (A,B) with (B,A) live is an error unless both carry a `mutual: true` flag with a basis naming the other edge. Cheap and it would have caught all seven.

### A6. `_dropped` integrity

The validator's rule-10 check (no note describes a live edge) holds: 0 violations on exact (source,target). What it misses: **10 entries quarantined `no-document` whose reverse pair is live** — e.g. `cl-casen → cl-pobreza` sits in `_dropped` under ruling 1-A while `cl-pobreza → cl-casen` is live *without a URL* (one of the 162). Same relationship, one direction quarantined, other direction kept because the 1-A sweep keyed on `evidence_url` presence and the live twin had a quote. Not dishonest, but inconsistent: the quarantine was applied by field-shape, not by claim. 56 (source,target) pairs are dropped under two different reasons in different slices (`no-document` in one, `deferred` in another) — the reader gets two answers. 80 `no-document` entries have `why` text containing "verified/confirmed/explicitly states"; I read a sample and they are honest (the verification is of a *negative*, e.g. "confirmed the page is an empty stub"), so no finding there. Severity: BITES.

### A7. Coverage and structural bias — quantified

Per-country in-degree per node (authority mass), sorted by node count:

| Country | Nodes | Isolated | Total in-degree | In-degree/node |
|---|---|---|---|---|
| CA | 272 | 7% | 305 | 1.12 |
| INT | 207 | 25% | 607 | 2.93 |
| RU | 170 | 17% | 138 | 0.81 |
| US | 140 | 6% | 142 | 1.01 |
| ID | 125 | 30% | 76 | 0.61 |
| TW | 109 | 45% | 62 | 0.57 |
| MX | 102 | 17% | 97 | 0.95 |
| IN | 97 | 35% | 51 | 0.53 |
| CN | 65 | 52% | 35 | 0.54 |
| JP | 61 | 23% | 48 | 0.79 |
| **DE** | **13** | 0% | 9 | 0.69 |
| **GB** | **13** | 8% | 6 | 0.46 |
| **FR** | **6** | 0% | 5 | 0.83 |
| **IT** | **7** | 0% | 6 | 0.86 |
| **CH** | **1** | 0% | 0 | 0 |
| EG | 59 | 90% | 3 | 0.05 |
| IR | 29 | 93% | 0 | 0.00 |

193 countries; 73 have zero total in-degree. Canada has 21× Germany's node count and 34× its in-degree; Alberta municipalities out-mass the Bundesbank. The top-40 weighted ranking contains Harris Central Appraisal District (Texas), BC Assessment Authority, NZ's Public Audit Act 2001 and Public Finance Act 1989, and Krasnoyarsk Krai's statistical yearbook — and no German, French, British or Italian publication at all. The brief's hypothesis is confirmed: **visual size currently encodes which branch was researched to municipal depth**, not real-world influence. The existing "798/979 isolated triaged" work is about *edges per isolated node*; it does not address that the *researched* countries are the wrong set for the picture the design doc promises.

The sharpest single case: **`brics-ndb-agreement-2014` is #3 in the whole graph** (in-degree 49, authority 0.344, ahead of e-GDDS, SDDS, COICOP and every national CPI). 45 of its 49 dependents are `INT` nodes — 16 published by the NDB itself, 9 "Leaders of…" summit declarations — i.e. one institution's own document set citing its founding treaty. PLAYBOOK §7 keeps legal instruments that statistics name as their basis; that rule is right, but the *authority* it produces here is a research-batch artefact (one ~49-edge NDB round) and it is the third-largest sphere on screen. Severity: CORRECTNESS of what the picture says. Options are yours (§ rulings 5-A/5-B).

### A8. Link rot — a real check of all 1,677 unique evidence URLs (2,578 edges)

Every unique `evidence_url` fetched from the sandbox (curl, browser UA, redirects followed, 35 s timeout), 2026-09-02 23:30 UTC:

| Class | URLs | Edges | Meaning |
|---|---|---|---|
| OK (2xx, real body, same host) | 1,254 | 1,937 | 75% of edges |
| **Hard 404/410** | **56** | **93** | 28 of the URLs (56 edges) are `s-circabc.europa.eu/…/details` — HANDOFF says these work in a real browser; they return HTTP 404 + an Angular shell to any fetcher, so I could not confirm that. **The other 28 URLs / 37 edges are plainly dead**: 15 `singstat.gov.sg` pages (the site restructured; a trailing-slash redirect then 404s), `gccstat.org/en/center/about` (4 edges), 2 `indiacode.nic.in`, `centralbank.ae` BoP PDF, `stats.gov.cn` press page, `unstats.un.org` docViewer, `statsghana` CPI guide, `bos.gov.ls` CPI, 3 `niccdies.climate.gov.ph`, `mef.gov.py`, `pbc.gov.cn`, `bce.fin.ec`, `bccr.fi.cr`. |
| Redirect off-host / to root | 7 | 10 | 2 to `validate.perfdrive.com` (bot wall), 1 `nkibrics.ru` → homepage, 1 `mfem.gov.ck` → filesusr (fine), `narastat.kr` → `k-stat.go.kr` (moved). |
| 200 with a tiny/JS body | 7 | 11 | 6 INEGI `programas/` pages + `himachalservices.nic.in` — JS shells, index pages by any standard. |
| WAF 403/401/202/503 | 206 | 293 | imf.org, legislation.govt.nz, boi.org.il, canada.ca, bls.gov… **Not dead, but not machine-verifiable.** |
| Network-unreachable from sandbox | 131 | 211 | `.gov.in`, `.gov.br`, `.go.kr`, `gso.gov.vn`, `ess.gov.et`… egress-blocked here (project memory `sandbox-network-egress-limits`); status unknown. |
| Other curl failures / 5xx | 16 | 23 | |

So: **37 live edges (1.4%) currently cite a dead URL; a further 56 are on CIRCABC and unverified by me; ~500 edges (19%) are on URLs no script can ever verify** (WAF or egress). That last number is the real link-rot exposure — the project's evidentiary value for a fifth of the graph depends on a human with a browser.

`scripts/check-urls.ts` checks `reports[].url` (node homepages), **not `evidence_url`** — it has never checked the edges at all. It has run once, on 2026-08-20, against the Grok staging folder (`--dir`), never against the live corpus; nothing schedules it; results carry no timestamp. Severity: BITES-IN-6-MONTHS, and the singstat cluster shows it's already biting.

---

## Part B — Renderer / codebase

Three findings I verified line-by-line myself; the rest were produced by a delegated code review and are marked with what was checked.

### B0. Three concrete bugs

**B0-1. The screen-space edge picker is dead code. CORRECTNESS (interaction).** `nearestLinkAt` (`InfluenceGraph.tsx:3388–3428`) projects each link via `positionedById.current.get(l.source)`. `linkDataRef.current` (`:1457`) holds the *same* `LinkDatum` objects passed to `.graphData({nodes, links})` (`:1549`). d3-force-3d's `forceLink.initialize` replaces `link.source`/`link.target` strings with node objects on the first tick (verified empirically in Node: `typeof links[0].source === 'object'` after one tick; `new Map([['a',1]]).get(links[0].source) === undefined`). Every `project()` returns `null`, every link is skipped, the function returns `null`, always. The missed-click rescue (`App.tsx` `onPointerMissed` → `registerEdgePicker`) and the hover fallback at `:3500` have never fired. The only edge clicks that work are direct raycast hits on a 6-segment cylinder — which is exactly the "1.6px line is not a real target" problem the picker was written to solve. Fix is one line: key the map lookup on `typeof l.source === 'string' ? l.source : l.source.id` (or store ids separately in `LinkDatum`).

**B0-2. Superseded `ThreeForceGraph` instances are never disposed. BITES.** The `forceGraph` memo (`:1140–1970`) builds a new instance on every `[graph, spreadApplied]` change; nothing calls `_destructor()`, no effect cleanup disposes geometries/materials, and R3F never disposes `<primitive>` objects (its own documented behaviour). Every tier change, drilldown, filter or spread rebuild orphans ~2.4k `MeshStandardMaterial`, ~2.7k `ShaderMaterial`, meshes and photon groups on the GPU; in dev StrictMode, twice. Long sessions of opening countries will climb in VRAM until the tab is reloaded. Verified: `grep -n "_destructor\|dispose(" InfluenceGraph.tsx` finds only the label-sprite cleanup at `:1003`.

**B0-3. `runFit` rebuilds every link mesh whenever node scale drifts >1%. BITES / perf.** `:2523–2527` re-assigns `fg.linkWidth(...)` via the scale applier (`:1756`); `linkWidth` is on three-forcegraph's *recreate* list (`dist/three-forcegraph.mjs:1199–1201`: `linkDataMapper.clear()`), so all link meshes are destroyed and rebuilt — up to 5×/s during the 12 s tracking window while the cloud expands. This, not draw calls, is the likeliest source of any "beat" during settle, and it compounds B0-2.

### B1. Decomposition (measured; tables T1–T2 in the code-tables ledger)

`InfluenceGraph.tsx`: 3,572 lines, **61% comment**, 1,209 code lines, 44 refs, one 830-line `useMemo` that is simultaneously layout seeding (`:1201–1260`), link merge + stiffness model (`:1272–1455`), material/particle factories (`:1459–1546`), library wiring (`:1548–1737`) and physics tuning (`:1770–1965`); then camera fit (`:2205–2600`), nine mutation effects, focus painting, flight, a 340-line `useFrame`, the picker, pointer handlers. Proposed split: `lib/linkModel.ts` (`buildLinkData`), `lib/layoutSeeds.ts`, `lib/forceTuning.ts`, `lib/cameraFit.ts` (`measureFit`/`nodeScaleFor` — the brief assumed this lived in `view.ts`; it doesn't, `view.ts` is constants only), `components/graphMaterials.ts`, `components/useGraphFrame.ts`, leaving ~800 lines of wiring. What breaks first: the memo is the only place that knows "every shared ref must be refilled identically per run" (B2), and the next per-link ref added inside it breaks silently in dev.

`App.tsx`: 3,494 lines; one component with **31 `useState` + 28 `useMemo` + 17 `useCallback`**, zero `React.memo` anywhere in `src/`. Every hover (`setHovered`, `:1522`) re-renders the whole tree — HUD, both cards, the Canvas children. Split `Detail` (`:2029–2372`), `Hud` (`:2739–3038`), `TierBar`/`IsolatedShelf` (`:2556–2738`), the 30 style objects (`:3114–3494`) as pure moves (~1,500 lines), then extract the 16-memo derived-state pipeline (`:427–680`) into a hook. What breaks first: visible interaction lag before the GPU is the limit.

`palette.ts`: ~1,000 of 1,439 lines are five hand tables (`COUNTRY_FAMILY`, `SCOPE_COLOUR`, `SCOPE_LABEL`, `SCOPE_GROUPS`, `COUNTRY_LABEL`) with no cross-check test — a country added to one and not another is the first thing that breaks. `types.ts`: 74% comment, no functions; fine as one file, the essays are the point. `graph.ts`: `validate` alone is 680 lines (53% of the file) beside `pagerank`, `buildGraph`, queries and — oddly — `radiusFor`, a rendering constant. Split `validate.ts`/`pagerank.ts`/`graphQueries.ts`.

### B2. Shared mutable state (full matrix T4 in ledger)

Zero module-scope `let` in `src/`. Module-scope collections are constant tables, size-keyed permanent caches (`teardropCache`, `sphereCache`, `pulseMaterials`), instance-keyed `WeakMap`s, and two real registries: `flowMaterials` (`linkVisuals.ts:118`) and `fitSync` (`InfluenceGraph.tsx:626`).

The 2026-09-01 `__meshes` fix is complete for meshes (every consumer reads `meshes.current`, which the effect at `:1978–1981` points at the instance map). **But the same memo still writes four shared refs on every run** — `linkMaterials.clear()`+refill (`:1462–1504`), `resetLinkFlow()` (`:1467`), `linkDataRef` (`:1457`), `prevGraphForLayout` (`:1202`). React 19 keeps the *first* memo result and discards the second, so the mounted instance's `linkMaterial` accessor resolves materials the orphan run created. It works today only because keys are stable and both runs refill identically — the exact precondition the mesh registry violated. Severity: BITES (dev-only today; the next per-instance material field makes it a silent no-op like the last one). Two residuals on the fix itself: the pointer effect is a passive `useEffect` while `ref.current` swaps in a `useLayoutEffect`, so one frame can `runFit` against the previous instance's map (self-corrects); and the visible-set effect at `:2798` *deletes* from the instance map, making it two-writer. Fast Refresh re-runs the memo ignoring deps → `spreadOnlyChanged=true` → layout cold-restarts on every save of the file (COSMETIC, dev).

### B3. Performance — reasoned, not measured

No real GPU here and I did not substitute a SwiftShader number. From the code: a node is **one** draw call (single `MeshStandardMaterial`, rim/hollow via `onBeforeCompile`); a link is **one** cylinder mesh with its own `ShaderMaterial` *instance* (shared program) **plus 1–4 photon meshes** (`pulseCount`), 0 for beam/tether links. Computed from the real corpus: default tier ≈ 850 calls; Everything ≈ 2,372 nodes + 2,748 links + ~3,050 photons ≈ **8,200 calls**. HANDOFF's "3,173 calls with one country open" is consistent with that formula. So "one material per link is the ceiling" is half right: it's one *object* per link, and photons are as many objects again. Sharing a material would change nothing; merging geometry would.

Ranked bottlenecks: (1) per-object CPU overhead — ~8k `Object3D` matrix updates, frustum tests and submissions per frame, plus three-forcegraph's `updatePhotons` every frame *whether or not the engine runs*; (2) B0-3's link-rebuild storm during settle; (3) transparent sorting — links are always `transparent` and `applyFocus` flips every unlit node transparent, so ~5k sorted objects per frame with a trace active; (4) raycast on every `pointermove` against all ~8k descendants, then `nearestLinkAt` loops 2,748 links doing nothing (B0-1); (5) GC — `lastPositions.set(id, {x,y,z})` allocates one object per node per frame (`:3058`, ~140k objects/s at Everything) and `measureFit` allocates ~5N `Vector3` every 2 s forever via the drift watchdog; (6) React — hover re-renders the whole App. **The d3 tick is not the problem**: custom forces are O(N)+O(C²) with C ≤ 184; the simulation stops at alpha < 0.005 or 45 s.

### B4. Scaling ceiling — a falsifiable claim

Draw calls ≈ N_scene + L + Σ pulseCount(non-beam links) ≈ N + 2.1 L. At **2×** (~6,700 nodes / 5,500 edges), Everything ≈ 16k draw calls and 16k `Object3D`s. Claim: on a mid-range laptop GPU the unfolded tier sits at ≤30 fps steady-state and settle exceeds 30 s, so the 45 s cooldown starts binding and the premature-settle path (`:2054–2061`) fires routinely. At **5×**, ~40k draw calls: unusable (<10 fps), and load-time construction of ~40k meshes with a `MeshStandardMaterial` each takes seconds on the main thread. The folded default tier scales with countries, not corpus, and stays fine — which is why the app still feels OK. Falsify on your RX 580 by reading `renderer.info.render.calls` and a frame-time sample at Everything, then at a duplicated-corpus 2×.

Required before 2×, in this order: merged link geometry (one `LineSegments`/instanced cylinder with per-vertex colour/opacity attributes — kills L calls *and* B0-3), instanced photons (one `InstancedMesh` per variant, progress as an attribute — bypasses three-forcegraph's photon system), then `InstancedMesh` nodes with per-instance colour/emissive (complicates `applyFocus`/hover/raycast). A worker-based simulation only after those, and only if 2× actually lands — it fixes tick time, which isn't the ceiling.

### B5. Type-check and build — verbatim

`tsc --noEmit`: clean, exit 0. `npm run build`: clean except one warning, verbatim:

```
dist/assets/index-uQGTF1gi.js  1,507.43 kB │ gzip: 430.40 kB
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

Code-splitting doesn't matter for a single-screen app whose first paint needs three, R3F and the graph, and whose load is dominated by the 8.9 MB corpus fetch anyway. What *would* matter: `postprocessing` (620 kB) is bundled and `<EffectComposer><Bloom intensity={0}/>` (`App.tsx:1577–1585`) runs a full-screen luminance pass + mipmap chain + composite every frame for zero visual effect; the comment says it's kept for PngExport's colour pipeline — an `EffectComposer` with no effects keeps the pipeline and drops the passes. COSMETIC/GPU.

### B6. Dependencies and lint

react/react-dom 19.2.8, three 0.185.1, @react-three/fiber 9.6.1, drei 10.7.7, @react-three/postprocessing 3.0.4, postprocessing 6.39.4, three-forcegraph 1.43.4, d3-force-3d 3.0.6, vite 7.3.6, typescript 5.9.3 — all current majors, mutually compatible. Grep for removed three.js APIs (`sRGBEncoding`, `outputEncoding`, `useLegacyLights`, `THREE.Math`, `Geometry`, `VertexColors`, `physicallyCorrectLights`): none. `texture.colorSpace = SRGBColorSpace` used correctly. 20 occurrences of `as unknown as never` to satisfy three-forcegraph's loose `d3Force` types — a `declare module` augmentation removes all of them.

Lint reality: explicit `any` 0; non-null `!` 7; `eslint-disable react-hooks/exhaustive-deps` **9**, all in `InfluenceGraph.tsx`, each deliberate and commented (the ref-mirroring design); 32 exports never imported anywhere (T7). Recommended: `typescript-eslint` `recommended-type-checked` + `react-hooks` + `react-refresh` + `knip` for dead exports. Predicted top firings: `exhaustive-deps` (the 9 disabled plus ~6 in `App.tsx` that pass only because `applyView`/`saveCurrentView` at `:1356–1410` are plain unmemoised functions), `no-unnecessary-type-assertion` on the casts, 32 unused exports, `react-refresh/only-export-components` on `InfluenceGraph.tsx` (`fitSync`, `FOV` exported beside the component) and `MenuBar.tsx`. A rule that fires 9+ times on one file and is silenced 9 times is telling you the file's design is fighting React, which is B1's point.

### B7. Tests, honestly

123 `ok()` assertions: selection 38, filter 27, hierarchy 19, schedule 17, search 8, graph 6 (`validate` exercised at 18 call sites), galaxyForce 5, geoAffinity 3. Coverage of exported functions: `filter.ts` 100%, `regions.ts` 100%, `selection.ts` 83%, `hierarchy.ts` 79%, `schedule.ts` 75%, `graph.ts` 38%, `search.ts` 33%, forces 40%, **`deepLink.ts` 0%, `savedViews.ts` 0%, `modes.ts` 0%, `autoUnfold.ts` 0%**, camera fit n/a — it isn't a function, it's inside the component and cannot be tested at all. The riskiest untested logic, in order: the link stiffness/merge model (`:1272–1455` — HANDOFF calls the INT-spring change "the lever that moved"; zero tests because it isn't a function); `measureFit`/`nodeScaleFor` (the entire render-consistency saga of 08-25/09-01 lived here); `readDeepLink`/`restoreOne` (no round-trip test; `{...DEFAULT_VIEW, ...raw.view}` accepts any type — a string `spread` in a saved view becomes NaN forces and a blank cloud); `pagerank` (one indirect assertion); `foldCountry`, `standingLabels`, `clusterRepulsionForce`, `intAnchorForce`: none. Severity: BITES.

---

## Part C — Repository hygiene and process

### C1. The "six uncommitted bodies of work" claim — refuted, with the inference shown

Evidence (all from mtimes and plain-file reads; no git command): `.git/refs/heads/main` and `.git/refs/remotes/origin/main` both mtime 2026-09-01 09:24 UTC; `.git/logs/HEAD` last line is a commit "handoff" at 1788254670 = 2026-09-01 09:24:30 UTC; `.git/FETCH_HEAD` mtime 2026-09-02 23:12 (GitHub Desktop fetched today); no `index.lock`. Every file under `src/`, `scripts/`, `public/`, `notes/` has mtime ≤ 2026-09-01 08:32 (the audit2 zip unpack) **except** `HANDOFF.md` and `src/components/InfluenceGraph.tsx`, both 2026-09-02 22:32 UTC. **Inferred: at most those two files are uncommitted; possibly zero if 22:32 was a re-save.** Risk if lost: the drift watchdog + `__meshes` fix are in that file — if they aren't in the 09-01 commit, they exist in exactly one place. Please confirm with a GitHub Desktop screenshot (ruling 9).

### C2. `_to_delete/` — everything in it, and what actually needs the click

Top level (23.4 MB, all safe to delete, per its own README): `repo_staging.zip` / `2` / `3` (5.3 MB each, 08-30 — three near-identical copies made 50 minutes apart), `audit-fix-012454.zip` (5.4 MB, 08-31), `audit2-changes-2026-08-31.zip` (2.7 MB, 09-01 — "already unpacked over the tree"), `~$-open-questions_2026-08-08.docx` (a Word lock stub, 162 bytes), and now my `audit-staging-2026-09-02.tar.gz` (7.7 MB). Nested `Grok - Brics+israel and singapore/_to_delete/` (0.97 MB, 08-18): `brics-batches.zip`, `israel-batches (1).zip`, `singapore-batches (1).zip` — raw Grok exports whose unpacked contents sit beside them in `grok-batches/raw/`; safe. Nothing in either folder is still needed. Oldest item has sat 15 days. `archive/` also holds two 31 MB tarballs (`pulse-rate-slider-2026-08-25.tar.gz`, `render-consistency-fix-2026-08-25.tar.gz`) that are sandbox snapshots, not archives — same category, 62 MB, and they *are* tracked unless `.gitignore` excludes them (it doesn't). Severity: COSMETIC, but "delete this" has been true for two weeks and the process rule exists because it recurs.

### C3. `Grok - Brics+israel and singapore/` — (a) fully superseded, archive it

295 files, 7.0 MB, dated 2026-08-05 → 08-21. Empirical merge check against `corpus-data.json`: of 1,999 reports in `consolidated/*.json`, 1,778 are present by id, 18 by title (id rewritten at mint), 156 are in the dated retirement/publisher-cleanup lists, and 47 are absent — every one of those 47 an institution/geography scaffold node (`cl-ine`, `co-dane`, 15 Mexican `-entity`/`municipio-` nodes, central banks) whose stripping the slices' `meta.note` attributes to `notes/mint-2026-08-20.md`. Of 983 consolidated edges: 430 live, 527 in `_dropped` (the 08-31 quarantine), 20 carried as `part_of`, 6 with a retired endpoint, **0 unexplained**. `slices_out/` files all have a same-named, since-edited copy in `src/data/research/`. BRICS G.2/G.3 outputs all exist as research slices. Nothing in `gen-slices.ts` or `src/data/` reads the folder. Its only residual value is provenance (1,672 corpus reports carry a `_batch` naming a raw batch file). **Two things to fix first:** `notes/mint-2026-08-20.md` does not exist — 37 slices point at it; and 136 of 219 raw batch files are not valid JSON (unquoted `continuous`), which `check-urls.ts` silently skips. Then `mv` the whole folder to `archive/grok-staging-2026-08/` and fix README:111 and REPORTS:25, which both call it the live working folder.

### C4. Stale documentation — what is wrong now

CORRECTNESS-grade (following it fails): README:130–132 "import it in `src/data/index.ts`, add it to the `slices` array" — no such array; `gen-slices.ts` auto-discovers `*.json`. REPORTS.md:9–32 routes agents to `Previous Handoffs/` (root), `BRICS/G.*.md`, `planning/BACKLOG.md`, `sessions/` — none exist at root. PLAYBOOK:18–20 and 262–266 mandate reading `notes/grok-diary.md` **which does not exist**, and point cross-border work at `notes/crossborder-verification-2026-08-22.md` (actual path is inside `notes/grok-research-queue-2026-08-22/`). START-HERE:31–33 "the branch's own hand-off chain in `BRICS/`".

BITES-grade: README:111–115 Grok folder "not yet folded in" (it was, 08-20). START-HERE:37–40 "This is mid-revamp" (rendered in-app as Help; phases 0–2 landed 08-19..21). REPORTS:19–21 names the revamp folder as the authority that supersedes memory; the code has superseded the folder. README never mentions `PLAYBOOK.md` (nor does START-HERE or REPORTS) while HANDOFF calls it the rules file. HANDOFF header date wrong (§1). PLAYBOOK §4's module list omits `autoUnfold.ts`, `clusterRepulsion.ts`, `intAnchor.ts`, `useCompactLayout.ts`, `filter.ts`, and four components; README's file map omits 13 `lib/` files and 7 scripts. Three code comments (`gen-slices.ts:27`, `index.ts:20`, `browserCorpus.ts:15`) still describe a `slices.generated.ts` tombstone that no longer exists. "44 checks" appears nowhere in the repo; `validate-data.ts` has 14 report sections and 11 invariant sites — nobody has counted it, so "44" in the brief is somebody's guess carried forward. `notes/sweep-log.md` last entry 2026-08-13 despite three weeks of sweeps.

### C5. The visual revamp — decision needed, and it's a small one

Phases 0/0b/1/2 shipped (dated code, §1). Phase 3 (GEO_EXPLORATION mode — which PLAYBOOK §7 says was "dropped entirely" — and the dominant-relationship dual line style) was never built and one half of it is already declined. The folder is not "limbo"; it is a finished design record whose docs still call it current. Recommendation: **formally close it** — add a 3-line "Status 2026-09-02: phases 0–2 implemented (see dated comments); phase 3 declined/never built" header to `visual-revamp-review.md`, move the folder to `archive/planning/`, fix START-HERE:37 and REPORTS:19. Scheduling anything from it makes no sense; the only open visual item on your list (per-galaxy camera fit) isn't in it.

### C6. Audit fatigue — falling volume, flat process

From HANDOFF/PLAYBOOK (the audit reports themselves are not in the repo or in any memory this session can read — that absence is its own finding): audit 1 (08-29/30) removed 72 + 31 treaty nodes, 62 derivation-note nodes, 5 meta-nodes, quarantined **463** assertion-only edges, rewrote 166 publishers. Audit 2 (08-31) quarantined **23 + 38 + 6 = 67** edges, merged 3 duplicate pairs, added `isIndexPage`, fixed two UI items. This audit: **7** edges wrong by direction/shape, 1 duplicate pair, ~50 index-page edges the heuristic misses, 37 dead-URL edges, and a random-sample hit rate of 50%. The *volume* of data defects is falling by roughly an order of magnitude per round — the process is converging on the enumerable classes. But the sample hit rate says the *unenumerated* residue is still large: half of a random draw does not fully clear the bar, concentrated in Grok-derived slices, because every audit so far has swept by shape (no URL, index URL, "consistent with") rather than by re-fetching and reading. Root cause unchanged: edges are minted from Grok output with `basis` text that *describes* rather than *quotes*, and no gate re-reads the source. The renderer had never been audited at code level (08-12 and 08-21 were usability reviews), so B0's three bugs are new category, not a repeat. Verdict: data audits are producing diminishing returns *as sweeps*; the next one should be a 200-edge raw-fetch sample with the same grading, run on every import round, and its hit rate — not the validator's exit code — should be the promotion gate.

Process finding on top: the project's memory is split. HANDOFF cites ≥6 memory entries from 08-30/31 that don't exist in the project memory store; the last entry here is 08-27. Whichever tool wrote those (a different memory store on your machine, most likely) is not the one Cowork sessions read. Until that's reconciled, every new agent starts from a HANDOFF that references records it cannot open.

---

## Rulings you need to make

- **1-A** Flip `no evidence_url` to a hard **error for edges in any slice newer than 2026-08-31** now, legacy 162 stay warnings behind a dated allowlist / **1-B** keep the 0/0/0 promotion gate and schedule the 162+5+45 re-citation round as the next agent job with a deadline.
- **2-A** Widen `isIndexPage()` to a curated per-host list seeded from §A3 (stats.gov.cn `/sj/ndsj/`, `/english/PressRelease/`, `/StatisticalCommuniqu…`, `ndb.int/governance/…`, `gub.uy/instituto-nacional-estadistica/`, `ess.gov.et/<topic>/`, `eac.int/overview-of-eac`, `oversightboard.pr.gov/fiscal-plans/`, `inegi.org.mx/programas/<x>/`) and treat the ~50 as the 45's siblings / **2-B** leave the heuristic, handle them by hand in the re-citation round.
- **3-A** Move the 5 reversed JP/KR edges and the 2 BR "complementary" edges to `_dropped` (`wrong-direction` / `deferred`) and add a bidirectional-pair validator error / **3-B** delete the 5 reversed edges outright (their twins already carry the claim) and still add the check.
- **4-A** Merge `et-cpi` into `et-ess-cpi` and fold the BRICS JSP family under `brics-jsp` with `part_of`/`supersedes` / **4-B** leave both, accept the split in-degree.
- **5-A** Accept that `brics-ndb-agreement-2014` at #3 is what the evidence rule produces and say so in START-HERE / **5-B** exclude self-citation from authority (an edge whose source publisher is the target's own publisher or the target's founding body does not accrue rank — a `graph.ts` rule, ~20 lines) / **5-C** re-mint the NDB round with the F-05 "agency vs artefact" bar and see what survives.
- **6-A** Fix B0-1 (edge picker), B0-2 (dispose superseded instances), B0-3 (guard `linkWidth` re-assign with a real delta or move width to a uniform) in one small round *before* any batching work / **6-B** fold them into the link-batching job.
- **7-A** Fix the 37 dead-URL edges (singstat 15, gccstat 4, etc. — ledger attached) and extend `check-urls.ts` to `evidence_url` with a date-stamped output, run per import round / **7-B** just the extension, dead ones wait for the re-citation round.
- **8-A** Archive the Grok folder now after writing `notes/mint-2026-08-20.md` / **8-B** leave it, fix only README:111.
- **9** Screenshot GitHub Desktop's changed-files list so C1 stops being inference — and if `InfluenceGraph.tsx` is dirty, commit it today; the 09-01 fixes may exist in only one place.
- **10-A** Close the visual revamp formally (status header, move to `archive/planning/`, fix START-HERE:37 and REPORTS:19) / **10-B** leave the folder, fix only the two sentences.
- **11-A** Fix the five CORRECTNESS-grade doc errors in one pass (README:130, REPORTS:9–32, PLAYBOOK:18–20/262, START-HERE:31, HANDOFF header) / **11-B** defer.
- **12** Tell the next agent where the 08-30/31 memory entries actually live, or paste the two audit reports into `archive/audits/` — right now they exist only in chat.
- **13-A** Empty both `_to_delete/` folders and move the two 31 MB tarballs out of `archive/` / **13-B** leave them.

## Is building on this as-is reasonable?

For the code: yes, after ruling 6 — the three bugs are each under a day, none needs a restructure, and the architecture has headroom for the corpus as it stands; it does not have headroom for 2×, and the merged-link-geometry job should be done before any round that materially grows the unfolded tier. For the corpus: no, not as-is. The 2,748 edges are not one population; the hand-researched branches clear the bar and the Grok-import branches clear it about half the time, and nothing in the pipeline can tell them apart on screen. Before the next BRICS round or the next 1,000 nodes: make missing-URL an error for new edges (1-A), widen the index check (2-A), add the direction check (3), and make a raw-fetch sample of every import — the grading in §A2, ~40 edges, an hour of agent time — the gate that decides whether a slice merges. Do that and the picture starts meaning what START-HERE says it means; skip it and node size will keep measuring how many Grok batches a country got.
