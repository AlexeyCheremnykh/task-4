import ObservedEvent from '../../observed-event/observed-event';

class Button {
  constructor(selector) {
    this.click = new ObservedEvent();
    this._$button = $(selector);
    this._setListeners();
  }

  _setListeners() {
    this._$button.click(() => this.click.notify());
  }
}

export default Button;
