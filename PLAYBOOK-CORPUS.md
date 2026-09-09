# PLAYBOOK-CORPUS.md — the research lane

**Read this with `PLAYBOOK.md`, never instead of it.** The rules that bind every task whatever it
is — git, validate, the generated corpus file, no deletes, measure before believing — are there,
with the test for where a new paragraph goes. This file is for finding, minting, wiring, quoting
and grading edges; the renderer's rules are in `PLAYBOOK-RENDER.md`.

**Rule numbers are global** (`PLAYBOOK.md` §1): this file holds 3, 10-16 and 19, and the gaps are
rules that live in one of the other two. Rule 17 was retired to `notes/techniques-2026-09-04.md`
on 2026-09-07 for being a recipe rather than a rule; its number stays retired.

**When a line in this file turns out to be wrong, correct it in place and show the old wording**,
the way `PLAYBOOK-RENDER.md`'s 2026-09-06 review did. A doc that quietly changes its mind is
harder to trust than one that says what it got wrong, and this file has no sweep of its own
except the handoff procedure's step 5b.

---

## 0. What this file is now, and where the rest went

**Restructured 2026-09-09** (Thomas: *"reassess all the required readings and split them down and
just have one handoff that says where to go if doing such and such a thing"*). This file was
50.6k and **every corpus round read all of it**, though most of it decides one specific question
each. It is now **the always-read part plus an index**; the reasoning moved, byte-for-byte and
with its headings intact, into `playbook/`.

**The principle: knowing a rule EXISTS is mandatory; reading WHY is on demand.** §6 and §7 are
lookup tables that were written as prose. To avoid re-raising a settled question you only need to
know it is settled and where it lives — the justification matters when you are actually facing
that question. So every ruling still has a line below, and nothing became invisible; the
2026-09-06 audit's worst find was rules filed where their audience never reads them, and an index
is what prevents that.

**Nothing was reworded, cut or renumbered.** Section numbers are kept as the headings below so
every existing `PLAYBOOK §6` / `§7a` cross-reference in the repo, in code comments and in
`notes/` still resolves — it now resolves to a line that points one file onward.

| file | k | read it when |
|---|---|---|
| `playbook/corpus-naming.md` | 15.3k | deciding whether a document NAMES the target (§7a) |
| `playbook/corpus-evidence.md` | 10.9k | writing a quote, grading, or a grade surprised you (§6) |
| `playbook/corpus-nodes.md` | 7.4k | MINTING a node, or re-opening something (§7c, §7d) |
| `playbook/corpus-route.md` | 7.1k | the bytes came by an unusual route (§7b) |
| `playbook/corpus-hosts.md` | 5.7k | a fetch failed or a host looks blocked (§6) |

**If you are wiring an ordinary edge off a document you fetched cleanly, you need none of them** —
§2 and §6-schema below are the whole binding set, and you open one of the five only when its
question actually arrives.

---

## 2. Standing rules — corpus lane

**3. A pointer is not a source.** WebFetch can fabricate content for a
dead URL — raw-verify before trusting any quote. This applies to a node's own
`description` as much as to a fetched page: a description naming a standard is a
lead to verify, not a citable basis.

**10. A `_dropped` entry describing an edge that DOES exist live must use
`reason: "caveat"` (or `"resolved"`), never any other reason** —
applies to every `DroppedReason`. Before finalizing any `_dropped`
entry, check its exact (source, target) against the WHOLE corpus's
live edges, not just this round's proposals. *(As of 2026-09-09 the check
sees `source_report_id`-shaped entries too, so a contradiction written in
that shape now FAILS where it used to be skipped — the rule got stricter,
not looser.)*

**11. Build the id-collision and edge-collision checks from the whole
corpus, not just `src/data/research/*.json`** — some ids/edges live
only in the hand-written seed files (`src/data/reports.ts`,
`src/data/dependencies.ts`).

**And scan for the EVIDENCE URL, not only the (source, target) pair** (round 8).
A URL you are about to mint on may already back live edges from other slices —
six did — and every grader run rewrites that URL's `evidence-cache/` record to
hold only the edges THAT RUN selected. Find them all first and pass them
together to `--edges`, or you silently destroy another edge's windows. One
record was clobbered in round 8 before the collision was noticed.

