import { Coord } from "./interfaces";

/**
 * Class of a ball on the board
 */
class Ball {
    /** Static array containing possible colors of balls */
    static colors = [
        "#f00",
        "#0f0",
        "#00f",
        "#ff0",
        "#0ff",
        "#f0f",
        "#000"
    ]
    /** Coords of the ball */
    private coords: Coord;
    /** Color of the ball */
    private color: number;
    /** If ball is selected */
    private selected: boolean;
    /**
     * Constructs new Ball object
     * @param coords Coords of the ball
     * @param color Color of the ball
     */
    constructor(coords: Coord, color: number) {
        this.coords = coords;
        this.color = color;
    }
    /**
     * Returns ball coords
     * @returns Coords of the ball
     */
    public getCoords(): Coord {
        return this.coords;
    }
    /**
     * Returns ball color
     * @returns Color of the ball
     */
    public getColor(): number {
        return this.color;
    }
    /**
     * Returns if the ball is selected
     * @returns Boolean determining if the ball is selected
     */
    public isSelected(): boolean {
        return this.selected;
    }
    /**
     * Changes the value of property selected
     * @param val Sets the value to the param if given, inverses it if not
     */
    public changeSelected(val?: boolean) {
        this.selected = val === undefined ? !this.selected : val;
    }
    /**
     * Moves the ball to given coords
     * @param coords Coords to move the ball to
     */
    public moveTo(coords: Coord) {
        this.coords = coords;
    }
}

export { Ball };