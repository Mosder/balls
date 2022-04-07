/** Decorator that rotates the board after new balls are added */
function rotateBoard(target: Object, name: string, descriptor: PropertyDescriptor) {
    let oryg = descriptor.value;
    descriptor.value = function (...args: any[]) {
        this.rotate += 45;
        let board = document.getElementById("board") as HTMLDivElement;
        board.style.transform = `rotate(${this.rotate}deg)`;
        let result = oryg.apply(this, args);
        return result;
    }
}
export { rotateBoard };