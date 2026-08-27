# Node surfaces — solid, blurred, bordered, banded (Thomas's sidebar, 2026-08-19)

Thomas, looking at the running Everything tier: *"what if there were spheres
that have blurred outer cores… we could have 3 types of nodes — solid,
blurred, bordered and/or bicolor-banded"* — and the question of what each
could MEAN beyond telling crowded nodes apart or marking nation vs state vs
municipal. Thought through against the data model and the in-code rules, so
the idea is on record with its constraints rather than lost.

## What the surface channel would join

Every encoding currently spent: hue = country family (or the lens's group),
chroma ramp = jurisdiction level, size = authority, glow = authority again,
hollow = one-off instrument, pulse rate = cadence, dim = out of focus.
Surface *finish* is genuinely free. But two candidate meanings are already
taken, and both were settled deliberately:

- **Not jurisdiction tier.** Tier shapes were built and deleted the same day
  (2026-08-12, round-5 Q14) and the chroma ramp already carries tier —
  a second encoding of the same field competes with the first (the review
  killed the gear glyphs on exactly this ground).
- **Not crowd disambiguation for its own sake.** That is what position,
  colour and the filter already do; a channel spent on "easier to tell
  apart" is a channel the next *fact* can't have.

## The honest candidate mappings

**Blurred / soft outer core — the strong one.** A sphere whose edge falls
off instead of terminating says *this thing has no discrete boundary* — and
the corpus has exactly that class: the ~35 continuously-updated databases
with no discrete release, the same nodes behind the beam-edge idea and the
`releases_per_year` overload (todo item 5). Soft node + solid lit beam
would make the continuous family read as one coherent statement: no
edition, no teardrop, just flow. Two cautions, both real:

1. Blur is also what DISTANCE looks like — depth-of-field is a depth cue,
   and the haze slider already trades on it. A soft node must stay clearly
   softer than anything haze produces, or far nodes read as continuous.
2. Implementation should be the fresnel trick inverted (alpha falling at
   the silhouette, inside the existing shader), NOT a post-process blur —
   cheap, per-node, and it survives orbit the way the hollow treatment
   does. No new geometry, so the no-faceted-geometry rule is untouched.

**Bordered — a crisp ring on a FILLED node.** Rims were just deleted from
the dark scene because they read as a wash, not a border; anything here has
to answer "why is this not the old rim". A genuinely crisp thin band is a
different mark than the fresnel wash — but at 8px it collapses into the
same thing. If it earns its place, the honest meanings are ones with no
channel at all today: `source_kind: commercial` (currently only a grey
fill), or dormant/halted series if those ever enter the corpus (the staged
archive found a dozen — Myanmar's CPI stopped Dec 2020 — and the current
rule keeps discontinued programmes out entirely). Parked until one of those
facts is actually in the graph.

**Bicolor-banded — the weak one.** A latitude band is texture, not
geometry, so it survives orbit better than the flat glyphs that died — but
the review cut the two-band idea once already ("two soft bands on one
sphere is exactly the muddying you objected to"), and below ~10–12px a band
is noise. The one fact it fits — dual/co-publication (a national office
publishing under an international framework) — is currently carried by
nothing, but it is also the rarest, and the edge evidence card (Phase 4)
may carry it better than the node surface can.

## Recommendation on record

One new surface state, not three: **soft-edge = continuously-updated
source**, built together with todo item 5 (give the 35 real
`releases_per_year` numbers) and the beam edge, so node, edge and cadence
all say the same thing. Bordered and banded stay parked until a fact in the
corpus needs them. Every mark on the sphere should answer a question the
data actually poses — solid/hollow already split "recurring vs one-off",
and soft/solid would split "continuous vs editioned", which is the one
distinction the renderer currently gets wrong.


## Resolved 2026-08-26

Thomas: "give the continuous nodes the beam and soft edges, forget the
bicolor and border treatments." Shipped as scoped in the recommendation
above — soft edge only, nothing else:

- **Soft edge built.** `nodeVisuals.ts`'s `nodeMaterial()` takes a new
  `soft` option — a second fresnel term (fixed power 1.1, independent of
  the rim's radius-scaled one) that fades alpha toward 0 at the silhouette
  instead of holding a hard edge. Wired in `InfluenceGraph.tsx` off
  `n.continuous === true`, same `!orb` guard as `hollow`. The one caution
  in the recommendation above — a soft node must read as clearly softer
  than distance haze, or far nodes look continuous by accident — is now
  moot: haze was removed the same session (see `HANDOFF.md`), so there is
  no competing blur left to confuse it with.
- **Beam edge — already built, nothing to do.** Turned out `linkVisuals.ts`
  already had the full beam-flow treatment (`gradientLinkMaterial`'s `beam`
  param, `LinkDatum.continuousSource`, `tickLinkFlow`) wired to real data
  since an earlier session; this round only added the node-side half.
- **Bordered and banded — dropped, not just parked.** Thomas's call, not a
  data-not-ready deferral like the original recommendation framed it.
  Nothing built for either; no `soft`-shaped future work here.
