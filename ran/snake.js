var snake = function(game) {
    this.game = game;
    this.dots = [];
    this.direction = "right";

    this.init = function() {
        this.createDots();
    };

    /**
     * create three dot in array dots
     *
     */
    this.createDots = function() {
        for (let i = 0; i < 3; i++) {
            var newDot = new dot(this.game, 10, i + 10);
            this.dots.push(newDot);
        }
    };

    /**
     * snake go
     *
     */

    this.go = function() {
        switch (this.direction) {
            case "up":
                this.moveUp();
                break;
            case "down":
                this.moveDown();
                break;
            case "left":
                this.moveLeft();
                break;
            case "right":
                this.moveRight();
                break;
        }
    };

    /** can go right  */

    this.canRight = function() {
        var headDot = this.dots[this.dots.length - 1];
        return headDot.col < cols;
    };

    this.moveRight = function() {
        if (this.canRight()) {
            var headDot = this.dots[this.dots.length - 1];
            var newDot = new dot(this.game, headDot.row, headDot.col + 1);
            this.dots.push(newDot);
            this.dots.shift();
            this.direction = "right";
        } else {
            this.game.gameOver();
            alert("Game Over ");
        }
    };

    /** can go up  */

    this.canUp = function() {
        var headDot = this.dots[this.dots.length - 1];
        return headDot.row >= 0;
    };

    this.moveUp = function() {
        if (this.canUp()) {
            var headDot = this.dots[this.dots.length - 1];
            var newDot = new dot(this.game, headDot.row - 1, headDot.col);
            this.dots.push(newDot);
            this.dots.shift();
            this.direction = "up";
        } else {
            this.game.gameOver();
            alert("Game Over ");
        }
    };

    /** can go down  */

    this.canDown = function() {
        var headDot = this.dots[this.dots.length - 1];
        return headDot.row < rows;
    };

    this.moveDown = function() {
        if (this.canDown()) {
            var headDot = this.dots[this.dots.length - 1];
            var newDot = new dot(this.game, headDot.row + 1, headDot.col);
            this.dots.push(newDot);
            this.dots.shift();
            this.direction = "down";
        } else {
            this.game.gameOver();
            alert("Game Over ");
        }
    };

    /** can go left  */

    this.canLeft = function() {
        var headDot = this.dots[this.dots.length - 1];

        return headDot.col >= 0;
    };

    this.moveLeft = function() {
        if (this.canLeft()) {
            var headDot = this.dots[this.dots.length - 1];
            var newDot = new dot(this.game, headDot.row, headDot.col - 1);
            this.dots.push(newDot);
            this.dots.shift();
            this.direction = "left";
        } else {
            this.game.gameOver();
            alert("Game Over ");
        }
    };

    this.draw = function() {
        this.dots.forEach(function(dot) {
            dot.draw();
        });
    };
};