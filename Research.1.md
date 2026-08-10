# Research.1.md — standing brief (adopted 2026-08-05)

<!-- The version string was deleted 2026-08-07 on Thomas's decision: it had
drifted (header said v3.0 while four branch files described v3.3/v3.4) and
the repo is under git now, so the history IS the version record. -->

**This is the governing brief**, adopted by Thomas on 2026-08-05, replacing the
prior `Research.1.md` (v1.0). This is a merge of that prior brief with
`Research.2.md.docx` and `Research.eu.docx` — every session since `G.24.md`'s
predecessor had flagged that merge as the branch's longest-standing open
housekeeping item; `G.39.md` located the two source documents (they had been
mis-cited as root-level `.md` files by every hand-off since `G.19.md` — a
location error, not a content one), `G.40.md` drafted the merge, and this
session adopted it and moved it to the project root.

**The superseded v1.0 brief is archived at
`EU/Research.1-superseded_2026-08-05.md`**, for history only — do not treat it
as current.

**Source documents merged, both located and read in full 2026-08-05** (`G.39.md`):
`EU/Research.2.md.docx` (v2.1, 2026-08-02) and `EU/Research.eu.docx` (v0.1,
2026-08-02).

---

## What changed from Research.1.md, and why

`Research.2.md.docx` turned out to be **near-identical to `Research.1.md` in
§§1–7 and §10** — same corpus framing, same one rule, same extraction
discipline, same two traps, same output format, same "how to find good
documents" section. Three real differences, and this draft resolves all three
(the five inputs prior hand-offs flagged, condensed to three decisions):

1. **§8 ("What to work on") is missing entirely from Research.2.** Not
   truncated — absent. This draft does **not** restore Research.1's Canada/US
   §8 verbatim, because the branch's actual work since 2026-08-02 has been
   overwhelmingly EU-focused, and a priorities section that ignores the
   EU galaxy entirely would be actively misleading. **Resolution**: §8 below
   folds Research.1's original Canada/US priority queue and Research.EU's own
   §10 EU priority queue into one list, reconciling what prior hand-offs
   called "the E5 priority-queue reconciliation" — there was never a
   numbered "E5" item; the phrase meant exactly this fold-in, referenced
   under the branch's "E — Everything the blob split created" backlog
   letter without ever being written out.
2. **§9's node-id codeblock is present in Research.2 only as an intro
   paragraph — the actual list is missing.** **Resolution**: §9 below points
   explicitly at `Research.1.md` §9 as the list's only authoritative copy,
   per the first of prior hand-offs' known inputs, rather than duplicating
   100+ ids into a second file that will drift.
3. **Research.2 adds a genuinely new standing rule Research.1 does not have**:
   the Part B Output Rule (2026-08-02), requiring a savable Part B soft-
   connections list at the close of every batch or hand-off. **Resolution**:
   carried forward verbatim as §11 below — it is already being followed
   (`EU/PartB_soft_connections_2026-08-04.md`/`.json` exist), so dropping it
   from a merged brief would formalise less than current practice already
   does.

`Research.eu.docx` is not a competing standing brief — it is explicitly
scoped as an EU-specific supplement ("§§3–8 identical to Research.2"), so this
draft folds its EU-specific sections (topology, priority queue, legal spine)
into the base document rather than keeping two files a future session has to
read in sequence and reconcile by hand, which is exactly the failure mode
that made this merge overdue in the first place.

**The `sessions/`-style rollup convention now applies to this branch too,
decided 2026-08-09.** The `G.*.md` chain had run 52 files with every one
read individually by every new session and no consolidation, the exact gap
`sessions/START-HERE.md` closes for the renderer project's `V0.*.md` logs.
`EU/R1.68.md` was the first EU rollup, covering `G.64`-`G.68` (the
corpus-wide `_dropped` sweep closing). **`EU/R2.72.md`, added 2026-08-09,
is the newest, covering `G.69`-`G.72`** (the EU staging-blob batch
backlog -- `planning/MISSION-TODO-2.md` item 5 -- closing in full, plus
`npm run validate` running successfully from this branch's tooling for
the first time). **It does not replace the newest
individual hand-off -- read both.** Unlike the renderer project, this branch
has no single REPORTS.md-equivalent that absorbs promoted methodology, so
the working set for a new session is `Research.1.md` plus the newest rollup
plus the newest `G.*.md`, not the rollup alone. Every `G.*.md`'s Orientation
section should carry a pointer to the newest rollup going forward, the same
way it already carries a pointer to its immediate predecessor.

**One substantive rule question, put to Thomas and decided 2026-08-05**:
Research.eu.docx §2 stated "Every edge carries a URL (**or Official Journal
reference**) pointing at the document that says so" — a relaxation of
Research.1/2's stricter "Every edge carries a URL." The `G.40.md` draft
proposed a middle position rather than either extreme — in practice, every OJ
reference used across 40+ EU sessions has been paired with an ELI/EUR-Lex URL
(the corpus's own `evidence_url` field has never been populated with a bare OJ
citation and no URL) — and Thomas confirmed this reading. §2 below states the
rule as "a URL, or an Official Journal reference paired with its ELI URL":
OJ citations remain acceptable, but never as a substitute for a live URL.

---

## 1. What this is

There is a project that draws a 3D graph of official reports and statistical
releases. Each **node** is a document that gets published on a schedule. Each
**edge** is a documented statement that one report uses another as an input. Node
size is a PageRank-style authority score: a report that many others depend on is
large.

The point of it is to answer one question — **what would break if this changed?**
If Statistics Canada revised the Consumer Price Index basket, you should be able
to see, at a glance, that the Alberta escalator, AISH benefit rates, the CPP
disability amount and a municipal budget all move. If Eurostat revised the ESA
2010 transmission programme or the EBS Regulation (2019/2152), the downstream
national accounts, structural business statistics, labour-force aggregates and
fiscal-surveillance indicators used by the Commission, the Council and the
member states should be visible the same way.

**As of the 2026-08-09 validator run (this session, `AU/G.5.md`, after
minting the Victorian valuation chain -- `au-vic-vola1960` and
`au-vic-vbpsg` -- for AU priority item 3) the corpus holds 502 reports,
609 dependencies and 3 relations** -- up from 500/608/3 recorded earlier
the same day in `EU/G.76.md`, after also minting `no-kommune-arsregnskap`
for OPEN-THREADS 2.9, which was itself up from 473/605/3 recorded earlier
in `EU/G.74.md`, after Files B, the legal-instrument-lineages file, and
the ESS catalogue file were imported.
The previous figure before that, 372/436/3, was the 2026-08-08 run in
`validator-2026-08-08.txt`.
**Correction 2026-08-09 (`EU/G.75.md`)**: the parenthetical above used to
add "run on Windows by Thomas — the validator cannot run through the device
bridge". The second half is still true and the inference from it was not:
the device's own `node_modules` is a Windows build so `npx tsx` fails there,
but an agent can stage `src/` + `scripts/` into a cloud sandbox, `npm
install` fresh and run both `scripts/validate-data.ts` and `tsc --noEmit`
unaided. That has now been done four times (`G.72`–`G.75`); see `G.74.md`
Orientation §3 for the procedure. Do not treat a validator run as blocked on
Thomas. The
paragraph below describes the shape it took when it first became two
galaxies, at 150 reports and 220 dependencies (`G.39.md`, 2026-08-05) — no
longer just Canadian federal and Alberta material plus a US federal cluster
and international standards, but a genuine second galaxy: the EU branch, Eurostat, the European Central Bank/ESCB, DG ECFIN, one member
state (Germany) with a second (Luxembourg) begun, and Section III of the EU's
own Draft Budget, partially sampled.

**Your job is to read documents and quote them.** Someone else decides what the
quotes mean. That division is not a courtesy — it was measured, and section 3
explains why.

---

## 2. The one rule everything else serves

> **If no document says it, the edge does not exist.**

