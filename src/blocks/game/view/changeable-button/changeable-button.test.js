import ChangeableButton from './changeable-button';

const $testButton = $('<button class="test-button"/>');
const $body = $('body');
$body.append($testButton);

describe('ChangeableButton class tests', () => {
  const button = new ChangeableButton('.test-button');

  test('Button text has been set', () => {
    const testText = 'Wow, this is a test text';
    button.setText(testText);
    expect(button._$button.text()).toBe(testText);
  });
});
