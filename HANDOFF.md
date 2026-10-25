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

Last updated: 2026-10-25 (**handoff 089** — the superseded state is
`archive/Previous Handoffs/handoff089.md`, copied and sha256-verified before this rewrite; the archive now
holds 89 files. **89 is not divisible by 5, so no sweep ran; the next full sweep is handoff 090.** Follows the
cloud session's round, 2026-10-24.)

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
| **anything housing** — measurement (`housing`) or what acts on the market (`housing-policy`) | `playbook/corpus-nodes.md` for the two tags and the bar, then `notes/housing-policy-dryrun-2026-10-17.md` (the classification, the 9 influence edges, the thin channels). Lane 0a's four steps (hubs, EU HPIs, BIS, national gaps) are told in `archive/Previous Handoffs/handoff089.md` §3; what is left is §3 [Agent] item 1 |
| **merging nodes, or any url-sharing / url-repair work** | `notes/granularity-pilot-br-2026-10-05.md` — the method, and the classify-before-merge finding — then the country note you are in (`notes/granularity-{uy,mx,kr,cn}-2026-10-05.md`, `-ru-2026-10-06.md`). Instruments: `scripts/measure-url-collisions.ts`, `scripts/simulate-merge.ts`. Background: `notes/bps-url-repair-probe-2026-09-15.md`, `notes/node-url-audit-2026-09-15.md` |
| **anything China** — **CLOSED AND PAUSED, do not open without being asked** | `notes/china-progress.md` (44.5k, where every province and city got to) and `notes/china-method-2026-09-09.md` (36.6k, portals and traps). Recipes underneath: `notes/techniques-cn-yearbooks-2026-09-08.md` |
| **working from a claude.ai cloud container** | `Claude outputs/cloud-2026-10-24/session-log-2026-10-24.md`, Environment: the session-only `curl` wrapper that keeps TLS verification on (the grader retries with `-k`, `grade-evidence.ts:1746`), and which hosts answered that container on that day |
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
renderer round 6.3%.** Chars ÷ 4 over a 200k-token window, `wc -c` on the files as written for handoff 089.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 21.7k + CORPUS index 21.6k + PLAYBOOK 12.0k + CLAUDE 3.5k | 58.8k | 14.7k | **7.3%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 50.8k | 12.7k | **6.3%** |
| *was, at handoff 088 as written* | *58.2k / 50.5k* | *14.5k / 12.6k* | *7.3% / 6.3%* |

**What moved it:** `HANDOFF.md` 31.2k → 21.7k. Handoff 088 was written at 21.4k; by the end of the 2026-10-24
round it had reached 31.2k, because mid-round edits kept appending to §3 item 0a (lane 0a's whole step-by-step story
lived there). This rewrite moves that story to the archive and keeps only its open leads. `PLAYBOOK-CORPUS.md` was not
edited; it measures 21.6k by `wc -c` where 088's table carried 21.3k, so 088 under-read it by 0.3k. **The technique that holds
the number is unchanged** — §2 carries ONE round's narrative at full length and everything older is a pointer.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k; China worklist 44.5k and method 36.6k, both off the
always-read path and staying there. *(Not re-measured at 087–089; `playbook/corpus-nodes.md` and `corpus-evidence.md`
each grew in the 2026-10-17 round.)*

## 2. Current state

Corpus **3,721 reports / 3,501 dependencies**, recounted by `npm run validate` on 2026-10-25 (cloud container).
**1,491 A · 1,425 B · 585 C**, A-share 42.6%. **Domains: 47 approved, 0 proposed.** **`validate` exits 0.**
**128/128 logic tests**, `tsc --noEmit` clean, `public/corpus-data.json` regenerated (all 2026-10-25). **990 zero-edge
nodes** — recounted as `grep -c "has no edges in either direction"` over `validate`'s output; it is not a line `validate`
prints. NODE URLS **1,015 bare / 453 zero-edge, 96 index-page, 23 with no url** (three deliberate: Uzbekistan's two
classifiers and `cn-labour-force-survey`). Url collisions **86 groups / 224 nodes** (`scripts/measure-url-collisions.ts`).
Recount from the tools, never carry a figure.

**Latest: the international standard-setters round, 2026-10-25** (Thomas: *"start 1"*, on the recommendation to begin
with IFRS and FATF from `REPORTS.md`'s "not yet run" table). New slice `intl-ifrs-2026-10-25.json`: **`ifrs`, the IASB's
IFRS Accounting Standards**, titled from ifrs.org, alias "International Financial Reporting Standards" (the Foundation's own
registered name). **6 in-edges, 5 A and 1 B**, all `methodology_depends_on` and SELF-DECLARED, from documents already in the
corpus: the IPSASB's Preface (¶13, IPSAS keep IFRS's "accounting treatment and original text"), NDB's and LGFA's annual
reports, Wolverhampton's Statement of Accounts, the XRB's framework page and the Basel leverage-ratio standard (LEV30.8
fn 3, IFRS 9/10). Weighted authority ranks it #24 against raw in-degree #83 (validate's `?` list); one of its six sources, `ipsas`, is weighted #14 itself.
It connected no zero-edge node: all six sources already had edges. **FATF: no node.** The only corpus document naming
it, NDB's AML policy, names the body and borrows its definition, never the Recommendations, so a node would sit isolated.
Negatives in the slice: the NBE annual report (255 pp) never says IFRS; Watercare applies PBE Standards; the QSFS names no
standard. Log: `Claude outputs/cloud-2026-10-24/session-log-2026-10-24.md`, grader output beside it.

**Before it, same day: the direction-suspect ruling, 2026-10-25** (Thomas: *"-drop -drop -drop"*, one per class). All 38 edges of
`Claude outputs/cloud-2026-10-24/direction-suspect-2026-10-24.json` moved from `dependencies` to their slices' `_dropped`
(34 `wrong-direction`, the 4 containment edges `note`), each with its live record verbatim under `original_edge`; 13
slices, backed up to `_to_delete/*.bak-2026-10-25`. 38 fewer edges (22 B, 16 C, no A); none was flipped. **26 nodes
lost their only edges** and are now zero-edge — seven Japanese (three Basic Acts, two White Papers, the energy plan and
the statistics master plan), six Indian district and state reports, three Russian, two each Brazilian, Korean and
Taiwanese, one each Chinese, Ethiopian, Nigerian and Saudi. The list, and every dropped edge: `Claude outputs/cloud-2026-10-24/direction-drop-2026-10-25.json`.
Any of them needs a document stating the right direction before it is wired again.

**Last round: the agent todo list, 2026-10-24 — worked from a claude.ai cloud container, not this machine** (Thomas:
*"go ahead with the agent todo list"*). +16 nodes, +29 dependencies. **TLS verification stayed on throughout:** the
grader's `-k` retry was neutralised by a session-only `curl` wrapper, so hosts whose certificate chain fails (`.gov.in`,
standart.uz) were not read, and India was not attempted. Everything read, tried and graded:
`Claude outputs/cloud-2026-10-24/session-log-2026-10-24.md`, with every grader output beside it.

