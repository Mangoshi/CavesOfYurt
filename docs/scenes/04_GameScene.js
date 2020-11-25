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
        this.createBackground();
        this.createTilemap();
        this.createPlayer();
        this.createEnemies();
        this.createTreasure();
        this.createAudio();
        this.createCamera();
        this.createDebugging()
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

    createBackground() {

    }

    createPlayer() {
        this.player = this.physics.add.sprite(48, 48, "player");
        this.playerAlive = true;
        this.player.score = 0;
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
        // this.treasure = this.add.group();
        // this.treasure.enableBody = true;

    }

    // getTileProperties() {
    //     console.log(this.solidLayer.getTileAt(8, 8));
    // }

    createEnemies() {
        // Making an array of slimes
        this.slimes = [];
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
        this.slimes[11] = new Slime(this, 1800, 200);
    }

    createAudio() {

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

    createDebugging() {
        this.pxText = this.add.text(0, 0, "", {font: '10px Courier', fill: '#00ff00'});
        this.pyText = this.add.text(0, 0, "", {font: '10px Courier', fill: '#00ff00'});
    }

    updateDebugging() {
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

    update() {
        this.updateDebugging();
        this.createClassicInputs();
        for(let i = 0; i < this.slimes.length; i++){
            slimeTracking(this.slimes[i], this.player);
            slimeKill(this.slimes[i], this.player, this);
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