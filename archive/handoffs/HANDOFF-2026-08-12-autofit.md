# Handoff — auto-fit on every change, and two HUD cleanups

Written 2026-08-12, after `HANDOFF-2026-08-12-tier-buttons.md`. The tier buttons
are unchanged; this is about the camera never re-framing, which turned out to be
three separate faults stacked on top of each other.

Do not run git in this folder (standing rule).

---

## 1. "I see a black screen and have to play with the settings to find the nodes"

Three causes, all now fixed. Each alone was enough to produce it.

### 1a. The fit framed nodes that were not on screen

`runFit` fitted the camera to every node in the *disclosed* graph, filtered or
not. With an EU-only scope filter hiding 399 of 728, it framed the box the whole
corpus occupies and left the survivors as a knot off to one side of an otherwise
empty frame. `runFit` now filters by `shownNode` before measuring anything.

### 1b. A filter change never triggered a fit at all

`forceGraph` is memoised on `[graph, spreadApplied]`. A filter change hides nodes
through the library's visibility accessors *in place* — the memo never sees it,
so `fitted` stayed true, the tracking window stayed expired, and
`userOwnsCamera` stayed set from whenever the camera was last touched. Nothing
moved the camera while three quarters of the graph vanished in front of it.

New `requestRefit()` hands the camera back and re-opens the tracking window; the
`[forceGraph, visible]` effect calls it. A filter toggle is a request for a
different view, exactly like a tier button.

### 1c. The zoom slider and the re-fit were fighting, and the re-fit lost

The nastiest of the three, and the reason the first two fixes were not enough.

`CameraZoom` infers the current zoom as `cameraDistance / fitDistance`. That is
only sound while nothing but the wheel moves the camera. `runFit` moves it
during `useFrame`, but the `fitDistance` **prop** describing where it moved it to
does not arrive until the next render — so for one frame CameraZoom divides the
new camera distance by the *old* fit distance and reports the ratio as a zoom
the user never asked for. The slider→camera effect then obediently pushes the
camera to `newFitDistance × thatRatio`.

Measured, opening the national tier: a phantom zoom of 2.85, camera flung to
22,587 units against a fit distance of 9,156, and then — the part that made it
permanent — `cameraMovedOffFit` correctly concluded that someone had grabbed the
camera and switched tracking off for good, with every node off screen.

Fixed with `fitSync`, a small module-scope object exported from
InfluenceGraph.tsx carrying the last fit distance plus a stamp. CameraZoom reads
that instead of the prop, and re-baselines to zoom 1 whenever the stamp moves.

**Routing this through App state was tried first and does not work.**
CameraZoom's `useFrame` runs *after* InfluenceGraph's in the same frame, so its
bad value is simply the last write to land in the React batch. The two
components have to agree within a frame, and props cannot do that. If someone
later "cleans up" `fitSync` into context or state, this bug comes straight back.

### Two related improvements made while in here

- **The tick gate now applies only to the session's first fit.**
  `MIN_TICKS_BEFORE_FIRST_PAINT` (30) exists because three-forcegraph starts
  nodes near the origin. That is true once; every later rebuild seeds positions
  from the previous layout, so there is nothing to wait for. Waiting anyway left
  the camera on the old view — half a second on real hardware, measured at 16
  seconds in this sandbox.
- **Tracking now runs for `REFIT_WINDOW_SECONDS` *or until `onEngineStop`*,
  whichever is later.** The 12-second window was a guess at settle time and is
  only right for one machine. Opening the national tier reveals 403 nodes seeded
  on top of their orb; the cloud then grows by more than an order of magnitude,
  and in the sandbox that was still happening long after the window shut.
  `onEngineStop` fires on alpha decay or at the library's own 15s ceiling, so
  this cannot run forever, and on fast hardware it fires well inside the window
  and changes nothing.

## 2. HUD

- **Unlinked shelf is now wide, not tall.** Thomas: *"see how the unlinked nodes
  look large and out of place? they should be fitted horizontally instead of
  vertically."* Four dots across turned 85 unlinked reports into a full-height
  column — a third sidebar for the least structurally important part of the
  corpus, size on screen inversely proportional to importance. Now a fixed
  316px-wide block using `auto-fill` (so it stays wide-and-short as the set
  grows) with 12px dots instead of 14. Measured 316×119.
