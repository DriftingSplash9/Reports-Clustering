# Phase 4 — the "make it feel like software" round

**Status: BACK BURNER.** Thomas's instruction, 2026-08-19: *"these changes can be
phase 4, I may add to phase 4 as we complete phase 2 and 3 so keep it all on the
side burner."* **Do Phases 2 and 3 first** (the lens modes — see §5 of
`HANDOFF.md` and §12 of `notes/visual-revamp-2026-08-18/visual-revamp-review.md`).
Expect this document to grow; Thomas said so explicitly.

Written by the session that built Phases 0/0b/1, from Thomas's own words and
screenshots, with every feasibility claim below **checked against the code or
rendered**, not guessed. Where something was measured, the measurement is here.
Where it was not, it says so.

Phases 0–3 were about *what the graph encodes*. This one is about **what it is
like to use** — and it is a bigger change to the codebase than the palette was,
because it reaches `App.tsx` and the whole UI layer, which no previous visual
round has touched.

---

## 0. Read first

1. `HANDOFF.md` §5 — what Phases 0/0b/1 actually changed, and the traps.
2. `REPORTS.md` — the standing rules. **Never run git from a session.**
3. This file.

**One rule from `REPORTS.md` deserves repeating here specifically**, because
Phase 4 is the first round where it will be tempting to break it: *data model and
influence semantics come before visual polish; when the two conflict, the encoding
wins.* Everything below is polish. None of it may cost a channel.

---

## 1. Do this first: **delete Blueprint mode**

Thomas: *"Blue Print is needing to go outright. it was a bad idea lol."*

Take it literally — deleted, not defaulted off, exactly the way the ground grid,
the platform slab, the drop lines and the bounding box went. That is this repo's
established habit and Thomas has asked for it by name four times now.

**Measured blast radius: 94 references across 8 files.**

| File | refs |
|---|---|
| `src/components/InfluenceGraph.tsx` | 46 |
| `src/App.tsx` | 15 |
| `src/lib/view.ts` | 13 |
| `src/components/nodeVisuals.ts` | 8 |
| `src/components/linkVisuals.ts` | 7 |
| `src/lib/palette.ts` | 6 |
| `src/components/ViewControls.tsx` | 2 |
| `src/lib/uiTheme.ts` | 1 |

**Do it first, before anything else in this document**, because it is subtractive
and everything after it is additive. Every `bp ? x : y` ternary in the renderer
collapses to `x`; `PAPER_BACKGROUND`, `PAPER_NODE_FILL`, `PAPER_DIM_LINK`,
`PAPER_LINK_OPACITY`, `PAPER_DIM_LINK_OPACITY`, `PAPER_DIM_NODE_OPACITY`,
`PAPER_DIM_RIM_FACTOR` and `BLUEPRINT_INK`/`blueprintInkFor` all go; the
`drawRim` gate reduces from `bp || hollow` to just `hollow`; the theme switch in
`uiTheme.ts` simplifies. **The codebase gets materially easier to work in**, and
every later item in this brief gets cheaper. Doing it last means doing all the
work below twice, once for each theme.

**Two things to check on the way out, not to fix:**

- **It appears to be broken right now.** Thomas's 2026-08-18 screenshot shows
  blueprint with the node discs invisible — only the blue pulses and faint lines
  render, against a pale blue-white page rather than the warm `#f2efe7` paper.
  A render from this session at default settings looked correct, so the
  difference is something in his settings (his had Glow 100%, Cluster spread
  375%, Geo-affinity 150%, and a single-family filter active). **Spend ten
  minutes seeing whether the cause is blueprint-only before deleting it** — if it
  is the single-family `focusPalette` path or the compositing note in
  `InfluenceGraph`'s `scene.background` effect, the same fault may exist in the
  dark scene where nobody has noticed it. Then delete.
- `RIM_WEIGHT` and `rimWeightFor` survive blueprint's removal — hollow one-off
  instruments still use them. Do not delete those with the rest.

---

## 2. "It looks cartoony. The nodes are flat — no style"

The most important item here, and the one with a real diagnosis rather than a
taste argument. **Two constants have been outgrown by the corpus, exactly the way
`linkWidth` was** (see `LINK_WIDTH_SCALE`). Both are in the *lighting*, which no
visual round has ever revisited.

### 2.1 The key light is inside the graph

`src/App.tsx`, unchanged since the scene was built at roughly 120 nodes:

```jsx
<ambientLight intensity={0.5} />
<pointLight position={[300, 300, 400]} intensity={1.1} />
<pointLight position={[-300, -200, -300]} intensity={0.4} color="#4a6fb5" />
```

The connected cloud's measured radius at the Everything tier is **~3 000 world
units**. The key light sits at **~590 units from the origin** — well *inside* the
node cloud, not outside it. And these are **point lights with no `decay` or
`distance` prop**, so three.js's default `decay = 2` applies: intensity falls off
as 1/d².

Two consequences, and together they are most of "flat":

- **There is no consistent light direction.** Nodes on the near side of the cloud
  are lit from one way, nodes on the far side from the opposite way, nodes at the
  centre from inside. A sphere reads as a sphere because of a *consistent*
  terminator; there isn't one.
- **The far half of the graph is lit by ambient alone.** A node 2 700 units from
  the key light receives roughly 1/80th of what a node 300 units away does.
  Ambient light is directionless by definition, so those nodes have no shading
  gradient at all. They are flat discs, literally.

**Fix to try first: replace both point lights with `directionalLight`.** A
directional light has no position falloff and one direction for the whole scene,
which is what a graph of unbounded extent needs — and it is scale-invariant, so
it cannot be outgrown again. This session tried
`<directionalLight position={[0.6, 0.8, 1]} intensity={2.2} />` with ambient
dropped to `0.28`, plus a `#4a6fb5` fill from behind at `0.7`, and it does
produce visible consistent shading. **It was reverted and is unproven** — judged
only in a software-rendered crop at 4× magnification, which is not a fair look.
Treat those numbers as a starting point, not an answer.

### 2.2 Emission is drowning the shading

`emissive` intensity is `0.3 + size_score × 0.62`, i.e. **0.3 to 0.92**, against
`ambientLight` at 0.5 and a key light most nodes barely receive. For a
high-authority node the self-illumination term is comparable to or larger than
everything the lights contribute — so the lit gradient is a small ripple on top
of a large flat value. **That is the mechanical meaning of "flat".**

The floor is the number to look at. `0.3` was chosen when it was the only thing
keeping dark v2 fills off the background — and **v3 removed that reason**: fills
are now flat at Y ≈ 0.213 with a deliberate luminance floor, so they no longer
need rescuing from within. Try taking the floor down (0.3 → ~0.12) and raising
the light contribution to compensate. Expect to re-check the bloom threshold
after, since this changes the emitted range that `BLOOM_THRESHOLD_MIN` is tuned
against — **and note that number is already the least-trusted value in the
codebase** (see `HANDOFF.md` §5 on SwiftShader).

### 2.3 The rest of the "life" list

Thomas: *"transparency, gradients, hover effects are non existent."*

- **Transparency**: every node material is already `transparent: true`
  unconditionally, so the machinery exists — nothing is using it except the focus
  dim and hollow nodes. **Danger:** transparent-queue sort instability is the
  leading suspect for the node flicker nobody has diagnosed yet (§9 of the
  review; the four tests are still unrun). Mass transparency would make it worse.
  **Run the flicker tests before leaning on transparency.**
- **Gradients**: the *edges* already have one — `GradientLinkMaterial` blends
  upstream ink to downstream ink along the line, which is how a border crossing
  reads. The *nodes* have none. An `envMap` (a cheap procedural cube or a
  gradient equirect) would give every sphere a consistent highlight and a dark
  side for free, and is probably a better spend than hand-authored gradients.
  `metalness` is 0.05, so raise it a little or the envMap will barely show.
- **Do not reach for faceted geometry.** Standing rule in `nodeVisuals.ts`.

---

## 3. "Can we double all the lengths of all edges easily?"

**Yes — one line, and this session rendered it to be sure.**

`src/components/InfluenceGraph.tsx`, in the `forceGraph` memo:

