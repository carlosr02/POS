var nome_arquivo = ler_entrada()
//console.log(nome_arquivo)

var extensao = verificar_extensao(nome_arquivo)
//console.log(extensao)

var lista = ler_arquivo(extensao, nome_arquivo)
//console.log(lista)

var intervalos = agrupar(lista)
//console.log(intervalos)

escrever_arquivo("./saida.json", intervalos)

function ler_entrada(){
	if(process.argv[2] == undefined){
		console.log("Digite o nome do arquivo a ser processado")
		process.exit(-1)
	}
	else return __dirname + "/" + process.argv[2]
}

function verificar_extensao(nome_arquivo){
	var resultado = nome_arquivo.split('.')
	return resultado[resultado.length - 1]
}

function ler_arquivo(extensao, arquivo){
	var resultado
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
	for(var i = 0; i <= numeros.length; i++){
		if(conjunto.length == 0) conjunto.push(numeros[i])
		else if(numeros[i] - 1 == numeros[i-1]) conjunto.push(numeros[i])
		else{
			conjuntos.push(conjunto)
			conjunto = []
			conjunto.push(numeros[i])
		}
	}
	return conjuntos
}

function escrever_arquivo(nome_arquivo_saida,valores){
	var intervalos = []
	for(var i = 0; i < valores.length; i++){
		var conjunto = valores[i]
		if(conjunto.length == 1) intervalos.push("[" + conjunto[0] + "]")
		else intervalos.push("[" + conjunto[0] + "-" + conjunto[conjunto.length-1] + "]")
	}

	var fs = require('fs');
  var json = intervalos;
  var s = JSON.stringify(json);
  fs.writeFileSync(nome_arquivo_saida, s);
	console.log("Resultado salvo com sucesso")
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
