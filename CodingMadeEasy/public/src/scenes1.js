Crafty.scene('Game', function() {
	var lvlData = ["LLLLLLLLLLLLLLLLLLLLLLLLL",
			   "7777777777777777777777F77",
			   "777F##7###########777GFF7",
			   "7#7####F########G#777FFF7",
			   "77#########URI#####777FG7",
			   "77########USYAI####G77F77",
			   "7#7#######QQQQQ#####77H77",
			   "7#####7###QXQXQ###7####77",
			   "77$#G#####QQQQQ#########7",
			   "7DDDDDDDDDQZKZQDDDDDDDDDD",
			   "777#4###4##,C.4#####4#777",
			   "77###7#####,C.###7#####77",
			   "##########BCC.###F###7#77",
			   "2222222222CCC.#########77",
			   "1111111111111N##G##7#F##7",
			   "#######################77",
			   "7###F7################777",
			   "777########7##7##7##G#777",
			   "77777G####7#7F#7#7#777#77",
			   "7777777777777777777777777"];   
	loadMap(lvlData);

	if (!Game.stateData.sceneFlags['Game'].mwinDisplayed) {
		// Set up the HUD really quickly
		Game.hud = Crafty.e('HUD');
		
		//Crafty.e('Heart').at(6, 6);
		
		mwin("Welcome to Superly Major Questing Adventure Fun Times! This is not a tutorial area, so I will not tell you that you'll need a pickaxe to break that boulder over there on the right side of the screen. I also won't tell you [SPACE] clears out these message boxes. I certainly won't tell you that you don't have a pickaxe right now.  Ha.  Ha ha. Ha.", Game.currentZone);
		
		Crafty.e('Dummy').bind('mwinDestroy', function() {
			if (!Game.stateData.sceneFlags['Game'].pickaxeGiven) {
				mwin("Oh okay fine.  I'll play nice.  Here, you can have this pickaxe.  But listen, you only get one.  You know, I was actually saving it to go play some minecr- actually you don't seem like you really care.  Whatever.", Game.currentZone);
				
				Crafty.e('Dummy').bind('obtainedItem', function() {
					mwin("I should probably not mention this, but to use a pickaxe you have to press [E].", Game.currentZone);
				});
			
				Crafty.e('Pickaxe').at(8, 8);
				Game.stateData.sceneFlags['Game'].pickaxeGiven = true;
			}
		});
		
		Game.stateData.sceneFlags['Game'].mwinDisplayed = true;
	}
});

Crafty.scene('HiddenForestBottom', function() {
	var lvlData = ["#,.G##47777777##,.#77777$",
			   "7,C22V##7777F##G,.###7777",
			   "7M111C2222222222C.#####77",
			   "7####M11111111111NF#J##77",
			   "77#F#####G#############77",
			   "DDDDDDDDDDDDDDDDDDDDDD777",
			   "777###############F###777",
			   "#77###F#########G####F777",
			   "#H##G################7777",
			   "#H############F######7777",
			   "#H###F##########F#F##FF77",
			   "#7##################F#$77",
			   "777##################7F77",
			   "777############F###F##777",
			   "#7#######G########F#77777",
			   "77F#F#############F#F7777",
			   "77#7#7#F#####GFFF##FFFG77",
			   "7#7#$###77777777#F#FFF777",
			   "7777G77777777777777FFF#77",
			   "7777777777777777777777#77"]; 
	loadMap(lvlData);
	
	if (!Game.stateData.sceneFlags['HiddenForestBottom'].mwinDisplayed) {
		mwin("If you are going to survive in this world, you'll need to know how to fight.  Go pick up that sword.", Game.currentZone);
		
		Crafty.e('Sword').at(14,10);
		Crafty.e('Dummy').one('obtainedItem', function() {
			mwin("Now press [R] to attack. (You swing faster than light itself in a giant circle around you.  It might be hard to see it, but try to use your imagination please.)", Game.currentZone);
			
			Crafty.e('Dummy').one('usedItem', function() {
				mwin("Good.  Now notice that you only get one attack with it.  These swords aren't made to last, they were pixeled in like two minutes.  Blame the artist.  Take this pickaxe and figure out what to do next.", Game.currentZone);
				
				Crafty.e('Pickaxe').at(6, 11);
			});
		});
		
		Game.stateData.sceneFlags['HiddenForestBottom'].mwinDisplayed = true;
	}
});

