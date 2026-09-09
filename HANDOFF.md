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

**§2 and §3 were rewritten mid-round on 2026-09-09 by round 37, which is an ordinary §2/§3 edit and
not a handoff** (§4 has the test). The header below still names handoff 082 because that is the last
rewrite that WAS one; §1's read-cost table was refreshed at the same time and says why.

Last updated: 2026-09-09 (handoff 082 — the superseded state is
`archive/Previous Handoffs/handoff082.md`, copied and sha256-verified before this rewrite. **82 is
divisible by neither 5 nor 20, so no review ran**; both fired on 080 (`notes/doc-audit-2026-09-09.md`).
Next 5 is 085; **next 20 is 100, which is also the first archive crossing of a hundred** and the only
condition that triggers step 5b's past-sweeps recap question. Covers **rounds 35-36**: Shandong wired,
Henan found IP-blocked, Hunan minted and wired off a bare-IP host, Fujian found unextractable. §2/§3
swept — the round-35 narrative left for memory and §2 now carries only the two method lessons that
change what the next round DOES. §3 [Thomas] is still empty; direction unchanged, finish the CN
minting run.)

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
| **anything China** (the live programme) | `notes/china-progress.md` (23.0k) — the worklist, rows kept crossed off. **Split 2026-09-09**: the method moved to `notes/china-method-2026-09-09.md` (19.0k) — portals, the redirect lesson, the yearbook shapes, the extraction traps — and you open it when you are about to fetch, not to see where a round got to. Recipes underneath both: `notes/techniques-cn-yearbooks-2026-09-08.md` |
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

**THE NUMBER THOMAS ASKED FOR: a corpus round reads 7.3% of its context before he types a prompt, a
renderer round 6.1%.** Chars ÷ 4 over a 200k-token window, `wc -c` after the edit that changed it.

| | chars | tokens | % |
|---|---|---|---|
| always: HANDOFF 22.5k + CORPUS index 22.9k + PLAYBOOK 11.5k + CLAUDE 1.5k | 58.4k | 14.6k | **7.3%** |
| always: HANDOFF + RENDER 13.6k + PLAYBOOK + CLAUDE | 49.1k | 12.3k | **6.1%** |
| *was, after round 38* | *57.3k / 49.2k* | *14.3k / 12.3k* | *7.2% / 6.2%* |
| *was, after round 37* | *50.9k / 46.2k* | *12.7k / 11.6k* | *6.4% / 5.8%* |
| *was, handoffs 081-082* | *46.3k / 42.6k* | *11.6k / 10.6k* | *5.8% / 5.3%* |

**Up 0.1pp across round 39, and the composition is the story: `HANDOFF.md` fell 22.7k → 22.5k while
`PLAYBOOK-CORPUS.md` rose 21.7k → 22.9k.** That is handoff 081's pattern exactly — **the saving
moved rather than accrued** — and it is the worse direction, because `HANDOFF.md` gets swept every
handoff and **nothing sweeps a playbook** (`PLAYBOOK.md` §1). `PLAYBOOK-CORPUS.md` is now the
LARGER of the two and has never been swept; its §2 is the only part of the 2026-09-09 restructure
that stayed prose instead of becoming an index, and it is where the next cut goes. Up 0.8pp across
rounds 37-38 before this; this section's own commentary was 1.8k of that and was cut back to the
table and this paragraph. Keep it this short. **Two things
worth carrying forward.** `PLAYBOOK-CORPUS.md` is 21.7k and **nothing sweeps a playbook**
(`PLAYBOOK.md` §1) — it is the file to watch now, and its §2 is the only part of the 2026-09-09
restructure that stayed prose instead of becoming an index. And **splitting or retiring a file that
is already routed by task buys this number nothing**: the 37.6k `notes/china-progress.md` split cost
a round's work and moved the gauge by zero, correctly. Only cutting an always-read file counts.

**`notes/china-progress.md` IS SPLIT (round 38)** — 37.6k → a **23.0k worklist** (tables, scores,
probe columns, parked leads) plus **19.0k `notes/china-method-2026-09-09.md`** (portals, the redirect
lesson, the yearbook shapes, the extraction traps). Nothing reworded. One rule left China entirely,
per `PLAYBOOK.md` §1's check for rules binding a different task: *a small body is a redirect — read
it* is now a `PLAYBOOK-CORPUS.md` §6 line.

