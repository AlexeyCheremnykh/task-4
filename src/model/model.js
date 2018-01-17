const ObservedEvent = require("../observed-event/observed-event");

class Model {
    constructor() {
        this.cellsX = null;
        this.cellsY = null;
        this.createGridMatrixEvent = new ObservedEvent(this);
        this.updateCellEvent = new ObservedEvent(this);
    }
    
    createGridMatrix(cellsX, cellsY) {  
        this._gridMatrix = [];        
        for(let i = 0; i < cellsY; i++) {            
            let gridMatrixRow = [];
            for (let j = 0; j < cellsX; j++) {
                gridMatrixRow.push(0);
            }
            this._gridMatrix.push(gridMatrixRow);
        }
        this.cellsY = this._gridMatrix.length;
        this.cellsX = this._gridMatrix[0].length;
        this.createGridMatrixEvent.notify();
    }

    updateCell(i, j) {
        try {            
            if (this._gridMatrix[i][j] === 0) {
                this._gridMatrix[i][j] = 1;
            } else if (this._gridMatrix[i][j] === 1) {
                this._gridMatrix[i][j] = 0;
            }
            this.updateCellEvent.notify(i, j);      
            return this._gridMatrix[i][j];            
        } catch(err) {
            return
        }
    }

    countAliveNeighbours(i, j) {
        let aliveNeighbours = 0;
        for (let k = Math.max(0, i - 1); k < Math.min(this.cellsX, i + 2); k++) {
            for (let m = Math.max(0, j - 1); m < Math.min(this.cellsY, j + 2); m++) {                
                if (k === i && m === j) {
                    continue;
                }
                if (this._gridMatrix[k][m] === 1) {
                    aliveNeighbours++;
                }
            }
        }
        return aliveNeighbours;
    }
}

module.exports = Model;