import Button from './button';

const $testButton = $('<button class="test-button"/>');
const $body = $('body');
$body.append($testButton);

describe('Button class tests', () => {
  const button = new Button('.test-button');
  const mockHandler = jest.fn();
  button.click.attach(mockHandler);

  test('Button element is stored correctly', () => {
    expect(button._$button.is($testButton)).toBe(true);
  });

  test('Listeners have been set', () => {
    button._$button.trigger('click');
    expect(mockHandler).toHaveBeenCalled();
  });
});