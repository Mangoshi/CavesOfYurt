class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text,  targetCallback) {
        super(scene, x, y);
        this.scene = scene; // the scene this container will be added to
        this.x = x; // the x position of our container
        this.y = y; // the y position of our container
        this.key = key; // the background image of our button
        this.hoverKey = hoverKey; // the image that will be displayed when the player hovers over the button
        this.text = text; // the text that will be displayed on the button
        this.targetCallback = targetCallback; // the callback function that will be called when the player clicks the button

        // create our Ui Button
        this.createButton();
        // add this container to our Phaser Scene
        this.scene.add.existing(this);
        this.click = game.sound.add('click');
        this.hover = game.sound.add('hover');

    }

    createButton() {
        // create buttons
        this.buttons = [
        this.startButton = this.scene.add.image(0, 0, 'startButton'),
        this.helpButton = this.scene.add.image(0, 0, 'helpButton'),
        this.settingsButton = this.scene.add.image(0, 0, 'settingsButton'),
        this.retryButton = this.scene.add.image(0, 0, 'retryButton'),
        this.backButton = this.scene.add.image(0, 0, 'backButton')
        ];

        for(let i=0; i<this.buttons.length; i++) {
            // make buttons interactive
            this.buttons[i].setInteractive();

            // scale the buttons
            this.buttons[i].setScale(1);

            // pre-set textures to show the right textures from start
            this.buttons[i].setTexture(this.key);

            // add buttons to container
            this.add(this.buttons[i]);

            // listen for events
            this.buttons[i].on('pointerdown', () => {
                this.targetCallback();
                this.click.play();
            });
            this.buttons[i].on('pointerover', () => {
                this.buttons[i].setTexture(this.hoverKey);
                this.hover.play();
            });
            this.buttons[i].on('pointerout', () => {
                this.buttons[i].setTexture(this.key);
            });
        }
        this.soundButton = this.scene.add.image(-20, -20, 'soundButtonOn');

        // this.soundButton.on('pointerover', () => {
        //     this.soundButton.setTexture(null);
        // });
        // this.soundButton.on('pointerout', () => {
        //     this.soundButton.setTexture(null);
        // });
        // this.soundButton.on('pointerdown', () => {
        //         this.soundButton.setTexture(null);
        //         this.isMuted = true;
        // });


    }
}