**12. A dependency edge between a node and its `part_of` container is a
validator ERROR.** Before minting, cross-check every new edge's
(source, target) against the corpus-wide `part_of` map in both
directions; drop matches as a `note`.

**13. A fresh, well-verified finding that contradicts an already-live edge
isn't automatically right.** Caveat the existing edge, defer the new
claim — don't silently override.

**14. Rule 10's mirror image is the one that bites: also check this
round's new EDGES against every OTHER slice's existing `_dropped`
notes.** Minting an edge some earlier round recorded as `no-document`
makes that note a lie, and validate fails on it. Read the older note
before assuming your new edge wins — it may have the better evidence.

**15. A page title is not evidence, and neither is a node description.** Read
the body, not just the title/heading. Round 8's Argentina case is the clean
example: `sdds.indec.gob.ar/nsdp.htm` is 966 bytes of JavaScript shell whose only
mention of the standard is its `<title>`, and that is a `_dropped` lead, not an
A.

**16. Eurostat's national reference metadata is the highest-yield source
for "which standard / which source" questions on an EU/EEA country.** The
filename patterns, the `hi3`/`hi4` split, the §18.1.1 "Weights" section and the
LFS Y/N page all live in `notes/techniques-2026-09-04.md` — they are a recipe and
they rot (FI moved from `hi4` to `hi3` on 2026-09-05), and a stale filename in a
playbook gets trusted where a stale filename in techniques gets re-probed. What
belongs here is only the ranking: **go to Eurostat's national metadata before the
NSI's own site.** There is no government-finance equivalent; for deficit/debt go
to the NSI's own EDP release page.

**19. Stamp every `basis` with WHO IS SPEAKING** (Thomas, 2026-09-07). The first
token of a basis is one of three, followed by a colon:

- **`SELF-DECLARED:`** — the document is published or authored by the SOURCE's own
  statistical system, and says the source follows the target. The strongest kind of
  edge there is: specific to the release, and still true if the target's membership
  list changes. Judge by AUTHORSHIP, not by host — Uzbekistan's own NSDS hosted on
  `documents1.worldbank.org` and Togo's own data portal on `opendataforafrica.org`
  are both self-declared.
- **`REGISTER:`** — the document is published by the TARGET's own publisher and
  records the relationship: a membership table, an adherence page, a press release
  announcing a subscription, a staff report classifying the country. First-party and
  real, but it evidences a MEMBERSHIP, not a methodology.
- **`THIRD-PARTY:`** — neither end published it. Weakest, whatever the quote.

**Why this is not a fourth grade.** `evidence_grade` measures whether the document
was READ and whether it NAMES the artefact — a property of the citation. All three
tiers can and do grade A on the same rules, correctly. What the grade cannot express
is that a register saying "country X is a subscriber" and a national methodology note
saying "this index is compiled under X" are different claims, and only the second is
what `methodology_depends_on` asserts. One greppable token at the head of the basis
separates them for every future round without refetching a single document, and it
changes no schema and no grade.

**Two consequences to act on, not just to know.** Prefer a self-declared document
even when a register would grade the same. And when writing a quote, prefer a
sentence that states a DEPENDENCY over one that states a STATUS: "compiled in
accordance with X" over "is a participant in X" — the round-7 ruling that dropped
six e-GDDS edges turned on exactly that distinction (a membership is not a
dependency), and the tag is what would have made the class visible four rounds
earlier.

**Coverage, so an absent tag is not misread: 302 edges are stamped** — 239 SELF-DECLARED,
63 REGISTER, 0 THIRD-PARTY, recounted from `src/data/research/*.json` 2026-09-09 (round 39).
*(This read 286 / 225 / 61 for part of one day, then 297 / 234 / 63 after round 38. Round 38 added 4
and the count moved by 11, so that earlier figure was already behind its own round when written — which is the paragraph's own
point, made twice now. Recount, do not trust either number: match `^(SELF-DECLARED|REGISTER|THIRD-PARTY):`
against the head of every `basis`.)* *(This read "172 edges are
stamped" from round 8 until the handoff-080 slow-layer sweep. The 172 was round 7's 101 tier
edges into `imf-e-gdds` / `imf-sdds` / `imf-sdds-plus` plus round 8's 71 NSDP edges, and it went
stale as later rounds stamped what they touched — which is the practice this paragraph asks for,
so the number was always going to drift. Recount from the data rather than trusting it.)*
Everywhere else an unstamped basis means NOT YET CLASSIFIED, never "unknown tier".
Stamp what you touch; nobody should run a corpus-wide stamping pass as a job of its
own. **This number goes stale faster than anything else in the file** — it is the
paragraph §4 step 5b should check first, because "unstamped means not yet
classified" only holds if the reader knows what is stamped.

