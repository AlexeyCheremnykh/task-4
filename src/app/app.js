const View = require("../view/view");
const Model = require("../model/model");
const Controller = require("../controller/controller");

class App {

    init() {        
        let model = new Model();
        let view = new View(model);
        let controller = new Controller(model, view);        
        view.observeModel();
        model.createGridMatrix(60, 40);
        controller.setListeners();
    }
}

const app = new App();
app.init();

module.exports = App;