Crafty.scene('HiddenForestLeft', function() {
	var lvlData = ["##77#777###F###F##F###7##",
			   "#77F#7777#########7#7##7#",
			   "77#HH#7777###G######7##7#",
			   "77####7#777####5###777777",
			   "77#####77777########77777",
			   "#77######7777DDDDDDD$DDDD",
			   "77G###F####7#########7#7#",
			   "777###4################77",
			   "###7#######F####F##F#####",
			   "#7777#F###########F######",
			   "7##7#####################",
			   "#77F7#############G###F#7",
			   "G#77DDDDDDDGF##F######77#",
			   "#77###GF###DDDDDD####7##7",
			   "#77##############DDD7#7#7",
			   "FF7############F###7###7#",
			   "777#######F#########7##77",
			   "75H#########G##########77",
			   "777##############7##7#77#",
			   "77#7##############7##7777"]; 
	loadMap(lvlData);
	
	if (!Game.stateData.sceneFlags['HiddenForestLeft'].mwinDisplayed) {
		mwin("Now it's time for some real combat.  Hopefully you aren't reading this, because that bad guy is coming straight for you.  What?  Why would he care that you are reading?  You are being silly, and probably being murdered right this moment if you are still reading this.", Game.currentZone);
		Crafty.e('Sword').at(20,9);
		var killedNpcFlag = false;
		Crafty.e('Dummy').one('NpcKilled', function() {
			killedNpcFlag = true;
		});
		Crafty.e('Dummy').one('usedItem', function() {
			Crafty.e('Delay').delay(function() {
					if (killedNpcFlag) {
						Crafty.e('Pickaxe').at(4, 3);
						mwin("Good job.  Here's a pickaxe.", Game.currentZone);
					} else {
						mwin("You missed him.  Well... that's not good.  Here, take this pickaxe and try to dodge him then.", Game.currentZone);
						Crafty.e('Pickaxe').at(18, 13);
					}
				}, 350, 0);
		});
		
		Game.stateData.sceneFlags['HiddenForestLeft'].mwinDisplayed = true;
	}
});

Crafty.scene('HiddenForestTopLeft', function() {
	var lvlData = ["LLLLLLLLLLLLLLLLLLLLLLLLL",
			   "###777777777777F77777#7F#",
			   "###777#7#F7#777777#G77777",
			   "#7#7#7#########77#####7F7",
			   "#77F###G###############77",
			   "77#############F####F###7",
			   "#77######################",
			   "77#7######7##############",
			   "777#################7#DDD",
			   "77######F##########F4B222",
			   "77#############7###G4M111",
			   "77#G################44#F#",
			   "77DDDDDD4DDF#########4###",
			   "777########7#7#######4##7",
			   "77##########77###7$$$77#7",
			   "77###########7777#777#777",
			   "77##F#######7777#7777#777",
			   "7F########77#7##########7",
			   "77####7777#7#####G######7",
			   "777##777#################"]; 
	loadMap(lvlData);
	
	Crafty.e('Sword').at(4,3);
	
	if (!Game.stateData.sceneFlags['HiddenForestTopLeft'].mwinDisplayed) {
		mwin("Sometimes when you kill enemies you get loot!", Game.currentZone);
		Game.stateData.sceneFlags['HiddenForestTopLeft'].mwinDisplayed = true;
	}
});

Crafty.scene('HiddenForestTop', function() {
	var lvlData = ["LLLLLLLLLLLLLLLLLLLLLLLLL",
			   "777777777#F#BCCNF#7777777",
			   "777#77$7###BCCN###77777$7",
			   "77####G77#BCCN###77777##7",
			   "7####777##,CN###########7",
			   "###77##77#,.#######G#7777",
			   "##7##7####,.####F#7##7777",
			   "#F#F######,.#########7#7#",
			   "DDD######BCCV4#7#########",
			   "222222222CCCC222222222222",
			   "1111111111111111111111111",
			   "######7##################",
			   "#F#777#7#7####F####7#####",
			   "#774#F##7477#7##########F",
			   "7###77G###7#7###G#######7",
			   "7$77##7#######F######F#7#",
			   "774######F#7###7##77#7777",
			   "7777#DDDDDDDDDDD777#7###7",
			   "777777#F#########7#7##F##",
			   "7777777#######F#####777#7"]; 
	loadMap(lvlData);
	
	Crafty.e('Sword').at(3, 2);
});