```js
linkForce?.distance((l) => (40 + (1 - l.weight) * 28 + l.hubRoom) * m)
```

Doubling those terms (`80`, `56`, `hubRoom * 2`) produces exactly what Thomas
asked for: **chains draw out, pulses get room to travel, and node size on screen
is unchanged.** Verified in a render, then reverted because Phase 4 is back
burner. It is a genuine improvement to legibility and would be a reasonable thing
to land early if he wants it before the rest of this list.

**Why it works, and why the obvious alternative does not.** The layout is
scale-invariant: multiply *every* force length by k and the cloud grows by k, the
camera backs off by k, `nodeScale` rises by k, and the render is pixel-identical.
Nothing is gained. Changing the link rest length **alone** works precisely
because it is not uniform — collide radius and the charge distance cap stay put,
so the *ratio* of edge length to node size moves, and that ratio is what is being
complained about.

### 3.1 And this is why `Cluster spread` disappoints

Worth knowing, because Thomas is running that slider at **375%** and it is not
giving him what he wants. `spread` (`m`) multiplies four different things at once:

```js
charge?.strength(-300 * m)      // a FORCE magnitude, not a length
charge?.distanceMax(420 * m)    // a length
linkForce?.distance((…) * m)    // a length
forceCollide(… + 4 * m)         // only the PADDING term; the node radius is not scaled
```

Scaling a force strength and two lengths by one number is not a coherent
operation — it is close to the scale-invariant no-op described above, except for
the parts that aren't, which is why the result is hard to predict and why 375%
feels necessary. **Consider splitting the control**: a "spread" that moves link
rest length only is the lever people actually want, and it is the one measured
above. Keep the old behaviour behind the same default (`1`) so no saved view
changes meaning.

---

## 4. Interaction — hover, click, and the panels

### 4.1 Hover should have 3D feedback

Thomas: *"the way the info on the node pops up on hover over a node is nice but a
lift and grow and glow/shadow to signify we can click it would be better."*

Today hover is **entirely 2D**: `onHover` sets React state, a tooltip `div` is
positioned by a layout effect and its opacity flips 0→1. The node itself does not
change at all. That is the whole reason it does not read as clickable.

**This is cheap, and the machinery already exists.** Mutating a hovered mesh
per-frame is exactly what the orb breath does today
(`ORB_PULSE_PERIOD_SECONDS`, in `useFrame`): scale and `emissiveIntensity`
rewritten every frame off a clock. Add a `hoveredRef` (same closure-escape
pattern as `focusRef` / `levelColoursRef` — **do not put hover in React state
that the renderer reads**, and do not put it anywhere near the `forceGraph` memo
deps), then in `useFrame` ease the hovered mesh's scale toward ~1.15× and lift
its emissive. Ease it, do not snap — a step change reads as a glitch, and this
scene already has a suspected flicker bug people will blame it for.

**The "glow/shadow" is already built.** The selection halo added in Phase 0b
(`selectionHalo`, `placeSelectionHalo`) is one sprite holding a constant pixel
radius at any zoom, and it takes the node's own ink. A second instance at smaller
radius and lower opacity is the hover glow, for almost no code. **Read
`positionedById`, not `meshes.current`, for its position** — see the trap in
`HANDOFF.md` §8; the halo hit exactly this and drew a ring around the middle of
the graph.

### 4.2 Click should slide a card in from the right

Thomas: *"Once clicked the info card can slide on in from the right in a smooth
and interesting fashion."*

**Structurally easy.** `Detail` (`App.tsx:797`) is already a self-contained
component that takes `{ report, graph, disclosure }`. Today it is rendered inside
a cursor-following tooltip div driven by `hovered`. Give it a second home: a
fixed right-hand panel driven by `selectedId`, with a CSS transform transition.
**The component itself does not need to change.**

Decide deliberately what hover does once click has a card — showing the same
content twice in two places is the kind of duplicate encoding this project
already deleted once (the arrowheads, the jurisdiction glyphs). A reasonable
split: hover gets a small identity chip (title, publisher, country), click gets
the full card.

---

## 5. "Is there info trapped in the edges?" — **yes, and it is the best material in the project**

