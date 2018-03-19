import ObservedEvent from '../observed-event/observed-event';
import constants from '../constants';
import lodash from 'lodash';

class Model {
  constructor() {
    this.newGameEvent = new ObservedEvent();
    this.updateCellEvent = new ObservedEvent();
    this.endGameEvent = new ObservedEvent();
  }

  createGridMatrix(numOfCols, numOfRows) {
    this._gridMatrix = [...Array(numOfRows)].map(() => Array(numOfCols).fill(constants.DEAD_CELL));
    this._pastGenerations = [];
    this.numOfRows = numOfRows;
    this.numOfCols = numOfCols;
    this.newGameEvent.notify(numOfCols, numOfRows);
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
    const isGenerationRepeated = generation => (
      this._pastGenerations.find(pastGeneration => lodash.isEqual(pastGeneration, generation))
    );
    if (isGenerationRepeated(this._gridMatrix)) {
      this.endGameEvent.notify();
      return;
    }
    this._pastGenerations.push(lodash.cloneDeep(this._gridMatrix));

    const willCellRevive = (cell, aliveNeighbours) => (
      cell === constants.DEAD_CELL &&
      aliveNeighbours === constants.MAX_ALIVE_NEIGHBOURS
    );

    const willCellDie = (cell, aliveNeighbours) => {
      const tooFewNeighbours = aliveNeighbours < constants.MIN_ALIVE_NEIGHBOURS;
      const tooManyNeighbours = aliveNeighbours > constants.MAX_ALIVE_NEIGHBOURS;

      return cell === constants.ALIVE_CELL &&
        (tooFewNeighbours || tooManyNeighbours);
    };

    const indexesToUpdate = [];

    this._gridMatrix.forEach((row, rowIndex) => {
      row.forEach((matrixElement, colIndex) => {
        const aliveNeighbours = this._countAliveNeighbours(rowIndex, colIndex);
        if (
          willCellDie(matrixElement, aliveNeighbours) ||
          willCellRevive(matrixElement, aliveNeighbours)
        ) {
          indexesToUpdate.push([rowIndex, colIndex]);
        }
      });
    });

    if (indexesToUpdate.length === 0) {
      this.endGameEvent.notify();
      return;
    }
    indexesToUpdate.forEach((indexesPair) => {
      const [cellRow, cellCol] = indexesPair;
      this.updateCell(cellRow, cellCol);
    });
  }

  _countAliveNeighbours(cellRow, cellCol) {
    const calcStartingRowOrCol = (currentRowOrCol) => {
      const isPreviousRowOrColOutOfBounds = currentRowOrCol - 1 < 0;
      return isPreviousRowOrColOutOfBounds ? 0 : currentRowOrCol - 1;
    };

    const calcEndingRowOrCol = (currentRowOrCol, maxRowOrCol) => {
      const isNextRowOrColOutOfBounds = currentRowOrCol + 1 > maxRowOrCol;
      return isNextRowOrColOutOfBounds ? maxRowOrCol : currentRowOrCol + 1;
    };

    const lastRowIndex = this.numOfRows - 1;
    const topNeighboringRow = calcStartingRowOrCol(cellRow);
    const bottomNeighboringRow = calcEndingRowOrCol(cellRow, lastRowIndex);

    const lastColIndex = this.numOfCols - 1;
    const leftNeighboringCol = calcStartingRowOrCol(cellCol);
    const rightNeighboringCol = calcEndingRowOrCol(cellCol, lastColIndex);

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
