import Grid from './grid/grid';
import Button from './button/button';
import PlayButton from './play-button/play-button';
import Input from './input/input';
import Message from './message/message';

class View {
  constructor() {
    this.grid = new Grid('.js-game__grid');
    this.playButton = new PlayButton('.js-game__play');
    this.oneStepButton = new Button('.js-game__one-step');
    this.newGameButton = new Button('.js-game__new-game');
    this.delayInput = new Input('.js-game__delay');
    this.widthInput = new Input('.js-game__width');
    this.heightInput = new Input('.js-game__height');
    this.gameOverMessage = new Message('.js-game__game-over');
  }
}

export default View;
