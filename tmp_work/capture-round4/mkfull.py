#!/usr/bin/env python3
"""Write a .evidence-fulltext/<sha256(url)>.txt.gz record the grader can read offline.

usage: mkfull.py <url> <textfile> <via> [status] [content-type] [body-bytes] [extractor]
Header shape must match headerLines() in scripts/grade-evidence.ts exactly.
"""
import sys, os, gzip, hashlib, datetime

url, textfile, via = sys.argv[1], sys.argv[2], sys.argv[3]
status = sys.argv[4] if len(sys.argv) > 4 else '200'
ctype = sys.argv[5] if len(sys.argv) > 5 else 'text/html'
bodybytes = sys.argv[6] if len(sys.argv) > 6 else '0'
extractor = sys.argv[7] if len(sys.argv) > 7 else 'html'

text = open(textfile, encoding='utf-8').read()
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
d = os.path.join(root, '.evidence-fulltext')
os.makedirs(d, exist_ok=True)
key = hashlib.sha256(url.encode('utf-8')).hexdigest()
head = '\n'.join([
    f'url: {url}',
    f'fetched-at: {datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.")}{datetime.datetime.now(datetime.timezone.utc).microsecond//1000:03d}Z',
    f'status: {status}',
    f'final-url: {url}',
    f'content-type: {ctype}',
    f'body-bytes: {bodybytes}',
    f'extractor: {extractor}',
    'block: none',
    f'text-chars: {len(text)}',
    f'text-sha256: {hashlib.sha256(text.encode("utf-8")).hexdigest()}',
    'truncated: false',
    f'via: {via}',
])
p = os.path.join(d, key + '.txt.gz')
with gzip.open(p, 'wb') as f:
    f.write((head + '\n---\n' + text).encode('utf-8'))
print(f'{p}  chars={len(text)}')
