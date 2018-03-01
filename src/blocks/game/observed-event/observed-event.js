class ObservedEvent {
  constructor() {
    this._handlers = [];
  }

  attach(handler) {
    this._handlers.push(handler);
  }

  detach(handler) {
    this._handlers.splice(this._handlers.indexOf(handler), 1);
  }

  notify(...args) {
    this._handlers.forEach((handler) => {
      handler(...args);
    });
  }
}

export default ObservedEvent;
