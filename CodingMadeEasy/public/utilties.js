function loadMap(data) {
	var x, y, map = [];
	for (x = -1; x <= Game.map_grid.width; ++x) {
		map[x] = [];
		for (y = 0; y <= Game.map_grid.height; ++y) {
			if ( x == -1 || x == Game.map_grid.width || y == 0 || y == Game.map_grid.height ) {
				// Enclose the playable area with void
				map[x][y] = 'L';
			}
			else {
				map[x][y] = data[y][x];
			}
		}
	}
	
	parseMap(map, Game.map_grid.width, Game.map_grid.height);
	
	/*// Load the starting area
	var lvlData = $(document).load('assets/areas/start.lvl', function() {
		// Parse the level
		var splitLvlData = lvlData.split('\n');
		for (var x = 0; x < Game.map_grid.width; ++x) {
			for (var y = 0; y < Game.map_grid.height; ++y) {
				map_tiles[x][y] = splitLvlData[y][x];
			}
		}
	});*/
}

function parseMap(map, width, height) {
	var npcList = [];
	for (var x = -1; x <= width; ++x) {
		for (var y = 0; y <= height; ++y) {
			switch (map[x][y])
			{
				case 'Q':
					Crafty.e('WoodenWall').at(x, y);
					break;
				case 'Y':
					Crafty.e('Hay').at(x, y);
					break;
				case 'W':
					Crafty.e('LeftEdgeHay').at(x, y);
					break;
				case 'E':
					Crafty.e('RightEdgeHay').at(x, y);
					break;
				case 'R':
					Crafty.e('TopEdgeHay').at(x, y);
					break;
				case 'T':
					Crafty.e('BotEdgeHay').at(x, y);
					break;
				case 'U':
					Crafty.e('RightDiaHay').at(x, y);
					break;
				case 'I':
					Crafty.e('LeftDiaHay').at(x, y);
					break;
				case 'O':
					Crafty.e('RightDiaBotHay').at(x, y);
					break;
				case 'P':
					Crafty.e('LeftDiaBotHay').at(x, y);
					break;
				case 'A':
					Crafty.e('RightCornerHay').at(x, y);
					break;
				case 'S':
					Crafty.e('LeftCornerHay').at(x, y);
					break;
				case 'D':
					Crafty.e('WoodenFence').at(x, y);
					break;
				case 'F':
					Crafty.e('Grass').at(x, y);
					break;
				case 'G':
					Crafty.e('BlueFlower').at(x, y);
					break;
				case 'H':
					Crafty.e('Rock').at(x, y);
					break;
				case 'J':
					Crafty.e('CoinFlower').at(x, y);
					break;
				case 'K':
					Crafty.e('WoodDoor').at(x, y);
					break;
				case 'L':
					Crafty.e('Void').at(x, y);
					break;
				case 'Z':
					Crafty.e('WoodTorch').at(x, y);
					break;
				case 'X':
					Crafty.e('WoodWindow').at(x, y);
					break;
				case 'C':
					Crafty.e('DirtRoad').at(x, y);
					break;
				case 'V':
					Crafty.e('DirtRoad1').at(x, y);
					break;
				case 'B':
					Crafty.e('DirtRoad2').at(x, y);
					break;
				case 'N':
					Crafty.e('DirtRoad3').at(x, y);
					break;
				case 'M':
					Crafty.e('DirtRoad4').at(x, y);
					break;
				case ',':
					Crafty.e('DirtRoad5').at(x, y);
					break;
				case '.':
					Crafty.e('DirtRoad6').at(x, y);
					break;
				case '1':
					Crafty.e('DirtRoad7').at(x, y);
					break;
				case '2':
					Crafty.e('DirtRoad8').at(x, y);
					break;
				case '3':
					Crafty.e('EvilWizard').at(x, y);
					break;
				case '4':
					npcList.push({NpcName: 'NpcKnight', x: x, y: y});
					break;
				case '5':
					Crafty.e('DoorHole').at(x, y);
					break;
				case '6':
					Crafty.e('GreyFloor').at(x, y);
					break;
				case '7':
					Crafty.e('Tree').at(x, y);
					break;
				case '8':
					Crafty.e('NextArea').at(x, y);
					break;
				case '9':
					Crafty.e('InvisBlocker').at(x, y);
					break;
				case '0':
					Crafty.e('Pickaxe').at(x, y);
					break;
				case '$':
					Crafty.e('Coin').at(x, y);
					break;
				
				// Player tiles, dunno what to do with them yet
				case '!':
				case '@':
					break;
			}
		}
	}

	for (var i = 0; i < npcList.length; ++i) {
		Crafty.e(npcList[i].NpcName).at(npcList[i].x, npcList[i].y);
	}
	
	Game.player = Crafty.e('Player').at(Game.playerX, Game.playerY);
}