**What it added.**
- **Poland's Ministry of Finance layer**, new slice `pl-finance-ministry-2026-10-24.json`: the Debt Management Strategy and
  the Medium-Term Fiscal-Structural Plan, with the Public Finance Act 2009 and Regulation (EU) 2024/1263 as their bases
  and NATO's defence-expenditure compendium as a chart source — 3 edges, all A. `pl-pkwiu-2015` reaches NACE (A), the CN (A),
  CPA (B) and PKD 2007 (B) from its own regulation's §4.2 (Dz.U. 2015 poz. 1676).
- **Uzbekistan's metadata sheets**, new slice `uz-metadata-sheets-2026-10-24.json`: all 216 stat.uz sheets fetched and
  searched. 8 indicator nodes (population, births, deaths, unemployment, foreign trade, hotels, Tourism Satellite Account,
  electricity production) and **four international hubs**, each titled from its publisher's own document:
  `un-vital-statistics-principles` (Rev. 3), `un-irts-2008`, `un-ires`, `un-copni-1999`. 19 edges, 16 A; COPNI also takes an
  in-edge from ESA 2010.
- **Canada:** `statcan-cpi -> statcan-lfs` (the rent index's prices) and `statcan-national-accounts -> statcan-nhpi`
  (residential-investment deflator), both A. **Albania:** `eurostat-hicp -> al-instat-cpi-hicp`, B, from a footnote that
  implies the transmission rather than states it. **Ontario:** the portable housing benefit edge moved C → B by citing the
  regulation's own Word copy.
- **Negatives recorded** in their slices: Japan's RPPI method PDFs never name the Handbook; GUS's foreign-trade release is
  not titled the way NBP names it; three more CZSO documents say nothing about transmitting the HICP.

**What it found that is not an edit.** Three questions for Thomas, one ruled since (§3 [Thomas] 1–2 are the other two). The backwards-edge scan read every
instrument → publication edge and every edge whose basis says the source FEEDS the target (ruled and dropped 2026-10-25,
above). Along the way it showed that `kind: instrument` is a contaminated class (§3 [Thomas] 1). **The `housing-policy` filter was confirmed at tier 4** in the
running app (dev server + `scripts/renderer/` method, headless): "50 shown · 3708 in this tier · filter hiding 3658". The
settled render draws 45; the other 5 are zero-edge nodes shelved under "Unlinked", so the counter includes nodes that
are not in the scene. Screenshot in the round's output folder.

**Before it:** the `housing-policy` round and lane 0a's four steps, 2026-10-17/18 — `archive/Previous Handoffs/handoff088.md`
§2 and `handoff089.md` §3; the node-granularity round, 2026-10-05/06 — `notes/granularity-*-2026-10-0*.md`.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox: `package-lock.json` is on disk; `npm ci --legacy-peer-deps`
is the recipe and it worked again on 2026-10-24.)*

