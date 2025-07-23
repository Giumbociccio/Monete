Richieste get:
- api/coins?value=valore,effigy=effige
- api/years?year=annoDesiderato
- api/years?startYear=annoIniziale,endYear=annoFinale
- api/countries?country=Italy

post:
- api/coins
{
year: 0,
value: 0.01,
state: {
	commonName: "",
	officialName: ""
},
effigy: ""
}