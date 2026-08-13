# Handoff — tier buttons replace the drilldown gesture

Written 2026-08-12. **Supersedes the drilldown design in
`HANDOFF-2026-08-12.md` and `HANDOFF-2026-08-12-global-tiers.md`.** The camera
work in `HANDOFF-2026-08-12-camera-fix.md` still stands and is untouched.

Do not run git in this folder (standing rule).

---

## 1. The gesture is gone. Four buttons.

Thomas, after using the global-tier build:

> *"this is not working, we need to simplify this. it is behaving irregularly.
> Can we just create buttons across the bottom to select different levels?"*

He was right to cut it, and it is worth being precise about *why* it behaved
irregularly, because two separate faults were compounding and only one of them
was the gesture.

**Fault 1 — the same gesture meant two opposite things.** Double-clicking an orb
opened a level. Double-clicking a *real node* folded the view back to that
node's own tier. So double-clicking a national report hoping to see more inside
it instead deleted every national report from the scene. Nothing on screen
distinguished the two cases, and the destructive one was the easier to hit by
accident, because real nodes vastly outnumber orbs at every tier past the first.

`toggleDrilldown` now only ever steps **up**, and only on orbs. A real node does
nothing. Going back down is the buttons' job and only theirs. **Do not re-add
fold-on-node-double-click** — a control that can only add detail cannot surprise
anyone by removing it.

**Fault 2 — the one number on screen was describing something else.** The depth
readout counted the *disclosed* graph and ignored the sidebar filter. In
Thomas's screenshots it says "527 of 728 shown" over a scene containing about
ten dots, because he had an EU-only scope filter active (212 reports) on top of
a 250% cluster spread. The readout was not lying about anything it claimed to
measure; it was measuring the wrong thing. The tier bar now counts **real
reports, orbs excluded, after the filter**, and names the filter as the reason
whenever the two disagree.

## 2. The tiers

Specified by Thomas directly:

> *"Combine - International and commercial/industrial into 1 tier, in the next
> have all of the tier one plus all nations in the data set. Tier 3 is tier 2
> plus all the provinces and states. Tier 4 is everything"*

`TIERS` in `hierarchy.ts`. Cumulative — tier N shows everything in tiers 1..N.

| button | levels added | reports shown | orbs left |
|---|---|---|---|
| **1. Global** | international, supranational, institutional | 151 | 7 |
| **2. Nations** | + federal | 554 | 6 |
| **3. States** | + provincial | 664 | 5 |
| **4. Everything** | + municipal | 728 | 0 |

`supranational` rides in tier 1. He named the other two explicitly and did not
mention it, and tier 1 is the only place it can go — tiers 2, 3 and 4 are
spoken for by nations, states and municipalities, so anything above the nation
state either sits in the opening view or never appears at all. It also matches
how he described the opening screen earlier the same day: *"our first view of
the supranationals"*.

`Drilldown` is now the tier number itself (1–4), not a count of opened rungs, so
the value reads the same way as the button the user pressed.

**Double-clicking a pulsing orb still works** and does the same thing as pressing
the next button up. It is a shortcut now, not the mechanism.

## 3. Pressing a tier button re-frames the camera

`handleTier` sets the tier *and* puts `view.zoom` back to 1. The tier change
already triggers a rebuild, which resets `userOwnsCamera` and lets the tracking
fit run — but a zoom the user left at 4x survives that, and would leave them
staring into the middle of a cloud that just changed size by a factor of three.
Pressing a tier button is a request for a *view*, not just for more nodes. Same
reasoning as Reset, for the same reason.

## 4. Unchanged from the previous pass

`InfluenceGraph.tsx` and `nodeVisuals.ts` are byte-identical to what was
delivered earlier today — verified by diff, not by assumption. That means the
shape encoding (shape = level, colour = region), the orb breath, and the camera
fix all carry over as documented in the earlier handoffs.

One thing to know if you touch the onboarding card: there are **six shapes but
only four tiers**, because tier 1 alone holds three levels. The glyph legend is
labelled by *level* and deliberately does not read from `TIER_LABEL`; wiring it
to the tier names would mislabel half the row.

The onboarding storage key moved to `rig.onboarding.dismissed.v2`, so the card
reappears once even for anyone who had dismissed the old one — the old card
taught a gesture that no longer exists.

## 5. Verification

- `tsc --noEmit`, `npm run build`, `npm run validate` all clean.
- Instrumentation stripped; `grep -rn "__debugIG" src/` empty, and
  `InfluenceGraph.tsx` diffs identically against the pre-hook copy.
- **Unit checks on the pure logic**: tier membership, `DEFAULT_DRILLDOWN === 1`,
  counts 151 → 554 → 664 → 728, *every tier literally a superset of the one
  before* (checked by id, not by count), orb double-click stepping `2,3,4,4,4,4`,
  and — the regression guard that matters — **double-clicking a real node never
  changes the tier at any tier**.
- **Headless button-driving against `npm run dev`**: clicked all four buttons in
  order then back to tier 1. Scene went 112 → 483 → 588 → 643 nodes, tier 4 left
  0 orbs, `aria-pressed` always matched the tier clicked, going back down
  restored tier 1 exactly, zero console errors.
  (Scene counts are corpus minus the 85 isolated reports, which render on the
  HTML shelf rather than in 3D. 728 − 85 = 643. Not a bug.)

**Testing note:** driving the tier buttons via `getByRole` is far more reliable
than the synthetic double-clicks the previous passes depended on — picking a
clickable 3D node by screen projection stops working above roughly 400 nodes
because nothing is uncrowded enough to hit. Prefer buttons and pure-logic tests.

## 6. Open

1. **Thomas's live read.**
2. **Global "by level" filter row.** Still not built. `FilterState.scopes` is a
   list of `country:level` pairs, so cutting municipal worldwide means unticking
   it under all eight families. Now that the tier buttons handle *depth*, this
   is the natural companion for *slicing*, and his screenshots show him already
   using per-family scope filters heavily. Worth proposing again.
3. **Cluster spread interacts badly with the tier change.** His screenshots had
   it at 250% with geo-affinity at 100%, which spreads the layout enormously.
   Not investigated this pass. If he reports the graph looking sparse or lost
   after a tier change, start there rather than in the camera code.
4. Older backlog in `HANDOFF-2026-08-11-release-schedules-complete.md`.
