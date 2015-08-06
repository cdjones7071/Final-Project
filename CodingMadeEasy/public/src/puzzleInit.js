Crafty.myGame = {};
Crafty.myGame.W = 5+(80+10)*6; // Top Margin 20, Margin 5, Spacing 5, 100 Tilesize, 6 Cards across
Crafty.myGame.H = 10+5+(80+10)*5; // Margin 5, Spacing 5, 100 Tilesize, 5 Cards down

Crafty.init(Crafty.myGame.W, Crafty.myGame.H);

Crafty.myGame.cardsToFind = 15;
Crafty.myGame.shuffle = true;

// Brown background
Crafty.background('url(img/bg.png)');