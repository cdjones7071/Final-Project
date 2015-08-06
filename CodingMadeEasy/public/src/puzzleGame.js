window.instances = 0;
var GameControl = function() {

	var Card1, Card2;
	var timeoutId;
	var InstanceNo = window.instances++;

	Crafty.myGame.generateEntities();
	
	Crafty.unbind('CardClicked');
	Crafty.bind('CardClicked', function(en) {
		var card = en._entityName;
		if (!en.has('Flippable')) return;			// Already flipped
		if (!Card1) {
			Card1 = en;
			Card1.reveal();
			Crafty.audio.play('click', 1, 1);
		}	else if (!Card2) {
			if (en === Card1) return;						// Click twice on same card
			Card2 = en;
			Card2.reveal();
			if (Card1._entityName === Card2._entityName) {
				// Match!
				Crafty.trigger('FlipSuccess');
				Crafty.audio.play('success', 1, 1);
				Card1.removeComponent('Flippable');
				Card2.removeComponent('Flippable');
				Card1 = Card2 = null;
			} else {
				Crafty.audio.play('fail', 1, 1);
				Crafty.trigger('FlipFail');
				//window.setTimeout(flipBack, 3000);
			}
		} else {
			flipBack();
		}
	});
	
	
	Crafty.bind('GameOver', function() {
		Crafty.scene("highscores");
	});
	
	function flipBack() {
		if (Card1) Card1.hide();
		if (Card2) Card2.hide();
		Card1 = Card2 = null;
	}
	
};