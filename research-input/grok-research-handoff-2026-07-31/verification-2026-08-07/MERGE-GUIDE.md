# Merge guide — verifying and converting a Grok handoff slice

You are converting ONE slice from
`research-input/grok-research-handoff-2026-07-31/grok-research/` into the live
corpus schema, verifying every edge against its source document as you go.
Repo root: `/home/claude/rc`. Write outputs ONLY into `merge-work/` — do NOT
touch `src/`.

## The one rule of this corpus

A node is a **recurrently published official (or published-commercial) report,
statistical release, or consolidated statute/regulation** — never an
organization, never a one-off. An edge exists ONLY if a document says the
source report uses the target report as an input. No document, no edge.
"Publishes" is not a dependency — an org publishing a report is off-model;
reject such edges with a note.

## Verification standard (this is the point of the exercise)

For every proposed dependency:
1. Identify the evidence document (the handoff's `basis`/`justification`
   names it; some have URLs, some don't — find the official URL).
2. Fetch it with WebFetch, prompting for the exact verbatim sentence(s)
   that name the target as an input. Statutes on laws-lois.justice.gc.ca,
   ontario.ca/laws, canlii.org, legisquebec fetch well.
3. VERIFIED → goes in `dependencies[]` with `basis` (close-to-verbatim,
   quote the operative words), `evidence_url` (the document you actually
   fetched), correct `relationship_type` and direction (SOURCE depends on
   TARGET: source is calculated FROM target).
4. NOT confirmed (fetch failed, wording doesn't support it, document not
   found) → goes in `_dropped[]` with a `reason` and a full `why` that
   preserves the original claim so nothing is lost. Never silently discard.
5. If the target is real but no node exists for it and it's out of scope to
   build now → `_dropped` reason `no-node-yet` or `deferred`.

Do NOT relax to `evidence: "implied"` — that is reserved and rare. An edge
you can't document goes to `_dropped`.

## Live schema (src/lib/types.ts is authoritative — read it if unsure)

Report: { id, title, publisher, country (ISO-3166, e.g. "CA"),
jurisdiction_level ('international'|'supranational'|'federal'|'provincial'|
'municipal'|'institutional'), source_kind? ('official' default | 'commercial'),
region (e.g. "Alberta", "Canada", "Calgary, Alberta"), description (1-3
sentences, factual), releases_per_year (number; 0.1 for decennial etc.),
changes_per_year?, cadence_note?, terminal_reason?, last_updated: null,
url (official landing page — verify it resolves), domains: Domain[] }

Domain is CLOSED: inflation, labour, monetary-policy, national-accounts,
benefits, interest-rates, municipal-finance, education, post-secondary,
health, fiscal-transfers, population, taxation, assessment, energy-royalties,
banking, financial-regulation. Map anything else to the nearest (equalization
→ fiscal-transfers; housing → benefits or municipal-finance as fits).

Dependency: { source_report_id, target_report_id, relationship_type
('calculated_from' | 'uses_data_from' | 'methodology_depends_on' | 'cites'),
basis, evidence_url }. Type mapping from handoff: "uses_data_from" keeps;
statutory formula → calculated_from; defines-method → methodology_depends_on;
context-only → cites.

DroppedNote: { source, target, reason, why } — reason ∈ denied, no-document,
wrong-target, wrong-direction, unpublishable-source, unreadable-source,
no-node-yet, deferred, note.

## Id discipline (validator now FAILS on duplicates)

`merge-work/live-ids.txt` lists all 284 existing ids. Before minting an id:
- If the report already exists (StatCan CPI = `statcan-cpi`, population
  estimates, federal acts, etc.), USE the existing id — grep live-ids.txt
  and `src/data/research/*.json` to check. Prefer wiring edges into existing
  nodes over minting near-duplicates.
- New ids follow the house pattern: lowercase, hyphenated,
  `<jurisdiction-or-publisher>-<subject>` (e.g. `on-odsp-regulation`,
  `statcan-provincial-economic-accounts`).

## Output files (write both)

1. `merge-work/<slicename>.slice.json` — {"_slice": "...", "_researched":
   "2026-07-30", "_merged": "2026-08-07", "_note": "<provenance: from the
   2026-07-31 Grok handoff, verified against primary sources 2026-08-07;
   summarize what survived>", "reports": [...], "dependencies": [...],
   "_dropped": [...]}. Include ONLY reports that anchor at least one
   surviving dependency (either end) — a report with no surviving edge is
   allowed (isolated nodes are kept in this corpus) but only if it clearly
   qualifies as a node and was a deliberate part of the slice's point;
   otherwise drop it and say so in the report.
2. `merge-work/<slicename>.report.md` — per-edge verdict table: original
   claim → VERIFIED (with the quote) / DROPPED (reason) / REMAPPED (to
   existing id). Plus anything the next session should know.

Your final message: one paragraph — counts (reports kept/new, edges
verified/dropped), and anything that needs my attention at integration.
