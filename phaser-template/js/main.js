var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-canvas');

game.state.add('game', GameState);
game.state.add('hello', HelloState);
game.state.start('game');