Crafty.scene('HiddenForestTopRight', function() {
	var lvlData = ["#777##7#777#7777#777#777#",
			   "7777F7777#777777777#7#777",
			   "77#777#4###########7$77#7",
			   "7#7##7$77##77#F####74#F77",
			   "77F###77#7####GURI#77##7#",
			   "77######7##4##URRRI#77#77",
			   "77###4###7###USYYYAI77##7",
			   "###4######4#URRRRRRRIF#77",
			   "##########4#QQQQQQQQQ#G#7",
			   "22222V#4F###QXQQQQQXQ##77",
			   "111CC.######QQQZKZQQQ##77",
			   "###MC.#########BCV######7",
			   "####,CV###4#G##,C.#####77",
			   "####,CCV#4#####,C.#####77",
			   "774#MCCC22V777F,C.#4##777",
			   "7####M111CC2222CC.###7777",
			   "7###F####M1111111N####G77",
			   "7F#####4########4#F#J##77",
			   "77###4######G##########77",
			   "DDDDDDDDDDDDDDDDDDDDDD777"];
	loadMap(lvlData);
});

Crafty.scene('LowerToughForest', function() {
	var lvlData = ["777777777777#77#F77777777",
			   "777777777777#77#F77777777",
			   "7D7G#F#77DF7#7G7D#7#F#777",
			   "IF4477FG7####D74#77GD777F",
			   "Q#7#$7##H7G#F#4#777H7GD77",
			   "Q##77#DFD7DD777##777777F7",
			   "77##777##G7#7G77#F##F##77",
			   "7HF#7D7#7#D77##77#7#777DD",
			   "7##77#7#7#####7H7#D7###77",
			   "7#7D##7#777F#7F#7F#G#7747",
			   "7##7#G7F#H77##G#7##777#$7",
			   "7#F#7#7##77$77#77##7##F7H",
			   "G7##7##7G77####7##7H#7##7",
			   "77#7#7#7##77777###7#F#77F",
			   "7##7###H7#4D7##FD7#7###7H",
			   "7#77H#F#H74F###7777#F7##7",
			   "7#4477###7D#H777H#7###777",
			   "77F#DD#7#7777707####G#77G",
			   "G77#F#G7##DD7D#F###7#7777",
			   "777777777#F#######7777777"]; 
	loadMap(lvlData);
});

Crafty.scene('UpperToughForest', function() {
	var lvlData = ["LLLLLLLLLLLLLLLLLLLLLLLLL",
			   "7777777###F#7777#7##7#F##",
			   "77777777F##7777#77777#777",
			   "774###7777777777$#7##7#7#",
			   "7#7####777#7##G##47#7#7##",
			   "777#F########F#77##7#7##7",
			   "7#7G#######F######7#7#77F",
			   "#7###F###########7#777777",
			   "##77######F####F#######7#",
			   "F4#4##4###4#F########7#47",
			   "222222222V#####4####47777",
			   "111111111N######F##F###77",
			   "#4F4##4##F4#############7",
			   "#######F##############F#7",
			   "#7##########F###F######77",
			   "777#4##########4#4#G##7#7",
			   "777777##DDDDDDDDDDDDD#77#",
			   "77#7F77#7########F####777",
			   "7777777777###F#######77F7",
			   "77F777777777#777777777777"]; 
	loadMap(lvlData);
});

Crafty.scene('NiceGrove', function() {
	var lvlData = ["LLLLLLLLLLLLLLLLLLLLLLLLL",
			   "####F##G###F#F##H,.777777",
			   "DDDDDDDDDDDDDDDDD,.774$47",
			   "#777#B22222222222C.#74447",
			   "7777F,CC1111111111N#7#F#7",
			   "#777#,CN777777777777#4447",
			   "7F7##,.###77#######F447#7",
			   "7774#,.##4###4F#4#4##74#F",
			   "#7F##,.7#7#4G###G#4#4#F##",
			   "77$##,.77H777HDDDDDDDDDDD",
			   "77#4#,C222222222222222222",
			   "#F7##M1111111111111111111",
			   "77#F####DD777D####DDD####",
			   "#7###F###F#7#####4#F#4#F#",
			   "777F##########F##########",
			   "#77##G##F##F#########F#77",
			   "7F##7FF###F#####F#######7",
			   "777F$##7#####F#77###F#7#7",
			   "#7#7F77777#777777777#7#77",
			   "F7777#7#7#7#7#7##F#777777"]; 
	loadMap(lvlData);
});

