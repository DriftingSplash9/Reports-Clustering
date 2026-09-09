# Corpus — evidence, quotes and grading

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** you are writing a quote, running `grade-evidence.ts`, reading a grade you did not expect, or about to `--write`.

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
- **Bytes that did not come from the cited URL on the live host cannot make an
  A**, however cleanly the edge clears every other bar — §7's archived-copy
  ruling, which every new fetch strategy inherits. A read in Thomas's own
  Chrome IS the cited URL and is not a second route (§7). Record WHICH route in
  the committed evidence record (`via:`).
- **An archived snapshot may rescue a WALL; it must never rescue a 404.** A
  wall says only that this machine could not read it. A 404 says the citation
  has rotted, which is exactly what the dead-URL debt list measures — grading it
  off an archived copy hides link rot behind a good grade.
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


