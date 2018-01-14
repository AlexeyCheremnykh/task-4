const Controller = require("../../controller/controller");
const Model = require("../../model/model");
const View = require("../../view/view");
const App = require("../../app/app");
/*const view = new View();
const model = new Model();
const controller = new Controller(model, view);*/

describe("App init", () => {
    const spyModel = jest.spyOn(Model, "constructor");
    const spyView = jest.spyOn(View, "constructor");
    const spyController = jest.spyOn(Controller, "constructor");
    const app = new App();
    test("Model has been created", () => {
        expect(spyModel).toHaveBeenCalled();
    });

    test("View has been created", () => {        
        expect(spyView).toHaveBeenCalled();
    });

    test("Controller has been created", () => {        
        expect(spyController).toHaveBeenCalled();
    });
});