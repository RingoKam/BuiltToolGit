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
function createCapsuleController($scope) {
    let model = this;

    model.$onInit = function () {
        model.gitFolders = [];
        model.onGitFoldersChange = this.onGitFoldersChange;
        model.selectedGitFolders = angular.copy(this.selectedGitFolders); 
    };

    model.$onChanges = function (changesObj) {
        model.gitFolders = model.selectedGitFolders.gitFiles;
    };

    model.$onDestory = function () {};

    model.OpenDirectory = function () {
        model.loading = true; 
        electron.dialog.showOpenDialog({
            title: "Select a folder",
            properties: ["openDirectory"]
        }, (filePath) => {
            let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
            model.gitFolders = this.gitFolders.concat.apply(gitFolder);
            model.loading = false;
            $scope.$apply();
        });
    }

    model.AddGitFolders = function (gitFolder) {
        debugger;
        if (!gitFolder.selected) {
            model.selectedGitFolders.gitFiles.push(gitFolder); 
            model.onGitFoldersChange({
                folders: model.SelectedGitFolders
            })
        } else {
            let removethis = model.selectedGitFolders.gitFiles.filter((el) => {
                return el.repoInfo.abbreviatedSha == gitFolder.repoInfo.abbreviatedSha
            })[0];
            let index = model.selectedGitFolders.gitFiles.indexOf(removethis)
            if (index > -1)
                model.selectedGitFolders.gitFiles.splice(index, 1);
        }
    }
}