import Grid from './grid/grid';
import Button from './button/button';
import ChangeableButton from './changeable-button/changeable-button';
import Input from './input/input';

class View {
  constructor() {
    this.grid = new Grid('.js-game__grid');
    this.startStop = new ChangeableButton('.js-game__start-stop');
    this.oneStep = new Button('.js-game__one-step');
    this.clear = new Button('.js-game__clear');
    this.delay = new Input('.js-game__delay');
    this.width = new Input('.js-game__width');
    this.height = new Input('.js-game__height');
  }
}

export default View;
