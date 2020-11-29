class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init(data) {
        this.jumpHeight = 150;
        this.slimeJump = 150;
        this.walkSpeed = 100;
        this.slimeSpeed = 50;
        this.debugOn = false;
        this.playerTouchingSlime = false;
        this.playerScore = data.playerScore;
        this.playerKills = data.playerKills;
        console.log('init', data);
    }

    create() {
        console.log("calling create functions");
        this.createAudio();
        this.createTilemap();
        this.createPlayer();
        this.createEnemies();
        this.createTreasure();
        this.createFinish();
        this.createCamera();
        this.createText();
        this.createHighscoreVars();
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

        this.player = this.physics.add.sprite(48, 48,"player"); // 64, 550,
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

        for (let i= 0; i < 100; i++){
            const x = Phaser.Math.RND.between(32, this.solidLayer.width - 32);
            const y = Phaser.Math.RND.between(32, this.solidLayer.height - 32);
            this.gem = this.gems.create(x, y, 'gem');
            this.gem.body.setGravityY(200);
            this.gem.setCollideWorldBounds(true);
            this.physics.add.collider(this.solidLayer, this.gem);
            this.physics.add.overlap(this.player, this.gem, this.gemTouch, null, this);

            this.gemTouch = function(player, gem) {
                gem.visible = false;
                gem.body.enable = false;
                this.playerScore++;
                this.collectSound.play();
                // console.log("gem touched");
            }
        }
    }

    createEnemies() {
        // Making an array of slimes
        this.slimes = [];
        this.slimesDead = 0;
        let newSlimeName = 0;

        // 0 - 200
        this.slimes[0] = new Slime(this, 248, 152, String(newSlimeName++));
        this.slimes[1] = new Slime(this, 200, 152, String(newSlimeName++));
        this.slimes[2] = new Slime(this, 696, 56, String(newSlimeName++));
        this.slimes[3] = new Slime(this, 920, 56, String(newSlimeName++));
        this.slimes[4] = new Slime(this, 1160, 88, String(newSlimeName++));
        this.slimes[5] = new Slime(this, 1240, 88, String(newSlimeName++));
        this.slimes[6] = new Slime(this, 1425, 120, String(newSlimeName++));
        this.slimes[7] = new Slime(this, 1610, 104, String(newSlimeName++));
        this.slimes[8] = new Slime(this, 1725, 72, String(newSlimeName++));
        this.slimes[9] = new Slime(this, 2320, 152, String(newSlimeName++));
        this.slimes[10] = new Slime(this, 2312, 72, String(newSlimeName++));
        // 200 - 400
        this.slimes[11] = new Slime(this, 1800, 200, String(newSlimeName++));
        this.slimes[12] = new Slime(this, 160, 232, String(newSlimeName++));
        this.slimes[13] = new Slime(this, 310, 232, String(newSlimeName++));
        this.slimes[14] = new Slime(this, 420, 232, String(newSlimeName++));
        this.slimes[15] = new Slime(this, 594, 184, String(newSlimeName++));
        this.slimes[16] = new Slime(this, 640, 152, String(newSlimeName++));
        this.slimes[17] = new Slime(this, 750, 104, String(newSlimeName++));
        this.slimes[18] = new Slime(this, 1200, 152, String(newSlimeName++));
        this.slimes[19] = new Slime(this, 1550, 232, String(newSlimeName++));
        this.slimes[20] = new Slime(this, 2172, 216, String(newSlimeName++));
        this.slimes[21] = new Slime(this, 1310, 200, String(newSlimeName++));
        this.slimes[22] = new Slime(this, 1150, 200, String(newSlimeName++));
        this.slimes[23] = new Slime(this, 915, 216, String(newSlimeName++));
        this.slimes[24] = new Slime(this, 840, 216, String(newSlimeName++));
        this.slimes[25] = new Slime(this, 740, 216, String(newSlimeName++));
        this.slimes[26] = new Slime(this, 602, 312, String(newSlimeName++));
        this.slimes[27] = new Slime(this, 752, 280, String(newSlimeName++));
        this.slimes[28] = new Slime(this, 380, 280, String(newSlimeName++));
        // 300 - 600
        this.slimes[29] = new Slime(this, 284, 440, String(newSlimeName++));
        this.slimes[30] = new Slime(this, 406, 440, String(newSlimeName++));
        this.slimes[31] = new Slime(this, 559, 456, String(newSlimeName++));
        this.slimes[32] = new Slime(this, 800, 440, String(newSlimeName++));
        this.slimes[33] = new Slime(this, 1194, 440, String(newSlimeName++));
        this.slimes[34] = new Slime(this, 1520, 520, String(newSlimeName++));
        this.slimes[35] = new Slime(this, 1654, 440, String(newSlimeName++));
        this.slimes[36] = new Slime(this, 2100, 520, String(newSlimeName++));
        this.slimes[37] = new Slime(this, 2310, 520, String(newSlimeName++));
        this.slimes[38] = new Slime(this, 2318, 312, String(newSlimeName++));
        this.slimes[39] = new Slime(this, 2060, 312, String(newSlimeName++));
        this.slimes[40] = new Slime(this, 1888, 280, String(newSlimeName++));
        this.slimes[41] = new Slime(this, 1600, 296, String(newSlimeName++));
        this.slimes[42] = new Slime(this, 1440, 280, String(newSlimeName++));
        this.slimes[43] = new Slime(this, 960, 280, String(newSlimeName++));
        this.slimes[44] = new Slime(this, 242, 392, String(newSlimeName++));
        this.slimes[45] = new Slime(this, 462, 392, String(newSlimeName++));
        this.slimes[46] = new Slime(this, 636, 392, String(newSlimeName++));
        this.slimes[47] = new Slime(this, 865, 392, String(newSlimeName++));
        this.slimes[48] = new Slime(this, 986, 360, String(newSlimeName++));
        this.slimes[49] = new Slime(this, 1150, 392, String(newSlimeName++));
        this.slimes[50] = new Slime(this, 1340, 360, String(newSlimeName++));
        this.slimes[51] = new Slime(this, 1582, 360, String(newSlimeName++));
        this.slimes[52] = new Slime(this, 1906, 392, String(newSlimeName++));
        this.slimes[53] = new Slime(this, 2061, 360, String(newSlimeName++));
        this.slimes[54] = new Slime(this, 1475, 472, String(newSlimeName++));
        this.slimes[55] = new Slime(this, 1660, 440, String(newSlimeName++));
        this.slimes[56] = new Slime(this, 2076, 472, String(newSlimeName++));
        this.slimes[57] = new Slime(this, 2255, 440, String(newSlimeName++));

        this.slimes.forEach((slime) => {
            let playerSlimeCollider = this.physics.add.collider(this.player, slime, function(){
                this.squishSound.play();
                slime.body.enable = false;
                slime.alpha = 0;
                this.slimesDead++;
            }, function(){
                this.physics.world.removeCollider(playerSlimeCollider);
            }, this);
        })
    }

    createAudio() {
        this.squishSound = this.sound.add('squish', {volume: 0.2});
        this.deathSound = this.sound.add('hurt', {volume: 0.3});
        this.collectSound = this.sound.add('collect', {volume: 0.1});
        this.gameMusic = this.sound.add('theme', {volume: 0.4, loop: true});
        this.gameMusic.play();
    }


    createClassicInputs() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.f1 = this.input.keyboard.addKey('F1');
        this.wKey = this.input.keyboard.addKey('W');
        this.aKey = this.input.keyboard.addKey('A');
        this.dKey = this.input.keyboard.addKey('D');
        this.escapeKey = this.input.keyboard.addKey('ESC');

        if(this.escapeKey.isDown){
            this.gameMusic.stop();
            this.scene.start('Title', {
                playerScore: this.playerScore,
                playerKills: this.slimesDead
            });
        }

        if(retroControls) {
            // if the LEFT arrow key is down
            if (this.cursors.left.isDown) {
                this.player.body.setVelocityX(-this.walkSpeed); // move left
                this.player.anims.play("left", true); // play animation with key 'left'

                if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) { // if player is moving & presses jump while not on the ground
                    this.player.body.setVelocityY(-this.jumpHeight); // jump up
                }
            }

            // if the RIGHT arrow key is down
            else if (this.cursors.right.isDown) {
                this.player.body.setVelocityX(this.walkSpeed);
                this.player.anims.play("right", true);

                if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
                    this.player.body.setVelocityY(-this.jumpHeight);
                }
            }

            // if the UP arrow key is down or space while player is on ground
            else if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
                this.player.body.setVelocityY(-this.jumpHeight);
                this.player.anims.play("jump", true);
            } else if (this.f1.isDown) {
                this.debugOn = !this.debugOn;
            }

            // else if no key is being pressed
            else {
                this.player.body.setVelocityX(0);
                this.player.anims.play("idle", true); // play 'idle' animation
            }
        } else {
            // if the A key is down
            if (this.aKey.isDown) {
                this.player.body.setVelocityX(-this.walkSpeed); // move left
                this.player.anims.play("left", true); // play animation with key 'left'

                if ((this.cursors.space.isDown || this.wKey.isDown) && this.player.body.onFloor()) { // if player is moving & presses jump while not on the ground
                    this.player.body.setVelocityY(-this.jumpHeight); // jump up
                }
            }

            // if the D key is down
            else if (this.dKey.isDown) {
                this.player.body.setVelocityX(this.walkSpeed);
                this.player.anims.play("right", true);

                if ((this.cursors.space.isDown || this.cursors.up.isDown || this.wKey.isDown) && this.player.body.onFloor()) {
                    this.player.body.setVelocityY(-this.jumpHeight);
                }
            }

            // if the W key is down or space while player is on ground
            else if ((this.cursors.space.isDown || this.wKey.isDown) && this.player.body.onFloor()) {
                this.player.body.setVelocityY(-this.jumpHeight);
                this.player.anims.play("jump", true);
            } else if (this.f1.isDown) {
                this.debugOn = !this.debugOn;
            }

            // else if no key is being pressed
            else {
                this.player.body.setVelocityX(0);
                this.player.anims.play("idle", true); // play 'idle' animation
            }
        }
    }

    createCamera(){
    this.camera = this.cameras.main;
    // set bounds so the camera won't go outside the game world
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.camera.startFollow(this.player);
    // zoom camera
    this.camera.setZoom(1);
    // offset the camera but continue following player
    this.camera.setFollowOffset(0,36);
    // round the pixel values (read somewhere it's good for avoiding weird pixel jank)
    this.camera.roundPx = true;
    }

    createText() {
        // Add text elements
        this.pScore = this.add.text(8, 8, "Treasure: ", {font: '16px Courier', fill: '#00ff00'});
        this.pKills = this.add.text(280, 8, "Kills: ", {font: '16px Courier', fill: '#00ff00'});
        this.pxText = this.add.text(0, 0, "", {font: '10px Courier', fill: '#00ff00'});
        this.pyText = this.add.text(0, 0, "", {font: '10px Courier', fill: '#00ff00'});
    }

    updateText() {
        // Update text elements set in createText()
        let score = this.pScore.setText("Treasure: " + this.playerScore);
        let kills = this.pKills.setText("Kills: " + (this.slimesDead));
        // Force score & kills counter to move with camera
        score.setScrollFactor(0);
        kills.setScrollFactor(0);
        // If F1 has been pressed to enable debug
        if (this.debugOn===true) {
            // Update pxText & pyText to show player coordinates above player head
            this.pxText.setText("playerX: " + Math.floor(this.player.x));
            this.pxText.x = this.player.x - 32;
            this.pxText.y = this.player.y - 44;

            this.pyText.setText("playerY: " + Math.floor(this.player.y));
            this.pyText.x = this.player.x - 32;
            this.pyText.y = this.player.y - 32;

        } else {
            // Else set the text to an empty string
            this.pxText.setText("");
            this.pyText.setText("");
        }
    }

    createFinish() {
        // Create physics sprite of key "block" and place at end coordinates
        this.finishBlock = this.physics.add.sprite(48, 576, "block");
        // Add collision detection between player & finishBlock
        this.physics.add.overlap(this.player, this.finishBlock);
    }

    checkFinish() {
        // If player touches top of finishBlock
        if(this.finishBlock.body.touching.up){
            // Run gameWin function
            this.gameWin();
        }
    }

    createHighscoreVars(){
        this.mostGems = 0;
        this.mostKills = 0;
    }

    updateHighscore(){
        if (this.slimesDead > this.mostKills)
        {
            this.mostKills = this.slimesDead;
            console.log("mostKills: "+this.mostKills);
        }
        if (this.playerScore > this.mostGems)
        {
            this.mostGems = this.playerScore;
            console.log("mostGems: "+this.mostGems);
        }
        if (this.mostGems > localStorage.getItem("mostGems") || !localStorage.getItem("mostGems")) {
            localStorage.setItem("mostGems", this.mostGems);
        }
        if (this.mostKills > localStorage.getItem("mostKills") || !localStorage.getItem("mostKills")) {
            localStorage.setItem("mostKills", this.mostKills);
        }
    }


    update(time, deltaTime) {
        // For each slime in slimes array, run slime functions
        this.slimes.forEach((slime) => {
            slimeTracking(slime, this.player);
            slimeDamage(slime, this.player, this);
        });

        // Call update functions
        this.updateText();
        this.createClassicInputs();
        this.checkFinish();
        this.updateHighscore();
    }

    gameOver() {
        this.gameMusic.stop();
        // Start death scene and pass score variables
        this.scene.start('Death', {
            playerScore: this.playerScore,
            // Reducing one from the slimesDead count to stop a kill from counting
            playerKills: this.slimesDead
        });
        // Play death sound
        this.deathSound.play();
    }

    gameWin() {
        this.gameMusic.stop();
        // Start win scene and pass score variables
        this.scene.start('End', {
            playerScore: this.playerScore,
            playerKills: this.slimesDead
        });
    }
}