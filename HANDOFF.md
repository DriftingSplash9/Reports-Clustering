# HANDOFF — working document

**This is the current handoff. There is exactly one, at the top level.**
This file holds *state only* — what's live, what's blocked, what's next.
Standing rules, traps and architecture live in `PLAYBOOK.md`. Narrative
write-ups of finished rounds live in **project memory** (`project_memory_read`)
and, for the long form, in `archive/Previous Handoffs/`.

**Keep this file under ~10k characters.** It hit 39k on 2026-08-28 by
accumulating a paragraph per shipped change until it was a changelog, which is
exactly what §4 rule 2 forbids. Trimmed the same day (Thomas: "why are the
handoffs so long?"); the pre-trim copy is
`archive/Previous Handoffs/HANDOFF-2026-08-28-pre-trim.md`. If you find
yourself writing the story of a change here, it belongs in project memory.

Last updated: **2026-08-28**

---

## 1. Read next

`PLAYBOOK.md` (rules/traps/architecture), then the task-specific notes it
routes you to. `REPORTS.md` for the design doc. Project memory for what
previous rounds actually found. `git` status: unknown to agents by design —
PLAYBOOK rule 1, don't state it.

---

## 2. Current state

**Corpus: 3,465 reports · 2,735 dependencies.** `npm run validate` clean
(120/120), `tsc --noEmit` clean, `npm run build` clean (1,498.64 kB).

Four data rounds and three renderer fixes landed 2026-08-28. Zero-domestic-edge
countries went 102 → 77 over the day. Detail is in project memory:
`eu_national_chains_2026-08-28`, `candidates_tier_wiring_2026-08-28`,
`eu_government_finance_2026-08-28`, `renderer_forces_2026-08-28` (now covers
all three renderer fixes, including today's cluster-repulsion range change,
0-3 → 0-10 — Thomas called the old range "weak and ineffective" live; a
full-system remeasurement found the force itself was fine, the range was
just too narrow to reach a felt effect. Unverified live yet — check the new
range before trusting this note over your own eyes).

### Two decisions only Thomas can make

1. **Iran's SNA vintage.** `ir-national-accounts -> sna-2008` is live, but
   SCI's own current page says "regional accounts, just like national
   accounts, follow the latest revision of the system of national accounts
   SNA 93", and the UN Statistics Division's Iran record says 1993 too. Per
   PLAYBOOK rule 13 nothing was overridden: the live edge is caveated and
   **six SNA-93 edges are held** (national accounts + all five provincial
   GRDP nodes, which the same sentence covers).
2. **Generic COICOP.** Iran and Iraq both cite "COICOP" with no revision;
   the corpus has only `un-coicop-2018` and `un-coicop-hbs-1999`. Two edges
   held rather than guess an edition. Fix is a modelling choice — mint a
   revision-neutral `un-coicop` parent, or accept that generic citations
   can't be wired. **This will keep recurring**, so it's worth settling.

### Known-unresolved, flagged rather than fixed

- **`LinkDatum.stiffness` uses pre-trunk-collapse degree**, matching
  `hubRoom`; stock d3 uses the collapsed link array. In the folded view that
  makes ordinary links slightly softer than stock. Defensible, but it's a
  deliberate divergence someone should ratify.
- **1,251 of 3,465 nodes (36%) have no edge at all.** Worst: PH 61/68, ID
  105/118, TW 89/108, IR 32/34, VN 39/48, KR 32/52, MX 50/101, JP 30/63.
  This is a sharper target than the zero-domestic-edge count.
- **Auto-unfold is still dense.** The hub-drag fix improved it materially
  but did not solve it — see `renderer_forces_2026-08-28`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Watch for the render-consistency symptom in ordinary use**; flag here
   if it recurs. Neither of us could force-trigger it, so this is a watch,
   not a pending confirmation. `notes/render-consistency-repro-2026-08-25.md`.
2. **Cluster repulsion range raised 0-3 → 0-10 (default still 1), unverified
   live.** Your "weak and ineffective" verdict on the old 0-3 range sent
   this back for remeasurement — full production force set this time
   (charge + link included, not the isolated rig the first pass used), real
   corpus. The isolated rig had understated it: full-system, off→3 already
   more than doubles the inter-cluster separation ratio (4.29→8.62), cohesion
   flat throughout, stable to 30 in the sweep. So the mechanism wasn't
   broken — the old ceiling just never let you drag far enough to feel it.
   Try dragging to 6-10 this time. If it STILL looks weak up there, the
   numbers rule out "the force doesn't work" — look at camera auto-fit or
   raw node-count density instead. Detail: `renderer_forces_2026-08-28`
   memory, section 3.
3. **Look at the soft-edge treatment on a continuous node** and say if it
   reads right. Fresnel power fixed at 1.1; never pixel-verified. Concrete
   example to check: search "Federal Competitiveness and Statistics Centre"
   (id `ae-fcsc`, UAE) — it's `Report.continuous: true`, so instead of a
   hard edge it should fade out toward the silhouette (alpha only, no rim
   colour) rather than terminating in a crisp line like an ordinary node.
   35 nodes carry this flag corpus-wide if you want a second example.
4. **Re-authenticate the Claude desktop app?** — cloud file-staging started
   refusing with `session_stale_relogin` on 2026-08-28. Unclear if still
   broken: staging worked fine in today's session (9 files, no error). If
   you still see the error in ordinary use, it's a sign-in problem on your
   end that an agent can't fix remotely — try signing out/back into the
   desktop app. `device_bash` still works either way, so agents can keep
   reading/writing and typechecking on-device regardless.

### [Agent] — next build rounds

1. **EU government finance — 9 countries still have no node.** Cheapest
   first: **Malta** and **Bulgaria** are one fetch each (the releases exist;
   the last pass evidenced them from a homepage and a page title). Then
   **Lithuania** and **Spain** need a better page; **Estonia** needs a real
   EDP page (its news release has no EDP/ESA language — verified). **PT/RO/
   SI/CY** are blocked or empty — try finance ministries, not NSIs.
2. **Corpus wiring, 77 countries at zero domestic edges.** Named cheap
   retries: **Iraq's GDP/National Income metadata doc** on cosit.gov.iq
   (one fetch, settles the SNA vintage), **Vietnam's VSIC 2018 decision**,
   **Iraq's wage-bill clause** in Budget Law 13/2023 (the law is already
   reachable). **NESDC Thailand is closed negative — do not retry** without
   a new access route. Then the **31 single-node stubs** (`AG AL BA BZ CH CU
   FM HT KG KI LC LI MD ME MK NI NR PG PW RS SB TJ TM TO TV UA UZ VU WS XK`)
   — Ukraine, Switzerland, Serbia and the Western Balkans at one node each
   is the most conspicuous coverage gap left.
