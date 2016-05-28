playState = {
	//loads everything
	preload:function() {
		//images
		this.game.load.image("testplayer", "assets/img/testplayer.png");
		this.game.load.image("testenemy", "assets/img/testenemy.png");
		this.game.load.image("spritesheet", "assets/img/spritesheet.png");




		//maps
		this.game.load.tilemap("test_stage", "assets/maps/test_stage.json", null, Phaser.Tilemap.TILED_JSON);

	},

	//creates everything
	create:function() {
		//key capturing
		this.game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN,
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.SPACEBAR
		]);


		this.game.time.desiredFps = 30;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);




		//maps
		this.teststage = this.game.add.tilemap("test_stage");
		this.teststage.addTilesetImage("mario", "spritesheet");
		this.teststage.map = this.teststage.createLayer("map");
		this.teststage.setCollision(2, true, this.teststage.map);
		this.teststage.map.resizeWorld();


		

		//player
		this.testplayer = this.game.add.sprite(64, 64, "testplayer");
		this.game.physics.arcade.enable(this.testplayer);
		this.game.camera.follow(this.testplayer);

		//enemies
		this.testenemy = this.game.add.group();
		this.game.physics.enable(this.testenemy);

		var enemies = prompt("How many Enemies to spawn?")
		this.spawnEnemy(this.teststage, this.teststage.map, enemies);
	},


	//main game loop
	update:function() {
		//collision
		this.game.physics.arcade.collide(this.testplayer, this.teststage.map);
		this.game.physics.arcade.collide(this.testplayer, this.testenemy);
		this.game.physics.arcade.collide(this.testenemy, this.teststage.map);

		
		this.keyPress();
	},


	//updates for Key Presses
	keyPress:function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP) || this.input.keyboard.isDown(Phaser.Keyboard.W)) {
			this.testplayer.body.velocity.y = -150;

		} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.input.keyboard.isDown(Phaser.Keyboard.S)) {
			this.testplayer.body.velocity.y = 150;

		} else {
			this.testplayer.body.velocity.y = 0;
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.testplayer.body.velocity.x = -150;

		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.input.keyboard.isDown(Phaser.Keyboard.D)) {
			this.testplayer.body.velocity.x = 150;

		} else {
			this.testplayer.body.velocity.x = 0;
		}
	},

	//spawns enemies
	spawnEnemy:function(tilemap, layer, times) {
		for (var i = 1; i <= times; i++) {
			var attmpt = 1;

			//Enemy Placement
			var enemyTileX = Math.ceil((Math.random() * Math.ceil(tilemap.width)) - 1);
			var enemyTileY = Math.ceil((Math.random() * Math.ceil(tilemap.height)) - 1);
			var enemyX = enemyTileX * 32;
			var enemyY = enemyTileY * 32;
			enemyTile = tilemap.getTile(enemyTileX, enemyTileY, layer);

			console.log("Attempt " + attmpt + "|" + "Enemy " + i + " Setting Coordinates at: " + enemyX + ", " + enemyY);
			console.log("Attempt " + attmpt + "|" + "Enemy " + i + " Setting Tile Coordinates at: " + enemyTileX + ", " + enemyTileY);

			//Checks for obstacles
			while (enemyTile.index == 2) {
				attmpt++;
				enemyTileX = Math.ceil((Math.random() * Math.ceil(tilemap.width)) - 1);
				enemyTileY = Math.ceil((Math.random() * Math.ceil(tilemap.height)) - 1);
				enemyX = enemyTileX * 32;
				enemyY = enemyTileY * 32;

				enemyTile = tilemap.getTile(enemyTileX, enemyTileY, layer);

				console.log("Attempt " + attmpt + "|" + "Enemy " + (i + 1) + " Resetting Coordinates at: " + enemyX + ", " + enemyY);
				console.log("Attempt " + attmpt + "|" + "Enemy " + (i + 1) + " Resetting Tile Coordinates at: " + enemyTileX + ", " + enemyTileY);
			}

			var enemy = this.testenemy.create(enemyX, enemyY, "testenemy");
		};
	}
};