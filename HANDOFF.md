# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep §1–§3 to state and pointers; §4 is fixed and verbatim.** No changelog, no
round narrative. Finished items LEAVE (§4 step 4); the round's memory entry is their
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

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 6.3% of its context before he types a prompt, a
renderer round 5.5%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 17.4k + CORPUS index 19.8k + PLAYBOOK 11.5k + CLAUDE 1.5k | 50.1k | 12.5k | **6.3%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 43.9k | 11.0k | **5.5%** |
| *was, at handoff 085 as written* | *47.4k / 41.1k* | *11.8k / 10.3k* | *5.9% / 5.1%* |
| *was, at handoff 084 (+ rounds 43-45's mid-round edits)* | *64.1k / 49.9k* | *16.0k / 12.5k* | *8.0% / 6.2%* |
| *was, at handoff 084 as written* | *58.5k / 46.5k* | *14.6k / 11.6k* | *7.3% / 5.8%* |

**Refreshed mid-round 2026-09-11**, not at a handoff: the Poland round's §2/§3 rewrite took this file from 14.6k to 17.4k (+0.4pp on the corpus gauge), most of it §3's Poland leads and the routing finding behind them. Handoff 086 should judge whether those stay. **Handoff 085 took `HANDOFF.md` from 23.3k to 13.7k — the largest single sweep this file has had, and
0.4pp below where handoff 084 left it rather than merely undoing the drift.** Almost all of it is
China: seventeen rounds of live state became one paragraph and two pointers the moment Thomas paused
the programme, which is `PLAYBOOK.md` §1's second test working exactly as intended — §2's weight
follows the lane being worked, and China is no longer one. The five-handoff review (step 5) removed
three more paragraphs by demoting them to `notes/standing-issues.md`. `PLAYBOOK-CORPUS.md` is 28.0k
and is now **twice** this file; **it is the largest always-read file by a wide margin and nothing
sweeps a playbook** — its §2 is where the next cut has to come from, and that had been true for four
handoffs running — **and the diagnosis was wrong every time.** Measured 2026-09-11: §2 was 27% of the file
and **§6+§7, which are supposed to be INDEXES, were 62%**; 17 bullets of 73 carried 37% of it. Restructured
the same day on Thomas's word: those 17 went to `playbook/` as one line each, the duplicated `_dropped` pair
merged, rule 19's essay moved, the ledger paragraphs cut. **27.6k → 19.5k, and the file is no longer twice
`HANDOFF.md`.** The rule that stops it regrowing — **an index line is one line, schema block excepted** — is
§0 of that file now, because the 2026-09-09 split had no such rule and the index filled straight back up.
Account: `notes/doc-audit-2026-09-11.md`.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k (+2.0k this handoff, by design); China
worklist 44.5k and method 36.6k, both off the always-read path and staying there.

## 2. Current state

Corpus **3,679 reports / 3,360 dependencies**. **1,322 A · 1,426 B · 612 C**, A-share 39.3%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`tsc --noEmit` clean, `public/corpus-data.json` regenerated and copied back. Last data-changing
round is **Poland, 2026-09-11** (`src/data/research/pl-poland-2026-09-11.json` — 27 nodes, 31
dependencies, 1 relation). **970 zero-edge nodes, unchanged by that round** — every node it minted
is wired. Recount from `validate`'s ISOLATED block, never carry the figure.

**Not re-run this round, and the reason is not the corpus:** `grade-evidence --selftest` and
`vite build` both need `npm install`, and **the npm registry answered 403 to every package this
session** (org egress policy — `zustand`, `tsx`, `typescript`, `@types/node` all refused). The
generator, the logic tests and the data checks ran on the container's *globally* installed `tsx`,
and `tsc --noEmit` ran natively on the bridge VM off the repo's own Windows `node_modules`. The
Poland change is JSON-only and `gen-slices` emits no TypeScript, so neither unrun check could have
been affected by it — but the next round that touches code must get a real install first.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox: `package-lock.json` is on disk; `npm ci --legacy-peer-deps` is
the recipe when the registry is reachable, which it was not on 2026-09-11.)*

### CHINA IS FINISHED AND PAUSED (Thomas, 2026-09-10: *"we are done with china now"*)

**Do not open a China round without being asked.** Seventeen rounds, 29-45. The state that matters:
the provincial run, the two-layer sweep, the publisher hunt and the instrument catalogues are all
**closed**, and what is left is written down in one place — **`notes/china-progress.md`** for where every
province and city got to, **`notes/china-method-2026-09-09.md`** for the portals and traps. Both are
off the always-read path and stay there. Rounds 43-45 are in project memory. The only live CN leads
worth naming here, because they are cheap and would otherwise be lost: **eight ministry publications
the national yearbook names under 本篇的资料来源, each one edge away, all blocked on an unreachable
publisher host** (moe / mca / cdpf / nppa / mct return 000, acftu 412) — their quotes are already read
and in `evidence-cache/`, so Chrome or a different network finishes them. **Beijing, Hangzhou, Chengdu,
Chongqing, Hebei, Guangxi and Jiangxi are dead on every route tried** across three rounds; Hainan is
dropped, Henan and Shenzhen are IP-blocked, Xizang publishes no yearbook. **Do not re-probe that set as
a batch without a new route.**

