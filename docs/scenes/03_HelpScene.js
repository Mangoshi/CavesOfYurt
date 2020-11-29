class HelpScene extends Phaser.Scene {
    constructor() {
        super('Help');
    }

    init() {
        // initialize scale variables again
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create() {
        // create title text
        this.titleText = this.add.text(this.scaleW / 2, 20, 'The goal', {
            fontSize: '16px',
            fill: '#FF69B4'
        });
        // create goals text
        this.goal1 = this.add.text(65, 30, '• Kill slimes by jumping on their heads', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.goal2 = this.add.text(65, 50, '• Collect as much yurtage as you can', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.goal3 = this.add.text(65, 70, '• Get to the bottom of the cave', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.goal4 = this.add.text(65, 90, '• Have fun!', {
            fontSize: '12px',
            fill: '#fff'
        });
        // create controls title text
        this.controlTitle = this.add.text(this.scaleW / 2, 130, 'The controls', {
            fontSize: '16px',
            fill: '#FF69B4'
        });
        // create controls text
        this.movementControls = this.add.text(74, 140, 'MOVEMENT: Left & Right or WASD', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.jumpControls = this.add.text(102, 160, 'JUMP: Up or Space', {
            fontSize: '12px',
            fill: '#fff'
        });
        this.menuControls = this.add.text(102, 180, 'QUIT: Escape', {
            fontSize: '12px',
            fill: '#fff'
        });

        // set both titles origin to center
        this.titleText.setOrigin(0.5);
        this.controlTitle.setOrigin(0.5);


        // create the Play game button
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        // start scene targeted by button
        this.scene.start(targetScene);
    }
}