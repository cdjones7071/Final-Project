// StateData independent of the scene
Crafty.c('StateData', {
	// We should only ever have a single StateData, if we have more we probably still want
	// access to this data, so keep it shared:
	sceneFlags: {
		Game: {
			mwinDisplayed: false,
			pickaxeGiven: false
		},
		
		HiddenForestBottom: {
			mwinDisplayed: false
		},
		
		HiddenForestLeft: {
			mwinDisplayed: false
		},
		
		HiddenForestTopLeft: {
			mwinDisplayed: false
		},
	},
	
	// List the # of any given item the player has in inventory
	// (NOTE: This will be a list of ALL the player own-able items in the game!)
	inventory: {
		MAX_ITEMS: 3,	// The player can only hold _3_ items at any given point
		item_count: 0,
		pickaxe: 0,
		sword: 0,
	},
	
	MAX_LIFE: 3,
	life: 3,
	
	coinCount: 0,

	init: function() {
		MAX_LIFE = 3;
		life = 3;
		coinCount = 0;
	},
	
	remove: function() {
		console.log('WARNING: StateData is being deleted!!!!!');
	}
	
});

// Dummy component that gets reset on scene change, but doesn't show up anywhere.
Crafty.c('Dummy', {
	init: function() {
		this.requires('2D');
	}
});

// PersistingDummyImage
Crafty.c('PersistingDummyImage', {
	init: function() {
		this.requires('2D, Canvas, Image, Persist');
	}
});

// The entire HUD is contained in this component
Crafty.c('HUD', {
	spriteTiles: Array,
	hearts: Array,
	goldCoin: Object,
	
	drawItems: function() {
		for (var i = 0; i < spriteTiles.length; ++i) {
			spriteTiles[i].destroy();
		}
		inventory:
		{
			for (var i = 0; i < Game.stateData.inventory['item_count']; ++i) {
				// Iterate over each item, incrementing i and checking bounds at every item
				for (var k = 0; k < Game.stateData.inventory['pickaxe']; ++k) {
					spriteTiles[i] = Crafty.e('Pickaxe').absoluteAt(Game.width()/2 - (106/2) + 3 + (i*33), 3);
					spriteTiles[i].addComponent('Persist');
					spriteTiles[i].removeComponent('Solid', false);
					spriteTiles[i].z = 10000;
					++i;
					if (i >= Game.stateData.inventory['MAX_ITEMS']) {
						break inventory;
					}
				}
				
				for (var k = 0; k < Game.stateData.inventory['sword']; ++k) {
					spriteTiles[i] = Crafty.e('Sword').absoluteAt(Game.width()/2 - (106/2) + 3 + (i*33), 3);
					spriteTiles[i].removeComponent('Solid', false);
					spriteTiles[i].addComponent('Persist');
					spriteTiles[i].z = 10000;
					++i;
					if (i >= Game.stateData.inventory['MAX_ITEMS']) {
						break inventory;
					}
				}
			}
		}
	},
	
	drawLife: function() {
		for (var i = 0; i < hearts.length; ++i) {
				hearts[i].destroy();
		}
		for (var i = 0; i < Game.stateData.life; ++i) {
			hearts[i] = Crafty.e('PersistingDummyImage')
				.image('assets/heart.png')
				.attr({x: Game.width()/2 + 60 + i * 20, y: 20 - 15/2, w: 17, h: 15});
			hearts[i].z = 5000;
		}
		
		if (Game.stateData.life <= 0) {
			Crafty.trigger('dead');
		}
	},
	
	init: function() {
		spriteTiles = [];
		hearts = [];
		this.requires('2D, Canvas, Image, Persist')
			.image('assets/itembackdrop.png')
			.attr({x: Game.width()/2 - (106/2), y: 0, w: 106, h: 40});
		this.z = 5000;
					
		Crafty.e('Coin').absoluteAt(Game.width()/2 - 85, 0)
			.addComponent('Persist')
			.z = 10000;
			
		var coinText = Crafty.e('2D, DOM, Text, Persist')
			.attr({x: Game.width()/2 - 118, y: 9, w: 40, h: 20})
			.textColor('#d5c800', 1.0)
			.textFont({ family: 'Arial', size: '18px' })
			.css({'text-align': 'center'})
			.text(function() { return Game.stateData.coinCount; });
		
		coinText.bind('pickedUpCoin', function(e) {
			Game.stateData.coinCount += e;
			this.text(function() { return Game.stateData.coinCount; });
		});
		
		this.bind('obtainedItem', function(e) {
			this.drawItems();
		});
		this.bind('usedItem', function(e) {
			this.drawItems();
		});
		
		this.bind('damaged', function(e) {
			Game.stateData.life -= e;
			this.drawLife();
		});
		
		this.bind('healed', function(e) {
			if (Game.stateData.life < Game.stateData.MAX_LIFE) {
				Game.stateData.life += e;
				this.drawLife();
			}
		});
		
		this.bind('dead', function() {
			mwin("The conclusion of this would-be hero seems to be a premature death.  It's not like anyone didn't expect it to end like this.  And yet...it is still so...satisfying...  [F5] to restart.", Game.currentZone);
			Crafty.background('rgb(180, 18, 17)');
			Crafty.e('Dummy')
				.bind('mwinLoad', function() {
					Crafty.stop(false);
				});
		});
		
		this.bind('winGame', function() {
			Crafty.scene('winGame');
		});
		
		this.drawLife();
	}
});

