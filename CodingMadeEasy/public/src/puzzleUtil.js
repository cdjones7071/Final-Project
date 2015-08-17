Crafty.Util = {};

function toggleSound(id) {
  Crafty.audio.stop(id);
  Crafty.myGame[id] = !Crafty.myGame[id];
}

function clueGame() {
	Crafty.scene('ClueStart');
}

function muteSound() {
	Crafty.audio.toggleMute();
}

function testMode() {
	Crafty.myGame.cardsToFind = 1;
	Crafty.myGame.shuffle = false;
	newGame();
}

function newGame() {
	Crafty.scene('main');
}
function highScores() {
	Crafty.scene('Loading');
}
function clearScores() {
	Crafty.scene('highScores');
}

Crafty.Util.arrayShuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};