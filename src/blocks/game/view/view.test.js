import View from './view';

const view = new View();

describe('View tests', () => {
  test('View instance has been created correctly', () => {
    expect(view._grid).not.toBeUndefined();
    expect(view._playButton).not.toBeUndefined();
    expect(view._oneStepButton).not.toBeUndefined();
    expect(view._newGameButton).not.toBeUndefined();
    expect(view._delayInput).not.toBeUndefined();
    expect(view._widthInput).not.toBeUndefined();
    expect(view._heightInput).not.toBeUndefined();
    expect(view._gameOverMessage).not.toBeUndefined();

    expect(view.updateCellEvent).not.toBeUndefined();
    expect(view.changeGameStatusEvent).not.toBeUndefined();
    expect(view.skipGenerationEvent).not.toBeUndefined();
    expect(view.newGameEvent).not.toBeUndefined();
    expect(view.changeWidthEvent).not.toBeUndefined();
    expect(view.changeHeightEvent).not.toBeUndefined();
    expect(view.changeDelayEvent).not.toBeUndefined();
  });

  const playButtonEnableSpy = jest.spyOn(view._playButton, 'enable');
  const oneStepButtonEnableSpy = jest.spyOn(view._oneStepButton, 'enable');
  const gridEnableSpy = jest.spyOn(view._grid, 'enable');
  const gameOverHideSpy = jest.spyOn(view._gameOverMessage, 'hide');

  test('Game has been started', () => {
    view.startGame();
    expect(playButtonEnableSpy).toHaveBeenCalled();
    expect(oneStepButtonEnableSpy).toHaveBeenCalled();
    expect(gridEnableSpy).toHaveBeenCalled();
    expect(gameOverHideSpy).toHaveBeenCalled();
  });

  const playButtonDisableSpy = jest.spyOn(view._playButton, 'disable');
  const oneStepButtonDisableSpy = jest.spyOn(view._oneStepButton, 'disable');
  const gridDisableSpy = jest.spyOn(view._grid, 'disable');
  const gameOverShowSpy = jest.spyOn(view._gameOverMessage, 'show');

  test('Game has been finished', () => {
    view.finishGame();
    expect(playButtonDisableSpy).toHaveBeenCalled();
    expect(oneStepButtonDisableSpy).toHaveBeenCalled();
    expect(gridDisableSpy).toHaveBeenCalled();
    expect(gameOverShowSpy).toHaveBeenCalled();
  });

  const delayInputIsValidSpy = jest.spyOn(view._delayInput, 'isValid');
  const widthInputIsValidSpy = jest.spyOn(view._widthInput, 'isValid');
  const heightInputIsValidSpy = jest.spyOn(view._heightInput, 'isValid');

  test('Valid input checking works correctly', () => {
    view.isInputValid('delay');
    expect(delayInputIsValidSpy).toHaveBeenCalled();

    view.isInputValid('width');
    expect(widthInputIsValidSpy).toHaveBeenCalled();

    view.isInputValid('height');
    expect(heightInputIsValidSpy).toHaveBeenCalled();

    expect(view.isInputValid('asdasd')).toBeUndefined();
  });

  const delayInputSetInvalidSpy = jest.spyOn(view._delayInput, 'addInvalidModificator');
  const widthInputSetInvalidSpy = jest.spyOn(view._widthInput, 'addInvalidModificator');
  const heightInputSetInvalidSpy = jest.spyOn(view._heightInput, 'addInvalidModificator');

  test('Setting invalid input status works correctly', () => {
    view.setInvalidInputStatus('delay');
    expect(delayInputSetInvalidSpy).toHaveBeenCalled();

    view.setInvalidInputStatus('width');
    expect(widthInputSetInvalidSpy).toHaveBeenCalled();

    view.setInvalidInputStatus('height');
    expect(heightInputSetInvalidSpy).toHaveBeenCalled();
  });

  const delayInputSetValidSpy = jest.spyOn(view._delayInput, 'removeInvalidModificator');
  const widthInputSetValidSpy = jest.spyOn(view._widthInput, 'removeInvalidModificator');
  const heightInputSetValidSpy = jest.spyOn(view._heightInput, 'removeInvalidModificator');

  test('Setting valid input status works correctly', () => {
    view.setValidInputStatus('delay');
    expect(delayInputSetValidSpy).toHaveBeenCalled();

    view.setValidInputStatus('width');
    expect(widthInputSetValidSpy).toHaveBeenCalled();

    view.setValidInputStatus('height');
    expect(heightInputSetValidSpy).toHaveBeenCalled();
  });

  const delayInputGetValueSpy = jest.spyOn(view._delayInput, 'getValue');
  const widthInputGetValueSpy = jest.spyOn(view._widthInput, 'getValue');
  const heightInputGetValueSpy = jest.spyOn(view._heightInput, 'getValue');

  test('Getting input value works correctly', () => {
    view.getInputValue('delay');
    expect(delayInputGetValueSpy).toHaveBeenCalled();

    view.getInputValue('width');
    expect(widthInputGetValueSpy).toHaveBeenCalled();

    view.getInputValue('height');
    expect(heightInputGetValueSpy).toHaveBeenCalled();

    expect(view.isInputValid('asdasd')).toBeUndefined();
  });
});
