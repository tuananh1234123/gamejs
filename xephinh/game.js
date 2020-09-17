const WIDTH = 600;
const HEIGHT = 400;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {

        /** create canvas  */
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        document.body.appendChild(this.canvas);

        /**
         *  create dot  
         */
        console.log("aa : " + Math.random() * 10)


        this.yardGame = new yardGame(this);

        this.brick = new brick(this);

        this.listenEvent();

        /** start game  */

        this.startGame();

        window.onscroll = function() {
            window.scrollTo(0, 0);
        };
        this.loop();
    }

    startGame() {
        setInterval(() => {
            this.brick.fall();
        }, 300);
    }

    loop() {
        this.clearScreen();
        this.draw();
        this.update();
        setTimeout(() => this.loop(), 30);
    }

    update() {

    }

    clearScreen() {

        this.context.fillStyle = "#000000";

        this.context.fillRect(0, 0, WIDTH, HEIGHT);
    };
    createBrick() {
        this.brick = new brick(this);
    }
    listenEvent() {
        document.addEventListener("keydown", (event) => {

            switch (event.code) {
                case 40:
                    break;
                case 'ArrowDown':
                    this.brick.down();
                    break;
                case 'ArrowLeft':
                    this.brick.moveLeft();
                    break;
                case 'ArrowRight':
                    this.brick.moveRight();
                    break;
            }
        });
    };

    draw() {
        this.clearScreen();
        this.brick.draw();
        this.yardGame.draw();

    }
}

var start = new game();