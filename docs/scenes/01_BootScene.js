class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }
    
    preload() {
        console.log("preloading");
        // load images
        this.loadImages();
        // load spritesheets
        this.loadSpriteSheets();
        // load tilemaps
        this.loadTilemaps();
        // load audio
        this.loadAudio();
        // load font
        // this.loadFonts();
    }

    loadImages() {
        this.load.image('menuBackground', 'assets/img/menuBGs.png');
        this.load.image('button1', 'assets/buttons/LateNighCoffe/Green/startBtn1.png');
        this.load.image('button2', 'assets/buttons/LateNighCoffe/Green/startBtn2.png');
        this.load.image('ladder', 'assets/sprites/ladder.png');
    }

    loadFonts(){
        // couldn't get Phaser to pick up .fnt file or convert to .xml - very odd.. They apparently extended support for .fnt files in 2019..
        this.load.bitmapFont('mc', 'assets/bitmapfonts/mc/mc.png', 'assets/bitmapfonts/mc/mc.xml');
    }
    
    loadSpriteSheets() {
        // this.load.spritesheet("player", "assets/sprites/faune2.png", {
        //     frameWidth: 17,
        //     frameHeight: 22,
        //     spacing: 1,
        // });
        this.load.spritesheet("player", "assets/sprites/girl16.png", {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 0,
        });
        this.load.spritesheet("slime", "assets/sprites/slime16.png", {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 0,
        });
    }

    loadTilemaps() {
        console.log("loading tilemaps")
        // Load the Tiled JSON
        // this.load.tilemapTiledJSON('testing16', 'assets/maps/testing16.json');
        this.load.tilemapTiledJSON("Level1", "assets/maps/Level1.json");

        // Load the tiles
        this.load.image('tiles', "assets/tiles/tiles.png");
        this.load.image('bg', "assets/tiles/bg.png");

    }
    
    loadAudio() {
        // this.load.audio("bgmusic", [
        // "../assets/bgmusic.mp3",
        // "../assets/bgmusic.ogg",
        // ]);
        // sfx
        // this.hoverSound = game.load.audio('hover', 'assets/sfx/hover.wav')
        // this.clickSound = game.load.audio('click', 'assets/sfx/click.wav')
    }
    
    create() {
        console.log("preloading done");
        this.scene.start("Title");
    }
}