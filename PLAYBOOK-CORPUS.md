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
harder to trust than one that says what it got wrong — but keep the MARKER here and the ACCOUNT in
the audit note (2026-09-10), or the sweep becomes how this file grows. It is swept every fifth
handoff, with everything else (`notes/handoff-procedure.md` step 5).

---

## 0. What this file is, and where the rest lives

**This file is the always-read part plus an INDEX. The reasoning lives in `playbook/`.**
Knowing a rule EXISTS is mandatory; reading WHY is on demand — to avoid re-raising a settled
question you only need to know it is settled and where it lives.

**AN INDEX LINE IS ONE LINE.** If an entry needs a second sentence of justification, the
reasoning goes to the `playbook/` file that owns it and the line points there. **The one stated
exception is the schema block at the end of §7** — the closed unions and the `_dropped` shapes are
carried in full here, because every data change hits them and a pointer would be read too late. *(The rule that
keeps this file from regrowing, added 2026-09-11 after it did exactly that: the 2026-09-09 split
emptied §6/§7 and rounds 38-45 wrote full prose straight back into them until seventeen entries
carried 37% of the file. Same story as the add-and-remove ledger, cut twice. A sweep that only
cuts, without a rule that stops the regrowth, buys one handoff.)*

**Section numbers never change**, so every `PLAYBOOK §6` / `§7a` cross-reference in the repo, in
code comments and in `notes/` still resolves — to a line that points one file onward.

| file | k | read it when |
|---|---|---|
| `playbook/corpus-naming.md` | 18.6k | deciding whether a document NAMES the target (§7a) |
| `playbook/corpus-evidence.md` | 18.1k | writing a quote, grading, or a grade surprised you (§6) |
| `playbook/corpus-nodes.md` | 10.9k | MINTING a node, or re-opening something (§7c, §7d) |
| `playbook/corpus-hosts.md` | 9.5k | a fetch failed or a host looks blocked (§6) |
| `playbook/corpus-route.md` | 8.0k | the bytes came by an unusual route (§7b) |

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

- **`SELF-DECLARED:`** — published or authored by the SOURCE's own statistical system, and says the
  source follows the target. The strongest kind of edge there is. **Judge by AUTHORSHIP, not by host.**
- **`REGISTER:`** — published by the TARGET's own publisher and records the relationship: a membership
  table, an adherence page, a staff report. First-party and real, but it evidences a MEMBERSHIP, not a
  methodology.
- **`THIRD-PARTY:`** — neither end published it. Weakest, whatever the quote.

**Two consequences to ACT on.** Prefer a self-declared document even when a register would grade the
same. And prefer a sentence that states a DEPENDENCY over one that states a STATUS — "compiled in
accordance with X" over "is a participant in X"; a membership is not a dependency, and that distinction
dropped six e-GDDS edges in round 7.

**An unstamped basis means NOT YET CLASSIFIED, never "unknown tier".** Stamp what you touch; nobody
should run a corpus-wide stamping pass as a job of its own. **This file states no coverage figure** —
recount by matching `^(SELF-DECLARED|REGISTER|THIRD-PARTY):` against the head of every `basis`.
Why the tier is not a fourth grade, and the four wrong coverage figures this rule carried before the
figure was removed: `playbook/corpus-evidence.md`.

**Add-and-remove ledger (`PLAYBOOK.md` §1 asks for it).** **2026-09-11 removed 5.3k from this file and
added nothing**: seventeen §6/§7 index lines that had grown back into essays went to `playbook/`, rule 19's
reasoning went with them, and the three paragraphs that used to sit here counting what each round added are
gone — a ledger of "added, removed nothing" is itself the thing it complains about, and this is the second
time it has had to be cut. Anything a future round needs is in `notes/doc-audit-2026-09-11.md`.



---


## 6. Known traps — index

**The schema traps stay in this file** (below) because every data change hits them. The rest are
one line each; open the file named at the end of the line for the evidence behind it.

### Evidence, quotes and grading → `playbook/corpus-evidence.md`

