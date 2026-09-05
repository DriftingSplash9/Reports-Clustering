#!/usr/bin/env python3
"""DSBB Summary-of-Methodology import, extraction step.
Reads ~/dsbb-cache, finds named international standards in each SoM, maps (country, category)
to an existing corpus node, and emits candidates + a review file. Never writes the corpus."""
import json,glob,os,re,html,collections,sys
import pycountry
H=os.path.expanduser('~'); C=f'{H}/dsbb-cache'; ROOT=f'{H}/mnt/Reports Clustering'
def strip(s):
    s=re.sub(r'<[^>]+>',' ',s); s=html.unescape(s); return re.sub(r'\s+',' ',s).strip()
# --- corpus
reports={}; edges=set(); part_of=set()
for f in glob.glob(f'{ROOT}/src/data/research/*.json'):
    j=json.load(open(f,encoding='utf-8'))
    for r in j.get('reports') or []: reports[r['id']]=r
    for e in j.get('dependencies') or []: edges.add((e['source_report_id'],e['target_report_id']))
seed=open(f'{ROOT}/src/data/reports.ts',encoding='utf-8').read()
seed_ids=re.findall(r"^\s*id: '([^']+)'",seed,re.M)
for blk in re.split(r'\n  \{\n',seed)[1:]:
    g=lambda k: (re.search(r"^\s*"+k+r": '([^']*)'",blk,re.M) or [None,None])[1]
    if g('id') and g('id') not in reports: reports[g('id')]={'id':g('id'),'title':g('title') or '','country':g('country'),'kind':g('kind') or 'publication','_seed':True}
dep=open(f'{ROOT}/src/data/dependencies.ts',encoding='utf-8').read()
for m in re.finditer(r"source_report_id: '([^']+)',\s*target_report_id: '([^']+)'",dep): edges.add((m.group(1),m.group(2)))
for r in reports.values():
    if r.get('part_of'): part_of.add((r['id'],r['part_of'])); part_of.add((r['part_of'],r['id']))
# --- standards
STD=[('sna-2008',r'2008 SNA|SNA[ -]?2008|System of National Accounts,? ?2008'),
 ('sna-1993',r'1993 SNA|SNA[ -]?1993|System of National Accounts,? ?1993'),
 ('sna-1968',r'1968 SNA|SNA[ -]?1968|System of National Accounts,? ?1968'),
 ('esa-2010',r'ESA ?2010|European System of (?:National and Regional )?Accounts,? ?2010'),
 ('imf-bpm6',r'BPM ?6|Balance of Payments and International Investment Position Manual,? (?:\(?sixth|6th)|sixth edition of the (?:IMF.s )?Balance of Payments'),
 ('imf-gfsm',r'GFSM ?2014|Government Finance Statistics Manual,? ?2014'),
 ('imf-mfsmcg-2016',r'MFSMCG|Monetary and Financial Statistics Manual and Compilation Guide'),
 ('cpi-manual',r'Consumer Price Index Manual:? Concepts and Methods|(?:Consumer Price Index|CPI) Manual[^.;]{0,80}2020|2020 (?:Consumer Price Index|CPI) Manual'),
 ('isic',r'\bISIC\b'),
 ('un-coicop-2018',r'COICOP[ -]?2018'),
 ('un-coicop-hbs-1999',r'COICOP[ -]HBS'),
 ('hs',r'Harmoni[sz]ed (?:Commodity Description and Coding )?System|\bHS\b (?:code|classification|nomenclature|20\d\d)'),
 ('imf-psds-guide',r'Public Sector Debt Statistics:? Guide')]
