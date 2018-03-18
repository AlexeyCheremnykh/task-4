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
    const calcStartingRowOrCol = (currentRowOrCol) => {
      if (currentRowOrCol - 1 < 0) return 0;
      return currentRowOrCol - 1;
    };

    const calcEndingRowOrCol = (currentRowOrCol, maxRowOrCol) => {
      if (currentRowOrCol + 1 > maxRowOrCol) return maxRowOrCol;
      return currentRowOrCol + 1;
    };

    const topNeighboringRow = calcStartingRowOrCol(cellRow);
    const bottomNeighboringRow = calcEndingRowOrCol(cellRow, this.cellsY - 1);

    const leftNeighboringCol = calcStartingRowOrCol(cellCol);
    const rightNeighboringCol = calcEndingRowOrCol(cellCol, this.cellsX - 1);

    const neighbouringRows = lodash.range(topNeighboringRow, bottomNeighboringRow + 1);
    const neighbouringCols = lodash.range(leftNeighboringCol, rightNeighboringCol + 1);

    const aliveWithCurrentCell = neighbouringRows.reduce((aliveInTotal, row) => {
      const aliveInRow = neighbouringCols.reduce((aliveCells, col) => (
        this._gridMatrix[row][col] === constants.ALIVE_CELL ? aliveCells + 1 : aliveCells
      ), 0);
      return aliveInTotal + aliveInRow;
    }, 0);

    let aliveNeighbours = aliveWithCurrentCell;
    if (this._gridMatrix[cellRow][cellCol] === constants.ALIVE_CELL) {
      aliveNeighbours -= 1;
    }
    return aliveNeighbours;
  }
}

export default Model;
