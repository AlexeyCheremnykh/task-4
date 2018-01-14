const View = require("../view");
const view = new View();

describe("View tests", () => {
    describe("Create grid", () => {
        const container = document.createElement("div");        
        test("Grid has been created", () => {
            view.createGrid(container, 100, 100);
            expect(container.querySelectorAll("div").length).toBe(10000 + 1);
        });
    });



    /*describe("Get element indexes", () => {
        let canvas = view.createCanvas(100, 100);
        let grid = view.drawGrid(canvas, 3, 3);
        let elem = grid.item(7);
        test("Correct i index", () => {
            expect(view.getElementIndexes(elem).i).toBe(2);
        });

        test("Correct j index", () => {
            expect(view.getElementIndexes(elem).j).toBe(1);
        });
    });*/
});

