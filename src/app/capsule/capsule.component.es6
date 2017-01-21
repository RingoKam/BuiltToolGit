'use strict';

export default {
    template: require("./capsule.html"),
    //templateUrl: 'templateUrl',
    controller: ControllerController,
    controllerAs: "model"
    // bindings: {
    //     Binding: '<',
    // },
};

ControllerController.inject = ['$state'];

function ControllerController($state) {
    var model = this;
    ////////////////
    model.onInit = function () {};
    model.onChanges = function (changesObj) {};
    model.onDestory = function () {};

    model.changeState = (state, obj) => {
        $state.go(state, obj);
    }
}