#!/usr/bin/env python3
"""Re-evaluate lead-type `_dropped` entries that carry a URL (plan §4 step 5, Round C 2026-09-05).

For every `_dropped` entry with reason no-document / deferred / no-node-yet / unreadable-source
whose `why` carries an evidence_url, fetch that URL TODAY (browser UA, 25 s), extract text
(pdftotext -layout for PDF, tag-strip for HTML), and check the quoted spans of the ORIGINAL basis
against it, whitespace- and quote-family-insensitively. Output is a review table, never a
corpus write: a lead whose spans are found and whose target is named is a re-mint CANDIDATE for
a reader (the same accept test as the quote backfill — does this sentence, in this document,
say the source depends on the target?).

Usage (run from the toolchain copy, resumable — the per-URL cache lives in $REEVAL_CACHE):
  python3 scripts/reeval-dropped/probe.py <leads.json> <out.json> [--limit N] [--workers 8]
leads.json is the table written by the extraction step recorded in project memory
(round_c_dropped_reeval_2026-09-05.md). The 'dead' verdict here means the host answered a
4xx/5xx or nothing to THIS machine today — re-probe from the other machine before believing it
(PLAYBOOK §6, three networks).
"""
import json, sys, os, re, hashlib, subprocess, unicodedata, tempfile, concurrent.futures as cf
leads = json.load(open(sys.argv[1], encoding='utf-8'))
out_path = sys.argv[2]
limit = int(sys.argv[sys.argv.index('--limit')+1]) if '--limit' in sys.argv else None
workers = int(sys.argv[sys.argv.index('--workers')+1]) if '--workers' in sys.argv else 8
CACHE = os.environ.get('REEVAL_CACHE', os.path.expanduser('~/reeval-cache'))
os.makedirs(CACHE, exist_ok=True)
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'

def norm(s):
    s = unicodedata.normalize('NFKD', s); s = ''.join(c for c in s if not unicodedata.combining(c))
    for a, b in (('’', "'"), ('‘', "'"), ('“', '"'), ('”', '"'), ('–', '-'), ('—', '-'), (' ', ' ')): s = s.replace(a, b)
    return re.sub(r'\s+', ' ', s).lower().strip()
def squash(s): return re.sub(r'[\s]+', '', norm(s))

def fetch(url):
    key = hashlib.sha256(url.encode()).hexdigest(); cp = os.path.join(CACHE, key + '.json')
    if os.path.exists(cp): return json.load(open(cp, encoding='utf-8'))
    enc = ''.join(c if 32 < ord(c) < 127 else '%%%02X' % ord(c) for c in url)
    with tempfile.TemporaryDirectory() as td:
        body = os.path.join(td, 'body')
        try:
            r = subprocess.run(['curl', '-sS', '-L', '-A', UA, '--max-time', '25', '--connect-timeout', '12', '-o', body,
                                '-w', '%{http_code}\t%{content_type}\t%{size_download}\t%{url_effective}', enc], capture_output=True, text=True, timeout=40)
            parts = (r.stdout.strip().split('\t') + ['', '', '', ''])[:4]
            status, ctype, size, final = parts; curl_err = r.stderr.strip()[:200]
        except subprocess.TimeoutExpired:
            status, ctype, size, final, curl_err = '000', '', '0', url, 'timeout'
        text = ''; extractor = 'none'
        if os.path.exists(body) and os.path.getsize(body) > 0:
            head = open(body, 'rb').read(8)
            if head.startswith(b'%PDF') or 'pdf' in ctype:
                p = subprocess.run(['pdftotext', '-layout', body, '-'], capture_output=True, text=True, errors='replace', timeout=120)
                text = p.stdout; extractor = 'pdftotext'
            else:
                raw = open(body, 'rb').read().decode('utf-8', 'replace')
                raw = re.sub(r'(?is)<(script|style|noscript)[^>]*>.*?</\1>', ' ', raw)
                text = re.sub(r'<[^>]+>', ' ', raw); extractor = 'html'
                import html as _h; text = _h.unescape(text)
        wall = bool(re.search(r'(?i)just a moment|cf-browser-verification|captcha|access denied|attention required|enable javascript', text[:20000])) and len(squash(text)) < 5000
        rec = {'status': status, 'ctype': ctype, 'size': int(size or 0), 'final': final, 'curl_err': curl_err, 'extractor': extractor,
               'chars': len(text), 'wall': wall, 'text_sq': squash(text)[:4_000_000], 'text_norm': norm(text)[:200_000]}
        json.dump(rec, open(cp, 'w', encoding='utf-8'), ensure_ascii=False)
        return rec

def names_target(text_sq, title):
    if not title: return None
    core = re.sub(r'\([^)]*\)', ' ', title)
    words = [w for w in re.findall(r"[\w'-]+", norm(core)) if len(w) > 1]
    if not words: return None
    best = 0
    for i in range(len(words)):
        for j in range(len(words), i, -1):
            if (j - i) <= best: break
            if ''.join(words[i:j]) in text_sq: best = j - i; break
    acr = [a for a in re.findall(r'\(([^)]{4,20})\)', title) if a.upper() == a or re.search(r'\d', a)]
    acr_hit = any(squash(a) in text_sq for a in acr)
    return {'run': f'{best}/{len(words)}', 'run_ok': best / len(words) >= 0.6, 'acronym': acr_hit}

def evaluate(row):
    rec = fetch(row['url'])
    verdict = 'dead' if not rec['status'].startswith('2') else ('wall' if rec['wall'] else ('empty' if rec['chars'] < 200 else 'read'))
    found = []
    for sp in row['spans']:
        frags = [f for f in re.split(r'\.\.\.|…', sp) if len(squash(f)) >= 12]
        hit = frags and all(squash(f) in rec['text_sq'] for f in frags)
        found.append(bool(hit))
    r = dict(row); r.pop('spans', None)
    r.update({'verdict': verdict, 'status': rec['status'], 'chars': rec['chars'], 'extractor': rec['extractor'], 'curl_err': rec['curl_err'],
              'spans_total': len(row['spans']), 'spans_found': sum(found), 'naming': names_target(rec['text_sq'], row.get('tgt_title')) if verdict == 'read' else None})
    r['candidate'] = verdict == 'read' and r['spans_found'] > 0 and r['src_ok'] and r['tgt_ok']
    return r

rows = [l for l in leads if l.get('url')][:limit]
results = []
with cf.ThreadPoolExecutor(max_workers=workers) as ex:
    for r in ex.map(evaluate, rows): results.append(r)
import collections
summary = {'n': len(results), 'verdicts': dict(collections.Counter(r['verdict'] for r in results)),
           'candidates': sum(1 for r in results if r['candidate']),
           'candidates_named': sum(1 for r in results if r['candidate'] and r['naming'] and (r['naming']['run_ok'] or r['naming']['acronym']))}
json.dump({'note': 'Round C 2026-09-05 lead re-evaluation probe — review table, nothing written to the corpus', 'summary': summary, 'results': results},
          open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(json.dumps(summary))
