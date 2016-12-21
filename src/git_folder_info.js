const fs = require('fs');
const path = require('path');
const getRepoInfo = require('git-repo-info');

function readDirectory(directory, gitFolder) {
    if (IsGit(directory)) {
        let repoInfo = getRepoInfo(directory);
        gitFolder.push({
            "file": directory,
            "repoInfo": repoInfo
        });
    } else if (fs.lstatSync(directory).isDirectory()) {
        var files = fs.readdirSync(directory);
        for (let i = 0; i < files.length; i++) {
            let fullpath = directory + "/" + files[i];
            readDirectory(fullpath, gitFolder);
        }
    }
};

function IsGit(fullpath) {
    if (getRepoInfo(fullpath).sha)
        return true;
}

exports.GitFolders = (filePath) => {
    let gitFolder = [];
    readDirectory(filePath, gitFolder);
    return gitFolder;
}