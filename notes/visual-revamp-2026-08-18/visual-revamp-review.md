# Review — Visual System Revamp proposal

**Rev 4, 2026-08-18** — adds §1A after Thomas's note that everything is too
small in pixels. He's right, the cause is measurable, and it **partly overturns
§3.4** — that verdict was measured at 6px nodes. Read §1A before acting on §3.

**Rev 3, 2026-08-18** — revised twice from Thomas's notes on the draft. Rev 2
took *"we need to avoid rims wherever we can… all my previous colour schemes can
be rewritten"*; rev 3 takes *"BRICS should be yellow and USA red… I want USA to
be pure red"* and works out what has to move. §1 is the organising decision; §3
is now a concrete palette with a rendered swatch sheet
(`palette-proposal.png`, `palette-proposal.json`).

Read against `nodeVisuals.ts`, `linkVisuals.ts`, `palette.ts`, `view.ts`,
`InfluenceGraph.tsx`, `Environment.tsx`, `geoAffinity.ts`, `filter.ts`, and the
edge data in `src/data/research/`.

Short version: you're right about the rims, and the measurement below says why —
but the rim is a *symptom*. The actual fault is that the fill ramps run into the
background, rims were added to rescue them, and the rescue is what muddies. Fix
the ramp and the rim becomes unnecessary rather than merely unwanted. That also
fixes a second thing nobody has noticed: the authority-glow encoding is
currently inverted.

The mode system is the right idea and cheaper than it looks, because a one-mode
version already ships. Three specifics in the proposal are wrong against the
data or against standing decisions, one section is redundant with an encoding
that already exists, and one of the "bug fixes" would undo a fix that was made
deliberately.

---

## 0. BRICS — answering your original question first

Your EU analogy is exactly the design `palette.ts` already documents: EU is one
`ColourFamily`, 27 member states all draw from it, and "which member state" is
answered by the label, the flag and the filter rather than by hue.

But BRICS differs from the EU in the one way that matters. The EU *is a
publisher*: there are real nodes with `country: 'EU'` (Eurostat, ECB, the draft
budget). BRICS publishes almost nothing as BRICS — the NDB, the CRA, the JSP,
the NSO Heads communiqués, a handful of nodes. Everything else under a BRICS
flag is Rosstat, NBS China, MoSPI, IBGE, StatsSA: five sovereign statistical
systems. Collapsing those into one permanent hue is the same move
`palette.ts`'s opening comment says the CA/US split exists to prevent —
"Statistics Canada and the Bureau of Labor Statistics would render
identically." Rosstat and NBS China are at least that far apart.

So: **BRICS as a lens, not a family.** Which is what your proposal already says.

Two practical notes, both changed by the no-rims decision:

- **There is no persistent BRICS marker any more, and that's fine.** With rims
  gone, the multi-membership ring is off the table. BRICS membership shows up in
  exactly three places: the GROUP_COMPARISON fill (yellow — §3), the filter,
  and — usefully — *position*, via the geo-affinity force. That's cleaner than a
  fourth marker, and it removes the "secondary membership ring" row from the
  encoding-priority list entirely.

- **BRICS is currently spread across five families**: `RU → ASIA` (teal),
  `CN → CN` (yellow), `IN → IN` (magenta), `ZA → AFR` (violet), `BR → SA`
  (sage). Group membership has to be its own data predicate, and the obvious
  home exists: `GeoBloc` / `COUNTRY_BLOCS` in `geoAffinity.ts`. Adding
  `'BRICS'` is one enum member and eleven table edits — and with the
  geo-affinity slider up it makes BRICS nodes physically pull together. "See
  them as a region" answered by position, for the price of one table entry,
  using machinery that already runs.

Yellow being the BRICS ink means **no single family may own yellow** — otherwise
China would be "the BRICS-coloured one" in every mode while Russia, India, Brazil
and South Africa were not. Your instinct there was right; §3 moves CN off yellow.

---

## 1. Rims — agreed, and here is the actual fault beneath them

You're right that they muddy, and the mechanism is worse than it looks. But
"delete the rims" on its own would break the graph, because rims are currently
propping up four things. The good news is that once you see *why* they were
added, the fix is one change to the palette rather than four replacement
systems.

### 1.1 Why rims muddy — the mechanism

`rimPower(radius) = min(5, max(1.3, radius * 0.6))`, and the rim is a fresnel
term `pow(1 - facing, uRimPower)` mixed into the fill.

At radius 2.2 — a typical peripheral node — that exponent is **1.32**. An
exponent near 1 is not a band at the edge; it's a near-linear ramp across the
*whole* silhouette. For the `bold` families it's worse: `max(1.05, base * 0.4)`
gives **1.05**, essentially a flat blend. So a small US node isn't "blue with a
red edge," it's a blue-to-red gradient across the entire disc, which resolves at
4–8px to muddy purple. Every `bold` and `thick` family does this. The rim was
specified as a border and behaves as a tint.

### 1.2 Why they were added — and the number that explains everything

Rims exist to rescue fills that are too dark to see. `SCOPE_COLOUR`'s own header
says so: *"the original darkest steps sat within a whisker of the #05070d
background, so the most foundational nodes in the graph read as holes in the
sky."* The floors were lifted once and it wasn't enough.

I measured the relative luminance of every swatch against the `#05070d`
background:

| Family | darkest step | lightest step | spread |
|---|---|---|---|
| AFR | **0.054** | 0.311 | 5.8× |
| US | 0.076 | 0.417 | 5.5× |
| NZ | 0.077 | 0.349 | 4.5× |
| XEU | 0.079 | 0.394 | 5.0× |
| IN | 0.081 | 0.405 | 5.0× |
| EU | 0.088 | **0.667** | **7.6×** |
| CA | 0.092 | 0.419 | 4.6× |
| SA | 0.120 | 0.509 | 4.2× |
| ASIA | 0.128 | 0.572 | 4.5× |
| AU | 0.166 | 0.532 | 3.2× |
| CN | 0.168 | 0.703 | 4.2× |
| INT | 0.168 | 0.332 | 2.0× |

