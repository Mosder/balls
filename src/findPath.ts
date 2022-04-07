import { Ball } from './Ball';
import { Coord } from './interfaces';
import { objEqual } from './other';
/**
 * Finds the shortest path between two tiles
 * @param start Coordinates of the beggining
 * @param end Coordinates of the end
 * @param balls Array of every ball on the board - they are considered obstacles
 * @returns If path exists: Array of coords of every step needed to get to the end. If not: Empty array
 */
function findPath(start: Coord, end: Coord, balls: Ball[]): Coord[] {
    let obstacles: Coord[] = [];
    for (let ball of balls) {
        let coords = ball.getCoords();
        obstacles.push(coords);
    }
    let [arrBoard, arrPath] = getStartArrays();

    let i = 0;
    while (arrPath[end.y][end.x] === "") {
        let parentVal = i ? i.toString() : 'S';
        let parents: Coord[] = [];
        for (let y in arrBoard) {
            for (let x in arrBoard[y]) {
                if (arrBoard[y][x] === parentVal)
                    parents.push({ x: parseInt(x), y: parseInt(y) })
            }
        }
        if (parents.length === 0)
            break;
        for (let parent of parents) {
            let neighbors = [
                { x: parent.x, y: parent.y - 1 },
                { x: parent.x + 1, y: parent.y },
                { x: parent.x, y: parent.y + 1 },
                { x: parent.x - 1, y: parent.y }
            ];
            for (let neighbor of neighbors) {
                if (arrBoard[neighbor.y] !== undefined) {
                    if (arrBoard[neighbor.y][neighbor.x] === '0' || arrBoard[neighbor.y][neighbor.x] === 'E') {
                        arrBoard[neighbor.y][neighbor.x] = (i + 1).toString();
                        arrPath[neighbor.y][neighbor.x] =
                            `${arrPath[parent.y][parent.x]}${neighbor.y}${neighbor.x},`;
                    }
                }
            }
        }
        i++;
    }
    return arrPath[end.y][end.x].split(',').slice(0, -1).map(coord => { return { x: parseInt(coord.split('')[1]), y: parseInt(coord.split('')[0]) } });

    function getStartValue(coords: Coord): string {
        let val: string;
        if (objEqual(coords, start))
            val = "S";
        else if (objEqual(coords, end))
            val = "E";
        else if (obstacles.filter(val => objEqual(coords, val)).length !== 0)
            val = "X";
        else
            val = "0";
        return val;
    }
    function getStartArrays(): string[][][] {
        let arrBoard: string[][] = [];
        for (let y = 0; y < 9; y++) {
            arrBoard.push([]);
            for (let x = 0; x < 9; x++) {
                arrBoard[y].push(getStartValue({ x, y }));
            }
        }
        let arrPath: string[][] = [];
        for (let y = 0; y < 9; y++) {
            arrPath.push([]);
            for (let x = 0; x < 9; x++) {
                arrPath[y].push('');
            }
        }
        return [arrBoard, arrPath];
    }
}

export { findPath };