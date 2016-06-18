var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PemulwuyBball;
(function (PemulwuyBball) {
    var Prefab;
    (function (Prefab) {
        var Ballinrack = (function (_super) {
            __extends(Ballinrack, _super);
            function Ballinrack(game, x, y) {
                _super.call(this, game, x, y, 'pemulwuy_bball', 'ball_rack_rotate/basketBall_roll_0000');
                // Set prefab properties here
                this.animations.add('rotate_ball_in_rack', Phaser.Animation.generateFrameNames('ball_rack_rotate/basketBall_roll_', 0, 3, undefined, 4), 12, false, false);
                this.anchor.set(0.5, 1);
                this.scale.set(1);
                game.add.existing(this);
            }
            Ballinrack.prototype.update = function () {
                // Update prefab here
            };
            return Ballinrack;
        })(Phaser.Sprite);
        Prefab.Ballinrack = Ballinrack;
    })(Prefab = PemulwuyBball.Prefab || (PemulwuyBball.Prefab = {}));
})(PemulwuyBball || (PemulwuyBball = {}));
//# sourceMappingURL=Ballinrack.js.map