Across the whole palette that is **0.054 → 0.703, a 13× luminance range.**

Note which family sits at the bottom: **AFR**. And AFR is precisely the family
whose rimless experiment failed — `COUNTRY_RIM`'s comment records it: *"violet
fills with no ring on a near-black sky simply vanish."* That experiment didn't
prove rimless is wrong. It proved that a fill at 25× background luminance is too
dark to survive on its own, which is a statement about the ramp, not the ring.

Note also which families have the *highest* floors and the *tightest* spreads:
`INT` (0.168, 2.0×) and `AU` (0.166, 3.2×). Those are the two that would survive
rimlessly today. They're the existence proof for the target.

### 1.3 The second thing this breaks: authority glow is inverted

`nodeMaterial` sets `emissive` to the **fill colour** and `emissiveIntensity` to
`0.3 + size_score * 0.62`. Emitted light is therefore *fill luminance × emissive
intensity* — so the level ramp leaks straight into the glow channel, which is
supposed to mean authority and nothing else.

| node | fill Y | emissive | product |
|---|---|---|---|
| EU supranational, authority 0.95 | 0.088 | 0.89 | **0.078** |
| EU institutional, authority 0.05 | 0.667 | 0.33 | **0.221** |
| IN federal, authority 0.90 | 0.081 | 0.86 | **0.069** |
| CN institutional, authority 0.05 | 0.703 | 0.33 | **0.233** |

A near-worthless institutional node emits roughly **3× the light** of a
top-authority national one. `view.ts` says bloom is meant to be "a second
reading of the same encoding"; right now it's a second reading of the *level
ramp*, running backwards against authority. (Magnitudes are indicative — the
framebuffer value includes diffuse lighting and ACES tone mapping — but the
ordering is arithmetic, not a guess. Worth confirming with the screenshot
harness before you retune bloom.)

### 1.4 The better system

**Family = hue. Level = chroma. Luminance held in a narrow band.**

- Pick a narrow target luminance band. **Pure red sets the floor for free:**
  `#ff0000` has Y = 0.2126, comfortably above the best-behaved families today
  (`INT`/`AU` at ~0.167) and 100× the background. The built palette in §3 runs
  **0.211 – 0.333, a 1.58× spread replacing the current 13×.**
- Within a family, the ladder runs **full chroma → washed out**, not dark →
  light. National is the most saturated; institutional is nearly grey.
- This preserves your palette-v2 intent while changing the mechanism. You asked
  for national to be the heaviest step. On a dark ground, *dark* does not read as
  heavy — it reads as absent, which is the "holes in the sky" complaint. *Vivid*
  reads as heavy. Same ordering, a channel that survives the background.
- With luminance roughly constant, `emissive × fill` varies with authority
  alone, and the glow encoding starts working as documented.
- With every fill comfortably above the background, no node needs a ring to
  exist. **Rims come out of the dark scene entirely.**

This does reverse your palette-v2 "national level is each family's darkest
shade" instruction, so it's yours to veto — but the reversal is why the rims
were needed, and the measurement above is the argument.

### 1.5 What the rims are load-bearing for, and what replaces each

