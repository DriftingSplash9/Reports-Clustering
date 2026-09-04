#!/usr/bin/env python3
"""Land an already-local extraction into .evidence-fulltext/, keyed on the CITED url.

land.py handles a capture that crossed the bridge (base64 + sha256 check);
this one handles a document the VM fetched itself, so the checksum it records
is simply the sha of the text it writes.

Usage: land_text.py <textfile> <cited-url> <via> <extractor> <content-type> <body-bytes>
"""
import sys, gzip, hashlib, os, datetime, pathlib
tf, url, via, extractor, ctype, bodybytes = sys.argv[1:7]
text = open(tf, encoding='utf-8').read()
if len(text) < 200:
    print(f'REFUSED: {tf} has {len(text)} chars — an empty or stub extraction is not a document')
    sys.exit(2)
sha = hashlib.sha256(text.encode('utf-8')).hexdigest()
ROOT = os.environ.get('RC_ROOT', os.path.expanduser('~/rc-scratch'))
CAP = 4 * 1024 * 1024
b = text.encode('utf-8')
truncated = len(b) > CAP
kept = b[:CAP].decode('utf-8', 'ignore') if truncated else text
now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
header = '\n'.join([
    f'url: {url}', f'fetched-at: {now}', 'status: 200', f'final-url: {url}',
    f'content-type: {ctype}', f'body-bytes: {bodybytes}', f'extractor: {extractor}',
    'block: none', f'text-chars: {len(text)}', f'text-sha256: {sha}',
    f'truncated: {str(truncated).lower()}', f'via: {via}'])
key = hashlib.sha256(url.encode('utf-8')).hexdigest()
d = pathlib.Path(ROOT) / '.evidence-fulltext'; d.mkdir(parents=True, exist_ok=True)
(d / f'{key}.txt.gz').write_bytes(gzip.compress((header + '\n---\n' + kept).encode('utf-8')))
print(f'OK {os.path.basename(tf)} sha={sha[:16]} chars={len(text)} -> {key[:16]}')
