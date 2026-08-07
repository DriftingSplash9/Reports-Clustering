# G.22.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 (fixed) — read in full 2026-08-04 and
relied on directly. Research.2.md v2.1 and Research.EU.md v0.1 not opened;
G.20 finding 1's account of them is used at one remove, unchanged from G.21.
Predecessor: G.21.md (2026-08-04).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order, before doing anything:

1. **`Research.1.md`** (project root) — the standing research brief. Evidence
   standard, Part A record format, slice JSON schema, the two traps
   ("comparable with" is not a dependency; a past-tense clause can describe a
   dead arrangement), and the existing node-id list. Not negotiable, and not
   summarised accurately anywhere else.
2. **This file**, in full — the current state of the EU branch.
3. **The three Part A records**, which are the branch's actual research output:
   - `EU/SEC05_PartA_2026-08-04.md` — Section V, 19 records. The format exemplar.
   - `EU/AnnexXI_PartA_2026-08-05.md` — the salary-update chain, 12 records.
   - `EU/SEC250_PartA_2026-08-05.md` — MFF heading 7 and the nomenclature, 3
     records.
4. **`EU/slices/README.md`** — folder layout for EU data. Its schema blocker is
   resolved; the section is kept with the original text in a `<details>` block.
5. `REPORTS.md` (project root) only if the *direction* is in question.

Then say what the branch is doing and what is next. The answer to "what is next"
lives in *Thomas's stated priority for the remaining work*, below.

**Corrections to how this file has been read, all still live.** (1) The branch is
not two unrelated bodies of work; G.20 finding 3 showed both strands are
instruction-following. **Before concluding something here is stray, check whether
a brief asked for it.** (2) The `.docx` files are all machine-readable and always
were. (3) All eleven `SEC*.pdf` are present and directly extractable with
`pypdf`; older hand-offs saying otherwise are wrong (G.21 correction 6).

**Where things are, as of 2026-08-05:**

- `EU/` — this branch. `SEC00.pdf`–`SEC10.pdf`, the `G.*` logs and their `.json`
  sidecars, the governing briefs as `.docx`, `Soft Connections.docx`,
  `EU Meta jsons.docx`, `PartB_soft_connections_2026-08-04.md`, and the three
  Part A records listed above (two new this session).
- `EU/slices/` — where verified EU graph data lands. **Still nothing verified or
  imported.** This is the branch's oldest unmoved fact, and finding 4 explains
  why it is about to stop being blocked.
- Project root — `REPORTS.md`, `START-HERE.md`, `BACKLOG.md`, `EXPANSION-V1.md`,
  `Research.1.md`, `README.md`.
- `TODO LISTS/rolling-todo.md` — cross-session working queue.

**Network access works, with one important exception.** `curl` and `WebFetch`
both reach `commission.europa.eu`, `parlament.gv.at` and ordinary hosts.
**`eur-lex.europa.eu` is anti-bot gated to every client available here** — it
answers HTTP 202 with a zero-byte body, on both the `legal-content` and
`budget/data` paths, for both `curl` (with a browser user-agent) and `WebFetch`.
A 202-empty is *not* a 404 and proves nothing about content. Anything needing
EUR-Lex needs a browser, or a mirror — national parliament document registers
work well and are official.

## Session conditions — read this first

Session type: **extraction and retrieval.** Three source documents opened, two of
them from the open web for the first time in this branch's history — every
previous session worked only from files already on disk.

What was read, and how much of each:

- **`COM(2025) 736 final`** (10 pp, via the Austrian Parliament's EU document
  register) — **read in full.** Source of finding 1.
- **`SEC(2026) 250`** (539 pp) — **read in part, deliberately.** Opened to answer
  one question; heading 7 and s. 3.1 read closely, the other ~533 pages not read.
  Source of finding 2.
- `G.21.md`, `EU/SEC05_PartA_2026-08-04.md` — read in full (both written by the
  predecessor session).

What was **not** done:

