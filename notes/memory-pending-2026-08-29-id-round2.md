# Memory pending — 2026-08-29

Project memory tool was unavailable this session. Write this up as
`unlinked_nodes_wiring_round5_2026-08-29` (or similar) next time memory is
reachable, then delete this file.

---

**Indonesia unlinked-node wiring, round 2** (`id-unlinked-wiring-round2-
2026-08-29.json`). Thomas: "go to ID 90/118 next, get grok's help" —
`notes/grok-prompt-wiring-indonesia-round2-2026-08-29.md` drafted and run
through Grok same day. Grok's sandbox lacked `id-indonesia-grok-2026-08.
json` despite being asked to attach it — worked from the id/title list
pasted in the prompt text only, and flagged the gap itself in its reply's
`_meta`.

All 16 of Grok's proposed dependencies were independently re-fetched by the
orchestrating session (PLAYBOOK rule 3 — never trust a self-reported
quote), not just parse-checked. **10 of 16 survived**: the cited page or
document, re-fetched fresh, actually contained the claimed statement.
Minted with 2 new nodes (`id-djpk-apbd` — DJPK local-government fiscal-
balance data; `id-bkpm-lkpm` — BKPM's LKPM investment-activity filings),
both plain administrative-data sources feeding an already-live BPS/BKPM
product. **6 of 16 held, not minted** — 3 hit BPS "statistics-table"
landing pages that render only a title/menu chrome to a non-JS fetch (same
shape as known BPS JS-rendering issues), the other 3 hit BPS "publication"
PDFs behind a signed `web-api.bps.go.id/download.php?f=...` link that
403'd both directly and via the docs.google.com/viewer workaround that
normally unblocks imf.org PDFs — that workaround doesn't transfer to this
domain. All 6 recorded in `_dropped` as `deferred` (real leads, not
confirmed absences) — `id-gini-inequality`→`id-susenas`,
`id-cpi-provincial`→`un-coicop-2018`/`cpi-manual` (same blocked PDF, both
leads), `id-energy-balances`→ and `id-ghg-inventory`→ a proposed-but-
unminted `id-esdm-energy-statistics` node (from the same blocked PDF),
`id-ghg-inventory`→ a proposed-but-unminted `ipcc-2006-gl` node (blocked
BPS statistics-table page).

Net, measured via `npm run validate` before/after (not guessed, per rule
8): **10 edges, 2 new nodes, 13 previously-isolated Indonesia nodes
closed** — Indonesia's unlinked count went 98/126 → 85/128. Several edges
closed two previously-isolated nodes each: `id-financial-stability-
review`/`id-sski`/`id-economic-report-indonesia` all wired to the
previously-also-isolated `id-bank-indonesia`, closing 4 nodes with 3 edges
in one move. `npm run validate` 120/120, `tsc --noEmit` clean, `npm run
build` clean (bundle unchanged, corpus-data.json is fetched separately —
expected) in a fresh cloud sandbox before shipping.

**Separately this same session**: found the last few handoffs' per-country
unlinked-count figures for TW/PH/VN/KR/MX/IR/JP/TR were stale — several
2026-08-29 research rounds added candidate nodes faster than they wired
them, so isolated counts had drifted upward for some countries without
anyone re-measuring. Corrected in `HANDOFF.md` §2 the same day. Also
closed Thomas's 3 outstanding modelling decisions (Iran SNA vintage,
generic COICOP, generic MFSM — all "don't wire/disregard", now in
PLAYBOOK §7) and shipped the cluster-repulsion range 10→15.