// The Grid component allows an element to be located
// on a grid of tiles
Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},
	
	// Locate this entity at the given position on the grid
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	},
	
	absoluteAt: function(x, y) {
		this.attr({ x: x, y: y});
		return this;
	}
});

// An "Actor" is an entity that is drawn in 2D on canvas
// via our logical coordinate grid
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});

Crafty.c('Player', {
	attack: function() {
		var attackFrame = true;
		if (Game.stateData.inventory['sword'] > 0) {
			Game.stateData.inventory['sword']--;
			Game.stateData.inventory['item_count']--;
			Crafty.trigger('usedItem', 'sword');
			
			Game.player.sprite(7, 4, 1, 1);
			Crafty.e('Delay').delay(function() {
				if (attackFrame) {
					Game.player.sprite(0, 0, 1, 1);
				} else {
					Game.player.sprite(7, 4, 1, 1);
				}
				attackFrame = !attackFrame;
			}, 40, 6);

		}
	},

	init: function() {
		this.requires('Actor, Fourway, Collision, Canvas, spr_player')
			.fourway(4)
			.bind('KeyDown', function(e) {
				switch (e.key)
				{
					case Crafty.keys['E']:
						Game.playerKeys['E'] = true;
						break;
					case Crafty.keys['R']:
						this.attack();
						break;
				}
			})
			.bind('KeyUp', function(e) {
				switch (e.key)
				{
					case Crafty.keys['E']:
						Game.playerKeys['E'] = false;
						break;
				}
			})
			.stopOnSolids()
	},
	
	// Registers a stop-movement function to be called when
	// this entity hits an entity with the "Solid" component
	stopOnSolids: function() {
		this.onHit('Rock', function(hit) {
			if (Game.playerKeys['E']) {
				if (Game.stateData.inventory['pickaxe'] > 0) {
					hit[0].obj.destroy();
					Game.stateData.inventory['pickaxe']--;
					Game.stateData.inventory['item_count']--;
					Crafty.trigger('usedItem', 'pickaxe');
				}
			}
		});
		
		this.onHit('Pickaxe', function(hit) {
			if (hit[0].obj.has('Solid')) {
				if (Game.stateData.inventory['item_count'] <= Game.stateData.inventory['MAX_ITEMS'])
				{
					hit[0].obj.destroy();
					Game.stateData.inventory['pickaxe']++;
					Game.stateData.inventory['item_count']++;
					Crafty.trigger('obtainedItem', 'pickaxe');
				}
			}
		});
		
		this.onHit('Heart', function(hit) {
			hit[0].obj.destroy();
			Crafty.trigger('healed', 1);
		});
		
		this.onHit('Coin', function(hit) {
			hit[0].obj.destroy();
			Crafty.trigger('pickedUpCoin', 1);
		});
		
		this.onHit('Sword', function(hit) {
			if (hit[0].obj.has('Solid')) {
				if (Game.stateData.inventory['item_count'] <= Game.stateData.inventory['MAX_ITEMS'])
				{
					hit[0].obj.destroy();
					Game.stateData.inventory['sword']++;
					Game.stateData.inventory['item_count']++;
					Crafty.trigger('obtainedItem', 'sword');
				}
			}
		});
		
		this.onHit('Void', function(hit) {
			// Change to next area
			var up		= false;
			var down	= false;
			var left	= false;
			var right	= false;
			// Determine players next coordinates
			Game.playerX = Math.floor(hit[0].obj.x/32);
			Game.playerY = Math.floor(hit[0].obj.y/32);
			if (Game.playerX < 0) {
				Game.playerX = 0;
				left = true;
			} else if (Game.playerX == Game.map_grid.width) {
				Game.playerX = (Game.map_grid.width - 1);
				right = true;
			}
			if (Game.playerY <= 0) {
				Game.playerY = 0;
				up = true;
			} else if (Game.playerY == Game.map_grid.height) {
				Game.playerY = (Game.map_grid.height - 1);
				down = true;
			}
			if (!(up && down) || !(left && right)) {
				if (Game.playerX == 0) {
					Game.playerX = (Game.map_grid.width - 1);
				} else if (Game.playerX == (Game.map_grid.width - 1)) {
					Game.playerX = 0;
				}
				if (Game.playerY == 0) {
					Game.playerY = (Game.map_grid.height - 1);
				} else if (Game.playerY == (Game.map_grid.height - 1)) {
					Game.playerY = 1;
				}
				
				if ( up ) {
					var curScene = Game.currentZone;
					Game.currentZone = Game.zones[curScene].topScene;
					Crafty.scene(Game.zones[curScene].topScene);
				} else if ( down ) {
					var curScene = Game.currentZone;
					Game.currentZone = Game.zones[curScene].botScene;
					Crafty.scene(Game.zones[curScene].botScene);
				} else if ( left ) {
					var curScene = Game.currentZone;
					Game.currentZone = Game.zones[curScene].leftScene;
					Crafty.scene(Game.zones[curScene].leftScene);
				} else if ( right ) {
					var curScene = Game.currentZone;
					Game.currentZone = Game.zones[curScene].rightScene;
					Crafty.scene(Game.zones[curScene].rightScene);
				}
			}
		});
		
		this.onHit('Solid', function(hit) {
			if (this._movement) {
				this.x -= this._movement.x;
				if (this.hit('Solid') != false) {
					this.x += this._movement.x;
					this.y -= this._movement.y;
					if (this.hit('Solid') != false) {
						this.x -= this._movement.x;
					}
				}
			} else {
				this._speed = 0;
			}
		});
		
		return this;
	},
});

