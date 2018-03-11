import constants from '../constants';

class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }

  init() {
    this.observeModel().observeView();
    this._model.createGridMatrix(constants.DEFAULT_WIDTH, constants.DEFAULT_HEIGHT);
    this._gameIsRunning = false;
    this._timerId = null;
    this._delay = constants.DEFAULT_DELAY;
  }

  observeModel() {
    this._model.createGridMatrixEvent.attach(this.createGrid.bind(this));
    this._model.updateCellEvent.attach(this.updateGridCell.bind(this));
    this._model.endGameEvent.attach(this.stopGame.bind(this));
    return this;
  }

  observeView() {
    this._view.grid.cellUpdate.attach(this.updateMatrixCell.bind(this));
    this._view.startStop.click.attach(this.startOrStopGame.bind(this));
    this._view.oneStep.click.attach(this.updateMatrix.bind(this));
    this._view.clear.click.attach(this.clearMatrix.bind(this));
    this._view.width.blur.attach(this.changeMatrixWidth.bind(this));
    this._view.height.blur.attach(this.changeMatrixHeight.bind(this));
    this._view.delay.blur.attach(this.changeDelay.bind(this));
    return this;
  }

  startGame() {
    if (this._view.delay.isValid()) {
      this._timerId = setInterval(this.updateMatrix.bind(this), this._delay);
      this._gameIsRunning = true;
      this._view.startStop.setText('Stop');
    }
  }

  stopGame() {
    clearInterval(this._timerId);
    this._gameIsRunning = false;
    this._view.startStop.setText('Start');
  }

  startOrStopGame() {
    if (!this._gameIsRunning) {
      this.startGame();
    } else {
      this.stopGame();
    }
  }

  createGrid(cellsX, cellsY) {
    this._view.grid.createGrid(cellsX, cellsY, constants.CELL_SIZE);
  }

  updateGridCell(cellRow, cellCol) {
    const gridCellIndex = (cellRow * this._model.cellsX) + cellCol;
    this._view.grid.updateCell(gridCellIndex);
  }

  updateMatrixCell(cellIndex) {
    const cellRow = Math.floor(cellIndex / this._model.cellsX);
    const cellCol = cellIndex % this._model.cellsX;
    this._model.updateCell(cellRow, cellCol);
  }

  updateMatrix() {
    this._model.calculateNextGeneration();
  }

  clearMatrix() {
    this._model.createGridMatrix(this._model.cellsX, this._model.cellsY);
  }

  changeMatrixWidth(newCellsX) {
    if (this._inputIsCorrect(newCellsX)) {
      this._view.width.removeInvalidModificator();
      const cellsX = parseInt(newCellsX, 10);
      if (this._view.height.isValid() && cellsX !== this._model.cellsX) {
        const cellsY = parseInt(this._view.height.getValue(), 10);
        this._model.createGridMatrix(cellsX, cellsY);
      }
    } else {
      this._view.width.addInvalidModificator();
    }
  }

  changeMatrixHeight(newCellsY) {
    if (this._inputIsCorrect(newCellsY)) {
      this._view.height.removeInvalidModificator();
      const cellsY = parseInt(newCellsY, 10);
      if (this._view.width.isValid() && cellsY !== this._model.cellsY) {
        const cellsX = parseInt(this._view.width.getValue(), 10);
        this._model.createGridMatrix(cellsX, cellsY);
      }
    } else {
      this._view.height.addInvalidModificator();
    }
  }

  changeDelay(newDelay) {
    if (this._inputIsCorrect(newDelay)) {
      this._view.delay.removeInvalidModificator();
      const delay = parseInt(newDelay, 10);
      if (delay !== this._delay) {
        this._delay = delay;
        if (this._gameIsRunning) {
          clearInterval(this._timerId);
          this._timerId = setInterval(this.updateMatrix.bind(this), this._delay);
        }
      }
    } else {
      this._view.delay.addInvalidModificator();
    }
  }

  _inputIsCorrect(stringValue) {
    const parsedValue = parseFloat(stringValue, 10);
    return $.isNumeric(stringValue) && parsedValue > 0 && Number.isInteger(parsedValue);
  }
}

export default Controller;
