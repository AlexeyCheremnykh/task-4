/* eslint no-param-reassign: 0 */
import ObservedEvent from '../observed-event/observed-event';

class View {
  constructor() {
    this.startStopButtonClick = new ObservedEvent();
    this.clearButtonClick = new ObservedEvent();
    this.oneStepButtonClick = new ObservedEvent();
    this.updateCellEvent = new ObservedEvent();
    this._setListeners();
  }

  createGrid(cellsX, cellsY) {
    const cellSize = 12;
    const grid = document.querySelector('.js-game__grid');
    grid.style.width = `${cellsX * cellSize}px`;
    grid.innerHTML = '';
    [...Array(cellsY * cellsX)].forEach(() => {
      const cell = document.createElement('div');
      cell.className = 'game__grid-cell js-game__grid-cell';
      grid.appendChild(cell);
    });
  }

  clearGrid() {
    const aliveCells = $('.js-game__grid-cell.game__grid-cell_alive');
    aliveCells.each((index, cell) => {
      $(cell).removeClass('game__grid-cell_alive');
    });
  }

  updateCell(cellIndex) {
    const cell = $('.js-game__grid-cell')[cellIndex];
    if (cell.className === 'game__grid-cell js-game__grid-cell') {
      cell.className += ' game__grid-cell_alive';
    } else {
      cell.className = 'game__grid-cell js-game__grid-cell';
    }
  }

  updateGrid(cellIndexes) {
    cellIndexes.forEach((cellIndex) => {
      this.updateCell(cellIndex);
    });
  }

  replaceStartButton() {
    const btnStopText = 'Stop';
    document.querySelector('.js-game__start-stop').innerHTML = btnStopText;
  }

  replaceStopButton() {
    const btnStartText = 'Start';
    document.querySelector('.js-game__start-stop').innerHTML = btnStartText;
  }

  addInvalidModificator(input) {
    $(input).addClass('game__input_invalid');
  }

  removeInvalidModificator(input) {
    $(input).removeClass('game__input_invalid');
  }

  inputValueIsValid(input) {
    return !$(input).hasClass('game__input_invalid');
  }

  getInputValue(input) {
    return $(input).val();
  }

  _setListeners() {
    this._setButtonsListeners();
    this._setGridListeners();
  }

  _setButtonsListeners() {
    const self = this;

    const startStopNotify = function notifyObserversOnStartStopButtonClick() {
      self.startStopButtonClick.notify();
    };
    const $startStopButton = $('.js-game__start-stop');
    $startStopButton.click(startStopNotify);

    const oneStepNotify = function notifyObserversOnOneStepButtonClick() {
      self.oneStepButtonClick.notify();
    };
    const $oneStepButton = $('.js-game__one-step');
    $oneStepButton.click(oneStepNotify);

    const clearAndNotify = function clearGridAndNotifyObservers() {
      self.clearGrid();
      self.clearButtonClick.notify();
    };
    const $clearButton = $('.js-game__clear');
    $clearButton.click(clearAndNotify);
  }

  _setGridListeners() {
    const self = this;
    const $grid = $('.js-game__grid');

    const updateAndNotify = function updateCellAndNotifyObserversOnCellUpdate(event) {
      const cellIndex = $(event.target).index();
      self.updateCell(cellIndex);
      self.updateCellEvent.notify(cellIndex);
    };

    const updateCellAndListenMouseover = function updateCellAndSetMouseoverListener(event) {
      updateAndNotify(event);
      $grid.bind('mouseover', updateAndNotify);
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

  _setInputListeners() {

  }
}

export default View;