Not "it's obviously true". Not "everyone knows the Bank of Canada watches
employment". A named document has to state, in its own words, that report A uses
report B. **Every edge carries a URL — or, where no stable direct URL exists,
an Official Journal reference paired with its ELI (European Legislation
Identifier) URL** — pointing at the document that says so. (This is the one
place this draft narrows Research.eu.docx's own wording rather than adopting
it unchanged — see *What changed*, above; flagged for Thomas's decision.)

This has a visible cost and the cost is the point: real programmes with
unpublished inputs get dropped from the graph. That is the standard working, not
a bug.

So the most valuable thing you can send back is **a verbatim quotation with a
location**. The least valuable thing you can send back is a summary of what a
document is about.

---

**Caveat-notes (decided 2026-08-07, Thomas).** A `_dropped` entry with reason
`caveat` is not a dropped edge: it is an annotation ON a minted edge — an
unresolved discrepancy in the evidence, a supersession story, a remap
explanation. Its `source`/`target` must name the real edge, and the validator
checks the edge exists (the pre-2026-08-07 workaround of nulling the endpoints
is retired). A plain `note` whose endpoints name an existing edge is still an
error.

**Branch hand-off priorities (decided 2026-08-07, Thomas).** Branches number
their own priority lists plainly (1, 2, 3 …). The EU branch's A–G lettering is
its own history and stays; it does not carry to NZ, AU or any new branch.

**Hand-off spec adoption (decided 2026-08-07, Thomas, via the decisions doc).**
The EU `G.*.md` hand-off spec is adopted wholesale for AU, NZ and any future
branch — copied spec block, JSON sidecar, corrections discipline, all of it.
The "should this branch adopt the EU conventions?" item carried since
`AU/G.1.md` priority 4 is closed everywhere; do not carry it forward again.

**Session git policy (decided 2026-08-07, Thomas, via the decisions doc).**
Every working session ends by committing its own work to git with a
descriptive message and pushing to origin/main — the public repo tracks the
corpus. A session that cannot push (auth, environment) commits locally and
says so in its hand-off.

**Agents do not run git commands against this repo at all, decided
2026-08-08 (Thomas, `G.54.md`).** Not `git status`, not `git log`, nothing —
diagnostic or otherwise. Editing files (the actual research and corpus work)
never required git in the first place; committing and pushing is Thomas's
own action through GitHub Desktop, not an agent's. This isn't a style
preference — it's a correctness rule. On this repo, accessed over the
device bridge, git cannot clean up its own `index.lock` after an operation
finishes (every git command this session printed `warning: unable to
unlink ... Operation not permitted`, lock present or not), so *any* git
command an agent runs — even a read-only `git status` just to check
something — leaves a fresh stale lock behind. `G.53.md`/`G.54.md`'s
session spent real time diagnosing a "recurring lock file" problem that
turned out to be caused by the diagnostic checks themselves: clearing a
lock and then running `git status` to confirm it was clear recreated it.
**If you think you need to check git state, ask Thomas what it shows
instead of running the command yourself.**

## 3. Extract; do not adjudicate

This was tested. An earlier round asked for verdicts — "does this edge exist,
yes or no". Seven came back: four held, **one was refuted by the very quote
offered as its proof**, and one had a direction error that the reader noticed,
wrote down, and then overrode.

The extraction in all of them was good. The judgement was not, and it failed in
one consistent direction: **toward yes.**

A later submission of 24 proposed edges was written as finished conclusions with
paraphrased justifications. **Two survived** — and both were the two that
happened to include a quoted string. Where there was no quote there was nothing
to check.

So:

- **There is no verdict field in this brief.** Do not write DOCUMENTED, CONFIRMED,
  VALID, NOT-FOUND-THEREFORE-NO, or "this counts as an edge".
- **Do not paraphrase a passage you could quote.** A verbatim quote is checkable
  in minutes. A paraphrase is not checkable at all.
- **Do not resolve conflicts — report them.** If two passages disagree, or a
  passage points the opposite way to what an item asks about, quote both and say
  plainly that they disagree. Do not pick. "These point opposite ways" is an ideal
  answer.

You are better at reading documents than the process is at checking judgements.
The split plays to that.

---

## 4. What counts as a node

A node is **a published document that another document names as an input to
itself** — and it is one of two shapes: a **recurring publication**, cadenced,
or a **one-off foundational instrument**, which is not.

Subject matter is not the boundary. This started as an economics project and the
economics turned out to be an accident of where documented chains happened to be —
municipal tax bylaws and provincial assessment guidelines are among the best
material in it. Health, environment, justice, education, trade and occupational
material are all in scope now, **provided the chains are written down.**

Two things bind regardless of shape:

1. **A document names it.** Section 2.
2. **It has a title.** "Statistics Canada" is not a node. *Survey of Employment,
   Payrolls and Hours* is.

Point 2 is the one that comes up constantly, and it has its own instruction in
section 6: `AGENCY ONLY`.

### Cadence, for the recurring shape

**Recast 2026-08-08, Thomas's ruling.** Until this date, a third rule bound
every node without exception: *"it is published on a cadence... something
published once is not a node."* That rule now applies only to documents that
are themselves recurring in nature — statistical releases, quality reports,
inventories, anything with a next edition. For that shape, nothing has
changed: once a day, once a month, once every five years — fractional is
fine, "about once a generation" is a real answer, and a single edition with
no second one anywhere in sight is still not a node.

**A one-off foundational instrument does not need a cadence at all.** A
treaty, a trade deal, a piece of government policy or regulation adopted once
and never revisited in that form again is eligible on points 1 and 2 alone —
named, and titled — the same evidentiary bar as everything else, just without
a rate attached. This was opened specifically because the EU branch kept
running into single-adoption Regulations and Decisions that are plainly
load-bearing (cited, binding, structurally central to the chains around them)
and were being excluded on cadence alone. `releases_per_year` becomes
optional for this shape; when it is absent, treat the node as evergreen
rather than guessing a rate to satisfy the schema.

**Recasts and successor instruments are the recurring shape, not the one-off
shape, even when the current edition itself has never been amended.** If a
document explicitly repeals or replaces a named predecessor — "repealing
Regulation (EU) No 1291/2013," a recital naming the act it recasts — and that
predecessor itself had its own predecessor, the *class* is recurring even
though each individual generation is typically adopted once and left alone.
Cadence for this shape comes from the interval between the two most recent
generations, the same "latest observed interval" rule already used for
irregular recurring documents (`de-edp-inventory`, `de-destatis-gni-inventory`)
— not from amendments within one generation. The EU's Financial Regulation
(2024/2509, recasting 2018/1046, recasting 2012/966...) is the case that
opened this: read in isolation it has exactly one consolidated version and
looks like a one-off; read as a lineage it is a document class the EU
re-adopts wholesale roughly once a Multiannual Financial Framework period.
**Do not assume every recast lines up with the 7-year MFF cycle** — that is
a live research question per act, not a rule to apply by default (see
`EU/prompts/GROK-PROMPT-9_legal-instrument-lineage_2026-08-08.md` for the
first pass at it; the European Union Recovery Instrument, 2020/2094, is
already a known exception — a one-off crisis instrument with no real
predecessor).

**This reopens prior exclusions.** Several documents across the corpus were
dropped specifically under the old rule's exact wording — `_dropped` entries
citing "published once is not a node" or "Periodicity: non-recurring" as the
disqualifier. Implementing Regulation (EU) 2016/2304 (`esa2010-quality-reporting.json`)
was the first one identified, and as of `G.53.md` (2026-08-08) it has been
minted as `eu-reg-2016-2304`, one-off foundational instrument, no
`releases_per_year`, with a `methodology_depends_on` edge added from
`eurostat-national-accounts-quality-report`. The same session ran a targeted
sweep of `_dropped` arrays across the corpus (25 entries checked closely, out
of 416 total dropped entries — not exhaustive, see `G.53.md` for method and
scope) and minted four ECB series that were sitting as under-researched leads
in `eurostat-edp-gfs-ecb-statistics.json` once their live cadence was
actually checked: `ecb-supervisory-banking-statistics` (quarterly),
`ecb-insurance-corporations-operations` (annual),
`ecb-investment-funds-balance-sheet-statistics` (monthly, headline series),
`ecb-insurance-corporations-assets-liabilities` (quarterly). None of these
were blocked by cadence under the new rule at all — they simply hadn't been
checked live; worth remembering that "reopened by the rule change" and
"worth re-checking now that it's cheaper to qualify" are two different
categories of `_dropped` entry, and the sweep found examples of both.

The ESS Quality and Performance Indicators / Quality Glossary / DESAP
checklist (`ess-quality-framework.json`) **is now checked and closed
(2026-08-08, same day) — and it was never a case for this rule.** Named in
the original ruling as a reopened candidate, it turned out to be three
separate candidates dropped as one bundled entry, on a search confined to a
single webpage and the ESS Handbook's *foreword*. The ESS Quality and
Performance Indicators are minted as `ess-qpi-guidelines`, on the ordinary
**recurring** shape and not this section's one-off route: the document
carries "Version 1.4" and its own dated revision history (reviewed 2010,
updated 2012–13), and the Handbook's *body* (s. 3.2.2) names it by exact
title as where "the definitions and compilation methods for the QPIs are
specified". The Quality Glossary and DESAP stay dropped, on reasons the
cadence rule never touched: the Glossary was absorbed into a database
(CODED) and into the Handbook itself as a supplement, which is the `part_of`
shape that already excludes ESMS and ESQRS; DESAP is named only
descriptively by everything that mentions it, so it fails point 1, and it is
a blank checklist that publishes nothing of its own. Full record:
`EU/ESSQPI_PartA_2026-08-08.md`.

**The general lesson is worth more than the one node.** `G.53.md`'s two
categories — "reopened by the rule change" and "worth re-checking now that
it's cheaper to qualify" — need a third: *wrongly dropped in the first place,
on too narrow a search*. A keyword pass over `_dropped` text cannot detect
that class at all, because the stated reason reads perfectly sound until the
source is reopened.

A Commission Recommendation (EU) 2023/397, dropped in
`eu-meta-docx-batches.json` as "a one-off legal act," is still open —
soft law (a Recommendation) is a step below what the ruling names (treaty,
trade deal, government policy/regulation), and Thomas deliberately deferred
adjudicating it rather than have it decided by proxy. It is not retroactively
minted by this edit — it still needs the same foundational-instrument test
applied on its own merits (named, titled, and genuinely load-bearing, not
merely mentioned) — but a future session should revisit it under this
section rather than treat the old `_dropped` reasoning as settled. **The broader sweep Thomas ruled on 2026-08-08
(`notes/Decisions-2026-08-08_EU-open-questions.md`, D3) is CLOSED as of
2026-08-09.** It ran file-by-file over every `_dropped` array in the
corpus, not just the ~15 highest-count files originally scoped. Full
outcome in project memory (`dropped-sweep-status.md`) and the closing
hand-off (`EU/G.68.md`). The scoping document that governed the work,
`planning/dropped-sweep-scoping_2026-08-08.md`, is archived at
`archive/planning/dropped-sweep-scoping_2026-08-08.md` — read it only for
historical method (how the 391-entry ranking was computed), not as a
to-do list.

### Termini — things that are named but cannot be published

Some inputs are real, named, load-bearing and impossible to point at: the CRA
PD7 remittance form behind the Survey of Employment, Payrolls and Hours; GST
files; T1/T2 tax records; the Federal Reserve's FR 2644 reporting form. Those
are recorded as **termini** — nodes that exist to say *the chain stops here,
and here is why*.

Four kinds:

| Kind | Meaning |
|---|---|
| `unpublishable` | Real, named, not a publication. A form, an administrative record. |
| `unidentified` | The document names a *slot* and something outside it fills the slot. Alberta's bitumen regulation sets an index from "the commodity brokers specified" in a list a Minister sets by order. |
| `redistributed` | Reached via an intermediary that publishes nothing of its own — a data vendor republishing someone else's series. |
| `confidential` | Collected and deliberately never released. |

**What this means for you:** when a document names an input that turns out to be
a form, a tax record, a vendor feed or a ministerial appointment, **that is a
result worth reporting, not a dead end.** Quote it and say what kind it looks
like.

---

## 5. Two traps that have already cost this project

Both are things a perfectly accurate quotation can still get wrong.

### 5a. "Comparable with" is not a dependency

These phrases turn up in methodology prose in exactly the position a dependency
claim would occupy, and they are not dependency claims:

> comparable with · equivalent to · consistent with · analogous to ·
> harmonised with · aligned with · benchmarked against *(sometimes — read it)*

Four real examples, all of which nearly became edges:

- A StatCan record says its monthly GDP estimates are made *"more comparable
  with"* the expenditure-based data. That is agreement between two outputs, not an
  input.
- The Survey of Employment, Payrolls and Hours says *"comparisons with independent
  sources such as the Labour Force Survey are performed."* The word **independent**
  is doing the work.
- The National Occupational Classification is *"comparable to"* the international
  ISCO standard — and the same passage says *"certain conceptual differences...
  limit comparability."*
- NAPCS says outright it is *"not fully compatible with"* the UN's Central Product
  Classification.

**Quote them anyway.** A documented non-dependency is worth as much as an edge —
it stops the same plausible-looking link being proposed every few months. Just do
not present it as a dependency.

**A fifth example, from the EU branch (added in this merge)**: a national
statistical office stating its own release "conforms to the same methodological
principles" as an EU-harmonised counterpart, without itself being subject to
the EU regulation that governs that counterpart, is the same trap in a
supranational key — see `lu-statec-ipcn`'s treatment in
`src/data/research/lu-statec-cpi.json`, where the IPCN's "same principles"
language was deliberately not extended into an edge that the IPCH's
"conformément aux dispositions du Règlement" language did support.

### 5b. Tense — a document can describe a dead arrangement in the present layout

A Statistics Canada methodology page says:

> *"Up to and including 2003, the MSM was benchmarked to the Annual Survey of
> Manufactures and Logging (ASML)."*

Verbatim, correctly located, in the methodology section — and describing an
arrangement that ended twenty-two years ago. Nothing in the format catches it,
because every check is about whether the document says it, not about **when**.

These pages are living documents with historical notes folded in and no visual
separation between the two. **If a relationship is stated in the past tense, say
so explicitly in your entry**, and if you can, find the live statement from the
other document. In the case above, the annual survey's own page says in the
present tense that its data *"are used by"* the monthly survey — which is what
made the edge real.

---

## 6. Output format

Two parts. **Part A is what matters. Part B is a convenience and is never
authoritative.**

### Part A — the extraction record

For **every** item, one entry per provision, per footnote, per table row. Never
bundle. A previous round returned fourteen good quotes under one heading marked
"illustrative cluster"; none carried its own section number, so none could be
cited, so **all fourteen were discarded.** Good research, unusable packaging.

Each entry has exactly these fields:

```
URL:       the document you actually opened. If redirected, the final URL.
LOCATION:  section, subsection and paragraph — "s. 6(1)(a)", not "s. 6".
           Or footnote number, table number, or heading.
           If there is no citable location, write NO CITABLE LOCATION and
           give the nearest heading.
QUOTE:     verbatim, copy-pasted, in quotation marks. No tidying, no
           ellipsis inside the operative clause. If the sentence is long,
           quote all of it.
NAMES:     the actual publications, series or survey titles the quote names,
           one per line. A release is a thing with a title, published on a
           cadence.
TENSE:     PRESENT or PAST. Only when the quote describes a relationship.
NOTES:     anything odd. Conflicts, hedges, the phrases in 5a, whether an
           input looks like a terminus and which kind.
```

Two special values, both of which are **results and not failures**:

- **`AGENCY ONLY`** — write this in place of NAMES whenever a quote names an
  institution and no publication. *"Sources: Statistics Canada"*, *"as determined
  by the Chief Statistician"*, *"data provided by the Bureau of Economic
  Analysis"*. Expect this often. **Do not go looking for a better quote instead of
  reporting it** — the frequency of `AGENCY ONLY` is itself a measurement, and one
  provincial funding formula was found to attribute six of twelve inputs this way,
  which turned out to be the most interesting thing about it. **In the EU branch,
  `AGENCY ONLY` has turned out to be the default rather than the exception** —
  ten of eleven SEC03 budget Titles tested return nothing on the statistics
  watchlist, and the branch's central finding (`EU/slices/README.md`) is that
  disclosure runs upward (national documents name EU instruments) far more
  often than downward (EU instruments naming national releases).
- **`NOT FOUND`** — you searched and it is not there. **Say which strings you
  searched.** Say it even if a whole item comes back empty. A confirmed absence
  gets recorded and used; several are already load-bearing in this corpus.

### Part B — draft JSON (optional, and never trusted on its own)

If you have capacity, follow Part A with a draft JSON slice in the schema below.
It saves transcription time.

**The rule that makes this safe: any claim in Part B that is not backed by a
quote in Part A is deleted without being read.** Part B cannot introduce a node,
an edge, or a fact. It can only re-arrange what Part A already proved. Do not
"fill in" a missing publisher, invent a URL, or guess a cadence to make the JSON
validate — leave the field out and note it in Part A.

```jsonc
{
  "reports": [
    {
      "id": "statcan-lowercase-hyphenated",     // stable, guessable, no spaces
      "title": "Exact Published Title",
      "publisher": "Publishing body",
      "country": "CA",                          // ISO-3166 alpha-2, open string;
                                                  // "CA" | "US" | "INT" | "EU" carry
                                                  // hand-written palette entries
      "jurisdiction_level": "federal",          // international | supranational |
                                                 // federal | provincial | municipal |
                                                 // institutional
      "region": "Canada",                       // or "Alberta", "European Union", ...
      "description": "What it is and why it matters here. Quote the document.",
      "releases_per_year": 12,                  // 12 monthly, 4 quarterly,
                                                 // 1 annual, 0.2 every 5 years
      "changes_per_year": 0.1,                  // optional; NEVER larger than
                                                 // releases_per_year
      "cadence_note": "Quote the frequency statement.",
      "last_updated": null,                     // always null
      "url": "https://...",
      "domains": ["labour"],
      "terminal_reason": "unpublishable"        // ONLY for termini, see §4
    }
  ],
  "dependencies": [
    {
      "source_report_id": "the-one-that-depends",
      "target_report_id": "the-one-depended-on",
      "relationship_type": "uses_data_from",
      "basis": "The verbatim quote, plus which document and where.",
      "evidence_url": "https://..."             // required in practice
    }
  ],
  "_dropped": [
    {
      "edge": "human-readable description",
      "source": "node-id or null",
      "target": "node-id or null",
      "reason": "denied",
      "why": "The quote that refuses it, and where it is."
    }
  ]
}
```

**Edge direction is the single easiest thing to get backwards.** Read it as:
`source_report_id` **depends on** `target_report_id`. The dependent is the
source. Authority accrues at the target. If the CPI is used by the Alberta
escalator, then source = the escalator, target = the CPI.

**`relationship_type`**, strongest to weakest:

| Value | Use when |
|---|---|
| `calculated_from` | The output is mechanically derived. Arithmetic. |
| `uses_data_from` | The target's figures are a direct input. |
| `methodology_depends_on` | The target defines a method, deflator or classification the source relies on. |
| `cites` | Referenced as context, not as a computational input. |

Choosing between them is a judgement about what the document actually says — the
Bank Rate is `calculated_from` the policy rate because it is arithmetic, while the
prime rate is only `uses_data_from` it because the Bank's own word is "affects".
**If you are unsure, say so in Part A rather than picking in Part B.**

**`relations` — added 2026-08-06, and read this before filing anything as a
`_dropped` `note` on ontology grounds.** A slice may carry an optional `relations`
array alongside `dependencies`, for documented relationships that are **not**
dependencies. Two types so far: **`audits`** (one body assures another's figures,
or an instrument installs the auditor) and **`supersedes`** (one programme or
framework replaces another in time). Shape is `source_report_id`,
`target_report_id`, `relation_type`, `basis`, `evidence_url` — and unlike a
dependency, **`basis` and `evidence_url` are both required**, because a relation
buys none of the authority maths and the only thing justifying it is that a
document says so. There is no `implied` relation.

Relations are never passed to `buildGraph` and cannot touch `authority`,
`size_score`, degree or position. That is why they exist as a separate list rather
than as a fifth `relationship_type`: every `relationship_type` feeds
`RELATIONSHIP_WEIGHT`, and assurance and succession have no defensible weight.
Full reasoning in `notes/SCHEMA-DECISION-relationship-types.md` and in the
`RelationType` comment in `src/lib/types.ts`.

**The constraint that actually binds is the node rule, not the type.** Both ends
of a relation must be nodes, and §4 applies unchanged — a private audit firm whose
opinion is bound into the statements it audits is not a recurrently published
official report and can never be one end of an `audits` relation. Of the seven
documented instances that prompted this change, one was mintable. Do not propose a
relation without checking that both ends exist.

**`reason`** for `_dropped`: `denied` (a document says it does not hold),
`no-document` (searched, nothing states it), `wrong-target`, `wrong-direction`,
`unpublishable-source`, `unreadable-source`, `no-node-yet` (documented but one end
isn't a node yet), `deferred`, `note`.

`domains`: `inflation`, `labour`, `monetary-policy`, `national-accounts`,
`benefits`, `interest-rates`, `municipal-finance`, `education`, `post-secondary`,
`health`, `fiscal-transfers`, `population`, `taxation`, `assessment`,
`energy-royalties`, `banking`, `financial-regulation`, `construction`,
`insurance`, `research-innovation`, `agriculture`, `external-action`. If
nothing fits, say so in Part A — the list can be extended, but only at the
other end.

`research-innovation`, `agriculture` and `external-action` (Thomas,
2026-08-08, open-questions D1 — "name as is") were pending values with no
customers until the held EU legal-instrument lineage work was rebuilt and
verified. That happened 2026-08-09: `eu-legal-instrument-lineages.json`
imported with 19 nodes tagged across the three, in the same commit as their
addition to the `Domain` union in `src/lib/types.ts` and to this list, per
the rule that added them. `insurance` was the same kind of pending value —
`ecb-insurance-corporations-operations` and
`ecb-insurance-corporations-assets-liabilities` were both tagged
`financial-regulation` for want of it (`G.53.md`) — and was decided and
added 2026-08-08 (OPEN-THREADS 0.5): both nodes retagged `insurance` in
`eurostat-edp-gfs-ecb-statistics.json`.

---

## 7. How to find the good documents

Bought expensively. Follow these before general searching.

- **Statutes and regulations beat webpages, and are usually available.** The
  strongest material in this corpus is regulations quoting their inputs by name. A
  webpage saying two things are related is usually not enough; a regulation naming
  a series is.
- **Look for a "Data sources" section or a data-sources appendix.** Statistics
  Canada's IMDB records have one. Ontario's municipal grant technical guide has an
  Appendix F listing every data element the formula consumes and where each comes
  from. **A document that names its own inputs in a table is the strongest
  evidence class there is**, and it is rare outside statute. When scoping a funding
  programme, read the technical guide's appendices before the prose.
- **Municipal tax rate bylaws are keystones.** By statute a bylaw must state the
  assessment it levies against and every requisition it collects for another body.
  Six edges out of one PDF, twice.
- **When a document turns out to name one source, sweep it for all of them.** One
  source table named an index in 64 separate rows and nobody had noticed, because
  nobody had searched for that index specifically. Grep the whole document.
- **Expect disclosure to stop one level short of a title.** *Who produced it* is
  usually given; *what it is called* is often not. Budget for that as the normal
  case rather than the disappointing one, and report it as `AGENCY ONLY`.
- **Consolidated statute pages truncate.** Long instruments on laws-lois and
  similar sites cut off well before the end. A whole-page search returning zero
  hits proves nothing about absence if the retrieval was truncated — use
  section-by-section URLs where they exist, and **say so if you could not retrieve
  the whole thing.**
- **Retired numbering systems.** Older regulations cite CANSIM table numbers;
  current ones cite product identifiers. Matching one to the other is a judgement,
  so quote what the document says and flag it rather than translating.
- **Some public documents are unreadable.** Reports published only through
  page-flipping viewers with no extractable text. That is a finding — report it as
  `unreadable-source` and move on.
- **EU-specific: appendices to Commission budget documents are appendices, not
  separate series, even when they carry their own heading.** SEC03's "Detailed
  reports: A64 Annex 3" and "A65 Annex 2" categories looked like distinct
  publications until their own file names identified them as Appendix 2/3 of
  the report already modelled (`eurostat-remuneration-update-report.json`).
  Check a candidate series' own file metadata before minting it.
- **EU-specific: several EU-agency sites gate non-browser HTTP clients but
  are reachable via a real browser.** Confirmed repeatedly (`G.31.md`
  finding 3 onward). Two sites (`u4unity.eu`, `ecb.europa.eu`'s PDF host)
  trigger a file-download response to direct browser navigation but are
  fetchable via `WebFetch`, whose saved binary can then be read with `pypdf`.
  **`eur-lex.europa.eu` no longer belongs on this list — resolved
  2026-08-08 (OPEN-THREADS 1.3)**: plain `curl`, no browser UA, gets HTTP
  200 with full text on both the `eli/reg/...` and `legal-content/EN/TXT/...`
  URL forms. `planning/MISSION-TODO-2.md` carried two contradictory notes
  about this dated the same day (2026-08-07); the "works" one was correct
  and the "outage" one described a transient state that was never corrected.
  Treat EUR-Lex as reliable; only re-investigate if it actually fails again.
- **EU-specific: many government and agency sites lazy-load detail behind an
  "Expand all" control.** Confirmed for Legilux (`G.34.md`) and Eurostat's
  civil-servants-remuneration Publications/Methodology pages (`G.35.md`,
  `G.36.md`) — a `get_page_text` call before expanding returns a table of
  contents, not the content.

### One thing that is counter-intuitive

**Do not research a classification standard by reading the classification.** This
was tried and it failed. Classification documents describe alignment,
comparability and concordance — not derivation. Reading NAICS's own documentation
produces almost nothing.

**Read the programmes that are coded to it instead.** Every edge into NAICS in
this corpus came from a survey's methodology page saying it classifies its
respondents by NAICS. The standard is a hub because other documents name it, not
because it names things. The EU branch's own version of this: ESA 2010
(`esa-2010`) accrued its first real edges not from reading the Regulation
itself, but from national statistical offices' own methodology pages stating
they compile "in compliance with" it.

---

## 8. What to work on

**In this order, across two galaxies.** Canada/US work and EU work are
independent tracks; either can be picked up without the other blocking. Each
item is self-contained; finish one before starting the next, and return work
as you finish each item rather than assembling everything at the end.

### Canada/US galaxy

**Item 1 — Interprovincial.** The graph goes four levels deep — international
standard → national statistic → provincial formula → municipal bylaw — in one
province. Adding a second and third province changes what the thing is for.
Income tax indexation (all 13 provinces/territories), disability/income
support rates, provincial statistical agencies (Quebec's ISQ especially), and
property assessment across provinces are the sub-items, in that order.

**Item 2 — Business, banking and industry.** StatCan business programmes
(Business Register, ASSI, QFSE, CIMT), Bank of Canada/OSFI (expect `AGENCY
ONLY`/`NOT FOUND` here and treat both as real answers), banking supervision
returns.

**Item 3 — International standards, entered correctly.** Read section 7's
warning first. The emissions chain (National Inventory Report → IPCC
Guidelines), health classifications from the programmes that use them
(ICD-10-CA, CCI), occupational/trade classifications from the programmes
(NOC, Harmonized System).

**Item 4 — United States, beyond statistics.** Lowest priority; the measured
number of documented direct CA↔US edges is one. The Fed's H.15 footnotes and
the US Treasury daily par yield curve are worth doing if you get here.

### EU galaxy

**Item 4a — the corpus-wide `_dropped` sweep, before Items 5–9.** Thomas's
2026-08-08 ruling (D3, see §4). Not a research item and not optional
ordering: 391 entries unread, method constrained as §4 describes. Full
scoping in `planning/MISSION-TODO-2.md` P1 item 4a.

**Item 5 — Eurostat's own structural publications.** The Statistical
Requirements Compendium and its data-requirement tables; the ESA 2010
transmission programme's own tables (the better test of the branch's central
asymmetry finding than Annex XI turned out to be); the 2025 list of main
statistics (already staged, still needing its nine-record split — see cheap
checks).

**Item 6 — Complete the EU staff remuneration thread.** Eurobarometer
(named, funded, not yet verified live — `G.39.md` cheap check 2); the second
joint ECB-Eurostat "BOP-NA ROW consistency report" (`G.39.md` cheap check 3);
the FSDN/Eurofarm lead (still the branch's strongest unfollowed statistical-
release lead, `SEC03_Title08_PartA_2026-08-05.md` S03-12).

**Item 7 — A second and third member state.** France (INSEE) and Italy
(ISTAT) are the natural next NSIs after Germany and Luxembourg, per
Research.EU's own topology — "only after marginal returns on the first three
remain positive." Luxembourg's own wage-indexation mechanism (Art. 11 of the
loi modifiée du 22 juin 1963) is a cheap same-country extension first.

**Item 8 — SEC03, the EU Draft Budget's own text.** Three of its largest
Titles (08, 05, 07) are sampled; ten of eleven sections/Titles tested across
the whole branch return nothing on the statistics watchlist. **Whether
further blanket Title-by-Title sampling is worth the effort relative to
Items 5–7 is a real question for whoever picks this up next** — flagged, not
decided, in `G.38.md`/`G.39.md`.

**Item 9 — The municipal/local layer, once the member-state layer is
established.** Research.EU's own template: a mid-sized commune/Gemeinde/
comune (~70k population, Grande Prairie scale) that publishes an annual
budget, tax-rate bylaw equivalent, assessment roll and audited statements
under national local-government law. Not started; explicitly gated behind
Item 7's "marginal returns" test.

---

## 9. Node IDs already in use

**Canada/US galaxy — carried forward verbatim from the superseded v1.0
brief.** Use these exact strings when a document names something already
here. Do not invent variants — `statcan-cpi` is the CPI and
`statcan-consumer-price-index` is a duplicate that has to be found and merged
by hand. This has happened twice.

```
ab-aadl-cost-share, ab-adult-health-benefit-income-levels,
ab-aish-benefit-rates, ab-bvm-components, ab-child-family-benefit,
ab-continuing-care-accommodation-charges, ab-dip-requisition,
ab-education-funding-manual, ab-education-property-tax-requisition,
ab-education-student-enrolment, ab-gas-reference-price,
ab-income-support-rates, ab-mrf-guidelines,
ab-municipalaffairs-equalized-assessment,
ab-municipalaffairs-financial-statistical-data, ab-municipalaffairs-fir,
ab-municipalaffairs-lgff-capital, ab-municipalaffairs-lgff-operating,
ab-municipalaffairs-population-list, ab-oil-par-prices,
ab-oilsands-royalty-rates, ab-regulated-property-guidelines,
ab-seniors-benefit-rates, ab-tbf-alberta-escalator,
ab-tbf-economic-outlook, ab-tbf-fiscal-plan, ab-tbf-fiscal-update,
ab-tbf-population-estimates, aer-general-well-data, ahs-business-plan,
ahs-financial-statements, argus-mexico-maya-spot, bea-gdp, bea-pce,
bis-basel-framework, bls-c-cpi-u, bls-cex, bls-cpi,
bls-employment-situation, bls-qcew, boc-bank-rate, boc-corra,
boc-daily-exchange-rates, boc-mortgage-qualifying-rate, boc-mpr,
boc-policy-rate, boc-posted-chartered-bank-rates, boc-prime-rate,
canada-child-benefit, canada-health-transfer, canada-social-transfer,
cdic-differential-premiums-manual, cgp-assessment-roll, cgp-budget,
cgp-financial-statements, cgp-municipal-census, cgp-tax-rate-bylaw,
cihi-nhex, cmhc-mortgage-loan-insurance,
cmhc-residential-mortgage-industry-report, cpi-manual,
cpp-disability-amount, cpp-pension-index, cpp-ympe,
cps-current-population-survey, cra-gst-files, cra-ibsp-tax-data,
cra-indexation-adjustment, cra-pd7-accounts,
dof-insured-mortgage-qualifying-rules, ei-actuarial-report-premium-rate,
ei-maximum-insurable-earnings, ei-premium-rate,
ei-regional-unemployment-rates, ei-regular-benefit-rate,
esdc-oas-indexation, fed-fomc-statement, fed-h15, fed-h8, fed-sep, fed-z1,
ffiec-call-report, fiscal-equalization-program, gp-assessment-roll,
gp-budget, gp-financial-statements, gp-municipal-census, gp-tax-rate-bylaw,
gppsd-budget, gppsd-financial-statements, grande-spirit-requisition,
hhs-poverty-guidelines, ice-brent-futures-settlement,
icls-work-statistics-resolution, imf-bpm6, imf-gfsm, ipsas,
irs-annual-inflation-adjustments, jd-power-valuation-services,
mpac-assessment, naics, napcs, noc, nymex-wti-settlement-prices, on-ompf,
osfi-b20, osfi-car-guideline, osfi-mqr-uninsured, psab-psas, sna-2008,
ssa-cola, ssa-contribution-benefit-base, ssa-national-average-wage-index,
ssa-pia-formula, statcan-asml, statcan-census-population, statcan-cpi,
statcan-cpi-basket-update, statcan-gdp-monthly, statcan-hfce, statcan-ippi,
statcan-lfs, statcan-msm, statcan-national-accounts,
statcan-population-estimates, statcan-seph, statcan-shs, statcan-sut,
term-corra, un-census-principles, uscensus-decennial,
uscensus-population-estimates, uscensus-poverty-thresholds
```

**EU/Europe galaxy — regenerated in full 2026-08-08 (`G.56.md`), replacing
the block wholesale rather than patching it.** 127 ids (126 from the
regeneration pass, plus `sdmx-glossary`, added the same day once Thomas
ruled on it — see below). History of the count: 33 (`G.41.md`/`G.43.md`/
`G.46.md`), 85 (Grok consolidation, 2026-08-05), 95 (Netherlands
municipal-finance depth pass, same day), 105 (United Kingdom depth pass,
same day) — and then nine sessions of drift, flagged as stale twice
(`G.53.md`, `G.55.md`) without being regenerated. **21 ids were missing**;
none of the 105 turned out to be wrong or retired, so this is purely
additive.

Extraction method, unchanged from the 2026-08-05 pass and re-run in one
go: every `"id"` field from every report object in
`src/data/research/*.json` whose `country` is `EU`, one of the 27 EU
member codes, or one of the non-EU European codes in `COUNTRY_FAMILY`'s
`XEU` family (`NO IS LI CH GB RS ME MK AL BA TR UA MD XK`), **plus** the
four `country: "INT"` ids minted by this branch's own work (`oecd-icio`,
`oecd-frascati-manual`, `nordic-statistics-database`,
`nato-defence-expenditure`), the same treatment the Canada/US list gives
`imf-bpm6`/`sna-2008`. Cross-checked against `src/data/index.ts`: 67
research files on disk, 67 imported, no file missing from either side, and
no duplicate id across files. Use these exact strings; do not invent
variants.

```
al-instat-national-accounts, at-statistik-austria-national-accounts,
ba-bhas-national-accounts, be-nbb-national-accounts,
bg-nsi-national-accounts, ch-bfs-national-accounts,
cy-cystat-national-accounts, cz-cnb-bop, cz-csu-national-accounts,
de-bundesbank-financial-accounts, de-destatis-cpi,
de-destatis-labour-cost-survey, de-destatis-national-accounts,
de-destatis-quarterly-production-survey, dk-dst-national-accounts,
dk-pris-og-loenforudsaetninger, ec-statement-of-estimates,
ecb-consolidated-banking-data, ecb-eurosystem-annual-balance-sheet,
ecb-eurosystem-weekly-financial-statement,
ecb-insurance-corporations-assets-liabilities,
ecb-insurance-corporations-operations,
ecb-investment-funds-balance-sheet-statistics,
ecb-mfi-balance-sheet-items, ecb-supervisory-banking-statistics,
ecfin-business-consumer-surveys, ee-statistics-estonia-national-accounts,
es-ine-national-accounts, esa-2010, esac-opinion-work-programme,
esgab-annual-report, ess-escb-mip-quality-report,
ess-handbook-quality-metadata-reports, ess-peer-review-final-report,
ess-qpi-guidelines, ess-quality-assurance-framework, ess-sims,
eu-draft-budget, eu-esif-common-provisions-regulation,
eu-manual-rd-esa2010, eu-reg-2016-2304, eu-reg-223-2009, eu-reg-479-2009,
eu-statistics-code-of-practice, eurostat-annual-work-programme,
eurostat-edp-gfs-quality-report, eurostat-edp-notification-tables,
eurostat-farm-structure-survey, eurostat-figaro, eurostat-hicp,
eurostat-national-accounts-quality-report,
eurostat-remuneration-extra-eu-interim-report,
eurostat-remuneration-intra-eu-interim-report,
eurostat-remuneration-mission-expenses-report,
eurostat-remuneration-rent-survey, eurostat-remuneration-update-report,
eurostat-suiot, fi-statfin-national-accounts, fr-insee-base2020-methodo,
fr-insee-esane, fr-insee-national-accounts, gb-census-2021, gb-cipfa-code,
gb-la-ro-form, gb-mhclg-asc-rnf-annex, gb-mhclg-ro-returns,
gb-nhs-asc-activity-finance-report, gb-ons-national-accounts,
gb-ons-population-estimates, gb-stevenage-nndr1, gb-ukspf-prospectus,
gb-voa-rating-lists, gb-wolverhampton-statement-of-accounts,
gl-selvstyrelov, gr-elstat-national-accounts, hr-dzs-national-accounts,
hu-hcso-national-accounts, ie-cso-national-accounts,
is-hagstofa-national-accounts, it-bdi-bop, it-istat-asia-enterprises,
it-istat-frame-sbs, it-istat-national-accounts, li-amt-statistik-vgr,
lt-stat-national-accounts, lu-echelle-mobile-salaires, lu-statec-ipch,
lu-statec-ipcn, lv-csp-national-accounts, md-nbs-national-accounts,
me-monstat-national-accounts, mk-makstat-national-accounts,
mt-nso-national-accounts, nato-defence-expenditure, nl-bbv,
nl-bzk-toelichting-gemeentefonds, nl-cbs-gni-inventory-2010,
nl-cbs-iv3-gemeenten, nl-cbs-maatstaven-fvw, nl-cbs-sbr, nl-cbs-sbs,
nl-dnb-bop, nl-gemeentefonds, nl-iv3-rapportage, nl-ozb-nijmegen,
nl-provinciefonds, nl-waarderingskamer-waarderingsinstructie, nl-wet-woz,
no-kdd-gront-hefte, no-kostra-forskriften,
no-ssb-general-government-finances, no-ssb-kostra,
no-ssb-national-accounts, nordic-statistics-database,
oecd-frascati-manual, oecd-icio, pl-gus-national-accounts,
pt-ine-national-accounts, ro-ins-national-accounts,
rs-sors-national-accounts, sdmx-glossary, se-scb-national-accounts,
si-surs-national-accounts, sk-susr-national-accounts,
tr-turkstat-national-accounts, ua-sssu-national-accounts,
xk-kas-national-accounts
```

**The 21 additions, by source file** — four sessions' worth of minting
plus four slices the earlier passes simply never reached:
`ess-quality-framework.json` (`ess-handbook-quality-metadata-reports`,
`ess-qpi-guidelines`, `ess-quality-assurance-framework`, `ess-sims`);
`no-government-finance.json` (`no-kdd-gront-hefte`,
`no-kostra-forskriften`, `no-ssb-general-government-finances`,
`no-ssb-kostra`); `eurostat-edp-gfs-ecb-statistics.json` (the four
`G.53.md` ECB series); `esa2010-quality-reporting.json`
(`eu-reg-2016-2304`, `eu-reg-223-2009`,
`eurostat-national-accounts-quality-report`);
`gb-ukspf-succession.json` (`eu-esif-common-provisions-regulation`,
`gb-ukspf-prospectus`); `edp-inventory-regulation-479-2009.json`
(`eu-reg-479-2009`); `associated-states-government-finance.json`
(`dk-pris-og-loenforudsaetninger`, `gl-selvstyrelov`).

**Two of those are here on the mechanical rule, not because the EU branch
minted them.** `dk-pris-og-loenforudsaetninger` and `gl-selvstyrelov` are
`country: "DK"` and belong to the Greenland block-grant chain in the
associated-states slice — Danish-coded, so the country filter catches
them, but they are SAO-galaxy work. Left in, because the filter is the
definition and hand-exceptions are how a list starts drifting again; noted
here so nobody re-derives the surprise.

**Decided 2026-08-08 (Thomas, OPEN-THREADS 0.4)**: `sdmx-glossary`
(`country: "INT"`, minted in `ess-quality-framework.json` — an EU-branch
slice) is **added** to the list above, on the same "branch-minted `INT`
id" reasoning that puts `oecd-icio` there. The weaker case — `hs`,
`imf-fiscal-monitor`, `imf-weo` and `oecd-economic-outlook` in the
`grok-h1-*` files — is **not** added. This was not decided as a general
rule ("any `INT` id a branch slice mints belongs on that branch's list");
it was decided case by case, so it stays a judgement call at the next
regeneration too, not a mechanical extraction.

**Almost every one of the 85 pre-2026-08-05-depth-pass ids is the same node
shape** — `<country> national accounts → esa-2010`, `methodology_depends_on`
or `cites`. That breadth is now closed; see `G.47.md` for why depth (a second
document per country, a second domain per country) is the priority from here,
not a 41st national-accounts edge. **The ten new `nl-*` ids and ten new
`gb-*` government-finance ids are the depth-pass results so far**: the
Netherlands (Gemeentefonds, Provinciefonds, the BBV accounting standard, the
Iv3 municipal-return pipeline, WOZ property valuation, Nijmegen's own OZB tax
ordinance) picked for its structural closeness to Ontario's OMPF; the United
Kingdom (the Fair Funding Review 2.0's Technical Annexes, the CIPFA Code
accounting standard, Revenue Outturn returns, the VOA valuation chain, and a
well-evidenced-but-schema-incompatible finding about UKSPF succeeding EU
structural funds — see `uk-local-government-finance.json`'s own `_dropped`
array) picked as the corpus's first *former*-EU-member case and for having no
language barrier to primary-source verification.

**Australia / SAO galaxy — new 2026-08-06.** The corpus's first
non-Europe/non-Canada/US country. `SAO` ("South Asia + Oceania") in
`src/lib/palette.ts`'s `ColourFamily` had been reserved and unstaffed since
`G.47.md`'s continent redesign, explicitly documented there as reading "as
one instruction from Thomas ('India/Pakistan & Australia/NZ')" — Australia
is that instruction's first country. Picked directly by Thomas ("a former
British colony... similar to Canada and UK"), researched the same
government-finance-depth-pass way as the Netherlands and UK: federal
(Commonwealth Grants Commission's horizontal fiscal equalisation, GST
revenue sharing) → state (Tasmania's Grants Commission methodology, NSW's
Valuer-General property-valuation chain) → local government (a council's own
rates and financial statements) — see
`src/data/research/au-government-finance.json` and `AU/G.1.md`, the first
hand-off in a new series parallel to `EU/G.*.md`.

**Regenerated in full 2026-08-08 (OPEN-THREADS 1.7), replacing the block
wholesale like the EU/Europe pass.** 21 ids, up from 11 — stale since the
2026-08-06 minting, never updated as the Victoria pass and later sessions
added nodes. Same method as the EU pass: every `"id"` from every report
object in `src/data/research/*.json` whose `country` is `AU`. Cross-checked
against `src/data/index.ts`: all 67 research files on disk are imported, no
duplicate id anywhere in the corpus.

```
au-aasb1049, au-abs-australian-industry, au-abs-building-approvals,
au-abs-census, au-abs-erp, au-abs-gfs, au-abs-regional-population,
au-abs-seifa, au-brisbane-financial-statements, au-cgc-gst-relativities,
au-dss-payment-demographics, au-federal-budget, au-georges-river-rates,
au-la-annual-statements, au-lgfa-act-1995, au-nsw-lrs,
au-tas-sgc-methodology, au-vlggc-act-1976, au-vlggc-agi-questionnaire,
au-vlggc-annual-allocation-report, au-vola1916
```

**Two of these ids rest on unverified subagent extraction, not this
project's usual direct-primary-source standard** — `au-cgc-gst-relativities`
and `au-abs-erp`, because cgc.gov.au blocked every fetch method tried
(`curl` TLS reset, browser forced a file-download dialog rather than
rendering). Flagged in both nodes' own `description` fields and on the one
edge that uses them; treat with lower confidence until a future session can
reach the PDF directly.

**New Zealand / SAO galaxy — new 2026-08-06.** The second country in `SAO`,
added the same day as Australia and at Thomas's direct instruction ("we have
just done australia, lets do new zealand next"). Same central → local
government-finance depth pass: central (the Treasury's Financial Statements
of the Government and Budget Economic and Fiscal Update; Stats NZ's
Government finance statistics, Local Authority Census and quarterly Local
Authority Statistics) → the rating-valuation chain (Rating Valuations Act
1998, the Valuer-General's Rating Valuations Rules 2008, the district
valuation roll) → local government (Wellington City Council's own annual
report and rates documents, and the LGFA). See
`src/data/research/nz-government-finance.json` and `NZ/G.1.md`, a third
hand-off series parallel to `EU/G.*.md` and `AU/G.1.md`.

**Regenerated in full 2026-08-08 (OPEN-THREADS 1.7), replacing the block
wholesale like the EU/Europe pass.** 30 ids, up from 18 — predated the
Stats NZ national-accounts pass (`nz-statsnz-national-accounts.json`: 5
ids) and several later additions (`nz-oag-annual-report`,
`nz-public-audit-act-2001`, `nz-public-finance-act-1989`, `nz-lgaca-2009`,
`nz-auckland-annual-report`, `nz-statsnz-aes`). Same method: every `"id"`
from every report object in `src/data/research/*.json` whose `country` is
`NZ`. Cross-checked the same way as AU, above — no duplicates, all files
imported.

```
nz-auckland-annual-report, nz-district-valuation-roll, nz-la-annual-reports,
nz-lgaca-2009, nz-lgfa-annual-report, nz-mbie-accommodation-data,
nz-mbie-tect, nz-mbie-tif, nz-nzta-far-policy, nz-oag-annual-report,
nz-pbe-ipsas-1, nz-public-audit-act-2001, nz-public-finance-act-1989,
nz-rva1998, nz-rvr2008, nz-statsnz-aes, nz-statsnz-bpi, nz-statsnz-gdp,
nz-statsnz-gfs, nz-statsnz-lac, nz-statsnz-national-accounts-income,
nz-statsnz-npisa, nz-statsnz-qlas, nz-statsnz-regional-gdp, nz-statsnz-tsa,
nz-treasury-befu, nz-treasury-fsgnz, nz-wellington-annual-report,
nz-wellington-rates, nz-xrb-a1
```

**`nz-nzta-far-policy` is deliberately isolated**, on the same convention as
`au-brisbane-financial-statements`: New Zealand's national local-transport
funding formula names none of its four inputs to a titled release, and the
absence is the result. Every quote in this slice was re-verified directly
against the primary source by the session that minted it, with one exception
noted in the JSON: `legislation.govt.nz` blocks non-browser clients, so the
two rating Acts were read from the Parliamentary Counsel Office's own PDFs
replayed byte-for-byte through the Wayback `id_` endpoint.

**The Realm of New Zealand — new 2026-08-06.** Three more countries in `SAO`,
minted the same day as New Zealand and directly out of it: the **Cook
Islands** (`CK`), **Niue** (`NU`) and **Tokelau** (`TK`). Researched by Grok
against Research Briefs VI and VII (`research-input/`) across two rounds,
then re-verified in full against primary sources before minting. Filed as
three separate countries rather than as regions of New Zealand, deliberately
— see the `COUNTRY_FAMILY` comment in `src/lib/palette.ts`.

```
ck-budget-estimates, ck-cpi, ck-government-financial-statements,
ck-hyefu, ck-national-accounts, nu-ag-report-assembly,
nu-government-financial-statements, nu-public-revenues-act-1959,
tk-finance-rules, tk-financial-statements
```

**The Realm gives three different answers to one question.** The Cook Islands
reports on **IPSAS** and cites individual standards by number; Niue names no
external accounting framework at all and has not done so back to FY2016 at
least; Tokelau's Finance Rules require "generally accepted accounting
practice" without saying whose. New Zealand supplies the **auditor** to two of
the three — under the Tokelau Finance Rules 1998 and under Article 60 of
Niue's own Constitution — and supplies the accounting standards to none of
them. **That auditor relationship has no home in this corpus's four
`relationship_type` values and is recorded as a `note` in the slice's
`_dropped` array.** It is the second independent case of the same ontology
gap, after `EU/G.49.md` Finding 3's `supersedes` problem.

The graph shows the split cleanly: the Cook Islands connects outward to
`ipsas`, `imf-gfsm` and `sna-2008` — and so shares an anchor with Canada's
`psab-psas` — while **Niue and Tokelau are closed components with no path out
of themselves**, which is what a jurisdiction that cites nobody looks like
once it is drawn.

**Associated states and dependencies — new 2026-08-06.** The comparison case
for the Realm slice, and the answer to the question it raised. Five more
countries: the three **Compact of Free Association** states — `FM` Federated
States of Micronesia, `MH` Marshall Islands, `PW` Palau — plus `GL` Greenland
and `PR` Puerto Rico. Two US nodes the research forced are minted here too,
because the corpus had no US public-sector accounting standard-setter and no
American Community Survey.

```
dk-pris-og-loenforudsaetninger, fm-financial-statements, gasb-standards,
gl-inatsisartutlov-26-2016, gl-landskassens-regnskab, gl-selvstyrelov,
mh-financial-statements, pr-fomb-fiscal-plan, pw-financial-statements,
us-gao-yellow-book, us-promesa, uscensus-acs
```

**Greenland's block grant is now a documented indexation edge**, closed after
three research rounds that variously sourced it to an encyclopaedia, a wiki
and an unevidenced assertion. § 5 of the Self-Government Act ties the grant to
"det generelle pris- og lønindeks på finansloven"; Økonomistyrelsen publishes
that index annually in a titled table. `gl-selvstyrelov ->
dk-pris-og-loenforudsaetninger`, `calculated_from`, on the same footing as
`ssa-cola -> bls-cpi`.

**Seven jurisdictions have now given five different answers to one question —
what accounting framework do your public accounts name?** IPSAS (Cook
Islands); nothing at all (Niue); an undefined "generally accepted accounting
practice" (Tokelau); US GAAP with GASB as standard-setter (all three Compact
states, in near-identical wording); and its own legislature's statute
(Greenland — Inatsisartutlov nr. 26/2016, naming no external framework at
all). **So the United States exports its accounting method wholesale to three
sovereign states, and New Zealand exports none to three jurisdictions of its
own Realm.** Palau proves the import is real rather than decorative: its
FY2022 audit opinion is qualified specifically for failing to implement GASB
Statement No. 87.

