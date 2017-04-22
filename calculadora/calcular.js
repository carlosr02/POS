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

process.exit(0);

function ler_entrada(nome_do_arquivo) {
    var fs = require('fs');
    var arquivo = fs.readFileSync(nome_do_arquivo);
    var json = JSON.parse(arquivo);

    if (json.expressao != undefined) {
        return [json.expressao];
    }
    return [];
}


function converter_strings_em_expressoes(strings) {
    var expressao = strings[0];
    var expressoes = [];

    expressoes.push(expressao);

    return expressoes;
}

function executar_expressoes(expressoes) {
    var expressao = expressoes[0];
    var resultado = eval(expressao);
    var resultados = [];

    resultados.push(resultado);

    return resultados;
}

function imprimir_expressoes_e_resultados(expressoes, resultados) {
    console.log("expressão [" + expressoes[0] + "] = "+ resultados[0]);
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
