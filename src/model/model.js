const ObservedEvent = require("../observed-event/observed-event");

class Model {
  constructor() {
    this.createGridMatrixEvent = new ObservedEvent(this);
    this.updateCellEvent = new ObservedEvent(this);
    this.endGameEvent = new ObservedEvent(this);
  }

  createGridMatrix(cellsX, cellsY) {
    this._gridMatrix = [];
    for (let i = 0; i < cellsY; i += 1) {
      const gridMatrixRow = [];
      for (let j = 0; j < cellsX; j += 1) {
        gridMatrixRow.push(0);
      }
      this._gridMatrix.push(gridMatrixRow);
    }
    this.cellsY = this._gridMatrix.length;
    this.cellsX = this._gridMatrix[0].length;
    this.createGridMatrixEvent.notify();
  }

  updateCell(i, j) {
    if (this._gridMatrix[i][j] === 0) {
      this._gridMatrix[i][j] = 1;
    } else {
      this._gridMatrix[i][j] = 0;
    }
    this.updateCellEvent.notify(i, j);
  }

  countAliveNeighbours(i, j) {
    let aliveNeighbours = 0;
    for (let k = Math.max(0, i - 1); k < Math.min(this.cellsY, i + 2); k += 1) {
      for (let m = Math.max(0, j - 1); m < Math.min(this.cellsX, j + 2); m += 1) {
        const notCurrentCell = k !== i || m !== j;
        if (notCurrentCell) {
          if (this._gridMatrix[k][m] === 1) {
            aliveNeighbours += 1;
          }
        }
      }
    }
    return aliveNeighbours;
  }

  calculateNextGeneration() {
    const indexesToUpdate = [];
    for (let i = 0; i < this.cellsY; i += 1) {
      for (let j = 0; j < this.cellsX; j += 1) {
        const aliveNeighbours = this.countAliveNeighbours(i, j);
        if (this._gridMatrix[i][j] === 0) {
          if (aliveNeighbours === 3) {
            indexesToUpdate.push([i, j]);
          }
        } else if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          indexesToUpdate.push([i, j]);
        }
      }
    }
    if (!indexesToUpdate.length) {
      this.endGameEvent.notify();
    }
    indexesToUpdate.forEach((indexesPair) => {
      this.updateCell(indexesPair[0], indexesPair[1]);
    });
  }
}

module.exports = Model;
