class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.jumpHeight = 125;
        this.slimeJump = 75;
        this.walkSpeed = 50;
        this.slimeSpeed = 30;
    }

    create() {
        console.log("calling functions");
        this.createBackground();
        this.createTilemap();
        this.createPlayer();
        this.createEnemies();
        this.createTreasure();
        this.createAudio();
        this.createCamera();
    }

    createTilemap() {
        console.log("creating tilemap")
        this.map = this.make.tilemap({ key: 'testingHall' });

        // Add tileset images
        this.tileset = this.map.addTilesetImage('pico8 tiles', 'tiles');
        this.items = this.map.addTilesetImage('pico8 items', 'items');
        this.bg = this.map.addTilesetImage('mangoBG', 'bg')

        // Create layers
        // this.backgroundLayer = this.map.createStaticLayer('BACKGROUND', this.bg);
        this.foregroundLayer = this.map.createStaticLayer('FOREGROUND', this.tileset);
        this.itemsLayer = this.map.createStaticLayer('ITEMS', this.items);
        this.solidLayer = this.map.createStaticLayer('SOLID', this.tileset);

        // this.allLayers = [itemsLayer, foregroundLayer, backgroundLayer, solidLayer]
        // allLayers.forEach(i => i.setScale(1));

        // this.solidLayer.setCollisionByProperty({collides: true});
        this.solidLayer.setCollisionByExclusion(-1, true);

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.solidLayer.width;
        this.physics.world.bounds.height = this.solidLayer.height;
    }

    createBackground() {

    }

    createPlayer() {
        this.player = this.physics.add.sprite(32, 88, "player");
        this.player.setScale(0.4);
        this.playerAlive = true;
        this.player.score = 0;
        this.player.body.setGravityY(300);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.solidLayer, this.player);

        // animation states
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", {
            start: 0,
            end: 8,
        }),
        frameRate: 15,
        repeat: -1,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", {
            start: 0,
            end: 8,
        }),
        frameRate: 15,
        repeat: -1,
        });

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", {
            start: 3,
            end: 3,
        }),
        frameRate: 15,
        repeat: -1,
        });

            this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("player", {
            start: 3,
            end: 4,
        }),
        frameRate: 2,
        repeat: -1,
        });
    }

    createTreasure() {

    }

    createEnemies() {
        this.enemy = this.physics.add.sprite(128,120,"slime");
        this.enemy.body.setGravityY(300);
        this.enemy.setCollideWorldBounds(true);
        this.physics.add.collider(this.solidLayer, this.enemy);
        this.physics.add.collider(this.enemy, this.player);

        this.distanceAway = function (a,b) {return Math.abs(a-b);}

        // this.enemy.checkPlayerLoc = function(pX, pY) {
        //     console.log("Player Location: ");
        //     console.log(pX,pY);

        //     console.log("Check Enemy Location: ");
        //     console.log(this.x, this.y);
        // }

        //11: add a collider between player and enemies
        this.physics.add.overlap(
            this.player,
            this.enemy,
            this.collisionCheck,
            null,
            this
        );

        this.anims.create({
            key: "leftS",
            frames: this.anims.generateFrameNumbers("slime", {
                frames: [ 17, 24, 25, 24 ]
            }),
            frameRate: 5,
            repeat: -1,
        });
    
        this.anims.create({
            key: "rightS",
            frames: this.anims.generateFrameNumbers("slime", {
                frames: [ 17, 24, 25, 24 ]
            }),
            frameRate: 5,
            repeat: -1,
            });

        this.anims.create({
            key: "idleS",
            frames: this.anims.generateFrameNumbers("slime", {
                frames: [ 26, 50, 26, 50, 26, 50, 51, 51 ]
            }),
            frameRate: 2,
            repeat: -1,
            });

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.collisionCheck,
            null,
            this
        );
    }


enemyTracking() {
    if(this.distanceAway(this.player.x,this.enemy.x) < 50){
        console.log("within range");

        // If the player is to left of enemy
        if (this.player.x < this.enemy.x) {
            console.log("seeking left");
            this.enemy.setVelocityX(-this.slimeSpeed);
            this.enemy.anims.play("leftS", true);
            this.enemy.setScale(1, 1);
            this.enemy.setOffset(0, 0);

        // If the player is to right of slime
        } else if (this.player.x > this.enemy.x) {
            console.log("seeking right");
            this.enemy.setVelocityX(+this.slimeSpeed);
            this.enemy.anims.play("rightS", true);
            this.enemy.setScale(-1, 1);
            this.enemy.setOffset(8, 0);
        }
    } else {
        this.enemy.setVelocityX(0);
        this.enemy.anims.play("idleS", true);
    }
}

    // createEnemyMovement() {
    //     slime.setX -=50;
    // }

    createAudio() {

    }

    createClassicInputs() {
        this.cursors = this.input.keyboard.createCursorKeys();

        // if the LEFT arrow key is down
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-this.walkSpeed); // move left
            this.player.anims.play("left", true); // play animation with key 'left'
            this.player.setScale(-0.4,0.4); // flip X-scale
            this.player.setOffset(17,0) // offset hitbox by width of sprite
            
            if(this.player.body.onFloor()==false){ // if player is in mid-air
                this.player.anims.play("jump", true); // play jump animation
            }
            if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){ // if player is moving & presses jump while not on the ground
            this.player.body.setVelocityY(-this.jumpHeight); // jump up
            this.player.anims.play("jump", true); // play jump animation
            }
        }

        // if the RIGHT arrow key is down
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(this.walkSpeed);
            this.player.anims.play("right", true);
            this.player.setScale(0.4,0.4);
            this.player.setOffset(0,0)

            if(this.player.body.onFloor()==false){
                this.player.anims.play("jump", true);
            }
            if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){
                this.player.body.setVelocityY(-this.jumpHeight);
                this.player.anims.play("jump", true);
                }
        }

        // if the UP arrow key is down or spacebar & player is on ground
        else if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor())
        {
            this.player.body.setVelocityY(-this.jumpHeight);
            this.player.anims.play("jump", true);
        }

        // else if no key is being pressed
        else {
            this.player.body.setVelocityX(0);
            this.player.anims.play("idle", true); // play 'idle' animation
        }
    }

    createCamera(){
    this.camera = this.cameras.main;
    // set bounds so the camera won't go outside the game world
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.camera.startFollow(this.player);
    this.camera.setZoom(2.5);
    this.camera.roundPx = true;
    }

    deathCheck(){
        if (this.isPlayerAlive==false) {
            this.gameOver();
        }
    }

    update() {
        this.createClassicInputs();
        this.deathCheck();
        this.enemyTracking();
        // this.enemy.checkPlayerLoc(this.player.x, this.player.y);


        // collisionCheck(player, enemy) 
        // {
        //     console.log("overlap");
        //     this.gameOver();
        // }
    }

    render() {
        game.debug.cameraInfo(this.camera, 32, 32);
        game.debug.spriteCoords(player, 32, 500);
    }
    

    gameOver() {
        this.scene.start('Game Over');
    }
}