| Use | Replacement |
|---|---|
| Family identity (redundant with hue — `COUNTRY_RIM`'s own comment admits this: *"Redundant with the fill now that hue carries country"*) | Nothing. Delete. The fill already carries it. |
| **Edge and pulse ink** — `LinkDatum.colour`/`endColour` *are* rim colours | New first-class `FAMILY_INK: Record<ColourFamily, string>` table. Same values to start; independent from here. Also removes the desync risk if the two ever diverge. |
| **Hollow nodes** (one-off instruments) — the rim *is* the node | **Keep the rim here.** It cannot muddy a fill that doesn't exist. Frame the rule as: *a rim is a silhouette tool, valid only where the interior is empty.* |
| **Orbs** — wide bright ring says "group, double-click" | Drop it. The breath animation (`ORB_PULSE_*`) already carries this, and motion is a stronger cue than a ring. |
| **Blueprint mode** — the whole drawing is family ink on white discs | **Keep rims here.** `PAPER_NODE_FILL` is pure white by construction, so an ink ring competes with nothing. Same rule as hollow. |
| **The dimmed-node ghost** | ⚠️ Needs retuning — see below. |

**The retuning trap.** `DIM_NODE_OPACITY` is 0.09 and the rim dim factor is
0.07, and round 8's note says explicitly that the rim drop "is where most of the
recovered darkness actually comes from." The fragment shader also tops up alpha
via `uRimAlpha` specifically to *"keep the silhouette from fading out with a
dimmed node."* Remove rims and the out-of-focus graph loses both its silhouette
top-up and the thing those constants were balanced against — it will go
materially darker than 0.09 currently looks. Expect to raise `DIM_NODE_OPACITY`
after the rims come out. Don't tune it before.

### 1.6 The cost, stated plainly

Flat fills cap you at roughly **6–8 simultaneously distinguishable families**,
not 12 — and the pairs the rims were papering over must now be separated by hue:

- `US` ultramarine `#1330e0` vs `XEU` slate-blue `#3a4d85` — the tiebreak was
  literally "bold red rim vs green rim." One of them has to move.
- `AFR` deep violet `#4d2a94` vs `INT` violet `#8a4fe8` — the tiebreak was "no
  rim vs bold white rim." One of them has to move.

**This is the argument that makes the mode system load-bearing rather than
optional.** Categorical discriminability is a function of how many categories
are on screen at once. I built the twelve-hue palette and rendered it at real
node size to check — see panel B of `palette-proposal.png`. It does not work,
and no amount of hue-shuffling fixes it: eleven hues around a circle is ~25°
apart, which is under threshold at 6px. Panels D and E show what does work
(four groups; a six-way continental roll-up). Details in §3.

---

## 1A. Scale — the lever I missed, and the arithmetic behind it

*Added rev 4. Thomas: "edges are razor thin, nodes are small and become mostly
border, pulses need adjusted with the size of edges so they don't blur."*

This is the right diagnosis and it's the most valuable thing said in this thread
so far, because two of the three are outright bugs rather than tuning. Working
from the screenshots (canvas ≈ 890px tall, FOV 24, fit margin 1.18, inferred
cloud radius ≈ 5 000 world units):

| element | world units | on screen |
|---|---|---|
| largest node (diameter) | 96 | **7.0 px** |
| smallest node | 26 | **1.9 px** |
| ordinary edge (width) | 1.1 | **0.08 px** |
| cross-border edge | 1.8 | **0.13 px** |
| EU→ESA trunk (57 stacked) | 4.0 | **0.42 px** |
| pulse (teardrop) | 7.7 | **0.56 px** |

Node-to-edge width ratio: **87 : 1**. Every edge in the graph is being drawn a
tenth of a pixel wide. They are only visible at all because of antialiasing —
"razor thin" is generous.

### 1A.1 Nodes: the cap is binding, and that's the whole story

Work the fit maths through and the cloud radius cancels out completely:

```
largest node on screen (px) = TARGET_LARGEST_FRACTION × canvasHeight × cos(FOV/2) / 1.18
                            = TARGET_LARGEST_FRACTION × 738     (at 890px tall)
```

**Corpus size does not enter.** Node size is already scale-invariant by design —
that's exactly what `TARGET_LARGEST_FRACTION` was built to guarantee, and it
works. At 0.0165 it promises a 12.2px largest node at any corpus size.

You are getting 7px because **`nodeScaleFor` is pinned at its cap.** At this
cloud radius it wants a scale of ~10.4 and the cap hands back 6 — so you are
losing 42% of node size to a guard rail. The comment says the cap is there "so a
single far-flung cluster cannot inflate everything," and looking at screenshot 1
that's exactly what's happening: a dozen 2-node components scattered right across
the frame are setting the bounding radius while the actual graph sits in the
middle third. The cap is treating the symptom.

Two fixes, and they compose:

1. **Make the fit robust to stragglers** — use a high-percentile radius (say
   92nd) or fit the largest connected component, instead of the outermost node.
   Small components pass `runFit`'s `in_degree > 0 || out_degree > 0` filter, so
   a 2-node island counts as much as the whole EU cluster. Fix this and the cap
   stops binding on its own.
2. **Then raise the constants**, because 12.2px is still small for 2026's corpus.

### 1A.2 Edges and pulses: they never got the memo

`mesh.scale.setScalar(nodeScale.current)` — nodes scale with the cloud. But:

```js
.linkWidth((l) => (0.5 + l.weight * 1.2) * (1 + 0.45 * Math.log2(l.count)) * (l.cross ? 1.6 : 1))
teardropGeometry((3.2 + l.weight * 3.8) * 1.5)
```

Neither is multiplied by `nodeScale`. **Both are fixed world units.** So as the
corpus grew from 120 nodes to 1 250, nodes grew 6× and edges and pulses grew 0×.
That is not a tuning problem, it's an omission, and it is the entire explanation
for the 87:1 ratio. Everything else in this thread — the rims, the palette, the
glow — has been downstream of it.

Two implementation notes from reading `three-forcegraph`'s source:

- `linkWidth` is in the library's prop-flush list, so re-assigning the accessor
  after a fit re-digests, same pattern as `nodeVisibility`.
- Pulses are **not** scalable by transform. The library reads `.geometry` and
  `.material` off your custom particle object and builds its own mesh
  (`three-forcegraph.js` ~8148, ~8188), so `particle.scale` is ignored. Pulse
  size means **rebuilding `teardropGeometry` at the new width** and re-assigning
  `linkDirectionalParticleThreeObject`.

### 1A.3 A concrete target

| | now | proposed |
|---|---|---|
| `TARGET_LARGEST_FRACTION` | 0.0165 | **0.026** |
| `radiusFor` min | 2.2 | **3.4** |
| `nodeScaleFor` cap | 6 | **20** (or drop it once the fit is robust) |
| `linkWidth` | unscaled | **× `nodeScale` × 1.2** |
| pulse width | fixed 7.7 | **2.4 × the link's own width** |

| element | now | proposed |
|---|---|---|
| largest node | 7.0 px | **19.2 px** |
| smallest node | 1.9 px | **8.2 px** |
| ordinary edge | 0.08 px | **1.6 px** |
| cross-border edge | 0.13 px | **2.5 px** |
| EU→ESA trunk | 0.42 px | **8.2 px** |
| pulse | 0.56 px | **3.8 px** |
| node : edge ratio | 87 : 1 | **12 : 1** |

Raising `radiusFor`'s floor from 2.2 to 3.4 lifts the smallest node from 27% of
the largest to 42%. That costs some resolution in the authority encoding, and
it's worth it: authority also has glow and the ordering in the side panel, while
the 90% of nodes that are small have nothing but their own size.

**The one thing to watch:** the note on `TARGET_LARGEST_FRACTION` says the
collision radius is deliberately not scaled — "visual size scales; spacing does
not… nodes may overlap more at high scale factors, which is a thing to look at
rather than reason about." At 2.7× the node area you will see that. Screenshot 2
shows you already compensating by hand with Cluster spread at 375%; the honest
version is to raise the collision radius alongside the node scale so the default
view doesn't need it. Watch out that the two don't chase each other — collision
grows the cloud, the cloud grows the scale — which is why they were decoupled in
the first place. Scale collision off the *node scale*, not off the cloud radius,
and the loop is broken.

### 1A.4 This overturns part of §3.4

§3.4 concluded that twelve flat families don't work. **That was measured at 6px.**
I re-ran the same dot mix at four sizes — see `node-size-vs-palette.png`:

- **6px** — soup, as before.
- **8px** — still crowded, but the anchors (red, white, green, cyan) start to
  separate.
- **12px** — works. Africa's violet, EU green, Canada cyan, US red and INT white
  all read distinctly.
- **19px** — comfortable.

So the seven-way roll-up in §3.4 is **no longer the recommendation for
WORLD_OVERVIEW** — it becomes a fallback if the scale-up can't be pushed as far
as this section proposes. Twelve families are viable at 12px+.

What does *not* change: flattening the 13× luminance range (§1.2), the inverted
authority glow (§1.3), and the frequency-damped chroma. Those are size-independent.

The rim argument weakens slightly and survives. `rimPower = radius × 0.6`, so on
a big node the rim really is a thin edge band; the wash happens on small ones. But
size *is* the authority encoding, so small nodes always exist — a rim that only
behaves above a threshold is a channel that silently changes meaning with
importance. Still drop it in the dark scene.

### 1A.5 What this does to the order of work

Sizing moves to the front, ahead of the palette, because **every palette
judgement is a function of mark size** and I've now made that mistake once. The
revised Phase 0 is in §12.


## 2. `resolveAppearance` — feasible, and partly already built

**A one-mode version ships today.** `focusPalette()` builds a temporary palette
on the fly when a single family is filtered, and the effect at
`InfluenceGraph.tsx:1600` applies it by mutating `material.color` and
`material.emissive` in place on meshes already in the scene — explicitly
"mutate-don't-rebuild… rebuilding them to change a colour would re-run layout
for a paint job." That is your resolver, for the fill channel, already proven
against a live simulation.

With rims gone from the dark scene, **fill is very nearly the only channel that
has to be mode-switchable**, which makes this much simpler than the draft
assumed:

| Channel | Mutable in place? | Notes |
|---|---|---|
| Fill colour, emissive, opacity | Yes | Already done on every focus change |
| Rim (blueprint + hollow only) | Not yet — small fix | Only needed if blueprint ever becomes mode-aware; otherwise skip |
| Geometry | **No** — requires mesh rebuild | Keep shape mode-independent (and see §5: you don't need shapes) |

If you do want mutable rims for the two surviving cases: `uRimColour`,
`uRimPower` and `uRimAlpha` are created inside `onBeforeCompile` with no handle
kept, so nothing can change them later — only `uRim` was hoisted into
`userData`. Hoist all three the same way (~10 lines). Changing a uniform *value*
does not trigger a shader recompile.

**One hard rule: do not put the mode in the `forceGraph` memo's dependency
array.** That array is `[graph, spreadApplied, view.blueprint]`, and `blueprint`
is in there precisely because it can't be mutated. Every memo change resets
`fitted`, `userOwnsCamera`, `settledOnce` and re-warms the layout. Five modes as
memo deps = a camera reset and a layout re-warm on every lens change, which is
the same annoyance as item 8 in your list. Keep mode in a ref plus a mutation
effect, mirroring `levelColoursRef`.

**Answer to your question:** clean, yes; expensive, no — provided shape is never
a function of mode.

---

## 3. The palette — US pure red, BRICS yellow, and what has to move

Your call: **USA pure red, BRICS yellow, China off yellow, find alternatives for
the other reds.** Taken. This section is what falls out, built and rendered —
see `palette-proposal.png` (swatch sheet + real-node-size simulations) and
`palette-proposal.json` (the values).

### 3.1 Two colours are now reserved, and that drives everything else

- **`#ff0000` is USA and only USA.** For pure red to *read* as pure, nothing may
  sit near it. So **hues 335°–25° are a moat**: no other family in it. That
  costs the palette its whole warm quarter, and it's why so much has to move.
- **Yellow (~48°) is the BRICS group ink and belongs to no family.** You spotted
  the reason: if China kept yellow, China would look like "the BRICS one" in
  every mode while the other four members didn't.

Everything that was red, crimson, orange or yellow therefore moves: **CA**
(crimson), **AU** (orange), **NZ** (brown), **CN** (yellow), **IN** (magenta).

### 3.2 The proposed assignment

Hues are spaced by *how much of the corpus each family actually is* — I counted:
**AFR 32.2%, EU 15.7%, US 11.4%, CA 10.2%, SA 9.3%, INT 6.1%**, then ASIA 4.0%,
NZ 3.8%, XEU 2.8%, AU 1.9%, IN 1.6%, CN 1.0%. Five families are 79% of the
graph; six more are 15% between them. Big families get wide moats; the small
ones sit in the shoulders.

| Family | Hue | Share | National | Institutional | Note |
|---|---|---|---|---|---|
| **US** | **0°** | 11.4% | `#ff0000` | `#aa9797` | pure red, exactly. Moat 335°–25°. |
| *(BRICS ink)* | *48°* | — | `#ffd600` | — | **reserved**, no family |
| **SA** | 88° | 9.3% | `#518e0c` | `#959f8a` | olive-lime; its sage hue at chroma |
| AU | 118° | 1.9% | `#059500` | `#89a289` | off orange (orange is in the red moat) |
| **EU** | 150° | 15.7% | `#0c924f` | `#8ba096` | green, essentially unchanged |
| XEU | 172° | 2.8% | `#00907c` | `#87a09d` | teal — rides EU, "European not EU" |
| **INT** | — | 6.1% | `#ecf0f7` | `#a1a8b8` | **achromatic** — see 3.3 |
| **CA** | 200° | 10.2% | `#1086c2` | `#909ea4` | cyan — 160° from US, the max separation |
| CN | 224° | 1.0% | `#4375ff` | `#959bac` | off yellow; smallest family takes the tightest slot |
| ASIA | 248° | 4.0% | `#7c67ff` | `#9c9aaf` | RU, AE |
| NZ | 270° | 3.8% | `#a850ff` | `#a398ae` | off brown — brown can't survive a luminance floor |
| **AFR** | 296° | 32.2% | `#ca44d3` | `#a598a6` | violet, near-unchanged |
| IN | 322° | 1.6% | `#f2009a` | `#ac96a4` | magenta, near-unchanged |

Measured: **hued families span Y 0.211 – 0.333 (1.58×)**, against the current
palette's 13×. That's §1.4 delivered.

Three deliberate decisions inside that table:

**CA becomes cyan, at 160° from the US.** Canada losing red is the biggest
identity change here, and it's unavoidable — the US took red, and CA/US is the
one pair `palette.ts` says the graph exists to separate ("Statistics Canada and
the Bureau of Labor Statistics would render identically"). Rather than crowd CA
next to red, it gets the *antipode*. Maximum possible separation for the pair
that most needs it.

**Chroma is damped in proportion to how often a family appears.** A colour you
see 397 times should be calmer than one you see 12 times, or the biggest family
shouts down the graph. AFR's ramp is damped to 62% chroma, the 8–15% families to
85%, the small ones run at full. This is a one-line multiplier, and it's why
AFR's violet reads as a field rather than a wall.

**Yellow is a luminance exception, and it has to be.** Yellow is intrinsically
the brightest hue — `#ffff00` is Y = 0.93, 4.4× pure red — so a yellow inside the
band is a dark olive (`#cea400`), which renders as brown-gold and loses to the
neutral grey. I rendered both; **bright `#ffd600` is clearly right**, and the
cost is that BRICS nodes bloom a little harder than the other three groups in
GROUP_COMPARISON. Worth it. Panel D shows the comparison.

### 3.3 INT leaves the colour wheel

**International becomes achromatic — near-white, no hue.** Three reasons, and it
solves a problem you didn't ask me to solve:

1. It's semantically exact. The palette's axis is *which country*; a stateless
   body has no position on that axis, so the absence of hue is the honest mark.
2. It's continuous with what you already approved. INT's family cue was a **bold
   white rim**. Rims are going; the rim just becomes the fill.
3. **It resolves the AFR/INT collision for free.** Those two have been "known
   tight spots, accepted with eyes open" (deep violet vs lighter violet, told
   apart by the rim) since palette v2. With the rim gone that tiebreak
   disappears — and INT vacating the purple region means AFR keeps its violet
   unchanged instead of both having to move.

It also frees a full 60° of wheel for the eleven hued families, which they need.

One knock-on: `COMMERCIAL_COLOUR #8b93a4` and `UNCLASSIFIED_COLOUR #6b7280` are
mid-greys, and INT's institutional step lands at `#a1a8b8`. Push both of those
*below* the band (Y ≈ 0.12) so the three neutrals separate by lightness — dim
grey means "outside the classification," bright neutral means "stateless body."

### 3.4 What the render actually shows — the finding

I generated the palette and drew it at real node size, with dots in proportion to
each family's true share. Reading the panels:

- **Panel D (GROUP_COMPARISON) works, unambiguously.** Red / yellow / green /
  white / grey is instantly separable at 6px. This is exactly what you asked for
  and it needs no further argument.
- **Panel B (all twelve families) does not work.** It reads as soup — a green
  half and a purple half, with AFR's 32% dominating everything near it. This is
  not a tuning failure; eleven hues around a circle is ~25° apart, which is below
  discrimination threshold at 6px. **No hue assignment fixes it.** I tried three.
- **Panel C** shows the honest comparison: the proposed palette is much flatter
  (no "holes in the sky") but not dramatically more separable, because the
  problem at twelve families is count, not luminance.
- **Panel E is the answer.** The same corpus rolled up to seven: US red, Canada
  cyan, Europe green (EU+XEU), Africa violet, South America olive-lime,
  Asia-Pacific blue (`#6c6cff`, absorbing ASIA/CN/IN/AU/NZ), International white.
  Minimum separation ~40°, and it reads cleanly at 6px.

**Recommendation: WORLD_OVERVIEW should show the seven-way roll-up, not twelve
families.** The full twelve exist in the data and appear when you've narrowed —
in COUNTRY_DETAIL, in GEO_EXPLORATION, or under a filter, where `focusPalette()`
already spreads one family's ladder across 300° of hue. That is the mode system
doing the job it exists for, and it's the concrete answer to §1.6's cost.

## 4. The 90%-transparent non-selected case — two real problems

**Picking ignores opacity.** Raycasting hits geometry; a sphere at `opacity:
0.1` still intersects the ray, and `reportIdAt()` walks up from whatever mesh
the raycaster returned nearest-first. Ghosted nodes in front of the ones you
care about will silently eat hover and clicks. Must-fix, and it's cheap: set
`mesh.raycast = () => {}` on ghosted nodes in the same mutation pass, restore
with `THREE.Mesh.prototype.raycast`.

**Depth sorting.** Every node material is `transparent: true` *unconditionally*.
The entire graph already renders in the sorted transparent pass. Mass
transparency doesn't create a new failure mode but will make the existing sort
instability much more visible — see §8.

**Simpler alternative:** the "ghost the non-selected" treatment already exists as
the focus dim, and after the rim removal it has to be retuned anyway (§1.5).
Retune it once and use it for both. Two ghosting systems with different
constants is how you end up rediscovering round 8's bloom-re-lights-the-ghost
bug from a new direction.

---

## 5. Geography and jurisdiction — cut both, for different reasons

**Geographic borders: no longer available, and that's the right outcome.** The
draft's cheapest option was a second fresnel band (region outside, family
inside). Two soft bands on a 6px sphere was already a doubtful read; after §1 it
is exactly the thing you asked to stop doing. Geography now has to be a *mode*
(GEO_EXPLORATION, where it takes the fill outright and the group encoding
stands down), not an always-on channel. That also kills the `REGION_OF` table as
a Phase-2 blocker — you only need it when you build that mode.

**Jurisdiction: the proposal duplicates an encoding that already exists.**
`scopeOf(report)` is the pair `(family, jurisdiction_level)`, and the fill ramp
*is* the jurisdiction ladder — international / national / state / municipal /
institutional. Adding a radial dark core for state-level and a gear for
municipal would be a second, redundant encoding of the same field, competing
with the first. Under §1.4 the ladder becomes the chroma ramp and gets *more*
legible, not less. **Drop §5 of the proposal entirely.** That's a whole
work-stream removed.

Two further reasons the gear specifically was never going to work, kept for the
record:

1. `nodeVisuals.ts` carries a standing instruction in bold: *"Never reintroduce
   faceted node geometry while fresnel rims exist."* The tier-shape system died
   in one day on exactly this — a fresnel rim lights *whole flat faces* as they
   tilt. Your words at the time: "the way the rim works on the shapes is
   rediculous." (Rims surviving only on hollow nodes narrows this, but hollow
   nodes are a fifth of the corpus and would still strobe.)
