class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setListeners() {
        this.setGridListeners();
        this.setButtonsListeners();
        this.setGridSizeListeners();
    }

    setGridListeners() {
        const self = this;
        $(".game__grid")
            .mousedown(function(event) {
                let indexes = self.view.getCellIndexes(event.target);
                self.model.updateCell(indexes.i, indexes.j);
                
                $(".game__grid").bind("mouseover", (event) => {
                    indexes = self.view.getCellIndexes(event.target);
                    self.model.updateCell(indexes.i, indexes.j);    
                });
                return false; 
            })
            .mouseup(() => {
                $(".game__grid").unbind("mouseover");
            })
            .mouseleave(() => {
                $(".game__grid").unbind("mouseover");
            });
    }

    setButtonsListeners() {
        const self = this;
        $(".game__clear").click(function() {
            self.model.createGridMatrix(self.model.cellsX, self.model.cellsY);
        });
    }

    setGridSizeListeners() {     
        const self = this;   
        $(".game__width").blur(function() {
            self.model.createGridMatrix(parseInt($(this).val()), self.model.cellsY);
        });

        $(".game__height").blur(function () {
            self.model.createGridMatrix(self.model.cellsX, parseInt($(this).val()));
        });
    }
}

module.exports = Controller;