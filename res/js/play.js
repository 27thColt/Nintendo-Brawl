playState = {
	preload:function() {
		//images
		game.load.image("player1", "assets/img/player1.png");


		//maps
		this.game.load.tilemap('test_stage', 'assets/map/test_stage.json', null, Phaser.Tilemap.TILED_JSON);game.load.image('sprites', 'assets/sprites.png');
	},
	//creates everything
	create:function() {
		//Players 1 and 2
		this.player1 = game.add.sprite(this.game.width / 2 - 64, this.game.height / 2, "player1");

		this.game.time.desiredFps = 30;




		//START OF PHYSICS
/*		this.game.physics.startSystem(Phaser.Physics.P2JS);
    	this.game.physics.p2.gravity.y = 100;
    	this.game.physics.p2.setBoundsToWorld();
    	this.game.physics.p2.defaultRestitution = 0.8;

    	this.game.physics.p2.enable(this.player1);

    	this.player1.body.friction = 0;
    	this.player1.body.collideWorldBounds = true;
		this.player1.body.immovable = true;*/

		//END OF PHYSICS

		//key capturing
		this.game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN,
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.SPACEBAR]);
	},


	//main game loop
	update:function() {

		this.keyPress();
	},


	//Updates for Key Presses
	keyPress:function() {

	}
};