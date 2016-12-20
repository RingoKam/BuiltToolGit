const fs = require('fs');
const path = require('path');
const getRepoInfo = require('git-repo-info');

let gitFolder = [];


let directory = "C:\\Git\\reference_proj";
console.log("Current Directory: " + directory);

readDirectory(directory);

function readDirectory(directory) {
    if (fs.lstatSync(directory).isDirectory()) {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.log("Ops, Something bad happened: " + err);
            } else {
                //console.log("I am going in this files:");
                //console.log(files);
                for (let i = 0; i < files.length; i++) {
                    let fullpath = directory + "/" + files[i];
                    if (IsFolder(files[i], fullpath) && IsGit(fullpath)) {
                        let repoInfo = getRepoInfo(fullpath);
                        gitFolder.push({
                            "file": files[i],
                            "repoInfo": repoInfo
                        });
                    } else if (IsFolder(files[i])) {
                        readDirectory(fullpath);
                    }
                }
            }
        });
    }
}

function IsFolder(fileName, fullpath) {
    try {
        // if (fullpath && !fileName.includes(".") && !fs.lstatSync(fullpath).isDirectory())
        if (!fileName.includes("."))
            return true;
    } catch (error) {
        console.log(fileName, fullpath, error);
    }
}

function IsGit(fullpath) {
    if (getRepoInfo(fullpath).sha)
        return true;
}

console.log(gitFolder);