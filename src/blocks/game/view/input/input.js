import ObservedEvent from '../../observed-event/observed-event';

class Input {
  constructor(selector) {
    this.blur = new ObservedEvent();
    this._$input = $(selector);
    this._setListeners();
  }

  getValue() {
    return this._$input.val();
  }

  isValid() {
    return !this._$input.hasClass('game__input_invalid');
  }

  addInvalidModificator() {
    this._$input.addClass('game__input_invalid');
  }

  removeInvalidModificator() {
    this._$input.removeClass('game__input_invalid');
  }

  _setListeners() {
    const self = this;
    const blurNotify = function notifyObserversOnBlurEvent() {
      self.blur.notify(self._$input.val());
    };
    this._$input.blur(blurNotify);
  }
}

export default Input;
