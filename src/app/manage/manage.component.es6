const dataStore = require('../library/datastore');

import Q from 'q';

export default {
    template: require("./manage.html"),
    controller: ManageController,
}

function ManageController($scope) {
    let model = this;

    model.$onInit = function () {
        GrabData();
    };

    model.$onChanges = function (changesObj) {};
    model.$onDestory = function () {};

    function GrabData() {
        dataStore.find({}).then((result) => {
            let capsuleNames = result.map((cap) => {
                return cap.capsule
            }).filter((name, index, array) => {
                return array.indexOf(name) === index
            });

            model.capsuleCollections = capsuleNames.map((name) => {
                let collection = result.filter((d) => {
                    return d.capsule === name
                })
                return {
                    name,
                    collection
                }
            })
            $scope.apply(); 
        });
    }
}