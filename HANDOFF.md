# HANDOFF — working document

**This is the current handoff. There is exactly one, at the top level.**
This file holds *state only* — what's landed, what's live, what's next.
Standing rules, known traps, and architecture now live in `PLAYBOOK.md`
(that file rarely changes; this one does, every turn).

Last updated: **2026-08-25**

---

## 1. Read next

`PLAYBOOK.md` (rules/traps/architecture), then task-specific notes it
routes you to. `REPORTS.md` for the design doc. `git` status: unknown to
agents by design — see PLAYBOOK.md rule 1, don't state it.

---

## 2. Current state

**Live corpus: 3,385 reports · 2,596 dependencies.** `npm run validate`
clean (120/120), `tsc --noEmit` clean, `npm run build` clean at 1,493 kB —
re-verified this session in a fresh sandbox after the code change below,
same numbers.

**Glow is gone (Thomas, 2026-08-25: "the glow slider works but I think the
glow is pointless and should be taken off").** Not just defaulted off —
removed. Bloom is hardcoded to `intensity={0}` in `App.tsx`; the `Glow`
slider is gone from `ViewControls.tsx` and the "View controls" panel hint in
`MenuBar.tsx`; `glow` is gone from `ViewSettings`/`DEFAULT_VIEW` in
`view.ts`; `BLOOM_THRESHOLD_MIN`/`MAX` deleted (nothing reads a threshold
any more). The `<EffectComposer>` stays mounted — `PngExport.tsx` needs the
pipeline shape unchanged, see the comment at its call site — it just never
bleeds light now. `glowInk`/`GLOW_REFERENCE_Y` in `palette.ts` are
unrelated (authority-linked self-lit fill, not this halo) and are untouched.

The Grok research queue (`notes/grok-research-queue-2026-08-22/`) is fully
worked — nothing queued there. Next research work needs a new Grok round
scoped from scratch.

Two candidate fixes for the render-consistency/camera-fit bug are shipped in
`InfluenceGraph.tsx` (premature-stop reheat gate, frame-delta clamp +
visibilitychange refit). Thomas tried to force-trigger either failure mode
on his own machine and couldn't — same as this session's sandbox couldn't
(see Pass 4, `notes/render-consistency-repro-2026-08-25.md`). Since forcing
it doesn't look achievable by anyone, this is no longer a "confirm by
reproducing" item — see Todo #1.

18 of the 37 stale URLs in `notes/stale-urls-2026-08-20.md` (the Singapore
batch — singstat.gov.sg's site restructuring) are fixed this session,
raw-verified per page, applied to `sg-singapore-grok-2026-08.json`'s `url`
fields. Japan (7), Mexico (5), and 6 one-offs are still open.

Full narrative for anything above (BRICS G.1–G.4, Canada tier, wiring tier,
prompt 18, new-countries tier) is in `archive/Previous Handoffs/` — this
section only needs to say where things stand now, not how they got here.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Watch for the render-consistency symptom during ordinary use; flag it
   here if it recurs.** Downgraded from "reproduce and confirm" — neither
   you nor this session could force-trigger either failure mode on demand,
   so that was never going to be a clearable bar. The fix is shipped and
   reasoned through against the traced library source; this is now a
   "does it actually recur" watch, not a pending confirmation. Details:
   `notes/render-consistency-repro-2026-08-25.md`.
2. **`br-ibge-sistema-contas-nacionais` vs `br-scn`** — duplicate-node call.
   Same publisher (IBGE), same title, different ids from different research
   rounds; `br-scn` is wired, the other isn't. Note in `_dropped` block of
   `brics-g4-partial-2026-08-22.json`.
3. **`cn-stats-law`/`cn-stats-law-impl-regs` vs `cn-statistics-law`** —
   same shape as #2. Note in `_dropped` block of `brics-g4-2026-08-22.json`.
4. **`qc-perequation → isq-vitalite-economique`** — needs a human read of
   Quebec regulation F-2.1 r.11 s.5.1 directly. Filed `deferred` in
   `qc-quebec-grok-2026-08.json`.
5. **Three Andean direction conflicts** — read both citations side by side:
   `co-comercio-exterior` ↔ `co-bop`, `co-emmet` ↔ `co-ipi`,
   `ec-comercio-exterior` ↔ `ec-bop`. Corpus has each live in one direction
   from an earlier round; this round verified evidence for the opposite
   direction. Existing edge `caveat`'d, new claim `deferred`, in
   `andean-wiring-grok-2026-08.json`.
6. **`bo-bop → imf-bpm6` is contradicted by its own cited source** (Bolivia's
   central bank says BPM5) and no `imf-bpm5` node exists to redirect to —
   scope call on whether BPM5 is worth its own node. Filed `wrong-target` in
   `andean-wiring-grok-2026-08.json`.

### [Agent] — next build rounds

7. **"Why so few?" affordance** on group isolates — e.g. "Middle East → 6
   shown" is correct (cross-border gaps) but reads as a bug with no
   explanation on screen.
8. **Re-fold / "N countries opened" affordance** — currently only a full
   Reset re-folds an opened country.
9. **Typed edges** — what a trunk's "type" means when one line stands for
   many mixed relationships. Needs a design conversation first.
10. **Soft-edge node idea** — `notes/node-surface-encoding-2026-08-19.md`.
11. **New Grok research round** — the 2026-08-22 queue is fully worked;
    next round needs scoping from scratch.
12. **Stale-URL research remainder** — 19 of the original 37 in
    `notes/stale-urls-2026-08-20.md` are still open: Japan (7 reports,
    several ministries — one duplicate URL worth checking whether
    `jp-vital-statistics`/`jp-vital-statistics-detailed` should even be two
    reports), Mexico (5 reports, 3 of which point at one generic landing
    page — worth finding the specific programme pages), and 6 one-offs.
    (The file's own header says "37... genuine 404s" but the itemized list
    only ever summed to 36 even before Singapore's 18 were fixed — flagging
    the count mismatch, not resolved.) `notes/_all-corpus-ids-*.txt`/
    `_all-corpus-edges-*.txt` are id/edge cross-check lists — regenerate
    fresh before the next mint, don't reuse. The two housekeeping items
    previously listed here (tombstoned `src/data/slices.generated.ts`,
    orphaned `.rig-sweep` CSS rule) turned out to already be gone — checked
    this session, nothing left to do on either.

---

## 4. How to hand off

1. Edit **Current state** and **Todo** above directly — overwrite, don't
   append. This file describes the present, not history.
2. Delete finished items from Todo; don't leave them as "DONE" entries —
   that's what `archive/Previous Handoffs/` is for.
3. New standing rule or trap discovered? Add it to `PLAYBOOK.md`, not here.
4. Only copy this file to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   <topic>.md` before a structural rewrite — not on routine turns, since
   there's no more narrative here to lose.
5. Write the project-memory entry; if memory is down, park it in `notes/`
   and say so here.

Only one `HANDOFF.md` at the top level, ever.
