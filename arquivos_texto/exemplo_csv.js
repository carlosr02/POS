var fs = require('fs');
var csv = require('csv-string');

var arquivo = './natalcard.csv';
var resultado;

fs.readFile(arquivo, 'utf8', (err, data) => {
    resultado = csv.parse(data)
    console.log(resultado[1][0])
    console.log(resultado[1][1])
    console.log(resultado[1][2])
    console.log(resultado[1][3])
    console.log(resultado[1][4])
});
