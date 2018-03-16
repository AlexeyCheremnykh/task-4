import Grid from './grid/grid';
import Button from './button/button';
import PlayButton from './play-button/play-button';
import Input from './input/input';
import Message from './message/message';

class View {
  constructor() {
    this.grid = new Grid('.js-game__grid');
    this.playButton = new PlayButton('.js-game__start-stop');
    this.oneStep = new Button('.js-game__one-step');
    this.clear = new Button('.js-game__clear');
    this.delay = new Input('.js-game__delay');
    this.width = new Input('.js-game__width');
    this.height = new Input('.js-game__height');
    this.gameOver = new Message('.js-game__game-over');
  }
}

export default View;
