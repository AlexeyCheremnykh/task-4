import Button from '../button/button';

class ChangeableButton extends Button {
  setText(buttonText) {
    this._$button.text(buttonText);
  }
}

export default ChangeableButton;