- **Annex XI itself was never read.** EUR-Lex is gated (above). Everything this
  file says about what Annex XI *requires* comes from `COM(2025) 736` describing
  it, at one remove, and is marked so in the record. **Article 1(4), which lists
  the ten Member States in the Specific Indicator sample, is unread**, and it is
  exactly the provision that would settle finding 1's open limb.
- **No `SEC*.pdf` retrieval URL was verified.** The pattern is identified with
  high confidence (finding 3) and could not be fetched.
- **No node was proposed and no edge was verified.** 15 new Part A records; no
  slice written, nothing imported, corpus unchanged at 133 reports /
  213 dependencies (`npm run check` and `npm run validate` both clean).
- **SEC06 and SEC07 were not extracted** — priority A2 did not move. The session
  spent itself on the two cheap checks at the top of G.21's list, which were
  correctly ranked and paid off.
- **The blob was not touched**, for the third session running.
- **The D-item merge was not performed**, for the third session running.

## Headline result

**The EU behaves like Canada and the US, and that was the one result nobody
expected.**

`EU/slices/README.md` frames this branch's purpose plainly: the Canada/US graph
found **zero standard-compliant direct official cross-border edges**, and the EU
is supposed to be the opposite case, because its instruments are Regulations
rather than standards countries opt into. Cheap check 1 followed one such chain
to its end — the salary-update mechanism that sets three chapters of every
institution's budget — and found that **the supranational layer names its own
outputs with full titles and dates, and names its national inputs only by
institution.** Three separate `AGENCY ONLY`s at the national boundary: "the
Belgian and Luxembourgish authorities", "the ten Member States referred to in
Article 1(4) of Annex XI", "the national statistical bodies".

That is the same shape the Canada/US pair was measured to have.

**One chain is not an answer to that question**, ESA 2010's Annex B remains the
better test and is still unread, and the underlying annex could not be retrieved
so the finding is against the *operative* document rather than the rule. But a
second independent instrument now points the same way, and a prediction that
fails is worth more than one that lands.

Secondarily: **DISC-07-03 finally has a printed anchor, and it is a partial
one.** SEC(2026) 250 documents what the two halves of MFF heading 7 *are*. It
never connects them to the digits.

## Findings

### 1. The Annex XI chain — prediction scored, and it splits

`EU/AnnexXI_PartA_2026-08-05.md`, 12 records from `COM(2025) 736 final`.

G.21 finding 6 logged this prediction: *"Annex XI's own text names its inputs —
national price and pay indices, and a joint index compiled by Eurostat — and does
so by title … If so it is a supranational instrument naming member-state
statistical releases as inputs, which is the exact edge shape the Canada/US pair
was measured to lack."*

| Limb | Outcome |
|---|---|
| A Joint Index compiled by Eurostat exists and is named | **Confirmed** |
| Eurostat's own publications are named by title | **Confirmed, better than predicted** — two distinct titled, dated report series |
| National price and pay indices named **by title** | **Refuted** — three `AGENCY ONLY`s |
| Therefore a supranational→named-national-release edge | **Not produced** |

**What was confirmed, and it is a real gain.** The chain terminates in a titled,
dated, annual publication:

> "Eurostat Report of 31 October 2025 on the 2025 annual update of remuneration
> and pensions of EU officials in accordance with Articles 64 and 65 and Annexes
> XI to the Staff Regulations…"

That clears all three of `Research.1.md` §4's conditions from the quote alone —
named by a document, on a cadence, with a title. A second series exists for
interim updates (3 June and 31 October 2025). Proposed id
`eurostat-remuneration-update-report`; **not minted, because no URL for it has
been retrieved.**

The arithmetic is stated as arithmetic, which is rare and earns
`calculated_from`:

> "According to Article 3(2) of Annex XI to the SR, the amount of the update is
> obtained by multiplying together the Specific Indicator and the Joint Index
> calculated by Eurostat. The calculated update of the remuneration and pensions
> in Belgium and Luxembourg is therefore 3.0%."

Checked: Specific Indicator 0,5 % × Joint Index 2,5 % → 1,005 × 1,025 = 1,0301.
Consistent as printed.

**What was refuted.** Every national input is an institution, never a
publication:

