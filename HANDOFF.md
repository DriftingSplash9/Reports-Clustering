# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: `archive/Previous Handoffs/` — the diary series, and the only record.

**Keep §1–§3 to state and pointers; §4 is fixed and verbatim.** No changelog, no
round narrative. Finished items LEAVE (§4 step 4); the archived handoff is their
record. The gauge is the read-cost percentage in §1, not a character count.

Last updated: 2026-10-17 (**handoff 088** — the superseded state is
`archive/Previous Handoffs/handoff088.md`, copied and sha256-verified before this rewrite; the archive now
holds 88 files. **88 is not divisible by 5, so no sweep ran; the next full sweep is handoff 090.** Follows the
`housing-policy` round, 2026-10-17.)

---

## 1. Read next

**This is the project's only read order.** `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block point
here. **Restructured 2026-09-09** (Thomas: *"just have one handoff that says where to go if doing
such and such a thing… this way the whole lot doesn't need taken in"*): what follows is a router,
not a reading list. Read the ALWAYS set, then open exactly the rows your task lights up.

### Always — this file, then these two

| file | k | why |
|---|---|---|
| `PLAYBOOK.md` | 12.0k | the rules that bind every task whatever it is; its §1 routes you to one lane |
| `CLAUDE.md` | 3.5k | read automatically by a local Claude Code session |

Then ONE lane index: **`PLAYBOOK-CORPUS.md` (21.3k)** for research/minting/wiring/grading, or
**`PLAYBOOK-RENDER.md` (13.6k)** for the renderer. Each is an index plus the rules that bind
every change in that lane.

### Then, routed by what you are actually doing

| doing | read |
|---|---|
| **wiring an ordinary edge off a clean fetch** | **nothing more.** `PLAYBOOK-CORPUS.md` §2 and its schema traps are the whole binding set |
| deciding whether a document NAMES the target | `playbook/corpus-naming.md` (§7a) — the most-cited section in the lane |
| writing a quote, grading, or a grade surprised you | `playbook/corpus-evidence.md` (§6) |
| MINTING a node, MERGING one, or re-opening a settled question | `playbook/corpus-nodes.md` (§7c, §7d) — **one node per document** and **a recurring node's url is its latest edition page** live there |
| the bytes came by an unusual route (browser, archive, token, zip) | `playbook/corpus-route.md` (§7b) |
| a fetch failed, or a host looks blocked | `playbook/corpus-hosts.md` (§6) — and re-probe, never believe a stored verdict |
| **anything housing** — measurement (`housing`) or what acts on the market (`housing-policy`) | `playbook/corpus-nodes.md` for the two tags and the bar, then `notes/housing-policy-dryrun-2026-10-17.md` (the classification, the 9 influence edges, the thin channels). The proposed research lane is §3 [Agent] item 0a |
| **merging nodes, or any url-sharing / url-repair work** | `notes/granularity-pilot-br-2026-10-05.md` — the method, and the classify-before-merge finding — then the country note you are in (`notes/granularity-{uy,mx,kr,cn}-2026-10-05.md`, `-ru-2026-10-06.md`). Instruments: `scripts/measure-url-collisions.ts`, `scripts/simulate-merge.ts`. Background: `notes/bps-url-repair-probe-2026-09-15.md`, `notes/node-url-audit-2026-09-15.md` |
| **anything China** — **CLOSED AND PAUSED, do not open without being asked** | `notes/china-progress.md` (44.5k, where every province and city got to) and `notes/china-method-2026-09-09.md` (36.6k, portals and traps). Recipes underneath: `notes/techniques-cn-yearbooks-2026-09-08.md` |
| fetching / capturing / extracting anything else | `notes/techniques-2026-09-04.md` — recipes and host workarounds. **Every host reading in it is a claim about one machine on one day.** |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first; then the round memory for your bit — `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme's design | `notes/Midvamp - Revamp.md` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md`, `notes/imf-elibrary-2026-09-06.md` (its second addendum corrects the first) |
| **the EU classification or statute layer** — ECOICOP, NACE, CPA, the HICP regulations, any national HICP | **`notes/eu-statutes-2026-09-15.md` first** — the four acts' resolved CELLAR URLs, why no statute node was minted, what the four remaining HICP countries each need, and the insse.ro route split — then `notes/eu-classification-statute-2026-09-14.md` for the ESMS hi3/hi4 split and the 140-pair grader selection |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| a `meta.note` from the August 2026 import | `notes/mint-2026-08-20.md` |
| "what is broken that nobody is fixing?" | `notes/standing-issues.md` — outlived five handoffs; not on the mandatory path |
| editing any doc in the slow layer | `notes/doc-audit-2026-09-09.md` (handoff-080 sweep, and the cadence answer) — format and worked example in `notes/doc-audit-2026-09-07.md` |
| **editing §2/§3 mid-round** | nothing — that is not a handoff and needs no archive; §4 below has the one-line test |
| **writing a handoff** | `notes/handoff-procedure.md` — the full §4 procedure, moved there 2026-09-09 |
| **a note exists but no row above names it** | `notes/README.md` — the index of every file in `notes/`, one line each. Not on the mandatory path; open it when §1 does not route you |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Project instructions and memory are summaries written outside the repo: **where either disagrees
with a file, the file wins.**

### Read cost — the bloat gauge, refreshed every handoff

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 7.3% of its context before he types a prompt, a
renderer round 6.3%.** Chars ÷ 4 over a 200k-token window, `wc -c` on the files as written for handoff 088.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 21.4k + CORPUS index 21.3k + PLAYBOOK 12.0k + CLAUDE 3.5k | 58.2k | 14.5k | **7.3%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 50.5k | 12.6k | **6.3%** |
| *was, at handoff 087 as written* | *56.7k / 49.2k* | *14.2k / 12.3k* | *7.1% / 6.2%* |

**What moved it:** `HANDOFF.md` 20.2k → 21.4k (§2 now carries the `housing-policy` round at full length and the granularity
round as a pointer; §3 gained the proposed housing lane and one follow-on); `PLAYBOOK-CORPUS.md` 21.1k → 21.3k, one index
line for the `housing-policy` ruling in §7c. **The technique that holds the number is unchanged** — §2 carries ONE round's
narrative at full length and everything older is a pointer.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k; China worklist 44.5k and method 36.6k, both off the
always-read path and staying there. *(Not re-measured at 087; `playbook/corpus-nodes.md` and `corpus-evidence.md` each
grew this round.)*

## 2. Current state

Corpus **3,704 reports / 3,504 dependencies**, recounted by `npm run validate` on 2026-10-18 after lane 0a steps (1)-(4), Slovakia, Türkiye, Finland, France and the VOA split. **1,463 A · 1,439 B ·
602 C**, A-share 41.8%. **Domains: 47 approved, 0 proposed** (`housing-policy` added 2026-10-17). **`validate` exits 0.**
**128/128 logic tests**, `tsc --noEmit` clean, `public/corpus-data.json` regenerated (all 2026-10-18). **965 zero-edge
nodes** — recounted as `grep -c "has no edges in either direction"` over `validate`'s output; it is not a line `validate`
prints. NODE URLS **1,015 bare / 450 zero-edge, 96 index-page, 23 with no url** (three deliberate: Uzbekistan's two
classifiers and `cn-labour-force-survey`). Url collisions **86 groups / 224 nodes** (`scripts/measure-url-collisions.ts`).
Recount from the tools, never carry a figure.

**Last round: `housing-policy`, 2026-10-17 — CLOSED; a tagging round, no node or edge changed.** Thomas asked to single out
anything that influences the housing and rental markets, not only price or rent controls. **Two tags, one per meaning:**
`housing` stays MEASUREMENT of the market (prices, rents, stock, starts); the new domain **`housing-policy`** marks what
ACTS on it, carried alongside the node's existing domain so the channel is the intersection (with `taxation`,
`financial-regulation`, `benefits` …) and the app's existing domain filter singles them out with no renderer change.
**The bar (Thomas): tag only when the node's own document is about that market**, so a policy-rate decision or an
immigration target is not tagged; **general property taxes ARE** (ruling (a)). Both rulings live in
`playbook/corpus-nodes.md`.

