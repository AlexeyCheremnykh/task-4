class View {

    constructor() {
        this._cellSize = 10;
    }
   
    createCanvas(width, height) {
        if (width < 1 || height < 1 || isNaN(width) || isNaN(height)) {
            throw new Error("Wrong input");
        }

        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.className = "game__grid";
        canvas.id = "game__grid";

        return canvas;
    }    
    

    drawGrid(canvas, cellsX, cellsY) {
        try {
            canvas = new fabric.Canvas(canvas.id, {
                selection: false
            });
        } catch(err) {
            return new fabric.Canvas();
        }

        for (let x = 0; x < cellsX; x++) {
            for (let y = 0; y < cellsY; y++) {
                let rect = new fabric.Rect({                    
                    width: this._cellSize,
                    height: this._cellSize,
                    left: x * this._cellSize,
                    top: y * this._cellSize,
                    strokeWidth: 1,
                    stroke: "#000",
                    fill: "transparent",
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    hoverCursor: "pointer"               
                });    
                canvas.add(rect);           
            }                      
        }

        return canvas;
    }

    getElementIndexes(elem) {
        let indexes = {};
        indexes.i = elem.get("left") / this._cellSize;
        indexes.j = elem.get("top") / this._cellSize;
        return indexes;
    }


}

// testing
/*const view = new View();
let canvas = view.createCanvas(200, 200);
document.body.querySelector(".game__grid-container").appendChild(canvas);
canvas = view.drawGrid(canvas, 8, 8);

let handler = (options) => {
    options.target.set("fill", "#426");
    console.dir(options.target);
};
canvas.on("object:selected", handler);*/


module.exports = View;