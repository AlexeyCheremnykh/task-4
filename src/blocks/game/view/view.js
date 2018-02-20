class View {
  constructor(model) {
    this._model = model;
  }

  observeModel() {
    this._model.createGridMatrixEvent.attach(this.createGrid.bind(this));
    this._model.updateCellEvent.attach(this.updateCell.bind(this));
  }

  createGrid() {
    const cellSize = 12;
    const grid = document.querySelector('.js-game__grid');
    grid.style.width = `${this._model.cellsX * cellSize}px`;
    grid.innerHTML = '';
    for (let i = 0; i < this._model.cellsY; i += 1) {
      for (let j = 0; j < this._model.cellsX; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'game__grid-cell js-game__grid-cell';
        // Дата-аттрибуты содержат индексы для матрицы в модели
        cell.dataset.i = i;
        cell.dataset.j = j;
        grid.appendChild(cell);
      }
    }
  }

  getCellIndexes(elem) {
    return {
      i: parseInt(elem.dataset.i, 10),
      j: parseInt(elem.dataset.j, 10),
    };
  }

  updateCell(i, j) {
    const updatedCell = document.querySelector(`.js-game__grid-cell[data-i='${i}'][data-j='${j}']`);
    if (updatedCell.className === 'game__grid-cell js-game__grid-cell') {
      updatedCell.className += ' game__grid-cell_alive';
    } else {
      updatedCell.className = 'game__grid-cell js-game__grid-cell';
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
}

export default View;
