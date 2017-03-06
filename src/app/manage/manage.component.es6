const dataStore = require('../library/datastore');

import Q from 'q';

export default {
    template: require("./manage.html"),
    controller: ManageController,
    controllerAs: "model",
    bindings: {
        dbRecords: '<',
    }
}

function ManageController($scope) {
    let model = this;

    model.$onInit = function () {
        this.dbRecords;
        model.capsuleCollections = RestructureData(this.dbRecords);
    };

    model.$onChanges = function (changesObj) {

    };
    model.$onDestory = function () {};

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