if (process.argv.length != 3){
  console.log("Digite um valor")
  process.exit(-1)
}

var romano = process.argv[2].toUpperCase()
var valores_romano = require("./valores_romano.json")
var valores_hexadecimal = require("./valores_hexadecimal.json")

var decimal = converter_romano_em_decimal(romano)
console.log("Decimal: " + decimal)
var binario = converter_decimal_em_binario(decimal)
console.log("Binário: " + binario)
var hexadecimal = converter_decimal_em_hexadecimal(decimal)
console.log("Hexadecimal: " + hexadecimal)

process.exit(0);

function converter_romano_em_decimal(romano){
  var resultado = 0

  for(i = romano.length - 1; i >= 0; i--){
    //TODO: verificar se algarismo se repete mais de 3 vezes, mas não seguidamente, como em: XXXIX (39)
    if(romano.split(romano[i]).length-1 > 3 || (romano.split(romano[i]).length-1 > 1 && (romano[i] == "V" || romano[i] == "L" || romano[i] == "D"))){
      console.log("Número inválido")
      process.exit(-1)
    }

    if(valores_romano[romano[i]] < valores_romano[romano[i + 1]])
      resultado -= valores_romano[romano[i]]

    else
      resultado += valores_romano[romano[i]]
  }

  return resultado
}

function converter_decimal_em_binario(decimal){
  var resultado = []

  while(decimal > 0){
    if(decimal % 2 == 0) resultado.unshift(0)
    else resultado.unshift(1)
    decimal = parseInt(decimal / 2)
  }

  return resultado.join().replace(/,/g, '')
}

function converter_decimal_em_hexadecimal(decimal){
  var resultado = []

  while(decimal > 0){
    resultado.unshift(decimal % 16)
    decimal = parseInt(decimal / 16)
  }

  for(i = 0; i < resultado.length; i++){
    resultado[i] = valores_hexadecimal[resultado[i]]
  }

  return resultado.join().replace(/,/g, '')
}
