/**
 * Interface that stores coordinates (x, y)
 */
interface Coord {
    /** Determines the place in a row */
    x: number,
    /** Determines which row */
    y: number
}
/**
 * Interface that determines the game rules
 */
interface GameRules {
    /** Determines the number of balls needed next to each other to kill them */
    killAmount: number,
    /** Determines the number of colors of the balls in the game */
    colorsAmount: number
}
export { Coord, GameRules }