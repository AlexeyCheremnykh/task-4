class View {
  createGrid(cellsX, cellsY) {
    const cellSize = 12;
    const grid = document.querySelector('.js-game__grid');
    grid.style.width = `${cellsX * cellSize}px`;
    grid.innerHTML = '';
    for (let i = 0; i < cellsY; i += 1) {
      for (let j = 0; j < cellsX; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'game__grid-cell js-game__grid-cell';
        grid.appendChild(cell);
      }
    }
  }

  getCellIndex(cellElem) {
    return $(cellElem).index();
  }

  updateCell(cellElem) {
    if (cellElem.className === 'game__grid-cell js-game__grid-cell') {
      cellElem.className += ' game__grid-cell_alive';
    } else {
      cellElem.className = 'game__grid-cell js-game__grid-cell';
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
