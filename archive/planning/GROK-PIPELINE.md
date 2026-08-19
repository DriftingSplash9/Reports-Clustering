# Grok batch import pipeline — read this file fully before doing anything

You are a fresh session with no memory of prior runs. This file is your entire
briefing. It fires on a schedule (roughly hourly) via a Claude scheduled task,
processes ONE country from the raw Grok archive, writes the result to disk on
Thomas's machine, and stops. No one is watching this run live — do not ask
questions, make the most reasonable call and proceed, and say what you assumed
in your final summary.

## 0. First: can you even reach the machine?

Try `mcp__remote-devices__device_list_dir` on the project folder (path below).
If it errors because no device is connected, STOP immediately. Do not retry,
do not do the work in the cloud workspace instead — the whole point is that
this lands on Thomas's disk. Just end your turn; nothing needs to be written
anywhere, this run simply didn't happen. Do not treat this as a failure to
report loudly — it's expected on hours the desktop app is closed.

Project folder (device path):
`C:\Users\thoma\Desktop\My Files\Reports Clustering`

## 1. Read the state file

Read `grok-import-progress.md` in the project root (via
`mcp__remote-devices__device_list_dir` / read it through `device_bash cat`).
It lists every country, its status (`queued` / `done` / `skipped`), and a
one-line note per completed run. Find the first `queued` country in list
order. That's your job this run. If everything is `done` or `skipped`,
stop and say so — nothing left to do.

## 2. Read the schema — don't trust a summary, read the real files

Via the device bridge, read these three files fresh, every run, in full:

- `src/lib/types.ts` — the actual schema. `Report` and `Dependency` are the
  only two entities. A Report is one of exactly two shapes: a recurring
  publication (`releases_per_year` set to a real number) or a one-off
  foundational instrument (that key OMITTED entirely — never `null`).
- `src/lib/graph.ts` — search for `RELATIONSHIP_TYPES` and the `validate()`
  function. `relationship_type` on a Dependency must be one of exactly
  `calculated_from | uses_data_from | methodology_depends_on | cites` — an
  unrecognized value poisons every PageRank-derived score with NaN, so this
  one is a hard gate, not a style preference.
- `src/lib/palette.ts` — `COUNTRY_FAMILY` map. Every `country` code you use
  must have an entry here or the node renders flat grey and the validator
  errors. If this country's code isn't in the map, add an entry before
  finishing (see countries already filed under `ASIA` — RU, AE — for the
  precedent of using a reserved catch-all family when no dedicated one
  exists yet; use your judgment on which existing family fits best, and
  say what you picked and why in your commit).

## 3. Read the raw batch(es) for this country

They live in `grok-batches/raw/` in the project folder, named like
`2026-08-13_Argentina-batch3-gba.json`. Read every batch file for the
country you're processing. Some early batches across this archive have
syntax errors (unquoted values where a number was expected) — if a file
doesn't parse as JSON, treat it as discarded and note that in your commit
message; don't hand-patch guessed values into it.

## 4. Apply the full v2 data spec

This is the complete spec Grok itself has been given for producing this
data. Apply the SAME bar when converting/merging raw batches into a slice
— you are doing the job the spec describes, just reading raw batches
instead of writing them from scratch.

<spec>

# Data spec v2 — read before producing any JSON

This supersedes the earlier version. Everything below reflects what actually went wrong across three countries' worth of batches (Colombia, Argentina, UAE) that were checked against the real project schema and against primary sources. Read the whole thing — several rules exist specifically because a prior batch violated them in a way that cost real rework.

## 0. Your output must be valid JSON. No exceptions.

Three early UAE batches used unquoted descriptive strings where a number was expected — e.g. `"releases_per_year": continuous,` instead of a real value or an omitted key. That's not a schema violation, it's a syntax error: the file doesn't parse at all, and nothing downstream can even read it far enough to find your other mistakes. Before finalizing a batch, mentally (or actually) parse it as JSON. If a value isn't a clean number, string, `true`/`false`, `null`-as-a-literal-JSON-null, or omitted, it's wrong.

