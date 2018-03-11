import Grid from './grid';

const $testGrid = $('<div class="test-grid"></div>');
const $body = $('body');
$body.append($testGrid);

describe('Grid class tests', () => {
  const grid = new Grid('.test-grid');
  const mockHandler = jest.fn();
  grid.cellUpdate.attach(mockHandler);

  describe('Grid constructor tests', () => {
    test('Grid element is stored correctly', () => {
      expect(grid._$grid.is($testGrid)).toBe(true);
    });

    test('Listeners have been set', () => {
      grid._$grid.trigger('mousedown');
      expect(mockHandler).toHaveBeenCalledTimes(1);
      grid._$grid.trigger('mouseover');
      expect(mockHandler).toHaveBeenCalledTimes(2);

      grid._$grid.trigger('mouseup');
      grid._$grid.trigger('mouseover');
      expect(mockHandler).toHaveBeenCalledTimes(2);

      grid._$grid.trigger('mousedown');
      grid._$grid.trigger('mouseleave');
      grid._$grid.trigger('mouseover');
      expect(mockHandler).toHaveBeenCalledTimes(3);
    });
  });

  describe('Grid methods tests', () => {
    let cellsX = 5;
    let cellsY = 5;
    let cellSize = 12;
    let $gridCells;

    test('Grid has been created', () => {
      grid.createGrid(cellsX, cellsY, cellSize);
      $gridCells = grid._$grid.children('.js-game__grid-cell');
      expect($gridCells.length).toBe(25);

      cellsX = 6;
      cellsY = 12;
      grid.createGrid(cellsX, cellsY, cellSize);
      $gridCells = grid._$grid.children('.js-game__grid-cell');
      expect($gridCells.length).toBe(72);
    });

    test('Invalid grid creation values are handled correctly', () => {
      cellsX = -5;
      cellsY = 3;
      cellSize = -322;
      grid.createGrid(cellsX, cellsY, cellSize);
      $gridCells = grid._$grid.children('.js-game__grid-cell');
      expect($gridCells.length).toBe(72);

      cellsX = 'cellsX';
      cellsY = 22.2;
      cellSize = -15;
      grid.createGrid(cellsX, cellsY, cellSize);
      $gridCells = grid._$grid.children('.js-game__grid-cell');
      expect($gridCells.length).toBe(72);
    });

    test('Alive cell has been updated', () => {
      grid.updateCell(0);
      expect($($gridCells[0]).hasClass('game__grid-cell_alive')).toBe(true);
    });

    test('Dead cell has been updated', () => {
      grid.updateCell(0);
      expect($($gridCells[0]).hasClass('game__grid-cell_alive')).toBe(false);
    });

    test('Invalid cell index is handled correctly', () => {
      const aliveCellsBeforeUpdate = grid._$grid.children('game__grid-cell_alive').length;
      grid.updateCell(-777);
      let aliveCellsAfterUpdate = grid._$grid.children('game__grid-cell_alive').length;
      expect(aliveCellsBeforeUpdate).toBe(aliveCellsAfterUpdate);

      grid.updateCell('cell index');
      aliveCellsAfterUpdate = grid._$grid.children('game__grid-cell_alive').length;
      expect(aliveCellsBeforeUpdate).toBe(aliveCellsAfterUpdate);

      grid.updateCell(11.5);
      aliveCellsAfterUpdate = grid._$grid.children('game__grid-cell_alive').length;
      expect(aliveCellsBeforeUpdate).toBe(aliveCellsAfterUpdate);
    });
  });
});
