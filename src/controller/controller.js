class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;        
    }

    setListeners() {
        this.setGridListeners();
        this.setButtonsListeners();
        this.setGridSizeListeners();
        this.setDelayListener();
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
        let timerId;
        let running = false;

        $(".game__start-stop").click(function () {
            running = true;
            let delay = parseInt($(".game__delay-input").val());
            self.model.allCellsDiedEvent.attach(stop.bind(self));
            if ($(this).text() == "Start") {
                let calculate = self.model.calculateNextGeneration.bind(self.model);
                timerId = setInterval(calculate, delay);
                self.view.replaceStartButton();  
            } else {
                stop();
            }
        });

        $(".game__clear").click(function() {
            self.model.createGridMatrix(self.model.cellsX, self.model.cellsY);
        });

        $(".game__one-step").click(function () {
            self.model.calculateNextGeneration();
        });

        // Куда-то передвинуть надо будет
        $(".game__delay-input").blur(function() {
            let delay = parseInt($(".game__delay-input").val());
            if (running) {
                clearInterval(timerId);
                let calculate = self.model.calculateNextGeneration.bind(self.model);
                timerId = setInterval(calculate, delay);
            }
        });

        function stop() {
            clearInterval(timerId);
            running = false;
            self.view.replaceStopButton();
        }
    }    

    setGridSizeListeners() {     
        const self = this;   
        $(".game__width").blur(function() {
            let width = parseInt($(this).val());
            if (isNaN(width) || width <= 0) {
                $(".game__width").addClass("game__wrong-input");
            } else {
                self.model.createGridMatrix(width, self.model.cellsY);
            }
        });

        $(".game__height").blur(function () {
            let height = parseInt($(this).val());
            if (isNaN(height) || height <= 0) {
                $(".game__width").addClass("game__wrong-input");
            } else {
                self.model.createGridMatrix(self.model.cellsX, height);
            }
        });
    }
}

module.exports = Controller;