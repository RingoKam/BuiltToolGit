const dataStore = require('../library/datastore')

export default {
    template: require("./capsule.html"),
    controller: capsuleController,
    controllerAs: "model"
};

capsuleController.inject = ['$state'];

function capsuleController($state) {
    var model = this;
    ////////////////
    model.$onInit = function () {
        dataStore.find({}).then((data) => {
            debugger;
            model.capsules = data;
        })
    };
    // model.$onChanges = function (changesObj) {};
    // model.$onDestory = function () {};

    model.changeState = (state, obj) => {
        $state.go(state, obj);
    }

}