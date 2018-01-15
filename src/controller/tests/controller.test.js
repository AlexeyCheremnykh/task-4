const Controller = require("../controller");
const Model = require("../../model/model");
const View = require("../../view/view");
const view = new View();
const model = new Model();
const controller = new Controller(model, view);


describe("Events listening", () => {   
    const grid = document.createElement("div");
    const cell = document.createElement("div");
    grid.className = "game__grid";
    cell.className = "game__grid-cell";
    grid.appendChild(cell);
    document.body.appendChild(grid);
    
    test("Cell click event", () => {
        let spy = jest.spyOn(model, "updateCell");
        controller.setGridListeners();
        $(".game__grid-cell").trigger("mousedown");
        expect(spy).toHaveBeenCalled();
    });

    /*test("New game event click event listening", () => {

    });

    test("Pause click event listening", () => {

    });

    test("Grid size change event listening" () => {

    });*/
});