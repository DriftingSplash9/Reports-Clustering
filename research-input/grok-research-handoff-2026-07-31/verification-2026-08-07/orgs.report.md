# Triage report — org-heavy slices (financing-international-orgs + soft-power-and-isolated-orgs)

Merged 2026-08-07 from the 2026-07-31 Grok handoff. Both slices were built around
organisation nodes (`org-bis`, `org-imf`, ...) with `publishes` / `hosts` / `funds` /
`supports_membership` / interpretive edges — all off-model for this corpus. The triage
salvaged 3 report nodes and 4 verified report-to-report dependencies; everything else
(31 handoff nodes/placeholders, all 38 handoff edges) is in `_dropped` with the original
claim preserved. Heavy dropping was the intended outcome.

## Survivors

### New report nodes (3)

| id | why it earned its place |
|---|---|
| `imf-weo` | Genuine twice-yearly flagship; anchors a verified edge as target (Fiscal Monitor is based on the WEO database). |
| `imf-fiscal-monitor` | Genuine twice-yearly flagship; source of two verified edges. |
| `oecd-economic-outlook` | Genuine twice-yearly flagship; source of two verified edges. URL verified to resolve. |

No existing ids were reusable for these three (live corpus had only the manuals:
`imf-bpm6`, `imf-gfsm`, `oecd-frascati-manual`, `oecd-icio`, `bis-basel-framework`,
`sna-2008`, `esa-2010`). Note `ab-tbf-economic-outlook` exists but is Alberta — no clash.

### Verified dependencies (4)

| edge | type | verbatim evidence |
|---|---|---|
| `imf-fiscal-monitor` → `imf-weo` | uses_data_from | "Country-specific data and projections for key fiscal variables are based on the April 2025 World Economic Outlook database, unless indicated otherwise, and compiled by IMF staff." — Fiscal Monitor Methodological and Statistical Appendix, Apr 2025 (imf.org .../fiscal-monitor/2025/english/msa.pdf) |
| `imf-fiscal-monitor` → `imf-gfsm` | methodology_depends_on | "In many economies, fiscal data follow the IMF's Government Finance Statistics Manual 2014." — same MSA |
| `oecd-economic-outlook` → `sna-2008` | methodology_depends_on | "All OECD countries have implemented the SNA 2008 methodology (or ESA 2010, its European equivalent)." + historical data sourced from "publications of national statistical agencies and OECD statistical databases such as the OECD Quarterly National Accounts, OECD Annual National Accounts" — OECD Economic Outlook Database Inventory (EO107), stats.oecd.org fileview |
| `oecd-economic-outlook` → `imf-bpm6` | methodology_depends_on | "All countries follow the BPM6 methodology; BPM6 is the acronym for the sixth edition of the 'Balance of Payments and International Investment Position Manual'." — same Inventory |