Crafty.scene('EvilGrove', function() {
	var lvlData = ["LLLLLLLLLLLLLLLLLLLLLLLLL",
			   "77777777777#777F777777777",
			   "77####G#7##7##77#744##477",
			   "77#F3###################7",
			   "#7####F#######F##F4##44#7",
			   "7744F44#44#F###########G7",
			   "7#44#44#44############7#7",
			   "#7##############F####7#77",
			   "7###F###44G#####4##4###77",
			   "77###4##44#F###F4##4###77",
			   "#744#44#44######44###7#77",
			   "F7#####F####7#F##77###777",
			   "7###GF#####77###DDDD#F777",
			   "7#F#########777##BV####77",
			   "7##4###4#F###77#4,.4###77",
			   "77#######D#7#H##4,.4F###7",
			   "7774###4#H#7#####,.###F#7",
			   "#7777777DD####F##,.#GF#77",
			   "G#7#77#77777#F###,.###777",
			   "#F##F#7#7777HDDDD,.777777"]; 
	loadMap(lvlData);
});

Crafty.scene('winGame', function() {
	var text = Crafty.e('2D, DOM, Text')
		.attr({x: 0, y: 0, w: Game.width() })
		.textFont({ family: 'Arial', size: '24px', weight: 'bold' })
		.text('You won!  I have 5 minutes to finish, sorry about this crappy victory screen!  F5 to play again.  Thanks for playing!');
});

Crafty.scene('Intro', function() {
	// Play the intro scene
	Crafty.audio.play('intro_voice_over');
	var img = Crafty.e('2D, DOM, intro_0');
	var skip_intro = false;
	
	var skipText = Crafty.e('2D, DOM, Text')
		.attr({x: 0, y: Game.height() - 28, w: Game.width() })
		.textColor('#000000', 1.0)
		.textFont({ family: 'Arial', size: '24px', weight: 'bold' })
		.text('Press SPACE to skip')
		.bind('KeyDown', function(e) {
			if (e.key == Crafty.keys['SPACE']) {
				Crafty.audio.stop('intro_voice_over');
				skip_intro = true;
				Crafty.scene('Game');
			}
		}
	);
	skipText.z = 10000;
	
	Crafty.e('Delay').delay(function() {
		if (!skip_intro) {
			img = Crafty.e('2D, DOM, intro_1');
		}
	}, 5000, 0);
	Crafty.e('Delay').delay(function() {
		if (!skip_intro) {
			img = Crafty.e('2D, DOM, intro_2');
		}
	}, 11000, 0);
	Crafty.e('Delay').delay(function() {
		if (!skip_intro) {
			img = Crafty.e('2D, DOM, intro_3');
		}
	}, 18000, 0);
	Crafty.e('Delay').delay(function() {
		if (!skip_intro) {
			img = Crafty.e('2D, DOM, intro_4');
		}
	}, 22000,0);
	Crafty.e('Delay').delay(function() {
		if (!skip_intro) {
			img = Crafty.e('2D, DOM, intro_5');
		}
	}, 30000, 0);
	Crafty.e('Delay').delay(function() {
		if (!skip_intro) {
			img = Crafty.e('2D, DOM, intro_6');
		}
	}, 36000, 0);
	Crafty.e('Delay').delay(function() {
		// Scene change
		if (!skip_intro) {
			Crafty.scene('Game');
		}
	}, 48000, 0);
});

