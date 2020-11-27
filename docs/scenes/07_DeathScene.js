class DeathScene extends Phaser.Scene {
    constructor() {
        super('Death');
    }

    init() {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create() {
        // create BG
        this.add.image(this.scaleW/2, this.scaleH/2, 'deathBackground');

        // create title text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 4, 'You Have Died', {
            fontSize: '36px',
            fill: '#fff'
        });
        this.titleText.setOrigin(0.5);

        // create the Play game button
        this.retryButton = new UiButton(this, this.scaleW / 2, this.scaleH / 1.125, 'retryButton', 'retryButton2', '', this.startScene.bind(this, 'Game'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene);
    }
}