// AI
Crafty.c('EvilWizard', {
	canAttack: true,
	movementData: Object,
	frameCounter: 0,
	
	init: function() {
		canAttack = true;
		frameCounter = 0;
		this.movementData = {};
		this.requires('Actor, Collision, spr_evil_wizard')
		.stopOnSolids()
		
		this.bind('usedItem', function(e) {
			if (e == 'sword') {
				var dx = this.x - Game.player.x;
				var dy = this.y - Game.player.y;
				var dist = Math.sqrt(dx*dx+dy*dy);
				if (dist <= 32*2) {
					Crafty.trigger('winGame');					
					// Kill the NPC
					this.destroy();
				}
			}
		});
		
		this.bind('EnterFrame', function(e) {
			frameCounter += 1;
			if ( frameCounter > 250 ) {
				var dx = this.x - Game.player.x;
				var dy = this.y - Game.player.y;
				var nx = dx / Game.width();
				var ny = dy / Game.height();
				var fb = Crafty.e('Fireball').at(Math.floor(this.x/32), Math.floor(this.y/32));
				fb.speedX *= nx;
				fb.speedY *= ny;
				frameCounter = 0;
				frameCounter = 0;
				
			}
			var speed = 1;
			if ( this.x < Game.player.x + 128 ) {
				this.x += speed;
				this.movementData.x = speed;
			} else {
				this.x -= speed;
				this.movementData.x = -speed;
			}
			if ( this.y < Game.player.y + 128 ) {
				this.y += speed;
				this.movementData.y = speed;
			} else {
				this.y -= speed;
				this.movementData.y = -speed;
			}
		});
	},
	
	stopOnSolids: function() {
		this.onHit('Solid', function(hit) {
			this.x -= this.movementData.x;
			if (this.hit('Solid') != false) {
				this.x += this.movementData.x;
				this.y -= this.movementData.y;
				if (this.hit('Solid') != false) {
					this.x -= this.movementData.x;
				}
			}
		});
		return this;
	},
});

