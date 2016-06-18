module PemulwuyBball.Prefab {
  export class Ballinrack extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, 'pemulwuy_bball', 'ball_rack_rotate/basketBall_roll_0000');

      // Set prefab properties here
      this.animations.add('rotate_ball_in_rack', Phaser.Animation.generateFrameNames('ball_rack_rotate/basketBall_roll_', 0, 3, undefined, 4), 12, false, false);
      this.anchor.set(0.5, 1);
      this.scale.set(1);
      game.add.existing(this);
    }

    update() {
      // Update prefab here
    }
  }
}