> "Eurostat calculates this index on the basis of price information provided by
> the Belgian and Luxembourgish authorities and staff numbers information from
> internal databases of the EU institutions."

> "Eurostat calculates this indicator on the basis of information supplied by the
> ten Member States referred to in Article 1(4) of Annex XI."

The second input in the first quote — "internal databases of the EU institutions"
— is a **terminus, kind `unpublishable`**, and a clean one.

**What this rests on, and the limit.** `COM(2025) 736` is a report *applying*
Annex XI, not Annex XI. The refutation is therefore of the operative document.
EUR-Lex returned 202-empty on four attempts, so **Annex XI Article 1(4) is
unread** and per §7 that proves nothing about what it contains. Stated as an open
limb, not as a closed result.

**One thing worth carrying to the Canadian side.** Article 10 of Annex XI caps
the Specific Indicator at **±2 %** and defers the excess to 1 April of the
following year. Alberta's income-tax escalator is capped at **2 %** with no
deferral. `Research.1.md` §8 item 1a exists to make exactly this comparison and
says the corpus currently cannot. It can now, for one pair.

### 2. DISC-07-03 — a printed anchor at last, and it is genuinely partial

`EU/SEC250_PartA_2026-08-05.md`, 3 records.

Three sessions have hunted a printed key for the MFF code taxonomy inside the
section PDFs. **It was never going to be there.** SEC(2026) 250 has a section
titled "3.1 Introduction to the nomenclature" — and it introduces the
*budget-line* nomenclature (titles, chapters, articles, items), which is a
different scheme from the MFF sub-heading code column DISC-07-03 is about. That
explains three sessions of nil returns.

What it *does* document, in two places:

> "7. European Public Administration … **of which: Administrative expenditure of
> the institutions** …"  (MFF ceiling table)

> "Title 20 includes the administrative expenditure of the Commission and Title
> 21 the pensions (of former staff and members of all EU institutions) and the
> contributions to the European Schools. These two titles include the expenditure
> falling under the MFF heading 7 'European Public Administration'."

So heading 7 is named in words, and it splits into exactly two documented
components: **administrative expenditure of the institutions**, and **pensions
plus European Schools**. G.21 finding 2 established that the observed codes split
into exactly two families: `7.2.*` on all the institutions' administrative lines,
and `7.1.*` on precisely pensions (`7.1.11`, `7.1.12x`) and European Schools
(`7.1.2x`).

**The two partitions match. The document never connects them to the digits.**

DISC-07-03's status therefore changes in a precise and limited way:

| Level | Status |
|---|---|
| `7` = MFF heading 7, "European Public Administration" | **Documented** (E250-01, E250-02) |
| The *semantic content* of the two second-level groups | **Documented** (E250-02) |
| That those groups are encoded as `.1` and `.2` | **Still inference** |
| The third level — section numeral, `9<TAG>` series | **Still entirely undocumented** |

`NOT FOUND` for a key mapping digits to meanings, over the full 539 pages.
Strings searched: `nomenclature` (125 hits, **110 of them a running page
header**, 15 substantive), `sub-heading` (28, none adjacent to a code),
`MFF sub-heading` (**0**), `heading 7`, `7.1`, `7.2`, `correspondence table`
(1 — and it maps budget lines between the 2026 and 2027 nomenclatures, not codes
to meanings).

G.18's formulation still stands and should not be dropped: very well evidenced,
and still an inference in one narrow respect. The respect is now narrower and
much better specified.

### 3. The `SEC*.pdf` URL pattern is identified but unverified

G.21 finding 5 recorded that no retrieval URL exists for any `SEC*.pdf` and that
this blocks import of all priority-A work. **The pattern is now identified:**

```
https://eur-lex.europa.eu/budget/data/DB/<year>/en/SEC<nn>.pdf
```

Evidence: a web search surfaced `https://eur-lex.europa.eu/budget/data/DB/2026/
en/SEC01.pdf` and `.../DB/2026/en/SEC04.pdf` as indexed live pages. The filename
convention — `SEC01.pdf` … `SEC10.pdf`, two-digit, zero-padded — **matches the
local files exactly**, including `SEC00.pdf`, and explains a naming scheme nobody
in this branch had accounted for. The 2027 URL is the same path with the year
changed.

