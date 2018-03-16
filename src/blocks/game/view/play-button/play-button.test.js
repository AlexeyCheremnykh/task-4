import PlayButton from './play-button';

const $testButton = $('<button class="test-button"/>');
const $body = $('body');
$body.append($testButton);

describe('PlayButton class tests', () => {
  const button = new PlayButton('.test-button');

  test('Button text has been change after setting running status', () => {
    let isGameRunning = true;
    button.setRunningStatus(isGameRunning);
    expect(button._$button.text()).toBe('Stop');

    isGameRunning = false;
    button.setRunningStatus(isGameRunning);
    expect(button._$button.text()).toBe('Start');
  });
});
