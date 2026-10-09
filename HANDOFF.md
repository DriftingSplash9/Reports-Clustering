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

Last updated: 2026-10-06 (**handoff 087** — the superseded state is
`archive/Previous Handoffs/handoff087.md`, copied and sha256-verified before this rewrite; the archive now
holds 87 files. **87 is not divisible by 5, so no sweep ran; the next full sweep is handoff 090.** Follows the
node-granularity round, 2026-10-05/06, the first data-changing round since Uzbekistan.)

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

Then ONE lane index: **`PLAYBOOK-CORPUS.md` (21.1k)** for research/minting/wiring/grading, or
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

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 7.1% of its context before he types a prompt, a
renderer round 6.2%.** Chars ÷ 4 over a 200k-token window, `wc -c` on the files as written for handoff 087.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 20.2k + CORPUS index 21.1k + PLAYBOOK 12.0k + CLAUDE 3.5k | 56.7k | 14.2k | **7.1%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 49.2k | 12.3k | **6.2%** |
| *was, at handoff 086 as written* | *56.1k / 49.0k* | *14.0k / 12.3k* | *7.0% / 6.1%* |

**What moved it:** `HANDOFF.md` 20.0k → 20.2k, carrying the granularity round's narrative at full length in §2 (the
Uzbekistan and India accounts shrank to pointers) and the Poland lane back in §3; `PLAYBOOK-CORPUS.md` 20.6k → 21.1k,
two one-line index entries (the two granularity rulings in §7c, the grader-indent trap in §6). **The technique that holds
the number is unchanged** — §2 carries ONE round's narrative at full length and everything older is a pointer.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k; China worklist 44.5k and method 36.6k, both off the
always-read path and staying there. *(Not re-measured at 087; `playbook/corpus-nodes.md` and `corpus-evidence.md` each
grew this round.)*

## 2. Current state

Corpus **3,666 reports / 3,450 dependencies**, recounted by `npm run validate` on 2026-10-06. **1,413 A · 1,435 B ·
602 C**, A-share 41.0%. **Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**, `tsc --noEmit`
clean, `public/corpus-data.json` regenerated (all 2026-10-06). **963 zero-edge nodes** — recounted as
`grep -c "has no edges in either direction"` over `validate`'s output; it is not a line `validate` prints. NODE URLS
**1,014 bare / 450 zero-edge, 96 index-page, 23 with no url** — the 23 includes three that are deliberate:
Uzbekistan's two classifiers and `cn-labour-force-survey`. Url collisions **86 groups / 224 nodes**
(`scripts/measure-url-collisions.ts`). Recount from the tools, never carry a figure.

