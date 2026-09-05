# Grader rulings round — 2026-09-05

Thomas ruled "go ahead on the four grader rulings" and "fix the token-pdf"
(2026-09-04), then, on this round's own measurement, **"grading against both
extractions is worth it"** (2026-09-05). All five findings are now applied —
the fourth only after being narrowed, and the fifth in a shape the measurement
chose rather than the one the ruling started from. Plus one re-cite from agent
item 2.

Corpus **620 A · 1,335 B · 677 C** over 2,632 dependencies, A-share **23.6%**
(from 580 / 1,362 / 690, 22.0%). `npm run validate` exits 0, `tsc --noEmit`
clean, 123/123 logic checks, grader selftest **51/51** (four new assertions).
`public/corpus-data.json` regenerated. `scripts/grade-evidence.ts` and one
pinned devDependency in `package.json` are the only changes outside the
corpus.

## How the measurement was done, and what the numbers are NOT

A fresh cloud sandbox, `npm install`, then **one live pass** over the whole
corpus (`--all --no-snapshot`, 1,708 distinct URLs) to fill
`.evidence-fulltext/`. Every subsequent run was `--offline` against that same
store, so before and after see **byte-identical documents** and no network
noise can enter the delta. Each ruling was applied and measured on its own, in
order, against the previous step.

**The baseline of that measurement is 589 A · 1,074 B · 959 C, and that is not
the corpus's grade line.** It is what ONE machine reads on ONE day with no
snapshot rescue; the corpus's recorded grades were earned across many rounds on
three networks. The delta is the finding; the absolute numbers are not.

The first attempt to diff a LIVE run against an OFFLINE one produced five
phantom moves — a URL fetched twice concurrently before either write landed, so
the store kept the timed-out copy while the run graded the good one. Diff
offline against offline.

## The four rulings

### 1. The A bar tests the window around ANY matched span — SHIPPED

**12 B→A, nothing down, nothing sideways.** Every one of them was
`artefact-named-elsewhere-in-document` with coverage 1.00 and naming true, and
the only thing against them was an arbitrary tie-break between two equally
perfect quotes. `frb-regulation-q -> basel-iii` moved, as the Basel round
predicted, and so did `id-ojk -> basel-iii` — that one read LIVE from the
sandbox, so its wayback cap was a fact about the old machine, not the host.

The anchoring span now BECOMES `bestSpan`, so the committed window is the
passage the grade rests on and `writeGrades` fills `evidence_quote` from it —
not from a press release's headline, which is what would have been written
before. Only spans that are themselves `yes` (>= 0.95) may anchor; a partial
span must not be able to hand an A to an edge whose substantive sentence is
half missing.

### 2. `namesTarget` gets `locateQuote`'s whitespace-insensitive pass — SHIPPED

**1 C→B** (`ru-minfin-nwf-open-data -> ru-minfin-nwf-statistics`).

The measured case that prompted the ruling, `ci-anstat-ihpc -> ci-anstat-ehcvm`,
**could not move: `anstat.ci` 403s this machine**, so its document is not in the
store. The rule is right and the corpus-wide yield today is one edge. It also
turns out to be load-bearing for anything that switches to a pdf.js extraction
(below), because pdf.js drops the space at a line end.

Runs on the squashed haystack carry a 12-character floor — `locateQuote`'s own
fragment floor — because "de la" joined to "dela" matches inside unrelated
words, and that is the one way a space-blind pass invents a match instead of
recovering one.

### 3. Hangul and `title_aliases` on the single-token path — SHIPPED

**0 moves, and the reason is the document, not the rule.**
`kr-financial-stability -> basel-iii` is the only edge in the corpus this can
reach, and `bok.or.kr` answers this machine with `curl-35 Recv failure`. Only
five nodes in the whole corpus carry `title_aliases` at all, so the alias half
of this was never going to move much either. Shipped as a latent fix; the
selftest now pins it so it cannot rot.

### 4. One interpolated word — SHIPPED, but NOT as first written

This is the one worth reading. The first cut allowed the gap inside **any** run
clearing the 60% bar, exactly as the round-5 note framed it. Corpus-wide it
produced **6 moves, and three of them were false A grades**:

| edge | what it actually anchored on |
|---|---|
| `nz-statsnz-aes -> anzsic` | "New Zealand Standard Industrial **Output** Classification (NZSIOC)" — a DIFFERENT classification, 5 of ANZSIC's 7 title words with one word inserted |
| `vqc-reglement-taxation -> vqc-budget-fonctionnement` | "de la Ville de Québec", 5 of 8 — the city, not its operating budget |
| `ng-lagos-mtef-2026-2028 -> ng-nbs-cpi-rebasing` | "rebasing of the Consumer Price Index (CPI)", 4 of 6 — the ACT of rebasing, not NBS's release *titled* "Highlights of Consumer Price Index (CPI) Rebasing" |

