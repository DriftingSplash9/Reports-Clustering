# Corpus — evidence, quotes and grading

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** you are writing a quote, running `grade-evidence.ts`, reading a grade you did not expect,
or about to `--write` — questions about how the TOOL behaves. **Whether a citation counts at all is
`corpus-naming.md`; what the ROUTE does to the grade is `corpus-route.md`.**

**THE BOUNDARY, so nothing lands in the wrong file again** (stated 2026-09-11, after three entries had):
**`corpus-naming.md` is POLICY — what counts as a citation at all, and it would be true if the grader did not
exist.** **`corpus-evidence.md` is MECHANICS — how the grader and the matchers actually behave.**
**`corpus-route.md` is what the ROUTE the bytes came by does to the grade.** **`corpus-hosts.md` is what a
failed fetch does and does not prove.** **`corpus-nodes.md` is what is and is not a node.** If an entry would
still be true with no tooling at all, it is policy; if it explains why a tool did something, it is mechanics.

**You do not read this by default.** `PLAYBOOK-CORPUS.md` carries a one-line index of everything
below; it tells you a ruling exists and what it decides, and you come here for the reasoning only
when it binds the question in front of you. If a grade surprises you, the answer is almost certainly here.

---

## 6. Known traps

**This section is for traps that change a decision on any corpus task.**
Recipes for a particular job live in `notes/techniques-2026-09-04.md`; which
hosts answered which machine on a given day lives in
`notes/routing-snapshot-2026-09-04.md`, and is expected to be wrong. The
verbatim pre-split §6 — every war story, every dated host reading — is at
`archive/playbook/PLAYBOOK-2026-09-04-1938-pre-split.md`.

**Admission bar, and it is now enforced: a bullet belongs here only if an
agent who never reads it will make a WRONG DECISION, on a task it was not
expecting.** A recipe goes to techniques. A host reading goes to the routing
snapshot. A trap now guarded in code gets one line naming the guard. An
unapplied finding lives in `HANDOFF.md` until Thomas rules on it, and moves
here only as a rule, once.

### Evidence, quotes and grading

- **`public/corpus-data.json` STRIPS `evidence_quote`**, so an edge read out of
  the generated corpus always looks unquoted. Twelve edges were worked as
  unquoted in one round and already had a quote. Read the slice JSON in
  `src/data/research/` before concluding an edge has none — or before writing
  over one.
- **Take grade counts from `npm run validate`, never from
  `public/corpus-data.json`** — the generated file holds the 347 research
  slices and misses the ~10 edges in the hand-written seed files (rule 11), so
  mixing the two produces a grade line that does not sum to the corpus.
- **`evidence_quote` IS the span — never run it through `extractQuotedSpans`.**
  That helper pulls out DOUBLE-quoted text, which is right for free-text
  `basis` and wrong for a field whose whole content is the quote; for six weeks
  the grader could not read back its own output. Anything checking an edge
  against its document goes through `spansForEdge`.
- **Single quotes are not a span delimiter and most of this corpus quotes with
  them** — deliberately, because apostrophes are ambiguous. An edge whose
  `basis` quotes in single quotes reads as "no quoted span" and caps at B. 476
  live edges were in that state. Look at the `basis` yourself before concluding
  an edge has no checkable evidence.
- **A node's TITLE is a matcher input, not just a label.** `namesTarget` needs a
  contiguous run of ≥60% of the title's words, and the title-lead fallback needs
  ≥3 words before the first dash/comma/colon. A long descriptive title fails
  silently and looks like missing evidence — BIS's six-word page title would
  score 2/6, which is why the node is titled `Basel III`. This does not license
  inventing titles (§7 still holds); it means **check the run arithmetic when a
  publisher offers both a short name and a long one.**
- **`normalizeForMatch` runs NFKD, so Unicode numeral and ligature forms fold to
  ASCII** — `Ⅲ` (U+2162) becomes `III`. Useful, and a trap: `바젤Ⅲ` normalizes to
  the single token `바젤iii`, and since Hangul and Latin are both `\p{L}` there
  is no split for the ≥2-word run rule to use.
- **`--write` has NO "improvements only" guard** (2026-09-05): it writes
  whatever the run returns, and §7's "a re-grade never writes a grade DOWN" is
  a process rule, not code. It wrote a B down to C the first time a matcher
  change was tried that day. Before any `--write` on already-graded edges, run
  the OLD code and the NEW code `--offline` on the same store and diff; put
  only the edges that went UP in the write selection.
