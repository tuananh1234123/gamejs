const _ = null;
const x = 'x';
const num_rows = 20;
const num_cols = 20;

class dot {
    constructor(game, row, col) {

        this.game = game;
        this.size = 20;
        this.row = row;
        this.col = col;

    }

    hitLeft() {
        return this.col == 0;

    }

    canLeft() {

        if (this.hitLeft()) {
            return false;
        }
        if (!this.game.yardGame.isEmptyCell(this.row, this.col - 1)) {
            return false;
        }
        return true;
    }

    moveLeft() {
        if (this.canLeft) {
            this.col--;
        }
    }

    hitRight() {

        return this.col == num_cols - 1;

    }

    canRight() {
        console.log(' dot.canRight1 : ' + this.col)
        console.log(this.hitRight());
        if (this.hitRight()) {
            return false;
        }
        if (!this.game.yardGame.isEmptyCell(this.row, this.col + 1)) {
            return false;
        }
        return true;
    }

    moveRight() {
        if (this.canRight) {
            this.col++;
        }
    }

    hitBottom() {
        return this.row == num_rows - 1;
    }

    canFall() {
        console.log("dang roi");

        if (this.hitBottom()) {

            return false;
        }

        if (!this.game.yardGame.isEmptyCell(this.row + 1, this.col)) {
            return false;
        }

        return true;
    }

    fall() {
        if (this.canFall()) {
            this.row++;
        } else {
            this.game.draw();
        }
    }

    update() {

    }

    draw() {
        let x = this.col * this.size;
        let y = this.row * this.size;
        this.game.context.fillStyle = '#FF0000';
        this.game.context.fillRect(x, y, this.size - 1, this.size - 1);
    }
}