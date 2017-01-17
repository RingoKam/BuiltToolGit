const electron = window.require('electron').remote;
let gitFolderInfo = require('../services/git_folder_info');
let createJsTreeObj = require('../services/create_jstree_obj');

export default class directoryController {
    constructor() {
        this.tempMemory = [];
        this.jstreeObj = [];
    }
    $onInit() {
        this.OpenDirectory = () => {
            electron.dialog.showOpenDialog({
                title: "Select a folder",
                properties: ["openDirectory"]
            }, (filePath) => {
                let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
                this.tempMemory = this.tempMemory.concat.apply(gitFolder);
                this.jstreeObj = createJsTreeObj.Create(this.tempMemory); 
                // renderTree.renderJsTree("#tree", gitFolder);
                // renderSpinner.spinner.end("#loading");
            });
        }
    }
}