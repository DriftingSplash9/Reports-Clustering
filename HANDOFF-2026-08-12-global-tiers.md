# Handoff — global tier drilldown, shape encoding, pulse, onboarding

Written 2026-08-12, superseding the drilldown sections of `HANDOFF-2026-08-12.md`
and `HANDOFF-2026-08-12-camera-fix.md`. The camera fix in that second file still
stands and is untouched here.

Do not run git in this folder (standing rule).

---

## 1. The correction that mattered: depth is GLOBAL, not per-family

The first two builds kept one depth number **per colour family**, so opening
Canada opened Canada and left the EU shut. Thomas, on seeing it live:

> *"when it initializes I double click the eu and only the eu open up. I want to
> have double clicking the eu to open all national level nodes, then if i double
> click the nation then ALL provinces and states appear in the mix... What
> happens now is if I double click on canada on the load screen only canada
> opens."*

`Drilldown` is now a single `number` — how many rungs of one global ladder are
open. A double-click on any orb advances the whole world one tier.

**Note for anyone reading the older handoffs:** the earlier exchange where Thomas
picked "flat is fine" was about *per-branch* drilldown (open Alberta's
municipalities alone), which he still does not want. That answer was never about
per-family depth. Two different axes, and conflating them is what produced two
wrong builds. Per-branch remains explicitly declined; slicing by anything other
than depth is the sidebar's job.

### The ladder

`TIERS` in `hierarchy.ts`, broadest first. `municipal` and `institutional` share
the last rung, because his walk ends at one final click that leaves nothing
folded, not two.

| depth | rung | real nodes | orbs |
|---|---|---|---|
| 0 | (all folded) | 0 | 8 |
| 1 | International | 41 | 8 |
| **2** | **Supranational — the load state** | **117** | **8** |
| 3 | National | 520 | 7 |
| 4 | State / Province | 630 | 6 |
| 5 | Municipal + Institutional | 728 | 0 |

`DEFAULT_DRILLDOWN = 2`. The graph opens already showing the international and
supranational tiers, which is his *"first view of the supranationals"*, and makes
the very first double-click land on the national tier — the step he kept saying
was broken. Confirmed with him before building.

Folding is unchanged in spirit: double-clicking a real node drops depth to that
node's own tier, collapsing it and everything narrower.

## 2. Shape carries the tier; colour still carries the region

> *"It is annoying how the shades of red don't help humans differentiate nodes.
> I need some sort of symbol or rethink the colour scheme altogether."*

This was a real encoding failure, not a taste complaint: hue meant family and
*shade within that hue* meant level, and shade is a hopeless categorical channel
— it needs a side-by-side comparison at equal size and lighting, none of which
holds in an orbitable scene with bloom at 3-11px nodes.

`TIER_GEOMETRY` in `nodeVisuals.ts` gives each level its own solid. Colour is
untouched, so everything you already know about which colour means which region
still holds.

| level | solid |
|---|---|
| international | sphere |
| supranational | icosahedron (faceted sphere) |
| federal | **cube** |
| provincial | octahedron |
| municipal | tetrahedron |
| institutional | capsule |
| orb | sphere (always, regardless of contents) |

Two things here are load-bearing and should not be "simplified" later:

- **Every shape is volumetric.** The obvious design gives the narrowest tier a
  ring or disc, and this codebase already rejected exactly that once — see the
  `hollow` note in `nodeVisuals.ts`: *"a torus or a disc vanishes edge-on, and a
  fifth of the nodes disappearing at certain angles would be worse than the
  problem being fixed."* A flat glyph is only a symbol from one direction.
- **The per-tier size multipliers are not cosmetic.** A cube of half-extent `r`
  looks much bigger than a sphere of radius `r`; a tetrahedron of circumradius
  `r` looks much smaller. Unscaled, the shape encoding silently corrupts the
  size encoding, which is authority — the one rule the graph exists to express.

Institutional is deliberately the odd shape out, because it is the odd tier out:
"commercial / other", not a rung of government.

## 3. Orb pulse

