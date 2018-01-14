const Controller = require("../controller");
const Model = require("../../model/model");
const View = require("../../view/view");
const view = new View();
const model = new Model();
const controller = new Controller(model, view);

describe("Events listening", () => {
    const canvas = view.createCanvas(100, 100);
    document.body.appendChild(canvas);
    const grid = view.drawGrid(canvas, 10, 10);
    const elem = grid.item(1);
    let spy = jest.spyOn(model, "changeElement");
    controller.setListeners();

    test("Grid cell click event listening", () => {        
        grid.trigger("object:selected", {target: elem});
        expect(spy).toHaveBeenCalled();
    });

    /*test("New game event click event listening", () => {

    });

    test("Pause click event listening", () => {

    });

    test("Grid size change event listening" () => {

    });*/
});