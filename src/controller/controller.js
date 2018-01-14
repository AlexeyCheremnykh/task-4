class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setListeners() {
        const that = this;

        $(".game__grid").mousedown((event) => {
            if (event.target.className === "game__grid-cell") {
                event.target.classList.add("game__grid-cell_selected");
                let indexes = that.view.getElementIndexes(event.target);
                that.model.changeElement(indexes.i, indexes.j);
            }
        });
    }
}

module.exports = Controller;