This is the most interesting question Thomas asked, and the answer is better than
he probably expects.

Every `Dependency` in the data carries:

| field | what it is |
|---|---|
| `relationship_type` | `methodology_depends_on`, `calculated_from`, `uses_data_from`… |
| **`basis`** | **why this edge is believed to exist — usually a verbatim quote from the source document** |
| `evidence_url` | the primary source it was read from |
| `reference_period` | *when* the source report reads the target |
| `evidence` | documented, or implied |
| `strength` | optional manual weight override |

**None of it reaches the renderer.** `LinkDatum` carries only `source`, `target`,
`weight`, `upstreamCadence`, `colour`, `endColour`, `count`, `cross`, `hubRoom`,
`key`. The evidence — the thing this entire project's standing rule is built
around (*"if no document says a dependency exists, it doesn't go in the graph"*)
— is loaded, used to build the graph, and then thrown away before drawing.

So: **an edge card is not a nice-to-have, it is the graph finally showing its
working.** Thomas asked whether it could slide in from the left. Yes — and left
is a good choice, because it makes the axis meaningful: **right = what a node
is, left = why an edge exists.**

**The one real difficulty: trunks.** One drawn line can stand for up to **57**
real dependencies (the EU orb → ESA 2010 at tier 1 — that is what `count` is).
So an edge card has to render a *list* of bases, not one. And `LinkDatum` has no
back-reference to the `Dependency` records it aggregates — **that has to be added
first**, and it is the only non-trivial piece of this item. Keep the ids, not the
objects, and look them up on demand; the whole point of the trunk merge was to
delete 56 draw calls per pair, and holding 57 object references per line to
support a panel nobody has open would give some of that back.

Edges are not currently clickable at all. `reportIdAt` walks up from whatever the
raycaster hit looking for `userData.reportId`; lines carry no equivalent. Adding
`userData.linkKey` to the line objects is the hook.

---

## 6. The menu bar

Thomas circled, and wants hidden by default behind Word-style dropdowns:

| circled | component |
|---|---|
| title + corpus stats + MOST DEPENDED UPON + subject chips | inline in `App.tsx` |
| CALENDAR | `CalendarPanel.tsx` |
| Find a report… | `SearchPanel.tsx` |
| UNLINKED — 292 shelf | `IsolatedShelf` (`App.tsx:1611`) |
| VIEW / FOCUS panel | `ViewControls.tsx` |
| country chips | `ChipBar` (`App.tsx:1281`) |
| tier buttons + status line | `TierBar` (`App.tsx:1553`) |

All seven are already separate components or clearly bounded blocks, and
`PanelShell.tsx` exists as a wrapper — this is a re-parenting job, not a rewrite.

**Two pieces of pushback, offered once and then dropped.**

- **The tier buttons are the primary navigation**, not a setting. Global → Nations
  → States → Everything is how the graph is meant to be read, and the onboarding
  modal teaches it as the first thing a new user does. Behind a menu, it becomes
  discoverable only by hunting. Consider keeping the tier bar visible and hiding
  the other six.
- **The status line is the only feedback that a filter is on.** *"136 shown · 1250
  in this tier · filter hiding 1114"* is what stops a user concluding the graph is
  broken when three quarters of it is missing — the same confusion that produced
  the black-screen bug report. If it goes into a menu, put a thin always-visible
  strip somewhere in its place.

**Help and How-to.** Both wanted. Most of the content is already written and in
the repo: `START-HERE.md` is deliberately the plain-language, jargon-free
description Thomas sends to other people — that is the Help menu, nearly
verbatim. `Onboarding.tsx` already contains the how-to (tiers, double-click an
orb, click to trace, drag to orbit, `/` to search). Wire the How-to menu to
re-open that modal rather than writing a second copy that will drift out of step
with it.

---

## 7. Tabs, and saving your work

Thomas: *"How difficult is it to add a tab feature… If it is relatively easy on
the processors then allow several tabs or a save feature… It could be annoying to
always open to the basic graph and then have to adjust all these settings the way
you like."*

**The honest answer is: the saving is easy, the tabs are not, and the saving is
what he actually wants.**

