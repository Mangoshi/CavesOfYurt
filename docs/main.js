var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 384,
        height: 216
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        OptionScene
        // UiScene,
        // GameOverScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
        debug: true,
        gravity: {
            y: 0,
            },
        },
    },
};

var game = new Phaser.Game(config);
game.debug = new Debug(game);
