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

  disable() {
    this._$button.prop('disabled', true);
  }

  enable() {
    this._$button.prop('disabled', false);
  }
}

export default Button;
