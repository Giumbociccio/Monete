
$(document).ready(function () {

  // const API = `https://dwjks8-8000.csb.app/`;
  const API = `http://localhost:3000`;
  let moneteAPI = API;

  $.ajax({
    url: API,
    type: 'GET',
    success: function (data) {
      console.log(data);
    },
    error: function () {
      console.log("Server OFFLINE");
      alert("Ci scusiamo per il disagio: il server è OFFLINE.\nPer favore avviare il server");
    }
  });

  let pagina = $(location).attr("pathname").split("/");
  pagina = pagina[pagina.length - 1];

  console.log(`Sono in /${pagina}`);

  let infoParams = new URLSearchParams($(location).attr("search"));

  let ospite = infoParams.get("ospite");
  if (ospite) {
    $("a").attr("href", $("a").attr("href") + "?ospite=true")
  }
  if (pagina == "collezione.html") {
    moneteAPI += "/coins";
    console.log(moneteAPI);
    // moneteAPI += "/countries";
    // moneteAPI += `/countries/${stato}`;


    $.get(moneteAPI, function (data) {
      let html = `<ul>`;
      for (let i = 0; i < data.length; i++) {
        html += `<li>${data[i].state.commonName}`
        if (data[i].state.commonName != data[i].state.officialName) {
          html += ` (${data[i].state.officialName})`
        }

        html += `:<ul>
        <li>Value: ${data[i].value}€</li>
        <li>Effigy: ${data[i].effigy}</li>
        <li>Year: ${data[i].year}</li>
        </ul>
        </li>`;
      }
      html += `</ul>`;
      console.log(data);
      $("#collezione").html(html);
    });
  }

  //events
  $("#info").on({
    click: function () {
      $(this).siblings("p").slideToggle(200)
    }
  })

  $("form#aggiungi").on("submit", function (e) {
    e.preventDefault();
  })

  $("form#aggiungi").one({
    submit: function () {

      moneteAPI += "/coins";

      let stato = $("#stato").val();
      let valore = $("#valore").val();
      // let valuta = $("#valuta").val();
      let effige = $("#effige").val();
      let anno = $("#anno").val();

      let countriesAPI = `https://restcountries.com/v3.1/name/${stato}`;
      console.log("ora chiamo l'API restcountries");
      $.get(countriesAPI, function (paese) {
        console.log("API chiamata");


        let prefisso = Object.keys(paese[0].name.nativeName);
        prefisso = prefisso[0];
        let nomeUfficiale = paese[0].name.nativeName[prefisso].common;
        let nomeComune = paese[0].name.common;

        let moneta = {
          "state": {
            "commonName": nomeComune,
            "officialName": nomeUfficiale,
          },
          "value": valore,
          "effigy": effige,
          "year": anno,
        };
        console.log("Moneta: ", moneta);

        console.log("avvio il POST");

        // sto postando la moneta
        $.ajax({
          url: moneteAPI,
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(moneta),
          success: function (data) {
            $("#submit").text("Moneta aggiunta correttamente");
            $("#inserisci").show()
            console.log("Collezione: ", data);

            moneteAPI = API;
          },
          error: function (err) {
            console.error("Errore:", err);
            alert("Errore: ", err)
          }
        });


      });

    }
  })

});
