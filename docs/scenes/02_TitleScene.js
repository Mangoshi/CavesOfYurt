class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    init() {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
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
        this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH / 2.2, 'button1', 'button2', '', this.startScene.bind(this, 'Game'));
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
        this.scene.start(targetScene);
    }
}