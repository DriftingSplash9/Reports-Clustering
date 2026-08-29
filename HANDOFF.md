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

**Corpus: 3,468 reports · 2,857 dependencies.** `npm run validate` clean
(120/120), `tsc --noEmit` clean, `npm run build` clean (1,499.49 kB).

Six data rounds across 2026-08-28/29 (two with same-day Grok follow-ups)
and four renderer fixes. Zero-domestic-edge countries went 102 → 77 on
08-28; unlinked-node count (sharper metric) went 1,251 → 1,194 → 1,151
across two rounds (ID/TW/PH/MX on 08-28, JP/KR/SA/TR on 08-29 — 44 edges,
0 new nodes) plus a same-day Grok follow-up closing 6 more (JP nuclear
cluster ×3 + e-Stat, KR Basel appendix, TR health/ICD-10; TR industrial-
production/ISIC declined on evidentiary-structure grounds — a real but
missing-node NACE Rev.2 hop, flagged below). Detail in project memory: `eu_national_chains_2026-08-28`,
`candidates_tier_wiring_2026-08-28`, `eu_government_finance_2026-08-28`,
`unlinked_nodes_wiring_round1_2026-08-28` (69 edges + 3 nodes, ID/TW/PH/MX),
`unlinked_nodes_wiring_round2_2026-08-29` (44 edges, JP/KR/SA/TR),
`renderer_forces_2026-08-28` (now covers
all four renderer fixes. Cluster-repulsion range change, 0-3 → 0-10 — Thomas
called the old range "weak and ineffective" live; a full-system
remeasurement found the force itself was fine, the range was just too
narrow to reach a felt effect. Unverified live yet — check the new range
before trusting this note over your own eyes. Soft-edge visibility fix —
Thomas: "these are just invisible... really hard to find"; Fresnel
`uSoftPower` 1.1→0.5 plus a new emissive-only breathing pulse on continuous
leaf nodes (`CONTINUOUS_PULSE_FLOOR`, no scale change). Pixel-measured live:
fade band now spans ~15-18px on screen (was sub-pixel at the old power),
and node brightness at the pixel level rises measurably over a 3s window,
confirming the pulse animates. Thomas hasn't laid eyes on it yet — his call
whether it reads right).

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
- **1,144 of 3,468 nodes (33%) have no edge at all**, down from 1,251 on
  2026-08-27 via two rounds plus a same-day Grok follow-up (ID/TW/PH/MX,
  then JP/KR/SA/TR). Worst now: ID 90/118, TW 80/108, PH 43/70, VN 39/48,
  MX 33/101, IR 32/34, KR 16/52, JP 15/63, TR 11/34, SA 3/16. Sharper target
  than the zero-domestic-edge count. Only Afghanistan is left untouched
  from the original candidates-only tier — see `unlinked_nodes_cleared.md`
  before scoping the next batch (also lists Yemen/Syria as confirmed dead
  ends, do not re-attempt).
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
3. **Look at the soft-edge treatment on a continuous node, now changed —
   say if it reads right.** Your verdict was "these are just invisible at a
   distance or in a busy graph... really hard to find," plus a genuine
   "what's the difference between a soft edge and a normal edge?" —
   diagnosis: at typical on-screen node size the old Fresnel power (1.1)
   confined the fade to a sub-pixel-scale band, so it was never a busy-scene
   perception problem, it was geometrically invisible. Shipped: `uSoftPower`
   1.1→0.5 (fade now measured ~15-18px wide on screen, pixel-checked live),
   plus a gentle emissive-only breathing pulse on continuous leaf nodes
   (reuses the orb-breath period/curve, milder floor, deliberately **no**
   scale term — scale is the authority/size channel, this must not touch
   it). Pixel-checked live that both changes are actually happening on
   screen; not yet judged for whether it *reads right* — that's yours.
   Concrete example: search "Federal Competitiveness and Statistics Centre"
   (id `ae-fcsc`, UAE) or "TurkStat institutional core" (id `tr-turkstat`,
   used for the pixel check). 39 nodes carry this flag corpus-wide.
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
6. **Unlinked-node wiring, round 3.** Only **Afghanistan** left in the
   original candidates-only tier — after that, re-pick from the worst list
   above (ID/TW/PH/MX/VN are the deepest pools left). Method: parallel
   per-country subagents (see `unlinked_nodes_wiring_round2_2026-08-29`
   memory), then a central integrity pass (id/relationship_type/duplicate/
   part_of + spot-fetch quotes yourself — round 2's subagents twice used
   `source`/`target` instead of `source_report_id`/`target_report_id`,
   caught only by the integrity script). The 08-29 Grok follow-up closed
   6/7 leads, raw-verified. Mexico's 08-28 Benito Juárez leads and Saudi
   PIF (`sa-pif -> sa-national-accounts`, blocked twice now) remain open.
7. **Modelling decision needed: NACE Rev.2 has no node** (same shape as
   the generic-COICOP question above). Türkiye's industrial-production
   index documents NACE Rev.2; NACE Rev.2 is itself documented (Eurostat's
   manual) as ISIC-derived — but no NACE node exists to honestly carry the
   two-hop chain, so `tr-industrial-production -> isic` was declined, not
   minted (see its `_dropped`). Will recur for other NACE-citing countries.
   Fix: mint a generic `nace-rev2` node (`anzsic`-style, source already
   found) or accept these countries can't get a direct ISIC edge.

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