**What round 39's two lines would remove: nothing here** — both are rulings that did not exist, and
one of them (the endpoint-field line) is a guard that now fails rather than a convention to
remember. The file is 22.3k and the pressure is unchanged: **§2 is still the only part of the
2026-09-09 restructure that stayed prose instead of becoming an index**, and it is where the next
cut goes.

**What round 38's two §6 lines would remove: nothing here, and the file under pressure is no longer
`notes/china-progress.md`** — it was split into a worklist and `notes/china-method-2026-09-09.md`
on 2026-09-09, 37.6k becoming 23.0k + 19.0k, and the redirect rule that had been buried in it is
now a §6 line above. The next candidate is this file's own §2, which is the only part of the
2026-09-09 restructure that stayed prose rather than becoming an index.

**What the two §6 lines added earlier on 2026-09-09 would remove: nothing here.** Both are rulings that did
not exist before, and §6 is one line per ruling by design. The file actually under pressure is
`notes/china-progress.md` — 37.6k, still both a worklist and a body of method, and round 37 made it
10k worse; `HANDOFF.md` §3 carries that as a job.

**What this replaced: nothing, and that is a considered answer** to §1's
say-what-you-would-remove rule. No existing rule covers who authored the evidence,
and the §6 bullets this sits beside are all live.


---


## 6. Known traps — index

**The schema traps stay in this file** (below) because every data change hits them. The rest are
one line each; open the file named at the end of the line for the evidence behind it.

### Evidence, quotes and grading → `playbook/corpus-evidence.md`

- `public/corpus-data.json` STRIPS `evidence_quote` — an edge read from it always looks unquoted.
- Take grade counts from `npm run validate`, never from `public/corpus-data.json`.
- `evidence_quote` IS the span — never run it through `extractQuotedSpans`.
- Single quotes are not a span delimiter, and 476 live edges quote with them.
- A node's TITLE is a matcher input, not just a label (≥60% contiguous run).
- `normalizeForMatch` runs NFKD, so Unicode numeral and ligature forms fold to ASCII.
- Bytes that did not come from the cited URL on the live host cannot make an A.
- An archived snapshot may rescue a WALL; it must never rescue a 404.
- `--write` has NO "improvements only" guard — diff old vs new `--offline` before any write.
- Every grader run rewrites each URL's `evidence-cache/` record, dry run or not, keeping only
  the edges THAT run selected.
- **`_dropped` entries come in THREE shapes, not two** — a scan reading one misses the others. The
  endpoints are normalised at the LOADER since 2026-09-09, so anything reading `droppedNotes` sees
  one shape; **a script of your own reading the JSON directly does not get that** and must handle
  all three.
- A title's parenthetical only counts as its acronym if it abbreviates the title head.
- The grader's A bar reads presence, not meaning — it once graded A on a NEGATED sentence.
- Your own basis prose can cap your edge (`WEAK_BASIS_PATTERNS`: consistent / aligned / …).
- An ASCII substitution for a typographic character makes a stored quote read as MISSING.
- A bare product number in `title_aliases` only reaches the grader by the `product-number` path.
- A PDF is read THREE ways and the best reading wins — so when a quote fails on a PDF, **run the
  grader before opening anything**: it grades against all three renderings and keeps the best, and
  a line break inside a word is usually resolved there. Only if it still fails is the reasoning
  worth reading. *(Sharpened 2026-09-09: the line said the rule existed but not what it decides,
  and round 31 hit exactly this case and resolved it by running the grader anyway.)*
- `namesTarget`'s acronym branch cannot see a mixed-case parenthetical — `(SDDS Plus)` never fires.
- **`MIN_SPAN` is 10 characters for a mostly-CJK span and 24 otherwise** — a 9-character Chinese
  title grades **B `no-quoted-span`** off a document that reads perfectly and names the target in
  full. Widen the stored span past the floor rather than re-reading the document (round 38).
