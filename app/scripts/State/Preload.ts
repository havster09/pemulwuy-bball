module PemulwuyBball.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        init() {
            this.input.maxPointers = 1;
            this.physics.startSystem(Phaser.Physics.P2JS);

            //  This sets a limit on the up-scale
            this.game.scale.maxWidth = 320*2;
            this.game.scale.maxHeight = 224*2;

            //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;

            let style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            let loadingMsg = this.game.add.text(this.world.centerX, this.world.centerY, 'LOADING',style);
            loadingMsg.anchor.set(0.5);
        }

        preload() {
            // Load remaining assets here
            this.load.path = 'assets/';
            this.load.bitmapFont('fat-and-tiny');

            this.load.images(['ring']);
            this.load.physics('ring');
            this.load.atlasJSONHash('pemulwuy_bball','pemulwuy_bball.png','pemulwuy_bball.json');

            this.load.audio('bounce1', ['sounds/bounce1.ogg']);
            this.load.audio('bounce2', ['sounds/bounce2.ogg']);
            this.load.audio('bounce3', ['sounds/bounce3.ogg']);
            this.load.audio('bounce4', ['sounds/bounce4.ogg']);
            this.load.audio('swish', ['sounds/swish.ogg']);
            this.load.audio('brick', ['sounds/brick.ogg']);
            this.load.audio('whistle', ['sounds/whistle.ogg']);
            this.load.audio('tick', ['sounds/tick.ogg']);
        }

        create() {
            this.game.state.start('menu');
        }
    }
}