import { Ball, Coord } from './Ball';
import { findPath } from './findPath';
import { objEqual, rng } from './other';

buildBoard();
let balls: Ball[] = [];
let next: number[] = [];
for (let i = 0; i < 3; i++) {
    next.push(rng(7));
}
add3();
let stop = false;

function buildBoard() {
    let board = document.getElementById("board") as HTMLDivElement;
    board.innerHTML = "";
    for (let i = 0; i < 81; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("mouseover", () => showPath({ x: i % 9, y: Math.floor(i / 9) }));
        cell.addEventListener("click", () => moveTo({ x: i % 9, y: Math.floor(i / 9) }));
        board.appendChild(cell);
    }
}
function add3() {
    for (let i = 0; i < 3; i++) {
        addBall(next.shift());
        next.push(rng(7));
    }
    drawBalls();
    for (const [index, color] of next.entries()) {
        (document.getElementsByClassName("next")[index] as HTMLDivElement)
            .style.backgroundColor = Ball.colors[color];
    }
}
function addBall(color: number) {
    if (balls.length === 81)
        return;
    let coords = {
        x: rng(9),
        y: rng(9)
    };
    while (balls.filter(ball => objEqual(ball.getCoords(), coords)).length > 0) {
        coords.x = rng(9);
        coords.y = rng(9);
    }
    balls.push(new Ball(coords, color));
}
function drawBalls() {
    buildBoard();
    for (const ball of balls) {
        let coords = ball.getCoords();
        let cell = document.getElementsByClassName("cell")[coords.y * 9 + coords.x];
        let ballDiv = document.createElement("div");
        ballDiv.className = "ball";
        ballDiv.style.backgroundColor = Ball.colors[ball.getColor()];
        if (ball.isSelected())
            ballDiv.className += " selected";
        ballDiv.addEventListener("click", () => {
            selectBall(ball);
        });
        cell.appendChild(ballDiv);
    }
}
function selectBall(selected: Ball) {
    if (stop)
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
        if (balls.filter(ball => objEqual(ball.getCoords(), neighbor)).length > 0)
            continue;
        for (const ball of balls) {
            if (ball === selected)
                ball.changeSelected();
            else
                ball.changeSelected(false);
        }
        drawBalls();
        break;
    }
}
function showPath(to: Coord) {
    if (stop)
        return;
    let cells = document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLDivElement>;
    for (const cell of cells) {
        cell.className = "cell";
    }
    if (balls.filter(ball => ball.isSelected() === true).length === 0 ||
        balls.filter(ball => objEqual(ball.getCoords(), to)).length > 0)
        return;
    let from = balls.filter(ball => ball.isSelected() === true)[0].getCoords();
    let path = findPath(from, to, balls);
    if (path.length !== 0)
        path.push(from);
    for (const tile of path) {
        let tileDiv = cells[tile.y * 9 + tile.x];
        tileDiv.className += " path";
    }
}
function moveTo(to: Coord) {
    if (stop)
        return;
    let cells = Array.from(document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLDivElement>);
    let pathCells = cells.filter(cell => cell.className.indexOf("path") !== -1);
    let ball = balls.filter(ball => ball.isSelected() === true)[0];
    if (pathCells.length === 0) {
        if (ball !== undefined && !objEqual(ball.getCoords(), to))
            ball.changeSelected();
        drawBalls();
        return;
    }
    let ballDiv = pathCells.filter(cell => cell.children.length > 0)[0].children[0];
    ballDiv.className = "ball";
    cells[to.y * 9 + to.x].appendChild(ballDiv);
    ball.moveTo(to);
    ball.changeSelected();
    stop = true;
    for (const cell of pathCells) {
        cell.style.backgroundColor = "#999";
    }
    setTimeout(() => {
        stop = false;
        add3();
    }, 1000)
}