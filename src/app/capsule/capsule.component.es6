const dataStore = require('../library/datastore');
const capsuleNameStore = require('../library/capsule_name_store');

export default {
    template: require("./capsule.html"),
    controller: capsuleController,
    controllerAs: "model",
    binding: {
        capsules: "<",
        onUpdateCapsuleName: "&"
    }
};

capsuleController.inject = ['$state'];

function capsuleController($state, $rootScope, $scope, $mdDialog) {

    var model = this;

    model.$onInit = function () {
        debugger;
        model.capsules = RestructureData(model.capsules)
        model.onUpdateCapsuleName = model.onUpdateCapsuleName;
    };

    // let grabDataEvent = $rootScope.$on("refreshData", GrabData)

    ctrl.$onChanges = function() {
        
    };

    model.$onDestory = function () {
        // grabDataEvent();
    };
    // model.$onChanges = function (changesObj) {};
    model.changeState = (id) => {
        // $state.go("directory", {"capsuleid": id});
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
            // let promise = capsuleNameStore.insertdb({name});
            model.onUpdateCapsuleName({
                name
            });
        });
    }

    // function GrabData() {
    //     dataStore.find({}).then((data) => {
    //         model.capsules = RestructureData(data);
    //         $scope.$apply();
    //     });
    // }

    function RestructureData(data) {
        if (data) {
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
}
