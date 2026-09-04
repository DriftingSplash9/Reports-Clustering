# Basel III round — 2026-09-04

Thomas's ruling on the question round 5 held back (`is 바젤Ⅲ an alias of
`bis-basel-framework`?`). Answer: **no — mint the artefact it actually names.**
Option 3 of the three offered, Basel III only for now, and **standalone: no
`part_of`** (his explicit call).

`npm run validate` exits 0, `tsc --noEmit` clean, 123/123 logic checks, grader
selftest 47/47, `public/corpus-data.json` regenerated. **Nothing in `src/`
except the new node; `scripts/` untouched.** No grades were written back —
see "why no `--write`" below.

## What the recon found, and why the ruling was right

The node had five inbound edges. **Only one of them names the Basel
Framework.** Three name Basel III and never mention the Framework; one names a
standalone BCBS guideline that is neither.

| edge | what the document names | was |
|---|---|---|
| `osfi-car-guideline` | "the Basel Committee's Basel Framework", verbatim | A |
| `frb-regulation-q` | "the Basel III regulatory capital reforms" | B |
| `id-ojk` | "kerangka modal Basel III" | B |
| `kr-financial-stability` | 바젤Ⅲ 최종안 | B |
| `sa-banking` | "BCBS 403 Guidelines – Prudential treatment of problem assets" | B |

So this was never really a language question or even a taxonomy question. The
corpus was **recording a citation its own sources do not make** on three of
five edges. Repointing is a correctness fix that would be right even if it
moved no grade at all — which, as it turns out, is exactly what happened.

## What was minted

`basel-iii`, in `banking-supervision.json`, directly after the node it was
split out of. `kind: standard`, `releases_per_year` 0.05 nominal (the sna-2008
/ imf-gfsm convention — the enum has no bucket for a standard).

**Title is `Basel III`, deliberately short, and this is load-bearing.** BIS's
own page is titled "Basel III: international regulatory framework for banks",
and PLAYBOOK §7 says a node carries the publisher's own title — but
`namesTarget` needs a contiguous run of **≥60% of the title's words**. On the
six-word page title, "Basel III" is 2/6 = 33% and the naming test fails on
every document that names the standard correctly. The title-lead path does not
rescue it either: that requires ≥3 words and "Basel III" is two. A long title
here would have silently defeated the entire point of the round. BIS uses
"Basel III" as the standard's name throughout the body text
("Basel III is an internationally agreed set of measures developed by the Basel
Committee on Banking Supervision in response to the financial crisis of
2007-09"), so the short form is the publisher's own name for it, not a
convenience.

Containment is recorded in the description in prose, quoting BIS: "The Basel
III reforms have now been integrated into the consolidated Basel Framework,
which comprises all of the current and forthcoming standards of the Basel
Committee on Banking Supervision." Thomas ruled against `part_of`, so the
schema does not carry it. Note that had `part_of` been set, `validate()` would
then have **forbidden** any dependency edge between the two nodes — worth
remembering if this is ever revisited.

`title_aliases: ["바젤Ⅲ"]` is attested (bare 바젤Ⅲ appears repeatedly in the BOK
appendix, e.g. "미국, 유럽연합 등 주요국의 바젤Ⅲ 도입 작업이 진행 중이다"). **It is
currently inert — see finding 3.**

## The three edges: naming now passes, and no grade moved

All three repointed edges went from `naming: 'neither'` to
**`naming: 'title-run:2/2'`**. The thesis of the round was correct. Every one
of them is then stopped by a *different* mechanism, and none of the three is
the one we were arguing about:

### 1. `frb-regulation-q` — the A-bar window anchors on the document's own headline. NEW, and probably a class.

Grade `B`, reason `artefact-named-elsewhere-in-document`, with quote coverage
**1.00** and naming **true**. The quote is literally "The rule will implement in
the United States the **Basel III** regulatory capital reforms…". Measured on
the live page:

```
doc chars: 13771       first 'basel iii' at: 8519
span[0] "Federal Reserve Board approves final rule to help ensure banks
         maintain strong capital positions"          index=26     'basel iii' in window: FALSE
span[1] "The rule will implement in the United States the Basel III
         regulatory capital reforms from the Basel Committee…"
                                                     index=8470   'basel iii' in window: TRUE
