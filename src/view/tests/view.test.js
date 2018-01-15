const View = require("../view");
const Model = require("../../model/model");
const model = new Model();
const view = new View(model);

describe("View tests", () => {
    const container = document.createElement("div"); 
    container.className = "game__grid-container";
    document.body.appendChild(container);
    view.createGrid(5, 5);
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