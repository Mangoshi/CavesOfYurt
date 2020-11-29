// initialize global variable retroControls to false, making default controls modern
let retroControls = false;

class OptionScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    // initialize using data that may have been passed from previous scene
    init(data) {
        // initialize scale variables
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        // initialize score and kills variables with variables passed from data
        this.playerScore = data.playerScore;
        this.playerKills = data.playerKills;
    }

    create() {
        // create sounds text
        this.soundsText = this.add.text(this.scaleW / 2, 40, 'Sounds?', {
            fontSize: '24px',
            fill: '#fff'
        });
        // create controls text
        this.controlsText = this.add.text(this.scaleW / 2, 120, 'Controls?', {
            fontSize: '24px',
            fill: '#fff'
        });

        // set origins to middle
        this.soundsText.setOrigin(0.5);
        this.controlsText.setOrigin(0.5);

        // create back button
        this.backButton = new UiButton(this, this.scaleW / 10.5, this.scaleH / 1.125, 'backButton', 'backButton2', '', this.startScene.bind(this, 'Title'));
    }

    update(){
        // MUTE BUTTON

        // if game sounds are NOT muted
        if(game.sound.mute===false) {
            // initialize muteBtn sprite with starting key as 'soundButton1' (on & not hovered)
            this.muteBtn = this.add.sprite(this.scaleW / 2, 70, 'soundButton1').setInteractive();
            // if user hovers pointer over said button
            this.muteBtn.on('pointerover', function (pointer) {
                // set texture to 'soundButton2' (on & hovered)
                this.setTexture('soundButton2');
            });
            // if user leaves button with pointer
            this.muteBtn.on('pointerout', function (pointer) {
                // reset texture to on & not hovered
                this.setTexture('soundButton1');
            });
            // if user clicks mute button
            this.muteBtn.on('pointerdown', function (pointer) {
                // set texture to 'soundButton3' (off & not hovered)
                this.setTexture('soundButton3');
                // initialize click sound (as it wouldn't load from elsewhere)
                this.click = game.sound.add('click');
                // play click sound
                this.click.play();
                // mute the game sounds
                game.sound.mute = true;
            });
        }
        // if game sounds ARE muted
        else if(game.sound.mute===true){
            // initialize muteBtn with starting key 'soundButton3' (off & not hovered)
            this.muteBtn = this.add.sprite(this.scaleW / 2, 70, 'soundButton3').setInteractive();
            // if user hovers over with pointer
            this.muteBtn.on('pointerover', function (pointer) {
                // set texture to off & hovered
                this.setTexture('soundButton4');
            });
            // if user hovers out
            this.muteBtn.on('pointerout', function (pointer) {
                // set texture to off & not hovered
                this.setTexture('soundButton3');
            });
            // if user clicks button
            this.muteBtn.on('pointerdown', function(pointer){
                // set texture to on & not hovered
                this.setTexture('soundButton1');
                // initialize click
                this.click = game.sound.add('click');
                // play click
                this.click.play();
                // unmute sounds
                game.sound.mute = false;
            });
        }

        // CONTROLS BUTTON
        // I'm not commenting these as the logic is exactly the same as above.
        if(!retroControls) {
            this.controlsButton = this.add.sprite(this.scaleW / 2, 150, 'controlsButton1').setInteractive();
            this.controlsButton.on('pointerover', function (pointer) {
                this.setTexture('controlsButton2');
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
        // start scene targeted by button
        this.scene.start(targetScene, {
            // pass the following data
            retroControls: retroControls,
            playerScore: this.playerScore,
            playerKills: this.playerKills
        });
    }
}