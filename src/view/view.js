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
            canvas = new fabric.Canvas(canvas.id);
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
                    selectable: false
                }); 
                console.log("x: ", x, " y: ", y);         
                canvas.add(rect);           
            }                      
        }

        return canvas;
    }
}

// testing
const view = new View();
const canvas = view.createCanvas(200, 200);
document.body.querySelector(".game__grid-container").appendChild(canvas);
view.drawGrid(canvas, 8, 8);

module.exports = View;