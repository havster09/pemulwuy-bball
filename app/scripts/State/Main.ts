module PemulwuyBball.State {
    import Sprite = Phaser.Sprite;
    import Ballinrack = PemulwuyBball.Prefab.Ballinrack;

    export class Main extends Phaser.State {
        startX:number;
        startY:number;
        endX:number;
        endY:number;
        distX:number;
        distY:number;

        timeLeft:number;
        timeLeftText:Phaser.BitmapText;
        score:number;
        scoreText:Phaser.BitmapText;
        shotsLeft:number;
        shotsTaken:number;
        rackBallCount:Array<number>;
        shotsLeftText:Phaser.BitmapText;

        mainBg:Sprite;
        blackPixel:Sprite;
        changeBg:boolean;
        ring:Sprite;
        ballRack:Sprite;
        ballsInRack:Phaser.Group;

        basketBalls:Phaser.Group;
        shooter:Sprite;
        canShoot:boolean;

        pauseKey:Phaser.Keyboard;
        debugKey:Phaser.Keyboard;

        fadeIn:Phaser.Tween;
        fadeOut:Phaser.Tween;

        showDebug:boolean = false;

        bounce1:Phaser.Sound;
        bounce2:Phaser.Sound;
        bounce3:Phaser.Sound;
        bounce4:Phaser.Sound;
        brick:Phaser.Sound;
        whistle:Phaser.Sound;
        swish:Phaser.Sound;
        tick:Phaser.Sound;

        bounceCollection:Array<Phaser.Sound>;

        init() {
            this.physics.p2.gravity.y = 300;
            this.physics.p2.restitution = 0.8;
            this.timeLeft = 60;

            this.score = 0;
            this.shotsLeft = 25;
            this.shotsTaken = 0;
            this.canShoot = true;
            this.changeBg = false;
            this.rackBallCount = [5,10,15,20,25];
        }


        create() {
            this.stage.backgroundColor = '#000';

            this.game.time.events.repeat(Phaser.Timer.SECOND, 60, this.minusTimeLeft, this);

            this.blackPixel = this.add.sprite(0, 0, 'pemulwuy_bball', 'black_pixel');
            this.blackPixel.scale.set(320,224);
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

            this.shooter.events.onAnimationStart.add(function() {
                switch (this.shooter.animations.currentAnim.name) {
                    case 'shoot':
                        this.shotsTaken++;
                        this.canShoot = false;
                        break;
                    case 'get_ball':
                        // kill first ball in rack
                        this.ballsInRack.getFirstAlive().kill();
                        this.ballsInRack.forEachAlive(this.moveDownRack,this);
                        break;
                }
            },this);

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
                            basketBall = new PemulwuyBball.Prefab.Basketball(this.game,168,46);
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
                        if(this.rackBallCount.indexOf(this.shotsTaken) > -1) {
                            this.shooter.animations.stop('shoot');
                            this.shooter.frameName = "shoot/shoot_0000";
                            this.checkLastShotBall(basketBall);
                        }
                        else {
                            if(!this.canShoot) {
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
            this.timeLeftText = this.add.bitmapText(230, 0, 'fat-and-tiny', 'TIME:'+this.timeLeft, 30);

            this.scoreText = this.add.bitmapText(4, 0, 'fat-and-tiny', 'SCORE: 0', 20);
            this.shotsLeftText = this.add.bitmapText(4, 13, 'fat-and-tiny', 'SHOTS: ' + this.shotsLeft, 20);
            this.shotsLeftText.smoothed = this.scoreText.smoothed = this.timeLeftText.smoothed = false;
            this.shotsLeftText.tint = this.scoreText.tint = this.timeLeftText.tint = 0x6fff00;

            this.ring = this.add.sprite(160, 115,'pemulwuy_bball' ,'basket');
            this.ring.anchor.set(0.5, 0);
            this.physics.p2.enable(this.ring, this.showDebug);
            this.ring.body.static = true;
            this.ring.body.clearShapes();
            this.ring.body.loadPolygon('ring', 'ring');
            this.ring.body.data.gravityScale = 0;

            const net = this.ring.body.addCircle(6, 0, 15);
            net.sensor = true;

            const floor = this.ring.body.addPlane(0, 90);

            this.ring.body.onBeginContact.add(this.checkBasketBall, this);
            this.game.world.bringToTop(this.shooter);

            // Sounds
            this.bounce1 = this.game.add.audio('bounce1');
            this.bounce2 = this.game.add.audio('bounce2');
            this.bounce3 = this.game.add.audio('bounce3');
            this.bounce4 = this.game.add.audio('bounce4');

            this.bounceCollection = [this.bounce1,this.bounce2,this.bounce3,this.bounce4];

            this.whistle = this.game.add.audio('whistle');
            this.swish = this.game.add.audio('swish');
            this.brick = this.game.add.audio('brick');
            this.tick = this.game.add.audio('tick');

        }

        minusTimeLeft() {
            this.timeLeft--;

            if(this.timeLeft < 1) {
                this.gameOver();
            }

            this.timeLeftText.text = 'TIME:'+this.timeLeft;
            this.tick.play();
        }

        moveDownRack(basketball) {
            basketball.animations.play('rotate_ball_in_rack');
        }

        beginSwipe() {
            this.startX = this.game.input.worldX;
            this.startY = this.game.input.worldY;
            this.game.input.onDown.remove(this.beginSwipe,this);
            this.game.input.onUp.add(this.endSwipe,this);
        }

        endSwipe() {
            this.endX = this.game.input.worldX;
            this.endY = this.game.input.worldY;
            let distX = this.startX-this.endX;
            let distY = this.startY-this.endY;

            if(Math.abs(distX)>Math.abs(distY)*2 && Math.abs(distX)>10) {
                // moving left
                if(distX>0) {
                    this.shootSwipe(this.shooter,-1,0,distX,distY);
                }
                // moving right
                else {
                    this.shootSwipe(this.shooter,1,0,distX,distY);
                }
            }

            if(Math.abs(distY)>Math.abs(distX)*2 && Math.abs(distY)>10) {
                // moving up
                if(distY>0) {
                    this.shootSwipe(this.shooter,0,-1,distX,distY);
                }
                // moving down
                else {
                    this.shootSwipe(this.shooter,0,1,distX,distY);
                }
            }
            this.game.input.onDown.add(this.beginSwipe,this);
            this.game.input.onUp.remove(this.endSwipe,this);
        }

        addBallVelocity(basketBall:Sprite) {
            // use [0.5,0.1],0,0 for made basket
            let aimVelocity = this.distX/15 + 0.5;
            if(aimVelocity > 1.1) {
                aimVelocity = 1.1;
            }
            else if(aimVelocity < -0.4) {
                aimVelocity = -0.4;
            }
            basketBall.body.applyImpulseLocal([aimVelocity, this.distY/2000], 0, 1);
        }

        checkBasketBall(body, bodyB, shapeA, shapeB, equation) {
            if (shapeA.type === 1 && shapeB.type === 1) {
                //  We've got 2 circles, work out which one is the sensor
                let ball = shapeA.body;

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
                if(!shapeA.sensor && shapeA.type === 4) {
                    let bounceIndex = this.game.rnd.integerInRange(0,3);
                    this.bounceCollection[bounceIndex].play();
                }
                else {
                    this.brick.play();
                }
            }
        }

        shootSwipe(sprite:Sprite,deltaX:number,deltaY:number,distX:number,distY:number) {
            if(deltaX === 0 && deltaY === -1 && this.canShoot) {
                sprite.animations.play('shoot');
                this.shotsLeft--;
                this.shotsLeftText.text = "SHOTS: " + this.shotsLeft;
                this.distX = distX;
                this.distY = distY;
                // console.log(deltaX,deltaY,distX,distY);
            }

        }

        update() {
            this.basketBalls.forEachAlive(this.checkBasketBallStopped, this);
        }

        checkBasketBallStopped(basketBall) {
            if (Math.abs(basketBall.body.velocity.y) < 1 && basketBall.position.y > 190) {
                if(basketBall.animations.currentAnim.isPlaying) {
                    basketBall.animations.stop('rotate_ball');
                }
                else {
                    basketBall.kill();
                }
            }

        }

        checkLastShotBall(sprite:Sprite) {
            sprite.body.onEndContact.add(function(body, bodyB, shapeA, shapeB, equation) {
                if(!shapeB.sensor && shapeB.type === 4) {
                    if (this.shotsLeft === 0) {
                        this.gameOver();
                    }

                    sprite.destroy();
                    this.game.world.bringToTop(this.blackPixel);
                    let fadeIn = this.game.add.tween(this.blackPixel).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

                    this.game.time.events.add(Phaser.Timer.SECOND, function(){
                        switch(this.shotsTaken) {
                            case 5:
                                this.mainBg.frame = 1;
                                break;
                            case 10:
                                this.mainBg.frame = 2;
                                break;
                            case 15:
                                this.mainBg.scale.set(-1,1);
                                this.mainBg.frame = 1;
                                break;
                            case 20:
                                this.mainBg.frame = 0;
                                break;
                        }

                        this.putBallsInRack();

                        let fadeOut = this.game.add.tween(this.blackPixel).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                        fadeOut.onComplete.addOnce(function() {
                            this.game.world.sendToBack(this.blackPixel);
                            if(!this.canShoot) {
                                this.canShoot = true;
                            }
                        },this);

                    }, this);

                }
            },this);
        }

        putBallsInRack() {
            let i = 1;
            let ballInRack;
            do {
                i += 1;
                let ballX = (i * 5) + 76;
                let ballY = (i * 2) + 198;
                ballInRack = this.ballsInRack.getFirstDead();
                if (ballInRack) {
                    ballInRack.reset(ballX,ballY);
                }
                else {
                    ballInRack = new PemulwuyBball.Prefab.Ballinrack(this.game,ballX,ballY);
                    this.ballsInRack.addChild(ballInRack);
                }
            } while (i < 5);
        }

        preRender() {

        }

        gameOver() {
            this.whistle.play();
            this.game.state.start('menu',true,false,{score:this.score});
        }
    }
}