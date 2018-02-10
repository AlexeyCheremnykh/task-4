class View {
  constructor(model) {
    this._model = model;
    this._cellSize = 12;
  }

  observeModel() {
    this._model.createGridMatrixEvent.attach(this.createGrid.bind(this));
    this._model.updateCellEvent.attach(this.updateCell.bind(this));
  }

  createGrid() {
    const grid = document.querySelector('.game__grid');
    grid.style.width = `${this._model.cellsX * this._cellSize}px`;
    grid.innerHTML = '';
    for (let i = 0; i < this._model.cellsY; i += 1) {
      for (let j = 0; j < this._model.cellsX; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'game__grid-cell';
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
    const updatedCell = document.querySelector(`div[data-i='${i}'][data-j='${j}']`);
    if (updatedCell.className === 'game__grid-cell') {
      updatedCell.className = 'game__grid-cell game__grid-cell_alive';
    } else {
      updatedCell.className = 'game__grid-cell';
    }
  }

  replaceStartButton() {
    document.querySelector('.game__start-stop').innerHTML = 'Stop';
  }

  replaceStopButton() {
    document.querySelector('.game__start-stop').innerHTML = 'Start';
  }
}

module.exports = View;
