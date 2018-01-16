const Controller = require("../controller");
const Model = require("../../model/model");
const View = require("../../view/view");
const view = new View();
const model = new Model();
const controller = new Controller(model, view);


describe("Events listening", () => {   
    const grid = document.createElement("div");
    grid.className = "game__grid";
    document.body.appendChild(grid);
    model.createGridMatrix(5, 5);
    
    test("Cell click event", () => {
        const spy = jest.spyOn(model, "updateCell");
        controller.setGridListeners();
        $(".game__grid").trigger("mousedown");
        expect(spy).toHaveBeenCalled();
    });

    test("Button-clear click event", () => {
        const spy = jest.spyOn(model, "createGridMatrix");
        const clearButton = document.createElement("div");
        clearButton.className = "game__clear";
        document.body.appendChild(clearButton);
        controller.setButtonsListeners();
        $(".game__clear").trigger("click");
        expect(spy).toHaveBeenCalledWith(5, 5);
    });

    describe("Grid size change event listening", () => {
        const spy = jest.spyOn(model, "createGridMatrix");
        const widthElement = document.createElement("input");
        const heightElement = document.createElement("input");
        widthElement.className = "game__width";
        widthElement.value = 4;        
        heightElement.className = "game__height"; 
        heightElement.value = 12;
        document.body.appendChild(widthElement);
        document.body.appendChild(heightElement);
        controller.setGridSizeListeners();

        test("Width change", () => {
            $(".game__width").trigger("blur");
            expect(spy).toHaveBeenCalledWith(4, 5);
        });

        test("Height change", () => {
            $(".game__height").trigger("blur");
            expect(spy).toHaveBeenCalledWith(4, 12);
        });
    });

    /*test("New game event click event listening", () => {

    });

    test("Pause click event listening", () => {

    });
    */
});