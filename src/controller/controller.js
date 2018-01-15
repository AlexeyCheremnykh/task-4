class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setGridListeners() {
        const that = this;

        $(".game__grid").mousedown((event) => {
            let indexes = that.view.getCellIndexes(event.target);
            that.model.updateCell(indexes.i, indexes.j);
            
            $(".game__grid").bind("mouseover", (event) => {
                indexes = that.view.getCellIndexes(event.target);
                that.model.updateCell(indexes.i, indexes.j);    
            });
            return false; 
        });

        $(".game__grid").mouseup(() => {
            $(".game__grid").unbind("mouseover");
        });

        $(".game__grid").mouseleave(() => {
            $(".game__grid").unbind("mouseover");
        });
    }
}

module.exports = Controller;