**What it found.** 283 candidate nodes, every one read: **24 cleared the bar** — credit and mortgage rules 5 (OSFI B-20, both
minimum qualifying rates, the BoC benchmark, CMHC insurance), housing-specific taxes 4, subsidies and rent supports 5, rent
and tenancy regulation 3 (both LA rent caps, Quebec's low-rental regulation), supply and land use 3, public and social
housing 4 — **plus the 25 general property taxes: 49 tagged.** `housing` was added to 5 measurement nodes that lacked it
(the CMHC Rental Market Survey among them) and removed from 5 mis-tagged ones. **The influence is already wired in 9
edges**, five of them a rule `calculated_from` a statistic (four at A) — and **the CMHC Rental Market Survey is the hub three
provincial rent supports are built on.** 25 slices touched, each backed up; change log
`Claude outputs/housing-policy-2026-10-17/write-log-2026-10-17.json`.

**Each tagged node's own document was fetched first: 39 confirmed, 10 unreadable from this machine** — two curl 000, two
Ontario e-Laws JS shells, a 403, an Incapsula wall, and **two dead node urls (`ng-lagos-luc-law-2018`,
`edmonton-tax-rate-bylaw`, 404)**. The two C edges among the 9 stayed C on the re-grade for route reasons (Ontario e-Laws,
the LA code library behind Cloudflare); their bases already carry the formula verbatim.

**The filter was checked in the running app** (dev server, built-in browser pane): the subject list shows 47 domains with
"housing policy 49" beside "housing 50", and clicking it isolates the set ("SUBJECT — 1 OF 47", "filter hiding 182").
**Not confirmed:** the 49 appearing at the "Everything" tier — the pane was hidden, which throttles the unfold animation,
so the graph stayed on tier 1. To run the app again, `C:\.claude\launch.json` holds a `reports-clustering-dev` config
(outside the repo; this machine's session root is `C:\`).

**What the corpus does NOT have, measured the same day:** only **35 of 200 countries** carry any housing node; house-price
and rent indices are almost absent (the UK's are nearly the only ones titled as such); **no international housing hub
exists** — no RPPI Handbook, no BIS residential property price database, no EU house-price-index node. That is §3 item 0a.

**Before it:** the node-granularity round, 2026-10-05/06 — six countries, 25 merges, 72 url repairs, collisions 116/339 →
86/224; one note per country, `notes/granularity-*-2026-10-0*.md`, method in the Brazil pilot note. Uzbekistan and India
(2026-09-16): `notes/uzbekistan-2026-09-16.md`, `notes/india-nss-frames-2026-09-16.md`.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox: `package-lock.json` is on disk; `npm ci --legacy-peer-deps`
is the recipe and it worked again on 2026-09-15.)*

## 3. Todo (live items only)

### [Thomas]

Nothing is waiting on a ruling.

### [Agent]

**In order of value:**

0a. **HOUSING RESEARCH LANE — steps (1)-(4) DONE 2026-10-17; what is left is the open items and leads inside each step. Thomas asked to "expand the search into anything
   housing".** Method: mint the hubs that NAME national sources, then wire the national series to them. In order:
   (1) **DONE 2026-10-17** (Thomas: *"start lane 0a step 1"*), slice `housing-rppi-hub-2026-10-17.json`: hub
   **`rppi-handbook`** minted (`standard`, 2013 edition, Eurostat KS-RA-12-022; the publisher's own title says "Prices
   Indices", so the citing spellings are `title_aliases`), plus **`ie-cso-rppi`** (Ireland's RPPI). Three edges, all A on a
   dry-run grade, hand-written (no `--write`): `gb-ons-ukhpi -> rppi-handbook`, `ie-cso-rppi -> rppi-handbook`
   (`methodology_depends_on`) and `ie-cso-rppi -> eu-reg-2016-792` (`legal_basis`, SIMS §8.1). **Read and NOT wired:**
   Japan MLIT's RPPI page describes "a handbook on house price indices" made by Eurostat and international bodies but never
   gives its title. That is a lead for the MLIT method PDFs, and Japan has no RPPI node yet. The Israel and China nodes' own
   pages do not name the Handbook. Korea's node url is the REB homepage. Eurostat's `prc_hpi_esms.htm` answered 404 at
   `/cache/metadata/en/`. **The UK HPI → VOA doubt is RESOLVED (2026-10-18, Thomas: "split it"):** the
   cause was a bundled node. `gb-voa-rating-lists` is now the **Local Non-Domestic Rating List** (url: the VOA's rating list
   downloads). New **`gb-voa-council-tax-valuation-list`** (url: GOV.UK "Check your Council Tax band"). `gb-ons-ukhpi ->`
   the Council Tax list re-grades **A** (`title-run:4/4`), so stored and graded now agree. `gb-stevenage-nndr1 ->
   gb-voa-rating-lists` **B → A**: it gained a verbatim `evidence_quote` from the PDF, re-read live, and the new alias "local rating
   list" matches it. That alias was added in the split, and Thomas may read it as moving a grade. The PIPR near-miss note
   was re-pointed and its refusal stands. Backups are in `_to_delete/`. Grader output: `Claude outputs/housing-rppi-2026-10-17/`;
   (2) **EU house-price indices — FIRST BATCH DONE 2026-10-17** (Thomas: *"start lane 0a step 2"*), slice
   `housing-eu-hpi-2026-10-17.json`. **The hypothesis holds:** `eu-reg-2016-792` Art. 1 covers the HPI and OOH price index,
   and Art. 3(1) obliges Member States to provide the "harmonised indices", which Art. 2(12) defines to include both.
   **Source: the national HPI metadata `prc_hpi_inx_esmshpi_<cc>.htm`**, linked from Eurostat's `prc_hpi_inx_esms.htm` and
   written by each NSI (SELF-DECLARED); filenames are in `notes/techniques-2026-09-04.md`. Minted the second hub
   **`eu-reg-2023-1470`** (the HPI/OOH implementing act; it amends `eu-reg-2020-1148`; from CELLAR) with its `legal_basis` to
   2016/792, plus seven national HPIs: `at-statistik-hpi`, `be-statbel-hpi`, `ch-fso-impi`, `es-ine-ipv`, `hr-dzs-hpi`,
   `nl-cbs-hpi`, `pl-gus-residential-premises-price-indices`. **16 edges, all A** on a dry-run grade, hand-written. Four
   more reach `rppi-handbook` (BE, CH, PL `methodology_depends_on`; NL `cites`, a quality framework), (hub counts are under batch 4, below).
   BE and NL were read in the browser pane: statbel serves curl a bot challenge, and cbs.nl fails TLS from curl.
   `nl-cbs-hpi`'s url is CBS's survey description page, not an edition page.
   **Batch 2, same day** (Thomas: *"continue … Portugal first"*): `pt-ine-hpi`, `de-destatis-hpi` (title "Häuserpreisindex",
   statistic 61262; url is the latest press release), `it-istat-house-prices`, `lv-csb-hpi` (url is CSP's metadata page). 8 edges:
   7 A, and **`pt-ine-hpi -> rppi-handbook` B `agency-not-artefact`**: the metadata says "RPPI international handbook", not the
   title. It is wired as `cites` and left at B. PT and IT were found in the browser pane through INE's and Istat's press-release lists.
   **Ruling (Thomas, 2026-10-17), now in `playbook/corpus-nodes.md`:** skip countries with no national HPI release (**EE, SE,
   DK, CZ**, like IE). For **FI, FR, NO**, mint each national index the metadata names. **Batch 3, done the same day:**
   `fi-statfin-dwellings-housing-companies-prices`, `fi-statfin-real-estate-prices`, `fr-insee-second-hand-dwellings-price-index`,
   `fr-insee-dwellings-price-index`, `no-ssb-existing-dwellings-price-index`, `no-ssb-new-dwellings-price-index`. Two edges, both to
   `eu-reg-2020-1148` from SSB's own "EEA reference" field: new dwellings A, and existing dwellings **B
   `quote-found-target-not-named`** (the page writes "EC 2020/1148"). **FR was worked 2026-10-18:** Insee's IPL note (Sept 2018) wires `fr-insee-dwellings-price-index` to the second-hand index (`calculated_from`, A), to new node `fr-sdes-ecln` (A) and to `fr-insee-csl` (B; the note says "comptes du logement"). No Insee document names the Handbook or an EU act; that is a note in the slice. **FI
   was worked 2026-10-18:** the FINNISH documentation carries what the English lacks. `fi-statfin-dwellings-housing-companies-prices
   -> rppi-handbook` is A ("Hintaindeksien laadintaa ohjaa Handbook…"). New node `fi-statfin-building-cost-index`, with
   `fi-statfin-real-estate-prices -> fi-statfin-building-cost-index` at A from the English kihi page; the inflected Finnish
   form graded B. **`fi-statfin-cpi -> …housing-companies-prices` is `no-document`:** the "source data for the national
   CPI" sentence a search summary quoted was not on any raw page read. The note is in the slice's `_dropped`. **A doubt about France, for Thomas:** Insee's
   own p1644 page describes a "Price index for dwellings" composed of the old and new indices, which looks like a national
   TOTAL. If so, France is not the several-indices shape, and the second-hand node may be the composite's part.
   Thomas then ruled to keep both French nodes as they are. **Batch 4, same day:** `cy-cystat-hpi` (found through
   CYSTAT's Price Indices subtheme page), `mt-nso-rppi` (Malta's HPI release is its RPPI; read in the pane past Cloudflare),
   and `si-surs-residential-housing-price-indices` (SI edges from SURS's own methodological explanation, DocSysFile/8346). 6
   edges, all A. **Skipped under the ruling:** BG, HU, LT and RO (each metadata page's §10.1 says no national HPI news
   release) and LU (published only as a short-term indicator series, série C). **Step (2) is DONE, SK included** (2026-10-18):
   `sk-susr-house-price-indices` ("House price indices in the 2nd quarter of 2026", 31 Aug 2026), with 1 A edge to
   `eu-reg-2023-1470`. Its url is the ID-only form `…/inf_sprava_detail/<uuid>/`, which redirects to the report in a browser.
   The recipe is in `notes/techniques-2026-09-04.md`. **Hubs now (2026-10-18, after steps (1)-(4), SK, TR and FI):** `rppi-handbook` has 12
   in-edges and `eu-reg-2023-1470` has 14 (recount: count `target_report_id` over the slices). **TR — DONE 2026-10-18:** `tr-cbrt-rppi` ("Residential Property Price Index and New Tenant Rent Index", the CBRT's monthly report) in `housing-national-gaps-2026-10-17.json`, with 1 edge `-> rppi-handbook`, from the CBRT's own metadata footnote. It is **held at B** by Thomas's 2026-10-18 ruling (new in `playbook/corpus-naming.md`), because the footnote dates the Handbook "Eurostat (2011)" against the 2013 edition. The grader said A. No EU act applies (national law only), and TURKSTAT's household-number weights are agency-only, kept as a note. **IE has no national HPI
   publication** ("managed by Eurostat"); its counterpart `ie-cso-rppi` is already wired. **EL** has no metadata page.
   The fetched pages are scratch only, so re-fetch: about 190 kB each; (3) **the BIS residential property
   price database — DONE 2026-10-17** (Thomas: *"start lane 0a step 3"*), slice `housing-bis-rppi-2026-10-17.json`. The only
   readable per-country document is the BIS's own `pp_selected_documentation.pdf` (updated 31 July 2026). The detailed set's
   documentation PDF answered 404, and data.bis.org is a JavaScript app. Minted **`bis-selected-rppi`** ("Selected residential
   property prices"), with 2 edges, both A and SELF-DECLARED (the BIS documents its own data set): `-> rppi-handbook`
   (`methodology_depends_on`; the BIS "relied on the recommendations" of the Handbook) and `-> de-destatis-hpi`
   (`uses_data_from`; Germany's row names the Federal Statistical Office's "House Price Index"). **The handoff's "register
   edges" premise was wrong:** the source table names an AGENCY for nearly every country, which does not name the
   artefact (§7a). Those rows are one `note` in the slice's `_dropped`, mapped to the corpus node each would reach. Several
   point to a central bank, not the NSI node (AT, CY, IT). **Leads for (4):** CA's row names Statistics Canada's
   "Residential Property Price Index" (2017-2021) and CREA's "MLS Home Price Index". XM's row names "Eurostat's House
   Price Index". Step (4) gave Eurostat's HPI and the MLS HPI nodes; (4) **national gaps — DONE 2026-10-17** (Thomas:
   *"start lane 0a step 4"*), slice `housing-national-gaps-2026-10-17.json`. Nine nodes: `eurostat-hpi`, `statcan-nhpi`,
   `crea-mls-hpi` and `teranet-nb-hpi` (both `source_kind: commercial`), `cmhc-market-absorption-survey`,
   `cmhc-starts-completions-survey`, `fhfa-hpi`, `fhfa-conforming-loan-limits` (`housing-policy`), and `census-hvs`. **10 edges:
   9 A, 1 B.** Eurostat HPI goes to 2016/792, 2023/1470 and the Handbook (cites). BIS goes to Eurostat HPI and the MLS HPI.
   **`statcan-cpi` goes to the NHPI, the MLS HPI and Teranet**, all from the CPI Reference Paper's paragraph 122, so the CPI
   now visibly rests on two commercial house price indexes. **`fhfa-conforming-loan-limits -> fhfa-hpi` (`calculated_from`)**
   is the US policy channel: the HERA loan limit moves with the HPI. `statcan-nhpi -> cmhc-market-absorption-survey` is **B
   `via-snapshot`**: the grader reads www23.statcan.gc.ca only through Wayback, even with `--refetch`, although curl -k reads
   it live. **Not minted: StatCan's RPPI.** The CPI paper says the MLS HPI replaced it from March 2022, its IMDB page answered 500,
   and both documents naming it are historical. **Ruled (Thomas, 2026-10-17):** `census-hvs` is `part_of` `cps-current-population-survey`, with no
   dependency edge (rule 12). The evidence is the release's own source line, quoted in the node's description, so it still counts as
   zero-edge. `cmhc-starts-completions-survey` is
   unwired: nothing read names a statistic built on it. **Leads:** a national balance-sheet node would take the NHPI's stock-deflation
   use (a `no-document` note in the slice), and the CPI rent-component methodology was not reached. New nodes take
   `housing` or `housing-policy` under the existing bar. `notes/housing-policy-dryrun-2026-10-17.md`.
0b. **POLAND — RETURNED 2026-10-06; the blocker is gone.** `https://www.gov.pl/web/finanse` loaded in Chrome with no
   prompt. Two layers. **The Ministry of Finance layer**, never researched: the Debt Management Strategy (the Council of
   Ministers adopted *"Strategię zarządzania długiem sektora finansów publicznych w latach 2027-2030"* on 29.09.2026, per
   the ministry's own news list), the state budget execution report, and the Medium-Term Fiscal-Structural Plan. **And the
   three 2026-09-11 leads, verbatim as they stood:**
   1. **GUS's own title for its foreign-trade release.** NBP's balance-of-payments methodological
      notes name it as the largest single input to the Polish current account, but "Foreign Trade
      Statistics" is NBP's name for it and a node must carry the publisher's own title.
      `stat.gov.pl`'s English pages redirected to `new.stat.gov.pl` mid-session.
   2. **PKWiU 2015's upstream** — the target is almost certainly `cpa`, stated in the introducing
      regulation (Dz.U. 2015 poz. 1676). Note that `cpa` now has a second in-edge from
      `eurostat-prodcom`, so it is no longer a one-edge node.
   3. **NBP's IIP and external-debt series** — real, evidence already read, deliberately not minted.
0c. **UZBEKISTAN follow-ons.** (a) **`standart.uz`, not lex.uz** — the two classifier nodes
   (`uz-oked`, `uz-coicop`) carry no url because Uzbek classifiers are Uzstandard standards rather
   than legal acts; the lex.uz search is done and negative, do not repeat it. (b) **~190 more
   metadata sheets** on stat.uz, same ESMS shape, each naming a methodological parent — ten read so
   far. (c) **A household-budget-survey sheet or weights note** closes `uz-cpi -> the HIES`, refused
   because the CPI sheet names the HIES frame and the weight source in separate sentences and never
   joins them. (d) **COPNI has no node** and is named beside COICOP and COFOG on the
   national-accounts sheet — it would also take an in-edge from ESA 2010. `notes/uzbekistan-2026-09-16.md`.
0d. **INDIA follow-ons, all cheap.** (a) **Four more NADA study pages match no existing node and carry the
   same frame sentence** — Time Use Survey (catalog 236), the education and telecom modular surveys (255,
   239), participation in education (300). One fetch each, `curl -k`. (b) **NIC-2008 has no node** and both
   the IIP and ASI cite it; only NIC-2025 exists, which is the wrong target. Needs MoSPI's own page, so the
   browser. (c) **The Sixth Economic Census** is named by ASUSE as its rural stratification source and has
   no node. (d) **`mahades.maharashtra.gov.in` is readable with `-k`** — five orphan nodes nobody has tried.
   `notes/india-nss-frames-2026-09-16.md`.
1. **Grep the August 2026 import for instrument-as-dependent pairs.** The India round found
   `in-collection-of-statistics-act-2008 -> in-mospi-asi` recorded backwards — the Act depending on
   the survey it authorises. If the import did it once it may have done it at scale, and a
   wrong-direction edge is invisible to every check the validator runs. One pass over `_dropped` and
   live edges whose target is `kind: instrument`. **The granularity round raises the odds:** the same
   import recorded containment as a dependency at least five times (the Rosstat appendices).
2. **Czechia and Albania** still lack the `eurostat-hicp` feed edge. Both ESMS pages were read in
   full: neither carries a country-specific transmission sentence, only the all-NSI boilerplate.
   They need the NSI's own page, the way Sweden's came off SCB's.
3. **Romania's IAPC node.** The cloud container cannot reach `insse.ro` (curl exit 35) while Thomas's
   Chrome renders it first try. Two guessed paths for the IAPC's own page 404'd, so it needs someone
   to find the right page — the host is no longer the obstacle.
4. **NUTS**, unchanged: Regulation (EC) No 1059/2003 is fetched and read and deliberately NOT
   minted, because nothing in the corpus yet names NUTS as its own basis. A regional-statistics
   round opens it with one CELLAR fetch.
5. **Granularity leftovers.** (a) Two urls blocked on THIS machine's route, not on the sites:
   `ru-med-socio-economic-development-forecast` (`economy.gov.ru`) and `ru-dia-deposit-insurance-agency` → its own
   homepage `www.asv.org.ru` (an institution's url is its homepage; it will add 1 to the bare-homepage count, by
   design). Not written blind. (b) **86 url groups / 224 nodes still collide corpus-wide**; the six done were the largest.
   Any further country: dry-run with the two scripts, classify first, write, re-grade.
5b. **`housing-policy` follow-ons** (domain added and 49 nodes tagged 2026-10-17). (a) Two C edges whose formula is already
   verbatim in the basis need a browser read for an `evidence_quote`: `on-portable-housing-benefit -> cmhc-rental-market-survey`
   (Ontario e-Laws) and `la-city-rso-allowable-increase -> bls-cpi-los-angeles` (amlegal, Cloudflare). (b) Two dead node urls:
   `ng-lagos-luc-law-2018`, `edmonton-tax-rate-bylaw` (404). (c) **Confirm the 49 at the "Everything" tier** with the browser pane VISIBLE (a hidden pane throttles the
   unfold). (d) **Thin channels to research:** supply and land use (3 nodes
   corpus-wide) and public and social housing (4); Canada is where the cluster already is. `notes/housing-policy-dryrun-2026-10-17.md`.
6. **The orphan stock whose urls are already documents — needs no ruling, nothing blocked.**
   Recounted 2026-10-05: **EU 35 zero-edge nodes / 0 bare, Japan 14 / 0, Canada 12 / 0.**
   Hand-research; the EU row routes through `notes/eu-statutes-2026-09-15.md`.

Standing, and none of it needs a round of its own:

- **`notes/standing-issues.md`** carries everything that outlived five handoffs — **FR** (four
  rounds in, paused, the live method recorded), **DE** (finished as a programme; only a Chapter
  10.3 scope question remains, which is a ruling not research), and the **DSBB option E** worklist
  pointer (~15 pairs, each needing its publisher's page).
- **`iq-cso` / `ye-cso` / `sy-cbs` / `sd-cbs` stay PARKED** — the rule is in
  `playbook/corpus-nodes.md`. `iq-cso`'s possible-duplicate question is open in
  `notes/standing-issues.md`, not here.

## 4. How to hand off

**You almost certainly do not need it. Editing a line of §2/§3 during a round is NOT a handoff
and needs no archive** — only replacing the state prose wholesale is, and the test is whether the
prose being replaced would be unrecoverable afterwards. *(That sentence opened §4 for the life of
this file. It moved out with the procedure on 2026-09-09 and round 31 found it a hop deeper than
a research round should have to dig — restored here 2026-09-09, because it binds every round and
the file it moved to binds one task.)*

**The procedure lives in `notes/handoff-procedure.md`.** It is 8.4k, it binds exactly one task,
and every research round was reading it to do something else — so it moved there on 2026-09-09
and this section is a pointer. *(It sat here, verbatim, from the file's creation until then; the
text is unchanged and that file says so.)*

**Read it when Thomas asks for a handoff.** In outline, so you know whether you need it: read
this file first, **archive it before rewriting** (`archive/Previous Handoffs/handoffNNN.md`,
zero-padded, one higher than the highest there — verify with `sha256sum`), rewrite §2/§3 as
state and pointers, sweep out what is finished, **sweep EVERYTHING — fast layer AND slow layer —
if NNN is divisible by 5** (Thomas, 2026-09-10: the slow layer used to be swept on the 20's and that
routine is retired), and refresh §1's read-cost table. **No round narrative goes to project memory** — the
archive is the record (Thomas, 2026-09-15).

**Never run git, never state git status, never tell Thomas to commit** — that is `PLAYBOOK.md`
rule 1 and it binds every task, not just this one.
