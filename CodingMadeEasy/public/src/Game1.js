Game = {
	// Global state data entity
	stateData: Object,
	hud: Object,
	player: Object,

	// Zone information
	zones: {// createZone(selfSceneString, topScene, botScene, leftScene, rightScene, portals)
		Game: createZone('Game', 'HiddenForestBottom', null, null, null, null),
		HiddenForestBottom: createZone('HiddenForestBottom', null, 'Game', 'HiddenForestLeft', null, null),
		HiddenForestLeft: createZone('HiddenForestLeft', 'HiddenForestTopLeft', null, null, 'HiddenForestBottom', null),
		HiddenForestTopLeft: createZone('HiddenForestTopLeft', null, 'HiddenForestLeft', null, 'HiddenForestTop', null),
		HiddenForestTop: createZone('HiddenForestTop', 'LowerToughForest', null, 'HiddenForestTopLeft', 'HiddenForestTopRight', null),
		HiddenForestTopRight: createZone('HiddenForestTopRight', null, null, 'HiddenForestTop', null, null),
		LowerToughForest: createZone('LowerToughForest', 'UpperToughForest', 'HiddenForestTop', null, null, null),
		UpperToughForest: createZone('UpperToughForest', null, 'LowerToughForest', 'NiceGrove', null, null),
		NiceGrove: createZone('NiceGrove', 'EvilGrove', null, null, 'UpperToughForest', null),
		EvilGrove: createZone('EvilGrove', null, 'NiceGrove', null, null, null),
		
	},
	currentZone: 'Game',

	// Store the position the player should spawn on the next area at
	playerX: 4,
	playerY: 4,

	// This defines our grid's size and the size of each of its tiles
	map_grid: {
		width:	25,
		height:	20,
		tile: {
			width: 	32,
			height: 32,
		}
	},
	
	// The total width of the game screen.
	width: function() {
		return 800;
	},
	
	// The total height of the game screen.
	height: function() {
		return 640;
	},

	tileLength: function() {
		return this.map_grid.width;
	},

	tileHeight: function() {
		return this.map_grid.height;
	},
	
	playerKeys: Array(),
	
	// Initialize and start our game
	start: function() {
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(68, 138, 67)');
		
		playerKeys = [];
		playerKeys['E'] = false;
		
		// Simply start the "Loading" scene to get things going
		Crafty.scene('Loading');
	}
}

$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }
