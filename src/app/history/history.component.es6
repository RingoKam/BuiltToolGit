const dataStore = require('../library/datastore');

export default {
    template: require("./history.html"),
    controller: capsuleController,
    controllerAs: "model"
};

capsuleController.inject = ['$state'];

function capsuleController($state, $rootScope, $scope) {
    var model = this;
    model.$onInit = function () {
        GrabData();
    };

    let grabDataEvent = $rootScope.$on("refreshData", GrabData)

    model.$onDestory = function () {
        grabDataEvent();
    };

    model.changeState = (id) => {
        $state.go("directory", {
            "capsuleid": id
        });
    }

    function GrabData() {
        dataStore.find({}).then((data) => {
            model.capsules = data;
        });
    }
}