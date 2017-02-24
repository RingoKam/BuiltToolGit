const dataStore = require('../library/datastore');
const capsuleNameStore = require('../library/capsule_name_store');
const remote = require('electron').remote

import Q from 'q'; 

export default {
    template: require("./capsule.html"),
    controller: capsuleController,
    controllerAs: "model"
};

capsuleController.inject = ['$state'];

function capsuleController($state, $rootScope, $scope, $mdDialog) {

    var model = this;

    model.$onInit = function () {
        GrabData();
    };

    let grabDataEvent = $rootScope.$on("refreshData", GrabData)

    model.$onDestory = function () {
        grabDataEvent();
    };
    // model.$onChanges = function (changesObj) {};
    model.changeState = (id) => {
        $state.go("create", {
            "capsuleid": id
        }, { reload: true });
    }

    model.PromptNewCapsule = (ev) => {

        var confirm = $mdDialog.prompt()
            .title('New Capsule Collection')
            // .textContent('Capsule holds record of multiple git repo commit.')
            .placeholder('* Capsule Name *')
            .ariaLabel('capsule name')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function (name) {
            if (!model.capsulesName.includes(name)) {
                let promise = capsuleNameStore.insertdb({
                    name
                });
                promise.then(remote.getCurrentWindow().reload());
            }
        });
    }

    function GrabData() {
        dataStore.find({}).then((data) => {
            model.capsules = RestructureData(data);
        });
        capsuleNameStore.find({}).then((data) => {
            model.capsulesName = data.map((m) => m.name)
        })
    }

    function RestructureData(data) {
        let capsuleNames = data.map((cap) => {
            return cap.capsule
        }).filter((name, index, array) => {
            return array.indexOf(name) === index
        });
        let capsules = capsuleNames.map((name) => {
            let collection = data.filter((d) => {
                return d.capsule === name
            })
            return {
                name,
                collection
            }
        })
        return capsules;
    }
}