2. `nodeGeometry()` allocates `new THREE.SphereGeometry(radius, 24, 16)` per
   node with **no caching** — contrast `teardropGeometry`, which buckets by
   rounded width. ~1000 geometries today. Bucketing them by rounded radius is a
   free win worth doing regardless of any of this.

---

## 6. Edges

**Thicker: trivial, but pair it with an opacity drop.** `.linkWidth` is one
accessor. The restraint on edges right now is opacity, not width:
`LINK_OPACITY = 0.17`, deliberately low so the graph doesn't read as "pipes with
beads on it." Raising width ~1.5× at 0.17 will read much louder than you expect.
Suggest width ×1.5 and `LINK_OPACITY` → ~0.13 as one change, then look.

Note edges get *more* important after §1: with rims gone, the family ink no
longer appears on the nodes at all, so the edges become the only place it lives.
Worth checking that the new `FAMILY_INK` values still read as belonging to their
fills.

**Typed edges: the data isn't shaped for it, and the dash rationale is
inverted.**

`LinkDatum` has no `relationship_type`. Edges are *aggregated* — one drawn line
stands for up to 57 real edges (EU orb → ESA 2010 at tier 1), and a trunk can
mix types. You need a `dominant: RelationshipType` computed at graph build, plus
a rule for mixed trunks.

