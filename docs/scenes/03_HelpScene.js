class HelpScene extends Phaser.Scene {
    constructor() {
        super('Help');
    }

    init() {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create() {
        // create title
        this.titleText = this.add.text(this.scaleW / 2, 40, 'The goal of the game: ', {
            fontSize: '16px',
            fill: '#fff'
        });
        // create goals
        this.goal1 = this.add.text(this.scaleW / 2, 60, 'Kill slimes by jumping on their heads', {
            fontSize: '10px',
            fill: '#fff'
        });
        this.goal2 = this.add.text(this.scaleW / 2, 80, 'Collect as many gems as you can', {
            fontSize: '10px',
            fill: '#fff'
        });
        this.goal3 = this.add.text(this.scaleW / 2, 100, 'Get to the bottom of the cave', {
            fontSize: '10px',
            fill: '#fff'
        });
        this.goal4 = this.add.text(this.scaleW / 2, 120, 'Have fun!', {
            fontSize: '10px',
            fill: '#fff'
        });
        // create controls title
        this.controlTitle = this.add.text(this.scaleW / 2, 150, 'The controls: ', {
            fontSize: '16px',
            fill: '#fff'
        });
        this.movementControls = this.add.text(this.scaleW / 2, 170, 'MOVEMENT: Left & Right or WASD', {
            fontSize: '10px',
            fill: '#fff'
        });
        this.jumpControls = this.add.text(this.scaleW / 2, 190, 'JUMP: Up or Space', {
            fontSize: '10px',
            fill: '#fff'
        });

        this.titleText.setOrigin(0.5);
        this.goal1.setOrigin(0.5);
        this.goal2.setOrigin(0.5);
        this.goal3.setOrigin(0.5);
        this.goal4.setOrigin(0.5);
        this.controlTitle.setOrigin(0.5);
        this.movementControls.setOrigin(0.5);
        this.jumpControls.setOrigin(0.5);

        // create the Play game button
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene);
    }
}