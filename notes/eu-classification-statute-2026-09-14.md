# EU classification-and-statute layer — round of 2026-09-14

Companion to `src/data/research/eu-classification-statute-2026-09-14.json`. Nothing here
is a rule; the rules this round leaned on are `PLAYBOOK-CORPUS.md` rules 11, 14, 16 and 19
and §7a/§7b. What is here is the two lists a later round or a grader run actually needs,
plus the route, which rots.

## 1. The CELLAR route for EU legal acts

**EUR-Lex is unreadable from the cloud container.** Every `eur-lex.europa.eu/legal-content/…`
URL tried answered **HTTP 202 with a zero-byte body** and `x-amzn-waf-action: challenge`,
with and without a browser User-Agent. That is an AWS WAF challenge, not a robots policy and
not link rot — the pages are fine in a browser.

**CELLAR, the Publications Office's own repository, serves the same acts**, and the shape
matters because the grader will re-fetch whatever URL the edge cites:

| what you issue | what you get |
|---|---|
| plain GET `publications.europa.eu/resource/celex/<CELEX>` | RDF metadata, not the text |
| `-H "Accept: application/xhtml+xml"` alone | `Invalid content type … without language` |
| `-H "Accept: application/xhtml+xml" -H "Accept-Language: eng"` | the full act, via a 302 |
| the URL that 302 RESOLVES to — `resource/cellar/<uuid>.<seq>/DOC_1` | the full act, **to a plain GET, no headers** |

**So cite the resolved `DOC_1` URL, never the `celex/` one.** Capture it with
`curl -sD- -o /dev/null -H "Accept: application/xhtml+xml" -H "Accept-Language: eng" <celex-url> | grep -i ^location`.
Acts old enough to have no xhtml expression (tried: 1059/2003 NUTS, 3924/91 Prodcom) need
`Accept: text/html` instead; the error text names the failure exactly — *"does not hold a
content datastream of the requested type"* — so it is distinguishable from a dead identifier.

The three cited this round:

- `32016R0792` → `http://publications.europa.eu/resource/cellar/cf34b0a5-216c-11e6-86d0-01aa75ed71a1.0006.03/DOC_1`
- `32020R1148` → `http://publications.europa.eu/resource/cellar/0913c12a-d618-11ea-adf7-01aa75ed71a1.0006.03/DOC_1`
- `32024R3159` → `http://publications.europa.eu/resource/cellar/ae87db11-be73-11ef-91ed-01aa75ed71a1.0006.03/DOC_1`

This is a **direct read of a first-party publisher**, not an archive: `playbook/corpus-route.md`'s
B cap is for archived snapshots and does not apply.

## 2. Eurostat HICP national metadata — the CURRENT hi3/hi4 split

`notes/techniques-2026-09-04.md` carries a partial list and says outright that these filenames
rot. Re-probed 2026-09-14, all 32 fetched and confirmed 200 with a real body:

- **`prc_hicp_esmshi4_<cc>.htm`** — AT BE BG DE EL ES FR HR HU IE LT LU NL PL PT SE
- **`prc_hicp_esmshi3_<cc>.htm`** — AL CH CY CZ DK EE FI IS IT LV MT NO RO SI SK TR

Against the old note: **AT, BE, DE, FR, IE, LU, NL, PT and SE are `hi4` and were in neither
list**; FI is `hi3`, as the note already corrected on 2026-09-05; Greece is `_el`. Probe `hi4`
first, fall back to `hi3`, and treat a body under ~20 kB as a miss rather than a page.

**Two fields, one fetch.** §3.2 *Classification system* names ECOICOP; §6.1 *Institutional
Mandate - legal acts and other agreements* names Regulation (EU) 2016/792 and Commission
Regulation (EU) 2020/1148. §18.1.1 *Weights* is the field the 2026-09-05 pass used and is
already harvested.

**§6.1 is common template text, word for word on all 31 pages that carry it.** Türkiye's page
is the exception and does NOT carry the 2016/792 sentence — that was the single failure when
all 32 pages were checked, and it is a real difference in the document.

**Quote at text-node boundaries.** `stripHtml` puts a space where every tag was, so a span that
crosses an `<a>` is a span that crosses a text node. On the hi4 template "The HICP uses the"
sits outside the link carrying the classification name; on hi3 the field is the bare name. The
span that exists in both, and the one every national edge in this slice uses, is
`European classification of individual consumption according to purpose (ECOICOP)`.

