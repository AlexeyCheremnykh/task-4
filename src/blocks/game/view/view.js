/* eslint no-param-reassign: 0 */
class View {
  createGrid(cellsX, cellsY) {
    const cellSize = 12;
    const grid = document.querySelector('.js-game__grid');
    grid.style.width = `${cellsX * cellSize}px`;
    grid.innerHTML = '';
    for (let i = 0; i < cellsY * cellsX; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'game__grid-cell js-game__grid-cell';
      grid.appendChild(cell);
    }
  }

  getCellIndex(cell) {
    return $(cell).index();
  }

  updateCell(cell) {
    if (cell.className === 'game__grid-cell js-game__grid-cell') {
      cell.className += ' game__grid-cell_alive';
    } else {
      cell.className = 'game__grid-cell js-game__grid-cell';
    }
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
}

export default View;
