# REPORTS.md — retired tail sections, moved out 2026-09-05

"Legibility at scale" and "Still genuinely open", verbatim. Both were written
against a 121-node graph; the second claims the graph has no orphans, which
`HANDOFF.md` §2 has contradicted since 2026-09-04. Anything still live was
moved into the `HANDOFF.md` todo the same day.

---

## Legibility at scale — what 121 nodes actually looks like

Looked at properly for the first time in V0.5, having gone unverified through
the growth in V0.4. Three of these are decisions that were right when they were
made and have since expired, which is worth stating plainly: **the graph got
four times bigger and several visual choices were tuned at 33 nodes.**

Two of the five are now resolved and marked ✅. They are kept rather than deleted
because in both cases the *class* of error is the transferable part, and because a
list of what looking has caught is the argument for doing it more often. Three
remain open.

- ✅ **The camera fits the room, not the nodes.** Fixed in V0.7 as a side effect of
  deleting the platform: the auto-fit had been measuring the slab's diagonal
  rather than the node cloud. Kept here because the *class* of error recurs —
  fitting to scenery rather than to data.
- **Zoomed in far enough to read a node, the centre is opaque.** This is
  occlusion, not a weak size encoding — top-to-median radius is 2.14×, which is
  4.6× in area, and only 13 of 121 nodes sit near the minimum. Size reads fine
  in isolation and not at all through three other spheres.
- ✅ **Distance haze and glow: answered, with usable ranges.** The question was
  reframed in V0.5 as "how much fog, not fog or not", both became sliders in V0.7,
  and V0.8 finally looked at the ends of them. **Haze ~35% and glow ~55% is the
  legible setting. Both at 100% is materially worse, not merely different.**

  The failure mode is specific and worth knowing, because it is not "too bright".
  At full haze with the horizon on, the scene flattens into a blue-grey field and
  **the country hue families stop separating** — the cyan US cluster and the warm
  Canadian mass converge toward the same muted grey-brown. That destroys the single
  biggest legibility win the project has, the V0.7 scope recolouring, and it takes
  the size encoding with it: spheres get harder to compare, not easier, because the
  fog is doing to hue and value what it is supposed to be doing only to depth.

  So both sliders have a usable band well below maximum, and the reason to care is
  that **haze trades depth cue against colour discriminability.** Turn it up to
  recover depth and you spend country separation to get it.

  At the good setting the V0.7 claim about scope colour holds up at fit zoom for
  the first time: the US cluster reads as a distinct cyan region hanging off the
  Canadian mass with the violet international bodies between them. That was
  arguable from the edge data before and is now simply the picture.
- **Out-of-focus node dimming is too weak to be doing the job it claims.**
  Selecting a node visibly changes the *edges* — they dim and their pulses stop —
  while the spheres barely move at `DIM_NODE_OPACITY` 0.34 under bloom. The cone
  is legible, but not for the reason the code believes.
- **Filtering turned out to be the best density fix available.** Hiding one
  jurisdiction level makes the graph immediately readable. The filter layer was
  built to answer scope questions and answers the legibility question too, which
  was not the plan.

---

---

## Still genuinely open

### Everything else still open

- **The 8 remaining seed edges with no `evidence_url`**, down from 27 and then 21.
  They have no research copy to fall back on. By this project's own standard they
  should not exist, and the resolution is per-edge: find the document, delete the
  edge, or demote it to `implied`. **"Find the document" is not the default** —
  three of the 21 were resolved by deletion or demotion rather than by a URL.

  What is left is two clusters and one stray: `boc-policy-rate -> statcan-lfs`,
  `boc-policy-rate -> statcan-national-accounts`, `boc-mpr -> boc-policy-rate`,
  `boc-mpr -> fed-fomc-statement`; `fed-fomc-statement` and `fed-sep` each to
  `bls-employment-situation` and `bea-gdp`. **They have had no research at all** —
  they are not "searched and not found", and a later pass must not read them as
  the former. The structural argument for doing them is gone: the graph is one
  component with no orphans under the strict standard, so these eight now buy
  completeness rather than connectivity.

- **What a mutual pair does to everyone else depends on where the pair points,
  and V0.10 generalised from one instance.** That log recorded a cycle as
  recirculating rank rather than letting it terminate, with a median gain of
  **+7.2%** across the corpus. The graph's second mutual pair,
  `statcan-sut` ↔ `statcan-ippi`, measures a median of **−2.4%** — the opposite
  sign. The pair itself gains as expected (the tables +40.0%, the index +10.7%),
  but the recirculated rank stays inside the pair instead of propagating, because
  the IPPI's only other outgoing edge is to `naics`. The first pair propagated
  because both members pointed at the international standards.

  So the +7.2% was an instance and not a law, and the incentive V0.10 identified
  is sharper than it looked: **recording a relationship as mutual pays the pair
  and can charge everyone else.** The guard is unchanged and is still the
  evidence standard. What is open is whether anything further is needed once
  there are enough pairs to see a pattern — two is not enough, and the honest
  position is that this is being watched rather than managed.

- How aggressively the layout should re-run when nodes or edges are added — full
  re-simulation is disorienting, no re-simulation leaves new nodes badly placed. Likely a
  short local settling animation, but this needs to be seen before deciding.
  *(Filtering sidesteps this entirely by never re-running the layout. Adding
  data does not.)*
- Whether cadence should also influence layout (clustering by update rhythm) or only
  drive the pulse timing.
- What the default view should be at several hundred nodes. The current defaults
  were chosen by looking, at 33 nodes, and looking again at 121 says they are
  wrong — but the honest fix is not obvious, because the fixes for framing,
  occlusion and depth interact.
*(The cadence model and the treatment of non-official sources were open here
until V0.4. Both are now settled — see Decisions. The non-official one is
implemented; the cadence one is not.)*