Actual counts in `src/data/research/`:

```
407  methodology_depends_on
337  uses_data_from
173  calculated_from
152  cites
```

`methodology_depends_on` is the **most common** relationship in the corpus, not
the rarest. The proposal dots it on the assumption that it's rare — that would
dot roughly 38% of all edges, in the least visible style available. `cites` is
the genuinely rare one at 152.

Suggested: solid for the data-flow pair (`calculated_from` thicker,
`uses_data_from` normal), **dashed for `methodology_depends_on`**, and
dashed-thinner or a desaturation for `cites`. Better still: **two styles, not
four.** At 0.13–0.17 opacity through distance fog, four line patterns will not
be distinguishable, and width and colour are already carrying trunk size and
family.

Mechanism is free — `uDashed` already exists in the fragment shader
(`fract(vT * 16.0) > 0.55`), unused since implied edges were retired. Dotted is
the same code with different frequency/duty uniforms.

---

## 7. Glow — this needs a new element, not tuning

**Diagnosis.** Selection glow is `emissiveIntensity + 0.25` capped at 0.95, and
the halo comes entirely from the `<Bloom>` pass. Bloom is screen-space and
energy-proportional: a node 6px across contributes almost no bright pixels, so
its halo is a couple of pixels. That's why it only reads zoomed in.

