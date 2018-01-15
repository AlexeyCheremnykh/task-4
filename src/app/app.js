const View = require("../view/view");
const Model = require("../model/model");
//const Controller = require("../controller/controller");

class App {

    init() {        
        let model = new Model();
        let view = new View(model);
        view.observeModel();
        model.createGridMatrix(10, 10);
    }
}

const app = new App();
app.init();

module.exports = App;