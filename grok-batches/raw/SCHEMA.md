# Candidate / Batch JSON Schema

Use this shape when saving research results under the new node definition.  
One file per batch or per country is fine. Name files clearly, e.g.:

- `2026-08-14_EU-legal-instruments-batch1.json`
- `2026-08-15_unresearched-Kenya.json`

```json
{
  "meta": {
    "date": "YYYY-MM-DD",
    "actor": "Grok | Claude",
    "scope": "short description of what this batch covers",
    "rule": "static + recurring citation (2026-08-13 decision)",
    "status": "draft | ready-for-verify | verified | minted"
  },
  "candidates": [
    {
      "proposed_id": "kebab-case-id",
      "title": "Full official title",
      "publisher": "Organisation or body",
      "jurisdiction_level": "international | supranational | federal | provincial | municipal | institutional | commercial",
      "nation_or_scope": "e.g. EU, Kenya, Canada, global",
      "shape": "own-cadence | recurring-citation | one-off-foundational",
      "releases_per_year": null,
      "why_qualifies": "Short explanation — especially the recurring citation evidence for static documents",
      "evidence_for_recurrence": [
        {
          "citing_document": "title or id of the document that cites it recurringly",
          "reference_period_or_equivalent": "e.g. annual, every MFF period, 'updated each year in the quality report'",
          "evidence_url": "https://...",
          "quote_or_location": "optional short quote or section reference"
        }
      ],
      "proposed_edges": [
        {
          "source": "id-of-dependent-report",
          "target": "proposed_id",
          "relationship_type": "calculated_from | uses_data_from | methodology_depends_on | cites",
          "evidence_url": "https://...",
          "basis": "short description or quote",
          "reference_period": "optional"
        }
      ],
      "notes": "any caveats, open questions, or links to research notes",
      "priority": "high | medium | low"
    }
  ],
  "dropped_or_rejected": [
    {
      "title_or_id": "...",
      "reason": "why it still does not qualify even under the new rule",
      "notes": ""
    }
  ]
}
```

**Notes**
- `releases_per_year` should be `null` (or omitted) for pure recurring-citation / evergreen nodes.
- Always include at least one concrete piece of evidence for recurrence when the document itself has no cadence.
- Keep `proposed_edges` realistic — only edges you have evidence for.
- Claude verification should flip `meta.status` and may edit or reject individual candidates.
