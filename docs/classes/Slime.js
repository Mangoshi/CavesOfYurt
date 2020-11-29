class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, 'slime');

        // add an existing game object to scene (gameScene) of type this (Slime)
        scene.add.existing(this);
        // add physics to gameScene on this instance of Slime
        scene.physics.add.existing(this);
        // add physics between solidLayer and instance of Slime
        scene.physics.add.collider(scene.solidLayer, this);

        // initializing variable myName to equal the value of the 'name' variable passed to constructor
        this.myName = name;
        // sets tag of this Slime instance to "Slime" - used for debugging at one point
        this.tag = "Slime"

        // debugging code used to differentiate between each Slime instance
        // console.log("Creating Slime: " + this.myName);

        // slime properties
        // gravity
        this.body.setGravityY(300);
        // scaling Y down to avoid unfair deaths
        this.setScale(1,0.8);
        // collide with world bounds
        this.setCollideWorldBounds(true);

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
// distanceAway function uses maths abs function to test the difference between two values
distanceAway = function (a, b) { return Math.abs(a - b); }
// setting slime movement speed
slimeSpeed = 60;

// SLIME TRACKING FUNCTION //
function slimeTracking(slime, player){
    // if the difference between the slime's x coordinates and player's x coordinates is less than 1
    if (distanceAway(player.x,slime.x) < 1){
        // make slime stop moving
        slime.setVelocityX(0);
        // set slime's animation to idle... This is to make it look less glitchy
        slime.anims.play("idleS", true);
    }
    // else if the difference is less than 128 on x-axis and less than 47 (3 blocks) on y-axis
    else if (distanceAway(player.x, slime.x) < 128 && distanceAway(player.y, slime.y) < 47) {
        // debug
        // console.log("within range");
        // If the player is also to the left of enemies
        if (player.x < slime.x) {
            // debug
            // console.log("seeking left");
            // set slime velocity to negative slimeSpeed
            slime.setVelocityX(-slimeSpeed);
            // play left animation
            slime.anims.play("leftS", true);
            // set scale to normal
            slime.setScale(1, 0.8);
            // reset offset
            slime.setOffset(0, 0);

        // If the player is to right of slime
        } else if (player.x > slime.x) {
            // debug
            // console.log("seeking right");
            // set slime velocity to positive slimeSpeed
            slime.setVelocityX(+slimeSpeed);
            // play right animation
            slime.anims.play("rightS", true);
            // reverse slime scale on x-axis to flip sprite
            slime.setScale(-1, 0.8);
            // change offset to make collision box match
            slime.setOffset(16, 0);
        }
    // else if player is outside of detection range
    } else {
        // set slime velocity to 0
        slime.setVelocityX(0);
        // play idle animation
        slime.anims.play("idleS", true);
    }
}

// SLIME DAMAGE FUNCTION //
function slimeDamage(slime, player, scene){
    // If touching any side of a slime other than their top
    if (slime.body.touching.right || slime.body.touching.left || slime.body.touching.down) {
        // reduce the gameScene slimesDead count by one to avoid the incorrect number of kills displaying
        scene.slimesDead -= 1;
        // player gets killed
        player.alive = false;
    }
    // if this has happened
    if (player.alive === false) {
        // run gameOver scene
        scene.gameOver();
    }
}