Crafty.c('NpcKnight', {
	canAttack: true,
	movementData: Object,
	
	init: function() {
		canAttack = true;
		this.movementData = {};
		this.requires('Actor, Collision, spr_npc_knight')
		.stopOnSolids()
		.collideWithPlayer();
		
		this.bind('usedItem', function(e) {
			if (e == 'sword') {
				var dx = this.x - Game.player.x;
				var dy = this.y - Game.player.y;
				var dist = Math.sqrt(dx*dx+dy*dy);
				if (dist <= 32*2) {
					Crafty.trigger('NpcKilled', 'NpcKnight');
					// Chance to drop an item
					var rnd = Math.floor((Math.random()*10)+1); // Get a number between 1 and 10
					switch (rnd)
					{
					case 0:
						Crafty.e('Coin').at(Math.floor(this.x/32), Math.floor(this.y/32));
						break;
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						Crafty.e('Heart').at(Math.floor(this.x/32), Math.floor(this.y/32));
						break;
					case 6:
					case 7:
					case 8:
						Crafty.e('Sword').at(Math.floor(this.x/32), Math.floor(this.y/32));
						break;
					}
					
					// Kill the NPC
					this.destroy();
				}
			}
		});
		
		this.bind('EnterFrame', function(e) {
			// var dx = this.x - Game.player.x;
			// var dy = this.y - Game.player.y;
			// var dist = Math.sqrt(dx*dx+dy*dy);
			// var vx = dx/dist * this.velocity;
			// var vy = dy/dist * this.velocity;
			// vx = vx + this.velocity*e.dt;
			// vy = vy + this.velocity*e.dt;
			// this.x += vx;
			// this.y += vy;
			var speed = 1;
			if ( this.x < Game.player.x + 32 ) {
				this.x += speed;
				this.movementData.x = speed;
			} else {
				this.x -= speed;
				this.movementData.x = -speed;
			}
			if ( this.y < Game.player.y + 32 ) {
				this.y += speed;
				this.movementData.y = speed;
			} else {
				this.y -= speed;
				this.movementData.y = -speed;
			}
		});
	},
	
	collideWithPlayer: function() {
		this.onHit('Player', function(hit) {
			if (canAttack) {
				Crafty.trigger('damaged', 1);
				canAttack = false;
				Crafty.e('Delay').delay(function() {
						canAttack = true;
				}, 350, 0);
			}
		});
	},
	
	stopOnSolids: function() {
		this.onHit('Solid', function(hit) {
			this.x -= this.movementData.x;
			if (this.hit('Solid') != false) {
				this.x += this.movementData.x;
				this.y -= this.movementData.y;
				if (this.hit('Solid') != false) {
					this.x -= this.movementData.x;
				}
			}
		});
		return this;
	},
});

Crafty.c('Fireball', {
	init: function() {
		var speedX = 1, speedY = 1;
		var velocity = 5;
		var reflected = false;
		this.requires('Actor, Collision, spr_fireball')
		.collideWithPlayer();
		
		this.bind('usedItem', function(e) {
			if (e == 'sword') {
				var dx = this.x - Game.player.x;
				var dy = this.y - Game.player.y;
				var dist = Math.sqrt(dx*dx+dy*dy);
				if (dist <= 32*2) {					
					// Reflect the fireball back
					this.speedX = -this.speedX;
					this.speedY = -this.speedY;
					this.reflected = true;
				}
			}
		});
		
		this.bind('EnterFrame', function(e) {
			this.x += this.speedX * this.velocity;
			this.y += this.speedY * this.velocity;
		});
	},
	
	collideWithPlayer: function() {
		this.onHit('Player', function(hit) {
			Crafty.trigger('damaged', 2);
			this.destroy();
		});
	},
});

// Scripty stuffs
Crafty.c('NextArea', {
	init: function() {
		this.requires('Actor, Solid');
	},
});

Crafty.c('InvisBlocker', {
	init: function() {
		this.requires('Actor');
	},
});

// Basic solid tiles
// Image-based:
Crafty.c('Heart', {
	init: function() {
		this.requires('Actor, Image, Solid')
			.image('assets/heart.png');
	},
});

Crafty.c('Sword', {
	init: function() {
		this.requires('Actor, Image, Solid')
			.image('assets/sword.png');
	},
});

Crafty.c('Coin', {
	init: function() {
		this.requires('Actor, Solid, spr_coin')
	},
});

Crafty.c('Amulet', {
	init: function() {
		this.requires('Actor, Solid, spr_amulet')
	},
});

