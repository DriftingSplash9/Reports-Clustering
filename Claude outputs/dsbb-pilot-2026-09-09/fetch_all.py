import json,urllib.request,re,html,time,os,sys
pairs=[tuple(x) for x in json.load(open('all-som-pairs.json'))]
hdr={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
deadline=time.time()+float(sys.argv[1] if len(sys.argv)>1 else 140)
done=fail=0
for c,cat in pairs:
    fn=f"all-som/{c}-{cat}.txt"
    if os.path.exists(fn): continue
    if time.time()>deadline: break
    try:
        raw=urllib.request.urlopen(urllib.request.Request(
            f"https://dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode={c}&categoryCode={cat}",
            headers=hdr),timeout=30).read().decode('utf-8','replace')
        t=" ".join(html.unescape(re.sub('<[^>]+>',' ',s.get('DMDetails') or '')) for s in json.loads(raw))
        open(fn,'w',encoding='utf-8').write(re.sub(r'\s+',' ',t)); done+=1
    except Exception as e:
        open(fn,'w',encoding='utf-8').write(''); fail+=1
    time.sleep(0.25)
have=len([f for f in os.listdir('all-som') if f.endswith('.txt')])
print(f"this run: {done} ok, {fail} fail | total cached {have}/{len(pairs)}")
