const View = require("../view/view");
const Model = require("../model/model");
const Controller = require("../controller/controller");

class App {

    init() {
        let view = new View();
        let model = new Model();
        let controller = new Controller(view, model);
        let container = document.querySelector(".game__grid-container");
        view.createGrid(container, 5, 5);
    }
}

const app = new App();
app.init();

module.exports = App;