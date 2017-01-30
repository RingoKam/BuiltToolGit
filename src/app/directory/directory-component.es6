const dataStore = require('../library/datastore');
const capsuleNameStore = require('../library/capsule_name_store');

export default {
    bindings: {
        capsuleid: "<"
    },
    template: require("./directory.html"),
    controller: directoryController,
    controllerAs: "model"
}

// directoryController.$inject = [];

function directoryController() {
    var model = this;

    model.$onInit = function () {
        model.capsuleid = this.capsuleid
        dataStore.find({
            _id: this.capsuleid
        }).then((data) => {
            model.selectedGitFolders = data[0];
            model.selectedGitFolders = model.selectedGitFolders.map((e) => e.selected = true)
        });
    }

    model.$onChange = function (changeObj) {
        // if (model.selectedGitFolders) {
        //     dataStore.find({
        //         _id: this.capsuleid
        //     }).then((data) => {
        //         model.selectedGitFolders = data[0];
        //         model.selectedGitFolders = model.selectedGitFolders.map((e) => e.selected = true)
        //     });
        // } else {
        //     model.selectedGitFolders.gitFiles = []; 
        // }
    }

    model.updateGitFolders = (folders) => {
        model.selectedGitFolders = folders;
    }
}