Crafty.c('WoodenWall', {
	init: function() {
		this.requires('Actor, Solid, spr_wooden_wall');
	},
});

Crafty.c('Hay', {
	init: function() {
		this.requires('Actor, Solid, spr_hay');
	},
});

Crafty.c('LeftEdgeHay', {
	init: function() {
		this.requires('Actor, Solid, spr_left_edge_hay');
	},
});

Crafty.c('RightEdgeHay', {
	init: function() {
		this.requires('Actor, Solid, spr_right_edge_hay');
	},
});

Crafty.c('TopEdgeHay', {
	init: function() {
		this.requires('Actor, Solid, spr_top_edge_hay');
	},
});

Crafty.c('BotEdgeHay', {
	init: function() {
		this.requires('Actor, Solid, spr_bot_edge_hay');
	},
});

Crafty.c('RightDiaHay', {
	init: function() {
		this.requires('Actor, Solid, spr_right_dia_hay');
	},
});

Crafty.c('LeftDiaHay', {
	init: function() {
		this.requires('Actor, Solid, spr_left_dia_hay');
	},
});

Crafty.c('RightDiaBotHay', {
	init: function() {
		this.requires('Actor, Solid, spr_right_dia_bot_hay');
	},
});

Crafty.c('LeftDiaBotHay', {
	init: function() {
		this.requires('Actor, Solid, spr_left_dia_bot_hay');
	},
});

Crafty.c('RightCornerHay', {
	init: function() {
		this.requires('Actor, Solid, spr_right_corner_hay');
	},
});

Crafty.c('LeftCornerHay', {
	init: function() {
		this.requires('Actor, Solid, spr_left_corner_hay');
	},
});

Crafty.c('WoodenFence', {
	init: function() {
		this.requires('Actor, Solid, spr_wood_fence');
	},
});

Crafty.c('Grass', {
	init: function() {
		this.requires('Actor, spr_grass');
	},
});

Crafty.c('BlueFlower', {
	init: function() {
		this.requires('Actor, spr_blue_flower');
	},
});

Crafty.c('Rock', {
	init: function() {
		this.requires('Actor, Solid, spr_rock');
	},
});

Crafty.c('CoinFlower', {
	init: function() {
		this.requires('Actor, Solid, spr_coin_flower');
	},
});

Crafty.c('WoodDoor', {
	init: function() {
		this.requires('Actor, spr_wood_door');
	},
});

Crafty.c('Void', {
	init: function() {
		this.requires('Actor, Solid, spr_void');
	},
});

Crafty.c('WoodTorch', {
	init: function() {
		this.requires('Actor, Solid, spr_wood_torch');
	},
});

Crafty.c('WoodWindow', {
	init: function() {
		this.requires('Actor, Solid, spr_wood_window');
	},
});

Crafty.c('DirtRoad', {
	init: function() {
		this.requires('Actor, spr_dirt_road');
	},
});

Crafty.c('DirtRoad1', {
	init: function() {
		this.requires('Actor, spr_dirt_road_dldown');
	},
});

Crafty.c('DirtRoad2', {
	init: function() {
		this.requires('Actor, spr_dirt_road_drdown');
	},
});

Crafty.c('DirtRoad3', {
	init: function() {
		this.requires('Actor, spr_dirt_road_dlup');
	},
});

Crafty.c('DirtRoad4', {
	init: function() {
		this.requires('Actor, spr_dirt_road_drup');
	},
});

Crafty.c('DirtRoad5', {
	init: function() {
		this.requires('Actor, spr_dirt_road_left');
	},
});

Crafty.c('DirtRoad6', {
	init: function() {
		this.requires('Actor, spr_dirt_road_right');
	},
});

Crafty.c('DirtRoad7', {
	init: function() {
		this.requires('Actor, spr_dirt_road_bot');
	},
});

Crafty.c('DirtRoad8', {
	init: function() {
		this.requires('Actor, spr_dirt_road_up');
	},
});

Crafty.c('DoorHole', {
	init: function() {
		this.requires('Actor, spr_door_hole');
	},
});

Crafty.c('GreyFloor', {
	init: function() {
		this.requires('Actor, spr_grey_floor');
	},
});

Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Solid, spr_tree');
	},
});

Crafty.c('Pickaxe', {
	init: function() {
		this.requires('Actor, Solid, spr_pickaxe');
	},
});