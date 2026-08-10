# G.5.5.md — Renderer UI note: within-country contrast and scope-panel overflow

Date: 2026-08-10
Not part of the AF (or any other) branch's numbered research hand-off chain — those are
`AF/G.*.md`, `EU/G.*.md`, etc., one independent counter per branch, and this isn't country
research. It also isn't a `sessions/V0.*.md` session-close log (that's the renderer's own
running-session format, with its own structure). This is a standalone note capturing live UI
feedback Thomas gave while looking at the running app (`http://localhost:5173`), written down as
its own file per his request so the idea doesn't get lost between sessions. Numbered `G.5.5`
because that's the label he used, sitting between AF's `G.5.md` and `G.6.md` in read order only,
not in branch sequence.

## What Thomas said, verbatim in substance

Two things, looking at the sidebar's "Publisher scope" panel while a filter was set to Canada:

1. When a single country is selected, the different jurisdiction levels inside it (federal,
   provincial, municipal, institutional) should be **more contrasted** — spread further across
   the colour spectrum than they currently read as.
2. The region list is being **cut off**. Regions should behave like **closed dropdowns until
   selected**, opening when chosen and staying collapsed otherwise, rather than all rendering
   flat and full-height at once.

## Issue 1 — within-country level contrast

**What the code actually does today.** `src/lib/palette.ts`'s `SCOPE_COLOUR` table already gives
every jurisdiction level inside a country family its own colour, not a shared one — e.g. Canada:

```
'CA:federal':      '#d44955'
'CA:provincial':   '#c32847'
'CA:municipal':    '#9c1c46'
'CA:institutional': '#691c40'
```

So the data model is not flat. The four values step from a brighter red-pink down to a dark
plum. The problem is legibility, not absence of data: `LegendRow` (`src/App.tsx` ~line 935-975)
draws each one as an **8px-diameter dot**, and the four Canada shades sit inside a narrow ~30°
hue band at adjacent saturation/lightness steps — deliberately narrow, per the palette file's own
extensive comments, because it has to leave *other* countries and continents room on the same
wheel (nine families now share it; see the "continent redesign" block starting
`palette.ts:252`). At dot size, on a near-black background, adjacent steps in a 30°-wide band
read as "the same red" — which is exactly what the screenshot showed for Canada's four rows.

**Root cause, stated precisely.** The palette was tuned for *cross-country* legibility (Canada's
reds must stay clear of the US's tans, the EU's greens, etc., all at once, all the time) at the
cost of *within-country* contrast at small swatch size. Those are different problems and the
current single fixed palette is a compromise between them — it was never asked to solve both at
once, and it shows.

**Two directions, not mutually exclusive, worth deciding between before touching `palette.ts`**
(that file has several explicit "do not raise/lower this" comments protecting hair-thin gaps
between neighbouring families — not a file to edit casually):

- **A — focus-adaptive recolouring.** This is closest to what Thomas described: when the view is
  filtered down to one country (or one scope group), that group's own levels could be remapped
  onto a wider, higher-contrast slice of the wheel *for that view only*, since cross-country
  separation stops mattering the moment every other country is hidden. Reverts to the shared
  palette when the filter clears. Most faithful to the actual ask; most work, and introduces a
  second colour meaning depending on filter state, which needs to be handled carefully so a
  colour doesn't appear to mean two different things in two screenshots.
- **B — always-on legibility floor, independent of selection.** Cheaper, and fixes the same
  complaint without adding filter-dependent colour semantics: enlarge the swatch (8px reads
  as a smear; 12-14px would not), and/or give each level a distinct **shape** in addition to its
  colour (filled circle / filled square / ring / smaller dot, one per level) so the four rows are
  told apart by silhouette as well as hue — redundant coding, which is also a real accessibility
  win independent of anyone's colour vision. Does not touch the tuned hue/saturation values at
  all, so none of the documented cross-family gaps are at risk.

**Not implemented yet.** This is a real design fork (A changes what a colour means depending on
context; B doesn't), so it's flagged here rather than picked unilaterally — see the question
asked alongside this note.

## Issue 2 — the scope panel clips instead of collapsing

**What the code actually does today.** The sidebar panel's own style
(`src/App.tsx`, the `PanelShell`-adjacent style block around line 1036-1041) sets:

```
maxHeight: 'calc(100vh - 36px)',
overflow: 'hidden',
```

`overflow: hidden`, not `auto` — so this is not merely "needs a scrollbar," it is content that is
**fully clipped and currently unreachable** past the viewport edge, exactly matching what the
screenshot shows (South Asia & Oceania's row sitting right at the bottom edge, with whatever
comes after it simply gone). And `SCOPE_GROUPS.map` (`App.tsx` ~line 827-880) always renders
every present jurisdiction level under every country/continent group with no collapse state at
all — nine families × up to six levels each is 40+ rows before any single one is opened.

**Proposed fix, lower-ambiguity than Issue 1 — worth implementing directly.** Give each
`SCOPE_GROUPS` entry a collapsed/expanded boolean, default **collapsed** (group header + total
count only, no child rows), with:

- clicking the header toggles expand/collapse, independent of the existing on/off filter click
  behaviour it already carries (the header currently does double duty as a toggle-all-in-group
  control — expand/collapse needs to be a visually separate affordance, e.g. a chevron, so the
  two clicks don't collide),
- a group auto-expands when any of its own scopes is the active filter, so selecting Canada's
  provincial level from search or a click elsewhere doesn't leave it hidden inside a collapsed
  header,
- multiple groups can be open at once (not a strict accordion) — closing one when another opens
  would fight the "some scopes" multi-select the panel already supports.

This does not touch `palette.ts` and carries none of Issue 1's colour-semantics risk, so it is
safe to build ahead of a decision on Issue 1.

## Where this fits

Renderer/UI, not corpus data — does not conflict with the AF branch's country-research work
(currently at G.6, Tanzania, run in the same session as this note but a separate concern) or with
any other agent working the data side in parallel. `planning/BACKLOG.md` is the normal home for
"what to add next" on the renderer; this note exists as the fuller writeup that a `BACKLOG.md`
line would otherwise need to summarise from scratch, and should be folded in there (or linked) on
review rather than left as an orphan file.
