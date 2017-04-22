var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write("Type 'help' for commands \n");
rl.write("Square numbers:\n");

function Player(name){
  this.name = name;
}

function createPlayer(number, callback){
  rl.question("Enter player " + number + " name? ", function(answer){
    var player = new Player(answer);

    callback(player);
  })
}

createPlayer(1, function(player1){
  createPlayer(2,function(player2){
    console.log("logging name after making players " + player1.name);
    console.log("logging name after making players " + player2.name);
  })
})
