import Grid from './grid/grid';
import Button from './button/button';
import PlayButton from './play-button/play-button';
import Input from './input/input';
import Message from './message/message';
import ObservedEvent from '../observed-event/observed-event';

class View {
  constructor() {
    /*this._grid = new Grid('.js-game__grid');
    this._playButton = new PlayButton('.js-game__play');
    this._oneStepButton = new Button('.js-game__one-step');
    this._newGameButton = new Button('.js-game__new-game');
    this._delayInput = new Input('.js-game__delay');
    this._widthInput = new Input('.js-game__width');
    this._heightInput = new Input('.js-game__height');
    this._gameOverMessage = new Message('.js-game__game-over');*/

    this.grid = new Grid('.js-game__grid');
    this.playButton = new PlayButton('.js-game__play');
    this.oneStepButton = new Button('.js-game__one-step');
    this.newGameButton = new Button('.js-game__new-game');
    this.delayInput = new Input('.js-game__delay');
    this.widthInput = new Input('.js-game__width');
    this.heightInput = new Input('.js-game__height');
    this.gameOverMessage = new Message('.js-game__game-over');


    this.updateCellEvent = new ObservedEvent();
    this.changeGameStatusEvent = new ObservedEvent();
    this.skipGenerationEvent = new ObservedEvent();
    this.newGameEvent = new ObservedEvent();
    this.changeWidthEvent = new ObservedEvent();
    this.changeHeightEvent = new ObservedEvent();
    this.changeDelayEvent = new ObservedEvent();

    this._observeComponents();
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
    this.grid.cellUpdate.attach(this.notifyUpdateCell);
    this.playButton.click.attach(this.notifyChangeGameStatus);
    this.oneStepButton.click.attach(this.notifySkipGeneration);
    this.newGameButton.click.attach(this.notifyNewGame);
    this.widthInput.blur.attach(this.notifyWidthChange);
    this.heightInput.blur.attach(this.notifyHeightChange);
    this.delayInput.blur.attach(this.notifyDelayChange);
  }
}

export default View;