**A broken link in Eurostat's own page, worth knowing before anyone cites it:** the §6.1 anchor
for *Commission Regulation (EU) 2020/1148* points at `CELEX:32001R1921`, a different act
entirely. The href is wrong on every page carrying it. This round cited 2020/1148 from CELLAR
instead.

## 3. Rule 11's URL trap — the edges that must be graded together

**68 already-live edges cite the same 27 Eurostat metadata URLs this round cites.** A
`grade-evidence` run that selects only one group rewrites each URL's `evidence-cache/` record to
hold only the edges THAT RUN selected, silently destroying the other group's windows.

The selection file used for this round's grading run — 140 pairs, old and new together — is
`Claude outputs/eu-round-2026-09-14/grade-selection.json`. **Reuse it rather than rebuilding
it**, or rebuild it the way it was built: take the set of `evidence_url`s in this slice, then
sweep every other slice for edges citing any of them.

Run of 2026-09-14 over those 140: **A 126 · B 14 · C 0**, and 35 cache documents were written
covering both groups.

## 4. What was refused, and what is one fetch away

- ~~**`nace-rev2 -> isic`**~~ — **CLOSED the same day, at A, and this entry was wrong about why it
  was open.** It read: *"the URL tried … returned a 10-page cover extract rather than the ~370-page
  volume. One good fetch closes it."* No second fetch was needed. **That PDF is the full 369-page
  volume and always was.** `file` reports it as `PDF document, version 1.6, 10 page(s)` — it
  misreads that file's linearised page tree — while `pdfinfo` reports 369 and `pdftotext` extracts
  all of it. The document was in hand and was written off on one tool's wrong answer.
  **Check `pdfinfo`, never `file`, before calling a PDF truncated.** What it contains, under its
  own heading *NACE link to ISIC*, paragraph 121: *"NACE is a derived classification of ISIC:
  categories at all levels of NACE are defined either to be identical to, or to form subsets of,
  single ISIC categories."* Graded **A**, `quote-found-artefact-named`. The refusal of Regulation
  (EC) No 1893/2006 as the evidence was and remains correct — recital 8 places a requirement on
  users and Annex I is a correspondence column; neither states the derivation.

  **The same volume paid twice more, which is the real lesson: it was never one edge away, it was
  three.** Section 4.2, paragraph 125 states the CPA-to-NACE relationship — *"with NACE as the
  reference framework … the structure of CPA corresponds to NACE"* — which the CPA's own
  establishing regulation never mentions (**B**, `artefact-named-elsewhere-in-document`: coverage
  is 1.0, but `nace-rev2`'s title is long and the volume's own running header prints *"activites"*
  for *"activities"* on every page, so the alias cannot land in the window). Paragraph 127 states
  where the Prodcom list's headings come from (**A**, quoted in two fragments because paragraph 127
  names the Combined Nomenclature only by a two-letter acronym, below the grader's acronym floor).

  **One basis had to be reworded, and it is worth knowing why:** the Prodcom edge first graded B
  with reason `inferred` — `WEAK_BASIS_PATTERNS` matched a trigger word sitting inside a clause that
  was DENYING the edge rested on anything of the kind. The guard reads the prose, not the argument.
  Third time this project has been caught by it.
- **`cpa -> cpc`** — no CPC node exists, and Regulation (EC) No 451/2008's only upstream
  statement is the same "directly linked to" shape (CPC Ver. 2, recital 10). Also worth
  recording: **"NACE" appears zero times in the whole CPA regulation**, so the CPA-to-NACE
  relationship everybody assumes is not stated by the act that establishes the CPA. It is
  stated by Eurostat's Prodcom metadata, which is where this round's Prodcom edges come from.
- **Germany and Türkiye** — ESMS pages read, edges not wired: the corpus nodes
  (`de-destatis-cpi`, `tr-cpi`) are the national CPI and the pages describe the HICP. A German
  HICP node would close that and would also give `eurostat-hicp` the German in-edge it lacks.
- **NUTS** — Regulation (EC) No 1059/2003 was fetched and read (Articles 1-3 establish the
  classification) and NOT minted, because nothing in the corpus yet names NUTS as its own
  basis, and a classification node with no in-edge is a node waiting for a round rather than a
  finding. The act is one `Accept: text/html` CELLAR fetch away when a regional-statistics
  round wants it.
- **PRODCOM's own founding act**, Council Regulation (EEC) No 3924/91, was fetched and read and
  is **repealed** by Regulation (EU) 2019/2152, which is why the Prodcom node's legal basis is
  wired to 2019/2152 instead.
