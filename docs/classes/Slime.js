class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'slime');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.solidLayer, this);
        scene.physics.add.collider(scene.player, this);
        // scene.physics.add.collider(this, this);

        // enemy properties

        this.body.setGravityY(300);
        this.setScale(1.3,1.0);
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

distanceAway = function (a, b) {return Math.abs(a - b);}
slimeSpeed = 0;

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
            slime.setScale(1.3, 1);
            slime.setOffset(0, 0);

        // If the player is to right of slime
        } else if (player.x > slime.x) {
            // console.log("seeking right");
            slime.setVelocityX(+slimeSpeed);
            slime.anims.play("rightS", true);
            slime.setScale(-1.3, 1.0);
            slime.setOffset(16, 0);
        }
    } else {
        slime.setVelocityX(0);
        slime.anims.play("idleS", true);
    }
}

function slimeKill(slime, player, scene) {
    // console.log(player.y);
    // console.log(slime.y);

    if (slime.body.touching.up) {
        // * player is jumping on enemy, kill it
        // any syntax I tried from elsewhere would not work (such as the destroy() and kill() functions)
        // so I just used a hack and hide the enemy while disabling its physics
        slime.alpha = 0;
        slime.body.enable = false;
    }

    // Had to use this overarching if statement to avoid a collision detection bug..
    // Without checking for the y difference between slime and player the corners of the bounding box
    // would kill the player even if only landing on the top of the slime.
    // Without checking if the body of the slime is enabled, the player would die upon reaching the bottom,
    // unless they landed right in the middle of the slime thus not intersecting with the sides at all.
    // if (distanceAway(player.y, slime.y) < 1 && slime.body.enable===true) {

    // Discovered the glitch was down to using an overlap from our sample project PLUS a collider,
    // so now I've taken that out, the collider seems to be functioning correctly.
        if (slime.body.touching.right || slime.body.touching.left || slime.body.touching.bottom) {
            // player is dead
            // player.alive = false;
            player.alpha = .5;
        }
    // }
    if (player.alive === false) {
        scene.gameOver();
    }
}