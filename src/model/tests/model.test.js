const Model = require("../model");
const model = new Model();

describe("Model tests", () => {
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
            var changedElement = model.updateCell(i, j);
            expect(changedElement).toEqual(1);
        });

        test("1 -> 0", () => {
            changedElement = model.updateCell(i, j);
            expect(changedElement).toEqual(0);
        });

        test("Nothing changes if wrong index", () => {
            changedElement = model.updateCell(666, "a string");
            expect(changedElement).toBe(undefined);
            changedElement = model.updateCell(10, "a string");
            expect(changedElement).toBe(undefined);
            changedElement = model.updateCell("wat");
            expect(changedElement).toBe(undefined);
        });
    });
});