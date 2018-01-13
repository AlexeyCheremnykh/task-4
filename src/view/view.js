class View {
    constructor() {}
    
    // ширина и высота - в клетках
    // размер клетки - для расчета ширины и высоты в пикселях
    createCanvas(width, height, cellSize) {
        if (width < 1 || height < 1 || !Number.isInteger(width) || !Number.isInteger(height)) {
            throw new Error("Wrong input");
        }

        let canvas = document.createElement("canvas");
        canvas.width = width * cellSize;
        canvas.height = height * cellSize;
        canvas.className = ".game__grid";

        return canvas;
    }    
    

    drawGrid(canvas) {
        try {
            var ctx = canvas.getContext("2d");
        } catch (err) {
            return
        }

        ctx.lineWidth = 1;

        let cellSize = 10;

        canvas = new fabric.Canvas(canvas);        

        let rects = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let rect = new fabric.Rect({
                    left: x,
                    top: y,
                    width: 10,
                    height: 10,
                    strokeWidth: 1,
                    stroke: "#000"
                });                
                canvas.add(rect);
                rects.push(rect);                
            }                      
        }

        console.log(rects[0] instanceof fabric.Rect);
        return 0;
    }
}

module.exports = View;