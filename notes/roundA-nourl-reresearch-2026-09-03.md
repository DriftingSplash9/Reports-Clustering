# Round A — the 162 no-URL edges — 2026-09-03

[Agent] item 1 of the 2026-09-03 handoff (`notes/next-agent-prompt-2026-09-03.md`,
Round A): every live edge that carried no `evidence_url` — all 162 of them in
the ten `*-wiring-grok-2026-08` slices — re-researched to the document its
`basis` describes, cited, quoted where the sentence is verbatim in that
document, re-graded. Nothing invented; what could not be found went to
`_dropped` with a reason.

Per-edge decisions: `Claude outputs/roundA-nourl-decisions-2026-09-03.json`
(162 rows: action, url, quote, fetch status, reason). Re-grade:
`Claude outputs/grade-roundA-2026-09-03.json` (written vs unchanged, with host
and reason) and `grade-roundA-raw-2026-09-03.json` (the grader's full output).

---

## 1. The list — 162, re-measured

Rebuilt from the slice files: 162 live edges with no `evidence_url`, identical
to the debt JSON's `no_url` set. mexico 30, andean 25, ae-sa 20, ar-cl 20,
ir-iq-tr-sy 17, jp-kr 16, taiwan 13, indonesia 10, ph-vn-th-mm 8, af-ye-sd-so 3.
Every one had a `basis` that named a publisher and quoted a sentence; none had
a citation.

## 2. Method

URL discovery ran in the cloud sandbox (WebSearch + WebFetch, eight subagents
by slice — which exhausted the session's 200-search budget half way through;
see §6). **Every fetch that counts ran on the bridge VM on thomas-pc (home
connection), never through the sandbox proxy**: curl with a browser UA,
`pdftotext`, a normalised substring check for the basis's quoted spans and
for the sentence the reader proposed. A document was cited only after its
HTTP status was read from the VM; a quote was written only when the sentence
was seen in that document's text (or, for six Cloudflare/Incapsula walls, read
via WebFetch and marked as such — those edges cannot be better than C until a
browser reads them).

Where the basis quoted document X and the reachable document was a companion
(a newer edition, the DSBB metadata instead of a scanned PDF, the imports
catalogue instead of the vanished exports one), the reachable document was
cited **and its own sentence quoted** — PLAYBOOK §6: quote and citation must
be the same document. 20 of the 150 citations carry an equivalent sentence
rather than the basis's original.

Writes: a python writer (`json.dumps(obj, ensure_ascii=False, indent=2)+"\n"`,
byte-identical to the grader's output — re-confirmed on all ten files before
writing), `evidence_url` after `basis`, `evidence_quote` after
`evidence_grade`. Grades from the grader's JSON, improvements only.

## 3. Result

