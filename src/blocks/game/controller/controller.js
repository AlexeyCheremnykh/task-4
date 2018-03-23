import constants from '../constants';

class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }

  init() {
    this.observeModel().observeView();
    this._model.createGridMatrix(constants.DEFAULT_WIDTH, constants.DEFAULT_HEIGHT);
    this._isGameRunning = false;
    this._timerId = null;
    this._delay = constants.DEFAULT_DELAY;
  }

  observeModel() {
    this._model.newGameEvent.attach(this.initNewGameView);
    this._model.updateCellEvent.attach(this.updateGridCell);
    this._model.endGameEvent.attach(this.finishGame);
    return this;
  }

  observeView() {
    this._view.updateCellEvent.attach(this.updateMatrixCell);
    this._view.changeGameStatusEvent.attach(this.toggleGameStatus);
    this._view.skipGenerationEvent.attach(this.updateMatrix);
    this._view.newGameEvent.attach(this.clearGrid);
    this._view.changeWidthEvent.attach(this.changeMatrixWidth);
    this._view.changeHeightEvent.attach(this.changeMatrixHeight);
    this._view.changeDelayEvent.attach(this.changeDelay);
    return this;
  }

  initNewGameView = (numOfCols, numOfRows) => {
    this._view.createGrid(numOfCols, numOfRows, constants.CELL_SIZE);
    this._view.startGame();
  }

  updateGridCell = (cellRow, cellCol) => {
    const gridCellIndex = (cellRow * this._model.numOfCols) + cellCol;
    this._view.updateCell(gridCellIndex);
  }

  updateMatrixCell = (cellIndex) => {
    const cellRow = Math.floor(cellIndex / this._model.numOfCols);
    const cellCol = cellIndex % this._model.numOfCols;
    this._model.updateCell(cellRow, cellCol);
  }

  toggleGameStatus = () => {
    if (!this._isGameRunning) {
      this.startGame();
    } else {
      this.stopGame();
    }
  }

  startGame = () => {
    if (this._view.isInputValid('delay')) {
      this._timerId = setInterval(this.updateMatrix, this._delay);
      this._isGameRunning = true;
      this._view.setRunningStatus(this._isGameRunning);
    }
  }

  stopGame = () => {
    clearInterval(this._timerId);
    this._isGameRunning = false;
    this._view.setRunningStatus(this._isGameRunning);
  }

  finishGame = () => {
    this.stopGame();
    this._view.finishGame();
  }

  updateMatrix = () => {
    this._model.calculateNextGeneration();
  }

  clearGrid = () => {
    this.stopGame();
    this._model.createGridMatrix(this._model.numOfCols, this._model.numOfRows);
  }

  changeMatrixWidth = (widthInputValue) => {
    if (this._isInputValueValid(widthInputValue)) {
      this._view.setValidInputStatus('width');
      const numOfCols = parseInt(widthInputValue, 10);
      if (this._view.isInputValid('height') && numOfCols !== this._model.numOfCols) {
        const numOfRows = parseInt(this._view.getInputValue('height'), 10);
        this.stopGame();
        this._model.createGridMatrix(numOfCols, numOfRows);
      }
    } else {
      this._view.setInvalidInputStatus('width');
    }
  }

  changeMatrixHeight = (heightInputValue) => {
    if (this._isInputValueValid(heightInputValue)) {
      this._view.setValidInputStatus('height');
      const numOfRows = parseInt(heightInputValue, 10);
      if (this._view.isInputValid('width') && numOfRows !== this._model.numOfRows) {
        const numOfCols = parseInt(this._view.getInputValue('width'), 10);
        this.stopGame();
        this._model.createGridMatrix(numOfCols, numOfRows);
      }
    } else {
      this._view.setInvalidInputStatus('height');
    }
  }

  changeDelay = (newDelay) => {
    if (this._isInputValueValid(newDelay)) {
      this._view.setValidInputStatus('delay');
      const delay = parseInt(newDelay, 10);
      if (delay !== this._delay) {
        this._delay = delay;
        if (this._isGameRunning) {
          clearInterval(this._timerId);
          this._timerId = setInterval(this.updateMatrix, this._delay);
        }
      }
    } else {
      this._view.setInvalidInputStatus('delay');
    }
  }

  _isInputValueValid = (stringValue) => {
    const parsedValue = parseFloat(stringValue, 10);
    return $.isNumeric(stringValue) && parsedValue > 0 && Number.isInteger(parsedValue);
  }
}

export default Controller;
