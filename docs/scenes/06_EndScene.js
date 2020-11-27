class EndScene extends Phaser.Scene {
    constructor() {
        super('End');
    }

    init() {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create() {
        // create BG
        this.add.image(this.scaleW/2, this.scaleH/2, 'winBackground');

        // create title text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 4, 'Woohoo! You Won!', {
            fontSize: '36px',
            fill: '#fff'
        });
        this.titleText.setOrigin(0.5);

        // create the Play game button
        this.retryButton = new UiButton(this, this.scaleW / 2, this.scaleH / 1.125, 'retryButton', 'retryButton2', '', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene);
    }
}