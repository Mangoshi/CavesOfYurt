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
        this.audioToCache();
        // load font
        // this.loadFonts();
    }

    loadImages() {
        this.load.image('menuBackground', 'assets/img/menuBG.png');
        this.load.image('deathBackground', 'assets/img/deathBG.png');
        this.load.image('winBackground', 'assets/img/winBG.png');
        this.load.image('startButton', 'assets/buttons/LateNighCoffe/Green/startBtn1.png');
        this.load.image('startButton2', 'assets/buttons/LateNighCoffe/Green/startBtn2.png');
        this.load.image('helpButton', 'assets/buttons/LateNighCoffe/Green/helpBtn1.png');
        this.load.image('helpButton2', 'assets/buttons/LateNighCoffe/Green/helpBtn2.png');
        this.load.image('settingsButton', 'assets/buttons/LateNighCoffe/Green/settingsBtn1.png');
        this.load.image('settingsButton2', 'assets/buttons/LateNighCoffe/Green/settingsBtn2.png');
        this.load.image('retryButton', 'assets/buttons/LateNighCoffe/Green/retryBtn1.png');
        this.load.image('retryButton2', 'assets/buttons/LateNighCoffe/Green/retryBtn2.png');
        this.load.image('backButton', 'assets/buttons/LateNighCoffe/Green/backBtn1.png');
        this.load.image('backButton2', 'assets/buttons/LateNighCoffe/Green/backBtn2.png');
        this.load.image('soundButton1', 'assets/buttons/LateNighCoffe/Green/soundBtn1.png');
        this.load.image('soundButton2', 'assets/buttons/LateNighCoffe/Green/soundBtn2.png');
        this.load.image('soundButton3', 'assets/buttons/LateNighCoffe/Green/soundBtn3.png');
        this.load.image('soundButton4', 'assets/buttons/LateNighCoffe/Green/soundBtn4.png');
        this.load.image('controlsButton1', 'assets/buttons/LateNighCoffe/Green/controlsButton1.png');
        this.load.image('controlsButton2', 'assets/buttons/LateNighCoffe/Green/controlsButton2.png');
        this.load.image('controlsButton3', 'assets/buttons/LateNighCoffe/Green/controlsButton3.png');
        this.load.image('controlsButton4', 'assets/buttons/LateNighCoffe/Green/controlsButton4.png');
        this.load.image('ladder', 'assets/sprites/ladder.png');
        this.load.image('gem', 'assets/sprites/gold.png')
        this.load.image('block', 'assets/sprites/block.png')
    }

    loadFonts(){
        // couldn't get Phaser to pick up .fnt file or convert to .xml - very odd.. They apparently extended support for .fnt files in 2019..
        this.load.bitmapFont('mc', 'assets/bitmapfonts/mc/mc.png', 'assets/bitmapfonts/mc/mc.xml');
    }
    
    loadSpriteSheets() {
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
        // music
        // this.load.audio("bgmusic", [
        // "../assets/bgmusic.mp3",
        // "../assets/bgmusic.ogg",
        // ]);
        // sfx
        this.hoverSound = this.load.audio('hover', [
            "assets/sfx/ogg/hover.ogg",
            "assets/sfx/mp3/hover.mp3"]);
        this.clickSound = this.load.audio('click', [
            "assets/sfx/ogg/click.ogg",
            "assets/sfx/mp3/click.mp3"]);
        this.collectSound = this.load.audio('collect', [
            "assets/sfx/ogg/collect.ogg",
            "assets/sfx/mp3/collect.mp3"]);
        this.squishSound = this.load.audio('squish', [
            "assets/sfx/ogg/squish.ogg",
            "assets/sfx/mp3/squish.mp3"]);
        this.hurtSound = this.load.audio('hurt', [
            "assets/sfx/ogg/hurt.ogg",
            "assets/sfx/mp3/hurt.mp3"]);
    }

    audioToCache() {
        // this.hover = this.sound.add('hover');
        // this.click = this.sound.add('click');
        // this.collect = this.sound.add('collect');
        // this.squish = this.sound.add('squish');
        // this.hurt = this.sound.add('hurt');
    }
    
    create() {
        console.log("preloading done");
        this.scene.start("Title");
    }
}