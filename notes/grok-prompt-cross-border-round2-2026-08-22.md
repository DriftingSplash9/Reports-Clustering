# Prompt for Grok — cross-border dependencies, round 2

Paste everything below the line, then attach `crossborderdepsconsolidated20260821.json`
(your own file from round 1) and, this time, real source files for Sudan,
Mauritius, and Sierra Leone if you have them — they were never attached last
time, which is why you skipped them.

---

Thanks for the first pass — genuinely useful, and the honesty on Iran,
Afghanistan, Yemen, and Syria (declining rather than inventing a shaky claim)
is exactly right.

Three things for round 2:

## 1. Three countries you never got

Sudan (SD), Mauritius (MU), and Sierra Leone (SL) don't appear in your
response at all — your own notes say you had no country file for them.
That's on us, not you. Please run the same research you did for the other
16 on these three: real, citable international statistical dependencies
(IMF SDDS/e-GDDS subscription, regional statistical bodies, SNA methodology
adoption, treaty-based reporting obligations, and so on). Same rule as
before: only a source you actually opened and can quote from. `null` with an
honest reason is a correct answer if there's nothing solid.

## 2. A second look at four thin countries

Iran, Afghanistan, Yemen, and Syria — you correctly declined to commit to an
edge for any of them last time, citing thin or outdated evidence. Before we
file that as final: is there anything on the IMF's own DSBB
(dsbb.imf.org) for these four specifically — even an inactive or lapsed
e-GDDS listing, or an official notice that a data program was suspended? A
dependency edge you can date and source — even one describing a NOW-lapsed
obligation — is more useful to us than silence, as long as it's real and
cited. If there's genuinely nothing, that's a fine answer too — just say so
explicitly again rather than leave us wondering if it wasn't tried.

## 3. Four specific problems in your round-1 answers

- **Iraq's only edge** cites `odin.opendatawatch.com` — that's a third-party
  scorecard site, not the actual government or IMF document behind it.
  Please find and quote the real source (the IMF's own e-GDDS country page
  for Iraq, or the Iraqi Central Statistical Organization / Central Bank
  stating it directly) — or tell us it doesn't hold up on a real source.
- **Five countries (Indonesia, Philippines, Singapore, Thailand, Myanmar)**
  all cite the exact same generic ASEAN sentence, which never actually names
  the country. Vietnam's entry is the model to match — its quote is
  Vietnam's own statistics office describing its own 2016 accession. Please
  find each of these five countries' own equivalent statement if one exists
  (a national statistics office "about us" page, annual report, or ASEAN's
  own member roster naming the year each joined) rather than reusing the
  generic ACSS description.
- **Japan's edges to `sna-2008` and to the observance report** don't
  actually support what they claim — the quotes you supplied are about SDDS
  Plus, not SNA 2008 or the Statistics Act specifically. Please find quotes
  that actually say what each edge claims, or drop them.
- **Singapore's SDDS quote** reads as self-contradictory (subscribed August
  1996, then "met all requirements at the time of its subscription in
  January 2001" — describing a 1996 event and a 2001 event as the same
  moment). Please clarify what actually happened on each date.

## How to reply

Same format as round 1 — one JSON object, same schema
(`dependencies_by_country` keyed by ISO country code, each entry with
`source_report_id`, `target_report_id`, `relationship_type`, `basis`,
`evidence_url`, `evidence_quote`). If you're adding edges to `imf-sdds`,
`sna-2008`, or `imf-e-gdds`, reuse those exact ids — we already have those
three as real nodes on our end, no need to redescribe them as new.
