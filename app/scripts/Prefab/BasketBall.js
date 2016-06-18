var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PemulwuyBball;
(function (PemulwuyBball) {
    var Prefab;
    (function (Prefab) {
        var Basketball = (function (_super) {
            __extends(Basketball, _super);
            function Basketball(game, x, y) {
                _super.call(this, game, x, y, 'pemulwuy_bball', 'ball_rotate/basketBall_rotate_0000');
                game.physics.p2.enable(this);
                // Set prefab properties here
                this.animations.add('rotate_ball', Phaser.Animation.generateFrameNames('ball_rotate/basketBall_rotate_', 0, 4, undefined, 4).reverse(), 10, true, false);
                this.animations.play('rotate_ball');
                this.anchor.set(0.5);
                this.scale.set(1);
                this.body.setCircle(6.5);
                this.body.fixedRotation = true;
                this.body.damping = this.game.rnd.frac();
                game.add.existing(this);
            }
            Basketball.prototype.update = function () {
                // Update prefab here
            };
            return Basketball;
        })(Phaser.Sprite);
        Prefab.Basketball = Basketball;
    })(Prefab = PemulwuyBball.Prefab || (PemulwuyBball.Prefab = {}));
})(PemulwuyBball || (PemulwuyBball = {}));
//# sourceMappingURL=BasketBall.js.map