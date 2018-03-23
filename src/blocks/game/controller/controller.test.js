import Model from '../model/model';
import View from '../view/view';
import Controller from './controller';

const elements = [
  '<div class="js-game__grid"></div>',
  '<button class="js-game__play"/>',
  '<button class="js-game__one-step"/>',
  '<button class="js-game__new-game"/>',
  '<input class="js-game__delay"/>',
  '<input class="js-game__width" value="30"/>',
  '<input class="js-game__height" value="20"/>',
];
const $body = $('body');
$body.append([...elements]);


const model = new Model();
const view = new View();
const controller = new Controller(model, view);

const observeView = jest.spyOn(controller, 'observeView');
const observeModel = jest.spyOn(controller, 'observeModel');
const createGridMatrix = jest.spyOn(model, 'createGridMatrix');
const startGame = jest.spyOn(controller, 'startGame');
const updateViewCell = jest.spyOn(view, 'updateCell');
const updateModelCell = jest.spyOn(model, 'updateCell');


describe('Controller tests', () => {
  jest.useFakeTimers();

  describe('Initiation', () => {
    test('Class instance has been created correctly', () => {
      expect(controller._model).not.toBeUndefined();
      expect(controller._view).not.toBeUndefined();
    });

    test('Controller has been initiated', () => {
      controller.init();
      expect(observeModel).toHaveBeenCalled();
      expect(observeView).toHaveBeenCalled();
      expect(createGridMatrix).toHaveBeenCalled();
      expect(controller._timerId).toBe(null);
      expect(controller._isGameRunning).toBe(false);
      expect(controller._delay).not.toBeUndefined();
    });
  });

  describe('Start and stop game', () => {
    test('Game has been started if valid delay', () => {
      controller.startGame();
      expect(controller._timerId).not.toBe(null);
      expect(controller._isGameRunning).toBe(true);
    });

    test('Game has been stopped', () => {
      controller.stopGame();
      expect(clearInterval).toHaveBeenCalled();
      expect(controller._isGameRunning).toBe(false);
    });

    test('Game hasn`t been started if invalid delay', () => {
      controller._view.setInvalidInputStatus('delay');
      controller.startGame();
      expect(controller._isGameRunning).toBe(false);
      controller._view.setValidInputStatus('delay');
    });
  });

  describe('Cell updating', () => {
    test('Correct grid cell has been updated', () => {
      controller.updateGridCell(1, 1);
      expect(updateViewCell).toHaveBeenCalledWith(31);
      controller.updateGridCell(2, 1);
      expect(updateViewCell).toHaveBeenCalledWith(61);
      controller.updateGridCell(3, 0);
      expect(updateViewCell).toHaveBeenCalledWith(90);
    });

    test('Correct matrix cell has been updated', () => {
      controller.updateMatrixCell(31);
      expect(updateModelCell).toHaveBeenCalledWith(1, 1);
      controller.updateMatrixCell(61);
      expect(updateModelCell).toHaveBeenCalledWith(2, 1);
      controller.updateMatrixCell(90);
      expect(updateModelCell).toHaveBeenCalledWith(3, 0);
    });
  });

  describe('Matrix size changing', () => {
    test('Matrix width has been changed if valid', () => {
      controller.changeMatrixWidth('5');
      expect(createGridMatrix).toHaveBeenCalledWith(5, 20);
    });

    test('Matrix width hasn`t been changed if invalid', () => {
      controller.changeMatrixWidth('abc');
      controller.changeMatrixWidth('0.5');
      controller.changeMatrixWidth('12ss');
      expect(createGridMatrix).toHaveBeenCalledTimes(2);

      view.setValidInputStatus('width');
    });

    test('Matrix height has been changed if valid', () => {
      controller.changeMatrixHeight('8');
      expect(createGridMatrix).toHaveBeenCalledWith(30, 8);
    });

    test('Matrix height hasn`t been changed if invalid', () => {
      controller.changeMatrixHeight('abc');
      controller.changeMatrixHeight('0.5');
      controller.changeMatrixHeight('12ss');
      expect(createGridMatrix).toHaveBeenCalledTimes(3);

      view.setValidInputStatus('height');
    });
  });

  describe('Delay changing', () => {
    let oldDelay = controller._delay;

    test('Delay has been changed if valid', () => {
      controller._isGameRunning = true;
      expect(clearInterval).toHaveBeenCalledTimes(3);
      expect(setInterval).toHaveBeenCalledTimes(1);

      controller.changeDelay('1000');
      expect(oldDelay).not.toBe(controller._delay);
      expect(clearInterval).toHaveBeenCalledTimes(4);
      expect(setInterval).toHaveBeenCalledTimes(2);
    });

    test('Delay hasn`t been changed if invalid', () => {
      oldDelay = controller._delay;
      controller.changeDelay('abc');
      controller.changeDelay('-5');
      controller.changeDelay('12sss');
      expect(oldDelay).toBe(controller._delay);
      expect(clearInterval).toHaveBeenCalledTimes(4);
      expect(setInterval).toHaveBeenCalledTimes(2);
    });
  });
});
