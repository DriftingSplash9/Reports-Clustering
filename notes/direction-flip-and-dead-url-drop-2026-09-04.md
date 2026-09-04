# Direction flips + dead-URL drops — 2026-09-04

Thomas's rulings on HANDOFF items 1 and 4 (2026-09-04, 00:xx MDT), executed by
`edit_scripts/flip-and-drop-2026-09-04.py` (dry-run checks, then `--write`).

## Item 1 — "flip the wrong-way edges" (18)

All 18 rows of `Claude outputs/direction-suspect-jp-kr-2026-09-03.json` flipped
in place: `source_report_id` ↔ `target_report_id`, everything else carried over
(grade, citation, quote). A sentence was appended to each `basis` saying it was
flipped and why. Each original is preserved verbatim in a `wrong-direction`
`_dropped` note in the same slice (precedent: the FIES→CPI entry in
`jp-japan-grok-2026-08.json`). Pre-checks: no reverse edge already live, no
`no-document`/`denied` note on the reverse pair anywhere in the corpus (rule 14),
no `part_of` collision, nothing in `src/data/dependencies.ts`.

One caveat note had to move: `jp-kr-wiring-grok-2026-08.json` carried a `caveat`
on `jp-monthly-labour-survey -> jp-national-accounts` (which itself argued the
direction was backwards). Its `source`/`target`/`edge` now name the flipped edge
and the `why` is prefixed with a dated line, so it still points at a live edge.

Files: `jp-japan-grok-2026-08.json` (15), `kr-south-korea-grok-2026-08.json` (2),
`andean-wiring-grok-2026-08.json` (1). Log: `Claude outputs/direction-flips-2026-09-04.json`.

## Item 4 — "drop the dead-URL edges" (93 of 131)

The debt list (`grade-batch2-debt-2026-09-03.json` → `dead_urls`, 131 rows) is
not all rot: 99 were HTTP 404, 32 were 403/401/500/503/504/522 — walls and
transient errors, which PLAYBOOK §6 says are NOT link rot ("an archived snapshot
may rescue a wall; it must never rescue a 404" — the converse holds too). Every
404 was re-fetched from the bridge VM with a browser UA on 2026-09-04:

- **93 → 404 again → moved to `_dropped` `no-document`**, original entry verbatim
  in `why`, flagged as a lead ("re-cite from a live document and re-mint").
  58 of them are `s-circabc.europa.eu` (the EDP inventories, the ESS peer-review
  country reports); 15 `singstat.gov.sg`; the rest scattered.
- **2 kept live** — `podaci.dzs.hr/.../proracunski-manjak-i-opci-dug-drzave/` is
  back (200, 120 KB): `hr-edp-inventory -> hr-dzs-government-finance`,
  `eurostat-edp-notification-tables -> hr-dzs-government-finance`. Still C;
  a re-grade would settle them.
- **4 kept live, unconfirmable** — `rosstat.gov.ru` ×3 and `sis.gov.eg` ×1
  time out from the VM (no answer, not a 404), so today's network could not
  confirm yesterday's 404. Left as C.
- **32 kept live** — the non-404 rows. They belong to the browser pass (HANDOFF
  item 5), not the dead-URL class.

Full list with per-row reason: `Claude outputs/dead-url-drops-2026-09-04.json`
(`rows` = dropped, `kept_live` = the 38 with why).

Two reports lost their last edge and are now shelved as ISOLATED by the validator:
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`.

## Verification

Bridge-VM scratch copy (`$HOME/work`, PLAYBOOK §6 recipe): `npm run validate`
exit 0 — gen 347 slices, logic 123/123, validator **3,341 reports / 2,633
dependencies**, 0 errors. `tsc --noEmit` clean. `public/corpus-data.json`
regenerated and copied back. No script changed.

Grades after: **470 A · 1,285 B · 868 C** (research slices), A-share **17.9%**
(was 17.3% — the drops were all C except three B).

## Item 2 — the two round-A citations (closed the same night)

- `tr-cpi → un-coicop-2018`: Thomas downloaded the PDF himself; the VM re-fetched
  the token URL and got the byte-identical file (sha256 `789a0fb9…f579`,
  3,780,750 B, 62 pp.). The token held across two days and two networks — treated
  as a document id. Citation left as is, grade B unchanged; caveat note added.
- `ir-national-accounts → sna-2008`: read `cbi.ir/simplelist/4454.aspx` in
  Thomas's Chrome (only route that gets past F5). The page is the CBI Economic
  Accounts Department's own note on the SNA 2008 series; a verbatim sentence
  ("…پیاده سازی نظام حساب‌های ملی 2008 را از اواخر سال 1396 در دستور کار خود
  قرار داد") is now `evidence_quote`. C→B by hand — not A, because the grader
  can't raw-fetch the host, so the A bar isn't machine-checkable. Caveat added.

Both in `ir-iq-tr-sy-wiring-grok-2026-08.json`. Validate 0 after; grades
470 A · 1,286 B · 867 C.
