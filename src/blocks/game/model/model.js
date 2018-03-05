import ObservedEvent from '../observed-event/observed-event';

class Model {
  constructor() {
    this.createGridMatrixEvent = new ObservedEvent(this);
    this.updateCellEvent = new ObservedEvent(this);
    this.endGameEvent = new ObservedEvent(this);
    this._constants = {
      DEAD_CELL: 0,
      ALIVE_CELL: 1,
      MAX_ALIVE_NEIGHBOURS: 3,
      MIN_ALIVE_NEIGHBOURS: 2,
    };
  }

  createGridMatrix(cellsX, cellsY) {
    this._gridMatrix = [...Array(cellsY)].map(() => Array(cellsX).fill(this._constants.DEAD_CELL));
    this.cellsY = cellsY;
    this.cellsX = cellsX;
    this.createGridMatrixEvent.notify();
  }

  updateCell(i, j) {
    if (this._gridMatrix[i][j] === this._constants.DEAD_CELL) {
      this._gridMatrix[i][j] = this._constants.ALIVE_CELL;
    } else {
      this._gridMatrix[i][j] = this._constants.DEAD_CELL;
    }
    this.updateCellEvent.notify(i, j);
  }

  countAliveNeighbours(i, j) {
    let aliveNeighbours = 0;

    for (let k = Math.max(0, i - 1); k < Math.min(this.cellsY, i + 2); k += 1) {
      for (let m = Math.max(0, j - 1); m < Math.min(this.cellsX, j + 2); m += 1) {
        const notCurrentCell = k !== i || m !== j;
        if (notCurrentCell) {
          if (this._gridMatrix[k][m] === this._constants.ALIVE_CELL) {
            aliveNeighbours += 1;
          }
        }
      }
    }
    return aliveNeighbours;
  }

  calculateNextGeneration() {
    const self = this;
    const indexesToUpdate = [];

    const cellWillLive = function checkIfDeadCellWillLive(aliveNeighbours) {
      return aliveNeighbours === self._constants.MAX_ALIVE_NEIGHBOURS;
    };

    const cellWillDie = function checkIfAliveCellWillDie(aliveNeighbours) {
      const tooFewNeighbours = aliveNeighbours < self._constants.MIN_ALIVE_NEIGHBOURS;
      const tooManyNeighbours = aliveNeighbours > self._constants.MAX_ALIVE_NEIGHBOURS;
      return tooFewNeighbours || tooManyNeighbours;
    };

    this._gridMatrix.forEach((row, rowIndex) => {
      row.forEach((matrixElement, colIndex) => {
        const aliveNeighbours = this.countAliveNeighbours(rowIndex, colIndex);
        if (matrixElement === this._constants.DEAD_CELL) {
          if (cellWillLive(aliveNeighbours)) {
            indexesToUpdate.push([rowIndex, colIndex]);
          }
        } else if (cellWillDie(aliveNeighbours)) {
          indexesToUpdate.push([rowIndex, colIndex]);
        }
      });
    });
    if (!indexesToUpdate.length) {
      this.endGameEvent.notify();
    }
    indexesToUpdate.forEach((indexesPair) => {
      this.updateCell(indexesPair[0], indexesPair[1]);
    });
  }
}

export default Model;
