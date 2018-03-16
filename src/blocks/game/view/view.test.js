import View from './view';

const view = new View();

describe('View tests', () => {
  test('View instance has been created correctly', () => {
    expect(view.grid).not.toBeUndefined();
    expect(view.playButton).not.toBeUndefined();
    expect(view.oneStepButton).not.toBeUndefined();
    expect(view.newGameButton).not.toBeUndefined();
    expect(view.delayInput).not.toBeUndefined();
    expect(view.widthInput).not.toBeUndefined();
    expect(view.heightInput).not.toBeUndefined();
  });
});