**Watch whether the five `playbook/` files stay closed unless their question arrives.** Measured
three times now: round 31 opened two of five and missed nothing; rounds 32-34 opened `corpus-nodes.md`
only; rounds 35-37 opened one of five — round 37 opened `corpus-nodes.md` only, to mint against §7c, and
ran on the tracker and the techniques note otherwise. On-demand sizes, 2026-09-09: naming 15.3k,
evidence 10.9k, nodes 9.2k, route 7.1k, hosts 5.7k, handoff procedure 9.5k, standing-issues 7.9k,
**China worklist 37.6k**.

**A programme's files are routed by task and were never on the mandatory path**, so retiring one
frees almost nothing from the headline number — China costs ~2.4k of §2/§3 prose plus ~0.3k of
index lines, about 0.3pp, and *that* is what a retirement sweep collects. Retire for tidiness, do
not book a saving that is not there.

## 2. Current state

Corpus **3,616 reports / 3,211 dependencies**. **1,198 A · 1,402 B · 611 C**, A-share 37.3%.
**Domains: 46 approved, 0 proposed.** **`validate` exits 0.** **128/128 logic tests**,
`grade-evidence --selftest` **76/76**, `tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back. Last data-changing round is **39**,
2026-09-09. **974 nodes have zero edges** — CN is 29 of them, both counted from the data this round.

**These numbers are THE count.** §2 supersedes any figure in any other file, without argument —
`PLAYBOOK.md` §2 rule 4.

**SHANGHAI IS WIRED — 5 edges, all A, and it is the richest provincial yearbook in eleven rounds.**
23 chapter 简要说明 plus 主要统计指标解释, 214 readable note pages, eight NBS instruments named by
title. It had a node since the August 2026 import and nobody had opened it. Wired to GB/T 4754,
劳动工资统计报表制度, 统计上大中小微型企业划分办法, 建筑业统计报表制度 and 关于市场主体统计分类的划分规定
— the last off item 八 of the 编者说明, which is the strongest citation that hub has (Yunnan's came
from one table note; Shanghai's governs the whole book and then lists which categories moved).
Provinces now **8 wired · 7 node-but-unwired · 15 no node · 2 blocked**.

**Round 39's three findings, cheapest first.**

1. **A UNIFORM SMALL BODY ACROSS A BATCH IS ONE RESPONSE YOU HAVE NOT READ.** All 216 of Shanghai's
   note pages came back at exactly 1085 bytes — the site's 404 page, served with HTTP 200. The
   publisher's own TOC links `zbhtml/C0001.htm`; the server serves only `ZBHTML/C0001.htm`. **The
   path is case-sensitive and the publisher gets its own case wrong.** This is round 37's
   small-body lesson at scale, and it was nearly walked past because 216 files arriving looks like
   success. Sort by size before extracting.
2. **AUTHORSHIP INSIDE THE SENTENCE DECIDES THE TARGET, NOT THE TITLE.** Shanghai names four
   instruments whose titles match live NBS nodes exactly, and says 国家统计局制定的 for two and
   **上海市统计局制定的** for the other two. Those two are Shanghai's own instruments wearing NBS's
   titles; they are `_dropped` as `wrong-target` and are mint leads under the provincial-instrument
   ruling. This is the 农业产值 look-alike trap in its hardest form — there the titles differed, here
   they are identical and only the issuer separates them, so nothing about the title can catch it.
3. **A MIS-DECLARED CHARSET THE GUARD SURVIVES BY ACCIDENT.** Every Shanghai page declares gb2312 and
   is served UTF-8 with an HTTP header saying so; `decodeDeclared()` reads the META and ignores the
   header. It gets the right answer only because gb18030 decodes almost any bytes into mojibake with
   ZERO U+FFFD, so it loses the strict `<` tie-break and UTF-8 is returned. Verified against the real
   bytes; all five edges graded A. **Nothing changed — recorded because it passes for a reason nobody
   designed**, and a page that decodes into *plausible* legacy text would win that comparison.

**A NEW VALIDATOR GUARD, AND ROUND 39 EARNED IT THE HARD WAY.** The five Shanghai edges were first
written with the `_dropped` note's key names — `source`/`target` instead of
`source_report_id`/`target_report_id`. The loader dropped all five into `dangling`, printed them as
five lines of **`undefined->undefined`** under the heading *"edges pointing at reports not yet
researched"*, and **`validate` exited 0**. `assembleCorpus.ts` now separates a **malformed edge**
(missing an endpoint FIELD) from a **dangling edge** (naming a report that does not exist yet): the
first is an error naming which field is missing, the second stays the informational note it always
was, because research ahead of its node is normal and a malformed edge never resolves by waiting.
Proved against three cases — the exact mistake, a half-missing edge, and a well-formed edge naming a
non-existent node, which correctly stayed a note. *(This is the mirror image of the `_dropped` shape
Thomas ruled on the same day: the two shapes are one character apart and the corpus has now been
bitten in both directions.)*

**The other five node-but-unwired divisions were re-probed in Thomas's own Chrome and gave nothing.**
Zhejiang, Sichuan, Guizhou and Chongqing fail in Chrome as well as to curl. **Beijing is the one with
a real finding: its yearbook is on a SEPARATE HOSTNAME** —
`/tjsj_31433/tjnj_31441/bjtjnj_31442/` redirects to
`https://nj.tjj.beijing.gov.cn/nj/main/2025-tjnj/zk/indexch.htm`, the standard frameset shape. Chrome
resolved the redirect and then that host timed out twice; the container gets 503 over http. **The
path is known and is not the problem** — retry the `nj.` host another day.

