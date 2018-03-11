import View from '../view/view';
import Model from '../model/model';
import Controller from '../controller/controller';

class App {
  constructor() {
    this._model = new Model();
    this._view = new View();
    this._controller = new Controller(this._model, this._view);
    this._controller.init();
  }
}

const app = new App();
