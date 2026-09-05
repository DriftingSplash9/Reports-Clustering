# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 (TN/Haryana re-cites, Wayback lookup fix, Grok retired)

---

## 1. Read next

`PLAYBOOK.md` §2, §6, §7 at minimum — the whole file is 40 KB and its §1
duplicates the table below (item 10). Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` §2 rules, §6 traps, §7 standing decisions |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` |
| "can I reach host X?" | `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this" |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| picking up a queued round | `notes/next-agent-prompt-2026-09-04.md` (rounds 2–4 stand) |

Then project memory, newest first. Git status: never state it (rule 1).

---

## 2. Current state

Corpus **3,344 reports / 2,633 dependencies**. **623 A · 1,337 B · 673 C**,
A-share 23.7%. `npm run validate` exits 0, 123/123 logic tests, grader selftest
**52/52**, `public/corpus-data.json` regenerated. **Grade counts come from
`validate` only.**

**Grok is retired** (Thomas, 2026-09-05). No prompts, no queue, no Grok todo
items; PLAYBOOK §5 and rule 9 are dead letter and go in the doc cleanup.
Existing `*-grok-2026-08.json` slices stay as data and grade like any other.

**Grader: Wayback is now asked WITHOUT the scheme** (`waybackLookupKey`,
2026-09-05). The `https://` form answered "no snapshot" for
`www.tn.gov.in/deptst/stateincome.pdf` while the scheme-less form found one, so
earlier "unreadable, no snapshot" verdicts may be wrong — see todo 2.

**Thomas's 2026-09-05 rulings are executed.** The five siblings carrying the
railways defect are **flipped** — `in-mospi-iip`, `in-mospi-hces`,
`in-rbi-balance-of-payments`, `in-mospi-asuse` and
`in-des-agricultural-statistics-at-a-glance` now run FROM
`in-mospi-national-accounts-statistics`, each basis carrying a DIRECTION
CORRECTED note, all still C — the arrow changed, not the evidence. And
**`WEAK_BASIS_PATTERNS` stays exactly as it is**: a basis can cap its own edge,
that is accepted, do not re-open it.

**`in-assam-economic-survey -> in-state-gsdp-series` re-cited C→B**, off the
dead index onto the survey PDF, read through the grader's snapshot strategy. **Cite the LIVE url** — a connection reset is
`block: 'network'`, which `snapshotRescuable` allows; citing the Wayback url
instead throws that machinery away.

**The four dead Indian hosts are DOWN, not walled.** `pc.odisha.gov.in`,
`des.assam.gov.in`, `descg.gov.in`, `www.mod.gov.in` and the
`finance.odisha.gov.in` mirror reset the bridge VM, the cloud sandbox AND
Thomas's own Chrome, with `mospi.gov.in` 200 in the same call — **Chrome is not
a third route for these**. What Wayback holds for each: project memory
`india_reprobe_2026-09-05`.

**Uncommitted backlog** (carried forward, never read from git): the Basel III
round, the transport round, the PLAYBOOK split, browser-pass round 5, the
grader rulings round, the rulings + Basel II round, and now this one —
`in-india-grok-2026-08.json`, `public/corpus-data.json`, three `evidence-cache/`
records, `scripts/grade-evidence.ts`, `notes/doc-bloat-2026-09-05.md`. Scratch: `tmp_work/sandbox-2026-09-04/`,
`-2026-09-05/`, `tmp_work/HANDOFF-backup-before-2026-09-05-edit.md`.

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`** (Thomas,
2026-09-04). Shelved ISOLATED: `sc-oag-annual-reports-2022-2024`,
`so-fgs-financial-governance-reports`, `brics-johannesburg-ii-declaration-2023`,
`tz-dar-es-salaam-city-council-budget-2026`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 4 bare-homepage edges. **The browser pass is CLOSED.**

**The 2026-08-31 audit** (`archive/audits/`): **F-06 and F-14 open**, the rest
closed or bounded.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **India state surveys — what is left.** Tamil Nadu sits at B until
   `www.tn.gov.in` answers (refuses both machines; snapshot cap). Maharashtra,
   Delhi and Uttarakhand reset 2026-09-05; Odisha, Chhattisgarh and MoD are
   closed for now (§2). **The railways edge grades off MoSPI's NAS *Sources and
   Methods* naming the Year Book, not off the Year Book itself.**
2. **Re-run the snapshot rescue over the C edges blocked `network`/`wall`.**
   The old lookup missed snapshots (§2); the negatives lived only in a scratch
   `.evidence-fulltext/wayback/`, so only a re-run can count the misses. Select
   with `--edges` on the C list, no `--write` first; snapshot reads cap at B.
3. **OCR one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure -> imf-sdds`,
   200 / 864,760 bytes / 15 chars of text. Needs `rus.traineddata`; the VM has
   working network. Caps at B.