**Other threads, one line each; narrative is in project memory:**

- **DSBB option E — a live worklist, ~15 pairs left**, in `notes/standing-issues.md` with the
  corrected size (~20 strong pairs of 684). Worklist
  `Claude outputs/dsbb-pilot-2026-09-09/e-slice-tier1.json`, all 684 SoM texts cached beside it.
- **FR — live, four rounds in, 21 nodes from 9.** GNI-inventory method exhausted for this edition;
  the live method is a third document naming a target by title. The Note de conjoncture's
  employment, enterprise, prices and international articles are unread against it.
- **DE — finished as a programme**, 13 → 46 nodes. Only Chapter 10.3 remains, a scope question.
- **`iq-cso`/`ye-cso`/`sy-cbs`/`sd-cbs` — PARKED, ruled 2026-09-09.** Not duplicates, not to be
  retired, not to be re-hunted; rule in `playbook/corpus-nodes.md`. `iq-cso`'s separate
  possible-duplicate question stays open.

## 3. Todo (live items only)

### [Thomas]

**Empty.**

### [Agent]

**The CN seam that was "six provinces whose notes have never been swept" turned out to be one
reachable province and five that are not.** Shanghai was the one and it is done. What is left:

1. **Beijing, on the `nj.` host** — the only unfinished node-but-unwired division with a live,
   specific lead. `https://nj.tjj.beijing.gov.cn/nj/main/2025-tjnj/zk/indexch.htm`, frameset shape,
   timed out twice on 2026-09-09. One retry on another day; the path is not in question.
2. **Zhejiang, Sichuan, Guizhou, Chongqing — three routes each, nothing.** Do not re-probe these
   as a batch again without a new route to try; the container, the device VM and Chrome have now all
   been spent on them.
3. **Hainan** — bureau site has no yearbook; the PROVINCIAL GOVERNMENT portal carries a 统计年鉴
   listing at `https://www.hainan.gov.cn/hainan/tjnj/list3.shtml`, unreachable from all three
   machines on 2026-09-09. One retry, then drop it.
4. **The 15 nodeless provinces**, yield curve flattened. Hebei (74M), Anhui (61M), Guangxi (50M) and
   Jiangxi (45M) are the only ones worth a targeted look.

**Two Shanghai leads that are cheap and were opened by this round.**

- **Shanghai's OWN 《固定资产投资统计报表制度》 and 《房地产开发统计报表制度》** — named by title in the
  yearbook, attributed to 上海市统计局, and nobody has looked for their pages on `tjj.sh.gov.cn`.
  Provincial-bureau instruments ARE nodes, so this is a mint away from two more edges off citations
  the corpus already holds.
