const View = require("../view");
const view = new View();

describe("Create canvas", () => {
    test("Canvas has been created if width and height >= 1", () => {
        const width = 100;
        const height = 100;
        const canvas = view.createCanvas(width, height);
        expect(canvas.width).toBe(width);
        expect(canvas.height).toBe(height);
        expect(canvas.tagName).toBe("CANVAS");
    });

    test("Canvas hasn't been created if width or height < 1", () => {
        expect(() => { view.createCanvas(100, -10) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(100, 0) }).toThrow("Wrong input");
    });

    test("Canvas hasn't been created if width or height is not a number", () => {
        expect(() => { view.createCanvas(100) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(100, "a string") }).toThrow("Wrong input");
        expect(() => { view.createCanvas(100, {"this is": "an object"}) }).toThrow("Wrong input");        
    });
});


describe("Draw a grid", () => { 
    const canvas = view.createCanvas(100, 100);
    document.body.appendChild(canvas);    
    test("Grid has been drawn (correct input)", () => {        
        expect(view.drawGrid(canvas, 10, 10).isEmpty()).toEqual(false);
    });

    test("Grid hasn't been drawn (wrong input)", () => {
        expect(view.drawGrid(canvas, 10).isEmpty()).toEqual(true);
        expect(view.drawGrid(canvas, "test", 10).isEmpty()).toEqual(true);
        expect(view.drawGrid(canvas).isEmpty()).toEqual(true);
        expect(view.drawGrid().isEmpty()).toEqual(true);
    });
});


/*describe("Get a cell (fabric.Rect obj) from canvas", () => {
    let canvas = view.createCanvas(100, 100);
    canvas = view.drawGrid(canvas, 20, 20);
    let cell = view.getCell(canvas, 1); // canvas.item[1]
    test("getCell returns fabric.Rect", () => {
        expect(cell instanceof fabric.Rect).toBe(true);
    });

    test("getCell returns undefined (wrong cellIndex)", () => {
        cell = view.getCell(canvas, 400);
        expect(cell).toBe(undefined);
    });


    test("getCell return undefined (wrong canvas)", () => {
        cell = view.getCell("canvas", 1);
        expect(cell).toBe(undefined);
        cell= view.getCell(123, 1);
        expect(cell).toBe(undefined);
    });
});*/

/*describe("Change a cell status (dead/alive)", () => {

});*/