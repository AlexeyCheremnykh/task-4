const EventDispatcher = require("../event-dispatcher");

class Sender {
    constructor() {
        this.observedEvent = new EventDispatcher(this);
    }

    notify() {
        this.observedEvent.notify();
    }
}

class Observer {
    constructor(sender) {
        this.sender = sender;
    }
    
    handler() {}

    observe() {        
        this.sender.observedEvent.attach(this.handler.bind(this));
    }
}

describe("Event dispatcher", () => {
    const sender = new Sender();
    const observer = new Observer(sender);          

    test("Handler hasn't been attached", () => {
        expect(sender.observedEvent._handlers[0]).toBeUndefined();
    });   

    test("Handler has been attached", () => {   
        observer.observe();
        expect(sender.observedEvent._handlers[0]).not.toBeUndefined();
    });   

    const spy = jest.spyOn(observer, "handler");
    test("Observer hasn't been notified", () => {
        expect(spy).not.toHaveBeenCalled();
    });

    test("Observer has been notified", () => {
        sender.notify();
        expect(spy).toHaveBeenCalled();
    });
});