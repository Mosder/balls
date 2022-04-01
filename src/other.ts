function objEqual(obj1: Object, obj2: Object): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function rng(n: number): number {
    return Math.floor(Math.random() * n);
}
export { objEqual, rng };