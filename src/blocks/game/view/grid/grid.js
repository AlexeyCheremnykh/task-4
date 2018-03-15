import ObservedEvent from '../../observed-event/observed-event';

class Grid {
  constructor(selector) {
    this.cellUpdate = new ObservedEvent();
    this._$grid = $(selector);
    this._setListeners();
  }

  createGrid(cellsX, cellsY, cellSize) {
    const inputIsInvalid = () => {
      if (
        !Number.isInteger(cellsX) ||
        !Number.isInteger(cellsY) ||
        !$.isNumeric(cellSize) ||
        cellsX <= 0 ||
        cellsY <= 0 ||
        cellSize <= 0
      ) return true;
      return false;
    };

    if (inputIsInvalid()) return;
    this._$grid.width(cellsX * cellSize);
    this._$grid.html('');
    [...Array(cellsY * cellsX)].forEach(() => {
      const cell = `<div class='game__grid-cell js-game__grid-cell' style='width: ${cellSize}px; height: ${cellSize}px;'></div>`;
      this._$grid.append(cell);
    });
  }

  updateCell(cellIndex) {
    if (!Number.isInteger(cellIndex) || cellIndex < 0) return;
    const $cell = $($('.js-game__grid-cell')[cellIndex]);
    const aliveClass = 'game__grid-cell_alive';
    if ($cell.hasClass(aliveClass)) {
      $cell.removeClass(aliveClass);
    } else {
      $cell.addClass(aliveClass);
    }
  }

  _setListeners() {
    const cellUpdateNotify = (event) => {
      const cellIndex = $(event.target).index();
      this.cellUpdate.notify(cellIndex);
      return false;
    };

    this._$grid
      .mousedown(cellUpdateNotify)
      .mousedown(() => this._$grid.bind('mouseover', cellUpdateNotify))
      .mouseup(() => this._$grid.unbind('mouseover'))
      .mouseleave(() => this._$grid.unbind('mouseover'));
  }
}

export default Grid;
