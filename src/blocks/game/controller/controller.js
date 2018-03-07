class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;
  }

  observeModel() {
    this._model.createGridMatrixEvent.attach(this._view.createGrid.bind(this));
    this._model.updateCellEvent.attach(this.updateViewCell.bind(this));
  }

  updateViewCell(cellRow, cellCol) {
    const updatableCell = $('.js-game__grid-cell')[(cellRow * this._model.cellsX) + cellCol];
    this._view.updateCell(updatableCell);
  }

  setListeners() {
    const self = this;
    const $grid = $('.js-game__grid');
    const $startStopButton = $('.js-game__start-stop');
    const $oneStepButton = $('.js-game__one-step');
    const $clearButton = $('.js-game__clear');
    const $delayInput = $('.js-game__delay-input');
    let timerId;
    let gameIsRunning = false;

    const setGridListeners = function setListenersRelatedToGridUpdate() {
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
    };

    const setButtonsListeners = function setListenersRelatedToAllButtons() {
      const stopGame = function stopGameAndReplaceStopButton() {
        clearInterval(timerId);
        gameIsRunning = false;
        self._view.replaceStopButton();
      };
      self._model.endGameEvent.attach(stopGame);

      const startGame = function startGameAndReplaceStartButton() {
        const delay = parseInt($delayInput.val(), 10);
        if (delay > 0) {
          timerId = setInterval(self._model.calculateNextGeneration.bind(self._model), delay);
          gameIsRunning = true;
          self._view.replaceStartButton();
        }
      };

      const startOrStopGame = function startOrStopGameRunning(event) {
        const btnStartText = 'Start';
        if ($(event.target).text() === btnStartText) {
          startGame();
        } else {
          stopGame();
        }
      };

      $startStopButton.on('click', startOrStopGame);

      const clearGrid = function createAllZeroGridMatrix() {
        self._model.createGridMatrix(self._model.cellsX, self._model.cellsY);
      };

      $clearButton.on('click', clearGrid);
      $oneStepButton.on('click', self._model.calculateNextGeneration.bind(self._model));
    };

    const inputIsCorrect = function checkIfInputElementHasCorrectValue(element) {
      const inputIsNumeric = $.isNumeric($(element).val());
      const inputIsPositive = parseInt($(element).val(), 10) > 0;
      return inputIsNumeric && inputIsPositive;
    };

    const setDelayListeners = function setListenersRelatedToDelayField() {
      let currentDelay;

      const saveDelay = function saveCurrentDelayValue(event) {
        currentDelay = parseInt($(event.target).val(), 10);
      };

      $delayInput.on('focus', saveDelay);

      const delayHasBeenChanged = function checkIfDelayHasBeenChanged(newDelay) {
        return (newDelay !== currentDelay);
      };

      const changeDelay = function changeGridNextGenerationCalculationDelay(event) {
        if (inputIsCorrect(event.target)) {
          const newDelay = parseInt($(event.target).val(), 10);
          $(event.target).removeClass('game__input_invalid');
          if (gameIsRunning && delayHasBeenChanged(newDelay)) {
            clearInterval(timerId);
            timerId = setInterval(self._model.calculateNextGeneration.bind(self._model), newDelay);
          }
        } else {
          $(event.target).addClass('game__input_invalid');
        }
      };

      $delayInput.on('blur', changeDelay);
    };

    const setGridSizeListeners = function setListenersRelatedToGridSizeChanging() {
      let currentWidth;
      let currentHeight;
      const $width = $('.js-game__width-input');
      const $height = $('.js-game__height-input');
      const $widthAndHeight = $('.js-game__width-input, .js-game__height-input');

      const saveGridSize = function saveCurrentWidthAndHeightValue() {
        currentWidth = parseInt($width.val(), 10);
        currentHeight = parseInt($height.val(), 10);
      };

      $widthAndHeight.on('focus', saveGridSize);

      const widthHasBeenChanged = function checkIfWidthHasBeenChanged(newWidth) {
        return (newWidth !== currentWidth);
      };

      const heightHasBeenChanged = function checkIfHeightHasBeenChanged(newHeight) {
        return (newHeight !== currentHeight);
      };

      const changeGridWidth = function createNewGridMatrixWidthUpdatedWidth(event) {
        if (inputIsCorrect(event.target)) {
          const newWidth = parseInt($(event.target).val(), 10);
          $(event.target).removeClass('game__input_invalid');
          if (currentHeight > 0 && widthHasBeenChanged(newWidth)) {
            self._model.createGridMatrix(newWidth, currentHeight);
          }
        } else {
          $(event.target).addClass('game__input_invalid');
        }
      };

      $width.blur(changeGridWidth);

      const changeGridHeight = function createNewGridMatrixWidthUpdatedHeight(event) {
        if (inputIsCorrect(event.target)) {
          const newHeight = parseInt($(event.target).val(), 10);
          $(event.target).removeClass('game__input_invalid');
          if (currentWidth > 0 && heightHasBeenChanged(newHeight)) {
            self._model.createGridMatrix(currentWidth, newHeight);
          }
        } else {
          $(event.target).addClass('game__input_invalid');
        }
      };

      $height.blur(changeGridHeight);
    };

    setGridListeners();
    setButtonsListeners();
    setDelayListeners();
    setGridSizeListeners();
  }
}

export default Controller;
