const Model = require("../model");
const model = new Model();

describe("Model tests", () => {
    const cellsX = 3, cellsY = 3;
    model.createGridMatrix(cellsX, cellsY);

    describe("Create grid matrix", () => {
        test("Grid matrix has been created", () => {      
            expect(model.cellsY === cellsY).toBe(true);
            expect(model.cellsX === cellsX).toBe(true);
        });
    });

    describe("Change matrix element", () => {
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

    describe("Game run", () => {
        test("Count alive neighbours", () => { 
            model.createGridMatrix(3, 3); 
            for (let i = 0; i < cellsX; i++) {
                for (let j = 0; j < cellsY; j++) {
                    model.updateCell(i, j);
                }
            }          
            expect(model.countAliveNeighbours(1, 1)).toBe(8);
            model.updateCell(0, 1);
            expect(model.countAliveNeighbours(0, 0)).toBe(2);
            expect(model.countAliveNeighbours(0, 1)).toBe(5);
        });
    });
});