**The audit census now separates into two shapes**, which was not visible from
one realm: *export of institution* (a foreign audit office personally signs —
New Zealand into Niue and Tokelau, twice) versus *export of method only* (a
private firm audits under foreign standards while the jurisdiction keeps its
own audit office — the Compact states, three times). Greenland is neither.
**None of the three fits any `relationship_type` in this corpus**, and the gap
now has six documented instances behind it rather than one. Together with
`EU/G.49.md` Finding 3's unresolved `supersedes` case, that is the strongest
argument yet for widening the schema — a decision that belongs to whoever owns
it, not to a research session.

One further pattern worth flagging: **five of the six jurisdictions across
both slices are years behind on their accounts** (Cook Islands 29 months, Niue
five years reported in a single document under a statute passed to permit it,
Marshall Islands 32 months, Palau 36 months, Puerto Rico nothing since FY2022).
Greenland alone is punctual. Arrears look like a property of the class.

**Brazil / SA galaxy — new 2026-08-06.** The corpus's first South American
nodes, and the first entries in the `SA` colour family, reserved in the
continent redesign and unstaffed until now. Deliberately one chain: the
**Fundo de Participação dos Municípios** and the population figure it divides
money by.

```
br-censo-demografico, br-fpm-dn-tcu, br-ibge-estimativas-populacao,
br-ibge-projecoes-populacao, br-lei-8443
```

