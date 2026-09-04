# Browser pass, round 5 — 2026-09-04

Picks up HANDOFF agent item 1 (the last 15 browser-pass edges), and closes it.
Six documents attempted, three edges moved, one to A; then Thomas ruled on the
round's two research findings and both edges were dropped. Corpus
**580 A · 1362 B · 690 C** of **2,632** (from 579/1360/695 of 2,634).
`npm run validate` exits 0, `tsc --noEmit` clean, 123/123 logic tests, grader
selftest 47/47, `public/corpus-data.json` regenerated. Nothing in `src/`
outside the corpus, and nothing in `scripts/`, was touched.

## What moved

| edge | was | now | how |
|---|---|---|---|
| `ph-defence-budget -> ph-gaa` | C | **A** | Chrome capture; the page quotes GAA §96 verbatim |
| `mx-oaxaca-de-juarez -> mx-censo-poblacion` | C | B | Chrome + pdf.js, 365 pp, coverage 1.0, `target-not-named` |
| `ph-barmm -> ph-national-accounts` | C | B | Chrome capture; the grader's own `consistent-with` cap |

Before/after pair: `Claude outputs/grade-round5-{before,written}-2026-09-04.json`.
Selection file: `Claude outputs/browser-pass-round5-edges-2026-09-04.json`.
3 up, 0 down. All three needed an `evidence_quote` written by hand — every one
had a basis that quoted nothing the grader could see.

## Routing, re-probed 2026-09-04 from BOTH networks the same hour

The round-3 table still holds for these six; nothing decayed in our favour.

- **Cloudflare "Just a moment" from both, so browser jobs** —
  `transparencia.municipiodeoaxaca.gob.mx`, `rssobarmm.psa.gov.ph`,
  `dnd.gov.ph`. All three cleared in Chrome on the first navigation.
- **Cloudflare HARD block from both** (`Sorry, you have been blocked`, not a
  challenge) — `documentcloud.org`. Not needed: see below.
- **TCP reset from both, and `chrome-error://` in Chrome too** —
  `resource.capetown.gov.za`. Three networks, three failures; this one is
  genuinely dead, not walled. `www.capetown.gov.za` answers 200, only the
  `resource.` host refuses. `mfma.treasury.gov.za` is dead the same way and
  `treasury.gov.za/legislation/mfma/circulars/` serves the homepage.
- **`ipdp.cdmx.gob.mx` (2 edges) is dead too** — `ERR_CONNECTION_TIMED_OUT`
  in Chrome once the extension permission came through, TCP reset from both
  the VM and the sandbox, and **no Wayback snapshot** (`archived_snapshots: {}`).
  Every documented route is exhausted; those two edges stay C, which is what a
  C is for.

  **A correction worth keeping, because I got it wrong mid-round.** A domain
  awaiting extension approval leaves the tab WHERE IT WAS while `navigate`
  still reports success, which looks exactly like a permission block that will
  never clear — I read it that way and said so. Once approved, the same host
  behaved like any other and moved the tab to `chrome-error://chromewebdata/`.
  So the tab-does-not-move signature means **approval is pending**, not
  "blocked forever", and it says nothing at all about whether the host is
  alive. Ask for the grant, then re-probe before recording anything.

## Two of the 15 were research problems — both dropped on Thomas's ruling

1. **`brics-johannesburg-ii-declaration-2023 -> brics-ndb-agreement-2014`
   is assertion-only.** documentcloud.org is a mirror; the primary is
   `dirco.gov.za/wp-content/uploads/2023/08/Jhb-II-Declaration-24-August-2023.pdf`
   and it fetched clean from the sandbox on the first try (336,507 bytes). The
   Declaration names the New Development Bank eight times and the **2014
   Agreement not once**: zero hits for "Fortaleza", zero for "Articles of
   Agreement", and its only "2014" is a Conference on Disarmament reference.
   Para 46 is the whole of it — "We recognise the key role of the NDB in
   promoting infrastructure and sustainable development of its member
   countries" — which names the INSTITUTION, the F-05 shape exactly. No
   capture can fix this. Candidate for `_dropped` `no-document`; **not
   executed** — a demotion of a live edge is Thomas's call (rule 13), and the
   sibling edge `ndb-russia-erc-host-agreement-2019 -> brics-ndb-agreement-2014`
   is a Host Country Agreement and a different case. **Ruled 'demote it'
   (Thomas, 2026-09-04) and executed**: moved to `_dropped` `no-document` in
   `int-brics-international-layer-grok-2026-08.json`, original entry preserved
   verbatim in `why`. It was the node's ONLY edge, so
   `brics-johannesburg-ii-declaration-2023` is now isolated and shows on the
   unlinked shelf.
