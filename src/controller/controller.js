const View = require("../view/view");
const Model = require("../model/model");

class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setListeners() {
        
    }
}

module.exports = Controller;