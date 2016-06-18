var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
var PemulwuyBball;
(function (PemulwuyBball) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0x000000;
                // Assign global settings here
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = PemulwuyBball.State || (PemulwuyBball.State = {}));
})(PemulwuyBball || (PemulwuyBball = {}));
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
var PemulwuyBball;
(function (PemulwuyBball) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.init = function (customData) {
                this.customData = customData;
            };
            Menu.prototype.create = function () {
                var _this = this;
                this.stage.backgroundColor = "#000";
                var gameTitle = this.add.bitmapText(this.world.centerX, this.world.centerY, 'fat-and-tiny', 'AND WAAAN:PRESENTED BY PBL', 20);
                var start = this.add.bitmapText(this.world.centerX, this.world.centerY + 30, 'fat-and-tiny', 'TAP TO START', 20);
                var instructions = this.add.bitmapText(this.world.centerX, this.world.centerY + 40, 'fat-and-tiny', 'SWIPE TO SHOOT', 20);
                start.tint = instructions.tint = 0x80ff00;
                gameTitle.anchor.x = start.anchor.x = instructions.anchor.x = 0.5;
                start.anchor.y = 0.5;
                start.smoothed = false;
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('main');
                });
                if (this.customData) {
                    var scoreMsg = this.customData.score + ' out 25';
                    var rankMsg = this.getRank(this.customData.score);
                    var cesarRatingMsg = this.getCesarRating(this.customData.score);
                    var score = this.add.bitmapText(this.world.centerX, 50, 'fat-and-tiny', scoreMsg, 20);
                    var rank = this.add.bitmapText(this.world.centerX, 70, 'fat-and-tiny', rankMsg.toUpperCase(), 20);
                    var cesarRating = this.add.bitmapText(this.world.centerX, 90, 'fat-and-tiny', 'CZ RATING: ' + cesarRatingMsg.toUpperCase(), 20);
                    // score.tint = rank.tint = cesarRating.tint = 0x80ff00;
                    score.anchor.x = rank.anchor.x = cesarRating.anchor.x = 0.5;
                    score.smoothed = rank.smoothed = cesarRating.smoothed = false;
                }
            };
            Menu.prototype.getRank = function (score) {
                switch (score) {
                    case 15:
                        return 'call the fucken screens';
                    case 16:
                        return 'don\'t wreck the net cunt';
                    case 17:
                        return 'play some fucking defence';
                    case 18:
                        return '4 o clock boys?';
                    case 19:
                        return 'ballin?';
                    case 20:
                        return 'easy money sniiiper';
                    case 21:
                        return 'soft cunt';
                    case 22:
                        return 'shit cunt';
                    case 23:
                        return 'bitch';
                    case 24:
                        return 'snipa';
                    case 25:
                        return 'and waaaaaan';
                    default:
                        return 'isis cunt';
                }
            };
            Menu.prototype.getCesarRating = function (score) {
                switch (score) {
                    case 18:
                        return 'how is that a travel';
                    case 19:
                        return 'get the fucking rebounds';
                    case 20:
                        return 'soy sauce';
                    case 21:
                        return 'go back to rees st';
                    case 22:
                        return 'u got a sore vagina';
                    case 23:
                        return 'i\'m retiring';
                    case 24:
                        return 'fak!';
                    case 25:
                        return 'rigged like pbl fantasy';
                    default:
                        return 'can\'t shoot for shit';
                }
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(State = PemulwuyBball.State || (PemulwuyBball.State = {}));
})(PemulwuyBball || (PemulwuyBball = {}));
var PemulwuyBball;
(function (PemulwuyBball) {
    var State;
    (function (State) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
                this.showDebug = false;
            }
            Main.prototype.init = function () {
                this.physics.p2.gravity.y = 300;
                this.physics.p2.restitution = 0.8;
                this.timeLeft = 60;
                this.score = 0;
                this.shotsLeft = 25;
                this.shotsTaken = 0;
                this.canShoot = true;
                this.changeBg = false;
                this.rackBallCount = [5, 10, 15, 20, 25];
            };
            Main.prototype.create = function () {
                this.stage.backgroundColor = '#000';
                this.game.time.events.repeat(Phaser.Timer.SECOND, 60, this.minusTimeLeft, this);
                this.blackPixel = this.add.sprite(0, 0, 'pemulwuy_bball', 'black_pixel');
                this.blackPixel.scale.set(320, 224);
                this.blackPixel.alpha = 0;
                this.mainBg = this.add.sprite(160, 112, 'pemulwuy_bball', 'arena_background/bg_0001');
                this.mainBg.anchor.set(0.5);
                this.basketBalls = this.game.add.group();
                // Physics
                this.basketBalls = this.add.physicsGroup(Phaser.Physics.P2JS);
                this.basketBalls.enableBodyDebug = this.showDebug;
                this.ballRack = this.add.sprite(71, 224, 'pemulwuy_bball', 'ball_rack');
                this.ballRack.anchor.set(0, 1);
                this.ballsInRack = this.game.add.group();
                this.putBallsInRack();
                this.shooter = this.add.sprite(160, 224, 'pemulwuy_bball', 'shoot/shoot_0000');
                this.shooter.anchor.set(0.5, 1);
                this.shooter.animations.add('shoot', Phaser.Animation.generateFrameNames('shoot/shoot_', 1, 9, undefined, 4), 12, false, false);
                this.shooter.animations.add('get_ball', Phaser.Animation.generateFrameNames('get_ball/get_ball_', 1, 8, undefined, 4), 14, false, false);
                this.game.input.onDown.add(this.beginSwipe, this);
                this.shooter.events.onAnimationStart.add(function () {
                    switch (this.shooter.animations.currentAnim.name) {
                        case 'shoot':
                            this.shotsTaken++;
                            this.canShoot = false;
                            break;
                        case 'get_ball':
                            // kill first ball in rack
                            this.ballsInRack.getFirstAlive().kill();
                            this.ballsInRack.forEachAlive(this.moveDownRack, this);
                            break;
                    }
                }, this);
                this.shooter.events.onAnimationComplete.add(function () {
                    switch (this.shooter.animations.currentAnim.name) {
                        case 'shoot':
                            this.shooter.frame = 0;
                            var basketBall = this.basketBalls.getFirstDead();
                            if (basketBall) {
                                basketBall.reset(168, 46);
                                basketBall.scale.set(1);
                                basketBall.animations.play('rotate_ball');
                                basketBall.body.damping = this.game.rnd.frac();
                                this.addBallVelocity(basketBall);
                            }
                            else {
                                basketBall = new PemulwuyBball.Prefab.Basketball(this.game, 168, 46);
                                this.basketBalls.addChild(basketBall);
                                this.game.world.bringToTop(this.ballsInRack);
                            }
                            this.game.add.tween(basketBall.scale).to({
                                x: 0.5,
                                y: 0.5
                            }, 500, Phaser.Easing.Linear.None, true);
                            this.game.world.bringToTop(this.shooter);
                            basketBall.foul = false;
                            this.addBallVelocity(basketBall);
                            // Change shooter location after rack is empty
                            if (this.rackBallCount.indexOf(this.shotsTaken) > -1) {
                                this.shooter.animations.stop('shoot');
                                this.shooter.frameName = "shoot/shoot_0000";
                                this.checkLastShotBall(basketBall);
                            }
                            else {
                                if (!this.canShoot) {
                                    this.shooter.animations.play('get_ball');
                                }
                            }
                            break;
                        case 'get_ball':
                            this.canShoot = true;
                            break;
                    }
                }, this);
                //  Score
                this.timeLeftText = this.add.bitmapText(230, 0, 'fat-and-tiny', 'TIME:' + this.timeLeft, 30);
                this.scoreText = this.add.bitmapText(4, 0, 'fat-and-tiny', 'SCORE: 0', 20);
                this.shotsLeftText = this.add.bitmapText(4, 13, 'fat-and-tiny', 'SHOTS: ' + this.shotsLeft, 20);
                this.shotsLeftText.smoothed = this.scoreText.smoothed = this.timeLeftText.smoothed = false;
                this.shotsLeftText.tint = this.scoreText.tint = this.timeLeftText.tint = 0x6fff00;
                this.ring = this.add.sprite(160, 115, 'pemulwuy_bball', 'basket');
                this.ring.anchor.set(0.5, 0);
                this.physics.p2.enable(this.ring, this.showDebug);
                this.ring.body.static = true;
                this.ring.body.clearShapes();
                this.ring.body.loadPolygon('ring', 'ring');
                this.ring.body.data.gravityScale = 0;
                var net = this.ring.body.addCircle(6, 0, 15);
                net.sensor = true;
                var floor = this.ring.body.addPlane(0, 90);
                this.ring.body.onBeginContact.add(this.checkBasketBall, this);
                this.game.world.bringToTop(this.shooter);
                // Sounds
                this.bounce1 = this.game.add.audio('bounce1');
                this.bounce2 = this.game.add.audio('bounce2');
                this.bounce3 = this.game.add.audio('bounce3');
                this.bounce4 = this.game.add.audio('bounce4');
                this.bounceCollection = [this.bounce1, this.bounce2, this.bounce3, this.bounce4];
                this.whistle = this.game.add.audio('whistle');
                this.swish = this.game.add.audio('swish');
                this.brick = this.game.add.audio('brick');
                this.tick = this.game.add.audio('tick');
            };
            Main.prototype.minusTimeLeft = function () {
                this.timeLeft--;
                if (this.timeLeft < 1) {
                    this.gameOver();
                }
                this.timeLeftText.text = 'TIME:' + this.timeLeft;
                this.tick.play();
            };
            Main.prototype.moveDownRack = function (basketball) {
                basketball.animations.play('rotate_ball_in_rack');
            };
            Main.prototype.beginSwipe = function () {
                this.startX = this.game.input.worldX;
                this.startY = this.game.input.worldY;
                this.game.input.onDown.remove(this.beginSwipe, this);
                this.game.input.onUp.add(this.endSwipe, this);
            };
            Main.prototype.endSwipe = function () {
                this.endX = this.game.input.worldX;
                this.endY = this.game.input.worldY;
                var distX = this.startX - this.endX;
                var distY = this.startY - this.endY;
                if (Math.abs(distX) > Math.abs(distY) * 2 && Math.abs(distX) > 10) {
                    // moving left
                    if (distX > 0) {
                        this.shootSwipe(this.shooter, -1, 0, distX, distY);
                    }
                    else {
                        this.shootSwipe(this.shooter, 1, 0, distX, distY);
                    }
                }
                if (Math.abs(distY) > Math.abs(distX) * 2 && Math.abs(distY) > 10) {
                    // moving up
                    if (distY > 0) {
                        this.shootSwipe(this.shooter, 0, -1, distX, distY);
                    }
                    else {
                        this.shootSwipe(this.shooter, 0, 1, distX, distY);
                    }
                }
                this.game.input.onDown.add(this.beginSwipe, this);
                this.game.input.onUp.remove(this.endSwipe, this);
            };
            Main.prototype.addBallVelocity = function (basketBall) {
                // use [0.5,0.1],0,0 for made basket
                var aimVelocity = this.distX / 15 + 0.5;
                if (aimVelocity > 1.1) {
                    aimVelocity = 1.1;
                }
                else if (aimVelocity < -0.4) {
                    aimVelocity = -0.4;
                }
                basketBall.body.applyImpulseLocal([aimVelocity, this.distY / 2000], 0, 1);
            };
            Main.prototype.checkBasketBall = function (body, bodyB, shapeA, shapeB, equation) {
                if (shapeA.type === 1 && shapeB.type === 1) {
                    //  We've got 2 circles, work out which one is the sensor
                    var ball = shapeA.body;
                    if (ball.velocity[1] > 0) {
                        //  Ball is going UP through the net, so it's a foul
                        ball.parent.sprite.foul = true;
                    }
                    else {
                        if (!ball.parent.sprite.foul) {
                            this.score++;
                            this.scoreText.text = "SCORE: " + this.score;
                            this.swish.play();
                        }
                    }
                }
                else {
                    if (!shapeA.sensor && shapeA.type === 4) {
                        var bounceIndex = this.game.rnd.integerInRange(0, 3);
                        this.bounceCollection[bounceIndex].play();
                    }
                    else {
                        this.brick.play();
                    }
                }
            };
            Main.prototype.shootSwipe = function (sprite, deltaX, deltaY, distX, distY) {
                if (deltaX === 0 && deltaY === -1 && this.canShoot) {
                    sprite.animations.play('shoot');
                    this.shotsLeft--;
                    this.shotsLeftText.text = "SHOTS: " + this.shotsLeft;
                    this.distX = distX;
                    this.distY = distY;
                }
            };
            Main.prototype.update = function () {
                this.basketBalls.forEachAlive(this.checkBasketBallStopped, this);
            };
            Main.prototype.checkBasketBallStopped = function (basketBall) {
                if (Math.abs(basketBall.body.velocity.y) < 1 && basketBall.position.y > 190) {
                    if (basketBall.animations.currentAnim.isPlaying) {
                        basketBall.animations.stop('rotate_ball');
                    }
                    else {
                        basketBall.kill();
                    }
                }
            };
            Main.prototype.checkLastShotBall = function (sprite) {
                sprite.body.onEndContact.add(function (body, bodyB, shapeA, shapeB, equation) {
                    if (!shapeB.sensor && shapeB.type === 4) {
                        if (this.shotsLeft === 0) {
                            this.gameOver();
                        }
                        sprite.destroy();
                        this.game.world.bringToTop(this.blackPixel);
                        var fadeIn = this.game.add.tween(this.blackPixel).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                        this.game.time.events.add(Phaser.Timer.SECOND, function () {
                            switch (this.shotsTaken) {
                                case 5:
                                    this.mainBg.frame = 1;
                                    break;
                                case 10:
                                    this.mainBg.frame = 2;
                                    break;
                                case 15:
                                    this.mainBg.scale.set(-1, 1);
                                    this.mainBg.frame = 1;
                                    break;
                                case 20:
                                    this.mainBg.frame = 0;
                                    break;
                            }
                            this.putBallsInRack();
                            var fadeOut = this.game.add.tween(this.blackPixel).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                            fadeOut.onComplete.addOnce(function () {
                                this.game.world.sendToBack(this.blackPixel);
                                if (!this.canShoot) {
                                    this.canShoot = true;
                                }
                            }, this);
                        }, this);
                    }
                }, this);
            };
            Main.prototype.putBallsInRack = function () {
                var i = 1;
                var ballInRack;
                do {
                    i += 1;
                    var ballX = (i * 5) + 76;
                    var ballY = (i * 2) + 198;
                    ballInRack = this.ballsInRack.getFirstDead();
                    if (ballInRack) {
                        ballInRack.reset(ballX, ballY);
                    }
                    else {
                        ballInRack = new PemulwuyBball.Prefab.Ballinrack(this.game, ballX, ballY);
                        this.ballsInRack.addChild(ballInRack);
                    }
                } while (i < 5);
            };
            Main.prototype.preRender = function () {
            };
            Main.prototype.gameOver = function () {
                this.whistle.play();
                this.game.state.start('menu', true, false, { score: this.score });
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = PemulwuyBball.State || (PemulwuyBball.State = {}));
})(PemulwuyBball || (PemulwuyBball = {}));
/// <reference path="../vendor/phaser-official/typescript/phaser.comments.d.ts"/>
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
//# sourceMappingURL=main.js.map