- **A DEPENDENCY USES `source_report_id`/`target_report_id`; `source`/`target` is the `_dropped`
  note shape.** Writing an edge with the note's key names produced five lines of
  `undefined->undefined` under "edges pointing at reports not yet researched" and **validate exited
  0 having discarded all five** (round 39). Now a MALFORMED EDGES error naming the missing field.
- **Never edit a `basis` or a quote to move a grade.**

### Claims about the world that are really claims about your tools → `playbook/corpus-hosts.md`

- "The sandbox can't read it" and "the site is walled" are different claims — say which machine.
- A 404 from a single-page-app route is not link rot.
- A "ROBOTS_DISALLOWED" verdict is a statement about the FETCH TOOL, not the site.
- A blocked verdict decays — re-probe before believing your own notes.
- WebFetch cannot produce evidence-grade verbatim (~125-char cap).
- A page's DECLARED CHARSET is honoured since 2026-09-08; before that a gb2312 page was not read
  as a bad quote, it was not read at all.
- `namesTarget` strips ASCII parentheses BEFORE matching, so a non-Latin name living only inside
  them is invisible to EVERY door including the CJK one. **The class is unswept.**
- A `HOST_INDEX_PREFIXES` entry is a PREFIX unless it says `exact: true`, and it will swallow real
  documents living beneath it.
- The August 2026 bulk imports carry import habits worth knowing — grep before trusting.
- **A SMALL BODY IS A REDIRECT — read it, never record the byte count as a verdict.** A 71-byte,
  625-byte or 954-byte 200 is a `window.location`, a `<p id="url">` in a hidden div, or a meta
  refresh, and the thing you were looking for is one `cat` away. Cost so far: one province recorded
  as an empty shell for a round, and NBS's whole 国家统计标准 listing missing from a tracker.
  *(Restated here 2026-09-09 when `notes/china-progress.md` was split — it binds every fetch, not
  just a Chinese one. Full account: `notes/china-method-2026-09-09.md`.)*
- **An archive that extracts to nothing is not an empty archive.** `unzip` exits non-zero on a mere
  warning and that used to abort the grader's whole zip branch; a zip of `.docx` was invisible to it
  besides. Both fixed 2026-09-09 — recipe and diagnostics in `notes/techniques-cn-yearbooks-2026-09-08.md`.
- A `.docx` read through `stripHtml` gets a SPACE at every Word run boundary, so the one-text-node
  quote rule applies to Office documents exactly as it does to HTML.

---

## 7. Standing decisions — index

**Bar for adding: a rule that will change how a FUTURE round decides something**, not a record of
one specific edge's fate — the data's own `_dropped`/live entry is that record.

### 7a. What counts as naming the artefact → `playbook/corpus-naming.md`

- Naming the AGENCY is not naming the artefact. *(The most-cited refusal in the corpus.)*
- Naming an ORGANISATION does not name the instrument that created it.
- "Consistent with" is a claim about numbers, not a citation.
- An index page is a bare homepage with a path.
- Assertion-only edges are `_dropped`, never live.
- Chart/figure-caption sourcing clears the bar and grades **A** — what carries it is the SOURCE
  LINE, not the chart.
- A methodology table cell naming a source is caption-equivalent, grades **A**; it does NOT
  reopen agency-only table entries.
- A statistical agency's own product NUMBER names the artefact (three conditions).
- A nomenclature the document says is BASED ON the target names the target — **the document must
  state the derivation**, your own knowledge of it is not evidence.
- **The ISSUER named in the sentence decides the target, not the title.** A provincial yearbook
  saying 上海市统计局制定的《固定资产投资统计报表制度》 names the PROVINCE's instrument, which is a
  mint lead, not the identically-titled NBS node. Two of Shanghai's four exact title matches were
  its own (round 39). Read the words before the 《.
- A document naming the target IN ANOTHER LANGUAGE names it (mechanism: `title_aliases`).
- A parenthetical acronym names it at ≥4 characters AND only if it glosses the WHOLE title.
- A node carries the PUBLISHER's own title for the artefact, not ours.
- **CLOSED, do not re-derive per country:** the ICLS class; DGDDI's monthly bulletin.

### 7b. What the route does to the grade → `playbook/corpus-route.md`

