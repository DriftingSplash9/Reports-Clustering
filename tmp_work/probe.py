import json,os,subprocess,sys,tempfile,re
from concurrent.futures import ThreadPoolExecutor
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
WALL=[('cf-browser-verification','cloudflare-challenge'),('just a moment...','cloudflare-challenge'),
('enable javascript and cookies to continue','cloudflare-challenge'),('attention required! | cloudflare','cloudflare-block'),
('_incapsula_','incapsula'),('incident id:','incapsula'),('access denied','akamai-deny'),
('you don’t have permission to access','waf-deny'),('captcha-delivery.com','datadome'),('perfdrive.com','radware'),
('request unsuccessful. incapsula','incapsula'),('checking your browser before accessing','cloudflare-challenge')]
def strip_html(h):
    h=re.sub(r'<!--[\s\S]*?-->',' ',h)
    h=re.sub(r'<(script|style|noscript|svg)\b[\s\S]*?</\1>',' ',h,flags=re.I)
    h=re.sub(r'<[^>]+>',' ',h)
    return re.sub(r'\s+',' ',h).strip()
def one(url):
    d=tempfile.mkdtemp(); bp=os.path.join(d,'b.bin')
    args=['curl','-sS','-L','--compressed','-A',UA,'-H','Accept: text/html,application/xhtml+xml,application/pdf,*/*',
          '--max-time','45','--connect-timeout','15','-o',bp,'-w','%{http_code}\t%{content_type}\t%{size_download}\t%{url_effective}']
    r={'url':url}
    try:
        p=subprocess.run(args+[url],capture_output=True,text=True,timeout=70)
        if p.returncode!=0:
            p=subprocess.run(args+['-k',url],capture_output=True,text=True,timeout=70)
        if p.returncode!=0:
            r.update(block='network',label='curl-%d'%p.returncode,status=0,chars=0); return r
        code,ct,size,fu=p.stdout.strip().split('\t')
        body=open(bp,'rb').read() if os.path.exists(bp) else b''
        text=''; extractor='none'
        if body[:5]==b'%PDF-' or 'pdf' in ct.lower():
            try:
                q=subprocess.run(['pdftotext','-layout','-q',bp,'-'],capture_output=True,timeout=120)
                text=q.stdout.decode('utf8','ignore'); extractor='pdftotext'
            except Exception: pass
        elif body[:2]==b'PK' and re.search(r'officedocument|docx',ct+url,re.I):
            try:
                q=subprocess.run(['unzip','-p',bp,'word/document.xml'],capture_output=True,timeout=60)
                text=strip_html(q.stdout.decode('utf8','ignore')); extractor='docx'
            except Exception: pass
        elif body:
            s=body.decode('utf8','ignore')
            if re.search(r'<[a-z!]',s[:2000],re.I): text=strip_html(s); extractor='html'
            else: text=s; extractor='text'
        low=text.lower(); block='none'; label=''
        for m,l in WALL:
            if m in low: block='wall'; label=l; break
        code=int(code)
        if block=='none' and 200<=code<300 and len(text.strip())<200: block='empty'; label='no-extractor' if extractor=='none' else 'tiny-body'
        if block=='none' and (code>=400 or code==0): block='dead'; label='http-%d'%code
        r.update(status=code,ctype=ct,bytes=int(size or 0),extractor=extractor,block=block,label=label,chars=len(text))
    except Exception as e:
        r.update(block='network',label=type(e).__name__,status=0,chars=0)
    finally:
        subprocess.run(['rm','-rf',d])
    return r
urls=[u.strip() for u in open(os.path.expanduser('~/probe_urls.txt')) if u.strip()]
done=set()
out=os.path.expanduser('~/probe_out.jsonl')
if os.path.exists(out):
    for l in open(out):
        try: done.add(json.loads(l)['url'])
        except Exception: pass
todo=[u for u in urls if u not in done][:int(sys.argv[1])]
with ThreadPoolExecutor(max_workers=8) as ex, open(out,'a') as f:
    for r in ex.map(one,todo):
        f.write(json.dumps(r)+'\n'); f.flush()
print('done this batch',len(todo),'total done',len(done)+len(todo),'of',len(urls))
