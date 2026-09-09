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

Last updated: 2026-09-09 (handoff 079 — the superseded state is
`archive/Previous Handoffs/handoff079.md`, copied and sha256-verified before this rewrite. Covers
**round 31**: the Wuhan and Xi'an city yearbooks wired, three NBS instrument nodes minted, Suzhou
read-and-empty and Shenzhen IP-blocked, and round 30's "编者说明 route" corrected to 1-for-4. 079 is
divisible by neither 5 nor 20, so **no five-handoff review and no slow-layer sweep ran** this time;
the next 5 is 080 and the next 20 is 080 — **both fall on the very next handoff.** §2/§3 were swept:
the router-report and doc-split narrative left for memory, and the three-machines paragraph left
because `notes/china-progress.md` already carries it.)

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

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-09, handoff 080): a corpus round reads 5.8% of its
context before he types a prompt, a renderer round 5.3%.** Chars ÷ 4 over a 200k-token window,
measured with `wc -c` after this rewrite.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 17.1k + CORPUS index 17.3k + PLAYBOOK 10.3k + CLAUDE 1.5k | 46.2k | 11.5k | **5.8%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 42.4k | 10.6k | **5.3%** |
| *was, handoff 079* | *48.2k / 45.1k* | *12.0k / 11.3k* | *6.0% / 5.6%* |
| *was, handoff 078* | *44.3k / 41.3k* | *11.1k / 10.3k* | *5.5% / 5.2%* |

**079 asked whether 080 could come in under its 20.6k. It could not, and the honest number is that
this file peaked at 28.2k mid-round before being swept back to 17.4k here.** Three research rounds
(32, 33, 34) and four rulings landed between the two handoffs, and every one of them arrived in §3
as prose. The sweep took it below 079 rather than merely back to it — but the peak is the real
reading: **§3 is where this file grows, and it grows fastest when Thomas is answering questions.**
The defence is step 4, not restraint while writing.

**Watch instead whether the five `playbook/` files stay closed unless their question arrives.**
Measured twice now: round 31 opened two of five and missed nothing; rounds 32-34 opened
`corpus-nodes.md` only. On-demand sizes, 2026-09-09: naming 15.3k, evidence 10.9k, nodes 7.6k,
route 7.1k, hosts 5.7k, handoff procedure 9.5k, **China worklist 20.6k** — still the
fastest-growing file in the repo and still bigger than any `playbook/` file. It wants splitting
into worklist and method the way `PLAYBOOK-CORPUS.md` was.

**A programme's files are routed by task and were never on the mandatory path**, so retiring one
frees almost nothing from the headline number — China costs ~2.4k of §2/§3 prose plus ~0.3k of
index lines, about 0.3pp, and *that* is what a retirement sweep collects. Retire for tidiness, do
not book a saving that is not there.

## 2. Current state

Corpus **3,606 reports / 3,195 dependencies**. **1,182 A · 1,402 B · 611 C**, A-share 37.0%.
**Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **34**,
2026-09-09. **974 nodes still have zero edges** — CN is 29 of them.

**Three data rounds landed 2026-09-09, all validated in a cloud sandbox and sha256-verified onto
disk.** Round 32: the generic edition-less `sitc` hub + 2 A edges off CSY ch.11 and Jiangsu ch.8.
Rounds 33-34: the first **DSBB option-E** mints — 5 nodes, each on a publication the IMF's Summary
of Methodology NAMES and the publisher's own site CONFIRMS (`dm-national-accounts`,
`vc-digest-of-statistics`, `kg-national-accounts`, `az-national-accounts`,
`md-international-accounts`), 5 A edges, 4 candidates dropped for HOST reasons. Narrative:
memory `round32_sitc_and_e_slice_2026-09-09`, `round33_dsbb_e_eastern_caribbean_2026-09-09`,
`round34` section of the same. Scoping: `notes/dsbb-som-750-scoping-2026-09-09.md`.

**THE TOOLCHAIN DOES NOT RUN ON THE DEVICE.** `npx tsx` dies in the device VM — the repo's
`node_modules` is a Windows install and hits `@esbuild/win32-x64` vs `linux-x64`. Validate in a
cloud sandbox: tar **only** `src scripts package.json package-lock.json tsconfig.json
vite.config.ts index.html START-HERE.md` (≈3 MB) into `tmp_work/`, stage that one file, `npm
install` there, run, then commit results back by `fileUuid` and `sha256sum` both copies. Tarring
the repo root instead produces 118 MB. Reusable payload: `tmp_work/validate-payload-2026-09-09.tgz`.

**The live programme is CHINA, and it has not moved since round 31.** State in
`notes/china-progress.md`, not here: 2 provinces wired and mined (Jiangsu, Guangdong), 8 with a
node but no edges, 22 with no node; 3 of 10 cities wired, 1 read-and-empty, 1 IP-blocked, 5 open.
The per-chapter 简要说明 is the route, not the 编者说明.

**Other threads, one line each; narrative is in project memory:**

- **DSBB option E — live worklist, ~15 pairs left.** Demoted to `notes/standing-issues.md`, which
  carries the corrected size (~20 strong pairs of 684, not the 70–135 a sample predicted).
  Worklist `Claude outputs/dsbb-pilot-2026-09-09/e-slice-tier1.json`; all 684 SoMs cached beside it.
