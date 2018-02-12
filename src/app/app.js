import View from '../view/view';
import Model from '../model/model';
import Controller from '../controller/controller';

class App {
  constructor() {
    this._model = new Model();
    this._view = new View(this._model);
    this._controller = new Controller(this._model, this._view);
  }

  init() {
    const $width = $('.game__width');
    const $height = $('.game__height');
    this._view.observeModel();
    this._model.createGridMatrix(parseInt($width.val(), 10), parseInt($height.val(), 10));
    this._controller.setListeners();
  }
}

const app = new App();
app.init();
