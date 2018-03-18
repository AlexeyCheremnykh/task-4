import ObservedEvent from '../observed-event/observed-event';
import constants from '../constants';
import lodash from 'lodash';

class Model {
  constructor() {
    this.newGameEvent = new ObservedEvent();
    this.updateCellEvent = new ObservedEvent();
    this.endGameEvent = new ObservedEvent();
  }

  createGridMatrix(cellsX, cellsY) {
    this._gridMatrix = [...Array(cellsY)].map(() => Array(cellsX).fill(constants.DEAD_CELL));
    this._pastGenerations = [];
    this.cellsY = cellsY;
    this.cellsX = cellsX;
    this.newGameEvent.notify(cellsX, cellsY);
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
    const cellWillLive = aliveNeighbours => aliveNeighbours === constants.MAX_ALIVE_NEIGHBOURS;

    const cellWillDie = (aliveNeighbours) => {
      const tooFewNeighbours = aliveNeighbours < constants.MIN_ALIVE_NEIGHBOURS;
      const tooManyNeighbours = aliveNeighbours > constants.MAX_ALIVE_NEIGHBOURS;
      return tooFewNeighbours || tooManyNeighbours;
    };

    if (this._pastGenerations.find(generation => lodash.isEqual(generation, this._gridMatrix))) {
      this.endGameEvent.notify();
      return;
    }
    this._pastGenerations.push(lodash.cloneDeep(this._gridMatrix));

    const indexesToUpdate = [];
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
      return;
    }
    indexesToUpdate.forEach((indexesPair) => {
      this.updateCell(indexesPair[0], indexesPair[1]);
    });
  }

  _countAliveNeighbours(cellRow, cellCol) {
    const matrixOfNeighbours = this._createMatrixOfNeighbours(cellRow, cellCol);

    return lodash.flatten(matrixOfNeighbours).reduce((aliveNeighbours, elem) => (
      elem === constants.ALIVE_CELL ? aliveNeighbours + 1 : aliveNeighbours
    ), 0);
  }

  _createMatrixOfNeighbours(cellRow, cellCol) {
    const calcFirstNeighboringIndex = (currentCellIndex) => {
      if (currentCellIndex - 1 < 0) return 0;
      return currentCellIndex - 1;
    };

    const calcLastNeighboringIndex = (currentCellIndex, maxIndex) => {
      if (currentCellIndex + 1 > maxIndex) return maxIndex;
      return currentCellIndex + 1;
    };

    const topNeighboringRow = calcFirstNeighboringIndex(cellRow);
    const bottomNeighboringRow = calcLastNeighboringIndex(cellRow, this.cellsY);

    const leftNeighboringCol = calcFirstNeighboringIndex(cellCol);
    const rightNeighboringCol = calcLastNeighboringIndex(cellCol, this.cellsX);

    const matrixOfNeighbours = this._gridMatrix
      .slice(topNeighboringRow, bottomNeighboringRow + 1)
      .map(matrixRow => matrixRow.slice(leftNeighboringCol, rightNeighboringCol + 1));

    const currentCellRow = cellRow - topNeighboringRow;
    const currentCellCol = cellCol - leftNeighboringCol;
    matrixOfNeighbours[currentCellRow].splice(currentCellCol, 1);

    return matrixOfNeighbours;
  }
}

export default Model;
