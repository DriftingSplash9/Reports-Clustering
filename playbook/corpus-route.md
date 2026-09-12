# Corpus — §7b, what the route does to the grade

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** the bytes did not come from a plain live fetch — a browser read, an archived copy, a
token URL, a zip — or the grader and your hand grade disagree. **This file owns every rule of the form
"how the bytes arrived caps the grade".**

**THE BOUNDARY, so nothing lands in the wrong file again** (stated 2026-09-11, after three entries had):
**`corpus-naming.md` is POLICY — what counts as a citation at all, and it would be true if the grader did not
exist.** **`corpus-evidence.md` is MECHANICS — how the grader and the matchers actually behave.**
**`corpus-route.md` is what the ROUTE the bytes came by does to the grade.** **`corpus-hosts.md` is what a
failed fetch does and does not prove.** **`corpus-nodes.md` is what is and is not a node.** If an entry would
still be true with no tooling at all, it is policy; if it explains why a tool did something, it is mechanics.

**You do not read this by default.** `PLAYBOOK-CORPUS.md` carries a one-line index of everything
below; it tells you a ruling exists and what it decides, and you come here for the reasoning only
when it binds the question in front of you. 

---

### 7b. What the route does to the grade

**A backfilled `evidence_quote` needs a reader's acceptance, and the reader
records a reason for every refusal** (Thomas ruled "an agent reviews by slice",
2026-09-03; executed the same day). The grader proposes; it never accepts its
own proposal, because an A that rests on "this script found a sentence it liked,
twice" is not evidence. The accept test is one question — *does this sentence,
in this document, say the source depends on the target?* — and a rejection is
written down with its reason, because the rejections are where the research debt
is measured. Round 4: 213 read, 106 accepted, 107 refused with reasons
(`Claude outputs/quote-backfill-review-2026-09-03.json`). Round 5: 476 read,
370 accepted, 106 refused (`quote-backfill-sq-review-2026-09-03.json`).

**A document read in Thomas's own Chrome grades as the direct read it is; only
an archived snapshot caps at B** (Thomas, 2026-09-04, ruling on the browser
pass). A snapshot says "this quote was in this document on <timestamp>" — a
copy, on a past date. A Chrome read is the cited URL, fetched live over
Thomas's own network, and the only reason the grader could not take it itself
is a JavaScript challenge curl cannot answer: a fact about the fetcher, not
about the document. The rule lives in `routeCapsGrade()` in
`scripts/grade-evidence.ts`, `via` is recorded either way, and the committed
`evidence-cache/` header carries the route, so a reader can always see where
the bytes came from.

