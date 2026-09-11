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
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Project instructions and memory are summaries written outside the repo: **where either disagrees
with a file, the file wins.**

### Read cost — the bloat gauge, refreshed every handoff

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 6.9% of its context before he types a prompt, a
renderer round 5.0%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 13.7k + CORPUS index 28.2k + PLAYBOOK 11.5k + CLAUDE 1.5k | 54.9k | 13.7k | **6.9%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 40.3k | 10.1k | **5.0%** |
| *was, at handoff 084 (+ rounds 43-45's mid-round edits)* | *64.1k / 49.9k* | *16.0k / 12.5k* | *8.0% / 6.2%* |
| *was, at handoff 084 as written* | *58.5k / 46.5k* | *14.6k / 11.6k* | *7.3% / 5.8%* |

**Handoff 085 took `HANDOFF.md` from 23.3k to 13.7k — the largest single sweep this file has had, and
0.4pp below where handoff 084 left it rather than merely undoing the drift.** Almost all of it is
China: seventeen rounds of live state became one paragraph and two pointers the moment Thomas paused
the programme, which is `PLAYBOOK.md` §1's second test working exactly as intended — §2's weight
follows the lane being worked, and China is no longer one. The five-handoff review (step 5) removed
three more paragraphs by demoting them to `notes/standing-issues.md`. `PLAYBOOK-CORPUS.md` is 28.0k
and is now **twice** this file; **it is the largest always-read file by a wide margin and nothing
sweeps a playbook** — its §2 is where the next cut has to come from, and that has been true for four
handoffs running. **The 5b sweep added 0.2k to it even after its correction histories were moved to
`notes/doc-audit-2026-09-10.md`** — that split is now a rule in the procedure, because at every-five a
sweep that shows its working in place is itself a growth driver on the file it is meant to protect.

**On-demand sizes, 2026-09-10:** `playbook/` naming 15.3k, evidence 10.9k, nodes 9.2k, route 7.1k,
hosts 5.7k; handoff procedure 9.5k; standing-issues 9.9k (+2.0k this handoff, by design); China
worklist 44.5k and method 36.6k, both off the always-read path and staying there.

## 2. Current state

Corpus **3,652 reports / 3,329 dependencies**. **1,298 A · 1,419 B · 612 C**, A-share 39.0%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **45**,
2026-09-10. **970 zero-edge nodes** — recount from `validate`'s ISOLATED block, never carry the figure.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4. *(Sandbox: `package-lock.json` is on disk, `npm ci --legacy-peer-deps` installs clean.)*

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

1. **The A-or-B question above.**

### [Agent]

**Nothing is queued. China is closed and the next programme is Thomas's call.** When it is made, the
work starts from the workbook's shortlist and `notes/triage-2026-08-30`-style scoping, not from here.

Standing, and none of it needs a round of its own:

- **`notes/standing-issues.md`** carries everything that outlived five handoffs — and gained three
  entries in this handoff's review: **FR** (four rounds in, paused, the live method recorded), **DE**
  (finished as a programme; only a Chapter 10.3 scope question remains, which is a ruling not research)
  and the **DSBB option E** worklist pointer (~15 pairs, each needing its publisher's page).
- **`iq-cso` / `ye-cso` / `sy-cbs` / `sd-cbs` stay PARKED** — the rule is in `playbook/corpus-nodes.md`
  and the §2 line restating it was deleted by this review. `iq-cso`'s possible-duplicate question is
  open in `notes/standing-issues.md`, not here.

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
