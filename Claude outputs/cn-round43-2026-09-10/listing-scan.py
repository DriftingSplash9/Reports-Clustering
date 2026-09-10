import re,glob,sys,os
titles={}
for l in open('/home/claude/r43/bmzd_all.tsv',encoding='utf-8'):
    p=l.rstrip('\n').split('\t')
    if len(p)>=2: titles.setdefault(p[1].strip(),[]).append(p[0])
# strip edition/parenthetical for matching core
def core(t): return re.sub(r'[（(].*?[)）]','',t).strip()
cores={}
for t in titles: cores.setdefault(core(t),[]).append(t)
files=sys.argv[1:]
for f in files:
    t=open(f,encoding='utf-8',errors='replace').read()
    t=re.sub(r'\s+','',t)
    hits=set()
    for c in cores:
        if len(c)>=6 and c in t:
            for m in re.finditer(re.escape(c),t):
                hits.add((c,t[max(0,m.start()-60):m.end()+30]))
    for c,ctx in sorted(hits): print(f"{os.path.basename(f)}\t{c}\t…{ctx}…")
