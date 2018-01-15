class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setListeners() {
        const that = this;

        $(".game__grid").mousedown((event) => {            
            let indexes = that.view.getCellIndexes(event.target);            
            that.model.updateCell(indexes.i, indexes.j);            
        });
    }
}

module.exports = Controller;