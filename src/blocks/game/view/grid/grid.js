import ObservedEvent from '../../observed-event/observed-event';

class Grid {
  constructor(selector) {
    this.cellUpdate = new ObservedEvent();
    this._$grid = $(selector);
    this._setListeners();
  }

  createGrid(cellsX, cellsY, cellSize) {
    if (!(Number.isInteger(cellsX) && Number.isInteger(cellsY) && $.isNumeric(cellSize))) return;
    if (cellsX < 0 || cellsY < 0 || cellSize < 0) return;
    this._$grid.width(cellsX * cellSize);
    this._$grid.html('');
    [...Array(cellsY * cellsX)].forEach(() => {
      const cell = '<div class="game__grid-cell js-game__grid-cell"></div>';
      this._$grid.append(cell);
    });
  }

  updateCell(cellIndex) {
    if (!Number.isInteger(cellIndex)) return;
    if (cellIndex < 0) return;
    const $cell = $($('.js-game__grid-cell')[cellIndex]);
    const aliveClass = 'game__grid-cell_alive';
    if ($cell.hasClass(aliveClass)) {
      $cell.removeClass(aliveClass);
    } else {
      $cell.addClass(aliveClass);
    }
  }

  _setListeners() {
    const self = this;
    const cellUpdateNotify = function notifyObserversOnCellUpdate(event) {
      const cellIndex = $(event.target).index();
      self.cellUpdate.notify(cellIndex);
    };

    const notifyUpdateAndBindMouseover = function notifyUpdateAndSetMouseoverListener(event) {
      cellUpdateNotify(event);
      self._$grid.bind('mouseover', cellUpdateNotify);
      return false;
    };

    const unbindMouseover = function unbindMouseoverUpdateCellListener() {
      self._$grid.unbind('mouseover');
    };

    this._$grid
      .mousedown(notifyUpdateAndBindMouseover)
      .mouseup(unbindMouseover)
      .mouseleave(unbindMouseover);
  }
}

export default Grid;
