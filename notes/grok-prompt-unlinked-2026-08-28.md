# Prompt — closing 4 specific blocked-domain leads from the 2026-08-28 unlinked-node round

Attach `GROKREADME.md` (from `notes/grok-research-queue-2026-08-22/`) alongside this file — same standing rules as always. This is a small, targeted follow-up, not a fresh country pass: our own agents already found strong indexed evidence for each of the 4 claims below, but couldn't read the actual primary-source page (broken TLS, HTTP 403 to our fetch tool, or a robots-blocked path). You may have better luck with a different access route, a cached/alternate copy, or a different page on the same site that says the same thing. If you can't get in either, an honest "still can't reach it" is a fine answer — don't manufacture a quote.

## Real corpus ids you may use (source or target) — copy exactly, do not invent variants

`tw-business-demography`, `tw-price-detail`, `isic`, `un-coicop-2018`, `ph-financial-system`, `imf-mfsmcg-2016`, `mx-alcaldia-benito-juarez`, `mx-censo-poblacion`, `mx-censos-economicos`, `mx-denue`

## The 4 leads

1. **Taiwan — `tw-business-demography` → `isic`** (expected `methodology_depends_on`). DGBAS's own 行業統計分類 (Standard Industrial Classification) revision documents are indexed verbatim by search engines with text like "行業統計分類第12次修正草案依聯合國最新國際標準行業分類" — i.e. Taiwan's classification is explicitly ISIC-derived. Every hosting URL we tried (`ws.dgbas.gov.tw`, `www.stat.gov.tw`, `ebook.dgbas.gov.tw`, `census(portal).dgbas.gov.tw`) refused our fetch tool (broken TLS chain on the first, HTTP 403 on the rest, for PDFs specifically — their plain HTML pages fetch fine). Find a working copy of the actual revision document or FAQ page and quote the ISIC statement verbatim, with a URL.

2. **Taiwan — `tw-price-detail` → `un-coicop-2018`** (expected `methodology_depends_on`). Same domains host a document literally titled "COICOP 2018" and a CPI 編製方法說明 (compilation methodology) PDF referencing UN COICOP — also blocked by the same TLS/403 issue. Find a working copy and quote the CPI-basket-follows-COICOP-2018 statement verbatim, with a URL.

3. **Philippines — `ph-financial-system` → `imf-mfsmcg-2016`** (expected `methodology_depends_on`). BSP's own financial-system statistics metadata pages (`bsp.gov.ph/SitePages/Statistics/Financial%20System%20Accounts.aspx`, `bsp.gov.ph/Lists/Report%20on%20the%20Philippine%20Financial%20System/...`, `bsp.gov.ph/Media_and_Research/Primers%20Faqs/CBSandDCS.pdf`, `.../OFCS.pdf`) are robots-disallowed to our fetch tool. Search snippets suggest they name the IMF's Monetary and Financial Statistics Manual and Compilation Guide (2016). Confirm with a verbatim quote and URL — or another BSP page that states the same methodology basis.

4. **Mexico — `mx-alcaldia-benito-juarez` → `mx-censo-poblacion`, `mx-censos-economicos`, `mx-denue`** (expected `uses_data_from`, one edge per target that's actually supported). The other 3 CDMX alcaldías already wired in the corpus (Cuauhtémoc, Tláhuac, Gustavo A. Madero) all cite these exact INEGI sources through IPDP CDMX's "Panorama Geográfico y Estadístico" template — a per-alcaldía PDF at `ipdp.cdmx.gob.mx/storage/app/uploads/public/.../<hash>.pdf`. Benito Juárez almost certainly has the same document, but ours 403'd/timed out on 3 tries. Find its specific PDF (search IPDP CDMX's site or Google for "Panorama Geográfico y Estadístico Benito Juárez") and quote its actual footnote citations — don't assume they match the other 3 alcaldías' citations exactly; quote what this specific document actually says.

## Reply

Same as always — one JSON file per GROKREADME.md's schema (`_meta`/`proposed_reports`/`dependencies`), rendered as a download, not pasted into chat. No new nodes should be needed for any of these 4 — everything targets an id already listed above. If a lead genuinely dead-ends, say so in `_meta.countries_thin_or_null` (or an equivalent note) rather than stretching for a quote.