**Not verified, and I am not treating it as verified.** Both
`https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC05.pdf` and the same via
`WebFetch` returned 202-empty behind the gate described in *Orientation*. So the
pattern is a strong inference from two indexed sibling URLs, not a retrieval.

**One browser fetch closes this**, and closing it unblocks import of all fifteen
Part A records now in hand. It is the highest-value single action available and
it is not one an agent here can perform.

### 4. One document in this branch now has a verified URL

`SEC(2026) 250` was retrieved, opened and verified: HTTP 200, 8 883 675 bytes,
`application/pdf`, 539 pages, cover reading "SEC(2026) 250 - June 2026 …
STATEMENT OF ESTIMATES OF THE EUROPEAN COMMISSION".

```
https://commission.europa.eu/document/download/03151b4e-301f-4f2e-9db1-74adcde9b88f_en?filename=draft-budget-2027-statement-estimates_v2.pdf
```

This is **the same document referenced at `sc-46`**, where it had a name and no
URL. `sc-46` records a documented non-reconciliation between it and SEC03; that
entry can now be checked rather than carried.

Two practical notes. The `_v2` suffix is load-bearing — the same identifier
without it returns 404 on `ec.europa.eu` and 429 on `commission.europa.eu`. And
the download is rate-limited: a second request within seconds returned 429, and
because both requests wrote to the same filename the good download was
overwritten by the error page. Use distinct output names.

## Secondary observations (logged, low priority)

- **`Research.1.md` §7's "consolidated statute pages truncate" now has a sibling
  failure mode: the gate.** A 202-with-empty-body reads as success to anything
  checking status codes loosely, and as absence to anything checking content. It
  is worth stating in a record which of the two you hit, because they license
  completely different conclusions.
- **Search-engine summaries are not evidence and were not used as such.** The
  first search returned an accurate-looking prose summary of Annex XI's
  mechanics. It was discarded and the primary document fetched instead — which
  matters, because the summary would have supported the *unsplit* version of the
  prediction and finding 1 would have been wrong in the interesting direction.
- **`WebFetch` caps quoted length**, so it is unusable for §2 verbatim work.
  Download and read locally.
- **Two of the three titled publications found this session are Eurostat's**, and
  the third is DG ECFIN's Spring European Economic Forecast, which appears in a
  footnote and is `cites`, not an input to the arithmetic. Do not let it drift
  into an edge.
- **`scripts/eu-schema-smoke.ts` is still disposable** and still cannot be
  deleted, because no EU slice has been imported. Third session running.

## Corrections to prior sessions

1. **G.21 finding 6 — prediction scored, and it splits.** Confirmed at the EU
   layer, refuted at the national layer. G.21 wrote that "a refutation is worth
   as much as a confirmation"; that is now cashed in, and the refuted limb is the
   more interesting half. Finding 1.

2. **G.21 cheap check 3 — premise corrected, not just answered.** It asked for
   SEC00's *prose* to be searched for a printed MFF key. SEC00 was the wrong
   document: the key-adjacent material is in SEC(2026) 250, which no `G.*` log
   had identified as a place to look. Finding 2.

3. **G.20 cheap check 2 and G.21 A4 — retired as framed.** "SEC00 for a printed
   nomenclature key … still the single highest-value item in this list" has been
   carried for three sessions. SEC00 has no budget lines, no MFF codes, and the
   nomenclature section that exists is in a different document and describes a
   different scheme. The item should be closed, not carried again.

4. **G.21 finding 5 — advanced, not resolved.** "No retrieval URL is recorded for
   any `SEC*.pdf`" was accurate. The pattern is now identified and remains
   unverified. Finding 3.

5. **No finding in G.15–G.19 was checked this session**, and none should be
   treated as revisited. G.20 finding 1's account of `Research.2.md` and
   `Research.EU.md` continues to be used **at one remove**, now two sessions
   deep. Someone should re-open those two files rather than let the chain
   lengthen further.