## 1. Container shape

```json
{
  "meta": { "date": "YYYY-MM-DD", "actor": "Grok", "scope": "one-line description" },
  "reports": [ /* Report objects */ ],
  "dependencies": [ /* Dependency objects */ ],
  "_dropped": [ /* DroppedNote objects — searched for and NOT found */ ]
}
```

Only these keys. Not `candidates`, not `proposed_edges`, not `dropped_or_rejected`. This has been stated before and still slipped in later batches when a session reset — if you're not sure which format you're in, use this one.

## 2. Report (a "node")

```json
{
  "id": "co-ipc",
  "title": "string",
  "publisher": "string — the institution name, plain text, NOT a separate node",
  "country": "ISO-3166 alpha-2, e.g. 'CO'. Use 'INT' only for bodies belonging to no country (IMF, BIS, ILO).",
  "jurisdiction_level": "one of: international | supranational | federal | provincial | municipal | institutional",
  "region": "human-readable, e.g. 'Colombia' or 'Colombia — Chocó'",
  "description": "string",
  "releases_per_year": 12,
  "domains": ["inflation"],
  "url": "string — a real, working URL you actually found"
}
```

### 2a. A node is ONE OF TWO SHAPES. No third shape exists.

Either (a) a recurring publication — set `releases_per_year` to a real number (fractional below 1 is fine) — or (b) a one-off foundational instrument: a treaty, a law, a signed agreement, a specific dated event with a document behind it. If it's shape (b), OMIT `releases_per_year` entirely. Never write `"releases_per_year": null` — omitted and `null` are different things in this schema, and omitted is the only correct way to say "no cadence."

### 2b. THE THING THAT WENT WRONG MOST IN THE UAE BATCHES: no "framing" nodes.

A node titled `"X framing"`, `"Y framing"`, or described as "system-level framing of..." / "binds A, B and C together" is not a node. It's not shape (a) — no `releases_per_year`, no cadence, because there's nothing being published. It's not shape (b) either — there's no specific instrument, no signed document, no dated event. It's just a summary you wrote connecting other nodes, invented because you ran out of actual new material and wanted the batch to look substantive. Nine of these appeared across UAE batches 6–9, all had to be stripped out.

**The correct move when you've covered a topic's real recurring products and there's nothing left to add: stop, or say so explicitly.** Write `"meta": {"scope": "... — no further nodes identified this batch, see note"}` and explain why in a note, rather than manufacturing a synthesis node to pad the count. A short honest batch beats a padded one — every framing node has to be found and deleted by hand downstream.

The same applies to "meta-nodes" from an earlier convention (`"ae-batch1-meta"`, binding a whole batch together) — also not a real node, also gets deleted. Don't reintroduce this pattern under a new name.

### 2c. Do not create a node for an institution/office by itself.

No "DANE — institutional identity" node, no "Dirección Provincial de Estadística de Buenos Aires" node, no "IDECBA" node. The institution is just the `publisher` string on every report it puts out. This has been stated before and still happened repeatedly — six provincial statistical-office nodes in one Argentina batch alone. `jurisdiction_level: "institutional"` exists in the schema, but it is NOT a green light to make offices into nodes by default — it's for the rare case where an institution itself has a genuine, specific, sourced product (e.g. a sovereign wealth fund's own disclosed AUM figures, which is data, not just "this office exists"). If you're not sure, don't — flag it as a question instead.

### 2d. Instrument nodes need a real document, not just a plausible-sounding name.

