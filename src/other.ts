/**
 * Checks if given objects are equal to each other
 * @param obj1 Object 1
 * @param obj2 Object 2
 * @returns True if objects are equal, false otherwise
 */
function objEqual(obj1: Object, obj2: Object): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * Gives a random integer from range <0; n)
 * @param n Upper limit of range
 * @returns Random integer contained in <0; n)
 */
function rng(n: number): number {
    return Math.floor(Math.random() * n);
}
export { objEqual, rng };