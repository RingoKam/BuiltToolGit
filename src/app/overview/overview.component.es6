export default {
    template: require("./overview.html"),
    controller: overviewController
};

// overviewController.inject = ['dependency1'];

function overviewController() {
    var ctrl = this;

    ctrl.$onInit = function () {};
    ctrl.$onChanges = function (changesObj) {};
    ctrl.$onDestory = function () {};
}