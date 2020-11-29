class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    init(data) {
        // initializing scaleW & scaleH vars to width and height of game object
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        // if data has been passed here
        if(data.playerScore){
            // initialize playerScore and playerKills to what data got passed here
            this.playerScore = data.playerScore;
            this.playerKills = data.playerKills;
        // otherwise if this is the first time the user gets here
        } else {
            // initialize them as 0
            this.playerScore = 0;
            this.playerKills = 0;
        }
        // logging data to console for debugging purposes
        // console.log('init', data);
    }

    create() {
        // load clickSound & hoverSound from the audio cache
        this.hoverSound = this.load.audio('hover', 'assets/sfx/hover.ogg');
        this.clickSound = this.load.audio('click', 'assets/sfx/click.ogg');

        // add menuBackground image from image cache
        this.add.image(this.scaleW/2, this.scaleH/2, 'menuBackground');

        // create title text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 4, 'Caves Of Yurt', {
            fontSize: '48px',
            fill: '#fff'
        });
        // set origin of text to the center as opposed to the left
        this.titleText.setOrigin(0.5);

        // create the Play game button
        this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH / 2.2, 'startButton', 'startButton2', '', this.startScene.bind(this, 'Game'));

        // create help button
        this.helpButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'helpButton', 'helpButton2', '', this.startScene.bind(this, 'Help'));

        // create settings button
        this.settingsButton = new UiButton(this, this.scaleW / 1.1075, this.scaleH / 1.125, 'settingsButton', 'settingsButton2', '', this.startScene.bind(this, 'Options'));

        // create stats button
        this.statsButton = new UiButton(this, this.scaleW / 2, this.scaleH / 1.125, 'statsButton1', 'statsButton2', '', this.startScene.bind(this, 'Stats'));
    }

    startScene(targetScene) {
        // start scene targeted by button clicked
        this.scene.start(targetScene , {
            // pass the following data to the target scene
            retroControls: retroControls,
            playerScore: this.playerScore,
            playerKills: this.playerKills
            });
    }
}