- **Every grader run rewrites the `evidence-cache/` record of each URL it
  touches — dry run or not — and labels the windows with THAT run's grade, and
  the rewritten record holds ONLY the edges that run selected.** A dry run on a
  held edge leaves a committed record saying "[A …]" beside a slice that says
  B; grading one new edge on a URL that already backs three others leaves a
  record with one window where there were four. Select every live edge on the
  URL (2026-09-05), restore untouched records from the transport zip before
  committing, or run the write pass last.
- **`_dropped` entries come in two shapes**: `source_report_id`/
  `target_report_id`, and `source`/`target` (+ an `edge` string). A collision
  scan that reads only the first misses the second; validate then fails on a
  `no-document` note from an older round (rules 10/14). Read both.
- **A title's parenthetical only counts as its acronym if it abbreviates the
  title head** — `acronymFitsHead()` in `grade-evidence.ts` (2026-09-05).
  "(ESA 2010)" on the 31 "National accounts (ESA 2010)" nodes and "(2016)" on
  the MFSM manual used to name the release for any document that mentioned
  the standard. Foreign-language acronyms on English titles (RPJMN, EICV4) no
  longer count either — that is `title_aliases` territory.
- **The grader's A bar reads presence, not meaning** (found 2026-09-05): it
  awarded A on "Classifications … are *not in conformity* with … ISIC".
  `NEGATED_QUOTE_PATTERNS` (denies / diverges / defers / hedges) now caps such
  quotes at B and `--scan-quotes` lists them without network; but a new
  phrasing the guard has not seen still grades A. Read the quote, not the grade.
- **Your own basis prose can cap your edge.** `WEAK_BASIS_PATTERNS` matches
  anywhere in the basis — "the EH is the *complementary* annual source" turned
  an A into a B twice on 2026-09-05. Never write consistent / complementary /
  comparable / aligned / presumably in a basis, even descriptively.
*(Both bullets lived in `PLAYBOOK-RENDER.md` §6 until 2026-09-06 — filed where
the lane that needs them never reads. Moved, not copied.)*

- **An ASCII substitution for a typographic character makes a stored quote read as
  MISSING, not as a near miss** (found three times in one round, 2026-09-06). The
  Guinea SNDS quote used `'` where the PDF has U+2019; two SOR/2007-303 quotes wrote
  `(x 1,000)` where the regulation has `(× 1,000)`, U+00D7. All three had passed an
  earlier review. Nothing downstream can tell a non-matching quote from an absent
  one, so these look like unquoted edges forever. **When a quote "isn't in the
  document", diff it character by character before concluding anything** — and when
  writing one, copy the span out of the extracted text rather than retyping it.
  Candidates to sweep: any quote containing `(x 1,000)`, a straight apostrophe next
  to a letter, or straight double quotes.

  **The same failure arrives from the reader's side, and it is commoner** (round 8):
  **the grader's html extractor does not decode HTML entities.** A span copied out of
  a correctly rendered page reads `Fund’s` where the stored text holds
  `Fund&rsquo;s`, so the quote returns `partial-quote` at coverage 0.78-0.86 rather
  than absent — near enough to look like a bad quote, far enough to lose the A. Three
  round-8 edges (GE, HU, MA) were re-cut around the entity and all three then matched
  at 1.00. **So when writing a quote, prefer a span with no apostrophe, dash or quote
  mark in it at all** — ending the span before the punctuation is cheaper than
  diffing it afterwards. Watch for U+200B too: one sat invisibly inside Mauritius's
  sentence and would have done the same.

- **A `title_aliases` entry that is a bare product number only reaches the grader
  through the `product-number` path in `namesTarget`** (added 2026-09-06 evening,
  guarded by a selftest). Before it, a one-token alias could never fire — the run
  rule needs two words — and the three round-4b table-number A's were written by
  hand with no grader record. The path is aliases-only, ≥8 characters, ≥2
  hyphen-separated digit groups, word-bounded, and runs only after every other
  door has failed; it can only add matches.

