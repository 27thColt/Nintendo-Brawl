//create the game
game = new Phaser.Game(856, 642, Phaser.AUTO, "game");

//adds the states
game.state.add("play", playState);


game.state.start("play");