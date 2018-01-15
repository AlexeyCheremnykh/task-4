const EventDispatcher = require("../event-dispatcher/event-dispatcher");

class Model {
    constructor() {
        this.cellsX = null;
        this.cellsY = null;
        this.createGridMatrixEvent = new EventDispatcher(this);
        this.updateCellEvent = new EventDispatcher(this);
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
}

module.exports = Model;