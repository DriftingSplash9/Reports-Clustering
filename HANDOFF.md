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

Last updated: 2026-09-10 (**handoff 085** — the superseded state is
`archive/Previous Handoffs/handoff085.md`, copied and sha256-verified before this rewrite; the archive now
holds 85 files. **85 is divisible by 5, so BOTH sweeps ran** — 5a's findings are in §1's read-cost paragraph
and in `notes/standing-issues.md`, 5b's in `notes/doc-audit-2026-09-10.md`. **The cadence changed mid-handoff:**
Thomas ruled 2026-09-10 that the slow layer is swept on the 5's with everything else and the 20's routine is
retired, so 5b ran here rather than waiting for 100. **Next full sweep: handoff 090.** Written after round 45,
with China closed at Thomas's word.)

---

## 1. Read next

**This is the project's only read order.** `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block point
here. **Restructured 2026-09-09** (Thomas: *"just have one handoff that says where to go if doing
such and such a thing… this way the whole lot doesn't need taken in"*): what follows is a router,
not a reading list. Read the ALWAYS set, then open exactly the rows your task lights up.

### Always — this file, then these two

| file | k | why |
|---|---|---|
| `PLAYBOOK.md` | 9.5k | the rules that bind every task whatever it is; its §1 routes you to one lane |
| `CLAUDE.md` | 1.5k | read automatically by a local Claude Code session |

Then ONE lane index: **`PLAYBOOK-CORPUS.md` (16.6k)** for research/minting/wiring/grading, or
**`PLAYBOOK-RENDER.md` (13.6k)** for the renderer. Each is now an index plus the rules that bind
every change in that lane.

### Then, routed by what you are actually doing

| doing | read |
|---|---|
| **wiring an ordinary edge off a clean fetch** | **nothing more.** `PLAYBOOK-CORPUS.md` §2 and its schema traps are the whole binding set |
| deciding whether a document NAMES the target | `playbook/corpus-naming.md` (§7a) — the most-cited section in the lane |
| writing a quote, grading, or a grade surprised you | `playbook/corpus-evidence.md` (§6) |
| MINTING a node, or re-opening a settled question | `playbook/corpus-nodes.md` (§7c, §7d) |
| the bytes came by an unusual route (browser, archive, token, zip) | `playbook/corpus-route.md` (§7b) |
| a fetch failed, or a host looks blocked | `playbook/corpus-hosts.md` (§6) — and re-probe, never believe a stored verdict |
| **anything China** — **CLOSED AND PAUSED, do not open without being asked** | `notes/china-progress.md` (44.5k, where every province and city got to) and `notes/china-method-2026-09-09.md` (36.6k, portals and traps). Recipes underneath: `notes/techniques-cn-yearbooks-2026-09-08.md` |
| fetching / capturing / extracting anything else | `notes/techniques-2026-09-04.md` — recipes and host workarounds. **Every host reading in it is a claim about one machine on one day.** |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first; then the round memory for your bit — `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme's design | `notes/Midvamp - Revamp.md` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md`, `notes/imf-elibrary-2026-09-06.md` (its second addendum corrects the first) |
| **"which country next?" / the orphan backlog, or ANY url-repair work** | `notes/node-url-audit-2026-09-15.md` — why the coverage workbook's ranking inverts, and the 1,041 bare-homepage node urls behind it — then `notes/bps-url-repair-probe-2026-09-15.md`, the one-host proof: the Chrome-only route, and the duplicate-node finding that changes what a repair means |
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
renderer round 6.5%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 22.6k + CORPUS index 20.6k + PLAYBOOK 12.0k + CLAUDE 1.5k | 56.6k | 14.2k | **7.1%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 49.6k | 12.4k | **6.2%** |
| *was, after the India round 2026-09-16* | *55.8k / 48.8k* | *14.0k / 12.2k* | *7.0% / 6.1%* |
| *was, end of 2026-09-15 (EU statute round + audit + url repair)* | *55.5k / 48.9k* | *13.9k / 12.2k* | *6.9% / 6.1%* |
| *was, mid-round 2026-09-15 before the Poland cut* | *58.1k / 51.7k* | *14.5k / 12.9k* | *7.3% / 6.5%* |
| *was, at the 2026-09-14 mid-round refresh* | *53.7k / 47.1k* | *13.4k / 11.8k* | *6.7% / 5.9%* |
| *was, mid-round 2026-09-11 (Poland)* | *50.1k / 43.9k* | *12.5k / 11.0k* | *6.3% / 5.5%* |
| *was, at handoff 085 as written* | *47.4k / 41.1k* | *11.8k / 10.3k* | *5.9% / 5.1%* |
| *was, at handoff 084 (+ rounds 43-45's mid-round edits)* | *64.1k / 49.9k* | *16.0k / 12.5k* | *8.0% / 6.2%* |

**Refreshed 2026-09-16 after two research rounds in one day (India, then Uzbekistan): 7.0% → 7.1%,
and the file is 22.6k against the 13.7k handoff 085 left.** Two rounds cost +1.0k net, which is the
cheapest two-round day this file has had — because each round's narrative was written INTO §2 and
the previous round's was cut back to a result and a pointer the moment its notes file existed. The
India block is now five lines and a link; the Uzbekistan block will get the same treatment next
round. **That rotation is the whole technique and it is worth stating: §2 carries one round's
narrative at full length, everything older is a pointer.**

**Earlier the same day:** the EU statute round, the ECOICOP audit and the url repair took it 7.3% →
6.9%, the first fall since handoff 085, entirely because **§3's Poland block was finally cut** to
`notes/standing-issues.md` — the move this paragraph had named in two consecutive rounds without
making. Three rounds of writing tighter did not offset one stale block; cutting the stale block did.
**Next candidate when one is needed: §3 [Thomas] item 1, the BPS account, which is closed work whose
method note already carries it.**

**Refreshed mid-round 2026-09-14**, not at a handoff, and **it went the wrong way again**: the EU
classification-and-statute round took `HANDOFF.md` from 17.4k to 20.6k (+0.4pp on the corpus
gauge; the second pass added 0.9k of correction, removed 0.6k of closed todo, and put 0.2k into
`PLAYBOOK-CORPUS.md` §6 — **the first addition to that file since its 2026-09-11 restructure, and
its add-and-remove account is in `playbook/corpus-hosts.md` where the reasoning went**), on top of Poland's +0.4pp — **the file is now 2.9k above where handoff 085 left it and
climbing one round at a time, which is the pattern handoff 085 was written to break.** Handoff 086
should cut, and the specific candidate is named rather than left as a feeling: **§3's Poland block
is four paragraphs describing work nobody has resumed in three rounds and belongs in
`notes/standing-issues.md`**, which is exactly where the 085 sweep sent three other paragraphs. The
EU block in §2 is the ACTIVE lane and `PLAYBOOK.md` §1's second test says §2's weight should follow
it, so that one stays until the lane moves.

**Earlier account, unchanged:** handoff 085 took this file from 23.3k to 13.7k, almost all of it
China — seventeen rounds of live state became one paragraph and two pointers the moment Thomas
paused the programme. `PLAYBOOK-CORPUS.md` was restructured 2026-09-11 from 27.6k to 19.5k after a
measurement showed §6+§7, which are supposed to be INDEXES, were 62% of it; the rule that stops it
regrowing — **an index line is one line, schema block excepted** — is §0 of that file now.
Account: `notes/doc-audit-2026-09-11.md`.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k (+2.0k this handoff, by design); China
worklist 44.5k and method 36.6k, both off the always-read path and staying there.

## 2. Current state

Corpus **3,691 reports / 3,456 dependencies**. **1,408 A · 1,436 B · 612 C**, A-share 40.7%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`tsc --noEmit` clean, `public/corpus-data.json` regenerated and copied back. **967 zero-edge nodes,
unchanged — all five new nodes have edges.** NODE URLS 1,014 bare / 450 zero-edge, **and `no url at
all` is 20 → 21, which is deliberate** (see below). Recount from `validate`'s own blocks, never
carry a figure — the zero-edge number is not a line `validate` prints, it is
`grep -c "has no edges in either direction"` over its output.

Last data-changing round is **Uzbekistan, first round, 2026-09-16, now CLOSED**
(`src/data/research/uz-uzbekistan-2026-09-16.json` — 5 nodes, 5 dependencies, 4 dropped notes;
3 A, 2 B). **The country had ONE node before it**, and that node is `uz-ssc` — the statistical
office itself, carrying `kind: instrument`, i.e. the institution-as-a-node scaffolding the August
import was supposed to strip. It is left alone: it has a live A-graded edge, and retyping a node is
a ruling for Thomas, not a research call.

**THE SEAM, and it is the reusable part: stat.uz publishes ~198 ESMS-SHAPED METADATA SHEETS**, one
per indicator, with a common governance preamble and then numbered indicator-specific sections that
name the methodology and the classification. Eight were read; every one named a methodological
parent. **The edge worth having is `uz-oked -> nace-rev2`** — Uzbekistan's national activity
classifier is stated by its own office to be based on NACE Rev. 2, independently in four sheets,
which attaches Uzbekistan to the EU classification spine the same way Poland's PKD 2007 does.
`uz-employment` and `uz-ppi` hang off OKED rather than NACE directly, because the statistics use the
national classifier and the national classifier is what is derived.

**ONE NODE HAS NO URL ON PURPOSE.** `uz-oked` is well evidenced and unpublished — no page on stat.uz
carries the classifier and lex.uz renders its search in JavaScript. An empty field was chosen over
another publisher's page or a bare homepage, which are the two defects the last three rounds have
been cleaning up. **`lex.uz` needs a browser and is the highest-value follow-up for this country.**

**THE WEAK-BASIS GUARD CAUGHT THIS PROJECT FOR THE FOURTH TIME**, and it was my own prose:
`uz-national-accounts -> sna-2008` capped at B `consistent-with` because the basis quoted the
forbidden phrase verbatim while explaining why it did not apply. Rewritten, re-graded A. The quote
and the target were never touched. `PLAYBOOK-CORPUS.md` §6 already warns that the guard reads the
prose and not the argument.

**BEFORE IT, INDIA (2026-09-16, closed).** 1 node, 10 dependencies, 3 dropped notes; three orphans
un-orphaned. Thomas doubted India had value and was half right: of its 37 zero-edge nodes **28
carry a bare publisher homepage**, so that layer is the August import's url-and-granularity defect,
not research. The value was in the NSS sampling-frame seam on `microdata.gov.in` — **eight edges off
four fetches**. Two findings outlived the round and are already rules or todo items: a `000` on a
`.gov.in` host may be a **certificate chain, not a wall** (now `PLAYBOOK-CORPUS.md` §6), and the
August import recorded at least one edge **backwards** (§3 [Agent] item 1). `www.mospi.gov.in` is a
JavaScript SPA and needs the browser. Full account: `notes/india-nss-frames-2026-09-16.md`.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox: `package-lock.json` is on disk; `npm ci --legacy-peer-deps`
is the recipe and it worked again on 2026-09-15.)*

## 3. Todo (live items only)

### [Thomas]

1. **BPS IS CLOSED; THE PASS IS NOT WORTH REPEATING BLIND.** Thomas chose **(a)** and both
   passes are written — **27 of 61 repaired, and that is the ceiling for this host.** The second
   pass is the one worth knowing about: searching harder converted 5 more nodes and
   **reclassified 13 downward**, because a search returning several sibling volumes means the
   node is a TOPIC, not that the keywords were wrong (`id-national-accounts` and `id-pdrb` each
   span a *Menurut Pengeluaran* and a *Menurut Lapangan Usaha* edition; `id-producer-prices`
   exists only as three subsector volumes). **The yield curve on a host turns negative fast.**
   What is left at BPS is **9 collisions and 18 topic nodes** — 1 of 3 of the host — and both are
   the same job: **the August 2026 import minted several topic nodes per document**, already
   visible corpus-wide as **114 non-bare urls held by 2+ nodes across 335 nodes** (`ru-russia`
   72, `uy-uruguay` 27, `br-brazil` 17, `mx-mexico` 15; worst single url 21 nodes). **The url is
   the symptom; the node granularity is the defect** — unscoped, waiting on nobody.
   Method, the two search lessons and the collision guard: `notes/bps-url-repair-probe-2026-09-15.md`.
   Per-node verdicts: `Claude outputs/bps-url-repair-2026-09-15/candidates.json`.
2. **Meanwhile, the work that needs no ruling** is the stock whose urls are already documents:
   **EU 35 orphans / 0 bare, Japan 14 / 0, Canada 12 / 0** — hand-researched, nothing blocked.
3. **A `www.gov.pl` permission in the Chrome extension**, if the Polish Ministry of Finance layer
   is wanted. The extension refuses that domain outright ("Navigation to this domain is not
   allowed") and no other route in this session reaches any Polish host — the container's egress
   proxy answers 403 to CONNECT for all of them and the bridge VM has no network at all. Without
   it the Debt Management Strategy, the state budget execution report and the Medium-Term
   Fiscal-Structural Plan stay unresearched.
4. **Downloads left on your machine.** Six Polish PDFs are in `C:\Users\thoma\Downloads` from
   this round (`pl-nbp-*`, `pl-gus-statistical-yearbook-2024.pdf`, `pl-pbssp-2026-amend.pdf`,
   ~34 MB). Keep or bin them as you like; nothing in the repo points at them.

### [Agent]

**In order of value:**

0. **UZBEKISTAN follow-ons — the country went from 1 node to 6 and the seam is barely touched.**
   (a) **190 more metadata sheets** on stat.uz, same ESMS shape, each naming a methodological
   parent. (b) **COICOP Rep. of Uzb. 2018** is named by the GDP-by-expenditure sheet and both
   `un-coicop-2018` and `eu-ecoicop` are in the corpus — the cleanest remaining edge, same shape as
   OKED to NACE. (c) **The HIES and the 2010 Microcensus**, named by the CPI sheet as its weight
   source and frame — the same frame-chain seam India paid out on. (d) **`lex.uz` needs a browser**,
   and it is what blocks OKED's url, the Law "On Official Statistics" 2021, and every Uzbek legal
   instrument the sheets name. One browser session is the highest-value follow-up.
   `notes/uzbekistan-2026-09-16.md`.
0. **INDIA follow-ons, all cheap, all opened by the 2026-09-16 round.** (a) **Four more NADA study
   pages match no existing node and carry the same frame sentence** — Time Use Survey (catalog 236),
   the education and telecom modular surveys (255, 239), participation in education (300). One fetch
   each, `curl -k`. (b) **NIC-2008 has no node** and both the IIP and ASI cite it; only NIC-2025
   exists, which is the wrong target. Needs MoSPI's own page, so it needs the browser. (c) **The
   Sixth Economic Census** is named by ASUSE as its rural stratification source and has no node.
   (d) **`mahades.maharashtra.gov.in` is readable with `-k`** — five orphan nodes nobody has tried
   since the host was wrongly recorded as a DNS failure. Method and catalog ids:
   `notes/india-nss-frames-2026-09-16.md`.
1. **Grep the August 2026 import for instrument-as-dependent pairs.** The India round found
   `in-collection-of-statistics-act-2008 -> in-mospi-asi` recorded backwards — the Act depending on
   the survey it authorises — and found it by accident while working something else. If the import
   did it once it may have done it at scale, and a wrong-direction edge is invisible to every check
   the validator runs. One pass over `_dropped` and live edges whose target is `kind: instrument`.
2. **Czechia and Albania** still lack the `eurostat-hicp` feed edge. Both ESMS pages were read in
   full: neither carries a country-specific transmission sentence, only the all-NSI boilerplate.
   They need the NSI's own page, the way Sweden's came off SCB's. Not blocked, just not done.
3. **Romania's IAPC node.** The 2026-08-28 blocker has decayed and the replacement is not what it
   expected: **the cloud container cannot reach `insse.ro` at all** (agent proxy closes the tunnel,
   curl exit 35) while **Thomas's Chrome renders it first try**. Two guessed paths for the IAPC's
   own page 404'd, so it needs someone to find the right page — the host is no longer the obstacle.
4. **NUTS**, unchanged: Regulation (EC) No 1059/2003 is fetched and read and deliberately NOT
   minted, because nothing in the corpus yet names NUTS as its own basis. A regional-statistics
   round opens it with one CELLAR fetch.
5. **The corpus-wide node-granularity defect** is the through-line of the last three rounds and is
   still unscoped: **114 non-bare urls held by 2+ nodes across 335 nodes** (`ru-russia` 72,
   `uy-uruguay` 27; worst single url 21 nodes). The url is the symptom, the granularity is the
   defect, and it is waiting on a ruling rather than on research.

Standing, and none of it needs a round of its own:

- **`notes/standing-issues.md`** carries everything that outlived five handoffs — **FR** (four
  rounds in, paused, the live method recorded), **DE** (finished as a programme; only a Chapter
  10.3 scope question remains, which is a ruling not research), the **DSBB option E** worklist
  pointer (~15 pairs, each needing its publisher's page), and **POLAND's three leads, moved there
  2026-09-15** — the cut §1's read-cost paragraph had been asking for since handoff 085. They
  return here when the `gov.pl` permission exists.
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