**A partial run plus an interpolation is two liberties at once, and the second
pays for the first.** Narrowed to a WHOLE name or a whole title-lead bar one
word: **1 B→A**, `tz-nbs-cpi-dqa -> cpi-manual`, on "the Consumer Price Index
**(CPI)** Manual – Concept and Methods 2020" — which is the ruling's own shape.
The narrowing also keeps the case the ruling was made for
(`mx-oaxaca-de-juarez`, "Censo **Nacional** de Población y Vivienda"), and that
edge still cannot move today because the Oaxaca host is Cloudflare-walled.

Implementation note: the gap test walks prefix occurrences with `indexOf` and
checks a short slice, never a regex over the whole document — a `RegExp` with
an optional token at each position would scan a 4 MB haystack once per
candidate, and there are O(n²) candidates.

## The fifth ruling — pdf.js — measured, then RULED, then applied as BOTH

The ruling as it stood was "`pdftotext -layout` is the wrong extractor for a
bilingual two-column PDF", and that half was never in doubt: the transport
round measured 17 probe spans on BPS, `-layout` 6, plain 6, pdf.js 17.

**The straight swap turned out to be a wash.** 658 PDFs re-fetched and
re-extracted with pdf.js, 1,060 edges re-graded, same day, same code:

```
the 1,060 PDF-cited edges
  pdftotext -layout (today) :  306 A ·  602 B · 152 C
  pdf.js only               :  311 A ·  592 B · 157 C      34 up, 32 DOWN
  best of both extractions  :  334 A ·  584 B · 142 C      34 up,  0 down
```

The 32 regressions were overwhelmingly `A -> B partial-quote`, and the cause is
structural rather than a defect in pdf.js: **a large share of this corpus's PDF
quotes were written and verified against `-layout` output.** Changing the
extractor changes what "this span is in the cited document" means mechanically,
and quotes copied from one rendering stop matching the other. Adopting the swap
would have demoted 21 A grades and 2 to C, on documents that have not changed.

**Thomas ruled 2026-09-05: grade against BOTH renderings and keep the better
result.** Both are faithful renderings of the same bytes, so a quote found in
either really is in the document — and reading both restores the property this
whole script rests on, that a matcher change can only ever ADD matches.

### What was built

`-layout` stays PRIMARY: `text`, `textSha`, `extractor` and every
already-committed `evidence-cache/` header keep meaning exactly what they meant
before, and pdf.js reading order is the addition (`Fetched.altText`, out of
process via `scripts/capture/extract-pdfjs.cjs`, which the transport round
already proved byte-identical to a Chrome in-page capture). `gradeEdge`'s body
became `gradeAgainst(docText, extractorUsed)`, runs once per rendering, and
returns the better grade — ties broken on coverage, then on the primary, so a
document whose two readings agree records the extractor it always did. The
result's `extractor` field says which reading the grade actually rests on.

Three details worth knowing:

- **The second rendering lives in its own `<sha>.alt.txt.gz`**, not after a
  second separator in the first file: a sentinel inside a record could occur in
  a document's own text, and a store written before today reads back exactly as
  it did, with no alt file and no alt text.
- **The `empty:tiny-body` test now judges the LONGER of the two.** A PDF whose
  `-layout` pass yields nothing while pdf.js yields a document is not an empty
  body.
- **`pdfjs-dist` is pinned at `3.11.174` in `devDependencies`** — the version
  the transport round measured. If it is ever missing, the child process fails,
  the catch leaves `altText` empty, and the grader degrades exactly to its old
  behaviour rather than breaking. **`npm install` before the next grader run.**

### What it moved

Measured the honest way — one fetch pass to build both renderings, then the OLD
code and the NEW code each run `--offline` against that same store, so only the
code differs:

**34 moves, every one up: 24 B→A, 6 C→B, 4 C→A, zero down.** 306 A → 334 A
across the PDF corpus, reproducing the predicted number exactly. 32 were
written (2 already stood at the better grade from an earlier round on another
machine); checked against the state already on disk, **32 up, 2 unchanged, 0
down**.

Four of the biggest jumps were read by hand before writing, and all four are
the class the ruling was aimed at — CJK and table-heavy PDFs that `-layout`
destroys:

- `kr-external-debt-reserves -> imf-sdds`: the BOK document names
  "IMF의 특별통계공표기준(SDDS: Special Data Dissemination Standard)" and says
  member countries compile external debt to the international standards.
- `nz-statsnz-gdp -> nz-statsnz-lac`: a methodology table row, "Purchases
  derived from the Local Authority Census for non-market units" — `-layout` had
  interleaved the table's columns.
- `ca-nu-budget-main-estimates -> canada-social-transfer`: "other federal
  transfers include the Canada Health Transfer ($58 M), Canada Social Transfer
  ($18 M)".
- `tw-national-accounts -> un-coicop-2018`: "配合 COICOP 2018 調整家庭消費歸類".

Selftest 49 → **51**: one assertion that a quote only the second rendering
contains still grades A and names its extractor, one that a second rendering
can never LOWER the grade the first one earned.

Before/after pair: `Claude outputs/both-2026-09-05-{layout-only,both}.json`;
promotions and what was written beside them.

## token-pdf — fixed, both halves

