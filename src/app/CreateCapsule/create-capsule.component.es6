const electron = window.require('electron').remote;
let gitFolderInfo = require('../library/git_folder_info');
let createJsTreeObj = require('../library/create_jstree_obj');

export default {
    template: require("./create-capsule.html"),
    //templateUrl: 'templateUrl',
    controller: createCapsuleController,
    controllerAs: "model",
    bindings: {
        selectedGitFolders: '<',
        onGitFoldersChange: '&'
    },
};

// createCapsuleController.inject = ['dependency1'];

function createCapsuleController() {
    let model = this;

    model.$onInit = function () {
        model.gitFolders = model.SelectedGitFolders ? model.SelectedGitFolders : [];
        model.onGitFoldersChange = this.onGitFoldersChange;
        model.SelectedGitFolders = model.SelectedGitFolders ? model.SelectedGitFolders : [];
    };

    model.$onChanges = function (changesObj) {};
    model.$onDestory = function () {};

    model.OpenDirectory = function () {
        electron.dialog.showOpenDialog({
            title: "Select a folder",
            properties: ["openDirectory"]
        }, (filePath) => {
            let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
            model.gitFolders = this.gitFolders.concat.apply(gitFolder);
        });
    }

    model.AddGitFolders = function (gitFolder) {
        debugger;
        if (!gitFolder.selected) {
            model.SelectedGitFolders.push(gitFolder); 
            model.onGitFoldersChange({
                folders: model.SelectedGitFolders
            })
        } else {
            let removethis = model.SelectedGitFolders.filter((el) => {
                return el.$$hashKey == gitFolder.$$hashKey
            })[0];
            let index = model.SelectedGitFolders.indexOf(removethis)
            if (index > -1)
                model.SelectedGitFolders.splice(index, 1);
        }
    }
}