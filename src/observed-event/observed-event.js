class ObservedEvent {
  constructor() {
    this._handlers = [];
  }

  attach(handler) {
    this._handlers.push(handler);
  }

  notify(...args) {
    this._handlers.forEach((handler) => {
      handler(...args);
    });
  }
}

module.exports = ObservedEvent;