- A backfilled `evidence_quote` needs a reader's acceptance, with a written reason per refusal.
- A read in Thomas's own Chrome is a DIRECT read; only an archived snapshot caps at B.
- An archived copy caps at B. General rule for every future fetch strategy.
- **A first-party ZIP is a direct read, not a capped route** (2026-09-08) — name the inner path
  in the basis.
  *(The reader could not actually honour this until 2026-09-09: it walked html/txt/csv/md only, so a
  yearbook shipped as a zip of `.docx` graded C on `empty:no-extractor`. Two provinces publish that
  way. Fixed; the rule did not change.)*
- A token-served PDF is cited to the LANDING page, `via: token-pdf`, caps at B.
- On a NEW edge the grader outranks the hand grade — name its reason string in the basis.
- A re-grade never writes a grade DOWN on a bad network day.

### 7c. What is and is not a node → `playbook/corpus-nodes.md`

- Treaty and agreement nodes: retired, do not re-import.
- A node's `publisher` is a body, not a derivation note.
- A legal instrument IS a legitimate node when a release names it as its own basis.
- Analytical meta-nodes: 5 retired, sweep deliberately stopped — **do not extend by keyword**.
- **Never sweep the "— high/low-poverty contrast" nodes.** They are real jurisdictions.
- A country may carry TWO tier edges (REGISTER + SELF-DECLARED); both stay, no dedupe pass.

### 7d. Parked and closed → `playbook/corpus-nodes.md`

- `diary.csv` moved to `PLAYBOOK.md`; cadence lives in validate's CADENCE block.
- `proposed:` domain tags: settled 2026-09-06, do not reopen.
- One-off scope calls already decided — Iran's SNA vintage, the generic MFSM citation, PH EBEIS
  node-scope, the TW SIPRI direction mismatch, NACE Rev.2, and generic COICOP (all three edges
  dropped `no-document` 2026-09-08).

---

### Schema and closed unions

- **`RelationshipType` is a closed 5-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `legal_basis` / `cites`).
  *(Corrected 2026-09-06 — this bullet said "4-value" and omitted `legal_basis`
  since the split; `types.ts` is the authority and ~10 live edges, the Japan
  Statistics Act family among them, already use it. An agent trusting the old
  count would have dropped a legitimate statutory edge.)* An off-union value →
  NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation` is
  only `audits`/`supersedes`. Same for `Domain` and every closed union: check
  `types.ts` before inventing a value, cast rather than parse.
- **`jurisdiction_level` has no "national" value.** The union is
  `international, supranational, federal, provincial, municipal,
  institutional` — a unitary country's national publisher is `"federal"`.
  Passes JSON parsing, fails only at `npm run validate`. Hit 4/4 times on the
  first pass of one round.
- **`reference_period` is a structured `{readings_per_year, window_months,
  ends}` object**, not free text. 11 edges failed validation for this in one
  round.
- **`_dropped` entries come in THREE shapes and the loader now normalises two of them.**
  `normalizeDroppedNote()` in `src/data/assembleCorpus.ts` is the only place this happens, and it
  reads `n.source ?? n.source_report_id ?? null` (the `?? null` is load-bearing — `null ?? undefined`
  is `undefined`, and a caveat with a deliberately null endpoint must keep failing the check that
  exists to catch it). The shapes:
  - `edge` / `source` / `target` — **the intended shape; write new notes this way.** 2,966 of them.
  - `source_report_id` / `target_report_id` — 17 of them, first written 2026-09-07 and copied by
    every CN round for two days. **Read correctly since 2026-09-09** (Thomas: *"teach the
    validator"*), and `validate` prints a `DROPPED-NOTE SHAPE` block naming them so the repair is
    visible. **The 17 files are not to be rewritten.** *(What it cost while unread: `validate`
    exited 1 on the one `resolved` entry in this shape, reporting `undefined -> undefined` about a
    note that was correct — and `disclosureByReport` skipped all 15 of them, understating five
    reports' disclosure counts in the app. The fix went at the loader for that second reason.)*
  - `report_id` / `candidate_target` — 27 of them, **endpoint-free by design**, and normalisation
    correctly gives them null endpoints. They stay `reason: "note"` permanently; prepend
    "RESOLVED …" to the `note` instead of tagging one `"resolved"`, which would then fail the
    null-endpoint check exactly as it should.