- **Calendar tab moved to the left of the search bar, with a 📆 icon.** It used
  to sit bottom-centre, which the tier buttons took over. It anchors off
  `SEARCH_BAR_WIDTH`, now exported from SearchPanel.tsx rather than duplicated —
  the two files have to agree about where that edge is. The button lights up
  while the panel is open, since it no longer touches the panel it toggles.

## 3. Verification

- `tsc --noEmit`, `npm run build`, `npm run validate` clean. `__debugIG`
  stripped and re-grepped.
- **Recovery suite**: pan the camera until 0% of nodes are on screen, then make
  a change and check the graph comes back. All six pass — scope filter on, a
  second filter on, tier button up, filter cleared, tier button to Everything,
  and Reset. Every one recovers to 100% of visible nodes on screen, 1–6%
  off-centre.
- HUD assertions: calendar left of the search bar, at the top, icon present;
  unlinked panel wider than tall. Zero console errors.

**Testing trap that cost the most time here, worth writing down:** the
hand-rolled screen projection used in earlier sessions' harnesses (walking
`matrixWorldInverse` / `projectionMatrix` by hand) is **wrong**. It reported
"100% of nodes on screen" for a camera panned three screen-widths off the
cloud, which made two broken runs look like passes. Use three's own
`new THREE.Vector3(x,y,z).project(camera)` — reachable in-page as
`new (camera.position.constructor)(...)` — and treat `v.z >= 1` as off-screen.

## 4. Open

1. Thomas's live read.
2. **Global "by level" filter row** — still not built, still the natural
   companion to the tier buttons. `FilterState.scopes` is country:level pairs,
   so cutting municipal worldwide takes eight clicks.
3. **Cluster spread / geo-affinity at extreme settings** were at 250% / 100% in
   his earlier screenshots and spread the layout enormously. The camera now
   follows a re-fit properly, so this may no longer bite — but it is untested at
   those values.

---

# Addendum — the blank screen on States / Everything was the FAR CLIP PLANE

Added later on 2026-08-12, after Thomas reported the screen still going blank on
tiers 3 and 4 specifically.

**This was not the auto-fit, and everything above about the auto-fit still
stands.** The fit was provably correct at the moment the screen was blank:
camera exactly at the computed fit distance, orbit target dead on the centroid,
and the radius implied by that distance matching the measured cloud radius to
the unit. 4 of 588 nodes were visible anyway.

`far` is set once on the Canvas in App.tsx (`far: 12000`) and was never revisited
when the tiers arrived. At the States tier the fit puts the camera **11,539**
units from a cloud of radius **2,033** — so the graph's far side sits at
**13,572**, past the far plane. The depth clip threw it away after the camera had
aimed at it correctly.

That also explains why it looked intermittent rather than absolute: 13,572
against 12,000 is a near miss, so whether a given tier blanks depends on where
that run's layout happened to settle. Tiers 1 and 2 never got far enough out to
hit it.

`runFit` now grows `camera.far` to `(distance × ZOOM_MAX + nodeRadius) × 1.15`
whenever the current value is short — sized for the furthest the camera can
legitimately get, since the zoom slider pulls back to `ZOOM_MAX` times the fit
distance and the cloud's far side is another radius beyond that. Grown, never
shrunk. Measured after the fix: far settles around 29,000 at tier 4.

**Diagnostic lesson worth keeping.** The symptom ("clicking States goes blank")
points squarely at the thing that was just changed — the fit — and the fit was
innocent. What settled it was measuring the fit's *own* correctness rather than
its outcome: comparing the radius implied by the camera distance against the
measured radius of the cloud. Those agreeing to the unit while 99% of nodes were
off screen is what ruled out the whole camera-positioning story and pointed at
the projection instead.

Also note: the earlier `refit2` recovery suite passed "tier button: Everything"
at 100% while this bug was live, because those runs happened to settle inside
12,000. A green suite did not mean the tiers were safe. The `finalwalk` harness
added afterwards clicks every tier from a cold load and checks all nodes survive
the clip — that is the one that catches this class of fault.

## Verification after the fix

- Every tier from a cold load: 1 → 2 → 3 → 4 → back to 1 → 4 again, all at 100%
  of visible nodes on screen. `far` grows 12,828 → 28,203 → 29,267 → 29,424.
- Full recovery suite re-run: all camera-recovery cases still pass.
- `tsc --noEmit`, `npm run build`, `npm run validate` clean; `__debugIG`
  stripped and re-grepped.