**The result is a negative, and it is the most travelled negative in this
corpus.** Brazil's FPM is plausibly the largest single application anywhere of
the shape this project is built around — a formula dividing money among some
5,500 jurisdictions by a published statistical figure. Across all 206 pages of
Decisão Normativa-TCU 219/2025 the population column is headed "População
(fonte: IBGE, ref. 01/07/2025)", twenty-eight times, and no publication is
named anywhere. The titled link is supplied instead by **Lei 8.443/1992 art.
102**, which compels publication "para os fins previstos no inciso VI do art.
1º", and by IBGE's own methodology note, which says it publishes "em
cumprimento ao Art. 102" and names its inputs by exact title and revision.

So the edge exists and no single document states it — it is distributed across
a decision, a statute and a methodology note, and is minted on that basis in
the manner of the New Zealand rating chain. **The same pattern — naming the
statistician and not the statistic — now has instances on three continents**:
the Local Government (Financial Assistance) Act 1995 (Cth) in Australia, the
Local Government (Financial Reporting and Prudence) Regulations 2014 in New
Zealand, and the TCU here.

**ANZSIC / industry classification — new 2026-08-06 (second session of the
day).** Item 26 of `Grok-Research-Brief-XI.md`, returned `not_attempted` by
the external researcher and extracted directly instead. Four ids in a new
slice, `anzsic-industry-classification.json`:

