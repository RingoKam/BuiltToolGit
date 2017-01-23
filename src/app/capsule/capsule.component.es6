const dataStore = require('../library/datastore')

export default {
    template: require("./capsule.html"),
    controller: capsuleController,
    controllerAs: "model"
    // bindings: {
    //     Binding: '<',
    // },
};

capsuleController.inject = ['$state'];

function capsuleController($state) {
    var model = this;
    ////////////////
    model.$onInit = function () {
        debugger;
        dataStore.find({}).then((data) => {
            debugger;
            model.gitFolders = data;
        })
    };
    model.$onChanges = function (changesObj) {};
    model.$onDestory = function () {};

    model.changeState = (state, obj) => {
        $state.go(state, obj);
    }

}