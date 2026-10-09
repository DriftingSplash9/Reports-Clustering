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

Last updated: 2026-10-05 (**handoff 086** — the superseded state is
`archive/Previous Handoffs/handoff086.md`, copied and sha256-verified before this rewrite; the archive now
holds 86 files. **86 is not divisible by 5, so no sweep ran; the next full sweep is handoff 090.** No data-changing
round since Uzbekistan, 2026-09-16: this handoff follows a refresh session that recounted the corpus with
`validate` and moved the one cut §1 had been owing since 085 — §3's BPS account — out.)

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

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 7.0% of its context before he types a prompt, a
renderer round 6.1%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 20.0k + CORPUS index 20.6k + PLAYBOOK 12.0k + CLAUDE 3.5k | 56.1k | 14.0k | **7.0%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 49.0k | 12.3k | **6.1%** |
| *was, after the Uzbekistan continuation 2026-09-16 (CLAUDE then 1.5k)* | *57.6k / 50.6k* | *14.4k / 12.6k* | *7.2% / 6.3%* |
| *was, at handoff 085 as written* | *47.4k / 41.1k* | *11.8k / 10.3k* | *5.9% / 5.1%* |

**The number fell 0.2pp, net of two moves.** `HANDOFF.md` went 23.6k → 20.0k (−3.6k chars, −0.45pp) by taking the cut
handoffs 085 and the 09-14 refresh both named as owed: §3's BPS account, which `notes/bps-url-repair-probe-2026-09-15.md`
already carries, with its one live question (node granularity) kept as §3 [Thomas] item 1. `CLAUDE.md` went 1.5k → 3.5k on
2026-09-23 when the twenty truth rules were added to it, and it is in both always-read sets (+2.0k chars, +0.25pp).
**The technique that holds the number is the same two moves as before** — §2 carries ONE round's narrative at full
length and everything older is a pointer, and a stale block is cut rather than out-written.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k; China worklist 44.5k and method 36.6k, both off the
always-read path and staying there.

## 2. Current state

Corpus **3,667 reports / 3,450 dependencies**, recounted by `npm run validate` on 2026-10-06 after the
node-granularity merges in Brazil, Uruguay, Mexico, Korea and Russia (24 nodes merged away, `uy-china-relacion` retired
with its one C edge, 6 Russian self-loops dropped as containment). **1,413 A · 1,435 B · 602 C**, A-share 40.8% (the re-grade of the 10 re-pointed edges moved one B to A).
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`tsc --noEmit` clean, `public/corpus-data.json` regenerated (all 2026-10-05). **963 zero-edge nodes** — recounted
2026-10-06 as `grep -c "has no edges in either direction"` over `validate`'s output. NODE URLS 1,014 bare / 450 zero-edge, **and `no url at all` is 23 — Uzbekistan's two
classifiers (see below) and, since 2026-10-06, `cn-labour-force-survey`, all three deliberate** (recounted 2026-10-06). Recount from `validate`'s own blocks, never carry a figure — the zero-edge number is not a
line `validate` prints.

Last data-changing round is **Uzbekistan, 2026-09-16, TWO PASSES, both CLOSED** —
`uz-uzbekistan-2026-09-16.json` (5 nodes, 5 dependencies, 4 dropped notes) and
`uz-classifications-2026-09-16.json` (1 node, 5 dependencies, 3 dropped notes). **The country went
from 1 node to 7 and from 1 edge to 11.** **The country had ONE node before it**, and that node is `uz-ssc` — the statistical
office itself, carrying `kind: instrument`, i.e. the institution-as-a-node scaffolding the August
import was supposed to strip. It is left alone: it has a live A-graded edge, and retyping a node is
a ruling for Thomas, not a research call.

**THE SEAM, and it is the reusable part: stat.uz publishes ~198 ESMS-SHAPED METADATA SHEETS**, one
per indicator, each naming its methodology and classification. Ten were read across the two passes
and every one paid. **Uzbekistan now hangs off both classification spines** — NACE through
`uz-oked`, UN COICOP through `uz-coicop`, each minted on a sentence stating the derivation outright.
Both use the same two-step shape deliberately: the statistic depends on the NATIONAL classifier and
the national classifier is what derives from the international one, so **nothing is wired straight
from a statistic to a UN or EU standard**. `uz-oked` is already a three-statistic hub.

**TWO NODES HAVE NO URL ON PURPOSE, AND AT TWO IT IS A FINDING: Uzbekistan's statistical classifiers
are named by every metadata sheet and published nowhere reachable.** The first pass named *one
browser session on lex.uz* as this country's top follow-up; **it was done and came back negative** —
in Chrome, `ОКЭД` returns 91 acts that merely mention the classifier and `КИПЦ РУ 2018` returns
nothing. **lex.uz carries acts; Uzbek classifiers are Uzstandard O'z DSt standards, so the lead is
`standart.uz`.** Do not repeat the lex.uz search.

**TWO GRADER LESSONS, both now in `PLAYBOOK-CORPUS.md` §6.** The abbreviation trap bit twice more
and the rule is widened from `Rev.`/`No.`/`Vol.` to **any** abbreviation — and a **`title_aliases`
entry is exactly as vulnerable as the title**, since aliases go through the same `tokenise`. Three
edges in two days on two continents. Separately, **the weak-basis guard caught this project for the
fourth time and it was my own prose**: `uz-national-accounts -> sna-2008` capped at B
`consistent-with` because the basis quoted the forbidden phrase while explaining why it did not
apply. Rewritten, re-graded A; quote and target untouched.

Full account, both passes: `notes/uzbekistan-2026-09-16.md`.

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

1. **Is a survey MODULE a document?** The one granularity question left open by the Brazil merge (ruled (a),
   one node per document, and WRITTEN 2026-10-05): `br-ibge-pnad-educacao` is PNAD Contínua's education module and
   IBGE gives it no page of its own. Same shape as the BPS subsector volumes. Until ruled, module nodes are left
   alone. `notes/granularity-pilot-br-2026-10-05.md`.
1b. **Uruguay, two answers still wanted**: is `uy-presupuesto` the five-year budget law or the annual Rendición de
   Cuentas (decides whether `uy-educacion-salud` merges into it); `uy-ipc` to INE's own title *"Índice de Precios del
   Consumo"*, with a re-grade of its 3 in-edges. `notes/granularity-uy-2026-10-05.md`.
2. **A `www.gov.pl` permission in the Chrome extension**, if the Polish Ministry of Finance layer is wanted. The
   extension refused that domain outright ("Navigation to this domain is not allowed") and no other route in the
   2026-09-11 session reached any Polish host. Without it the Debt Management Strategy, the state budget execution
   report and the Medium-Term Fiscal-Structural Plan stay unresearched. *(Re-probe before believing this —
   `PLAYBOOK.md` truth rule 7; it was true of one machine on one day.)*
3. **Downloads left on your machine.** Six Polish PDFs are in `C:/Users/thoma/Downloads` (`pl-nbp-*` x4,
   `pl-gus-statistical-yearbook-2024.pdf`, `pl-pbssp-2026-amend.pdf`; ~35 MB, confirmed present 2026-10-05). Keep or
   bin them; nothing in the repo points at them.

### [Agent]

**In order of value:**

0. **UZBEKISTAN follow-ons.** (a) **`standart.uz`, not lex.uz** — the two classifier nodes
   (`uz-oked`, `uz-coicop`) carry no url because Uzbek classifiers are Uzstandard standards rather
   than legal acts; the lex.uz search is done and negative, do not repeat it. (b) **~190 more
   metadata sheets** on stat.uz, same ESMS shape, each naming a methodological parent — ten read so
   far. (c) **A household-budget-survey sheet or weights note** closes `uz-cpi -> the HIES`, refused
   this round because the CPI sheet names the HIES frame and the weight source in separate sentences
   and never joins them. (d) **COPNI has no node** and is named beside COICOP and COFOG on the
   national-accounts sheet — it would also take an in-edge from ESA 2010, so it is worth more than
   one country. `notes/uzbekistan-2026-09-16.md`.
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
5. **The node-granularity repair (ruled (a), one node per document, 2026-10-05) — DONE in all six queued countries**
   (Brazil, Uruguay, Mexico, Korea, China, Russia; one note each, `notes/granularity-*-2026-10-0*.md`, method in the
   Brazil pilot note). Corpus-wide url collisions, both ends by `measure-url-collisions.ts`: **116 groups / 339 nodes → 86 / 226**; what remains is by ruling (topic,
   function and institution nodes left) or had no first-party page to find. **Owed, both blocked on THIS machine's route,
   not on the sites:** `ru-med-socio-economic-development-forecast` (`economy.gov.ru`) and `ru-dia-deposit-insurance-agency`
   → its own homepage (`www.asv.org.ru`) — both timed out 2026-10-06 (curl exit 28, browser pane refused); not written
   blind. The next country, if wanted: dry-run with `scripts/measure-url-collisions.ts` + `scripts/simulate-merge.ts`,
   **classify every url group before merging**, write, re-grade.
6. **The orphan stock whose urls are already documents — needs no ruling, nothing blocked.** Recounted
   2026-10-05: **EU 35 zero-edge nodes / 0 bare, Japan 14 / 0, Canada 12 / 0.** Hand-research; the EU row routes
   through `notes/eu-statutes-2026-09-15.md`.

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
