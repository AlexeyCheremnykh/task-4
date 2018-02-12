class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;
  }

  setListeners() {
    const self = this;
    const $grid = $('.game__grid');
    const $startStopButton = $('.game__start-stop');
    const $oneStepButton = $('.game__one-step');
    const $clearButton = $('.game__clear');
    const $delayInput = $('.game__delay-input');
    let timerId;
    let gameIsRunning = false;

    const setGridListeners = function setListenersRelatedToGridUpdate() {
      const updateCell = function updateCellInModel(event) {
        const indexes = self._view.getCellIndexes(event.target);
        self._model.updateCell(indexes.i, indexes.j);
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
      const stopGame = function pauseGameAndReplaceStopButton() {
        clearInterval(timerId);
        gameIsRunning = false;
        self._view.replaceStopButton();
      };

      const startGame = function startGameAndReplaceStartButton() {
        const delay = parseInt($delayInput.val(), 10);
        if (delay > 0) {
          self._model.endGameEvent.attach(stopGame);
          timerId = setInterval(self._model.calculateNextGeneration.bind(self._model), delay);
          gameIsRunning = true;
          self._view.replaceStartButton();
        }
      };

      const startOrStopGame = function startOrStopGameRunning(event) {
        if ($(event.target).text() === 'Start') {
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
        const newDelay = parseInt($(event.target).val(), 10);
        if (newDelay >= 0) {
          $(event.target).removeClass('game__wrong-input');
          if (gameIsRunning && delayHasBeenChanged(newDelay)) {
            clearInterval(timerId);
            timerId = setInterval(self._model.calculateNextGeneration.bind(self._model), newDelay);
          }
        } else {
          $(event.target).addClass('game__wrong-input');
        }
      };

      $delayInput.on('blur', changeDelay);
    };

    const setGridSizeListeners = function setListenersRelatedToGridSizeChanging() {
      let currentWidth;
      let currentHeight;
      const $width = $('.game__width-input');
      const $height = $('.game__height-input');

      const saveGridSize = function saveCurrentWidthAndHeightValue() {
        currentWidth = parseInt($width.val(), 10);
        currentHeight = parseInt($height.val(), 10);
      };

      $('.game__width-input, .game__height-input').on('focus', saveGridSize);

      const widthHasBeenChanged = function checkIfWidthHasBeenChanged(newWidth) {
        return (newWidth !== currentWidth);
      };

      const heightHasBeenChanged = function checkIfHeightHasBeenChanged(newHeight) {
        return (newHeight !== currentHeight);
      };

      const changeGridWidth = function createNewGridMatrixWidthUpdatedWidth(event) {
        const newWidth = parseInt($(event.target).val(), 10);
        if (newWidth > 0) {
          $(event.target).removeClass('game__wrong-input');
          if (currentHeight > 0 && widthHasBeenChanged(newWidth)) {
            self._model.createGridMatrix(newWidth, currentHeight);
          }
        } else {
          $(event.target).addClass('game__wrong-input');
        }
      };

      $('.game__width-input').blur(changeGridWidth);

      const changeGridHeight = function createNewGridMatrixWidthUpdatedHeight(event) {
        const newHeight = parseInt($(event.target).val(), 10);
        if (newHeight > 0) {
          $(event.target).removeClass('game__wrong-input');
          if (currentWidth > 0 && heightHasBeenChanged(newHeight)) {
            self._model.createGridMatrix(currentWidth, newHeight);
          }
        } else {
          $(event.target).addClass('game__wrong-input');
        }
      };

      $('.game__height-input').blur(changeGridHeight);
    };

    setGridListeners();
    setButtonsListeners();
    setDelayListeners();
    setGridSizeListeners();
  }
}

export default Controller;
