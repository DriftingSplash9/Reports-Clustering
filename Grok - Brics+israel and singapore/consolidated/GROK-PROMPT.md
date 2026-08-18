# Prompt for Grok — URL recovery

Paste everything below the line, then attach `grok-url-handoff.json`.

---

I'm building a corpus of official economic and statistical publications — each node is one real published report, and every node needs a link to the actual document. I've attached a JSON file with 75 nodes I couldn't finish. Claude did two full rounds of web research on these and hit a wall; the file records exactly what was tried and why each one failed, so please read `what_we_hit` before starting on an item rather than repeating a dead end.

There are two lists inside `tasks`:

- **`find_a_url`** — 34 nodes with no URL at all. Mostly government domains that wouldn't load: dead DNS, expired certificates, 403s, JavaScript-only sites that render nothing.
- **`improve_a_url`** — 41 nodes where the link found is the right official series page but isn't specific to that node. Several of them share one URL. Iran's five provincial GRDP nodes all point at one national accounts page; Türkiye's eight provincial GDP nodes all point at one methodology note. If a genuinely province-specific or product-specific page exists, that's what I want.

## The one rule

**A URL goes in only if you actually retrieved the page and saw that it is the right publication.** A plausible-looking guessed URL is worse than no URL — a wrong link stays invisible until somebody clicks it, and by then it's buried in a corpus of thousands. `null` with an honest reason is a correct answer and I'd much rather have it.

So please don't reconstruct a URL from a pattern, and don't give me something that "should" be there. If you can't open it, say so.

## What counts as a good URL

- On the publisher's own official domain — government, central bank, national statistics office, or multilateral body.
- The specific product or series landing page. For a recurring publication, its series landing page is right.
- **Not** a publisher homepage, Wikipedia, a news article, a data aggregator (CEIC, TradingEconomics, Statista, Macrotrends), a search-results page, a mirror, or an archive copy.
- Native-language pages are fine and are often the only ones that exist.
- If the publication doesn't actually exist, or the publisher isn't an eligible body — a SIPRI estimate rather than a government series, a corporate publisher, an industry association — say that. It's genuinely useful; it means the node itself is wrong and should come out.

## Where you have the advantage

You may be able to reach sites we couldn't. The concentrations are Vietnamese, Iranian, Venezuelan, Syrian and Turkish government domains. Several were intermittent rather than dead — Iran's `amar.org.ir` answered about one attempt in six, `cbi.ir` about one in five — so a retry at a different time may simply work. `domains_we_could_not_reach` lists the ones that never answered.

Two specific ones worth your time if you can get in:

- **`vanban.chinhphu.vn`** (Vietnam's government document register) is reachable but addressable only by an internal `docid`, so a decision number can't be looked up directly. If you can resolve Prime Ministerial decision numbers to their docid, several Vietnamese items unlock at once.
- **TurkStat.** `veriportali.tuik.gov.tr` is a catch-all single-page app that returns a "JavaScript required" stub on every path including PDFs. But `www.tuik.gov.tr/indir/` serves real files. Provincial GDP is published as a dated bulletin — the bulletin page is what I want, not the portal.

`routes_that_worked_for_us` in the file lists the tricks that did pay off, including one warning: don't bother with the IMF's DSBB/NSDP aggregator, it renders only template placeholders. National NSDP mirrors like `nsdp.nso.gov.vn` do work.

## How to reply

One JSON object, nothing around it:

```json
{"results":[
  {"id":"<the id exactly as given>",
   "url":"<the URL, or null>",
   "confirmed":"<what you actually saw on the page that proves it's this publication — a title, a figure, a coverage period. If null: why. Domain dead, series discontinued, no such product, publisher not eligible.>",
   "route":"<successor-domain / sitemap / static-asset / co-publisher / on-site-search / other>"}
]}
```

One entry per id, both lists, in the order given, including the ones you couldn't solve. Please don't add ids that weren't asked for.

A short note at the end on which domains are permanently dead versus temporarily unreachable would help me decide what's worth another attempt later.
