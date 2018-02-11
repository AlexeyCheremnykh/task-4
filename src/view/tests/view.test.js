/* global describe, expect, test */

import View from '../view';
import Model from '../../model/model';

const model = new Model();
const view = new View(model);

describe('View tests', () => {
  model.createGridMatrix(5, 5);
  const grid = document.createElement('div');
  grid.className = 'game__grid';
  document.body.appendChild(grid);
  view.createGrid();
  const cells = grid.querySelectorAll('.game__grid-cell');

  describe('Create grid', () => {
    test('Grid has been created', () => {
      expect(cells.length).toBe(25);
    });
  });

  describe('Get element indexes', () => {
    test('Correct i index', () => {
      expect(view.getCellIndexes(cells[5]).i).toBe(1);
    });

    test('Correct j index', () => {
      expect(view.getCellIndexes(cells[7]).j).toBe(2);
    });
  });

  describe('Update cell', () => {
    test('Set alive', () => {
      view.updateCell(0, 0);
      expect(cells[0].className === 'game__grid-cell game__grid-cell_alive').toBe(true);
    });

    test('Set dead', () => {
      view.updateCell(0, 0);
      expect(cells[0].className === 'game__grid-cell').toBe(true);
    });
  });

  describe('Replace buttons', () => {
    const startStopButton = document.createElement('div');
    startStopButton.className = 'game__start-stop';
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
