Crafty.scene("puzzleLoading", function() {
  Crafty.background("111");
  Crafty.e('2D, DOM, Text, HTML')
  .attr({
    w: 700,
    h: 500,
    x: 50,
    y: 100
  }).text("Press The Puzzle Button up above to get started")
  .css({
    "text-align": "center",
  })

  .textFont({ size: '60px', weight: 'bold', family: 'eraser', })
  .textColor('white')

  Crafty.load(['img/cards.png', 'img/card.png'], function() {
    Crafty.scene("main");
  });

});
Crafty.scene("puzzleLoading");

Crafty.scene("main", function() {

  Crafty.myGame.control = new window.GameControl();
  
  Crafty.myGame.audio();

});

Crafty.scene("highscores", function() {

  var sb = JSON.parse(window.localStorage.getItem('memoryScoreData'))||{scores:[]};
  var css = {
		
  };
  sb.scores.forEach(function(s, i) {
		Crafty.e('2D, DOM, Text')
			.attr({x: 100, y: 100+i*30, w: 100, h: 30})
			.text((i+1) + '. ' + s.name)
		;
		Crafty.e('2D, DOM, Text')
			.attr({x: 200, y: 100+i*30, w: 100, h: 30})
			.text(s.score)
		;
		Crafty.e('2D, DOM, Text')
			.attr({x: 300, y: 100+i*30, w: 100, h: 30})
			.text((1e2+Math.floor(s.time/60000)+'').substr(1)+':'+(1e2+Math.floor(s.time/1000)%60+"").substr(1))
		;
  });
  
});