const fs = require("fs");
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Server ONLINE");
});

app.get("/coins", function (req, res) {
const { value, effigy } = req.query;
fs.readFile(
    "./collezione.json",
    { encoding: "utf-8" },
    function (err, coins) {
let risultati = JSON.parse(coins);

if (value) {
risultati = risultati.filter(coin => coin.value === value);
}
if (effigy) {
risultati = risultati.filter(coin => coin.effigy.toLowerCase().includes(effigy.toLowerCase()));
}
res.json(risultati)
}
);
});

app.post("/coins", function (req, res) {
  let coin = req.body; //mi arriva un json
  fs.readFile(
    "./collezione.json",
    { encoding: "utf-8" },
    function (err, coins) {
      if (err) {
        res.status(500).send("Errore nella lettura del file");
        return;
      }

      let collezione = JSON.parse(coins);
      collezione.push(coin);

      fs.writeFile("./collezione.json", JSON.stringify(collezione, null, 2), function (err) {
        if (err) {
          res.status(500).send("Errore nel salvataggio del file");
          return;
        }

        res.status(201).json({ messaggio: "Moneta aggiunta correttamente" });
      });
    }
  );
});

app.get("/years", function (req, res) {
const annoCorrente = new Date().getFullYear();
const { startYear, endYear = annoCorrente, year } = req.query;
fs.readFile(
   "./collezione.json",
   { encoding: "utf-8" },
   function (err, coins) {
			let risultati = JSON.parse(coins);
			risultati.sort((a, b) => a.anno - b.anno);
if(year) {
risultati.filter(coin => coin.year === year)
} else if (startYear) {
risultati.filter(coin => coin.year >= startYear && coin.year <= endYear);
}
res.json(risultati);
});	
});

app.get("/countries", function (req, res) {
const { country } = req.query;
fs.readFile(
"./collezione.json",
{ encoding: "utf-8" },
function (err, coins) {
let risultati = JSON.parse(coins);
if(country){
risultati.filter(coin => coin.state.commoneName === country || coin.state.officialName === country);
}
res.json(risultati);
})
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))