Real examples that worked: Ley 17.622 (Argentina's INDEC-founding law, verbatim quotes pulled from infoleg.gob.ar), the Treaty of Asunción (Mercosur), the GCC's Unified Economic Agreement, OPEC's Declaration of Cooperation. Each of these has an actual text you can point to. If you're proposing an instrument node and can't find the actual document — a real URL with real text, not a Wikipedia summary of the idea — it's not ready yet. Put it in `_dropped` as `no-node-yet` instead of minting the node anyway.

### 2e. Numeric claims: pull the exact figure from a real source, don't estimate or round to something plausible.

Two concrete misses: a renewable-energy target reported as "23 GW by 2031" when every source found said 22 GW — nobody knows where 23 came from. A banking-sector total-assets figure of "AED 5.5 trillion" when the actual reported range across 2025 was AED 4–5 trillion, peaking around AED 4.97tn — the number doesn't match anything found. Neither of these is a huge factual scandal, but both are the kind of small, confident, wrong number that erodes trust in everything else in the batch. If you're not looking directly at the source document while writing a number down, don't write the number down — describe it qualitatively instead ("in the low-to-mid single-digit AED trillions") or flag it as needing a source pull.

## 3. Domains — closed list, use `proposed:` for anything else

```
inflation, labour, monetary-policy, national-accounts, benefits, interest-rates,
municipal-finance, education, post-secondary, health, fiscal-transfers, population,
taxation, assessment, energy-royalties, banking, financial-regulation, construction,
insurance, research-innovation, agriculture, external-action
```

If a report doesn't genuinely fit any of these, prefix a new one with `proposed:` — e.g. `"proposed:trade"`, `"proposed:energy"`. Mix freely with approved tags. This part worked well in the later UAE batches (zero raw-invalid tags) — keep doing exactly this.

## 4. Dependency (an "edge")

```json
{
  "source_report_id": "id of the dependent report",
  "target_report_id": "id of the report it depends on",
  "relationship_type": "one of: calculated_from | uses_data_from | methodology_depends_on | cites",
  "basis": "why this edge exists — an actual quote or close paraphrase from a real document",
  "evidence_url": "the document that states it"
}
```

`relationship_type` has exactly these 4 values — no `part_of` (that's a field on the Report, see below), no `produced_by`, `contains`, or `complements`.

### 4a. The evidence bar, and a real problem in both directions.

Across Colombia and Argentina, basis text was consistently a paraphrase-of-the-relationship rather than an actual quote — technically plausible, never sourced. Across UAE, the correction over-fired: **zero edges were proposed across seven straight batches.** Every single candidate relationship got dropped to `_dropped` as `no-document` rather than pursued further.

Neither extreme is right. The fix isn't "never propose an edge unless you have a perfect quote" — it's "look harder before giving up." A methodology PDF, an "About this release" page, an official press release describing what a report covers — these often do state the dependency directly if you read past the headline page. Real examples that were findable with one more search: the Ministry of Finance's own page stating UAE-GCC trade tracks Customs Union completion; INDEC publishing balance-of-payments and external-debt data in the literal same report. If you drop an edge to `_dropped` with `no-document`, that should mean you tried a specific follow-up search for the relationship and came up empty — not that you didn't look past the first source.

## 5. `part_of` — containment goes on the node, never as an edge

If a report is published *inside* another (a series that's a component of a bigger release, an agglomeration inside a metro region, a province inside a federation), that's `"part_of": "id-of-container"` on the child Report — not a dependency edge. `part_of` edges keep appearing (18 of them in one Argentina batch) despite this being stated clearly before. A dependency edge between a node and its own container is invalid.

## 6. `_dropped` — the honest-failure log

```json
{
  "edge": "co-x -> co-y (human readable, never parsed)",
  "source": "co-x or null if the dependent thing isn't itself a node",
  "target": "co-y or null if nothing to point at yet",
  "reason": "one of: denied | no-document | wrong-target | wrong-direction | unpublishable-source | unreadable-source | no-node-yet | deferred | note",
  "why": "the actual reasoning — never abbreviated"
}
```

`no-document` is a good, expected outcome when you genuinely tried and found nothing — it is not a failure and it's the honest alternative to inventing a paraphrase-basis edge. `no-node-yet` / `deferred` are real leads for a future round. Use `note` for something worth recording that isn't a dropped edge at all (e.g., explaining why you deliberately didn't create a node).

## 7. Cross-batch discipline

- Don't reintroduce an id from an earlier batch with different content unless you're explicitly redoing/superseding it — say so in `meta.scope` if you are (e.g. "redoing batch 2's oil-production node under the new spec"). A silent duplicate ID is a collision downstream.
- Before minting a new node, consider whether it's actually a specific product/instrument versus a restatement of something you already have — check your own prior batches for the same ground.
- If you're picking up mid-country after a break, say in `meta.scope` what's already covered and what this batch is adding, so gaps and overlaps are visible on read rather than requiring a diff.

## 8. General

- Every `evidence_url` needs to be a real, working link you actually found — not a plausible-looking guess.
- `country` needs a real, working `COUNTRY_FAMILY` palette entry to render at all — flag a new country in your `meta` so it doesn't get missed on merge.
- When in doubt about any of the above, write the question into a `note` in `_dropped` rather than making the closest-sounding guess. A flagged uncertainty is useful; a confident wrong answer costs a full research round to catch.

</spec>

## 5. What "processing a country" means, concretely

1. Read every raw batch for the country.
2. For each candidate report: check it's really one of the two valid
   shapes (2a), not a framing/synthesis node (2b), not an institution
   node (2c), and that instrument nodes have a real document behind them
   (2d). Drop anything that fails these checks — do NOT silently keep it.
3. For each candidate dependency: check `relationship_type` is one of the
   4 valid values, `basis` is genuinely evidence-grade (a real quote/close
   paraphrase from a real, checkable document, not a generic assertion).
   If a batch already includes `_dropped` entries, keep the honest ones.
4. Spot-check the 3-5 most surprising/headline factual claims against a
   real source via WebSearch/WebFetch (both are available in this cloud
   session normally — no network restriction on search/fetch, only on
   git push). Note what you checked and what you found either way in the
   commit message, including anything you could NOT confirm — don't imply
   full verification if you only sampled.
5. Do one round of gap-research: is there an obvious, well-known statistic
   or institution for this country that neither Grok's batches nor your
   reading turned up? If you find something concrete and sourceable, add
   it. If not, don't manufacture something just to look thorough.
6. Assemble the result into `src/data/research/<cc>-national-core.json`
   (lowercase ISO-3166 alpha-2 country code) shaped as:
   `{ "meta": {...}, "reports": [...], "dependencies": [...], "_dropped": [...] }`
7. If the country's code isn't yet in `COUNTRY_FAMILY` (step 2), add it.

## 6. Write it to disk — do NOT touch git

Write the finished JSON file directly to
`src/data/research/<cc>-national-core.json` on the device (via
`device_bash` heredoc, or SendUserFile + device_commit_files for larger
files). Edit `palette.ts` in place if you added a country entry.

**Do not run any `git` command — not `add`, not `commit`, not `checkout`,
nothing.** This was tried and it's unsafe for unattended runs:
`device_bash` cannot delete files, and git needs to delete/replace files
for `checkout` and for cleaning up its own lock files after a failed
operation. One bad `git` command leaves `.git/index.lock` (or
`HEAD.lock`) behind permanently, which then blocks every subsequent git
command — including next hour's run — until someone manually moves the
lock file out of `.git/`. A silently bricked pipeline is worse than no
git history at all.

Just leave the new/changed files as plain uncommitted changes in the
working tree. That's fine — `git status`/`git diff` already shows Thomas
exactly what this run touched, and he commits (and pushes) at his own
pace when he reviews it. Never invoke git for any reason in this
pipeline, full stop.

## 7. Update the state file

Rewrite `grok-import-progress.md`: mark this country `done`, and add a
one-line note — reports count, dependency count, anything dropped/notable,
anything you flagged as unconfirmed. Just write the file directly, same
as step 6 — no git commands.

## 8. End your turn

Don't wait for review, don't ask questions. State plainly in your final
message what you did (or that you skipped because the device wasn't
reachable, or that the queue is empty). That message is the only trail
Thomas sees from this run — make it count, but keep it to a few sentences.
