class OptionScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    init() {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        this.isMuted = false;
    }

    create() {
        // create title text
        this.titleText = this.add.text(this.scaleW / 2, this.scaleH / 3, 'Sounds?', {
            fontSize: '24px',
            fill: '#fff'
        });
        this.warning = this.add.text(this.scaleW / 2, this.scaleH / 1.5, "This button doesn't actually function.", {
            fontSize: '14px',
            fill: '#fff'
        });
        this.suggestion = this.add.text(this.scaleW / 2, this.scaleH / 1.35, "Apologies.. Mute the tab!", {
            fontSize: '14px',
            fill: '#fff'
        });

        this.titleText.setOrigin(0.5);
        this.warning.setOrigin(0.5);
        this.suggestion.setOrigin(0.5);

        // create buttons
        this.soundButton = new UiButton(this, this.scaleW / 2, this.scaleH / 2, 'soundOnButton', 'soundOffButton', '', this.startScene.bind(this, 'Options'));
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));

    }

    startScene(targetScene) {
        this.scene.start(targetScene, {isMuted: this.isMuted});
    }
}