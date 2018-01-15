const Model = require("../model");

describe("Model tests", () => {
    const model = new Model();

    describe("Constructor", () => {
        test("Model has been created", () => {
            expect(model.createGridMatrixEvent).not.toBeUndefined();
        });
    });

    describe("Create grid matrix", () => {
        test("Grid matrix has been created", () => {
            const cellsX = 10;
            const cellsY = 15;
            const matrixSize = model.createGridMatrix(cellsX, cellsY);        
            expect(model.cellsY === cellsY).toBe(true);
            expect(model.cellsX === cellsX).toBe(true);
        });
    });

    describe("Change matrix element", () => {
        const cellsX = 10, cellsY = 10;
        // init matrix (each element = 0)
        const gridMatrix = model.createGridMatrix(cellsX, cellsY);
        let i = 1, j = 2;
        test("0 -> 1", () => {           
            var changedElement = model.changeElement(i, j);
            expect(changedElement).toEqual(1);
        });

        test("1 -> 0", () => {
            changedElement = model.changeElement(i, j);
            expect(changedElement).toEqual(0);
        });

        test("Nothing changes if wrong index", () => {
            changedElement = model.changeElement(666, "a string");
            expect(changedElement).toBe(undefined);
            changedElement = model.changeElement(10, "a string");
            expect(changedElement).toBe(undefined);
            changedElement = model.changeElement("wat");
            expect(changedElement).toBe(undefined);
        });
    });
});