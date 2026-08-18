"""
Mechanical pre-split of `EU/EU Meta jsons.docx`.

Does ONLY what a script can do safely and repeatably:
  - extract the docx text layer losslessly to a .txt (the mining copy)
  - find every syntactically valid top-level JSON object
  - classify each by key-shape (batch header / batch-with-records / loose record)
  - dump them as NDJSON + a manifest

Deliberately does NOT: group records into slices, judge evidence, mint node ids,
map to the graph schema, or touch the prose sections. Those are judgment calls
and belong to a human-supervised agent pass. See slices/README.md.
"""
import zipfile, re, json, html, os
from collections import Counter

BASE = r"C:\Users\thoma\Desktop\My Files\Reports Clustering\EU"
DOCX = os.path.join(BASE, "EU Meta jsons.docx")
OUT = os.path.join(BASE, "slices", "_staging")
os.makedirs(OUT, exist_ok=True)

# ---- 1. lossless text extraction -------------------------------------------
z = zipfile.ZipFile(DOCX)
xml = z.read('word/document.xml').decode('utf-8', errors='ignore')
xml = re.sub(r'<w:tab[^>]*/>', '\t', xml)
xml = re.sub(r'<w:br[^>]*/>', '\n', xml)
xml = re.sub(r'</w:p>', '\n', xml)
text = html.unescape(re.sub(r'<[^>]+>', '', xml))

txt_path = os.path.join(OUT, "00-blob-fulltext.txt")
with open(txt_path, 'w', encoding='utf-8') as f:
    f.write(text)

# ---- 2. find every valid top-level JSON object ------------------------------
dec = json.JSONDecoder()
pos, found = 0, []
while True:
    nxt = text.find('{', pos)
    if nxt == -1:
        break
    try:
        obj, end = dec.raw_decode(text, nxt)
        found.append((nxt, end, obj))
        pos = end
    except Exception:
        pos = nxt + 1

top, covered_to = [], -1
for s, e, o in found:
    if s >= covered_to:
        top.append((s, e, o))
        covered_to = e

# ---- 3. classify -----------------------------------------------------------
RECORD_KEYS = {'id', 'url', 'location', 'quote', 'names', 'tense', 'notes'}

def classify(o):
    if not isinstance(o, dict):
        return 'non-dict'
    k = set(o.keys())
    if 'part_a_records' in k:
        return 'batch-with-records'
    if 'part_b_soft_connections' in k:
        return 'part-b-soft-connections'
    if {'project', 'governing_brief'} & k:
        return 'batch-header'
    if 'quote' in k and 'id' in k:
        return 'loose-record'
    return 'other'

buckets = {}
for s, e, o in top:
    buckets.setdefault(classify(o), []).append((s, e, o))

# ---- 4. write out ----------------------------------------------------------
manifest = {
    "_generated": "mechanical pre-split; NOT verified, NOT graph-schema data",
    "_source": "EU Meta jsons.docx",
    "_extracted_chars": len(text),
    "_top_level_json_objects": len(top),
    "_coverage_pct": round(100 * sum(e - s for s, e, o in top) / len(text), 1),
    "counts": {k: len(v) for k, v in sorted(buckets.items())},
    "batches": [],
}

for name, items in sorted(buckets.items()):
    path = os.path.join(OUT, f"10-{name}.ndjson")
    with open(path, 'w', encoding='utf-8') as f:
        for s, e, o in items:
            f.write(json.dumps({"_char_offset": s, "obj": o}, ensure_ascii=False) + "\n")

# batch inventory — the useful index for whoever slices this
for s, e, o in buckets.get('batch-with-records', []):
    meta = o.get('meta') if isinstance(o.get('meta'), dict) else {}
    recs = o.get('part_a_records') or []
    manifest["batches"].append({
        "char_offset": s,
        "batch_id": o.get('batch_id'),
        "strand": o.get('strand'),
        "session_window": meta.get('session_window'),
        "scope": meta.get('scope_completed') or meta.get('scope_completed_this_batch'),
        "n_records": len(recs),
        "record_ids": [r.get('id') for r in recs if isinstance(r, dict)][:200],
    })

# prose gaps — the part no script should touch
gaps, prev = [], 0
for s, e, o in top:
    if s > prev and text[prev:s].strip():
        gaps.append((prev, s, text[prev:s]))
    prev = e
if prev < len(text) and text[prev:].strip():
    gaps.append((prev, len(text), text[prev:]))

big_gaps = [g for g in gaps if len(g[2]) > 5000]
manifest["prose_sections_needing_human_pass"] = [
    {"char_offset": st, "chars": len(g), "opens_with": g.strip()[:200]}
    for st, en, g in big_gaps
]
with open(os.path.join(OUT, "20-prose-sections.txt"), 'w', encoding='utf-8') as f:
    for st, en, g in big_gaps:
        f.write(f"\n\n{'='*70}\n=== PROSE SECTION at char {st} ({len(g)} chars)\n{'='*70}\n\n")
        f.write(g)

with open(os.path.join(OUT, "01-manifest.json"), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print(json.dumps(manifest["counts"], indent=2))
print("coverage:", manifest["_coverage_pct"], "%")
print("batches with records:", len(manifest["batches"]))
print("prose sections >5k chars:", len(big_gaps))
print("total record ids across batches:",
      sum(b["n_records"] for b in manifest["batches"]))
print("loose records:", len(buckets.get('loose-record', [])))