| | |
|---|---|
| edges given a URL | **150** (149 with a quote; Iran's has none, §5) |
| moved to `_dropped` `no-document` | **12** |
| re-grade: C → A | **39** |
| re-grade: C → B | **96** |
| still C | 15 (11 walls/tiny bodies, 2 CJK, 2 past the text cap) |

**Corpus: 3,341 reports / 2,724 dependencies; 470 A · 1,285 B · 969 C.
A-share 15.8% → 17.3%.** `npm run validate` exit 0 (all 470 A in), `tsc
--noEmit` clean, 123/123 logic, selftest 31/31, **no script changed**. 99 new
evidence-cache records. The validator's "cites no evidence_url" warning count is
now 0.

Where the 150 citations point: `dsbb.imf.org` 28 (the
`getBaseSummaryofMethodologies` API — the corpus already carried A grades on it,
DOM/ATG/LCA/BHR), `inegi.org.mx` 28, `tuik.gov.tr` 13, `indec.gob.ar` 8,
`bcentral.cl` 6, `fcsc.gov.ae` 5, `stats.gov.sa` 8, then a long tail. The B's
split 33 `quote-found-target-not-named` (generic "COICOP"/"SNA" citations and
Spanish documents that never spell the English title), 28 `partial-quote`
(hyphenation, footnote markers, two-column layouts — the sentence is there),
17 `agency-not-artefact`, 13 `artefact-named-elsewhere-in-document`, 4
weak-basis caps.

## 4. The 12 drops

All `no-document`, all cross-checked against every live edge and every other
slice's `_dropped` block (none existed elsewhere), original basis preserved in
`why`:

- `bo-cuentas-nacionales → bo-gas`, `→ bo-minerales` — INE Bolivia sentences not
  found (the CN methodology, hydrocarbons/mining metadata, DSBB BOL all checked).
- `co-presupuesto-general → co-regalias` — the quote describes the SGR's own
  biennial budget, not the national budget using royalty data.
- `ec-remesas → ec-bop` — a dataset description, not a dependency statement.
- `cl-ipmin → cl-cochilco` — the quote is Banco Central's national-accounts
  sources sentence; it says nothing about INE's mining index.
- `kr-grdp-regional-accounts → sna-2008` — Korean sentence not located anywhere.
- `ph-bop → ph-remittances` — a BPM6 definition; the remittance release is a BOP
  component, not an input, and bsp.gov.ph was not read.
- five Taiwan edges (`tw-national-accounts → tw-cpi` / `→ tw-industrial-production`,
  `tw-trade-statistics → hs`, `tw-monetary-aggregates → sna-2008`,
  `tw-industrial-production → isic`) — a deflator table fragment, a PRC-customs
  phrase, a quote that never mentions industrial production, a CBC note and a
  MOEA note that could not be located.

## 5. Flagged, not fixed

- **Direction**: `ec-enemdu → ec-cuentas-nacionales` — the INEC sentence says
  ENEMDU *feeds* the national accounts; the edge makes ENEMDU the consumer.
  Added as row 18 of `Claude outputs/direction-suspect-jp-kr-2026-09-03.json`,
  URL and quote written as the basis describes them, not flipped.
- **Iran**: `ir-national-accounts → sna-2008` got its CBI page as `evidence_url`
  (status 200) but **no quote** — cbi.ir sits behind an F5 TSPD JavaScript
  challenge from the VM, the sandbox and even the Wayback copy, so the Persian
  sentence is unverifiable. Not dropped: a `caveat` in
  `candidates-tier-wiring-2026-08-28.json` names this live edge (the SNA-93 vs
  SNA-2008 dispute, PLAYBOOK §7 "live as is").
- **`tr-cpi → un-coicop-2018`** is cited to TurkStat's data-portal download link
  for the 2026 CPI methodology document (Turkish edition, sentence verified).
  The link carries a token and may be signed; no stable page exists for the
  document. Thomas's call whether that citation stands.
- Two INEI quotes (`pe-pbi-mensual → …`) are in the cited bulletin but sit past
  the grader's 250 KB text cap, so they grade `quote-not-in-document`. Two
  Japanese quotes are the CJK matcher limitation (Round B).
- `cl-ipmin → cl-cobre` and `tw-labour-force → icls…` carry quotes that name
  only the agency/ILO — honest B's, not A candidates.

## 6. Hosts that could not be read from the bridge VM (home network, thomas-pc)

`bcentral.cl` (Incapsula — 6 edges; `si3.bcentral.cl` PDFs read fine),
`bps.go.id` (Cloudflare — 4), `unece.org` (Cloudflare 403 to curl — 2, both
BPS-authored papers), `banrep.gov.co` (Radware — 1), `mef.gob.pe` (Incapsula —
1), `cbi.ir` (F5 TSPD — 1, unreadable everywhere). All six had their sentence
read via WebFetch and are browser-pass debt. `tuik.gov.tr` closed a 1.8 MB
transfer early once (curl 18 → a truncated PDF the grader read as
`empty:tiny-body`) and read whole on `--refetch`. `ws.dgbas.gov.tw` serves an
incomplete TLS chain (needs `-k`; the grader's retry handles it).

Also learned: **Korea's DSBB production-index category is `IND00`, Indonesia's
merchandise trade is `MET00`** — a wrong code returns `[]`, which is not "no
metadata". And **subagents draw on the session's WebSearch budget** — eight
parallel agents burned all 200 searches, and the last quarter of the round ran
on WebFetch of guessed URLs, direct site navigation and DSBB.

## 7. What this leaves

The no-URL class is empty. The `*-wiring-grok-2026-08` family still carries
generic-standard citations (COICOP/SNA/HS named without an edition) that top
out at B by the naming rule, and the six walled hosts above join the browser
pass. `tmp_work/roundA/` holds the per-slice input lists (scratch — Thomas's to
empty).
