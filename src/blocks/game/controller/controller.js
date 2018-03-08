class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;
    this._gameIsRunning = false;
    this._timerId = null;
  }

  observeModel() {
    this._model.createGridMatrixEvent.attach(this._view.createGrid);
    this._model.updateCellEvent.attach(this.updateViewCell.bind(this));
    this._model.endGameEvent.attach(this.stopGame.bind(this));
  }

  updateViewCell(cellRow, cellCol) {
    const updatableCell = $('.js-game__grid-cell')[(cellRow * this._model.cellsX) + cellCol];
    this._view.updateCell(updatableCell);
  }

  startGame() {
    const delayInput = $('.js-game__delay-input')[0];
    if (this._view.inputValueIsValid(delayInput)) {
      const delay = parseInt(this._view.getInputValue(delayInput), 10);
      const calcNextGeneration = this._model.calculateNextGeneration.bind(this._model);
      this._timerId = setInterval(calcNextGeneration, delay);
      this._gameIsRunning = true;
      this._view.replaceStartButton();
    }
  }

  stopGame() {
    clearInterval(this._timerId);
    this._gameIsRunning = false;
    this._view.replaceStopButton();
  }

  setListeners() {
    this._setGridListeners();
    this._setButtonsListeners();
    this._setInputListeners();
  }

  _setGridListeners() {
    const self = this;
    const $grid = $('.js-game__grid');

    const updateCell = function updateCellInModel(event) {
      const cellIndex = self._view.getCellIndex(event.target);
      const cellRow = Math.floor(cellIndex / self._model.cellsX);
      const cellCol = cellIndex % self._model.cellsX;
      self._model.updateCell(cellRow, cellCol);
    };

    const updateCellAndListenMouseover = function updateCellAndSetMouseoverListener(event) {
      updateCell(event);
      $grid.bind('mouseover', updateCell);
      return false;
    };

    const unbindMouseover = function unbindMouseoverUpdateCellListener() {
      $grid.unbind('mouseover');
    };

    $grid
      .mousedown(updateCellAndListenMouseover)
      .mouseup(unbindMouseover)
      .mouseleave(unbindMouseover);
  }

  _setButtonsListeners() {
    const self = this;
    const $startStopButton = $('.js-game__start-stop');
    const $oneStepButton = $('.js-game__one-step');
    const $clearButton = $('.js-game__clear');

    const startOrStopGame = function startOrStopGameRunning() {
      if (!self._gameIsRunning) {
        self.startGame();
      } else {
        self.stopGame();
      }
    };
    $startStopButton.click(startOrStopGame);

    const clearGrid = function createAllZeroGridMatrix() {
      self._model.createGridMatrix(self._model.cellsX, self._model.cellsY);
    };
    $clearButton.click(clearGrid);

    const calcNextGeneration = self._model.calculateNextGeneration.bind(self._model);
    $oneStepButton.click(calcNextGeneration);
  }

  _setInputListeners() {
    const self = this;

    const validateInput = function addOrRemoveInvalidInputModificator(event) {
      const value = self._view.getInputValue(event.target);
      if ($.isNumeric(value) && (parseInt(value, 10) > 0)) {
        self._view.removeInvalidModificator(event.target);
      } else {
        self._view.addInvalidModificator(event.target);
      }
    };

    const valueHasBeenChanged = function checkIfInputValueHasBeenChanged(newValue, oldValue) {
      return (newValue !== oldValue);
    };

    const setDelayListeners = function setListenersRelatedToDelayInput() {
      const $delayInput = $('.js-game__delay-input');

      let currentDelay;
      const saveDelay = function saveCurrentDelayValueIfValid(event) {
        if (self._view.inputValueIsValid(event.target)) {
          currentDelay = parseInt(self._view.getInputValue(event.target), 10);
        }
      };
      $delayInput.focus(saveDelay);

      $delayInput.blur(validateInput);

      const changeDelay = function changeGridNextGenerationCalculationDelay(event) {
        if (self._view.inputValueIsValid(event.target)) {
          const newDelay = parseInt(self._view.getInputValue(event.target), 10);
          if (self._gameIsRunning && valueHasBeenChanged(newDelay, currentDelay)) {
            clearInterval(self._timerId);
            const calcNextGeneration = self._model.calculateNextGeneration.bind(self._model);
            self._timerId = setInterval(calcNextGeneration, newDelay);
          }
        }
      };
      $delayInput.blur(changeDelay);
    };

    const setSizeListeners = function setListenersRelatedToSizeChanging() {
      let currentWidth;
      let currentHeight;
      const $width = $('.js-game__width-input');
      const widthInput = $width[0];
      const $height = $('.js-game__height-input');
      const heightInput = $height[0];
      const $widthAndHeight = $('.js-game__width-input, .js-game__height-input');

      const saveGridSize = function saveCurrentWidthAndHeightValue() {
        if (self._view.inputValueIsValid(widthInput)) {
          currentWidth = parseInt(self._view.getInputValue(widthInput), 10);
        }
        if (self._view.inputValueIsValid(heightInput)) {
          currentHeight = parseInt(self._view.getInputValue(heightInput), 10);
        }
      };
      $widthAndHeight.focus(saveGridSize);

      $widthAndHeight.blur(validateInput);

      const sizeInputsAreValid = function checkIfSizeInputsAreValid() {
        const widthIsValid = self._view.inputValueIsValid(widthInput);
        const heightIsValid = self._view.inputValueIsValid(heightInput);
        return widthIsValid && heightIsValid;
      };

      const changeGridWidth = function createNewGridMatrixWidthUpdatedWidth(event) {
        if (sizeInputsAreValid()) {
          const newWidth = parseInt(self._view.getInputValue(event.target), 10);
          if (valueHasBeenChanged(newWidth, currentWidth)) {
            self._model.createGridMatrix(newWidth, currentHeight);
          }
        }
      };
      $width.blur(changeGridWidth);

      const changeGridHeight = function createNewGridMatrixWidthUpdatedHeight(event) {
        if (sizeInputsAreValid()) {
          const newHeight = parseInt(self._view.getInputValue(event.target), 10);
          if (valueHasBeenChanged(newHeight, currentHeight)) {
            self._model.createGridMatrix(currentWidth, newHeight);
          }
        }
      };
      $height.blur(changeGridHeight);
    };

    setDelayListeners();
    setSizeListeners();
  }
}

export default Controller;