- **A PDF is read THREE ways and the best reading wins** (2026-09-06, Thomas's
  ruling on round 5's matcher finding; guard is `Fetched.alt2Text` and the
  rendering loop at the foot of `gradeEdge`). `pdftotext -layout`, pdf.js, and
  plain `pdftotext` — the last is the only one that rejoins a word the typesetter
  broke across a line with a hyphen, which is why a two-column book's own sentence
  used to grade `partial-quote`. Two things it changes for a round: a PDF's
  committed `evidence-cache/` header now carries `alt2-extractor` /
  `alt2-text-chars`, and **a CACHED `.evidence-fulltext/` record has no third
  rendering at all** — an offline re-grade of the old store sees none of this, so
  `--refetch` is what gets it. Additive by construction: it can only add matches.

- **`namesTarget`'s acronym branch cannot see a mixed-case parenthetical** (found
  round 8, not fixed — it is a matcher change and Thomas's call). The test is
  `/^[\p{Lu}\p{N}][\p{Lu}\p{N}.\- ]*$/`, so `(SDDS)` fires and `(SDDS Plus)` never
  can: the lower-case "lus" disqualifies it. For any node whose acronym carries a
  lower-case word the only door left is a run of ≥60% of the title's words. Twelve
  round-8 edges sit at B on `agency-not-artefact` because the country's page prints
  "SDDS Plus" in its own heading and never writes the words out. **Do not read that
  grade as thin evidence** — check whether this is the cause before spending a round
  re-reading the document.

- **Never edit a `basis` or a quote to move a grade.** If an evidence record is
  graded down by a matcher defect, fix or report the matcher. Trimming the
  record is grade-motivated editing and it hides the defect from everyone after
  you.

---

## Moved here 2026-09-11 from `PLAYBOOK-CORPUS.md`'s index

**Rounds 38-45 wrote full reasoning straight into the §6/§7 index lines**, which the 2026-09-09 split had
just emptied — seventeen entries across the two sections had grown back into essays and carried 37% of that
file. They are below, **byte-for-byte as they stood**, and the index now carries one line each pointing here.
*(Thomas, 2026-09-11, on being shown the measurement: "do it". Full account: `notes/doc-audit-2026-09-11.md`.)*

### The `_dropped` note shapes — the account

