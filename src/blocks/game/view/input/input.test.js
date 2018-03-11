import Input from './input';

const $testInput = $('<input class="test-input" value="322"/>');
const $body = $('body');
$body.append($testInput);

describe('Input class tests', () => {
  const input = new Input('.test-input');
  const mockHandler = jest.fn();
  input.blur.attach(mockHandler);

  test('Input element is stored correctly', () => {
    expect(input._$input.is($testInput)).toBe(true);
  });

  test('Listeners have been set', () => {
    input._$input.trigger('blur');
    expect(mockHandler).toHaveBeenCalled();
  });

  test('getValue works correctly', () => {
    expect(input.getValue()).toBe('322');
  });

  test('isValid works correctly', () => {
    expect(input.isValid()).toBe(true);
  });

  test('add/remove invalid modificator works correctly', () => {
    input.addInvalidModificator();
    expect(input._$input.hasClass('game__input_invalid')).toBe(true);
    input.removeInvalidModificator();
    expect(input._$input.hasClass('game__input_invalid')).toBe(false);
  });
});
