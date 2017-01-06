const electron = require('electron').remote;
const config = require('electron-config');
const gitFolderInfo = require('./git_folder_info');
const renderTree = require('./render_tree');
const renderSpinner = require('./render_spinner');
const createSh = require('./create_sh');

let tempMemory = [];

$("#addnewcollection").on("click", () => {
    renderSpinner.spinner.start("#loading");
    electron.dialog.showOpenDialog({
        title: "Select a folder",
        properties: ["openDirectory"]
    }, (filePath) => {
        let gitFolder = gitFolderInfo.GitFolders(filePath[0]);
        tempMemory = tempMemory.concat.apply(gitFolder);
        renderTree.renderJsTree("#tree", gitFolder);
        renderSpinner.spinner.end("#loading");
    });
})

$("#browseExportLocation").on("click", () => {
    electron.dialog.showOpenDialog({
        title: "Select output location",
        properties: ["openDirectory"]
    }, (filePath) => {
        $("#exportLocation").val(filePath);
    })
})

$("#generate-sh").on("click", () => {
    let obj = $('.git-folder[aria-selected=true] > a').map((index, ele) => {
        return ele.text;
    });
    //work in progress 
    let selectedGitFiles = tempMemory.filter((e) => {
        for (let i in obj) {
            if (obj[i] === e.file.name) return true;
        }
    });
    createSh.createScript($("#exportLocation").val() , selectedGitFiles, $("#fileName").val(), $("#bashComment").val());
})