- **FR — live, four rounds in, 21 nodes from 9.** GNI-inventory method exhausted for this edition;
  the live method is a third document naming a target by title. The Note de conjoncture's
  public-finance and international articles are unchecked.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains (7 non-government
  sources), a scope question before an evidence one.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — parked, awaiting Thomas (§3).**

## 3. Todo (live items only)

### [Thomas]

**1. `MEMORY.md` is now DUE — you deferred it to "after handoff 080" and this is 080.** Two things
in one session: the missing index lines (round 31 never got one, and rounds 32-34 have none either,
so four topic files are findable only by name), and a condense pass. The file is 64KB of dense
prose including Chinese, the tool requires resending it whole, and recent entries run ~1.5k each
against a header that asks for one-line hooks under ~150 chars. It wants to be its own session, not
a tail end. Nothing else in this handoff depends on it.

**2. Stop writing live counts into the slow layer?** All three defects the handoff-080 sweep found
were the same species — a count typed into prose that the corpus then moved past (`172 edges are
stamped` → 286; `101 of 3,071 edges` → 3,195; the DSBB entry still described as parked). None was a
broken pointer or a drifted rule. Proposed rule: **a slow-layer file may name a count only as a
dated observation with the command that produced it, or not at all.** That would make this class
mechanically impossible and force the next 5b to look for something else. Detail and the evidence
behind the cadence answer: `notes/doc-audit-2026-09-09.md`.

**3. Park the four orphaned NSO nodes, or keep hunting?** `iq-cso`, `ye-cso`, `sy-cbs`, `sd-cbs`
are **not** duplicates and should not be retired — the institutional node and a country's
publication nodes are designed to coexist, and `af-nsia` proves the shape works when some OTHER
report names the stats office as its source. The 2026-09-08 pass checked Iraq's, Yemen's and
Sudan's own non-NSO reports and found no general sourcing statement anywhere. Recommendation:
**park them as legitimate-but-currently-unwireable**. Say park and it stops being re-read.
(`ir-sci` is unrelated — already-ruled null-ComplianceDate class.) Carried unanswered since 079.

### [Agent]

**Your round: Shandong and Henan.** Both have nodes and no edges — pure wiring, no minting.
Shandong answers over http; Henan's 403 smells like a WAF. `notes/china-progress.md` first: it is
the worklist, it carries the corrected method, and **a single failed fetch is not a verdict there —
retry, and change machine, before recording a host as blocked.** Then
`notes/techniques-cn-yearbooks-2026-09-08.md`. Go to the per-chapter 简要说明 and open 建筑业 and
农业 first: both have named an NBS 统计报表制度 by title in every yearbook checked. After that the
minting run — Hunan, Hubei, Fujian, Yunnan, Xinjiang, Jilin, Hainan, Tibet all answered and have no
node, so those rounds mint and wire in one pass.

**Shaanxi provincial instruments — the ruling is made, the research is not.** Provincial-bureau
methodology instruments ARE nodes (Thomas, 2026-09-09); the class is open, do not re-raise per
province. The bar is unchanged: a node needs its own page on the issuing bureau's site, the way
round 31's three NBS instruments came off their own `stats.gov.cn` pages. Nobody has yet looked for
Xi'an's two Shaanxi instruments on the Shaanxi bureau's site. If the pages do not exist the two
edges park for want of a source. Shaanxi still has no node of any kind.

**Continuing option E.** ~15 pairs left on the tier-1 worklist, each needing its publisher's own
page found — Bahamas' three trade products, Guatemala's *Boletín Estadístico*, Sri Lanka's *CBSL
Annual Report*, Zimbabwe's three RBZ/ZIMSTAT products, Barbados' *Report of the Accountant
General*, Tajikistan's national-accounts annual. **Two lessons from rounds 33-34 that will recur:**
a country the corpus has never carried needs THREE registry entries (`COUNTRY_TO_REGION` in
`regions.ts`, plus `COUNTRY_FAMILY` and the display-name map in `palette.ts`) and nothing errors if
you forget — the node silently falls back to 'International'; and `jurisdiction_level` has no
`national`, it is **`federal`** for a national publisher.

**Five CN cities still open**, each with a concrete next step on its tracker row — Guangzhou
(Chrome-only, zTree JS viewer), Hangzhou, Chengdu, Chongqing, Beijing. **Suzhou is read-and-empty,
not unread.** **Shenzhen is IP-blocked at the WAF by address**, not user-agent.

**Settled, do not re-raise:** the CN/TW/JP/KR re-grade sweep (Thomas 2026-09-08: *"that's a lot of
time for B/C's. forget that."*); a first-party zip is a direct read, not a capped route; a table
NOTE naming an instrument by title IS a citation and grades A, but a table ROW alone is not; a
target title broken across a two-column line break in all three pdftotext readings still grades A;
bulk-diffing stored quotes against cached windows (~60% false positives). Also refused with reasons
recorded in the data or the `playbook/` files: the COICOP edges for Morocco/Tunisia/Iraq, the
e-GDDS wiring todo (all 34 countries), India's NSDP, the GFSR, the ICLS class, the non-ASCII-hyphen
sweep, DGDDI's monthly bulletin, the stale-cache B sweep, Korea's and Estonia's NSDP, the
null-ComplianceDate class, the DE round-2 EVS / Bundesbank / BaFin refusals. A country carrying
both a REGISTER and a SELF-DECLARED tier edge keeps both — no dedupe pass.

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
