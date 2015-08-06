/**
	* Generate a Set of Cards
	*/
Crafty.myGame.generateEntities = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;
	
	Crafty.sprite(100, 'img/cards.png', {
		Card00: [0, 0], Card10: [1, 0], Card20: [2, 0], Card30: [3, 0], Card40: [4, 0], 
		Card01: [0, 1], Card11: [1, 1], Card21: [2, 1], Card31: [3, 1], Card41: [4, 1], 
		Card02: [0, 2], Card12: [1, 2], Card22: [2, 2], Card32: [3, 2], Card42: [4, 2]
	});
	
	// Generate deck of cards
	this.cards = [];
	for (var c=0; c<15; c++)
		this.cards[c*2] = this.cards[c*2+1] = 'Card'+c%5+Math.floor(c/5);
	
	// Shuffle cards
	if (Crafty.myGame.shuffle) this.cards = Crafty.Util.arrayShuffle(this.cards);

	this._cardSet = [];
	for (var x=0; x < 6; x++) {
		this._cardSet[x] = [];
		for (var y=0; y < 5; y++) {
			this._cardSet[x][y] = Crafty.e(this.cards[y*6+x]+', 2D, DOM, Mouse')
				.setName(this.cards[y*6+x])
				.attr({x: 5+x*110, y: 20+5+y*110, w:100, h: 100})
				.bind('Click', function(e) {
					Crafty.trigger('CardClicked', this);
				})
				.addComponent('Flippable')
				;
		}
	}
	
	// Scoreboard
	(Crafty('Scoreboard').length>0?Crafty('Scoreboard'):Crafty.e('DOM, Text, Scoreboard, Highscore')
		.attr({x: 3, y:3, w: 100, h: 20, z: 3})
		.css({
			"color":				"white",
			"font-size":		"14px"
		}))
		.restart()
		.show()
		.setPlayer()
	;
	
	// Player's Name
	(Crafty('PlayerName').length>0?Crafty('PlayerName'):Crafty.e('DOM, Text, Persist, Mouse, PlayerName')
		.attr({x: Crafty.myGame.W-150-8, y:3, w: 150, h: 20, z: 3})
		.css({
			"color":					"white",
			"font-size":			"14px",
			"text-align":			"right",
			"padding-right":	"10px"
		}))
		.bind('Click', function() {
			var sb = Crafty('Highscore');
			sb.setPlayer(window.prompt('Please type your name:', sb.getPlayer()));
			this.text('Player: '+sb.getPlayer());
		})
		.text('Player: '+Crafty('Scoreboard').getPlayer());
	
};