var fs = require('fs');
var crime = JSON.parse(fs.readFileSync('./crime.json'));

if(crime.assassino == 0 || crime.local == 0 || crime.arma == 0)
{
  crime.assassino = 1;//Math.random(1, crime.assassinos.length);
  crime.local = 1;//Math.random(1, crime.locais.length);
  crime.arma = 1;//Math.random(1, crime.armas.length);
}
console.log(crime.assassino);
// crime.local
// crime.arma
console.log("Eu sou a testemunha");

if (process.argv.length != 5) {
  console.log("Você precisa formular uma teoria com assassino, local e arma");
  process.exit(-1);
}


console.log('Lin, você pergunta se o assassino é ' + process.argv[2]);
console.log('Lin, você pergunta se o local do crime é ' + process.argv[3]);
console.log('Lin, você pergunta se a arma do crime é ' + process.argv[4]);
var arrayerro = [];

//condição certa
if(parseInt(process.argv[2]) == crime.assassino && parseInt(process.argv[3]) == crime.local && parseInt(process.argv[4]) == crime.arma) console.log('0')

//errado
else{
  // 1 erro
  if(parseInt(process.argv[2]) != crime.assassino)
  {
    arrayerro.push(1);
  }

  if( parseInt(process.argv[3]) != crime.local)
  {
    arrayerro.push(2);
  }
  if(parseInt(process.argv[4]) != crime.arma)
  {
    arrayerro.push(3);
  }
  console.log(arrayerro.length);
  console.log(arrayerro[Math.random(0, arrayerro.length)])
  console.log(Math.random(0, arrayerro.length))
}
