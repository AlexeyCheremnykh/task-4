import ObservedEvent from '../../observed-event/observed-event';

class Button {
  constructor(selector) {
    this.click = new ObservedEvent();
    this._$button = $(selector);
    this._setListeners();
  }

  _setListeners() {
    const self = this;
    const notifyClick = function notifyObserversOnButtonClick() {
      self.click.notify();
    };
    this._$button.click(notifyClick);
  }
}

export default Button;
