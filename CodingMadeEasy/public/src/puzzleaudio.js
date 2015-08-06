Crafty.myGame.audio = function() {

  // Declare Sounds
  Crafty.audio.add("click", "audio/click.mp3");
  Crafty.audio.add("fail", "audio/fail.mp3");
  Crafty.audio.add("success", "audio/success.mp3");

  // Declare (random) Music (0=none)
  //Crafty.audio.add("bg", 'audio/bg' + Crafty.math.randomInt(0, 2) + '.mp3');

  // Play Sounds
  Crafty.audio.play('bg', - 1, 0.05);
  Crafty.audio.play('crowd', - 1, 0.03);
  
};