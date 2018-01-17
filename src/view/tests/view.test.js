const View = require("../view");
const Model = require("../../model/model");
const model = new Model();
const view = new View(model);

describe("View tests", () => {
    model.createGridMatrix(5, 5);
    const container = document.createElement("div"); 
    container.className = "game__grid";
    document.body.appendChild(container);
    view.createGrid();
    let cells = container.querySelectorAll(".game__grid-cell");
    
    describe("Create grid", () => {  
        test("Grid has been created", () => {
            expect(cells.length).toBe(25);
        });
    });

    describe("Get element indexes", () => {
        test("Correct i index", () => {
            expect(view.getCellIndexes(cells[5]).i).toBe(1);
        });

        test("Correct j index", () => {
            expect(view.getCellIndexes(cells[7]).j).toBe(2);
        });
    });

    describe("Update cell", () => {
        test("Set alive", () => {
            view.updateCell(0, 0);            
            expect(cells[0].className == "game__grid-cell game__grid-cell_alive").toBe(true);
        });

        test("Set dead", () => {
            view.updateCell(0, 0);
            expect(cells[0].className == "game__grid-cell").toBe(true);
        });
    });

    describe("Replace buttons", () => {
        const startPauseButton = document.createElement("div");
        startPauseButton.className = "game__start-pause";
        document.body.appendChild(startPauseButton);

        test("Replace start button", () => {
            view.replaceStartButton();
            expect(startPauseButton.innerHTML).toBe("Pause");
        });

        test("Replace pause button", () => {
            view.replacePauseButton();
            expect(startPauseButton.innerHTML).toBe("Start");
        });
    });
});