```
anzsic, isic, au-abs-australian-industry, nz-statsnz-aes
```

Two of these fill holes rather than extend a frontier. **`isic`** is the
United Nations' industry classification and the acknowledged parent of most
national ones including ANZSIC; its absence was the same shape of hole as the
missing `gasb-standards` that the associated-states pass had to fill, since
`naics` was present with eight inbound edges while the classification NAICS is
itself aligned to was not represented at all. It has since picked up a second
and third inbound edge from an unrelated jurisdiction — the Cook Islands name
"ISIC Rev 4" on both their quarterly and annual GDP release pages.

**`anzsic` is the corpus's second jointly-owned classification after `naics`**,
signed by both national statisticians. But note the correction recorded in the
slice: minting it does **not** by itself tie `AU` and `NZ` together. Joint
authorship is a `publisher` fact and this corpus draws no edge from one. The
tie exists only because `au-abs-australian-industry` and `nz-statsnz-aes` were
minted alongside it, one citing release on each side.

`ck-national-accounts-quarterly` was also split out of `ck-national-accounts`
in the Realm slice the same session, because the Cook Islands Budget's
forecasting model takes the quarterly series and not the annual one.

If a document names something **not** on either list above, that is useful
and wanted — just give the name exactly as the document words it, and propose
an id in the same style. **EU-branch convention, established across this
branch's own sessions**: `eurostat-*` for Eurostat-published series,
`<country-code>-<agency>-*` for member-state releases (`de-destatis-*`,
`lu-statec-*`), `ecb-*` for European Central Bank/Eurosystem publications,
`ess-escb-*` for jointly-produced ESS/ESCB material, `ecfin-*` for DG ECFIN.
**Whoever backfills this list again after new EU nodes are minted should
re-run the same extraction** (report objects by `country`) rather than
appending by hand, so it never drifts from `src/data/research/` a second
time.

