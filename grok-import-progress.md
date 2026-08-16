# Grok import — progress log

State file for the hourly Grok-batch import pipeline (see `GROK-PIPELINE.md`
in this same folder for the full instructions each run follows). Each row is
one country from the raw archive in `grok-batches/raw/`. A fresh session
picks the first `queued` row, does the work, flips it to `done`, and adds a
one-line note.

Two countries are pre-marked `done` because they were already fully
processed by hand earlier in this project, from the same or equivalent raw
material, before this pipeline existed — the archive's copies of their raw
batches are superseded, not reprocessed.

| Country | Code | Status | Note |
|---|---|---|---|
| Argentina | AR | done | Processed by hand pre-pipeline. 54 reports, 27 dependencies, 14 dropped. Live in `ar-national-core.json`. |
| United Arab Emirates | AE | done | Processed by hand pre-pipeline from a separate Grok session, not this archive's UAE batches. 34 reports, 10 dependencies, 6 dropped. Live in `ae-national-core.json`. Archive's `UAE-batch*.json` files are superseded — do not reprocess. |
| Bolivia | BO | done | Processed interactively (device-bridge automation isn't reaching scheduled sessions — see notes below). Raw batches were pre-spec legacy format (`candidates`/`proposed_edges` keys, invalid relationship types). 60 raw candidates → 37 kept reports, 23 dropped (4 institution nodes, 12 framing nodes, 4 real-but-unverifiable/unstable topics deferred incl. 2 court-suspended lithium contracts and an overstated MERCOSUR claim, plus cleanup). 51 raw edges → 21 kept dependencies, several direction/type corrections. 3 headline claims spot-verified. Live in `bo-national-core.json`. Also fixed a real bug found in passing: `AR` was missing from `COUNTRY_FAMILY` (Argentina nodes were rendering flat grey since that slice went live) and `AR`/`AE` were missing `COUNTRY_LABEL` entries — all fixed in `palette.ts`. |
| Chile | CL | queued | |
| Colombia | CO | queued | |
| Ecuador | EC | queued | |
| Guyana | GY | queued | |
| Paraguay | PY | queued | |
| Peru | PE | queued | |
| Suriname | SR | queued | |
| Uruguay | UY | queued | |
| Venezuela | VE | queued | |
| Mexico | MX | queued | |
| Japan | JP | queued | |
| South Korea | KR | queued | |
| Taiwan | TW | queued | |
| Indonesia | ID | queued | |
| Myanmar | MM | queued | |
| Philippines | PH | queued | |
| Thailand | TH | queued | |
| Vietnam | VN | queued | |
| Iran | IR | queued | |
| Iraq | IQ | queued | |
| Saudi Arabia | SA | queued | |
| Syria | SY | queued | |
| Turkey | TR | queued | |
| Yemen | YE | queued | |
| Afghanistan | AF | queued | Note: `AF` is already used elsewhere in this codebase as a prefix for an unrelated "Africa" municipal-finance dataset (`af-*.json` files, `af` = Africa there, not Afghanistan). Use a different id prefix for Afghanistan nodes to avoid collision — e.g. `afg-` — and flag this explicitly in the commit. |

## Notes for whoever's reading this later (Thomas, or a future run)

- Singapore is NOT in this table — it's being worked on live/interactively
  with Grok directly, outside this archive-driven pipeline. Don't touch it
  here.
- If a country's `_dropped` reasons all come back `no-document` with heavy
  reuse of the same wording, or if the raw batches are near-empty/low
  quality, still flip it to `done` (or `skipped` with a reason) rather than
  leaving it `queued` forever — a short honest slice is fine, see the v2
  spec's own guidance on this.
- If two consecutive runs both find "no device connected," that's fine and
  not a bug — the desktop app just wasn't open at those times.
- **2026-08-16: the hourly scheduled task is disabled.** Four straight fires
  (the real hourly trigger plus three manual test-fires, two of them sent
  seconds after confirming the device bridge worked fine in the live
  interactive session) all failed to reach the device — strong evidence that
  triggered/scheduled sessions don't get the device-bridge pairing at all,
  regardless of whether the desktop app is open. This isn't a "keep the app
  open" problem. Countries are being processed interactively instead for now.
  See if a direct-git-push-from-cloud route ever gets sorted out (blocked
  separately by sandbox git-proxy authorization as of 2026-08-15) before
  re-enabling the trigger.
