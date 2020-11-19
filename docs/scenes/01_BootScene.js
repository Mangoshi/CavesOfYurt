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
    }

    loadImages() {
        this.load.image('menuBackground', 'assets/img/menuBGs.png');
        this.load.image('button1', 'assets/buttons/LateNighCoffe/Green/startBtn1.png');
        this.load.image('button2', 'assets/buttons/LateNighCoffe/Green/startBtn2.png');
        // this.load.image('button1', 'assets/buttons/LateNighCoffe/Green/Green Button1.png')
        // this.load.image('button2', 'assets/buttons/LateNighCoffe/Green/Green Button2.png')
        this.load.image('ladder', 'assets/sprites/ladder.png');
    }
    
    loadSpriteSheets() {
        // this.load.spritesheet("player", "assets/sprites/faune2.png", {
        //     frameWidth: 17,
        //     frameHeight: 22,
        //     spacing: 1,
        // });
        // this.load.spritesheet("player", "assets/sprites/pico8girl.png", {
        //     frameWidth: 8,
        //     frameHeight: 8,
        //     spacing: 0,
        // });
        // this.load.spritesheet("slime", "assets/sprites/pico8slime.png", {
        //     frameWidth: 8,
        //     frameHeight: 8,
        //     spacing: 0,
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
        this.load.tilemapTiledJSON('testing16', 'assets/maps/testing16.json');
        // Load the tiles
        this.load.image('tiles', "assets/tiles/pico8tiles-16.png");
        this.load.image('items', "assets/tiles/pico8items-16.png");
        this.load.image('bg', "assets/tiles/mangoBG-16.png");

    }
    
    loadAudio() {
        // this.load.audio("bgmusic", [
        // "../assets/bgmusic.mp3",
        // "../assets/bgmusic.ogg",
        // ]);
    }
    
    create() {
        console.log("preloading done");
        this.scene.start("Title");
    }
}