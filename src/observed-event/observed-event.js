class ObservedEvent {
  constructor() {
    this._handlers = [];
  }

  attach(handler) {
    this._handlers.push(handler);
  }

  notify(...args) {
    for (let i = 0; i < this._handlers.length; i += 1) {
      this._handlers[i](...args);
    }
  }
}

module.exports = ObservedEvent;
