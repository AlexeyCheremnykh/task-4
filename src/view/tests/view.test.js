const View = require("../view");
const view = new View();

describe("View tests", () => {
    const container = document.createElement("div");  
    view.createGrid(container, 5, 5);
    let cells = container.querySelectorAll(".game__grid-cell");
    
    describe("Create grid", () => {  
        test("Grid has been created", () => {
            expect(cells.length).toBe(25);
        });
    });


    describe("Get element indexes", () => {
        test("Correct i index", () => {
            expect(view.getElementIndexes(cells[5]).i).toBe(1);
        });

        test("Correct j index", () => {
            expect(view.getElementIndexes(cells[7]).j).toBe(2);
        });
    });
});

