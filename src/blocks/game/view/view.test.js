/* global describe, expect, test */

import View from './view';

const view = new View();

const grid = document.createElement('div');
grid.className = 'game__grid js-game__grid';
document.body.appendChild(grid);
view.createGrid(5, 5);
const cells = grid.querySelectorAll('.js-game__grid-cell');

describe('View tests', () => {
  test('Grid has been created', () => {
    expect(cells.length).toBe(25);
  });

  describe('Update cell', () => {
    test('Set alive', () => {
      view.updateCell(cells[0]);
      expect(cells[0].className === 'game__grid-cell js-game__grid-cell game__grid-cell_alive').toBe(true);
    });

    test('Set dead', () => {
      view.updateCell(cells[0]);
      expect(cells[0].className === 'game__grid-cell js-game__grid-cell').toBe(true);
    });
  });

  describe('Replace buttons', () => {
    const startStopButton = document.createElement('div');
    startStopButton.className = 'game__start-stop js-game__start-stop';
    document.body.appendChild(startStopButton);

    test('Replace start button', () => {
      view.replaceStartButton();
      expect(startStopButton.innerHTML).toBe('Stop');
    });

    test('Replace stop button', () => {
      view.replaceStopButton();
      expect(startStopButton.innerHTML).toBe('Start');
    });
  });
});
