const cols = 40;
const rows = 30;
const g_Width = 800;
const h_Height = 600;

var game = function() {
    this.speed = 400;
    this.canvas = null;
    this.context = null;
    this.score = 0;
    this.map = 1;
    this.checkEatFood = false;
    this.history = [];
    var self = this;

    this.init = function() {
        /**
         * create canvas
         */

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = g_Width;
        this.canvas.height = h_Height;
        gameContext.appendChild(this.canvas);

        /** create snake */

        this.snake = new snake(this);
        this.snake.init();

        /**create food */

        this.foods = new foods(this);
        this.foods.init();

        /**
         * stop scroll on window
         */

        this.loop();
        this.listenEvent();
    };

    /**
     * each timePer loop one more
     */

    this.loop = function() {
        self.clearScreen();
        self.foods.draw();
        self.snake.draw();
        self.eatFood();
        self.snake.go();
        setTimeout(self.loop, self.speed);
    };

    /** clear screen each when snake go */

    this.clearScreen = function() {
        this.context.fillStyle = "#000000";

        this.context.fillRect(0, 0, g_Width, h_Height);
    };

    /** game over  */

    this.gameOver = function() {
        // this.historyPlay();
        this.foods.foods.splice(0);
        this.snake = new snake(this);
        this.snake.init();
        this.foods.init();
        this.speed = 400;
        this.score = 0;
        this.map = 1;
        map.innerHTML = this.map;
        score.innerHTML = this.score;
    };

    /**
     * next round
     */

    this.nextRound = function() {
        this.clearScreen();
        this.snake = new snake(this);
        this.snake.init();
        this.foods.init();
        this.speed = 400;
        this.map++;
        rewardPoint.innerHTML = "(" + this.score + " + 10)";
        this.score = this.score + 10;
        score.innerHTML = this.score;
        map.innerHTML = this.map;
        notify.innerHTML = "Congratulations, you're done ";
        setTimeout("notify.innerHTML=''; rewardPoint.innerHTML = '';", 4000);
    };

    /**
     * handle when snake eat food
     */

    this.eatFood = function() {
        var headSnake = self.snake.dots[self.snake.dots.length - 1];

        var f = self.foods.foods;
        if (f.length == 0) {
            self.foods.init();
        }

        var index = 0;
        f.forEach(function(food) {
            if (headSnake.row == food.row && headSnake.col == food.col) {
                /** delete food when snake eat where index */
                self.foods.foods.splice(index, 1);
                self.createAudio();
                self.setSpeed();
                self.score++;
                score.innerHTML = self.score;

                var newDot = new dot();
                self.snake.dots.unshift(newDot);
            }
            index++;
        });
        console.log(index);
        this.setMap(self.score);
    };

    /**
     * set speed snake
     */
    this.setSpeed = function() {
        if (self.speed > 50) {
            self.speed = self.speed - 30;
        }
    };

    /**
     * log history player
     */

    this.historyPlay = function() {
        this.history.push(self.map);
        this.history.push(self.score);
        this.history.push(this.getDate());
        localStorage.setItem(name, this.history);
    };

    this.getDate = function() {
        var date = new Date();
        return date.toLocaleDateString();
    };

    /** create audio sing snake eating food  */

    this.createAudio = function() {
        var audio = document.createElement("AUDIO");
        audio.setAttribute("src", "audio/eat.mp3");
        audio.setAttribute("autoplay", "autoplay");
        document.body.appendChild(audio);
    };

    /** listen event from client  */

    this.listenEvent = function() {
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 40:
                    /**
                     * The snake on the left can't turn right , up and down too;
                     */
                    if (self.snake.direction == "up") {
                        break;
                    }
                    self.snake.direction = "down";
                    break;
                case 38:
                    if (self.snake.direction == "down") {
                        break;
                    }
                    self.snake.direction = "up";
                    break;
                case 37:
                    if (self.snake.direction == "right") {
                        break;
                    }
                    self.snake.direction = "left";
                    break;
                case 39:
                    if (self.snake.direction == "left") {
                        break;
                    }
                    self.snake.direction = "right";
                    break;
            }
        });
    };

    /**
     * set map for player by score
     */

    this.setMap = function(score) {
        switch (score) {
            case 5:
                this.nextRound();
                break;
            case 30:
                this.nextRound();
                break;
            case 60:
                this.nextRound();
                break;
            case 100:
                this.nextRound();
                break;
        }
    };
};

/**
 * start game
 */

startButton.onclick = function() {
    content.style.display = "none";
    Mscore.style.display = "block";
    gameContext.style.display = "block";
    var name = document.getElementById("name").value;
    if (name == "") {
        titleName.style.display = "none";
    }
    player.innerHTML = name;
    var start = new game();
    start.init();
};