Crafty.scene('Loading', function() {
	var loaderText = Crafty.e('2D, DOM, Text')
		.text('Loading... (May take a few minutes!)')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.css($text_css);
		
	// Load game data
	Crafty.load(['assets/tileset.png',
				 'assets/mwin.jpg',
				 'assets/intro/0.jpg',
				 'assets/intro/1.jpg',
				 'assets/intro/2.jpg',
				 'assets/intro/3.jpg',
				 'assets/intro/4.jpg',
				 'assets/intro/5.jpg',
				 'assets/intro/6.jpg',
				 'assets/itembackdrop.png',
				 'assets/heart.png',
				 'assets/sword.png',
				 'assets/intro/warrior_dog_intro.ogg',	// TODO: Highly compress the audio, also .aac
				 'assets/intro/warrior_dog_intro.mp3'], function() {

		// The resources are loaded	
		// Load the tile set
		Crafty.sprite(32, 'assets/tileset.png', {
			spr_player:				[0, 0],	// !
			spr_grass:				[1, 0],	// F
			spr_blue_flower:		[2, 0], // G
			spr_rock:				[3, 0], // H
			spr_coin_flower:		[4, 0], // J
			spr_wood_fence:			[5, 0],	// D
			spr_evil_wizard:		[6, 0],	// 3
			spr_npc_knight:			[7, 0],	// 4
			spr_hay:				[0, 1],	// Y
			spr_left_edge_hay:		[1, 1],	// W
			spr_right_edge_hay:		[2, 1],	// E
			spr_top_edge_hay:		[3, 1],	// R
			spr_bot_edge_hay:		[4, 1],	// T
			spr_wooden_wall:		[5, 1],	// Q
			spr_door_hole:			[6, 1],	// 5
			spr_grey_floor:			[7, 1],	// 6
			spr_right_dia_hay:		[0, 2],	// U
			spr_left_dia_hay:		[1, 2],	// I
			spr_right_dia_bot_hay:	[2, 2],	// O
			spr_left_dia_bot_hay:	[3, 2],	// P
			spr_right_corner_hay:	[4, 2],	// A
			spr_left_corner_hay:	[5, 2],	// S
			spr_wood_door:			[6, 2],	// K
			spr_void:				[7, 2], // L
			spr_wood_torch:			[0, 3], // Z
			spr_wood_window:		[1, 3], // X
			spr_dirt_road:			[2, 3], // C
			spr_dirt_road_dldown:	[3, 3], // V
			spr_dirt_road_drdown:	[4, 3], // B
			spr_dirt_road_dlup:		[5, 3], // N
			spr_dirt_road_drup:		[6, 3], // M
			spr_dirt_road_left:		[7, 3], // ,
			spr_dirt_road_right:	[0, 4], // .
			spr_dirt_road_bot:		[1, 4], // 1
			spr_dirt_road_up:		[2, 4], // 2
			spr_tree:				[3, 4],	// 7
			spr_nextArea:			[4, 4],	// 8
			spr_invisBlocker:		[5, 4],	// 9
			spr_pickaxe:			[6, 4],	// 0
			spr_hero_attack:		[7, 4],	// @
			spr_coin:				[0, 5],	// $
			spr_amulet:				[1, 5], // %
			spr_fireball:			[2, 5],	// ^
			
			spr_null:				[7, 7]	// #
		}, 1);
		
		// Load the intro 'tile sets'
		Crafty.sprite(800, 640, 'assets/intro/0.jpg', { intro_0: [0,0] });
		Crafty.sprite(800, 640, 'assets/intro/1.jpg', { intro_1: [0,0] });
		Crafty.sprite(800, 640, 'assets/intro/2.jpg', { intro_2: [0,0] });
		Crafty.sprite(800, 640, 'assets/intro/3.jpg', { intro_3: [0,0] });
		Crafty.sprite(800, 640, 'assets/intro/4.jpg', { intro_4: [0,0] });
		Crafty.sprite(800, 640, 'assets/intro/5.jpg', { intro_5: [0,0] });
		Crafty.sprite(800, 640, 'assets/intro/6.jpg', { intro_6: [0,0] });
		
		// Load the audio
		Crafty.audio.add({
			intro_voice_over: ['assets/intro/warrior_dog_intro.ogg',
							   'assets/intro/warrior_dog_intro.mp3']
		});
		
		// Initialize a state entity to attach various data to throughout the game
		Game.stateData = Crafty.e('StateData');
		
		// Now that our sprites are ready to draw, start the game
		Crafty.scene('Intro');
	},
	
	// Progress
	function(e) {
		var loadedStr = "";
		loaderText.text(loadedStr.concat(e.loaded, "/", e.total, " ", e.percent, "% ", e.src));
	})
});