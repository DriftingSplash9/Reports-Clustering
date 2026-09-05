#!/usr/bin/env python3
"""Resumable DSBB harvest: countries by type -> categories -> Summary of Methodology JSON. Cache in $HOME/dsbb-cache."""
import json, os, subprocess, sys, time, concurrent.futures as cf
C=os.path.expanduser('~/dsbb-cache'); os.makedirs(C,exist_ok=True)
UA='Mozilla/5.0'
def get(url, path):
    if os.path.exists(path) and os.path.getsize(path)>0: return open(path,encoding='utf-8').read()
    r=subprocess.run(['curl','-sS','-m','40','-A',UA,url,'-w','\n%{http_code}'],capture_output=True,text=True)
    body,_,code=r.stdout.rpartition('\n')
    if code=='200' and body.strip():
        open(path,'w',encoding='utf-8').write(body); return body
    return None
types=['SDDS','SDDSPLUS','EGDDS']
countries={}
for t in types:
    b=get(f'https://dsbb.imf.org/api/country/getcountrybytype?countryType={t}',f'{C}/countries-{t}.json')
    j=json.loads(b)
    for a in j['CountryListByAlphabets']:
        for c in (a.get('CountryGroup1') or [])+(a.get('CountryGroup2') or []):
            countries[c['CountryCode']]=(t,c['CountryName'])
print('countries',len(countries),{t:sum(1 for v in countries.values() if v[0]==t) for t in types})
jobs=[]
for cc,(t,name) in sorted(countries.items()):
    b=get(f'https://dsbb.imf.org/api/report/getCategoriesByCountryCode?countryCode={cc}&countryType={t}',f'{C}/cats-{cc}.json')
    if not b: print('no cats',cc); continue
    for sec in json.loads(b):
        for cat in sec['Categories']:
            jobs.append((cc,t,cat['Code']))
            for sub in cat.get('SubCategories') or []:
                if sub.get('Code'): jobs.append((cc,t,sub['Code']))
jobs=sorted(set(jobs))
todo=[j for j in jobs if not os.path.exists(f'{C}/som-{j[0]}-{j[2]}.json')]
print('som jobs',len(jobs),'todo',len(todo))
t0=time.time(); done=0; fail=0
def one(j):
    cc,t,code=j
    return get(f'https://dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode={cc}&categoryCode={code}',f'{C}/som-{cc}-{code}.json')
with cf.ThreadPoolExecutor(4) as ex:
    for j,res in zip(todo, ex.map(one,todo)):
        done+=1; fail+= (res is None)
        if time.time()-t0>140: print('time budget hit at',done); break
print('done',done,'fail',fail,'remaining',len([j for j in jobs if not os.path.exists(f'{C}/som-{j[0]}-{j[2]}.json')]))
