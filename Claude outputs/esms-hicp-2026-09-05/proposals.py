# ESMS HICP scripted pass, 2026-09-05 — proposals. Each quote is verbatim from
# Eurostat's prc_hicp_esms*_<cc>.htm (section 18.1.1, weights), checked below
# as a substring of the page text before anything is applied.
U = lambda v, cc: f"https://ec.europa.eu/eurostat/cache/metadata/EN/prc_hicp_esms{v}_{cc}.htm"
P = [
 # cc, ver, source, target, kind(NA|HBS), quote
 ("at","hi4","at-statistik-austria-hvpi","at-statistik-austria-national-accounts","NA","What is the main data source to obtain the HFMCE values? The main data source are the Austrian National Accounts data."),
 ("at","hi4","at-statistik-austria-hvpi","at-statistik-austria-konsumerhebung","HBS","Weights below the 4-digits COICOP (5-digits and national elementary aggregates) were derived from additional data sources, like the Household Budget Survey, market data or administrative sources."),
 ("be","hi4","be-statbel-cpi","be-nbb-national-accounts","NA","As of 2010, the major source for the HICP weights are the national accounts. National accounts are used up to ECOICOP level 5 since the introduction of ESA 2010."),
 ("be","hi4","be-statbel-cpi","be-statbel-hbs","HBS","Regional weighting information is obtained from the household budget survey."),
 ("bg","hi4","bg-nsi-cpi","bg-nsi-hbs","HBS","Below the ECOICOP 5-digit level, various sources are used for different product groups (household budget survey data, transport, tourism and other statistics data, administrative data, etc.)."),
 ("ee","hi3","ee-stat-hicp","ee-stat-hbs","HBS","Sources of weights: weights derived mainly from the National Accounts and Household Budget Survey data."),
 ("el","hi4","gr-elstat-hicp","gr-elstat-hbs","HBS","The expenditure of 3-digit codes is allocated proportionally to the 4 and 5-digit level, using the data of the National Accounts and the Household Budget Survey (HBS) respectively, both for the year t-2."),
 ("es","hi4","es-ine-ipc","es-ine-national-accounts","NA","At ECOICOP v2 5-digit level, the main data source for the compilation of the HICP weights are the HFMCE data (in line with the domestic concept) from Spanish National Accounts (obtained from year t-2) further complemented with data from the Household Budget Survey and other sources."),
 ("es","hi4","es-ine-ipc","es-ine-epf","HBS","At ECOICOP v2 5-digit level, the main data source for the compilation of the HICP weights are the HFMCE data (in line with the domestic concept) from Spanish National Accounts (obtained from year t-2) further complemented with data from the Household Budget Survey and other sources."),
 ("fi","hi3","fi-statfin-cpi","fi-statfin-hbs","HBS","Data source for regional weights is HBS."),
 ("hr","hi4","hr-dzs-hicp","hr-dzs-national-accounts","NA","At 5-digit ECOICOP ver. 2 level, weights used in the current year are based on annual HFMCE data of the previous year, estimated in line with the domestic concept. HFMCE is obtained from provisional NA data for the first three quarters of the previous year."),
 ("hr","hi4","hr-dzs-hicp","hr-dzs-hbs","HBS","Below the 5-digit level, weights are based mostly on the last available HBS data."),
 ("hu","hi4","hu-ksh-cpi","hu-hcso-national-accounts","NA","The source of weights at 4-digit ECOICOP level is Annual National Accounts data."),
 ("hu","hi4","hu-ksh-cpi","hu-ksh-hbs","HBS","Below the 4-digit ECOICOP level, additional data sources such as Household Budget and Living Conditions Survey (HBLS), Tourism statistics and Car Registry data are also used."),
 ("is","hi3","is-hagstofa-hicp","is-hagstofa-national-accounts","NA","The sources of the weights are the National Accounts for household consumption at the 4-digit ECOICOP level. The weights for the 5-level are subdivided by using the household expenditure survey."),
 ("is","hi3","is-hagstofa-hicp","is-hagstofa-hbs","HBS","The sources of the weights are the National Accounts for household consumption at the 4-digit ECOICOP level. The weights for the 5-level are subdivided by using the household expenditure survey."),
 ("lt","hi4","lt-vda-hicp","lt-vda-hbs","HBS","Below the ECOICOP ver.2 level, expenditure is distributed to representative products using the household expenditure structure from the Household Budget Survey (HBS), most recently conducted in 2019."),
 ("lv","hi3","lv-csp-cpi","lv-csp-national-accounts","NA","The weights derived from the National Accounts are used for ECOICOP 5-digit sub-class level and for elementary product groups the HBS data and additional sources are used."),
 ("lv","hi3","lv-csp-cpi","lv-csp-hbs","HBS","The weights derived from the National Accounts are used for ECOICOP 5-digit sub-class level and for elementary product groups the HBS data and additional sources are used."),
 ("mt","hi3","mt-nso-cpi","mt-nso-hbs","HBS","HFMCE values for the ECOICOP 5-digit level are obtained from the Household Budgetary Survey (HBS), which was last carried out in 2015/16."),
 ("pl","hi4","pl-gus-hicp","pl-gus-hbs","HBS","In some cases within ECOICOP subclasses, there is an additional national 6-digit level. Where necessary data obtained from NA is disaggregated into lower level based on the results of the Household Budget Survey."),
 ("pt","hi4","pt-ine-ipc","pt-ine-national-accounts","NA","The main data sources are Annual National Accounts data: provisional t-2 data and final t-3 data."),
 ("se","hi4","se-scb-hikp","se-scb-national-accounts","NA","At ECOICOP-level, weights used in the current year are based on annual national accounts household consumption data for t-2, estimated in line with the HFMCE and domestic concepts."),
 ("si","hi3","si-surs-cpi","si-surs-national-accounts","NA","Weights used for index calculation in an individual year are based on national accounts data on household final consumption expenditure."),
 ("si","hi3","si-surs-cpi","si-surs-hbs","HBS","For item weights, the main source of information is detailed HBS data."),
 ("sk","hi3","sk-susr-cpi","sk-susr-hbs","HBS","The source of the weights at the lower 5-digit level (elementary aggregate level) are Household Budget Survey and some additional administrative and external data sources"),
]
