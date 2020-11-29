class DeathScene extends Phaser.Scene {
    constructor() {
        super('Death');
    }

    // initialize function with data from previous scenes
    init(data)
    {
        // initialize scale variables
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        // set score variables to variables passed from data
        this.playerScore = data.playerScore;
        this.playerKills = data.playerKills;
        // debug data
        // console.log('init', data);
    }

    create() {
        // create BG
        this.add.image(this.scaleW/2, this.scaleH/2, 'deathBackground');

        // create text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 4, 'You Have Died', {
            fontSize: '36px',
            fill: '#fff'
        });
        this.pScore = this.add.text(this.scaleW / 2, 140, "Yurtage collected : "+this.playerScore, {font: '12px Courier', fill: '#ffffff'});
        this.pKills = this.add.text(this.scaleW / 2, 160, "Slimes stomped on : "+this.playerKills, {font: '12px Courier', fill: '#ffffff'});

        // center text
        this.titleText.setOrigin(0.5);
        this.pScore.setOrigin(0.5);
        this.pKills.setOrigin(0.5);

        // create the Play game button
        this.retryButton = new UiButton(this, this.scaleW / 2, this.scaleH / 1.125, 'retryButton', 'retryButton2', '', this.startScene.bind(this, 'Game'));
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        // debug
        // console.log("I AM WORKING");
        // start scene targeted by button pressed
        this.scene.start(targetScene, {
            // pass this data
            playerScore: this.playerScore,
            playerKills: this.playerKills
        });
    }
}