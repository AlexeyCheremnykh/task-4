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

    describe("Button click events", () => {
        let newButton = document.createElement("button");
        newButton.className = "game__start-stop";
        newButton.innerHTML = "Start";
        document.body.appendChild(newButton);

        newButton = document.createElement("button");
        newButton.className = "game__clear";
        document.body.appendChild(newButton);

        newButton = document.createElement("button");
        newButton.className = "game__one-step";
        document.body.appendChild(newButton);
        
        controller.setButtonsListeners();

        test("Button-start-stop click event", () => {
            $(".game__start-stop").trigger("click");
            expect($(".game__start-stop").text()).toBe("Stop");
            
            $(".game__start-stop").trigger("click");
            expect($(".game__start-stop").text()).toBe("Start");
        });        
        
        test("Button-one-step click event", () => {
            const spy = jest.spyOn(model, "calculateNextGeneration");
            $(".game__one-step").trigger("click");
            expect(spy).toHaveBeenCalled();
        });

        test("Button-clear click event", () => {
            const spy = jest.spyOn(model, "createGridMatrix");         
            $(".game__clear").trigger("click");
            expect(spy).toHaveBeenCalledWith(5, 5);
        });
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

        test("Change grid size", () => {
            $(".game__width").trigger("blur");
            expect(spy).toHaveBeenCalledWith(4, 12);
        });
    });
});