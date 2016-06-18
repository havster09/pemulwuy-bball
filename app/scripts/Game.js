/// <reference path="../vendor/phaser-official/typescript/phaser.comments.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Prefab/BasketBall.ts"/>
/// <reference path="Prefab/Ballinrack.ts"/>
/// <reference path="State/Boot.ts"/>
/// <reference path="State/Preload.ts"/>
/// <reference path="State/Menu.ts"/>
/// <reference path="State/Main.ts"/>
var PemulwuyBball;
(function (PemulwuyBball) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 320, 224, Phaser.AUTO, "game-div", undefined, undefined, false);
            this.state.add("boot", PemulwuyBball.State.Boot);
            this.state.add("preload", PemulwuyBball.State.Preload);
            this.state.add("menu", PemulwuyBball.State.Menu);
            this.state.add("main", PemulwuyBball.State.Main);
            this.state.start("boot");
        }
        return Game;
    })(Phaser.Game);
    PemulwuyBball.Game = Game;
})(PemulwuyBball || (PemulwuyBball = {}));
window.onload = function () {
    var game = new PemulwuyBball.Game();
};
//# sourceMappingURL=Game.js.map