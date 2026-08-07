# nz-checks — NZ branch cheap checks 1–2 (NZ/G.4.md), 2026-08-07

Scope: the two "cheap checks" items from `NZ/G.4.md` (Findings 2's three deferred
leads, minus the Public Finance Act 1989 lead, which stays deliberately deferred).
All fetches WebFetch, first-hand, 2026-08-07. No inherited quote was relied on;
the two that existed in the corpus were re-fetched and re-read at source before
minting. No new reports; no edits to `src/`.

## Per-edge verdicts

| # | Candidate edge | Verdict | Evidence |
|---|---|---|---|
| 1 | `nz-xrb-a1 -> nz-public-audit-act-2001` | **VERIFIED** — minted as `methodology_depends_on` | XRB A1 PDF, para 6: "Public sector public benefit entities (public sector PBEs) are PBEs that are public entities as defined in the Public Audit Act 2001, and all Offices of Parliament." Repeated in Appendix A para 4. Fetched from https://www.xrb.govt.nz/dmsdocument/3573/ (the standard's PDF link on the corpus's landing-page URL). |
| 2 | `nz-wellington-annual-report -> nz-public-audit-act-2001` | **VERIFIED** — minted as `cites` | Volume 2 PDF, Note 1, "Reporting entity", p. 16: "As a defined public entity under the Public Audit Act 2001, the Council is audited by the Office of the Auditor General and is classed as a Public Sector Public Benefit Entity (PBE) for financial reporting purposes." Matches the predecessor's extraction word-for-word. |
| 3 | `nz-oag-annual-report -> nz-pbe-ipsas-1` or `-> nz-xrb-a1` | **DROPPED** (`denied`) | Accounting policies REACHED — as HTML, not PDF. Note 1, Statement of compliance, verbatim: "The financial statements of the Office have been prepared in accordance with the requirements of the Public Finance Act 1989, which include the requirement to comply with New Zealand generally accepted accounting practice (NZ GAAP) and Treasury Instructions. The financial statements have been prepared in keeping with Tier 1 PBE Standards. These financial statements comply with PBE Financial Reporting Standards (FRS)." String search of the page: 0 hits for "PBE IPSAS", "IPSAS", "XRB", "External Reporting Board". Neither candidate target is named. |

## Relationship-type reasoning

- **Edge 1, `methodology_depends_on`**: the Act's definition of "public entity"
  is the operative criterion by which XRB A1 allocates entities to the
  public-sector-PBE track — the target defines a criterion the source's
  classification framework relies on (types.ts: "target defines a method…the
  source relies on"), not context.
- **Edge 2, `cites`**: the Act fixes the Council's auditor and statutory
  classification, but the report's preparation method comes from LGA 2002
  Schedule 10 and the PBE standards (already carried by the existing
  `nz-pbe-ipsas-1` edge). Context-grade reference; per G.4.md's own framing
  this one was always the `cites` of the pair.
- **Edge 3, denied not deferred**: the document was read and the naming is
  absent. Precedent applied is the corpus's own: Brisbane's refusal to name
  AASB 1049 carried no edge, and Wellington's PBE IPSAS 1 edge was minted on
  exact-title naming, not on its generic "Tier 1" compliance sentence.
  Flagged judgment call: "Tier 1" is a construct that exists only in XRB A1,
  so an integrator could defensibly mint
  `nz-oag-annual-report -[methodology_depends_on]-> nz-xrb-a1` on the
  self-classification alone; this session held to the named-standard rule.

## What the next session should know

1. **The OAG PDF still defeats extraction; the HTML does not.** WebFetch on
   https://ao.parliament.nz/2025/annual-report/annual-report.pdf truncates
   around page 52 (mid "Our people") — the same ~p.60 wall the 2026-08-06
   session hit with pypdf. But the entire back half is published as HTML
   section pages under `/2025/annual-report/financial-results/…`, including
   `notes-to-the-financial-statements`, which serves Note 1 in full. Route all
   future reads of this report through the HTML sections.
2. **Extraction-variance note**: one of three fetches of the notes page
   transcribed "in keeping of Tier 1 PBE Standards"; the other two, and the
   report's front-matter use of the same idiom, give "in keeping with", which
   is what the `_dropped` record quotes. If a future session gets a raw text
   dump, confirm the preposition.
3. The XRB A1 PDF is at https://www.xrb.govt.nz/dmsdocument/3573/ (714 KB),
   linked from the corpus's landing-page URL for `nz-xrb-a1`. Unlike the OAG
   PDF it answers targeted prompts fine, including page-6 definitions —
   G.3.md's "XRB PDF truncation" caveat did not bite for this document at
   this depth.
4. G.4.md's third deferred lead — the Public Finance Act 1989, named in both
   the OAG front matter and now in the OAG Statement of compliance — remains
   deliberately unminted, and edge 3's compliance statement strengthens the
   case that it is the right next statute to decide on: for the OAG's own
   accounts it is the PFA, not the Public Audit Act, that carries the NZ GAAP
   requirement.
