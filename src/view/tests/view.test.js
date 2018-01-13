const View = require("../view");
const view = new View();

describe("Create canvas", () => {
    test("Canvas has been created if width or height >= 1", () => {
        let width = 10;
        let height = 10;
        let cellSize = 10;
        let canvas = view.createCanvas(width, height, cellSize);
        expect(canvas.width).toBe(width * cellSize);
        expect(canvas.height).toBe(height * cellSize);
    });

    test("Canvas hasn't been created if width or height < 1", () => {
        expect(() => { view.createCanvas(0, 0) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(1, 0) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(0, 1) }).toThrow("Wrong input");
    });

    test("Canvas hasn't been created if width or height is not integer", () => {
        expect(() => { view.createCanvas(0.5, 0.5) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(0.5, 0) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(0, 1.4) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(null, 1) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(0, undefined) }).toThrow("Wrong input");
        expect(() => { view.createCanvas(0, "1") }).toThrow("Wrong input");
        expect(() => { view.createCanvas(0, NaN) }).toThrow("Wrong input");
    });
});

describe("Draw a grid", () => { 
    const canvas = document.createElement("canvas");  
    canvas.width = 100;
    canvas.height = 100; 
    test("Grid has been drawn (correct input)", () => {        
        expect(view.drawGrid(canvas)).toBe(0);
    });
    test("Grid hasn't been drawn (wrong input)", () => {
        expect(view.drawGrid()).not.toBe(0);
    })
});
//"<rootDir>/node_modules/canteen/build/canteen.min.js"