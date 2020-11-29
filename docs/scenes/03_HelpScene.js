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
        this.titleText = this.add.text(this.scaleW / 2, 20, 'The goal of the game: ', {
            fontSize: '16px',
            fill: '#FF69B4'
        });
        // create goals
        this.goal1 = this.add.text(65, 40, '• Kill slimes by jumping on their heads', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.goal2 = this.add.text(65, 60, '• Collect as many gems as you can', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.goal3 = this.add.text(65, 80, '• Get to the bottom of the cave', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.goal4 = this.add.text(65, 100, '• Have fun!', {
            fontSize: '12px',
            fill: '#fff'
        });
        // create controls title
        this.controlTitle = this.add.text(this.scaleW / 2, 140, 'The controls: ', {
            fontSize: '16px',
            fill: '#FF69B4'
        });
        this.movementControls = this.add.text(84, 160, 'MOVEMENT: Left & Right or WASD', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.jumpControls = this.add.text(112, 180, 'JUMP: Up or Space', {
            fontSize: '12px',
            fill: '#fff'
        });

        this.titleText.setOrigin(0.5);
        this.controlTitle.setOrigin(0.5);


        // create the Play game button
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene);
    }
}