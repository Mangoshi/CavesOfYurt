class GameScene extends Phaser.Scene {
    enemyTouched;
    constructor() {
        super('Game');
    }

    init() {
        this.jumpHeight = 150;
        this.slimeJump = 150;
        this.walkSpeed = 100;
        this.slimeSpeed = 50;
        this.debugOn = false;
        // this.treasure;
        // this.treasureScore = 0;
    }

    create() {
        console.log("calling functions");
        this.createTilemap();
        this.createPlayer();
        this.createEnemies();
        this.createTreasure();
        this.createAudio();
        this.createCamera();
        this.createText();
    }

    createTilemap() {
        this.map = this.make.tilemap({ key: 'Level1' });
        this.tileset = this.map.addTilesetImage('tiles', 'tiles')
        this.bg = this.map.addTilesetImage('bg', 'bg')

        // Create layers
        this.bgLayer = this.map.createStaticLayer('BG', this.bg);
        this.solidLayer = this.map.createStaticLayer('SOLID', this.tileset);

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.solidLayer.width;
        this.physics.world.bounds.height = this.solidLayer.height;

        // collision with solid layer
        this.solidLayer.setCollisionByExclusion(-1, true);
    }

    createPlayer() {
        this.playerAlive = true;
        this.playerScore = 0;

        this.player = this.physics.add.sprite(48, 48, "player");
        this.player.body.setGravityY(300);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.solidLayer, this.player);

        // animation states
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", {
            frames: [134, 133, 132]
        }),
        frameRate: 5,
        repeat: -1,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", {
            frames: [120, 121, 122]
        }),
        frameRate: 5,
        repeat: -1,
        });

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", {
            frames: [108, 109, 110]
        }),
        frameRate: 5,
        repeat: -1,
        });

    this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("player", {
            frames: [97, 97, 98, 96]
        }),
        frameRate: 2,
        repeat: -1,
        });
    }

    createTreasure() {
        // this.gem = this.physics.add.sprite(256, 48, "gem");
        this.gems = this.physics.add.group();
        let gemTouched = false;

        for (let i= 0; i < 100; i++){
            const x = Phaser.Math.RND.between(32, this.solidLayer.width - 32);
            const y = Phaser.Math.RND.between(32, this.solidLayer.height - 32);
            this.gem = this.gems.create(x, y, 'gem');
            this.gem.body.setGravityY(200);
            this.gem.setCollideWorldBounds(true);
            this.physics.add.collider(this.solidLayer, this.gem);
            this.physics.add.collider(this.player, this.gem, this.gemTouch, null, this);

            this.gemTouch = function(player, gem) {
                gem.visible = false;
                gem.body.enable = false;
                this.playerScore++;
                console.log("gem touched");
            }
        }
    }

    gemTouchCheck(){

    }

    // getTileProperties() {
    //     console.log(this.solidLayer.getTileAt(8, 8));
    // }

    createEnemies() {
        // Making an array of slimes
        this.slimes = []
        // 0 - 200
        this.slimes[0] = new Slime(this, 248, 152);
        this.slimes[1] = new Slime(this, 200, 152);
        this.slimes[2] = new Slime(this, 696, 56);
        this.slimes[3] = new Slime(this, 920, 56);
        this.slimes[4] = new Slime(this, 1160, 88);
        this.slimes[5] = new Slime(this, 1240, 88);
        this.slimes[6] = new Slime(this, 1425, 120);
        this.slimes[7] = new Slime(this, 1610, 104);
        this.slimes[8] = new Slime(this, 1725, 72);
        this.slimes[9] = new Slime(this, 2320, 152);
        this.slimes[10] = new Slime(this, 2312, 72);
        // 200 - 400
        this.slimes[11] = new Slime(this, 1800, 200);
        this.slimes[12] = new Slime(this, 160, 232);
        this.slimes[13] = new Slime(this, 310, 232);
        this.slimes[14] = new Slime(this, 420, 232);
        this.slimes[15] = new Slime(this, 594, 184);
        this.slimes[16] = new Slime(this, 640, 152);
        this.slimes[17] = new Slime(this, 750, 104);
        this.slimes[18] = new Slime(this, 1200, 152);
        this.slimes[19] = new Slime(this, 1550, 232);
        this.slimes[20] = new Slime(this, 2172, 216);
        this.slimes[21] = new Slime(this, 1310, 200);
        this.slimes[22] = new Slime(this, 1150, 200);
        this.slimes[23] = new Slime(this, 915, 216);
        this.slimes[24] = new Slime(this, 840, 216);
        this.slimes[25] = new Slime(this, 740, 216);
        this.slimes[26] = new Slime(this, 602, 312);
        this.slimes[27] = new Slime(this, 752, 280);
        this.slimes[28] = new Slime(this, 380, 280);
        // 300 - 600
        this.slimes[29] = new Slime(this, 284, 440);
        this.slimes[30] = new Slime(this, 406, 440);
        this.slimes[31] = new Slime(this, 559, 456);
        this.slimes[32] = new Slime(this, 800, 440);
        this.slimes[33] = new Slime(this, 1194, 440);
        this.slimes[34] = new Slime(this, 1520, 520);
        this.slimes[35] = new Slime(this, 1654, 440);
        this.slimes[36] = new Slime(this, 2100, 520);
        this.slimes[37] = new Slime(this, 2310, 520);
        this.slimes[38] = new Slime(this, 2318, 312);
        this.slimes[39] = new Slime(this, 2060, 312);
        this.slimes[40] = new Slime(this, 1888, 280);
        this.slimes[41] = new Slime(this, 1600, 296);
        this.slimes[42] = new Slime(this, 1440, 280);
        this.slimes[43] = new Slime(this, 960, 280);
        this.slimes[44] = new Slime(this, 242, 392);
        this.slimes[45] = new Slime(this, 462, 392);
        this.slimes[46] = new Slime(this, 636, 392);
        this.slimes[47] = new Slime(this, 865, 392);
        this.slimes[48] = new Slime(this, 986, 360);
        this.slimes[49] = new Slime(this, 1150, 392);
        this.slimes[50] = new Slime(this, 1340, 360);
        this.slimes[51] = new Slime(this, 1582, 360);
        this.slimes[52] = new Slime(this, 1906, 392);
        this.slimes[53] = new Slime(this, 2061, 360);
        this.slimes[54] = new Slime(this, 1475, 472);
        this.slimes[55] = new Slime(this, 1660, 440);
        this.slimes[56] = new Slime(this, 2076, 472);
        this.slimes[57] = new Slime(this, 2255, 440);



    }

    createAudio() {
        this.load.audio('click', 'assets/sfx/click.ogg');
    }

    createClassicInputs() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.f1 = this.input.keyboard.addKey('F1');

        // if the LEFT arrow key is down
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-this.walkSpeed); // move left
            this.player.anims.play("left", true); // play animation with key 'left'

            if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){ // if player is moving & presses jump while not on the ground
            this.player.body.setVelocityY(-this.jumpHeight); // jump up
            }
        }

        // if the RIGHT arrow key is down
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(this.walkSpeed);
            this.player.anims.play("right", true);

            if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){
                this.player.body.setVelocityY(-this.jumpHeight);
                }
        }

        // if the UP arrow key is down or spacebar & player is on ground
        else if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor())
        {
            this.player.body.setVelocityY(-this.jumpHeight);
            this.player.anims.play("jump", true);
        }

        else if (this.f1.isDown) {
            this.debugOn = !this.debugOn;
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
    this.camera.setZoom(1);
    this.camera.setFollowOffset(0,36);
    this.camera.roundPx = true;
    }

    createLadder() {
        this.ladder = this.add.image(328, 120, "ladder");
    }

    createText() {
        this.pScore = this.add.text(8, 8, "Treasure: ", {font: '16px Courier', fill: '#00ff00'});
        this.pxText = this.add.text(0, 0, "", {font: '10px Courier', fill: '#00ff00'});
        this.pyText = this.add.text(0, 0, "", {font: '10px Courier', fill: '#00ff00'});
    }

    updateText() {
        let score = this.pScore.setText("Treasure: " + this.playerScore);
        score.setScrollFactor(0);
        if (this.debugOn===true) {
            this.pxText.setText("playerX: " + Math.floor(this.player.x));
            this.pxText.x = this.player.x - 32;
            this.pxText.y = this.player.y - 44;

            this.pyText.setText("playerY: " + Math.floor(this.player.y));
            this.pyText.x = this.player.x - 32;
            this.pyText.y = this.player.y - 32;

        } else {
            this.pxText.setText("");
            this.pyText.setText("");
        }
    }

    scoreSystem(){
        // if(this.slimes[i].collided)

    }

    update() {
        this.scoreSystem();
        this.updateText();
        this.gemTouchCheck();
        // this.updateDebugging();
        this.createClassicInputs();
        for(let i = 0; i < this.slimes.length; i++){
            slimeTracking(this.slimes[i], this.player);
            slimeStomp(this.slimes[i], this);
            slimeDamage(this.slimes[i], this.player, this);
        }
    }

    renderDebug() {
        // game.debug.cameraInfo(this.camera, 32, 32);
        // game.debug.spriteCoords(player, 32, 500);
        // this.map.renderDebug();
    }
    

    gameOver() {
        // this.scene.start('Game Over');
        this.scene.start('Game');
    }
}