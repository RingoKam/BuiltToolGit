const electron = require('electron').remote;
const config = require('electron-config');
const gitFolderInfo = require('./git_folder_info');
const renderTree = require('./render_tree');
const renderSpinner = require('./render_spinner');
const createSh = require('./create_sh');
const datastore = require('./datastore'); 
const moment = require('moment'); 

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
    const obj = $('.git-folder[aria-selected=true] > a').map((index, ele) => {
        return ele.text;
    });

    const selectedGitFiles = tempMemory.filter((e) => {
        for (let i in obj) {
            if (obj[i] === e.file.name) return true;
        }
    });

    const comment = $("#bashComment").val();
    const exportLocation = $("#exportLocation").val(); 
    const fileName = $("#fileName").val(); 

    createSh.createScript(exportLocation, selectedGitFiles, fileName, comment);
    
    datastore.insertdb({
        "Created": moment().format("MMM Do YY h:mm:ss a"),
        "SelectedFiles": selectedGitFiles, 
        "Comment": bashComment, 
        "FileName": fileName,
        "ExportLocation": exportLocation  
    }); 
})