## 3. Todo (live items only)

### [Thomas]

1. **`kind: instrument` holds ~490 nodes that are not instruments** — surveys, censuses, classifications, agencies, BOP. The
   2026-09-03 backfill set every node without `releases_per_year` to `instrument` (`types.ts`, comment on `kind`). Recount:
   kind `instrument` whose title carries no legal word (Act, Law, Regulation, Decree, Order, Code …). A data fix per
   `types.ts`, but a `publication` must carry `releases_per_year`, so it is a ruling on how, not a sweep to start unasked.
2. **Aliases that would move grades.** `gb-stevenage-nndr1 -> gb-voa-rating-lists` went B → A on 2026-10-18 through alias
   `non-domestic rating list` matching only "rating list" (`tokenise` keeps "non-domestic" whole, so 2 of 3 tokens), not
   through `local rating list` as its basis says; that alias names the artefact on any text with "rating list", the VOA's
   central list included. Four edges sit at B for the same kind of reason and an alias would lift each:
   `pl-pkwiu-2015 -> cpa`, `on-portable-housing-benefit -> cmhc-rental-market-survey`, and the two
   `-> icls-work-statistics-resolution` edges from Uzbekistan (the sheets put a comma inside the title). No alias was added.
3. **The same miss in a TITLE, measured 2026-10-25 — the second time, so truth rule 5 says it belongs in code.** `ifrs`
   carries its publisher's title, "IFRS Accounting Standards", and its last two words are 2 of 3 tokens, so ANY text with
   "accounting standards" names it: a control sentence about "applicable accounting standards issued by the national board"
   scored `title-run:2/3`. The grader gave `bis-basel-framework -> ifrs` an A off "the lease accounting standards" in a
   nearby FAQ; it is hand-graded B and says why. Wolverhampton and the XRB matched the same way but carry the full alias in
   the quote, so their A's stand. Two questions: (a) should `namesTarget` refuse a 2-token run whose words are generic
   (`accounting standards`, `rating list`)? That changes grades corpus-wide, so it is yours. (b) Does a standard's number
   inside the set ("IFRS 9", "IFRS 10") name the set? The Basel quote names nothing else.

### [Agent]

**In order of value:**

0. **International standard-setters, continued** (`REPORTS.md`'s "not yet run" table; IFRS done 2026-10-25, FATF has no
   citing document). Untested and with no node: **ISO** (3166/4217 — an edition question first: citations rarely date them),
   the **FSB / IOSCO / IAIS**, **Codex**, the **G20 Data Gaps Initiative**. Start each from the corpus side: grep for the
   body, read the citing document, mint only if something names the artefact. IFRS leads in
   `intl-ifrs-2026-10-25.json`'s `_dropped`: the CIPFA Code's own basis (cipfa.org gave this container a Cloudflare
   challenge, so it needs Thomas's browser); `nz-watercare-annual-report -> nz-xrb-a1`, the zero-edge Watercare node's
   edge, quote already read; `nz-lgfa-annual-report`'s url answers 403 (the reports moved to
   `/investors/publications/annual-report`). The IMF's MFSMCG 2016 was not read (www.imf.org 403).
