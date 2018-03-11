import Grid from './grid';

const $testGrid = $('<div class="test-grid"></div>');
const $body = $('body');
$body.append($testGrid);

describe('Grid class tests', () => {
  const grid = new Grid('.test-grid');
  const mockHandler = jest.fn();
  grid.cellUpdate.attach(mockHandler);

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
