#!/usr/bin/env python3
"""Re-derive each slice quote from the grader's own extraction (.evidence-fulltext), so the quote is byte-identical
to what the grader reads; JSON-escaped line breaks (literal backslash-n) split the text, so pick the segment holding the mention."""
import json,gzip,hashlib,os,re,sys,collections
H=os.path.expanduser('~'); ROOT=f'{H}/mnt/Reports Clustering'; FT=f'{H}/rc-scratch/.evidence-fulltext'
sys.path.insert(0,f'{H}'); 
STD=dict(json.load(open(f'{H}/dsbb-std.json')))
STRONG=re.compile(r'follow|based on|accordance|compiled|adopted|compl(?:y|ies)|conform|recommendation|methodolog|framework|consistent with|in line with|guidelines|according to',re.I)
p=f'{ROOT}/src/data/research/dsbb-som-import-2026-09-05.json'
j=json.load(open(p,encoding='utf-8'))
seen=set(); out=[]; st=collections.Counter()
for e in j['dependencies']:
    k=(e['source_report_id'],e['target_report_id'])
    if k in seen: st['dup-dropped']+=1; continue
    seen.add(k)
    key=hashlib.sha256(e['evidence_url'].encode()).hexdigest()
    f=f'{FT}/{key}.txt.gz'
    if not os.path.exists(f): st['no-fulltext']+=1; out.append(e); continue
    t=gzip.open(f,'rt',encoding='utf-8').read().split('\n---\n',1)[1]
    rx=STD[e['target_report_id']]
    segs=[s.strip() for s in re.split(r'\\n|\\r|\n|\\"|"',t)]
    hits=[s for s in segs if re.search(rx,s,re.I) and len(s.split())>=6]
    if not hits: st['no-segment']+=1; out.append(e); continue
    best=next((s for s in hits if STRONG.search(s)), hits[0])
    # trim to a sentence-ish window around the mention if very long
    if len(best)>380:
        m=re.search(rx,best,re.I); a=max(0,m.start()-200); b=min(len(best),m.end()+150)
        a=best.rfind(' ',0,a)+1 if a>0 else 0; b2=best.find(' ',b); b=b2 if b2>0 else len(best)
        best=best[a:b].strip()
    best=re.sub(r'^\d+(?:\.\d+)+\s+[A-Z][a-z]+(?:[ /][a-z]+)*\s+(?=[A-Z“])','',best)
    e['evidence_quote']=best; st['requoted']+=1; out.append(e)
j['dependencies']=out
json.dump(j,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2); open(p,'a').write('\n')
print(dict(st), len(out),'edges')
