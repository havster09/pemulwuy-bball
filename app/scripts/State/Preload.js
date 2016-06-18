var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PemulwuyBball;
(function (PemulwuyBball) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.init = function () {
                this.input.maxPointers = 1;
                this.physics.startSystem(Phaser.Physics.P2JS);
                //  This sets a limit on the up-scale
                this.game.scale.maxWidth = 320 * 2;
                this.game.scale.maxHeight = 224 * 2;
                //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;
                var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
                var loadingMsg = this.game.add.text(this.world.centerX, this.world.centerY, 'LOADING', style);
                loadingMsg.anchor.set(0.5);
            };
            Preload.prototype.preload = function () {
                // Load remaining assets here
                this.load.path = 'assets/';
                this.load.bitmapFont('fat-and-tiny');
                this.load.images(['ring']);
                this.load.physics('ring');
                this.load.atlasJSONHash('pemulwuy_bball', 'pemulwuy_bball.png', 'pemulwuy_bball.json');
                this.load.audio('bounce1', ['sounds/bounce1.ogg']);
                this.load.audio('bounce2', ['sounds/bounce2.ogg']);
                this.load.audio('bounce3', ['sounds/bounce3.ogg']);
                this.load.audio('bounce4', ['sounds/bounce4.ogg']);
                this.load.audio('swish', ['sounds/swish.ogg']);
                this.load.audio('brick', ['sounds/brick.ogg']);
                this.load.audio('whistle', ['sounds/whistle.ogg']);
                this.load.audio('tick', ['sounds/tick.ogg']);
            };
            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = PemulwuyBball.State || (PemulwuyBball.State = {}));
})(PemulwuyBball || (PemulwuyBball = {}));
//# sourceMappingURL=Preload.js.map