- **`_dropped` entries come in THREE shapes, not two** — a scan reading one misses the others. The
  endpoints are normalised at the LOADER since 2026-09-09, so anything reading `droppedNotes` sees
  one shape; **a script of your own reading the JSON directly does not get that** and must handle
  all three. **AND THE THIRD SHAPE IS A BLIND SPOT NO CHECK COVERS** (found 2026-09-09 by a
  verification pass, not by `validate`): `normalizeDroppedNote` reads `source`/`source_report_id`
  only, so a `report_id`/`candidate_target` note gets NULL endpoints and the contradiction check
  skips it — **a note saying "NO EDGE" for a pair you have just minted will pass validate silently.**
  Rule 14's check has to be run BY HAND against this shape, reading the raw JSON. One such note
  existed (Xi'an → GB/T 4754, round 31) and was found only because the round's own work was
  independently re-read.

### A PDF is read three ways

- A PDF is read THREE ways and the best reading wins — so when a quote fails on a PDF, **run the
  grader before opening anything**: it grades against all three renderings and keeps the best, and
  a line break inside a word is usually resolved there. Only if it still fails is the reasoning
  worth reading. *(Sharpened 2026-09-09: the line said the rule existed but not what it decides,
  and round 31 hit exactly this case and resolved it by running the grader anyway.)*

### A dependency uses `source_report_id`, not the note shape

- **A DEPENDENCY USES `source_report_id`/`target_report_id`; `source`/`target` is the `_dropped`
  note shape.** Writing an edge with the note's key names produced five lines of
  `undefined->undefined` under "edges pointing at reports not yet researched" and **validate exited
  0 having discarded all five** (round 39). Now a MALFORMED EDGES error naming the missing field.

### `.docx` run boundaries put a space inside a title

- A `.docx` read through `stripHtml` gets a SPACE at every Word run boundary, so the one-text-node
  quote rule applies to Office documents exactly as it does to HTML. **And a publisher's export can
  split its OWN title that way** — NBS's WPS files render 农林牧渔业 统计报表制度 on the cover, which
  `namesTarget` cannot see (round 44; three honest B `quote-found-target-not-named` edges).

### The three `_dropped` shapes — schema account

- **`_dropped` entries come in THREE shapes and the loader now normalises two of them.**
  `normalizeDroppedNote()` in `src/data/assembleCorpus.ts` is the only place this happens, and it
  reads `n.source ?? n.source_report_id ?? null` (the `?? null` is load-bearing — `null ?? undefined`
  is `undefined`, and a caveat with a deliberately null endpoint must keep failing the check that
  exists to catch it). The shapes:
  - `edge` / `source` / `target` — **the intended shape; write new notes this way.** The great
    majority; **count them, never quote a figure.**
  - `source_report_id` / `target_report_id` — **15 of them** *(read "17" until 2026-09-10, while
    contradicting itself two sentences later; `notes/doc-audit-2026-09-10.md` §2)*, first written
    2026-09-07 and copied by
    every CN round for two days. **Read correctly since 2026-09-09** (Thomas: *"teach the
    validator"*), and `validate` prints a `DROPPED-NOTE SHAPE` block naming them so the repair is
    visible. **Those 15 files are not to be rewritten.** *(What it cost while unread: `validate`
    exited 1 on the one `resolved` entry in this shape, reporting `undefined -> undefined` about a
    note that was correct — and `disclosureByReport` skipped all 15 of them, understating five
    reports' disclosure counts in the app. The fix went at the loader for that second reason.)*
  - `report_id` / `candidate_target` — **endpoint-free by design**, and the fastest-growing shape.
    **Count, do not quote** *(this bullet's "27" was 55 nine days later)*. Normalisation
    correctly gives them null endpoints. They stay `reason: "note"` permanently; prepend
    "RESOLVED …" to the `note` instead of tagging one `"resolved"`, which would then fail the
    null-endpoint check exactly as it should.

### Rule 19 — why the tier is not a fourth grade

*(Moved out of `PLAYBOOK-CORPUS.md` §2 on 2026-09-11; the three tokens and the two consequences stay there.)*

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

**Coverage, so an absent tag is not misread: THIS FILE NO LONGER STATES THE FIGURE.** Recount it —
match `^(SELF-DECLARED|REGISTER|THIRD-PARTY):` against the head of every `basis` in
`src/data/research/*.json`. *(Stated a figure until 2026-09-10 and was found stale THREE times;
the four wrong numbers and why they were inevitable are in `notes/doc-audit-2026-09-10.md` §1.)* *(This read "172 edges are
stamped" from round 8 until the handoff-080 slow-layer sweep. The 172 was round 7's 101 tier
edges into `imf-e-gdds` / `imf-sdds` / `imf-sdds-plus` plus round 8's 71 NSDP edges, and it went
stale as later rounds stamped what they touched — which is the practice this paragraph asks for,
so the number was always going to drift. Recount from the data rather than trusting it.)*
Everywhere else an unstamped basis means NOT YET CLASSIFIED, never "unknown tier".
Stamp what you touch; nobody should run a corpus-wide stamping pass as a job of its
own. **This number goes stale faster than anything else in the file** — it is the
paragraph §4 step 5b should check first, because "unstamped means not yet
classified" only holds if the reader knows what is stamped.

### Moved here 2026-09-11 — filed on the wrong side of the boundary

*(The §6/§7 split of 2026-09-09 cut these files by SECTION NUMBER, not by question, so a few entries
landed in the wrong one. Boundary now stated at the top of each file. `notes/doc-audit-2026-09-11.md`.)*

### `namesTarget` strips ASCII parentheses before matching

- `namesTarget` strips ASCII parentheses BEFORE matching, so a non-Latin name living only inside
  them is invisible to EVERY door including the CJK one. **The remedy is `title_aliases`, and it
  bites hardest on PUBLICATION nodes titled `English Name (中文名)`** — five China publication nodes
  gained their Chinese alias in round 44 after a Chinese-only document naming them in full graded
  `target-not-named`. It had gone unnoticed because provincial yearbooks are bilingual and matched on
  the English title. **Check the alias before writing a non-Latin quote against an English-titled node.**


## A title-lead or alias containing ANY abbreviation can never fire (2026-09-15, widened 2026-09-16)

**Measured, on one edge, and the mechanism is general.** `esa-2010 -> nace-rev2` was quoted from
ESA 2010's own Annex A — *"The classification used for grouping local KAUs into industries is the
NACE Rev. 2."* — coverage 1.0, the target named in full inside the quote as any reader would
judge it. It graded **B `artefact-named-elsewhere-in-document`**.

`nace-rev2`'s title is `NACE Rev. 2 — Statistical Classification of Economic Activities in the
European Community`. The run rule needs about seven contiguous words of that title and the window
has three, so the only door open is `title-lead`: the clause before the em dash, matched whole.
And `title-lead` is the one door that compares two differently-processed strings.

- The needle goes through `tokenise`, whose last step strips a leading or trailing `.`, `-` or `/`
  off every token: `NACE Rev. 2` becomes `nace rev 2`.
- The haystack goes through `normalizeForMatch` only, which folds accents, quotes, dashes and
  whitespace and **keeps full stops**: the body reads `nace rev. 2`.
- `hay.includes('nace rev 2')` is then false against a document that says exactly that.

So **any node whose title-lead contains an abbreviation with a full stop — `Rev.`, `No.`, `Vol.`,
`Ed.`, `Art.` — cannot be named through that door**, whatever the document says. The whitespace-
insensitive second pass does not rescue it: it squashes spaces, not punctuation, so the needle is
`nacerev2` and the haystack `nacerev.2`.

**The remedy is a span carrying enough of the full title, not a doctored quote or a doctored
title.** On the measured case the fix was a second fragment from Annex A 1.19 naming the
classification in full, which cleared the run rule at eight of twelve words and took the edge to A.
The alternative remedy — a `title_aliases` entry spelled without the stop — was NOT taken: an alias
is for a name the publisher actually uses, and inventing `NACE Rev 2` to satisfy a matcher is the
shape `PLAYBOOK-CORPUS.md` forbids when it says never edit to move a grade.

**One thing this case also turned up, worth knowing before trusting a run-rule match on that
node:** ESA 2010 writes the name as *"Statistical classification of economic activities in the
European **Union**"* while the node carries *"European **Community**"*, which is Regulation (EC)
No 1893/2006's own wording and the correct title. The eight shared words clear the 60% bar, so it
costs nothing there — but a shorter span of that name would land on the wrong side of it.

*(Add-and-remove, `PLAYBOOK.md` §1: this adds one index line to `PLAYBOOK-CORPUS.md` §6 and this
section here. Nothing was removed, and the honest reason is that nothing in §6 is stale — the
section was cut to index lines on 2026-09-11 and this is the first addition since. If it needs
paying for later, the candidate is the pair of `_dropped`-shape lines, which the schema block at
the end of that file already states in full.)*

### Widened 2026-09-16: it is not just the title-lead, and not just `Rev.`

Two more edges hit this within a day of it being written down, which is why the §6 line now says *any*
abbreviation rather than listing three.

- **`uz-oked -> nace-rev2`.** Uzbekistan's statistical office states its classifier is 'based on NACE
  rev. 2'. Same `Rev.` failure as the ESA case, in a different country, on a different continent —
  and this time there was **no rescue span**: no Uzbek document writes NACE's full statutory title,
  so the edge is capped at B on evidence a reader would call A.
- **`uz-national-accounts -> uz-coicop`.** This one is the important variant, because it was NOT the
  title-lead. The node's own title is spelled out in full; the failing match was a **`title_aliases`
  entry**, `COICOP Rep. of Uzb. 2018`, carried verbatim from the publisher. Aliases go through the
  same `tokenise` as the title, so **an alias is exactly as vulnerable**, and an alias copied
  faithfully from a document is if anything MORE likely to carry abbreviations than a node title an
  editor wrote out.

**So the rule is about the matcher, not about titles.** Any name — title, title-lead, or alias —
that contains a word ending in a full stop cannot be matched through the run or lead doors against a
document that writes it the same way. Adding more aliases does not help; adding a
stop-less alias would be editing to move a grade.

**What to do:** check for a full stop in the name before predicting a grade, look for a span carrying
the fullest form of the title the document offers, and if there is none, write the B and say why in
the basis. Three of these are now recorded with that reasoning; a fourth should not need re-deriving.

*(One prediction in the same round went the other way and is worth the same shelf space:
`uz-national-accounts -> un-cofog-1999` was hand-graded B on the theory that a DROPPED word — the
document writes 'Classification of Functions of Government' against the node's 'Classification of
the Functions of Government' — would break the contiguous run below 60%. It graded **A**. The run
rule tolerates a dropped word better than assumed. Check `namesTarget` rather than guessing.)*