```

The basis quotes **six** spans; span[0] is the press release's own headline,
which lands at index 26 — the page header. Both spans score coverage 1.00, the
tie breaks to the first, `bestSpan` becomes the headline, and the A bar's
±400-character window is page navigation chrome where the artefact name of
course never appears.

**This is not specific to this edge.** A large number of bases in this corpus
open by naming the source document ("The official press release for 'X'
states: …") and then quote the substantive sentence. Every one of those anchors
the window on the header. The grade currently depends on an arbitrary tie-break
between two equally perfect quotes.

**Proposed fix (NOT applied — grader change, Thomas's call):** the A bar should
pass if the artefact is named near **any** matched span, not only near
`bestSpan`. Strictly more correct, since the current behaviour is
tie-break-dependent. Must be measured corpus-wide before adoption, per the
round-5 discipline — which needs a populated `.evidence-fulltext/`, so it is a
job for a session that already has one.

**Do NOT "fix" this by trimming the headline out of the basis.** It would move
the grade, but it is grade-motivated editing of an evidence record, and it
would hide a defect that is costing other edges silently.

### 2. `id-ojk` — route cap, on this machine only

`via: wayback 20260520015202` → `routeCapsGrade` caps at B regardless of
everything else. `ojk.go.id` refused this VM; it read live in an earlier round.
Its reason was also `artefact-named-elsewhere-in-document`, so finding 1
probably applies to it too, but that cannot be separated from the route cap
until a machine reads it live.

### 3. `kr-financial-stability` — Hangul is invisible to `namesTarget`, and the alias cannot fix it

Two problems, one transient and one structural.

Transient: `bok.or.kr` redirects the signed download to `file-cdn.bok.or.kr`,
which **this bridge VM cannot resolve** (`network:curl-6`). Round 4's memory
records bok.or.kr as reachable from the *cloud sandbox* — a different machine.
Re-probe before trusting either note.

Structural, and this is the real finding: **`namesTarget` cannot see the alias,
and would not see it even on a perfect fetch.**

- `normalizeForMatch` runs `NFKD` → **`Ⅲ` (U+2162 ROMAN NUMERAL THREE)
  decomposes to `III`** → lowercased, so 바젤Ⅲ normalizes to `바젤iii`.
- `tokenise` splits on `[^\p{L}\p{N}\/.º°-]+`. Hangul and Latin are both
  `\p{L}`, so there is no split: **`바젤Ⅲ` is a single token.**
- The title-run rule requires `run >= 2` words. One token can never satisfy it.
  The title-lead path requires ≥3 words. Both miss.
- The single-token path (`how: cjk:…`) exists for exactly this shape — "a
  Japanese/Chinese title fragment (統計法) is one token with no spaces, so the run
  rule cannot see it" — but it has **two** limits that both bite here:
  1. it iterates `titleWords`, derived from `target.title` only, and **never
     looks at `title_aliases`**;
  2. its character class is `/[぀-ヿ㐀-鿿]/` — Hiragana, Katakana and CJK
     Unified Ideographs. **Hangul (U+AC00–U+D7AF) is not in it at all.**

So Korean is currently outside the naming test entirely, by both doors. This
looks like an omission rather than a decision: the stated reason for the CJK
path ("one token, no spaces") applies to Hangul word-for-word.

**Proposed fix (NOT applied):** run the single-token path over
`[title, ...title_aliases]` and add Hangul to the class. `바젤iii` is 7
characters and highly specific, so false-positive risk looks low — but "looks
low" is not a measurement, and round 5's cancelled n-gram matcher is the
standing warning about building a matcher on an argument instead of a number.

## Why no `--write`

This VM's grading run would have written `kr-financial-stability` **down to C**
on `network:curl-6`, purely because it cannot resolve a CDN host — a machine
fact, not a corpus fact. `id-ojk`'s wayback cap is the same shape. The recorded
B grades came from successful live reads in earlier rounds and are the better
evidence. Grades stay as they were.

## Corpus effect

`basel-iii` enters at in-degree 3 (weighted #234, raw #142);
`bis-basel-framework` drops to in-degree 2 (weighted #289, raw #227). The
split-divides effect measured in V0.11 is visible exactly as predicted — this
is the cost Thomas accepted when he ruled, and it is the honest shape.

Grade totals unchanged: **578 A · 1,343 B · 703 C**, A-share 22.0%.

## Leads this opens

- **Basel II is one lead short of a node.** The Vietnam drop note records SBV's
  Financial Soundness Indicators table (`sbv.gov.vn/en/web/sbv_portal/w/sbv606221`)
  citing Circulars 41/2016 and 22/2019 with explicit "Applying Basel II"
  language. It was dropped because the *target* was `vn-npl` (a domestic
  5-group classification), not because the Basel naming failed. Aimed at a
  capital-adequacy node instead, it may be a real edge. Not minted: no node
  without an edge.
- **`tw-financial-stability`** is the obvious Basel III analogue of the Korean
  edge — a national FSR that very likely names the standard. Unfetched
  speculation today.
- **Basel I: nothing.** Zero documents in the corpus name it. A node would be
  isolated on arrival.
- Three drops stay dead and are **not** rescued by this round:
  `ffiec-call-report` (Schedule RC-R instructions never use the word "Basel" —
  they cite 12 CFR), `fed-h8`, and Alberta's `cudgc-…` (zero occurrences of
  "Basel", "OSFI" or "Superintendent" in 220KB).

## Housekeeping done in the same session

`tmp_work/` swept 31MB → `_to_delete/sweep-2026-09-04-basel-session/` (README
in there). The reason was not disk: **`tmp_work/roundA/` held eleven files with
the same filenames as live slices in `src/data/research/`**
(`taiwan-wiring-grok-2026-08.json`, `jp-kr-wiring-grok-2026-08.json`, …). They
could never reach the build — `gen-slices.ts` reads `src/data/research/` by
`readdirSync` and nothing else — but every repo-wide grep returned the stale
copy under an identical name, next to the live one. That is an agent-poisoning
hazard. `tmp_work/` added to `.gitignore` (it was not there; `_to_delete/` was).

Also noted: `title_aliases` does **not** survive into
`public/corpus-data.json`. Harmless today — the grader reads
`src/data/research/` — but do not go looking for it in the generated file.
