class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    init(data) {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        if(data.playerScore){
            this.playerScore = data.playerScore;
            this.playerKills = data.playerKills;
        } else {
            this.playerScore = 0;
            this.playerKills = 0;
        }
        console.log('init', data);
    }

    create() {
        this.hoverSound = this.load.audio('hover', 'assets/sfx/hover.ogg');
        this.clickSound = this.load.audio('click', 'assets/sfx/click.ogg');

        this.add.image(this.scaleW/2, this.scaleH/2, 'menuBackground');

        // create title text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 4, 'Caves Of Yurt', {
            fontSize: '48px',
            fill: '#fff'
        });
        this.titleText.setOrigin(0.5);

        // create the Play game button
        this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH / 2.2, 'startButton', 'startButton2', '', this.startScene.bind(this, 'Game'));

        // create help button
        this.helpButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'helpButton', 'helpButton2', '', this.startScene.bind(this, 'Help'));

        // create settings button
        this.settingsButton = new UiButton(this, this.scaleW / 1.1075, this.scaleH / 1.125, 'settingsButton', 'settingsButton2', '', this.startScene.bind(this, 'Options'));
    }

    update() {
        // listen for events
        this.startGameButton.on('pointerdown', () => {
            this.clickSound.play("click");
            console.log("clicked");
        });

        this.startGameButton.on('pointerover', () => {
            this.hoverSound.play("hover");
            console.log("hover");
        });
    }

    startScene(targetScene) {
        this.scene.start(targetScene , {
            retroControls: retroControls,
            playerScore: this.playerScore,
            playerKills: this.playerKills
            });
    }
}