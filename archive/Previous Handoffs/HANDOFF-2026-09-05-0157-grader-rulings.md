# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 (grader rulings round)

---

## 1. Read next

`PLAYBOOK.md` — whole, it is short now. Then, **routed by what you are doing**:

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

Corpus **3,343 reports / 2,632 dependencies**. **620 A · 1,335 B · 677 C**,
A-share **23.6%**. `npm run validate` exits 0, `tsc --noEmit` clean, 123/123
logic tests, grader selftest **51/51**, `public/corpus-data.json` regenerated.
**Grade counts come from `validate` only.**

**All five grader findings are applied and measured** — the A bar tests any
matched span, `namesTarget` has a whitespace-insensitive pass, the single-token
path reads Hangul and `title_aliases`, a whole title tolerates one interpolated
word, and **a PDF is now read TWICE and graded against both renderings**
(`pdftotext -layout` primary, pdf.js reading order in `Fetched.altText`;
Thomas, 2026-09-05, on the measurement that showed a straight swap was a wash).
45 grades written across two passes (13, then 32 of 34 — two already stood at
the better grade), one promotion refused with a reason, **nothing written down**;
the `token-pdf` mislabelling is fixed both places. **`pdfjs-dist` is pinned in
`devDependencies` — run `npm install` before the next grader run**; without it
the child process fails and the grader degrades to its old behaviour rather
than breaking.

**Uncommitted backlog** (carried forward from the previous handoff, never read
from git): the Basel III round, the transport round, the PLAYBOOK split,
browser-pass round 5, and now this round — `scripts/grade-evidence.ts`,
`package.json`, 28 `src/data/research/` slices, 34 `evidence-cache/` records,
`public/corpus-data.json`, one new `notes/` file, and ten
`Claude outputs/{rulings,both}-2026-09-05-*.json`. **Nothing in `src/` outside the
corpus, and no `scripts/` file except the grader, was modified** — `package.json`
gained one pinned devDependency. Scratch is in `tmp_work/sandbox-2026-09-04/`.

**Renderer unchanged** — grade-driven opacity, A-only ranking cut,
`rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift
watchdog + `__meshes`. **`view.minGrade` stays default `C`** (Thomas,
2026-09-04). Three reports ISOLATED and shelved:
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`,
`brics-johannesburg-ii-declaration-2023`.

**Research debt**: 0 no-URL, 0 dead-URL, 0 `empty:no-extractor`, 0
`network:curl-3`; 5 bare-homepage edges. **The browser pass is CLOSED.**

**The 2026-08-31 audit** is at `archive/audits/`: F-01, F-02, F-13 closed,
F-03 bounded, F-04 closed on its no-URL half. F-06 and F-14 open.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **Re-cites: 4 India + 1 Tanzania left, and two of them changed shape.**
   Himachal Pradesh is done (C→A). **Indian Railways is now a Chrome capture,
   not research** — the Year Book PDF path is known and written down in the
   round file; the index page answers the bridge VM, the `/uploads/` path
   refuses both machines. Odisha, Assam, Chhattisgarh, MoD were dead from both
   machines on 2026-09-05 — re-probe. All four state-survey edges point at
   `in-state-gsdp-series`, which passes the naming test at 4/5, so **an A is
   reachable for each**, as Himachal proved. Tanzania is a drop candidate, not
   a re-cite (Thomas 3).
2. **OCR one scanned PDF.** `ru-minfin-prikaz-128n-gfs-procedure -> imf-sdds`,
   200 / 864,760 bytes / 15 chars of text. Needs `rus.traineddata`; the VM has
   working network. Caps at B.
3. **Basel II is one fetch from a node.** SBV's Financial Soundness Indicators
   table (`sbv.gov.vn/en/web/sbv_portal/w/sbv606221`) cites Circulars 41/2016
   and 22/2019 with explicit "Applying Basel II"; the old drop was on the wrong
   target (`vn-npl`). Also one fetch: `tw-financial-stability`. No node without
   an edge; match `basel-iii`'s standalone shape.
4. **Companion-document reread, bounded** (Round C, = audit F-06): surviving
   `ess-peer-review-final-report` edges, round 5's 29 reverted quotes, the
   EDP-inventory fragments. Recount first; 58 circabc edges left, and a re-cite
   pass on that host clears most of item 5 too.
5. `_dropped` lead re-evaluation (plan §4 step 5).
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

### [Thomas] — only you can

1. **`gq-inege-anuario-2024 -> afristat-founding-treaty-1993` — I refused a
   promotion, tell me if that was wrong.** It graded A on "Contribuciones del
   Gobierno a AFRISTAT ─ ─ ─ 380 ─", a budget-table row naming the
   ORGANISATION, for a node that is the 1993 founding TREATY. Left at B. The
   general question behind it: the ≥4-character acronym rule cannot tell an
   institution from the instrument that created it.
2. **`tz-dar-es-salaam-city-council-budget-2026 -> tz-lgfa-cap290-service-levy`
   is a drop candidate** (rule 13, so not executed). Its own basis says the
   budget page "does not quote the Act by name/section — recorded as 'cites' on
   the strength of the shared revenue-category framework". Self-declared
   assertion-only.
3. **`in-railways-yearbook -> in-mospi-national-accounts-statistics` may be
   pointing the wrong way** — the basis describes railway statistics feeding
   National Accounts, which is the opposite of `uses_data_from`. Worth settling
   before someone captures the Year Book for it.
4. Housekeeping (agents cannot delete — rule 6): `_to_delete/` still holds
   `sweep-2026-09-04-basel-session/`, and `tmp_work/sandbox-2026-09-04/` has
   the zip junk named in §2.

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
