let retroControls = true;

class OptionScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    init() {
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create() {
        // create title text
        this.soundsText = this.add.text(this.scaleW / 2, 40, 'Sounds?', {
            fontSize: '24px',
            fill: '#fff'
        });
        this.controlsText = this.add.text(this.scaleW / 2, 120, 'Controls?', {
            fontSize: '24px',
            fill: '#fff'
        });

        this.soundsText.setOrigin(0.5);
        this.controlsText.setOrigin(0.5);


        // create buttons
        // this.soundButton = new UiButton(this, this.scaleW / 2, this.scaleH / 2, 'soundOnButton', 'soundOffButton', '', this.startScene.bind(this, 'Options'));
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    hoverSound(){
        this.hover = game.sound.add('hover');
        this.hover.play();
    }

    clickSound(){
        this.click = game.sound.add('click');
        this.click.play();
    }


    update(){
        // MUTE BUTTON
        if(game.sound.mute===false) {
            this.muteBtn = this.add.sprite(this.scaleW / 2, 70, 'soundButton1').setInteractive();
            this.muteBtn.on('pointerover', function (pointer) {
                this.setTexture('soundButton2');
                // this.hover = game.sound.add('hover');
                // this.hover.play();
            });
            this.muteBtn.on('pointerout', function (pointer) {
                this.setTexture('soundButton1');
            });
            this.muteBtn.on('pointerdown', function (pointer) {
                this.setTexture('soundButton3');
                // console.log("soundOff");
                this.click = game.sound.add('click');
                this.click.play();
                game.sound.mute = true;
            });
        }
        else if(game.sound.mute===true){
            this.muteBtn = this.add.sprite(this.scaleW / 2, 70, 'soundButton3').setInteractive();
            this.muteBtn.on('pointerover', function (pointer) {
                this.setTexture('soundButton2');
                // this.hover = game.sound.add('hover');
                // this.hover.play();
            });
            this.muteBtn.on('pointerout', function (pointer) {
                this.setTexture('soundButton3');
            });
            this.muteBtn.on('pointerdown', function(pointer){
                this.setTexture('soundButton1');
                // console.log("soundOn");
                this.click = game.sound.add('click');
                this.click.play();
                game.sound.mute = false;
            });
        }

        // CONTROLS BUTTON
        if(!retroControls) {
            this.controlsButton = this.add.sprite(this.scaleW / 2, 150, 'controlsButton1').setInteractive();
            this.controlsButton.on('pointerover', function (pointer) {
                this.setTexture('controlsButton2');
                // console.log("hoverWASD");
            });
            this.controlsButton.on('pointerout', function (pointer) {
                this.setTexture('controlsButton1');
            });
            this.controlsButton.on('pointerdown', function (pointer) {
                this.setTexture('controlsButton3');
                retroControls = true;
                this.click = game.sound.add('click');
                this.click.play();
            });
        }
        else if (retroControls){
            this.controlsButton = this.add.sprite(this.scaleW / 2, 150, 'controlsButton3').setInteractive();
            this.controlsButton.on('pointerover', function (pointer) {
                this.setTexture('controlsButton4');
                // console.log("hoverRetro");
            });
            this.controlsButton.on('pointerout', function (pointer) {
                this.setTexture('controlsButton3');
            });
            this.controlsButton.on('pointerdown', function (pointer) {
                this.setTexture('controlsButton1');
                retroControls = false;
                this.click = game.sound.add('click');
                this.click.play();
            });
        }
    }

    startScene(targetScene) {
        this.scene.start(targetScene, {retroControls: retroControls});
    }
}