**Why you can't tune your way out.** Turning bloom up blows out the *large*
nodes long before it does anything for a small one — and apparent size is the
authority encoding. Below ~0.15 threshold "most of the graph blooms… and the
encoding the whole project rests on stops working."

Also note §1.3: whatever bloom is currently picking out, it is not the
high-authority nodes. Fixing the luminance band changes what blooms, so **do §1
before retuning bloom** or you'll tune against the wrong distribution twice.

**Concrete plan: a screen-space halo billboard.** One camera-facing quad (or
`Sprite`) parented to the selected node, additive, radial falloff,
`depthWrite: false`, high `renderOrder`. Each frame set its world scale to
`k * camera.position.distanceTo(node) * tan(FOV/2)` so it holds a **constant
pixel radius** at any zoom. One object total, no per-node cost, independent of
bloom — so it also works in blueprint mode, where bloom is zeroed and selection
currently has no glow at all.

Optional second piece: a thin fixed-pixel-radius ring around the selection,
clamped to the frame edge when the node is off-screen. Solves "where did my
selection go" too. (This is a *screen-space* ring on one node — not a per-node
rim. Different thing, no muddying.)

---

## 8. Horizon, and the fog mismatch behind it

`Environment.tsx` Sky uses `horizon: '#28486e'` against `SCENE_BACKGROUND
'#05070d'`. Very large jump — drop it to roughly `#12233a` and leave the zenith
alone. One line.

