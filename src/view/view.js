class View {

    constructor() {
        this.grid = null;
        this._cellSize = 12;
    }
   
    // width, height - в клетках
    createGrid(container, width, height) {
        let grid = document.createElement("div");
        grid.className = "game__grid"
        grid.style.width = width * this._cellSize + "px";
        container.appendChild(grid);     
        for (let i = 0; i < width * height; i++) {
            let div = document.createElement("div");
            div.className = "game__grid-cell";
            div.style.width = div.style.height = this._cellSize + "px";
            grid.appendChild(div);
        }
    }

    getElementIndexes(elem) {
        let indexes = {};
        indexes.i = elem.get("top") / this._cellSize;
        indexes.j = elem.get("left") / this._cellSize;
        return indexes;
    }
}

// testing
/*const view = new View();
let canvas = view.createCanvas(200, 200);
document.body.querySelector(".game__grid-container").appendChild(canvas);
canvas = view.drawGrid(canvas, 5, 8);

let handler = (options) => {
    options.target.set("fill", "#426");
    console.log(options.target.get("left"), options.target.get("top"));
    console.log(view.getElementIndexes(options.target));
};
canvas.on("object:selected", handler);*/


module.exports = View;