FIT={'sna-2008':'NAG','sna-1993':'NAG','sna-1968':'NAG','esa-2010':'NAG','imf-bpm6':'BOP IIP EXD MET ILV','imf-gfsm':'CGO GGO CGD GGD','imf-mfsmcg-2016':'AAB AAC OFS','cpi-manual':'CPI','isic':'IND NAG','un-coicop-2018':'CPI','un-coicop-hbs-1999':'CPI','hs':'MET','imf-psds-guide':'CGD GGD EXD'}
# --- category -> source node title patterns
CAT={'NAG':r'national accounts|national economic accounts|gross domestic product|\bGDP\b|cuentas nacionales|comptes nationaux|contas nacionais',
 'CPI':r'consumer price|\bCPI\b|precios al consumidor|prix à la consommation|\bIPC\b|\bIHPC\b|\bHICP\b',
 'PPI':r'producer price|\bPPI\b',
 'BOP':r'balance of payments|\bBOP\b|balanza de pagos|balance des paiements',
 'IIP':r'international investment position',
 'EXD':r'external debt',
 'CGO':r'government finance|fiscal (?:statistics|operations)|budget execution|central government operations|public finance',
 'GGO':r'government finance|fiscal (?:statistics|operations)|general government|public finance',
 'CGD':r'government debt|public debt|debt statistics',
 'GGD':r'government debt|public debt|debt statistics',
 'AAB':r'monetary (?:statistics|survey|aggregates)|depository corporations|money and banking',
 'AAC':r'central bank (?:survey|balance sheet)|monetary (?:statistics|survey)',
 'OFS':r'other financial corporations',
 'IND':r'industrial production|production index|index of industrial',
 'MET':r'merchandise trade|foreign trade|external trade|international trade|comercio exterior|exports? and imports',
 'ILV':r'official reserve|international reserves|reserve assets'}
def iso2(cc3):
    c=pycountry.countries.get(alpha_3=cc3); return c.alpha_2 if c else None
def sentences(t):
    t=re.sub(r'\s(?=\d+(?:\.\d+)+\s+[A-Z])','\n',t)
    t=re.sub(r'\s(?=(?:Analytical framework|Classification systems?|Scope of the data|Transaction coverage|Basis for recording|Source data|Compilation practices|Accounting conventions|Nature of the basic data sources)\s*:)','\n',t,flags=re.I)
    return [x for chunk in t.split('\n') for x in re.split(r'(?<=[.;])\s+(?=[A-Z(“"])',chunk)]
