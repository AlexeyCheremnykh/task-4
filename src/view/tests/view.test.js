const View = require("../view");
const view = new View();

describe("View tests", () => {
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


    describe("Get element indexes", () => {
        let canvas = view.createCanvas(100, 100);
        canvas = view.drawGrid(canvas, 3, 3);
        let elem = canvas.item(5);
        test("Correct i index", () => {
            expect(view.getElementIndexes(elem).i).toBe(1);
        });

        test("Correct j index", () => {
            expect(view.getElementIndexes(elem).j).toBe(2);
        });
    });
});