### 7.1 Saving is genuinely easy

Everything that makes a graph "yours" is **five `useState` values at the top of
`App()`**, all plain JSON:

```ts
const [drilldown, setDrilldown] = useState<Drilldown>(DEFAULT_DRILLDOWN)  // which tier
const [view, setView]           = useState<ViewSettings>(DEFAULT_VIEW)    // every slider and toggle
const [filter, setFilter]       = useState<FilterState>(NO_FILTER)        // country/scope/subject chips
const [selectedId, setSelectedId] = useState<string | null>(null)         // the traced node
// (+ resetSignal, which is a nonce and should not be saved)
```

Serialise those four, restore them on load, done. **`localStorage` is available
here** — the ban on it applies to claude.ai artifacts, and this is a local Vite
app running on Thomas's own machine. A named-workspace list in `localStorage`
plus "save current view" / "load" is a small, self-contained feature, and it
solves the actual complaint: *always opening to the basic graph*.

**Version the saved blob from day one.** `ViewSettings` has gained fields in
nearly every round (`geoAffinity`, `spread`, `fog`, `glow`…) and `blueprint` is
about to be *removed* by §1 of this document. A saved view from last week must
not crash next week's build — store a schema version, and merge into
`DEFAULT_VIEW` rather than replacing it, so an unknown-shaped save degrades to
defaults instead of breaking.

### 7.2 True tabs are not cheap — do "saved views" instead

A tab that is genuinely live is a `<Canvas>`, a full three.js scene, ~1 250
meshes, ~1 000 line materials and **a running d3-force simulation**. Several of
those at once is several simulations ticking every frame. That is not free, and
the answer to *"is it relatively easy on the processors"* is **no**.

**Recommendation: one canvas, N saved states.** Tabs across the top that swap the
four values above. Cost depends entirely on which values differ:

- Switching **`view` or `filter` only** → instant. The `forceGraph` memo does not
  rebuild; the accessors read refs and re-digest. This is the common case.
- Switching **`drilldown` or `view.spread`** → rebuilds the memo, which resets
  `fitted`, `userOwnsCamera`, `settledOnce` and re-warms the layout. **A visible
  beat, unavoidable**, and the same beat the tier buttons already cost today.

That is a good trade and worth saying plainly to Thomas: *tabs that switch
instantly for settings and filters, with a pause when they switch tier.*

**Do not** put the active tab in the `forceGraph` memo's dependency array — same
standing rule as the Phase 2 view modes. Swap the state, let the existing deps
notice what actually changed.

---

## 8. Suggested order

§1 first and §7.1 last; the middle is negotiable.

1. **Delete Blueprint** (§1). Subtractive, makes everything after it cheaper.
2. **Lighting and emissive** (§2.1, §2.2). Biggest visible return; also
   changes what blooms, so it must precede any bloom retune.
3. **Edge length** (§3). One line, already rendered, already known to work.
4. **Hover feedback** (§4.1). Small, reuses the halo and the breath loop.
5. **Selection card from the right** (§4.2). Mostly layout; `Detail` is reusable.
6. **`LinkDatum` → `Dependency` back-reference, then the edge card** (§5). The
   only item here with real design in it, and the most valuable.
7. **Menu bar, Help, How-to** (§6). Touches everything, so do it once the things
   it has to host have stopped moving.
8. **Saved views** (§7.1). Do it after the menus, or you will be versioning a
   schema that is still changing.

---

## 9. Traps carried into Phase 4

Everything in `HANDOFF.md` §8 still applies. The four that will bite *this* round
specifically:

- **`meshes.current` cannot be trusted for positions.** Read `positionedById`.
  Hover and edge picking will both want positions.
- **Transparency does not stop a raycast.** Any new ghosted or faded element
  needs `raycast = () => {}` or it eats clicks meant for what is behind it.
- **Never put a mode, a tab, or a hover in the `forceGraph` memo deps.** Every
  change to that array resets the camera and re-warms the physics.
- **The flicker is still undiagnosed and the four tests are still unrun.** Adding
  transparency, hover scaling and a second halo sprite will all be blamed for it.
  Run the tests first so you know what you started with.