- The A-bar cap's reason now names the route: `…-via-token-pdf`, `…-via-ocr`.
  **`wayback` deliberately keeps `quote-found-artefact-named-via-snapshot`** so
  §7's greppable class survives.
- The run report had three cases collapsed into two: anything not `wayback` was
  printed as "graded as a direct read of the cited URL", which described the two
  routes capped at B precisely because they are not that. It now branches on
  `routeCapsGrade`.
- Two selftest assertions added for both (47 → 49).

## The one promotion refused

`gq-inege-anuario-2024 -> afristat-founding-treaty-1993` graded A and was **not
written.** Its anchoring passage is a budget table row — "Contribuciones del
Gobierno a AFRISTAT ─ ─ ─ 380 ─", Tabla 199, *Financiación a la Estadística*.
That names AFRISTAT the ORGANISATION, in a line about a membership
contribution; the target node is the 1993 founding TREATY. §7's
naming-the-agency shape, arriving through the acronym rule (AFRISTAT is ≥ 4
characters and glosses the whole title, so it counts as artefact naming). **The
A-bar change is behaving exactly as ruled; the naming input is what is wrong.**
Left at B.

Two more were written but are soft, and are listed here so nobody has to
rediscover them: both `houston-revenue-cap` edges rest on a 2-of-3-word title
run — "population estimates" against "Population Estimates Program (Vintage
Estimates)" — which is a generic phrase carrying a 67% score. The document does
attribute to the US Census Bureau elsewhere. A short title with one generic word
in it is a soft spot in `namesTarget` independent of anything in this round.

## Re-cites — agent item 2

**`in-hp-economic-survey -> in-state-gsdp-series`: C → A.** The Himachal
Economic Survey is published as HTML on the department's own live host, not as
a PDF, and the node was citing the department index. Re-cited to
`himachalservices.nic.in/economics/en-IN/eco-survey-2024-25.html` (433,848
characters extracted, read live), quote written by hand and checked against the
grader's own extraction before it was written:
"GSDP at Current and Constant (2011-12) Prices: According to the Advance
Estimates(AE), the GSDP at current prices or nominal GSDP for the FY2024-25 is
estimated to be ₹2,32,185 crore…" — coverage 1.00, `naming: title-run:4/5`.

**`in-railways-yearbook`: the document is located; it is now a capture job, not
a research one.** The index page reads fine from the bridge VM (and NOT from
the sandbox), and it lists
`indianrailways.gov.in/railwayboard/uploads/directorate/stat_econ/2026/INDIAN%20RAILWAYS%20YEAR%20BOOK%2C%202024-25%20ENGLISH.pdf`
plus the 2024-25 Annual Statistical Statements and Statistical Summary Sheet.
**The `/uploads/` path refuses both machines even with a Referer, while the
`view_section.jsp` index on the same host answers 200** — five attempts, all
`connection refused`. Chrome is the remaining route. Note the edge's own
direction is worth a second look while someone is in there: it says the Year
Book `uses_data_from` National Accounts Statistics, and the dependency the
basis actually describes runs the other way.

**Odisha, Assam, Chhattisgarh, MoD: dead from both machines today**
(`pc.odisha.gov.in`, `des.assam.gov.in`, `descg.gov.in`, `www.mod.gov.in`, and
`finance.odisha.gov.in` which search offers as a mirror). Odisha's full survey
PDF is at `pc.odisha.gov.in/sites/default/files/2025-02/Economic%20Survey%202024-25%20-Full%20Document.pdf`
when the host is up. **All five state-survey edges point at
`in-state-gsdp-series`, whose title tokenises to five words, of which "Gross
State Domestic Product" is four — so the naming test passes at 4/5 and an A is
reachable for each of them, as Himachal just proved.**

**`tz-dar-es-salaam-city-council-budget-2026 -> tz-lgfa-cap290-service-levy` is
not a re-cite, it is a drop candidate.** `dcc.go.tz` answers both machines but
serves a JavaScript shell. More to the point, the edge's own basis says the
quiet part out loud: "the budget page itself does not quote the Act by
name/section — recorded as 'cites' on the strength of the shared revenue-category
framework rather than a direct textual citation." That is the assertion-only
shape §7 rules against, self-declared. **Thomas's call (rule 13); not executed.**

## Method notes worth keeping

- **`zip` cannot write into a connected folder from the bridge VM** — it builds
  a temp file and renames, and the rename needs an unlink the mount refuses
  ("Operation not permitted"), leaving a 0-byte target and a `ziVMikbf`-style
  scratch file behind. `tar czf` into `$HOME` and `cp` the result in.
- **The bridge VM and the cloud sandbox are still genuinely different networks**
  — `indianrailways.gov.in` answers the VM and not the sandbox; `ojk.go.id` and
  `himachalservices.nic.in` answer the sandbox. Re-probe both, every time.
- Editing the corpus with a Python `json.dumps(..., ensure_ascii=False,
  indent=2)` round-trip reproduces `JSON.stringify(json, null, 2)` byte for
  byte — the Himachal edit came back as an 8-line diff, nothing reformatted.
