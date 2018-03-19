import Model from './model';

const model = new Model();

describe('Model tests', () => {
  const numOfCols = 3;
  const numOfRows = 3;

  test('Class instance has been created', () => {
    expect(model.newGameEvent).not.toBeUndefined();
    expect(model.updateCellEvent).not.toBeUndefined();
    expect(model.endGameEvent).not.toBeUndefined();
  });

  test('Grid matrix has been created', () => {
    model.createGridMatrix(numOfCols, numOfRows);
    expect(model.numOfRows === numOfRows).toBe(true);
    expect(model.numOfCols === numOfCols).toBe(true);
  });

  describe('Update matrix cell', () => {
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

  test('Correct next generation calculation', () => {
    const firstMatrix = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const secondMatrix = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    model._gridMatrix = firstMatrix;
    model.calculateNextGeneration();
    expect(model._gridMatrix).toEqual(secondMatrix);
    model.calculateNextGeneration();
    expect(model._gridMatrix).toEqual(firstMatrix);
  });
});