1. **Housing — the open leads of lane 0a and the `housing-policy` follow-ons.** (a) A national balance-sheet node would
   take the NHPI's stock-deflation use (StatCan; a note in `housing-national-gaps-2026-10-17.json`).
   (b) `cmhc-starts-completions-survey` is unwired: nothing read names a statistic built on it. (c) Korea's RPPI node url is
   the REB homepage; reb.or.kr closed the tunnel from the cloud container. (d) `la-city-rso-allowable-increase ->
   bls-cpi-los-angeles` is C and needs Thomas's browser: amlegal is behind Cloudflare, and a headless render was refused as
   bot-check circumvention. (e) Two dead node urls: `edmonton-tax-rate-bylaw` (Edmonton's bylaw lookup fills from data its
   page does not expose) and `ng-lagos-luc-law-2018` (LIRS's legislation page does not carry the law). (f) Thin channels:
   supply and land use (3 nodes) and public and social housing (4); Canada is where the cluster is.
   `notes/housing-policy-dryrun-2026-10-17.md`.
2. **Poland.** (a) The state budget execution report: its page is
   `https://www.gov.pl/web/finanse/wykonanie-budzetu-panstwa`, the annual PDF was not opened; mint it, then check its legal
   basis in the Public Finance Act and whether NIK's analysis (`pl-nik-budget-execution-analysis`) names it by title.
   (b) The Public Finance Act's CPI-indexation rules: the consolidated text (Dz.U. 2025 poz. 1483) answered 403 from ISAP.
   (c) NBP's IIP and external-debt series: real, evidence already read, deliberately not minted. Leads (a) and (b) are notes in
   `pl-finance-ministry-2026-10-24.json`; www.gov.pl and its `/attachment/` PDFs read cleanly from the cloud container.
3. **Uzbekistan.** (a) **`standart.uz`, not lex.uz**, for `uz-oked` and `uz-coicop`'s urls — Uzbek classifiers are
   Uzstandard standards, not legal acts; the lex.uz search is done and negative. standart.uz fails TLS verification from a
   cloud container. (b) **ISCED 2011 wants a node**: four sheets name it, but UNESCO's own title could not be read from the
   container (unesdoc is behind a Cloudflare challenge). (c) `uz-cpi -> the HIES` stays refused: the current CPI sheet says only
   "special surveys". (d) **About nineteen more demographic sheets** name the Vital Statistics recommendations and wire the same
   way if minted (list in the session log); the CN FEA (which carries the HS), the national product classifier (based on CPA
   2008), the PPI Manual and BEC have no nodes. `notes/uzbekistan-2026-09-16.md`.
4. **INDIA follow-ons, all cheap — from this machine** (they need `curl -k`). (a) **Four more NADA study pages match no
   existing node and carry the same frame sentence** — Time Use Survey (catalog 236), the education and telecom modular
   surveys (255, 239), participation in education (300). (b) **NIC-2008 has no node** and both the IIP and ASI cite it; only
   NIC-2025 exists, which is the wrong target. Needs MoSPI's own page, so the browser. (c) **The Sixth Economic Census** is
   named by ASUSE as its rural stratification source and has no node. (d) **`mahades.maharashtra.gov.in` is readable with
   `-k`** — five orphan nodes nobody has tried. `notes/india-nss-frames-2026-09-16.md`.
5. **Czechia's `eurostat-hicp` feed edge.** Its ESMS page and three CZSO documents (methodology page, the 2026 CPI manual,
   the September 2026 release) carry no transmission sentence; the note in `eu-statutes-and-de-hicp-2026-09-15.json` lists
   them. Needs another CZSO page, the way Sweden's came off SCB's.
6. **Romania's IAPC node.** Thomas's Chrome renders `insse.ro` first try; no cloud container has reached it. Two guessed paths
   for the IAPC's own page 404'd, so it needs someone to find the right page.
7. **NUTS**, unchanged: Regulation (EC) No 1059/2003 is fetched and read and deliberately NOT minted, because nothing in the
   corpus yet names NUTS as its own basis. A regional-statistics round opens it with one CELLAR fetch.
8. **Granularity leftovers.** (a) Two urls blocked on this machine's route and on a cloud container's, not on the sites:
   `ru-med-socio-economic-development-forecast` (`economy.gov.ru`) and `ru-dia-deposit-insurance-agency` → its own homepage
   `www.asv.org.ru` (an institution's url is its homepage; it will add 1 to the bare-homepage count, by design). Not written
   blind. (b) **86 url groups / 224 nodes still collide corpus-wide**; the six done were the largest. Any further country:
   dry-run with the two scripts, classify first, write, re-grade.
9. **The orphan stock whose urls are already documents — needs no ruling, nothing blocked.**
   Recounted 2026-10-05: **EU 35 zero-edge nodes / 0 bare, Japan 14 / 0, Canada 12 / 0.**
   Hand-research; the EU row routes through `notes/eu-statutes-2026-09-15.md`.

Standing, and none of it needs a round of its own:

- **`notes/standing-issues.md`** carries everything that outlived five handoffs — **FR** (four
  rounds in, paused, the live method recorded), **DE** (finished as a programme; only a Chapter
  10.3 scope question remains, which is a ruling not research), and the **DSBB option E** worklist
  pointer (~15 pairs, each needing its publisher's page).
- **`iq-cso` / `ye-cso` / `sy-cbs` / `sd-cbs` stay PARKED** — the rule is in
  `playbook/corpus-nodes.md`. `iq-cso`'s possible-duplicate question is open in
  `notes/standing-issues.md`, not here. **`uz-ssc`** (the statistics office carried as `kind: instrument`) is the same kind
  of node and falls under §3 [Thomas] 1.

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
