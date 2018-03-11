import View from './view';

const elements = [
  '<div class="js-game__grid"></div>',
  '<button class="js-game__start-stop"/>',
  '<button class="js-game__one-step"/>',
  '<button class="js-game__clear"/>',
  '<input class="js-game__delay"/>',
  '<input class="js-game__width"/>',
  '<input class="js-game__height"/>',
];
const $body = $('body');
$body.append([...elements]);

const view = new View();

describe('View tests', () => {
  test('View instance has been created correctly', () => {
    expect(view.grid).not.toBeUndefined();
    expect(view.startStop).not.toBeUndefined();
    expect(view.oneStep).not.toBeUndefined();
    expect(view.clear).not.toBeUndefined();
    expect(view.delay).not.toBeUndefined();
    expect(view.width).not.toBeUndefined();
    expect(view.height).not.toBeUndefined();
  });
});