2. **`za-nt-mfma-circular-cpi-guidance -> za-statssa-cpi` cites the wrong
   document.** The source node is National Treasury's MFMA circulars; the
   `evidence_url` is a **City of Cape Town budget annexure**. That is the
   "basis quotes document X while `evidence_url` points at document Y" defect
   in techniques §5, and the basis says so itself: it sources the CPI forecast
   to "National Treasury Budget Review 2025" and flags the link as indirect.
   Even a successful capture cannot make this an A. Re-citing to Circular
   129/132 was attempted and every treasury host is dead. **Ruled 'drop'
   (Thomas, 2026-09-04) and executed**: `_dropped` `no-document` in
   `za-joburg-municipal-finance.json`, original preserved verbatim, with the
   re-mint condition written into the `why`. The source node keeps its inbound
   edge from `za-joburg-mtref-budget` and is not orphaned.

## One measured gap, unapplied — the run rule and an interpolated word

`mx-oaxaca-de-juarez -> mx-censo-poblacion` has coverage 1.0 on a verbatim
quote and still grades B on `target-not-named`. The document says **"Censo
Nacional de Población y Vivienda 2020"**; the node is titled "Censo de
Población y Vivienda / Population and Housing Census". Both `namesTarget`
doors fail on one inserted word:

- **title-run** — 9 title tokens, so the 60% bar needs a contiguous run of 6;
  `de poblacion y vivienda` is 4, because `Nacional` breaks `censo` off the
  front.
- **title-lead** — `censo de poblacion y vivienda` is 5 words and would
  qualify, but `hay.includes()` is a whole-phrase test and the interpolated
  word defeats it. Measured on the capture: `censo de poblacion y vivienda`
  occurs 0 times, `censo nacional de poblacion y vivienda` once.

This is a THIRD member of the family already in HANDOFF §3 (the Hangul gap,
the whitespace gap): all three are `namesTarget` refusing a document that
plainly names the artefact. It is NOT the same fix — whitespace-insensitivity
does not help here; it would need the run rule to tolerate a small number of
interpolated tokens, which can only ADD matches and therefore owes the same
corpus-wide before/after as the other two. **Do not fix it by retitling the
node**: INEGI's own name for the artefact has no "Nacional", so the node title
is right and the municipality's rendering is loose (the 2026-09-04
publisher's-own-title ruling points the other way here). Not applied.

## Method — one correction to round 4's transport note, and one confirmation

1. **`get_page_text` truncates at 50,000 characters PER CALL, and the
   persisted file holds the TRUNCATED text, not the whole thing.** Round 4's
   note reads as if a single oversized `get_page_text` persists in full; it
   does not — a 288,138-char payload came back as a 51 KB file containing the
   50,000-char preview. What actually persists in full is the **batch**
   result. Emit in ≤44,000-char slices, one `javascript_tool` + one
   `get_page_text` per slice, all in ONE `browser_batch`; the batch result
   lands in `tool-results/toolu_*.json` complete. For a payload UNDER 50 KB,
   pad the batch by calling `get_page_text` on the same DOM 13-20 times —
   total over ~50 KB is what triggers the persist.
2. **Never retype base64, not even 4,128 characters of it.** Rather than
   re-emit a small capture as a batch, one was copied by hand into a heredoc;
   the sha256 caught a corrupted line immediately and the gzip refused to
   inflate. Cost: one wasted call. The checksum is not ceremony.
3. **A PDF that resets curl on both machines can still be `fetch()`ed
   same-origin in Chrome.** The Oaxaca PDF (4,985,073 bytes, 365 pages) came
   through `fetch(url, {credentials:'include'})` from the host's own root page
   after the Cloudflare challenge cleared, with pdf.js 3.11.174 injected from
   cdnjs — no CSP interference, 736,137 characters.
4. Route recorded as `via: chrome 2026-09-04` (HTML) and
   `via: chrome 2026-09-04 (pdfjs reading order)` (PDF). Both are direct reads
   of the cited URL on the live host, so neither caps (Thomas, 2026-09-04);
   `token-pdf` was NOT used because no signed link was involved.

## The 15, accounted for — the browser pass is CLOSED

- **3 graded up** (the table above).
- **2 dropped** on Thomas's ruling (`documentcloud.org`/BRICS,
  `resource.capetown.gov.za`/MFMA).
- **2 stay C, honestly** — both `ipdp.cdmx.gob.mx`. Dead on all three
  networks, no Wayback snapshot; there is nothing left to try, and a C is
  exactly the measurement for that.
- **1 is the OCR job** — `minfin.gov.ru`, agent item 3, needs
  `rus.traineddata`.
- **7 are the six India `.gov.in` + Tanzania re-cites** — agent item 2.

Nothing on this list is a capture problem any more. Captures from this round
are in `tmp_work/capture-2026-09-04/` as `.evidence-fulltext` records.
