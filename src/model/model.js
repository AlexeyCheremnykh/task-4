class Model {
    constructor() {}

    initGridMatrix(cellsX, cellsY) {
        let gridMatrix = [];
        for(let i = 0; i < cellsY; i++) {
            let gridMatrixRow = [];
            for (let j = 0; j < cellsX; j++) {
                gridMatrixRow.push(0);
            }
            gridMatrix.push(gridMatrixRow);
        }
        return gridMatrix;
    }
}

module.exports = Model;