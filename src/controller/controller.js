const View = require("../view/view");
const Model = require("../model/model");

class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setListeners() {
        const gridClickHandler = (options) => {
            let indexes = this.view.getElementIndexes(options.target);
            this.model.changeElement(indexes.i, indexes.j);
        };

        this.view.grid.on("object:selected", gridClickHandler);
    }
}

module.exports = Controller;