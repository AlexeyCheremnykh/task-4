class EventDispatcher {
    constructor(sender) {
        this._sender = sender;
        this._handlers = [];
    }

    attach(handler) {
        this._handlers.push(handler);
    }

    notify(args) {
        for (let i = 0; i < this._handlers.length; i++) {
            this._handlers[i](this._sender, args);            
        }
    }
}

module.exports = EventDispatcher;