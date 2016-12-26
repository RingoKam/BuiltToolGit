const electron = require('electron').remote;
const config = require('electron-config');
const gitFolderInfo = require('./git_folder_info');
const renderTree = require('./render_tree');
const renderSpinner = require('./render_spinner');

$("#addnewcollection").on("click", () => {
    renderSpinner.spinner.start("#loading");    
    electron.dialog.showOpenDialog({
                    title: "Select a folder",
                    properties: ["openDirectory"]
                },  (filePath) => {
                    let gitFolder = gitFolderInfo.GitFolders(filePath[0]); 
                    renderTree.renderJsTree("#tree", gitFolder);
                    renderSpinner.spinner.end("#loading"); 
                });
}) 