Related bug worth fixing in the same edit: the link shader's `uFogColour` is
hard-wired to `SCENE_BACKGROUND`. With the horizon on, distant edges fade toward
near-black while the background behind them is blue — so lines dissolve into a
colour that isn't there. Either feed the sky's horizon colour into `uFogColour`
when the horizon is enabled, or darken the sky enough that it stops mattering.
(`showHorizon` defaults to `false`, so this only bites when you've turned it on
— which, given the complaint, you have.)

One caution for §1: the luminance floor is set against `#05070d`. If the horizon
is on, part of the background is much brighter than that, so pick the floor
against the *brightest* background a node can sit on, or dark nodes will vanish
against the sky band instead of against space.

---

## 9. Node glitches — ranked suspects, not a diagnosis

I can't identify the cause from source, and guessing confidently would be worse
than saying so. Four candidates, each with a five-minute test:

1. **Transparent-queue sort instability.** Every node material is `transparent:
   true` unconditionally, so all nodes render in the depth-sorted transparent
   pass; two spheres at near-equal camera distance can swap order between frames
   → pop. *Test:* set `transparent: false` on fully-opaque nodes and see if it
   stops. The constructor comment claims flipping `transparent` live forces a
   recompile — worth verifying against `renderer.info.programs` rather than
   taking on trust, because if it doesn't, this is a one-line fix.
2. **Mesh recreation by three-forcegraph.** The code notes meshes "can be
   recreated without warning," and the guard only fires when
   `meshes.current.size` *changes* — a recreation keeping the count constant is
   invisible to it. *Test:* log when `nodeThreeObject` runs for an id already in
   `meshes`.
3. **Bloom shimmer.** `mipmapBlur` on small bright nodes with a moving camera can
   crawl. *Test:* glow slider to 0.
4. **Orb breath.** `mesh.scale` is rewritten every frame for orbs; with the
   collide force this can make an orb periodically intersect neighbours. *Test:*
   set `ORB_PULSE_SCALE` to 0.

My money is on (1) — and (1) is the one mass transparency would make worse, so
settle it before COUNTRY_COMPARISON goes in.

---

## 10. Camera on filter/tier change — your ask conflicts with a deliberate fix

**Two different paths:**

- **Tier buttons** change `drilldown` → `buildDisclosedGraph` → new `graph` →
  the `forceGraph` memo rebuilds → `fitted = false`, `userOwnsCamera = false`,
  full layout re-warm. Nodes genuinely move: orbs collapse and expand, and new
  children are seeded from their orb's last position plus jitter.
- **Filter chips** do *not* rebuild. The effect near `InfluenceGraph.tsx:1560`
  calls `requestRefit()` **on purpose**, and the comment says why: without it
  "the camera simply kept pointing wherever it already was while three quarters
  of the graph vanished from in front of it. That is the black screen." That's
  your own bug report — 329 of 728 shown, survivors knotted in one corner.

An unconditional "never move the camera on filter change" reintroduces it.

**Recommended rule: refit only when the survivors aren't usably framed.** After
a visibility change, compute the visible set's bounding sphere (the box and
centre maths already exist inside `runFit`) and project it against the current
camera. Refit only if the centre falls outside the frustum, or the sphere
occupies less than ~15% or more than ~120% of frame height. Otherwise leave the
camera alone. Preserves context in the common case — hiding a tier while zoomed
into Alberta — and still rescues the black screen. Roughly 30 lines.

**The trap doing this naively:** `runFit` doesn't only move the camera. It also
sets `nodeScale.current = nodeScaleFor(nodeRadius)` — node *sizes* are a product
of the fit. Skip the fit and you skip the rescale, so after hiding most of the
graph the survivors stay at the old scale. Split `runFit` into `measure()`
(always: bounds, cloud radius, node scale, `onBounds`) and `applyCamera()` (only
when the test says so). That split is the actual work item and it's the thing
that breaks if you just early-return.

**For tier changes**, geometric preservation isn't quite what you want — the
node you were looking at may have been absorbed into an orb or exploded into 73
children. Better: if the current selection (or the node nearest the orbit
target) survives, retarget the orbit control to *that node's new position* at
the same distance. "I stay with what I was looking at" rather than "the camera
matrix is unchanged."

---

## 11. Channel budget

The draft wanted seven always-on channels. After §1 and §5 the list is already
down to four, which is most of the problem solved by subtraction:

| Draft channel | Status |
|---|---|
| Active comparison fill | Keep — the primary |
| Geographic border | **Cut** — becomes a mode (§5) |
| Secondary membership ring | **Cut** — no rims (§1) |
| Jurisdiction radial / gear | **Cut** — redundant with the fill ramp (§5) |
| Size (importance) | Keep |
| Edge style | Keep, at two styles not four (§6) |
| Glow / focus | Keep — as a screen-space halo (§7) |

Four channels on a 4–8px node is achievable. Seven was not.

---

## 12. Recommended order

**Phase 0 — scale. Do this first; everything downstream is judged against it.**

1. Make `runFit` robust to stragglers (percentile radius, or fit the largest
   component). Split it into `measure()` / `applyCamera()` while you're in there
   and add the conditional refit from §10 — same function, one visit.
2. Raise `TARGET_LARGEST_FRACTION` → 0.026, `radiusFor` min → 3.4,
   `nodeScaleFor` cap → 20 (§1A.3).
3. Multiply `linkWidth` by `nodeScale`; rebuild `teardropGeometry` from the
   link's own width. Re-assign both accessors after each fit.
