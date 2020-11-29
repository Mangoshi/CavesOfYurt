var config = {
    // auto choose the renderer
    type: Phaser.AUTO,
    // enables pixelArt mode to avoid tiny PNGs being blurry
    pixelArt: true,
    // set scale of game to fit the window and center
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 384,
        height: 216
    },
    // load the following scenes
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        OptionScene,
        HelpScene,
        EndScene,
        DeathScene,
        StatScene
    ],
    // use the arcade physics engine
    physics: {
        default: 'arcade',
        arcade: {
        // disable debugging (re-enable to see bounding boxes)
        debug: false,
        // sets gravity of the game to 0 (overridden within gameScene)
        gravity: {
            y: 0,
            },
        },
    },
};
// initialize game variable as new Phaser Game Object with config variables passed in
const game = new Phaser.Game(config);

