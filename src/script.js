const fs = require('fs');
const path = require('path');
const getRepoInfo = require('git-repo-info');

let gitFolder = [];

console.log("Current Directory: " + __dirname); 

function readDirectory(fileLocation) {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            window.alert("Ops, Something bad happened: " + err);
        } else {
            for (let i = 0; i < files.length; i++) {
                let fullpath = fileLocation + "/" + files[i];
                if (IsFolder(files[i]) && IsGit(fullpath)) {
                    gitFolder.push(files[i]); 
                } else if(IsFolder(files[i])) {
                    readDirectory(fullpath);
                }
            }
        }
    });
}

function IsFolder(fileName) {
    if (!fileName.includes("."))
        return true;
}

function IsGit(fullpath){
    if(getRepoInfo(fullpath))
        return true; 
}

console.log(gitFolder);