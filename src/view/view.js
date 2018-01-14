class View {
    constructor() {}
    
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

        const cellSize = 10;
        for (let x = 0; x < cellsX; x++) {
            for (let y = 0; y < cellsY; y++) {
                let rect = new fabric.Rect({                    
                    width: cellSize,
                    height: cellSize,
                    left: x * cellSize,
                    top: y * cellSize,
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

    /*getCell(canvas, cellIndex) {
        try {
            return canvas.item(cellIndex);
        } catch(err) {
            return
        }
    }*/
}

// testing
const view = new View();
let canvas = view.createCanvas(200, 200);
document.body.querySelector(".game__grid-container").appendChild(canvas);
canvas = view.drawGrid(canvas, 8, 8);

let handler = (options) => {
    options.target.set("fill", "#426");
    console.dir(options.target);
};
canvas.on("object:selected", handler);


module.exports = View;