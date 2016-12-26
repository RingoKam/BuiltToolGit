const electron = require('electron').remote;
const config = require('electron-config');
const gitFolderInfo = require('./git_folder_info');
const renderTree = require('./render_tree');

$("#addnewcollection").on("click", () => {
    electron.dialog.showOpenDialog({
                    title: "Select a folder",
                    properties: ["openDirectory"]
                },  (filePath) => {
                    let gitFolder = gitFolderInfo.GitFolders(filePath[0]); 
                    console.log(gitFolder);
                    //here we should save
                    renderTree.renderJsTree("#tree", gitFolder);
                });
}) 