STRONG=re.compile(r'follow|based on|accordance|compiled|adopted|compl(?:y|ies)|conform|recommendation|methodolog|framework|consistent with|in line with|guidelines',re.I)
cands=[]; stats=collections.Counter(); review=[]
for f in sorted(glob.glob(f'{C}/som-*.json')):
    cc3,code=re.match(r'.*/som-([A-Z]{3})-([A-Z0-9]+)\.json',f).groups()
    raw=open(f,encoding='utf-8').read()
    if raw.strip() in ('[]','null',''): continue
    try: j=json.loads(raw)
    except Exception: continue
    text=' '.join(strip(d.get('DMDetails') or '') for d in j)
    if not text: continue
    fam=code[:3]; cc2=iso2(cc3)
    if not cc2: stats['no-iso2']+=1; continue
    found=[]
    for sid,rx in STD:
        if fam not in FIT[sid].split(): continue
        m=re.search(rx,text,re.I)
        if m: found.append((sid,m,rx))
    if not found: continue
    if sid not in reports and sid not in seed_ids: pass
    stats['soms-with-standard']+=1
    # source candidates
    pat=CAT.get(fam)
    srcs=[r for r in reports.values() if r.get('country')==cc2 and r.get('kind')=='publication' and pat and re.search(pat,r['title'],re.I)]
    EXCL={'NAG':r'provincial|regional|governorate|oblast|district|digital|rebas|quality report|methodo|no petrolero|no miner|by income|satellite',
          'CPI':r'rebas|provincial|los angeles|houston|chained|c-cpi|regional|state|harmoni[sz]ed index|hicp|hvpi|hikp|ipch|ipca|zharmon',
          'MET':r'partner|gcc|asean|precios|price|volume index',
          'CGD':r'external','GGD':r'external','EXD':r'government debt|public debt',
          'GGO':r'edp|notification|maastricht|excessive|local government|state and local|state gov|deficit and debt|deficytu|deficit a dlh|deficit i dug',
          'CGO':r'edp|notification|maastricht|excessive|local government|state and local|state gov|treasury|deficit and debt',
          'IND':r'quarterly|value-added|regional|provincial','BOP':r'quarterly|monthly'}
    ex=EXCL.get(fam)
    if ex: srcs=[r for r in srcs if not re.search(ex,r['title']+' '+r['id'],re.I)]
    if len(srcs)>1:
        base=[r for r in srcs if all(o['id']==r['id'] or o['id'].startswith(r['id']+'-') for o in srcs)]
        if len(base)==1: srcs=base
        na=[r for r in srcs if 'national-accounts' in r['id'] or r['id'].endswith('-cpi')]
        if len(na)==1: srcs=na
    # one SNA edition per SoM: the latest named
    eds=[x for x in found if x[0].startswith('sna-')]
    if len(eds)>1:
        keep=max(eds,key=lambda x:x[0]); found=[x for x in found if not x[0].startswith('sna-') or x is keep]; stats['sna-older-edition-dropped']+=len(eds)-1
    for sid,m,rx in found:
        stats[f'mention:{sid}']+=1
        # quote: sentence containing the match
        hits=[s for s in sentences(text) if re.search(rx,s,re.I)]
        sent=next((s for s in hits if STRONG.search(s)), hits[0] if hits else text[max(0,m.start()-150):m.end()+150])
        mm=re.search(rx,sent,re.I); m=mm if mm else m
        sent=re.sub(r'^(?:\d+(?:\.\d+)*\s+[A-Z][^:]{0,60}:\s*)+','',sent.strip())
        sent=re.sub(r'^\d+(?:\.\d+)+\s+[A-Z][a-z]+(?:[ /][a-z]+)*\s+(?=[A-Z“])','',sent)
        sent=re.sub(r'^(?:Analytical framework|Classification systems?|Scope of the data|Transaction coverage)\s*:\s*','',sent,flags=re.I)
        if len(sent)>380:
            i=sent.find(m.group(0)); a=max(0,i-200); b=min(len(sent),i+len(m.group(0))+150)
            a=sent.rfind(' ',0,a)+1 if a>0 else 0; b2=sent.find(' ',b); b=b2 if b2>0 else len(sent)
            sent=sent[a:b].strip()
        if '"' in sent or '\\' in sent: stats['quote-has-quotes-skipped']+=1; continue
        entry={'country':cc3,'category':code,'target':sid,'quote':sent,'url':f'https://dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode={cc3}&categoryCode={code}','candidates':[(r['id'],r['title']) for r in srcs]}
        if len(srcs)==0: stats['no-source-node']+=1; review.append({**entry,'status':'no-source-node'}); continue
        live=[r for r in srcs if (r['id'],sid) in edges]
        if len(srcs)==1:
            s=srcs[0]
            if (s['id'],sid) in edges: stats['already-live']+=1; review.append({**entry,'status':'already-live','source':s['id']}); continue
            if (s['id'],sid) in part_of: stats['part-of']+=1; continue
            cands.append({**entry,'source':s['id'],'source_title':s['title']}); stats['minted']+=1
        else:
            if live: stats['already-live']+=1; review.append({**entry,'status':'already-live-one-of-several','source':live[0]['id']}); continue
            stats['ambiguous-source']+=1; review.append({**entry,'status':'ambiguous-source'})
print(json.dumps(stats,indent=1,sort_keys=True))
json.dump(cands,open(f'{H}/dsbb-cands.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
json.dump(review,open(f'{H}/dsbb-review.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(cands),'candidates;',len(review),'review rows')
