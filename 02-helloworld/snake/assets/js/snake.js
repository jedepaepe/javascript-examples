class Square {
    /**
     * 
     * @param {Element} parent 
     * @param {number} x 
     * @param {number} y 
     */
     constructor (parent, x, y) {
        this.element = document.createElement('div');
        this.element.classList.add('box');
        let style = this.element.style;
        style.left = x + 'px';
        style.top = y + 'px';
        style.border = '1px solid black';
        parent.append(this.element);
    }
}
const NONE = 0;
const FOOD = 1;
const SNAKE = 2;

class Box extends Square {
    /**
     * 
     * @param {Element} parent 
     * @param {number} x 
     * @param {number} y 
     */
    constructor (parent, x, y) {
        super(parent, x, y);
        this.state = NONE;
    }

    /**
     * set snake state
     * @returns true if it was a food
     */
    setSnake() {
        let isAEat = this.state === FOOD;
        this.state = SNAKE;
        this.element.classList.remove('food');
        this.element.classList.add('snake');
        return isAEat;
    }

    /**
     * set food state
     * @returns true if can be a food
     */
    setFood() {
        if (this.state === NONE) {
            this.state = FOOD;
            this.element.classList.add('food');
            return true;
        }
        return false;
    }

    setNone() {
        this.state = NONE;
        this.element.classList.remove('food');
        this.element.classList.remove('snake');
    }

    isSnake () { return this.state === SNAKE; }

    isFood () { return this.state === FOOD; }

    isNone () { return this.state === NONE; }
}

class Board {
    /**
     * 
     * @param {Element} parent 
     * @param {number} nrWidth 
     * @param {number} nrHeight 
     */
    constructor (parent, nrWidth, nrHeight) {
        this.boxes = [];
        this.parent = parent;
        this.nrWidth = nrWidth | 5;
        this.nrHeight = nrHeight | this.nrWidth;
        this.coordinateCalculator = new CoordinateCalculator(this.nrWidth, this.nrHeight);
        for (let i = 0; i < this.nrWidth; ++i) {
            this.boxes[i] = [];
            for (let j = 0; j < this.nrHeight; ++j) {
                this.boxes[i][j] = new Box(this.parent, i * 50, j * 50);
            }
        }
        this.snake = new Snake(this);
        this.setRandomFood()
    }

    _randomX() {
        return Math.floor(Math.random() * this.nrWidth);
    }

    setRandomFood () {
        let success = false;
        do {
            success = this.boxes[this._randomX()][this._randomY()].setFood();
        } while (! success);
    }

    _randomY() {
        return Math.floor(Math.random() * this.nrHeight);
    }
}

class SegmentCalculator {

    /**
     * 
     * @param {number} max 
     */
    constructor (max) {
        this.max = max;
    }

    modulo (a) {
        let result = a % this.max;
        if (result < 0) result += this.max;
        return result;
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @returns {number}
     */
    add (a, b) {
        return this.modulo(a + b);
    }
}

class CoordinateCalculator {
    /**
     * 
     * @param {number} maxX 
     * @param {number} maxY 
     */
    constructor (maxX, maxY) {
        this.calcX = new SegmentCalculator(maxX);
        this.calcY = new SegmentCalculator(maxY);
    }

    /**
     * 
     * @param {Coordinate} a 
     * @param {Coordinate} b 
     * @returns {Coordinate}
     */
    add (a, b) {
        return new Coordinate(this.calcX.add(a.x, b.x), this.calcY.add(a.y, b.y));
    }
}

class Coordinate {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor (x, y) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }

    /**
     * 
     * @param {Coordinate} other 
     * @param {number} maxX 
     * @param {number} maxY 
     * @returns Coordinate
     */
    add (other, maxX, maxY) {
        return new Coordinate(
            this._addInLimit(this.x, other.x, maxX),
            this.y = this._addInLimit(this.y, other.y, maxY)
        );
    }

    _addInLimit(a, b, max) {
        let result = (a + b) % max;
        if (result < 0) result + max;
    }
}

// const UP = 1;
// const RIGHT = 2;
// const DOWN = 3;
// const LEFT = 4;
class Snake {
    /**
     * 
     * @param {Board} board 
     */
    constructor (board) {
        this.direction = undefined;
        this.board = board;
        let head = new Coordinate(this.board._randomX(), this.board._randomY());
        this.board.boxes[head.x][head.y].setSnake();
        this.boxes = [head];
        this.handler = setInterval(() => this.move(), 500);
    }

    /**
     * 
     * @param {Coordinate} delta 
     */
    move () {
        console.log(this.direction);
        if (! this.direction) return;
        let targetCoordinate = this.board.coordinateCalculator.add(this.boxes[0], this.direction);
        let targetBox = this.board.boxes[targetCoordinate.x][targetCoordinate.y];
        if (targetBox.isSnake()) console.log('lost');
        else if (targetBox.isFood()) this._eat(targetCoordinate, targetBox);
        else this._move(targetCoordinate, targetBox);
    }

    _eat (coordinate, targetBox) {
        console.log('eat');
        targetBox.setSnake();
        this.boxes = [coordinate, ...this.boxes];
        this.board.setRandomFood();
    }

    _move (coordinate, targetBox) {
        console.log('move');
        targetBox.setSnake();
        let queue = this.boxes[this.boxes.length - 1];
        this.board.boxes[queue.x][queue.y].setNone();
        this.boxes = [coordinate, ...this.boxes.slice(0, -1)];
    }
}

/**
 * 
 * @param {KeyboardEvent} event 
 */
function keyHandler (event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 37:
            // LEFT
            board.snake.direction = new Coordinate(-1, 0);
            break;
        case 38:
            // UP
            board.snake.direction = new Coordinate(0, -1);
            break;
        case 39:
            // RIGHT
            board.snake.direction = new Coordinate(1, 0);
            break;
        case 40:
            // DOWN
            board.snake.direction = new Coordinate(0, 1);
            break;
        default:
            board.snake.direction = null;
    }
}


let container = document.getElementById('snake-app');
let board = new Board(container);
document.onkeydown = keyHandler;