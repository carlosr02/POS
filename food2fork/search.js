var ClienteRest = require("node-rest-client").Client;
var rest = new ClienteRest();

var url = "http://food2fork.com/api/search?key=d039f02041493e66db56d697e923ca00";

var processar_resposta = function(data, response) {
  var resposta = JSON.parse(data);
  for (receita of resposta.recipes) {
    imprimir_receitas(receita);
  }
};

function imprimir_receitas(receita) {
  console.log("===================");
  console.log("Receita ID [" + receita.recipe_id + "]");
  console.log("Título: " + receita.title);
  console.log("URL: " + receita.f2f_url);
}

rest.get(url, processar_resposta);