// Expects valid tile set coordinates
function resolveTile(tileX, tileY) {
	var lookup = [];
	for (var x = 0; x < 8; ++x) {
		lookup[x] = [];
	}
	//   	      0    1    2    3    4    5    6    7
	lookup[0] = ['!', 'F', 'G', 'H', 'J', 'D', '3', '4']; // 0
	lookup[1] = ['Y', 'W', 'E', 'R', 'T', 'Q', '5', '6']; // 1
	lookup[2] = ['U', 'I', 'O', 'P', 'A', 'S', 'K', 'L']; // 2
	lookup[3] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',']; // 3
	lookup[4] = ['.', '1', '2', '7', '8', '9', '0', '@']; // 4
	lookup[5] = ['$', '%', '^', '#', '#', '#', '#', '#']; // 5
	lookup[6] = ['#', '#', '#', '#', '#', '#', '#', '#']; // 6
	lookup[7] = ['#', '#', '#', '#', '#', '#', '#', '#']; // 7
	
	return lookup[tileY][tileX];
}

function createZone(selfSceneString, topScene, botScene, leftScene, rightScene, portals) {
	return {
		selfSceneString: selfSceneString,
		topScene: topScene,
		botScene: botScene,
		leftScene: leftScene,
		rightScene: rightScene,
		portals: portals
	};
}

// wrapText() modified function from:
// http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
// NOTE: Does not work for canvas, so kind of pointless now.
function wrapText(context, textStr, x, y, maxWidth, lineHeight) {
	var returnStr = '';
	var words = textStr.split(' ');
	var line = '';
	
	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				//context.fillText(line, x, y);
				returnStr = returnStr.concat(line, '<br />');
				line = words[n] + ' ';
				y += lineHeight;
			} else {
				line = testLine;
			}
		}
	//context.fillText(line, x, y);
	returnStr = returnStr.concat(line);
	return returnStr;
}

function mwin(textStr, curZone) {
	if (curZone === undefined || curZone === null) {
		console.log('Warning! mwin() passed null or undefined curZone parameter!');
	}
	Crafty.trigger('mwinCreate');
	Crafty.e('Delay').delay(function() {
		if (Game.currentZone == curZone) {
			var fadeOutCt = 0;
			var fadeInCt = 0;
			var textMwin = Crafty.e('2D, DOM, Text')
				.attr({x: Game.width() / 2 - (515 / 2), y: Game.height() - (64 + 143), w: 515, h: 135})
				.textColor('#ffffff', 1.0)
				.textFont({ family: 'Arial', size: '18px' })
				.css({'text-align': 'left'})
				.text(textStr)
			textMwin.z = 10000;

			var mwin = Crafty.e('2D, Canvas, Image')
				.image('assets/mwin.jpg')
				.attr({x: Game.width() / 2 - (530 / 2), y: Game.height() - (64 + 148)})
				.bind('KeyDown', function(e) {
					if (e.key == Crafty.keys['SPACE']) {
						Crafty.e('Delay').delay(function() {
							mwin.alpha -= 0.05;
							++fadeOutCt;
							if (fadeOutCt == 8) {
								mwin.destroy();
								textMwin.destroy();
								Crafty.trigger('mwinDestroy');
							}
						}, 100, 9);
					}
				})
				.bind('SceneDestroy', function() {
					mwin.destroy();
					textMwin.destroy();
					Crafty.trigger('mwinDestroy');
				})
				.bind('mwinCreate', function() {
					mwin.destroy();
					textMwin.destroy();
					Crafty.trigger('mwinDestroy');
				});
			mwin.z = 9999;
			mwin.alpha = 0.05;
			
			Crafty.e('Delay').delay(function() {
				++fadeInCt;
				mwin.alpha += 0.05;
				if (fadeInCt == 7) {
					Crafty.trigger('mwinLoad');
				}
			}, 100, 8);
		}
	}, 100, 0);
}