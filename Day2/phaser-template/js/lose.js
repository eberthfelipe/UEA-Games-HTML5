"use strict"; 

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
    //Entradas 
    this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

LoseState.prototype.create = function() {
    this.game.add.text(250,250, "You Lose!", {fill: "#ffffff"})
    
}

LoseState.prototype.update = function() {
    
}