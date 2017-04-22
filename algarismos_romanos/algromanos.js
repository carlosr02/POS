var strings = process.argv[2];

if (process.argv.length != 3) {
    process.exit(-1);
}


var json = require("./valores.json");
var resultado = 0;
var cont = [];

for (var i = strings.length - 1; i >= 0; i--) {
  if(strings[i] == strings[i - 1] && strings[i] == strings[i - 2] && strings[i] == strings[i - 3])
  {
    console.log("Número inválido");
    process.exit(-1);
  }
  else{
    if((strings[i] == "V" || strings[i] == "L" || strings[i] == "D") && strings[i] == strings[i - 1])
    {
      console.log("Número inválido");
      process.exit(-1);
    }
    else {
      if(json[strings[i]] < json[strings[i + 1]])
        resultado -= json[strings[i]]
      else resultado += json[strings[i]]
    }
  }


}
console.log(resultado)