---

## 10. Summary — the eight things that matter

1. **Quote verbatim, with a location.** A paraphrase cannot be checked.
2. **One provision per entry.** Bundled quotes get discarded whole.
3. **No verdicts.** You extract; someone else adjudicates.
4. **`AGENCY ONLY` and `NOT FOUND` are results.** Report them, count them, do not
   go hunting for something better instead.
5. **"Comparable with" is not a dependency** — but quote it anyway.
6. **Check the tense.** A dead arrangement reads exactly like a live one.
7. **Write as you go**, item by item. Never assemble everything for the end.
8. **Part B never introduces anything Part A did not prove.**

If you are unsure whether something is worth sending: send it with a quote. The
expensive failure in this project has never been too much raw material. It has
always been a confident answer that turned out to rest on nothing.

---

## 11. Part B Output Rule (added 2026-08-02, carried forward from Research.2)

Whenever a research batch or session window is closed, or whenever a
`G.*.md` handover note is requested, the agent **must** also produce a
standalone, savable list of all current Part B soft connections and
provisional observations.

Format requirements:
- Use a clear, machine-readable structure (preferably JSON or a clean
  Markdown table/list).
- Include at minimum: id, from, to, nature of connection, strength, evidence
  pointer, and short notes.
- Keep the list strictly provisional and non-authoritative.
- This Part B list is intended to be saved by the user as a separate file
  (e.g. `PartB_soft_connections_YYYY-MM-DD.md` or `.json`) and to complement
  the `G.*.md` handover notes.

