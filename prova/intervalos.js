var nome_arquivo = __dirname + "/" + process.argv[2]
//console.log(nome_arquivo)

var extensao = verificar_extensao(nome_arquivo)
//console.log(extensao)

var lista = ler_arquivo(extensao, nome_arquivo)
console.log(lista)

var intervalos = agrupar(lista)
console.log(intervalos)

escrever_arquivo("./saida.json", intervalos)

function verificar_extensao(nome_arquivo){
	var resultado = nome_arquivo.split('.')
	return resultado[resultado.length - 1]
}

function ler_arquivo(extensao, arquivo){
	var resultado = {}
	if(extensao == "json") resultado = ler_json(arquivo)
	else if(extensao == "xml") resultado = ler_xml(arquivo, function(err,data){
		return data
	})
	else if(extensao == "csv") resultado = ler_csv(arquivo)
	else{
		console.log("Extensão inválida")
		process.exit(-1)
	}
	return resultado
}

function agrupar(numeros){
	var conjuntos = []
	var conjunto = []
	for(var i = 0; i < numeros.length + 1; i++){
		if(conjunto.length == 0) conjunto.push(numeros[i])
		else if(numeros[i] + 1 == numeros[i+1]) conjunto.push(numeros[i])
		else{
			conjunto.push(numeros[i])
			conjuntos.push(conjunto)
			conjunto = []
		}
	}
	return conjuntos
}

function escrever_arquivo(nome_arquivo_saida,valores){
	var fs = require('fs');
  	var json = {};
  	var s;
  	for(var i = 0; i < valores.length; i++){
  		json["intervalos"] = valores
  	}
  	s = JSON.stringify(json);
  	fs.writeFileSync(nome_arquivo_saida, s);
}

function ler_json(arquivo){
	var resultado = require(arquivo)
	return resultado.lista
}

function ler_xml(arquivo, funcao){
	var fs = require('fs')
	var xmlParser = require('xml2js').parseString

	fs.readFile(arquivo, function(err,data){
		xmlParser(data, funcao)
	})
}

function ler_csv(arquivo){
	var fs = require('fs')
	var csv = require('csv-string')

	fs.readFile(arquivo, 'utf8', function(err,data){
		var resultado = csv.parse(data)
		return resultado
	})
}
