playState = {
	//loads everything
	preload:function() {
		//images
		this.game.load.image("player", "assets/img/player1.png");
		this.game.load.image("spritesheet", "assets/img/spritesheet.png");

		//maps
		this.game.load.tilemap("test_stage", "assets/maps/test_stage.json", null, Phaser.Tilemap.TILED_JSON);

	},

	//creates everything
	create:function() {
		this.game.time.desiredFps = 30;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);




		//maps
		this.teststage = this.game.add.tilemap("test_stage");
		this.teststage.addTilesetImage("mario", "spritesheet");
		this.teststage.map = this.teststage.createLayer("map");
		this.teststage.setCollision(2, true, this.teststage.map);
		this.teststage.map.resizeWorld();


		

		//player
		this.player = this.game.add.sprite(64, 64, "player");
		this.game.physics.arcade.enable(this.player);
		this.game.camera.follow(this.player);





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
		this.game.physics.arcade.collide(this.player, this.teststage.map);
		this.keyPress();
	},


	//Updates for Key Presses
	keyPress:function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y = -150;

		} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.body.velocity.y = 150;

		} else {
			this.player.body.velocity.y = 0;
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.velocity.x = -150;

		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.velocity.x = 150;

		} else {
			this.player.body.velocity.x = 0;
		}
	}
};