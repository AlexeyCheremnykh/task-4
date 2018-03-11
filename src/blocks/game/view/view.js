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
}

export default View;