4. Scale the collision radius off `nodeScale` (not off cloud radius) so the
   default view doesn't need Cluster spread at 375%.
5. Look. Then re-judge §3.4 and the `LINK_OPACITY` question — at 1.6px an edge
   may want *less* than 0.17 opacity, not more.

**Phase 0b — the other independent wins.**

6. Screen-space selection halo.
7. Darken the horizon; wire `uFogColour` to it.
8. Run the four flicker tests in §9.
9. Cache `SphereGeometry` by rounded radius.

**Phase 1 — the palette rebuild. This is now the main event.**

7. Extract `FAMILY_INK` as its own table; repoint `LinkDatum.colour` /
   `endColour` at it. *(pure refactor, no visual change — do it first so the rim
   removal can't break edges)*
8. Rebuild `SCOPE_COLOUR` from `palette-proposal.json` — US `#ff0000`, the
   reserved yellow, INT achromatic, chroma damped by family share. Also move
   `COMMERCIAL_COLOUR` / `UNCLASSIFIED_COLOUR` below the band (§3.3). Verify with
   the screenshot harness against the current build.
9. Delete rims from the dark scene. Keep them for hollow nodes and blueprint
   only. Drop the orb rim in favour of the existing breath.
10. Retune `DIM_NODE_OPACITY` / `DIM_NODE_EMISSIVE` — they were balanced against
    a rim that no longer exists (§1.5).
11. Re-check bloom threshold now that fill luminance no longer fights authority
    (§1.3). This is the step where glow finally means what `view.ts` says it
    means.

**Phase 2 — the lens.**

12. Add `'BRICS'` to `GeoBloc` / `COUNTRY_BLOCS`; write `groupOf(country)`.
13. GROUP_COMPARISON as a recolour pass only, reusing the `levelColours`
    mutation effect — red / yellow / green / white / grey. Add the raycast
    disable. Ship it and look before building more modes.
14. WORLD_OVERVIEW as the seven-way continental roll-up (§3.4). This is a second
    recolour preset over the same resolver, so it's nearly free once 13 works.

**Phase 3 — only if 1–2 hold up.**

15. `REGION_OF` table + GEO_EXPLORATION mode (geography takes the fill).
16. `dominant` relationship type on `LinkDatum`; **two** line styles.
17. The remaining modes as presets over the same resolver.

Phases 0 and 1 are independent of each other and can go in either order, but
**Phase 1 step 7 must precede step 9** or the edges lose their colour source.

---

## 13. Summary of pushback

| # | Item | Verdict |
|---|---|---|
| 1 | Remove rims | **Agreed — and go further.** Rims are a symptom; the fault is a 13× fill-luminance range that makes dark nodes invisible. Fix the ramp (hue = family, chroma = level, constant luminance) and rims become unnecessary. Keep them only where there's no coloured fill: hollow nodes and blueprint. |
| 2 | Authority glow | **Currently inverted** — a worthless institutional node emits ~3× a top-authority national one, because emissive is multiplied by the fill colour. Fixed for free by the same ramp change. |
| 3 | `resolveAppearance` + 5 modes | **Yes** — precedent exists, and removing rims makes it *simpler* (fill is nearly the only mode-switched channel). Keep mode out of the memo deps. |
| 4 | US pure red, BRICS yellow | **Done — see §3 and the rendered swatch sheet.** Pure red needs a moat (335°–25°), which forces CA, AU, NZ, CN and IN to move. CA goes to cyan at the US antipode, since CA/US is the pair that must never merge. Yellow is a deliberate luminance exception; the in-band alternative reads as brown-gold and loses. |
| 4b | Twelve families as flat fills | **Doesn't work — measured, not guessed.** Eleven hues around a circle is ~25° apart, under threshold at 6px (panel B). WORLD_OVERVIEW should use the seven-way continental roll-up (panel E); the full twelve appear only once you've narrowed. |
| 4c | INT achromatic | **New recommendation.** Semantically exact (no country, no hue), continuous with INT's approved white rim, and it resolves the long-standing AFR/INT violet collision for free by vacating the purple region. |
| 5 | Geographic borders | **Cut as a channel** — make it a mode. No rim available, and two fresnel bands on a 6px node is the muddying you just objected to. |
| 6 | Jurisdiction glyphs (radial / gear) | **Cut entirely** — `scopeOf` already encodes jurisdiction as the fill ramp; this would be a second, competing encoding of the same field |
| 7 | 90% transparency | **Modify** — reuse the (re-tuned) focus dim; must disable raycast on ghosts |
| 8 | Thicker edges | **Yes** — pair with an opacity drop; edges matter more once nodes lose the ink |
| 9 | Dash assignment | **Wrong against the data** — `methodology_depends_on` is the most common type (407), not the rarest |
| 10 | Stronger glow | **Yes** — screen-space halo, not bloom tuning. Do the ramp first. |
| 11 | Darker horizon | **Yes** — plus the fog-colour mismatch, plus it constrains the luminance floor |
| 12 | Node glitches | **Needs measurement** — four ranked suspects, transparent-queue sorting most likely |
| 13 | Preserve camera on filter change | **Modify** — unconditional preservation reintroduces the black screen; use a "usably framed?" test, and split the node-scale side effect out of `runFit` |
| 14 | 7 always-on channels | **Now 4**, by subtraction rather than compromise |
| 15 | "increase the pixel size of everything" | **Right, and two of the three are bugs.** `nodeScaleFor` is pinned at its cap so nodes render at 7px instead of the 12.2px the design promises; `linkWidth` and the pulse geometry are never multiplied by `nodeScale`, so they have not grown at all since 120 nodes — hence 87:1. See §1A. Do this before the palette. |
