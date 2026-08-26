# HANDOFF — working document

**This is the current handoff. There is exactly one, at the top level.**
This file holds *state only* — what's landed, what's live, what's next.
Standing rules, known traps, and architecture now live in `PLAYBOOK.md`
(that file rarely changes; this one does, every turn).

Last updated: **2026-08-26**

---

## 1. Read next

`PLAYBOOK.md` (rules/traps/architecture), then task-specific notes it
routes you to. `REPORTS.md` for the design doc. `git` status: unknown to
agents by design — see PLAYBOOK.md rule 1, don't state it.

---

## 2. Current state

**Live corpus: 3,384 reports · 2,597 dependencies.** `npm run validate`
clean (120/120), `tsc --noEmit` clean, `npm run build` clean (1,498.00 kB) —
re-verified in a fresh sandbox after the data edits below, then pushed to
the device and confirmed byte-identical (sha256) across all five touched
files.

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

**Re-fold affordance shipped (old Todo item 8).** An opened country could
only be folded back by a full Reset — now the dock shows an "Opened — N"
pill (bottom-centre, next to Legend) whenever `openedCountries` is
non-empty; it expands into a list with a per-country "Fold" button plus a
"Fold all" footer action. New `foldCountry` in `hierarchy.ts` (removes one
country; `toggleCountryOpen`'s own double-click gesture is untouched and
still only ever adds — see both functions' comments for why an explicit
named-row button doesn't reintroduce the "same gesture, different meaning"
bug that killed the old design). New `src/components/OpenedCountriesPanel.tsx`,
same collapsed-pill/outside-click/Escape pattern as `Legend`/`GroupsPanel`.
Verified: `tsc`/`npm run validate`(120/120)/`npm run build` clean (bundle
1,496.9 kB, +3.4 kB for the new component); a headless Playwright pass
against `vite preview` opened a real country by double-clicking its orb,
confirmed the pill and its list render, clicked "Fold", and confirmed the
country actually re-folded (node count back to 473, pill gone).

