# G.67.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` not reopened in full this session — sections §4 (node rule, one-off foundational instrument, cadence) and §6 (output format) read via targeted `sed` extracts through the device bridge, same working method `G.65.md`/`G.66.md` used. `G.66.md` read in full; it is the whole input to this session, which picked up the single item Thomas chose directly when offered a choice between Brazil (item 10) and the remaining CIRCABC countries (item 11): Brazilian fiscal reporting, `G.63.md`/`G.64.md` item 10, untouched across four prior hand-offs (`G.63.md` through `G.66.md`).
Predecessor: `G.66.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. Do not run any git command against this repo. Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask Thomas if you need git state. This session worked entirely over the device bridge and never touched `.git`.
2. `G.66.md` closed the CY/CZ/EL CIRCABC version-history lever and left Block B (the corpus-wide `_dropped` sweep) with exactly two scoped pieces outstanding: item 10 (Brazilian fiscal reporting, flagged since `G.63.md` as needing its own dedicated session) and item 11 (the CIRCABC 26-country sweep, at 6/26). Offered the choice directly, Thomas picked item 10. **This session closed it**, on the specific scope `br-fpm-population.json`'s own `_dropped[2]` entry had already called for: "a proper LC 101/2000 node" alongside the RREO, built in "the dedicated Brazilian-fiscal-reporting session entry already calls for."
3. New file this session: `src/data/research/br-fiscal-responsibility-law.json`, Brazil's second slice (after `br-fpm-population.json`). Three nodes — `br-lc-101-2000` (Lei Complementar 101/2000, the Lei de Responsabilidade Fiscal), `br-rreo` (Relatório Resumido da Execução Orçamentária, bimonthly), `br-rgf` (Relatório de Gestão Fiscal, quadrimestral) — and two `methodology_depends_on` edges, both pointing at the statute. `br-fpm-population.json`'s existing `_dropped[2]` entry (the RREO deferral) was annotated in place (not deleted) to point at the new file, matching the convention `G.65.md`/`G.66.md` used for the MCASP entry in the same file.
4. New FETCH FACT this session, worth recording alongside `br-fpm-population.json`'s own two (the TCU bot wall, the IBGE 403): **the fetch tool used for `planalto.gov.br`'s consolidated LC 101/2000 text truncated the page at Article 40**, well before the transparency chapter (Arts. 48, 52–55) this session needed. Confirmed twice, with different prompts, both stopping mid-Article-40. The canonical URL is still recorded as the `url` field on both LRF-derived nodes — it is the correct citation — but the actual verbatim article text this session quotes was cross-checked across independent secondary legal-reference sites (`legjur.com`, `modeloinicial.com.br`, `tesourotransparente.gov.br`'s own descriptive pages) rather than read once from the primary source. Worth knowing before assuming `planalto.gov.br` is uniformly readable the way `br-fpm-population.json`'s note characterised it ("`planalto.gov.br` and `biblioteca.ibge.gov.br` serve documents to plain curl") — that held for the articles read in that session, not for a page this long.
5. Mechanical facts, carried forward and re-confirmed: `device_stage_files` / `device_commit_files` cap at 50 files per call; `device_bash` gives read/write shell access to the mounted folder directly (`/sessions/<session>/mnt/Reports Clustering/` — note the space in the folder name, quote it), used this session for `grep`/`python3` reads and file-counting, but the actual JSON edits still went through the established stage → build/edit in `/tmp` with Python's `json` module → validate with `json.load` → `SendUserFile` → `device_commit_files` pipeline, never written in place, matching every prior sweep session's convention. For the brand-new file there was nothing to stage — it was written directly in the cloud workspace, validated, and delivered the same way.
6. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A single-item session, at Thomas's direct choice (offered item 10 vs. item 11 via a direct question; he chose item 10), not a punch-list or general sweep session. Input: `G.66.md` alone, plus direct web research (WebSearch/WebFetch) into `planalto.gov.br`, the 1988 Federal Constitution, and secondary Brazilian legal-reference sites, since this item — unlike the CIRCABC sessions — has no browser-only gate and does not depend on `mcp__claude-in-chrome__*`. Method: the one item asked for, worked start to finish — statutory text located and cross-verified, nodes and edges minted, the existing deferred entry annotated, both files committed to disk — then this hand-off written. Item 11 (the remaining 20 CIRCABC countries) was not touched.

`npm run validate` was **not** run this session — same Windows-only esbuild/win32-linux mismatch through the device bridge noted in every recent hand-off back to `G.50.md`. A direct file-count across every `src/data/research/*.json` after this session's edits gives **402 reports / 485 dependencies / 379 `_dropped` entries**, against `G.66.md`'s 399/483/378. That is +3 reports and +2 dependencies (the three new nodes and two new edges in `br-fiscal-responsibility-law.json`) and +1 `_dropped` entry (that file's own single scope-boundary entry, on state/municipal-level RREO/RGF publications). `br-fpm-population.json`'s own `_dropped` count is unchanged — its entry 2 was edited in place, not added to or removed. Same caveat as always: a file-count is not a validator run. Last confirmed-green validator run remains 2026-08-08 at 372/436.

No decision was referred to Thomas this session beyond the initial item-10-vs-item-11 choice — the scope (LRF + RREO + RGF, explicitly excluding state/municipal-level publications and the national-accounts/CPI/FPE chain) was already set by `br-fpm-population.json`'s own prior sessions, and this session followed it rather than re-litigating it.

## Headline result

Item 10 (Brazilian fiscal reporting) is closed on the scope `br-fpm-population.json`'s own deferred entries had already defined: the Lei de Responsabilidade Fiscal (LC 101/2000) is now a node, and both transparency instruments it names — the RREO and the RGF — are built alongside it with verified `methodology_depends_on` edges back to the statute, in a new file, `src/data/research/br-fiscal-responsibility-law.json`. Block B now has exactly one scoped piece outstanding: item 11, the remaining 20 CIRCABC countries, unchanged from `G.66.md`'s characterisation of it as needing real per-country research rather than a quick pass.

## Findings

### 1. The Lei de Responsabilidade Fiscal names both transparency instruments in one article, and defines each one's content in the articles that follow

`src/data/research/br-fiscal-responsibility-law.json`. Art. 48 caput (LC 101/2000), quoted via cross-checked secondary sources after `planalto.gov.br`'s own page truncated before reaching it (see Orientation §4): "os planos, orçamentos e leis de diretrizes orçamentárias; as prestações de contas e o respectivo parecer prévio; o Relatório Resumido da Execução Orçamentária e o Relatório de Gestão Fiscal" — both instruments named in the same sentence, as instruments of fiscal-management transparency. Minted `br-lc-101-2000` as a one-off foundational instrument per `Research.1.md` §4 (Thomas's 2026-08-08 ruling) — adopted once in 2000, amended in place many times since (not reissued), so no `releases_per_year` is given, matching the current convention (`eu-reg-2016-2304`'s treatment, not `br-lei-8443`'s older pre-recast pattern in the same corpus).

### 2. The RREO's structure comes from the statute, not just its deadline — the distinction that decides `methodology_depends_on` vs. `cites`

Art. 52 caput: "abrangerá todos os Poderes e o Ministério Público, será publicado até trinta dias após o encerramento de cada bimestre" (already partially quoted in `br-fpm-population.json`'s own `_dropped[2]`, independently re-confirmed here). Art. 53's five incisos go further, defining exactly what must accompany the report — including a cross-reference to the statute's own definition of net current revenue ("receita corrente líquida, na forma definida no inciso IV do art. 2º") and to Arts. 4º and 50 for the interest and social-security demonstratives. This is genuine methodological content, not a bare publication mandate — the distinction `br-fpm-population.json` itself already drew for a different edge (`br-ibge-estimativas-populacao -> br-lei-8443`, typed `cites` because "the Act compels the publication and fixes its deadline, and supplies no method"). Minted `br-rreo`, bimonthly (`releases_per_year: 6`), with a `methodology_depends_on` edge to `br-lc-101-2000` reasoning through exactly this distinction in its own `basis` field. The Constitution's own Art. 165 §3 ("O Poder Executivo publicará, até trinta dias após o encerramento de cada bimestre, relatório resumido da execução orçamentária"), verbatim-confirmed this session via a legal-reference source, is quoted in the node's description as the independent constitutional origin of the same obligation — not minted as a separate node or edge, the same prose-only treatment `br-fpm-dn-tcu`'s own description already gives to constitutional references it doesn't turn into edges.

### 3. The RGF is a signed compliance report against the statute's own limits, issued three times a year, not four

Art. 54 caput: "Ao final de cada quadrimestre será emitido pelos titulares dos Poderes e órgãos referidos no art. 20 Relatório de Gestão Fiscal", signed per incisos I–IV by the heads of the Executive, Legislative, Judicial and Ministério Público branches — a formally attested document. Art. 55 caput and inciso I: "O relatório conterá: I - comparativo com os limites de que trata esta Lei Complementar, dos seguintes montantes:" (personnel expenses, consolidated/floating debt, guarantees, credit operations, per the alíneas that follow) — comparison against limits the same statute sets, which is what makes this `methodology_depends_on` rather than `cites`. Cadence independently confirmed via Tesouro Transparente's own descriptive text as three editions per fiscal year (close of April, August, December) — **quadrimestral means three times a year, not four**, worth flagging because the word invites the wrong arithmetic. Minted `br-rgf` (`releases_per_year: 3`) with a `methodology_depends_on` edge to `br-lc-101-2000`. One unverified detail is flagged rather than used: Art. 63 is reported (via search snippets, not this session's own direct quote) as granting municipalities under 50,000 inhabitants a semi-annual RGF schedule instead — noted in the node's `cadence_note` as unverified and explicitly not folded into the cadence figure.

### 4. `br-fpm-population.json`'s own deferred RREO entry updated in place, pointing at the new file

`_dropped[2]`'s `why` field, which already read "STILL NOT MINTED... this deserves the dedicated Brazilian-fiscal-reporting session entry [4]/[this file's own deferred item] already calls for," was edited to record the mint and point at `br-fiscal-responsibility-law.json` — the same in-place-annotation convention `G.65.md`/`G.66.md` used for the MCASP entry in the same file. Diffed against the original before delivery: exactly one line changed, confirmed via `diff` before commit.

## Secondary observations (logged, low priority)

* `br-fpm-population.json`'s `_dropped[4]` (the national-accounts/CPI/FPE chain, "deliberately out of scope... a Brazilian statistics pass deserves its own session") was read but not touched this session — item 10 as scoped by `_dropped[2]` was the LRF/RREO/RGF chain specifically, not a general Brazilian-statistics pass. That entry remains open for a future session, distinct from item 10 as now closed.
* State- and municipal-level RREO/RGF publications — thousands of individual reports, one per federative entity, all following the same statutory structure this file documents once — were logged as a deliberate scope boundary in the new file's own `_dropped` array rather than pursued, on the same "this slice is one chain deliberately" discipline `br-fpm-population.json` used for the national-accounts chain.
* The RREO and RGF nodes both cite the Union-level (federal) report as their primary `url`, via Tesouro Transparente's own "RREO — União" / "RGF — União" pages, rather than a SICONFI portal page — SICONFI itself was not minted as a node (no titled publication of its own to point at, the same `AGENCY ONLY` reasoning `Research.1.md` §4 point 2 already applies elsewhere in this corpus).

## Corrections to prior sessions

None. `G.66.md`'s and `G.64.md`'s framing of item 10 as needing its own dedicated session, and `br-fpm-population.json`'s own scoping of what that session should contain, both held up under this session's direct research and are exactly what got built.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.61.md`–`G.66.md`. This session's work is entirely inside B.

* **B — the corpus-wide `_dropped` sweep.** Read-complete since `G.63.md`. **Item 10 (Brazilian fiscal reporting) is now closed**, on the LRF/RREO/RGF scope its own deferred entry defined. What remains of B is now **one** scoped piece, not two: **item 11, the CIRCABC 26-country sweep**, still at 6/26 (Belgium, Croatia, Bulgaria, Cyprus, Czechia, Greece minted; `NL, FI, RO, IT, ES, IE, LT, HU, UK, SK, SI, SE, PT, PL, MT, LV, LU, FR, EE, DK, AT` remaining), unchanged from `G.66.md`'s characterisation: the CIRCABC easy wins (two-edition top-listing, version-number anomaly) are exhausted, and what's left needs either a genuine external second source per country (the Germany pattern) or a deliberate no-cadence-estimate minting call, country by country.
* A, C, D, E, F, G — untouched this session. See `G.56.md`–`G.62.md` for their current state.

Worth putting to Thomas when he next picks this up: with item 10 closed, **B is down to a single piece of work**, and it is the harder one — item 11's remaining 20 countries, which `G.66.md` already flagged as worth scoping as its own session rather than a punch-list item. There is no longer a second, easier item to offer alongside it the way this session offered Brazil.

## Cheap checks still outstanding

None identified this session — a single dedicated item, not a sweep, so no new leads were generated. `br-fpm-population.json`'s own `_dropped[4]` (Brazilian national accounts/CPI/FPE) remains open but is scoped as its own dedicated session per that entry's own text, not a cheap check.

## What to pass at the start of next thread

1. This file's Headline result and Orientation §2–4, especially the `planalto.gov.br` truncation FETCH FACT (§4) — worth knowing before assuming a long consolidated Brazilian statute page is fully readable in one fetch.
2. `G.66.md`, then `G.65.md`, `G.64.md`, `G.63.md` for the sweep's history, if item 11 is picked up next.
3. `Research.1.md` §4 (node rule — the one-off foundational instrument treatment, now used for `br-lc-101-2000` alongside `eu-reg-2016-2304`) and §5a (comparability trap — not directly exercised this session, but relevant if a future Brazilian session compares MCASP/IPSAS-style "convergence" language again).
4. The two files changed this session: `src/data/research/br-fiscal-responsibility-law.json` (new, three nodes, two edges, one `_dropped` entry) and `src/data/research/br-fpm-population.json` (one `_dropped` entry annotated in place, otherwise unchanged).
5. The three nodes minted this session — `br-lc-101-2000`, `br-rreo`, `br-rgf` — and that `br-rgf`'s cadence carries one explicitly-unverified caveat (the Art. 63 small-municipality exception) not folded into its `releases_per_year`.
6. Item 11 (CIRCABC, 20 countries remaining) is now the only piece left in Block B. If picked up, treat it as its own scoped session per `G.66.md`'s own framing, not a quick click-through.

# How to write the next hand-off

Added 2026-08-04. Copy this whole section verbatim into every successor, so the chain never depends on one file surviving. It is the spec, not an example — the file you are reading is the worked example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.

Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are `.docx`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `EU/`. Earlier files are `.docx`; that was the chat workflow's doing, not a preference.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `EU/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py EU/G.<n>.md
```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). It exists so branch state can be read without parsing prose, and so a future session can diff two hand-offs. `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar; `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.

* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.

Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

Date: YYYY-MM-DD
Governing briefs: <which, and whether you actually saw them>
Predecessor: G.<n-1>.md (date)

## Orientation — if you are a new agent, start here
## Session conditions — read this first
## Headline result
## Findings
## Secondary observations (logged, low priority)
## Corrections to prior sessions
## Thomas's stated priority for the remaining work
## Cheap checks still outstanding
## What to pass at the start of next thread

# How to write the next hand-off        ← this spec, copied verbatim
```

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly.

What each section is for

Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. If the folder layout or the tooling changed, that goes here.

Session conditions — what constrained the work. Session type (extraction vs verification vs planning), what tooling was available, what did not arrive, what was left untouched by instruction. This is where "the sandbox failed" and "the governing briefs still did not arrive" belong. State plainly which sources you read in full, because everything downstream inherits that limit.

Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.

Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Mark any claim that depends on a predecessor's reading rather than your own — the house convention is (SEC04 per G.17). Quote verbatim; `Research.1.md` §2 applies here exactly as it does to research output.

Secondary observations — real but low-priority. Section fingerprints, oddities worth not rediscovering. Keep them short.

Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. This section is the reason the chain is trustworthy. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.

Thomas's stated priority for the remaining work — lettered blocks (A, B, C, D) carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. This section is what a new agent reads to answer "what is next".

Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. This is the list that gets raided when a session has capacity left.

What to pass at the start of next thread — the packing list, for the case where the next agent has no filesystem access. If it does have access, say so and keep the list anyway; it doubles as an index of what matters.

Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement. That is what makes the positive claims usable.
* Predictions are logged and then scored. G.17 predicted a code pattern; G.18 recorded that it "landed". Make falsifiable calls and settle them.
* Distinguish inference from documented fact, and say which narrow respect is still inference. G.18's headline rule is very well evidenced and still not printed in any document — it says so.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
