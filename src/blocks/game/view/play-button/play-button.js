import Button from '../button/button';

class PlayButton extends Button {
  setRunningStatus(isGameRunning) {
    if (isGameRunning) {
      this._$button.text('Stop');
    } else {
      this._$button.text('Start');
    }
  }
}

export default PlayButton;