The Part B list should be updated incrementally as new soft connections
become visible from Part A records. Thomas should include the Part B file
with the initial files so awareness can be brought to it.

**Already in active use** — `EU/PartB_soft_connections_2026-08-04.md` and
`.json` exist and are current as of that date.

---

## 12. EU galaxy topology (from Research.EU.md §9, carried forward)

**Apex — supranational.**
- Eurostat (Commission DG) — Statistical Requirements Compendium (annual),
  European System of Accounts (ESA 2010 / future ESA), European Business
  Statistics Regulation and manuals, Principal European Economic Indicators,
  quality reports on national accounts, LFS, BoP/IIP, SBS, etc.
- European Central Bank / ESCB — balance-of-payments and IIP statistics,
  monetary aggregates, HICP (joint with Eurostat). **Three nodes now minted**
  in this apex layer beyond `eurostat-hicp` and `esa-2010`:
  `ecb-eurosystem-annual-balance-sheet`, `ecb-eurosystem-weekly-financial-
  statement`, `ess-escb-mip-quality-report` (`G.39.md`).
- Legal spine: Regulation 223/2009 (European statistics), ESA Regulation
  549/2013, EBS Regulation 2019/2152 (**still unread — item 5, cheap
  checks**), Code of Practice.

**Member-state layer (selected high-authority NSIs first).**
- Germany — Destatis + Land statistical offices (federal structure).
  **Started**: `de-destatis-national-accounts` (`G.19.md` era).
