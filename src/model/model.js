class Model {
    
    createGridMatrix(cellsX, cellsY) {
        this._gridMatrix = [];        
        for(let i = 0; i < cellsY; i++) {            
            let gridMatrixRow = [];
            for (let j = 0; j < cellsX; j++) {
                gridMatrixRow.push(0);
            }
            this._gridMatrix.push(gridMatrixRow);
        }
        return {
            "matrixHeight": this._gridMatrix.length,
            "matrixWidth": this._gridMatrix[0].length
        }
    }

    changeElement(i, j) {
        try {
            if (this._gridMatrix[i][j] === 0) {
                return this._gridMatrix[i][j] = 1;
            } else if (this._gridMatrix[i][j] === 1) {
                return this._gridMatrix[i][j] = 0;
            }
        } catch(err) {
            return
        }
    }
}

module.exports = Model;