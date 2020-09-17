const dot_Size = 20;
var dot = function(game, row, col) {
    this.game = game;
    this.row = row;
    this.col = col;
    this.imageHeadSnake = "images/3zK.gif";

    var self = this.game;
    this.init = function() {};

    /**
     * draw dot
     * @param int       this.col
     * @param int       this.row
     *
     */

    this.draw = function() {
        self.context.fillStyle = "#ff0000";
        self.context.fillRect(
            this.col * dot_Size,
            this.row * dot_Size,
            dot_Size,
            dot_Size
        );
    };

    this.HeadDot = function() {
        var myImage = new Image();
        myImage.src = this.imageHeadSnake;
        this.game.context.drawImage(
            myImage,
            this.col * dot_Size,
            this.row * dot_Size,
            dot_Size,
            dot_Size
        );
    };

    /**
     * create three dot in array dots
     *
     */
};