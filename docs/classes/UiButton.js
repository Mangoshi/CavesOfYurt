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
        // load click sound effect from sound cache & set volume to 0.5
        this.click = game.sound.add('click', {volume: 0.5});
    }

    createButton() {
        // create buttons array ( I modified this class because it wouldn't move the text as the button moved )
        // making it an array helped reduce the amount of code needed as I could loop through them
        this.buttons = [
            this.startButton = this.scene.add.image(0, 0, 'startButton'),
            this.helpButton = this.scene.add.image(0, 0, 'helpButton'),
            this.settingsButton = this.scene.add.image(0, 0, 'settingsButton'),
            this.retryButton = this.scene.add.image(0, 0, 'retryButton'),
            this.backButton = this.scene.add.image(0, 0, 'backButton'),
            this.statsButton = this.scene.add.image(0, 0, 'statsButton')
        ];

        // for loop which loops through the length of the buttons array
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
                // if clicked send targetCallback variable to scene change
                this.targetCallback();
                // play click sound
                this.click.play();
            });
            this.buttons[i].on('pointerover', () => {
                // if hovering over, set texture to the key passed by hoverKey
                this.buttons[i].setTexture(this.hoverKey);
            });
            this.buttons[i].on('pointerout', () => {
                // if no longer hovering, reset the texture
                this.buttons[i].setTexture(this.key);
            });
        }
    }
}