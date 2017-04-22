#!/usr/bin/env node

// uso:
//      ./calcular.js expressao.json
//      node calcular.js expressao.json

// vetor com strings das expressões
var strings = ler_entrada(process.argv[2]);

if (strings.length == 0) {
    ajuda();
    process.exit(-1);
}

var expressoes = converter_strings_em_expressoes(strings);
var resultados = executar_expressoes(expressoes);
imprimir_expressoes_e_resultados(expressoes, resultados);
salvar_expressoes_e_resultados("./saida.json", expressoes, resultados);

process.exit(0);

function ler_entrada(nome_do_arquivo) {
    var fs = require('fs');
    // var arquivo = fs.readFileSync(nome_do_arquivo);
    // var json = JSON.parse(arquivo);
    var json = require(nome_do_arquivo);

    if (json.expressao != undefined) {
        return [json.expressao];
    }
    else if(json.expressoes != undefined){
      return json.expressoes;
    }
    return [];
}


function converter_strings_em_expressoes(strings) {
    var expressao;
    var expressoes = [];

    for (var i = 0; i < strings.length; i++) {
      expressao = strings[i]
      expressoes.push(expressao);
    }

    return expressoes;
}

function executar_expressoes(expressoes) {
    var expressao;
    var resultado;
    var resultados = [];
    for (var i = 0; i < expressoes.length; i++) {
      resultado = eval(expressoes[i]);
      resultados.push(resultado);
    }
    return resultados;
}

function imprimir_expressoes_e_resultados(expressoes, resultados) {
  for (var i = 0; i < expressoes.length; i++) {
    console.log("expressão [" + expressoes[i] + "] = "+ resultados[i]);
  }
}

function salvar_expressoes_e_resultados(nome_do_arquivo, expressoes, resultados) {
  var fs = require('fs');
  var json = {};
  var s;
  for(var i = 0; i< expressoes.length; i++)
   {
     json[expressoes[i]]=resultados[i];
   }
  s = JSON.stringify(json);
  fs.writeFileSync(nome_do_arquivo, s);
}

function ajuda() {
    console.log("calculadora do problema http://dojopuzzles.com/problemas/exibe/avaliando-expressoes-matematicas/");
    console.log("Usando o arquivo 'calculadora.js':");
    console.log("\tnode calculadora [arquivo json]");
    console.log("Exemplo de arquivo 'json':");
    console.log("\t{\"expressao\" : \"3 * 2 + 5\"}");
    console.log("\t{");
    console.log("\t\t\"expressoes\" : [");
    console.log("\t\t\t\"3 * 2 + 5\",");
    console.log("\t\t\t\"6 / 2 - 5\",");
    console.log("\t\t\t\"3 * 2 + 5 + 6 / 2 - 5\" ]");
    console.log("\t}");
}
