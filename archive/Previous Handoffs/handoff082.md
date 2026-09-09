# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep §1–§3 to state and pointers; §4 is fixed and verbatim.** No changelog, no
round narrative. Finished items LEAVE (§4 step 4); the round's memory entry is their
record. *(This paragraph read "Keep the mutable part (§1–§3) under 10k characters"
until 2026-09-07. That cap was retired by Thomas in §1 on the same day this line was
written, and the two sat contradicting each other for three rounds. The gauge is the
read-cost percentage in §1, not a character count.)*

Last updated: 2026-09-09 (handoff 081 — the superseded state is
`archive/Previous Handoffs/handoff081.md`, copied and sha256-verified before this rewrite. **081 is
divisible by neither 5 nor 20, so no five-handoff review and no slow-layer sweep ran**; both fired
on 080 and their records are `notes/doc-audit-2026-09-09.md` and memory
`round34_and_handoff080_2026-09-09`. The next 5 is 085, the next 20 is 100 — and 100 is also the
first time the archive crosses a new hundred, which is when step 5b owes Thomas the past-sweeps
recap question. Covers **rounds 32-34** (the `sitc` hub and the first DSBB option-E mints) and the
decision session that cleared §3: provincial instruments ruled in, the four orphaned NSO nodes
parked, `MEMORY.md` condensed 63.9 KB → 30.6 KB, and the counts-precedence rule landed in
`PLAYBOOK.md` §2 rule 4. §2/§3 swept: the MEMORY.md item left as done, the toolchain paragraph left
because `PLAYBOOK.md` rule 4 already carries that recipe and a second copy is how the two drift, and
the round-by-round narrative left for memory. **§3 [Thomas] is empty and the live direction is back
to the Chinese provinces.**)

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
| **anything China** (the live programme) | `notes/china-progress.md` — the worklist, rows kept crossed off — then `notes/techniques-cn-yearbooks-2026-09-08.md` |
| fetching / capturing / extracting anything else | `notes/techniques-2026-09-04.md` — recipes and host workarounds. **Every host reading in it is a claim about one machine on one day.** |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first; then the round memory for your bit — `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme's design | `notes/Midvamp - Revamp.md` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md`, `notes/imf-elibrary-2026-09-06.md` (its second addendum corrects the first) |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| a `meta.note` from the August 2026 import | `notes/mint-2026-08-20.md` |
| "what is broken that nobody is fixing?" | `notes/standing-issues.md` — outlived five handoffs; not on the mandatory path |
| editing any doc in the slow layer | `notes/doc-audit-2026-09-09.md` (handoff-080 sweep, and the cadence answer) — format and worked example in `notes/doc-audit-2026-09-07.md` |
| **editing §2/§3 mid-round** | nothing — that is not a handoff and needs no archive; §4 below has the one-line test |
| **writing a handoff** | `notes/handoff-procedure.md` — the full §4 procedure, moved there 2026-09-09 |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Project instructions and memory are summaries written outside the repo: **where either disagrees
with a file, the file wins.**

### Read cost — the bloat gauge, refreshed every handoff

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-09, handoff 081): a corpus round reads 5.8% of its
context before he types a prompt, a renderer round 5.3%.** Chars ÷ 4 over a 200k-token window,
measured with `wc -c` after this rewrite.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 16.0k + CORPUS index 17.3k + PLAYBOOK 11.5k + CLAUDE 1.5k | 46.3k | 11.6k | **5.8%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 42.4k | 10.6k | **5.3%** |
| *was, handoff 080* | *46.2k / 42.4k* | *11.5k / 10.6k* | *5.8% / 5.3%* |
| *was, handoff 079* | *48.2k / 45.1k* | *12.0k / 11.3k* | *6.0% / 5.6%* |

**Flat on 080, and the flatness is the finding.** `HANDOFF.md` came down again, 17.1k → 16.0k, on a
docs-only handoff with every §3 [Thomas] item ruled out — and `PLAYBOOK.md` went 10.3k → 11.5k
because the counts-precedence rule landed in it. **The saving moved rather than accrued.** That is
the right trade and not a regression: a rule that binds every task belongs in the always-read layer,
and it replaced a recurring defect class. But it is worth naming, because "the handoff shrank" on
its own would have read as progress that did not happen.

