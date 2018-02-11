/* global describe, test, expect */

import Model from '../model';

const model = new Model();

describe('Model tests', () => {
  const cellsX = 3;
  const cellsY = 3;
  model.createGridMatrix(cellsX, cellsY);

  describe('Create grid matrix', () => {
    test('Grid matrix has been created', () => {
      expect(model.cellsY === cellsY).toBe(true);
      expect(model.cellsX === cellsX).toBe(true);
    });
  });

  describe('Change matrix element', () => {
    const i = 1;
    const j = 2;
    test('0 -> 1', () => {
      model.updateCell(i, j);
      expect(model._gridMatrix[i][j]).toEqual(1);
    });

    test('1 -> 0', () => {
      model.updateCell(i, j);
      expect(model._gridMatrix[i][j]).toEqual(0);
    });
  });

  describe('Game run', () => {
    test('Count alive neighbours', () => {
      model.createGridMatrix(3, 3);
      for (let i = 0; i < cellsX; i += 1) {
        for (let j = 0; j < cellsY; j += 1) {
          model.updateCell(i, j);
        }
      }
      expect(model.countAliveNeighbours(1, 1)).toBe(8);
      model.updateCell(0, 1);
      expect(model.countAliveNeighbours(0, 0)).toBe(2);
      expect(model.countAliveNeighbours(0, 1)).toBe(5);
      expect(model.countAliveNeighbours(1, 2)).toBe(4);
    });

    test('Calculate next generation', () => {
      model.calculateNextGeneration();
      expect(model.countAliveNeighbours(0, 0)).toBe(0);
      expect(model.countAliveNeighbours(0, 1)).toBe(2);
      expect(model.countAliveNeighbours(0, 2)).toBe(0);
    });
  });
});
