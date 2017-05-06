"use strict"; 

var GameState = function(game) {};

GameState.prototype.preload = function() {
    this.game.load.image('logo', 'assets/phaserlogo.png');
}

GameState.prototype.create = function() {
    // set image
    this.logo = this.game.add.sprite(400,300,'logo');
    // set ancho to center
    this.logo.anchor.setTo(0.5,0.5);
    //log
    console.log("teste log line:12");
    
    //add key input to variable
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

GameState.prototype.update = function() {
    this.logo.angle += 1;
    
    //add check for key input
    if(this.spacebar.isDown){
        this.game.state.start('hello');
    }
}
