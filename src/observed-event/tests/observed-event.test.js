/* global jest, test, describe, expect */

import ObservedEvent from '../observed-event';

class Observable {
  constructor() {
    this.observedEvent = new ObservedEvent();
  }

  notify() {
    this.observedEvent.notify();
  }
}

class Observer {
  constructor(observable) {
    this.observable = observable;
  }

  handler() {}

  observe() {
    this.observable.observedEvent.attach(this.handler.bind(this));
  }
}

describe('Observed event tests', () => {
  const observable = new Observable();
  const observer = new Observer(observable);

  test("Handler hasn't been attached", () => {
    expect(observable.observedEvent._handlers[0]).toBeUndefined();
  });

  test('Handler has been attached', () => {
    observer.observe();
    expect(observable.observedEvent._handlers[0]).not.toBeUndefined();
  });

  const spy = jest.spyOn(observer, 'handler');
  test("Observer hasn't been notified", () => {
    expect(spy).not.toHaveBeenCalled();
  });

  test('Observer has been notified', () => {
    observable.notify();
    expect(spy).toHaveBeenCalled();
  });
});
