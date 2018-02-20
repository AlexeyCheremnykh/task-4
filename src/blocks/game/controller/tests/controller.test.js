/* global test, describe, jest, expect */

import Model from '../../model/model';
import View from '../../view/view';
import Controller from '../controller';

const model = new Model();
const view = new View(model);
const controller = new Controller(model, view);
const grid = document.createElement('div');
grid.className = 'game__grid js-game__grid';
document.body.appendChild(grid);

const startStopBtn = document.createElement('button');
startStopBtn.className = 'game__start-stop js-game__start-stop';
startStopBtn.innerHTML = 'Start';
document.body.appendChild(startStopBtn);

const clearBtn = document.createElement('button');
clearBtn.className = 'game__clear js-game__clear';
document.body.appendChild(clearBtn);

const oneStepBtn = document.createElement('button');
oneStepBtn.className = 'game__one-step js-game__one-step';
document.body.appendChild(oneStepBtn);

const widthInput = document.createElement('input');
widthInput.className = 'game__width-input js-game__width-input';
document.body.appendChild(widthInput);

const heightInput = document.createElement('input');
heightInput.className = 'game__height-input js-game__height-input';
document.body.appendChild(heightInput);

const delayInput = document.createElement('input');
delayInput.className = 'game__delay-input js-game__delay-input';
delayInput.value = 100;
document.body.appendChild(delayInput);

const createGridMatrixSpy = jest.spyOn(model, 'createGridMatrix');
const calculateNextGenerationSpy = jest.spyOn(model, 'calculateNextGeneration');
const updateCellSpy = jest.spyOn(model, 'updateCell');
const replaceStartButtonSpy = jest.spyOn(view, 'replaceStartButton');
const replaceStopButtonSpy = jest.spyOn(view, 'replaceStopButton');

view.observeModel();
model.createGridMatrix(5, 5);
controller.setListeners();

describe('Controller tests', () => {
  test('Class instance has been created', () => {
    expect(controller._model).not.toBeUndefined();
    expect(controller._view).not.toBeUndefined();
  });

  describe('Events listening', () => {
    jest.useFakeTimers();

    test('Cell update on click', () => {
      const $gridCell = $($('.js-game__grid-cell')[2]);
      $gridCell.trigger('mousedown');
      expect(updateCellSpy).toHaveBeenCalledWith(0, 2);
    });

    describe('Button click events', () => {
      const $startStopBtn = $('.js-game__start-stop');

      test('Game starts on click', () => {
        $startStopBtn.trigger('click');
        expect(setInterval).toHaveBeenCalled();
        expect(replaceStartButtonSpy).toHaveBeenCalled();
      });

      test('Game stops on click', () => {
        $startStopBtn.trigger('click');
        expect(clearInterval).toHaveBeenCalled();
        expect(replaceStopButtonSpy).toHaveBeenCalled();
      });

      test('Calculate one step next generation on click', () => {
        const $oneStepBtn = $('.js-game__one-step');
        $oneStepBtn.trigger('click');
        expect(calculateNextGenerationSpy).toHaveBeenCalled();
      });

      test('Grid clears on click', () => {
        const $clear = $('.js-game__clear');
        $clear.trigger('click');
        expect(createGridMatrixSpy).toHaveBeenCalledWith(5, 5);
      });
    });

    describe('Grid size change events', () => {
      const $width = $('.js-game__width-input');
      const $height = $('.js-game__height-input');
      $width.val(4);
      $height.val(12);

      test('New grid if width changes', () => {
        $width.trigger('focus');
        $width.val(5);
        $width.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenLastCalledWith(5, 12);
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(3);
      });

      test("The same grid if width doesn't change", () => {
        $width.trigger('focus');
        $width.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(3);
      });

      test('New grid if height changes', () => {
        $height.trigger('focus');
        $height.val(6);
        $height.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenLastCalledWith(5, 6);
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(4);
      });

      test("The same grid if height doesn't change", () => {
        $height.trigger('focus');
        $height.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(4);
      });

      test('The same grid if width is invalid', () => {
        $width.val('wrong!');
        $width.trigger('focus');
        $width.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(4);

        $width.val('-124');
        $width.trigger('focus');
        $width.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(4);
      });

      test('The same grid if height is invalid', () => {
        $width.val(5);
        $height.val('wrong!');
        $height.trigger('focus');
        $height.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(4);

        $height.val('-666');
        $height.trigger('focus');
        $height.trigger('blur');
        expect(createGridMatrixSpy).toHaveBeenCalledTimes(4);
      });
    });

    describe('Delay change events', () => {
      const $delay = $('.js-game__delay-input');
      const $startStopBtn = $('.js-game__start-stop');
      $startStopBtn.trigger('click');

      test('New timer if delay changes', () => {
        $delay.trigger('focus');
        $delay.val(200);
        $delay.trigger('blur');
        expect(clearInterval).toHaveBeenCalledTimes(2);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 200);
      });

      test("The same timer if delay doesn't change", () => {
        $delay.trigger('focus');
        $delay.trigger('blur');
        expect(clearInterval).toHaveBeenCalledTimes(2);
      });

      test('The same timer if delay is invalid', () => {
        $delay.val('wrong!');
        $delay.trigger('focus');
        $delay.trigger('blur');
        expect(clearInterval).toHaveBeenCalledTimes(2);

        $delay.val('-999');
        $delay.trigger('focus');
        $delay.trigger('blur');
        expect(clearInterval).toHaveBeenCalledTimes(2);
      });
    });
  });
});