> *"maybe when we are viewing the top level the orbs that are paths to lower
> levels can slow blink or pulse saying 'click me'..."*

**Orbs pulse; real nodes never do.** Both halves of his description name the same
set — at every depth the orbs are exactly what still holds something and exactly
what a double-click opens. Pulsing real nodes would actively mislead, because
double-clicking a real node *folds*. It also needs no upkeep: at full depth there
are no orbs, so the pulse stops on its own.

2.6s period, swinging mostly *downward* from normal brightness (`ORB_PULSE_FLOOR
= 0.42`) plus a 7% swell. Downward because emissive is capped below 1 everywhere
in this file — bloom clips above that — so a pulse that brightened past the cap
would flash every orb to the same white blob once per cycle, destroying the size
and colour channels. Measured live: emissive 0.18→0.39, scale 1.308→1.398.

## 4. Onboarding card + depth readout

`src/components/Onboarding.tsx` (new). Shown on load, dismissible, Escape works,
"don't show again" persists to `localStorage` under `rig.onboarding.dismissed.v1`.
Clear that key to see it again.

It teaches the gesture *and* the shape ladder in one card, on purpose — they are
the same ladder, and split across two surfaces one of them goes unread. The
glyph row is hand-drawn SVG that must be kept in step with `TIER_GEOMETRY` by
hand; that cost is accepted over mounting six WebGL contexts in a modal.

`DepthReadout` in `App.tsx` (bottom centre) shows `Level 3 / 5 — National` and
`520 of 728 shown`. This exists *because* depth went global: while depth was
per-family you could read your position off the scene, but with one global depth
the orbs look identical at every rung and the only difference between views is a
node count nobody can eyeball.

## 5. Verification

- `tsc --noEmit`, `npm run build`, `npm run validate` all clean.
- Instrumentation stripped; `grep -rn "__debugIG" src/` is empty, and the
  delivered `InfluenceGraph.tsx` diffs identically against the pre-hook copy.
- **Unit checks on the pure logic** (`tiercheck.ts`, written and deleted — worth
  rewriting rather than recovering): tier mapping, orb clicks advancing then
  clamping `[3,4,5,5,5,5]`, folding from each level, and *every report resolving
  to a node that exists at every depth* (0 mismatches across all 6 depths). The
  decisive one: **one click reveals federal nodes in 77 distinct countries.**
- **Headless walk against `npm run dev`**: load 80 → 451 → 556 → 643 nodes in the
  3D scene across three clicks, ending with 0 orbs, zero console errors.
  (643 not 728 because the 85 isolated reports live on the HTML shelf, not in
  the 3D scene — 728 − 85 = 643. Not a bug.)
- **Geometry audit in the live scene**: every tier drew its own solid and only
  its own — sphere×31, icosahedron×41, box×372, octahedron×106, tetrahedron×60,
  capsule×33. No cross-contamination.
- Reset returns to Level 2. Onboarding shows and dismisses.

**Testing trap, cost me a wrong conclusion:** sampling orb meshes by walking
`forceGraph.traverse()` finds *stale orphaned meshes* — Strict Mode's discarded
first mount leaves meshes parented in an old graph object that is never ticked.
Sampled that way the pulse reads as frozen. Sample `meshes.current` (the ref)
instead, via the debug hook. The earlier handoff's note about forcing the refit
window open still applies and is still needed.

## 6. Open

1. **Thomas's live read.** Everything else waits on this.
2. **Global level filtering — the one thing in his message I did not build.** He
   wrote *"if i want to cut the municipal noise out across the world I would be
   able to"*, describing the sidebar as if it already does this. It does not
   quite: `FilterState.scopes` is a list of `country:level` pairs, so cutting
   municipal worldwide means unticking it under all eight families one at a
   time. A single "by level" row that toggles every `*:municipal` scope at once
   is a small, well-scoped addition and is the obvious next piece. Ask before
   building — he may want to live with the tier walk first.
3. Older backlog in `HANDOFF-2026-08-11-release-schedules-complete.md`, unchanged.
