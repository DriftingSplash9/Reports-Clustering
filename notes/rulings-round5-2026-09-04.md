# Thomas's rulings, 2026-09-04 — all five applied

Corpus **578 A · 1,343 B · 703 C**, A-share **22.0%** (from 548 / 1,362 / 714,
20.9%). `npm run validate` exits 0, `tsc --noEmit` clean, 123/123 logic tests,
grader selftest **39 → 47**, `public/corpus-data.json` regenerated.
**37 grades up, 0 down.** Nothing in `src/` beyond one schema field; the
renderer is untouched.

## 1 — commit. Done by Thomas.

## 2 — a foreign-language naming counts. Applied.

`namesTarget()` matches a run of the target's OWN title words and every title
in this corpus is English, so the corpus was penalising documents for its own
monolingualism. Implemented as `Report.title_aliases?: string[]` — the
artefact's name in the languages the corpus actually cites it in, each one
taken verbatim from a document read this session. Four aliases so far:

| node | alias | sourced from |
|---|---|---|
| `eurostat-hicp` | Indice des prix à la consommation harmonisé | legilux RGD 20/12/1999, Art. 1er |
| `sna-2008` | Sistema de Cuentas Nacionales 2008 | BCP *SCNPY base 2014*, Metodología |
| `imf-gfsm` | Руководство по статистике государственных финансов | Minfin KOSGU→GFS mapping table, header row |
| `brics-ndb-agreement-2014` | Соглашение о Новом банке развития | mid.ru treaty text, recital |

The field's doc comment carries three rules that keep it from becoming a
synonym bag: same artefact not a related one; sourced from a document actually
read; never an acronym or an agency name.

**Held back deliberately: the Korean one.** `kr-financial-stability ->
bis-basel-framework` names 바젤Ⅲ — Basel III, which is a *package inside* the
Basel Framework, not another name for it. That is an edition/scope question,
not a language one, and the corpus models editions as separate nodes. Your
ruling was about language; I did not stretch it. Flagging rather than deciding.

## 3 — the whitespace-insensitive matcher. Applied.

`locateQuote()` now runs a second pass with every space removed from both
sides, only after the spaced compare has failed, so it can never lower a score.
Measured before adoption over 1,664 span-carrying edges with a readable
document: **34 grades up, 0 down**; false positives 1 in 3,000 deliberately
mismatched (quote, document) pairs, and that one is a Eurostat boilerplate
sentence genuinely present in both documents.

**It is also the CJK matcher.** Nineteen of the 34 are CJK — thirteen Japanese,
three Taiwanese, two Chinese, one Korean, most from coverage 0.00 to 1.00.
Round B's n-gram path is solving a problem that no longer exists; **do not
build it.**

One trap, found by the measurement and now carried in the code: the second pass
must report the POSITION of its match. The first version returned index 0, and
the A bar re-runs `namesTarget` on a ±400-character window around that index,
so a wrong index silently demoted two A grades (`fiscal-equalization-program ->
statcan-seph`, `kw-csb -> imf-e-gdds`). Fixed with a squashed→original index
map; four selftests cover fire / position / no-false-fire / no-lowering.

## 4 — the `agency-not-artefact` seven. Applied, and they were two problems.

**The six Bolivian ones were a TITLE mismatch, not an evidence problem.** All
six cite INE's own anuario table `3060106.xlsx`, which is headed
"Cuadro Nº 3.06.01.06 — BOLIVIA: INCIDENCIA DE POBREZA(1), SEGÚN DEPARTAMENTO,
2016-2023". The node was titled "Pobreza monetaria por departamento (INE)" — no
contiguous word run in common, so `namesTarget` fell through to the publisher.
The document WAS the artefact and the grader could not see it. Retitled to
**"Incidencia de pobreza, según departamento (INE)"**; all six went C→A.

