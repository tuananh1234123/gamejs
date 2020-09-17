class brick {
    constructor(game) {
        this.game = game;
        this.dots = [];
        this.data = [];
        this.row = 0;
        this.col = 0;

        this.createData();
        this.createDot();
    }
    createData() {
        let baseData = [
            [
                [x, x, x, x]
            ],
            [
                [x, x, x],
                [x]
            ],
            [
                [x, x],
                [x, x]
            ],
            [
                [x, x, x],
                [_, x, _]
            ],
            [
                [x, x, _],
                [_, x, x]
            ],
            [
                [_, x, x],
                [x, x, _]
            ],
            [
                [x, _],
                [x, _],
                [x, x]
            ],
            [
                [_, x],
                [_, x],
                [x, x]
            ]
        ];
        let random = Math.floor(Math.random() * 8);
        this.data = baseData[random];
    }

    canLeft() {
        let brickCanLeft = true;
        this.dots.forEach(dot => {
            if (!dot.canLeft()) {
                brickCanLeft = false;
            }
        });
        return brickCanLeft;
    }

    moveLeft() {
        if (this.canLeft()) {
            this.col--;
            this.dots.forEach(dot => {
                dot.moveLeft();
            });
        }
    }

    canRight() {
        let brickCanRight = true;
        this.dots.forEach(dot => {
            if (!dot.canRight()) {
                brickCanRight = false;
            }
        });
        return brickCanRight;
    }

    moveRight() {
        if (this.canRight()) {
            this.col++;
            this.dots.forEach(dot => {
                dot.moveRight();
            });
        } else {
            return;
        }
    }

    canFall() {
        let brickCanFall = true;
        this.dots.forEach(dot => {
            if (!dot.canFall()) {
                brickCanFall = false;
            }
        });
        return brickCanFall;
    }

    fall() {
        if (this.canFall()) {
            this.row++;
            this.dots.forEach(dot => {
                dot.fall();
            });
        } else {
            this.game.createBrick();
            this.appendYard();
        }
    }

    down() {
        if (this.canFall()) {
            this.row++;
            this.dots.forEach(dot => {
                dot.fall();
            });
        } else {
            this.game.createBrick();
            this.appendYard();
        }
    }

    appendYard() {
        this.dots.forEach(dot => {
            this.game.yardGame.yard[dot.row][dot.col] = x;
        });
    }

    createDot() {
        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data[0].length; col++) {
                if (this.data[row][col] == x) {
                    let newDot = new dot(this.game, row, col);
                    this.dots.push(newDot);
                }
            }
        }
    }
    draw() {
        this.dots.forEach(dot => dot.draw());
    }
}