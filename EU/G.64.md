# G.64.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` §4 read in full this session (lines 205–380, the node-rule and cadence sections, plus §5a); §2, §3 and §8 applied throughout but read only as quoted in `G.63.md` rather than reopened. `G.63.md` read in full — it is the whole input to this session, which worked its Cheap-checks list and nothing else. `planning/OPEN-THREADS_2026-08-08.md`, `planning/MISSION-TODO-2.md` and `planning/dropped-sweep-scoping_2026-08-08.md` **not read this session**; this session took `G.63.md`'s Headline result (the sweep is read-complete) as given rather than re-deriving it.
Predecessor: `G.63.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask Thomas if you need git state. This session worked entirely over the device bridge and never touched `.git`.
2. `G.63.md` closed the corpus-wide `_dropped` sweep as **read-complete** and converted what remained into a **punch list** of eleven Cheap checks. **This session worked items 1–9 of that list.** Items 10 and 11 are not cheap checks by their own description (item 10 asks for a dedicated Brazilian-fiscal-reporting session; item 11 is the CIRCABC browser-only gate plus an optional publisher-field refinement in the German EDP inventory) and were deliberately not attempted. **Block B is now nine-elevenths done, and what remains of it is two scoped sessions, not a list of lookups.**
3. **The single most useful thing in this file is the Headline result.** Six of the nine items did not need new research at all — they needed someone to notice that the entry was recording *the state of a past session's environment* rather than a fact about the world. Read that section before picking up any remaining `_dropped` entry anywhere in the corpus.
4. Mechanical facts, carried forward from `G.63.md` and re-confirmed: `device_stage_files` / `device_commit_files` cap at 50 files per call; edit JSON by stage → copy to a scratch path → edit with Python's `json` module → `SendUserFile` → `device_commit_files`, never in place under `/mnt/user-data/uploads/` (read-only). Added this session: **`device_bash` gives read-only `grep` and `python3` over the whole repo at `/sessions/<session>/mnt/Reports Clustering/`**, which is far faster than staging files to answer "does this id already exist?". Use it. It is not git and does not touch `.git`.
5. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A punch-list session, not a sweep session and not an extraction session. Input: `G.63.md` alone. Method: one item at a time per `Research.1.md` §8, each item researched, then written to its file, then committed to disk before the next item was started — nine separate commit round-trips, zero rejections, zero JSON corruption.

Read in full this session: `G.63.md`; `Research.1.md` §4 and §5a; every `_dropped` entry touched, plus the surrounding file. Every web source quoted below was fetched by this session directly unless the text says otherwise — there is exactly one edge in this file resting on a predecessor's reading (`nz-statsnz-aes -> nz-nzsioc`) and it says so in its own `basis`.

**`npm run validate` was NOT run this session** — Windows-only, esbuild win32/linux mismatch through the device bridge, an environment limit unchanged since `G.50.md`. A direct file-count across every `src/data/research/*.json` after all edits gives **392 reports / 468 dependencies / 378 remaining `_dropped` entries**, against `G.63.md`'s 389/463/378. That is +3 reports and +5 dependencies, and it matches this session's own edits exactly (three nodes minted, five edges minted). `_dropped` is unchanged at 378 because this session annotated and reclassified entries rather than deleting any. Same caveat as every recent hand-off: a file-count is not a validator run and does not account for whatever de-duplication `scripts/validate-data.ts` applies. Last confirmed-green validator run remains 2026-08-08 at 372/436.

**One decision was Thomas's, not this session's**, and it is marked as such where it lands: whether NZSIOC qualifies as a node with no defining publication of its own. He was asked and ruled mint. Everything else in this file is either documented or explicitly left open.

## Headline result

**Six of the nine punch-list items resolved without new research being the operative thing.** They resolved because the `_dropped` entry was recording a transient fact about a past session's environment — a site that was down, a name that has since changed, a node that another file had already minted — and no one had re-tested the premise. Broken out:

- **Two were stale cross-file duplicates** (`rate-transmission.json`'s CORRA and mortgage leads): the nodes and edges had existed in `credit-and-mortgages.json` since 2026-07-28. Eighth and ninth instances of the bug class `G.63.md` catalogued as its finding 1.
- **One was a lapsed access denial** (FADN): `agriculture.ec.europa.eu` served plain fetchable HTML this session, with no browser tool, against an entry that had it recorded as "unreachable, cause not established".
- **Two were stale facts about the world**: FADN has been *renamed* FSDN (Regulation (EU) 2023/2674), and ANZSCO's joint ABS/Stats NZ governance *ended* in 2024.
- **One was a search strategy, not a missing document** (Luxembourg IPCN): three prior searches for the acronym failed because the identification is stated as a definition. Matching definitions across the two sides found it in two fetches.

Only three items were genuinely research-bound: the Fed/Basel node (real work, closed), Alberta s.11 (real work, still blocked), and the CCBF node-rule question (answered, closes negative). **The transferable claim: a `_dropped` entry's stated blocker decays faster than its stated evidence, and nothing in the file records when the blocker was last tested.** See Secondary observations for the one structural fix that would catch this.

## Findings

### 1. NZSIOC — the blocker was not access, and Thomas ruled it in

Cheap check 1. `nz-statsnz-national-accounts.json` `_dropped` entry 2 and `anzsic-industry-classification.json` `_dropped` entry 2 held the same lead from two sides, both deferred on "NZSIOC's own defining document was not opened" and both predicting Stats NZ's classification pages would be fetchable where the release pages are not.

**That prediction did not land.** `datainfoplus.stats.govt.nz` is robots-disallowed to this session's fetch tooling in both `/Item/` and `/item/` casings, and `archive.stats.govt.nz` no longer resolves by DNS at all. Predecessors' fetches of DataInfo+ cannot be reproduced from here.

**What did land: there is no defining document to open.** Three Stats NZ-authored sources were fetched in full — *ANZSIC 2006 implementation: Progress at January 2010* and *Introducing ANZSIC 2006* (both Stats NZ digital library, `statsnz.contentdm.oclc.org`, collection p20045coll1, ids 1430 and 1394), and Stats NZ's own paper to the 2022 UN Committee of Experts on ISIC. Between them they give the derivation — NZSIOC built "using the principles used to derive ANZSIC categories – organisation of units, industry homogeneity, and economic significance – but adapted specifically to the New Zealand situation", because ANZSIC 2006's structure "does not always mirror the New Zealand economy" — and the full four-level structure (16 / 31 / 55 / 118 categories, Level 4 being "118 working industries" where the National Accounts are compiled). **None of the three names an edition, a catalogue number, a version, or a defining publication.** Stats NZ's 2022 UN paper is blunter than that: NZSIOC "was created as an afterthought" whose "purpose and/or need was not actually considered during the ANZSIC06 review".

That converted the blocker from access to a node-rule question, which was put to Thomas rather than decided here per §3. **His ruling: mint.** §4's bar is named + titled; `anzsic` and `isic` happen to have volumes but §4 never required one. `nz-nzsioc` is minted in `nz-statsnz-national-accounts.json` as evergreen with no `releases_per_year` (the `eu-reg-2016-2304` shape), with both edges: `nz-nzsioc -> anzsic` (verified directly, `methodology_depends_on`) and `nz-statsnz-aes -> nz-nzsioc` (**per the predecessor's 2026-08-06 DataInfo+ read, not this session's — flagged in its own basis**). Reports 5→6, dependencies 7→9.

Two things logged on the node itself: a **title variant** — Stats NZ's own 2010 paper says "New Zealand Standard Industry Output *Categories*", its 2022/2025 UN papers and the AES metadata say "New Zealand Standard Industrial Output *Classification*"; the later form is taken as the title — and a **forward risk**, from Stats NZ's 2025 ECLAC workshop paper: "There has been no review of ANZSIC since the commencement of the revision in 2006 and it is heavily out of date and difficult to use", with New Zealand "contemplating adopting ISIC Rev 5 either as is or with a few minor class adjustments". NZSIOC's parent may be replaced rather than revised.

### 2. Fed / Basel — minted, but the lead's own premise was wrong

Cheap check 2. `banking-supervision.json` `_dropped` entry 2 pointed at "The Federal Reserve maintains its own Basel Regulatory Framework page". **The page is an index and carries no citable claim.** (Also: the URL the entry implies, `.../basel-regulatory-framework.htm`, 404s; the live page is `.../basel-default.htm`.) It describes Basel III as "a comprehensive set of reform measures, developed by the BCBS, to strengthen the regulation, supervision, and risk management of the banking sector" and links four sub-pages, but names no US rule by citation; its *U.S. Implementation of the Basel Accords* sub-page is likewise an index of rulemakings with no CFR parts quoted.

The citable chain runs through the adopting instrument instead. Minted **`frb-regulation-q`** — 12 CFR part 217, official title "Capital Adequacy of Bank Holding Companies, Savings and Loan Holding Companies, and State Member Banks (Regulation Q)" per eCFR, §217.1(a) "This part establishes minimum capital requirements and overall capital adequacy standards..." — on §4's one-off foundational-instrument shape, `releases_per_year` deliberately absent. Edge `methodology_depends_on -> bis-basel-framework`, resting on the Board's own press release of 2 July 2013: **"The rule will implement in the United States the Basel III regulatory capital reforms from the Basel Committee on Banking Supervision and certain changes required by the Dodd-Frank Wall Street Reform and Consumer Protection Act."** Reports 4→5, dependencies 2→3.

**Stated in the edge's own basis and repeated here because it matters: this is weaker than the OSFI edge.** OSFI's Chapter 1 says of *itself* that it "is drawn from" the Basel Framework — the dependency is asserted inside the standing document. Here the Basel naming sits in the instrument that *adopted* the CFR part; codified part 217 does not mention Basel. Adoption-preamble evidence, not in-document methodology prose. Also flagged: the Federal Register SUMMARY quotation naming *"Basel III: A Global Regulatory Framework for More Resilient Banks and Banking Systems"* by title was **truncated at 125 characters by this session's fetch tool**, which supplied the surrounding clause as reconstruction. A successor with a working PDF route should replace it with a verbatim read from govinfo (FR-2013-10-11, 78 FR 62018).

The asymmetry the pair now shows is worth having on its own: same standard, two instruments of adoption — OSFI reissues a guideline annually with Basel paragraph numbers in the margins; the Fed codified Basel III once into a CFR part and amends it.

### 3. CORRA and mortgage rates — both stale, neither needed research

Cheap check 3, `rate-transmission.json`. Both open leads dissolved on a single cross-file id search.

**Entry 1 (CORRA), fully stale.** `boc-corra` has existed in `credit-and-mortgages.json` since 2026-07-28, with the full node (releases_per_year 250, "Published each Canadian business day by 10:00 ET, postponable to 11:00 ET") and both edges the entry was waiting on: `boc-corra -> boc-policy-rate` and `term-corra -> boc-corra`. **The entry's own conjecture — "the edge may run the opposite way to intuition" — is confirmed**, and the existing edge states the resolution more precisely than this session's independent re-fetch of the methodology did: the documented mechanical dependency is the *contingency fallback only* ("The fallback rate is equal to the Bank of Canada target for the overnight rate for that day plus the mean spread over the previous five business days..."), with the note that the Bank targets the rate CORRA measures, so CORRA normally depends on the policy rate only economically. What the entry *proposed* — `boc-prime-rate -> boc-corra` — is not a gap but an unsupported hypothesis; nothing found documents prime being set off CORRA.

**Entry 2 (mortgage rates), half stale.** Its closing observation that posted mortgage rates "have an obvious home" was acted on the same day in `credit-and-mortgages.json`, which holds `boc-posted-chartered-bank-rates` and `boc-mortgage-qualifying-rate` plus the whole stress-test chain on them. The other half is genuinely open and **now better characterised**: the Bank's explainer *was* read this session (*What's behind your mortgage rate*, 2020) and does state the link — "These include the prime rate, which is used by the banks as a basis for pricing variable-rate mortgages" — but **the corpus has no variable-rate mortgage series**, and `boc-posted-chartered-bank-rates` is posted *conventional* rates, a mode of six banks' postings, which is not the thing priced off prime. The blocker is the missing near-end node, not the unread explainer. Left `deferred` on that ground.

### 4. FADN → FSDN — closed, renamed, and the slice is no longer edgeless

Cheap check 4, `eurostat-farm-structure-survey.json`. The file's own headline called this "THE BEST LEAD THIS SLICE PRODUCED" and its `_open_questions` recorded the blocker as site access — `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` "unreachable this session (browser tool denial, cause not established)".

**They were not unreachable.** Both `/farm-structures-and-economics/fadn_en` and `/fsdn_en` served as ordinary fetchable HTML this session, no browser involved.

**And the network has been renamed.** It is now the **Farm Sustainability Data Network (FSDN)**, renamed and re-scoped by Regulation (EU) 2023/2674 amending Council Regulation (EC) No 1217/2009 — *the same amending regulation this file's second `_dropped` entry already reads*, for the removal of the annual-report duty. Since 2025 it collects "environmental and social sustainability performance" alongside economics. Minted **`eu-fsdn`** from DG AGRI's own page: "an EU survey that gathers annual data about farms", "an annual sample of around 75 000 farms across the EU for more than 60 years", representing "3.5 million farms and 90% of the EU's agricultural production"; current instruments Implementing Regulation (EU) 2024/2746, Delegated Regulation (EU) 2024/1417, Implementing Regulation (EU) 2024/2499.

Edge `eu-fsdn -> eurostat-farm-structure-survey` (`methodology_depends_on`) minted on Eurostat's metadata page, **re-fetched first-hand this session and now pinned to its section (3.4, Statistical concepts and definitions)**: "Both the censuses and the sample surveys are aimed at producing a variety of information on specific CAP targets, as well as providing a basis for extrapolating Farm Accountancy Data Network (FADN) data." Reports 1→2, dependencies 0→1.

**Two caveats written into the basis rather than smoothed over.** The evidence is **one-sided** — Eurostat asserting what its own survey is used for; DG AGRI's FSDN page, read in full, names neither the Farm Structure Survey nor integrated farm statistics nor Regulation (EU) 2018/1091 nor Eurostat anywhere. And the quoted sentence still says FADN, so **the edge crosses a rename**; nothing found suggests the arrangement changed with it, and nothing found confirms it either. Implementing Regulation (EU) 2024/2746 carries the farm-selection methodology per DG AGRI and is where the receiving side's own statement would be.

### 5. MONSTAT — the citation error is MONSTAT's own

Cheap check 5, `grok-r8-accession-belt.json` `_dropped` entry 0. The primary PDF was fetched directly this session — *Quality Report: Annual Gross Domestic Product 2021*, `monstat.org/uploads/files/kvalitet/bdp/2021/Quality report 2021 AGDP.pdf` — and it prints, verbatim: **"National accounts are compiled in accordance with the European System of Accounts (ESA 2010), which is published in the Official Journal of the European Commission as Annex A to Regulation (EU) No 1306/2010."** Character for character what Grok transcribed, regulation number included.

**Grok's transcription is vindicated; MONSTAT's document carries a wrong citation.** ESA 2010 is Annex A to Regulation (EU) No 549/2013; there is no Regulation (EU) No 1306/2010 on national accounts (1306/2013 is CAP financing). The minted `cites` edge is unaffected — it was never built on the number. Kept as a `caveat` rather than closed, because a demonstrated citation error in a source document is exactly what §2's quote-as-found rule exists to preserve. **A future session must not silently correct it.**

### 6. Alberta Continuing Care s.11 — retried on four routes, still not found

Cheap check 6, `provincial-social-programs.json` `_dropped` entry 0. The regulation is now **identified**: Continuing Care (Ministerial) Regulation, **Alta Reg 44/2024**, under the Continuing Care Act, SA 2022, c C-26.7. Four routes to its text, four different failures: Alberta King's Printer (`kings-printer.alberta.ca`, the `1266.cfm`/`2024_044` pattern) **robots-disallowed** — a different failure from the original session's HTML error pages; Alberta Open Government (`open.alberta.ca/publications/2024_044`) **HTTP 520** on two attempts; CanLII (`alta-reg-44-2024`) **robots-disallowed**; a `filetype:pdf` search for any mirror, nothing. Alberta's own programme page was re-read in full and still states only the outcome ("...will increase by 1.8% to reflect the annual inflation adjustment"), naming no index, no publisher, no reference period, and not citing s.11.

One new **non-authoritative** data point, recorded because it points the way without settling anything: the Alberta Continuing Care Association's newswire item writes "This year's Alberta Consumer Price Index (CPI) is 4.2 percent" (a different year from the 1.8%). An industry association paraphrasing, not the Crown, and a series name rather than a citation — it does **not** support minting `-> statcan-cpi`, but it makes the Alberta CPI series the overwhelmingly likely answer once s.11 is readable. Stays `no-document`, now a documented negative with the routes named. **A browser-based session should close this in one call.**

### 7. ANZSCO — the governance question was the whole answer

Cheap check 7, `anzsic-industry-classification.json` `_dropped` entry 4. The entry insisted the first question was governance, not ISCO parentage. It was right, and the answer kills the mint: **joint management has ended.** The ABS media release *ANZSCO Change* (8 October 2024) announces that Australia replaced ANZSCO with the "Occupation Standard Classification for Australia (OSCA), 2024, version 1.0" (released 6 December 2024) and that New Zealand introduced its own tailored occupational classification effective 20 November 2024, the two agencies having agreed that **"the benefits of joint management are no longer compelling"** given growing differences between the two labour markets, and will instead "develop concordances to map between classifications". So the structure that makes `anzsic` genuinely bi-national has no occupational counterpart as of December 2024. **ANZSCO is not a bridge node and must not be minted as one.**

The drift was visible in the last joint edition: the ABS's ANZSCO 2022 Introduction says it "was jointly developed by the ABS, Stats NZ and the then Australian Government Department of Education, Employment and Workplace Relations" but describes both recent revisions as Australia-only ("...undertaken by the ABS" in 2021 and again in 2022). Jointly developed once, unilaterally maintained since.

**The ISCO half fails separately, on §5a.** What ANZSCO 2022 offers is a "description of the comparability between ANZSCO and ISCO-08" — comparability language, the trap by name, not a parentage claim. Distinct from the ANZSIC case, where the volume states derivation outright.

Not adjudicated and flagged: New Zealand's replacement is reported in secondary immigration-sector coverage as Immigration New Zealand's National Occupation List (NOL), in force 20 November 2024. **That is an immigration instrument and may not be the same thing as the statistical classification the ABS release refers to**; no Stats NZ primary source was read. OSCA, by contrast, is unambiguously an ABS statistical classification and a clean single-country node candidate.

### 8. Luxembourg IPCN — resolved, and a predecessor's inference corrected

Cheap check 8, `eurostat-remuneration-update-report.json` `_dropped` entry 0, which three prior searches had left as a possibly-permanent negative. **It is resolved, and the answer is the IPCN.**

The identification is stated as a **definition, never as an acronym**, which is why searching for the string "IPCN" in EU-side documents was never going to find it. Eurostat's methodological annex *Remuneration and Pensions Calculation of the Joint Index in accordance with Annex XI of the EU Staff Regulations* (`prc_colc_tot_esms_an_2.pdf`, fetched in full) names the Luxembourg component as "the Consumer Prices Index (CPI) in the case of Luxembourg", sourced from Statec, then defines it: **"The current Luxembourg national index of consumer prices came into effect in 1997. It complies with the HICP except that its weighting structure excludes the consumer spending of non-residents on Luxembourg territory."** STATEC's own methodology document *L'indice des prix à la consommation (IPC)* (fetched in full) makes that exclusion the *sole* difference between its two indices and assigns it to the IPCN: **"l'IPCN exclut les dépenses de consommation finale effectuées par des non-résidents sur le territoire économique luxembourgeois alors que l'IPCH les inclut"**, and "L'IPCN et l'IPCH sont établis selon les mêmes principes méthodologiques. Les deux indices se distinguent sur le seul point de leur couverture géographique." Two indices, one distinguishing property, and Eurostat states that property — the identification is unique. Edge `eurostat-remuneration-update-report -> lu-statec-ipcn` (`uses_data_from`) minted; dependencies 2→3.

**Stated limit, per §3:** no document read writes "IPCN" and "the Consumer Prices Index (CPI) in the case of Luxembourg" in the same sentence. This is an identification by matching definitions across two primary sources, not a citation, and is recorded as such. Minor date tension logged not resolved: Eurostat dates the current national index to 1997, STATEC writes that Luxembourg decided "en janvier 2000, de réintroduire l'indice national pour les besoins de l'«échelle mobile des salaires»" — consistent if the index existed from 1997 and was adopted for wage indexation in 2000, but neither document says so.

**See Corrections 1** for the predecessor inference this overturns.

### 9. Canada Community-Building Fund — the node-rule question, answered

Cheap check 9, `grande-prairie.json` `_dropped` entry 1, and the question `G.63.md` raised in its own secondary observations: is a federal fund mintable, "unless it publishes its own periodic allocation report"?

**It does publish one, and it still fails — on a different point than expected.** "Canada Community Building Fund Municipal Allocations" is a real dataset on `open.canada.ca` (b61755fd-824b-469d-b75c-3448e31deb89), custodian the Department of Housing, Infrastructure and Communities, first published 2017-07-20, last updated 2026-03-29, maintenance frequency stated as "Annually". That clears §4's point 2 and the cadence test outright. **It fails point 1, the binding one: no document read names it as an input.** Grande Prairie's 2026 budget names the *fund* as a capital revenue source at $5,160,000 — the programme, not the allocation dataset. Naming the money's source is not citing a release; minting off that budget line would be inventing the citation. Entry closed as a `note` rather than left as an open lead: **not blocked on research, simply not documented.** `ccbf-municipal-allocations` stays a clean node *candidate* for a federal-to-municipal transfers pass.

Logged not pursued: HICC's CCBF page states that provinces and territories must "report financial activities annually and outcomes/results every five years to Infrastructure Canada" — two real recurring obligations, two real cadences, **no titles given for either**. Textbook `AGENCY ONLY` under §6. If a province's own CCBF report has a title, that is the better node and it sits between this budget and the federal fund.

## Secondary observations (logged, low priority)

- **The structural fix this session's Headline result argues for:** `_dropped` entries record a blocker but never record *when the blocker was last tested*. Six of nine items here had blockers that had silently expired. A one-line convention — a date stamp on the blocker, distinct from the entry's own date — would let a future sweep sort by staleness instead of re-reading everything. Not implemented; it is a schema question for Thomas, not a session's call.
- **`device_bash` is the right tool for cross-file questions and was under-used before this session.** `grep -rl '<node-id>' src/data/research/` answers "does this already exist?" in one call, against staging up to 50 files. Two of the nine items were closed by exactly that command. It is read-only shell on the user's own mount, and it is not git.
- **`releases_per_year` is optional in the schema** (`src/lib/types.ts` line 310, `releases_per_year?: number`), confirmed by direct read this session before minting two evergreen nodes. §4's "when it is absent, treat the node as evergreen" is safe to rely on; `eu-reg-2016-2304` is the existing precedent and `frb-regulation-q` and `nz-nzsioc` now join it.
- **The Fed's Basel index page is a cautionary shape.** "The agency has a page about X" and "the agency has a document that names X as an input" are different things, and the `_dropped` entry conflated them for months. Worth checking for the same conflation elsewhere.

## Corrections to prior sessions

1. **`eurostat-remuneration-update-report.json` `_dropped` entry 0, same-day UPDATE (ERR-09, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`) — OVERSTATED, and its inference points the wrong way.** It read Eurostat's Methodology page phrase "the Luxembourg CPI (domestic concept)" as "consistent with STATEC's own description of the IPCN's resident-population-only coverage". **In standard ESS terminology the domestic concept is the territory-based one — it includes non-residents' spending on the territory — while the national concept is the resident-based one.** Read that way the phrase points at the IPCH, the opposite of what the update concluded; and the page's paired label "the Belgium HICP (national concept)" sits equally oddly on an HICP. The update's *conclusion* happens to be right (Finding 8 establishes IPCN from other evidence) but its *reasoning* should not be relied on, and the minted edge deliberately does not rest on it. Corrected in the entry itself.
2. **`banking-supervision.json` `_dropped` entry 2 — premise refuted.** "The Federal Reserve maintains its own Basel Regulatory Framework page and US capital rules are Basel-derived in the same way OSFI's are." The second half is right; the first half pointed at a page that carries no citable claim, and at a URL that 404s. Corrected in the entry; see Finding 2.
3. **`eurostat-farm-structure-survey.json` `_open_questions` item 3 and `_dropped` entry 0 — blocker refuted, and the subject renamed.** "FADN's own authoritative site... was unreachable from this environment this session — denied by the browser tool, cause not established." Reachable as plain HTML this session. And FADN is now FSDN. See Finding 4.
4. **`rate-transmission.json` `_dropped` entries 1 and 2 — both stale; and `G.63.md`'s own long-tail sweep did not catch it.** `G.63.md` read `rate-transmission.json` and `credit-and-mortgages.json` in full on the same day, recorded both as swept, and did not connect them. **This is not a criticism of that method so much as a demonstration of its one blind spot**: a file-by-file read cannot see across files by construction, exactly as a keyword pass cannot see the third category (§4). Eighth and ninth instances of the bug class. See Finding 3.
5. **No other prior claim was found wrong this session.** `G.63.md`'s Headline result (the sweep is read-complete) was taken as given and not re-tested — this session read no `_dropped` array it was not directed to by the Cheap-checks list, so it is in no position to confirm or refute it.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.61.md`–`G.63.md`. This session's work is entirely inside **B**.

- **B — the corpus-wide `_dropped` sweep.** Read-complete since `G.63.md`. **Nine of its eleven remaining punch-list items are now closed** (seven resolved, one documented-negative, one still-blocked-but-documented). What is left of B is **two scoped pieces of work, not a list of lookups**: a dedicated Brazilian-fiscal-reporting session (`G.63.md` item 10), and the CIRCABC browser-only gate for the 26 further national EDP inventories (item 11). Plus the three genuinely-open leads this session characterised rather than closed — see Cheap checks 1–3 below. **B is close to done.**
- **A, C, D, E, F, G — untouched this session.** See `G.56.md`–`G.62.md` for their current state.

Worth putting to Thomas when he next picks this up: **with B nearly closed, the planning files are now the bottleneck.** `planning/OPEN-THREADS_2026-08-08.md` and `planning/MISSION-TODO-2.md` still describe item 4a as unworked, two hand-offs after it stopped being true.

## Cheap checks still outstanding

Genuinely cheap, ordered by value per unit effort. The list is much shorter than `G.63.md`'s because nine of its eleven are gone.

1. **Alberta Continuing Care (Ministerial) Regulation, Alta Reg 44/2024, s.11(1)–(2)** — the only item on this list that a *browser* session closes in one call, where four fetch-tool routes failed. Would settle `ab-continuing-care-accommodation-charges -> statcan-cpi`, which the evidence already points at.
2. **A variable-rate mortgage series for Canada** — the missing near-end node blocking `rate-transmission.json`'s entry 2. The Bank's explainer already supplies the edge text; what is needed is a published variable-rate series, which `boc-posted-chartered-bank-rates` is not.
3. **Implementing Regulation (EU) 2024/2746** — carries FSDN's farm-selection methodology per DG AGRI, and is where the *receiving* side's own statement of the FSS extrapolation dependency would be, making `eu-fsdn -> eurostat-farm-structure-survey` two-sided instead of one-sided.
4. **govinfo FR-2013-10-11 (78 FR 62018)** — replace the fetch-tool-truncated Federal Register SUMMARY quotation in `frb-regulation-q`'s edge with a clean verbatim read.
5. **The AES DataInfo+ item, if DataInfo+ ever becomes fetchable again** — upgrades `nz-statsnz-aes -> nz-nzsioc` from a predecessor's reading to a direct verification. The only edge in this file resting on someone else's fetch.
6. **`ess-escb-mip-quality-report` and `ecb-eurostat-bop-na-consistency-report`** — carried unchanged from `G.63.md`: topically adjacent joint quality reports to the CMFB, no citation relationship found, flagged for a pass rather than forced.
7. **Table 1 of the German EDP inventory** (`edp-inventory-regulation-479-2009.json`, per `G.62.md`) — an optional refinement of `de-edp-inventory`'s publisher field, not a real lead. Listed last because it is the least valuable thing on any of these lists.

## What to pass at the start of next thread

1. **This file's Headline result and Secondary observations**, before anything else. The claim that `_dropped` blockers decay faster than `_dropped` evidence is the most reusable thing this session produced, and it applies to every remaining entry in the corpus, not just the punch list.
2. **`planning/OPEN-THREADS_2026-08-08.md` and `planning/MISSION-TODO-2.md`** — carried forward verbatim from `G.63.md` because it is still true and now more so: both understate how much of block B is done, and a future session should **edit those files' own text** rather than leaving two hand-offs in a row as the only place that says it.
3. **This file, then `G.63.md`, `G.62.md`, `G.61.md`, `G.60.md`** for the sweep's history.
4. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node rule — and note that §4's cadence recast is now load-bearing for three nodes), §5a (comparability trap, which killed the ANZSCO/ISCO half this session), §8 (one item at a time).
5. **The seven files changed this session** — `src/data/research/` `anzsic-industry-classification.json`, `nz-statsnz-national-accounts.json`, `banking-supervision.json`, `rate-transmission.json`, `eurostat-farm-structure-survey.json`, `grok-r8-accession-belt.json`, `provincial-social-programs.json`, `eurostat-remuneration-update-report.json`, `grande-prairie.json` (nine, counting the two touched twice). Each carries its resolution inline with the original text preserved below it, same convention as every prior sweep session.
6. **The three nodes minted this session** — `nz-nzsioc`, `frb-regulation-q`, `eu-fsdn` — and the note that two of the three carry no `releases_per_year` by design.

# How to write the next hand-off

Added 2026-08-04. Copy this whole section verbatim into every successor, so the chain never depends on one file surviving. It is the spec, not an example — the file you are reading is the worked example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.

**Mechanics**

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are `.docx`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `EU/`. Earlier files are `.docx`; that was the chat workflow's doing, not a preference.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `EU/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py EU/G.<n>.md
```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). It exists so branch state can be read without parsing prose, and so a future session can diff two hand-offs. `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar; `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.

* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.

**Required structure, in this order**

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

**What each section is for**

Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. If the folder layout or the tooling changed, that goes here.

Session conditions — what constrained the work. Session type (extraction vs verification vs planning), what tooling was available, what did not arrive, what was left untouched by instruction. This is where "the sandbox failed" and "the governing briefs still did not arrive" belong. State plainly which sources you read in full, because everything downstream inherits that limit.

Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.

Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Mark any claim that depends on a predecessor's reading rather than your own — the house convention is (SEC04 per G.17). Quote verbatim; `Research.1.md` §2 applies here exactly as it does to research output.

Secondary observations — real but low-priority. Section fingerprints, oddities worth not rediscovering. Keep them short.

Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. This section is the reason the chain is trustworthy. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.

Thomas's stated priority for the remaining work — lettered blocks (A, B, C, D) carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. This section is what a new agent reads to answer "what is next".

Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. This is the list that gets raided when a session has capacity left.

What to pass at the start of next thread — the packing list, for the case where the next agent has no filesystem access. If it does have access, say so and keep the list anyway; it doubles as an index of what matters.

**Conventions that make these files worth reading**

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement. That is what makes the positive claims usable.
* Predictions are logged and then scored. G.17 predicted a code pattern; G.18 recorded that it "landed". Make falsifiable calls and settle them.
* Distinguish inference from documented fact, and say which narrow respect is still inference. G.18's headline rule is very well evidenced and still not printed in any document — it says so.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
