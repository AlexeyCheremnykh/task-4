import Grid from './grid/grid';
import Button from './button/button';
import PlayButton from './play-button/play-button';
import Input from './input/input';
import Message from './message/message';
import ObservedEvent from '../observed-event/observed-event';

class View {
  constructor() {
    this._grid = new Grid('.js-game__grid');
    this._playButton = new PlayButton('.js-game__play');
    this._oneStepButton = new Button('.js-game__one-step');
    this._newGameButton = new Button('.js-game__new-game');
    this._delayInput = new Input('.js-game__delay');
    this._widthInput = new Input('.js-game__width');
    this._heightInput = new Input('.js-game__height');
    this._gameOverMessage = new Message('.js-game__game-over');

    this.updateCellEvent = new ObservedEvent();
    this.changeGameStatusEvent = new ObservedEvent();
    this.skipGenerationEvent = new ObservedEvent();
    this.newGameEvent = new ObservedEvent();
    this.changeWidthEvent = new ObservedEvent();
    this.changeHeightEvent = new ObservedEvent();
    this.changeDelayEvent = new ObservedEvent();

    this._observeComponents();
  }

  startGame() {
    this._playButton.enable();
    this._oneStepButton.enable();
    this._grid.enable();
    this._gameOverMessage.hide();
  }

  finishGame() {
    this._playButton.disable();
    this._oneStepButton.disable();
    this._grid.disable();
    this._gameOverMessage.show();
  }

  createGrid(numOfCols, numOfRows, cellSize) {
    this._grid.createGrid(numOfCols, numOfRows, cellSize);
  }

  updateCell(cellIndex) {
    this._grid.updateCell(cellIndex);
  }

  isInputValid(inputName) {
    if (inputName === 'delay') return this._delayInput.isValid();
    if (inputName === 'width') return this._widthInput.isValid();
    if (inputName === 'height') return this._heightInput.isValid();
  }

  setValidInputStatus(inputName) {
    if (inputName === 'delay') return this._delayInput.removeInvalidModificator();
    if (inputName === 'width') return this._widthInput.removeInvalidModificator();
    if (inputName === 'height') return this._heightInput.removeInvalidModificator();
  }

  setInvalidInputStatus(inputName) {
    if (inputName === 'delay') return this._delayInput.addInvalidModificator();
    if (inputName === 'width') return this._widthInput.addInvalidModificator();
    if (inputName === 'height') return this._heightInput.addInvalidModificator();
  }

  getInputValue(inputName) {
    if (inputName === 'delay') return this._delayInput.getValue();
    if (inputName === 'width') return this._widthInput.getValue();
    if (inputName === 'height') return this._heightInput.getValue();
  }

  setRunningStatus(runningStatus) {
    this._playButton.setRunningStatus(runningStatus);
  }

  notifyUpdateCell = (cellIndex) => {
    this.updateCellEvent.notify(cellIndex);
  };

  notifyChangeGameStatus = () => {
    this.changeGameStatusEvent.notify();
  };

  notifySkipGeneration = () => {
    this.skipGenerationEvent.notify();
  };

  notifyNewGame = () => {
    this.newGameEvent.notify();
  };

  notifyWidthChange = (width) => {
    this.changeWidthEvent.notify(width);
  };

  notifyHeightChange = (height) => {
    this.changeHeightEvent.notify(height);
  };

  notifyDelayChange = (delay) => {
    this.changeDelayEvent.notify(delay);
  };

  _observeComponents() {
    this._grid.cellUpdate.attach(this.notifyUpdateCell);
    this._playButton.click.attach(this.notifyChangeGameStatus);
    this._oneStepButton.click.attach(this.notifySkipGeneration);
    this._newGameButton.click.attach(this.notifyNewGame);
    this._widthInput.blur.attach(this.notifyWidthChange);
    this._heightInput.blur.attach(this.notifyHeightChange);
    this._delayInput.blur.attach(this.notifyDelayChange);
  }
}

export default View;