6. **G.21's own Part A record for SEC05 was not re-verified**, beyond re-reading
   it. Its search counts were corrected once during drafting and have not been
   independently re-run.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10), finish first.**

1. ~~**SEC05 (Court of Auditors)**~~ — **DONE**, G.21.
2. **SEC06, SEC07** — **the recommended next extraction targets, and this
   session did not move them.** Both are read and characterised in G.18, both
   already extracted to text, both cheaper than SEC05 was. Follow the format of
   `SEC05_PartA_2026-08-04.md`. SEC07 additionally owes the two G.18 candidates
   an sc-number.
3. **SEC01 (Parliament), SEC02 (Council)** — headline level only. SEC01 is the
   outlier: 14 `7.2.19SPEC` lines with no analogue elsewhere.
4. ~~**SEC00 for a printed MFF nomenclature key**~~ — **CLOSED, and say why
   rather than deleting it.** Three sessions carried this as the highest-value
   item. SEC00 is the general introduction, has no budget lines and no MFF codes,
   and the nomenclature material that exists is in SEC(2026) 250 and describes
   the budget-line scheme, not the code column. Corrections 2 and 3.
5. **Soft_Connections.docx (Part B)** — `sc-51`…`sc-57` added in G.21;
   **`sc-58`…`sc-62` added this session.** `sc-47`…`sc-50` remain **reserved**
   for G.16's missing entries. Still outstanding: recovering those, SEC04's
   addendum, and sc-numbers for G.18's two SEC07 candidates.
6. **SEC07_batch.md** — no longer needed, per G.18. Unchanged.
7. **SEC06_batch.md** — still wanted once, format check only.
8. **Establish the retrieval URL for the `SEC*.pdf` set — pattern found, needs
   one browser fetch.** Finding 3. **This still gates import of everything in
   priority A**, which is now fifteen Part A records rather than nineteen
   entries in one file. Cheapest high-value item in this file, and the only one
   an agent here cannot do.

**B — SEC03 meta backlog, after A.** Unchanged — see G.15 items 6–12. Note
G.21's observation that SEC03 (1 114 pp) should be scoped as its own corpus, and
add: **SEC(2026) 250 (539 pp) is now retrievable and belongs in this block**,
with 533 pages unread.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking. A
substantial ECB/Eurosystem batch sits in `_staging/20-prose-sections.txt` (~399k
chars, prose, no script can index it) and the Eurosystem consolidated balance
sheet batch is in the JSON staging.

**D — Housekeeping, whenever convenient.** Merge `Research.2.md` and
`Research.EU.md`. **Not started, third session running**, and correction 5 raises
the cost of leaving it: two sessions have now relied on a second-hand account of
both files. Four known inputs: restore §9's id list (or point at `Research.1.md`),
carry the Part B Output Rule somewhere it will be seen, drop `Research.EU.md`'s
stale closing line, fold in the priority-queue reconciliation at E5.

**E — Everything the blob split created.** E1 done; E2–E5 unchanged and untouched
this session.

1. ~~**The `Country` / `JurisdictionLevel` schema decision.**~~ **DONE** — G.20.
2. **Verify and slice the staged Eurostat strand** — 814 distinct Part A records.
   Suggested first slice: the ESA 2010 transmission-programme material.
   **Still the largest body of unworked material in the branch, and nothing
   blocks it.** Fourth session running with that sentence in the hand-off.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the 49 duplicate and 77 id-less records.**
5. **Reconcile the two priority queues.** Best folded into the D merge.

## Cheap checks still outstanding

Done this session — **G.21's 1 and 3**, written up as findings 1 and 2.
Remaining, ordered by value per unit effort:

1. **Read ten of the ESA 2010 / Annex B records for meaning** and settle whether
   Annex B names *publications* or only tables and deadlines. Carried unchanged
   since G.20. **Now the top of the list and more valuable than when written:**
   finding 1 makes it the second data point on the branch's central question, and
   the two chains can now be compared rather than each read in isolation.
2. **Retrieve Annex XI Article 1(4)** and check whether the ten Member States'
   sources are named by title. Closes finding 1's open limb. EUR-Lex is gated —
   try a national parliament register, which is how `COM(2025) 736` was obtained.
