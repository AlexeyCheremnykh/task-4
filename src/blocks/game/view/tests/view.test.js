/* global describe, expect, test, jest */

import View from '../view';
import Model from '../../model/model';
import ObservedEvent from '../../observed-event/observed-event';

const model = new Model();
const view = new View(model);

model.createGridMatrix(5, 5);
const grid = document.createElement('div');
grid.className = 'game__grid js-game__grid';
document.body.appendChild(grid);
view.createGrid();
const cells = grid.querySelectorAll('.js-game__grid-cell');

describe('View tests', () => {
  test('Class instance has been created', () => {
    expect(view._model).not.toBeUndefined();
  });

  test('Model is observed', () => {
    const spy = jest.spyOn(ObservedEvent.prototype, 'attach');
    view.observeModel();
    expect(spy).toHaveBeenCalled();
  });

  test('Grid has been created', () => {
    expect(cells.length).toBe(25);
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
      expect(cells[0].className === 'game__grid-cell js-game__grid-cell game__grid-cell_alive').toBe(true);
    });

    test('Set dead', () => {
      view.updateCell(0, 0);
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
