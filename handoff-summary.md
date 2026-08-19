# Handoff summary — 2026-08-19

Plain-language companion to `HANDOFF.md`. Two halves: **what got done**, and
**what we agreed to do next**. The formal detail lives in `HANDOFF.md` §5 and
`notes/phase-4-brief-2026-08-19.md`; this is the version you can read without
opening the code.

---

# PART ONE — What we did

The decision that started it: **build the visual revamp (Lane B) before importing
the staged Grok archive (Lane A)**, accepting that the palette will need
re-tuning afterwards. Phases 0, 0b and 1 of the visual review are now built, on
disk, and type-checking on your machine. Nothing is git-committed — you commit.

## The headline

The graph was rendering at roughly an eighth of the frame, with 7-pixel nodes and
edges **0.08 pixels wide**. It now fills the frame with 19-pixel nodes and
1.6-pixel edges, in a flat-luminance palette with no rims.

## Phase 0 — size

Three separate faults, two of them outright bugs rather than taste:

- **The node scale was pinned at a guard rail.** Measured on the full corpus:
  the fit wanted a scale of 9.75 and the code handed back 6. Thirty-eight percent
  of node size was being thrown away, silently, every session. That cap was the
  whole bug.
- **Edges and pulses never grew with the corpus.** Nodes had been scaling with
  the cloud since that system was built; line width and pulse size were left in
  fixed units and grew by *nothing* while the corpus went 120 → 1,250 nodes.
  Hence the 87:1 node-to-edge ratio you noticed.
- **A dozen two-node islands were setting the frame.** The camera was fitting the
  furthest speck rather than the graph. It now fits the 95th-percentile radius.

The camera also no longer refits on every filter change — it measures first and
only moves if what survived isn't already usably framed, which keeps your
black-screen fix intact.

**Where the review was wrong, and I only found out by measuring:**

- It offered "fit the largest connected component" as an equal alternative. On
  this corpus the largest component is **426 of 958 connected nodes — 44.5%**.
  Fitting it would crop more than half the graph. Rejected.
- It said scaling collision off `nodeScale` breaks the feedback loop. It doesn't
  — `nodeScale` is itself derived from cloud radius. The layout is
  scale-invariant, so collision stays in fixed units and was opened up relative
  to link length instead.

## Phase 0b

- **Selection halo** — one sprite holding a constant 76-pixel ring at any zoom,
  taking the selected node's own colour. Works in every mode, owes nothing to
  bloom.
- **Horizon** dropped from a bright slate-blue to something that isn't a light
  source, and the edge fog now fades toward the horizon colour instead of toward
  near-black. Previously distant lines dissolved into a colour that wasn't
  behind them.
- **Sphere geometry cached** by rounded radius — was allocating 1,250 separate
  GPU buffers that differed only in a number nobody can see.

## Phase 1 — palette v3

- **The old palette spanned a 13.1× brightness range.** The new one holds the
  eleven hued families' national colours at 1.02× — essentially flat. That is the
  whole reason rims could come off: rims were never a design, they were a patch
  on a palette where the darkest nodes read as holes in the sky.
- **US pure red with a moat, Canada cyan at the antipode, International
  achromatic**, chroma damped by how much of the corpus each family is.
- **Rims deleted** from the dark scene, surviving only where there is no fill to
  read: hollow one-off instruments, and blueprint.
- **The authority glow was running backwards and is now fixed.** Emitted light
  was fill colour × authority, so across a 13× fill range the fill won: a
  worthless institutional node emitted 3–4× a top-authority one. Bloom had been
  picking out the *least* important nodes in the graph since it was first tuned.
- **Dimming and line opacity retuned** — both had been set against lines 0.08
  pixels wide, which needed all the opacity they could get merely to exist.

## How it was checked

Type-check and the full 44-check validation suite, both run **on your machine**;
corpus unchanged at 1,250 reports / 1,079 dependencies. Beyond that I got a
headless browser running in the sandbox and drove the real app — opening tier,
Everything tier, a country filter, a traced selection, blueprint — so every
number was chosen against a picture rather than arithmetic. That is how the halo
bug below was caught.

**The one thing not properly checked: bloom.** The renders were software-
rasterised, so geometry and colour are exact but the glow pass may not be. Look
at glow on your own hardware before trusting those two numbers.

## Things found along the way

- **A live bug in how meshes are tracked.** With ESA 2010 selected and plainly
  drawn on the left of the frame, the code's mesh lookup reported its position as
  exactly (0,0,0) — the halo drew a ring around the middle of the graph. The
  library rebuilds node objects and the map can end up holding one it never
  adopted. The halo now reads the layout data instead. **Anything else reaching
  into that map for a position will hit the same thing.**
- **The previous handoff's claim about domain tags was wrong.** It said adding a
  validation rule "would land green because the corpus is clean". It isn't: 86
  live reports carry 62 off-union tags. Sixty-two of those uses are a pure
  prefix strip — the domains were added to the schema last session and the data
  tags were never rewritten to match. That's Lane A's, so I left it.
- **Two agents were in this repo at once.** Another session rewrote `HANDOFF.md`
  mid-flight. I briefly archived it by mistake, restored it, and then *edited*
  rather than replaced it — their Lane A sections are carried through untouched.

