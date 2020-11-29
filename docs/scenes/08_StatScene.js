class StatScene extends Phaser.Scene {
    constructor() {
        super('Stats');
    }

    init(data)
    {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        // console.log('init', data);
        this.playerScore = data.playerScore;
        this.playerKills = data.playerKills;
    }

    create() {
        // create text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 4, 'High Scores', {
            fontSize: '36px',
            fill: '#fff'
        });
        this.pScore = this.add.text(this.scaleW / 2, 140, "Most treasure collected : "+localStorage.getItem("mostGems"), {font: '12px Courier', fill: '#ffffff'});
        this.pKills = this.add.text(this.scaleW / 2, 160, "Most slimes stomped on : "+localStorage.getItem("mostKills"), {font: '12px Courier', fill: '#ffffff'});

        // center text
        this.titleText.setOrigin(0.5);
        this.pScore.setOrigin(0.5);
        this.pKills.setOrigin(0.5);

        // create the Play game button
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene, {
            playerScore: this.playerScore,
            playerKills: this.playerKills
        });
    }
}