- Luxembourg — STATEC. **Started this branch's own initiative, not in the
  original topology**: `lu-statec-ipch`, `lu-statec-ipcn` (`G.34.md`).
- France — INSEE + ministerial statistical services. **Not started.**
- Italy — ISTAT. **Not started.**
- Others only after marginal returns on the first three remain positive.

**Fiscal / transfer layer.**
- EU budget / Multiannual Financial Framework, own-resources decision,
  cohesion-policy regulations, Recovery and Resilience Facility (where
  documented as recurrent inputs). **Substantially started**:
  `eu-draft-budget`, plus SEC03 Titles 08, 05, 07 sampled
  (`G.29.md`–`G.39.md`).

**Municipal / local layer (template pattern). Not started.**
Major cities (examples for first mapping): Berlin, Paris, Rome, Madrid,
Amsterdam. ~70k-population municipal templates (Grande Prairie scale):
select 2–3 mid-sized communes/Gemeinden/comuni that publish annual budgets,
tax-rate bylaws (or equivalent), assessment rolls and audited statements
under national local-government law. The keystone documents are those that,
by statute, must name the assessment base and any inter-governmental
requisitions they collect. Explicitly gated behind the member-state layer's
"marginal returns" test — see §8 Item 9.

Cadence and authority scores will be driven by the frequency of Eurostat
transmission programmes and the national implementing acts that name them.
