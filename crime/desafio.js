var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write("Bem vindo, Lin \n");

var info_do_crime;
var teoria;
var sair = false;

do {
    info_do_crime = ler_informacoes(function(info){ console.log(info); });
    teoria = ler_teoria();
    /*erros = verificar(info_do_crime, teoria);
    if (erros.length == 0) {
      sair = true;
    } else {
      console.log(imprimir_erro(erros));
    }*/
} while(sair)

function ler_informacoes(callback){
  var info = [];

  rl.question("Assassino: ", function(answer){
    info.push(answer);

    rl.question("Local: ", function(answer){
      info.push(answer);

      rl.question("Arma: ", function(answer){
        info.push(answer);
      })
    })
  })
  callback(info);
}

function ler_teoria(){
  var fs = require('fs');
  var crime = JSON.parse(fs.readFileSync('./desafio_crime.json'));

  if(crime.assassino == 0 || crime.local == 0 || crime.arma == 0){
    crime.assassino = Math.floor(Math.random() * crime.assassinos.length) + 1;
    crime.local = Math.floor(Math.random() * crime.locais.length) + 1;
    crime.arma = Math.floor(Math.random() * crime.armas.length) + 1;
  }

  var teoria = [crime.assassino, crime.local, crime.arma];
  return teoria;
}

function verificar(info_do_crime, teoria){
  var erros = [];
  for(i = 0; i < 3; i++){
    if(info_do_crime[i] != teoria[i]) erros.push(i + 1);
  }

  return erros;
}

function imprimir_erro(erros){
  var erro;
  if(erros.length > 1) erro = erros[Math.floor(Math.random() * erros.length)];
  else erro = erros[0];

  return erro;
}
