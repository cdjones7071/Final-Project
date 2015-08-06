/**
  * Allow a card to be flipped
  */
Crafty.sprite(100, 'img/card.png', {FlippedCard: [0, 0]});
Crafty.c('Flippable', {
  init: function() {
    this.requires('2D');
    this.flippedCardEn = Crafty.e('2D, DOM, FlippedCard')
      .attr({x: this.attr('x'), y: this._y, w: this._w, h: this._h, z: this._z+1})
    ;
  },
  reveal: function() {
    this.flippedCardEn.visible = false;
  },
  hide: function() {
    this.flippedCardEn.visible = true;
  }
});

Crafty.c('Scoreboard', {
  init: function(e) {
    this.requires('Text, Persist'); // Otherwise each re-creation causes new bindings
    this.flipSuccess = function() {
      Crafty('Scoreboard')._success().show();
    };
    this.flipFail = function() {
      Crafty('Scoreboard')._fail().show();
    };
    Crafty.bind('FlipSuccess', this.flipSuccess);
    Crafty.bind('FlipFail', this.flipFail);
    this.restart();
  },
  restart: function() {
    this.score = 0;
    this.found = 0;
    this.start = new Date().getTime();
    return this;
  },
  show: function() {
    if(!this.text) debugger;
    this.text('Score:'+this.score);
    var timeTaken = new Date().getTime() - this.start;
    if (this.found === Crafty.myGame.cardsToFind) {
      Crafty.trigger('GameSuccess', {score: this.score, time: timeTaken});
    }
    return this;
  },
  _success: function() {
    this.score += 5;
    this.found++;
    return this;
  },
  _fail: function() {
    this.score -= 1;
    return this;
  }
});

Crafty.c('Highscore', {
  init: function() {
    this.requires("Persist");
    this.gameData = JSON.parse(window.localStorage.getItem('memoryScoreData'))||{scores:[]};
    this.gameData.scores = this.gameData.scores || [];
    this.playerName = this.gameData.player || 'Test';
    this.gameSuccess = function(res) {
      var that = Crafty('Highscore');
      that.gameData.scores.push({
        name:   that.playerName,
        score:  res.score,
        time:   res.time
      });
      that.gameData.scores.sort(function(a,b) {
        if (a.score !== b.score)
          return a.score < b.score;   // Biggest score first
        else
          return a.time > b.time;     // Then shortest time
      });
      // Keep only top 5 scores
      that.gameData.scores = that.gameData.scores.splice(0,5);
      that.gameData.player = that.getPlayer();
      window.localStorage.setItem('memoryScoreData', JSON.stringify(that.gameData));
      Crafty.trigger('GameOver');
    };
    Crafty.bind('GameSuccess', this.gameSuccess);
  },
  destroy: function(){window.alert('oh no!');},
  setPlayer: function(name) {
    name = name || this.getPlayer();
    this.playerName = name;
    return this;
  },
  getPlayer: function() {
    return this.playerName;
  }
});