**Watch whether the five `playbook/` files stay closed unless their question arrives.** Measured
twice: round 31 opened two of five and missed nothing; rounds 32-34 opened `corpus-nodes.md` only.
On-demand sizes, 2026-09-09: naming 15.3k, evidence 10.9k, **nodes 9.2k** *(up from 7.6k — it
absorbed the parked-NSO ruling, which is the right home for it)*, route 7.1k, hosts 5.7k, handoff
procedure 9.5k, standing-issues 7.9k, **China worklist 20.6k** — still the fastest-growing file in
the repo and still bigger than any `playbook/` file. It wants splitting into worklist and method the
way `PLAYBOOK-CORPUS.md` was, and the CN rounds now resuming are what will decide that.

**A programme's files are routed by task and were never on the mandatory path**, so retiring one
frees almost nothing from the headline number — China costs ~2.4k of §2/§3 prose plus ~0.3k of
index lines, about 0.3pp, and *that* is what a retirement sweep collects. Retire for tidiness, do
not book a saving that is not there.

## 2. Current state

Corpus **3,606 reports / 3,196 dependencies**. **1,183 A · 1,402 B · 611 C**, A-share 37.0%.
**Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **35**,
2026-09-09. **974 nodes still have zero edges** — CN is 29 of them.

**These numbers are THE count.** Thomas ruled 2026-09-09 that §2 supersedes any figure in any other
file, without argument — see `PLAYBOOK.md` §2 rule 4 for the rule and its two consequences.