### THE NEXT PLACE — a coverage read, done 2026-09-10 at Thomas's request

Full workbook: **`Claude outputs/corpus-coverage-by-country-2026-09-10.xlsx`** (200 rows, ties to §2).
**There are two different kinds of thin and they need opposite work.**

**A — UNWIRED DEPTH. The nodes exist; nobody has read the documents that connect them.** This is the
August 2026 bulk import, and it is the highest yield per hour in the corpus because minting is already
done. Ranked by recoverable stock (zero-edge nodes): **Egypt 51 of 60 · Taiwan 50 of 109 · India 37 of
98 · Singapore 30 of 38 · Iran 28 of 29 · Bolivia 25 · Vietnam 25 · Chile 23 · Paraguay 23 · Ethiopia
21 · Guyana 21 · Ecuador 19 · Venezuela 18 · Thailand 18.** **Iran is the extreme case — 29 nodes and
TWO edges, 0.07 per node, the most unwired country in the corpus and never given a round.** Egypt is
the largest stock and already carries a standing issue (its IPI compiler is unverified).

**B — UNEXPLORED. Real economies the corpus barely represents**, needing a minting run first and so
slower: **Ukraine 2 nodes · Qatar 2 · Serbia 2 · Bangladesh 3 · Lebanon 3 · Azerbaijan 3 · Nepal 3 ·
Cambodia 3 · Mongolia 3 · Pakistan 4 · Malaysia 4 · Switzerland 4.** Eight countries have nodes and
**zero** edges of any kind: Seychelles, Eritrea, Liberia, Cuba, Turkmenistan, Nauru, Tuvalu, Nicaragua.

**The trap in reading that workbook, and it is worth stating before anyone acts on it: a low node count
is not neglect.** The EU-27 members look thin — Poland 8 nodes, Spain 8, Italy 10 — and have **zero**
orphans between them, because the EU-chain rounds wired every node they minted. Narrow and complete is
a finished job. Taiwan's 109 nodes with 50 orphans is the opposite. **Rank by orphan COUNT and edges
per node, not by node count.**

**[Thomas] Which of the two classes do you want first when you come back?** A is faster and deepens
what exists; B widens the map but starts from nothing. The workbook's "Where to go next" sheet is
ordered for A.

## 3. Todo (live items only)

### [Thomas]

1. **The A-or-B question in §2's coverage read** — still open; Poland was worked on 2026-09-11
   ahead of it, on a direct instruction, and turned out to be neither class cleanly (see below).
2. **A `www.gov.pl` permission in the Chrome extension**, if the Polish Ministry of Finance layer
   is wanted. The extension refuses that domain outright ("Navigation to this domain is not
   allowed") and no other route in this session reaches any Polish host — the container's egress
   proxy answers 403 to CONNECT for all of them and the bridge VM has no network at all. Without
   it the Debt Management Strategy, the state budget execution report and the Medium-Term
   Fiscal-Structural Plan stay unresearched.
3. **Downloads left on your machine.** Six Polish PDFs are in `C:\Users\thoma\Downloads` from
   this round (`pl-nbp-*`, `pl-gus-statistical-yearbook-2024.pdf`, `pl-pbssp-2026-amend.pdf`,
   ~34 MB). Keep or bin them as you like; nothing in the repo points at them.

### [Agent]

**Poland, 2026-09-11 — what is left one page away, in order of value:**

1. **GUS's own title for its foreign-trade release.** NBP's balance-of-payments methodological
   notes name the largest single input to the Polish current account — *"The main source of data
   on goods in the Polish balance of payments is Foreign Trade Statistics (FTS) compiled by the
   Statistics Poland on the basis of INTRASTAT declarations…"* — but "Foreign Trade Statistics"
   is NBP's name for it, not GUS's, and a node must carry the publisher's own title. `stat.gov.pl`'s
   English foreign-trade pages redirected to `new.stat.gov.pl` mid-session and the release title was
   never read. One verified title mints the node and takes an A edge with it.
2. **PKWiU 2015's upstream.** The Statistical Yearbook says only "compiled on the basis of
   international classifications and nomenclatures". The real target is almost certainly `cpa`,
   which is already a node; the PKWiU introducing regulation (Dz.U. 2015 poz. 1676) is where it
   would be stated.
3. **NBP's IIP and external-debt series** are described in the same methodological notes as the
   balance of payments and were not minted — deliberately, to avoid three sibling nodes sharing
   one document's edges. They are real and the evidence is already read.

Standing, and none of it needs a round of its own:

- **`notes/standing-issues.md`** carries everything that outlived five handoffs — **FR** (four
  rounds in, paused, the live method recorded), **DE** (finished as a programme; only a Chapter
  10.3 scope question remains, which is a ruling not research) and the **DSBB option E** worklist
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
routine is retired), refresh §1's read-cost table, and write the round's story to project memory.

**Never run git, never state git status, never tell Thomas to commit** — that is `PLAYBOOK.md`
rule 1 and it binds every task, not just this one.