**Last round: NODE GRANULARITY, 2026-10-05/06 — CLOSED.** Thomas ruled **(a), ONE NODE PER DOCUMENT**: where the
August 2026 import minted several topic nodes for one document they merge; a topic that is no document has its edges
re-pointed at the documents its evidence names. Why: the V0.11 measurement in `types.ts` — splitting a document
understates it by more than the division. It ran in the six countries with the most url-sharing nodes — Brazil,
Uruguay, Mexico, Korea, China (opened on request; China stays paused), Russia — each dry-run, then written on
Thomas's answers. **Collisions 116 groups / 339 nodes → 86 / 224**, both ends by the same script. **25 nodes merged away**
(Brazil 11, Russia 7, Mexico 4, Uruguay 2, Korea 1 — counted from the slices' `meta.merged` maps), `uy-china-relacion`
retired as a bilateral-relationship framing (3,692 → 3,666 reports), **72 nodes given a new url and one deliberately
left with none** (counted as nodes carrying `_url_original`), every edge on a moved edge's evidence url re-graded.

**THE FINDING THAT SHAPES ANY FURTHER WORK: a shared url is not a duplicate.** In every country most collisions were
distinct documents carrying an index page or a homepage-with-a-path, not topic siblings — Uruguay's 27 colliding nodes
held one merge. **Classify every url group before merging** (merge / url repair / CHECK / leave); merging on url alone
would have fused PeNSE with a PNAD module and a school census with its own synopsis.

**What the merges did to the ranking was real, in both directions.** Concentration lifts: Brazil's *PIB dos
Municípios* went rank 659 → 39 when its 10 city fragments folded in; Uruguay's annual poverty report 2,280 → 55 when its
departmental section did; the CBR Statistical Bulletin 2,021 → 349. **And circularity falls:** each Rosstat *"Appendix
by Subjects"* carried a C-graded "uses data from" edge to its own handbook — containment recorded as a dependency —
and once merged those became self-loops and dropped, so *Transport in Russia* went 2,003 → 3,364 and is now zero-edge.
Mexico's merge removed two duplicate edges that had counted one IGAE boletín twice.

**Two standing rulings came out of it, both in `playbook/corpus-nodes.md`:** one node per document, and **a recurring
node's url is its LATEST EDITION page** (not a series list or a methodology book). A survey MODULE counts as a document
(Thomas, 2026-10-06; `br-ibge-pnad-educacao` got its own 2025 edition page).

**Tools and traps it left.** `scripts/measure-url-collisions.ts` (whole corpus, `SLICE=` to filter) and
`scripts/simulate-merge.ts` (`PLAN=`; dry-runs a merge, drops self-loops / duplicates / `part_of` pairs, counts
**authority** moves >1% — rank is noisy because dozens of nodes share one floor authority and float noise reshuffles a
tied block). **`grade-evidence.ts --write` rewrites a slice at indent 2** — now in `PLAYBOOK-CORPUS.md` §6. Every write
followed one shape: back up the slice to `_to_delete/`, collision-guard the new urls against every live node, write,
`validate`, rule-14 check by hand, re-grade every edge on the moved edges' evidence urls (improvements only). Retired
nodes are kept verbatim in `notes/retired-nodes-2026-10-0*-*.json` and named in each slice's `meta.merged`.

**Host readings, this machine, 2026-10-06 — each one day's truth:** `rosstat.gov.ru` and its regional hosts need
`curl -k`; IBGE and INEGI pages are Cloudflare / JS shells that need the built-in browser pane; INEGI answers 200 for a
missing page (read the title); `kostat.go.kr` now redirects to `mods.go.kr` ("Ministry of Data and Statistics");
`economy.gov.ru` and `www.asv.org.ru` timed out on curl AND the browser pane; **`www.gov.pl` loaded in Chrome with no
prompt** — the 2026-09-11 refusal had decayed.

Per country: `notes/granularity-pilot-br-2026-10-05.md` (with the method), `-uy-`, `-mx-`, `-kr-`, `-cn-2026-10-05.md`,
`-ru-2026-10-06.md`.

**Before it:** Uzbekistan (2026-09-16, closed; `notes/uzbekistan-2026-09-16.md`) and India (2026-09-16, closed;
`notes/india-nss-frames-2026-09-16.md`) — their open follow-ons are §3 items 0b and 0c.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox: `package-lock.json` is on disk; `npm ci --legacy-peer-deps`
is the recipe and it worked again on 2026-09-15.)*

## 3. Todo (live items only)

### [Thomas]

Nothing is waiting on a ruling. *(Every question the granularity round raised was answered 2026-10-05/06.)*

### [Agent]

**In order of value:**

0a. **POLAND — RETURNED 2026-10-06; the blocker is gone.** `https://www.gov.pl/web/finanse` loaded in Chrome with no
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
0b. **UZBEKISTAN follow-ons.** (a) **`standart.uz`, not lex.uz** — the two classifier nodes
   (`uz-oked`, `uz-coicop`) carry no url because Uzbek classifiers are Uzstandard standards rather
   than legal acts; the lex.uz search is done and negative, do not repeat it. (b) **~190 more
   metadata sheets** on stat.uz, same ESMS shape, each naming a methodological parent — ten read so
   far. (c) **A household-budget-survey sheet or weights note** closes `uz-cpi -> the HIES`, refused
   because the CPI sheet names the HIES frame and the weight source in separate sentences and never
   joins them. (d) **COPNI has no node** and is named beside COICOP and COFOG on the
   national-accounts sheet — it would also take an in-edge from ESA 2010. `notes/uzbekistan-2026-09-16.md`.
0c. **INDIA follow-ons, all cheap.** (a) **Four more NADA study pages match no existing node and carry the
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
