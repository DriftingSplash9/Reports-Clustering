# Proposal: Multi-scale Geographic & Institutional Forces

**Status:** Proposal for implementation  
**Date:** 2026-08-10  
**Author context:** Layout discussion with Grok; intended for Claude to implement against the current force-directed renderer.

---

## 1. Problem

At 763 reports the central multi-coloured cluster has become a classic force-directed hairball. Edge attractions dominate; national and continental groups interpenetrate; identity and local structure inside the core are hard to read.

Glow is low-value (little visible difference). Distance haze will become more important as the graph grows and should be retained / strengthened. What is missing is a controlled expansion and organisation term that:

- separates continents so the global layout breathes,
- lets nations that share statistical practices, strong economic ties, or similar institutional structure sit nearer one another,
- still allows strong documented dependency edges to override the soft geographic preferences,
- remains fully tunable and measurable.

---

## 2. Hard design constraints (do not violate)

From `REPORTS.md`:

> Position encodes only the edges. Nothing about a node’s coordinates may assert a hierarchy the dependency data does not contain.

Therefore:

- All new forces are **secondary layout aids**. They must never alter authority scores, edge existence, or the evidence model.
- When a high-weight dependency edge exists between two nodes of different nations/continents, the data force must be able to win.
- Turning every new force strength to zero must restore the pure dependency layout exactly.
- No external data (trade volumes, GDP, etc.) may be written into the report or dependency records. External numbers are used only inside the force functions at layout time.

---

## 3. Proposed force hierarchy (strongest → weakest)

| Priority | Force | Purpose | Strength parameter |
|----------|-------|---------|--------------------|
| 1 (data) | Existing edge attraction (weighted by relationship type) + base many-body repulsion + collision/centering | Encodes the actual evidence graph | (existing) |
| 2 | Continental repulsion | Pushes different continents apart (the “dark energy” term that opens the hairball) | `k_cont` |
| 3 | Nation affinity attraction | Soft springs between nations according to the affinity score defined below | `k_geo` |
| 4 (optional) | National cohesion | Very mild attraction among nodes of the *same* nation | `k_nat` (default 0) |

Glow can be removed or heavily demoted. Distance haze stays.

---

## 4. Nation affinity score

Replace any hand-curated adjacency list with an explicit, measurable score:

\[
A_{ij} = w_s \cdot S_{ij} + w_t \cdot T_{ij} + w_g \cdot G_{ij}
\]

where \(w_s + w_t + w_g = 1\) and each component is normalised to approximately \([0,1]\).

The attractive force between a node of nation \(i\) and a node of nation \(j\) is proportional to \(A_{ij}\) and falls with distance (exact fall-off is an implementation detail; \(1/r\) or \(1/r^2\) both fine).

### 4.1 Statistical-practice similarity \(S_{ij}\) (primary term)

Derive this **from the graph itself** so it stays inside the project’s evidence standard.

For each nation collect the set (or authority-weighted multiset) of high-authority international / methodological standards its reports depend on. Relevant standards already present or expected in the corpus include:

- System of National Accounts 2008 (SNA 2008)
- European System of Accounts 2010 (ESA 2010)
- Regulation (EC) No 223/2009 and the European Statistics Code of Practice
- BPM6, GFSM 2014
- IPSAS / related public-sector accounting frameworks
- Basel Framework
- other recurring international manuals that appear as high-authority nodes

Then:

\[
S_{ij} = \text{cosine similarity (or Jaccard) of the two nations’ standard sets}
\]

Optionally weight each shared standard by its authority score so that sharing ESA 2010 counts more than sharing a low-authority manual.

Two nations that both lean heavily on the same international frameworks will score high even if bilateral trade is modest. This is the term most aligned with the project’s purpose.

### 4.2 Trade intensity \(T_{ij}\)

Use publicly available bilateral trade and GDP figures (IMF Direction of Trade Statistics, UN Comtrade, World Bank, or national statistical agencies).

Raw gravity-style measure:

\[
T_{ij}^{\text{raw}} = \frac{\text{bilateral trade}_{ij}}{\sqrt{\text{GDP}_i \cdot \text{GDP}_j}}
\]

Then:

\[
T_{ij} = \text{normalise}\bigl(\log(1 + T_{ij}^{\text{raw}})\bigr)
\]

(min-max or rank normalisation across all nation pairs so values sit in \([0,1]\)).

This term will surface both the strong Canada–US relationship and the Canada–Netherlands > Canada–Mexico pattern. Keep its weight modest so it cannot override strong evidence edges.

### 4.3 Governance / institutional similarity \(G_{ij}\) (optional, lowest weight)

Keep the feature set deliberately small and explicit:

