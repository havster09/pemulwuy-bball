module PemulwuyBball.Prefab {
  export class Basketball extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, 'pemulwuy_bball', 'ball_rotate/basketBall_rotate_0000');

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

    update() {
      // Update prefab here
    }
  }
}