**A document read from an archived copy caps at B** (Thomas, 2026-09-03,
ruling on round 3d's fetch strategies). An archived read supports "this quote
was in this document on `<timestamp>`", which is a weaker claim than "this quote
is in this document" — and once a grade is written the difference is invisible
on screen. One `A` must not mean two things. **General rule for every future
fetch strategy, not just the Wayback one**: bytes that did not come from the
cited URL on the live host cannot produce an A, however cleanly the edge clears
every other bar. 15 edges were capped the day it was ruled; the guard sits
after the A bar in `gradeEdge` with its own reason string
(`quote-found-artefact-named-via-snapshot`) so the class stays greppable if the
host ever becomes readable again. Consequence worth knowing: `writeGrades` only
writes `evidence_quote` on an A, so **a machine-written `evidence_quote` in this
corpus always means "found in the live document"**.

**A document a publisher ships only inside a ZIP is cited to the zip, and grades on
its merits — it is a direct read, not a capped route** (Thomas, 2026-09-08, ruling on
the Guangdong yearbook: *"why can't we point to a zip that is likely pointing to the url
too? I'd say that is proof"*). The two existing caps do not reach this case and the reason
each exists is the reason: `wayback` caps because the bytes are a COPY on a PAST DATE, and
the token-PDF below caps because the CITED URL IS DEAD TOMORROW. A permanent first-party
attachment served 200 from the publisher's own host is neither, and §7b's actual test —
bytes from the cited URL on the live host — is satisfied outright. Guangdong's yearbook is
published only as its CD-edition zip (`stats.gd.gov.cn/attachment/...zip`, linked from the
bureau's own landing page); four edges were minted on it and the grader returned A
`quote-found-artefact-named` on all four, reading inside the archive.

**Two conventions, because a zip is a COLLECTION and a page is not.** Citing an archive
says "this quote is somewhere in these N files", which is a loss of PRECISION, not of
authenticity — so **name the inner path in the `basis`** (`Inner path:
directory/13/brief-description.html`), and the extractor prefixes every entry with a
`[zip: <path>]` marker so the committed `evidence-cache/` record shows which file matched.
The mechanism is `extractZipDocs()`, the third of three zip branches in `grade-evidence.ts`
— `.docx` and `.xlsx` were already unzipped by the same fetcher, which is why "the grader
cannot read a zip" was never the objection it looked like. Archives also get their own wall
clock (`ARCHIVE_TIMEOUT_S`), keyed on the URL's extension, because a 21.5MB transfer does
not fit the 45s budget tuned for pages — a transfer that STALLS still dies on the old
schedule (`--speed-time`).

**A quote lifted from a PDF that a landing page serves only through a signed,
expiring token is cited to the LANDING PAGE and recorded as
`via: token-pdf <date>`, which caps the grade at B** (Thomas, 2026-09-04,
ruling on the 17 deferred BPS edges). Citing the token cites a URL that is
dead tomorrow; citing the landing page and quoting the PDF puts citation and
quote one step apart. Naming the route is what makes the pair honest, and the
B cap is the same treatment `wayback` gets for the same reason. General rule
for every agency that publishes this way, not just BPS.

**On a NEW edge the grader outranks the hand grade, and the basis says so**
(round 8). Writing a block by hand and then grading it is the normal shape for a
large mint, and the two will disagree: round 8's hand grades were 60 A / 5 B and
`grade-evidence.ts --slice` returned 45 A / 23 B / 3 C over the same 65 edges.
**Take the grader's verdict**, name its reason string in the basis so the downgrade
is auditable, and record a reader's ruling ONLY where its own fetcher failed —
never where it read the document and disagreed with you. The rule below protects an
EARNED grade from a bad network day; this one stops a hand grade being an opinion
that outranks a measurement.

**A re-grade never writes a grade DOWN on a bad network day.** Selecting an
already-graded edge and writing whatever comes back lets one DNS failure or one
Akamai mood destroy a grade earned from a good read. A re-grade pass writes only
improvements; regressions go to a dated JSON for a human, with the host and the
reason (round 4: 33 of them, none written). One refinement from round 5: when
the regression is `quote-not-in-document` on a document the grader **read in
full today**, the network is not the excuse — the quote written that round is
reverted (the field must mean "this span is in the cited document") and the
grade is left as it was. 29 reverted in round 5, listed with the reason.

---

## Moved here 2026-09-11 from `PLAYBOOK-CORPUS.md`'s index

**Rounds 38-45 wrote full reasoning straight into the §6/§7 index lines**, which the 2026-09-09 split had
just emptied — seventeen entries across the two sections had grown back into essays and carried 37% of that
file. They are below, **byte-for-byte as they stood**, and the index now carries one line each pointing here.
*(Thomas, 2026-09-11, on being shown the measurement: "do it". Full account: `notes/doc-audit-2026-09-11.md`.)*

### A first-party ZIP is a direct read

- **A first-party ZIP is a direct read, not a capped route** (2026-09-08) — name the inner path
  in the basis.
  *(The reader could not actually honour this until 2026-09-09: it walked html/txt/csv/md only, so a
  yearbook shipped as a zip of `.docx` graded C on `empty:no-extractor`. Two provinces publish that
  way. Fixed; the rule did not change.)*

### Moved here 2026-09-11 — filed on the wrong side of the boundary

*(The §6/§7 split of 2026-09-09 cut these files by SECTION NUMBER, not by question, so a few entries
landed in the wrong one. Boundary now stated at the top of each file. `notes/doc-audit-2026-09-11.md`.)*

- **Bytes that did not come from the cited URL on the live host cannot make an
  A**, however cleanly the edge clears every other bar — §7's archived-copy
  ruling, which every new fetch strategy inherits. A read in Thomas's own
  Chrome IS the cited URL and is not a second route (§7). Record WHICH route in
  the committed evidence record (`via:`).

- **An archived snapshot may rescue a WALL; it must never rescue a 404.** A
  wall says only that this machine could not read it. A 404 says the citation
  has rotted, which is exactly what the dead-URL debt list measures — grading it
  off an archived copy hides link rot behind a good grade.

