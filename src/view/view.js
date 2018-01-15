class View {

    constructor(model) {
        this.model = model;
        this.grid = null;
        this._cellSize = 12;
    }

    observeModel() {
        let cellsX = this.model.cellsX;
        let cellsY = this.model.cellsY;
        this.model.createGridMatrixEvent.attach(this.createGrid.bind(this, cellsX, cellsY));
    }
   
    createGrid(cellsX, cellsY) {
        let grid = document.createElement("div");
        grid.className = "game__grid"
        grid.style.width = cellsX * this._cellSize + "px";
        document.querySelector(".game__grid-container").appendChild(grid);
        let i = 0;
        let j = 0; 
        for (let k = 0; k < cellsX * cellsY; k++) {
            let cell = document.createElement("div");
            cell.className = "game__grid-cell";
            cell.style.height = cell.style.width = this._cellSize + "px";
            
            // for coords in model array
            cell.dataset.i = i;
            cell.dataset.j = j;            
            if (j + 1 !== cellsX) {                
                j++;
            } else {
                i++;
                j = 0;
            }

            grid.appendChild(cell);
        }
    }

    getElementIndexes(elem) {
        let indexes = {
            i: parseInt(elem.dataset.i),
            j: parseInt(elem.dataset.j)
        }
        return indexes;
    }

    changeCell(i, j) {
        
    }
}

module.exports = View;