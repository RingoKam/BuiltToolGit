const electron = window.require('electron').remote;
let gitFolderInfo = require('../services/git_folder_info')

export default class directoryController {
    constructor() {}
    $onInit() {
        this.OpenDirectory = () => {
            electron.dialog.showOpenDialog({
                title: "Select a folder",
                properties: ["openDirectory"]
            }, (filePath) => {
                let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
                console.log(gitFolder);
                // tempMemory = tempMemory.concat.apply(gitFolder);
                // renderTree.renderJsTree("#tree", gitFolder);
                // renderSpinner.spinner.end("#loading");
            });
        }
    }
}