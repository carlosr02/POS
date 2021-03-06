var nome_arquivo = ler_entrada()
var extensao = verificar_extensao(nome_arquivo)
ler_arquivo(extensao, nome_arquivo)

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
	if(extensao == "json") ler_json(arquivo)
	else if(extensao == "xml") ler_xml(arquivo)
	else if(extensao == "csv") ler_csv(arquivo)
	else{
		console.log("Extensão inválida")
		process.exit(-1)
	}
}

function sortNumber(a,b){
	return a - b
}

function agrupar(numeros){
	numeros.sort(sortNumber)
	var conjuntos = []
	var conjunto = []
	for(var i = 0; i <= numeros.length; i++){
		if(conjunto.length == 0) conjunto.push(numeros[i])
		else if(numeros[i] - 1 == numeros[i-1]) conjunto.push(numeros[i])
		else{
			if(conjunto.length == 1) conjuntos.push("[" + conjunto[0] + "]")
			else conjuntos.push("[" + conjunto[0] + "-" + conjunto[conjunto.length-1] + "]")
			conjunto = []
			conjunto.push(numeros[i])
		}
	}

	escrever_arquivo("./saida.json", conjuntos)
}

function escrever_arquivo(nome_arquivo_saida,valores){
	var fs = require('fs')
  var json = valores
  var s = JSON.stringify(json)
  fs.writeFileSync(nome_arquivo_saida, s)
	console.log("Resultado salvo com sucesso")
}

function ler_json(arquivo){
	var resultado = require(arquivo)
	return agrupar(resultado.lista)
}

function ler_xml(arquivo, funcao){
	var fs = require('fs')
	var xmlParser = require('xml2js').parseString

	fs.readFile(arquivo, function(err,data){
		xmlParser(data, function(err,result){
			return agrupar(result.lista.numero)
		})
	})
}

function ler_csv(arquivo){
	var fs = require('fs')
	var csv = require('csv-string')

	fs.readFile(arquivo, 'utf8', function(err,data){
		var resultado = csv.parse(data)
		return agrupar(resultado[0])
	})
}
