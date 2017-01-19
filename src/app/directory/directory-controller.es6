const electron = window.require('electron').remote;
let gitFolderInfo = require('../services/git_folder_info');
let createJsTreeObj = require('../services/create_jstree_obj');

export default class directoryController {
    constructor() {
        this.gitFolders = [];
    }
    $onInit() {
        if(!this.SelectedGitFolders) this.SelectedGitFolders = [];
    }
    OpenDirectory() {
        electron.dialog.showOpenDialog({
            title: "Select a folder",
            properties: ["openDirectory"]
        }, (filePath) => {
            let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
            this.gitFolders = this.gitFolders.concat.apply(gitFolder);
            // renderTree.renderJsTree("#tree", gitFolder);
            // renderSpinner.spinner.end("#loading");
        });
    }
}