4. **Decide `tz-dar-es-salaam-city-council-budget-2026`**, isolated by the
   2026-09-05 drop. DCC's budget-summary attachment sits behind a JS fetch never
   completed; a DCC document naming Cap. 290 mints the edge properly. One
   browser pass, or shelve it explicitly.
5. **Companion-document reread, bounded** (Round C, = audit F-06): surviving
   `ess-peer-review-final-report` edges, round 5's 29 reverted quotes, the
   EDP-inventory fragments. Recount first; 58 circabc edges left, and a re-cite
   pass on that host clears most of item 11 too.
6. DSBB/ESMS scripted import (readable API, already 50 corpus citations).
7. **Link batching — scoped by measurement.** Photons first (1,967 objects, 15
   materials → ~15 `InstancedMesh` draws), then links and nodes. Blocker: one
   material per object, so instancing means moving colour/opacity/grade/hover
   out of `GradientLinkMaterial` uniforms into per-instance attributes.
   Draw-call bound. Numbers: memory `renderer_perf_measured_2026-09-04`.
8. Cluster-repulsion sub-round (measured, `measure-forces.ts`, 2+ seeds), then
   **F-14** (gate the weighted-vs-raw disagreement list to an authority floor
   ~0.05 so it reads as a check again).
9. Doc hygiene: README:130, REPORTS:9–32, START-HERE:31/37 (its ranking
   sentence is F-07 and is now wrong in a NEW way — `brics-jsp` left the top
   ten); `notes/mint-2026-08-20.md`; retire `check-urls.ts` into the grader.
10. **Then the doc cleanup — `notes/doc-bloat-2026-09-05.md`, all five trims,
    Thomas approved 2026-09-05.** Do it AFTER you have moved items above, not
    instead of them. Measured: §1's reading list is **~220 KB** before the first
    memory topic file; the trims cut about 60%. REPORTS' 43.8 KB "Decisions"
    becomes a one-line index with the prose in `archive/decisions/`; REPORTS'
    "Legibility at scale" and "Still genuinely open" go — both written at 121
    nodes, and the second claims the graph has no orphans, which §2 contradicts
    (move anything still live into this todo in the same edit); PLAYBOOK §1's
    table goes, replaced by a pointer here, its two dead pointers are fixed, and
    **§5 (Grok pipeline) and rule 9 are removed outright — Grok is retired**; `next-agent-prompt-2026-09-03.md` retires and the
    -09-04 Standing block stops restating the rules a third time; and the **16
    orphan `notes/` files** listed in the review move to `_to_delete/`, each
    logged against the memory entry that supersedes it. Rule 6 throughout.
    Archive `REPORTS.md` and `PLAYBOOK.md` first, and re-measure afterwards so
    the number here is real.
11. `_dropped` lead re-evaluation (plan §4 step 5) — moved to last (Thomas,
    2026-09-05).

### [Thomas] — only you can

1. Housekeeping (agents cannot delete — rule 6): `tmp_work/sandbox-2026-09-05/`
   holds one staging tarball, `repo-src-2026-09-05.tgz`; `tmp_work/` also now
   holds `HANDOFF-backup-before-2026-09-05-edit.md`. All safe to remove.

---

## 4. How to hand off

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   HHMM-<topic>.md` (UTC date and time in the title, topic = what the
   superseded state was about). Verify the copy (`sha256sum` both).
   **Archive first, then rewrite** — there is no git safety net (PLAYBOOK
   rule 1); an un-archived overwrite destroys the previous state.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   Keep this §4 verbatim so the next agent knows the procedure.
4. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to `PLAYBOOK.md`. A design change goes to
   `notes/Midvamp - Revamp.md` (or `REPORTS.md` if it changes direction).
5. If §1–§3 are over ~7k characters, trim before adding to them.
6. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
