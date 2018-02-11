const View = require('../view/view');
const Model = require('../model/model');
const Controller = require('../controller/controller');

class App {
  init() {
    const model = new Model();
    const view = new View(model);
    const controller = new Controller(model, view);
    const $width = $('.game__width');
    const $height = $('.game__height');
    view.observeModel();
    model.createGridMatrix(parseInt($width.val(), 10), parseInt($height.val(), 10));
    controller.setListeners();
  }
}

const app = new App();
app.init();

module.exports = App;
