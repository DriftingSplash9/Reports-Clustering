# Handoff — onboarding overlap, shelf size, and the runaway zoom

Written 2026-08-12 (late), after `HANDOFF-2026-08-12-autofit.md` and its
far-clip-plane addendum. Thomas's verdict on the previous pass was *"much better
thanks"* — the tier buttons, the auto-fit and the far-plane fix are all working
for him. This covers three follow-ups.

Do not run git in this folder (standing rule).

**Read §3 before touching the camera or the zoom slider.** One of these three is
fixed-and-verified, one is fixed-by-hypothesis, and the difference matters.

---

## 1. Onboarding captions overlapped — fixed, verified

*"the lettering is overlapping."* The glyph row was a flex row with
`flex: 1 1 0`, which sizes each column from its content. "INTERNATIONAL" and
"SUPRANATIONAL" in uppercase at 9.5px with 0.06em tracking are wider than a
sixth of the card, and being single unbreakable words they did not wrap — they
spilled sideways into their neighbours.

Three changes, each doing part of the work:

- The row is now a **grid** of six `minmax(0, 1fr)` columns, so every glyph gets
  exactly the same width regardless of caption length. This is the actual fix;
  a flex row sized by content can always be defeated by a long enough word.
- Captions are **sentence case** rather than uppercase-with-tracking, which is
  about a fifth narrower for the same legibility.
- `overflowWrap: 'anywhere'` on both caption lines, so if the card is ever
  resized narrow the labels break instead of overlapping.

Verified by measuring the DOM rather than by eye: all six captions are exactly
85px wide, `scrollWidth === clientWidth` on every one (nothing overflows its
column), and no box starts before its neighbour ends.

## 2. Unlinked shelf halved again — done

*"shrink the unlinked nodes in half."* Dots 12px → **6px**, gap 5 → 4, panel
width 316 → **232px**. The 85 unlinked reports now occupy 232×85 instead of
316×119, and the block reads as the footnote it is. Verified: rendered dot width
is 6px.

Note the coupling: the dot size and `isolatedShelfGrid`'s `auto-fill` track size
must stay equal, or the column count is computed for a size the dots do not
occupy. Both are commented to say so.

## 3. "the camera zooms out forever" — a real ratchet fixed, but NOT reproduced

**Be honest about this one with Thomas if he asks.** I found and fixed a genuine
positive-feedback loop that would produce exactly this symptom, and I added a
bound so the symptom cannot recur in its unbounded form. I could not reproduce
his sighting, so I cannot say the loop I fixed is the one he hit.

### The loop that was there

The zoom slider and the auto-fit form a cycle: camera position → inferred zoom →
camera position. A cycle with gain above one walks its value outwards forever.
The gain came from the two directions using **different numbers for "zoom 1"**:

- `runFit` published `fitSync.distance` only when it *moved* the camera.
- `onBounds`, and therefore the `fitDistance` prop, published on **every** fit
  including measure-only ones.

While the user owned the camera, tracking kept calling `runFit(false)` — so the
prop advanced with the growing cloud while `fitSync.distance` stayed frozen at
the last camera-moving fit. CameraZoom then multiplied by the prop in one
direction and divided by `fitSync` in the other, and a round trip returned more
than it was handed.

Fixed at source: `fitSync.distance` is now published on every fit (it is a
*measurement* — "how far back you would have to stand to see all of this" is
true wherever the camera happens to be), while `fitSync.stamp` still only bumps
on camera-moving fits, because that is what signals "re-baseline zoom to 1".
CameraZoom's slider→camera direction now uses `fitSync.distance` too, so both
directions key off one number. **If those two ever key off different bases
again, the ratchet returns.**

### The backstop

`handleZoomChange` now clamps to `ZOOM_MIN`/`ZOOM_MAX`. Nothing it allows is
anywhere the user could not have dragged the slider to by hand, and the worst
case becomes "further out than I wanted, drag it back" rather than a camera
receding without limit. This is deliberately a bound, not a cure.

### What was tried and did not reproduce it

All at tier 4, watching camera distance against fit distance:

- 90s idle at tier 1, 120s idle at tier 4 — rock stable, `camDist == fitDist`,
  no fits firing.
- Wheel out, then 60s idle — held exactly where it was put.
- Three rounds of orbit-drag → wheel out → wheel in → hover → click → idle, then
  a 30s idle. Maximum `camDist / fitDist` ratio reached **1.166**; a runaway
  pins at 2.6. Cloud radius identical at start and end (2271).

### If it recurs, this is what to capture

The useful measurement is `camDist / fitSync.distance` over time. A runaway is
that ratio climbing monotonically to 2.6 (ZOOM_MAX) — with the clamp in place it
will now stop there rather than continuing, which is itself a diagnostic: if
Thomas reports it *stops* at a very-far-out view now, the loop is confirmed and
the remaining work is finding which interaction opens it. Also worth capturing
is whether `cloudR` is growing at the same time, which distinguishes a zoom
ratchet (cloud static, camera receding) from the layout genuinely expanding
(both growing).

Untested interactions that could still open a loop: **auto-orbit on**,
**dragging a node** (three-forcegraph's `enableNodeDrag` is on by default and
reheats the simulation), the **cluster-spread and geo-affinity sliders** at
extremes, and **window resize** (`runFit` fits the vertical FOV and ignores
aspect, so a narrow window can crop horizontally).

## 4. Verification

- `tsc --noEmit`, `npm run build`, `npm run validate` all clean. `__debugIG`
  stripped and re-grepped.
- Onboarding caption geometry measured in the DOM (see §1).
- Shelf dot size measured (6px), panel 232×85.
- Long-running camera stability suite (see §3).

## 5. Open

1. **The runaway zoom, if Thomas sees it again.** §3 says what to capture. This
   is the only item where the fix is not confirmed against the reported symptom.
2. **Global "by level" filter row.** Still the natural companion to the tier
   buttons and still not built. `FilterState.scopes` is country:level pairs, so
   cutting municipal worldwide takes eight clicks.
3. **`runFit` ignores aspect ratio.** It fits the vertical FOV only. On a wide
   window that is conservative and fine; on a narrow or short one the cloud can
   be cropped left/right. Not reported, but it is a real gap and cheap to close.
4. Older backlog in `HANDOFF-2026-08-11-release-schedules-complete.md`.