- shared legal family (common-law / civil-law / mixed)
- federal vs unitary
- membership in the same deep institutional clubs (OECD, EU, Commonwealth, Francophonie, \ldots)
- public-sector accounting tradition (IPSAS-adopting vs GASB-influenced vs pure national)

Each matching feature adds a fixed increment; normalise to \([0,1]\).  
It is acceptable (and recommended for the first implementation) to set \(w_g = 0\) and omit this term entirely.

---

## 5. Recommended starting weights

| Component | Symbol | Suggested range | Starting value |
|-----------|--------|-----------------|----------------|
| Statistical similarity | \(w_s\) | 0.55–0.70 | **0.65** |
| Trade intensity | \(w_t\) | 0.25–0.35 | **0.30** |
| Governance | \(w_g\) | 0.00–0.15 | **0.05** (or 0) |

These can later be exposed as VIEW-panel controls. For the first version hard-code the triple above.

---

## 6. Implementation notes (stack-aware)

The project already uses `d3-force-3d` / `three-forcegraph` and a VIEW panel with live sliders (Cluster spread, Distance haze, Glow, etc.).

### 6.1 New forces to register

```ts
simulation
  .force("continentRepel", forceContinentRepulsion()
    .strength(k_cont)
    .continent(d => d.continent)          // derived from existing publisher-scope / jurisdiction data
  )
  .force("nationAffinity", forceNationAffinity()
    .strength(k_geo)
    .affinity(A)                          // precomputed matrix or lookup
    .nation(d => d.nation)
  )
  // optional
  .force("nationCohesion", forceNationCohesion()
    .strength(k_nat)                      // default 0
    .nation(d => d.nation)
  );
```

Exact force-function signatures can follow the existing custom-force patterns already in the codebase.

### 6.2 Data required at layout time only

- Per-report `nation` and `continent` labels (derive from existing publisher-scope / jurisdiction fields; do not invent new report fields unless necessary).
- Precomputed nation–nation affinity matrix \(A_{ij}\) (or on-the-fly lookup).
- For the trade term: a small static JSON of recent bilateral trade + GDP figures (updated infrequently; not part of the evidence graph).

### 6.3 VIEW panel

- Remove or heavily demote Glow.
- Keep / possibly strengthen Distance haze.
- Add three new sliders (or two if governance is omitted):
  - Continental repulsion (`k_cont`)
  - Geographic / affinity attraction (`k_geo`)
  - (optional) National cohesion (`k_nat`)

Default all new strengths low enough that the pure dependency layout remains the baseline impression.

---

## 7. Measurement (required for any tuning)

After each change to the force strengths, compute and surface at least:

1. Mean intra-continent distance vs mean inter-continent distance.
2. Mean distance of high-affinity nation pairs (especially Canada–US, Canada–Mexico, Canada–Netherlands, Australia–NZ, intra-EU).
3. Stretch ratio of actual cross-nation / cross-continent **dependency edges** (length relative to median edge).  
   If this ratio climbs sharply, the layout is fighting the data → lower `k_cont` or `k_geo`.

These numbers can live in the validate output or a small debug readout. They turn tuning from vibes into measurement.

---

## 8. Success criteria

- Continents form visibly distinct regions without becoming isolated islands.
- Nations that share high statistical-practice similarity and/or strong trade sit nearer one another than unrelated pairs.
- Strong documented cross-border dependency edges remain short enough to follow by eye; they are not stretched into meaningless lines.
- Authority ranking and node sizes are completely unchanged.
- Setting every new force strength to zero restores the previous pure-dependency layout.
- Canada–US proximity is natural; the Canada–Netherlands vs Canada–Mexico tension is visible but does not dominate if \(w_s\) is kept primary.

---

## 9. Out of scope for this change

- Any modification to authority calculation, edge creation rules, or the evidence standard.
- Injecting trade or GDP numbers into the persistent report/dependency data.
- Full hierarchical multi-level layout or community-detection-driven aggregation (future work once node count exceeds ~1500).
- Real-time updates of trade data.

---

## 10. Suggested implementation order

1. Remove or demote Glow; confirm Distance haze still works.
2. Add continental repulsion only (`k_cont`). Measure separation and edge stretch.
3. Implement graph-derived statistical similarity \(S_{ij}\) and the corresponding affinity force at low strength.
4. Add the normalised trade term at the recommended low weight.
5. Expose the new strengths on the VIEW panel.
6. Only then consider a weak national-cohesion term or the governance component.

---

## 11. One-sentence summary for the session log

Add secondary continental-repulsion and nation-affinity forces (statistical-practice similarity derived from the graph + modest trade intensity) so continents separate and institutional/economic neighbours cluster, while preserving the invariant that position primarily encodes documented dependency edges.
