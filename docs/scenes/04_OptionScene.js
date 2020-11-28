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

        this.titleText.setOrigin(0.5);


        // create buttons
        // this.soundButton = new UiButton(this, this.scaleW / 2, this.scaleH / 2, 'soundOnButton', 'soundOffButton', '', this.startScene.bind(this, 'Options'));
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    update(){
        if(game.sound.mute===false) {
            this.muteBtn = this.add.sprite(this.scaleW / 2, this.scaleH / 2, 'soundOnButton').setInteractive();
            this.muteBtn.on('pointerdown', function (pointer) {
                this.setTexture('soundOffButton');
                // console.log("soundOff");
                game.sound.mute = true;
            });
        }
        else if(game.sound.mute===true){
            this.muteBtn = this.add.sprite(this.scaleW / 2, this.scaleH / 2, 'soundOffButton').setInteractive();
            this.muteBtn.on('pointerdown', function(pointer){
                this.setTexture('soundOnButton');
                // console.log("soundOn");
                game.sound.mute = false;
            });
        }
        // if(this.retroControls===true){
        //     this.retroButton = this.add.sprite(this.scaleW / 2, this.scaleH / 1.1, 'retroButton').setInteractive();
        //     this.retroButton.on('pointerdown', function (pointer) {
        //         this.retroControls = false;
        //     });
        // }
        // else{
        //     this.wasdButton = this.add.sprite(this.scaleW / 2, this.scaleH / 1.1, 'wasdButton').setInteractive();
        //     this.wasdButton.on('pointerdown', function (pointer) {
        //         this.retroControls = true;
        //     });
        // }
    }

    startScene(targetScene) {
        this.scene.start(targetScene, {isMuted: this.isMuted});
    }
}