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
        // load background images
        this.load.image('menuBackground', 'assets/img/menuBG.png');
        this.load.image('deathBackground', 'assets/img/deathBG.png');
        this.load.image('winBackground', 'assets/img/winBG.png');
        // load button images
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
        this.load.image('controlsButton1', 'assets/buttons/LateNighCoffe/Green/controlsBtn1.png');
        this.load.image('controlsButton2', 'assets/buttons/LateNighCoffe/Green/controlsBtn2.png');
        this.load.image('controlsButton3', 'assets/buttons/LateNighCoffe/Green/controlsBtn3.png');
        this.load.image('controlsButton4', 'assets/buttons/LateNighCoffe/Green/controlsBtn4.png');
        this.load.image('statsButton1', 'assets/buttons/LateNighCoffe/Green/statsBtn1.png');
        this.load.image('statsButton2', 'assets/buttons/LateNighCoffe/Green/statsBtn2.png');
        // load item images
        this.load.image('yurt', 'assets/sprites/yurt.png')
        this.load.image('block', 'assets/sprites/block.png')
    }
    
    loadSpriteSheets() {
        // Load the player and slime sprite sheets
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
        this.load.tilemapTiledJSON("Level1", "assets/maps/Level1.json");

        // Load the tiles
        this.load.image('tiles', "assets/tiles/tiles.png");
        this.load.image('bg', "assets/tiles/bg.png");

    }
    
    loadAudio() {
        // loading music
        this.gameTheme = this.load.audio('theme', [
            "assets/music/ogg/CavesOfYurt_loop.ogg",
            "assets/music/mp3/CavesOfYurt_loop.mp3"]);
        // loading sfx
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
    
    create() {
        // log when preloading completes and switch to Title scene
        console.log("preloading done");
        this.scene.start("Title");
    }
}