import { Ball } from "./Ball";
import { Coord, GameRules } from "./interfaces";
import { rng, objEqual } from "./other";
import { findPath } from "./findPath"
import { rotateBoard } from './decorators';

/** Class of a game */
class Game {
    /** Array of every ball present in the game */
    private balls: Ball[];
    /** Array of colors of the next 3 balls to be added */
    private next: number[];
    /** Determines if any action is possible */
    private stop: boolean;
    /** Determines how many balls in a line is needed to kill them */
    private killAmount: number;
    /** Points of the current game */
    private points: number = 0;
    /** Number of possible colors, up to 7 (used for debugging) */
    private colorsAmount: number;
    /** Determines by how many degrees to rotate the board */
    private rotate: number = -45;
    /**
     * Constructs new Game object
     * @param rules Rules of the game to be created
     */
    constructor(rules: GameRules) {
        this.balls = [];
        this.killAmount = rules.killAmount;
        this.colorsAmount = rules.colorsAmount;
        this.next = [rng(this.colorsAmount), rng(this.colorsAmount), rng(this.colorsAmount)];
        this.stop = false;
    }
    /**
     * Starts the game
     */
    public startGame() {
        this.buildBoard();
        this.add3();
    }
    /**
     * Builds a new board from scratch
     */
    private buildBoard() {
        let board = document.getElementById("board") as HTMLDivElement;
        board.innerHTML = "";
        for (let i = 0; i < 81; i++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.addEventListener("mouseover", () => this.showPath({ x: i % 9, y: Math.floor(i / 9) }));
            cell.addEventListener("click", () => this.moveTo({ x: i % 9, y: Math.floor(i / 9) }));
            board.appendChild(cell);
        }
    }
    /**
     * Adds 3 balls to the game
     */
    @rotateBoard
    private add3() {
        for (let i = 0; i < 3; i++) {
            this.addBall();
        }
        this.drawBalls();
        for (const [index, color] of this.next.entries()) {
            (document.getElementsByClassName("next")[index] as HTMLDivElement)
                .style.backgroundColor = Ball.colors[color];
        }
        if (this.balls.length === 81) {
            this.stop = true;
            setTimeout(() => {
                alert(`You die. Points earned: ${this.points}`);
                location.reload();
            }, 500);
        }
    }
    /**
     * Adds a ball to the game
     */
    private addBall() {
        if (this.balls.length === 81)
            return;
        let coords = {
            x: rng(9),
            y: rng(9)
        };
        while (this.balls.filter(ball => objEqual(ball.getCoords(), coords)).length > 0) {
            coords.x = rng(9);
            coords.y = rng(9);
        }
        let newBall = new Ball(coords, this.next.shift());
        this.balls.push(newBall);
        this.points += this.checkForKill(newBall);
        this.next.push(rng(this.colorsAmount));
    }
    /**
     * Draws balls on the board
     */
    private drawBalls() {
        this.buildBoard();
        for (const ball of this.balls) {
            let coords = ball.getCoords();
            let cell = document.getElementsByClassName("cell")[coords.y * 9 + coords.x];
            let ballDiv = document.createElement("div");
            ballDiv.className = "ball";
            ballDiv.style.backgroundColor = Ball.colors[ball.getColor()];
            if (ball.isSelected())
                ballDiv.className += " selected";
            cell.appendChild(ballDiv);
            ballDiv.parentNode.addEventListener("click", () => {
                this.selectBall(ball);
            });
        }
        (document.getElementById("points") as HTMLSpanElement).innerText = this.points.toString();
    }
    /**
     * Selects a ball if it is movable
     * @param selected The ball to be selected
     */
    private selectBall(selected: Ball) {
        if (this.stop)
            return;
        let coords = selected.getCoords();
        let neighbors = [
            { x: coords.x, y: coords.y - 1 },
            { x: coords.x + 1, y: coords.y },
            { x: coords.x, y: coords.y + 1 },
            { x: coords.x - 1, y: coords.y }
        ];
        for (const neighbor of neighbors) {
            if (neighbor.x > 8 || neighbor.x < 0 || neighbor.y > 8 || neighbor.y < 0)
                continue;
            if (this.balls.filter(ball => objEqual(ball.getCoords(), neighbor)).length > 0)
                continue;
            for (const ball of this.balls) {
                if (ball === selected)
                    ball.changeSelected();
                else
                    ball.changeSelected(false);
            }
            this.drawBalls();
            break;
        }
    }
    /**
     * Draws the path on the board when hovering over a tile
     * @param to Destination of the path from selected ball
     */
    private showPath(to: Coord) {
        if (this.stop)
            return;
        let cells = document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLDivElement>;
        for (const cell of cells) {
            cell.className = "cell";
        }
        if (this.balls.filter(ball => ball.isSelected() === true).length === 0 ||
            this.balls.filter(ball => objEqual(ball.getCoords(), to)).length > 0)
            return;
        let from = this.balls.filter(ball => ball.isSelected() === true)[0].getCoords();
        let path = findPath(from, to, this.balls);
        if (path.length !== 0)
            path.push(from);
        for (const tile of path) {
            let tileDiv = cells[tile.y * 9 + tile.x];
            tileDiv.className += " path";
        }
    }
    /**
     * Calls the function to move the ball and does everything needed to be done to continue the game
     * @param to Coordinate to move the selected ball to
     */
    private moveTo(to: Coord) {
        if (this.stop)
            return;
        let cells = Array.from(document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLDivElement>);
        let pathCells = cells.filter(cell => cell.className.indexOf("path") !== -1);
        let ball = this.balls.filter(ball => ball.isSelected() === true)[0];
        if (pathCells.length === 0) {
            if (ball !== undefined && !objEqual(ball.getCoords(), to))
                ball.changeSelected();
            this.drawBalls();
            return;
        }
        let ballDiv = pathCells.filter(cell => cell.children.length > 0)[0].children[0];
        ballDiv.className = "ball";
        cells[to.y * 9 + to.x].appendChild(ballDiv);
        ball.moveTo(to);
        ball.changeSelected();
        let newPoints = this.checkForKill(ball);
        this.points += newPoints;
        this.stop = true;
        for (const cell of pathCells) {
            cell.style.backgroundColor = "#999";
        }
        setTimeout(() => {
            this.stop = false;
            if (!newPoints)
                this.add3();
            else
                this.drawBalls();
        }, 1000)
    }
    /**
     * Checks if game should kill balls, calls a function to kill them and returns points earned if that's the case
     * @param ball Ball which the function should check
     */
    private checkForKill(ball: Ball): number {
        let directions = [
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: -1 },
            { x: -1, y: 1 }
        ];
        let ballsConnected: Ball[][] = [];
        for (const direction of directions) {
            let ballsConnInDir = this.getNeighborBalls(ball, direction);
            ballsConnInDir = [...ballsConnInDir, ...this.getNeighborBalls(ball, { x: direction.x * -1, y: direction.y * -1 })]
            ballsConnected.push(ballsConnInDir);
        }
        let newPoints = 0;
        for (const ballsConnInDir of ballsConnected) {
            if (ballsConnInDir.length >= this.killAmount - 1) {
                newPoints += ballsConnInDir.length;
                this.killBalls(ballsConnInDir);
            }
        }
        if (newPoints) {
            newPoints++;
            this.killBalls([ball]);
        }
        return newPoints;
    }
    /**
     * Gets the array of balls needed to know if they're killable
     * @param ball Ball that is looked for correct neighbors
     * @param direction Direction in which it checks for neighbors
     * @returns Array of neighboring balls that match the color
     */
    private getNeighborBalls(ball: Ball, direction: Coord): Ball[] {
        let coords = ball.getCoords();
        let color = ball.getColor();
        let ballsConn: Ball[] = [];
        for (let neighbor = this.getBallIfCorrect({
            x: coords.x + direction.x,
            y: coords.y + direction.y
        }, color); neighbor !== undefined; neighbor = this.getBallIfCorrect({
            x: neighbor.getCoords().x + direction.x,
            y: neighbor.getCoords().y + direction.y
        }, color)) {
            ballsConn.push(neighbor);
        }
        return ballsConn;
    }
    /**
     * Gets a ball of given coords and color
     * @param coords Coords of the ball we're looking for
     * @param color Color of the ball we're looking for
     * @returns The ball we're looking for if it exists, undefined if it doesn't
     */
    private getBallIfCorrect(coords: Coord, color: number): Ball {
        return this.balls.filter(ball => objEqual(ball.getCoords(), coords) && ball.getColor() === color)[0];
    }
    /**
     * Kills balls given
     * @param balls Balls to kill
     */
    private killBalls(balls: Ball[]) {
        this.balls = this.balls.filter(ball => !balls.includes(ball));
    }
}
export { Game };