import ObservedEvent from '../../observed-event/observed-event';

class Message {
  constructor(selector) {
    this._$message = $(selector);
  }

  show() {
    this._$message.fadeIn(500);
  }

  hide() {
    this._$message.hide();
  }
}

export default Message;
