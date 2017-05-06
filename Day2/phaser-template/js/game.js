"use strict"; 

var GameState = function(game) {};

GameState.prototype.preload = function()
{
    this.game.load.image('player', 'Assets/player.png');
    this.game.load.image('platform', 'Assets/wallHorizontal.png');
    this.game.load.image('coin', 'Assets/coin.png');
    this.game.load.audio('jumpSound', 'Assets/jump.ogg');
    this.game.load.audio('coinSound', 'Assets/coin.ogg');
    this.game.load.image('particle', 'Assets/pixel.png');
}

GameState.prototype.create = function()
{
    //Ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);    
    
    //Adicionar cor de fundo
    this.game.stage.backgroundColor = "#01579b";
    
    //criando som
    this.jumpSound = this.game.add.audio('jumpSound');
    this.coinSound = this.game.add.audio('coinSound');
    
    //criando main player
    this.player = this.game.add.sprite(400, 300, 'player');
    this.player.anchor.setTo(0.5,0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    
    //criando moedas
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    this.coins.create(400,200,'coin');
    this.coins.create(300,350,'coin');
    this.coins.create(100,250,'coin');
    
    //Estado do jogo
    this.coinCount = 3;
    console.debug("Coins: "+ this.coinCount);
    
    //Emissor de partículas
    this.particleEmitter = this.game.add.emitter(0,0,100);
    this.particleEmitter.makeParticles('particle');
    
//    this.platform = this.game.add.sprite(300, 500, 'platform');
//    this.game.physics.enable(this.platform);
//    this.platform.body.immovable = true;
//    
//    this.platform2 = this.game.add.sprite(100, 400, 'platform');
//    this.game.physics.enable(this.platform2);
//    this.platform2.body.immovable = true;
//    
//    this.platform3 = this.game.add.sprite(300, 100, 'platform');
//    this.game.physics.enable(this.platform3);
//    this.platform3.body.immovable = true;
    
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.create(300, 500, 'platform');
    this.platforms.create(300, 300, 'platform');
    //this.platforms = this.game.add.sprite(100, 400, 'platform');    
    //Plataforma móvel
    this.movingPlatform = this.platforms.create(100,400,'platform');
    this.platforms.setAll('body.immovable', true);
    
    //Entradas 
    this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    //Plataforma móvel: para esquerda
    this.movingPlatform.body.velocity.x = -100;
}

GameState.prototype.update = function()
{
    //Colisões
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.player, this.coins, this.coinCollision, null, this);
    
    //this.game.physics.arcade.collide(this.player, this.platform);   
    
    //Movimento Jump
    if(this.jump.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -450;
        //Som ao pular
        this.jumpSound.play();
        
        this.player.angle = 0; 
        //Add Animação de interpolação
        //Giro
        this.game.add.tween(this.player).to({angle:-360}, 750, Phaser.Easing.Quadratic.Out).start();
        //Tamanho (yoyo)
        this.game.add.tween(this.player.scale).to({x:1.5 , y:1.5}, 375).yoyo(true).start();
    }
    
    //Movimento Esquerda
    if(this.left.isDown)
    {
        this.player.body.velocity.x = -200;    
    }    
    else if(this.right.isDown)
    {
        this.player.body.velocity.x = 200;    
    }
    else
    {
        this.player.body.velocity.x = 0;
    }
    
    //Plataforma móvel  
    if(this.movingPlatform.x<50)
        this.movingPlatform.body.velocity.x = +100;
    else if (this.movingPlatform.x>500)
        this.movingPlatform.body.velocity.x = -100;
    
    //Estado do jogo: condição de vitória
    if(this.coinCount == 0){
        this.game.state.start('win');
        console.debug("You Win!");
    }
    //Estado do jogo: condição de derrota
    if(this.player.y>600){
        this.game.state.start('lose');
        console.debug("You Lose!");
    }
}

GameState.prototype.coinCollision = function(player, coin){
    this.coinSound.play();
    this.particleEmitter.x = coin.x;
    this.particleEmitter.y = coin.y;
    this.particleEmitter.start(true,500,null,10);
    this.coinCount--;
    console.debug("Coins: "+ this.coinCount);
    coin.kill();
}