**"Why so few?" affordance shipped (old Todo item 7).** A group isolate on a
sparsely-connected region — Middle East, or any thin single country — could
leave only a handful of real reports on screen with nothing on screen saying
why, which reads as a bug even when it's correct. `GroupsPanel`'s collapsed
pill now names the count (`Isolated: Middle East — 25 shown`) and, once
opened, a "Why so few?" note explains the two real causes: some of the
group's own countries are still a folded country-orb (`corb:`) rather than
opened, and/or some of its real reports have no documented cross-border ties
at all and sit in the Isolated shelf. New `groupWhySoFew` memo in `App.tsx`
(reads `disclosedGraph`/`isolated`, not `groupFocus`, since the question is
about the group's own membership); `GroupsPanel.tsx` takes three new optional
props (`shownCount`/`foldedCountries`/`shelvedCount`) so it still works
unchanged for any future caller that doesn't pass them. Verified: `tsc`/
`npm run validate`(120/120)/`npm run build` clean (bundle 1,498.00 kB, +1.14 kB);
a headless Playwright pass isolated Middle East (13 folded countries, 115
shelved reports — both numbers cross-checked against a standalone script over
the live corpus) and separately Bhutan (single-country phrasing: "Bhutan's
own reports are still folded... 2 reports here have no documented
cross-border ties"), confirming both the pill text and the note render
correctly and match the corpus.

**Two of Thomas's six 2026-08-26 data calls executed (items 2 and 6);
three surfaced back to him with new findings (items 3, 4, 5 — see Todo).**

*Item 2 — `br-scn`/`br-ibge-sistema-contas-nacionais` merged, per Thomas's
call to keep `br-ibge-sistema-contas-nacionais` canonical.* `br-scn`'s two
edges (`-> sna-2008`, and `br-cnt`'s inbound edge) retargeted onto
`br-ibge-sistema-contas-nacionais`; that node's description/url/cadence_note
upgraded with `br-scn`'s TIER-A-verified content (it was the thinner Grok
paraphrase, `br-scn` the raw-verified one); `br-scn` removed. Kept the more
heavily-wired id (19 edges vs. 2) as the survivor, so the merge also fixes
which node is actually the corpus's hub for this fact. Both `_dropped` flags
(`brics-g4-partial-2026-08-22.json`, `br-g2-pnadc-siconfi-scn.json`)
annotated RESOLVED rather than deleted.

*Item 6 — `bo-bop -> imf-bpm6` minted, per Thomas's explicit override
("assume it aught to say bpm6").* BCB's own methodology PDF names BPM5, not
BPM6, verbatim, and no `imf-bpm5` node exists to redirect to — this edge is
a directed assumption overriding the literal source text, not a raw-verified
citation, and the `basis` field says so plainly along with pointing at the
overridden quote in `andean-wiring-grok-2026-08.json`'s `_dropped` array.
Worth someone re-checking BCB's current manual edition someday.

*Items 3, 4, 5 — Thomas's stated calls turned out to rest on incomplete
framings once checked, so nothing was executed; see Todo for the surfaced
findings and the decisions actually needed now.* Item 3 in particular: his
"keep `cn-stats-law-impl-regs`" call was based on this session's own earlier
"same shape as item 2" framing, which turned out to be wrong —
`cn-stats-law-impl-regs` is a different document (2017 implementing
regulations), not a duplicate. Flagging that rather than executing it
blind seemed like the right call given what retiring the base law would
have meant.

Sandbox cycle: `npm run gen` (296 slices) → `npm run validate` (0 dangling
notes, clean) → `tsc --noEmit` clean → `npm run build` clean. Pushed to
device via an idempotent Python script (same one run in both places);
sha256 of all five touched files confirmed byte-identical
(`br-brazil-grok-2026-08.json`, `brics-g4-partial-2026-08-22.json`,
`br-g2-pnadc-siconfi-scn.json`, `bo-national-core.json`,
`andean-wiring-grok-2026-08.json`) — one mismatch found and fixed along the
way (a stray `why`/`note` key-name inconsistency introduced by a manual
sandbox patch, harmless to validate but worth keeping the two copies
identical anyway).

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
2. **`cn-stats-law`/`cn-stats-law-impl-regs` vs `cn-statistics-law`** — NOT
   the same shape as the (now-resolved) br-scn/br-ibge case it was compared
   to. `cn-stats-law` and `cn-statistics-law` are true duplicates of the
   same base Statistics Law; `cn-stats-law-impl-regs` is a genuinely
   *different* document — the 2017 implementing regulations issued under
   that law, not another copy of it. Flagged back to Thomas 2026-08-26
   (his "keep cn-stats-law-impl-regs" call was made on the original,
   oversimplified 3-way-duplicate framing); needs a fresh call now that the
   base-law/regulations distinction is on the table — e.g. keep
   `cn-statistics-law` as the canonical base-law node, retire `cn-stats-law`
   as its duplicate, and keep `cn-stats-law-impl-regs` as its own separate
   node rather than retiring it. Note in `_dropped` block of
   `brics-g4-2026-08-22.json`.
3. **`qc-perequation → isq-vitalite-economique`** — Article 5.1's quote
   verified accurate verbatim against LegisQuébec 2026-08-26. But the
   provision names the *index*, not ISQ by name — the same evidentiary gap
   the corpus's own precedent (the sibling `qc-partage-croissance-tvq` edge)
   already treats as insufficient on its own, minted there only because a
   *different* provision names ISQ explicitly. Thomas's call: mint anyway
   (treating "index" as an unambiguous reference to ISQ's one product) or
   hold pending a citation that names the publisher. Filed `deferred` in
   `qc-quebec-grok-2026-08.json`.
4. **Three Andean direction conflicts** — side-by-side citations presented
   2026-08-26; needs Thomas's direction call for each:
   `co-comercio-exterior` ↔ `co-bop`, `co-emmet` ↔ `co-ipi`,
   `ec-comercio-exterior` ↔ `ec-bop`. Corpus has each live in one direction
   from an earlier round (thin, uncited basis text); this round verified
   evidence for the opposite direction (raw-quoted, evidence_url'd). Existing
   edge `caveat`'d, new claim `deferred`, in `andean-wiring-grok-2026-08.json`.

### [Agent] — next build rounds

5. **Typed edges** — what a trunk's "type" means when one line stands for
   many mixed relationships. Needs a design conversation first.
6. **Soft-edge node idea** — `notes/node-surface-encoding-2026-08-19.md`.
7. **New Grok research round** — the 2026-08-22 queue is fully worked;
    next round needs scoping from scratch.
8. **Stale-URL research remainder** — 19 of the original 37 in
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
