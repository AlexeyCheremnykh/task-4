import ObservedEvent from '../observed-event/observed-event';
import constants from '../constants';

class Model {
  constructor() {
    this.createGridMatrixEvent = new ObservedEvent();
    this.updateCellEvent = new ObservedEvent();
    this.endGameEvent = new ObservedEvent();
  }

  createGridMatrix(cellsX, cellsY) {
    this._gridMatrix = [...Array(cellsY)].map(() => Array(cellsX).fill(constants.DEAD_CELL));
    this.cellsY = cellsY;
    this.cellsX = cellsX;
    this.createGridMatrixEvent.notify(cellsX, cellsY);
  }

  updateCell(cellRow, cellCol) {
    if (this._gridMatrix[cellRow][cellCol] === constants.DEAD_CELL) {
      this._gridMatrix[cellRow][cellCol] = constants.ALIVE_CELL;
    } else {
      this._gridMatrix[cellRow][cellCol] = constants.DEAD_CELL;
    }
    this.updateCellEvent.notify(cellRow, cellCol);
  }

  calculateNextGeneration() {
    const indexesToUpdate = [];

    const cellWillLive = aliveNeighbours => aliveNeighbours === constants.MAX_ALIVE_NEIGHBOURS;

    const cellWillDie = (aliveNeighbours) => {
      const tooFewNeighbours = aliveNeighbours < constants.MIN_ALIVE_NEIGHBOURS;
      const tooManyNeighbours = aliveNeighbours > constants.MAX_ALIVE_NEIGHBOURS;
      return tooFewNeighbours || tooManyNeighbours;
    };

    this._gridMatrix.forEach((row, rowIndex) => {
      row.forEach((matrixElement, colIndex) => {
        const aliveNeighbours = this._countAliveNeighbours(rowIndex, colIndex);
        if (matrixElement === constants.DEAD_CELL) {
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

  _countAliveNeighbours(cellRow, cellCol) {
    let aliveNeighbours = 0;
    const matrixOfNeighbors = this._createMatrixOfNeighbors(cellRow, cellCol);

    matrixOfNeighbors.forEach((row) => {
      row.forEach((matrixElement) => {
        if (matrixElement === constants.ALIVE_CELL) {
          aliveNeighbours += 1;
        }
      });
    });
    return aliveNeighbours;
  }

  _createMatrixOfNeighbors(cellRow, cellCol) {
    const firstNeighboringRow = Math.max(0, cellRow - 1);
    const lastNeighboringRow = Math.min(this.cellsY, cellRow + 1);

    const firstNeighboringCol = Math.max(0, cellCol - 1);
    const lastNeighboringCol = Math.min(this.cellsX, cellCol + 1);

    const matrixOfNeighbors = this._gridMatrix
      .slice(firstNeighboringRow, lastNeighboringRow + 1)
      .map(matrixRow => matrixRow.slice(firstNeighboringCol, lastNeighboringCol + 1));

    // убрать текущий элемент из матрицы с соседями
    matrixOfNeighbors[cellRow - firstNeighboringRow].splice(cellCol - firstNeighboringCol, 1);

    return matrixOfNeighbors;
  }
}

export default Model;
