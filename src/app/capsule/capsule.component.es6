const dataStore = require('../library/datastore')

export default {
    template: require("./capsule.html"),
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
    // model.$onChanges = function (changesObj) {};
    model.changeState = (obj) => {
        $state.go("directory", obj);
    }

    function GrabData() {
        dataStore.find({}).then((data) => {
            model.capsules = data;
            $scope.$apply(); 
        });
    }
}