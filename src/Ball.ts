interface Coord {
    x: number,
    y: number
}

class Ball {
    static colors = [
        "#f00",
        "#0f0",
        "#00f",
        "#ff0",
        "#0ff",
        "#f0f",
        "#000"
    ]
    private coords: Coord;
    private color: number;
    private selected: boolean;
    constructor(coords: Coord, color: number) {
        this.coords = coords;
        this.color = color;
    }
    public getCoords(): Coord {
        return this.coords;
    }
    public getColor(): number {
        return this.color;
    }
    public isSelected(): boolean {
        return this.selected;
    }
    public changeSelected(val?: boolean) {
        this.selected = val === undefined ? !this.selected : val;
    }
    public moveTo(coords: Coord) {
        this.coords = coords;
    }
}

export { Ball, Coord };