const View = require("../view/view");
const Model = require("../model/model");
const Controller = require("../controller/controller");

class App {

    init() {
        let view = new View();
        let model = new Model();
        let controller = new Controller(view, model);
        let container = document.querySelector(".game__grid-container");
        view.createGrid(container, 100, 100);
        model.createGridMatrix(10, 10);
        //controller.setListeners();
    }
}

const app = new App();
app.init();

module.exports = App;