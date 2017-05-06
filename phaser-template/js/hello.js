"use strict"; 

var HelloState = function(game) {};

HelloState.prototype.preload = function() {
    
}

HelloState.prototype.create = function() {
    this.game.add.text(250,250, "Hello State", {fill: "#ffffff"})
    
}

HelloState.prototype.update = function() {
    
}