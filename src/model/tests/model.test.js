const Model = require("../model");
const model = new Model();

describe("Model tests", () => {
    test("Init grid matrix", () => {
        let cellsX = 10;
        let cellsY = 10;
        let gridMatrix = model.initGridMatrix(cellsX, cellsY);        
        expect(gridMatrix instanceof Array).toBe(true);
        expect(gridMatrix[4] instanceof Array).toBe(true);
        expect(gridMatrix.length === cellsY).toBe(true);
        expect(gridMatrix[2].length === cellsX).toBe(true);
    });
});