---

# PART TWO — What we want to do

## Phase 2 — the first lens modes

Right now the graph answers exactly one question at all times: *which country
published this?* The mode system makes that one lens among several, as a recolour
pass — no new geometry, no re-layout.

- Add **BRICS** as a bloc. It isn't one today; the code knows about 17 blocs and
  BRICS isn't among them. It belongs with the geography, not the palette —
  BRICS is a lens, not a colour family. (That's why China is blue in the new
  palette: if China kept yellow it would look like "the BRICS one" in every other
  mode while the other four members didn't.)
- **Group comparison mode** — everything recoloured to five inks: US red, BRICS
  yellow, EU green, international white, everything else grey. This is the one
  panel the review rendered that worked unambiguously at any size.
- **World overview** as a second preset. Nearly free once the first works.

One firm constraint: the mode must never go into the graph's rebuild trigger, or
every lens change costs a camera reset and a physics re-warm.

## Phase 3 — only if 2 holds up

- **Geography takes the fill** in its own mode. This is where your original
  "geographic borders" idea lands — as a mode, not as a second ring, because two
  soft bands on one sphere is exactly the muddying you objected to.
- **Typed edges** with two line styles. Note your original dash rationale was
  inverted: `methodology_depends_on` is the *most* common type at 407, not the
  rarest. And there's a real question to answer first — a single drawn line can
  stand for 57 different dependencies, so what does a trunk's "type" even mean?

## Phase 4 — your critique, written up as `notes/phase-4-brief-2026-08-19.md`

Back burner, behind 2 and 3, and expected to grow as you add to it.

**Delete Blueprint outright** — 94 references across 8 files. First, because it's
subtractive and makes everything after it cheaper. (It also looks broken in your
screenshot; worth ten minutes finding out why before deleting, in case the same
fault is hiding in the dark scene.)

**"Cartoony, flat, no style"** — this has a mechanical cause, not just a taste
one. The key light sits about 590 units from the origin in a cloud measured at
3,000. It is *inside* the graph, and it's a point light with inverse-square
falloff, so there is no consistent light direction anywhere in the scene and the
far half of the graph is lit by ambient alone. Those nodes are flat discs
literally. Same class of bug as the 0.08-pixel edges: a constant chosen at 120
nodes and never revisited. Compounding it, the self-illumination floor is
drowning what shading remains — and the reason that floor was set high was
removed by the new palette.

**Double the edge lengths** — yes, one line, and I rendered it to be sure.
Chains draw out, pulses get room, node size unchanged. Related: `Cluster spread`
is why that felt necessary — it multiplies a force *strength* and two *lengths*
by the same number, which isn't a coherent operation. That's why you're running
it at 375%.

**Hover and click.** Hover is currently entirely 2D — the node itself doesn't
change at all, which is exactly why it doesn't read as clickable. Adding lift,
grow and glow is cheap: the machinery already exists (the orb breath does this
every frame), and the halo built in Phase 0b is the glow. Click gets the detail
card sliding in from the right; the card component is already standalone and
reusable.

**Information trapped in the edges — yes, and it's the best material in the
project.** Every dependency carries a `basis` (usually a verbatim quote from the
source document), an evidence URL, a relationship type and a reference period.
**None of it reaches the renderer.** The whole project rests on the evidence
standard, and the evidence is loaded, used to build the graph, then thrown away
before drawing. An edge card sliding in from the left is the graph finally
showing its working — and left/right splits nicely: right is *what a node is*,
left is *why an edge exists*. The one difficulty: a trunk line stands for up to
57 real dependencies, so it needs a list, and the link data has no back-reference
to add yet.

**One menu bar at the top**, Word-style, hiding the seven blocks you circled.
All seven are already separate components, so it's re-parenting rather than a
rewrite. Two bits of pushback, offered once: the tier buttons are the primary
navigation rather than a setting, and the status line is the only signal that a
filter is on — which is what stops "three quarters of my graph is missing"
reading as a bug.

**Help and How-to menus.** Most of the content already exists — `START-HERE.md`
is the Help text nearly verbatim, and the onboarding modal is the how-to. Wire
the menu to re-open the modal rather than writing a second copy that drifts.

**Tabs and saving.** The honest answer: the saving is easy, the tabs aren't, and
the saving is what you actually asked for. Everything that makes a graph "yours"
is four plain values — tier, settings, filters, selection. Saved named views are
a small self-contained feature and they solve the real complaint: always opening
to the basic graph. But a genuinely live second tab is a second 3D scene with a
second physics simulation ticking every frame, so "easy on the processors" is a
no. One canvas with several saved states gets the same result: instant when you
switch settings or filters, with a pause only when you switch tier.

## Still waiting on you — Lane A

Unchanged and unrelated to any of the above:

- **Mint the staged Grok archive, or don't.** 1,999 reports sitting ready, which
  would take the corpus to about 2.6× its size. When it lands, the palette's
  chroma damping needs re-counting — that's the debt we took on deliberately.
- 15 countries whose nodes are real but have essentially no dependency edges;
  that's the bulk of the remaining research.
- The domain-tag cleanup described above.