**The live programme is CHINA and Thomas has just returned to it.** State lives in
`notes/china-progress.md`, not here — it is the worklist, rows kept crossed off, with each bureau's
real host and a dated probe. Score: **3 provinces wired and fully mined** (Jiangsu, Guangdong,
Shandong), **7 with a node but no edges**, **22 with no node at all**; **3 of 10 cities wired**
(Nanjing, Wuhan, Xi'an), 1 read-and-empty, 1 IP-blocked, 5 open. Five rounds in, 28 edges, every
one A. The route is the **per-chapter 简要说明**, not the 编者说明.

**Round 35 corrected the method again, and the correction is the round's real output.** Shandong
gave one A edge (`-> cn-nbs-wage-reporting-system`, chapter 4) and **Henan is IP-blocked on all
three routes** — cloud, device VM, and Chrome serving a block page that names the IP; the Shenzhen
shape, sub-paths included. The correction: **the "open 建筑业 and 农业 first" shortcut is not
reliable.** Both are agency-level in Shandong and name no instrument; its productive chapters were
就业工资 and 批发零售/住宿餐饮 instead. **Sweep all ~25 chapter notes and grep for 《 — one small
fetch each — rather than starting from the two-chapter rule.** The sweep is what found the round's
best citation and both appendix leads; two targeted fetches would have returned nothing. Detail and
a fifth physical SHAPE (image tables, text-PDF chapter notes, image 编辑说明 — so "the yearbook is
scanned" says nothing about its notes) are in `notes/china-progress.md`.

**Other threads, one line each; narrative is in project memory:**

- **DSBB option E — a live worklist, ~15 pairs left**, demoted to `notes/standing-issues.md`, which
  carries the corrected size (~20 strong pairs of 684, not the 70–135 a 60-pair sample predicted).
  Worklist `Claude outputs/dsbb-pilot-2026-09-09/e-slice-tier1.json`, all 684 SoM texts cached
  beside it. Rounds 32-34 are its record; scoping is `notes/dsbb-som-750-scoping-2026-09-09.md`.
- **FR — live, four rounds in, 21 nodes from 9.** The GNI-inventory method is exhausted for this
  edition; the live method is a third document naming a target by title. The Note de conjoncture's
  employment, enterprise, prices and international articles are unread against it.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains (7 non-government
  sources), a scope question before an evidence one.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — PARKED, ruled 2026-09-09.** Not duplicates, not to be
  retired, not to be re-hunted; rule and reasoning in `playbook/corpus-nodes.md`. `iq-cso`'s
  separate possible-duplicate question stays open and parking does not settle it.

## 3. Todo (live items only)

### [Thomas]

**Nothing open.** Everything raised through handoff 080 is ruled: provincial-bureau instruments are
nodes, the four orphaned NSO nodes are parked, `MEMORY.md` is condensed, DSBB went D then E, `sitc`
was minted, and the counts-precedence rule is in `PLAYBOOK.md` §2 rule 4.

### [Agent]

**Your round: the minting run — Hunan, Hubei, Fujian, Yunnan, Xinjiang, Jilin, Hainan, Tibet.**
All eight answered a probe and have no node, so these rounds mint and wire in one pass. Shandong and
Henan are DONE as of round 35 (one A edge, and Henan recorded blocked). **`notes/china-progress.md`
first** — it is the worklist, it carries the corrected method, and **a single failed fetch is not a
verdict there: retry, and change machine, before recording a host as blocked.** Then
`notes/techniques-cn-yearbooks-2026-09-08.md`.

**Sweep EVERY chapter note and grep for 《 — do not start from 建筑业 and 农业.** Round 35 proved
that shortcut unreliable: both were agency-level in Shandong, and its real citations were in
就业工资 and the trade chapter. The notes are one small fetch each. **And check the notes' format
separately from the tables** — Shandong's tables are all `.jpg` scans while its notes are text PDFs,
so a scanned yearbook can still be fully readable where it matters (`pdffonts` on one note settles
it in a second).

**Working order that pays: cloud container → local VM curl → Chrome.** Round 35 needed all three
to establish Henan's block, and the cloud container alone did all of Shandong.

**Two standing leads got stronger in round 35 and are worth a targeted hunt.**
《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》 are now named by a THIRD independent
yearbook (national, Guangdong, Shandong) and still have no NBS page — round 30's article-id probe
(1962929-1962952) did not reach them. And 《中国统计摘要》 now has an edition year and a publisher
attached (《中国统计摘要 2025》, 中国统计出版社) rather than a bare title.

**Two traps that will recur in a minting run**, both learned the hard way in rounds 33-34: a
country the corpus has never carried needs **THREE registry entries** — `CONTINENT_OF` in
`regions.ts`, plus `COUNTRY_FAMILY` and the display-name map in `palette.ts` — and **nothing errors
if you forget**, the node just falls back to 'International' and loses its colour family; and
`jurisdiction_level` has no `national`, it is **`federal`** for a national publisher. (Neither
applies to CN itself, which is long since registered — they apply the moment a round mints a
country that is new to the corpus.)

**Shaanxi provincial instruments — the ruling is made, the research is not.** Provincial-bureau
methodology instruments ARE nodes; the class is open, do not re-raise it per province. The bar is
unchanged: a node needs its own page on the issuing bureau's site, the way round 31's three NBS
instruments came off their own `stats.gov.cn` pages. **Nobody has yet looked for Xi'an's two
Shaanxi instruments on the Shaanxi bureau's site.** If those pages do not exist the two edges park
for want of a source. Shaanxi still has no node of any kind.

**Five CN cities still open**, each with a concrete next step on its tracker row — Guangzhou
(Chrome-only, yearbook behind a zTree JS viewer a synthetic click did not fire), Hangzhou, Chengdu,
Chongqing, Beijing. **Suzhou is read-and-empty, not unread** — do not re-fetch it against this
edition. **Shenzhen is IP-blocked at the WAF by address**, not by user-agent; nothing to retry.

**When China pauses: option E, then FR.** E's remaining pairs each need their publisher's own page
found — Bahamas' three trade products, Guatemala's *Boletín Estadístico*, Sri Lanka's *CBSL Annual
Report*, Zimbabwe's three RBZ/ZIMSTAT products, Barbados' *Report of the Accountant General*,
Tajikistan's national-accounts annual. Malaysia and Tanzania are dropped for host reasons and are
re-openable.

**Settled, do not re-raise:** the CN/TW/JP/KR re-grade sweep (Thomas 2026-09-08: *"that's a lot of
time for B/C's. forget that."*); a first-party zip is a direct read, not a capped route; a table
NOTE naming an instrument by title IS a citation and grades A, but a table ROW alone is not; a
target title broken across a two-column line break in all three pdftotext readings still grades A;
bulk-diffing stored quotes against cached windows (~60% false positives from the cache's own
last-run-wins structure). Also refused with reasons recorded in the data or the `playbook/` files:
the COICOP edges for Morocco/Tunisia/Iraq, the e-GDDS wiring todo (all 34 countries), India's NSDP,
the GFSR, the ICLS class, the non-ASCII-hyphen sweep, DGDDI's monthly bulletin, the stale-cache B
sweep, Korea's and Estonia's NSDP, the null-ComplianceDate class, the DE round-2 EVS / Bundesbank /
BaFin refusals. A country carrying both a REGISTER and a SELF-DECLARED tier edge keeps both — no
dedupe pass.

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
state and pointers, sweep out what is finished, run the five-handoff review if NNN is divisible
by 5 and the slow-layer sweep if divisible by 20, refresh §1's read-cost table, and write the
round's story to project memory.

**Never run git, never state git status, never tell Thomas to commit** — that is `PLAYBOOK.md`
rule 1 and it binds every task, not just this one.
