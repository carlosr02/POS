var ClienteRest = require('node-rest-client').Client;
var rest = new ClienteRest();

var url = "http://api.pgi.gov.br/api/1/serie/27.json";
var estados = require("./ufs.json")
var rn;

for(estado of estados.valores){
  if(estado.nome == "Rio Grande do Norte") rn = estado;
}

var uf = {};
uf.id = rn.id;
uf.nome = rn.nome;

var fontes = [];
fontes[0] = url;
fontes[1] = estados.url_origem;

var processar_resposta = function(data, response) {
    var result = data.valores;
    var valores = [];
    for (obj of result) {
      var valor = {};
      if(obj.estado_ibge == rn.id) {
        valor.ano = obj.ano;
        valor.municipios_atendidos = obj.valor;
        valores.push(valor);
      }
    }
    salvar_valores("resultado.json", valores)
};

rest.get(url,processar_resposta);

function calcular_media(valores){
  var total = 0;
  for(valor of valores) total += valor.municipios_atendidos;
  return Math.round(total/valores.length);
}

function salvar_valores(nome_do_arquivo, valores) {
  var fs = require('fs');
  var json = {};
  var s;
  json["uf"] = uf;
  json["fontes"] = fontes;
  json["valores"] = valores;
  json["media"] = calcular_media(valores);
  s = JSON.stringify(json);
  fs.writeFileSync(nome_do_arquivo, s);
}
