Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  64,
    height: 36,
    tile: {
      width:  16,
      height: 16
    }
  },
 
  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },
 
  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
 
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(249, 223, 125)');

    // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
 
        if (at_edge) {
          // Place a tree entity at the current tile
          Crafty.e('2D, Canvas, Color')
            .attr({
              x: x * Game.map_grid.tile.width,
              y: y * Game.map_grid.tile.height,
              w: Game.map_grid.tile.width,
              h: Game.map_grid.tile.height
            })
            .color('blue');
        } 
 

var answer1 = Crafty.e('2D, Canvas, Text, Color, Mouse')
.attr({x: 700, y: 270, w: 40, h: 40})
.color('red')
.text('now look at me now now look at me')
.bind('Click', function(MouseEvent){
  alert('wrong answer brah', MouseEvent);
});

var answer2 = Crafty.e('2D, Canvas, Text, Color, Mouse')
.attr({x: 100, y: 270, w: 40, h: 40})
.color('white')
.text('now look at me now now look at me')
.textFont({ size: '25px', family: 'Arial', weight: 'bold', color: 'black' })
.bind('Click', function(MouseEvent){
  alert('clicked', MouseEvent);
});

var answer3 = Crafty.e('2D, Canvas, Text, Color, Mouse')
.attr({x: 700, y: 400, w: 40, h: 40})
.color('green')
.text('now look at me now now look at me')
.bind('Click', function(MouseEvent){
  alert('clicked', MouseEvent);
});

var answer4 = Crafty.e('2D, Canvas, Text, Color, Mouse')
.attr({x: 100, y: 400, w: 40, h: 40})
.color('red')
.text('now look at me now now look at me')
.bind('Click', function(MouseEvent){
  alert('clicked', MouseEvent);
});

myEntity.bind('MouseUp', function(e) {
   if( e.mouseButton == Crafty.mouseButtons.RIGHT )
       console.log("Clicked right button");
})

        }
      }