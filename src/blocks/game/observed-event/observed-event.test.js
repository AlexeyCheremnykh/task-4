/* global jest, test, describe, expect */

import ObservedEvent from './observed-event';

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

  stopObserving() {
    this.observable.observedEvent.detach(this.handler.bind(this));
  }
}

describe('Observed event tests', () => {
  const observable = new Observable();
  const observer = new Observer(observable);

  test('Class instance has been created', () => {
    expect(observable.observedEvent._handlers).not.toBeUndefined();
  });

  test('Handler has been attached', () => {
    expect(observable.observedEvent._handlers[0]).toBeUndefined();
    observer.observe();
    expect(observable.observedEvent._handlers[0]).not.toBeUndefined();
  });

  const spy = jest.spyOn(observer, 'handler');

  test('Observer has been notified', () => {
    expect(spy).not.toHaveBeenCalled();
    observable.notify();
    expect(spy).toHaveBeenCalled();
  });

  test('Handler has been detached', () => {
    observer.stopObserving();
    expect(observable.observedEvent._handlers[0]).toBeUndefined();
  });
});