- `public/corpus-data.json` STRIPS `evidence_quote` — an edge read from it always looks unquoted.
- Take grade counts from `npm run validate`, never from `public/corpus-data.json`.
- `evidence_quote` IS the span — never run it through `extractQuotedSpans`.
- Single quotes are not a span delimiter, and **many live edges quote with them** *(the "476" that
  stood here was round 5's backfill READ count, never a live count; `notes/doc-audit-2026-09-10.md` §3)*.
- A node's TITLE is a matcher input, not just a label (≥60% contiguous run).
- `normalizeForMatch` runs NFKD, so Unicode numeral and ligature forms fold to ASCII.
- Bytes that did not come from the cited URL on the live host cannot make an A. `playbook/corpus-route.md`.
- An archived snapshot may rescue a WALL; it must never rescue a 404. `playbook/corpus-route.md`.
- `--write` has NO "improvements only" guard — diff old vs new `--offline` before any write.
- Every grader run rewrites each URL's `evidence-cache/` record, dry run or not, keeping only
  the edges THAT run selected.
- **`_dropped`'s THIRD shape is a blind spot no check covers** — a "NO EDGE" note for a pair you just minted
  passes `validate` silently. **Run rule 14's check BY HAND against it.** Shapes: the schema block below.
  Account: `playbook/corpus-evidence.md`.
- A title's parenthetical only counts as its acronym if it abbreviates the title head.
- The grader's A bar reads presence, not meaning — it once graded A on a NEGATED sentence.
- Your own basis prose can cap your edge (`WEAK_BASIS_PATTERNS`: consistent / aligned / …).
- An ASCII substitution for a typographic character makes a stored quote read as MISSING.
- A bare product number in `title_aliases` only reaches the grader by the `product-number` path.
- A PDF is read THREE ways and the best reading wins — when a quote fails on one, **run the grader before
  opening anything**; a line break inside a word is usually resolved there. `playbook/corpus-evidence.md`.
- `namesTarget`'s acronym branch cannot see a mixed-case parenthetical — `(SDDS Plus)` never fires.
- **`MIN_SPAN` is 10 characters for a mostly-CJK span and 24 otherwise** — a 9-character Chinese
  title grades **B `no-quoted-span`** off a document that reads perfectly and names the target in
  full. Widen the stored span past the floor rather than re-reading the document (round 38).
- **A DEPENDENCY USES `source_report_id`/`target_report_id`; `source`/`target` is the `_dropped` note shape.**
  Now a MALFORMED EDGES error — it once discarded five real edges with `validate` exiting 0.
  `playbook/corpus-evidence.md`.
- **Never edit a `basis` or a quote to move a grade.**

### Claims about the world that are really claims about your tools → `playbook/corpus-hosts.md`

- "The sandbox can't read it" and "the site is walled" are different claims — say which machine.
- **An instrument's PUBLISHER decides which site to search, and getting it wrong hides the page for rounds.**
  Check the issuing form — a 令, a 规定, a 通知 — and who signed it. `playbook/corpus-hosts.md`.
- **A first-party page for a NATIONAL instrument may live on a PROVINCIAL bureau's site** — read the cover,
  not the domain (rule 19). Caveat the node when the issuer's own page was never found. `playbook/corpus-hosts.md`.
- A 404 from a single-page-app route is not link rot.
- A "ROBOTS_DISALLOWED" verdict is a statement about the FETCH TOOL, not the site.
- A blocked verdict decays — re-probe before believing your own notes.
- WebFetch cannot produce evidence-grade verbatim (~125-char cap).
- A page's DECLARED CHARSET is honoured since 2026-09-08; before that a gb2312 page was not read
  as a bad quote, it was not read at all.
- `namesTarget` strips ASCII parentheses BEFORE matching, so a non-Latin name living only inside them is
  invisible to every door. **The remedy is `title_aliases`** — check it before quoting a non-Latin document
  against an English-titled node. `playbook/corpus-evidence.md`.
- A `HOST_INDEX_PREFIXES` entry is a PREFIX unless it says `exact: true`, and it will swallow real
  documents living beneath it.
- The August 2026 bulk imports carry import habits worth knowing — grep before trusting.
- **A SMALL BODY IS A REDIRECT — read it, never record the byte count as a verdict.** A 71-, 625- or
  954-byte 200 is a `window.location`, a hidden `<p id="url">` or a meta refresh, and what you wanted is one
  `cat` away. `playbook/corpus-hosts.md`.
- **An archive that extracts to nothing is not an empty archive** — `unzip` exits non-zero on a mere warning.
  Fixed 2026-09-09. `playbook/corpus-hosts.md`.
- A `.docx` read through `stripHtml` gets a SPACE at every Word run boundary, so the one-text-node quote rule
  applies to Office documents as it does to HTML — **and a publisher's export can split its OWN title that way.**
  `playbook/corpus-evidence.md`.
- **A TRANSFER THAT STOPPED WITH BYTES ON DISK IS RESUMED, whatever its extension** — a partial body means
  progress, a dead host leaves none. `network:curl-28` on a big first-party document is worth one re-run before
  you believe it. `playbook/corpus-hosts.md`.
- **A legacy binary `.doc` is read since 2026-09-10, and a `.docx` under a `.doc` name with it** — an agency
  that attaches its instrument to an otherwise empty landing page is a shape, not an accident.
  `playbook/corpus-hosts.md`.

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
- **A citing sentence proves a TITLE was used; only the instrument proves who ISSUED it** (Thomas, 2026-09-09).
  Fetch the instrument before recording a look-alike or minting a provincial twin — and compare titles character
  by character, never by eye. `playbook/corpus-naming.md`.
- A document naming the target IN ANOTHER LANGUAGE names it (mechanism: `title_aliases`).
- A parenthetical acronym names it at ≥4 characters AND only if it glosses the WHOLE title.
- A node carries the PUBLISHER's own title for the artefact, not ours.
- **A document that DEFINES a series' unit or scope under a law names the law as its basis; a bureau REPORTING
  its legal-publicity work about the same law does not** (Thomas, 2026-09-10). The test is the sentence's
  SUBJECT: the statistic, or the bureau's activities. `playbook/corpus-naming.md`.
- **CLOSED, do not re-derive per country:** the ICLS class; DGDDI's monthly bulletin.

### 7b. What the route does to the grade → `playbook/corpus-route.md`

- A backfilled `evidence_quote` needs a reader's acceptance, with a written reason per refusal.
- A read in Thomas's own Chrome is a DIRECT read; only an archived snapshot caps at B.
- An archived copy caps at B. General rule for every future fetch strategy.
- **A first-party ZIP is a direct read, not a capped route** (2026-09-08) — name the inner path in the basis.
  `playbook/corpus-route.md`.
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
- **A revising NOTICE does not mint an edition** (Thomas, 2026-09-10). A citation DATED to the revision reaches
  the node; a bare title does not. Contrast a real new edition with its own number. `playbook/corpus-nodes.md`.

### 7d. Parked and closed → `playbook/corpus-nodes.md`

- `diary.csv` moved to `PLAYBOOK.md`; cadence lives in validate's CADENCE block.
- `proposed:` domain tags: settled 2026-09-06, do not reopen.
- One-off scope calls already decided — Iran's SNA vintage, the generic MFSM citation, PH EBEIS
  node-scope, the TW SIPRI direction mismatch, NACE Rev.2, and generic COICOP (all three edges
  dropped `no-document` 2026-09-08).

---

### Schema and closed unions

- **`RelationshipType` is a closed 5-value union** (`calculated_from` / `uses_data_from` /
  `methodology_depends_on` / `legal_basis` / `cites`). An off-union value → NaN edge weight → **NaN PageRank
  corpus-wide, silent and total**. `Relation` is only `audits`/`supersedes`. Same for `Domain` and every closed
  union: **check `types.ts` before inventing a value, cast rather than parse.** *(Said "4-value" and omitted
  `legal_basis` until 2026-09-06; `playbook/corpus-nodes.md`.)*
- **`jurisdiction_level` has no "national" value.** The union is
  `international, supranational, federal, provincial, municipal,
  institutional` — a unitary country's national publisher is `"federal"`.
  Passes JSON parsing, fails only at `npm run validate`. Hit 4/4 times on the
  first pass of one round.
- **`reference_period` is a structured `{readings_per_year, window_months,
  ends}` object**, not free text. 11 edges failed validation for this in one
  round.
- **`_dropped` entries come in THREE shapes and the loader normalises two of them.** `normalizeDroppedNote()`
  in `src/data/assembleCorpus.ts` is the only place it happens.
  - `edge` / `source` / `target` — **the intended shape; write new notes this way.**
  - `source_report_id` / `target_report_id` — 15 files, read correctly since 2026-09-09, **not to be rewritten.**
  - `report_id` / `candidate_target` — **endpoint-free by design**; they stay `reason: "note"` permanently —
    prepend "RESOLVED …" to the note rather than tagging one `"resolved"`, which would fail the null-endpoint
    check exactly as it should.
  **Count each shape, never quote a figure**, and see the §6 line above for the hand-check the third one needs.
  Account: `playbook/corpus-evidence.md`.


