class View {

    constructor(model) {
        this.model = model;
        this.grid = null;
        this._cellSize = 12;
    }

    observeModel() {
        this.model.createGridMatrixEvent.attach(this.createGrid.bind(this));
        this.model.updateCellEvent.attach(this.updateCell.bind(this));
    }
   
    createGrid() {  
        let grid = document.createElement("div");
        grid.className = "game__grid"
        grid.style.width = this.model.cellsX * this._cellSize + "px";
        document.querySelector(".game__grid-container").appendChild(grid);
        let i = 0;
        let j = 0; 
        for (let k = 0; k < this.model.cellsX * this.model.cellsY; k++) {
            let cell = document.createElement("div");
            cell.className = "game__grid-cell";
            cell.style.height = cell.style.width = this._cellSize + "px";
            
            // for coords in model array
            cell.dataset.i = i;
            cell.dataset.j = j;            
            if (j + 1 !== this.model.cellsX) {                
                j++;
            } else {
                i++;
                j = 0;
            }

            grid.appendChild(cell);
        }
    }

    getCellIndexes(elem) {
        let indexes = {
            i: parseInt(elem.dataset.i),
            j: parseInt(elem.dataset.j)
        }
        return indexes;
    }

    updateCell(i, j) {
        console.log("view.upd", i, j);
        const setAlive = function (cell) {
            cell.className = "game__grid-cell game__grid-cell_alive";
        }

        const setDead = function (cell) {
            cell.className = "game__grid-cell";
        }

        let selector = "div[data-i='" + i + "'][data-j='" + j + "']";
        let cell = document.querySelector(selector);

        if (cell.className == "game__grid-cell") {
            setAlive(cell);
        } else {
            setDead(cell);
        }           
    }
}

module.exports = View;