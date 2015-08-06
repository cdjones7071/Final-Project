// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
    
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;


  // Place a border at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a border entity at the current tile
        Crafty.e('border').at(x, y);
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.25 && !this.occupied[x][y]) {
        // Place a walls entity at the current tile
        Crafty.e('walls').at(x, y);
        this.occupied[x][y] = true;
      }
    }
  }

  // Generate up to five villages on the map in random locations
  var max_villages = 3;
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.002) {
        if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
          Crafty.e('Village').at(x, y);
        }
      }
    }
  }

  // Show the victory screen once all villages are visisted
  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('javascriptFact1');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('VillageVisited', this.show_victory);
});


Crafty.scene("Intro", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text('Welcome To Coding Made Easy: A Game designed to teach you the basics of HTML,CSS, and Javascript through a series of mini-games.Press the Spacebar to continue')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('Intro2');
      }
    })
  });

Crafty.scene("Intro2", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center' })
    .text('Hi my name Jeronimo Vigil and I will be assisting you through each mini-game evaluating your responses and giving feedback')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('Intro3');
      }
    })
  });


Crafty.scene("Intro3", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text('Think of me as your "sprite" guide! Ha! ')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('Intro4');
      }
    })
  });

Crafty.scene("Intro4", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text('Enough of the funny stuff your first minigame involves a puzzle game with questions and answers involing javascript ')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('puzzleLoading');
      }
    })
  });

Crafty.scene("javascriptFact1", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text(' Null is a object')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('javascriptFact2')
      }
    })
  });

Crafty.scene("javascriptFact2", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text(' YOU CAN FAKE SCOPE         The scope in which something executes defines what variables are accessible. Free-standing JavaScript (i.e. JavaScript that does not run inside a function) operates within the global scope of the window object, to which everything has access; whereas local variables declared inside functions are accessible only within that function, not outside.')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('javascriptFact3');
      }
    })
  });

Crafty.scene("javascriptFact3", function() {
    Crafty.background("#111");
    Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text('Functions can executes themselves')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', })
    .textColor('white')
    .bind('KeyDown', function(e) {
      if (e.key == Crafty.keys['SPACE']) {
        skip_intro = true;
        Crafty.scene('ClueStart');
      }
    })
  });


Crafty.scene('Victory', function() {
  Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:900, h:500})
    .css({'text-align': 'center'})
    .text('Congrats you have completed the intra-level test, good on to the next test!')
    .textFont({ size: '40px', weight: 'bold', family: 'eraser', });
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Loading');
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('ClueWin', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text, HTML')
    .attr({x:50, y:100, w:700, h:500})
    .css({'text-align': 'center'})
    .text('Congrats you have completed the intra-level test, good on to the next test!')
    .textFont({ size: '40px', weight: 'bold', })
    .textColor('white');

  // Watch for the player to press a key, then restart the game
  //  when a key is pressed
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('javascriptFact2');
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
   //Draw some text for the player to see in case the file
    //takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);

   //Load our sprite map image
  Crafty.load([], function(){

     //Once the image is loaded...

     //Define the individual sprites in the image
     //Each one (spr_border, etc.) becomes a component
     //These components' names are prefixed with "spr_"
     //to remind us that they simply cause the entity
     //to be drawn with a certain sprite
  Crafty.sprite(16, 'floor.png', {
      spr_border:    [0, 6, 0, 0],
      spr_Floor:    [0, 5, 0, 0],
      spr_village: [0, 19, 0, 2],
      spr_characters: [0, 1, 0, 0]

    });

    Crafty.defineScene("PuzzleIntro", function() {
    Crafty.background("#999");
    Crafty.e("2D, DOM, Text")
          .text("One more challenge for you and we can let you go, its a memory game to test your javascript knowledge, You're doing great you seem like a great fit for this job, Amazing work.....")
          .attr({x:50, y:100, w:900, h:500})
          .css({'text-align': 'center'})
          .textFont({ size: '40px', weight: 'bold',});
    });

    // Now that our sprites are ready to draw, start the game
          Crafty.scene('Game');
  })
});