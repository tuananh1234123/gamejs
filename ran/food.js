var food = function(game) {
    this.game = game;
    this.col = 0;
    this.row = 0;
    this.self = this;
    this.image = "images/food.png";

    this.init = function() {
        this.createFood();
    };

    this.createFood = function() {
        var foodX = Math.round(Math.random() * (rows - 1));
        var foodY = Math.round(Math.random() * (cols - 1));

        if (!this.validate(foodX, foodY)) {
            self.createFood();
        }

        this.row = foodX;
        this.col = foodY;
    };

    this.validate = function(foodX, foodY) {
        this.game.snake.dots.forEach(function(dot) {
            if (dot.col == foodY && dot.row == foodX) {
                return false;
            }
        });
        return true;
    };
    this.draw = function() {
        var myImage = new Image();
        myImage.src = this.image;
        this.game.context.drawImage(
            myImage,
            this.col * dot_Size,
            this.row * dot_Size,
            dot_Size - 2,
            dot_Size - 2
        );
    };
};