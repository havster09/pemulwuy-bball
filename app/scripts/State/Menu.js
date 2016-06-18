var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=Menu.js.map