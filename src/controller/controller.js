class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
  }

  setListeners() {
    this.setGridListeners();
    this.setButtonsListeners();
    this.setGridSizeListeners();
  }

  setGridListeners() {
    const self = this;
    const $grid = $('.game__grid');

    const updateCell = function updateCellInModel(event) {
      const indexes = self.view.getCellIndexes(event.target);
      self.model.updateCell(indexes.i, indexes.j);
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

  setButtonsListeners() {
    const self = this;
    const $startStopButton = $('.game__start-stop');
    const $delayInput = $('.game__delay-input');
    const $clearButton = $('.game__clear');
    const $oneStepButton = $('.game__one-step');
    let timerId;
    let running = false;

    const stopGame = function pauseGameAndReplaceStopButton() {
      clearInterval(timerId);
      running = false;
      self.view.replaceStopButton();
    };

    const startGame = function startGameAndReplaceStartButton() {
      const delay = parseInt($delayInput.val(), 10);
      const calculateNextGeneration = self.model.calculateNextGeneration.bind(self.model);
      self.model.endGameEvent.attach(stopGame.bind(self));
      timerId = setInterval(calculateNextGeneration, delay);
      running = true;
      self.view.replaceStartButton();
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
      self.model.createGridMatrix(self.model.cellsX, self.model.cellsY);
    };

    $clearButton.on('click', clearGrid);

    $oneStepButton.on('click', this.model.calculateNextGeneration.bind(this.model));

    // Куда-то передвинуть надо будет
    let initialDelay;
    $delayInput.focus(function () {
        initialDelay = parseInt($(this).val());
    });

    $delayInput.blur(function() {
      let delay = parseInt($delayInput.val());
        if (delayIsCorrect(delay)) {
            $(this).removeClass('game__wrong-input');
            if (running) {
                if (delay != initialDelay) {
                    clearInterval(timerId);
                    let calculate = self.model.calculateNextGeneration.bind(self.model);
                    timerId = setInterval(calculate, delay);
                }
            }
        }
    });

    function delayIsCorrect(delay) {
        if (isNaN(delay) || delay < 0) {
          $delayInput.addClass('game__wrong-input');
            return false;
        }
        return true;
    }
  }

  setGridSizeListeners() {
      const self = this;
      let initialWidth, initialHeight;

      $('.game__width').focus(function () {
          let width = parseInt($(this).val());
          if (!isNaN(width) || width > 0) {
              initialWidth = width;
          }
      });

      $('.game__height').focus(function () {
          let height = parseInt($(this).val());
          if (!isNaN(height) || height > 0) {
              initialHeight = height;
          }
      });

      $('.game__width').blur(function() {
          let width = parseInt($('.game__width').val());
          let height = parseInt($('.game__height').val());
          if (isNaN(width) || width <= 0) {
              $(this).addClass('game__wrong-input');
          } else {
              $(this).removeClass('game__wrong-input');
              if (!(isNaN(height) || height <= 0)) {
                  if (initialWidth != width) {
                      self.model.createGridMatrix(width, height);
                  }
              }
          }
      });

      $('.game__height').blur(function() {
          let width = parseInt($('.game__width').val());
          let height = parseInt($('.game__height').val());
          if (isNaN(height) || height <= 0) {
              $(this).addClass('game__wrong-input');
          } else {
              $(this).removeClass('game__wrong-input');
              if (!(isNaN(width) || width <= 0)) {
                  if (initialHeight != height) {
                      self.model.createGridMatrix(width, height);
                  }
              }
          }
      });
  }
}

module.exports = Controller;