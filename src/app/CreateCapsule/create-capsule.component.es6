const electron = window.require('electron').remote;
let gitFolderInfo = require('../library/git_folder_info');
let createJsTreeObj = require('../library/create_jstree_obj');

export default {
    template: require("./create-capsule.html"),
    //templateUrl: 'templateUrl',
    controller: createCapsuleController,
    controllerAs: "model",
    bindings: {
        gitFolders: "<",
        selectedGitFolders: '<',
        onGitFoldersChange: '&'
    },
};

// createCapsuleController.inject = ['dependency1'];
function createCapsuleController($scope) {
    let model = this;

    model.$onInit = function () {
        model.gitFolders = this.gitFolders;
        model.onGitFoldersChange = this.onGitFoldersChange;
        model.selectedGitFolders = this.selectedGitFolders;
    };

    model.$onChanges = function (changesObj) {};

    model.$onDestory = function () {};

    model.refreshGit = function () {
        model.gitFolders = model.gitFolders.map((m) => {
            debugger;
            let x =  gitFolderInfo.GetFileInfo(m.repoInfo.root);
            return x; 
        })
    };

    model.OpenDirectory = function () {
        model.loading = true;
        electron.dialog.showOpenDialog({
            title: "Select a folder",
            properties: ["openDirectory"]
        }, (filePath) => {
            if (filePath) {
                let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
                model.gitFolders = this.gitFolders.concat.apply(gitFolder);
            }
            model.loading = false;
            $scope.$apply();
        });
    }

    model.AddGitFolders = function (gitFolder) {
        debugger;
        if (!gitFolder.selected) {
            model.selectedGitFolders.push(gitFolder);
            model.onGitFoldersChange({
                folders: model.selectedGitFolders
            })
        } else {
            let removethis = model.selectedGitFolders.filter((el) => {
                return el.repoInfo.abbreviatedSha == gitFolder.repoInfo.abbreviatedSha
            })[0];
            let index = model.selectedGitFolders.indexOf(removethis)
            if (index > -1)
                model.selectedGitFolders.splice(index, 1);
        }
    }
}