playState = {
	//loads everything
	preload:function() {
		//images
		this.game.load.image("testplayer", "assets/img/testplayer.png");
		this.game.load.image("testenemy", "assets/img/testenemy.png");
		this.game.load.image("mario_spritesheet", "assets/img/mario_spritesheet.png");
		this.game.load.image("collision_spritesheet", "assets/img/collision_spritesheet.png");

		//maps
		this.game.load.tilemap("test_stage", "assets/maps/test_stage.json", null, Phaser.Tilemap.TILED_JSON);

	},

	//creates everything
	create:function() {
		isdebug = 0;

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
		teststageMap = this.game.add.tilemap("test_stage");
		teststageMap.addTilesetImage("mario_spritesheet", "mario_spritesheet");
		teststageMap.addTilesetImage("collision_spritesheet", "collision_spritesheet");

		collisionLayer = teststageMap.createLayer("collision");
		mapLayer = teststageMap.createLayer("map");

		teststageMap.setCollision(101, true, collisionLayer);
		mapLayer.resizeWorld();


	
		//player
		testplayer = this.game.add.sprite(64, 64, "testplayer");
		this.game.physics.arcade.enable(testplayer);
		this.game.camera.follow(testplayer);


		//pathfinding
		pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
		pathfinder.setGrid(teststageMap.layers[1].data, [102]);


		//enemies
		testenemy = this.game.add.group();

		var enemies = prompt("How many Enemies to spawn?");
		this.spawnEnemy(teststageMap, mapLayer, enemies);
	},


	//main game loop
	update:function() {
		//collision
		this.game.physics.arcade.collide(testplayer, collisionLayer);
		this.game.physics.arcade.collide(testplayer, testenemy);
		this.game.physics.arcade.collide(testenemy, testenemy);
		this.game.physics.arcade.collide(testenemy, collisionLayer);

		//enemy actions
		testenemy.forEach(function(item) {

			//pathfinding portion
			let tilemap = teststageMap;
   	 		pathfinder.setCallbackFunction(function(path) {
        		item.path = path || [];

				goingX = item.path[1].x;
      			goingY = item.path[1].y;

      			finalX = item.path[item.path.length - 1].x;
      			finalY = item.path[item.path.length - 1].y;

      			console.log("Going to: " + (goingX * 32) + ", " + (goingY * 32) + "| Final: " + (finalX * 32) + ", " + (finalY * 32));
      				
      			console.log(item.x + " " + item.y);

				this.game.physics.arcade.moveToXY(item, goingX * 32, goingY * 32, 75);

      			if ( (item.x >= goingX * 32 - 1 && item.x <= goingX * 32 + 1) && (item.y >= goingY * 32 - 1 && item.y <= goingY * 32 + 1) ) {
      				item.path.splice(0, 0);
      			}




    		});

			pathfinder.preparePathCalculation([Math.round(item.x / 32), Math.round(item.y / 32)], [Math.round(testplayer.x / 32), Math.round(testplayer.y / 32)]);
    		pathfinder.calculatePath();

		}, this);
		
		this.keyPress();
	},


	//updates for Key Presses
	keyPress:function() {
		//going left and right
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.input.keyboard.isDown(Phaser.Keyboard.A)) {
			testplayer.body.velocity.x = -150;


		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.input.keyboard.isDown(Phaser.Keyboard.D)) {
			testplayer.body.velocity.x = 150;

		} else {
			testplayer.body.velocity.x = 0;
		}


		//going up and down
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP) || this.input.keyboard.isDown(Phaser.Keyboard.W)) {
			testplayer.body.velocity.y = -150;

		} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.input.keyboard.isDown(Phaser.Keyboard.S)) {
			testplayer.body.velocity.y = 150;

		} else {
			testplayer.body.velocity.y = 0;
		}


		//debug | NOTE: As of 0.1.0a, this does not work.
		if (this.input.keyboard.isDown(Phaser.Keyboard.K)) {
			if (isdebug == 0) {
				mapIDShow(this, getMapArray(teststageMap, collisionLayer));
			} else {
				mapIDHide(this, getMapArray(teststageMap, collisionLayer));
			}


			
		}
	},

	//spawns enemies
	spawnEnemy:function(tilemap, layer, times) {
		for (let i = 1; i <= times; i++) {
			let attmpt = 1;

			//Enemy Placement
			let enemyTileX = layer.getTileX(Math.random() * Math.round(tilemap.width));
			let enemyTileY = layer.getTileY(Math.random() * Math.round(tilemap.height));
			let enemyX = enemyTileX * 32;
			let enemyY = enemyTileY * 32;
			let enemyTile = tilemap.getTile(enemyTileX, enemyTileY, layer);

			//checks if the position is within map bounds
			if (enemyTileX >= tilemap.width / 32) {
				enemyTileX--;
				enemyX -= 32;
			} else if (enemyTileX <= 0) {
				enemyTileX++;
				enemyX += 32;
			}

			if (enemyTileY >= tilemap.length / 32) {
				enemyTileY--;
				enemyY -= 32;
			} else if (enemyTileY <= 0) {
				enemyTileY++;
				enemyY += 32;
			}

			console.log("Attempt " + attmpt + "|" + "Enemy " + i + " Setting Coordinates at: " + enemyX + ", " + enemyY);
			console.log("Attempt " + attmpt + "|" + "Enemy " + i + " Setting Tile Coordinates at: " + enemyTileX + ", " + enemyTileY);


			//Checks for obstacles
			while (enemyTile.index == 2 || (enemyX == testplayer.x && enemyY == testplayer.y)) {
				attmpt++;
				enemyTileX = Math.round((Math.random() * Math.round(tilemap.width)) - 1);
				enemyTileY = Math.round((Math.random() * Math.round(tilemap.height)) - 1);
				enemyX = enemyTileX * 32;
				enemyY = enemyTileY * 32;

				//checks if the position is within map bounds
				if (enemyTileX >= tilemap.width / 32) {
					enemyTileX--;
					enemyX -= 32;
				} else if (enemyTileX <= 0) {
					enemyTileX++;
					enemyX += 32;
				}

				if (enemyTileY >= tilemap.length / 32) {
					enemyTileY--;
					enemyY -= 32;
				} else if (enemyTileY <= 0) {
					enemyTileY++;
					enemyY += 32;
				}


				enemyTile = tilemap.getTile(enemyTileX, enemyTileY, layer);

				console.log("Attempt " + attmpt + "|" + "Enemy " + i + " Resetting Coordinates at: " + enemyX + ", " + enemyY);
				console.log("Attempt " + attmpt + "|" + "Enemy " + i + " Resetting Tile Coordinates at: " + enemyTileX + ", " + enemyTileY);
			}

			//creates the enemy
			enemy = testenemy.create(enemyX, enemyY, "testenemy");
			this.game.physics.arcade.enable(enemy);
			enemy.body.immovable = true;
			enemy.number = i;
		};
	}
};