3. **Retrieve the Eurostat Report of 31 October** and establish its URL and
   whether the title recurs annually. Converts C736-03 into a mintable node.
4. **SEC06 Title 2 re-read for a reciprocal joint-services note** — underpins the
   asymmetry claim in G.18 finding 4. Cheap: SEC06 is already extracted to text.
5. **Confirm the Destatis records are extraction rather than discussion.**
   G.20 finding 3 rests on string counts; one pass upgrades it to substance.
6. **Check whether sc-47–sc-50 exist anywhere.** Grep `00-blob-fulltext.txt` and
   the `G.*` sidecars. The four numbers stay reserved until this is run.
7. **Characterise the 155 non-`S` loose records.** One pass over
   `10-loose-record.ndjson`.
8. **Match the 8 record-less batch headers to their records** by session window.
9. **Check whether the `9`-series sub-rule has more tags** than `SPEC`, `DAG` and
   `PPPA`. SEC(2026) 250 holds all 232 distinct codes in one file and is now the
   cheapest place to enumerate them — cheaper than when G.21 wrote this.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**
Everything below is the packing list for a chat thread that cannot.

1. **This file (`G.22.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief. Non-negotiable, and the only carrier
   of the §9 node-id list.
3. **`EU/SEC05_PartA_2026-08-04.md`** — the format exemplar to imitate.
4. **The next target PDF** — `SEC06.pdf` per priority A2. Already in `EU/`.
5. **`PartB_soft_connections_2026-08-04.md`** — the current Part B list, in place
   of `Soft Connections.docx`, which is larger, duplicated and not valid JSON.
6. **`EU/slices/README.md`** — layout. The blocker in it is resolved.
7. **A browser, or someone with one**, for priority A8 and cheap checks 2 and 3.
   EUR-Lex is gated to this environment and three of the highest-value remaining
   items are behind it.

---

# How to write the next hand-off

**Added 2026-08-04. Copy this whole section verbatim into every successor**, so
the chain never depends on one file surviving. It is the spec, not an example —
the file you are reading is the worked example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no
  G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are
  `.docx`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `EU/`. Earlier files are `.docx`; that
  was the chat workflow's doing, not a preference.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `EU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py EU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). It exists so branch state can be read
  without parsing prose, and so a future session can diff two hand-offs.
  `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

Date: YYYY-MM-DD
Governing briefs: <which, and whether you actually saw them>
Predecessor: G.<n-1>.md (date)

## Orientation — if you are a new agent, start here
## Session conditions — read this first
## Headline result
## Findings
## Secondary observations (logged, low priority)
## Corrections to prior sessions
## Thomas's stated priority for the remaining work
## Cheap checks still outstanding
## What to pass at the start of next thread

# How to write the next hand-off        ← this spec, copied verbatim
```

Drop a section only if it would be empty, and say so in one line rather than
leaving a heading with nothing under it. *Corrections* and *Thomas's stated
priority* are **never** dropped: an empty Corrections section is itself a claim
(nothing earlier was found wrong) and should say that explicitly.

## What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. This is where "the sandbox failed" and "the
governing briefs still did not arrive" belong. **State plainly which sources you
read in full**, because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Mark any claim that depends on
a predecessor's reading rather than your own — the house convention is
*(SEC04 per G.17)*. Quote verbatim; `Research.1.md` §2 applies here exactly as
it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. This section is the reason the chain is trustworthy. A session that
finds a predecessor wrong and does not record it here has actively damaged the
corpus.

**Thomas's stated priority for the remaining work** — lettered blocks (A, B, C,
D) carried forward from the predecessor, edited to reflect what moved. Mark items
**no longer needed** explicitly and say why, rather than deleting them silently.
This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** G.17 predicted a code pattern;
  G.18 recorded that it "landed". Make falsifiable calls and settle them.
- **Distinguish inference from documented fact,** and say which narrow respect is
  still inference. G.18's headline rule is very well evidenced and still not
  printed in any document — it says so.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
- **Do not pad.** These files are dense because every line earns its place.
