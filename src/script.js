const fs = require('fs');
const path = require('path');
const getRepoInfo = require('git-repo-info');

let gitFolder = [];


let directory = "C:\Git";
console.log("Current Directory: " + directory);

readDirectory(directory);

function readDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            //window.alert("Ops, Something bad happened: " + err);
        } else {
            //console.log("I am going in this files:");
            //console.log(files);
            for (let i = 0; i < files.length; i++) {
                let fullpath = directory + "/" + files[i];
                if (IsFolder(files[i]) && IsGit(fullpath)) {
                    console.log(getRepoInfo(fullpath));
                    gitFolder.push(files[i]);
                } else if (IsFolder(files[i])) {
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

function IsGit(fullpath) {
    if (getRepoInfo(fullpath).sha)
        return true;
}

console.log(gitFolder);