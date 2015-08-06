// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A border is just an Actor with a certain sprite
Crafty.c('border', {
  init: function() {
    this.requires('Actor, Solid, spr_border');
  },
});

// A walls is just an Actor with a certain sprite
Crafty.c('walls', {
  init: function() {
    this.requires('Actor, Solid, spr_Floor');
  },
});

Crafty.c("Chaser" , {
required: '2D , Actor',

init: function() {
  this._chaseDirection = new Crafty.math.Vector2d();
  this._chaseObj = null;
  this._chaseSpeed = 1;
},
chase: function(chaseObj, chaseSpeed) {
  if (!chaseObj) {
    this._chaseObj = null;
    this.unbind("EnterFrame", this.chaseFrame);
  }
  else {
    this._chaseObj= chaseObj;
    this._chaseSpeed = _chaseSpeed || this._chaseSpeed
    this.uniqueBind("EnterFrame", this._chaseFrame);
  }
},
_chaseFrame: function() {
  var dir = this._chaseDirection,
      chaseObj = this._chaseObj;

      dir.setValues(chaseObj.x - this.x, chaseObj.y- this.y);
      if(dir.magnitudeSq() > 1) {
          dir.scaleToMagnitude(this._chaseSpeed);
          this.x += dir.x;
          this.y += dir.y;

      }
}


}),

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_characters')
      .fourway(4)
      .stopOnSolids()
      .onHit('Village', this.visitVillage);
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  // Respond to this player visiting a village
  visitVillage: function(data) {
    villlage = data[0].obj;
    villlage.visit();
  }
});

Crafty.c('Guard', {
  init: function() {
    this.requires('Actor, Fourway, Collision, Chaser')
      .fourway(4)
      .stopOnSolids()
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
  init: function() {
    this.requires('Actor, spr_village');
  },

  // Process a visitation with this village
  visit: function() {
    this.destroy();
    Crafty.trigger('VillageVisited', this)
    
  }
});