3. **Renderer, two named wins.** (a) `nodeGeometry()` allocates a
   `SphereGeometry` per node with **no caching** — 3,465 of them, where
   bucketing by rounded radius (as `teardropGeometry` already does) gives
   ~20. The visual review called this a free win at ~1,000 nodes. (b) Every
   node material is `transparent: true` **unconditionally**, so the whole
   graph renders in the sorted transparent pass; the review names this the
   likeliest cause of the node glitches. Catch: switching `transparent` on a
   live material forces a shader recompile, which is why it was set up front.
4. **Stale-URL remainder** — 19 of the original 37 in
   `notes/stale-urls-2026-08-20.md`: Japan (7), Mexico (5, three pointing at
   one generic landing page), 6 one-offs. The file's header says 37 but the
   itemised list only ever summed to 36 — count mismatch flagged, not
   resolved. Regenerate `notes/_all-corpus-ids-*.txt` fresh before any mint.
5. **New research round** — the 2026-08-22 Grok queue is fully worked; a new
   round needs scoping from scratch. The 2026-08-28 rounds were done without
   Grok, by parallel subagents, at Thomas's request.

---

## 4. How to hand off

1. Edit **Current state** and **Todo** above directly — overwrite, don't
   append. This file describes the present, not history.
2. Delete finished items; don't leave them as "DONE" entries. A finished
   round's story goes to **project memory**, not here.
3. New standing rule or trap? `PLAYBOOK.md`, not here.
4. Copy to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md` only
   before a structural rewrite, not on routine turns.
5. Write the project-memory entry as you go; if memory is down, park a note
   in `notes/` and say so here.
6. If this file is over ~10k characters, trim it before adding to it.

Only one `HANDOFF.md` at the top level, ever.