- **《批发和零售业统计报表制度》 and 《住宿和餐饮业统计报表制度》 now have FOUR independent yearbooks
  naming them** — national, Guangdong, Shandong and Shanghai — and still no NBS landing page. The
  case for hunting an older year's 统计制度 listing is much stronger than when it was two.

**Round 38's follow-ups, still open.**

- **Sweep the zb layer of every OTHER yearbook that has one.** The national yearbook had 27 unread
  chapter notes beside the 29 that had been read for nine rounds. Nobody has checked whether
  Shandong, Xi'an, Suzhou or Fujian publish a second layer. `left.htm`'s href list answers it in one
  fetch. **Shanghai is a second data point for the general form of this**: its notes were not where
  the file naming suggested either.
- **`zb10.pdf` and `zb27.pdf` of the national yearbook are unread** — a corrupt xref and a 404.
- **《关于工资总额组成的规定》 is named by two independent yearbooks** (national zb04, Jilin zbjs4) and
  has no node; strongest of the eight non-NBS instruments the zb layer named.

**Table notes are still underswept.** Yunnan and Shanghai's chapter notes have been read; only
Yunnan's 注： lines have. Shanghai has 558 table pages and its C0101 table note names a municipal
provider in the first one read, so the seam is real and unsampled.

**Three standing CN leads, unchanged.** 《中国统计摘要》 has an edition year, a publisher and a
citation saying a yearbook takes DATA from it; four yearbooks name it, still no NBS page.
《批发和零售业》/《住宿和餐饮业》 are above. **Shaanxi provincial instruments** — the ruling is made,
the research is not: nobody has looked for Xi'an's two Shaanxi instruments on the Shaanxi bureau's
site, and Shanghai's two are now the same class of job.

**Five CN cities still open** — Guangzhou (Chrome-only, zTree JS viewer), Hangzhou, Chengdu,
Chongqing, Beijing. **Suzhou is read-and-empty, not unread. Shenzhen and Henan are IP-blocked** at
the WAF by address, not user-agent; nothing to retry on either.

**When China pauses: option E, then FR.** E's remaining pairs each need their publisher's own page
found — Bahamas' three trade products, Guatemala's *Boletín Estadístico*, Sri Lanka's *CBSL Annual
Report*, Zimbabwe's three RBZ/ZIMSTAT products, Barbados' *Report of the Accountant General*,
Tajikistan's national-accounts annual.

**Settled, do not re-raise:** the `_dropped` third shape — **the validator reads both spellings as
of 2026-09-09 and the 17 files are NOT to be rewritten** (Thomas ruled the guard should learn it);
write new notes in `source`/`target` all the same. The CN/TW/JP/KR re-grade sweep (Thomas
2026-09-08: *"that's a lot of time for B/C's. forget that."*); a first-party zip is a direct read,
not a capped route; a table NOTE naming an instrument by title IS a citation and grades A, but a
table ROW alone is not; a target title broken across a two-column line break in all three pdftotext
readings still grades A; bulk-diffing stored quotes against cached windows (~60% false positives).
**Round 37-39 additions:** Yunnan names no industrial-classification EDITION — the ordinary §7a
refusal, recorded `no-document`, do not re-mint; a bare 《三次产业划分规定》 with no year stays unwired
because NBS publishes two candidate pages — refused for Jilin and again for the national yearbook's
zb03, **settled twice, no third look**; Xizang publishes no yearbook at all and its 统计年鉴 link is a
commented-out template placeholder; **Shanghai's bare 《国际收支手册》 does not reach `imf-bpm6`** —
named by title and publisher with no edition, the generic-COICOP refusal again. Also refused with
reasons in the data or the `playbook/` files: the COICOP edges for Morocco/Tunisia/Iraq, the e-GDDS
wiring todo (all 34 countries), India's NSDP, the GFSR, the ICLS class, the non-ASCII-hyphen sweep,
DGDDI's monthly bulletin, the stale-cache B sweep, Korea's and Estonia's NSDP, the
null-ComplianceDate class, the DE round-2 EVS / Bundesbank / BaFin refusals. A country carrying both
a REGISTER and a SELF-DECLARED tier edge keeps both.

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
