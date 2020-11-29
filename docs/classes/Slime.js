class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, 'slime');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.solidLayer, this);
        // scene.physics.add.collider(this, this);
        this.myName = name;
        this.tag = "Slime"

        // console.log("Creating Slime: " + this.myName);


        // enemy properties

        this.body.setGravityY(300);
        this.setScale(1,0.8);
        this.setCollideWorldBounds(true);
        this.distanceAway = function (a, b) {
            return Math.abs(a - b);
        }
        this.health = 1;
        this.alive = true;

        // ANIMATION //

        scene.anims.create({
            key: "leftS",
            frames: scene.anims.generateFrameNumbers("slime", {
                frames: [17, 24, 25, 24]
            }),
            frameRate: 5,
            repeat: -1,
        });

        scene.anims.create({
            key: "rightS",
            frames: scene.anims.generateFrameNumbers("slime", {
                frames: [17, 24, 25, 24]
            }),
            frameRate: 5,
            repeat: -1,
        });

        scene.anims.create({
            key: "idleS",
            frames: scene.anims.generateFrameNumbers("slime", {
                frames: [26, 50, 26, 50, 26, 50, 51, 51]
            }),
            frameRate: 2,
            repeat: -1,
        });
    }
}

distanceAway = function (a, b) { return Math.abs(a - b); }
slimeSpeed = 60;

function slimeTracking(slime, player){
    if (distanceAway(player.x,slime.x) < 1){
        slime.setVelocityX(0);
        slime.anims.play("idleS", true);
    }
    else if (distanceAway(player.x, slime.x) < 128 && distanceAway(player.y, slime.y) < 47) {
        // console.log("within range");
        // If the player is to left of enemies
        if (player.x < slime.x) {
            // console.log("seeking left");
            slime.setVelocityX(-slimeSpeed);
            slime.anims.play("leftS", true);
            slime.setScale(1, 0.8);
            slime.setOffset(0, 0);

        // If the player is to right of slime
        } else if (player.x > slime.x) {
            // console.log("seeking right");
            slime.setVelocityX(+slimeSpeed);
            slime.anims.play("rightS", true);
            slime.setScale(-1, 0.8);
            slime.setOffset(16, 0);
        }
    } else {
        slime.setVelocityX(0);
        slime.anims.play("idleS", true);
    }
}

function slimeDamage(slime, player, scene){
    // If touching any side of a slime other than their top
    if (slime.body.touching.right || slime.body.touching.left || slime.body.touching.down) {
        // player gets killed
        player.alive = false;
    }

    if (player.alive === false) {
        scene.gameOver();
    }
}