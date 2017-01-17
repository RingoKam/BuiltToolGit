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
                for (let i = 0; i < files.length; i++) {
                    let fullpath = directory + "/" + files[i];
                    if (IsGit(fullpath)) {
                        let repoInfo = getRepoInfo(fullpath);
                        gitFolder.push({
                            "file": files[i],
                            "repoInfo": repoInfo
                        });
                    } else {
                        readDirectory(fullpath);
                    }
                }
            }
        });
    }
}

function IsGit(fullpath) {
    if (getRepoInfo(fullpath).sha)
        return true;
}

console.log(gitFolder);