Not taken though arguably supported by the same MSA sentence: `imf-fiscal-monitor` →
`sna-2008` / `esa-2010` ("...or are produced using a national accounts methodology that
follows the 2008 System of National Accounts (SNA) or ESA 2010, both broadly aligned
with the GFSM 2014"). These are alternates-to-GFSM in an "or" clause; I kept only the
directly named IMF standard. Promote them at integration if you want the denser wiring —
the quote is in the slice's basis text.

## Per-edge verdicts — soft-power slice (25 edges, all DROPPED)

| original claim | verdict |
|---|---|
| org-bis publishes bis-annual-report / bis-quarterly-review / bis-annual-economic-report (3 edges) | DROPPED (note — off-model: org node / publishes edge) |
| org-wto publishes world-trade-report / annual-report / trade-monitoring (3 edges) | DROPPED (note — off-model) |
| org-imf publishes weo / gfsr / fiscal-monitor / article-iv / article-iv-canada-2025 (5 edges) | DROPPED (note — off-model; weo and fiscal-monitor survive as nodes, the publishes edges do not) |
| org-wef hosts davos; publishes global-risks (2 edges) | DROPPED (note — off-model; davos is a meeting, not a report) |
| org-oecd publishes economic-surveys / economic-outlook / economic-survey-canada-2025 (3 edges) | DROPPED (note — off-model; economic-outlook survives as a node) |
| org-g20 hosts g20-leaders-summit | DROPPED (note — off-model) |
| org-imf ↔ org-wef mutual_consideration (2 edges, political_inference) | DROPPED (note — org-to-org interpretive) |
| org-bis → org-imf ritual_peer_forum | DROPPED (note — org-to-org; the real BIS→OSFI channel already exists via bis-basel-framework) |
| org-imf → org-oecd ritual_peer_forum | DROPPED (note — org-to-org) |
| org-wto → org-oecd ritual_peer_forum (joint G20 Trade Monitoring) | DROPPED (note — org-to-org; best future rebuild candidate as a report node with joint-authorship edges) |
| org-g20 → org-imf / org-oecd / org-wto agenda_resonance (3 edges) | DROPPED (note — org-to-org interpretive) |

## Per-edge verdicts — financing slice (13 edges, all DROPPED)

All 13 are `funds` / `contingent_commitment` / `supports_membership` / `project_support`
edges between a placeholder (`canada-federal-budget-or-estimates`), contribution
line-items (`fin-*`), and org nodes (`org-imf`, `org-oecd`, `org-wef`, `org-wbg-approx`,
`org-un-approx`). None connects two published reports; all DROPPED with reason `note`
(off-model), full amounts and source claims preserved in `_dropped` `why` fields
(IMF quota SDR 11,023.9m; IDA ~CAD 15.67bn cumulative; OECD assessed ~CAD 17.8m;
UN scale 2.543%; WEF project grants $17–23m+; etc.).

## Salvage attempts that failed

- `imf-weo` → `sna-2008` / `imf-gfsm`: fetched the WEO FAQ, the April 2025 WEO full
  text (Assumptions and Conventions / Data sections), the WEO database landing pages and
  the new IMF Data portal page. None yields a verbatim SNA 2008 / GFSM 2014 statement;
  the FAQ's debt definition cites **GFSM 2001** (wrong edition vs the live GFSM 2014
  node → recorded as `wrong-target`). WEO's documented sourcing ("information gathered
  by the IMF country desk officers in the context of their missions to IMF member
  countries") names no target report. So `imf-weo` merges with no outgoing edges —
  it is kept because it anchors the Fiscal Monitor edge as target.

## For the next session

1. Best rebuild candidates from this material, in order: (a) WTO/OECD/UNCTAD joint G20
   Trade Monitoring report with documented joint-sourcing edges; (b) a Canada Article IV
   series node with a verified uses_data_from edge into StatCan releases (the staff
   report's Statistical Issues annex names Statistics Canada sources); (c) an OECD
   Economic Surveys: Canada series node; (d) `imf-gfsr` wired to the WEO database the
   same way the Fiscal Monitor was; (e) BIS Annual Economic Report if an edge can be
   documented.
2. The financing slice's *evidence documents* — Public Accounts of Canada, Statistical
   Report on International Assistance, Report to Parliament on International Assistance —
   are genuine recurrent federal publications and could become real nodes in a future
   federal-finance slice. The financing *line-items* never can.
3. The stats.oecd.org fileview evidence URL for the EO Database Inventory is a GUID link
   (EO107, Volume 2020/1); it fetched fine today but is the most fragile URL in the
   slice — consider re-anchoring to a newer inventory PDF at integration if one is
   easier to link.
4. Grok's `_note_for_claude` in both files says to talk to Thomas before merging any of
   the soft/financing layers into the main graph. This triage merges none of those
   layers — only orthodox report-to-report edges — so that constraint is respected, but
   Thomas may still want the soft-layer idea revisited as a separate, differently-typed
   overlay outside this corpus.
