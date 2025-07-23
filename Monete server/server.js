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
    }
      res.send(risultati)
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

        res.send("Moneta aggiunta correttamente");
      });
    }
  );
});

app.get("/years", function (req, res) {

});
app.get("/years/:year", function (req, res) {
  let year = req.params.year;

});
app.get("/countries", function (req, res) {

});
app.get("/countries/:country", function (req, res) {
  let country = req.params.country;
  let result = [];
  fs.readFile(
    "./collezione.json",
    { encoding: "utf-8" },
    function (err, coins) {
      for (let coin of coins) {
        /*
        if (
          coin.state.commonName == country ||
          coin.state.officialName == country
        ) {
          let moneta = {
            value: coin.value,
            effigy: coin.effigy,
            year: coin.year,
          };

          result.push(moneta);
        }
        */
      }
    }
  );
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))