**`ci-anstat-ihpc -> un-coicop-2018` was the acronym rule**, now narrowed:
a parenthetical acronym from the target's own title names the artefact when it
is **four characters or more** AND **glosses the whole title**. Both conditions
earn their place — `(EDP)` and `(NSW)`, the audit's own false positives, are
three characters and gloss a component. And the rule caught its own third case
on the first run: `pspp-cola-methodology` is "Public Service Pension Plan
(PSPP) Cost-of-Living Adjustment (COLA) Methodology", so an Ontario release
naming the PSPP names the PLAN, not the COLA methodology. The whole-title
condition puts that edge back at B, where it belongs.

The two `www.anstat.ci` edges are **not yet re-graded** — see "still owed".

## 5 — option 1, the BPS landing pages. Route added, captures owed.

`routeCapsGrade()` now caps `via: token-pdf <date>` at B alongside `wayback`
and `ocr`, with the reasoning in the code: citing the signed token cites a URL
that is dead tomorrow, citing the landing page and quoting the PDF puts the two
one step apart, and naming the route is what makes the pair honest. General
rule for every agency that publishes this way.

The 17 edges are **not yet closed** — they need the five BPS PDFs captured, and
that is blocked on transport, not on access (below).

## 7 — the audit.

`archive/audits/audit-2026-08-31-second-independent.md`. Checked against today's
corpus:

- **F-01 (the 19 index-page citations into `brics-jsp`) is CLOSED.** Zero edges
  now cite `brics.ibge.gov.br/publicacao.html`; 12 edges into `brics-jsp`
  remain (8 B, 4 C), none of them A, and **`brics-jsp` has dropped out of the
  authority top ten entirely**. The top ten is now ESA 2010, SNA 2008, the NDB
  Agreement, e-GDDS, PSAB/PSAS, CPI, Census, SDDS, the CoP and BPM6 — the
  audit's "not trustworthy above rank ~5" verdict no longer describes this
  ranking.
- **F-02 (the bare-homepage check only catches roots) is CLOSED.**
  `isIndexPage()` in `graph.ts` now catches `publicacao`, `temas`,
  `folder/<digits>` and 20-odd listing words plus a curated per-host prefix
  list — all three of the audit's named examples.
- **F-03 (the Rosstat class) is BOUNDED, not closed.** 117 edges → 88, now
  71 C · 16 B · 1 A, and both Rosstat regional series have left the top ten.
  The host is dead from both networks, so the grader refuses to grade them
  above C — the "suspected-weak, unproven" state the audit could not resolve is
  now visible in the data instead of invisible.
- **F-04 (the 162 no-URL + 5 bare-homepage debt) is CLOSED on the no-URL half.**
  Recount: **0** no-URL edges, 5 bare-homepage. The promotion gate ("flip the
  two warnings to errors at 0/0") is one class away.
- **F-05 (agency-not-artefact) is the ruling above**, now in PLAYBOOK §7.
- F-06 (the 58 circabc edges), F-13 (three duplicate-shaped groups) and
  F-14 (gate the disagreement list to an authority floor) are still open.

The missing 2026-08-30 audit stays missing; per Thomas the 08-31 one supersedes
it, and the 08-31 report itself records that the 08-30 findings were reproduced
in it.

## Still owed

- **Transport, and it is now the binding constraint.** Three documents this
  round could be read in Chrome and not written to disk: `www.anstat.ci`
  (2 edges, and the document confirms BOTH — "NOUVELLE NOMENCLATURE COICOP
  2018" and the EHCVM pondérations sentence), `mid.ru` (1 edge), and the five
  BPS PDFs (17 edges). The `get_page_text` persist-to-file channel that worked
  in round 4 fires unpredictably; it did not fire for any of these. **The fix
  is a checksum, not a bigger pipe**: have the page compute a SHA-256 of the
  extracted text, transport by whatever channel, and verify after writing — a
  copy that checksums is not a lossy copy, and PLAYBOOK's "retyping is lossy"
  warning stops applying the moment it is verified. Next round should build
  that once and reuse it.
- The 17 BPS edges, once transport works.
- The Korean Basel III edition question (§2 above).
- 5 bare-homepage edges — the last class before the F-04 promotion gate.
