"use strict"; 

var winState = function(game) {};

winState.prototype.preload = function() {
    
}

winState.prototype.create = function() {
    this.game.add.text(250,250, "You Win!", {fill: "#ffffff"})
    
}

winState.prototype.update = function() {
    
}